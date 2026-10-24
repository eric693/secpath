/* 網頁開發 互動篇：JavaScript 與上線
   <pre class="js"> 為可在網頁上執行的 JavaScript 範例；<pre class="web"> 為即時預覽；<pre class="out"> 為一般程式碼
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 55,
  title: 'JavaScript 基礎',
  summary: '在網頁中加入 JavaScript、變數 let 與 const、資料型別、運算子與嚴格相等、樣板字串、條件判斷、迴圈、函式與箭頭函式，以及作用域。',
  sections: [
    { id: 'intro', title: 'JavaScript 在哪裡執行', html: `
<p>JavaScript 是唯一能在瀏覽器中直接執行的程式語言，也能透過 <b>Node.js</b> 在伺服器上執行。在網頁中引入的方式：</p>
<pre class="out">&lt;script src="js/main.js" defer&gt;&lt;/script&gt;   &lt;!-- 建議：外部檔案 + defer --&gt;
&lt;script&gt; console.log('也可以直接寫在頁面中'); &lt;/script&gt;</pre>
<p><code>defer</code> 讓瀏覽器先把 HTML 讀完再執行程式，才找得到頁面上的元素；也可以把 script 放在 body 的最後面。</p>
<p>下面的區塊可以直接執行 JavaScript，<code>console.log()</code> 的結果會顯示在下方。快捷鍵 Ctrl＋Enter：</p>
<pre class="js">console.log('Hello, JavaScript!');
console.log(1 + 2);
console.log('今天是', new Date().getFullYear(), '年');</pre>` },
    { id: 'vars', title: '變數與資料型別', html: `
<pre class="js">const name = '小明';      // const：不會重新指定的值（預設用這個）
let score = 80;           // let：之後會改變的值
score = score + 5;
console.log(name, score);

console.log(typeof 42, typeof 3.14);      // number（整數小數都是 number）
console.log(typeof 'hi', typeof true);    // string、boolean
console.log(typeof undefined, typeof null); // null 的 typeof 是 'object'，這是歷史包袱
console.log(typeof [1, 2], typeof { a: 1 }); // 陣列和物件都是 object</pre>
<table>
<tr><th>型別</th><th>範例</th><th>說明</th></tr>
<tr><td>number</td><td><code>42</code>、<code>3.14</code>、<code>NaN</code></td><td>整數小數都是 number；NaN 代表「不是數字」</td></tr>
<tr><td>string</td><td><code>'文字'</code>、<code>"文字"</code>、<code>\`樣板\`</code></td><td>單引號雙引號都可以</td></tr>
<tr><td>boolean</td><td><code>true</code>、<code>false</code></td><td>真假值</td></tr>
<tr><td>undefined</td><td><code>let x;</code></td><td>宣告了但還沒給值</td></tr>
<tr><td>null</td><td><code>null</code></td><td>刻意表示「沒有值」</td></tr>
<tr><td>object</td><td><code>{ }</code>、<code>[ ]</code>、函式</td><td>物件、陣列、日期等</td></tr>
</table>
<div class="box warn"><b class="t">不要再用 var</b>舊教學常用 <code>var</code> 宣告變數，它的作用域規則容易出錯（沒有區塊作用域、可以重複宣告）。現代 JavaScript 一律用 <code>const</code> 與 <code>let</code>。</div>` },
    { id: 'ops', title: '運算子、型別轉換與樣板字串', html: `
<pre class="js">console.log(7 / 2, 7 % 2, 2 ** 10);   // 3.5（JS 沒有整數除法）、餘數 1、次方 1024
console.log(0.1 + 0.2);               // 浮點數誤差，金額計算要特別注意
console.log('5' + 3, '5' - 3);        // '53'（字串串接）、2（轉成數字相減）
console.log(Number('42'), parseInt('42px'), Number('abc'));
console.log(5 == '5', 5 === '5');     // == 會先轉型別，=== 不會
console.log(0 == '', null == undefined, null === undefined);</pre>
<div class="box exam"><b class="t">一律使用 === 與 !==</b><code>==</code> 會自動轉換型別，造成 <code>0 == ''</code> 為 true 這類意外。嚴格相等 <code>===</code> 要求型別與值都相同，面試常考兩者的差別。</div>
<h3>樣板字串</h3>
<pre class="js">const user = '小華';
const price = 1290;
const qty = 3;
console.log(\`\${user} 買了 \${qty} 件，共 \${price * qty} 元\`);
console.log(\`可以
直接換行\`);</pre>
<h3>真值與假值</h3>
<p>在 if 判斷中，這 6 個值會被當成 false（<b>假值</b>），其他全部都是 true：<code>false</code>、<code>0</code>、<code>''</code>（空字串）、<code>null</code>、<code>undefined</code>、<code>NaN</code>。注意空陣列 <code>[]</code> 和空物件 <code>{}</code> 是<b>真值</b>。</p>
<pre class="js">const input = '';
const nickname = input || '訪客';   // 左邊是假值時用右邊
const count = 0;
console.log(nickname, count || 10, count ?? 10);   // ?? 只在 null／undefined 時才用右邊</pre>` },
    { id: 'control', title: '條件判斷與迴圈', html: `
<pre class="js">const score = 78;
if (score &gt;= 90) {
  console.log('優');
} else if (score &gt;= 60) {
  console.log('及格');
} else {
  console.log('不及格');
}
const result = score &gt;= 60 ? '通過' : '未通過';   // 三元運算子
console.log(result);

switch (new Date(2024, 4, 6).getDay()) {   // 月份從 0 開始，4 代表 5 月
  case 0: case 6: console.log('週末'); break;
  default: console.log('平日');
}</pre>
<pre class="js">for (let i = 1; i &lt;= 3; i++) {
  console.log('第', i, '次');
}
const fruits = ['蘋果', '香蕉', '芒果'];
for (const f of fruits) console.log(f);        // for...of 走訪陣列的值
for (const i in fruits) console.log(i);        // for...in 走訪索引（字串），陣列建議用 for...of

let n = 0;
while (n &lt; 3) n++;
console.log('n =', n);</pre>` },
    { id: 'functions', title: '函式', html: `
<pre class="js">// 函式宣告
function add(a, b) {
  return a + b;
}
// 箭頭函式：只有一行時可以省略大括號與 return
const square = x =&gt; x * x;
const greet = (name = '朋友') =&gt; \`哈囉，\${name}\`;   // 參數預設值

console.log(add(2, 3), square(4), greet(), greet('小明'));

// 函式也是值，可以當成參數傳遞（回呼函式）
function repeat(times, fn) {
  for (let i = 0; i &lt; times; i++) fn(i);
}
repeat(3, i =&gt; console.log('執行第', i + 1, '次'));</pre>
<h3>作用域</h3>
<pre class="js">const site = 'SecPath';          // 全域
function show() {
  const msg = '歡迎來到';         // 只在函式內有效
  if (true) {
    let inner = '！';             // let／const 只在大括號（區塊）內有效
    console.log(msg + site + inner);
  }
  // console.log(inner);         // 這裡會出現 ReferenceError: inner is not defined
}
show();</pre>
<div class="box tip"><b class="t">閉包</b>函式會記住它被建立時所在的作用域，即使外層函式已經執行完畢。這叫<b>閉包（Closure）</b>，是面試常考題：</div>
<pre class="js">function makeCounter() {
  let count = 0;
  return () =&gt; ++count;
}
const counter = makeCounter();
console.log(counter(), counter(), counter());</pre>` }
  ],
  keypoints: [
    'JavaScript 在瀏覽器與 Node.js 中執行；script 加上 defer 會在 HTML 讀完後執行。',
    '預設用 const，需要重新指定才用 let，不要用 var。',
    'JS 數字不分整數小數，7 / 2 為 3.5；0.1 + 0.2 有浮點誤差。',
    '一律使用 === 嚴格相等；\'5\' + 3 為 \'53\'，\'5\' - 3 為 2。',
    '假值只有 false、0、\'\'、null、undefined、NaN；?? 只在 null／undefined 時取右邊。',
    '樣板字串用反引號與 ${}；箭頭函式 x => x * x 是簡潔的函式寫法；閉包會記住建立時的變數。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 50,
  title: '陣列、物件與 JSON',
  summary: '陣列的新增刪除與常用方法、map／filter／reduce／find、排序的陷阱、物件的讀寫與走訪、解構與展開運算子、選擇性串連，以及 JSON 的轉換。',
  sections: [
    { id: 'array', title: '陣列基礎', html: `
<pre class="js">const nums = [3, 1, 4];
nums.push(5);            // 加到最後
nums.unshift(0);         // 加到最前面
console.log(nums, nums.length);
const last = nums.pop(); // 移除最後一個並傳回
console.log(last, nums);
console.log(nums[0], nums.at(-1));        // 第一個、最後一個
console.log(nums.includes(4), nums.indexOf(4), nums.indexOf(9));
console.log(nums.slice(1, 3));            // 取出索引 1～2，不修改原陣列
console.log(nums.join(' / '));</pre>` },
    { id: 'methods', title: 'map、filter、reduce', html: `
<p>處理資料最常用的三個方法，都<b>不會修改原陣列</b>，而是傳回新的結果：</p>
<pre class="js">const products = [
  { name: '無線滑鼠', price: 590, category: '3C' },
  { name: '機械鍵盤', price: 2490, category: '3C' },
  { name: '人體工學椅', price: 8900, category: '家具' },
  { name: '筆記本組', price: 199, category: '文具' }
];

const names = products.map(p =&gt; p.name);                     // 轉換每個元素
const cheap = products.filter(p =&gt; p.price &lt; 1000);          // 篩選
const total = products.reduce((sum, p) =&gt; sum + p.price, 0); // 彙總成一個值
const chair = products.find(p =&gt; p.category === '家具');     // 找第一個符合的

console.log(names);
console.log(cheap.map(p =&gt; p.name));
console.log(total);
console.log(chair.name);
console.log(products.some(p =&gt; p.price &gt; 5000), products.every(p =&gt; p.price &gt; 100));</pre>
<table>
<tr><th>方法</th><th>傳回</th><th>對應 SQL／Excel 的概念</th></tr>
<tr><td><code>map</code></td><td>同樣長度的新陣列</td><td>SELECT 計算欄位</td></tr>
<tr><td><code>filter</code></td><td>符合條件的元素組成的新陣列</td><td>WHERE、篩選</td></tr>
<tr><td><code>reduce</code></td><td>一個值</td><td>SUM、COUNT 等彙總</td></tr>
<tr><td><code>find</code>／<code>findIndex</code></td><td>第一個符合的元素／索引</td><td>VLOOKUP</td></tr>
<tr><td><code>some</code>／<code>every</code></td><td>true／false</td><td>是否有任一／全部符合</td></tr>
</table>
<p>方法可以串接，例如「3C 商品打九折後的總價」：</p>
<pre class="js">const prices = [
  { name: '無線滑鼠', price: 590, category: '3C' },
  { name: '機械鍵盤', price: 2490, category: '3C' },
  { name: '人體工學椅', price: 8900, category: '家具' }
];
const result = prices
  .filter(p =&gt; p.category === '3C')
  .map(p =&gt; Math.round(p.price * 0.9))
  .reduce((a, b) =&gt; a + b, 0);
console.log(result);</pre>` },
    { id: 'sort', title: '排序的陷阱', html: `
<pre class="js">const scores = [10, 9, 100, 25];
console.log([...scores].sort());              // 預設把元素當成字串排序！
console.log([...scores].sort((a, b) =&gt; a - b)); // 數字由小到大
console.log([...scores].sort((a, b) =&gt; b - a)); // 由大到小

const people = [{ name: '小華', age: 30 }, { name: '小明', age: 25 }];
people.sort((a, b) =&gt; a.age - b.age);
console.log(people.map(p =&gt; p.name));
console.log(['香蕉', '蘋果', '芒果'].sort((a, b) =&gt; a.localeCompare(b, 'zh-Hant')));</pre>
<div class="box warn"><b class="t">sort 會修改原陣列</b><code>sort()</code> 與 <code>reverse()</code>、<code>push()</code>、<code>splice()</code> 一樣會直接修改原陣列。不想改到原陣列時，先用 <code>[...arr]</code> 複製，或使用較新的 <code>toSorted()</code>。</div>` },
    { id: 'object', title: '物件、解構與展開', html: `
<pre class="js">const user = {
  name: '王小明',
  age: 28,
  skills: ['HTML', 'CSS'],
  address: { city: '台北市' },
  hello() { return \`我是\${this.name}\`; }
};
console.log(user.name, user['age'], user.address.city);
user.email = 'ming@example.com';     // 新增屬性
delete user.age;                     // 刪除屬性
console.log(Object.keys(user));
console.log(user.hello());

for (const [key, value] of Object.entries({ a: 1, b: 2 })) {
  console.log(key, value);
}</pre>
<h3>解構、展開與選擇性串連</h3>
<pre class="js">const user = { name: '王小明', city: '台北市', skills: ['HTML', 'CSS'] };
const { name, city } = user;                 // 物件解構
const [first, second] = user.skills;         // 陣列解構
console.log(name, city, first, second);

const updated = { ...user, city: '新竹市' };  // 展開：複製並覆寫部分屬性
console.log(user.city, updated.city);
const all = [...user.skills, 'JavaScript'];  // 合併陣列
console.log(all);

const order = { id: 1, customer: null };
console.log(order.customer?.name);           // ?. 遇到 null／undefined 就停止，不會報錯
console.log(order.customer?.name ?? '未填寫');</pre>
<div class="box memo"><b class="t">傳參考</b>物件與陣列指定給另一個變數時，兩個變數指向<b>同一份</b>資料：<code>const b = a; b.x = 1;</code> 也會改到 a。要複製用展開運算子（淺拷貝）或 <code>structuredClone(a)</code>（深拷貝）。</div>` },
    { id: 'json', title: 'JSON', html: `
<p><b>JSON（JavaScript Object Notation）</b>是網路上交換資料最常見的格式，API 回傳的資料幾乎都是 JSON。它看起來像 JavaScript 物件，但規則更嚴格：</p>
<ul>
<li>鍵一定要用<b>雙引號</b>，字串也只能用雙引號。</li>
<li>值只能是字串、數字、true／false、null、陣列、物件（不能有函式、undefined、註解）。</li>
<li>最後一項後面不能有逗號。</li>
</ul>
<pre class="js">const data = { name: '小明', scores: [90, 85], vip: true };
const text = JSON.stringify(data);          // 物件 → JSON 字串
console.log(text, typeof text);
console.log(JSON.stringify(data, null, 2));  // 縮排 2 格，方便閱讀

const back = JSON.parse('{"city":"台北市","zip":100}');   // JSON 字串 → 物件
console.log(back.city, back.zip + 1);

try {
  JSON.parse("{'city': '台北市'}");          // 單引號不是合法的 JSON
} catch (err) {
  console.log('解析失敗：', err.name);
}</pre>` }
  ],
  keypoints: [
    'push／pop 操作陣列尾端，unshift 加到前端；slice 取出部分且不修改原陣列。',
    'map 轉換、filter 篩選、reduce 彙總、find 找第一個符合的元素，都不修改原陣列。',
    'sort() 預設以字串排序，數字要寫 (a, b) => a - b；sort 會修改原陣列。',
    '物件用 . 或 [] 存取屬性；Object.keys／entries 可走訪物件。',
    '解構取出屬性、展開運算子 ... 複製與合併；?. 遇到 null／undefined 時安全停止。',
    'JSON 的鍵與字串只能用雙引號；JSON.stringify 轉成字串、JSON.parse 轉回物件。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 55,
  title: 'DOM 操作與事件',
  summary: 'DOM 樹的概念、選取元素、修改文字與屬性、classList 切換樣式、建立與刪除元素、textContent 與 innerHTML 的 XSS 風險、事件監聽、事件物件、事件委派，以及實作待辦清單。',
  sections: [
    { id: 'dom', title: 'DOM 與選取元素', html: `
<p>瀏覽器讀取 HTML 後，會建立一棵 <b>DOM（Document Object Model）樹</b>，每個標籤都是一個節點物件。JavaScript 透過 DOM 讀取與修改網頁：</p>
<table>
<tr><th>方法</th><th>傳回</th></tr>
<tr><td><code>document.querySelector('.card')</code></td><td>第一個符合 CSS 選擇器的元素，找不到為 null</td></tr>
<tr><td><code>document.querySelectorAll('li')</code></td><td>所有符合的元素（NodeList，可用 forEach）</td></tr>
<tr><td><code>document.getElementById('app')</code></td><td>指定 id 的元素</td></tr>
<tr><td><code>el.closest('.card')</code></td><td>往上找最近的符合祖先（含自己）</td></tr>
</table>
<pre class="web">&lt;h2 id="title"&gt;原本的標題&lt;/h2&gt;
&lt;p class="desc"&gt;原本的說明&lt;/p&gt;
&lt;ul&gt;&lt;li&gt;A&lt;/li&gt;&lt;li&gt;B&lt;/li&gt;&lt;li&gt;C&lt;/li&gt;&lt;/ul&gt;
&lt;a id="link" href="#"&gt;連結&lt;/a&gt;

&lt;script&gt;
  document.querySelector('#title').textContent = '用 JavaScript 改過的標題';
  const desc = document.querySelector('.desc');
  desc.style.color = 'crimson';                      // 修改樣式
  document.querySelectorAll('li').forEach((li, i) =&gt; {
    li.textContent = \`第 \${i + 1} 項\`;
  });
  const link = document.querySelector('#link');
  link.setAttribute('href', 'https://developer.mozilla.org');
  link.textContent = 'MDN';
  console.log(link.getAttribute('href'));
&lt;/script&gt;</pre>` },
    { id: 'classlist', title: 'classList 與建立元素', html: `
<p>修改樣式時，最好的做法是在 CSS 中定義好 class，JavaScript 只負責加上或移除 class：</p>
<pre class="web">&lt;button id="toggle" type="button"&gt;切換深色&lt;/button&gt;
&lt;div id="panel" class="panel"&gt;內容區塊&lt;/div&gt;
&lt;ul id="list"&gt;&lt;/ul&gt;

&lt;style&gt;
  .panel { padding: 16px; margin: 10px 0; border-radius: 8px; background: #edf2f9; transition: .3s; }
  .panel.dark { background: #16181d; color: #fff; }
&lt;/style&gt;
&lt;script&gt;
  const panel = document.querySelector('#panel');
  document.querySelector('#toggle').addEventListener('click', () =&gt; {
    panel.classList.toggle('dark');          // 有就移除、沒有就加上
    console.log('dark?', panel.classList.contains('dark'));
  });

  // 建立元素並加入頁面
  const list = document.querySelector('#list');
  ['HTML', 'CSS', 'JavaScript'].forEach(text =&gt; {
    const li = document.createElement('li');
    li.textContent = text;
    list.append(li);
  });
&lt;/script&gt;</pre>
<table>
<tr><th>方法</th><th>作用</th></tr>
<tr><td><code>classList.add('a')</code>／<code>remove('a')</code></td><td>加入／移除 class</td></tr>
<tr><td><code>classList.toggle('a')</code></td><td>切換</td></tr>
<tr><td><code>document.createElement('li')</code></td><td>建立新元素</td></tr>
<tr><td><code>parent.append(el)</code>／<code>prepend(el)</code></td><td>加到最後／最前</td></tr>
<tr><td><code>el.remove()</code></td><td>移除元素</td></tr>
</table>` },
    { id: 'xss', title: 'textContent 與 innerHTML', html: `
<p><code>innerHTML</code> 會把字串當成 HTML 解析，<code>textContent</code> 只當成純文字。如果把使用者輸入的內容放進 innerHTML，攻擊者就能插入惡意程式，這就是 <b>XSS（跨站腳本攻擊）</b>：</p>
<pre class="web">&lt;input id="msg" value='&lt;img src=x onerror="alert(&amp;apos;被攻擊了&amp;apos;)"&gt;' style="width:100%"&gt;
&lt;p&gt;&lt;button id="bad" type="button"&gt;用 innerHTML 顯示（危險）&lt;/button&gt;
   &lt;button id="good" type="button"&gt;用 textContent 顯示（安全）&lt;/button&gt;&lt;/p&gt;
&lt;div id="out" style="border:1px dashed #999; padding:8px; min-height:2em"&gt;&lt;/div&gt;
&lt;script&gt;
  const msg = document.querySelector('#msg'), out = document.querySelector('#out');
  document.querySelector('#bad').onclick = () =&gt; { out.innerHTML = msg.value; };
  document.querySelector('#good').onclick = () =&gt; { out.textContent = msg.value; };
&lt;/script&gt;</pre>
<div class="box warn"><b class="t">原則</b>顯示使用者輸入、API 回傳的資料時，用 <code>textContent</code>。一定要用 innerHTML 組 HTML 時，先把 <code>&lt; &gt; &amp; " '</code> 轉成實體字元，或用 createElement 建立元素。React、Vue 等框架預設會自動跳脫。</div>` },
    { id: 'events', title: '事件', html: `
<pre class="web">&lt;input id="name" placeholder="輸入名字"&gt;
&lt;p id="hello"&gt;哈囉！&lt;/p&gt;
&lt;div id="box" style="padding:20px;background:#edf2f9"&gt;在這裡移動滑鼠或按鍵盤&lt;/div&gt;
&lt;script&gt;
  const name = document.querySelector('#name');
  name.addEventListener('input', e =&gt; {
    document.querySelector('#hello').textContent = \`哈囉，\${e.target.value || '陌生人'}！\`;
  });
  document.querySelector('#box').addEventListener('click', e =&gt; {
    console.log('點擊位置', e.offsetX, e.offsetY);
  });
  document.addEventListener('keydown', e =&gt; {
    if (e.key === 'Enter') console.log('按了 Enter');
  });
&lt;/script&gt;</pre>
<table>
<tr><th>事件</th><th>觸發時機</th></tr>
<tr><td><code>click</code></td><td>點擊</td></tr>
<tr><td><code>input</code>／<code>change</code></td><td>輸入時即時觸發／完成修改（離開欄位）時觸發</td></tr>
<tr><td><code>submit</code></td><td>表單送出（記得 e.preventDefault()）</td></tr>
<tr><td><code>keydown</code></td><td>按下鍵盤，e.key 為按鍵名稱</td></tr>
<tr><td><code>DOMContentLoaded</code></td><td>HTML 讀取完成</td></tr>
<tr><td><code>scroll</code>／<code>resize</code></td><td>捲動／視窗大小改變</td></tr>
</table>
<p><b>事件物件</b>（通常命名為 e 或 event）帶有事件的資訊：<code>e.target</code> 是被點到的元素，<code>e.preventDefault()</code> 阻止預設行為（例如連結跳頁、表單送出）。</p>` },
    { id: 'todo', title: '事件委派與實作：待辦清單', html: `
<p>清單中的每個項目都綁一個事件，項目一多就很浪費，而且新加入的項目還要重新綁定。<b>事件委派</b>把事件綁在父元素上，利用<b>事件冒泡</b>（事件會從被點的元素一路往上傳）統一處理：</p>
<pre class="web">&lt;form id="form"&gt;
  &lt;input id="task" placeholder="新增待辦事項" required&gt;
  &lt;button&gt;新增&lt;/button&gt;
&lt;/form&gt;
&lt;ul id="todos"&gt;&lt;/ul&gt;
&lt;p id="count"&gt;&lt;/p&gt;

&lt;style&gt;
  #todos { padding: 0; list-style: none; }
  #todos li { display: flex; gap: 8px; align-items: center; padding: 6px 0; border-bottom: 1px solid #eee; }
  #todos li.done span { text-decoration: line-through; color: #999; }
  #todos button { margin-left: auto; }
&lt;/style&gt;
&lt;script&gt;
  let todos = [{ text: '學 HTML', done: true }, { text: '學 CSS', done: false }];
  const ul = document.querySelector('#todos');

  function render() {
    ul.innerHTML = '';
    todos.forEach((t, i) =&gt; {
      const li = document.createElement('li');
      li.className = t.done ? 'done' : '';
      li.dataset.index = i;
      li.innerHTML = '&lt;input type="checkbox"&gt;&lt;span&gt;&lt;/span&gt;&lt;button type="button"&gt;刪除&lt;/button&gt;';
      li.querySelector('input').checked = t.done;
      li.querySelector('span').textContent = t.text;   // 使用者輸入用 textContent
      ul.append(li);
    });
    document.querySelector('#count').textContent = \`還有 \${todos.filter(t =&gt; !t.done).length} 項未完成\`;
  }

  document.querySelector('#form').addEventListener('submit', e =&gt; {
    e.preventDefault();
    const input = document.querySelector('#task');
    todos.push({ text: input.value.trim(), done: false });
    input.value = '';
    render();
  });

  ul.addEventListener('click', e =&gt; {               // 事件委派：只綁在 ul 上
    const li = e.target.closest('li');
    if (!li) return;
    const i = Number(li.dataset.index);
    if (e.target.matches('button')) todos.splice(i, 1);
    if (e.target.matches('input')) todos[i].done = e.target.checked;
    render();
  });

  render();
&lt;/script&gt;</pre>
<div class="box tip"><b class="t">資料驅動畫面</b>這個範例的寫法是：資料（todos 陣列）改變後，呼叫 render() 重新畫出畫面。這正是 React、Vue 等框架的核心概念，學會這個模式，之後學框架會很快上手。</div>` }
  ],
  keypoints: [
    'DOM 是瀏覽器根據 HTML 建立的物件樹，JavaScript 透過它讀取與修改網頁。',
    'querySelector 取第一個符合的元素，querySelectorAll 取全部；選擇器寫法與 CSS 相同。',
    '修改樣式建議用 classList.add／remove／toggle 切換 CSS class。',
    '顯示使用者輸入要用 textContent，innerHTML 可能造成 XSS 攻擊。',
    'addEventListener 綁定事件；e.target 是觸發事件的元素，e.preventDefault() 阻止預設行為。',
    '事件委派利用事件冒泡，把事件綁在父元素上統一處理子元素。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 50,
  title: '非同步、API 與瀏覽器儲存',
  summary: '同步與非同步、setTimeout 與事件迴圈、Promise、async／await、fetch 呼叫 API 與錯誤處理、Promise.all 平行請求、CORS，以及 localStorage 保存資料。',
  sections: [
    { id: 'async', title: '同步與非同步', html: `
<p>JavaScript 一次只能做一件事（單執行緒）。如果等待網路回應時整個頁面都停住，使用者會覺得當機。所以耗時的工作（網路請求、計時器）都是<b>非同步</b>的：先登記「完成後要做什麼」，繼續執行後面的程式。</p>
<pre class="js">console.log('1. 開始');
setTimeout(() =&gt; console.log('3. 一秒後執行'), 1000);
console.log('2. 不會等計時器，先執行這行');</pre>
<pre class="js">// 即使延遲 0 毫秒，也會等目前的程式全部執行完
setTimeout(() =&gt; console.log('C'), 0);
Promise.resolve().then(() =&gt; console.log('B'));
console.log('A');</pre>
<div class="box exam"><b class="t">事件迴圈（Event Loop）</b>同步程式先執行完；接著處理微任務（Promise 的 then）；再處理巨任務（setTimeout、事件）。所以上面的輸出順序是 A、B、C。這是前端面試的經典題。</div>` },
    { id: 'promise', title: 'Promise 與 async／await', html: `
<p><b>Promise</b> 代表「未來才會完成的結果」，有三種狀態：等待中（pending）、成功（fulfilled）、失敗（rejected）。</p>
<pre class="js">function wait(ms, value) {
  return new Promise(resolve =&gt; setTimeout(() =&gt; resolve(value), ms));
}
function mayFail(ok) {
  return new Promise((resolve, reject) =&gt; ok ? resolve('成功') : reject(new Error('出錯了')));
}

// 寫法一：then／catch
wait(300, '資料 A').then(v =&gt; console.log('then 拿到', v));
mayFail(false).catch(err =&gt; console.log('catch 到', err.message));

// 寫法二：async／await（推薦，讀起來像同步程式）
async function main() {
  const v = await wait(500, '資料 B');
  console.log('await 拿到', v);
  try {
    await mayFail(false);
  } catch (err) {
    console.log('try...catch 處理錯誤：', err.message);
  }
}
main();</pre>
<h3>平行處理多個請求</h3>
<pre class="js">const wait = (ms, v) =&gt; new Promise(r =&gt; setTimeout(() =&gt; r(v), ms));

async function demo() {
  const t0 = Date.now();
  const [a, b] = await Promise.all([wait(400, '使用者'), wait(400, '訂單')]);   // 同時進行
  console.log(a, b, '平行約', Math.round((Date.now() - t0) / 100) * 100, '毫秒');
}
demo();</pre>
<p><code>Promise.all</code> 同時等待多個 Promise，全部完成才繼續，任何一個失敗就進入 catch。兩個各 400 毫秒的請求平行處理只要約 400 毫秒，依序 await 則要 800 毫秒。</p>` },
    { id: 'fetch', title: 'fetch 呼叫 API', html: `
<p><b>API（應用程式介面）</b>是程式之間溝通的窗口。前端用 <code>fetch</code> 向 API 要資料，通常會得到 JSON：</p>
<pre class="js">async function getUser(id) {
  const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);   // fetch 遇到 404、500 不會自動拋錯
  return res.json();                                    // 把回應內容解析成物件
}

try {
  const user = await getUser(1);
  console.log(user.name, user.address.city);
  const todos = await (await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')).json();
  console.log('待辦數：', todos.length, '已完成：', todos.filter(t =&gt; t.completed).length);
} catch (err) {
  console.log('取得資料失敗：', err.message);
}</pre>
<div class="box warn"><b class="t">fetch 的錯誤處理</b>fetch 只有在<b>網路斷線</b>時才會失敗（reject）。伺服器回傳 404 或 500 時，Promise 仍然是成功的，要自己檢查 <code>res.ok</code> 或 <code>res.status</code>。</div>
<h3>送出資料（POST）</h3>
<pre class="out">const res = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ productId: 5, qty: 2 })
});</pre>
<h3>CORS 跨來源限制</h3>
<p>瀏覽器基於安全，預設不允許網頁讀取<b>其他網域</b>的 API 回應，除非對方伺服器回應 <code>Access-Control-Allow-Origin</code> 標頭允許。看到 Console 出現 CORS 錯誤，代表要由 API 伺服器端設定，前端無法自行繞過（上例的 jsonplaceholder 已允許所有網域）。</p>` },
    { id: 'storage', title: 'localStorage 保存資料', html: `
<p><code>localStorage</code> 讓網頁在使用者的瀏覽器中保存資料，關掉瀏覽器再打開還在，很適合保存設定與待辦清單：</p>
<pre class="web">&lt;label&gt;&lt;input type="checkbox" id="dark"&gt; 深色模式（重新整理後仍會記住）&lt;/label&gt;
&lt;p&gt;造訪次數：&lt;b id="visits"&gt;&lt;/b&gt;&lt;/p&gt;
&lt;script&gt;
  // 預覽環境可能禁止 localStorage，實務上也要用 try...catch 保護
  function load(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
    catch { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { console.log('無法使用 localStorage'); }
  }
  const visits = load('visits', 0) + 1;
  save('visits', visits);
  document.querySelector('#visits').textContent = visits;

  const box = document.querySelector('#dark');
  box.checked = load('dark', false);
  document.body.style.background = box.checked ? '#16181d' : '#fff';
  document.body.style.color = box.checked ? '#eee' : '#16181d';
  box.addEventListener('change', () =&gt; { save('dark', box.checked); location.reload(); });
&lt;/script&gt;</pre>
<table>
<tr><th>方法</th><th>作用</th></tr>
<tr><td><code>localStorage.setItem(key, value)</code></td><td>儲存（值只能是字串，物件先 JSON.stringify）</td></tr>
<tr><td><code>localStorage.getItem(key)</code></td><td>讀取，不存在時為 null</td></tr>
<tr><td><code>localStorage.removeItem(key)</code></td><td>刪除</td></tr>
<tr><td><code>sessionStorage</code></td><td>用法相同，但關閉分頁就清除</td></tr>
</table>
<div class="box warn"><b class="t">不要存敏感資料</b>localStorage 可以被同網域的任何 JavaScript 讀取，一旦有 XSS 漏洞就會外洩。密碼、信用卡、登入權杖等敏感資料不要放在這裡，登入狀態建議用 HttpOnly Cookie。</div>` }
  ],
  keypoints: [
    'JavaScript 是單執行緒，耗時工作以非同步處理，不會卡住畫面。',
    '事件迴圈：同步程式 → 微任務（Promise）→ 巨任務（setTimeout），所以 setTimeout 0 仍會最後執行。',
    'Promise 有 pending、fulfilled、rejected 三種狀態；async／await 搭配 try…catch 最易讀。',
    'Promise.all 平行等待多個非同步工作，任一失敗即進入 catch。',
    'fetch 遇到 404、500 不會拋錯，要檢查 res.ok；回應用 res.json() 解析。',
    'localStorage 只能存字串，物件需 JSON 轉換；不要存放密碼與權杖等敏感資料。'
  ]
},
{
  id: 'c11', subject: 2, minutes: 40,
  title: '作品上線與前端工作',
  summary: '用 Git 與 GitHub Pages 免費上線、網頁效能與 Lighthouse、SEO 基礎、npm 與建置工具、React／Vue 等框架介紹、前端職缺技能地圖與作品集建議。',
  sections: [
    { id: 'deploy', title: '用 GitHub Pages 免費上線', html: `
<ol>
<li>在 GitHub 建立新的儲存庫（例如 <code>my-portfolio</code>），設為 Public。</li>
<li>把專案推上去（Git 課程有完整教學）：</li>
</ol>
<pre class="out">git init
git add .
git commit -m "第一版作品集"
git branch -M main
git remote add origin git@github.com:你的帳號/my-portfolio.git
git push -u origin main</pre>
<ol start="3">
<li>到儲存庫的 <b>Settings → Pages</b>，Source 選擇 <code>main</code> 分支與 <code>/ (root)</code>，儲存。</li>
<li>約一分鐘後，網站就會出現在 <code>https://你的帳號.github.io/my-portfolio/</code>。之後每次 push 都會自動更新。</li>
</ol>
<table>
<tr><th>平台</th><th>適合</th></tr>
<tr><td>GitHub Pages</td><td>純靜態網站（HTML／CSS／JS），完全免費</td></tr>
<tr><td>Netlify、Vercel、Cloudflare Pages</td><td>靜態網站與前端框架，可自動建置、預覽分支</td></tr>
<tr><td>雲端主機（AWS、GCP）</td><td>需要後端與資料庫的完整應用，見 DevOps 與 AWS 課程</td></tr>
</table>` },
    { id: 'perf', title: '效能、SEO 與 Lighthouse', html: `
<p>Chrome 開發人員工具中的 <b>Lighthouse</b> 可以替網頁的效能、無障礙、最佳做法、SEO 打分數，並列出改善建議。</p>
<table>
<tr><th>效能優化</th><th>做法</th></tr>
<tr><td>圖片最佳化</td><td>壓縮、使用 WebP／AVIF、設定尺寸與 loading="lazy"</td></tr>
<tr><td>減少阻擋渲染</td><td>script 加 defer；CSS 放在 head</td></tr>
<tr><td>減少請求與檔案大小</td><td>合併與壓縮（minify）檔案，啟用 gzip／brotli</td></tr>
<tr><td>快取</td><td>靜態檔案設定快取期限，檔名加上版本號</td></tr>
</table>
<table>
<tr><th>SEO 基礎</th><th>做法</th></tr>
<tr><td>標題與描述</td><td>每頁有獨特的 <code>&lt;title&gt;</code> 與 <code>&lt;meta name="description"&gt;</code></td></tr>
<tr><td>結構</td><td>語意化標籤、一個 h1、依序使用標題</td></tr>
<tr><td>圖片</td><td>有意義的 alt</td></tr>
<tr><td>社群分享</td><td>Open Graph 標籤（og:title、og:image），分享到 Facebook、LINE 時顯示預覽</td></tr>
<tr><td>行動裝置</td><td>響應式設計，Google 以行動版內容作為索引依據</td></tr>
</table>` },
    { id: 'tools', title: 'npm、建置工具與框架', html: `
<p>學完 HTML、CSS、JavaScript 基礎後，實際工作還會用到這些工具：</p>
<table>
<tr><th>工具</th><th>用途</th></tr>
<tr><td><b>Node.js 與 npm</b></td><td>在電腦上執行 JavaScript、安裝套件（<code>npm install 套件</code>）</td></tr>
<tr><td><b>Vite</b></td><td>開發伺服器與打包工具，<code>npm create vite@latest</code> 快速建立專案</td></tr>
<tr><td><b>TypeScript</b></td><td>為 JavaScript 加上型別，大型專案與多數職缺都要求</td></tr>
<tr><td><b>Tailwind CSS</b></td><td>以工具類別快速寫樣式，例如 <code>class="flex gap-4 p-2"</code></td></tr>
<tr><td><b>ESLint／Prettier</b></td><td>檢查程式問題、統一程式碼格式</td></tr>
</table>
<h3>前端框架</h3>
<table>
<tr><th>框架</th><th>特色</th><th>台灣職缺</th></tr>
<tr><td><b>React</b></td><td>Meta 開發，生態系最大，搭配 Next.js 做全端</td><td>最多</td></tr>
<tr><td><b>Vue</b></td><td>上手容易，中文資源多，搭配 Nuxt</td><td>很多，台灣接案與中小企業常見</td></tr>
<tr><td><b>Angular</b></td><td>Google 開發，架構完整</td><td>大型企業、金融業</td></tr>
</table>
<div class="box tip"><b class="t">學習順序建議</b>不要跳過基礎直接學框架。框架的元件、狀態、事件處理，都建立在本課程的 DOM、事件、陣列方法、非同步觀念之上。建議先用原生 JavaScript 完成 2～3 個作品，再挑 React 或 Vue 深入。</div>` },
    { id: 'career', title: '前端職缺與作品集', html: `
<table>
<tr><th>職缺</th><th>常見要求</th></tr>
<tr><td>初階前端工程師</td><td>HTML、CSS、JavaScript、RWD、Git、React 或 Vue 其一、串接 API</td></tr>
<tr><td>網頁設計師／UI 工程師</td><td>HTML、CSS、切版、Figma、動畫、無障礙</td></tr>
<tr><td>全端工程師</td><td>前端加上後端（Node.js、Python）、SQL、部署</td></tr>
<tr><td>行銷技術、電商營運</td><td>HTML、CSS 修改頁面、GA4、GTM 追蹤碼、SEO</td></tr>
</table>
<h3>作品集建議</h3>
<ol>
<li><b>個人履歷網站</b>：響應式、語意化、Lighthouse 分數 90 以上。</li>
<li><b>待辦清單或記帳本</b>：DOM 操作、事件委派、localStorage。</li>
<li><b>串接公開 API 的應用</b>：例如中央氣象署開放資料、政府資料開放平臺，展示 fetch、錯誤處理與載入狀態。</li>
<li>每個作品都放上 GitHub Pages，README 說明功能、使用技術與遇到的挑戰。</li>
</ol>
<div class="box exam"><b class="t">面試常見題</b>語意化 HTML 的好處、盒模型與 box-sizing、Flex 與 Grid 的差別、選擇器權重、== 與 ===、let／const／var、閉包、事件委派與冒泡、Promise 與 async／await、事件迴圈的執行順序、XSS 與 CORS。本課程各章都已涵蓋。</div>` }
  ],
  keypoints: [
    'GitHub Pages 可免費部署靜態網站，push 後自動更新。',
    'Lighthouse 評估效能、無障礙、最佳做法與 SEO，並提供改善建議。',
    '效能優化重點：圖片最佳化、script 加 defer、壓縮檔案、快取。',
    'SEO 基礎：每頁獨特的 title 與 description、語意化結構、alt、Open Graph。',
    '實務工具：Node.js／npm、Vite、TypeScript；框架以 React 職缺最多，Vue 次之。',
    '先用原生 JavaScript 完成作品打好基礎，再學框架。'
  ]
}
);
