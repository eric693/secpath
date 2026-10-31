/* Node.js 後端 資料庫、驗證與上線篇：SQL、CRUD API、登入驗證、安全、測試與部署
   <pre class="js"> 為可在網頁上執行的 JavaScript；<pre class="sql"> 在瀏覽器中以 SQLite 執行；<pre class="out"> 為需要在自己電腦上執行的程式或指令
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c06', subject: 2, minutes: 50,
  title: '資料庫與 SQL',
  summary: '為什麼要用資料庫、關聯式資料庫與 NoSQL、設計資料表與外鍵、CRUD 與 JOIN 查詢、索引、交易，以及在 Node.js 中用 better-sqlite3 連線與參數化查詢。',
  sections: [
    { id: 'why', title: '選擇資料庫', html: `
<p>前幾章把資料存在陣列裡，伺服器一重啟就消失，也無法同時給多台伺服器使用。正式的 API 需要<b>資料庫</b>：</p>
<table>
<tr><th>類型</th><th>例子</th><th>適合</th></tr>
<tr><td>關聯式（SQL）</td><td>PostgreSQL、MySQL、SQLite</td><td>結構明確、需要關聯與交易的資料（使用者、訂單）——大多數 API 的首選</td></tr>
<tr><td>文件式（NoSQL）</td><td>MongoDB</td><td>結構多變的文件</td></tr>
<tr><td>鍵值</td><td>Redis</td><td>快取、Session、速率限制計數</td></tr>
</table>
<p>本課程用 <b>SQLite</b> 學習與開發：不需要安裝伺服器，整個資料庫就是一個檔案。正式環境的多使用者服務常改用 PostgreSQL，SQL 語法大部分相同。下面的 SQL 範例可以直接在網頁上執行，資料庫包含 users 與 todos 兩張表（按「資料表」可以查看結構）。</p>` },
    { id: 'schema', title: '設計資料表', html: `
<pre class="out">CREATE TABLE users (
  id INTEGER PRIMARY KEY,                       -- 主鍵：每筆資料唯一的識別碼
  email TEXT NOT NULL UNIQUE,                   -- 唯一：同一個 Email 不能註冊兩次
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,                  -- 只存雜湊，不存密碼（第 8 章）
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TEXT NOT NULL
);
CREATE TABLE todos (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,   -- 外鍵：屬於哪位使用者
  title TEXT NOT NULL,
  done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0, 1)),            -- SQLite 沒有布林型別，用 0／1
  due_date TEXT,
  created_at TEXT NOT NULL
);</pre>
<p>約束條件（NOT NULL、UNIQUE、CHECK、外鍵）是資料正確性的<b>最後一道防線</b>：即使程式有 bug，資料庫也會拒絕錯誤的資料。ON DELETE CASCADE 讓刪除使用者時，一併刪除他的待辦事項。</p>` },
    { id: 'crud', title: 'CRUD 與 JOIN', html: `
<pre class="sql" data-db="api">-- 讀取：某位使用者未完成的待辦事項，依到期日排序（沒有到期日的排最後）
SELECT id, title, due_date
FROM todos
WHERE user_id = 2 AND done = 0
ORDER BY due_date IS NULL, due_date;</pre>
<pre class="sql" data-db="api">-- JOIN：每位使用者的待辦事項數量與完成率
SELECT u.name,
       COUNT(t.id) AS total,
       SUM(t.done) AS done,
       ROUND(100.0 * SUM(t.done) / COUNT(t.id), 1) AS done_pct
FROM users u
LEFT JOIN todos t ON t.user_id = u.id
GROUP BY u.id
ORDER BY total DESC;</pre>
<pre class="sql" data-db="api">-- 新增、修改、刪除（每次執行都從原始資料重新開始）
INSERT INTO todos (user_id, title, created_at) VALUES (3, '準備上線檢查清單', '2026-10-30 10:00:00');
UPDATE todos SET done = 1 WHERE id = 5 AND user_id = 2;
DELETE FROM todos WHERE id = 7 AND user_id = 2;
SELECT id, user_id, title, done FROM todos WHERE user_id IN (2, 3) ORDER BY id;</pre>
<p>注意 UPDATE 與 DELETE 都加上 <b>AND user_id = 目前登入的使用者</b>：這樣即使有人猜到別人待辦事項的 id，也無法修改或刪除。忘記這個條件是 API 最常見的安全漏洞之一（第 9 章的「失效的存取控制」）。</p>` },
    { id: 'index', title: '索引與交易', html: `
<p><b>索引</b>讓資料庫不用逐筆掃描就能找到資料，就像書的目錄。經常出現在 WHERE、JOIN、ORDER BY 的欄位適合建立索引：</p>
<pre class="sql" data-db="api">EXPLAIN QUERY PLAN SELECT * FROM todos WHERE user_id = 2;
CREATE INDEX idx_todos_user ON todos(user_id, done);
EXPLAIN QUERY PLAN SELECT * FROM todos WHERE user_id = 2;</pre>
<p>建立索引前是 SCAN（掃描整張表），之後變成 SEARCH ... USING INDEX。索引會讓寫入變慢一點、占用空間，所以只為常用的查詢建立。</p>
<p><b>交易</b>（Transaction）讓多個操作「全部成功或全部失敗」，例如轉帳時扣款與入帳必須同時完成：</p>
<pre class="sql" data-db="api">BEGIN;
INSERT INTO users (email, name, password_hash, created_at) VALUES ('eve@example.com', '吳小芳', 'scrypt$demo$5', '2026-10-30 12:00:00');
INSERT INTO todos (user_id, title, created_at) VALUES (last_insert_rowid(), '歡迎！完成第一個待辦事項', '2026-10-30 12:00:00');
COMMIT;
SELECT u.name, t.title FROM users u JOIN todos t ON t.user_id = u.id WHERE u.email = 'eve@example.com';</pre>` },
    { id: 'node', title: '在 Node.js 中連線', html: `
<pre class="out">$ npm install better-sqlite3

// src/db.js
import Database from 'better-sqlite3';
export const db = new Database(process.env.DB_FILE ?? 'app.db');
db.pragma('journal_mode = WAL');          // 讀寫可以同時進行，效能較好
db.pragma('foreign_keys = ON');           // SQLite 預設不檢查外鍵，要手動開啟

// 參數化查詢：用 ? 佔位，值另外傳入
const findTodo = db.prepare('SELECT * FROM todos WHERE id = ? AND user_id = ?');
const todo = findTodo.get(7, userId);              // 一筆，找不到是 undefined
const list = db.prepare('SELECT * FROM todos WHERE user_id = ?').all(userId);   // 多筆陣列
const info = db.prepare('INSERT INTO todos (user_id, title, created_at) VALUES (?, ?, ?)')
  .run(userId, title, new Date().toISOString());
console.log(info.lastInsertRowid, info.changes);   // 新增的 id、影響的筆數

// 交易
const createUserWithTodo = db.transaction((user) =&gt; { /* 多個 run … */ });

