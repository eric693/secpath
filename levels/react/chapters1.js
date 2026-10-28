/* React 基礎篇：JSX、元件、state、列表與表單
   <pre class="jsx"> 為可在網頁上即時預覽的 React 範例；<pre class="js"> 為可執行的 JavaScript；<pre class="out"> 為一般程式碼或指令
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 45,
  title: '認識 React 與開發環境',
  summary: 'React 解決什麼問題、命令式與宣告式的差別、元件與虛擬 DOM、用 Vite 建立專案與專案結構，以及寫 React 前必備的 JavaScript 語法。',
  sections: [
    { id: 'why', title: '為什麼要用 React', html: `
<p>用原生 JavaScript 做互動網頁時，資料一改變，就要自己找到對應的元素、一個一個更新畫面。功能一多，「資料」和「畫面」很容易對不上。這種寫法叫<b>命令式（Imperative）</b>：一步一步告訴瀏覽器怎麼做。</p>
<pre class="out">// 原生 JavaScript：資料改變後，要自己記得更新每個相關的地方
let count = 0;
button.addEventListener('click', () =&gt; {
  count++;
  label.textContent = '點了 ' + count + ' 次';
  if (count &gt;= 10) badge.style.display = 'block';
});</pre>
<p>React 採用<b>宣告式（Declarative）</b>寫法：你只要描述「資料是這樣時，畫面長什麼樣子」，資料改變時，React 自動算出需要更新的地方。</p>
<pre class="jsx">import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    &lt;div&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;點了 {count} 次&lt;/button&gt;
      {count &gt;= 10 &amp;&amp; &lt;p&gt;🎉 超過 10 次了！&lt;/p&gt;}
    &lt;/div&gt;
  );
}</pre>
<p>上面的區塊可以直接修改，畫面會自動更新。試著把 10 改成 3，或把文字改掉看看。</p>
<div class="box tip"><b class="t">UI = f(state)</b>React 的核心觀念：畫面是資料（state）的函式。你負責管理資料，React 負責讓畫面和資料保持一致。</div>` },
    { id: 'concept', title: 'React 的三個核心概念', html: `
<table>
<tr><th>概念</th><th>說明</th></tr>
<tr><td>元件（Component）</td><td>把畫面拆成一塊塊可重複使用的積木，例如 Header、ProductCard、Button。每個元件就是一個回傳畫面的函式。</td></tr>
<tr><td>虛擬 DOM 與差異比對</td><td>React 先在記憶體中算出新的畫面結構，和舊的比較，只把真正改變的部分更新到瀏覽器上，開發者不用手動操作 DOM。</td></tr>
<tr><td>單向資料流</td><td>資料由父元件透過 props 往下傳給子元件；子元件要改資料時，呼叫父元件傳下來的函式。資料流向清楚，容易除錯。</td></tr>
</table>
<p>React 只負責「畫面」這一層，所以常被稱為函式庫（library）而不是完整框架。路由、狀態管理、表單等功能可以依需求搭配其他套件，或直接使用 Next.js 這類以 React 為基礎的框架。</p>
<div class="box memo"><b class="t">React、Vue、Angular</b>三者都是主流的前端框架。React 由 Meta 開發，生態系最大，在台灣與全球的職缺數量都最多；學會 React 的元件與狀態觀念後，要轉學其他框架也很快。</div>` },
    { id: 'setup', title: '用 Vite 建立專案', html: `
<p>先安裝 <b>Node.js</b>（建議 LTS 版本），然後在終端機執行：</p>
<pre class="out">npm create vite@latest my-app -- --template react   # 建立專案
cd my-app
npm install          # 安裝套件
npm run dev          # 啟動開發伺服器，打開 http://localhost:5173</pre>
<p>Vite 是現在最常用的前端建置工具，啟動快、修改存檔後畫面立刻更新。專案的重要檔案：</p>
<pre class="out">my-app/
├── index.html          # 唯一的 HTML，裡面有 &lt;div id="root"&gt;&lt;/div&gt;
├── package.json        # 套件清單與指令（dev、build、preview）
├── public/             # 不經處理、直接複製的靜態檔（favicon 等）
└── src/
    ├── main.jsx        # 進入點：把 &lt;App /&gt; 渲染到 #root
    ├── App.jsx         # 最上層的元件，從這裡開始寫
    ├── App.css
    └── index.css</pre>
<p><code>main.jsx</code> 的內容：</p>
<pre class="out">import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  &lt;StrictMode&gt;
    &lt;App /&gt;
  &lt;/StrictMode&gt;
);</pre>
<p><code>createRoot</code> 找到 HTML 中的 <code>#root</code>，把 App 元件渲染進去，之後整個網頁都由 React 管理。講義中的預覽區塊會自動幫你做這一步，只要寫出名為 <code>App</code> 的元件即可。</p>
<div class="box tip"><b class="t">開發工具</b>建議安裝瀏覽器擴充功能 <b>React Developer Tools</b>，可以看到元件樹、每個元件目前的 props 與 state，是除錯的好幫手。編輯器推薦 VS Code。</div>` },
    { id: 'first', title: '第一個元件', html: `
<p>元件就是一個<b>名稱大寫開頭、回傳 JSX 的函式</b>。JSX 看起來像 HTML，其實是 JavaScript 的語法擴充：</p>
<pre class="jsx">function Greeting() {
  return &lt;h2&gt;哈囉，歡迎來到 React！&lt;/h2&gt;;
}

export default function App() {
  return (
    &lt;div&gt;
      &lt;Greeting /&gt;
      &lt;Greeting /&gt;
      &lt;p&gt;同一個元件可以重複使用。&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>
<p>注意三件事：元件名稱 <code>Greeting</code> 一定要大寫開頭；使用元件的寫法是 <code>&lt;Greeting /&gt;</code>；回傳多行 JSX 時用小括號包起來，避免 return 後面自動插入分號。</p>
<div class="box warn"><b class="t">小寫會被當成 HTML 標籤</b>如果寫成 <code>function greeting()</code> 再用 <code>&lt;greeting /&gt;</code>，React 會把它當成一個叫 greeting 的 HTML 標籤，畫面上什麼都不會出現。</div>` },
    { id: 'js', title: '寫 React 前必備的 JavaScript', html: `
<p>React 大量使用現代 JavaScript 語法。下面的語法如果還不熟，先在這裡練習（可直接執行）：</p>
<pre class="js">// 1. 箭頭函式
const double = n =&gt; n * 2;
console.log(double(4));

// 2. 解構賦值：從物件、陣列取出值
const user = { name: '小明', age: 20 };
const { name, age } = user;
const [first, second] = ['蘋果', '香蕉'];
console.log(name, age, first, second);

// 3. 展開運算子：複製並修改（React 更新 state 最常用）
const older = { ...user, age: 21 };
const fruits = ['蘋果', '香蕉'];
const more = [...fruits, '芒果'];
console.log(older, more, user.age);

// 4. 陣列方法：map 轉換、filter 篩選
const nums = [1, 2, 3, 4];
console.log(nums.map(n =&gt; n * 10));
console.log(nums.filter(n =&gt; n % 2 === 0));

// 5. 三元運算子與 &amp;&amp;
const score = 75;
console.log(score &gt;= 60 ? '及格' : '不及格');
console.log(score &gt; 70 &amp;&amp; '表現不錯');</pre>
<table>
<tr><th>語法</th><th>React 中的用途</th></tr>
<tr><td>解構</td><td>取出 props：<code>function Card({ title })</code>；取出 state：<code>const [count, setCount] = useState(0)</code></td></tr>
<tr><td>展開運算子</td><td>以不可變的方式更新物件與陣列 state</td></tr>
<tr><td>map／filter</td><td>把陣列資料轉成畫面上的列表</td></tr>
<tr><td>三元、&amp;&amp;</td><td>在 JSX 中做條件渲染</td></tr>
<tr><td>import／export</td><td>每個元件放在獨立的檔案，再匯入使用</td></tr>
</table>` }
  ],
  keypoints: [
    'React 採宣告式寫法：描述資料對應的畫面，資料改變時 React 自動更新畫面（UI = f(state)）。',
    '三個核心概念：元件化、虛擬 DOM 差異比對、單向資料流。',
    '用 npm create vite@latest 建立專案，npm run dev 啟動開發伺服器。',
    'main.jsx 用 createRoot 把 App 渲染到 index.html 的 #root。',
    '元件是名稱大寫開頭、回傳 JSX 的函式，使用時寫成 <Greeting />。',
    '必備 JavaScript：箭頭函式、解構、展開運算子、map／filter、三元運算子、模組。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 50,
  title: 'JSX 語法',
  summary: 'JSX 的規則、用大括號嵌入運算式、屬性寫法（className、style 物件）、Fragment、條件渲染的三種寫法、JSX 如何轉成 React.createElement，以及 React 自動防範 XSS。',
  sections: [
    { id: 'rules', title: 'JSX 的三條規則', html: `
<table>
<tr><th>規則</th><th>錯誤寫法</th><th>正確寫法</th></tr>
<tr><td>只能回傳一個根元素</td><td><code>return &lt;h1&gt;標題&lt;/h1&gt;&lt;p&gt;內文&lt;/p&gt;</code></td><td>用 <code>&lt;div&gt;</code> 或 <code>&lt;&gt;…&lt;/&gt;</code> 包起來</td></tr>
<tr><td>所有標籤都要關閉</td><td><code>&lt;img src="a.png"&gt;</code>、<code>&lt;br&gt;</code></td><td><code>&lt;img src="a.png" /&gt;</code>、<code>&lt;br /&gt;</code></td></tr>
<tr><td>屬性使用 camelCase</td><td><code>class</code>、<code>onclick</code>、<code>for</code></td><td><code>className</code>、<code>onClick</code>、<code>htmlFor</code></td></tr>
</table>
<p>試著把下面的 Fragment <code>&lt;&gt;</code> 拿掉，看看預覽區顯示什麼錯誤：</p>
<pre class="jsx">export default function App() {
  return (
    &lt;&gt;
      &lt;h2&gt;個人簡介&lt;/h2&gt;
      &lt;img src="https://placehold.co/80x80?text=Me" alt="頭像" /&gt;
      &lt;p className="intro"&gt;我正在學習 React。&lt;/p&gt;
      &lt;label htmlFor="email"&gt;Email&lt;/label&gt;
      &lt;input id="email" placeholder="you@example.com" /&gt;
    &lt;/&gt;
  );
}</pre>
<p><code>&lt;&gt;…&lt;/&gt;</code> 叫 <b>Fragment</b>，可以把多個元素包在一起，但不會在畫面上多產生一層 div。需要加 key 時寫成 <code>&lt;Fragment key={id}&gt;</code>。</p>` },
    { id: 'expr', title: '用大括號嵌入 JavaScript', html: `
<p>在 JSX 中用 <code>{ }</code> 可以放入任何 JavaScript <b>運算式</b>（會產生一個值的程式碼），例如變數、計算、函式呼叫、三元運算子：</p>
<pre class="jsx">const user = { name: '王小明', points: 1280 };
const today = new Date();

function formatMoney(n) {
  return 'NT$ ' + n.toLocaleString();
}

export default function App() {
  const level = user.points &gt;= 1000 ? '金卡' : '一般';
  return (
    &lt;div&gt;
      &lt;h2&gt;你好，{user.name}&lt;/h2&gt;
      &lt;p&gt;點數：{user.points}（可折抵 {formatMoney(user.points / 10)}）&lt;/p&gt;
      &lt;p&gt;會員等級：{level}&lt;/p&gt;
      &lt;p&gt;今年是 {today.getFullYear()} 年，2 + 3 = {2 + 3}&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>
<div class="box warn"><b class="t">大括號裡不能放陳述式</b><code>if</code>、<code>for</code>、變數宣告是「陳述式」，不能直接寫在 <code>{ }</code> 中。要做判斷就用三元運算子或 <code>&amp;&amp;</code>，或在 return 之前先用 if 算好；要重複就用 <code>map</code>。</div>
<p>大括號中能顯示的值：字串、數字、JSX 元素、這些東西組成的陣列。<code>true</code>、<code>false</code>、<code>null</code>、<code>undefined</code> 不會顯示任何東西；<b>一般物件不能直接顯示</b>，會出現錯誤。</p>` },
    { id: 'attr', title: '屬性、樣式與 className', html: `
<p>屬性值是字串時用引號，是 JavaScript 值時用大括號。<code>style</code> 要傳入<b>物件</b>，CSS 屬性名稱改成 camelCase：</p>
<pre class="jsx">export default function App() {
  const size = 96;
  const isActive = true;
  const boxStyle = {
    backgroundColor: '#eef4ff',
    border: '1px solid #9db8f0',
    borderRadius: 8,          // 數字會自動加上 px
    padding: '12px 16px'
  };
  return (
    &lt;div style={boxStyle}&gt;
      &lt;img src={'https://placehold.co/' + size + 'x' + size} width={size} alt="示意圖" /&gt;
      &lt;p style={{ color: isActive ? 'green' : 'gray', fontWeight: 'bold' }}&gt;
        {isActive ? '上線中' : '離線'}
      &lt;/p&gt;
      &lt;button disabled={!isActive}&gt;傳送訊息&lt;/button&gt;
    &lt;/div&gt;
  );
}</pre>
<p><code>style={{ ... }}</code> 的外層大括號表示「這是 JavaScript」，內層大括號是物件本身。實務上較常把樣式寫在 CSS 檔，再用 <code>className</code> 套用；也可以依條件組合 class：<code>className={'btn ' + (active ? 'btn-active' : '')}</code>。</p>
<div class="box memo"><b class="t">CSS 的寫法選擇</b>React 專案常見的樣式方案：一般 CSS 檔、CSS Modules（<code>App.module.css</code>，class 名稱不會互相衝突）、Tailwind CSS（直接在 className 寫工具類別）。初學從一般 CSS 開始即可。</div>` },
    { id: 'cond', title: '條件渲染', html: `
<p>三種常見寫法：</p>
<pre class="jsx">function Status({ online }) {
  // 寫法一：在 return 前用 if
  if (online === undefined) return &lt;p&gt;載入中…&lt;/p&gt;;
  return (
    &lt;div&gt;
      {/* 寫法二：三元運算子，二選一 */}
      &lt;p&gt;{online ? '🟢 上線中' : '⚪ 離線'}&lt;/p&gt;
      {/* 寫法三：&amp;&amp; ，條件成立才顯示 */}
      {online &amp;&amp; &lt;button&gt;開始聊天&lt;/button&gt;}
    &lt;/div&gt;
  );
}

