/* SQL 查詢篇：查詢、彙總與資料分析
   <pre class="sql"> 為可在網頁上執行的 SQLite 範例（使用 shop 範例資料庫）；<pre class="out"> 為一般範例
   程式碼內的 < > & 寫成 &lt; &gt; &amp; */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 35,
  title: '資料庫與 SQL 概論',
  summary: '什麼是資料庫與關聯式資料庫、資料表的組成、主鍵與外鍵、SQL 的四大類語法、常見資料庫產品，以及本課程使用的網路商店範例資料。',
  sections: [
    { id: 'why', title: '為什麼要學資料庫與 SQL', html: `
<p>公司的客戶、訂單、商品、員工資料，一開始可能都放在 Excel。資料一多就會遇到這些問題：</p>
<table>
<tr><th>Excel 的痛點</th><th>資料庫的解法</th></tr>
<tr><td>幾十萬筆資料就開不動、很慢</td><td>可處理數億筆資料，查詢靠索引加速</td></tr>
<tr><td>多人同時編輯容易互相覆蓋</td><td>上百人同時讀寫，靠交易確保一致</td></tr>
<tr><td>同一個客戶地址散落在很多列，改一處漏一處</td><td>資料只存一份，其他表用編號參照</td></tr>
<tr><td>任何人都能誤刪、亂填</td><td>權限控管、欄位型別與限制條件</td></tr>
<tr><td>每次分析都要手動篩選、樞紐</td><td>寫好一段 SQL，隨時重跑得到最新結果</td></tr>
</table>
<p><b>SQL（Structured Query Language，結構化查詢語言）</b>是和關聯式資料庫溝通的標準語言。它很像在用英文下指令：「從訂單表中，選出 2024 年的訂單，依金額由大到小排列」。</p>
<div class="box tip"><b class="t">求職觀點</b>在 104 搜尋「SQL」，資料分析師、後端工程師、MIS、數據 PM、行銷分析、財務分析等職缺都會要求。面試常見「現場寫一段查詢」，本課程的範例都以這種題型為目標。</div>` },
    { id: 'rdb', title: '關聯式資料庫的組成', html: `
<p><b>關聯式資料庫（Relational Database）</b>把資料存成多張<b>資料表（Table）</b>，資料表之間用編號互相關聯。</p>
<div class="concepts">
  <div class="concept"><b>資料表 Table</b><span>一種資料一張表，例如客戶表、訂單表。像 Excel 的一個工作表。</span></div>
  <div class="concept"><b>資料列 Row</b><span>一筆資料，例如一位客戶。也叫記錄（Record）。</span></div>
  <div class="concept"><b>欄位 Column</b><span>資料的一個屬性，例如姓名、城市。每個欄位有固定的資料型別。</span></div>
  <div class="concept"><b>主鍵 Primary Key</b><span>唯一識別每一列的欄位，不可重複也不可為空，例如客戶編號 id。</span></div>
  <div class="concept"><b>外鍵 Foreign Key</b><span>參照另一張表主鍵的欄位，例如訂單表的 customer_id 指向客戶表的 id。</span></div>
</div>
<pre class="out">customers（客戶）                    orders（訂單）
┌────┬────────┬────────┐            ┌────┬─────────────┬────────────┐
│ id │ name   │ city   │            │ id │ customer_id │ order_date │
├────┼────────┼────────┤            ├────┼─────────────┼────────────┤
│  1 │ 王小明 │ 台北市 │ ◄────────── │  1 │           1 │ 2024-01-05 │
│  2 │ 李美華 │ 新北市 │ ◄────┐      │  2 │           2 │ 2024-01-12 │
│  3 │ 張大偉 │ 台中市 │      └───── │ 12 │           2 │ 2024-04-30 │
└────┴────────┴────────┘            └────┴─────────────┴────────────┘
   主鍵 id                               外鍵 customer_id → customers.id</pre>
<div class="box analogy"><b class="t">生活比喻</b>主鍵像身分證字號，外鍵像訂單上寫的「訂購人身分證字號」。訂單不必重複寫客戶的地址電話，需要時用編號去客戶表查就好。</div>` },
    { id: 'sqltypes', title: 'SQL 的四大類語法', html: `
<table>
<tr><th>分類</th><th>用途</th><th>主要指令</th></tr>
<tr><td><b>DQL</b> 資料查詢語言</td><td>查詢資料（最常用）</td><td>SELECT</td></tr>
<tr><td><b>DML</b> 資料操作語言</td><td>新增、修改、刪除資料</td><td>INSERT、UPDATE、DELETE</td></tr>
<tr><td><b>DDL</b> 資料定義語言</td><td>建立、修改、刪除資料表結構</td><td>CREATE、ALTER、DROP</td></tr>
<tr><td><b>DCL</b> 資料控制語言</td><td>權限管理</td><td>GRANT、REVOKE</td></tr>
</table>
<p>另外還有管理交易的 <code>BEGIN</code>、<code>COMMIT</code>、<code>ROLLBACK</code>（有時稱為 TCL）。資料分析師最常用 DQL；後端工程師四類都會用到。</p>
<h3>SQL 的書寫習慣</h3>
<ul>
<li>關鍵字不分大小寫，習慣上<b>關鍵字大寫</b>、資料表與欄位小寫，比較好讀。</li>
<li>字串用<b>單引號</b>：<code>'台北市'</code>。雙引號在標準 SQL 中是用來包欄位名稱的。</li>
<li>每段語句以分號 <code>;</code> 結尾，一次執行多段時用分號分隔。</li>
<li>註解：<code>-- 單行註解</code>、<code>/* 多行註解 */</code>。</li>
</ul>` },
    { id: 'products', title: '常見資料庫產品', html: `
<table>
<tr><th>資料庫</th><th>特色</th><th>常見場合</th></tr>
<tr><td><b>MySQL</b></td><td>開源、最普及</td><td>網站後端、電商、WordPress</td></tr>
<tr><td><b>PostgreSQL</b></td><td>開源、功能最完整、標準相容度高</td><td>新創、資料分析、地理資訊</td></tr>
<tr><td><b>Microsoft SQL Server</b></td><td>商用，與 Windows、Power BI 整合好</td><td>台灣中大型企業、製造業 MIS</td></tr>
<tr><td><b>Oracle</b></td><td>商用，大型企業與金融業</td><td>銀行、電信</td></tr>
<tr><td><b>SQLite</b></td><td>單一檔案、免安裝，內建在手機與瀏覽器</td><td>App、嵌入式、學習與原型</td></tr>
</table>
<p>本課程在網頁上以 <b>SQLite</b> 執行範例。九成以上的語法在各資料庫都相同，差異主要在日期函式、字串串接與分頁，講義遇到時會列出對照。</p>
<div class="box memo"><b class="t">NoSQL 是什麼</b>MongoDB、Redis 等不使用資料表結構的資料庫統稱 NoSQL，適合彈性格式或超高速快取。但企業的核心交易資料（訂單、會計、人事）大多仍放在關聯式資料庫，SQL 依然是最基本的技能。</div>` },
    { id: 'dataset', title: '本課程的範例資料庫', html: `
<p>講義中所有 SQL 範例都使用同一個<b>網路商店與公司人事</b>資料庫，共 6 張資料表：</p>
<table>
<tr><th>資料表</th><th>內容</th><th>主要欄位</th></tr>
<tr><td><code>customers</code></td><td>客戶 10 位</td><td>id、name、city、gender、birth_year、joined（加入日期）、level（會員等級）</td></tr>
<tr><td><code>products</code></td><td>商品 10 項</td><td>id、name、category（分類）、price（售價）、cost（成本）</td></tr>
<tr><td><code>orders</code></td><td>訂單 18 筆（2024 年 1～6 月）</td><td>id、customer_id、order_date、status（已完成／已取消／處理中）</td></tr>
<tr><td><code>order_items</code></td><td>訂單明細</td><td>order_id、product_id、qty（數量）、unit_price（成交單價）</td></tr>
<tr><td><code>departments</code></td><td>部門 4 個</td><td>id、name</td></tr>
<tr><td><code>employees</code></td><td>員工 10 位</td><td>id、name、dept_id、manager_id（主管）、title、salary、hire_date</td></tr>
</table>
<p>按下方的「執行」試試看，也可以按「資料表」查看每張表的欄位：</p>
<pre class="sql">SELECT * FROM customers;</pre>
<div class="box tip"><b class="t">放心修改</b>每次按執行，範例資料都會重新建立。把查詢改壞、甚至刪掉整張表都沒關係，按「還原」或重新執行就恢復了。快捷鍵：在程式碼框中按 Ctrl＋Enter（Mac 為 ⌘＋Enter）執行。</div>` }
  ],
  keypoints: [
    '資料庫解決 Excel 在資料量、多人協作、資料一致性與權限上的問題。',
    '關聯式資料庫由資料表組成，每列是一筆資料，每欄是一個屬性。',
    '主鍵唯一識別每一列；外鍵參照另一張表的主鍵，建立表與表的關聯。',
    'SQL 分為 DQL（SELECT）、DML（INSERT／UPDATE／DELETE）、DDL（CREATE／ALTER／DROP）、DCL（GRANT／REVOKE）。',
    '字串使用單引號，關鍵字習慣大寫，語句以分號結尾。',
    '常見資料庫有 MySQL、PostgreSQL、SQL Server、Oracle、SQLite，核心語法大多相同。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 40,
  title: 'SELECT 基本查詢',
  summary: '選取欄位、計算欄位與別名、DISTINCT 去除重複、ORDER BY 排序（多欄位、升冪降冪）、LIMIT 與 OFFSET 分頁，以及各資料庫的語法差異。',
  sections: [
    { id: 'select', title: '選取欄位', html: `
<p>最基本的查詢只需要兩個關鍵字：<code>SELECT</code> 要哪些欄位，<code>FROM</code> 從哪張表。</p>
<pre class="sql">SELECT name, category, price
FROM products;</pre>
<ul>
<li><code>SELECT *</code> 代表全部欄位，探索資料時很方便；但正式程式中建議列出需要的欄位，避免資料表增加欄位後傳回太多資料。</li>
<li>欄位的順序就是結果的順序，可以自由排列。</li>
</ul>
<h3>計算欄位與別名</h3>
<p>SELECT 可以直接做運算，用 <code>AS</code> 幫結果欄位取名字（AS 可省略，但寫出來比較清楚）：</p>
<pre class="sql">SELECT name,
       price,
       cost,
       price - cost AS profit,
       ROUND((price - cost) * 100.0 / price, 1) AS margin_pct
FROM products;</pre>
<div class="box warn"><b class="t">整數除法陷阱</b>在 SQLite、SQL Server、PostgreSQL 中，<code>整數 / 整數</code> 的結果是整數，<code>7 / 2</code> 得到 3。要得到小數，讓其中一邊變成小數：<code>7 * 1.0 / 2</code> 或 <code>7 / 2.0</code>。MySQL 則會直接得到 3.5。</div>
<pre class="sql">SELECT 7 / 2 AS int_div, 7 / 2.0 AS real_div, 7 % 2 AS remainder;</pre>` },
    { id: 'distinct', title: 'DISTINCT 去除重複', html: `
<p>想知道客戶來自哪些城市，直接查 city 會有重複，加上 <code>DISTINCT</code> 只留下不重複的值：</p>
<pre class="sql">SELECT DISTINCT city
FROM customers;</pre>
<p>結果包含一列 <code>NULL</code>，代表有客戶沒有填城市（周雅琪）。NULL 是「沒有值、未知」，會在下一章詳細說明。</p>
<p>DISTINCT 作用在<b>整列</b>，寫多個欄位時是「組合不重複」：</p>
<pre class="sql">SELECT DISTINCT city, gender
FROM customers;</pre>` },
    { id: 'order', title: 'ORDER BY 排序', html: `
<p>資料庫不保證查詢結果的順序。需要特定順序時一定要寫 <code>ORDER BY</code>：</p>
<table>
<tr><th>寫法</th><th>意義</th></tr>
<tr><td><code>ORDER BY price</code></td><td>由小到大（ASC，預設）</td></tr>
<tr><td><code>ORDER BY price DESC</code></td><td>由大到小</td></tr>
<tr><td><code>ORDER BY category, price DESC</code></td><td>先依分類，同分類再依價格由大到小</td></tr>
<tr><td><code>ORDER BY profit</code></td><td>可以用 SELECT 中的別名排序</td></tr>
</table>
<pre class="sql">SELECT category, name, price
FROM products
ORDER BY category, price DESC;</pre>
<div class="box memo"><b class="t">NULL 排在哪</b>SQLite、MySQL、SQL Server 升冪排序時 NULL 排最前面；PostgreSQL、Oracle 排最後面。PostgreSQL 與新版 SQLite 可寫 <code>NULLS LAST</code> 指定。</div>` },
    { id: 'limit', title: 'LIMIT 取前幾筆與分頁', html: `
<p><code>LIMIT n</code> 只取前 n 筆，搭配 ORDER BY 就是「排行榜」：</p>
<pre class="sql">-- 最貴的 3 項商品
SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 3;</pre>
<p>網站分頁用 <code>OFFSET</code> 跳過前面的資料：每頁 4 筆，第 2 頁就是 <code>LIMIT 4 OFFSET 4</code>。</p>
<pre class="sql">SELECT id, name FROM products
ORDER BY id
LIMIT 4 OFFSET 4;</pre>
<h3>各資料庫的寫法</h3>
<table>
<tr><th>資料庫</th><th>取前 3 筆</th></tr>
<tr><td>SQLite、MySQL、PostgreSQL</td><td><code>… ORDER BY price DESC LIMIT 3</code></td></tr>
<tr><td>SQL Server</td><td><code>SELECT TOP 3 … ORDER BY price DESC</code></td></tr>
<tr><td>標準 SQL（PostgreSQL、SQL Server 2012+、Oracle 12c+）</td><td><code>… ORDER BY price DESC FETCH FIRST 3 ROWS ONLY</code></td></tr>
</table>
<div class="box exam"><b class="t">面試重點</b>沒有 ORDER BY 的 LIMIT 取到哪幾筆是不確定的。「取前幾名」一定要先排序。</div>` },
    { id: 'practice', title: '動手練習', html: `
<p>試著修改下面的查詢，完成這些任務：</p>
<ol>
<li>列出所有員工的姓名、職稱與月薪，依月薪由高到低排序。</li>
<li>再加一個欄位 <code>salary * 12 AS annual</code> 計算年薪。</li>
<li>只顯示月薪最高的 5 位。</li>
</ol>
<pre class="sql">SELECT name, title, salary
FROM employees;</pre>
<details><summary>參考答案</summary>
<pre class="out">SELECT name, title, salary, salary * 12 AS annual
FROM employees
ORDER BY salary DESC
LIMIT 5;</pre></details>` }
  ],
  keypoints: [
    'SELECT 欄位 FROM 資料表 是最基本的查詢；SELECT * 取全部欄位，正式程式建議列出欄位。',
    'SELECT 可以做運算，用 AS 為結果欄位取別名。',
    '整數相除在 SQLite、SQL Server、PostgreSQL 會得到整數，要小數需乘以 1.0。',
    'DISTINCT 去除重複，作用在整列（多欄位時是組合不重複）。',
    '沒有 ORDER BY 時結果順序不保證；DESC 為由大到小，可以多欄位排序。',
    'LIMIT 取前 n 筆、OFFSET 跳過筆數；SQL Server 用 TOP，標準 SQL 用 FETCH FIRST。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 45,
  title: 'WHERE 條件篩選',
  summary: '比較運算子、AND／OR／NOT 與運算優先順序、IN、BETWEEN、LIKE 模糊搜尋，以及 NULL 的三值邏輯與 IS NULL 判斷。',
  sections: [
    { id: 'compare', title: '比較運算子', html: `
<p><code>WHERE</code> 放在 FROM 後面，只保留符合條件的資料列：</p>
<pre class="sql">SELECT name, price
FROM products
WHERE price &gt;= 2000;</pre>
<table>
<tr><th>運算子</th><th>意義</th><th>範例</th></tr>
<tr><td><code>=</code></td><td>等於（只有一個等號）</td><td><code>city = '台北市'</code></td></tr>
<tr><td><code>&lt;&gt;</code> 或 <code>!=</code></td><td>不等於</td><td><code>status &lt;&gt; '已取消'</code></td></tr>
<tr><td><code>&gt;</code> <code>&gt;=</code> <code>&lt;</code> <code>&lt;=</code></td><td>大於、大於等於、小於、小於等於</td><td><code>salary &lt; 60000</code></td></tr>
</table>
<p>日期在 SQLite 中以 <code>'YYYY-MM-DD'</code> 文字儲存，這種格式剛好可以直接比大小：</p>
<pre class="sql">SELECT id, customer_id, order_date
FROM orders
WHERE order_date &gt;= '2024-05-01';</pre>` },
    { id: 'logic', title: 'AND、OR、NOT 與優先順序', html: `
<pre class="sql">-- 台北市的金卡會員
SELECT name, city, level
FROM customers
WHERE city = '台北市' AND level = '金卡';</pre>
<p><code>AND</code> 的優先順序比 <code>OR</code> 高，就像乘法比加法先算。下面這個查詢想找「台北或台中的金卡會員」，但寫錯了：</p>
<pre class="sql">-- 錯誤：會被解讀成「台北市（任何等級）」或「台中市的金卡」
SELECT name, city, level FROM customers
WHERE city = '台北市' OR city = '台中市' AND level = '金卡';</pre>
<pre class="sql">-- 正確：用括號明確表達
SELECT name, city, level FROM customers
WHERE (city = '台北市' OR city = '台中市') AND level = '金卡';</pre>
<div class="box tip"><b class="t">好習慣</b>AND 和 OR 混用時一律加括號，就不必記優先順序，別人也看得懂。</div>
<p><code>NOT</code> 用來反轉條件，例如 <code>WHERE NOT status = '已取消'</code>，和 <code>status &lt;&gt; '已取消'</code> 相同。</p>` },
    { id: 'in', title: 'IN、BETWEEN 與 LIKE', html: `
<h3>IN：符合清單中任一值</h3>
<pre class="sql">SELECT name, city FROM customers
WHERE city IN ('台北市', '新北市');   -- 等同 city = '台北市' OR city = '新北市'</pre>
<h3>BETWEEN：範圍（包含兩端）</h3>
<pre class="sql">SELECT name, price FROM products
WHERE price BETWEEN 1000 AND 5000;   -- 等同 price &gt;= 1000 AND price &lt;= 5000</pre>
<div class="box warn"><b class="t">日期時間的 BETWEEN</b>若欄位包含時間（例如 <code>2024-03-31 15:20:00</code>），<code>BETWEEN '2024-03-01' AND '2024-03-31'</code> 會漏掉 3/31 當天 00:00 之後的資料。日期範圍建議寫成 <code>&gt;= '2024-03-01' AND &lt; '2024-04-01'</code>。</div>
<h3>LIKE：模糊搜尋</h3>
<table>
<tr><th>萬用字元</th><th>意義</th><th>範例</th><th>符合</th></tr>
<tr><td><code>%</code></td><td>任意長度（含 0 個字）</td><td><code>name LIKE '王%'</code></td><td>王小明、王建宏</td></tr>
<tr><td><code>_</code></td><td>剛好一個字</td><td><code>name LIKE '_美%'</code></td><td>李美華、黃美玲</td></tr>
</table>
<pre class="sql">SELECT name FROM products WHERE name LIKE '%鍵盤%' OR name LIKE '%滑鼠%';</pre>
<p>SQLite 的 LIKE 對英文字母不分大小寫；PostgreSQL 的 LIKE 區分大小寫，不分大小寫要用 <code>ILIKE</code>。以 % 開頭的 LIKE 無法使用索引，資料量大時會比較慢。</p>` },
    { id: 'null', title: 'NULL 與三值邏輯', html: `
<p><b>NULL</b> 代表「沒有值、未知」，不是 0 也不是空字串。它最容易出錯的地方是：<b>任何值和 NULL 比較，結果都是 NULL（未知）</b>，而 WHERE 只保留結果為「真」的列。</p>
<pre class="sql">-- 想找沒填城市的客戶，這樣寫查不到任何資料！
SELECT name FROM customers WHERE city = NULL;</pre>
<pre class="sql">-- 正確寫法：IS NULL／IS NOT NULL
SELECT name FROM customers WHERE city IS NULL;</pre>
<p>另一個陷阱：<code>&lt;&gt;</code> 也不會選出 NULL。「不是台北市的客戶」應該包含沒填城市的人嗎？</p>
<pre class="sql">SELECT name, city FROM customers WHERE city &lt;&gt; '台北市';            -- 不含周雅琪
SELECT name, city FROM customers WHERE city &lt;&gt; '台北市' OR city IS NULL;  -- 含周雅琪</pre>
<table>
<tr><th>運算</th><th>結果</th></tr>
<tr><td><code>NULL = NULL</code></td><td>NULL（不是真）</td></tr>
<tr><td><code>100 + NULL</code></td><td>NULL</td></tr>
<tr><td><code>TRUE AND NULL</code></td><td>NULL</td></tr>
<tr><td><code>FALSE AND NULL</code></td><td>FALSE</td></tr>
<tr><td><code>TRUE OR NULL</code></td><td>TRUE</td></tr>
</table>
<div class="box exam"><b class="t">面試重點</b>「為什麼 WHERE col = NULL 查不到資料？」是經典題。答：NULL 代表未知，和任何值比較都是未知，必須用 IS NULL。另外 <code>NOT IN (…)</code> 的清單中只要有 NULL，整個條件就永遠不會成立。</div>` }
  ],
  keypoints: [
    'WHERE 篩選資料列，等於用一個等號 =，不等於用 <> 或 !=。',
    'AND 優先於 OR，混用時一律加括號。',
    'IN 比對清單中任一值；BETWEEN 包含兩端；含時間的日期範圍建議用 >= 與 <。',
    'LIKE 中 % 代表任意長度、_ 代表一個字元。',
    'NULL 代表未知，和任何值比較的結果都是 NULL，必須用 IS NULL／IS NOT NULL 判斷。',
    '<> 不會選出 NULL 的資料；NOT IN 的清單含 NULL 時條件永遠不成立。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 45,
  title: '函式、CASE 與型別轉換',
  summary: '字串函式、數值函式、日期函式（含各資料庫差異）、COALESCE 處理 NULL、CASE WHEN 條件判斷，以及 CAST 型別轉換。',
  sections: [
    { id: 'string', title: '字串函式', html: `
<table>
<tr><th>函式</th><th>功能</th><th>範例 → 結果</th></tr>
<tr><td><code>LENGTH(s)</code></td><td>字元數</td><td><code>LENGTH('無線滑鼠')</code> → 4</td></tr>
<tr><td><code>UPPER(s)</code>／<code>LOWER(s)</code></td><td>轉大寫／小寫</td><td><code>UPPER('usb')</code> → USB</td></tr>
<tr><td><code>SUBSTR(s, 起點, 長度)</code></td><td>取部分字串（從 1 開始算）</td><td><code>SUBSTR('2024-05-06', 6, 2)</code> → 05</td></tr>
<tr><td><code>REPLACE(s, 舊, 新)</code></td><td>取代</td><td><code>REPLACE('台北市', '市', '')</code> → 台北</td></tr>
<tr><td><code>TRIM(s)</code></td><td>去除前後空白</td><td><code>TRIM('  A  ')</code> → A</td></tr>
<tr><td><code>INSTR(s, 子字串)</code></td><td>子字串的位置，找不到為 0</td><td><code>INSTR('USB-C 集線器', '-')</code> → 4</td></tr>
<tr><td><code>a || b</code></td><td>串接字串</td><td><code>'王' || '小明'</code> → 王小明</td></tr>
</table>
<pre class="sql">SELECT name,
       LENGTH(name) AS len,
       SUBSTR(name, 1, 1) AS surname,
       name || '（' || city || '）' AS label
FROM customers;</pre>
<p>注意周雅琪的 label 變成 NULL：<b>任何東西和 NULL 串接都是 NULL</b>。下一節用 COALESCE 解決。</p>
<div class="box memo"><b class="t">各資料庫的字串串接</b>SQLite、PostgreSQL、Oracle 用 <code>||</code>；MySQL 用 <code>CONCAT(a, b)</code>（MySQL 的 || 預設是 OR）；SQL Server 用 <code>+</code> 或 <code>CONCAT()</code>。CONCAT 在多數資料庫會把 NULL 當成空字串。</div>` },
    { id: 'null-func', title: 'COALESCE 與 NULLIF', html: `
<p><code>COALESCE(a, b, c, …)</code> 傳回第一個不是 NULL 的值，最常用來設定預設值：</p>
<pre class="sql">SELECT name,
       COALESCE(city, '未填寫') AS city,
       name || '（' || COALESCE(city, '未填寫') || '）' AS label
FROM customers;</pre>
<p><code>NULLIF(a, b)</code> 則相反：a 等於 b 時傳回 NULL。最經典的用途是避免除以零：<code>銷售額 / NULLIF(數量, 0)</code>，數量為 0 時得到 NULL 而不是錯誤。</p>
<table>
<tr><th>資料庫</th><th>常見的同類函式</th></tr>
<tr><td>標準 SQL（所有資料庫）</td><td><code>COALESCE</code>、<code>NULLIF</code></td></tr>
<tr><td>SQLite、MySQL</td><td><code>IFNULL(a, b)</code></td></tr>
<tr><td>SQL Server</td><td><code>ISNULL(a, b)</code></td></tr>
<tr><td>Oracle</td><td><code>NVL(a, b)</code></td></tr>
</table>` },
    { id: 'number-date', title: '數值與日期函式', html: `
<table>
<tr><th>函式</th><th>功能</th><th>範例 → 結果</th></tr>
<tr><td><code>ROUND(x, n)</code></td><td>四捨五入到小數 n 位</td><td><code>ROUND(3.14159, 2)</code> → 3.14</td></tr>
<tr><td><code>ABS(x)</code></td><td>絕對值</td><td><code>ABS(-5)</code> → 5</td></tr>
<tr><td><code>MAX(a, b)</code>／<code>MIN(a, b)</code></td><td>SQLite 多參數時取最大最小（其他資料庫用 GREATEST／LEAST）</td><td><code>MAX(3, 8)</code> → 8</td></tr>
</table>
<h3>日期函式（SQLite）</h3>
<pre class="sql">SELECT date('now') AS today,
       date('2024-01-31', '+1 month') AS next_month,
       strftime('%Y', '2024-05-06') AS yyyy,
       strftime('%Y-%m', '2024-05-06') AS yyyy_mm,
       julianday('2024-06-22') - julianday('2024-01-05') AS days_between;</pre>
<p>用 <code>strftime('%Y-%m', order_date)</code> 把日期轉成年月，是做「每月統計」時最常用的寫法：</p>
<pre class="sql">SELECT id, order_date, strftime('%Y-%m', order_date) AS ym
FROM orders
WHERE strftime('%m', order_date) = '03';</pre>
<table>
<tr><th>需求</th><th>SQLite</th><th>MySQL</th><th>PostgreSQL</th><th>SQL Server</th></tr>
<tr><td>今天</td><td><code>date('now')</code></td><td><code>CURDATE()</code></td><td><code>CURRENT_DATE</code></td><td><code>CAST(GETDATE() AS date)</code></td></tr>
<tr><td>取年份</td><td><code>strftime('%Y', d)</code></td><td><code>YEAR(d)</code></td><td><code>EXTRACT(YEAR FROM d)</code></td><td><code>YEAR(d)</code></td></tr>
<tr><td>加一個月</td><td><code>date(d, '+1 month')</code></td><td><code>DATE_ADD(d, INTERVAL 1 MONTH)</code></td><td><code>d + INTERVAL '1 month'</code></td><td><code>DATEADD(month, 1, d)</code></td></tr>
<tr><td>相差天數</td><td><code>julianday(b) - julianday(a)</code></td><td><code>DATEDIFF(b, a)</code></td><td><code>b - a</code></td><td><code>DATEDIFF(day, a, b)</code></td></tr>
</table>` },
    { id: 'case', title: 'CASE WHEN 條件判斷', html: `
<p><code>CASE</code> 就像程式語言的 if-else，依條件傳回不同的值。條件<b>由上而下</b>判斷，符合第一個就停止：</p>
<pre class="sql">SELECT name, price,
       CASE
         WHEN price &gt;= 5000 THEN '高價'
         WHEN price &gt;= 1000 THEN '中價'
         ELSE '平價'
       END AS price_level
FROM products
ORDER BY price DESC;</pre>
<p>沒有寫 ELSE 而所有條件都不符合時，結果是 NULL。比對單一欄位的固定值時，可以用簡寫：</p>
<pre class="sql">SELECT name,
       CASE gender WHEN 'M' THEN '男' WHEN 'F' THEN '女' ELSE '未提供' END AS gender_zh
FROM customers;</pre>
<div class="box tip"><b class="t">CASE 搭配彙總</b>下一章會學到 <code>SUM(CASE WHEN … THEN 1 ELSE 0 END)</code>，可以在一個查詢裡同時算出多種條件的筆數，是做報表的必備技巧。</div>` },
    { id: 'cast', title: 'CAST 型別轉換', html: `
<p><code>CAST(值 AS 型別)</code> 轉換資料型別，常用在文字轉數字、整數轉小數：</p>
<pre class="sql">SELECT CAST('2024' AS INTEGER) + 1 AS next_year,
       CAST(7 AS REAL) / 2 AS half,
       CAST(strftime('%Y', 'now') AS INTEGER) - birth_year AS age, name
FROM customers
LIMIT 3;</pre>
<div class="box memo"><b class="t">SQLite 的型別很寬鬆</b>SQLite 允許在 INTEGER 欄位存入文字，其他資料庫會直接報錯。寫給 MySQL、PostgreSQL 的 SQL 要更注意型別一致，例如 <code>WHERE id = '5'</code> 在 PostgreSQL 可能需要明確轉型。</div>` }
  ],
  keypoints: [
    '常用字串函式：LENGTH、UPPER／LOWER、SUBSTR（從 1 開始）、REPLACE、TRIM、||串接。',
    '任何值和 NULL 串接或運算結果都是 NULL；COALESCE 傳回第一個非 NULL 的值。',
    'NULLIF(a, b) 在 a = b 時傳回 NULL，常用於避免除以零。',
    'SQLite 用 date()、strftime()、julianday() 處理日期，其他資料庫函式名稱不同。',
    'CASE WHEN 由上而下判斷，第一個符合就停止；沒有 ELSE 且都不符合時為 NULL。',
    'CAST(值 AS 型別) 轉換型別，整數轉小數可避免整數除法。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 50,
  title: '彙總函式與分組',
  summary: 'COUNT、SUM、AVG、MIN、MAX 與 NULL 的處理、GROUP BY 分組統計、HAVING 篩選分組結果、SQL 的執行順序，以及用 CASE 做條件彙總。',
  sections: [
    { id: 'agg', title: '彙總函式', html: `
<p>彙總函式把多列資料計算成一個值：</p>
<pre class="sql">SELECT COUNT(*) AS n,
       SUM(price) AS total,
       AVG(price) AS avg_price,
       MIN(price) AS cheapest,
       MAX(price) AS priciest
FROM products;</pre>
<h3>COUNT 的三種寫法</h3>
<table>
<tr><th>寫法</th><th>計算</th></tr>
<tr><td><code>COUNT(*)</code></td><td>資料列數（包含有 NULL 的列）</td></tr>
<tr><td><code>COUNT(city)</code></td><td>city 不是 NULL 的列數</td></tr>
<tr><td><code>COUNT(DISTINCT city)</code></td><td>city 不重複的值有幾種（不含 NULL）</td></tr>
</table>
<pre class="sql">SELECT COUNT(*) AS all_rows,
       COUNT(city) AS has_city,
       COUNT(DISTINCT city) AS cities
FROM customers;</pre>
<div class="box exam"><b class="t">NULL 與彙總</b>SUM、AVG、MIN、MAX、COUNT(欄位) 都會<b>略過 NULL</b>。所以 AVG 是「有值的平均」，不是除以全部列數。如果 NULL 應該當成 0，要寫 <code>AVG(COALESCE(欄位, 0))</code>。</div>` },
    { id: 'groupby', title: 'GROUP BY 分組統計', html: `
<p><code>GROUP BY</code> 把資料依欄位分組，每組各算一次彙總，就像 Excel 的樞紐分析表：</p>
<pre class="sql">SELECT category,
       COUNT(*) AS n,
       ROUND(AVG(price)) AS avg_price,
       MAX(price) AS max_price
FROM products
GROUP BY category
ORDER BY n DESC;</pre>
<p>可以依多個欄位分組，例如各城市、各性別的客戶數：</p>
<pre class="sql">SELECT city, gender, COUNT(*) AS n
FROM customers
GROUP BY city, gender
ORDER BY city, gender;</pre>
<div class="box warn"><b class="t">GROUP BY 規則</b>SELECT 中<b>沒有被彙總的欄位，都必須寫在 GROUP BY 裡</b>。例如 <code>SELECT category, name, COUNT(*) … GROUP BY category</code>，每個分類有很多商品名稱，資料庫不知道要顯示哪一個。PostgreSQL、SQL Server 會直接報錯；SQLite 與舊版 MySQL 會隨便挑一個，結果不可靠。</div>
<h3>計算訂單金額</h3>
<p>訂單明細一列一個商品，金額是 <code>qty * unit_price</code>，依訂單分組加總就是每張訂單的金額：</p>
<pre class="sql">SELECT order_id,
       COUNT(*) AS items,
       SUM(qty) AS pieces,
       SUM(qty * unit_price) AS amount
FROM order_items
GROUP BY order_id
ORDER BY amount DESC
LIMIT 5;</pre>` },
    { id: 'having', title: 'HAVING 篩選分組結果', html: `
<p>WHERE 在分組<b>之前</b>篩選資料列，不能使用彙總函式。要篩選「分組後的結果」，例如「下單 3 次以上的客戶」，要用 <code>HAVING</code>：</p>
<pre class="sql">SELECT customer_id, COUNT(*) AS orders
FROM orders
WHERE status = '已完成'        -- 先排除未完成的訂單
GROUP BY customer_id
HAVING COUNT(*) &gt;= 2           -- 再保留完成 2 筆以上的客戶
ORDER BY orders DESC;</pre>
<table>
<tr><th></th><th>WHERE</th><th>HAVING</th></tr>
<tr><td>篩選對象</td><td>原始資料列</td><td>分組後的結果</td></tr>
<tr><td>執行時機</td><td>GROUP BY 之前</td><td>GROUP BY 之後</td></tr>
<tr><td>可否用彙總函式</td><td>不可以</td><td>可以</td></tr>
</table>` },
    { id: 'order-exec', title: 'SQL 的執行順序', html: `
<p>SQL 的<b>撰寫順序</b>和資料庫的<b>執行順序</b>不同，理解執行順序就能解釋很多錯誤：</p>
<div class="flow"><span>FROM／JOIN</span><span>WHERE</span><span>GROUP BY</span><span>HAVING</span><span>SELECT</span><span>DISTINCT</span><span>ORDER BY</span><span>LIMIT</span></div>
<ul>
<li>WHERE 在 SELECT 之前執行，所以<b>WHERE 不能使用 SELECT 的別名</b>（PostgreSQL、SQL Server 會報錯；SQLite、MySQL 比較寬鬆）。</li>
<li>ORDER BY 在 SELECT 之後，所以<b>ORDER BY 可以使用別名</b>。</li>
<li>WHERE 在 GROUP BY 之前，所以<b>WHERE 不能使用彙總函式</b>，要用 HAVING。</li>
</ul>
<p>互動練習中的「SQL 執行順序」可以拖拉排列子句，檢查自己是否記熟。</p>` },
    { id: 'conditional', title: '條件彙總：一次算出多種統計', html: `
<p><code>SUM(CASE WHEN 條件 THEN 1 ELSE 0 END)</code> 可以計算符合條件的筆數，一個查詢就能做出交叉統計表：</p>
<pre class="sql">SELECT strftime('%Y-%m', order_date) AS ym,
       COUNT(*) AS orders,
       SUM(CASE WHEN status = '已完成' THEN 1 ELSE 0 END) AS done,
       SUM(CASE WHEN status = '已取消' THEN 1 ELSE 0 END) AS cancelled,
       SUM(CASE WHEN status = '處理中' THEN 1 ELSE 0 END) AS pending
FROM orders
GROUP BY ym
ORDER BY ym;</pre>
<p>PostgreSQL 與 SQLite 3.30 以後還能寫成更簡潔的 <code>COUNT(*) FILTER (WHERE status = '已完成')</code>。</p>
<div class="box tip"><b class="t">實務應用</b>這種寫法可以直接產生「每月訂單狀態」報表，匯出到 Excel 或 Power BI 就是一張現成的統計表。</div>` }
  ],
  keypoints: [
    '彙總函式：COUNT、SUM、AVG、MIN、MAX；除了 COUNT(*) 之外都會略過 NULL。',
    'COUNT(*) 算列數、COUNT(欄位) 不算 NULL、COUNT(DISTINCT 欄位) 算不重複的值。',
    'GROUP BY 分組後每組各算一次彙總；SELECT 中未彙總的欄位必須寫在 GROUP BY。',
    'WHERE 在分組前篩選資料列，HAVING 在分組後篩選結果，彙總條件要寫在 HAVING。',
    '執行順序：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT。',
    'SUM(CASE WHEN … THEN 1 ELSE 0 END) 可在一個查詢中算出多種條件的筆數。'
  ]
},
{
  id: 'c06', subject: 1, minutes: 55,
  title: 'JOIN 多表查詢',
  summary: '為什麼資料要分表、INNER JOIN、LEFT JOIN 與找出「沒有」的資料、多表串接、自我合併（員工與主管）、CROSS JOIN，以及 JOIN 常見錯誤。',
  sections: [
    { id: 'why-join', title: '為什麼需要 JOIN', html: `
<p>訂單表只記錄 <code>customer_id</code>，想顯示客戶姓名就要到客戶表查。<b>JOIN</b> 依條件把兩張表的資料列配對成一列：</p>
<pre class="sql">SELECT o.id AS order_id, o.order_date, c.name, c.city
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
ORDER BY o.id
LIMIT 6;</pre>
<ul>
<li><code>ON</code> 後面寫配對條件，通常是「外鍵 = 主鍵」。</li>
<li><code>orders AS o</code> 幫資料表取<b>別名</b>，之後用 <code>o.id</code>、<code>c.name</code> 指定欄位屬於哪張表。兩張表都有 <code>id</code> 欄位時，不寫表名會出現「欄位名稱不明確」的錯誤。</li>
<li>只寫 <code>JOIN</code> 就是 <code>INNER JOIN</code>。</li>
</ul>` },
    { id: 'inner-left', title: 'INNER JOIN 與 LEFT JOIN', html: `
<table>
<tr><th>類型</th><th>結果</th><th>圖示</th></tr>
<tr><td><b>INNER JOIN</b></td><td>只保留兩邊都配對得到的資料列</td><td>兩圓交集</td></tr>
<tr><td><b>LEFT JOIN</b></td><td>保留左表全部資料列，右表配對不到的欄位為 NULL</td><td>左圓全部</td></tr>
<tr><td><b>RIGHT JOIN</b></td><td>保留右表全部（把表的順序對調就等於 LEFT JOIN，較少用）</td><td>右圓全部</td></tr>
<tr><td><b>FULL OUTER JOIN</b></td><td>兩邊全部保留（MySQL 不支援）</td><td>兩圓聯集</td></tr>
</table>
<p>比較這兩個查詢的筆數。鄭佩珊（id 10）沒有任何訂單：</p>
<pre class="sql">-- INNER：只有下過單的客戶，鄭佩珊不會出現
SELECT c.name, COUNT(o.id) AS orders
FROM customers c
JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY orders DESC, c.id;</pre>
<pre class="sql">-- LEFT：全部 10 位客戶都會出現，鄭佩珊的訂單數為 0
SELECT c.name, COUNT(o.id) AS orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY orders DESC, c.id;</pre>
<div class="box warn"><b class="t">COUNT(*) 與 COUNT(o.id)</b>LEFT JOIN 後沒有訂單的客戶仍有一列（訂單欄位都是 NULL）。用 <code>COUNT(*)</code> 會算成 1，用 <code>COUNT(o.id)</code> 才會正確得到 0。</div>
<p>互動練習中的「JOIN 結果視覺化」可以切換不同 JOIN，觀察結果列的變化。</p>` },
    { id: 'anti', title: '找出「沒有」的資料', html: `
<p>「沒有下過單的客戶」「從沒賣出的商品」是面試最愛考的題型。做法是 <b>LEFT JOIN 後篩選右表為 NULL</b>：</p>
<pre class="sql">SELECT p.id, p.name
FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.id
WHERE oi.product_id IS NULL;</pre>
<p>也可以用 <code>NOT EXISTS</code> 寫（第 7 章會介紹），兩種寫法結果相同。</p>
<div class="box warn"><b class="t">LEFT JOIN 的 WHERE 陷阱</b>LEFT JOIN 後在 WHERE 對右表加條件（例如 <code>WHERE o.status = '已完成'</code>），會把右表為 NULL 的列一起濾掉，結果變得和 INNER JOIN 一樣。想保留左表全部、只配對符合條件的右表資料，條件要寫在 <code>ON</code> 裡：</div>
<pre class="sql">-- 每位客戶「已完成」的訂單數，沒有的顯示 0（條件寫在 ON）
SELECT c.name, COUNT(o.id) AS done_orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id AND o.status = '已完成'
GROUP BY c.id, c.name
ORDER BY c.id;</pre>` },
    { id: 'multi', title: '串接多張表', html: `
<p>JOIN 可以一直接下去。「每張訂單買了哪些商品、多少錢」需要四張表：</p>
<pre class="sql">SELECT o.id AS order_id, c.name AS customer, p.name AS product,
       oi.qty, oi.unit_price, oi.qty * oi.unit_price AS subtotal
FROM orders o
JOIN customers c    ON c.id = o.customer_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id
WHERE o.status = '已完成'
ORDER BY o.id
LIMIT 8;</pre>
<p>再加上 GROUP BY，就能做出「各分類的營收與毛利」：</p>
<pre class="sql">SELECT p.category,
       SUM(oi.qty) AS pieces,
       SUM(oi.qty * oi.unit_price) AS revenue,
       SUM(oi.qty * (oi.unit_price - p.cost)) AS gross_profit
FROM order_items oi
JOIN orders o   ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
WHERE o.status = '已完成'
GROUP BY p.category
ORDER BY revenue DESC;</pre>` },
    { id: 'self', title: '自我合併與 CROSS JOIN', html: `
<h3>自我合併（Self Join）</h3>
<p>員工表的 <code>manager_id</code> 指向同一張表的 <code>id</code>。把員工表 JOIN 自己（取兩個不同別名），就能列出每個人的主管：</p>
<pre class="sql">SELECT e.name AS employee, e.title, m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id
ORDER BY e.id;</pre>
<p>總經理沒有主管，用 LEFT JOIN 才會保留他（manager 為 NULL）。</p>
<h3>CROSS JOIN</h3>
<p><code>CROSS JOIN</code> 沒有配對條件，產生所有組合（筆數相乘），常用來產生「每個月 × 每個分類」的完整骨架，再 LEFT JOIN 實際資料補 0：</p>
<pre class="sql">SELECT d.name AS dept, t.level
FROM departments d
CROSS JOIN (SELECT '初階' AS level UNION ALL SELECT '高階') t
ORDER BY d.id;</pre>
<div class="box warn"><b class="t">忘了寫 ON</b>JOIN 少了配對條件或條件寫錯，就會變成 CROSS JOIN，100 萬筆 × 100 萬筆會讓資料庫當機。JOIN 後的筆數突然暴增，先檢查 ON 條件。</div>` }
  ],
  keypoints: [
    'JOIN 依 ON 條件把兩張表的資料列配對成一列，通常是「外鍵 = 主鍵」。',
    '多表查詢時用別名並在欄位前加表名，避免欄位名稱不明確。',
    'INNER JOIN 只保留兩邊都有的；LEFT JOIN 保留左表全部，配對不到的欄位為 NULL。',
    '找「沒有」的資料：LEFT JOIN 後 WHERE 右表欄位 IS NULL。',
    'LEFT JOIN 時對右表的篩選條件要寫在 ON，寫在 WHERE 會濾掉 NULL 列。',
    'LEFT JOIN 後計數用 COUNT(右表欄位)，COUNT(*) 會把沒有配對的列算成 1。',
    '自我合併用同一張表的兩個別名，例如員工與主管；CROSS JOIN 產生所有組合。'
  ]
},
{
  id: 'c07', subject: 1, minutes: 45,
  title: '子查詢、CTE 與集合運算',
  summary: '純量子查詢、IN 子查詢、EXISTS 與 NOT EXISTS、相關子查詢、FROM 中的衍生資料表、WITH 共用資料表運算式（CTE），以及 UNION、INTERSECT、EXCEPT。',
  sections: [
    { id: 'scalar', title: '子查詢：查詢裡的查詢', html: `
<p><b>子查詢（Subquery）</b>是用括號包起來、放在另一個查詢裡的查詢。最簡單的是傳回單一值的<b>純量子查詢</b>：</p>
<pre class="sql">-- 售價高於平均的商品
SELECT name, price
FROM products
WHERE price &gt; (SELECT AVG(price) FROM products)
ORDER BY price DESC;</pre>
<p>子查詢也能放在 SELECT 中，例如顯示每項商品和平均價的差距：</p>
<pre class="sql">SELECT name, price,
       price - (SELECT ROUND(AVG(price)) FROM products) AS diff
FROM products
ORDER BY diff DESC
LIMIT 4;</pre>` },
    { id: 'in-exists', title: 'IN 子查詢與 EXISTS', html: `
<p>子查詢傳回一欄多列時，搭配 <code>IN</code>：</p>
<pre class="sql">-- 買過「影音」類商品的客戶
SELECT name FROM customers
WHERE id IN (
  SELECT o.customer_id
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  JOIN products p ON p.id = oi.product_id
  WHERE p.category = '影音'
)
ORDER BY id;</pre>
<p><code>EXISTS</code> 檢查子查詢「有沒有任何一列」，常寫成<b>相關子查詢</b>（子查詢裡參照外層的欄位）：</p>
<pre class="sql">-- 沒有任何訂單的客戶
SELECT c.name
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);</pre>
<div class="box warn"><b class="t">NOT IN 遇到 NULL</b><code>WHERE id NOT IN (子查詢)</code> 如果子查詢結果有任何一個 NULL，整個條件永遠不成立、查不到資料。找「沒有」的資料時，<code>NOT EXISTS</code> 或 <code>LEFT JOIN … IS NULL</code> 比較安全。</div>
<h3>相關子查詢：每列各算一次</h3>
<pre class="sql">-- 薪水高於自己部門平均的員工
SELECT e.name, e.dept_id, e.salary
FROM employees e
WHERE e.salary &gt; (
  SELECT AVG(salary) FROM employees x WHERE x.dept_id = e.dept_id
)
ORDER BY e.dept_id;</pre>` },
    { id: 'derived', title: '衍生資料表與 CTE', html: `
<p>子查詢放在 FROM 中，可以當成一張暫時的表（<b>衍生資料表</b>），要取別名：</p>
<pre class="sql">SELECT AVG(amount) AS avg_order_amount
FROM (
  SELECT order_id, SUM(qty * unit_price) AS amount
  FROM order_items
  GROUP BY order_id
) AS t;</pre>
<p>子查詢一層包一層會很難讀。<b>CTE（Common Table Expression，共用資料表運算式）</b>用 <code>WITH</code> 先替查詢結果命名，再像資料表一樣使用，可讀性高很多：</p>
<pre class="sql">WITH order_amount AS (
  SELECT o.id, o.customer_id, SUM(oi.qty * oi.unit_price) AS amount
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.status = '已完成'
  GROUP BY o.id, o.customer_id
),
customer_total AS (
  SELECT customer_id, COUNT(*) AS orders, SUM(amount) AS total
  FROM order_amount
  GROUP BY customer_id
)
SELECT c.name, t.orders, t.total
FROM customer_total t
JOIN customers c ON c.id = t.customer_id
ORDER BY t.total DESC;</pre>
<div class="box tip"><b class="t">拆解複雜問題</b>遇到難的查詢，先用 CTE 一步一步算出中間結果，每一步都能單獨執行檢查。這也是面試時最能展現思路的寫法。</div>` },
    { id: 'set', title: 'UNION 與集合運算', html: `
<p>集合運算把兩個查詢的結果上下合併，兩邊的<b>欄位數量與型別要一致</b>：</p>
<table>
<tr><th>運算</th><th>結果</th></tr>
<tr><td><code>UNION</code></td><td>合併並<b>去除重複</b></td></tr>
<tr><td><code>UNION ALL</code></td><td>合併，<b>保留重複</b>（不需排序去重，比較快）</td></tr>
<tr><td><code>INTERSECT</code></td><td>兩邊都有的（交集）</td></tr>
<tr><td><code>EXCEPT</code></td><td>上面有、下面沒有的（差集；Oracle 叫 MINUS）</td></tr>
</table>
<pre class="sql">SELECT city FROM customers WHERE level = '金卡'
UNION
SELECT city FROM customers WHERE gender = 'F';</pre>
<pre class="sql">-- 有客戶但沒有金卡會員的城市
SELECT city FROM customers WHERE city IS NOT NULL
EXCEPT
SELECT city FROM customers WHERE level = '金卡';</pre>` }
  ],
  keypoints: [
    '子查詢是括號中的查詢，可放在 WHERE、SELECT、FROM 中。',
    '純量子查詢傳回單一值，常用來和平均值比較。',
    'EXISTS 檢查子查詢是否有資料；相關子查詢會參照外層欄位，每列各算一次。',
    'NOT IN 的子查詢有 NULL 時查不到資料，找「沒有」時建議用 NOT EXISTS 或 LEFT JOIN … IS NULL。',
    'CTE 用 WITH 為中間結果命名，可串接多個，讓複雜查詢易讀易檢查。',
    'UNION 去除重複、UNION ALL 保留重複；INTERSECT 為交集、EXCEPT 為差集。'
  ]
},
{
  id: 'c08', subject: 1, minutes: 50,
  title: '視窗函式與資料分析',
  summary: '視窗函式與 GROUP BY 的差別、OVER 與 PARTITION BY、ROW_NUMBER／RANK／DENSE_RANK 排名、各組取前 N 名、累計加總與移動平均、LAG／LEAD 計算成長率。',
  sections: [
    { id: 'window', title: '什麼是視窗函式', html: `
<p>GROUP BY 會把多列<b>壓縮</b>成一列；<b>視窗函式（Window Function）</b>則是<b>保留每一列</b>，同時在旁邊加上「同一組」的統計值。語法是在函式後面加上 <code>OVER (…)</code>：</p>
<pre class="sql">SELECT name, dept_id, salary,
       AVG(salary) OVER (PARTITION BY dept_id) AS dept_avg,
       salary - AVG(salary) OVER (PARTITION BY dept_id) AS diff
FROM employees
WHERE dept_id IS NOT NULL
ORDER BY dept_id, salary DESC;</pre>
<ul>
<li><code>PARTITION BY dept_id</code>：依部門分組計算，但不會合併資料列。</li>
<li>不寫 PARTITION BY 時，整個結果是同一組，例如 <code>SUM(salary) OVER ()</code> 是全公司總和。</li>
<li>MySQL 8.0、PostgreSQL、SQL Server、SQLite 3.25 以後都支援視窗函式。</li>
</ul>` },
    { id: 'rank', title: '排名函式', html: `
<table>
<tr><th>函式</th><th>同分時</th><th>範例（分數 100、90、90、80）</th></tr>
<tr><td><code>ROW_NUMBER()</code></td><td>仍給不同名次（順序不保證）</td><td>1、2、3、4</td></tr>
<tr><td><code>RANK()</code></td><td>同名次，後面<b>跳號</b></td><td>1、2、2、4</td></tr>
<tr><td><code>DENSE_RANK()</code></td><td>同名次，後面<b>不跳號</b></td><td>1、2、2、3</td></tr>
</table>
<pre class="sql">SELECT name, category, price,
       ROW_NUMBER() OVER (ORDER BY price DESC) AS row_num,
       RANK()       OVER (PARTITION BY category ORDER BY price DESC) AS rank_in_cat
FROM products
ORDER BY category, rank_in_cat;</pre>
<h3>各組取前 N 名</h3>
<p>「每個分類最貴的商品」「每個部門薪水最高的 2 人」是視窗函式最經典的應用。視窗函式不能直接寫在 WHERE，要先用 CTE 或子查詢算出名次：</p>
<pre class="sql">WITH ranked AS (
  SELECT e.name, d.name AS dept, e.salary,
         ROW_NUMBER() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) AS rn
  FROM employees e
  JOIN departments d ON d.id = e.dept_id
)
SELECT dept, name, salary
FROM ranked
WHERE rn &lt;= 2
ORDER BY dept, salary DESC;</pre>` },
    { id: 'running', title: '累計加總與移動平均', html: `
<p>視窗函式加上 <code>ORDER BY</code> 後，預設計算「從第一列到目前這一列」，就是<b>累計值</b>：</p>
<pre class="sql">WITH monthly AS (
  SELECT strftime('%Y-%m', o.order_date) AS ym,
         SUM(oi.qty * oi.unit_price) AS revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.status = '已完成'
  GROUP BY ym
)
SELECT ym, revenue,
       SUM(revenue) OVER (ORDER BY ym) AS cumulative,
       ROUND(AVG(revenue) OVER (ORDER BY ym ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)) AS ma3
FROM monthly
ORDER BY ym;</pre>
<p><code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code> 指定視窗為「前兩列到目前列」，也就是 3 個月移動平均。</p>` },
    { id: 'lag', title: 'LAG、LEAD 與成長率', html: `
<p><code>LAG(欄位, n)</code> 取得前 n 列的值，<code>LEAD</code> 取後面的值。最常用來計算<b>月增率</b>：</p>
<pre class="sql">WITH monthly AS (
  SELECT strftime('%Y-%m', o.order_date) AS ym,
         SUM(oi.qty * oi.unit_price) AS revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  WHERE o.status = '已完成'
  GROUP BY ym
)
SELECT ym, revenue,
       LAG(revenue) OVER (ORDER BY ym) AS prev,
       ROUND((revenue - LAG(revenue) OVER (ORDER BY ym)) * 100.0
             / LAG(revenue) OVER (ORDER BY ym), 1) AS growth_pct
FROM monthly
ORDER BY ym;</pre>
<p>第一個月沒有前一個月，LAG 傳回 NULL，成長率也是 NULL。</p>
<div class="box exam"><b class="t">分析師面試常見題</b>「計算每位客戶兩次下單間隔幾天」：<code>julianday(order_date) - julianday(LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date))</code>。PARTITION BY 讓每位客戶各自計算。</div>` },
    { id: 'analysis', title: '綜合分析：RFM 客戶分群', html: `
<p>行銷常用 <b>RFM</b> 分析客戶價值：最近一次購買（Recency）、購買頻率（Frequency）、消費金額（Monetary）。用前面學過的 CTE、JOIN、視窗函式就能算出來：</p>
<pre class="sql">WITH done AS (
  SELECT o.customer_id, o.order_date, SUM(oi.qty * oi.unit_price) AS amount
  FROM orders o JOIN order_items oi ON oi.order_id = o.id
  WHERE o.status = '已完成'
  GROUP BY o.id
),
rfm AS (
  SELECT customer_id,
         CAST(julianday('2024-06-30') - julianday(MAX(order_date)) AS INTEGER) AS recency_days,
         COUNT(*) AS frequency,
         SUM(amount) AS monetary
  FROM done GROUP BY customer_id
)
SELECT c.name, r.recency_days, r.frequency, r.monetary,
       NTILE(3) OVER (ORDER BY r.monetary DESC) AS money_group
FROM rfm r JOIN customers c ON c.id = r.customer_id
ORDER BY r.monetary DESC;</pre>
<p><code>NTILE(3)</code> 依金額把客戶平均分成 3 組：1 是消費最高的一群。行銷可以針對第 1 組發 VIP 優惠、對很久沒回購的客戶發喚回優惠券。</p>` }
  ],
  keypoints: [
    '視窗函式用 OVER(...) 在保留每一列的同時加上分組統計；GROUP BY 則會把多列合併。',
    'PARTITION BY 指定分組，ORDER BY 指定視窗內的順序。',
    'ROW_NUMBER 不重複、RANK 同分跳號、DENSE_RANK 同分不跳號。',
    '各組取前 N 名：先用 CTE 算 ROW_NUMBER，再在外層 WHERE rn <= N。',
    'SUM() OVER (ORDER BY …) 計算累計值；ROWS BETWEEN 可定義移動平均的範圍。',
    'LAG／LEAD 取得前後列的值，用來計算月增率或兩次購買的間隔。'
  ]
}
);
