/* DevOps 入門課程設定（原創教學課程，非證照課程） */
window.LEVEL = {
  id: 'devops',
  name: 'DevOps',
  title: 'DevOps 入門：Docker、CI/CD 與雲端部署',
  overline: 'DevOps 入門・容器 × 自動化 × 維運',
  site: ['Docker 官方文件', 'https://docs.docker.com/'],
  headline: 'DevOps 入門<br>Docker、CI/CD 與雲端部署',
  lead: '把程式從「在我電腦上可以跑」變成「每次推送都自動測試、自動部署、出問題馬上知道」。10 章講義涵蓋 Docker 與 Dockerfile、Docker Compose、GitHub Actions、部署策略、Kubernetes、Terraform 基礎架構即程式碼，以及監控、日誌與 DevSecOps。建議先完成 Git 與 Linux 課程。',
  subjects: {
    1: { name: '容器篇', title: 'Docker 與容器化' },
    2: { name: '部署篇', title: 'CI/CD、雲端與維運' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '實作完成清單', terms: 'DevOps 常用名詞', mnemonics: '重點口訣', numbers: '常用指令速查',
    sprintLead: '動手做專案時隨時查閱：重點口訣、常用指令與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以情境題與指令、設定檔判讀為主，檢查你能不能在實務情境中選對做法。',
    videoNote: '指令與設定以各工具官方文件為準'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並完成一個推送後自動測試、建置映像並部署的專案。',
  examInfo: [
    ['課程定位', '實作入門課程，適合想往後端、雲端、SRE 發展的開發者與維運人員'],
    ['先備知識', '建議先完成本站的 Git 與 Linux 課程，具備基本命令列操作能力'],
    ['使用工具', 'Docker、Docker Compose、GitHub Actions、Kubernetes、Terraform'],
    ['練習環境', '在自己的電腦安裝 Docker Desktop（或 Linux 上的 Docker Engine）'],
    ['學習時間', '講義約 8 小時，另加實作時間'],
    ['銜接課程', 'AWS Cloud Practitioner／Solutions Architect、Linux 系統管理']
  ],
  examNote: 'DevOps 工具更新快速，課程以觀念與通用做法為主；指令與設定檔的細節（版本號、Action 版本、雲端服務選項）請以各官方文件為準。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：DevOps 概念、Docker 基礎、Dockerfile，把自己的程式容器化'],
    ['第 2 週', '第 4～5 章：Docker Compose、容器網路與除錯，完成容器篇測驗'],
    ['第 3 週', '第 6～7 章：GitHub Actions CI/CD、部署策略與雲端部署'],
    ['第 4 週', '第 8～10 章：Kubernetes、Terraform、監控與 DevSecOps，完成部署篇測驗'],
    ['之後', '把作品集專案加上 Dockerfile 與 CI/CD，部署到雲端並設定監控']
  ],
  mnemonics: [
    ['DevOps 目標', '更快、更頻繁、更穩定地交付軟體，出問題能快速恢復'],
    ['映像與容器', '映像是唯讀的範本（類別），容器是執行中的實例（物件）'],
    ['層快取順序', '不常變的放前面（裝套件），常變的放後面（複製程式碼）'],
    ['映像要小', '用 slim／alpine 基底、多階段建置、.dockerignore、清除快取'],
    ['資料要外掛', '容器刪除資料就消失，需要保留的資料用 volume'],
    ['CI 與 CD', 'CI 每次推送自動建置測試；CD 自動部署到環境'],
    ['密碼放 secrets', 'GitHub Actions 用 Secrets，Kubernetes 用 Secret，絕不寫進程式碼或映像'],
    ['部署要能回滾', '藍綠、滾動、金絲雀部署；保留上一版映像隨時切回'],
    ['IaC 三步', 'terraform plan 先看變更 → apply 套用 → state 記錄現況'],
    ['可觀測三支柱', '指標 Metrics、日誌 Logs、追蹤 Traces']
  ],
  numbers: [
    ['docker run -d -p 8080:80 --name web nginx', '背景執行容器並對應埠號'],
    ['docker ps / docker ps -a', '列出執行中／所有容器'],
    ['docker logs -f 容器', '持續查看容器日誌'],
    ['docker exec -it 容器 sh', '進入容器執行指令'],
    ['docker build -t app:1.0 .', '依目前資料夾的 Dockerfile 建置映像'],
    ['docker compose up -d / down', '啟動／停止整組服務'],
    ['docker system prune', '清除停止的容器、未使用的網路與懸空映像'],
    ['on: push / pull_request', 'GitHub Actions 觸發條件'],
    ['${{ secrets.NAME }}', 'GitHub Actions 讀取機密'],
    ['kubectl get pods', '列出 Pod'],
    ['kubectl apply -f deploy.yaml', '套用 Kubernetes 設定'],
    ['kubectl rollout undo deployment/app', '回滾到上一個版本'],
    ['terraform init / plan / apply', 'Terraform 初始化、預覽、套用'],
    ['SLO 99.9%', '每月約可停機 43.8 分鐘（錯誤預算）']
  ],
  checklist: [
    '在自己的電腦安裝 Docker，成功執行 nginx 容器並在瀏覽器開啟',
    '為自己的 Python 或 Node.js 程式寫 Dockerfile，並善用層快取',
    '用多階段建置或 slim 基底讓映像小於 200 MB',
    '用 Docker Compose 同時啟動網頁服務與資料庫，資料存在 volume',
    '設定 GitHub Actions，在每次 Pull Request 自動執行測試',
    '設定推送到 main 時自動建置並推送映像到容器登錄庫',
    '把服務部署到雲端或 VPS，並設定 HTTPS',
    '能用 kubectl 部署一個 Deployment 與 Service，並練習回滾',
    '用 Terraform 建立並刪除一個雲端資源',
    '為服務設定健康檢查、日誌與告警，並寫下事件處理步驟'
  ],
  tools: [['dockercache', 'c03'], ['cron', 'c06'], ['nines', 'c10'], ['semver', 'c06']]
};
