/* AWS Cloud Practitioner 第二部分：雲端技術服務與計費（Domain 3–4） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c06', subject: 2, minutes: 45,
  title: '部署方式與運算服務',
  summary: 'Domain 3.1、3.3：存取與部署 AWS 的方式、基礎架構即程式碼，以及 EC2、Auto Scaling、負載平衡、容器與無伺服器運算。',
  sections: [
    { id: 'deploy', title: '部署與操作 AWS 的方式', html: `
<table>
<tr><th>方式</th><th>說明</th><th>適用情境</th></tr>
<tr><td><b>AWS Management Console</b></td><td>網頁主控台</td><td>學習、一次性操作</td></tr>
<tr><td><b>AWS CLI</b></td><td>命令列工具</td><td>腳本與自動化</td></tr>
<tr><td><b>AWS SDK</b></td><td>各種程式語言的函式庫</td><td>應用程式呼叫 AWS API</td></tr>
<tr><td><b>AWS CloudShell</b></td><td>在瀏覽器中直接使用的命令列環境，已預先登入</td><td>不想在本機安裝 CLI</td></tr>
<tr><td><b>AWS CloudFormation</b></td><td>以 YAML/JSON 範本描述資源，自動建立整個環境</td><td><b>基礎架構即程式碼（IaC）</b>、可重複部署</td></tr>
<tr><td><b>AWS CDK</b></td><td>用 Python、TypeScript 等程式語言定義基礎架構，再轉成 CloudFormation</td><td>開發人員偏好用程式語言寫 IaC</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「在多個區域快速、一致地重複部署相同環境」→ <b>CloudFormation</b>。題目出現「範本」「Infrastructure as Code」也是選它。</div>
<h3>連線方式</h3>
<ul>
  <li><b>公用網際網路</b>：一般連線方式。</li>
  <li><b>AWS Site-to-Site VPN</b>：透過網際網路建立加密通道連回公司機房。</li>
  <li><b>AWS Direct Connect</b>：從公司機房拉<strong>專線</strong>到 AWS，頻寬穩定、延遲低（第 8 章）。</li>
</ul>` },
    { id: 'ec2', title: 'Amazon EC2', html: `
<p><b>Amazon EC2（Elastic Compute Cloud）</b>提供可調整大小的虛擬伺服器，稱為<b>執行個體（Instance）</b>，是典型的 IaaS。</p>
<div class="concepts">
  <div class="concept"><b>AMI</b><span>Amazon Machine Image，執行個體的範本，包含作業系統與預先安裝的軟體。</span></div>
  <div class="concept"><b>執行個體類型</b><span>決定 CPU、記憶體、網路效能，例如 t3.micro、m7g.large。</span></div>
  <div class="concept"><b>Amazon EBS</b><span>掛載在執行個體上的區塊儲存磁碟（第 7 章）。</span></div>
  <div class="concept"><b>安全群組</b><span>執行個體的虛擬防火牆，控制進出流量（第 8 章）。</span></div>
  <div class="concept"><b>金鑰對 Key Pair</b><span>以 SSH 登入 Linux 執行個體所用的公私鑰。</span></div>
  <div class="concept"><b>使用者資料 User Data</b><span>執行個體第一次開機時自動執行的腳本，例如安裝網頁伺服器。</span></div>
</div>
<h3>執行個體家族</h3>
<table>
<tr><th>類型</th><th>開頭字母</th><th>適用</th></tr>
<tr><td><b>一般用途</b> General Purpose</td><td>T、M</td><td>網站、應用程式伺服器，CPU 與記憶體平衡</td></tr>
<tr><td><b>運算最佳化</b> Compute Optimized</td><td>C</td><td>高效能運算、批次處理、遊戲伺服器、影片轉碼</td></tr>
<tr><td><b>記憶體最佳化</b> Memory Optimized</td><td>R、X</td><td>記憶體內資料庫、即時大數據分析</td></tr>
<tr><td><b>加速運算</b> Accelerated Computing</td><td>P、G、Inf、Trn</td><td>GPU、機器學習訓練與推論、圖形處理</td></tr>
<tr><td><b>儲存最佳化</b> Storage Optimized</td><td>I、D</td><td>大量循序讀寫、資料倉儲、NoSQL</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>C 是 Compute、R 是 RAM、P/G 是 GPU、I 是 I/O</b>」。</div>` },
    { id: 'scale', title: 'Auto Scaling 與負載平衡', html: `
<div class="flow">
  <div><b>使用者</b><span>從網際網路連線</span></div>
  <div><b>Elastic Load Balancing</b><span>把流量平均分配到多個 AZ 的執行個體</span></div>
  <div><b>Auto Scaling 群組</b><span>依負載自動增加或減少 EC2</span></div>
  <div><b>EC2 執行個體</b><span>分布在多個 AZ</span></div>
</div>
<h3>Amazon EC2 Auto Scaling</h3>
<p>依 CloudWatch 指標或排程，自動調整 EC2 數量。設定<b>最小</b>、<b>期望</b>、<b>最大</b>容量，並自動替換不健康的執行個體。這就是「彈性」與「不用猜容量」的實現方式。</p>
<h3>Elastic Load Balancing（ELB）</h3>
<table>
<tr><th>類型</th><th>層級</th><th>適用</th></tr>
<tr><td><b>Application Load Balancer</b></td><td>第 7 層（HTTP/HTTPS）</td><td>網站、依網址路徑或主機名稱分流、微服務</td></tr>
<tr><td><b>Network Load Balancer</b></td><td>第 4 層（TCP/UDP）</td><td>極高效能、超低延遲、需要固定 IP</td></tr>
<tr><td><b>Gateway Load Balancer</b></td><td>第 3 層</td><td>部署第三方防火牆、入侵偵測等虛擬設備</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>ELB 搭配 Auto Scaling、部署在多個 AZ，是「高可用 + 彈性」的標準答案。</div>` },
    { id: 'containers', title: '容器與無伺服器運算', html: `
<p><b>無伺服器（Serverless）</b>代表你不需要管理伺服器，AWS 自動處理容量、擴展與修補，只依實際用量付費。</p>
<table>
<tr><th>服務</th><th>說明</th><th>關鍵字</th></tr>
<tr><td><b>AWS Lambda</b></td><td>上傳程式碼，由事件觸發執行，<strong>依請求次數與執行時間計費</strong>，單次最長 15 分鐘</td><td>無伺服器、事件驅動、S3 上傳後自動處理</td></tr>
<tr><td><b>Amazon ECS</b></td><td>AWS 自家的容器協調服務</td><td>Docker 容器</td></tr>
<tr><td><b>Amazon EKS</b></td><td>託管的 Kubernetes</td><td>Kubernetes、K8s</td></tr>
<tr><td><b>AWS Fargate</b></td><td>容器的無伺服器運算引擎，搭配 ECS 或 EKS，不用管理底層 EC2</td><td>無伺服器容器</td></tr>
<tr><td><b>Amazon ECR</b></td><td>存放容器映像檔的私有登錄庫</td><td>Docker image 倉庫</td></tr>
</table>
<h3>其他運算服務</h3>
<table>
<tr><th>服務</th><th>說明</th></tr>
<tr><td><b>AWS Elastic Beanstalk</b></td><td>PaaS：上傳程式碼，自動建立 EC2、負載平衡、Auto Scaling 等環境</td></tr>
<tr><td><b>Amazon Lightsail</b></td><td>固定月費的簡易虛擬主機，適合小型網站與初學者</td></tr>
<tr><td><b>AWS Batch</b></td><td>自動排程與執行大量批次運算工作</td></tr>
<tr><td><b>AWS App Runner</b></td><td>直接從程式碼或容器映像檔部署 Web 應用程式</td></tr>
</table>
<div class="box warn"><b class="t">易混淆</b>Lambda 適合短時間、事件驅動的工作；超過 15 分鐘的長時間工作要改用 EC2、ECS/Fargate 或 AWS Batch。「不懂基礎架構、只想上傳程式」→ Elastic Beanstalk；「最簡單、固定價格的 WordPress 網站」→ Lightsail。</div>` }
  ],
  keypoints: [
    'CloudFormation 以範本實現基礎架構即程式碼；CDK 用程式語言定義',
    'EC2 是 IaaS 虛擬伺服器；AMI 是範本；User Data 開機時執行腳本',
    '執行個體家族：一般用途 T/M、運算 C、記憶體 R/X、加速 P/G、儲存 I/D',
    'Auto Scaling 自動增減 EC2；ELB 分散流量，兩者搭配多 AZ 達成高可用',
    'ALB 第 7 層 HTTP 分流；NLB 第 4 層高效能固定 IP；GWLB 部署第三方設備',
    'Lambda 無伺服器、事件驅動、最長 15 分鐘、依請求與執行時間計費',
    'ECS 容器、EKS 是 Kubernetes、Fargate 無伺服器容器；Beanstalk 是 PaaS；Lightsail 固定月費'
  ]
},
{
  id: 'c07', subject: 2, minutes: 50,
  title: '儲存與資料庫服務',
  summary: 'Domain 3.4、3.6：S3 與儲存類別、EBS、EFS、FSx、Storage Gateway、AWS Backup，以及 RDS、Aurora、DynamoDB、Redshift 等資料庫。',
  sections: [
    { id: 'types', title: '三種儲存類型', html: `
<table>
<tr><th>類型</th><th>AWS 服務</th><th>特色</th><th>比喻</th></tr>
<tr><td><b>物件儲存</b> Object</td><td>Amazon S3</td><td>以「儲存貯體 + 物件鍵值」存取，容量無限，透過 HTTP 存取</td><td>無限大的雲端硬碟</td></tr>
<tr><td><b>區塊儲存</b> Block</td><td>Amazon EBS、執行個體存放區</td><td>像電腦的硬碟，掛載給<strong>一台</strong> EC2 使用</td><td>電腦裡的 SSD</td></tr>
<tr><td><b>檔案儲存</b> File</td><td>Amazon EFS、Amazon FSx</td><td>可同時掛載給<strong>多台</strong>伺服器共用</td><td>公司的共用資料夾</td></tr>
</table>` },
    { id: 's3', title: 'Amazon S3', html: `
<p><b>Amazon S3（Simple Storage Service）</b>是物件儲存服務，資料<b>耐久性 11 個 9</b>（99.999999999%），資料自動複製到同一區域的多個 AZ。</p>
<ul>
  <li><b>儲存貯體（Bucket）</b>：名稱全球唯一，建立在特定區域。</li>
  <li><b>物件（Object）</b>：檔案本體加上中繼資料。</li>
  <li><b>版本控制（Versioning）</b>：保留每個版本，防止誤刪或覆蓋。</li>
  <li><b>靜態網站託管</b>：直接用 S3 架設 HTML 網站。</li>
  <li><b>生命週期規則（Lifecycle）</b>：依天數自動轉移到便宜的儲存類別或刪除。</li>
  <li><b>封鎖公開存取（Block Public Access）</b>：預設啟用，避免資料意外公開。</li>
</ul>
<h3>S3 儲存類別</h3>
<table>
<tr><th>儲存類別</th><th>適用</th><th>取回時間</th></tr>
<tr><td><b>S3 Standard</b></td><td>經常存取</td><td>毫秒</td></tr>
<tr><td><b>S3 Intelligent-Tiering</b></td><td>存取模式未知或會變動，自動搬移</td><td>毫秒（封存層除外）</td></tr>
<tr><td><b>S3 Standard-IA</b></td><td>不常存取但需立即取回，例如備份</td><td>毫秒</td></tr>
<tr><td><b>S3 One Zone-IA</b></td><td>不常存取、可重新產生，只存一個 AZ</td><td>毫秒</td></tr>
<tr><td><b>S3 Glacier Instant Retrieval</b></td><td>封存，一季存取一次但要立即取回</td><td>毫秒</td></tr>
<tr><td><b>S3 Glacier Flexible Retrieval</b></td><td>封存，可等待</td><td>數分鐘～12 小時</td></tr>
<tr><td><b>S3 Glacier Deep Archive</b></td><td>最便宜，法規長期保存</td><td>12～48 小時</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「存取模式無法預測」→ <b>Intelligent-Tiering</b>；「保存 7 年、很少讀取、最便宜」→ <b>Glacier Deep Archive</b>；「可重新產生的資料、最便宜的不常存取」→ <b>One Zone-IA</b>。</div>` },
    { id: 'block', title: 'EBS、EFS、FSx 與混合儲存', html: `
<table>
<tr><th>服務</th><th>說明</th><th>關鍵字</th></tr>
<tr><td><b>Amazon EBS</b></td><td>EC2 的區塊儲存磁碟，綁定在<strong>單一 AZ</strong>，可建立<b>快照（Snapshot）</b>備份到 S3</td><td>EC2 硬碟、資料庫磁碟</td></tr>
<tr><td><b>執行個體存放區</b> Instance Store</td><td>實體主機上的本機磁碟，速度快，但執行個體停止後<strong>資料消失</strong></td><td>暫存、快取</td></tr>
<tr><td><b>Amazon EFS</b></td><td>Linux 共用檔案系統（NFS），可跨 AZ 同時給多台 EC2 使用，自動擴展容量</td><td>多台 Linux 共用檔案</td></tr>
<tr><td><b>Amazon FSx</b></td><td>託管的第三方檔案系統：FSx for Windows File Server（SMB）、FSx for Lustre（高效能運算）等</td><td>Windows 共用資料夾、HPC</td></tr>
<tr><td><b>AWS Storage Gateway</b></td><td>混合雲儲存，讓地端應用程式使用 S3 等雲端儲存</td><td>地端連接雲端儲存</td></tr>
<tr><td><b>AWS Backup</b></td><td>集中管理 EBS、RDS、DynamoDB、EFS 等多種服務的備份政策</td><td>集中備份</td></tr>
<tr><td><b>AWS Elastic Disaster Recovery</b></td><td>持續複製地端或雲端伺服器，快速在 AWS 復原</td><td>災難復原</td></tr>
</table>
<div class="box warn"><b class="t">易混淆</b>EBS 一般一次只掛載給一台 EC2，而且要在同一個 AZ；要讓多台 Linux 伺服器共用檔案就選 <b>EFS</b>，Windows 環境選 <b>FSx for Windows File Server</b>。</div>` },
    { id: 'db', title: '資料庫服務', html: `
<p>AWS 提供多種<b>託管資料庫（Managed Database）</b>，由 AWS 負責硬體、安裝、修補與備份，客戶專注在資料與查詢。</p>
<table>
<tr><th>服務</th><th>類型</th><th>適用</th></tr>
<tr><td><b>Amazon RDS</b></td><td>關聯式（SQL）</td><td>MySQL、PostgreSQL、MariaDB、Oracle、SQL Server；支援 Multi-AZ 與唯讀複本</td></tr>
<tr><td><b>Amazon Aurora</b></td><td>關聯式（AWS 自研）</td><td>相容 MySQL/PostgreSQL，效能更高，資料自動在 3 個 AZ 保存 6 份</td></tr>
<tr><td><b>Amazon DynamoDB</b></td><td>NoSQL 鍵值／文件</td><td>無伺服器、個位數毫秒延遲、自動擴展，適合大量讀寫</td></tr>
<tr><td><b>Amazon ElastiCache</b></td><td>記憶體內快取</td><td>Redis（Valkey）、Memcached，加速讀取</td></tr>
<tr><td><b>Amazon Redshift</b></td><td>資料倉儲</td><td>大量資料的分析查詢（OLAP）、商業智慧報表</td></tr>
<tr><td><b>Amazon DocumentDB</b></td><td>文件資料庫</td><td>相容 MongoDB</td></tr>
<tr><td><b>Amazon Neptune</b></td><td>圖形資料庫</td><td>社群網路、推薦系統、詐欺偵測</td></tr>
<tr><td><b>Amazon Keyspaces</b></td><td>寬欄資料庫</td><td>相容 Apache Cassandra</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「在 EC2 上自己安裝資料庫」與「使用 RDS」的差別：前者客戶要負責 OS 與資料庫修補；後者由 AWS 負責。「把地端資料庫搬到 AWS，過程中來源資料庫持續運作」→ <b>AWS DMS</b>（Database Migration Service）。</div>
<div class="box memo"><b class="t">記憶口訣</b>「<b>關聯 RDS、更快 Aurora、NoSQL Dynamo、分析 Redshift、快取 ElastiCache、圖形 Neptune</b>」。</div>` }
  ],
  keypoints: [
    '物件儲存 S3、區塊儲存 EBS、檔案儲存 EFS／FSx',
    'S3 耐久性 11 個 9；儲存貯體名稱全球唯一；預設封鎖公開存取',
    'Intelligent-Tiering 處理未知存取模式；Glacier Deep Archive 最便宜的長期保存',
    'EBS 綁定單一 AZ、可做快照；Instance Store 停止後資料消失',
    'EFS 多台 Linux 共用；FSx for Windows 提供 SMB 共用資料夾',
    'RDS 託管關聯式資料庫；Aurora 高效能；DynamoDB 無伺服器 NoSQL',
    'Redshift 資料倉儲；ElastiCache 快取；DMS 遷移資料庫'
  ]
},
{
  id: 'c08', subject: 2, minutes: 45,
  title: '網路與內容傳遞',
  summary: 'Domain 3.5：VPC、子網路、網際網路閘道、NAT、安全群組與網路 ACL、VPN 與 Direct Connect、Route 53、CloudFront 與 Global Accelerator。',
  sections: [
    { id: 'vpc', title: 'Amazon VPC 基本元件', html: `
<p><b>Amazon VPC（Virtual Private Cloud）</b>是你在 AWS 中邏輯隔離的私有網路，可以自訂 IP 範圍、子網路與路由。</p>
<div class="concepts">
  <div class="concept"><b>子網路 Subnet</b><span>VPC 內的 IP 範圍，位於單一 AZ。<b>公有子網路</b>可直接連網際網路；<b>私有子網路</b>不行。</span></div>
  <div class="concept"><b>網際網路閘道 Internet Gateway</b><span>讓 VPC 與網際網路互通。路由表指向 IGW 的子網路就是公有子網路。</span></div>
  <div class="concept"><b>NAT 閘道 NAT Gateway</b><span>讓私有子網路的執行個體可以「主動連出」網際網路（例如下載更新），但外部無法主動連入。</span></div>
  <div class="concept"><b>路由表 Route Table</b><span>決定子網路的流量要送到哪裡。</span></div>
</div>
<div class="flow">
  <div><b>網際網路</b><span>使用者</span></div>
  <div><b>Internet Gateway</b><span>VPC 的大門</span></div>
  <div><b>公有子網路</b><span>負載平衡器、NAT 閘道</span></div>
  <div><b>私有子網路</b><span>應用程式伺服器、資料庫</span></div>
</div>
<div class="box exam"><b class="t">考點</b>資料庫應放在<b>私有子網路</b>，網頁伺服器或負載平衡器放在公有子網路。私有子網路要下載修補程式，透過 <b>NAT 閘道</b>。</div>` },
    { id: 'sg', title: '安全群組與網路 ACL', html: `
<table>
<tr><th>比較</th><th>安全群組 Security Group</th><th>網路 ACL（NACL）</th></tr>
<tr><td>作用層級</td><td><b>執行個體</b>（網路介面）</td><td><b>子網路</b></td></tr>
<tr><td>狀態</td><td><b>有狀態</b>（Stateful）：允許進來的連線，回應會自動放行</td><td><b>無狀態</b>（Stateless）：進出都要分別設定規則</td></tr>
<tr><td>規則</td><td>只能設定<b>允許</b></td><td>可以設定<b>允許與拒絕</b></td></tr>
<tr><td>評估方式</td><td>所有規則一起評估</td><td>依規則編號由小到大，符合就停止</td></tr>
<tr><td>預設</td><td>拒絕所有傳入、允許所有傳出</td><td>預設 NACL 允許所有進出</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>SG 貼身保鑣、有記憶、只說好；NACL 社區警衛、沒記憶、會說不</b>」。</div>
<div class="box exam"><b class="t">考點</b>「要封鎖某個惡意 IP 位址」→ 用 <b>NACL</b> 設定拒絕規則（安全群組不能設拒絕）。</div>` },
    { id: 'hybrid', title: '混合雲連線', html: `
<table>
<tr><th>服務</th><th>說明</th><th>適用</th></tr>
<tr><td><b>AWS Site-to-Site VPN</b></td><td>透過網際網路建立 IPsec 加密通道，連接公司機房與 VPC</td><td>快速建立、成本低</td></tr>
<tr><td><b>AWS Client VPN</b></td><td>讓遠端員工的電腦用 VPN 連進 AWS</td><td>遠距工作</td></tr>
<tr><td><b>AWS Direct Connect</b></td><td>從機房拉<strong>專屬實體線路</strong>到 AWS，不經過網際網路</td><td>頻寬穩定、低延遲、大量資料傳輸；建置需數週</td></tr>
<tr><td><b>VPC Peering</b></td><td>兩個 VPC 之間私有連線</td><td>少量 VPC 互連</td></tr>
<tr><td><b>AWS Transit Gateway</b></td><td>集線器，集中連接大量 VPC 與地端網路</td><td>多 VPC、星狀架構</td></tr>
<tr><td><b>AWS PrivateLink／VPC 端點</b></td><td>不經過網際網路，私有存取 AWS 服務（例如 S3）</td><td>流量不出 AWS 網路</td></tr>
</table>
<div class="box warn"><b class="t">易混淆</b>VPN 走網際網路但加密；Direct Connect 是專線、不走網際網路，但預設<b>不加密</b>。需要穩定、可預期的網路效能 → Direct Connect。</div>` },
    { id: 'edge', title: 'Route 53、CloudFront 與 Global Accelerator', html: `
<table>
<tr><th>服務</th><th>功能</th><th>關鍵字</th></tr>
<tr><td><b>Amazon Route 53</b></td><td>DNS 服務：網域註冊、名稱解析、健康檢查，並支援多種路由政策（依延遲、地理位置、權重、容錯移轉）</td><td>DNS、網域、容錯移轉</td></tr>
<tr><td><b>Amazon CloudFront</b></td><td>內容傳遞網路（CDN），在全球節點位置快取靜態與動態內容</td><td>加速網站、影片、降低延遲、減輕來源負擔</td></tr>
<tr><td><b>AWS Global Accelerator</b></td><td>提供固定的任播（Anycast）IP，透過 AWS 全球骨幹網路加速 TCP/UDP 流量</td><td>固定 IP、非 HTTP 應用、遊戲、快速容錯移轉</td></tr>
<tr><td><b>Amazon API Gateway</b></td><td>建立、發布與管理 API，常搭配 Lambda</td><td>REST API、無伺服器後端</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「全球使用者下載圖片與影片很慢」→ <b>CloudFront</b>；「把使用者導向延遲最低的區域」→ <b>Route 53 延遲路由</b>；「主站故障時自動切到備援站」→ <b>Route 53 容錯移轉路由</b>。</div>` }
  ],
  keypoints: [
    'VPC 是邏輯隔離的私有網路；子網路位於單一 AZ',
    'Internet Gateway 讓 VPC 連網際網路；NAT 閘道讓私有子網路主動連出',
    '安全群組：執行個體層、有狀態、只能允許；NACL：子網路層、無狀態、可允許可拒絕',
    'Site-to-Site VPN 走網際網路加密；Direct Connect 專線、穩定但預設不加密',
    'Transit Gateway 集中連接大量 VPC；VPC 端點私有存取 AWS 服務',
    'Route 53 DNS 與路由政策；CloudFront CDN 快取加速',
    'Global Accelerator 提供固定 Anycast IP，加速 TCP/UDP'
  ]
},
{
  id: 'c09', subject: 2, minutes: 45,
  title: '分析、AI/ML 與其他服務',
  summary: 'Domain 3.7–3.8：資料分析服務、AI/ML 與生成式 AI 服務、應用整合（SQS、SNS、EventBridge、Step Functions），以及遷移、開發者、終端使用者與 IoT 服務。',
  sections: [
    { id: 'analytics', title: '資料分析服務', html: `
<table>
<tr><th>服務</th><th>功能</th><th>關鍵字</th></tr>
<tr><td><b>Amazon Athena</b></td><td>用標準 SQL 直接查詢 S3 中的資料，無伺服器、依掃描量計費</td><td>不用建資料庫就能查 S3</td></tr>
<tr><td><b>AWS Glue</b></td><td>無伺服器 ETL（擷取、轉換、載入），以及資料目錄（Data Catalog）</td><td>ETL、資料目錄</td></tr>
<tr><td><b>Amazon EMR</b></td><td>託管的 Hadoop、Spark 大數據叢集</td><td>大數據處理、Spark</td></tr>
<tr><td><b>Amazon Kinesis</b></td><td>即時收集與處理串流資料，例如點擊流、IoT 感測資料</td><td>即時串流</td></tr>
<tr><td><b>Amazon Data Firehose</b></td><td>把串流資料自動送進 S3、Redshift 等目的地（舊名 Kinesis Data Firehose）</td><td>串流資料入庫</td></tr>
<tr><td><b>Amazon QuickSight</b></td><td>商業智慧（BI）儀表板與視覺化報表</td><td>BI、儀表板</td></tr>
<tr><td><b>Amazon OpenSearch Service</b></td><td>全文搜尋與日誌分析（Elasticsearch 的分支）</td><td>搜尋、日誌分析</td></tr>
<tr><td><b>Amazon Redshift</b></td><td>資料倉儲</td><td>大量結構化資料分析</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「直接用 SQL 查詢 S3 上的日誌檔，不想管理伺服器」→ <b>Athena</b>；「建立互動式業務儀表板」→ <b>QuickSight</b>；「即時分析網站點擊串流」→ <b>Kinesis</b>。</div>` },
    { id: 'ai', title: 'AI/ML 與生成式 AI 服務', html: `
<p>AWS 的 AI 服務分成三層：直接呼叫的 AI 服務、建模平台、以及生成式 AI 服務。CLF 只要知道每個服務的用途。</p>
<table>
<tr><th>服務</th><th>功能</th><th>記憶法</th></tr>
<tr><td><b>Amazon SageMaker AI</b></td><td>建立、訓練與部署機器學習模型的完整平台</td><td>自己訓練模型</td></tr>
<tr><td><b>Amazon Bedrock</b></td><td>透過 API 使用多家基礎模型（例如 Anthropic Claude、Amazon Nova），建構生成式 AI 應用</td><td>生成式 AI、基礎模型</td></tr>
<tr><td><b>Amazon Q</b></td><td>生成式 AI 助理：Q Business 回答企業內部資料問題；Q Developer 協助寫程式</td><td>AI 助理</td></tr>
<tr><td><b>Amazon Rekognition</b></td><td>影像與影片分析：人臉辨識、物件偵測、不當內容審查</td><td>看圖</td></tr>
<tr><td><b>Amazon Comprehend</b></td><td>自然語言處理：情緒分析、關鍵字擷取、實體辨識</td><td>讀懂文字</td></tr>
<tr><td><b>Amazon Transcribe</b></td><td>語音轉文字</td><td>聽寫</td></tr>
<tr><td><b>Amazon Polly</b></td><td>文字轉語音</td><td>Polly 鸚鵡會說話</td></tr>
<tr><td><b>Amazon Translate</b></td><td>機器翻譯</td><td>翻譯</td></tr>
<tr><td><b>Amazon Lex</b></td><td>建立語音與文字聊天機器人</td><td>聊天機器人（Alexa 同技術）</td></tr>
<tr><td><b>Amazon Textract</b></td><td>從掃描文件擷取文字、表格與表單欄位</td><td>OCR、文件擷取</td></tr>
<tr><td><b>Amazon Kendra</b></td><td>以機器學習驅動的企業搜尋</td><td>企業內部搜尋</td></tr>
<tr><td><b>Amazon Personalize</b></td><td>個人化推薦</td><td>推薦系統</td></tr>
<tr><td><b>Amazon Forecast／Fraud Detector</b></td><td>時間序列預測／線上詐欺偵測</td><td>預測、詐欺</td></tr>
</table>
<div class="box tip"><b class="t">跨課程連結</b>如果你也在準備 iPAS AI 應用規劃師，Bedrock、RAG、提示工程等觀念可以互相對照。</div>` },
    { id: 'integration', title: '應用整合服務', html: `
<p>應用整合服務讓系統元件<b>解耦（Decouple）</b>：一個元件故障或變慢時，不會拖垮整個系統。</p>
<table>
<tr><th>服務</th><th>模式</th><th>說明</th></tr>
<tr><td><b>Amazon SQS</b></td><td>訊息佇列（拉取）</td><td>生產者把訊息放進佇列，消費者再取出處理，緩衝流量高峰</td></tr>
<tr><td><b>Amazon SNS</b></td><td>發布／訂閱（推送）</td><td>一則訊息同時推送給多個訂閱者：Email、簡訊、Lambda、SQS</td></tr>
<tr><td><b>Amazon EventBridge</b></td><td>事件匯流排</td><td>依規則把事件路由到目標，也可做排程（舊名 CloudWatch Events）</td></tr>
<tr><td><b>AWS Step Functions</b></td><td>工作流程</td><td>以視覺化狀態機串接多個 Lambda 與服務</td></tr>
<tr><td><b>Amazon MQ</b></td><td>託管訊息代理</td><td>相容 ActiveMQ、RabbitMQ，方便既有系統遷移</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>SQS 排隊等、SNS 廣播發、EventBridge 看規則轉送、Step Functions 畫流程</b>」。</div>` },
    { id: 'others', title: '遷移、開發者與其他服務', html: `
<h3>遷移與傳輸</h3>
<table>
<tr><th>服務</th><th>用途</th></tr>
<tr><td><b>AWS Application Migration Service（MGN）</b></td><td>把地端伺服器原封不動搬到 AWS（Rehost）</td></tr>
<tr><td><b>AWS Database Migration Service（DMS）</b></td><td>遷移資料庫，遷移期間來源資料庫可繼續運作</td></tr>
<tr><td><b>AWS Schema Conversion Tool（SCT）</b></td><td>轉換不同資料庫引擎的結構，例如 Oracle 轉 PostgreSQL</td></tr>
<tr><td><b>AWS DataSync</b></td><td>線上自動同步大量檔案到 S3、EFS、FSx</td></tr>
<tr><td><b>AWS Migration Hub</b></td><td>集中追蹤遷移進度</td></tr>
</table>
<h3>開發者工具</h3>
<ul>
  <li><b>AWS CodeBuild</b>（建置與測試）、<b>CodeDeploy</b>（自動部署）、<b>CodePipeline</b>（CI/CD 流程串接）。</li>
  <li><b>AWS X-Ray</b>：追蹤分散式應用程式的請求，找出效能瓶頸。</li>
  <li><b>AWS Amplify</b>：快速開發與部署全端網頁與行動 App。</li>
  <li><b>AWS AppSync</b>：託管的 GraphQL API。</li>
</ul>
<h3>終端使用者、客服與 IoT</h3>
<ul>
  <li><b>Amazon WorkSpaces</b>：雲端虛擬桌面（DaaS）。<b>Amazon AppStream 2.0</b>：串流桌面應用程式到瀏覽器。</li>
  <li><b>Amazon Connect</b>：雲端客服中心。<b>Amazon SES</b>：大量寄送電子郵件。</li>
  <li><b>AWS IoT Core</b>：連接與管理大量 IoT 裝置。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「讓遠端員工使用雲端桌面」→ <b>WorkSpaces</b>；「建立雲端客服電話中心」→ <b>Connect</b>；「寄送行銷電子報」→ <b>SES</b>。</div>` }
  ],
  keypoints: [
    'Athena 用 SQL 查 S3；Glue 做 ETL 與資料目錄；EMR 跑 Hadoop/Spark',
    'Kinesis 即時串流；QuickSight BI 儀表板；OpenSearch 搜尋與日誌分析',
    'SageMaker AI 訓練模型；Bedrock 使用基礎模型做生成式 AI；Amazon Q 是 AI 助理',
    'Rekognition 影像、Comprehend 文字、Transcribe 語音轉文字、Polly 文字轉語音、Lex 聊天機器人、Textract OCR',
    'SQS 佇列解耦；SNS 發布訂閱；EventBridge 事件路由；Step Functions 工作流程',
    'MGN 搬伺服器、DMS 搬資料庫、SCT 轉結構、DataSync 同步檔案',
    'WorkSpaces 虛擬桌面；Connect 客服中心；SES 寄信；IoT Core 物聯網'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '計費、定價與支援',
  summary: 'Domain 4：EC2 計價模式、免費方案、定價計算機、Cost Explorer、Budgets、成本分配標籤、合併帳單，以及五種支援方案與 AWS 資源。',
  sections: [
    { id: 'pricing', title: 'AWS 定價基本原則', html: `
<p>AWS 的費用主要來自三個方面：<b>運算</b>（使用時間）、<b>儲存</b>（容量）、<b>資料傳輸</b>（傳出流量）。</p>
<ul>
  <li><b>傳入 AWS 的資料傳輸通常免費</b>，從 AWS 傳出到網際網路要收費。</li>
  <li>同一 AZ 內透過私有 IP 傳輸通常免費；跨 AZ、跨區域傳輸要收費。</li>
  <li>用越多，單價越低（例如 S3 分級定價）。</li>
  <li>部分服務本身免費，只收建立的資源費用，例如 <b>IAM、VPC、CloudFormation、Elastic Beanstalk、Auto Scaling</b>。</li>
</ul>
<h3>AWS 免費方案（Free Tier）</h3>
<table>
<tr><th>類型</th><th>說明</th><th>例子</th></tr>
<tr><td><b>永久免費</b> Always Free</td><td>每月固定免費額度，不會到期</td><td>Lambda 每月 100 萬次請求、DynamoDB 部分容量</td></tr>
<tr><td><b>12 個月免費</b></td><td>新帳戶開通後 12 個月內有免費額度</td><td>舊制下的 EC2 t2/t3.micro、S3 5 GB</td></tr>
<tr><td><b>短期試用</b> Trials</td><td>開始使用某服務後的短期免費</td><td>部分 AI 與分析服務</td></tr>
</table>
<div class="box tip"><b class="t">新制提醒</b>AWS 自 2025 年 7 月起調整新帳戶的免費方案，改為發放抵用金並提供限期的免費方案。考試仍可能以三種類型出題，實際額度請以 AWS 官網為準。</div>` },
    { id: 'ec2price', title: 'EC2 計價模式', html: `
<table>
<tr><th>模式</th><th>折扣</th><th>承諾</th><th>適用</th></tr>
<tr><td><b>隨需</b> On-Demand</td><td>無</td><td>無，按秒或按小時計費</td><td>短期、不可預測、不可中斷的工作；開發測試</td></tr>
<tr><td><b>Savings Plans</b></td><td>最高約 72%</td><td>承諾 1 或 3 年、每小時固定消費金額</td><td>穩定用量，且希望能彈性更換執行個體類型或區域（Compute Savings Plans 也適用 Fargate、Lambda）</td></tr>
<tr><td><b>預留執行個體</b> Reserved Instances</td><td>最高約 72%</td><td>承諾 1 或 3 年、特定執行個體類型與區域</td><td>穩定、可預測的長期工作，例如資料庫</td></tr>
<tr><td><b>Spot 執行個體</b></td><td>最高約 90%</td><td>無，但 AWS 需要容量時會以 2 分鐘通知中斷</td><td>可中斷、彈性的工作：批次處理、資料分析、CI/CD</td></tr>
<tr><td><b>專用主機</b> Dedicated Hosts</td><td>—</td><td>整台實體伺服器給你使用</td><td>綁定實體核心的軟體授權（BYOL）、法規要求</td></tr>
<tr><td><b>專用執行個體</b> Dedicated Instances</td><td>—</td><td>在專屬硬體上執行，但無法控制實體主機</td><td>不與其他客戶共用硬體</td></tr>
<tr><td><b>容量預留</b> Capacity Reservations</td><td>無折扣</td><td>保留特定 AZ 的容量</td><td>確保關鍵時刻一定開得出執行個體</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>隨需最彈性、承諾換折扣、Spot 最便宜會被踢、授權綁核心用 Dedicated Host</b>」。</div>
<div class="box exam"><b class="t">考點</b>RI 付款方式有三種：<b>全額預付（All Upfront）</b>折扣最多、<b>部分預付</b>、<b>不預付（No Upfront）</b>。3 年期比 1 年期折扣多。標準 RI 折扣較高；可轉換 RI（Convertible）可以換類型但折扣較少。</div>` },
    { id: 'cost', title: '成本管理工具', html: `
<table>
<tr><th>工具</th><th>用途</th><th>時間點</th></tr>
<tr><td><b>AWS Pricing Calculator</b></td><td>上雲前<strong>估算</strong>架構的每月費用</td><td>事前</td></tr>
<tr><td><b>AWS Billing and Cost Management 主控台</b></td><td>查看帳單、付款與費用明細</td><td>事後</td></tr>
<tr><td><b>AWS Cost Explorer</b></td><td>以圖表<strong>分析</strong>過去費用趨勢，並<strong>預測</strong>未來 12 個月費用，提供 RI 與 Savings Plans 建議</td><td>分析與預測</td></tr>
<tr><td><b>AWS Budgets</b></td><td>設定預算，費用或用量<strong>超過門檻時發出告警</strong>，也可追蹤 RI 使用率</td><td>事中控管</td></tr>
<tr><td><b>AWS Cost and Usage Report（CUR）</b></td><td>最詳細的費用與用量明細，可匯出到 S3 用 Athena 分析</td><td>深度分析</td></tr>
<tr><td><b>成本分配標籤</b> Cost Allocation Tags</td><td>用標籤把費用分攤到部門、專案或環境</td><td>成本歸屬</td></tr>
<tr><td><b>AWS Cost Anomaly Detection</b></td><td>以機器學習偵測異常的費用暴增</td><td>異常告警</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「上雲前估算費用」→ <b>Pricing Calculator</b>；「每月費用超過預算時寄信通知」→ <b>Budgets</b>；「分析過去 6 個月哪項服務最花錢」→ <b>Cost Explorer</b>；「依部門分攤成本」→ <b>成本分配標籤</b>。</div>
<h3>合併帳單（Consolidated Billing）</h3>
<p>使用 <b>AWS Organizations</b> 把多個帳戶合併成一張帳單，好處是：<b>一張帳單</b>集中付款、<b>合併用量享受量價折扣</b>、RI 與 Savings Plans 折扣可在帳戶間<b>共享</b>，而且合併帳單本身<b>不另外收費</b>。</p>` },
    { id: 'support', title: '支援方案與 AWS 資源', html: `
<table>
<tr><th>方案</th><th>技術支援</th><th>最快回應時間</th><th>重點</th></tr>
<tr><td><b>Basic</b></td><td>只有帳單與帳戶問題</td><td>—</td><td>免費；核心 Trusted Advisor 檢查；文件、re:Post</td></tr>
<tr><td><b>Developer</b></td><td>上班時間 Email</td><td>系統受損 &lt; 12 小時（上班時間）</td><td>適合測試與開發</td></tr>
<tr><td><b>Business</b></td><td>24 小時電話、Email、聊天</td><td>正式系統停擺 &lt; 1 小時</td><td><b>完整 Trusted Advisor</b>；適合正式環境</td></tr>
<tr><td><b>Enterprise On-Ramp</b></td><td>24 小時</td><td>業務關鍵系統停擺 &lt; 30 分鐘</td><td>一組 TAM 團隊、Concierge 帳務支援</td></tr>
<tr><td><b>Enterprise</b></td><td>24 小時</td><td>業務關鍵系統停擺 &lt; 15 分鐘</td><td><b>專屬技術客戶經理（TAM）</b>、Concierge、營運審查</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>1 小時 Business、30 分 On-Ramp、15 分 Enterprise；專屬 TAM 只有 Enterprise</b>」。</div>
<div class="box tip"><b class="t">方案調整提醒</b>AWS 近年持續調整支援方案內容與名稱，考試以考試指南的版本為準，實際方案、價格與回應時間請以 AWS 官網為準。</div>
<h3>其他 AWS 資源</h3>
<table>
<tr><th>資源</th><th>用途</th></tr>
<tr><td><b>AWS Marketplace</b></td><td>購買第三方軟體、AMI 與 SaaS，費用併入 AWS 帳單</td></tr>
<tr><td><b>AWS Partner Network（APN）</b></td><td>找 AWS 合作夥伴（顧問公司、軟體廠商）協助導入</td></tr>
<tr><td><b>AWS Professional Services</b></td><td>AWS 官方顧問團隊</td></tr>
<tr><td><b>AWS IQ</b></td><td>媒合經 AWS 認證的自由工作者</td></tr>
<tr><td><b>AWS re:Post</b></td><td>社群問答，取代舊的 AWS Forums</td></tr>
<tr><td><b>AWS Knowledge Center</b></td><td>常見問題的官方解答</td></tr>
<tr><td><b>AWS Prescriptive Guidance</b></td><td>官方的遷移與架構實作指引</td></tr>
<tr><td><b>AWS Trust &amp; Safety Team</b></td><td>回報 AWS 資源被濫用，例如垃圾郵件、DDoS 來源</td></tr>
</table>` }
  ],
  keypoints: [
    '費用三大來源：運算、儲存、資料傳出；傳入資料通常免費',
    'IAM、VPC、CloudFormation、Auto Scaling 本身免費',
    '隨需最彈性；Savings Plans／RI 承諾 1 或 3 年最高約 72%；Spot 最高約 90% 但會被中斷',
    'Dedicated Host 處理綁定實體核心的授權（BYOL）',
    'Pricing Calculator 事前估算；Cost Explorer 分析預測；Budgets 超支告警；CUR 最詳細明細',
    'Organizations 合併帳單：一張帳單、量價折扣、RI 共享、不另收費',
    'Business 正式系統停擺 1 小時、On-Ramp 30 分鐘、Enterprise 15 分鐘；專屬 TAM 只有 Enterprise'
  ]
}
);
