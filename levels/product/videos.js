/* 產品經理入門教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-31）
   中文影片說明產品經理的工作與觀念，英文影片補充 JTBD、RICE、留存分析與面試。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('ziR5EppUaAk', 'Dorothee', 'PM 要做什麼？產品經理？專案經理？'),
      V('RCKwicHSCIo', 'Unblock', '我能做產品管理嗎？資深產品經理和你聊聊產品'),
      V('E79whqrQ5OY', '賴春輯 Neo Sharing', 'MVP 最小可行性產品：如何用少數資源確認客戶需求')
    ],
    chapters: {
      c01: [
        V('ziR5EppUaAk', 'Dorothee', 'PM 要做什麼？產品經理？專案經理？'),
        V('RCKwicHSCIo', 'Unblock', '我能做產品管理嗎？'),
        V('IaL1Qr7gPJ4', 'Olivia Hsü', '從廣告行銷到 Adobe 當產品經理：PM 到底在做什麼？')
      ],
      c02: [
        V('-8EAlyRSU4Q', 'myMKC.com 管理知識中心', '如何進行使用者研究訪談？需要注意什麼？'),
        V('DyPUXZ0hbbo', '陳備份', '史丹佛大學公開課：如何進行用戶訪談')
      ],
      c03: [
        EN('RQjBawcU_qg', 'Jobs To Be Done', 'What is Jobs to be Done'),
        EN('IanZkc-i2J4', 'NNgroup', 'Jobs-to-Be-Done vs. Personas')
      ],
      c04: [
        V('0NvhvkNTTqk', '耀鈞x商業修煉筆記', 'KPI 是碼表，OKR 是指南針'),
        V('WjzWgJY3xWM', '下一本讀什麼?', 'KPI、OKR、OGSM 到底有什麼差別？')
      ],
      c05: [
        EN('pzyRafZJ-0M', 'ProductPlan', 'What is the RICE Scoring Model?'),
        EN('miI6KvwFHLI', 'airfocus', 'The RICE Scoring Framework - Overview, Example, and Explanation')
      ],
      c06: [
        V('0sVOcJaj_aY', 'Dorothee', 'PM 要怎麼寫 Spec？一份完整的 PRD 產品需求文件')
      ],
      c07: [
        V('E79whqrQ5OY', '賴春輯 Neo Sharing', 'MVP 最小可行性產品'),
        V('CqmyMTTFVX4', 'Peter', '從 Spotify 的最小可行性產品，搞懂 MVP')
      ],
      c08: [
        V('IaL1Qr7gPJ4', 'Olivia Hsü', 'PM 到底在做什麼？和團隊的合作')
      ],
      c09: [
        EN('mb2_kskQDDU', 'Peel', 'What is a Cohort? How to Read a Cohort Analysis Chart'),
        EN('OwCATJh4lNg', 'Eric Andrews', 'Customer Retention & Cohort Analysis')
      ],
      c10: [
        EN('dNtks5NfUwc', 'Exponent', 'How to Answer ANY Product Management Interview Question'),
        V('14O4UWDlNbI', '硅谷大舅', '產品經理面試常見的三種錯誤')
      ]
    }
  };
})();