export default function App() {
  return (
    &lt;&gt;
      &lt;Status online={true} /&gt;
      &lt;Status online={false} /&gt;
      &lt;Status /&gt;
    &lt;/&gt;
  );
}</pre>
<p>JSX 中的註解寫成 <code>{/* 註解 */}</code>。</p>
<div class="box warn"><b class="t">&amp;&amp; 左邊不要放數字</b><code>{count &amp;&amp; &lt;p&gt;有 {count} 則訊息&lt;/p&gt;}</code> 在 count 為 0 時，畫面會出現一個「0」，因為 <code>0 &amp;&amp; …</code> 的結果是 0，而數字會被顯示出來。改寫成 <code>{count &gt; 0 &amp;&amp; …}</code>。</div>
<pre class="jsx">export default function App() {
  const count = 0;
  return (
    &lt;div&gt;
      &lt;p&gt;錯誤寫法：{count &amp;&amp; &lt;span&gt;有 {count} 則訊息&lt;/span&gt;}&lt;/p&gt;
      &lt;p&gt;正確寫法：{count &gt; 0 &amp;&amp; &lt;span&gt;有 {count} 則訊息&lt;/span&gt;}&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>` },
    { id: 'compile', title: 'JSX 背後是什麼', html: `
<p>瀏覽器看不懂 JSX。Vite 會用 Babel 或 esbuild 把 JSX 轉成一般的 JavaScript 函式呼叫：</p>
<pre class="out">// 你寫的 JSX
const el = &lt;h1 className="title"&gt;Hello, {name}&lt;/h1&gt;;

// 轉換後（傳統轉換方式）
const el = React.createElement('h1', { className: 'title' }, 'Hello, ', name);

// 執行後得到一個描述畫面的普通物件
{ type: 'h1', props: { className: 'title', children: ['Hello, ', '小明'] } }</pre>
<p>所以 JSX 就是 JavaScript：可以存進變數、當作函式的參數與回傳值、放進陣列。這也解釋了為什麼屬性要用 <code>className</code>：<code>class</code> 是 JavaScript 的保留字。互動練習中的「JSX 轉換器」可以輸入 JSX，看它被轉成什麼。</p>
<div class="box tip"><b class="t">自動防範 XSS</b>放進 <code>{ }</code> 的字串會被自動跳脫，就算內容是 <code>&lt;script&gt;</code> 也只會顯示成文字，不會執行。只有使用 <code>dangerouslySetInnerHTML</code> 時才會插入原始 HTML，名稱就在提醒你這很危險，使用前務必先過濾內容。</div>
<pre class="jsx">export default function App() {
  const comment = '&lt;img src=x onerror="alert(\\'被駭了\\')"&gt; 好文推推';
  return (
    &lt;div&gt;
      &lt;p&gt;使用者留言：{comment}&lt;/p&gt;
      &lt;p style={{ color: 'gray' }}&gt;↑ 惡意的 HTML 被當成純文字顯示，不會執行。&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>` }
  ],
  keypoints: [
    'JSX 三規則：一個根元素（可用 Fragment <>）、標籤都要關閉、屬性用 camelCase（className、htmlFor、onClick）。',
    '{ } 中可放任何運算式；if、for 等陳述式不行，改用三元、&& 或 map。',
    'true、false、null、undefined 不會顯示；一般物件不能直接放進 JSX。',
    'style 傳入物件且屬性用 camelCase，例如 style={{ fontSize: 16 }}。',
    '&& 左邊是 0 時會顯示 0，條件要寫成 count > 0 &&。',
    'JSX 會被轉成 React.createElement 呼叫；{ } 中的字串自動跳脫，可防範 XSS。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 50,
  title: '元件與 props',
  summary: '用元件拆分畫面、props 傳遞資料與解構、預設值、children 與元件組合、props 是唯讀的、元件應是純函式，以及把元件拆成獨立檔案的 import／export。',
  sections: [
    { id: 'props', title: '用 props 傳遞資料', html: `
<p>props（properties）是父元件傳給子元件的資料，寫法就像 HTML 屬性。子元件用一個物件參數接收，通常直接解構：</p>
<pre class="jsx">function ProductCard({ name, price, onSale }) {
  return (
    &lt;div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 12, margin: 6 }}&gt;
      &lt;h3 style={{ margin: 0 }}&gt;{name}&lt;/h3&gt;
      &lt;p style={{ margin: '4px 0' }}&gt;NT$ {price}&lt;/p&gt;
      {onSale &amp;&amp; &lt;strong style={{ color: 'crimson' }}&gt;特價中&lt;/strong&gt;}
    &lt;/div&gt;
  );
}

export default function App() {
  return (
    &lt;div style={{ display: 'flex', flexWrap: 'wrap' }}&gt;
      &lt;ProductCard name="無線滑鼠" price={590} onSale={true} /&gt;
      &lt;ProductCard name="機械鍵盤" price={2490} onSale={false} /&gt;
      &lt;ProductCard name="螢幕支架" price={1290} onSale /&gt;
    &lt;/div&gt;
  );
}</pre>
<p>字串可以直接用引號，其他型別（數字、布林、陣列、物件、函式）要用大括號。只寫屬性名稱（例如 <code>onSale</code>）等於傳入 <code>true</code>。</p>
<div class="box memo"><b class="t">不解構的寫法</b><code>function ProductCard(props) { return &lt;h3&gt;{props.name}&lt;/h3&gt;; }</code> 也可以，但解構讓元件需要哪些 props 一目了然，是目前的主流寫法。</div>` },
    { id: 'default', title: '預設值與傳遞物件', html: `
<pre class="jsx">function Avatar({ name, size = 48, color = '#6b8afd' }) {
  return (
    &lt;span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: size, height: size, borderRadius: '50%', background: color,
      color: 'white', fontSize: size / 2.5, margin: 4
    }}&gt;
      {name[0]}
    &lt;/span&gt;
  );
}

