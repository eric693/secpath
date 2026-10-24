/* Excel 與 Power BI：Power BI 篇（資料模型、DAX 與儀表板）
   <pre class="out"> 為 DAX 與操作範例
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c08', subject: 2, minutes: 40,
  title: 'Power BI 入門',
  summary: 'Power BI 是什麼、與 Excel 的差別、Desktop／Service／Mobile 三個元件、授權方式、從取得資料到發佈的工作流程、Desktop 的三種檢視，以及做出第一張報表。',
  sections: [
    { id: 'what', title: 'Power BI 是什麼', html: `
<p><b>Power BI</b> 是微軟的商業智慧（BI）工具，把公司各處的資料整合起來，做成可以互動、自動更新、在網頁與手機上分享的<b>儀表板</b>。台灣企業的資料分析、業務分析、財務分析職缺越來越常要求 Power BI。</p>
<table>
<tr><th></th><th>Excel</th><th>Power BI</th></tr>
<tr><td>資料量</td><td>約 100 萬列上限，大量資料會變慢</td><td>數千萬列以上（以壓縮的資料模型儲存）</td></tr>
<tr><td>多個資料表</td><td>靠 XLOOKUP 串接</td><td>建立<b>關聯</b>，像資料庫一樣</td></tr>
<tr><td>計算</td><td>儲存格公式</td><td>DAX 量值，隨篩選即時計算</td></tr>
<tr><td>分享</td><td>寄送檔案，版本混亂</td><td>發佈到雲端，權限控管、排程自動更新</td></tr>
<tr><td>互動</td><td>交叉分析篩選器</td><td>點任何圖表都能交叉篩選其他圖表</td></tr>
<tr><td>擅長</td><td>彈性計算、試算、小型報表</td><td>固定格式、需要定期更新與多人查看的儀表板</td></tr>
</table>
<div class="box tip"><b class="t">Excel 的技能都用得上</b>Power BI 的資料整理就是 Power Query（第 7 章），資料模型的觀念和 SQL 的 JOIN 相同，DAX 的語法也和 Excel 函式很像。學過前面的章節，上手 Power BI 會很快。</div>` },
    { id: 'parts', title: '三個元件與授權', html: `
<table>
<tr><th>元件</th><th>用途</th></tr>
<tr><td><b>Power BI Desktop</b></td><td>在電腦上（Windows）建立報表：取得資料、建立模型、寫 DAX、設計視覺效果。免費下載（Microsoft Store）。</td></tr>
<tr><td><b>Power BI Service</b></td><td>雲端服務（app.powerbi.com）：發佈、分享、儀表板、排程重新整理、權限管理。</td></tr>
<tr><td><b>Power BI Mobile</b></td><td>手機 App，隨時查看報表。</td></tr>
</table>
<table>
<tr><th>授權</th><th>說明</th></tr>
<tr><td>免費</td><td>可以使用 Desktop 建立報表、發佈到「我的工作區」個人使用，但不能分享給別人</td></tr>
<tr><td>Pro</td><td>每位使用者付費，可以分享與協作（<b>建立者與查看者都需要 Pro</b>）</td></tr>
<tr><td>Premium Per User／Fabric 容量</td><td>大型企業用，容量授權下查看者可以免費查看</td></tr>
</table>
<p>價格與方案常調整，請以微軟官網為準。學習與作品集用免費的 Desktop 就足夠。</p>` },
    { id: 'flow', title: '工作流程與介面', html: `
<div class="flow"><span>取得資料</span><span>Power Query 轉換</span><span>建立資料模型與關聯</span><span>撰寫 DAX 量值</span><span>設計視覺效果</span><span>發佈到 Service 並分享</span></div>
<p>Power BI Desktop 左側有三種檢視（新版另有 DAX 查詢檢視）：</p>
<table>
<tr><th>檢視</th><th>用途</th></tr>
<tr><td><b>報表檢視</b></td><td>拖拉視覺效果、設計儀表板版面</td></tr>
<tr><td><b>資料表檢視</b></td><td>查看載入的資料、新增計算欄</td></tr>
<tr><td><b>模型檢視</b></td><td>查看與建立資料表之間的關聯</td></tr>
</table>
<p>右側窗格：<b>資料</b>（所有資料表與欄位）、<b>視覺效果</b>（圖表種類與欄位設定）、<b>篩選</b>（視覺效果、頁面、所有頁面三個層級的篩選）。</p>` },
    { id: 'first', title: '做出第一張報表', html: `
<ol>
<li>常用 → 取得資料 → Excel 活頁簿，選擇第 1 章的銷售資料檔，勾選「銷售」表格 → <b>轉換資料</b>（進入 Power Query 確認資料類型）→ 關閉並套用。</li>
<li>在報表檢視中，點選視覺效果中的「群組直條圖」，把「業務」拖到 X 軸、「金額」拖到 Y 軸。</li>
<li>再新增一個「卡片」，把「金額」放進去，顯示總銷售額 63,900。</li>
<li>新增一個「交叉分析篩選器」，放入「地區」。點選北區，直條圖與卡片同時變成北區的數字（27,350）。</li>
<li>點選直條圖中的「王小明」，其他視覺效果也會跟著篩選，這就是 Power BI 的<b>交叉篩選</b>。</li>
<li>儲存為 .pbix 檔。</li>
</ol>
<div class="box memo"><b class="t">直接拖數字欄位的問題</b>把「金額」直接拖進視覺效果，Power BI 會自動加總（隱含量值）。這樣做簡單，但無法重複使用，也不能做複雜計算。第 10 章會改用明確的 DAX 量值，這是專業報表的做法。</div>` }
  ],
  keypoints: [
    'Power BI 是商業智慧工具，擅長大量資料、多表關聯、互動儀表板與雲端分享。',
    'Desktop 建立報表（免費、Windows）、Service 發佈與分享、Mobile 手機查看。',
    '分享報表需要 Pro 授權（建立者與查看者都需要），或企業的 Premium／Fabric 容量。',
    '流程：取得資料 → Power Query 轉換 → 建立模型與關聯 → DAX 量值 → 視覺效果 → 發佈。',
    'Desktop 有報表、資料表、模型三種主要檢視。',
    '點選任一視覺效果會交叉篩選同頁的其他視覺效果。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 45,
  title: '資料模型與關聯',
  summary: '事實資料表與維度資料表、星狀結構與雪花結構、關聯的基數與交叉篩選方向、作用中與非作用中關聯，以及建立日期資料表並標示為日期表。',
  sections: [
    { id: 'fact', title: '事實資料表與維度資料表', html: `
<p>好的 Power BI 報表，關鍵不在圖表，而在<b>資料模型</b>。資料表分成兩種：</p>
<table>
<tr><th></th><th>事實資料表（Fact）</th><th>維度資料表（Dimension）</th></tr>
<tr><td>內容</td><td>發生的事件、交易紀錄</td><td>描述事件的「誰、什麼、哪裡、何時」</td></tr>
<tr><td>例子</td><td>銷售明細、訂單、出勤紀錄</td><td>產品、客戶、業務、門市、日期</td></tr>
<tr><td>筆數</td><td>多（每天持續增加）</td><td>少（相對固定）</td></tr>
<tr><td>欄位</td><td>數字（數量、金額）與各維度的鍵</td><td>描述性文字（名稱、類別、地區）</td></tr>
<tr><td>在視覺效果中</td><td>放在「值」被計算</td><td>放在「軸、圖例、篩選器」</td></tr>
</table>` },
    { id: 'star', title: '星狀結構', html: `
<p>把事實資料表放中間，維度資料表圍繞四周，用關聯連接，就是<b>星狀結構（Star Schema）</b>，這是 Power BI 官方建議的模型設計：</p>
<pre class="out">                 ┌──────────┐
                 │  日期表  │
                 │ 日期 (1) │
                 └────┬─────┘
                      │
┌──────────┐    ┌─────┴──────┐    ┌──────────┐
│  產品表  │    │  銷售明細  │    │  業務表  │
│ 產品 (1) ├────┤ (*) 日期   ├────┤ 業務 (1) │
│ 類別     │    │ (*) 產品   │    │ 地區     │
│ 成本     │    │ (*) 業務   │    │ 主管     │
└──────────┘    │ 數量、金額 │    └──────────┘
                └────────────┘
         維度表 1 ──── * 事實表（一對多）</pre>
<table>
<tr><th>做法</th><th>問題</th></tr>
<tr><td>把所有資料放在一張大寬表</td><td>資料重複、檔案大、DAX 難寫，維度資訊改變要改很多列</td></tr>
<tr><td><b>星狀結構</b>（建議）</td><td>維度資訊只存一份，篩選效率高，DAX 簡單</td></tr>
<tr><td>雪花結構（維度再拆維度，例如產品 → 類別表）</td><td>可以運作，但多一層關聯；Power BI 建議在 Power Query 中把它攤平成單一維度表</td></tr>
</table>
<div class="box memo"><b class="t">和 SQL 的關係</b>星狀結構和 SQL 課程第 11 章的正規化概念相通：維度資訊只存一份，用鍵值關聯。差別是分析用的模型會刻意把維度攤平成一張表，不追求完全正規化。</div>` },
    { id: 'relation', title: '關聯的設定', html: `
<p>在模型檢視中，把維度表的鍵欄位拖到事實表對應的欄位上，就建立了關聯。Power BI 也會自動偵測同名欄位建立關聯（建議檢查是否正確）。</p>
<table>
<tr><th>設定</th><th>選項</th><th>說明</th></tr>
<tr><td><b>基數</b></td><td>一對多（1:*）</td><td>最常見：產品表每個產品一列（1），銷售表同一產品很多列（*）</td></tr>
<tr><td></td><td>一對一（1:1）、多對多（*:*）</td><td>多對多容易產生錯誤的結果，盡量避免</td></tr>
<tr><td><b>交叉篩選方向</b></td><td>單一（預設、建議）</td><td>篩選從維度表（1）流向事實表（*）</td></tr>
<tr><td></td><td>兩者</td><td>雙向篩選，可能造成模糊與效能問題，只在必要時使用</td></tr>
<tr><td><b>作用中</b></td><td>實線為作用中、虛線為非作用中</td><td>兩表之間只能有一條作用中的關聯</td></tr>
</table>
<p>例如銷售表有「訂單日期」與「出貨日期」兩個欄位都要連到日期表，只能有一條是作用中；另一條在 DAX 中用 <code>USERELATIONSHIP</code> 暫時啟用。</p>
<div class="box warn"><b class="t">維度表的鍵必須唯一</b>產品表中如果「滑鼠」出現兩次，就無法建立一對多的關聯。在 Power Query 中先移除重複，或檢查是否有前後空白造成看似相同、其實不同的值。</div>` },
    { id: 'date', title: '日期資料表', html: `
<p>做「年累計、月增率、去年同期」這類時間分析，需要一張<b>連續、完整的日期表</b>（每天一列，沒有缺漏）：</p>
<pre class="out">日期表 =
ADDCOLUMNS(
    CALENDAR(DATE(2024, 1, 1), DATE(2024, 12, 31)),
    "年", YEAR([Date]),
    "月", MONTH([Date]),
    "年月", FORMAT([Date], "yyyy-mm"),
    "季", "Q" &amp; QUARTER([Date]),
    "星期", WEEKDAY([Date], 2)
)</pre>
<ol>
<li>模型 → 新增資料表，輸入上面的 DAX（或用 <code>CALENDARAUTO()</code> 依模型中的日期自動產生範圍）。</li>
<li>選取日期表 → 資料表工具 → <b>標示為日期資料表</b>，選擇 Date 欄位。</li>
<li>把日期表的 Date 與銷售表的日期建立一對多關聯。</li>
<li>報表中的時間軸一律使用<b>日期表</b>的欄位（年、月），不要用銷售表的日期欄位。</li>
</ol>
<p>「年月」欄位依文字排序會正確，但「月」若用中文（例如「1月」）會排成 1月、10月、11月……，要在「依資料行排序」中指定依數字的月欄位排序。</p>` }
  ],
  keypoints: [
    '事實資料表記錄交易事件（多、數字），維度資料表描述誰、什麼、哪裡、何時（少、文字）。',
    '星狀結構：事實表在中間，維度表以一對多關聯圍繞，是 Power BI 建議的模型。',
    '避免一張大寬表；雪花結構建議在 Power Query 中攤平成單一維度表。',
    '關聯的基數以一對多為主；交叉篩選方向建議單一，雙向只在必要時使用。',
    '兩表之間只能有一條作用中關聯，其他可用 USERELATIONSHIP 在 DAX 中啟用。',
    '時間分析需要連續完整的日期表，並標示為日期資料表，報表時間軸使用日期表的欄位。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 55,
  title: 'DAX 入門',
  summary: '計算欄與量值的差別、基本彙總函式、DIVIDE、篩選內容與資料列內容、CALCULATE 修改篩選、ALL 計算佔比、FILTER、X 結尾的迭代函式、時間智慧函式，以及用 VAR 讓公式更易讀。',
  sections: [
    { id: 'measure', title: '計算欄與量值', html: `
<p><b>DAX（Data Analysis Expressions）</b>是 Power BI 的公式語言，有兩種主要用法：</p>
<table>
<tr><th></th><th>計算欄（Calculated Column）</th><th>量值（Measure）</th></tr>
<tr><td>計算時機</td><td>資料重新整理時，每一列算一次並<b>儲存</b>起來</td><td>視覺效果顯示時，依當下的篩選<b>即時計算</b></td></tr>
<tr><td>結果</td><td>每列一個值，像 Excel 新增一欄</td><td>一個彙總值，隨篩選改變</td></tr>
<tr><td>佔用空間</td><td>會增加檔案大小</td><td>不佔空間</td></tr>
<tr><td>適合</td><td>要放在軸、篩選器的分類（例如價格級距）</td><td><b>所有要加總、計算比率的數字</b></td></tr>
<tr><td>範例</td><td><code>金額 = 銷售[數量] * 銷售[單價]</code></td><td><code>總銷售額 = SUM(銷售[金額])</code></td></tr>
</table>
<div class="box tip"><b class="t">原則：能用量值就用量值</b>初學者最常見的錯誤是把每個計算都做成計算欄。只有需要「當成分類使用」的才用計算欄。量值建議集中放在一張空的「量值表」中方便管理。</div>
<p>以下量值使用的模型：銷售表（第 1 章的 8 筆資料）、產品表（滑鼠成本 300、鍵盤 1,400、螢幕 5,000；滑鼠與鍵盤類別為「周邊」、螢幕為「顯示」）。</p>` },
    { id: 'basic', title: '基本彙總與 DIVIDE', html: `
<pre class="out">總銷售額 = SUM(銷售[金額])                              → 63,900
訂單筆數 = COUNTROWS(銷售)                               → 8
業務人數 = DISTINCTCOUNT(銷售[業務])                     → 3
平均每筆金額 = AVERAGE(銷售[金額])                        → 7,987.5
總成本 = SUMX(銷售, 銷售[數量] * RELATED(產品[成本]))     → 37,900
毛利 = [總銷售額] - [總成本]                             → 26,000
毛利率 = DIVIDE([毛利], [總銷售額])                       → 40.7%</pre>
<ul>
<li>量值可以參照其他量值（用中括號 <code>[總銷售額]</code>），由簡單的量值組合出複雜的指標。</li>
<li><code>DIVIDE(分子, 分母)</code> 在分母為 0 時傳回空白，不會出現錯誤，比直接用 / 安全。</li>
<li><code>RELATED</code> 沿著關聯從「多」的一端取得「一」的一端的值，類似 XLOOKUP。</li>
<li>欄位寫成 <code>資料表[欄位]</code>，量值只寫 <code>[量值]</code>，這是辨別兩者的慣例。</li>
</ul>` },
    { id: 'context', title: '篩選內容', html: `
<p>同一個量值 <code>總銷售額 = SUM(銷售[金額])</code>，放在不同的位置會顯示不同的數字。這是因為每個儲存格都有自己的<b>篩選內容（Filter Context）</b>：</p>
<table class="sheet">
<tr><th></th><th>業務</th><th>總銷售額</th><th>這一格的篩選內容</th></tr>
<tr><th></th><td>王小明</td><td class="n">28,730</td><td>業務 = 王小明</td></tr>
<tr><th></th><td>李美華</td><td class="n">23,460</td><td>業務 = 李美華</td></tr>
<tr><th></th><td>張大偉</td><td class="n">11,710</td><td>業務 = 張大偉</td></tr>
<tr><th></th><td>總計</td><td class="n">63,900</td><td>沒有篩選</td></tr>
</table>
<p>篩選內容來自：視覺效果的列與欄、交叉分析篩選器、篩選窗格、點選其他視覺效果的交叉篩選。量值會在這些條件下重新計算。理解篩選內容，是學會 DAX 最重要的一步。</p>
<p>另一種是<b>資料列內容（Row Context）</b>：計算欄與 SUMX 等迭代函式會逐列計算，可以直接取得「這一列」的欄位值。</p>` },
    { id: 'calculate', title: 'CALCULATE 與 ALL', html: `
<p><code>CALCULATE(運算式, 篩選條件1, 篩選條件2, …)</code> 在<b>修改後的篩選內容</b>中計算，是 DAX 最重要的函式：</p>
<pre class="out">周邊銷售額 = CALCULATE([總銷售額], 產品[類別] = "周邊")          → 42,930
北區銷售額 = CALCULATE([總銷售額], 銷售[地區] = "北區")           → 27,350
北區周邊   = CALCULATE([總銷售額], 銷售[地區] = "北區", 產品[類別] = "周邊")   → 13,370</pre>
<p>CALCULATE 中的條件會<b>覆蓋</b>同一欄位原本的篩選。把「北區銷售額」放在依地區分組的表格中，每一列都會顯示 27,350，因為地區的篩選被替換成北區了。</p>
<h3>用 ALL 計算佔比</h3>
<p><code>ALL(資料表或欄位)</code> 移除篩選。計算各業務佔總業績的比例：</p>
<pre class="out">全部業務銷售額 = CALCULATE([總銷售額], ALL(銷售[業務]))
業績佔比 = DIVIDE([總銷售額], [全部業務銷售額])

王小明：28,730 ÷ 63,900 = 45.0%
李美華：23,460 ÷ 63,900 = 36.7%
張大偉：11,710 ÷ 63,900 = 18.3%</pre>
<p>在王小明那一列，[總銷售額] 受「業務 = 王小明」篩選；[全部業務銷售額] 用 ALL 移除了業務的篩選，所以是全部的 63,900。</p>
<div class="box memo"><b class="t">FILTER 函式</b>條件比較複雜時（例如比較兩個欄位、使用量值當條件），用 <code>FILTER(資料表, 條件)</code> 傳回符合條件的列：<code>大單金額 = CALCULATE([總銷售額], FILTER(銷售, 銷售[金額] &gt;= 8000))</code> → 35,280。</div>` },
    { id: 'iterator', title: 'X 結尾的迭代函式', html: `
<p>SUM 只能加總一個欄位。需要「先逐列計算、再彙總」時，用 X 結尾的<b>迭代函式</b>：</p>
<pre class="out">總銷售額（不需金額欄）= SUMX(銷售, 銷售[數量] * 銷售[單價])     → 63,900
平均每筆數量 = AVERAGEX(銷售, 銷售[數量])                       → 6.25
最大單筆金額 = MAXX(銷售, 銷售[數量] * 銷售[單價])              → 13,980</pre>
<p>SUMX 會在銷售表的每一列建立資料列內容，計算數量 × 單價，最後加總。這樣就不需要另外建立「金額」計算欄，模型更精簡。</p>` },
    { id: 'time', title: '時間智慧函式', html: `
<p>有了標示好的日期表，就能用<b>時間智慧函式</b>輕鬆計算各種時間比較：</p>
<pre class="out">年累計銷售額 = TOTALYTD([總銷售額], 日期表[Date])
去年同期     = CALCULATE([總銷售額], SAMEPERIODLASTYEAR(日期表[Date]))
年增率       = DIVIDE([總銷售額] - [去年同期], [去年同期])
上月銷售額   = CALCULATE([總銷售額], DATEADD(日期表[Date], -1, MONTH))
月增率       = DIVIDE([總銷售額] - [上月銷售額], [上月銷售額])</pre>
<p>以範例資料依月份顯示：1 月 32,330、2 月 21,040、3 月 10,530；年累計為 32,330、53,370、63,900；2 月的月增率為 (21,040 − 32,330) ÷ 32,330 ≈ −34.9%。</p>
<h3>用 VAR 讓公式更易讀</h3>
<pre class="out">月增率 =
VAR 本月 = [總銷售額]
VAR 上月 = CALCULATE([總銷售額], DATEADD(日期表[Date], -1, MONTH))
RETURN
    DIVIDE(本月 - 上月, 上月)</pre>
<p>VAR 定義變數、RETURN 傳回結果。變數只計算一次，公式更清楚也更有效率。</p>
<div class="box tip"><b class="t">設定量值格式</b>選取量值後在「量值工具」設定格式：金額用千分位、比率用百分比與小數位數。專業的報表每個數字都有適當的格式。</div>` }
  ],
  keypoints: [
    '計算欄在重新整理時逐列計算並儲存；量值依篩選即時計算、不佔空間，數字指標應使用量值。',
    '量值可參照其他量值組合指標；DIVIDE 在分母為 0 時傳回空白。',
    '每個儲存格都有篩選內容，同一量值在不同位置顯示不同結果。',
    'CALCULATE 在修改後的篩選內容中計算，條件會覆蓋同欄位原本的篩選。',
    'ALL 移除篩選，常用來計算佔比；SUMX 等迭代函式先逐列計算再彙總。',
    '時間智慧：TOTALYTD 年累計、SAMEPERIODLASTYEAR 去年同期、DATEADD 位移；VAR／RETURN 讓公式易讀。'
  ]
},
{
  id: 'c11', subject: 2, minutes: 45,
  title: '視覺化與儀表板設計',
  summary: '選擇適合的視覺效果、卡片與 KPI、交叉分析篩選器與互動設定、鑽研與鑽研至詳細資料、工具提示、條件式格式，以及儀表板的版面與設計原則。',
  sections: [
    { id: 'visuals', title: '選擇視覺效果', html: `
<table>
<tr><th>用途</th><th>視覺效果</th></tr>
<tr><td>一個重要數字（總營收、毛利率）</td><td>卡片、多列卡片、KPI（顯示與目標的差距與趨勢）</td></tr>
<tr><td>比較類別</td><td>橫條圖（類別名稱長）、直條圖</td></tr>
<tr><td>時間趨勢</td><td>折線圖、區域圖</td></tr>
<tr><td>實際 vs 目標、本期 vs 去年</td><td>折線與群組直條圖（組合圖）</td></tr>
<tr><td>組成比例</td><td>環圈圖（項目少）、100% 堆疊橫條圖、樹狀圖</td></tr>
<tr><td>地理分布</td><td>地圖、區域分布圖</td></tr>
<tr><td>明細資料</td><td>資料表、矩陣（類似樞紐分析表，可展開層級）</td></tr>
<tr><td>兩個指標的關係</td><td>散佈圖</td></tr>
</table>` },
    { id: 'interact', title: '互動功能', html: `
<table>
<tr><th>功能</th><th>說明</th></tr>
<tr><td><b>交叉分析篩選器</b></td><td>放在頁面上的篩選按鈕或下拉選單；可「同步交叉分析篩選器」讓多個頁面共用</td></tr>
<tr><td><b>交叉篩選與醒目提示</b></td><td>點選一個視覺效果會影響其他視覺效果；在「格式 → 編輯互動」中可設定為篩選、醒目提示或不影響</td></tr>
<tr><td><b>鑽研（Drill down）</b></td><td>在軸上放入階層（年 → 季 → 月），點選向下展開到更細的層級</td></tr>
<tr><td><b>鑽研至詳細資料（Drill through）</b></td><td>在某個業務上按右鍵，跳到「業務明細頁」並自動篩選該業務</td></tr>
<tr><td><b>工具提示</b></td><td>滑鼠移到資料點上顯示額外資訊，也可以設計成一個迷你報表頁</td></tr>
<tr><td><b>書籤與按鈕</b></td><td>儲存特定的篩選與顯示狀態，做出切換檢視、導覽按鈕</td></tr>
</table>` },
    { id: 'design', title: '儀表板設計原則', html: `
<ol>
<li><b>先問用途</b>：誰看？要回答什麼問題？看完要做什麼決定？主管要的是 5 秒內看到重點，業務要的是自己的明細。</li>
<li><b>Z 字形閱讀動線</b>：最重要的 KPI 卡片放在左上角，往右、往下依序是趨勢圖、分類比較、明細。</li>
<li><b>一頁不超過 6～8 個視覺效果</b>，太多就拆成多頁，用鑽研至詳細資料連結。</li>
<li><b>顏色有意義</b>：用一個品牌色當主色，紅色只用在需要注意的地方（未達標、負成長），不要每個長條都不同顏色。</li>
<li><b>標題寫重點</b>：「各地區銷售額」不如「北區貢獻 43% 營收，南區落後目標 20%」。</li>
<li><b>對齊與留白</b>：視覺效果對齊格線、間距一致，刪除不必要的框線、背景與格線。</li>
<li><b>數字格式</b>：金額千分位或以「萬」為單位、比率顯示百分比，避免顯示 63900.0000。</li>
</ol>
<div class="box tip"><b class="t">條件式格式</b>在資料表與矩陣中，可以對數值設定背景色彩、資料橫條、圖示（例如達成率低於 80% 顯示紅燈），讓異常值一眼可見。</div>` },
    { id: 'mobile', title: '行動版與效能', html: `
<ul>
<li><b>行動版配置</b>：在「檢視 → 行動版配置」中，重新排列視覺效果的位置與大小，手機 App 會使用這個版面。</li>
<li><b>效能分析器</b>：檢視 → 效能分析器，可以看到每個視覺效果的 DAX 查詢花了多久，找出拖慢報表的元件。</li>
<li>減少不必要的欄位與資料列、用量值取代計算欄、避免雙向關聯，都能讓報表更快。</li>
</ul>` }
  ],
  keypoints: [
    '依用途選擇視覺效果：卡片顯示重點數字、折線看趨勢、橫條比較類別、矩陣看明細。',
    '交叉分析篩選器可跨頁同步；編輯互動可設定視覺效果之間的篩選方式。',
    '鑽研向下展開階層；鑽研至詳細資料跳到明細頁並自動篩選。',
    '最重要的 KPI 放左上角，一頁不超過 6～8 個視覺效果。',
    '顏色要有意義、標題寫出重點、數字設定適當格式。',
    '設定行動版配置；用效能分析器找出拖慢報表的視覺效果。'
  ]
},
{
  id: 'c12', subject: 2, minutes: 40,
  title: '發佈、分享與職涯應用',
  summary: '發佈到 Power BI Service、工作區與應用程式、分享方式、排程重新整理與內部部署資料閘道、資料列層級安全性（RLS），以及 MOS、PL-300 證照、作品集與面試準備。',
  sections: [
    { id: 'publish', title: '發佈與分享', html: `
<ol>
<li>在 Desktop 按 <b>常用 → 發佈</b>，選擇要發佈的工作區。</li>
<li>到 app.powerbi.com 開啟報表，可以把重要的視覺效果<b>釘選到儀表板</b>（Dashboard，一頁式的重點總覽）。</li>
<li>分享給同事：</li>
</ol>
<table>
<tr><th>方式</th><th>適合</th></tr>
<tr><td><b>工作區</b></td><td>團隊協作開發，成員依角色（管理員、成員、參與者、檢視者）有不同權限</td></tr>
<tr><td><b>應用程式（App）</b></td><td>把工作區中的報表打包發佈給大量使用者，<b>正式對外分享的建議方式</b></td></tr>
<tr><td>共用連結</td><td>臨時分享單一報表給特定人</td></tr>
<tr><td>內嵌到 Teams、SharePoint</td><td>在員工日常使用的平台中查看</td></tr>
<tr><td>匯出 PDF、PowerPoint</td><td>給沒有授權或需要列印的人</td></tr>
</table>
<div class="box warn"><b class="t">發佈到網路（Publish to web）</b>這個功能會產生任何人都能看的公開連結，<b>不需要登入</b>。公司內部資料絕對不能使用，多數企業的管理員會關閉這個功能。</div>` },
    { id: 'refresh', title: '排程重新整理與閘道', html: `
<p>發佈後要讓報表自動更新，需要在 Service 的語意模型（資料集）設定中設定<b>排程重新整理</b>（Pro 每天最多 8 次）：</p>
<table>
<tr><th>資料來源</th><th>需要</th></tr>
<tr><td>雲端（SharePoint／OneDrive 上的 Excel、Azure SQL、雲端服務）</td><td>設定登入認證即可</td></tr>
<tr><td>公司內部（共用資料夾的 Excel、內部的 SQL Server）</td><td>安裝<b>內部部署資料閘道（On-premises Data Gateway）</b>，讓雲端可以安全地讀取內部資料</td></tr>
</table>
<p>建議把 Excel 資料來源放在 SharePoint 或 OneDrive，就不需要閘道，維護最簡單。</p>
<h3>連線模式</h3>
<table>
<tr><th>模式</th><th>說明</th></tr>
<tr><td><b>匯入（Import）</b></td><td>資料複製到 Power BI 中，查詢最快，依排程更新（最常用）</td></tr>
<tr><td><b>DirectQuery</b></td><td>每次查看都即時查詢資料庫，資料最新，但速度受資料庫影響</td></tr>
</table>` },
    { id: 'rls', title: '資料列層級安全性（RLS）', html: `
<p>同一份業績報表，希望每位業務只能看到自己的資料、區經理只能看自己區域的資料，不必做好幾份報表。這就是<b>資料列層級安全性（Row-Level Security）</b>：</p>
<ol>
<li>在 Desktop：模型 → <b>管理角色</b> → 新增角色「北區」，在業務表設定篩選 <code>[地區] = "北區"</code>。</li>
<li>動態版本：員工表有 Email 欄位，角色篩選寫成 <code>[Email] = USERPRINCIPALNAME()</code>，每個人登入後只看到自己的資料。</li>
<li>用「以角色身分檢視」測試結果。</li>
<li>發佈後在 Service 的語意模型 → 安全性中，把使用者或群組加入角色。</li>
</ol>
<div class="box memo"><b class="t">注意</b>RLS 對工作區的管理員、成員、參與者不會生效（他們可以編輯報表）。要受限制的使用者應該以「檢視者」或透過應用程式查看。</div>` },
    { id: 'career', title: '證照、作品集與面試', html: `
<table>
<tr><th>證照</th><th>內容</th><th>適合</th></tr>
<tr><td><b>MOS Excel Associate／Expert</b></td><td>Excel 操作實機考試，Expert 含樞紐分析、進階函式、巨集</td><td>行政、財會、各種辦公室職缺，台灣企業與公部門認可度高</td></tr>
<tr><td><b>TQC 電腦專業能力認證</b></td><td>國內的 Office 能力認證</td><td>公職、國營事業加分</td></tr>
<tr><td><b>Microsoft PL-300</b></td><td>Power BI 資料分析師：準備資料、建模、視覺化、部署維護</td><td>資料分析、BI 工程師職缺</td></tr>
</table>
<h3>作品集建議</h3>
<ol>
<li><b>Excel 報表</b>：從政府資料開放平臺下載資料（例如各縣市房價、觀光人次），用 Power Query 整理、樞紐分析與圖表做成月報。</li>
<li><b>Power BI 儀表板</b>：建立星狀結構與日期表，寫出年累計、年增率、佔比等量值，做出有 KPI、趨勢、篩選器、鑽研的儀表板。</li>
<li>把 .pbix 檔與截圖放上 GitHub，或用 Power BI 的範例功能展示，在 104 履歷中附上連結並說明解決了什麼問題。</li>
</ol>
<div class="box exam"><b class="t">面試常見題</b>VLOOKUP 與 XLOOKUP 的差別、絕對參照的用途、SUMIFS 的寫法、樞紐分析表的四個區域、Power Query 如何自動化每月報表、計算欄與量值的差別、CALCULATE 的作用、什麼是星狀結構、篩選內容是什麼、如何讓不同人只看到自己的資料（RLS）。</div>` }
  ],
  keypoints: [
    '從 Desktop 發佈到 Service；正式分享建議使用應用程式，團隊協作使用工作區。',
    '「發佈到網路」會產生不需登入的公開連結，公司資料絕對不能使用。',
    '排程重新整理讓報表自動更新；公司內部資料來源需要內部部署資料閘道。',
    '匯入模式查詢最快，DirectQuery 即時查詢資料庫。',
    'RLS 讓不同使用者只看到自己的資料，動態 RLS 使用 USERPRINCIPALNAME()。',
    'Excel 證照有 MOS、TQC；Power BI 為 PL-300，作品集建議各做一份報表與儀表板。'
  ]
}
);
