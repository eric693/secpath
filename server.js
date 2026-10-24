/* SecPath 資安學堂：靜態檔案 + 分級密碼保護（僅使用 Node 內建模組） */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const PORT = +process.env.PORT || 3610;
const SECRET = process.env.SESSION_SECRET;
if (!SECRET || SECRET.length < 32) { console.error('SESSION_SECRET 未設定或太短'); process.exit(1); }

const LEVELS = {
  beginner: { name: '初級', title: '資訊安全工程師・初級', hashEnv: 'PASS_BEGINNER', subjects: ['資訊安全管理概論', '資訊安全技術概論'] },
  intermediate: { name: '中級', title: '資訊安全工程師・中級', hashEnv: 'PASS_INTERMEDIATE', subjects: ['資訊安全規劃實務', '資訊安全防護實務'] },
  'ai-beginner': { name: 'AI 初級', title: 'AI 應用規劃師・初級', hashEnv: 'PASS_AI_BEGINNER', org: 'iPAS AI 應用規劃師能力鑑定', subjects: ['人工智慧基礎概論', '生成式 AI 應用與規劃'] },
  'ai-intermediate': { name: 'AI 中級', title: 'AI 應用規劃師・中級', hashEnv: 'PASS_AI_INTERMEDIATE', org: 'iPAS AI 應用規劃師能力鑑定', labels: ['科目一', '科目二', '科目三'], subjects: ['人工智慧技術應用與規劃（必考）', '大數據處理分析與應用（與科目三擇一）', '機器學習技術與應用（與科目二擇一）'] },
  'ai-invest': { name: 'AI 投資實作', title: 'AI 投資助理實作', hashEnv: 'PASS_AI_INVEST', org: 'No Code 實作課程・AI × 台股', foot: '本課程為工具教學，不提供個股買賣建議；投資有風險', labels: ['觀念篇', '實作篇'], subjects: ['AI 與投資研究', 'No Code 自動化'] },
  linux: { name: 'Linux', title: 'Linux 系統管理實務', hashEnv: 'PASS_LINUX', org: 'Linux 系統管理・從指令到資安維運', foot: '指令以 Ubuntu 24.04 為準，RHEL 系對應指令另行標示', labels: ['基礎篇', '管理篇'], subjects: ['指令、檔案與權限', '系統、網路與資安'] },
  secplus: { name: 'Security+', title: 'CompTIA Security+', hashEnv: 'PASS_SECPLUS', org: 'CompTIA Security+ SY0-701', foot: '考試資訊以 CompTIA 官網公告為準', labels: ['第一部分', '第二部分'], subjects: ['概念、威脅與架構（Domain 1–3）', '維運與治理（Domain 4–5）'] },
  'aws-clf': { name: 'AWS CLF', title: 'AWS Cloud Practitioner', hashEnv: 'PASS_AWS_CLF', org: 'AWS Certified Cloud Practitioner CLF-C02', foot: '考試資訊以 AWS 認證官網公告為準', labels: ['第一部分', '第二部分'], subjects: ['雲端概念與安全合規（Domain 1–2）', '雲端技術服務與計費（Domain 3–4）'] },
  'aws-saa': { name: 'AWS SAA', title: 'AWS Solutions Architect Associate', hashEnv: 'PASS_AWS_SAA', org: 'AWS Certified Solutions Architect – Associate SAA-C03', foot: '考試資訊以 AWS 認證官網公告為準', labels: ['第一部分', '第二部分'], subjects: ['安全與韌性架構（Domain 1–2）', '高效能與成本最佳化架構（Domain 3–4）'] },
  'py-basic': { name: 'Python 入門', title: 'Python 入門', hashEnv: 'PASS_PY_BASIC', org: 'Python 程式設計・零基礎入門', foot: '語法以 Python 3.12 與官方文件為準', labels: ['基礎篇', '進階篇'], subjects: ['語法基礎與流程控制', '資料結構、函式與程式組織'] },
  'py-practice': { name: 'Python 實戰', title: 'Python 實戰：自動化與資料分析', hashEnv: 'PASS_PY_PRACTICE', org: 'Python 程式設計・自動化與資料分析', foot: '套件用法以各套件官方文件為準；爬蟲與 API 請遵守網站規範與個資法', labels: ['自動化篇', '分析篇'], subjects: ['辦公自動化與網路資料', '資料分析、AI 與作品集'] },
  'ai-apps': { name: 'AI 應用實作', title: 'AI 應用實作：提示工程、RAG 與代理流程', hashEnv: 'PASS_AI_APPS', org: 'AI 應用實作・提示工程 × RAG × AI 代理', foot: 'API 用法以各家官方文件為準；處理個資請遵守個資法與公司政策', labels: ['基礎篇', '進階篇'], subjects: ['提示工程與 API 應用', 'RAG、工具呼叫與代理流程'] },
  git: { name: 'Git', title: 'Git 版本控制：從入門到團隊協作', hashEnv: 'PASS_GIT', org: '開發必備技能・Git × GitHub', foot: '指令以 Git 2.40 以上版本與官方文件為準', labels: ['個人篇', '協作篇'], subjects: ['基本操作、還原與分支', '遠端、GitHub 與團隊實務'] },
  devops: { name: 'DevOps', title: 'DevOps 入門：Docker、CI/CD 與雲端部署', hashEnv: 'PASS_DEVOPS', org: 'DevOps 入門・容器 × 自動化 × 維運', foot: '指令與設定以各工具官方文件為準', labels: ['容器篇', '部署篇'], subjects: ['Docker 與容器化', 'CI/CD、雲端與維運'] },
  network: { name: '網路基礎', title: '網路基礎：從 OSI 到子網路與路由', hashEnv: 'PASS_NETWORK', org: '網路基礎・CCNA 與網路架設技術士核心觀念', foot: '非 Cisco 或勞動部官方課程；考試範圍以官方公告為準', labels: ['原理篇', '實務篇'], subjects: ['網路模型與 IP 定址', '交換、路由、服務與排錯'] }
};
const IPAS = { org: 'iPAS 資訊安全工程師能力鑑定', foot: '考試資訊以 iPAS 經濟部產業人才能力鑑定官網公告為準', labels: ['科目一', '科目二'] };
for (const [k, v] of Object.entries(LEVELS)) {
  Object.assign(v, { ...IPAS, ...v });
  v.hash = process.env[v.hashEnv];
  if (!v.hash || !v.hash.startsWith('scrypt$')) { console.error(`${v.hashEnv} 未設定，請執行 node scripts/set-password.js ${k} <密碼>`); process.exit(1); }
}

