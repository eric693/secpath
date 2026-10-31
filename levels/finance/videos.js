/* 財務報表與商業分析教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-31）
   以繁體中文頻道為主。部分影片從投資角度說明，計算方式與名詞以講義為準；影片內容不構成投資建議。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('zYuAiMiLT_8', 'jasonmel', '十二分鐘略懂財務報表：資產負債表、損益表、現金流量表'),
      V('gdtUDPkg8IY', 'Better Leaf 好葉', '一個故事看懂財務報表'),
      V('wJIyvICPs4E', '鼎新數智 知識學院', '3 分鐘學會什麼是損益兩平點')
    ],
    chapters: {
      c01: [
        V('gdtUDPkg8IY', 'Better Leaf 好葉', '一個故事看懂財務報表'),
        V('wa8xh0tVOF0', 'Jade 投資理財', '三大財務報表概念與公司財務結構'),
        V('Rjf8SHQ3M0k', '臺大開放式課程 NTU OCW', '財務報表分析之目的與財務報表使用者')
      ],
      c02: [
        V('zYuAiMiLT_8', 'jasonmel', '十二分鐘略懂財務報表'),
        V('KX2JsKwUAfQ', '孫慶龍之財報魔法師', '七分鐘看懂損益表'),
        V('tH0K47-6SKI', 'CC投資生活', '看懂損益表，有什麼細項需要重點關注？')
      ],
      c03: [
        V('ni8UZr2foqs', '百萬書閣 THEMBS', '如何真正看懂資產負債表？')
      ],
      c04: [
        V('kS8xi5YhRRs', '3droid 三卓', '從現金流量表中找秘密'),
        V('ttbJ5Q65bAM', 'Rwei的投資日記', '現金流量表怎麼看？搞懂自由現金流'),
        V('JTifAUjmVjE', '小新讀book', '看懂現金流量表：營業、投資、融資')
      ],
      c05: [
        V('gBIzFETh1aU', 'Jade 投資理財', '一招讀懂財務報表比率'),
        V('YlrGhJ0Qi6M', 'CC投資生活', 'ROE 股東權益報酬率'),
        V('rYh__lBEj2Q', '小新讀book', '拆解獲利本質的神奇公式：杜邦方程式')
      ],
      c06: [
        V('wJIyvICPs4E', '鼎新數智 知識學院', '3 分鐘學會什麼是損益兩平點'),
        V('X40P2A2blfM', '熱血老闆James', '你的店到底是打平還是賺錢？開店必算損益平衡點')
      ],
      c07: [
        V('OvVUf-1rJW4', 'RBAY', '還在煩惱如何定價？定價策略'),
        V('3W9eR-TYpo4', '虎記商行', '開咖啡店要賺多少錢？毛利率與定價策略')
      ],
      c08: [
        V('pxLFVln5Hjg', '贊贊小屋', '成本差異分析表：彈性預算與實際的圖表')
      ],
      c09: [
        V('tHcCZAvd9B4', '睿視界', '理解錢的時間價值：淨現值 NPV、內部收益率 IRR'),
        V('Cq_eoDfbezg', '退休金理財第一站', 'IRR 與投資報酬率 ROI 一次看懂')
      ],
      c10: [
        V('WpEyAO3_bFA', 'Better Leaf 好葉', '沉沒成本：為什麼明知會虧錢還是會一頭栽下去？'),
        V('IFkg0xqE4_k', '林大衛', '3 分鐘搞懂「機會成本」與「沉沒成本」'),
        EN('z3z_GomovEI', 'Laurence Gartside', 'The Cash Conversion Cycle formula and how to use it')
      ]
    }
  };
})();
