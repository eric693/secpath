/* 科目一：資訊安全管理概論 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 35,
  title: '資安基礎觀念',
  summary: 'CIA 三要素、AAA、威脅／弱點／風險的關係，以及縱深防禦、最小權限等核心設計原則。',
  sections: [
    { id: 'what', title: '什麼是資訊安全？', html: `
<p>資訊安全（Information Security）就是<strong>保護資訊資產，讓它在正確的時間、只被正確的人、以正確的方式使用</strong>。資訊資產不只是電腦裡的檔案，也包含紙本文件、人員的知識、系統、網路設備與服務。</p>
<div class="box analogy"><b class="t">生活比喻</b>把公司的資料想成銀行金庫裡的錢：金庫要上鎖（不讓外人拿走）、要點鈔核帳（確保金額沒被竄改）、營業時間客戶要能領得到錢（隨時可用）。這三件事剛好就是資安最重要的三要素。</div>
<p>常聽到的幾個相近名詞：</p>
<ul>
  <li><b>資訊安全（InfoSec）</b>：範圍最廣，保護所有形式的資訊（含紙本、口語）。</li>
  <li><b>網路安全／資通安全（Cybersecurity）</b>：聚焦於透過網路、資通系統的攻擊與防護。台灣法規用語是「資通安全」。</li>
  <li><b>IT 安全</b>：偏重資訊系統、設備本身的安全設定。</li>
</ul>` },
    { id: 'cia', title: 'CIA 三要素（資安鐵三角）', html: `
<p>CIA 是整個資安領域的基石，考試幾乎必考，一定要能從情境判斷「這破壞了哪一個要素」。</p>
<div class="concepts">
  <div class="concept"><b>機密性 Confidentiality</b><span>資訊只讓<strong>被授權的人</strong>看到。手段：加密、存取控制、資料分級、遮罩。</span></div>
  <div class="concept"><b>完整性 Integrity</b><span>資訊<strong>正確、未被竄改</strong>。手段：雜湊值、數位簽章、版本控制、輸入驗證。</span></div>
  <div class="concept"><b>可用性 Availability</b><span>被授權者<strong>需要時能用</strong>。手段：備份、備援、負載平衡、UPS、DDoS 防護。</span></div>
</div>
<div class="table-wrap"><table>
<tr><th>情境</th><th>被破壞的要素</th></tr>
<tr><td>員工把客戶名單用私人信箱寄出</td><td>機密性</td></tr>
<tr><td>駭客把網站首頁換成抗議標語（網頁置換）</td><td>完整性</td></tr>
<tr><td>勒索軟體把檔案加密，業務停擺</td><td>可用性（若資料也被外洩則兼及機密性）</td></tr>
<tr><td>DDoS 讓購物網站無法連線</td><td>可用性</td></tr>
<tr><td>攻擊者在傳輸中竄改轉帳金額</td><td>完整性</td></tr>
<tr><td>竊聽未加密的 Wi-Fi 封包</td><td>機密性</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>CIA 的反面常被稱為 <b>DAD</b>：Disclosure（洩漏）↔ 機密性、Alteration（竄改）↔ 完整性、Destruction/Denial（破壞／阻斷）↔ 可用性。</div>
<h3>延伸屬性</h3>
<ul>
  <li><b>真確性（Authenticity）</b>：確認資料或身分確實來自宣稱的來源。</li>
  <li><b>不可否認性（Non-repudiation）</b>：行為人事後無法否認做過某件事，通常靠<strong>數位簽章＋日誌</strong>達成。</li>
  <li><b>可歸責性（Accountability）</b>：每個動作都能追溯到特定個人。</li>
  <li><b>可靠性（Reliability）</b>：系統行為與結果一致、可信賴。</li>
</ul>` },
    { id: 'aaa', title: 'IAAA：身分識別到稽核', html: `
<p>要讓「對的人做對的事」，存取控制通常分成幾個步驟，順序一定要記得：</p>
<div class="flow">
  <div><b>識別</b><span>Identification<br>宣稱「我是誰」<br>例：輸入帳號</span></div>
  <div><b>鑑別／驗證</b><span>Authentication<br>證明「真的是我」<br>例：密碼、指紋</span></div>
  <div><b>授權</b><span>Authorization<br>決定「我能做什麼」<br>例：只能讀不能改</span></div>
  <div><b>可歸責／稽核</b><span>Accountability / Audit<br>記錄「我做了什麼」<br>例：存取日誌</span></div>
</div>
<p>其中鑑別 + 授權 + 計費／稽核常合稱 <b>AAA</b>（Authentication、Authorization、Accounting），網路設備常用 <code>RADIUS</code>、<code>TACACS+</code> 協定實作 AAA。</p>
<div class="box warn"><b class="t">易混淆</b>「識別」只是宣稱身分（輸入帳號），還沒被證實；「鑑別」才是驗證身分。先鑑別、後授權，順序不可顛倒。</div>` },
    { id: 'risk', title: '資產、威脅、弱點與風險', html: `
<p>這組關係是風險管理的基礎，請用一句話記住：<strong>威脅利用弱點，對資產造成衝擊，就是風險</strong>。</p>
<div class="concepts">
  <div class="concept"><b>資產 Asset</b><span>對組織有價值的東西：資料、軟體、硬體、人員、服務、商譽。</span></div>
  <div class="concept"><b>威脅 Threat</b><span>可能造成損害的來源或事件：駭客、病毒、地震、員工誤刪。</span></div>
  <div class="concept"><b>弱點／脆弱性 Vulnerability</b><span>資產本身的缺陷：未修補漏洞、弱密碼、沒有門禁。</span></div>
  <div class="concept"><b>風險 Risk</b><span>威脅利用弱點造成損害的<strong>可能性 × 衝擊</strong>。</span></div>
</div>
<p class="mono center">風險 = 資產價值 × 威脅 × 弱點　（或　風險 = 可能性 × 衝擊）</p>
<div class="box analogy"><b class="t">生活比喻</b>你的機車（資產）沒上大鎖（弱點），附近常有偷車賊（威脅），所以機車被偷的風險很高。裝大鎖是「控制措施」，降低的是弱點；搬到有警衛的社區則降低了威脅出現的機會。</div>
<ul>
  <li><b>曝險（Exposure）</b>：資產暴露在威脅之下、可能遭受損失的狀態。</li>
  <li><b>控制措施（Control / Safeguard / Countermeasure）</b>：降低風險的手段。</li>
  <li><b>殘餘風險（Residual Risk）</b>：實施控制措施後<strong>仍然存在</strong>的風險，必須由管理階層正式接受。</li>
  <li><b>零時差（Zero-day）</b>：廠商尚未釋出修補程式的漏洞。</li>
</ul>` },
    { id: 'principles', title: '資安設計原則', html: `
<div class="table-wrap"><table>
<tr><th>原則</th><th>說明</th><th>例子</th></tr>
<tr><td><b>縱深防禦</b><br><small>Defense in Depth</small></td><td>多層防護，一層被突破還有下一層</td><td>防火牆 + IPS + 防毒 + 加密 + 教育訓練</td></tr>
<tr><td><b>最小權限</b><br><small>Least Privilege</small></td><td>只給完成工作所需的最小權限</td><td>會計人員不給系統管理員權限</td></tr>
<tr><td><b>知所必須</b><br><small>Need to Know</small></td><td>只能存取工作必要知道的資料</td><td>HR 只看自己負責部門的薪資</td></tr>
<tr><td><b>職責分離</b><br><small>Separation of Duties</small></td><td>關鍵工作拆給不同人，避免一人舞弊</td><td>請款、核准、付款分屬不同人</td></tr>
<tr><td><b>工作輪調</b><br><small>Job Rotation</small></td><td>定期換人，容易發現舞弊並避免人員單點依賴</td><td>出納每年輪調</td></tr>
<tr><td><b>強制休假</b><br><small>Mandatory Vacation</small></td><td>休假期間由他人代理，揭露隱藏的不法行為</td><td>金融業規定連續休假</td></tr>
<tr><td><b>預設拒絕</b><br><small>Default Deny / Fail-safe</small></td><td>沒有明確允許就拒絕；故障時進入安全狀態</td><td>防火牆最後一條規則 deny all</td></tr>
<tr><td><b>安全預設</b><br><small>Secure by Default</small></td><td>出廠即為安全設定</td><td>強制首次登入改密碼</td></tr>
<tr><td><b>經濟機制</b><br><small>Keep it Simple</small></td><td>設計越簡單越不容易出錯</td><td>精簡安裝不需要的服務</td></tr>
<tr><td><b>開放設計</b><br><small>Open Design</small></td><td>安全不應依賴設計保密（反對隱匿式安全）</td><td>公開的 AES 演算法</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>「一人無法單獨完成整個交易」→ 職責分離；「離職時要立即撤銷帳號」→ 最小權限／帳號管理；「多道防線」→ 縱深防禦。</div>` },
    { id: 'controls', title: '控制措施的分類', html: `
<p>控制措施可以依<strong>型態</strong>與<strong>功能</strong>兩個角度分類，考題常要你判斷某項措施屬於哪一類。</p>
<h3>依型態</h3>
<ul>
  <li><b>管理性（Administrative）</b>：政策、程序、教育訓練、背景調查。</li>
  <li><b>技術性／邏輯性（Technical / Logical）</b>：防火牆、加密、存取控制清單、防毒。</li>
  <li><b>實體性（Physical）</b>：門禁、警衛、監視器、圍牆、機房上鎖。</li>
</ul>
<h3>依功能</h3>
<div class="table-wrap"><table>
<tr><th>功能</th><th>目的</th><th>例子</th></tr>
<tr><td>預防性 Preventive</td><td>阻止事件發生</td><td>防火牆、門禁、MFA</td></tr>
<tr><td>偵測性 Detective</td><td>發現正在／已發生的事件</td><td>IDS、監視器、日誌稽核</td></tr>
<tr><td>矯正性 Corrective</td><td>事件後修正、降低損害</td><td>修補程式、隔離中毒主機</td></tr>
<tr><td>復原性 Recovery</td><td>恢復正常營運</td><td>備份還原、異地備援</td></tr>
<tr><td>嚇阻性 Deterrent</td><td>讓攻擊者打消念頭</td><td>警告標語、「本區有監視器」</td></tr>
<tr><td>補償性 Compensating</td><td>主要控制做不到時的替代方案</td><td>舊系統無法加密，改用網路隔離</td></tr>
<tr><td>指示性 Directive</td><td>告訴人該怎麼做</td><td>政策、作業程序</td></tr>
</table></div>
<div class="box memo"><b class="t">記憶口訣</b>「<b>防・偵・矯・復・嚇・補</b>」——先防、再偵、出事矯正、最後復原；嚇阻在門口、補償當替身。</div>` }
  ],
  keypoints: [
    'CIA：機密性（不外洩）、完整性（不竄改）、可用性（能使用）',
    '不可否認性靠數位簽章與日誌達成',
    '存取控制順序：識別 → 鑑別 → 授權 → 稽核',
    '風險 = 可能性 × 衝擊；威脅利用弱點危害資產',
    '殘餘風險需由管理階層接受',
    '職責分離防舞弊；最小權限限制損害範圍'
  ]
},
{
  id: 'c02', subject: 1, minutes: 40,
  title: '資安治理與 ISMS（ISO 27001）',
  summary: '資安治理架構、PDCA 循環、ISO/IEC 27001:2022 條文架構與附錄 A 的 93 項控制措施。',
  sections: [
    { id: 'gov', title: '資安治理是什麼？', html: `
<p><b>資安治理（Security Governance）</b>是由<strong>董事會與高階管理階層</strong>主導，確保資安策略與組織目標一致、資源足夠、風險被妥善管理，並能被衡量與問責。</p>
<ul>
  <li><b>治理（Governance）</b>：決定方向、設定目標、監督——「做對的事」。</li>
  <li><b>管理（Management）</b>：規劃、執行、控制——「把事做對」。</li>
</ul>
<div class="box exam"><b class="t">考點提示</b>資安推動成功最關鍵的因素是<b>高階管理階層的支持與承諾</b>。導入 ISMS 時首要取得管理階層支持。</div>
<h3>常見資安角色</h3>
<ul>
  <li><b>資安長（CISO）</b>：統籌組織資安策略。依《資通安全管理法》，公務機關與特定非公務機關需指定副首長或適當人員擔任資安長。</li>
  <li><b>資產擁有者（Owner）</b>：決定資產的分級與誰可以存取，<strong>對資產負最終責任</strong>。</li>
  <li><b>資產保管者（Custodian）</b>：依擁有者的指示執行日常保護，例如 IT 人員負責備份。</li>
  <li><b>使用者（User）</b>：依授權使用資產，遵守政策。</li>
  <li><b>稽核者（Auditor）</b>：獨立檢查控制措施是否有效，需保持<strong>獨立性</strong>。</li>
</ul>` },
    { id: 'policy', title: '政策文件的層級', html: `
<p>資安文件通常是金字塔架構，越上層越抽象、越穩定；越下層越具體、越常更新。</p>
<div class="flow">
  <div><b>一階：政策</b><span>Policy<br>方向與承諾<br>由高層核定</span></div>
  <div><b>二階：程序</b><span>Procedure<br>誰、何時、做什麼</span></div>
  <div><b>三階：作業指導書</b><span>Work Instruction<br>一步一步怎麼做</span></div>
  <div><b>四階：紀錄／表單</b><span>Record / Form<br>執行的證據</span></div>
</div>
<ul>
  <li><b>標準（Standard）</b>：強制性的具體要求，例如「密碼至少 12 碼」。</li>
  <li><b>基準（Baseline）</b>：最低安全設定水準，例如政府組態基準 GCB。</li>
  <li><b>指引（Guideline）</b>：建議性質，非強制。</li>
</ul>
<div class="box tip"><b class="t">小提醒</b>「紀錄」是稽核時最重要的證據——沒有紀錄就等於沒有做。</div>` },
    { id: 'pdca', title: 'PDCA 持續改善循環', html: `
<p>ISO 管理系統都依循 <b>PDCA</b>（戴明循環），讓資安不是一次性專案，而是<strong>持續改善</strong>的過程。</p>
<div class="table-wrap"><table>
<tr><th>階段</th><th>做什麼</th><th>ISO 27001 對應條文</th></tr>
<tr><td><b>P 規劃 Plan</b></td><td>界定範圍、風險評鑑、訂定目標與控制措施</td><td>4 組織全景、5 領導、6 規劃、7 支援</td></tr>
<tr><td><b>D 執行 Do</b></td><td>實施風險處理計畫、運作控制措施</td><td>8 運作</td></tr>
<tr><td><b>C 檢查 Check</b></td><td>監督量測、內部稽核、管理審查</td><td>9 績效評估</td></tr>
<tr><td><b>A 行動 Act</b></td><td>矯正措施、持續改善</td><td>10 改善</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>「內部稽核」與「管理審查」屬於 <b>C（Check）</b>；「矯正措施」屬於 <b>A（Act）</b>；「風險評鑑」屬於 <b>P（Plan）</b>。</div>` },
    { id: 'iso', title: 'ISO/IEC 27000 家族', html: `
<div class="table-wrap"><table>
<tr><th>標準</th><th>內容</th></tr>
<tr><td><b>ISO/IEC 27000</b></td><td>概述與詞彙</td></tr>
<tr><td><b>ISO/IEC 27001</b></td><td>ISMS <strong>要求事項</strong>——唯一可以拿來<strong>驗證（認證）</strong>的標準</td></tr>
<tr><td><b>ISO/IEC 27002</b></td><td>資安控制措施的<strong>實作指引</strong>（不可驗證）</td></tr>
<tr><td>ISO/IEC 27005</td><td>資訊安全風險管理指引</td></tr>
<tr><td>ISO/IEC 27017 / 27018</td><td>雲端服務資安控制／公有雲個資保護</td></tr>
<tr><td>ISO/IEC 27701</td><td>隱私資訊管理系統（PIMS），擴充 27001</td></tr>
<tr><td>ISO/IEC 27035</td><td>資安事件管理</td></tr>
<tr><td>ISO 22301</td><td>營運持續管理系統（BCMS）</td></tr>
<tr><td>ISO/IEC 20000-1</td><td>IT 服務管理（ITSM）</td></tr>
</table></div>
<h3>ISO 27001:2022 的重點</h3>
<p>本文為第 4 至第 10 章（條文要求），<b>附錄 A</b> 列出 <strong>93 項控制措施</strong>，分成 <strong>4 大主題</strong>：</p>
<div class="concepts">
  <div class="concept"><b>A.5 組織控制</b><span>37 項：政策、角色、資產、存取、供應商、事件、BCP、法遵…</span></div>
  <div class="concept"><b>A.6 人員控制</b><span>8 項：篩選、聘用條款、意識訓練、懲處、遠距工作…</span></div>
  <div class="concept"><b>A.7 實體控制</b><span>14 項：實體邊界、門禁、桌面淨空、設備維護、媒體處置…</span></div>
  <div class="concept"><b>A.8 技術控制</b><span>34 項：端點、特權存取、惡意軟體、備份、日誌、加密、安全開發…</span></div>
</div>
<p>2022 版新增 11 項控制，例如：<b>威脅情資</b>、<b>雲端服務資安</b>、<b>ICT 營運持續整備</b>、<b>實體安全監控</b>、<b>組態管理</b>、<b>資訊刪除</b>、<b>資料遮罩</b>、<b>資料洩漏預防（DLP）</b>、<b>監控活動</b>、<b>網頁過濾</b>、<b>安全程式設計</b>。</p>
<div class="box memo"><b class="t">記憶口訣</b>「<b>93 項、4 主題：組 37、人 8、實 14、技 34</b>」（37+8+14+34 = 93）</div>
<h3>適用性聲明（SoA）</h3>
<p><b>SoA（Statement of Applicability）</b>列出附錄 A 每一項控制措施<strong>是否適用、是否已實施、以及納入或排除的理由</strong>，是 ISMS 驗證時的關鍵文件。</p>` },
    { id: 'cert', title: '稽核與驗證', html: `
<ul>
  <li><b>第一方稽核</b>：組織自己做的內部稽核。</li>
  <li><b>第二方稽核</b>：客戶對供應商的稽核。</li>
  <li><b>第三方稽核</b>：獨立驗證機構執行，通過後取得證書（證書效期通常 3 年，期間每年追查稽核）。</li>
</ul>
<h3>稽核發現的分類</h3>
<ul>
  <li><b>主要不符合（Major NC）</b>：系統性失效或缺少條文要求，可能影響發證。</li>
  <li><b>次要不符合（Minor NC）</b>：個別、偶發的缺失。</li>
  <li><b>觀察事項（Observation）／改善機會（OFI）</b>：尚未不符合，但有風險或可更好。</li>
</ul>
<p>發現不符合後要做 <b>矯正措施</b>：分析<strong>根本原因</strong>、消除原因、防止再發生，並確認有效性。只修表面問題叫「矯正（Correction）」，處理根因才是「矯正措施（Corrective Action）」。</p>` },
    { id: 'frameworks', title: '其他常見框架', html: `
<div class="table-wrap"><table>
<tr><th>框架</th><th>重點</th></tr>
<tr><td><b>NIST CSF 2.0</b></td><td>六大功能：<strong>治理 Govern、識別 Identify、保護 Protect、偵測 Detect、回應 Respond、復原 Recover</strong>（2.0 版新增「治理」）</td></tr>
<tr><td>NIST SP 800-53</td><td>美國聯邦資訊系統安全控制措施目錄</td></tr>
<tr><td>COBIT</td><td>IT 治理與管理框架（ISACA）</td></tr>
<tr><td>ITIL</td><td>IT 服務管理最佳實務</td></tr>
<tr><td>CIS Controls</td><td>優先排序的實務防護措施清單</td></tr>
<tr><td>PCI DSS</td><td>處理信用卡資料的產業資安標準</td></tr>
<tr><td>CNS 27001</td><td>台灣國家標準，對應 ISO/IEC 27001</td></tr>
</table></div>
<div class="box memo"><b class="t">記憶口訣</b>NIST CSF 2.0：「<b>治・識・保・偵・回・復</b>」——GIPDRR。</div>` }
  ],
  keypoints: [
    '資安推動成功關鍵：高階管理階層的支持',
    '資產擁有者負最終責任；保管者負責日常執行',
    'PDCA：稽核與管理審查屬 Check；矯正措施屬 Act',
    'ISO 27001 可驗證；27002 是控制措施指引',
    'ISO 27001:2022 附錄 A：93 項控制、4 主題（組織37／人員8／實體14／技術34）',
    'SoA 記錄每項控制是否適用與理由',
    'NIST CSF 2.0 六功能：治理、識別、保護、偵測、回應、復原'
  ]
},
{
  id: 'c03', subject: 1, minutes: 45,
  title: '資產管理與風險管理',
  summary: '資產盤點與分級、風險評鑑流程、定性與定量分析（SLE/ALE）與四種風險處理策略。',
  sections: [
    { id: 'asset', title: '資產盤點與分級', html: `
<p>不知道自己有什麼，就不可能保護它——<strong>資產盤點是風險管理的第一步</strong>。資產清冊應記錄名稱、類別、擁有者、保管者、位置、分級等。</p>
<h3>資產類別</h3>
<ul>
  <li><b>資訊資產</b>：資料庫、文件、合約、備份媒體</li>
  <li><b>軟體資產</b>：作業系統、應用程式、授權</li>
  <li><b>實體資產</b>：伺服器、筆電、網路設備、機房</li>
  <li><b>服務資產</b>：電力、空調、網路線路、雲端服務</li>
  <li><b>人員資產</b>：員工的資格、技能、經驗</li>
  <li><b>無形資產</b>：商譽、品牌形象</li>
</ul>
<h3>資料分級（常見做法）</h3>
<div class="table-wrap"><table>
<tr><th>企業常用</th><th>政府機關常用</th><th>說明</th></tr>
<tr><td>機密（Confidential）</td><td>密（國家機密分絕對機密／極機密／機密）</td><td>外洩造成重大損害</td></tr>
<tr><td>限閱／敏感（Sensitive）</td><td>敏感</td><td>僅限特定人員</td></tr>
<tr><td>內部使用（Internal）</td><td>一般</td><td>僅供內部</td></tr>
<tr><td>公開（Public）</td><td>公開</td><td>可對外發布</td></tr>
</table></div>
<p>分級的目的是<strong>依價值給予相稱的保護</strong>，避免保護不足或過度保護浪費成本。分級由<b>資產擁有者</b>決定，並應定期重新檢視。</p>
<div class="box exam"><b class="t">考點提示</b>資產價值通常以 CIA 三面向分別評估（例如各 1～3 分），再取最大值或加總作為資產價值。</div>` },
    { id: 'process', title: '風險管理流程', html: `
<p>依 ISO/IEC 27005 與 ISO 31000，風險管理流程如下：</p>
<div class="flow">
  <div><b>建立全景</b><span>範圍、準則、可接受風險水準</span></div>
  <div><b>風險識別</b><span>找出資產、威脅、弱點、既有控制</span></div>
  <div><b>風險分析</b><span>評估可能性與衝擊，算出風險值</span></div>
  <div><b>風險評估</b><span>與風險接受準則比較、排優先順序</span></div>
  <div><b>風險處理</b><span>選擇處理策略與控制措施</span></div>
</div>
<p>整個流程要搭配<b>溝通諮詢</b>與<b>監督審查</b>持續進行。其中「風險識別＋風險分析＋風險評估」合稱<strong>風險評鑑（Risk Assessment）</strong>。</p>
<div class="box warn"><b class="t">易混淆</b>風險<b>分析</b>（Analysis）是算出風險值；風險<b>評估</b>（Evaluation）是拿風險值跟準則比較、決定要不要處理。風險<b>評鑑</b>（Assessment）是三者的總稱。</div>` },
    { id: 'qual', title: '定性 vs. 定量分析', html: `
<div class="table-wrap"><table>
<tr><th></th><th>定性分析 Qualitative</th><th>定量分析 Quantitative</th></tr>
<tr><td>表示方式</td><td>高／中／低、1～5 分、風險矩陣</td><td>金額（元）</td></tr>
<tr><td>優點</td><td>快速、簡單、不需精確數據</td><td>客觀、方便做成本效益分析</td></tr>
<tr><td>缺點</td><td>主觀，不同人評估結果不同</td><td>耗時、數據難取得</td></tr>
<tr><td>常用方法</td><td>風險矩陣、德爾菲法、問卷訪談</td><td>SLE、ALE 計算</td></tr>
</table></div>
<h3>定量分析公式（必考）</h3>
<div class="concepts">
  <div class="concept"><div class="k">AV</div><b>資產價值</b><span>Asset Value，資產的金額。</span></div>
  <div class="concept"><div class="k">EF</div><b>曝險因子</b><span>Exposure Factor，一次事件造成資產損失的百分比（0～100%）。</span></div>
  <div class="concept"><div class="k">SLE</div><b>單一損失期望值</b><span>SLE = AV × EF</span></div>
  <div class="concept"><div class="k">ARO</div><b>年發生率</b><span>Annualized Rate of Occurrence，一年發生幾次（十年一次 = 0.1）。</span></div>
  <div class="concept"><div class="k">ALE</div><b>年度損失期望值</b><span>ALE = SLE × ARO</span></div>
</div>
<div class="box tip"><b class="t">範例</b>伺服器價值 200 萬（AV），一次火災損失 40%（EF）→ SLE = 200 萬 × 0.4 = <b>80 萬</b>。火災每 20 年發生一次 → ARO = 0.05 → ALE = 80 萬 × 0.05 = <b>4 萬元／年</b>。<br>若某防火系統年成本 6 萬，可把 ALE 降到 1 萬，則年效益 = 4 萬 − 1 萬 − 6 萬 = <b>−3 萬</b>，不划算。</div>
<p class="mono center">控制措施價值 = ALE(導入前) − ALE(導入後) − 控制措施年成本</p>
<p>可以到「互動實驗室」的 <b>ALE 計算器</b> 親手試算。</p>` },
    { id: 'treat', title: '風險處理四策略', html: `
<div class="concepts">
  <div class="concept"><b>降低／修改 Mitigate</b><span>導入控制措施，降低可能性或衝擊。例：安裝防火牆、修補漏洞。</span></div>
  <div class="concept"><b>移轉／分擔 Transfer</b><span>把風險的財務衝擊轉給第三方。例：<strong>買保險</strong>、委外。</span></div>
  <div class="concept"><b>避免／規避 Avoid</b><span>停止造成風險的活動。例：不再提供某項高風險服務。</span></div>
  <div class="concept"><b>接受／保留 Accept</b><span>風險在可接受範圍或處理成本過高，<strong>經管理階層核准</strong>後接受。</span></div>
</div>
<div class="box warn"><b class="t">注意</b>「移轉」只能轉移財務損失，<b>責任（尤其法律責任）與商譽損害無法完全轉移</b>。委外廠商出事，組織仍要負責。另外「忽視風險（Ignore）」不是合法的處理方式。</div>
<div class="box exam"><b class="t">考點提示</b>決定風險處理方式的依據：<b>成本效益分析</b>與組織的<b>風險胃納（Risk Appetite）</b>。處理後剩下的是<b>殘餘風險</b>，需由風險擁有者接受。</div>` },
    { id: 'matrix', title: '風險矩陣與風險登錄表', html: `
<p>定性分析最常用<b>風險矩陣（Heat Map）</b>：橫軸為衝擊、縱軸為可能性，各分 1～5 級，相乘得到風險值，再用顏色標示等級。</p>
<p>風險評鑑結果會整理成<b>風險登錄表（Risk Register）</b>，欄位通常包括：風險編號、資產、威脅、弱點、既有控制、可能性、衝擊、風險值、處理方式、負責人、期限。</p>
<p>到「互動實驗室」點選 <b>風險矩陣</b>，可以體驗如何判斷風險等級。</p>
<h3>相關名詞</h3>
<ul>
  <li><b>風險胃納（Risk Appetite）</b>：組織願意承擔的整體風險量。</li>
  <li><b>風險容忍度（Risk Tolerance）</b>：對特定目標可接受的偏差範圍。</li>
  <li><b>固有風險（Inherent Risk）</b>：尚未採取任何控制前的風險。</li>
  <li><b>關鍵風險指標（KRI）</b>：預警風險上升的指標。</li>
</ul>` }
  ],
  keypoints: [
    '資產盤點是風險管理第一步；分級由擁有者決定',
    '風險評鑑 = 識別 + 分析 + 評估',
    'SLE = AV × EF；ALE = SLE × ARO',
    '風險處理：降低、移轉（保險）、避免、接受',
    '責任與商譽無法透過移轉完全轉嫁',
    '殘餘風險由管理階層（風險擁有者）正式接受'
  ]
},
{
  id: 'c04', subject: 1, minutes: 40,
  title: '存取控制與身分管理',
  summary: '鑑別三因子與 MFA、DAC/MAC/RBAC/ABAC 模型、SSO 與帳號生命週期管理。',
  sections: [
    { id: 'factors', title: '鑑別因子與多因子驗證', html: `
<div class="concepts">
  <div class="concept"><b>所知 Something you know</b><span>密碼、PIN 碼、安全提示問題</span></div>
  <div class="concept"><b>所有 Something you have</b><span>手機 OTP、智慧卡、自然人憑證、硬體金鑰（FIDO2）</span></div>
  <div class="concept"><b>所是 Something you are</b><span>指紋、臉部、虹膜、聲紋（生物特徵）</span></div>
</div>
<p>其他輔助因子：<b>所在位置</b>（Somewhere you are，IP、GPS）、<b>行為特徵</b>（Something you do，打字節奏）。</p>
<div class="box warn"><b class="t">易錯</b><b>MFA 必須結合「不同類別」的因子</b>。密碼 + 安全提問 都是「所知」，仍然是單因子！密碼 + 手機 OTP 才是雙因子。</div>
<h3>生物辨識的兩種錯誤</h3>
<div class="table-wrap"><table>
<tr><th>指標</th><th>意義</th><th>影響</th></tr>
<tr><td><b>FRR</b> 錯誤拒絕率（第一類錯誤）</td><td>合法使用者被拒絕</td><td>使用者不便</td></tr>
<tr><td><b>FAR</b> 錯誤接受率（第二類錯誤）</td><td>冒名者被接受</td><td>安全性風險，<strong>較嚴重</strong></td></tr>
<tr><td><b>CER/EER</b> 交叉錯誤率</td><td>FRR = FAR 的交點</td><td><strong>越低代表系統越準確</strong></td></tr>
</table></div>
<h3>密碼管理要點</h3>
<ul>
  <li>長度比複雜度更重要，建議使用<strong>通行片語（Passphrase）</strong>。</li>
  <li>不同網站使用不同密碼，搭配<b>密碼管理器</b>。</li>
  <li>系統端應以<b>加鹽雜湊</b>（bcrypt、scrypt、Argon2、PBKDF2）儲存密碼，不可明碼或可逆加密。</li>
  <li>帳號鎖定機制可防暴力破解；NIST SP 800-63B 建議<strong>不需強制定期更換</strong>，而是在疑似外洩時更換，並檢查是否為已外洩密碼。</li>
</ul>` },
    { id: 'models', title: '存取控制模型', html: `
<div class="table-wrap"><table>
<tr><th>模型</th><th>誰決定權限</th><th>特色</th><th>例子</th></tr>
<tr><td><b>DAC</b> 自主式</td><td>資源<strong>擁有者</strong>自行決定</td><td>彈性高、管理分散，易被木馬濫用</td><td>Windows NTFS、Linux 檔案權限、分享雲端連結</td></tr>
<tr><td><b>MAC</b> 強制式</td><td><strong>系統</strong>依安全標籤強制執行</td><td>主體有<b>安全許可</b>、客體有<b>敏感標籤</b>，使用者無法更改</td><td>軍事、政府機密系統、SELinux</td></tr>
<tr><td><b>RBAC</b> 角色式</td><td>依<strong>職務角色</strong>指派</td><td>人員異動只要改角色，管理最方便</td><td>企業 ERP：會計角色、業務角色</td></tr>
<tr><td><b>ABAC</b> 屬性式</td><td>依<strong>屬性</strong>與政策動態判斷</td><td>最細緻，可結合時間、地點、裝置</td><td>「上班時間、公司網路、主管」才可核准</td></tr>
<tr><td><b>Rule-BAC</b> 規則式</td><td>系統規則</td><td>規則套用於所有使用者</td><td>防火牆 ACL</td></tr>
</table></div>
<h3>MAC 的經典模型</h3>
<ul>
  <li><b>Bell-LaPadula（BLP）</b>：保護<strong>機密性</strong>。「<b>不可上讀、不可下寫</b>」（No Read Up, No Write Down）——避免機密資料流向低等級。</li>
  <li><b>Biba</b>：保護<strong>完整性</strong>。「<b>不可下讀、不可上寫</b>」（No Read Down, No Write Up）——避免低可信度資料污染高等級。</li>
  <li><b>Clark-Wilson</b>：保護完整性，透過「良好交易」與職責分離，常用於商業環境。</li>
</ul>
<div class="box memo"><b class="t">記憶口訣</b>BLP 管<b>機密</b>：「讀不上去、寫不下來」；Biba 管<b>完整</b>剛好相反：「讀不下來、寫不上去」。</div>` },
    { id: 'sso', title: '單一登入與身分聯盟', html: `
<ul>
  <li><b>SSO（Single Sign-On）</b>：登入一次即可使用多個系統。優點是方便、減少密碼數量；缺點是<strong>一旦帳號被盜，所有系統都淪陷</strong>（單點失效），所以 SSO 一定要搭配 MFA。</li>
  <li><b>Kerberos</b>：使用<strong>票證（Ticket）</strong>與對稱式加密的 SSO 協定，核心是 KDC（含 AS 與 TGS），對<strong>時間同步</strong>要求嚴格。Windows AD 網域預設採用。</li>
  <li><b>LDAP</b>：目錄服務協定，查詢使用者與群組資料（預設埠 389，加密版 LDAPS 為 636）。</li>
  <li><b>SAML</b>：以 XML 交換身分驗證聲明，常用於企業 Web SSO。</li>
  <li><b>OAuth 2.0</b>：<strong>授權</strong>框架，例如允許 App 存取你的 Google 相簿，而不必給它密碼。</li>
  <li><b>OpenID Connect（OIDC）</b>：建立在 OAuth 2.0 上的<strong>身分驗證</strong>層，「用 Google 帳號登入」即是。</li>
  <li><b>FIDO2 / Passkey（通行金鑰）</b>：以公開金鑰密碼學取代密碼，可抵抗釣魚。</li>
</ul>
<div class="box exam"><b class="t">考點提示</b>OAuth 是「<b>授權</b>」不是驗證；OIDC 才是在 OAuth 上加入「<b>驗證</b>」。</div>` },
    { id: 'lifecycle', title: '帳號生命週期管理', html: `
<div class="flow">
  <div><b>申請</b><span>主管核准、依角色授權</span></div>
  <div><b>開通</b><span>建立帳號、最小權限</span></div>
  <div><b>變更</b><span>調職時調整權限，移除舊權限</span></div>
  <div><b>定期審查</b><span>檢查權限是否仍必要</span></div>
  <div><b>停用／刪除</b><span>離職<strong>立即</strong>停用</span></div>
</div>
<ul>
  <li><b>權限潛變（Privilege Creep）</b>：員工多次調職後累積了不需要的權限——靠<strong>定期權限審查</strong>解決。</li>
  <li><b>孤兒帳號</b>：離職人員未刪除的帳號，常被攻擊者利用。</li>
  <li><b>共用帳號</b>：無法追溯個人責任，違反可歸責性，應避免。</li>
  <li><b>特權帳號管理（PAM）</b>：管理員帳號要獨立、限時、全程側錄，並使用「一般帳號日常作業、特權帳號必要時才用」。</li>
  <li><b>即時存取（JIT）</b>：需要時才臨時賦予權限，用完收回。</li>
</ul>` }
  ],
  keypoints: [
    '三因子：所知、所有、所是；MFA 須跨不同類別',
    'FAR 較 FRR 危險；CER 越低越準確',
    'DAC 擁有者決定；MAC 系統依標籤；RBAC 依角色；ABAC 依屬性',
    'BLP 保機密（不上讀不下寫）；Biba 保完整（不下讀不上寫）',
    'OAuth 是授權、OIDC 是驗證；Kerberos 用票證且需時間同步',
    '權限潛變靠定期審查；離職帳號立即停用'
  ]
},
{
  id: 'c05', subject: 1, minutes: 30,
  title: '人員安全與實體環境安全',
  summary: '聘用前中後的人員管理、資安意識訓練、社交工程防範，以及機房與設備的實體防護。',
  sections: [
    { id: 'hr', title: '人員安全：聘用前、中、後', html: `
<p>許多資安事件源自「人」——不論是疏失或惡意。ISO 27001:2022 A.6 人員控制涵蓋整個任用週期：</p>
<div class="table-wrap"><table>
<tr><th>階段</th><th>措施</th></tr>
<tr><td><b>聘用前</b></td><td>背景調查（依職務敏感度、在法令允許範圍內）、簽署<strong>保密協議（NDA）</strong>、聘用合約中載明資安責任</td></tr>
<tr><td><b>聘用中</b></td><td>資安意識教育訓練、遵循政策、懲處程序、遠距工作規範、事件通報義務</td></tr>
<tr><td><b>離職／異動</b></td><td><strong>立即撤銷帳號與門禁</strong>、歸還資產（筆電、識別證、金鑰）、提醒離職後仍有保密義務、離職面談</td></tr>
</table></div>
<div class="box tip"><b class="t">內部威脅</b>員工擁有合法權限，比外部駭客更難察覺。防範手段：最小權限、職責分離、強制休假、工作輪調、行為監控、DLP。</div>` },
    { id: 'awareness', title: '資安意識與社交工程', html: `
<p><b>社交工程（Social Engineering）</b>是利用人性弱點（信任、恐懼、貪小便宜、好奇、權威、急迫感）騙取資訊或誘使人執行動作。<strong>最有效的防範方式是資安意識教育訓練</strong>。</p>
<div class="table-wrap"><table>
<tr><th>手法</th><th>說明</th></tr>
<tr><td>網路釣魚 Phishing</td><td>大量發送假冒信件，誘導點連結或輸入帳密</td></tr>
<tr><td>魚叉式釣魚 Spear Phishing</td><td>針對特定人士量身打造的釣魚信</td></tr>
<tr><td>鯨釣 Whaling</td><td>鎖定高階主管（大魚）</td></tr>
<tr><td>簡訊釣魚 Smishing</td><td>透過 SMS 簡訊</td></tr>
<tr><td>語音釣魚 Vishing</td><td>電話假冒客服、檢警</td></tr>
<tr><td>QR Code 釣魚 Quishing</td><td>以惡意 QR Code 導向假網站</td></tr>
<tr><td>商務電子郵件詐騙 BEC</td><td>假冒老闆或供應商要求匯款、變更帳戶</td></tr>
<tr><td>假託 Pretexting</td><td>編造情境（假稱 IT 人員）套取資訊</td></tr>
<tr><td>尾隨 Tailgating / Piggybacking</td><td>跟在員工後面進入管制區</td></tr>
<tr><td>肩窺 Shoulder Surfing</td><td>偷看別人輸入密碼或螢幕</td></tr>
<tr><td>垃圾搜尋 Dumpster Diving</td><td>翻找丟棄的文件</td></tr>
<tr><td>水坑攻擊 Watering Hole</td><td>入侵目標族群常去的網站植入惡意程式</td></tr>
<tr><td>誘餌 Baiting</td><td>故意遺留含惡意程式的 USB 隨身碟</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>防範尾隨：<b>人員管制門（Mantrap／雙門互鎖）</b>與一人一卡；防範肩窺：<b>螢幕防窺片</b>；防範垃圾搜尋：<b>碎紙機與媒體安全銷毀</b>。</div>
<p>組織可定期進行<b>社交工程演練</b>（例如寄送模擬釣魚信）衡量員工警覺度，並針對點擊者加強訓練。</p>` },
    { id: 'physical', title: '實體與環境安全', html: `
<p>實體安全遵循縱深防禦：<b>園區 → 建物 → 樓層 → 機房 → 機櫃</b>，一層一層管制。</p>
<ul>
  <li><b>門禁</b>：刷卡、生物辨識、訪客登記與陪同、Mantrap。</li>
  <li><b>監控</b>：CCTV、警衛巡邏、入侵偵測感應器、出入紀錄定期審查。</li>
  <li><b>桌面淨空與螢幕淨空</b>（Clear Desk / Clear Screen）：離開座位收好機密文件、鎖定螢幕。</li>
  <li><b>設備安全</b>：纜線保護、設備維護、攜出需申請、異地設備保護。</li>
</ul>
<h3>機房環境控制</h3>
<div class="table-wrap"><table>
<tr><th>項目</th><th>重點</th></tr>
<tr><td>電力</td><td><b>UPS</b>（不斷電系統，短時間供電）＋<b>發電機</b>（長時間）；雙迴路供電</td></tr>
<tr><td>溫濕度</td><td>溫度約 18～27°C；濕度過高易結露，過低易產生靜電</td></tr>
<tr><td>消防</td><td>機房使用<strong>氣體滅火</strong>（如 FM-200、Novec 1230、惰性氣體），避免水損害設備；使用前須確保人員撤離</td></tr>
<tr><td>其他</td><td>高架地板、漏水偵測、防震、避免設在地下室（淹水）或頂樓</td></tr>
</table></div>
<h3>電力異常名詞</h3>
<ul>
  <li><b>突波（Spike／Surge）</b>：瞬間／短時間高電壓</li>
  <li><b>驟降（Sag／Dip）</b>：短時間低電壓；<b>電壓不足（Brownout）</b>：長時間低電壓</li>
  <li><b>瞬斷（Fault）</b>：短暫斷電；<b>停電（Blackout）</b>：長時間斷電</li>
</ul>
<h3>火災分類（台灣）</h3>
<p>A 類：一般可燃物；B 類：油類；<b>C 類：電氣火災</b>（不可用水）；D 類：金屬火災。</p>` },
    { id: 'media', title: '媒體處置與資料清除', html: `
<p>報廢或轉售的硬碟、USB、紙本若處理不當，資料可能被復原。<b>單純刪除或格式化並不安全</b>。</p>
<div class="table-wrap"><table>
<tr><th>方法</th><th>說明</th><th>安全程度</th></tr>
<tr><td>刪除／快速格式化</td><td>只移除索引，資料仍在</td><td>不安全</td></tr>
<tr><td>覆寫 Overwriting / Clearing</td><td>以隨機資料多次覆寫</td><td>中（適用可重複使用）</td></tr>
<tr><td>消磁 Degaussing</td><td>以強磁場破壞磁性媒體</td><td>高（<strong>對 SSD 無效</strong>）</td></tr>
<tr><td>加密抹除 Crypto Erase</td><td>銷毀加密金鑰，使資料無法解讀</td><td>高（適合 SSD、雲端）</td></tr>
<tr><td>實體破壞 Destruction</td><td>粉碎、焚燒、熔毀、鑽孔</td><td>最高</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b><b>資料殘留（Data Remanence）</b>是指刪除後仍殘存可復原的資料。SSD 因為有損耗平均（Wear Leveling）機制，覆寫不一定能清除所有區塊，最佳做法是加密抹除或實體破壞。</div>` }
  ],
  keypoints: [
    '聘用前背景調查與 NDA；離職立即撤銷帳號與門禁',
    '社交工程最有效防範：資安意識教育訓練',
    '尾隨 → Mantrap；肩窺 → 防窺片；垃圾搜尋 → 碎紙機',
    'UPS 短時供電、發電機長時供電；機房用氣體滅火',
    '格式化不等於清除；消磁對 SSD 無效'
  ]
},
{
  id: 'c06', subject: 1, minutes: 35,
  title: '資安事件管理與數位鑑識',
  summary: '事件與事故的差異、NIST 事件應變生命週期、通報與數位鑑識的證據保全原則。',
  sections: [
    { id: 'def', title: '事件、事故與事件等級', html: `
<ul>
  <li><b>資安事件（Event）</b>：系統、服務或網路中任何可觀察到的狀態變化，不一定有害（例：一次登入失敗）。</li>
  <li><b>資安事故（Incident）</b>：一個或一系列<strong>對營運造成負面影響或威脅資安</strong>的事件（例：帳號被盜、勒索軟體感染）。</li>
  <li><b>弱點（Weakness）</b>：發現可能被利用的缺陷，應通報但尚未發生事故。</li>
</ul>
<div class="box tip"><b class="t">用語提醒</b>台灣《資通安全管理法》中的「資通安全事件」指的是對資通系統造成影響的情況，對應國際上的 Incident。</div>
<h3>台灣資通安全事件等級（資通安全事件通報及應變辦法）</h3>
<p>依影響的 CIA 程度與涉及資訊／業務的重要性分為 <b>1～4 級</b>，<strong>4 級最嚴重</strong>。例如涉及關鍵基礎設施核心業務、國家機密遭洩漏，屬於 4 級。</p>` },
    { id: 'nist', title: 'NIST 事件應變生命週期', html: `
<p>NIST SP 800-61 提出的事件處理生命週期（經典版本）：</p>
<div class="flow">
  <div><b>準備</b><span>Preparation<br>組成 CSIRT、訂程序、工具、演練</span></div>
  <div><b>偵測與分析</b><span>Detection & Analysis<br>發現、判斷、分級、通報</span></div>
  <div><b>圍堵、根除與復原</b><span>Containment, Eradication & Recovery</span></div>
  <div><b>事後活動</b><span>Post-Incident Activity<br>檢討改善、經驗學習</span></div>
</div>
<p>另一常見的 SANS 六步驟：<b>準備 → 識別 → 圍堵 → 根除 → 復原 → 經驗學習</b>（PICERL）。</p>
<ul>
  <li><b>圍堵（Containment）</b>：防止擴散，例如拔網路線、隔離主機、停用帳號。<strong>先圍堵，再根除</strong>。</li>
  <li><b>根除（Eradication）</b>：移除惡意程式、修補漏洞、重設遭盜密碼。</li>
  <li><b>復原（Recovery）</b>：從乾淨備份還原、加強監控、確認恢復正常。</li>
  <li><b>經驗學習（Lessons Learned）</b>：撰寫事件報告、分析根因、更新程序。</li>
</ul>
<div class="box warn"><b class="t">常見錯誤</b>發現主機中毒時，不要急著<b>直接關機或重灌</b>——會毀掉記憶體中的證據。正確做法是先隔離網路、保全證據，再依程序處理。</div>
<div class="box memo"><b class="t">記憶口訣</b>SANS 六步「<b>準・識・圍・根・復・學</b>」</div>` },
    { id: 'report', title: '通報機制', html: `
<p>依《資通安全事件通報及應變辦法》，公務機關與特定非公務機關的重點時限（考試常考）：</p>
<div class="table-wrap"><table>
<tr><th>項目</th><th>時限</th></tr>
<tr><td>知悉資通安全事件後通報</td><td><strong>1 小時內</strong></td></tr>
<tr><td>1、2 級事件完成損害控制或復原</td><td><strong>72 小時內</strong></td></tr>
<tr><td>3、4 級事件完成損害控制或復原</td><td><strong>36 小時內</strong></td></tr>
<tr><td>完成損害控制或復原後，送交調查、處理及改善報告</td><td><strong>1 個月內</strong></td></tr>
</table></div>
<div class="box memo"><b class="t">記憶口訣</b>「<b>1 小時通報；輕 72、重 36；一個月交報告</b>」——等級越嚴重，處理時間越短。</div>
<h3>相關組織</h3>
<ul>
  <li><b>CSIRT</b>（Computer Security Incident Response Team）：組織內部的資安事件應變小組。</li>
  <li><b>SOC</b>（Security Operations Center）：資安監控中心，24×7 監控告警。</li>
  <li><b>TWCERT/CC</b>：台灣電腦網路危機處理暨協調中心，服務企業與民眾的通報協調窗口。</li>
  <li><b>N-ISAC / ISAC</b>：資安資訊分享與分析中心，分享威脅情資。</li>
</ul>
<div class="box tip"><b class="t">個資外洩</b>依《個人資料保護法》，非公務機關發生個資被竊取、洩漏、竄改時，應<b>查明後以適當方式通知當事人</b>；各行業另有向主管機關通報的規定。</div>` },
    { id: 'forensics', title: '數位鑑識基礎', html: `
<p><b>數位鑑識（Digital Forensics）</b>是以科學方法蒐集、保存、分析數位證據，使其能在法庭上被採信。</p>
<div class="flow">
  <div><b>識別</b><span>找出可能證據來源</span></div>
  <div><b>蒐集／保存</b><span>製作映像檔、計算雜湊</span></div>
  <div><b>檢驗分析</b><span>在副本上分析</span></div>
  <div><b>報告</b><span>客觀呈現結果</span></div>
</div>
<h3>關鍵原則</h3>
<ul>
  <li><b>證據監管鏈（Chain of Custody）</b>：記錄證據從取得到出庭的每一次經手人、時間、目的，確保證據<strong>未被竄改</strong>。</li>
  <li><b>完整性驗證</b>：取證時計算雜湊值（如 SHA-256），分析前後比對一致。</li>
  <li><b>只在副本上分析</b>：使用<strong>寫入保護器（Write Blocker）</strong>製作位元對位元（bit-by-bit）映像檔，原始證據保持不動。</li>
  <li><b>揮發性順序（Order of Volatility）</b>：<strong>越容易消失的越先蒐集</strong>。</li>
</ul>
<div class="box exam"><b class="t">揮發性順序（由高到低）</b>CPU 暫存器／快取 → <b>記憶體（RAM）</b>、ARP 快取、路由表、行程 → 暫存檔 → <b>硬碟</b> → 遠端日誌 → 備份與封存媒體（光碟、磁帶）。</div>` }
  ],
  keypoints: [
    'Event 不一定有害；Incident 是造成負面影響的事件',
    'NIST：準備 → 偵測分析 → 圍堵根除復原 → 事後活動',
    '先圍堵再根除；不要急著關機重灌，以免破壞證據',
    '台灣通報：1 小時內；1、2 級 72 小時、3、4 級 36 小時內完成損害控制',
    '證據監管鏈確保證據可信；在映像副本上分析',
    '揮發性高的（記憶體）優先蒐集'
  ]
},
{
  id: 'c07', subject: 1, minutes: 35,
  title: '營運持續與備份',
  summary: 'BCP 與 DRP、營運衝擊分析、RTO/RPO/MTD、備份類型與 3-2-1 原則、備援站點。',
  sections: [
    { id: 'bcm', title: 'BCP 與 DRP', html: `
<ul>
  <li><b>營運持續計畫（BCP, Business Continuity Plan）</b>：確保發生重大災難時，<strong>關鍵業務</strong>仍能持續運作，範圍涵蓋人員、場所、流程、供應鏈。</li>
  <li><b>災難復原計畫（DRP, Disaster Recovery Plan）</b>：聚焦在<strong>IT 系統與資料</strong>的復原，是 BCP 的一部分。</li>
</ul>
<div class="box analogy"><b class="t">生活比喻</b>餐廳失火：BCP 是「先去附近的中央廚房繼續出外送單、通知熟客」；DRP 是「把點餐 POS 系統和會員資料在備用電腦上還原」。</div>
<h3>BCP 制定流程</h3>
<div class="flow">
  <div><b>專案啟動</b><span>取得高層支持、定範圍</span></div>
  <div><b>營運衝擊分析</b><span>BIA</span></div>
  <div><b>擬定策略</b><span>復原策略、備援方案</span></div>
  <div><b>撰寫計畫</b><span>角色、程序、聯絡清單</span></div>
  <div><b>測試演練</b><span>驗證可行性</span></div>
  <div><b>維護更新</b><span>定期審查</span></div>
</div>` },
    { id: 'bia', title: '營運衝擊分析（BIA）與時間指標', html: `
<p><b>BIA（Business Impact Analysis）</b>找出關鍵業務、評估中斷造成的衝擊（財務、法規、商譽），並訂出可容忍的復原時間。</p>
<div class="table-wrap"><table>
<tr><th>指標</th><th>全名</th><th>意義</th></tr>
<tr><td><b>MTD / MTPD</b></td><td>Maximum Tolerable Downtime</td><td>業務<strong>最長可容忍中斷時間</strong>，超過就會造成無法承受的損害</td></tr>
<tr><td><b>RTO</b></td><td>Recovery Time Objective</td><td>系統<strong>必須在多久內恢復</strong>（看「停機時間」），RTO ≤ MTD</td></tr>
<tr><td><b>RPO</b></td><td>Recovery Point Objective</td><td><strong>最多能容忍遺失多少時間的資料</strong>（看「資料遺失」），決定<strong>備份頻率</strong></td></tr>
<tr><td>WRT</td><td>Work Recovery Time</td><td>系統恢復後，驗證資料與回到正常作業所需時間；RTO + WRT ≤ MTD</td></tr>
<tr><td>MTBF</td><td>Mean Time Between Failures</td><td>平均故障間隔時間，越長越可靠</td></tr>
<tr><td>MTTR</td><td>Mean Time To Repair</td><td>平均修復時間，越短越好</td></tr>
</table></div>
<div class="box analogy"><b class="t">時間軸理解</b>災難發生在中午 12:00。<br>RPO = 4 小時 → 最後一次備份最晚要在 08:00，08:00～12:00 的資料可以接受遺失。<br>RTO = 6 小時 → 系統最晚要在 18:00 前恢復上線。</div>
<div class="box memo"><b class="t">記憶口訣</b>R<b>P</b>O 看 <b>P</b>ast（往回看資料遺失多少）；R<b>T</b>O 看 <b>T</b>ime（往後看多久恢復）。RPO 越小 → 備份越頻繁、成本越高。</div>` },
    { id: 'backup', title: '備份類型與策略', html: `
<div class="table-wrap"><table>
<tr><th>類型</th><th>備份內容</th><th>備份速度／空間</th><th>還原需要</th><th>封存位元</th></tr>
<tr><td><b>完整備份 Full</b></td><td>全部資料</td><td>最慢／最大</td><td>最近 1 份完整備份（最快）</td><td>清除</td></tr>
<tr><td><b>差異備份 Differential</b></td><td>自<strong>上次完整備份</strong>後變動的資料（越來越大）</td><td>中</td><td>完整 + <strong>最後一份</strong>差異</td><td>不清除</td></tr>
<tr><td><b>增量備份 Incremental</b></td><td>自<strong>上次任何備份</strong>後變動的資料</td><td>最快／最小</td><td>完整 + <strong>之後所有</strong>增量（最慢）</td><td>清除</td></tr>
</table></div>
<div class="box tip"><b class="t">範例</b>週日做完整備份，週一～週六每天備份，週四當機：<br>• 差異備份 → 還原「週日完整 + 週三差異」，共 2 份。<br>• 增量備份 → 還原「週日完整 + 週一、二、三增量」，共 4 份。</div>
<h3>3-2-1 備份原則</h3>
<p>至少 <b>3</b> 份資料副本、存放在 <b>2</b> 種不同媒體、其中 <b>1</b> 份放在<strong>異地</strong>。面對勒索軟體，進一步建議 <b>3-2-1-1-0</b>：再加 1 份<strong>離線或不可變（Immutable）</strong>備份，且還原驗證 <b>0</b> 錯誤。</p>
<div class="box warn"><b class="t">重要</b>備份<b>一定要定期做還原測試</b>，否則等到需要時才發現無法還原就來不及了。備份媒體也要加密並妥善保管。</div>
<h3>其他資料保護技術</h3>
<ul>
  <li><b>RAID 0</b>：等量分割，提升效能但<strong>無容錯</strong>。</li>
  <li><b>RAID 1</b>：鏡像，一顆壞了另一顆仍有完整資料。</li>
  <li><b>RAID 5</b>：分散式同位元，至少 3 顆，可容忍 1 顆故障。</li>
  <li><b>RAID 6</b>：雙同位元，至少 4 顆，可容忍 2 顆故障。</li>
  <li><b>RAID 10</b>：先鏡像再等量，兼顧效能與容錯。</li>
  <li>RAID 是<strong>高可用性</strong>手段，<b>不能取代備份</b>（誤刪、勒索加密會同步到所有磁碟）。</li>
</ul>` },
    { id: 'sites', title: '備援站點與測試', html: `
<div class="table-wrap"><table>
<tr><th>類型</th><th>準備程度</th><th>啟用時間</th><th>成本</th></tr>
<tr><td><b>鏡像站 Mirror Site</b></td><td>與主站即時同步、同時運作</td><td>幾乎即時</td><td>最高</td></tr>
<tr><td><b>熱站 Hot Site</b></td><td>設備、系統、網路齊備，資料接近即時</td><td>數分鐘～數小時</td><td>高</td></tr>
<tr><td><b>溫站 Warm Site</b></td><td>有部分設備與網路，需安裝與還原資料</td><td>數小時～數天</td><td>中</td></tr>
<tr><td><b>冷站 Cold Site</b></td><td>只有空間、電力、空調</td><td>數天～數週</td><td>最低</td></tr>
</table></div>
<p>RTO 越短，越需要熱站或鏡像站。其他選項：<b>互惠協議</b>（與其他組織互相支援，但難以強制）、<b>行動站</b>、<b>雲端災備（DRaaS）</b>。</p>
<h3>計畫測試方式（由簡到繁）</h3>
<ol>
  <li><b>檢查清單審查（Checklist）</b>：各部門審閱計畫內容。</li>
  <li><b>桌上演練（Tabletop / Walkthrough）</b>：相關人員開會，依情境口頭模擬應變步驟。</li>
  <li><b>模擬演練（Simulation）</b>：模擬災難情境實際操作，但不影響正式營運。</li>
  <li><b>平行測試（Parallel）</b>：在備援站啟動系統，與主站同時運作比對。</li>
  <li><b>完全中斷測試（Full Interruption）</b>：真的關閉主站切換到備援站——最真實也<strong>風險最高</strong>。</li>
</ol>` }
  ],
  keypoints: [
    'BCP 管業務持續；DRP 管 IT 復原，是 BCP 的一部分',
    'BIA 找出關鍵業務並訂定 MTD、RTO、RPO',
    'RTO 看停機時間；RPO 看資料遺失量並決定備份頻率；RTO ≤ MTD',
    '增量備份最快但還原最慢；差異備份還原只需完整 + 最後一份差異',
    '3-2-1：3 份、2 種媒體、1 份異地；備份要做還原測試',
    'RAID 不能取代備份；熱站最快最貴、冷站最慢最便宜'
  ]
},
{
  id: 'c08', subject: 1, minutes: 40,
  title: '資安法規與標準',
  summary: '資通安全管理法、個人資料保護法、營業秘密法、著作權法、刑法妨害電腦使用罪章與 GDPR。',
  sections: [
    { id: 'cyberlaw', title: '資通安全管理法', html: `
<p>《資通安全管理法》（簡稱資安法）於 2019 年施行，主管機關為<strong>數位發展部</strong>（實務由數位發展部資通安全署執行）。2025 年完成修法，強化政府機關資安治理，並明定<strong>危害國家資通安全產品</strong>（如特定中國品牌設備）的使用限制。</p>
<h3>適用對象</h3>
<ul>
  <li><b>公務機關</b>：中央與地方機關、公法人等。</li>
  <li><b>特定非公務機關</b>：<strong>關鍵基礎設施提供者</strong>、<strong>公營事業</strong>、<strong>政府捐助之財團法人</strong>。</li>
</ul>
<h3>資通安全責任等級</h3>
<p>依業務重要性與系統規模分為 <b>A、B、C、D、E</b> 五級，<strong>A 級最高</strong>。等級越高，應辦事項越多（例如：ISMS 導入與驗證、資安專職人員、弱點掃描、滲透測試、資安健診、SOC 監控、EDR、GCB 組態基準、資安教育訓練時數等）。</p>
<h3>主要義務</h3>
<ul>
  <li>訂定、修正並實施<b>資通安全維護計畫</b>，並提出實施情形。</li>
  <li>設置<b>資通安全長</b>（公務機關由副首長或適當人員兼任）。</li>
  <li>建立<b>資通安全事件通報及應變機制</b>（知悉後 1 小時內通報）。</li>
  <li>委外時應監督受託者的資安維護情形。</li>
</ul>
<div class="box tip"><b class="t">子法</b>資通安全管理法施行細則、資通安全責任等級分級辦法、資通安全事件通報及應變辦法、特定非公務機關資通安全維護計畫實施情形稽核辦法、資通安全情資分享辦法等。</div>` },
    { id: 'pdpa', title: '個人資料保護法', html: `
<p><b>個人資料</b>：可<strong>直接或間接識別</strong>特定自然人的資料，例如姓名、出生年月日、身分證統一編號、護照號碼、特徵、指紋、婚姻、家庭、教育、職業、聯絡方式、財務情況、社會活動等。</p>
<h3>特種（敏感）個資——原則上不得蒐集、處理或利用</h3>
<p><b>病歷、醫療、基因、性生活、健康檢查、犯罪前科</b>（第 6 條）。例外：法律明文規定、當事人書面同意等情形。</p>
<div class="box memo"><b class="t">記憶口訣</b>「<b>病・醫・基・性・健・犯</b>」——特種個資六項。</div>
<h3>重要名詞</h3>
<ul>
  <li><b>蒐集</b>：以任何方式取得個資。<b>處理</b>：為建立或利用資料檔案所為的記錄、輸入、儲存、編輯、更正、複製、檢索、刪除、輸出、連結或內部傳送。<b>利用</b>：將個資作處理以外的使用。</li>
  <li>蒐集時應<b>告知</b>當事人：機關名稱、蒐集目的、個資類別、利用期間地區對象方式、當事人權利、不提供的影響。</li>
  <li>利用應在<b>特定目的必要範圍內</b>，目的外利用需符合法定例外（例如經當事人同意）。</li>
</ul>
<h3>當事人五大權利（不得預先拋棄或以特約限制）</h3>
<ol>
  <li>查詢或請求閱覽</li><li>請求製給複製本</li><li>請求補充或更正</li><li>請求停止蒐集、處理或利用</li><li>請求刪除</li>
</ol>
<h3>違法責任</h3>
<ul>
  <li>民事：損害賠償，難以證明實際損害時，每人每一事件新臺幣 <b>500 元以上 2 萬元以下</b>；同一原因事實的總額上限 2 億元（但所涉利益超過者不在此限）。</li>
  <li>行政：非公務機關未採取適當安全措施，可處罰鍰並限期改正（2023 年修法大幅提高罰鍰上限至 1,500 萬元）。</li>
  <li>刑事：意圖不法利益或損害他人利益而違法蒐集利用個資，可處 5 年以下有期徒刑。</li>
</ul>
<p>2023 年修法並規劃成立<b>個人資料保護委員會</b>作為獨立專責機關。</p>` },
    { id: 'gdpr', title: 'GDPR 歐盟一般資料保護規則', html: `
<p>2018 年施行，只要<strong>處理歐盟境內人士的個資</strong>（例如對歐盟提供商品服務），即使公司不在歐盟也適用（域外效力）。</p>
<ul>
  <li><b>當事人權利</b>：存取權、更正權、<b>被遺忘權（刪除權）</b>、限制處理權、<b>資料可攜權</b>、反對權、不受自動化決策拘束的權利。</li>
  <li><b>個資外洩通報</b>：知悉後 <strong>72 小時內</strong>通報監管機關。</li>
  <li><b>資料保護長（DPO）</b>、<b>資料保護影響評估（DPIA）</b>、<b>隱私始於設計（Privacy by Design）</b>。</li>
  <li><b>罰則</b>：最高 <strong>2,000 萬歐元或全球年營業額 4%</strong>，取較高者。</li>
  <li>角色：<b>控管者（Controller）</b>決定目的與方式；<b>處理者（Processor）</b>代為處理。</li>
</ul>
<h3>去識別化技術</h3>
<ul>
  <li><b>匿名化</b>：無法再識別個人，原則上不再屬於個資。</li>
  <li><b>假名化</b>：以代號取代識別資料，搭配額外資訊仍可回溯，仍屬個資。</li>
  <li><b>遮罩（Masking）</b>：如 A12****789，常用於畫面顯示。</li>
</ul>` },
    { id: 'other', title: '其他相關法規', html: `
<div class="table-wrap"><table>
<tr><th>法規</th><th>重點</th></tr>
<tr><td><b>刑法妨害電腦使用罪（第 36 章）</b></td><td>
第 358 條：無故<strong>入侵電腦</strong>（輸入他人帳密、破解保護措施、利用漏洞）<br>
第 359 條：無故取得、刪除或變更他人電磁紀錄<br>
第 360 條：無故以程式干擾他人電腦（如 DDoS）<br>
第 362 條：<strong>製作專供犯罪之電腦程式</strong>（惡意程式）<br>
第 363 條：第 358～360 條為告訴乃論（但對公務機關電腦犯之者除外）</td></tr>
<tr><td><b>營業秘密法</b></td><td>營業秘密三要件：<strong>秘密性</strong>（非一般涉及該類資訊之人所知）、<strong>經濟價值</strong>、<strong>合理保密措施</strong>。2020 年修法增訂偵查保密令。另有國家安全法保護「國家核心關鍵技術」。</td></tr>
<tr><td><b>著作權法</b></td><td>電腦程式為著作；合法持有人可為備份目的重製；不得規避防盜拷措施；未經授權使用盜版軟體觸法。</td></tr>
<tr><td><b>電子簽章法</b></td><td>電子文件與電子簽章在符合條件下具法律效力。</td></tr>
<tr><td><b>專利法、商標法</b></td><td>保護發明技術與品牌識別。</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>營業秘密若公司<b>沒有採取合理保密措施</b>（例如沒有分級標示、沒有存取控制、沒有保密約定），就不受營業秘密法保護。</div>
<div class="box warn"><b class="t">合法的資安測試</b>滲透測試、弱點掃描<b>必須事先取得書面授權</b>並明確界定範圍，否則即使出於善意也可能觸犯刑法第 358 條以下。</div>` }
  ],
  keypoints: [
    '資安法主管機關：數位發展部；適用公務機關與特定非公務機關',
    '特定非公務機關：關鍵基礎設施提供者、公營事業、政府捐助財團法人',
    '責任等級 A～E，A 最高；資安事件知悉 1 小時內通報',
    '特種個資：病歷、醫療、基因、性生活、健康檢查、犯罪前科',
    '當事人五權：查詢閱覽、製給複本、補充更正、停止、刪除',
    'GDPR：72 小時通報、罰 2,000 萬歐元或全球營業額 4%',
    '營業秘密三要件：秘密性、經濟價值、合理保密措施'
  ]
}
);
