/* Node.js 後端與 API 開發教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-31）
   中文影片說明觀念，英文影片補充 Express 與部署實作。部分影片使用 Express 4 或舊版 Node.js，程式寫法以講義為準。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('4e4s89k8B0k', '六角學院', 'Node.js 是什麼？'),
      V('Rlj0xVAEoxk', '傑克 IT 誌', '25 分鐘快速學會 Node.js 基礎入門'),
      EN('-mN3VyJuCjM', 'ByteByteGo', 'What Is REST API? Examples And How To Use It')
    ],
    chapters: {
      c01: [
        V('4e4s89k8B0k', '六角學院', 'Node.js 是什麼？'),
        V('z4S6ZxRD2rA', '走歪的工程師James', 'JavaScript Event Loop 解說：單執行緒還能異步運算？'),
        V('8aGhZQkoFbQ', 'JSConf', '所以說 event loop 到底是什麼玩意兒？（中文字幕）')
      ],
      c02: [
        V('DeGpnhod_nU', '我是大仁哥', '1 小時 Node 快速入門'),
        EN('eiC58R16hb8', 'Lydia Hallie', 'JavaScript Visualized - Event Loop, Web APIs, (Micro)task Queue')
      ],
      c03: [
        EN('-mN3VyJuCjM', 'ByteByteGo', 'What Is REST API? Examples And How To Use It')
      ],
      c04: [
        V('k_pR4ARWpuk', '微笑線上課程', '建立專案以及使用 Express 框架'),
        EN('lY6icfhap2o', 'Web Dev Simplified', 'Learn Express Middleware In 14 Minutes')
      ],
      c05: [
        EN('pKd0Rpw7O48', 'Programming with Mosh', 'How to build a REST API with Node js & Express（含輸入驗證）')
      ],
      c06: [
        EN('TlB_eWDSMt4', 'Programming with Mosh', 'Node.js Tutorial for Beginners')
      ],
      c07: [
        EN('pKd0Rpw7O48', 'Programming with Mosh', 'How to build a REST API with Node js & Express')
      ],
      c08: [
        V('0ZWo22vF4uU', '六角學院', '從零開始介紹 JWT 驗證'),
        V('29CE6uK7jIU', 'Web 實驗室', 'JWT 原理與組成'),
        EN('qgpsIBLvrGY', 'Studying With Alex', 'Password Storage Tier List: encryption, hashing, salting, bcrypt')
      ],
      c09: [
        V('AAPf55AVlXU', '技术蛋老师', 'SQL 注入攻擊原理、方法和類型'),
        V('Md9wxO6BU_c', '沈弘哲', '認識 Same-Origin Policy and CORS'),
        EN('4KHiSt0oLJ0', 'Fireship', 'CORS in 100 Seconds')
      ],
      c10: [
        EN('oykl1Ih9pMg', 'Traversy Media', 'Full Node.js Deployment - NGINX, SSL With Lets Encrypt')
      ]
    }
  };
})();
