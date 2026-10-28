/* SecPath 課程目錄：首頁課程牆、課程介紹頁與學習路線的設定。
   章數、題數、學習時數等數字由 site.js 從各課程的資料檔自動計算，這裡只放行銷文案與分類。
   新增課程時：在 server.js 的 LEVELS 加入課程後，於 courses 補上一筆即可出現在首頁。 */
'use strict';

const categories = [
  { id: 'security', name: '資訊安全', hue: 214 },
  { id: 'ai', name: 'AI 人工智慧', hue: 268 },
  { id: 'cloud', name: '雲端', hue: 32 },
  { id: 'code', name: '程式設計', hue: 152 },
  { id: 'data', name: '資料分析', hue: 75 },
  { id: 'it', name: 'IT 與 DevOps', hue: 190 },
  { id: 'practice', name: '實作專題', hue: 346 }
];

// kind：cert 證照備考、skill 技能教學；level：入門／進階；short：學習路線等處的簡稱（預設用 LEVELS 的 name）
const courses = {
  beginner: {
    short: 'iPAS 資安初級', cat: 'security', kind: 'cert', code: 'iPAS', level: '入門',
    pitch: '建立資安管理與技術的核心觀念，熟悉考試常見名詞、法規與基本攻防原理。',
    audience: ['想進入資安領域的初學者', '準備 iPAS 資訊安全工程師初級的考生', '需要補強資安觀念的 IT、MIS 人員'],
    highlights: ['涵蓋治理、風險、法規、網路、密碼學、攻擊手法與雲端安全', '題庫、模擬考、錯題本與名詞記憶卡', '雜湊、風險矩陣、ALE 計算等互動練習']
  },
  intermediate: {
    short: 'iPAS 資安中級', cat: 'security', kind: 'cert', code: 'iPAS', level: '進階',
    pitch: '以情境題與實務操作為主，強調資安規劃與防護的判斷能力。',
    audience: ['已具備資安初級基礎的學員', '從事資安或 IT 維運工作的人員', '準備 iPAS 資訊安全工程師中級的考生'],
    highlights: ['ISMS 建置、風險評鑑、法遵、IAM、金鑰管理、滲透測試與鑑識', '情境式題庫與 90 分鐘計時模擬考', 'CVSS 3.1 評分計算器等實務工具']
  },
  secplus: {
    cat: 'security', kind: 'cert', code: 'S+', level: '入門',
    pitch: '國際通用的資安入門證照，也是 SOC 分析師職缺最常要求的門檻。中文講義搭配英文原文名詞。',
    audience: ['想挑戰國際資安證照的學員', '目標是 SOC 分析師、資安工程師職缺的求職者', '已有 iPAS 資安基礎、想銜接國際證照的人'],
    highlights: ['對應 SY0-701 五大領域', 'Professor Messer 官方對應教學影片，逐章搭配', '情境題庫與 90 題・90 分鐘完整模擬考']
  },
  'ai-beginner': {
    short: 'iPAS AI 初級', cat: 'ai', kind: 'cert', code: 'AI 1', level: '入門',
    pitch: '系統化了解 AI 與生成式 AI，學會在工作中評估與導入，不需要程式背景。',
    audience: ['想系統化認識 AI 的上班族', '負責導入生成式 AI 的主管與 PM', '準備 iPAS AI 應用規劃師初級的考生'],
    highlights: ['AI 治理法規、資料處理、機器學習、No Code、提示工程、RAG', '逐章中文教學影片與 75 分鐘計時模擬考', '混淆矩陣、敘述統計、Softmax 溫度等互動練習']
  },
  'ai-intermediate': {
    short: 'iPAS AI 中級', cat: 'ai', kind: 'cert', code: 'AI 2', level: '進階',
    pitch: '深入 NLP、電腦視覺、MLOps、大數據與機器學習，可依選考科目分組練習。',
    audience: ['具 AI 專案或開發經驗者', '準備 iPAS AI 應用規劃師中級的考生', '想補強機器學習理論的資料工作者'],
    highlights: ['NLP、電腦視覺、生成式與多模態、MLOps、統計、深度學習、模型調校', '題庫含 pandas、NumPy、scikit-learn 程式閱讀題', '梯度下降學習率、敘述統計等互動練習']
  },
  'aws-clf': {
    cat: 'cloud', kind: 'cert', code: 'AWS', level: '入門',
    pitch: '建立 AWS 服務、安全與計費的完整觀念，進入雲端職涯的第一張證照，不需要寫程式。',
    audience: ['雲端初學者與轉職者', '需要和工程團隊溝通的業務、PM', '準備 AWS Cloud Practitioner 的考生'],
    highlights: ['全球基礎設施、共同責任模型、IAM、運算、儲存、網路、AI 服務、計費', '情境題庫與 65 題・90 分鐘完整模擬考', 'SLA 可用性、S3 儲存類別、EC2 計價比較等互動練習']
  },
  'aws-saa': {
    cat: 'cloud', kind: 'cert', code: 'AWS', level: '進階',
    pitch: '以「情境 → 選出最佳架構」為主軸，對應台灣雲端工程師與架構師職缺最常要求的證照。',
    audience: ['已有 AWS 基礎的學員', '想往雲端工程師、架構師發展的開發者', '準備 AWS Solutions Architect Associate 的考生'],
    highlights: ['IAM 進階、VPC 設計、資料保護、高可用、解耦、災難復原、成本最佳化', '架構情境題庫與 65 題・130 分鐘完整模擬考', 'VPC 子網路 CIDR 計算、多 AZ 可用性等互動練習']
  },
  'py-basic': {
    cat: 'code', kind: 'skill', code: 'Py', level: '入門',
    pitch: '完全沒寫過程式也能學。每個範例都能直接在網頁上執行與修改，不需要安裝任何軟體。',
    audience: ['完全沒有程式經驗的人', '想用程式減少重複工作的行政、財會、行銷人員', '準備學資料分析或 AI 的學生'],
    highlights: ['75 個範例可直接在網頁上執行與修改', '程式閱讀題答案皆以 Python 實際執行驗證', '線上執行器、切片視覺化、迴圈逐步追蹤、錯誤訊息查詢']
  },
  'py-practice': {
    cat: 'code', kind: 'skill', code: 'Py', level: '進階',
    pitch: '把 Python 用在真實工作上：自動化、爬蟲、資料分析與 AI，完成可以放進 104 履歷的作品集。',
    audience: ['完成 Python 入門、想做出實際作品的人', '想自動化 Excel、報表、通知等工作的上班族', '準備資料分析或自動化職缺的求職者'],
    highlights: ['6 個完整的實戰作品', 'pandas、matplotlib、openpyxl、BeautifulSoup 範例可在網頁上執行', '作品 README 範本與面試介紹技巧']
  },
  c: {
    cat: 'code', kind: 'skill', code: 'C', level: '入門',
    pitch: '半導體、韌體與嵌入式工程師的必備語言，也是資工系與 APCS 的基礎。從語法、指標、記憶體到位元運算，範例都能在網頁上編譯執行。',
    audience: ['資工、電機系學生與 APCS 考生', '想往韌體、嵌入式、半導體發展的工程師', '想真正理解電腦如何運作的程式初學者'],
    highlights: ['45 個範例可在網頁上以 GCC 編譯執行', '輸出題皆以 GCC 實際編譯執行驗證', '資料型別溢位、位元運算、指標記憶體圖互動練習']
  },
  cpp: {
    cat: 'code', kind: 'skill', code: 'C++', level: '進階',
    pitch: 'APCS 與程式競賽最常用的語言：STL 容器與演算法、類別與多型、智慧指標與現代 C++，並整理競程技巧與面試重點。',
    audience: ['準備 APCS、程式競賽的高中生與大學生', '想從事遊戲、EDA、金融科技的工程師', '學完 C 語言、想學物件導向與 STL 的人'],
    highlights: ['40 個範例可在網頁上以 G++ 編譯執行', '輸出題皆以 G++ 實際編譯執行驗證', '時間複雜度比較與 STL 容器選擇互動工具']
  },
  ds: {
    cat: 'code', kind: 'skill', code: 'DS', level: '進階',
    pitch: '資工系必修、面試第一關：從陣列、鏈結串列、堆疊、佇列、雜湊表，到二元搜尋樹、堆積、圖與並查集，每種結構都親手用 C++ 實作。',
    audience: ['準備軟體工程師面試、刷 LeetCode 的人', '資工系學生與準備研究所、APCS 的考生', '會寫程式但不清楚該選哪種資料結構的工程師'],
    highlights: ['26 個 C++ 實作範例可在網頁上編譯執行', '輸出題皆以 G++ 實際編譯執行驗證', '堆疊佇列、雜湊碰撞、二元搜尋樹與堆積視覺化工具']
  },
  algo: {
    cat: 'code', kind: 'skill', code: 'Algo', level: '進階',
    pitch: '面試與程式競賽的核心：複雜度分析、排序與二分搜尋、雙指標與回溯，再到貪心、動態規劃與 Dijkstra 等圖論演算法，最後整理解題策略。',
    audience: ['準備軟體工程師面試、刷 LeetCode 的人', '準備 APCS、程式競賽的高中生與大學生', '學完資料結構、想提升解題能力的人'],
    highlights: ['35 個 C++ 範例可在網頁上編譯執行', '輸出題皆以 G++ 實際編譯執行驗證', '排序過程、二分搜尋、DP 表格與最短路徑逐步視覺化']
  },
  web: {
    cat: 'code', kind: 'skill', code: 'Web', level: '入門',
    pitch: '自學轉職最多人走的前端路線：HTML 結構、CSS 排版與響應式設計、JavaScript 互動與串接 API，範例都能即時預覽。',
    audience: ['想轉職前端或全端工程師的人', '想自己做網站、修改公司網頁的設計師與行銷', '準備學 React 或 Vue 的初學者'],
    highlights: ['HTML、CSS 範例即時預覽，JavaScript 範例可直接執行', 'JavaScript 輸出題皆以 Node.js 實際執行驗證', '選擇器權重、盒模型計算與 Flexbox 遊樂場']
  },
  'ai-apps': {
    cat: 'ai', kind: 'skill', code: 'RAG', level: '進階',
    pitch: '從會用 AI 聊天進階到能打造 AI 應用：提示工程、API、RAG、工具呼叫與代理流程。',
    audience: ['想把生成式 AI 導入工作流程的人', '有 Python 基礎、想開發 AI 應用的開發者', '完成 iPAS AI 課程、想動手實作的學員'],
    highlights: ['RAG 檢索與評估範例可在網頁上執行', '文件切塊視覺化、RAG 檢索模擬、LLM 費用估算', '提示注入、資料外洩等資安風險與防護']
  },
  sql: {
    cat: 'data', kind: 'skill', code: 'SQL', level: '入門',
    pitch: '資料分析、後端、MIS 職缺最常要求的技能。從 SELECT、JOIN、分組統計到視窗函式，每個查詢都能在網頁上直接執行。',
    audience: ['想從事資料分析、商業分析的上班族', '準備後端或 MIS 職缺的求職者', '常被 Excel 資料量卡住、想更有效率處理資料的人'],
    highlights: ['77 個 SQL 範例在網頁上以 SQLite 直接執行', '查詢結果題皆以 SQLite 實際執行驗證', '執行順序練習與 JOIN 結果視覺化']
  },
  excel: {
    cat: 'data', kind: 'skill', code: 'Excel', level: '入門',
    pitch: '行政、財會、業務、行銷都用得到：函式、XLOOKUP、樞紐分析、Power Query 自動化，再進階到 Power BI 儀表板。',
    audience: ['每天和報表奮戰的行政、財會、業務人員', '想做出自動更新報表與儀表板的主管與分析師', '準備 MOS Excel 或 PL-300 的考生'],
    highlights: ['同一份銷售範例資料貫穿所有公式與樞紐分析', 'Power Query 自動化與 Power BI 星狀模型、DAX 量值', '儲存格參照、XLOOKUP 與樞紐分析互動練習']
  },
  network: {
    cat: 'it', kind: 'skill', code: 'NET', level: '入門',
    pitch: '網管、MIS、資安與雲端工程都必須懂網路。涵蓋 CCNA 與網路架設技術士的核心觀念。',
    audience: ['想從事網管、MIS 工作的初學者', '準備 CCNA 或網路架設技術士的考生', '想補強網路觀念的資安、雲端學員'],
    highlights: ['子網路計算題答案皆經程式驗算', '二進位轉換、子網路計算、VLSM 規劃、OSI 分層配對', 'Cisco IOS 基本設定與 Packet Tracer 練習方向']
  },
  git: {
    cat: 'it', kind: 'skill', code: 'Git', level: '入門',
    pitch: '工程師、資料分析師、設計師都用得到的必備技能，從第一次提交學到團隊協作與事故救援。',
    audience: ['第一次接觸版本控制的人', '要開始和團隊協作開發的工程師', '想把作品放上 GitHub 的求職者'],
    highlights: ['指令輸出題在真實 Git 中執行驗證', '網頁版 Git 指令模擬器，即時觀察提交歷史與分支', 'Git 情境指令查詢與語意化版本計算']
  },
  devops: {
    cat: 'it', kind: 'skill', code: 'OPS', level: '進階',
    pitch: '把程式從「我電腦上可以跑」變成自動測試、自動部署、出問題馬上知道。',
    audience: ['想往後端、雲端、SRE 發展的開發者', '負責部署與維運的 IT 人員', '已完成 Git 與 Linux 課程的學員'],
    highlights: ['Dockerfile、Compose、GitHub Actions、Kubernetes、Terraform 範例', 'Docker 層快取模擬、SLA 可用性換算', '作品集：推送後自動測試、建置映像並部署']
  },
  linux: {
    cat: 'it', kind: 'skill', code: 'Linux', level: '入門',
    pitch: '從零開始學 Linux，一路到服務管理、網路排錯、SSH 加固與入侵調查。',
    audience: ['準備 SOC、雲端或系統管理工作的初學者', '需要管理 Linux 伺服器的開發者', '想補強命令列能力的資安學員'],
    highlights: ['以 Ubuntu 為主並對照 RHEL 指令', '指令輸出題皆在真實 Linux 執行驗證', 'chmod 權限、cron 排程、子網路計算等互動工具']
  },
  'ai-invest': {
    cat: 'practice', kind: 'skill', code: 'n8n', level: '入門',
    pitch: '不寫程式，用生成式 AI、Google 試算表與 n8n，打造自己的台股研究助理並推播到手機。',
    audience: ['想用 AI 輔助投資研究的上班族', '想學 No Code 自動化的入門者', '對台股公開資料與回測有興趣的人'],
    highlights: ['所有資料來源與公式都已實際測試', '部位規模、最大回撤、定期定額複利等互動計算器', '工具教學，不提供個股買賣建議']
  }
};

