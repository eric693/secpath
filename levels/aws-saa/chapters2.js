/* AWS SAA 第二部分：高效能與成本最佳化架構（Domain 3–4） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 55,
  title: '高效能儲存',
  summary: 'Domain 3.1：EBS 磁碟區類型與執行個體存放區、EFS 效能與儲存類別、FSx 家族、S3 效能最佳化，以及 Storage Gateway、DataSync、Transfer Family 與 Snow 系列。',
  sections: [
    { id: 'ebs', title: 'EBS 磁碟區類型', html: `
<table>
<tr><th>類型</th><th>媒體</th><th>特性</th><th>適用</th></tr>
<tr><td><b>gp3</b></td><td>SSD</td><td>基準 3,000 IOPS 與 125 MB/s，<b>IOPS 與輸送量可獨立於容量調整</b>，比 gp2 便宜</td><td>大多數工作負載、開機磁碟</td></tr>
<tr><td><b>gp2</b></td><td>SSD</td><td>IOPS 隨容量增加（每 GB 3 IOPS），小磁碟靠突發額度</td><td>舊系統，建議遷移到 gp3</td></tr>
<tr><td><b>io2 Block Express／io1</b></td><td>SSD</td><td>佈建 IOPS，延遲低且穩定；io1/io2 支援 <b>Multi-Attach</b>（同 AZ 多台 EC2 共用）</td><td>關鍵資料庫、需要持續高 IOPS</td></tr>
<tr><td><b>st1</b></td><td>HDD</td><td>輸送量最佳化，大量循序讀寫</td><td>大數據、日誌處理、資料倉儲</td></tr>
<tr><td><b>sc1</b></td><td>HDD</td><td>最便宜，冷資料</td><td>很少存取的大量資料</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>gp 一般、io 要 IOPS、st 要吞吐、sc 最冷最便宜</b>」。HDD 類型（st1、sc1）<b>不能當開機磁碟</b>。</div>
<ul>
  <li><b>EBS 綁定單一 AZ</b>：要搬到其他 AZ，先建立快照再從快照建立新磁碟區。</li>
  <li><b>EBS 加密</b>：使用 KMS，快照與從快照建立的磁碟區也會加密；可設定帳戶預設加密。未加密磁碟區要加密：建立快照 → 複製快照時加密 → 建立新磁碟區。</li>
  <li><b>EBS 最佳化執行個體</b>：提供 EBS 專用頻寬。</li>
  <li><b>快照快速還原（FSR）</b>：從快照建立的磁碟區立即達到完整效能，不需預熱。</li>
</ul>
<div class="box warn"><b class="t">執行個體存放區</b>Instance Store 是實體主機上的 NVMe 磁碟，IOPS 極高（數十萬到上百萬），但執行個體<b>停止、休眠或終止時資料會消失</b>。適合快取、暫存、或應用程式自己會複寫的資料（例如分散式資料庫）。</div>` },
    { id: 'file', title: 'EFS 與 FSx 家族', html: `
<table>
<tr><th>服務</th><th>協定與作業系統</th><th>特性</th><th>適用</th></tr>
<tr><td><b>Amazon EFS</b></td><td>NFS，Linux</td><td>多 AZ、自動擴展、多台同時掛載；儲存類別 Standard、IA、Archive，可設生命週期</td><td>Linux 共用檔案、內容管理、容器共用儲存</td></tr>
<tr><td><b>FSx for Windows File Server</b></td><td>SMB，Windows</td><td>整合 Active Directory、DFS，可 Multi-AZ</td><td>Windows 應用程式、使用者家目錄</td></tr>
<tr><td><b>FSx for Lustre</b></td><td>Lustre，Linux</td><td>極高效能平行檔案系統，可與 S3 整合（延遲載入、匯出結果）</td><td>HPC、機器學習訓練、影片轉碼</td></tr>
<tr><td><b>FSx for NetApp ONTAP</b></td><td>NFS、SMB、iSCSI</td><td>多協定、快照、複製、資料去重複</td><td>從地端 NetApp 遷移、混合 Linux 與 Windows</td></tr>
<tr><td><b>FSx for OpenZFS</b></td><td>NFS</td><td>低延遲、快照與複製</td><td>從地端 ZFS 遷移</td></tr>
</table>
<ul>
  <li><b>EFS 輸送量模式</b>：Elastic（依用量自動調整，推薦）、Provisioned（固定輸送量）、Bursting（依容量累積額度）。</li>
  <li><b>EFS 效能模式</b>：General Purpose（低延遲，預設）、Max I/O（舊模式，適合大量平行存取）。</li>
  <li>FSx for Lustre 有<b>暫存（Scratch）</b>與<b>持久（Persistent）</b>兩種部署：短期運算用 Scratch，長期保存用 Persistent。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「機器學習訓練需要高效能檔案系統讀取 S3 上的資料集」→ <b>FSx for Lustre</b>。「Windows 應用程式共用檔案並整合 AD」→ <b>FSx for Windows</b>。「Linux 容器在多個 AZ 共用檔案」→ <b>EFS</b>。</div>` },
    { id: 's3perf', title: 'S3 效能最佳化', html: `
<ul>
  <li><b>請求速率</b>：每個前綴（Prefix）每秒至少 3,500 個 PUT/COPY/POST/DELETE 與 5,500 個 GET/HEAD；把物件分散到多個前綴可以平行提高總吞吐量。</li>
  <li><b>分段上傳（Multipart Upload）</b>：大於 100 MB 建議使用、大於 5 GB 必須使用；平行上傳各分段並可重傳失敗的分段。</li>
  <li><b>S3 Transfer Acceleration</b>：使用者先上傳到最近的 CloudFront 節點，再經 AWS 骨幹網路送到儲存貯體，加速遠距離上傳。</li>
  <li><b>位元組範圍擷取（Byte-Range Fetch）</b>：平行下載物件的不同區段，或只讀取檔案開頭。</li>
  <li><b>S3 Select</b>：以 SQL 只取出物件中需要的資料，減少傳輸量。</li>
  <li><b>S3 Express One Zone</b>：單一 AZ 的高效能儲存類別，個位數毫秒延遲，適合 ML 訓練與分析的高頻存取。</li>
  <li><b>CloudFront 快取</b>：大量讀取的熱門內容透過 CloudFront 提供，降低延遲並減少 S3 請求。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「全球各地使用者上傳大型影片到單一儲存貯體很慢」→ <b>Transfer Acceleration + 分段上傳</b>。S3 提供<b>強一致性</b>：寫入或刪除後立即讀取就能取得最新結果。</div>
<h3>S3 事件與整合</h3>
<p>S3 事件通知可觸發 Lambda、SQS、SNS 或送到 EventBridge，常用於「上傳後自動處理」的架構，例如產生縮圖、病毒掃描、轉檔。</p>` },
    { id: 'hybrid', title: '混合儲存與資料遷移', html: `
<table>
<tr><th>服務</th><th>用途</th><th>關鍵字</th></tr>
<tr><td><b>S3 File Gateway</b></td><td>地端以 NFS/SMB 存取，檔案存成 S3 物件，本機快取熱資料</td><td>地端檔案備份到 S3</td></tr>
<tr><td><b>Volume Gateway</b></td><td>iSCSI 區塊磁碟；Cached 模式主要資料在 S3、本機快取；Stored 模式主要資料在本機、非同步備份到 S3</td><td>地端區塊儲存備份</td></tr>
<tr><td><b>Tape Gateway</b></td><td>虛擬磁帶櫃，取代實體磁帶備份</td><td>既有備份軟體、磁帶</td></tr>
<tr><td><b>AWS DataSync</b></td><td>線上自動化搬移或同步大量檔案（NFS、SMB、HDFS、其他雲）到 S3、EFS、FSx，可排程與驗證</td><td>線上遷移、定期同步</td></tr>
<tr><td><b>AWS Transfer Family</b></td><td>託管 SFTP、FTPS、FTP、AS2 伺服器，後端是 S3 或 EFS</td><td>合作夥伴用 SFTP 傳檔</td></tr>
<tr><td><b>Snowball Edge</b></td><td>實體裝置離線搬移大量資料，也能在邊緣運算</td><td>頻寬不足、數十 TB 以上</td></tr>
</table>
<div class="box tip"><b class="t">頻寬試算</b>100 TB 透過 1 Gbps 線路約需 9～10 天（實際效率更低）。題目若說「網路頻寬有限、資料量很大、要在一週內完成」→ 選 Snowball Edge；「持續同步」→ DataSync。AWS 已陸續停售部分 Snow 裝置，實際可用機型請以官網為準。</div>` }
  ],
  keypoints: [
    'gp3 基準 3,000 IOPS、可獨立調整效能且比 gp2 便宜；io2 給高 IOPS 資料庫並支援 Multi-Attach',
    'st1 大量循序、sc1 最便宜冷資料；HDD 類型不能當開機磁碟',
    'EBS 綁定單一 AZ，跨 AZ 要透過快照；Instance Store 停止後資料消失',
    'EFS 給 Linux 多 AZ 共用；FSx for Windows 整合 AD；FSx for Lustre 給 HPC 與 ML 並整合 S3',
    'S3 每前綴 3,500 寫入／5,500 讀取每秒；大檔用分段上傳；遠距上傳用 Transfer Acceleration',
    'Storage Gateway：File（S3 檔案）、Volume（iSCSI）、Tape（虛擬磁帶）',
    'DataSync 線上遷移與同步；Transfer Family 提供 SFTP；Snowball Edge 離線搬大量資料'
  ]
},
{
  id: 'c08', subject: 2, minutes: 55,
  title: '高效能資料庫與快取',
  summary: 'Domain 3.3：RDS Multi-AZ 與唯讀複本、RDS Proxy、Aurora 架構與功能、DynamoDB 容量模式與索引、DAX、ElastiCache 與快取策略，以及依情境選擇資料庫。',
  sections: [
    { id: 'rds', title: 'RDS：Multi-AZ 與唯讀複本', html: `
<table>
<tr><th>比較</th><th>Multi-AZ 部署</th><th>唯讀複本 Read Replica</th></tr>
<tr><td>目的</td><td><b>高可用</b>與自動容錯移轉</td><td><b>擴展讀取效能</b></td></tr>
<tr><td>複寫方式</td><td><b>同步</b>複寫到其他 AZ</td><td><b>非同步</b>複寫</td></tr>
<tr><td>可否讀取</td><td>傳統待命執行個體不可讀（Multi-AZ DB 叢集的兩個待命可讀）</td><td>可以，應用程式要連到複本端點</td></tr>
<tr><td>範圍</td><td>同一區域</td><td>同區域、跨 AZ 或<b>跨區域</b></td></tr>
<tr><td>容錯移轉</td><td>自動，DNS 端點不變</td><td>需手動提升為獨立資料庫</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「報表查詢拖慢正式資料庫」→ <b>唯讀複本</b>，報表連到複本。「資料庫要在 AZ 故障時自動恢復」→ <b>Multi-AZ</b>。兩者可以同時使用。</div>
<ul>
  <li><b>RDS Proxy</b>：資料庫連線池，大量短連線（例如 Lambda）時避免耗盡連線；縮短容錯移轉時間；可強制使用 IAM 驗證與 Secrets Manager。</li>
  <li><b>儲存自動擴展</b>：空間不足時自動增加容量。</li>
  <li><b>IAM 資料庫驗證</b>：MySQL 與 PostgreSQL 可用 IAM 權杖登入，免存密碼。</li>
  <li><b>RDS Custom</b>：需要存取底層作業系統的 Oracle 與 SQL Server。</li>
  <li>RDS 加密必須在建立時啟用；未加密資料庫要加密：快照 → 複製時加密 → 還原。</li>
</ul>` },
    { id: 'aurora', title: 'Amazon Aurora', html: `
<p>Aurora 把運算與儲存分離：儲存層自動在 <b>3 個 AZ 保存 6 份</b>資料，自動擴展容量；一個寫入執行個體加上最多 <b>15 個唯讀複本</b>，複本延遲通常在毫秒等級，主執行個體故障時自動提升複本。</p>
<table>
<tr><th>功能</th><th>說明</th><th>情境</th></tr>
<tr><td><b>叢集端點與讀取端點</b></td><td>寫入走叢集端點；讀取端點自動在複本間負載平衡</td><td>讀寫分離</td></tr>
<tr><td><b>自訂端點</b></td><td>把特定複本分組，例如給分析用的大規格複本</td><td>分析與線上交易隔離</td></tr>
<tr><td><b>Aurora Serverless v2</b></td><td>依負載自動、細緻地調整容量</td><td>流量不穩定、難以預測</td></tr>
<tr><td><b>Aurora Global Database</b></td><td>跨區域複寫，延遲通常低於 1 秒，次要區域可提供讀取並在災難時提升</td><td>全球讀取、跨區域 DR</td></tr>
<tr><td><b>Aurora 複本自動擴展</b></td><td>依 CPU 或連線數自動增減複本</td><td>讀取量變動</td></tr>
<tr><td><b>快速複製（Cloning）</b></td><td>以寫入時複製快速建立測試用資料庫</td><td>用正式資料測試</td></tr>
<tr><td><b>Backtrack</b></td><td>把資料庫倒回過去某個時間點，不需還原（MySQL 相容版）</td><td>誤刪資料快速復原</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「需要相容 MySQL、高可用、讀取量大且要最少營運負擔」→ <b>Aurora + 唯讀複本</b>。「開發環境偶爾使用，希望不用時幾乎不收運算費」→ <b>Aurora Serverless v2</b>。</div>` },
    { id: 'dynamodb', title: 'Amazon DynamoDB', html: `
<ul>
  <li>全託管、無伺服器的鍵值與文件資料庫，個位數毫秒延遲，單一項目最大 <b>400 KB</b>。</li>
  <li><b>主索引鍵</b>：分割區鍵（Partition Key）或分割區鍵 + 排序鍵（Sort Key）。分割區鍵要選高基數（值很分散）的屬性，避免熱分割區。</li>
  <li><b>容量模式</b>：<b>隨需（On-demand）</b>依請求計費、流量不可預測時使用；<b>佈建（Provisioned）</b>設定 RCU/WCU，可搭配自動擴展與預留容量，流量穩定時較便宜。</li>
  <li><b>索引</b>：<b>GSI</b>（全域次要索引）可用不同的分割區鍵，隨時建立；<b>LSI</b>（本機次要索引）同分割區鍵、不同排序鍵，只能在建表時建立。</li>
  <li><b>DynamoDB Streams</b>：記錄項目變更，可觸發 Lambda 做事件驅動處理。</li>
  <li><b>TTL</b>：項目到期自動刪除，不消耗寫入容量，適合工作階段資料。</li>
  <li><b>全域表（Global Tables）</b>：多區域、多主動複寫。</li>
  <li><b>PITR</b>：最近 35 天內任意時間點還原。可匯出到 S3 用 Athena 分析。</li>
  <li>一致性：預設<b>最終一致性讀取</b>，可選<b>強一致性讀取</b>（消耗兩倍讀取容量）；支援交易（Transactions）。</li>
</ul>
<h3>DAX（DynamoDB Accelerator）</h3>
<p>DynamoDB 專用的記憶體內快取，把讀取延遲從毫秒降到<b>微秒</b>，與 DynamoDB API 相容，<b>幾乎不需修改程式碼</b>。適合讀取密集、重複讀取相同項目的情境。</p>
<div class="box exam"><b class="t">考點</b>「DynamoDB 讀取量大、要微秒級延遲、程式改動最少」→ <b>DAX</b>。「流量無法預測的新應用程式」→ <b>隨需容量模式</b>。</div>` },
    { id: 'cache', title: 'ElastiCache 與快取策略', html: `
<table>
<tr><th>比較</th><th>Redis OSS／Valkey</th><th>Memcached</th></tr>
<tr><td>資料結構</td><td>字串、雜湊、清單、<b>排序集合</b>、地理空間</td><td>簡單鍵值</td></tr>
<tr><td>高可用</td><td>複寫、<b>Multi-AZ 自動容錯移轉</b></td><td>無複寫</td></tr>
<tr><td>持久化與備份</td><td>支援</td><td>不支援</td></tr>
<tr><td>執行緒</td><td>單執行緒為主</td><td><b>多執行緒</b></td></tr>
<tr><td>適用</td><td>排行榜、工作階段、即時分析、發布訂閱</td><td>純快取、需要水平擴充的簡單快取</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>要高可用、排行榜、持久化選 Redis；只要簡單多執行緒快取選 Memcached</b>」。</div>
<h3>快取策略</h3>
<ul>
  <li><b>延遲載入（Lazy Loading／Cache-aside）</b>：快取沒有才讀資料庫並寫入快取。只快取被讀取的資料，但第一次讀取較慢，資料可能過時。</li>
  <li><b>寫入時更新（Write-through）</b>：寫入資料庫時同步更新快取，資料較新，但會快取很少被讀的資料。</li>
  <li><b>TTL</b>：設定到期時間，避免資料過時太久。</li>
</ul>
<div class="box tip"><b class="t">其他快取層</b>CloudFront（邊緣快取）、API Gateway 快取、DAX（DynamoDB）、RDS 唯讀複本（分擔讀取）。題目會依「快取什麼、放在哪一層」出題。</div>` },
    { id: 'choose', title: '依情境選擇資料庫', html: `
<table>
<tr><th>需求</th><th>選擇</th></tr>
<tr><td>關聯式、交易、既有 MySQL/PostgreSQL/Oracle/SQL Server</td><td>RDS 或 Aurora</td></tr>
<tr><td>大規模鍵值存取、無伺服器、可預測低延遲</td><td>DynamoDB</td></tr>
<tr><td>資料倉儲、大量分析查詢（OLAP）</td><td>Redshift（Redshift Serverless 免管理叢集）</td></tr>
<tr><td>MongoDB 相容的文件資料庫</td><td>DocumentDB</td></tr>
<tr><td>高度關聯的資料：社群關係、詐欺偵測、知識圖譜</td><td>Neptune</td></tr>
<tr><td>Cassandra 相容寬欄資料庫</td><td>Keyspaces</td></tr>
<tr><td>時間序列：IoT 感測、應用程式指標</td><td>Timestream</td></tr>
<tr><td>全文搜尋、日誌分析</td><td>OpenSearch Service</td></tr>
<tr><td>記憶體內、需要持久性的 Redis 相容資料庫</td><td>MemoryDB</td></tr>
</table>` }
  ],
  keypoints: [
    'Multi-AZ 同步複寫、為了高可用；唯讀複本非同步、為了擴展讀取，可跨區域',
    'RDS Proxy 提供連線池，適合 Lambda 大量短連線並縮短容錯移轉時間',
    'Aurora 儲存 3 AZ 6 份、最多 15 個複本；Serverless v2 自動調整容量；Global Database 跨區域秒級複寫',
    'DynamoDB 單一項目 400 KB；隨需模式給不可預測流量；GSI 隨時建、LSI 只能建表時建',
    'DAX 讓 DynamoDB 讀取達微秒級、幾乎不用改程式',
    'Redis 有複寫、持久化、排序集合；Memcached 多執行緒純快取',
    '圖形 Neptune、文件 DocumentDB、時間序列 Timestream、資料倉儲 Redshift'
  ]
},
{
  id: 'c09', subject: 2, minutes: 45,
  title: '高效能網路與內容傳遞',
  summary: 'Domain 3.4：CloudFront 快取行為、Lambda@Edge 與 CloudFront Functions、Global Accelerator、Route 53 效能路由、EC2 增強網路與邊緣服務的選擇。',
  sections: [
    { id: 'cf', title: 'Amazon CloudFront 進階', html: `
<ul>
  <li><b>來源（Origin）</b>：S3、ALB、EC2、MediaStore 或任何 HTTP 伺服器。可設定<b>來源群組</b>，主要來源失敗時自動容錯移轉到次要來源。</li>
  <li><b>快取行為（Cache Behaviors）</b>：依路徑設定不同規則，例如 /images/* 長時間快取、/api/* 不快取並轉送到 ALB。</li>
  <li><b>快取鍵與 TTL</b>：快取鍵包含的標頭、Cookie、查詢字串越少，命中率越高。</li>
  <li><b>失效（Invalidation）</b>：強制清除快取的物件；更好的做法是使用版本化檔名。</li>
  <li><b>Origin Shield</b>：在來源前多一層集中快取，降低來源負載。</li>
  <li>支援動態內容加速、HTTP/3、WebSocket，以及影片串流。</li>
</ul>
<table>
<tr><th>比較</th><th>CloudFront Functions</th><th>Lambda@Edge</th></tr>
<tr><td>執行位置</td><td>節點位置</td><td>區域節點快取</td></tr>
<tr><td>語言</td><td>JavaScript</td><td>Node.js、Python</td></tr>
<tr><td>執行時間</td><td>亞毫秒級</td><td>最長數秒</td></tr>
<tr><td>適用</td><td>標頭操作、網址重寫、簡單驗證權杖、重新導向</td><td>需要網路呼叫、較複雜的邏輯、存取請求內文</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「依使用者裝置類型改寫網址，大量請求、成本最低」→ <b>CloudFront Functions</b>。「在邊緣呼叫外部 API 驗證使用者」→ <b>Lambda@Edge</b>。</div>` },
    { id: 'ga', title: 'Global Accelerator 與 CloudFront 的選擇', html: `
<table>
<tr><th>比較</th><th>CloudFront</th><th>Global Accelerator</th></tr>
<tr><td>運作方式</td><td>在邊緣<b>快取</b>內容</td><td>不快取，透過 AWS 骨幹網路<b>加速</b>連線</td></tr>
<tr><td>協定</td><td>HTTP/HTTPS</td><td><b>TCP 與 UDP</b></td></tr>
<tr><td>IP</td><td>動態 IP</td><td><b>兩個固定 Anycast IP</b></td></tr>
<tr><td>容錯移轉</td><td>來源群組</td><td>依健康檢查在區域間快速切換（不受 DNS 快取影響）</td></tr>
<tr><td>適用</td><td>網站、靜態與動態內容、影片</td><td>遊戲、VoIP、IoT、需要固定 IP、多區域快速容錯</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「UDP 遊戲伺服器部署在多個區域，玩家要連到最近的健康端點，並提供固定 IP」→ <b>Global Accelerator</b>。「網站的靜態圖片載入慢」→ <b>CloudFront</b>。</div>` },
    { id: 'r53perf', title: 'Route 53 效能路由與混合 DNS', html: `
<ul>
  <li><b>延遲路由</b>：依使用者到各區域的網路延遲，回應延遲最低的端點。</li>
  <li><b>地理鄰近路由</b>：可調整偏差值，把更多流量導向容量較大的區域。</li>
  <li><b>Route 53 Resolver</b>：VPC 內建的 DNS。<b>輸入端點</b>讓地端 DNS 解析 AWS 私有網域；<b>輸出端點</b>搭配轉送規則，讓 VPC 解析地端網域。</li>
  <li><b>私有託管區域（Private Hosted Zone）</b>：只在關聯的 VPC 內可解析的內部網域。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「地端伺服器要解析 AWS 私有託管區域中的名稱」→ 建立 <b>Route 53 Resolver 輸入端點</b>，並在地端 DNS 設定條件式轉送。</div>` },
    { id: 'ec2net', title: 'EC2 網路效能', html: `
<table>
<tr><th>技術</th><th>說明</th></tr>
<tr><td><b>增強網路（ENA）</b></td><td>以 SR-IOV 提供高頻寬、低延遲、高每秒封包數，現代執行個體預設支援</td></tr>
<tr><td><b>Elastic Fabric Adapter（EFA）</b></td><td>繞過作業系統核心的網路介面，適合緊密耦合的 HPC 與分散式 ML 訓練（MPI、NCCL）</td></tr>
<tr><td><b>叢集置放群組</b></td><td>同 AZ 緊密放置，執行個體間延遲最低</td></tr>
<tr><td><b>巨型訊框（Jumbo Frames）</b></td><td>VPC 內支援 9001 MTU，提高大量資料傳輸效率</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「HPC 工作節點之間需要最低延遲與最高頻寬」→ <b>叢集置放群組 + EFA</b>（或 ENA）。</div>
<h3>邊緣與混合運算</h3>
<p>需要更靠近使用者的運算時：<b>Local Zones</b>（大城市附近）、<b>Wavelength</b>（5G 網路）、<b>Outposts</b>（客戶機房）。內容傳遞則以 CloudFront 為主。</p>` }
  ],
  keypoints: [
    'CloudFront 依路徑設定快取行為；來源群組提供來源容錯移轉；Origin Shield 降低來源負載',
    'CloudFront Functions 輕量、亞毫秒、大量請求；Lambda@Edge 可做網路呼叫與複雜邏輯',
    'Global Accelerator：兩個固定 Anycast IP、TCP/UDP、不快取、區域間快速容錯移轉',
    '延遲路由導向最近區域；地理鄰近可用偏差值調整流量',
    'Resolver 輸入端點讓地端解析 AWS 名稱；輸出端點讓 VPC 解析地端名稱',
    'HPC 低延遲：叢集置放群組 + EFA；ENA 提供增強網路',
    '更靠近使用者的運算：Local Zones、Wavelength、Outposts'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '資料分析與機器學習架構',
  summary: 'Domain 3.5：S3 資料湖、Glue 與 Lake Formation、Athena、EMR、Redshift 與 Spectrum、串流分析、QuickSight、OpenSearch，以及 AI/ML 服務在架構中的選擇。',
  sections: [
    { id: 'lake', title: 'S3 資料湖架構', html: `
<div class="flow">
  <div><b>擷取</b><span>Firehose、DataSync、DMS、Kinesis</span></div>
  <div><b>儲存</b><span>S3 資料湖<br>原始區 → 整理區</span></div>
  <div><b>編目與轉換</b><span>Glue Crawler、Glue ETL、Data Catalog</span></div>
  <div><b>分析</b><span>Athena、Redshift Spectrum、EMR</span></div>
  <div><b>視覺化</b><span>QuickSight</span></div>
</div>
<ul>
  <li><b>AWS Glue</b>：Crawler 自動掃描資料並建立結構描述到 <b>Data Catalog</b>；Glue ETL（Spark）轉換資料；Glue DataBrew 提供視覺化資料整理。</li>
  <li><b>AWS Lake Formation</b>：快速建立資料湖，並提供<b>欄位、資料列層級的集中權限控管</b>，統一管理 Athena、Redshift Spectrum、EMR 的存取。</li>
  <li><b>欄式格式與分割</b>：把 CSV 轉成 <b>Parquet 或 ORC</b> 並依日期分割，Athena 掃描量大幅減少，查詢更快更便宜。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「分析師只能看到特定欄位，跨多個分析服務集中管理權限」→ <b>Lake Formation</b>。「降低 Athena 查詢成本」→ 轉成 <b>Parquet + 分割 + 壓縮</b>。</div>` },
    { id: 'query', title: '查詢與處理引擎', html: `
<table>
<tr><th>服務</th><th>適用</th><th>特性</th></tr>
<tr><td><b>Amazon Athena</b></td><td>臨時（Ad-hoc）SQL 查詢 S3、查詢 CloudTrail／ALB／VPC Flow Logs</td><td>無伺服器、依掃描量計費；聯合查詢可查其他資料來源</td></tr>
<tr><td><b>Amazon Redshift</b></td><td>資料倉儲、複雜的 BI 報表、大量結構化資料</td><td>欄式儲存、MPP；Redshift Serverless 免管理叢集</td></tr>
<tr><td><b>Redshift Spectrum</b></td><td>從 Redshift 直接查詢 S3 上的資料，不需載入</td><td>結合倉儲與資料湖</td></tr>
<tr><td><b>Amazon EMR</b></td><td>Spark、Hadoop、Hive、Presto 的大規模處理，需要自訂框架</td><td>可用 Spot 執行個體做任務節點降低成本；也有 EMR Serverless</td></tr>
<tr><td><b>Glue ETL</b></td><td>無伺服器 Spark ETL 工作</td><td>不用管理叢集</td></tr>
<tr><td><b>OpenSearch Service</b></td><td>全文搜尋、日誌與即時分析儀表板</td><td>OpenSearch Serverless 可免管理叢集</td></tr>
</table>
<div class="box warn"><b class="t">易混淆</b>偶爾查詢 S3 上的資料 → Athena；固定、大量、複雜的 BI 報表 → Redshift；需要自訂 Spark 程式與框架 → EMR；搜尋文字 → OpenSearch。</div>` },
    { id: 'stream', title: '串流分析與視覺化', html: `
<ul>
  <li><b>Kinesis Data Streams</b> → <b>Managed Service for Apache Flink</b>：即時異常偵測、即時儀表板。</li>
  <li><b>Data Firehose</b> → S3／Redshift／OpenSearch：近即時入庫，可用 Lambda 轉換、轉成 Parquet。</li>
  <li><b>Amazon MSK</b>：既有 Kafka 生態系。</li>
  <li><b>Amazon QuickSight</b>：BI 儀表板，SPICE 記憶體內引擎加速，支援內嵌儀表板與自然語言提問（Amazon Q in QuickSight）。</li>
</ul>
<div class="box exam"><b class="t">常見架構</b>IoT 感測資料 → IoT Core → Kinesis Data Streams → Lambda 或 Flink 即時處理 → DynamoDB 儲存最新狀態；同時用 Firehose 把原始資料存進 S3，再用 Athena 做歷史分析。</div>` },
    { id: 'ml', title: 'AI/ML 服務的架構選擇', html: `
<table>
<tr><th>需求</th><th>選擇</th></tr>
<tr><td>自己訓練、調校、部署模型</td><td>SageMaker AI（訓練工作、端點、批次轉換、Pipelines）</td></tr>
<tr><td>使用基礎模型建構生成式 AI、RAG、代理程式</td><td>Amazon Bedrock（知識庫、Agents、Guardrails）</td></tr>
<tr><td>影像辨識、內容審查</td><td>Rekognition</td></tr>
<tr><td>文件擷取（發票、表單）</td><td>Textract</td></tr>
<tr><td>文字分析、PII 偵測</td><td>Comprehend</td></tr>
<tr><td>語音轉文字、文字轉語音、翻譯</td><td>Transcribe、Polly、Translate</td></tr>
<tr><td>企業智慧搜尋</td><td>Kendra 或 Amazon Q Business</td></tr>
<tr><td>推薦系統</td><td>Personalize</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>SAA 題目偏好「用託管 AI 服務取代自己訓練模型」，例如「從上傳的身分證影像擷取文字，營運負擔最少」→ <b>Textract</b>，而不是在 EC2 上自建 OCR 模型。</div>` }
  ],
  keypoints: [
    'S3 資料湖：Glue Crawler 建立 Data Catalog，Athena、Redshift Spectrum、EMR 分析',
    'Lake Formation 提供欄位與資料列層級的集中權限控管',
    '轉成 Parquet、分割、壓縮可降低 Athena 掃描量與費用',
    'Athena 臨時查詢；Redshift 資料倉儲；Spectrum 從 Redshift 查 S3；EMR 自訂 Spark',
    '即時分析用 Kinesis Data Streams + Flink；近即時入庫用 Firehose',
    'QuickSight 提供 BI 儀表板；OpenSearch 提供搜尋與日誌分析',
    '優先使用託管 AI 服務：Textract、Rekognition、Comprehend、Bedrock'
  ]
},
{
  id: 'c11', subject: 2, minutes: 50,
  title: '成本最佳化：運算與儲存',
  summary: 'Domain 4.1–4.2：EC2 計價模式與 Savings Plans 類型、Spot 架構、精確配置與 Compute Optimizer、Graviton、無伺服器成本，以及 S3、EBS、EFS 的成本最佳化。',
  sections: [
    { id: 'purchase', title: 'EC2 購買選項', html: `
<table>
<tr><th>選項</th><th>折扣</th><th>承諾與彈性</th><th>適用</th></tr>
<tr><td><b>隨需</b></td><td>—</td><td>無承諾</td><td>短期、不可中斷、無法預測</td></tr>
<tr><td><b>Compute Savings Plans</b></td><td>最高約 66%</td><td>承諾每小時金額；可換執行個體家族、大小、區域、作業系統，並適用 Fargate 與 Lambda</td><td>穩定用量但架構可能改變</td></tr>
<tr><td><b>EC2 Instance Savings Plans</b></td><td>最高約 72%</td><td>綁定區域內的執行個體家族，可換大小與作業系統</td><td>確定使用某家族</td></tr>
<tr><td><b>標準 RI</b></td><td>最高約 72%</td><td>綁定執行個體類型；可在 RI Marketplace 轉售</td><td>穩定、確定的長期工作</td></tr>
<tr><td><b>可轉換 RI</b></td><td>最高約 66%</td><td>可換執行個體家族</td><td>可能變更類型</td></tr>
<tr><td><b>Spot</b></td><td>最高約 90%</td><td>2 分鐘通知中斷</td><td>無狀態、可中斷、彈性時間</td></tr>
<tr><td><b>隨需容量預留</b></td><td>無折扣（可搭配 Savings Plans）</td><td>保證特定 AZ 的容量</td><td>關鍵活動一定要開得出機器</td></tr>
<tr><td><b>Dedicated Hosts</b></td><td>—</td><td>整台實體主機</td><td>以插槽／核心計價的授權、法規</td></tr>
</table>
<div class="box exam"><b class="t">組合解法</b>穩定的基本負載用 <b>Savings Plans 或 RI</b>；可預期的尖峰用<b>隨需 + 排程擴展</b>；可中斷的批次工作用 <b>Spot</b>。題目說「全年 24 小時運作 3 年」→ 3 年期全額預付最便宜。</div>` },
    { id: 'spot', title: 'Spot 架構與精確配置', html: `
<h3>善用 Spot</h3>
<ul>
  <li><b>EC2 Fleet／Spot Fleet</b>：指定多種執行個體類型與 AZ，以容量最佳化（capacity-optimized）配置策略降低被中斷機率。</li>
  <li><b>ASG 混合執行個體政策</b>：基本容量用隨需，其餘用 Spot。</li>
  <li><b>處理中斷</b>：透過 EventBridge 接收中斷通知，把工作狀態存到 S3 或 DynamoDB，以檢查點（Checkpoint）續跑。</li>
  <li>適合：批次處理、CI/CD、大數據（EMR 任務節點）、無狀態網頁層、容器工作。不適合：資料庫、需要長時間連續運作且無法中斷的工作。</li>
</ul>
<h3>精確配置（Rightsizing）</h3>
<ul>
  <li><b>AWS Compute Optimizer</b>：以機器學習分析 CloudWatch 指標，建議 EC2、ASG、EBS、Lambda、ECS on Fargate 的最佳規格。</li>
  <li><b>Graviton（ARM）執行個體</b>：相同工作負載通常有更好的性價比，例如 m7g、c7g、r7g；RDS、ElastiCache、Lambda 也支援。</li>
  <li><b>關閉非上班時間的開發環境</b>：用 EventBridge Scheduler 或 Instance Scheduler 自動開關。</li>
  <li><b>可爆發執行個體（T 系列）</b>：平時 CPU 低、偶爾尖峰的工作。</li>
</ul>` },
    { id: 'serverless', title: '無伺服器與容器的成本', html: `
<table>
<tr><th>情境</th><th>較省錢的選擇</th></tr>
<tr><td>偶發、短時間、流量不固定的工作</td><td>Lambda（沒執行不收費）</td></tr>
<tr><td>24 小時持續高負載</td><td>EC2 或 ECS on EC2 搭配 Savings Plans（Lambda 長時間高負載可能更貴）</td></tr>
<tr><td>容器且不想管伺服器</td><td>Fargate，可用 Fargate Spot 處理可中斷工作</td></tr>
<tr><td>大量容器、穩定負載</td><td>ECS／EKS on EC2 + Spot 或 Savings Plans</td></tr>
<tr><td>Lambda 記憶體設定</td><td>用 Lambda Power Tuning 找出成本與執行時間的最佳平衡</td></tr>
<tr><td>排程工作（cron）</td><td>EventBridge Scheduler + Lambda，取代整天開著的 EC2</td></tr>
</table>` },
    { id: 'storage', title: '儲存成本最佳化', html: `
<h3>S3</h3>
<ul>
  <li><b>生命週期規則</b>：例如 30 天後轉 Standard-IA、90 天後轉 Glacier Flexible Retrieval、365 天後轉 Deep Archive、7 年後刪除。</li>
  <li><b>最短計費天數</b>：Standard-IA／One Zone-IA 30 天、Glacier Instant／Flexible 90 天、Deep Archive 180 天。太早刪除或轉移仍按最短天數收費。</li>
  <li><b>最小計費物件大小</b>：IA 類別每個物件至少以 128 KB 計費，大量小檔案不適合轉到 IA。</li>
  <li><b>Intelligent-Tiering</b>：存取模式未知時使用，沒有取回費，只收每個物件的小額監控費。</li>
  <li><b>S3 Storage Lens 與儲存類別分析</b>：找出可以轉移類別的資料。</li>
  <li>清除<b>未完成的分段上傳</b>與<b>舊版本物件</b>（生命週期規則可自動處理）。</li>
  <li><b>請求者付費（Requester Pays）</b>：讓下載資料的一方支付傳輸與請求費用。</li>
</ul>
<h3>EBS 與 EFS</h3>
<ul>
  <li>把 <b>gp2 遷移到 gp3</b>，通常可以降低成本並獲得更好的基準效能，而且可線上修改不需停機。</li>
  <li>刪除<b>未連接的磁碟區</b>與<b>過期快照</b>；把不常用的快照移到 <b>EBS Snapshots Archive</b>。</li>
  <li>EFS 啟用<b>生命週期管理</b>，自動把不常存取的檔案移到 IA 或 Archive 儲存類別。</li>
  <li>大量循序存取改用 st1；冷資料用 sc1。</li>
</ul>
<div class="box exam"><b class="t">考點</b>「日誌前 30 天經常查詢，之後很少用，但要保留 5 年，成本最低」→ <b>S3 生命週期</b>：Standard → 30 天後 Glacier 類別 → 5 年後刪除。</div>` }
  ],
  keypoints: [
    'Compute Savings Plans 最有彈性（含 Fargate、Lambda）；EC2 Instance Savings Plans 與標準 RI 折扣最高',
    '穩定基本負載用承諾方案、可預期尖峰用隨需加排程、可中斷工作用 Spot',
    'Spot 搭配多種類型與 AZ、容量最佳化策略，並以檢查點處理中斷',
    'Compute Optimizer 建議精確配置；Graviton 通常有更好的性價比',
    '偶發工作用 Lambda 最省；持續高負載用 EC2 加 Savings Plans',
    'S3 生命週期轉移與刪除；注意最短計費天數與 IA 的 128 KB 最小計費',
    'gp2 改 gp3 降成本；刪除未連接磁碟區與過期快照；EFS 生命週期管理'
  ]
},
{
  id: 'c12', subject: 2, minutes: 45,
  title: '成本最佳化：網路、資料庫與成本管理',
  summary: 'Domain 4.3–4.4：資料傳輸費用、NAT 閘道與 VPC 端點、CloudFront 降低傳出費用、資料庫成本選擇，以及 Cost Explorer、Budgets、CUR、標籤與 Organizations 的成本治理。',
  sections: [
    { id: 'transfer', title: '資料傳輸費用', html: `
<table>
<tr><th>流量</th><th>費用</th></tr>
<tr><td>從網際網路傳入 AWS</td><td>免費</td></tr>
<tr><td>同一 AZ 內，使用<b>私有 IP</b></td><td>免費</td></tr>
<tr><td>同一 AZ 內，使用公有 IP 或 Elastic IP</td><td>收費（如同跨 AZ）</td></tr>
<tr><td>跨 AZ</td><td>雙向收費</td></tr>
<tr><td>跨區域</td><td>收費，比跨 AZ 高</td></tr>
<tr><td>傳出到網際網路</td><td>收費，用量越大單價越低</td></tr>
<tr><td>CloudFront 傳出到使用者</td><td>通常比 EC2/S3 直接傳出便宜，且 S3 到 CloudFront 的傳輸免費</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>進來免費、同 AZ 私有 IP 免費、跨出去就收錢、越遠越貴</b>」。</div>
<div class="box warn"><b class="t">取捨</b>跨 AZ 傳輸要收費，但為了高可用仍應多 AZ 部署。題目問「成本最低且仍要高可用」，不要選單一 AZ；改從架構設計減少不必要的跨 AZ 流量。另外，公有 IPv4 位址本身也會按小時收費。</div>` },
    { id: 'nat', title: 'NAT 閘道與 VPC 端點的成本', html: `
<p>NAT 閘道除了每小時費用，還會依<b>處理的資料量</b>收費。私有子網路大量存取 S3 或 DynamoDB 時，費用可能很驚人。</p>
<table>
<tr><th>情境</th><th>省錢做法</th></tr>
<tr><td>私有子網路大量存取 S3、DynamoDB</td><td>改走 <b>Gateway 端點</b>（免費），不經過 NAT 閘道</td></tr>
<tr><td>大量呼叫其他 AWS 服務 API</td><td>評估 Interface 端點費用是否低於 NAT 處理費</td></tr>
<tr><td>多個 VPC 都需要連出網際網路</td><td>以 Transit Gateway 集中到共用的出口 VPC</td></tr>
<tr><td>跨 AZ 使用 NAT 閘道</td><td>每個 AZ 用自己的 NAT 閘道，避免跨 AZ 費用並提高可用性</td></tr>
<tr><td>VPC 之間大量傳輸</td><td>VPC Peering 沒有每小時費用；Transit Gateway 有連接與處理費用</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「帳單顯示 NAT 閘道資料處理費很高，流量主要是 EC2 上傳到 S3」→ 建立 <b>S3 Gateway 端點</b>並更新路由表。這是 SAA 成本題的常客。</div>
<h3>降低傳出費用</h3>
<ul>
  <li>用 <b>CloudFront</b> 提供靜態內容，減少來源傳出費用並提高快取命中率。</li>
  <li>大量資料從地端定期傳入／傳出時，<b>Direct Connect</b> 的資料傳出單價比網際網路低。</li>
  <li>把需要大量互傳的服務放在同一區域、同一 AZ（非關鍵環境）。</li>
  <li>壓縮資料後再傳輸。</li>
</ul>` },
    { id: 'dbcost', title: '資料庫成本選擇', html: `
<table>
<tr><th>情境</th><th>較省錢的選擇</th></tr>
<tr><td>穩定運作的 RDS／Aurora／ElastiCache／Redshift</td><td>購買<b>預留資料庫執行個體</b>或預留節點</td></tr>
<tr><td>使用量變動大或偶爾使用</td><td><b>Aurora Serverless v2</b>、Redshift Serverless</td></tr>
<tr><td>開發測試資料庫晚上沒人用</td><td>排程停止 RDS（停止最多 7 天會自動重新啟動）或改用 Aurora Serverless</td></tr>
<tr><td>DynamoDB 流量穩定可預測</td><td><b>佈建容量 + 自動擴展</b>，可再購買預留容量</td></tr>
<tr><td>DynamoDB 流量不可預測或很低</td><td><b>隨需容量</b></td></tr>
<tr><td>DynamoDB 很少存取的資料表</td><td>Standard-IA 資料表類別</td></tr>
<tr><td>讀取量大造成資料庫需要升級規格</td><td>加 ElastiCache 或唯讀複本，可能比升級主資料庫便宜</td></tr>
<tr><td>商業授權費用高</td><td>從 Oracle／SQL Server 遷移到 Aurora PostgreSQL 或 MySQL（用 DMS 與 SCT）</td></tr>
</table>` },
    { id: 'govern', title: '成本管理與治理工具', html: `
<table>
<tr><th>工具</th><th>用途</th></tr>
<tr><td><b>AWS Cost Explorer</b></td><td>分析與預測費用，提供 Savings Plans 與 RI 購買建議及使用率、涵蓋率報告</td></tr>
<tr><td><b>AWS Budgets</b></td><td>成本、用量、RI／SP 使用率與涵蓋率預算；超過門檻時通知，<b>Budgets Actions</b> 可自動套用 IAM 政策或 SCP、停止 EC2／RDS</td></tr>
<tr><td><b>Cost and Usage Report（CUR）／Data Exports</b></td><td>最詳細的費用明細，匯出到 S3，以 Athena 或 QuickSight 分析</td></tr>
<tr><td><b>成本分配標籤</b></td><td>以標籤（例如 Project、Team）分攤費用；需在帳單主控台啟用</td></tr>
<tr><td><b>Cost Anomaly Detection</b></td><td>以機器學習偵測費用異常</td></tr>
<tr><td><b>Trusted Advisor</b></td><td>找出閒置資源、未充分使用的 EC2、未連接的 EBS、閒置負載平衡器</td></tr>
<tr><td><b>Compute Optimizer</b></td><td>精確配置建議</td></tr>
<tr><td><b>Organizations 合併帳單</b></td><td>彙總用量取得量價折扣，RI 與 Savings Plans 在帳戶間共享</td></tr>
<tr><td><b>SCP 與標籤政策</b></td><td>禁止啟動昂貴的執行個體類型、強制資源加上成本標籤</td></tr>
</table>
<div class="box exam"><b class="t">考點</b>「開發帳戶費用超過預算時，自動禁止再建立新的 EC2」→ <b>AWS Budgets Actions</b>（套用 SCP 或 IAM 政策）。「依專案分析費用」→ 啟用<b>成本分配標籤</b>，在 Cost Explorer 依標籤分組。</div>
<div class="box tip"><b class="t">實務連結</b>雲端成本管理（FinOps）是台灣企業越來越重視的職能。面試時能說出「Gateway 端點省 NAT 費」「gp2 改 gp3」「Savings Plans 涵蓋率」這類具體做法，會比只說「我考過 SAA」更有說服力。</div>` }
  ],
  keypoints: [
    '傳入免費；同 AZ 私有 IP 免費；跨 AZ、跨區域、傳出網際網路都收費',
    'NAT 閘道依處理資料量收費；S3 與 DynamoDB 流量改走免費的 Gateway 端點',
    '每個 AZ 使用自己的 NAT 閘道，避免跨 AZ 費用',
    'CloudFront 降低傳出費用，S3 到 CloudFront 的傳輸免費',
    '穩定資料庫買預留執行個體；變動大用 Aurora Serverless v2；DynamoDB 不可預測流量用隨需',
    'Budgets Actions 可在超支時自動套用政策或停止資源',
    '成本分配標籤分攤費用；CUR 最詳細；Cost Explorer 提供 SP/RI 建議'
  ]
}
);
