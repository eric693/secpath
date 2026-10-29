/* AI 代理與 MCP 開發課程設定（原創教學課程，內容依 2026 年 10 月的 Claude API、MCP 2026-07-28 規格與 Claude Agent SDK 官方文件整理） */
window.LEVEL = {
  id: 'agent',
  name: 'AI 代理與 MCP',
  title: 'AI 代理與 MCP 開發：工具使用、設計模式與 MCP 伺服器',
  overline: 'AI 應用開發進階・Agent × Tool Use × MCP',
  site: ['Model Context Protocol 官方文件', 'https://modelcontextprotocol.io/docs'],
  headline: 'AI 代理與 MCP 開發<br>工具使用、設計模式與 MCP 伺服器',
  lead: '企業正在把 AI 從聊天視窗接進真實系統。11 章講義從代理的定義與適用時機、工具使用與代理迴圈、五種代理設計模式、context 與記憶管理，到 Model Context Protocol（MCP）的架構與訊息、用 Python 與 TypeScript 寫 MCP 伺服器、連接到 Claude Code 與 Claude API、Claude Agent SDK 與多代理，最後談評估、安全與上線。代理迴圈、設計模式與 MCP 訊息都有可在網頁上執行的模擬範例，實際呼叫 API 與架設伺服器的程式碼皆依官方最新寫法。',
  subjects: {
    1: { name: '代理篇', title: '工具使用、代理迴圈、設計模式與記憶' },
    2: { name: 'MCP 與上線篇', title: 'MCP 協定、伺服器開發、Agent SDK 與上線' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '學習完成清單', terms: '代理與 MCP 名詞', mnemonics: '重點口訣', numbers: '協定與 API 速查',
    sprintLead: '開發代理與 MCP 伺服器時隨時查閱：重點口訣、常用協定方法與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以代理設計觀念、工具使用、MCP 協定與安全為主；程式輸出題以 Python 實際執行驗證。內容依 2026 年 10 月官方文件整理，規格更新時以官方文件為準。',
    videoNote: 'MCP 規格與 SDK 更新快，影片中的寫法可能與目前版本不同，以講義與官方文件為準'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並能獨立完成：寫一個有 2～3 個工具的 MCP 伺服器、連接到 Claude Code 實際使用，以及用 Claude API 寫出有錯誤處理與回合上限的代理迴圈。',
  examInfo: [
    ['課程定位', '要把 AI 接進企業系統、打造代理或 MCP 伺服器的工程師'],
    ['使用技術', 'Claude API（工具使用）、MCP 2026-07-28 規格、Python 與 TypeScript MCP SDK、Claude Agent SDK'],
    ['先備知識', '建議先完成「Claude 實戰」與「AI 應用實作」，並熟悉 Python 或 TypeScript'],
    ['學習時間', '講義約 10 小時，另加實作練習'],
    ['完成能力', '能判斷何時需要代理、設計工具與代理流程、開發並部署 MCP 伺服器，並兼顧安全與成本'],
    ['銜接課程', 'Python 程式實務、TypeScript、DevOps 入門']
  ],
  examNote: '講義中可在網頁上執行的範例使用「模擬模型」，不需要 API 金鑰，用來理解代理迴圈與協定訊息。呼叫真正的 Claude API、架設 MCP 伺服器的程式碼請在自己的電腦上執行，API 金鑰放在環境變數中，不要寫進程式碼。MCP 規格版本為 2026-07-28。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：什麼是代理、工具使用、代理迴圈，用 Claude API 寫出第一個代理'],
    ['第 2 週', '第 4～5 章：代理設計模式、context 與記憶管理，完成代理篇測驗'],
    ['第 3 週', '第 6～8 章：MCP 架構與訊息，用 Python 或 TypeScript 寫出自己的 MCP 伺服器'],
    ['第 4 週', '第 9～11 章：連接與部署 MCP、Claude Agent SDK 與多代理、評估與安全，完成 MCP 與上線篇測驗'],
    ['之後', '為公司內部系統（資料庫、工單、文件）做一個 MCP 伺服器，並建立評估資料集持續改進']
  ],
  mnemonics: [
    ['能不用代理就不用', '先試單次呼叫或固定流程，任務真的開放、步驟無法預先寫死才用代理'],
    ['工具說明是提示詞', '名稱清楚、說明寫何時使用、參數有描述與範例'],
    ['代理迴圈', '呼叫模型 → 有 tool_use 就執行並回傳 tool_result → 直到 end_turn'],
    ['一次回傳全部結果', '多個 tool_use 的結果放在同一則 user 訊息中'],
    ['錯誤也要回傳', '工具失敗時回傳 is_error 的 tool_result，讓模型自己調整'],
    ['五種模式', '串連、路由、平行、協調者與工作者、評估與改進'],
    ['context 是稀缺資源', '只放需要的內容；長任務用壓縮、記憶檔與子代理'],
    ['MCP 三角色', 'Host（應用程式）、Client（每個連線一個）、Server（提供能力）'],
    ['MCP 三原語', 'Tools 讓模型執行動作、Resources 提供資料、Prompts 提供範本'],
    ['stdio 不能印 stdout', '本機 MCP 伺服器的紀錄寫到 stderr，否則會破壞 JSON-RPC 訊息'],
    ['最小權限', '代理只拿到完成任務需要的工具與權限，危險動作要人確認'],
    ['沒有評估就沒有改進', '建立測試案例，每次修改提示詞或工具都重新評分']
  ],
  numbers: [
    ['stop_reason: tool_use', '模型要求呼叫工具，執行後回傳 tool_result'],
    ['stop_reason: end_turn', '模型完成回答，結束迴圈'],
    ['tool_result + is_error', '回報工具執行失敗，讓模型調整做法'],
    ['client.beta.messages.tool_runner', 'Python SDK 自動處理代理迴圈（beta）'],
    ['server/discover', 'MCP：查詢伺服器支援的版本與能力（2026-07-28）'],
    ['tools/list、tools/call', 'MCP：列出工具、呼叫工具'],
    ['resources/list、resources/read', 'MCP：列出與讀取資源'],
    ['prompts/list、prompts/get', 'MCP：列出與取得提示範本'],
    ['notifications/tools/list_changed', 'MCP：通知工具清單已改變'],
    ['@mcp.tool()', 'Python SDK：把函式註冊成 MCP 工具'],
    ['server.registerTool()', 'TypeScript SDK：註冊 MCP 工具'],
    ['query(prompt, options)', 'Claude Agent SDK：執行代理並串流訊息']
  ],
  checklist: [
    '能說明工作流程與代理的差別，判斷任務是否適合用代理',
    '能設計清楚的工具名稱、說明與參數格式',
    '能用 Claude API 寫出包含工具執行、錯誤回報與回合上限的代理迴圈',
    '能正確處理多個平行的工具呼叫',
    '能依需求選擇串連、路由、平行、協調者與工作者、評估與改進模式',
    '能管理代理的 context：精簡工具結果、壓縮與記憶檔',
    '能說明 MCP 的 Host、Client、Server 與 Tools、Resources、Prompts',
    '能看懂 MCP 的 JSON-RPC 訊息與 server/discover、tools/call',
    '能用 Python 或 TypeScript SDK 寫出 MCP 伺服器並用 Inspector 測試',
    '能把 MCP 伺服器連接到 Claude Code、Claude Desktop 與 Claude API',
    '能用 Claude Agent SDK 建立代理並設定工具與權限',
    '能為代理建立評估、處理提示注入並實施最小權限'
  ],
  tools: [['toolschema', 'c02'], ['agentloop', 'c03'], ['patternpick', 'c04'], ['mcpflow', 'c06']]
};
