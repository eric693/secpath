/* 搜尋引擎與社群分享：canonical、Open Graph、結構化資料（JSON-LD）、robots.txt 與 sitemap.xml。
   網址一律以 SITE_URL 為準（不信任請求的 Host 標頭），可用環境變數覆寫。 */
'use strict';
const fs = require('fs');
const path = require('path');

module.exports = function createSeo({ ROOT, site }) {
  const SITE_URL = (process.env.SITE_URL || 'https://cybersecurity.crownai.ink').replace(/\/+$/, '');
  const SITE_NAME = 'SecPath 學堂';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const abs = p => SITE_URL + p;
  const coverOf = id => fs.existsSync(path.join(ROOT, 'public', 'static', 'img', 'covers', id + '-1280.jpg'))
    ? { url: `/static/img/covers/${id}-1280.jpg`, w: 1280, h: 720 } : { url: '/static/img/og-home.jpg', w: 1200, h: 630 };
  // JSON 放進 <script> 時跳脫 <，避免內容中的 </script> 提早結束標籤
  const ldJson = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
  const duration = minutes => `PT${Math.floor(minutes / 60)}H${minutes % 60 ? (minutes % 60) + 'M' : ''}`;

  function tags({ title, desc, pagePath, image, type = 'website', ld = [] }) {
    return [
      `<link rel="canonical" href="${esc(abs(pagePath))}">`,
      `<meta property="og:site_name" content="${SITE_NAME}">`,
      `<meta property="og:locale" content="zh_TW">`,
      `<meta property="og:type" content="${type}">`,
      `<meta property="og:title" content="${esc(title)}">`,
      `<meta property="og:description" content="${esc(desc)}">`,
      `<meta property="og:url" content="${esc(abs(pagePath))}">`,
      `<meta property="og:image" content="${esc(abs(image.url))}">`,
      `<meta property="og:image:width" content="${image.w}">`,
      `<meta property="og:image:height" content="${image.h}">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      ...ld.map(ldJson)
    ].join('\n  ');
  }

  function home() {
    const d = site.get();
    return tags({
      title: `${SITE_NAME}：學到能上工的技能與證照`,
      desc: `${d.courses.length} 門線上課程：資安、AI、雲端、程式設計、資料分析與商業管理。完整講義、題庫、教學影片與可直接執行的互動練習，第一章免費試讀。`,
      pagePath: '/',
      image: { url: '/static/img/og-home.jpg', w: 1200, h: 630 },
      ld: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: abs('/'), inLanguage: 'zh-Hant' },
        // 課程清單：搭配各課程頁的 Course 結構化資料
        { '@context': 'https://schema.org', '@type': 'ItemList',
          itemListElement: d.courses.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: abs('/course/' + c.id) })) }
      ]
    });
  }

  function course(id, trial = false) {
    const c = site.get().byId[id];
    if (!c) return '';
    const name = c.LV.title || c.L.title, cover = coverOf(id);
    if (trial) {
      const ch = c.CH[0] || {};
      return tags({ title: `免費試讀：${ch.title || name}｜${name}`, desc: ch.summary || c.pitch, pagePath: `/course/${id}/trial`, image: cover, type: 'article' });
    }
    return tags({
      title: name, desc: c.pitch, pagePath: '/course/' + id, image: cover,
      ld: [{
        '@context': 'https://schema.org', '@type': 'Course',
        name, description: c.pitch, url: abs('/course/' + id), image: abs(cover.url), inLanguage: 'zh-Hant',
        educationalLevel: c.level,
        provider: { '@type': 'Organization', name: SITE_NAME, url: abs('/') },
        syllabusSections: c.CH.map(ch => ({ '@type': 'Syllabus', name: ch.title, description: ch.summary, timeRequired: duration(ch.minutes || 30) })),
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: duration(c.stats.minutes) }
      }]
    });
  }

  const robots = () => [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /account',
    'Disallow: /login',
    'Disallow: /register',
    'Disallow: /logout',
    `Sitemap: ${abs('/sitemap.xml')}`,
    ''
  ].join('\n');

  function sitemap() {
    const d = site.get();
    // 以課程資料檔的最後修改時間作為 lastmod
    const mtime = id => {
      let t = 0;
      for (const f of ['level.js', 'chapters1.js', 'chapters2.js']) {
        try { t = Math.max(t, fs.statSync(path.join(ROOT, 'levels', id, f)).mtimeMs); } catch { /* 檔案不存在就略過 */ }
      }
      return new Date(t || Date.now()).toISOString().slice(0, 10);
    };
    const newest = d.courses.map(c => mtime(c.id)).sort().pop();
    const urls = [[abs('/'), newest, '1.0'],
      ...d.courses.flatMap(c => [[abs('/course/' + c.id), mtime(c.id), '0.8'], [abs(`/course/${c.id}/trial`), mtime(c.id), '0.6']])];
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.map(([loc, lastmod, pr]) => `  <url><loc>${esc(loc)}</loc><lastmod>${lastmod}</lastmod><priority>${pr}</priority></url>`).join('\n') +
      '\n</urlset>\n';
  }

  return { home, course, robots, sitemap, SITE_URL };
};
