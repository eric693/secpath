/* 公開頁面：首頁課程牆、課程介紹頁、第一章試讀頁。
   課程數字（章數、時數、題數等）直接讀 levels/<id>/ 的資料檔計算，文案與分類來自 catalog.js。 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const strip = s => String(s ?? '').replace(/<[^>]+>/g, '');
const FILES = ['level.js', 'chapters1.js', 'chapters2.js', 'questions.js', 'glossary.js', 'videos.js'];

// 可在網頁上執行的程式範例：依講義中 <pre class="…"> 的種類統計，並列出主要語言
const RUN_LANG = { py: 'Python', sql: 'SQL', web: 'HTML', js: 'JavaScript', jsx: 'React', c: 'C', cpp: 'C++' };
function runnables(CH) {
  const n = {};
  for (const c of CH) for (const sec of c.sections) for (const m of sec.html.matchAll(/<pre class="(py|sql|web|js|jsx|c|cpp)"/g)) n[m[1]] = (n[m[1]] || 0) + 1;
  const kinds = Object.keys(n).sort((a, b) => n[b] - n[a]);
  return { runnable: kinds.reduce((t, k) => t + n[k], 0), runLangs: kinds.slice(0, 3).map(k => RUN_LANG[k]).join('、'), runDownload: kinds.some(k => k === 'py' || k === 'sql' || k === 'jsx') };
}

module.exports = function createSite({ ROOT, LEVELS }) {
  const catalogFile = path.join(ROOT, 'catalog.js');
  let data = null;

  // 在沙箱中執行課程資料檔，取得 window.LEVEL、CHAPTERS 等
  function loadCourse(id) {
    const ctx = { window: {} };
    vm.createContext(ctx);
    for (const f of FILES) {
      const file = path.join(ROOT, 'levels', id, f);
      if (fs.existsSync(file)) vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
    }
    const w = ctx.window, LV = w.LEVEL || {}, CH = w.CHAPTERS || [], V = w.VIDEOS || { review: [], chapters: {} };
    const qByCh = {};
    (w.QUESTIONS || []).forEach(q => { qByCh[q[0]] = (qByCh[q[0]] || 0) + 1; });
    const minutes = CH.reduce((n, c) => n + (c.minutes || 0), 0);
    return {
      LV, CH, qByCh,
      stats: {
        chapters: CH.length,
        minutes,
        hours: Math.max(1, Math.round(minutes / 30) / 2),
        questions: (w.QUESTIONS || []).length,
        terms: (w.GLOSSARY || []).length,
        videos: (V.review || []).length + Object.values(V.chapters || {}).reduce((n, a) => n + a.length, 0),
        tools: (LV.tools || []).length,
        ...runnables(CH)
      }
    };
  }

  function build() {
    delete require.cache[require.resolve(catalogFile)];
    const cat = require(catalogFile);
    const courses = [];
    for (const c of cat.categories) {
      for (const [id, meta] of Object.entries(cat.courses)) {
        if (meta.cat !== c.id || !LEVELS[id]) continue;
        courses.push({ id, ...meta, catName: c.name, hue: c.hue, L: LEVELS[id], ...loadCourse(id) });
      }
    }
    const byId = Object.fromEntries(courses.map(c => [c.id, c]));
    const paths = cat.paths.map(p => ({ ...p, steps: p.steps.filter(s => byId[s]) }));
    data = { categories: cat.categories.filter(c => courses.some(x => x.cat === c.id)), courses, byId, paths };
  }
  function get() {
    if (!data || process.env.NODE_ENV !== 'production') build();
    return data;
  }

  /* ---------- 共用元件 ---------- */
  const kindName = k => k === 'cert' ? '證照備考' : '技能教學';
  const title = c => c.LV.title || c.L.title;
  const short = c => c.short || c.L.name;
  const cover = (c, size = '') => `<div class="cover ${size}" style="--h:${c.hue}" aria-hidden="true"><span class="cover-cat">${esc(c.catName)}</span><span class="cover-code">${esc(c.code)}</span><span class="cover-level">${esc(c.level)}</span></div>`;
  const metaLine = s => `<span>${s.chapters} 章</span><span>約 ${s.hours} 小時</span><span>${s.questions} 題練習</span>`;

  function card(c) {
    const search = [title(c), c.L.name, c.catName, kindName(c.kind), c.level, c.pitch, ...c.highlights, ...c.CH.map(x => x.title)].join(' ').toLowerCase();
    return `<a class="cw-card" href="/course/${c.id}" data-cat="${c.cat}" data-kind="${c.kind}" data-search="${esc(search)}">
      ${cover(c)}
      <div class="cw-body">
        <div class="cw-tags"><span class="tag ${c.kind === 'cert' ? 's1' : 's2'}">${kindName(c.kind)}</span><span class="tag">${esc(c.level)}</span></div>
        <h3>${esc(title(c))}</h3>
        <p>${esc(c.pitch)}</p>
        <div class="cw-meta">${metaLine(c.stats)}</div>
      </div>
    </a>`;
  }

  function pathBlock(p, byId, current) {
    return `<div class="lp">
      <div class="lp-head"><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p></div>
      <ol class="lp-steps">${p.steps.map((s, i) => {
        const c = byId[s];
        return `<li${s === current ? ' class="here"' : ''}><a href="/course/${s}" style="--h:${c.hue}"><span class="lp-no">${i + 1}</span><span class="lp-name">${esc(short(c))}</span></a></li>`;
      }).join('')}</ol>
    </div>`;
  }

  /* ---------- 首頁 ---------- */
  function home() {
    const d = get();
    const sum = k => d.courses.reduce((n, c) => n + c.stats[k], 0);
    const stats = [
      [d.courses.length, '門課程'],
      [sum('chapters'), '章講義'],
      [Math.round(sum('minutes') / 60), '小時內容'],
      [sum('questions').toLocaleString('en-US'), '題附解析練習題'],
      [sum('videos'), '支教學影片']
    ];
    return {
      COUNT: d.courses.length,
      STATS: stats.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join(''),
      CHIPS: `<button type="button" class="chip on" data-cat="">全部 <span>${d.courses.length}</span></button>` +
        d.categories.map(c => `<button type="button" class="chip" data-cat="${c.id}" style="--h:${c.hue}">${esc(c.name)} <span>${d.courses.filter(x => x.cat === c.id).length}</span></button>`).join(''),
      CARDS: d.courses.map(card).join(''),
      HERO_ART: ['secplus', 'aws-saa', 'py-basic', 'ai-apps'].filter(id => d.byId[id]).map(id => cover(d.byId[id])).join(''),
      PATHS: d.paths.map(p => pathBlock(p, d.byId)).join('')
    };
  }

  /* ---------- 課程介紹頁 ---------- */
  function course(id) {
    const d = get(), c = d.byId[id];
    if (!c) return null;
    const { LV, CH, stats: s } = c;
    const subj = LV.subjects || {};
    const groups = Object.keys(subj).map(k => ({ k: +k, ...subj[k], ch: CH.filter(x => x.subject === +k) })).filter(g => g.ch.length);
    const syllabus = groups.map(g => `
      <div class="cs-group">
        <h3><span>${esc(g.name)}</span>${esc(g.title)}<small>${g.ch.length} 章・約 ${Math.round(g.ch.reduce((n, x) => n + x.minutes, 0) / 6) / 10} 小時</small></h3>
        ${g.ch.map(x => {
          const n = +x.id.slice(1);
          return `<details class="cs-ch">
          <summary><span class="cs-no">${String(n).padStart(2, '0')}</span><span class="cs-title">${esc(x.title)}</span><span class="cs-info">${n === 1 ? '<a class="tag ok" href="/course/' + id + '/trial">免費試讀</a>' : ''}${x.minutes} 分鐘・${c.qByCh[x.id] || 0} 題</span></summary>
          <div class="cs-detail"><p>${esc(x.summary)}</p><ul>${x.sections.map(sec => `<li>${esc(sec.title)}</li>`).join('')}</ul></div>
        </details>`;
        }).join('')}
      </div>`).join('');

    const includes = [
      [`${s.chapters} 章完整講義`, `約 ${s.hours} 小時`],
      [`${s.questions} 題練習題`, '每題附詳細解析'],
      LV.exam && LV.exam.full ? [`${LV.words ? '綜合測驗' : '計時模擬考'}`, `${LV.exam.full.n} 題・${LV.exam.full.min} 分鐘`] : null,
      s.videos ? [`${s.videos} 支教學影片`, '逐章搭配'] : null,
      s.runnable ? [`${s.runnable} 個可執行範例`, `直接在網頁上執行 ${s.runLangs}`] : null,
      s.tools ? [`${s.tools} 個互動練習`, '計算器與模擬器'] : null,
      s.terms ? [`${s.terms} 個名詞`, '速查與記憶卡'] : null,
      ['錯題本與學習進度', '自動記錄在瀏覽器']
    ].filter(Boolean);

    const related = d.courses.filter(x => x.id !== id && x.cat === c.cat);
    const inPaths = d.paths.filter(p => p.steps.includes(id));
    const more = related.length < 3 ? d.courses.filter(x => x.id !== id && x.cat !== c.cat && inPaths.some(p => p.steps.includes(x.id))) : [];
    const rel = [...related, ...more].slice(0, 3);

    const faq = [
      ['如何取得課程密碼？', '每門課程使用獨立的課程密碼，請向課程管理者索取。輸入一次後 30 天內不需重新登入。'],
      ['需要安裝任何軟體嗎？', s.runnable ? `不需要。講義、練習題與 ${s.runLangs} 範例都在瀏覽器中完成${s.runDownload ? '，第一次執行程式時會自動下載執行環境' : ''}。` : '不需要，所有講義、練習題與互動工具都在瀏覽器中完成，手機也能閱讀。'],
      ['學習進度會保存嗎？', '章節完成狀態、錯題與收藏會儲存在你目前使用的瀏覽器。更換裝置或清除瀏覽器資料後會重新開始。'],
      c.kind === 'cert' ? ['這是官方課程嗎？', strip(LV.examNote || '本課程非官方課程，考試資訊請以官方公告為準。')] : ['完成後可以做到什麼？', strip(LV.readyNote || '')]
    ].filter(x => x[1]);

    return {
      ID: id,
      HUE: c.hue,
      TITLE: esc(title(c)),
      NAME: esc(short(c)),
      DESC: esc(c.pitch),
      CAT: esc(c.catName),
      CAT_ID: c.cat,
      OVERLINE: esc(LV.overline || c.L.org),
      PITCH: esc(c.pitch),
      TAGS: `<span class="tag ${c.kind === 'cert' ? 's1' : 's2'}">${kindName(c.kind)}</span><span class="tag">${esc(c.level)}</span><span class="tag">${esc(c.catName)}</span>`,
      HERO_META: `<span><b>${s.chapters}</b> 章</span><span><b>${s.hours}</b> 小時</span><span><b>${s.questions}</b> 題</span>${s.videos ? `<span><b>${s.videos}</b> 支影片</span>` : ''}`,
      COVER: cover(c, 'lg'),
      INCLUDES: includes.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join(''),
      CHECKLIST: (LV.checklist || []).map(x => `<li>${esc(x)}</li>`).join(''),
      LEAD: esc(strip(LV.lead)),
      HIGHLIGHTS: c.highlights.map(x => `<li>${esc(x)}</li>`).join(''),
      AUDIENCE: c.audience.map(x => `<li>${esc(x)}</li>`).join(''),
      SYLLABUS: syllabus,
      SYL_SUM: `${groups.length} 篇・${s.chapters} 章・約 ${s.hours} 小時`,
      PLAN: (LV.plan || []).map(([a, b]) => `<tr><th>${esc(a)}</th><td>${esc(b)}</td></tr>`).join(''),
      INFO: (LV.examInfo || []).map(([a, b]) => `<tr><th>${esc(a)}</th><td>${esc(b)}</td></tr>`).join(''),
      INFO_TITLE: LV.words ? '課程資訊' : '考試資訊',
      INFO_NOTE: LV.examNote ? `<p class="muted small">${esc(strip(LV.examNote))}</p>` : '',
      SITE: LV.site ? `<p class="small"><a href="${esc(LV.site[1])}" target="_blank" rel="noopener">${esc(LV.site[0])}</a></p>` : '',
      PATHS: inPaths.length ? `<section class="cp-sec" id="path"><h2>學習路線</h2><p class="muted">這門課在以下職涯路線中的位置：</p>${inPaths.map(p => pathBlock(p, d.byId, id)).join('')}</section>` : '',
      FAQ: faq.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join(''),
      RELATED: rel.length ? `<section class="cp-sec"><h2>相關課程</h2><div class="cw-grid">${rel.map(card).join('')}</div></section>` : ''
    };
  }

  /* ---------- 第一章試讀 ---------- */
  function trial(id) {
    const d = get(), c = d.byId[id];
    if (!c || !c.CH.length) return null;
    const ch = c.CH.find(x => x.id === 'c01') || c.CH[0];
    const n = +ch.id.slice(1);
    const subj = (c.LV.subjects || {})[ch.subject] || { name: '', title: '' };
    const next = c.CH[c.CH.indexOf(ch) + 1];
    return {
      ID: id,
      HUE: c.hue,
      TITLE: esc(title(c)),
      NAME: esc(short(c)),
      CH_TITLE: esc(ch.title),
      CH_OVERLINE: `第 ${n} 章・${esc(subj.name)} ${esc(subj.title)}`,
      CH_SUMMARY: esc(ch.summary),
      CH_META: `<span>閱讀約 ${ch.minutes} 分鐘</span><span>${ch.sections.length} 節</span><span>本章練習題 ${c.qByCh[ch.id] || 0} 題</span>`,
      SECTIONS: ch.sections.map((s, i) => `<section id="s-${esc(s.id)}"><h2><span class="sec-no">${n}.${i + 1}</span>${esc(s.title)}</h2>${s.html}</section>`).join(''),
      KEYPOINTS: (ch.keypoints || []).map(k => `<li>${esc(k)}</li>`).join(''),
      TOC: ch.sections.map((s, i) => `<a href="#s-${esc(s.id)}"><span>${n}.${i + 1}</span>${esc(s.title)}</a>`).join(''),
      NEXT: next ? `下一章：第 ${+next.id.slice(1)} 章 ${esc(next.title)}` : '',
      REST: c.stats.chapters - 1,
      QUESTIONS: c.stats.questions
    };
  }

  return { get, home, course, trial };
};
