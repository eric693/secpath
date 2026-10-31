/* 專案管理教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-31）
   以繁體中文頻道為主，英文影片補充要徑法與實獲值的計算。PMP 考試資訊以 PMI 官網最新公告為準。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('1qjETtk9bKA', 'TEDx Talks', '專案管理是你最好的人生指南｜張國洋'),
      V('yeXSeZfqigE', '窩課360', '到底什麼是專案管理？'),
      V('dzu9yYgmO6s', '閱部客', '10 分鐘輕鬆搞懂 Scrum')
    ],
    chapters: {
      c01: [
        V('yeXSeZfqigE', '窩課360', '專案本質：到底什麼是專案管理？'),
        V('1qjETtk9bKA', 'TEDx Talks', '專案管理是你最好的人生指南｜張國洋'),
        V('1Cr7Zmvizos', '澳門IT項目經理Judi', 'PMP 專案管理師是在學什麼？')
      ],
      c02: [
        V('d5qQX5ot9UU', '尼享筆記', '專案成功的隱藏關鍵：什麼是利害關係人管理？'),
        V('10hdTULLxwk', '史荳芮', '一分鐘學專案管理：利害關係人到底有誰')
      ],
      c03: [
        V('c-9fP68iwuQ', '芽芽 生活體驗家', 'WBS 完全解析'),
        V('LvBO4mFWM30', 'myMKC.com 管理知識中心', '一窺專案全貌的重要工具：WBS 工作分解結構'),
        V('t73Tk4Tvaco', 'Kris專案管理學院', '很多人做的工作分解架構圖都是錯的')
      ],
      c04: [
        V('AoZBSbwj0i4', 'Chih-hua Hsu', '要徑法'),
        EN('-TDh-5n90vk', 'Joshua Emmanuel', 'Project Scheduling - PERT/CPM | Finding Critical Path')
      ],
      c05: [
        V('LvBO4mFWM30', 'myMKC.com 管理知識中心', 'WBS 與成本估算的基礎')
      ],
      c06: [
        V('u_KKNIbq-SA', 'PMP教練堂', '5 分鐘白話講解什麼是實獲值'),
        V('KW1Zv4z8N2I', '窩課360', '認識實獲值：動態績效管理'),
        EN('sAZZ5av9kk0', 'Mike Clayton', 'What is Earned Value Management - EVM?')
      ],
      c07: [
        V('lM36lX4sraY', '尼享筆記', '搞懂專案風險管理的核心流程'),
        V('5xCmcdUmPok', '史荳芮', '風險管理是什麼？什麼是正向風險？')
      ],
      c08: [
        V('d5qQX5ot9UU', '尼享筆記', '利害關係人與溝通管理')
      ],
      c09: [
        V('dzu9yYgmO6s', '閱部客', '10 分鐘輕鬆搞懂 Scrum'),
        V('8Y89KaUhyw8', '西岸加加 West Coast Plus Plus', '矽谷產品經理教妳 Scrum 管理術'),
        V('DdCsJl66MV0', '史荳芮', '一分鐘介紹 Scrum 團隊')
      ],
      c10: [
        V('KKjh6pB-ml0', '尼享筆記', '看板方法 Kanban 入門'),
        V('-vXJi72USAk', '創客聯盟 Maker Union', '看板方法 Kanban Method｜張合中老師'),
        V('qpDP6EaIFyI', '長宏專案', '快速了解 2026 年 7 月 PMP 考試改版')
      ]
    }
  };
})();
