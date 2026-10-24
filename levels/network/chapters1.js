/* 網路基礎 原理篇：網路模型與 IP 定址
   <pre class="out"> 為範例與計算過程；程式碼內的 < > & 寫成 &lt; &gt; &amp; */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 40,
  title: '網路概論與設備',
  summary: '網路的分類（LAN、WAN）、拓樸、常見網路設備與用途、頻寬與傳輸單位、延遲與吞吐量，以及家用與企業網路的架構。',
  sections: [
    { id: 'what', title: '網路的分類', html: `
<p><b>網路（Network）</b>是把電腦、手機、伺服器等裝置連在一起，讓它們能互相傳遞資料。依涵蓋範圍可以分成：</p>
<table>
<tr><th>類型</th><th>範圍</th><th>例子</th></tr>
<tr><td><b>LAN</b> 區域網路</td><td>一棟建築、一間辦公室、家裡</td><td>公司內部網路、家用 Wi-Fi</td></tr>
<tr><td><b>WLAN</b> 無線區域網路</td><td>以無線方式連接的 LAN</td><td>Wi-Fi</td></tr>
<tr><td><b>MAN</b> 都會網路</td><td>一座城市</td><td>校園或市政網路</td></tr>
<tr><td><b>WAN</b> 廣域網路</td><td>跨城市、跨國家</td><td>連接總公司與分公司、網際網路</td></tr>
</table>
<h3>網路拓樸</h3>
<table>
<tr><th>拓樸</th><th>連接方式</th><th>特性</th></tr>
<tr><td><b>星狀</b> Star</td><td>所有裝置連到中心的交換器</td><td>現代 LAN 最常見；單一線路故障只影響一台，但中心設備故障全部斷線</td></tr>
<tr><td><b>匯流排</b> Bus</td><td>所有裝置接在同一條線上</td><td>早期乙太網路，已很少使用</td></tr>
<tr><td><b>環狀</b> Ring</td><td>裝置串成一個環</td><td>一處斷線可能影響全部</td></tr>
<tr><td><b>網狀</b> Mesh</td><td>裝置之間有多條路徑</td><td>可靠度高、成本高，用於骨幹網路與 Mesh Wi-Fi</td></tr>
</table>` },
    { id: 'devices', title: '常見網路設備', html: `
<table>
<tr><th>設備</th><th>OSI 層級</th><th>功能</th></tr>
<tr><td><b>集線器</b> Hub</td><td>第 1 層</td><td>把收到的訊號廣播給所有連接埠，已被交換器取代</td></tr>
<tr><td><b>交換器</b> Switch</td><td>第 2 層</td><td>依 <b>MAC 位址</b>把資料只送到目的連接埠，連接同一個 LAN 內的裝置</td></tr>
<tr><td><b>路由器</b> Router</td><td>第 3 層</td><td>依 <b>IP 位址</b>在不同網路之間轉送封包，例如連接 LAN 與網際網路</td></tr>
<tr><td><b>三層交換器</b> L3 Switch</td><td>第 2～3 層</td><td>交換器加上路由功能，常用於企業內部不同 VLAN 之間的路由</td></tr>
<tr><td><b>無線基地台</b> AP</td><td>第 2 層</td><td>讓無線裝置連上有線網路</td></tr>
<tr><td><b>防火牆</b> Firewall</td><td>第 3～7 層</td><td>依規則允許或阻擋流量</td></tr>
<tr><td><b>數據機</b> Modem</td><td>第 1 層</td><td>把電信業者的訊號（光纖、纜線）轉換成網路訊號</td></tr>
</table>
<div class="box analogy"><b class="t">生活比喻</b>交換器像大樓內的收發室，依房號（MAC 位址）把信送到正確的房間；路由器像郵局，依地址（IP 位址）決定信要寄往哪個城市。</div>
<div class="box tip"><b class="t">家用「Wi-Fi 分享器」</b>家裡的無線分享器其實是多合一設備：路由器 + 交換器 + 無線基地台 + DHCP 伺服器 + NAT 與基本防火牆。企業則會把這些功能分成獨立的專業設備。</div>` },
    { id: 'units', title: '頻寬與傳輸單位', html: `
<table>
<tr><th>名詞</th><th>意思</th></tr>
<tr><td><b>頻寬</b> Bandwidth</td><td>理論上每秒能傳輸的最大資料量，例如 1 Gbps</td></tr>
<tr><td><b>吞吐量</b> Throughput</td><td>實際每秒傳輸的資料量，通常低於頻寬</td></tr>
<tr><td><b>延遲</b> Latency</td><td>資料從一端到另一端需要的時間，常用 ping 的毫秒數表示</td></tr>
<tr><td><b>抖動</b> Jitter</td><td>延遲的變動程度，影響視訊會議與網路電話品質</td></tr>
<tr><td><b>封包遺失</b> Packet Loss</td><td>傳送過程中遺失的封包比例</td></tr>
</table>
<div class="box warn"><b class="t">bps 與 Bps</b>網路速度以 <b>bit</b> 計算，小寫 b，例如 <code>100 Mbps</code>；檔案大小以 <b>Byte</b> 計算，大寫 B，例如 <code>100 MB</code>。1 Byte = 8 bits，所以 100 Mbps 的網路，理論上每秒最多下載約 12.5 MB。</div>
<pre class="out">下載 1 GB 的檔案，使用 100 Mbps 的網路，理論上需要多久？
1 GB = 1,000 MB = 8,000 Mb
8,000 Mb ÷ 100 Mbps = 80 秒（實際會更久）</pre>` },
    { id: 'arch', title: '家用與企業網路架構', html: `
<div class="flow">
  <div><b>網際網路</b><span>電信業者（ISP）</span></div>
  <div><b>數據機／光纖終端</b><span>轉換訊號</span></div>
  <div><b>防火牆／路由器</b><span>NAT、安全政策</span></div>
  <div><b>核心交換器</b><span>VLAN 間路由</span></div>
  <div><b>存取交換器、AP</b><span>連接電腦、印表機、手機</span></div>
</div>
<p>企業網路常採用<b>階層式設計</b>：<b>核心層</b>負責高速骨幹、<b>分配層</b>負責 VLAN 路由與政策、<b>存取層</b>負責連接終端裝置。中小企業常把核心與分配層合併成兩層架構。</p>
<div class="box memo"><b class="t">動手做</b>畫出你家或公司的網路架構：從電信業者進來的線路經過哪些設備？電腦是有線還是無線連線？在 Windows 命令提示字元輸入 <code>ipconfig</code>，記下你的 IP 位址、子網路遮罩與預設閘道，第 4～5 章會用到。</div>` }
  ],
  keypoints: [
    'LAN 是區域網路、WAN 是廣域網路；網際網路是最大的 WAN',
    '星狀拓樸是現代 LAN 最常見的架構',
    '集線器 L1 廣播；交換器 L2 依 MAC 轉送；路由器 L3 依 IP 在網路之間轉送',
    '家用 Wi-Fi 分享器是路由器、交換器、AP、DHCP、NAT 的多合一設備',
    '頻寬是理論最大值，吞吐量是實際值；延遲以毫秒表示',
    '網速用 bps（bit），檔案用 B（Byte），1 Byte = 8 bits',
    '企業網路階層式設計：核心層、分配層、存取層'
  ]
},
{
  id: 'c02', subject: 1, minutes: 50,
  title: 'OSI 與 TCP/IP 模型',
  summary: 'OSI 七層模型與各層功能、TCP/IP 四層模型、封裝與解封裝、各層的資料單位、代表協定與設備，以及用模型分析問題。',
  sections: [
    { id: 'osi', title: 'OSI 七層模型', html: `
<p><b>OSI 模型（Open Systems Interconnection）</b>把網路通訊分成七層，每一層負責特定的工作，並為上一層提供服務。它是理解網路與溝通問題的共同語言。</p>
<table>
<tr><th>層</th><th>名稱</th><th>功能</th><th>代表協定與設備</th><th>資料單位</th></tr>
<tr><td>7</td><td><b>應用層</b> Application</td><td>提供使用者應用程式網路服務</td><td>HTTP、HTTPS、DNS、SMTP、FTP、SSH</td><td>資料 Data</td></tr>
<tr><td>6</td><td><b>表現層</b> Presentation</td><td>資料格式轉換、編碼、加密壓縮</td><td>JPEG、MP4、ASCII、（傳統上歸類的）TLS 加密</td><td>資料</td></tr>
<tr><td>5</td><td><b>會議層</b> Session</td><td>建立、管理、結束通訊工作階段</td><td>NetBIOS、RPC</td><td>資料</td></tr>
<tr><td>4</td><td><b>傳輸層</b> Transport</td><td>端對端傳輸、埠號、可靠性與流量控制</td><td>TCP、UDP</td><td>區段 Segment（UDP 為資料包 Datagram）</td></tr>
<tr><td>3</td><td><b>網路層</b> Network</td><td>邏輯定址（IP）與路由</td><td>IP、ICMP、OSPF；路由器</td><td>封包 Packet</td></tr>
<tr><td>2</td><td><b>資料連結層</b> Data Link</td><td>同一網段內的傳遞、MAC 定址、錯誤偵測</td><td>乙太網路、Wi-Fi、ARP、VLAN；交換器</td><td>訊框 Frame</td></tr>
<tr><td>1</td><td><b>實體層</b> Physical</td><td>把位元轉成電、光、無線電訊號</td><td>線材、接頭、光纖；集線器</td><td>位元 Bit</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>由下而上：「<b>Please Do Not Throw Sausage Pizza Away</b>」（Physical、Data Link、Network、Transport、Session、Presentation、Application）。中文可記「<b>實資網傳會表應</b>」。</div>
<div class="box tip"><b class="t">互動練習</b>到「互動練習 → OSI 分層配對」隨機出題，練習判斷協定、設備與資料單位屬於哪一層。</div>` },
    { id: 'tcpip', title: 'TCP/IP 模型', html: `
<p>實際網際網路使用的是 <b>TCP/IP 模型</b>，層數較少，與 OSI 的對應如下：</p>
<table>
<tr><th>TCP/IP 模型</th><th>對應 OSI</th><th>協定例子</th></tr>
<tr><td><b>應用層</b></td><td>第 5～7 層</td><td>HTTP、DNS、DHCP、SMTP、SSH</td></tr>
<tr><td><b>傳輸層</b></td><td>第 4 層</td><td>TCP、UDP</td></tr>
<tr><td><b>網際網路層</b></td><td>第 3 層</td><td>IP、ICMP、ARP（常被歸在這一層與資料連結層之間）</td></tr>
<tr><td><b>網路存取層</b>（連結層）</td><td>第 1～2 層</td><td>乙太網路、Wi-Fi</td></tr>
</table>
<div class="box warn"><b class="t">層數有兩種說法</b>有些教材把 TCP/IP 的網路存取層再分成「資料連結層」與「實體層」，變成五層模型。考試時依題目的說法判斷即可，重點是理解每一層做什麼。</div>` },
    { id: 'encap', title: '封裝與解封裝', html: `
<p>傳送資料時，每往下一層就加上該層的<b>標頭（Header）</b>，稱為<b>封裝（Encapsulation）</b>；接收端由下往上逐層拆掉標頭，稱為<b>解封裝</b>。</p>
<pre class="out">應用層：                                   [ HTTP 資料 ]
傳輸層：                         [TCP 標頭][ HTTP 資料 ]            ← 區段（含來源與目的埠號）
網路層：                [IP 標頭][TCP 標頭][ HTTP 資料 ]            ← 封包（含來源與目的 IP）
資料連結層：[乙太網路標頭][IP 標頭][TCP 標頭][ HTTP 資料 ][FCS]     ← 訊框（含來源與目的 MAC，FCS 檢查錯誤）
實體層：    0101001110100101……                                    ← 位元</pre>
<div class="box analogy"><b class="t">生活比喻</b>寄一份文件：把文件放進信封寫上收件人（傳輸層），再放進郵局的包裹寫上地址（網路層），再交給貨車司機寫上下一站（資料連結層）。每經過一個轉運站，只有最外層的「下一站」會更換，裡面的地址與文件不變。</div>
<div class="box exam"><b class="t">重要觀念</b>封包經過路由器時，<b>IP 位址（來源與目的）不變</b>，但<b>MAC 位址每經過一段網路就會更換</b>成該段的來源與下一跳設備。（NAT 是例外，會改寫 IP，第 10 章。）</div>` },
    { id: 'analyze', title: '用模型分析問題', html: `
<p>網路出問題時，用分層的概念可以快速縮小範圍：</p>
<table>
<tr><th>症狀</th><th>可能的層級</th><th>檢查方式</th></tr>
<tr><td>網路線燈號不亮</td><td>第 1 層</td><td>換線、換連接埠</td></tr>
<tr><td>同網段裝置連不到</td><td>第 2 層</td><td>VLAN 設定、交換器連接埠、ARP</td></tr>
<tr><td>連不到其他網段或網際網路</td><td>第 3 層</td><td>IP、遮罩、預設閘道、路由</td></tr>
<tr><td>網路通但某個服務連不上</td><td>第 4 層</td><td>埠號、防火牆規則</td></tr>
<tr><td>用 IP 可以、用網址不行</td><td>第 7 層（DNS）</td><td>nslookup 檢查名稱解析</td></tr>
</table>
<p>第 12 章會用這個思路，整理完整的排錯流程。</p>` }
  ],
  keypoints: [
    'OSI 由下而上：實體、資料連結、網路、傳輸、會議、表現、應用',
    '資料單位：位元（L1）、訊框（L2）、封包（L3）、區段（L4）、資料（L5～7）',
    '集線器 L1、交換器 L2、路由器 L3；TCP／UDP 在 L4；IP、ICMP 在 L3',
    'TCP/IP 模型：應用層、傳輸層、網際網路層、網路存取層',
    '封裝：往下每層加上標頭；解封裝：往上逐層拆除',
    '經過路由器時 IP 位址不變（NAT 除外），MAC 位址每段都會更換',
    '用分層概念縮小問題範圍：線路 → 同網段 → 路由 → 埠號 → 應用'
  ]
},
{
  id: 'c03', subject: 1, minutes: 45,
  title: '乙太網路與實體層',
  summary: 'MAC 位址、乙太網路訊框、ARP 的運作、全雙工與半雙工、雙絞線等級與接線標準、光纖、PoE，以及常見的實體層問題。',
  sections: [
    { id: 'mac', title: 'MAC 位址', html: `
<p><b>MAC 位址（Media Access Control Address）</b>是網路卡的實體位址，長度 <b>48 位元</b>，通常以 12 個十六進位數字表示，例如 <code>00:1A:2B:3C:4D:5E</code>（Windows 顯示為 <code>00-1A-2B-3C-4D-5E</code>）。</p>
<ul>
  <li><b>前 24 位元</b>是廠商代碼 <b>OUI</b>（Organizationally Unique Identifier），由 IEEE 分配，可查出網路卡的製造商。</li>
  <li><b>後 24 位元</b>由廠商自行分配。</li>
  <li><b>廣播 MAC 位址</b>：<code>FF:FF:FF:FF:FF:FF</code>，送給同網段所有裝置。</li>
</ul>
<div class="box tip"><b class="t">MAC 隨機化</b>新版的手機與筆電連接 Wi-Fi 時，預設會使用隨機產生的 MAC 位址保護隱私，因此依 MAC 位址做的存取控制可能失效，網管規劃時要注意。</div>
<table>
<tr><th>比較</th><th>MAC 位址</th><th>IP 位址</th></tr>
<tr><td>層級</td><td>第 2 層</td><td>第 3 層</td></tr>
<tr><td>長度</td><td>48 位元</td><td>IPv4 32 位元、IPv6 128 位元</td></tr>
<tr><td>範圍</td><td>同一個網段內傳遞</td><td>跨網路的端對端定址</td></tr>
<tr><td>比喻</td><td>身分證字號（跟著人）</td><td>住址（搬家就會改變）</td></tr>
</table>` },
    { id: 'frame', title: '乙太網路訊框與交換器', html: `
<pre class="out">| 前導碼 | 目的 MAC | 來源 MAC | 類型 | 資料（46～1500 Bytes） | FCS |
                                  ↑ 例如 0x0800 代表 IPv4      ↑ 錯誤檢查碼</pre>
<p>標準乙太網路一個訊框可以承載的資料最多 <b>1500 Bytes</b>，稱為 <b>MTU</b>（最大傳輸單位）。</p>
<p>交換器收到訊框時：</p>
<ol>
  <li><b>學習</b>：記下「來源 MAC 位址在哪一個連接埠」到 <b>MAC 位址表</b>。</li>
  <li><b>轉送</b>：查表找到目的 MAC 對應的連接埠，只送到那個埠。</li>
  <li><b>泛洪</b>：表中找不到目的 MAC，或目的是廣播位址時，送到除了來源以外的所有埠。</li>
</ol>` },
    { id: 'arp', title: 'ARP：由 IP 找 MAC', html: `
<p>電腦知道要送給某個 IP，但乙太網路需要對方的 MAC 位址才能傳送。<b>ARP（Address Resolution Protocol）</b>負責「由 IP 位址查詢 MAC 位址」：</p>
<div class="flow">
  <div><b>1. ARP 請求（廣播）</b><span>誰是 192.168.1.1？請告訴 192.168.1.20</span></div>
  <div><b>2. ARP 回應（單播）</b><span>192.168.1.1 是我，MAC 是 00:1A:…</span></div>
  <div><b>3. 存入 ARP 快取</b><span>之後一段時間不用再問</span></div>
</div>
<pre class="out">arp -a          # Windows／macOS 查看 ARP 快取
ip neigh        # Linux</pre>
<div class="box exam"><b class="t">送到其他網段時</b>目的 IP 不在同一個網段時，電腦會改用 ARP 查詢<b>預設閘道（路由器）</b>的 MAC 位址，把訊框送給路由器，由路由器繼續轉送。所以預設閘道設定錯誤，就只能連同網段的裝置。</div>
<div class="box warn"><b class="t">ARP 欺騙</b>ARP 沒有驗證機制，攻擊者可以假冒預設閘道回應 ARP，讓別人的流量都經過自己（中間人攻擊）。防護方式見第 11 章。</div>` },
    { id: 'cable', title: '線材與雙工', html: `
<table>
<tr><th>線材等級</th><th>常見速度</th><th>說明</th></tr>
<tr><td>Cat5e</td><td>1 Gbps</td><td>一般辦公室與家用</td></tr>
<tr><td>Cat6</td><td>1 Gbps（短距離可 10 Gbps）</td><td>新建案常用</td></tr>
<tr><td>Cat6A</td><td>10 Gbps</td><td>機房、高速需求</td></tr>
</table>
<ul>
  <li>雙絞線的最大建議長度是 <b>100 公尺</b>，超過要加交換器或改用光纖。</li>
  <li>接線標準有 <b>T568A</b> 與 <b>T568B</b>，兩端相同是<b>直通線</b>，兩端不同是<b>跳線（交叉線）</b>。現代設備大多支援 Auto MDI-X，會自動調整，一般都使用直通線。</li>
  <li><b>光纖</b>：距離長、不受電磁干擾。<b>單模光纖</b>適合長距離（數公里以上），<b>多模光纖</b>適合建築物內的短距離。</li>
  <li><b>PoE（Power over Ethernet）</b>：用網路線同時供電，常用於 AP、網路攝影機、IP 電話。</li>
</ul>
<table>
<tr><th>雙工模式</th><th>說明</th></tr>
<tr><td><b>全雙工</b> Full Duplex</td><td>可以同時傳送與接收，現代交換網路的標準</td></tr>
<tr><td><b>半雙工</b> Half Duplex</td><td>同一時間只能傳或收，集線器時代使用 CSMA/CD 偵測碰撞</td></tr>
</table>
<div class="box warn"><b class="t">雙工不一致</b>兩端一邊全雙工、一邊半雙工時，會出現網路很慢、大量錯誤的情況。排錯時檢查兩端的速度與雙工設定是否一致，通常設為自動協商。</div>` }
  ],
  keypoints: [
    'MAC 位址 48 位元，前 24 位元是廠商代碼 OUI；廣播 MAC 為 FF:FF:FF:FF:FF:FF',
    'MAC 用於同網段傳遞（L2），IP 用於跨網路定址（L3）',
    '交換器學習來源 MAC、依 MAC 表轉送，查不到時泛洪',
    '乙太網路標準 MTU 為 1500 Bytes',
    'ARP 由 IP 查詢 MAC：請求是廣播、回應是單播；跨網段時查預設閘道的 MAC',
    '雙絞線最長建議 100 公尺；Cat5e 1 Gbps、Cat6A 10 Gbps；單模光纖適合長距離',
    '現代網路使用全雙工；兩端雙工不一致會造成速度慢與錯誤'
  ]
},
{
  id: 'c04', subject: 1, minutes: 50,
  title: 'IPv4 定址',
  summary: 'IPv4 位址結構、二進位與十進位轉換、網路部分與主機部分、子網路遮罩與前綴長度、位址等級、私有位址與特殊位址、單播、廣播與多播。',
  sections: [
    { id: 'struct', title: 'IPv4 位址結構', html: `
<p><b>IPv4 位址</b>長度 <b>32 位元</b>，分成 4 段、每段 8 位元（稱為 octet），以十進位表示，每段範圍 0～255，例如 <code>192.168.10.37</code>。</p>
<p>IP 位址分成兩部分：</p>
<ul>
  <li><b>網路部分</b>：代表這台裝置屬於哪一個網路，同一網路內的裝置網路部分相同。</li>
  <li><b>主機部分</b>：代表網路中的哪一台裝置。</li>
</ul>
<p>哪些位元是網路部分，由<b>子網路遮罩（Subnet Mask）</b>決定：遮罩中為 1 的位元是網路部分，為 0 的是主機部分。</p>
<pre class="out">IP 位址：  192.168.10.37   = 11000000.10101000.00001010.00100101
子網路遮罩：255.255.255.0   = 11111111.11111111.11111111.00000000
                              |←──────── 網路部分 ────────→| |←主機→|
前綴長度：/24（遮罩中有 24 個 1）</pre>` },
    { id: 'binary', title: '二進位轉換', html: `
<p>子網路計算的基礎是 8 位元二進位與十進位的轉換。每個位元由左到右代表的值是：</p>
<pre class="out">位元位置：  1    1    1    1    1    1    1    1
代表數值： 128   64   32   16    8    4    2    1      全部加起來 = 255</pre>
<table>
<tr><th>十進位 → 二進位</th><th>方法</th></tr>
<tr><td>200</td><td>200 ≥ 128 → 1，剩 72；72 ≥ 64 → 1，剩 8；8 &lt; 32 → 0；8 &lt; 16 → 0；8 ≥ 8 → 1，剩 0；後面都是 0 → <b>11001000</b></td></tr>
<tr><td>37</td><td>32 + 4 + 1 → <b>00100101</b></td></tr>
</table>
<p>遮罩常見的值一定要熟記：</p>
<table>
<tr><th>二進位</th><th>十進位</th><th>二進位</th><th>十進位</th></tr>
<tr><td>10000000</td><td>128</td><td>11111000</td><td>248</td></tr>
<tr><td>11000000</td><td>192</td><td>11111100</td><td>252</td></tr>
<tr><td>11100000</td><td>224</td><td>11111110</td><td>254</td></tr>
<tr><td>11110000</td><td>240</td><td>11111111</td><td>255</td></tr>
</table>
<div class="box tip"><b class="t">互動練習</b>到「互動練習 → 二進位與 IP 轉換」輸入任意 IP 與前綴長度，對照逐段的二進位、網路位元與主機位元。</div>` },
    { id: 'class', title: '位址等級與私有位址', html: `
<p>早期 IPv4 依第一段數字分成五個等級（Classful）。現在已改用 CIDR（第 5 章），但等級的概念仍常在考試與文件中出現：</p>
<table>
<tr><th>等級</th><th>第一段範圍</th><th>預設遮罩</th><th>用途</th></tr>
<tr><td>A</td><td>1～126</td><td>/8（255.0.0.0）</td><td>大型網路</td></tr>
<tr><td>B</td><td>128～191</td><td>/16（255.255.0.0）</td><td>中型網路</td></tr>
<tr><td>C</td><td>192～223</td><td>/24（255.255.255.0）</td><td>小型網路</td></tr>
<tr><td>D</td><td>224～239</td><td>—</td><td>多播</td></tr>
<tr><td>E</td><td>240～255</td><td>—</td><td>保留實驗用</td></tr>
</table>
<h3>私有位址（RFC 1918）</h3>
<p>以下範圍保留給內部網路使用，不會在網際網路上路由，要上網必須經過 NAT（第 10 章）：</p>
<table>
<tr><th>範圍</th><th>CIDR</th></tr>
<tr><td>10.0.0.0 ～ 10.255.255.255</td><td>10.0.0.0/8</td></tr>
<tr><td>172.16.0.0 ～ 172.31.255.255</td><td>172.16.0.0/12</td></tr>
<tr><td>192.168.0.0 ～ 192.168.255.255</td><td>192.168.0.0/16</td></tr>
</table>
<h3>特殊位址</h3>
<table>
<tr><th>位址</th><th>用途</th></tr>
<tr><td><code>127.0.0.0/8</code>（常用 127.0.0.1）</td><td>迴路位址 Loopback，測試本機的 TCP/IP</td></tr>
<tr><td><code>169.254.0.0/16</code></td><td>APIPA 鏈路本地位址，<b>DHCP 取得失敗</b>時自動設定</td></tr>
<tr><td><code>0.0.0.0</code></td><td>代表「本機任何位址」或預設路由 0.0.0.0/0</td></tr>
<tr><td><code>255.255.255.255</code></td><td>有限廣播，送給本網段所有裝置</td></tr>
<tr><td><code>100.64.0.0/10</code></td><td>電信業者的共享位址（CGNAT）</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>電腦的 IP 顯示 169.254.x.x，代表沒有從 DHCP 伺服器取得位址，應檢查網路線、DHCP 伺服器或 VLAN 設定。</div>` },
    { id: 'cast', title: '單播、廣播與多播', html: `
<table>
<tr><th>類型</th><th>對象</th><th>例子</th></tr>
<tr><td><b>單播</b> Unicast</td><td>一對一</td><td>瀏覽網頁</td></tr>
<tr><td><b>廣播</b> Broadcast</td><td>一對同網段所有裝置</td><td>ARP 請求、DHCP Discover</td></tr>
<tr><td><b>多播</b> Multicast</td><td>一對一群訂閱的裝置</td><td>視訊串流、OSPF 路由更新（224.0.0.5）</td></tr>
<tr><td><b>任播</b> Anycast</td><td>一對最近的一台（IPv6、DNS 常用）</td><td>公共 DNS 8.8.8.8、1.1.1.1</td></tr>
</table>
<div class="box warn"><b class="t">廣播不會跨越路由器</b>路由器預設不轉送廣播，所以每個路由器介面（或每個 VLAN）都是一個獨立的<b>廣播域</b>。網段太大時廣播太多會影響效能，這是切割子網路的原因之一。</div>` }
  ],
  keypoints: [
    'IPv4 為 32 位元，分 4 段、每段 0～255',
    '子網路遮罩中為 1 的位元是網路部分、為 0 的是主機部分；/24 表示 24 個 1',
    '8 位元的權重：128、64、32、16、8、4、2、1',
    '常見遮罩值：128、192、224、240、248、252、254、255',
    'Class A 1～126、B 128～191、C 192～223；D 為多播',
    '私有位址：10.0.0.0/8、172.16.0.0/12、192.168.0.0/16',
    '127.0.0.1 迴路；169.254.x.x 代表 DHCP 失敗；廣播不會跨越路由器'
  ]
},
{
  id: 'c05', subject: 1, minutes: 60,
  title: '子網路切割與 VLSM',
  summary: 'CIDR 表示法、計算網路位址、廣播位址與可用主機範圍、區塊大小速算法、依主機數或子網路數選擇遮罩、VLSM 規劃，以及路由彙總。',
  sections: [
    { id: 'cidr', title: 'CIDR 與基本公式', html: `
<p><b>CIDR（無類別域間路由）</b>用「/前綴長度」表示遮罩，不再受 A、B、C 等級限制，例如 <code>192.168.10.0/26</code>。</p>
<table>
<tr><th>公式</th><th>說明</th></tr>
<tr><td>主機位元數 = 32 − 前綴長度</td><td>/26 → 6 個主機位元</td></tr>
<tr><td>每個子網路的位址數 = 2<sup>主機位元</sup></td><td>2<sup>6</sup> = 64</td></tr>
<tr><td>可用主機數 = 2<sup>主機位元</sup> − 2</td><td>64 − 2 = 62（扣掉網路位址與廣播位址）</td></tr>
<tr><td>子網路數 = 2<sup>借用的位元</sup></td><td>從 /24 切成 /26，借 2 位元 → 4 個子網路</td></tr>
</table>
<table>
<tr><th>前綴</th><th>遮罩</th><th>位址數</th><th>可用主機</th></tr>
<tr><td>/24</td><td>255.255.255.0</td><td>256</td><td>254</td></tr>
<tr><td>/25</td><td>255.255.255.128</td><td>128</td><td>126</td></tr>
<tr><td>/26</td><td>255.255.255.192</td><td>64</td><td>62</td></tr>
<tr><td>/27</td><td>255.255.255.224</td><td>32</td><td>30</td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>16</td><td>14</td></tr>
<tr><td>/29</td><td>255.255.255.248</td><td>8</td><td>6</td></tr>
<tr><td>/30</td><td>255.255.255.252</td><td>4</td><td>2</td></tr>
<tr><td>/23</td><td>255.255.254.0</td><td>512</td><td>510</td></tr>
<tr><td>/22</td><td>255.255.252.0</td><td>1024</td><td>1022</td></tr>
</table>` },
    { id: 'calc', title: '計算網路位址與廣播位址', html: `
<h3>區塊大小速算法</h3>
<p>找出遮罩中「不是 255 也不是 0」的那一段，<b>區塊大小 = 256 − 該段數值</b>。子網路的網路位址都是區塊大小的倍數。</p>
<pre class="out">題目：192.168.10.37/26 的網路位址、廣播位址、可用範圍？

1. /26 → 遮罩 255.255.255.192，第四段是 192
2. 區塊大小 = 256 − 192 = 64
3. 第四段的子網路起點：0、64、128、192
4. 37 落在 0～63 之間
   網路位址：192.168.10.0
   廣播位址：192.168.10.63（下一個區塊起點 64 減 1）
   可用範圍：192.168.10.1 ～ 192.168.10.62，共 62 台</pre>
<pre class="out">題目：172.16.45.200/20 的網路位址與廣播位址？

1. /20 → 遮罩 255.255.240.0，關鍵在第三段 240
2. 區塊大小 = 256 − 240 = 16，第三段起點：0、16、32、48……
3. 第三段 45 落在 32～47
   網路位址：172.16.32.0
   廣播位址：172.16.47.255
   可用範圍：172.16.32.1 ～ 172.16.47.254，共 4094 台</pre>
<div class="box memo"><b class="t">記憶口訣</b>「<b>256 減遮罩得區塊，找倍數定起點，下一個起點減一是廣播</b>」。</div>
<div class="box tip"><b class="t">互動練習</b>先自己算，再到「互動練習 → 子網路計算器」或「二進位與 IP 轉換」對答案，練到不看工具也能在一分鐘內算出來。</div>` },
    { id: 'design', title: '依需求選擇遮罩', html: `
<h3>依「每個子網路需要的主機數」選擇</h3>
<pre class="out">需求：每個子網路要容納 50 台主機
2^n − 2 ≥ 50 → n = 6（62 台），主機位元 6 → 前綴 /26</pre>
<h3>依「需要的子網路數」選擇</h3>
<pre class="out">需求：把 192.168.10.0/24 切成至少 6 個子網路
2^借用位元 ≥ 6 → 借 3 位元（8 個子網路）→ /27，每個子網路 30 台可用主機
子網路：.0、.32、.64、.96、.128、.160、.192、.224</pre>
<div class="box exam"><b class="t">常考陷阱</b>①可用主機要減 2；②題目問「至少」時要選能滿足的最小值；③/31 是例外，用於點對點連線時兩個位址都可用（RFC 3021），但一般題目仍以 /30 作為點對點連線的答案。</div>` },
    { id: 'vlsm', title: 'VLSM：不同大小的子網路', html: `
<p>如果每個子網路都用相同大小，主機少的部門會浪費大量位址。<b>VLSM（可變長度子網路遮罩）</b>讓每個子網路依需求使用不同的遮罩。</p>
<pre class="out">可用網段：192.168.10.0/24
需求：業務部 50 台、研發部 25 台、會議室 10 台、路由器連線 2 台
步驟：需求由大到小排序，依序分配

業務部 50 台  → /26（62 台）  192.168.10.0/26     可用 .1 ～ .62     廣播 .63
研發部 25 台  → /27（30 台）  192.168.10.64/27    可用 .65 ～ .94    廣播 .95
會議室 10 台  → /28（14 台）  192.168.10.96/28    可用 .97 ～ .110   廣播 .111
路由器連線 2 台 → /30（2 台） 192.168.10.112/30   可用 .113 ～ .114  廣播 .115
剩餘 192.168.10.116 ～ .255 可供日後擴充</pre>
<div class="box warn"><b class="t">一定要由大到小</b>先分配小的子網路，大的子網路可能找不到對齊的連續空間，造成位址零碎。</div>
<div class="box tip"><b class="t">互動練習</b>到「互動練習 → VLSM 子網路規劃」輸入你自己的需求，檢查規劃結果。</div>` },
    { id: 'summary', title: '路由彙總', html: `
<p><b>路由彙總（Route Summarization／Supernetting）</b>把多個連續的網路合併成一筆較大的路由，減少路由表的大小。</p>
<pre class="out">要彙總：192.168.0.0/24、192.168.1.0/24、192.168.2.0/24、192.168.3.0/24
第三段：0 = 000000 00
        1 = 000000 01
        2 = 000000 10
        3 = 000000 11
共同部分是前 6 位元 → 前兩段 16 位元 + 6 位元 = /22
彙總路由：192.168.0.0/22（涵蓋 192.168.0.0 ～ 192.168.3.255）</pre>
<div class="box memo"><b class="t">動手做</b>練習題：①10.1.5.130/25 的網路與廣播位址？②要把 172.20.0.0/16 切成每個子網路至少 500 台主機，遮罩是多少？③彙總 10.10.4.0/24 ～ 10.10.7.0/24。答案：①10.1.5.128、10.1.5.255；②/23；③10.10.4.0/22。</div>` }
  ],
  keypoints: [
    '主機位元 = 32 − 前綴；位址數 = 2^主機位元；可用主機 = 2^主機位元 − 2',
    '子網路數 = 2^借用位元',
    '區塊大小 = 256 − 遮罩中的關鍵段，網路位址是區塊大小的倍數',
    '廣播位址 = 下一個子網路起點 − 1；可用範圍是網路位址 +1 到廣播 −1',
    '依需求選遮罩：主機數用 2^n − 2 ≥ 需求；子網路數用 2^n ≥ 需求',
    'VLSM：依需求由大到小分配不同大小的子網路，避免浪費與零碎',
    '路由彙總：找出連續網路的共同位元，合併成一筆較大的路由'
  ]
},
{
  id: 'c06', subject: 1, minutes: 45,
  title: 'IPv6',
  summary: '為什麼需要 IPv6、位址格式與縮寫規則、前綴與介面 ID、位址類型（全域單播、唯一本地、鏈路本地、多播）、SLAAC 自動設定、與 IPv4 的比較和過渡技術。',
  sections: [
    { id: 'why', title: '為什麼需要 IPv6', html: `
<p>IPv4 只有約 43 億個位址（2<sup>32</sup>），早已分配完畢，目前靠 NAT 讓大量裝置共用公有位址。<b>IPv6</b> 使用 <b>128 位元</b>位址，數量約 3.4 × 10<sup>38</sup> 個，足夠讓每個裝置都有公有位址。</p>
<table>
<tr><th>比較</th><th>IPv4</th><th>IPv6</th></tr>
<tr><td>位址長度</td><td>32 位元</td><td>128 位元</td></tr>
<tr><td>表示方式</td><td>十進位，點分隔</td><td>十六進位，冒號分隔</td></tr>
<tr><td>廣播</td><td>有</td><td><b>沒有廣播</b>，改用多播</td></tr>
<tr><td>位址自動設定</td><td>DHCP</td><td>SLAAC 或 DHCPv6</td></tr>
<tr><td>NAT</td><td>普遍使用</td><td>原則上不需要</td></tr>
<tr><td>由 IP 找 MAC</td><td>ARP</td><td>NDP（鄰居探索協定）</td></tr>
</table>` },
    { id: 'format', title: '位址格式與縮寫', html: `
<p>IPv6 位址分成 <b>8 組</b>，每組 <b>4 個十六進位數字</b>（16 位元），以冒號分隔：</p>
<pre class="out">2001:0db8:0000:0000:0000:ff00:0042:8329</pre>
<h3>兩條縮寫規則</h3>
<ol>
  <li><b>每組開頭的 0 可以省略</b>：<code>0db8</code> → <code>db8</code>、<code>0042</code> → <code>42</code>、<code>0000</code> → <code>0</code>。</li>
  <li><b>連續全為 0 的組可以用 <code>::</code> 取代，但整個位址只能用一次</b>。</li>
</ol>
<pre class="out">原始：2001:0db8:0000:0000:0000:ff00:0042:8329
規則 1：2001:db8:0:0:0:ff00:42:8329
規則 2：2001:db8::ff00:42:8329

原始：fe80:0000:0000:0000:0202:b3ff:fe1e:8329
縮寫：fe80::202:b3ff:fe1e:8329

迴路位址：0000:……:0001 → ::1
未指定位址：全部為 0 → ::</pre>
<div class="box warn"><b class="t">:: 只能用一次</b><code>2001:db8:0:0:1:0:0:1</code> 可以寫成 <code>2001:db8::1:0:0:1</code> 或 <code>2001:db8:0:0:1::1</code>，但不能寫成 <code>2001:db8::1::1</code>，否則無法判斷每個 :: 各代表幾組 0。慣例是取代<b>最長</b>的連續 0，長度相同時取代左邊的。</div>
<h3>前綴與介面 ID</h3>
<p>IPv6 一樣使用前綴長度。一般的 LAN 子網路固定為 <b>/64</b>：前 64 位元是<b>網路前綴</b>，後 64 位元是<b>介面 ID</b>。電信業者常配發給家用或企業 /56 或 /48，讓使用者自行切出多個 /64 子網路。</p>` },
    { id: 'types', title: '位址類型', html: `
<table>
<tr><th>類型</th><th>前綴</th><th>說明</th><th>類似 IPv4 的</th></tr>
<tr><td><b>全域單播</b> GUA</td><td><code>2000::/3</code>（2 或 3 開頭）</td><td>可在網際網路上路由的公有位址</td><td>公有位址</td></tr>
<tr><td><b>唯一本地</b> ULA</td><td><code>fc00::/7</code>（實務上 fd 開頭）</td><td>內部網路使用，不在網際網路上路由</td><td>私有位址</td></tr>
<tr><td><b>鏈路本地</b> Link-local</td><td><code>fe80::/10</code></td><td>每個啟用 IPv6 的介面都會自動產生，只在同一網段有效；路由器常用它當下一跳</td><td>169.254.x.x</td></tr>
<tr><td><b>多播</b> Multicast</td><td><code>ff00::/8</code></td><td>取代廣播，例如 ff02::1 是同網段所有節點</td><td>多播、廣播</td></tr>
<tr><td><b>迴路</b></td><td><code>::1</code></td><td>本機測試</td><td>127.0.0.1</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>看到 <code>fe80::</code> 開頭就是鏈路本地位址；<code>2001:db8::/32</code> 是保留給文件與範例使用的位址。</div>` },
    { id: 'slaac', title: 'SLAAC 與過渡技術', html: `
<p><b>SLAAC（無狀態位址自動設定）</b>讓裝置不需要 DHCP 伺服器就能自動取得 IPv6 位址：</p>
<div class="flow">
  <div><b>1. 產生鏈路本地位址</b><span>fe80:: 加上介面 ID</span></div>
  <div><b>2. 詢問路由器</b><span>Router Solicitation（RS）</span></div>
  <div><b>3. 路由器公告</b><span>Router Advertisement（RA）<br>提供網路前綴與預設閘道</span></div>
  <div><b>4. 組合全域位址</b><span>前綴 + 自己產生的介面 ID</span></div>
</div>
<p>介面 ID 可以由 MAC 位址轉換（EUI-64），但為了隱私，現代作業系統多半使用隨機產生的介面 ID。需要集中管理位址或提供 DNS 等資訊時，可搭配 <b>DHCPv6</b>。</p>
<h3>IPv4 與 IPv6 共存</h3>
<table>
<tr><th>技術</th><th>說明</th></tr>
<tr><td><b>雙堆疊</b> Dual Stack</td><td>裝置同時設定 IPv4 與 IPv6，最常見的做法</td></tr>
<tr><td><b>通道</b> Tunneling</td><td>把 IPv6 封包包在 IPv4 中傳送</td></tr>
<tr><td><b>轉換</b> NAT64／DNS64</td><td>讓只有 IPv6 的裝置可以存取 IPv4 服務</td></tr>
</table>
<div class="box memo"><b class="t">動手做</b>在電腦輸入 <code>ipconfig</code>（Windows）或 <code>ip -6 addr</code>（Linux），找出你的鏈路本地位址（fe80 開頭）；如果有 2 開頭的位址，代表你的網路已支援 IPv6。練習把它展開成完整的 8 組再縮寫回來。</div>` }
  ],
  keypoints: [
    'IPv6 位址 128 位元，8 組、每組 4 個十六進位數字，以冒號分隔',
    '縮寫：每組開頭的 0 可省略；連續全 0 的組用 :: 取代，只能用一次',
    'LAN 子網路固定 /64：前 64 位元網路前綴、後 64 位元介面 ID',
    'GUA 2000::/3 公有；ULA fc00::/7 內部；鏈路本地 fe80::/10；多播 ff00::/8；迴路 ::1',
    'IPv6 沒有廣播，改用多播；用 NDP 取代 ARP',
    'SLAAC：路由器公告前綴，裝置自行組合位址，不需 DHCP',
    '過渡技術：雙堆疊（最常見）、通道、NAT64'
  ]
}
);
