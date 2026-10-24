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
    pyerr: { name: '錯誤訊息查詢', desc: '輸入或點選錯誤名稱，查看代表的意思、常見原因與修正方式。' }
  };
  const fmtN = (x, d = 4) => Number.isFinite(x) ? (+x.toFixed(d)).toString() : '—';

  function render(id) {
    switch (id) {
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
  }

  window.Tools = { META, render, bind };
})();
