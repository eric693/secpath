/* SQL 與網頁課程的執行器：把講義中的程式碼區塊變成可編輯、可執行的區塊。
   <pre class="sql" data-db="shop">  在瀏覽器中以 SQLite 執行查詢，結果顯示為表格（每次執行都從範例資料重新開始）
   <pre class="web">                 HTML／CSS／JS 片段，在隔離的 iframe 中即時預覽，並顯示 console 輸出
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
  addEventListener('message', e => {
    const d = e.data;
    if (!d || typeof d !== 'object' || !d.__web) return;
    const f = frames.get(d.__web);
    if (!f || e.source !== f.frame.contentWindow) return;
    if (d.type === 'h') f.frame.style.height = Math.min(520, Math.max(60, d.h + 4)) + 'px';
    else f.log(d.type, d.text);
  });
  // 注入到預覽頁的程式：把 console 與錯誤轉送給主畫面
  const bridge = id => `<script>(function(){var I=${id};function f(v,t){if(typeof v==='string')return t?v:"'"+v+"'";try{if(v instanceof Element)return '<'+v.tagName.toLowerCase()+'>';return JSON.stringify(v)===undefined?String(v):JSON.stringify(v)}catch(e){return String(v)}}
function s(type,a){parent.postMessage({__web:I,type:type,text:Array.prototype.map.call(a,function(v){return f(v,1)}).join(' ')},'*')}
['log','info','warn','error','table'].forEach(function(k){console[k]=function(){s(k==='error'?'error':k==='warn'?'warn':'log',arguments)}});
addEventListener('error',function(e){s('error',[e.message])});addEventListener('unhandledrejection',function(e){s('error',['Uncaught (in promise) '+(e.reason&&e.reason.message||e.reason)])});
function h(){parent.postMessage({__web:I,type:'h',h:document.documentElement.scrollHeight},'*')}addEventListener('load',h);new ResizeObserver(h).observe(document.documentElement);
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(a&&a.getAttribute('href').charAt(0)!=='#'){e.preventDefault();s('warn',['（預覽中不會開啟連結：'+a.getAttribute('href')+'）'])}});})();<\/script>`;
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
      frame,
      log(type, text) { con.hidden = false; const s = document.createElement('span'); s.className = 'c-' + type; s.textContent = text + '\n'; con.appendChild(s); }
    });
    function run() { con.textContent = ''; con.hidden = true; frame.srcdoc = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">${BASE_CSS}${bridge(id)}</head><body>${ta.value}</body></html>`; }
    box.addEventListener('run', run);
    box.querySelector('.run').addEventListener('click', run);
    box.addEventListener('reset', run);
    let t; ta.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 600); }); // 輸入停頓後自動更新
    // 捲到附近才建立預覽，避免一次載入太多 iframe
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
  function enhanceJs(pre) {
    const { box, ta } = shell(pre, 'JavaScript', '<button type="button" class="py-btn run">執行</button><button type="button" class="py-btn stop" hidden>停止</button>');
    const out = document.createElement('div');
    out.className = 'py-out'; out.hidden = true; out.innerHTML = '<pre></pre>';
    box.appendChild(out);
    const outPre = out.querySelector('pre');
    const btnRun = box.querySelector('.run'), btnStop = box.querySelector('.stop');
    let w = null, timers = [], t0 = 0, url = null;
    const write = (t, cls) => { const s = document.createElement('span'); if (cls) s.className = cls; s.textContent = t + '\n'; outPre.appendChild(s); };
    const stop = msg => {
      if (w) { w.terminate(); w = null; }
      if (url) { URL.revokeObjectURL(url); url = null; }
      timers.forEach(clearTimeout); timers = [];
      btnRun.disabled = false; btnStop.hidden = true; box.classList.remove('running');
      if (msg) write(msg, 'py-err');
    };
    function run() {
      stop();
      out.hidden = false; outPre.textContent = '';
      btnRun.disabled = true; btnStop.hidden = false; box.classList.add('running');
      t0 = performance.now();
      url = URL.createObjectURL(new Blob([PRELUDE + '\n(async () => {\n' + ta.value + '\n})().then(() => postMessage({ type: "main" }), e => { postMessage({ type: "error", text: String(e && e.stack ? e.stack.split("\\n")[0] : e) }); postMessage({ type: "main" }); });'], { type: 'text/javascript' }));
      let errored = false;
      try { w = new Worker(url); } catch (e) { stop('無法建立執行環境：' + e.message); return; }
      const done = () => {
        if (!outPre.textContent.trim()) write('（程式已執行完畢，沒有輸出。要看到結果請使用 console.log()）', 'py-status');
        write('— 執行完成，' + fmtMs(performance.now() - t0), 'py-status');
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
    view.querySelectorAll('pre.js').forEach(enhanceJs);
  };
  new MutationObserver(scan).observe(view, { childList: true, subtree: true });
  scan();
})();
