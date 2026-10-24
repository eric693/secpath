/* AWS Certified Cloud Practitioner（CLF-C02）課程設定 */
window.LEVEL = {
  id: 'aws-clf',
  name: 'AWS CLF',
  title: 'AWS Cloud Practitioner',
  overline: 'AWS Certified Cloud Practitioner CLF-C02',
  site: ['AWS 認證官網', 'https://aws.amazon.com/tw/certification/certified-cloud-practitioner/'],
  headline: 'AWS Cloud Practitioner<br>備考課程',
  lead: '依 CLF-C02 四大領域編寫的 10 章中文講義，從雲端概念、全球基礎設施、共同責任模型、IAM，到運算、儲存、網路、AI 服務與計費支援。服務名稱全部附上英文原文，搭配逐章教學影片、情境題庫與 90 分鐘計時模擬考，是進入雲端職涯的第一張證照。',
  subjects: {
    1: { name: '第一部分', title: '雲端概念與安全合規（Domain 1–2）' },
    2: { name: '第二部分', title: '雲端技術服務與計費（Domain 3–4）' }
  },
  examInfo: [
    ['考試代碼', 'CLF-C02'],
    ['題數時間', '65 題（50 題計分、15 題不計分），90 分鐘'],
    ['題型', '單選題與複選題'],
    ['通過標準', '700 分（滿分 1,000）'],
    ['考試語言', '含繁體中文、英文、日文、韓文等'],
    ['報名費', 'US$100，透過 Pearson VUE 報名（考場或線上監考）'],
    ['證照效期', '3 年']
  ],
  examNote: '通過任一 AWS 認證可取得下一次考試五折券，可用於報考 Solutions Architect Associate。考試版本、費用與語言請以 AWS 官網為準。',
  readyNote: '正式考試採量尺計分，建議綜合模擬考穩定在 80 分以上再報名。',
  mixLabel: '完整考試範圍（Domain 1–4）',
  exam: { full: { n: 65, min: 90 }, quick: { n: 30, min: 40 } },
  plan: [
    ['第 1 週', '第 1～2 章：雲端運算概念、六大優勢、全球基礎設施、Well-Architected 與 CAF（Domain 1）'],
    ['第 2 週', '第 3～5 章：共同責任模型、安全服務、IAM、監控稽核與治理（Domain 2），完成第一部分模擬考'],
    ['第 3 週', '第 6～7 章：部署方式、運算服務、儲存與資料庫（Domain 3）'],
    ['第 4 週', '第 8～9 章：網路與內容傳遞、分析、AI/ML、應用整合與遷移服務（Domain 3）'],
    ['第 5 週', '第 10 章：計價模式、成本管理工具與支援方案（Domain 4），完成第二部分模擬考'],
    ['第 6 週', '綜合模擬考（65 題）至少三次，清空錯題本，複習服務名稱記憶卡']
  ],
  mnemonics: [
    ['雲端六大優勢', '變動成本取代固定成本、規模經濟、不用猜容量、速度與敏捷、不用維運機房、幾分鐘走向全球'],
    ['Well-Architected 六支柱', '卓越營運、安全、可靠性、效能效率、成本最佳化、永續性'],
    ['CAF 六視角', '業務、人員、治理（偏業務面）；平台、安全、營運（偏技術面）'],
    ['遷移 7R', 'Retire、Retain、Rehost、Relocate、Repurchase、Replatform、Refactor'],
    ['共同責任', 'AWS 負責「雲端本身的安全」（Of the cloud）；客戶負責「雲端內的安全」（In the cloud）'],
    ['服務模型', 'IaaS 管 OS 以上；PaaS 只管程式與資料；SaaS 只管使用與資料'],
    ['誰記錄什麼', 'CloudTrail 記錄「誰呼叫了 API」；CloudWatch 監控「效能指標」；Config 記錄「設定變更」'],
    ['SG 與 NACL', 'Security Group 在執行個體層、有狀態、只能允許；NACL 在子網路層、無狀態、可允許可拒絕'],
    ['計價模式', '隨需最彈性、Savings Plans／RI 承諾換折扣、Spot 最便宜但會被中斷、Dedicated Host 處理授權'],
    ['成本工具', 'Pricing Calculator 事前估算、Cost Explorer 分析與預測、Budgets 超支告警、CUR 最詳細明細'],
    ['支援方案', 'Basic → Developer → Business → Enterprise On-Ramp → Enterprise；Enterprise 才有專屬 TAM'],
    ['資安三劍客', 'GuardDuty 偵測威脅、Inspector 掃描弱點、Macie 找出 S3 中的敏感個資'],
    ['DDoS 防護', 'Shield Standard 免費自動啟用；Shield Advanced 付費並提供 SRT 應變團隊'],
    ['資料庫選擇', '關聯式用 RDS／Aurora；鍵值 NoSQL 用 DynamoDB；資料倉儲用 Redshift；快取用 ElastiCache']
  ],
  numbers: [
    ['65 / 90', '65 題、考試 90 分鐘'],
    ['700 / 1000', '通過分數與滿分'],
    ['24 / 30 / 34 / 12', 'Domain 1～4 配分比例（%）'],
    ['3 年', '證照效期'],
    ['3 個以上', '一般區域內的可用區域（AZ）數量'],
    ['11 個 9', 'S3 的資料耐久性 99.999999999%'],
    ['15 分鐘', 'Lambda 單次執行的最長時間'],
    ['最高約 72%', 'Savings Plans／預留執行個體相對隨需的折扣'],
    ['最高約 90%', 'Spot 執行個體相對隨需的折扣'],
    ['2 分鐘', 'Spot 執行個體被中斷前的通知時間'],
    ['1 或 3 年', 'Savings Plans 與預留執行個體的承諾期間'],
    ['5 個', '每個子網路 AWS 保留的 IP 數量'],
    ['30 / 90 / 180 天', 'S3 Standard-IA、Glacier、Deep Archive 的最短計費天數'],
    ['< 15 分鐘', 'Enterprise 支援方案「業務關鍵系統停擺」的回應時間']
  ],
  checklist: [
    '在 Pearson VUE 完成報名，確認考場或線上監考環境（可選繁體中文考試）',
    '綜合模擬考（65 題）穩定在 80 分以上',
    '能說出雲端六大優勢與 Well-Architected 六支柱',
    '能判斷共同責任模型中每項工作屬於 AWS 還是客戶',
    '能分辨 CloudTrail、CloudWatch、Config、Trusted Advisor 的用途',
    '能依情境選出對的運算、儲存、資料庫服務',
    '熟記四種計價模式與成本管理工具的差別',
    '熟記五種支援方案的差異（TAM、回應時間、Trusted Advisor 檢查範圍）',
    '複選題會註明要選幾個，作答前看清楚題目要求'
  ],
  tools: [['nines', 'c02'], ['s3class', 'c07'], ['cidr', 'c08'], ['pricing', 'c10'], ['ports', 'c08']]
};
