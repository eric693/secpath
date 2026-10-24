/* 網頁開發 版面篇：HTML 與 CSS
   <pre class="web"> 為可在網頁上即時預覽的 HTML／CSS 範例；<pre class="out"> 為一般程式碼
   程式碼內的 < > & 寫成 &lt; &gt; &amp; */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 35,
  title: '網頁如何運作',
  summary: '瀏覽器與伺服器、網址的組成、HTTP 請求與回應、HTML／CSS／JavaScript 的分工、開發人員工具、VS Code 開發環境，以及寫出第一個網頁。',
  sections: [
    { id: 'browser', title: '從輸入網址到看到網頁', html: `
<p>在瀏覽器輸入 <code>https://www.example.com/products?id=5</code> 按下 Enter，背後發生了這些事：</p>
<div class="flow"><span>DNS 查詢網域的 IP</span><span>與伺服器建立連線（HTTPS 加密）</span><span>送出 HTTP 請求</span><span>伺服器回應 HTML</span><span>瀏覽器再下載 CSS、JS、圖片</span><span>畫出網頁</span></div>
<h3>網址的組成</h3>
<table>
<tr><th>部分</th><th>範例</th><th>意義</th></tr>
<tr><td>通訊協定</td><td><code>https://</code></td><td>HTTPS 是加密的 HTTP</td></tr>
<tr><td>網域</td><td><code>www.example.com</code></td><td>由 DNS 轉換成伺服器的 IP</td></tr>
<tr><td>路徑</td><td><code>/products</code></td><td>網站中的哪一頁或哪個資源</td></tr>
<tr><td>查詢參數</td><td><code>?id=5</code></td><td>傳給伺服器的額外資訊，多個用 &amp; 連接</td></tr>
<tr><td>錨點</td><td><code>#reviews</code></td><td>頁面中的位置，不會傳給伺服器</td></tr>
</table>
<h3>HTTP 請求與回應</h3>
<table>
<tr><th>方法</th><th>用途</th><th>狀態碼</th><th>意義</th></tr>
<tr><td><code>GET</code></td><td>取得資料（看網頁、查詢）</td><td>200</td><td>成功</td></tr>
<tr><td><code>POST</code></td><td>送出資料（註冊、下單）</td><td>301／302</td><td>重新導向</td></tr>
<tr><td><code>PUT</code>／<code>PATCH</code></td><td>修改資料</td><td>404</td><td>找不到</td></tr>
<tr><td><code>DELETE</code></td><td>刪除資料</td><td>500</td><td>伺服器錯誤</td></tr>
</table>` },
    { id: 'roles', title: 'HTML、CSS、JavaScript 的分工', html: `
<div class="concepts">
  <div class="concept"><b>HTML 結構</b><span>標記內容是什麼：標題、段落、圖片、按鈕。像房子的鋼筋與隔間。</span></div>
  <div class="concept"><b>CSS 樣式</b><span>決定長什麼樣子：顏色、字型、排版、動畫。像室內裝潢。</span></div>
  <div class="concept"><b>JavaScript 互動</b><span>讓網頁會動：點按鈕、送出表單、載入資料。像水電與家電。</span></div>
</div>
<p>下面是三者合作的最小例子。按下按鈕試試看，也可以直接修改程式碼，預覽會自動更新：</p>
<pre class="web">&lt;h1 class="title"&gt;我的第一個網頁&lt;/h1&gt;
&lt;p&gt;點了 &lt;b id="count"&gt;0&lt;/b&gt; 次&lt;/p&gt;
&lt;button id="btn"&gt;點我&lt;/button&gt;

&lt;style&gt;
  .title { color: #1f4e8c; }
  button { padding: 8px 16px; border-radius: 6px; border: 0; background: #1f4e8c; color: white; }
&lt;/style&gt;

&lt;script&gt;
  let n = 0;
  document.querySelector('#btn').addEventListener('click', () =&gt; {
    n++;
    document.querySelector('#count').textContent = n;
  });
&lt;/script&gt;</pre>
<div class="box tip"><b class="t">前端與後端</b>在瀏覽器執行的 HTML、CSS、JavaScript 稱為<b>前端</b>；在伺服器處理資料、連接資料庫的程式（Python、Node.js、Java、PHP）稱為<b>後端</b>。前端透過 API 向後端要資料，第 10 章會實作。</div>` },
    { id: 'devtools', title: '開發人員工具', html: `
<p>瀏覽器內建的<b>開發人員工具（DevTools）</b>是前端工程師每天用的工具。在 Chrome 按 <kbd>F12</kbd>（Mac：<kbd>⌘</kbd>＋<kbd>⌥</kbd>＋<kbd>I</kbd>），或在網頁上按右鍵選「檢查」：</p>
<table>
<tr><th>面板</th><th>用途</th></tr>
<tr><td><b>Elements</b></td><td>查看與即時修改 HTML、CSS，觀察盒模型</td></tr>
<tr><td><b>Console</b></td><td>看 JavaScript 錯誤訊息與 console.log 輸出，也能直接輸入程式</td></tr>
<tr><td><b>Network</b></td><td>看網頁載入了哪些檔案、API 請求與回應、花了多久</td></tr>
<tr><td><b>Application</b></td><td>查看 Cookie、localStorage</td></tr>
<tr><td><b>Lighthouse</b></td><td>評估效能、無障礙、SEO 分數</td></tr>
</table>
<p>點左上角的<b>裝置切換按鈕</b>可以模擬手機畫面，檢查響應式設計。</p>
<div class="box memo"><b class="t">試試看</b>現在就在這個頁面按 F12，在 Elements 面板中找到這段文字，把它改成別的內容。重新整理後會恢復，因為你只是改了瀏覽器裡的副本。</div>` },
    { id: 'setup', title: '開發環境與第一個網頁檔案', html: `
<ol>
<li>安裝 <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">Visual Studio Code</a>，並安裝延伸模組 <b>Live Server</b>（存檔後瀏覽器自動重新整理）、<b>Prettier</b>（自動排版）。</li>
<li>建立專案資料夾，結構建議如下：</li>
</ol>
<pre class="out">my-site/
├── index.html        ← 首頁一定叫 index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── logo.png</pre>
<ol start="3">
<li>在 index.html 輸入 <code>!</code> 再按 Tab，VS Code 會自動產生 HTML 骨架。</li>
<li>按右下角的「Go Live」，瀏覽器就會開啟你的網頁。</li>
</ol>
<pre class="out">&lt;!DOCTYPE html&gt;
&lt;html lang="zh-Hant"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;我的網站&lt;/title&gt;
  &lt;link rel="stylesheet" href="css/style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Hello!&lt;/h1&gt;
  &lt;script src="js/main.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
<div class="box warn"><b class="t">檔名的好習慣</b>檔名一律用小寫英文、數字與連字號，例如 <code>about-us.html</code>。不要用空白與中文，伺服器（Linux）也會區分大小寫：<code>Logo.png</code> 和 <code>logo.png</code> 是不同的檔案。</div>` }
  ],
  keypoints: [
    '輸入網址後，瀏覽器透過 DNS 找到伺服器、送出 HTTP 請求，再下載 HTML、CSS、JS 畫出網頁。',
    '網址由通訊協定、網域、路徑、查詢參數與錨點組成。',
    'GET 取得資料、POST 送出資料；狀態碼 200 成功、404 找不到、500 伺服器錯誤。',
    'HTML 負責結構、CSS 負責樣式、JavaScript 負責互動。',
    '開發人員工具（F12）的 Elements、Console、Network 是前端最常用的除錯工具。',
    '首頁命名為 index.html，檔名使用小寫英文與連字號。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: 'HTML 基礎與語意化',
  summary: '標籤、元素與屬性、文件結構、標題與段落、文字標籤、超連結與相對路徑、圖片與替代文字、清單，以及 header、nav、main、article 等語意化標籤。',
  sections: [
    { id: 'tags', title: '標籤、元素與屬性', html: `
<pre class="out">&lt;a href="https://developer.mozilla.org" target="_blank"&gt;MDN 文件&lt;/a&gt;
 └┬┘ └──────────┬──────────────────┘ └──────┬──────┘└──┬──┘└┬┘
 開始標籤        屬性（名稱="值"）              屬性        內容  結束標籤</pre>
<ul>
<li><b>元素（Element）</b>＝開始標籤＋內容＋結束標籤。</li>
<li><b>屬性（Attribute）</b>寫在開始標籤中，提供額外資訊，值用雙引號包起來。</li>
<li>有些元素沒有內容也沒有結束標籤，稱為<b>空元素</b>：<code>&lt;img&gt;</code>、<code>&lt;br&gt;</code>、<code>&lt;input&gt;</code>、<code>&lt;meta&gt;</code>。</li>
<li>元素可以巢狀包住其他元素，但要<b>先開後關</b>：<code>&lt;p&gt;&lt;b&gt;粗體&lt;/b&gt;&lt;/p&gt;</code>，不能交錯。</li>
<li>標籤名稱不分大小寫，習慣寫小寫。</li>
</ul>
<h3>常用全域屬性</h3>
<table>
<tr><th>屬性</th><th>用途</th></tr>
<tr><td><code>id</code></td><td>唯一識別碼，一頁中不可重複，給 JavaScript 或錨點使用</td></tr>
<tr><td><code>class</code></td><td>分類名稱，可重複、可多個（空白分隔），給 CSS 使用</td></tr>
<tr><td><code>style</code></td><td>行內樣式（不建議大量使用）</td></tr>
<tr><td><code>title</code></td><td>滑鼠移上去顯示的提示文字</td></tr>
<tr><td><code>lang</code></td><td>內容語言，例如 <code>zh-Hant</code>（繁體中文）</td></tr>
<tr><td><code>data-*</code></td><td>自訂資料，例如 <code>data-id="5"</code>，給 JavaScript 讀取</td></tr>
</table>` },
    { id: 'text', title: '標題、段落與文字', html: `
<pre class="web">&lt;h1&gt;一級標題（一頁通常只有一個）&lt;/h1&gt;
&lt;h2&gt;二級標題&lt;/h2&gt;
&lt;h3&gt;三級標題&lt;/h3&gt;
&lt;p&gt;這是一個段落。HTML 會把連續的空白與換行
   合併成一個空白，要換行請用 br&lt;br&gt;像這樣。&lt;/p&gt;
&lt;p&gt;&lt;strong&gt;重要的內容&lt;/strong&gt;、&lt;em&gt;強調的語氣&lt;/em&gt;、&lt;mark&gt;標記重點&lt;/mark&gt;、&lt;code&gt;程式碼&lt;/code&gt;&lt;/p&gt;
&lt;blockquote&gt;引用別人的一段話&lt;/blockquote&gt;
&lt;hr&gt;
&lt;!-- 這是註解，不會顯示在畫面上 --&gt;
&lt;p&gt;特殊符號要用實體字元：&amp;lt; &amp;gt; &amp;amp; &amp;copy;&lt;/p&gt;</pre>
<div class="box warn"><b class="t">不要為了字體大小選標題</b>h1～h6 代表內容的<b>階層</b>，不是字體大小。搜尋引擎與螢幕閱讀器靠標題理解頁面結構，要依序使用，不要跳級；想調整大小請用 CSS。</div>
<p><code>&lt;strong&gt;</code> 和 <code>&lt;b&gt;</code> 看起來都是粗體，但 strong 表示「重要」，有語意；b 只是視覺上的粗體。同理 <code>&lt;em&gt;</code>（強調）和 <code>&lt;i&gt;</code>（斜體）。</p>` },
    { id: 'links', title: '超連結與路徑', html: `
<pre class="web">&lt;p&gt;&lt;a href="https://www.104.com.tw" target="_blank" rel="noopener"&gt;在新分頁開啟 104&lt;/a&gt;&lt;/p&gt;
&lt;p&gt;&lt;a href="about.html"&gt;同資料夾的 about.html&lt;/a&gt;&lt;/p&gt;
&lt;p&gt;&lt;a href="#contact"&gt;跳到本頁的聯絡區塊&lt;/a&gt;&lt;/p&gt;
&lt;p&gt;&lt;a href="mailto:hello@example.com"&gt;寄信給我&lt;/a&gt;　&lt;a href="tel:+886212345678"&gt;打電話&lt;/a&gt;&lt;/p&gt;
&lt;h3 id="contact"&gt;聯絡我們&lt;/h3&gt;</pre>
<h3>絕對路徑與相對路徑</h3>
<p>假設目前檔案是 <code>my-site/blog/post.html</code>：</p>
<table>
<tr><th>寫法</th><th>指向</th></tr>
<tr><td><code>https://example.com/a.png</code></td><td>完整網址（絕對路徑）</td></tr>
<tr><td><code>photo.png</code></td><td>同資料夾：my-site/blog/photo.png</td></tr>
<tr><td><code>images/photo.png</code></td><td>子資料夾：my-site/blog/images/photo.png</td></tr>
<tr><td><code>../index.html</code></td><td>上一層：my-site/index.html</td></tr>
<tr><td><code>/css/style.css</code></td><td>網站根目錄開始：網域/css/style.css</td></tr>
</table>
<div class="box tip"><b class="t">安全提醒</b>用 <code>target="_blank"</code> 開新分頁時，加上 <code>rel="noopener"</code> 可以避免新頁面透過 window.opener 操控原本的頁面（新版瀏覽器已預設套用，但寫上更保險）。</div>` },
    { id: 'img', title: '圖片與清單', html: `
<pre class="web">&lt;img src="https://picsum.photos/id/1062/320/180" alt="一隻戴著圍巾的狗" width="320" height="180"&gt;

&lt;h3&gt;無序清單&lt;/h3&gt;
&lt;ul&gt;
  &lt;li&gt;HTML&lt;/li&gt;
  &lt;li&gt;CSS&lt;/li&gt;
  &lt;li&gt;JavaScript&lt;/li&gt;
&lt;/ul&gt;
&lt;h3&gt;有序清單&lt;/h3&gt;
&lt;ol&gt;
  &lt;li&gt;安裝 VS Code&lt;/li&gt;
  &lt;li&gt;建立 index.html&lt;/li&gt;
  &lt;li&gt;用 Live Server 預覽&lt;/li&gt;
&lt;/ol&gt;</pre>
<ul>
<li><b>alt 替代文字</b>：圖片載入失敗或使用螢幕閱讀器時會讀出這段文字，也有助於 SEO。純裝飾的圖片可以寫 <code>alt=""</code>，但不能省略屬性。</li>
<li>寫上 <code>width</code> 與 <code>height</code>，瀏覽器可以先預留空間，避免圖片載入後版面跳動。</li>
<li>大圖片可加 <code>loading="lazy"</code>，捲動到附近才載入。</li>
<li>照片用 JPG／WebP，圖示與透明背景用 PNG／SVG，WebP 與 AVIF 檔案最小。</li>
</ul>` },
    { id: 'semantic', title: '語意化標籤', html: `
<p>早期網頁全部用 <code>&lt;div&gt;</code> 排版。HTML5 新增了<b>語意化標籤</b>，讓瀏覽器、搜尋引擎與螢幕閱讀器知道每個區塊的用途：</p>
<pre class="out">&lt;body&gt;
  &lt;header&gt;  網站標誌、標題   &lt;nav&gt; 主要導覽連結 &lt;/nav&gt;  &lt;/header&gt;
  &lt;main&gt;    頁面主要內容（一頁只有一個）
    &lt;article&gt;  可獨立存在的內容，例如一篇文章、一則商品
      &lt;section&gt; 文章中的一個段落主題 &lt;/section&gt;
    &lt;/article&gt;
    &lt;aside&gt;   側欄、相關連結 &lt;/aside&gt;
  &lt;/main&gt;
  &lt;footer&gt;  版權、聯絡資訊 &lt;/footer&gt;
&lt;/body&gt;</pre>
<pre class="web">&lt;header&gt;
  &lt;strong&gt;小明的作品集&lt;/strong&gt;
  &lt;nav&gt;&lt;a href="#works"&gt;作品&lt;/a&gt; ｜ &lt;a href="#about"&gt;關於我&lt;/a&gt;&lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article id="works"&gt;
    &lt;h2&gt;待辦清單 App&lt;/h2&gt;
    &lt;p&gt;使用 JavaScript 與 localStorage 製作。&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;&lt;small&gt;&amp;copy; 2026 小明&lt;/small&gt;&lt;/footer&gt;</pre>
<div class="box exam"><b class="t">div 與 span</b>沒有適合的語意標籤時才用 <code>&lt;div&gt;</code>（區塊）和 <code>&lt;span&gt;</code>（行內）當作通用容器。面試常問「什麼是語意化 HTML、有什麼好處」：可讀性、SEO、無障礙。</div>` }
  ],
  keypoints: [
    '元素由開始標籤、內容、結束標籤組成；img、br、input 是沒有結束標籤的空元素。',
    'id 一頁中唯一、class 可重複且可多個；屬性寫在開始標籤中。',
    'h1～h6 表示內容階層而非字體大小；strong、em 有語意，b、i 只有視覺效果。',
    '相對路徑以目前檔案為準，../ 代表上一層；/ 開頭從網站根目錄開始。',
    'img 一定要寫 alt，並建議寫上 width 與 height 避免版面跳動。',
    '語意化標籤（header、nav、main、article、section、aside、footer）有助於 SEO 與無障礙。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 40,
  title: '表格、表單與無障礙',
  summary: '表格結構與合併儲存格、表單與各種輸入欄位、label 的重要性、HTML 內建驗證、按鈕類型，以及無障礙設計的基本原則。',
  sections: [
    { id: 'table', title: '表格', html: `
<pre class="web">&lt;table&gt;
  &lt;caption&gt;2024 上半年營收&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;&lt;th&gt;月份&lt;/th&gt;&lt;th&gt;營收&lt;/th&gt;&lt;th&gt;成長&lt;/th&gt;&lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;&lt;td&gt;1 月&lt;/td&gt;&lt;td&gt;16,257&lt;/td&gt;&lt;td&gt;—&lt;/td&gt;&lt;/tr&gt;
    &lt;tr&gt;&lt;td&gt;2 月&lt;/td&gt;&lt;td&gt;16,280&lt;/td&gt;&lt;td&gt;0.1%&lt;/td&gt;&lt;/tr&gt;
    &lt;tr&gt;&lt;td colspan="2"&gt;合計 32,537&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
&lt;style&gt;
  table { border-collapse: collapse; }
  th, td { border: 1px solid #ccc; padding: 6px 12px; }
  th { background: #f2f4f7; }
&lt;/style&gt;</pre>
<table>
<tr><th>標籤</th><th>意義</th></tr>
<tr><td><code>&lt;tr&gt;</code></td><td>一列（table row）</td></tr>
<tr><td><code>&lt;th&gt;</code>／<code>&lt;td&gt;</code></td><td>標題儲存格／資料儲存格</td></tr>
<tr><td><code>&lt;thead&gt;</code>／<code>&lt;tbody&gt;</code></td><td>表頭與表身分組</td></tr>
<tr><td><code>colspan</code>／<code>rowspan</code></td><td>橫向／直向合併儲存格</td></tr>
</table>
<div class="box warn"><b class="t">表格只用來放表格資料</b>早期常用表格排版，現在請用 CSS Flexbox 與 Grid。表格在手機上容易超出畫面，可以外包一層 <code>overflow-x: auto</code> 的容器讓它橫向捲動。</div>` },
    { id: 'form', title: '表單與輸入欄位', html: `
<pre class="web">&lt;form id="signup"&gt;
  &lt;p&gt;&lt;label for="name"&gt;姓名&lt;/label&gt;&lt;br&gt;
     &lt;input id="name" name="name" required placeholder="王小明"&gt;&lt;/p&gt;
  &lt;p&gt;&lt;label for="email"&gt;Email&lt;/label&gt;&lt;br&gt;
     &lt;input id="email" name="email" type="email" required&gt;&lt;/p&gt;
  &lt;p&gt;&lt;label for="age"&gt;年齡&lt;/label&gt;&lt;br&gt;
     &lt;input id="age" name="age" type="number" min="15" max="99"&gt;&lt;/p&gt;
  &lt;p&gt;&lt;label for="course"&gt;想學的課程&lt;/label&gt;&lt;br&gt;
     &lt;select id="course" name="course"&gt;
       &lt;option value="web"&gt;網頁開發&lt;/option&gt;
       &lt;option value="sql"&gt;SQL&lt;/option&gt;
     &lt;/select&gt;&lt;/p&gt;
  &lt;p&gt;經驗：
     &lt;label&gt;&lt;input type="radio" name="level" value="0" checked&gt; 零基礎&lt;/label&gt;
     &lt;label&gt;&lt;input type="radio" name="level" value="1"&gt; 學過一點&lt;/label&gt;&lt;/p&gt;
  &lt;p&gt;&lt;label&gt;&lt;input type="checkbox" name="news"&gt; 訂閱電子報&lt;/label&gt;&lt;/p&gt;
  &lt;p&gt;&lt;textarea name="note" rows="2" placeholder="想說的話"&gt;&lt;/textarea&gt;&lt;/p&gt;
  &lt;button type="submit"&gt;送出&lt;/button&gt;
&lt;/form&gt;
&lt;script&gt;
  document.querySelector('#signup').addEventListener('submit', e =&gt; {
    e.preventDefault();                       // 不要真的送出、重新整理頁面
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);
  });
&lt;/script&gt;</pre>
<p>試著不填姓名直接送出，或在 Email 填入錯誤格式，瀏覽器會自動提示。填好後送出，下方 Console 會顯示表單資料。</p>
<table>
<tr><th>type</th><th>用途</th><th>type</th><th>用途</th></tr>
<tr><td>text</td><td>單行文字（預設）</td><td>password</td><td>密碼（顯示為圓點）</td></tr>
<tr><td>email</td><td>Email，手機會顯示 @ 鍵盤</td><td>tel</td><td>電話，手機顯示數字鍵盤</td></tr>
<tr><td>number</td><td>數字，可設 min、max、step</td><td>date</td><td>日期選擇器</td></tr>
<tr><td>checkbox</td><td>多選</td><td>radio</td><td>單選（同 name 為一組）</td></tr>
<tr><td>file</td><td>上傳檔案</td><td>range</td><td>滑桿</td></tr>
</table>` },
    { id: 'label', title: 'label、驗證與按鈕', html: `
<h3>label 的兩種寫法</h3>
<pre class="out">&lt;label for="email"&gt;Email&lt;/label&gt; &lt;input id="email"&gt;   ← for 對應 input 的 id
&lt;label&gt;&lt;input type="checkbox"&gt; 同意條款&lt;/label&gt;        ← 直接包住 input</pre>
<p>有了 label，點文字就能選取欄位（手機上很重要），螢幕閱讀器也會唸出欄位名稱。<b>placeholder 不能取代 label</b>，因為輸入後提示文字就消失了。</p>
<h3>HTML 內建驗證</h3>
<table>
<tr><th>屬性</th><th>作用</th></tr>
<tr><td><code>required</code></td><td>必填</td></tr>
<tr><td><code>minlength</code>／<code>maxlength</code></td><td>文字長度限制</td></tr>
<tr><td><code>min</code>／<code>max</code>／<code>step</code></td><td>數字與日期範圍</td></tr>
<tr><td><code>pattern</code></td><td>正規表示式，例如 <code>pattern="09\\d{8}"</code> 手機號碼</td></tr>
</table>
<div class="box warn"><b class="t">前端驗證不等於安全</b>前端驗證是為了使用者體驗，任何人都可以用開發人員工具移除 required 或直接呼叫 API。<b>後端一定要再驗證一次</b>。</div>
<h3>按鈕的 type</h3>
<p>form 中的 <code>&lt;button&gt;</code> 預設是 <code>type="submit"</code>，點了就會送出表單。只是要執行 JavaScript 的按鈕，請寫 <code>type="button"</code>，避免意外送出、重新整理頁面。</p>` },
    { id: 'a11y', title: '無障礙設計', html: `
<p><b>無障礙（Accessibility，簡稱 a11y）</b>讓視障、肢障、色弱、年長者等所有人都能使用網站。台灣政府網站須符合無障礙規範，國際大廠的面試也常問。</p>
<table>
<tr><th>做法</th><th>原因</th></tr>
<tr><td>圖片寫有意義的 alt</td><td>螢幕閱讀器會唸出來</td></tr>
<tr><td>表單欄位都有 label</td><td>知道每個欄位要填什麼</td></tr>
<tr><td>用語意化標籤與正確的標題階層</td><td>可以用快捷鍵在區塊與標題間跳轉</td></tr>
<tr><td>可點擊的東西用 button 或 a，不要用 div 加 onclick</td><td>button 可以用鍵盤 Tab 選到、Enter 觸發</td></tr>
<tr><td>文字與背景對比度至少 4.5:1</td><td>弱視與在陽光下也看得清楚</td></tr>
<tr><td>不要只用顏色表達資訊</td><td>色弱的人分不出紅綠，可加上圖示或文字</td></tr>
<tr><td>保留焦點外框（:focus）</td><td>鍵盤使用者需要知道目前選到哪裡</td></tr>
</table>
<p>只有在沒有適合的原生標籤時，才用 <code>aria-label</code>、<code>role</code> 等 ARIA 屬性補充說明，例如只有圖示的按鈕：<code>&lt;button aria-label="關閉"&gt;×&lt;/button&gt;</code>。</p>` }
  ],
  keypoints: [
    '表格由 table、tr、th、td 組成，colspan／rowspan 合併儲存格；表格只放表格資料，不用來排版。',
    '表單欄位依用途選擇 type（email、tel、number、date 等），手機會顯示對應的鍵盤。',
    '每個欄位都要有 label，點文字可選取欄位；placeholder 不能取代 label。',
    'required、minlength、pattern 等提供前端驗證，但後端一定要再驗證。',
    'form 中的 button 預設為 submit，只執行 JavaScript 的按鈕要寫 type="button"。',
    '無障礙重點：alt、label、語意化標籤、鍵盤可操作、足夠對比、不只靠顏色。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 50,
  title: 'CSS 基礎：選擇器與樣式',
  summary: '三種引入 CSS 的方式、選擇器與組合、偽類與偽元素、層疊與權重、繼承、顏色與字型、單位，以及 CSS 變數。',
  sections: [
    { id: 'include', title: 'CSS 的寫法與引入方式', html: `
<pre class="out">選擇器 {
  屬性: 值;
  屬性: 值;
}

h1 { color: navy; font-size: 32px; }</pre>
<table>
<tr><th>方式</th><th>寫法</th><th>建議</th></tr>
<tr><td>外部樣式表</td><td><code>&lt;link rel="stylesheet" href="style.css"&gt;</code></td><td><b>最推薦</b>，多頁共用、可快取</td></tr>
<tr><td>內部樣式</td><td><code>&lt;style&gt; … &lt;/style&gt;</code></td><td>單頁或練習用</td></tr>
<tr><td>行內樣式</td><td><code>&lt;p style="color: red"&gt;</code></td><td>盡量避免，難維護且權重很高</td></tr>
</table>` },
    { id: 'selectors', title: '選擇器', html: `
<pre class="web">&lt;h2&gt;選擇器練習&lt;/h2&gt;
&lt;p&gt;一般段落&lt;/p&gt;
&lt;p class="note"&gt;有 note 類別的段落&lt;/p&gt;
&lt;p id="hero"&gt;id 為 hero 的段落&lt;/p&gt;
&lt;div class="card"&gt;&lt;p&gt;卡片裡的段落&lt;/p&gt;&lt;a href="#"&gt;連結&lt;/a&gt;&lt;/div&gt;
&lt;ul&gt;&lt;li&gt;第一項&lt;/li&gt;&lt;li&gt;第二項&lt;/li&gt;&lt;li&gt;第三項&lt;/li&gt;&lt;/ul&gt;
&lt;input type="text" placeholder="點我看 focus 效果"&gt;

&lt;style&gt;
  p { color: #555; }                      /* 標籤選擇器 */
  .note { background: #fdf0b8; }          /* class 選擇器 */
  #hero { font-weight: bold; }            /* id 選擇器 */
  .card p { color: #1f4e8c; }             /* 後代：.card 裡面的 p */
  .card &gt; a { color: crimson; }           /* 子元素：直接在 .card 底下的 a */
  li:first-child { color: green; }        /* 偽類：第一個 li */
  li:nth-child(even) { background: #eef; }/* 偶數項 */
  a:hover { text-decoration: none; }      /* 滑鼠移上去 */
  input:focus { outline: 3px solid #8bb2e8; }
  input[type="text"] { padding: 6px; }    /* 屬性選擇器 */
  h2::before { content: "★ "; }           /* 偽元素：在內容前加字 */
&lt;/style&gt;</pre>
<table>
<tr><th>選擇器</th><th>寫法</th><th>選到</th></tr>
<tr><td>全部</td><td><code>*</code></td><td>所有元素</td></tr>
<tr><td>群組</td><td><code>h1, h2</code></td><td>h1 和 h2</td></tr>
<tr><td>後代</td><td><code>.card p</code></td><td>.card 裡面任何一層的 p</td></tr>
<tr><td>子元素</td><td><code>.card &gt; p</code></td><td>只有直接子層的 p</td></tr>
<tr><td>相鄰兄弟</td><td><code>h2 + p</code></td><td>緊接在 h2 後面的第一個 p</td></tr>
<tr><td>同時符合</td><td><code>p.note</code></td><td>有 note 類別的 p（中間沒有空白）</td></tr>
</table>` },
    { id: 'cascade', title: '層疊與權重', html: `
<p>CSS 的 C 是 <b>Cascading（層疊）</b>：同一個元素被多條規則選到時，依下列順序決定誰生效：</p>
<ol>
<li><b>!important</b> 最優先（盡量不要用，會讓樣式難以覆寫）。</li>
<li><b>權重（Specificity）</b>高的優先。</li>
<li>權重相同時，<b>後寫的</b>覆蓋先寫的。</li>
</ol>
<table>
<tr><th>選擇器</th><th>權重 (ID, 類別, 標籤)</th></tr>
<tr><td>行內 style</td><td>最高（1,0,0,0）</td></tr>
<tr><td><code>#hero</code></td><td>(1, 0, 0)</td></tr>
<tr><td><code>.note</code>、<code>[type="text"]</code>、<code>:hover</code></td><td>(0, 1, 0)</td></tr>
<tr><td><code>p</code>、<code>::before</code></td><td>(0, 0, 1)</td></tr>
<tr><td><code>.card p</code></td><td>(0, 1, 1)</td></tr>
<tr><td><code>#nav .item a</code></td><td>(1, 1, 1)</td></tr>
</table>
<pre class="web">&lt;p id="msg" class="text"&gt;我會是什麼顏色？&lt;/p&gt;
&lt;style&gt;
  #msg   { color: red; }     /* (1,0,0) 權重最高 */
  .text  { color: green; }   /* (0,1,0) */
  p      { color: blue; }    /* (0,0,1) */
  .text  { color: orange; }  /* 和上面的 .text 同權重，後寫的贏，但仍輸給 #msg */
&lt;/style&gt;</pre>
<p>互動練習中的「選擇器權重計算」可以輸入任何選擇器，算出它的權重。</p>
<div class="box tip"><b class="t">實務建議</b>樣式盡量都用 class 選擇器，權重一致就容易管理；避免用 id 寫樣式，也避免 !important。</div>
<h3>繼承</h3>
<p>文字相關的屬性（color、font-family、font-size、line-height）會由父元素<b>繼承</b>給子元素，所以在 body 設定字型，整頁都會套用。版面相關的屬性（margin、padding、border、width）不會繼承。</p>` },
    { id: 'units', title: '顏色、字型與單位', html: `
<table>
<tr><th>顏色寫法</th><th>範例</th></tr>
<tr><td>名稱</td><td><code>red</code>、<code>navy</code></td></tr>
<tr><td>十六進位</td><td><code>#1f4e8c</code>、簡寫 <code>#fff</code></td></tr>
<tr><td>RGB／透明度</td><td><code>rgb(31 78 140)</code>、<code>rgb(0 0 0 / 50%)</code></td></tr>
<tr><td>HSL（色相、飽和度、亮度）</td><td><code>hsl(214 64% 34%)</code>，調亮暗最直覺</td></tr>
</table>
<table>
<tr><th>單位</th><th>相對於</th><th>常見用途</th></tr>
<tr><td><code>px</code></td><td>螢幕像素（固定）</td><td>邊框、細節</td></tr>
<tr><td><code>rem</code></td><td>根元素 html 的字體大小（預設 16px）</td><td><b>字體大小、間距</b>，使用者調大字體時會跟著放大</td></tr>
<tr><td><code>em</code></td><td>目前元素的字體大小</td><td>和文字等比例的內距</td></tr>
<tr><td><code>%</code></td><td>父元素</td><td>寬度</td></tr>
<tr><td><code>vw</code>／<code>vh</code></td><td>視窗寬度／高度的 1%</td><td>滿版區塊</td></tr>
</table>
<pre class="web">&lt;div class="box"&gt;
  &lt;h3&gt;CSS 變數與字型&lt;/h3&gt;
  &lt;p&gt;改 :root 的 --brand，整頁的品牌色一起改變。&lt;/p&gt;
  &lt;button&gt;按鈕&lt;/button&gt;
&lt;/div&gt;
&lt;style&gt;
  :root { --brand: #1f4e8c; --radius: 8px; }
  body { font-family: "Noto Sans TC", "Microsoft JhengHei", sans-serif; line-height: 1.7; }
  .box { border: 2px solid var(--brand); border-radius: var(--radius); padding: 1rem 1.25rem; }
  h3 { color: var(--brand); margin-top: 0; font-size: 1.25rem; }
  button { background: var(--brand); color: #fff; border: 0; border-radius: var(--radius); padding: .5rem 1rem; }
&lt;/style&gt;</pre>
<p><b>CSS 變數（自訂屬性）</b>以 <code>--</code> 開頭定義、用 <code>var()</code> 取用，適合管理品牌色、間距，也是實作深色模式的常見方法。</p>` }
  ],
  keypoints: [
    'CSS 由選擇器與屬性: 值組成，建議使用外部樣式表。',
    '後代選擇器用空白、子元素用 >、同時符合的類別之間沒有空白。',
    '偽類（:hover、:focus、:nth-child）選擇狀態，偽元素（::before、::after）產生內容。',
    '樣式衝突時：!important > 權重 > 後寫的優先；權重為 ID (1,0,0) > 類別 (0,1,0) > 標籤 (0,0,1)。',
    '文字相關屬性會繼承，版面相關屬性不會。',
    '字體與間距建議用 rem；CSS 變數以 -- 定義、var() 取用。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 55,
  title: '盒模型、定位與 Flexbox',
  summary: '盒模型與 box-sizing、外距合併、display 的區塊與行內、position 定位（relative、absolute、fixed、sticky），以及 Flexbox 的主軸與交錯軸排版。',
  sections: [
    { id: 'box', title: '盒模型', html: `
<p>每個元素都是一個矩形的盒子，由內而外分成四層：</p>
<pre class="out">┌──────────── margin 外距（透明，和其他元素的距離）────────────┐
│ ┌────────── border 邊框 ──────────┐                           │
│ │ ┌──────── padding 內距 ───────┐ │                           │
│ │ │        content 內容         │ │                           │
│ │ └─────────────────────────────┘ │                           │
│ └─────────────────────────────────┘                           │
└───────────────────────────────────────────────────────────────┘</pre>
<pre class="web">&lt;div class="a"&gt;content-box：寬度 200 + 內距 20×2 + 邊框 5×2 = 250px&lt;/div&gt;
&lt;div class="b"&gt;border-box：寬度就是 200px&lt;/div&gt;
&lt;style&gt;
  div { width: 200px; padding: 20px; border: 5px solid #1f4e8c; margin: 10px 0; background: #edf2f9; }
  .a { box-sizing: content-box; }   /* 預設值 */
  .b { box-sizing: border-box; }
&lt;/style&gt;</pre>
<p>預設的 <code>content-box</code> 中，width 只算內容，加上 padding 與 border 後實際寬度會變大，很難計算。幾乎所有網站都會在一開始加上：</p>
<pre class="out">*, *::before, *::after { box-sizing: border-box; }</pre>
<p>互動練習中的「盒模型計算」可以調整數值，看實際佔用的寬度怎麼變化。</p>
<h3>簡寫與外距合併</h3>
<table>
<tr><th>寫法</th><th>意義</th></tr>
<tr><td><code>margin: 10px</code></td><td>上下左右都是 10px</td></tr>
<tr><td><code>margin: 10px 20px</code></td><td>上下 10px、左右 20px</td></tr>
<tr><td><code>margin: 10px 20px 30px 40px</code></td><td>上、右、下、左（順時針）</td></tr>
<tr><td><code>margin: 0 auto</code></td><td>有設定寬度的區塊<b>水平置中</b></td></tr>
</table>
<div class="box memo"><b class="t">外距合併</b>上下相鄰的兩個區塊，margin 不會相加，而是取較大的那個。例如上面元素 margin-bottom: 20px、下面 margin-top: 30px，兩者距離是 30px 而不是 50px。左右的 margin 不會合併，Flex 與 Grid 中的子元素也不會。</div>` },
    { id: 'display', title: 'display：區塊與行內', html: `
<table>
<tr><th>display</th><th>特性</th><th>預設元素</th></tr>
<tr><td><code>block</code> 區塊</td><td>獨佔一行，寬度預設撐滿父元素，可設寬高</td><td>div、p、h1、ul、section</td></tr>
<tr><td><code>inline</code> 行內</td><td>和文字排在同一行，<b>不能設寬高</b>，上下 margin 無效</td><td>span、a、strong、em</td></tr>
<tr><td><code>inline-block</code></td><td>排在同一行，但可以設寬高</td><td>button、input、img（行內替換元素）</td></tr>
<tr><td><code>none</code></td><td>完全不顯示，也不佔空間</td><td>—</td></tr>
<tr><td><code>flex</code>／<code>grid</code></td><td>讓子元素用 Flexbox／Grid 排版</td><td>—</td></tr>
</table>
<p><code>display: none</code> 不佔空間；<code>visibility: hidden</code> 看不見但仍佔空間；<code>opacity: 0</code> 透明但仍可點擊。</p>` },
    { id: 'position', title: 'position 定位', html: `
<pre class="web">&lt;div class="parent"&gt;
  父元素 position: relative
  &lt;span class="badge"&gt;NEW&lt;/span&gt;
&lt;/div&gt;
&lt;div class="sticky"&gt;我是 sticky，捲動時會黏在上方&lt;/div&gt;
&lt;p style="height: 400px"&gt;往下捲動預覽區看看 sticky 的效果…&lt;/p&gt;
&lt;style&gt;
  .parent { position: relative; height: 80px; background: #edf2f9; padding: 10px; }
  .badge { position: absolute; top: 8px; right: 8px; background: crimson; color: #fff; padding: 2px 8px; border-radius: 4px; }
  .sticky { position: sticky; top: 0; background: #fdf0b8; padding: 8px; }
&lt;/style&gt;</pre>
<table>
<tr><th>position</th><th>定位依據</th><th>是否佔原本空間</th><th>常見用途</th></tr>
<tr><td><code>static</code></td><td>正常排列（預設）</td><td>是</td><td>—</td></tr>
<tr><td><code>relative</code></td><td>自己原本的位置</td><td>是</td><td>微調位置、<b>當 absolute 的定位基準</b></td></tr>
<tr><td><code>absolute</code></td><td>最近一個「非 static」的祖先</td><td>否</td><td>標籤、角落按鈕、下拉選單</td></tr>
<tr><td><code>fixed</code></td><td>瀏覽器視窗</td><td>否</td><td>固定在畫面上的導覽列、客服按鈕</td></tr>
<tr><td><code>sticky</code></td><td>捲動到指定位置後黏住</td><td>是</td><td>表頭、側欄目錄</td></tr>
</table>
<p>搭配 <code>top</code>、<code>right</code>、<code>bottom</code>、<code>left</code> 指定位置，<code>z-index</code> 決定重疊時誰在上面（只對非 static 的元素有效）。</p>` },
    { id: 'flex', title: 'Flexbox 彈性排版', html: `
<p>Flexbox 適合<b>一維</b>排版：把子元素排成一列或一欄，並控制對齊與間距。在父元素加上 <code>display: flex</code> 就開始了：</p>
<pre class="web">&lt;nav class="bar"&gt;
  &lt;strong class="logo"&gt;SecPath&lt;/strong&gt;
  &lt;a href="#"&gt;課程&lt;/a&gt;
  &lt;a href="#"&gt;路線&lt;/a&gt;
  &lt;a href="#" class="login"&gt;登入&lt;/a&gt;
&lt;/nav&gt;
&lt;div class="center"&gt;水平垂直置中&lt;/div&gt;
&lt;style&gt;
  .bar { display: flex; align-items: center; gap: 16px; padding: 10px 16px; background: #16181d; }
  .bar a { color: #ddd; text-decoration: none; }
  .logo { color: #fff; margin-right: auto; }   /* 把後面的連結推到右邊 */
  .login { border: 1px solid #ddd; padding: 2px 10px; border-radius: 4px; }
  .center { display: flex; justify-content: center; align-items: center; height: 100px; margin-top: 12px; background: #edf2f9; }
&lt;/style&gt;</pre>
<h3>主軸與交錯軸</h3>
<table>
<tr><th>屬性（寫在父元素）</th><th>作用</th><th>常用值</th></tr>
<tr><td><code>flex-direction</code></td><td>主軸方向</td><td>row（橫，預設）、column（直）</td></tr>
<tr><td><code>justify-content</code></td><td><b>主軸</b>上的對齊</td><td>flex-start、center、space-between、space-around</td></tr>
<tr><td><code>align-items</code></td><td><b>交錯軸</b>上的對齊</td><td>stretch（預設）、center、flex-start</td></tr>
<tr><td><code>flex-wrap</code></td><td>空間不夠時是否換行</td><td>nowrap（預設）、wrap</td></tr>
<tr><td><code>gap</code></td><td>子元素之間的間距</td><td>16px</td></tr>
</table>
<table>
<tr><th>屬性（寫在子元素）</th><th>作用</th></tr>
<tr><td><code>flex: 1</code></td><td>平均分配剩餘空間（flex-grow: 1）</td></tr>
<tr><td><code>flex: 0 0 200px</code></td><td>固定 200px，不放大不縮小</td></tr>
<tr><td><code>align-self</code></td><td>單獨調整自己在交錯軸的對齊</td></tr>
<tr><td><code>order</code></td><td>改變顯示順序</td></tr>
</table>
<div class="box tip"><b class="t">記住方向</b>flex-direction 為 column 時，主軸變成直的，justify-content 控制垂直方向、align-items 控制水平方向。互動練習中的「Flexbox 遊樂場」可以切換各種屬性觀察效果。</div>` }
  ],
  keypoints: [
    '盒模型由內而外為 content、padding、border、margin。',
    'box-sizing: border-box 讓 width 包含 padding 與 border，是現代網站的標準設定。',
    'margin: 0 auto 讓有寬度的區塊水平置中；上下相鄰的 margin 會合併取大值。',
    'block 獨佔一行可設寬高；inline 不能設寬高；inline-block 同行且可設寬高。',
    'absolute 以最近的非 static 祖先定位，通常把父元素設為 relative；fixed 以視窗定位；sticky 捲動時黏住。',
    'Flexbox 做一維排版：justify-content 控制主軸、align-items 控制交錯軸、gap 設定間距。'
  ]
},
{
  id: 'c06', subject: 1, minutes: 50,
  title: 'Grid 與響應式設計',
  summary: 'CSS Grid 二維排版、fr 單位、repeat 與 minmax 自動排列卡片、grid-template-areas 版面配置、viewport 設定、媒體查詢與行動優先，以及響應式圖片與 clamp() 流體字級。',
  sections: [
    { id: 'grid', title: 'CSS Grid 格線排版', html: `
<p>Grid 適合<b>二維</b>排版：同時控制列與欄。卡片牆、相簿、整頁版面都很適合：</p>
<pre class="web">&lt;div class="grid"&gt;
  &lt;div&gt;1&lt;/div&gt;&lt;div&gt;2&lt;/div&gt;&lt;div&gt;3&lt;/div&gt;
  &lt;div class="wide"&gt;4（跨兩欄）&lt;/div&gt;&lt;div&gt;5&lt;/div&gt;
&lt;/div&gt;
&lt;style&gt;
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .grid div { background: #edf2f9; border: 1px solid #8bb2e8; padding: 16px; text-align: center; border-radius: 6px; }
  .wide { grid-column: span 2; }
&lt;/style&gt;</pre>
<table>
<tr><th>寫法</th><th>意義</th></tr>
<tr><td><code>grid-template-columns: 200px 1fr 1fr</code></td><td>第一欄固定 200px，剩下空間兩欄平分</td></tr>
<tr><td><code>1fr</code></td><td>剩餘空間的 1 份（fraction）</td></tr>
<tr><td><code>repeat(4, 1fr)</code></td><td>4 欄等寬</td></tr>
<tr><td><code>grid-column: span 2</code></td><td>子元素橫跨 2 欄</td></tr>
<tr><td><code>grid-column: 1 / -1</code></td><td>從第一條線到最後一條線（整列）</td></tr>
</table>
<h3>不用媒體查詢的自動卡片牆</h3>
<pre class="web">&lt;div class="cards"&gt;
  &lt;article&gt;SQL&lt;/article&gt;&lt;article&gt;Python&lt;/article&gt;&lt;article&gt;網頁開發&lt;/article&gt;
  &lt;article&gt;Excel&lt;/article&gt;&lt;article&gt;Git&lt;/article&gt;
&lt;/div&gt;
&lt;style&gt;
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
  .cards article { background: #1f4e8c; color: #fff; padding: 24px 12px; border-radius: 8px; text-align: center; }
&lt;/style&gt;</pre>
<p><code>repeat(auto-fill, minmax(140px, 1fr))</code> 的意思是：每張卡片至少 140px，能放幾欄就放幾欄，剩餘空間平均分配。改變預覽寬度（例如用手機看這頁），欄數會自動變化。</p>` },
    { id: 'areas', title: '用 grid-template-areas 規劃整頁', html: `
<pre class="web">&lt;div class="page"&gt;
  &lt;header&gt;header&lt;/header&gt;
  &lt;nav&gt;nav&lt;/nav&gt;
  &lt;main&gt;main&lt;/main&gt;
  &lt;footer&gt;footer&lt;/footer&gt;
&lt;/div&gt;
&lt;style&gt;
  .page {
    display: grid;
    grid-template-columns: 120px 1fr;
    grid-template-areas:
      "header header"
      "nav    main"
      "footer footer";
    gap: 8px;
  }
  header { grid-area: header; } nav { grid-area: nav; }
  main { grid-area: main; height: 100px; } footer { grid-area: footer; }
  .page &gt; * { background: #edf2f9; padding: 10px; border-radius: 4px; }
  @media (max-width: 500px) {
    .page { grid-template-columns: 1fr; grid-template-areas: "header" "nav" "main" "footer"; }
  }
&lt;/style&gt;</pre>
<p>用文字畫出版面配置，非常直觀；媒體查詢中只要重新排列 areas，就能在手機上改成單欄。</p>
<div class="box memo"><b class="t">Flex 還是 Grid？</b>一排按鈕、導覽列、把東西置中用 Flex；卡片牆、整頁版面、需要列與欄同時對齊用 Grid。兩者常常搭配使用：Grid 排整頁，每張卡片裡面用 Flex。</div>` },
    { id: 'responsive', title: '響應式設計與媒體查詢', html: `
<p><b>響應式設計（Responsive Web Design）</b>讓同一個網頁在手機、平板、桌機都好用。台灣的網站流量超過一半來自手機，這是必備技能。</p>
<h3>第一步：viewport 設定</h3>
<pre class="out">&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</pre>
<p>沒有這行，手機會把網頁當成 980px 寬的桌機版縮小顯示，字會小到看不清楚。</p>
<h3>媒體查詢與行動優先</h3>
<pre class="out">/* 行動優先：先寫手機版（預設樣式） */
.cards { grid-template-columns: 1fr; }

/* 平板以上 */
@media (min-width: 768px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

/* 桌機以上 */
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}</pre>
<p><b>行動優先（Mobile First）</b>：先寫手機版樣式，再用 <code>min-width</code> 為大螢幕加樣式。手機只需要下載基本樣式，而且從簡單的版面擴充比從複雜的版面刪減容易。</p>
<table>
<tr><th>常見斷點</th><th>裝置</th></tr>
<tr><td>預設（&lt; 768px）</td><td>手機</td></tr>
<tr><td>768px</td><td>平板</td></tr>
<tr><td>1024px</td><td>筆電</td></tr>
<tr><td>1280px 以上</td><td>桌機大螢幕</td></tr>
</table>
<div class="box tip"><b class="t">斷點依內容決定</b>不必死記裝置尺寸。把瀏覽器慢慢縮小，版面開始變醜的地方就是該加斷點的地方。</div>` },
    { id: 'fluid', title: '響應式圖片與流體尺寸', html: `
<pre class="web">&lt;h1 class="fluid"&gt;流體標題會隨寬度縮放&lt;/h1&gt;
&lt;img class="fit" src="https://picsum.photos/id/1015/800/400" alt="河谷風景" width="800" height="400"&gt;
&lt;div class="ratio"&gt;16:9 的區塊&lt;/div&gt;
&lt;style&gt;
  .fluid { font-size: clamp(1.25rem, 4vw, 2.25rem); }   /* 最小、理想、最大 */
  .fit { max-width: 100%; height: auto; display: block; border-radius: 8px; }
  .ratio { aspect-ratio: 16 / 9; width: 60%; margin-top: 10px; background: #edf2f9; display: grid; place-items: center; }
&lt;/style&gt;</pre>
<table>
<tr><th>技巧</th><th>作用</th></tr>
<tr><td><code>img { max-width: 100%; height: auto; }</code></td><td>圖片不會超出容器，等比例縮放</td></tr>
<tr><td><code>clamp(最小, 理想, 最大)</code></td><td>字體或寬度在範圍內隨視窗流動</td></tr>
<tr><td><code>aspect-ratio: 16 / 9</code></td><td>固定長寬比，例如影片區塊</td></tr>
<tr><td><code>&lt;img srcset="小圖 480w, 大圖 1200w" sizes="…"&gt;</code></td><td>依螢幕大小下載不同尺寸的圖片，節省流量</td></tr>
<tr><td><code>object-fit: cover</code></td><td>圖片填滿固定大小的框並裁切多餘部分</td></tr>
</table>
<div class="box warn"><b class="t">常見的手機版問題</b>出現橫向捲軸，通常是有元素設定了固定寬度（例如 width: 600px）或長網址沒有換行。用開發人員工具的手機模式逐一檢查，改用 max-width 與百分比，長字串加上 <code>overflow-wrap: anywhere</code>。</div>` }
  ],
  keypoints: [
    'Grid 適合二維排版；fr 代表剩餘空間的份數，repeat(3, 1fr) 為三欄等寬。',
    'repeat(auto-fill, minmax(140px, 1fr)) 可在不寫媒體查詢的情況下自動調整欄數。',
    'grid-template-areas 用文字規劃版面，搭配媒體查詢即可改變手機版配置。',
    '響應式網頁一定要有 viewport meta 標籤。',
    '行動優先：先寫手機版，再用 min-width 媒體查詢加上大螢幕樣式。',
    '圖片加 max-width: 100%; height: auto；clamp() 讓字級隨視窗流動。'
  ]
}
);
