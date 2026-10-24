/* AI 投資助理實作教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-17）
   影片內容觀點屬原作者，僅供學習參考，不構成投資建議。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
window.VIDEOS = {
  review: [
    { title: '「超詳細教學」n8n AI 實作 0 基礎入門到進階：AI Agent、LLM、RAG、Webhook', yt: 'vvqhzbp4J5A', by: 'HC AI說人話' },
    { title: '最強開源 AI 工作流 n8n，上千插件與模板', yt: 'cVPD2AFlLIs', by: '技术爬爬虾 TechShrimp' }
  ],
  chapters: {
    c01: [
      { title: '反詐騙宣導：假投資詐騙（完整版）', yt: '7UZzzdl9K60', by: 'CIB 刑事警察局' },
      { title: '假冒名人分享投資心得　詐術手法大公開', yt: 'Qtq8y0qahTY', by: '鏡新聞' },
      { title: 'AI 選股真的準嗎？實測 Gemini 慘遭打臉，投資人千萬別盲從', yt: '5IpiKw8p7zk', by: '現金流夢想天地' }
    ],
    c02: [
      { title: '【投資新手】6 分鐘輕鬆了解基本面、技術面、籌碼面', yt: 'Dyuc0J_cDMA', by: '投資好朋友 BOS價值投資' },
      { title: '股市三大分析，一次搞懂：基本面、技術面、籌碼面是什麼？', yt: 'Lzw3pNF8CMA', by: '學吧（LearningPa）' },
      { title: '學會三大財報，新手也能挑對股票', yt: '-iVF5qUyCSI', by: '學吧（LearningPa）' },
      { title: '買股票前先看懂！基本面、技術面、籌碼面與 KD', yt: 'XmF2IThDRCo', by: 'Enyu308' }
    ],
    c03: [
      { title: '高手不會只問一個 AI！教授揭「交叉比對」關鍵', yt: 'q0p48QrUf7Y', by: 'MVP財經生活頻道' },
      { title: '2026 股票分析提示詞合集：10 個 AI 股票分析 Prompt', yt: 'qF3GS7XnomI', by: 'Jelena 耶萊娜 AIGC' },
      { title: 'AI 教你找成長股？用 ChatGPT 實測', yt: '0pDqugkF9DI', by: 'Mr Expensive 贵先生' },
      { title: '實測 ChatGPT 選股能力，短線盲買可以賺多少錢？', yt: 'R2sapbC1rcU', by: 'Crypto Terry' }
    ],
    c04: [
      { title: '不用寫程式就能打造專屬 AI 助理？GPTs 和 Gems 是什麼', yt: 'iQBzvqQMd80', by: '小高白話科技' },
      { title: 'GPT 的「定時任務」功能：每天自動推送新聞、跟進投資', yt: 'vB2_chyhRVg', by: '灵姐说AI' }
    ],
    c05: [
      { title: '證交所 OpenAPI 教學：用 Google 試算表自動追蹤台股重大訊息', yt: 'zYTF_XXgnAs', by: '贊贊小屋' },
      { title: 'GOOGLEFINANCE 抓不到殖利率，改抓官方的表，結果又踩到一個洞', yt: '2TThFlMaBHk', by: '懶人智造' },
      { title: '試算表抓不到上櫃股價？GOOGLEFINANCE 上櫃 #N/A 實測', yt: '35T_Kt8leMI', by: '懶人智造' }
    ],
    c06: [
      { title: '使用 Google 試算表打造自動化股票儀表板', yt: 'nFIx64A9WO8', by: '蔡明和（彰化一整天）' },
      { title: 'Google 試算表【股市】自動每日股市數據：GOOGLEFINANCE 函數', yt: 'aKgbNqDNGMA', by: 'Bonny邦妮EXCEL客製規劃' },
      { title: '如何利用 Google 試算表抓到上櫃、興櫃股價與世界各地的股價資料', yt: 'l5ldJlFGoVM', by: '股魚-不看盤投資' },
      { title: '用 Google 試算表取得網頁數據，定時自動更新', yt: 'qb5FhrCZqUY', by: '彼德 · 生活工程師' },
      { title: '用 Google 試算表繪製股票圖表', yt: 'xMVwrI2Y2zs', by: '彼德 · 生活工程師' }
    ],
    c07: [
      { title: '【n8n 超入門教學】n8n × AI Agent × LINE Messaging 打造個人行動助理（1）前言', yt: 'iYGuzyoiujY', by: 'DongStudio' },
      { title: '別再只會跟 AI 聊天！0 程式碼打造 AI 自動化工作流（n8n × Agent → LINE）', yt: 'K9Q4aS1wPXk', by: 'P & H' },
      { title: '用 n8n 打造股票自動更新系統', yt: 'Y7_hFgG2ZM4', by: '呀沙係' },
      { title: 'n8n 上雲端只能付費？打造免費雲端主機指南', yt: 'dAC6kpVvryQ', by: 'P & H' },
      { title: '詳細介紹 Make.com 工作流平台', yt: '0n6_4G68EKo', by: '噪噪溫斯頓 Noise Winston' }
    ],
    c08: [
      { title: '如何建立 Telegram 機器人：取得 Bot Token 與使用者 ID', yt: '7S5IfIhFP4Y', by: '甬哥侃侃侃ygkkk' },
      { title: '利用 Google Apps Script 和 LINE Bot 製作定時提醒功能（1）功能說明', yt: 'L3jcNJRhKP8', by: 'Boris的分享小站' },
      { title: '利用 Google Apps Script 和 LINE Bot 製作定時提醒功能（2）設定 LINE Messaging API', yt: '3xgM0a54Vao', by: 'Boris的分享小站' },
      { title: '【n8n 超入門教學】n8n × AI Agent × LINE Messaging（2）行動助理 DEMO', yt: 'FwBhLGxJFUk', by: 'DongStudio' }
    ],
    c09: [
      { title: '深入淺出講解最大回撤 Maximum Drawdown（MDD）', yt: 'Y1Z-BYbzX0E', by: '香港程式交易研究中心' },
      { title: '2 個原因令回測完全不準，高回報策略隨時成爆倉陷阱', yt: 'oyMuRtRBcOg', by: '我要做富翁' }
    ],
    c10: [
      { title: '再平衡完整指南：你的股債比正在悄悄變偏激？', yt: 'XhSUWN-t8I8', by: 'Lin老師哩來' },
      { title: '資產配置 Part IV：再平衡與兩種執行方式', yt: 'miyDPgMVNHI', by: 'Zavy散戶慢富之路' },
      { title: '投資別忘了再平衡！', yt: 'vjxZ_jLPVNc', by: '小畢投資筆記' }
    ]
  }
};
