/* AI 應用規劃師初級 科目二：生成式 AI 應用與規劃（L12） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 40,
  title: 'No Code / Low Code',
  summary: 'L12101–L12102：No Code 與 Low Code 的定義與差異、常見平台、AI 民主化與公民開發者、優勢與限制、治理要點。',
  sections: [
    { id: 'concept', title: '基本概念', html: `
<div class="table-wrap"><table>
<tr><th></th><th>No Code 無程式碼</th><th>Low Code 低程式碼</th></tr>
<tr><td>使用方式</td><td>完全以拖拉、點選、設定完成</td><td>以視覺化介面為主，<b>必要時寫少量程式</b>擴充</td></tr>
<tr><td>目標使用者</td><td>業務人員、<b>公民開發者（Citizen Developer）</b></td><td>具基礎技術能力者、IT 人員</td></tr>
<tr><td>彈性</td><td>較低，受限於平台功能</td><td>較高，可客製化與整合</td></tr>
<tr><td>例子</td><td>Zapier、Make、Google Teachable Machine、ChatGPT 的 GPTs</td><td>Microsoft Power Apps、Power Automate、OutSystems、n8n、Dify、Copilot Studio</td></tr>
</table></div>
<p><b>AI 民主化（AI Democratization）</b>：No Code / Low Code 讓沒有程式背景的人也能建立 AI 應用，例如以拖拉方式建立聊天機器人、訓練影像分類模型、串接自動化流程。</p>
<h3>常見用途</h3>
<ul>
  <li><b>流程自動化</b>：收到表單後自動通知主管、整理到試算表、寄出確認信。</li>
  <li><b>AI 聊天機器人</b>：上傳公司文件建立問答機器人。</li>
  <li><b>簡易模型訓練</b>：上傳圖片分類訓練影像辨識模型。</li>
  <li><b>內部小工具</b>：請假系統、庫存查詢、簽核表單。</li>
</ul>` },
    { id: 'pros', title: '優勢與限制', html: `
<div class="table-wrap"><table>
<tr><th>優勢</th><th>限制</th></tr>
<tr><td>開發速度快、可快速製作原型（Prototype）與 POC</td><td><b>客製化彈性有限</b>，複雜邏輯難以實現</td></tr>
<tr><td>降低技術門檻與開發成本</td><td><b>廠商綁定（Vendor Lock-in）</b>，難以搬遷到其他平台</td></tr>
<tr><td>業務人員可直接參與，減少需求溝通落差</td><td><b>擴充性與效能</b>：大量使用者或資料時可能不足</td></tr>
<tr><td>減輕 IT 部門負擔</td><td><b>資安與治理</b>：容易產生影子 IT、資料散落、權限失控</td></tr>
<tr><td>容易迭代修改</td><td>授權費用隨使用量增加；除錯與版本控管較困難</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>「低門檻不等於零風險」。適合快速驗證想法與部門內部工具；核心系統、高流量服務或需高度客製的情境，仍應考慮傳統開發。</div>
<h3>治理要點</h3>
<ul>
  <li>建立平台使用規範與核准流程，避免影子 IT。</li>
  <li>管控資料連接器（Connector）與權限，避免機敏資料外流。</li>
  <li>重要應用要有負責人、文件與備份，避免「做的人離職就沒人懂」。</li>
</ul>` }
  ],
  keypoints: [
    'No Code 完全不寫程式；Low Code 必要時寫少量程式',
    '公民開發者：非 IT 背景、使用 No Code 工具開發應用的業務人員',
    '優勢：快速、低門檻、適合原型與 POC',
    '限制：客製化有限、廠商綁定、擴充性、資安治理',
    '要避免影子 IT 與資料外流，需訂定平台使用規範'
  ]
},
{
  id: 'c08', subject: 2, minutes: 45,
  title: '生成式 AI 應用領域與常見工具',
  summary: 'L12201：文本、圖像、聲音、影片、程式碼生成的應用，ChatGPT、Gemini、Copilot、Midjourney、GitHub Copilot、Cursor 等工具特性，以及溫度等生成參數。',
  sections: [
    { id: 'domains', title: '應用領域', html: `
<div class="table-wrap"><table>
<tr><th>領域</th><th>應用</th><th>產業例子</th></tr>
<tr><td><b>文本生成</b></td><td>撰寫、摘要、翻譯、改寫、問答</td><td>行銷文案、會議紀錄摘要、客服回覆、合約初稿</td></tr>
<tr><td><b>圖像生成</b></td><td>文字生成圖片、修圖、風格轉換</td><td>廣告素材、產品設計概念圖、室內設計模擬</td></tr>
<tr><td><b>聲音生成</b></td><td>語音合成（TTS）、配音、音樂生成</td><td>有聲書、語音客服、多語配音</td></tr>
<tr><td><b>影片生成</b></td><td>文字或圖片生成影片、虛擬主播</td><td>教學影片、短影音行銷</td></tr>
<tr><td><b>程式碼生成</b></td><td>撰寫、解釋、除錯、測試程式</td><td>軟體開發、資料分析腳本</td></tr>
<tr><td><b>多模態</b></td><td>看圖回答、圖表分析、語音對話</td><td>文件辨識、醫療影像輔助、視障輔助</td></tr>
</table></div>` },
    { id: 'tools', title: '常見工具', html: `
<div class="table-wrap"><table>
<tr><th>工具</th><th>類型</th><th>特點</th></tr>
<tr><td><b>ChatGPT</b>（OpenAI）</td><td>對話式 LLM</td><td>文字、圖片、語音、檔案分析；可建立自訂 GPTs</td></tr>
<tr><td><b>OpenAI API</b></td><td>開發者介面</td><td>以程式呼叫模型，依 Token 計費，可整合到企業系統</td></tr>
<tr><td><b>Gemini</b>（Google）</td><td>多模態 LLM</td><td>與 Google Workspace 整合，長上下文</td></tr>
<tr><td><b>Microsoft 365 Copilot</b></td><td>辦公室 AI 助理</td><td>整合 Word、Excel、PowerPoint、Outlook、Teams</td></tr>
<tr><td><b>Copilot Studio</b></td><td>Low Code 代理建置平台</td><td>以視覺化方式建立企業 AI 助理與代理，串接內部資料</td></tr>
<tr><td><b>GitHub Copilot</b></td><td>程式碼助理</td><td>在編輯器中自動補全與產生程式碼</td></tr>
<tr><td><b>VS Code 中的 Copilot</b></td><td>編輯器整合</td><td>在 VS Code 中聊天、解釋與修改程式，可使用代理模式</td></tr>
<tr><td><b>Cursor</b></td><td>AI 程式編輯器</td><td>以 AI 為核心的程式編輯器，可理解整個專案</td></tr>
<tr><td><b>Midjourney</b></td><td>圖像生成</td><td>藝術風格強的文字生成圖片</td></tr>
<tr><td><b>Stable Diffusion</b></td><td>圖像生成</td><td><b>開源</b>，可在本機執行與微調</td></tr>
<tr><td>Claude、Llama 等</td><td>LLM</td><td>Llama 等開放權重模型可地端部署</td></tr>
</table></div>
<div class="box tip"><b class="t">選擇考量</b>任務類型、輸出品質、資料隱私（是否會被拿去訓練、能否地端部署）、與既有系統整合、成本（訂閱制或依 Token 計費）、語言支援。</div>` },
    { id: 'params', title: '生成參數', html: `
<div class="table-wrap"><table>
<tr><th>參數</th><th>作用</th></tr>
<tr><td><b>Temperature 溫度</b></td><td>控制隨機性。<b>低</b>（如 0～0.3）：穩定、一致，適合事實問答、程式碼；<b>高</b>（如 0.8 以上）：多樣、有創意，適合發想，但較易離題</td></tr>
<tr><td><b>Top-p</b></td><td>只從累積機率前 p 的候選字中挑選，也是控制多樣性</td></tr>
<tr><td><b>最大輸出長度 Max Tokens</b></td><td>限制回覆長度，也影響成本</td></tr>
<tr><td><b>系統提示詞 System Prompt</b></td><td>設定模型的角色、規則與風格，優先於一般對話</td></tr>
</table></div>
<p>可以到「互動練習」用 <b>Softmax 與溫度參數</b>工具觀察溫度如何改變機率分布。</p>` }
  ],
  keypoints: [
    '生成式 AI 應用：文本、圖像、聲音、影片、程式碼、多模態',
    'Copilot Studio 是建立企業 AI 代理的 Low Code 平台',
    'GitHub Copilot、Cursor 用於程式開發',
    'Midjourney 圖像生成；Stable Diffusion 開源可地端部署',
    '溫度低穩定、溫度高多樣；事實與程式碼任務宜用低溫',
    '選工具要考量任務、品質、隱私、整合與成本'
  ]
},
{
  id: 'c09', subject: 2, minutes: 55,
  title: '提示工程、RAG 與 AI 代理',
  summary: 'L12202：提示詞框架與設計原則、零樣本與少樣本、思維鏈、提示優化，檢索增強生成（RAG）流程、微調比較，以及 AI 工具整合與 AI 代理。',
  sections: [
    { id: 'prompt', title: '提示工程', html: `
<p><b>提示工程（Prompt Engineering）</b>是設計與優化輸入指令，讓生成式 AI 產出更準確、符合需求的結果。</p>
<h3>好提示詞的要素</h3>
<div class="concepts">
  <div class="concept"><b>角色 Role</b><span>你是一位資深人資顧問</span></div>
  <div class="concept"><b>任務 Task</b><span>撰寫一份工程師職缺說明</span></div>
  <div class="concept"><b>脈絡 Context</b><span>公司 50 人、做 SaaS、遠端工作</span></div>
  <div class="concept"><b>格式 Format</b><span>以條列呈現，300 字內</span></div>
  <div class="concept"><b>限制 Constraints</b><span>不要使用性別或年齡相關字眼</span></div>
  <div class="concept"><b>範例 Examples</b><span>提供一份過去的職缺說明參考</span></div>
</div>
<p>常見框架如 <b>RTF</b>（Role、Task、Format）、<b>CO-STAR</b>（Context、Objective、Style、Tone、Audience、Response）都是把上述要素組織起來。</p>
<h3>常見技巧</h3>
<div class="table-wrap"><table>
<tr><th>技巧</th><th>說明</th></tr>
<tr><td><b>零樣本 Zero-shot</b></td><td>不給範例，直接下指令</td></tr>
<tr><td><b>少樣本 Few-shot</b></td><td>提供幾個輸入輸出範例，讓模型模仿格式與風格</td></tr>
<tr><td><b>思維鏈 Chain-of-Thought</b></td><td>要求模型逐步推理，提升數學與邏輯題的正確率</td></tr>
<tr><td><b>任務拆解</b></td><td>把複雜任務拆成多個步驟，逐步完成</td></tr>
<tr><td><b>使用分隔符號</b></td><td>以 ### 或 XML 標籤區隔指令與資料</td></tr>
<tr><td><b>迭代優化</b></td><td>根據輸出結果調整提示詞，反覆改進</td></tr>
</table></div>
<div class="box warn"><b class="t">注意</b>提示工程無法讓模型知道它沒學過的最新資訊或公司內部資料，這時要用 RAG。</div>` },
    { id: 'rag', title: '檢索增強生成（RAG）', html: `
<p><b>RAG（Retrieval-Augmented Generation）</b>先從外部知識庫檢索相關資料，再連同問題交給 LLM 回答。可以讓模型使用<b>最新資訊與企業內部文件</b>，並<b>降低幻覺</b>、提供引用來源。</p>
<div class="flow">
  <div><b>1. 文件切塊</b><span>Chunking：把文件切成適當長度</span></div>
  <div><b>2. 向量化</b><span>Embedding：轉成語意向量</span></div>
  <div><b>3. 存入向量資料庫</b><span>Vector Database</span></div>
  <div><b>4. 檢索</b><span>問題也向量化，找出最相似的片段</span></div>
  <div><b>5. 生成</b><span>把片段與問題一起交給 LLM 回答</span></div>
</div>
<h3>RAG、微調與提示工程比較</h3>
<div class="table-wrap"><table>
<tr><th>方法</th><th>做法</th><th>適合情境</th><th>成本</th></tr>
<tr><td><b>提示工程</b></td><td>調整輸入指令</td><td>格式、語氣、一般任務</td><td>最低</td></tr>
<tr><td><b>RAG</b></td><td>外掛知識庫</td><td><b>知識需經常更新</b>、需引用來源、企業文件問答</td><td>中</td></tr>
<tr><td><b>微調 Fine-tuning</b></td><td>用特定資料再訓練模型</td><td>改變模型的風格、專業用語或特定任務行為</td><td>較高</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>「公司規章常更新、希望 AI 依最新規章回答並附出處」，答案是 <b>RAG</b>，不是微調。</div>` },
    { id: 'agent', title: 'AI 工具整合與 AI 代理', html: `
<ul>
  <li><b>AI 工具整合</b>：透過 API、外掛（Plugin）、自動化平台（Power Automate、Zapier、n8n）把 AI 嵌入既有流程，例如收到客訴信後自動分類、摘要並建立工單。</li>
  <li><b>函式呼叫（Function Calling）／工具使用（Tool Use）</b>：LLM 判斷何時呼叫外部工具，例如查天氣、查資料庫、寄信。</li>
  <li><b>AI 代理（AI Agent）</b>：能<b>自主規劃步驟、使用工具、觀察結果並調整</b>以完成目標的 AI 系統。與一般聊天機器人的差別是會主動執行多步驟任務。</li>
  <li><b>多代理系統（Multi-agent）</b>：多個各司其職的代理協作，例如研究代理、撰寫代理、審查代理。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>層級</th><th>特性</th></tr>
<tr><td>LLM 聊天</td><td>一問一答，被動回應</td></tr>
<tr><td>工作流程 Workflow</td><td>人預先設計固定步驟，AI 在其中執行某些環節</td></tr>
<tr><td>AI 代理 Agent</td><td>由 AI 自行決定步驟與工具使用</td></tr>
</table></div>
<div class="box warn"><b class="t">風險</b>代理可以實際執行動作（寄信、下單、改資料），應採<b>最小權限</b>、重要動作需<b>人工確認</b>，並記錄所有操作。</div>` }
  ],
  keypoints: [
    '好提示詞：角色、任務、脈絡、格式、限制、範例',
    'Zero-shot 不給範例；Few-shot 給範例；Chain-of-Thought 逐步推理',
    'RAG：切塊 → 向量化 → 向量資料庫 → 檢索 → 生成',
    'RAG 適合知識常更新、需附來源；微調適合改變模型風格或專業行為',
    'AI 代理能自主規劃、使用工具、執行多步驟任務',
    '代理要最小權限，重要動作需人工確認'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '生成式 AI 導入評估',
  summary: 'L12301：從需求與痛點出發、技術工具與模型評估、自建與採購比較、成本效益分析、組織準備度、AI 代理導入評估，以及經濟部產業發展署 AI 導入指引的精神。',
  sections: [
    { id: 'need', title: '從需求出發', html: `
<p>導入生成式 AI 的第一步<strong>不是買工具，而是找需求與痛點</strong>。好的導入題目通常具備：</p>
<ul>
  <li><b>重複性高、耗時</b>：例如每天整理大量客訴、撰寫制式報告。</li>
  <li><b>以文字或內容為主</b>：摘要、草稿、翻譯、問答。</li>
  <li><b>可接受人工覆核</b>：AI 產出草稿，由人確認。</li>
  <li><b>成效可量測</b>：節省工時、縮短回應時間、提升滿意度。</li>
</ul>
<div class="box warn"><b class="t">不適合的情境</b>需要百分之百正確且無人覆核的關鍵決策、涉及大量機密且無法控管資料流向、缺乏資料或流程本身尚未標準化。</div>` },
    { id: 'eval', title: '技術、工具與模型評估', html: `
<div class="table-wrap"><table>
<tr><th>評估面向</th><th>考量</th></tr>
<tr><td><b>效能與品質</b></td><td>正確率、幻覺比例、回應速度、中文能力</td></tr>
<tr><td><b>資料安全與隱私</b></td><td>資料是否用於訓練、存放地點、是否支援地端或私有雲</td></tr>
<tr><td><b>整合能力</b></td><td>能否與既有系統（ERP、CRM、文件系統）串接</td></tr>
<tr><td><b>成本</b></td><td>授權、Token 用量、算力、維運人力</td></tr>
<tr><td><b>可擴充性與供應商</b></td><td>使用量成長是否支撐得住、供應商穩定性與合約條款</td></tr>
<tr><td><b>合規</b></td><td>是否符合個資法、產業法規與公司政策</td></tr>
</table></div>
<h3>解決方案選擇</h3>
<div class="table-wrap"><table>
<tr><th>方案</th><th>優點</th><th>缺點</th></tr>
<tr><td><b>直接採用 SaaS 工具</b>（如 ChatGPT 企業版、Copilot）</td><td>最快上線、免維運</td><td>客製化有限、資料在外部</td></tr>
<tr><td><b>呼叫 API 自行整合</b></td><td>可嵌入自家系統、彈性高</td><td>需開發能力，依用量計費</td></tr>
<tr><td><b>開源模型地端部署</b></td><td>資料不外流、可完全掌控</td><td>需 GPU 設備與專業人力</td></tr>
<tr><td><b>自行訓練模型</b></td><td>最高客製化</td><td>成本極高，一般企業少用</td></tr>
</table></div>` },
    { id: 'roi', title: '成本效益與準備度', html: `
<h3>成本效益分析</h3>
<ul>
  <li><b>成本</b>：授權或 API 費用、硬體、系統整合開發、資料整理、教育訓練、維運。</li>
  <li><b>效益</b>：節省工時（可換算人力成本）、提升產出品質、縮短回應時間、增加營收。</li>
  <li><b>投資報酬率 ROI</b> =（效益 − 成本）÷ 成本。</li>
</ul>
<div class="box analogy"><b class="t">計算範例</b>客服團隊 10 人，每人每天花 2 小時寫回覆。導入 AI 草稿後減少一半時間，每月約省 10 × 1 小時 × 22 天 = 220 小時。若時薪成本 300 元，每月效益 66,000 元；工具與維運每月 20,000 元，則每月淨效益 46,000 元。</div>
<h3>組織準備度</h3>
<ul>
  <li><b>資料準備度</b>：資料是否數位化、乾淨、可取得。</li>
  <li><b>人才與文化</b>：員工的 AI 素養、主管支持、對變革的接受度。</li>
  <li><b>基礎設施</b>：網路、雲端、資安防護。</li>
  <li><b>治理機制</b>：AI 使用政策、風險管理流程。</li>
</ul>
<h3>經濟部產業發展署《AI 導入指引》的精神</h3>
<p>協助企業（特別是中小企業）循序導入 AI：先盤點營運痛點與資料現況，評估導入價值與可行性，從小規模試點開始，再逐步擴大並建立持續改善機制。考試時以「需求導向、循序漸進、試點驗證、重視資料與人才」為核心理解。</p>
<h3>AI 代理的導入評估</h3>
<p>除了一般評估外，要特別評估代理可存取的系統與權限、錯誤動作的影響範圍、人工介入點與操作紀錄。</p>` }
  ],
  keypoints: [
    '導入第一步是找需求與痛點，不是買工具',
    '適合題目：重複耗時、以文字為主、可人工覆核、成效可量測',
    '評估面向：品質、資安隱私、整合、成本、擴充性、合規',
    'SaaS 最快；API 彈性高；地端部署資料不外流但需設備人力',
    'ROI =（效益 − 成本）÷ 成本',
    '準備度：資料、人才文化、基礎設施、治理'
  ]
},
{
  id: 'c11', subject: 2, minutes: 40,
  title: '生成式 AI 導入規劃',
  summary: 'L12302：目標設定、資源分配、導入策略與階段、試點驗證、變革管理與教育訓練、測試與持續改善。',
  sections: [
    { id: 'goal', title: '目標設定與資源分配', html: `
<p>目標應符合 <b>SMART</b> 原則：<b>具體（Specific）、可衡量（Measurable）、可達成（Achievable）、相關（Relevant）、有時限（Time-bound）</b>。</p>
<div class="box analogy"><b class="t">範例</b>「提升客服效率」太模糊；「三個月內，讓客服平均回覆時間從 8 分鐘降到 5 分鐘，滿意度維持 4.5 分以上」才符合 SMART。</div>
<h3>資源分配</h3>
<ul>
  <li><b>人力</b>：專案負責人、業務單位代表、IT、資安、法務。</li>
  <li><b>預算</b>：工具授權、開發、教育訓練、預備金。</li>
  <li><b>資料</b>：需要整理哪些文件或資料庫。</li>
  <li><b>時程</b>：里程碑與檢核點。</li>
</ul>` },
    { id: 'strategy', title: '導入策略與階段', html: `
<div class="flow">
  <div><b>1. 評估與準備</b><span>需求盤點、可行性、選定題目</span></div>
  <div><b>2. 概念驗證 POC</b><span>小範圍驗證技術是否可行</span></div>
  <div><b>3. 試點 Pilot</b><span>在一個部門實際使用，收集回饋</span></div>
  <div><b>4. 擴大導入</b><span>推廣到更多單位</span></div>
  <div><b>5. 持續優化</b><span>監控成效、調整與更新</span></div>
</div>
<ul>
  <li><b>POC（Proof of Concept）</b>：驗證「做不做得到」，規模小、時間短。</li>
  <li><b>試點（Pilot）</b>：驗證「實際用起來有沒有效」，有真實使用者。</li>
  <li><b>由小到大、快速迭代</b>：先選影響明顯、風險較低的題目，累積成功案例再擴大。</li>
</ul>` },
    { id: 'change', title: '變革管理、測試與因應措施', html: `
<h3>變革管理</h3>
<ul>
  <li>高階主管支持並清楚說明導入目的，降低員工「會被取代」的焦慮。</li>
  <li><b>教育訓練</b>：工具操作、提示詞技巧、使用規範與風險意識。</li>
  <li>建立<b>內部推廣者（AI Champion）</b>與經驗分享機制。</li>
</ul>
<h3>測試</h3>
<ul>
  <li>功能測試：輸出品質、正確率、回應時間。</li>
  <li>安全測試：是否洩漏機密、是否被提示注入攻擊誘導。</li>
  <li>使用者驗收測試（UAT）：由實際使用者確認符合需求。</li>
</ul>
<h3>因應措施</h3>
<ul>
  <li>準備<b>備援方案</b>：AI 服務中斷時改回人工流程。</li>
  <li>設定<b>人工覆核</b>的關卡，尤其是對外發布或重要決策。</li>
  <li>定期檢討 KPI，必要時調整或停止專案。</li>
</ul>` }
  ],
  keypoints: [
    '目標符合 SMART：具體、可衡量、可達成、相關、有時限',
    '導入階段：評估 → POC → 試點 → 擴大 → 持續優化',
    'POC 驗證可行性；Pilot 驗證實際成效',
    '變革管理：主管支持、教育訓練、內部推廣者',
    '準備備援方案與人工覆核關卡'
  ]
},
{
  id: 'c12', subject: 2, minutes: 50,
  title: '生成式 AI 風險管理',
  summary: 'L12303：幻覺、偏見、隱私與機密外洩、著作權、深偽與詐騙、提示注入等風險，風險評估矩陣與應對策略，以及使用政策與合規。',
  sections: [
    { id: 'risks', title: '生成式 AI 的主要風險', html: `
<div class="table-wrap"><table>
<tr><th>風險</th><th>說明</th><th>因應措施</th></tr>
<tr><td><b>幻覺 Hallucination</b></td><td>產生看似合理但錯誤或捏造的內容，例如虛構的法條或文獻</td><td>RAG 提供可信來源、要求附引用、人工查證、降低溫度</td></tr>
<tr><td><b>偏見與歧視 Bias</b></td><td>訓練資料的偏見反映在輸出，例如刻板印象</td><td>多元測試、偏見檢測、人工審查</td></tr>
<tr><td><b>隱私與機密外洩</b></td><td>員工將個資或營業秘密輸入公開 AI 服務</td><td>使用企業版、關閉資料訓練、DLP、使用政策</td></tr>
<tr><td><b>著作權與智慧財產</b></td><td>生成內容可能侵害他人著作；純 AI 生成內容的著作權歸屬有爭議</td><td>確認工具授權條款、避免模仿特定作品、保留人類創作貢獻</td></tr>
<tr><td><b>深偽與詐騙 Deepfake</b></td><td>偽造聲音或影像冒充他人</td><td>回撥確認、多重驗證、內容標示與浮水印</td></tr>
<tr><td><b>提示注入 Prompt Injection</b></td><td>惡意指令藏在輸入或文件中，使 AI 偏離原本任務或洩漏資訊</td><td>區隔系統指令與外部內容、輸出檢查、限制權限</td></tr>
<tr><td><b>過度依賴</b></td><td>使用者不加思考地接受 AI 輸出</td><td>教育訓練、保留人工判斷</td></tr>
<tr><td><b>合規風險</b></td><td>違反個資法、產業法規或 AI 相關法規</td><td>法遵審查、影響評估</td></tr>
</table></div>` },
    { id: 'assess', title: '風險評估與應對策略', html: `
<p>以<b>可能性 × 衝擊</b>評估風險等級，再決定策略：</p>
<div class="table-wrap"><table>
<tr><th>策略</th><th>說明</th><th>例子</th></tr>
<tr><td><b>降低 Mitigate</b></td><td>採取控制措施降低可能性或衝擊</td><td>加入人工覆核、RAG、內容過濾</td></tr>
<tr><td><b>避免 Avoid</b></td><td>不做該項應用</td><td>不用生成式 AI 處理機密文件</td></tr>
<tr><td><b>轉移 Transfer</b></td><td>透過合約或保險轉移</td><td>與供應商約定責任與賠償</td></tr>
<tr><td><b>接受 Accept</b></td><td>風險低且在可承受範圍</td><td>內部腦力激盪用途</td></tr>
</table></div>
<div class="box tip"><b class="t">人機協作原則</b><b>人在迴圈中（Human-in-the-loop）</b>：重要輸出由人確認後才使用。風險越高，人工介入程度應越高。</div>` },
    { id: 'policy', title: '使用政策與合規', html: `
<p>組織應訂定<b>生成式 AI 使用政策</b>，內容通常包括：</p>
<ul>
  <li>核准使用的工具清單與帳號類型（優先使用企業版）。</li>
  <li><b>禁止輸入</b>的資料類型：機密、個資、未公開財務資訊、客戶資料。</li>
  <li>輸出必須經人工確認的情境，以及是否需<b>揭露</b>使用 AI。</li>
  <li>著作權與引用規範。</li>
  <li>事件通報與違規處理。</li>
</ul>
<p>公部門可參考行政院《使用生成式 AI 參考指引》：<strong>機密文件不得使用、不得輸入應保密資訊與個資、最終由人判斷、適當揭露</strong>。金融業可參考金管會 AI 指引。歐盟 AI 法要求 AI 生成的深偽內容需標示。</p>` }
  ],
  keypoints: [
    '幻覺：用 RAG、附引用、人工查證、降低溫度因應',
    '機密外洩：用企業版、關閉訓練、DLP 與使用政策',
    '提示注入：區隔系統指令與外部內容、限制權限',
    '深偽詐騙：以回撥確認、多重驗證等流程防範',
    '風險策略：降低、避免、轉移、接受',
    'Human-in-the-loop：風險越高，人工介入越多'
  ]
}
);
