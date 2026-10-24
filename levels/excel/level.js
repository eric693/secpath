/* Excel 與 Power BI 資料分析課程設定（原創教學課程，對應 MOS Excel 與 Microsoft PL-300 的核心觀念） */
window.LEVEL = {
  id: 'excel',
  name: 'Excel／Power BI',
  title: 'Excel 與 Power BI 資料分析',
  overline: '辦公室必備・Excel 函式 × 樞紐分析 × Power BI 儀表板',
  site: ['Microsoft Excel 說明與學習', 'https://support.microsoft.com/zh-tw/excel'],
  headline: 'Excel 與 Power BI<br>資料分析',
  lead: '行政、財會、業務、行銷、採購職缺最常要求的就是 Excel，進階一點則是 Power BI。12 章講義從整齊的資料表、公式與絕對參照、SUMIFS、XLOOKUP、文字與日期函式、資料清理與動態陣列、樞紐分析表、Power Query 自動化，一路學到 Power BI 的資料模型、DAX 量值、儀表板設計與發佈分享。搭配儲存格參照、XLOOKUP 與樞紐分析的互動練習，不需要電腦也能理解每個步驟。',
  subjects: {
    1: { name: 'Excel 篇', title: '函式、樞紐分析與 Power Query' },
    2: { name: 'Power BI 篇', title: '資料模型、DAX 與儀表板' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '實作完成清單', terms: 'Excel／Power BI 名詞', mnemonics: '重點口訣', numbers: '常用函式速查',
    sprintLead: '做報表或準備面試時隨時查閱：重點口訣、常用函式與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程為教學課程，綜合測驗涵蓋觀念題與公式結果判讀題，公式題的答案皆以講義中的範例資料逐筆計算驗證。準備 MOS Excel 或 PL-300 時可作為基礎檢核。',
    videoNote: '介面與函式以 Microsoft 365 繁體中文版為準，舊版 Excel 可能沒有 XLOOKUP、FILTER 等新函式'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並完成一份「Excel 樞紐分析報表」與一份「Power BI 銷售儀表板」放進作品集。',
  examInfo: [
    ['課程定位', '辦公室資料分析實務，適合行政、財會、業務、行銷、採購與想轉職資料分析的人'],
    ['使用版本', 'Microsoft 365（Excel 2021 以後），Power BI Desktop（免費下載，需 Windows）'],
    ['對應證照', 'MOS Excel（Associate／Expert）、Microsoft PL-300 Power BI 資料分析師的核心觀念'],
    ['學習時間', '講義約 9 小時，另加實作時間'],
    ['完成能力', '能整理資料、用函式與樞紐分析做報表，並用 Power BI 建立自動更新的儀表板'],
    ['銜接課程', 'SQL 資料庫入門、Python 實戰（pandas 自動化）、AI 應用實作']
  ],
  examNote: '本課程不是 Microsoft 官方課程。MOS 與 PL-300 的考試範圍、題型與費用請以 Microsoft Learn 與台灣考試中心公告為準；PL-300 另包含 Power BI Service 管理、資料閘道設定等實機操作內容。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：整齊的資料表、公式與參照、統計與邏輯函式，用自己的工作資料練習'],
    ['第 2 週', '第 4～5 章：查閱、文字、日期函式與資料清理，把手上的雜亂報表整理乾淨'],
    ['第 3 週', '第 6～7 章：樞紐分析表、圖表與 Power Query，完成 Excel 篇測驗'],
    ['第 4 週', '第 8～12 章：安裝 Power BI Desktop，建立資料模型、DAX 量值與儀表板，完成 Power BI 篇測驗'],
    ['之後', '下載政府開放資料做一份儀表板放進作品集，準備 MOS Excel 或 PL-300 證照']
  ],
  mnemonics: [
    ['整齊資料三原則', '一列一筆資料、一欄一種屬性、一格一個值（不合併儲存格、不留空列）'],
    ['F4 切換參照', 'A1 相對 → $A$1 絕對 → A$1 鎖列 → $A1 鎖欄'],
    ['$ 鎖誰', '$ 在欄字母前鎖欄，在列數字前鎖列，複製時被鎖的部分不會變'],
    ['SUMIFS 順序', '先寫「要加總的範圍」，再一組一組寫「條件範圍, 條件」'],
    ['VLOOKUP 四參數', '找什麼、在哪找、回傳第幾欄、FALSE 精確比對'],
    ['XLOOKUP 三參數', '找什麼、在哪找、回傳哪一欄；可往左找、預設精確比對'],
    ['錯誤值速記', '#DIV/0! 除以零、#N/A 找不到、#VALUE! 型別錯、#REF! 參照被刪、#NAME? 函式名稱打錯'],
    ['樞紐四區', '篩選、欄、列、值；數字放值、分類放列'],
    ['Power Query 精神', '整理步驟只做一次，資料更新後按重新整理'],
    ['合併與附加', '合併查詢＝左右接欄（像 JOIN），附加查詢＝上下接列（像 UNION）'],
    ['星狀結構', '中間一張事實表（交易紀錄），周圍是維度表（產品、客戶、日期）'],
    ['量值優先', '能用量值就不用計算欄：量值隨篩選即時計算、不佔儲存空間'],
    ['CALCULATE', '在修改後的篩選條件下計算，是 DAX 最重要的函式']
  ],
  numbers: [
    ['=SUMIFS(金額, 業務, "王小明")', '依條件加總'],
    ['=COUNTIFS(產品, "滑鼠", 數量, ">=10")', '多條件計數'],
    ['=IF(B2>=60, "及格", "不及格")', '條件判斷'],
    ['=IFERROR(公式, "")', '發生錯誤時顯示替代值'],
    ['=XLOOKUP(A2, 價目表[產品], 價目表[單價])', '查閱'],
    ['=VLOOKUP(A2, $F$2:$H$20, 3, FALSE)', '舊版查閱'],
    ['=INDEX(回傳欄, MATCH(值, 查找欄, 0))', '萬用查閱組合'],
    ['=TEXT(A2, "yyyy/mm/dd")', '日期轉成指定格式的文字'],
    ['=EOMONTH(A2, 0)', '當月最後一天'],
    ['=FILTER(資料, 條件)', '動態篩選（Microsoft 365）'],
    ['=UNIQUE(範圍)', '不重複清單'],
    ['Ctrl + T', '格式化為表格'],
    ['Ctrl + E', '快速填入'],
    ['總銷售額 = SUM(銷售[金額])', 'DAX 量值'],
    ['= CALCULATE([總銷售額], 產品[類別] = "3C")', '修改篩選條件計算'],
    ['= DIVIDE([毛利], [總銷售額])', '安全的除法']
  ],
  checklist: [
    '把一份合併儲存格、有空列的報表整理成整齊的資料表，並格式化為表格',
    '能用 F4 切換絕對參照，寫出可以往下、往右複製的公式',
    '能用 SUMIFS、COUNTIFS 做出各業務、各月份的統計表',
    '能用 XLOOKUP 或 INDEX／MATCH 從價目表帶入資料，並處理找不到的情況',
    '能用文字與日期函式拆解地址、計算到期日與工作天數',
    '能用資料驗證做下拉選單、用條件式格式標示異常值',
    '能建立樞紐分析表，依月份群組並加上交叉分析篩選器',
    '能用 Power Query 合併資料夾中的多個檔案，下個月只要按重新整理',
    '在 Power BI 建立星狀結構的資料模型與日期表',
    '能寫出總銷售額、毛利率、去年同期、年累計等 DAX 量值',
    '完成一份有 KPI、趨勢圖與篩選器的儀表板並發佈分享'
  ],
  tools: [['cellref', 'c02'], ['xlookup', 'c04'], ['pivot', 'c06']]
};
