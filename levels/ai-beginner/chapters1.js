/* AI 應用規劃師初級 科目一：人工智慧基礎概論（L11） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 40,
  title: 'AI 的定義與分類',
  summary: 'L11101：人工智慧的定義與發展、AI 與機器學習及深度學習的關係、弱 AI 與強 AI、AI 的三大能力與常見應用領域。',
  sections: [
    { id: 'define', title: '什麼是人工智慧', html: `
<p><b>人工智慧（Artificial Intelligence, AI）</b>是讓機器展現類似人類智慧行為的技術，例如理解語言、辨識影像、做出判斷與決策、產生新內容。1956 年達特茅斯會議首次提出「人工智慧」一詞。</p>
<div class="box exam"><b class="t">考點提示</b>AI 不等於 ChatGPT。ChatGPT 只是生成式 AI 的一種應用；人臉辨識、推薦系統、垃圾郵件過濾、自駕車也都屬於 AI。</div>
<h3>AI、機器學習與深度學習的關係</h3>
<div class="concepts">
  <div class="concept"><b>人工智慧 AI</b><span>最大範圍：所有讓機器展現智慧的技術，包含早期以規則寫成的專家系統</span></div>
  <div class="concept"><b>機器學習 ML</b><span>AI 的子集合：讓機器從資料中自動學習規律，而非由人寫死規則</span></div>
  <div class="concept"><b>深度學習 DL</b><span>ML 的子集合：使用多層類神經網路，擅長處理影像、語音、文字</span></div>
  <div class="concept"><b>生成式 AI</b><span>多以深度學習為基礎，能產生新的文字、圖片、聲音、影片</span></div>
</div>
<h3>發展歷程</h3>
<div class="table-wrap"><table>
<tr><th>時期</th><th>特色</th></tr>
<tr><td>1950–1970 年代</td><td>符號主義、邏輯推理；圖靈測試（Turing Test）判斷機器是否具有智慧</td></tr>
<tr><td>1980 年代</td><td><b>專家系統（Expert System）</b>：把專家知識寫成「若…則…」規則</td></tr>
<tr><td>1990–2000 年代</td><td>機器學習興起：決策樹、SVM 等統計學習方法</td></tr>
<tr><td>2012 年起</td><td>深度學習突破：大數據、GPU 算力與演算法進步，影像辨識準確率大幅提升</td></tr>
<tr><td>2017 年起</td><td>Transformer 架構提出，帶動大型語言模型（LLM）與生成式 AI 爆發</td></tr>
</table></div>
<p>AI 經歷過兩次<b>AI 寒冬（AI Winter）</b>，原因是期望過高、算力與資料不足。這次能突破的三大關鍵是<strong>大數據、算力、演算法</strong>。</p>` },
    { id: 'types', title: 'AI 的分類方式', html: `
<h3>依能力層級</h3>
<div class="table-wrap"><table>
<tr><th>類型</th><th>說明</th><th>現況</th></tr>
<tr><td><b>弱 AI／狹義 AI</b><br><small>Artificial Narrow Intelligence, ANI</small></td><td>只擅長特定任務，例如下棋、翻譯、人臉辨識</td><td><strong>目前所有 AI 都屬於此類</strong>，包含 ChatGPT</td></tr>
<tr><td><b>強 AI／通用 AI</b><br><small>Artificial General Intelligence, AGI</small></td><td>具有與人類相當、可跨領域學習與推理的能力</td><td>尚未實現</td></tr>
<tr><td><b>超級 AI</b><br><small>Artificial Super Intelligence, ASI</small></td><td>在所有領域都超越人類</td><td>理論概念</td></tr>
</table></div>
<h3>依功能（考試常用的三分法）</h3>
<div class="concepts">
  <div class="concept"><b>分析型 AI</b><span>理解現況、找出規律。例：客戶分群、異常偵測、情感分析</span></div>
  <div class="concept"><b>預測型 AI</b><span>根據歷史資料推估未來。例：銷售預測、信用評分、設備故障預測</span></div>
  <div class="concept"><b>生成型 AI</b><span>產生新內容。例：撰寫文案、產生圖片、程式碼生成</span></div>
</div>
<h3>依技術路線</h3>
<ul>
  <li><b>規則式 AI（Rule-based）</b>：由人定義規則，透明但難以處理複雜或變動的情境。</li>
  <li><b>資料驅動 AI（Data-driven）</b>：機器學習從資料中學習規律，彈性高但需要大量資料。</li>
</ul>` },
    { id: 'apps', title: 'AI 的常見應用領域', html: `
<div class="table-wrap"><table>
<tr><th>技術領域</th><th>能力</th><th>應用例子</th></tr>
<tr><td><b>電腦視覺 CV</b></td><td>理解影像與影片</td><td>人臉辨識、瑕疵檢測、醫學影像判讀、車牌辨識</td></tr>
<tr><td><b>自然語言處理 NLP</b></td><td>理解與產生人類語言</td><td>機器翻譯、聊天機器人、情感分析、文件摘要</td></tr>
<tr><td><b>語音辨識與合成</b></td><td>語音轉文字、文字轉語音</td><td>語音助理、會議逐字稿、客服語音</td></tr>
<tr><td><b>推薦系統</b></td><td>預測使用者偏好</td><td>電商商品推薦、影音平台推薦</td></tr>
<tr><td><b>預測分析</b></td><td>從歷史資料推估未來</td><td>需求預測、詐欺偵測、預測性維護</td></tr>
<tr><td><b>機器人與自動化</b></td><td>感知環境並採取行動</td><td>自駕車、倉儲機器人、無人機</td></tr>
</table></div>
<div class="box analogy"><b class="t">情境範例</b>一家零售業者：用<b>電腦視覺</b>分析貨架缺貨、用<b>預測分析</b>預估下週銷量、用<b>推薦系統</b>推送優惠、用<b>生成式 AI</b>產生商品文案。同一間公司可以同時使用多種 AI。</div>` }
  ],
  keypoints: [
    'AI ⊃ 機器學習 ⊃ 深度學習；生成式 AI 多以深度學習為基礎',
    '目前所有 AI（含 ChatGPT）都屬於弱 AI（ANI），AGI 尚未實現',
    'AI 三大功能：分析、預測、生成',
    '規則式 AI 由人定義規則；資料驅動 AI 從資料學習',
    '這波 AI 突破的三大關鍵：大數據、算力、演算法',
    '常見領域：電腦視覺、自然語言處理、語音、推薦系統、預測分析'
  ]
},
{
  id: 'c02', subject: 1, minutes: 55,
  title: 'AI 治理與國內外法規指引',
  summary: 'L11102：可信任 AI 原則、歐盟人工智慧法、NIST AI RMF、ISO/IEC 42001、台灣人工智慧基本法、數位部公部門手冊與 AI 評測、金管會金融業 AI 指引。',
  sections: [
    { id: 'gov', title: 'AI 治理與可信任 AI', html: `
<p><b>AI 治理（AI Governance）</b>是組織為確保 AI 安全、合法、合乎倫理而建立的政策、流程、角色與監督機制。目標是發展<b>可信任 AI（Trustworthy AI）</b>，也常稱為<b>負責任 AI（Responsible AI）</b>。</p>
<div class="concepts">
  <div class="concept"><b>公平性 Fairness</b><span>不因性別、種族等特徵產生歧視</span></div>
  <div class="concept"><b>透明性 Transparency</b><span>讓使用者知道正在與 AI 互動，並了解 AI 的用途與限制</span></div>
  <div class="concept"><b>可解釋性 Explainability</b><span>能說明 AI 為什麼做出這個判斷</span></div>
  <div class="concept"><b>問責 Accountability</b><span>出問題時有明確的負責人</span></div>
  <div class="concept"><b>隱私 Privacy</b><span>保護個人資料，遵守個資法規</span></div>
  <div class="concept"><b>安全與穩健 Safety / Robustness</b><span>能抵抗攻擊與異常輸入，不造成傷害</span></div>
  <div class="concept"><b>人類監督 Human Oversight</b><span>重要決策保留人類介入與最終決定權</span></div>
</div>` },
    { id: 'eu', title: '歐盟人工智慧法（EU AI Act）', html: `
<p>全球第一部全面性的 AI 專法，2024 年 8 月 1 日生效，採<strong>以風險為基礎（Risk-based）</strong>的分級管理，並分階段適用。</p>
<div class="table-wrap"><table>
<tr><th>風險等級</th><th>規範</th><th>例子</th></tr>
<tr><td><b>不可接受風險</b><br><small>Unacceptable Risk</small></td><td><strong>禁止使用</strong>（2025 年 2 月起）</td><td>社會信用評分、操縱人類行為、利用弱勢族群、職場與學校的情緒辨識、公共場所即時遠端生物辨識（執法有例外）</td></tr>
<tr><td><b>高風險</b><br><small>High Risk</small></td><td>嚴格義務：風險管理、資料治理、技術文件、紀錄保存、人類監督、準確與資安、上市前符合性評估</td><td>關鍵基礎設施、教育評分、招募篩選、信用評分、執法、醫療器材、移民邊境管理</td></tr>
<tr><td><b>有限風險</b><br><small>Limited Risk</small></td><td><strong>透明義務</strong>：告知使用者正在與 AI 互動、標示 AI 生成內容</td><td>聊天機器人、深偽（Deepfake）內容</td></tr>
<tr><td><b>最小風險</b><br><small>Minimal Risk</small></td><td>無額外義務，鼓勵自律</td><td>垃圾郵件過濾、電玩 AI</td></tr>
</table></div>
<ul>
  <li><b>通用目的 AI 模型（GPAI）</b>：如大型語言模型，需提供技術文件、遵守著作權規範；具系統性風險者有更多義務。</li>
  <li><b>罰則</b>：違反禁止規定最高 3,500 萬歐元或全球年營業額 7%（取較高者）。</li>
  <li><b>域外效力</b>：在歐盟提供或使用 AI 系統的企業，即使不在歐盟境內也需遵守。</li>
</ul>
<div class="box exam"><b class="t">考點提示</b>常見考法是給一個情境，問屬於哪個風險等級。用 AI 篩選求職者履歷是<b>高風險</b>；客服聊天機器人是<b>有限風險</b>（要告知是 AI）；政府對人民做社會信用評分是<b>不可接受</b>。</div>` },
    { id: 'intl', title: '國際框架與標準', html: `
<div class="table-wrap"><table>
<tr><th>框架</th><th>重點</th></tr>
<tr><td><b>NIST AI RMF 1.0</b><br><small>美國國家標準暨技術研究院</small></td><td>自願性的 AI 風險管理框架，四大功能：<b>Govern 治理</b>（建立文化與責任）、<b>Map 對應</b>（界定情境與風險）、<b>Measure 量測</b>（評估與追蹤風險）、<b>Manage 管理</b>（排序並處理風險）。2024 年另發布生成式 AI 側寫（Generative AI Profile）</td></tr>
<tr><td><b>ISO/IEC 42001</b></td><td>全球第一個 <b>AI 管理系統（AIMS）</b>標準，可通過第三方驗證，採 PDCA 持續改善</td></tr>
<tr><td><b>ISO/IEC 23894</b></td><td>AI 風險管理指引</td></tr>
<tr><td><b>OECD AI 原則</b></td><td>以人為本、透明、穩健安全、問責等國際共識原則</td></tr>
</table></div>` },
    { id: 'tw', title: '台灣的 AI 法規與指引', html: `
<h3>人工智慧基本法</h3>
<p>2025 年 12 月 23 日立法院三讀通過，屬於<b>基本法</b>：確立國家 AI 發展方向與原則，具體規範再由各主管機關訂定。重點包括：</p>
<ul>
  <li><b>七大基本原則</b>：永續發展與福祉、人類自主、隱私保護與資料治理、資安與安全、透明與可解釋、公平與不歧視、問責。</li>
  <li>政府應推動 AI 研發、人才培育、資料開放與基礎建設。</li>
  <li>建立 <b>AI 風險分級框架</b>，並與國際標準接軌；對高風險應用要求明確的責任歸屬與救濟機制。</li>
  <li>強調避免 AI 侵害人民生命、身體、自由、財產與隱私等權益。</li>
</ul>
<h3>公部門人工智慧應用參考手冊（數位發展部）</h3>
<p>協助政府機關依生命週期規劃、導入與管理 AI 應用：評估需求與適用性、資料治理、風險評估、採購與委外、透明說明、持續監測。強調<b>人類保有最終決策權</b>與對民眾的透明說明。</p>
<h3>AI 產品與系統評測參考指引（數位發展部 AI 評測中心）</h3>
<p>數位部設立 <b>AI 產品與系統評測中心（AIEC）</b>，提供 AI 系統的評測項目與方法，涵蓋安全性、準確性、可靠與韌性、公平性、透明與可解釋性、隱私、資安、問責等面向，協助業者證明 AI 產品可信任。</p>
<h3>行政院及所屬機關（構）使用生成式 AI 參考指引（2023）</h3>
<ul>
  <li><strong>機密文件不得使用</strong>生成式 AI 製作；不得向生成式 AI 提供應保密資訊、個人資料或未經公開的資訊。</li>
  <li>生成內容須由業務承辦人<b>客觀且專業地最終判斷</b>，不能完全信任。</li>
  <li>使用生成式 AI 作為執行業務的輔助工具時，應適當<b>揭露</b>。</li>
</ul>` },
    { id: 'fsc', title: '金管會：金融業運用 AI 指引', html: `
<p>金融監督管理委員會 2024 年發布《金融業運用人工智慧（AI）指引》，提出<b>六大核心原則</b>，並要求以<b>風險為基礎</b>，依 AI 系統的風險高低採取對應的管理措施：</p>
<div class="table-wrap"><table>
<tr><th>原則</th><th>重點</th></tr>
<tr><td>1. 建立治理及問責機制</td><td>董事會與高階管理層負責，訂定 AI 政策與權責分工</td></tr>
<tr><td>2. 重視公平性及以人為本</td><td>避免演算法偏見與歧視，保留人類監督</td></tr>
<tr><td>3. 保護隱私及客戶權益</td><td>遵守個資法、資料最小化、客戶申訴管道</td></tr>
<tr><td>4. 確保系統穩健性與安全性</td><td>模型驗證、資安防護、持續監控</td></tr>
<tr><td>5. 落實透明性與可解釋性</td><td>對客戶揭露 AI 使用情形，能說明決策依據</td></tr>
<tr><td>6. 促進永續發展</td><td>AI 應用與 ESG 目標一致，關注員工轉型培訓</td></tr>
</table></div>
<p>指引也提到<b>第三方業者</b>（委外 AI 服務）的管理：金融機構仍須負最終責任，應進行盡職調查並於合約中約定責任。</p>` }
  ],
  keypoints: [
    '可信任 AI：公平、透明、可解釋、問責、隱私、安全穩健、人類監督',
    '歐盟 AI 法四級：不可接受（禁止）、高風險（嚴格義務）、有限風險（透明）、最小風險',
    '履歷篩選、信用評分屬高風險；聊天機器人屬有限風險；社會信用評分被禁止',
    'NIST AI RMF：Govern、Map、Measure、Manage',
    'ISO/IEC 42001 是可驗證的 AI 管理系統標準',
    '台灣人工智慧基本法 2025/12/23 三讀，七大原則',
    '政院生成式 AI 指引：機密文件不得使用、最終由人判斷',
    '金管會 AI 指引六大原則，以風險為基礎管理'
  ]
},
{
  id: 'c03', subject: 1, minutes: 50,
  title: '資料基本概念與處理流程',
  summary: 'L11201–L11202：大數據特性、資料型態與結構、資料來源與蒐集方法、資料清理、探索分析、特徵工程、標準化與正規化、資料視覺化。',
  sections: [
    { id: 'bigdata', title: '大數據與資料型態', html: `
<h3>大數據的 5V 特性</h3>
<div class="concepts">
  <div class="concept"><b>Volume 量</b><span>資料量龐大（TB、PB 等級）</span></div>
  <div class="concept"><b>Velocity 速度</b><span>產生與處理速度快，例如即時串流</span></div>
  <div class="concept"><b>Variety 多樣性</b><span>格式多元：表格、文字、圖片、影音</span></div>
  <div class="concept"><b>Veracity 真實性</b><span>資料品質與可信度</span></div>
  <div class="concept"><b>Value 價值</b><span>能從資料中萃取商業價值</span></div>
</div>
<h3>依結構分類</h3>
<div class="table-wrap"><table>
<tr><th>類型</th><th>特徵</th><th>例子</th></tr>
<tr><td><b>結構化資料</b></td><td>固定欄位、可放入表格或關聯式資料庫</td><td>Excel 表、交易紀錄、會員資料表</td></tr>
<tr><td><b>半結構化資料</b></td><td>有標籤或鍵值，但結構不固定</td><td><b>JSON、XML</b>、HTML、電子郵件標頭、日誌檔</td></tr>
<tr><td><b>非結構化資料</b></td><td>沒有固定格式，約占企業資料八成以上</td><td>文字文件、圖片、影片、音訊、社群貼文</td></tr>
</table></div>
<h3>依內容分類</h3>
<ul>
  <li><b>數值型資料（Numerical）</b>：<b>連續型</b>（身高、溫度）與<b>離散型</b>（人數、點擊次數）。</li>
  <li><b>類別型資料（Categorical）</b>：<b>名目</b>（顏色、縣市，無順序）與<b>順序</b>（滿意度高中低、學歷，有順序）。</li>
  <li><b>文字資料</b>、<b>圖像資料</b>、<b>音訊資料</b>、<b>時間序列資料</b>（股價、感測器數據）。</li>
</ul>` },
    { id: 'source', title: '資料來源與蒐集', html: `
<ul>
  <li><b>內部資料</b>：企業自有系統，如 ERP、CRM、POS 交易紀錄。</li>
  <li><b>外部資料</b>：政府開放資料、第三方資料、公開網站。</li>
  <li><b>一手資料</b>：自己蒐集，如問卷、實驗、感測器（IoT）。<b>二手資料</b>：他人已整理的資料。</li>
  <li><b>蒐集方法</b>：問卷調查、感測器、系統日誌、API 介接、網路爬蟲（需注意網站條款與著作權）。</li>
</ul>
<div class="box tip"><b class="t">資料標註</b>監督式學習需要<b>標註（Labeling / Annotation）</b>資料，例如在圖片上框出貓的位置。標註品質直接影響模型表現，常見做法是多人標註並交叉檢查。</div>` },
    { id: 'process', title: '資料處理與分析流程', html: `
<div class="flow">
  <div><b>1. 資料收集</b><span>確認需求與來源</span></div>
  <div><b>2. 資料清理</b><span>缺失值、離群值、重複、格式不一致</span></div>
  <div><b>3. 探索式分析 EDA</b><span>統計摘要、分布、相關性、視覺化</span></div>
  <div><b>4. 特徵工程</b><span>選擇、轉換、建立特徵</span></div>
  <div><b>5. 建模與分析</b><span>訓練模型、得到結果</span></div>
  <div><b>6. 呈現與溝通</b><span>圖表、儀表板、報告</span></div>
</div>
<h3>資料清理（Data Cleaning）</h3>
<div class="table-wrap"><table>
<tr><th>問題</th><th>處理方式</th></tr>
<tr><td><b>缺失值 Missing Value</b></td><td>刪除該筆或該欄；以平均數、中位數、眾數<b>填補（Imputation）</b>；以模型預測填補</td></tr>
<tr><td><b>離群值 Outlier</b></td><td>先確認是錯誤還是真實極端值；常用 <b>IQR</b>（超出 Q1−1.5×IQR 或 Q3+1.5×IQR）或 <b>Z-score</b>（絕對值大於 3）判斷</td></tr>
<tr><td><b>重複資料</b></td><td>去除重複</td></tr>
<tr><td><b>格式不一致</b></td><td>統一日期格式、單位、大小寫、類別名稱（如「台北」與「臺北」）</td></tr>
</table></div>
<h3>分析的四個層次</h3>
<p><b>描述性分析</b>（發生了什麼）→ <b>診斷性分析</b>（為什麼發生）→ <b>預測性分析</b>（將會發生什麼）→ <b>處方性分析</b>（應該怎麼做）。</p>` },
    { id: 'fe', title: '特徵工程與資料標準化', html: `
<p><b>特徵（Feature）</b>是模型用來判斷的輸入變數，例如預測房價時的坪數、屋齡、地段。<b>特徵工程（Feature Engineering）</b>是挑選、轉換或創造更有用的特徵，常比換模型更能提升效果。</p>
<ul>
  <li><b>特徵選擇</b>：移除無關或重複的特徵，減少雜訊與運算量。</li>
  <li><b>特徵建立</b>：例如從「生日」算出「年齡」、從「交易時間」取出「是否假日」。</li>
  <li><b>類別編碼</b>：<b>One-hot Encoding</b> 把「紅、綠、藍」轉成三個 0/1 欄位；<b>Label Encoding</b> 轉成 0、1、2（適合有順序的類別）。</li>
  <li><b>降維</b>：如 <b>PCA 主成分分析</b>，把多個特徵壓縮成較少的主成分。</li>
</ul>
<h3>正規化與標準化</h3>
<div class="table-wrap"><table>
<tr><th>方法</th><th>公式</th><th>結果</th><th>注意</th></tr>
<tr><td><b>Min-Max 正規化</b><br><small>Normalization</small></td><td class="mono">(x − min) / (max − min)</td><td>縮放到 0～1</td><td>容易受離群值影響</td></tr>
<tr><td><b>Z-score 標準化</b><br><small>Standardization</small></td><td class="mono">(x − μ) / σ</td><td>平均 0、標準差 1</td><td>較不受極端值影響，常用於 SVM、KNN 等以距離計算的模型</td></tr>
</table></div>
<p>目的是讓不同單位的特徵（如年收入數十萬、年齡數十）站在相同基準，避免數值大的特徵主導模型。可以到「互動練習」實際計算看看。</p>` }
  ],
  keypoints: [
    '大數據 5V：Volume、Velocity、Variety、Veracity、Value',
    'JSON、XML 是半結構化；文字、圖片、影音是非結構化',
    '類別資料分名目（無順序）與順序（有順序）',
    '流程：收集 → 清理 → EDA → 特徵工程 → 建模 → 呈現',
    '缺失值可刪除或填補；離群值常用 IQR 或 Z-score 判斷',
    'One-hot 編碼適合無順序類別',
    'Min-Max 縮放到 0～1；Z-score 轉為平均 0、標準差 1',
    '分析層次：描述性、診斷性、預測性、處方性'
  ]
},
{
  id: 'c04', subject: 1, minutes: 40,
  title: '資料隱私與安全',
  summary: 'L11203：個人資料保護法與 GDPR 原則、去識別化與匿名化、隱私強化技術、資料安全三要素，以及 AI 特有的資料風險。',
  sections: [
    { id: 'law', title: '個資保護法規', html: `
<h3>台灣個人資料保護法</h3>
<ul>
  <li><b>個人資料</b>：可直接或間接識別特定個人的資料，例如姓名、身分證字號、電話、生物特徵、病歷。</li>
  <li><b>特種個資</b>：病歷、醫療、基因、性生活、健康檢查、犯罪前科，原則上不得蒐集、處理或利用。</li>
  <li>蒐集時應<b>告知</b>當事人目的、類別、利用期間與方式；利用時應在<b>特定目的</b>範圍內。</li>
  <li>2023 年修法後設立<b>個人資料保護委員會</b>籌備處作為獨立監督機關。</li>
</ul>
<h3>歐盟 GDPR 的資料保護原則</h3>
<div class="table-wrap"><table>
<tr><th>原則</th><th>說明</th></tr>
<tr><td>合法、公平、透明</td><td>有合法依據，讓當事人知道資料如何被使用</td></tr>
<tr><td><b>目的限制</b></td><td>只能用於蒐集時告知的目的</td></tr>
<tr><td><b>資料最小化</b></td><td>只蒐集必要的資料</td></tr>
<tr><td>正確性</td><td>保持資料正確並即時更新</td></tr>
<tr><td>儲存限制</td><td>不再需要時應刪除</td></tr>
<tr><td>完整性與機密性</td><td>以適當的安全措施保護</td></tr>
</table></div>
<p>GDPR 也賦予當事人<b>被遺忘權</b>、資料可攜權，以及<b>不受僅基於自動化處理所做決定</b>的權利。</p>` },
    { id: 'deid', title: '去識別化與隱私強化技術', html: `
<div class="table-wrap"><table>
<tr><th>技術</th><th>說明</th></tr>
<tr><td><b>假名化 Pseudonymization</b></td><td>以代號取代識別資料，搭配對照表<strong>仍可還原</strong>，因此仍屬個資</td></tr>
<tr><td><b>匿名化 Anonymization</b></td><td>處理後<strong>無法再識別</strong>特定個人，不再屬於個資</td></tr>
<tr><td><b>資料遮罩 Masking</b></td><td>部分隱藏，例如 A12****789</td></tr>
<tr><td><b>泛化 Generalization</b></td><td>降低精確度，例如年齡 37 改為 30–39 歲</td></tr>
<tr><td><b>K-匿名 K-anonymity</b></td><td>每筆資料至少與 K−1 筆資料在識別欄位上無法區分</td></tr>
<tr><td><b>差分隱私 Differential Privacy</b></td><td>在統計結果中加入數學設計的雜訊，無法推知任何個人是否在資料中</td></tr>
<tr><td><b>聯邦學習 Federated Learning</b></td><td>資料留在各地端，只傳送模型參數集中彙整，<strong>原始資料不離開本地</strong></td></tr>
<tr><td><b>合成資料 Synthetic Data</b></td><td>以生成模型產生統計特性相似但非真實個人的資料</td></tr>
</table></div>
<div class="box warn"><b class="t">易混淆</b>假名化後仍可透過對照表還原，所以仍受個資法規範；匿名化才是真正無法識別。</div>` },
    { id: 'sec', title: '資料安全與 AI 資料風險', html: `
<h3>資料安全三要素（CIA）</h3>
<div class="concepts">
  <div class="concept"><b>機密性 Confidentiality</b><span>只有授權者能存取：加密、存取控制</span></div>
  <div class="concept"><b>完整性 Integrity</b><span>資料未遭竄改：雜湊、版本控管、稽核紀錄</span></div>
  <div class="concept"><b>可用性 Availability</b><span>需要時能取得：備份、備援</span></div>
</div>
<h3>AI 特有的資料風險</h3>
<ul>
  <li><b>資料投毒（Data Poisoning）</b>：在訓練資料中摻入惡意資料，讓模型學錯或植入後門。</li>
  <li><b>訓練資料外洩</b>：模型可能「記住」並吐出訓練資料中的個資。</li>
  <li><b>成員推論攻擊（Membership Inference）</b>：推測某人的資料是否被用於訓練。</li>
  <li><b>員工把機敏資料貼進公開 AI 工具</b>：資料可能被服務商保留或用於訓練。應使用企業版、關閉訓練選項並訂定使用政策。</li>
</ul>
<div class="box tip"><b class="t">實務檢查</b>把資料丟進 AI 工具前，先問：資料有無個資或機密？是否取得授權？服務商會不會保留或拿去訓練？資料存放在哪個國家？</div>` }
  ],
  keypoints: [
    '特種個資（病歷、基因、犯罪前科等）原則上不得蒐集',
    'GDPR 原則：目的限制、資料最小化、儲存限制等',
    '假名化可還原仍屬個資；匿名化無法識別',
    '差分隱私加入雜訊；聯邦學習讓原始資料不離開本地',
    '資料安全三要素：機密性、完整性、可用性',
    '資料投毒污染訓練資料；機敏資料不應貼進公開 AI 工具'
  ]
},
{
  id: 'c05', subject: 1, minutes: 60,
  title: '機器學習基本原理與常見模型',
  summary: 'L11301–L11302：機器學習的目的與訓練流程、資料切分、泛化與過擬合、四種學習類型、常見模型、深度學習與多模態學習、評估指標。',
  sections: [
    { id: 'principle', title: '機器學習基本原理', html: `
<p><b>機器學習（Machine Learning）</b>是讓電腦從資料中找出規律（模型），再用模型對新資料進行預測或判斷。傳統程式是「規則 + 資料 → 答案」；機器學習則是「資料 + 答案 → 規則」。</p>
<div class="flow">
  <div><b>定義問題</b><span>分類？迴歸？分群？</span></div>
  <div><b>準備資料</b><span>收集、清理、特徵工程</span></div>
  <div><b>切分資料</b><span>訓練、驗證、測試</span></div>
  <div><b>訓練模型</b><span>最小化損失函數</span></div>
  <div><b>評估調整</b><span>用驗證集調整超參數</span></div>
  <div><b>測試部署</b><span>用測試集確認最終表現</span></div>
</div>
<h3>資料切分</h3>
<div class="table-wrap"><table>
<tr><th>資料集</th><th>用途</th><th>常見比例</th></tr>
<tr><td><b>訓練集 Training Set</b></td><td>讓模型學習參數</td><td>60～80%</td></tr>
<tr><td><b>驗證集 Validation Set</b></td><td>調整超參數、挑選模型</td><td>10～20%</td></tr>
<tr><td><b>測試集 Test Set</b></td><td><strong>最後才用</strong>，評估模型對未見資料的表現</td><td>10～20%</td></tr>
</table></div>
<p><b>參數（Parameter）</b>由模型從資料學到，例如迴歸的權重；<b>超參數（Hyperparameter）</b>由人在訓練前設定，例如學習率、樹的深度、K 值。</p>` },
    { id: 'fit', title: '泛化、過擬合與欠擬合', html: `
<p><b>泛化（Generalization）</b>是模型對沒看過的新資料仍能表現良好的能力，這才是機器學習的真正目標。</p>
<div class="table-wrap"><table>
<tr><th>狀況</th><th>訓練表現</th><th>測試表現</th><th>原因</th><th>改善方法</th></tr>
<tr><td><b>欠擬合 Underfitting</b></td><td>差</td><td>差</td><td>模型太簡單、特徵不足</td><td>用更複雜的模型、增加特徵、訓練更久</td></tr>
<tr><td><b>過擬合 Overfitting</b></td><td><b>很好</b></td><td><b>差</b></td><td>模型太複雜、資料太少，把雜訊也背下來</td><td>增加資料、<b>正則化</b>、簡化模型、<b>交叉驗證</b>、提前停止、Dropout、資料擴增</td></tr>
<tr><td>適當擬合</td><td>好</td><td>好</td><td colspan="2">理想狀態</td></tr>
</table></div>
<div class="box analogy"><b class="t">生活比喻</b>過擬合就像學生只背考古題答案，遇到改過數字的新題目就不會；欠擬合則是連考古題都沒讀懂。</div>
<p><b>偏差與變異的權衡（Bias-Variance Tradeoff）</b>：高偏差對應欠擬合，高變異對應過擬合，好模型要在兩者之間取得平衡。</p>
<p><b>交叉驗證（K-fold Cross Validation）</b>：把資料分成 K 份，輪流用其中一份驗證、其餘訓練，取平均結果，評估更穩定。</p>` },
    { id: 'types', title: '四種學習類型', html: `
<div class="table-wrap"><table>
<tr><th>類型</th><th>資料</th><th>任務</th><th>例子</th></tr>
<tr><td><b>監督式學習</b><br><small>Supervised</small></td><td>有標籤（有正確答案）</td><td><b>分類</b>（預測類別）、<b>迴歸</b>（預測數值）</td><td>垃圾郵件判斷、房價預測、瑕疵檢測</td></tr>
<tr><td><b>非監督式學習</b><br><small>Unsupervised</small></td><td>無標籤</td><td><b>分群</b>、降維、關聯規則、異常偵測</td><td>客戶分群、購物籃分析</td></tr>
<tr><td><b>半監督式學習</b><br><small>Semi-supervised</small></td><td>少量有標籤 + 大量無標籤</td><td>標註成本高時</td><td>醫學影像（標註需專家）</td></tr>
<tr><td><b>強化式學習</b><br><small>Reinforcement</small></td><td>無固定答案，與環境互動獲得<b>獎勵</b></td><td>學習最佳策略</td><td>AlphaGo、機器人控制、自動駕駛</td></tr>
</table></div>
<p><b>自監督式學習（Self-supervised）</b>：從資料本身產生標籤，例如遮住句子中的字讓模型猜，是大型語言模型預訓練的主要方式。</p>
<div class="box exam"><b class="t">考點提示</b>分辨「分類」與「迴歸」：預測結果是<b>類別</b>（是否違約、哪一種花）就是分類；預測結果是<b>連續數值</b>（明天氣溫、銷售額）就是迴歸。</div>` },
    { id: 'models', title: '常見模型', html: `
<div class="table-wrap"><table>
<tr><th>模型</th><th>類型</th><th>特點</th></tr>
<tr><td><b>線性迴歸</b></td><td>迴歸</td><td>找出最適合的直線預測數值，簡單、易解釋</td></tr>
<tr><td><b>邏輯迴歸</b></td><td><strong>分類</strong></td><td>名稱有迴歸但用於分類，輸出機率</td></tr>
<tr><td><b>決策樹</b></td><td>分類／迴歸</td><td>像流程圖一樣逐步判斷，<b>可解釋性高</b>，但容易過擬合</td></tr>
<tr><td><b>隨機森林</b></td><td>分類／迴歸</td><td>多棵決策樹投票（整合學習 Bagging），較穩定</td></tr>
<tr><td><b>支援向量機 SVM</b></td><td>分類</td><td>找出最大間隔的分界線，可用核函數處理非線性</td></tr>
<tr><td><b>K 近鄰 KNN</b></td><td>分類</td><td>看最近的 K 個鄰居是哪一類</td></tr>
<tr><td><b>單純貝氏 Naive Bayes</b></td><td>分類</td><td>以機率計算，常用於文字分類與垃圾郵件</td></tr>
<tr><td><b>K-means</b></td><td>分群（非監督）</td><td>把資料分成 K 群，需事先指定 K</td></tr>
<tr><td><b>PCA</b></td><td>降維（非監督）</td><td>保留最多資訊的方向，減少特徵數</td></tr>
</table></div>
<h3>深度學習與多模態學習</h3>
<ul>
  <li><b>類神經網路（Neural Network）</b>：由輸入層、隱藏層、輸出層組成；隱藏層很多就稱為<b>深度學習</b>。能自動學習特徵，但需要大量資料與算力，可解釋性較低。</li>
  <li><b>CNN 卷積神經網路</b>：擅長影像。<b>RNN／LSTM</b>：擅長序列資料。<b>Transformer</b>：以注意力機制處理文字，是 LLM 的基礎。</li>
  <li><b>多模態學習（Multimodal Learning）</b>：同時處理文字、圖片、聲音等多種資料，例如看圖回答問題。</li>
  <li><b>遷移學習（Transfer Learning）</b>：把已訓練好的模型用在新任務上，只需少量資料微調。</li>
</ul>` },
    { id: 'metrics', title: '模型評估指標', html: `
<h3>分類：混淆矩陣</h3>
<div class="table-wrap"><table>
<tr><th></th><th>預測為正</th><th>預測為負</th></tr>
<tr><th>實際為正</th><td><b>TP</b> 真陽性</td><td><b>FN</b> 偽陰性（漏抓）</td></tr>
<tr><th>實際為負</th><td><b>FP</b> 偽陽性（誤報）</td><td><b>TN</b> 真陰性</td></tr>
</table></div>
<ul>
  <li><b>準確率 Accuracy</b> = (TP+TN) / 全部。資料不平衡時會失真。</li>
  <li><b>精確率 Precision</b> = TP / (TP+FP)：預測為正的有多少真的是正。誤報代價高時重視。</li>
  <li><b>召回率 Recall</b> = TP / (TP+FN)：真正的正例抓到多少。<strong>漏抓代價高時重視</strong>，例如疾病篩檢、詐欺偵測。</li>
  <li><b>F1 分數</b>：精確率與召回率的調和平均。</li>
</ul>
<h3>迴歸</h3>
<p><b>MAE</b> 平均絕對誤差、<b>MSE</b> 均方誤差、<b>RMSE</b> 均方根誤差（越小越好）、<b>R²</b> 決定係數（越接近 1 越好）。</p>
<p>可以到「互動練習」用<b>混淆矩陣計算器</b>試算。</p>` }
  ],
  keypoints: [
    '機器學習：從資料與答案中學出規則',
    '訓練集學參數、驗證集調超參數、測試集最後評估',
    '過擬合：訓練好測試差；改善：更多資料、正則化、交叉驗證、Dropout',
    '監督式有標籤（分類、迴歸）；非監督式無標籤（分群、降維）；強化式靠獎勵',
    '邏輯迴歸用於分類；決策樹可解釋性高；K-means 是分群',
    'CNN 處理影像、RNN 處理序列、Transformer 是 LLM 基礎',
    '漏抓代價高重視召回率；誤報代價高重視精確率'
  ]
},
{
  id: 'c06', subject: 1, minutes: 50,
  title: '鑑別式 AI 與生成式 AI',
  summary: 'L11401–L11402：鑑別式與生成式 AI 的原理與差異、GAN、VAE、擴散模型、大型語言模型、測試驗證與部署效能管理、兩者的整合應用。',
  sections: [
    { id: 'diff', title: '鑑別式與生成式的差異', html: `
<div class="table-wrap"><table>
<tr><th></th><th>鑑別式 AI（Discriminative）</th><th>生成式 AI（Generative）</th></tr>
<tr><td>目標</td><td>區分、判斷、預測</td><td>產生新的內容</td></tr>
<tr><td>學習內容</td><td>條件機率 <b>P(y|x)</b>：給定輸入，判斷屬於哪一類</td><td>資料分布 <b>P(x)</b> 或 P(x, y)：學習資料長什麼樣子</td></tr>
<tr><td>輸出</td><td>標籤、分數、機率</td><td>文字、圖片、聲音、影片、程式碼</td></tr>
<tr><td>模型例子</td><td>邏輯迴歸、SVM、決策樹、CNN 分類器、BERT 分類</td><td>GAN、VAE、擴散模型、GPT 等 LLM</td></tr>
<tr><td>應用</td><td>垃圾郵件過濾、人臉辨識、詐欺偵測、瑕疵檢測</td><td>文案撰寫、圖片生成、語音合成、程式碼生成</td></tr>
</table></div>
<div class="box warn"><b class="t">易錯</b><b>單純貝氏（Naive Bayes）</b>雖然常用於分類，但它學的是聯合機率，在理論分類上屬於<b>生成式模型</b>。題目若問模型的本質分類要注意。</div>` },
    { id: 'gen', title: '常見生成式模型', html: `
<div class="table-wrap"><table>
<tr><th>模型</th><th>原理</th><th>代表應用</th></tr>
<tr><td><b>GAN 生成對抗網路</b></td><td><b>生成器（Generator）</b>產生假資料，<b>判別器（Discriminator）</b>判斷真假，兩者互相競爭進步</td><td>人臉生成、深偽、風格轉換</td></tr>
<tr><td><b>VAE 變分自編碼器</b></td><td>編碼器把資料壓縮成潛在空間（Latent Space），解碼器再還原並產生變化</td><td>影像生成、異常偵測</td></tr>
<tr><td><b>擴散模型 Diffusion Model</b></td><td>學習把加滿雜訊的圖片<b>逐步去噪</b>還原</td><td>Stable Diffusion、Midjourney、DALL·E</td></tr>
<tr><td><b>Transformer／LLM</b></td><td>以注意力機制，根據前文<b>預測下一個詞元（Token）</b></td><td>ChatGPT、Gemini、Claude</td></tr>
</table></div>
<h3>大型語言模型（LLM）的關鍵概念</h3>
<ul>
  <li><b>詞元（Token）</b>：模型處理文字的基本單位，計費與長度限制都以 Token 計算。</li>
  <li><b>上下文視窗（Context Window）</b>：模型一次能處理的 Token 上限。</li>
  <li><b>訓練三階段</b>：<b>預訓練</b>（大量文字學習語言）→ <b>指令微調</b>（學習遵循指令）→ <b>人類回饋強化學習（RLHF）</b>（對齊人類偏好）。</li>
  <li><b>幻覺（Hallucination）</b>：模型產生看似合理但錯誤或捏造的內容，是生成式 AI 的主要風險。</li>
  <li><b>基礎模型（Foundation Model）</b>：以大量資料預訓練、可應用於多種下游任務的模型。</li>
</ul>` },
    { id: 'deploy', title: '測試驗證與部署管理', html: `
<ul>
  <li><b>測試與驗證</b>：鑑別式 AI 用準確率、F1 等指標；生成式 AI 較難量化，常用人工評估、基準測試（Benchmark）、以 AI 評分，並檢查事實正確性、安全性與偏見。</li>
  <li><b>部署方式</b>：雲端 API、地端部署（On-premise，資料不外流）、邊緣運算（Edge AI，在裝置上即時推論）。</li>
  <li><b>效能管理</b>：監控回應時間、正確率、成本；注意<b>資料漂移（Data Drift）</b>，即上線後資料特性改變導致模型效果下降，需定期重新訓練。</li>
</ul>` },
    { id: 'combo', title: '鑑別式與生成式的整合應用', html: `
<div class="table-wrap"><table>
<tr><th>情境</th><th>整合方式</th></tr>
<tr><td>瑕疵檢測資料不足</td><td>用生成式 AI 產生<b>合成瑕疵圖片</b>（資料擴增），再訓練鑑別式模型</td></tr>
<tr><td>智慧客服</td><td>鑑別式模型判斷<b>意圖分類</b>，生成式模型產生回覆</td></tr>
<tr><td>內容審核</td><td>生成式 AI 產生內容後，用鑑別式模型偵測不當內容或深偽</td></tr>
<tr><td>語音助理</td><td>語音辨識（鑑別）→ 理解意圖 → 生成回覆 → 語音合成（生成）</td></tr>
<tr><td>醫療影像</td><td>鑑別式模型標出病灶，生成式模型撰寫報告草稿供醫師確認</td></tr>
</table></div>` }
  ],
  keypoints: [
    '鑑別式學 P(y|x) 做判斷；生成式學資料分布產生新內容',
    'GAN：生成器與判別器對抗；VAE：編碼到潛在空間；擴散模型：逐步去噪',
    'LLM 以 Transformer 預測下一個 Token',
    'LLM 訓練：預訓練 → 指令微調 → RLHF',
    '幻覺是生成式 AI 產生看似合理但錯誤的內容',
    '資料漂移會讓上線模型效果下降，需持續監控',
    '整合應用：生成式做資料擴增、鑑別式做分類判斷'
  ]
}
);
