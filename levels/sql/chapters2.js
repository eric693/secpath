/* SQL 設計篇：建立資料表、設計與實務
   <pre class="sql"> 為可在網頁上執行的 SQLite 範例（每次執行都從範例資料重新開始）
   程式碼內的 < > & 寫成 &lt; &gt; &amp; */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c09', subject: 2, minutes: 45,
  title: '建立資料表與限制條件',
  summary: 'CREATE TABLE 語法、常見資料型別與各資料庫差異、主鍵與自動編號、NOT NULL、UNIQUE、DEFAULT、CHECK、外鍵與 ON DELETE，以及 ALTER TABLE、DROP TABLE。',
  sections: [
    { id: 'create', title: 'CREATE TABLE', html: `
<p>建立資料表時要定義每個欄位的<b>名稱</b>、<b>資料型別</b>與<b>限制條件</b>：</p>
<pre class="sql">CREATE TABLE coupons (
  id INTEGER PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount INTEGER NOT NULL CHECK (discount BETWEEN 1 AND 90),
  min_spend INTEGER NOT NULL DEFAULT 0,
  expires DATE
);
INSERT INTO coupons (code, discount, min_spend, expires) VALUES ('WELCOME10', 10, 0, '2024-12-31');
INSERT INTO coupons (code, discount) VALUES ('VIP20', 20);
SELECT * FROM coupons;</pre>
<p>第二筆沒有指定 <code>min_spend</code>，自動使用預設值 0；沒有指定 <code>id</code>，自動編號為 2。</p>
<h3>常見資料型別</h3>
<table>
<tr><th>用途</th><th>標準／常見寫法</th><th>說明</th></tr>
<tr><td>整數</td><td><code>INTEGER</code>、<code>BIGINT</code></td><td>編號、數量</td></tr>
<tr><td>精確小數</td><td><code>DECIMAL(10, 2)</code>／<code>NUMERIC</code></td><td><b>金額一定用這個</b>，不會有浮點誤差</td></tr>
<tr><td>浮點數</td><td><code>REAL</code>、<code>FLOAT</code>、<code>DOUBLE</code></td><td>科學計算，可能有誤差</td></tr>
<tr><td>字串</td><td><code>VARCHAR(n)</code>、<code>TEXT</code></td><td>SQL Server 存中文用 <code>NVARCHAR</code></td></tr>
<tr><td>日期時間</td><td><code>DATE</code>、<code>TIMESTAMP</code>／<code>DATETIME</code></td><td>SQLite 以文字 'YYYY-MM-DD' 儲存</td></tr>
<tr><td>布林</td><td><code>BOOLEAN</code></td><td>MySQL 與 SQLite 以 0／1 表示</td></tr>
</table>` },
    { id: 'pk', title: '主鍵與自動編號', html: `
<p>每張表都應該有主鍵。最常見的是<b>代理鍵</b>：一個沒有商業意義、自動遞增的整數 id。</p>
<table>
<tr><th>資料庫</th><th>自動編號寫法</th></tr>
<tr><td>SQLite</td><td><code>id INTEGER PRIMARY KEY</code></td></tr>
<tr><td>MySQL</td><td><code>id INT AUTO_INCREMENT PRIMARY KEY</code></td></tr>
<tr><td>PostgreSQL</td><td><code>id SERIAL PRIMARY KEY</code> 或 <code>id INT GENERATED ALWAYS AS IDENTITY</code></td></tr>
<tr><td>SQL Server</td><td><code>id INT IDENTITY(1,1) PRIMARY KEY</code></td></tr>
</table>
<p>主鍵也可以由多個欄位組成（<b>複合主鍵</b>）。範例資料庫的 <code>order_items</code> 以 <code>(order_id, product_id)</code> 為主鍵，代表同一張訂單的同一項商品只會有一列。</p>
<div class="box memo"><b class="t">為什麼不用身分證字號、Email 當主鍵</b>這類「自然鍵」可能會變（換 Email、輸入錯誤要更正），一改就要連帶修改所有參照它的資料。用不會變的代理鍵當主鍵，自然鍵另外加 UNIQUE 限制比較安全。</div>` },
    { id: 'constraints', title: '限制條件', html: `
<table>
<tr><th>限制</th><th>作用</th></tr>
<tr><td><code>NOT NULL</code></td><td>必填，不可為 NULL</td></tr>
<tr><td><code>UNIQUE</code></td><td>不可重複（可以有多個 NULL，依資料庫而定）</td></tr>
<tr><td><code>DEFAULT 值</code></td><td>沒有給值時使用的預設值</td></tr>
<tr><td><code>CHECK (條件)</code></td><td>資料必須符合條件，例如價格不可為負</td></tr>
<tr><td><code>PRIMARY KEY</code></td><td>唯一且不可為 NULL</td></tr>
<tr><td><code>REFERENCES 表(欄位)</code></td><td>外鍵，值必須存在於被參照的表</td></tr>
</table>
<p>限制條件是資料品質的最後一道防線。試試看違反限制會發生什麼事：</p>
<pre class="sql">-- 商品表設定了 CHECK (price &gt;= 0)
INSERT INTO products (name, category, price, cost) VALUES ('測試商品', '文具', -100, 10);</pre>
<pre class="sql">-- 訂單的 customer_id 必須存在於客戶表（外鍵）
INSERT INTO orders (customer_id, order_date, status) VALUES (999, '2024-07-01', '處理中');</pre>
<div class="box tip"><b class="t">SQLite 的外鍵</b>SQLite 預設不檢查外鍵，要先執行 <code>PRAGMA foreign_keys = ON;</code>（範例資料庫已開啟）。MySQL（InnoDB）、PostgreSQL、SQL Server 預設就會檢查。</div>` },
    { id: 'fk', title: '外鍵與 ON DELETE', html: `
<p>當被參照的資料要刪除時（例如刪除客戶，但他有訂單），外鍵可以設定處理方式：</p>
<table>
<tr><th>設定</th><th>刪除客戶時</th><th>適用情境</th></tr>
<tr><td>預設（NO ACTION／RESTRICT）</td><td>有訂單就不允許刪除</td><td>訂單、會計等重要資料</td></tr>
<tr><td><code>ON DELETE CASCADE</code></td><td>連帶刪除他的訂單</td><td>附屬資料，例如文章的留言</td></tr>
<tr><td><code>ON DELETE SET NULL</code></td><td>訂單的 customer_id 改為 NULL</td><td>保留紀錄但切斷關聯</td></tr>
</table>
<pre class="sql">CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT NOT NULL);
CREATE TABLE comments (
  id INTEGER PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  body TEXT NOT NULL
);
INSERT INTO posts VALUES (1, '第一篇'), (2, '第二篇');
INSERT INTO comments (post_id, body) VALUES (1, '讚'), (1, '學到了'), (2, '請問…');
DELETE FROM posts WHERE id = 1;
SELECT * FROM comments;   -- 第一篇的兩則留言也被刪除了</pre>
<div class="box warn"><b class="t">實務建議</b>重要的業務資料通常不真的刪除，而是加一個 <code>deleted_at</code> 或 <code>is_active</code> 欄位做<b>軟刪除</b>，保留稽核紀錄。</div>` },
    { id: 'alter', title: 'ALTER TABLE 與 DROP TABLE', html: `
<pre class="sql">ALTER TABLE customers ADD COLUMN phone TEXT;            -- 新增欄位
ALTER TABLE customers RENAME COLUMN level TO tier;      -- 欄位改名
SELECT id, name, tier, phone FROM customers LIMIT 3;</pre>
<table>
<tr><th>指令</th><th>作用</th></tr>
<tr><td><code>ALTER TABLE 表 ADD COLUMN 欄位 型別</code></td><td>新增欄位</td></tr>
<tr><td><code>ALTER TABLE 表 RENAME COLUMN 舊 TO 新</code></td><td>欄位改名</td></tr>
<tr><td><code>ALTER TABLE 表 DROP COLUMN 欄位</code></td><td>刪除欄位</td></tr>
<tr><td><code>DROP TABLE 表</code></td><td>刪除整張表（結構與資料）</td></tr>
<tr><td><code>DROP TABLE IF EXISTS 表</code></td><td>表存在才刪除，不會報錯</td></tr>
<tr><td><code>TRUNCATE TABLE 表</code></td><td>清空資料但保留結構（SQLite 不支援，用 DELETE FROM 表）</td></tr>
</table>
<div class="box warn"><b class="t">正式環境的結構變更</b>對有大量資料的正式資料庫執行 ALTER TABLE 可能鎖表很久。團隊通常用<b>資料庫遷移（Migration）</b>工具管理結構變更，例如 Flyway、Alembic、Prisma Migrate，並在離峰時段執行。</div>` }
  ],
  keypoints: [
    'CREATE TABLE 定義欄位名稱、型別與限制條件；金額請用 DECIMAL，不要用浮點數。',
    '每張表都應有主鍵，常用自動遞增的代理鍵；各資料庫自動編號語法不同。',
    'NOT NULL 必填、UNIQUE 不重複、DEFAULT 預設值、CHECK 條件檢查。',
    '外鍵確保參照的資料存在；ON DELETE CASCADE 連帶刪除、SET NULL 改為空值。',
    'SQLite 需執行 PRAGMA foreign_keys = ON 才會檢查外鍵。',
    'ALTER TABLE 修改結構、DROP TABLE 刪除整張表；正式環境用 Migration 工具管理變更。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '新增、修改、刪除與交易',
  summary: 'INSERT 單筆、多筆與 INSERT…SELECT、UPDATE 與 DELETE 的安全守則、UPSERT（衝突時更新），以及交易 BEGIN／COMMIT／ROLLBACK 與 ACID 特性。',
  sections: [
    { id: 'insert', title: 'INSERT 新增資料', html: `
<pre class="sql">-- 指定欄位新增（建議寫法：欄位順序清楚，資料表增加欄位也不會出錯）
INSERT INTO customers (name, city, gender, birth_year, joined)
VALUES ('楊冠宇', '桃園市', 'M', 1996, '2024-06-30');

-- 一次新增多筆
INSERT INTO products (name, category, price, cost) VALUES
  ('滑鼠墊', '3C周邊', 290, 90),
  ('螢幕支架', '辦公家具', 1590, 800);

SELECT id, name FROM customers WHERE id &gt; 9;
SELECT id, name, price FROM products WHERE id &gt; 9;</pre>
<h3>INSERT … SELECT：把查詢結果存成資料</h3>
<pre class="sql">CREATE TABLE vip_list (customer_id INTEGER PRIMARY KEY, name TEXT, level TEXT);
INSERT INTO vip_list (customer_id, name, level)
SELECT id, name, level FROM customers WHERE level IN ('金卡', '白金');
SELECT * FROM vip_list;</pre>` },
    { id: 'update', title: 'UPDATE 修改資料', html: `
<pre class="sql">-- 3C周邊全部漲價 5%，四捨五入到整數
UPDATE products
SET price = ROUND(price * 1.05)
WHERE category = '3C周邊';
SELECT name, price FROM products WHERE category = '3C周邊';</pre>
<p>一次可以修改多個欄位：<code>SET price = 650, cost = 320</code>。</p>
<div class="box warn"><b class="t">UPDATE／DELETE 忘了 WHERE</b><code>UPDATE products SET price = 0;</code> 會把<b>全部</b>商品改成 0 元，<code>DELETE FROM orders;</code> 會刪光所有訂單。這是資料庫最常見的災難。守則：</div>
<ol>
<li>先把 <code>UPDATE … SET …</code> 換成 <code>SELECT * FROM …</code>，用同樣的 WHERE 確認影響範圍與筆數。</li>
<li>在交易中執行（下一節），確認結果正確才 COMMIT。</li>
<li>正式資料庫的大量修改先備份。MySQL 可開啟 <code>sql_safe_updates</code>，沒有 WHERE 的 UPDATE／DELETE 會被拒絕。</li>
</ol>
<h3>依其他表的資料更新</h3>
<pre class="sql">-- 已完成 2 筆以上訂單的一般會員升級為金卡
UPDATE customers
SET level = '金卡'
WHERE level = '一般'
  AND id IN (SELECT customer_id FROM orders WHERE status = '已完成'
             GROUP BY customer_id HAVING COUNT(*) &gt;= 2);
SELECT name, level FROM customers ORDER BY id;</pre>` },
    { id: 'delete', title: 'DELETE 與 UPSERT', html: `
<pre class="sql">-- 先確認要刪除哪些
SELECT * FROM orders WHERE status = '已取消';
-- 先刪明細再刪訂單（外鍵限制：明細參照訂單）
DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE status = '已取消');
DELETE FROM orders WHERE status = '已取消';
SELECT COUNT(*) AS remaining FROM orders;</pre>
<h3>UPSERT：存在就更新，不存在就新增</h3>
<p>同步資料時常遇到「這筆資料可能已經存在」。UPSERT 依主鍵或 UNIQUE 欄位判斷衝突：</p>
<pre class="sql">CREATE TABLE stock (product_id INTEGER PRIMARY KEY, qty INTEGER NOT NULL);
INSERT INTO stock VALUES (1, 50), (2, 20);
INSERT INTO stock (product_id, qty) VALUES (2, 5), (3, 8)
ON CONFLICT (product_id) DO UPDATE SET qty = qty + excluded.qty;
SELECT * FROM stock;</pre>
<p><code>excluded</code> 代表「本來要新增的那一列」。商品 2 已存在，數量變成 20 + 5；商品 3 不存在，直接新增。</p>
<table>
<tr><th>資料庫</th><th>UPSERT 寫法</th></tr>
<tr><td>SQLite、PostgreSQL</td><td><code>INSERT … ON CONFLICT (欄位) DO UPDATE SET …</code></td></tr>
<tr><td>MySQL</td><td><code>INSERT … ON DUPLICATE KEY UPDATE …</code></td></tr>
<tr><td>SQL Server、Oracle</td><td><code>MERGE INTO … WHEN MATCHED THEN UPDATE WHEN NOT MATCHED THEN INSERT</code></td></tr>
</table>` },
    { id: 'tx', title: '交易與 ACID', html: `
<p><b>交易（Transaction）</b>把多個操作綁成一個單位：<b>全部成功，或全部取消</b>。經典例子是轉帳：A 扣款、B 入帳必須同時成功，不能只做一半。</p>
<pre class="sql">CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner TEXT, balance INTEGER CHECK (balance &gt;= 0));
INSERT INTO accounts VALUES (1, '王小明', 1000), (2, '李美華', 500);

BEGIN;
UPDATE accounts SET balance = balance - 300 WHERE id = 1;
UPDATE accounts SET balance = balance + 300 WHERE id = 2;
COMMIT;                         -- 確認，兩筆修改一起生效
SELECT * FROM accounts;</pre>
<pre class="sql">CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner TEXT, balance INTEGER);
INSERT INTO accounts VALUES (1, '王小明', 1000), (2, '李美華', 500);

BEGIN;
UPDATE accounts SET balance = balance - 300 WHERE id = 1;
-- 發現金額打錯了！
ROLLBACK;                       -- 取消交易中的所有修改
SELECT * FROM accounts;          -- 餘額維持 1000 與 500</pre>
<h3>ACID 特性</h3>
<table>
<tr><th>特性</th><th>意義</th></tr>
<tr><td><b>A</b>tomicity 原子性</td><td>交易中的操作全部完成或全部不做</td></tr>
<tr><td><b>C</b>onsistency 一致性</td><td>交易前後都符合所有限制條件（例如餘額不為負）</td></tr>
<tr><td><b>I</b>solation 隔離性</td><td>同時執行的交易互不干擾</td></tr>
<tr><td><b>D</b>urability 持久性</td><td>COMMIT 後即使當機，資料也不會遺失</td></tr>
</table>
<div class="box memo"><b class="t">自動提交</b>多數資料庫預設每一句 SQL 自己就是一個交易，執行完立即生效（Auto Commit）。只有明確寫 <code>BEGIN</code> 才會等到 COMMIT 才生效。SQL Server 用 <code>BEGIN TRANSACTION</code>。</div>` }
  ],
  keypoints: [
    'INSERT 時建議明確列出欄位；可一次新增多筆，或用 INSERT … SELECT 存入查詢結果。',
    'UPDATE、DELETE 一定要寫 WHERE，執行前先用 SELECT 確認影響範圍。',
    '有外鍵關聯時要先刪除子表（明細）再刪除父表（訂單），或設定 ON DELETE CASCADE。',
    'UPSERT：SQLite／PostgreSQL 用 ON CONFLICT，MySQL 用 ON DUPLICATE KEY UPDATE，SQL Server 用 MERGE。',
    '交易以 BEGIN 開始，COMMIT 確認、ROLLBACK 取消，確保多個操作全部成功或全部取消。',
    'ACID：原子性、一致性、隔離性、持久性。'
  ]
},
{
  id: 'c11', subject: 2, minutes: 45,
  title: '資料庫設計與正規化',
  summary: '從需求到 ER 圖、一對一、一對多、多對多關係與中介表、第一到第三正規化、反正規化的取捨，以及把一張 Excel 表拆成多張資料表的實作。',
  sections: [
    { id: 'er', title: '實體與關係', html: `
<p>設計資料庫的第一步是找出<b>實體（Entity）</b>和它們之間的<b>關係（Relationship）</b>，畫成 <b>ER 圖</b>：</p>
<table>
<tr><th>關係</th><th>例子</th><th>設計方式</th></tr>
<tr><td><b>一對多</b>（最常見）</td><td>一位客戶有多張訂單</td><td>在「多」的那邊（orders）放外鍵 customer_id</td></tr>
<tr><td><b>多對多</b></td><td>一張訂單有多項商品，一項商品出現在多張訂單</td><td>建立<b>中介表</b>（order_items），各放兩邊的外鍵</td></tr>
<tr><td><b>一對一</b></td><td>一位員工有一份機密薪資資料</td><td>外鍵加 UNIQUE，或直接合併成同一張表</td></tr>
</table>
<pre class="out">customers 1 ──── * orders 1 ──── * order_items * ──── 1 products
                                   （中介表，記錄數量與成交價）
departments 1 ──── * employees * ──── 1 employees（主管，自我參照）</pre>
<div class="box tip"><b class="t">中介表的額外欄位</b>order_items 除了兩個外鍵，還存了 qty 與 unit_price。成交價要存在明細中，而不是每次去查 products.price，因為商品價格之後可能調整，歷史訂單的金額不能跟著變。</div>` },
    { id: 'normal', title: '正規化：消除重複', html: `
<p>假設業務把訂單記在一張 Excel：</p>
<pre class="out">訂單編號 │ 日期       │ 客戶   │ 客戶電話     │ 商品              │ 金額
─────────┼────────────┼────────┼──────────────┼───────────────────┼─────
1001     │ 2024-01-05 │ 王小明 │ 0912-345-678 │ 無線滑鼠, 筆記本組 │ 1187
1002     │ 2024-02-02 │ 王小明 │ 0912-345-678 │ 機械鍵盤          │ 2490</pre>
<p>問題：王小明換電話要改很多列（<b>更新異常</b>）；一個儲存格放多項商品，無法統計各商品銷量；刪掉某張訂單可能連客戶資料都消失（<b>刪除異常</b>）。<b>正規化（Normalization）</b>就是依規則拆表來消除這些問題：</p>
<table>
<tr><th>正規化</th><th>規則</th><th>本例的處理</th></tr>
<tr><td><b>第一正規化 1NF</b></td><td>每個欄位只放一個值，沒有重複的欄位群組</td><td>「無線滑鼠, 筆記本組」拆成兩列明細</td></tr>
<tr><td><b>第二正規化 2NF</b></td><td>符合 1NF，且非鍵欄位<b>完全</b>依賴整個主鍵（不能只依賴複合主鍵的一部分）</td><td>明細主鍵是（訂單, 商品），「商品名稱」只依賴商品 → 移到商品表</td></tr>
<tr><td><b>第三正規化 3NF</b></td><td>符合 2NF，且非鍵欄位不依賴其他非鍵欄位（沒有遞移依賴）</td><td>訂單表中「客戶電話」依賴「客戶」而非訂單 → 移到客戶表</td></tr>
</table>
<div class="box memo"><b class="t">一句話記住</b>每個非鍵欄位都要依賴「主鍵、完整的主鍵、而且只依賴主鍵」（The key, the whole key, and nothing but the key）。</div>` },
    { id: 'denormal', title: '反正規化的取捨', html: `
<p>正規化讓資料只存一份、不會不一致，但查詢時要 JOIN 很多表。有時為了效能會刻意<b>反正規化</b>：</p>
<table>
<tr><th>做法</th><th>好處</th><th>代價</th></tr>
<tr><td>訂單表存一份 total_amount</td><td>列出訂單不必每次加總明細</td><td>明細變動時要同步更新</td></tr>
<tr><td>報表用的寬表（資料倉儲）</td><td>分析查詢快、Power BI 容易使用</td><td>資料重複，需要定期重建</td></tr>
<tr><td>明細存 unit_price</td><td>保留成交當時價格（這其實是業務需求）</td><td>—</td></tr>
</table>
<p>原則：<b>交易系統（OLTP）以正規化為主</b>，確保資料正確；<b>分析系統（OLAP、資料倉儲）</b>常用星狀結構與反正規化，換取查詢速度。Power BI 課程會再介紹星狀結構。</p>` },
    { id: 'design', title: '實作：設計課程報名系統', html: `
<p>需求：學員可以報名多門課程，每門課有一位講師，報名時記錄日期與付款狀態。</p>
<pre class="sql">CREATE TABLE teachers (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  teacher_id INTEGER NOT NULL REFERENCES teachers(id),
  fee INTEGER NOT NULL CHECK (fee &gt;= 0)
);
CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE);
CREATE TABLE enrollments (                 -- 學員與課程的多對多中介表
  student_id INTEGER NOT NULL REFERENCES students(id),
  course_id INTEGER NOT NULL REFERENCES courses(id),
  enrolled_on DATE NOT NULL,
  paid INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (student_id, course_id)
);
INSERT INTO teachers VALUES (1, '陳老師'), (2, '林老師');
INSERT INTO courses VALUES (1, 'SQL 入門', 1, 3000), (2, 'Python 入門', 2, 3500), (3, 'Power BI', 1, 4000);
INSERT INTO students VALUES (1, '小明', 'ming@example.com'), (2, '小華', 'hua@example.com');
INSERT INTO enrollments VALUES (1, 1, '2024-06-01', 1), (1, 3, '2024-06-03', 0), (2, 1, '2024-06-05', 1);

-- 每位講師的報名人數與已收金額
SELECT t.name, COUNT(e.student_id) AS enrolls,
       SUM(CASE WHEN e.paid = 1 THEN c.fee ELSE 0 END) AS collected
FROM teachers t
JOIN courses c ON c.teacher_id = t.id
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY t.id, t.name;</pre>` }
  ],
  keypoints: [
    '設計資料庫先找出實體與關係，畫成 ER 圖。',
    '一對多在「多」的一方放外鍵；多對多需要中介表，各放兩邊的外鍵。',
    '1NF：欄位只放單一值；2NF：完全依賴整個主鍵；3NF：不依賴其他非鍵欄位。',
    '正規化避免更新異常、刪除異常與資料不一致。',
    '交易系統以正規化為主；分析系統常為效能反正規化或使用星狀結構。',
    '成交價這類「當時的值」要存在明細中，不能只參照目前的商品價格。'
  ]
},
{
  id: 'c12', subject: 2, minutes: 50,
  title: '索引、效能、安全與實務應用',
  summary: '索引的原理與代價、EXPLAIN 查看執行計畫、寫出有效率查詢的原則、檢視表（View）、SQL Injection 與參數化查詢、權限管理，以及在 Python、Excel、Power BI 中使用 SQL 與面試準備。',
  sections: [
    { id: 'index', title: '索引的原理', html: `
<p>沒有索引時，資料庫要逐列檢查整張表（<b>全表掃描</b>）。<b>索引（Index）</b>就像書末的索引，依欄位值排序好並記錄位置，讓查詢可以直接跳到符合的資料：</p>
<pre class="sql">EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 5;
CREATE INDEX idx_orders_customer ON orders(customer_id);
EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 5;</pre>
<p>建立索引前，執行計畫顯示 <code>SCAN orders</code>（全表掃描）；建立後變成 <code>SEARCH orders USING INDEX</code>。MySQL、PostgreSQL 用 <code>EXPLAIN</code>，SQL Server 可在 SSMS 顯示執行計畫。</p>
<table>
<tr><th>適合建索引</th><th>不適合建索引</th></tr>
<tr><td>常出現在 WHERE、JOIN ON、ORDER BY 的欄位</td><td>很少查詢的欄位</td></tr>
<tr><td>外鍵欄位（JOIN 用）</td><td>值的種類很少，例如性別</td></tr>
<tr><td>值的種類多、篩選後筆數少</td><td>經常大量寫入、很少查詢的表</td></tr>
</table>
<div class="box warn"><b class="t">索引的代價</b>索引會佔用空間，而且每次 INSERT、UPDATE、DELETE 都要同步更新索引，寫入會變慢。不是越多越好。主鍵與 UNIQUE 欄位會自動建立索引。</div>` },
    { id: 'perf', title: '寫出有效率的查詢', html: `
<table>
<tr><th>避免</th><th>改成</th><th>原因</th></tr>
<tr><td><code>SELECT *</code></td><td>只選需要的欄位</td><td>減少傳輸量，也可能只靠索引就回答</td></tr>
<tr><td><code>WHERE strftime('%Y', order_date) = '2024'</code></td><td><code>WHERE order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code></td><td>對欄位套用函式會讓索引失效</td></tr>
<tr><td><code>WHERE name LIKE '%明'</code></td><td>全文檢索，或改用前綴 <code>LIKE '王%'</code></td><td>開頭是 % 無法使用索引</td></tr>
<tr><td>在程式迴圈中逐筆查詢（N+1 問題）</td><td>一次用 JOIN 或 IN 查完</td><td>減少來回次數</td></tr>
<tr><td>大量資料用 OFFSET 深度分頁</td><td>依上一頁最後的 id 往下查（keyset 分頁）</td><td>OFFSET 100000 仍要先掃過 10 萬筆</td></tr>
</table>
<h3>檢視表（View）</h3>
<p>常用的複雜查詢可以存成<b>檢視表</b>，之後像資料表一樣查詢，也能只開放檢視表給特定人員，隱藏敏感欄位：</p>
<pre class="sql">CREATE VIEW v_order_summary AS
SELECT o.id, o.order_date, c.name AS customer, o.status,
       SUM(oi.qty * oi.unit_price) AS amount
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id;

SELECT * FROM v_order_summary WHERE amount &gt;= 10000 ORDER BY amount DESC;</pre>` },
    { id: 'injection', title: 'SQL Injection 與參數化查詢', html: `
<p><b>SQL Injection（SQL 注入）</b>是最常見的網站漏洞之一：程式把使用者輸入直接拼接成 SQL，攻擊者輸入特殊字元就能改變查詢的意思。</p>
<pre class="out"># 危險的寫法（Python）
name = input('請輸入帳號：')
sql = "SELECT * FROM users WHERE name = '" + name + "' AND password = '…'"

# 攻擊者輸入：  admin' --
# 實際執行：    SELECT * FROM users WHERE name = 'admin' --' AND password = '…'
#              -- 之後變成註解，不用密碼就登入了 admin</pre>
<p>用範例資料感受一下：原本只想查一位客戶，輸入 <code>' OR '1'='1</code> 就把整張表都查出來了：</p>
<pre class="sql">-- 程式拼接後的 SQL（使用者輸入的是 ' OR '1'='1）
SELECT id, name, city FROM customers WHERE name = '' OR '1'='1';</pre>
<p><b>防護方法：參數化查詢（Prepared Statement）</b>，SQL 與資料分開傳給資料庫，輸入的內容永遠被當成「值」，不會被當成 SQL 語法：</p>
<pre class="out"># Python sqlite3／MySQL Connector 等都支援
cur.execute("SELECT * FROM users WHERE name = ? AND password_hash = ?", (name, pw_hash))

// Node.js（mysql2）
db.execute('SELECT * FROM users WHERE name = ?', [name]);</pre>
<div class="box exam"><b class="t">其他防護</b>資料庫帳號只給需要的最小權限（應用程式帳號不要有 DROP 權限）；不要在錯誤訊息中顯示 SQL 細節；ORM（例如 Django ORM、Prisma）預設也是參數化的。資安課程（iPAS、Security+）也會考 SQL Injection。</div>` },
    { id: 'grant', title: '權限管理', html: `
<p>DCL 用來控制誰可以做什麼（SQLite 是單一檔案，沒有使用者權限；以下為 MySQL、PostgreSQL 寫法）：</p>
<pre class="out">-- 建立唯讀的分析帳號，只能查詢 shop 資料庫
CREATE USER analyst WITH PASSWORD '…';          -- PostgreSQL
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst;

-- 應用程式帳號可以讀寫訂單，但不能刪除
GRANT SELECT, INSERT, UPDATE ON orders TO app_user;
REVOKE DELETE ON orders FROM app_user;</pre>
<p>最小權限原則：分析師用唯讀帳號、應用程式用只能存取自己資料表的帳號、只有 DBA 有修改結構的權限。</p>` },
    { id: 'apps', title: '在工作中使用 SQL 與面試準備', html: `
<table>
<tr><th>工具</th><th>用法</th></tr>
<tr><td><b>Python</b></td><td><code>pandas.read_sql(查詢, 連線)</code> 直接得到 DataFrame，見 Python 實戰課程</td></tr>
<tr><td><b>Excel</b></td><td>資料 → 取得資料 → 從資料庫，可貼上 SQL 查詢，重新整理即更新</td></tr>
<tr><td><b>Power BI</b></td><td>取得資料時可輸入 SQL 陳述式，或匯入資料表後建立模型</td></tr>
<tr><td><b>資料庫工具</b></td><td>DBeaver（免費、支援各種資料庫）、DB Browser for SQLite、SSMS（SQL Server）、pgAdmin</td></tr>
</table>
<pre class="out"># Python：查詢結果直接變成 DataFrame
import sqlite3, pandas as pd
con = sqlite3.connect('shop.db')
df = pd.read_sql("SELECT category, SUM(price) AS total FROM products GROUP BY category", con)</pre>
<h3>面試常見題型</h3>
<ol>
<li>找出第二高的薪水（<code>DENSE_RANK</code> 或 <code>ORDER BY … LIMIT 1 OFFSET 1</code>，注意同分）</li>
<li>每個部門薪水最高的員工（視窗函式各組取第一）</li>
<li>沒有訂單的客戶（LEFT JOIN … IS NULL）</li>
<li>每月營收與月增率（GROUP BY 月份 + LAG）</li>
<li>連續登入 3 天的使用者（日期減去 ROW_NUMBER 的技巧）</li>
<li>WHERE 與 HAVING、INNER 與 LEFT JOIN、UNION 與 UNION ALL 的差別</li>
<li>索引的原理與缺點、如何防止 SQL Injection、什麼是正規化</li>
</ol>
<pre class="sql">-- 第二高的薪水（同分時仍正確）
WITH r AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees)
SELECT DISTINCT salary FROM r WHERE dr = 2;</pre>
<div class="box tip"><b class="t">作品集建議</b>從政府資料開放平臺下載一份資料（例如各縣市房價、公共自行車），匯入 SQLite 或 PostgreSQL，寫 10 個有商業意義的分析查詢，把查詢與結果放上 GitHub，在 104 履歷附上連結。</div>` }
  ],
  keypoints: [
    '索引讓查詢不必全表掃描，適合常用於 WHERE、JOIN、ORDER BY 的欄位。',
    '索引佔空間並拖慢寫入，不是越多越好；主鍵與 UNIQUE 會自動建立索引。',
    '用 EXPLAIN（SQLite 為 EXPLAIN QUERY PLAN）查看是否使用索引。',
    '對欄位套用函式、以 % 開頭的 LIKE 會讓索引失效。',
    '檢視表把常用查詢存起來，也能隱藏敏感欄位。',
    'SQL Injection 的根本防護是參數化查詢，並搭配最小權限原則。'
  ]
}
);
