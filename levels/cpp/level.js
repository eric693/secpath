/* C++ 程式設計課程設定（原創教學課程，涵蓋 APCS、程式競賽與物件導向的核心觀念） */
window.LEVEL = {
  id: 'cpp',
  name: 'C++',
  title: 'C++ 程式設計：STL、物件導向與現代 C++',
  overline: 'APCS 與高效能開發・C++ × STL × 物件導向',
  site: ['cppreference：C++ 參考', 'https://en.cppreference.com/w/cpp'],
  headline: 'C++ 程式設計<br>STL、物件導向與現代 C++',
  lead: 'APCS 與程式競賽最多人使用的語言是 C++，遊戲引擎、高頻交易、晶片設計工具（EDA）、自駕車與影像處理也都以 C++ 為主。11 章講義從 cout／cin、參考與 string，到 STL 的 vector、map、set 與演算法，再學類別、繼承與多型、智慧指標與 RAII、樣板與例外，最後整理現代 C++、競程技巧與面試重點。每個範例都能直接在網頁上編譯執行。',
  subjects: {
    1: { name: '基礎篇', title: '語法、函式與 STL' },
    2: { name: '物件導向篇', title: '類別、記憶體管理與現代 C++' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '學習完成清單', terms: 'C++ 常用名詞', mnemonics: '重點口訣', numbers: '常用語法速查',
    sprintLead: '寫程式、準備 APCS 或面試時隨時查閱：重點口訣、常用語法與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以觀念題與「程式輸出判讀」題為主，輸出題都以 G++ 13 實際編譯執行驗證（-std=c++17）。',
    videoNote: '語法以 C++17 標準與 GCC 為準，並註明 C++20 的新功能'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並能用 STL 在 30 分鐘內解出 APCS 第三題難度的題目，且能說明虛擬函式與智慧指標的運作方式。',
  examInfo: [
    ['課程定位', '適合 APCS 與程式競賽考生、資工系學生，以及遊戲、金融科技、半導體 EDA 等需要 C++ 的職缺'],
    ['使用標準', 'C++17，以 G++ 編譯；範例送到 Compiler Explorer（godbolt.org）編譯執行'],
    ['先備知識', '建議先完成 C 語言課程的第 1～7 章（變數、流程控制、函式、陣列、指標）'],
    ['學習時間', '講義約 9 小時，另加解題練習'],
    ['完成能力', '能熟練使用 STL 解題，並以類別、繼承、多型與 RAII 設計程式'],
    ['銜接課程', 'C 語言（底層與嵌入式）、Git 版本控制、Linux 系統管理']
  ],
  examNote: '講義範例會把程式碼送到第三方服務 Compiler Explorer（godbolt.org）編譯執行，請勿在範例中貼上密碼等機密資料。APCS 的考試規則與範圍以官方公告為準。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：cout／cin、參考、string、函式多載與 lambda'],
    ['第 2 週', '第 4～6 章：vector、map、set、stack、queue 與 STL 演算法，每天解 2 題 ZeroJudge，完成基礎篇測驗'],
    ['第 3 週', '第 7～8 章：類別與物件、繼承與多型，寫一個小型的類別階層'],
    ['第 4 週', '第 9～11 章：智慧指標與 RAII、樣板與例外、現代 C++ 與競程技巧，完成物件導向篇測驗'],
    ['之後', '持續練習 APCS 歷屆題與 LeetCode，並完成一個 C++ 專題（例如文字冒險遊戲、檔案統計工具）']
  ],
  mnemonics: [
    ['輸入輸出', 'cout << 輸出、cin >> 輸入，箭頭指向資料流動的方向'],
    ['參考是別名', 'int &r = x; 之後 r 和 x 是同一個變數'],
    ['傳參數三選一', '小型別傳值；要修改用 &；大物件唯讀用 const &'],
    ['vector 是首選', '不知道用什麼容器時，先用 vector'],
    ['map 有序、unordered_map 快', 'map 依鍵排序 O(log n)，unordered_map 平均 O(1) 但無序'],
    ['set 自動去重排序', '要不重複又要排序就用 set'],
    ['左閉右開', 'STL 範圍 [begin, end)，end 指向最後一個元素的下一個位置'],
    ['建構與解構', '物件建立時呼叫建構子，離開作用域時自動呼叫解構子'],
    ['多型三要素', '繼承 + virtual 函式 + 透過基底類別的指標或參考呼叫'],
    ['基底解構子要 virtual', '會被繼承的類別，解構子一定要宣告為 virtual'],
    ['不要寫 new／delete', '用 make_unique／make_shared 與容器管理資源（RAII）'],
    ['競程加速', 'ios::sync_with_stdio(false); cin.tie(nullptr);'],
    ['1 秒約 10⁸', '估算複雜度：n = 10⁵ 可以 O(n log n)，不能 O(n²)']
  ],
  numbers: [
    ['cout << x << "\\n";', '輸出並換行'],
    ['cin >> a >> b;', '讀取兩個值'],
    ['getline(cin, line);', '讀取一整行'],
    ['vector<int> v(n, 0);', 'n 個 0 的動態陣列'],
    ['v.push_back(x); v.size();', '加到最後、元素個數'],
    ['sort(v.begin(), v.end());', '排序'],
    ['sort(v.begin(), v.end(), greater<int>());', '由大到小排序'],
    ['for (const auto &x : v)', '走訪容器'],
    ['map<string, int> m; m["a"]++;', '計數'],
    ['set<int> s; s.insert(x); s.count(x);', '去重與查詢'],
    ['auto it = lower_bound(v.begin(), v.end(), x);', '找第一個 ≥ x 的位置'],
    ['[&](int a, int b) { return a > b; }', 'lambda 運算式'],
    ['auto p = make_unique<Dog>();', '建立獨佔所有權的智慧指標'],
    ['virtual void speak() const = 0;', '純虛擬函式（抽象類別）'],
    ['template <typename T>', '函式或類別樣板']
  ],
  checklist: [
    '能用 cout／cin 處理各種輸入格式，並說明 endl 與 "\\n" 的差別',
    '能說明參考與指標的差別，並選擇正確的參數傳遞方式',
    '能熟練操作 string：串接、子字串、尋找、轉換數字',
    '能用 vector 與二維 vector 存放資料，並用 sort 搭配 lambda 自訂排序',
    '能用 map 計算出現次數、用 set 去除重複',
    '能用 stack、queue、priority_queue 解決對應的問題',
    '能估算程式的時間複雜度，判斷是否會超時',
    '能設計包含建構子、存取控制與 const 成員函式的類別',
    '能用繼承、virtual 與 override 實作多型',
    '能用 unique_ptr／shared_ptr 管理資源，說明 RAII',
    '能寫出簡單的函式樣板，並用例外處理錯誤',
    '完成至少 20 題 APCS 或 ZeroJudge 題目'
  ],
  tools: [['bigo', 'c06'], ['stlpick', 'c05']]
};
