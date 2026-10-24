/* Python 實戰課程設定（原創教學課程，非證照課程） */
window.LEVEL = {
  id: 'py-practice',
  name: 'Python 實戰',
  title: 'Python 實戰：自動化與資料分析',
  overline: '程式設計實戰・辦公自動化 × 網路資料 × 資料分析',
  site: ['Python 官方文件', 'https://docs.python.org/zh-tw/3/'],
  headline: 'Python 實戰<br>自動化與資料分析',
  lead: '把 Python 用在真實工作上：批次整理檔案、合併 Excel 報表、自動寄信、串接開放資料 API、網頁爬蟲、Telegram 通知機器人、pandas 資料分析與 matplotlib 圖表，最後呼叫 AI API 並整理成可以放進 104 履歷的作品集。大部分範例可以直接在網頁上執行。',
  subjects: {
    1: { name: '自動化篇', title: '辦公自動化與網路資料' },
    2: { name: '分析篇', title: '資料分析、AI 與作品集' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '作品完成清單', terms: '實戰常用名詞', mnemonics: '重點口訣', numbers: '常用語法速查',
    sprintLead: '動手做專案時隨時查閱：重點口訣、常用語法速查與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗用來檢查觀念與常見寫法，題目包含程式閱讀題。建議完成每章的實作後再挑戰。',
    videoNote: '套件用法以各套件官方文件為準'
  },
  readyNote: '建議完成至少三個作品並放上 GitHub，再開始投遞 104 上的自動化、資料分析相關職缺。',
  examInfo: [
    ['課程定位', '實戰專案課程，建議先完成「Python 入門」'],
    ['使用套件', 'pathlib、openpyxl、requests、BeautifulSoup、pandas、matplotlib'],
    ['練習環境', '講義內建線上執行器；寄信、爬蟲、機器人需在自己的電腦執行'],
    ['學習時間', '講義約 10 小時，另加專案實作時間'],
    ['完成成果', '5 個以上可放上 GitHub 的作品'],
    ['注意事項', '爬蟲與 API 請遵守網站規範與個資法']
  ],
  examNote: '網頁執行器使用瀏覽器中的 Python（Pyodide），無法連線外部網站或讀取你電腦上的檔案；需要網路或本機檔案的範例會標示「請在自己的電腦執行」。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：批次處理檔案、Excel 自動化、自動寄信與排程'],
    ['第 2 週', '第 4～6 章：HTTP 與 API、網頁爬蟲、Telegram 通知機器人，完成自動化篇測驗'],
    ['第 3 週', '第 7～9 章：pandas 基礎與進階、資料視覺化'],
    ['第 4 週', '第 10 章：呼叫 AI API、整理作品集與 README，完成分析篇測驗'],
    ['之後', '挑一個自己工作上的重複性工作，用 Python 自動化並寫成作品']
  ],
  mnemonics: [
    ['自動化三步', '先手動做一次並記錄步驟 → 找出重複的部分 → 用程式取代'],
    ['路徑用 pathlib', 'Path("資料夾") / "檔名"，跨平台不出錯'],
    ['先複製再處理', '批次修改檔案前先備份，或先用「預覽模式」只印出不執行'],
    ['API 四件事', '網址、方法（GET/POST）、參數、回應格式（多半是 JSON）'],
    ['爬蟲禮儀', '看 robots.txt 與使用條款、加延遲、不抓個資、能用 API 就用 API'],
    ['金鑰不進程式碼', 'API 金鑰與密碼放環境變數或 .env，並加入 .gitignore'],
    ['pandas 起手式', 'read → head／info → 清理 → 篩選／分組 → 輸出'],
    ['篩選用括號', 'df[(條件1) & (條件2)]，每個條件都要加括號，用 & | ~'],
    ['選圖口訣', '比較用長條、趨勢用折線、組成用堆疊長條、關係用散布'],
    ['作品三要素', '解決什麼問題、怎麼做到、成果與數字（省下多少時間）']
  ],
  numbers: [
    ['Path.glob("*.xlsx")', '找出資料夾中所有 Excel 檔'],
    ['shutil.move(src, dst)', '移動檔案'],
    ['ws.iter_rows(min_row=2, values_only=True)', 'openpyxl 從第二列開始逐列讀值'],
    ['requests.get(url, params=..., timeout=10)', '送出 GET 請求，記得設定逾時'],
    ['r.raise_for_status() / r.json()', '檢查狀態碼、把回應轉成字典'],
    ['soup.select("css 選擇器")', 'BeautifulSoup 依 CSS 選擇器找元素'],
    ['os.environ["TOKEN"]', '從環境變數讀取金鑰'],
    ['pd.read_csv / read_excel', '讀取 CSV 或 Excel 成為 DataFrame'],
    ['df.loc[條件, ["欄位"]]', '依條件篩選列並選取欄位'],
    ['df.groupby("欄").agg(...)', '分組彙總'],
    ['pd.merge(a, b, on="鍵")', '合併兩張表'],
    ['df.pivot_table(index, columns, values, aggfunc)', '樞紐分析'],
    ['df.plot(kind="bar")', 'pandas 直接畫圖'],
    ['plt.savefig("chart.png", dpi=150)', '把圖表存成圖片']
  ],
  checklist: [
    '完成「下載資料夾自動整理器」，能依副檔名分類並支援預覽模式',
    '完成「各分店月報自動彙整」，把多個 Excel 合併成一份並加上格式',
    '能用程式寄出含附件的 Email，帳號密碼沒有寫在程式碼裡',
    '能呼叫一個政府開放資料 API，並處理錯誤與逾時',
    '完成一個遵守網站規範的爬蟲，並把結果存成 CSV',
    '完成 Telegram 通知機器人，能在條件成立時發送訊息',
    '能用 pandas 清理資料：缺值、重複、型別轉換',
    '能用 groupby 與樞紐分析回答商業問題，並畫成圖表',
    '能用 AI API 對大量文字做摘要或分類',
    '至少 3 個作品放上 GitHub，每個都有清楚的 README'
  ],
  tools: [['pyrun', 'c07'], ['pyerr', 'c04']]
};
