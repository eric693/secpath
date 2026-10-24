/* Python 實戰教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-17）
   以中文教學頻道為主，部分主題搭配英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('1PHp1prsxIM', 'CodeShiba 程式柴', 'Python 爬蟲 2 小時初學者課程'),
      V('mYX9AaJF2lw', 'GrandmaCan -我阿嬤都會', '自動化操作 Excel（openpyxl）'),
      V('5QZqzKCDCQ4', '彭彭的課程', 'Python Pandas 資料分析 - 基礎教學')
    ],
    chapters: {
      c01: [
        V('0DEVrhM_JTI', 'PyInvest', '初學者的 Python 實作：用 Python 自動整理資料夾（一）'),
        V('YxaPRu_T3Z8', 'PyInvest', '初學者的 Python 實作：自動整理資料夾（三）移動檔案'),
        EN('yxa-DJuuTBI', 'Corey Schafer', 'Python Tutorial: Pathlib - The Modern Way to Handle File Paths')
      ],
      c02: [
        V('mYX9AaJF2lw', 'GrandmaCan -我阿嬤都會', '自動化操作 Excel（openpyxl）'),
        V('8xFdQ-0t12s', '飛栗噗Philip', 'Python 自動化 Excel 數據演示：合併工作表'),
        EN('7YS6YDQKFh0', 'Tech With Tim', 'Automate Excel With Python - Python Excel Tutorial (OpenPyXL)')
      ],
      c03: [
        V('YQboCnlOb6Y', '彭彭的課程', 'Python Email 發送電子郵件 - 基本教學'),
        EN('WZ_pUSAV5DA', 'Mailtrap', 'Send Email in Python with Gmail - Tutorial')
      ],
      c04: [
        EN('tb8gHvYlCFs', 'Corey Schafer', 'Python Requests Tutorial: Request Web Pages, Download Images, POST Data, Read JSON'),
        EN('JVQNywo4AbU', 'Bro Code', 'Request API data using Python in 8 minutes')
      ],
      c05: [
        V('9Z9xKWfNo7k', '彭彭的課程', 'Python 網路爬蟲 Web Crawler 基本教學'),
        V('j5uinSQySbg', 'HiSKIO', '利用 BeautifulSoup 分析操作 HTML｜爬蟲實戰'),
        V('1PHp1prsxIM', 'CodeShiba 程式柴', 'Python 爬蟲 2 小時初學者課程')
      ],
      c06: [
        V('AucyTbbqXgc', '龍龍AI實戰學院', '訊息推送不是只有 LINE，帶你完成第一個 Telegram Bot'),
        EN('vZtm1wuA2yc', 'Indently', 'How To Create A Telegram Bot In Python For Beginners')
      ],
      c07: [
        V('5QZqzKCDCQ4', '彭彭的課程', 'Python Pandas 資料分析 - 基礎教學'),
        V('UCeeS95GatA', '图灵星球TuringPlanet', '什麼是 Pandas？資料處理神器入門')
      ],
      c08: [
        EN('VRmXto2YA2I', 'Alex The Analyst', 'Group By and Aggregate Functions in Pandas'),
        EN('Oo0Mio9Gx4A', 'Coding with David', 'Python Pandas Tutorial: GroupBy + Pivot Tables + Merge')
      ],
      c09: [
        V('MceOR4Kvv9I', '彭彭的課程', 'Matplotlib 簡介、安裝、快速開始'),
        V('lx0D-5dz1RE', 'PyInvest', '如何解決 matplotlib 中文亂碼問題')
      ],
      c10: [
        V('wD7TFHIvfWI', 'Jerry Chen', 'Claude API 實戰攻略 EP1：串出第一個 API 請求'),
        V('FKXRiAiQFiY', 'PAPAYA 電腦教室', 'Git 和 GitHub 零基礎快速上手'),
        V('atqcAb7MFAM', 'Gary Chen', '給非技術人員的 GitHub 教學')
      ]
    }
  };
})();
