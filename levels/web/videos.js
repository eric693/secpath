/* 網頁開發教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-24）
   以台灣中文教學頻道為主（PAPAYA 電腦教室、GrandmaCan、CodeShiba 程式柴、彭彭的課程、六角學院等），部分主題搭配英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('6HHN0G2cwBM', 'PAPAYA 電腦教室', '成為網頁設計師的第一步：快速上手 HTML & CSS'),
      V('0FLkwZ-PH2I', 'PAPAYA 電腦教室', 'JavaScript 快速上手：用一個實戰範例掌握重點語法'),
      V('fa214Ct6t9w', 'CodeShiba 程式柴', 'HTML + CSS 3 小時初學者課程')
    ],
    chapters: {
      c01: [
        V('10P6xq47QGo', 'CodeShiba 程式柴', '5 分鐘了解瀏覽器如何運作'),
        V('187jZXXS2w8', '資科科學公開課 鄭江宇老師', '網站與 HTML 運作原理：從瀏覽器請求到網頁呈現')
      ],
      c02: [
        V('CLUPkcLQm64', 'GrandmaCan -我阿嬤都會', 'HTML 1 小時初學者教學'),
        V('6HHN0G2cwBM', 'PAPAYA 電腦教室', '快速上手 HTML & CSS')
      ],
      c03: [
        V('faLeYRbEEIM', 'CodeShiba 程式柴', 'HTML 表格 Table'),
        V('vRtcQNliuJI', 'C w C AI & 程式設計', '如何建立網頁表單'),
        EN('2O8pkybH6po', 'Bro Code', 'Learn HTML forms in 8 minutes')
      ],
      c04: [
        V('-3W_n5A23-g', 'STEAM 教育學習網（OXXOSTUDIO）', 'CSS 組合選擇器'),
        V('W4_Ez5XbWuk', 'STEAM 教育學習網（OXXOSTUDIO）', 'CSS 選擇器的優先順序'),
        V('qrw5htoMdk8', '我是大仁哥', 'CSS 基礎教學：權重')
      ],
      c05: [
        V('ZWHy0zVkHAM', 'CodeShiba 程式柴', 'CSS 盒模型 Box Model'),
        V('6O_1Y9HrC-E', '六角學院', 'box-sizing 與盒模型的應用方式'),
        V('xbJPFMCiLHM', '彭彭的課程', 'CSS Flexbox 網頁切版技巧'),
        V('lmBM7_OTDBQ', '六角學院', 'CSS3 Flex 完整教學')
      ],
      c06: [
        V('lI81W0A-GUc', '說哈設計 Show Hand Design', 'CSS Grid Layout 格線佈局教學'),
        V('DfXwNBT32l0', 'Big Boy Can Code', '用 CSS Grid 做簡單的網頁版面'),
        V('om9ecdT-g9U', '彭彭的課程', 'RWD 回應式設計實務技巧'),
        V('3HiEvN92_3Y', 'C w C 頻道', '什麼是響應式網站？十分鐘理解與實作')
      ],
      c07: [
        V('yZwlW5INhgk', 'GrandmaCan -我阿嬤都會', 'JavaScript 3 小時初學者教學'),
        V('0FLkwZ-PH2I', 'PAPAYA 電腦教室', 'JavaScript 快速上手')
      ],
      c08: [
        EN('PojpwEbOQJg', 'Coding2GO', 'How to use map() filter() reduce()'),
        EN('8MoElay6dWU', 'dcode', 'Map, Filter & Reduce EXPLAINED in JavaScript')
      ],
      c09: [
        V('3M9xy1ZJ8m8', 'CodeShiba 程式柴', '5 分鐘了解 DOM 與樹狀結構'),
        V('8OejlO7N_vw', '彭彭的課程', 'JavaScript HTML DOM 核心觀念'),
        V('CbyAklJ8OEw', '紅色死神', '認識 JavaScript 的事件捕獲與事件冒泡'),
        V('A6KInmeWJfo', '技术蛋老师', '事件捕獲和事件冒泡（前端面試題）')
      ],
      c10: [
        V('z4S6ZxRD2rA', '走歪的工程師 James', 'JavaScript Event Loop 解說：單執行緒還能非同步？'),
        V('WEITXikGy6k', 'Big Boy Can Code', 'Async & Await：簡單的非同步處理'),
        V('nNjUgD5nbIU', 'Wei Wei 前端教學', 'Promise 常見的面試問題'),
        EN('cuEtnrL9-H0', 'Web Dev Simplified', 'Learn Fetch API In 6 Minutes')
      ],
      c11: [
        V('gUFHwJ1y80g', '六角學院', 'GitHub Pages 怎麼免費架網站'),
        V('uegeSwdfWjQ', 'The walking fish 步行魚', 'GitHub Pages 免費靜態網頁代管')
      ]
    }
  };
})();
