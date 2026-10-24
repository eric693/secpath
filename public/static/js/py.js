/* Python 執行器：把講義與工具中的 <pre class="py"> 變成可編輯、可執行的程式碼區塊。
   Pyodide 在 Web Worker 中執行，第一次按「執行」才下載；可用「停止」中斷無限迴圈。
   <pre class="py" data-input="第一行&#10;第二行"> 可預先填入 input() 的輸入資料。 */
(function () {
  const view = document.getElementById('view');
  if (!view) return;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let worker = null, busy = null;

  // 常見錯誤的中文提示
  const HINTS = [
    [/IndentationError/, '縮排錯誤：檢查 if、for、def 等冒號下一行是否一致縮排 4 個空格。'],
    [/SyntaxError/, '語法錯誤：常見原因是少了冒號、括號或引號沒有成對、中文全形符號。'],
    [/NameError/, '名稱錯誤：變數或函式還沒定義就使用，或是拼字、大小寫不一致。'],
    [/TypeError/, '型別錯誤：例如字串和數字直接相加，可用 str() 或 int() 先轉換型別。'],
    [/ValueError/, '值錯誤：型別對但內容不合法，例如 int("abc")。'],
    [/IndexError/, '索引超出範圍：串列長度為 n 時，索引只能是 0 到 n-1。'],
    [/KeyError/, '字典找不到這個鍵：可先用 in 檢查，或改用 dict.get()。'],
    [/ZeroDivisionError/, '除以零：除法前先確認除數不是 0。'],
    [/AttributeError/, '屬性錯誤：這個型別沒有這個方法或屬性，檢查拼字或變數型別。'],
    [/ModuleNotFoundError/, '找不到模組：瀏覽器版只支援標準函式庫與部分常用套件，其餘請在自己的電腦執行。'],
    [/EOFError/, '沒有輸入資料：請在「輸入」欄位每行填一筆，對應每次 input()。'],
    [/RecursionError/, '遞迴太深：檢查遞迴函式是否有正確的終止條件。']
  ];

  function getWorker() {
    if (!worker) {
      worker = new Worker('/static/js/py-worker.js');
      worker.onmessage = e => busy && busy(e.data);
    }
    return worker;
  }

  function enhance(pre) {
    const code = pre.textContent.replace(/^\n/, '').replace(/\s+$/, '');
    const hasInput = pre.hasAttribute('data-input') || /\binput\s*\(/.test(code);
    const box = document.createElement('div');
    box.className = 'py-box';
    box.innerHTML = `
      <div class="py-head"><span>Python</span><span class="py-actions">
        <button type="button" class="py-btn run">執行</button>
        <button type="button" class="py-btn stop" hidden>停止</button>
        <button type="button" class="py-btn reset">還原</button></span></div>
      <textarea class="py-code" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Python 程式碼"></textarea>
      ${hasInput ? `<label class="py-in"><span>輸入（每行對應一次 input()）</span><textarea rows="2" spellcheck="false"></textarea></label>` : ''}
      <div class="py-out" hidden><pre></pre><div class="py-figs"></div></div>`;
    const ta = box.querySelector('.py-code'), out = box.querySelector('.py-out'), outPre = out.querySelector('pre');
    const inTa = box.querySelector('.py-in textarea');
    const fit = () => { ta.style.height = 'auto'; ta.style.height = Math.max(60, ta.scrollHeight + 2) + 'px'; };
    ta.value = code;
    if (inTa) inTa.value = pre.getAttribute('data-input') || '';
    pre.replaceWith(box);
    requestAnimationFrame(fit);
    ta.addEventListener('input', fit);
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText('    ', s, ta.selectionEnd, 'end'); fit(); }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
      e.stopPropagation(); // 避免觸發全站快捷鍵
    });
    if (inTa) inTa.addEventListener('keydown', e => e.stopPropagation());

    const btnRun = box.querySelector('.run'), btnStop = box.querySelector('.stop');
    const finish = () => { busy = null; btnRun.disabled = false; btnStop.hidden = true; box.classList.remove('running'); };
    const write = (t, cls) => { const s = document.createElement('span'); if (cls) s.className = cls; s.textContent = t + '\n'; outPre.appendChild(s); };
    function run() {
      if (busy) { write('另一段程式正在執行，請先停止或等待完成。', 'py-err'); return; }
      out.hidden = false; outPre.textContent = ''; out.querySelector('.py-figs').innerHTML = '';
      const status = document.createElement('span'); status.className = 'py-status'; outPre.appendChild(status);
      btnRun.disabled = true; btnStop.hidden = false; box.classList.add('running');
      const t0 = performance.now();
      busy = m => {
        if (m.type === 'status') { status.textContent = m.text + '\n'; return; }
        if (m.type === 'out') { write(m.text); return; }
        if (m.type === 'err') { write(m.text, 'py-err'); return; }
        status.remove();
        (m.figs || []).forEach(b64 => { const img = document.createElement('img'); img.alt = 'matplotlib 圖表'; img.src = 'data:image/png;base64,' + b64; out.querySelector('.py-figs').appendChild(img); });
        if (m.type === 'error') {
          const lines = m.text.trim().split('\n');
          // 只保留使用者程式的行號與最後的錯誤訊息，隱藏 Pyodide 內部的呼叫堆疊
          const tail = lines.filter(l => /<exec>/.test(l) || (!/^\s/.test(l) && !/^Traceback/.test(l)));
          write(tail.slice(-4).join('\n').replace(/\s*File "<exec>", line (\d+)(, in .*)?/g, '第 $1 行：').trim(), 'py-err');
          const hint = HINTS.find(([re]) => re.test(m.text));
          if (hint) write('提示：' + hint[1], 'py-hint');
        } else if (!outPre.textContent.trim() && !(m.figs || []).length) {
          write('（程式已執行完畢，沒有輸出。要看到結果請使用 print()）', 'py-status');
        }
        const ms = Math.round(performance.now() - t0);
        write(`— 執行完成，${ms < 1000 ? ms + ' 毫秒' : (ms / 1000).toFixed(1) + ' 秒'}`, 'py-status');
        finish();
      };
      getWorker().postMessage({ code: ta.value, input: inTa ? inTa.value : '' });
    }
    btnRun.addEventListener('click', run);
    btnStop.addEventListener('click', () => {
      if (worker) { worker.terminate(); worker = null; }
      write('已停止執行。下次執行需要重新載入 Python 環境。', 'py-err');
      finish();
    });
    box.querySelector('.reset').addEventListener('click', () => { ta.value = code; fit(); out.hidden = true; });
  }

  const scan = () => view.querySelectorAll('pre.py').forEach(enhance);
  new MutationObserver(scan).observe(view, { childList: true, subtree: true });
  scan();
})();
