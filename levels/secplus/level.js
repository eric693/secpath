/* CompTIA Security+ 課程設定 */
window.LEVEL = {
  id: 'secplus',
  name: 'Security+',
  title: 'CompTIA Security+',
  overline: 'CompTIA Security+ SY0-701',
  site: ['CompTIA 官網', 'https://www.comptia.org/certifications/security'],
  headline: 'CompTIA Security+<br>備考課程',
  lead: '依 SY0-701 五大領域編寫的 12 章中文講義，關鍵名詞全部附上英文原文，搭配 Professor Messer 官方對應影片、情境題庫與 90 分鐘計時模擬考，也是邁向 SOC 分析師的第一步。',
  subjects: {
    1: { name: '第一部分', title: '概念、威脅與架構（Domain 1–3）' },
    2: { name: '第二部分', title: '維運與治理（Domain 4–5）' }
  },
  examInfo: [
    ['考試代碼', 'SY0-701（英文版考到 2027/6/11）'],
    ['題數時間', '最多 90 題，90 分鐘'],
    ['題型', '單選、複選與實作模擬題（PBQ）'],
    ['通過標準', '750 分（滿分 900）'],
    ['考試語言', '英文、日文、葡萄牙文、西班牙文、泰文'],
    ['報名費', '約 US$439，透過 Pearson VUE 報名'],
    ['證照效期', '3 年，可透過 CE 學分展延']
  ],
  examNote: 'CompTIA 預計 2026 年 11 月推出新版 SY0-801，SY0-701 取得的證照效期不受影響。費用與日期請以 CompTIA 官網為準。',
  readyNote: '正式考試約需答對八成以上，建議綜合模擬考穩定在 80 分以上再報名。',
  mixLabel: '完整考試範圍（Domain 1–5）',
  exam: { full: { n: 90, min: 90 }, quick: { n: 30, min: 30 } },
  plan: [
    ['第 1 週', '第 1～2 章：資安基本概念、密碼學與 PKI（Domain 1）'],
    ['第 2 週', '第 3～4 章：威脅來源、社交工程、漏洞與攻擊指標（Domain 2）'],
    ['第 3 週', '第 5～6 章：安全架構、網路設備、資料保護與韌性（Domain 3），完成第一部分模擬考'],
    ['第 4 週', '第 7～9 章：強化、弱點管理、SOC 監控、身分管理（Domain 4）'],
    ['第 5 週', '第 10～12 章：事件應變、鑑識、風險治理與稽核（Domain 4–5），完成第二部分模擬考'],
    ['第 6 週', '綜合模擬考（90 題）至少三次，清空錯題本，複習英文名詞記憶卡']
  ],
  mnemonics: [
    ['控制類別', 'Technical、Managerial、Operational、Physical'],
    ['控制類型', 'Preventive、Deterrent、Detective、Corrective、Compensating、Directive'],
    ['CIA + 不可否認', '機密性、完整性、可用性；數位簽章提供不可否認性'],
    ['AAA', 'Authentication 驗證你是誰、Authorization 決定能做什麼、Accounting 記錄做了什麼'],
    ['加密金鑰用法', '加密用對方公鑰；簽章用自己私鑰'],
    ['資料三狀態', 'At rest 靜態、In transit 傳輸中、In use 使用中'],
    ['事件應變流程', 'Preparation → Detection → Analysis → Containment → Eradication → Recovery → Lessons learned'],
    ['揮發順序', 'CPU 暫存器與快取 → 記憶體 → 暫存檔 → 磁碟 → 遠端日誌 → 備份'],
    ['風險處理', 'Transfer 轉移、Accept 接受、Avoid 避免、Mitigate 降低'],
    ['風險公式', 'SLE = AV × EF；ALE = SLE × ARO'],
    ['滲透測試環境', 'Known 白箱、Partially known 灰箱、Unknown 黑箱'],
    ['資料角色', 'Owner 負責分類、Custodian 負責保管、Controller 決定目的、Processor 代為處理'],
    ['身分驗證因子', 'Something you know、have、are、somewhere you are'],
    ['無線安全', 'WPA3 使用 SAE，取代 WPA2 的 PSK'],
    ['電子郵件驗證', 'SPF 授權寄件伺服器、DKIM 簽章、DMARC 決定失敗時的處置']
  ],
  numbers: [
    ['90 / 90', '最多 90 題、考試 90 分鐘'],
    ['750 / 900', '通過分數與滿分'],
    ['12 / 22 / 18 / 28 / 20', 'Domain 1～5 配分比例（%）'],
    ['3 年', '證照效期，需 60 個 CE 學分展延'],
    ['22 / 23', 'SSH／SFTP 與 Telnet'],
    ['53', 'DNS'],
    ['389 / 636', 'LDAP 與 LDAPS'],
    ['443', 'HTTPS'],
    ['514 / 6514', 'Syslog 與 Syslog over TLS'],
    ['1812 / 1813', 'RADIUS 驗證與計費'],
    ['3389', 'RDP 遠端桌面'],
    ['49', 'TACACS+'],
    ['4624 / 4625', 'Windows 登入成功與失敗事件'],
    ['RAID 1 / 5 / 6 / 10', '鏡像、單同位、雙同位、鏡像加條帶'],
    ['9.0–10.0', 'CVSS Critical 等級']
  ],
  checklist: [
    '在 Pearson VUE 完成報名，確認考場或線上監考環境',
    '綜合模擬考（90 題）穩定在 80 分以上',
    '能用英文辨識名詞記憶卡中的所有縮寫',
    '熟記常見埠號與安全協定的對應',
    '能分辨各類攻擊與對應的攻擊指標（IoC）',
    '熟悉事件應變各階段與數位鑑識的揮發順序',
    '能計算 SLE、ALE，並分辨 RTO、RPO、MTTR、MTBF',
    '考試時先跳過實作模擬題（PBQ），把單選題做完再回頭作答'
  ],
  tools: [['ports', 'c06'], ['hash', 'c02'], ['caesar', 'c02'], ['base64', 'c02'], ['pw', 'c09'], ['cvss', 'c07'], ['ale', 'c11'], ['matrix', 'c11'], ['backup', 'c06']]
};
