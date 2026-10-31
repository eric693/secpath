/* Node.js 後端 Node.js 與 API 篇：事件迴圈、非同步、HTTP 與 REST、Express、驗證與錯誤處理
   <pre class="js"> 為可在網頁上執行的 JavaScript（瀏覽器環境，用來模擬後端邏輯）；<pre class="out"> 為需要在自己電腦上以 Node.js 執行的程式或指令
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 45,
  title: 'Node.js 與事件迴圈',
  summary: 'Node.js 是什麼、為什麼適合寫 API、安裝與執行、單執行緒與非阻塞 I/O、事件迴圈與微任務的執行順序，以及阻塞事件迴圈的後果。',
  sections: [
    { id: 'what', title: 'Node.js 是什麼', html: `
<p><b>Node.js</b> 是讓 JavaScript 在瀏覽器以外執行的環境，使用 Chrome 的 V8 引擎。前端與後端可以用同一種語言，這是許多團隊選擇 Node.js 的原因。</p>
<table>
<tr><th></th><th>瀏覽器的 JavaScript</th><th>Node.js</th></tr>
<tr><td>可以做</td><td>操作網頁（DOM）、呼叫 API</td><td>讀寫檔案、連資料庫、建立伺服器</td></tr>
<tr><td>不能做</td><td>直接讀寫電腦上的檔案</td><td>沒有 window、document</td></tr>
<tr><td>全域物件</td><td>window</td><td>globalThis、process</td></tr>
</table>
<p>Node.js 特別適合 <b>I/O 密集</b>的工作：API 伺服器大部分時間在等資料庫、等網路，而不是在做運算。</p>` },
    { id: 'install', title: '安裝與執行', html: `
<p>到 Node.js 官網下載 <b>LTS</b>（長期支援）版本。LTS 是偶數版號，提供較長的維護期，正式環境建議使用 LTS。</p>
<pre class="out">$ node -v                 # 查看版本，例如 v24.x.x
$ npm -v                  # npm 是 Node.js 內建的套件管理工具

$ mkdir todo-api &amp;&amp; cd todo-api
$ npm init -y             # 建立 package.json

# hello.js
console.log('Hello from Node.js', process.version);

$ node hello.js
$ node --watch hello.js   # 檔案修改後自動重新執行，開發時很方便</pre>
<p>本課程的伺服器程式需要在自己的電腦上執行；網頁上的「執行」按鈕使用瀏覽器的 JavaScript，用來練習後端的邏輯（非同步、路由、驗證、雜湊等），概念完全相同。</p>` },
    { id: 'loop', title: '單執行緒與事件迴圈', html: `
<p>Node.js 執行你的 JavaScript 只用<b>一個執行緒</b>。那它怎麼同時服務上千個請求？答案是<b>非阻塞 I/O</b>：讀檔、查資料庫、呼叫外部 API 時，不會停下來等，而是交給作業系統處理，完成後再把回呼函式排進<b>事件迴圈</b>的佇列。</p>
<pre class="out">餐廳比喻：
阻塞式：服務生幫一桌點完餐，站在廚房等菜做好、送上桌，才去下一桌
非阻塞：服務生點完餐把單子交給廚房，馬上去服務下一桌；菜好了廚房叫號，再去送菜</pre>
<p>執行順序的規則：先跑完目前的<b>同步程式</b>，再處理所有<b>微任務</b>（Promise 的 then、await 之後的程式），最後才是<b>計時器</b>等巨任務。</p>
<pre class="js">console.log('1 同步：開始');
setTimeout(() =&gt; console.log('5 計時器（巨任務）'), 0);
Promise.resolve().then(() =&gt; console.log('3 Promise 微任務'));
queueMicrotask(() =&gt; console.log('4 queueMicrotask 微任務'));
(async () =&gt; {
  console.log('2 async 函式內 await 之前（仍是同步）');
  await null;
  console.log('4.5 await 之後（微任務）');
})();
console.log('2.5 同步：結束');</pre>
<p>執行看看：輸出的順序和數字標示一致。setTimeout 設定 0 毫秒，仍然要等所有同步程式與微任務跑完才會執行。在 Node.js 中還有 process.nextTick，它比 Promise 微任務更早執行，但一般程式不需要用到。</p>` },
    { id: 'block', title: '不要阻塞事件迴圈', html: `
<p>因為只有一個執行緒，只要有一段程式跑很久，<b>所有請求都會被卡住</b>：</p>
<pre class="js">function slowSum(n) {             // 模擬耗時的同步運算
  let s = 0;
  for (let i = 0; i &lt; n; i++) s += i % 7;
  return s;
}
const t0 = Date.now();
setTimeout(() =&gt; console.log(\`計時器原本 10 毫秒後要執行，實際延遲了 \${Date.now() - t0} 毫秒\`), 10);
slowSum(80_000_000);
console.log(\`同步運算花了 \${Date.now() - t0} 毫秒，期間其他工作都在等待\`);</pre>
<table>
<tr><th>會阻塞的做法</th><th>改善方式</th></tr>
<tr><td>fs.readFileSync 讀大檔案</td><td>改用 fs.promises.readFile 或串流</td></tr>
<tr><td>大量運算（影像處理、加密大量資料）</td><td>使用 worker_threads 或交給其他服務</td></tr>
<tr><td>在請求中同步雜湊密碼</td><td>使用非同步版本（crypto.scrypt 而不是 scryptSync）</td></tr>
<tr><td>一次處理數十萬筆資料</td><td>分頁、分批或用背景工作佇列</td></tr>
</table>` }
  ],
  keypoints: [
    'Node.js 讓 JavaScript 在瀏覽器外執行，可以讀寫檔案、連資料庫、建立伺服器。',
    '正式環境使用 LTS（偶數版號）；node --watch 可在修改後自動重新執行。',
    'Node.js 以單執行緒執行 JavaScript，靠非阻塞 I/O 與事件迴圈同時處理大量請求。',
    '執行順序：同步程式 → 微任務（Promise、await 之後）→ 計時器等巨任務。',
    '長時間的同步運算會阻塞事件迴圈，讓所有請求都變慢。',
    '避免在請求中使用 Sync 版本的 API，大量運算交給 worker_threads 或其他服務。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: '非同步、模組與 npm',
  summary: 'Promise 與 async/await、循序與平行執行、非同步錯誤處理、ES 模組與 CommonJS、package.json 與 npm 指令、語意化版本，以及 Node.js 的核心模組。',
  sections: [
    { id: 'async', title: 'async/await 與平行執行', html: `
<p>後端的程式幾乎都是非同步的：查資料庫、呼叫其他 API、讀檔案。<b>async/await</b> 讓非同步程式讀起來像同步程式：</p>
<pre class="js">const sleep = ms =&gt; new Promise(r =&gt; setTimeout(r, ms));
async function getUser(id) { await sleep(300); return { id, name: '使用者' + id }; }
async function getTodos(id) { await sleep(300); return [\`任務 A（\${id}）\`, \`任務 B（\${id}）\`]; }

let t = Date.now();
const user = await getUser(1);
const todos = await getTodos(1);           // 等上一行完成才開始
console.log(\`循序執行：\${Date.now() - t} 毫秒\`, user.name, todos.length);

t = Date.now();
const [u2, t2] = await Promise.all([getUser(2), getTodos(2)]);   // 兩個同時開始
console.log(\`Promise.all 平行執行：\${Date.now() - t} 毫秒\`, u2.name, t2.length);</pre>
<p>兩個工作<b>互不相依</b>時，用 Promise.all 同時進行，總時間約等於最慢的那一個。但要注意：Promise.all 只要有一個失敗就整體失敗；想要「全部跑完再看各自結果」用 Promise.allSettled。</p>` },
    { id: 'errors', title: '非同步的錯誤處理', html: `
<pre class="js">async function findTodo(id) {
  await new Promise(r =&gt; setTimeout(r, 50));
  if (id &gt; 100) throw new Error(\`找不到待辦事項 \${id}\`);
  return { id, title: '寫測試' };
}
try {
  console.log(await findTodo(1));
  console.log(await findTodo(999));
} catch (err) {
  console.log('捕捉到錯誤：', err.message);
}

const results = await Promise.allSettled([findTodo(2), findTodo(500)]);
results.forEach(r =&gt; console.log(r.status, r.status === 'fulfilled' ? r.value.title : r.reason.message));</pre>
<div class="box warn"><b class="t">沒有被處理的 Promise 錯誤</b>忘了 await 或 catch 的 Promise 一旦失敗，在 Node.js 15 以後預設會讓整個程序結束。每個非同步呼叫都要有人處理錯誤，第 4 章的 Express 5 會幫路由自動處理這件事。</div>` },
    { id: 'modules', title: 'ES 模組與 npm', html: `
<p>Node.js 支援兩種模組系統。新專案建議使用 <b>ES 模組</b>（和前端相同的 import／export），在 package.json 加上 "type": "module"：</p>
<pre class="out">// package.json
{
  "name": "todo-api",
  "type": "module",
  "scripts": {
    "dev": "node --watch --env-file=.env src/server.js",
    "start": "node src/server.js",
    "test": "node --test"
  },
  "dependencies": { "express": "^5.1.0" }
}

// src/math.js（ES 模組）
export function add(a, b) { return a + b; }

// src/server.js
import { add } from './math.js';      // 相對路徑要寫副檔名
import express from 'express';         // 套件直接寫名稱

// 舊專案常見的 CommonJS 寫法
const express = require('express');
module.exports = { add };</pre>
<table>
<tr><th>指令</th><th>作用</th></tr>
<tr><td>npm install express</td><td>安裝套件並寫入 dependencies</td></tr>
<tr><td>npm install -D supertest</td><td>安裝開發用套件（devDependencies，例如測試工具）</td></tr>
<tr><td>npm run dev</td><td>執行 scripts 中定義的指令</td></tr>
<tr><td>npm ci</td><td>依 package-lock.json 安裝完全相同的版本（部署與 CI 使用）</td></tr>
<tr><td>npm audit</td><td>檢查已知的套件安全漏洞</td></tr>
</table>
<p>版本號 ^5.1.0 代表可以安裝 5.x.x 中 5.1.0 以上的版本（不跨主版號）。<b>package-lock.json 要提交到 Git</b>，確保每台電腦安裝的版本一致；node_modules 則不要提交。</p>` },
    { id: 'core', title: '常用核心模組', html: `
<table>
<tr><th>模組</th><th>用途</th></tr>
<tr><td>node:fs／node:fs/promises</td><td>讀寫檔案</td></tr>
<tr><td>node:path</td><td>組合與解析路徑（不同作業系統的分隔符號不同）</td></tr>
<tr><td>node:http</td><td>建立 HTTP 伺服器（Express 建立在它之上）</td></tr>
<tr><td>node:crypto</td><td>雜湊、亂數、加密（第 8 章密碼雜湊）</td></tr>
<tr><td>node:test、node:assert</td><td>內建的測試工具（第 9 章）</td></tr>
</table>
<pre class="out">// 只用核心模組的最小 HTTP 伺服器
import http from 'node:http';

const server = http.createServer((req, res) =&gt; {
  if (req.method === 'GET' &amp;&amp; req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});
server.listen(3000, () =&gt; console.log('http://localhost:3000'));</pre>
<p>只用 http 模組也能寫 API，但要自己解析網址、讀取請求內容、處理錯誤，路由一多就很難維護。這就是 Express 這類框架存在的原因。</p>` }
  ],
  keypoints: [
    'async/await 讓非同步程式易讀；互不相依的工作用 Promise.all 平行執行。',
    'Promise.all 一個失敗就整體失敗；Promise.allSettled 會等全部完成並回報各自結果。',
    '非同步錯誤用 try/catch 處理；未處理的 Promise 拒絕會讓 Node.js 程序結束。',
    '新專案使用 ES 模組（"type": "module"），相對路徑 import 要寫副檔名。',
    'npm install 安裝套件、-D 為開發用、npm ci 依鎖定檔安裝；package-lock.json 要提交。',
    '核心模組：fs、path、http、crypto、test；Express 建立在 http 模組之上。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 50,
  title: 'HTTP 與 REST API 設計',
  summary: 'HTTP 請求與回應的組成、HTTP 方法與冪等性、狀態碼的選擇、REST 的資源與網址設計、路徑參數與查詢參數、分頁與版本，以及 JSON 回應格式。',
  sections: [
    { id: 'http', title: 'HTTP 請求與回應', html: `
<pre class="out">請求（Request）
POST /api/todos HTTP/1.1                ← 方法、路徑
Host: api.example.com
Content-Type: application/json           ← 標頭（Headers）
Authorization: Bearer eyJhbGciOi...

{"title": "寫測試", "dueDate": "2026-11-01"}   ← 主體（Body）

回應（Response）
HTTP/1.1 201 Created                     ← 狀態碼
Content-Type: application/json
Location: /api/todos/11

{"id": 11, "title": "寫測試", "done": false, "dueDate": "2026-11-01"}</pre>
<p>HTTP 是<b>無狀態</b>的：每個請求都是獨立的，伺服器不會記得上一個請求是誰發的。所以登入後的每個請求都要帶上身分憑證（Cookie 或 Authorization 標頭，第 8 章）。</p>` },
    { id: 'methods', title: 'HTTP 方法與冪等性', html: `
<table>
<tr><th>方法</th><th>用途</th><th>例子</th><th>冪等</th></tr>
<tr><td>GET</td><td>讀取</td><td>GET /api/todos/7</td><td>是（而且不應改變資料）</td></tr>
<tr><td>POST</td><td>新增</td><td>POST /api/todos</td><td>否：送兩次會新增兩筆</td></tr>
<tr><td>PUT</td><td>整筆取代</td><td>PUT /api/todos/7</td><td>是</td></tr>
<tr><td>PATCH</td><td>部分修改</td><td>PATCH /api/todos/7 {"done": true}</td><td>不保證</td></tr>
<tr><td>DELETE</td><td>刪除</td><td>DELETE /api/todos/7</td><td>是</td></tr>
</table>
<p><b>冪等</b>（Idempotent）是指同一個請求送一次或送很多次，伺服器上的結果都相同。網路不穩定時，客戶端可以安全地重試冪等的請求；POST 重試則可能建立重複的訂單，需要額外設計（例如冪等金鑰）。</p>` },
    { id: 'status', title: '狀態碼', html: `
<table>
<tr><th>類別</th><th>常用狀態碼</th><th>何時使用</th></tr>
<tr><td>2xx 成功</td><td>200 OK、201 Created、204 No Content</td><td>讀取或更新成功；新增成功；刪除成功不回內容</td></tr>
<tr><td>3xx 重新導向</td><td>301、302、304 Not Modified</td><td>網址搬家；快取仍然有效</td></tr>
<tr><td>4xx 客戶端錯誤</td><td>400、401、403、404、409、422、429</td><td>格式錯誤、未登入、沒權限、找不到、衝突、驗證失敗、太頻繁</td></tr>
<tr><td>5xx 伺服器錯誤</td><td>500、502、503</td><td>程式錯誤、上游服務錯誤、暫時無法服務</td></tr>
</table>
<div class="box tip"><b class="t">選對狀態碼</b>客戶端寫錯就回 4xx，伺服器出錯才回 5xx。不要所有情況都回 200 再在內容裡寫 "success": false，這會讓前端、監控與快取都無法正確判斷。互動練習中的「狀態碼選擇器」可以練習常見情境。</div>` },
    { id: 'rest', title: 'REST 網址設計', html: `
<table>
<tr><th>原則</th><th>好的設計</th><th>不好的設計</th></tr>
<tr><td>資源用名詞、複數</td><td>GET /api/todos</td><td>GET /api/getAllTodos</td></tr>
<tr><td>動作交給 HTTP 方法</td><td>DELETE /api/todos/7</td><td>POST /api/todos/7/delete</td></tr>
<tr><td>巢狀表示從屬關係</td><td>GET /api/users/3/todos</td><td>GET /api/todosOfUser?id=3</td></tr>
<tr><td>篩選、排序、分頁用查詢參數</td><td>GET /api/todos?done=false&amp;sort=-createdAt&amp;page=2</td><td>GET /api/todos/undone/page2</td></tr>
<tr><td>一致的命名</td><td>全部小寫、用連字號 /api/todo-lists</td><td>混用 /api/TodoList 與 /api/todo_items</td></tr>
</table>
<pre class="js">// 解析網址：路徑參數與查詢參數
const url = new URL('https://api.example.com/api/users/3/todos?done=false&amp;page=2&amp;limit=20');
const match = url.pathname.match(/^\\/api\\/users\\/(\\d+)\\/todos$/);
console.log('路徑：', url.pathname);
console.log('路徑參數 userId =', Number(match[1]));
const q = url.searchParams;
console.log('查詢參數 done =', q.get('done'), '（注意是字串）');
console.log('page =', Number(q.get('page') ?? 1), 'limit =', Number(q.get('limit') ?? 10));
console.log('沒有提供的參數：', q.get('sort'));</pre>
<p>查詢參數一定是<b>字串</b>，"false" 在 JavaScript 中是 truthy，要自己轉換與驗證。互動練習中的「REST API 模擬器」可以對一個模擬的待辦事項 API 送出各種請求。</p>` },
    { id: 'json', title: '回應格式與分頁', html: `
<pre class="out">// 列表：資料加上分頁資訊
GET /api/todos?page=2&amp;limit=3
{
  "data": [
    { "id": 4, "title": "完成登入 API", "done": true, "dueDate": "2026-10-15" },
    ...
  ],
  "pagination": { "page": 2, "limit": 3, "total": 10, "totalPages": 4 }
}

// 錯誤：一致的格式（第 5 章）
{ "type": "validation-error", "title": "輸入資料有誤", "status": 400,
  "errors": [{ "field": "title", "message": "標題不可為空" }] }</pre>
<table>
<tr><th>分頁方式</th><th>做法</th><th>優缺點</th></tr>
<tr><td>頁碼（Offset）</td><td>?page=2&amp;limit=20，SQL 用 LIMIT 與 OFFSET</td><td>簡單、可跳頁；資料很多時越後面越慢，資料變動時可能重複或漏掉</td></tr>
<tr><td>游標（Cursor）</td><td>?after=last_id&amp;limit=20</td><td>效能穩定、適合無限捲動；不能直接跳到第 N 頁</td></tr>
</table>
<p>API 改版時常用網址加版本（/api/v1/todos），讓舊的客戶端繼續運作。欄位命名在 JSON 中常用 camelCase（dueDate），資料庫中常用 snake_case（due_date），在程式中轉換。</p>` }
  ],
  keypoints: [
    'HTTP 請求包含方法、路徑、標頭、主體；回應包含狀態碼、標頭、主體；HTTP 是無狀態的。',
    'GET 讀取、POST 新增、PUT 整筆取代、PATCH 部分修改、DELETE 刪除。',
    'GET、PUT、DELETE 是冪等的，可以安全重試；POST 不是。',
    '客戶端錯誤回 4xx、伺服器錯誤回 5xx；不要一律回 200。',
    'REST 網址用名詞與複數，篩選、排序、分頁用查詢參數；查詢參數都是字串。',
    '列表回應附分頁資訊；分頁有頁碼與游標兩種；API 改版可在網址加版本。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 55,
  title: 'Express 5：路由與中介軟體',
  summary: '建立 Express 應用程式、路由與路由參數、req 與 res 的常用方法、中介軟體的概念與執行順序、express.Router 拆分路由、錯誤處理中介軟體，以及 Express 5 自動處理非同步錯誤。',
  sections: [
    { id: 'hello', title: '第一個 Express API', html: `
<pre class="out">$ npm install express

// src/app.js
import express from 'express';

export const app = express();
app.use(express.json());                     // 解析 JSON 請求主體到 req.body

const todos = [{ id: 1, title: '學 Express', done: false }];

app.get('/api/todos', (req, res) =&gt; {
  res.json({ data: todos });
});

app.get('/api/todos/:id', (req, res) =&gt; {
  const todo = todos.find(t =&gt; t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ title: '找不到待辦事項', status: 404 });
  res.json(todo);
});

app.post('/api/todos', (req, res) =&gt; {
  const todo = { id: todos.length + 1, title: req.body.title, done: false };
  todos.push(todo);
  res.status(201).location(\`/api/todos/\${todo.id}\`).json(todo);
});

// src/server.js
import { app } from './app.js';
const port = process.env.PORT ?? 3000;
app.listen(port, () =&gt; console.log(\`API 在 http://localhost:\${port}\`));</pre>
<p>把 app 與啟動伺服器分成兩個檔案，測試時就能直接匯入 app，而不用真的監聽連接埠（第 9 章）。用 curl 或瀏覽器擴充功能測試：</p>
<pre class="out">$ curl http://localhost:3000/api/todos/1
$ curl -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -d '{"title":"寫測試"}'</pre>` },
    { id: 'reqres', title: 'req 與 res', html: `
<table>
<tr><th>屬性或方法</th><th>說明</th><th>例子</th></tr>
<tr><td>req.params</td><td>路徑參數（字串）</td><td>/api/todos/:id → req.params.id</td></tr>
<tr><td>req.query</td><td>查詢參數（字串）</td><td>?page=2 → req.query.page</td></tr>
<tr><td>req.body</td><td>請求主體，需先用 express.json()；Express 5 沒有解析時是 undefined</td><td>{ title: '寫測試' }</td></tr>
<tr><td>req.get(name)</td><td>讀取請求標頭</td><td>req.get('Authorization')</td></tr>
<tr><td>res.status(code)</td><td>設定狀態碼，可串接</td><td>res.status(201).json(todo)</td></tr>
<tr><td>res.json(obj)</td><td>回傳 JSON 並設定 Content-Type</td><td>res.json({ data })</td></tr>
<tr><td>res.sendStatus(code)</td><td>只回狀態碼</td><td>res.sendStatus(204)</td></tr>
</table>
<p>每個請求只能回應<b>一次</b>。常見錯誤是 if 裡回應後忘了 return，程式繼續往下又回應一次，出現「Cannot set headers after they are sent」錯誤。</p>` },
    { id: 'middleware', title: '中介軟體', html: `
<p><b>中介軟體</b>（Middleware）是在請求到達路由之前（或之後）執行的函式，形式是 (req, res, next)。它可以：讀取或修改 req、直接回應（例如未登入就回 401）、或呼叫 <b>next()</b> 交給下一個。中介軟體<b>依註冊順序</b>執行。</p>
<p>下面用 40 行 JavaScript 做出一個迷你版的 Express，模擬請求經過中介軟體的過程：</p>
<pre class="js">function miniExpress() {
  const stack = [];
  const app = {
    use: fn =&gt; stack.push({ fn }),
    get: (path, fn) =&gt; stack.push({ method: 'GET', path, fn }),
    async handle(req) {
      const res = { statusCode: 200, body: null,
        status(c) { this.statusCode = c; return this; },
        json(b) { this.body = b; this.sent = true; } };
      let i = 0;
      const next = async err =&gt; {
        while (i &lt; stack.length) {
          const layer = stack[i++];
          const isErrorHandler = layer.fn.length === 4;
          if (layer.method &amp;&amp; (layer.method !== req.method || layer.path !== req.path)) continue;
          if (err &amp;&amp; !isErrorHandler) continue;           // 有錯誤時跳到錯誤處理
          if (!err &amp;&amp; isErrorHandler) continue;
          try { return await (err ? layer.fn(err, req, res, next) : layer.fn(req, res, next)); }
          catch (e) { return next(e); }                   // 像 Express 5：非同步錯誤自動交給錯誤處理
        }
        if (!res.sent) res.status(404).json({ title: 'Not Found' });
      };
      await next();
      return res;
    }
  };
  return app;
}

const app = miniExpress();
app.use((req, res, next) =&gt; { console.log(\`→ 記錄：\${req.method} \${req.path}\`); next(); });
app.use((req, res, next) =&gt; {
  if (req.path.startsWith('/admin') &amp;&amp; req.user !== 'amy') return res.status(403).json({ title: '沒有權限' });
  next();
});
app.get('/api/todos', (req, res) =&gt; res.json({ data: ['寫測試'] }));
app.get('/api/boom', async () =&gt; { throw new Error('資料庫連線失敗'); });
app.use((err, req, res, next) =&gt; res.status(500).json({ title: '伺服器錯誤', detail: err.message }));

for (const req of [{ method: 'GET', path: '/api/todos' }, { method: 'GET', path: '/admin/users', user: 'ben' },
                   { method: 'GET', path: '/api/boom' }, { method: 'GET', path: '/nope' }]) {
  const res = await app.handle(req);
  console.log(\`  \${res.statusCode}\`, JSON.stringify(res.body));
}</pre>
<p>互動練習中的「中介軟體流程」可以調整中介軟體的順序，觀察請求在哪裡被攔下。</p>` },
    { id: 'common', title: '常用中介軟體與 Router', html: `
<table>
<tr><th>中介軟體</th><th>用途</th></tr>
<tr><td>express.json()</td><td>解析 JSON 請求主體（內建）</td></tr>
<tr><td>express.static('public')</td><td>提供靜態檔案（內建）</td></tr>
<tr><td>cors</td><td>允許其他網域的前端呼叫 API（第 9 章）</td></tr>
<tr><td>helmet</td><td>設定安全相關的回應標頭（第 9 章）</td></tr>
<tr><td>express-rate-limit</td><td>限制請求頻率（第 9 章）</td></tr>
<tr><td>自訂的 requireAuth</td><td>驗證登入（第 8 章）</td></tr>
</table>
<pre class="out">// src/routes/todos.js：用 Router 把同一類路由放在一起
import { Router } from 'express';
export const todosRouter = Router();
todosRouter.get('/', listTodos);
todosRouter.post('/', createTodo);
todosRouter.get('/:id', getTodo);
todosRouter.patch('/:id', updateTodo);
todosRouter.delete('/:id', deleteTodo);

// src/app.js
app.use('/api/todos', requireAuth, todosRouter);    // 這組路由都要先登入</pre>` },
    { id: 'errors', title: '錯誤處理與 Express 5', html: `
<p><b>錯誤處理中介軟體</b>有四個參數 (err, req, res, next)，要註冊在<b>所有路由之後</b>。路由中呼叫 next(err) 或丟出錯誤，都會跳到這裡：</p>
<pre class="out">// Express 5：async 路由丟出的錯誤（或被拒絕的 Promise）會自動交給錯誤處理
app.get('/api/todos/:id', async (req, res) =&gt; {
  const todo = await db.findTodo(req.params.id);   // 如果這裡丟出錯誤…
  res.json(todo);
});

// 找不到路由
app.use((req, res) =&gt; res.status(404).json({ title: 'Not Found', status: 404 }));

// …會來到這裡
app.use((err, req, res, next) =&gt; {
  console.error(err);                               // 記錄完整錯誤供除錯
  const status = err.status ?? 500;
  res.status(status).json({
    title: status === 500 ? '伺服器發生錯誤' : err.message,   // 不要把內部錯誤細節回傳給使用者
    status,
  });
});</pre>
<div class="box tip"><b class="t">Express 4 與 5 的差異</b>Express 4 的 async 路由丟出錯誤不會被捕捉，常需要 try/catch 或 express-async-handler 套件。Express 5 會自動處理。其他變更：路徑萬用字元改為具名寫法（例如 /*splat）、沒有解析主體時 req.body 是 undefined。網路上很多教學仍是 Express 4 的寫法，閱讀時要注意。</div>` }
  ],
  keypoints: [
    'app.use(express.json()) 解析 JSON；app.get／post／patch／delete 定義路由。',
    'req.params、req.query 都是字串；req.body 需要 express.json() 才有值。',
    '每個請求只能回應一次，回應後記得 return。',
    '中介軟體 (req, res, next) 依註冊順序執行，要嘛回應、要嘛呼叫 next()。',
    '用 express.Router 拆分路由，可以對整組路由套用中介軟體。',
    '錯誤處理中介軟體有四個參數、放在最後；Express 5 自動處理 async 路由的錯誤。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 45,
  title: '輸入驗證與錯誤格式',
  summary: '為什麼永遠不能信任輸入、驗證的層次、用 zod 定義資料結構、驗證中介軟體、一致的錯誤格式（Problem Details）、自訂錯誤類別，以及日誌與錯誤訊息的分寸。',
  sections: [
    { id: 'trust', title: '永遠不信任輸入', html: `
<p>前端做了表單驗證，後端還要驗證嗎？<b>一定要</b>。任何人都可以用 curl 或程式直接呼叫 API，繞過前端。來自客戶端的所有資料都可能是錯的或惡意的：</p>
<table>
<tr><th>來源</th><th>可能的問題</th></tr>
<tr><td>req.body</td><td>欄位缺少、型別錯誤、字串超長、多出不該有的欄位（例如自己加 role: "admin"）</td></tr>
<tr><td>req.params、req.query</td><td>"abc" 當作 id、負數頁碼、limit=1000000</td></tr>
<tr><td>標頭與 Cookie</td><td>偽造或過期的憑證</td></tr>
</table>
<p>前端驗證是為了<b>使用者體驗</b>，後端驗證是為了<b>資料正確與安全</b>。</p>` },
    { id: 'manual', title: '驗證的邏輯', html: `
<p>先用純 JavaScript 寫一個驗證函式，理解驗證要檢查什麼：</p>
<pre class="js">function validateTodo(body) {
  const errors = [];
  if (typeof body !== 'object' || body === null) return { ok: false, errors: [{ field: '(body)', message: '必須是 JSON 物件' }] };
  const { title, dueDate, done, ...extra } = body;
  if (typeof title !== 'string' || title.trim() === '') errors.push({ field: 'title', message: '標題不可為空' });
  else if (title.length &gt; 100) errors.push({ field: 'title', message: '標題最多 100 字' });
  if (dueDate !== undefined &amp;&amp; !/^\\d{4}-\\d{2}-\\d{2}$/.test(dueDate)) errors.push({ field: 'dueDate', message: '日期格式須為 YYYY-MM-DD' });
  if (done !== undefined &amp;&amp; typeof done !== 'boolean') errors.push({ field: 'done', message: '必須是 true 或 false' });
  for (const k of Object.keys(extra)) errors.push({ field: k, message: '不允許的欄位' });
  return errors.length ? { ok: false, errors } : { ok: true, data: { title: title.trim(), dueDate: dueDate ?? null, done: done ?? false } };
}

const cases = [
  { title: '  寫測試  ', dueDate: '2026-11-01' },
  { title: '', done: 'yes' },
  { title: '升級權限', role: 'admin' },
  { title: 'x'.repeat(120), dueDate: '11/01' },
];
for (const c of cases) console.log(JSON.stringify(validateTodo(c)));</pre>
<p>注意第一筆：驗證通過後回傳<b>清理過的資料</b>（去掉前後空白、補上預設值），後續程式只使用這份資料，而不是原始的 req.body。第三筆想偷偷加上 role 欄位，被當作不允許的欄位擋下，這可以防止<b>大量指派</b>（Mass Assignment）攻擊。</p>` },
    { id: 'zod', title: '用 zod 定義資料結構', html: `
<p>實務上會用驗證函式庫，用宣告的方式描述資料結構。<b>zod</b> 在 JavaScript 與 TypeScript 專案都很常見：</p>
<pre class="out">$ npm install zod

// src/schemas.js
import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().trim().min(1, '標題不可為空').max(100, '標題最多 100 字'),
  dueDate: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/, '日期格式須為 YYYY-MM-DD').optional(),
  done: z.boolean().default(false),
}).strict();                                   // 不允許多餘的欄位

export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),          // 查詢參數是字串，coerce 轉成數字
  limit: z.coerce.number().int().min(1).max(100).default(20),
  done: z.enum(['true', 'false']).optional(),
});

// src/middleware/validate.js：可重複使用的驗證中介軟體
export const validate = (schema, source = 'body') =&gt; (req, res, next) =&gt; {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    return res.status(400).type('application/problem+json').json({
      type: 'https://example.com/problems/validation-error',
      title: '輸入資料有誤',
      status: 400,
      errors: result.error.issues.map(i =&gt; ({ field: i.path.join('.'), message: i.message })),
    });
  }
  req.valid = result.data;                     // 後續只使用驗證過的資料
  next();
};

// 使用
todosRouter.post('/', validate(createTodoSchema), createTodo);
todosRouter.get('/', validate(listQuerySchema, 'query'), listTodos);</pre>
<p>限制 limit 的最大值很重要：沒有上限的話，有人送 limit=1000000 就能讓資料庫一次撈出所有資料，拖垮伺服器。</p>` },
    { id: 'problem', title: '一致的錯誤格式', html: `
<p><b>Problem Details</b>（RFC 9457）是 HTTP API 錯誤格式的標準，Content-Type 為 application/problem+json：</p>
<table>
<tr><th>欄位</th><th>說明</th></tr>
<tr><td>type</td><td>錯誤類型的識別網址（可以是說明文件）</td></tr>
<tr><td>title</td><td>簡短、人類可讀的錯誤摘要</td></tr>
<tr><td>status</td><td>HTTP 狀態碼</td></tr>
<tr><td>detail</td><td>這一次錯誤的具體說明</td></tr>
<tr><td>自訂欄位</td><td>例如 errors 列出每個欄位的問題</td></tr>
</table>
<pre class="js">class HttpError extends Error {
  constructor(status, title, detail) { super(title); this.status = status; this.detail = detail; }
}
const NotFound = what =&gt; new HttpError(404, '找不到資源', \`\${what} 不存在\`);
const Conflict = detail =&gt; new HttpError(409, '資料衝突', detail);

function toProblem(err) {               // 錯誤處理中介軟體的核心邏輯
  if (err instanceof HttpError) return { status: err.status, title: err.message, detail: err.detail };
  return { status: 500, title: '伺服器發生錯誤' };     // 未預期的錯誤：不洩漏內部訊息
}
for (const e of [NotFound('待辦事項 99'), Conflict('這個 Email 已經註冊'), new Error('SQLITE_BUSY: database is locked')]) {
  console.log(JSON.stringify(toProblem(e)));
}</pre>
<div class="box warn"><b class="t">錯誤訊息的分寸</b>給使用者的錯誤訊息要有幫助但不洩漏內部資訊：不要回傳 SQL 語句、檔案路徑或堆疊追蹤。完整錯誤寫進伺服器日誌，並附上請求編號，方便對照除錯。</div>` }
  ],
  keypoints: [
    '前端驗證為了體驗，後端驗證為了正確與安全；所有客戶端資料都要驗證。',
    '驗證型別、必填、長度、格式，並拒絕多餘欄位以防止大量指派攻擊。',
    '驗證後只使用清理過的資料（去空白、補預設值、轉型）。',
    'zod 用 schema 描述資料；查詢參數用 coerce 轉型；safeParse 不會丟出錯誤。',
    '分頁的 limit 一定要設上限。',
    '錯誤格式可依 Problem Details（RFC 9457）；不要把內部錯誤細節回傳給使用者。'
  ]
}
);
