/* AI 應用實作課程設定（原創教學課程，非證照課程） */
window.LEVEL = {
  id: 'ai-apps',
  name: 'AI 應用實作',
  title: 'AI 應用實作：提示工程、RAG 與代理流程',
  overline: 'AI 應用實作・提示工程 × RAG × AI 代理',
  site: ['Claude API 官方文件', 'https://platform.claude.com/docs'],
  headline: 'AI 應用實作<br>提示工程、RAG 與代理流程',
  lead: '從會用 ChatGPT、Claude 進階到能打造 AI 應用：寫出穩定可靠的提示詞、用 API 串接模型、讓 AI 回傳結構化資料、以 RAG 回答公司內部文件、讓 AI 呼叫工具並組成自動化代理流程，最後學會評估、成本控管與資安治理。可銜接 iPAS AI 應用規劃師與 Python 實戰課程。',
  subjects: {
    1: { name: '基礎篇', title: '提示工程與 API 應用' },
    2: { name: '進階篇', title: 'RAG、工具呼叫與代理流程' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '實作完成清單', terms: 'AI 應用常用名詞', mnemonics: '重點口訣', numbers: '常用寫法速查',
    sprintLead: '設計 AI 應用時隨時查閱：重點口訣、常用寫法與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以情境題為主，檢查你能不能為不同需求選對做法。建議完成每章的實作後再挑戰。',
    videoNote: 'API 用法以各家官方文件為準'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並完成至少一個 RAG 或代理流程作品。',
  examInfo: [
    ['課程定位', '實作課程，前半不需寫程式，後半建議具備 Python 基礎'],
    ['使用工具', 'Claude 等生成式 AI、Anthropic Python SDK、n8n 等無程式碼平台'],
    ['練習環境', '講義內建 Python 執行器可練習檢索與資料處理；呼叫 API 需在自己的電腦執行'],
    ['學習時間', '講義約 9 小時，另加實作時間'],
    ['完成成果', '提示詞範本庫、文件問答 RAG、會呼叫工具的 AI 代理'],
    ['銜接課程', 'iPAS AI 應用規劃師初級／中級、Python 實戰第 10 章']
  ],
  examNote: '生成式 AI 的模型、價格與 API 功能更新很快，課程以概念與設計原則為主；程式碼範例的模型名稱與參數請以官方文件最新版本為準。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：生成式 AI 應用全貌、提示工程基礎與進階，建立自己的提示詞範本庫'],
    ['第 2 週', '第 4～5 章：用 API 打造應用、結構化輸出與資料擷取，完成基礎篇測驗'],
    ['第 3 週', '第 6～7 章：RAG 原理與實作，做出公司規章問答機器人'],
    ['第 4 週', '第 8～10 章：工具呼叫、AI 代理流程、上線與治理，完成進階篇測驗'],
    ['之後', '挑一個工作上的流程，用本課程的模式設計並評估一個 AI 應用']
  ],
  mnemonics: [
    ['好提示詞五要素', '角色、任務、背景資料、輸出格式、限制條件'],
    ['給範例', '說不清楚的格式與語氣，直接給 2～3 個範例（Few-shot）'],
    ['用標籤分隔', '把文件、問題、範例放進 <document>、<question> 等標籤，避免混淆'],
    ['允許說不知道', '明確告訴 AI：資料中沒有答案就回答不知道，減少幻覺'],
    ['RAG 四步驟', '切塊 → 向量化 → 檢索 → 帶著資料生成並附來源'],
    ['工具呼叫迴圈', '模型提出 tool_use → 程式執行工具 → 回傳 tool_result → 模型繼續'],
    ['先流程後代理', '步驟固定用工作流程（Workflow）；需要自己決定步驟才用代理（Agent）'],
    ['代理三道防線', '最小權限、重要動作需人工核准、設定步數與費用上限'],
    ['省錢四招', '選對模型、提示快取、批次處理、限制輸出長度'],
    ['上線前要評估', '準備測試集，用數字比較每次修改是變好還是變壞']
  ],
  numbers: [
    ['client.messages.create(...)', '呼叫 Claude Messages API'],
    ['system="..."', '系統提示詞：角色與規則'],
    ['messages=[{"role": "user", ...}]', '對話內容，user 與 assistant 交替'],
    ['response.stop_reason', 'end_turn 完成、max_tokens 被截斷、tool_use 要呼叫工具、refusal 拒絕'],
    ['output_config={"format": {...}}', '要求回傳符合 JSON Schema 的結構化輸出'],
    ['client.messages.parse(output_format=Model)', '搭配 Pydantic 模型直接取得驗證後的物件'],
    ['tools=[{"name", "description", "input_schema"}]', '定義工具'],
    ['{"type": "tool_result", "tool_use_id": ...}', '把工具結果回傳給模型'],
    ['cache_control={"type": "ephemeral"}', '提示快取，重複的長內容大幅降價'],
    ['Batch API', '非同步大量處理，費用約一半'],
    ['chunk_size／overlap', 'RAG 切塊大小與重疊字數'],
    ['top_k', 'RAG 每次取回的段落數'],
    ['cosine similarity', '向量相似度，越接近 1 越相似'],
    ['temperature', '隨機程度；需要穩定結果時保持低值']
  ],
  checklist: [
    '整理 5 個以上工作常用的提示詞範本，包含角色、格式與限制',
    '能用 Python 呼叫 Claude API，並從環境變數讀取金鑰',
    '能讓 AI 回傳固定格式的 JSON，並在程式中驗證與統計',
    '完成一個公司規章或 FAQ 的 RAG 問答，回答會附上出處',
    'RAG 遇到資料中沒有的問題時，會回答不知道而不是編造',
    '定義至少兩個工具，完成會自己決定呼叫順序的 AI 代理',
    '代理執行寄信、刪除等重要動作前會要求人工確認',
    '準備 20 題以上的測試集，用來比較提示詞修改前後的表現',
    '估算過應用的每月 API 費用，並套用至少一種省錢做法',
    '檢查過提示注入與個資外洩風險，並寫下對應的防護措施'
  ],
  tools: [['softmax', 'c01'], ['llmcost', 'c04'], ['chunk', 'c06'], ['retrieve', 'c07'], ['pyrun', 'c07']]
};
