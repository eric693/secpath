/* AWS Cloud Practitioner 第一部分：雲端概念與安全合規（Domain 1–2） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 40,
  title: '雲端運算基本概念',
  summary: 'Domain 1.1–1.3：認識 CLF-C02 考試、雲端運算的定義、六大優勢、服務模型（IaaS／PaaS／SaaS）、部署模型與雲端經濟學。',
  sections: [
    { id: 'exam', title: '認識 Cloud Practitioner 考試', html: `
<p>AWS Certified Cloud Practitioner 是 AWS 最入門的證照，不需要寫程式，也不需要工作經驗，適合業務、PM、行政、剛轉職的工程師，以及準備往 Solutions Architect Associate 前進的人。台灣雲端職缺、雲端代理商與外商都很常看到這張證照。考試<strong>可以選繁體中文</strong>，但題目裡的服務名稱仍是英文，所以本課程的服務名稱都保留英文原文。</p>
<table>
<tr><th>領域</th><th>英文名稱</th><th>配分</th><th>本課程章節</th></tr>
<tr><td>Domain 1</td><td>Cloud Concepts</td><td>24%</td><td>第 1～2 章</td></tr>
<tr><td>Domain 2</td><td>Security and Compliance</td><td><b>30%</b></td><td>第 3～5 章</td></tr>
<tr><td>Domain 3</td><td>Cloud Technology and Services</td><td><b>34%</b></td><td>第 6～9 章</td></tr>
<tr><td>Domain 4</td><td>Billing, Pricing, and Support</td><td>12%</td><td>第 10 章</td></tr>
</table>
<div class="box exam"><b class="t">考試形式</b>65 題、90 分鐘，其中 15 題是不計分的測試題，但你無法分辨是哪幾題，所以每題都要認真作答。採量尺計分，700 分（滿分 1,000）通過。題型有單選題（4 選 1）和複選題（5 選 2 以上，題目會註明要選幾個）。<b>答錯不倒扣</b>，所以每題都要作答。</div>
<div class="box tip"><b class="t">讀書策略</b>CLF 的題目大多是「情境 → 選出對的服務」。與其背每個服務的細節，不如記住每個服務「解決什麼問題」。本課程每章都會整理「看到什麼關鍵字就選什麼服務」。</div>` },
    { id: 'define', title: '什麼是雲端運算', html: `
<p><b>雲端運算（Cloud Computing）</b>是透過網際網路，<strong>隨需（On-demand）</strong>取得運算、儲存、資料庫、網路等 IT 資源，並<strong>依用量付費（Pay-as-you-go）</strong>。你不需要自己買伺服器、蓋機房，需要時幾分鐘就能開好，不用時隨時關掉。</p>
<div class="box analogy"><b class="t">生活比喻</b>自建機房像「買車」：要先花一大筆錢，還要自己保養、繳稅，車子閒置也照樣折舊。雲端像「叫計程車或租車」：要用才付錢，車子保養是車行的事。</div>
<h3>傳統機房 vs 雲端</h3>
<table>
<tr><th>比較</th><th>傳統自建機房（On-premises）</th><th>雲端（Cloud）</th></tr>
<tr><td>成本性質</td><td>資本支出 <b>CapEx</b>：先買設備</td><td>營運支出 <b>OpEx</b>：按月按量付費</td></tr>
<tr><td>容量規劃</td><td>要預估尖峰，常買太多或不夠</td><td>隨需求自動擴展或縮減</td></tr>
<tr><td>上線速度</td><td>採購、安裝要數週到數月</td><td>幾分鐘內開好資源</td></tr>
<tr><td>維運</td><td>自己管電力、空調、硬體更換</td><td>實體設施由雲端供應商負責</td></tr>
<tr><td>全球布署</td><td>要在海外租機房</td><td>選擇其他區域即可</td></tr>
</table>
<div class="box warn"><b class="t">易混淆</b>雲端把 CapEx 轉成 OpEx，不代表「一定比較便宜」。架構沒有最佳化、資源忘了關，雲端帳單一樣會很可觀，所以第 10 章的成本管理工具也是考試重點。</div>` },
    { id: 'benefits', title: '雲端的六大優勢', html: `
<p>AWS 官方白皮書列出雲端運算的六大優勢（Six advantages of cloud computing），是 Domain 1 最常考的觀念，題目常給一段描述，問屬於哪一項。</p>
<table>
<tr><th>優勢</th><th>英文</th><th>白話說明</th></tr>
<tr><td><b>變動成本取代固定成本</b></td><td>Trade fixed expense for variable expense</td><td>不用先買機房設備，用多少付多少</td></tr>
<tr><td><b>享受大規模經濟</b></td><td>Benefit from massive economies of scale</td><td>AWS 客戶數量龐大，採購成本低，價格可以更便宜</td></tr>
<tr><td><b>不用再猜容量</b></td><td>Stop guessing capacity</td><td>不用預估尖峰流量，可隨需求擴展或縮減</td></tr>
<tr><td><b>提升速度與敏捷性</b></td><td>Increase speed and agility</td><td>幾分鐘就能取得資源，實驗與創新成本降低</td></tr>
<tr><td><b>不用花錢維運資料中心</b></td><td>Stop spending money running and maintaining data centers</td><td>把人力放在產品與客戶，而不是堆機櫃、換硬碟</td></tr>
<tr><td><b>幾分鐘內走向全球</b></td><td>Go global in minutes</td><td>在全球多個區域部署，讓各地使用者低延遲存取</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>變・規・猜・速・機・球</b>」——變動成本、規模經濟、不用猜容量、速度敏捷、不維運機房、走向全球。</div>
<h3>其他常考名詞</h3>
<div class="concepts">
  <div class="concept"><b>彈性 Elasticity</b><span>依需求<strong>自動</strong>增加或減少資源，例如流量高峰時自動加開伺服器、離峰時關掉。</span></div>
  <div class="concept"><b>擴展性 Scalability</b><span>系統能透過增加資源來承受更多負載。垂直擴展（Scale up）換更大的機器；水平擴展（Scale out）加更多台機器。</span></div>
  <div class="concept"><b>高可用性 High Availability</b><span>系統在部分元件故障時仍能持續服務，通常靠多個可用區域（AZ）部署。</span></div>
  <div class="concept"><b>容錯 Fault Tolerance</b><span>元件故障時服務<strong>完全不中斷</strong>，要求比高可用性更高。</span></div>
  <div class="concept"><b>敏捷性 Agility</b><span>快速取得資源、快速實驗、快速失敗再修正。</span></div>
  <div class="concept"><b>災難復原 Disaster Recovery</b><span>在其他區域保留備份或備援環境，災難發生時恢復服務。</span></div>
</div>` },
    { id: 'models', title: '服務模型與部署模型', html: `
<h3>三種服務模型</h3>
<p>服務模型的差別在於<strong>客戶要自己管理到哪一層</strong>。越往 SaaS，客戶要管的越少。</p>
<table>
<tr><th>模型</th><th>客戶負責</th><th>AWS 例子</th><th>一般例子</th></tr>
<tr><td><b>IaaS</b> 基礎設施即服務</td><td>作業系統、中介軟體、應用程式、資料</td><td>Amazon EC2、Amazon VPC、Amazon EBS</td><td>租一台虛擬機</td></tr>
<tr><td><b>PaaS</b> 平台即服務</td><td>應用程式程式碼與資料</td><td>AWS Elastic Beanstalk、Amazon RDS</td><td>只上傳程式，平台幫你執行</td></tr>
<tr><td><b>SaaS</b> 軟體即服務</td><td>使用方式與自己的資料</td><td>Amazon WorkMail、Amazon Chime、Amazon Connect</td><td>Gmail、Microsoft 365</td></tr>
</table>
<div class="box analogy"><b class="t">生活比喻</b>IaaS 像租空房子，家具裝潢自己來；PaaS 像租附家具的套房，你只要帶行李入住；SaaS 像住飯店，連打掃都有人做。</div>
<h3>三種部署模型</h3>
<div class="concepts">
  <div class="concept"><b>雲端 Cloud（All-in）</b><span>應用程式全部部署在雲端，包含直接在雲端開發的新系統與從機房遷移上來的系統。</span></div>
  <div class="concept"><b>混合雲 Hybrid</b><span>雲端與地端機房連線，部分系統留在機房（例如法規要求），部分放雲端。常用 AWS Direct Connect、Site-to-Site VPN、AWS Outposts、Storage Gateway。</span></div>
  <div class="concept"><b>地端／私有雲 On-premises</b><span>在自家機房以虛擬化技術提供資源，也稱私有雲。</span></div>
</div>
<div class="box exam"><b class="t">考點</b>「公司有部分資料因法規必須留在台灣自家機房，其餘系統放到 AWS」→ <b>混合雲</b>。「想在自家機房使用與 AWS 相同的 API 與服務」→ <b>AWS Outposts</b>。</div>` },
    { id: 'economics', title: '雲端經濟學', html: `
<p>Domain 1.4 考雲端經濟學（Cloud Economics），重點是搬到雲端後「哪些成本會消失、哪些仍然存在」。</p>
<table>
<tr><th>成本類型</th><th>例子</th><th>搬到雲端後</th></tr>
<tr><td>固定成本 Fixed</td><td>機房租金、伺服器採購、網路設備</td><td>大幅減少，改為變動成本</td></tr>
<tr><td>變動成本 Variable</td><td>運算時數、儲存容量、資料傳輸量</td><td>依實際用量付費</td></tr>
<tr><td>人力成本 Labor</td><td>硬體維護、機房管理人員</td><td>可轉去做更有價值的工作</td></tr>
<tr><td>授權成本 Licensing</td><td>Windows Server、Oracle、SQL Server</td><td>可使用 AWS 內含授權，或自帶授權 <b>BYOL</b></td></tr>
</table>
<ul>
  <li><b>精確配置（Rightsizing）</b>：依實際用量選擇合適的資源大小，避免浪費。</li>
  <li><b>自動化（Automation）</b>：用 AWS CloudFormation 等工具自動建立環境，降低人為錯誤與人力成本。</li>
  <li><b>託管服務（Managed Services）</b>：例如 Amazon RDS 幫你處理資料庫修補與備份，降低維運負擔。</li>
  <li><b>總體擁有成本（TCO, Total Cost of Ownership）</b>：比較地端與雲端時，要把電費、空調、人力、硬體汰換等隱藏成本都算進去。</li>
</ul>
<div class="box warn"><b class="t">易混淆</b>BYOL（Bring Your Own License）是把既有的軟體授權帶到雲端使用。若授權綁定實體伺服器核心數，可能需要 <b>Dedicated Host</b>（第 10 章）。</div>` }
  ],
  keypoints: [
    'CLF-C02：65 題 90 分鐘、700 分通過，可選繁體中文應考',
    '雲端運算：隨需取得資源、依用量付費，CapEx 轉為 OpEx',
    '六大優勢：變動成本、規模經濟、不用猜容量、速度敏捷、不維運機房、全球部署',
    '彈性是自動增減資源；擴展分垂直（換大台）與水平（加台數）',
    'IaaS 管 OS 以上（EC2）；PaaS 只管程式（Elastic Beanstalk）；SaaS 只管使用',
    '部署模型：雲端、混合雲、地端；混合雲常用 Direct Connect、VPN、Outposts',
    'TCO 要把電力、空調、人力、硬體汰換等隱藏成本都算進去'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: 'AWS 全球基礎設施與架構框架',
  summary: 'Domain 1.1–1.3：區域、可用區域、節點位置、Local Zones 與 Outposts；Well-Architected 六大支柱、Cloud Adoption Framework 與遷移 7R 策略。',
  sections: [
    { id: 'global', title: '區域、可用區域與節點位置', html: `
<p>AWS 的全球基礎設施（Global Infrastructure）由多個層級組成，是考試必考題。</p>
<div class="concepts">
  <div class="concept"><b>區域 Region</b><span>一個地理區域，例如東京 ap-northeast-1、新加坡 ap-southeast-1。每個區域彼此獨立，資料<strong>不會自動</strong>複製到其他區域。</span></div>
  <div class="concept"><b>可用區域 Availability Zone（AZ）</b><span>區域內一個或多個獨立的資料中心，有獨立電力、網路與冷卻。一般區域至少有 3 個 AZ，AZ 之間以低延遲高速網路連接。</span></div>
  <div class="concept"><b>節點位置 Edge Location</b><span>分布在全球數百個城市的據點，供 Amazon CloudFront（CDN）、Route 53（DNS）快取內容，讓使用者就近存取。</span></div>
  <div class="concept"><b>區域節點快取 Regional Edge Cache</b><span>介於節點位置與來源之間的較大型快取，存放較不熱門的內容。</span></div>
</div>
<div class="box exam"><b class="t">選擇區域的四個考量</b>①<b>法規與資料落地</b>（Compliance / Data governance），例如資料必須存放在特定國家；②<b>與使用者的距離</b>（Latency）；③<b>服務是否在該區域提供</b>（Service availability）；④<b>價格</b>（Pricing，不同區域價格不同）。</div>
<div class="box tip"><b class="t">台灣相關</b>AWS 已在 2025 年開放亞太（台北）區域，台北也有 Local Zone。對有資料落地需求的金融、醫療、公部門客戶，這是選擇區域時的重要考量。最新區域清單請以 AWS 官網為準。</div>
<h3>高可用設計原則</h3>
<p>把應用程式部署在<strong>同一區域的多個 AZ</strong>，單一資料中心故障時服務仍能運作，這是最基本的高可用設計。若要防範整個區域的災難，再進一步做<strong>跨區域</strong>備援。</p>
<div class="box warn"><b class="t">易混淆</b>多 AZ 是為了<b>高可用性</b>；多區域是為了<b>災難復原</b>與<b>全球低延遲</b>。題目問「最具成本效益的高可用做法」，通常選多 AZ 而不是多區域。</div>` },
    { id: 'edge', title: 'Local Zones、Wavelength 與 Outposts', html: `
<table>
<tr><th>服務</th><th>是什麼</th><th>適用情境</th></tr>
<tr><td><b>AWS Local Zones</b></td><td>把運算、儲存放到大城市附近，延伸自某個區域</td><td>需要個位數毫秒延遲的影音剪輯、遊戲、即時運算</td></tr>
<tr><td><b>AWS Wavelength</b></td><td>把 AWS 運算放進電信業者的 5G 網路</td><td>行動裝置超低延遲應用，例如車聯網、AR/VR</td></tr>
<tr><td><b>AWS Outposts</b></td><td>AWS 把機櫃硬體裝進<strong>客戶自己的機房</strong></td><td>資料必須留在地端，但想使用 AWS 的服務與 API</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>Local 靠城市、Wavelength 靠 5G、Outposts 進你家</b>」。</div>` },
    { id: 'waf', title: 'Well-Architected Framework 六大支柱', html: `
<p><b>AWS Well-Architected Framework</b> 是 AWS 整理的雲端架構最佳實務，用六大支柱（Pillars）檢視架構。可以用免費的 <b>AWS Well-Architected Tool</b> 回答問卷，自我評估架構風險。</p>
<table>
<tr><th>支柱</th><th>英文</th><th>重點與關鍵字</th></tr>
<tr><td><b>卓越營運</b></td><td>Operational Excellence</td><td>用程式碼執行營運（IaC）、小幅頻繁可回復的變更、從失敗中學習</td></tr>
<tr><td><b>安全</b></td><td>Security</td><td>強化身分基礎（最小權限）、啟用追蹤、各層都要防護、保護傳輸中與靜態資料</td></tr>
<tr><td><b>可靠性</b></td><td>Reliability</td><td>自動從故障恢復、水平擴展、不要猜容量、測試復原程序</td></tr>
<tr><td><b>效能效率</b></td><td>Performance Efficiency</td><td>使用先進技術、幾分鐘走向全球、使用無伺服器架構、多做實驗</td></tr>
<tr><td><b>成本最佳化</b></td><td>Cost Optimization</td><td>採用用量計費模式、衡量整體效率、停止在無差異化工作上花錢</td></tr>
<tr><td><b>永續性</b></td><td>Sustainability</td><td>減少資源浪費、提高使用率、選擇碳排放較低的區域與服務</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>營・安・靠・效・成・永</b>」——營運、安全、可靠、效能、成本、永續。2021 年才新增永續性，所以舊資料會寫「五大支柱」。</div>
<div class="box exam"><b class="t">考點</b>「系統能自動從故障中恢復」→ 可靠性；「依需求選擇合適的執行個體類型」→ 效能效率；「關掉沒在用的資源」→ 成本最佳化；「用 CloudFormation 自動部署」→ 卓越營運。</div>` },
    { id: 'caf', title: 'Cloud Adoption Framework（CAF）', html: `
<p><b>AWS Cloud Adoption Framework（AWS CAF）</b>幫助組織規劃數位轉型與上雲，把要準備的能力分成六個<b>視角（Perspectives）</b>。</p>
<table>
<tr><th>視角</th><th>關注對象</th><th>重點</th></tr>
<tr><td><b>業務 Business</b></td><td>CEO、CFO、業務主管</td><td>確保雲端投資帶來商業成果</td></tr>
<tr><td><b>人員 People</b></td><td>人資、主管</td><td>組織文化、人才培訓、職能轉型</td></tr>
<tr><td><b>治理 Governance</b></td><td>CIO、風險管理</td><td>專案管理、風險管理、成本控管</td></tr>
<tr><td><b>平台 Platform</b></td><td>CTO、架構師</td><td>建構可擴展的雲端平台與架構</td></tr>
<tr><td><b>安全 Security</b></td><td>CISO、資安人員</td><td>資料保護、身分管理、威脅偵測</td></tr>
<tr><td><b>營運 Operations</b></td><td>IT 維運主管</td><td>監控、事件管理、確保服務水準</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>前三個「<b>業・人・治</b>」偏業務能力；後三個「<b>平・安・營</b>」偏技術能力。</div>
<p>CAF 的轉型分四個<b>階段</b>：<b>Envision</b>（構想）→ <b>Align</b>（對齊）→ <b>Launch</b>（啟動）→ <b>Scale</b>（擴展）。帶來的效益包括降低業務風險、提升 ESG 表現、增加營收、提升營運效率。</p>` },
    { id: 'migrate', title: '遷移策略 7R', html: `
<p>把既有系統搬到雲端時，每個系統可以採用不同的遷移策略。</p>
<table>
<tr><th>策略</th><th>說明</th><th>例子</th></tr>
<tr><td><b>Retire</b> 汰除</td><td>不再需要的系統直接關掉</td><td>沒人用的舊報表系統</td></tr>
<tr><td><b>Retain</b> 保留</td><td>暫時留在地端</td><td>剛升級完、或法規限制的系統</td></tr>
<tr><td><b>Rehost</b> 重新託管</td><td>原封不動搬上 EC2，俗稱 <b>Lift and Shift</b></td><td>用 AWS Application Migration Service 搬 VM</td></tr>
<tr><td><b>Relocate</b> 重新定位</td><td>把整個虛擬化平台搬上雲</td><td>VMware Cloud on AWS</td></tr>
<tr><td><b>Repurchase</b> 重新購買</td><td>改用 SaaS 產品</td><td>自建 CRM 改用 Salesforce</td></tr>
<tr><td><b>Replatform</b> 平台調整</td><td>小幅調整以使用託管服務，俗稱 Lift, Tinker and Shift</td><td>自管 MySQL 改用 Amazon RDS</td></tr>
<tr><td><b>Refactor</b> 重構</td><td>重新設計成雲端原生架構，成本最高但效益最大</td><td>單體應用改寫成 Lambda 微服務</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「最快完成遷移、不修改程式」→ <b>Rehost</b>；「資料庫改用 RDS，但程式不大改」→ <b>Replatform</b>；「改寫為無伺服器架構以獲得最大彈性」→ <b>Refactor</b>。</div>
<h3>大量資料遷移</h3>
<p>網路頻寬不足、資料量達數十 TB 以上時，可用 <b>AWS Snow Family</b> 實體裝置（例如 Snowball Edge）把資料寄回 AWS 匯入。AWS 已陸續停售部分 Snow 裝置，但考題仍可能出現「網路太慢、要離線搬大量資料」的情境。線上遷移則用 <b>AWS DataSync</b>，資料庫遷移用 <b>AWS DMS</b>（第 9 章）。</p>` }
  ],
  keypoints: [
    '區域彼此獨立；每個區域至少 3 個 AZ；節點位置供 CloudFront 與 Route 53 使用',
    '選區域四考量：法規資料落地、延遲、服務是否提供、價格',
    '多 AZ 提供高可用；多區域用於災難復原與全球低延遲',
    'Local Zones 靠近城市、Wavelength 在 5G 網路、Outposts 放進客戶機房',
    'Well-Architected 六支柱：卓越營運、安全、可靠性、效能效率、成本最佳化、永續性',
    'CAF 六視角：業務、人員、治理、平台、安全、營運',
    '遷移 7R：Rehost 原封搬、Replatform 小改用託管服務、Refactor 重構為雲端原生'
  ]
},
{
  id: 'c03', subject: 1, minutes: 45,
  title: '共同責任模型與安全服務',
  summary: 'Domain 2.1–2.2、2.4：共同責任模型、AWS Artifact 與合規、加密與金鑰管理，以及 Shield、WAF、GuardDuty、Inspector、Macie 等安全服務。',
  sections: [
    { id: 'srm', title: '共同責任模型', html: `
<p><b>共同責任模型（Shared Responsibility Model）</b>說明雲端安全由 AWS 與客戶分工，是 Domain 2 出題率最高的觀念。</p>
<div class="concepts">
  <div class="concept"><b>AWS 負責：雲端本身的安全</b><span>Security <strong>OF</strong> the Cloud：資料中心實體安全、硬體、網路基礎設施、虛擬化層（Hypervisor）、託管服務底層的 OS 修補。</span></div>
  <div class="concept"><b>客戶負責：雲端內的安全</b><span>Security <strong>IN</strong> the Cloud：客戶資料、IAM 帳號與權限、EC2 的作業系統修補、應用程式、安全群組設定、資料加密選擇。</span></div>
</div>
<h3>責任會隨服務類型改變</h3>
<table>
<tr><th>工作</th><th>EC2（IaaS）</th><th>RDS（託管）</th><th>Lambda／S3（無伺服器）</th></tr>
<tr><td>實體設施、硬體</td><td>AWS</td><td>AWS</td><td>AWS</td></tr>
<tr><td>作業系統修補</td><td><b>客戶</b></td><td>AWS</td><td>AWS</td></tr>
<tr><td>資料庫引擎修補</td><td><b>客戶</b>（自己裝的）</td><td>AWS</td><td>—</td></tr>
<tr><td>網路流量防護（安全群組）</td><td>客戶</td><td>客戶</td><td>—</td></tr>
<tr><td>IAM 權限、資料加密設定</td><td>客戶</td><td>客戶</td><td>客戶</td></tr>
<tr><td>客戶資料本身</td><td>客戶</td><td>客戶</td><td>客戶</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>摸得到的歸 AWS，設定得到的歸客戶</b>」。資料與 IAM 永遠是客戶的責任。</div>
<div class="box warn"><b class="t">共享控制（Shared Controls）</b>有些控制雙方都有責任：<b>修補管理</b>（AWS 修補基礎設施，客戶修補自己的 OS 與應用程式）、<b>組態管理</b>、<b>意識與訓練</b>（AWS 訓練自己的員工，客戶訓練自己的員工）。</div>` },
    { id: 'compliance', title: '合規與 AWS Artifact', html: `
<p>AWS 通過 ISO 27001、SOC 1/2/3、PCI DSS 等多項國際認證，但<strong>AWS 合規不代表客戶的系統自動合規</strong>，客戶仍要依共同責任模型做好自己的部分。</p>
<table>
<tr><th>服務</th><th>用途</th></tr>
<tr><td><b>AWS Artifact</b></td><td>自助下載 AWS 的合規報告（例如 SOC、ISO 證書、PCI 報告），以及簽署協議（例如 BAA）。稽核人員要求 AWS 的合規證明時就用它。</td></tr>
<tr><td><b>AWS Audit Manager</b></td><td>持續收集證據，協助客戶評估自己在 AWS 上的系統是否符合法規與標準。</td></tr>
<tr><td><b>AWS Config</b></td><td>記錄資源設定並檢查是否符合規則（第 5 章）。</td></tr>
<tr><td><b>AWS Compliance Center／Compliance Programs</b></td><td>查詢各國法規與 AWS 合規計畫的說明資訊。</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「稽核人員要求提供 AWS 資料中心的 SOC 2 報告」→ <b>AWS Artifact</b>。這是 CLF 的經典題。</div>` },
    { id: 'encrypt', title: '加密與金鑰管理', html: `
<p>資料保護分兩種狀態：<b>靜態加密（Encryption at rest）</b>保護存放中的資料；<b>傳輸中加密（Encryption in transit）</b>以 TLS/SSL 保護網路傳輸。</p>
<table>
<tr><th>服務</th><th>用途</th><th>關鍵字</th></tr>
<tr><td><b>AWS KMS</b></td><td>建立與管理加密金鑰，與 S3、EBS、RDS 等服務整合</td><td>託管金鑰、多租戶、最常用</td></tr>
<tr><td><b>AWS CloudHSM</b></td><td>專屬的硬體安全模組（HSM），金鑰完全由客戶控制</td><td>單一租戶、法規要求專屬硬體</td></tr>
<tr><td><b>AWS Certificate Manager（ACM）</b></td><td>申請、部署與自動更新 SSL/TLS 憑證</td><td>HTTPS、免費公開憑證</td></tr>
<tr><td><b>AWS Secrets Manager</b></td><td>集中存放資料庫密碼、API 金鑰，可自動輪替</td><td>不要把密碼寫死在程式裡</td></tr>
</table>
<div class="box warn"><b class="t">易混淆</b>KMS 是 AWS 管理的多租戶服務；CloudHSM 是<b>專屬硬體</b>，客戶完全掌控金鑰，AWS 也無法存取。題目出現「專屬」「單一租戶」「FIPS 140 第 3 級」就選 CloudHSM。</div>` },
    { id: 'services', title: '安全服務總覽', html: `
<p>CLF 常考「依情境選安全服務」。以下是最常見的一組，請記住每個服務的關鍵字。</p>
<table>
<tr><th>服務</th><th>功能</th><th>看到這些關鍵字就選它</th></tr>
<tr><td><b>AWS Shield</b></td><td>DDoS 防護。Standard 免費自動啟用；Advanced 付費，提供進階防護、費用保護與 Shield Response Team（SRT）</td><td>DDoS、大量流量攻擊</td></tr>
<tr><td><b>AWS WAF</b></td><td>Web 應用程式防火牆，過濾 HTTP/HTTPS 請求</td><td>SQL Injection、XSS、封鎖特定 IP 或國家</td></tr>
<tr><td><b>Amazon GuardDuty</b></td><td>以機器學習分析 CloudTrail、VPC Flow Logs、DNS 日誌，<strong>偵測威脅</strong></td><td>異常 API 呼叫、挖礦、惡意 IP 連線</td></tr>
<tr><td><b>Amazon Inspector</b></td><td>自動<strong>掃描弱點</strong>：EC2、容器映像檔、Lambda 的軟體漏洞與網路暴露</td><td>CVE、軟體漏洞、弱點掃描</td></tr>
<tr><td><b>Amazon Macie</b></td><td>以機器學習找出 <strong>S3 中的敏感資料</strong></td><td>個資、信用卡號、PII</td></tr>
<tr><td><b>AWS Security Hub</b></td><td>彙整多個安全服務的發現，集中檢視並對照最佳實務標準</td><td>集中儀表板、安全狀態總覽</td></tr>
<tr><td><b>Amazon Detective</b></td><td>分析並視覺化安全事件的根本原因</td><td>調查、根因分析</td></tr>
<tr><td><b>AWS Firewall Manager</b></td><td>跨多個帳戶集中管理 WAF、Shield、安全群組規則</td><td>多帳戶、統一防火牆政策</td></tr>
<tr><td><b>AWS Network Firewall</b></td><td>部署在 VPC 的託管網路防火牆</td><td>VPC 層級流量過濾</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>Guard 看守威脅、Inspector 檢查漏洞、Macie 找個資</b>」；「<b>Shield 擋 DDoS、WAF 擋網頁攻擊</b>」。</div>
<h3>安全資訊來源</h3>
<ul>
  <li><b>AWS Knowledge Center</b>：常見問題的官方解答。</li>
  <li><b>AWS Security Center／Security Blog</b>：安全公告與最佳實務。</li>
  <li><b>AWS re:Post</b>：社群問答平台。</li>
  <li><b>AWS Marketplace</b>：可以購買第三方安全產品，例如防火牆、端點防護。</li>
</ul>` }
  ],
  keypoints: [
    'AWS 負責雲端本身的安全（實體、硬體、虛擬化）；客戶負責雲端內的安全（資料、IAM、OS、設定）',
    'EC2 的 OS 修補是客戶責任；RDS、Lambda 的底層修補由 AWS 負責',
    '修補管理、組態管理、教育訓練屬於共享控制',
    'AWS Artifact 下載 AWS 的合規報告（SOC、ISO、PCI）',
    'KMS 託管金鑰；CloudHSM 專屬硬體；ACM 管理 SSL/TLS 憑證；Secrets Manager 存密碼並輪替',
    'Shield 擋 DDoS（Standard 免費）、WAF 擋 SQL Injection 與 XSS',
    'GuardDuty 偵測威脅、Inspector 掃描弱點、Macie 找 S3 敏感資料、Security Hub 集中檢視'
  ]
},
{
  id: 'c04', subject: 1, minutes: 40,
  title: 'IAM 身分與存取管理',
  summary: 'Domain 2.3：根使用者保護、IAM 使用者、群組、角色與政策、最小權限、MFA、IAM Identity Center、AWS Organizations 與 Cognito。',
  sections: [
    { id: 'root', title: '根使用者（Root User）', html: `
<p>建立 AWS 帳戶時使用的電子郵件與密碼就是<b>根使用者（Root user）</b>，擁有帳戶的<strong>完整權限，無法被限制</strong>。</p>
<h3>根使用者最佳實務</h3>
<ol>
  <li>立即為根使用者啟用 <b>MFA</b>（多因素驗證）。</li>
  <li><b>不要</b>用根使用者做日常工作，改建立 IAM 使用者或使用 IAM Identity Center。</li>
  <li><b>不要</b>為根使用者建立存取金鑰（Access Key），已有的應刪除。</li>
  <li>使用強密碼，並妥善保管登入資訊。</li>
</ol>
<h3>只有根使用者能做的事</h3>
<ul>
  <li>變更帳戶設定，例如帳戶名稱、電子郵件、根使用者密碼</li>
  <li><b>關閉 AWS 帳戶</b></li>
  <li><b>變更或取消 AWS 支援方案</b></li>
  <li>還原被錯誤設定鎖住的 IAM 權限</li>
  <li>註冊成為 Reserved Instance Marketplace 的賣家</li>
</ul>
<div class="box exam"><b class="t">考點</b>「下列哪項工作必須使用根使用者？」常見正解是<b>變更支援方案</b>或<b>關閉帳戶</b>。建立 IAM 使用者、啟動 EC2 都不需要根使用者。</div>` },
    { id: 'iam', title: '使用者、群組、角色與政策', html: `
<p><b>AWS IAM（Identity and Access Management）</b>是全球服務（不分區域）、免費，用來控制「誰」可以對「哪些資源」做「什麼動作」。</p>
<div class="concepts">
  <div class="concept"><b>使用者 User</b><span>代表一個人或應用程式，有長期憑證：主控台密碼或存取金鑰（Access Key ID + Secret Access Key）。</span></div>
  <div class="concept"><b>群組 Group</b><span>使用者的集合，把政策套在群組上，群組內所有使用者都會繼承權限。群組不能包含其他群組。</span></div>
  <div class="concept"><b>角色 Role</b><span>提供<strong>臨時憑證</strong>，給 AWS 服務（例如 EC2 存取 S3）、其他帳戶或外部身分使用，不需要長期金鑰。</span></div>
  <div class="concept"><b>政策 Policy</b><span>JSON 格式的權限文件，定義 Effect（Allow / Deny）、Action、Resource，可附加到使用者、群組或角色。</span></div>
</div>
<pre class="out">{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::my-report-bucket/*"
  }]
}
// 只允許讀取 my-report-bucket 裡的物件</pre>
<div class="box exam"><b class="t">考點</b>「EC2 上的應用程式需要存取 S3，最安全的做法？」→ 建立 <b>IAM 角色</b>並附加到 EC2。<b>不要</b>把存取金鑰寫在程式或存放在 EC2 上。</div>
<div class="box warn"><b class="t">權限判斷順序</b>預設全部拒絕（隱含拒絕）→ 有明確 Allow 才允許 → 只要有任何明確 <b>Deny</b>，一律拒絕。<b>明確拒絕永遠優先。</b></div>` },
    { id: 'best', title: 'IAM 最佳實務', html: `
<ul>
  <li><b>最小權限原則（Principle of Least Privilege）</b>：只給完成工作所需的最少權限。</li>
  <li><b>啟用 MFA</b>：特別是根使用者與高權限使用者。MFA 裝置包括驗證器 App、硬體金鑰（FIDO 安全金鑰）。</li>
  <li><b>使用群組指派權限</b>：不要逐一對使用者設定政策。</li>
  <li><b>使用角色取代長期存取金鑰</b>，並定期輪替必要的金鑰。</li>
  <li><b>設定密碼政策</b>：長度、複雜度、到期天數、禁止重複使用。</li>
  <li><b>定期檢視權限</b>：用 <b>IAM Credential Report</b>（列出所有使用者與憑證狀態）和 <b>IAM Access Advisor</b>（顯示服務最後存取時間）移除用不到的權限。</li>
</ul>
<div class="box memo"><b class="t">記憶口訣</b>「<b>根鎖起、MFA 開、群組給、角色用、權限少</b>」。</div>
<h3>存取 AWS 的三種方式</h3>
<table>
<tr><th>方式</th><th>憑證</th><th>適用</th></tr>
<tr><td>AWS Management Console</td><td>帳號密碼 + MFA</td><td>網頁介面操作</td></tr>
<tr><td>AWS CLI</td><td>存取金鑰</td><td>命令列、腳本自動化</td></tr>
<tr><td>AWS SDK</td><td>存取金鑰或角色</td><td>在程式中呼叫 AWS API</td></tr>
</table>` },
    { id: 'multi', title: '多帳戶與身分整合', html: `
<table>
<tr><th>服務</th><th>用途</th><th>關鍵字</th></tr>
<tr><td><b>AWS Organizations</b></td><td>集中管理多個 AWS 帳戶，可用組織單位（OU）分組</td><td>多帳戶、<b>合併帳單</b>（Consolidated Billing）、量價折扣共享</td></tr>
<tr><td><b>服務控制政策 SCP</b></td><td>Organizations 的功能，限制帳戶或 OU 「最多」能使用哪些服務</td><td>即使是帳戶管理員也無法超越 SCP</td></tr>
<tr><td><b>AWS IAM Identity Center</b></td><td>前身為 AWS SSO，讓員工用一組帳號登入多個 AWS 帳戶與應用程式</td><td>單一登入、整合 Microsoft Entra ID 或 Active Directory</td></tr>
<tr><td><b>AWS Control Tower</b></td><td>依最佳實務快速建立多帳戶環境（Landing Zone），並套用防護規則</td><td>多帳戶環境自動化建置</td></tr>
<tr><td><b>Amazon Cognito</b></td><td>為網頁與行動 App 的<strong>終端使用者</strong>提供註冊、登入，可整合 Google、Facebook 登入</td><td>App 會員登入</td></tr>
<tr><td><b>AWS Directory Service</b></td><td>在 AWS 上提供託管的 Microsoft Active Directory</td><td>AD、網域</td></tr>
</table>
<div class="box warn"><b class="t">易混淆</b>IAM Identity Center 給<b>公司員工</b>登入 AWS；Cognito 給<b>App 的客戶</b>登入你的應用程式。SCP 本身<b>不授予</b>權限，只設定上限，仍需 IAM 政策允許。</div>` }
  ],
  keypoints: [
    '根使用者擁有完整權限：啟用 MFA、不建立存取金鑰、不做日常工作',
    '只有根使用者能關閉帳戶、變更支援方案',
    'IAM 是全球服務、免費；使用者、群組、角色、政策',
    '角色提供臨時憑證，EC2 存取 S3 應使用 IAM 角色',
    '明確 Deny 永遠優先；預設為隱含拒絕',
    'Credential Report 列出憑證狀態；Access Advisor 顯示服務最後存取時間',
    'Organizations 管理多帳戶與合併帳單；SCP 設定權限上限；Identity Center 員工單一登入；Cognito App 使用者登入'
  ]
},
{
  id: 'c05', subject: 1, minutes: 35,
  title: '監控、稽核與治理',
  summary: 'Domain 2.2、2.4：CloudTrail、CloudWatch、Config 的差異，Trusted Advisor、AWS Health Dashboard、Systems Manager 與治理工具。',
  sections: [
    { id: 'three', title: 'CloudTrail、CloudWatch 與 Config', html: `
<p>這三個服務名稱很像，是 CLF 最容易混淆的考點，請用「它在回答什麼問題」來區分。</p>
<table>
<tr><th>服務</th><th>回答的問題</th><th>記錄內容</th><th>例子</th></tr>
<tr><td><b>AWS CloudTrail</b></td><td><b>誰</b>在<b>何時</b>做了<b>什麼操作</b>？</td><td>API 呼叫與帳戶活動</td><td>「誰刪除了這個 S3 儲存貯體？」</td></tr>
<tr><td><b>Amazon CloudWatch</b></td><td>資源的<b>效能</b>與<b>運作狀態</b>如何？</td><td>指標（Metrics）、日誌（Logs）、告警（Alarms）</td><td>「EC2 的 CPU 超過 80% 時通知我」</td></tr>
<tr><td><b>AWS Config</b></td><td>資源的<b>設定</b>變成什麼樣、<b>是否合規</b>？</td><td>資源設定歷史與合規規則評估</td><td>「有沒有 S3 儲存貯體開放公開存取？」</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>Trail 追人、Watch 看效能、Config 管設定</b>」。Trail 像足跡，追查是誰做的。</div>
<h3>CloudWatch 的組成</h3>
<ul>
  <li><b>Metrics 指標</b>：CPU 使用率、網路流量等數據。</li>
  <li><b>Alarms 告警</b>：指標超過門檻時發出通知（搭配 Amazon SNS），或觸發 Auto Scaling。</li>
  <li><b>Logs 日誌</b>：集中收集應用程式與系統日誌。</li>
  <li><b>Dashboards 儀表板</b>：視覺化監控畫面。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「每月帳單預估超過 100 美元時通知」可以用 <b>CloudWatch 帳單告警</b>或 <b>AWS Budgets</b>（第 10 章）。「調查安全事件中，誰在凌晨關掉了 EC2」→ <b>CloudTrail</b>。</div>` },
    { id: 'ta', title: 'Trusted Advisor 與 Health Dashboard', html: `
<p><b>AWS Trusted Advisor</b> 自動檢查你的帳戶，對照 AWS 最佳實務提出建議，就像一位線上顧問。</p>
<table>
<tr><th>檢查類別</th><th>例子</th></tr>
<tr><td><b>成本最佳化</b> Cost Optimization</td><td>使用率很低的 EC2、未連接的 EBS 磁碟區、閒置的負載平衡器</td></tr>
<tr><td><b>效能</b> Performance</td><td>過度使用的執行個體、CloudFront 設定</td></tr>
<tr><td><b>安全</b> Security</td><td>根使用者沒有 MFA、安全群組開放 0.0.0.0/0 的特定埠號、S3 公開存取</td></tr>
<tr><td><b>容錯</b> Fault Tolerance</td><td>沒有啟用備份、只部署在單一 AZ</td></tr>
<tr><td><b>服務配額</b> Service Limits</td><td>接近服務配額上限的資源</td></tr>
<tr><td><b>卓越營運</b> Operational Excellence</td><td>營運最佳實務建議</td></tr>
</table>
<div class="box warn"><b class="t">易混淆</b>Basic 與 Developer 支援方案只有<b>核心安全檢查與服務配額</b>；Business 以上才能使用<b>完整的 Trusted Advisor 檢查</b>（第 10 章）。</div>
<h3>AWS Health Dashboard</h3>
<p>顯示 AWS 服務的運作狀態。分成兩種視角：</p>
<ul>
  <li><b>服務健康狀態（Service health）</b>：所有區域、所有服務的公開狀態。</li>
  <li><b>你的帳戶健康狀態（Your account health）</b>：只顯示<strong>影響你的資源</strong>的事件，例如即將進行的維護、底層硬體故障，並提供處理建議。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「想知道 AWS 的維護事件會不會影響我的 EC2」→ <b>AWS Health Dashboard（帳戶健康狀態）</b>。</div>` },
    { id: 'gov', title: '治理與營運工具', html: `
<table>
<tr><th>服務</th><th>用途</th></tr>
<tr><td><b>AWS Systems Manager</b></td><td>集中管理 EC2 與地端伺服器：批次修補（Patch Manager）、遠端執行指令（Run Command）、不用開 SSH 埠即可登入（Session Manager）、參數存放（Parameter Store）</td></tr>
<tr><td><b>AWS Service Catalog</b></td><td>建立經核准的產品目錄，讓員工只能部署公司允許的資源範本</td></tr>
<tr><td><b>AWS License Manager</b></td><td>管理 Microsoft、Oracle 等軟體授權的使用量</td></tr>
<tr><td><b>Service Quotas</b></td><td>查看與申請提高各服務的配額上限</td></tr>
<tr><td><b>Tag Editor／資源標籤</b></td><td>用標籤（Tag）標記部門、專案、環境，方便管理與成本分攤</td></tr>
<tr><td><b>AWS Resource Access Manager（RAM）</b></td><td>在帳戶之間共享資源，例如子網路、Transit Gateway</td></tr>
</table>
<div class="box tip"><b class="t">實務連結</b>Trusted Advisor、Config、Security Hub、CloudTrail 是 SOC 與雲端資安職缺常提到的工具。之後若要考 Security+ 或 iPAS 資安，這些觀念可以直接對應到「日誌與監控」「組態管理」章節。</div>` }
  ],
  keypoints: [
    'CloudTrail 記錄誰呼叫了哪個 API（稽核、調查）',
    'CloudWatch 監控指標、日誌與告警（效能與運作狀態）',
    'Config 記錄資源設定變更並評估是否合規',
    'Trusted Advisor 五類以上檢查：成本、效能、安全、容錯、服務配額、卓越營運',
    'Business 以上支援方案才有完整 Trusted Advisor 檢查',
    'Health Dashboard 帳戶健康狀態顯示影響你資源的事件',
    'Systems Manager 批次修補、遠端指令、Session Manager 免開 SSH 登入'
  ]
}
);
