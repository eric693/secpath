/* AI 應用實作教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-24）
   中文影片優先，部分主題搭配 Anthropic 官方與常見教學頻道的英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('_hG0pcBnPQw', 'Kelly Tsai', 'AI Agent 是什麼？LLM、Workflow、Agent 到底差在哪'),
      V('TiQOnrbVje0', 'Gary Chen', '提示詞工程新手教學：Anthropic 六大架構與五個實戰技巧'),
      EN('ysPbXH0LpIE', 'Anthropic', 'Prompting 101 | Code w/ Claude')
    ],
    chapters: {
      c01: [
        V('la9nhavGG5M', '林粒粒呀', '什麼是大型語言模型（LLM）？'),
        V('gX3qhXRa2dE', 'Microsoft Reactor 中文', '生成式 AI 和 LLM 工作原理')
      ],
      c02: [
        V('d33gWFRZnas', 'PAPAYA 電腦教室', '為什麼別人家的 ChatGPT 這麼聰明？提示詞技巧'),
        V('TiQOnrbVje0', 'Gary Chen', '提示詞工程新手教學：Anthropic 六大架構與五個實戰技巧'),
        EN('2YCaBqP8muw', 'Anthropic', 'Effective prompting techniques (Deep Dive) | AI Fluency')
      ],
      c03: [
        EN('T9aRN5JkmL8', 'Anthropic', 'AI prompt engineering: A deep dive'),
        EN('jrHRe9lSqqA', 'IBM Technology', 'What Is a Prompt Injection Attack?')
      ],
      c04: [
        V('wD7TFHIvfWI', 'Jerry Chen', 'Claude API 實戰攻略 EP1：串出第一個 API 請求'),
        EN('H7LZb20-fUY', 'Net Ninja', 'Claude API Crash Course #1 - Introduction & Setup')
      ],
      c05: [
        EN('i-EZvYfWWUA', 'Code Yoga', 'Python AI Chatbot with Anthropic’s Claude API')
      ],
      c06: [
        V('4PdQ_7sCFYY', 'Chengsi Jin', '什麼是 RAG 檢索增強生成？'),
        V('WWdlme1EAGI', '馬克的技術工作坊', 'RAG 工作機制詳解：高品質知識庫背後的技術流程'),
        V('kGfDerZLROU', '白白說大模型', '20 分鐘速通 RAG 與向量資料庫核心概念')
      ],
      c07: [
        V('IL5nT9hYZbQ', 'Yulandy Chiu的AI觀測站', 'RAG 檢索怎麼選？一次看懂 Sparse、Dense、Hybrid'),
        V('WWdlme1EAGI', '馬克的技術工作坊', 'RAG 工作機制詳解')
      ],
      c08: [
        EN('h8gMhXYAv1k', 'IBM Technology', 'What is Tool Calling? Connecting LLMs to Your Data'),
        EN('kwvA2Cxntuw', 'Gary Explains', 'LLMs Can Use Tools - LLM Function Calling Explained')
      ],
      c09: [
        V('_hG0pcBnPQw', 'Kelly Tsai', 'AI Agent 是什麼？LLM、Workflow、Agent 到底差在哪'),
        V('c6w2ioosYKE', '10程式中', 'Model Context Protocol 簡單快速上手：搞懂熱門的 MCP'),
        V('r9mi3ZJIWbg', 'PAPAYA 電腦教室', '學會 n8n 為你省下 80% 時間（EP.1）'),
        EN('XSZP9GhhuAc', 'Anthropic', 'Prompting for Agents | Code w/ Claude')
      ],
      c10: [
        EN('trfUBIDeI1Y', 'IBM Technology', 'LLM as a Judge: Scaling AI Evaluation Strategies'),
        EN('K8LLVi5Xrh8', 'Evidently AI', 'Introduction to LLM evaluations in 10 key ideas')
      ]
    }
  };
})();
