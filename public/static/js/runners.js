/* SQL、網頁與 React 課程的執行器：把講義中的程式碼區塊變成可編輯、可執行的區塊。
   <pre class="sql" data-db="shop">  在瀏覽器中以 SQLite 執行查詢，結果顯示為表格（每次執行都從範例資料重新開始）
   <pre class="web">                 HTML／CSS／JS 片段，在隔離的 iframe 中即時預覽，並顯示 console 輸出
   <pre class="jsx">                 React 元件（JSX），以 Babel 轉譯後在隔離的 iframe 中渲染；未自行呼叫 createRoot 時自動渲染 App
   <pre class="ts">                  TypeScript，以官方編譯器 strict 模式型別檢查，通過後交給 JavaScript 執行器
   <pre class="js">                  純 JavaScript，在背景執行緒執行並顯示 console 輸出，可停止無限迴圈
   <pre class="c">／<pre class="cpp">  C／C++ 程式，送到 Compiler Explorer（godbolt.org）以 GCC 編譯並執行；data-input 為標準輸入 */
(function () {
  const view = document.getElementById('view');
  if (!view) return;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtMs = ms => ms < 1000 ? Math.round(ms) + ' 毫秒' : (ms / 1000).toFixed(1) + ' 秒';

  // 共用：可編輯的程式碼框
  function shell(pre, label, buttons) {
    const code = pre.textContent.replace(/^\n/, '').replace(/\s+$/, '');
    const box = document.createElement('div');
    box.className = 'py-box run-' + label.toLowerCase();
    box.innerHTML = `<div class="py-head"><span>${esc(label)}</span><span class="py-actions">${buttons}<button type="button" class="py-btn reset">還原</button></span></div>
      <textarea class="py-code" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="${esc(label)} 程式碼"></textarea>`;
    const ta = box.querySelector('.py-code');
    const fit = () => { ta.style.height = 'auto'; ta.style.height = Math.max(60, ta.scrollHeight + 2) + 'px'; };
    ta.value = code;
    pre.replaceWith(box);
    requestAnimationFrame(fit);
    ta.addEventListener('input', fit);
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText('  ', s, ta.selectionEnd, 'end'); fit(); }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); box.dispatchEvent(new Event('run')); }
      e.stopPropagation(); // 避免觸發全站快捷鍵
    });
    box.querySelector('.reset').addEventListener('click', () => { ta.value = code; fit(); box.dispatchEvent(new Event('reset')); });
    return { box, ta, code };
  }

  /* ---------- SQL ---------- */
  const SQL_HINTS = [
    [/no such table/, '找不到資料表：檢查資料表名稱拼字，可按「資料表」查看有哪些表。'],
    [/no such column/, '找不到欄位：檢查欄位名稱拼字；多表查詢時欄位前要加資料表名稱或別名。'],
    [/ambiguous column name/, '欄位名稱不明確：多個資料表有同名欄位，請寫成 表名.欄位 或 別名.欄位。'],
    [/syntax error/, '語法錯誤：常見原因是關鍵字拼錯、少了逗號、多了逗號，或字串沒有用單引號包起來。'],
    [/misuse of aggregate/, '彙總函式用錯位置：WHERE 不能使用 SUM、COUNT 等彙總函式，請改用 HAVING。'],
    [/UNIQUE constraint failed/, '違反唯一限制：這個值已經存在，主鍵或 UNIQUE 欄位不能重複。'],
    [/NOT NULL constraint failed/, '違反 NOT NULL 限制：這個欄位一定要有值。'],
    [/FOREIGN KEY constraint failed/, '違反外鍵限制：參照的資料不存在，或還有其他資料參照到它。'],
    [/CHECK constraint failed/, '違反 CHECK 限制：資料不符合欄位設定的條件。'],
    [/must appear in the GROUP BY|not an aggregate/, 'SELECT 中沒有彙總的欄位，必須出現在 GROUP BY。'],
    [/incomplete input/, '語句不完整：檢查括號是否成對、字串引號是否有結束。']
  ];
  let sqlWorker = null, sqlBusy = null;
  const getSql = () => {
    if (!sqlWorker) { sqlWorker = new Worker('/static/js/sql-worker.js'); sqlWorker.onmessage = e => sqlBusy && sqlBusy(e.data); }
    return sqlWorker;
  };
  const cell = v => v === null ? '<span class="sql-null">NULL</span>' : esc(v);
  function table(r) {
    const more = r.total > r.rows.length ? `，只顯示前 ${r.rows.length} 筆` : '';
    if (!r.rows.length) return `<div class="sql-res"><div class="sql-cap">查詢結果：0 筆</div><table><thead><tr>${r.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead></table></div>`;
    return `<div class="sql-res"><div class="sql-cap">查詢結果：${r.total} 筆${more}</div><div class="sql-scroll"><table><thead><tr>${r.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${r.rows.map(row => `<tr>${row.map(v => `<td${typeof v === 'number' ? ' class="n"' : ''}>${cell(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
  }
  function enhanceSql(pre) {
    const seed = pre.getAttribute('data-db') || 'shop';
    const { box, ta } = shell(pre, 'SQL', '<button type="button" class="py-btn run">執行</button><button type="button" class="py-btn stop" hidden>停止</button><button type="button" class="py-btn schema">資料表</button>');
    const out = document.createElement('div');
    out.className = 'py-out sql-out'; out.hidden = true;
    box.appendChild(out);
    const btnRun = box.querySelector('.run'), btnStop = box.querySelector('.stop');
    const finish = () => { sqlBusy = null; btnRun.disabled = false; btnStop.hidden = true; box.classList.remove('running'); };
    function send(msg, onDone) {
      if (sqlBusy) { out.hidden = false; out.innerHTML = '<p class="py-err">另一段查詢正在執行，請稍候。</p>'; return; }
      out.hidden = false; out.innerHTML = '<p class="py-status">載入 SQLite 中…</p>';
      btnRun.disabled = true; btnStop.hidden = false; box.classList.add('running');
      const t0 = performance.now();
      sqlBusy = m => { finish(); onDone(m, performance.now() - t0); };
      getSql().postMessage(msg);
    }
    function run() {
      send({ action: 'run', seed, sql: ta.value }, (m, ms) => {
        let html = (m.results || []).map(r => r.cols ? table(r)
          : `<p class="sql-msg">${r.changes !== null ? `${esc(r.kind)} 完成，影響 ${r.changes} 筆資料` : `${esc(r.kind || '指令')} 執行完成`}</p>`).join('');
        if (m.type === 'error') {
          const hint = SQL_HINTS.find(([re]) => re.test(m.text));
          html += `<p class="py-err">錯誤：${esc(m.text)}</p>${hint ? `<p class="py-hint">提示：${esc(hint[1])}</p>` : ''}`;
        } else if (!m.results.length) html += '<p class="py-status">沒有可執行的 SQL 語句。</p>';
        out.innerHTML = html + `<p class="py-status">— 執行完成，${fmtMs(ms)}（範例資料每次執行都會重新建立）</p>`;
      });
    }
    box.addEventListener('run', run);
    btnRun.addEventListener('click', run);
    btnStop.addEventListener('click', () => { if (sqlWorker) { sqlWorker.terminate(); sqlWorker = null; } finish(); out.innerHTML = '<p class="py-err">已停止執行。</p>'; });
    box.querySelector('.schema').addEventListener('click', () => {
      send({ action: 'schema', seed }, m => {
        if (m.type !== 'schema') { out.innerHTML = `<p class="py-err">${esc(m.text || '無法讀取資料表')}</p>`; return; }
        out.innerHTML = `<div class="sql-schema">${m.tables.map(t => `<div><b>${esc(t.name)}</b><small>${t.n} 筆</small><ul>${t.cols.map(c => `<li${c.pk ? ' class="pk"' : ''}>${esc(c.name)}<span>${esc(c.type)}${c.pk ? '・主鍵' : ''}</span></li>`).join('')}</ul></div>`).join('')}</div>`;
      });
    });
    box.addEventListener('reset', () => { out.hidden = true; });
  }

  /* ---------- 網頁預覽（HTML／CSS／JS） ---------- */
  let frameSeq = 0;
  const frames = new Map();
  // 預覽內容交給 /sandbox.html 顯示：它有自己的 CSP，可以執行內嵌腳本，主站的 CSP 不必放寬。
  // 每次執行都換一個查詢字串重新載入，確保是全新的頁面（同網址只差 # 時瀏覽器不會重新載入）
  function show(id, html) {
    const f = frames.get(id);
    f.html = html;
    f.frame.src = '/sandbox.html?n=' + (++f.n);
  }
  addEventListener('message', e => {
    const d = e.data;
    if (d && d.__sandbox === 'ready') {
      for (const f of frames.values()) if (e.source === f.frame.contentWindow && f.html != null) e.source.postMessage({ __sandbox: 'render', html: f.html }, '*');
      return;
    }
    if (!d || typeof d !== 'object' || !d.__web) return;
    const f = frames.get(d.__web);
    if (!f || e.source !== f.frame.contentWindow) return;
    if (d.type === 'h') f.frame.style.height = Math.min(520, Math.max(60, d.h + 4)) + 'px';
    else f.log(d.type, d.text);
  });
  // 注入到預覽頁的程式：把 console 與錯誤轉送給主畫面
  const bridge = id => `<script>(function(){var I=${id};function f(v,t){if(typeof v==='string')return t?v:"'"+v+"'";try{if(v instanceof Error)return v.name+': '+v.message;if(v instanceof Element)return '<'+v.tagName.toLowerCase()+'>';return JSON.stringify(v)===undefined?String(v):JSON.stringify(v)}catch(e){return String(v)}}
function s(type,a){parent.postMessage({__web:I,type:type,text:Array.prototype.map.call(a,function(v){return f(v,1)}).join(' ')},'*')}
['log','info','warn','error','table'].forEach(function(k){console[k]=function(){s(k==='error'?'error':k==='warn'?'warn':'log',arguments)}});
addEventListener('error',function(e){s('error',[e.message])});addEventListener('unhandledrejection',function(e){s('error',['Uncaught (in promise) '+(e.reason&&e.reason.message||e.reason)])});
function h(){parent.postMessage({__web:I,type:'h',h:document.documentElement.scrollHeight},'*')}addEventListener('load',h);new ResizeObserver(h).observe(document.documentElement);
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented)return;var h=a.getAttribute('href');e.preventDefault();if(h.charAt(0)==='#')location.hash=h;else s('warn',['（預覽中不會開啟連結：'+h+'）'])});})();<\/script>`;
  const BASE_CSS = '<style>html{color-scheme:light}body{font-family:system-ui,-apple-system,"Noto Sans TC","Microsoft JhengHei",sans-serif;margin:12px;line-height:1.6;color:#16181d;background:#fff}</style>';
  function enhanceWeb(pre) {
    const { box, ta } = shell(pre, 'HTML', '<button type="button" class="py-btn run">更新預覽</button>');
    const wrap = document.createElement('div');
    wrap.className = 'web-out';
    wrap.innerHTML = '<div class="web-label">預覽</div><iframe sandbox="allow-scripts allow-modals allow-forms" title="網頁預覽"></iframe><pre class="web-console" hidden></pre>';
    box.appendChild(wrap);
    const frame = wrap.querySelector('iframe'), con = wrap.querySelector('.web-console');
    const id = ++frameSeq;
    frames.set(id, {
      frame, n: 0,
      log(type, text) { con.hidden = false; const s = document.createElement('span'); s.className = 'c-' + type; s.textContent = text + '\n'; con.appendChild(s); }
    });
    function run() { con.textContent = ''; con.hidden = true; show(id, `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">${BASE_CSS}${bridge(id)}</head><body>${ta.value}</body></html>`); }
    box.addEventListener('run', run);
    box.querySelector('.run').addEventListener('click', run);
    box.addEventListener('reset', run);
    let t; ta.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 600); }); // 輸入停頓後自動更新
    // 捲到附近才建立預覽，避免一次載入太多 iframe
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); run(); } }, { rootMargin: '300px' });
    io.observe(box);
  }

  /* ---------- React（JSX 即時預覽） ---------- */
  // Babel 約 3 MB，第一次遇到 React 區塊才載入；React 原始碼抓一次後內嵌到每個預覽頁
  let babelP = null, reactP = null;
  const loadBabel = () => babelP || (babelP = new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = '/static/vendor/react/babel.min.js';
    s.onload = () => ok(window.Babel);
    s.onerror = () => { babelP = null; s.remove(); fail(new Error('babel')); };
    document.head.appendChild(s);
  }));
  const loadReact = () => reactP || (reactP = Promise.all(['react', 'react-dom'].map(n => fetch(`/static/vendor/react/${n}.production.min.js`).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })))
    .then(a => a.join('\n').replace(/<\/script/gi, '<\\/script'))
    .catch(e => { reactP = null; throw e; }));
  const HOOKS = 'useState,useEffect,useRef,useMemo,useCallback,useReducer,useContext,createContext,useId,useLayoutEffect,useTransition,useDeferredValue,memo,forwardRef,Fragment,StrictMode,Suspense,lazy,Children';
  const REACT_CSS = '<style>button{font:inherit;padding:4px 12px;margin:2px;border:1px solid #b9bec7;border-radius:6px;background:#f6f7f9;color:inherit;cursor:pointer}button:hover{background:#eceef2}button:disabled{opacity:.5;cursor:default}input,select,textarea{font:inherit;padding:4px 8px;border:1px solid #b9bec7;border-radius:6px;margin:2px}ul{padding-left:1.4em}</style>';
  // React 正式版只回報錯誤代碼，這裡換成中文說明
  const REACT_ERR = {
    31: '物件不能直接放進 JSX 顯示：請改成顯示物件的某個屬性，或用 map 把陣列轉成元素。',
    130: '元件型別無效（得到 undefined）：元件名稱可能打錯，或忘了定義這個元件。',
    185: '更新次數超過上限：effect 裡更新了 state，而依賴陣列又包含這個 state，形成無限迴圈。',
    300: 'Hook 的呼叫次數改變了：不能在 if、迴圈或提早 return 之後呼叫 Hook。',
    301: '重新渲染次數過多：通常是在渲染時直接呼叫了 setState，例如 onClick={setCount(1)} 應寫成 onClick={() => setCount(1)}。',
    310: 'Hook 的呼叫次數改變了：不能在 if、迴圈或提早 return 之後呼叫 Hook。',
    321: 'Hook 呼叫位置錯誤：Hook 只能在函式元件或自訂 Hook 的最上層呼叫。'
  };
  const JSX_HINTS = [
    [/Adjacent JSX elements/, '多個 JSX 元素必須包在同一個父元素裡，或用 Fragment <>…</> 包起來。'],
    [/Expected corresponding JSX closing tag|Unterminated JSX contents/, '標籤沒有正確關閉：每個標籤都要成對，<img>、<input>、<br> 在 JSX 中要寫成 <img />。'],
    [/is not defined/, '名稱未定義：檢查拼字與大小寫；自訂元件的名稱必須以大寫字母開頭。'],
    [/Cannot read properties of (undefined|null)/, '讀取了 undefined 或 null 的屬性：資料可能還沒準備好，或 props 名稱打錯。'],
    [/is not a function/, '不是函式：檢查名稱拼字，或確認這個值真的是函式（例如 map 只能用在陣列上）。'],
    [/Unexpected token/, '語法錯誤：檢查括號、大括號是否成對，JSX 中的 JavaScript 運算式要用 { } 包起來。']
  ];
  // 把講義中的模組寫法轉成預覽中可執行的程式：拿掉 import／export，最後自動渲染 App
  function toScript(src) {
    const skipped = [];
    const code = src
      .replace(/^[ \t]*import\s+[^;\n]*?from\s+['"]([^'"]+)['"];?[ \t]*$/gm, (m, mod) => { if (!/^react(-dom(\/client)?)?$/.test(mod)) skipped.push(mod); return ''; })
      .replace(/^[ \t]*import\s+['"]([^'"]+)['"];?[ \t]*$/gm, (m, mod) => { skipped.push(mod); return ''; })
      .replace(/^export\s+default\s+(function|class)\b/gm, '$1')
      .replace(/^export\s+default\s+[\w$]+;?[ \t]*$/gm, '')
      .replace(/^export\s+(const|let|function|class)\b/gm, '$1');
    const js = window.Babel.transform(code, { presets: [['react', { runtime: 'classic' }]], sourceType: 'script', filename: 'App.jsx' }).code;
    const auto = /createRoot\s*\(/.test(src) ? '' : "\nif (typeof App === 'function') createRoot(document.getElementById('root')).render(React.createElement(App));\nelse console.warn('找不到名為 App 的元件，沒有東西可以顯示。');";
    return { js: `(function(){var {${HOOKS}} = React; var createRoot = ReactDOM.createRoot;\n{\n${js}${auto}\n}\n})();`, skipped };
  }
  function enhanceJsx(pre) {
    const { box, ta } = shell(pre, 'React', '<button type="button" class="py-btn run">更新預覽</button>');
    const wrap = document.createElement('div');
    wrap.className = 'web-out';
    wrap.innerHTML = '<div class="web-label">預覽</div><iframe sandbox="allow-scripts allow-modals allow-forms" title="React 預覽"></iframe><pre class="web-console" hidden></pre>';
    box.appendChild(wrap);
    const frame = wrap.querySelector('iframe'), con = wrap.querySelector('.web-console');
    const id = ++frameSeq;
    const log = (type, text) => {
      const m = /Minified React error #(\d+)/.exec(text);
      if (m) text = (REACT_ERR[m[1]] || '程式執行時發生錯誤') + `（React 錯誤代碼 #${m[1]}）`;
      else if (type === 'error') { const h = JSX_HINTS.find(([re]) => re.test(text)); if (h) text += '\n→ ' + h[1]; }
      if (con.lastChild && con.lastChild.textContent === text + '\n') return; // React 會同時拋出與記錄同一個錯誤
      con.hidden = false;
      const s = document.createElement('span'); s.className = 'c-' + type; s.textContent = text + '\n'; con.appendChild(s);
    };
    frames.set(id, { frame, log, n: 0 });
    let seq = 0;
    async function run() {
      const my = ++seq;
      let react, r;
      try { [, react] = await Promise.all([loadBabel(), loadReact()]); }
      catch (e) { con.textContent = ''; log('error', '無法載入 React 執行環境，請檢查網路連線後按「更新預覽」再試一次。'); return; }
      if (my !== seq) return;
      con.textContent = ''; con.hidden = true;
      try { r = toScript(ta.value); }
      catch (e) { log('error', '語法錯誤：' + String(e.message).replace(/^\/?App\.jsx: /, '')); show(id, ''); return; }
      r.skipped.forEach(m => log('warn', `（預覽環境不支援匯入 ${m}，已略過這一行）`));
      show(id, `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">${BASE_CSS}${REACT_CSS}${bridge(id)}<script>${react}<\/script></head><body><div id="root"></div><script>${r.js.replace(/<\/script/gi, '<\\/script')}<\/script></body></html>`);
    }
    box.addEventListener('run', run);
    box.querySelector('.run').addEventListener('click', run);
    box.addEventListener('reset', run);
    let t; ta.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 800); });
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); run(); } }, { rootMargin: '300px' });
    io.observe(box);
  }

  /* ---------- JavaScript（背景執行緒） ---------- */
  // 仿照 Node.js 的 console.log 格式，讓輸出和講義、題庫一致
  const PRELUDE = `
const __fmt = (v, d = 0, top = true) => {
  if (typeof v === 'string') return top ? v : "'" + v.replace(/'/g, "\\\\'") + "'";
  if (typeof v === 'number' || typeof v === 'boolean' || typeof v === 'bigint') return String(v) + (typeof v === 'bigint' ? 'n' : '');
  if (v === undefined) return 'undefined';
  if (v === null) return 'null';
  if (typeof v === 'function') return '[Function: ' + (v.name || '(anonymous)') + ']';
  if (typeof v === 'symbol') return v.toString();
  if (v instanceof Error) return (v.stack || String(v)).split('\\n')[0];
  if (v instanceof Date) return v.toISOString();
  if (d > 3) return Array.isArray(v) ? '[Array]' : '[Object]';
  if (Array.isArray(v)) return v.length ? '[ ' + v.map(x => __fmt(x, d + 1, false)).join(', ') + ' ]' : '[]';
  if (v instanceof Map) return 'Map(' + v.size + ') {' + (v.size ? ' ' + [...v].map(([k, x]) => __fmt(k, d + 1, false) + ' => ' + __fmt(x, d + 1, false)).join(', ') + ' ' : '') + '}';
  if (v instanceof Set) return 'Set(' + v.size + ') {' + (v.size ? ' ' + [...v].map(x => __fmt(x, d + 1, false)).join(', ') + ' ' : '') + '}';
  if (v instanceof Promise) return 'Promise { <pending> }';
  const keys = Object.keys(v);
  const name = v.constructor && v.constructor !== Object && v.constructor.name ? v.constructor.name + ' ' : '';
  return keys.length ? name + '{ ' + keys.map(k => (/^[A-Za-z_$][\\w$]*$/.test(k) ? k : "'" + k + "'") + ': ' + __fmt(v[k], d + 1, false)).join(', ') + ' }' : name + '{}';
};
const __send = (type, args) => postMessage({ type, text: Array.from(args).map(a => __fmt(a)).join(' ') });
console.log = console.info = console.debug = (...a) => __send('log', a);
console.warn = (...a) => __send('warn', a);
console.error = (...a) => __send('error', a);
console.table = (d) => __send('log', [d]);
self.addEventListener('unhandledrejection', e => { e.preventDefault(); postMessage({ type: 'error', text: 'Uncaught (in promise) ' + (e.reason && e.reason.stack ? String(e.reason.stack).split('\\n')[0] : e.reason) }); });
`;
  const JS_HINTS = [
    [/is not defined/, '名稱未定義：變數或函式還沒宣告就使用，或拼字、大小寫不一致。'],
    [/Cannot read properties of (undefined|null)/, '對 undefined 或 null 讀取屬性：檢查變數是否有值，可用 ?. 選擇性串連。'],
    [/is not a function/, '不是函式：檢查名稱拼字，或這個值是否真的是函式（例如陣列方法名稱）。'],
    [/Assignment to constant variable/, 'const 宣告的變數不能重新指定，需要改變時請用 let。'],
    [/Unexpected token|Unexpected end of input|missing \)/, '語法錯誤：檢查括號、大括號、引號是否成對，以及逗號是否多寫或漏寫。'],
    [/has already been declared/, '重複宣告：同一個範圍內不能用 let／const 宣告兩次同名變數。'],
    [/Unexpected token .*JSON|is not valid JSON/, 'JSON 格式錯誤：鍵與字串要用雙引號，最後一項後面不能有逗號。']
  ];
  /* ---------- TypeScript（型別檢查通過後交給 JavaScript 執行器） ---------- */
  // 官方編譯器壓縮後約 1.6 MB，第一次執行 TypeScript 範例時才在背景執行緒載入
  let tsWorker = null, tsReady = false, tsSeq = 0;
  const tsWait = new Map();
  const tsFail = text => { tsWait.forEach(f => f({ diags: [{ line: 0, code: 0, text }], js: '' })); tsWait.clear(); };
  const tsCheck = code => new Promise(ok => {
    if (!tsWorker) {
      tsWorker = new Worker('/static/js/ts-worker.js');
      tsWorker.onmessage = e => {
        const d = e.data;
        if (d.ready) { tsReady = true; return; }
        const f = tsWait.get(d.id); if (f) { tsWait.delete(d.id); f(d); }
      };
      tsWorker.onerror = e => { e.preventDefault(); tsWorker = null; tsReady = false; tsFail('無法載入 TypeScript 編譯器，請檢查網路連線後再試一次。'); };
    }
    const id = ++tsSeq;
    tsWait.set(id, ok);
    tsWorker.postMessage({ id, code });
  });
  // TypeScript 錯誤代碼的中文說明
  const TS_HINTS = {
    2322: '型別不符：指定的值和宣告的型別不同。', 2345: '參數型別不符：傳入函式的值和參數宣告的型別不同。',
    2339: '屬性不存在：這個型別上沒有這個屬性，檢查拼字或型別定義。', 2551: '屬性不存在，可能是拼字錯誤（訊息最後會建議正確的名稱）。',
    2304: '找不到名稱：變數、函式或型別還沒宣告，或拼字錯誤。', 7006: '參數隱含 any：strict 模式要求為參數標註型別。',
    2741: '缺少必要屬性：物件少了型別定義中必填的屬性。', 2554: '參數個數不符：傳入的參數數量和函式宣告不同。',
    18047: '可能是 null：使用前先檢查，或使用 ?. 選擇性串連。', 18048: '可能是 undefined：使用前先檢查，或提供預設值。',
    2531: '物件可能是 null：使用前先檢查。', 2532: '物件可能是 undefined：使用前先檢查。',
    2588: 'const 宣告的變數不能重新指定。', 2540: '唯讀（readonly）屬性不能修改。', 2341: 'private 屬性只能在類別內部存取。',
    2353: '物件有型別中沒有定義的屬性，檢查拼字或型別定義。', 2561: '物件有型別中沒有定義的屬性，可能是拼錯字（訊息最後會建議正確的名稱）。', 2367: '比較的兩個型別沒有交集，這個條件永遠不會成立。',
    2366: '函式缺少回傳值：有些執行路徑沒有 return。', 2564: '類別屬性沒有初始化：在宣告時或建構子中給初始值。',
    2769: '沒有符合的多載：傳入的參數不符合任何一種函式簽章。', 2349: '這個值不能被呼叫：它不是函式。',
    2820: '字串不在允許的值之中（訊息最後會建議正確的值）。', 2678: 'switch 的 case 不在可能的值之中。',
    2362: '算術運算的左邊必須是數字型別。', 2363: '算術運算的右邊必須是數字型別。', 2365: '這兩種型別不能用這個運算子。'
  };
  function enhanceJs(pre, isTs) {
    const { box, ta } = shell(pre, isTs ? 'TypeScript' : 'JavaScript', '<button type="button" class="py-btn run">執行</button><button type="button" class="py-btn stop" hidden>停止</button>');
    const out = document.createElement('div');
    out.className = 'py-out'; out.hidden = true; out.innerHTML = '<pre></pre>';
    box.appendChild(out);
    const outPre = out.querySelector('pre');
    const btnRun = box.querySelector('.run'), btnStop = box.querySelector('.stop');
    let w = null, timers = [], t0 = 0, url = null, checkSeq = 0;
    const write = (t, cls) => { const s = document.createElement('span'); if (cls) s.className = cls; s.textContent = t + '\n'; outPre.appendChild(s); };
    const stop = msg => {
      checkSeq++;
      if (w) { w.terminate(); w = null; }
      if (url) { URL.revokeObjectURL(url); url = null; }
      timers.forEach(clearTimeout); timers = [];
      btnRun.disabled = false; btnStop.hidden = true; box.classList.remove('running');
      if (msg) write(msg, 'py-err');
    };
    async function run() {
      stop();
      out.hidden = false; outPre.textContent = '';
      btnRun.disabled = true; btnStop.hidden = false; box.classList.add('running');
      t0 = performance.now();
      let code = ta.value;
      if (isTs) {
        const my = checkSeq;
        write(tsReady ? '型別檢查中…' : '第一次執行：正在載入 TypeScript 編譯器並進行型別檢查…', 'py-status');
        const r = await tsCheck(code);
        if (my !== checkSeq) return;
        outPre.textContent = '';
        if (r.diags.length) {
          r.diags.forEach(d => {
            write((d.line ? '第 ' + d.line + ' 行：' : '') + d.text + (d.code ? ' (TS' + d.code + ')' : ''), 'py-err');
            if (TS_HINTS[d.code]) write('提示：' + TS_HINTS[d.code], 'py-hint');
          });
          write('— 型別檢查發現 ' + r.diags.length + ' 個錯誤，程式沒有執行（' + fmtMs(performance.now() - t0) + '）', 'py-status');
          stop();
          return;
        }
        code = r.js;
      }
      url = URL.createObjectURL(new Blob([PRELUDE + '\n(async () => {\n' + code + '\n})().then(() => postMessage({ type: "main" }), e => { postMessage({ type: "error", text: String(e && e.stack ? e.stack.split("\\n")[0] : e) }); postMessage({ type: "main" }); });'], { type: 'text/javascript' }));
      let errored = false;
      try { w = new Worker(url); } catch (e) { stop('無法建立執行環境：' + e.message); return; }
      const done = () => {
        if (!outPre.textContent.trim()) write('（程式已執行完畢，沒有輸出。要看到結果請使用 console.log()）', 'py-status');
        write('— ' + (isTs ? '型別檢查通過，' : '') + '執行完成，' + fmtMs(performance.now() - t0), 'py-status');
        stop();
      };
      w.onmessage = e => {
        const m = e.data;
        if (m.type === 'main') { timers.push(setTimeout(done, 1200)); return; } // 主程式結束後再等計時器、非同步輸出
        if (m.type === 'error') {
          errored = true; write(m.text, 'py-err');
          const hint = JS_HINTS.find(([re]) => re.test(m.text));
          if (hint) write('提示：' + hint[1], 'py-hint');
          return;
        }
        write(m.text, m.type === 'log' ? '' : m.type === 'warn' ? 'py-hint' : 'py-err');
      };
      w.onerror = e => { e.preventDefault(); if (!errored) { write(e.message || '執行錯誤', 'py-err'); const hint = JS_HINTS.find(([re]) => re.test(e.message || '')); if (hint) write('提示：' + hint[1], 'py-hint'); } stop(); };
      timers.push(setTimeout(() => stop('執行超過 8 秒已自動停止，請檢查是否有無限迴圈。'), 8000));
    }
    box.addEventListener('run', run);
    btnRun.addEventListener('click', run);
    btnStop.addEventListener('click', () => stop('已停止執行。'));
    box.addEventListener('reset', () => { stop(); out.hidden = true; });
  }

  /* ---------- C／C++（Compiler Explorer 編譯執行） ---------- */
  const CE = { c: { id: 'cg142', flags: '-std=c17 -Wall -O0', label: 'C' }, cpp: { id: 'g142', flags: '-std=c++17 -Wall -O0', label: 'C++' } };
  const stripAnsi = t => String(t).replace(/\x1b\[[0-9;]*[A-Za-z]/g, '');
  const CC_HINTS = [
    [/expected (',' or )?';'/, '少了分號：每一行敘述結尾都要加 ;，錯誤常常出現在「上一行」。'],
    [/undeclared|was not declared in this scope/, '名稱未宣告：變數或函式還沒宣告就使用，或是拼字、大小寫不一致；使用函式庫的函式要先 #include 對應的標頭檔。'],
    [/implicit declaration of function/, '函式未宣告：忘了 #include 標頭檔（例如 printf 需要 stdio.h、strlen 需要 string.h），或函式定義在呼叫之後卻沒有寫原型。'],
    [/expected '\)'|expected '\}'|expected declaration or statement at end of input/, '括號或大括號沒有成對：檢查 ( ) 與 { } 是否一一對應。'],
    [/format '%[a-z]*' expects argument of type/, 'printf／scanf 的格式字元與變數型別不符：int 用 %d、double 用 %f（scanf 用 %lf）、char 用 %c、字串用 %s、size_t 用 %zu。'],
    [/incompatible (pointer )?type|invalid conversion/, '型別不相容：檢查是否把指標和整數混用，或 scanf 少了 &。'],
    [/no match for 'operator/, '找不到對應的運算子：這個型別不支援該運算（例如 cout << 自訂類別需要先多載 <<）。'],
    [/no matching function for call/, '找不到符合的函式：參數的數量或型別與函式宣告不同。'],
    [/Segmentation fault|SIGSEGV|exit code 139/, '記憶體區段錯誤：存取了不該存取的記憶體，常見原因是陣列越界、使用 NULL 或未初始化的指標、free 後繼續使用。'],
    [/undefined reference to/, '連結錯誤：函式只有宣告沒有定義，或 main 拼錯。']
  ];
  function enhanceCompiled(pre, lang) {
    const cfg = CE[lang];
    const hasInput = pre.hasAttribute('data-input') || /\b(scanf|cin\s*>>|getline|fgets\s*\([^)]*stdin)/.test(pre.textContent);
    const { box, ta } = shell(pre, cfg.label, '<button type="button" class="py-btn run">編譯並執行</button>');
    box.className = 'py-box run-' + lang;
    if (hasInput) {
      const lab = document.createElement('label');
      lab.className = 'py-in';
      lab.innerHTML = '<span>標準輸入（程式讀取的資料，每行一筆）</span><textarea rows="2" spellcheck="false"></textarea>';
      lab.querySelector('textarea').value = pre.getAttribute('data-input') || '';
      lab.querySelector('textarea').addEventListener('keydown', e => e.stopPropagation());
      box.appendChild(lab);
    }
    const out = document.createElement('div');
    out.className = 'py-out'; out.hidden = true; out.innerHTML = '<pre></pre>';
    box.appendChild(out);
    const outPre = out.querySelector('pre'), btn = box.querySelector('.run');
    const write = (t, cls) => { const s = document.createElement('span'); if (cls) s.className = cls; s.textContent = t + '\n'; outPre.appendChild(s); };
    let busy = false;
    async function run() {
      if (busy) return;
      busy = true; btn.disabled = true; box.classList.add('running');
      out.hidden = false; outPre.textContent = '';
      write('編譯中…（以 Compiler Explorer 的 GCC 14.2 編譯執行）', 'py-status');
      const t0 = performance.now();
      const stdin = hasInput ? box.querySelector('.py-in textarea').value : '';
      try {
        const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 25000);
        const res = await fetch(`https://godbolt.org/api/compiler/${cfg.id}/compile`, {
          method: 'POST', signal: ctl.signal,
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ source: ta.value, lang: lang === 'c' ? 'c' : 'c++', options: { userArguments: cfg.flags, executeParameters: { args: [], stdin }, compilerOptions: { executorRequest: true }, filters: { execute: true } } })
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(res.status === 429 ? '請求太頻繁，請稍等一下再執行' : `HTTP ${res.status}`);
        const d = await res.json();
        outPre.textContent = '';
        const build = d.buildResult || {};
        const diag = stripAnsi((build.stderr || []).map(x => x.text).join('\n')).replace(/\/app\/example\.(c|cpp)|<source>/g, '程式');
        if (build.code !== 0 || !d.didExecute) {
          write('編譯失敗：', 'py-err');
          write(diag.split('\n').filter(l => /error|錯誤/.test(l) || /^\s+\d+ \|/.test(l) || /^\s+\|/.test(l)).slice(0, 12).join('\n') || diag.slice(0, 1500), 'py-err');
        } else {
          if (diag.trim()) write('編譯警告：\n' + diag.split('\n').filter(l => /warning/.test(l)).slice(0, 6).join('\n'), 'py-hint');
          const so = (d.stdout || []).map(x => x.text).join('\n'), se = stripAnsi((d.stderr || []).map(x => x.text).join('\n'));
          if (so) write(so);
          if (se) write(se, 'py-err');
          if (d.timedOut) write('執行逾時，已被中止，請檢查是否有無限迴圈。', 'py-err');
          else if (d.code !== 0) write(`程式結束代碼 ${d.code}` + (d.code === 139 || d.code === -11 ? '（Segmentation fault）' : ''), 'py-err');
          if (!so && !se && d.code === 0) write('（程式已執行完畢，沒有輸出）', 'py-status');
        }
        const all = diag + '\n' + (d.stderr || []).map(x => x.text).join('\n') + (d.code === 139 ? ' exit code 139' : '');
        const hint = CC_HINTS.find(([re]) => re.test(all));
        if (hint && (build.code !== 0 || d.code !== 0 || /warning/.test(diag))) write('提示：' + hint[1], 'py-hint');
        write('— 完成，' + fmtMs(performance.now() - t0), 'py-status');
      } catch (e) {
        outPre.textContent = '';
        write('無法連線到 Compiler Explorer：' + (e.name === 'AbortError' ? '等待逾時' : e.message) + '。請檢查網路後再試一次，或把程式複製到自己電腦的編譯器執行。', 'py-err');
      } finally {
        busy = false; btn.disabled = false; box.classList.remove('running');
      }
    }
    box.addEventListener('run', run);
    btn.addEventListener('click', run);
    box.addEventListener('reset', () => { out.hidden = true; });
  }

  const scan = () => {
    view.querySelectorAll('pre.c').forEach(p => enhanceCompiled(p, 'c'));
    view.querySelectorAll('pre.cpp').forEach(p => enhanceCompiled(p, 'cpp'));
    view.querySelectorAll('pre.sql').forEach(enhanceSql);
    view.querySelectorAll('pre.web').forEach(enhanceWeb);
    view.querySelectorAll('pre.jsx').forEach(enhanceJsx);
    view.querySelectorAll('pre.js').forEach(p => enhanceJs(p));
    view.querySelectorAll('pre.ts').forEach(p => enhanceJs(p, true));
  };
  new MutationObserver(scan).observe(view, { childList: true, subtree: true });
  scan();
})();
