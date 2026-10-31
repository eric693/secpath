/* Kubernetes 容器編排課程設定（原創教學課程，以 kubectl 與 YAML 宣告式設定為主，涵蓋 CKA／CKAD 常見觀念） */
window.LEVEL = {
  id: 'k8s',
  name: 'Kubernetes',
  title: 'Kubernetes 容器編排：從 Pod、Deployment 到正式環境維運',
  overline: '雲端與 DevOps 進階必備・kubectl × YAML × 自動擴展 × Helm',
  site: ['Kubernetes 官方文件', 'https://kubernetes.io/docs/home/'],
  headline: 'Kubernetes 容器編排<br>從 Pod、Deployment 到正式環境維運',
  lead: '會用 Docker 之後，下一個問題是：容器當掉誰來重啟？流量變大怎麼自動加機器？更新版本怎麼不停機？Kubernetes 是目前雲端原生應用最主流的答案。10 章講義以部署一個「待辦事項 API 與資料庫」貫穿，從叢集架構與 kubectl 開始，學會 Pod、Deployment、Service、ConfigMap 與 Secret，再進入儲存、資源與排程、健康檢查與自動擴展、RBAC 與網路政策，最後用 Helm、GitOps 與監控維運正式環境，並學會排除常見故障。控制迴圈、滾動更新、排程與自動擴展都有可在網頁上執行的模擬程式，並搭配控制迴圈模擬、排程模擬、HPA 計算機與 Pod 故障排除等互動工具。',
  subjects: {
    1: { name: '核心概念篇', title: '叢集架構、Pod、Deployment、Service、設定與機密' },
    2: { name: '正式環境篇', title: '儲存、資源排程、健康檢查與擴展、安全、Helm 與維運' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '學習完成清單', terms: 'K8s 名詞', mnemonics: '重點口訣', numbers: '指令速查',
    sprintLead: '部署應用或準備 CKA／CKAD 前隨時查閱：重點口訣、常用 kubectl 指令與各章重點。',
    examTip: '<b class="t">測驗說明</b>綜合測驗以 Kubernetes 觀念、YAML 判讀、kubectl 指令與故障排除情境為主。CKA、CKAD 是在真實叢集上操作的實作考試，本課程的選擇題用來檢驗觀念，仍需要自己動手練習。',
    videoNote: 'Kubernetes 每年發布約三個版本，影片中的指令輸出可能和最新版本不同'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並能在本機的 kind 或 minikube 叢集上，用 YAML 部署一個包含 Deployment、Service、ConfigMap、Secret、健康檢查與 HPA 的應用，完成一次滾動更新與回滾，並能用 kubectl describe 與 logs 找出 Pod 失敗的原因。',
  examInfo: [
    ['課程定位', '會 Docker、想進入雲端原生與 DevOps 的工程師，以及準備 CKA、CKAD 的人'],
    ['使用環境', '本機的 kind、minikube 或 Docker Desktop 內建叢集；觀念同樣適用 EKS、GKE、AKS'],
    ['先備知識', 'Linux 指令、Docker 容器與映像檔的基本操作（建議先完成「DevOps 入門」）'],
    ['學習時間', '講義約 9 小時，另加在本機叢集動手練習'],
    ['完成能力', '能撰寫 Kubernetes 資源設定、部署與更新應用、設定擴展與安全，並排除常見故障'],
    ['銜接課程', 'DevOps 入門、Linux、AWS Solutions Architect、Node.js 後端']
  ],
  examNote: '講義依 2026 年 Kubernetes 穩定版的 API 撰寫（apps/v1、autoscaling/v2、networking.k8s.io/v1 等）。CKA、CKAD 由 Linux Foundation 與 CNCF 辦理，考試範圍、時間與及格分數以官方公告為準。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：Kubernetes 架構與本機叢集、Pod 與 kubectl、Deployment 與滾動更新'],
    ['第 2 週', '第 4～5 章：Service 與網路、ConfigMap 與 Secret，完成核心概念篇測驗'],
    ['第 3 週', '第 6～8 章：儲存與有狀態服務、資源與排程、健康檢查與自動擴展'],
    ['第 4 週', '第 9～10 章：安全、Helm、GitOps 與維運，完成正式環境篇測驗'],
    ['之後', '把自己的 Node.js 或 Python 應用容器化，部署到雲端的 Kubernetes 服務']
  ],
  mnemonics: [
    ['宣告期望狀態', '寫下想要什麼，控制器負責讓實際狀態追上'],
    ['Pod 是最小單位', '一個 Pod 可以有多個容器，共用網路與儲存'],
    ['不要直接建 Pod', '用 Deployment 管理，壞掉才會自動補'],
    ['標籤串起一切', 'Deployment、Service 都靠 selector 找到 Pod'],
    ['Service 給固定入口', 'Pod IP 會變，Service 名稱不變'],
    ['Secret 只是 Base64', '不是加密，要搭配 RBAC 與靜態加密'],
    ['requests 排程、limits 上限', '記憶體超過上限被 OOMKilled，CPU 超過被節流'],
    ['三種探針', 'startup 啟動中、readiness 接流量、liveness 要重啟'],
    ['HPA 公式', '期望副本 ＝ 無條件進位（目前副本 × 目前值 ÷ 目標值）'],
    ['最小權限', 'RBAC 只給需要的動詞與資源'],
    ['除錯三步', 'get → describe → logs（--previous）'],
    ['設定進 Git', 'YAML 版本控制，GitOps 自動同步']
  ],
  numbers: [
    ['kubectl apply -f app.yaml', '依檔案建立或更新資源'],
    ['kubectl get pods -o wide', '列出 Pod 與所在節點、IP'],
    ['kubectl describe pod NAME', '查看詳細狀態與事件'],
    ['kubectl logs NAME --previous', '查看上一次（崩潰前）容器的日誌'],
    ['kubectl exec -it NAME -- sh', '進入容器執行指令'],
    ['kubectl rollout status／undo', '查看滾動更新進度／回滾'],
    ['kubectl scale deploy NAME --replicas=5', '手動調整副本數'],
    ['kubectl port-forward svc/NAME 8080:80', '把服務轉到本機連接埠'],
    ['kubectl get events --sort-by=.lastTimestamp', '依時間查看叢集事件'],
    ['kubectl top pods', '查看資源使用量（需要 metrics-server）'],
    ['kubectl config use-context NAME', '切換叢集'],
    ['kubectl explain deployment.spec', '查詢欄位說明']
  ],
  checklist: [
    '能說明 Kubernetes 解決的問題，以及控制平面與工作節點的元件',
    '能建立本機叢集並使用 kubectl 查詢與操作資源',
    '能撰寫 Pod 與 Deployment 的 YAML，並用標籤與選擇器關聯資源',
    '能執行滾動更新、查看歷史與回滾',
    '能用 Service 暴露應用，說明 ClusterIP、NodePort、LoadBalancer 與叢集內 DNS',
    '能用 Ingress 或 Gateway API 設定 HTTP 路由',
    '能用 ConfigMap 與 Secret 注入設定，並說明 Secret 的限制',
    '能使用 PersistentVolumeClaim 與 StatefulSet 部署資料庫，並用 Job／CronJob 執行批次工作',
    '能設定 requests、limits 並說明排程、QoS 與 taint／toleration',
    '能設定三種探針與 HPA，並計算擴展後的副本數',
    '能用 RBAC、ServiceAccount、Pod 安全標準與 NetworkPolicy 加強安全',
    '能用 Helm 部署應用、說明 GitOps，並排除 CrashLoopBackOff、ImagePullBackOff、Pending 等故障'
  ],
  tools: [['reconcile', 'c03'], ['scheduler', 'c07'], ['hpa', 'c08'], ['podstatus', 'c10']]
};