function UserRow({ user }) {
  return (
    &lt;div style={{ display: 'flex', alignItems: 'center' }}&gt;
      &lt;Avatar name={user.name} color={user.color} /&gt;
      &lt;span&gt;{user.name}（{user.role}）&lt;/span&gt;
    &lt;/div&gt;
  );
}

export default function App() {
  const users = [
    { name: '陳怡君', role: '設計師', color: '#e67e22' },
    { name: '林大偉', role: '工程師' }
  ];
  return (
    &lt;&gt;
      &lt;Avatar name="React" size={72} /&gt;
      &lt;UserRow user={users[0]} /&gt;
      &lt;UserRow user={users[1]} /&gt;
    &lt;/&gt;
  );
}</pre>
<p>解構時用 <code>size = 48</code> 設定預設值，父元件沒傳或傳入 <code>undefined</code> 時使用。也可以傳整個物件，或用 <code>&lt;Avatar {...user} /&gt;</code> 把物件的所有屬性展開成 props。</p>` },
    { id: 'children', title: 'children 與元件組合', html: `
<p>寫在元件開始與結束標籤之間的內容，會成為特殊的 prop：<b>children</b>。這讓你可以做出「外框」類的元件，內容由使用者決定：</p>
<pre class="jsx">function Card({ title, children }) {
  return (
    &lt;section style={{ border: '1px solid #ddd', borderRadius: 10, margin: '8px 0', overflow: 'hidden' }}&gt;
      &lt;h3 style={{ margin: 0, padding: '8px 12px', background: '#f3f4f6' }}&gt;{title}&lt;/h3&gt;
      &lt;div style={{ padding: 12 }}&gt;{children}&lt;/div&gt;
    &lt;/section&gt;
  );
}

