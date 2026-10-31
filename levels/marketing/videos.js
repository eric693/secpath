/* 數位行銷教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-31）
   以台灣行銷頻道為主，英文影片補充 UTM 與 A/B 測試。廣告平台介面更新快，操作畫面以平台最新版本為準。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('JRy37KSV14w', '域動行銷 CLICKFORCE', '數位行銷基本知識與概念'),
      V('YOgvCnmHfs0', 'RBAY', '網路行銷一定要知道的 6 個專業術語：CPM、CTR、CPC、CPA、ROI、ROAS'),
      V('H8aEWX-llSc', 'RBAY', 'SEO 初學者教學，3 分鐘搞懂搜尋引擎優化')
    ],
    chapters: {
      c01: [
        V('JRy37KSV14w', '域動行銷 CLICKFORCE', '數位行銷基本知識與概念'),
        V('vRvBSPTN3q8', 'HubSpot Taiwan', '網路行銷是什麼？五大基本功'),
        V('p996KxhnuoA', 'Alex 聊創業', '行銷漏斗 Marketing Funnel 怎麼做？')
      ],
      c02: [
        V('6Ga1xOUMbwM', '賴春輯 Neo Sharing', '市場區隔與 TA：STP 理論 Part 1'),
        V('cEWV03kAX3c', '賴春輯 Neo Sharing', '定位：STP 理論 Part 2'),
        V('N1MBqwfl9c8', 'Gogo Partners 夥伴行銷設計', '用 Persona 找出目標客群')
      ],
      c03: [
        V('3BWVRrNy_Wg', 'Chloeの理想生活學', '如何寫出一篇好的文案？文案行銷漏斗 AIDA'),
        V('_yMJjDZdnr0', '阿Day - 數位轉型', '內容行銷 Step By Step 教學')
      ],
      c04: [
        V('H8aEWX-llSc', 'RBAY', 'SEO 初學者教學，3 分鐘搞懂搜尋引擎優化'),
        V('Voryxqmmr9Q', 'Sorla - 超簡單行銷', 'SEO 優化入門教學：初學者必須知道的操作流程'),
        V('USrRuDaOYlc', '鬍子Jack', '做一個 SEO Friendly 網站的 9 個條件')
      ],
      c05: [
        V('3Rq7f3xu4lM', '617行銷筆記', '社群經營重要第一步：設定受眾'),
        V('trmJtq_E9qU', '窩課360', '什麼是 LINE 官方帳號？與群組、社群的差別'),
        V('7mTCyZP4xR4', '我哈尼說創業就分手', 'LINE 官方帳號初學者經營，吸粉互動 6 大關鍵')
      ],
      c06: [
        V('7uOlJmyZjZw', '犬哥網站', 'Google Ads 廣告如何投？你的第一個數位廣告'),
        V('E8dizWJxKVQ', 'Sorla - 超簡單行銷', 'Google Ads 搜尋廣告設定完整教學')
      ],
      c07: [
        V('jOSb_s0it8w', '廣告投放教練 鎧開', 'Facebook & IG 廣告投放設定入門：Meta 廣告管理員完整教學'),
        V('yQ6KZ37c-Mg', '廣告投放教練 鎧開', 'Meta 廣告管理員從零投出第一支廣告')
      ],
      c08: [
        V('YOgvCnmHfs0', 'RBAY', '網路行銷一定要知道的 6 個專業術語'),
        V('cIQ9RdmSqg0', '廣告投放教練 鎧開', '廣告數據怎麼看？CPA、CTR、頻率，什麼時候該關掉廣告')
      ],
      c09: [
        V('Ia5uSzq4P3U', '阿Day - 數位轉型', 'Google Analytics 4 完整教學（新手適用）'),
        V('1b8Bn_s_6MI', '犬哥網站', 'Google Analytics 報表怎麼解讀？'),
        V('VaTmdWucsKk', '巴哥來了', 'UTM 是什麼？追蹤流量來源的好工具'),
        EN('eZs-KfVTm14', 'MeasureSchool', 'UTM Parameters and Tracking Explained in 100 Seconds')
      ],
      c10: [
        EN('XZ15VehMa7U', 'Surfside PPC', 'What is A/B Testing? Marketing and Advertising A/B Tests Explained'),
        EN('zFMgpxG-chM', 'Data Science Dojo', 'What is A/B Testing?')
      ]
    }
  };
})();