// 學習路線：依職涯目標推薦的修課順序
const paths = [
  { id: 'soc', name: '資安分析師', desc: '從網路與系統基礎開始，取得國內外資安證照，準備 SOC 與資安工程師職缺。', steps: ['network', 'linux', 'beginner', 'secplus', 'intermediate'] },
  { id: 'cloud', name: '雲端工程師', desc: '打好網路與 Linux 基礎，取得 AWS 證照，再學會容器與自動化部署。', steps: ['network', 'linux', 'git', 'aws-clf', 'aws-saa', 'devops'] },
  { id: 'ai', name: 'AI 應用開發', desc: '從 Python 入門到考取 iPAS AI 證照，最後動手打造 RAG 與 AI 代理。', steps: ['py-basic', 'ai-beginner', 'py-practice', 'ai-apps', 'ai-intermediate'] },
  { id: 'auto', name: '辦公自動化與資料分析', desc: '不需資訊背景，從 Excel 與 SQL 開始，再用 Python 與 AI 自動化報表、分析資料並做出作品集。', steps: ['excel', 'sql', 'py-basic', 'py-practice', 'ai-apps'] },
  { id: 'firmware', name: '韌體與嵌入式工程師', desc: '從 C 語言打好指標與記憶體的基礎，學會 Linux 與網路，再用 C++ 與 Git 開發大型專案。', steps: ['c', 'linux', 'network', 'cpp', 'git'] },
  { id: 'swe', name: '軟體工程師面試', desc: '用 C++ 打好程式基礎，系統學會資料結構與演算法，搭配 Git 與 SQL，準備科技公司的白板題與技術面試。', steps: ['cpp', 'ds', 'algo', 'git', 'sql'] },
  { id: 'frontend', name: '前端工程師', desc: '從 HTML、CSS、JavaScript 打好基礎，學會版本控制與資料庫，再把作品自動部署上線。', steps: ['web', 'git', 'sql', 'devops'] }
];

module.exports = { categories, courses, paths };
