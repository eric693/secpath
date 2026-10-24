/* Excel 與 Power BI 教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-24）
   以台灣中文教學頻道為主（PAPAYA 電腦教室、Tony 電腦教室、職場 MVP、先行智庫、JonJon MBA 等），部分主題搭配英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('wg3R5LdQ56k', 'PAPAYA 電腦教室', 'Excel 基礎教學 01：Excel 入門'),
      V('D_qJThLYU2U', 'GrandmaCan -我阿嬤都會', '2 小時學會 Excel'),
      V('9RcQUhlIb_Y', 'PAPAYA 電腦教室', '15 分鐘上手 Power BI')
    ],
    chapters: {
      c01: [
        V('wg3R5LdQ56k', 'PAPAYA 電腦教室', 'Excel 基礎教學 01：Excel 入門'),
        V('b9WzLHHe0u4', 'PAPAYA 電腦教室', 'Excel 初學者最常犯的六個新手陷阱'),
        V('44ldMvpEEGo', 'PAPAYA 電腦教室', '格式化為表格與交叉分析篩選器')
      ],
      c02: [
        V('4TKG2KCtu5s', 'Dex IT Flipped Classroom', '自動填滿、相對參照、絕對參照、混合參照'),
        V('RsAUVKgCrvk', '效率職人 Efficiency Person', '五分鐘搞清楚學函數前必學的觀念：絕對參照'),
        V('qS6__SvYFjM', 'PAPAYA 電腦教室', '工作表管理、下拉選單、公式建立、相對與絕對參照')
      ],
      c03: [
        V('MtjE8gdDJMk', 'PAPAYA 電腦教室', '邏輯函數 IF、AND、OR、NOT、IFS'),
        V('RUUhtpmvmpU', 'PAPAYA 電腦教室', '條件式統計函數 COUNTIFS、SUMIFS、AVERAGEIFS'),
        V('QVIIiTMvj1w', 'PAPAYA 電腦教室', 'COUNTIF 與 SUMIF 函數')
      ],
      c04: [
        V('_BJrCPfamSc', 'PAPAYA 電腦教室', 'VLOOKUP 功成身退！全新函數 XLOOKUP'),
        V('gOASqU7wHkQ', 'PAPAYA 電腦教室', 'VLOOKUP 函數與絕對參照設定'),
        V('hBTfkDW5OD4', 'Tony 電腦教室', 'VLOOKUP 函數三分鐘學會'),
        V('hJLurVi_VQA', 'PAPAYA 電腦教室', '日期函數與年資、工時計算')
      ],
      c05: [
        V('g835ZXDLTi0', 'PAPAYA 電腦教室', '「動態陣列」讓寫公式變得超簡單'),
        V('8ubTDPARJGk', 'PAPAYA 電腦教室', '動態陣列函數 SEQUENCE、FILTER、UNIQUE、SORT'),
        V('Pd1Loi96ZX0', 'PAPAYA 電腦教室', '下拉選單製作與 INDIRECT 函數')
      ],
      c06: [
        V('Fz8T_5V2hUc', 'PAPAYA 電腦教室', 'Excel 基礎教學 11：樞紐分析表'),
        V('-JhuVW5SNsg', '職場MVP', '7 分鐘學會樞紐分析操作心法')
      ],
      c07: [
        V('c4ZXLLExG_w', 'PAPAYA 電腦教室', '學會 Power Query 讓合併表格資料超有效率'),
        V('3nuFa5yEvvQ', 'PAPAYA 電腦教室', 'Power Query 手把手基礎教學：一鍵自動清理雜亂資料'),
        V('i_N2md3yzuc', '職場MVP', 'Power Query 合併工作表')
      ],
      c08: [
        V('9RcQUhlIb_Y', 'PAPAYA 電腦教室', '15 分鐘上手 Power BI'),
        V('zzA427sHQ-k', '先行智庫', 'Power BI 介紹與基礎操作'),
        V('rAupdv0I_Us', '簡單實驗室', 'Power BI 教學入門：從零開始做出銷售儀表板')
      ],
      c09: [
        V('gIafSXh50kQ', 'PowerBI减法君', '什麼是資料模型？資料模型的三種語義'),
        EN('4ePNrdxWtY0', 'Chandoo', 'Learn Data Modelling & Star Schema for Power BI in 20 minutes')
      ],
      c10: [
        V('Bz-UCPP8fMo', 'PAPAYA 電腦教室', '12 分鐘輕鬆搞懂 Power BI DAX 函數'),
        V('XEFg7kzIj-U', '周勝輝Excel', 'CALCULATE：DAX 最重要的函數'),
        V('Hy81YUsvPK8', '贊贊小屋', '從 ALL 及 ALLEXCEPT 瞭解 DAX 篩選機制'),
        EN('ePPi1LLX0sA', 'SQLBI', 'Measures vs. calculated columns in DAX and Power BI')
      ],
      c11: [
        V('u2aoT0SHLoc', 'JonJon MBA', 'Power BI 從入門到做出 Dashboard'),
        V('eDcVeiwsyio', 'Excel Taiwan', '15 分鐘學會 Power BI 儀表板')
      ],
      c12: [
        EN('MxU_FYSSnYU', 'Guy in a Cube', 'How to Setup Row-Level Security (RLS) in Power BI'),
        EN('hY_OcPRrDoI', 'The BI Man', 'Power BI Service: Gateway, Refresh, RLS, Apps & Sharing')
      ]
    }
  };
})();
