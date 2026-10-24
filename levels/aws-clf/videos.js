/* AWS Cloud Practitioner 教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-17）
   中文影片優先，其餘採用 AWS 官方頻道與常見備考頻道的英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      { title: 'AWS 雲從業者認證速通：0 基礎帶你入門雲端運算（課程介紹）', yt: 'bFu1vABeRZA', by: '吕蕴偲 Kevin LYU' },
      EN('roi905rA8Zw', 'Cram Exam', 'Pass AWS Cloud Practitioner in 100 Minutes (Full Course CLF-C02)'),
      EN('7HKot-brXFE', 'freeCodeCamp.org', 'AWS Certified Cloud Practitioner Certification Course 2026 (CLF-C02)'),
      EN('DuOHJJ46A8I', 'AWS Developers', 'AWS Cloud Practitioner in 2026: Is It Worth It?')
    ],
    chapters: {
      c01: [
        { title: '雲端服務怎麼選？一次分清 IaaS、PaaS 與 SaaS', yt: '1IhwmLaVyKk', by: '數位通國際 eASPNet Taiwan' },
        { title: 'IaaS、PaaS 是什麼？新手雲端主機怎麼選', yt: 'Gj27EIv5Xhk', by: '六角學院' },
        EN('36zducUX16w', 'Ecourse Review', 'Cloud Computing Services Models - IaaS PaaS SaaS Explained'),
        EN('ZzI9JE0i6Lc', 'Fireship', 'AWS for the Haters in 100 Seconds')
      ],
      c02: [
        { title: 'AWS 證照教學零基礎入門篇：Region、AZ、Edge Locations 介紹', yt: 'bi9q9JKizaU', by: 'AWS零基礎入門小教室' },
        EN('0hlZvybbaGk', 'Digital Cloud Training', 'AWS Global Infrastructure Overview - Regions, Availability Zones, Edge Locations'),
        EN('5odtVlORq_w', 'Be A Better Dev', '6 Pillars of the AWS Well Architected Framework'),
        EN('WuL_MueH4Xk', 'CloudWolf AWS', 'AWS Cloud Adoption Framework (CAF) Full Breakdown')
      ],
      c03: [
        EN('o13js0hIO_o', 'Amazon Web Services', 'Simplify the AWS Shared Responsibility Model'),
        EN('iODPCcQEPto', 'Digital Cloud Training', 'AWS Shared Responsibility Model'),
        EN('r_4EEClM_j0', 'Unus AWS', 'AWS Security Tools Shield, WAF, GuardDuty, Inspector - How they work'),
        EN('8Z0wsE2HoSo', 'Amazon Web Services', 'What is AWS Key Management Service?')
      ],
      c04: [
        EN('_ZCTvmaPgao', 'Be A Better Dev', 'AWS IAM Core Concepts You NEED to Know'),
        EN('PjKvwxTTSUk', 'Digital Cloud Training', 'Overview of Users, Groups, Roles and Policies | AWS IAM'),
        EN('sCdn-p_b4WI', 'Cloud4DevOps', 'AWS Organizations SCPs vs IAM Policies'),
        EN('EAWWTjjQWz8', 'Master AWS with Yan', 'What is Amazon Cognito? User Pool vs Identity Pool Explained')
      ],
      c05: [
        EN('S5X0PnBwp9I', 'Be A Better Dev', 'AWS CloudWatch vs CloudTrail - Whats the Difference?'),
        EN('D_rvCse6lAY', 'AngelofVerdant', 'CloudWatch, CloudTrail, AWS Config: Know the Difference'),
        EN('uEIrFbesvP8', 'Amazon Web Services', 'AWS Trusted Advisor'),
        EN('mHIba-3Cedo', 'Everything at Cloud', 'AWS Health Dashboard and Trusted Advisor Explained')
      ],
      c06: [
        { title: '3 分鐘搞懂 AWS：CLI 與 SDK', yt: 'K-UQrn0zY9g', by: 'Paul Chen' },
        EN('t48aVpw6kkI', 'Amazon Web Services', 'What is Amazon EC2?'),
        EN('rcWgcFMlwFw', 'Digital Cloud Training', 'AWS EC2 Auto Scaling - How it Works'),
        EN('qlkr0h9JQ6U', 'Amazon Web Services', 'AWS Lambda explained in 90 seconds'),
        EN('AYAh6YDXuho', 'TechWorld with Nana', 'Containers on AWS Overview: ECS | EKS | Fargate | ECR')
      ],
      c07: [
        EN('77lMCiiMilo', 'Amazon Web Services', 'Introduction to Amazon Simple Storage Service (S3)'),
        EN('w5ocEIDR5WE', 'Amazon Web Services', 'Amazon S3 Storage Classes: Optimized storage for your workload needs'),
        EN('_CN7KqC3y3s', 'Cloud Simplified', 'AWS Storage: EBS vs. S3 vs. EFS'),
        EN('b2nqgUiLgvw', 'Cloudiofy', 'AWS RDS vs. DynamoDB: Choosing the Right Database'),
        EN('l7IpsIzMa6E', 'Amazon Web Services', 'What is Amazon Aurora | Animated Explainer')
      ],
      c08: [
        EN('7_NNlnH7sAg', 'Tiny Technical Tutorials', 'Amazon/AWS VPC (Virtual Private Cloud) Basics'),
        EN('JWoNu2Mtpdg', 'Tiny Technical Tutorials', 'Security Groups vs. Network Access Control Lists (NACLs) in AWS'),
        EN('A_1pXqChn3s', 'Digital Cloud Training', 'Hybrid Cloud with AWS VPN and AWS Direct Connect'),
        EN('AT-nHW3_SVI', 'Amazon Web Services', 'Introduction to Amazon CloudFront'),
        EN('RGWgfhZByAI', 'Amazon Web Services', 'Amazon Route 53')
      ],
      c09: [
        EN('duFHe5IU2gk', 'AWS with Jaymit', 'AWS Analytics Services Explained | Redshift, Athena, Glue, Kinesis & QuickSight'),
        EN('_vdK5PgcNvc', 'Amazon Web Services', 'Introducing Amazon Bedrock'),
        EN('9oh-vA6QOuU', 'Educative', 'Amazon Bedrock vs. SageMaker'),
        EN('RoKAEzdcr7k', 'Be A Better Dev', 'AWS SQS vs SNS vs EventBridge - When to Use What?'),
        EN('wdJ5DN15jus', 'Amazon Web Services', 'AWS Step Functions explained in 90 seconds')
      ],
      c10: [
        EN('-t148tYgnJU', 'Tiny Technical Tutorials', 'Amazon/AWS EC2 Pricing Simply Explained | On-Demand, Spot, Reserved, Savings Plans'),
        EN('oE8TNKGmc40', 'Amazon Web Services', 'AWS Cost Optimisation Series: Cost Explorer'),
        EN('QT9dyU8BWcY', 'Jon Myer Show', 'AWS Cost Savings Series: Cost Explorer and Budgets'),
        EN('gkkcM37m5Zc', 'CloudWolf AWS', 'AWS Support Plans [Everything You Need To Know]')
      ]
    }
  };
})();
