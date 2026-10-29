/* Claude 實戰課程設定（原創教學課程，內容依 2026 年 10 月的 Claude、Claude Code 官方文件整理） */
window.LEVEL = {
  id: 'claude',
  name: 'Claude 實戰',
  title: 'Claude 實戰：提示詞、Claude Code 與 API 開發',
  overline: 'AI 工作流程實戰・Claude × Claude Code × API',
  site: ['Claude Code 官方文件', 'https://code.claude.com/docs'],
  headline: 'Claude 實戰<br>提示詞、Claude Code 與 API 開發',
  lead: '從每天都用得到的提示詞技巧與 claude.ai 功能開始，進入工程師最常用的 Claude Code：安裝與登入、斜線指令與快捷鍵、權限模式、CLAUDE.md 專案記憶、Skills、Subagents、Hooks 與 MCP 擴充，再學會在終端機與 GitHub 上自動化，最後用 Python 與 TypeScript SDK 呼叫 Claude API。11 章講義搭配指令速查、提示詞產生器、CLAUDE.md 與權限設定產生器、API 費用試算等互動練習。',
  subjects: {
    1: { name: '使用篇', title: '提示詞、claude.ai 與 Claude Code 指令' },
    2: { name: '進階篇', title: '專案記憶、擴充、自動化與 API 開發' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '學習完成清單', terms: 'Claude 名詞', mnemonics: '重點口訣', numbers: '指令速查',
    sprintLead: '使用 Claude 時隨時查閱：重點口訣、常用指令與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以提示詞觀念、Claude Code 指令與設定、安全性與 API 用法為主。指令與參數依 2026 年 10 月官方文件整理，產品更新很快，實際以官方文件為準。',
    videoNote: 'Claude 產品更新快，影片介面可能與目前版本略有不同'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並能在自己的專案中用 Claude Code 完成一次「計畫 → 實作 → 測試 → 提交」，且寫好專案的 CLAUDE.md 與權限設定。',
  examInfo: [
    ['課程定位', '想把 Claude 用在日常工作、程式開發與自動化的上班族、工程師與學生'],
    ['使用產品', 'claude.ai（網頁、桌面、手機）、Claude Code（終端機、IDE、桌面）、Claude API'],
    ['先備知識', '使用篇不需程式背景；Claude Code 與 API 章節建議會基本的終端機操作與 Git'],
    ['學習時間', '講義約 9 小時，另加實際操作練習'],
    ['完成能力', '寫出有效的提示詞，熟練 Claude Code 指令與設定，能安全地自動化工作並呼叫 API'],
    ['銜接課程', 'Git 版本控制、AI 應用實作（RAG 與 AI 代理）、DevOps 入門']
  ],
  examNote: '本課程內容依 2026 年 10 月的官方文件整理。Claude 的模型、方案、價格與 Claude Code 指令更新頻繁，使用前請以 code.claude.com/docs 與 platform.claude.com/docs 的最新說明為準。課程中的 API 範例需要你自己的 API 金鑰，請在自己的電腦上執行，不要把金鑰貼到網頁或程式碼中。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：認識 Claude、提示詞技巧、claude.ai 的專案與 Artifacts，把它用在每天的工作中'],
    ['第 2 週', '第 4～5 章：安裝 Claude Code，熟悉斜線指令、快捷鍵與權限模式，完成使用篇測驗'],
    ['第 3 週', '第 6～8 章：寫 CLAUDE.md、設定權限、建立自己的 Skill、Subagent、Hook 與 MCP'],
    ['第 4 週', '第 9～11 章：實戰工作流程、終端機與 GitHub 自動化、Claude API，完成進階篇測驗'],
    ['之後', '把 Claude Code 用在真實專案，整理團隊共用的 CLAUDE.md、Skills 與權限設定']
  ],
  mnemonics: [
    ['提示詞四要素', '背景 + 任務 + 限制 + 輸出格式，寫得像交代給新同事'],
    ['範例勝過形容', '給 1～3 個輸入輸出範例，比寫一堆形容詞有效'],
    ['用 XML 分段', '<資料>、<要求>、<範例> 標籤把不同內容分開'],
    ['四個前綴', '/ 指令、! 終端機、@ 引用檔案、? 快捷鍵說明'],
    ['Shift+Tab', '切換權限模式：預設 → 自動接受編輯 → 計畫模式 → 自動模式'],
    ['Esc 兩下', '輸入框空白時按兩下 Esc 回到先前的對話與程式碼狀態（/rewind）'],
    ['先計畫再動手', '大改動先用計畫模式（/plan）讓 Claude 讀程式並提出計畫'],
    ['context 要管理', '換主題用 /clear，對話太長用 /compact，用 /context 看用量'],
    ['CLAUDE.md', '/init 產生，寫指令、慣例與注意事項，越具體越簡潔越好'],
    ['擋得住才算數', 'CLAUDE.md 是建議；一定要擋的動作用權限 deny 規則或 PreToolUse hook'],
    ['擴充四件套', 'Skill 教做法、Subagent 分工、Hook 自動執行、MCP 接外部工具'],
    ['金鑰不進前端', 'API 金鑰放環境變數或後端，絕不寫進程式碼或前端']
  ],
  numbers: [
    ['claude', '在目前資料夾啟動互動模式'],
    ['claude -p "…"', '非互動模式：回答後直接結束，適合腳本'],
    ['claude -c／-r', '繼續最近的對話／選擇或指定要恢復的對話'],
    ['/init', '產生專案的 CLAUDE.md'],
    ['/clear、/compact', '清空對話／摘要壓縮對話以釋放 context'],
    ['/model、/effort', '切換模型／調整思考的努力程度'],
    ['/permissions', '管理允許、詢問、拒絕的工具權限規則'],
    ['/mcp、/hooks、/skills', '管理 MCP 伺服器、檢視 hooks、列出 skills'],
    ['/rewind', '把對話與程式碼回溯到先前的檢查點'],
    ['/code-review', '審查目前的變更，找出 bug 與可改進處'],
    ['/usage', '查看用量與花費（/cost 為別名）'],
    ['claude mcp add', '新增 MCP 伺服器（--transport http、--scope project）']
  ],
  checklist: [
    '能說出 Claude 各模型家族與 claude.ai、Claude Code、API 三種使用方式的差別',
    '能寫出包含背景、任務、限制與格式的提示詞，並用範例與 XML 標籤提升品質',
    '能使用 claude.ai 的專案、Artifacts 與檔案分析完成實際工作',
    '能安裝並登入 Claude Code，用 @、!、Esc、/clear、/compact 管理對話',
    '能說明各權限模式，並用 Shift+Tab 與 /plan 切換',
    '能用 /init 產生並修改專案的 CLAUDE.md',
    '能在 settings.json 設定 allow、ask、deny 權限規則',
    '能寫一個帶參數的 Skill，並建立一個 Subagent',
    '能設定一個 PreToolUse 或 PostToolUse hook',
    '能用 claude mcp add 新增 MCP 伺服器並在 /mcp 查看狀態',
    '能用 claude -p 在腳本或 CI 中自動化工作',
    '能用 Python 或 TypeScript SDK 呼叫 Claude API，並估算費用'
  ],
  tools: [['promptlab', 'c02'], ['ccref', 'c05'], ['ccsetup', 'c07'], ['apicost', 'c11']]
};
