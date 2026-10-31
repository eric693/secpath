/* SecPath 學堂：靜態檔案 + 分級密碼保護（僅使用 Node 內建模組） */
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
  network: { name: '網路基礎', title: '網路基礎：從 OSI 到子網路與路由', hashEnv: 'PASS_NETWORK', org: '網路基礎・CCNA 與網路架設技術士核心觀念', foot: '非 Cisco 或勞動部官方課程；考試範圍以官方公告為準', labels: ['原理篇', '實務篇'], subjects: ['網路模型與 IP 定址', '交換、路由、服務與排錯'] },
  sql: { name: 'SQL', title: 'SQL 資料庫入門：從查詢到資料分析', hashEnv: 'PASS_SQL', org: '資料分析與後端必備・SQL × 關聯式資料庫', foot: '語法以 SQLite 為主，各資料庫差異以官方文件為準', labels: ['查詢篇', '設計篇'], subjects: ['查詢、彙總與資料分析', '建立資料表、設計與實務'] },
  web: { name: '網頁開發', title: '網頁開發入門：HTML、CSS 與 JavaScript', hashEnv: 'PASS_WEB', org: '前端與轉職必備・HTML × CSS × JavaScript', foot: '語法以現代瀏覽器與 MDN 文件為準', labels: ['版面篇', '互動篇'], subjects: ['HTML 與 CSS', 'JavaScript 與上線'] },
  excel: { name: 'Excel／Power BI', title: 'Excel 與 Power BI 資料分析', hashEnv: 'PASS_EXCEL', org: '辦公室必備・Excel × 樞紐分析 × Power BI', foot: '介面以 Microsoft 365 繁體中文版為準；非 Microsoft 官方課程', labels: ['Excel 篇', 'Power BI 篇'], subjects: ['函式、樞紐分析與 Power Query', '資料模型、DAX 與儀表板'] },
  c: { name: 'C 語言', title: 'C 語言程式設計：從基礎到指標與嵌入式', hashEnv: 'PASS_C', org: '資工與韌體必修・C 語言 × 指標 × 記憶體', foot: '語法以 C17 與 GCC 為準；範例透過 Compiler Explorer 編譯執行', labels: ['基礎篇', '進階篇'], subjects: ['語法、流程控制、函式與陣列', '指標、記憶體、檔案與嵌入式'] },
  cpp: { name: 'C++', title: 'C++ 程式設計：STL、物件導向與現代 C++', hashEnv: 'PASS_CPP', org: 'APCS 與高效能開發・C++ × STL × 物件導向', foot: '語法以 C++17 與 G++ 為準；範例透過 Compiler Explorer 編譯執行', labels: ['基礎篇', '物件導向篇'], subjects: ['語法、函式與 STL', '類別、記憶體管理與現代 C++'] },
  ds: { name: '資料結構', title: '資料結構：陣列、鏈結串列、樹、圖與雜湊', hashEnv: 'PASS_DS', org: '資工核心與面試必備・資料結構 × C++ 實作', foot: '以 C++17 實作；範例透過 Compiler Explorer 編譯執行', labels: ['線性結構篇', '非線性結構篇'], subjects: ['陣列、串列、堆疊、佇列與雜湊', '樹、堆積、圖與進階結構'] },
  algo: { name: '演算法', title: '演算法：排序、搜尋、動態規劃與圖論', hashEnv: 'PASS_ALGO', org: '面試與 APCS 核心・演算法 × C++ 實作', foot: '以 C++17 實作；範例透過 Compiler Explorer 編譯執行', labels: ['基礎技巧篇', '進階演算法篇'], subjects: ['分析、遞迴、排序、搜尋與回溯', '貪心、動態規劃與圖論'] },
  react: { name: 'React', title: 'React 前端框架：元件、Hooks 與實戰專案', hashEnv: 'PASS_REACT', org: '前端職缺最常要求・React 18 × Hooks × 即時預覽', foot: '以 React 18 函式元件與 Hooks 撰寫；範例在瀏覽器中即時預覽', labels: ['基礎篇', '進階篇'], subjects: ['JSX、元件、state、列表與表單', 'Hooks、狀態管理、路由與專案實戰'] },
  claude: { name: 'Claude 實戰', title: 'Claude 實戰：提示詞、Claude Code 與 API 開發', hashEnv: 'PASS_CLAUDE', org: 'AI 工作流程實戰・Claude × Claude Code × API', foot: '內容依 2026 年 10 月官方文件整理；產品更新頻繁，請以官方文件為準', labels: ['使用篇', '進階篇'], subjects: ['提示詞、claude.ai 與 Claude Code 指令', '專案記憶、擴充、自動化與 API 開發'] },
  ts: { name: 'TypeScript', title: 'TypeScript：型別系統、泛型與實戰開發', hashEnv: 'PASS_TS', org: '前端與 Node.js 專案標配・TypeScript × 型別檢查 × 即時執行', foot: '以 TypeScript 5.6 strict 模式為準；範例在瀏覽器中以官方編譯器檢查後執行', labels: ['基礎篇', '進階篇'], subjects: ['型別、物件、函式、聯合型別與類別', '泛型、型別操作、非同步、工具鏈與實戰'] },
  pydata: { name: 'Python 資料分析', title: 'Python 資料分析：NumPy、pandas 與視覺化', hashEnv: 'PASS_PYDATA', org: '資料分析師必備・pandas × matplotlib × 實際資料', foot: '以 pandas 2.2、NumPy 1.26、matplotlib 3.5 為準；範例在瀏覽器中以 Pyodide 執行', labels: ['基礎篇', '進階篇'], subjects: ['NumPy、DataFrame、篩選、清理與分組', '合併、視覺化、時間序列、統計與實戰'] },
  agent: { name: 'AI 代理與 MCP', title: 'AI 代理與 MCP 開發：工具使用、設計模式與 MCP 伺服器', hashEnv: 'PASS_AGENT', org: 'AI 應用開發進階・Agent × Tool Use × MCP', foot: '內容依 2026 年 10 月官方文件與 MCP 2026-07-28 規格整理；規格更新時以官方文件為準', labels: ['代理篇', 'MCP 與上線篇'], subjects: ['工具使用、代理迴圈、設計模式與記憶', 'MCP 協定、伺服器開發、Agent SDK 與上線'] },
  k8s: { name: 'Kubernetes', title: 'Kubernetes 容器編排：從 Pod、Deployment 到正式環境維運', hashEnv: 'PASS_K8S', org: '雲端與 DevOps 進階必備・kubectl × YAML × 自動擴展 × Helm', foot: '依 Kubernetes 穩定版 API 撰寫；CKA、CKAD 考試資訊以 Linux Foundation 官方公告為準', labels: ['核心概念篇', '正式環境篇'], subjects: ['叢集架構、Pod、Deployment、Service、設定與機密', '儲存、資源排程、健康檢查與擴展、安全、Helm 與維運'] },
  node: { name: 'Node.js 後端', title: 'Node.js 後端與 API 開發：從 Express 到登入驗證與上線', hashEnv: 'PASS_NODE', org: '前端轉全端必備・Express 5 × REST API × SQL × JWT', foot: '依 2026 年 10 月的 Node.js LTS 與 Express 5 寫法撰寫；套件更新時以官方文件為準', labels: ['Node.js 與 API 篇', '資料庫、驗證與上線篇'], subjects: ['事件迴圈、非同步、HTTP 與 REST、Express、驗證與錯誤處理', 'SQL、CRUD API、登入驗證、安全、測試與部署'] },
  product: { name: '產品經理', title: '產品經理入門：從使用者問題到上線成長', hashEnv: 'PASS_PRODUCT', org: '想當 PM 必備・使用者研究 × 優先順序 × PRD × 數據實驗', foot: '原創教學內容，案例與數據皆為虛構；各公司對產品經理的職責定義不同，本課程介紹通用做法', labels: ['探索篇', '交付與成長篇'], subjects: ['產品經理角色、使用者研究、問題定義、策略指標與優先順序', 'PRD、MVP、團隊協作、數據實驗與上市成長'] },
  pm: { name: '專案管理', title: '專案管理實務：從規劃、時程到敏捷（PMP 方向）', hashEnv: 'PASS_PM', org: 'PM、工程師與主管必備・WBS × 要徑法 × 實獲值 × Scrum', foot: '原創教學內容，非 PMI 官方教材；PMP 資訊以 PMI 官網為準，Scrum 依 2020 年版《Scrum 指南》', labels: ['規劃篇', '執行與控制篇'], subjects: ['專案基礎、啟動、範疇、時程與成本', '實獲值、風險、品質與溝通、Scrum 與 Kanban'] },
  finance: { name: '財務報表', title: '財務報表與商業分析：看懂財報、算出決策', hashEnv: 'PASS_FINANCE', org: '主管、PM、創業者與投資人必備・三大報表 × 比率 × 損益兩平 × NPV', foot: '財報格式依台灣 IFRS 實務整理；內容為一般性財務觀念說明，不構成投資建議', labels: ['財務報表篇', '商業分析篇'], subjects: ['會計觀念、三大報表與財務比率', '損益兩平、定價、預算、投資評估與營運資金'] },
  marketing: { name: '數位行銷', title: '數位行銷與廣告投放：從受眾、內容到成效分析', hashEnv: 'PASS_MARKETING', org: '行銷人與創業者必備・SEO × 社群 × 廣告 × GA4', foot: '平台功能依 2026 年 10 月官方說明整理；廣告平台介面與政策更新快，以官方最新說明為準', labels: ['策略與內容篇', '廣告與成效篇'], subjects: ['顧客旅程、受眾、內容、SEO 與社群', 'Google／Meta 廣告、成效指標、GA4 與優化'] }
};
const IPAS = { org: 'iPAS 資訊安全工程師能力鑑定', foot: '考試資訊以 iPAS 經濟部產業人才能力鑑定官網公告為準', labels: ['科目一', '科目二'] };
for (const [k, v] of Object.entries(LEVELS)) {
  Object.assign(v, { ...IPAS, ...v });
  v.hash = process.env[v.hashEnv];
  if (!v.hash || !v.hash.startsWith('scrypt$')) { console.error(`${v.hashEnv} 未設定，請執行 node scripts/set-password.js ${k} <密碼>`); process.exit(1); }
}

