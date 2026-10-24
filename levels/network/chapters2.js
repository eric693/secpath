/* 網路基礎 實務篇：交換、路由、服務與排錯 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 50,
  title: '交換技術與 VLAN',
  summary: '碰撞域與廣播域、VLAN 的用途與設定、存取埠與 Trunk、802.1Q 標記、跨 VLAN 路由、STP 防止迴圈，以及鏈路聚合。',
  sections: [
    { id: 'domain', title: '碰撞域與廣播域', html: `
<table>
<tr><th>設備</th><th>碰撞域</th><th>廣播域</th></tr>
<tr><td>集線器</td><td>所有連接埠共用一個</td><td>一個</td></tr>
<tr><td>交換器</td><td><b>每個連接埠各自一個</b></td><td>預設整台一個（每個 VLAN 一個）</td></tr>
<tr><td>路由器</td><td>每個介面各自一個</td><td><b>每個介面各自一個</b></td></tr>
</table>
<p>交換器分割碰撞域、但不分割廣播域；要分割廣播域，需要<b>路由器</b>或 <b>VLAN</b>。</p>` },
    { id: 'vlan', title: 'VLAN 虛擬區域網路', html: `
<p><b>VLAN（Virtual LAN）</b>在同一台（或多台）交換器上，邏輯切出多個獨立的網路。不同 VLAN 的裝置就像接在不同的交換器上，廣播不會互相傳遞。</p>
<table>
<tr><th>好處</th><th>說明</th></tr>
<tr><td>安全</td><td>財務部、訪客、監視器分在不同 VLAN，彼此無法直接存取</td></tr>
<tr><td>效能</td><td>縮小廣播域，減少不必要的廣播流量</td></tr>
<tr><td>管理彈性</td><td>依部門或用途分組，不受實體位置限制</td></tr>
</table>
<pre class="out">VLAN 10  業務部   192.168.10.0/24
VLAN 20  研發部   192.168.20.0/24
VLAN 30  訪客     192.168.30.0/24
VLAN 99  網管     192.168.99.0/24</pre>
<ul>
  <li>VLAN ID 範圍 1～4094，<b>VLAN 1 是預設 VLAN</b>，所有連接埠預設都在 VLAN 1。基於安全考量，建議不要把使用者放在 VLAN 1。</li>
  <li>慣例上一個 VLAN 對應一個 IP 子網路。</li>
</ul>` },
    { id: 'trunk', title: '存取埠與 Trunk', html: `
<table>
<tr><th>連接埠類型</th><th>用途</th><th>承載的 VLAN</th></tr>
<tr><td><b>存取埠</b> Access Port</td><td>連接電腦、印表機等終端裝置</td><td>只屬於一個 VLAN</td></tr>
<tr><td><b>Trunk 埠</b></td><td>交換器與交換器、交換器與路由器之間</td><td>同時承載多個 VLAN 的流量</td></tr>
</table>
<p>Trunk 上的訊框會加上 <b>IEEE 802.1Q 標記（Tag）</b>，記錄它屬於哪個 VLAN，對方交換器才知道要送到哪個 VLAN。沒有標記的流量屬於 <b>Native VLAN</b>（預設為 VLAN 1），兩端的 Native VLAN 必須一致。</p>
<pre class="out">! Cisco 交換器設定範例
vlan 10
 name SALES
interface GigabitEthernet0/5
 switchport mode access
 switchport access vlan 10          ! 這個埠屬於 VLAN 10
interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,99   ! 只允許需要的 VLAN
show vlan brief
show interfaces trunk</pre>` },
    { id: 'intervlan', title: '跨 VLAN 路由', html: `
<p>不同 VLAN 是不同的網路，<b>彼此通訊必須經過第 3 層設備路由</b>。常見做法：</p>
<table>
<tr><th>方式</th><th>說明</th><th>適合</th></tr>
<tr><td><b>Router on a Stick</b></td><td>路由器一個實體介面接交換器的 Trunk，切出多個子介面，每個子介面對應一個 VLAN 並當作該 VLAN 的預設閘道</td><td>小型網路、考試常考</td></tr>
<tr><td><b>三層交換器 SVI</b></td><td>在三層交換器上為每個 VLAN 建立虛擬介面（interface vlan 10），直接在交換器內路由</td><td>企業網路最常見，效能好</td></tr>
</table>
<pre class="out">! Router on a Stick
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0</pre>
<div class="box exam"><b class="t">考點</b>「同一台交換器上的兩台電腦設定在不同 VLAN，ping 不通」是正常的，因為需要路由器或三層交換器才能跨 VLAN 通訊，且每台電腦的預設閘道要設為所屬 VLAN 的閘道位址。</div>` },
    { id: 'stp', title: 'STP 與鏈路聚合', html: `
<p>為了備援，交換器之間常會接多條線路，但在第 2 層形成迴圈時，廣播會無限循環，造成<b>廣播風暴</b>，幾秒內就癱瘓整個網路（乙太網路訊框沒有 TTL，不會自動消失）。</p>
<p><b>STP（Spanning Tree Protocol，生成樹協定）</b>會自動找出迴圈並<b>封鎖</b>部分連接埠，只保留一條路徑；主要路徑故障時，再自動開啟備援路徑。目前常用的是收斂較快的 <b>RSTP</b>（Rapid STP）。</p>
<ul>
  <li>選出<b>根橋（Root Bridge）</b>：橋接優先權最低者勝出，相同時比較 MAC 位址。</li>
  <li>其他交換器計算到根橋成本最低的路徑，多餘的路徑被封鎖。</li>
  <li><b>PortFast</b>：連接終端裝置的埠可以跳過等待，立即轉送；搭配 <b>BPDU Guard</b>，若這個埠收到交換器的 BPDU 就關閉，防止有人私接交換器造成迴圈。</li>
</ul>
<h3>鏈路聚合</h3>
<p><b>鏈路聚合（Link Aggregation／EtherChannel）</b>把多條實體線路綁成一條邏輯連線，增加頻寬並提供備援，STP 會把它視為一條連線而不封鎖。標準協定是 <b>LACP</b>（IEEE 802.3ad）。</p>
<div class="box memo"><b class="t">動手做</b>在 Cisco Packet Tracer 建立兩台交換器與四台電腦，設定兩個 VLAN 與 Trunk，確認同 VLAN 可以互通、跨 VLAN 不通；再加上 Router on a Stick 讓跨 VLAN 可以通訊。</div>` }
  ],
  keypoints: [
    '交換器每個連接埠是一個碰撞域；路由器每個介面是一個廣播域',
    'VLAN 在交換器上切出邏輯獨立的網路，分割廣播域並提升安全',
    'VLAN ID 1～4094，VLAN 1 是預設 VLAN；一個 VLAN 通常對應一個子網路',
    '存取埠屬於一個 VLAN；Trunk 用 802.1Q 標記承載多個 VLAN',
    '跨 VLAN 通訊需要路由：Router on a Stick 或三層交換器 SVI',
    'STP 封鎖多餘路徑防止第 2 層迴圈與廣播風暴；PortFast 搭配 BPDU Guard',
    '鏈路聚合（LACP）把多條線路綁成一條，增加頻寬與備援'
  ]
},
{
  id: 'c08', subject: 2, minutes: 50,
  title: '路由',
  summary: '路由器如何轉送封包、路由表的組成、直連、靜態與預設路由、最長前綴匹配、管理距離與度量值、動態路由協定 RIP、OSPF、BGP 的比較，以及路由排錯。',
  sections: [
    { id: 'how', title: '路由器怎麼轉送封包', html: `
<p>路由器收到封包後，查看<b>目的 IP</b>，在<b>路由表</b>中找出最適合的路徑，把封包從對應的介面送往<b>下一跳（Next Hop）</b>，並把 TTL 減 1（TTL 歸零就丟棄，避免封包無限循環）。</p>
<pre class="out">Router# show ip route
C    192.168.10.0/24 is directly connected, GigabitEthernet0/0
L    192.168.10.1/32 is directly connected, GigabitEthernet0/0
S    172.16.0.0/16 [1/0] via 10.0.0.2
O    10.20.0.0/16 [110/20] via 10.0.0.3, GigabitEthernet0/1
S*   0.0.0.0/0 [1/0] via 203.0.113.1

代碼：C 直連  L 本機介面位址  S 靜態  O OSPF  * 預設路由候選
[110/20] = [管理距離 / 度量值]</pre>` },
    { id: 'types', title: '直連、靜態與預設路由', html: `
<table>
<tr><th>類型</th><th>來源</th><th>特性</th></tr>
<tr><td><b>直連路由</b></td><td>介面設定 IP 並啟用後自動產生</td><td>不需設定</td></tr>
<tr><td><b>靜態路由</b></td><td>管理員手動設定</td><td>簡單、可預測，但網路變動時要手動修改，適合小型網路</td></tr>
<tr><td><b>預設路由</b></td><td>0.0.0.0/0</td><td>找不到其他符合的路由時使用，通常指向網際網路</td></tr>
<tr><td><b>動態路由</b></td><td>路由協定自動學習</td><td>網路變動時自動調整，適合大型網路</td></tr>
</table>
<pre class="out">! 靜態路由：前往 172.16.0.0/16 的封包送給 10.0.0.2
ip route 172.16.0.0 255.255.0.0 10.0.0.2
! 預設路由：其他所有目的地都送給 ISP 的路由器
ip route 0.0.0.0 0.0.0.0 203.0.113.1</pre>
<div class="box tip"><b class="t">電腦也有預設路由</b>電腦設定的「預設閘道」，其實就是電腦的預設路由：不是同網段的目的地，都送給這個閘道處理。</div>` },
    { id: 'lpm', title: '最長前綴匹配', html: `
<p>當目的 IP 同時符合多筆路由時，路由器選擇<b>前綴最長（最精確）</b>的那一筆，稱為<b>最長前綴匹配（Longest Prefix Match）</b>。</p>
<pre class="out">路由表：
10.0.0.0/8      via A
10.1.0.0/16     via B
10.1.2.0/24     via C
0.0.0.0/0       via D

目的 10.1.2.50   → 符合 /8、/16、/24、/0，選最長的 /24 → 送給 C
目的 10.1.9.9    → 符合 /8、/16、/0，選 /16 → 送給 B
目的 10.200.1.1  → 符合 /8、/0，選 /8 → 送給 A
目的 8.8.8.8     → 只符合 /0 → 送給 D（預設路由）</pre>
<div class="box exam"><b class="t">選擇順序</b>①先比<b>前綴長度</b>（最長者勝）；②前綴相同、來源不同時，比<b>管理距離</b>（越小越可信）；③同一協定內，比<b>度量值</b>（越小越好）。</div>` },
    { id: 'ad', title: '管理距離與度量值', html: `
<p><b>管理距離（Administrative Distance, AD）</b>代表路由來源的可信度，數字越小越優先：</p>
<table>
<tr><th>路由來源</th><th>預設 AD（Cisco）</th></tr>
<tr><td>直連</td><td>0</td></tr>
<tr><td>靜態路由</td><td>1</td></tr>
<tr><td>eBGP</td><td>20</td></tr>
<tr><td>EIGRP（內部）</td><td>90</td></tr>
<tr><td>OSPF</td><td>110</td></tr>
<tr><td>RIP</td><td>120</td></tr>
<tr><td>iBGP</td><td>200</td></tr>
</table>
<p><b>度量值（Metric）</b>是同一路由協定內比較路徑好壞的數值：RIP 用<b>跳數</b>，OSPF 用依頻寬計算的<b>成本（Cost）</b>。</p>
<div class="box tip"><b class="t">浮動靜態路由</b>把備援用的靜態路由 AD 設得比動態路由高（例如 ip route … 130），平常不會被使用；主要路由消失時才自動接手。</div>` },
    { id: 'dynamic', title: '動態路由協定', html: `
<table>
<tr><th>協定</th><th>類型</th><th>特性</th><th>使用場合</th></tr>
<tr><td><b>RIP</b></td><td>距離向量</td><td>以跳數為度量，最多 15 跳；收斂慢</td><td>教學、極小型網路（已少用）</td></tr>
<tr><td><b>OSPF</b></td><td>連結狀態</td><td>每台路由器掌握完整拓樸，用最短路徑演算法計算；收斂快、支援分區（Area 0 為骨幹）</td><td>企業內部網路最常用（CCNA 重點）</td></tr>
<tr><td><b>EIGRP</b></td><td>進階距離向量</td><td>Cisco 開發，收斂快</td><td>以 Cisco 設備為主的企業</td></tr>
<tr><td><b>BGP</b></td><td>路徑向量</td><td>在不同組織（自治系統 AS）之間交換路由，依政策選路</td><td>網際網路骨幹、ISP、大型企業與雲端</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>內部用 <b>IGP</b>（RIP、OSPF、EIGRP），組織之間用 <b>EGP</b>（BGP）。網際網路就是靠 BGP 把全世界的網路串在一起。</div>
<pre class="out">! OSPF 基本設定
router ospf 1
 network 192.168.10.0 0.0.0.255 area 0     ! 0.0.0.255 是萬用遮罩
 network 10.0.0.0 0.0.0.3 area 0
show ip ospf neighbor</pre>
<div class="box memo"><b class="t">動手做</b>在 Packet Tracer 建立三台路由器串接的網路，先用靜態路由讓兩端的電腦互通，再改用 OSPF，觀察 show ip route 的差異；拔掉一條線，觀察 OSPF 如何改走其他路徑。</div>` }
  ],
  keypoints: [
    '路由器依目的 IP 查路由表，送往下一跳並把 TTL 減 1',
    '路由表代碼：C 直連、S 靜態、O OSPF、S* 預設路由',
    '預設路由 0.0.0.0/0 在沒有其他符合的路由時使用；電腦的預設閘道就是預設路由',
    '最長前綴匹配：符合多筆時選前綴最長的路由',
    '選路順序：前綴長度 → 管理距離（越小越優先）→ 度量值',
    '預設 AD：直連 0、靜態 1、OSPF 110、RIP 120',
    'OSPF 是企業內部最常用的連結狀態協定；BGP 在組織之間交換路由'
  ]
},
{
  id: 'c09', subject: 2, minutes: 45,
  title: '傳輸層與常見埠號',
  summary: 'TCP 與 UDP 的比較、TCP 三向交握與連線結束、序號與重傳、流量控制、埠號的分類、常見服務埠號，以及 netstat 查看連線。',
  sections: [
    { id: 'compare', title: 'TCP 與 UDP', html: `
<table>
<tr><th>比較</th><th>TCP</th><th>UDP</th></tr>
<tr><td>連線</td><td><b>連線導向</b>，傳資料前先建立連線</td><td><b>非連線導向</b>，直接傳送</td></tr>
<tr><td>可靠性</td><td>確認送達、遺失重傳、依序重組</td><td>不保證送達、不保證順序</td></tr>
<tr><td>速度與負擔</td><td>較慢、標頭較大</td><td>較快、標頭小</td></tr>
<tr><td>流量控制</td><td>有（滑動視窗）</td><td>沒有</td></tr>
<tr><td>適用</td><td>網頁、Email、檔案傳輸、SSH</td><td>DNS 查詢、DHCP、視訊通話、線上遊戲、串流</td></tr>
</table>
<div class="box analogy"><b class="t">生活比喻</b>TCP 像掛號信：寄出前確認對方在、每封都要簽收、遺失就補寄。UDP 像廣播電台：一直播出去，聽眾漏聽了也不會重播，但速度快、即時。</div>
<div class="box tip"><b class="t">QUIC 與 HTTP/3</b>新的 HTTP/3 改用建立在 UDP 上的 QUIC 協定，在應用程式層實作可靠傳輸與加密，降低連線建立的延遲。</div>` },
    { id: 'handshake', title: 'TCP 三向交握', html: `
<div class="flow">
  <div><b>1. SYN</b><span>用戶端：我想建立連線（序號 x）</span></div>
  <div><b>2. SYN-ACK</b><span>伺服器：好，收到 x（確認 x+1），我的序號 y</span></div>
  <div><b>3. ACK</b><span>用戶端：收到 y（確認 y+1），連線建立</span></div>
</div>
<p>結束連線時，雙方各自送出 <b>FIN</b> 並確認，通常需要四個步驟（四次揮手）；異常時可用 <b>RST</b> 直接中斷連線。</p>
<table>
<tr><th>TCP 機制</th><th>作用</th></tr>
<tr><td>序號與確認號</td><td>讓接收端依序重組資料，並告訴傳送端收到哪裡了</td></tr>
<tr><td>重傳</td><td>一段時間內沒收到確認就重送</td></tr>
<tr><td>滑動視窗</td><td>依接收端的處理能力調整傳送量（流量控制）</td></tr>
<tr><td>壅塞控制</td><td>偵測網路壅塞時降低傳送速度</td></tr>
</table>
<div class="box warn"><b class="t">SYN Flood 攻擊</b>攻擊者大量送出 SYN 卻不完成交握，讓伺服器保留大量半開連線而耗盡資源，屬於阻斷服務攻擊。常見防護有 SYN Cookie、防火牆與 DDoS 防護服務。</div>` },
    { id: 'ports', title: '埠號', html: `
<p>一台主機上同時有很多服務，<b>埠號（Port）</b>用來區分封包要交給哪個程式，範圍 0～65535。<b>IP 位址 + 協定 + 埠號</b>可以識別一個通訊端點（Socket）。</p>
<table>
<tr><th>範圍</th><th>名稱</th><th>說明</th></tr>
<tr><td>0～1023</td><td>知名埠 Well-known</td><td>常見服務，例如 80、443</td></tr>
<tr><td>1024～49151</td><td>註冊埠 Registered</td><td>特定應用程式，例如 3306 MySQL</td></tr>
<tr><td>49152～65535</td><td>動態埠 Dynamic</td><td>用戶端連線時臨時使用的來源埠</td></tr>
</table>
<table>
<tr><th>埠號</th><th>服務</th><th>協定</th><th>埠號</th><th>服務</th><th>協定</th></tr>
<tr><td>20／21</td><td>FTP（資料／控制）</td><td>TCP</td><td>143</td><td>IMAP</td><td>TCP</td></tr>
<tr><td>22</td><td>SSH、SFTP</td><td>TCP</td><td>161</td><td>SNMP</td><td>UDP</td></tr>
<tr><td>23</td><td>Telnet（不加密）</td><td>TCP</td><td>389／636</td><td>LDAP／LDAPS</td><td>TCP</td></tr>
<tr><td>25</td><td>SMTP 寄信</td><td>TCP</td><td>443</td><td>HTTPS</td><td>TCP（HTTP/3 用 UDP）</td></tr>
<tr><td>53</td><td>DNS</td><td>UDP（區域轉送用 TCP）</td><td>445</td><td>SMB 檔案分享</td><td>TCP</td></tr>
<tr><td>67／68</td><td>DHCP 伺服器／用戶端</td><td>UDP</td><td>3306</td><td>MySQL</td><td>TCP</td></tr>
<tr><td>69</td><td>TFTP</td><td>UDP</td><td>3389</td><td>RDP 遠端桌面</td><td>TCP</td></tr>
<tr><td>80</td><td>HTTP</td><td>TCP</td><td>5432</td><td>PostgreSQL</td><td>TCP</td></tr>
<tr><td>110</td><td>POP3</td><td>TCP</td><td>514</td><td>Syslog</td><td>UDP</td></tr>
<tr><td>123</td><td>NTP 時間同步</td><td>UDP</td><td>587</td><td>SMTP 送件（加密）</td><td>TCP</td></tr>
</table>
<div class="box tip"><b class="t">互動練習</b>到「互動練習 → 埠號練習」以遊戲方式熟記常見埠號，可以切換「埠號 → 服務」與「服務 → 埠號」。</div>` },
    { id: 'netstat', title: '查看連線', html: `
<pre class="out">netstat -an                 # 列出所有連線與監聽中的埠（Windows／Linux）
netstat -ano | findstr :443 # Windows：找出使用 443 埠的連線與程序 PID
ss -tulnp                   # Linux：列出監聽中的 TCP／UDP 埠與程式

  Proto  Local Address        Foreign Address        State
  TCP    0.0.0.0:3389         0.0.0.0:0              LISTENING
  TCP    192.168.1.20:52814   142.250.196.110:443    ESTABLISHED</pre>
<table>
<tr><th>狀態</th><th>意思</th></tr>
<tr><td>LISTENING</td><td>正在等待連入的連線（伺服器）</td></tr>
<tr><td>ESTABLISHED</td><td>連線已建立</td></tr>
<tr><td>TIME_WAIT</td><td>連線已關閉，等待一段時間確保資料都處理完</td></tr>
<tr><td>SYN_SENT</td><td>已送出 SYN，等待回應（連不上時常停在這裡）</td></tr>
</table>
<div class="box memo"><b class="t">資安觀點</b>定期檢查伺服器監聽中的埠，關閉不需要的服務。Telnet（23）、FTP（21）以明文傳送帳密，應改用 SSH（22）與 SFTP。RDP（3389）、資料庫埠不應直接暴露在網際網路上。</div>` }
  ],
  keypoints: [
    'TCP 連線導向、可靠、依序；UDP 非連線導向、快速、不保證送達',
    'TCP 三向交握：SYN → SYN-ACK → ACK；結束用 FIN，異常中斷用 RST',
    'TCP 以序號、確認、重傳、滑動視窗提供可靠傳輸與流量控制',
    '埠號範圍 0～65535；0～1023 為知名埠，49152 以上為動態埠',
    '常見埠號：22 SSH、23 Telnet、25 SMTP、53 DNS、67／68 DHCP、80 HTTP、443 HTTPS、3389 RDP',
    'DNS 查詢、DHCP、NTP、SNMP 使用 UDP',
    'netstat、ss 查看連線狀態；不需要的服務應關閉，明文協定改用加密版本'
  ]
},
{
  id: 'c10', subject: 2, minutes: 50,
  title: '網路服務：DHCP、DNS、NAT',
  summary: 'DHCP 的 DORA 流程、範圍與保留、DHCP 中繼；DNS 的階層與解析流程、常見紀錄類型、快取與 TTL；NAT 與 PAT 的運作；以及 NTP、HTTP 與 Email 協定。',
  sections: [
    { id: 'dhcp', title: 'DHCP 自動配發 IP', html: `
<p><b>DHCP（Dynamic Host Configuration Protocol）</b>自動為裝置配發 IP 位址、子網路遮罩、預設閘道與 DNS 伺服器，使用 UDP 67（伺服器）與 68（用戶端）。</p>
<div class="flow">
  <div><b>D</b>iscover<span>用戶端廣播：有 DHCP 伺服器嗎？</span></div>
  <div><b>O</b>ffer<span>伺服器：我可以給你 192.168.1.50</span></div>
  <div><b>R</b>equest<span>用戶端：我要這個位址</span></div>
  <div><b>A</b>ck<span>伺服器：確認，租期 8 小時</span></div>
</div>
<table>
<tr><th>名詞</th><th>說明</th></tr>
<tr><td><b>範圍</b> Scope／Pool</td><td>可以配發的 IP 範圍，例如 192.168.1.100～200</td></tr>
<tr><td><b>排除</b> Exclusion</td><td>不配發的位址，保留給伺服器、印表機、閘道等固定 IP 設備</td></tr>
<tr><td><b>保留</b> Reservation</td><td>依 MAC 位址固定配發同一個 IP</td></tr>
<tr><td><b>租期</b> Lease</td><td>位址的使用期限，到期前會自動續約</td></tr>
<tr><td><b>DHCP 中繼</b> Relay（ip helper-address）</td><td>DHCP Discover 是廣播，無法跨越路由器；路由器設定中繼，把請求轉送給其他網段的 DHCP 伺服器</td></tr>
</table>
<pre class="out">ipconfig /release     # Windows：釋放目前的 IP
ipconfig /renew       # 重新向 DHCP 伺服器取得 IP
ipconfig /all         # 查看 DHCP 伺服器、租期、MAC 位址</pre>
<div class="box exam"><b class="t">考點</b>VLAN 20 的電腦都拿到 169.254.x.x，但 VLAN 10 正常，而 DHCP 伺服器在 VLAN 10：最可能是 VLAN 20 的閘道介面沒有設定 DHCP 中繼（ip helper-address）。</div>` },
    { id: 'dns', title: 'DNS 網域名稱解析', html: `
<p><b>DNS（Domain Name System）</b>把網域名稱（www.example.com）轉換成 IP 位址，是網際網路的「電話簿」。DNS 查詢主要使用 <b>UDP 53</b>，回應過大或伺服器之間的區域轉送使用 TCP 53。</p>
<h3>解析流程</h3>
<div class="flow">
  <div><b>1. 本機快取</b><span>瀏覽器與作業系統先查快取與 hosts 檔</span></div>
  <div><b>2. 遞迴解析器</b><span>詢問設定的 DNS 伺服器（ISP、8.8.8.8、1.1.1.1）</span></div>
  <div><b>3. 根伺服器</b><span>告訴它 .com 由誰負責</span></div>
  <div><b>4. TLD 伺服器</b><span>告訴它 example.com 由誰負責</span></div>
  <div><b>5. 權威伺服器</b><span>回答 www.example.com 的 IP</span></div>
</div>
<table>
<tr><th>紀錄類型</th><th>用途</th><th>例子</th></tr>
<tr><td><b>A</b></td><td>網域 → IPv4</td><td>www → 203.0.113.10</td></tr>
<tr><td><b>AAAA</b></td><td>網域 → IPv6</td><td>www → 2001:db8::10</td></tr>
<tr><td><b>CNAME</b></td><td>別名，指向另一個網域名稱</td><td>shop → shop.platform.com</td></tr>
<tr><td><b>MX</b></td><td>郵件伺服器</td><td>example.com 的信寄給 mail.example.com</td></tr>
<tr><td><b>TXT</b></td><td>文字資訊，常用於驗證網域、SPF、DKIM、DMARC</td><td>v=spf1 include:…</td></tr>
<tr><td><b>NS</b></td><td>這個網域由哪些 DNS 伺服器負責</td><td>ns1.example.com</td></tr>
<tr><td><b>PTR</b></td><td>反向解析：IP → 網域</td><td>10.113.0.203.in-addr.arpa → www</td></tr>
</table>
<p><b>TTL</b> 決定紀錄可以被快取多久。要更換伺服器 IP 前，先把 TTL 調短，切換後新 IP 才能很快生效。</p>
<pre class="out">nslookup www.example.com          # 查詢 IP
nslookup -type=mx example.com     # 查詢郵件伺服器
dig www.example.com               # Linux／macOS，資訊更完整
ipconfig /flushdns                # Windows 清除 DNS 快取</pre>` },
    { id: 'nat', title: 'NAT 與 PAT', html: `
<p>私有位址不能在網際網路上使用，<b>NAT（Network Address Translation）</b>在路由器或防火牆上把內部的私有位址轉換成公有位址。</p>
<table>
<tr><th>類型</th><th>說明</th><th>用途</th></tr>
<tr><td><b>靜態 NAT</b></td><td>一個私有位址固定對應一個公有位址</td><td>讓外部可以連到內部的伺服器</td></tr>
<tr><td><b>動態 NAT</b></td><td>從公有位址池中動態分配</td><td>較少使用</td></tr>
<tr><td><b>PAT</b>（NAT Overload）</td><td>多個內部裝置共用<b>一個公有位址</b>，以不同的埠號區分</td><td>家用與企業上網最常見</td></tr>
<tr><td><b>連接埠轉送</b> Port Forwarding</td><td>把公有位址的某個埠轉給內部某台主機</td><td>對外提供服務，例如 NAS、監視器（需注意資安）</td></tr>
</table>
<pre class="out">PAT 轉換表範例（公有位址 203.0.113.5）：
內部位址:埠              轉換後                  目的
192.168.1.20:52814  →  203.0.113.5:40001   →  142.250.196.110:443
192.168.1.21:61002  →  203.0.113.5:40002   →  142.250.196.110:443
回應封包依轉換後的埠號，送回正確的內部裝置</pre>
<div class="box warn"><b class="t">NAT 不是防火牆</b>NAT 讓外部無法直接主動連入內部，有一定的保護效果，但它的目的是位址轉換，不能取代防火牆的安全政策。</div>` },
    { id: 'others', title: 'NTP、HTTP 與 Email 協定', html: `
<table>
<tr><th>協定</th><th>用途</th><th>重點</th></tr>
<tr><td><b>NTP</b>（UDP 123）</td><td>時間同步</td><td>日誌時間、憑證驗證、Kerberos 認證都依賴正確時間</td></tr>
<tr><td><b>HTTP／HTTPS</b>（80／443）</td><td>網頁傳輸</td><td>HTTPS 以 TLS 加密；狀態碼 200 成功、301 轉址、404 找不到、500 伺服器錯誤</td></tr>
<tr><td><b>SMTP</b>（25、587）</td><td>寄信與伺服器之間轉送郵件</td><td>587 用於用戶端送件並加密</td></tr>
<tr><td><b>POP3</b>（110／995）</td><td>收信，下載後通常從伺服器刪除</td><td>995 為加密版本</td></tr>
<tr><td><b>IMAP</b>（143／993）</td><td>收信，郵件保留在伺服器、多裝置同步</td><td>993 為加密版本</td></tr>
<tr><td><b>SNMP</b>（UDP 161／162）</td><td>網路設備監控</td><td>建議使用有加密與驗證的 SNMPv3</td></tr>
<tr><td><b>Syslog</b>（UDP 514）</td><td>集中收集設備日誌</td><td>資安事件調查的重要來源</td></tr>
</table>
<div class="box memo"><b class="t">動手做</b>執行 <code>ipconfig /all</code> 找出你的 DHCP 伺服器與租期；用 <code>nslookup</code> 查詢一個網站的 A 紀錄與 MX 紀錄；到 whatismyip 類的網站查看你的公有 IP，和電腦上的私有 IP 比較，理解 NAT 的作用。</div>` }
  ],
  keypoints: [
    'DHCP DORA：Discover（廣播）→ Offer → Request → Ack；UDP 67／68',
    'DHCP 排除給固定 IP 設備，保留依 MAC 固定配發；跨網段需設定 DHCP 中繼',
    'DNS 解析：本機快取 → 遞迴解析器 → 根 → TLD → 權威伺服器',
    'DNS 紀錄：A IPv4、AAAA IPv6、CNAME 別名、MX 郵件、TXT 驗證、PTR 反向',
    'DNS 查詢主要用 UDP 53；TTL 決定快取時間',
    'PAT 讓多台裝置以不同埠號共用一個公有 IP；NAT 不能取代防火牆',
    'NTP 123 時間同步、SMTP 寄信、POP3／IMAP 收信、SNMP 監控、Syslog 514 收集日誌'
  ]
},
{
  id: 'c11', subject: 2, minutes: 50,
  title: '無線網路與網路安全',
  summary: 'Wi-Fi 標準與頻段、頻道規劃、SSID 與 AP 架構、WPA2 與 WPA3 加密、企業認證 802.1X，以及 ACL、防火牆、VPN、常見第 2 層攻擊與防護。',
  sections: [
    { id: 'wifi', title: 'Wi-Fi 標準與頻段', html: `
<table>
<tr><th>名稱</th><th>IEEE 標準</th><th>頻段</th><th>重點</th></tr>
<tr><td>Wi-Fi 4</td><td>802.11n</td><td>2.4／5 GHz</td><td>導入 MIMO 多天線</td></tr>
<tr><td>Wi-Fi 5</td><td>802.11ac</td><td>5 GHz</td><td>更寬的頻道與更高速度</td></tr>
<tr><td>Wi-Fi 6／6E</td><td>802.11ax</td><td>2.4／5 GHz（6E 加上 6 GHz）</td><td>OFDMA，裝置多時效率更好</td></tr>
<tr><td>Wi-Fi 7</td><td>802.11be</td><td>2.4／5／6 GHz</td><td>多鏈路操作（MLO），可同時使用多個頻段</td></tr>
</table>
<table>
<tr><th>頻段</th><th>優點</th><th>缺點</th></tr>
<tr><td><b>2.4 GHz</b></td><td>穿透力強、涵蓋範圍大</td><td>速度較慢、干擾多（微波爐、藍牙），不重疊頻道只有 1、6、11</td></tr>
<tr><td><b>5 GHz</b></td><td>速度快、頻道多、干擾少</td><td>穿牆能力較差</td></tr>
<tr><td><b>6 GHz</b></td><td>頻道最多、最乾淨</td><td>涵蓋範圍最小，需要 Wi-Fi 6E／7 裝置</td></tr>
</table>
<div class="box tip"><b class="t">頻道規劃</b>相鄰的 AP 使用不重疊的頻道（2.4 GHz 用 1、6、11），避免互相干擾。企業環境常用無線控制器或雲端管理平台，自動調整頻道與功率。</div>
<h3>無線架構</h3>
<ul>
  <li><b>SSID</b>：無線網路的名稱。企業常依用途分成員工、訪客、IoT 等不同 SSID，並對應到不同 VLAN。</li>
  <li><b>自主式 AP</b>：每台 AP 各自設定，適合小型環境。</li>
  <li><b>控制器式／雲端管理</b>：集中管理大量 AP，支援漫遊與統一政策，適合企業。</li>
  <li><b>Mesh</b>：AP 之間以無線互連，適合不方便佈線的環境。</li>
</ul>` },
    { id: 'wsec', title: '無線安全', html: `
<table>
<tr><th>加密方式</th><th>安全性</th><th>說明</th></tr>
<tr><td>WEP</td><td>已破解</td><td>不可使用</td></tr>
<tr><td>WPA</td><td>不安全</td><td>不建議使用</td></tr>
<tr><td><b>WPA2</b></td><td>仍廣泛使用</td><td>AES 加密；個人版用預先共用金鑰（PSK），密碼要夠長</td></tr>
<tr><td><b>WPA3</b></td><td>建議使用</td><td>個人版用 SAE 取代 PSK，可抵抗離線暴力破解；支援 OWE 保護開放網路</td></tr>
</table>
<table>
<tr><th>模式</th><th>認證方式</th><th>適合</th></tr>
<tr><td><b>個人版</b> Personal</td><td>所有人共用一組 Wi-Fi 密碼</td><td>家用、小型辦公室</td></tr>
<tr><td><b>企業版</b> Enterprise</td><td><b>802.1X</b> 搭配 RADIUS 伺服器，每個人用自己的帳號或憑證登入</td><td>企業：員工離職只要停用帳號，不必更換全公司密碼</td></tr>
</table>
<div class="box warn"><b class="t">常見無線威脅</b>①<b>邪惡雙胞胎（Evil Twin）</b>：攻擊者架設同名的假 AP 誘騙連線；②<b>私接 AP（Rogue AP）</b>：員工自行接上未經核准的 AP；③弱密碼被暴力破解。防護方式：WPA3、企業版認證、無線入侵偵測、員工教育。關閉 SSID 廣播與 MAC 過濾只能擋住一般人，不能視為安全措施。</div>` },
    { id: 'acl', title: 'ACL、防火牆與 VPN', html: `
<h3>存取控制清單 ACL</h3>
<p>路由器與三層交換器可以用 <b>ACL（Access Control List）</b>依來源、目的 IP、協定、埠號允許或拒絕流量。規則<b>由上往下比對，符合就停止</b>，最後有一條看不見的<b>隱含拒絕（deny all）</b>。</p>
<pre class="out">! 允許業務部（192.168.10.0/24）存取網頁伺服器的 443，拒絕其他所有到伺服器網段的流量
ip access-list extended TO-SERVERS
 permit tcp 192.168.10.0 0.0.0.255 host 10.0.0.80 eq 443
 deny   ip any 10.0.0.0 0.0.0.255
 permit ip any any
interface GigabitEthernet0/1
 ip access-group TO-SERVERS in</pre>
<table>
<tr><th>類型</th><th>比對條件</th><th>建議放置位置</th></tr>
<tr><td>標準 ACL</td><td>只比對來源 IP</td><td>靠近目的地</td></tr>
<tr><td>延伸 ACL</td><td>來源、目的、協定、埠號</td><td>靠近來源（及早丟棄不需要的流量）</td></tr>
</table>
<div class="box exam"><b class="t">萬用遮罩</b>ACL 與 OSPF 使用<b>萬用遮罩（Wildcard Mask）</b>，等於子網路遮罩的反轉：/24 的遮罩 255.255.255.0，萬用遮罩是 0.0.0.255；0 代表要比對、1 代表不在乎。</div>
<h3>防火牆與 VPN</h3>
<ul>
  <li><b>狀態防火牆</b>：記錄連線狀態，內部主動連出的回應自動允許，外部主動連入則依規則判斷。</li>
  <li><b>次世代防火牆 NGFW</b>：可辨識應用程式、整合入侵防禦（IPS）、URL 過濾。</li>
  <li><b>DMZ</b>：放置對外服務（網站、郵件）的隔離區域，即使被入侵也不會直接威脅內部網路。</li>
  <li><b>站對站 VPN</b>：以 IPsec 加密通道連接總公司與分公司。</li>
  <li><b>遠端存取 VPN</b>：讓在家工作的員工安全連回公司網路；也逐漸被零信任網路存取（ZTNA）取代或補強。</li>
</ul>` },
    { id: 'l2sec', title: '常見攻擊與防護', html: `
<table>
<tr><th>攻擊</th><th>手法</th><th>防護</th></tr>
<tr><td><b>ARP 欺騙</b></td><td>偽造 ARP 回應，冒充預設閘道進行中間人攻擊</td><td>動態 ARP 檢測（DAI）、加密連線</td></tr>
<tr><td><b>DHCP 欺騙</b></td><td>架設假的 DHCP 伺服器，發送錯誤的閘道或 DNS</td><td><b>DHCP Snooping</b>：只允許信任的埠回應 DHCP</td></tr>
<tr><td><b>DHCP 耗竭</b></td><td>偽造大量 MAC 位址請求，耗盡位址池</td><td>DHCP Snooping 限速、Port Security</td></tr>
<tr><td><b>MAC 泛洪</b></td><td>塞爆交換器的 MAC 表，讓交換器變成泛洪轉送而被竊聽</td><td><b>Port Security</b>：限制每個埠可學習的 MAC 數量</td></tr>
<tr><td><b>VLAN 跳躍</b></td><td>利用 Trunk 自動協商或雙重標記跨越 VLAN</td><td>關閉自動協商、存取埠固定為 access、Native VLAN 不使用 VLAN 1</td></tr>
<tr><td><b>DNS 欺騙</b></td><td>回應偽造的 DNS 結果，導向釣魚網站</td><td>DNSSEC、使用可信任的 DNS、HTTPS 憑證檢查</td></tr>
</table>
<div class="box tip"><b class="t">交換器基本加固</b>關閉未使用的連接埠並放到未使用的 VLAN、啟用 Port Security 與 DHCP Snooping、管理介面使用 SSH 而不是 Telnet、修改預設密碼、管理流量放在獨立的管理 VLAN。這些觀念在 Security+ 與 iPAS 資安課程中也會出現。</div>
<div class="box memo"><b class="t">動手做</b>檢查你家的 Wi-Fi 分享器：加密是否為 WPA2-AES 或 WPA3、管理密碼是否已修改、韌體是否最新、是否關閉了 WPS 與不需要的遠端管理、訪客網路是否與家用網路隔離。</div>` }
  ],
  keypoints: [
    'Wi-Fi 6 為 802.11ax、Wi-Fi 7 為 802.11be；6E 以上可使用 6 GHz',
    '2.4 GHz 涵蓋廣但干擾多，不重疊頻道 1、6、11；5 GHz、6 GHz 速度快但涵蓋較小',
    '加密建議 WPA3，至少 WPA2-AES；WEP、WPA 不可使用',
    '企業版 Wi-Fi 使用 802.1X 搭配 RADIUS，每人以個人帳號認證',
    'ACL 由上往下比對、符合即停止，最後有隱含拒絕；萬用遮罩是遮罩的反轉',
    'DMZ 隔離對外服務；站對站 VPN 連接分公司，遠端存取 VPN 連接在家員工',
    'DHCP Snooping 防 DHCP 欺騙、Port Security 防 MAC 泛洪、DAI 防 ARP 欺騙'
  ]
},
{
  id: 'c12', subject: 2, minutes: 50,
  title: '網路排錯與 Cisco 基礎',
  summary: '系統化的排錯方法、ping、tracert、ipconfig、nslookup、arp 等工具、常見問題與判斷，Cisco IOS 的模式與基本設定、常用 show 指令，以及 CCNA 與網路架設技術士的準備方向。',
  sections: [
    { id: 'method', title: '系統化排錯', html: `
<p>網路問題的原因很多，亂試很浪費時間。依 OSI 模型<b>由下而上</b>檢查，可以快速縮小範圍：</p>
<div class="flow">
  <div><b>1. 實體</b><span>網路線、燈號、Wi-Fi 是否連上</span></div>
  <div><b>2. IP 設定</b><span>ipconfig：IP、遮罩、閘道、DNS<br>是否為 169.254.x.x</span></div>
  <div><b>3. 本機與閘道</b><span>ping 127.0.0.1<br>ping 預設閘道</span></div>
  <div><b>4. 外部網路</b><span>ping 8.8.8.8<br>tracert 看卡在哪裡</span></div>
  <div><b>5. DNS</b><span>nslookup 網址<br>IP 通但網址不通</span></div>
  <div><b>6. 應用程式</b><span>埠號、防火牆、服務是否啟動</span></div>
</div>
<div class="box tip"><b class="t">先問清楚範圍</b>是一個人還是全部人？一個網站還是所有網站？什麼時候開始？最近有沒有改過設定？這些問題常常比工具更快找到原因。</div>` },
    { id: 'tools', title: '常用排錯工具', html: `
<table>
<tr><th>工具（Windows／Linux）</th><th>用途</th></tr>
<tr><td><code>ipconfig /all</code>／<code>ip addr</code></td><td>查看 IP、遮罩、閘道、DNS、MAC、DHCP 資訊</td></tr>
<tr><td><code>ping</code></td><td>以 ICMP 測試是否連得到目的地與延遲；注意有些主機或防火牆會封鎖 ICMP</td></tr>
<tr><td><code>tracert</code>／<code>traceroute</code></td><td>列出封包經過的每一個路由器（利用 TTL 逐跳遞增），找出在哪一段中斷或變慢</td></tr>
<tr><td><code>nslookup</code>／<code>dig</code></td><td>測試 DNS 名稱解析</td></tr>
<tr><td><code>arp -a</code></td><td>查看 IP 與 MAC 的對應</td></tr>
<tr><td><code>netstat -an</code>／<code>ss -tuln</code></td><td>查看連線與監聽中的埠</td></tr>
<tr><td><code>Test-NetConnection 主機 -Port 443</code>（PowerShell）／<code>nc -zv 主機 443</code></td><td>測試特定 TCP 埠是否連得通</td></tr>
<tr><td><code>pathping</code>（Windows）</td><td>結合 ping 與 tracert，統計每一跳的封包遺失</td></tr>
</table>
<pre class="out">C:\\&gt; tracert www.example.com
  1     1 ms    1 ms    1 ms  192.168.1.1        ← 家裡的路由器
  2     5 ms    4 ms    5 ms  10.120.0.1         ← ISP
  3     *        *        *   要求等候逾時。      ← 這一跳不回應 ICMP，不一定是故障
  4    12 ms   11 ms   12 ms  203.0.113.45
  5    13 ms   12 ms   13 ms  93.184.215.14      ← 目的地</pre>` },
    { id: 'cases', title: '常見問題判斷', html: `
<table>
<tr><th>症狀</th><th>可能原因</th></tr>
<tr><td>IP 為 169.254.x.x</td><td>沒有取得 DHCP：線路、DHCP 伺服器、VLAN、DHCP 中繼</td></tr>
<tr><td>可以 ping 同網段，不能 ping 其他網段</td><td>預設閘道錯誤或沒設定；路由器沒有回程路由</td></tr>
<tr><td>可以 ping 8.8.8.8，但網址打不開</td><td>DNS 設定錯誤或 DNS 伺服器故障</td></tr>
<tr><td>只有某個網站或服務連不上</td><td>對方服務問題、防火牆封鎖該埠、DNS 指向錯誤</td></tr>
<tr><td>網路時快時慢、視訊卡頓</td><td>Wi-Fi 干擾或訊號弱、頻寬被佔滿、雙工不一致、封包遺失</td></tr>
<tr><td>IP 位址衝突的警告</td><td>有設備手動設定了 DHCP 範圍內的位址；應排除固定 IP 範圍</td></tr>
<tr><td>某台電腦突然無法上網，其他人正常</td><td>該電腦的設定、網路線或交換器連接埠、被 Port Security 關閉</td></tr>
</table>` },
    { id: 'cisco', title: 'Cisco IOS 基礎', html: `
<table>
<tr><th>模式</th><th>提示字元</th><th>進入方式</th><th>能做什麼</th></tr>
<tr><td>使用者模式</td><td><code>Router&gt;</code></td><td>登入後預設</td><td>有限的查看指令</td></tr>
<tr><td>特權模式</td><td><code>Router#</code></td><td><code>enable</code></td><td>所有 show 指令、儲存設定、重新開機</td></tr>
<tr><td>全域設定模式</td><td><code>Router(config)#</code></td><td><code>configure terminal</code></td><td>修改整台設備的設定</td></tr>
<tr><td>介面設定模式</td><td><code>Router(config-if)#</code></td><td><code>interface g0/0</code></td><td>設定某個介面</td></tr>
</table>
<pre class="out">Router&gt; enable
Router# configure terminal
Router(config)# hostname R1
R1(config)# enable secret 強密碼                 ! 進入特權模式的密碼（加密儲存）
R1(config)# interface GigabitEthernet0/0
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# no shutdown                        ! 路由器介面預設是關閉的
R1(config-if)# exit
R1(config)# ip domain-name example.local
R1(config)# crypto key generate rsa modulus 2048 ! 產生 SSH 金鑰
R1(config)# username admin secret 強密碼
R1(config)# line vty 0 4
R1(config-line)# transport input ssh             ! 只允許 SSH 遠端登入
R1(config-line)# login local
R1(config-line)# end
R1# copy running-config startup-config           ! 儲存設定（或 write memory）</pre>
<table>
<tr><th>常用 show 指令</th><th>用途</th></tr>
<tr><td><code>show running-config</code></td><td>目前執行中的設定（RAM）</td></tr>
<tr><td><code>show startup-config</code></td><td>開機時載入的設定（NVRAM）</td></tr>
<tr><td><code>show ip interface brief</code></td><td>所有介面的 IP 與狀態（up／down），最常用</td></tr>
<tr><td><code>show ip route</code></td><td>路由表</td></tr>
<tr><td><code>show vlan brief</code></td><td>VLAN 與連接埠對應</td></tr>
<tr><td><code>show mac address-table</code></td><td>交換器的 MAC 位址表</td></tr>
<tr><td><code>show interfaces</code></td><td>介面的詳細統計與錯誤數</td></tr>
<tr><td><code>show cdp neighbors</code></td><td>直接相連的 Cisco 設備</td></tr>
</table>
<div class="box warn"><b class="t">記得儲存設定</b>修改的設定存在 running-config（記憶體），設備重新開機後會遺失。確認無誤後執行 <code>copy running-config startup-config</code>。</div>` },
    { id: 'next', title: '證照準備方向', html: `
<table>
<tr><th>證照</th><th>說明</th><th>準備建議</th></tr>
<tr><td><b>Cisco CCNA</b>（200-301）</td><td>國際認可度最高的網路入門證照，台灣網管、MIS、網路工程師職缺常見要求。範圍包含網路基礎、交換、路由、IP 服務、資安基礎與網路自動化</td><td>本課程打底後，搭配 Cisco Packet Tracer 大量實作，並以 Cisco 官方考試大綱檢查範圍</td></tr>
<tr><td><b>網路架設技術士</b>（丙級／乙級）</td><td>勞動部技能檢定，學科為選擇題、術科為實作（佈線、設備設定）</td><td>學科練習技能檢定中心公告的題庫；術科依公告的試題反覆練習</td></tr>
<tr><td><b>CompTIA Network+</b></td><td>不限廠牌的網路基礎證照</td><td>可與本站的 Security+ 課程銜接</td></tr>
</table>
<div class="box tip"><b class="t">恭喜完成</b>你已經具備網路的核心觀念。接下來可以學本站的 Linux 課程練習伺服器網路設定，Security+ 與 iPAS 資安課程加強網路安全，或 AWS 課程把網路觀念延伸到雲端的 VPC 設計。</div>` }
  ],
  keypoints: [
    '排錯由下而上：實體 → IP 設定 → 閘道 → 外部網路 → DNS → 應用程式',
    'ipconfig 看設定、ping 測連通、tracert 找中斷點、nslookup 測 DNS',
    '169.254.x.x 是 DHCP 失敗；能 ping IP 但網址不通是 DNS 問題',
    'Cisco IOS 模式：使用者 > → enable 特權 # → configure terminal 全域設定',
    '路由器介面預設關閉，要 no shutdown；遠端管理只允許 SSH',
    'show ip interface brief、show ip route、show vlan brief 是最常用的查看指令',
    'running-config 在記憶體，要 copy running-config startup-config 儲存'
  ]
}
);
