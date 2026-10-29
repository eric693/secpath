/* Claude 實戰教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-29）
   以中文教學頻道為主，Claude Code 功能搭配 Anthropic 官方的短片。Claude 更新很快，影片介面可能與目前版本不同。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('luRFvHW0SF8', '三師爸 Sense Bar', '一次搞懂 Claude 全生態：從聊天到全自動化寫程式'),
      V('29F96QJEf6o', 'Gary Chen', '關於 Claude Code 你需要知道的所有觀念'),
      V('PmlEWW8WMf0', 'Code Me Maybe 碼上學', '深入淺出 Claude Code：MCP、Skills、Hooks、Subagents、Plugins')
    ],
    chapters: {
      c01: [
        V('luRFvHW0SF8', '三師爸 Sense Bar', '一次搞懂 Claude 全生態'),
        V('zm3K831v470', '孔老師AI研習社', 'Claude AI 全生態初學者完整教程')
      ],
      c02: [
        V('a2HV7g83jsM', '腦哥 Chill塊鏈', 'Claude AI 新手完全攻略'),
        V('vDQiM0ml4c4', '問問諾特斯', '先學會控制 AI 工作節奏和上下文')
      ],
      c03: [
        V('Kik3HZFoYPI', '竣宇獸 tsunumon', '整理你的工作和知識：Projects、Artifacts、Skills'),
        EN('w7_yWjYyxjE', 'Kevin Stratvert', 'How to Use Claude Projects'),
        EN('1PRcdCu8n6M', 'Kevin Stratvert', 'How to Use Claude Artifacts')
      ],
      c04: [
        V('2pM-7fBXc_M', 'PAPAYA 電腦教室', 'Claude Code 保姆級教學'),
        V('vGwAJURmZd0', 'AgentCrew Academy', '三分鐘完成 Claude Code 安裝（Windows）')
      ],
      c05: [
        V('f10jf_PQU2E', '傑少 JAY', 'Claude Code 完整教學：新手必學的 15 個核心觀念'),
        V('29F96QJEf6o', 'Gary Chen', '關於 Claude Code 你需要知道的所有觀念')
      ],
      c06: [
        V('wj7mHCviMvs', 'Gary Chen', '15 分鐘學完 CLAUDE.md'),
        EN('O0FGCxkHM-U', 'Claude', 'The CLAUDE.md file')
      ],
      c07: [
        V('29F96QJEf6o', 'Gary Chen', 'Claude Code 觀念總整理（權限與安全）')
      ],
      c08: [
        V('PmlEWW8WMf0', 'Code Me Maybe 碼上學', 'MCP、Agent Skills、Hooks、Subagents、Plugins 一次搞懂'),
        EN('kkBFmwkDzdo', 'Claude', 'MCP in Claude Code'),
        EN('IkaPHiMDazM', 'Claude', 'Hooks in Claude Code'),
        EN('DNGxMX7ym44', 'Developers Digest', 'Claude Code Sub Agents in 7 Minutes')
      ],
      c09: [
        V('f10jf_PQU2E', '傑少 JAY', 'Claude Code 完整教學（實戰流程）')
      ],
      c10: [
        EN('L_WFEgry87M', 'Anthropic', 'Claude Code + GitHub Actions'),
        EN('x0IQKEEOawQ', 'Software Engineer Meets AI', 'Claude Code + GitHub Actions - Full Workflow Breakdown')
      ],
      c11: [
        V('wD7TFHIvfWI', 'Jerry Chen', 'Claude API 實戰攻略 EP1：串出第一個 API 請求'),
        EN('oH00h-zpfTE', 'United Top Tech', 'How to Use Claude AI API with Python')
      ]
    }
  };
})();
