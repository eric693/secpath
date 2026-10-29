/* TypeScript 進階篇：泛型、型別操作、非同步、工具鏈與實戰
   <pre class="ts"> 為可在網頁上型別檢查並執行的 TypeScript；<pre class="out"> 為一般程式碼、指令或設定檔
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 55,
  title: '泛型',
  summary: '為什麼需要泛型、泛型函式與型別參數推論、泛型介面與型別別名、用 extends 加上約束、keyof 約束、預設型別參數，以及泛型類別與實務範例。',
  sections: [
    { id: 'why', title: '為什麼需要泛型', html: `
<p>想寫一個「回傳陣列第一個元素」的函式。用 any 會失去型別資訊，為每種型別各寫一個又太麻煩。<b>泛型</b>讓型別也能當作參數：</p>
<pre class="ts">function firstAny(arr: any[]): any {
  return arr[0];
}
const a = firstAny([1, 2, 3]);          // a 是 any：型別資訊遺失了

function first&lt;T&gt;(arr: T[]): T | undefined {
  return arr[0];
}
const n = first([1, 2, 3]);             // T 推論為 number，n 是 number | undefined
const s = first(['蘋果', '香蕉']);       // T 推論為 string
const u = first&lt;boolean&gt;([]);           // 也可以明確指定 T

console.log(a, n, s?.toUpperCase(), u);</pre>
<p><code>&lt;T&gt;</code> 是<b>型別參數</b>，呼叫時通常由傳入的值自動推論。泛型讓函式「適用於多種型別，同時保留型別之間的關係」：輸入是 T 的陣列，輸出就是 T。</p>` },
    { id: 'generic', title: '泛型介面與型別', html: `
<pre class="ts">// API 回應的通用格式
interface ApiResponse&lt;T&gt; {
  ok: boolean;
  data: T;
  error?: string;
}

interface User { id: number; name: string }
interface Product { sku: string; price: number }

const userRes: ApiResponse&lt;User&gt; = { ok: true, data: { id: 1, name: '小明' } };
const listRes: ApiResponse&lt;Product[]&gt; = { ok: true, data: [{ sku: 'A-1', price: 590 }] };

// 多個型別參數
type Pair&lt;K, V&gt; = { key: K; value: V };
const p: Pair&lt;string, number&gt; = { key: '庫存', value: 12 };

function mapValues&lt;T, R&gt;(arr: T[], fn: (x: T) =&gt; R): R[] {
  return arr.map(fn);
}
const lengths = mapValues(['a', 'bbb', 'cc'], s =&gt; s.length);   // R 推論為 number

console.log(userRes.data.name, listRes.data[0].price, p, lengths);</pre>` },
    { id: 'constraint', title: '約束：extends 與 keyof', html: `
<pre class="ts">// 約束：T 至少要有 length 屬性
function longest&lt;T extends { length: number }&gt;(a: T, b: T): T {
  return a.length &gt;= b.length ? a : b;
}
console.log(longest('apple', 'kiwi'), longest([1, 2], [1, 2, 3]));

// keyof：K 必須是 T 的屬性名稱之一
function getProp&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {
  return obj[key];
}
const book = { title: 'TypeScript 入門', pages: 320 };
const t = getProp(book, 'title');      // string
const pg = getProp(book, 'pages');     // number
console.log(t, pg);

// 依 id 尋找：T 必須有 id
function findById&lt;T extends { id: number }&gt;(items: T[], id: number): T | undefined {
  return items.find(x =&gt; x.id === id);
}
console.log(findById([{ id: 1, name: '小明' }, { id: 2, name: '小華' }], 2)?.name);</pre>
<p>試著呼叫 <code>longest(10, 20)</code> 或 <code>getProp(book, 'author')</code>，看看約束如何阻止錯誤的使用方式。</p>` },
    { id: 'class', title: '泛型類別與預設型別參數', html: `
<pre class="ts">class TypedStore&lt;T&gt; {
  private items = new Map&lt;string, T&gt;();

  set(key: string, value: T): void { this.items.set(key, value); }
  get(key: string): T | undefined { return this.items.get(key); }
  get size(): number { return this.items.size; }
}

const cart = new TypedStore&lt;{ name: string; qty: number }&gt;();
cart.set('A-1', { name: '滑鼠', qty: 2 });
console.log(cart.get('A-1')?.qty, cart.size);

// 預設型別參數
interface Paged&lt;T = string&gt; {
  items: T[];
  page: number;
}
const tags: Paged = { items: ['新品', '熱賣'], page: 1 };          // T 預設為 string
const nums: Paged&lt;number&gt; = { items: [1, 2, 3], page: 2 };
console.log(tags.items.join('、'), nums.items.length);</pre>
<div class="box tip"><b class="t">泛型命名</b>單一型別參數慣用 <code>T</code>；鍵與值用 <code>K</code>、<code>V</code>；回傳型別用 <code>R</code>。意義複雜時可以用完整名稱，例如 <code>TItem</code>、<code>TResponse</code>。</div>` }
  ],
  keypoints: [
    '泛型讓型別成為參數：function first<T>(arr: T[]): T，保留輸入與輸出之間的型別關係。',
    '呼叫泛型函式時型別參數通常會自動推論，也可以明確寫成 first<boolean>(…)。',
    '泛型介面與型別別名常用於 API 回應、分頁等通用結構，例如 ApiResponse<User>。',
    '<T extends { length: number }> 約束 T 至少要有的屬性。',
    '<K extends keyof T> 限制 K 是 T 的屬性名稱，T[K] 取得該屬性的型別。',
    '泛型類別讓資料結構保有型別；<T = string> 設定預設型別參數。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 55,
  title: '工具型別與型別操作',
  summary: '內建工具型別 Partial、Required、Readonly、Pick、Omit、Record、Exclude、Extract、NonNullable、ReturnType、Parameters，以及 keyof、typeof、索引存取型別、映射型別、條件型別與樣板字面值型別。',
  sections: [
    { id: 'utility', title: '常用工具型別', html: `
<pre class="ts">interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

type UserUpdate = Partial&lt;User&gt;;                 // 全部變成可選：適合「更新部分欄位」
type PublicUser = Omit&lt;User, 'email' | 'phone'&gt;; // 移除敏感欄位
type UserPreview = Pick&lt;User, 'id' | 'name'&gt;;    // 只挑出需要的欄位
type FrozenUser = Readonly&lt;User&gt;;                // 全部唯讀
type FullUser = Required&lt;User&gt;;                  // 全部必填（phone 也變必填）

function updateUser(user: User, changes: UserUpdate): User {
  return { ...user, ...changes };
}

const u: User = { id: 1, name: '小明', email: 'ming@example.com' };
const updated = updateUser(u, { name: '王小明' });
const pub: PublicUser = { id: updated.id, name: updated.name };
const preview: UserPreview = { id: 1, name: '小明' };
const frozen: FrozenUser = u;
const full: FullUser = { ...u, phone: '0912-345-678' };

console.log(updated.name, pub, preview.name, frozen.id, full.phone);</pre>
<p>互動練習中的「工具型別實驗室」可以選擇工具型別與欄位，看產生出來的型別長什麼樣子。</p>` },
    { id: 'union-util', title: '處理聯合型別與函式的工具型別', html: `
<pre class="ts">type Status = 'draft' | 'published' | 'archived' | 'deleted';

type Visible = Exclude&lt;Status, 'deleted'&gt;;            // 'draft' | 'published' | 'archived'
type Final = Extract&lt;Status, 'archived' | 'deleted'&gt;; // 'archived' | 'deleted'
type MaybeName = string | null | undefined;
type Name = NonNullable&lt;MaybeName&gt;;                   // string

function createOrder(customer: string, amount: number) {
  return { id: Date.now(), customer, amount, status: 'new' as const };
}
type Order = ReturnType&lt;typeof createOrder&gt;;          // 從函式取得回傳型別
type OrderArgs = Parameters&lt;typeof createOrder&gt;;      // [customer: string, amount: number]

const v: Visible = 'published';
const f: Final = 'archived';
const nm: Name = '小明';
const args: OrderArgs = ['王先生', 1200];
const order: Order = createOrder(...args);
console.log(v, f, nm, order.customer, order.amount, order.status);</pre>` },
    { id: 'keyof', title: 'keyof、typeof 與索引存取型別', html: `
<pre class="ts">const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};

type Config = typeof config;          // 從值取得型別：{ apiUrl: string; timeout: number; retries: number }
type ConfigKey = keyof Config;        // 'apiUrl' | 'timeout' | 'retries'
type Timeout = Config['timeout'];     // 索引存取型別：number

function getSetting(key: ConfigKey) {
  return config[key];
}

const ROLES = ['admin', 'editor', 'viewer'] as const;
type Role = typeof ROLES[number];     // 'admin' | 'editor' | 'viewer'

const t: Timeout = 3000;
const r: Role = 'editor';
console.log(getSetting('apiUrl'), t, r, ROLES.length);</pre>` },
    { id: 'mapped', title: '映射型別、條件型別與樣板字面值型別', html: `
<pre class="ts">// 映射型別：把每個屬性轉換成新的型別（Partial、Readonly 就是這樣做出來的）
type Flags&lt;T&gt; = { [K in keyof T]: boolean };
type Getters&lt;T&gt; = { [K in keyof T &amp; string as \`get\${Capitalize&lt;K&gt;}\`]: () =&gt; T[K] };

interface Settings { darkMode: string; fontSize: number }
const changed: Flags&lt;Settings&gt; = { darkMode: true, fontSize: false };
const getters: Getters&lt;Settings&gt; = { getDarkMode: () =&gt; 'auto', getFontSize: () =&gt; 16 };

// 條件型別：依條件選擇型別
type IsArray&lt;T&gt; = T extends unknown[] ? '陣列' : '不是陣列';
const x: IsArray&lt;number[]&gt; = '陣列';
const y: IsArray&lt;string&gt; = '不是陣列';

// 樣板字面值型別
type Size = 'sm' | 'md' | 'lg';
type Color = 'red' | 'blue';
type ClassName = \`btn-\${Size}-\${Color}\`;        // 6 種組合
const cls: ClassName = 'btn-md-blue';

console.log(changed, getters.getFontSize(), x, y, cls);</pre>
<div class="box memo"><b class="t">型別操作要適可而止</b>這些進階語法在撰寫函式庫時很有用；一般應用程式中，熟練工具型別、keyof 與 typeof 就足以應付大部分情況。過度複雜的型別會讓同事難以閱讀與維護。</div>` }
  ],
  keypoints: [
    'Partial 全部可選、Required 全部必填、Readonly 全部唯讀、Pick 挑選、Omit 移除欄位。',
    'Record<K, V> 建立字典；Exclude、Extract 篩選聯合型別；NonNullable 移除 null 與 undefined。',
    'ReturnType<typeof fn> 與 Parameters<typeof fn> 從函式取得回傳型別與參數型別。',
    'typeof 從值取得型別、keyof 取得屬性名稱的聯合、T[\'key\'] 取得屬性型別；typeof arr[number] 取得元素型別。',
    '映射型別 { [K in keyof T]: … } 轉換每個屬性；條件型別 T extends U ? X : Y 依條件選型別。',
    '樣板字面值型別可以組合字串型別，例如 `btn-${Size}`。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 50,
  title: '非同步與錯誤處理',
  summary: 'Promise 與 async 函式的型別、Promise.all 的型別推論、API 回應的型別與執行時驗證、catch 中的 unknown 錯誤、自訂錯誤類別，以及用 Result 型別表示成功或失敗。',
  sections: [
    { id: 'async', title: 'Promise 與 async 函式', html: `
<pre class="ts">interface User { id: number; name: string }

// 模擬 API：實際專案中會是 fetch
function fakeFetchUser(id: number): Promise&lt;User&gt; {
  return new Promise(resolve =&gt; setTimeout(() =&gt; resolve({ id, name: ['小明', '小華', '小美'][id - 1] ?? '訪客' }), 100));
}

// async 函式的回傳型別一定是 Promise&lt;…&gt;
async function getUserName(id: number): Promise&lt;string&gt; {
  const user = await fakeFetchUser(id);     // user 是 User
  return user.name;
}

async function main() {
  console.log(await getUserName(1));
  // Promise.all 會推論出元組型別
  const [a, b] = await Promise.all([fakeFetchUser(2), getUserName(3)]);
  console.log(a.name, b);
  type Name = Awaited&lt;ReturnType&lt;typeof getUserName&gt;&gt;;   // string
  const n: Name = '測試';
  console.log(n);
}
main();</pre>` },
    { id: 'fetch', title: 'API 回應：型別不等於驗證', html: `
<p><code>response.json()</code> 回傳的是 <code>Promise&lt;any&gt;</code>。寫 <code>as User</code> 只是告訴編譯器「相信我」，<b>並沒有真的檢查資料</b>。後端改了欄位、回傳錯誤格式時，程式會在別的地方莫名其妙地壞掉：</p>
<pre class="ts">interface Product { sku: string; price: number }

// 執行時驗證：確認資料真的符合型別
function isProduct(x: unknown): x is Product {
  return typeof x === 'object' &amp;&amp; x !== null &amp;&amp;
    typeof (x as Product).sku === 'string' &amp;&amp; typeof (x as Product).price === 'number';
}

function parseProducts(json: string): Product[] {
  const data: unknown = JSON.parse(json);
  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error('API 回應格式不正確');
  }
  return data;
}

console.log(parseProducts('[{"sku":"A-1","price":590}]'));
try {
  parseProducts('[{"sku":"A-1","price":"590"}]');      // 價格是字串
} catch (e) {
  console.log(e instanceof Error ? e.message : e);
}</pre>
<p>實務上常用 <b>Zod</b> 等驗證函式庫，一份 schema 同時產生型別與執行時驗證：</p>
<pre class="out">import { z } from 'zod';

const ProductSchema = z.object({ sku: z.string(), price: z.number().positive() });
type Product = z.infer&lt;typeof ProductSchema&gt;;      // 從 schema 推導型別

const res = await fetch('/api/products/A-1');
const product = ProductSchema.parse(await res.json());   // 格式不符會拋出清楚的錯誤</pre>` },
    { id: 'errors', title: 'catch 中的 unknown 與自訂錯誤', html: `
<p>JavaScript 可以 throw 任何東西（字串、數字、物件），所以 strict 模式下 catch 的參數是 <code>unknown</code>，要先檢查才能使用：</p>
<pre class="ts">class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}

function request(path: string): string {
  if (path === '/missing') throw new HttpError(404, '找不到資源');
  if (path === '/weird') throw '這是一個字串錯誤';
  return '成功：' + path;
}

for (const path of ['/ok', '/missing', '/weird']) {
  try {
    console.log(request(path));
  } catch (e) {
    if (e instanceof HttpError) console.log(\`HTTP \${e.status}：\${e.message}\`);
    else if (e instanceof Error) console.log('錯誤：' + e.message);
    else console.log('未知錯誤：' + String(e));
  }
}</pre>` },
    { id: 'result', title: 'Result 型別', html: `
<p>另一種做法是不拋出錯誤，而是回傳「成功或失敗」的可辨識聯合。呼叫者一定要處理兩種情況，錯誤不會被忽略：</p>
<pre class="ts">type Result&lt;T, E = string&gt; =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseAge(input: string): Result&lt;number&gt; {
  const n = Number(input);
  if (!Number.isInteger(n)) return { ok: false, error: \`「\${input}」不是整數\` };
  if (n &lt; 0 || n &gt; 150) return { ok: false, error: '年齡超出範圍' };
  return { ok: true, value: n };
}

for (const s of ['25', 'abc', '200']) {
  const r = parseAge(s);
  if (r.ok) console.log('年齡', r.value);
  else console.log('錯誤', r.error);
}</pre>` }
  ],
  keypoints: [
    'async 函式回傳 Promise<T>；await 會取出 T；Awaited<T> 取得 Promise 解開後的型別。',
    'Promise.all 會推論出各元素型別的元組。',
    'response.json() 是 any，as 斷言不會驗證資料；外部資料要在執行時驗證（型別守衛或 Zod）。',
    'Zod 的 schema 可同時產生型別（z.infer）與執行時驗證（parse）。',
    'strict 模式下 catch 的錯誤是 unknown，要用 instanceof Error 等方式檢查；自訂錯誤類別可攜帶額外資訊。',
    'Result 型別（ok: true／false 的可辨識聯合）讓呼叫者必須處理成功與失敗。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '模組、tsconfig 與工具鏈',
  summary: 'import 與 export、import type、型別宣告檔 .d.ts 與 @types 套件、為沒有型別的套件宣告模組、tsconfig 的重要選項、路徑別名，以及 ESLint 與建置流程。',
  sections: [
    { id: 'module', title: '模組與 import type', html: `
<pre class="out">// src/types.ts
export interface User { id: number; name: string }
export type Role = 'admin' | 'user';

// src/utils/format.ts
export function formatMoney(n: number): string { return 'NT$ ' + n.toLocaleString(); }
export default function slugify(s: string): string { return s.toLowerCase().replace(/\\s+/g, '-'); }

// src/app.ts
import slugify, { formatMoney } from './utils/format';
import type { User, Role } from './types';     // 只匯入型別：編譯後整行會被移除

const u: User = { id: 1, name: '小明' };</pre>
<p><code>import type</code> 明確表示只匯入型別，打包工具可以安全地移除它，也能避免循環相依的問題。</p>` },
    { id: 'dts', title: '型別宣告檔與 @types', html: `
<p>用 JavaScript 寫的套件沒有型別資訊，需要<b>型別宣告檔（.d.ts）</b>：</p>
<table>
<tr><th>情況</th><th>做法</th></tr>
<tr><td>套件本身附有型別（例如 axios、zod、date-fns）</td><td>直接安裝即可</td></tr>
<tr><td>社群提供的型別（例如 express、lodash）</td><td><code>npm install -D @types/express</code></td></tr>
<tr><td>Node.js 內建模組（fs、path）</td><td><code>npm install -D @types/node</code></td></tr>
<tr><td>完全沒有型別的套件</td><td>自己寫宣告檔，或暫時宣告為 any</td></tr>
</table>
<pre class="out">// src/types/legacy-chart.d.ts：為沒有型別的套件撰寫宣告
declare module 'legacy-chart' {
  export function draw(el: HTMLElement, data: number[]): void;
}

// 擴充全域型別，例如 window 上的自訂屬性
declare global {
  interface Window { APP_VERSION: string }
}
export {};</pre>` },
    { id: 'tsconfig', title: 'tsconfig 重要選項', html: `
<table>
<tr><th>選項</th><th>說明</th></tr>
<tr><td><code>strict</code></td><td>一次開啟所有嚴格檢查（noImplicitAny、strictNullChecks 等），新專案一定要開</td></tr>
<tr><td><code>target</code></td><td>輸出的 JavaScript 版本，例如 ES2022</td></tr>
<tr><td><code>module</code>、<code>moduleResolution</code></td><td>模組格式與解析方式；用 Vite 等打包工具時常用 ESNext 與 bundler，Node.js 專案用 NodeNext</td></tr>
<tr><td><code>noUncheckedIndexedAccess</code></td><td>陣列與索引簽章的存取結果加上 undefined，避免越界存取</td></tr>
<tr><td><code>noEmit</code></td><td>只檢查不輸出，由 Vite、esbuild 等工具負責轉譯</td></tr>
<tr><td><code>paths</code></td><td>路徑別名，例如 <code>"@/*": ["./src/*"]</code>，可寫成 <code>import x from '@/utils/x'</code></td></tr>
<tr><td><code>lib</code></td><td>可使用的內建 API 型別，例如 ES2022、DOM</td></tr>
<tr><td><code>skipLibCheck</code></td><td>不檢查套件的 .d.ts，加快速度</td></tr>
</table>
<pre class="ts">// 示範 noUncheckedIndexedAccess 會擋下的問題（本頁未開啟此選項，所以不會報錯）
const list: string[] = ['a', 'b'];
const third = list[2];          // 型別是 string，實際上是 undefined
console.log(third === undefined, typeof third);</pre>` },
    { id: 'tools', title: 'ESLint 與建置流程', html: `
<pre class="out"># 程式碼檢查：typescript-eslint
npm install -D eslint typescript-eslint

# package.json 常見的指令
"scripts": {
  "dev": "vite",
  "typecheck": "tsc --noEmit",
  "lint": "eslint .",
  "build": "tsc --noEmit &amp;&amp; vite build"
}</pre>
<p>常見的分工：<b>Vite、esbuild、SWC</b> 只負責快速移除型別與打包，<b>tsc --noEmit</b> 負責型別檢查（在編輯器即時進行，並在 CI 與建置前再執行一次），<b>typescript-eslint</b> 檢查程式碼風格與潛在問題（例如未處理的 Promise）。</p>` }
  ],
  keypoints: [
    'export／import 組織模組；import type 只匯入型別，編譯後會被移除。',
    '沒有型別的套件用 @types/套件名稱；Node.js 內建模組需要 @types/node。',
    '可以用 declare module 為沒有型別的套件撰寫宣告檔，用 declare global 擴充全域型別。',
    'tsconfig 重要選項：strict、target、module／moduleResolution、noUncheckedIndexedAccess、paths。',
    'noUncheckedIndexedAccess 讓陣列索引存取的結果包含 undefined，避免越界。',
    'Vite／esbuild 負責轉譯、tsc --noEmit 負責型別檢查、typescript-eslint 負責程式碼檢查。'
  ]
},
{
  id: 'c11', subject: 2, minutes: 50,
  title: '實戰：React、Node.js 與遷移',
  summary: 'React 元件的 props、state、事件與 ref 型別、Node.js 與 Express 的型別、前後端共用型別、把 JavaScript 專案逐步遷移到 TypeScript，以及常見錯誤與面試問題。',
  sections: [
    { id: 'react', title: 'TypeScript × React', html: `
<pre class="out">// 建立專案：npm create vite@latest my-app -- --template react-ts
import { useState, useRef, type ReactNode, type ChangeEvent, type FormEvent } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick: () =&gt; void;
  children: ReactNode;               // 可以放任何可渲染的內容
}

function Button({ variant = 'primary', disabled, onClick, children }: ButtonProps) {
  return &lt;button className={variant} disabled={disabled} onClick={onClick}&gt;{children}&lt;/button&gt;;
}

interface Todo { id: number; title: string; done: boolean }

function TodoApp() {
  const [todos, setTodos] = useState&lt;Todo[]&gt;([]);          // 空陣列要指定型別
  const [text, setText] = useState('');                    // 由初始值推論為 string
  const inputRef = useRef&lt;HTMLInputElement&gt;(null);

  const handleChange = (e: ChangeEvent&lt;HTMLInputElement&gt;) =&gt; setText(e.target.value);
  const handleSubmit = (e: FormEvent&lt;HTMLFormElement&gt;) =&gt; {
    e.preventDefault();
    setTodos([...todos, { id: Date.now(), title: text, done: false }]);
    setText('');
    inputRef.current?.focus();
  };
  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input ref={inputRef} value={text} onChange={handleChange} /&gt;
      &lt;Button onClick={() =&gt; setTodos([])}&gt;清空&lt;/Button&gt;
    &lt;/form&gt;
  );
}</pre>
<table>
<tr><th>情況</th><th>型別</th></tr>
<tr><td>可以放任何內容的 children</td><td><code>ReactNode</code></td></tr>
<tr><td>輸入框 onChange</td><td><code>ChangeEvent&lt;HTMLInputElement&gt;</code></td></tr>
<tr><td>表單 onSubmit</td><td><code>FormEvent&lt;HTMLFormElement&gt;</code></td></tr>
<tr><td>按鈕 onClick</td><td><code>MouseEvent&lt;HTMLButtonElement&gt;</code></td></tr>
<tr><td>DOM ref</td><td><code>useRef&lt;HTMLInputElement&gt;(null)</code></td></tr>
<tr><td>空陣列或可能為 null 的 state</td><td><code>useState&lt;Todo[]&gt;([])</code>、<code>useState&lt;User | null&gt;(null)</code></td></tr>
</table>` },
    { id: 'node', title: 'TypeScript × Node.js', html: `
<pre class="out">// npm install express &amp;&amp; npm install -D typescript tsx @types/node @types/express
import express, { type Request, type Response } from 'express';

interface CreateOrderBody { customer: string; amount: number }
interface Order extends CreateOrderBody { id: number; createdAt: string }

const app = express();
app.use(express.json());
const orders: Order[] = [];

app.post('/orders', (req: Request&lt;{}, Order | { error: string }, CreateOrderBody&gt;, res: Response) =&gt; {
  const { customer, amount } = req.body;
  if (typeof customer !== 'string' || typeof amount !== 'number') {
    return res.status(400).json({ error: '格式錯誤' });   // req.body 仍需執行時驗證
  }
  const order: Order = { id: orders.length + 1, customer, amount, createdAt: new Date().toISOString() };
  orders.push(order);
  res.status(201).json(order);
});

app.get('/orders/:id', (req: Request&lt;{ id: string }&gt;, res: Response) =&gt; {
  const order = orders.find(o =&gt; o.id === Number(req.params.id));
  order ? res.json(order) : res.status(404).json({ error: '找不到訂單' });
});

app.listen(3000);</pre>
<p>前後端都用 TypeScript 時，可以把共用的型別（例如 Order）放在共用的套件或資料夾中，前端呼叫 API 與後端回應使用同一份定義，欄位改名時兩邊都會立刻報錯。</p>` },
    { id: 'migrate', title: '從 JavaScript 逐步遷移', html: `
<ol>
<li>安裝 TypeScript，建立 tsconfig.json，開啟 <code>allowJs</code>（允許 .js 與 .ts 共存）。</li>
<li>先開啟 <code>checkJs</code> 或在 .js 檔中用 JSDoc 註解型別，找出明顯的錯誤。</li>
<li>從最底層、最少相依的檔案開始（工具函式、型別定義），逐一把 .js 改名為 .ts 並補上型別。</li>
<li>暫時無法處理的地方可以先用 <code>unknown</code> 或明確標記的 any，並加上 TODO 註解。</li>
<li>全部轉換完成後開啟 <code>strict</code>，逐一修正錯誤；最後在 ESLint 中禁止 any。</li>
</ol>
<pre class="out">// price.js：JavaScript 檔搭配 JSDoc，開啟 checkJs 後 TypeScript 也會檢查
/**
 * @param {number} price 未稅價格
 * @param {number} rate 稅率，例如 0.05
 * @returns {number}
 */
