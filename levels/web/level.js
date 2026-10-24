/* 網頁開發入門課程設定（原創教學課程，非證照課程） */
window.LEVEL = {
  id: 'web',
  name: '網頁開發',
  title: '網頁開發入門：HTML、CSS 與 JavaScript',
  overline: '前端與轉職必備・HTML × CSS × JavaScript',
  site: ['MDN Web Docs（中文）', 'https://developer.mozilla.org/zh-TW/'],
  headline: '網頁開發入門<br>HTML、CSS 與 JavaScript',
  lead: '自學轉職工程師最多人走的路線就是前端。11 章講義從網頁如何運作、HTML 結構與語意、表單，到 CSS 選擇器、盒模型、Flexbox、Grid 與響應式設計，再學 JavaScript 基礎、陣列與物件、DOM 操作與事件、非同步與 API，最後把作品放上 GitHub Pages。每個範例都能直接在網頁上修改並即時預覽，不需要安裝任何軟體。',
  subjects: {
    1: { name: '版面篇', title: 'HTML 與 CSS' },
    2: { name: '互動篇', title: 'JavaScript 與上線' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '作品完成清單', terms: '前端常用名詞', mnemonics: '重點口訣', numbers: '常用語法速查',
    sprintLead: '寫網頁或準備面試時隨時查閱：重點口訣、常用語法與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以觀念題與「程式輸出判讀」題為主，JavaScript 輸出題都以 Node.js 實際執行驗證。',
    videoNote: '語法以現代瀏覽器（Chrome、Edge、Safari、Firefox 最新版）與 MDN 文件為準'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並完成一個有表單、會呼叫 API、手機版排版正常的作品，放上 GitHub Pages。',
  examInfo: [
    ['課程定位', '零基礎學會前端三大技術，適合轉職、設計師、行銷與想自己做網站的人'],
    ['使用環境', '講義內建即時預覽與 JavaScript 執行器；完整開發請安裝 VS Code 與 Chrome'],
    ['學習時間', '講義約 8 小時，另加作品實作時間'],
    ['完成能力', '能切出響應式版面、用 JavaScript 處理互動與串接 API，並部署上線'],
    ['作品建議', '個人履歷網站、待辦清單、天氣查詢、記帳本'],
    ['銜接課程', 'Git 版本控制、Python 實戰（後端 API）、SQL 資料庫、DevOps 入門']
  ],
  examNote: '前端技術更新快，但 HTML、CSS、JavaScript 的基礎觀念很穩定。學完本課再學 React、Vue 等框架會輕鬆很多；語法細節以 MDN 文件與瀏覽器支援度（caniuse.com）為準。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：網頁如何運作、HTML 基礎、表格與表單，用 HTML 寫出自我介紹頁'],
    ['第 2 週', '第 4～6 章：CSS 基礎、盒模型與 Flexbox、Grid 與響應式設計，完成版面篇測驗'],
    ['第 3 週', '第 7～8 章：JavaScript 基礎、陣列與物件，在執行器中大量練習'],
    ['第 4 週', '第 9～11 章：DOM 與事件、非同步與 API、作品上線，完成互動篇測驗'],
    ['之後', '完成 3 個作品放上 GitHub Pages，再選一個框架（React 或 Vue）深入學習']
  ],
  mnemonics: [
    ['三劍客分工', 'HTML 負責結構、CSS 負責樣式、JavaScript 負責互動'],
    ['語意化標籤', '用 header、nav、main、article、footer 表達內容的意義，不要全部都是 div'],
    ['選擇器權重', 'ID（1,0,0）＞ class／屬性／偽類（0,1,0）＞ 標籤（0,0,1），越具體越優先'],
    ['盒模型由內而外', 'content → padding → border → margin'],
    ['box-sizing', 'border-box 讓 width 包含 padding 與 border，排版最直覺'],
    ['Flex 與 Grid', 'Flex 排一維（一列或一欄），Grid 排二維（列與欄）'],
    ['行動優先', '先寫手機版樣式，再用 min-width 媒體查詢加上大螢幕樣式'],
    ['let 與 const', '預設用 const，需要重新指定時才用 let，不要用 var'],
    ['=== 不要用 ==', '嚴格相等不做型別轉換，避免 0 == \'\' 這類意外'],
    ['陣列三神器', 'map 轉換、filter 篩選、reduce 彙總，都不會修改原陣列'],
    ['textContent 防 XSS', '顯示使用者輸入用 textContent，不要用 innerHTML'],
    ['async／await', 'await 等待 Promise 完成，記得用 try…catch 處理錯誤']
  ],
  numbers: [
    ['<a href="網址">文字</a>', '超連結'],
    ['<img src="圖檔" alt="說明">', '圖片，alt 不可省略'],
    ['<label for="id"> + <input id="id">', '表單欄位與標籤'],
    ['display: flex; gap: 16px;', '水平排列並設定間距'],
    ['justify-content／align-items', '主軸對齊／交錯軸對齊'],
    ['grid-template-columns: repeat(3, 1fr);', '三欄等寬格線'],
    ['@media (min-width: 768px) { … }', '平板以上的樣式'],
    ['document.querySelector(\'選擇器\')', '取得第一個符合的元素'],
    ['el.addEventListener(\'click\', fn)', '綁定事件'],
    ['el.classList.toggle(\'on\')', '切換 class'],
    ['arr.map(x => x * 2)', '轉換每個元素'],
    ['arr.filter(x => x > 0)', '篩選元素'],
    ['const res = await fetch(url)', '呼叫 API'],
    ['JSON.parse()／JSON.stringify()', 'JSON 文字與物件互轉'],
    ['localStorage.setItem(鍵, 值)', '在瀏覽器儲存資料']
  ],
  checklist: [
    '安裝 VS Code 與 Chrome，會使用開發人員工具檢查元素與看 Console',
    '用語意化標籤寫出完整的 HTML 頁面，圖片都有 alt',
    '做出一個有 label、驗證與送出處理的表單',
    '能說明選擇器權重，並用 class 組織樣式',
    '用 Flexbox 做出導覽列，用 Grid 做出卡片牆',
    '版面在手機（390px）與桌機都正常，沒有橫向捲軸',
    '能用 map、filter、reduce 處理陣列資料',
    '能用 querySelector 與 addEventListener 做出互動，例如待辦清單',
    '能用 fetch 呼叫公開 API 並處理錯誤',
    '用 localStorage 保存使用者資料',
    '把作品放上 GitHub Pages，取得可以分享的網址'
  ],
  tools: [['specificity', 'c04'], ['boxmodel', 'c05'], ['flexbox', 'c05']]
};
