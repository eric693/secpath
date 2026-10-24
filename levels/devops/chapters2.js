/* DevOps 入門 部署篇：CI/CD、雲端與維運 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c06', subject: 2, minutes: 50,
  title: 'CI/CD 與 GitHub Actions',
  summary: 'GitHub Actions 的組成、workflow YAML 語法、觸發條件、在 PR 自動執行測試、矩陣與快取、Secrets 與權限、建置並推送 Docker 映像，以及寫好 CI 的原則。',
  sections: [
    { id: 'concept', title: 'GitHub Actions 的組成', html: `
<p><b>GitHub Actions</b> 是 GitHub 內建的 CI／CD 服務：在儲存庫的 <code>.github/workflows/</code> 資料夾放入 YAML 檔，發生指定事件（推送、PR、排程）時自動執行。</p>
<div class="concepts">
  <div class="concept"><b>Workflow 工作流程</b><span>一個 YAML 檔，定義何時觸發、要做哪些事。</span></div>
  <div class="concept"><b>Event 事件</b><span>觸發條件，例如 push、pull_request、schedule、手動觸發 workflow_dispatch。</span></div>
  <div class="concept"><b>Job 工作</b><span>在同一台執行環境中依序執行的一組步驟；多個 job 預設平行執行。</span></div>
  <div class="concept"><b>Step 步驟</b><span>執行一個指令（run）或使用一個現成的 Action（uses）。</span></div>
  <div class="concept"><b>Runner 執行器</b><span>執行 job 的虛擬機，例如 ubuntu-latest，也可以自架。</span></div>
  <div class="concept"><b>Action</b><span>可重複使用的步驟，例如 actions/checkout 下載程式碼。</span></div>
</div>` },
    { id: 'test', title: '在 Pull Request 自動測試', html: `
<pre class="out"># .github/workflows/ci.yml
name: CI

on:
  pull_request:                 # 每個 PR 都執行
  push:
    branches: [main]            # 推送到 main 時也執行

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4             # 下載程式碼
      - uses: actions/setup-python@v5         # 安裝 Python
        with:
          python-version: "3.12"
          cache: pip                          # 快取套件，加快下次執行
      - run: pip install -r requirements.txt
      - run: ruff check .                     # 程式碼風格與常見錯誤檢查
      - run: pytest -q                        # 執行測試</pre>
<p>推送後到 GitHub 的「Actions」分頁就能看到執行過程與日誌。搭配第 7 章（Git 課程）的保護分支規則，設定「CI 通過才能合併」，壞掉的程式碼就進不了 main。</p>
<div class="box tip"><b class="t">Action 的版本</b>範例中的 <code>@v4</code>、<code>@v5</code> 是 Action 的版本，請以各 Action 官方頁面的最新主要版本為準。重視供應鏈安全的團隊，會把第三方 Action 固定到完整的提交編號。</div>` },
    { id: 'syntax', title: '觸發條件、矩陣與條件', html: `
<pre class="out">on:
  push:
    branches: [main]
    paths: ["src/**", "requirements.txt"]   # 只有這些檔案改變才觸發
  schedule:
    - cron: "0 1 * * *"                     # 每天 UTC 01:00（台灣時間 09:00）
  workflow_dispatch:                        # 允許在網頁上手動觸發

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.11", "3.12", "3.13"]   # 同時在三個版本測試
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: \${{ matrix.python-version }}
      - run: pytest -q

  deploy:
    needs: test                              # test 成功後才執行
    if: github.ref == 'refs/heads/main'      # 只有 main 分支才部署
    runs-on: ubuntu-latest
    steps:
      - run: echo "部署中…"</pre>
<div class="box warn"><b class="t">排程用的是 UTC 時間</b>GitHub Actions 的 cron 以 UTC 計算，台灣時間要減 8 小時。到「互動練習 → cron 表示式解讀」可以確認排程的執行時間。</div>` },
    { id: 'secrets', title: 'Secrets 與權限', html: `
<p>部署需要的金鑰、密碼，存放在儲存庫的 <b>Settings → Secrets and variables → Actions</b>，在 workflow 中以 <code>\${{ secrets.名稱 }}</code> 讀取。日誌中出現時會自動遮蔽。</p>
<pre class="out">      - name: 部署
        env:
          API_TOKEN: \${{ secrets.DEPLOY_TOKEN }}
        run: ./deploy.sh</pre>
<table>
<tr><th>安全原則</th><th>做法</th></tr>
<tr><td>金鑰不寫進程式碼與 workflow 檔</td><td>一律使用 Secrets</td></tr>
<tr><td>最小權限</td><td>在 workflow 設定 <code>permissions</code>，只給需要的權限（例如 contents: read）</td></tr>
<tr><td>避免長期金鑰</td><td>部署到 AWS 等雲端時，使用 OIDC 取得臨時憑證，不必存放長期的存取金鑰</td></tr>
<tr><td>小心來自 Fork 的 PR</td><td>外部貢獻者的 PR 預設拿不到 Secrets，不要為了方便放寬限制</td></tr>
<tr><td>環境保護</td><td>用 Environments 為正式環境設定需人工核准才能部署</td></tr>
</table>` },
    { id: 'docker', title: '建置並推送 Docker 映像', html: `
<pre class="out"># .github/workflows/release.yml
name: Build and Push

on:
  push:
    branches: [main]
    tags: ["v*"]

permissions:
  contents: read
  packages: write                            # 推送到 GitHub Container Registry 需要

jobs:
  image:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/metadata-action@v5      # 依分支、標籤、提交編號產生映像標籤
        id: meta
        with:
          images: ghcr.io/\${{ github.repository }}
      - uses: docker/build-push-action@v6
        with:
          push: true
          tags: \${{ steps.meta.outputs.tags }}</pre>
<h3>寫好 CI 的原則</h3>
<ul>
  <li><b>快</b>：CI 超過 10 分鐘大家就不想等。善用快取、只跑受影響的測試、平行執行。</li>
  <li><b>穩定</b>：時好時壞的測試（Flaky Test）會讓大家忽略 CI 結果，要優先修好。</li>
  <li><b>失敗訊息清楚</b>：一看日誌就知道哪裡出錯。</li>
  <li><b>和本機一致</b>：本機也能用同樣的指令執行測試。</li>
</ul>
<div class="box memo"><b class="t">動手做</b>為你的 GitHub 專案加上 CI：每個 PR 自動執行 lint 與測試，main 設定保護規則要求 CI 通過；再加上推送標籤時自動建置並推送 Docker 映像。</div>` }
  ],
  keypoints: [
    'GitHub Actions 的 workflow 放在 .github/workflows/，由事件觸發',
    'workflow → jobs → steps；step 用 run 執行指令或 uses 使用現成 Action',
    '常用觸發：push、pull_request、schedule（cron 為 UTC）、workflow_dispatch',
    'matrix 同時在多個版本測試；needs 設定 job 順序；if 設定執行條件',
    '金鑰放 Secrets，以 ${{ secrets.名稱 }} 讀取；workflow 權限給最小',
    '部署到雲端建議用 OIDC 臨時憑證取代長期存取金鑰',
    'CI 要快、穩定、訊息清楚，並與本機執行方式一致'
  ]
},
{
  id: 'c07', subject: 2, minutes: 45,
  title: '部署策略與雲端部署',
  summary: '部署環境的分層、常見部署方式（VPS、PaaS、容器服務、無伺服器）、反向代理與 HTTPS、滾動、藍綠與金絲雀部署、回滾與資料庫遷移，以及環境設定管理。',
  sections: [
    { id: 'env', title: '部署環境', html: `
<table>
<tr><th>環境</th><th>用途</th></tr>
<tr><td><b>開發</b> Development</td><td>開發者自己的電腦，通常用 Docker Compose</td></tr>
<tr><td><b>測試／預備</b> Staging</td><td>盡量和正式環境一樣，上線前最後驗證</td></tr>
<tr><td><b>正式</b> Production</td><td>真實使用者使用的環境</td></tr>
</table>
<p>好的做法是<b>同一個映像</b>依序部署到各環境，只靠環境變數與設定區分，確保「測試通過的就是上線的那一版」。</p>` },
    { id: 'options', title: '常見部署方式', html: `
<table>
<tr><th>方式</th><th>例子</th><th>優點</th><th>缺點</th></tr>
<tr><td><b>虛擬主機 + Docker Compose</b></td><td>雲端 VM、VPS</td><td>簡單、便宜、完全掌控</td><td>主機修補、備份、擴展都要自己處理</td></tr>
<tr><td><b>PaaS 平台</b></td><td>Render、Fly.io、Heroku、AWS App Runner</td><td>推送程式碼或映像就能上線，幾乎不用管伺服器</td><td>彈性較低，規模大時可能較貴</td></tr>
<tr><td><b>託管容器服務</b></td><td>AWS ECS／Fargate、Google Cloud Run、Azure Container Apps</td><td>自動擴展、與雲端服務整合好</td><td>需要學習雲端服務設定</td></tr>
<tr><td><b>Kubernetes</b></td><td>EKS、GKE、AKS、自建</td><td>功能完整、適合大量服務</td><td>複雜度與維運成本高（第 8 章）</td></tr>
<tr><td><b>無伺服器</b></td><td>AWS Lambda、Cloud Functions</td><td>依請求計費、免管伺服器</td><td>執行時間限制、冷啟動</td></tr>
</table>
<div class="box tip"><b class="t">從簡單的開始</b>個人作品或小型專案，用 PaaS 或一台 VM 加 Docker Compose 就很夠用。服務數量與流量真的成長後，再考慮託管容器服務或 Kubernetes。AWS 相關服務的選擇可以參考本站的 AWS 課程。</div>` },
    { id: 'proxy', title: '反向代理與 HTTPS', html: `
<p>正式環境通常會在應用程式前面放一個<b>反向代理（Reverse Proxy）</b>，例如 Nginx、Caddy、Traefik，或雲端的負載平衡器：</p>
<div class="flow">
  <div><b>使用者</b><span>https://shop.example.com</span></div>
  <div><b>反向代理</b><span>處理 HTTPS、壓縮、快取<br>把請求轉給後端</span></div>
  <div><b>應用程式容器</b><span>只在內部網路監聽 8000</span></div>
</div>
<pre class="out"># Nginx 設定片段
server {
    listen 443 ssl;
    server_name shop.example.com;
    ssl_certificate     /etc/letsencrypt/live/shop.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/shop.example.com/privkey.pem;

    location / {
        proxy_pass http://web:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}</pre>
<p><b>Let's Encrypt</b> 提供免費的 SSL／TLS 憑證，可以用 Certbot 自動申請與續約；Caddy 則會自動處理憑證。雲端的負載平衡器通常搭配各自的憑證服務（例如 AWS Certificate Manager）。</p>` },
    { id: 'strategy', title: '部署策略', html: `
<table>
<tr><th>策略</th><th>做法</th><th>優點</th><th>注意</th></tr>
<tr><td><b>重建</b> Recreate</td><td>停掉舊版，再啟動新版</td><td>最簡單</td><td>會有短暫停機</td></tr>
<tr><td><b>滾動更新</b> Rolling</td><td>逐台把舊版替換成新版</td><td>不停機、不需額外資源</td><td>過程中新舊版並存</td></tr>
<tr><td><b>藍綠部署</b> Blue-Green</td><td>準備一整套新環境（綠），測試後把流量一次切過去，舊環境（藍）保留</td><td>切換與回滾都很快</td><td>需要兩倍資源</td></tr>
<tr><td><b>金絲雀部署</b> Canary</td><td>先讓少部分（例如 5%）使用者使用新版，觀察沒問題再逐步擴大</td><td>出問題影響範圍小</td><td>需要流量控制與監控</td></tr>
</table>
<div class="box exam"><b class="t">一定要能回滾</b>不論哪種策略，都要能快速回到上一版：保留上一版的映像標籤、記錄每次部署的版本，必要時一個指令切回。也可以搭配功能開關，有問題時先關閉新功能。</div>
<h3>資料庫遷移</h3>
<p>程式新版可能需要修改資料表結構。使用遷移工具（例如 Alembic、Django migrations、Flyway）管理變更，並遵守<b>向下相容</b>原則：先新增欄位、讓新舊版程式都能運作，確認無誤後再移除舊欄位。這樣部署過程中新舊版並存、或需要回滾時才不會出錯。</p>` },
    { id: 'config', title: '環境設定與健康檢查', html: `
<ul>
  <li><b>設定放環境變數</b>：資料庫位址、外部服務網址、功能開關，依環境注入。</li>
  <li><b>機密放機密管理服務</b>：AWS Secrets Manager、GCP Secret Manager、HashiCorp Vault、Kubernetes Secret，不放進映像或 Git。</li>
  <li><b>健康檢查端點</b>：應用程式提供 <code>/health</code>，負載平衡器與容器平台據此判斷是否把流量送過來、是否要重啟。</li>
  <li><b>部署後驗證</b>：自動執行冒煙測試（Smoke Test），確認首頁、登入、主要 API 正常。</li>
</ul>
<pre class="py"># 簡單的健康檢查與冒煙測試概念（以模擬的回應示範）
def check(name, status, latency_ms, limit=500):
    ok = status == 200 and latency_ms &lt;= limit
    print(f"{'✅' if ok else '❌'} {name:&lt;8} 狀態 {status}　延遲 {latency_ms} ms")
    return ok

results = [check('/health', 200, 35), check('/', 200, 180), check('/login', 200, 220), check('/api/cart', 500, 90)]
print('部署驗證', '通過' if all(results) else '失敗，準備回滾到上一版')</pre>
<div class="box memo"><b class="t">動手做</b>把你的服務部署到一個 PaaS 或雲端 VM，設定網域與 HTTPS、健康檢查端點；練習一次「部署有問題的新版 → 回滾到上一版」。</div>` }
  ],
  keypoints: [
    '環境分為開發、預備、正式；同一個映像依序部署，只靠設定區分',
    '部署方式：VM 加 Compose、PaaS、託管容器服務、Kubernetes、無伺服器，從簡單的開始',
    '反向代理處理 HTTPS 並轉送請求；Let\'s Encrypt 提供免費憑證',
    '滾動更新不停機；藍綠部署切換快但需兩倍資源；金絲雀先給少數使用者',
    '一定要能快速回滾，保留上一版映像與部署紀錄',
    '資料庫遷移遵守向下相容：先新增、確認後再移除',
    '設定放環境變數、機密放機密管理服務、提供健康檢查端點'
  ]
},
{
  id: 'c08', subject: 2, minutes: 50,
  title: 'Kubernetes 入門',
  summary: 'Kubernetes 解決什麼問題、叢集架構、Pod、Deployment、Service、Ingress、ConfigMap 與 Secret、kubectl 常用指令、滾動更新與回滾，以及什麼時候不需要 Kubernetes。',
  sections: [
    { id: 'why', title: 'Kubernetes 解決什麼問題', html: `
<p>容器數量少的時候，Docker Compose 就夠用。當你有數十個服務、上百個容器、多台主機，就會遇到這些問題：容器掛了誰來重啟？流量大了怎麼自動增加容器？新版本怎麼不停機更新？</p>
<p><b>Kubernetes（簡稱 K8s）</b>是容器編排（Orchestration）平台：你用 YAML 描述「想要的狀態」（例如 web 服務要跑 3 個副本），Kubernetes 會持續讓實際狀態符合你的描述。</p>
<table>
<tr><th>功能</th><th>說明</th></tr>
<tr><td>自我修復</td><td>容器或節點故障時自動重啟或移到其他節點</td></tr>
<tr><td>自動擴展</td><td>依 CPU 或流量自動增減副本數</td></tr>
<tr><td>滾動更新與回滾</td><td>逐步替換新版本，有問題一個指令回滾</td></tr>
<tr><td>服務探索與負載平衡</td><td>用固定的名稱存取一組會變動的容器</td></tr>
<tr><td>設定與機密管理</td><td>ConfigMap、Secret 與映像分離</td></tr>
</table>` },
    { id: 'arch', title: '叢集架構', html: `
<div class="concepts">
  <div class="concept"><b>叢集 Cluster</b><span>一組由 Kubernetes 管理的機器。</span></div>
  <div class="concept"><b>控制平面 Control Plane</b><span>叢集的大腦：API Server 接收指令、Scheduler 決定容器放哪台、etcd 儲存叢集狀態。雲端託管服務會幫你管理。</span></div>
  <div class="concept"><b>工作節點 Node</b><span>實際執行容器的機器，上面有 kubelet 負責管理容器。</span></div>
  <div class="concept"><b>命名空間 Namespace</b><span>把叢集切成邏輯分區，例如 dev、staging、prod。</span></div>
</div>
<div class="box tip"><b class="t">練習環境</b>在自己的電腦可以用 Docker Desktop 內建的 Kubernetes、minikube 或 kind 建立單機叢集練習；正式環境多半使用雲端託管服務（AWS EKS、Google GKE、Azure AKS）。</div>` },
    { id: 'objects', title: '核心物件', html: `
<table>
<tr><th>物件</th><th>作用</th><th>比喻</th></tr>
<tr><td><b>Pod</b></td><td>最小的部署單位，包含一個（或多個緊密合作的）容器，共用網路與儲存</td><td>一個工作站</td></tr>
<tr><td><b>Deployment</b></td><td>管理一組相同的 Pod：維持副本數、滾動更新與回滾</td><td>店長，確保隨時有足夠的店員</td></tr>
<tr><td><b>Service</b></td><td>為一組 Pod 提供固定的名稱與 IP，並做負載平衡</td><td>總機號碼，不管誰值班都打得通</td></tr>
<tr><td><b>Ingress</b></td><td>依網域與路徑把外部 HTTP(S) 流量導到不同的 Service</td><td>大樓的櫃台，指引訪客到正確樓層</td></tr>
<tr><td><b>ConfigMap</b></td><td>存放一般設定</td><td>公告欄</td></tr>
<tr><td><b>Secret</b></td><td>存放密碼、金鑰等機密（預設只是 Base64 編碼，需另外啟用加密與權限控管）</td><td>保險箱</td></tr>
</table>
<pre class="out"># deploy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shop-api
spec:
  replicas: 3                                   # 維持 3 個 Pod
  selector:
    matchLabels: { app: shop-api }
  template:
    metadata:
      labels: { app: shop-api }
    spec:
      containers:
        - name: api
          image: ghcr.io/myteam/shop-api:1.4.2
          ports: [{ containerPort: 8000 }]
          envFrom:
            - secretRef: { name: shop-secrets }   # 從 Secret 帶入環境變數
          readinessProbe:                        # 準備好才接收流量
            httpGet: { path: /health, port: 8000 }
          resources:
            requests: { cpu: 100m, memory: 128Mi }
            limits: { memory: 256Mi }
---
apiVersion: v1
kind: Service
metadata:
  name: shop-api
spec:
  selector: { app: shop-api }                    # 把流量送給有這個標籤的 Pod
  ports: [{ port: 80, targetPort: 8000 }]</pre>` },
    { id: 'kubectl', title: 'kubectl 常用指令', html: `
<pre class="out">kubectl apply -f deploy.yaml          # 套用設定（建立或更新）
kubectl get pods                      # 列出 Pod（-n 命名空間、-o wide 顯示更多）
kubectl get deploy,svc                # 列出 Deployment 與 Service
kubectl describe pod shop-api-xxxx    # 詳細資訊與事件，排錯必看
kubectl logs shop-api-xxxx            # 查看日誌（-f 持續追蹤）
kubectl exec -it shop-api-xxxx -- sh  # 進入容器
kubectl scale deploy/shop-api --replicas=5     # 調整副本數

# 更新映像：觸發滾動更新
kubectl set image deploy/shop-api api=ghcr.io/myteam/shop-api:1.5.0
kubectl rollout status deploy/shop-api         # 觀察更新進度
kubectl rollout undo deploy/shop-api           # 有問題，回滾到上一版
kubectl rollout history deploy/shop-api</pre>
<table>
<tr><th>Pod 狀態</th><th>常見原因</th></tr>
<tr><td><code>Pending</code></td><td>沒有足夠資源可以排程，或在等待儲存空間</td></tr>
<tr><td><code>ImagePullBackOff</code></td><td>映像名稱或標籤錯誤、私有登錄庫沒有權限</td></tr>
<tr><td><code>CrashLoopBackOff</code></td><td>容器啟動後一直出錯結束，看 kubectl logs</td></tr>
<tr><td><code>OOMKilled</code></td><td>超過記憶體限制被終止</td></tr>
</table>` },
    { id: 'when', title: '什麼時候不需要 Kubernetes', html: `
<table>
<tr><th>適合 Kubernetes</th><th>不一定需要</th></tr>
<tr><td>數十個以上的服務，需要統一的部署與管理方式</td><td>個人專案、少數幾個服務</td></tr>
<tr><td>有專人或團隊維運平台</td><td>團隊沒有人熟悉 K8s</td></tr>
<tr><td>需要多雲、混合雲的一致性</td><td>流量穩定、規模不大</td></tr>
<tr><td>需要精細的自動擴展與資源調度</td><td>PaaS 或託管容器服務就能滿足需求</td></tr>
</table>
<div class="box warn"><b class="t">複雜度是真實的成本</b>Kubernetes 功能強大，但需要處理網路、儲存、權限、升級、監控等大量細節。很多團隊用 Cloud Run、ECS Fargate、App Runner 等服務就能得到大部分好處，維運負擔小很多。</div>
<div class="box memo"><b class="t">動手做</b>用 kind 或 Docker Desktop 建立本機叢集，部署 3 個副本的服務與 Service；刪除一個 Pod 觀察它自動重建；更新映像後再執行 rollout undo 回滾。</div>` }
  ],
  keypoints: [
    'Kubernetes 是容器編排平台，依你描述的期望狀態持續調整實際狀態',
    '功能：自我修復、自動擴展、滾動更新與回滾、服務探索、設定管理',
    '控制平面負責決策，工作節點執行容器；雲端託管服務代管控制平面',
    'Pod 是最小單位；Deployment 管理副本與更新；Service 提供固定名稱與負載平衡',
    'Ingress 依網域與路徑導流；ConfigMap 放設定、Secret 放機密',
    'kubectl apply、get、describe、logs、rollout undo 是最常用的指令',
    '規模不大時，PaaS 或託管容器服務常比 Kubernetes 更合適'
  ]
},
{
  id: 'c09', subject: 2, minutes: 45,
  title: '基礎架構即程式碼',
  summary: '基礎架構即程式碼的好處、宣告式與命令式、Terraform 的 provider、resource、variable、output、plan 與 apply 流程、狀態檔管理、模組，以及 Ansible 組態管理與 CloudFormation 的比較。',
  sections: [
    { id: 'why', title: '為什麼需要 IaC', html: `
<p>在雲端主控台點來點去建立伺服器、網路、資料庫，很快就會遇到問題：沒人記得當初怎麼設定的、測試環境和正式環境不一樣、要重建一次得花好幾天。</p>
<p><b>基礎架構即程式碼（Infrastructure as Code, IaC）</b>用程式碼描述基礎架構，好處和程式碼一樣：</p>
<ul>
  <li><b>可重複</b>：同一份程式碼建立開發、測試、正式三套一樣的環境。</li>
  <li><b>可審查</b>：放進 Git，透過 Pull Request 審查每一次基礎架構變更。</li>
  <li><b>可追溯</b>：誰在什麼時候改了什麼，Git 歷史都有紀錄。</li>
  <li><b>可復原</b>：災難發生時，用程式碼快速重建整個環境。</li>
</ul>
<table>
<tr><th>方式</th><th>說明</th><th>例子</th></tr>
<tr><td><b>宣告式</b> Declarative</td><td>描述「想要的最終狀態」，工具自己算出要做哪些變更</td><td>Terraform、CloudFormation、Kubernetes YAML</td></tr>
<tr><td><b>命令式</b> Imperative</td><td>描述「要執行哪些步驟」</td><td>Shell 腳本、部分 Ansible 用法</td></tr>
</table>` },
    { id: 'terraform', title: 'Terraform 基礎', html: `
<p><b>Terraform</b> 是最常用的 IaC 工具之一，用 HCL 語言描述資源，透過各家的 <b>provider</b> 支援 AWS、GCP、Azure、Cloudflare、GitHub 等數千種服務。</p>
<pre class="out"># main.tf
terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~&gt; 5.0" }
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  type    = string
  default = "ap-northeast-1"
}

resource "aws_s3_bucket" "reports" {
  bucket = "myteam-reports-2026"
  tags = {
    Project     = "shop"
    Environment = "dev"
  }
}

output "bucket_name" {
  value = aws_s3_bucket.reports.bucket
}</pre>
<table>
<tr><th>區塊</th><th>作用</th></tr>
<tr><td><code>provider</code></td><td>要操作哪個平台與相關設定</td></tr>
<tr><td><code>resource</code></td><td>要建立的資源，格式為 <code>resource "類型" "名稱"</code></td></tr>
<tr><td><code>variable</code></td><td>輸入變數，讓同一份程式碼用於不同環境</td></tr>
<tr><td><code>output</code></td><td>輸出值，例如建立後的網址或 IP</td></tr>
<tr><td><code>data</code></td><td>讀取既有資源的資訊（不建立）</td></tr>
<tr><td><code>module</code></td><td>把一組資源包成可重複使用的模組</td></tr>
</table>
<div class="box tip"><b class="t">授權提醒</b>Terraform 自 1.6 版起改用 BSL 授權，社群另外分支出開源的 <b>OpenTofu</b>，語法與用法幾乎相同。企業選用時可依授權需求評估。</div>` },
    { id: 'workflow', title: 'plan 與 apply 流程', html: `
<div class="flow">
  <div><b>terraform init</b><span>下載 provider、初始化</span></div>
  <div><b>terraform fmt／validate</b><span>格式化與語法檢查</span></div>
  <div><b>terraform plan</b><span>預覽會新增、修改、刪除哪些資源</span></div>
  <div><b>terraform apply</b><span>確認後套用變更</span></div>
  <div><b>terraform destroy</b><span>刪除所有資源（小心使用）</span></div>
</div>
<pre class="out">Terraform will perform the following actions:

  # aws_s3_bucket.reports will be created
  + resource "aws_s3_bucket" "reports" {
      + bucket = "myteam-reports-2026"
      ...
    }

Plan: 1 to add, 0 to change, 0 to destroy.</pre>
<div class="box exam"><b class="t">一定要看 plan</b>plan 的符號：<code>+</code> 新增、<code>~</code> 修改、<code>-</code> 刪除、<code>-/+</code> 刪除後重建。特別注意資料庫等重要資源出現 <code>-</code> 或 <code>-/+</code>，代表可能遺失資料。團隊常在 PR 中自動執行 plan，審查通過後才 apply。</div>` },
    { id: 'state', title: '狀態檔與團隊協作', html: `
<p>Terraform 用<b>狀態檔（terraform.tfstate）</b>記錄它管理的資源與實際 ID，plan 時比對程式碼、狀態檔與雲端的實際情況，算出要做的變更。</p>
<table>
<tr><th>注意事項</th><th>說明</th></tr>
<tr><td><b>不要提交到 Git</b></td><td>狀態檔可能含有密碼等敏感資訊</td></tr>
<tr><td><b>使用遠端後端</b></td><td>團隊把狀態檔存在 S3、Terraform Cloud 等共用位置，並啟用<b>鎖定</b>，避免兩個人同時 apply 造成衝突</td></tr>
<tr><td><b>不要手動修改雲端資源</b></td><td>在主控台手動改了 Terraform 管理的資源，會造成「狀態漂移（Drift）」，下次 apply 可能被改回去</td></tr>
<tr><td><b>依環境分開</b></td><td>開發、正式環境使用不同的狀態檔，避免誤操作</td></tr>
</table>` },
    { id: 'others', title: '其他工具比較', html: `
<table>
<tr><th>工具</th><th>類型</th><th>特色</th></tr>
<tr><td><b>Terraform／OpenTofu</b></td><td>建立基礎架構</td><td>跨雲端、生態系最大</td></tr>
<tr><td><b>AWS CloudFormation</b></td><td>建立基礎架構</td><td>AWS 原生、與 AWS 服務整合最深（AWS 課程有介紹）</td></tr>
<tr><td><b>AWS CDK／Pulumi</b></td><td>建立基礎架構</td><td>用 Python、TypeScript 等程式語言撰寫</td></tr>
<tr><td><b>Ansible</b></td><td>組態管理</td><td>透過 SSH 設定主機上的套件、檔案、服務，不需在主機安裝代理程式</td></tr>
</table>
<pre class="out"># Ansible playbook 範例：在一群主機上安裝並啟動 nginx
- hosts: web_servers
  become: true
  tasks:
    - name: 安裝 nginx
      apt: { name: nginx, state: present, update_cache: true }
    - name: 啟動並設定開機自動執行
      service: { name: nginx, state: started, enabled: true }</pre>
<div class="box memo"><b class="t">分工</b>常見組合是：Terraform 建立網路、主機、資料庫等雲端資源；Ansible 或容器映像負責主機上的軟體設定；應用程式則用 CI／CD 部署。</div>
<div class="box memo"><b class="t">動手做</b>安裝 Terraform，在雲端帳號建立一個 S3（或同類）儲存空間並加上標籤，觀察 plan 的輸出；修改標籤再 plan 一次看「~ 修改」，最後用 destroy 刪除。記得設定預算告警，避免忘記刪除資源。</div>` }
  ],
  keypoints: [
    'IaC 用程式碼描述基礎架構：可重複、可審查、可追溯、可復原',
    '宣告式描述最終狀態（Terraform、CloudFormation）；命令式描述步驟',
    'Terraform：provider、resource、variable、output、module',
    '流程：init → plan 預覽 → apply 套用；destroy 刪除全部資源',
    'plan 符號：+ 新增、~ 修改、- 刪除、-/+ 重建，重要資源出現刪除要特別小心',
    '狀態檔不提交 Git，團隊使用遠端後端並啟用鎖定，避免手動修改造成漂移',
    'Ansible 負責主機組態管理；CloudFormation 是 AWS 原生 IaC'
  ]
},
{
  id: 'c10', subject: 2, minutes: 50,
  title: '監控、日誌與 DevSecOps',
  summary: '可觀測性三支柱、Prometheus 與 Grafana、集中式日誌、告警設計、SLI、SLO 與錯誤預算、事件應變與事後檢討，以及 DevSecOps 的依賴掃描、映像掃描、機密管理與供應鏈安全。',
  sections: [
    { id: 'pillars', title: '可觀測性三支柱', html: `
<table>
<tr><th>支柱</th><th>回答的問題</th><th>例子</th><th>常見工具</th></tr>
<tr><td><b>指標</b> Metrics</td><td>系統整體狀況如何？</td><td>每秒請求數、錯誤率、延遲、CPU、記憶體</td><td>Prometheus、CloudWatch、Datadog</td></tr>
<tr><td><b>日誌</b> Logs</td><td>某個時間點發生了什麼事？</td><td>錯誤訊息、使用者操作紀錄</td><td>Loki、ELK（Elasticsearch）、CloudWatch Logs</td></tr>
<tr><td><b>追蹤</b> Traces</td><td>一個請求經過哪些服務、卡在哪裡？</td><td>API → 訂單服務 → 資料庫，各花多少時間</td><td>OpenTelemetry、Jaeger、AWS X-Ray</td></tr>
</table>
<p>監控網頁服務時，常用 Google SRE 的「<b>四個黃金訊號</b>」：<b>延遲</b>（請求花多久）、<b>流量</b>（請求量）、<b>錯誤</b>（失敗比例）、<b>飽和度</b>（資源用了多滿）。</p>
<div class="box tip"><b class="t">常見組合</b>Prometheus 定期收集各服務的指標，Grafana 把指標畫成儀表板並設定告警；日誌用 Loki 或 ELK 集中收集。雲端環境也可以直接使用雲端廠商的監控服務。</div>` },
    { id: 'logs', title: '寫好日誌', html: `
<ul>
  <li><b>結構化日誌</b>：用 JSON 格式輸出，方便搜尋與統計，例如依 user_id 或 order_id 查詢。</li>
  <li><b>適當的等級</b>：DEBUG、INFO、WARNING、ERROR，正式環境通常只記錄 INFO 以上。</li>
  <li><b>附上請求編號</b>：同一個請求在各服務的日誌帶著相同的 request_id，才能串起來追查。</li>
  <li><b>不要記錄機密與個資</b>：密碼、權杖、信用卡號、身分證字號都不應出現在日誌中。</li>
  <li><b>輸出到標準輸出</b>：容器環境中交給平台收集，不要寫在容器內的檔案。</li>
</ul>
<pre class="py">import json, logging, sys

class JsonFormatter(logging.Formatter):
    def format(self, record):
        data = {'level': record.levelname, 'msg': record.getMessage()}
        data.update(getattr(record, 'extra_fields', {}))
        return json.dumps(data, ensure_ascii=False)

handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JsonFormatter())
log = logging.getLogger('shop')
log.handlers = [handler]
log.setLevel(logging.INFO)

log.info('訂單建立', extra={'extra_fields': {'request_id': 'req-81f2', 'order_id': 'A123', 'amount': 1290}})
log.warning('付款逾時重試', extra={'extra_fields': {'request_id': 'req-81f2', 'attempt': 2}})
log.debug('這行不會出現，因為等級是 INFO')</pre>` },
    { id: 'slo', title: '告警與 SLO', html: `
<table>
<tr><th>名詞</th><th>意思</th><th>例子</th></tr>
<tr><td><b>SLI</b> 服務水準指標</td><td>衡量服務品質的數據</td><td>成功請求的比例、95% 請求的延遲</td></tr>
<tr><td><b>SLO</b> 服務水準目標</td><td>團隊對 SLI 設定的內部目標</td><td>每月 99.9% 的請求成功</td></tr>
<tr><td><b>SLA</b> 服務水準協議</td><td>對客戶的承諾，未達成要賠償</td><td>可用性低於 99.5% 退還部分費用</td></tr>
<tr><td><b>錯誤預算</b> Error Budget</td><td>SLO 允許的失敗額度</td><td>99.9% 代表每月約可停機 43.8 分鐘</td></tr>
</table>
<div class="box tip"><b class="t">互動練習</b>到「互動練習 → SLA 可用性與停機時間」換算不同可用性目標每月、每年可以停機多久。</div>
<p><b>錯誤預算</b>讓速度與穩定有共同的語言：預算還很多時，可以加快發布新功能；預算快用完時，先暫停新功能、專心改善穩定性。</p>
<h3>好的告警</h3>
<ul>
  <li><b>依使用者感受告警</b>：錯誤率上升、延遲變長，而不是只看 CPU 高一點。</li>
  <li><b>每個告警都要能行動</b>：收到後知道要做什麼，最好附上處理手冊（Runbook）連結。</li>
  <li><b>避免告警疲勞</b>：太多不重要的告警，會讓大家忽略真正的問題。</li>
  <li><b>分級</b>：嚴重的立即通知值班人員（On-call），不急的隔天處理。</li>
</ul>` },
    { id: 'incident', title: '事件應變與事後檢討', html: `
<div class="flow">
  <div><b>偵測</b><span>告警或使用者回報</span></div>
  <div><b>回應</b><span>指定事件負責人<br>建立溝通頻道</span></div>
  <div><b>止血</b><span>優先恢復服務：回滾、切換、擴容</span></div>
  <div><b>修復</b><span>找出根本原因並修正</span></div>
  <div><b>事後檢討</b><span>Postmortem，改善流程</span></div>
</div>
<p><b>事後檢討（Postmortem）</b>記錄事件時間軸、影響範圍、根本原因、處理過程，以及<b>具體的改善行動</b>（例如新增監控、加上測試、修改部署流程）。重點是<b>不責怪個人</b>（Blameless），而是找出讓錯誤可能發生的系統性原因。</p>
<div class="box exam"><b class="t">先恢復，再找原因</b>事件發生時，第一優先是讓服務恢復（例如回滾到上一版），而不是在正式環境上慢慢除錯。根本原因留到服務恢復後再分析。</div>` },
    { id: 'devsecops', title: 'DevSecOps', html: `
<p><b>DevSecOps</b> 把資安融入開發與部署的每個階段（「安全左移」），而不是上線前才請資安團隊檢查。</p>
<table>
<tr><th>階段</th><th>做法</th><th>工具例子</th></tr>
<tr><td>寫程式</td><td>pre-commit 掃描機密、程式碼靜態分析</td><td>gitleaks、Semgrep、CodeQL</td></tr>
<tr><td>相依套件</td><td>掃描套件已知漏洞，自動提出更新 PR</td><td>Dependabot、Renovate、pip-audit</td></tr>
<tr><td>建置映像</td><td>掃描映像中作業系統套件的漏洞</td><td>Trivy、Grype、Docker Scout</td></tr>
<tr><td>部署</td><td>最小權限、機密管理、只部署經過掃描與簽章的映像</td><td>Secrets Manager、Vault、Sigstore</td></tr>
<tr><td>執行中</td><td>監控異常行為、定期修補</td><td>雲端資安服務、執行期防護</td></tr>
</table>
<div class="box warn"><b class="t">供應鏈安全</b>你的程式依賴大量第三方套件、基底映像與 CI Action，任何一個被植入惡意程式都會影響你。做法包括：固定版本並記錄相依清單（lock 檔、SBOM 軟體物料清單）、只使用可信任的來源、定期更新並掃描。</div>
<div class="box tip"><b class="t">恭喜完成</b>你已經走過 DevOps 的完整流程：容器化、CI／CD、部署、編排、IaC 與監控。接下來可以學本站的 AWS Solutions Architect 課程深入雲端架構，或用 Linux 課程加強系統維運與資安日誌分析。</div>` }
  ],
  keypoints: [
    '可觀測性三支柱：指標、日誌、追蹤；四個黃金訊號：延遲、流量、錯誤、飽和度',
    'Prometheus 收集指標、Grafana 畫儀表板與告警；日誌集中收集',
    '日誌用結構化格式、附請求編號、不記錄機密與個資',
    'SLI 是指標、SLO 是內部目標、SLA 是對客戶的承諾；錯誤預算平衡速度與穩定',
    '告警要依使用者感受、可以行動、避免告警疲勞',
    '事件應變先恢復服務再找原因；事後檢討不責怪個人、提出改善行動',
    'DevSecOps：機密掃描、相依套件與映像漏洞掃描、最小權限、供應鏈安全'
  ]
}
);
