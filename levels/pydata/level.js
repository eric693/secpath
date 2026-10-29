/* Python 資料分析課程設定（原創教學課程，以 pandas 2.2、NumPy 1.26、matplotlib 3.5 為準，範例在網頁上以 Pyodide 執行） */
window.LEVEL = {
  id: 'pydata',
  name: 'Python 資料分析',
  title: 'Python 資料分析：NumPy、pandas 與視覺化',
  overline: '資料分析師必備・pandas × matplotlib × 實際資料',
  site: ['pandas 官方文件', 'https://pandas.pydata.org/docs/'],
  headline: 'Python 資料分析<br>NumPy、pandas 與視覺化',
  lead: '資料分析師、行銷、財務與 PM 職缺最常要求的 Python 技能。11 章講義用一份咖啡店的整年銷售資料，從 NumPy 陣列、pandas 的 DataFrame 讀取與選取、篩選與轉換、資料清理、分組彙總，到合併與重塑、matplotlib 視覺化、時間序列與統計相關，最後完成一份銷售分析報告並匯出 Excel。所有範例都在網頁上直接執行（中文圖表也能正確顯示），不需要安裝任何軟體。',
  subjects: {
    1: { name: '基礎篇', title: 'NumPy、DataFrame、篩選、清理與分組' },
    2: { name: '進階篇', title: '合併、視覺化、時間序列、統計與實戰' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '學習完成清單', terms: '資料分析名詞', mnemonics: '重點口訣', numbers: 'pandas 速查',
    sprintLead: '分析資料時隨時查閱：重點口訣、常用的 pandas 語法與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以觀念、語法與「程式輸出判讀」題為主，輸出題皆以 pandas 2.2.0、NumPy 1.26.4（與網頁執行環境相同版本）實際執行驗證。',
    videoNote: '範例以 pandas 2 與 matplotlib 撰寫'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並能拿一份自己的 CSV 或 Excel 資料，獨立完成清理、分組彙總、畫出 3 張圖表並寫出結論。',
  examInfo: [
    ['課程定位', '資料分析師、行銷分析、財務、PM 與想用 Python 處理資料的上班族'],
    ['使用套件', 'pandas 2.2、NumPy 1.26、matplotlib 3.5；範例在網頁上以 Pyodide 執行'],
    ['先備知識', '建議先完成「Python 入門」，熟悉變數、串列、字典、迴圈與函式'],
    ['學習時間', '講義約 10 小時，另加實作練習'],
    ['完成能力', '能讀取、清理、彙總與合併資料，畫出合適的圖表並寫成分析報告'],
    ['銜接課程', 'SQL 與資料庫、Excel 與 Power BI、AI 應用實作']
  ],
  examNote: '講義範例使用咖啡店的模擬銷售資料：sales.csv（2025 年 1,285 筆訂單）、customers.csv（120 位會員）、sales_raw.csv（含缺失值與格式問題的原始資料）。程式中用 pd.read_csv(\'sales.csv\') 讀取即可，第一次執行需要下載 Python 環境與套件，約 10～30 秒。在自己的電腦上練習時，可以從課程資訊頁下載同樣的檔案。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：資料分析流程、NumPy 陣列、pandas 的 Series 與 DataFrame'],
    ['第 2 週', '第 4～6 章：篩選與轉換、資料清理、分組彙總與樞紐分析，完成基礎篇測驗'],
    ['第 3 週', '第 7～9 章：合併與重塑、matplotlib 視覺化、時間序列分析'],
    ['第 4 週', '第 10～11 章：統計與相關、銷售分析實戰專案，完成進階篇測驗'],
    ['之後', '找一份公開資料（政府資料開放平台、Kaggle）完成自己的分析作品集']
  ],
  mnemonics: [
    ['分析六步驟', '問題 → 取得 → 清理 → 探索 → 視覺化 → 結論'],
    ['拿到資料先看', 'head、info、describe、shape，先了解再分析'],
    ['向量化', '整欄一起算，不要用 for 迴圈一列一列處理'],
    ['loc 與 iloc', 'loc 用標籤（含結尾），iloc 用位置（不含結尾）'],
    ['多條件篩選', '用 & | ~，每個條件都要加括號'],
    ['清理四件事', '缺失值、重複、型別、格式不一致'],
    ['分組三步', 'split → apply → combine：groupby + agg'],
    ['合併要檢查', 'merge 前後比對筆數，注意 how 與重複的鍵'],
    ['日期先轉換', 'pd.to_datetime 之後才能用 .dt 與 resample'],
    ['圖表選擇', '趨勢用折線、比較用長條、分布用直方圖、關係用散佈圖'],
    ['相關不等於因果', '相關係數只表示一起變動，不代表誰造成誰'],
    ['不要改原始資料', '用新變數或 copy()，保留原始檔案可重跑']
  ],
  numbers: [
    ['pd.read_csv(\'檔案\')', '讀取 CSV'],
    ['df.head()／df.info()', '前 5 筆／欄位型別與缺失值'],
    ['df.describe()', '數值欄位的描述統計'],
    ['df[\'欄\']／df[[\'a\', \'b\']]', '選取一欄（Series）／多欄（DataFrame）'],
    ['df.loc[列, 欄]／df.iloc[列, 欄]', '依標籤／位置選取'],
    ['df[df[\'qty\'] > 2]', '依條件篩選'],
    ['df.isna().sum()', '各欄缺失值數量'],
    ['df.groupby(\'欄\')[\'值\'].sum()', '分組加總'],
    ['df.pivot_table(…)', '樞紐分析表'],
    ['pd.merge(a, b, on=\'鍵\')', '合併兩個表'],
    ['df.resample(\'MS\').sum()', '依月份彙總時間序列'],
    ['df.to_excel(\'檔案.xlsx\')', '匯出 Excel']
  ],
  checklist: [
    '能說明資料分析的流程，並在 Jupyter 或 Colab 中執行 pandas',
    '能建立 NumPy 陣列並使用向量化運算、布林索引與統計函式',
    '能用 read_csv 讀取資料，並用 head、info、describe 了解資料',
    '能用 loc、iloc 與布林條件選取與篩選資料',
    '能處理字串欄位與日期欄位，並新增計算欄位',
    '能找出並處理缺失值、重複資料、錯誤型別與不一致的格式',
    '能用 groupby、agg、pivot_table 完成分組彙總',
    '能用 merge 與 concat 合併資料，並用 melt 重塑格式',
    '能用 matplotlib 畫出折線圖、長條圖、直方圖與散佈圖並加上標題',
    '能用 resample 與 rolling 分析時間序列趨勢',
    '能計算相關係數並正確解讀結果',
    '能完成一份從資料到結論的分析報告並匯出 Excel'
  ],
  tools: [['dfselect', 'c03'], ['missing', 'c05'], ['groupviz', 'c06'], ['chartpick', 'c08']]
};
