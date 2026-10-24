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
    pivot: { name: '樞紐分析模擬', desc: '用講義的銷售範例資料，選擇列、欄、值與摘要方式，即時產生樞紐分析表與總計百分比。' }
  };
  const fmtN = (x, d = 4) => Number.isFinite(x) ? (+x.toFixed(d)).toString() : '—';

  function render(id) {
    switch (id) {
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
  }

  window.Tools = { META, render, bind };
})();
