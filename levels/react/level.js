/* React 前端框架課程設定（原創教學課程，以 React 18 函式元件與 Hooks 為主，範例可在網頁上即時預覽） */
window.LEVEL = {
  id: 'react',
  name: 'React',
  title: 'React 前端框架：元件、Hooks 與實戰專案',
  overline: '前端職缺最常要求・React 18 × Hooks × 即時預覽',
  site: ['React 官方文件（繁體中文）', 'https://zh-hant.react.dev/'],
  headline: 'React 前端框架<br>元件、Hooks 與實戰專案',
  lead: '台灣前端職缺最常要求的技能就是 React。11 章講義從 JSX、元件與 props、state 與事件，一路學到列表、表單、useEffect、useRef 與效能最佳化、Context 與 useReducer 狀態管理、自訂 Hook、路由與串接 API，最後完成待辦清單專案並部署上線。每個範例都能在網頁上直接修改並即時看到畫面，搭配 JSX 轉換、重新渲染追蹤、effect 執行順序與不可變更新的互動練習。',
  subjects: {
    1: { name: '基礎篇', title: 'JSX、元件、state、列表與表單' },
    2: { name: '進階篇', title: 'Hooks、狀態管理、路由與專案實戰' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '學習完成清單', terms: 'React 名詞', mnemonics: '重點口訣', numbers: 'Hooks 速查',
    sprintLead: '面試或開發時隨時查閱：重點口訣、常用 Hooks 與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以觀念、Hooks 用法與「畫面結果判讀」題為主，畫面結果題皆以 React 18 實際渲染並操作驗證。',
    videoNote: '範例以 React 18 函式元件與 Hooks 撰寫'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並能不看講義寫出待辦清單：新增、刪除、勾選完成、篩選，且資料存在 localStorage。',
  examInfo: [
    ['課程定位', '前端工程師求職、從原生 JavaScript 進入框架開發'],
    ['使用版本', 'React 18，函式元件與 Hooks；專案以 Vite 建立'],
    ['先備知識', '建議先完成「網頁開發入門」，熟悉 HTML、CSS 與 JavaScript（陣列方法、箭頭函式、解構）'],
    ['學習時間', '講義約 10 小時，另加專案練習'],
    ['完成能力', '能拆分元件、管理狀態、串接 API，獨立完成並部署一個 React 專案'],
    ['銜接課程', 'Git 版本控制、DevOps 入門（自動部署），之後可學 TypeScript 與 Next.js']
  ],
  examNote: '講義中的 React 範例在瀏覽器的隔離預覽框中執行，修改程式碼後會自動更新畫面，不會送到任何伺服器。預覽環境已載入 React 18，import react 的寫法可以直接使用；其他套件（例如 React Router）的範例請在自己電腦上用 Vite 建立專案練習。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：React 是什麼、JSX、元件與 props，用 Vite 建立第一個專案'],
    ['第 2 週', '第 4～6 章：state 與事件、列表與條件渲染、表單，完成基礎篇測驗'],
    ['第 3 週', '第 7～9 章：useEffect、useRef 與效能、Context 與 useReducer、自訂 Hook'],
    ['第 4 週', '第 10～11 章：路由與串接 API、待辦清單專案與部署，完成進階篇測驗'],
    ['之後', '做 2～3 個作品放上 GitHub（例如天氣查詢、記帳本），再學 TypeScript 與 Next.js']
  ],
  mnemonics: [
    ['UI = f(state)', '畫面是 state 的函式：改 state，React 負責更新畫面'],
    ['JSX 三規則', '只能有一個根元素、標籤一定要關閉、屬性用 camelCase（className、onClick）'],
    ['元件命名', '元件名稱大寫開頭，小寫會被當成 HTML 標籤'],
    ['props 唯讀', '資料由父傳子、單向流動；子元件不能修改 props'],
    ['state 不可變', '不要直接改物件或陣列，要用展開運算子建立新的'],
    ['連續更新', '依賴前一個值時用更新函式：setCount(c => c + 1)'],
    ['列表要 key', 'map 產生的元素要有穩定且唯一的 key，不要用 index 當 key'],
    ['事件傳函式', 'onClick={handle} 或 onClick={() => handle(id)}，不要寫成 onClick={handle()}'],
    ['effect 依賴', '沒寫依賴每次都執行、[] 只在掛載時、[x] 在 x 改變時'],
    ['記得清除', 'effect 中的計時器、訂閱、監聽器，要在清除函式中取消'],
    ['Hook 規則', '只在元件最上層呼叫，不能放在 if、迴圈裡'],
    ['狀態放哪裡', '多個元件共用的 state 提升到最近的共同父元件']
  ],
  numbers: [
    ['useState', '儲存會影響畫面的資料，改變時重新渲染'],
    ['useEffect', '渲染後執行副作用：抓資料、計時器、訂閱'],
    ['useRef', '取得 DOM 元素，或保存不觸發渲染的值'],
    ['useMemo', '快取計算結果，依賴不變就不重算'],
    ['useCallback', '快取函式，搭配 memo 避免子元件重新渲染'],
    ['useContext', '讀取 Context，避免一層層傳 props'],
    ['useReducer', '用 reducer 集中管理複雜的 state 更新邏輯'],
    ['memo', '包住元件，props 沒變就跳過重新渲染'],
    ['useId', '產生穩定的唯一 id，用於 label 與 input 配對'],
    ['自訂 Hook', '以 use 開頭的函式，把重複的 Hook 邏輯抽出來共用']
  ],
  checklist: [
    '能用 Vite 建立 React 專案，說明 main.jsx 與 App.jsx 的角色',
    '能寫出正確的 JSX，並用 { } 嵌入運算式與條件渲染',
    '能把畫面拆成元件，用 props 與 children 傳遞資料',
    '能用 useState 處理點擊與輸入，並以不可變的方式更新物件與陣列',
    '能用 map 渲染列表並正確設定 key',
    '能寫出受控表單，處理多個欄位與基本驗證',
    '能用 useEffect 抓資料、設定計時器，並寫出清除函式',
    '能說明什麼時候需要 useRef、useMemo、useCallback 與 memo',
    '能用 Context 與 useReducer 管理跨元件的狀態',
    '能把重複邏輯抽成自訂 Hook（例如 useLocalStorage、useFetch）',
    '能處理 API 的載入中、錯誤與空資料三種狀態',
    '能完成一個 React 專案並部署到網路上'
  ],
  tools: [['jsxconv', 'c02'], ['immut', 'c04'], ['effectlab', 'c07'], ['renderflow', 'c08']]
};
