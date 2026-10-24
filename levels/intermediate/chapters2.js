/* 中級 科目二：資訊安全防護實務 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c08', subject: 2, minutes: 50,
  title: '弱點管理與威脅分類',
  summary: 'CVE、CWE、CVSS 3.1 指標與 4.0 變化、EPSS 與 KEV 的優先排序、弱點管理流程與 MITRE ATT&CK 戰術。',
  sections: [
    { id: 'cvss', title: 'CVSS 3.1 基本指標', html: `
<p>CVSS 分數由<b>基本（Base）</b>、<b>時間（Temporal）</b>、<b>環境（Environmental）</b>三組指標構成。公開資料庫（如 NVD）通常只提供基本分數，組織需自行以環境指標調整。</p>
<div class="table-wrap"><table>
<tr><th>指標</th><th>選項</th><th>判斷重點</th></tr>
<tr><td><b>AV</b> 攻擊途徑</td><td>網路 N／相鄰 A／本機 L／實體 P</td><td>攻擊者需要在多「近」的位置；可經網際網路利用為 N</td></tr>
<tr><td><b>AC</b> 攻擊複雜度</td><td>低 L／高 H</td><td>是否需要攻擊者無法控制的條件（如特定組態、競爭條件）</td></tr>
<tr><td><b>PR</b> 所需權限</td><td>無 N／低 L／高 H</td><td>攻擊前需要的帳號權限</td></tr>
<tr><td><b>UI</b> 使用者互動</td><td>不需要 N／需要 R</td><td>是否需要受害者點擊或開啟檔案</td></tr>
<tr><td><b>S</b> 影響範圍</td><td>不變 U／改變 C</td><td>是否影響其所在安全權限範圍以外的元件</td></tr>
<tr><td><b>C／I／A</b></td><td>高 H／低 L／無 N</td><td>對機密性、完整性、可用性的衝擊</td></tr>
</table></div>
<p class="mono center">CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H = 9.8（嚴重）</p>
<div class="box exam"><b class="t">考點提示</b>嚴重等級：無 0.0、低 0.1–3.9、中 4.0–6.9、高 7.0–8.9、嚴重 9.0–10.0。到「互動練習」的 <b>CVSS 3.1 基本分數計算</b>，實際切換指標觀察分數變化。</div>
<h3>CVSS 4.0 的主要變化（2023 年 11 月發布）</h3>
<ul>
  <li>指標群組改為：基本、<b>威脅（Threat）</b>、環境、<b>補充（Supplemental）</b>。</li>
  <li>移除「影響範圍（S）」，改為分別評估<b>易受攻擊系統</b>與<b>後續系統</b>的衝擊。</li>
  <li>新增「<b>攻擊要件（AT）</b>」指標；使用者互動細分為被動與主動。</li>
  <li>分數標示方式：CVSS-B（僅基本）、CVSS-BT、CVSS-BE、CVSS-BTE。</li>
</ul>` },
    { id: 'prio', title: '修補優先排序', html: `
<p>CVSS 衡量的是「嚴重度」而非「實際被攻擊的機率」。大量高分漏洞從未被實際利用，因此實務上會結合多種資訊排序：</p>
<div class="table-wrap"><table>
<tr><th>資訊來源</th><th>說明</th></tr>
<tr><td><b>CISA KEV</b></td><td>已知遭實際利用的漏洞清單，<strong>應最優先處理</strong></td></tr>
<tr><td><b>EPSS</b></td><td>漏洞利用預測評分系統，估計未來 30 天內遭利用的機率（0～1）</td></tr>
<tr><td>資產重要性與曝露程度</td><td>對外服務、核心系統、含機敏資料者優先</td></tr>
<tr><td>既有補償控制</td><td>有 WAF、網路隔離時可略為延後，但仍需處理</td></tr>
<tr><td>SSVC</td><td>以決策樹（利用狀態、自動化程度、技術衝擊、任務關聯）決定處置方式</td></tr>
</table></div>
<div class="box analogy"><b class="t">情境範例</b>同時發現兩個漏洞：A 為 CVSS 9.1，位於內部測試主機，EPSS 0.01；B 為 CVSS 7.5，位於對外 VPN 設備且已列入 KEV。應<b>優先修補 B</b>。</div>
<div class="table-wrap"><table>
<tr><th>等級</th><th>對外系統</th><th>內部系統</th></tr>
<tr><td>KEV 或嚴重</td><td>7 日內</td><td>14 日內</td></tr>
<tr><td>高</td><td>14 日內</td><td>30 日內</td></tr>
<tr><td>中</td><td>30 日內</td><td>90 日內</td></tr>
<tr><td>低</td><td colspan="2">依例行更新週期</td></tr>
</table></div>
<p class="small muted">上表為常見的組織政策範例，實際時效由各組織依風險胃納訂定。</p>` },
    { id: 'process', title: '弱點管理流程', html: `
<div class="flow">
  <div><b>資產盤點</b><span>含雲端、容器、IoT，掃描範圍不可有盲點</span></div>
  <div><b>掃描</b><span>外部、內部、認證式掃描</span></div>
  <div><b>驗證</b><span>排除誤報，確認版本與影響</span></div>
  <div><b>評估排序</b><span>CVSS、KEV、EPSS、資產重要性</span></div>
  <div><b>修補或緩解</b><span>更新、組態調整、虛擬修補</span></div>
  <div><b>複測</b><span>確認已修補</span></div>
  <div><b>報告</b><span>趨勢、逾期項目、例外清單</span></div>
</div>
<ul>
  <li><b>認證式掃描</b>（Credentialed Scan）：以帳號登入主機檢查已安裝套件版本，結果較完整準確；未認證掃描只能從網路服務推測，誤報較多。</li>
  <li><b>代理程式式掃描</b>：在主機上安裝代理程式，適合經常離線的筆電。</li>
  <li><b>例外管理</b>：無法修補的弱點須記錄理由、補償控制、風險接受者與到期日。</li>
  <li>掃描可能影響老舊或脆弱系統（如 OT 設備），應事先評估並安排維護時段。</li>
</ul>` },
    { id: 'cwe', title: '弱點類型分類（CWE）', html: `
<p>CWE 描述的是弱點「類型」，CVE 則是特定產品中的具體漏洞實例。MITRE 每年公布 <b>CWE Top 25 最危險軟體弱點</b>，常見項目：</p>
<div class="table-wrap"><table>
<tr><th>CWE</th><th>名稱</th><th>對應防護重點</th></tr>
<tr><td>CWE-79</td><td>跨站腳本（XSS）</td><td>輸出編碼、CSP</td></tr>
<tr><td>CWE-89</td><td>SQL 注入</td><td>參數化查詢</td></tr>
<tr><td>CWE-787 / CWE-125</td><td>越界寫入／讀取</td><td>邊界檢查、記憶體安全語言</td></tr>
<tr><td>CWE-352</td><td>跨站請求偽造（CSRF）</td><td>Anti-CSRF Token、SameSite</td></tr>
<tr><td>CWE-22</td><td>路徑穿越</td><td>路徑正規化、白名單</td></tr>
<tr><td>CWE-78</td><td>作業系統命令注入</td><td>避免呼叫 shell、參數陣列傳遞</td></tr>
<tr><td>CWE-416</td><td>釋放後使用</td><td>記憶體安全語言、編譯器防護</td></tr>
<tr><td>CWE-862 / CWE-863</td><td>缺少或不當的授權檢查</td><td>伺服器端逐次授權驗證</td></tr>
<tr><td>CWE-434</td><td>未限制上傳危險類型檔案</td><td>副檔名與內容檢查、不可執行目錄</td></tr>
<tr><td>CWE-502</td><td>不受信任資料的反序列化</td><td>避免反序列化外部資料、型別白名單</td></tr>
<tr><td>CWE-918</td><td>伺服器端請求偽造（SSRF）</td><td>目的地白名單、阻擋內部網段</td></tr>
</table></div>` },
    { id: 'attack', title: 'MITRE ATT&CK 戰術', html: `
<p>ATT&CK 企業矩陣的戰術（攻擊者的目的），常用於對應偵測覆蓋度與事件分析：</p>
<div class="table-wrap"><table>
<tr><th>戰術</th><th>防守方關注重點</th></tr>
<tr><td>偵察 Reconnaissance</td><td>減少對外資訊曝露、監控異常掃描</td></tr>
<tr><td>資源開發 Resource Development</td><td>監控相似網域註冊</td></tr>
<tr><td>初始存取 Initial Access</td><td>郵件安全、對外系統修補、MFA</td></tr>
<tr><td>執行 Execution</td><td>腳本執行政策、應用程式白名單</td></tr>
<tr><td>持久化 Persistence</td><td>監控自動啟動項目、新建帳號</td></tr>
<tr><td>權限提升 Privilege Escalation</td><td>及時修補、最小權限</td></tr>
<tr><td>防禦規避 Defense Evasion</td><td>監控日誌清除、防毒停用事件</td></tr>
<tr><td>憑證存取 Credential Access</td><td>保護憑證儲存區、偵測異常驗證行為</td></tr>
<tr><td>探索 Discovery</td><td>偵測異常的內部列舉行為</td></tr>
<tr><td>橫向移動 Lateral Movement</td><td>網路分段、限制管理協定</td></tr>
<tr><td>蒐集 Collection</td><td>偵測異常大量檔案存取</td></tr>
<tr><td>命令與控制 Command and Control</td><td>出站流量管控、DNS 與 Proxy 監控</td></tr>
<tr><td>資料外洩 Exfiltration</td><td>DLP、異常外傳流量告警</td></tr>
<tr><td>衝擊 Impact</td><td>不可變備份、備份存取監控</td></tr>
</table></div>
<div class="box tip"><b class="t">實務用途</b>將現有偵測規則對應到 ATT&CK 技術，可找出偵測盲點；事件報告中以技術編號（例如 T1059 命令與腳本直譯器）描述攻擊行為，便於與外部情資交流。</div>` }
  ],
  keypoints: [
    'CVSS 3.1 基本指標：AV、AC、PR、UI、S、C、I、A；9.0 以上為嚴重',
    'CVSS 4.0 新增威脅與補充指標、攻擊要件 AT，移除影響範圍 S',
    '排序不只看 CVSS：KEV 最優先，EPSS 估 30 天內遭利用機率，並考量資產曝露',
    '認證式掃描較準確；無法修補需例外管理與補償控制',
    'CWE 是弱點類型、CVE 是具體漏洞；CWE-79 XSS、CWE-89 SQLi、CWE-22 路徑穿越',
    'ATT&CK 14 個戰術可用於偵測覆蓋度分析與事件描述'
  ]
},
{
  id: 'c09', subject: 2, minutes: 55,
  title: '網站與 API 安全防護',
  summary: '注入、XSS、存取控制、SSRF、XXE、反序列化、檔案上傳等弱點的成因與防護，以及 JWT 與 OWASP API Security Top 10。',
  sections: [
    { id: 'injection', title: '注入類弱點的成因與防護', html: `
<p>注入弱點的共同成因是：<strong>程式把使用者輸入與指令混在一起交給直譯器執行</strong>。防護的共同原則是<strong>讓資料與指令分離</strong>。</p>
<div class="table-wrap"><table>
<tr><th>類型</th><th>直譯器</th><th>主要防護</th></tr>
<tr><td>SQL 注入</td><td>資料庫</td><td>參數化查詢（Prepared Statement）、ORM</td></tr>
<tr><td>作業系統命令注入</td><td>作業系統 shell</td><td>避免呼叫 shell，改用不經 shell 的 API，參數以陣列傳遞</td></tr>
<tr><td>LDAP 注入</td><td>目錄服務</td><td>使用安全的查詢建構 API、特殊字元跳脫</td></tr>
<tr><td>NoSQL 注入</td><td>文件資料庫</td><td>型別驗證，確認輸入是字串而非查詢物件</td></tr>
<tr><td>伺服器端模板注入</td><td>樣板引擎</td><td>不以使用者輸入組裝模板，使用沙箱化模板引擎</td></tr>
</table></div>
<pre class="out">// 安全寫法：參數化查詢，同時限定資料擁有者
PreparedStatement ps = conn.prepareStatement(
    "SELECT * FROM orders WHERE user_id = ? AND id = ?");
ps.setInt(1, currentUser.getId());
ps.setInt(2, orderId);</pre>
<div class="box warn"><b class="t">實作注意</b>參數化查詢無法用於資料表名稱、欄位名稱或排序方向（ORDER BY）。這類情況必須使用<b>白名單對應</b>，例如只允許 <code>name</code>、<code>date</code> 兩種排序欄位，其餘一律拒絕。</div>
<h3>縱深防禦</h3>
<ul>
  <li>資料庫連線帳號採最小權限，應用程式不使用管理者帳號。</li>
  <li>錯誤訊息不回傳資料庫細節，避免協助攻擊者判斷結構。</li>
  <li>部署 WAF 作為額外防線，但不可取代程式修正。</li>
  <li>以 SAST 與源碼檢測在開發階段攔截。</li>
</ul>` },
    { id: 'xss', title: 'XSS 防護與內容安全政策', html: `
<h3>依輸出位置使用對應的編碼</h3>
<div class="table-wrap"><table>
<tr><th>輸出位置</th><th>處理方式</th></tr>
<tr><td>HTML 內文</td><td>HTML 實體編碼</td></tr>
<tr><td>HTML 屬性</td><td>屬性值加引號並編碼</td></tr>
<tr><td>JavaScript 字串</td><td>JavaScript 跳脫；避免把資料直接嵌入 script 區塊</td></tr>
<tr><td>URL 參數</td><td>URL 編碼，並驗證協定（禁止 <code>javascript:</code>）</td></tr>
<tr><td>需允許 HTML（富文字編輯器）</td><td>使用成熟的 HTML 清理函式庫，採標籤與屬性白名單</td></tr>
</table></div>
<h3>CSP 設定範例</h3>
<pre class="out">Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-r4nd0m';
  object-src 'none'; base-uri 'self'; frame-ancestors 'none'</pre>
<ul>
  <li>避免 <code>'unsafe-inline'</code> 與 <code>'unsafe-eval'</code>，改以 nonce 或雜湊允許特定腳本。</li>
  <li>可先用 <code>Content-Security-Policy-Report-Only</code> 觀察違規報告，確認不影響功能後再正式啟用。</li>
  <li>CSP 屬於<b>縱深防禦</b>，不能取代輸出編碼。</li>
  <li>前端避免使用 <code>innerHTML</code>、<code>eval</code>，以降低 DOM 型 XSS 風險。</li>
</ul>
<h3>Cookie 安全屬性</h3>
<div class="table-wrap"><table>
<tr><th>屬性</th><th>作用</th></tr>
<tr><td><code>HttpOnly</code></td><td>JavaScript 無法讀取，降低 XSS 竊取工作階段的風險</td></tr>
<tr><td><code>Secure</code></td><td>僅透過 HTTPS 傳送</td></tr>
<tr><td><code>SameSite=Lax / Strict</code></td><td>限制跨站請求攜帶 Cookie，緩解 CSRF</td></tr>
<tr><td><code>__Host-</code> 前綴</td><td>要求 Secure、Path=/ 且無 Domain，防止子網域覆寫</td></tr>
</table></div>` },
    { id: 'access', title: '存取控制與商業邏輯弱點', html: `
<p>這類弱點無法靠掃描工具自動發現，是人工測試與設計審查的重點，也是 OWASP Top 10 的第一名。</p>
<div class="table-wrap"><table>
<tr><th>弱點</th><th>成因</th><th>防護</th></tr>
<tr><td><b>IDOR／BOLA</b></td><td>以參數指定物件，但未驗證該物件是否屬於目前使用者</td><td>每次存取都在伺服器端檢查擁有權；使用不可預測的識別碼僅為輔助</td></tr>
<tr><td><b>功能層級授權失效</b></td><td>僅在前端隱藏管理功能按鈕</td><td>伺服器端對每個端點檢查角色與權限，預設拒絕</td></tr>
<tr><td><b>大量賦值</b></td><td>框架自動把請求欄位對應到資料模型，包含不該由使用者修改的欄位</td><td>明確定義允許更新的欄位白名單</td></tr>
<tr><td><b>強制瀏覽</b></td><td>未連結的頁面或備份檔仍可直接存取</td><td>所有資源都要經過授權檢查；移除不必要的檔案</td></tr>
<tr><td><b>商業邏輯弱點</b></td><td>流程未驗證狀態與數值合理性</td><td>伺服器端重新計算金額、驗證流程順序、限制數量為正整數</td></tr>
<tr><td><b>競爭條件</b></td><td>檢查與使用之間存在時間差</td><td>資料庫交易與鎖定、冪等設計、限制同時請求</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>情境題常描述「使用者修改網址參數後看到其他人的資料」，答案即為<b>權限控制失效（IDOR）</b>，而非 SQL 注入或 XSS；防護方式是<b>伺服器端授權檢查</b>。</div>` },
    { id: 'others', title: 'SSRF、XXE、反序列化與檔案上傳', html: `
<div class="table-wrap"><table>
<tr><th>弱點</th><th>風險</th><th>防護</th></tr>
<tr><td><b>SSRF</b></td><td>伺服器被誘導存取內部服務或雲端中繼資料端點，取得憑證</td><td>目的地白名單、阻擋私有網段與雲端中繼資料位址、停用不必要的重新導向、雲端改用 IMDSv2</td></tr>
<tr><td><b>XXE</b></td><td>XML 剖析器處理外部實體，造成檔案讀取或 SSRF</td><td><strong>停用 DTD 與外部實體</strong>、改用 JSON、使用安全預設的剖析器</td></tr>
<tr><td><b>不安全的反序列化</b></td><td>還原物件過程觸發危險行為</td><td>避免反序列化不受信任的資料；改用 JSON 等資料格式；加上完整性簽章與型別白名單</td></tr>
<tr><td><b>檔案上傳</b></td><td>上傳惡意檔案後被伺服器執行</td><td>副檔名與 MIME 白名單、檢查檔案內容特徵、重新命名、<strong>存放於不可執行目錄或物件儲存</strong>、掃毒、限制大小</td></tr>
<tr><td><b>開放重新導向</b></td><td>被用於釣魚，讓連結看起來來自可信網域</td><td>重新導向目的地採白名單</td></tr>
</table></div>
<div class="box analogy"><b class="t">情境範例</b>系統提供「輸入圖片網址即可匯入商品圖」功能。若未限制目的地，伺服器可能被導向內部管理介面或雲端中繼資料端點。正確做法是只允許 http／https、解析 IP 後確認不屬於私有網段，並由固定的出口代理連線。</div>` },
    { id: 'api', title: 'API 安全與 JWT', html: `
<h3>OWASP API Security Top 10（2023）</h3>
<div class="table-wrap"><table>
<tr><th>編號</th><th>風險</th></tr>
<tr><td>API1</td><td>物件層級授權失效（BOLA）</td></tr>
<tr><td>API2</td><td>身分驗證失效</td></tr>
<tr><td>API3</td><td>物件屬性層級授權失效（過度揭露資料、大量賦值）</td></tr>
<tr><td>API4</td><td>資源消耗無限制</td></tr>
<tr><td>API5</td><td>功能層級授權失效</td></tr>
<tr><td>API6</td><td>敏感業務流程存取不受限制</td></tr>
<tr><td>API7</td><td>伺服器端請求偽造（SSRF）</td></tr>
<tr><td>API8</td><td>安全組態缺失</td></tr>
<tr><td>API9</td><td>資產管理不當（影子 API、未下架的舊版本）</td></tr>
<tr><td>API10</td><td>不安全地使用第三方 API</td></tr>
</table></div>
<h3>JWT 驗證要點</h3>
<ul>
  <li>在伺服器端<strong>指定允許的演算法</strong>，不信任權杖標頭中的 <code>alg</code>；拒絕 <code>none</code>。</li>
  <li>驗證簽章後，再檢查 <code>iss</code>（發行者）、<code>aud</code>（受眾）、<code>exp</code>（到期）、<code>nbf</code>。</li>
  <li>Payload 僅為 Base64 編碼，<strong>不是加密</strong>，不可放入敏感資料。</li>
  <li>Access Token 效期短，搭配 Refresh Token；需要即時撤銷時改用不透明權杖或維護撤銷清單。</li>
  <li>金鑰輪替：以 <code>kid</code> 標示金鑰版本，並提供 JWKS 端點。</li>
</ul>
<h3>其他 API 防護</h3>
<ul>
  <li>速率限制與配額，防止資源耗盡與暴力嘗試。</li>
  <li>回應只包含必要欄位，避免由前端負責過濾。</li>
  <li>維護 API 清冊與版本控管，下架舊版本，避免影子 API。</li>
  <li>以 API 閘道統一處理驗證、授權、日誌與流量管控。</li>
</ul>` }
  ],
  keypoints: [
    '注入類弱點的共同防護是讓資料與指令分離；參數化查詢不適用於表名與排序欄位，需白名單',
    'XSS 依輸出位置選擇編碼方式；CSP 與 HttpOnly 屬縱深防禦，不能取代輸出編碼',
    'IDOR／BOLA 需在伺服器端檢查物件擁有權，前端隱藏無效',
    '大量賦值以欄位白名單防護；商業邏輯弱點需人工測試',
    'SSRF 用目的地白名單與阻擋私有網段；XXE 停用 DTD 與外部實體',
    '上傳檔案存放於不可執行目錄並重新命名',
    'JWT 須在伺服器端指定演算法並驗證 iss、aud、exp；Payload 非加密'
  ]
},
{
  id: 'c10', subject: 2, minutes: 50,
  title: '安全軟體開發生命週期',
  summary: 'SSDLC 各階段活動、安全需求與設計審查、程式碼檢測工具比較、DevSecOps 流水線與秘密管理。',
  sections: [
    { id: 'ssdlc', title: 'SSDLC 各階段活動', html: `
<p>修補成本隨開發階段推進而大幅增加，因此安全活動必須<strong>左移（Shift Left）</strong>。</p>
<div class="table-wrap"><table>
<tr><th>階段</th><th>安全活動</th><th>產出</th></tr>
<tr><td>需求</td><td>安全需求訂定、法規與隱私需求、資料分級</td><td>安全需求規格、濫用案例（Abuse Case）</td></tr>
<tr><td>設計</td><td><b>威脅建模</b>、安全架構審查、選用安全元件</td><td>威脅模型、資料流程圖、緩解措施清單</td></tr>
<tr><td>開發</td><td>安全程式撰寫規範、同儕程式碼審查、<b>SAST</b>、<b>SCA</b>、秘密掃描</td><td>檢測報告、修補紀錄</td></tr>
<tr><td>測試</td><td><b>DAST</b>、<b>IAST</b>、模糊測試、滲透測試</td><td>測試報告、缺陷追蹤</td></tr>
<tr><td>部署</td><td>安全組態、秘密管理、映像檔掃描、簽章驗證</td><td>基準組態、SBOM</td></tr>
<tr><td>維運</td><td>監控、弱點管理、事件應變、定期複測</td><td>監控告警、修補紀錄</td></tr>
<tr><td>汰除</td><td>資料安全刪除、帳號與憑證撤銷</td><td>銷毀證明</td></tr>
</table></div>
<p>常見參考框架：<b>NIST SSDF（SP 800-218）</b>、<b>OWASP SAMM</b>（成熟度評估）、<b>BSIMM</b>（業界實務比較）、<b>OWASP ASVS</b>（應用程式安全驗證標準，分為三級）。</p>
<div class="box tip"><b class="t">ASVS 的用法</b>在需求階段即指定專案適用的 ASVS 等級（L1 一般、L2 含敏感資料、L3 高價值系統），作為驗收與測試的檢核清單。</div>` },
    { id: 'tools', title: '檢測工具比較', html: `
<div class="table-wrap"><table>
<tr><th>工具</th><th>對象</th><th>優點</th><th>限制</th></tr>
<tr><td><b>SAST</b> 靜態檢測</td><td>原始碼（白箱）</td><td>開發早期即可執行，能指出確切行號；可覆蓋全部程式路徑</td><td>誤報率較高；難以發現組態與執行期問題</td></tr>
<tr><td><b>DAST</b> 動態檢測</td><td>執行中的應用（黑箱）</td><td>誤報低、貼近真實攻擊面；不需原始碼</td><td>覆蓋率受爬取能力限制；發現較晚；難以定位程式位置</td></tr>
<tr><td><b>IAST</b> 互動式檢測</td><td>執行期插樁</td><td>兼具準確度與定位能力</td><td>需部署代理程式，支援語言有限</td></tr>
<tr><td><b>SCA</b> 組成分析</td><td>第三方套件</td><td>找出已知漏洞與授權風險，產生 SBOM</td><td>無法發現自行開發程式的弱點</td></tr>
<tr><td><b>模糊測試</b> Fuzzing</td><td>輸入處理邏輯</td><td>能發現未知的記憶體與剖析錯誤</td><td>耗時，需設計測試樁</td></tr>
<tr><td><b>秘密掃描</b></td><td>程式庫與歷史紀錄</td><td>找出硬編碼的金鑰與密碼</td><td>需維護樣式規則</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>情境題問「在開發階段就要找出程式中的 SQL 注入」→ SAST；「對上線前的網站模擬攻擊測試」→ DAST；「確認使用的開源套件是否有已知漏洞」→ SCA。</div>
<h3>誤報與漏報的處理</h3>
<ul>
  <li>建立<b>基準線</b>：首次導入時大量既有問題應排入計畫逐步處理，不阻擋當前開發。</li>
  <li>設定<b>品質門檻</b>：例如「新增程式碼不得有高風險發現」才允許合併。</li>
  <li>誤報需記錄原因並調整規則，避免開發團隊失去信任。</li>
</ul>` },
    { id: 'devsecops', title: 'DevSecOps 流水線', html: `
<div class="flow">
  <div><b>提交前</b><span>IDE 外掛、pre-commit 秘密掃描</span></div>
  <div><b>程式碼審查</b><span>同儕審查、安全檢核表</span></div>
  <div><b>建置</b><span>SAST、SCA、授權檢查</span></div>
  <div><b>容器化</b><span>映像檔弱點掃描、不使用 root</span></div>
  <div><b>測試環境</b><span>DAST、組態檢查</span></div>
  <div><b>部署</b><span>簽章驗證、IaC 政策檢查</span></div>
  <div><b>執行期</b><span>監控、入侵偵測、弱點重掃</span></div>
</div>
<h3>CI/CD 自身的安全</h3>
<ul>
  <li>建置系統擁有高權限，是<strong>供應鏈攻擊的重點目標</strong>，需比照核心系統保護。</li>
  <li>流水線使用的憑證採最小權限、短期有效，優先使用 OIDC 聯合身分取代長期金鑰。</li>
  <li>固定第三方動作或套件的版本（以雜湊鎖定），避免上游被竄改。</li>
  <li>保護主要分支：強制審查、禁止直接推送、簽署提交。</li>
  <li>產出<b>來源證明（Provenance）</b>與 SBOM，供下游驗證。</li>
</ul>` },
    { id: 'secrets', title: '秘密管理與安全程式撰寫', html: `
<h3>秘密管理</h3>
<ul>
  <li>不得把金鑰、密碼、權杖寫在程式碼或設定檔中並提交到版本庫。</li>
  <li>使用<b>秘密管理系統</b>（如 Vault、雲端 Secrets Manager）集中保管，於執行期注入。</li>
  <li>一旦外洩，必須<strong>立即輪替</strong>；僅從版本庫刪除檔案無效，歷史紀錄仍可取得。</li>
  <li>為秘密設定自動輪替與存取稽核。</li>
</ul>
<h3>安全程式撰寫重點</h3>
<div class="table-wrap"><table>
<tr><th>主題</th><th>作法</th></tr>
<tr><td>輸入驗證</td><td>在伺服器端以<b>白名單</b>驗證型別、長度、格式、範圍</td></tr>
<tr><td>輸出編碼</td><td>依輸出位置選擇對應編碼</td></tr>
<tr><td>錯誤處理</td><td>對使用者顯示一般性訊息，詳細資訊只寫入日誌</td></tr>
<tr><td>日誌</td><td>記錄安全事件；避免記錄密碼、完整卡號、權杖</td></tr>
<tr><td>密碼學</td><td>使用標準函式庫，不自行實作；亂數使用密碼學安全的產生器</td></tr>
<tr><td>相依套件</td><td>鎖定版本、定期更新、移除未使用套件</td></tr>
<tr><td>記憶體安全</td><td>新專案優先選用記憶體安全語言；C／C++ 專案啟用編譯器防護</td></tr>
</table></div>
<div class="box warn"><b class="t">常見錯誤</b>只在前端（JavaScript）做輸入驗證。前端驗證只是提升使用體驗，攻擊者可直接呼叫 API，<b>伺服器端必須重新驗證</b>。</div>` }
  ],
  keypoints: [
    '安全活動左移；設計階段做威脅建模、開發階段 SAST 與 SCA、測試階段 DAST',
    'ASVS 分三級，可作為驗收檢核；SSDF、SAMM、BSIMM 為常見框架',
    'SAST 白箱誤報較高、DAST 黑箱誤報低但覆蓋受限、SCA 針對第三方套件',
    'CI/CD 本身是供應鏈攻擊目標，憑證採短期最小權限並固定相依版本',
    '秘密不可進版本庫，外洩後必須輪替而非僅刪除檔案',
    '輸入驗證必須在伺服器端以白名單進行'
  ]
},
{
  id: 'c11', subject: 2, minutes: 50,
  title: '安全測試與紅藍隊演練',
  summary: '滲透測試的授權與流程、測試範圍與規則、報告撰寫、紅藍紫隊演練設計與漏洞揭露機制。',
  sections: [
    { id: 'legal', title: '授權與測試規則', html: `
<div class="box warn"><b class="t">前提</b>任何安全測試都必須取得<b>書面授權</b>。未經授權對他人系統進行掃描或入侵測試，可能觸犯刑法妨害電腦使用罪章。授權文件應由有權決定該系統的管理階層簽署。</div>
<h3>授權書與測試規則（Rules of Engagement）應載明</h3>
<ul>
  <li><b>範圍</b>：明確的網域、IP 範圍、應用系統；並列出<strong>排除項目</strong>。</li>
  <li><b>時間</b>：測試期間與允許的時段（避開營運尖峰）。</li>
  <li><b>允許與禁止的行為</b>：是否允許阻斷服務測試、社交工程、實體入侵；是否允許取出真實資料。</li>
  <li><b>測試來源 IP</b>：供防守方辨識，避免誤判為真實攻擊。</li>
  <li><b>緊急聯絡人與中止條件</b>：發現系統不穩定或重大漏洞時的通報與停止程序。</li>
  <li><b>資料處理</b>：測試過程取得的資料如何保存、加密與銷毀。</li>
  <li><b>保密與責任</b>：保密協議、保險與免責範圍。</li>
</ul>
<div class="box exam"><b class="t">考點提示</b>若測試過程中意外發現<b>正在進行中的真實入侵</b>，應立即停止測試並依事先約定通知委託方的緊急聯絡人，不可自行處置。</div>` },
    { id: 'types', title: '測試類型與流程', html: `
<div class="table-wrap"><table>
<tr><th>比較項目</th><th>弱點掃描</th><th>滲透測試</th><th>紅隊演練</th></tr>
<tr><td>目的</td><td>找出已知弱點</td><td>驗證弱點可被利用的程度</td><td>驗證組織的偵測與應變能力</td></tr>
<tr><td>範圍</td><td>廣</td><td>中等，明確界定</td><td>目標導向，路徑不限</td></tr>
<tr><td>防守方知情</td><td>知情</td><td>通常知情</td><td><strong>通常不知情</strong></td></tr>
<tr><td>時間</td><td>數小時</td><td>數日至數週</td><td>數週至數月</td></tr>
<tr><td>產出</td><td>弱點清單</td><td>利用路徑與風險評估</td><td>攻擊鏈重現與偵測落差分析</td></tr>
</table></div>
<h3>知識程度</h3>
<ul>
  <li><b>黑箱</b>：不提供內部資訊，模擬外部攻擊者，較貼近真實但可能遺漏深層問題。</li>
  <li><b>白箱</b>：提供架構文件、原始碼與帳號，覆蓋最完整，效率最高。</li>
  <li><b>灰箱</b>：提供一般使用者帳號，常用於驗證水平與垂直越權。</li>
</ul>
<h3>執行流程（PTES 概念）</h3>
<div class="flow">
  <div><b>事前互動</b><span>界定範圍與規則、簽署授權</span></div>
  <div><b>情報蒐集</b><span>被動 OSINT 與主動列舉</span></div>
  <div><b>威脅建模</b><span>找出可能的攻擊路徑</span></div>
  <div><b>弱點分析</b><span>驗證弱點是否確實存在</span></div>
  <div><b>利用驗證</b><span>在授權範圍內確認影響</span></div>
  <div><b>後續分析</b><span>評估可觸及的資產與衝擊</span></div>
  <div><b>報告與複測</b><span>提出修補建議並確認修補結果</span></div>
</div>
<p>測試結束後必須<strong>清理測試痕跡</strong>：移除測試帳號、上傳的檔案、設定變更，並交付清單供委託方確認。</p>` },
    { id: 'report', title: '報告撰寫', html: `
<p>報告是滲透測試的主要交付成果，應能同時滿足管理階層與技術人員。</p>
<div class="table-wrap"><table>
<tr><th>章節</th><th>內容</th></tr>
<tr><td>管理摘要</td><td>以非技術語言說明整體風險態勢、重大發現與建議，避免術語</td></tr>
<tr><td>測試範圍與方法</td><td>範圍、時間、方法、限制與未測試項目</td></tr>
<tr><td>發現事項</td><td>每項包含：標題、風險等級（CVSS）、影響資產、技術說明、<b>重現步驟</b>、<b>證據</b>、<b>修補建議</b>、參考資料</td></tr>
<tr><td>整體建議</td><td>共通性根因（如缺乏輸入驗證規範、修補流程不足）與制度面建議</td></tr>
<tr><td>附錄</td><td>工具清單、測試帳號、清理確認</td></tr>
</table></div>
<ul>
  <li>風險等級應結合<b>可利用性</b>與<b>業務衝擊</b>，而非僅看技術嚴重度。</li>
  <li>修補建議要具體可行，並區分<b>立即緩解</b>與<b>根本修補</b>。</li>
  <li>報告本身含敏感資訊，需加密傳遞、限制分發並約定保存期限。</li>
  <li>修補完成後安排<b>複測</b>，確認問題已解決且未引入新問題。</li>
</ul>` },
    { id: 'teams', title: '紅藍紫隊與演練設計', html: `
<div class="concepts">
  <div class="concept"><b>紅隊</b><span>模擬具特定目標的攻擊者，測試偵測與應變能力</span></div>
  <div class="concept"><b>藍隊</b><span>負責監控、偵測、分析與回應</span></div>
  <div class="concept"><b>紫隊</b><span>紅藍協作，攻擊後立即分享手法並共同調校偵測規則</span></div>
  <div class="concept"><b>白隊</b><span>演練控制與裁判，掌握範圍與安全停止機制</span></div>
</div>
<h3>紫隊演練的作法</h3>
<ol>
  <li>依 ATT&CK 選定要驗證的技術清單。</li>
  <li>紅隊依序執行，藍隊同步觀察 SIEM 與 EDR 是否產生告警。</li>
  <li>逐項記錄結果：<b>已偵測並告警／有日誌但無告警／完全無紀錄</b>。</li>
  <li>針對落差補強日誌來源與偵測規則，並重新驗證。</li>
</ol>
<div class="box tip"><b class="t">成效衡量</b>紫隊演練的價值在於提升<b>偵測覆蓋率</b>與縮短<b>平均偵測時間（MTTD）</b>，而非紅隊是否「成功」。</div>
<h3>漏洞揭露機制</h3>
<ul>
  <li><b>漏洞揭露政策（VDP）</b>：公開說明回報管道、處理時程與安全港（Safe Harbor）條款，鼓勵善意回報。</li>
  <li><b>漏洞獎勵計畫（Bug Bounty）</b>：提供獎金，需明訂範圍與禁止行為。</li>
  <li><b>協同揭露</b>：研究者通報廠商並約定公開時程，兼顧使用者安全與資訊透明。</li>
  <li>我國可透過 <b>TVN 台灣漏洞通報平台</b>、TWCERT/CC 進行通報協調。</li>
</ul>` }
  ],
  keypoints: [
    '任何測試都須書面授權；RoE 應載明範圍、時間、禁止行為、來源 IP 與中止條件',
    '測試中發現真實入侵應立即停止並通知緊急聯絡人',
    '紅隊演練防守方通常不知情，重點是驗證偵測與應變能力',
    '黑箱模擬外部、白箱覆蓋最完整、灰箱常用於越權驗證',
    '報告需含管理摘要、重現步驟、證據與修補建議，並安排複測',
    '紫隊以 ATT&CK 逐項驗證偵測落差；VDP 需提供安全港條款'
  ]
},
{
  id: 'c12', subject: 2, minutes: 55,
  title: '資安監控與事件應變',
  summary: 'SIEM 使用案例設計、日誌來源優先順序、事件分級與應變程序、勒索軟體處置、鑑識證據保全與事後檢討。',
  sections: [
    { id: 'usecase', title: 'SIEM 使用案例設計', html: `
<p>導入 SIEM 常見的失敗原因是「把所有日誌丟進去卻沒有規則」。正確作法是從<strong>威脅情境</strong>反推所需日誌。</p>
<div class="flow">
  <div><b>選定威脅情境</b><span>依風險評鑑與 ATT&CK 挑選</span></div>
  <div><b>定義偵測邏輯</b><span>條件、門檻、時間窗</span></div>
  <div><b>確認日誌來源</b><span>欄位是否足夠</span></div>
  <div><b>調校門檻</b><span>以歷史資料測試誤報率</span></div>
  <div><b>撰寫處理手冊</b><span>Playbook：告警後怎麼做</span></div>
  <div><b>持續檢討</b><span>定期檢視有效性</span></div>
</div>
<h3>常見使用案例</h3>
<div class="table-wrap"><table>
<tr><th>情境</th><th>偵測邏輯</th><th>所需日誌</th></tr>
<tr><td>密碼噴灑</td><td>短時間內大量帳號登入失敗，來源集中</td><td>AD 事件 4625、VPN</td></tr>
<tr><td>不可能的旅行</td><td>同一帳號短時間自地理距離過遠的位置登入</td><td>SSO、雲端登入紀錄</td></tr>
<tr><td>特權帳號異常使用</td><td>非上班時間、非管理網段使用管理員帳號</td><td>AD 4624／4672、PAM</td></tr>
<tr><td>疑似資料外洩</td><td>單一帳號大量下載或外傳量異常</td><td>Proxy、DLP、檔案伺服器稽核</td></tr>
<tr><td>C2 通訊</td><td>連線至威脅情資中的惡意網域、固定間隔的連線行為</td><td>DNS、防火牆、Proxy</td></tr>
<tr><td>日誌異常中斷</td><td>關鍵來源停止送出日誌</td><td>SIEM 自身監控</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>告警需要<b>可行動</b>。每條規則都應附帶處理手冊，說明如何查證、如何分級、何時升級，否則只會造成告警疲勞。</div>` },
    { id: 'triage', title: '告警分流與事件分級', html: `
<h3>分流（Triage）步驟</h3>
<ol>
  <li><b>確認真偽</b>：檢查原始日誌與上下文，排除已知的正常行為。</li>
  <li><b>判斷範圍</b>：涉及哪些帳號、主機、資料。</li>
  <li><b>評估衝擊</b>：是否涉及核心系統或個資。</li>
  <li><b>分級並升級</b>：依等級啟動對應的應變程序與通報。</li>
</ol>
<h3>事件分級考量</h3>
<div class="table-wrap"><table>
<tr><th>面向</th><th>判斷重點</th></tr>
<tr><td>影響範圍</td><td>單一端點、部門、全組織</td></tr>
<tr><td>資料敏感度</td><td>是否涉及個資、營業秘密、國家機密</td></tr>
<tr><td>業務衝擊</td><td>核心業務是否中斷、影響多少客戶</td></tr>
<tr><td>法規要求</td><td>是否觸發通報義務與時限</td></tr>
<tr><td>攻擊者位置</td><td>仍在外部、已取得內部立足點、已取得網域權限</td></tr>
</table></div>
<p>我國資通安全事件分為 1 至 4 級，<b>4 級最嚴重</b>；知悉後 <b>1 小時內</b>通報，1、2 級於 <b>72 小時內</b>、3、4 級於 <b>36 小時內</b>完成損害控制或復原，並於完成後 <b>1 個月內</b>提交改善報告。</p>` },
    { id: 'response', title: '應變程序與勒索軟體處置', html: `
<div class="flow">
  <div><b>準備</b><span>CSIRT、聯絡清單、工具、離線通訊管道</span></div>
  <div><b>偵測與分析</b><span>確認事件、保全證據、判定範圍</span></div>
  <div><b>圍堵</b><span>短期隔離、長期阻斷持久化</span></div>
  <div><b>根除</b><span>移除惡意程式、關閉入侵途徑、重設憑證</span></div>
  <div><b>復原</b><span>由乾淨備份還原、加強監控後再上線</span></div>
  <div><b>事後檢討</b><span>根因分析與改善追蹤</span></div>
</div>
<h3>勒索軟體事件處置要點</h3>
<ul>
  <li><b>隔離</b>：將受影響主機自網路移除，但<strong>不要急著關機</strong>——記憶體中可能保有關鍵證據與金鑰線索。</li>
  <li><b>保護備份</b>：立即確認備份系統是否遭存取，必要時中斷備份伺服器與網路的連線。</li>
  <li><b>重設憑證</b>：假設網域憑證已外洩，依序重設特權帳號密碼；網域遭入侵時需處理 krbtgt。</li>
  <li><b>評估範圍</b>：確認是否同時發生資料外洩（雙重勒索），這會影響個資通報義務。</li>
  <li><b>復原順序</b>：先重建乾淨的網域與身分基礎，再還原業務系統，避免重複感染。</li>
  <li><b>關於支付贖金</b>：無法保證可還原，且可能涉及法律與制裁風險，應由管理階層會同法務決定；多數主管機關不建議支付。</li>
  <li>使用<b>頻外（Out-of-band）通訊</b>：假設既有郵件與通訊系統已遭監聽。</li>
</ul>
<div class="box warn"><b class="t">圍堵的取捨</b>立即斷網可阻止擴散，但可能驚動攻擊者使其破壞證據或加速破壞；延後處理則有擴大風險。此決策應由事件指揮官依資產重要性與攻擊階段判斷，並記錄理由。</div>` },
    { id: 'forensics', title: '鑑識證據保全', html: `
<h3>揮發性順序（RFC 3227）</h3>
<ol>
  <li>CPU 暫存器與快取</li>
  <li><b>記憶體內容</b>、路由表、ARP 快取、行程清單、網路連線</li>
  <li>暫存檔案系統</li>
  <li>硬碟</li>
  <li>遠端日誌與監控資料</li>
  <li>實體組態與網路拓撲</li>
  <li>封存媒體</li>
</ol>
<h3>保全原則</h3>
<ul>
  <li>先蒐集揮發性高的資料：記憶體傾印應在斷電或關機前完成。</li>
  <li>使用<b>寫入保護器</b>製作位元對位元映像檔，分析只在副本上進行。</li>
  <li>取證前後計算<b>雜湊值</b>並記錄，確保完整性可驗證。</li>
  <li>維護<b>證據監管鏈</b>：每次交接記錄時間、經手人、目的與保管方式。</li>
  <li>完整記錄所有操作，包括執行過的指令與時間。</li>
  <li>雲端環境需額外保存：管理平台操作紀錄、快照、身分驗證日誌，並注意日誌保存期限可能很短。</li>
</ul>
<div class="box exam"><b class="t">考點提示</b>事件現場優先順序：<b>人身安全 → 阻止擴大 → 保全證據 → 恢復營運</b>。若組織可能提起訴訟，證據處理程序必須由具備能力的人員依規範執行。</div>` },
    { id: 'lessons', title: '事後檢討與指標', html: `
<h3>事後檢討會議（Post-Incident Review）</h3>
<ul>
  <li>採<b>不究責（Blameless）</b>原則，聚焦流程與系統的缺口而非個人。</li>
  <li>建立<b>事件時間軸</b>：初始入侵、首次偵測、通報、圍堵、根除、復原各時點。</li>
  <li>以<b>5 Why</b> 或魚骨圖做根因分析，區分<b>直接原因</b>與<b>系統性原因</b>。</li>
  <li>產出具體改善行動，指定負責人與期限，並納入追蹤。</li>
</ul>
<h3>常用指標</h3>
<div class="table-wrap"><table>
<tr><th>指標</th><th>意義</th></tr>
<tr><td>MTTD 平均偵測時間</td><td>入侵發生至被發現的時間，越短越好</td></tr>
<tr><td>停留時間 Dwell Time</td><td>攻擊者在環境中未被發現的期間</td></tr>
<tr><td>MTTR 平均回應／復原時間</td><td>發現至處理完成的時間</td></tr>
<tr><td>誤報率</td><td>衡量偵測規則品質</td></tr>
<tr><td>偵測覆蓋率</td><td>ATT&CK 技術中具備偵測能力的比率</td></tr>
</table></div>
<div class="box tip"><b class="t">改善回饋</b>每次事件的根因都應回饋到風險評鑑、控制措施與教育訓練，形成 ISMS 的改善循環（條文 10）。</div>` }
  ],
  keypoints: [
    'SIEM 應由威脅情境反推日誌需求，每條規則都要有處理手冊',
    '分流步驟：確認真偽、判斷範圍、評估衝擊、分級升級',
    '勒索軟體：先隔離網路但不急著關機，立即確認備份是否受影響',
    '圍堵與保全證據之間需取捨，決策理由應記錄',
    '揮發性順序：記憶體優先於硬碟；在映像副本上分析並維護證據監管鏈',
    '事後檢討採不究責原則，追蹤 MTTD、停留時間與偵測覆蓋率'
  ]
},
{
  id: 'c13', subject: 2, minutes: 50,
  title: '雲端與容器安全防護',
  summary: '共同責任模型落實、雲端身分與組態管理、容器與 Kubernetes 安全、無伺服器架構與雲端日誌監控。',
  sections: [
    { id: 'shared', title: '共同責任的實務落實', html: `
<div class="table-wrap"><table>
<tr><th>層面</th><th>IaaS</th><th>PaaS</th><th>SaaS</th></tr>
<tr><td>資料分類與保護</td><td colspan="3" style="text-align:center">客戶</td></tr>
<tr><td>身分與存取管理</td><td colspan="3" style="text-align:center">客戶</td></tr>
<tr><td>應用程式安全</td><td>客戶</td><td>客戶</td><td>供應商</td></tr>
<tr><td>作業系統與中介軟體</td><td>客戶</td><td>供應商</td><td>供應商</td></tr>
<tr><td>虛擬化、實體設施</td><td colspan="3" style="text-align:center">供應商</td></tr>
</table></div>
<p>雲端事故的多數成因是<strong>客戶端組態錯誤</strong>，常見情形包括：儲存貯體設為公開、安全群組對 0.0.0.0/0 開放管理埠、過度授權的角色、未啟用稽核日誌、金鑰硬編碼於程式中。</p>
<div class="box exam"><b class="t">考點提示</b>供應商提供的是「雲端<b>本身</b>的安全」，客戶負責「雲端<b>之中</b>的安全」。不論服務模式為何，<b>資料與身分權限永遠是客戶責任</b>。</div>` },
    { id: 'identity', title: '雲端身分與權限', html: `
<ul>
  <li><b>避免長期存取金鑰</b>：以角色（Role）與臨時憑證取代；CI/CD 使用 OIDC 聯合身分。</li>
  <li><b>最小權限</b>：避免萬用字元權限；善用權限邊界與服務控制政策（SCP）設定上限。</li>
  <li><b>根帳號保護</b>：啟用硬體 MFA、不用於日常操作、移除存取金鑰。</li>
  <li><b>權限分析</b>：定期檢視「已授予但未使用」的權限並收斂。</li>
  <li><b>跨帳號存取</b>：以角色委派並限制信任來源，避免「混淆代理人」問題。</li>
  <li><b>執行個體中繼資料</b>：使用 IMDSv2，降低 SSRF 竊取臨時憑證的風險。</li>
</ul>
<h3>雲端安全工具</h3>
<div class="table-wrap"><table>
<tr><th>工具</th><th>用途</th></tr>
<tr><td><b>CSPM</b></td><td>持續檢查組態是否偏離基準（如公開儲存體、未加密磁碟）</td></tr>
<tr><td><b>CWPP</b></td><td>保護工作負載：虛擬機、容器、無伺服器函式</td></tr>
<tr><td><b>CIEM</b></td><td>雲端權限管理，分析並收斂過度授權</td></tr>
<tr><td><b>CNAPP</b></td><td>整合上述能力的雲端原生應用防護平台</td></tr>
<tr><td><b>CASB</b></td><td>管控 SaaS 使用、發現影子 IT</td></tr>
</table></div>` },
    { id: 'container', title: '容器與 Kubernetes 安全', html: `
<h3>映像檔與建置</h3>
<ul>
  <li>使用最小化基礎映像（distroless、Alpine），減少攻擊面。</li>
  <li>以<b>多階段建置</b>避免把編譯工具與原始碼帶進正式映像。</li>
  <li>建置時掃描映像檔弱點與秘密；以<b>摘要（digest）</b>而非 <code>latest</code> 標籤鎖定版本。</li>
  <li>映像檔簽章與驗證（如 Sigstore／cosign），只允許來自受信任登錄庫的映像。</li>
</ul>
<h3>執行期</h3>
<ul>
  <li>容器<strong>不以 root 執行</strong>，設定唯讀根檔案系統、移除不必要的 Linux Capabilities。</li>
  <li>禁止特權容器（privileged），避免掛載主機的 Docker socket 或敏感路徑。</li>
  <li>設定資源限制（CPU、記憶體），防止單一容器耗盡節點資源。</li>
</ul>
<h3>Kubernetes 重點</h3>
<div class="table-wrap"><table>
<tr><th>面向</th><th>措施</th></tr>
<tr><td>存取控制</td><td>RBAC 最小權限，限制 cluster-admin；ServiceAccount 不自動掛載不必要的權杖</td></tr>
<tr><td>工作負載安全</td><td>Pod Security Admission（baseline／restricted）取代已移除的 PodSecurityPolicy</td></tr>
<tr><td>網路</td><td>預設命名空間間不可互通，以 NetworkPolicy 明確放行</td></tr>
<tr><td>秘密</td><td>Secret 預設僅為 Base64 編碼，應啟用靜態加密或改用外部秘密管理</td></tr>
<tr><td>控制平面</td><td>保護 etcd（加密與存取限制）、關閉匿名存取、啟用稽核日誌</td></tr>
<tr><td>供應鏈</td><td>准入控制器驗證映像簽章與政策（如 OPA Gatekeeper、Kyverno）</td></tr>
</table></div>
<div class="box warn"><b class="t">常見風險</b>容器與主機共用核心，隔離性不如虛擬機。具特權的容器一旦遭入侵，可能影響整個節點，因此特權容器應嚴格禁止並以政策強制。</div>` },
    { id: 'serverless', title: '無伺服器與雲端監控', html: `
<h3>無伺服器（Serverless）安全</h3>
<ul>
  <li>攻擊面轉移到<b>函式權限</b>與<b>事件輸入</b>：每個函式應有獨立且最小的角色。</li>
  <li>所有事件來源（API 閘道、佇列、儲存體通知）的輸入都須視為不受信任。</li>
  <li>相依套件漏洞仍是主要風險，需持續執行 SCA。</li>
  <li>秘密由秘密管理服務注入，不寫在環境變數明文中。</li>
  <li>函式逾時與併發數限制，避免成本遭惡意耗用。</li>
</ul>
<h3>雲端日誌與監控</h3>
<div class="table-wrap"><table>
<tr><th>日誌</th><th>用途</th></tr>
<tr><td>管理平台操作紀錄</td><td>誰在何時建立、修改、刪除了哪些資源（鑑識核心來源）</td></tr>
<tr><td>資料存取紀錄</td><td>儲存體與資料庫的讀寫行為</td></tr>
<tr><td>網路流量紀錄</td><td>VPC Flow Logs，用於分析異常連線</td></tr>
<tr><td>身分驗證紀錄</td><td>登入成功與失敗、MFA 狀態</td></tr>
<tr><td>DNS 查詢紀錄</td><td>偵測 C2 與資料外洩通道</td></tr>
</table></div>
<ul>
  <li>日誌應跨帳號集中到<b>專用的安全帳號</b>，並設定不可變與防刪除，避免攻擊者清除痕跡。</li>
  <li>設定關鍵告警：根帳號登入、安全群組大幅開放、日誌服務被停用、金鑰異常呼叫。</li>
  <li>注意預設保存期限，依法規需求延長。</li>
</ul>` }
  ],
  keypoints: [
    '供應商負責雲端本身、客戶負責雲端之中；資料與身分永遠是客戶責任',
    '雲端事故多源自組態錯誤；以 CSPM 持續檢查、CIEM 收斂權限',
    '避免長期金鑰，改用角色與臨時憑證；啟用 IMDSv2 降低 SSRF 風險',
    '容器不以 root 執行、禁止特權容器、以摘要鎖定映像並驗證簽章',
    'Kubernetes：RBAC 最小權限、NetworkPolicy 明確放行、Secret 需額外加密',
    '雲端日誌集中於專用安全帳號並設為不可變'
  ]
},
{
  id: 'c14', subject: 2, minutes: 45,
  title: 'OT、IoT 與新興科技防護',
  summary: 'OT 與 IT 的差異、Purdue 模型與工控防護、IoT 裝置管理、行動應用安全，以及 AI 系統的風險與治理。',
  sections: [
    { id: 'ot', title: 'OT 與 IT 的差異', html: `
<div class="table-wrap"><table>
<tr><th>面向</th><th>IT</th><th>OT</th></tr>
<tr><td>優先順序</td><td>機密性 &gt; 完整性 &gt; 可用性</td><td><b>人身安全</b> &gt; 可用性 &gt; 完整性 &gt; 機密性</td></tr>
<tr><td>生命週期</td><td>3～5 年</td><td>10～30 年，常見不再支援的系統</td></tr>
<tr><td>修補</td><td>可定期更新</td><td>需停機，常須等待歲修，往往以補償控制替代</td></tr>
<tr><td>通訊協定</td><td>TCP/IP、HTTPS</td><td>Modbus、DNP3、PROFINET 等，多數<strong>無內建驗證與加密</strong></td></tr>
<tr><td>即時性</td><td>容許延遲</td><td>毫秒級要求，掃描或探測可能造成異常</td></tr>
</table></div>
<div class="box warn"><b class="t">實務注意</b>一般的主動式弱點掃描可能使老舊 PLC 當機。OT 環境應優先採用<b>被動式流量分析</b>，必要的主動掃描須在停機時段並事先測試。</div>` },
    { id: 'purdue', title: 'Purdue 模型與工控防護', html: `
<div class="table-wrap"><table>
<tr><th>層級</th><th>內容</th></tr>
<tr><td>Level 4／5</td><td>企業網路、ERP（IT 範圍）</td></tr>
<tr><td><b>Level 3.5 DMZ</b></td><td>IT 與 OT 之間的緩衝區，放置跳板機、資料歷史資料庫複本、更新伺服器</td></tr>
<tr><td>Level 3</td><td>生產運作管理、MES</td></tr>
<tr><td>Level 2</td><td>監控與 HMI、SCADA</td></tr>
<tr><td>Level 1</td><td>控制器：PLC、DCS</td></tr>
<tr><td>Level 0</td><td>實體流程：感測器、致動器</td></tr>
</table></div>
<h3>防護重點</h3>
<ul>
  <li><b>區隔與管道（Zones and Conduits）</b>：IEC 62443 的核心概念，將設備依風險分區，區間通訊限定於受控管道。</li>
  <li>IT 與 OT 之間不可直接連通，所有流量經 Level 3.5 DMZ；高安全需求可採<b>單向閘道（Data Diode）</b>。</li>
  <li>遠端維護須經跳板機、採 MFA、限時開通並全程側錄。</li>
  <li>嚴格管控可攜式媒體：使用專用的掃毒檢查站。</li>
  <li>工程師工作站（EWS）比照特權工作站管理，不可用於收發郵件與上網。</li>
  <li><b>安全儀控系統（SIS）</b>應與一般控制網路實體隔離，避免同時遭影響。</li>
</ul>
<p>相關標準：<b>IEC 62443</b>（工業自動化與控制系統資安，分為安全等級 SL 1～4）、NIST SP 800-82。</p>` },
    { id: 'iot', title: 'IoT 裝置安全管理', html: `
<ul>
  <li><b>採購階段</b>：要求可更新韌體、支援期限承諾、不使用預設密碼、具備資安標章或認證。</li>
  <li><b>部署</b>：變更預設憑證、關閉不必要服務（Telnet、UPnP）、置於<strong>獨立網段</strong>並限制對內與對外連線。</li>
  <li><b>維運</b>：納入資產清冊、定期更新韌體、監控異常流量。</li>
  <li><b>汰除</b>：恢復原廠設定並清除儲存的憑證與個資。</li>
</ul>
<h3>常見風險</h3>
<div class="table-wrap"><table>
<tr><th>風險</th><th>說明</th></tr>
<tr><td>預設或硬編碼憑證</td><td>大量裝置使用相同帳密，易被自動化工具入侵並組成殭屍網路</td></tr>
<tr><td>韌體更新機制不足</td><td>無法更新或更新未驗證簽章</td></tr>
<tr><td>通訊未加密</td><td>資料遭竊聽或竄改</td></tr>
<tr><td>管理介面曝露於網際網路</td><td>應透過 VPN 或雲端平台存取</td></tr>
<tr><td>供應鏈與元件來源</td><td>需確認晶片與模組來源，注意法規對特定廠牌的限制</td></tr>
</table></div>` },
    { id: 'mobile', title: '行動應用安全', html: `
<p>參考 <b>OWASP Mobile Top 10</b> 與 MASVS。常見防護重點：</p>
<ul>
  <li><b>本機資料保護</b>：敏感資料存於系統安全儲存區（Keychain／Keystore），不寫入日誌與外部儲存。</li>
  <li><b>傳輸安全</b>：強制 TLS，必要時使用<b>憑證釘選（Certificate Pinning）</b>。</li>
  <li><b>驗證與授權</b>：所有授權判斷都在伺服器端，不信任用戶端送來的角色欄位。</li>
  <li><b>防逆向</b>：程式碼混淆、移除除錯符號；偵測越獄與 Root 環境並降級功能。</li>
  <li><b>第三方 SDK</b>：評估其蒐集的資料與權限，避免過度蒐集。</li>
  <li><b>最小權限</b>：只申請必要的裝置權限，並說明用途。</li>
</ul>
<div class="box tip"><b class="t">提醒</b>用戶端的防護（混淆、越獄偵測）只能提高攻擊成本，無法作為唯一防線；安全決策必須在伺服器端執行。</div>` },
    { id: 'ai', title: 'AI 系統風險與治理', html: `
<h3>OWASP Top 10 for LLM Applications 重點風險</h3>
<div class="table-wrap"><table>
<tr><th>風險</th><th>說明</th><th>緩解方向</th></tr>
<tr><td>提示注入</td><td>惡意指令藏在使用者輸入或外部內容中，使模型偏離原本任務</td><td>區隔系統指令與外部內容、輸出驗證、對高風險動作要求人工確認</td></tr>
<tr><td>敏感資訊揭露</td><td>模型輸出訓練資料或他人資料</td><td>輸入過濾、資料最小化、輸出審查</td></tr>
<tr><td>供應鏈風險</td><td>第三方模型、資料集或套件遭竄改</td><td>來源驗證、簽章、SBOM</td></tr>
<tr><td>資料與模型投毒</td><td>污染訓練或微調資料，植入偏誤或後門</td><td>資料來源管控、異常偵測、版本控管</td></tr>
<tr><td>過度代理權（Excessive Agency）</td><td>給予模型過多可執行的工具與權限</td><td>最小權限、限制可呼叫的工具、重要操作需人工核准</td></tr>
<tr><td>不當輸出處理</td><td>將模型輸出直接執行或嵌入網頁</td><td>輸出一律視為不受信任資料，比照使用者輸入處理</td></tr>
<tr><td>無限制資源消耗</td><td>大量請求造成成本暴增</td><td>速率限制、配額、逾時</td></tr>
</table></div>
<h3>治理與法規</h3>
<ul>
  <li><b>ISO/IEC 42001</b>：AI 管理系統（AIMS），可驗證的管理制度。</li>
  <li><b>NIST AI RMF</b>：治理、對應、量測、管理四大功能。</li>
  <li><b>歐盟 AI 法</b>：依風險分級（不可接受、高風險、有限風險、最小風險）課予不同義務。</li>
  <li>組織應訂定<b>AI 使用政策</b>：可使用的工具、禁止輸入的資料類型、輸出須經人工覆核的情境、留存紀錄要求。</li>
</ul>
<div class="box exam"><b class="t">考點提示</b>深偽技術用於假冒主管要求匯款時，防護重點是<b>流程設計</b>：建立回撥確認與雙人覆核，而非僅依賴辨識影像真偽。</div>` }
  ],
  keypoints: [
    'OT 以人身安全與可用性優先；協定多無驗證加密，主動掃描可能造成當機',
    'Purdue 模型以 Level 3.5 DMZ 區隔 IT 與 OT；IEC 62443 採區隔與管道概念',
    'IoT 從採購即要求可更新與無預設密碼，部署時獨立網段',
    '行動應用的授權判斷必須在伺服器端，用戶端防護只能提高攻擊成本',
    'LLM 風險：提示注入、過度代理權、不當輸出處理；輸出須視為不受信任資料',
    'AI 治理：ISO/IEC 42001、NIST AI RMF、歐盟 AI 法風險分級'
  ]
}
);
