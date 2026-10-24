/* AWS Certified Solutions Architect – Associate（SAA-C03）課程設定 */
window.LEVEL = {
  id: 'aws-saa',
  name: 'AWS SAA',
  title: 'AWS Solutions Architect Associate',
  overline: 'AWS Certified Solutions Architect – Associate SAA-C03',
  site: ['AWS 認證官網', 'https://aws.amazon.com/tw/certification/certified-solutions-architect-associate/'],
  headline: 'AWS Solutions Architect<br>Associate 備考課程',
  lead: '依 SAA-C03 四大領域編寫的 12 章中文講義，以「情境 → 選出最佳架構」為主軸，涵蓋 IAM 進階、VPC 網路設計、資料保護、高可用與解耦、災難復原、高效能儲存與資料庫、成本最佳化。搭配架構比較表、逐章教學影片、情境題庫與 130 分鐘計時模擬考，對應台灣雲端工程師與架構師職缺最常要求的證照。',
  subjects: {
    1: { name: '第一部分', title: '安全與韌性架構（Domain 1–2）' },
    2: { name: '第二部分', title: '高效能與成本最佳化架構（Domain 3–4）' }
  },
  examInfo: [
    ['考試代碼', 'SAA-C03'],
    ['題數時間', '65 題（50 題計分、15 題不計分），130 分鐘'],
    ['題型', '單選題與複選題，以情境題為主'],
    ['通過標準', '720 分（滿分 1,000）'],
    ['考試語言', '含繁體中文、英文、日文、韓文等'],
    ['報名費', 'US$150，透過 Pearson VUE 報名（考場或線上監考）'],
    ['證照效期', '3 年']
  ],
  examNote: '建議具備一年以上 AWS 實作經驗。持有 Cloud Practitioner 等 AWS 認證可使用五折券。AWS 會不定期改版考試，報名前請到官網確認目前版本、費用與語言。',
  readyNote: '正式考試以情境題為主、選項都「看起來可行」，建議綜合模擬考穩定在 80 分以上再報名。',
  mixLabel: '完整考試範圍（Domain 1–4）',
  exam: { full: { n: 65, min: 130 }, quick: { n: 30, min: 60 } },
  plan: [
    ['第 1 週', '第 1～2 章：考試導覽、IAM 進階與多帳戶、VPC 網路安全設計'],
    ['第 2 週', '第 3～4 章：資料保護與安全服務、ELB 與 Auto Scaling 高可用架構'],
    ['第 3 週', '第 5～6 章：解耦與無伺服器架構、災難復原策略，完成第一部分模擬考'],
    ['第 4 週', '第 7～9 章：高效能儲存、資料庫與快取、網路與內容傳遞'],
    ['第 5 週', '第 10～12 章：資料分析架構、運算與儲存成本最佳化、網路與資料庫成本，完成第二部分模擬考'],
    ['第 6 週', '綜合模擬考（65 題・130 分鐘）至少三次，整理錯題中的關鍵字與服務對照表']
  ],
  mnemonics: [
    ['四大領域', '安全 30%、韌性 26%、高效能 24%、成本 20%'],
    ['政策評估', '明確 Deny ＞ 明確 Allow ＞ 隱含 Deny；SCP 與權限邊界只設上限、不授權'],
    ['SG 與 NACL', 'SG 有狀態只允許、可引用其他 SG；NACL 無狀態可拒絕、需開放短暫埠'],
    ['VPC 端點', 'Gateway 端點只支援 S3 與 DynamoDB 且免費；其他服務用 Interface 端點（PrivateLink）'],
    ['Multi-AZ vs 唯讀複本', 'Multi-AZ 同步複寫、為了高可用；唯讀複本非同步、為了分擔讀取'],
    ['DR 四策略', 'Backup & Restore → Pilot Light → Warm Standby → Multi-site；越右越貴、RTO/RPO 越短'],
    ['SQS 兩種佇列', 'Standard 至少一次、順序不保證、吞吐量高；FIFO 剛好一次、保證順序'],
    ['Kinesis 兩兄弟', 'Data Streams 即時、自訂消費者、可重播；Firehose 近即時、免管理、直接送進 S3/Redshift'],
    ['ELB 選擇', 'ALB 看 HTTP 路徑主機；NLB 要固定 IP 與極低延遲；GWLB 串第三方防火牆'],
    ['EBS 選擇', 'gp3 一般用途；io2 高 IOPS 資料庫；st1 大量循序讀取；sc1 冷資料最便宜'],
    ['快取選擇', 'Redis 有複寫、持久化、排序集合；Memcached 多執行緒、純快取；DynamoDB 專用 DAX'],
    ['邊緣加速', 'CloudFront 快取 HTTP 內容；Global Accelerator 固定 Anycast IP、TCP/UDP、快速容錯'],
    ['省 NAT 費用', 'S3 與 DynamoDB 流量改走 Gateway 端點，不經過 NAT 閘道'],
    ['加密金鑰', 'SSE-S3 最簡單；SSE-KMS 可稽核與控管金鑰；SSE-C 客戶自帶金鑰；CloudHSM 專屬硬體']
  ],
  numbers: [
    ['65 / 130', '65 題、考試 130 分鐘'],
    ['720 / 1000', '通過分數與滿分'],
    ['30 / 26 / 24 / 20', 'Domain 1～4 配分比例（%）'],
    ['/16 ～ /28', 'VPC 與子網路 CIDR 的大小範圍'],
    ['5 個', '每個子網路 AWS 保留的 IP 數'],
    ['15 分鐘', 'Lambda 單次執行上限'],
    ['4 天 / 14 天', 'SQS 訊息預設與最長保留期'],
    ['30 秒 / 12 小時', 'SQS 可見性逾時預設值與上限'],
    ['3,500 / 5,500', 'S3 每個前綴每秒 PUT 與 GET 請求數'],
    ['15 個', 'Aurora 唯讀複本上限'],
    ['6 份 / 3 AZ', 'Aurora 儲存層的資料副本'],
    ['400 KB', 'DynamoDB 單一項目大小上限'],
    ['3,000 IOPS', 'gp3 的基準 IOPS（與容量無關）'],
    ['24 小時 ～ 365 天', 'Kinesis Data Streams 資料保留期'],
    ['30 / 90 / 180 天', 'S3 IA、Glacier、Deep Archive 最短計費天數']
  ],
  checklist: [
    '在 Pearson VUE 完成報名，確認考場或線上監考環境（可選繁體中文考試）',
    '綜合模擬考（65 題・130 分鐘）穩定在 80 分以上',
    '能說明 IAM 政策評估邏輯、SCP、權限邊界與跨帳戶角色',
    '能畫出含公有／私有子網路、NAT 閘道、VPC 端點的多 AZ 架構',
    '能分辨 RDS Multi-AZ、唯讀複本、Aurora Global Database、DynamoDB 全域表',
    '能依 RTO／RPO 選出對的災難復原策略',
    '能依情境選出 SQS、SNS、EventBridge、Kinesis',
    '能依存取模式選出 S3 儲存類別與 EBS 磁碟區類型',
    '題目出現「最具成本效益」「營運負擔最少」時，優先考慮託管與無伺服器服務'
  ],
  tools: [['cidr', 'c02'], ['ports', 'c02'], ['nines', 'c06'], ['s3class', 'c11'], ['pricing', 'c11']]
};
