/* AWS SAA 教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-17）
   中文影片優先，其餘採用 AWS 官方頻道與常見備考頻道的英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      { title: '考照經驗分享：如何用一個月準備 AWS SAA 證照', yt: 'obT0vg2H6c8', by: '鄭中嘉' },
      { title: 'AWS SAA-C03 考試指南解析', yt: 'cltiVAq7abM', by: '码农在东京' },
      EN('QS1owB9jM0o', 'ThoughtfulTechy Cloud', 'How Difficult Is AWS Solutions Architect Associate SAA-C03'),
      EN('c3Cn4xYfxJY', 'freeCodeCamp.org', 'AWS Solutions Architect Associate Certification (SAA-C03) – Full Course')
    ],
    chapters: {
      c01: [
        { title: 'IAM 和 EC2 在 AWS 到底是啥意思？從零開始 AWS SAA-C03 證照讀書會', yt: 'mj-SLttphoU', by: '水球軟體學院' },
        EN('PC6a-5VzrRw', 'Digital Cloud Training', 'IAM Policy Evaluation Logic | AWS IAM'),
        EN('UOWx-dy9Q9c', 'Cloud Bart', 'IAM AssumeRole Basics - 1-minute IAM'),
        EN('MiPItT74ZLs', 'CodeLucky', 'Service Control Policies (SCPs) Explained'),
        EN('KXZQUKgsHj8', 'AWS Bites', 'Cognito User Pools vs. Identity Pools')
      ],
      c02: [
        EN('TUTqYEZZUdc', 'Sam Meech-Ward', 'AWS VPC & Subnets For Beginners'),
        EN('1Ez3DN6s02Y', 'Whizlabs', 'Security Groups vs Network ACLs'),
        EN('jo3X_aay4Vs', 'Be A Better Dev', 'Keep Your Network Traffic in AWS with VPC Endpoints'),
        EN('a55Iud-66q0', 'LearnCantrill', 'A Deep Dive into AWS Transit Gateway'),
        EN('2ipOfnzr2e0', 'ExamPro', 'AWS VPN vs Direct Connect — Which Should You Use?')
      ],
      c03: [
        EN('zSUUBAxjIbk', 'Digital Cloud Training', 'AWS Key Management Service (AWS KMS)'),
        EN('OPCzAwY3Wj4', 'CloudWolf AWS', 'AWS Envelope Encryption Explained'),
        EN('xFzJw6wJ8eY', 'Digital Cloud Training', 'Amazon S3 Access Control - IAM Policies, Bucket Policies and ACLs'),
        EN('ULU2cRQI4hY', 'Cloudmancer', 'Secrets Manager vs Parameter Store: Which Should You Use?'),
        EN('r_4EEClM_j0', 'Unus AWS', 'AWS Security Tools Shield, WAF, GuardDuty, Inspector - How they work')
      ],
      c04: [
        EN('WqJDac1H81I', 'Whizlabs', 'Application Load Balancer vs Network Load Balancer vs Classic Load Balancer'),
        EN('jvMoWjsP7Pk', 'Stephane Maarek', 'AWS Auto Scaling Groups Introduction'),
        EN('KNr3Kq7cah8', 'Tiny Technical Tutorials', 'Create an Auto Scaling Group that Works with an Application Load Balancer')
      ],
      c05: [
        EN('RoKAEzdcr7k', 'Be A Better Dev', 'AWS SQS vs SNS vs EventBridge - When to Use What?'),
        EN('_gpOHGnoq_o', 'Pythoholic', 'AWS SQS | Visibility Timeout | Dead Letter Queue | Long Polling'),
        EN('CEj0yyubNgQ', 'Amazon Web Services', 'Back to Basics: Building Fan-Out Serverless Architectures Using SNS, SQS and Lambda'),
        EN('pG1BQV4VceU', "Jayendra's Vlog", 'Amazon Kinesis Data Streams vs Kinesis Data Firehose'),
        EN('zCIpWFYDJ8s', 'Be A Better Dev', 'What are AWS Step Functions?'),
        EN('DVrGXjjkpig', 'Be A Better Dev', 'AWS EC2 on ECS vs Fargate | Whats the Difference?')
      ],
      c06: [
        EN('rD3nBaS3OG4', 'Amazon Web Services', 'RPO and RTO Explained'),
        EN('QSz6pFfHQfg', 'Go Cloud Architects', 'Disaster Recovery in Cloud Computing | Pilot Light | Warm Standby'),
        EN('1gNLsYiaHlg', 'S3CloudHub', 'Route53 Routing Policies | Simple | Weighted | Latency | Geolocated | Failover'),
        EN('Fa8Vf4Y7J_A', 'Amazon Web Services', 'Global tables for inter-Regional replication - Amazon DynamoDB')
      ],
      c07: [
        EN('O5rm3AKjTo8', 'CloudWolf AWS', 'Types of EBS Volumes (AWS)'),
        EN('epP_GU6rnkE', 'CloudWolf AWS', 'AWS Course: FSx Overview'),
        EN('4v08-CzjH1U', 'Amazon Web Services', 'Amazon FSx for Lustre: High-Performance File System'),
        EN('zxlV86Wh7EQ', 'Everything at Cloud', 'AWS Storage Gateway Explained | Types, Use Cases'),
        { title: 'AWS SAA：DataSync、Snowball Edge、Transfer Family、Storage Gateway', yt: 'eYpq9V8Z8qg', by: 'JSCODE' }
      ],
      c08: [
        EN('fW_prKJR79Y', 'BeSA Cloud Academy', 'Multi-AZ vs Read Replicas | Amazon RDS'),
        EN('ZCt3ctVfGIk', 'Stephane Maarek', 'Amazon Aurora Introduction'),
        EN('9deAV0yAkH8', 'Be A Better Dev', 'Improve DynamoDB Performance with DAX'),
        EN('GoNsuTqeMto', 'Amazon Web Services', 'Introduction to Amazon ElastiCache for Redis')
      ],
      c09: [
        EN('rrpREiIAcHE', 'CloudWolf AWS', 'AWS CloudFront Caching Behaviors Explained | Cache Keys, TTL & Origin Shield'),
        EN('Y6Sbn4JP6og', 'Whizlabs', 'AWS Global Accelerator vs Amazon CloudFront'),
        EN('Docl4julOQw', 'Amazon Web Services', 'AWS Global Accelerator - Improve Global Application Availability and Performance'),
        EN('yRIY7BJohfo', 'Digital Cloud Training', 'DNS with AWS Route 53')
      ],
      c10: [
        EN('duFHe5IU2gk', 'AWS with Jaymit', 'AWS Analytics Services Explained | Redshift, Athena, Glue, Kinesis & QuickSight'),
        EN('Wkpl66NaqEA', 'Tiny Technical Tutorials', 'Amazon Athena Explained: Querying S3 Data'),
        EN('sMpOFaVwBvU', 'CloudWolf AWS', 'Lake Formation for AWS Explained'),
        EN('9oh-vA6QOuU', 'Educative', 'Amazon Bedrock vs. SageMaker')
      ],
      c11: [
        EN('-t148tYgnJU', 'Tiny Technical Tutorials', 'Amazon/AWS EC2 Pricing Simply Explained | On-Demand, Spot, Reserved, Savings Plans'),
        EN('juCUwETXv0I', 'TheCloudsGuru', 'What is AWS Compute Optimizer?'),
        EN('MaLVbCLmoZM', 'Amazon Web Services', 'Optimizing costs with S3 Intelligent-Tiering - Demo'),
        EN('RNQFrkUZ2wg', 'Will Brock', 'AWS EBS gp3 volume types | 20% savings over gp2')
      ],
      c12: [
        EN('hq4KtPRezus', 'Amazon Web Services', 'How can I reduce data transfer charges for my NAT gateway?'),
        EN('YpmUwaqKT9E', 'Cloudperceptor', 'AWS Data Transfer Costs Explained: Complete Breakdown with Visual Guide'),
        EN('oE8TNKGmc40', 'Amazon Web Services', 'AWS Cost Optimisation Series: Cost Explorer')
      ]
    }
  };
})();