export function withTax(price, rate) {
  return Math.round(price * (1 + rate));
}

withTax('1000', 0.05);   // checkJs 會報錯：字串不能指定給 number</pre>` },
    { id: 'interview', title: '常見錯誤與面試問題', html: `
<table>
<tr><th>問題</th><th>回答重點</th></tr>
<tr><td>TypeScript 會讓程式變慢嗎？</td><td>不會，型別在編譯時移除；只會增加建置步驟</td></tr>
<tr><td>any 與 unknown 的差別？</td><td>any 關閉檢查；unknown 必須先縮小型別才能使用，較安全</td></tr>
<tr><td>interface 與 type 的差別？</td><td>interface 可擴充與合併，適合物件契約；type 可以表示聯合、元組與型別運算</td></tr>
<tr><td>什麼是型別縮小？</td><td>用 typeof、in、instanceof、判別屬性等條件，讓聯合型別在分支中變成更具體的型別</td></tr>
<tr><td>泛型的用途？</td><td>讓函式、類別、型別適用多種型別，同時保留型別之間的關係</td></tr>
<tr><td>as 斷言的風險？</td><td>不會檢查或轉換資料，外部資料要在執行時驗證</td></tr>
<tr><td>never 的用途？</td><td>表示不可能的值，用於窮舉檢查與一定拋錯的函式</td></tr>
<tr><td>Partial 與 Pick 的用途？</td><td>Partial 讓所有屬性可選（更新資料）；Pick 挑選需要的屬性</td></tr>
</table>
<div class="box warn"><b class="t">常見錯誤</b>到處使用 any 或 as 讓錯誤消失；忘了開啟 strict；以為型別能驗證 API 資料；把 <code>@types</code> 套件裝成正式相依（應該用 -D）；型別寫得過度複雜難以維護。</div>` }
  ],
  keypoints: [
    'React：props 用 interface 描述、children 用 ReactNode、空陣列 state 用 useState<Todo[]>([])。',
    '事件型別：ChangeEvent<HTMLInputElement>、FormEvent<HTMLFormElement>；DOM ref 用 useRef<HTMLInputElement>(null)。',
    'Node.js 需要 @types/node；Express 可以用 Request 的型別參數描述 params 與 body，但仍要執行時驗證。',
    '前後端共用型別定義，欄位變更時兩邊都會立刻報錯。',
    '逐步遷移：allowJs → JSDoc 與 checkJs → 由底層檔案改為 .ts → 最後開啟 strict 並禁止 any。',
    '面試重點：型別抹除、any 與 unknown、interface 與 type、型別縮小、泛型、as 的風險、never。'
  ]
}
);
