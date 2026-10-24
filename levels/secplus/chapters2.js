/* Security+ 第二部分：維運與治理（Domain 4–5） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 55,
  title: '強化、資產與弱點管理',
  summary: 'Domain 4.1–4.3：安全基準與系統強化、無線與行動裝置安全、應用程式安全、資產管理、弱點掃描、威脅情資與弱點修補。',
  sections: [
    { id: 'baseline', title: '安全基準與強化目標', html: `
<p><b>安全基準（Secure Baseline）</b>是系統的標準安全設定。流程是<b>建立（Establish）→ 部署（Deploy）→ 維護（Maintain）</b>，常以 CIS Benchmarks 為參考，透過群組原則（GPO）或組態管理工具大量套用。</p>
<div class="table-wrap"><table>
<tr><th>強化目標</th><th>重點</th></tr>
<tr><td>行動裝置</td><td>MDM 集中管理、強制鎖定與加密、遠端抹除</td></tr>
<tr><td>工作站與伺服器</td><td>修補、移除不必要軟體、EDR、主機防火牆</td></tr>
<tr><td>交換器與路由器</td><td>更改預設帳密、停用 Telnet 改用 SSH、管理介面隔離</td></tr>
<tr><td>雲端</td><td>最小權限的 IAM、啟用日誌、檢查公開資源</td></tr>
<tr><td>ICS／SCADA、嵌入式、RTOS、IoT</td><td>網路隔離、廠商支援的韌體更新</td></tr>
</table></div>` },
    { id: 'wireless', title: '無線與行動裝置安全', html: `
<h3>無線安全設定</h3>
<ul>
  <li><b>WPA3</b>：以 <b>SAE（Simultaneous Authentication of Equals）</b>取代 WPA2 的預先共用金鑰（PSK），可抵抗離線字典攻擊，並提供前向保密。</li>
  <li><b>企業模式（Enterprise）</b>：以 <b>802.1X + RADIUS</b> 為每位使用者個別驗證。<b>EAP</b> 是驗證框架，EAP-TLS 使用憑證最安全。</li>
  <li><b>站點勘查（Site Survey）</b>與<b>熱度圖（Heat Map）</b>：規劃 AP 位置、找出非法 AP。</li>
</ul>
<h3>行動裝置部署模型</h3>
<div class="table-wrap"><table>
<tr><th>模型</th><th>說明</th></tr>
<tr><td><b>BYOD</b></td><td>員工自帶裝置，公司資料與個人資料混在一起，常用容器化（Containerization）分隔</td></tr>
<tr><td><b>COPE</b></td><td>公司擁有、允許個人使用</td></tr>
<tr><td><b>CYOD</b></td><td>員工從公司核准清單中挑選裝置</td></tr>
</table></div>` },
    { id: 'appsec', title: '應用程式安全與資產管理', html: `
<h3>應用程式安全</h3>
<ul>
  <li><b>輸入驗證（Input Validation）</b>：所有輸入都應檢查格式與長度。</li>
  <li><b>安全 Cookie</b>：設定 Secure、HttpOnly 屬性。</li>
  <li><b>程式碼簽章（Code Signing）</b>：確認程式來源且未遭竄改。</li>
  <li><b>靜態分析（SAST）</b>檢查原始碼；<b>動態分析（DAST）</b>測試執行中的程式。</li>
  <li><b>沙箱（Sandboxing）</b>：在隔離環境執行，限制對系統的影響。</li>
</ul>
<h3>資產管理</h3>
<p>資產的生命週期：<b>取得與採購 → 指派與歸屬（Ownership）→ 分類 → 監控與盤點（Inventory）→ 汰除與處置</b>。處置資料時：</p>
<ul>
  <li><b>清除（Sanitization）</b>：以覆寫等方式清除資料，裝置可再利用。</li>
  <li><b>實體銷毀（Destruction）</b>：粉碎、消磁（Degaussing）、焚燒，並取得<b>銷毀證明（Certification）</b>。</li>
  <li><b>資料保存（Data Retention）</b>：依法規保留必要期間。</li>
</ul>` },
    { id: 'vuln', title: '弱點掃描與威脅情資', html: `
<h3>弱點識別方式</h3>
<ul>
  <li><b>弱點掃描（Vulnerability Scan）</b>：<b>有憑證掃描（Credentialed）</b>以帳號登入檢查，結果更完整；<b>無憑證掃描（Non-credentialed）</b>模擬外部攻擊者視角。</li>
  <li><b>應用程式安全測試</b>：靜態分析、動態分析、套件監控。</li>
  <li><b>滲透測試（Penetration Testing）</b>：實際嘗試利用漏洞。</li>
  <li><b>漏洞獎勵計畫（Bug Bounty）</b>與<b>負責任揭露（Responsible Disclosure）</b>。</li>
  <li><b>稽核（Audit）</b>與系統/程序檢視。</li>
</ul>
<h3>威脅情資來源（Threat Intelligence）</h3>
<ul>
  <li><b>OSINT</b>：公開來源情報。</li>
  <li><b>專有／第三方情資</b>：付費威脅情資服務。</li>
  <li><b>資訊分享組織（ISAC）</b>：同產業互相分享，例如金融業 F-ISAC。</li>
  <li><b>暗網（Dark Web）</b>：監控是否有公司資料或帳密被販售。</li>
</ul>` },
    { id: 'analysis', title: '弱點分析與修補', html: `
<h3>分析弱點</h3>
<ul>
  <li><b>CVE</b>：漏洞的統一編號，例如 CVE-2021-44228（Log4Shell）。</li>
  <li><b>CVSS</b>：嚴重程度評分 0～10。0.1–3.9 Low、4.0–6.9 Medium、7.0–8.9 High、<b>9.0–10.0 Critical</b>。</li>
  <li><b>誤報（False Positive）</b>：報告有漏洞但其實沒有。<b>漏報（False Negative）</b>：有漏洞但沒偵測到，<strong>更危險</strong>。</li>
  <li>排序時考慮：資產重要性、曝露程度（Exposure Factor）、環境變數、風險容忍度。</li>
</ul>
<h3>修補方式</h3>
<ul>
  <li><b>修補（Patching）</b>：最直接的方式。</li>
  <li><b>保險（Insurance）</b>：轉移財務損失。</li>
  <li><b>分段（Segmentation）</b>：無法修補時以網路隔離作為<b>補償性控制</b>。</li>
  <li><b>例外與豁免（Exceptions and Exemptions）</b>：經正式核准暫不修補。</li>
</ul>
<p><b>驗證修補</b>：修補後重新掃描（Rescanning）、稽核、確認，最後產出報告。</p>
<p>可以到「互動練習」使用 <b>CVSS 3.1 計算器</b>試算分數。</p>` }
  ],
  keypoints: [
    '安全基準：建立、部署、維護；常參考 CIS Benchmarks',
    'WPA3 使用 SAE 取代 PSK；企業模式用 802.1X + RADIUS',
    'BYOD 自帶、COPE 公司擁有可個人用、CYOD 從核准清單選',
    '有憑證掃描結果較完整；無憑證掃描模擬外部視角',
    'False Negative 比 False Positive 更危險',
    'CVSS 9.0 以上為 Critical；無法修補時用分段作補償控制'
  ]
},
{
  id: 'c08', subject: 2, minutes: 60,
  title: 'SOC 監控與企業安全工具',
  summary: 'Domain 4.4–4.5：SOC 的工作與監控流程、SIEM、日誌彙整與告警調校、安全工具，以及防火牆、網頁過濾、安全協定、電子郵件安全與端點防護。',
  sections: [
    { id: 'soc', title: 'SOC 與監控流程', html: `
<p><b>資安維運中心（Security Operations Center, SOC）</b>全天候監控組織的安全狀態。SOC 分析師的日常，就是 Security+ Domain 4 的內容。</p>
<div class="flow">
  <div><b>日誌彙整 Log Aggregation</b><span>從防火牆、伺服器、端點、雲端集中收集</span></div>
  <div><b>告警 Alerting</b><span>依規則或異常產生告警</span></div>
  <div><b>掃描與報告</b><span>定期掃描與產出報告</span></div>
  <div><b>封存 Archiving</b><span>依保存政策長期保存</span></div>
  <div><b>告警回應與修正</b><span>隔離（Quarantine）、調校（Alert Tuning）</span></div>
</div>
<div class="table-wrap"><table>
<tr><th>層級</th><th>主要工作</th></tr>
<tr><td>Tier 1 分析師</td><td>監看告警、初步分類（Triage）、排除誤報、升級案件</td></tr>
<tr><td>Tier 2 分析師</td><td>深入調查、事件應變</td></tr>
<tr><td>Tier 3 分析師</td><td>威脅獵捕（Threat Hunting）、惡意程式分析、偵測規則開發</td></tr>
</table></div>
<div class="box tip"><b class="t">告警調校</b>告警太多會造成<b>告警疲乏（Alert Fatigue）</b>，真正的攻擊被淹沒。調校（Tuning）就是調整規則，減少誤報、保留真正有價值的告警。</div>` },
    { id: 'siem', title: 'SIEM 與安全工具', html: `
<p><b>SIEM（Security Information and Event Management）</b>集中收集、正規化與關聯分析日誌，是 SOC 最核心的工具。常見產品：Splunk、Microsoft Sentinel、Elastic、QRadar。</p>
<div class="table-wrap"><table>
<tr><th>工具</th><th>用途</th></tr>
<tr><td><b>SIEM</b></td><td>日誌彙整、關聯分析、告警、儀表板</td></tr>
<tr><td><b>SOAR</b></td><td>以劇本（Playbook）自動化回應，例如自動封鎖 IP</td></tr>
<tr><td><b>SCAP</b></td><td>安全內容自動化協定，讓不同工具用一致格式評估設定</td></tr>
<tr><td><b>Benchmarks</b></td><td>以 CIS 等基準檢查設定是否符合</td></tr>
<tr><td><b>代理程式 Agent／無代理 Agentless</b></td><td>安裝程式蒐集資料，或透過遠端查詢</td></tr>
<tr><td><b>SNMP traps</b></td><td>網路設備主動送出告警</td></tr>
<tr><td><b>NetFlow</b></td><td>記錄流量的來源、目的與數量統計（不含內容）</td></tr>
<tr><td><b>防毒 Antivirus、DLP</b></td><td>偵測惡意程式、阻擋敏感資料外洩</td></tr>
<tr><td><b>弱點掃描器</b></td><td>例如 Nessus、OpenVAS</td></tr>
</table></div>` },
    { id: 'firewall', title: '防火牆與網頁過濾', html: `
<h3>防火牆規則</h3>
<p>規則由上往下比對，<strong>第一條符合的規則生效</strong>，最後一條通常是<b>隱含拒絕（Implicit Deny）</b>。規則包含來源 IP、目的 IP、協定、埠號與動作（Allow／Deny）。</p>
<h3>網頁過濾（Web Filtering）</h3>
<ul>
  <li><b>代理程式型（Agent-based）</b>：裝在電腦上，在公司外也有效。</li>
  <li><b>集中式 Proxy</b>：所有流量經過代理伺服器檢查。</li>
  <li><b>URL 掃描、內容分類（Content Categorization）</b>、封鎖規則、信譽評分（Reputation）。</li>
  <li><b>DNS 過濾</b>：在名稱解析階段就封鎖惡意網域。</li>
</ul>` },
    { id: 'protocols', title: '安全協定', html: `
<div class="table-wrap"><table>
<tr><th>不安全</th><th>安全替代</th><th>埠號</th></tr>
<tr><td>Telnet（23）</td><td><b>SSH</b></td><td>22</td></tr>
<tr><td>FTP（20/21）</td><td><b>SFTP</b>（透過 SSH）或 FTPS</td><td>22 / 990</td></tr>
<tr><td>HTTP（80）</td><td><b>HTTPS</b></td><td>443</td></tr>
<tr><td>LDAP（389）</td><td><b>LDAPS</b></td><td>636</td></tr>
<tr><td>SMTP（25）</td><td>SMTP + STARTTLS／SMTPS</td><td>587 / 465</td></tr>
<tr><td>IMAP（143）／POP3（110）</td><td>IMAPS／POP3S</td><td>993 / 995</td></tr>
<tr><td>SNMPv1/v2</td><td><b>SNMPv3</b>（加密與驗證）</td><td>161</td></tr>
<tr><td>DNS（53）</td><td><b>DNSSEC</b>（驗證回應完整性）</td><td>53</td></tr>
</table></div>
<div class="box warn"><b class="t">易混淆</b>DNSSEC 提供<b>完整性與來源驗證</b>，並<b>不加密</b>查詢內容。</div>` },
    { id: 'email', title: '電子郵件與端點安全', html: `
<h3>電子郵件驗證三件套</h3>
<div class="concepts">
  <div class="concept"><b>SPF</b><span>DNS 記錄列出允許代表網域寄信的伺服器</span></div>
  <div class="concept"><b>DKIM</b><span>寄件伺服器對郵件數位簽章，收件端以 DNS 中的公鑰驗證</span></div>
  <div class="concept"><b>DMARC</b><span>規定 SPF/DKIM 驗證失敗時的處置（none、quarantine、reject）並回報</span></div>
</div>
<p>另外還有<b>郵件閘道（Email Gateway）</b>過濾垃圾郵件與惡意附件。</p>
<h3>端點安全</h3>
<ul>
  <li><b>EDR</b>（Endpoint Detection and Response）：持續監控端點行為，可偵測並自動回應，例如隔離主機、終止程序。</li>
  <li><b>XDR</b>（Extended Detection and Response）：整合端點、網路、雲端、郵件等多來源資料。</li>
  <li><b>使用者行為分析（UBA／UEBA）</b>：建立正常行為基準，找出異常。</li>
  <li><b>檔案完整性監控（FIM）</b>：偵測重要系統檔案被修改。</li>
  <li><b>網路存取控制（NAC）</b>：檢查裝置狀態（Posture）後才允許連網。</li>
  <li><b>作業系統安全</b>：群組原則（Group Policy）、SELinux 強制存取控制。</li>
</ul>` }
  ],
  keypoints: [
    'SOC 流程：日誌彙整、告警、掃描報告、封存、回應與調校',
    'SIEM 集中收集與關聯分析日誌；SOAR 以劇本自動化回應',
    '告警太多造成 Alert Fatigue，需要 Tuning',
    'NetFlow 記錄流量統計，不含內容',
    '防火牆規則由上往下比對，最後是 Implicit Deny',
    'SPF 授權寄件伺服器、DKIM 簽章、DMARC 決定處置',
    'DNSSEC 驗證完整性但不加密',
    'EDR 監控端點並可自動回應；XDR 整合多種來源'
  ]
},
{
  id: 'c09', subject: 2, minutes: 50,
  title: '身分與存取管理、自動化',
  summary: 'Domain 4.6–4.7：帳號生命週期、單一登入與聯合身分、存取控制模型、多因子驗證、密碼管理、特權存取管理，以及資安自動化與編排。',
  sections: [
    { id: 'iam', title: '身分管理與單一登入', html: `
<ul>
  <li><b>帳號佈建與撤銷（Provisioning / Deprovisioning）</b>：到職建立帳號、離職立即停用，異動時移除舊權限。</li>
  <li><b>權限分配</b>、<b>身分證明（Identity Proofing）</b>。</li>
  <li><b>單一登入（SSO）</b>：登入一次即可使用多個系統，<strong>務必搭配 MFA</strong>。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>技術</th><th>說明</th></tr>
<tr><td><b>LDAP</b></td><td>查詢目錄服務（如 Active Directory）的協定</td></tr>
<tr><td><b>SAML</b></td><td>以 XML 交換驗證資訊，常用於企業網頁 SSO。角色：身分提供者（IdP）與服務提供者（SP）</td></tr>
<tr><td><b>OAuth 2.0</b></td><td><strong>授權</strong>框架，讓第三方 App 存取資源而不需取得密碼</td></tr>
<tr><td><b>OpenID Connect</b></td><td>建立在 OAuth 上的<strong>驗證</strong>層</td></tr>
<tr><td><b>聯合身分 Federation</b></td><td>跨組織信任彼此的身分驗證，例如「用 Google 帳號登入」</td></tr>
<tr><td><b>RADIUS／TACACS+</b></td><td>集中 AAA；TACACS+ 加密整個封包、分離 AAA 功能，常用於網路設備管理</td></tr>
</table></div>` },
    { id: 'models', title: '存取控制模型', html: `
<div class="table-wrap"><table>
<tr><th>模型</th><th>決定權</th><th>特點</th></tr>
<tr><td><b>強制存取控制 MAC</b></td><td>系統依安全標籤</td><td>最嚴格，軍事機構，使用者無法變更</td></tr>
<tr><td><b>自主存取控制 DAC</b></td><td>資料擁有者</td><td>彈性高，例如檔案分享權限</td></tr>
<tr><td><b>角色型 RBAC</b></td><td>依職務角色</td><td>企業最常見</td></tr>
<tr><td><b>規則型 Rule-based</b></td><td>依系統規則</td><td>例如只允許上班時間登入</td></tr>
<tr><td><b>屬性型 ABAC</b></td><td>綜合多種屬性</td><td>最細緻：身分、部門、地點、時間、裝置</td></tr>
</table></div>
<p>其他原則：<b>最小權限</b>、<b>時間限制（Time-of-day Restrictions）</b>。</p>` },
    { id: 'mfa', title: '多因子驗證與密碼', html: `
<div class="concepts">
  <div class="concept"><b>所知 Something you know</b><span>密碼、PIN</span></div>
  <div class="concept"><b>所有 Something you have</b><span>手機、硬體金鑰、智慧卡</span></div>
  <div class="concept"><b>所是 Something you are</b><span>指紋、臉部、虹膜</span></div>
  <div class="concept"><b>所在 Somewhere you are</b><span>IP 位置、GPS</span></div>
</div>
<div class="box warn"><b class="t">易錯</b>MFA 必須結合<b>不同類別</b>的因子。密碼加 PIN 都是「所知」，仍是單因子。</div>
<ul>
  <li><b>硬體金鑰／FIDO2／Passkey</b>：以公開金鑰密碼學驗證，可抵抗釣魚。</li>
  <li><b>生物特徵錯誤率</b>：錯誤接受率（FAR）、錯誤拒絕率（FRR），兩者相等的點為交叉錯誤率（CER），越低越準確。</li>
  <li><b>密碼最佳實務</b>：長度比複雜度重要、不重複使用、使用<b>密碼管理器（Password Manager）</b>、無密碼（Passwordless）登入。</li>
</ul>` },
    { id: 'pam', title: '特權存取管理', html: `
<p><b>特權存取管理（Privileged Access Management, PAM）</b>保護管理員帳號：</p>
<ul>
  <li><b>即時權限（Just-in-time Permissions）</b>：需要時才授予，用完即收回。</li>
  <li><b>密碼保管庫（Password Vaulting）</b>：特權密碼集中保管，使用時借出並記錄。</li>
  <li><b>臨時憑證（Ephemeral Credentials）</b>：一次性、短效的帳密。</li>
</ul>` },
    { id: 'auto', title: '自動化與編排', html: `
<p>自動化（Automation）與編排（Orchestration）可以減少重複工作、加快回應：</p>
<ul>
  <li>使用情境：帳號佈建、資源佈建、防護欄（Guard Rails）、安全群組、工單建立與升級、啟用或停用服務、持續整合與測試、API 整合。</li>
  <li>好處：效率、一致的基準、擴充性、<b>減少人為錯誤</b>、反應時間更快、員工留任。</li>
  <li>考量：<b>複雜度</b>、<b>成本</b>、<b>單點故障（Single Point of Failure）</b>、<b>技術債（Technical Debt）</b>、持續支援能力。</li>
</ul>` }
  ],
  keypoints: [
    '離職要立即 Deprovisioning；異動要移除舊權限',
    'SAML 用 XML 做 SSO；OAuth 是授權；OpenID Connect 是驗證',
    'MAC 依標籤最嚴格；DAC 由擁有者決定；RBAC 依角色；ABAC 最細緻',
    'MFA 必須是不同類別的因子',
    'CER 越低，生物特徵系統越準確',
    'PAM：Just-in-time、Password Vaulting、Ephemeral Credentials',
    '自動化的風險：複雜度、成本、單點故障、技術債'
  ]
},
{
  id: 'c10', subject: 2, minutes: 55,
  title: '事件應變、數位鑑識與日誌調查',
  summary: 'Domain 4.8–4.9：事件應變流程、訓練與演練、根因分析、威脅獵捕、數位鑑識與證據保管，以及調查時使用的各種日誌與資料來源。',
  sections: [
    { id: 'ir', title: '事件應變流程', html: `
<div class="flow">
  <div><b>準備 Preparation</b><span>計畫、聯絡清單、工具、訓練</span></div>
  <div><b>偵測 Detection</b><span>從告警、使用者回報發現事件</span></div>
  <div><b>分析 Analysis</b><span>確認是否為真實事件與影響範圍</span></div>
  <div><b>圍堵 Containment</b><span>隔離受感染主機，阻止擴散</span></div>
  <div><b>根除 Eradication</b><span>移除惡意程式、修補漏洞</span></div>
  <div><b>復原 Recovery</b><span>從乾淨備份還原、恢復營運並持續監控</span></div>
  <div><b>經驗學習 Lessons Learned</b><span>檢討改善，越快開會越好</span></div>
</div>
<div class="box exam"><b class="t">考點提示</b>題目若問「發現勒索軟體後第一步」，通常答案是<b>圍堵／隔離</b>受影響系統（拔網路線、隔離網段），而不是立即關機（會失去記憶體證據）或直接重灌。</div>
<h3>訓練與測試</h3>
<ul>
  <li><b>桌上演練（Tabletop Exercise）</b>：以討論方式走過情境，成本低。</li>
  <li><b>模擬（Simulation）</b>：例如模擬釣魚攻擊。</li>
</ul>
<h3>根因分析與威脅獵捕</h3>
<ul>
  <li><b>根因分析（Root Cause Analysis）</b>：找出事件真正原因，避免再次發生。</li>
  <li><b>威脅獵捕（Threat Hunting）</b>：主動假設攻擊者已在內部，搜尋未被告警發現的跡象。</li>
</ul>` },
    { id: 'forensics', title: '數位鑑識', html: `
<ul>
  <li><b>法律保留（Legal Hold）</b>：預期訴訟時，必須保存相關資料，不得刪除。</li>
  <li><b>證據保管鏈（Chain of Custody）</b>：記錄證據由誰、何時、如何取得與移交，確保證據在法庭上可採信。</li>
  <li><b>取得（Acquisition）</b>：建立位元層級的<b>映像檔（Image）</b>，以<b>雜湊值</b>驗證與原始資料一致，之後只在副本上分析。</li>
  <li><b>報告（Reporting）</b>、<b>保存（Preservation）</b>、<b>電子證據開示（E-discovery）</b>。</li>
</ul>
<h3>揮發順序（Order of Volatility）</h3>
<p>先蒐集最容易消失的資料：</p>
<div class="flow">
  <div><b>CPU 暫存器、快取</b><span>最易消失</span></div>
  <div><b>記憶體 RAM</b><span>執行中程序、網路連線</span></div>
  <div><b>暫存檔、交換檔</b><span>Swap / Pagefile</span></div>
  <div><b>硬碟</b><span>檔案系統</span></div>
  <div><b>遠端日誌</b><span>Syslog、SIEM</span></div>
  <div><b>備份與封存</b><span>最穩定</span></div>
</div>` },
    { id: 'logs', title: '調查用的日誌與資料來源', html: `
<div class="table-wrap"><table>
<tr><th>來源</th><th>可以發現什麼</th></tr>
<tr><td><b>防火牆日誌</b></td><td>允許與阻擋的連線、來源與目的</td></tr>
<tr><td><b>應用程式日誌</b></td><td>應用程式錯誤、存取紀錄</td></tr>
<tr><td><b>端點日誌</b></td><td>登入、程序執行、檔案變更</td></tr>
<tr><td><b>作業系統安全日誌</b></td><td>Windows 事件 4624 登入成功、<b>4625 登入失敗</b>、4720 建立帳號</td></tr>
<tr><td><b>IPS／IDS 日誌</b></td><td>偵測到的攻擊特徵</td></tr>
<tr><td><b>網路日誌</b></td><td>路由器、交換器的變更與狀態</td></tr>
<tr><td><b>中繼資料 Metadata</b></td><td>郵件標頭、檔案建立者與時間、照片 GPS</td></tr>
<tr><td><b>弱點掃描結果</b></td><td>可能被利用的漏洞</td></tr>
<tr><td><b>自動報告與儀表板</b></td><td>趨勢與整體狀態</td></tr>
<tr><td><b>封包擷取 Packet Capture</b></td><td>完整流量內容，例如 Wireshark</td></tr>
</table></div>
<div class="box tip"><b class="t">SOC 實務</b>調查時要把多個來源串起來：例如 SIEM 顯示某帳號 4625 失敗數百次後出現 4624 成功，接著防火牆看到該主機連往陌生 IP 大量上傳，就是典型的「暴力破解成功後外傳資料」。</div>` }
  ],
  keypoints: [
    'IR 流程：Preparation、Detection、Analysis、Containment、Eradication、Recovery、Lessons Learned',
    '勒索軟體第一步通常是圍堵隔離，而非關機',
    'Tabletop 以討論方式演練；Threat Hunting 主動搜尋',
    'Chain of Custody 確保證據可採信；Legal Hold 要求保存資料',
    '取得映像後以雜湊驗證，只在副本上分析',
    '揮發順序：暫存器、記憶體、交換檔、硬碟、遠端日誌、備份',
    'Windows 4624 登入成功、4625 登入失敗'
  ]
},
{
  id: 'c11', subject: 2, minutes: 55,
  title: '安全治理與風險管理',
  summary: 'Domain 5.1–5.2：政策、標準、程序與指引，治理結構與資料角色，風險識別、評估、分析與處理，以及營運衝擊分析。',
  sections: [
    { id: 'gov', title: '治理文件', html: `
<div class="table-wrap"><table>
<tr><th>文件</th><th>說明</th><th>例子</th></tr>
<tr><td><b>政策 Policy</b></td><td>高層級的方向與原則，由管理階層核定</td><td>可接受使用政策（AUP）、資安政策、營運持續、災難復原、事件應變、SDLC、變更管理</td></tr>
<tr><td><b>標準 Standard</b></td><td>強制性的具體要求</td><td>密碼標準、存取控制標準、加密標準、實體安全標準</td></tr>
<tr><td><b>程序 Procedure</b></td><td>逐步操作說明</td><td>變更管理程序、到離職程序、劇本（Playbook）</td></tr>
<tr><td><b>指引 Guideline</b></td><td>建議性質，非強制</td><td>最佳實務建議</td></tr>
</table></div>
<h3>外部考量</h3>
<p>法規（Regulatory）、法律（Legal）、產業（Industry）、地方／州、國家、全球。</p>
<h3>治理結構</h3>
<p>董事會（Boards）、委員會（Committees）、政府機關、集中式或分散式治理。</p>` },
    { id: 'roles', title: '資料角色與責任', html: `
<div class="table-wrap"><table>
<tr><th>角色</th><th>責任</th></tr>
<tr><td><b>擁有者 Owner</b></td><td>對資料負最終責任，決定<b>分類</b>與存取權限，通常是業務主管</td></tr>
<tr><td><b>控制者 Controller</b></td><td>決定個人資料處理的<b>目的與方式</b></td></tr>
<tr><td><b>處理者 Processor</b></td><td>代替控制者處理資料，例如外包薪資公司</td></tr>
<tr><td><b>保管者 Custodian / Steward</b></td><td>日常保管與維護，例如執行備份、設定權限，通常是 IT 人員</td></tr>
</table></div>` },
    { id: 'risk', title: '風險管理流程', html: `
<div class="flow">
  <div><b>風險識別</b><span>Risk Identification</span></div>
  <div><b>風險評估</b><span>Ad hoc、Recurring、One-time、Continuous</span></div>
  <div><b>風險分析</b><span>Qualitative／Quantitative</span></div>
  <div><b>風險登錄</b><span>Risk Register</span></div>
  <div><b>風險處理</b><span>Transfer、Accept、Avoid、Mitigate</span></div>
  <div><b>風險報告</b><span>Risk Reporting</span></div>
</div>
<h3>定量分析公式</h3>
<p class="mono center">SLE = AV × EF　　ALE = SLE × ARO</p>
<ul>
  <li><b>AV（Asset Value）</b>：資產價值。</li>
  <li><b>EF（Exposure Factor）</b>：發生一次損失的比例。</li>
  <li><b>SLE（Single Loss Expectancy）</b>：單次損失預期值。</li>
  <li><b>ARO（Annualized Rate of Occurrence）</b>：每年發生次數。</li>
  <li><b>ALE（Annualized Loss Expectancy）</b>：年度損失預期值。</li>
</ul>
<div class="box analogy"><b class="t">計算範例</b>伺服器價值 100 萬（AV），一次淹水損失 40%（EF），則 SLE = 40 萬。若每 4 年淹一次（ARO = 0.25），ALE = 10 萬。每年花 15 萬防水就不划算。</div>
<h3>風險處理</h3>
<ul>
  <li><b>轉移（Transfer）</b>：買保險、外包。</li>
  <li><b>接受（Accept）</b>：包括<b>例外（Exception）</b>與<b>豁免（Exemption）</b>。</li>
  <li><b>避免（Avoid）</b>：停止有風險的活動。</li>
  <li><b>降低（Mitigate）</b>：實施控制措施。</li>
</ul>
<p>相關名詞：<b>風險胃納（Risk Appetite）</b>分為擴張型（Expansionary）、保守型（Conservative）、中性（Neutral）；<b>風險容忍度（Risk Tolerance）</b>；<b>風險負責人（Risk Owner）</b>；<b>風險門檻（Risk Threshold）</b>；<b>關鍵風險指標（KRI）</b>。</p>` },
    { id: 'bia', title: '營運衝擊分析', html: `
<p><b>營運衝擊分析（Business Impact Analysis, BIA）</b>找出關鍵業務與其中斷影響：</p>
<div class="table-wrap"><table>
<tr><th>指標</th><th>意義</th></tr>
<tr><td><b>RTO</b>（Recovery Time Objective）</td><td>服務必須在多久內恢復</td></tr>
<tr><td><b>RPO</b>（Recovery Point Objective）</td><td>可接受遺失多久的資料，決定備份頻率</td></tr>
<tr><td><b>MTTR</b>（Mean Time to Repair）</td><td>平均修復時間，越短越好</td></tr>
<tr><td><b>MTBF</b>（Mean Time Between Failures）</td><td>平均故障間隔，越長越可靠</td></tr>
</table></div>
<div class="box memo"><b class="t">記憶法</b>RTO 看「<b>T</b>ime 多久恢復」；RPO 看「<b>P</b>oint 回到哪個時間點的資料」。RPO 4 小時代表至少每 4 小時備份一次。</div>` }
  ],
  keypoints: [
    'Policy 方向、Standard 強制要求、Procedure 步驟、Guideline 建議',
    'Owner 決定分類；Custodian 日常保管；Controller 決定目的；Processor 代為處理',
    'SLE = AV × EF；ALE = SLE × ARO',
    '風險處理：Transfer、Accept、Avoid、Mitigate',
    'RTO 多久恢復；RPO 可遺失多少資料',
    'MTTR 越短越好；MTBF 越長越好'
  ]
},
{
  id: 'c12', subject: 2, minutes: 50,
  title: '第三方風險、合規、稽核與資安意識',
  summary: 'Domain 5.3–5.6：供應商評估與合約類型、合規與隱私、內外部稽核與滲透測試，以及資安意識訓練與釣魚演練。',
  sections: [
    { id: 'vendor', title: '第三方風險管理', html: `
<ul>
  <li><b>供應商評估（Vendor Assessment）</b>：滲透測試、<b>稽核權條款（Right-to-audit Clause）</b>、證據內部稽核、獨立評估、供應鏈分析。</li>
  <li><b>供應商選擇</b>：盡職調查（Due Diligence）、利益衝突（Conflict of Interest）。</li>
  <li><b>問卷（Questionnaires）</b>與<b>持續監控（Vendor Monitoring）</b>。</li>
  <li><b>約定規則（Rules of Engagement）</b>：規範測試或合作的範圍與限制。</li>
</ul>
<h3>合約類型</h3>
<div class="table-wrap"><table>
<tr><th>合約</th><th>用途</th></tr>
<tr><td><b>SLA</b></td><td>服務水準協議：可用率、回應時間等最低服務標準</td></tr>
<tr><td><b>MOA／MOU</b></td><td>合作備忘錄，表達雙方意向；MOA 較正式</td></tr>
<tr><td><b>MSA</b></td><td>主服務協議，規範長期合作的通用條款</td></tr>
<tr><td><b>WO／SOW</b></td><td>工作訂單／工作說明書，定義具體工作項目與交付物</td></tr>
<tr><td><b>NDA</b></td><td>保密協議</td></tr>
<tr><td><b>BPA</b></td><td>商業夥伴協議，規範合夥關係與責任分配</td></tr>
</table></div>` },
    { id: 'compliance', title: '合規與隱私', html: `
<ul>
  <li><b>合規報告</b>：內部與外部報告。</li>
  <li><b>不合規的後果</b>：罰款、制裁、商譽損失、喪失執照、合約影響。</li>
  <li><b>合規監控</b>：盡職調查與<b>應盡注意（Due Care）</b>、證明與確認（Attestation）、自動化。</li>
</ul>
<h3>隱私</h3>
<ul>
  <li><b>GDPR</b>：歐盟一般資料保護規則，賦予<b>被遺忘權（Right to be Forgotten）</b>等權利。</li>
  <li>資料主體（Data Subject）、控制者與處理者、資料盤點與保存（Data Inventory and Retention）。</li>
  <li>法律影響：地方、國家、全球層級的法規。</li>
</ul>` },
    { id: 'audit', title: '稽核與滲透測試', html: `
<h3>稽核與評估</h3>
<ul>
  <li><b>證明（Attestation）</b>：由第三方確認符合要求。</li>
  <li><b>內部稽核</b>：合規、稽核委員會、自我評估（Self-assessment）。</li>
  <li><b>外部稽核</b>：法規要求的檢查、獨立第三方稽核、主管機關評估。</li>
</ul>
<h3>滲透測試</h3>
<div class="table-wrap"><table>
<tr><th>環境</th><th>測試者掌握的資訊</th></tr>
<tr><td><b>已知環境 Known</b>（白箱）</td><td>完整資訊：架構圖、原始碼、帳號</td></tr>
<tr><td><b>部分已知 Partially Known</b>（灰箱）</td><td>部分資訊</td></tr>
<tr><td><b>未知環境 Unknown</b>（黑箱）</td><td>沒有資訊，模擬外部攻擊者</td></tr>
</table></div>
<ul>
  <li><b>測試類型</b>：實體（Physical）、攻擊方（Offensive，紅隊）、防禦方（Defensive，藍隊）、整合（Integrated，紫隊）。</li>
  <li><b>偵察（Reconnaissance）</b>：<b>被動偵察（Passive）</b>不與目標直接互動，例如查 OSINT；<b>主動偵察（Active）</b>直接接觸目標，例如掃描埠號。</li>
</ul>
<div class="box warn"><b class="t">重要</b>滲透測試前必須取得<b>書面授權</b>，並確認範圍與約定規則（Rules of Engagement）。</div>` },
    { id: 'awareness', title: '資安意識與訓練', html: `
<ul>
  <li><b>釣魚演練（Phishing Campaigns）</b>：模擬釣魚郵件，教育點擊的員工，並訓練大家<b>辨識與回報</b>。</li>
  <li><b>異常行為辨識</b>：有風險、非預期、無意的行為。</li>
  <li><b>使用者訓練主題</b>：政策與手冊、情境意識（Situational Awareness）、內部威脅、密碼管理、可移除式媒體、社交工程、作業安全（OPSEC）、混合辦公與遠端工作。</li>
  <li><b>報告與監控</b>：初次與持續追蹤、成效評估。</li>
  <li><b>發展與執行</b>：規劃訓練計畫並定期執行。</li>
</ul>
<div class="box tip"><b class="t">備考建議</b>讀完全部章節後，請用「綜合模擬考 90 題・90 分鐘」實際計時練習。正式考試還有 PBQ 實作題，可以搭配 Professor Messer 影片與 TryHackMe 的 SOC Level 1 路線做實作練習。</div>` }
  ],
  keypoints: [
    'Right-to-audit 條款讓組織可稽核供應商',
    'SLA 定義服務水準；SOW 定義工作內容；NDA 保密；MOU 表達意向',
    'Due Diligence 事前調查；Due Care 持續盡到注意義務',
    '滲透測試：Known 白箱、Partially Known 灰箱、Unknown 黑箱',
    '被動偵察不接觸目標；主動偵察直接接觸',
    '滲透測試前必須取得書面授權',
    '釣魚演練要訓練員工辨識並回報'
  ]
}
);
