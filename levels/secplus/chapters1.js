/* Security+ 第一部分：概念、威脅與架構（Domain 1–3） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 45,
  title: '資安基本概念與控制措施',
  summary: 'Domain 1.1–1.3：控制措施的類別與類型、CIA 與不可否認性、AAA、零信任、實體安全、欺敵技術與變更管理。',
  sections: [
    { id: 'exam', title: '認識 Security+ 考試', html: `
<p>CompTIA Security+ 是國際上最普遍的資安入門證照，也是美國國防部 DoD 8140 認可的基準證照，許多 SOC 分析師、資安工程師職缺都把它列為最低門檻。考試<strong>只有英文等語言版本，沒有中文版</strong>，所以本課程所有關鍵名詞都附上英文原文，請務必連同英文一起記。</p>
<div class="table-wrap"><table>
<tr><th>領域</th><th>英文名稱</th><th>配分</th><th>本課程章節</th></tr>
<tr><td>Domain 1</td><td>General Security Concepts</td><td>12%</td><td>第 1～2 章</td></tr>
<tr><td>Domain 2</td><td>Threats, Vulnerabilities, and Mitigations</td><td>22%</td><td>第 3～5 章</td></tr>
<tr><td>Domain 3</td><td>Security Architecture</td><td>18%</td><td>第 5～6 章</td></tr>
<tr><td>Domain 4</td><td>Security Operations</td><td><b>28%</b></td><td>第 7～10 章</td></tr>
<tr><td>Domain 5</td><td>Security Program Management and Oversight</td><td>20%</td><td>第 11～12 章</td></tr>
</table></div>
<div class="box exam"><b class="t">考試形式</b>最多 90 題、90 分鐘，750 分（滿分 900）及格。除了選擇題，還有<b>實作模擬題（Performance-Based Questions, PBQ）</b>，例如拖曳設定防火牆規則、判讀日誌、配對攻擊與防護。PBQ 通常出現在最前面，很花時間，建議先跳過，最後再回來做。</div>
<div class="box tip"><b class="t">版本提醒</b>CompTIA 預計 2026 年 11 月推出 SY0-801，SY0-701 英文版可考到 2027 年 6 月 11 日。兩版核心觀念大致相同，本課程內容兩版都適用。</div>` },
    { id: 'controls', title: '控制措施的類別與類型', html: `
<p>考題常給一個控制措施，問它屬於哪個<b>類別（Category）</b>或哪種<b>類型（Type）</b>。類別看「由什麼實施」，類型看「發揮什麼作用」，同一個控制可以同時屬於一個類別和一種類型。</p>
<h3>四種類別（Security Control Categories）</h3>
<div class="concepts">
  <div class="concept"><b>技術性 Technical</b><span>由系統實施：防火牆、加密、防毒、MFA</span></div>
  <div class="concept"><b>管理性 Managerial</b><span>政策與規劃面：資安政策、風險評估、安全設計流程</span></div>
  <div class="concept"><b>作業性 Operational</b><span>由人執行：警衛巡邏、教育訓練、事件應變演練</span></div>
  <div class="concept"><b>實體 Physical</b><span>實體限制：門禁、圍牆、鎖、監視器</span></div>
</div>
<h3>六種類型（Control Types）</h3>
<div class="table-wrap"><table>
<tr><th>類型</th><th>作用</th><th>例子</th></tr>
<tr><td><b>預防性 Preventive</b></td><td>阻止事件發生</td><td>防火牆規則、門鎖、帳號鎖定</td></tr>
<tr><td><b>嚇阻性 Deterrent</b></td><td>讓攻擊者打消念頭（不一定能阻止）</td><td>警告標語、登入警示訊息、明顯的監視器</td></tr>
<tr><td><b>偵測性 Detective</b></td><td>發現已發生的事件</td><td>IDS、日誌審查、監視器錄影</td></tr>
<tr><td><b>矯正性 Corrective</b></td><td>事件發生後修正、恢復</td><td>從備份還原、修補漏洞、IPS 中斷連線</td></tr>
<tr><td><b>補償性 Compensating</b></td><td>主要控制無法實施時的替代方案</td><td>舊系統無法修補，改以網段隔離</td></tr>
<tr><td><b>指示性 Directive</b></td><td>要求或指示人員該怎麼做</td><td>政策規定「離開座位須鎖定螢幕」</td></tr>
</table></div>
<div class="box warn"><b class="t">易混淆</b>監視器若只是「掛在那讓人看見」是<b>嚇阻性</b>；若有人在看錄影找出事件是<b>偵測性</b>。題目通常會透過描述暗示其用途。</div>` },
    { id: 'cia', title: 'CIA、不可否認性與 AAA', html: `
<div class="concepts">
  <div class="concept"><b>機密性 Confidentiality</b><span>只有授權者能看到。手段：加密、存取控制、MFA</span></div>
  <div class="concept"><b>完整性 Integrity</b><span>資料未遭竄改。手段：雜湊、數位簽章、憑證</span></div>
  <div class="concept"><b>可用性 Availability</b><span>需要時能使用。手段：備援、備份、修補、DDoS 防護</span></div>
</div>
<p><b>不可否認性（Non-repudiation）</b>：當事人無法否認做過某件事。<strong>數位簽章</strong>同時提供完整性、來源驗證與不可否認性。</p>
<h3>AAA 架構</h3>
<div class="flow">
  <div><b>識別 Identification</b><span>宣稱身分：輸入帳號</span></div>
  <div><b>驗證 Authentication</b><span>證明身分：密碼、MFA</span></div>
  <div><b>授權 Authorization</b><span>決定可存取的資源</span></div>
  <div><b>記錄 Accounting</b><span>留下使用紀錄供稽核</span></div>
</div>
<p>裝置也需要驗證，常用方式是在裝置上安裝由組織<b>憑證機構（CA）</b>簽發的憑證。授權模型可以依使用者個別設定，但規模大時應透過<b>角色或群組</b>授權，較易管理。</p>
<h3>差距分析（Gap Analysis）</h3>
<p>比較組織「目前狀態」與「目標狀態」（例如 NIST、ISO 27001 要求）的差距，產出改善計畫與優先順序。</p>` },
    { id: 'zt', title: '零信任架構', html: `
<p><b>零信任（Zero Trust）</b>的核心是「<strong>永不信任，一律驗證</strong>」：不因為裝置在內網就信任，每一次存取都要驗證身分、裝置狀態與情境。</p>
<h3>控制平面與資料平面</h3>
<div class="table-wrap"><table>
<tr><th>平面</th><th>元件</th><th>功能</th></tr>
<tr><td rowspan="3"><b>控制平面<br>Control Plane</b></td><td>政策引擎 Policy Engine</td><td>依政策決定允許或拒絕</td></tr>
<tr><td>政策管理器 Policy Administrator</td><td>將決定傳達給執行點，建立或中斷連線</td></tr>
<tr><td>適應性身分 Adaptive Identity</td><td>依地點、裝置、行為等情境調整驗證強度</td></tr>
<tr><td rowspan="2"><b>資料平面<br>Data Plane</b></td><td>政策執行點 Policy Enforcement Point</td><td>實際放行或阻擋流量的閘道</td></tr>
<tr><td>受信任區域 Implicit Trust Zones</td><td>通過 PEP 之後的區域</td></tr>
</table></div>
<div class="box memo"><b class="t">記憶法</b>Policy Engine + Policy Administrator 合稱 <b>Policy Decision Point（PDP）</b>，負責「決定」；PEP 負責「執行」。其他相關名詞：<b>減少威脅範圍（Threat Scope Reduction）</b>、<b>政策驅動的存取控制（Policy-driven Access Control）</b>。</div>` },
    { id: 'physical', title: '實體安全與欺敵技術', html: `
<div class="table-wrap"><table>
<tr><th>控制</th><th>說明</th></tr>
<tr><td>防撞柱 Bollards</td><td>阻擋車輛衝撞建築入口</td></tr>
<tr><td>門禁前室 Access Control Vestibule</td><td>兩道門不能同時開啟，防止尾隨（舊稱 Mantrap）</td></tr>
<tr><td>警衛 Security Guard</td><td>可判斷情境的實體控制，常搭配雙人規則（Two-person Integrity）</td></tr>
<tr><td>門禁卡 Access Badge</td><td>識別身分並留下進出紀錄</td></tr>
<tr><td>感測器 Sensors</td><td>紅外線、壓力、微波、超音波</td></tr>
<tr><td>照明、圍籬、監視器</td><td>兼具嚇阻與偵測效果</td></tr>
</table></div>
<h3>欺敵與干擾（Deception and Disruption）</h3>
<ul>
  <li><b>蜜罐 Honeypot</b>：引誘攻擊者的假系統，用來觀察手法。</li>
  <li><b>蜜網 Honeynet</b>：由多個蜜罐組成的假網路。</li>
  <li><b>蜜檔案 Honeyfile</b>：放在共享區的誘餌檔案（例如 passwords.txt），被開啟就告警。</li>
  <li><b>蜜標記 Honeytoken</b>：假的帳號、API 金鑰或資料，一旦出現在外部就代表外洩。</li>
</ul>` },
    { id: 'change', title: '變更管理', html: `
<p>未經控管的變更是系統中斷與資安漏洞的常見原因。<b>變更管理（Change Management）</b>確保每項變更都經過評估、核准、測試與記錄。</p>
<div class="flow">
  <div><b>提出申請</b><span>說明目的、範圍、負責人（Owner）</span></div>
  <div><b>影響分析</b><span>Impact Analysis，評估風險與利害關係人</span></div>
  <div><b>變更委員會核准</b><span>Change Advisory Board（CAB）</span></div>
  <div><b>測試</b><span>於測試環境驗證，準備退回計畫（Backout Plan）</span></div>
  <div><b>維護時段執行</b><span>Maintenance Window</span></div>
  <div><b>更新文件</b><span>網路圖、設定紀錄、版本控制</span></div>
</div>
<h3>技術面考量</h3>
<ul>
  <li><b>允許清單／拒絕清單（Allow list / Deny list）</b>：變更可能需要更新應用程式清單。</li>
  <li><b>受限活動（Restricted Activities）</b>：變更只能做核准範圍內的事。</li>
  <li><b>停機、服務重啟、應用程式重啟</b>：需事先評估與通知。</li>
  <li><b>舊系統（Legacy Applications）</b>與<b>相依性（Dependencies）</b>：一個變更可能牽動其他服務。</li>
</ul>` }
  ],
  keypoints: [
    '控制類別四種：Technical、Managerial、Operational、Physical',
    '控制類型六種：Preventive、Deterrent、Detective、Corrective、Compensating、Directive',
    '數位簽章提供完整性、來源驗證與不可否認性',
    'AAA：Authentication、Authorization、Accounting',
    '零信任：PDP（Policy Engine + Policy Administrator）決定，PEP 執行',
    '蜜罐、蜜網、蜜檔案、蜜標記屬於欺敵技術',
    '變更管理需經 CAB 核准、測試，並準備 Backout Plan'
  ]
},
{
  id: 'c02', subject: 1, minutes: 55,
  title: '密碼學與 PKI',
  summary: 'Domain 1.4：對稱與非對稱加密、金鑰交換、雜湊與數位簽章、混淆技術、PKI 與數位憑證、區塊鏈。',
  sections: [
    { id: 'sym', title: '對稱與非對稱加密', html: `
<div class="table-wrap"><table>
<tr><th></th><th>對稱加密 Symmetric</th><th>非對稱加密 Asymmetric</th></tr>
<tr><td>金鑰</td><td>加解密用同一把金鑰</td><td>公鑰與私鑰成對</td></tr>
<tr><td>速度</td><td><b>快</b>，適合大量資料</td><td>慢，適合少量資料與金鑰交換</td></tr>
<tr><td>問題</td><td>金鑰如何安全分送</td><td>運算成本高</td></tr>
<tr><td>演算法</td><td><b>AES</b>（128/192/256）、3DES（已淘汰）、ChaCha20</td><td><b>RSA</b>、<b>ECC</b>、Diffie-Hellman、DSA</td></tr>
</table></div>
<p>實務上採<b>混合加密</b>：用非對稱加密安全地交換一把<b>工作階段金鑰（Session Key）</b>，再用對稱加密傳送資料，TLS 就是這樣運作。</p>
<div class="box memo"><b class="t">金鑰用法口訣</b><b>加密給對方：用對方的公鑰</b>，只有對方的私鑰能解。<b>簽章證明自己：用自己的私鑰</b>，任何人都能用你的公鑰驗證。</div>
<h3>金鑰長度與交換</h3>
<ul>
  <li>金鑰越長越難暴力破解；ECC 用較短金鑰即可達到與 RSA 同等強度，適合行動裝置與 IoT。</li>
  <li><b>Diffie-Hellman（DH / ECDHE）</b>：雙方在不安全通道上協商出共同金鑰。使用臨時金鑰時可提供<b>完美前向保密（Perfect Forward Secrecy, PFS）</b>：即使伺服器私鑰日後外洩，過去的流量也無法解密。</li>
  <li><b>金鑰延伸（Key Stretching）</b>：以 PBKDF2、bcrypt 反覆雜湊，讓弱密碼也難以暴力破解。</li>
</ul>` },
    { id: 'hash', title: '雜湊、加鹽與數位簽章', html: `
<p><b>雜湊（Hashing）</b>將任意長度資料轉成固定長度的摘要，是<strong>單向</strong>的，無法還原。用途：驗證完整性、儲存密碼。</p>
<ul>
  <li><b>SHA-256</b>：目前常用。<b>MD5、SHA-1</b> 已發現<b>碰撞（Collision）</b>，不應再用於安全用途。</li>
  <li><b>加鹽（Salting）</b>：每個密碼加上隨機值再雜湊，相同密碼也會產生不同雜湊，使<b>彩虹表（Rainbow Table）</b>失效。</li>
  <li><b>HMAC</b>：雜湊加上共享金鑰，同時驗證完整性與來源。</li>
</ul>
<h3>數位簽章流程</h3>
<div class="flow">
  <div><b>寄件者雜湊</b><span>對訊息計算雜湊值</span></div>
  <div><b>私鑰加密雜湊</b><span>產生數位簽章</span></div>
  <div><b>收件者驗證</b><span>用寄件者公鑰解出雜湊</span></div>
  <div><b>比對</b><span>與自己計算的雜湊相同即通過</span></div>
</div>` },
    { id: 'tech', title: '加密技術與混淆', html: `
<div class="table-wrap"><table>
<tr><th>技術</th><th>說明</th></tr>
<tr><td><b>全磁碟加密 FDE</b></td><td>加密整顆硬碟，例如 BitLocker、FileVault</td></tr>
<tr><td>分割區／檔案／磁碟區加密</td><td>EFS 加密單一檔案；資料庫可做欄位或記錄層級加密</td></tr>
<tr><td><b>TPM</b></td><td>主機板上的晶片，安全儲存金鑰、支援 BitLocker 與開機完整性</td></tr>
<tr><td><b>HSM</b></td><td>硬體安全模組，大規模、高效能的金鑰儲存與加密運算，常用於 CA 與金融</td></tr>
<tr><td>金鑰管理系統 KMS</td><td>集中管理金鑰的產生、輪替與存取，雲端常見</td></tr>
<tr><td><b>安全隔區 Secure Enclave</b></td><td>處理器內獨立的安全區域，例如手機儲存生物特徵資料</td></tr>
</table></div>
<h3>混淆（Obfuscation）</h3>
<ul>
  <li><b>隱寫術（Steganography）</b>：把資料藏在圖片、音訊等檔案中，本身不加密。</li>
  <li><b>代碼化（Tokenization）</b>：以無意義的代碼取代敏感資料（如信用卡號），代碼與原值的對照存在安全的系統中。行動支付常用。</li>
  <li><b>資料遮罩（Data Masking）</b>：顯示時隱藏部分內容，例如 ****-****-****-1234。</li>
</ul>
<div class="box warn"><b class="t">易混淆</b>Tokenization 的代碼與原資料<b>沒有數學關係</b>，無法用金鑰解回；加密則可用金鑰解密。</div>` },
    { id: 'pki', title: 'PKI 與數位憑證', html: `
<p><b>公開金鑰基礎建設（Public Key Infrastructure, PKI）</b>是管理數位憑證的整套政策、程序、軟硬體與人員。憑證把「公鑰」與「身分」綁在一起，並由<b>憑證機構（CA）</b>簽章背書。</p>
<h3>憑證生命週期</h3>
<div class="flow">
  <div><b>產生金鑰對</b><span>自行產生公私鑰</span></div>
  <div><b>送出 CSR</b><span>Certificate Signing Request，含公鑰與身分資訊</span></div>
  <div><b>CA 驗證並簽發</b><span>RA 負責驗證身分</span></div>
  <div><b>使用與更新</b><span>到期前更新</span></div>
  <div><b>撤銷</b><span>私鑰外洩時撤銷</span></div>
</div>
<div class="table-wrap"><table>
<tr><th>名詞</th><th>說明</th></tr>
<tr><td>根 CA／中繼 CA</td><td>根憑證離線保存，由中繼 CA 實際簽發，形成<b>信任鏈（Chain of Trust）</b></td></tr>
<tr><td><b>CRL</b></td><td>憑證撤銷清單，由 CA 定期發布</td></tr>
<tr><td><b>OCSP</b></td><td>即時查詢單一憑證狀態；<b>OCSP Stapling</b> 由伺服器附上查詢結果，減少延遲</td></tr>
<tr><td><b>萬用字元憑證 Wildcard</b></td><td>*.example.com 適用所有子網域</td></tr>
<tr><td><b>SAN</b></td><td>主體別名，一張憑證列出多個網域名稱</td></tr>
<tr><td>自簽憑證 Self-signed</td><td>自己簽發，外部不信任，適合內部測試</td></tr>
<tr><td>金鑰託管 Key Escrow</td><td>由第三方保管金鑰備份，以便必要時復原</td></tr>
</table></div>` },
    { id: 'blockchain', title: '區塊鏈', html: `
<p><b>區塊鏈（Blockchain）</b>是分散式帳本（Distributed Ledger），每個區塊包含前一個區塊的雜湊值，任何竄改都會讓後續雜湊不符而被發現，因此具備高度<strong>完整性</strong>。</p>
<p>考試常見的應用：交易紀錄、供應鏈追蹤、數位身分。重點是理解「以雜湊串連區塊、由多個節點共同驗證」的特性。</p>` }
  ],
  keypoints: [
    '對稱加密快，適合大量資料（AES）；非對稱用於金鑰交換與簽章（RSA、ECC）',
    '加密用對方公鑰；簽章用自己私鑰',
    'DHE／ECDHE 提供完美前向保密 PFS',
    'MD5、SHA-1 有碰撞問題；加鹽讓彩虹表失效',
    'TPM 在主機板上存金鑰；HSM 提供大規模金鑰管理',
    'Tokenization 與原值無數學關係；Steganography 是隱藏而非加密',
    'CRL 為撤銷清單；OCSP 即時查詢；Wildcard 涵蓋所有子網域'
  ]
},
{
  id: 'c03', subject: 1, minutes: 45,
  title: '威脅來源與社交工程',
  summary: 'Domain 2.1–2.2：威脅行為者類型與動機、攻擊向量與攻擊面、各種網路釣魚與社交工程手法。',
  sections: [
    { id: 'actors', title: '威脅行為者', html: `
<div class="table-wrap"><table>
<tr><th>行為者</th><th>資源與技術</th><th>主要動機</th></tr>
<tr><td><b>國家級 Nation-state</b></td><td>極高，常屬<b>進階持續性威脅 APT</b></td><td>間諜、破壞、戰爭、政治</td></tr>
<tr><td><b>非技術型攻擊者 Unskilled Attacker</b></td><td>低，使用現成工具（舊稱 Script Kiddie）</td><td>好玩、炫耀、破壞</td></tr>
<tr><td><b>駭客行動主義者 Hacktivist</b></td><td>中，有組織的團體</td><td>政治或社會理念，常用網站置換、DDoS、資料外洩</td></tr>
<tr><td><b>內部威脅 Insider Threat</b></td><td>熟悉內部環境與權限</td><td>報復、金錢</td></tr>
<tr><td><b>組織犯罪 Organized Crime</b></td><td>高，專業分工</td><td><b>金錢</b>：勒索軟體、資料販售</td></tr>
<tr><td><b>影子 IT Shadow IT</b></td><td>員工自行使用未經核准的系統</td><td>方便，非惡意但產生風險</td></tr>
</table></div>
<p>辨別行為者時看三個屬性：<b>內部或外部（Internal/External）</b>、<b>資源與資金（Resources/Funding）</b>、<b>技術程度（Sophistication）</b>。動機還包括資料外洩（Data Exfiltration）、勒索（Blackmail）、服務中斷（Service Disruption）、商業間諜。</p>` },
    { id: 'vectors', title: '攻擊向量與攻擊面', html: `
<p><b>攻擊面（Attack Surface）</b>是所有可能被攻擊的點；<b>攻擊向量（Threat Vector）</b>是攻擊者進入的途徑。</p>
<div class="table-wrap"><table>
<tr><th>攻擊向量</th><th>例子</th></tr>
<tr><td>訊息類 Message-based</td><td>電子郵件、簡訊（SMS）、即時通訊</td></tr>
<tr><td>檔案與圖片</td><td>惡意 PDF、Office 巨集、藏有程式碼的圖片</td></tr>
<tr><td>語音 Voice call</td><td>電話詐騙（Vishing）</td></tr>
<tr><td>可移除式裝置</td><td>故意丟在停車場的 USB 隨身碟</td></tr>
<tr><td>有漏洞的軟體</td><td>用戶端軟體（Client-based）與無代理程式（Agentless）</td></tr>
<tr><td>不受支援的系統</td><td>已停止更新的作業系統</td></tr>
<tr><td>不安全的網路</td><td>無線、有線、藍牙</td></tr>
<tr><td>開放的服務埠、預設帳密</td><td>未關閉的服務、admin/admin</td></tr>
<tr><td>供應鏈</td><td>託管服務供應商（MSP）、廠商、供應商</td></tr>
</table></div>` },
    { id: 'phishing', title: '網路釣魚與冒充', html: `
<div class="table-wrap"><table>
<tr><th>手法</th><th>說明</th></tr>
<tr><td><b>網路釣魚 Phishing</b></td><td>大量寄送假冒郵件，誘騙點擊連結或輸入帳密</td></tr>
<tr><td><b>魚叉式釣魚 Spear Phishing</b></td><td>針對特定人或組織客製化</td></tr>
<tr><td><b>鯨釣 Whaling</b></td><td>鎖定高階主管（CEO、CFO）</td></tr>
<tr><td><b>語音釣魚 Vishing</b></td><td>透過電話</td></tr>
<tr><td><b>簡訊釣魚 Smishing</b></td><td>透過簡訊</td></tr>
<tr><td><b>變臉詐騙 BEC</b></td><td>Business Email Compromise，冒充主管或廠商要求匯款</td></tr>
<tr><td><b>藉口 Pretexting</b></td><td>編造情境取信對方，例如假裝 IT 人員要求密碼</td></tr>
<tr><td><b>假冒網域 Typosquatting</b></td><td>註冊拼錯的網域，如 g00gle.com</td></tr>
<tr><td><b>品牌冒充 Brand Impersonation</b></td><td>仿冒知名品牌網站或郵件</td></tr>
</table></div>
<div class="box tip"><b class="t">釣魚郵件特徵</b>寄件網域不符、制式稱呼、製造急迫感、要求輸入帳密或匯款、連結文字與實際網址不同、附件為可執行檔或含巨集的文件。</div>` },
    { id: 'other', title: '其他社交工程手法', html: `
<ul>
  <li><b>水坑攻擊（Watering Hole）</b>：入侵目標族群常去的網站，等目標造訪時感染。防禦：縱深防禦、即時更新、IPS。</li>
  <li><b>假訊息（Misinformation / Disinformation）</b>：Disinformation 是<strong>刻意</strong>散布的錯誤資訊，常用於影響輿論。</li>
  <li><b>尾隨（Tailgating / Piggybacking）</b>：跟著有權限的人進入管制區域。</li>
  <li><b>肩窺（Shoulder Surfing）</b>：偷看別人輸入密碼或螢幕內容，防禦用防窺片。</li>
  <li><b>垃圾搜尋（Dumpster Diving）</b>：從垃圾中找敏感資料，防禦用碎紙機與上鎖的回收桶。</li>
  <li><b>網址嫁接（Pharming）</b>：竄改 DNS 或 hosts 檔，把正確網址導向假網站。</li>
</ul>
<h3>社交工程利用的心理原則</h3>
<p>權威（Authority）、急迫性（Urgency）、稀缺性（Scarcity）、社會認同（Social Proof）、熟悉感（Familiarity）、恐嚇（Intimidation）。最有效的防禦是<strong>使用者教育訓練與釣魚演練</strong>。</p>` }
  ],
  keypoints: [
    '國家級攻擊者常為 APT；組織犯罪以金錢為動機；Hacktivist 為理念',
    'Shadow IT 是未經核准自行使用的系統，非惡意但有風險',
    'Spear Phishing 鎖定特定人；Whaling 鎖定高階主管',
    'Vishing 電話、Smishing 簡訊、BEC 冒充主管要求匯款',
    'Watering Hole 入侵目標常去的網站',
    'Typosquatting 用拼錯的網域；Pharming 竄改 DNS',
    '社交工程最有效的防禦是教育訓練與演練'
  ]
},
{
  id: 'c04', subject: 1, minutes: 60,
  title: '漏洞、惡意程式與攻擊指標',
  summary: 'Domain 2.3–2.4：應用程式與系統漏洞、雲端與供應鏈風險、惡意程式類型、網路與應用程式攻擊、密碼攻擊與入侵指標（IoC）。',
  sections: [
    { id: 'app', title: '應用程式漏洞', html: `
<div class="table-wrap"><table>
<tr><th>漏洞</th><th>說明</th><th>防禦</th></tr>
<tr><td><b>SQL 注入 SQLi</b></td><td>輸入被當成 SQL 指令執行，例如 <code>' OR 1=1 --</code></td><td><b>參數化查詢</b>、輸入驗證</td></tr>
<tr><td><b>跨站腳本 XSS</b></td><td>在網頁注入惡意腳本，於受害者瀏覽器執行。分為反射型（Reflected / Non-persistent）與儲存型（Stored / Persistent）</td><td>輸出編碼、輸入驗證、CSP</td></tr>
<tr><td><b>緩衝區溢位 Buffer Overflow</b></td><td>寫入資料超過配置空間，覆蓋相鄰記憶體</td><td>邊界檢查、ASLR、DEP</td></tr>
<tr><td><b>記憶體注入 Memory Injection</b></td><td>將惡意程式碼注入其他程序的記憶體，例如 DLL Injection</td><td>EDR、最小權限</td></tr>
<tr><td><b>競爭條件 Race Condition</b></td><td>兩個事件同時發生造成非預期結果；<b>TOCTOU</b>（Time-of-check to time-of-use）是檢查與使用之間狀態被改變</td><td>鎖定機制、交易一致性</td></tr>
<tr><td><b>惡意更新 Malicious Update</b></td><td>更新程式遭植入惡意程式碼</td><td>驗證數位簽章、只從可信來源更新</td></tr>
</table></div>` },
    { id: 'sys', title: '系統、雲端與供應鏈漏洞', html: `
<ul>
  <li><b>作業系統漏洞</b>：需定期修補，修補前先測試。</li>
  <li><b>硬體漏洞</b>：韌體漏洞、<b>生命週期終止（End-of-life, EOL）</b>與<b>停止支援（End-of-service-life）</b>、舊系統（Legacy）。</li>
  <li><b>虛擬化漏洞</b>：<b>VM 逃逸（VM Escape）</b>從虛擬機跳到 Hypervisor 或其他 VM；<b>資源重複使用（Resource Reuse）</b>導致資料殘留。</li>
  <li><b>雲端漏洞</b>：設定錯誤（公開的儲存桶）、存取控制不當、API 未保護、共享責任認知不清。</li>
  <li><b>供應鏈漏洞</b>：服務供應商、硬體供應商、軟體供應商被入侵，例如 SolarWinds 事件。</li>
  <li><b>錯誤設定（Misconfiguration）</b>：開放權限、預設帳密、未關閉的服務埠、不安全協定。</li>
  <li><b>行動裝置</b>：<b>側載（Sideloading）</b>未經官方商店的 App、<b>越獄／Root（Jailbreaking / Rooting）</b>移除系統限制。</li>
  <li><b>零時差（Zero-day）</b>：廠商尚不知道或尚未修補的漏洞，沒有修補程式可用。</li>
</ul>` },
    { id: 'malware', title: '惡意程式類型', html: `
<div class="table-wrap"><table>
<tr><th>類型</th><th>特徵</th></tr>
<tr><td><b>勒索軟體 Ransomware</b></td><td>加密檔案要求贖金，近年常搭配竊取資料進行雙重勒索。防禦重點：<b>離線備份</b></td></tr>
<tr><td><b>病毒 Virus</b></td><td>需要使用者執行才會感染、擴散；包含檔案型、開機型、巨集病毒、<b>無檔案（Fileless）</b>型</td></tr>
<tr><td><b>蠕蟲 Worm</b></td><td><strong>不需使用者介入</strong>，透過網路自我複製擴散，例如 WannaCry</td></tr>
<tr><td><b>木馬 Trojan</b></td><td>偽裝成正常軟體；<b>RAT</b> 提供遠端控制</td></tr>
<tr><td><b>間諜軟體 Spyware</b></td><td>暗中蒐集資訊；<b>鍵盤側錄（Keylogger）</b>記錄按鍵</td></tr>
<tr><td><b>Rootkit</b></td><td>藏在核心層級，隱藏自身與其他惡意程式，難以偵測</td></tr>
<tr><td><b>邏輯炸彈 Logic Bomb</b></td><td>特定條件或時間觸發，常由內部人員植入</td></tr>
<tr><td><b>廣告軟體／臃腫軟體 Bloatware</b></td><td>預裝的多餘軟體，占用資源並擴大攻擊面</td></tr>
<tr><td><b>殭屍網路 Botnet</b></td><td>受控電腦集合，由 C2 伺服器指揮，常用於 DDoS</td></tr>
</table></div>` },
    { id: 'attacks', title: '網路與應用程式攻擊', html: `
<div class="table-wrap"><table>
<tr><th>攻擊</th><th>說明</th></tr>
<tr><td><b>DDoS</b></td><td>大量來源癱瘓服務；<b>放大攻擊（Amplification）</b>利用 DNS、NTP 小請求換大回應；<b>反射攻擊（Reflected）</b>偽造來源 IP 讓回應打向受害者</td></tr>
<tr><td><b>DNS 攻擊</b></td><td>DNS 汙染（Poisoning）、網域劫持（Domain Hijacking）、URL 重新導向</td></tr>
<tr><td><b>中間人 On-path</b></td><td>攔截通訊；<b>ARP 汙染（ARP Poisoning）</b>是區網常見手法</td></tr>
<tr><td><b>重送攻擊 Replay</b></td><td>擷取合法資料後重新送出，例如重送 Session Cookie。防禦：時間戳記、一次性數值（Nonce）</td></tr>
<tr><td><b>無線攻擊</b></td><td><b>邪惡雙胞胎（Evil Twin）</b>假 AP、<b>非法 AP（Rogue AP）</b>未經授權接入的 AP、<b>解除驗證（Deauthentication）</b>、RF 干擾（Jamming）</td></tr>
<tr><td><b>藍牙攻擊</b></td><td>Bluejacking 傳送未經請求的訊息；Bluesnarfing 竊取資料</td></tr>
<tr><td><b>權限提升 Privilege Escalation</b></td><td>垂直提升取得管理員權限；水平移動存取其他使用者資料</td></tr>
<tr><td><b>目錄遍歷 Directory Traversal</b></td><td>以 <code>../</code> 存取網站根目錄以外的檔案</td></tr>
<tr><td><b>CSRF</b></td><td>跨站請求偽造，借用受害者已登入的身分送出請求</td></tr>
<tr><td><b>SSRF</b></td><td>伺服器端請求偽造，讓伺服器替攻擊者存取內部資源</td></tr>
</table></div>` },
    { id: 'pw', title: '密碼攻擊與密碼學攻擊', html: `
<ul>
  <li><b>暴力破解（Brute Force）</b>：嘗試所有組合。線上攻擊會被帳號鎖定擋下，離線攻擊則針對竊得的雜湊檔。</li>
  <li><b>密碼噴灑（Password Spraying）</b>：用少數常見密碼嘗試<strong>大量帳號</strong>，避開帳號鎖定。</li>
  <li><b>字典攻擊（Dictionary）</b>：使用常見密碼清單。</li>
  <li><b>降級攻擊（Downgrade）</b>：強迫雙方使用較弱的協定或加密，例如 SSL Stripping。</li>
  <li><b>碰撞攻擊（Collision）</b>：找出兩個不同輸入產生相同雜湊，MD5 已可被利用。</li>
  <li><b>生日攻擊（Birthday Attack）</b>：利用機率原理，比預期更快找到碰撞。</li>
</ul>` },
    { id: 'ioc', title: '入侵指標（IoC）', html: `
<p><b>入侵指標（Indicators of Compromise, IoC）</b>是系統可能已遭入侵的跡象，也是 SOC 分析師每天在找的東西：</p>
<div class="concepts">
  <div class="concept"><b>帳號鎖定 Account Lockout</b><span>大量失敗登入，可能遭暴力破解</span></div>
  <div class="concept"><b>同時登入 Concurrent Session</b><span>同一帳號同時在多處使用</span></div>
  <div class="concept"><b>不可能的旅行 Impossible Travel</b><span>短時間內從相距遙遠的地點登入</span></div>
  <div class="concept"><b>資源消耗 Resource Consumption</b><span>頻寬、CPU 異常飆高，可能在外傳資料或挖礦</span></div>
  <div class="concept"><b>資源無法存取 Resource Inaccessibility</b><span>檔案被加密或服務中斷</span></div>
  <div class="concept"><b>日誌缺漏 Missing Logs</b><span>攻擊者清除紀錄以掩蓋行蹤</span></div>
  <div class="concept"><b>封鎖的內容 Blocked Content</b><span>安全軟體被停用或特定網站無法存取</span></div>
  <div class="concept"><b>異常的發布或文件化</b><span>網站被置換、資料出現在外部</span></div>
</div>` }
  ],
  keypoints: [
    'SQLi 用參數化查詢防禦；XSS 用輸出編碼與 CSP',
    'Race Condition 中的 TOCTOU：檢查與使用之間狀態被改變',
    'VM Escape 從虛擬機跳出攻擊 Hypervisor',
    '蠕蟲不需使用者介入即可擴散；病毒需要執行',
    'Rootkit 藏在核心層級；Logic Bomb 條件觸發',
    'Password Spraying 少數密碼試大量帳號；Replay 重送擷取的資料',
    'Evil Twin 是假冒的 AP；Rogue AP 是未經授權接入的 AP',
    'IoC：Impossible Travel、Concurrent Session、Missing Logs、資源異常'
  ]
},
{
  id: 'c05', subject: 1, minutes: 50,
  title: '緩解措施與安全架構',
  summary: 'Domain 2.5、3.1：網路分段、存取控制、應用程式允許清單、強化技術，以及雲端、IaC、無伺服器、微服務、IoT 與 ICS 等架構的安全考量。',
  sections: [
    { id: 'mitigate', title: '常見緩解技術', html: `
<div class="table-wrap"><table>
<tr><th>技術</th><th>說明</th></tr>
<tr><td><b>分段 Segmentation</b></td><td>以 VLAN、子網路、防火牆劃分網路，限制橫向移動</td></tr>
<tr><td><b>存取控制清單 ACL</b></td><td>依來源、目的、埠號允許或拒絕</td></tr>
<tr><td><b>應用程式允許清單 Application Allow List</b></td><td>只有清單上的程式能執行，比拒絕清單更安全</td></tr>
<tr><td><b>隔離 Isolation</b></td><td>把可疑或受感染的系統隔開</td></tr>
<tr><td><b>修補 Patching</b></td><td>定期更新作業系統、應用程式與韌體</td></tr>
<tr><td><b>最小權限 Least Privilege</b></td><td>只給完成工作所需的權限</td></tr>
<tr><td><b>停用不必要的服務與埠</b></td><td>縮小攻擊面</td></tr>
<tr><td><b>汰除 Decommissioning</b></td><td>淘汰設備時清除資料並移出清單</td></tr>
</table></div>
<h3>系統強化（Hardening）</h3>
<ul>
  <li>端點偵測與回應（EDR）、主機型防火牆（Host-based Firewall）、主機型入侵防禦系統（HIPS）。</li>
  <li>變更預設密碼、移除不必要的軟體、加密、記錄與監控。</li>
</ul>` },
    { id: 'cloud', title: '雲端與現代架構', html: `
<h3>共享責任模型（Shared Responsibility Model）</h3>
<div class="table-wrap"><table>
<tr><th>模型</th><th>雲端供應商負責</th><th>客戶負責</th></tr>
<tr><td><b>IaaS</b></td><td>實體、網路、虛擬化</td><td>作業系統、應用程式、資料、身分</td></tr>
<tr><td><b>PaaS</b></td><td>加上作業系統與執行環境</td><td>應用程式、資料、身分</td></tr>
<tr><td><b>SaaS</b></td><td>幾乎全部</td><td><b>資料與使用者帳號存取</b></td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>無論哪種模型，<b>資料與帳號權限</b>永遠是客戶的責任。</div>
<h3>架構類型</h3>
<ul>
  <li><b>混合雲（Hybrid Cloud）</b>：公有雲與私有雲組合，需注意兩者間的身分整合與資料傳輸安全。</li>
  <li><b>基礎設施即程式碼（Infrastructure as Code, IaC）</b>：以程式碼定義環境，一致、可重複、可版本控制，但範本錯誤會大量複製。</li>
  <li><b>無伺服器（Serverless）</b>：只寫函式，由雲端管理伺服器。</li>
  <li><b>微服務（Microservices）</b>：以 API 串接的小型服務，可個別擴充，API 安全是重點。</li>
  <li><b>軟體定義網路（SDN）</b>：分為控制平面（Control Plane）與資料平面（Data Plane），集中管理網路。</li>
  <li><b>實體隔離（Air-gapped）</b>：與其他網路完全斷開，用於高機密環境。</li>
  <li><b>容器化（Containerization）</b>：共用主機核心，比 VM 輕量，但隔離性較低。</li>
</ul>` },
    { id: 'special', title: 'IoT、ICS 與嵌入式系統', html: `
<ul>
  <li><b>工業控制系統（ICS）／SCADA</b>：控制電力、水處理、製造產線，<strong>可用性與人身安全優先</strong>，常需網路隔離。</li>
  <li><b>即時作業系統（RTOS）</b>：必須在嚴格時限內回應，例如工業設備、汽車，修補困難。</li>
  <li><b>嵌入式系統（Embedded Systems）</b>：功能固定，通常無法安裝防毒。</li>
  <li><b>物聯網（IoT）</b>：預設密碼、少有更新，應放在獨立網段。</li>
</ul>
<h3>架構考量因素</h3>
<p>選擇架構時要權衡：可用性（Availability）、韌性（Resilience）、成本、回應能力（Responsiveness）、擴充性（Scalability）、部署容易度、風險轉移、修補能力、電力與運算資源。</p>` }
  ],
  keypoints: [
    'Application Allow List 比 Deny List 更安全',
    '分段（VLAN、子網路）限制橫向移動',
    '共享責任：SaaS 客戶仍要負責資料與帳號存取',
    'IaC 提供一致性，但範本錯誤會大量複製',
    'SDN 分控制平面與資料平面',
    'ICS／SCADA 以可用性與人身安全優先，RTOS 修補困難'
  ]
},
{
  id: 'c06', subject: 1, minutes: 60,
  title: '網路安全設備、資料保護與韌性',
  summary: 'Domain 3.2–3.4：防火牆、IDS/IPS、Proxy、負載平衡、VPN、網路存取控制，資料分類與狀態、資料保護方法，以及高可用性、備份與災難復原。',
  sections: [
    { id: 'devices', title: '網路安全設備', html: `
<div class="table-wrap"><table>
<tr><th>設備</th><th>說明</th></tr>
<tr><td><b>次世代防火牆 NGFW</b></td><td>能辨識應用程式（Layer 7），整合 IPS、URL 過濾</td></tr>
<tr><td><b>網頁應用程式防火牆 WAF</b></td><td>保護網站，阻擋 SQLi、XSS 等攻擊</td></tr>
<tr><td><b>整合式威脅管理 UTM</b></td><td>防火牆、防毒、IPS、內容過濾整合在一台</td></tr>
<tr><td><b>IDS／IPS</b></td><td>IDS 只偵測告警；IPS <strong>串接（Inline）</strong>在流量路徑上，可直接阻擋</td></tr>
<tr><td><b>代理伺服器 Proxy</b></td><td>正向 Proxy 代理內部使用者上網；反向 Proxy 保護後端伺服器</td></tr>
<tr><td><b>負載平衡 Load Balancer</b></td><td>分散流量；主動／主動（Active/Active）或主動／被動（Active/Passive）</td></tr>
<tr><td><b>跳板主機 Jump Server</b></td><td>管理人員先登入跳板，再連到內部系統</td></tr>
<tr><td><b>感測器、收集器</b></td><td>蒐集日誌與流量送往 SIEM</td></tr>
</table></div>
<h3>部署方式</h3>
<ul>
  <li><b>串接（Inline）</b> vs. <b>監聽（Tap / Monitor）</b>：串接可阻擋但故障會影響流量；監聽只能偵測。</li>
  <li><b>故障開放（Fail-open）</b>：故障時讓流量通過，重視可用性。<b>故障關閉（Fail-closed）</b>：故障時阻擋流量，重視安全。</li>
  <li><b>IDS／IPS 偵測方式</b>：特徵碼（Signature-based）比對已知攻擊；異常（Anomaly / Behavior-based）比對正常基準，可發現未知攻擊但誤報較多。</li>
</ul>` },
    { id: 'access', title: '安全通訊與存取', html: `
<ul>
  <li><b>VPN</b>：IPSec（網路層，常用於站對站）、SSL/TLS VPN（瀏覽器即可使用，常用於遠端存取）。<b>全通道（Full Tunnel）</b>所有流量經 VPN；<b>分割通道（Split Tunnel）</b>只有公司流量經 VPN。</li>
  <li><b>802.1X</b>：以埠為基礎的網路存取控制（Port-based NAC），搭配 RADIUS 驗證，未驗證的裝置無法使用網路埠。</li>
  <li><b>埠安全（Port Security）</b>：限制交換器埠允許的 MAC 位址。</li>
  <li><b>SD-WAN</b>：以軟體管理廣域網路，直接連雲端服務。</li>
  <li><b>SASE</b>：Secure Access Service Edge，將網路與安全功能（SWG、CASB、ZTNA）以雲端服務提供。</li>
</ul>
<p>可以到「互動練習」用<b>埠號練習</b>熟記常見服務的埠號，考試很常出現。</p>` },
    { id: 'data', title: '資料分類與保護', html: `
<h3>資料分類（Data Classification）</h3>
<p>常見分級：<b>Public（公開）</b>、<b>Private（私人）</b>、<b>Sensitive（敏感）</b>、<b>Confidential（機密）</b>、<b>Restricted（限制）</b>、<b>Critical（關鍵）</b>。資料類型包括受法規規範的資料、營業秘密、智慧財產、法律與財務資訊。</p>
<h3>資料的三種狀態</h3>
<div class="concepts">
  <div class="concept"><b>靜態 Data at Rest</b><span>儲存在硬碟、資料庫。保護：全磁碟加密、資料庫加密</span></div>
  <div class="concept"><b>傳輸中 Data in Transit</b><span>在網路上傳送。保護：TLS、IPSec</span></div>
  <div class="concept"><b>使用中 Data in Use</b><span>在記憶體或 CPU 中處理。保護：安全隔區、機密運算</span></div>
</div>
<h3>資料保護方法</h3>
<ul>
  <li><b>地理限制（Geographic Restrictions）</b>與<b>資料主權（Data Sovereignty）</b>：資料受所在國法律管轄。</li>
  <li>加密、雜湊、遮罩、代碼化、混淆、分段、權限限制。</li>
  <li><b>資料外洩防護（DLP）</b>：偵測並阻擋敏感資料（如身分證號、信用卡號）外傳。</li>
</ul>` },
    { id: 'resilience', title: '高可用性與韌性', html: `
<ul>
  <li><b>高可用性（High Availability）</b>：叢集（Clustering）、負載平衡，讓服務持續運作。</li>
  <li><b>站點備援</b>：</li>
</ul>
<div class="table-wrap"><table>
<tr><th>站點</th><th>準備程度</th><th>啟用時間</th><th>成本</th></tr>
<tr><td><b>熱站 Hot Site</b></td><td>設備、資料即時同步</td><td>最快</td><td>最高</td></tr>
<tr><td><b>溫站 Warm Site</b></td><td>有設備，資料需還原</td><td>數小時到數天</td><td>中</td></tr>
<tr><td><b>冷站 Cold Site</b></td><td>只有空間與電力</td><td>最慢</td><td>最低</td></tr>
</table></div>
<ul>
  <li><b>地理分散（Geographic Dispersion）</b>：備援站要離主站夠遠，避免同一場天災影響。</li>
  <li><b>平台多樣性（Platform Diversity）</b>與<b>多雲（Multi-cloud）</b>：避免單一廠商故障或漏洞影響全部。</li>
  <li><b>容量規劃（Capacity Planning）</b>：人員、技術、基礎設施要能應付需求變化。</li>
  <li><b>電力</b>：<b>UPS</b> 提供短時間電力，撐到<b>發電機（Generator）</b>啟動。</li>
</ul>` },
    { id: 'backup', title: '備份與復原測試', html: `
<div class="table-wrap"><table>
<tr><th>類型</th><th>備份內容</th><th>還原需要</th></tr>
<tr><td><b>完整備份 Full</b></td><td>全部資料</td><td>一份</td></tr>
<tr><td><b>增量備份 Incremental</b></td><td>上次任何備份後的變更</td><td>完整備份 + <b>所有</b>增量備份</td></tr>
<tr><td><b>差異備份 Differential</b></td><td>上次完整備份後的變更</td><td>完整備份 + <b>最後一份</b>差異備份</td></tr>
</table></div>
<ul>
  <li><b>快照（Snapshot）</b>：記錄 VM 某時間點狀態。<b>複寫（Replication）</b>：即時同步到其他位置。<b>日誌（Journaling）</b>：記錄變更以便回復。</li>
  <li><b>異地與離線備份</b>：防止勒索軟體同時加密備份。備份也要<b>加密</b>，並定期<b>測試還原</b>。</li>
  <li><b>復原測試</b>：<b>桌上演練（Tabletop Exercise）</b>以討論方式模擬；<b>容錯移轉（Failover）</b>實際切換；<b>模擬（Simulation）</b>；<b>平行處理（Parallel Processing）</b>同時在主備系統運作。</li>
</ul>
<p>可以到「互動練習」使用<b>備份還原模擬</b>，比較增量與差異備份的差別。</p>` }
  ],
  keypoints: [
    'NGFW 能辨識應用程式；WAF 保護網站；IPS 串接可阻擋',
    'Fail-open 重可用性；Fail-closed 重安全',
    '特徵碼偵測已知攻擊；異常偵測可發現未知攻擊但誤報多',
    '802.1X 是以埠為基礎的 NAC，搭配 RADIUS',
    '資料三狀態：At rest、In transit、In use',
    '熱站最快最貴；冷站最慢最便宜',
    '增量備份還原需要全部增量；差異備份只需最後一份'
  ]
}
);
