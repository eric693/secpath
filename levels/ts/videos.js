/* TypeScript 教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-29）
   以中文教學頻道為主（布魯斯前端、彭彭的課程、走歪的工程師James、企鵝先生等），進階主題搭配英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('Mj8BJm6k0r0', '走歪的工程師James', '每個 JavaScript 工程師都必學的語言：TypeScript'),
      V('GinkGJZBHIY', '布魯斯前端', 'TypeScript 快速入門'),
      EN('d56mG7DezGs', 'Programming with Mosh', 'TypeScript Tutorial for Beginners')
    ],
    chapters: {
      c01: [
        V('NmGa54vgDhE', '彭彭的課程', 'TypeScript 語言簡介、快速開始'),
        V('3UpAwijIn_o', 'Ross Ning', '為什麼你應當使用 TypeScript？')
      ],
      c02: [
        V('ObWWHSUAiZg', '吴悠讲编程', '20 分鐘學會 TypeScript'),
        V('FDuWc9W3X54', '工程師奇異鳥', 'TypeScript 基礎教學')
      ],
      c03: [
        EN('e0AIkYrXAYE', 'Matt Pocock', 'Types vs Interfaces'),
        EN('BTBftM7D9v8', 'onjsdev', 'Type vs Interface In TypeScript in 2 Minutes')
      ],
      c04: [
        V('GinkGJZBHIY', '布魯斯前端', 'TypeScript 快速入門（函式）')
      ],
      c05: [
        EN('d56mG7DezGs', 'Programming with Mosh', 'TypeScript Tutorial for Beginners（聯合型別與型別縮小）')
      ],
      c06: [
        V('GinkGJZBHIY', '布魯斯前端', 'TypeScript 快速入門（類別與列舉）')
      ],
      c07: [
        V('pRbpMmCkOpo', '企鵝先生 Mr.Penguin', '泛型簡介與基礎'),
        V('_L63OjJpcyk', '企鵝先生 Mr.Penguin', 'TypeScript 內建的必用泛型')
      ],
      c08: [
        EN('EU0TB_8KHpY', 'Matt Pocock', "TypeScript's Utility Types"),
        EN('BhNSauna0eo', 'Web Dev Simplified', '18 TypeScript Utility Types')
      ],
      c09: [
        V('ObWWHSUAiZg', '吴悠讲编程', '20 分鐘學會 TypeScript（非同步）')
      ],
      c10: [
        V('NmGa54vgDhE', '彭彭的課程', 'TypeScript 專案設定與編譯')
      ],
      c11: [
        EN('TPACABQTHvM', 'ByteGrad', 'TypeScript in React - COMPLETE Tutorial'),
        EN('665UnOGx3Pg', 'PedroTech', 'All The TypeScript You Need to Know For React')
      ]
    }
  };
})();
