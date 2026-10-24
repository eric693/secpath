/* DevOps 入門教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-24）
   中文影片優先，部分主題搭配常見教學頻道的英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('GcMqHnSDyc4', '上班了啊哈', 'DevOps 到底是什麼？開工第一堂課'),
      V('2BRioIP79SA', '上班了啊哈', 'Docker 實作全集：25 分鐘一次學會 Docker'),
      V('C4CAZ0U_8LY', '矽谷叔叔 Uncle Sam', 'Kubernetes（K8S）是什麼？')
    ],
    chapters: {
      c01: [
        V('GcMqHnSDyc4', '上班了啊哈', 'DevOps 到底是什麼？開工第一堂課'),
        V('eOlI6-BBN4E', '上班了啊哈', 'CI/CD 到底是什麼？'),
        V('b77i9_v0iC8', 'Coding Neutrino', '拯救資工系學生的基本素養：CI/CD 介紹')
      ],
      c02: [
        V('2BRioIP79SA', '上班了啊哈', 'Docker 實作全集：25 分鐘一次學會 Docker'),
        V('mPquwpxyUQU', 'Ross Ning', 'Docker 10 分鐘快速入門'),
        V('Ozb9mZg7MVM', 'GeekHour', '30 分鐘 Docker 入門教程')
      ],
      c03: [
        V('swH7hI61MtY', '上班了啊哈', 'Dockerfile 每一行到底在幹嘛？5 分鐘打包第一個專案'),
        V('_-IPi1a774E', '技術爬爬蝦 TechShrimp', '40 分鐘的 Docker 實戰攻略')
      ],
      c04: [
        V('C_o0j0CdEe4', 'DC Chen', '學會使用 Docker Compose，三分鐘上手'),
        V('zcAx0ViWMA8', '言成AI', 'Docker 教程：一小時搞懂容器、Compose')
      ],
      c05: [
        EN('p2PH_YPCsis', 'TechWorld with Nana', 'Docker Volumes explained in 6 minutes'),
        EN('bKFMS5C4CG0', 'NetworkChuck', 'Docker networking is CRAZY!! (you NEED to learn it)')
      ],
      c06: [
        V('a-EiC_Ll3EM', '沈弘哲', 'GitHub Actions 教學 part1'),
        V('kuRhHaumEtE', 'Yenlin Chen', '帶著走的 CI/CD：GitHub Actions'),
        V('v1EHTplmJe4', '技術蛋老師', 'GitHub Actions 工作流自動化的入門核心')
      ],
      c07: [
        V('-oVO6RJa2fM', 'iPAS自學路', '模型上線後怎麼穩定維運？藍綠部署與 Canary Release'),
        EN('23EghFNQdj4', 'Telusko', 'What is Blue Green Deployment?')
      ],
      c08: [
        V('C4CAZ0U_8LY', '矽谷叔叔 Uncle Sam', 'Kubernetes（K8S）是什麼？'),
        V('irf95K4N-1g', '矽谷叔叔 Uncle Sam', 'Kubernetes 解決了什麼問題？四大功用'),
        V('ubz3cFgxeJA', 'Ross Ning', 'Kubernetes 十分鐘快速入門')
      ],
      c09: [
        V('wst6w09Cz-8', '李姓分析Victor', 'Terraform 101：5 分鐘搞懂什麼是 Terraform'),
        V('0Sgd_q0SMOc', 'Alex Hsieh 相談室', 'Terraform 從零開始：介紹與安裝'),
        V('diudEs7d3d0', 'Alex Hsieh 相談室', 'Terraform 從零開始：workflow 工作流程')
      ],
      c10: [
        V('DIjF3Q7ch5U', 'ITdog', '使用 Prometheus 整合 Grafana 監控系統'),
        EN('nrhxNNH5lt0', 'TechWorld with Nana', 'What is DevSecOps? DevSecOps explained in 8 Mins')
      ]
    }
  };
})();