function Alert({ type = 'info', children }) {
  const colors = { info: '#e8f1ff', warn: '#fff4e0', error: '#ffe8e8' };
  return &lt;div style={{ background: colors[type], padding: 10, borderRadius: 6 }}&gt;{children}&lt;/div&gt;;
}

export default function App() {
  return (
    &lt;&gt;
      &lt;Card title="公告"&gt;
        &lt;p&gt;本週六進行系統維護。&lt;/p&gt;
        &lt;Alert type="warn"&gt;維護期間無法登入。&lt;/Alert&gt;
      &lt;/Card&gt;
      &lt;Card title="購物車"&gt;
        &lt;p&gt;目前沒有商品。&lt;/p&gt;
        &lt;button&gt;去逛逛&lt;/button&gt;
      &lt;/Card&gt;
    &lt;/&gt;
  );
}</pre>
<p>React 推薦用<b>組合（composition）</b>重複使用程式碼：小元件組成大元件，透過 props 與 children 客製化，而不是用繼承。</p>` },
    { id: 'pure', title: 'props 是唯讀的，元件要是純函式', html: `
<p>元件<b>不能修改自己收到的 props</b>。資料由父元件擁有，子元件只能讀取；想改變資料時，要由父元件改變後重新傳下來（下一章的 state 會說明怎麼做）。</p>
<pre class="out">function Price({ item }) {
  item.price = item.price * 0.9;   // ❌ 修改 props，會造成難以追蹤的錯誤
  return &lt;p&gt;{item.price}&lt;/p&gt;;
}

function Price({ item }) {
  const discounted = item.price * 0.9;   // ✅ 計算出新的值來顯示
  return &lt;p&gt;{discounted}&lt;/p&gt;;
}</pre>
<p>React 要求元件像<b>純函式</b>：相同的 props 與 state，一定回傳相同的畫面，而且渲染過程中不修改外部的變數、不送出請求、不直接操作 DOM。這些「副作用」要放在事件處理函式或 useEffect 中（第 7 章）。</p>
<div class="box tip"><b class="t">StrictMode 的檢查</b>開發模式下，<code>&lt;StrictMode&gt;</code> 會故意把每個元件渲染兩次，幫你找出不純的元件。所以在元件中 <code>console.log</code> 看到印兩次是正常的，正式版不會這樣。</div>` },
    { id: 'files', title: '把元件拆成檔案', html: `
<p>專案中通常一個元件一個檔案，放在 <code>src/components/</code>，再用 import 組合：</p>
<pre class="out">// src/components/ProductCard.jsx
export default function ProductCard({ name, price }) {
  return &lt;div className="card"&gt;{name}：NT$ {price}&lt;/div&gt;;
}

// src/utils/format.js（具名匯出，一個檔案可以匯出多個）
export function formatMoney(n) { return 'NT$ ' + n.toLocaleString(); }
export const TAX_RATE = 0.05;

// src/App.jsx
import ProductCard from './components/ProductCard.jsx';   // 預設匯入，名稱可自取
import { formatMoney, TAX_RATE } from './utils/format.js'; // 具名匯入，名稱要相同</pre>
<table>
<tr><th>何時拆成新元件</th><th>例子</th></tr>
<tr><td>同樣的畫面重複出現</td><td>商品卡片、按鈕、留言</td></tr>
<tr><td>一個元件太長（超過 100～200 行）</td><td>把頁面拆成 Header、Sidebar、Content</td></tr>
<tr><td>一塊畫面有自己獨立的功能</td><td>搜尋列、分頁器、對話框</td></tr>
</table>` }
  ],
  keypoints: [
    'props 是父元件傳給子元件的資料，子元件通常用解構接收：function Card({ title })。',
    '字串 props 用引號，其他型別用大括號；只寫名稱等於 true。',
    '解構時可設定預設值：{ size = 48 }；{...obj} 可把物件展開成 props。',
    'children 是寫在標籤之間的內容，用來做外框類元件，React 推薦組合而非繼承。',
    'props 是唯讀的；元件應是純函式，副作用要放在事件處理或 useEffect。',
    '一個元件一個檔案：export default 預設匯出，export 具名匯出。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 60,
  title: 'state 與事件處理',
  summary: '為什麼一般變數無法更新畫面、useState 的用法、事件處理函式、state 是快照與批次更新、更新函式、以不可變的方式更新物件與陣列，以及如何規劃 state。',
  sections: [
    { id: 'why', title: '一般變數為什麼不行', html: `
<p>試著按下面兩個按鈕。左邊用一般變數，右邊用 state：</p>
<pre class="jsx">import { useState } from 'react';

export default function App() {
  let plain = 0;                         // 一般變數
  const [count, setCount] = useState(0); // state

  function addPlain() {
    plain = plain + 1;
    console.log('plain 現在是', plain);  // 值有變，但畫面不會更新
  }

  return (
    &lt;div&gt;
      &lt;button onClick={addPlain}&gt;一般變數：{plain}&lt;/button&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;state：{count}&lt;/button&gt;
    &lt;/div&gt;
  );
}</pre>
<p>一般變數有兩個問題：改變它<b>不會讓 React 重新渲染</b>；就算重新渲染，函式重新執行時 <code>let plain = 0</code> 又會把它歸零。<code>useState</code> 同時解決這兩件事：React 會幫你保存這個值，而且呼叫 set 函式時會重新渲染元件。</p>` },
    { id: 'usestate', title: 'useState 與事件', html: `
