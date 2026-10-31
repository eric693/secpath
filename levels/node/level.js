/* Node.js 後端與 API 開發課程設定（原創教學課程，以 Express 5、SQLite 與 REST API 為例） */
window.LEVEL = {
  id: 'node',
  name: 'Node.js 後端',
  title: 'Node.js 後端與 API 開發：從 Express 到登入驗證與上線',
  overline: '前端轉全端必備・Express 5 × REST API × SQL × JWT',
  site: ['Node.js 官方文件', 'https://nodejs.org/docs/latest/api/'],
  headline: 'Node.js 後端與 API 開發<br>從 Express 到登入驗證與上線',
  lead: '會寫前端之後，下一步就是自己做出後端：設計 REST API、存取資料庫、處理註冊登入，並安全地部署上線。10 章講義以一個「待辦事項 API」貫穿，從 Node.js 的事件迴圈與非同步開始，學會 HTTP 與 REST 設計、Express 5 的路由與中介軟體、輸入驗證與錯誤處理，再用 SQL 設計資料表並完成 CRUD API，最後實作密碼雜湊、Session 與 JWT 登入、API 安全、自動化測試與部署。JavaScript 與 SQL 範例都能在網頁上直接執行，並搭配 REST API 模擬器、狀態碼選擇器、中介軟體流程與 JWT 解碼器等互動工具。',
  subjects: {
    1: { name: 'Node.js 與 API 篇', title: '事件迴圈、非同步、HTTP 與 REST、Express、驗證與錯誤處理' },
    2: { name: '資料庫、驗證與上線篇', title: 'SQL、CRUD API、登入驗證、安全、測試與部署' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '學習完成清單', terms: '後端名詞', mnemonics: '重點口訣', numbers: '狀態碼與指令速查',
    sprintLead: '寫 API 或準備後端面試前隨時查閱：重點口訣、常用狀態碼與指令，以及各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以後端觀念、API 設計、程式輸出與資安情境題為主。附程式碼的題目皆已實際執行驗證。',
    videoNote: '套件版本更新快，影片中的寫法可能和講義不同，以講義的 Express 5 寫法為準'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並能從零做出一個有註冊登入、資料驗證、分頁查詢與自動化測試的 REST API，部署到雲端主機，讓自己的 React 前端呼叫它。',
  examInfo: [
    ['課程定位', '會 JavaScript 與前端、想轉全端的工程師與學生，以及需要寫 API 的開發者'],
    ['使用版本', 'Node.js 目前的 LTS 版本（例如 24）、Express 5、better-sqlite3、jsonwebtoken、zod'],
    ['先備知識', 'JavaScript 基礎（變數、函式、陣列、物件、async/await）；學過「網頁開發入門」更好'],
    ['學習時間', '講義約 9 小時，另加動手做出一個完整 API 的練習'],
    ['完成能力', '能設計並實作安全的 REST API、串接資料庫、處理登入驗證、撰寫測試並部署上線'],
    ['銜接課程', 'React、TypeScript、SQL、Git、DevOps 入門、Kubernetes']
  ],
  examNote: 'Node.js 與 npm 套件更新很快，講義依 2026 年 10 月的 Node.js LTS 與 Express 5 寫法撰寫。伺服器程式需要在自己的電腦上以 Node.js 執行；網頁上可執行的範例以瀏覽器的 JavaScript 與 SQLite 模擬後端的運作邏輯。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：Node.js 與事件迴圈、非同步與模組、HTTP 與 REST API 設計'],
    ['第 2 週', '第 4～5 章：Express 5 路由與中介軟體、輸入驗證與錯誤處理，完成 Node.js 與 API 篇測驗'],
    ['第 3 週', '第 6～8 章：資料庫與 SQL、CRUD API 實作、使用者註冊與登入'],
    ['第 4 週', '第 9～10 章：API 安全與測試、部署與維運，完成資料庫、驗證與上線篇測驗'],
    ['之後', '把自己的 React 作品接上這個 API，部署成完整的全端作品集']
  ],
  mnemonics: [
    ['單執行緒不卡住', '耗時的 I/O 交給系統，完成後回呼排進事件迴圈'],
    ['微任務先於計時器', '同步程式 → Promise 微任務 → setTimeout'],
    ['資源用名詞', '/todos、/todos/42；動作交給 HTTP 方法'],
    ['GET 讀、POST 新增', 'PUT 整筆取代、PATCH 部分修改、DELETE 刪除'],
    ['冪等', 'GET、PUT、DELETE 重複呼叫結果相同；POST 不是'],
    ['中介軟體要 next()', '不回應也不呼叫 next，請求就會卡住'],
    ['錯誤處理放最後', '四個參數 (err, req, res, next) 的中介軟體'],
    ['永遠不信任輸入', '每個來自客戶端的值都要驗證'],
    ['SQL 用參數', '用 ? 佔位，不要把輸入拼接進 SQL'],
    ['密碼只存雜湊', '加鹽、慢速雜湊（scrypt、bcrypt、argon2）'],
    ['401 是誰、403 是不准', '未登入回 401，已登入但沒權限回 403'],
    ['祕密放環境變數', '金鑰、密碼不進 Git']
  ],
  numbers: [
    ['200 OK', '成功取得或更新'],
    ['201 Created', '新增成功，搭配 Location 標頭'],
    ['204 No Content', '成功但沒有回應內容（常用於刪除）'],
    ['400 Bad Request', '請求格式錯誤或驗證失敗'],
    ['401 Unauthorized', '沒有登入或憑證無效'],
    ['403 Forbidden', '已登入但沒有權限'],
    ['404 Not Found', '資源不存在'],
    ['409 Conflict', '和現有資料衝突，例如 Email 已註冊'],
    ['429 Too Many Requests', '超過速率限制'],
    ['500 Internal Server Error', '伺服器端未預期的錯誤'],
    ['npm init -y／npm install', '建立專案／安裝套件'],
    ['node --watch／node --test', '修改後自動重啟／執行測試']
  ],
  checklist: [
    '能說明 Node.js 的事件迴圈，以及同步、微任務與計時器的執行順序',
    '能用 async/await 與 Promise.all 處理非同步並正確處理錯誤',
    '能使用 ES 模組、npm 與 package.json 管理專案',
    '能依 REST 原則設計資源網址、HTTP 方法與狀態碼',
    '能用 Express 5 撰寫路由、中介軟體與統一的錯誤處理',
    '能驗證輸入資料並回傳一致的錯誤格式',
    '能設計資料表、撰寫 CRUD 與 JOIN 查詢，並使用參數化查詢',
    '能實作分頁、篩選與排序的 API',
    '能用加鹽的慢速雜湊儲存密碼，並實作 Session 或 JWT 登入',
    '能設定 CORS、安全標頭與速率限制，防範常見攻擊',
    '能用 node:test 與 supertest 撰寫 API 測試',
    '能用環境變數、程序管理與反向代理部署 API，並讓前端呼叫'
  ],
  tools: [['restsim', 'c03'], ['statuscode', 'c03'], ['mwflow', 'c04'], ['jwt', 'c08']]
};
