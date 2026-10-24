/* AWS SAA 第一部分：安全與韌性架構（Domain 1–2） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 50,
  title: '考試導覽與 IAM 進階',
  summary: 'Domain 1.1：SAA-C03 題型與解題策略、IAM 政策評估邏輯、身分型與資源型政策、角色與 STS、跨帳戶存取、權限邊界、Organizations 與 SCP、Cognito 與身分聯合。',
  sections: [
    { id: 'exam', title: '認識 SAA-C03 考試', html: `
<p>AWS Certified Solutions Architect – Associate 是 AWS 最熱門的證照，也是台灣雲端工程師、DevOps、雲端架構師職缺最常列出的證照。題目幾乎都是<b>情境題</b>：給你一段公司需求，從四個「看起來都能用」的架構中選出<strong>最符合條件</strong>的那一個。</p>
<table>
<tr><th>領域</th><th>英文名稱</th><th>配分</th><th>本課程章節</th></tr>
<tr><td>Domain 1</td><td>Design Secure Architectures</td><td><b>30%</b></td><td>第 1～3 章</td></tr>
<tr><td>Domain 2</td><td>Design Resilient Architectures</td><td>26%</td><td>第 4～6 章</td></tr>
<tr><td>Domain 3</td><td>Design High-Performing Architectures</td><td>24%</td><td>第 7～10 章</td></tr>
<tr><td>Domain 4</td><td>Design Cost-Optimized Architectures</td><td>20%</td><td>第 11～12 章</td></tr>
</table>
<div class="box exam"><b class="t">考試形式</b>65 題、130 分鐘，其中 15 題不計分。720 分（滿分 1,000）通過。複選題會註明要選幾個。平均每題 2 分鐘，題目敘述長，建議先讀<b>最後一句問題</b>，再回頭找關鍵條件。</div>
<h3>情境題的關鍵字</h3>
<table>
<tr><th>題目出現</th><th>優先考慮</th></tr>
<tr><td>最少營運負擔 Least operational overhead</td><td>託管服務、無伺服器（Lambda、Fargate、DynamoDB、Aurora Serverless）</td></tr>
<tr><td>最具成本效益 Most cost-effective</td><td>Spot、Savings Plans、S3 生命週期、Gateway 端點、關閉閒置資源</td></tr>
<tr><td>高可用 Highly available</td><td>多 AZ、ELB + Auto Scaling、RDS Multi-AZ</td></tr>
<tr><td>解耦 Decouple</td><td>SQS、SNS、EventBridge</td></tr>
<tr><td>最低延遲、全球使用者</td><td>CloudFront、Global Accelerator、Route 53 延遲路由、DynamoDB 全域表</td></tr>
<tr><td>不修改程式碼 Without code changes</td><td>設定層的解法，例如 RDS Proxy、CloudFront、Storage Gateway；加入 ElastiCache 通常要改程式</td></tr>
</table>
<div class="box tip"><b class="t">解題策略</b>先刪掉「違反條件」的選項，例如題目要求不能經過網際網路、選項卻用 NAT 閘道；題目要最少營運負擔，選項卻要自己在 EC2 上架設。通常能刪到剩兩個，再比較成本與複雜度。</div>` },
    { id: 'eval', title: 'IAM 政策評估邏輯', html: `
<p>一個請求是否被允許，AWS 會依序檢查多種政策。記住核心規則：<strong>明確拒絕優先；沒有明確允許就是拒絕</strong>。</p>
<div class="flow">
  <div><b>1. 明確 Deny？</b><span>任何政策有 Deny<br>→ 立即拒絕</span></div>
  <div><b>2. SCP 允許？</b><span>組織的上限<br>不允許 → 拒絕</span></div>
  <div><b>3. 資源型政策</b><span>例如 S3 儲存貯體政策<br>允許 → 可能放行</span></div>
  <div><b>4. 權限邊界</b><span>身分的上限<br>不允許 → 拒絕</span></div>
  <div><b>5. 身分型政策</b><span>使用者或角色的政策<br>允許 → 放行</span></div>
</div>
<table>
<tr><th>政策類型</th><th>附加對象</th><th>作用</th></tr>
<tr><td><b>身分型政策</b> Identity-based</td><td>使用者、群組、角色</td><td>授予權限</td></tr>
<tr><td><b>資源型政策</b> Resource-based</td><td>S3 儲存貯體、SQS 佇列、KMS 金鑰、Lambda</td><td>授予權限，並可指定其他帳戶的主體（Principal）</td></tr>
<tr><td><b>權限邊界</b> Permissions Boundary</td><td>使用者或角色</td><td>設定該身分<strong>最多</strong>能有的權限，不授予權限</td></tr>
<tr><td><b>服務控制政策</b> SCP</td><td>Organizations 的帳戶或 OU</td><td>設定帳戶<strong>最多</strong>能用的權限，不授予權限，管理帳戶不受影響</td></tr>
<tr><td><b>工作階段政策</b> Session Policy</td><td>AssumeRole 時傳入</td><td>進一步限縮該次工作階段的權限</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「讓開發人員可以自己建立 IAM 角色，但建立的角色權限不能超過特定範圍」→ <b>權限邊界</b>。「禁止所有子帳戶關閉 CloudTrail」→ <b>SCP</b>。</div>
<h3>條件鍵（Condition）</h3>
<p>政策可以加上條件，例如 <code>aws:SourceIp</code> 限制來源 IP、<code>aws:MultiFactorAuthPresent</code> 要求 MFA、<code>aws:RequestedRegion</code> 限制區域、<code>aws:PrincipalOrgID</code> 只允許同一個組織的帳戶存取資源。</p>` },
    { id: 'roles', title: '角色、STS 與跨帳戶存取', html: `
<p><b>AWS STS（Security Token Service）</b>發行臨時憑證。呼叫 <code>AssumeRole</code> 取得角色的臨時存取金鑰與工作階段權杖，到期自動失效。</p>
<table>
<tr><th>情境</th><th>做法</th></tr>
<tr><td>EC2 存取 S3、DynamoDB</td><td>建立 IAM 角色，透過<b>執行個體設定檔（Instance Profile）</b>附加到 EC2</td></tr>
<tr><td>Lambda 存取其他服務</td><td>Lambda <b>執行角色（Execution Role）</b></td></tr>
<tr><td>ECS 工作存取 AWS 服務</td><td>ECS <b>工作角色（Task Role）</b></td></tr>
<tr><td>A 帳戶的使用者要存取 B 帳戶</td><td>在 B 帳戶建立角色，<b>信任政策</b>允許 A 帳戶 AssumeRole</td></tr>
<tr><td>第三方廠商要存取你的帳戶</td><td>跨帳戶角色 + <b>External ID</b>，避免混淆代理人問題</td></tr>
</table>
<div class="box warn"><b class="t">易混淆</b>角色有兩種政策：<b>信任政策（Trust Policy）</b>決定「誰可以扮演這個角色」；<b>權限政策（Permissions Policy）</b>決定「扮演後能做什麼」。</div>
<h3>跨帳戶存取 S3 的兩種方式</h3>
<ul>
  <li><b>儲存貯體政策</b>直接授權另一個帳戶：存取者保有自己的身分。</li>
  <li><b>跨帳戶角色</b>：存取者切換成你帳戶裡的角色。</li>
</ul>
<p>需要讓整個組織的帳戶都能存取時，儲存貯體政策搭配 <code>aws:PrincipalOrgID</code> 條件最簡潔。</p>` },
    { id: 'org', title: 'Organizations、Control Tower 與多帳戶治理', html: `
<ul>
  <li><b>AWS Organizations</b>：以 OU 分組帳戶，提供合併帳單與 SCP。建議依環境（Prod、Dev）或部門建立 OU。</li>
  <li><b>SCP</b>：可採「允許清單」或「拒絕清單」策略，常見用法：禁止離開組織、禁止關閉 CloudTrail 或 GuardDuty、限制可用區域。</li>
  <li><b>AWS Control Tower</b>：自動建立 Landing Zone，套用預防性（SCP）與偵測性（Config 規則）控制，並提供帳戶工廠（Account Factory）。</li>
  <li><b>AWS RAM</b>：在組織內共享子網路、Transit Gateway、Route 53 Resolver 規則等資源。</li>
  <li><b>集中化日誌</b>：組織層級的 CloudTrail 把所有帳戶的日誌送到專屬的日誌封存帳戶（Log Archive）。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「要求所有新帳戶自動套用公司安全基準並集中記錄日誌，營運負擔最少」→ <b>Control Tower</b>。「把 VPC 子網路分享給其他帳戶部署資源」→ <b>RAM</b>。</div>` },
    { id: 'federation', title: '身分聯合與應用程式身分', html: `
<table>
<tr><th>服務</th><th>用途</th><th>關鍵字</th></tr>
<tr><td><b>IAM Identity Center</b></td><td>員工以公司身分（Microsoft Entra ID、Okta、AD）單一登入多個 AWS 帳戶，以權限集（Permission Set）指派權限</td><td>員工 SSO、多帳戶</td></tr>
<tr><td><b>SAML 2.0 聯合</b></td><td>企業身分提供者直接與 IAM 角色聯合</td><td>既有 IdP、AssumeRoleWithSAML</td></tr>
<tr><td><b>Cognito 使用者集區</b> User Pools</td><td>App 使用者註冊與登入，發行 JWT 權杖；可作為 API Gateway 或 ALB 的授權者</td><td>會員登入、社群登入</td></tr>
<tr><td><b>Cognito 身分集區</b> Identity Pools</td><td>把已驗證（或訪客）使用者換成<strong>臨時 AWS 憑證</strong>，直接存取 S3、DynamoDB</td><td>行動 App 直接存取 AWS 資源</td></tr>
<tr><td><b>AWS Directory Service</b></td><td>AWS Managed Microsoft AD；或用 AD Connector 代理到地端 AD</td><td>Windows 網域、FSx、WorkSpaces</td></tr>
<tr><td><b>IAM Access Analyzer</b></td><td>找出可被外部帳戶或公開存取的資源，並可依 CloudTrail 活動產生最小權限政策</td><td>外部存取、政策驗證</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>User Pool 驗明正身、Identity Pool 換 AWS 鑰匙</b>」。</div>` }
  ],
  keypoints: [
    'SAA-C03：65 題 130 分鐘、720 分通過，情境題為主',
    '關鍵字：最少營運負擔 → 託管與無伺服器；最具成本效益 → 折扣方案與避免多餘資源',
    '明確 Deny 優先；SCP 與權限邊界只設上限、不授予權限',
    '資源型政策可直接授權其他帳戶；aws:PrincipalOrgID 限定同組織',
    'STS AssumeRole 發行臨時憑證；角色的信任政策決定誰能扮演',
    '第三方跨帳戶角色使用 External ID；EC2 用執行個體設定檔、Lambda 用執行角色',
    'Control Tower 建立 Landing Zone；RAM 共享資源；Cognito User Pool 登入、Identity Pool 換臨時憑證'
  ]
},
{
  id: 'c02', subject: 1, minutes: 55,
  title: 'VPC 網路安全設計',
  summary: 'Domain 1.2：CIDR 規劃、公有與私有子網路、路由表、NAT 閘道、安全群組與 NACL、VPC 端點與 PrivateLink、Peering、Transit Gateway、VPN、Direct Connect 與網路防護。',
  sections: [
    { id: 'design', title: 'VPC 與子網路規劃', html: `
<p>VPC 是區域層級資源，可跨該區域的所有 AZ；<b>子網路屬於單一 AZ</b>。標準的高可用架構會在至少兩個 AZ 各建立公有與私有子網路。</p>
<ul>
  <li><b>CIDR 範圍</b>：VPC 與子網路介於 <b>/16</b>（65,536 個 IP）到 <b>/28</b>（16 個 IP），建議使用 RFC 1918 私有位址。之後可以追加次要 CIDR。</li>
  <li><b>保留 IP</b>：每個子網路保留 <b>5 個</b> IP（前 4 個與最後 1 個），所以 /24 只有 251 個可用。</li>
  <li><b>避免重疊</b>：要與其他 VPC 或地端網路互連時，CIDR 不能重疊，規劃時要預留空間。</li>
</ul>
<div class="flow">
  <div><b>公有子網路</b><span>路由 0.0.0.0/0 → IGW<br>ALB、NAT 閘道、堡壘主機</span></div>
  <div><b>私有應用層</b><span>路由 0.0.0.0/0 → NAT GW<br>EC2、ECS、Lambda</span></div>
  <div><b>私有資料層</b><span>沒有網際網路路由<br>RDS、ElastiCache</span></div>
</div>
<div class="box exam"><b class="t">NAT 閘道重點</b>NAT 閘道建立在<b>公有子網路</b>、屬於<b>單一 AZ</b>。要高可用必須<b>每個 AZ 各建一個</b>，並讓各 AZ 的私有子網路路由到同 AZ 的 NAT 閘道。NAT 閘道只允許連出，不允許外部主動連入；IPv6 的對應元件是 <b>Egress-only Internet Gateway</b>。</div>` },
    { id: 'firewall', title: '安全群組與 NACL 進階', html: `
<table>
<tr><th>比較</th><th>安全群組</th><th>NACL</th></tr>
<tr><td>層級</td><td>ENI（執行個體）</td><td>子網路</td></tr>
<tr><td>狀態</td><td>有狀態，回應自動允許</td><td>無狀態，回應流量也要規則允許</td></tr>
<tr><td>規則</td><td>只能允許</td><td>允許與拒絕，依編號順序</td></tr>
<tr><td>來源</td><td>可指定 CIDR 或<b>其他安全群組</b></td><td>只能指定 CIDR</td></tr>
</table>
<h3>安全群組串接（SG Referencing）</h3>
<p>最佳實務是讓資料庫的安全群組只允許「應用程式伺服器的安全群組」連入 3306 埠，而不是寫死 IP。應用程式伺服器擴展或更換 IP 時，規則不需修改。</p>
<pre class="out">ALB-SG：   允許 443   來源 0.0.0.0/0
App-SG：   允許 8080  來源 ALB-SG
DB-SG：    允許 3306  來源 App-SG</pre>
<div class="box warn"><b class="t">NACL 的短暫埠</b>因為 NACL 無狀態，伺服器回應用戶端時使用<b>短暫埠（Ephemeral Ports，1024–65535）</b>，傳出規則必須允許這個範圍，否則連線會失敗。這是常見的除錯情境題。</div>` },
    { id: 'endpoints', title: 'VPC 端點與 PrivateLink', html: `
<p>私有子網路存取 S3 等 AWS 服務時，若走 NAT 閘道會經過公網端點並產生資料處理費。<b>VPC 端點</b>讓流量留在 AWS 網路內。</p>
<table>
<tr><th>比較</th><th>Gateway 端點</th><th>Interface 端點（PrivateLink）</th></tr>
<tr><td>支援服務</td><td><b>只有 S3 與 DynamoDB</b></td><td>大多數 AWS 服務、自建服務與 SaaS</td></tr>
<tr><td>實作方式</td><td>在路由表加入路由</td><td>在子網路建立 ENI（私有 IP）</td></tr>
<tr><td>費用</td><td><b>免費</b></td><td>依時數與資料量計費</td></tr>
<tr><td>地端可否使用</td><td>不行</td><td>可以，透過 VPN 或 Direct Connect</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「EC2 在私有子網路、沒有網際網路存取，需要上傳資料到 S3，成本最低」→ <b>S3 Gateway 端點</b>。可再用<b>端點政策</b>限制只能存取特定儲存貯體，並在儲存貯體政策用 <code>aws:SourceVpce</code> 限制只能從該端點存取。</div>
<p><b>AWS PrivateLink</b> 也能把你自己的服務（放在 NLB 後方）私有地提供給其他 VPC 或客戶，不需 Peering，也不暴露整個網路。</p>` },
    { id: 'connect', title: 'VPC 互連與混合雲連線', html: `
<table>
<tr><th>方式</th><th>特性</th><th>適用</th></tr>
<tr><td><b>VPC Peering</b></td><td>兩個 VPC 一對一連線，可跨帳戶、跨區域；<b>不可遞移</b>（A↔B、B↔C 不代表 A↔C）；CIDR 不可重疊</td><td>少量 VPC 互連</td></tr>
<tr><td><b>Transit Gateway</b></td><td>區域性集線器，星狀連接數千個 VPC、VPN 與 Direct Connect，支援遞移路由與路由表分段</td><td>大量 VPC、集中管理</td></tr>
<tr><td><b>Site-to-Site VPN</b></td><td>IPsec 加密、走網際網路，每條連線兩個通道；AWS 端是虛擬私有閘道（VGW）或 TGW，客戶端是客戶閘道（CGW）</td><td>快速建立、Direct Connect 的備援</td></tr>
<tr><td><b>Direct Connect</b></td><td>專屬實體連線，頻寬穩定、低延遲，<b>預設不加密</b>，建置需數週；透過 <b>Direct Connect Gateway</b> 可連到多個區域的 VPC</td><td>大量穩定傳輸、混合雲</td></tr>
<tr><td><b>Client VPN</b></td><td>以 OpenVPN 讓個別使用者連入</td><td>遠端員工</td></tr>
</table>
<div class="box exam"><b class="t">常考組合</b>「Direct Connect 需要加密」→ 在 DX 上建立 <b>Site-to-Site VPN</b>（或使用 MACsec）。「Direct Connect 需要備援但預算有限」→ 用 <b>Site-to-Site VPN 當備援</b>。「最高韌性」→ 兩個不同 DX 據點各拉線路。</div>` },
    { id: 'protect', title: '網路防護與可視性', html: `
<ul>
  <li><b>VPC Flow Logs</b>：記錄 ENI、子網路或 VPC 的 IP 流量（允許與拒絕），送到 CloudWatch Logs 或 S3，用於排查連線問題與安全分析。不記錄封包內容。</li>
  <li><b>AWS Network Firewall</b>：在 VPC 中部署的託管防火牆，支援狀態檢測、網域名稱過濾、入侵防禦（IPS）規則。</li>
  <li><b>Gateway Load Balancer</b>：把流量透明地導向第三方防火牆設備叢集。</li>
  <li><b>Route 53 Resolver DNS Firewall</b>：封鎖對惡意網域的 DNS 查詢。</li>
  <li><b>堡壘主機（Bastion Host）</b>：放在公有子網路供 SSH 跳板，但更好的做法是使用 <b>Systems Manager Session Manager</b>，不用開放 22 埠。</li>
</ul>
<div class="box tip"><b class="t">實作建議</b>用互動練習的「VPC 子網路 CIDR 計算」試算 /16 切 /24、/20 的子網路數量與可用 IP，考試中的 CIDR 題就不會慌。</div>` }
  ],
  keypoints: [
    'VPC 屬於區域、子網路屬於單一 AZ；CIDR 範圍 /16～/28，每子網路保留 5 個 IP',
    'NAT 閘道放在公有子網路、屬單一 AZ，高可用需每個 AZ 各一個',
    '安全群組有狀態、可引用其他安全群組；NACL 無狀態、要允許短暫埠',
    'Gateway 端點只支援 S3 與 DynamoDB 且免費；Interface 端點（PrivateLink）支援多數服務',
    'VPC Peering 不可遞移、CIDR 不可重疊；大量 VPC 用 Transit Gateway',
    'Direct Connect 預設不加密，可在其上跑 VPN；VPN 常作為 DX 的備援',
    'Flow Logs 記錄 IP 流量；Network Firewall 提供 VPC 層級 IPS；用 Session Manager 取代堡壘主機'
  ]
},
{
  id: 'c03', subject: 1, minutes: 55,
  title: '資料保護與安全服務',
  summary: 'Domain 1.3：KMS 金鑰類型與信封加密、S3 加密選項、CloudHSM、ACM、Secrets Manager 與 Parameter Store、S3 存取控制與 Object Lock、CloudFront 安全、WAF、Shield 與威脅偵測服務。',
  sections: [
    { id: 'kms', title: 'KMS 與信封加密', html: `
<table>
<tr><th>金鑰類型</th><th>管理者</th><th>特性</th></tr>
<tr><td><b>AWS 擁有的金鑰</b></td><td>AWS</td><td>客戶看不到，服務預設加密使用</td></tr>
<tr><td><b>AWS 受管金鑰</b> AWS managed</td><td>AWS</td><td>名稱如 aws/s3，可在帳戶中看到，自動輪替，無法修改金鑰政策</td></tr>
<tr><td><b>客戶受管金鑰</b> Customer managed</td><td>客戶</td><td>可自訂金鑰政策、啟用或停用、設定自動輪替、跨帳戶分享</td></tr>
</table>
<div class="flow">
  <div><b>1. 產生資料金鑰</b><span>呼叫 KMS GenerateDataKey</span></div>
  <div><b>2. 用明文資料金鑰加密資料</b><span>在本機進行，速度快</span></div>
  <div><b>3. 儲存加密後的資料金鑰</b><span>和資料放在一起，丟棄明文金鑰</span></div>
  <div><b>4. 解密時</b><span>請 KMS 解開資料金鑰，再解密資料</span></div>
</div>
<p>這種做法稱為<b>信封加密（Envelope Encryption）</b>：KMS 的主金鑰不離開 KMS，大量資料在本機加密，兼顧安全與效能。</p>
<ul>
  <li><b>KMS 金鑰屬於區域</b>：跨區域複製加密資料時，需要在目的區域使用該區域的金鑰，或使用<b>多區域金鑰（Multi-Region Keys）</b>。</li>
  <li><b>金鑰政策（Key Policy）</b>是 KMS 金鑰的資源型政策；跨帳戶使用時，金鑰政策與對方的 IAM 政策都要允許。</li>
  <li>KMS API 呼叫會記錄在 CloudTrail，可稽核誰使用了金鑰。</li>
</ul>` },
    { id: 's3enc', title: 'S3 加密與存取控制', html: `
<table>
<tr><th>加密方式</th><th>金鑰管理</th><th>適用</th></tr>
<tr><td><b>SSE-S3</b></td><td>S3 管理，AES-256；<b>新物件的預設加密</b></td><td>最簡單、免額外費用</td></tr>
<tr><td><b>SSE-KMS</b></td><td>KMS 金鑰，可控管存取並在 CloudTrail 稽核</td><td>法規要求金鑰稽核與權限控管；大量請求可啟用 S3 儲存貯體金鑰降低 KMS 費用</td></tr>
<tr><td><b>DSSE-KMS</b></td><td>KMS 雙層加密</td><td>法規要求雙層加密</td></tr>
<tr><td><b>SSE-C</b></td><td>客戶每次請求提供金鑰，AWS 不保存</td><td>客戶要自己保管金鑰</td></tr>
<tr><td><b>用戶端加密</b></td><td>上傳前自己加密</td><td>資料在 AWS 端也不能是明文</td></tr>
</table>
<h3>S3 存取控制工具</h3>
<ul>
  <li><b>封鎖公開存取（Block Public Access）</b>：帳戶與儲存貯體層級，預設啟用，優先於其他設定。</li>
  <li><b>儲存貯體政策</b>：可強制 HTTPS（<code>aws:SecureTransport</code>）、限制來源 VPC 端點、授權其他帳戶。</li>
  <li><b>物件擁有權（Object Ownership）</b>：建議設為「停用 ACL」，由儲存貯體擁有者擁有所有物件。</li>
  <li><b>預先簽署 URL（Presigned URL）</b>：產生有時效的連結，讓沒有 AWS 帳號的人暫時上傳或下載特定物件。</li>
  <li><b>S3 Access Points</b>：為不同應用程式建立各自的存取點與政策，簡化大型共用儲存貯體的權限管理。</li>
</ul>
<h3>防止刪除與竄改</h3>
<table>
<tr><th>功能</th><th>說明</th></tr>
<tr><td><b>版本控制</b></td><td>保留所有版本，刪除時只加上刪除標記</td></tr>
<tr><td><b>MFA Delete</b></td><td>刪除版本或關閉版本控制時需要 MFA</td></tr>
<tr><td><b>Object Lock：Governance 模式</b></td><td>一般使用者不能刪除，具特殊權限者可以覆寫</td></tr>
<tr><td><b>Object Lock：Compliance 模式</b></td><td>保留期間內<strong>任何人（含根使用者）</strong>都不能刪除或縮短保留期</td></tr>
<tr><td><b>Legal Hold</b></td><td>不設期限的保留，直到手動解除</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「法規要求紀錄保存 7 年，任何人都不能刪除，包含根使用者」→ <b>S3 Object Lock Compliance 模式</b>（WORM，一次寫入多次讀取）。</div>` },
    { id: 'secrets', title: '機密、憑證與 HSM', html: `
<table>
<tr><th>比較</th><th>Secrets Manager</th><th>Systems Manager Parameter Store</th></tr>
<tr><td>主要用途</td><td>資料庫密碼、API 金鑰等機密</td><td>組態參數與機密（SecureString）</td></tr>
<tr><td>自動輪替</td><td><b>內建</b>，與 RDS、Aurora、Redshift 整合</td><td>無內建輪替（需自行以 Lambda 實作）</td></tr>
<tr><td>跨區域複寫</td><td>支援</td><td>不支援</td></tr>
<tr><td>費用</td><td>依機密數量與 API 呼叫計費</td><td>標準參數免費</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「資料庫密碼每 30 天自動輪替，營運負擔最少」→ <b>Secrets Manager</b>。「存放應用程式組態值，成本最低」→ <b>Parameter Store</b>。</div>
<ul>
  <li><b>ACM</b>：提供免費公開憑證並自動續約，可部署在 ELB、CloudFront、API Gateway。<b>CloudFront 使用的憑證必須在 us-east-1（維吉尼亞北部）申請。</b>ACM 公開憑證無法直接安裝在 EC2 上。</li>
  <li><b>CloudHSM</b>：單一租戶硬體 HSM（FIPS 140-3 第 3 級），客戶完全掌控金鑰；可作為 KMS 的自訂金鑰存放區。</li>
</ul>` },
    { id: 'edge', title: 'CloudFront 與應用層防護', html: `
<ul>
  <li><b>來源存取控制（OAC, Origin Access Control）</b>：讓 S3 儲存貯體只接受來自 CloudFront 的請求，使用者無法繞過 CloudFront 直接存取 S3。OAC 取代舊的 OAI。</li>
  <li><b>簽署 URL 與簽署 Cookie</b>：限制付費內容只有授權使用者能看；單一檔案用簽署 URL，多個檔案用簽署 Cookie。</li>
  <li><b>地理限制（Geo Restriction）</b>：依國家允許或封鎖存取。</li>
  <li><b>欄位層級加密</b>：在節點位置就加密表單中的敏感欄位（例如信用卡號）。</li>
</ul>
<table>
<tr><th>服務</th><th>部署位置</th><th>防護內容</th></tr>
<tr><td><b>AWS WAF</b></td><td>CloudFront、ALB、API Gateway、AppSync、Cognito</td><td>SQL Injection、XSS、速率限制（Rate-based rules）、IP 與地理封鎖、受管規則群組</td></tr>
<tr><td><b>Shield Standard</b></td><td>所有客戶自動啟用</td><td>第 3、4 層常見 DDoS</td></tr>
<tr><td><b>Shield Advanced</b></td><td>CloudFront、Route 53、ELB、EIP、Global Accelerator</td><td>進階 DDoS、SRT 應變團隊、DDoS 造成的擴展費用保護</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「某 IP 每 5 分鐘送出數千次請求，要自動封鎖」→ <b>WAF 速率型規則</b>。「網站使用 ALB，要防禦 SQL Injection」→ 在 ALB 掛 <b>WAF</b>（安全群組與 NACL 看不懂 HTTP 內容）。</div>` },
    { id: 'detect', title: '威脅偵測與合規服務', html: `
<table>
<tr><th>服務</th><th>情境</th></tr>
<tr><td><b>GuardDuty</b></td><td>偵測惡意活動：異常 API、加密貨幣挖礦、遭入侵的 EC2、S3 異常存取。可在 Organizations 中集中啟用。</td></tr>
<tr><td><b>Inspector</b></td><td>持續掃描 EC2、ECR 映像檔、Lambda 的軟體漏洞與網路暴露。</td></tr>
<tr><td><b>Macie</b></td><td>找出 S3 中的 PII、信用卡號等敏感資料。</td></tr>
<tr><td><b>Security Hub</b></td><td>彙整發現、對照 CIS 與 AWS 基礎安全最佳實務標準。</td></tr>
<tr><td><b>Config + 自動修復</b></td><td>以 Config 規則偵測不合規資源，搭配 Systems Manager Automation 自動修正。</td></tr>
<tr><td><b>EventBridge + Lambda</b></td><td>GuardDuty 發現威脅時自動隔離執行個體或通知。</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>Guard 抓壞人、Inspector 找漏洞、Macie 找個資、Hub 集中看、Config 管設定</b>」。</div>` }
  ],
  keypoints: [
    'KMS 金鑰分 AWS 擁有、AWS 受管、客戶受管；客戶受管金鑰可自訂政策與跨帳戶分享',
    '信封加密：用資料金鑰加密資料，主金鑰留在 KMS；KMS 金鑰屬於區域',
    'S3 新物件預設 SSE-S3；需稽核與控管金鑰用 SSE-KMS；自己保管金鑰用 SSE-C',
    'Object Lock Compliance 模式任何人都不能刪除；Governance 模式有權限者可覆寫',
    'Secrets Manager 內建自動輪替；Parameter Store 標準參數免費',
    'CloudFront 用 OAC 保護 S3 來源；CloudFront 的 ACM 憑證要在 us-east-1',
    'WAF 擋第 7 層攻擊與速率限制；Shield Advanced 提供 SRT 與費用保護'
  ]
},
{
  id: 'c04', subject: 1, minutes: 50,
  title: '高可用與擴展：EC2、ELB、Auto Scaling',
  summary: 'Domain 2.2：ALB、NLB、GWLB 的選擇與功能，健康檢查、跨區域負載平衡、黏性工作階段，Auto Scaling 的擴展政策、啟動範本、生命週期掛鉤與置放群組。',
  sections: [
    { id: 'elb', title: '負載平衡器的選擇', html: `
<table>
<tr><th>比較</th><th>Application LB</th><th>Network LB</th><th>Gateway LB</th></tr>
<tr><td>層級</td><td>第 7 層 HTTP/HTTPS/gRPC</td><td>第 4 層 TCP/UDP/TLS</td><td>第 3 層（GENEVE）</td></tr>
<tr><td>路由依據</td><td>路徑、主機名稱、標頭、查詢字串</td><td>埠號</td><td>所有流量導向設備</td></tr>
<tr><td>固定 IP</td><td>無（用 DNS 名稱）</td><td><b>每個 AZ 一個固定 IP，可指定 Elastic IP</b></td><td>—</td></tr>
<tr><td>目標</td><td>EC2、IP、Lambda、容器</td><td>EC2、IP、ALB</td><td>防火牆等虛擬設備</td></tr>
<tr><td>適用</td><td>網站、微服務、容器</td><td>極低延遲、每秒數百萬請求、非 HTTP 協定</td><td>集中檢查流量</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「合作夥伴的防火牆只能設定 IP 白名單」→ <b>NLB</b>（固定 IP）。「依 /orders 與 /users 路徑導向不同微服務」→ <b>ALB</b>。「要在 ALB 前提供固定 IP」→ NLB 以 ALB 為目標，或使用 <b>Global Accelerator</b>。</div>
<h3>常見功能</h3>
<ul>
  <li><b>健康檢查</b>：自動停止把流量送到不健康的目標。</li>
  <li><b>跨區域負載平衡（Cross-zone）</b>：把流量平均分給所有 AZ 的目標，而不是先平均分給 AZ。ALB 預設啟用。</li>
  <li><b>黏性工作階段（Sticky Sessions）</b>：同一使用者固定導向同一目標。更好的做法是把工作階段存在 ElastiCache 或 DynamoDB，讓應用程式<b>無狀態</b>。</li>
  <li><b>SSL/TLS 卸載</b>：在 ALB/NLB 終止 HTTPS，可用 SNI 掛多張憑證。</li>
  <li><b>連線清空（Deregistration Delay）</b>：目標移除前，讓進行中的請求完成。</li>
  <li><b>ALB 驗證</b>：ALB 可直接整合 Cognito 或 OIDC 做使用者登入。</li>
</ul>` },
    { id: 'asg', title: 'Auto Scaling 擴展政策', html: `
<p>Auto Scaling 群組（ASG）以<b>啟動範本（Launch Template）</b>定義要啟動的執行個體，設定最小、期望、最大容量，並橫跨多個 AZ。</p>
<table>
<tr><th>政策</th><th>說明</th><th>適用</th></tr>
<tr><td><b>目標追蹤</b> Target Tracking</td><td>維持某個指標在目標值，例如平均 CPU 50%</td><td>最簡單、最常用</td></tr>
<tr><td><b>步進擴展</b> Step Scaling</td><td>依告警超過的幅度，分階段增減數量</td><td>需要細緻控制</td></tr>
<tr><td><b>排程擴展</b> Scheduled</td><td>在固定時間調整容量</td><td>可預期的尖峰，例如每天早上 9 點</td></tr>
<tr><td><b>預測擴展</b> Predictive</td><td>以機器學習分析歷史流量，提前擴展</td><td>週期性流量</td></tr>
</table>
<ul>
  <li><b>冷卻期間（Cooldown）</b>：擴展後等待一段時間再評估，避免頻繁增減。</li>
  <li><b>暖機時間（Instance Warmup）</b>：新執行個體完成啟動前不納入指標計算。</li>
  <li><b>生命週期掛鉤（Lifecycle Hooks）</b>：在執行個體啟動或終止前暫停，執行自訂動作，例如終止前把日誌上傳到 S3。</li>
  <li><b>暖集區（Warm Pools）</b>：預先準備已初始化的執行個體，縮短擴展時間。</li>
  <li><b>健康檢查類型</b>：可使用 EC2 狀態檢查或 <b>ELB 健康檢查</b>；搭配 ELB 時建議啟用 ELB 健康檢查，應用程式失效也會被替換。</li>
  <li><b>混合執行個體政策</b>：同一個 ASG 混用隨需與 Spot、多種執行個體類型，兼顧成本與可用性。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「每週一早上 8 點流量暴增，執行個體啟動需要 10 分鐘」→ <b>排程擴展</b>或<b>預測擴展</b>，提前開好容量。「應用程式掛了但 EC2 還在，ASG 沒有替換」→ 改用 <b>ELB 健康檢查</b>。</div>` },
    { id: 'ec2ha', title: 'EC2 高可用細節', html: `
<table>
<tr><th>置放群組</th><th>特性</th><th>適用</th></tr>
<tr><td><b>叢集</b> Cluster</td><td>同一 AZ 內緊密放置，網路延遲最低、頻寬最高</td><td>HPC、緊密耦合的運算</td></tr>
<tr><td><b>分散</b> Spread</td><td>每個執行個體放在不同硬體，每個 AZ 每群組最多 7 台</td><td>少量關鍵執行個體，降低同時故障風險</td></tr>
<tr><td><b>分割</b> Partition</td><td>分成多個分割區，各分割區使用不同機架</td><td>Hadoop、Cassandra、Kafka 等大型分散式系統</td></tr>
</table>
<ul>
  <li><b>Elastic IP</b>：固定的公有 IPv4，可重新指派到其他執行個體做容錯移轉（但更推薦使用負載平衡器）。</li>
  <li><b>EC2 自動復原（Auto Recovery）</b>：底層硬體故障時，自動在新硬體重啟執行個體並保留 IP 與中繼資料。</li>
  <li><b>休眠（Hibernate）</b>：把記憶體內容存到 EBS 根磁碟區，重新啟動時恢復，縮短應用程式暖機時間。</li>
  <li><b>EC2 執行個體中繼資料（IMDSv2）</b>：使用工作階段權杖存取中繼資料，防止 SSRF 竊取角色憑證。</li>
</ul>
<div class="box warn"><b class="t">易混淆</b>垂直擴展（換大台）需要停機，也有上限；SAA 情境題的高可用答案幾乎都是<b>水平擴展 + 多 AZ + 無狀態應用程式</b>。</div>` },
    { id: 'stateless', title: '無狀態架構與工作階段', html: `
<p>要讓 Auto Scaling 隨時增減執行個體，應用程式必須是<b>無狀態（Stateless）</b>的：任何一台都能處理任何請求。</p>
<table>
<tr><th>狀態類型</th><th>放在哪裡</th></tr>
<tr><td>使用者工作階段</td><td>ElastiCache（Redis／Valkey）或 DynamoDB</td></tr>
<tr><td>使用者上傳的檔案</td><td>S3（或多台共用的 EFS）</td></tr>
<tr><td>應用程式資料</td><td>RDS、Aurora、DynamoDB</td></tr>
<tr><td>組態與機密</td><td>Parameter Store、Secrets Manager</td></tr>
</table>
<div class="box analogy"><b class="t">生活比喻</b>無狀態的伺服器像連鎖速食店的櫃檯人員：任何一位都能幫你點餐，因為訂單記錄在系統裡，不在某位店員的腦袋裡。</div>` }
  ],
  keypoints: [
    'ALB 第 7 層依路徑主機路由、可接 Lambda；NLB 第 4 層固定 IP、極低延遲；GWLB 串第三方設備',
    '需要固定 IP 白名單 → NLB 或 Global Accelerator',
    '目標追蹤最常用；可預期尖峰用排程擴展；週期性流量用預測擴展',
    'ASG 搭配 ELB 時應啟用 ELB 健康檢查；生命週期掛鉤可在終止前執行動作',
    '置放群組：叢集低延遲、分散降低同時故障（每 AZ 最多 7 台）、分割給大型分散式系統',
    '工作階段放 ElastiCache 或 DynamoDB，讓應用程式無狀態',
    '高可用標準答案：多 AZ + ELB + Auto Scaling + 無狀態'
  ]
},
{
  id: 'c05', subject: 1, minutes: 55,
  title: '解耦與無伺服器架構',
  summary: 'Domain 2.1：SQS 標準與 FIFO 佇列、可見性逾時與 DLQ、SNS 扇出、EventBridge、Kinesis、Lambda 設計重點、API Gateway、Step Functions 與容器服務。',
  sections: [
    { id: 'sqs', title: 'Amazon SQS', html: `
<p>SQS 讓生產者與消費者<b>非同步</b>溝通：前端把工作丟進佇列就回應使用者，後端依自己的速度處理。佇列也能吸收流量暴增，避免後端被打垮。</p>
<table>
<tr><th>比較</th><th>標準佇列 Standard</th><th>FIFO 佇列</th></tr>
<tr><td>傳遞保證</td><td>至少一次（可能重複）</td><td><b>剛好一次</b>（去重複）</td></tr>
<tr><td>順序</td><td>盡力而為，不保證</td><td><b>嚴格先進先出</b>（依訊息群組 ID）</td></tr>
<tr><td>吞吐量</td><td>幾乎無限</td><td>有上限（可啟用高吞吐量模式）</td></tr>
<tr><td>名稱</td><td>任意</td><td>必須以 <code>.fifo</code> 結尾</td></tr>
</table>
<h3>重要設定</h3>
<ul>
  <li><b>可見性逾時（Visibility Timeout）</b>：消費者取走訊息後，其他消費者暫時看不到，預設 30 秒、最長 12 小時。處理時間比逾時長，訊息會重新出現造成<b>重複處理</b>，應調長逾時。</li>
  <li><b>無效信件佇列（DLQ）</b>：處理失敗超過 maxReceiveCount 次的訊息移到 DLQ，方便除錯，避免毒訊息卡住佇列。</li>
  <li><b>長輪詢（Long Polling）</b>：等待最多 20 秒直到有訊息，減少空回應與 API 費用。</li>
  <li><b>延遲佇列（Delay Queue）</b>：訊息送出後延遲一段時間才可見。</li>
  <li><b>訊息保留期</b>：預設 4 天，最長 14 天。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「依佇列長度擴展 EC2 消費者」→ 以 <b>ApproximateNumberOfMessages</b>（或每台執行個體的待處理量）做目標追蹤。「訂單必須依順序處理且不可重複」→ <b>FIFO</b>。</div>` },
    { id: 'sns', title: 'SNS、EventBridge 與扇出', html: `
<p><b>SNS</b> 是推送式的發布／訂閱：一則訊息同時送給 SQS、Lambda、HTTP 端點、Email、簡訊。</p>
<div class="flow">
  <div><b>訂單服務</b><span>發布「訂單成立」</span></div>
  <div><b>SNS 主題</b><span>扇出給所有訂閱者</span></div>
  <div><b>SQS：出貨</b><span>各自獨立處理</span></div>
  <div><b>SQS：發票</b><span>某個服務當機<br>訊息仍保留在佇列</span></div>
</div>
<p><b>SNS + SQS 扇出（Fan-out）</b>是最經典的解耦架構：每個下游系統有自己的佇列，可以獨立擴展、獨立重試。SNS 也支援<b>訊息篩選政策</b>，讓訂閱者只收到需要的訊息，並有 FIFO 主題搭配 FIFO 佇列保證順序。</p>
<h3>Amazon EventBridge</h3>
<ul>
  <li>以<b>規則</b>比對事件內容，路由到 Lambda、Step Functions、SQS 等目標。</li>
  <li>接收 AWS 服務事件（例如 EC2 狀態變更、GuardDuty 發現）、自訂應用程式事件與 SaaS 合作夥伴事件。</li>
  <li><b>EventBridge Scheduler</b>：以 cron 或固定頻率觸發工作，取代在 EC2 上跑 cron。</li>
  <li>支援事件封存與重播、結構描述登錄。</li>
</ul>
<div class="box memo"><b class="t">記憶口訣</b>「<b>SQS 拉、SNS 推、EventBridge 看內容轉送</b>」。</div>` },
    { id: 'kinesis', title: '串流資料：Kinesis 與 MSK', html: `
<table>
<tr><th>比較</th><th>Kinesis Data Streams</th><th>Amazon Data Firehose</th></tr>
<tr><td>延遲</td><td>即時（毫秒級）</td><td>近即時（依緩衝設定，約數十秒）</td></tr>
<tr><td>消費者</td><td>自己撰寫（Lambda、KCL 應用程式），可多個消費者</td><td>不用寫消費者，自動送到 S3、Redshift、OpenSearch、Splunk 等</td></tr>
<tr><td>資料保留與重播</td><td>預設 24 小時，最長 365 天，可重播</td><td>不保留、不可重播</td></tr>
<tr><td>容量</td><td>佈建分片（Shard）或隨需模式</td><td>全託管自動擴展</td></tr>
<tr><td>轉換</td><td>消費者自行處理</td><td>可呼叫 Lambda 轉換、轉成 Parquet</td></tr>
</table>
<ul>
  <li><b>順序保證</b>：同一個分割區鍵（Partition Key）的資料進同一個分片，分片內保持順序。</li>
  <li><b>Amazon MSK</b>：託管的 Apache Kafka，既有 Kafka 應用程式遷移時使用。</li>
  <li><b>Amazon Managed Service for Apache Flink</b>：對串流資料執行即時 SQL 或 Flink 分析（舊名 Kinesis Data Analytics）。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「把點擊串流資料存進 S3 供分析，營運負擔最少」→ <b>Firehose</b>。「多個應用程式要即時讀取同一份串流並可重播」→ <b>Kinesis Data Streams</b>。</div>` },
    { id: 'lambda', title: 'Lambda、API Gateway 與 Step Functions', html: `
<h3>Lambda 設計重點</h3>
<ul>
  <li>最長執行 <b>15 分鐘</b>；記憶體可配置到 10 GB，CPU 隨記憶體等比例增加。</li>
  <li><b>並行（Concurrency）</b>：帳戶有並行上限；<b>預留並行</b>保證或限制某函數的並行數；<b>佈建並行</b>預先初始化環境，消除冷啟動延遲。</li>
  <li><b>存取 VPC 資源</b>：Lambda 可連接 VPC 私有子網路存取 RDS；大量連線時搭配 <b>RDS Proxy</b> 做連線池。</li>
  <li>非同步呼叫失敗可設定目的地（Destinations）或 DLQ。</li>
  <li>暫存空間 /tmp 可設定；需要共用檔案可掛載 EFS。</li>
</ul>
<h3>Amazon API Gateway</h3>
<ul>
  <li>REST API、HTTP API（較便宜、延遲較低）、WebSocket API（雙向即時通訊）。</li>
  <li><b>節流（Throttling）</b>與<b>使用量計畫（Usage Plans）</b>搭配 API 金鑰限制客戶呼叫量。</li>
  <li><b>快取</b>：快取回應以降低後端負載。</li>
  <li>授權方式：IAM、Cognito 使用者集區、Lambda 授權者。</li>
  <li>端點類型：邊緣最佳化（經 CloudFront）、區域、私有（只能從 VPC 存取）。</li>
</ul>
<h3>AWS Step Functions</h3>
<p>以狀態機協調多個步驟，內建重試、錯誤處理、平行分支與等待人工核准。<b>標準工作流程</b>最長可執行一年、剛好一次執行；<b>快速工作流程</b>適合高頻率、短時間的事件處理。</p>
<div class="box exam"><b class="t">考點</b>「多個 Lambda 依序執行，失敗要重試，部分步驟要等人工核准」→ <b>Step Functions</b>，而不是讓 Lambda 互相呼叫。</div>` },
    { id: 'containers', title: '容器架構', html: `
<table>
<tr><th>選擇</th><th>情境</th></tr>
<tr><td><b>ECS on Fargate</b></td><td>執行容器但不想管理伺服器，營運負擔最少</td></tr>
<tr><td><b>ECS on EC2</b></td><td>需要特定執行個體類型、GPU，或用 Spot／RI 降低大量容器成本</td></tr>
<tr><td><b>EKS</b></td><td>已使用 Kubernetes、需要跨雲一致性或 K8s 生態系工具</td></tr>
<tr><td><b>App Runner</b></td><td>從程式碼或映像檔直接部署 Web 服務，最簡單</td></tr>
<tr><td><b>Lambda 容器映像檔</b></td><td>事件驅動、執行時間短，但想用容器打包</td></tr>
</table>
<p>ECS 服務可搭配 ALB 做動態埠對應，並以 <b>Service Auto Scaling</b> 調整工作數量。工作要存取 AWS 服務時使用<b>工作角色（Task Role）</b>。</p>` }
  ],
  keypoints: [
    'SQS 標準佇列至少一次、不保證順序；FIFO 剛好一次、保證順序、名稱以 .fifo 結尾',
    '處理時間超過可見性逾時會重複處理；失敗訊息送到 DLQ；長輪詢降低成本',
    'SNS + SQS 扇出讓多個下游系統獨立處理；EventBridge 依事件內容路由與排程',
    'Kinesis Data Streams 即時、可重播、自訂消費者；Firehose 近即時、自動送到 S3/Redshift',
    'Lambda 最長 15 分鐘；佈建並行消除冷啟動；大量資料庫連線用 RDS Proxy',
    'API Gateway 提供節流、快取、使用量計畫；Step Functions 協調多步驟工作流程',
    '容器最少營運負擔選 Fargate；已用 Kubernetes 選 EKS'
  ]
},
{
  id: 'c06', subject: 1, minutes: 50,
  title: '災難復原與備份',
  summary: 'Domain 2.2：RTO 與 RPO、四種災難復原策略、AWS Backup、跨區域複寫、資料庫的多區域方案、Route 53 容錯移轉與 Elastic Disaster Recovery。',
  sections: [
    { id: 'rto', title: 'RTO 與 RPO', html: `
<div class="concepts">
  <div class="concept"><div class="k">RPO</div><b>復原點目標</b><span>Recovery Point Objective：最多能接受<strong>遺失多久的資料</strong>。RPO 1 小時代表至少每小時備份一次。</span></div>
  <div class="concept"><div class="k">RTO</div><b>復原時間目標</b><span>Recovery Time Objective：最多能接受<strong>停機多久</strong>才恢復服務。</span></div>
</div>
<div class="box analogy"><b class="t">生活比喻</b>寫報告時電腦當機：RPO 是「最後一次存檔到當機之間寫的內容會不見」；RTO 是「換一台電腦重新開好檔案要多久」。</div>
<div class="box warn"><b class="t">易混淆</b>RPO 看「資料」往回推，由備份或複寫頻率決定；RTO 看「時間」往後推，由備援環境的準備程度決定。</div>` },
    { id: 'strategies', title: '四種災難復原策略', html: `
<table>
<tr><th>策略</th><th>做法</th><th>RTO／RPO</th><th>成本</th></tr>
<tr><td><b>備份與還原</b> Backup &amp; Restore</td><td>定期備份到其他區域，災難時才建立環境並還原</td><td>數小時～數天</td><td>最低</td></tr>
<tr><td><b>指示燈</b> Pilot Light</td><td>核心資料持續複寫（例如資料庫），應用程式伺服器平時關閉，災難時才啟動並擴展</td><td>數十分鐘～數小時</td><td>低</td></tr>
<tr><td><b>暖待命</b> Warm Standby</td><td>完整但縮小規模的環境一直在運作，災難時擴展到全規模</td><td>數分鐘</td><td>中高</td></tr>
<tr><td><b>多站點主動-主動</b> Multi-site Active-Active</td><td>兩個以上區域同時以全規模提供服務</td><td>接近零</td><td>最高</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>備份、點火、暖機、全開</b>」——越往右越貴，RTO 與 RPO 越短。Pilot Light 像瓦斯爐的指示燈，只有小火苗（資料庫）一直亮著。</div>
<div class="box exam"><b class="t">考點</b>「RTO 數小時、成本最低」→ 備份與還原；「資料庫要持續複寫、其他元件災難時才啟動」→ Pilot Light；「RTO 數分鐘、可接受較高成本」→ Warm Standby；「不能有任何停機」→ Multi-site。</div>` },
    { id: 'backup', title: '備份與複寫服務', html: `
<table>
<tr><th>資源</th><th>備份或複寫方式</th></tr>
<tr><td>多種服務集中管理</td><td><b>AWS Backup</b>：備份計畫、保留政策、<b>跨區域與跨帳戶複製</b>、Backup Vault Lock 防止備份被刪除</td></tr>
<tr><td>EBS</td><td>快照（增量）、可複製到其他區域；Data Lifecycle Manager 自動排程；快照資源回收筒防誤刪</td></tr>
<tr><td>S3</td><td>跨區域複寫（CRR）、同區域複寫（SRR），需啟用版本控制；S3 RTC 保證 15 分鐘內完成複寫</td></tr>
<tr><td>RDS</td><td>自動備份（時間點還原，保留 1～35 天）、手動快照、跨區域唯讀複本或跨區域自動備份</td></tr>
<tr><td>Aurora</td><td>回溯（Backtrack，MySQL 相容版）、<b>Aurora Global Database</b>（跨區域複寫延遲通常低於 1 秒，可在約 1 分鐘內提升次要區域）</td></tr>
<tr><td>DynamoDB</td><td>時間點復原（PITR，最近 35 天）、隨需備份、<b>全域表</b>（多區域、多主動）</td></tr>
<tr><td>伺服器整機</td><td><b>AWS Elastic Disaster Recovery</b>：持續區塊層級複寫，數分鐘內在 AWS 啟動復原執行個體</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「關聯式資料庫跨區域 RPO 約 1 秒、RTO 約 1 分鐘」→ <b>Aurora Global Database</b>。「全球使用者都要能低延遲寫入」→ <b>DynamoDB 全域表</b>。「勒索軟體不能刪除備份」→ <b>AWS Backup Vault Lock</b>。</div>` },
    { id: 'failover', title: 'Route 53 路由與容錯移轉', html: `
<table>
<tr><th>路由政策</th><th>用途</th></tr>
<tr><td><b>簡單</b> Simple</td><td>單一資源，不支援健康檢查</td></tr>
<tr><td><b>容錯移轉</b> Failover</td><td>主要資源健康時用主要，不健康時切到次要（主動-被動 DR）</td></tr>
<tr><td><b>加權</b> Weighted</td><td>依比例分配流量，例如藍綠部署、金絲雀測試 10%</td></tr>
<tr><td><b>延遲</b> Latency</td><td>導向延遲最低的區域</td></tr>
<tr><td><b>地理位置</b> Geolocation</td><td>依使用者所在國家或洲別導向，例如內容在地化、法規限制</td></tr>
<tr><td><b>地理鄰近</b> Geoproximity</td><td>依地理距離並可用偏差值（Bias）擴大或縮小某區域的服務範圍</td></tr>
<tr><td><b>多值答案</b> Multivalue</td><td>回傳多個健康的 IP（最多 8 個），簡易用戶端負載分散</td></tr>
<tr><td><b>IP 型</b> IP-based</td><td>依用戶端 IP 範圍路由</td></tr>
</table>
<ul>
  <li><b>健康檢查</b>可監控端點、其他健康檢查，或 CloudWatch 告警（適合私有資源）。</li>
  <li><b>別名紀錄（Alias）</b>可指向 ELB、CloudFront、S3 網站等 AWS 資源，支援網域頂點（zone apex），且查詢免費。CNAME 不能用在網域頂點。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「主站在東京、備援在新加坡，主站故障時自動切換」→ Route 53 <b>容錯移轉路由 + 健康檢查</b>。「法國使用者只能看到法文網站」→ <b>地理位置路由</b>。</div>` }
  ],
  keypoints: [
    'RPO 是可接受的資料遺失量；RTO 是可接受的停機時間',
    'DR 四策略：備份還原 → Pilot Light → Warm Standby → Multi-site，越右越貴、恢復越快',
    'AWS Backup 集中備份、跨區域跨帳戶複製；Vault Lock 防止備份被刪除',
    'S3 跨區域複寫需啟用版本控制；EBS 快照可複製到其他區域',
    'Aurora Global Database 跨區域秒級複寫；DynamoDB 全域表多區域多主動',
    'Elastic Disaster Recovery 持續複寫伺服器，快速在 AWS 復原',
    'Route 53：容錯移轉做 DR、加權做金絲雀、延遲導向最近區域、地理位置做在地化；Alias 可用於網域頂點'
  ]
}
);
