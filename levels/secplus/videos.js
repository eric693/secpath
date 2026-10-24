/* Security+ 教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-15）
   各章主要採用 Professor Messer 的 SY0-701 免費官方對應課程（英文），標題末尾數字為考試目標編號。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const PM = (yt, title) => ({ title, yt, by: 'Professor Messer', lang: 'en' });
  window.VIDEOS = {
    review: [
      { title: '課程總覽：CompTIA Security+ 國際網路資安認證', yt: 'd2pP7fd8rnA', by: '窩課360' },
      { title: '資訊安全簡介：CompTIA Security+ 資訊安全概論篇', yt: 'LHpdV1QGtFo', by: '窩課360' },
      { title: '我是如何用三週的時間自學通過 Security+ 考試的？', yt: '5RWqNY17TEA', by: '明昆网络' },
      { title: '資安維運中心 SOC 分析師工作的一天', yt: 'hnjTWbgnWz4', by: '系統架構故事館' },
      PM('KiEptGbnEBc', 'How to Pass Your SY0-701 Security+ Exam in 2026')
    ],
    chapters: {
      c01: [
        PM('STM3EUvL7wg', 'Security Controls - 1.1'),
        PM('SBcDGb9l6yo', 'The CIA Triad - 1.2'),
        PM('XxnCxPEllMg', 'Non-repudiation - 1.2'),
        PM('AhaZtj5P2a8', 'Authentication, Authorization, and Accounting - 1.2'),
        PM('cuTVyyS5C7M', 'Gap Analysis - 1.2'),
        PM('zC_Pndpg8-c', 'Zero Trust - 1.2'),
        PM('YtT8q2mUM9c', 'Physical Security - 1.2'),
        PM('X_qfMVty4ts', 'Deception and Disruption - 1.2'),
        PM('48wRbMdHFVI', 'Change Management - 1.3'),
        PM('H9TYNjcpl-0', 'Technical Change Management - 1.3')
      ],
      c02: [
        PM('xHAMEF7-inQ', 'Public Key Infrastructure - 1.4'),
        PM('jpsc4c7lntw', 'Encrypting Data - 1.4'),
        PM('U6BWn81P5Ec', 'Key Exchange - 1.4'),
        PM('u61J0xR_XPU', 'Encryption Technologies - 1.4'),
        PM('LfuTMzZke4g', 'Obfuscation - 1.4'),
        PM('EcGmQjl6XEo', 'Hashing and Digital Signatures - 1.4'),
        PM('-wqU_2ToP1M', 'Blockchain Technology - 1.4'),
        PM('cLa94BZH_9s', 'Certificates - 1.4')
      ],
      c03: [
        PM('6xUH0t6ugIM', 'Threat Actors - 2.1'),
        PM('4lAbGpTDZ18', 'Common Threat Vectors - 2.2'),
        PM('9SD6DRCKZFU', 'Phishing - 2.2'),
        PM('X3yoNAVuKwA', 'Impersonation - 2.2'),
        PM('z413PV6l_Ys', 'Watering Hole Attacks - 2.2'),
        PM('akoDmeV3LQo', 'Other Social Engineering Attacks - 2.2')
      ],
      c04: [
        PM('kBcTczu8FsM', 'Memory Injections - 2.3'),
        PM('0-qeeI5jTqU', 'Buffer Overflows - 2.3'),
        PM('MKptc1lPSw8', 'Race Conditions - 2.3'),
        PM('qFUOLkEk8AQ', 'SQL Injection - 2.3'),
        PM('PKgw0CLZIhE', 'Cross-site Scripting - 2.3'),
        PM('V2DCYO-sWRQ', 'Cloud-specific Vulnerabilities - 2.3'),
        PM('WqvCJLpwExY', 'Supply Chain Vulnerabilities - 2.3'),
        PM('FDFxGLnZtoY', 'Zero-day Vulnerabilities - 2.3'),
        PM('-eZs8wjjGGE', 'An Overview of Malware - 2.4'),
        PM('nu27ovJ5rqw', 'Other Malware Types - 2.4'),
        PM('Z7OntvK--PQ', 'Denial of Service - 2.4'),
        PM('BoxeL5ybOXI', 'DNS Attacks - 2.4'),
        PM('tSLqrKhUvts', 'Wireless Attacks - 2.4'),
        PM('M_Af6_8JTuo', 'On-path Attacks - 2.4'),
        PM('yRSqIGjeb7s', 'Application Attacks - 2.4'),
        PM('7aJaEQy6Yoc', 'Cryptographic Attacks - 2.4'),
        PM('-ZfbifHwEVE', 'Password Attacks - 2.4'),
        PM('x72hG9GvkaQ', 'Indicators of Compromise - 2.4')
      ],
      c05: [
        PM('yDeDGCh_PDs', 'Segmentation and Access Control - 2.5'),
        PM('Fc8ZJfmapbI', 'Mitigation Techniques - 2.5'),
        PM('wXoC46Qr_9Q', 'Hardening Techniques - 2.5'),
        PM('8qpQ8Q6xxiU', 'Cloud Infrastructures - 3.1'),
        PM('jd001Hj7XWM', 'Network Infrastructure Concepts - 3.1'),
        PM('HDiNPPrGhzE', 'Other Infrastructure Concepts - 3.1'),
        PM('Ap3Z_0ZdqpQ', 'Infrastructure Considerations - 3.1')
      ],
      c06: [
        PM('l64La1xYXL4', 'Secure Infrastructures - 3.2'),
        PM('7QuYupuic3Q', 'Intrusion Prevention - 3.2'),
        PM('WlOslEy3ztg', 'Network Appliances - 3.2'),
        PM('QhLQ6J4satw', 'Port Security - 3.2'),
        PM('mq1HRM-zGtQ', 'Firewall Types - 3.2'),
        PM('uU3e_ntg-3g', 'Secure Communication - 3.2'),
        PM('R0W0_gZCVzk', 'Data Types and Classifications - 3.3'),
        PM('71RQaYQ4QSw', 'States of Data - 3.3'),
        PM('leX_Qa7wqB4', 'Protecting Data - 3.3'),
        PM('sb0dRaQbuBA', 'Resiliency - 3.4'),
        PM('IhT7Odu4xHc', 'Recovery Testing - 3.4'),
        PM('8mGSwRScqIM', 'Backups - 3.4'),
        PM('-EY45MimSBM', 'Power Resiliency - 3.4')
      ],
      c07: [
        PM('BWPJD9Eb9iE', 'Secure Baselines - 4.1'),
        PM('YQKbs0ug0XQ', 'Hardening Targets - 4.1'),
        PM('iAR6SgvtezY', 'Securing Wireless and Mobile - 4.1'),
        PM('KaqKoKNEKnE', 'Wireless Security Settings - 4.1'),
        PM('fFvXy3WkLpA', 'Application Security - 4.1'),
        PM('BJ2UMB4a04g', 'Asset Management - 4.2'),
        PM('9B0mtWk_AM0', 'Vulnerability Scanning - 4.3'),
        PM('86fruE9jkKk', 'Threat Intelligence - 4.3'),
        PM('eyVy1gKCuAU', 'Analyzing Vulnerabilities - 4.3'),
        PM('P9xakfmX70c', 'Vulnerability Remediation - 4.3')
      ],
      c08: [
        { title: 'What Is SIEM?', yt: '9RfsRn7m7OE', by: 'IBM Technology', lang: 'en' },
        PM('np2WI_rM-Ok', 'Security Monitoring - 4.4'),
        PM('nNiNTviiacU', 'Security Tools - 4.4'),
        PM('VgNyh4HEqSU', 'Firewalls - 4.5'),
        PM('I_c0D49uCwQ', 'Web Filtering - 4.5'),
        PM('4dpTyRM6BU8', 'Operating System Security - 4.5'),
        PM('9NAKCyOtFH0', 'Secure Protocols - 4.5'),
        PM('v6ht9efsnRI', 'Email Security - 4.5'),
        PM('ZDJ-BLPLWq4', 'Monitoring Data - 4.5'),
        PM('83pCkSSj1IQ', 'Endpoint Security - 4.5')
      ],
      c09: [
        PM('ZoOyyqhptik', 'Identity and Access Management - 4.6'),
        PM('9ANHcZwJfdQ', 'Access Controls - 4.6'),
        PM('MpIzA4fNWew', 'Multifactor Authentication - 4.6'),
        PM('eMOe-PLBy1k', 'Password Security - 4.6'),
        PM('R9ojg881dLs', 'Scripting and Automation - 4.7')
      ],
      c10: [
        PM('X2UiMLxRdhE', 'Incident Response - 4.8'),
        PM('CYFe16lCRMk', 'Incident Planning - 4.8'),
        PM('UtDWApdO8Zk', 'Digital Forensics - 4.8'),
        PM('EDru1LTYDJw', 'Log Data - 4.9')
      ],
      c11: [
        PM('5kY9kvzeWjA', 'Security Policies - 5.1'),
        PM('jBvdRpXaomk', 'Security Standards - 5.1'),
        PM('vJINnOZyQNg', 'Security Procedures - 5.1'),
        PM('gxNi-04yP8Q', 'Data Roles and Responsibilities - 5.1'),
        PM('cLhUMoQS1a8', 'Risk Management - 5.2'),
        PM('Ykx7t54y-oo', 'Risk Analysis - 5.2'),
        PM('myI-v3mj7Kc', 'Business Impact Analysis - 5.2')
      ],
      c12: [
        PM('13KNjPexnEI', 'Third-party Risk Assessment - 5.3'),
        PM('HSZxjj1YAh8', 'Agreement Types - 5.3'),
        PM('IjJf4jLtONQ', 'Compliance - 5.4'),
        PM('WGXrbAh0LUI', 'Privacy - 5.4'),
        PM('uo2Yw720mv4', 'Audits and Assessments - 5.5'),
        PM('wEMzVfwBiWY', 'Penetration Tests - 5.5'),
        PM('-LevHAzXgFs', 'Penetration Testing - 4.3'),
        PM('WQRZMMLUkGE', 'User Training - 5.6')
      ]
    }
  };
})();