const site = require('./site')({ ROOT, LEVELS });

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt' };
const SESSION_DAYS = 30;
const LEVEL_PATH = new RegExp(`^/(${Object.keys(LEVELS).join('|')})(/.*)?$`);

/* ---------- 密碼與 Cookie ---------- */
function verifyPassword(pw, stored) {
  const [, salt, hash] = stored.split('$');
  const got = crypto.scryptSync(pw, Buffer.from(salt, 'hex'), 32);
  const want = Buffer.from(hash, 'hex');
  return got.length === want.length && crypto.timingSafeEqual(got, want);
}
// 簽章內含密碼雜湊，變更密碼後舊的登入狀態自動失效
function sign(level, exp) {
  return crypto.createHmac('sha256', SECRET).update(`${level}|${exp}|${LEVELS[level].hash}`).digest('base64url');
}
function makeToken(level) {
  const exp = Date.now() + SESSION_DAYS * 864e5;
  return `${exp}.${sign(level, exp)}`;
}
function validToken(level, tok) {
  if (!tok) return false;
  const [exp, sig] = tok.split('.');
  if (!exp || !sig || +exp < Date.now()) return false;
  const want = Buffer.from(sign(level, exp));
  const got = Buffer.from(sig);
  return got.length === want.length && crypto.timingSafeEqual(got, want);
}
function cookies(req) {
  const out = {};
  (req.headers.cookie || '').split(';').forEach(p => {
    const i = p.indexOf('=');
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}
const cookieName = level => 'sp_' + level;
function authed(req, level) { return validToken(level, cookies(req)[cookieName(level)]); }

/* ---------- 登入嘗試限制：每 IP 每 15 分鐘 10 次 ---------- */
const attempts = new Map();
function clientIp(req) { return (req.headers['x-real-ip'] || req.socket.remoteAddress || '').toString(); }
function limited(ip) {
  const now = Date.now(), win = 15 * 60e3;
  const a = (attempts.get(ip) || []).filter(t => now - t < win);
  attempts.set(ip, a);
  return a.length >= 10;
}
function recordFail(ip) { attempts.get(ip).push(Date.now()); }
setInterval(() => { const now = Date.now(); for (const [k, v] of attempts) if (!v.some(t => now - t < 15 * 60e3)) attempts.delete(k); }, 10 * 60e3).unref();

/* ---------- 回應工具 ---------- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const views = {};
function view(name) {
  if (process.env.NODE_ENV === 'production' && views[name]) return views[name];
  return (views[name] = fs.readFileSync(path.join(ROOT, 'views', name), 'utf8'));
}
function render(name, vars) { return view(name).replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? ''); }
function send(res, code, body, type = 'text/html; charset=utf-8', extra = {}) {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store', ...extra });
  res.end(body);
}
function redirect(res, to, extra = {}) { res.writeHead(303, { Location: to, 'Cache-Control': 'no-store', ...extra }); res.end(); }
function serveFile(res, base, rel, cache) {
  const file = path.normalize(path.join(base, rel));
  if (!file.startsWith(base + path.sep)) return send(res, 404, 'Not found', 'text/plain');
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, 'Not found', 'text/plain; charset=utf-8');
    const type = MIME[path.extname(file)] || 'application/octet-stream';
    const range = res.req && res.req.headers.range;
    const m = range && /^bytes=(\d*)-(\d*)$/.exec(range);
    if (m && (m[1] || m[2])) {
      // 影片拖曳快轉需要 Range 支援
      let start = m[1] ? +m[1] : st.size - +m[2], end = m[1] && m[2] ? +m[2] : st.size - 1;
      if (start < 0 || start >= st.size || end < start) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); return res.end(); }
      end = Math.min(end, st.size - 1);
      res.writeHead(206, { 'Content-Type': type, 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Accept-Ranges': 'bytes', 'Cache-Control': cache });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size, 'Cache-Control': cache, 'Accept-Ranges': 'bytes', 'Last-Modified': st.mtime.toUTCString() });
    fs.createReadStream(file).pipe(res);
  });
}
function readBody(req, limit = 2048) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > limit) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

/* ---------- 會員系統與管理後台 API ---------- */
const members = require('./members')({ LEVELS, site, esc, render, send, redirect, readBody, clientIp, cookies, verifyPassword });
const adminApi = require('./admin-api')({ LEVELS, site, send, readBody, members });
const ADMIN_DIST = path.join(ROOT, 'admin', 'dist');

// 課程登入頁：未登入顯示會員登入與課程密碼兩種方式，已登入則改為兌換碼
function loginVars(u, level) {
  const next = encodeURIComponent(`/${level}/`);
  if (u) return {
    HEADING: '開通課程',
    INTRO: `你已登入 <b>${esc(u.email)}</b>，尚未開通這門課。輸入課程兌換碼（課程密碼）即可開通，之後用帳號登入就能直接進入。`,
    FIELD: '課程兌換碼', SUBMIT: '開通課程', MEMBER: `<p class="m-switch small"><a href="/account">返回我的課程</a>・<a href="/logout">切換帳號</a></p>`
  };
  return {
    HEADING: '課程登入',
    INTRO: '本課程僅限授權學員使用。登入已開通此課程的會員帳號，或直接輸入課程密碼。',
    FIELD: '課程密碼', SUBMIT: '進入課程',
    MEMBER: `<a class="btn outline lg block" href="/login?next=${next}">會員登入</a><p class="m-switch small">還沒有帳號？<a href="/register?next=${next}">註冊會員</a>，再用課程密碼開通，學習進度可跨裝置同步。</p><div class="m-or"><span>或直接輸入課程密碼</span></div>`
  };
}

/* ---------- 路由 ---------- */
const server = http.createServer(async (req, res) => {
  let url;
  try { url = new URL(req.url, 'http://x'); } catch { return send(res, 400, 'Bad request', 'text/plain'); }
  const p = decodeURIComponent(url.pathname);

  if (p === '/' || p === '/index.html') return send(res, 200, render('home.html', { ...site.home(), USER_NAV: members.userNav(members.user(req)) }));
  const cm = p.match(/^\/course\/([\w-]+)(\/trial)?\/?$/);
  if (cm) {
    const vars = cm[2] ? site.trial(cm[1]) : site.course(cm[1]);
    if (!vars) return send(res, 404, render('notfound.html', {}));
    const u = members.user(req);
    const has = authed(req, cm[1]) || members.canAccess(u, cm[1]);
    return send(res, 200, render(cm[2] ? 'trial.html' : 'course.html', { ...vars, USER_NAV: members.userNav(u), ENTER: has ? '進入課程，繼續學習' : u ? '輸入兌換碼開通課程' : '已有課程密碼，進入課程' }));
  }
  try {
    if (await members.handle(req, res, url, p)) return;
    if (await adminApi.handle(req, res, url, p)) return;
  } catch (e) {
    console.error(e);
    return res.headersSent ? res.end() : send(res, 500, 'Server error', 'text/plain; charset=utf-8');
  }
  // 管理後台前端（admin/ 以 Vite 建置）：靜態資源直接提供，其餘路徑回傳 index.html 由前端路由處理
  if (p === '/admin' || p.startsWith('/admin/')) {
    if (p.startsWith('/admin/assets/')) return serveFile(res, ADMIN_DIST, p.slice(7), 'public, max-age=31536000, immutable');
    const u = members.user(req);
    if (!u) return redirect(res, '/login?next=' + encodeURIComponent(p));
    if (!u.is_admin) return send(res, 403, render('notfound.html', {}));
    return serveFile(res, ADMIN_DIST, 'index.html', 'no-cache');
  }
  if (p.startsWith('/static/')) return serveFile(res, path.join(ROOT, 'public', 'static'), p.slice(8), 'public, max-age=3600');
  if (p === '/favicon.ico') return serveFile(res, path.join(ROOT, 'public', 'static'), 'icon.svg', 'public, max-age=86400');

  const m = p.match(LEVEL_PATH);
  if (!m) return send(res, 404, render('notfound.html', {}));
  const level = m[1], L = LEVELS[level], rest = m[2] || '';
  if (rest === '') return redirect(res, `/${level}/`);

  if (rest === '/login' && req.method === 'POST') {
    const ip = clientIp(req);
    if (limited(ip)) return redirect(res, `/${level}/?e=locked`);
    let body = '';
    try { body = await readBody(req); } catch { return send(res, 413, 'Too large', 'text/plain'); }
    const pw = new URLSearchParams(body).get('password') || '';
    // 已登入會員：課程密碼當作兌換碼，開通到帳號
    const redeemed = pw ? members.redeemFromCoursePage(req, level, pw) : null;
    if (redeemed) { attempts.delete(ip); return redirect(res, `/${level}/`); }
    if (redeemed === null && pw && verifyPassword(pw, L.hash)) {
      attempts.delete(ip);
      return redirect(res, `/${level}/`, {
        'Set-Cookie': `${cookieName(level)}=${makeToken(level)}; Path=/${level}/; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`
      });
    }
    recordFail(ip);
    return redirect(res, `/${level}/?e=1`);
  }
  if (rest === '/logout') {
    return redirect(res, '/', { 'Set-Cookie': `${cookieName(level)}=; Path=/${level}/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` });
  }

  const user = members.user(req);
  const ok = members.canAccess(user, level) || authed(req, level);
  if (rest === '/' || rest === '/index.html') {
    if (ok) return send(res, 200, render('app.html', { LEVEL: level, LEVEL_NAME: esc(L.name), LEVEL_TITLE: esc(L.title), ORG: esc(L.org), FOOT: esc(L.foot), ...members.appVars(req, level) }));
    const e = url.searchParams.get('e');
    const msg = e === 'locked' ? '嘗試次數過多，請 15 分鐘後再試。' : e ? '密碼不正確，請再試一次。' : '';
    return send(res, 200, render('login.html', {
      LEVEL: level, LEVEL_NAME: esc(L.name), LEVEL_TITLE: esc(L.title), ORG: esc(L.org),
      SUBJECTS: L.subjects.map((s, i) => `<dt>${esc(L.labels[i])}</dt><dd>${esc(s)}</dd>`).join(''),
      ERROR: msg ? `<p class="login-error" role="alert">${msg}</p>` : '',
      ...loginVars(user, level)
    }));
  }
  if (rest.startsWith('/data/')) {
    if (!ok) return send(res, 401, 'Unauthorized', 'text/plain');
    return serveFile(res, path.join(ROOT, 'levels', level), rest.slice(6), 'private, no-cache');
  }
  return send(res, 404, render('notfound.html', {}));
});

server.listen(PORT, '127.0.0.1', () => console.log(`SecPath listening on 127.0.0.1:${PORT}`));
