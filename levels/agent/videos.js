/* AI 代理與 MCP 開發教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-29）
   中文頻道說明觀念，Anthropic 官方與英文頻道補充實作。部分影片使用舊版 SDK（例如 FastMCP），程式寫法以講義為準。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('_hG0pcBnPQw', 'Kelly Tsai', 'AI Agent 是什麼？LLM、Workflow、Agent 到底差在哪？'),
      V('ro30sPkX7w8', '上班了啊哈', '2 分鐘看懂 MCP'),
      EN('uhJJgc-0iTQ', 'Anthropic', 'Building more effective AI agents')
    ],
    chapters: {
      c01: [
        V('_hG0pcBnPQw', 'Kelly Tsai', 'AI Agent 是什麼？LLM、Workflow、Agent 到底差在哪？'),
        V('fwdzsY9KWKk', '李厂长来了', '15 分鐘學會 AI Agent')
      ],
      c02: [
        EN('LP5OCa20Zpg', 'Anthropic', 'Tips for building AI agents')
      ],
      c03: [
        EN('D7_ipDqhtwk', 'AI Engineer', 'How We Build Effective Agents: Barry Zhang, Anthropic')
      ],
      c04: [
        EN('uhJJgc-0iTQ', 'Anthropic', 'Building more effective AI agents'),
        EN('D7_ipDqhtwk', 'AI Engineer', 'How We Build Effective Agents')
      ],
      c05: [
        EN('LP5OCa20Zpg', 'Anthropic', 'Tips for building AI agents（context 管理）')
      ],
      c06: [
        V('ro30sPkX7w8', '上班了啊哈', '2 分鐘看懂 MCP'),
        V('NCtc5lIV7pM', '木子AI研究所', 'MCP 是什麼？怎麼用？概念與實戰'),
        V('ssc0Co3S6go', '數位時代 Official', 'MCP 當你的「AI 翻譯」，5 分鐘快速看懂')
      ],
      c07: [
        V('cG5-npAPTXQ', 'P & H', '10 分鐘打造 MCP Server（Python）'),
        V('EPXcIFFSv8k', '彭彭的課程', 'MCP 伺服器開發與部署入門'),
        EN('DosHnyq78xY', 'freeCodeCamp.org', 'Intro to MCP Servers with Python')
      ],
      c08: [
        EN('-8k9lGpGQ6g', 'Tech With Tim', 'Build Anything With a Custom MCP Server')
      ],
      c09: [
        EN('kkBFmwkDzdo', 'Claude', 'MCP in Claude Code')
      ],
      c10: [
        EN('SM-Fy8e3nFk', 'ExamPro', 'Claude Agent SDK Tutorial'),
        EN('TqC1qOfiVcQ', 'AI Engineer', 'Claude Agent SDK Full Workshop — Anthropic')
      ],
      c11: [
        V('hLeFM-CD6bw', 'RuleArena 攻防實驗室', 'AI Agent 也會被社交工程？Prompt Injection 與工具權限'),
        EN('9Ek2cvIHq1c', 'Applied with AI', 'AI Agent Guardrails Simplified')
      ]
    }
  };
})();
