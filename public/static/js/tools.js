/* 互動練習：各工具的畫面與行為。由各級 LEVEL.tools 決定要顯示哪些工具 */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const PORTS = [
    [20, 'FTP（資料）'], [21, 'FTP（控制）'], [22, 'SSH / SFTP'], [23, 'Telnet'], [25, 'SMTP'], [53, 'DNS'],
    [67, 'DHCP'], [69, 'TFTP'], [80, 'HTTP'], [88, 'Kerberos'], [110, 'POP3'], [123, 'NTP'], [143, 'IMAP'], [161, 'SNMP'],
    [389, 'LDAP'], [443, 'HTTPS'], [445, 'SMB'], [514, 'Syslog'], [636, 'LDAPS'], [993, 'IMAPS'],
    [995, 'POP3S'], [1433, 'MS SQL'], [3306, 'MySQL'], [3389, 'RDP'], [5432, 'PostgreSQL']
  ];

  const META = {
    hash: { name: 'SHA-256 雜湊', desc: '輸入只差一個字，雜湊值幾乎完全不同，用以理解雪崩效應與完整性驗證。' },
    caesar: { name: '凱薩密碼', desc: '最早的替換式加密。嘗試加解密與暴力破解，理解金鑰空間的重要性。' },
    base64: { name: '編碼與加密的差異', desc: 'Base64 不需金鑰即可還原，因此不能視為加密。' },
    pw: { name: '密碼強度估算', desc: '依字元集與長度估算暴力破解所需時間，理解長度對密碼強度的影響。' },
    ale: { name: 'ALE 風險計算', desc: '輸入 AV、EF、ARO，計算 SLE、ALE 與控制措施的年度價值。' },
    matrix: { name: '風險矩陣', desc: '點選可能性與衝擊的組合，判斷風險等級與建議處理方式。' },
    backup: { name: '備份還原模擬', desc: '比較增量備份與差異備份在不同當機日需要還原的備份份數。' },
    ports: { name: '埠號練習', desc: '常見服務與預設埠號的配對練習，可切換正向與反向模式。' },
    cvss: { name: 'CVSS 3.1 基本分數計算', desc: '選擇各項基本指標，即時計算分數、嚴重等級與向量字串。' },
    confusion: { name: '混淆矩陣與評估指標', desc: '輸入 TP、FP、FN、TN，計算準確率、精確率、召回率、F1，理解不同指標的取捨。' },
    stats: { name: '敘述統計與標準化', desc: '輸入一組數值，計算平均數、中位數、變異數、四分位距與離群值，並比較 Min-Max 與 Z-score。' },
    gd: { name: '梯度下降與學習率', desc: '以 f(x) = x² 觀察學習率太小、適中與太大時，參數如何收斂或發散。' },
    chmod: { name: 'chmod 權限計算器', desc: '勾選擁有者、群組、其他人的讀寫執行權限，即時換算數字與符號表示，也可反向輸入數字解讀。' },
    cron: { name: 'cron 表示式解讀', desc: '輸入五個欄位的排程設定，轉成中文說明並列出接下來五次執行時間。' },
    subnet: { name: '子網路計算器', desc: '輸入 IP 與前綴長度，計算子網路遮罩、網路位址、廣播位址與可用主機範圍。' },
    position: { name: '部位規模計算器', desc: '依總資金、單筆風險比例、進場價與停損價，計算可買股數與投入金額，先決定最多虧多少再決定買多少。' },
    drawdown: { name: '報酬與最大回撤計算', desc: '輸入一串淨值或股價，計算總報酬、年化報酬與最大回撤，並標出前高與谷底。' },
    compound: { name: '定期定額複利試算', desc: '輸入每月投入金額、年報酬率與年數，比較投入本金與複利後的資產，並用 72 法則估算翻倍時間。' },
    softmax: { name: 'Softmax 與溫度參數', desc: '調整生成式 AI 的溫度（Temperature），觀察下一個字的機率分布如何變得集中或分散。' },
    nines: { name: 'SLA 可用性與停機時間', desc: '輸入可用性百分比換算每年、每月可停機時間，並比較元件串聯與多 AZ 並聯部署後的整體可用性。' },
    cidr: { name: 'VPC 子網路 CIDR 計算', desc: '輸入 VPC CIDR 與子網路遮罩，計算可切出的子網路數量與每個子網路可用 IP（AWS 每個子網路保留 5 個）。' },
    pricing: { name: 'EC2 計價模式比較', desc: '依每小時單價與使用時數，比較隨需、Savings Plans、預留執行個體與 Spot 的月費，理解承諾用量換折扣。' },
    s3class: { name: 'S3 儲存類別選擇', desc: '依存取頻率、取回速度與是否需要跨 AZ 備援，找出最適合的 S3 儲存類別與最短計費天數。' },
    pyrun: { name: 'Python 練習場', desc: '在瀏覽器直接寫 Python 並執行，不需安裝。支援 input()、pandas 與 matplotlib，按 Ctrl＋Enter 也能執行。' },
    slice: { name: '切片視覺化', desc: '輸入起點、終點與間隔，看清楚 a[start:stop:step] 會取出哪些元素，包含負索引與倒序。' },
    trace: { name: '迴圈逐步追蹤', desc: '一步一步執行常見的迴圈範例，觀察每一輪變數的變化，理解累加、找最大值與計數的寫法。' },
    pyerr: { name: '錯誤訊息查詢', desc: '輸入或點選錯誤名稱，查看代表的意思、常見原因與修正方式。' },
    chunk: { name: '文件切塊視覺化', desc: '調整切塊大小與重疊字數，觀察一份文件會被切成幾塊、重疊部分在哪裡，理解 RAG 的切塊（Chunking）取捨。' },
    retrieve: { name: 'RAG 檢索模擬', desc: '輸入問題，用關鍵字向量與餘弦相似度從公司 FAQ 中找出最相關的段落，觀察檢索如何決定 AI 看到的內容。' },
    llmcost: { name: 'LLM 費用估算', desc: '依每次輸入與輸出 token、每月請求數與模型單價，估算每月費用，並比較提示快取與批次處理能省多少。' },
    dockercache: { name: 'Docker 層快取模擬', desc: '比較 Dockerfile 指令順序不同時，修改程式碼或套件清單後有哪些層會重新建置、要花多少時間。' },
    gitcmd: { name: 'Git 情境指令查詢', desc: '依常見情境（改錯檔、要撤銷提交、合併衝突等）查詢該用的 Git 指令與注意事項。' },
    semver: { name: '語意化版本計算', desc: '輸入目前版本與變更類型，算出下一個版本號，並判斷相依套件的版本範圍是否允許升級。' },
    binary: { name: '二進位與 IP 轉換', desc: '輸入 IPv4 位址，逐段轉成二進位，判斷位址等級與私有位址，並換算前綴長度與子網路遮罩。' },
    osi: { name: 'OSI 分層配對', desc: '隨機出現協定、設備或資料單位名稱，選出它屬於 OSI 的哪一層，熟悉各層的代表項目。' },
    vlsm: { name: 'VLSM 子網路規劃', desc: '輸入可用網段與各部門需要的主機數，自動以 VLSM 由大到小分配子網路，列出網段、遮罩、可用範圍與浪費的位址。' },
    gitgraph: { name: 'Git 指令模擬器', desc: '在瀏覽器輸入 git commit、branch、switch、merge、reset、revert 等指令，即時觀察提交歷史與分支指標的變化。' },
    sqlorder: { name: 'SQL 執行順序', desc: '依序點選 SQL 子句，練習「撰寫順序」與「執行順序」的差別，理解為什麼 WHERE 不能用別名與彙總函式。' },
    joinviz: { name: 'JOIN 結果視覺化', desc: '切換 INNER、LEFT、RIGHT、FULL OUTER JOIN，觀察客戶表與訂單表配對後保留哪些列、哪些欄位變成 NULL。' },
    specificity: { name: '選擇器權重計算', desc: '輸入兩個 CSS 選擇器，計算 (ID, 類別, 標籤) 權重並判斷哪一條規則會生效。' },
    boxmodel: { name: '盒模型計算', desc: '調整 width、padding、border、margin 與 box-sizing，看元素實際佔用的寬度與內容區大小。' },
    flexbox: { name: 'Flexbox 遊樂場', desc: '切換 flex-direction、justify-content、align-items、flex-wrap，即時觀察子元素的排列方式與對應的 CSS。' },
    cellref: { name: '儲存格參照複製', desc: '輸入公式與複製的來源、目標儲存格，看相對、絕對、混合參照複製後分別變成什麼。' },
    xlookup: { name: 'XLOOKUP 查閱模擬', desc: '在價目表與獎金級距表中練習精確比對與近似比對，逐步看 XLOOKUP 如何找到結果，並對照 VLOOKUP 寫法。' },
    pivot: { name: '樞紐分析模擬', desc: '用講義的銷售範例資料，選擇列、欄、值與摘要方式，即時產生樞紐分析表與總計百分比。' },
    ctypes: { name: '資料型別範圍與溢位', desc: '選擇整數型別並輸入數值，看可表示的範圍、存進去後實際的值與二進位，理解無號整數繞回與有號整數的二補數。' },
    bitops: { name: '位元運算視覺化', desc: '輸入兩個數字，逐位元觀察 AND、OR、XOR、NOT 與位移的結果，並練習設定、清除、切換第 n 個位元。' },
    ptrmem: { name: '指標與記憶體圖', desc: '以 int 陣列的記憶體圖逐步執行 p++、p += 2、*p = 99 等操作，觀察指標存放的位址與指向的值如何變化。' },
    bigo: { name: '時間複雜度比較', desc: '輸入資料量 n，比較 O(1) 到 O(n!) 各需要多少次運算、以每秒 10⁸ 次估算的執行時間，判斷會不會超時。' },
    stlpick: { name: 'STL 容器選擇', desc: '依需求情境找出最適合的 STL 容器，查看常用操作的時間複雜度與範例程式。' },
    stackq: { name: '堆疊與佇列模擬', desc: '切換 stack、queue、deque，逐一執行 push、pop 等操作，觀察元素從哪一端進出，並對照 C++ STL 寫法。' },
    hashsim: { name: '雜湊表碰撞模擬', desc: '以 h(k) = k mod m 插入與搜尋鍵值，比較鏈結法與線性探測如何處理碰撞，觀察負載因子與探測次數。' },
    bstviz: { name: '二元搜尋樹視覺化', desc: '插入、搜尋、刪除節點並即時畫出二元搜尋樹，查看前序、中序、後序與層序走訪，以及退化成鏈結串列的情況。' },
    heapviz: { name: '堆積操作視覺化', desc: '對最小堆積或最大堆積執行 push、pop 與建堆積，同時觀察陣列與樹狀圖，看元素如何上浮與下沉。' },
    sortviz: { name: '排序過程逐步播放', desc: '選擇氣泡、插入、選擇、快速或合併排序，逐步觀察每次比較與交換，並統計比較與交換次數。' },
    bsearch: { name: '二分搜尋逐步追蹤', desc: '在已排序陣列中逐步追蹤 lo、mid、hi 的變化，比較「找 x」與 lower_bound 兩種寫法。' },
    dpgrid: { name: 'DP 表格逐格填寫', desc: '以 0/1 背包、LCS、編輯距離為例，逐格填寫 DP 表格並標出轉移方程用到的格子，最後回溯出答案。' },
    graphpath: { name: '最短路徑逐步執行', desc: '在範例圖上逐步執行 Dijkstra 或 BFS，觀察每一步取出的頂點與距離更新，以及最後的最短路徑樹。' },
    jsxconv: { name: 'JSX 轉換器', desc: '輸入 JSX，看它被 Babel 轉成 React.createElement 或新版 jsx() 呼叫後的樣子，理解 JSX 其實就是 JavaScript。' },
    immut: { name: '不可變更新練習', desc: '對待辦清單與使用者物件做新增、刪除、修改、排序，比較各種寫法：React 能否偵測到改變、原本的 state 有沒有被偷偷修改。' },
    effectlab: { name: 'useEffect 執行順序', desc: '切換依賴陣列與 StrictMode，模擬掛載、更新 state、改變 props、卸載，觀察 effect 與清除函式的執行時機。' },
    renderflow: { name: '重新渲染追蹤', desc: '在一棵元件樹上觸發 state 更新，切換 memo 與 useCallback，觀察哪些元件重新渲染、哪些被跳過以及原因。' },
    promptlab: { name: '提示詞產生器', desc: '依背景、任務、限制、輸出格式四要素填寫，加上範例與資料，自動組成以 XML 標籤分段的提示詞，並檢查還缺少哪些要素。' },
    ccref: { name: 'Claude Code 指令速查', desc: '搜尋 Claude Code 的斜線指令、命令列參數、快捷鍵與輸入前綴，依類別篩選並查看用途與範例。' },
    ccsetup: { name: 'CLAUDE.md 與權限設定產生器', desc: '選擇專案類型、填寫常用指令並勾選安全規則，產生專案的 CLAUDE.md 草稿與 .claude/settings.json 權限設定。' },
    apicost: { name: 'API 費用試算', desc: '選擇模型並輸入每次的輸入／輸出 token 數、每日請求數、快取比例與是否批次處理，估算每次、每日與每月費用，並比較各模型。' },
    tsinfer: { name: '型別推論探索', desc: '輸入 TypeScript 程式，用官方編譯器列出每個變數、函式與型別被推論成什麼，觀察 let 與 const、陣列、物件與函式回傳值的推論結果。' },
    tsnarrow: { name: '型別縮小步驟', desc: '逐行執行 typeof、in、Array.isArray、可辨識聯合等判斷，觀察變數的型別在每個分支中如何被縮小。' },
    tsutil: { name: '工具型別實驗室', desc: '以 User 介面為例，選擇 Partial、Required、Readonly、Pick、Omit 與要套用的欄位，看產生出來的型別與使用情境。' },
    jsonts: { name: 'JSON 轉 TypeScript 型別', desc: '貼上 API 回應的 JSON，自動產生對應的 interface，處理巢狀物件、陣列、null 與部分項目缺少的欄位。' },
    dfselect: { name: 'DataFrame 選取練習', desc: '在一個小表格上試試 loc、iloc、欄位選取與布林條件，被選到的儲存格會標示出來，並說明結果的形狀與型別。' },
    missing: { name: '缺失值處理比較', desc: '同一欄有缺失值與一個異常值，比較 dropna、補 0、補平均數、補中位數、向前填補的結果，看平均與總和如何改變。' },
    groupviz: { name: 'groupby 分組視覺化', desc: '選擇分組欄位與彙總函式，逐步觀察 split（分組）、apply（計算）、combine（組合）三個步驟。' },
    chartpick: { name: '圖表選擇器', desc: '依分析目的（趨勢、比較、分布、關係、組成）找出合適的圖表，查看示意圖、使用時機與 matplotlib／pandas 程式碼。' },
    toolschema: { name: '工具定義產生器', desc: '填寫工具名稱、說明與參數，同時產生 Claude API 的工具定義、MCP 的 tools/list 內容、Python @mcp.tool() 與 TypeScript registerTool 程式碼，並檢查名稱與說明是否寫得夠清楚。' },
    agentloop: { name: '代理迴圈逐步追蹤', desc: '以查詢訂單、平行查詢、工具失敗後重試三個情境，逐步觀察 messages 陣列如何增加、每一步的 stop_reason，以及 tool_use 與 tool_result 如何對應。' },
    patternpick: { name: '代理模式選擇器', desc: '回答幾個關於任務特性的問題，找出適合的做法：單次呼叫、提示串連、路由、平行化、協調者與工作者、評估與改進，或完全自主的代理。' },
    mcpflow: { name: 'MCP 訊息流程', desc: '逐一查看 MCP 2026-07-28 版的 server/discover、tools/list、tools/call、resources/read、prompts/get、通知與錯誤的 JSON-RPC 請求與回應。' }
  };
  const fmtN = (x, d = 4) => Number.isFinite(x) ? (+x.toFixed(d)).toString() : '—';

  // 樹狀圖：nodes 為 [{ id, x（中序位置）, d（深度）, label, cls }]，edges 為 [[父 id, 子 id]]
  const treeSvg = (nodes, edges) => {
    if (!nodes.length) return '<p class="small muted" style="margin:0">（目前是空的）</p>';
    const cols = Math.max(...nodes.map(n => n.x)) + 1, rows = Math.max(...nodes.map(n => n.d)) + 1;
    const W = Math.max(cols * 46, 140), H = rows * 58, at = {};
    nodes.forEach(n => { at[n.id] = n; n.cx = (n.x + .5) * W / cols; n.cy = n.d * 58 + 29; });
    return `<svg class="tv-svg" viewBox="0 0 ${W} ${H}" style="max-width:${W}px">${edges.map(([a, b]) => `<line x1="${at[a].cx}" y1="${at[a].cy}" x2="${at[b].cx}" y2="${at[b].cy}"/>`).join('')}${nodes.map(n => `<g class="${n.cls || ''}"><circle cx="${n.cx}" cy="${n.cy}" r="18"/><text x="${n.cx}" y="${n.cy}">${esc(n.label)}</text></g>`).join('')}</svg>`;
  };
  // 逐步播放：stepBar(p) 產生按鈕列，stepCtl 綁定行為；total() 回傳步驟數、draw(i) 繪製第 i 步，回傳跳到第 k 步的函式
  const stepBar = p => `<div class="row small st-bar"><button class="btn sm outline" type="button" data-${p}="first" title="第一步">⏮</button><button class="btn sm outline" type="button" data-${p}="prev">◀ 上一步</button><button class="btn sm" type="button" data-${p}="next">下一步 ▶</button><button class="btn sm outline" type="button" data-${p}="last" title="最後一步">⏭</button><button class="btn sm outline" type="button" data-${p}="play">自動播放</button><span class="spacer"></span><span class="muted" data-${p}-pos></span></div>`;
  const stepCtl = (root, p, total, draw, ms = 700) => {
    let i = 0, timer = null;
    const playBtn = () => root.querySelector(`[data-${p}="play"]`);
    const stop = () => { clearInterval(timer); timer = null; playBtn().textContent = '自動播放'; };
    const go = k => {
      const n = total(); i = Math.max(0, Math.min(n - 1, k)); draw(i);
      root.querySelector(`[data-${p}-pos]`).textContent = `第 ${i + 1} / ${n} 步`;
      if (timer && i >= n - 1) stop();
    };
    root.addEventListener('click', e => {
      const b = e.target.closest(`[data-${p}]`); if (!b) return;
      const a = b.dataset[p];
      if (a === 'play') {
        if (timer) return stop();
        if (i >= total() - 1) go(0);
        timer = setInterval(() => root.isConnected ? go(i + 1) : stop(), ms);
        playBtn().textContent = '暫停';
        return;
      }
      stop();
      go(a === 'first' ? 0 : a === 'last' ? total() - 1 : a === 'prev' ? i - 1 : i + 1);
    });
    return k => { stop(); go(k); };
  };

  function render(id) {
    switch (id) {
      case 'toolschema': return `
        <div class="grid g2" style="gap:8px">
          <label class="field"><span>工具名稱</span><input class="input mono" id="tsName" value="orders_search"></label>
          <label class="field"><span>說明（做什麼、何時使用）</span><input class="input" id="tsDesc" value="依條件搜尋訂單，回傳訂單編號、狀態與金額。使用者詢問多筆訂單或想篩選訂單時使用。"></label>
        </div>
        <div class="small" style="margin:10px 0 4px"><b>參數</b>　<button class="btn sm outline" type="button" id="tsAdd">新增參數</button></div>
        <div id="tsRows"></div>
        <div id="tsLint" class="small" style="margin-top:8px"></div>
        <div class="tabs" id="tsFmt" style="margin-top:10px;flex-wrap:wrap"><button type="button" data-v="api" class="on">Claude API</button><button type="button" data-v="mcp">MCP tools/list</button><button type="button" data-v="py">Python MCP</button><button type="button" data-v="ts">TypeScript MCP</button></div>
        <pre class="out" id="tsOut" style="margin-top:8px"></pre>`;
      case 'agentloop': return `
        <div class="tabs" id="alSc" style="flex-wrap:wrap"><button type="button" data-v="0" class="on">單一工具</button><button type="button" data-v="1">平行工具呼叫</button><button type="button" data-v="2">工具失敗後重試</button></div>
        <div class="al-step" id="alStep"></div>
        <div class="al-msgs" id="alMsgs"></div>
        ${stepBar('al')}`;
      case 'patternpick': return `
        <div id="ppQs" class="pp-qs"></div>
        <div class="pp-res" id="ppOut"></div>`;
      case 'mcpflow': return `
        <div class="tabs" id="mfMsg" style="flex-wrap:wrap"></div>
        <p class="small" id="mfNote" style="margin:10px 0 6px"></p>
        <div class="mf-pair"><div><b class="small">→ 請求（Client → Server）</b><pre class="out" id="mfReq"></pre></div><div><b class="small">← 回應（Server → Client）</b><pre class="out" id="mfRes"></pre></div></div>`;
      case 'dfselect': return `
        <label class="field"><span>選取寫法</span><select class="input mono" id="dsExpr"></select></label>
        <div class="table-wrap" style="margin-top:10px"><table class="tbl ds-t" id="dsTbl"></table></div>
        <div class="out" id="dsInfo" style="margin-top:8px;min-height:0"></div>
        <p class="small" id="dsNote" style="margin:6px 0 0"></p>`;
      case 'missing': return `
        <div class="tabs" id="msWay" style="flex-wrap:wrap"><button type="button" data-v="raw" class="on">原始資料</button><button type="button" data-v="drop">dropna()</button><button type="button" data-v="zero">fillna(0)</button><button type="button" data-v="mean">fillna(平均數)</button><button type="button" data-v="median">fillna(中位數)</button><button type="button" data-v="ffill">ffill()</button></div>
        <div class="ms-wrap" id="msOut"></div>
        <pre class="out" id="msCode" style="margin-top:8px"></pre>
        <p class="small" id="msNote" style="margin:6px 0 0"></p>`;
      case 'groupviz': return `
        <div class="row small" style="flex-wrap:wrap;gap:8px">
          <label class="small">分組欄位 <select class="input" id="gvBy"><option value="store">store（門市）</option><option value="cat">category（類別）</option></select></label>
          <label class="small">彙總 <select class="input" id="gvFn"><option value="sum">sum</option><option value="mean">mean</option><option value="count">count</option><option value="max">max</option></select></label>
        </div>
        <pre class="out" id="gvCode" style="margin-top:8px"></pre>
        <div class="gv-steps" id="gvOut"></div>`;
      case 'chartpick': return `
        <div class="tabs" id="cpGoal" style="flex-wrap:wrap"><button type="button" data-v="trend" class="on">看趨勢</button><button type="button" data-v="compare">比較類別</button><button type="button" data-v="dist">看分布</button><button type="button" data-v="rel">看關係</button><button type="button" data-v="part">看組成</button></div>
        <div class="cp-card" id="cpOut"></div>`;
      case 'tsinfer': return `
        <div class="tabs" id="tiEx" style="flex-wrap:wrap"><button type="button" data-v="0" class="on">let 與 const</button><button type="button" data-v="1">陣列與物件</button><button type="button" data-v="2">函式</button><button type="button" data-v="3">as const</button></div>
        <textarea class="input mono" id="tiCode" rows="8" spellcheck="false" style="width:100%;margin-top:8px;font-size:.84rem"></textarea>
        <div class="row small" style="margin-top:6px"><button class="btn sm" type="button" id="tiRun">推論型別</button><span class="spacer"></span><span class="muted" id="tiSt"></span></div>
        <div id="tiOut" class="table-wrap" style="margin-top:8px"></div>`;
      case 'tsnarrow': return `
        <div class="tabs" id="tnEx" style="flex-wrap:wrap"><button type="button" data-v="0" class="on">typeof 與 null</button><button type="button" data-v="1">可辨識聯合</button><button type="button" data-v="2">in 與 Array.isArray</button><button type="button" data-v="3">真值檢查</button></div>
        <div class="tn-code" id="tnCode"></div>
        <div class="row small" style="margin-top:8px;gap:6px"><button class="btn sm outline" type="button" data-tn="prev">◀ 上一行</button><button class="btn sm" type="button" data-tn="next">下一行 ▶</button><span class="spacer"></span><span class="muted" id="tnPos"></span></div>
        <div class="out" id="tnType" style="margin-top:8px;min-height:0"></div>
        <p class="small" id="tnNote" style="margin:6px 0 0"></p>`;
      case 'tsutil': return `
        <pre class="out" style="margin:0">interface User {
  readonly id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
}</pre>
        <div class="tabs" id="tuOp" style="margin-top:8px;flex-wrap:wrap"><button type="button" data-v="Partial" class="on">Partial</button><button type="button" data-v="Required">Required</button><button type="button" data-v="Readonly">Readonly</button><button type="button" data-v="Pick">Pick</button><button type="button" data-v="Omit">Omit</button></div>
        <div id="tuKeys" class="small" style="margin-top:8px"></div>
        <pre class="out" id="tuOut" style="margin-top:8px"></pre>
        <p class="small" id="tuNote" style="margin:6px 0 0"></p>`;
      case 'jsonts': return `
        <div class="grid g2" style="gap:8px">
          <label class="field"><span>最外層型別名稱</span><input class="input mono" id="jtName" value="Order"></label>
          <label class="field"><span>選項</span><span class="small"><label><input type="checkbox" id="jtRo"> 加上 readonly</label>　<label><input type="checkbox" id="jtType"> 使用 type 而非 interface</label></span></label>
        </div>
        <label class="field" style="margin-top:8px"><span>JSON</span><textarea class="input mono" id="jtIn" rows="9" spellcheck="false" style="font-size:.82rem"></textarea></label>
        <pre class="out" id="jtOut" style="margin-top:8px"></pre>`;
      case 'promptlab': return `
        <div class="row small" style="flex-wrap:wrap;gap:6px"><span class="muted">範例：</span><div class="tabs" id="plEx"><button type="button" data-v="mail">延期通知信</button><button type="button" data-v="meet">會議記錄整理</button><button type="button" data-v="bug">程式除錯</button><button type="button" data-v="clear">清空</button></div></div>
        <div class="grid g2" style="gap:8px;margin-top:8px">
          <label class="field"><span>角色與讀者</span><input class="input" id="plRole" placeholder="例如：你是資深客服主管，讀者是一般消費者"></label>
          <label class="field"><span>輸出格式</span><input class="input" id="plFmt" placeholder="例如：條列 3 點、Markdown 表格、JSON"></label>
        </div>
        <label class="field" style="margin-top:8px"><span>背景（為什麼要做、用在哪裡）</span><textarea class="input" id="plCtx" rows="2"></textarea></label>
        <label class="field" style="margin-top:8px"><span>任務（具體要做什麼）</span><textarea class="input" id="plTask" rows="2"></textarea></label>
        <label class="field" style="margin-top:8px"><span>限制（長度、語氣、不能做的事與原因）</span><textarea class="input" id="plLim" rows="2"></textarea></label>
        <div class="grid g2" style="gap:8px;margin-top:8px">
          <label class="field"><span>範例（選填）</span><textarea class="input" id="plEg" rows="3"></textarea></label>
          <label class="field"><span>要處理的資料（選填）</span><textarea class="input" id="plData" rows="3"></textarea></label>
        </div>
        <label class="small" style="display:block;margin-top:6px"><input type="checkbox" id="plThink"> 複雜任務：要求先在 &lt;分析&gt; 中思考，再給出答案</label>
        <div id="plCheck" class="small" style="margin-top:10px"></div>
        <div class="row small" style="margin-top:8px"><b>產生的提示詞</b><span class="spacer"></span><button class="btn sm outline" type="button" id="plCopy">複製</button></div>
        <pre class="out" id="plOut" style="margin-top:6px;white-space:pre-wrap"></pre>`;
      case 'ccref': return `
        <input class="input" id="crQ" placeholder="搜尋，例如：context、權限、模型、mcp、背景" style="width:100%">
        <div class="tabs" id="crType" style="margin-top:8px;flex-wrap:wrap"><button type="button" data-v="" class="on">全部</button><button type="button" data-v="指令">斜線指令</button><button type="button" data-v="參數">命令列</button><button type="button" data-v="按鍵">快捷鍵</button><button type="button" data-v="前綴">輸入前綴</button></div>
        <div id="crOut" class="table-wrap" style="margin-top:8px;max-height:460px;overflow:auto"></div>`;
      case 'ccsetup': return `
        <div class="grid g2" style="gap:8px">
          <label class="field"><span>專案類型</span><select class="input" id="csType"><option value="node">Node.js／TypeScript</option><option value="react">React（Vite）</option><option value="python">Python</option><option value="other">其他</option></select></label>
          <label class="field"><span>專案簡述</span><input class="input" id="csDesc" value="電商後台 API"></label>
          <label class="field"><span>安裝指令</span><input class="input mono" id="csInstall"></label>
          <label class="field"><span>開發／啟動指令</span><input class="input mono" id="csDev"></label>
          <label class="field"><span>測試指令</span><input class="input mono" id="csTest"></label>
          <label class="field"><span>Lint／型別檢查指令</span><input class="input mono" id="csLint"></label>
        </div>
        <label class="field" style="margin-top:8px"><span>專案慣例（一行一條）</span><textarea class="input" id="csRules" rows="3"></textarea></label>
        <div class="cs-checks small" style="margin-top:8px">
          <label><input type="checkbox" data-cs="test" checked> 測試、lint 指令免詢問（allow）</label>
          <label><input type="checkbox" data-cs="gitread" checked> git status／diff／log 免詢問（allow）</label>
          <label><input type="checkbox" data-cs="push" checked> git push 每次都要詢問（ask）</label>
          <label><input type="checkbox" data-cs="env" checked> 禁止讀取 .env 與 secrets（deny）</label>
          <label><input type="checkbox" data-cs="rm" checked> 禁止 rm -rf（deny）</label>
          <label><input type="checkbox" data-cs="net"> 禁止 curl／wget 連線（deny）</label>
          <label><input type="checkbox" data-cs="fmt"> 編輯檔案後自動格式化（PostToolUse hook）</label>
        </div>
        <div class="row small" style="margin-top:10px"><b>CLAUDE.md</b><span class="spacer"></span><button class="btn sm outline" type="button" data-cscopy="md">複製</button></div>
        <pre class="out" id="csMd" style="margin-top:6px"></pre>
        <div class="row small" style="margin-top:10px"><b>.claude/settings.json</b><span class="spacer"></span><button class="btn sm outline" type="button" data-cscopy="json">複製</button></div>
        <pre class="out" id="csJson" style="margin-top:6px"></pre>`;
      case 'apicost': return `
        <div class="grid g2" style="gap:8px">
          <label class="field"><span>模型</span><select class="input" id="acModel"></select></label>
          <label class="field"><span>每日請求數</span><input class="input num" type="number" id="acN" value="2000" min="0"></label>
          <label class="field"><span>每次輸入 token</span><input class="input num" type="number" id="acIn" value="3000" min="0"></label>
          <label class="field"><span>每次輸出 token</span><input class="input num" type="number" id="acOut" value="800" min="0"></label>
          <label class="field"><span>輸入中從快取讀取的比例（%）</span><input class="input num" type="number" id="acCache" value="0" min="0" max="100"></label>
          <label class="field"><span>匯率（新台幣／美元）</span><input class="input num" type="number" id="acFx" value="32" min="1" step="0.1"></label>
        </div>
        <label class="small" style="display:block;margin-top:6px"><input type="checkbox" id="acBatch"> 使用 Batches API 批次處理（約 5 折，非即時）</label>
        <div id="acOut"></div>`;
      case 'jsxconv': return `
        <div class="row small" style="flex-wrap:wrap;gap:6px"><div class="tabs" id="jcEx" style="flex-wrap:wrap"><button type="button" data-v="0" class="on">基本元素</button><button type="button" data-v="1">屬性與運算式</button><button type="button" data-v="2">元件與 children</button><button type="button" data-v="3">條件與列表</button><button type="button" data-v="4">Fragment</button></div></div>
        <textarea class="input mono" id="jcIn" rows="6" spellcheck="false" style="width:100%;margin-top:8px;font-size:.85rem"></textarea>
        <div class="row small" style="margin-top:6px;flex-wrap:wrap;gap:6px"><div class="tabs" id="jcRt"><button type="button" data-v="classic" class="on">傳統：React.createElement</button><button type="button" data-v="automatic">新版：jsx-runtime</button></div><span class="spacer"></span><span class="muted" id="jcSt"></span></div>
        <pre class="out" id="jcOut" style="margin-top:8px;min-height:80px"></pre>
        <p class="small muted" id="jcNote" style="margin:6px 0 0"></p>`;
      case 'immut': return `
        <div class="tabs" id="imOp" style="flex-wrap:wrap"><button type="button" data-v="add" class="on">新增項目</button><button type="button" data-v="del">刪除項目</button><button type="button" data-v="toggle">切換完成</button><button type="button" data-v="nested">修改巢狀物件</button><button type="button" data-v="sort">排序</button></div>
        <p class="small" id="imGoal" style="margin:10px 0 6px"></p>
        <div id="imOpts" class="im-opts"></div>
        <div id="imOut"></div>`;
      case 'effectlab': return `
        <div class="row small" style="flex-wrap:wrap;gap:8px"><div class="tabs" id="elDeps"><button type="button" data-v="none">沒有依賴陣列</button><button type="button" data-v="empty">[]</button><button type="button" data-v="uid" class="on">[userId]</button></div><label class="small"><input type="checkbox" id="elStrict"> StrictMode（開發模式）</label></div>
        <pre class="out" id="elCode" style="margin-top:8px"></pre>
        <div class="row small" style="flex-wrap:wrap;gap:6px;margin-top:8px">
          <button class="btn sm" type="button" data-el="mount">掛載元件</button><button class="btn sm outline" type="button" data-el="count">setCount（自己的 state）</button><button class="btn sm outline" type="button" data-el="uid">父元件改變 userId</button><button class="btn sm outline" type="button" data-el="parent">父元件重新渲染（props 不變）</button><button class="btn sm outline" type="button" data-el="unmount">卸載元件</button><button class="btn sm outline" type="button" data-el="clear">清空紀錄</button>
        </div>
        <div class="el-state small muted" id="elState"></div>
        <ol class="el-log" id="elLog"></ol>`;
      case 'renderflow': return `
        <div class="row small" style="flex-wrap:wrap;gap:6px">
          <button class="btn sm" type="button" data-rf="app">App：setCount</button><button class="btn sm outline" type="button" data-rf="counter">Counter：自己的 state</button><button class="btn sm outline" type="button" data-rf="sidebar">Sidebar：自己的 state</button><button class="btn sm outline" type="button" data-rf="reset">重設計數</button>
        </div>
        <div class="row small" style="flex-wrap:wrap;gap:12px;margin-top:8px">
          <label><input type="checkbox" id="rfFn"> App 傳 onSelect 函式給 Sidebar</label><label><input type="checkbox" id="rfCb" disabled> 用 useCallback 包住 onSelect</label>
        </div>
        <div class="rf-tree" id="rfTree"></div>
        <p class="small" id="rfMsg" style="margin:8px 0 0;min-height:2.4em"></p>`;
      case 'stackq': return `
        <div class="tabs" id="sqMode"><button type="button" data-v="stack" class="on">堆疊 stack</button><button type="button" data-v="queue">佇列 queue</button><button type="button" data-v="deque">雙端佇列 deque</button></div>
        <div class="row small" style="margin-top:10px;flex-wrap:wrap;gap:6px"><label class="small">值 <input class="input num" type="number" id="sqVal" value="10" style="width:80px"></label><span id="sqBtns" class="row" style="gap:6px;flex-wrap:wrap"></span></div>
        <div id="sqOut"></div>`;
      case 'hashsim': return `
        <div class="tabs" id="hsMode"><button type="button" data-v="chain" class="on">鏈結法（chaining）</button><button type="button" data-v="probe">線性探測（linear probing）</button></div>
        <div class="row small" style="margin-top:10px;flex-wrap:wrap;gap:6px">
          <label class="small">表格大小 m <select class="input" id="hsM">${[5, 7, 10, 11, 13].map(m => `<option${m === 7 ? ' selected' : ''}>${m}</option>`).join('')}</select></label>
          <label class="small">鍵 k <input class="input num" type="number" id="hsK" value="15" style="width:80px"></label>
          <button class="btn sm" type="button" data-hs="ins">插入</button><button class="btn sm outline" type="button" data-hs="find">搜尋</button>
        </div>
        <div class="row small" style="margin-top:6px;flex-wrap:wrap;gap:6px"><button class="btn sm outline" type="button" data-hs="demo">插入範例 15 22 8 29 36 1 43</button><button class="btn sm outline" type="button" data-hs="clear">清空</button></div>
        <div id="hsOut"></div>`;
      case 'bstviz': return `
        <div class="row small" style="flex-wrap:wrap;gap:6px">
          <input class="input mono" id="bvVal" value="45" style="width:150px" placeholder="例如 45 或 5 3 8">
          <button class="btn sm" type="button" data-bv="ins">插入</button><button class="btn sm outline" type="button" data-bv="find">搜尋</button><button class="btn sm outline" type="button" data-bv="del">刪除</button>
        </div>
        <div class="row small" style="flex-wrap:wrap;gap:6px;margin-top:6px">
          <button class="btn sm outline" type="button" data-bv="demo">範例 50 30 70 20 40 60 80</button><button class="btn sm outline" type="button" data-bv="line">依序插入 10 20 30 40 50</button><button class="btn sm outline" type="button" data-bv="rand">隨機 8 個</button><button class="btn sm outline" type="button" data-bv="clear">清空</button>
        </div>
        <div id="bvOut"></div>`;
      case 'heapviz': return `
        <div class="tabs" id="hpMode"><button type="button" data-v="min" class="on">最小堆積</button><button type="button" data-v="max">最大堆積</button></div>
        <div class="row small" style="margin-top:10px;flex-wrap:wrap;gap:6px">
          <input class="input mono" id="hpVal" value="1" style="width:150px" placeholder="例如 1 或 5 3 8">
          <button class="btn sm" type="button" data-hp="push">push</button><button class="btn sm outline" type="button" data-hp="pop">pop</button><button class="btn sm outline" type="button" data-hp="build">用輸入的數字建堆積</button><button class="btn sm outline" type="button" data-hp="clear">清空</button>
        </div>
        <div id="hpOut"></div>`;
      case 'sortviz': return `
        <div class="tabs" id="svAlgo" style="flex-wrap:wrap"><button type="button" data-v="bubble" class="on">氣泡排序</button><button type="button" data-v="insert">插入排序</button><button type="button" data-v="select">選擇排序</button><button type="button" data-v="quick">快速排序</button><button type="button" data-v="merge">合併排序</button></div>
        <div class="row small" style="margin-top:10px;flex-wrap:wrap;gap:6px"><input class="input mono" id="svArr" value="38 27 43 3 9 82 10" style="flex:1;min-width:180px"><button class="btn sm outline" type="button" data-svx="apply">套用</button><button class="btn sm outline" type="button" data-svx="rand">隨機</button><button class="btn sm outline" type="button" data-svx="sorted">幾乎排好</button></div>
        <div class="sv-bars" id="svBars"></div>
        <p class="small" id="svMsg" style="margin:8px 0 0;min-height:3.2em"></p>
        ${stepBar('sv')}`;
      case 'bsearch': return `
        <div class="tabs" id="bsMode"><button type="button" data-v="find" class="on">找 x 的位置</button><button type="button" data-v="lb">lower_bound（第一個 ≥ x）</button></div>
        <div class="row small" style="margin-top:10px;flex-wrap:wrap;gap:6px"><input class="input mono" id="bsArr" value="2 5 8 12 16 23 38 56 72 91" style="flex:1;min-width:200px"><label class="small">x <input class="input num" type="number" id="bsT" value="23" style="width:80px"></label><button class="btn sm outline" type="button" data-bsx="apply">開始</button><button class="btn sm outline" type="button" data-bsx="rand">隨機陣列</button></div>
        <div class="bs-arr" id="bsCells"></div>
        <div class="out" id="bsVars" style="margin-top:8px;min-height:0"></div>
        <p class="small" id="bsMsg" style="margin:8px 0 0;min-height:2.4em"></p>
        ${stepBar('bs')}`;
      case 'dpgrid': return `
        <div class="tabs" id="dgMode"><button type="button" data-v="knap" class="on">0/1 背包</button><button type="button" data-v="lcs">最長共同子序列 LCS</button><button type="button" data-v="edit">編輯距離</button></div>
        <div class="row small" id="dgIn" style="margin-top:10px;flex-wrap:wrap;gap:6px"></div>
        <div class="dg-wrap" id="dgTbl"></div>
        <p class="small" id="dgMsg" style="margin:8px 0 0;min-height:3.2em"></p>
        ${stepBar('dg')}`;
      case 'graphpath': return `
        <div class="row small" style="flex-wrap:wrap;gap:8px"><div class="tabs" id="gpAlgo"><button type="button" data-v="dij" class="on">Dijkstra（看權重）</button><button type="button" data-v="bfs">BFS（只看邊數）</button></div><label class="small">起點 <select class="input" id="gpSrc">${[0, 1, 2, 3, 4, 5].map(i => `<option>${i}</option>`).join('')}</select></label></div>
        <div class="gp-wrap" id="gpSvg"></div>
        <div id="gpTbl"></div>
        <p class="small" id="gpMsg" style="margin:8px 0 0;min-height:3.2em"></p>
        ${stepBar('gp')}`;
      case 'ctypes': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>型別</span><select class="input" id="ctType">
            <option value="8,0">unsigned char（8 位元）</option><option value="8,1">signed char（8 位元）</option>
            <option value="16,0">unsigned short（16 位元）</option><option value="16,1">short（16 位元）</option>
            <option value="32,0">unsigned int（32 位元）</option><option value="32,1" selected>int（32 位元）</option>
            <option value="64,1">long long（64 位元）</option></select></label>
          <label class="field"><span>要存入的值（可輸入很大或負的數）</span><input class="input mono" id="ctVal" value="2147483648"></label>
        </div>
        <div class="row small" style="margin-top:8px;flex-wrap:wrap">${['255+1|8,0', '-1|8,0', '128|8,1', '2147483648|32,1', '4294967296|32,0', '100000*100000|32,1'].map(s => `<button class="btn sm outline" type="button" data-ct="${s}">${esc(s.split('|')[0])}</button>`).join('')}</div>
        <div id="ctOut"></div>`;
      case 'bitops': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>a（0～255）</span><input class="input num" type="number" id="boA" value="12" min="0" max="255"></label>
          <label class="field"><span>b（0～255）</span><input class="input num" type="number" id="boB" value="10" min="0" max="255"></label>
          <label class="field"><span>位移量 n（0～7）</span><input class="input num" type="number" id="boN" value="3" min="0" max="7"></label>
        </div>
        <div id="boOut"></div>`;
      case 'ptrmem': return `
        <div class="row small" style="flex-wrap:wrap;gap:6px">
          <div class="tabs" id="pmType"><button type="button" data-v="1">char（1 位元組）</button><button type="button" data-v="4" class="on">int（4 位元組）</button><button type="button" data-v="8">double（8 位元組）</button></div>
        </div>
        <div class="row small" style="flex-wrap:wrap;gap:6px;margin-top:8px">
          <button class="btn sm outline" type="button" data-pm="inc">p++</button>
          <button class="btn sm outline" type="button" data-pm="dec">p--</button>
          <button class="btn sm outline" type="button" data-pm="add2">p += 2</button>
          <button class="btn sm outline" type="button" data-pm="set">*p = 99</button>
          <button class="btn sm outline" type="button" data-pm="plus">(*p)++</button>
          <button class="btn sm outline" type="button" data-pm="reset">重設 p = a</button>
        </div>
        <div id="pmOut"></div>`;
      case 'bigo': return `
        <label class="field"><span>資料量 n</span><input class="input num" type="number" id="bgN" value="100000" min="1"></label>
        <div class="row small" style="margin-top:8px;flex-wrap:wrap">${[10, 20, 1000, 100000, 1000000, 10000000].map(n => `<button class="btn sm outline" type="button" data-bg="${n}">n = ${n.toLocaleString()}</button>`).join('')}</div>
        <div id="bgOut"></div>`;
      case 'stlpick': return `
        <p class="small muted" style="margin:0 0 8px">選擇你的需求：</p>
        <div class="tabs" id="spkTabs" style="flex-wrap:wrap"></div>
        <div id="spkOut"></div>`;
      case 'sqlorder': return `
        <div class="row small"><div class="tabs" id="soMode"><button type="button" data-v="exec" class="on">執行順序</button><button type="button" data-v="write">撰寫順序</button></div><span class="spacer"></span><button class="btn sm outline" id="soReset" type="button">重新開始</button></div>
        <p class="small muted" id="soHint" style="margin:12px 0 6px"></p>
        <div class="so-picked" id="soPicked"></div>
        <div class="so-pool" id="soPool"></div>
        <p class="small" id="soMsg" style="margin:10px 0 0;min-height:1.6em"></p>`;
      case 'joinviz': return `
        <div class="tabs" id="jvType"><button type="button" data-v="INNER" class="on">INNER JOIN</button><button type="button" data-v="LEFT">LEFT JOIN</button><button type="button" data-v="RIGHT">RIGHT JOIN</button><button type="button" data-v="FULL">FULL OUTER JOIN</button></div>
        <div class="jv-src"><div id="jvA"></div><div id="jvB"></div></div>
        <div class="out" id="jvSql" style="margin:10px 0"></div>
        <div id="jvOut"></div>`;
      case 'specificity': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>選擇器 A（先寫）</span><input class="input mono" id="spA" value="#nav .item a" spellcheck="false"></label>
          <label class="field"><span>選擇器 B（後寫）</span><input class="input mono" id="spB" value=".menu .item a:hover" spellcheck="false"></label>
        </div>
        <div class="row small" style="margin-top:8px;flex-wrap:wrap">${['p', '.card p', '#hero', 'ul li:first-child', 'a[href^="https"]', 'h2::before', ':not(#main) p', 'nav > ul li.active a'].map(s => `<button class="btn sm outline" type="button" data-sp="${esc(s)}">${esc(s)}</button>`).join('')}</div>
        <div id="spOut"></div>`;
      case 'boxmodel': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>width（px）</span><input class="input num" type="number" id="bmW" value="200" min="0"></label>
          <label class="field"><span>padding（px，左右各）</span><input class="input num" type="number" id="bmP" value="20" min="0"></label>
          <label class="field"><span>border（px，左右各）</span><input class="input num" type="number" id="bmB" value="5" min="0"></label>
          <label class="field"><span>margin（px，左右各）</span><input class="input num" type="number" id="bmM" value="10" min="0"></label>
        </div>
        <div class="tabs" id="bmSizing" style="margin-top:10px"><button type="button" data-v="content-box" class="on">content-box（預設）</button><button type="button" data-v="border-box">border-box</button></div>
        <div id="bmOut"></div>`;
      case 'flexbox': return `
        <div class="fx-ctl">
          <div><span class="small muted">flex-direction</span><div class="tabs" data-fx="flexDirection"><button type="button" data-v="row" class="on">row</button><button type="button" data-v="column">column</button><button type="button" data-v="row-reverse">row-reverse</button></div></div>
          <div><span class="small muted">justify-content（主軸）</span><div class="tabs" data-fx="justifyContent"><button type="button" data-v="flex-start" class="on">flex-start</button><button type="button" data-v="center">center</button><button type="button" data-v="flex-end">flex-end</button><button type="button" data-v="space-between">space-between</button><button type="button" data-v="space-around">space-around</button></div></div>
          <div><span class="small muted">align-items（交錯軸）</span><div class="tabs" data-fx="alignItems"><button type="button" data-v="stretch" class="on">stretch</button><button type="button" data-v="flex-start">flex-start</button><button type="button" data-v="center">center</button><button type="button" data-v="flex-end">flex-end</button></div></div>
          <div><span class="small muted">flex-wrap</span><div class="tabs" data-fx="flexWrap"><button type="button" data-v="nowrap" class="on">nowrap</button><button type="button" data-v="wrap">wrap</button></div></div>
        </div>
        <div class="fx-stage" id="fxStage"></div>
        <div class="out" id="fxCss" style="margin-top:10px"></div>`;
      case 'cellref': return `
        <label class="field"><span>公式</span><input class="input mono" id="crF" value="=$A2*B$1" spellcheck="false"></label>
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>原本所在的儲存格</span><input class="input mono" id="crFrom" value="B2" spellcheck="false"></label>
          <label class="field"><span>複製到</span><input class="input mono" id="crTo" value="D5" spellcheck="false"></label>
        </div>
        <div class="row small" style="margin-top:8px;flex-wrap:wrap">
          <button class="btn sm outline" type="button" data-cr="=E2*F2|G2|G5">相對參照往下</button>
          <button class="btn sm outline" type="button" data-cr="=G2*$J$1|H2|H9">絕對參照（稅率）</button>
          <button class="btn sm outline" type="button" data-cr="=$A2*B$1|B2|D5">混合參照（九九乘法）</button>
          <button class="btn sm outline" type="button" data-cr="=SUM(B2:B9)/$B$10|C2|D3">範圍與絕對</button>
        </div>
        <div id="crOut"></div>`;
      case 'xlookup': return `
        <div class="tabs" id="xlMode"><button type="button" data-v="exact" class="on">價目表（精確比對）</button><button type="button" data-v="approx">獎金級距（近似比對）</button></div>
        <div class="grid g2" style="gap:10px;margin-top:10px">
          <label class="field"><span id="xlInLabel">要查的產品</span><input class="input" id="xlIn" value="螢幕"></label>
          <label class="field" id="xlRetWrap"><span>回傳欄位</span><select class="input" id="xlRet"><option value="1">單價</option><option value="2">類別</option></select></label>
        </div>
        <div id="xlTable"></div>
        <div id="xlOut"></div>`;
      case 'pivot': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>列</span><select class="input" id="pvRow"><option value="1">業務</option><option value="2">地區</option><option value="3">產品</option><option value="0">月份</option></select></label>
          <label class="field"><span>欄</span><select class="input" id="pvCol"><option value="">（無）</option><option value="3" selected>產品</option><option value="2">地區</option><option value="1">業務</option><option value="0">月份</option></select></label>
          <label class="field"><span>值</span><select class="input" id="pvVal"><option value="6">金額</option><option value="4">數量</option></select></label>
          <label class="field"><span>摘要方式</span><select class="input" id="pvAgg"><option value="sum">加總</option><option value="count">計數</option><option value="avg">平均值</option><option value="max">最大值</option></select></label>
        </div>
        <div class="tabs" id="pvShow" style="margin-top:10px"><button type="button" data-v="val" class="on">數值</button><button type="button" data-v="pct">總計百分比</button></div>
        <div id="pvOut"></div>`;
      case 'hash': return `
        <label class="field"><span>輸入文字</span><textarea class="input" id="hashIn" rows="2">iPAS 資安工程師</textarea></label>
        <div class="out" id="hashOut"></div>
        <label class="field" style="margin-top:14px"><span>比較：僅修改一個字</span><textarea class="input" id="hashIn2" rows="2">iPAS 資安工程帥</textarea></label>
        <div class="out" id="hashOut2"></div>
        <p class="small" id="hashDiff" style="margin:10px 0 0"></p>`;
      case 'confusion': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>TP 真陽性（實際是、預測是）</span><input class="input num" type="number" id="cmTP" value="80" min="0"></label>
          <label class="field"><span>FN 偽陰性（實際是、預測否）</span><input class="input num" type="number" id="cmFN" value="20" min="0"></label>
          <label class="field"><span>FP 偽陽性（實際否、預測是）</span><input class="input num" type="number" id="cmFP" value="30" min="0"></label>
          <label class="field"><span>TN 真陰性（實際否、預測否）</span><input class="input num" type="number" id="cmTN" value="870" min="0"></label>
        </div>
        <div id="cmOut"></div>`;
      case 'stats': return `
        <label class="field"><span>數值（以逗號或空白分隔）</span><input class="input mono" id="stIn" value="12, 15, 15, 18, 20, 22, 25, 28, 95"></label>
        <div id="stOut"></div>`;
      case 'gd': return `
        <label class="field"><span>學習率 η <b id="gdLrV" class="mono">0.1</b></span><input type="range" id="gdLr" min="0.01" max="1.1" step="0.01" value="0.1" style="width:100%"></label>
        <p class="small muted" style="margin:0 0 8px">起點 x₀ = 5，更新規則 x ← x − η · f′(x) = x − η · 2x，共 15 步</p>
        <div class="out" id="gdOut"></div>
        <p class="small" id="gdMsg" style="margin:10px 0 0"></p>`;
      case 'chmod': return `
        <table class="tbl" style="margin-bottom:10px"><tr><th></th><th>讀 r（4）</th><th>寫 w（2）</th><th>執行 x（1）</th></tr>
          ${[['u', '擁有者'], ['g', '群組'], ['o', '其他人']].map(([k, n]) => `<tr><td>${n}</td>${[4, 2, 1].map(b => `<td><input type="checkbox" data-who="${k}" data-bit="${b}" ${(k === 'u' || b !== 2) ? 'checked' : ''}></td>`).join('')}</tr>`).join('')}
        </table>
        <label class="field"><span>或輸入數字權限</span><input class="input mono" id="chNum" value="755" maxlength="4"></label>
        <div class="out" id="chOut"></div>`;
      case 'cron': return `
        <label class="field"><span>cron 表示式（分 時 日 月 週）</span><input class="input mono" id="crIn" value="30 2 * * 1-5"></label>
        <div class="row small" style="margin-bottom:10px">${['*/5 * * * *', '0 * * * *', '0 9 * * 1-5', '0 0 1 * *', '30 2 * * 0'].map(x => `<button class="btn outline sm" type="button" data-cr="${x}">${x}</button>`).join('')}</div>
        <div id="crOut"></div>`;
      case 'subnet': return `
        <label class="field"><span>IP／前綴長度</span><input class="input mono" id="ciIn" value="192.168.10.37/24"></label>
        <div id="ciOut"></div>`;
      case 'position': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>總資金（元）</span><input class="input num" type="number" id="psCap" value="1000000" min="0"></label>
          <label class="field"><span>單筆最大風險（%）</span><input class="input num" type="number" id="psRisk" value="1" min="0" max="100" step="0.1"></label>
          <label class="field"><span>進場價</span><input class="input num" type="number" id="psIn" value="100" min="0" step="0.01"></label>
          <label class="field"><span>停損價</span><input class="input num" type="number" id="psStop" value="92" min="0" step="0.01"></label>
        </div>
        <div id="psOut"></div>`;
      case 'drawdown': return `
        <label class="field"><span>淨值或價格序列（以逗號或空白分隔，依時間順序）</span><input class="input mono" id="ddIn" value="100, 112, 130, 118, 91, 104, 125, 146.41"></label>
        <label class="field"><span>期間（年）</span><input class="input num" type="number" id="ddYears" value="4" min="0.1" step="0.1"></label>
        <div id="ddOut"></div>`;
      case 'compound': return `
        <div class="grid g3" style="gap:10px">
          <label class="field"><span>每月投入（元）</span><input class="input num" type="number" id="cpM" value="10000" min="0"></label>
          <label class="field"><span>年報酬率（%）</span><input class="input num" type="number" id="cpR" value="6" step="0.1"></label>
          <label class="field"><span>年數</span><input class="input num" type="number" id="cpY" value="20" min="1" max="60"></label>
        </div>
        <div id="cpOut"></div>`;
      case 'softmax': return `
        <p class="small muted" style="margin:0 0 8px">模型對「今天天氣很＿」的候選字給出原始分數（logits）</p>
        <label class="field"><span>溫度 Temperature <b id="smTV" class="mono">1.0</b></span><input type="range" id="smT" min="0.1" max="2" step="0.1" value="1" style="width:100%"></label>
        <div id="smOut"></div>
        <p class="small muted" style="margin:10px 0 0">溫度低：機率集中在最高分的字，輸出穩定、重複性高；溫度高：分布變平，輸出更多樣但也更容易離題。</p>`;
      case 'nines': return `
        <label class="field"><span>單一元件可用性（%）</span><input class="input num" type="number" id="nA" value="99.9" step="0.01" min="0" max="100"></label>
        <div class="tabs" id="nPick" style="margin-bottom:12px"><button data-v="99" type="button">99%</button><button class="on" data-v="99.9" type="button">99.9%</button><button data-v="99.95" type="button">99.95%</button><button data-v="99.99" type="button">99.99%</button><button data-v="99.999" type="button">99.999%</button></div>
        <div id="nOut"></div>
        <div class="grid g2" style="gap:10px;margin-top:12px">
          <label class="field"><span>串聯元件數（全部都要正常）</span><input class="input num" type="number" id="nS" value="3" min="1" max="10"></label>
          <label class="field"><span>並聯備援數（任一正常即可，例如多 AZ）</span><input class="input num" type="number" id="nP" value="2" min="1" max="5"></label>
        </div>
        <div id="nOut2"></div>`;
      case 'cidr': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>VPC CIDR</span><input class="input mono" id="cVpc" value="10.0.0.0/16" spellcheck="false"></label>
          <label class="field"><span>子網路遮罩長度（/16～/28）</span><input class="input num" type="number" id="cSub" value="24" min="16" max="28"></label>
        </div>
        <div id="cOut"></div>`;
      case 'pricing': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>隨需每小時單價（US$）</span><input class="input num" type="number" id="prH" value="0.1" step="0.001" min="0"></label>
          <label class="field"><span>每月使用時數（滿載 730）</span><input class="input num" type="number" id="prU" value="730" min="0" max="744"></label>
          <label class="field"><span>Savings Plans／RI 折扣（%）</span><input class="input num" type="number" id="prR" value="40" min="0" max="72"></label>
          <label class="field"><span>Spot 折扣（%）</span><input class="input num" type="number" id="prS" value="70" min="0" max="90"></label>
        </div>
        <p class="tiny muted" style="margin:0 0 8px">折扣為示範值，實際折扣依執行個體類型、區域、承諾期間與付款方式而定（官方宣稱 Savings Plans／RI 最高約 72%、Spot 最高約 90%）。</p>
        <div id="prOut"></div>`;
      case 's3class': return `
        <p class="small muted" style="margin:0 0 6px">存取頻率</p>
        <div class="tabs" id="s3F" style="margin-bottom:12px"><button class="on" data-v="hot" type="button">經常存取</button><button data-v="unknown" type="button">無法預測</button><button data-v="ia" type="button">每月約一次</button><button data-v="arch" type="button">一季一次</button><button data-v="deep" type="button">一年一次以下</button></div>
        <p class="small muted" style="margin:0 0 6px">需要多快取回</p>
        <div class="tabs" id="s3R" style="margin-bottom:12px"><button class="on" data-v="ms" type="button">毫秒（立即）</button><button data-v="min" type="button">數分鐘～數小時</button><button data-v="day" type="button">12 小時以上也可以</button></div>
        <p class="small muted" style="margin:0 0 6px">資料能否重新產生</p>
        <div class="tabs" id="s3Z" style="margin-bottom:12px"><button class="on" data-v="multi" type="button">不可遺失（需多 AZ）</button><button data-v="one" type="button">可重新產生（單一 AZ 即可）</button></div>
        <div id="s3Out"></div>`;
      case 'pyrun': return `
<pre class="py"># 在這裡寫 Python，按「執行」或 Ctrl＋Enter
scores = {'國文': 82, '英文': 91, '數學': 76}
for subject, score in scores.items():
    print(f'{subject:　&lt;4}{score:&gt;4} 分', '★' * (score // 20))
print('平均：', round(sum(scores.values()) / len(scores), 1))</pre>
        <p class="tiny muted" style="margin:0">第一次執行會下載 Python 環境（約 10 MB），之後就很快。程式只在你的瀏覽器中執行。</p>`;
      case 'slice': return `
        <label class="field"><span>串列內容（逗號分隔）</span><input class="input mono" id="slList" value="P, y, t, h, o, n, 好, 好, 玩" spellcheck="false"></label>
        <div class="grid g3" style="gap:10px">
          <label class="field"><span>start（留空＝預設）</span><input class="input mono" id="slA" value="1"></label>
          <label class="field"><span>stop（留空＝預設）</span><input class="input mono" id="slB" value="7"></label>
          <label class="field"><span>step（留空＝1）</span><input class="input mono" id="slC" value="2"></label>
        </div>
        <div class="tabs" id="slPre" style="margin-bottom:6px"><button data-v="1,7,2" type="button">[1:7:2]</button><button data-v=",3," type="button">[:3]</button><button data-v="-3,," type="button">[-3:]</button><button data-v=",,-1" type="button">[::-1]</button><button data-v="5,1,-1" type="button">[5:1:-1]</button><button data-v=",,2" type="button">[::2]</button></div>
        <div id="slOut"></div>`;
      case 'trace': return `
        <div class="tabs" id="trPick" style="margin-bottom:10px"><button class="on" data-v="sum" type="button">累加 1～5</button><button data-v="max" type="button">找最大值</button><button data-v="count" type="button">計算及格人數</button><button data-v="while" type="button">while 存錢</button></div>
        <pre class="out" id="trCode"></pre>
        <div class="row" style="margin:10px 0"><button class="btn sm outline" id="trPrev" type="button">上一步</button><button class="btn sm" id="trNext" type="button">下一步</button><button class="btn sm outline" id="trReset" type="button">重來</button><span class="small muted" id="trStep"></span></div>
        <div id="trOut"></div>`;
      case 'pyerr': return `
        <label class="field"><span>貼上錯誤訊息或輸入錯誤名稱</span><input class="input mono" id="peIn" placeholder="例如 TypeError: can only concatenate str (not &quot;int&quot;) to str" spellcheck="false"></label>
        <div class="tabs" id="pePick" style="margin-bottom:10px"></div>
        <div id="peOut"></div>`;
      case 'chunk': return `
        <label class="field"><span>文件內容</span><textarea class="input" id="ckText" rows="5">【請假規定】員工請特休假須於三日前在系統提出申請，經直屬主管核准。病假三日以內免附證明，超過三日須檢附醫療證明。婚假八日，須於結婚日前十日起三個月內請畢。喪假依親屬關係給予三至八日。【加班規定】平日加班前二小時加給三分之一以上，再延長二小時以內加給三分之二以上。加班須事先申請，未經核准之加班不予計算。【出差規定】國內出差住宿費每日上限二千元，交通以大眾運輸為原則，搭乘計程車須說明理由。</textarea></label>
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>切塊大小 <b class="mono" id="ckSizeV">80</b> 字</span><input type="range" id="ckSize" min="30" max="200" step="10" value="80" style="width:100%"></label>
          <label class="field"><span>重疊 <b class="mono" id="ckOverV">20</b> 字</span><input type="range" id="ckOver" min="0" max="60" step="5" value="20" style="width:100%"></label>
        </div>
        <div id="ckOut"></div>`;
      case 'retrieve': return `
        <label class="field"><span>你的問題</span><input class="input" id="rtQ" value="病假要附什麼證明？"></label>
        <div class="tabs" id="rtPick" style="margin-bottom:10px"><button data-v="病假要附什麼證明？" type="button">病假證明</button><button data-v="出差可以搭計程車嗎" type="button">出差交通</button><button data-v="忘記密碼怎麼辦" type="button">忘記密碼</button><button data-v="年終獎金什麼時候發" type="button">資料庫沒有的問題</button></div>
        <div id="rtOut"></div>`;
      case 'llmcost': return `
        <div class="tabs" id="lcModel" style="margin-bottom:10px"><button class="on" data-v="4,20" type="button">Opus 5.5</button><button data-v="2,10" type="button">Sonnet 5.5</button><button data-v="0.1,0.5" type="button">Haiku 5.5</button></div>
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>輸入單價（US$／百萬 tokens）</span><input class="input num" type="number" id="lcIn" value="4" step="0.01" min="0"></label>
          <label class="field"><span>輸出單價（US$／百萬 tokens）</span><input class="input num" type="number" id="lcOut" value="20" step="0.01" min="0"></label>
          <label class="field"><span>每次輸入 tokens</span><input class="input num" type="number" id="lcTi" value="3000" min="0"></label>
          <label class="field"><span>每次輸出 tokens</span><input class="input num" type="number" id="lcTo" value="500" min="0"></label>
          <label class="field"><span>每月請求數</span><input class="input num" type="number" id="lcN" value="20000" min="0"></label>
          <label class="field"><span>輸入中可快取的比例（%）</span><input class="input num" type="number" id="lcCache" value="60" min="0" max="100"></label>
        </div>
        <label class="field"><span>匯率（新台幣／美元）</span><input class="input num" type="number" id="lcFx" value="32" step="0.1" min="0"></label>
        <p class="tiny muted" style="margin:0 0 8px">預設單價為 2026 年 10 月官方公布的標準價格，僅供估算；實際價格、快取與批次折扣以官網為準。快取讀取以標準輸入價的 10% 估算，未計入寫入快取的額外費用。</p>
        <div id="lcOutBox"></div>`;
      case 'dockercache': return `
        <div class="tabs" id="dcOrder" style="margin-bottom:8px"><button class="on" data-v="good" type="button">好的順序：先裝套件再複製程式</button><button data-v="bad" type="button">不好的順序：先複製全部</button></div>
        <div class="tabs" id="dcChange" style="margin-bottom:10px"><button class="on" data-v="code" type="button">只改了程式碼 app.py</button><button data-v="req" type="button">改了 requirements.txt</button><button data-v="base" type="button">換了基底映像版本</button></div>
        <div id="dcOut"></div>`;
      case 'gitcmd': return `
        <label class="field"><span>搜尋情境</span><input class="input" id="gcQ" placeholder="例如：撤銷、衝突、分支、遠端"></label>
        <div id="gcOut"></div>`;
      case 'semver': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>目前版本</span><input class="input mono" id="svV" value="1.4.2"></label>
          <label class="field"><span>相依範圍（npm 寫法）</span><input class="input mono" id="svR" value="^1.4.2"></label>
        </div>
        <div class="tabs" id="svType" style="margin-bottom:10px"><button class="on" data-v="patch" type="button">修正錯誤</button><button data-v="minor" type="button">新增功能（向下相容）</button><button data-v="major" type="button">破壞性變更</button></div>
        <div id="svOut"></div>`;
      case 'binary': return `
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>IPv4 位址</span><input class="input mono" id="bnIp" value="192.168.10.37" spellcheck="false"></label>
          <label class="field"><span>前綴長度 /n</span><input class="input num" type="number" id="bnPre" value="26" min="0" max="32"></label>
        </div>
        <div id="bnOut"></div>
        <label class="field" style="margin-top:12px"><span>十進位 ↔ 二進位（0～255）</span><input class="input mono" id="bnDec" value="200" spellcheck="false"></label>
        <div class="out" id="bnDecOut"></div>`;
      case 'osi': return `
        <div class="row small"><span>得分 <b class="num" id="osScore">0</b> / <b class="num" id="osTotal">0</b></span><span class="spacer"></span><button class="btn sm outline" id="osNext" type="button">換一題</button></div>
        <div class="big-q" id="osQ"></div>
        <div class="tabs" id="osOpts" style="justify-content:center"></div>
        <p class="small center" id="osMsg" style="margin:12px 0 0;min-height:1.6em"></p>`;
      case 'vlsm': return `
        <label class="field"><span>可用網段</span><input class="input mono" id="vlNet" value="192.168.10.0/24" spellcheck="false"></label>
        <label class="field"><span>各子網路需要的主機數（每行「名稱 數量」）</span><textarea class="input mono" id="vlReq" rows="5">業務部 50
研發部 25
會議室 10
訪客 Wi-Fi 20
路由器連線 2</textarea></label>
        <div id="vlOut"></div>`;
      case 'gitgraph': return `
        <div class="tabs" id="ggPreset" style="margin-bottom:8px"><button data-v="ff" type="button">情境：快轉合併</button><button data-v="merge" type="button">情境：三方合併</button><button data-v="reset" type="button">情境：reset 與 revert</button><button data-v="clear" type="button">清空重來</button></div>
        <div class="row" style="gap:6px;margin-bottom:8px"><input class="input mono" id="ggIn" placeholder='輸入指令，例如 git commit -m "新增登入頁"' spellcheck="false" autocomplete="off" style="flex:1;min-width:0"><button class="btn sm" id="ggRun" type="button">執行</button></div>
        <pre class="out" id="ggLog" style="max-height:140px;overflow:auto"></pre>
        <div id="ggOut" style="margin-top:10px"></div>
        <p class="tiny muted" style="margin:6px 0 0">支援：git commit -m、git branch [名稱]、git branch -d、git switch [-c]、git checkout [-b]、git merge、git reset --hard HEAD~n、git revert HEAD、git tag、git log、git status。這是簡化的教學模擬，不處理檔案內容與衝突。</p>`;
      case 'caesar': return `
        <label class="field"><span>明文或密文（英文字母）</span><input class="input" id="cIn" value="ATTACK AT DAWN"></label>
        <label class="field"><span>位移量 <b id="cShiftV" class="mono">3</b></span><input type="range" id="cShift" min="1" max="25" value="3" style="width:100%"></label>
        <div class="row" style="margin-bottom:10px"><button class="btn sm" data-c="enc" type="button">加密</button><button class="btn sm outline" data-c="dec" type="button">解密</button><button class="btn sm outline" data-c="brute" type="button">暴力破解 25 種位移</button></div>
        <div class="out" id="cOut"></div>
        <p class="small muted" style="margin:10px 0 0">凱薩密碼的金鑰只有 25 種，逐一嘗試即可破解；AES-128 的金鑰空間為 2<sup>128</sup>，約 3.4 × 10<sup>38</sup>。</p>`;
      case 'base64': return `
        <label class="field"><span>原文</span><input class="input" id="b64In" value="password=P@ssw0rd"></label>
        <div class="out" id="b64Out"></div>
        <label class="field" style="margin-top:14px"><span>貼上 Base64 字串還原</span><input class="input" id="b64Dec" value="SGVsbG8gaVBBUw=="></label>
        <div class="out" id="b64DecOut"></div>
        <p class="small muted" style="margin:10px 0 0">編碼只是改變資料的表示方式，沒有金鑰、任何人都能還原；加密則必須持有金鑰才能解密。</p>`;
      case 'pw': return `
        <label class="field"><span>輸入密碼（僅在本機計算）</span><input class="input mono" id="pwIn" type="text" value="Summer2026!" autocomplete="off" spellcheck="false"></label>
        <div class="meter"><span id="pwBar"></span></div>
        <div id="pwOut"></div>`;
      case 'ale': return `
        <div class="grid g3" style="gap:10px">
          <label class="field"><span>資產價值 AV（元）</span><input class="input num" type="number" id="aAV" value="2000000" min="0"></label>
          <label class="field"><span>曝險因子 EF（%）</span><input class="input num" type="number" id="aEF" value="40" min="0" max="100"></label>
          <label class="field"><span>年發生率 ARO</span><input class="input num" type="number" id="aARO" value="0.05" step="0.01" min="0"></label>
        </div>
        <div class="grid g2" style="gap:10px">
          <label class="field"><span>控制措施年成本（元）</span><input class="input num" type="number" id="aCost" value="60000" min="0"></label>
          <label class="field"><span>導入後 ALE（元）</span><input class="input num" type="number" id="aAfter" value="10000" min="0"></label>
        </div>
        <div id="aleOut"></div>`;
      case 'matrix': {
        let h = '<div class="risk-grid"><div class="h"></div>';
        for (let i = 1; i <= 5; i++) h += `<div class="h">衝擊 ${i}</div>`;
        for (let l = 5; l >= 1; l--) {
          h += `<div class="h">可能性 ${l}</div>`;
          for (let i = 1; i <= 5; i++) {
            const v = l * i, lv = v >= 15 ? 4 : v >= 8 ? 3 : v >= 4 ? 2 : 1;
            h += `<div class="cell lv${lv}" data-l="${l}" data-i="${i}">${v}</div>`;
          }
        }
        return h + '</div><div id="mxOut" class="small muted" style="margin-top:14px">點選任一格查看風險等級與建議處理方式。</div>';
      }
      case 'backup': return `
        <div class="row" style="margin-bottom:12px">
          <div class="tabs" id="bkType"><button class="on" data-v="inc" type="button">增量備份</button><button data-v="diff" type="button">差異備份</button></div>
        </div>
        <p class="small muted" style="margin-bottom:8px">週日執行完整備份，週一起每晚備份。選擇系統損毀的日期（當天早上）：</p>
        <div class="tabs" id="bkDay"><button data-v="1" type="button">週一</button><button data-v="2" type="button">週二</button><button data-v="3" type="button">週三</button><button class="on" data-v="4" type="button">週四</button><button data-v="5" type="button">週五</button><button data-v="6" type="button">週六</button></div>
        <div id="bkOut" style="margin-top:14px"></div>`;
      case 'ports': return `
        <div class="row small"><span>得分 <b class="num" id="pScore">0</b></span><span>連續答對 <b class="num" id="pStreak">0</b></span><span class="spacer"></span><button class="btn sm outline" id="pRev" type="button">切換為：服務 → 埠號</button></div>
        <div class="big-q" id="pQ"></div>
        <div class="port-game" id="pOpts"></div>
        <p class="small muted center" id="pMsg" style="margin:12px 0 0"></p>`;
      case 'cvss': {
        const M = CVSS_METRICS.map(m => `<div class="metric"><span>${m.label}（${m.key}）</span><div class="tabs" data-metric="${m.key}">${m.opts.map(o => `<button type="button" data-v="${o[0]}" class="${o[0] === m.def ? 'on' : ''}">${o[1]}</button>`).join('')}</div></div>`).join('');
        return `<div class="cvss-grid">${M}</div><div class="cvss-score" id="cvssOut"></div>`;
      }
    }
    return '';
  }

  /* CVSS v3.1 基本指標與權重（依 FIRST 規格） */
  const CVSS_METRICS = [
    { key: 'AV', label: '攻擊途徑', def: 'N', opts: [['N', '網路'], ['A', '相鄰'], ['L', '本機'], ['P', '實體']] },
    { key: 'AC', label: '攻擊複雜度', def: 'L', opts: [['L', '低'], ['H', '高']] },
    { key: 'PR', label: '所需權限', def: 'N', opts: [['N', '無'], ['L', '低'], ['H', '高']] },
    { key: 'UI', label: '使用者互動', def: 'N', opts: [['N', '不需要'], ['R', '需要']] },
    { key: 'S', label: '影響範圍', def: 'U', opts: [['U', '不變'], ['C', '改變']] },
    { key: 'C', label: '機密性衝擊', def: 'H', opts: [['H', '高'], ['L', '低'], ['N', '無']] },
    { key: 'I', label: '完整性衝擊', def: 'H', opts: [['H', '高'], ['L', '低'], ['N', '無']] },
    { key: 'A', label: '可用性衝擊', def: 'H', opts: [['H', '高'], ['L', '低'], ['N', '無']] }
  ];
  function roundup(x) { const i = Math.round(x * 100000); return i % 10000 === 0 ? i / 100000 : (Math.floor(i / 10000) + 1) / 10; }
  function cvss31(v) {
    const AV = { N: .85, A: .62, L: .55, P: .2 }[v.AV], AC = { L: .77, H: .44 }[v.AC];
    const PR = v.S === 'C' ? { N: .85, L: .68, H: .5 }[v.PR] : { N: .85, L: .62, H: .27 }[v.PR];
    const UI = { N: .85, R: .62 }[v.UI], W = { H: .56, L: .22, N: 0 };
    const iss = 1 - (1 - W[v.C]) * (1 - W[v.I]) * (1 - W[v.A]);
    const impact = v.S === 'U' ? 6.42 * iss : 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15);
    const expl = 8.22 * AV * AC * PR * UI;
    if (impact <= 0) return { score: 0, impact: 0, expl };
    const score = v.S === 'U' ? roundup(Math.min(impact + expl, 10)) : roundup(Math.min(1.08 * (impact + expl), 10));
    return { score, impact, expl };
  }
  const severity = s => s === 0 ? ['無', ''] : s < 4 ? ['低', 'ok'] : s < 7 ? ['中', 'warn'] : s < 9 ? ['高', 'bad'] : ['嚴重', 'bad'];

  async function sha256(text) {
    if (!(window.crypto && crypto.subtle)) return '（此環境不支援 Web Crypto，請以 HTTPS 開啟）';
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }
  const caesar = (s, k) => s.replace(/[a-z]/gi, ch => { const b = ch <= 'Z' ? 65 : 97; return String.fromCharCode((ch.charCodeAt(0) - b + k + 26) % 26 + b); });
  const b64e = s => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
  const b64d = s => new TextDecoder().decode(Uint8Array.from(atob(s.trim()), c => c.charCodeAt(0)));
  const money = n => isFinite(n) ? Math.round(n).toLocaleString('zh-TW') + ' 元' : '—';
  function humanTime(sec) {
    if (sec < 1) return '不到 1 秒';
    if (sec > 31536000 * 1e12) return '超過一兆年';
    if (sec >= 31536000 * 1e4) return (sec / 31536000).toExponential(1).replace('e+', ' × 10^') + ' 年';
    for (const [n, s] of [['年', 31536000], ['天', 86400], ['小時', 3600], ['分鐘', 60], ['秒', 1]]) if (sec >= s) return Math.floor(sec / s).toLocaleString('zh-TW') + ' ' + n;
    return '';
  }
  function tabsSelect(root, cb) {
    root.addEventListener('click', e => {
      const b = e.target.closest('.tabs button'); if (!b) return;
      b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      cb(b.parentElement, b.dataset.v);
    });
  }

  function bind(id, root) {
    if (id === 'hash') {
      const a = $('#hashIn', root), b = $('#hashIn2', root);
      const run = async () => {
        const [h1, h2] = await Promise.all([sha256(a.value), sha256(b.value)]);
        $('#hashOut', root).textContent = h1; $('#hashOut2', root).textContent = h2;
        if (h1.length === 64 && h2.length === 64) {
          let diff = 0; for (let i = 0; i < 64; i++) if (h1[i] !== h2[i]) diff++;
          $('#hashDiff', root).innerHTML = h1 === h2
            ? '兩段文字相同，雜湊值完全一致，可據以驗證資料<b>完整性</b>。'
            : `64 個十六進位字元中有 <b class="num">${diff}</b> 個不同（約 ${Math.round(diff / 64 * 100)}%）。輸入僅些微差異，輸出卻大幅改變，即為<b>雪崩效應</b>。`;
        }
      };
      a.addEventListener('input', run); b.addEventListener('input', run); run();
    }
    if (id === 'caesar') {
      const r = $('#cShift', root), out = $('#cOut', root), inp = $('#cIn', root);
      r.addEventListener('input', () => { $('#cShiftV', root).textContent = r.value; });
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-c]'); if (!b) return;
        const k = +r.value;
        if (b.dataset.c === 'enc') out.textContent = caesar(inp.value, k);
        if (b.dataset.c === 'dec') out.textContent = caesar(inp.value, -k);
        if (b.dataset.c === 'brute') { let s = ''; for (let i = 1; i < 26; i++) s += `位移 ${String(i).padStart(2, ' ')}　${caesar(inp.value, -i)}\n`; out.textContent = s; }
      });
      out.textContent = caesar(inp.value, 3);
    }
    if (id === 'base64') {
      const a = $('#b64In', root), d = $('#b64Dec', root);
      const run = () => {
        try { $('#b64Out', root).textContent = b64e(a.value); } catch (e) { $('#b64Out', root).textContent = '—'; }
        try { $('#b64DecOut', root).textContent = b64d(d.value); } catch (e) { $('#b64DecOut', root).textContent = '不是有效的 Base64 字串'; }
      };
      a.addEventListener('input', run); d.addEventListener('input', run); run();
    }
    if (id === 'pw') {
      const inp = $('#pwIn', root);
      const COMMON = ['password', '123456', '12345678', 'qwerty', 'abc123', 'iloveyou', 'admin', 'welcome', 'p@ssw0rd', 'password1', '1qaz2wsx', 'summer', 'winter', 'taiwan'];
      const run = () => {
        const p = inp.value;
        let pool = 0;
        if (/[a-z]/.test(p)) pool += 26; if (/[A-Z]/.test(p)) pool += 26; if (/\d/.test(p)) pool += 10; if (/[^a-zA-Z0-9]/.test(p)) pool += 33;
        const bits = p.length * Math.log2(pool || 1);
        const weak = COMMON.some(w => p.toLowerCase().includes(w)) || /(.)\1{2,}/.test(p) || /(0123|1234|2345|abcd|qwer)/i.test(p);
        const eff = weak ? Math.min(bits, 28) : bits;
        const online = Math.pow(2, eff) / 2 / 100, offline = Math.pow(2, eff) / 2 / 1e10;
        const color = eff < 40 ? 'var(--bad)' : eff < 60 ? 'var(--warn)' : eff < 80 ? 'var(--accent)' : 'var(--ok)';
        const label = eff < 40 ? '弱' : eff < 60 ? '普通' : eff < 80 ? '強' : '非常強';
        $('#pwBar', root).style.width = Math.min(100, eff) + '%'; $('#pwBar', root).style.background = color;
        const tips = [];
        if (p.length < 12) tips.push('長度少於 12 字元，增加長度是最有效的強化方式');
        if (weak) tips.push('包含常見單字、連續或重複字元，字典攻擊會優先嘗試');
        if (pool < 60 && p.length) tips.push('可混用大小寫、數字與符號');
        if (!tips.length) tips.push('強度良好。仍應避免在不同網站重複使用，並啟用多因子驗證');
        $('#pwOut', root).innerHTML = `
          <div class="row small"><b style="color:${color}">${label}</b><span class="muted">約 ${Math.round(eff)} 位元熵・字元集 ${pool}・長度 ${p.length}</span></div>
          <table class="tbl" style="margin:10px 0">
            <tr><th>攻擊情境</th><th>平均破解時間</th></tr>
            <tr><td>線上猜測（每秒 100 次，無鎖定）</td><td>${humanTime(online)}</td></tr>
            <tr><td>離線破解快速雜湊（每秒 100 億次）</td><td>${humanTime(offline)}</td></tr>
          </table>
          <ul class="small" style="margin:0;padding-left:1.2em">${tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
      };
      inp.addEventListener('input', run); run();
    }
    if (id === 'ale') {
      const run = () => {
        const AV = +$('#aAV', root).value, EF = +$('#aEF', root).value / 100, ARO = +$('#aARO', root).value;
        const cost = +$('#aCost', root).value, after = +$('#aAfter', root).value;
        const SLE = AV * EF, ALE = SLE * ARO, val = ALE - after - cost;
        $('#aleOut', root).innerHTML = `
          <table class="tbl" style="margin-bottom:12px">
            <tr><th>項目</th><th>公式</th><th style="text-align:right">結果</th></tr>
            <tr><td>單一損失期望值 SLE</td><td class="mono small">AV × EF</td><td class="num" style="text-align:right">${money(SLE)}</td></tr>
            <tr><td>年度損失期望值 ALE</td><td class="mono small">SLE × ARO</td><td class="num" style="text-align:right">${money(ALE)}</td></tr>
            <tr><td>控制措施年度價值</td><td class="mono small">ALE前 − ALE後 − 成本</td><td class="num" style="text-align:right;color:${val >= 0 ? 'var(--ok)' : 'var(--bad)'}"><b>${money(val)}</b></td></tr>
          </table>
          <div class="box ${val >= 0 ? 'memo' : 'warn'}"><b class="t">${val >= 0 ? '具成本效益' : '不具成本效益'}</b>${val >= 0 ? '控制措施每年降低的損失大於其成本，建議導入。' : '控制措施成本高於其降低的損失，可評估其他方案、風險移轉或風險接受。'}</div>`;
      };
      root.addEventListener('input', run); run();
    }
    if (id === 'matrix') {
      root.addEventListener('click', e => {
        const c = e.target.closest('.cell'); if (!c) return;
        root.querySelectorAll('.cell').forEach(x => x.classList.toggle('on', x === c));
        const v = c.dataset.l * c.dataset.i;
        const [name, cls, act] = v >= 15 ? ['極高風險', 'bad', '不可接受。應立即處理並向管理階層報告，優先採取降低或避免策略。']
          : v >= 8 ? ['高風險', 'bad', '應於期限內採取控制措施降低風險，並指定負責人追蹤。']
          : v >= 4 ? ['中風險', 'warn', '評估成本效益後決定降低或移轉，並持續監控。']
          : ['低風險', 'ok', '在風險胃納範圍內，經核准後可接受，定期重新檢視。'];
        $('#mxOut', root).innerHTML = `<span class="num">可能性 ${c.dataset.l} × 衝擊 ${c.dataset.i} = ${v}</span>　<span class="tag ${cls}">${name}</span><div style="margin-top:6px;color:var(--ink)">${act}</div>`;
      });
    }
    if (id === 'backup') {
      let type = 'inc', day = 4;
      const names = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
      const run = () => {
        const last = day - 1;
        const need = last === 0 ? [0] : type === 'inc' ? Array.from({ length: last + 1 }, (_, i) => i) : [0, last];
        const label = i => i === 0 ? '完整' : type === 'inc' ? '增量' : '差異';
        $('#bkOut', root).innerHTML = `<div class="bk-days">${names.map((n, i) => {
          const cls = need.includes(i) ? 'use' : i === day ? 'crash' : '';
          const st = i === day ? '損毀' : i <= last ? label(i) : '—';
          return `<div class="${cls}"><b>${n}</b>${st}</div>`;
        }).join('')}</div>
          <p class="small" style="margin:12px 0 4px">需還原 <b class="num">${need.length}</b> 份：${need.map(i => names[i] + label(i)).join(' → ')}</p>
          <p class="small muted" style="margin:0">${type === 'inc' ? '增量備份每日備份量最小、速度最快，但還原時須依序套用每一份增量。' : '差異備份的備份量逐日增加，但還原只需完整備份加上最後一份差異備份。'}</p>`;
      };
      tabsSelect(root, (tabs, v) => { if (tabs.id === 'bkType') type = v; else day = +v; run(); });
      run();
    }
    if (id === 'ports') {
      let score = 0, streak = 0, rev = false, cur = null, locked = false;
      const next = () => {
        locked = false;
        cur = PORTS[Math.floor(Math.random() * PORTS.length)];
        const pool = PORTS.filter(p => p !== cur && p[1].split('（')[0] !== cur[1].split('（')[0]).sort(() => Math.random() - .5).slice(0, 3).concat([cur]).sort(() => Math.random() - .5);
        $('#pQ', root).textContent = rev ? cur[1] : cur[0];
        $('#pOpts', root).innerHTML = pool.map(p => `<button type="button" data-p="${p[0]}">${esc(rev ? p[0] : p[1])}</button>`).join('');
        $('#pMsg', root).textContent = rev ? '這項服務的預設埠號為何？' : '這個埠號對應哪一項服務？';
      };
      root.addEventListener('click', e => {
        if (e.target.id === 'pRev') { rev = !rev; e.target.textContent = rev ? '切換為：埠號 → 服務' : '切換為：服務 → 埠號'; next(); return; }
        const b = e.target.closest('#pOpts button'); if (!b || locked) return;
        locked = true;
        const ok = +b.dataset.p === cur[0];
        b.classList.add(ok ? 'right' : 'wrong');
        if (!ok) root.querySelector(`#pOpts button[data-p="${cur[0]}"]`).classList.add('right');
        score += ok ? 10 : 0; streak = ok ? streak + 1 : 0;
        $('#pScore', root).textContent = score; $('#pStreak', root).textContent = streak;
        $('#pMsg', root).textContent = ok ? '答對' : `正確答案：${cur[0]}／${cur[1]}`;
        setTimeout(next, ok ? 700 : 1600);
      });
      next();
    }
    if (id === 'confusion') {
      const run = () => {
        const [TP, FN, FP, TN] = ['TP', 'FN', 'FP', 'TN'].map(k => Math.max(0, +$('#cm' + k, root).value || 0));
        const n = TP + FN + FP + TN, acc = (TP + TN) / n, pre = TP / (TP + FP), rec = TP / (TP + FN), spe = TN / (TN + FP), f1 = 2 * pre * rec / (pre + rec);
        const pctS = x => Number.isFinite(x) ? (x * 100).toFixed(1) + '%' : '—';
        $('#cmOut', root).innerHTML = `
          <table class="tbl" style="margin:6px 0 12px">
            <tr><th>指標</th><th>公式</th><th style="text-align:right">結果</th></tr>
            <tr><td>準確率 Accuracy</td><td class="mono small">(TP+TN) / 全部</td><td class="num" style="text-align:right">${pctS(acc)}</td></tr>
            <tr><td>精確率 Precision</td><td class="mono small">TP / (TP+FP)</td><td class="num" style="text-align:right">${pctS(pre)}</td></tr>
            <tr><td>召回率 Recall</td><td class="mono small">TP / (TP+FN)</td><td class="num" style="text-align:right">${pctS(rec)}</td></tr>
            <tr><td>特異度 Specificity</td><td class="mono small">TN / (TN+FP)</td><td class="num" style="text-align:right">${pctS(spe)}</td></tr>
            <tr><td>F1 分數</td><td class="mono small">2PR / (P+R)</td><td class="num" style="text-align:right"><b>${pctS(f1)}</b></td></tr>
          </table>
          <p class="small" style="margin:0">${(TN + FP) > 4 * (TP + FN) ? '目前資料不平衡（負類遠多於正類），準確率容易被負類「灌高」，應優先看精確率、召回率與 F1。' : '資料分布較平均，準確率較有參考價值，但仍應搭配精確率與召回率。'}漏掉病人代價高（如疾病篩檢）重視召回率；誤報代價高（如垃圾郵件誤刪）重視精確率。</p>`;
      };
      root.addEventListener('input', run); run();
    }
    if (id === 'stats') {
      const inp = $('#stIn', root);
      const q = (s, p) => { const i = (s.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i); return s[lo] + (s[hi] - s[lo]) * (i - lo); };
      const run = () => {
        const a = inp.value.split(/[\s,，、]+/).map(Number).filter(x => inp.value.trim() && Number.isFinite(x));
        if (a.length < 2) { $('#stOut', root).innerHTML = '<p class="small muted">請輸入至少兩個數值</p>'; return; }
        const s = a.slice().sort((x, y) => x - y), n = a.length, mean = a.reduce((t, x) => t + x, 0) / n;
        const ss = a.reduce((t, x) => t + (x - mean) ** 2, 0), vp = ss / n, vs = ss / (n - 1), sd = Math.sqrt(vs);
        const cnt = {}; a.forEach(x => cnt[x] = (cnt[x] || 0) + 1); const mx = Math.max(...Object.values(cnt));
        const mode = mx > 1 ? Object.keys(cnt).filter(k => cnt[k] === mx).join('、') : '無（每個值只出現一次）';
        const Q1 = q(s, .25), Q2 = q(s, .5), Q3 = q(s, .75), iqr = Q3 - Q1, lo = Q1 - 1.5 * iqr, hi = Q3 + 1.5 * iqr;
        const out = a.filter(x => x < lo || x > hi), min = s[0], max = s[n - 1];
        $('#stOut', root).innerHTML = `
          <table class="tbl" style="margin:6px 0 12px">
            <tr><td>平均數 Mean</td><td class="num">${fmtN(mean, 3)}</td><td>中位數 Median</td><td class="num">${fmtN(Q2, 3)}</td></tr>
            <tr><td>眾數 Mode</td><td class="num">${esc(mode)}</td><td>全距 Range</td><td class="num">${fmtN(max - min, 3)}</td></tr>
            <tr><td>母體變異數 σ²</td><td class="num">${fmtN(vp, 3)}</td><td>樣本變異數 s²</td><td class="num">${fmtN(vs, 3)}</td></tr>
            <tr><td>樣本標準差 s</td><td class="num">${fmtN(sd, 3)}</td><td>IQR（Q3 − Q1）</td><td class="num">${fmtN(iqr, 3)}</td></tr>
          </table>
          <p class="small" style="margin:0 0 8px">離群值界線 [Q1 − 1.5×IQR, Q3 + 1.5×IQR] = [${fmtN(lo, 2)}, ${fmtN(hi, 2)}]：${out.length ? `<b style="color:var(--bad)">${out.join('、')}</b> 為離群值。平均數 ${fmtN(mean, 2)} 被拉離中位數 ${fmtN(Q2, 2)}，偏態資料宜用中位數描述中心。` : '沒有離群值。'}</p>
          <div class="table-wrap"><table class="tbl small"><tr><th>原值</th>${a.map(x => `<td class="num">${fmtN(x, 2)}</td>`).join('')}</tr>
            <tr><th>Min-Max</th>${a.map(x => `<td class="num">${fmtN((x - min) / (max - min || 1), 2)}</td>`).join('')}</tr>
            <tr><th>Z-score</th>${a.map(x => `<td class="num">${fmtN((x - mean) / (Math.sqrt(vp) || 1), 2)}</td>`).join('')}</tr></table></div>
          <p class="small muted" style="margin:8px 0 0">Min-Max 將資料縮放到 0～1，容易受離群值影響；Z-score 轉成平均 0、標準差 1（此處以母體標準差計算）。</p>`;
      };
      inp.addEventListener('input', run); run();
    }
    if (id === 'gd') {
      const r = $('#gdLr', root);
      const run = () => {
        const lr = +r.value; $('#gdLrV', root).textContent = lr.toFixed(2);
        let x = 5; const steps = [`第 0 步 x = 5`];
        for (let i = 1; i <= 15; i++) { x = x - lr * 2 * x; steps.push(`第 ${i} 步 x = ${fmtN(x, 4)}　f(x) = ${fmtN(x * x, 4)}`); }
        $('#gdOut', root).textContent = steps.join('\n');
        const k = Math.abs(1 - 2 * lr);
        $('#gdMsg', root).innerHTML = lr >= 1 ? '<b style="color:var(--bad)">發散</b>：學習率太大，每一步都跨過最低點且越跳越遠，損失不降反升。'
          : k > 0.9 ? '<b style="color:var(--warn)">收斂很慢</b>：學習率太小，需要非常多步才能接近最低點。'
          : lr > 0.5 ? '<b style="color:var(--warn)">震盪收斂</b>：每一步跨過最低點左右來回，但幅度逐漸變小。'
          : '<b style="color:var(--ok)">平穩收斂</b>：學習率適中，參數快速接近最低點 x = 0。';
      };
      r.addEventListener('input', run); run();
    }
    if (id === 'chmod') {
      const boxes = [...root.querySelectorAll('input[type=checkbox]')], num = $('#chNum', root);
      const digit = k => boxes.filter(b => b.dataset.who === k && b.checked).reduce((t, b) => t + +b.dataset.bit, 0);
      const sym = d => (d & 4 ? 'r' : '-') + (d & 2 ? 'w' : '-') + (d & 1 ? 'x' : '-');
      const show = () => {
        const ds = ['u', 'g', 'o'].map(digit), n = ds.join('');
        $('#chOut', root).textContent = `數字：${n}　符號：-${ds.map(sym).join('')}　指令：chmod ${n} 檔案\n` +
          `符號寫法：chmod u=${sym(ds[0]).replace(/-/g, '')},g=${sym(ds[1]).replace(/-/g, '')},o=${sym(ds[2]).replace(/-/g, '')} 檔案` +
          (ds[2] & 2 ? '\n注意：其他人可寫入，通常不安全。' : '') + (n === '600' ? '\n適合私鑰等只有擁有者能讀寫的檔案。' : n === '755' ? '\n適合程式與目錄。' : n === '644' ? '\n適合一般檔案。' : '');
      };
      root.addEventListener('change', e => { if (e.target.type === 'checkbox') { num.value = ['u', 'g', 'o'].map(digit).join(''); show(); } });
      num.addEventListener('input', () => {
        const v = num.value.trim().slice(-3);
        if (!/^[0-7]{3}$/.test(v)) { $('#chOut', root).textContent = '請輸入三位數 0～7 的數字，例如 644'; return; }
        ['u', 'g', 'o'].forEach((k, i) => boxes.filter(b => b.dataset.who === k).forEach(b => { b.checked = !!(+v[i] & +b.dataset.bit); }));
        show();
      });
      num.dispatchEvent(new Event('input'));
    }
    if (id === 'cron') {
      const inp = $('#crIn', root);
      const R = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 7]], NAMES = ['分', '時', '日', '月', '週'], WD = ['日', '一', '二', '三', '四', '五', '六', '日'];
      const parse = (f, [lo, hi]) => {
        const set = new Set();
        for (const part of f.split(',')) {
          const m = part.match(/^(\*|\d+)(?:-(\d+))?(?:\/(\d+))?$/); if (!m) return null;
          let a = m[1] === '*' ? lo : +m[1], b = m[1] === '*' ? hi : (m[2] !== undefined ? +m[2] : (m[3] ? hi : a)); const st = m[3] ? +m[3] : 1;
          if (a < lo || b > hi || a > b || st < 1) return null;
          for (let x = a; x <= b; x += st) set.add(x);
        }
        return set;
      };
      const desc = (f, i) => f === '*' ? `每${NAMES[i]}` : /^\*\/\d+$/.test(f) ? `每 ${f.slice(2)} ${NAMES[i] === '週' ? '天' : NAMES[i] === '時' ? '小時' : NAMES[i] === '分' ? '分鐘' : NAMES[i]}` : i === 4 ? '週' + f.replace(/\d/g, d => WD[+d]) : `${f} ${NAMES[i]}`;
      const run = () => {
        const fs = inp.value.trim().split(/\s+/);
        if (fs.length !== 5) { $('#crOut', root).innerHTML = '<p class="small" style="color:var(--bad)">需要剛好 5 個欄位：分 時 日 月 週</p>'; return; }
        const sets = fs.map((f, i) => parse(f, R[i]));
        if (sets.some(x => !x)) { $('#crOut', root).innerHTML = '<p class="small" style="color:var(--bad)">欄位格式或範圍不正確</p>'; return; }
        if (sets[4].has(7)) sets[4].add(0);
        const domStar = fs[2] === '*', dowStar = fs[4] === '*', next = []; const t = new Date(); t.setSeconds(0, 0); t.setMinutes(t.getMinutes() + 1);
        for (let k = 0; k < 600000 && next.length < 5; k++) {
          const dm = sets[2].has(t.getDate()), dw = sets[4].has(t.getDay());
          const dayOk = domStar && dowStar ? true : domStar ? dw : dowStar ? dm : (dm || dw);
          if (sets[0].has(t.getMinutes()) && sets[1].has(t.getHours()) && sets[3].has(t.getMonth() + 1) && dayOk) next.push(new Date(t));
          t.setMinutes(t.getMinutes() + 1);
        }
        $('#crOut', root).innerHTML = `<table class="tbl" style="margin:0 0 10px">${fs.map((f, i) => `<tr><td style="width:3em">${NAMES[i]}</td><td class="mono">${esc(f)}</td><td>${esc(desc(f, i))}</td></tr>`).join('')}</table>
          <div class="small"><b>接下來的執行時間</b>（依你的電腦時區）：</div><div class="out">${next.map(d => d.toLocaleString('zh-TW', { hour12: false, weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })).join('\n') || '一年內不會執行，請檢查設定'}</div>
          ${!domStar && !dowStar ? '<p class="small muted" style="margin:8px 0 0">同時指定「日」與「週」時，cron 只要符合其中一個就會執行。</p>' : ''}`;
      };
      inp.addEventListener('input', run);
      root.addEventListener('click', e => { const b = e.target.closest('[data-cr]'); if (b) { inp.value = b.dataset.cr; run(); } });
      run();
    }
    if (id === 'subnet') {
      const inp = $('#ciIn', root);
      const toIp = n => [24, 16, 8, 0].map(s => (n >>> s) & 255).join('.');
      const run = () => {
        const m = inp.value.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
        if (!m || m.slice(1, 5).some(x => +x > 255) || +m[5] > 32) { $('#ciOut', root).innerHTML = '<p class="small" style="color:var(--bad)">格式範例：192.168.10.37/24</p>'; return; }
        const ip = ((+m[1] << 24) >>> 0) + (+m[2] << 16) + (+m[3] << 8) + +m[4], p = +m[5];
        const mask = p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0, net = (ip & mask) >>> 0, bc = (net | (~mask >>> 0)) >>> 0;
        const total = 2 ** (32 - p), hosts = p >= 31 ? (p === 31 ? 2 : 1) : total - 2;
        const priv = (ip >>> 24) === 10 || ((ip >>> 20) === 0xAC1) || ((ip >>> 16) === 0xC0A8);
        $('#ciOut', root).innerHTML = `<table class="tbl" style="margin:6px 0 10px">
          <tr><td>子網路遮罩</td><td class="mono">${toIp(mask)}</td></tr>
          <tr><td>網路位址</td><td class="mono">${toIp(net)}/${p}</td></tr>
          <tr><td>廣播位址</td><td class="mono">${p >= 31 ? '—' : toIp(bc)}</td></tr>
          <tr><td>可用主機範圍</td><td class="mono">${p >= 31 ? toIp(net) + ' – ' + toIp(bc) : toIp(net + 1) + ' – ' + toIp(bc - 1)}</td></tr>
          <tr><td>可用主機數</td><td class="num"><b>${hosts.toLocaleString('zh-TW')}</b>（2^${32 - p}${p < 31 ? ' − 2' : ''}）</td></tr>
          <tr><td>類型</td><td>${priv ? '私有 IP（內網）' : (ip >>> 24) === 127 ? '回送位址（本機）' : '公有 IP'}</td></tr></table>`;
      };
      inp.addEventListener('input', run); run();
    }
    if (id === 'position') {
      const run = () => {
        const cap = +$('#psCap', root).value, risk = +$('#psRisk', root).value / 100, entry = +$('#psIn', root).value, stop = +$('#psStop', root).value;
        const per = entry - stop, maxLoss = cap * risk;
        if (!(per > 0)) { $('#psOut', root).innerHTML = '<p class="small" style="color:var(--bad)">停損價必須低於進場價。</p>'; return; }
        const shares = Math.floor(maxLoss / per), amount = shares * entry, pctCap = cap ? amount / cap : 0;
        $('#psOut', root).innerHTML = `
          <table class="tbl" style="margin:6px 0 12px">
            <tr><td>可承受最大虧損</td><td class="num">${money(maxLoss)}</td></tr>
            <tr><td>每股風險（進場 − 停損）</td><td class="num">${fmtN(per, 2)} 元</td></tr>
            <tr><td>可買股數</td><td class="num"><b>${shares.toLocaleString('zh-TW')} 股</b>（約 ${fmtN(shares / 1000, 2)} 張）</td></tr>
            <tr><td>投入金額</td><td class="num">${money(amount)}（占總資金 ${(pctCap * 100).toFixed(1)}%）</td></tr>
            <tr><td>停損跌幅</td><td class="num">${(per / entry * 100).toFixed(1)}%</td></tr>
          </table>
          <p class="small" style="margin:0">${pctCap > 1 ? '投入金額超過總資金，代表停損設得太近，實務上仍應受單一部位上限限制。' : pctCap > 0.2 ? '單一部位超過總資金 20%，請確認是否符合你的分散原則。' : '觸發停損時虧損約為總資金的 ' + (risk * 100).toFixed(1) + '%。'}未計入手續費、證交稅與跳空跌破停損的滑價。</p>`;
      };
      root.addEventListener('input', run); run();
    }
    if (id === 'drawdown') {
      const run = () => {
        const v = $('#ddIn', root).value.split(/[\s,，、]+/).map(Number).filter(x => Number.isFinite(x) && x > 0);
        const yrs = +$('#ddYears', root).value;
        if (v.length < 2) { $('#ddOut', root).innerHTML = '<p class="small muted">請輸入至少兩個正數</p>'; return; }
        let peak = v[0], pi = 0, mdd = 0, mp = 0, mt = 0;
        v.forEach((x, i) => { if (x > peak) { peak = x; pi = i; } const dd = x / peak - 1; if (dd < mdd) { mdd = dd; mp = pi; mt = i; } });
        const tot = v[v.length - 1] / v[0] - 1, cagr = yrs > 0 ? Math.pow(v[v.length - 1] / v[0], 1 / yrs) - 1 : NaN;
        $('#ddOut', root).innerHTML = `
          <table class="tbl" style="margin:6px 0 12px">
            <tr><td>總報酬率</td><td class="mono small">期末 ÷ 期初 − 1</td><td class="num">${(tot * 100).toFixed(2)}%</td></tr>
            <tr><td>年化報酬率</td><td class="mono small">(期末 ÷ 期初)^(1/年) − 1</td><td class="num">${Number.isFinite(cagr) ? (cagr * 100).toFixed(2) + '%' : '—'}</td></tr>
            <tr><td>最大回撤</td><td class="mono small">(谷底 − 前高) ÷ 前高</td><td class="num" style="color:var(--bad)"><b>${(mdd * 100).toFixed(2)}%</b></td></tr>
          </table>
          <p class="small" style="margin:0">${mdd < 0 ? `最大回撤發生在第 ${mp + 1} 個值（前高 ${fmtN(v[mp], 2)}）到第 ${mt + 1} 個值（谷底 ${fmtN(v[mt], 2)}）。要回到前高需要上漲 ${((1 / (1 + mdd) - 1) * 100).toFixed(1)}%。` : '序列沒有下跌，最大回撤為 0。'}</p>`;
      };
      root.addEventListener('input', run); run();
    }
    if (id === 'compound') {
      const run = () => {
        const m = +$('#cpM', root).value, r = +$('#cpR', root).value / 100, y = Math.min(60, Math.max(1, Math.round(+$('#cpY', root).value)));
        const mr = Math.pow(1 + r, 1 / 12) - 1; let bal = 0; const rows = [];
        for (let k = 1; k <= y * 12; k++) { bal = bal * (1 + mr) + m; if (k % 12 === 0 && (k / 12 === y || (k / 12) % 5 === 0)) rows.push([k / 12, m * k, bal]); }
        $('#cpOut', root).innerHTML = `
          <table class="tbl" style="margin:6px 0 12px">
            <tr><th>第幾年</th><th style="text-align:right">投入本金</th><th style="text-align:right">資產</th><th style="text-align:right">累積報酬</th></tr>
            ${rows.map(([yy, p, b]) => `<tr><td>${yy}</td><td class="num" style="text-align:right">${money(p)}</td><td class="num" style="text-align:right">${money(b)}</td><td class="num" style="text-align:right">${money(b - p)}</td></tr>`).join('')}
          </table>
          <p class="small" style="margin:0">${r > 0 ? `72 法則：年報酬 ${(r * 100).toFixed(1)}% 時，資產約 ${(72 / (r * 100)).toFixed(1)} 年翻倍。` : ''}試算假設每月月底投入、報酬率固定，實際報酬每年波動，可能為負。</p>`;
      };
      root.addEventListener('input', run); run();
    }
    if (id === 'softmax') {
      const words = [['好', 3.0], ['熱', 2.4], ['冷', 1.8], ['藍', 0.6], ['貴', -0.5]];
      const t = $('#smT', root);
      const run = () => {
        const T = +t.value; $('#smTV', root).textContent = T.toFixed(1);
        const e = words.map(([, z]) => Math.exp(z / T)), sum = e.reduce((a, b) => a + b, 0);
        $('#smOut', root).innerHTML = `<table class="tbl">${words.map(([w, z], i) => { const p = e[i] / sum; return `<tr><td style="width:2.5em"><b>${w}</b></td><td class="mono small" style="width:5em">${z.toFixed(1)}</td><td><div class="bar" style="height:10px"><span style="width:${(p * 100).toFixed(1)}%"></span></div></td><td class="num" style="width:4.5em;text-align:right">${(p * 100).toFixed(1)}%</td></tr>`; }).join('')}</table>`;
      };
      t.addEventListener('input', run); run();
    }
    if (id === 'nines') {
      const a = $('#nA', root);
      const dur = h => h >= 24 ? `${fmtN(h / 24, 2)} 天` : h >= 1 ? `${fmtN(h, 2)} 小時` : h * 60 >= 1 ? `${fmtN(h * 60, 1)} 分鐘` : `${fmtN(h * 3600, 1)} 秒`;
      const run = () => {
        const A = Math.min(100, Math.max(0, +a.value)) / 100, down = 1 - A;
        $('#nOut', root).innerHTML = `<table class="tbl"><tr><th>期間</th><th style="text-align:right">最多可停機</th></tr>
          <tr><td>每年（8,760 小時）</td><td class="num" style="text-align:right">${dur(down * 8760)}</td></tr>
          <tr><td>每月（730 小時）</td><td class="num" style="text-align:right">${dur(down * 730)}</td></tr>
          <tr><td>每週（168 小時）</td><td class="num" style="text-align:right">${dur(down * 168)}</td></tr></table>`;
        const n = Math.max(1, Math.round(+$('#nS', root).value)), p = Math.max(1, Math.round(+$('#nP', root).value));
        const ser = Math.pow(A, n), par = 1 - Math.pow(down, p), both = 1 - Math.pow(1 - ser, p);
        $('#nOut2', root).innerHTML = `<table class="tbl" style="margin-top:4px"><tr><th>架構</th><th>公式</th><th style="text-align:right">整體可用性</th></tr>
          <tr><td>${n} 個元件串聯</td><td class="mono small">A<sup>${n}</sup></td><td class="num" style="text-align:right">${fmtN(ser * 100, 4)}%</td></tr>
          <tr><td>${p} 份並聯備援</td><td class="mono small">1 − (1 − A)<sup>${p}</sup></td><td class="num" style="text-align:right">${fmtN(par * 100, 6)}%</td></tr>
          <tr><td>串聯整組再做 ${p} 份備援</td><td class="mono small">1 − (1 − A<sup>${n}</sup>)<sup>${p}</sup></td><td class="num" style="text-align:right"><b>${fmtN(both * 100, 6)}%</b></td></tr></table>
          <p class="small muted" style="margin:8px 0 0">串聯越多元件，整體可用性越低；把整組架構複製到多個可用區域（並聯），可用性大幅提高。這就是「多 AZ 部署」的數學原理。</p>`;
      };
      tabsSelect(root, (tabs, v) => { a.value = v; run(); });
      root.addEventListener('input', e => { if (e.target === a) root.querySelectorAll('#nPick button').forEach(b => b.classList.toggle('on', b.dataset.v === a.value)); run(); });
      run();
    }
    if (id === 'cidr') {
      const ip2n = s => s.split('.').reduce((n, x) => n * 256 + (+x), 0);
      const n2ip = n => [24, 16, 8, 0].map(b => Math.floor(n / Math.pow(2, b)) % 256).join('.');
      const run = () => {
        const out = $('#cOut', root);
        const m = /^\s*(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})\s*$/.exec($('#cVpc', root).value);
        const sub = Math.round(+$('#cSub', root).value);
        if (!m || m.slice(1, 5).some(x => +x > 255)) { out.innerHTML = '<p class="small" style="color:var(--bad)">請輸入正確格式，例如 10.0.0.0/16</p>'; return; }
        const pre = +m[5];
        if (pre < 16 || pre > 28) { out.innerHTML = '<p class="small" style="color:var(--bad)">AWS VPC 的 CIDR 區塊必須介於 /16 與 /28 之間。</p>'; return; }
        if (!(sub >= pre && sub <= 28)) { out.innerHTML = `<p class="small" style="color:var(--bad)">子網路遮罩須介於 /${pre} 與 /28 之間（不可比 VPC 大，也不可小於 /28）。</p>`; return; }
        const size = Math.pow(2, 32 - pre), base = Math.floor(ip2n(m.slice(1, 5).join('.')) / size) * size;
        const ssize = Math.pow(2, 32 - sub), count = size / ssize;
        const priv = (base >= ip2n('10.0.0.0') && base < ip2n('11.0.0.0')) || (base >= ip2n('172.16.0.0') && base < ip2n('172.32.0.0')) || (base >= ip2n('192.168.0.0') && base < ip2n('192.169.0.0'));
        const rows = Array.from({ length: Math.min(count, 6) }, (_, i) => { const b = base + i * ssize; return `<tr><td class="mono small">${n2ip(b)}/${sub}</td><td class="mono small">${n2ip(b + 4)} – ${n2ip(b + ssize - 2)}</td></tr>`; }).join('');
        out.innerHTML = `<table class="tbl" style="margin-top:4px">
          <tr><td>VPC 網段</td><td class="mono">${n2ip(base)}/${pre}${n2ip(base) !== m.slice(1, 5).join('.') ? '<span class="tiny muted">（已對齊網段起點）</span>' : ''}</td></tr>
          <tr><td>VPC 總 IP 數</td><td class="num">${size.toLocaleString()}</td></tr>
          <tr><td>可切出子網路</td><td class="num">${count.toLocaleString()} 個 /${sub}</td></tr>
          <tr><td>每個子網路可用 IP</td><td class="num"><b>${(ssize - 5).toLocaleString()}</b> <span class="tiny muted">= ${ssize} − 5（AWS 保留）</span></td></tr></table>
          ${priv ? '' : '<div class="box warn"><b class="t">提醒</b>建議使用 RFC 1918 私有位址（10.0.0.0/8、172.16.0.0/12、192.168.0.0/16）。</div>'}
          <table class="tbl"><tr><th>子網路</th><th>可指派範圍</th></tr>${rows}${count > 6 ? `<tr><td colspan="2" class="small muted">……其餘 ${(count - 6).toLocaleString()} 個子網路</td></tr>` : ''}</table>
          <p class="small muted" style="margin:8px 0 0">每個子網路保留前 4 個與最後 1 個位址：網路位址、VPC 路由器、DNS、保留未來使用，以及廣播位址。</p>`;
      };
      root.addEventListener('input', run); run();
    }
    if (id === 'pricing') {
      const run = () => {
        const h = +$('#prH', root).value, u = +$('#prU', root).value, r = +$('#prR', root).value / 100, sp = +$('#prS', root).value / 100;
        const od = h * u, commit = h * (1 - r) * 730, spot = h * (1 - sp) * u;
        const usd = x => 'US$ ' + x.toFixed(2);
        const rows = [['隨需 On-Demand', od, '依實際用量計費，無承諾'], ['Savings Plans／RI（1 或 3 年承諾）', commit, '承諾整月用量，不論實際是否使用'], ['Spot 執行個體', spot, '可能被 AWS 以 2 分鐘通知中斷']];
        const best = u > 0 && commit < od ? '用量穩定時，承諾用量的 Savings Plans／RI 比隨需便宜。' : '使用時數偏低時，承諾方案按整月計費反而比隨需貴，隨需較划算。';
        $('#prOut', root).innerHTML = `<table class="tbl"><tr><th>計價模式</th><th style="text-align:right">每月費用</th></tr>${rows.map(([n, c, d]) => `<tr><td>${n}<div class="tiny muted">${d}</div></td><td class="num" style="text-align:right">${usd(c)}</td></tr>`).join('')}</table>
          <div class="box memo"><b class="t">判斷</b>${best}損益兩平約在每月 ${Math.round(730 * (1 - r))} 小時。可中斷、具彈性的批次工作才適合 Spot。</div>`;
      };
      root.addEventListener('input', run); run();
    }
    if (id === 's3class') {
      const v = { s3F: 'hot', s3R: 'ms', s3Z: 'multi' };
      const C = {
        std: ['S3 Standard', '經常存取的資料，毫秒存取、至少 3 個 AZ，無最短計費天數與取回費。'],
        it: ['S3 Intelligent-Tiering', '存取模式未知或會變動。自動在不同存取層之間搬移，不收取回費，只收少量監控費。'],
        ia: ['S3 Standard-IA', '不常存取但需要立即取回，例如備份。最短計費 30 天，取回另計費。'],
        oz: ['S3 One Zone-IA', '不常存取、可重新產生的資料（例如縮圖、次要備份副本）。只存在單一 AZ，比 Standard-IA 便宜約兩成，最短計費 30 天。'],
        oze: ['S3 Express One Zone', '需要個位數毫秒延遲的高頻存取（例如 ML 訓練、分析暫存），只存在單一 AZ。'],
        gir: ['S3 Glacier Instant Retrieval', '一季存取一次左右、但取回時要毫秒回應的封存資料，例如醫療影像。最短計費 90 天。'],
        gfr: ['S3 Glacier Flexible Retrieval', '封存資料，可接受數分鐘到數小時取回（加速 1–5 分鐘、標準 3–5 小時、大量 5–12 小時）。最短計費 90 天。'],
        gda: ['S3 Glacier Deep Archive', '最便宜的類別，適合法規長期保存。標準取回 12 小時內、大量取回 48 小時內。最短計費 180 天。']
      };
      const pick = () => {
        const { s3F: f, s3R: r, s3Z: z } = v;
        if (f === 'unknown') return ['it'];
        if (f === 'hot') return z === 'one' ? ['oze', 'std'] : ['std'];
        if (f === 'ia') return z === 'one' ? ['oz'] : r === 'ms' ? ['ia'] : ['ia', 'gir'];
        if (f === 'arch') return r === 'ms' ? ['gir'] : ['gfr'];
        return r === 'day' ? ['gda'] : r === 'min' ? ['gfr'] : ['gir'];
      };
      const run = () => {
        const [main, ...alt] = pick();
        $('#s3Out', root).innerHTML = `<div class="box memo"><b class="t">建議：${C[main][0]}</b>${C[main][1]}</div>${alt.map(k => `<p class="small" style="margin:0"><b>也可考慮 ${C[k][0]}</b>：${C[k][1]}</p>`).join('')}
          <p class="small muted" style="margin:8px 0 0">可搭配<b>生命週期規則（Lifecycle）</b>依物件存在天數自動轉移到更便宜的類別，或到期刪除。</p>`;
      };
      tabsSelect(root, (tabs, val) => { v[tabs.id] = val; run(); });
      run();
    }
    if (id === 'slice') {
      const run = () => {
        const items = $('#slList', root).value.split(',').map(x => x.trim()).filter(x => x !== '');
        const n = items.length, rd = el => { const v = $(el, root).value.trim(); return v === '' ? null : Number(v); };
        let [a, b, c] = [rd('#slA'), rd('#slB'), rd('#slC')];
        const out = $('#slOut', root);
        if ([a, b, c].some(v => v !== null && !Number.isInteger(v))) { out.innerHTML = '<p class="small" style="color:var(--bad)">請輸入整數或留空。</p>'; return; }
        if (c === 0) { out.innerHTML = '<p class="small" style="color:var(--bad)">ValueError: slice step cannot be zero（間隔不能是 0）</p>'; return; }
        const step = c === null ? 1 : c;
        // 依 Python 規則換算實際的起點與終點
        const norm = (v, def) => { if (v === null) return def; if (v < 0) v += n; return step > 0 ? Math.min(Math.max(v, 0), n) : Math.min(Math.max(v, -1), n - 1); };
        const start = norm(a, step > 0 ? 0 : n - 1), stop = norm(b, step > 0 ? n : -1);
        const idx = []; for (let i = start; step > 0 ? i < stop : i > stop; i += step) idx.push(i);
        const expr = `a[${a ?? ''}:${b ?? ''}${c === null ? '' : ':' + c}]`;
        out.innerHTML = `<div class="slice-cells">${items.map((x, i) => `<div class="${idx.includes(i) ? 'on' : ''}">${esc(x)}<small>${i} / ${i - n}</small></div>`).join('')}</div>
          <div class="out">${esc(expr)}  →  [${idx.map(i => `'${esc(items[i])}'`).join(', ')}]</div>
          <p class="small muted" style="margin:8px 0 0">格子下方是正索引／負索引。實際從索引 ${start} 開始，${step > 0 ? '往右' : '往左'}每次跳 ${Math.abs(step)} 格，<b>不包含</b>終點 ${stop < 0 ? '（開頭之前）' : stop}。${step < 0 ? '間隔為負數時是倒著取，起點要比終點大。' : ''}</p>`;
      };
      tabsSelect(root, (tabs, v) => { const [x, y, z] = v.split(','); $('#slA', root).value = x; $('#slB', root).value = y; $('#slC', root).value = z; run(); });
      root.addEventListener('input', run); run();
    }
    if (id === 'trace') {
      const P = {
        sum: { code: 'total = 0\nfor i in range(1, 6):\n    total = total + i\nprint(total)', vars: ['i', 'total'], steps: (() => { const s = [{ line: 1, v: { total: 0 }, note: '先把 total 設為 0，作為累加的起點' }]; let t = 0; for (let i = 1; i <= 5; i++) { s.push({ line: 2, v: { i, total: t }, note: `第 ${i} 輪：i 取到 ${i}` }); t += i; s.push({ line: 3, v: { i, total: t }, note: `total = ${t - i} + ${i} = ${t}` }); } s.push({ line: 4, v: { i: 5, total: t }, note: 'range(1, 6) 不含 6，迴圈結束，印出 15' }); return s; })() },
        max: { code: 'nums = [3, 8, 2, 9, 5]\nbig = nums[0]\nfor n in nums:\n    if n > big:\n        big = n\nprint(big)', vars: ['n', 'big'], steps: (() => { const a = [3, 8, 2, 9, 5]; let b = a[0]; const s = [{ line: 2, v: { big: b }, note: '先假設第一個數字最大' }]; for (const n of a) { s.push({ line: 4, v: { n, big: b }, note: `比較 ${n} > ${b}？${n > b ? '是' : '否'}` }); if (n > b) { b = n; s.push({ line: 5, v: { n, big: b }, note: `更新 big = ${b}` }); } } s.push({ line: 6, v: { n: 5, big: b }, note: `印出最大值 ${b}` }); return s; })() },
        count: { code: 'scores = [72, 45, 90, 58, 66]\npassed = 0\nfor s in scores:\n    if s >= 60:\n        passed += 1\nprint(passed, "人及格")', vars: ['s', 'passed'], steps: (() => { const a = [72, 45, 90, 58, 66]; let p = 0; const s = [{ line: 2, v: { passed: 0 }, note: '計數器從 0 開始' }]; for (const x of a) { s.push({ line: 4, v: { s: x, passed: p }, note: `${x} >= 60？${x >= 60 ? '是' : '否'}` }); if (x >= 60) { p++; s.push({ line: 5, v: { s: x, passed: p }, note: `passed 加 1，變成 ${p}` }); } } s.push({ line: 6, v: { s: 66, passed: p }, note: `共 ${p} 人及格` }); return s; })() },
        while: { code: 'money = 0\nmonth = 0\nwhile money < 10000:\n    money += 3000\n    month += 1\nprint(month, "個月後存到", money)', vars: ['money', 'month'], steps: (() => { let m = 0, k = 0; const s = [{ line: 2, v: { money: 0, month: 0 }, note: '從 0 元、第 0 個月開始' }]; while (true) { s.push({ line: 3, v: { money: m, month: k }, note: `檢查 ${m} < 10000？${m < 10000 ? '是，繼續' : '否，離開迴圈'}` }); if (m >= 10000) break; m += 3000; k++; s.push({ line: 5, v: { money: m, month: k }, note: `存 3000 元：第 ${k} 個月共 ${m} 元` }); } s.push({ line: 6, v: { money: m, month: k }, note: `${k} 個月後存到 ${m} 元` }); return s; })() }
      };
      let cur = P.sum, k = 0;
      const draw = () => {
        const st = cur.steps[k];
        $('#trCode', root).innerHTML = cur.code.split('\n').map((l, i) => `<span style="display:block;${i + 1 === st.line ? 'background:var(--accent-soft);font-weight:600' : ''}">${String(i + 1).padStart(2)}  ${esc(l)}</span>`).join('');
        $('#trStep', root).textContent = `第 ${k + 1} / ${cur.steps.length} 步`;
        $('#trOut', root).innerHTML = `<table class="tbl"><tr>${cur.vars.map(v => `<th class="mono">${v}</th>`).join('')}<th>說明</th></tr><tr>${cur.vars.map(v => `<td class="num">${st.v[v] ?? '—'}</td>`).join('')}<td class="small">${esc(st.note)}</td></tr></table>`;
        $('#trPrev', root).disabled = k === 0; $('#trNext', root).disabled = k === cur.steps.length - 1;
      };
      root.addEventListener('click', e => {
        if (e.target.id === 'trNext' && k < cur.steps.length - 1) k++;
        else if (e.target.id === 'trPrev' && k > 0) k--;
        else if (e.target.id === 'trReset') k = 0;
        else return;
        draw();
      });
      tabsSelect(root, (tabs, v) => { cur = P[v]; k = 0; draw(); });
      draw();
    }
    if (id === 'pyerr') {
      const E = [
        ['SyntaxError', '語法錯誤，Python 看不懂這行程式', '少了冒號、括號或引號沒成對、使用全形符號（，：（））、關鍵字拼錯', 'if x > 3\n    print(x)', 'if x > 3:\n    print(x)'],
        ['IndentationError', '縮排錯誤', '冒號後的程式區塊沒有縮排、同一區塊縮排不一致、混用 Tab 與空白', 'for i in range(3):\nprint(i)', 'for i in range(3):\n    print(i)'],
        ['NameError', '使用了不存在的名稱', '變數還沒指定就使用、拼字或大小寫不同、字串忘了加引號', 'print(Name)', "name = '小明'\nprint(name)"],
        ['TypeError', '型別不對，這個運算不支援這種資料', '字串和數字直接相加、呼叫函式時參數數量不對、對 None 做運算', "age = 18\nprint('我今年' + age + '歲')", "age = 18\nprint('我今年' + str(age) + '歲')\nprint(f'我今年{age}歲')"],
        ['ValueError', '型別正確但內容不合法', 'int() 轉換非數字字串、拆解時數量不符', "n = int('12.5')", "n = int(float('12.5'))"],
        ['IndexError', '索引超出範圍', '索引從 0 開始，長度 n 的串列最大索引是 n-1；對空串列取值', 'a = [1, 2, 3]\nprint(a[3])', 'a = [1, 2, 3]\nprint(a[2])   # 或 a[-1]'],
        ['KeyError', '字典中沒有這個鍵', '鍵拼錯、大小寫不同、資料中本來就沒有', "d = {'name': '小明'}\nprint(d['age'])", "d = {'name': '小明'}\nprint(d.get('age', '未填'))"],
        ['AttributeError', '這個物件沒有這個屬性或方法', '方法名稱拼錯、變數其實是 None、把串列方法用在字串上', "s = 'hello'\ns.append('!')", "s = 'hello'\ns = s + '!'"],
        ['ZeroDivisionError', '除以零', '除數是 0，例如平均時資料筆數為 0', 'avg = total / count', 'avg = total / count if count else 0'],
        ['ModuleNotFoundError', '找不到模組', '套件沒安裝（用 pip install）、模組名稱拼錯、虛擬環境沒有啟用', 'import pandsa', 'import pandas as pd'],
        ['FileNotFoundError', '找不到檔案', '路徑或檔名錯誤、目前工作目錄不是你以為的位置', "open('data.csv')", "from pathlib import Path\nprint(Path.cwd())  # 先確認目前目錄"],
        ['UnicodeDecodeError', '讀檔時編碼不符', 'Windows Excel 存的 CSV 常是 Big5 或含 BOM 的 UTF-8', "open('a.csv', encoding='utf-8')", "open('a.csv', encoding='utf-8-sig')  # 或 'cp950'"],
        ['RecursionError', '遞迴太深', '遞迴函式沒有終止條件或永遠到不了終止條件', 'def f(n):\n    return f(n - 1)', 'def f(n):\n    if n == 0:\n        return 0\n    return f(n - 1)'],
        ['UnboundLocalError', '在函式內使用區域變數前還沒指定值', '函式內修改外部變數卻沒有宣告，Python 視為區域變數', 'count = 0\ndef add():\n    count += 1', 'count = 0\ndef add():\n    global count\n    count += 1']
      ];
      const pick = $('#pePick', root);
      pick.innerHTML = E.map(e => `<button type="button" data-v="${e[0]}">${e[0]}</button>`).join('');
      const show = name => {
        const e = E.find(x => x[0] === name);
        $('#peOut', root).innerHTML = e ? `<h3 class="mono" style="margin:4px 0">${e[0]}</h3><p style="margin:0 0 6px">${esc(e[1])}</p>
          <p class="small muted" style="margin:0 0 8px">常見原因：${esc(e[2])}</p>
          <div class="grid g2" style="gap:10px"><div><div class="tiny muted">錯誤寫法</div><pre class="out" style="color:var(--bad);white-space:pre;word-break:normal;overflow-x:auto">${esc(e[3])}</pre></div><div><div class="tiny muted">修正寫法</div><pre class="out" style="color:var(--ok);white-space:pre;word-break:normal;overflow-x:auto">${esc(e[4])}</pre></div></div>`
          : '<p class="small muted">找不到對應的錯誤，請點選上方常見錯誤，或確認錯誤訊息最後一行的錯誤名稱。</p>';
        pick.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === name));
      };
      tabsSelect(root, (tabs, v) => { $('#peIn', root).value = v; show(v); });
      $('#peIn', root).addEventListener('input', e => { const m = /([A-Za-z]+(Error|Exception))/.exec(e.target.value); show(m ? m[1] : ''); });
      $('#peIn', root).addEventListener('keydown', e => e.stopPropagation());
      show('TypeError');
    }
    if (id === 'chunk') {
      const run = () => {
        const text = $('#ckText', root).value.replace(/\s+/g, ''), size = +$('#ckSize', root).value;
        let over = +$('#ckOver', root).value; if (over >= size) over = size - 10;
        $('#ckSizeV', root).textContent = size; $('#ckOverV', root).textContent = over;
        const chunks = []; for (let i = 0; i < text.length; i += size - over) { chunks.push([i, Math.min(i + size, text.length)]); if (i + size >= text.length) break; }
        $('#ckOut', root).innerHTML = `<p class="small" style="margin:6px 0">全文 <b class="num">${text.length}</b> 字，切成 <b class="num">${chunks.length}</b> 塊（深色字為與前一塊重疊的部分）</p>` +
          chunks.map(([a, b], k) => { const ov = k ? Math.min(over, b - a) : 0; return `<div class="out" style="margin-bottom:6px"><span class="tiny muted">#${k + 1}　${a + 1}～${b} 字</span>\n<b style="color:var(--accent)">${esc(text.slice(a, a + ov))}</b>${esc(text.slice(a + ov, b))}</div>`; }).join('') +
          `<p class="small muted" style="margin:6px 0 0">切太小：一塊裝不下完整規定，檢索到也看不懂；切太大：混進不相關內容、占用更多 token。重疊可以避免一句話剛好被切斷。實務上常依標題、段落切，再限制最大長度。</p>`;
      };
      root.addEventListener('input', run); run();
    }
    if (id === 'retrieve') {
      const DOCS = [
        ['請假規定', '病假三日以內免附證明，超過三日須檢附醫療證明。特休假須於三日前在系統提出申請。'],
        ['出差規定', '國內出差住宿費每日上限二千元，交通以大眾運輸為原則，搭乘計程車須說明理由。'],
        ['加班規定', '加班須事先申請，未經核准之加班不予計算，平日加班依勞基法加給工資。'],
        ['帳號密碼', '忘記系統密碼請至登入頁點選忘記密碼，以公司信箱重設，或聯絡資訊部分機 1234。'],
        ['報帳流程', '費用報銷請於支出後三十日內在系統上傳發票或收據，經主管與財務部核准後撥款。'],
        ['資安規範', '禁止將公司資料上傳至未經核准的雲端服務，可疑郵件請轉寄資安信箱。']
      ];
      const grams = t => { t = t.replace(/[^一-鿿A-Za-z0-9]/g, ''); const g = []; for (let i = 0; i < t.length - 1; i++) g.push(t.slice(i, i + 2)); return g; };
      const docG = DOCS.map(d => grams(d[0] + d[1]));
      const df = {}; docG.forEach(g => new Set(g).forEach(x => df[x] = (df[x] || 0) + 1));
      const vec = g => { const v = {}; g.forEach(x => v[x] = (v[x] || 0) + 1); for (const k in v) v[k] *= Math.log((DOCS.length + 1) / ((df[k] || 0) + 1)) + 1; return v; };
      const cos = (a, b) => { let d = 0, na = 0, nb = 0; for (const k in a) { na += a[k] ** 2; if (b[k]) d += a[k] * b[k]; } for (const k in b) nb += b[k] ** 2; return na && nb ? d / Math.sqrt(na * nb) : 0; };
      const dv = docG.map(vec);
      const run = () => {
        const qg = grams($('#rtQ', root).value), qv = vec(qg);
        const ranked = DOCS.map((d, i) => ({ d, s: cos(qv, dv[i]), hit: [...new Set(qg)].filter(x => docG[i].includes(x)) })).sort((a, b) => b.s - a.s);
        const top = ranked[0];
        $('#rtOut', root).innerHTML = `<table class="tbl"><tr><th>排名</th><th>段落</th><th style="text-align:right">相似度</th></tr>${ranked.map((r, i) => `<tr style="${i < 2 && r.s > 0.05 ? 'background:var(--accent-soft)' : ''}"><td class="num">${i + 1}</td><td><b>${r.d[0]}</b><div class="tiny muted">${esc(r.d[1])}</div>${r.hit.length ? `<div class="tiny">命中詞：${r.hit.slice(0, 8).join('、')}</div>` : ''}</td><td class="num" style="text-align:right">${r.s.toFixed(3)}</td></tr>`).join('')}</table>
          <div class="box ${top.s > 0.05 ? 'memo' : 'warn'}"><b class="t">${top.s > 0.05 ? '送給 AI 的參考資料' : '找不到相關段落'}</b>${top.s > 0.05 ? `排名前 2 的段落（底色標示）會連同問題一起送給模型，模型依據這些內容回答並註明出處。` : '相似度都很低，代表資料庫沒有答案。好的 RAG 系統應讓 AI 回答「資料中沒有相關資訊」，而不是自己編造。'}</div>
          <p class="small muted" style="margin:6px 0 0">這裡用「兩字一組的關鍵字」計算相似度，只能比對字面。實務上會用嵌入模型（Embedding）把文字轉成向量，即使用詞不同（例如「生病請假」與「病假」）也能找到。</p>`;
      };
      tabsSelect(root, (tabs, v) => { $('#rtQ', root).value = v; run(); });
      $('#rtQ', root).addEventListener('input', run);
      $('#rtQ', root).addEventListener('keydown', e => e.stopPropagation());
      run();
    }
    if (id === 'llmcost') {
      const run = () => {
        const pi = +$('#lcIn', root).value, po = +$('#lcOut', root).value, ti = +$('#lcTi', root).value, to = +$('#lcTo', root).value;
        const n = +$('#lcN', root).value, cache = Math.min(100, Math.max(0, +$('#lcCache', root).value)) / 100, fx = +$('#lcFx', root).value;
        const base = n * (ti * pi + to * po) / 1e6;
        const cached = n * (ti * (1 - cache) * pi + ti * cache * pi * 0.1 + to * po) / 1e6;
        const batch = base / 2;
        const usd = x => 'US$ ' + x.toLocaleString(undefined, { maximumFractionDigits: 2 });
        const twd = x => 'NT$ ' + Math.round(x * fx).toLocaleString();
        $('#lcOutBox', root).innerHTML = `<table class="tbl"><tr><th>方案</th><th style="text-align:right">每月（美元）</th><th style="text-align:right">約新台幣</th></tr>
          <tr><td>標準請求</td><td class="num" style="text-align:right">${usd(base)}</td><td class="num" style="text-align:right">${twd(base)}</td></tr>
          <tr><td>使用提示快取<div class="tiny muted">重複的系統提示、文件放在前面並快取</div></td><td class="num" style="text-align:right">${usd(cached)}</td><td class="num" style="text-align:right">${twd(cached)}</td></tr>
          <tr><td>批次處理 Batch API<div class="tiny muted">不需即時回應的大量工作</div></td><td class="num" style="text-align:right">${usd(batch)}</td><td class="num" style="text-align:right">${twd(batch)}</td></tr></table>
          <p class="small muted" style="margin:8px 0 0">每次請求約 ${usd((ti * pi + to * po) / 1e6)}。輸出單價通常是輸入的數倍，限制回答長度、要求精簡格式也能明顯省錢。</p>`;
      };
      tabsSelect(root, (tabs, v) => { const [a, b] = v.split(','); $('#lcIn', root).value = a; $('#lcOut', root).value = b; run(); });
      root.addEventListener('input', run); run();
    }
    if (id === 'dockercache') {
      const D = {
        good: [['FROM python:3.12-slim', 'base', 8], ['WORKDIR /app', '', 0.1], ['COPY requirements.txt .', 'req', 0.2], ['RUN pip install -r requirements.txt', '', 60], ['COPY . .', 'code', 0.5], ['CMD ["python", "app.py"]', '', 0.1]],
        bad: [['FROM python:3.12-slim', 'base', 8], ['WORKDIR /app', '', 0.1], ['COPY . .', 'code req', 0.5], ['RUN pip install -r requirements.txt', '', 60], ['CMD ["python", "app.py"]', '', 0.1]]
      };
      let order = 'good', change = 'code';
      const run = () => {
        const L = D[order]; const first = L.findIndex(l => l[1].split(' ').includes(change));
        let t = 0;
        $('#dcOut', root).innerHTML = `<table class="tbl"><tr><th>#</th><th>Dockerfile 指令</th><th>結果</th></tr>${L.map((l, i) => { const re = i >= first; if (re) t += l[2]; return `<tr><td class="num">${i + 1}</td><td class="mono small">${esc(l[0])}</td><td>${re ? `<span class="tag bad">重新建置</span> <span class="tiny muted">${l[2]} 秒</span>` : '<span class="tag ok">使用快取</span>'}</td></tr>`; }).join('')}</table>
          <div class="box ${t > 30 ? 'warn' : 'memo'}"><b class="t">建置約 ${t.toFixed(1)} 秒</b>Docker 由上往下比對每一層，某一層的輸入改變後，<b>它和之後的所有層</b>都要重新建置。${order === 'bad' && change === 'code' ? '先 COPY 全部程式碼，只改一行程式也會讓 pip install 重跑。' : order === 'good' && change === 'code' ? '套件安裝在程式碼之前，只改程式碼時套件層直接用快取。' : '改變套件清單或基底映像，後面的層一定要重建，這是正常的。'}</div>`;
      };
      tabsSelect(root, (tabs, v) => { if (tabs.id === 'dcOrder') order = v; else change = v; run(); });
      run();
    }
    if (id === 'gitcmd') {
      const G = [
        ['改了檔案但還沒 add，想放棄修改', 'git restore 檔名', '修改會直接消失，無法復原。'],
        ['已經 add，想取消暫存（保留修改）', 'git restore --staged 檔名', '只是移出暫存區，檔案內容不變。'],
        ['剛 commit 完發現訊息打錯或漏了檔案', 'git add 漏掉的檔案\ngit commit --amend', '只在還沒 push 前使用；已 push 的提交不要 amend。'],
        ['撤銷一個「已經 push」的提交', 'git revert 提交編號', '產生一個反向的新提交，不改寫歷史，多人協作時的安全做法。'],
        ['本機提交都不要了，回到某個版本', 'git reset --hard 提交編號', '危險：之後的提交與未提交修改都會消失。先確認或建立備份分支。'],
        ['建立新分支並切換過去', 'git switch -c feature/login', '舊寫法：git checkout -b feature/login。'],
        ['把 feature 分支合併回 main', 'git switch main\ngit pull\ngit merge feature/login', '團隊通常改用 Pull Request 在 GitHub 上合併並審查。'],
        ['合併時出現衝突（conflict）', '打開衝突檔案，處理 <<<<<<< ======= >>>>>>> 標記\ngit add 檔名\ngit commit', '想放棄這次合併：git merge --abort。'],
        ['手上的修改還沒完成，臨時要切換分支', 'git stash\ngit switch 其他分支\n（處理完回來）git stash pop', 'stash 把修改暫存起來，pop 取回。'],
        ['下載遠端儲存庫', 'git clone https://github.com/帳號/專案.git', '會自動設定遠端名稱 origin。'],
        ['把本機分支推上 GitHub（第一次）', 'git push -u origin 分支名稱', '-u 設定追蹤，之後只要 git push。'],
        ['取得遠端最新的變更', 'git pull', '等於 git fetch + git merge；只想查看不合併用 git fetch。'],
        ['看提交歷史', 'git log --oneline --graph --all', '圖形化顯示所有分支。'],
        ['看改了哪些內容', 'git diff（未暫存）\ngit diff --staged（已暫存）', '提交前檢查一次，避免把除錯程式碼提交出去。'],
        ['不小心把 .env 提交上去', 'git rm --cached .env\n把 .env 加入 .gitignore\ngit commit', '已 push 的密碼要視為外洩，立刻到服務後台更換。'],
        ['替發布版本打標籤', 'git tag -a v1.2.0 -m "說明"\ngit push origin v1.2.0', '標籤常搭配語意化版本號。']
      ];
      const run = () => {
        const q = $('#gcQ', root).value.trim();
        const list = G.filter(g => !q || (g[0] + g[1] + g[2]).includes(q));
        $('#gcOut', root).innerHTML = list.length ? list.map(g => `<div style="border-bottom:1px solid var(--line);padding:10px 0"><b>${esc(g[0])}</b><pre class="out" style="margin:6px 0;white-space:pre">${esc(g[1])}</pre><div class="tiny muted">${esc(g[2])}</div></div>`).join('') : '<p class="small muted">沒有符合的情境，試試「撤銷」「分支」「遠端」。</p>';
      };
      $('#gcQ', root).addEventListener('input', run);
      $('#gcQ', root).addEventListener('keydown', e => e.stopPropagation());
      run();
    }
    if (id === 'semver') {
      let type = 'patch';
      const parse = v => { const m = /^\s*v?(\d+)\.(\d+)\.(\d+)\s*$/.exec(v); return m ? m.slice(1).map(Number) : null; };
      const allow = (r, v) => {
        const m = /^\s*([\^~]?)(\d+)\.(\d+)\.(\d+)\s*$/.exec(r); if (!m) return null;
        const [op, a, b, c] = [m[1], +m[2], +m[3], +m[4]];
        const ge = v[0] > a || (v[0] === a && (v[1] > b || (v[1] === b && v[2] >= c)));
        if (op === '') return v[0] === a && v[1] === b && v[2] === c;
        if (op === '~') return ge && v[0] === a && v[1] === b;
        return ge && (a > 0 ? v[0] === a : b > 0 ? v[0] === 0 && v[1] === b : v[0] === 0 && v[1] === 0 && v[2] === c);
      };
      const run = () => {
        const v = parse($('#svV', root).value), out = $('#svOut', root);
        if (!v) { out.innerHTML = '<p class="small" style="color:var(--bad)">請輸入 主版號.次版號.修訂號，例如 1.4.2</p>'; return; }
        const n = type === 'major' ? [v[0] + 1, 0, 0] : type === 'minor' ? [v[0], v[1] + 1, 0] : [v[0], v[1], v[2] + 1];
        const ok = allow($('#svR', root).value, n);
        out.innerHTML = `<div class="out">${v.join('.')}  →  <b>${n.join('.')}</b></div>
          <p class="small" style="margin:8px 0">${type === 'major' ? '破壞性變更：主版號加 1，次版號與修訂號歸零。使用者升級前要看變更說明。' : type === 'minor' ? '新增向下相容的功能：次版號加 1，修訂號歸零。' : '只修正錯誤：修訂號加 1。'}</p>
          ${ok === null ? '<p class="small muted">範圍寫法支援 1.4.2、~1.4.2、^1.4.2。</p>' : `<div class="box ${ok ? 'memo' : 'warn'}"><b class="t">${ok ? '範圍允許升級' : '範圍不允許升級'}</b>相依範圍 <code>${esc($('#svR', root).value.trim())}</code> ${ok ? '包含' : '不包含'} ${n.join('.')}。^ 允許次版與修訂更新（不跨主版號）；~ 只允許修訂更新。</div>`}`;
      };
      tabsSelect(root, (tabs, v) => { type = v; run(); });
      root.addEventListener('input', run); run();
    }
    if (id === 'binary') {
      const run = () => {
        const out = $('#bnOut', root), parts = $('#bnIp', root).value.trim().split('.').map(Number), pre = Math.round(+$('#bnPre', root).value);
        if (parts.length !== 4 || parts.some(x => !Number.isInteger(x) || x < 0 || x > 255) || !(pre >= 0 && pre <= 32)) { out.innerHTML = '<p class="small" style="color:var(--bad)">請輸入正確的 IPv4 位址（例如 192.168.10.37）與 0～32 的前綴長度。</p>'; return; }
        const bin = parts.map(x => x.toString(2).padStart(8, '0'));
        const bits = bin.join(''), mask = '1'.repeat(pre).padEnd(32, '0');
        const toIp = b => [0, 8, 16, 24].map(i => parseInt(b.slice(i, i + 8), 2)).join('.');
        const net = bits.slice(0, pre).padEnd(32, '0'), bc = bits.slice(0, pre).padEnd(32, '1');
        const a = parts[0], cls = a < 128 ? 'A' : a < 192 ? 'B' : a < 224 ? 'C' : a < 240 ? 'D（多播）' : 'E（保留）';
        const priv = a === 10 || (a === 172 && parts[1] >= 16 && parts[1] <= 31) || (a === 192 && parts[1] === 168);
        const special = a === 127 ? '迴路位址（Loopback）' : a === 169 && parts[1] === 254 ? '鏈路本地（APIPA，DHCP 失敗時自動取得）' : a === 100 && parts[1] >= 64 && parts[1] <= 127 ? '電信級 NAT 共享位址（CGNAT）' : '';
        const marked = bits.split('').map((b, i) => (i && i % 8 === 0 ? '.' : '') + (i < pre ? `<b style="color:var(--accent)">${b}</b>` : b)).join('');
        out.innerHTML = `<table class="tbl" style="margin-top:4px">
          <tr><td style="width:7em">逐段二進位</td><td class="mono small">${parts.map((x, i) => `${x} = ${bin[i]}`).join('<br>')}</td></tr>
          <tr><td>網路／主機位元</td><td class="mono small">${marked}<div class="tiny muted">藍色為前 ${pre} 位網路位元，其餘 ${32 - pre} 位為主機位元</div></td></tr>
          <tr><td>子網路遮罩</td><td class="mono">${toIp(mask)}<span class="tiny muted">　萬用遮罩 ${toIp(mask.replace(/./g, c => c === '1' ? '0' : '1'))}</span></td></tr>
          <tr><td>網路位址</td><td class="mono">${toIp(net)}/${pre}</td></tr>
          <tr><td>廣播位址</td><td class="mono">${toIp(bc)}</td></tr>
          <tr><td>可用主機數</td><td class="num">${pre >= 31 ? (pre === 31 ? '2（點對點專用）' : '1') : (2 ** (32 - pre) - 2).toLocaleString()}</td></tr>
          <tr><td>位址分類</td><td>Class ${cls}　${priv ? '<span class="tag ok">私有位址</span>' : special ? `<span class="tag warn">${special}</span>` : '<span class="tag">公有位址</span>'}</td></tr></table>`;
      };
      const runDec = () => {
        const v = $('#bnDec', root).value.trim(), o = $('#bnDecOut', root);
        if (/^[01]{1,8}$/.test(v) && v.length > 3) { o.textContent = `二進位 ${v.padStart(8, '0')} = 十進位 ${parseInt(v, 2)}`; return; }
        const n = Number(v);
        if (!Number.isInteger(n) || n < 0 || n > 255) { o.textContent = '請輸入 0～255 的十進位，或 4～8 位的二進位'; return; }
        const b = n.toString(2).padStart(8, '0');
        o.textContent = `十進位 ${n} = 二進位 ${b}\n` + [128, 64, 32, 16, 8, 4, 2, 1].map((w, i) => b[i] === '1' ? w : null).filter(Boolean).join(' + ') + (n ? ` = ${n}` : '（全部為 0）');
      };
      root.addEventListener('input', e => { if (e.target.id === 'bnDec') runDec(); else run(); });
      run(); runDec();
    }
    if (id === 'osi') {
      const NAMES = ['', '實體層', '資料連結層', '網路層', '傳輸層', '會議層', '表現層', '應用層'];
      const ITEMS = [['HTTP', 7, '網頁傳輸協定'], ['DNS', 7, '網域名稱解析'], ['SMTP', 7, '寄送電子郵件'], ['DHCP', 7, '自動分配 IP'], ['FTP', 7, '檔案傳輸'], ['SSH', 7, '加密遠端登入'],
        ['JPEG／MP4 編碼', 6, '資料格式與編碼'], ['加密與壓縮（傳統分類）', 6, 'OSI 把資料表示方式歸在表現層'], ['工作階段建立與管理', 5, '維持與同步通訊工作階段'],
        ['TCP', 4, '可靠的連線導向傳輸'], ['UDP', 4, '不保證送達的快速傳輸'], ['埠號（Port）', 4, '識別同一台主機上的不同服務'], ['區段 Segment', 4, '傳輸層的資料單位'],
        ['IP', 3, '邏輯定址與路由'], ['ICMP（ping）', 3, '網路層的錯誤回報與診斷'], ['路由器', 3, '依 IP 位址轉送封包'], ['封包 Packet', 3, '網路層的資料單位'], ['OSPF', 3, '動態路由協定'],
        ['MAC 位址', 2, '網路卡的實體位址'], ['交換器（二層）', 2, '依 MAC 位址轉送訊框'], ['訊框 Frame', 2, '資料連結層的資料單位'], ['ARP', 2, '由 IP 查詢 MAC，常歸在第二、三層之間，考試多答資料連結層'], ['VLAN（802.1Q）', 2, '在交換器上切割廣播域'],
        ['集線器 Hub', 1, '只負責把電訊號廣播出去'], ['雙絞線與 RJ-45', 1, '傳輸媒介與接頭'], ['位元 Bit', 1, '實體層的資料單位'], ['光纖', 1, '以光訊號傳輸']];
      let cur, score = 0, total = 0, answered = false;
      const opts = $('#osOpts', root);
      opts.innerHTML = [7, 6, 5, 4, 3, 2, 1].map(n => `<button type="button" data-v="${n}">L${n} ${NAMES[n]}</button>`).join('');
      const next = () => { cur = ITEMS[Math.floor(Math.random() * ITEMS.length)]; answered = false; $('#osQ', root).textContent = cur[0]; $('#osMsg', root).textContent = ''; opts.querySelectorAll('button').forEach(b => b.classList.remove('on')); };
      opts.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b || answered) return;
        answered = true; total++; const ok = +b.dataset.v === cur[1]; if (ok) score++;
        b.classList.add('on');
        $('#osScore', root).textContent = score; $('#osTotal', root).textContent = total;
        $('#osMsg', root).innerHTML = `${ok ? '<b style="color:var(--ok)">答對</b>' : `<b style="color:var(--bad)">答錯</b>，正確是 L${cur[1]} ${NAMES[cur[1]]}`}：${esc(cur[2])}`;
        setTimeout(next, ok ? 900 : 2200);
      });
      $('#osNext', root).addEventListener('click', next);
      next();
    }
    if (id === 'vlsm') {
      const ip2n = s => s.split('.').reduce((n, x) => n * 256 + (+x), 0);
      const n2ip = n => [24, 16, 8, 0].map(b => Math.floor(n / 2 ** b) % 256).join('.');
      const run = () => {
        const out = $('#vlOut', root);
        const m = /^\s*(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})\s*$/.exec($('#vlNet', root).value);
        if (!m || m[1].split('.').some(x => +x > 255) || +m[2] > 30) { out.innerHTML = '<p class="small" style="color:var(--bad)">請輸入網段，例如 192.168.10.0/24（前綴 0～30）。</p>'; return; }
        const pre = +m[2], size = 2 ** (32 - pre), base = Math.floor(ip2n(m[1]) / size) * size;
        const reqs = $('#vlReq', root).value.split('\n').map(l => l.trim()).filter(Boolean).map(l => { const mm = /^(.*?)[\s,，]+(\d+)$/.exec(l); return mm ? { name: mm[1], hosts: +mm[2] } : null; });
        if (reqs.some(r => !r || r.hosts < 1)) { out.innerHTML = '<p class="small" style="color:var(--bad)">每行請輸入「名稱 數量」，數量至少 1。</p>'; return; }
        reqs.sort((a, b) => b.hosts - a.hosts);
        let cur = base, rows = '', fail = '', used = 0;
        for (const r of reqs) {
          let bitsH = 2; while (2 ** bitsH - 2 < r.hosts) bitsH++;
          const blk = 2 ** bitsH;
          cur = Math.ceil(cur / blk) * blk;
          if (cur + blk > base + size) { fail = r.name; break; }
          rows += `<tr><td>${esc(r.name)}<div class="tiny muted">需要 ${r.hosts} 台</div></td><td class="mono small">${n2ip(cur)}/${32 - bitsH}</td><td class="mono small">${n2ip(2 ** 32 - blk)}</td><td class="mono small">${n2ip(cur + 1)} – ${n2ip(cur + blk - 2)}</td><td class="mono small">${n2ip(cur + blk - 1)}</td><td class="num">${blk - 2 - r.hosts}</td></tr>`;
          cur += blk; used += blk;
        }
        out.innerHTML = `<div class="table-wrap"><table class="tbl" style="margin-top:4px"><tr><th>子網路</th><th>網段</th><th>遮罩</th><th>可用範圍</th><th>廣播</th><th>浪費</th></tr>${rows}</table></div>
          ${fail ? `<div class="box warn"><b class="t">空間不足</b>分配到「${esc(fail)}」時已超出 ${n2ip(base)}/${pre} 的範圍，請改用更大的網段或減少需求。</div>`
            : `<p class="small muted" style="margin:8px 0 0">共使用 ${used} / ${size} 個位址，剩餘 ${size - used} 個可供日後擴充。VLSM 先分配需求最大的子網路，可以避免位址空間零碎；每個子網路的可用主機數是 2^主機位元 − 2（扣掉網路位址與廣播位址）。</p>`}`;
      };
      root.addEventListener('input', run); run();
    }
    if (id === 'gitgraph') {
      let C, B, H, T, n, order;
      const hid = k => ((k * 2654435761) >>> 0).toString(16).padStart(8, '0').slice(0, 7);
      const reset = () => { n = 0; C = {}; order = []; B = {}; T = {}; mk('初始提交', []); B.main = order[0]; H = 'main'; };
      function mk(msg, parents) { const id = hid(++n); C[id] = { msg, parents }; order.push(id); return id; }
      const ancestors = id => { const seen = new Set(), st = id ? [id] : []; while (st.length) { const x = st.pop(); if (!seen.has(x)) { seen.add(x); st.push(...C[x].parents); } } return seen; };
      const logEl = () => $('#ggLog', root);
      const say = (cmd, out) => { const el = logEl(); el.textContent += `$ ${cmd}\n${out ? out + '\n' : ''}`; el.scrollTop = el.scrollHeight; };
      function exec(cmd) {
        const t = cmd.trim(); if (!t) return;
        const m = t.match(/^git\s+(\S+)\s*(.*)$/);
        if (!m) return say(t, '只支援 git 開頭的指令');
        const [, sub, rest] = m; const args = rest.match(/"[^"]*"|'[^']*'|\S+/g) || [];
        const tip = () => B[H];
        if (sub === 'commit') {
          const i = args.indexOf('-m'); const msg = i >= 0 && args[i + 1] ? args[i + 1].replace(/^["']|["']$/g, '') : null;
          if (!msg) return say(t, '請用 -m "說明" 加上提交訊息');
          const id = mk(msg, [tip()]); B[H] = id; return say(t, `[${H} ${id}] ${msg}`);
        }
        if (sub === 'branch') {
          if (!args.length) return say(t, Object.keys(B).map(b => (b === H ? '* ' : '  ') + b).join('\n'));
          if (args[0] === '-d' || args[0] === '-D') { const b = args[1]; if (!B[b]) return say(t, `error: 找不到分支 '${b}'`); if (b === H) return say(t, `error: 無法刪除目前所在的分支 '${b}'`); if (args[0] === '-d' && !ancestors(B[H]).has(B[b])) return say(t, `error: 分支 '${b}' 尚未合併，確定要刪除請用 -D`); delete B[b]; return say(t, `已刪除分支 ${b}`); }
          if (B[args[0]]) return say(t, `fatal: 分支 '${args[0]}' 已經存在`);
          B[args[0]] = tip(); return say(t, '');
        }
        if (sub === 'switch' || sub === 'checkout') {
          const create = args[0] === '-c' || args[0] === '-b'; const b = create ? args[1] : args[0];
          if (!b) return say(t, '請指定分支名稱');
          if (create) { if (B[b]) return say(t, `fatal: 分支 '${b}' 已經存在`); B[b] = tip(); H = b; return say(t, `已切換到新分支 '${b}'`); }
          if (!B[b]) return say(t, `fatal: 找不到分支 '${b}'（要建立新分支請加 -c）`);
          H = b; return say(t, `已切換到分支 '${b}'`);
        }
        if (sub === 'merge') {
          const b = args[0]; if (!B[b]) return say(t, `merge: ${b} - 找不到這個分支`);
          if (b === H) return say(t, '不能合併自己');
          const cur = tip(), other = B[b];
          if (ancestors(cur).has(other)) return say(t, 'Already up to date.（已是最新，沒有需要合併的提交）');
          if (ancestors(other).has(cur)) { B[H] = other; return say(t, `Updating ${cur}..${other}\nFast-forward（快轉：${H} 指標直接移到 ${other}，不產生新提交）`); }
          const id = mk(`Merge branch '${b}' into ${H}`, [cur, other]); B[H] = id;
          return say(t, `Merge made by the 'ort' strategy.（產生合併提交 ${id}，有兩個父提交）`);
        }
        if (sub === 'reset') {
          const mm = rest.match(/--hard\s+HEAD~(\d+)/) || rest.match(/--hard\s+HEAD\^/) && [null, '1'];
          if (!mm) return say(t, '本模擬器支援 git reset --hard HEAD~n');
          let id = tip(); for (let i = 0; i < +mm[1]; i++) { if (!C[id].parents.length) return say(t, 'fatal: 已經沒有更早的提交'); id = C[id].parents[0]; }
          B[H] = id; return say(t, `HEAD is now at ${id} ${C[id].msg}（之後的提交不再被任何分支指到，看起來「消失」了，但 reflog 還找得回來）`);
        }
        if (sub === 'revert') {
          if (!/^HEAD$/i.test(args[0] || '')) return say(t, '本模擬器支援 git revert HEAD');
          const cur = tip(); if (!C[cur].parents.length) return say(t, '無法還原初始提交');
          const id = mk(`Revert "${C[cur].msg}"`, [cur]); B[H] = id; return say(t, `[${H} ${id}] Revert "${C[cur].msg}"（新增一個反向提交，歷史不被改寫）`);
        }
        if (sub === 'tag') { if (!args[0]) return say(t, Object.keys(T).join('\n') || '（沒有標籤）'); T[args[0]] = tip(); return say(t, ''); }
        if (sub === 'log') { const rs = ancestors(tip()); return say(t, order.filter(x => rs.has(x)).reverse().map(x => `${x} ${C[x].msg}`).join('\n')); }
        if (sub === 'status') return say(t, `On branch ${H}\nnothing to commit, working tree clean`);
        return say(t, `本模擬器不支援 git ${sub}`);
      }
      function draw() {
        const rs = ancestors(B[H]);
        const labels = id => [...Object.entries(B).filter(([, v]) => v === id).map(([b]) => b === H ? `<span class="tag ok">HEAD → ${esc(b)}</span>` : `<span class="tag">${esc(b)}</span>`), ...Object.entries(T).filter(([, v]) => v === id).map(([tg]) => `<span class="tag warn">🏷 ${esc(tg)}</span>`)].join(' ');
        $('#ggOut', root).innerHTML = `<div class="table-wrap"><table class="tbl"><tr><th>提交</th><th>訊息</th><th>父提交</th><th>指標</th></tr>${order.slice().reverse().map(id => `<tr style="${rs.has(id) ? '' : 'opacity:.4'}"><td class="mono small">${id}</td><td class="small">${esc(C[id].msg)}${C[id].parents.length > 1 ? ' <span class="tiny muted">（合併）</span>' : ''}</td><td class="mono tiny">${C[id].parents.join('<br>') || '—'}</td><td>${labels(id)}</td></tr>`).join('')}</table></div>
          <p class="tiny muted" style="margin:6px 0 0">最新的提交在最上面。半透明的提交不在目前分支的歷史中。分支只是指向某個提交的「指標」，HEAD 代表你現在所在的分支。</p>`;
      }
      const PRESET = {
        ff: ['git switch -c feature', 'git commit -m "新增登入頁"', 'git commit -m "登入頁加上驗證"', 'git switch main', 'git merge feature'],
        merge: ['git switch -c feature', 'git commit -m "新增報表功能"', 'git switch main', 'git commit -m "修正首頁錯字"', 'git merge feature'],
        reset: ['git commit -m "功能 A"', 'git commit -m "功能 B（有 bug）"', 'git revert HEAD', 'git commit -m "測試用提交"', 'git reset --hard HEAD~1'],
        clear: []
      };
      const run = () => { const i = $('#ggIn', root); exec(i.value); i.value = ''; draw(); };
      $('#ggRun', root).addEventListener('click', run);
      $('#ggIn', root).addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') run(); });
      tabsSelect(root, (tabs, v) => { reset(); logEl().textContent = ''; PRESET[v].forEach(exec); draw(); root.querySelectorAll('#ggPreset button').forEach(b => b.classList.remove('on')); });
      reset(); say('git init', 'Initialized empty Git repository（已建立初始提交方便練習）'); draw();
    }
    if (id === 'cvss') {
      const v = Object.fromEntries(CVSS_METRICS.map(m => [m.key, m.def]));
      const run = () => {
        const r = cvss31(v), [sev, cls] = severity(r.score);
        const vec = 'CVSS:3.1/' + CVSS_METRICS.map(m => `${m.key}:${v[m.key]}`).join('/');
        $('#cvssOut', root).innerHTML = `<b>${r.score.toFixed(1)}</b><span class="tag ${cls}">${sev}</span>
          <span class="small muted">可利用性子分數 ${r.expl.toFixed(1)}・衝擊子分數 ${Math.max(0, r.impact).toFixed(1)}</span>
          <div class="out" style="width:100%">${vec}</div>`;
      };
      tabsSelect(root, (tabs, val) => { v[tabs.dataset.metric] = val; run(); });
      run();
    }
    if (id === 'sqlorder') {
      const ORDER = { exec: ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY', 'LIMIT'], write: ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT'] };
      const WHY = { FROM: '先決定從哪張表（含 JOIN）取資料', WHERE: '篩選資料列，此時還沒有 SELECT 的別名，也不能用彙總函式', 'GROUP BY': '把資料分組', HAVING: '篩選分組後的結果，可以用彙總函式', SELECT: '計算要顯示的欄位與別名（視窗函式也在這裡）', 'ORDER BY': '排序，可以使用 SELECT 的別名', LIMIT: '最後才取前幾筆' };
      let mode = 'exec', picked = [];
      const run = () => {
        const target = ORDER[mode];
        $('#soHint', root).textContent = mode === 'exec' ? '依資料庫「實際執行」的順序點選子句：' : '依寫 SQL 時「撰寫」的順序點選子句：';
        const pool = [...target].sort((a, b) => a.localeCompare(b)).filter(c => !picked.includes(c));
        $('#soPicked', root).innerHTML = picked.map((c, i) => `<span class="so-chip ok"><b>${i + 1}</b>${c}</span>`).join('') || '<span class="muted small">（尚未點選）</span>';
        $('#soPool', root).innerHTML = pool.map(c => `<button type="button" class="so-chip" data-c="${c}">${c}</button>`).join('');
        if (picked.length === target.length) $('#soMsg', root).innerHTML = '<b style="color:var(--ok)">完成！</b>' + (mode === 'exec' ? '　' + target.map(c => `${c}：${WHY[c]}`).join('；') : '　撰寫順序與執行順序不同，這就是 WHERE 不能使用 SELECT 別名的原因。');
      };
      $('#soPool', root).addEventListener('click', e => {
        const b = e.target.closest('button[data-c]'); if (!b) return;
        const want = ORDER[mode][picked.length];
        if (b.dataset.c === want) { picked.push(want); $('#soMsg', root).textContent = mode === 'exec' ? `${want}：${WHY[want]}` : ''; }
        else $('#soMsg', root).innerHTML = `<b style="color:var(--bad)">不對</b>，第 ${picked.length + 1} 個應該是 ${esc(want)}，再試一次。`;
        run();
      });
      tabsSelect(root, (tabs, v) => { if (tabs.id === 'soMode') { mode = v; picked = []; $('#soMsg', root).textContent = ''; run(); } });
      $('#soReset', root).addEventListener('click', () => { picked = []; $('#soMsg', root).textContent = ''; run(); });
      run();
    }
    if (id === 'joinviz') {
      const A = [[1, '王小明'], [2, '李美華'], [3, '張大偉'], [4, '鄭佩珊']];
      const B = [[101, 1, 590], [102, 1, 2490], [103, 3, 6990], [104, 5, 199]];
      const nul = '<span class="sql-null">NULL</span>';
      const tbl = (cap, head, rows, cls = () => '') => `<div class="jv-t"><div class="small muted">${cap}</div><table class="tbl"><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map((r, i) => `<tr class="${cls(r, i)}">${r.map(v => `<td>${v === null ? nul : esc(v)}</td>`).join('')}</tr>`).join('')}</table></div>`;
      const run = type => {
        const out = [], usedB = new Set(), usedA = new Set();
        A.forEach(a => {
          const m = B.filter(b => b[1] === a[0]);
          m.forEach(b => { out.push([a[0], a[1], b[0], b[2], 'both']); usedB.add(b[0]); usedA.add(a[0]); });
          if (!m.length && (type === 'LEFT' || type === 'FULL')) out.push([a[0], a[1], null, null, 'left']);
        });
        if (type === 'RIGHT' || type === 'FULL') B.filter(b => !usedB.has(b[0])).forEach(b => out.push([null, null, b[0], b[2], 'right']));
        if (type === 'RIGHT') out.sort((x, y) => (x[2] ?? 999) - (y[2] ?? 999));
        $('#jvA', root).innerHTML = tbl('customers（左表）', ['id', 'name'], A, r => usedA.has(r[0]) ? 'jv-hit' : (type === 'LEFT' || type === 'FULL') ? 'jv-keep' : 'jv-drop');
        $('#jvB', root).innerHTML = tbl('orders（右表）', ['id', 'customer_id', 'amount'], B, r => usedB.has(r[0]) ? 'jv-hit' : (type === 'RIGHT' || type === 'FULL') ? 'jv-keep' : 'jv-drop');
        $('#jvSql', root).textContent = `SELECT c.id, c.name, o.id AS order_id, o.amount\nFROM customers c\n${type === 'INNER' ? 'JOIN' : type + ' JOIN'} orders o ON o.customer_id = c.id;`;
        const note = { INNER: '只保留兩邊都配對得到的列：李美華、鄭佩珊沒有訂單，訂單 104 的客戶 5 不存在，都被排除。', LEFT: '保留左表（客戶）全部：沒有訂單的李美華、鄭佩珊仍出現，訂單欄位為 NULL。找「沒有訂單的客戶」就是再加上 WHERE o.id IS NULL。', RIGHT: '保留右表（訂單）全部：訂單 104 找不到客戶，客戶欄位為 NULL。把表的順序對調寫成 LEFT JOIN 結果相同。', FULL: '兩邊全部保留，配對不到的一側為 NULL。MySQL 不支援 FULL OUTER JOIN，可用 LEFT JOIN UNION RIGHT JOIN 代替。' }[type];
        $('#jvOut', root).innerHTML = tbl(`結果：${out.length} 列`, ['c.id', 'c.name', 'order_id', 'amount'], out.map(r => r.slice(0, 4)), r => '') + `<p class="small" style="margin:8px 0 0">${note}</p>`;
      };
      tabsSelect(root, (tabs, v) => run(v));
      run('INNER');
    }
    if (id === 'specificity') {
      // 計算 CSS 選擇器權重 (ID, 類別／屬性／偽類, 標籤／偽元素)
      const spec = sel => {
        let s = sel.trim(), a = 0, b = 0, c = 0;
        s = s.replace(/:where\((?:[^()]|\([^()]*\))*\)/g, ' ');
        s = s.replace(/:(?:not|is|has)\(((?:[^()]|\([^()]*\))*)\)/g, (_, inner) => {
          const best = inner.split(',').map(spec).sort((x, y) => y[0] - x[0] || y[1] - x[1] || y[2] - x[2])[0] || [0, 0, 0];
          a += best[0]; b += best[1]; c += best[2]; return ' ';
        });
        s = s.replace(/\[[^\]]*\]/g, () => { b++; return ' '; });
        s = s.replace(/::[\w-]+(\([^)]*\))?/g, () => { c++; return ' '; });
        s = s.replace(/:(before|after|first-line|first-letter)\b/g, () => { c++; return ' '; });
        s = s.replace(/:[\w-]+(\([^)]*\))?/g, () => { b++; return ' '; });
        s = s.replace(/#[\w-]+/g, () => { a++; return ' '; });
        s = s.replace(/\.[\w-]+/g, () => { b++; return ' '; });
        (s.match(/(^|[\s>+~(,])([a-zA-Z][\w-]*)/g) || []).forEach(() => c++);
        return [a, b, c];
      };
      const fmt = v => `(${v.join(', ')})`;
      const run = () => {
        const sa = $('#spA', root).value, sb = $('#spB', root).value;
        const A = spec(sa), B = spec(sb);
        const cmp = A[0] - B[0] || A[1] - B[1] || A[2] - B[2];
        const win = cmp > 0 ? 'A 的權重較高，A 生效' : cmp < 0 ? 'B 的權重較高，B 生效' : '權重相同，後寫的 B 生效';
        const row = (n, s, v) => `<tr><td>${n}</td><td class="mono">${esc(s)}</td><td class="num" style="white-space:nowrap"><b>${fmt(v)}</b></td><td class="small muted">ID ${v[0]}・類別／屬性／偽類 ${v[1]}・標籤／偽元素 ${v[2]}</td></tr>`;
        $('#spOut', root).innerHTML = `<table class="tbl" style="margin-top:12px"><tr><th></th><th>選擇器</th><th>權重</th><th>組成</th></tr>${row('A', sa, A)}${row('B', sb, B)}</table><p style="margin:6px 0 0"><b>${win}</b>　<span class="small muted">比較方式：先比 ID，相同再比類別，再比標籤；行內 style 與 !important 優先於所有選擇器。</span></p>`;
      };
      root.addEventListener('input', run);
      root.addEventListener('click', e => { const b = e.target.closest('[data-sp]'); if (b) { $('#spB', root).value = b.dataset.sp; run(); } });
      run();
    }
    if (id === 'boxmodel') {
      let sizing = 'content-box';
      const run = () => {
        const w = Math.max(0, +$('#bmW', root).value || 0), p = Math.max(0, +$('#bmP', root).value || 0), b = Math.max(0, +$('#bmB', root).value || 0), m = Math.max(0, +$('#bmM', root).value || 0);
        const content = sizing === 'border-box' ? Math.max(0, w - 2 * p - 2 * b) : w;
        const box = content + 2 * p + 2 * b, total = box + 2 * m;
        const scale = Math.min(1, 300 / Math.max(total, 1));
        $('#bmOut', root).innerHTML = `
          <div class="bm-wrap"><div class="bm-m" style="padding:${m * scale}px"><div class="bm-b" style="border-width:${b * scale}px"><div class="bm-p" style="padding:${p * scale}px"><div class="bm-c" style="width:${content * scale}px">內容 ${content}</div></div></div></div></div>
          <table class="tbl" style="margin-top:12px">
            <tr><td>內容區寬度（content）</td><td class="num">${content} px</td><td class="small muted">${sizing === 'border-box' ? `${w} − ${p}×2 − ${b}×2` : 'width 只算內容'}</td></tr>
            <tr><td>元素寬度（含 padding、border）</td><td class="num"><b>${box} px</b></td><td class="small muted">${content} + ${p}×2 + ${b}×2</td></tr>
            <tr><td>佔用的總寬度（再加 margin）</td><td class="num">${total} px</td><td class="small muted">${box} + ${m}×2</td></tr>
          </table>
          ${sizing === 'border-box' && w < 2 * p + 2 * b ? '<p class="small" style="color:var(--bad)">padding 與 border 已超過 width，內容區被壓縮為 0。</p>' : ''}`;
      };
      root.addEventListener('input', run);
      tabsSelect(root, (tabs, v) => { sizing = v; run(); });
      run();
    }
    if (id === 'flexbox') {
      const st = { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'stretch', flexWrap: 'nowrap' };
      const stage = $('#fxStage', root);
      stage.innerHTML = [1, 2, 3, 4, 5].map(n => `<div class="fx-item" style="${n === 2 ? 'padding-top:18px;padding-bottom:18px' : ''}${n === 4 ? ';min-width:110px' : ''}">${n}</div>`).join('');
      const kebab = k => k.replace(/[A-Z]/g, c => '-' + c.toLowerCase());
      const run = () => {
        Object.assign(stage.style, st);
        $('#fxCss', root).textContent = `.container {\n  display: flex;\n${Object.entries(st).map(([k, v]) => `  ${kebab(k)}: ${v};`).join('\n')}\n  gap: 8px;\n}`;
      };
      tabsSelect(root, (tabs, v) => { st[tabs.dataset.fx] = v; run(); });
      run();
    }
    if (id === 'cellref') {
      const colNum = s => s.split('').reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0);
      const colStr = n => { let s = ''; while (n > 0) { const r = (n - 1) % 26; s = String.fromCharCode(65 + r) + s; n = Math.floor((n - 1) / 26); } return s; };
      const parse = a => { const m = /^\s*\$?([A-Za-z]{1,3})\$?(\d+)\s*$/.exec(a); return m ? [colNum(m[1].toUpperCase()), +m[2]] : null; };
      const run = () => {
        const f = $('#crF', root).value, from = parse($('#crFrom', root).value), to = parse($('#crTo', root).value);
        if (!from || !to) { $('#crOut', root).innerHTML = '<p class="small" style="color:var(--bad)">請輸入正確的儲存格位址，例如 B2。</p>'; return; }
        const dc = to[0] - from[0], dr = to[1] - from[1], notes = [];
        let bad = false;
        // 引號內的文字不處理
        const parts = f.split(/("[^"]*")/);
        const res = parts.map(part => part.startsWith('"') ? part : part.replace(/(^|[^A-Za-z0-9_$!])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9_(])/g, (all, pre, d1, col, d2, row) => {
          const c0 = colNum(col.toUpperCase()), r0 = +row;
          const c1 = d1 ? c0 : c0 + dc, r1 = d2 ? r0 : r0 + dr;
          if (c1 < 1 || r1 < 1) { bad = true; return pre + '#REF!'; }
          const ref = `${d1}${colStr(c1)}${d2}${r1}`;
          const kind = d1 && d2 ? '絕對參照，欄列都不變' : d1 ? '鎖欄：欄固定、列跟著變' : d2 ? '鎖列：列固定、欄跟著變' : '相對參照，欄列都跟著變';
          notes.push(`<tr><td class="mono">${esc(d1 + col.toUpperCase() + d2 + row)}</td><td class="mono"><b>${esc(ref)}</b></td><td class="small muted">${kind}</td></tr>`);
          return pre + ref;
        })).join('');
        $('#crOut', root).innerHTML = `<p style="margin:12px 0 6px">從 <b class="mono">${colStr(from[0])}${from[1]}</b> 複製到 <b class="mono">${colStr(to[0])}${to[1]}</b>（欄移動 ${dc >= 0 ? '+' : ''}${dc}、列移動 ${dr >= 0 ? '+' : ''}${dr}）：</p>
          <div class="out" style="font-size:1.05rem">${esc(res)}</div>
          ${notes.length ? `<table class="tbl" style="margin-top:10px"><tr><th>原本</th><th>複製後</th><th>說明</th></tr>${notes.join('')}</table>` : ''}
          ${bad ? '<p class="small" style="color:var(--bad)">有參照被移到工作表範圍之外，變成 #REF!。</p>' : ''}`;
      };
      root.addEventListener('input', run);
      root.addEventListener('click', e => { const b = e.target.closest('[data-cr]'); if (!b) return; const [f, a, t] = b.dataset.cr.split('|'); $('#crF', root).value = f; $('#crFrom', root).value = a; $('#crTo', root).value = t; run(); });
      run();
    }
    if (id === 'xlookup') {
      const PRICE = [['滑鼠', 590, '周邊'], ['鍵盤', 2490, '周邊'], ['螢幕', 6990, '顯示'], ['耳機', 1990, '影音'], ['喇叭', 1890, '影音']];
      const BONUS = [[0, '0%'], [10000, '2%'], [20000, '3%'], [30000, '5%']];
      let mode = 'exact';
      const run = () => {
        const v = $('#xlIn', root).value.trim();
        if (mode === 'exact') {
          const ret = +$('#xlRet', root).value, retName = ret === 1 ? '單價' : '類別', retCol = ret === 1 ? 'L' : 'M';
          const i = PRICE.findIndex(r => r[0] === v);
          $('#xlTable', root).innerHTML = `<table class="sheet" style="margin-top:10px"><tr><th></th><th>K 產品</th><th>L 單價</th><th>M 類別</th></tr>${PRICE.map((r, j) => `<tr class="${j === i ? 'xl-hit' : ''}"><th>${j + 2}</th><td>${r[0]}</td><td class="n">${r[1].toLocaleString()}</td><td>${r[2]}</td></tr>`).join('')}</table>`;
          const result = i >= 0 ? (ret === 1 ? PRICE[i][1].toLocaleString() : PRICE[i][2]) : '查無產品';
          $('#xlOut', root).innerHTML = `<div class="out">=XLOOKUP("${esc(v)}", $K$2:$K$6, $${retCol}$2:$${retCol}$6, "查無產品")</div>
            <p style="margin:8px 0">${i >= 0 ? `在 K 欄第 ${i + 1} 個位置（第 ${i + 2} 列）找到「${esc(v)}」，傳回同一列的${retName}：` : `K 欄中找不到「${esc(v)}」，傳回第 4 個引數：`}<b>${esc(result)}</b></p>
            <p class="small muted">VLOOKUP 寫法：=VLOOKUP("${esc(v)}", $K$2:$M$6, ${ret + 1}, FALSE)${i < 0 ? '　→ 找不到時顯示 #N/A，需要再包 IFNA。' : ''}</p>`;
        } else {
          const n = Number(v.replace(/,/g, ''));
          if (!Number.isFinite(n) || v === '') { $('#xlOut', root).innerHTML = '<p class="small" style="color:var(--bad)">請輸入業績金額，例如 28730。</p>'; $('#xlTable', root).innerHTML = ''; return; }
          let i = -1; BONUS.forEach((r, j) => { if (r[0] <= n) i = j; });
          $('#xlTable', root).innerHTML = `<table class="sheet" style="margin-top:10px"><tr><th></th><th>O 業績下限</th><th>P 獎金比例</th></tr>${BONUS.map((r, j) => `<tr class="${j === i ? 'xl-hit' : ''}"><th>${j + 2}</th><td class="n">${r[0].toLocaleString()}</td><td class="n">${r[1]}</td></tr>`).join('')}</table>`;
          $('#xlOut', root).innerHTML = `<div class="out">=XLOOKUP(${n}, $O$2:$O$5, $P$2:$P$5, , -1)</div>
            <p style="margin:8px 0">${i >= 0 ? `找不到剛好等於 ${n.toLocaleString()} 的值，比對模式 -1 取「小於等於它的最大值」${BONUS[i][0].toLocaleString()}，傳回 <b>${BONUS[i][1]}</b>。` : '比級距表最小的值還小，傳回 #N/A。'}</p>
            <p class="small muted">VLOOKUP 寫法：=VLOOKUP(${n}, $O$2:$P$5, 2, TRUE)　近似比對時級距表必須由小到大排序。</p>`;
        }
      };
      tabsSelect(root, (tabs, v) => {
        mode = v;
        $('#xlInLabel', root).textContent = mode === 'exact' ? '要查的產品' : '業績金額';
        $('#xlIn', root).value = mode === 'exact' ? '螢幕' : '28730';
        $('#xlRetWrap', root).style.visibility = mode === 'exact' ? 'visible' : 'hidden';
        run();
      });
      root.addEventListener('input', run);
      $('#xlRet', root).addEventListener('change', run);
      run();
    }
    if (id === 'pivot') {
      // 講義第 1 章的銷售範例資料：[月份, 業務, 地區, 產品, 數量, 單價, 金額]
      const D = [['1 月', '王小明', '北區', '滑鼠', 10, 590, 5900], ['1 月', '李美華', '中區', '鍵盤', 5, 2490, 12450], ['1 月', '王小明', '北區', '螢幕', 2, 6990, 13980], ['2 月', '張大偉', '南區', '滑鼠', 8, 590, 4720], ['2 月', '李美華', '北區', '鍵盤', 3, 2490, 7470], ['2 月', '王小明', '中區', '滑鼠', 15, 590, 8850], ['3 月', '張大偉', '南區', '螢幕', 1, 6990, 6990], ['3 月', '李美華', '中區', '滑鼠', 6, 590, 3540]];
      const FIELD = ['月份', '業務', '地區', '產品', '數量', '單價', '金額'];
      let show = 'val';
      const agg = (rows, vi, how) => {
        if (!rows.length) return null;
        const v = rows.map(r => r[vi]);
        return how === 'count' ? v.length : how === 'avg' ? v.reduce((a, b) => a + b, 0) / v.length : how === 'max' ? Math.max(...v) : v.reduce((a, b) => a + b, 0);
      };
      const run = () => {
        const ri = +$('#pvRow', root).value, ciRaw = $('#pvCol', root).value, ci = ciRaw === '' ? null : +ciRaw, vi = +$('#pvVal', root).value, how = $('#pvAgg', root).value;
        if (ci === ri) { $('#pvOut', root).innerHTML = '<p class="small" style="color:var(--bad)">列與欄不能放同一個欄位。</p>'; return; }
        const uniq = i => [...new Set(D.map(r => r[i]))];
        const rowsK = uniq(ri), colsK = ci === null ? [] : uniq(ci);
        const grand = agg(D, vi, how);
        const pctOk = show === 'pct' && (how === 'sum' || how === 'count');
        const f = x => x === null ? '' : pctOk ? (x / grand * 100).toFixed(1) + '%' : (how === 'avg' ? +x.toFixed(2) : x).toLocaleString();
        const head = `<tr><th>${FIELD[ri]} ＼ ${ci === null ? '' : FIELD[ci]}</th>${colsK.map(c => `<th>${esc(c)}</th>`).join('')}<th>總計</th></tr>`;
        const body = rowsK.map(rk => {
          const rr = D.filter(r => r[ri] === rk);
          return `<tr><td>${esc(rk)}</td>${colsK.map(ck => `<td class="n">${f(agg(rr.filter(r => r[ci] === ck), vi, how))}</td>`).join('')}<td class="n"><b>${f(agg(rr, vi, how))}</b></td></tr>`;
        }).join('');
        const foot = `<tr><td><b>總計</b></td>${colsK.map(ck => `<td class="n"><b>${f(agg(D.filter(r => r[ci] === ck), vi, how))}</b></td>`).join('')}<td class="n"><b>${f(grand)}</b></td></tr>`;
        const label = { sum: '加總', count: '計數', avg: '平均值', max: '最大值' }[how];
        $('#pvOut', root).innerHTML = `<p class="small muted" style="margin:12px 0 4px">${label} - ${FIELD[vi]}${show === 'pct' && !pctOk ? '（總計百分比只適用於加總與計數）' : pctOk ? '（總計百分比）' : ''}</p><div class="table-wrap"><table class="sheet">${head}${body}${foot}</table></div>`;
      };
      root.addEventListener('change', run);
      tabsSelect(root, (tabs, v) => { show = v; run(); });
      run();
    }
    if (id === 'ctypes') {
      const run = () => {
        const [bits, signed] = $('#ctType', root).value.split(',').map(Number);
        const raw = $('#ctVal', root).value.trim().replace(/[,_\s]/g, '');
        let v;
        try {
          if (!/^[-+]?\d+([*+-]\d+)*$/.test(raw)) throw 0;
          v = raw.match(/[-+]?\d+|[*]/g).reduce((acc, t, i, arr) => {   // 支援 a*b、a+b、a-b 的簡單運算
            if (t === '*') return acc;
            const n = BigInt(t);
            if (i === 0) return n;
            return arr[i - 1] === '*' ? acc * n : acc + n;
          }, 0n);
        } catch (e) { $('#ctOut', root).innerHTML = '<p class="small" style="color:var(--bad)">請輸入整數，例如 255、-1、100000*100000。</p>'; return; }
        const B = BigInt(bits), mod = 1n << B;
        const min = signed ? -(1n << (B - 1n)) : 0n, max = signed ? (1n << (B - 1n)) - 1n : mod - 1n;
        let stored = ((v % mod) + mod) % mod;
        const bin = stored.toString(2).padStart(bits, '0');
        if (signed && stored > max) stored -= mod;
        const inRange = v >= min && v <= max;
        const groups = bin.match(/.{1,8}/g).join(' ');
        $('#ctOut', root).innerHTML = `
          <table class="tbl" style="margin-top:12px">
            <tr><td>可表示範圍</td><td class="mono">${min.toLocaleString()} ～ ${max.toLocaleString()}</td></tr>
            <tr><td>要存入的值</td><td class="mono">${v.toLocaleString()}</td></tr>
            <tr><td>實際存到的值</td><td class="mono"><b style="color:${inRange ? 'var(--ok)' : 'var(--bad)'}">${stored.toLocaleString()}</b></td></tr>
            <tr><td>記憶體中的位元</td><td class="mono" style="word-break:break-all">${groups}</td></tr>
          </table>
          <p class="small" style="margin:6px 0 0">${inRange ? '在範圍內，正確存入。' : signed
            ? '超出範圍。<b>有號整數的運算溢位在 C／C++ 是未定義行為</b>；上表為常見平台（二補數、取低位元）的結果，實際程式不應依賴它，請改用更大的型別。'
            : '超出範圍。無號整數會對 2<sup>' + bits + '</sup> 取餘數（繞回），這是標準明確定義的行為。'}</p>`;
      };
      root.addEventListener('input', run);
      $('#ctType', root).addEventListener('change', run);
      root.addEventListener('click', e => { const b = e.target.closest('[data-ct]'); if (!b) return; const [val, t] = b.dataset.ct.split('|'); $('#ctVal', root).value = val; $('#ctType', root).value = t; run(); });
      run();
    }
    if (id === 'bitops') {
      const bits8 = x => (x & 255).toString(2).padStart(8, '0');
      const cells = x => bits8(x).split('').map(c => `<span class="bo-b${c === '1' ? ' on' : ''}">${c}</span>`).join('');
      const run = () => {
        const clamp = (v, hi) => Math.max(0, Math.min(hi, Math.floor(+v || 0)));
        const a = clamp($('#boA', root).value, 255), b = clamp($('#boB', root).value, 255), n = clamp($('#boN', root).value, 7);
        const rows = [
          ['a', a, ''], ['b', b, ''], ['a & b', a & b, '兩者皆 1 才是 1'], ['a | b', a | b, '任一為 1 就是 1'], ['a ^ b', a ^ b, '不同為 1'],
          ['~a', (~a) & 255, '每個位元反轉（以 8 位元顯示）'], [`a << ${n}`, (a << n) & 255, `乘以 ${1 << n}，超出 8 位元的部分被捨棄`], [`a >> ${n}`, a >> n, `除以 ${1 << n}（捨去小數）`],
          [`a | (1 << ${n})`, a | (1 << n), `設定第 ${n} 位元`], [`a & ~(1 << ${n})`, a & ~(1 << n) & 255, `清除第 ${n} 位元`], [`a ^ (1 << ${n})`, a ^ (1 << n), `切換第 ${n} 位元`]
        ];
        $('#boOut', root).innerHTML = `<div class="table-wrap"><table class="tbl bo-t" style="margin-top:12px"><tr><th>運算</th><th class="mono">7 6 5 4 3 2 1 0</th><th>十進位</th><th>十六進位</th><th>說明</th></tr>${rows.map(([k, v, d], i) => `<tr${i === 1 ? ' class="bo-sep"' : ''}><td class="mono">${k}</td><td>${cells(v)}</td><td class="num">${v}</td><td class="mono">0x${v.toString(16).toUpperCase().padStart(2, '0')}</td><td class="small muted">${d}</td></tr>`).join('')}</table></div>
          <p class="small" style="margin:6px 0 0">第 ${n} 位元目前是 <b>${(a >> n) & 1}</b>（<code>(a &gt;&gt; ${n}) &amp; 1</code>）；a 是${a & 1 ? '奇' : '偶'}數（<code>a &amp; 1</code>）。</p>`;
      };
      root.addEventListener('input', run);
      run();
    }
    if (id === 'ptrmem') {
      const BASE = 0x1000, INIT = [10, 20, 30, 40, 50];
      let size = 4, idx = 0, vals = [...INIT], msg = '執行 int *p = a; 後，p 存放 a[0] 的位址。';
      const hex = n => '0x' + n.toString(16).toUpperCase();
      const name = { 1: 'char', 4: 'int', 8: 'double' };
      const run = () => {
        const ok = idx >= 0 && idx < 5;
        $('#pmOut', root).innerHTML = `
          <div class="pm-mem">${vals.map((v, i) => `<div class="pm-cell${i === idx ? ' on' : ''}"><small>${hex(BASE + i * size)}</small><b>${v}</b><span>a[${i}]</span></div>`).join('')}${idx === 5 ? '<div class="pm-cell out on"><small>' + hex(BASE + 5 * size) + '</small><b>?</b><span>a + 5（陣列外）</span></div>' : ''}</div>
          <table class="tbl" style="margin-top:10px">
            <tr><td>p 存放的值（位址）</td><td class="mono"><b>${hex(BASE + idx * size)}</b></td><td class="small muted">a 的位址 ${hex(BASE)} + ${idx} × sizeof(${name[size]})（${size}）</td></tr>
            <tr><td>p - a</td><td class="mono">${idx}</td><td class="small muted">兩指標相差的「元素個數」，不是位元組數</td></tr>
            <tr><td>*p</td><td class="mono">${ok ? vals[idx] : '未定義行為'}</td><td class="small muted">${ok ? `等同 a[${idx}]` : '指標已在陣列範圍外，解參考是未定義行為'}</td></tr>
          </table>
          <p class="small" style="margin:6px 0 0">${msg}</p>`;
      };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-pm]'); if (!b) return;
        const a = b.dataset.pm;
        if (a === 'inc') { if (idx < 5) idx++; msg = `p++：指標往後移一個元素，位址增加 ${size} 個位元組。` + (idx === 5 ? '指向陣列結尾的下一個位置是合法的，但不能解參考。' : ''); }
        if (a === 'dec') { if (idx > 0) idx--; msg = `p--：指標往前移一個元素，位址減少 ${size} 個位元組。`; }
        if (a === 'add2') { idx = Math.min(5, idx + 2); msg = `p += 2：一次往後移兩個元素（${2 * size} 個位元組）。`; }
        if (a === 'set') { if (idx < 5) { vals[idx] = 99; msg = `*p = 99：修改 p 指向的元素，a[${idx}] 變成 99。`; } else msg = '指標在陣列外，*p = 99 會寫入不屬於陣列的記憶體（緩衝區溢位）。'; }
        if (a === 'plus') { if (idx < 5) { vals[idx]++; msg = `(*p)++：先解參考再加 1，a[${idx}] 變成 ${vals[idx]}。注意 *p++ 的意思不同：它是先取值，再讓指標往後移。`; } }
        if (a === 'reset') { idx = 0; vals = [...INIT]; msg = '重設：p = a，陣列恢復原本的值。'; }
        run();
      });
      tabsSelect(root, (tabs, v) => { size = +v; msg = `元素型別改為 ${name[size]}，每個元素佔 ${size} 個位元組，p + 1 的位址就增加 ${size}。`; run(); });
      run();
    }
    if (id === 'bigo') {
      const fact = n => { let r = 1; for (let i = 2; i <= n; i++) { r *= i; if (!Number.isFinite(r)) return Infinity; } return r; };
      const fmtOps = x => !Number.isFinite(x) || x > 1e300 ? '天文數字' : x >= 1e6 ? x.toExponential(2).replace('e+', ' × 10^') : Math.round(x).toLocaleString();
      const fmtTime = s => !Number.isFinite(s) || s > 3.15e7 * 1e6 ? '比宇宙年齡還久' : s < 1e-6 ? '< 1 微秒' : s < 1e-3 ? (s * 1e6).toFixed(1) + ' 微秒' : s < 1 ? (s * 1e3).toFixed(1) + ' 毫秒' : s < 60 ? s.toFixed(1) + ' 秒' : s < 3600 ? (s / 60).toFixed(1) + ' 分鐘' : s < 86400 * 2 ? (s / 3600).toFixed(1) + ' 小時' : s < 3.15e7 * 2 ? (s / 86400).toFixed(0) + ' 天' : (s / 3.15e7).toExponential(1).replace('e+', ' × 10^') + ' 年';
      const run = () => {
        const n = Math.max(1, Math.floor(+$('#bgN', root).value || 1));
        const rows = [['O(1)', 1, '陣列索引、雜湊表查詢'], ['O(log n)', Math.log2(n), '二分搜尋、set／map 操作'], ['O(n)', n, '單層迴圈、前綴和'], ['O(n log n)', n * Math.log2(n), 'sort、合併排序'], ['O(n²)', n * n, '雙層迴圈、氣泡排序'], ['O(n³)', n ** 3, '三層迴圈'], ['O(2ⁿ)', 2 ** n, '列舉所有子集合'], ['O(n!)', fact(n), '列舉所有排列']];
        $('#bgOut', root).innerHTML = `<div class="table-wrap"><table class="tbl" style="margin-top:12px"><tr><th>複雜度</th><th>運算次數</th><th>估計時間</th><th></th><th class="small">常見情況</th></tr>${rows.map(([k, ops, d]) => {
          const t = ops / 1e8, ok = t <= 1;
          return `<tr><td class="mono"><b>${k}</b></td><td class="mono">${fmtOps(ops)}</td><td>${fmtTime(t)}</td><td>${ok ? '<span class="tag ok">1 秒內</span>' : '<span class="tag bad">超時</span>'}</td><td class="small muted">${d}</td></tr>`;
        }).join('')}</table></div><p class="small muted" style="margin:6px 0 0">以 C++ 每秒約 10⁸ 次簡單運算估算，實際時間依運算內容與電腦而定。線上解題通常限制 1～2 秒。</p>`;
      };
      root.addEventListener('input', run);
      root.addEventListener('click', e => { const b = e.target.closest('[data-bg]'); if (b) { $('#bgN', root).value = b.dataset.bg; run(); } });
      run();
    }
    if (id === 'stlpick') {
      const S = [
        ['一般的動態陣列，依索引存取', 'vector', '&lt;vector&gt;', [['v[i]', 'O(1)'], ['push_back', '平均 O(1)'], ['中間 insert／erase', 'O(n)'], ['find（未排序）', 'O(n)']], 'vector<int> v = {3, 1, 4};\nv.push_back(5);\ncout << v[2];', '不知道用什麼時的預設選擇，記憶體連續、快取效率最好。'],
        ['計算每個字出現幾次（需要依字母順序輸出）', 'map', '&lt;map&gt;', [['m[key]', 'O(log n)'], ['find／count', 'O(log n)'], ['erase', 'O(log n)'], ['依鍵排序走訪', 'O(n)']], 'map<string, int> cnt;\ncnt["apple"]++;\nfor (auto &[k, v] : cnt) cout << k << " " << v;', '鍵自動排序；只需要查詢不需要順序時改用 unordered_map。'],
        ['只需要非常快速地查詢某個鍵是否存在', 'unordered_map／unordered_set', '&lt;unordered_map&gt;', [['查詢、插入、刪除', '平均 O(1)'], ['最差情況', 'O(n)'], ['走訪順序', '不固定']], 'unordered_set<int> seen;\nif (seen.count(x)) { … }\nseen.insert(x);', '雜湊表實作，沒有順序；兩數之和、去重查詢的首選。'],
        ['去除重複並保持排序，找第一個 ≥ x 的值', 'set', '&lt;set&gt;', [['insert／erase／count', 'O(log n)'], ['lower_bound', 'O(log n)'], ['最小／最大', '*begin()／*rbegin()']], 'set<int> s = {5, 3, 5, 1};\nauto it = s.lower_bound(4);   // 5', '需要允許重複時改用 multiset。'],
        ['後進先出：括號配對、復原（Undo）', 'stack', '&lt;stack&gt;', [['push／pop／top', 'O(1)']], 'stack<char> st;\nst.push(\'(\');\nst.top(); st.pop();', 'DFS 也可以用 stack 實作。'],
        ['先進先出：排隊、BFS 最短步數', 'queue', '&lt;queue&gt;', [['push／pop／front', 'O(1)']], 'queue<pair<int,int>> q;\nq.push({0, 0});\nauto [r, c] = q.front(); q.pop();', 'BFS 每一步成本相同時，第一次到達即為最短距離。'],
        ['每次都要取出最大（或最小）的元素', 'priority_queue', '&lt;queue&gt;', [['push', 'O(log n)'], ['pop', 'O(log n)'], ['top', 'O(1)']], 'priority_queue<int> pq;          // 最大在頂\npriority_queue<int, vector<int>, greater<int>> mq;  // 最小在頂', '排程、Dijkstra 最短路徑、前 k 大的元素。'],
        ['兩端都要快速加入與移除（滑動視窗）', 'deque', '&lt;deque&gt;', [['push_front／push_back', 'O(1)'], ['pop_front／pop_back', 'O(1)'], ['d[i]', 'O(1)']], 'deque<int> d;\nd.push_back(1); d.push_front(0);\nd.pop_back();', '單調佇列（滑動視窗最大值）常用 deque。']
      ];
      const tabs = $('#spkTabs', root);
      tabs.innerHTML = S.map((s, i) => `<button type="button" data-v="${i}"${i === 0 ? ' class="on"' : ''}>${esc(s[0].split('，')[0].split('：')[0])}</button>`).join('');
      const run = i => {
        const [need, name, header, ops, code, note] = S[i];
        $('#spkOut', root).innerHTML = `<div class="spk-card"><div class="small muted">${esc(need)}</div><div class="spk-name mono">${esc(name)}</div><div class="small muted">#include ${header}</div>
          <table class="tbl" style="margin-top:8px">${ops.map(([o, c]) => `<tr><td class="mono">${esc(o)}</td><td class="mono"><b>${esc(c)}</b></td></tr>`).join('')}</table>
          <pre class="out">${esc(code)}</pre><p class="small" style="margin:6px 0 0">${esc(note)}</p></div>`;
      };
      tabsSelect(root, (t, v) => run(+v));
      run(0);
    }
    if (id === 'stackq') {
      let mode = 'stack', items = [], hit = -1, msg = '';
      const vn = { stack: 'st', queue: 'q', deque: 'd' };
      const OPS = { stack: ['push', 'pop', 'top'], queue: ['push', 'pop', 'front'], deque: ['push_front', 'push_back', 'pop_front', 'pop_back'] };
      const INTRO = { stack: '堆疊：後進先出（LIFO），只能在頂端加入與移除。', queue: '佇列：先進先出（FIFO），從後端加入、從前端移除。', deque: '雙端佇列：兩端都能 O(1) 加入與移除，也是 stack 與 queue 預設的底層容器。' };
      const btns = () => { $('#sqBtns', root).innerHTML = OPS[mode].map(o => `<button class="btn sm outline mono" type="button" data-sq="${o}">${o}()</button>`).join('') + '<button class="btn sm outline" type="button" data-sq="clear">清空</button>'; };
      const run = () => {
        const v = vn[mode], n = items.length;
        const ends = mode === 'stack' ? ['底（bottom）', '頂（top）：從這裡進出'] : mode === 'queue' ? ['前端 front：從這裡出', '後端 back：從這裡進'] : ['front：可進可出', 'back：可進可出'];
        $('#sqOut', root).innerHTML = `
          <div class="sq-row">${n ? items.map((x, i) => `<div class="sq-cell${i === hit ? ' on' : ''}">${x}</div>`).join('') : '<div class="sq-empty">（空的）</div>'}</div>
          <div class="sq-ends small muted"><span>${ends[0]}</span><span>${ends[1]}</span></div>
          <p class="small" style="margin:8px 0 0">${msg}</p>
          <p class="small muted mono" style="margin:4px 0 0">${v}.size() = ${n}　${v}.empty() = ${n ? 'false' : 'true'}</p>`;
      };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-sq]'); if (!b) return;
        const op = b.dataset.sq, v = vn[mode], inp = $('#sqVal', root), x = Math.trunc(+inp.value || 0);
        hit = -1;
        if (op === 'clear') { items = []; msg = '已清空。'; return run(); }
        if (op.startsWith('push')) {
          if (items.length >= 10) { msg = '示範最多放 10 個元素。'; return run(); }
          if (op === 'push_front') { items.unshift(x); hit = 0; } else { items.push(x); hit = items.length - 1; }
          msg = `<code>${v}.${op}(${x});</code> ${op === 'push_front' ? '從前端加入' : mode === 'stack' ? '放到頂端' : '從後端加入'}，O(1)。`;
          inp.value = x + 10;
          return run();
        }
        if (!items.length) { msg = `<code>${v}.${op}()</code>：容器是空的！對空容器呼叫 ${op}() 是未定義行為，使用前要先檢查 <code>${v}.empty()</code>。`; return run(); }
        if (op === 'top' || op === 'front') { hit = op === 'top' ? items.length - 1 : 0; msg = `<code>${v}.${op}()</code> 回傳 <b>${items[hit]}</b>，只查看、不移除。`; return run(); }
        const fromFront = op === 'pop_front' || (op === 'pop' && mode === 'queue');
        const got = fromFront ? items.shift() : items.pop();
        msg = `<code>${v}.${op}();</code> 移除${fromFront ? '前端' : mode === 'stack' ? '頂端' : '後端'}的 <b>${got}</b>。` + (op === 'pop' ? `注意 STL 的 pop() 不會回傳值，要先用 ${mode === 'stack' ? 'top()' : 'front()'} 取值。` : '');
        run();
      });
      tabsSelect(root, (t, v) => { mode = v; items = []; hit = -1; msg = INTRO[v]; btns(); run(); });
      msg = INTRO.stack; btns(); run();
    }
    if (id === 'hashsim') {
      let mode = 'chain', m = 7, tab = [], keys = [], path = [], hitAt = -1, msg = '', coll = 0;
      const h = k => ((k % m) + m) % m;
      const INTRO = { chain: '鏈結法：每個桶子是一條串列，碰撞的元素接在同一個桶子裡。', probe: '線性探測：位置被佔用就往下一格找，直到找到空位（開放定址法）。' };
      const reset = () => { tab = mode === 'chain' ? Array.from({ length: m }, () => []) : Array(m).fill(null); keys = []; path = []; hitAt = -1; coll = 0; };
      const insert = k => {
        const i0 = h(k);
        if (keys.includes(k)) { path = []; hitAt = -1; return `${k} 已經在表中，雜湊表不存重複的鍵。`; }
        if (mode === 'chain') {
          path = [i0]; hitAt = i0;
          const c = tab[i0].length; if (c) coll++;
          tab[i0].push(k); keys.push(k);
          return `h(${k}) = ${k} mod ${m} = <b>${i0}</b>` + (c ? `，桶子 ${i0} 已有 ${c} 個元素（碰撞），接在串列後面。` : '，放進空的桶子。');
        }
        if (keys.length >= m) { path = []; hitAt = -1; return `插入 ${k}：表格已滿，線性探測無法再插入（實務上負載因子過高前就要擴充表格並重新雜湊）。`; }
        path = []; let i = i0;
        while (tab[i] !== null) { path.push(i); i = (i + 1) % m; }
        path.push(i); hitAt = i; tab[i] = k; keys.push(k);
        if (path.length > 1) coll++;
        return `h(${k}) = ${k} mod ${m} = <b>${i0}</b>` + (path.length > 1 ? `，位置被佔用，依序探測 ${path.join(' → ')}，放進索引 <b>${i}</b>（探測 ${path.length} 次）。` : '，位置是空的，直接放入。');
      };
      const find = k => {
        const i0 = h(k);
        if (mode === 'chain') {
          path = [i0]; const pos = tab[i0].indexOf(k); hitAt = pos >= 0 ? i0 : -1;
          return `h(${k}) = ${i0}，在桶子 ${i0} 的串列中` + (pos >= 0 ? `第 ${pos + 1} 個找到 ${k}。` : `比較了 ${tab[i0].length} 個元素，找不到 ${k}。`);
        }
        path = []; let i = i0;
        for (let c = 0; c < m; c++) {
          path.push(i);
          if (tab[i] === null) { hitAt = -1; return `h(${k}) = ${i0}，探測 ${path.join(' → ')}，遇到空位就停止：${k} 不在表中。`; }
          if (tab[i] === k) { hitAt = i; return `h(${k}) = ${i0}，探測 ${path.join(' → ')}，在索引 ${i} 找到 ${k}（探測 ${path.length} 次）。`; }
          i = (i + 1) % m;
        }
        hitAt = -1; return `探測完整個表格都沒有找到 ${k}。`;
      };
      const run = () => {
        const n = keys.length, lf = n / m;
        const cls = i => `${path.includes(i) ? ' path' : ''}${i === hitAt ? ' on' : ''}`;
        const body = mode === 'chain'
          ? `<div class="hs-chain">${tab.map((b, i) => `<div class="hs-bucket${cls(i)}"><span class="hs-idx">[${i}]</span>${b.map(k => `<span class="hs-key">${k}</span>`).join('<span class="hs-arrow">→</span>') || '<span class="muted">∅</span>'}</div>`).join('')}</div>`
          : `<div class="hs-probe">${tab.map((k, i) => `<div class="hs-slot${cls(i)}"><small>${i}</small><b>${k === null ? '' : k}</b></div>`).join('')}</div>`;
        const warn = mode === 'probe' && lf > 0.7 ? '　<span class="tag warn">α > 0.7，探測會越來越長</span>' : mode === 'chain' && lf > 1 ? '　<span class="tag warn">α > 1，平均每個桶子超過一個元素</span>' : '';
        $('#hsOut', root).innerHTML = body + `<p class="small" style="margin:8px 0 0">${msg}</p><p class="small muted" style="margin:4px 0 0">元素 ${n} 個，負載因子 α = ${n}/${m} = ${lf.toFixed(2)}，碰撞 ${coll} 次${warn}</p>`;
      };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-hs]'); if (!b) return;
        const k = Math.trunc(+$('#hsK', root).value || 0), a = b.dataset.hs;
        if (a === 'ins') msg = insert(k);
        if (a === 'find') msg = find(k);
        if (a === 'clear') { reset(); msg = '已清空。'; }
        if (a === 'demo') { reset(); const log = [15, 22, 8, 29, 36, 1, 43].map(insert); path = []; hitAt = -1; msg = `依序插入 15 22 8 29 36 1 43（m = ${m}）：<br>` + log.join('<br>') + (m === 7 ? '<br><b>這組鍵值除以 7 都餘 1，全部擠在同一處，是雜湊的最壞情況。改成 m = 10 或 11 再試一次。</b>' : ''); }
        run();
      });
      $('#hsM', root).addEventListener('change', e => { m = +e.target.value; reset(); msg = `表格大小改為 ${m}。表格大小通常選質數，鍵值會分布得比較平均。`; run(); });
      tabsSelect(root, (t, v) => { mode = v; reset(); msg = INTRO[v]; run(); });
      reset(); msg = INTRO.chain; run();
    }
    if (id === 'bstviz') {
      let top = null, path = [], hit = null, msg = '';
      const count = n => n ? 1 + count(n.l) + count(n.r) : 0;
      const height = n => n ? 1 + Math.max(height(n.l), height(n.r)) : 0;
      const dir = (v, c) => `${v} ${v < c ? '<' : '>'} ${c} 往${v < c ? '左' : '右'}`;
      const ins = v => {
        if (!top) { top = { v, l: null, r: null }; path = [v]; return `${v} 成為根節點。`; }
        if (count(top) >= 31) return '示範最多 31 個節點。';
        let cur = top; path = []; const steps = [];
        for (;;) {
          path.push(cur.v);
          if (v === cur.v) return `${v} 已經存在，二元搜尋樹不存重複的值。`;
          const side = v < cur.v ? 'l' : 'r';
          steps.push(dir(v, cur.v));
          if (!cur[side]) { cur[side] = { v, l: null, r: null }; path.push(v); return `插入 ${v}：${steps.join('，')}，放在空位。`; }
          cur = cur[side];
        }
      };
      const find = v => {
        let cur = top; path = []; const steps = [];
        while (cur) {
          path.push(cur.v);
          if (v === cur.v) { hit = v; return `搜尋 ${v}：${steps.concat(`找到 ${v}`).join('，')}，共比較 ${path.length} 次。`; }
          steps.push(dir(v, cur.v));
          cur = v < cur.v ? cur.l : cur.r;
        }
        return `搜尋 ${v}：${steps.join('，') || '樹是空的'}，走到空的位置，${v} 不在樹中。`;
      };
      const del = v => {
        let parent = null, cur = top;
        while (cur && cur.v !== v) { parent = cur; cur = v < cur.v ? cur.l : cur.r; }
        if (!cur) return `${v} 不在樹中，無法刪除。`;
        if (cur.l && cur.r) {
          let sp = cur, s = cur.r;
          while (s.l) { sp = s; s = s.l; }
          cur.v = s.v;
          if (sp === cur) sp.r = s.r; else sp.l = s.r;
          path = [s.v];
          return `${v} 有兩個子節點：用右子樹中最小的 ${s.v}（中序後繼者）取代它，再刪除原本的 ${s.v}。`;
        }
        const child = cur.l || cur.r;
        if (!parent) top = child; else if (parent.l === cur) parent.l = child; else parent.r = child;
        return child ? `${v} 只有一個子節點，讓子節點 ${child.v} 接到它的位置。` : `${v} 是葉節點，直接移除。`;
      };
      const walk = (n, order, out) => { if (!n) return out; if (order === 'pre') out.push(n.v); walk(n.l, order, out); if (order === 'in') out.push(n.v); walk(n.r, order, out); if (order === 'post') out.push(n.v); return out; };
      const level = () => { const out = [], q = top ? [top] : []; while (q.length) { const n = q.shift(); out.push(n.v); if (n.l) q.push(n.l); if (n.r) q.push(n.r); } return out; };
      const run = () => {
        const nodes = [], edges = []; let x = 0;
        const lay = (n, d) => { if (!n) return; lay(n.l, d + 1); nodes.push({ id: n.v, x: x++, d, label: n.v, cls: n.v === hit ? 'on' : path.includes(n.v) ? 'path' : '' }); lay(n.r, d + 1); if (n.l) edges.push([n.v, n.l.v]); if (n.r) edges.push([n.v, n.r.v]); };
        lay(top, 0);
        const cnt = nodes.length, hgt = height(top);
        $('#bvOut', root).innerHTML = `<div class="tv-wrap">${treeSvg(nodes, edges)}</div>
          <p class="small" style="margin:8px 0 0">${msg}</p>
          <table class="tbl" style="margin-top:8px">
            <tr><td>前序（根左右）</td><td class="mono">${walk(top, 'pre', []).join(' ') || '—'}</td></tr>
            <tr><td>中序（左根右）</td><td class="mono">${walk(top, 'in', []).join(' ') || '—'}</td></tr>
            <tr><td>後序（左右根）</td><td class="mono">${walk(top, 'post', []).join(' ') || '—'}</td></tr>
            <tr><td>層序（BFS）</td><td class="mono">${level().join(' ') || '—'}</td></tr>
          </table>
          <p class="small muted" style="margin:6px 0 0">節點 ${cnt} 個、共 ${hgt} 層（最少可以只有 ${cnt ? Math.ceil(Math.log2(cnt + 1)) : 0} 層）。中序走訪一定由小到大。${cnt >= 4 && hgt === cnt ? '　<span class="tag warn">已退化成鏈結串列，搜尋變成 O(n)</span>' : ''}</p>`;
      };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-bv]'); if (!b) return;
        const a = b.dataset.bv, nums = ($('#bvVal', root).value.match(/-?\d+/g) || []).map(Number).slice(0, 20);
        const many = list => { top = null; list.forEach(ins); path = []; };
        hit = null; path = [];
        if (a === 'ins') { if (!nums.length) msg = '請輸入數字。'; else { msg = nums.map(ins).join('<br>'); if (nums.length > 1) path = []; } }
        if (a === 'find') msg = nums.length ? find(nums[0]) : '請輸入要搜尋的數字。';
        if (a === 'del') msg = nums.length ? del(nums[0]) : '請輸入要刪除的數字。';
        if (a === 'demo') { many([50, 30, 70, 20, 40, 60, 80]); msg = '平衡的範例：7 個節點只有 3 層，搜尋最多比較 3 次。'; }
        if (a === 'line') { many([10, 20, 30, 40, 50]); msg = '依遞增順序插入，每個節點都只有右子節點，退化成鏈結串列。'; }
        if (a === 'rand') { const s = new Set(); while (s.size < 8) s.add(1 + Math.floor(Math.random() * 99)); many([...s]); msg = `隨機依序插入：${[...s].join(' ')}`; }
        if (a === 'clear') { top = null; msg = '已清空。'; }
        run();
      });
      [50, 30, 70, 20, 40, 60, 80].forEach(ins); path = [];
      msg = '已插入範例 50 30 70 20 40 60 80。輸入數字後按「插入」「搜尋」或「刪除」。'; run();
    }
    if (id === 'heapviz') {
      let mode = 'min', a = [], mark = [], msg = '';
      const better = (x, y) => mode === 'min' ? x < y : x > y;
      const word = () => mode === 'min' ? '最小' : '最大';
      const swap = (i, j) => { [a[i], a[j]] = [a[j], a[i]]; };
      const up = i => { const log = []; while (i > 0) { const p = (i - 1) >> 1; if (!better(a[i], a[p])) break; log.push(`與父節點 ${a[p]} 交換`); swap(i, p); i = p; mark.push(i); } return log; };
      const down = i => {
        const log = [];
        for (;;) {
          const l = 2 * i + 1, r = l + 1; let b = i;
          if (l < a.length && better(a[l], a[b])) b = l;
          if (r < a.length && better(a[r], a[b])) b = r;
          if (b === i) return log;
          log.push(`與${b === l ? '左' : '右'}子節點 ${a[b]} 交換`); swap(i, b); i = b; mark.push(i);
        }
      };
      const push = x => {
        if (a.length >= 15) return '示範最多 15 個元素。';
        a.push(x); mark = [a.length - 1];
        const log = up(a.length - 1);
        return `push(${x})：先放在陣列最後（索引 ${mark[0]}），` + (log.length ? `${log.join('，')}，上浮 ${log.length} 層。` : `不比父節點${mode === 'min' ? '小' : '大'}，不用移動。`);
      };
      const build = list => {
        a = list.slice(0, 15); mark = []; let k = 0;
        for (let i = (a.length >> 1) - 1; i >= 0; i--) k += down(i).length;
        mark = [];
        return `由下而上建堆積：從最後一個非葉節點（索引 ${Math.max(0, (a.length >> 1) - 1)}）往前逐一下沉，共交換 ${k} 次，時間複雜度 O(n)。`;
      };
      const run = () => {
        const nodes = a.map((v, i) => ({ id: i, d: Math.floor(Math.log2(i + 1)), label: v, cls: mark.includes(i) ? 'path' : i === 0 ? 'top' : '' }));
        let x = 0; const lay = i => { if (i >= a.length) return; lay(2 * i + 1); nodes[i].x = x++; lay(2 * i + 2); }; lay(0);
        const edges = a.map((_, i) => i ? [(i - 1) >> 1, i] : null).filter(Boolean);
        $('#hpOut', root).innerHTML = `
          <div class="hp-arr">${a.map((v, i) => `<div class="hp-cell${mark.includes(i) ? ' path' : ''}${i === 0 ? ' top' : ''}"><small>${i}</small><b>${v}</b></div>`).join('') || '<span class="small muted">（空的）</span>'}</div>
          <div class="tv-wrap">${treeSvg(nodes, edges)}</div>
          <p class="small" style="margin:8px 0 0">${msg}</p>
          <p class="small muted" style="margin:4px 0 0">${word()}堆積：每個節點都${mode === 'min' ? '小於' : '大於'}或等於子節點，頂端 a[0] 就是${word()}值。索引 i 的父節點是 (i - 1) / 2，子節點是 2i + 1 與 2i + 2。</p>`;
      };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-hp]'); if (!b) return;
        const act = b.dataset.hp, nums = ($('#hpVal', root).value.match(/-?\d+/g) || []).map(Number).slice(0, 15);
        if (act === 'push') msg = nums.length ? nums.map(push).join('<br>') : '請輸入數字。';
        if (act === 'pop') {
          if (!a.length) { mark = []; msg = '堆積是空的，不能 pop。'; }
          else {
            const t = a[0], last = a.pop();
            if (a.length) { a[0] = last; mark = [0]; const log = down(0); msg = `pop()：取出頂端的 ${t}，把最後一個元素 ${last} 移到根，` + (log.length ? `${log.join('，')}，下沉 ${log.length} 層。` : '不用移動。'); }
            else { mark = []; msg = `pop()：取出 ${t}，堆積變成空的。`; }
          }
        }
        if (act === 'build') msg = nums.length ? build(nums) : '請輸入數字，例如 5 3 8 1 9 2。';
        if (act === 'clear') { a = []; mark = []; msg = '已清空。'; }
        run();
      });
      tabsSelect(root, (t, v) => { mode = v; msg = `切換為${word()}堆積，重新建堆積。` + build(a); run(); });
      [5, 3, 8, 1, 9, 2].forEach(push); mark = [];
      msg = '已依序 push 5 3 8 1 9 2。試試 push 一個很小的數，或按 pop 取出頂端。'; run();
    }
    if (id === 'sortviz') {
      let algo = 'bubble', src = [38, 27, 43, 3, 9, 82, 10], steps = [];
      const gen = () => {
        const a = [...src], n = a.length, S = [], done = new Set(); let cmp = 0, swp = 0;
        const snap = (hl, msg) => S.push({ a: [...a], hl, done: new Set(done), msg, cmp, swp });
        const sw = (i, j) => { [a[i], a[j]] = [a[j], a[i]]; swp++; };
        snap({}, '初始陣列。按「下一步」開始。');
        if (algo === 'bubble') {
          for (let i = 0; i < n - 1; i++) {
            let any = false;
            for (let j = 0; j < n - 1 - i; j++) {
              cmp++;
              const x = a[j], y = a[j + 1];
              if (x > y) { sw(j, j + 1); any = true; snap({ [j]: 'swap', [j + 1]: 'swap' }, `第 ${i + 1} 輪：${x} > ${y}，交換。`); }
              else snap({ [j]: 'cmp', [j + 1]: 'cmp' }, `第 ${i + 1} 輪：比較 ${x} 與 ${y}，順序正確，不交換。`);
            }
            done.add(n - 1 - i);
            if (!any) { snap({}, `第 ${i + 1} 輪沒有發生任何交換，表示已經排好，提早結束。`); break; }
            snap({}, `第 ${i + 1} 輪結束：這一輪最大的 ${a[n - 1 - i]} 浮到位置 ${n - 1 - i}。`);
          }
        }
        if (algo === 'insert') {
          for (let i = 1; i < n; i++) {
            let j = i;
            snap({ [i]: 'key' }, `取出 a[${i}] = ${a[i]}，往左插入前面已排好的部分。`);
            while (j > 0) {
              cmp++;
              const x = a[j - 1], y = a[j];
              if (x > y) { sw(j - 1, j); snap({ [j - 1]: 'swap', [j]: 'swap' }, `${x} > ${y}，${y} 往左移一格。`); j--; }
              else { snap({ [j - 1]: 'cmp', [j]: 'key' }, `${x} ≤ ${y}，停止：${y} 已插入正確位置。`); break; }
            }
            if (j === 0) snap({ 0: 'key' }, `${a[0]} 是目前最小的，放到最前面。`);
          }
        }
        if (algo === 'select') {
          for (let i = 0; i < n - 1; i++) {
            let mi = i;
            for (let j = i + 1; j < n; j++) {
              cmp++;
              if (a[j] < a[mi]) { mi = j; snap({ [i]: 'cur', [j]: 'key' }, `${a[j]} 更小，記為目前的最小值。`); }
              else snap({ [i]: 'cur', [j]: 'cmp', [mi]: 'key' }, `比較 ${a[j]} 與目前最小值 ${a[mi]}。`);
            }
            done.add(i);
            if (mi !== i) { const x = a[i], y = a[mi]; sw(i, mi); snap({ [i]: 'swap', [mi]: 'swap' }, `把最小值 ${y} 與位置 ${i} 的 ${x} 交換。`); }
            else snap({ [i]: 'key' }, `${a[i]} 已經是最小值，不用交換。`);
          }
        }
        if (algo === 'quick') {
          const qs = (lo, hi) => {
            if (lo > hi) return;
            if (lo === hi) { done.add(lo); return; }
            const p = a[hi], rng = {}; let i = lo;
            for (let k = lo; k <= hi; k++) rng[k] = 'range';
            snap({ ...rng, [hi]: 'pivot' }, `處理區間 [${lo}, ${hi}]，選最後一個元素 ${p} 當樞紐。`);
            for (let j = lo; j < hi; j++) {
              cmp++;
              if (a[j] < p) {
                const x = a[i], y = a[j];
                if (i !== j) sw(i, j);
                snap({ ...rng, [hi]: 'pivot', [i]: 'swap', [j]: 'swap' }, i !== j ? `${y} < ${p}，與位置 ${i} 的 ${x} 交換，放到左邊。` : `${y} < ${p}，留在左邊。`);
                i++;
              } else snap({ ...rng, [hi]: 'pivot', [j]: 'cmp' }, `${a[j]} ≥ ${p}，留在右邊。`);
            }
            if (i !== hi) sw(i, hi);
            done.add(i);
            snap({ [i]: 'pivot' }, `把樞紐 ${p} 放到位置 ${i}：左邊都比它小，右邊都不小於它。`);
            qs(lo, i - 1); qs(i + 1, hi);
          };
          qs(0, n - 1);
        }
        if (algo === 'merge') {
          const ms = (l, r) => {
            if (r - l <= 1) return;
            const m = (l + r) >> 1; ms(l, m); ms(m, r);
            const rng = {}; for (let k = l; k < r; k++) rng[k] = 'range';
            snap(rng, `合併 [${l}, ${m - 1}] 與 [${m}, ${r - 1}] 兩段已排好的部分。`);
            const L = a.slice(l, m), R = a.slice(m, r); let i = 0, j = 0, k = l;
            while (i < L.length || j < R.length) {
              let v;
              if (j >= R.length || (i < L.length && L[i] <= R[j])) { if (j < R.length) cmp++; v = L[i++]; }
              else { if (i < L.length) cmp++; v = R[j++]; }
              a[k] = v; swp++;
              snap({ ...rng, [k]: 'swap' }, `取兩段開頭中較小的 ${v}，寫到位置 ${k}。`);
              k++;
            }
          };
          ms(0, n);
        }
        for (let k = 0; k < n; k++) done.add(k);
        snap({}, `排序完成！共比較 ${cmp} 次、${algo === 'merge' ? '寫入' : '交換'} ${swp} 次。`);
        return S;
      };
      const draw = i => {
        const s = steps[i], mx = Math.max(...s.a, 1);
        $('#svBars', root).innerHTML = s.a.map((v, k) => `<div class="sv-bar ${s.hl[k] || (s.done.has(k) ? 'done' : '')}"><i style="height:${Math.max(3, v / mx * 85)}%"></i><span>${v}</span></div>`).join('');
        $('#svMsg', root).innerHTML = `${esc(s.msg)}<br><span class="muted">比較 ${s.cmp} 次、${algo === 'merge' ? '寫入' : '交換'} ${s.swp} 次</span>`;
      };
      const go = stepCtl(root, 'sv', () => steps.length, draw, 600);
      const rebuild = () => { steps = gen(); go(0); };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-svx]'); if (!b) return;
        const inp = $('#svArr', root);
        if (b.dataset.svx === 'rand') inp.value = Array.from({ length: 8 }, () => 1 + Math.floor(Math.random() * 99)).join(' ');
        if (b.dataset.svx === 'sorted') inp.value = '3 9 10 27 82 38 43 50';
        const nums = (inp.value.match(/\d+/g) || []).map(Number).filter(x => x <= 999).slice(0, 12);
        if (nums.length < 2) { $('#svMsg', root).textContent = '請輸入 2～12 個 0～999 的整數。'; return; }
        src = nums; inp.value = nums.join(' '); rebuild();
      });
      tabsSelect(root, (t, v) => { algo = v; rebuild(); });
      rebuild();
    }
    if (id === 'bsearch') {
      let mode = 'find', arr = [], t = 0, steps = [];
      const gen = () => {
        const S = [], n = arr.length;
        if (mode === 'find') {
          let lo = 0, hi = n - 1;
          S.push({ lo, hi, mid: -1, msg: `閉區間寫法：lo = 0、hi = n - 1 = ${hi}，答案若存在，一定在 [lo, hi] 之內。` });
          while (lo <= hi) {
            const mid = lo + ((hi - lo) >> 1);
            if (arr[mid] === t) { S.push({ lo, hi, mid, found: mid, msg: `mid = ${lo} + (${hi} - ${lo}) / 2 = ${mid}，a[${mid}] = ${arr[mid]} 等於 ${t}，找到了！回傳 ${mid}，共比較 ${S.length} 次。` }); return S; }
            if (arr[mid] < t) { S.push({ lo, hi, mid, msg: `mid = ${lo} + (${hi} - ${lo}) / 2 = ${mid}，a[${mid}] = ${arr[mid]} < ${t}，答案在右半：lo = mid + 1 = ${mid + 1}。` }); lo = mid + 1; }
            else { S.push({ lo, hi, mid, msg: `mid = ${lo} + (${hi} - ${lo}) / 2 = ${mid}，a[${mid}] = ${arr[mid]} > ${t}，答案在左半：hi = mid - 1 = ${mid - 1}。` }); hi = mid - 1; }
          }
          S.push({ lo, hi, mid: -1, msg: `lo = ${lo} > hi = ${hi}，區間已經空了，${t} 不在陣列中，回傳 -1。共比較 ${S.length - 1} 次。` });
        } else {
          let lo = 0, hi = n;
          S.push({ lo, hi, mid: -1, half: 1, msg: `半開區間寫法：lo = 0、hi = n = ${n}，答案在 [lo, hi) 之內（答案可能是 n，代表全部都比 x 小）。` });
          while (lo < hi) {
            const mid = lo + ((hi - lo) >> 1);
            if (arr[mid] >= t) { S.push({ lo, hi, mid, half: 1, msg: `mid = ${mid}，a[${mid}] = ${arr[mid]} ≥ ${t}，mid 可能就是答案，要保留：hi = mid = ${mid}。` }); hi = mid; }
            else { S.push({ lo, hi, mid, half: 1, msg: `mid = ${mid}，a[${mid}] = ${arr[mid]} < ${t}，答案在 mid 的右邊：lo = mid + 1 = ${mid + 1}。` }); lo = mid + 1; }
          }
          S.push({ lo, hi, mid: -1, half: 1, found: lo < n ? lo : -1, end: lo === n, msg: lo < n ? `lo = hi = ${lo}，第一個 ≥ ${t} 的位置是 ${lo}（a[${lo}] = ${arr[lo]}）。` + (arr[lo] === t ? `${t} 存在於陣列中。` : `陣列中沒有 ${t}，${lo} 是它應該插入的位置。`) : `lo = hi = ${n}（等於 n），陣列中所有元素都比 ${t} 小。` });
        }
        return S;
      };
      const draw = i => {
        const s = steps[i], n = arr.length, inR = k => s.half ? k >= s.lo && k < s.hi : k >= s.lo && k <= s.hi;
        const tags = k => [k === s.lo && 'lo', k === s.mid && 'mid', k === s.hi && 'hi'].filter(Boolean).join(' ');
        const cells = arr.map((v, k) => `<div class="bs-cell${inR(k) ? '' : ' out'}${k === s.mid ? ' mid' : ''}${k === s.found ? ' on' : ''}"><small>${k}</small><b>${v}</b><span>${tags(k)}</span></div>`);
        if (s.half) cells.push(`<div class="bs-cell end${s.end ? ' on' : ''}"><small>${n}</small><b>·</b><span>${tags(n)}</span></div>`);
        $('#bsCells', root).innerHTML = cells.join('');
        $('#bsVars', root).textContent = `lo = ${s.lo}   hi = ${s.hi}${s.mid >= 0 ? `   mid = ${s.mid}   a[mid] = ${arr[s.mid]}` : ''}   x = ${t}`;
        $('#bsMsg', root).textContent = s.msg;
      };
      const go = stepCtl(root, 'bs', () => steps.length, draw, 1000);
      const rebuild = () => {
        arr = ($('#bsArr', root).value.match(/-?\d+/g) || []).map(Number).slice(0, 16).sort((x, y) => x - y);
        if (!arr.length) arr = [1];
        $('#bsArr', root).value = arr.join(' ');
        t = Math.trunc(+$('#bsT', root).value || 0); steps = gen(); go(0);
      };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-bsx]'); if (!b) return;
        if (b.dataset.bsx === 'rand') {
          const s = []; let v = 1;
          for (let k = 0; k < 12; k++) { v += (mode === 'lb' ? 0 : 1) + Math.floor(Math.random() * 6); s.push(v); }
          $('#bsArr', root).value = s.join(' '); $('#bsT', root).value = s[Math.floor(Math.random() * 12)] + (Math.random() < .3 ? 1 : 0);
        }
        rebuild();
      });
      root.addEventListener('change', e => { if (e.target.id === 'bsT' || e.target.id === 'bsArr') rebuild(); });
      tabsSelect(root, (tb, v) => {
        mode = v;
        if (v === 'lb' && $('#bsArr', root).value === '2 5 8 12 16 23 38 56 72 91') { $('#bsArr', root).value = '1 3 3 3 5 8 13'; $('#bsT', root).value = 3; }
        rebuild();
      });
      rebuild();
    }
    if (id === 'dpgrid') {
      let mode = 'knap', M;
      const INPUTS = {
        knap: [['dgW', '重量', '1 3 4 5'], ['dgV', '價值', '15 20 30 55'], ['dgC', '容量 W', '8']],
        lcs: [['dgA', '字串 A', 'ABCBDAB'], ['dgB', '字串 B', 'BDCABA']],
        edit: [['dgA', '字串 A', 'kitten'], ['dgB', '字串 B', 'sitting']]
      };
      const INTRO = {
        knap: 'dp[i][j]：只考慮前 i 個物品、背包容量為 j 時的最大價值。第 0 列（沒有物品）全部是 0。',
        lcs: 'dp[i][j]：A 的前 i 個字元與 B 的前 j 個字元的 LCS 長度。第 0 列與第 0 欄代表空字串，值為 0。',
        edit: 'dp[i][j]：把 A 的前 i 個字元變成 B 的前 j 個字元的最少操作數。第 0 列要插入 j 次、第 0 欄要刪除 i 次。'
      };
      const inputs = () => { $('#dgIn', root).innerHTML = INPUTS[mode].map(([k, l, v]) => `<label class="small">${l} <input class="input mono" id="${k}" value="${v}" style="width:${k === 'dgC' ? 60 : 130}px"></label>`).join('') + '<button class="btn sm outline" type="button" data-dgx="apply">重新計算</button>'; };
      const build = () => {
        const g = k => ($('#' + k, root) || {}).value || '';
        let R, C, val, rh, ch, base, info, after;
        if (mode === 'knap') {
          const w = (g('dgW').match(/\d+/g) || []).map(Number).slice(0, 6), v = (g('dgV').match(/\d+/g) || []).map(Number);
          const n = Math.min(w.length, v.length), W = Math.min(15, Math.max(1, +(g('dgC').match(/\d+/) || [8])[0]));
          R = n + 1; C = W + 1;
          val = Array.from({ length: R }, () => Array(C).fill(0));
          rh = ['0 個物品'].concat(w.slice(0, n).map((x, i) => `物品 ${i + 1}（w=${x}, v=${v[i]}）`));
          ch = Array.from({ length: C }, (_, j) => j);
          base = i => i === 0;
          info = (i, j) => {
            const wi = w[i - 1], vi = v[i - 1], skip = val[i - 1][j];
            if (j < wi) { val[i][j] = skip; return { deps: [[i - 1, j]], msg: `dp[${i}][${j}]：容量 ${j} 放不下物品 ${i}（重量 ${wi}），只能不選 = dp[${i - 1}][${j}] = ${skip}。` }; }
            const take = val[i - 1][j - wi] + vi; val[i][j] = Math.max(skip, take);
            return { deps: [[i - 1, j], [i - 1, j - wi]], msg: `dp[${i}][${j}] = max(不選：dp[${i - 1}][${j}] = ${skip}，選物品 ${i}：dp[${i - 1}][${j - wi}] + ${vi} = ${take}) = ${val[i][j]}。` };
          };
          after = path => {
            let j = W; const pick = [];
            for (let i = n; i >= 1; i--) { path.push([i, j]); if (val[i][j] !== val[i - 1][j]) { pick.unshift(i); j -= w[i - 1]; } }
            path.push([0, j]);
            return `最大價值 dp[${n}][${W}] = ${val[n][W]}。由右下角回溯：值和上一列不同就代表選了該物品，所以選擇物品 ${pick.join('、') || '（無）'}。`;
          };
        } else {
          const A = [...g('dgA')].slice(0, 10), B = [...g('dgB')].slice(0, 10), n = A.length, m = B.length, ed = mode === 'edit';
          R = n + 1; C = m + 1;
          val = Array.from({ length: R }, (_, i) => Array.from({ length: C }, (_, j) => ed ? (i === 0 ? j : j === 0 ? i : 0) : 0));
          rh = ['∅'].concat(A); ch = ['∅'].concat(B);
          base = (i, j) => i === 0 || j === 0;
          info = (i, j) => {
            const a = A[i - 1], b = B[j - 1];
            if (!ed) {
              if (a === b) { val[i][j] = val[i - 1][j - 1] + 1; return { deps: [[i - 1, j - 1]], msg: `'${a}' = '${b}'，字元相同：dp[${i}][${j}] = 左上 dp[${i - 1}][${j - 1}] + 1 = ${val[i][j]}。` }; }
              val[i][j] = Math.max(val[i - 1][j], val[i][j - 1]);
              return { deps: [[i - 1, j], [i, j - 1]], msg: `'${a}' ≠ '${b}'：dp[${i}][${j}] = max(上方 ${val[i - 1][j]}，左方 ${val[i][j - 1]}) = ${val[i][j]}。` };
            }
            if (a === b) { val[i][j] = val[i - 1][j - 1]; return { deps: [[i - 1, j - 1]], msg: `'${a}' = '${b}'，不需要操作：dp[${i}][${j}] = 左上 ${val[i][j]}。` }; }
            const del = val[i - 1][j], ins = val[i][j - 1], rep = val[i - 1][j - 1];
            val[i][j] = 1 + Math.min(del, ins, rep);
            return { deps: [[i - 1, j], [i, j - 1], [i - 1, j - 1]], msg: `'${a}' ≠ '${b}'：dp[${i}][${j}] = 1 + min(刪除：上方 ${del}，插入：左方 ${ins}，替換：左上 ${rep}) = ${val[i][j]}。` };
          };
          after = path => {
            let i = n, j = m;
            if (!ed) {
              let s = '';
              while (i > 0 && j > 0) {
                path.push([i, j]);
                if (A[i - 1] === B[j - 1]) { s = A[i - 1] + s; i--; j--; } else if (val[i - 1][j] >= val[i][j - 1]) i--; else j--;
              }
              path.push([i, j]);
              return `LCS 長度 dp[${n}][${m}] = ${val[n][m]}。由右下角回溯（字元相同就往左上並記下字元），得到其中一組 LCS：${s || '（空）'}。`;
            }
            const ops = [];
            while (i > 0 || j > 0) {
              path.push([i, j]);
              if (i > 0 && j > 0 && A[i - 1] === B[j - 1]) { i--; j--; }
              else if (i > 0 && j > 0 && val[i][j] === val[i - 1][j - 1] + 1) { ops.unshift(`替換 ${A[i - 1]}→${B[j - 1]}`); i--; j--; }
              else if (i > 0 && val[i][j] === val[i - 1][j] + 1) { ops.unshift(`刪除 ${A[i - 1]}`); i--; }
              else { ops.unshift(`插入 ${B[j - 1]}`); j--; }
            }
            path.push([0, 0]);
            return `編輯距離 dp[${n}][${m}] = ${val[n][m]}。回溯得到的操作：${ops.join('、') || '（兩字串相同）'}。`;
          };
        }
        const cells = [];
        for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) if (!base(i, j)) cells.push({ i, j, ...info(i, j) });
        const path = [], answer = after(path);
        return { R, C, val, rh, ch, base, cells, path, answer };
      };
      const draw = k => {
        const { R, C, val, rh, ch, base, cells, path } = M;
        const filled = new Set(cells.slice(0, Math.min(k, cells.length)).map(c => c.i + ',' + c.j));
        const cur = k >= 1 && k <= cells.length ? cells[k - 1] : null;
        const dep = new Set((cur ? cur.deps : []).map(([i, j]) => i + ',' + j));
        const onPath = new Set(k > cells.length ? path.map(([i, j]) => i + ',' + j) : []);
        let h = `<table class="dg-t"><tr><th>${mode === 'knap' ? '物品＼容量' : 'A＼B'}</th>${ch.map(c => `<th>${esc(c)}</th>`).join('')}</tr>`;
        for (let i = 0; i < R; i++) {
          h += `<tr><th>${esc(rh[i])}</th>`;
          for (let j = 0; j < C; j++) {
            const key = i + ',' + j, show = base(i, j) || filled.has(key);
            const cls = cur && cur.i === i && cur.j === j ? 'cur' : dep.has(key) ? 'dep' : onPath.has(key) ? 'path' : base(i, j) ? 'base' : '';
            h += `<td class="${cls}">${show ? val[i][j] : ''}</td>`;
          }
          h += '</tr>';
        }
        $('#dgTbl', root).innerHTML = h + '</table>';
        $('#dgMsg', root).textContent = k === 0 ? INTRO[mode] : cur ? cur.msg : M.answer;
      };
      const go = stepCtl(root, 'dg', () => M.cells.length + 2, draw, 350);
      const rebuild = () => { M = build(); go(0); };
      root.addEventListener('click', e => { if (e.target.closest('[data-dgx]')) rebuild(); });
      tabsSelect(root, (t, v) => { mode = v; inputs(); rebuild(); });
      inputs(); rebuild();
    }
    if (id === 'graphpath') {
      const POS = [[40, 120], [130, 35], [150, 125], [280, 40], [320, 170], [160, 205]];
      const E = [[0, 1, 7], [0, 2, 9], [0, 5, 14], [1, 2, 10], [1, 3, 15], [2, 3, 11], [2, 5, 2], [3, 4, 6], [4, 5, 9]];
      const adj = POS.map(() => []);
      E.forEach(([u, v, w]) => { adj[u].push([v, w]); adj[v].push([u, w]); });
      adj.forEach(l => l.sort((x, y) => x[0] - y[0]));
      let algo = 'dij', src = 0, steps = [];
      const gen = () => {
        const n = POS.length, d = Array(n).fill(Infinity), prev = Array(n).fill(-1), fin = Array(n).fill(false), S = [];
        const snap = (cur, relax, msg, q) => S.push({ d: [...d], prev: [...prev], fin: [...fin], cur, relax, msg, q });
        d[src] = 0;
        if (algo === 'dij') {
          snap(-1, [], `起點 ${src} 的距離設為 0，其他頂點設為 ∞。每一步取出「尚未確定、目前距離最小」的頂點。`);
          for (;;) {
            let u = -1;
            for (let i = 0; i < n; i++) if (!fin[i] && d[i] < Infinity && (u < 0 || d[i] < d[u])) u = i;
            if (u < 0) break;
            fin[u] = true; const relax = [], log = [];
            for (const [v, w] of adj[u]) {
              if (fin[v]) continue;
              if (d[u] + w < d[v]) { log.push(`${v}：${d[v] === Infinity ? '∞' : d[v]} → ${d[u]} + ${w} = ${d[u] + w}`); d[v] = d[u] + w; prev[v] = u; relax.push([u, v]); }
              else log.push(`${v}：${d[u]} + ${w} = ${d[u] + w} 沒有比 ${d[v]} 短，不更新`);
            }
            snap(u, relax, `取出頂點 ${u}（距離 ${d[u]}，已確定是最短）。鬆弛相鄰的邊：${log.join('；') || '沒有尚未確定的鄰居'}。`);
          }
        } else {
          const q = [src], seen = Array(n).fill(false); seen[src] = true;
          snap(-1, [], `起點 ${src} 放入佇列，距離為 0。BFS 忽略權重，求的是「最少經過幾條邊」。`, [...q]);
          while (q.length) {
            const u = q.shift(), relax = [], add = [];
            fin[u] = true;
            for (const [v] of adj[u]) if (!seen[v]) { seen[v] = true; d[v] = d[u] + 1; prev[v] = u; q.push(v); relax.push([u, v]); add.push(v); }
            snap(u, relax, `取出頂點 ${u}（${d[u]} 條邊）。${add.length ? `把還沒拜訪過的鄰居 ${add.join('、')} 加入佇列，距離設為 ${d[u] + 1}。` : '沒有新的鄰居。'}`, [...q]);
          }
        }
        S.push({ ...S[S.length - 1], cur: -1, relax: [], final: true, msg: algo === 'dij' ? '完成！綠色粗線是最短路徑樹，下方列出到每個頂點的最短路徑。' : '完成！BFS 找到的是邊數最少的路徑，不一定是權重總和最小的路徑（可切換到 Dijkstra 比較）。' });
        return S;
      };
      const draw = i => {
        const s = steps[i];
        const isT = (u, v) => s.prev[v] === u || s.prev[u] === v;
        const isR = (u, v) => s.relax.some(([x, y]) => (x === u && y === v) || (x === v && y === u));
        $('#gpSvg', root).innerHTML = `<svg class="gp-svg" viewBox="0 0 360 240">${E.map(([u, v, w]) => {
          const [x1, y1] = POS[u], [x2, y2] = POS[v];
          return `<g class="${isR(u, v) ? 'relax' : isT(u, v) ? 'tree' : ''}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>${algo === 'dij' ? `<text class="w" x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2}">${w}</text>` : ''}</g>`;
        }).join('')}${POS.map(([x, y], k) => `<g class="nd ${k === s.cur ? 'cur' : s.fin[k] ? 'done' : s.d[k] < Infinity ? 'front' : ''}"><circle cx="${x}" cy="${y}" r="17"/><text x="${x}" y="${y}">${k}</text><text class="dl" x="${x}" y="${y - 26}">${s.d[k] === Infinity ? '∞' : s.d[k]}</text></g>`).join('')}</svg>`;
        const pathTo = k => { const p = []; for (let x = k; x !== -1; x = s.prev[x]) p.unshift(x); return p.join(' → '); };
        $('#gpTbl', root).innerHTML = `<div class="table-wrap"><table class="tbl small" style="margin-top:8px"><tr><th>頂點</th>${POS.map((_, k) => `<th>${k}</th>`).join('')}</tr><tr><td>${algo === 'dij' ? '距離' : '邊數'}</td>${s.d.map((x, k) => `<td class="mono${s.fin[k] ? ' gp-fin' : ''}">${x === Infinity ? '∞' : x}</td>`).join('')}</tr>${s.q ? `<tr><td>佇列</td><td colspan="${POS.length}" class="mono">${s.q.join(' ') || '（空）'}</td></tr>` : ''}</table></div>`
          + (s.final ? `<div class="out" style="margin-top:8px">${POS.map((_, k) => `${k}：${pathTo(k)}（${algo === 'dij' ? '距離' : '邊數'} ${s.d[k]}）`).join('\n')}</div>` : '');
        $('#gpMsg', root).textContent = s.msg;
      };
      const go = stepCtl(root, 'gp', () => steps.length, draw, 1100);
      const rebuild = () => { steps = gen(); go(0); };
      $('#gpSrc', root).addEventListener('change', e => { src = +e.target.value; rebuild(); });
      tabsSelect(root, (t, v) => { algo = v; rebuild(); });
      rebuild();
    }
    if (id === 'jsxconv') {
      const EX = [
        '<h1 className="title">Hello, React!</h1>',
        'const user = { name: \'小明\', avatar: \'me.png\' };\nconst el = (\n  <div style={{ color: \'red\' }} onClick={() => alert(1)}>\n    <img src={user.avatar} alt="" />\n    你好，{user.name}，今天 {2 + 3} 度\n  </div>\n);',
        'function Card({ title, children }) {\n  return <section><h2>{title}</h2>{children}</section>;\n}\n\nconst el = <Card title="公告"><p>明天放假</p></Card>;',
        'const el = (\n  <ul>\n    {isLoggedIn ? <li>歡迎</li> : <li>請登入</li>}\n    {items.map(item => <li key={item.id}>{item.name}</li>)}\n  </ul>\n);',
        'const el = (\n  <>\n    <h2>標題</h2>\n    <p>內文</p>\n  </>\n);'
      ];
      let rt = 'classic', timer = null, babel = null;
      const load = () => babel || (babel = new Promise((ok, fail) => {
        if (window.Babel) return ok(window.Babel);
        const s = document.createElement('script');
        s.src = '/static/vendor/react/babel.min.js';
        s.onload = () => ok(window.Babel);
        s.onerror = () => { babel = null; s.remove(); fail(new Error('load')); };
        document.head.appendChild(s);
      }));
      const run = async () => {
        const st = $('#jcSt', root), out = $('#jcOut', root);
        if (!window.Babel) st.textContent = '第一次使用，正在載入 Babel（約 3 MB）…';
        try { await load(); } catch { st.textContent = ''; out.textContent = '無法載入 Babel，請檢查網路連線後再試一次。'; return; }
        st.textContent = '';
        try {
          out.textContent = window.Babel.transform($('#jcIn', root).value, { presets: [['react', { runtime: rt }]], sourceType: 'module', filename: 'App.jsx' }).code;
          out.classList.remove('bad');
        } catch (e) { out.textContent = '語法錯誤：' + String(e.message).replace(/^\/?App\.jsx: /, ''); out.classList.add('bad'); }
        $('#jcNote', root).textContent = rt === 'classic'
          ? '傳統轉換：每個 JSX 元素變成 React.createElement(類型, 屬性物件, ...子元素)。小寫的標籤變成字串，大寫的元件直接傳入函式本身。'
          : '新版轉換（React 17 起，Vite 預設）：自動從 react/jsx-runtime 匯入 jsx()，children 放進屬性物件，所以檔案開頭不用再寫 import React。';
      };
      $('#jcIn', root).value = EX[0];
      $('#jcIn', root).addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 400); });
      $('#jcIn', root).addEventListener('keydown', e => e.stopPropagation());
      tabsSelect(root, (tabs, v) => {
        if (tabs.id === 'jcEx') $('#jcIn', root).value = EX[+v];
        if (tabs.id === 'jcRt') rt = v;
        run();
      });
      run();
    }
    if (id === 'immut') {
      const base = () => ({
        todos: [{ id: 1, title: '寫作業', done: false }, { id: 2, title: '買牛奶', done: true }],
        user: { name: '小明', address: { city: '台北', zip: '100' } }
      });
      const byTitle = (a, b) => a.title.localeCompare(b.title, 'zh-Hant');
      const OPS = {
        add: ['todos', '在待辦清單最後新增 { id: 3, title: \'運動\', done: false }', [
          ['todos.push(newTodo);\nsetTodos(todos);', s => { s.push({ id: 3, title: '運動', done: false }); return s; }, 'push 修改了原陣列，又把同一個陣列傳回去。'],
          ['setTodos([...todos, newTodo]);', s => [...s, { id: 3, title: '運動', done: false }], '展開運算子建立新陣列，原陣列不變。'],
          ['setTodos(todos.concat(newTodo));', s => s.concat({ id: 3, title: '運動', done: false }), 'concat 會回傳新陣列，也是正確寫法。'],
          ['const copy = todos;\ncopy.push(newTodo);\nsetTodos(copy);', s => { const c = s; c.push({ id: 3, title: '運動', done: false }); return c; }, 'copy 只是指向同一個陣列的另一個名字，並沒有複製。']
        ]],
        del: ['todos', '刪除 id 為 1 的項目', [
          ['todos.splice(0, 1);\nsetTodos(todos);', s => { s.splice(0, 1); return s; }, 'splice 直接修改原陣列。'],
          ['setTodos(todos.filter(t => t.id !== 1));', s => s.filter(t => t.id !== 1), 'filter 回傳新陣列，最常用的刪除寫法。'],
          ['delete todos[0];\nsetTodos([...todos]);', s => { delete s[0]; return [...s]; }, '雖然傳入新陣列，但原陣列被修改了，而且留下 undefined 的空位。']
        ]],
        toggle: ['todos', '把 id 為 1 的項目切換成已完成', [
          ['todos[0].done = !todos[0].done;\nsetTodos(todos);', s => { s[0].done = !s[0].done; return s; }, '直接修改項目又傳回同一個陣列。'],
          ['todos[0].done = !todos[0].done;\nsetTodos([...todos]);', s => { s[0].done = !s[0].done; return [...s]; }, '外層陣列是新的，但裡面的物件被直接修改。用 memo 的子元件收到同一個物件，會以為沒變而不更新。'],
          ['setTodos(todos.map(t =>\n  t.id === 1 ? { ...t, done: !t.done } : t\n));', s => s.map(t => t.id === 1 ? { ...t, done: !t.done } : t), 'map 建立新陣列，只為被修改的項目建立新物件，其他項目保持原參考。']
        ]],
        nested: ['user', '把 user.address.city 改成「高雄」', [
          ['user.address.city = \'高雄\';\nsetUser({ ...user });', s => { s.address.city = '高雄'; return { ...s }; }, '展開運算子是淺拷貝：外層是新物件，但 address 仍是同一個物件，而且被直接修改了。'],
          ['setUser({\n  ...user,\n  address: { ...user.address, city: \'高雄\' }\n});', s => ({ ...s, address: { ...s.address, city: '高雄' } }), '每一層被修改的物件都要建立新的副本。'],
          ['setUser({ ...user, city: \'高雄\' });', s => ({ ...s, city: '高雄' }), '會重新渲染，但改錯地方：在最外層多了一個 city，address.city 仍是台北。']
        ]],
        sort: ['todos', '依標題排序', [
          ['setTodos(todos.sort(byTitle));', s => s.sort(byTitle), 'sort 會修改原陣列並回傳同一個陣列。'],
          ['setTodos([...todos].sort(byTitle));', s => [...s].sort(byTitle), '先複製再排序。'],
          ['setTodos(todos.toSorted(byTitle));', s => [...s].sort(byTitle), 'toSorted（ES2023）回傳排序後的新陣列。']
        ]]
      };
      let op = 'add', pick = -1;
      const J = v => JSON.stringify(v, null, 1).replace(/\n\s*/g, ' ');
      const run = () => {
        const [key, goal, cands] = OPS[op];
        $('#imGoal', root).innerHTML = `目標：${esc(goal)}。選一種寫法，看看會發生什麼事：`;
        $('#imOpts', root).innerHTML = cands.map(([code], i) => `<button type="button" class="im-opt${i === pick ? ' on' : ''}" data-im="${i}"><pre>${esc(code)}</pre></button>`).join('');
        if (pick < 0) { $('#imOut', root).innerHTML = `<p class="small muted" style="margin:8px 0 0">目前的 ${key}：<code>${esc(J(base()[key]))}</code></p>`; return; }
        const prev = base()[key], before = J(prev);
        const next = cands[pick][1](prev);
        const same = Object.is(prev, next), mutated = J(prev) !== before;
        const tag = same ? '<span class="tag bad">不會重新渲染</span>' : '<span class="tag ok">會重新渲染</span>';
        const tag2 = mutated ? '<span class="tag bad">原本的 state 被修改了</span>' : '<span class="tag ok">原本的 state 沒有被修改</span>';
        const good = !same && !mutated && !/改錯/.test(cands[pick][2]);
        $('#imOut', root).innerHTML = `<div class="im-res">
          <p style="margin:0 0 6px">${tag} ${tag2} ${good ? '<span class="tag ok">✓ 正確寫法</span>' : ''}</p>
          <table class="tbl small"><tr><td>Object.is(舊, 新)</td><td class="mono">${same}</td></tr><tr><td>更新前的 ${key}</td><td class="mono">${esc(before)}</td></tr><tr><td>執行後，舊的參考</td><td class="mono">${esc(J(prev))}</td></tr><tr><td>傳給 set 的新值</td><td class="mono">${esc(J(next))}</td></tr></table>
          <p class="small" style="margin:6px 0 0">${esc(cands[pick][2])}${same ? ' React 用 Object.is 比較新舊 state，參考相同就認為沒有改變，跳過重新渲染。' : ''}</p></div>`;
      };
      root.addEventListener('click', e => { const b = e.target.closest('[data-im]'); if (b) { pick = +b.dataset.im; run(); } });
      tabsSelect(root, (t, v) => { op = v; pick = -1; run(); });
      run();
    }
    if (id === 'effectlab') {
      let deps = 'uid', strict = false, mounted = false, uid = 1, count = 0, renders = 0, active = null, lastDeps = null, log = [];
      const DEPS = { none: '', empty: ', []', uid: ', [userId]' };
      const code = () => `function Profile({ userId }) {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    console.log('執行 effect，userId =', userId);\n    return () => console.log('清除，userId =', userId);\n  }${DEPS[deps]});\n  return …;\n}`;
      const add = (type, text) => log.push([type, text]);
      const runEffect = () => { if (active !== null) add('clean', `清除函式（上一次的 userId = ${active}）`); active = uid; add('eff', `執行 effect（userId = ${uid}）`); };
      const render = (why, first) => {
        renders++;
        add('render', `渲染 #${renders}：${why}（userId = ${uid}, count = ${count}）${strict ? '　※ 開發模式會渲染兩次' : ''}`);
        const now = deps === 'uid' ? [uid] : deps === 'empty' ? [] : null;
        const changed = first || now === null || now.some((v, i) => !Object.is(v, lastDeps[i]));
        lastDeps = now;
        if (changed) {
          runEffect();
          if (first && strict) { add('clean', `清除函式（StrictMode 模擬卸載，userId = ${active}）`); active = null; add('eff', `執行 effect（StrictMode 重新掛載，userId = ${uid}）`); active = uid; }
        } else add('skip', `依賴沒有改變，跳過 effect`);
      };
      const draw = () => {
        $('#elCode', root).textContent = code();
        $('#elState', root).textContent = mounted ? `元件已掛載　userId = ${uid}　count = ${count}　effect 執行中的 userId = ${active ?? '—'}` : '元件尚未掛載';
        $('#elLog', root).innerHTML = log.length ? log.map(([t, s]) => `<li class="el-${t}">${esc(s)}</li>`).join('') : '<li class="el-skip">按「掛載元件」開始。</li>';
        const ol = $('#elLog', root); ol.scrollTop = ol.scrollHeight;
        root.querySelectorAll('[data-el]').forEach(b => { const a = b.dataset.el; if (a !== 'clear') b.disabled = a === 'mount' ? mounted : !mounted; });
      };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-el]'); if (!b) return;
        const a = b.dataset.el;
        if (a === 'mount') { mounted = true; count = 0; renders = 0; active = null; add('mark', '— 掛載 —'); render('第一次渲染', true); }
        if (a === 'count') { count++; add('mark', '— setCount(count + 1) —'); render('自己的 state 改變'); }
        if (a === 'uid') { uid++; add('mark', `— 父元件傳入新的 userId = ${uid} —`); render('props 改變'); }
        if (a === 'parent') { add('mark', '— 父元件重新渲染，userId 沒變 —'); render('父元件重新渲染'); }
        if (a === 'unmount') { add('mark', '— 卸載 —'); if (active !== null) add('clean', `清除函式（userId = ${active}）`); active = null; mounted = false; }
        if (a === 'clear') log = [];
        draw();
      });
      $('#elStrict', root).addEventListener('change', e => { strict = e.target.checked; draw(); });
      tabsSelect(root, (t, v) => { deps = v; log = []; mounted = false; active = null; uid = 1; draw(); });
      draw();
    }
    if (id === 'renderflow') {
      // 元件樹：[名稱, 父, 預設是否 memo, 說明]
      const N = { App: [null, '擁有 count'], Header: ['App', 'props：title（固定字串）'], Counter: ['App', 'props：count；自己也有 state'], Display: ['Counter', 'props：value = count'], Sidebar: ['App', 'props：onSelect（可選）；自己也有 state'], Ad: ['Sidebar', '沒有 props'] };
      const kids = p => Object.keys(N).filter(k => N[k][0] === p);
      let count = 0, cLocal = 0, sLocal = 0, fnSeq = 0;
      const memo = { Header: false, Counter: false, Display: false, Sidebar: false, Ad: false };
      const renders = Object.fromEntries(Object.keys(N).map(k => [k, 1])), last = {}, why = {};
      let prevProps = {};
      const stable = { fn: 'fn#0' };
      const propsOf = (k, appRendered) => {
        if (k === 'Header') return { title: '我的網站' };
        if (k === 'Counter') return { count };
        if (k === 'Display') return { value: count };
        if (k === 'Sidebar') {
          if (!$('#rfFn', root).checked) return {};
          if ($('#rfCb', root).checked) return { onSelect: stable.fn };
          if (appRendered) fnSeq++;
          return { onSelect: 'fn#' + fnSeq };
        }
        return {};
      };
      const same = (a, b) => a && b && Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(k => Object.is(a[k], b[k]));
      Object.keys(N).forEach(k => { prevProps[k] = propsOf(k, false); });
      const pass = start => {
        Object.keys(N).forEach(k => { last[k] = ''; why[k] = ''; });
        const visit = (k, reason, appRendered) => {
          renders[k]++; last[k] = 'on'; why[k] = reason;
          for (const c of kids(k)) {
            const np = propsOf(c, k === 'App');
            if (memo[c] && same(prevProps[c], np)) { last[c] = 'skip'; why[c] = 'memo：props 沒變，跳過'; prevProps[c] = np; continue; }
            const changed = !same(prevProps[c], np);
            prevProps[c] = np;
            visit(c, memo[c] ? 'memo，但 props 改變了' : changed ? '父元件重新渲染（props 也改變）' : '父元件重新渲染（props 沒變也會跟著渲染）');
          }
        };
        visit(start, '自己的 state 改變');
      };
      const node = k => `<div class="rf-node ${last[k]}"><div class="rf-head"><b class="mono">&lt;${k} /&gt;</b>${k === 'App' ? '' : `<label class="small"><input type="checkbox" data-memo="${k}"${memo[k] ? ' checked' : ''}> memo</label>`}<span class="rf-cnt">渲染 ${renders[k]} 次</span></div><div class="small muted">${esc(N[k][1])}${why[k] ? `　<b class="rf-why">${esc(why[k])}</b>` : ''}</div>${kids(k).map(node).join('')}</div>`;
      const draw = msg => {
        $('#rfTree', root).innerHTML = node('App');
        const on = Object.keys(N).filter(k => last[k] === 'on'), sk = Object.keys(N).filter(k => last[k] === 'skip');
        $('#rfMsg', root).innerHTML = msg || (on.length ? `重新渲染：<b>${on.join('、')}</b>${sk.length ? `；被 memo 跳過：<b>${sk.join('、')}</b>` : ''}。` : '按上方按鈕觸發 state 更新，觀察哪些元件重新渲染。');
      };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-rf]'); if (!b) return;
        const a = b.dataset.rf;
        if (a === 'app') { count++; pass('App'); }
        if (a === 'counter') { cLocal++; pass('Counter'); }
        if (a === 'sidebar') { sLocal++; pass('Sidebar'); }
        if (a === 'reset') { Object.keys(renders).forEach(k => { renders[k] = 1; last[k] = ''; why[k] = ''; }); }
        draw();
      });
      root.addEventListener('change', e => {
        const m = e.target.dataset && e.target.dataset.memo;
        if (m) { memo[m] = e.target.checked; draw(`${m} ${e.target.checked ? '已用 memo 包起來' : '取消 memo'}。按「App：setCount」看看差別。`); return; }
        if (e.target.id === 'rfFn') { $('#rfCb', root).disabled = !e.target.checked; if (!e.target.checked) $('#rfCb', root).checked = false; prevProps.Sidebar = propsOf('Sidebar', true); draw(e.target.checked ? 'App 每次渲染都會建立新的 onSelect 函式。把 Sidebar 設成 memo 後按「App：setCount」，會發現 memo 失效。' : ''); }
        if (e.target.id === 'rfCb') { prevProps.Sidebar = propsOf('Sidebar', true); draw(e.target.checked ? 'useCallback 讓 onSelect 在每次渲染都是同一個函式，memo 的 Sidebar 就能跳過渲染。' : ''); }
      });
      draw();
    }
    if (id === 'promptlab') {
      const EX = {
        mail: { role: '你是專業、誠懇的業務窗口', fmt: '一封 email：主旨一行，內文 150 字以內，最後附聯絡電話', ctx: '我們是設計公司，委託大華印刷印製 500 本型錄，因為我們修改設計稿，必須延後交貨', task: '寫信給大華印刷的王經理，通知交貨日由 11/15 延到 11/22', lim: '語氣誠懇但專業，主動提出補償：下一筆訂單運費由我們負擔；對方是長期合作夥伴，所以不要過度道歉', eg: '', data: '', think: false },
        meet: { role: '你是專案經理助理', fmt: 'Markdown 表格，欄位：事項、負責人、期限；表格後列出待追蹤問題', ctx: '這是產品週會的逐字稿，整理後要寄給沒參加的主管', task: '整理出所有決議事項與負責人，並列出還沒有結論的問題', lim: '只能使用會議記錄中有的資訊，不確定的負責人標示「未指定」，因為主管會依此分派工作', eg: '', data: '（貼上會議逐字稿）', think: false },
        bug: { role: '你是資深的 Node.js 工程師', fmt: '先說明根本原因，再給修改後的程式碼與一個測試', ctx: '使用者在登入頁輸入錯誤密碼時，畫面沒有顯示錯誤訊息，只在 console 出現 401', task: '找出原因並修正，讓畫面顯示「帳號或密碼錯誤」', lim: '不要改動 API 的回應格式，因為手機 App 也在使用', eg: '', data: '（貼上相關程式碼與錯誤訊息）', think: true }
      };
      const F = { role: 'plRole', fmt: 'plFmt', ctx: 'plCtx', task: 'plTask', lim: 'plLim', eg: 'plEg', data: 'plData' };
      const val = k => $('#' + F[k], root).value.trim();
      const run = () => {
        const v = Object.fromEntries(Object.keys(F).map(k => [k, val(k)])), think = $('#plThink', root).checked;
        const parts = [];
        if (v.role) parts.push(v.role + '。');
        if (v.data) parts.push(`<資料>\n${v.data}\n</資料>`);
        if (v.ctx) parts.push(`<背景>\n${v.ctx}\n</背景>`);
        if (v.task) parts.push(`<任務>\n${v.task}\n</任務>`);
        if (v.lim) parts.push(`<限制>\n${v.lim}\n</限制>`);
        if (v.eg) parts.push(`<範例>\n${v.eg}\n</範例>`);
        if (v.fmt) parts.push(`<輸出格式>\n${v.fmt}\n</輸出格式>`);
        if (think) parts.push('請先在 <分析> 標籤中逐步思考，再在 <答案> 標籤中給出最後結果。');
        $('#plOut', root).textContent = parts.join('\n\n') || '（填寫左側欄位後，這裡會出現組合好的提示詞）';
        const checks = [
          [!!v.ctx, '背景：說明為什麼、給誰用'], [!!v.task, '任務：具體要做什麼'], [!!v.lim, '限制：長度、語氣、不能做的事'], [!!v.fmt, '輸出格式'],
          [/因為|所以|為了|由於/.test(v.lim + v.ctx), '有說明原因（Claude 能舉一反三）'], [!!v.eg, '有範例（選填，風格要求高時建議提供）']
        ];
        $('#plCheck', root).innerHTML = checks.map(([ok, t]) => `<span class="tag ${ok ? 'ok' : 'warn'}" style="margin:2px">${ok ? '✓' : '·'} ${esc(t)}</span>`).join('');
      };
      root.addEventListener('input', run);
      root.addEventListener('change', run);
      tabsSelect(root, (t, k) => {
        const e = EX[k] || { role: '', fmt: '', ctx: '', task: '', lim: '', eg: '', data: '', think: false };
        Object.keys(F).forEach(f => { $('#' + F[f], root).value = e[f]; });
        $('#plThink', root).checked = e.think; run();
      });
      $('#plCopy', root).addEventListener('click', e => { try { navigator.clipboard.writeText($('#plOut', root).textContent); e.target.textContent = '已複製'; setTimeout(() => { e.target.textContent = '複製'; }, 1200); } catch {} });
      Object.keys(F).forEach(f => { $('#' + F[f], root).value = EX.mail[f]; });
      run();
    }
    if (id === 'ccref') {
      const D = [
        ['前綴', '/', '執行斜線指令或 Skill', '/clear'], ['前綴', '!', '直接執行終端機指令，輸出加入對話', '!npm test'], ['前綴', '@', '引用檔案或資料夾（有自動完成）', '@src/app.ts 這裡做什麼？'], ['前綴', '?', '在空白輸入框按下，顯示快捷鍵說明', '?'],
        ['按鍵', 'Esc', '中斷目前的回應或工具執行，保留已完成的部分', ''], ['按鍵', 'Esc Esc', '清除輸入；輸入框空白時開啟回溯選單（/rewind）', ''], ['按鍵', 'Shift+Tab', '循環切換權限模式：default → acceptEdits → plan → auto', ''],
        ['按鍵', 'Ctrl+C', '中斷或清除輸入；沒有執行中的動作時按兩次離開', ''], ['按鍵', 'Ctrl+D', '離開 Claude Code', ''], ['按鍵', 'Ctrl+O', '切換詳細的對話紀錄檢視（工具執行細節）', ''], ['按鍵', 'Ctrl+R', '搜尋輸入紀錄', ''],
        ['按鍵', 'Ctrl+T', '顯示或隱藏 Claude 的待辦清單', ''], ['按鍵', 'Ctrl+B', '把執行中的指令或代理放到背景', ''], ['按鍵', 'Ctrl+G', '用文字編輯器編輯提示詞', ''], ['按鍵', 'Ctrl+V／Alt+V', '貼上剪貼簿中的圖片（Windows 用 Alt+V）', ''],
        ['按鍵', 'Ctrl+S', '暫存目前輸入，空白時再按一次取回', ''], ['按鍵', 'Option+P／Alt+P', '切換模型', ''], ['按鍵', 'Option+O／Alt+O', '切換快速模式', ''], ['按鍵', '↑ ↓', '瀏覽輸入紀錄', ''], ['按鍵', 'Ctrl+L', '重新繪製畫面', ''],
        ['指令', '/help', '顯示說明與所有可用指令', ''], ['指令', '/clear', '開始新的空白對話（換任務時使用）', ''], ['指令', '/compact [重點]', '摘要壓縮對話以釋放 context', '/compact 保留資料表設計的決定'], ['指令', '/context', '以色塊顯示 context 使用量與優化建議', ''],
        ['指令', '/resume', '恢復先前的對話', ''], ['指令', '/rewind', '把對話及／或程式碼回溯到檢查點（別名 /undo、/checkpoint）', ''], ['指令', '/branch', '從目前位置分出新的對話分支', ''], ['指令', '/rename', '為目前對話命名', ''],
        ['指令', '/export', '把對話匯出成文字檔', ''], ['指令', '/copy', '複製最後一個回答', ''], ['指令', '/btw 問題', '問一個不加入目前對話的旁支問題', ''], ['指令', '/model', '切換模型（opus、sonnet、haiku、fable）', '/model sonnet'],
        ['指令', '/effort', '調整努力程度 low～max', '/effort high'], ['指令', '/fast', '切換快速模式', ''], ['指令', '/usage', '查看用量與花費（別名 /cost、/stats）', ''], ['指令', '/status', '版本、模型、帳號與連線狀態', ''],
        ['指令', '/config', '設定介面：主題、模型、輸出風格等', ''], ['指令', '/init', '產生專案的 CLAUDE.md', ''], ['指令', '/memory', '編輯 CLAUDE.md、管理自動記憶', ''], ['指令', '/permissions', '管理 allow／ask／deny 權限規則', ''],
        ['指令', '/plan [描述]', '進入計畫模式，只分析不修改', '/plan 新增訂單匯出'], ['指令', '/add-dir', '加入其他工作資料夾', '/add-dir ../shared'], ['指令', '/diff', '檢視工作目錄的變更', ''], ['指令', '/code-review', '審查目前變更或 PR（別名 /review）', ''],
        ['指令', '/security-review', '檢查目前分支變更的安全漏洞', ''], ['指令', '/simplify', '找出變更中可以簡化的地方並修正', ''], ['指令', '/mcp', '管理 MCP 伺服器連線與 OAuth 授權', ''], ['指令', '/skills', '列出可用的 Skills', ''],
        ['指令', '/agents', '建立與管理 Subagents', ''], ['指令', '/hooks', '檢視 hook 設定', ''], ['指令', '/plugin', '安裝與管理外掛', ''], ['指令', '/install-github-app', '為儲存庫安裝 Claude GitHub App 與 Actions', ''],
        ['指令', '/ide', '管理 IDE 整合', ''], ['指令', '/sandbox', '切換沙箱模式', ''], ['指令', '/doctor', '診斷安裝與設定問題', ''], ['指令', '/tasks', '查看背景工作', ''], ['指令', '/batch', '把大規模修改拆成多個單元平行處理', ''],
        ['指令', '/loop', '在工作階段中重複執行某個提示詞', ''], ['指令', '/schedule', '建立雲端排程任務', ''], ['指令', '/fewer-permission-prompts', '分析紀錄並產生常用唯讀指令的 allow 清單', ''], ['指令', '/terminal-setup', '設定 Shift+Enter 換行', ''],
        ['指令', '/keybindings', '開啟快捷鍵設定檔', ''], ['指令', '/login、/logout', '登入／登出 Anthropic 帳號', ''], ['指令', '/exit', '離開 Claude Code', ''],
        ['參數', 'claude', '在目前資料夾啟動互動模式', ''], ['參數', 'claude "問題"', '帶著第一個問題進入互動模式', 'claude "說明這個專案"'], ['參數', '-p, --print', '非互動模式：回答後結束', 'claude -p "列出 TODO"'],
        ['參數', '-c, --continue', '繼續目前資料夾最近的對話', 'claude -c'], ['參數', '-r, --resume', '以 ID 或名稱恢復對話，或開啟選單', 'claude -r "auth-refactor"'], ['參數', '-n, --name', '為對話命名', 'claude -n "訂單匯出"'],
        ['參數', '--model', '指定模型', 'claude --model opus'], ['參數', '--effort', '指定努力程度', 'claude --effort high'], ['參數', '--permission-mode', '指定起始權限模式：default、acceptEdits、plan、auto 等', 'claude --permission-mode plan'],
        ['參數', '--add-dir', '加入其他工作資料夾', ''], ['參數', '-w, --worktree', '在獨立 git worktree 中工作', 'claude -w feature-x'], ['參數', '--output-format', '非互動模式輸出格式：text、json、stream-json', ''],
        ['參數', '--allowedTools', '不需詢問即可使用的工具', '--allowedTools "Read,Bash(npm test *)"'], ['參數', '--disallowedTools', '禁止使用的工具', ''], ['參數', '--max-turns', '限制非互動模式的回合數', '--max-turns 10'],
        ['參數', '--max-budget-usd', '非互動模式的估計花費上限', '--max-budget-usd 2'], ['參數', '--append-system-prompt', '在預設系統提示詞後追加內容', ''], ['參數', '--mcp-config', '從 JSON 載入 MCP 伺服器', ''],
        ['參數', '--bare', '不載入 CLAUDE.md、hooks、MCP 等，適合腳本', ''], ['參數', '--bg', '以背景代理啟動', ''], ['參數', '--dangerously-skip-permissions', '略過所有權限詢問（只在隔離環境使用）', ''],
        ['參數', 'claude update', '更新到最新版本', ''], ['參數', 'claude auth login／status／logout', '登入、查看狀態、登出', 'claude auth login --console'],
        ['參數', 'claude mcp add', '新增 MCP 伺服器', 'claude mcp add --transport http notion https://mcp.notion.com/mcp'], ['參數', 'claude mcp list／get／remove', '列出、查看、移除 MCP 伺服器', '']
      ];
      let type = '';
      const run = () => {
        const q = $('#crQ', root).value.trim().toLowerCase();
        const rows = D.filter(r => (!type || r[0] === type) && (!q || (r[1] + ' ' + r[2] + ' ' + r[3]).toLowerCase().includes(q)));
        $('#crOut', root).innerHTML = rows.length ? `<table class="tbl small"><tr><th>類別</th><th>指令／按鍵</th><th>說明</th></tr>${rows.map(r => `<tr><td class="muted">${r[0]}</td><td class="mono" style="white-space:nowrap"><b>${esc(r[1])}</b></td><td>${esc(r[2])}${r[3] ? `<br><code>${esc(r[3])}</code>` : ''}</td></tr>`).join('')}</table>` : '<p class="small muted">找不到符合的項目。</p>';
      };
      $('#crQ', root).addEventListener('input', run);
      tabsSelect(root, (t, v) => { type = v; run(); });
      run();
    }
    if (id === 'ccsetup') {
      const PRE = {
        node: ['npm install', 'npm run dev', 'npm test', 'npm run lint && npm run typecheck', '使用 TypeScript，不要用 any\nAPI 回應格式統一為 { data, error }\n資料庫查詢放在 src/db/，不要在 route 中直接寫 SQL'],
        react: ['npm install', 'npm run dev', 'npm test', 'npm run lint', '元件使用函式元件與 Hooks，一個元件一個檔案\n樣式使用 CSS Modules\n共用元件放在 src/components/'],
        python: ['pip install -r requirements.txt', 'python -m app', 'pytest', 'ruff check . && mypy .', '遵循 PEP 8，函式加上型別提示\n設定值從環境變數讀取，不要寫死\n新功能都要有 pytest 測試'],
        other: ['', '', '', '', '']
      };
      const cmdPrefix = c => c.split('&&')[0].trim();
      const fill = t => { const p = PRE[t]; ['csInstall', 'csDev', 'csTest', 'csLint', 'csRules'].forEach((k, i) => { $('#' + k, root).value = p[i]; }); };
      const on = k => root.querySelector(`[data-cs="${k}"]`).checked;
      const run = () => {
        const g = k => $('#' + k, root).value.trim();
        const cmds = [['安裝', g('csInstall')], ['開發', g('csDev')], ['測試', g('csTest')], ['Lint／型別檢查', g('csLint')]].filter(c => c[1]);
        const rules = g('csRules').split('\n').map(s => s.trim()).filter(Boolean);
        const md = [`# 專案說明`, g('csDesc') || '（一句話描述這個專案）', '', '## 常用指令', ...cmds.map(([k, c]) => `- ${k}：${c}`), '', '## 程式碼慣例', ...(rules.length ? rules.map(r => '- ' + r) : ['- （補充團隊的慣例）']), '', '## 工作方式', '- 修改後執行測試' + (g('csLint') ? '與 lint，全部通過才算完成' : '，全部通過才算完成'), '- 不確定需求時先提問，大型修改先提出計畫'];
        if (on('env')) md.push('- 不要讀取或輸出 .env 與任何金鑰');
        $('#csMd', root).textContent = md.join('\n');
        const allow = [], ask = [], deny = [];
        if (on('test')) { if (g('csTest')) allow.push(`Bash(${cmdPrefix(g('csTest'))} *)`); if (g('csLint')) g('csLint').split('&&').forEach(c => allow.push(`Bash(${c.trim()})`)); }
        if (on('gitread')) allow.push('Bash(git status)', 'Bash(git diff *)', 'Bash(git log *)');
        if (on('push')) ask.push('Bash(git push *)');
        if (on('env')) deny.push('Read(./.env)', 'Read(./.env.*)', 'Read(./secrets/**)');
        if (on('rm')) deny.push('Bash(rm -rf *)');
        if (on('net')) deny.push('Bash(curl *)', 'Bash(wget *)');
        const conf = { permissions: { allow, ask, deny } };
        Object.keys(conf.permissions).forEach(k => { if (!conf.permissions[k].length) delete conf.permissions[k]; });
        if (on('fmt')) {
          const fmt = $('#csType', root).value === 'python' ? 'ruff format' : 'npx prettier --write';
          conf.hooks = { PostToolUse: [{ matcher: 'Edit|Write', hooks: [{ type: 'command', command: `jq -r '.tool_input.file_path' | xargs ${fmt}` }] }] };
        }
        $('#csJson', root).textContent = JSON.stringify(conf, null, 2);
      };
      root.addEventListener('input', run);
      root.addEventListener('change', e => { if (e.target.id === 'csType') fill(e.target.value); run(); });
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-cscopy]'); if (!b) return;
        try { navigator.clipboard.writeText($(b.dataset.cscopy === 'md' ? '#csMd' : '#csJson', root).textContent); b.textContent = '已複製'; setTimeout(() => { b.textContent = '複製'; }, 1200); } catch {}
      });
      fill('node'); run();
    }
    if (id === 'apicost') {
      // 2026 年 10 月官方定價（美元／每百萬 token）；Haiku 5.5 為提示詞 10 萬 token 以內的價格
      const M = [['claude-fable-5-1', 'Claude Fable 5.1', 10, 50], ['claude-opus-5-5', 'Claude Opus 5.5', 4, 20], ['claude-sonnet-5-5', 'Claude Sonnet 5.5', 2, 10], ['claude-haiku-5-5', 'Claude Haiku 5.5', 0.1, 0.5]];
      $('#acModel', root).innerHTML = M.map((m, i) => `<option value="${i}"${i === 1 ? ' selected' : ''}>${m[1]}（$${m[2]}／$${m[3]}）</option>`).join('');
      const usd = x => x >= 100 ? '$' + Math.round(x).toLocaleString() : x >= 1 ? '$' + x.toFixed(2) : '$' + x.toFixed(4);
      const cost = (m, inT, outT, cache, batch) => {
        const inCost = inT * (1 - cache) * m[2] + inT * cache * m[2] * 0.1;
        return (inCost + outT * m[3]) / 1e6 * (batch ? 0.5 : 1);
      };
      const run = () => {
        const n = Math.max(0, +$('#acN', root).value || 0), inT = Math.max(0, +$('#acIn', root).value || 0), outT = Math.max(0, +$('#acOut', root).value || 0);
        const cache = Math.min(100, Math.max(0, +$('#acCache', root).value || 0)) / 100, fx = +$('#acFx', root).value || 32, batch = $('#acBatch', root).checked;
        const m = M[+$('#acModel', root).value];
        const per = cost(m, inT, outT, cache, batch), day = per * n, month = day * 30;
        const share = outT * m[3] / (inT * m[2] + outT * m[3] || 1);
        $('#acOut', root).innerHTML = `
          <div class="ac-big"><div><small>每次</small><b>${usd(per)}</b></div><div><small>每日</small><b>${usd(day)}</b></div><div><small>每月（30 天）</small><b>${usd(month)}</b><span>約 NT$ ${Math.round(month * fx).toLocaleString()}</span></div></div>
          <p class="small muted" style="margin:6px 0 0">輸出約占費用的 ${Math.round(share * 100)}%（未計快取與批次折扣時）。快取讀取以輸入價格的 1／10 計算，未計首次寫入快取的費用（約 1.25 倍）。</p>
          <div class="table-wrap"><table class="tbl small" style="margin-top:8px"><tr><th>模型</th><th>每次</th><th>每月</th><th>新台幣／月</th></tr>${M.map(x => { const c = cost(x, inT, outT, cache, batch) * n * 30; return `<tr${x === m ? ' style="font-weight:700"' : ''}><td>${x[1]}</td><td class="mono">${usd(cost(x, inT, outT, cache, batch))}</td><td class="mono">${usd(c)}</td><td class="mono">${Math.round(c * fx).toLocaleString()}</td></tr>`; }).join('')}</table></div>
          <p class="small muted" style="margin:6px 0 0">依 2026 年 10 月官方定價估算，實際費用以官方定價頁與帳單為準。</p>`;
      };
      root.addEventListener('input', run);
      root.addEventListener('change', run);
      run();
    }
    if (id === 'tsinfer') {
      const EX = [
        "let city = '台北';\nconst country = '台灣';\nlet score = 95;\nconst pi = 3.14;\nlet maybe = Math.random() > 0.5 ? 'yes' : 0;\nlet nothing = null;",
        "const nums = [1, 2, 3];\nconst mixed = [1, 'a', true];\nconst user = { name: '小明', age: 20, tags: ['新會員'] };\nconst point = [10, 20] as [number, number];\nconst empty: string[] = [];\nconst first = nums[0];",
        "function add(a: number, b: number) {\n  return a + b;\n}\nfunction greet(name?: string) {\n  return name ? 'Hi ' + name : null;\n}\nconst double = (n: number) => n * 2;\nconst lengths = ['a', 'bbb'].map(s => s.length);\nasync function load() { return { ok: true }; }",
        "const colors = ['red', 'green'];\nconst colors2 = ['red', 'green'] as const;\nconst config = { mode: 'dark', size: 12 };\nconst config2 = { mode: 'dark', size: 12 } as const;\ntype Color = typeof colors2[number];"
      ];
      let w = null, seq = 0;
      const pending = {};
      const worker = () => {
        if (w) return w;
        w = new Worker('/static/js/ts-worker.js');
        w.onmessage = e => { const d = e.data; if (d.id && pending[d.id]) { pending[d.id](d); delete pending[d.id]; } };
        w.onerror = e => { e.preventDefault(); $('#tiSt', root).textContent = '無法載入 TypeScript 編譯器，請檢查網路連線。'; w = null; };
        return w;
      };
      const run = () => {
        const id = ++seq, code = $('#tiCode', root).value;
        $('#tiSt', root).textContent = '推論中…（第一次需要載入編譯器）';
        pending[id] = d => {
          if (id !== seq) return;
          $('#tiSt', root).textContent = '';
          const rows = (d.items || []).map(it => `<tr><td class="num">${it.line}</td><td class="muted">${esc(it.kind)}</td><td class="mono"><b>${esc(it.name)}</b></td><td class="mono ti-type">${esc(it.type)}</td></tr>`).join('');
          const errs = (d.diags || []).map(x => `<li>第 ${x.line} 行：${esc(x.text)} (TS${x.code})</li>`).join('');
          $('#tiOut', root).innerHTML = (rows ? `<table class="tbl small"><tr><th>行</th><th>種類</th><th>名稱</th><th>推論出的型別</th></tr>${rows}</table>` : '<p class="small muted">沒有找到最上層的宣告。</p>') + (errs ? `<ul class="small" style="color:var(--bad);margin:8px 0 0">${errs}</ul>` : '');
        };
        worker().postMessage({ id, code, mode: 'infer' });
      };
      $('#tiCode', root).value = EX[0];
      $('#tiCode', root).addEventListener('keydown', e => e.stopPropagation());
      $('#tiRun', root).addEventListener('click', run);
      tabsSelect(root, (t, v) => { $('#tiCode', root).value = EX[+v]; run(); });
      $('#tiOut', root).innerHTML = '<p class="small muted">按「推論型別」開始（會載入 TypeScript 編譯器，約 1.6 MB）。</p>';
    }
    if (id === 'tsnarrow') {
      // 每一行：[程式碼, 這一行之後（或這個區塊內）x 的型別, 說明]
      const S = [
        [['function show(x: string | number | null) {', 'string | number | null', '參數宣告為三種型別的聯合。'],
         ['  if (x === null) return \'（無）\';', 'string | number', '排除 null 之後，剩下的程式中 x 不可能是 null。'],
         ['  if (typeof x === \'string\') {', 'string', 'typeof 檢查成立的區塊內，x 是 string。'],
         ['    return x.toUpperCase();', 'string', '可以安全呼叫字串方法。'],
         ['  }', 'number', '字串的情況已經 return，所以之後 x 只剩 number。'],
         ['  return x.toFixed(2);', 'number', '可以安全呼叫數字方法。'],
         ['}', '—', '每一條路徑都處理完畢。']],
        [['type Shape = { kind: \'circle\'; r: number } | { kind: \'rect\'; w: number; h: number };', 'Shape', '兩種形狀都有 kind 屬性，值是不同的字面值。'],
         ['function area(s: Shape) {', 'Shape', '一開始 s 可能是任一種。'],
         ['  switch (s.kind) {', 'Shape', '依 kind 分支。'],
         ['    case \'circle\': return Math.PI * s.r ** 2;', '{ kind: \'circle\'; r: number }', 'kind 為 circle 時，TypeScript 知道 s 有 r 屬性。'],
         ['    case \'rect\': return s.w * s.h;', '{ kind: \'rect\'; w: number; h: number }', 'kind 為 rect 時，s 有 w 與 h。'],
         ['    default: const never_: never = s;', 'never', '所有情況都處理了，剩下的型別是 never；漏掉某種形狀時這裡會報錯。'],
         ['  }', '—', ''], ['}', '—', '']],
        [['function count(x: string | string[] | { items: string[] }) {', 'string | string[] | { items: string[] }', '三種可能的輸入。'],
         ['  if (Array.isArray(x)) return x.length;', 'string[]', 'Array.isArray 成立時是陣列。'],
         ['  if (\'items\' in x) return x.items.length;', '{ items: string[] }', 'in 檢查有 items 屬性的物件。'],
         ['  return x.length;', 'string', '前兩種都已 return，剩下的是 string。'],
         ['}', '—', '']],
        [['function greet(name: string | undefined) {', 'string | undefined', '名字可能沒有提供。'],
         ['  if (name) {', 'string', '真值檢查排除了 undefined，但也排除了空字串 \'\'。'],
         ['    return \'Hi \' + name.trim();', 'string', '區塊內可以安全使用字串方法。'],
         ['  }', 'string | undefined', '注意：區塊外 name 可能是 undefined，也可能是空字串 \'\'。'],
         ['  return \'Hi 訪客\';', 'string | undefined', '若要區分空字串，改用 name !== undefined。'],
         ['}', '—', '']]
      ];
      let sc = 0, line = 0;
      const draw = () => {
        const L = S[sc];
        $('#tnCode', root).innerHTML = L.map((l, i) => `<div class="tn-line${i === line ? ' on' : ''}" data-tl="${i}"><span>${i + 1}</span><code>${esc(l[0])}</code></div>`).join('');
        $('#tnType', root).textContent = `第 ${line + 1} 行，變數型別：${L[line][1]}`;
        $('#tnNote', root).textContent = L[line][2];
        $('#tnPos', root).textContent = `${line + 1} / ${L.length}`;
      };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-tn]');
        if (b) { line = Math.max(0, Math.min(S[sc].length - 1, line + (b.dataset.tn === 'next' ? 1 : -1))); draw(); return; }
        const l = e.target.closest('[data-tl]'); if (l) { line = +l.dataset.tl; draw(); }
      });
      tabsSelect(root, (t, v) => { sc = +v; line = 0; draw(); });
      draw();
    }
    if (id === 'tsutil') {
      const F = [['id', 'number', false, true], ['name', 'string', false, false], ['email', 'string', false, false], ['phone', 'string', true, false], ['role', "'admin' | 'user'", false, false]];
      const NOTE = {
        Partial: '所有屬性變成可選。常用於「更新部分欄位」的函式參數：updateUser(id, changes: Partial<User>)。',
        Required: '所有屬性變成必填（phone 的 ? 被移除）。常用於「補齊預設值後」的完整設定物件。',
        Readonly: '所有屬性變成唯讀，物件建立後不能修改。常用於設定值或不可變的狀態。',
        Pick: '只挑出勾選的屬性。常用於列表預覽、下拉選單等只需要少數欄位的地方。',
        Omit: '移除勾選的屬性。常用於建立資料時省略 id 這類由伺服器產生的欄位，或回傳時移除敏感欄位。'
      };
      let op = 'Partial', sel = new Set(['id', 'name']);
      const run = () => {
        const needKeys = op === 'Pick' || op === 'Omit';
        $('#tuKeys', root).innerHTML = needKeys ? '選擇欄位：' + F.map(f => `<label style="margin-right:10px"><input type="checkbox" data-tu="${f[0]}"${sel.has(f[0]) ? ' checked' : ''}> ${f[0]}</label>`).join('') : '';
        let rows = F.map(f => ({ n: f[0], t: f[1], opt: f[2], ro: f[3] }));
        if (op === 'Partial') rows.forEach(r => { r.opt = true; });
        if (op === 'Required') rows.forEach(r => { r.opt = false; });
        if (op === 'Readonly') rows.forEach(r => { r.ro = true; });
        if (op === 'Pick') rows = rows.filter(r => sel.has(r.n));
        if (op === 'Omit') rows = rows.filter(r => !sel.has(r.n));
        const keys = [...sel].filter(k => F.some(f => f[0] === k)).map(k => `'${k}'`).join(' | ') || 'never';
        const expr = needKeys ? `${op}<User, ${keys}>` : `${op}<User>`;
        $('#tuOut', root).textContent = `type Result = ${expr};\n\n// 等同於：\ntype Result = {\n${rows.map(r => `  ${r.ro ? 'readonly ' : ''}${r.n}${r.opt ? '?' : ''}: ${r.t};`).join('\n')}\n}`;
        $('#tuNote', root).textContent = NOTE[op];
      };
      root.addEventListener('change', e => { const k = e.target.dataset && e.target.dataset.tu; if (k) { e.target.checked ? sel.add(k) : sel.delete(k); run(); } });
      tabsSelect(root, (t, v) => { op = v; run(); });
      run();
    }
    if (id === 'jsonts') {
      const SAMPLE = JSON.stringify({ id: 1024, status: 'paid', total: 1290.5, paidAt: null, customer: { name: '王小明', email: 'ming@example.com', vip: true }, items: [{ sku: 'A-1', qty: 2, price: 590 }, { sku: 'B-7', qty: 1, price: 110, note: '禮品包裝' }], tags: ['網購', '首購'] }, null, 2);
      const pascal = s => (s.replace(/[^A-Za-z0-9]+(.)?/g, (m, c) => (c ? c.toUpperCase() : '')).replace(/^./, c => c.toUpperCase()) || 'Item');
      const singular = s => s.endsWith('ies') ? s.slice(0, -3) + 'y' : s.endsWith('s') && s.length > 1 ? s.slice(0, -1) : s + 'Item';
      const key = k => /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
      const run = () => {
        const out = [], names = new Set(), ro = $('#jtRo', root).checked ? 'readonly ' : '', asType = $('#jtType', root).checked;
        const uniq = n => { let x = n, i = 2; while (names.has(x)) x = n + i++; names.add(x); return x; };
        const typeOf = (v, hint) => {
          if (v === null) return 'null';
          if (Array.isArray(v)) {
            if (!v.length) return 'unknown[]';
            const objs = v.filter(x => x && typeof x === 'object' && !Array.isArray(x));
            const parts = new Set(v.filter(x => !(x && typeof x === 'object' && !Array.isArray(x))).map(x => typeOf(x, hint)));
            if (objs.length) parts.add(objType(objs, singular(hint)));
            const t = [...parts].join(' | ');
            return parts.size > 1 ? `(${t})[]` : `${t}[]`;
          }
          if (typeof v === 'object') return objType([v], hint);
          return typeof v === 'number' ? 'number' : typeof v === 'boolean' ? 'boolean' : 'string';
        };
        const objType = (list, hint) => {
          const name = uniq(pascal(hint));
          const keys = [...new Set(list.flatMap(o => Object.keys(o)))];
          const lines = keys.map(k => {
            const vals = list.filter(o => k in o).map(o => o[k]);
            const types = [...new Set(vals.map(v => typeOf(v, k)))];
            const opt = vals.length < list.length ? '?' : '';
            return `  ${ro}${key(k)}${opt}: ${types.join(' | ')};`;
          });
          out.push(asType ? `type ${name} = {\n${lines.join('\n')}\n};` : `interface ${name} {\n${lines.join('\n')}\n}`);
          return name;
        };
        let data;
        try { data = JSON.parse($('#jtIn', root).value); }
        catch (e) { $('#jtOut', root).textContent = 'JSON 格式錯誤：' + e.message; return; }
        const rootName = $('#jtName', root).value.trim() || 'Root';
        if (data && typeof data === 'object' && !Array.isArray(data)) objType([data], rootName);
        else out.push(`type ${uniq(pascal(rootName))} = ${typeOf(data, rootName + 'Item')};`);
        $('#jtOut', root).textContent = out.reverse().join('\n\n') + '\n\n// 提醒：型別只描述格式，實際收到的 API 資料仍要在執行時驗證（例如使用 Zod）。';
      };
      $('#jtIn', root).value = SAMPLE;
      $('#jtIn', root).addEventListener('keydown', e => e.stopPropagation());
      root.addEventListener('input', run);
      root.addEventListener('change', run);
      run();
    }
    if (id === 'dfselect') {
      const COLS = ['product', 'store', 'qty', 'price', 'member'];
      const ROWS = [['拿鐵', '台北', 2, 110, true], ['司康', '高雄', 1, 70, false], ['美式咖啡', '台北', 3, 80, true], ['奶茶', '台中', 1, 75, true], ['起司蛋糕', '台北', 4, 130, false], ['紅茶', '高雄', 2, 60, true], ['布朗尼', '台中', 3, 90, false], ['抹茶拿鐵', '台北', 1, 120, true]];
      const C = c => COLS.indexOf(c);
      const all = (r, c) => ({ r, c });
      // [寫法, 選到的列, 選到的欄, 結果說明, 補充, 篩選條件, 取列函式, 結果型別]
      const EX = [
        ["df.loc[2, 'qty']", [2], [C('qty')], '單一值：3', '列標籤 2、欄名 qty 交會的那一格。'],
        ["df['product']", [0, 1, 2, 3, 4, 5, 6, 7], [C('product')], 'Series，長度 8', '一層中括號選一欄，得到 Series。'],
        ["df[['product', 'price']]", [0, 1, 2, 3, 4, 5, 6, 7], [C('product'), C('price')], 'DataFrame，形狀 (8, 2)', '兩層中括號（傳入串列）得到 DataFrame。'],
        ["df.loc[1:3, ['store', 'qty']]", [1, 2, 3], [C('store'), C('qty')], 'DataFrame，形狀 (3, 2)', 'loc 依標籤，1:3 包含結尾 3，所以是列 1、2、3。'],
        ['df.iloc[1:3, 0:2]', [1, 2], [0, 1], 'DataFrame，形狀 (2, 2)', 'iloc 依位置，1:3 不含 3，所以是列 1、2；欄 0、1。'],
        ['df.iloc[-1]', [7], [0, 1, 2, 3, 4], 'Series（最後一列），長度 5', '負數位置從最後面算起。'],
        ["df[df['qty'] >= 3]", null, [0, 1, 2, 3, 4], '', '布林條件篩選列，保留全部欄位。', r => r[2] >= 3],
        ["df[(df['store'] == '台北') & (df['qty'] > 1)]", null, [0, 1, 2, 3, 4], '', '多條件用 &，每個條件加括號。', r => r[1] === '台北' && r[2] > 1],
        ["df.loc[df['price'] > 100, 'product']", null, [C('product')], '', 'loc 的列位置也可以放布林條件，同時指定欄。', r => r[3] > 100, null, 'series'],
        ["df[df['member']].head(3)", null, [0, 1, 2, 3, 4], '', '先篩選會員，再取前 3 筆。', null, () => ROWS.map((r, i) => r[4] ? i : -1).filter(i => i >= 0).slice(0, 3)]
      ];
      $('#dsExpr', root).innerHTML = EX.map((e, i) => `<option value="${i}">${esc(e[0])}</option>`).join('');
      const run = () => {
        const e = EX[+$('#dsExpr', root).value];
        let rows = e[1];
        if (!rows && e[5]) rows = ROWS.map((r, i) => e[5](r) ? i : -1).filter(i => i >= 0);
        if (!rows && e[6]) rows = e[6]();
        const rs = new Set(rows), cs = new Set(e[2]);
        $('#dsTbl', root).innerHTML = `<tr><th></th>${COLS.map((c, j) => `<th class="${cs.has(j) ? 'sel' : ''}">${c}<small>${j}</small></th>`).join('')}</tr>` +
          ROWS.map((r, i) => `<tr><th class="${rs.has(i) ? 'sel' : ''}">${i}</th>${r.map((v, j) => `<td class="${rs.has(i) && cs.has(j) ? 'hit' : ''}">${v === true ? 'True' : v === false ? 'False' : esc(v)}</td>`).join('')}</tr>`).join('');
        const info = e[3] || (e[7] === 'series' ? `Series，長度 ${rows.length}` : `DataFrame，形狀 (${rows.length}, ${e[2].length})`);
        $('#dsInfo', root).textContent = `${e[0]}\n→ ${info}`;
        $('#dsNote', root).textContent = e[4] + '（表頭與列號下方的小數字是位置，給 iloc 使用。）';
      };
      $('#dsExpr', root).addEventListener('change', run);
      run();
    }
    if (id === 'missing') {
      const V = [120, null, 95, 110, null, 980, 105, 90];
      const known = V.filter(v => v !== null);
      const mean = known.reduce((a, b) => a + b, 0) / known.length;
      const sorted = [...known].sort((a, b) => a - b);
      const median = sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
      const WAY = {
        raw: [V, "df['amount']", '原始資料有 2 個缺失值（NaN）與 1 個異常值 980。pandas 計算平均與總和時會自動略過 NaN。'],
        drop: [V.filter(v => v !== null), "df['amount'].dropna()", '刪除缺失的列。統計結果與原始資料相同，但少了 2 筆資料；如果是 df.dropna()，那兩列的其他欄位也一起消失了。'],
        zero: [V.map(v => v ?? 0), "df['amount'].fillna(0)", '補 0 會把平均拉低。只有當「缺失代表沒有」（例如沒有銷售）時才適合。'],
        mean: [V.map(v => v ?? +mean.toFixed(1)), "df['amount'].fillna(df['amount'].mean())", `補平均數 ${mean.toFixed(1)}：受到異常值 980 影響，補進去的值比大部分資料都大很多。`],
        median: [V.map(v => v ?? median), "df['amount'].fillna(df['amount'].median())", `補中位數 ${median}：不受異常值影響，補進去的值比較接近一般情況。`],
        ffill: [V.map((v, i) => { let j = i; while (j >= 0 && V[j] === null) j--; return j >= 0 ? V[j] : null; }), "df['amount'].ffill()", '向前填補：用前一筆的值補上，適合時間序列中「沒有變化就不記錄」的資料，例如庫存或價格。']
      };
      const fmt = x => Number.isInteger(x) ? String(x) : x.toFixed(1);
      const run = way => {
        const [vals, code, note] = WAY[way];
        const nums = vals.filter(v => v !== null);
        const sum = nums.reduce((a, b) => a + b, 0), avg = sum / nums.length;
        const s2 = [...nums].sort((a, b) => a - b), med = s2.length % 2 ? s2[(s2.length - 1) / 2] : (s2[s2.length / 2 - 1] + s2[s2.length / 2]) / 2;
        const cells = way === 'drop' ? V.map(v => v === null ? '<td class="ms-gone">（刪除）</td>' : `<td>${v}</td>`) : vals.map((v, i) => `<td class="${V[i] === null ? (v === null ? 'ms-na' : 'ms-fill') : v === 980 ? 'ms-out' : ''}">${v === null ? 'NaN' : fmt(v)}</td>`);
        $('#msOut', root).innerHTML = `<div class="table-wrap"><table class="tbl small"><tr><th>索引</th>${V.map((_, i) => `<th>${i}</th>`).join('')}</tr><tr><th>amount</th>${cells.join('')}</tr></table></div>
          <div class="ms-stats"><div><small>筆數</small><b>${nums.length}</b></div><div><small>總和</small><b>${fmt(sum)}</b></div><div><small>平均</small><b>${avg.toFixed(1)}</b></div><div><small>中位數</small><b>${fmt(med)}</b></div></div>`;
        $('#msCode', root).textContent = code;
        $('#msNote', root).textContent = note;
      };
      tabsSelect(root, (t, v) => run(v));
      run('raw');
    }
    if (id === 'groupviz') {
      const D = [['台北', '咖啡', 220], ['高雄', '甜點', 140], ['台北', '甜點', 130], ['台中', '咖啡', 110], ['台北', '茶飲', 75], ['台中', '甜點', 260], ['高雄', '咖啡', 80], ['台中', '茶飲', 120]];
      const COLOR = { 台北: 'g1', 台中: 'g2', 高雄: 'g3', 咖啡: 'g1', 甜點: 'g2', 茶飲: 'g3' };
      const F = { sum: a => a.reduce((x, y) => x + y, 0), mean: a => +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(1), count: a => a.length, max: a => Math.max(...a) };
      const run = () => {
        const by = $('#gvBy', root).value, fn = $('#gvFn', root).value, k = by === 'store' ? 0 : 1, col = by === 'store' ? 'store' : 'category';
        const groups = {};
        D.forEach(r => (groups[r[k]] = groups[r[k]] || []).push(r[2]));
        const keys = Object.keys(groups).sort();   // 與 pandas 相同：依字元碼排序
        $('#gvCode', root).textContent = `df.groupby('${col}')['amount'].${fn}()`;
        $('#gvOut', root).innerHTML = `
          <div class="gv-step"><b>原始資料</b><table class="tbl small">${D.map(r => `<tr class="${COLOR[r[k]]}"><td>${r[0]}</td><td>${r[1]}</td><td class="num">${r[2]}</td></tr>`).join('')}</table></div>
          <div class="gv-step"><b>① split：依 ${col} 分組</b>${keys.map(g => `<div class="gv-group ${COLOR[g]}"><span>${g}</span>${groups[g].map(v => `<i>${v}</i>`).join('')}</div>`).join('')}</div>
          <div class="gv-step"><b>② apply：每組計算 ${fn}</b>${keys.map(g => `<div class="gv-group ${COLOR[g]}"><span>${g}</span>${fn}(${groups[g].join(', ')}) = <strong>${F[fn](groups[g])}</strong></div>`).join('')}</div>
          <div class="gv-step"><b>③ combine：組合成結果</b><pre class="out" style="margin:0">${col}\n${keys.map(g => g.padEnd(4, '　') + String(F[fn](groups[g])).padStart(7)).join('\n')}\nName: amount</pre></div>`;
      };
      root.addEventListener('change', run);
      run();
    }
    if (id === 'chartpick') {
      const svg = inner => `<svg viewBox="0 0 160 90" class="cp-svg">${inner}</svg>`;
      const G = {
        trend: ['折線圖', '資料隨時間的變化：每月營業額、每日訂單數。時間放在橫軸，點很多時不用加標記。', svg('<polyline points="10,70 35,55 60,60 85,35 110,40 135,20 150,25" fill="none" stroke="currentColor" stroke-width="3"/>'),
          "monthly.plot(marker='o', title='每月營業額')\n\n# matplotlib\nplt.plot(months, revenue, marker='o')\nplt.title('每月營業額')", '多條線比較時（例如各門市）不要超過 4～5 條，太多可改用小多圖（subplots）。'],
        compare: ['長條圖／橫條圖', '比較不同類別的數值：各門市營業額、各商品銷量。類別名稱長或類別很多時用橫條圖，並依數值排序。', svg('<rect x="15" y="20" width="25" height="60" fill="currentColor"/><rect x="50" y="40" width="25" height="40" fill="currentColor" opacity=".7"/><rect x="85" y="55" width="25" height="25" fill="currentColor" opacity=".5"/><rect x="120" y="65" width="25" height="15" fill="currentColor" opacity=".35"/>'),
          "s.sort_values().plot(kind='barh', title='各商品營業額')\n\n# matplotlib\nplt.barh(names, values)", '縱軸（數值軸）一定要從 0 開始，否則會誇大差異。'],
        dist: ['直方圖／箱形圖', '看一個數值的分布：訂單金額集中在哪裡、有沒有異常值。箱形圖適合比較多組的分布。', svg('<rect x="10" y="60" width="20" height="20" fill="currentColor" opacity=".6"/><rect x="32" y="35" width="20" height="45" fill="currentColor" opacity=".6"/><rect x="54" y="15" width="20" height="65" fill="currentColor" opacity=".6"/><rect x="76" y="30" width="20" height="50" fill="currentColor" opacity=".6"/><rect x="98" y="55" width="20" height="25" fill="currentColor" opacity=".6"/><rect x="120" y="70" width="20" height="10" fill="currentColor" opacity=".6"/>'),
          "df['amount'].plot(kind='hist', bins=12)\ndf.boxplot(column='amount', by='store')\n\n# matplotlib\nplt.hist(df['amount'], bins=12)", 'bins（區間數）會影響形狀，可以多試幾個值。'],
        rel: ['散佈圖', '看兩個數值變數的關係：訂單數與營業額、年齡與消費金額。點太多時加上透明度 alpha。', svg('<g fill="currentColor" opacity=".7"><circle cx="20" cy="70" r="4"/><circle cx="35" cy="62" r="4"/><circle cx="50" cy="58" r="4"/><circle cx="62" cy="45" r="4"/><circle cx="80" cy="48" r="4"/><circle cx="95" cy="35" r="4"/><circle cx="112" cy="30" r="4"/><circle cx="130" cy="22" r="4"/><circle cx="145" cy="15" r="4"/></g>'),
          "df.plot(kind='scatter', x='orders', y='amount', alpha=0.5)\n\n# matplotlib\nplt.scatter(x, y, alpha=0.5)", '看到明顯趨勢時，可以計算相關係數或畫出迴歸線，但要記得相關不等於因果。'],
        part: ['堆疊長條圖（類別少時可用圓餅圖）', '看整體由哪些部分組成：付款方式佔比、各類別營業額佔比。要比較多個群體的組成時，用百分比堆疊長條圖。', svg('<rect x="20" y="15" width="30" height="25" fill="currentColor"/><rect x="20" y="40" width="30" height="20" fill="currentColor" opacity=".6"/><rect x="20" y="60" width="30" height="20" fill="currentColor" opacity=".35"/><rect x="65" y="15" width="30" height="35" fill="currentColor"/><rect x="65" y="50" width="30" height="15" fill="currentColor" opacity=".6"/><rect x="65" y="65" width="30" height="15" fill="currentColor" opacity=".35"/><rect x="110" y="15" width="30" height="20" fill="currentColor"/><rect x="110" y="35" width="30" height="30" fill="currentColor" opacity=".6"/><rect x="110" y="65" width="30" height="15" fill="currentColor" opacity=".35"/>'),
          "ct = pd.crosstab(df['store'], df['payment'], normalize='index')\nct.plot(kind='bar', stacked=True)", '圓餅圖只適合 2～4 個類別；類別多或要比較多個群體時，人眼很難比較角度大小。']
      };
      const run = k => {
        const [name, when, pic, code, tip] = G[k];
        $('#cpOut', root).innerHTML = `<div class="cp-head">${pic}<div><div class="cp-name">${esc(name)}</div><p class="small" style="margin:4px 0 0">${esc(when)}</p></div></div><pre class="out" style="margin-top:8px">${esc(code)}</pre><p class="small muted" style="margin:6px 0 0">${esc(tip)}</p>`;
      };
      tabsSelect(root, (t, v) => run(v));
      run('trend');
    }
    if (id === 'toolschema') {
      let rows = [['status', 'string', false, '訂單狀態', 'pending,shipped,returned'], ['date_from', 'string', false, '開始日期，格式 YYYY-MM-DD', ''], ['limit', 'integer', false, '最多回傳幾筆，預設 10', '']];
      let fmt = 'api';
      const T = ['string', 'integer', 'number', 'boolean'];
      const drawRows = () => {
        $('#tsRows', root).innerHTML = rows.map((r, i) => `<div class="ts-row" data-i="${i}">
          <input class="input mono" data-k="0" value="${esc(r[0])}" placeholder="名稱">
          <select class="input" data-k="1">${T.map(t => `<option${t === r[1] ? ' selected' : ''}>${t}</option>`).join('')}</select>
          <label class="small"><input type="checkbox" data-k="2"${r[2] ? ' checked' : ''}> 必填</label>
          <input class="input" data-k="3" value="${esc(r[3])}" placeholder="說明">
          <input class="input mono" data-k="4" value="${esc(r[4])}" placeholder="選項（逗號分隔，可留空）">
          <button class="btn sm outline" type="button" data-del="${i}">✕</button></div>`).join('');
      };
      const schema = () => {
        const props = {};
        rows.filter(r => r[0].trim()).forEach(r => {
          const p = { type: r[1] };
          if (r[3].trim()) p.description = r[3].trim();
          const en = r[4].split(',').map(s => s.trim()).filter(Boolean);
          if (en.length) p.enum = r[1] === 'integer' || r[1] === 'number' ? en.map(Number) : en;
          props[r[0].trim()] = p;
        });
        return { type: 'object', properties: props, required: rows.filter(r => r[2] && r[0].trim()).map(r => r[0].trim()) };
      };
      const PY = { string: 'str', integer: 'int', number: 'float', boolean: 'bool' };
      const ZOD = { string: 'z.string()', integer: 'z.number().int()', number: 'z.number()', boolean: 'z.boolean()' };
      const PYDEF = { string: '""', integer: '0', number: '0.0', boolean: 'False' };
      const run = () => {
        const name = $('#tsName', root).value.trim(), desc = $('#tsDesc', root).value.trim(), sc = schema();
        const valid = rows.filter(r => r[0].trim());
        let out = '';
        if (fmt === 'api') out = JSON.stringify({ name, description: desc, input_schema: sc }, null, 2);
        if (fmt === 'mcp') out = JSON.stringify({ name, description: desc, inputSchema: sc }, null, 2);
        if (fmt === 'py') {
          const args = [...valid.filter(r => r[2]), ...valid.filter(r => !r[2])].map(r => `${r[0]}: ${PY[r[1]]}` + (r[2] ? '' : ` = ${PYDEF[r[1]]}`)).join(', ');
          out = `@mcp.tool()\ndef ${name}(${args}) -> str:\n    """${desc}\n\n    Args:\n${valid.map(r => `        ${r[0]}: ${r[3] || '（說明）'}`).join('\n')}\n    """\n    ...`;
        }
        if (fmt === 'ts') {
          const fields = valid.map(r => {
            const en = r[4].split(',').map(s => s.trim()).filter(Boolean);
            let z = en.length && r[1] === 'string' ? `z.enum([${en.map(e => JSON.stringify(e)).join(', ')}])` : ZOD[r[1]];
            if (!r[2]) z += '.optional()';
            if (r[3].trim()) z += `.describe(${JSON.stringify(r[3].trim())})`;
            return `      ${r[0]}: ${z},`;
          }).join('\n');
          out = `server.registerTool(\n  ${JSON.stringify(name)},\n  {\n    description: ${JSON.stringify(desc)},\n    inputSchema: z.object({\n${fields}\n    }),\n  },\n  async (args) => {\n    return { content: [{ type: "text", text: "…" }] };\n  },\n);`;
        }
        $('#tsOut', root).textContent = out;
        const lint = [
          [/^[a-z][a-z0-9]*_[a-z0-9_]+$/.test(name), '名稱使用小寫加底線，並有服務前綴（例如 orders_）'],
          [desc.length >= 20, '說明夠具體（至少 20 字）'],
          [/使用|時|when/i.test(desc), '說明有寫「何時使用」'],
          [valid.every(r => r[3].trim()), '每個參數都有說明'],
          [valid.length <= 8, '參數數量適中（8 個以內）']
        ];
        $('#tsLint', root).innerHTML = lint.map(([ok, t]) => `<span class="tag ${ok ? 'ok' : 'warn'}" style="margin:2px">${ok ? '✓' : '·'} ${t}</span>`).join('');
      };
      root.addEventListener('input', e => {
        const row = e.target.closest('.ts-row');
        if (row && e.target.dataset.k) { rows[+row.dataset.i][+e.target.dataset.k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value; }
        run();
      });
      root.addEventListener('change', e => {
        const row = e.target.closest('.ts-row');
        if (row && e.target.dataset.k) rows[+row.dataset.i][+e.target.dataset.k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        run();
      });
      root.addEventListener('click', e => {
        if (e.target.id === 'tsAdd') { rows.push(['', 'string', false, '', '']); drawRows(); run(); }
        const d = e.target.closest('[data-del]'); if (d) { rows.splice(+d.dataset.del, 1); drawRows(); run(); }
      });
      tabsSelect(root, (t, v) => { fmt = v; run(); });
      drawRows(); run();
    }
    if (id === 'agentloop') {
      const U = t => ({ role: 'user', content: t });
      const TU = (id, name, input) => ({ type: 'tool_use', id, name, input });
      const TR = (id, content, err) => ({ type: 'tool_result', tool_use_id: id, content, ...(err ? { is_error: true } : {}) });
      const TX = t => ({ type: 'text', text: t });
      // 每個情境：[說明, 新增的訊息, stop_reason]
      const S = [
        [['使用者送出請求，程式呼叫模型（附上工具清單）', U('訂單 A1001 到哪了？'), null],
         ['模型決定呼叫 get_order，回應的 stop_reason 是 tool_use', { role: 'assistant', content: [TX('我來查詢。'), TU('toolu_1', 'get_order', { order_id: 'A1001' })] }, 'tool_use'],
         ['程式執行 get_order，以 tool_result 回傳（tool_use_id 對應 toolu_1）', { role: 'user', content: [TR('toolu_1', '已出貨，預計 11/02 送達')] }, null],
         ['模型讀到結果後回答，stop_reason 是 end_turn，迴圈結束', { role: 'assistant', content: [TX('您的訂單 A1001 已出貨，預計 11/02 送達。')] }, 'end_turn']],
        [['使用者一次詢問兩筆訂單', U('A1001 和 A1002 分別到哪了？'), null],
         ['模型在同一個回應中要求兩次工具呼叫（平行呼叫）', { role: 'assistant', content: [TU('toolu_1', 'get_order', { order_id: 'A1001' }), TU('toolu_2', 'get_order', { order_id: 'A1002' })] }, 'tool_use'],
         ['程式執行兩個工具，兩個結果放在「同一則」user 訊息中送回', { role: 'user', content: [TR('toolu_1', '已出貨'), TR('toolu_2', '備貨中')] }, null],
         ['模型彙整兩個結果回答', { role: 'assistant', content: [TX('A1001 已出貨；A1002 還在備貨中。')] }, 'end_turn']],
        [['使用者詢問訂單，但編號打錯', U('我的訂單 A10O1 到哪了？'), null],
         ['模型照著使用者給的編號呼叫工具', { role: 'assistant', content: [TU('toolu_1', 'get_order', { order_id: 'A10O1' })] }, 'tool_use'],
         ['工具找不到訂單，程式回傳 is_error 與具體的錯誤說明（不要讓程式當掉）', { role: 'user', content: [TR('toolu_1', '找不到訂單 A10O1。訂單編號格式為 A 加 4 位數字', true)] }, null],
         ['模型根據錯誤說明推測是把 0 打成 O，修正後重試', { role: 'assistant', content: [TX('編號可能是 A1001，我再查一次。'), TU('toolu_2', 'get_order', { order_id: 'A1001' })] }, 'tool_use'],
         ['程式回傳正確結果', { role: 'user', content: [TR('toolu_2', '已出貨，預計 11/02 送達')] }, null],
         ['模型回答並提醒使用者確認編號', { role: 'assistant', content: [TX('您輸入的 A10O1 應該是 A1001：已出貨，預計 11/02 送達。')] }, 'end_turn']]
      ];
      let sc = 0;
      const draw = i => {
        const steps = S[sc], cur = steps[i];
        $('#alStep', root).innerHTML = `<b>${cur[1].role === 'assistant' ? '🤖 模型' : '🧑‍💻 程式'}</b>　${esc(cur[0])}` + (cur[2] ? `　<span class="tag ${cur[2] === 'end_turn' ? 'ok' : 'warn'}">stop_reason: ${cur[2]}</span>` : '');
        $('#alMsgs', root).innerHTML = `<div class="small muted" style="margin-bottom:4px">messages 陣列（共 ${i + 1} 則）</div>` + steps.slice(0, i + 1).map((s, k) => `<div class="al-msg ${s[1].role}${k === i ? ' on' : ''}"><span>${k}　${s[1].role}</span><pre>${esc(JSON.stringify(s[1].content, null, 1).replace(/\n\s*/g, ' '))}</pre></div>`).join('');
      };
      const go = stepCtl(root, 'al', () => S[sc].length, draw, 1300);
      tabsSelect(root, (t, v) => { sc = +v; go(0); });
      go(0);
    }
    if (id === 'patternpick') {
      const Q = [
        ['fixed', '完成任務的步驟可以事先寫死嗎？', ['可以', '不行，要看過程中的結果才知道']],
        ['single', '一次模型呼叫（加上好的提示詞）就能完成嗎？', ['可以', '不行']],
        ['types', '輸入的類型差異很大，分開處理效果更好嗎？', ['是', '否']],
        ['indep', '可以拆成彼此獨立、能同時進行的子任務嗎？', ['是', '否']],
        ['dyn', '子任務要看輸入內容才知道要拆成哪些嗎？', ['是', '否']],
        ['eval', '有明確的評估標準，而且回饋能讓結果明顯變好嗎？', ['是', '否']]
      ];
      const ans = { fixed: 0, single: 1, types: 1, indep: 1, dyn: 1, eval: 1 };
      const run = () => {
        $('#ppQs', root).innerHTML = Q.map(([k, q, opts]) => `<div class="pp-q"><span>${q}</span><div class="tabs" data-q="${k}">${opts.map((o, i) => `<button type="button" data-v="${i}"${ans[k] === i ? ' class="on"' : ''}>${o}</button>`).join('')}</div></div>`).join('');
        const rec = [];
        if (ans.single === 0) rec.push(['單次呼叫', '最簡單、最便宜、最好維護。加上結構化輸出與好的提示詞就夠了。']);
        else if (ans.fixed === 0) rec.push(['提示串連（工作流程）', '依序執行固定的步驟，步驟之間用程式檢查中間結果。']);
        else rec.push(['代理（模型自行規劃）', '步驟無法事先寫死，讓模型在迴圈中使用工具並決定下一步；記得設定回合上限與人工確認。']);
        if (ans.types === 0) rec.push(['路由', '先分類，再交給專門的提示詞、工具或不同大小的模型處理。']);
        if (ans.indep === 0 && ans.dyn === 1) rec.push(['平行化', '獨立的子任務同時執行；需要高可信度的判斷可以用投票。']);
        if (ans.dyn === 0) rec.push(['協調者與工作者', '由協調者依輸入動態拆解任務，分派給子代理，最後彙整。']);
        if (ans.eval === 0) rec.push(['評估與改進', '一個產生、一個依標準評估並回饋，反覆改進到通過。']);
        $('#ppOut', root).innerHTML = '<b>建議的做法</b>' + rec.map(([n, d], i) => `<div class="pp-item"><span>${i + 1}</span><div><b>${n}</b><p class="small" style="margin:2px 0 0">${d}</p></div></div>`).join('') + '<p class="small muted" style="margin:8px 0 0">多個建議可以組合使用，例如先路由，再由協調者拆解任務。能用越簡單的做法解決越好。</p>';
      };
      root.addEventListener('click', e => {
        const b = e.target.closest('[data-q] button'); if (!b) return;
        ans[b.parentElement.dataset.q] = +b.dataset.v; run();
      });
      run();
    }
    if (id === 'mcpflow') {
      const META = { 'io.modelcontextprotocol/protocolVersion': '2026-07-28', 'io.modelcontextprotocol/clientInfo': { name: 'claude-code', version: '1.0.0' }, 'io.modelcontextprotocol/clientCapabilities': { elicitation: {} } };
      const req = (id, method, params = {}) => ({ jsonrpc: '2.0', id, method, params: { ...params, _meta: META } });
      const res = (id, result) => ({ jsonrpc: '2.0', id, result: { resultType: 'complete', ...result } });
      const M = [
        ['server/discover', '查詢伺服器支援的協定版本與能力。2026-07-28 版是無狀態協定，這個請求是選用的，回應可以快取。',
          req(1, 'server/discover'), res(1, { supportedVersions: ['2026-07-28'], capabilities: { tools: { listChanged: true }, resources: {}, prompts: {} }, _meta: { 'io.modelcontextprotocol/serverInfo': { name: 'orders', version: '1.0.0' } }, ttlMs: 3600000, cacheScope: 'public' })],
        ['tools/list', '列出伺服器的工具：名稱、說明與 inputSchema。Host 會把所有伺服器的工具合併後交給模型。',
          req(2, 'tools/list'), res(2, { tools: [{ name: 'orders_get_status', title: '查詢訂單', description: '查詢訂單的出貨狀態與預計送達日', inputSchema: { type: 'object', properties: { order_id: { type: 'string', description: '訂單編號，格式如 A1001' } }, required: ['order_id'] } }], ttlMs: 300000, cacheScope: 'public' })],
        ['tools/call 成功', '模型決定使用工具後，Host 把呼叫轉送給對應的伺服器。結果以 content 陣列回傳。',
          req(3, 'tools/call', { name: 'orders_get_status', arguments: { order_id: 'A1001' } }), res(3, { content: [{ type: 'text', text: 'A1001：已出貨，預計 2026-11-02 送達' }] })],
        ['tools/call 失敗', '工具本身執行失敗（找不到訂單）時，回傳正常的 result 並設定 isError: true，讓模型看到錯誤內容並調整。',
          req(4, 'tools/call', { name: 'orders_get_status', arguments: { order_id: 'A10O1' } }), res(4, { content: [{ type: 'text', text: '找不到訂單 A10O1，訂單編號格式為 A 加 4 位數字' }], isError: true })],
        ['resources/read', '讀取以 URI 識別的資源，例如單筆訂單的完整資料或資料表結構。',
          req(5, 'resources/read', { uri: 'orders://A1001' }), res(5, { contents: [{ uri: 'orders://A1001', mimeType: 'application/json', text: '{"status":"已出貨","eta":"2026-11-02","items":2}' }] })],
        ['prompts/get', '取得伺服器提供的提示範本，通常由使用者在介面上選用（例如斜線指令）。',
          req(6, 'prompts/get', { name: 'weekly_report', arguments: { week: '2026-W44' } }), res(6, { description: '產生每週訂單報告', messages: [{ role: 'user', content: { type: 'text', text: '請整理 2026-W44 的訂單狀況，列出延遲出貨的訂單與原因。' } }] })],
        ['工具清單變更通知', '客戶端以 subscriptions/listen 訂閱後，伺服器的工具改變時會送出通知（沒有 id、不需要回應），客戶端收到後重新呼叫 tools/list。',
          req(7, 'subscriptions/listen', { notifications: { toolsListChanged: true } }), { jsonrpc: '2.0', method: 'notifications/tools/list_changed', params: { _meta: { 'io.modelcontextprotocol/subscriptionId': 7 } } }],
        ['協定錯誤', '呼叫不存在的方法屬於協定層面的錯誤，回傳 JSON-RPC 的 error 物件（Method not found，代碼 -32601）。',
          req(8, 'files/delete'), { jsonrpc: '2.0', id: 8, error: { code: -32601, message: 'Method not found: files/delete' } }]
      ];
      $('#mfMsg', root).innerHTML = M.map((m, i) => `<button type="button" data-v="${i}"${i === 0 ? ' class="on"' : ''}>${esc(m[0])}</button>`).join('');
      const run = i => {
        const [, note, rq, rs] = M[i];
        $('#mfNote', root).textContent = note;
        $('#mfReq', root).textContent = JSON.stringify(rq, null, 2);
        $('#mfRes', root).textContent = JSON.stringify(rs, null, 2);
      };
      tabsSelect(root, (t, v) => run(+v));
      run(0);
    }
  }

  window.Tools = { META, render, bind };
})();