<pre class="out">const [count, setCount] = useState(0);
//     目前的值  更新函式           初始值</pre>
<p>以 <code>use</code> 開頭的函式叫 <b>Hook</b>。事件處理函式通常命名為 <code>handleXxx</code>，傳給 <code>onClick</code>、<code>onChange</code> 等屬性：</p>
<pre class="jsx">import { useState } from 'react';

export default function App() {
  const [likes, setLikes] = useState(0);
  const [text, setText] = useState('');
  const [dark, setDark] = useState(false);

  function handleLike() {
    setLikes(likes + 1);
  }

  return (
    &lt;div style={{ background: dark ? '#222' : '#fff', color: dark ? '#eee' : '#222', padding: 12 }}&gt;
      &lt;button onClick={handleLike}&gt;👍 {likes}&lt;/button&gt;
      &lt;button onClick={() =&gt; setLikes(0)}&gt;歸零&lt;/button&gt;
      &lt;button onClick={() =&gt; setDark(!dark)}&gt;切換{dark ? '淺色' : '深色'}&lt;/button&gt;
      &lt;p&gt;
        &lt;input value={text} onChange={e =&gt; setText(e.target.value)} placeholder="輸入文字" /&gt;
        你輸入了 {text.length} 個字
      &lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>
<div class="box warn"><b class="t">傳函式，不要呼叫函式</b><code>onClick={handleLike}</code> 是把函式交給 React，點擊時才執行。寫成 <code>onClick={handleLike()}</code> 會在<b>渲染時就立刻執行</b>；如果裡面呼叫 setState，就會造成無限重新渲染。需要傳參數時用箭頭函式包起來：<code>onClick={() =&gt; remove(id)}</code>。</div>
<p>事件物件 <code>e</code> 的常用屬性：<code>e.target.value</code>（輸入框的值）、<code>e.target.checked</code>（核取方塊）、<code>e.preventDefault()</code>（阻止表單送出重新整理頁面）、<code>e.stopPropagation()</code>（阻止事件往父元素傳遞）。</p>` },
    { id: 'snapshot', title: 'state 是快照：批次更新與更新函式', html: `
<p>呼叫 <code>setCount</code> 不會立刻改變目前這次渲染中的 <code>count</code>，而是「安排」下一次渲染使用新的值。猜猜看每個按鈕按一下，數字會加多少：</p>
<pre class="jsx">import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  function addThreeWrong() {
    setCount(count + 1);   // count 是 0 → 安排變成 1
    setCount(count + 1);   // count 還是 0 → 安排變成 1
    setCount(count + 1);   // count 還是 0 → 安排變成 1
  }

  function addThreeRight() {
    setCount(c =&gt; c + 1);  // 0 → 1
    setCount(c =&gt; c + 1);  // 1 → 2
    setCount(c =&gt; c + 1);  // 2 → 3
  }

  function logAfterSet() {
    setCount(count + 1);
    console.log('set 之後立刻讀取：', count);   // 還是舊的值
  }

  return (
    &lt;div&gt;
      &lt;h2&gt;{count}&lt;/h2&gt;
      &lt;button onClick={addThreeWrong}&gt;+3（錯誤寫法）&lt;/button&gt;
      &lt;button onClick={addThreeRight}&gt;+3（更新函式）&lt;/button&gt;
      &lt;button onClick={logAfterSet}&gt;+1 並印出&lt;/button&gt;
    &lt;/div&gt;
  );
}</pre>
<p>每次渲染時，<code>count</code> 就是那一次的固定值，像一張快照。同一個事件中的多次 set 會被 React <b>批次處理</b>，全部算完才重新渲染一次。</p>
<div class="box exam"><b class="t">什麼時候用更新函式</b>新的值要根據舊的值計算時（計數器、切換開關、在計時器或非同步函式中更新），用 <code>setCount(c =&gt; c + 1)</code>、<code>setOpen(o =&gt; !o)</code>，React 會把最新的值傳給你。這是面試常考題。</div>` },
    { id: 'immutable', title: '更新物件與陣列', html: `
<p>React 用「是不是同一個物件」（<code>Object.is</code>）來判斷 state 有沒有改變。直接修改物件或陣列，參考沒有變，React 會認為沒有改變而<b>不重新渲染</b>。要建立<b>新的</b>物件或陣列：</p>
<pre class="jsx">import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState({ name: '小明', age: 20, city: '台北' });
  const [tags, setTags] = useState(['React', 'CSS']);

  function wrongBirthday() {
    user.age += 1;        // ❌ 直接修改，畫面不會更新
    setUser(user);        //    傳入同一個物件，React 認為沒變
  }

  return (
    &lt;div&gt;
      &lt;p&gt;{user.name}，{user.age} 歲，住在{user.city}&lt;/p&gt;
      &lt;button onClick={() =&gt; setUser({ ...user, age: user.age + 1 })}&gt;過生日（正確）&lt;/button&gt;
      &lt;button onClick={wrongBirthday}&gt;過生日（錯誤）&lt;/button&gt;
      &lt;button onClick={() =&gt; setUser({ ...user, city: '高雄' })}&gt;搬到高雄&lt;/button&gt;
      &lt;p&gt;標籤：{tags.join('、')}&lt;/p&gt;
      &lt;button onClick={() =&gt; setTags([...tags, 'JS' + tags.length])}&gt;新增&lt;/button&gt;
      &lt;button onClick={() =&gt; setTags(tags.filter(t =&gt; t !== 'CSS'))}&gt;刪除 CSS&lt;/button&gt;
      &lt;button onClick={() =&gt; setTags(tags.map(t =&gt; t.toUpperCase()))}&gt;全部大寫&lt;/button&gt;
    &lt;/div&gt;
  );
}</pre>
<p>先按幾次「過生日（錯誤）」，畫面不變；再按其他按鈕，會發現年齡突然跳了好幾歲。這種不一致正是直接修改 state 造成的錯誤。</p>
<table>
<tr><th>操作</th><th>不可變寫法</th><th>避免使用（會修改原陣列）</th></tr>
<tr><td>新增</td><td><code>[...arr, item]</code>、<code>[item, ...arr]</code></td><td>push、unshift</td></tr>
<tr><td>刪除</td><td><code>arr.filter(x =&gt; x.id !== id)</code></td><td>splice、pop、shift</td></tr>
<tr><td>修改某一項</td><td><code>arr.map(x =&gt; x.id === id ? { ...x, done: true } : x)</code></td><td><code>arr[i].done = true</code></td></tr>
<tr><td>排序、反轉</td><td><code>[...arr].sort()</code>、<code>arr.toSorted()</code></td><td>sort、reverse</td></tr>
<tr><td>修改巢狀物件</td><td><code>{ ...user, address: { ...user.address, city } }</code></td><td><code>user.address.city = city</code></td></tr>
</table>
<p>互動練習中的「不可變更新練習」可以比較各種寫法，看 React 能不能偵測到改變。</p>` },
    { id: 'plan', title: '規劃 state 的原則', html: `
