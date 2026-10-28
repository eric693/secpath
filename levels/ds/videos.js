/* 資料結構教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-28）
   以中文教學頻道為主（Purple Maple、矽谷叔叔、蕭志明、Feis Studio 等），部分主題搭配英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('WNN2-jw1EVU', '矽谷叔叔 Uncle Sam', '一次搞懂「資料結構」與「演算法」到底是什麼'),
      V('-LmHUlozTqE', 'Purple Maple', '輕鬆搞懂資料結構：陣列與鏈結串列'),
      V('c4R27mPT5kY', 'Purple Maple', '輕鬆搞懂演算法：DFS 與 BFS')
    ],
    chapters: {
      c01: [
        V('es82PRNCn9I', '矽谷叔叔 Uncle Sam', 'Big O 不難！初學者必看的演算法入門篇'),
        V('pSkKap8bzwg', 'P噴', 'Big O Notation：用時間複雜度判斷演算法的好壞')
      ],
      c02: [
        V('hmDi5qqBPoA', '蕭-志明', '資料結構教學：Array'),
        V('-LmHUlozTqE', 'Purple Maple', '輕鬆搞懂資料結構：陣列與鏈結串列')
      ],
      c03: [
        V('VBpA6KtMTtw', '小碼農米爾', '什麼是鏈結串列？'),
        V('VlNSgo4xHWk', '蕭-志明', '資料結構教學：Linked List')
      ],
      c04: [
        V('0Kiunabmm0w', 'Purple Maple', '輕鬆搞懂資料結構：堆疊（Stack）'),
        V('EW4XMHyQ5Pc', '矽谷叔叔 Uncle Sam', '吃洋芋片也能學資料結構：Stack')
      ],
      c05: [
        V('JSKtJqj2pwc', 'Purple Maple', '輕鬆搞懂資料結構：佇列（Queue）'),
        V('5tMFzCr8f1Q', '陳錦輝', '環狀佇列的陣列表示法')
      ],
      c06: [
        V('vPvxEDyxI2w', 'Purple Maple', '輕鬆搞懂資料結構：雜湊（Hash）'),
        V('O4dGJZ4J0Bk', 'Feis Studio', 'C++ 資料結構與演算法：雜湊表')
      ],
      c07: [
        V('nS56iL9pTjU', 'ManPy寫', '樹的前序、中序、後序解題'),
        V('boiHuxTR3C8', '建庭黃', '樹狀結構：二元樹的走訪'),
        V('7FpkEAYTIZI', '矽谷叔叔 Uncle Sam', '不單純的二元樹遍歷（Traversal）')
      ],
      c08: [
        V('sNWmwl6OWGg', '許晁睿', '二元搜尋樹'),
        V('xiOr2nrZi58', 'AI Sci Ke 理工柯小西', '平衡二元樹（AVL 樹）'),
        V('DB1HFCEdLxA', 'Michael Sambol', '5 分鐘了解 AVL 樹：介紹與搜尋')
      ],
      c09: [
        V('klbGg8dmYTM', 'Purple Maple', '輕鬆搞懂資料結構：堆積（Heap）'),
        V('wTAoOhytiQs', '图灵星球 TuringPlanet', '優先佇列 PriorityQueue 與堆積 Heap')
      ],
      c10: [
        V('c4R27mPT5kY', 'Purple Maple', '輕鬆搞懂演算法：DFS 與 BFS'),
        V('9P01tBgsipw', '从0开始数', '圖的遍歷：BFS 和 DFS（動畫）')
      ],
      c11: [
        V('XfWvkZmarNA', '波波微课', '並查集（Union Find）資料結構'),
        V('VR9i_SXovTo', '从0开始数', '輸入框自動補全背後的演算法：字典樹'),
        EN('ayW5B2W9hfo', 'Potato Coders', 'Union Find in 5 minutes')
      ]
    }
  };
})();
