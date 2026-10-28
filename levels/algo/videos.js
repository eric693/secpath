/* 演算法教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-28）
   以中文教學頻道為主（Purple Maple、矽谷叔叔、蕭志明、許爸與小捲毛等），部分主題搭配英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('iLK48YAXjio', 'Purple Maple', '常用演算法策略：暴力法、貪婪法、分治法、回溯法'),
      V('M2kYdAA-FHY', 'Purple Maple', '輕鬆搞懂演算法：動態規劃'),
      V('dJc-h7ui8wc', '宇先程式', 'LeetCode 怎麼刷最有效：從 0 刷到 200 題經驗分享')
    ],
    chapters: {
      c01: [
        V('es82PRNCn9I', '矽谷叔叔 Uncle Sam', 'Big O 不難！初學者必看的演算法入門篇'),
        V('iLK48YAXjio', 'Purple Maple', '常用演算法策略總覽')
      ],
      c02: [
        V('-iekospznKg', '光茗數學 high light math', '3 分鐘搞懂河內塔玩法及其遞迴關係'),
        V('sauM1LO3kWs', 'An-Wen Deng', 'C++ 河內塔遞迴實作'),
        V('pJBG5_ja_YU', '蕭-志明', '演算法教學：Divide-and-Conquer')
      ],
      c03: [
        V('C9Xes8wH6Co', 'Purple Maple', '輕鬆搞懂演算法：合併排序'),
        V('DVDoyB5qDC4', 'Purple Maple', '輕鬆搞懂演算法：快速排序')
      ],
      c04: [
        V('s2VsK_UqO9E', '今天比昨天厲害', '二分搜尋法：六分鐘學會'),
        V('CMweVF2iSyQ', 'Feis Studio', 'C++ 資料結構與演算法：二元搜尋法')
      ],
      c05: [
        V('86GHTcY0K4I', '图灵星球 TuringPlanet', 'Array 題型：雙指標 Two Pointers 套路'),
        EN('y2d0VHdvfdc', 'AlgoMasterIO', 'Sliding Window in 7 minutes'),
        EN('yuws7YK0Yng', 'AlgoMasterIO', 'Prefix Sum in 4 minutes')
      ],
      c06: [
        V('idjWE9DRAuA', '动画讲编程', '回溯法解八皇后（動畫）'),
        V('iLK48YAXjio', 'Purple Maple', '暴力法與回溯法')
      ],
      c07: [
        V('wUpL4jSmWU0', '小碼農米爾', '什麼是貪婪法？'),
        V('Vd9v0q9Y2V8', '蕭-志明', '演算法教學：Greedy Algorithm')
      ],
      c08: [
        V('M2kYdAA-FHY', 'Purple Maple', '輕鬆搞懂演算法：動態規劃'),
        V('SE74vZQfvlY', '許爸與小捲毛', '0-1 背包問題（上）'),
        V('PkWGsbx0Uxw', '許爸與小捲毛', '0-1 背包問題（下）')
      ],
      c09: [
        V('rHV2MT2tD7Y', '洪Âng春男Chhun-Lâm', '最長共同子序列（LCS）問題的演算法介紹')
      ],
      c10: [
        V('HHvjmLKJaxM', '矽谷叔叔 Uncle Sam', '圖解演算法：Dijkstra 找尋最短路徑'),
        V('JLARzu7coEs', '从0开始数', '最短路徑查找：Dijkstra 演算法'),
        V('t_Ut2QPC6m0', '波波微课', 'Kahn 拓撲排序演算法'),
        V('71UQH7Pr9kU', 'Michael Sambol', '2 分鐘了解 Kruskal 演算法')
      ],
      c11: [
        V('dJc-h7ui8wc', '宇先程式', 'LeetCode 怎麼刷最有效'),
        V('YsRSBXXQdtw', '差评君', '什麼是 P = NP 問題？'),
        V('ERCGY3BemR4', '洪Âng春男Chhun-Lâm', '關於 NP 問題的介紹')
      ]
    }
  };
})();