<table>
<tr><th>原則</th><th>說明</th></tr>
<tr><td>只存最少的必要資料</td><td>能從其他 state 或 props 算出來的值，不要另外存成 state。例如有了 items，總金額直接在渲染時用 reduce 算出來。</td></tr>
<tr><td>相關的資料放在一起</td><td>總是一起改變的值（例如滑鼠的 x、y）可以放在同一個物件中。</td></tr>
<tr><td>避免重複</td><td>不要同時存 items 和 selectedItem 物件，改存 selectedId，需要時再從 items 找出來。</td></tr>
<tr><td>state 是元件私有的</td><td>同一個元件用兩次，各自擁有獨立的 state，互不影響。</td></tr>
</table>
<pre class="jsx">import { useState } from 'react';

function Counter({ label }) {
  const [n, setN] = useState(0);
  return &lt;button onClick={() =&gt; setN(n + 1)}&gt;{label}：{n}&lt;/button&gt;;
}

export default function App() {
  const [items, setItems] = useState([{ name: '咖啡', price: 80, qty: 1 }, { name: '蛋糕', price: 120, qty: 2 }]);
  const total = items.reduce((sum, it) =&gt; sum + it.price * it.qty, 0);   // 衍生值，不存成 state
  return (
    &lt;div&gt;
      &lt;Counter label="A" /&gt; &lt;Counter label="B" /&gt;
      &lt;ul&gt;{items.map(it =&gt; &lt;li key={it.name}&gt;{it.name} × {it.qty}&lt;/li&gt;)}&lt;/ul&gt;
      &lt;p&gt;總金額：{total} 元&lt;/p&gt;
      &lt;button onClick={() =&gt; setItems(items.map(it =&gt; it.name === '咖啡' ? { ...it, qty: it.qty + 1 } : it))}&gt;再來一杯咖啡&lt;/button&gt;
    &lt;/div&gt;
  );
}</pre>` }
  ],
  keypoints: [
    '一般變數改變不會重新渲染，且每次渲染都會重設；要記住的資料用 useState。',
    'const [value, setValue] = useState(初始值)；呼叫 set 函式會安排重新渲染。',
    '事件要傳函式：onClick={handle} 或 onClick={() => remove(id)}，不要寫 onClick={handle()}。',
    'state 是快照，同一事件中的多次 set 會批次處理；根據舊值更新用 setCount(c => c + 1)。',
    '物件與陣列 state 要建立新的：展開運算子、filter、map，不要用 push、splice 或直接賦值。',
    '能算出來的值不要存成 state；同一元件的每個實例各有獨立的 state。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 45,
  title: '列表與 key',
  summary: '用 map 渲染列表、key 的作用與選擇、用 index 當 key 的問題、篩選與排序衍生資料、空狀態處理，以及把列表項目拆成元件。',
  sections: [
    { id: 'map', title: '用 map 渲染列表', html: `
<p>JSX 中可以放元素的陣列，所以用 <code>map</code> 把資料陣列轉成元素陣列，就能渲染列表：</p>
<pre class="jsx">const courses = [
  { id: 'c1', title: 'React 入門', hours: 10, level: '初級' },
  { id: 'c2', title: 'TypeScript', hours: 8, level: '中級' },
  { id: 'c3', title: 'Next.js 實戰', hours: 12, level: '進階' }
];

