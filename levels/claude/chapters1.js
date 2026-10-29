/* Claude 實戰 使用篇：提示詞、claude.ai 與 Claude Code 指令
   <pre class="out"> 為提示詞、指令或設定檔範例；<pre class="js"> 為可在網頁上執行的 JavaScript
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 40,
  title: '認識 Claude',
  summary: 'Claude 是什麼、模型家族（Fable、Opus、Sonnet、Haiku）怎麼選、三種使用方式（claude.ai、Claude Code、API）、訂閱方案、適合與不適合的任務，以及使用 AI 時的安全與隱私觀念。',
  sections: [
    { id: 'what', title: 'Claude 是什麼', html: `
<p><b>Claude</b> 是 Anthropic 開發的大型語言模型（LLM）。它能閱讀與撰寫文字、分析檔案與圖片、寫程式與除錯，也能透過「工具」搜尋網路、操作檔案、執行指令，完成多步驟的工作。</p>
<p>大型語言模型的運作方式是：根據你給的內容（稱為 <b>context，上下文</b>），一段一段預測最合適的回應。所以 Claude 回答的品質，很大程度取決於你提供了什麼資訊、怎麼描述需求，這也是本課程前三章的重點。</p>
<div class="box memo"><b class="t">Token 是計算單位</b>模型處理文字的單位叫 <b>token</b>。英文大約 1 個 token 是 4 個字母，中文大約 1 個字是 1～2 個 token。context 的長度上限、API 的計費，都以 token 計算。目前主要模型的 context 上限是 100 萬 token，大約可以放進幾本書的內容。</div>` },
    { id: 'models', title: '模型家族怎麼選', html: `
<p>Claude 依能力與價格分成幾個家族，數字是版本（2026 年 10 月）：</p>
<table>
<tr><th>家族</th><th>目前版本</th><th>特色</th><th>適合</th></tr>
<tr><td><b>Fable</b></td><td>Claude Fable 5.1</td><td>能力最強，推理最深入，價格也最高</td><td>最困難的推理、長時間自主執行的大型任務</td></tr>
<tr><td><b>Opus</b></td><td>Claude Opus 5.5</td><td>能力強且價格合理，是大部分情況的預設選擇</td><td>寫程式、分析、寫作、代理任務</td></tr>
<tr><td><b>Sonnet</b></td><td>Claude Sonnet 5.5</td><td>速度快、成本較低，能力仍然很好</td><td>日常寫程式、大量的一般任務</td></tr>
<tr><td><b>Haiku</b></td><td>Claude Haiku 5.5</td><td>最快、最便宜</td><td>分類、摘要、即時回應、大量資料處理</td></tr>
</table>
<p>選擇原則：<b>先用能力夠的模型把事情做對</b>，確定流程可行後，再嘗試較小的模型或較低的「努力程度（effort）」節省成本。新一代的模型都會自己判斷要思考多久（自適應思考），你可以用 effort（low、medium、high、xhigh、max）控制它花多少力氣。</p>
<div class="box tip"><b class="t">版本會更新</b>模型大約每幾個月就有新版，名稱與價格可能改變。本課程的名稱與數字以 2026 年 10 月為準，實際請以官方文件為準。</div>` },
    { id: 'surfaces', title: '三種使用方式', html: `
<table>
<tr><th>方式</th><th>是什麼</th><th>適合誰</th></tr>
<tr><td><b>claude.ai</b>（網頁、桌面 App、手機 App）</td><td>對話介面，可以上傳檔案、建立專案、產生 Artifacts、搜尋網路、連接 Google Drive 等服務</td><td>所有人：寫作、研究、分析資料、學習</td></tr>
<tr><td><b>Claude Code</b>（終端機、VS Code／JetBrains、桌面 App、網頁版）</td><td>能讀寫你電腦上專案檔案、執行指令的程式開發代理</td><td>工程師、需要自動化的人</td></tr>
<tr><td><b>Claude API</b>（Claude Developer Platform）</td><td>用程式呼叫 Claude，依 token 用量計費</td><td>要把 Claude 做進自己產品或系統的開發者</td></tr>
</table>
<p>訂閱方案（Free、Pro、Max、Team、Enterprise）適用於 claude.ai 與 Claude Code；API 則是另外在 Claude Console 儲值、依用量付費。Claude Code 需要付費訂閱（Pro 以上），或使用 Console 的 API 帳號登入。</p>` },
    { id: 'good', title: '擅長與不擅長的事', html: `
<table>
<tr><th>擅長</th><th>要小心</th></tr>
<tr><td>整理、摘要、改寫、翻譯大量文字</td><td>最新的消息：沒有開啟搜尋時，只知道訓練資料截止前的事</td></tr>
<tr><td>寫程式、解釋程式、找 bug、寫測試</td><td>精確的計算與統計：請它寫程式計算，或使用分析工具</td></tr>
<tr><td>腦力激盪、規劃、比較方案</td><td>引用來源與數字：可能出現看似合理但錯誤的內容（幻覺），重要資訊要查證</td></tr>
<tr><td>讀懂表格、PDF、截圖、圖表</td><td>法律、醫療、財務決定：可以協助理解，但要由專業人士確認</td></tr>
</table>
<div class="box warn"><b class="t">安全與隱私</b>不要把密碼、API 金鑰、客戶個資貼進對話。公司使用前先確認資料政策：Team 與 Enterprise 方案的商業條款預設不會用你的資料訓練模型；個人方案可以在隱私設定中選擇。AI 產生的內容由你負責，送出前一定要自己看過。</div>` }
  ],
  keypoints: [
    'Claude 是 Anthropic 的大型語言模型，回答品質取決於你提供的 context 與描述方式。',
    'token 是計算單位：context 上限與 API 計費都以 token 計算，中文約 1 字 1～2 個 token。',
    '模型家族：Fable 最強、Opus 是預設選擇、Sonnet 快且便宜、Haiku 最快最便宜。',
    '先用能力夠的模型做對，再嘗試較小模型或較低 effort 節省成本。',
    '三種使用方式：claude.ai 對話介面、Claude Code 開發代理、Claude API 程式呼叫。',
    '不要貼入密碼與個資；重要的數字與來源要查證，AI 產出由使用者負責。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 55,
  title: '提示詞技巧',
  summary: '好的提示詞四要素、提供背景與目的、用範例說明、用 XML 標籤分段、指定角色與輸出格式、讓 Claude 先思考、拆解複雜任務、反覆修正，以及常見的錯誤寫法。',
  sections: [
    { id: 'clear', title: '像交代工作給新同事一樣', html: `
<p>想像 Claude 是一位很聰明、但<b>完全不了解你的狀況</b>的新同事。他不知道你的公司、讀者是誰、為什麼要做這件事。你交代得越清楚，結果就越好。</p>
<pre class="out">❌ 模糊：
幫我寫一封信。

✅ 清楚：
幫我寫一封 email 給合作廠商「大華印刷」的王經理，
通知原定 11/15 交貨的 500 本型錄要延到 11/22，
原因是我們的設計稿修改。語氣誠懇但專業，
提出補償：下一筆訂單運費由我們負擔。
長度 150 字以內，最後附上我的聯絡電話 02-2345-6789。</pre>
<p>好的提示詞通常包含四個要素：</p>
<table>
<tr><th>要素</th><th>說明</th><th>例子</th></tr>
<tr><td>背景</td><td>誰、為什麼、用在哪裡</td><td>「這份報告要給不懂技術的主管看」</td></tr>
<tr><td>任務</td><td>具體要做什麼</td><td>「整理成三個重點並提出建議」</td></tr>
<tr><td>限制</td><td>長度、語氣、不能做的事</td><td>「300 字以內、不要使用專業術語」</td></tr>
<tr><td>輸出格式</td><td>要的樣子</td><td>「用表格：問題、原因、解決方式」</td></tr>
</table>
<div class="box tip"><b class="t">說明「為什麼」</b>比起「不要用刪節號」，寫「這段文字會被語音朗讀，所以不要用刪節號」效果更好。Claude 理解原因後，也會避開其他類似的問題。</div>` },
    { id: 'examples', title: '用範例說明你要的樣子', html: `
<p>與其用形容詞描述風格，不如直接給 1～3 個範例（few-shot）。範例要有代表性，而且彼此要有差異，避免 Claude 只學到表面的模式：</p>
<pre class="out">請把客戶意見分類為：產品、物流、客服、其他，並判斷情緒（正面／負面／中性）。

範例：
意見：「包裝很用心，但等了一個星期才到」
分類：物流｜情緒：負面

意見：「客服小姐很有耐心幫我處理退貨」
分類：客服｜情緒：正面

請處理以下意見：
意見：「耳機音質不錯，但戴久了耳朵會痛」</pre>` },
    { id: 'xml', title: '用 XML 標籤分段', html: `
<p>提示詞中同時有資料、說明、範例時，用 XML 標籤把它們分開，Claude 比較不會混淆「哪些是要處理的資料、哪些是指示」。標籤名稱可以自訂，只要清楚一致：</p>
<pre class="out">&lt;會議記錄&gt;
（貼上 2000 字的會議逐字稿）
&lt;/會議記錄&gt;

&lt;要求&gt;
1. 整理出所有決議事項與負責人
2. 列出還沒有結論、需要追蹤的問題
3. 不要加入會議記錄中沒有的內容
&lt;/要求&gt;

&lt;輸出格式&gt;
用 Markdown 表格輸出，欄位：事項、負責人、期限
&lt;/輸出格式&gt;</pre>
<p>長文件（例如合約、報告）建議<b>放在提示詞的前面</b>，問題與指示放在最後，回答的品質通常會更好。</p>` },
    { id: 'role', title: '角色、格式與「先思考」', html: `
<pre class="out">你是有 10 年經驗的資安顧問，讀者是中小企業的老闆。   ← 設定角色與讀者
請檢視下面的公司 IT 現況，找出三個最優先要處理的風險。
先在 &lt;分析&gt; 標籤中逐項思考每個風險的可能性與影響，         ← 讓它先推理
最後在 &lt;建議&gt; 標籤中，用條列給出具體可執行的建議，         ← 指定輸出格式
每項附上預估費用等級（低／中／高）。</pre>
<table>
<tr><th>技巧</th><th>效果</th></tr>
<tr><td>設定角色</td><td>調整專業程度與用詞，例如「資深工程師」「國小老師」</td></tr>
<tr><td>指定格式</td><td>表格、條列、JSON、指定的標題結構；要直接貼上使用的內容格式尤其要說清楚</td></tr>
<tr><td>先思考再回答</td><td>複雜的判斷、計算、比較，要求先列出推理過程，正確率較高。新模型會自動思考，也可以提高 effort</td></tr>
<tr><td>正面描述</td><td>寫「用完整的段落說明」比寫「不要用條列」更有效</td></tr>
</table>` },
    { id: 'iterate', title: '拆解任務與反覆修正', html: `
<p>複雜的工作不要一次丟給 Claude，拆成幾個步驟，每一步確認後再繼續：</p>
<pre class="out">第 1 步：請先閱讀這份產品規格，列出你不確定或有矛盾的地方，先不要寫文案。
第 2 步：（回答問題後）請提出 3 種不同角度的文案方向，每種一句話說明。
第 3 步：我選第 2 種，請寫出完整的 300 字版本。
第 4 步：第二段太長了，請縮短成兩句，並把「業界第一」改成具體的數據。</pre>
<table>
<tr><th>常見錯誤</th><th>改善方式</th></tr>
<tr><td>只說「寫得好一點」</td><td>具體指出哪裡不好、要改成什麼樣子</td></tr>
<tr><td>一次塞太多不相關的要求</td><td>拆成多個步驟或多個對話</td></tr>
<tr><td>對話越聊越長、方向越來越亂</td><td>開新對話，把整理好的需求一次說清楚</td></tr>
<tr><td>完全相信第一個答案</td><td>請它檢查自己的回答、列出可能的錯誤，重要內容自己查證</td></tr>
<tr><td>大寫、驚嘆號、「一定要」重複強調</td><td>新模型很遵守指示，過度強調反而會讓它過頭；平鋪直敘說明原因即可</td></tr>
</table>
<p>互動練習中的「提示詞產生器」可以依四要素組合出結構清楚的提示詞。</p>
<div class="box exam"><b class="t">讓 Claude 幫你寫提示詞</b>不確定怎麼寫時，可以先說：「我想請你幫我做某件事，在開始之前，請先問我 5 個你需要知道的問題。」Claude 會幫你把需求釐清。</div>` }
  ],
  keypoints: [
    '把 Claude 當成聰明但不了解狀況的新同事：背景、任務、限制、輸出格式都要交代清楚。',
    '說明「為什麼」比單純下指令有效，Claude 會舉一反三。',
    '用 1～3 個有代表性、彼此不同的範例說明你要的結果。',
    '用 XML 標籤把資料、要求、範例分開；長文件放前面、問題放最後。',
    '設定角色與讀者、指定輸出格式、複雜判斷要求先思考；用正面方式描述要做什麼。',
    '複雜任務拆成多步，具體指出要修改的地方；對話混亂時開新對話重新整理需求。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 45,
  title: 'claude.ai 實戰功能',
  summary: '專案與專案知識、Artifacts、檔案與圖片分析、網頁搜尋與研究、連接器、記憶與風格設定，以及在報告、資料分析、會議記錄、學習等工作中的實際用法。',
  sections: [
    { id: 'projects', title: '專案：讓 Claude 了解你的工作背景', html: `
<p><b>專案（Projects）</b>把相關的對話集中在一起，並可以設定兩樣東西，專案內的每個新對話都會自動帶入：</p>
<table>
<tr><th>設定</th><th>用途</th><th>例子</th></tr>
<tr><td>專案知識</td><td>上傳文件、程式碼、表格當作參考資料</td><td>產品手冊、品牌規範、過去的提案</td></tr>
<tr><td>專案指示</td><td>這個專案的固定要求</td><td>「回答都用繁體中文、語氣正式、讀者是銀行主管」</td></tr>
</table>
<p>適合長期、重複的工作：例如「客服回覆」專案放入產品 FAQ 與回覆範本，每次只要貼上客戶問題即可。Team 與 Enterprise 方案的專案可以分享給同事。</p>` },
    { id: 'artifacts', title: 'Artifacts：產出可以直接使用的作品', html: `
<p>當 Claude 產生較完整、可以獨立使用的內容時，會放在對話旁邊的 <b>Artifact</b> 視窗中，例如：</p>
<ul>
<li>文件與報告（Markdown）、程式碼檔案</li>
<li>可以直接操作的網頁、小工具、遊戲（HTML 與 React）</li>
<li>圖表與流程圖（SVG、Mermaid）</li>
</ul>
<p>你可以繼續用對話修改它（「把按鈕改成藍色」「加上匯出 CSV 功能」），每次修改都會保留版本，也可以發布並分享連結。另外，Claude 也能直接建立與編輯 Word、Excel、PowerPoint、PDF 等檔案，產出後下載即可使用。</p>
<pre class="out">請做一個「團隊午餐抽籤」小工具：
- 可以輸入或刪除餐廳名稱
- 按下抽籤後有轉盤動畫
- 記錄最近 5 次的結果
- 手機上也要好用</pre>` },
    { id: 'files', title: '檔案、圖片、搜尋與連接器', html: `
<table>
<tr><th>功能</th><th>可以做什麼</th><th>提示詞例子</th></tr>
<tr><td>上傳檔案</td><td>PDF、Word、Excel、CSV、程式碼；Claude 會閱讀並可寫程式分析資料</td><td>「找出這份合約中對我方不利的條款，並說明原因」</td></tr>
<tr><td>圖片與截圖</td><td>讀取文字、表格、圖表、錯誤訊息、手寫筆記</td><td>「這張報錯截圖是什麼意思？要怎麼修？」</td></tr>
<tr><td>網頁搜尋</td><td>查詢最新資訊並附上來源</td><td>「比較 2026 年三家台灣電信的 5G 吃到飽方案」</td></tr>
<tr><td>研究（Research）</td><td>自動進行多次搜尋、交叉比對，產出有引用來源的研究報告</td><td>「調查台灣電動機車市場的現況與主要品牌」</td></tr>
<tr><td>連接器</td><td>連接 Google Drive、Gmail、Google 日曆、GitHub、Notion 等服務讀取資料</td><td>「整理我這週日曆上的會議，列出需要準備的資料」</td></tr>
</table>
<div class="box warn"><b class="t">分析數字時</b>請 Claude 用分析工具（寫程式）計算，而不是用「看的」估算；並要求說明計算方式，自己抽查幾筆。</div>` },
    { id: 'settings', title: '記憶、風格與個人偏好', html: `
<p>在設定中可以讓 Claude 更了解你：</p>
<ul>
<li><b>個人偏好</b>：例如「我是行銷人員，習慣用繁體中文，回答盡量簡潔」，會套用到所有對話。</li>
<li><b>記憶</b>：開啟後，Claude 會記住過去對話中的重要資訊，也可以查看與刪除它記住的內容。</li>
<li><b>風格（Styles）</b>：切換回答風格，例如簡潔、說明性，也可以上傳自己的文章建立專屬風格。</li>
</ul>
<pre class="out">實際工作範例：每週業務報告
1. 建立「週報」專案，上傳過去三份週報當作範本，專案指示寫明格式與讀者。
2. 每週上傳本週的銷售 Excel：「請依照範本格式產出本週週報，並畫出與上週的比較圖。」
3. 檢查數字後：「把第三點的原因分析寫得更具體，並建議下週的行動。」</pre>` }
  ],
  keypoints: [
    '專案把相關對話集中，並以專案知識（參考檔案）與專案指示（固定要求）提供背景。',
    'Artifacts 放置可獨立使用的作品（文件、程式、互動網頁、圖表），可持續修改與分享。',
    'Claude 能讀取 PDF、Office 檔案、圖片與截圖，也能建立 Word、Excel、PowerPoint 檔案。',
    '網頁搜尋取得最新資訊、研究功能產出附來源的報告、連接器讀取 Google Drive 等外部資料。',
    '數字分析要請 Claude 寫程式計算並說明方法，自己抽查結果。',
    '個人偏好、記憶與風格可以讓回答更符合你的習慣。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 55,
  title: 'Claude Code 入門',
  summary: 'Claude Code 是什麼、安裝與登入、第一次在專案中使用、Claude 如何讀檔改檔與請求權限、用 @ 引用檔案與 ! 執行指令、中斷與回溯、管理 context，以及在 IDE 與桌面中使用。',
  sections: [
    { id: 'what', title: 'Claude Code 是什麼', html: `
<p><b>Claude Code</b> 是在你的專案中工作的 AI 程式開發代理。和在網頁上問程式問題不同，它可以直接：</p>
<ul>
<li>搜尋、閱讀整個專案的程式碼，理解架構</li>
<li>新增與修改檔案</li>
<li>執行終端機指令：安裝套件、跑測試、啟動程式、使用 git</li>
<li>根據執行結果（錯誤訊息、測試失敗）自己修正，直到完成</li>
</ul>
<p>你用自然語言描述要做的事，它會規劃步驟並執行；需要修改檔案或執行指令時，預設會先詢問你的同意。它可以在終端機、VS Code 與 JetBrains 的擴充功能、桌面 App，以及網頁版（claude.ai/code）中使用。</p>` },
    { id: 'install', title: '安裝與登入', html: `
<pre class="out"># macOS、Linux、WSL：官方安裝程式
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# 安裝後確認版本、更新
claude --version
claude update</pre>
<p>第一次執行 <code>claude</code> 會引導你登入。可以用 Claude 訂閱帳號（Pro、Max、Team、Enterprise），或 Claude Console 的 API 帳號（依用量計費）。也可以用指令管理登入：</p>
<pre class="out">claude auth login            # 登入
claude auth login --console  # 用 Console 帳號登入（API 計費）
claude auth status           # 查看登入狀態
claude auth logout           # 登出</pre>
<div class="box tip"><b class="t">檢查環境</b>遇到奇怪的問題時，在 Claude Code 中輸入 <code>/doctor</code>，它會檢查安裝、設定、CLAUDE.md 等是否有問題並提出修正方式。</div>` },
    { id: 'first', title: '第一次使用', html: `
<pre class="out">cd ~/projects/my-shop      # 先進入專案資料夾
claude                     # 啟動互動模式</pre>
<p>Claude Code 以「啟動時所在的資料夾」作為工作範圍。進入後先讓它認識專案：</p>
<pre class="out">&gt; 這個專案是做什麼的？主要的資料夾結構和技術是什麼？
&gt; 使用者登入的流程是怎麼實作的？請列出相關檔案。
&gt; 怎麼在本機啟動這個專案、怎麼跑測試？</pre>
<p>接著交代具體的任務。描述得越具體，結果越好：</p>
<pre class="out">❌ 修一下登入的 bug

✅ 使用者在登入頁輸入錯誤密碼時，畫面沒有顯示錯誤訊息，
   只在 console 出現 401。請找出原因並修正，
   讓畫面顯示「帳號或密碼錯誤」，並補一個測試。</pre>
<p>Claude 要修改檔案時，會顯示修改內容（diff）並詢問：允許這次、這個工作階段都允許、或拒絕並告訴它要怎麼改。執行指令時也一樣。</p>` },
    { id: 'input', title: '輸入技巧：@、!、圖片與多行', html: `
<table>
<tr><th>輸入</th><th>作用</th><th>例子</th></tr>
<tr><td><code>@檔案路徑</code></td><td>引用檔案或資料夾，有自動完成</td><td><code>@src/api/user.ts 這裡為什麼會回傳 null？</code></td></tr>
<tr><td><code>!指令</code></td><td>直接執行終端機指令，輸出會加入對話讓 Claude 看到</td><td><code>!npm test</code></td></tr>
<tr><td><code>/指令</code></td><td>執行斜線指令或 Skill</td><td><code>/clear</code></td></tr>
<tr><td>貼上圖片</td><td>Ctrl+V 貼上截圖（例如設計稿、錯誤畫面）</td><td>「照這張設計稿做出登入頁」</td></tr>
<tr><td>多行輸入</td><td>反斜線 \ 加 Enter，或設定 Shift+Enter（<code>/terminal-setup</code>）</td><td></td></tr>
<tr><td><code>?</code></td><td>在空白輸入框按 ?，顯示快捷鍵說明</td><td></td></tr>
</table>
<p>也可以把資料直接用管線送給 Claude：<code>cat error.log | claude -p "這個錯誤是什麼原因？"</code>（第 10 章會詳細說明）。</p>` },
    { id: 'control', title: '中斷、回溯與管理 context', html: `
<table>
<tr><th>操作</th><th>作用</th></tr>
<tr><td><b>Esc</b></td><td>中斷 Claude 目前的動作，保留已完成的部分，你可以補充或改變方向</td></tr>
<tr><td><b>Esc 兩下</b>（輸入框空白時）</td><td>回溯：選擇先前的某個訊息，把對話及（或）程式碼還原到那時候，等同 <code>/rewind</code></td></tr>
<tr><td><b>Ctrl+C</b></td><td>中斷；沒有執行中的動作時，按兩次離開</td></tr>
<tr><td><code>/clear</code></td><td>開始新的空白對話。換一個不相關的任務時使用</td></tr>
<tr><td><code>/compact [說明]</code></td><td>把目前的對話摘要壓縮，釋放 context 空間，可附上要保留的重點</td></tr>
<tr><td><code>/context</code></td><td>以色塊顯示目前 context 的使用量與組成</td></tr>
<tr><td><code>claude -c</code>／<code>claude -r</code></td><td>重新開啟終端機後，繼續上一次的對話／選擇要恢復的對話</td></tr>
</table>
<div class="box exam"><b class="t">為什麼要管理 context</b>對話越長，裡面不相關的內容越多，Claude 越容易分心，也越花費用量。一個任務完成後就 <code>/clear</code>，是最簡單有效的習慣。Claude Code 在 context 快滿時也會自動壓縮。</div>` }
  ],
  keypoints: [
    'Claude Code 是在專案中工作的開發代理：能讀寫檔案、執行指令，並根據結果自行修正。',
    '用官方安裝程式安裝，以訂閱帳號或 Console 帳號登入；claude auth status 查看狀態，/doctor 檢查環境。',
    '在專案資料夾執行 claude 啟動；先讓它認識專案，再給具體的任務描述。',
    '@ 引用檔案、! 執行終端機指令、/ 執行指令、Ctrl+V 貼上圖片、? 顯示快捷鍵。',
    'Esc 中斷、Esc 兩下回溯（/rewind）、/clear 新對話、/compact 壓縮、/context 看用量。',
    'claude -c 繼續最近的對話、claude -r 選擇要恢復的對話。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 55,
  title: '指令、快捷鍵與權限模式',
  summary: '常用斜線指令分類整理、claude 命令列參數、權限模式（預設、自動接受編輯、計畫、自動、略過權限）與 Shift+Tab 切換、模型與 effort 的調整，以及常用快捷鍵。',
  sections: [
    { id: 'slash', title: '常用斜線指令', html: `
<p>在輸入框打 <code>/</code> 會列出所有可用的指令，繼續打字可以篩選。依用途整理常用的指令：</p>
<table>
<tr><th>用途</th><th>指令</th><th>說明</th></tr>
<tr><td rowspan="5">對話管理</td><td><code>/clear</code></td><td>開始新的空白對話</td></tr>
<tr><td><code>/compact [重點]</code></td><td>摘要壓縮對話以釋放 context</td></tr>
<tr><td><code>/resume</code></td><td>恢復先前的對話</td></tr>
<tr><td><code>/rewind</code></td><td>把對話或程式碼回溯到先前的檢查點（別名 /undo）</td></tr>
<tr><td><code>/export</code>、<code>/copy</code></td><td>匯出對話／複製最後一個回答</td></tr>
<tr><td rowspan="5">模型與狀態</td><td><code>/model</code></td><td>切換模型（例如 opus、sonnet、haiku、fable）</td></tr>
<tr><td><code>/effort</code></td><td>調整努力程度：low、medium、high、xhigh、max</td></tr>
<tr><td><code>/fast</code></td><td>切換快速模式（輸出更快，價格較高）</td></tr>
<tr><td><code>/context</code></td><td>查看 context 使用量</td></tr>
<tr><td><code>/usage</code></td><td>查看用量與花費（別名 /cost、/stats）</td></tr>
<tr><td rowspan="5">專案與設定</td><td><code>/init</code></td><td>產生專案的 CLAUDE.md</td></tr>
<tr><td><code>/memory</code></td><td>編輯 CLAUDE.md、管理自動記憶</td></tr>
<tr><td><code>/permissions</code></td><td>管理工具權限規則</td></tr>
<tr><td><code>/config</code>、<code>/status</code></td><td>設定介面／版本、模型、帳號狀態</td></tr>
<tr><td><code>/add-dir</code></td><td>加入其他資料夾作為工作範圍</td></tr>
<tr><td rowspan="4">程式審查</td><td><code>/diff</code></td><td>檢視目前工作目錄的變更</td></tr>
<tr><td><code>/code-review</code></td><td>審查目前的變更或 PR，找出 bug（別名 /review）</td></tr>
<tr><td><code>/security-review</code></td><td>檢查目前分支的變更是否有安全漏洞</td></tr>
<tr><td><code>/simplify</code></td><td>檢查變更的程式碼是否能簡化並套用修正</td></tr>
<tr><td rowspan="5">擴充與整合</td><td><code>/mcp</code></td><td>管理 MCP 伺服器與登入</td></tr>
<tr><td><code>/skills</code>、<code>/agents</code>、<code>/hooks</code></td><td>列出 Skills／管理 Subagents／檢視 Hooks</td></tr>
<tr><td><code>/plugin</code></td><td>安裝與管理外掛</td></tr>
<tr><td><code>/install-github-app</code></td><td>為 GitHub 儲存庫安裝 Claude App 與 Actions</td></tr>
<tr><td><code>/ide</code></td><td>管理與 IDE 的整合</td></tr>
<tr><td rowspan="3">其他</td><td><code>/help</code></td><td>顯示說明與所有指令</td></tr>
<tr><td><code>/doctor</code></td><td>診斷安裝與設定問題</td></tr>
<tr><td><code>/btw 問題</code></td><td>問一個不加入目前對話的旁支問題</td></tr>
</table>
<p>互動練習中的「Claude Code 指令速查」可以搜尋所有指令、參數與快捷鍵。</p>` },
    { id: 'cli', title: '命令列參數', html: `
<pre class="out">claude                              # 互動模式
claude "說明這個專案"                # 帶著第一個問題進入互動模式
claude -p "說明這個函式"             # 非互動模式（print）：回答後結束
claude -c                           # 繼續目前資料夾最近的對話
claude -r                           # 開啟對話清單選擇要恢復的對話
claude -r "auth-refactor" "完成這個 PR"   # 以名稱恢復對話並繼續
claude -n "auth-refactor"           # 為這次對話命名
claude --model sonnet               # 指定模型
claude --effort high                # 指定努力程度
claude --permission-mode plan       # 以計畫模式開始
claude --add-dir ../shared-lib      # 加入其他資料夾
claude -w feature-login             # 在獨立的 git worktree 中工作</pre>
<table>
<tr><th>參數</th><th>說明</th></tr>
<tr><td><code>-p</code>、<code>--print</code></td><td>非互動模式，適合腳本與管線</td></tr>
<tr><td><code>--output-format</code></td><td>非互動模式的輸出格式：text、json、stream-json</td></tr>
<tr><td><code>--allowedTools</code>／<code>--disallowedTools</code></td><td>不需詢問就能使用的工具／禁止的工具，例如 <code>"Bash(npm test *)"</code></td></tr>
<tr><td><code>--max-turns</code></td><td>限制非互動模式的代理回合數</td></tr>
<tr><td><code>--append-system-prompt</code></td><td>在預設系統提示詞後面加上自訂內容</td></tr>
<tr><td><code>--mcp-config</code></td><td>從 JSON 檔載入 MCP 伺服器</td></tr>
<tr><td><code>--dangerously-skip-permissions</code></td><td>略過所有權限詢問，只應在隔離環境（容器、虛擬機）使用</td></tr>
</table>` },
    { id: 'modes', title: '權限模式', html: `
<p>按 <b>Shift+Tab</b> 循環切換權限模式，目前的模式會顯示在輸入框下方：</p>
<table>
<tr><th>模式</th><th>行為</th><th>適合</th></tr>
<tr><td><b>default</b>（Manual，預設）</td><td>修改檔案、執行指令前都會詢問</td><td>剛開始使用、重要的專案</td></tr>
<tr><td><b>acceptEdits</b>（自動接受編輯）</td><td>修改檔案不再詢問，執行指令仍會詢問</td><td>信任方向、想加快速度時</td></tr>
<tr><td><b>plan</b>（計畫模式）</td><td>只閱讀與分析，不修改任何東西，最後提出計畫讓你確認</td><td>大型修改前先討論做法</td></tr>
<tr><td><b>auto</b>（自動模式）</td><td>由分類器判斷每個動作的風險，安全的直接執行，有風險的才詢問或阻擋</td><td>長時間任務、減少打斷</td></tr>
<tr><td><b>bypassPermissions</b></td><td>完全不詢問</td><td>只在拋棄式的隔離環境中使用</td></tr>
</table>
<p>也可以直接輸入 <code>/plan 新增訂單匯出功能</code> 進入計畫模式並開始規劃，或用 <code>claude --permission-mode plan</code> 啟動。</p>
<div class="box warn"><b class="t">略過權限的風險</b>bypassPermissions 模式下，Claude 可以執行任何指令、刪除任何檔案，也更容易受到「提示注入」影響（例如網頁或檔案中藏著惡意指示）。只在容器或虛擬機這類隔離、可以重建的環境中使用。</div>` },
    { id: 'keys', title: '常用快捷鍵', html: `
<table>
<tr><th>快捷鍵</th><th>作用</th></tr>
<tr><td>Esc</td><td>中斷目前的回應或工具執行</td></tr>
<tr><td>Esc 兩下</td><td>清除輸入；輸入框空白時開啟回溯選單</td></tr>
<tr><td>Shift+Tab</td><td>切換權限模式</td></tr>
<tr><td>Ctrl+C／Ctrl+D</td><td>中斷或清除輸入／離開 Claude Code</td></tr>
<tr><td>↑ ↓</td><td>瀏覽輸入紀錄</td></tr>
<tr><td>Ctrl+R</td><td>搜尋輸入紀錄</td></tr>
<tr><td>Ctrl+O</td><td>切換詳細的對話紀錄檢視（顯示工具執行細節）</td></tr>
<tr><td>Ctrl+T</td><td>顯示或隱藏 Claude 的待辦清單</td></tr>
<tr><td>Ctrl+B</td><td>把執行中的指令或代理放到背景</td></tr>
<tr><td>Ctrl+G</td><td>用你的文字編輯器編輯提示詞</td></tr>
<tr><td>Ctrl+V</td><td>貼上剪貼簿中的圖片（Windows 為 Alt+V）</td></tr>
<tr><td>Option+P／Alt+P</td><td>切換模型</td></tr>
<tr><td>Ctrl+S</td><td>暫存目前的輸入，稍後再取回</td></tr>
</table>
<p>按鍵可以用 <code>/keybindings</code> 自訂；Claude 執行時，你仍然可以繼續輸入，訊息會排隊等目前的回合結束後送出。</p>` }
  ],
  keypoints: [
    '打 / 列出所有指令：/clear、/compact、/resume、/rewind 管理對話；/model、/effort 調整模型。',
    '/init、/memory、/permissions、/config 管理專案與設定；/code-review、/security-review 審查變更。',
    'claude -p 非互動、-c 繼續、-r 恢復、--model、--permission-mode、--add-dir 為常用參數。',
    'Shift+Tab 切換權限模式：default、acceptEdits、plan、auto；bypassPermissions 只在隔離環境使用。',
    '大型修改前先用計畫模式（/plan）讓 Claude 讀程式並提出計畫。',
    'Esc 中斷、Esc 兩下回溯、Ctrl+O 看細節、Ctrl+B 背景執行、Ctrl+V 貼圖。'
  ]
}
);
