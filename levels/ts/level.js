/* TypeScript 課程設定（原創教學課程，以 TypeScript 5.6 strict 模式為準，範例在網頁上以官方編譯器型別檢查後執行） */
window.LEVEL = {
  id: 'ts',
  name: 'TypeScript',
  title: 'TypeScript：型別系統、泛型與實戰開發',
  overline: '前端與 Node.js 專案標配・TypeScript × 型別檢查 × 即時執行',
  site: ['TypeScript 官方手冊', 'https://www.typescriptlang.org/docs/handbook/intro.html'],
  headline: 'TypeScript<br>型別系統、泛型與實戰開發',
  lead: '現在大部分的 React、Vue 與 Node.js 專案都使用 TypeScript。11 章講義從基本型別、物件與 interface、函式、聯合型別與型別縮小、類別，到泛型、工具型別與型別操作、非同步與錯誤處理、模組與 tsconfig，最後在 React 與 Node.js 中實戰。每個範例都在網頁上以官方 TypeScript 編譯器（strict 模式）型別檢查後執行，錯誤訊息和你在自己電腦上看到的一樣，並附中文說明。',
  subjects: {
    1: { name: '基礎篇', title: '型別、物件、函式、聯合型別與類別' },
    2: { name: '進階篇', title: '泛型、型別操作、非同步、工具鏈與實戰' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '學習完成清單', terms: 'TypeScript 名詞', mnemonics: '重點口訣', numbers: '工具型別速查',
    sprintLead: '寫 TypeScript 時隨時查閱：重點口訣、常用工具型別與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以觀念、型別判讀與「程式輸出、哪裡會出現型別錯誤」題為主，皆以 TypeScript 5.6（strict 模式）實際編譯與執行驗證。',
    videoNote: '範例以 TypeScript 5 的 strict 模式撰寫'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並能把一個 JavaScript 小專案改寫成 strict 模式下沒有錯誤的 TypeScript，且不使用 any。',
  examInfo: [
    ['課程定位', '前端、全端與 Node.js 開發者，從 JavaScript 進入型別安全的開發'],
    ['使用版本', 'TypeScript 5.6，strict 模式；範例在網頁上以官方編譯器檢查與執行'],
    ['先備知識', '建議先完成「網頁開發入門」，熟悉 JavaScript 的物件、陣列方法、箭頭函式與 Promise'],
    ['學習時間', '講義約 9 小時，另加實作練習'],
    ['完成能力', '能為資料與函式設計型別、看懂並修正型別錯誤、使用泛型與工具型別，並在 React 與 Node.js 專案中使用'],
    ['銜接課程', 'React 前端框架、Git 版本控制，之後可學 Next.js 與後端框架']
  ],
  examNote: '講義中的 TypeScript 範例會在你的瀏覽器中以官方 TypeScript 編譯器（第一次執行時下載，約 1.6 MB）進行型別檢查，沒有錯誤才會執行，程式碼不會送到任何伺服器。編譯選項為 strict 模式、target ES2022。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：認識 TypeScript、基本型別、物件型別與 interface，建立第一個 TS 專案'],
    ['第 2 週', '第 4～6 章：函式、聯合型別與型別縮小、類別與列舉，完成基礎篇測驗'],
    ['第 3 週', '第 7～9 章：泛型、工具型別與型別操作、非同步與錯誤處理'],
    ['第 4 週', '第 10～11 章：模組與 tsconfig、在 React 與 Node.js 中使用，完成進階篇測驗'],
    ['之後', '把自己的 JavaScript 專案改寫成 TypeScript，開啟 strict 並消除所有 any']
  ],
  mnemonics: [
    ['型別只在編譯時存在', '執行時型別全部被移除，不會檢查，也不影響速度'],
    ['能推論就不必寫', '變數讓 TS 推論；函式參數、公開 API 要明確標註'],
    ['unknown 優於 any', 'any 關掉檢查；unknown 要先縮小型別才能使用'],
    ['interface 與 type', '物件形狀兩者皆可；聯合、交集、工具型別用 type'],
    ['可選與 undefined', 'name?: string 表示可能沒有，使用前要處理 undefined'],
    ['先縮小再使用', '用 typeof、in、instanceof、=== 或判別屬性縮小聯合型別'],
    ['窮舉檢查', 'switch 的 default 指定給 never，漏掉 case 時會報錯'],
    ['泛型是型別參數', '<T> 讓函式在保留型別資訊的同時適用多種型別'],
    ['約束泛型', '<T extends { id: number }> 限制 T 必須有哪些屬性'],
    ['as 只是告訴編譯器', '型別斷言不會轉換或檢查資料，外部資料要驗證'],
    ['as const', '讓物件與陣列變成唯讀的字面值型別'],
    ['strict 一律開啟', '新專案從第一天就開啟 strict，避免累積 any']
  ],
  numbers: [
    ['Partial<T>', '所有屬性變成可選'],
    ['Required<T>', '所有屬性變成必填'],
    ['Readonly<T>', '所有屬性變成唯讀'],
    ['Pick<T, K>', '只挑出指定的屬性'],
    ['Omit<T, K>', '移除指定的屬性'],
    ['Record<K, V>', '鍵為 K、值為 V 的物件'],
    ['ReturnType<F>', '取得函式的回傳型別'],
    ['Parameters<F>', '取得函式參數的元組型別'],
    ['Awaited<T>', '取得 Promise 解開後的型別'],
    ['NonNullable<T>', '移除 null 與 undefined'],
    ['Exclude<U, X>', '從聯合型別移除 X'],
    ['Extract<U, X>', '從聯合型別只留下 X']
  ],
  checklist: [
    '能說明 TypeScript 的編譯流程與「型別只在編譯時存在」',
    '能用 tsc --init 建立專案並開啟 strict 模式',
    '能正確使用基本型別、陣列、元組、any 與 unknown',
    '能用 interface 或 type 描述物件，處理可選與唯讀屬性',
    '能為函式參數、回傳值與回呼函式標註型別',
    '能用型別縮小與可辨識聯合安全地處理多種型別',
    '能寫出有存取修飾子並實作 interface 的類別',
    '能寫出泛型函式與泛型介面，並用 extends 加上約束',
    '能使用 Partial、Pick、Omit、Record 等工具型別',
    '能為 async 函式與 API 回應設計型別，並安全地處理錯誤',
    '能看懂 tsconfig 的重要選項並使用 @types 套件',
    '能在 React 元件與 Node.js 中正確使用 TypeScript'
  ],
  tools: [['tsinfer', 'c02'], ['tsnarrow', 'c05'], ['tsutil', 'c08'], ['jsonts', 'c09']]
};