export default function App() {
  return (
    &lt;div&gt;
      &lt;h3&gt;課程列表（共 {courses.length} 門）&lt;/h3&gt;
      &lt;ul&gt;
        {courses.map(c =&gt; (
          &lt;li key={c.id}&gt;
            {c.title}：{c.hours} 小時，&lt;em&gt;{c.level}&lt;/em&gt;
          &lt;/li&gt;
        ))}
      &lt;/ul&gt;
      &lt;p&gt;總時數：{courses.reduce((s, c) =&gt; s + c.hours, 0)} 小時&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>
<p>map 的箭頭函式如果用大括號 <code>{ }</code>，記得要寫 <code>return</code>；用小括號 <code>( )</code> 則會直接回傳裡面的 JSX。</p>` },
    { id: 'key', title: 'key 的作用', html: `
<p>列表中的每個元素都需要一個 <b>key</b>，讓 React 在列表新增、刪除、重新排序時，知道哪個元素對應哪筆資料。key 的規則：</p>
<table>
<tr><th>規則</th><th>說明</th></tr>
<tr><td>在兄弟元素中唯一</td><td>同一個列表中不能重複；不同列表可以重複</td></tr>
<tr><td>穩定不變</td><td>同一筆資料每次渲染都要是同一個 key；不要用 <code>Math.random()</code></td></tr>
<tr><td>來自資料本身</td><td>最好用資料庫的 id；新增資料時可以用 <code>crypto.randomUUID()</code> 產生</td></tr>
<tr><td>放在 map 最外層的元素</td><td>如果 map 回傳 <code>&lt;ProductCard /&gt;</code>，key 要寫在 ProductCard 上，而不是元件內部的 div</td></tr>
</table>
<p>下面示範用 index 當 key 的問題：在每個輸入框打一些字，然後按「在最前面新增」。</p>
<pre class="jsx">import { useState } from 'react';

function Row({ name }) {
  return &lt;li&gt;{name} &lt;input placeholder={'給 ' + name + ' 的備註'} /&gt;&lt;/li&gt;;
}

export default function App() {
  const [list, setList] = useState([{ id: 1, name: '小明' }, { id: 2, name: '小華' }]);
  const [next, setNext] = useState(3);

  function addFirst() {
    setList([{ id: next, name: '新同學' + next }, ...list]);
    setNext(next + 1);
  }

  return (
    &lt;div&gt;
      &lt;button onClick={addFirst}&gt;在最前面新增&lt;/button&gt;
      &lt;div style={{ display: 'flex', gap: 24 }}&gt;
        &lt;div&gt;&lt;b&gt;key = index（錯誤）&lt;/b&gt;&lt;ul&gt;{list.map((p, i) =&gt; &lt;Row key={i} name={p.name} /&gt;)}&lt;/ul&gt;&lt;/div&gt;
        &lt;div&gt;&lt;b&gt;key = id（正確）&lt;/b&gt;&lt;ul&gt;{list.map(p =&gt; &lt;Row key={p.id} name={p.name} /&gt;)}&lt;/ul&gt;&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}</pre>
<p>用 index 當 key 時，新增到最前面後所有 index 都往後移了一格，React 以為「第 0 個」還是原本的元件，於是輸入框中的備註跑到別人身上。用 id 當 key，備註會跟著正確的人。</p>
<div class="box exam"><b class="t">什麼時候可以用 index</b>列表是固定的、不會新增刪除或重新排序，而且項目沒有自己的 state（例如純顯示的文字）。其他情況一律用穩定的 id。</div>` },
    { id: 'derive', title: '篩選、排序與搜尋', html: `
<p>篩選與排序的結果是<b>衍生資料</b>，不用存成 state，渲染時從原始資料計算即可：</p>
<pre class="jsx">import { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: '無線滑鼠', price: 590, cat: '周邊' },
  { id: 2, name: '機械鍵盤', price: 2490, cat: '周邊' },
  { id: 3, name: '27 吋螢幕', price: 6990, cat: '螢幕' },
  { id: 4, name: '筆電散熱架', price: 890, cat: '配件' },
  { id: 5, name: 'USB-C 集線器', price: 1290, cat: '配件' }
];

export default function App() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('全部');
  const [sort, setSort] = useState('none');

  let shown = PRODUCTS.filter(p =&gt; p.name.includes(q) &amp;&amp; (cat === '全部' || p.cat === cat));
  if (sort === 'asc') shown = [...shown].sort((a, b) =&gt; a.price - b.price);
  if (sort === 'desc') shown = [...shown].sort((a, b) =&gt; b.price - a.price);

  return (
    &lt;div&gt;
      &lt;input value={q} onChange={e =&gt; setQ(e.target.value)} placeholder="搜尋商品" /&gt;
      &lt;select value={cat} onChange={e =&gt; setCat(e.target.value)}&gt;
        {['全部', '周邊', '螢幕', '配件'].map(c =&gt; &lt;option key={c}&gt;{c}&lt;/option&gt;)}
      &lt;/select&gt;
      &lt;select value={sort} onChange={e =&gt; setSort(e.target.value)}&gt;
        &lt;option value="none"&gt;預設排序&lt;/option&gt;
        &lt;option value="asc"&gt;價格低到高&lt;/option&gt;
        &lt;option value="desc"&gt;價格高到低&lt;/option&gt;
      &lt;/select&gt;
      {shown.length === 0
        ? &lt;p&gt;找不到符合「{q}」的商品。&lt;/p&gt;
        : &lt;ul&gt;{shown.map(p =&gt; &lt;li key={p.id}&gt;{p.name}　NT$ {p.price}&lt;/li&gt;)}&lt;/ul&gt;}
    &lt;/div&gt;
  );
}</pre>
<div class="box tip"><b class="t">別忘了空狀態</b>列表為空時要顯示提示（「目前沒有資料」「找不到結果」），而不是一片空白，這是作品集中常被忽略的細節。</div>` },
    { id: 'item', title: '列表項目拆成元件', html: `
<p>當每個項目有自己的畫面與操作時，拆成獨立的元件，並把操作函式從父元件傳下去：</p>
<pre class="jsx">import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    &lt;li style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#999' : 'inherit' }}&gt;
      &lt;input type="checkbox" checked={task.done} onChange={() =&gt; onToggle(task.id)} /&gt;
      {task.title}
      &lt;button onClick={() =&gt; onDelete(task.id)}&gt;刪除&lt;/button&gt;
    &lt;/li&gt;
  );
}

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: '讀完第 5 章', done: true },
    { id: 2, title: '練習 map 與 key', done: false },
    { id: 3, title: '寫一個小作品', done: false }
  ]);

  const toggle = id =&gt; setTasks(tasks.map(t =&gt; t.id === id ? { ...t, done: !t.done } : t));
  const remove = id =&gt; setTasks(tasks.filter(t =&gt; t.id !== id));
  const left = tasks.filter(t =&gt; !t.done).length;

  return (
    &lt;div&gt;
      &lt;ul style={{ listStyle: 'none', padding: 0 }}&gt;
        {tasks.map(t =&gt; &lt;TaskItem key={t.id} task={t} onToggle={toggle} onDelete={remove} /&gt;)}
      &lt;/ul&gt;
      &lt;p&gt;還有 {left} 件未完成&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>
<p>資料（tasks）和修改資料的函式都在父元件，子元件 TaskItem 只負責顯示，並在使用者操作時呼叫 <code>onToggle</code>、<code>onDelete</code> 通知父元件。這就是單向資料流：<b>資料往下傳，事件往上傳</b>。</p>` }
  ],
  keypoints: [
    '用 map 把資料陣列轉成元素陣列來渲染列表。',
    '每個列表元素都要有 key，在兄弟元素中唯一且穩定，最好使用資料的 id。',
    '新增、刪除、排序的列表不要用 index 當 key，否則元件的 state 會對錯資料。',
    'key 要寫在 map 回傳的最外層元素上。',
    '篩選、排序、搜尋結果是衍生資料，渲染時計算即可，不用存成 state；記得處理空狀態。',
    '資料往下傳、事件往上傳：子元件透過 onXxx 函式通知父元件修改資料。'
  ]
},
{
  id: 'c06', subject: 1, minutes: 55,
  title: '表單處理',
  summary: '受控元件、處理多個欄位、核取方塊與下拉選單等各種輸入元素、表單送出與 preventDefault、即時驗證與錯誤訊息，以及 useId 與無障礙的 label。',
  sections: [
    { id: 'controlled', title: '受控元件', html: `
<p>React 中的表單通常寫成<b>受控元件（Controlled Component）</b>：輸入框的值由 state 決定（<code>value</code>），使用者輸入時透過 <code>onChange</code> 更新 state。這樣 state 永遠是唯一的資料來源：</p>
<pre class="jsx">import { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');
  return (
    &lt;div&gt;
      &lt;input value={name} onChange={e =&gt; setName(e.target.value)} placeholder="你的名字" /&gt;
      &lt;button onClick={() =&gt; setName('')}&gt;清除&lt;/button&gt;
      &lt;p&gt;{name ? '你好，' + name + '！' : '請輸入名字'}&lt;/p&gt;
      &lt;p&gt;大寫：{name.toUpperCase()}，字數：{name.length}&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>
<p>因為值在 state 中，可以隨時讀取、清除、轉換格式或驗證。如果只寫 <code>value</code> 而沒有 <code>onChange</code>，輸入框會變成無法輸入的唯讀欄位。</p>` },
    { id: 'multi', title: '處理多個欄位', html: `
<p>欄位多時，把表單資料放在一個物件中，用 input 的 <code>name</code> 屬性搭配計算屬性名稱 <code>[name]</code>，一個函式處理所有欄位：</p>
<pre class="jsx">import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    name: '', email: '', plan: 'basic', agree: false, note: '', size: 'M'
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  return (
    &lt;div style={{ display: 'grid', gap: 6, maxWidth: 360 }}&gt;
      &lt;input name="name" value={form.name} onChange={handleChange} placeholder="姓名" /&gt;
      &lt;input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" /&gt;
      &lt;select name="plan" value={form.plan} onChange={handleChange}&gt;
        &lt;option value="basic"&gt;基本方案&lt;/option&gt;
        &lt;option value="pro"&gt;專業方案&lt;/option&gt;
      &lt;/select&gt;
      &lt;div&gt;
        尺寸：{['S', 'M', 'L'].map(s =&gt; (
          &lt;label key={s}&gt;&lt;input type="radio" name="size" value={s} checked={form.size === s} onChange={handleChange} /&gt;{s} &lt;/label&gt;
        ))}
      &lt;/div&gt;
      &lt;textarea name="note" value={form.note} onChange={handleChange} placeholder="備註" rows={2} /&gt;
      &lt;label&gt;&lt;input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} /&gt; 我同意服務條款&lt;/label&gt;
      &lt;div style={{ background: '#f4f4f4', padding: 8, whiteSpace: 'pre', fontFamily: 'monospace' }}&gt;{JSON.stringify(form, null, 2)}&lt;/div&gt;
    &lt;/div&gt;
  );
}</pre>
<table>
<tr><th>元素</th><th>綁定的屬性</th><th>讀取的值</th></tr>
<tr><td>input（文字、數字、email）、textarea</td><td><code>value</code></td><td><code>e.target.value</code>（一律是字串）</td></tr>
<tr><td>select</td><td><code>value</code>（寫在 select 上，不是 option 的 selected）</td><td><code>e.target.value</code></td></tr>
<tr><td>checkbox</td><td><code>checked</code></td><td><code>e.target.checked</code></td></tr>
<tr><td>radio</td><td><code>checked={form.size === 'M'}</code></td><td><code>e.target.value</code></td></tr>
</table>
<div class="box warn"><b class="t">數字欄位得到的是字串</b><code>&lt;input type="number"&gt;</code> 的 <code>e.target.value</code> 仍然是字串，計算前要用 <code>Number(value)</code> 轉換，否則 <code>'1' + 2</code> 會變成 <code>'12'</code>。</div>` },
    { id: 'submit', title: '送出表單與驗證', html: `
<p>表單用 <code>onSubmit</code> 處理送出，並呼叫 <code>e.preventDefault()</code> 阻止瀏覽器重新整理頁面。這樣按 Enter 也能送出：</p>
<pre class="jsx">import { useState } from 'react';

function validate({ email, password }) {
  const errors = {};
  if (!email) errors.email = '請輸入 Email';
  else if (!/^\\S+@\\S+\\.\\S+$/.test(email)) errors.email = 'Email 格式不正確';
  if (password.length &lt; 8) errors.password = '密碼至少 8 個字元';
  return errors;
}

export default function App() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [done, setDone] = useState(false);
  const errors = validate(form);                      // 衍生值：每次渲染重新計算
  const valid = Object.keys(errors).length === 0;

  const change = e =&gt; setForm({ ...form, [e.target.name]: e.target.value });
  const blur = e =&gt; setTouched({ ...touched, [e.target.name]: true });

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (valid) setDone(true);
  }

  if (done) return &lt;p&gt;✅ 註冊成功，歡迎 {form.email}！ &lt;button onClick={() =&gt; setDone(false)}&gt;返回&lt;/button&gt;&lt;/p&gt;;

  return (
    &lt;form onSubmit={handleSubmit} style={{ display: 'grid', gap: 4, maxWidth: 320 }}&gt;
      &lt;input name="email" value={form.email} onChange={change} onBlur={blur} placeholder="Email" /&gt;
      {touched.email &amp;&amp; errors.email &amp;&amp; &lt;small style={{ color: 'crimson' }}&gt;{errors.email}&lt;/small&gt;}
      &lt;input name="password" type="password" value={form.password} onChange={change} onBlur={blur} placeholder="密碼" /&gt;
      {touched.password &amp;&amp; errors.password &amp;&amp; &lt;small style={{ color: 'crimson' }}&gt;{errors.password}&lt;/small&gt;}
      &lt;button type="submit"&gt;註冊&lt;/button&gt;
      &lt;small&gt;密碼強度：{'●'.repeat(Math.min(form.password.length, 12))}&lt;/small&gt;
    &lt;/form&gt;
  );
}</pre>
<p>錯誤訊息是從表單資料計算出來的衍生值，不用另外存成 state。用 <code>touched</code> 記錄使用者離開過哪些欄位，避免一打開表單就滿滿的紅字。</p>
<div class="box warn"><b class="t">前端驗證不能取代後端驗證</b>前端驗證是為了使用者體驗，惡意使用者可以繞過瀏覽器直接送請求。伺服器端一定要再驗證一次。大型表單可以使用 React Hook Form 搭配 Zod 等套件。</div>` },
    { id: 'a11y', title: 'label、useId 與非受控元件', html: `
