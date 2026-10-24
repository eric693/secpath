/* Excel 與 Power BI：Excel 篇（函式、樞紐分析與 Power Query）
   <table class="sheet"> 為模擬工作表；<pre class="out"> 為公式範例
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 40,
  title: 'Excel 基礎與整齊的資料表',
  summary: '活頁簿、工作表與儲存格、資料型別與日期序列值、整齊資料的原則、格式化為表格與結構化參照、排序篩選、凍結窗格與常用快捷鍵，以及本課程的銷售範例資料。',
  sections: [
    { id: 'basic', title: 'Excel 的基本組成', html: `
<div class="concepts">
  <div class="concept"><b>活頁簿 Workbook</b><span>一個 Excel 檔案（.xlsx），可以包含多個工作表。</span></div>
  <div class="concept"><b>工作表 Worksheet</b><span>下方的分頁，例如「1 月」「價目表」。</span></div>
  <div class="concept"><b>儲存格 Cell</b><span>欄（A、B、C…）與列（1、2、3…）交會的格子，位址如 B3。</span></div>
  <div class="concept"><b>範圍 Range</b><span>多個儲存格，例如 A2:G9 代表 A2 到 G9 的矩形區域。</span></div>
</div>
<h3>資料型別</h3>
<table>
<tr><th>型別</th><th>預設對齊</th><th>說明</th></tr>
<tr><td>數字</td><td>靠右</td><td>可以計算；千分位、貨幣、百分比只是「格式」，值本身不變</td></tr>
<tr><td>文字</td><td>靠左</td><td>看起來像數字但靠左對齊（左上角有綠色三角形），代表是文字，SUM 不會加總</td></tr>
<tr><td>日期</td><td>靠右</td><td>本質是<b>序列值</b>：1900/1/1 為 1，2024/1/1 為 45292，所以日期可以相減算天數</td></tr>
<tr><td>邏輯值</td><td>置中</td><td>TRUE、FALSE</td></tr>
</table>
<div class="box warn"><b class="t">數字變成文字的陷阱</b>從系統匯出或網頁複製的數字常常是「文字」，SUM 結果為 0 或少算。選取後點驚嘆號選「轉換成數字」，或用 <code>=VALUE(A2)</code>、「資料剖析」轉換。</div>` },
    { id: 'tidy', title: '整齊的資料表', html: `
<p>大部分 Excel 的痛苦，都來自資料表設計不良。函式、樞紐分析、Power BI 都需要<b>整齊的資料（Tidy Data）</b>：</p>
<table>
<tr><th>原則</th><th>錯誤示範</th><th>正確做法</th></tr>
<tr><td>一列一筆資料</td><td>一列放一個業務整年的資料</td><td>每筆交易一列</td></tr>
<tr><td>一欄一種屬性</td><td>1 月、2 月、3 月各一欄</td><td>一欄「月份」、一欄「金額」</td></tr>
<tr><td>一格一個值</td><td>「台北市大安區」放同一格，或「3 箱 / 1200 元」</td><td>拆成縣市、區、數量、金額</td></tr>
<tr><td>不合併儲存格</td><td>同一業務的多列合併成一格</td><td>每一列都填上業務名稱</td></tr>
<tr><td>不留空列、不放小計列</td><td>每個月中間插入小計</td><td>小計交給樞紐分析或公式</td></tr>
<tr><td>標題只有一列</td><td>兩三列合併的表頭</td><td>第一列是欄位名稱，簡短且不重複</td></tr>
</table>
<div class="box tip"><b class="t">給人看與給電腦算要分開</b>原始資料用整齊的格式存在一張工作表，給主管看的報表另外用樞紐分析或公式產生。不要在原始資料上做美化排版。</div>` },
    { id: 'table', title: '格式化為表格（Ctrl＋T）', html: `
<p>選取資料中任一格，按 <kbd>Ctrl</kbd>＋<kbd>T</kbd> 把範圍<b>格式化為表格</b>，好處非常多：</p>
<ul>
<li>新增資料列時，表格<b>自動延伸</b>，公式、格式、樞紐分析的資料來源都會跟著更新。</li>
<li>在欄中輸入一次公式，整欄自動填滿（計算結果欄）。</li>
<li>可以使用<b>結構化參照</b>，公式更好讀：</li>
</ul>
<pre class="out">一般參照：  =SUMIFS($G$2:$G$9, $B$2:$B$9, "王小明")
結構化參照：=SUMIFS(銷售[金額], 銷售[業務], "王小明")
同一列：    =[@數量] * [@單價]</pre>
<p>在「表格設計」索引標籤把表格名稱改成有意義的名字（例如「銷售」），之後的公式與 Power Query 都會用到。</p>` },
    { id: 'shortcuts', title: '排序、篩選與常用快捷鍵', html: `
<table>
<tr><th>功能</th><th>操作</th></tr>
<tr><td>排序、篩選</td><td>資料 → 排序與篩選，或 <kbd>Ctrl</kbd>＋<kbd>Shift</kbd>＋<kbd>L</kbd> 開啟篩選按鈕</td></tr>
<tr><td>凍結窗格</td><td>檢視 → 凍結窗格 → 凍結頂端列，捲動時標題列不動</td></tr>
<tr><td>跳到資料邊緣</td><td><kbd>Ctrl</kbd>＋方向鍵</td></tr>
<tr><td>選取到資料邊緣</td><td><kbd>Ctrl</kbd>＋<kbd>Shift</kbd>＋方向鍵</td></tr>
<tr><td>輸入今天日期</td><td><kbd>Ctrl</kbd>＋<kbd>;</kbd></td></tr>
<tr><td>向下複製上一格</td><td><kbd>Ctrl</kbd>＋<kbd>D</kbd></td></tr>
<tr><td>快速填入</td><td><kbd>Ctrl</kbd>＋<kbd>E</kbd>（第 5 章）</td></tr>
<tr><td>切換絕對參照</td><td>編輯公式時按 <kbd>F4</kbd>（第 2 章）</td></tr>
<tr><td>儲存格格式</td><td><kbd>Ctrl</kbd>＋<kbd>1</kbd></td></tr>
</table>` },
    { id: 'dataset', title: '本課程的範例資料', html: `
<p>Excel 篇的公式範例都使用這張「銷售」資料表（A1:G9）。G 欄金額＝數量 × 單價：</p>
<table class="sheet">
<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th></tr>
<tr><th>1</th><td><b>日期</b></td><td><b>業務</b></td><td><b>地區</b></td><td><b>產品</b></td><td><b>數量</b></td><td><b>單價</b></td><td><b>金額</b></td></tr>
<tr><th>2</th><td>2024/1/5</td><td>王小明</td><td>北區</td><td>滑鼠</td><td class="n">10</td><td class="n">590</td><td class="n">5,900</td></tr>
<tr><th>3</th><td>2024/1/12</td><td>李美華</td><td>中區</td><td>鍵盤</td><td class="n">5</td><td class="n">2,490</td><td class="n">12,450</td></tr>
<tr><th>4</th><td>2024/1/20</td><td>王小明</td><td>北區</td><td>螢幕</td><td class="n">2</td><td class="n">6,990</td><td class="n">13,980</td></tr>
<tr><th>5</th><td>2024/2/3</td><td>張大偉</td><td>南區</td><td>滑鼠</td><td class="n">8</td><td class="n">590</td><td class="n">4,720</td></tr>
<tr><th>6</th><td>2024/2/14</td><td>李美華</td><td>北區</td><td>鍵盤</td><td class="n">3</td><td class="n">2,490</td><td class="n">7,470</td></tr>
<tr><th>7</th><td>2024/2/25</td><td>王小明</td><td>中區</td><td>滑鼠</td><td class="n">15</td><td class="n">590</td><td class="n">8,850</td></tr>
<tr><th>8</th><td>2024/3/3</td><td>張大偉</td><td>南區</td><td>螢幕</td><td class="n">1</td><td class="n">6,990</td><td class="n">6,990</td></tr>
<tr><th>9</th><td>2024/3/15</td><td>李美華</td><td>中區</td><td>滑鼠</td><td class="n">6</td><td class="n">590</td><td class="n">3,540</td></tr>
</table>
<p>建議在自己的 Excel 中照著輸入這 8 筆資料（或用 <kbd>Ctrl</kbd>＋<kbd>T</kbd> 格式化為表格並命名為「銷售」），一邊閱讀一邊實際輸入公式，學習效果最好。</p>` }
  ],
  keypoints: [
    '活頁簿是檔案、工作表是分頁、儲存格以欄字母加列號表示，範圍如 A2:G9。',
    '數字靠右、文字靠左；看起來是數字但靠左對齊時，代表是文字，不會被加總。',
    '日期的本質是序列值，所以可以相減計算天數。',
    '整齊資料：一列一筆、一欄一屬性、一格一值，不合併儲存格、不留空列與小計列。',
    'Ctrl＋T 格式化為表格，新增資料自動延伸，並可使用結構化參照。',
    '常用快捷鍵：Ctrl＋方向鍵跳到邊緣、Ctrl＋D 向下複製、Ctrl＋; 今天日期、Ctrl＋1 儲存格格式。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: '公式與儲存格參照',
  summary: '公式的寫法與運算順序、文字串接、相對參照、絕對參照與混合參照、F4 快捷鍵、跨工作表參照與名稱，以及常見錯誤值的原因與 IFERROR。',
  sections: [
    { id: 'formula', title: '公式與運算子', html: `
<p>公式一定以 <b>=</b> 開頭。輸入 <code>=E2*F2</code> 按 Enter，就會算出金額；修改 E2 或 F2，結果自動更新。</p>
<table>
<tr><th>運算子</th><th>意義</th><th>範例 → 結果</th></tr>
<tr><td><code>+ - * /</code></td><td>加減乘除</td><td><code>=10/4</code> → 2.5</td></tr>
<tr><td><code>^</code></td><td>次方</td><td><code>=2^10</code> → 1024</td></tr>
<tr><td><code>%</code></td><td>百分比</td><td><code>=200*5%</code> → 10</td></tr>
<tr><td><code>&amp;</code></td><td>串接文字</td><td><code>=B2&amp;"（"&amp;C2&amp;"）"</code> → 王小明（北區）</td></tr>
<tr><td><code>= &lt;&gt; &gt; &gt;= &lt; &lt;=</code></td><td>比較，結果為 TRUE／FALSE</td><td><code>=G2&gt;=8000</code> → FALSE</td></tr>
</table>
<p>運算順序與數學相同：括號 → 次方 → 乘除 → 加減。<code>=2+3*4</code> 為 14，<code>=(2+3)*4</code> 為 20。</p>` },
    { id: 'relative', title: '相對參照與絕對參照', html: `
<p>把 G2 的公式 <code>=E2*F2</code> 往下複製到 G3，會自動變成 <code>=E3*F3</code>。這是<b>相對參照</b>：公式記住的是「相對位置」（同一列的 E 與 F）。</p>
<p>但有時希望某個儲存格<b>固定不動</b>。例如 J1 存放營業稅率 5%，每一列的稅額都要乘以 J1：</p>
<pre class="out">H2：=G2*J1      ← 往下複製到 H3 變成 =G3*J2（J2 是空的，結果為 0）✗
H2：=G2*$J$1    ← 往下複製到 H3 變成 =G3*$J$1 ✓</pre>
<p>加上 <b>$</b> 符號就是<b>絕對參照</b>，複製時不會改變。編輯公式時把游標放在參照上按 <kbd>F4</kbd>，會依序切換四種模式：</p>
<table>
<tr><th>寫法</th><th>名稱</th><th>往下複製</th><th>往右複製</th></tr>
<tr><td><code>A1</code></td><td>相對參照</td><td>列號會變</td><td>欄字母會變</td></tr>
<tr><td><code>$A$1</code></td><td>絕對參照</td><td>不變</td><td>不變</td></tr>
<tr><td><code>A$1</code></td><td>混合參照（鎖列）</td><td>不變</td><td>欄字母會變</td></tr>
<tr><td><code>$A1</code></td><td>混合參照（鎖欄）</td><td>列號會變</td><td>不變</td></tr>
</table>
<div class="box memo"><b class="t">記法</b>$ 像一把鎖，鎖在誰前面就固定誰：<code>$A</code> 鎖欄、<code>$1</code> 鎖列。互動練習中的「儲存格參照複製」可以輸入公式，看複製到其他位置後變成什麼。</div>` },
    { id: 'mixed', title: '混合參照：九九乘法表', html: `
<p>混合參照最經典的例子是九九乘法表：B1:J1 放 1～9，A2:A10 放 1～9，在 B2 輸入一個公式，往右、往下複製就完成整張表：</p>
<pre class="out">B2：=$A2*B$1</pre>
<ul>
<li><code>$A2</code>：欄鎖在 A（永遠取最左邊那欄的數字），列跟著變。</li>
<li><code>B$1</code>：列鎖在第 1 列（永遠取最上面那列的數字），欄跟著變。</li>
<li>複製到 D5 時，公式變成 <code>=$A5*D$1</code>。</li>
</ul>
<table class="sheet">
<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>…</th></tr>
<tr><th>1</th><td></td><td class="n">1</td><td class="n">2</td><td class="n">3</td><td>…</td></tr>
<tr><th>2</th><td class="n">1</td><td class="n">1</td><td class="n">2</td><td class="n">3</td><td></td></tr>
<tr><th>3</th><td class="n">2</td><td class="n">2</td><td class="n">4</td><td class="n">6</td><td></td></tr>
<tr><th>4</th><td class="n">3</td><td class="n">3</td><td class="n">6</td><td class="n">9</td><td></td></tr>
</table>
<p>實務上，「各業務 × 各月份的業績表」也是同樣的道理：列標題是業務、欄標題是月份，用一個 SUMIFS 搭配混合參照就能填滿整張表（第 3 章）。</p>` },
    { id: 'sheets', title: '跨工作表參照與名稱', html: `
<pre class="out">=價目表!B2                  ← 參照「價目表」工作表的 B2
='1 月 銷售'!G10             ← 工作表名稱有空白時要加單引號
=[預算.xlsx]2024!C5           ← 參照其他活頁簿（容易斷連結，盡量避免）</pre>
<p>常用的固定值可以<b>定義名稱</b>：選取 J1，在左上角的名稱方塊輸入「稅率」按 Enter，公式就能寫成 <code>=G2*稅率</code>，名稱預設就是絕對參照，也更容易閱讀。管理名稱：公式 → 名稱管理員（<kbd>Ctrl</kbd>＋<kbd>F3</kbd>）。</p>` },
    { id: 'errors', title: '錯誤值與 IFERROR', html: `
<table>
<tr><th>錯誤值</th><th>原因</th><th>常見例子</th></tr>
<tr><td><code>#DIV/0!</code></td><td>除以 0 或空白儲存格</td><td>成長率的分母是 0</td></tr>
<tr><td><code>#N/A</code></td><td>查閱函式找不到值</td><td>XLOOKUP、VLOOKUP 找不到產品代碼</td></tr>
<tr><td><code>#VALUE!</code></td><td>型別錯誤</td><td>文字和數字相乘：<code>="abc"*2</code></td></tr>
<tr><td><code>#REF!</code></td><td>參照的儲存格被刪除</td><td>刪除了公式引用的欄</td></tr>
<tr><td><code>#NAME?</code></td><td>函式或名稱打錯、文字沒加引號</td><td><code>=SUMM(A1:A3)</code>、<code>=IF(A1=是,1,0)</code></td></tr>
<tr><td><code>#SPILL!</code></td><td>動態陣列結果要溢出的範圍被擋住</td><td>FILTER 下方的儲存格有資料（第 5 章）</td></tr>
<tr><td><code>#####</code></td><td>不是錯誤，是欄寬不夠顯示</td><td>把欄拉寬即可</td></tr>
</table>
<p><code>IFERROR(公式, 替代值)</code> 在公式出錯時顯示替代值：</p>
<pre class="out">=IFERROR(G2/E2, 0)
=IFERROR(XLOOKUP(A2, 價目表[產品], 價目表[單價]), "查無此產品")</pre>
<div class="box warn"><b class="t">不要濫用 IFERROR</b>IFERROR 會把所有錯誤都蓋掉，包括你打錯字造成的錯誤，讓問題更難發現。只處理預期中的錯誤，例如查閱找不到時用 <code>IFNA()</code> 或 XLOOKUP 的第 4 個參數。</div>` }
  ],
  keypoints: [
    '公式以 = 開頭，& 串接文字，運算順序為括號、次方、乘除、加減。',
    '相對參照複製時會依相對位置改變；加上 $ 成為絕對參照，複製時不變。',
    'F4 依序切換 A1 → $A$1 → A$1 → $A1；$ 在欄字母前鎖欄、在列號前鎖列。',
    '混合參照可以讓一個公式同時往右、往下複製，例如 =$A2*B$1。',
    '跨工作表參照寫成 工作表!儲存格，名稱有空白要加單引號；定義名稱讓公式更易讀。',
    '#DIV/0! 除以零、#N/A 找不到、#VALUE! 型別錯、#REF! 參照被刪、#NAME? 名稱打錯。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 50,
  title: '統計與邏輯函式',
  summary: '函式的語法、SUM／AVERAGE／COUNT 系列、ROUND 系列、IF／IFS／AND／OR、SUMIFS／COUNTIFS／AVERAGEIFS 條件統計與萬用字元，以及 SUMPRODUCT 與 RANK.EQ。',
  sections: [
    { id: 'basic', title: '基本統計函式', html: `
<p>函式的格式是 <code>=函式名稱(引數1, 引數2, …)</code>。以範例資料為例：</p>
<table>
<tr><th>公式</th><th>結果</th><th>說明</th></tr>
<tr><td><code>=SUM(G2:G9)</code></td><td>63,900</td><td>加總</td></tr>
<tr><td><code>=AVERAGE(G2:G9)</code></td><td>7,987.5</td><td>平均</td></tr>
<tr><td><code>=MAX(G2:G9)</code>／<code>=MIN(G2:G9)</code></td><td>13,980／3,540</td><td>最大值／最小值</td></tr>
<tr><td><code>=COUNT(G2:G9)</code></td><td>8</td><td>計算<b>數字</b>的個數</td></tr>
<tr><td><code>=COUNTA(B2:B9)</code></td><td>8</td><td>計算<b>非空白</b>的個數（含文字）</td></tr>
<tr><td><code>=COUNTBLANK(範圍)</code></td><td>—</td><td>計算空白儲存格的個數</td></tr>
<tr><td><code>=MEDIAN(G2:G9)</code></td><td>7,230</td><td>中位數（7,470 與 6,990 的平均）</td></tr>
</table>
<div class="box warn"><b class="t">COUNT 與 COUNTA</b>COUNT 只算數字，所以 <code>=COUNT(B2:B9)</code>（業務姓名是文字）結果為 0。要算「有幾筆資料」用 COUNTA。</div>
<h3>四捨五入</h3>
<table>
<tr><th>公式</th><th>結果</th></tr>
<tr><td><code>=ROUND(7987.5, 0)</code></td><td>7988（四捨五入）</td></tr>
<tr><td><code>=ROUNDUP(7987.1, 0)</code></td><td>7988（無條件進位）</td></tr>
<tr><td><code>=ROUNDDOWN(7987.9, 0)</code></td><td>7987（無條件捨去）</td></tr>
<tr><td><code>=ROUND(7987.5, -2)</code></td><td>8000（取到百位）</td></tr>
</table>
<p>設定儲存格格式只改變「顯示」，計算時仍用原始值；要真的改變數值才用 ROUND，例如計算稅額與發票金額。</p>` },
    { id: 'if', title: 'IF 條件判斷', html: `
<pre class="out">=IF(條件, 條件成立時的值, 條件不成立時的值)

=IF(G2&gt;=8000, "大單", "一般")
=IF(E2&gt;=10, G2*0.95, G2)                 ← 數量 10 以上打 95 折
=IF(AND(C2="北區", G2&gt;=5000), "北區重點", "")
=IF(OR(D2="螢幕", D2="鍵盤"), "高單價", "低單價")</pre>
<p>多個條件可以用 <b>IFS</b>（Excel 2019 以後），條件由上而下判斷，第一個成立就停止：</p>
<pre class="out">=IFS(G2&gt;=10000, "A", G2&gt;=5000, "B", TRUE, "C")
舊版寫法（巢狀 IF）：=IF(G2&gt;=10000, "A", IF(G2&gt;=5000, "B", "C"))</pre>
<p>以範例資料計算：G2（5,900）→ B、G3（12,450）→ A、G9（3,540）→ C。最後的 <code>TRUE, "C"</code> 相當於「其他」。</p>
<div class="box tip"><b class="t">條件中的文字要加雙引號</b><code>=IF(C2=北區, …)</code> 會出現 #NAME?，因為 Excel 把「北區」當成名稱。文字一定要寫成 <code>"北區"</code>。</div>` },
    { id: 'sumifs', title: 'SUMIFS、COUNTIFS、AVERAGEIFS', html: `
<p>條件統計是 Excel 報表最常用的函式。<b>SUMIFS 的第一個引數是要加總的範圍</b>，後面一組一組寫「條件範圍, 條件」：</p>
<pre class="out">=SUMIFS(加總範圍, 條件範圍1, 條件1, [條件範圍2, 條件2], …)

=SUMIFS(G2:G9, B2:B9, "王小明")                  → 28,730
=SUMIFS(G2:G9, B2:B9, "王小明", C2:C9, "北區")    → 19,880（王小明且北區）
=COUNTIFS(D2:D9, "滑鼠")                          → 4
=COUNTIFS(D2:D9, "滑鼠", E2:E9, "&gt;=10")           → 2
=AVERAGEIFS(E2:E9, D2:D9, "滑鼠")                 → 9.75</pre>
<table>
<tr><th>條件寫法</th><th>意義</th></tr>
<tr><td><code>"王小明"</code></td><td>等於</td></tr>
<tr><td><code>"&gt;=8000"</code></td><td>大於等於 8000（比較運算子與數字一起放在引號中）</td></tr>
<tr><td><code>"&lt;&gt;北區"</code></td><td>不等於北區</td></tr>
<tr><td><code>"&gt;="&amp;J2</code></td><td>大於等於 J2 儲存格的值（用 &amp; 串接）</td></tr>
<tr><td><code>"*滑鼠*"</code></td><td>包含「滑鼠」（* 代表任意字元）</td></tr>
<tr><td><code>"王?明"</code></td><td>? 代表一個字元</td></tr>
</table>
<h3>做出業績統計表</h3>
<p>在 I2:I4 放業務姓名、J1:L1 放月份起始日，一個公式填滿整張表（混合參照的應用）：</p>
<pre class="out">J2：=SUMIFS($G$2:$G$9, $B$2:$B$9, $I2, $A$2:$A$9, "&gt;="&amp;J$1, $A$2:$A$9, "&lt;"&amp;EDATE(J$1, 1))</pre>
<div class="box memo"><b class="t">SUMIF 與 SUMIFS</b>舊的 SUMIF 只能一個條件，而且加總範圍放在<b>最後</b>：<code>=SUMIF(B2:B9, "王小明", G2:G9)</code>。建議一律使用 SUMIFS，一個條件也可以用，順序也不會搞混。</div>` },
    { id: 'more', title: 'SUMPRODUCT 與排名', html: `
<p><code>SUMPRODUCT</code> 把多個範圍對應相乘再加總，不需要輔助欄：</p>
<pre class="out">=SUMPRODUCT(E2:E9, F2:F9)                       → 63,900（數量 × 單價的總和）
=SUMPRODUCT((C2:C9="北區") * E2:E9)              → 15（北區的總數量：10 + 2 + 3）</pre>
<p>排名用 <code>RANK.EQ</code>，第三個引數 0（或省略）為由大到小：</p>
<pre class="out">=RANK.EQ(G7, $G$2:$G$9, 0)                      → 3（8,850 是第 3 高）</pre>
<p>同分時 RANK.EQ 給相同名次並跳號（和 SQL 的 RANK 一樣）。</p>` }
  ],
  keypoints: [
    'COUNT 只算數字，COUNTA 算非空白；設定格式不改變值，要改變數值用 ROUND。',
    'IF(條件, 成立值, 不成立值)；多條件用 IFS 或巢狀 IF；AND、OR 組合條件。',
    '公式中的文字要加雙引號，否則會出現 #NAME?。',
    'SUMIFS 先寫加總範圍，再寫條件範圍與條件；COUNTIFS、AVERAGEIFS 用法相同。',
    '比較條件寫成 ">=8000"，參照儲存格時用 ">="&J2；* 與 ? 是萬用字元。',
    'SUMPRODUCT 對應相乘再加總；RANK.EQ 計算排名，同分跳號。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 50,
  title: '查閱、文字與日期函式',
  summary: 'VLOOKUP 的用法與限制、XLOOKUP、INDEX 加 MATCH、近似比對做級距查表，文字函式拆解與組合資料，日期函式計算月底、到期日、年資與工作天數，以及民國年的處理。',
  sections: [
    { id: 'vlookup', title: 'VLOOKUP', html: `
<p>假設另一張工作表有「價目表」，要依產品名稱帶入單價與類別：</p>
<table class="sheet">
<tr><th></th><th>K</th><th>L</th><th>M</th></tr>
<tr><th>1</th><td><b>產品</b></td><td><b>單價</b></td><td><b>類別</b></td></tr>
<tr><th>2</th><td>滑鼠</td><td class="n">590</td><td>周邊</td></tr>
<tr><th>3</th><td>鍵盤</td><td class="n">2,490</td><td>周邊</td></tr>
<tr><th>4</th><td>螢幕</td><td class="n">6,990</td><td>顯示</td></tr>
<tr><th>5</th><td>耳機</td><td class="n">1,990</td><td>影音</td></tr>
</table>
<pre class="out">=VLOOKUP(找什麼, 在哪個範圍找, 回傳第幾欄, FALSE)

=VLOOKUP(D2, $K$2:$M$5, 2, FALSE)    → 590（滑鼠的單價）
=VLOOKUP("螢幕", $K$2:$M$5, 3, FALSE) → 顯示
=VLOOKUP("喇叭", $K$2:$M$5, 2, FALSE) → #N/A（找不到）</pre>
<ul>
<li>第 4 個引數一定要寫 <b>FALSE（或 0）精確比對</b>。省略時預設是近似比對，資料沒排序就會傳回錯誤的結果卻不報錯。</li>
<li>查找值必須在範圍的<b>第一欄</b>，VLOOKUP 不能往左邊找。</li>
<li>「回傳第幾欄」是數字，範圍中間插入欄位時就會抓錯欄。</li>
<li>查閱範圍要用絕對參照，往下複製才不會跑掉。</li>
</ul>` },
    { id: 'xlookup', title: 'XLOOKUP 與 INDEX＋MATCH', html: `
<p><b>XLOOKUP</b>（Microsoft 365、Excel 2021 以後）解決了 VLOOKUP 的所有缺點：</p>
<pre class="out">=XLOOKUP(找什麼, 查找範圍, 回傳範圍, [找不到時的值], [比對模式], [搜尋模式])

=XLOOKUP(D2, $K$2:$K$5, $L$2:$L$5)                 → 590
=XLOOKUP("喇叭", $K$2:$K$5, $L$2:$L$5, "查無產品")  → 查無產品
=XLOOKUP(590, $L$2:$L$5, $K$2:$K$5)                → 滑鼠（往左找也可以）
=XLOOKUP(D2, 價目表[產品], 價目表[[單價]:[類別]])   → 一次回傳單價與類別兩欄</pre>
<table>
<tr><th></th><th>VLOOKUP</th><th>XLOOKUP</th></tr>
<tr><td>預設比對</td><td>近似（容易出錯）</td><td><b>精確</b></td></tr>
<tr><td>往左查</td><td>不行</td><td>可以</td></tr>
<tr><td>插入欄位</td><td>欄號會錯</td><td>不受影響</td></tr>
<tr><td>找不到時</td><td>#N/A，需搭配 IFNA</td><td>內建第 4 個引數</td></tr>
<tr><td>版本</td><td>所有版本</td><td>Microsoft 365、2021 以後</td></tr>
</table>
<p>需要相容舊版 Excel 時，用 <b>INDEX＋MATCH</b> 組合：MATCH 找出位置，INDEX 依位置取值：</p>
<pre class="out">=MATCH("螢幕", $K$2:$K$5, 0)                       → 3（在第 3 個位置，0 為精確比對）
=INDEX($L$2:$L$5, 3)                               → 6990
=INDEX($L$2:$L$5, MATCH(D2, $K$2:$K$5, 0))         → 依 D2 查單價</pre>
<p>互動練習中的「XLOOKUP 查閱模擬」可以輸入查找值，觀察 XLOOKUP 與 VLOOKUP 的比對過程。</p>` },
    { id: 'approx', title: '近似比對：級距查表', html: `
<p>近似比對適合「級距」：例如依業績決定獎金比例。級距表必須<b>由小到大排序</b>，找「小於等於查找值的最大值」：</p>
<table class="sheet">
<tr><th></th><th>O</th><th>P</th></tr>
<tr><th>1</th><td><b>業績下限</b></td><td><b>獎金比例</b></td></tr>
<tr><th>2</th><td class="n">0</td><td class="n">0%</td></tr>
<tr><th>3</th><td class="n">10,000</td><td class="n">2%</td></tr>
<tr><th>4</th><td class="n">20,000</td><td class="n">3%</td></tr>
<tr><th>5</th><td class="n">30,000</td><td class="n">5%</td></tr>
</table>
<pre class="out">=XLOOKUP(28730, $O$2:$O$5, $P$2:$P$5, , -1)   → 3%（-1：找不到時取下一個較小的值）
=VLOOKUP(28730, $O$2:$P$5, 2, TRUE)           → 3%（舊寫法，TRUE 為近似比對）</pre>
<p>王小明的業績 28,730 介於 20,000 與 30,000 之間，所以適用 3%。這比寫一長串巢狀 IF 更容易維護，調整級距只要改表格。</p>` },
    { id: 'text', title: '文字函式', html: `
<table>
<tr><th>函式</th><th>範例 → 結果</th></tr>
<tr><td><code>LEFT(文字, 字數)</code></td><td><code>=LEFT("台北市大安區", 3)</code> → 台北市</td></tr>
<tr><td><code>RIGHT(文字, 字數)</code></td><td><code>=RIGHT("A2024-0815", 4)</code> → 0815</td></tr>
<tr><td><code>MID(文字, 起點, 字數)</code></td><td><code>=MID("A2024-0815", 2, 4)</code> → 2024</td></tr>
<tr><td><code>LEN(文字)</code></td><td><code>=LEN("王小明")</code> → 3</td></tr>
<tr><td><code>FIND(找什麼, 文字)</code></td><td><code>=FIND("-", "A2024-0815")</code> → 6</td></tr>
<tr><td><code>TRIM(文字)</code></td><td>去除前後空白，字中多個空白變一個</td></tr>
<tr><td><code>SUBSTITUTE(文字, 舊, 新)</code></td><td><code>=SUBSTITUTE("0912-345-678", "-", "")</code> → 0912345678</td></tr>
<tr><td><code>UPPER</code>／<code>LOWER</code>／<code>PROPER</code></td><td>轉大寫／小寫／字首大寫</td></tr>
<tr><td><code>TEXT(值, 格式)</code></td><td><code>=TEXT(5900, "#,##0")</code> → 5,900（文字）</td></tr>
<tr><td><code>TEXTJOIN(分隔符, 略過空白, 範圍)</code></td><td><code>=TEXTJOIN("、", TRUE, B2:B4)</code> → 王小明、李美華、王小明</td></tr>
</table>
<p>組合使用：取出「-」前面的部分 <code>=LEFT(A2, FIND("-", A2)-1)</code>。文字串接用 <code>&amp;</code> 或 <code>CONCAT</code>：<code>=B2&amp;"的業績是"&amp;TEXT(G2, "#,##0")&amp;"元"</code>。</p>
<div class="box tip"><b class="t">TEXT 傳回的是文字</b>用 TEXT 格式化後的結果是文字，不能再拿來計算。只是要改變顯示方式時，用儲存格格式（Ctrl＋1）就好。</div>` },
    { id: 'date', title: '日期函式與民國年', html: `
<table>
<tr><th>函式</th><th>範例 → 結果</th></tr>
<tr><td><code>TODAY()</code>／<code>NOW()</code></td><td>今天日期／現在日期時間（每次重新計算都會更新）</td></tr>
<tr><td><code>DATE(年, 月, 日)</code></td><td><code>=DATE(2024, 2, 30)</code> → 2024/3/1（自動進位）</td></tr>
<tr><td><code>YEAR</code>／<code>MONTH</code>／<code>DAY</code></td><td><code>=MONTH("2024/2/14")</code> → 2</td></tr>
<tr><td><code>EOMONTH(日期, 月數)</code></td><td><code>=EOMONTH("2024/2/14", 0)</code> → 2024/2/29（當月最後一天）</td></tr>
<tr><td><code>EDATE(日期, 月數)</code></td><td><code>=EDATE("2024/1/31", 1)</code> → 2024/2/29（一個月後，月底自動調整）</td></tr>
<tr><td><code>WEEKDAY(日期, 2)</code></td><td>星期一為 1、星期日為 7</td></tr>
<tr><td><code>NETWORKDAYS(起, 迄, 假日)</code></td><td>兩日期之間的工作天數（排除週末與指定假日）</td></tr>
<tr><td><code>WORKDAY(起, 天數, 假日)</code></td><td>幾個工作天之後的日期</td></tr>
<tr><td><code>DATEDIF(起, 迄, "Y")</code></td><td>相差幾年（"M" 月、"D" 天），常用來算年資與年齡</td></tr>
</table>
<pre class="out">到職日 A2 = 2021/9/1，今天 = 2024/6/30
年資（年）：=DATEDIF(A2, TODAY(), "Y")             → 2
付款期限（月結 30 天）：=EOMONTH(訂單日期, 0) + 30
相差天數：="2024/3/15" - "2024/1/5"                → 70</pre>
<h3>民國年</h3>
<pre class="out">西元轉民國年數字：=YEAR(A2) - 1911                    → 113
顯示為民國日期：  =TEXT(A2, "[$-zh-TW]e/mm/dd")        → 113/01/05
民國字串轉日期：  "113/01/05" → =DATE(LEFT(B2,3)+1911, MID(B2,5,2), RIGHT(B2,2))</pre>
<p>TEXT 的民國年格式（e 代表民國年）依 Excel 版本與地區設定而定，結果不如預期時改用 <code>YEAR(A2)-1911</code> 組合。最推薦的做法是把儲存格格式設定為「日期 → 行事曆類型：中華民國曆」，值仍是日期、只改變顯示，仍然可以計算。</p>` }
  ],
  keypoints: [
    'VLOOKUP 第 4 個引數要寫 FALSE 精確比對；只能往右查，插入欄位會讓欄號錯誤。',
    'XLOOKUP 預設精確比對、可往左查、內建找不到時的值，是新版 Excel 的首選。',
    'INDEX＋MATCH 是相容舊版的萬用查閱組合，MATCH 第三個引數 0 為精確比對。',
    '級距查表用近似比對，級距表要由小到大排序；XLOOKUP 的比對模式 -1 取下一個較小值。',
    'LEFT、RIGHT、MID、FIND、SUBSTITUTE 拆解文字；TEXT 傳回的是文字，不能再計算。',
    'EOMONTH 求月底、EDATE 加減月、NETWORKDAYS 算工作天、DATEDIF 算年資；民國年＝西元年－1911。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 45,
  title: '資料清理、驗證與動態陣列',
  summary: '移除重複、資料剖析、快速填入、尋找與取代、TRIM 與 CLEAN，資料驗證下拉選單、條件式格式設定，以及 FILTER、SORT、UNIQUE 等動態陣列函式與 #SPILL! 錯誤。',
  sections: [
    { id: 'clean', title: '資料清理工具', html: `
<table>
<tr><th>問題</th><th>工具</th><th>位置</th></tr>
<tr><td>重複的資料列</td><td>移除重複項目</td><td>資料 → 資料工具</td></tr>
<tr><td>一格中有多個值（例如「王小明,北區」）</td><td>資料剖析（依分隔符號或固定寬度拆欄）</td><td>資料 → 資料剖析</td></tr>
<tr><td>依規律拆分或組合（例如從 Email 取出帳號）</td><td><b>快速填入</b>：手動打一兩個範例後按 <kbd>Ctrl</kbd>＋<kbd>E</kbd></td><td>資料 → 快速填入</td></tr>
<tr><td>統一用詞（台北／臺北）</td><td>尋找與取代 <kbd>Ctrl</kbd>＋<kbd>H</kbd></td><td>常用 → 尋找與選取</td></tr>
<tr><td>多餘空白、看不見的字元</td><td><code>=TRIM()</code>、<code>=CLEAN()</code></td><td>函式</td></tr>
<tr><td>數字被存成文字</td><td>轉換成數字、<code>=VALUE()</code>、資料剖析直接按完成</td><td>—</td></tr>
<tr><td>空白儲存格要填入上一格的值</td><td>選取 → 到（F5）→ 特殊 → 空格，輸入 =上一格 再按 Ctrl＋Enter</td><td>—</td></tr>
</table>
<div class="box tip"><b class="t">每個月都要重複清理？</b>如果每個月都要對新匯出的資料做同樣的清理步驟，請改用第 7 章的 Power Query，把步驟記錄下來，之後只要按重新整理。</div>` },
    { id: 'validation', title: '資料驗證與下拉選單', html: `
<p>讓別人填寫的表格，最好從源頭限制輸入內容，避免出現「北區」「北部」「台北」各種寫法：</p>
<ol>
<li>選取要限制的儲存格範圍。</li>
<li>資料 → <b>資料驗證</b> → 儲存格內允許：<b>清單</b>。</li>
<li>來源輸入 <code>北區,中區,南區</code>，或選取一個存放選項的範圍（建議放在另一張工作表的表格中，新增選項時自動更新）。</li>
<li>「錯誤提醒」可以設定輸入錯誤時的訊息。</li>
</ol>
<p>資料驗證也可以限制整數範圍、日期範圍、文字長度，或用自訂公式（例如 <code>=COUNTIF($A:$A, A2)=1</code> 禁止重複輸入）。</p>` },
    { id: 'cf', title: '條件式格式設定', html: `
<p>常用 → <b>條件式格式設定</b>，讓符合條件的儲存格自動變色，一眼看出重點與異常：</p>
<table>
<tr><th>規則</th><th>用途</th></tr>
<tr><td>醒目提示儲存格規則：大於、小於、介於、重複的值</td><td>標示金額大於 10,000 的訂單、找出重複的編號</td></tr>
<tr><td>前段／後段項目規則：前 10 項、高於平均</td><td>業績前 3 名</td></tr>
<tr><td>資料橫條、色階、圖示集</td><td>在儲存格中畫出長條圖或紅黃綠燈號</td></tr>
<tr><td>使用公式來決定要格式化哪些儲存格</td><td>整列變色，例如 <code>=$G2&gt;=10000</code>（注意欄要加 $）</td></tr>
</table>
<p>使用公式時，公式是以選取範圍的<b>左上角儲存格</b>為準來寫，其他儲存格依相對參照套用。要整列變色，欄要鎖定（<code>$G2</code>）、列不鎖定。</p>` },
    { id: 'dynamic', title: '動態陣列：FILTER、SORT、UNIQUE', html: `
<p>Microsoft 365 的<b>動態陣列函式</b>，一個公式就能傳回多列多欄的結果，自動「溢出」到旁邊的儲存格：</p>
<pre class="out">=UNIQUE(B2:B9)                              → 王小明、李美華、張大偉（3 列）
=SORT(UNIQUE(D2:D9))                        → 不重複且排序的產品清單
=FILTER(A2:G9, C2:C9="北區")                 → 北區的 3 筆完整資料
=FILTER(A2:G9, (D2:D9="滑鼠")*(E2:E9&gt;=10))   → 滑鼠且數量 10 以上（* 代表「而且」）
=FILTER(A2:G9, (C2:C9="北區")+(C2:C9="南區"))→ 北區或南區（+ 代表「或」）
=FILTER(A2:G9, C2:C9="東區", "查無資料")     → 找不到時顯示「查無資料」
=SORTBY(B2:B9, G2:G9, -1)                   → 依金額由大到小排列業務姓名
=SEQUENCE(12)                               → 1 到 12 的數列</pre>
<p>搭配使用就能做出「自動更新的報表」：</p>
<pre class="out">I2：=UNIQUE(B2:B9)                          ← 業務清單（3 列）
J2：=SUMIFS(G2:G9, B2:B9, I2#)              ← I2# 代表 I2 溢出的整個範圍，各業務業績一次算完</pre>
<div class="box warn"><b class="t">#SPILL! 錯誤</b>動態陣列要溢出的範圍中已經有資料，或在格式化的表格內使用，就會出現 #SPILL!。清空下方的儲存格，或把公式移到表格外即可。舊版 Excel 沒有這些函式，開啟檔案會顯示 #NAME?。</div>` }
  ],
  keypoints: [
    '移除重複、資料剖析、快速填入（Ctrl＋E）、尋找取代（Ctrl＋H）是資料清理的基本工具。',
    'TRIM 去除多餘空白、CLEAN 去除不可見字元、VALUE 把文字轉成數字。',
    '資料驗證的「清單」可做下拉選單，從源頭統一輸入內容。',
    '條件式格式用公式整列變色時，欄要加 $，以選取範圍左上角為準撰寫。',
    'UNIQUE、SORT、FILTER 等動態陣列函式自動溢出結果；FILTER 中 * 代表而且、+ 代表或。',
    '溢出範圍被擋住會出現 #SPILL!；I2# 代表 I2 溢出的整個範圍。'
  ]
},
{
  id: 'c06', subject: 1, minutes: 50,
  title: '樞紐分析表與圖表',
  summary: '建立樞紐分析表、四個欄位區域、值的摘要方式與顯示方式、日期群組、交叉分析篩選器與時間表、重新整理與資料來源，以及樞紐分析圖與圖表類型的選擇。',
  sections: [
    { id: 'create', title: '建立樞紐分析表', html: `
<p><b>樞紐分析表（PivotTable）</b>不用寫任何公式，用拖拉的方式就能把幾萬筆資料彙總成報表，是辦公室最實用的功能：</p>
<ol>
<li>點選資料中任一格（建議先 Ctrl＋T 格式化為表格）。</li>
<li>插入 → <b>樞紐分析表</b> → 新工作表 → 確定。</li>
<li>從右側欄位清單把欄位拖到四個區域。</li>
</ol>
<table>
<tr><th>區域</th><th>放什麼</th><th>範例</th></tr>
<tr><td><b>列</b></td><td>要分組的類別（直向展開）</td><td>業務</td></tr>
<tr><td><b>欄</b></td><td>要分組的類別（橫向展開）</td><td>產品</td></tr>
<tr><td><b>值</b></td><td>要計算的數字</td><td>金額（加總）</td></tr>
<tr><td><b>篩選</b></td><td>整張報表的篩選條件</td><td>地區</td></tr>
</table>
<p>業務放「列」、產品放「欄」、金額放「值」，就得到：</p>
<table class="sheet">
<tr><th></th><th>加總 - 金額</th><th>滑鼠</th><th>鍵盤</th><th>螢幕</th><th>總計</th></tr>
<tr><th></th><td>王小明</td><td class="n">14,750</td><td class="n"></td><td class="n">13,980</td><td class="n">28,730</td></tr>
<tr><th></th><td>李美華</td><td class="n">3,540</td><td class="n">19,920</td><td class="n"></td><td class="n">23,460</td></tr>
<tr><th></th><td>張大偉</td><td class="n">4,720</td><td class="n"></td><td class="n">6,990</td><td class="n">11,710</td></tr>
<tr><th></th><td><b>總計</b></td><td class="n">23,010</td><td class="n">19,920</td><td class="n">20,970</td><td class="n">63,900</td></tr>
</table>
<p>互動練習中的「樞紐分析模擬」可以切換列、欄、值與摘要方式，即時看到結果。</p>` },
    { id: 'values', title: '摘要方式與值的顯示方式', html: `
<p>在「值」區域的欄位上按右鍵（或點選 → 值欄位設定）：</p>
<table>
<tr><th>設定</th><th>選項</th><th>用途</th></tr>
<tr><td><b>摘要值方式</b></td><td>加總、計數、平均值、最大值、最小值</td><td>金額用加總、訂單筆數用計數、平均客單價用平均</td></tr>
<tr><td><b>值的顯示方式</b></td><td>總計百分比、欄總和百分比、列總和百分比、差異、累計加總、排名</td><td>各業務佔總業績的比例、月增減</td></tr>
</table>
<p>同一個欄位可以拖兩次到值區域，一個設定「加總」、一個設定「總計百分比」，就能同時顯示金額與佔比：王小明 28,730（45.0%）、李美華 23,460（36.7%）、張大偉 11,710（18.3%）。</p>
<div class="box warn"><b class="t">數字變成「計數」</b>金額欄中只要有一格是文字或空白，拖進值區域時預設會變成「計數」。檢查原始資料，修正後重新整理，再把摘要方式改回加總。</div>` },
    { id: 'group', title: '日期群組與篩選器', html: `
<ul>
<li><b>日期群組</b>：把日期欄位拖到列區域，新版 Excel 會自動依年、季、月群組；也可以在日期上按右鍵 → 組成群組，選擇月、季、年。範例資料依月份群組：1 月 32,330、2 月 21,040、3 月 10,530。</li>
<li><b>交叉分析篩選器</b>：樞紐分析表分析 → 插入交叉分析篩選器，出現按鈕式的篩選面板，主管點一下就能切換地區或業務。一個篩選器可以同時連結多張樞紐分析表（報表連線）。</li>
<li><b>時間表</b>：專門給日期使用的篩選器，可以拖拉選擇月份區間。</li>
<li><b>顯示報表篩選頁面</b>：把「業務」放在篩選區域後使用，可以一次為每位業務產生一張工作表。</li>
</ul>
<h3>重新整理與資料來源</h3>
<p>樞紐分析表<b>不會自動更新</b>。原始資料修改後要按右鍵 → 重新整理（或資料 → 全部重新整理，<kbd>Ctrl</kbd>＋<kbd>Alt</kbd>＋<kbd>F5</kbd>）。如果資料來源是「格式化的表格」，新增的資料列重新整理後就會納入；如果是固定範圍（A1:G9），新增的資料不會被包含。</p>` },
    { id: 'chart', title: '樞紐分析圖與圖表選擇', html: `
<p>點選樞紐分析表 → 樞紐分析表分析 → <b>樞紐分析圖</b>，圖表會跟著篩選器連動。選擇圖表類型的原則：</p>
<table>
<tr><th>想表達什麼</th><th>建議圖表</th><th>避免</th></tr>
<tr><td>比較各項目的大小</td><td>直條圖、橫條圖（項目名稱長時用橫條）</td><td>3D 立體圖（會扭曲比例）</td></tr>
<tr><td>隨時間的變化趨勢</td><td>折線圖</td><td>圓餅圖</td></tr>
<tr><td>佔整體的比例（項目少於 5 個）</td><td>圓餅圖、環圈圖，或 100% 堆疊橫條</td><td>項目太多的圓餅圖</td></tr>
<tr><td>兩個數值的關係</td><td>散佈圖</td><td>—</td></tr>
<tr><td>實際與目標</td><td>直條圖加目標線、子彈圖</td><td>儀表板風格的半圓圖</td></tr>
</table>
<div class="box tip"><b class="t">圖表設計原則</b>標題直接寫出結論（例如「王小明業績佔 45%，為第一名」）、刪除不必要的格線與圖例、數值軸從 0 開始、用一個強調色標出重點，其他用灰色。</div>` }
  ],
  keypoints: [
    '樞紐分析表用拖拉彙總資料：分類放列或欄、數字放值、整體條件放篩選。',
    '摘要值方式決定加總、計數或平均；值的顯示方式可以顯示總計百分比、差異、累計。',
    '值區域變成計數，通常是金額欄有文字或空白。',
    '日期可依年、季、月群組；交叉分析篩選器與時間表提供按鈕式篩選並可連結多張報表。',
    '樞紐分析表不會自動更新，要重新整理；以格式化表格為資料來源才會納入新增的資料。',
    '比較用直條或橫條圖、趨勢用折線圖、比例用圓餅圖（項目要少），避免 3D 圖表。'
  ]
},
{
  id: 'c07', subject: 1, minutes: 45,
  title: 'Power Query 自動化整理',
  summary: '什麼是 Power Query、取得資料的來源、Power Query 編輯器與套用的步驟、常用轉換、取消樞紐、合併查詢與附加查詢、合併資料夾中的多個檔案，以及重新整理與 M 語言。',
  sections: [
    { id: 'what', title: '什麼是 Power Query', html: `
<p>每個月從系統匯出報表，都要刪除前幾列標題、拆欄、改格式、合併好幾個檔案……這些重複的工作，<b>Power Query</b> 可以幫你記錄成步驟，下個月只要按<b>重新整理</b>就自動完成。</p>
<div class="flow"><span>取得資料</span><span>在編輯器中轉換（每個操作記錄成一個步驟）</span><span>關閉並載入到工作表或資料模型</span><span>下個月：重新整理</span></div>
<p>Power Query 內建於 Excel 2016 以後（資料 → 取得資料），<b>Power BI 中的資料整理用的也是同一套 Power Query</b>，學一次兩邊都能用。</p>
<table>
<tr><th>常見資料來源</th><th>說明</th></tr>
<tr><td>Excel 活頁簿、CSV、文字檔</td><td>最常用</td></tr>
<tr><td>資料夾</td><td>一次合併資料夾中格式相同的所有檔案</td></tr>
<tr><td>資料庫（SQL Server、MySQL、PostgreSQL）</td><td>可直接下 SQL 查詢</td></tr>
<tr><td>網頁、SharePoint、OneDrive</td><td>例如抓取網頁上的表格</td></tr>
</table>` },
    { id: 'editor', title: '編輯器與常用轉換', html: `
<p>在 Power Query 編輯器中，每一個操作都會記錄在右側的<b>「套用的步驟」</b>，可以點選任一步驟查看當時的結果，也可以刪除或修改步驟。原始檔案不會被修改。</p>
<table>
<tr><th>轉換</th><th>用途</th></tr>
<tr><td>使用第一列作為標頭</td><td>匯入後欄位名稱在第一列時</td></tr>
<tr><td>移除最上方的資料列</td><td>系統報表前幾列是報表標題</td></tr>
<tr><td>變更資料類型</td><td>把文字轉成數字、日期（<b>很重要</b>，型別錯誤會造成後續計算錯誤）</td></tr>
<tr><td>移除資料行／選擇資料行</td><td>只留下需要的欄位</td></tr>
<tr><td>分割資料行</td><td>依分隔符號拆欄，例如「台北市-大安區」</td></tr>
<tr><td>填滿 → 向下</td><td>補齊合併儲存格造成的空白</td></tr>
<tr><td>取代值、修剪、清除</td><td>統一用詞、去除空白</td></tr>
<tr><td>篩選資料列</td><td>排除小計列、空白列</td></tr>
<tr><td>新增資料行 → 自訂資料行</td><td>計算新欄位，例如 [數量] * [單價]</td></tr>
<tr><td>群組依據</td><td>彙總，相當於 SQL 的 GROUP BY</td></tr>
</table>` },
    { id: 'unpivot', title: '取消資料行樞紐', html: `
<p>很多報表是「月份橫著放」的寬表格，這種格式無法直接做樞紐分析。<b>取消資料行樞紐（Unpivot）</b>把它轉成整齊的長表格：</p>
<pre class="out">轉換前（寬表格）                       轉換後（長表格）
業務    │ 1月    │ 2月    │ 3月          業務    │ 月份 │ 金額
────────┼────────┼────────┼──────        ────────┼──────┼───────
王小明  │ 19880  │ 8850   │ 0            王小明  │ 1月  │ 19880
李美華  │ 12450  │ 7470   │ 3540   →     王小明  │ 2月  │ 8850
                                         王小明  │ 3月  │ 0
                                         李美華  │ 1月  │ 12450
                                         …</pre>
<p>操作：選取「業務」欄 → 轉換 → 取消資料行樞紐 → <b>取消其他資料行樞紐</b>。選「其他」的好處是：之後新增 4 月欄位，重新整理也會自動納入。</p>` },
    { id: 'merge', title: '合併查詢與附加查詢', html: `
<table>
<tr><th></th><th>附加查詢（Append）</th><th>合併查詢（Merge）</th></tr>
<tr><td>方向</td><td><b>上下</b>接在一起（增加列）</td><td><b>左右</b>接在一起（增加欄）</td></tr>
<tr><td>用途</td><td>1 月、2 月、3 月的銷售表合成一張</td><td>銷售表依產品名稱帶入價目表的類別</td></tr>
<tr><td>條件</td><td>欄位名稱要相同</td><td>指定兩表對應的欄位（鍵）</td></tr>
<tr><td>相當於 SQL</td><td>UNION ALL</td><td>JOIN</td></tr>
<tr><td>相當於 Excel 函式</td><td>手動複製貼上</td><td>XLOOKUP</td></tr>
</table>
<p>合併查詢時可以選擇<b>聯結種類</b>：左方外部（保留左表全部，最常用，等同 LEFT JOIN）、內部（兩邊都有的）、左方反向（只保留左表中找不到對應的，例如找出價目表中沒有的產品）。</p>` },
    { id: 'folder', title: '合併資料夾中的多個檔案', html: `
<p>這是 Power Query 最省時間的功能。每個月的銷售檔（格式相同）都放進同一個資料夾：</p>
<ol>
<li>資料 → 取得資料 → 從檔案 → <b>從資料夾</b>，選擇資料夾。</li>
<li>按「合併 → 合併並轉換資料」，選擇範例檔案中的工作表。</li>
<li>Power Query 會自動建立「轉換範例檔案」的步驟，套用到資料夾中的每個檔案，再附加成一張表，並新增一欄 Source.Name 記錄來源檔名。</li>
<li>關閉並載入。</li>
</ol>
<p>下個月只要把新檔案放進資料夾，回到 Excel 按<b>全部重新整理</b>，新資料就自動合併進來，樞紐分析表也一起更新。</p>
<div class="box memo"><b class="t">M 語言</b>每個步驟背後是 Power Query 的 M 語言公式，可以在「進階編輯器」中查看與修改，例如 <code>= Table.SelectRows(來源, each [金額] &gt; 0)</code>。一般使用不需要手寫，但看得懂有助於除錯。</div>` }
  ],
  keypoints: [
    'Power Query 把資料整理步驟記錄下來，資料更新後按重新整理即可重跑，Excel 與 Power BI 共用。',
    '套用的步驟可以檢視、修改、刪除，原始檔案不會被修改。',
    '匯入後務必確認資料類型，型別錯誤會造成後續計算錯誤。',
    '取消其他資料行樞紐可把月份橫放的寬表格轉成整齊的長表格。',
    '附加查詢上下接列（像 UNION ALL），合併查詢左右接欄（像 JOIN／XLOOKUP）。',
    '從資料夾取得資料可一次合併多個同格式檔案，新增檔案後重新整理即可。'
  ]
}
);
