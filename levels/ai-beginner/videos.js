/* AI 應用規劃師初級教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-15）
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const ST = (yt, title) => ({ title, yt, by: 'iPAS陪跑師 X Stan' });
  window.VIDEOS = {
    review: [
      { title: '不寫程式也能過！非本科上班族三個月考取 iPAS AI 雙證照備考攻略', yt: 'dPZaD_yd6Jg', by: 'iPAS自學路' },
      { title: '【iPAS AI 應用規劃師初級】科目 1 人工智慧基礎概論全解析', yt: 'kz3RsbEI2kU', by: '世代銘印 | Gen Imprint' },
      { title: '【iPAS AI 應用規劃師初級】更新補充特輯 L12201～L12301：生成式 AI 工具、RAG、AI 代理、經濟部指引', yt: 'yCZkJMxmK_k', by: '世代銘印 | Gen Imprint' },
      { title: '如何通過 iPAS AI 應用規劃師初級鑑定', yt: 'sBNi72oSPQI', by: '林大叔' },
      ST('nsxWpukwCKA', 'L11 鑑別式 vs 生成式 AI：全科易混題總決戰')
    ],
    chapters: {
      c01: [
        ST('Lo-Q_eMCXQY', 'L11101 AI 的定義與分類：分析、預測、生成怎麼分'),
        ST('1TMYVQHaFJI', 'AI 不只是聊天！五個常見應用領域一次看懂'),
        ST('rhistuu4WDc', '把 AI 當成 ChatGPT？這題很容易選錯'),
        { title: '1-1. AI 是什麼？｜你的第一堂 AI 課', yt: 'JKLdpfdhRnc', by: '數位發展部 - moda' },
        { title: '第 2 集：AI、機器學習、深度學習有什麼差別？', yt: '3beA0_GksYQ', by: '一分鐘學人工智慧 AI' }
      ],
      c02: [
        { title: '人工智慧基礎概論 L11102 AI 治理概念：歐盟人工智慧法案 AI Act', yt: 'R-T04amlkFo', by: 'AI.ESG.數位轉型顧問 沈重宗' },
        { title: '【2025.12.23 三讀通過】台灣《人工智慧基本法》：你需要知道的事', yt: 'FRLMvo6yrH4', by: '憶筆M.S.' },
        { title: '【iPAS AI 應用規劃師初級】AI 治理全解析｜AI 基本法 7 原則', yt: 'zDkX3b-cx3E', by: '世代銘印 | Gen Imprint' },
        { title: 'AI 應用規劃師（初級）：金融業運用人工智慧指引', yt: 'Zstw5ScX3hk', by: '憶筆M.S.' },
        { title: '【115 年最新版】公部門人工智慧應用參考手冊', yt: 'WAEXSGxILa0', by: '憶筆M.S.' },
        { title: '【iPAS AI 新考綱】人工智慧（AI）產品與系統評測參考指引', yt: '4B9o00QpHKA', by: '憶筆M.S.' },
        { title: '2-2. AI 產品與系統評測中心在做什麼？｜測 AI，好心安', yt: 'srR6yP6pP1w', by: '數位發展部 - moda' }
      ],
      c03: [
        ST('mfAZVhh5fsU', '三種資料型態怎麼分？結構化、半結構化、非結構化'),
        ST('x3pQb-_Nxv4', 'AI 資料從哪裡來？五種常見資料蒐集方法'),
        ST('EJpMxquHSDY', '預測性分析是什麼？用歷史資料預測未來趨勢'),
        { title: '大數據不是資料很多而已：5V 特性、Hadoop 與 Spark 架構整理', yt: '8QtX9u2H0MM', by: 'iPAS自學路' },
        { title: 'iPAS AI 應用規劃師｜特徵工程完整解析（標準化、One-hot、資料不平衡）', yt: 'k3nH5r_9g9M', by: 'AI 鍊金師' }
      ],
      c04: [
        ST('TMSkQsuWhaI', 'L11203 資料隱私與安全：個資、授權、去識別化怎麼考'),
        ST('QC0phqAeaJc', '資料有個資怎麼辦？目的限制、最小必要、去識別化一次看懂'),
        ST('-xG0RIgdgNE', '資料安全不是只有防外洩：機密性、完整性、可用性怎麼分'),
        ST('YDDkhH1GhsQ', '把資料丟進 AI 工具前，先檢查這四個風險')
      ],
      c05: [
        ST('iHzEcacFEcw', '監督式、非監督式、強化學習怎麼分？一分鐘搞懂'),
        ST('VPr44ToyT-A', 'L11302 常見機器學習模型：迴歸、SVM、決策樹怎麼選'),
        ST('wGqIdbtXqh8', 'L11 機器學習原理、訓練流程與常見模型：考前高頻考點一次整理'),
        { title: '台大資訊 人工智慧導論 FAI 2.2：Overfitting 為何會發生？', yt: 'pfqEtxAt7i8', by: '陳縕儂 Vivian NTU MiuLab' },
        { title: '【機器學習 2021】預測本頻道觀看人數（上）：機器學習基本概念簡介', yt: 'Ye018rCVvOo', by: 'Hung-yi Lee' }
      ],
      c06: [
        ST('GCEUg3DHrDk', '生成式 AI 常見模型：GAN、VAE、擴散模型一次看懂'),
        ST('8bt-xDZvVRs', '生成式 AI 怎麼支援鑑別式 AI？整合應用一次看懂'),
        { title: '【生成式 AI 導論 2024】第 1 講：生成式 AI 是什麼？', yt: 'JGtqpQXfJis', by: 'Hung-yi Lee' },
        { title: '【生成式 AI 時代下的機器學習（2025）】第一講：一堂課搞懂生成式人工智慧的技術突破與未來發展', yt: 'QLiKmca4kzI', by: 'Hung-yi Lee' }
      ],
      c07: [
        ST('b_wS4i-_tvs', 'L12101 No Code / Low Code 的基本概念：No Code 和 Low Code 差在哪'),
        ST('-44lK8FfZ78', 'L12102 No Code / Low Code 的優勢與限制：低門檻不等於零風險'),
        ST('RUiC-f4dDUI', 'AI 民主化是什麼？No Code / Low Code 如何降低 AI 門檻')
      ],
      c08: [
        ST('6i7GlJnXfCg', 'L12201 生成式 AI 應用領域與常見工具：生成式 AI 到底在生成什麼'),
        ST('3UpbASikXs8', 'L12201 生成式 AI 應用領域與常見工具：六大產業應用一次看懂'),
        ST('6Ahq_iBhEro', '生成式 AI 工具的趨勢：個人化、協作、安全與隱私')
      ],
      c09: [
        { title: '提示詞工程新手教學：Anthropic 六大架構 + 五個實戰技巧', yt: 'TiQOnrbVje0', by: 'Gary Chen' },
        ST('BibOlpi8h5o', 'L12202 如何善用生成式 AI 工具：圖像生成與引用怎麼注意'),
        { title: '【生成式 AI】07. 檢索增強生成（RAG）的原理及實作', yt: 'jF80Y8_BvEA', by: 'Iveai - I\'ve AI' },
        { title: 'AI Agent 是什麼？一口氣了解 AI 技術演進！LLM、Workflow、Agent 到底差在哪？', yt: '_hG0pcBnPQw', by: 'Kelly Tsai' },
        { title: '【生成式 AI 時代下的機器學習（2025）】第二講：一堂課搞懂 AI Agent 的原理', yt: 'M2Yg1kwPpts', by: 'Hung-yi Lee' }
      ],
      c10: [
        ST('jUI9bKXxIiY', 'L12301 生成式 AI 導入評估：需求、資源、試點怎麼看'),
        ST('0XJo_FXCZYA', '企業導入生成式 AI，第一步不是買工具，是找需求'),
        ST('g_FIP3Djup8', '生成式 AI 導入前，要先檢查哪些資源？'),
        ST('bSDUN9esR9o', '生成式 AI 導入，為什麼要先做試點？')
      ],
      c11: [
        ST('HNPgu7ScCHE', 'L12302 生成式 AI 導入規劃：從準備到 ROI 怎麼規劃'),
        ST('N_MMdzCVw2g', 'L12302 生成式 AI 導入規劃：專案落地後怎麼持續有效'),
        ST('GFiNNO6GKa0', '生成式 AI 導入，為什麼員工培訓和風險管理很重要？'),
        { title: '【iPAS AI 應用規劃師初級】生成式 AI 導入評估規劃與風險管理全攻略', yt: '8RUVYEHosUA', by: '世代銘印 | Gen Imprint' }
      ],
      c12: [
        ST('1hO4YUwWkmI', 'L12303 生成式 AI 風險管理：會用 AI 更要會控風險'),
        ST('nVMZff_06Qc', '生成式 AI 很好用，但風險要先看懂：四大風險主軸'),
        ST('wxY77eH4P1w', '生成式 AI 不只怕錯，還怕偏見與不合規'),
        ST('6JEGRCGfHuk', 'AI 風險怎麼管？先分級，再決定策略'),
        { title: '行政院通過生成式 AI 指引 機密與敏感文件禁用', yt: 'rM7NPifUO1s', by: '公視新聞網' },
        { title: '【數位關鍵字】生成式 AI 內容版權誰擁有？從授權到侵權的法律全解析', yt: 'bafow-e6P3I', by: '數位時代 Official' }
      ]
    }
  };
})();