<p>每個輸入框都應該有對應的 <code>&lt;label&gt;</code>，點擊文字就能聚焦輸入框，螢幕閱讀器也能正確朗讀。元件可能在頁面上出現多次，id 不能寫死，用 <code>useId</code> 產生唯一的 id：</p>
<pre class="jsx">import { useId, useState } from 'react';

function Field({ label, type = 'text' }) {
  const id = useId();
  const [v, setV] = useState('');
  return (
    &lt;div style={{ margin: '6px 0' }}&gt;
      &lt;label htmlFor={id}&gt;{label}：&lt;/label&gt;
      &lt;input id={id} type={type} value={v} onChange={e =&gt; setV(e.target.value)} /&gt;
    &lt;/div&gt;
  );
}

export default function App() {
  return (
    &lt;&gt;
      &lt;Field label="姓名" /&gt;
      &lt;Field label="電話" type="tel" /&gt;
      &lt;p style={{ color: 'gray' }}&gt;點擊左邊的文字，游標會跳到對應的輸入框。&lt;/p&gt;
    &lt;/&gt;
  );
}</pre>
<p>另一種寫法是<b>非受控元件</b>：不綁定 value，送出時才從 DOM 讀取值（用 <code>defaultValue</code> 設定初始值，搭配 <code>useRef</code> 或 <code>new FormData(e.target)</code> 讀取）。簡單的表單可以這樣寫，但需要即時驗證、連動欄位時，受控元件比較方便。</p>
<pre class="jsx">export default function App() {
  function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log('送出的資料：', data);
  }
  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input name="city" defaultValue="台北" /&gt;
      &lt;input name="zip" placeholder="郵遞區號" /&gt;
      &lt;button&gt;送出（看下方 console）&lt;/button&gt;
    &lt;/form&gt;
  );
}</pre>` }
  ],
  keypoints: [
    '受控元件：value 綁定 state、onChange 更新 state，state 是唯一的資料來源。',
    '多個欄位放在一個物件中，用 [e.target.name] 計算屬性名稱以單一函式處理。',
    'checkbox 綁 checked 並讀 e.target.checked；select 的 value 寫在 select 上。',
    'input 的值一律是字串，數字要用 Number() 轉換。',
    '表單用 onSubmit 並呼叫 e.preventDefault()；錯誤訊息是衍生值，前端驗證不能取代後端驗證。',
    '用 label 的 htmlFor 搭配 useId 產生的 id；簡單表單可用非受控元件搭配 FormData。'
  ]
}
);
