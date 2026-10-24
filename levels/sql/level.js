/* SQL 資料庫入門課程設定（原創教學課程，非證照課程） */
window.LEVEL = {
  id: 'sql',
  name: 'SQL',
  title: 'SQL 資料庫入門：從查詢到資料分析',
  overline: '資料分析與後端必備・SQL × 關聯式資料庫',
  site: ['SQLite 官方文件', 'https://www.sqlite.org/lang.html'],
  headline: 'SQL 資料庫入門<br>從查詢到資料分析',
  lead: '資料分析師、後端工程師、MIS 與 PM 職缺最常要求的技能就是 SQL。12 章講義從 SELECT 查詢、篩選、函式、分組彙總、JOIN 多表查詢、子查詢與視窗函式，一路學到建立資料表、交易、資料庫設計與正規化、索引效能與 SQL Injection 防護。每個範例都能直接在網頁上執行與修改，使用同一套網路商店與公司人事資料，不需要安裝任何軟體。',
  subjects: {
    1: { name: '查詢篇', title: '查詢、彙總與資料分析' },
    2: { name: '設計篇', title: '建立資料表、設計與實務' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '學習完成清單', terms: 'SQL 常用名詞', mnemonics: '重點口訣', numbers: '常用語法速查',
    sprintLead: '寫查詢或準備面試時隨時查閱：重點口訣、常用語法與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以觀念題與「查詢結果判讀」題為主，查詢結果題都以 SQLite 3.45 對範例資料實際執行驗證。',
    videoNote: '語法以 SQLite 為主，並註明 MySQL、PostgreSQL、SQL Server 的差異'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並能在 10 分鐘內寫出「每位客戶的訂單數與消費總額，依金額排序取前 5 名」這類查詢。',
  examInfo: [
    ['課程定位', '零基礎學會 SQL，適合資料分析、後端、MIS、PM 與行銷分析人員'],
    ['使用環境', '網頁內建 SQLite，範例可直接執行；語法差異另註明 MySQL、PostgreSQL、SQL Server'],
    ['範例資料', '網路商店（客戶、商品、訂單、訂單明細）與公司人事（部門、員工）'],
    ['學習時間', '講義約 9 小時，另加查詢練習'],
    ['完成能力', '能寫出多表查詢、分組統計與排名分析，並設計正規化的資料表'],
    ['銜接課程', 'Python 實戰（pandas）、Excel 與 Power BI、DevOps 入門']
  ],
  examNote: 'SQL 是標準語言，但各資料庫在日期函式、字串串接、分頁語法上有差異。講義以 SQLite 執行，遇到差異時會列出 MySQL、PostgreSQL、SQL Server 的寫法；面試與工作上以公司使用的資料庫文件為準。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～4 章：資料庫概論、SELECT、WHERE 篩選、函式與 CASE，每個範例都動手改改看'],
    ['第 2 週', '第 5～6 章：分組彙總與 JOIN 多表查詢（最重要的兩章，多做練習）'],
    ['第 3 週', '第 7～8 章：子查詢、CTE 與視窗函式，完成查詢篇測驗'],
    ['第 4 週', '第 9～12 章：建立資料表、新增修改刪除與交易、正規化設計、索引與安全，完成設計篇測驗'],
    ['之後', '用公開資料集（政府資料開放平臺）建立自己的資料庫，寫 10 個分析查詢放進作品集']
  ],
  mnemonics: [
    ['撰寫順序', 'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT'],
    ['執行順序', 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT'],
    ['WHERE 與 HAVING', 'WHERE 篩選資料列（分組前），HAVING 篩選分組結果（分組後）'],
    ['NULL 三原則', '用 IS NULL 判斷、任何數和 NULL 運算都是 NULL、彙總函式會略過 NULL'],
    ['COUNT 三兄弟', 'COUNT(*) 算列數、COUNT(欄位) 不算 NULL、COUNT(DISTINCT 欄位) 不重複'],
    ['JOIN 選擇', '只要兩邊都有的用 INNER，要保留左表全部用 LEFT，找「沒有」的用 LEFT JOIN … IS NULL'],
    ['GROUP BY 規則', 'SELECT 裡沒有彙總的欄位，都要放進 GROUP BY'],
    ['排名函式', 'ROW_NUMBER 不重複、RANK 同分跳號、DENSE_RANK 同分不跳號'],
    ['改資料先 SELECT', 'UPDATE、DELETE 前先用同樣的 WHERE 跑一次 SELECT 確認範圍'],
    ['正規化口訣', '1NF 欄位不可再分、2NF 完全依賴主鍵、3NF 不依賴其他非鍵欄位'],
    ['防 SQL Injection', '永遠使用參數化查詢，不要用字串拼接使用者輸入']
  ],
  numbers: [
    ['SELECT 欄位 FROM 表 WHERE 條件', '基本查詢'],
    ['ORDER BY 欄位 DESC LIMIT n', '排序後取前 n 筆'],
    ['WHERE 欄位 IN (…) / BETWEEN a AND b', '多值、範圍篩選（BETWEEN 包含兩端）'],
    ["WHERE name LIKE '王%'", '% 任意長度、_ 一個字元'],
    ['COALESCE(欄位, 預設值)', 'NULL 換成預設值'],
    ['CASE WHEN 條件 THEN 值 ELSE 值 END', '條件判斷'],
    ['GROUP BY 欄位 HAVING 條件', '分組與分組後篩選'],
    ['A JOIN B ON A.id = B.a_id', '內部合併'],
    ['A LEFT JOIN B ON …', '保留 A 的全部資料列'],
    ['WITH 名稱 AS (查詢)', 'CTE 暫存查詢結果'],
    ['ROW_NUMBER() OVER (PARTITION BY … ORDER BY …)', '分組內排名'],
    ['INSERT INTO 表 (欄位) VALUES (…)', '新增資料'],
    ['UPDATE 表 SET 欄位 = 值 WHERE …', '修改資料（不要忘了 WHERE）'],
    ['CREATE INDEX 名稱 ON 表(欄位)', '建立索引']
  ],
  checklist: [
    '能說明資料表、資料列、欄位、主鍵與外鍵的意義',
    '能寫出包含 WHERE、ORDER BY、LIMIT 的查詢，並正確處理 NULL',
    '能用 CASE WHEN 把數值分級，用 COALESCE 處理空值',
    '能用 GROUP BY 與 HAVING 計算各分類的筆數、總和與平均',
    '能分辨 INNER JOIN 與 LEFT JOIN，並找出「沒有訂單的客戶」',
    '能用子查詢或 CTE 拆解複雜查詢',
    '能用 ROW_NUMBER、RANK 做分組排名，用 SUM OVER 計算累計',
    '能建立含主鍵、外鍵、NOT NULL、CHECK 的資料表',
    '能安全地執行 UPDATE、DELETE，並用交易確保資料一致',
    '能把一張混亂的 Excel 表正規化成多張資料表',
    '能說明索引的用途與代價，並用參數化查詢防止 SQL Injection'
  ],
  tools: [['sqlorder', 'c05'], ['joinviz', 'c06']]
};