// PostgreSQL（pg 套件）的寫法類似，佔位符號是 $1、$2，而且是非同步的
const { rows } = await pool.query('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [7, userId]);</pre>
<div class="box warn"><b class="t">永遠使用參數化查詢</b>不要用字串拼接把使用者輸入放進 SQL（例如 'WHERE email = ' + email），這會造成 SQL 注入攻擊。第 9 章會實際示範攻擊如何發生。</div>
<p>better-sqlite3 是同步 API，但 SQLite 查詢通常只要零點幾毫秒，對中小型服務沒有問題。也可以使用 Prisma、Drizzle 等 ORM，用 JavaScript 物件操作資料庫並自動產生型別。</p>` }
  ],
  keypoints: [
    '大多數 API 使用關聯式資料庫；SQLite 適合學習與開發，PostgreSQL 常用於正式環境。',
    '主鍵、UNIQUE、NOT NULL、CHECK、外鍵是資料正確性的最後一道防線。',
    'UPDATE、DELETE 要加上 user_id 條件，避免使用者修改別人的資料。',
    '常用於 WHERE、JOIN、ORDER BY 的欄位建立索引；EXPLAIN QUERY PLAN 檢查是否使用索引。',
    '交易讓多個操作全部成功或全部失敗。',
    'better-sqlite3 用 prepare 與 ? 參數化查詢；get 一筆、all 多筆、run 寫入。'
  ]
},
{
  id: 'c07', subject: 2, minutes: 50,
  title: 'CRUD API 實作',
  summary: '專案結構與分層、把路由、驗證、資料存取串成完整的待辦事項 API、分頁與篩選的實作、PATCH 的部分更新、資料庫欄位與 JSON 的轉換，以及用 REST 用戶端測試。',
  sections: [
    { id: 'structure', title: '專案結構與分層', html: `
<pre class="out">todo-api/
├── package.json
├── .env                      # 環境變數（不提交到 Git）
├── src/
│   ├── server.js             # 啟動伺服器
│   ├── app.js                # 建立 Express app、掛上中介軟體與路由
│   ├── db.js                 # 資料庫連線與資料表建立
│   ├── routes/todos.js       # 路由：解析請求、呼叫服務、回應
│   ├── services/todos.js     # 商業邏輯與資料存取
│   ├── schemas.js            # zod 驗證規則
│   └── middleware/           # validate、requireAuth、errorHandler
└── test/todos.test.js</pre>
<p><b>分層</b>的好處：路由只負責 HTTP（讀取參數、決定狀態碼），服務負責商業邏輯與資料庫。這樣商業邏輯可以單獨測試，日後換資料庫也只需要改服務層。</p>` },
    { id: 'service', title: '服務層：分頁、篩選與部分更新', html: `
<p>下面用陣列模擬資料庫，實作服務層的核心邏輯，可以直接執行：</p>
<pre class="js">const rows = Array.from({ length: 23 }, (_, i) =&gt; ({
  id: i + 1, user_id: i % 3 === 0 ? 2 : 1, title: \`任務 \${i + 1}\`, done: i % 4 === 0 ? 1 : 0,
  due_date: i % 5 ? \`2026-11-\${String((i % 28) + 1).padStart(2, '0')}\` : null,
}));
const toJson = r =&gt; ({ id: r.id, title: r.title, done: r.done === 1, dueDate: r.due_date });   // 資料庫欄位 → API 欄位

function listTodos(userId, { page = 1, limit = 5, done } = {}) {
  let list = rows.filter(r =&gt; r.user_id === userId);
  if (done !== undefined) list = list.filter(r =&gt; r.done === (done === 'true' ? 1 : 0));
  const total = list.length;
  const data = list.slice((page - 1) * limit, page * limit).map(toJson);
  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

function updateTodo(userId, id, patch) {        // PATCH：只更新有提供的欄位
  const row = rows.find(r =&gt; r.id === id &amp;&amp; r.user_id === userId);
  if (!row) return null;                        // 找不到或不是自己的 → 路由回 404
  if (patch.title !== undefined) row.title = patch.title;
  if (patch.done !== undefined) row.done = patch.done ? 1 : 0;
  if (patch.dueDate !== undefined) row.due_date = patch.dueDate;
  return toJson(row);
}

const r1 = listTodos(1, { page: 2, limit: 5 });
console.log('第 2 頁：', r1.data.map(t =&gt; t.id).join(', '), JSON.stringify(r1.pagination));
const r2 = listTodos(1, { done: 'false', limit: 100 });
console.log('未完成的數量：', r2.pagination.total);
console.log('更新自己的：', JSON.stringify(updateTodo(1, 2, { done: true })));
console.log('更新別人的：', updateTodo(1, 1, { done: true }));</pre>
<p>id 1 屬於使用者 2，所以使用者 1 更新時回傳 null。這種情況建議回 <b>404</b> 而不是 403：不讓對方知道這筆資料存在。</p>` },
    { id: 'routes', title: '完整的路由', html: `
<pre class="out">// src/services/todos.js（SQL 版本）
import { db } from '../db.js';
const toJson = r =&gt; ({ id: r.id, title: r.title, done: r.done === 1, dueDate: r.due_date, createdAt: r.created_at });

export function listTodos(userId, { page, limit, done }) {
  const where = ['user_id = ?'], params = [userId];
  if (done !== undefined) { where.push('done = ?'); params.push(done === 'true' ? 1 : 0); }
  const sqlWhere = where.join(' AND ');           // 只拼接固定的欄位名稱，值都用 ? 傳入
  const total = db.prepare(\`SELECT COUNT(*) AS n FROM todos WHERE \${sqlWhere}\`).get(...params).n;
  const data = db.prepare(\`SELECT * FROM todos WHERE \${sqlWhere} ORDER BY created_at DESC LIMIT ? OFFSET ?\`)
    .all(...params, limit, (page - 1) * limit).map(toJson);
  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}
export function createTodo(userId, { title, dueDate }) {
  const info = db.prepare('INSERT INTO todos (user_id, title, due_date, created_at) VALUES (?, ?, ?, ?)')
    .run(userId, title, dueDate ?? null, new Date().toISOString());
  return getTodo(userId, info.lastInsertRowid);
}
export function getTodo(userId, id) {
  const row = db.prepare('SELECT * FROM todos WHERE id = ? AND user_id = ?').get(id, userId);
  return row ? toJson(row) : null;
}
export function deleteTodo(userId, id) {
  return db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?').run(id, userId).changes &gt; 0;
}

// src/routes/todos.js
todosRouter.get('/', validate(listQuerySchema, 'query'), (req, res) =&gt; {
  res.json(todos.listTodos(req.user.id, req.valid));
});
todosRouter.post('/', validate(createTodoSchema), (req, res) =&gt; {
  const todo = todos.createTodo(req.user.id, req.valid);
  res.status(201).location(\`/api/todos/\${todo.id}\`).json(todo);
});
todosRouter.get('/:id', validate(idParamSchema, 'params'), (req, res) =&gt; {
  const todo = todos.getTodo(req.user.id, req.valid.id);
  if (!todo) throw new HttpError(404, '找不到待辦事項');      // Express 5 會交給錯誤處理
  res.json(todo);
});
todosRouter.delete('/:id', validate(idParamSchema, 'params'), (req, res) =&gt; {
  if (!todos.deleteTodo(req.user.id, req.valid.id)) throw new HttpError(404, '找不到待辦事項');
  res.sendStatus(204);
});</pre>` },
    { id: 'client', title: '測試你的 API', html: `
<pre class="out"># requests.http（VS Code 的 REST Client 擴充功能可以直接送出）
GET http://localhost:3000/api/todos?page=1&amp;limit=5&amp;done=false
Authorization: Bearer {{token}}

###
POST http://localhost:3000/api/todos
Content-Type: application/json
Authorization: Bearer {{token}}

{ "title": "寫 API 文件", "dueDate": "2026-11-20" }

###
PATCH http://localhost:3000/api/todos/11
Content-Type: application/json
Authorization: Bearer {{token}}

{ "done": true }</pre>
<p>也可以用 curl、Postman、Insomnia，或瀏覽器開發者工具的 Network 面板觀察前端送出的請求。把常用請求存成檔案放進專案，團隊成員也能直接使用。API 穩定後，可以用 <b>OpenAPI</b> 規格撰寫文件，自動產生互動式說明頁面。</p>` }
  ],
  keypoints: [
    '分層：路由處理 HTTP、服務處理商業邏輯與資料存取，方便測試與維護。',
    '資料庫欄位（snake_case、0／1）在服務層轉成 API 欄位（camelCase、布林值）。',
    '分頁：COUNT 取得總數、LIMIT／OFFSET 取得資料，回傳 totalPages。',
    'PATCH 只更新有提供的欄位；PUT 則是整筆取代。',
    '查不到或不屬於自己的資料回 404；新增成功回 201 加 Location；刪除成功回 204。',
    '動態 SQL 只拼接固定的欄位名稱，值一律用參數傳入。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 55,
  title: '使用者註冊與登入',
  summary: '驗證與授權的差別、用加鹽的慢速雜湊儲存密碼、註冊與登入流程、Session 與 Cookie、JWT 的結構與驗證、兩種方式的比較，以及用中介軟體實作登入檢查與角色權限。',
  sections: [
    { id: 'authn', title: '驗證與授權', html: `
<table>
<tr><th></th><th>驗證（Authentication）</th><th>授權（Authorization）</th></tr>
<tr><td>回答</td><td>你是誰？</td><td>你可以做什麼？</td></tr>
<tr><td>例子</td><td>用 Email 與密碼登入</td><td>只有 admin 能刪除使用者；只能改自己的待辦事項</td></tr>
<tr><td>失敗時</td><td>401 Unauthorized</td><td>403 Forbidden（或 404 隱藏資源）</td></tr>
</table>` },
    { id: 'hash', title: '密碼雜湊', html: `
<p><b>絕對不能儲存明文密碼</b>，也不能只用 MD5 或 SHA-256 雜湊：這些演算法太快，攻擊者拿到資料庫後每秒可以嘗試數十億組密碼。要使用<b>加鹽</b>的<b>慢速</b>雜湊：</p>
<ul>
<li><b>鹽</b>（Salt）：每個使用者隨機產生，讓相同的密碼得到不同的雜湊，無法用預先算好的對照表破解。</li>
<li><b>慢速</b>：故意需要大量運算，讓暴力破解的成本變高。Node.js 內建 scrypt；也常用 bcrypt 或 argon2 套件。</li>
</ul>
<pre class="js">// 用瀏覽器的 Web Crypto（PBKDF2）示範加鹽慢速雜湊；Node.js 中建議用 crypto.scrypt
const enc = new TextEncoder();
const toHex = buf =&gt; [...new Uint8Array(buf)].map(b =&gt; b.toString(16).padStart(2, '0')).join('');

async function hashPassword(password, saltHex, iterations = 200000) {
  const salt = saltHex ? Uint8Array.from(saltHex.match(/../g), h =&gt; parseInt(h, 16)) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return \`pbkdf2$\${iterations}$\${toHex(salt)}$\${toHex(bits)}\`;
}
async function verifyPassword(password, stored) {
  const [, iter, salt, hash] = stored.split('$');
  const again = await hashPassword(password, salt, Number(iter));
  return again.split('$')[3] === hash;     // 正式環境要用固定時間比較（crypto.timingSafeEqual）
}

let t = performance.now();
const h1 = await hashPassword('coffee-2026!');
console.log(\`雜湊一次約 \${Math.round(performance.now() - t)} 毫秒\`);
const h2 = await hashPassword('coffee-2026!');
console.log('同一個密碼的兩次雜湊相同嗎？', h1 === h2, '（因為鹽不同）');
console.log('儲存格式：', h1.slice(0, 60) + '…');
console.log('正確密碼：', await verifyPassword('coffee-2026!', h1));
console.log('錯誤密碼：', await verifyPassword('coffee-2025!', h1));</pre>
<pre class="out">// Node.js：用內建的 scrypt（非同步，不會阻塞事件迴圈）
import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
const scryptAsync = promisify(scrypt);

export async function hashPassword(pw) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(pw, salt, 64);
  return \`scrypt$\${salt.toString('hex')}$\${hash.toString('hex')}\`;
}
export async function verifyPassword(pw, stored) {
  const [, saltHex, hashHex] = stored.split('$');
  const hash = await scryptAsync(pw, Buffer.from(saltHex, 'hex'), 64);
  return timingSafeEqual(hash, Buffer.from(hashHex, 'hex'));
}</pre>` },
    { id: 'flow', title: '註冊與登入流程', html: `
<pre class="out">app.post('/api/auth/register', validate(registerSchema), async (req, res) =&gt; {
  const { email, name, password } = req.valid;
  if (db.prepare('SELECT 1 FROM users WHERE email = ?').get(email)) throw new HttpError(409, '這個 Email 已經註冊');
  const hash = await hashPassword(password);
  const info = db.prepare('INSERT INTO users (email, name, password_hash, created_at) VALUES (?, ?, ?, ?)')
    .run(email, name, hash, new Date().toISOString());
  res.status(201).json({ id: info.lastInsertRowid, email, name });   // 不要回傳 password_hash
});

app.post('/api/auth/login', validate(loginSchema), async (req, res) =&gt; {
  const { email, password } = req.valid;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    throw new HttpError(401, 'Email 或密碼錯誤');   // 不要說是哪一個錯，避免被用來查詢帳號是否存在
  }
  // 接著建立 Session 或簽發 JWT（見下兩節）
});</pre>
<ul>
<li>密碼規則：長度至少 8～12 字元比複雜度規則更有效，也可以比對常見外洩密碼清單。</li>
<li>登入 API 要加上<b>速率限制</b>（第 9 章），防止暴力嘗試。</li>
</ul>` },
    { id: 'session', title: 'Session 與 Cookie', html: `
<p><b>Session</b>：登入後伺服器產生一個隨機的 Session ID，把「這個 ID 屬於哪位使用者」存在伺服器（記憶體、Redis 或資料庫），並用 Cookie 交給瀏覽器。之後瀏覽器每次請求都會自動帶上 Cookie。</p>
<pre class="out">res.cookie('sid', sessionId, {
  httpOnly: true,       // JavaScript 讀不到，降低 XSS 偷取的風險
  secure: true,         // 只透過 HTTPS 傳送
  sameSite: 'lax',      // 跨站請求不帶 Cookie，降低 CSRF 風險
  maxAge: 7 * 24 * 60 * 60 * 1000,
});</pre>
<p>Session 的優點是可以隨時在伺服器端<b>讓它失效</b>（登出、改密碼、偵測到異常時）。缺點是伺服器要儲存 Session，多台伺服器時需要共用的儲存（例如 Redis）。</p>` },
    { id: 'jwt', title: 'JWT', html: `
<p><b>JWT</b>（JSON Web Token）把使用者資訊放在 Token 中，並用伺服器的祕密金鑰<b>簽章</b>。伺服器不需要儲存，只要驗證簽章就知道 Token 沒有被竄改。格式是三段 Base64URL，用點分隔：<b>標頭.內容.簽章</b>。</p>
<pre class="js">const enc = new TextEncoder();
const b64url = bytes =&gt; btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
const b64urlJson = obj =&gt; b64url(enc.encode(JSON.stringify(obj)));
const fromB64url = s =&gt; JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), c =&gt; c.charCodeAt(0))));

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}
async function sign(payload, secret) {
  const head = b64urlJson({ alg: 'HS256', typ: 'JWT' }), body = b64urlJson(payload);
  return \`\${head}.\${body}.\${await hmac(secret, head + '.' + body)}\`;
}
async function verify(token, secret, now) {
  const [head, body, sig] = token.split('.');
  if (sig !== await hmac(secret, head + '.' + body)) return '簽章不符（被竄改或金鑰錯誤）';
  const p = fromB64url(body);
  if (p.exp &lt;= now) return 'Token 已過期';
  return p;
}

const SECRET = 'dev-only-secret-change-me';
const now = 1793000000;                                     // 固定時間方便示範（秒）
const token = await sign({ sub: 2, role: 'user', iat: now, exp: now + 3600 }, SECRET);
console.log('Token：', token.slice(0, 50) + '…');
console.log('內容任何人都能解碼：', JSON.stringify(fromB64url(token.split('.')[1])));
console.log('驗證：', JSON.stringify(await verify(token, SECRET, now + 60)));

const [h, , s] = token.split('.');
const forged = \`\${h}.\${b64urlJson({ sub: 2, role: 'admin', iat: now, exp: now + 3600 })}.\${s}\`;
console.log('把 role 改成 admin：', await verify(forged, SECRET, now + 60));
console.log('兩小時後：', await verify(token, SECRET, now + 7200));</pre>
<p>重點：JWT 的內容只是<b>編碼不是加密</b>，任何人都能讀，不能放密碼或機密資料；簽章保證的是<b>沒被竄改</b>。互動練習中的「JWT 解碼器」可以貼上 Token 查看內容與驗證簽章。</p>
<pre class="out">// Node.js：jsonwebtoken 套件
import jwt from 'jsonwebtoken';
const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });   // 失敗會丟出錯誤</pre>
<table>
<tr><th></th><th>Session ＋ Cookie</th><th>JWT</th></tr>
<tr><td>狀態</td><td>伺服器儲存</td><td>伺服器不儲存（無狀態）</td></tr>
<tr><td>立即登出、撤銷</td><td>容易</td><td>困難，通常用短效期 Token 搭配更新 Token</td></tr>
<tr><td>適合</td><td>自家網站的前端</td><td>手機 App、服務之間的呼叫、第三方 API</td></tr>
</table>` },
    { id: 'middleware', title: '登入檢查與角色權限', html: `
<pre class="out">// src/middleware/auth.js
export function requireAuth(req, res, next) {
  const header = req.get('Authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw new HttpError(401, '請先登入');
  try {
    const p = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    req.user = { id: p.sub, role: p.role };
    next();
  } catch {
    throw new HttpError(401, '登入已失效，請重新登入');
  }
}
export const requireRole = (...roles) =&gt; (req, res, next) =&gt; {
  if (!roles.includes(req.user.role)) throw new HttpError(403, '沒有權限');
  next();
};

// 使用
app.use('/api/todos', requireAuth, todosRouter);
app.delete('/api/admin/users/:id', requireAuth, requireRole('admin'), deleteUser);</pre>
<p>前端把 JWT 存在哪裡也很重要：存在 localStorage 容易被 XSS 讀取；存在 HttpOnly Cookie 較安全，但要處理 CSRF 與跨網域設定。自家網站的前後端通常用 Session 或 HttpOnly Cookie 就夠了。</p>` }
  ],
  keypoints: [
    '驗證確認你是誰（失敗 401），授權決定你能做什麼（失敗 403）。',
    '密碼用加鹽的慢速雜湊（scrypt、bcrypt、argon2），不可明文或只用 SHA-256。',
    '登入失敗只說「Email 或密碼錯誤」；註冊重複回 409；回應中不含密碼雜湊。',
    'Session 由伺服器儲存並可隨時撤銷；Cookie 設 HttpOnly、Secure、SameSite。',
    'JWT 是標頭.內容.簽章，內容可被解碼但無法竄改；不要放機密資料，要設定效期。',
    '用 requireAuth 與 requireRole 中介軟體實作登入檢查與角色權限。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 50,
  title: 'API 安全與自動化測試',
  summary: 'OWASP API 常見風險、SQL 注入的原理與防範、失效的存取控制、CORS、安全標頭、速率限制，以及用 node:test 與 supertest 撰寫 API 測試。',
  sections: [
    { id: 'owasp', title: '常見的 API 風險', html: `
<table>
<tr><th>風險</th><th>例子</th><th>防範</th></tr>
<tr><td>失效的物件層級授權</td><td>改網址的 id 就能看到別人的訂單</td><td>每次查詢都加上擁有者條件（第 6、7 章）</td></tr>
<tr><td>失效的驗證</td><td>沒有限制登入嘗試、Token 永不過期</td><td>速率限制、短效期 Token、安全的密碼儲存</td></tr>
<tr><td>注入</td><td>SQL 注入</td><td>參數化查詢</td></tr>
<tr><td>大量指派</td><td>註冊時自己加上 role: "admin"</td><td>只接受白名單欄位（第 5 章）</td></tr>
<tr><td>資源耗用無限制</td><td>limit=1000000、上傳超大檔案</td><td>分頁上限、請求大小限制、速率限制</td></tr>
<tr><td>錯誤的安全設定</td><td>CORS 允許任何網域、錯誤訊息洩漏堆疊</td><td>正確設定 CORS 與錯誤處理、使用 helmet</td></tr>
</table>
<p>這些都整理在 <b>OWASP API Security Top 10</b> 中，是後端工程師必讀的清單。</p>` },
    { id: 'sqli', title: 'SQL 注入', html: `
<p>如果把使用者輸入直接拼接進 SQL，攻擊者可以輸入特殊字元改變 SQL 的意思：</p>
<pre class="js">const unsafeLogin = (email, password) =&gt;
  \`SELECT id, email, role FROM users WHERE email = '\${email}' AND password_hash = '\${password}'\`;

console.log(unsafeLogin('amy@example.com', 'wrong'));
console.log('— 攻擊者在 Email 欄位輸入：');
console.log(unsafeLogin("amy@example.com' --", 'anything'));</pre>
<p>-- 在 SQL 中是註解，後面的密碼檢查整段被忽略了。把上面第二行 SQL 貼到資料庫執行看看：</p>
<pre class="sql" data-db="api">-- 拼接後的 SQL：不需要密碼就查到 amy（admin）
SELECT id, email, role FROM users WHERE email = 'amy@example.com' --' AND password_hash = 'anything';</pre>
<pre class="sql" data-db="api">-- 另一種攻擊：讓條件永遠成立，取得所有使用者
SELECT id, email, role FROM users WHERE email = '' OR '1'='1' AND password_hash = '' OR '1'='1';</pre>
<p>參數化查詢（db.prepare('… WHERE email = ?').get(email)）會把輸入當作<b>純資料</b>，不論內容是什麼都不會改變 SQL 結構。這是唯一可靠的防範方法；過濾特殊字元很容易遺漏。</p>` },
    { id: 'cors', title: 'CORS、安全標頭與速率限制', html: `
<p>瀏覽器的<b>同源政策</b>預設不允許 https://app.example.com 的網頁讀取 https://api.example.com 的回應。<b>CORS</b> 讓 API 明確宣告允許哪些來源：</p>
<pre class="out">$ npm install cors helmet express-rate-limit

import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

app.use(helmet());                                     // 設定各種安全回應標頭
app.use(cors({ origin: ['https://app.example.com'], credentials: true }));   // 不要用 origin: '*' 搭配 Cookie
app.use(express.json({ limit: '100kb' }));             // 限制請求主體大小
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 }));    // 登入相關：15 分鐘 10 次
app.use('/api', rateLimit({ windowMs: 60 * 1000, limit: 100 }));</pre>
<p>CORS 是<b>瀏覽器</b>的保護機制，不能防止 curl 或其他程式直接呼叫 API；真正的存取控制還是要靠驗證與授權。速率限制常用<b>權杖桶</b>演算法：</p>
<pre class="js">function tokenBucket(capacity, refillPerSec) {
  const buckets = new Map();
  return (key, nowMs) =&gt; {
    const b = buckets.get(key) ?? { tokens: capacity, last: nowMs };
    b.tokens = Math.min(capacity, b.tokens + (nowMs - b.last) / 1000 * refillPerSec);
    b.last = nowMs;
    const ok = b.tokens &gt;= 1;
    if (ok) b.tokens -= 1;
    buckets.set(key, b);
    return ok;
  };
}
const allow = tokenBucket(5, 1);           // 最多連續 5 次，之後每秒補 1 次
const log = [];
for (let i = 0; i &lt; 8; i++) log.push(allow('203.0.113.7', i * 100) ? '200' : '429');
console.log('0.1 秒內連續 8 次：', log.join(' '));
console.log('3 秒後再試：', allow('203.0.113.7', 3700) ? '200' : '429');
console.log('另一個 IP：', allow('198.51.100.2', 800) ? '200' : '429');</pre>` },
    { id: 'test', title: '自動化測試', html: `
<p>每次修改都手動用 curl 測一遍很容易漏掉。用 Node.js 內建的 <b>node:test</b> 搭配 <b>supertest</b>，可以在不啟動伺服器的情況下對 app 送出請求：</p>
<pre class="out">$ npm install -D supertest

// test/todos.test.js
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { app } from '../src/app.js';            // 這就是把 app 和 server 分開的原因

let token;
before(async () =&gt; {
  await request(app).post('/api/auth/register').send({ email: 't@example.com', name: '測試', password: 'long-password-1' });
  const res = await request(app).post('/api/auth/login').send({ email: 't@example.com', password: 'long-password-1' });
  token = res.body.token;
});

test('未登入不能讀取待辦事項', async () =&gt; {
  await request(app).get('/api/todos').expect(401);
});

test('新增後可以讀取', async () =&gt; {
  const created = await request(app).post('/api/todos').set('Authorization', \`Bearer \${token}\`)
    .send({ title: '寫測試' }).expect(201);
  assert.equal(created.body.title, '寫測試');
  const got = await request(app).get(\`/api/todos/\${created.body.id}\`).set('Authorization', \`Bearer \${token}\`).expect(200);
  assert.equal(got.body.done, false);
});

test('標題空白回 400', async () =&gt; {
  const res = await request(app).post('/api/todos').set('Authorization', \`Bearer \${token}\`).send({ title: '  ' }).expect(400);
  assert.equal(res.body.errors[0].field, 'title');
});

$ DB_FILE=:memory: node --test       # 測試用記憶體資料庫，每次都是乾淨的</pre>
<p>優先測試<b>最重要與最容易出錯</b>的地方：權限（不能讀別人的資料）、驗證（錯誤輸入回 400）、狀態碼與回應格式。測試可以接上 GitHub Actions，每次推送自動執行（DevOps 課程）。</p>` }
  ],
  keypoints: [
    'OWASP API Security Top 10：授權失效、驗證失效、注入、大量指派、資源耗用、錯誤設定。',
    'SQL 注入來自字串拼接；參數化查詢是唯一可靠的防範。',
    'CORS 是瀏覽器的同源保護；只允許指定來源，不要用 * 搭配 Cookie。',
    'helmet 設定安全標頭；限制請求主體大小；速率限制保護登入與整體 API。',
    '速率限制常用權杖桶：容量決定可連續請求數，補充速度決定長期上限。',
    '用 node:test 與 supertest 測試 app，優先測權限、驗證與狀態碼。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '部署、維運與串接前端',
  summary: '環境變數與設定管理、日誌與請求編號、健康檢查與優雅關機、用 PM2 或 Docker 執行、Nginx 反向代理與 HTTPS，以及讓 React 前端呼叫 API 的完整全端架構。',
  sections: [
    { id: 'config', title: '環境變數與設定', html: `
<p>資料庫位置、JWT 金鑰、允許的前端網域，在開發與正式環境都不同，而且金鑰<b>絕對不能寫在程式碼裡或提交到 Git</b>。使用<b>環境變數</b>：</p>
<pre class="out"># .env（加入 .gitignore；另外提交一份不含真實值的 .env.example）
PORT=3000
DB_FILE=app.db
JWT_SECRET=請改成至少 32 字元的隨機字串
CORS_ORIGIN=http://localhost:5173

$ node --env-file=.env src/server.js     # Node.js 內建讀取 .env 檔</pre>
<pre class="js">// 啟動時集中讀取並檢查設定：缺少必要的設定就立刻失敗，而不是等到執行時才出錯
function loadConfig(env) {
  const errors = [];
  const port = Number(env.PORT ?? 3000);
  if (!Number.isInteger(port) || port &lt;= 0) errors.push('PORT 必須是正整數');
  if (!env.JWT_SECRET) errors.push('缺少 JWT_SECRET');
  else if (env.JWT_SECRET.length &lt; 32) errors.push('JWT_SECRET 至少要 32 個字元');
  if (env.NODE_ENV === 'production' &amp;&amp; !env.CORS_ORIGIN) errors.push('正式環境必須設定 CORS_ORIGIN');
  if (errors.length) return { ok: false, errors };
  return { ok: true, config: { port, jwtSecret: env.JWT_SECRET, corsOrigin: (env.CORS_ORIGIN ?? '').split(',') } };
}
console.log(JSON.stringify(loadConfig({ JWT_SECRET: 'short', NODE_ENV: 'production' })));
console.log(JSON.stringify(loadConfig({ PORT: '8080', JWT_SECRET: 'x'.repeat(40), CORS_ORIGIN: 'https://app.example.com' })));</pre>` },
    { id: 'ops', title: '日誌、健康檢查與優雅關機', html: `
<pre class="out">import { randomUUID } from 'node:crypto';

// 每個請求一個編號，寫進日誌與回應標頭，使用者回報問題時可以快速對照
app.use((req, res, next) =&gt; {
  req.id = randomUUID();
  res.set('X-Request-Id', req.id);
  const t0 = performance.now();
  res.on('finish', () =&gt; console.log(JSON.stringify({
    id: req.id, method: req.method, path: req.path, status: res.statusCode, ms: Math.round(performance.now() - t0),
  })));
  next();
});

// 健康檢查：讓負載平衡器、Docker、Kubernetes 知道服務是否正常
app.get('/health', (req, res) =&gt; {
  db.prepare('SELECT 1').get();
  res.json({ status: 'ok' });
});

// 優雅關機：收到停止訊號時，不再接新請求，處理完進行中的請求再結束
const server = app.listen(config.port);
process.on('SIGTERM', () =&gt; {
  server.close(() =&gt; { db.close(); process.exit(0); });
  setTimeout(() =&gt; process.exit(1), 10_000).unref();    // 最多等 10 秒
});</pre>
<p>日誌輸出成 <b>JSON</b> 格式，方便用工具搜尋與統計；正式環境常用 pino 等日誌套件。不要把密碼、Token、完整信用卡號寫進日誌。</p>` },
    { id: 'deploy', title: '執行與部署', html: `
<table>
<tr><th>方式</th><th>說明</th></tr>
<tr><td>PM2</td><td>在 Linux 主機上管理 Node.js 程序：當機自動重啟、開機自動啟動、查看日誌</td></tr>
<tr><td>Docker</td><td>把程式與執行環境打包成映像檔，在任何地方都能用相同方式執行（DevOps 課程）</td></tr>
<tr><td>平台服務</td><td>Render、Railway、Fly.io、雲端的容器服務：連接 GitHub 自動部署</td></tr>
</table>
<pre class="out"># PM2
$ npm install -g pm2
$ pm2 start src/server.js --name todo-api --node-args="--env-file=.env"
$ pm2 logs todo-api
$ pm2 save &amp;&amp; pm2 startup

# Dockerfile
FROM node:24-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
ENV NODE_ENV=production
USER node
EXPOSE 3000
CMD ["node", "src/server.js"]

# Nginx 反向代理：對外提供 HTTPS，轉給本機的 3000 連接埠
server {
  listen 443 ssl;
  server_name api.example.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}</pre>
<p>Node.js 程式只監聽本機（127.0.0.1），由 Nginx 處理 HTTPS 憑證（例如 Let's Encrypt）、壓縮與靜態檔案。放在反向代理後面時，要設定 app.set('trust proxy', 1)，Express 才會從 X-Forwarded-For 取得真正的使用者 IP（速率限制需要）。</p>` },
    { id: 'fullstack', title: '串接前端：完整的全端架構', html: `
<pre class="out">瀏覽器（React，https://app.example.com）
   │ fetch('https://api.example.com/api/todos', { credentials: 'include' })
   ▼
Nginx（HTTPS）→ Node.js + Express（驗證、驗證輸入、商業邏輯）→ 資料庫

// React 中呼叫 API
async function loadTodos(page = 1) {
  const res = await fetch(\`\${import.meta.env.VITE_API_URL}/api/todos?page=\${page}\`, {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  if (res.status === 401) return redirectToLogin();
  if (!res.ok) throw new Error((await res.json()).title);
  return res.json();
}

// 開發時用 Vite 的 proxy，讓前端和 API 看起來是同一個來源，不需要處理 CORS
// vite.config.js
export default { server: { proxy: { '/api': 'http://localhost:3000' } } };</pre>
<div class="box tip"><b class="t">上線檢查清單</b>環境變數與金鑰已設定且不在 Git 中；HTTPS；CORS 只允許正式網域；登入有速率限制；錯誤回應不含堆疊；資料庫有備份；健康檢查與日誌正常；npm audit 沒有嚴重漏洞；測試全部通過。</div>` }
  ],
  keypoints: [
    '設定與金鑰放在環境變數，.env 不提交；啟動時集中檢查設定，缺少就立刻失敗。',
    '每個請求加上請求編號並輸出 JSON 日誌；日誌不可包含密碼與 Token。',
    '/health 健康檢查讓負載平衡器與容器平台判斷服務狀態。',
    '收到 SIGTERM 時優雅關機：停止接新請求、處理完進行中的請求再結束。',
    '用 PM2、Docker 或平台服務執行；Nginx 反向代理處理 HTTPS，並設定 trust proxy。',
    '前端用 fetch 呼叫 API；開發時用 Vite proxy，正式環境設定 CORS。'
  ]
}
);