const site = require('./site')({ ROOT, LEVELS });

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt', '.wasm': 'application/wasm', '.otf': 'font/otf', '.csv': 'text/csv; charset=utf-8' };
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
// 安全標頭：主站嚴格限制來源，只開放執行器需要的外部服務（Pyodide CDN、Compiler Explorer）與 WebAssembly
const CSP_MAIN = [
  "default-src 'self'",
  "script-src 'self' 'wasm-unsafe-eval' https://cdn.jsdelivr.net",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data: https://i.ytimg.com",
  "media-src 'self'",
  "frame-src 'self' https://www.youtube-nocookie.com",
  "connect-src 'self' https://godbolt.org https://cdn.jsdelivr.net https://pypi.org https://files.pythonhosted.org",
  "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'"
].join('; ');
// 程式預覽頁：放在無 allow-same-origin 的 sandbox iframe 中，執行學員寫的 HTML／React，需要內嵌腳本
const CSP_SANDBOX = "default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' https:; style-src 'unsafe-inline' https:; img-src * data: blob:; font-src * data:; media-src * data: blob:; connect-src https:; frame-ancestors 'self'; base-uri 'none'; form-action 'none'";
function securityHeaders(res, p) {
  const box = p === '/sandbox.html';
  res.setHeader('Content-Security-Policy', box ? CSP_SANDBOX : CSP_MAIN);
  res.setHeader('X-Frame-Options', box ? 'SAMEORIGIN' : 'DENY');
}
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
// 圖片來源頁：列出課程封面照片的作者與授權（CC BY／BY-SA 需要標示）
function creditsPage(req) {
  let credits = {};
  try { credits = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', 'static', 'img', 'covers', 'credits.json'), 'utf8')); } catch { /* 沒有紀錄時顯示空表 */ }
  const { courses } = require('./catalog.js');
  const rows = Object.entries(credits).filter(([id]) => LEVELS[id] || courses[id]).map(([id, c]) => `<tr>
    <td><img src="/static/img/covers/${esc(id)}-640.jpg" alt="" loading="lazy"></td>
    <td><b>${esc(LEVELS[id] ? (LEVELS[id].title || LEVELS[id].name).split("：")[0] : id)}</b><br><a href="${esc(c.page)}" rel="noopener" target="_blank">${esc(c.title.replace(/^File:/, ''))}</a></td>
    <td>${esc(c.artist || '（未署名）')}</td>
    <td>${c.licenseUrl ? `<a href="${esc(c.licenseUrl)}" rel="noopener" target="_blank">${esc(c.license)}</a>` : esc(c.license)}</td></tr>`).join('');
  const body = `<h1>圖片來源</h1>
    <p>課程封面使用 Wikimedia Commons 上以創用 CC 或公有領域釋出的照片，感謝各位作者。照片皆經過裁切與縮放；以 CC BY-SA 授權的照片，改作後的版本同樣以相同授權釋出。</p>
    <div class="table-wrap"><table class="tbl credits-tbl"><tr><th>封面</th><th>課程與原始檔案</th><th>作者</th><th>授權</th></tr>${rows}</table></div>`;
  return render('page.html', { TITLE: '圖片來源', USER_NAV: members.userNav(members.user(req)), BODY: body, WIDE: ' wide' });
}

const server = http.createServer(async (req, res) => {
  let url;
  try { url = new URL(req.url, 'http://x'); } catch { return send(res, 400, 'Bad request', 'text/plain'); }
  const p = decodeURIComponent(url.pathname);
  securityHeaders(res, p);

  if (p === '/sandbox.html') return serveFile(res, path.join(ROOT, 'public'), 'sandbox.html', 'public, max-age=3600');
  if (p === '/credits') return send(res, 200, creditsPage(req));
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
