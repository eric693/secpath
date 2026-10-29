/* TypeScript 基礎篇：型別、物件、函式、聯合型別與類別
   <pre class="ts"> 為可在網頁上型別檢查並執行的 TypeScript；<pre class="out"> 為一般程式碼、指令或設定檔
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 40,
  title: '認識 TypeScript',
  summary: 'TypeScript 解決什麼問題、它和 JavaScript 的關係、編譯與型別抹除、安裝 TypeScript 與 tsconfig、在 Node.js 與 Vite 專案中使用，以及第一個 TypeScript 程式。',
  sections: [
    { id: 'why', title: '為什麼需要 TypeScript', html: `
<p>JavaScript 很自由，但很多錯誤要等到<b>執行時</b>才會發現，甚至要等使用者遇到：</p>
<pre class="js">function totalPrice(items) {
  return items.reduce((sum, item) =&gt; sum + item.price * item.qty, 0);
}
console.log(totalPrice([{ price: 100, qty: 2 }]));
console.log(totalPrice([{ price: '100', qty: 2 }]));   // 字串 * 數字會自動轉換，看起來沒事
console.log(totalPrice([{ prise: 100, qty: 2 }]));     // 拼錯字：結果是 NaN，沒有任何錯誤訊息</pre>
<p><b>TypeScript</b> 是 JavaScript 加上「型別」。你描述資料的形狀，編譯器在<b>寫程式的當下</b>就指出錯誤。按「執行」看看下面的程式，TypeScript 會擋下兩個錯誤：</p>
<pre class="ts">interface Item {
  price: number;
  qty: number;
}

function totalPrice(items: Item[]): number {
  return items.reduce((sum, item) =&gt; sum + item.price * item.qty, 0);
}

console.log(totalPrice([{ price: 100, qty: 2 }]));
console.log(totalPrice([{ price: '100', qty: 2 }]));
console.log(totalPrice([{ prise: 100, qty: 2 }]));</pre>
<p>把最後兩行刪掉再執行，就會正常輸出 200。除了抓錯，型別也讓編輯器能提供精準的自動完成、跳到定義與安全的重新命名，大型專案與團隊合作時差別非常明顯。</p>` },
    { id: 'compile', title: '編譯與型別抹除', html: `
<p>瀏覽器與 Node.js 執行的是 JavaScript。TypeScript 的流程是：</p>
<pre class="out">app.ts  ──(tsc 型別檢查)──►  有錯誤：列出錯誤
        ──(轉譯：移除型別)──►  app.js  ──►  瀏覽器／Node.js 執行</pre>
<pre class="out">// TypeScript
function greet(name: string): string {
  return 'Hello, ' + name;
}

// 編譯後的 JavaScript：型別全部被移除
function greet(name) {
  return 'Hello, ' + name;
}</pre>
<div class="box exam"><b class="t">型別只在編譯時存在</b>執行時沒有任何型別資訊，也不會檢查型別，所以 TypeScript 不會讓程式變慢，但也<b>無法保證外部資料</b>（API 回應、使用者輸入）一定符合型別。第 9 章會說明如何在執行時驗證資料。</div>` },
    { id: 'setup', title: '安裝與 tsconfig', html: `
<pre class="out">npm install -D typescript     # 安裝到專案
npx tsc --init                # 產生 tsconfig.json
npx tsc                       # 依 tsconfig 檢查並編譯
npx tsc --noEmit              # 只做型別檢查，不輸出檔案
npx tsc --watch               # 存檔時自動重新編譯</pre>
<p>常見的開發方式：</p>
<table>
<tr><th>情境</th><th>做法</th></tr>
<tr><td>前端（React、Vue）</td><td><code>npm create vite@latest my-app -- --template react-ts</code>，Vite 負責轉譯，<code>tsc --noEmit</code> 負責型別檢查</td></tr>
<tr><td>Node.js 腳本</td><td>用 <code>npx tsx app.ts</code> 直接執行；較新版的 Node.js 也能直接執行 .ts 檔（只移除型別、不做檢查）</td></tr>
<tr><td>函式庫</td><td>用 tsc 輸出 .js 與型別宣告檔 .d.ts</td></tr>
</table>
<pre class="out">{
  "compilerOptions": {
    "target": "ES2022",          // 輸出的 JavaScript 版本
    "module": "ESNext",          // 模組格式
    "strict": true,              // 開啟所有嚴格檢查（強烈建議）
    "outDir": "dist",            // 輸出資料夾
    "skipLibCheck": true         // 不檢查套件的 .d.ts，加快速度
  },
  "include": ["src"]
}</pre>
<div class="box tip"><b class="t">本課程的執行環境</b>講義中的 TypeScript 範例會在瀏覽器中用官方編譯器以 <code>strict</code> 模式檢查，<b>有型別錯誤就不會執行</b>，並顯示錯誤代碼與中文說明。第一次執行需要下載編譯器，請稍候幾秒。</div>` },
    { id: 'first', title: '第一個 TypeScript 程式', html: `
<pre class="ts">const courseName: string = 'TypeScript 入門';
const hours: number = 9;
const isOnline: boolean = true;

function describe(name: string, h: number, online: boolean): string {
  return \`\${name}：\${h} 小時，\${online ? '線上' : '實體'}課程\`;
}

console.log(describe(courseName, hours, isOnline));</pre>
<p>試著把 <code>describe(courseName, hours, isOnline)</code> 改成 <code>describe(hours, courseName)</code> 再執行，看看會出現哪些錯誤。</p>` }
  ],
  keypoints: [
    'TypeScript 是 JavaScript 加上型別，在寫程式時就找出錯誤，並提供精準的編輯器提示。',
    'tsc 先檢查型別，再把型別移除輸出 JavaScript；執行時沒有型別資訊（型別抹除）。',
    '型別無法保證外部資料正確，API 回應與使用者輸入要在執行時驗證。',
    'npm install -D typescript、npx tsc --init 建立專案；tsc --noEmit 只做型別檢查。',
    'tsconfig.json 中務必開啟 strict；前端常用 Vite 轉譯、tsc 檢查。',
    'Node.js 腳本可以用 tsx 直接執行 TypeScript。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 50,
  title: '基本型別與型別推論',
  summary: 'string、number、boolean 等原始型別、型別推論、陣列與元組、any 與 unknown、null 與 undefined、void 與 never、字面值型別，以及什麼時候該明確寫出型別。',
  sections: [
    { id: 'basic', title: '原始型別與型別推論', html: `
<pre class="ts">let title: string = 'TypeScript';
let count: number = 42;          // 整數與小數都是 number
let done: boolean = false;
let big: bigint = 100n;

// 型別推論：有初始值時，TypeScript 會自動推論型別，不用自己寫
let city = '台北';               // 推論為 string
let score = 95;                  // 推論為 number
const pi = 3.14;                 // const：推論為字面值型別 3.14

score = 88;                      // OK
console.log(title, count, done, big, city, score, pi);
console.log(typeof city, typeof score);</pre>
<p>試著在最後加一行 <code>score = '滿分';</code> 執行看看。變數一旦被推論為 number，就不能再放字串。</p>
<div class="box tip"><b class="t">什麼時候要自己寫型別</b>有初始值的區域變數，讓 TypeScript 推論即可。需要明確標註的地方：<b>函式參數</b>、函式的公開回傳型別、沒有初始值的變數、空陣列、以及推論結果不是你想要的時候。互動練習中的「型別推論探索」可以看到每個變數被推論成什麼型別。</div>` },
    { id: 'array', title: '陣列與元組', html: `
<pre class="ts">const scores: number[] = [90, 85, 77];
const names: Array&lt;string&gt; = ['小明', '小華'];   // 另一種寫法
const empty: string[] = [];                        // 空陣列要標註，否則會推論成 never[] 或 any[]

scores.push(100);
const avg = scores.reduce((a, b) =&gt; a + b, 0) / scores.length;
console.log(avg);

// 元組（tuple）：固定長度、每個位置型別固定
const point: [number, number] = [25.03, 121.56];
const entry: [string, number] = ['小明', 95];
const [who, s] = entry;
console.log(point[0], who, s);

// 唯讀陣列：不能新增、刪除、修改
const weekdays: readonly string[] = ['一', '二', '三', '四', '五'];
console.log(weekdays.length, empty.length);</pre>
<p>試著加上 <code>weekdays.push('六');</code> 或 <code>entry[1] = '滿分';</code>，看看 TypeScript 的錯誤訊息。</p>` },
    { id: 'any', title: 'any 與 unknown', html: `
<p><code>any</code> 會<b>關閉</b>型別檢查，什麼都能做，錯誤就會溜到執行時。<code>unknown</code> 也能接受任何值，但使用前<b>必須先確認型別</b>：</p>
<pre class="ts">let a: any = 'hello';
console.log(a.toFixed);          // 不會報錯，執行時才得到 undefined（若呼叫就會當掉）

let u: unknown = 'hello';
// console.log(u.toUpperCase()); // 錯誤：'u' is of type 'unknown'
if (typeof u === 'string') {
  console.log(u.toUpperCase());  // 確認是字串後才能使用
}

function parse(json: string): unknown {
  return JSON.parse(json);
}
const data = parse('{"name":"小明"}');
if (typeof data === 'object' &amp;&amp; data !== null &amp;&amp; 'name' in data) {
  console.log(data.name);
}</pre>
<div class="box warn"><b class="t">避免 any</b>每一個 any 都是型別系統的破洞。不確定型別時用 <code>unknown</code>，再用型別檢查縮小範圍。strict 模式下，沒有標註型別的函式參數會被視為隱含 any 而報錯（TS7006）。</div>` },
    { id: 'special', title: 'null、undefined、void 與 never', html: `
<table>
<tr><th>型別</th><th>意義</th><th>例子</th></tr>
<tr><td><code>null</code>／<code>undefined</code></td><td>沒有值。strict 模式下，它們不能指定給其他型別，要用聯合型別寫成 <code>string | null</code></td><td><code>let name: string | null = null;</code></td></tr>
<tr><td><code>void</code></td><td>函式沒有回傳值</td><td><code>function log(msg: string): void { }</code></td></tr>
<tr><td><code>never</code></td><td>不可能發生的值：一定拋出錯誤的函式、永遠不會走到的分支</td><td><code>function fail(msg: string): never { throw new Error(msg); }</code></td></tr>
</table>
<pre class="ts">let nickname: string | null = null;
console.log(nickname ?? '（未設定）');     // ?? 在 null 或 undefined 時使用右邊的值
nickname = '阿明';
console.log(nickname.length);            // 這裡 TypeScript 知道它是 string

function logMessage(msg: string): void {
  console.log('[LOG]', msg);
}
logMessage('完成');

function fail(msg: string): never {
  throw new Error(msg);
}
try { fail('出錯了'); } catch (e) { console.log('捕捉到錯誤'); }</pre>` },
    { id: 'literal', title: '字面值型別', html: `
<p>型別也可以是<b>某個特定的值</b>，搭配聯合型別（|）就能限制只能是幾個選項之一：</p>
<pre class="ts">type Size = 'S' | 'M' | 'L';
type Dice = 1 | 2 | 3 | 4 | 5 | 6;

let size: Size = 'M';
const roll: Dice = 6;

function price(s: Size): number {
  return s === 'S' ? 100 : s === 'M' ? 120 : 140;
}
console.log(size, roll, price(size), price('L'));</pre>
<p>試著寫 <code>price('XL')</code>，TypeScript 會告訴你 'XL' 不在允許的值之中。這比傳入任意字串安全得多，編輯器也會自動列出可用的選項。</p>` }
  ],
  keypoints: [
    '原始型別：string、number（整數與小數）、boolean、bigint；有初始值時 TypeScript 會自動推論。',
    'const 宣告推論為字面值型別；函式參數、空陣列、沒有初始值的變數要明確標註。',
    '陣列寫成 number[] 或 Array<number>；元組 [string, number] 固定長度與各位置型別；readonly 陣列不能修改。',
    'any 關閉檢查；unknown 必須先確認型別才能使用，優先使用 unknown。',
    'strict 模式下 null 要用聯合型別 string | null；void 表示沒有回傳值，never 表示不可能發生。',
    '字面值聯合型別（\'S\' | \'M\' | \'L\'）限制只能是幾個特定值。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 50,
  title: '物件型別、interface 與 type',
  summary: '描述物件的形狀、可選屬性與唯讀屬性、interface 與 type 別名的差別、擴充與交集、索引簽章與 Record、多餘屬性檢查，以及結構型別（鴨子型別）。',
  sections: [
    { id: 'object', title: '描述物件的形狀', html: `
<pre class="ts">interface Product {
  readonly id: number;      // 唯讀：建立後不能修改
  name: string;
  price: number;
  tags?: string[];          // 可選：可以沒有這個屬性
}

const mouse: Product = { id: 1, name: '無線滑鼠', price: 590 };
const keyboard: Product = { id: 2, name: '機械鍵盤', price: 2490, tags: ['熱賣'] };

mouse.price = 490;          // OK
console.log(mouse.name, mouse.price, mouse.tags);
console.log(keyboard.tags?.length ?? 0);   // 可選屬性可能是 undefined，用 ?. 與 ?? 處理</pre>
<p>試著加上 <code>mouse.id = 9;</code>，或建立少了 price 的商品，看看錯誤訊息。</p>` },
    { id: 'interface-type', title: 'interface 與 type 的差別', html: `
<pre class="ts">// interface：描述物件形狀，可以用 extends 擴充
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// type：可以為任何型別取名字，包括聯合型別
type ID = number | string;
type Point = { x: number; y: number };
type Point3D = Point &amp; { z: number };      // 交集：同時擁有兩邊的屬性

const d: Dog = { name: '小黑', breed: '柴犬' };
const p: Point3D = { x: 1, y: 2, z: 3 };
const ids: ID[] = [1, 'A-2'];
console.log(d, p, ids);</pre>
<table>
<tr><th></th><th>interface</th><th>type</th></tr>
<tr><td>描述物件</td><td>可以</td><td>可以</td></tr>
<tr><td>聯合型別、元組、原始型別別名</td><td>不行</td><td>可以</td></tr>
<tr><td>擴充方式</td><td><code>extends</code></td><td><code>&amp;</code> 交集</td></tr>
<tr><td>同名宣告合併</td><td>會自動合併</td><td>重複宣告會報錯</td></tr>
</table>
<p>實務建議：描述物件（特別是公開的 API、類別要實作的契約）用 interface；需要聯合型別、工具型別或型別運算時用 type。團隊保持一致最重要。</p>` },
    { id: 'index', title: '索引簽章與 Record', html: `
<p>屬性名稱事先不知道（例如以商品編號為鍵的字典）時，使用索引簽章或 <code>Record</code>：</p>
<pre class="ts">interface Stock {
  [sku: string]: number;            // 任何字串鍵，值都是 number
}
const stock: Stock = { 'A-001': 12, 'B-020': 0 };
stock['C-300'] = 5;

type Score = Record&lt;string, number&gt;;   // 等同 { [key: string]: number }
const scores: Score = { 小明: 90, 小華: 85 };

type Weekday = 'mon' | 'tue' | 'wed';
const hours: Record&lt;Weekday, number&gt; = { mon: 8, tue: 6, wed: 7 };   // 鍵必須剛好是這三個

console.log(Object.keys(stock).length, scores['小明'], hours.tue);</pre>` },
    { id: 'excess', title: '結構型別與多餘屬性檢查', html: `
<p>TypeScript 採用<b>結構型別</b>（又稱鴨子型別）：只要形狀相符就可以，不在乎它叫什麼名字。但直接寫物件字面值時，多出來的屬性會被視為打錯字而報錯：</p>
<pre class="ts">interface Point {
  x: number;
  y: number;
}
function show(p: Point) {
  console.log(\`(\${p.x}, \${p.y})\`);
}

const pos = { x: 3, y: 4, label: '起點' };
show(pos);                         // OK：pos 至少有 x 與 y（結構相符）

class Vector { constructor(public x: number, public y: number) {} }
show(new Vector(1, 2));            // OK：類別實例的形狀也符合

// show({ x: 1, y: 2, lable: 'A' });   // 錯誤：物件字面值多了 lable，可能是拼錯字</pre>` }
  ],
  keypoints: [
    '物件型別描述屬性與型別；readonly 屬性不能修改，屬性名後加 ? 表示可選（可能是 undefined）。',
    'interface 用 extends 擴充、同名會合併；type 可為任何型別命名，用 & 做交集。',
    '描述物件與契約常用 interface，聯合型別與型別運算用 type。',
    '索引簽章 { [key: string]: number } 或 Record<K, V> 描述字典；Record 的鍵可以限制為聯合型別。',
    'TypeScript 是結構型別：形狀相符即可，不在乎名稱。',
    '直接傳入物件字面值時，多出來的屬性會觸發多餘屬性檢查，避免拼錯字。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 45,
  title: '函式的型別',
  summary: '參數與回傳值型別、可選參數與預設值、其餘參數、函式型別與回呼、箭頭函式、函式多載，以及 void 回傳型別的特性。',
  sections: [
    { id: 'params', title: '參數、回傳值與可選參數', html: `
<pre class="ts">function add(a: number, b: number): number {
  return a + b;
}

// 可選參數（?）必須放在必填參數之後；預設值會自動推論型別
function greet(name: string, title?: string, greeting = '你好'): string {
  return title ? \`\${greeting}，\${name}\${title}\` : \`\${greeting}，\${name}\`;
}

// 其餘參數：收集成陣列
function sum(...nums: number[]): number {
  return nums.reduce((t, n) =&gt; t + n, 0);
}

console.log(add(2, 3));
console.log(greet('王'), '|', greet('王', '經理'), '|', greet('王', undefined, '早安'));
console.log(sum(1, 2, 3, 4));</pre>
<p>試著呼叫 <code>add(2)</code> 或 <code>add(2, '3')</code>，TypeScript 會檢查參數的數量與型別。</p>` },
    { id: 'fntype', title: '函式型別與回呼', html: `
<pre class="ts">// 函式型別：描述「參數與回傳值」
type MathOp = (a: number, b: number) =&gt; number;

const multiply: MathOp = (a, b) =&gt; a * b;      // 參數型別由 MathOp 推論，不用重寫
const ops: Record&lt;string, MathOp&gt; = {
  '+': (a, b) =&gt; a + b,
  '-': (a, b) =&gt; a - b,
  '*': multiply
};
console.log(ops['+'](6, 2), ops['*'](6, 2));

// 回呼函式的型別
function repeat(times: number, fn: (i: number) =&gt; void): void {
  for (let i = 0; i &lt; times; i++) fn(i);
}
repeat(3, i =&gt; console.log('第', i + 1, '次'));

// 陣列方法的回呼參數會自動推論
const prices = [100, 250, 80];
const expensive = prices.filter(p =&gt; p &gt; 90);   // p 自動推論為 number
console.log(expensive);</pre>` },
    { id: 'overload', title: '函式多載', html: `
<p>同一個函式依參數不同回傳不同型別時，可以寫多個「多載簽章」，最後一個是實作：</p>
<pre class="ts">function format(value: number): string;
function format(value: Date): string;
function format(value: number | Date): string {
  if (typeof value === 'number') return value.toLocaleString('en-US');
  return value.toISOString().slice(0, 10);
}

console.log(format(1234567));
console.log(format(new Date('2026-10-29T00:00:00Z')));</pre>
<p>多載會增加複雜度。很多情況改用聯合型別參數或泛型（第 7 章）就夠了。</p>` },
    { id: 'void', title: 'void 回傳型別的特性', html: `
<p>函式型別的回傳值宣告為 <code>void</code> 時，代表「呼叫者不會使用回傳值」，所以實際上回傳了東西也不會報錯。這讓 <code>forEach</code> 可以接受有回傳值的回呼：</p>
<pre class="ts">const list: number[] = [];
[1, 2, 3].forEach(n =&gt; list.push(n * 10));   // push 回傳 number，但 forEach 的回呼是 void，仍然 OK
console.log(list);

type Handler = () =&gt; void;
const h: Handler = () =&gt; 42;                 // 允許
console.log(typeof h());</pre>` }
  ],
  keypoints: [
    '函式參數一定要標註型別；回傳型別可以推論，公開函式建議明確標註。',
    '可選參數用 ? 且放在後面；有預設值的參數會自動推論型別；...rest 收集成陣列。',
    '函式型別寫成 (a: number, b: number) => number，指定給變數後參數型別會自動推論。',
    '回呼函式的參數型別可以描述在參數中，陣列方法的回呼會自動推論。',
    '函式多載用多個簽章加一個實作，但常常可以改用聯合型別或泛型。',
    '回傳型別 void 的函式型別，允許實際回傳值但呼叫者不會使用。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 55,
  title: '聯合型別與型別縮小',
  summary: '聯合型別、用 typeof、in、instanceof、相等比較縮小型別、可辨識聯合與 switch、窮舉檢查與 never、自訂型別守衛、型別斷言、非空斷言，以及 satisfies 運算子。',
  sections: [
    { id: 'union', title: '聯合型別與 typeof 縮小', html: `
<p>聯合型別（A | B）表示「可能是 A 或 B」。使用前要先用判斷式<b>縮小</b>（narrowing）成確定的型別：</p>
<pre class="ts">function formatId(id: number | string): string {
  if (typeof id === 'number') {
    return 'ID-' + id.toString().padStart(5, '0');   // 這裡 id 是 number
  }
  return id.toUpperCase();                           // 這裡 id 是 string
}
console.log(formatId(42), formatId('ab-01'));

function len(x: string | string[] | null): number {
  if (x === null) return 0;          // 排除 null
  if (Array.isArray(x)) return x.length;
  return x.length;
}
console.log(len('hello'), len(['a', 'b']), len(null));</pre>
<p>互動練習中的「型別縮小步驟」可以逐步看到每個判斷之後，變數的型別如何改變。</p>` },
    { id: 'in', title: 'in、instanceof 與可辨識聯合', html: `
<pre class="ts">type Cat = { meow: () =&gt; string };
type Dog = { bark: () =&gt; string };

function speak(pet: Cat | Dog): string {
  if ('meow' in pet) return pet.meow();     // in：檢查是否有某個屬性
  return pet.bark();
}
console.log(speak({ meow: () =&gt; '喵' }), speak({ bark: () =&gt; '汪' }));

function describe(d: Date | string): string {
  return d instanceof Date ? d.getUTCFullYear() + ' 年' : d;
}
console.log(describe(new Date('2026-01-01T00:00:00Z')), describe('明天'));</pre>
<p>最實用的模式是<b>可辨識聯合</b>（discriminated union）：每一種型別都有一個共同的屬性（通常叫 type 或 kind），值是不同的字面值：</p>
<pre class="ts">type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;
    case 'rect': return s.width * s.height;
    case 'triangle': return (s.base * s.height) / 2;
  }
}

const shapes: Shape[] = [
  { kind: 'circle', radius: 1 },
  { kind: 'rect', width: 3, height: 4 },
  { kind: 'triangle', base: 6, height: 2 }
];
console.log(shapes.map(s =&gt; area(s).toFixed(2)));</pre>` },
    { id: 'never', title: '窮舉檢查', html: `
<p>在 switch 的 default 中把變數指定給 <code>never</code>，以後新增了一種型別卻忘了處理時，編譯器就會報錯：</p>
<pre class="ts">type Status = 'pending' | 'paid' | 'shipped';

function label(s: Status): string {
  switch (s) {
    case 'pending': return '待付款';
    case 'paid': return '已付款';
    case 'shipped': return '已出貨';
    default: {
      const unreachable: never = s;
      return unreachable;
    }
  }
}
console.log(label('paid'));</pre>
<p>試著在 Status 加上 <code>| 'cancelled'</code> 再執行：TypeScript 會在 default 那一行報錯，提醒你還有一種狀態沒處理。</p>` },
    { id: 'guard', title: '型別守衛、斷言與 satisfies', html: `
<pre class="ts">interface User { name: string; email: string }

// 自訂型別守衛：回傳型別寫成「參數 is 型別」
function isUser(x: unknown): x is User {
  return typeof x === 'object' &amp;&amp; x !== null &amp;&amp;
    typeof (x as User).name === 'string' &amp;&amp; typeof (x as User).email === 'string';
}

const raw: unknown = JSON.parse('{"name":"小明","email":"ming@example.com"}');
if (isUser(raw)) {
  console.log(raw.email);            // 通過檢查後，raw 是 User
}

// satisfies：檢查是否符合型別，但保留更精確的推論結果
const theme = {
  primary: '#3366ff',
  spacing: 8
} satisfies Record&lt;string, string | number&gt;;
console.log(theme.primary.toUpperCase(), theme.spacing * 2);   // primary 仍是 string，可以直接呼叫字串方法</pre>
<table>
<tr><th>語法</th><th>作用</th><th>風險</th></tr>
<tr><td><code>value as Type</code>（型別斷言）</td><td>告訴編譯器「相信我，它是這個型別」</td><td>不會檢查也不會轉換資料，錯了就是執行時錯誤</td></tr>
<tr><td><code>value!</code>（非空斷言）</td><td>告訴編譯器它不是 null 或 undefined</td><td>真的是 null 時執行會出錯</td></tr>
<tr><td><code>x is T</code>（型別守衛）</td><td>用實際檢查來縮小型別</td><td>檢查邏輯要寫對</td></tr>
<tr><td><code>satisfies T</code></td><td>檢查符合 T，同時保留原本精確的型別</td><td>安全</td></tr>
</table>` }
  ],
  keypoints: [
    '聯合型別 A | B 使用前要縮小：typeof、Array.isArray、=== null、in、instanceof。',
    '可辨識聯合：每種型別有共同的 kind 屬性與不同字面值，用 switch 縮小最清楚。',
    '窮舉檢查：在 default 把值指定給 never，新增型別卻沒處理時會報錯。',
    '自訂型別守衛的回傳型別寫成 x is T，用實際檢查縮小 unknown。',
    'as 型別斷言與 ! 非空斷言不會檢查資料，只在你比編譯器更確定時使用。',
    'satisfies 檢查是否符合型別，同時保留更精確的推論結果。'
  ]
},
{
  id: 'c06', subject: 1, minutes: 45,
  title: '類別與列舉',
  summary: '類別屬性與方法的型別、建構子參數屬性、public、private、protected、readonly 與 # 私有欄位、實作 interface、抽象類別，以及 enum 與 as const 的選擇。',
  sections: [
    { id: 'class', title: '類別與存取修飾子', html: `
<pre class="ts">class BankAccount {
  private balance = 0;                       // 只能在類別內部存取
  readonly createdAt = '2026-10-29';         // 只能讀不能改

  // 參數屬性：在建構子參數加上修飾子，自動宣告並指定屬性
  constructor(public readonly owner: string, initial: number) {
    this.deposit(initial);
  }

  deposit(amount: number): void {
    if (amount &lt;= 0) throw new Error('金額必須大於 0');
    this.balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount &gt; this.balance) return false;
    this.balance -= amount;
    return true;
  }

  getBalance(): number {
    return this.balance;
  }
}

const acc = new BankAccount('小明', 1000);
acc.deposit(500);
console.log(acc.owner, acc.withdraw(2000), acc.withdraw(300), acc.getBalance());</pre>
<p>試著加上 <code>acc.balance = 999999;</code>，TypeScript 會阻止你從外部修改 private 屬性。</p>
<table>
<tr><th>修飾子</th><th>可存取的範圍</th></tr>
<tr><td><code>public</code>（預設）</td><td>任何地方</td></tr>
<tr><td><code>protected</code></td><td>類別本身與子類別</td></tr>
<tr><td><code>private</code></td><td>只有類別本身（只在編譯時檢查）</td></tr>
<tr><td><code>#field</code></td><td>JavaScript 原生的私有欄位，執行時也無法從外部存取</td></tr>
<tr><td><code>readonly</code></td><td>只能在宣告或建構子中指定</td></tr>
</table>` },
    { id: 'implements', title: '實作 interface 與抽象類別', html: `
<pre class="ts">interface Notifier {
  send(to: string, message: string): string;
}

class EmailNotifier implements Notifier {
  send(to: string, message: string): string {
    return \`寄 email 給 \${to}：\${message}\`;
  }
}
class SmsNotifier implements Notifier {
  send(to: string, message: string): string {
    return \`傳簡訊給 \${to}：\${message.slice(0, 10)}\`;
  }
}

abstract class Shape {
  abstract area(): number;                 // 子類別一定要實作
  describe(): string {
    return \`面積為 \${this.area().toFixed(1)}\`;
  }
}
class Circle extends Shape {
  constructor(private r: number) { super(); }
  area(): number { return Math.PI * this.r ** 2; }
}

const notifiers: Notifier[] = [new EmailNotifier(), new SmsNotifier()];
notifiers.forEach(n =&gt; console.log(n.send('小明', '您的訂單已出貨，預計明天送達')));
console.log(new Circle(2).describe());</pre>` },
    { id: 'enum', title: 'enum 與 as const', html: `
<pre class="ts">// enum：一組具名的常數
enum Direction { Up, Down, Left, Right }            // 數字列舉，從 0 開始
enum Role { Admin = 'ADMIN', User = 'USER' }         // 字串列舉

console.log(Direction.Left, Direction[2], Role.Admin);

// 另一種常見做法：as const 物件 + 字面值聯合型別
const STATUS = {
  Pending: 'pending',
  Paid: 'paid'
} as const;
type Status = typeof STATUS[keyof typeof STATUS];   // 'pending' | 'paid'

const s: Status = STATUS.Paid;
console.log(s, Object.values(STATUS));</pre>
<div class="box memo"><b class="t">enum 還是字面值聯合？</b>enum 是 TypeScript 特有的語法，會產生額外的 JavaScript 程式碼；字面值聯合型別（<code>'pending' | 'paid'</code>）在編譯後完全消失，也能直接用字串比較。很多團隊偏好字面值聯合搭配 <code>as const</code> 物件，兩者都要能看懂。</div>` }
  ],
  keypoints: [
    '類別屬性要有型別與初始值；建構子參數加上修飾子會自動成為屬性（參數屬性）。',
    'public 任何地方、protected 本身與子類別、private 只有本身；#field 是執行時也私有的原生欄位。',
    'readonly 屬性只能在宣告或建構子中指定。',
    'implements 讓類別遵守 interface 的契約；abstract 類別不能建立實例，抽象方法要由子類別實作。',
    'enum 定義具名常數，數字列舉從 0 開始；字串列舉每個值要指定。',
    'as const 物件搭配 typeof 與 keyof 可以得到字面值聯合型別，是 enum 的常見替代。'
  ]
}
);
