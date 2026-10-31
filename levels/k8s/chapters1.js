/* Kubernetes 核心概念篇：叢集架構、Pod、Deployment、Service、設定與機密
   <pre class="js"> 為可在網頁上執行的 JavaScript，用來模擬 Kubernetes 的運作邏輯；<pre class="out"> 為 YAML 設定或需要在自己電腦上執行的指令
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 45,
  title: '為什麼需要 Kubernetes',
  summary: '從單台主機的容器到容器編排、Kubernetes 解決的問題、宣告式與命令式、叢集架構（控制平面與工作節點）、在本機建立叢集，以及 Kubernetes 不適合的情況。',
  sections: [
    { id: 'why', title: '容器之後的問題', html: `
<p>用 Docker 把應用打包成容器之後，在一台主機上執行很簡單。但正式環境很快會遇到這些問題：</p>
<table>
<tr><th>問題</th><th>只用 Docker</th><th>Kubernetes</th></tr>
<tr><td>容器當掉</td><td>要自己寫腳本偵測並重啟</td><td>自動重啟，或在其他節點重建</td></tr>
<tr><td>主機故障</td><td>上面的服務全部中斷</td><td>把容器重新排程到其他節點</td></tr>
<tr><td>流量變大</td><td>手動多開容器、改負載平衡設定</td><td>一行指令或依 CPU 自動擴展</td></tr>
<tr><td>更新版本</td><td>停機、換映像檔、再啟動</td><td>滾動更新，不停機，出錯可回滾</td></tr>
<tr><td>服務之間怎麼找到彼此</td><td>寫死 IP 或自己架服務發現</td><td>內建 Service 與 DNS</td></tr>
</table>
<p>管理大量容器的部署、擴展、網路與修復，稱為<b>容器編排</b>。Kubernetes（常簡稱 <b>K8s</b>，K 與 s 之間有 8 個字母）源自 Google 內部的經驗，2014 年開源，現在由 CNCF 管理，是容器編排的業界標準，AWS、Google Cloud、Azure 都提供代管服務（EKS、GKE、AKS）。</p>` },
    { id: 'declarative', title: '宣告式：描述你想要什麼', html: `
<table>
<tr><th>命令式</th><th>宣告式</th></tr>
<tr><td>「啟動 3 個容器」「再多開 1 個」「停掉那個」</td><td>「我要永遠有 3 個這個版本的容器在執行」</td></tr>
<tr><td>一步一步告訴系統怎麼做</td><td>描述期望狀態，系統負責做到並維持</td></tr>
</table>
<pre class="out"># deployment.yaml：期望狀態寫在檔案中，可以放進 Git 管理
apiVersion: apps/v1
kind: Deployment
metadata:
  name: todo-api
spec:
  replicas: 3                       # 期望：永遠有 3 個副本
  selector:
    matchLabels: { app: todo-api }
  template:
    metadata:
      labels: { app: todo-api }
    spec:
      containers:
        - name: api
          image: ghcr.io/example/todo-api:1.4.0
          ports: [{ containerPort: 3000 }]

$ kubectl apply -f deployment.yaml</pre>
<p>Kubernetes 的<b>控制器</b>會不斷比較「期望狀態」與「實際狀態」，有差異就動手修正：有一個副本當掉了，就自動補一個。這個持續修正的過程稱為<b>控制迴圈</b>（第 3 章會用程式模擬）。</p>` },
    { id: 'arch', title: '叢集架構', html: `
<pre class="out">                     ┌──────────── 控制平面（Control Plane）────────────┐
kubectl ──HTTPS──→   │ kube-apiserver  ← 所有操作的唯一入口             │
                     │ etcd            ← 儲存叢集所有狀態的資料庫       │
                     │ kube-scheduler  ← 決定新的 Pod 放在哪個節點      │
                     │ kube-controller-manager ← 執行各種控制迴圈       │
                     └──────────────────────────────────────────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
     工作節點 1             工作節點 2             工作節點 3
     kubelet               kubelet               kubelet        ← 依指示啟動、監控 Pod
     kube-proxy            kube-proxy            kube-proxy     ← 實作 Service 的網路轉送
     容器執行環境           容器執行環境           容器執行環境    ← 例如 containerd
     [Pod][Pod]            [Pod]                 [Pod][Pod]</pre>
<table>
<tr><th>元件</th><th>職責</th></tr>
<tr><td>kube-apiserver</td><td>提供 Kubernetes API，驗證請求並寫入 etcd；kubectl 與所有元件都透過它溝通</td></tr>
<tr><td>etcd</td><td>分散式鍵值資料庫，保存叢集的期望狀態與實際狀態，<b>一定要備份</b></td></tr>
<tr><td>kube-scheduler</td><td>為還沒有節點的 Pod 挑選合適的節點（第 7 章）</td></tr>
<tr><td>kube-controller-manager</td><td>執行 Deployment、ReplicaSet、節點等控制器</td></tr>
<tr><td>kubelet</td><td>每個節點上的代理程式，確保分派到節點的 Pod 正常執行，並回報狀態</td></tr>
<tr><td>kube-proxy</td><td>設定節點的網路規則，讓 Service 的流量轉到正確的 Pod</td></tr>
</table>
<p>使用雲端的代管 Kubernetes 時，控制平面由雲端業者維護，你只需要管理工作節點與應用程式。</p>` },
    { id: 'local', title: '在本機建立叢集', html: `
<table>
<tr><th>工具</th><th>特色</th></tr>
<tr><td>kind</td><td>Kubernetes in Docker：用 Docker 容器模擬節點，啟動快，適合學習與 CI</td></tr>
<tr><td>minikube</td><td>單節點叢集，附加元件豐富（Ingress、metrics-server 一鍵啟用）</td></tr>
<tr><td>Docker Desktop</td><td>設定中勾選啟用 Kubernetes 即可</td></tr>
<tr><td>k3s／k3d</td><td>輕量版 Kubernetes，適合邊緣裝置與小型主機</td></tr>
</table>
<pre class="out">$ kind create cluster --name dev           # 建立叢集（需要先安裝 Docker 與 kind）
$ kubectl cluster-info                      # 確認可以連線
$ kubectl get nodes                         # 列出節點
NAME                STATUS   ROLES           AGE   VERSION
dev-control-plane   Ready    control-plane   45s   v1.3x.x

$ kubectl config get-contexts               # kubectl 可以管理多個叢集，context 決定目前操作哪一個
$ kubectl config use-context kind-dev</pre>
<div class="box warn"><b class="t">Kubernetes 不一定是答案</b>Kubernetes 本身很複雜，需要學習與維運成本。只有一兩個服務、流量穩定的小專案，用一台主機加 Docker Compose、或平台服務（Render、Cloud Run 等）通常更簡單。當服務數量多、需要高可用與自動擴展、團隊有能力維運時，Kubernetes 的價值才會顯現。</div>` }
  ],
  keypoints: [
    'Kubernetes 自動處理容器的重啟、重新排程、擴展、滾動更新與服務發現，稱為容器編排。',
    '宣告式：在 YAML 描述期望狀態，用 kubectl apply 套用，可以放進 Git 管理。',
    '控制器持續比較期望與實際狀態並修正，稱為控制迴圈。',
    '控制平面：kube-apiserver、etcd、kube-scheduler、kube-controller-manager。',
    '工作節點：kubelet、kube-proxy、容器執行環境（例如 containerd）。',
    '本機可用 kind、minikube、Docker Desktop 練習；小專案不一定需要 Kubernetes。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 50,
  title: 'Pod、標籤與 kubectl',
  summary: 'Pod 的概念與多容器 Pod、YAML 資源的四個欄位、Pod 的生命週期與狀態、標籤與選擇器、Namespace，以及 kubectl 的常用指令與輸出格式。',
  sections: [
    { id: 'pod', title: 'Pod：最小的部署單位', html: `
<p><b>Pod</b> 是 Kubernetes 中最小的部署單位，裡面包含一個或多個容器。同一個 Pod 中的容器：</p>
<ul>
<li>共用同一個 <b>IP 位址</b>與連接埠空間（彼此用 localhost 溝通）。</li>
<li>可以共用<b>儲存卷</b>（Volume）。</li>
<li>一起被排程到同一個節點、一起建立與刪除。</li>
</ul>
<p>大多數 Pod 只有一個容器。多容器 Pod 用於緊密合作的輔助程式，例如收集日誌的 <b>sidecar</b>，或在主容器啟動前執行的 <b>init 容器</b>（例如等資料庫準備好、執行資料庫遷移）。</p>
<pre class="out"># pod.yaml
apiVersion: v1                 # API 版本
kind: Pod                      # 資源類型
metadata:                      # 名稱、標籤等識別資訊
  name: todo-api
  labels:
    app: todo-api
    tier: backend
spec:                          # 期望狀態
  containers:
    - name: api
      image: ghcr.io/example/todo-api:1.4.0
      ports:
        - containerPort: 3000</pre>
<p>所有 Kubernetes 資源的 YAML 都有這四個欄位：<b>apiVersion、kind、metadata、spec</b>。叢集回報的實際狀態則會出現在 status 欄位。</p>
<div class="box tip"><b class="t">實務上不直接建立 Pod</b>直接建立的 Pod 被刪除或節點故障時，不會有人幫你重建。正式環境用 Deployment（第 3 章）等控制器管理 Pod。</div>` },
    { id: 'lifecycle', title: 'Pod 的狀態', html: `
<table>
<tr><th>STATUS</th><th>意思</th></tr>
<tr><td>Pending</td><td>已被接受，但還沒有排程到節點，或正在下載映像檔</td></tr>
<tr><td>ContainerCreating</td><td>已排程，正在建立容器</td></tr>
<tr><td>Running</td><td>至少一個容器正在執行</td></tr>
<tr><td>Completed／Succeeded</td><td>所有容器正常結束（常見於 Job）</td></tr>
<tr><td>CrashLoopBackOff</td><td>容器一直啟動後立刻崩潰，Kubernetes 等待越來越久再重試</td></tr>
<tr><td>ImagePullBackOff／ErrImagePull</td><td>下載映像檔失敗（名稱或標籤錯誤、沒有權限）</td></tr>
<tr><td>OOMKilled</td><td>容器使用的記憶體超過上限被終止（第 7 章）</td></tr>
</table>
<p>第 10 章會詳細說明每一種異常狀態的排除方式。互動練習中的「Pod 故障排除」也可以依狀態查詢可能的原因與指令。</p>` },
    { id: 'labels', title: '標籤與選擇器', html: `
<p><b>標籤</b>（Label）是附加在資源上的鍵值對，例如 app: todo-api、env: prod。<b>選擇器</b>（Selector）用標籤篩選資源。Kubernetes 中的資源大多靠標籤彼此關聯：Deployment 用選擇器管理自己的 Pod，Service 用選擇器決定流量送給哪些 Pod。</p>
<pre class="js">const pods = [
  { name: 'todo-api-7f9c-a', labels: { app: 'todo-api', env: 'prod', version: 'v1' } },
  { name: 'todo-api-7f9c-b', labels: { app: 'todo-api', env: 'prod', version: 'v2' } },
  { name: 'todo-api-dev-c',  labels: { app: 'todo-api', env: 'dev', version: 'v2' } },
  { name: 'postgres-0',      labels: { app: 'postgres', env: 'prod' } },
];
// matchLabels：所有鍵值都要相同；matchExpressions：In、NotIn、Exists、DoesNotExist
function matches(labels, sel) {
  const okLabels = Object.entries(sel.matchLabels ?? {}).every(([k, v]) =&gt; labels[k] === v);
  const okExpr = (sel.matchExpressions ?? []).every(({ key, operator, values }) =&gt; {
    if (operator === 'In') return values.includes(labels[key]);
    if (operator === 'NotIn') return !values.includes(labels[key]);
    if (operator === 'Exists') return key in labels;
    if (operator === 'DoesNotExist') return !(key in labels);
  });
  return okLabels &amp;&amp; okExpr;
}
const selectors = {
  'app=todo-api': { matchLabels: { app: 'todo-api' } },
  'app=todo-api,env=prod': { matchLabels: { app: 'todo-api', env: 'prod' } },
  'env in (prod), version notin (v1)': { matchExpressions: [{ key: 'env', operator: 'In', values: ['prod'] }, { key: 'version', operator: 'NotIn', values: ['v1'] }] },
  '!version': { matchExpressions: [{ key: 'version', operator: 'DoesNotExist' }] },
};
for (const [text, sel] of Object.entries(selectors)) {
  console.log(text.padEnd(36), '→', pods.filter(p =&gt; matches(p.labels, sel)).map(p =&gt; p.name).join(', '));
}</pre>
<p>注意第三個選擇器：postgres-0 沒有 version 標籤，NotIn 對「沒有這個標籤」也成立，所以它也被選中。kubectl 也用相同的語法：kubectl get pods -l 'env in (prod),version notin (v1)'。</p>` },
    { id: 'kubectl', title: 'kubectl 與 Namespace', html: `
<pre class="out">$ kubectl apply -f pod.yaml                  # 建立或更新
$ kubectl get pods                           # 列出 Pod
$ kubectl get pods -o wide                   # 多顯示 IP 與節點
$ kubectl get pods -l app=todo-api           # 用標籤篩選
$ kubectl get pod todo-api -o yaml           # 輸出完整 YAML（包含 status）
$ kubectl describe pod todo-api              # 詳細資訊與事件，除錯時最常用
$ kubectl logs todo-api -f                   # 持續查看日誌
$ kubectl exec -it todo-api -- sh            # 進入容器
$ kubectl delete -f pod.yaml                 # 刪除
$ kubectl explain pod.spec.containers        # 查詢欄位說明，忘記 YAML 怎麼寫時很好用

# 快速產生 YAML 樣板（考 CKA／CKAD 時很常用）
$ kubectl run nginx --image=nginx --dry-run=client -o yaml &gt; pod.yaml
$ kubectl create deployment web --image=nginx --replicas=3 --dry-run=client -o yaml &gt; deploy.yaml</pre>
<p><b>Namespace</b> 把叢集分成多個虛擬空間，常用來區分團隊或環境（dev、staging、prod）。資源名稱只需要在同一個 Namespace 中唯一，也可以針對 Namespace 設定權限與資源配額。</p>
<pre class="out">$ kubectl get namespaces                     # 預設有 default、kube-system 等
$ kubectl create namespace todo
$ kubectl get pods -n todo                   # 指定 Namespace
$ kubectl get pods -A                        # 所有 Namespace
$ kubectl config set-context --current --namespace=todo    # 改變預設 Namespace</pre>` }
  ],
  keypoints: [
    'Pod 是最小部署單位，同一 Pod 的容器共用 IP、可共用儲存，一起排程。',
    '資源 YAML 都有 apiVersion、kind、metadata、spec；實際狀態在 status。',
    '正式環境不直接建立 Pod，而是用 Deployment 等控制器管理。',
    '標籤是鍵值對，選擇器用 matchLabels 與 matchExpressions（In、NotIn、Exists、DoesNotExist）篩選。',
    'kubectl get、describe、logs、exec、apply、delete、explain；--dry-run=client -o yaml 產生樣板。',
    'Namespace 區分團隊或環境，-n 指定、-A 查看全部。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 50,
  title: 'Deployment 與滾動更新',
  summary: 'Deployment、ReplicaSet 與 Pod 的關係、控制迴圈如何維持副本數、擴展與縮減、滾動更新的 maxSurge 與 maxUnavailable、查看歷史與回滾，以及其他工作負載資源。',
  sections: [
    { id: 'rs', title: 'Deployment、ReplicaSet 與 Pod', html: `
<pre class="out">Deployment（todo-api）            ← 你管理的對象：期望副本數、映像檔版本、更新策略
  └── ReplicaSet（todo-api-7f9c）  ← 由 Deployment 自動建立，每個版本一個
        ├── Pod（todo-api-7f9c-abcde）
        ├── Pod（todo-api-7f9c-fghij）
        └── Pod（todo-api-7f9c-klmno）</pre>
<p><b>ReplicaSet</b> 確保有指定數量的 Pod 在執行；<b>Deployment</b> 在 ReplicaSet 之上管理版本更新：更新映像檔時，Deployment 建立新的 ReplicaSet，逐步把副本從舊的移到新的。一般只需要操作 Deployment，不需要直接管理 ReplicaSet。</p>
<pre class="out">$ kubectl apply -f deployment.yaml
$ kubectl get deploy,rs,pods -l app=todo-api
NAME                       READY   UP-TO-DATE   AVAILABLE
deployment.apps/todo-api   3/3     3            3
NAME                                  DESIRED   CURRENT   READY
replicaset.apps/todo-api-7f9c         3         3         3

$ kubectl delete pod todo-api-7f9c-abcde      # 刪掉一個 Pod 試試看
$ kubectl get pods -l app=todo-api            # 馬上出現一個新的 Pod 補上</pre>` },
    { id: 'loop', title: '控制迴圈', html: `
<p>控制器的核心邏輯很簡單：<b>觀察</b>實際狀態 → <b>比較</b>期望狀態 → <b>動作</b>修正差異，不斷重複。下面模擬 ReplicaSet 控制器面對各種事件時的行為：</p>
<pre class="js">let seq = 0;
const newPod = () =&gt; ({ name: \`todo-api-\${(++seq).toString(36).padStart(3, '0')}\`, phase: 'Running' });
const state = { desired: 3, pods: [] };

function reconcile(tag) {                         // ReplicaSet 控制器的一次循環
  const alive = state.pods.filter(p =&gt; p.phase === 'Running');
  const actual = alive.length, actions = [];
  state.pods = alive;                              // 清掉已失敗的 Pod
  while (state.pods.length &lt; state.desired) { const p = newPod(); state.pods.push(p); actions.push('建立 ' + p.name); }
  while (state.pods.length &gt; state.desired) { const p = state.pods.pop(); actions.push('刪除 ' + p.name); }
  console.log(\`[\${tag}] 期望 \${state.desired}，實際 \${actual} → \${actions.length ? actions.join('、') : '不需要動作'}\`);
}

reconcile('剛建立');
state.pods[1].phase = 'Failed';                   // 節點故障，一個 Pod 掛了
reconcile('Pod 失敗後');
state.desired = 5;                                // kubectl scale --replicas=5
reconcile('擴展到 5');
state.desired = 2;
reconcile('縮減到 2');
reconcile('沒有變化');
console.log('目前的 Pod：', state.pods.map(p =&gt; p.name).join(', '));</pre>
<p>控制器不在乎「發生了什麼事」，只在乎「現在和期望差多少」。這讓系統面對各種意外都能自我修復。Kubernetes 中幾乎所有功能（Deployment、Service、HPA、甚至節點管理）都是以控制迴圈實作的。</p>` },
    { id: 'rolling', title: '滾動更新', html: `
<pre class="out">spec:
  replicas: 4
  strategy:
    type: RollingUpdate             # 預設策略；另一種是 Recreate（先全部刪除再建立，會停機）
    rollingUpdate:
      maxSurge: 1                   # 更新時最多比 replicas 多幾個 Pod（預設 25%）
      maxUnavailable: 0             # 更新時最多有幾個 Pod 不可用（預設 25%）

$ kubectl set image deployment/todo-api api=ghcr.io/example/todo-api:1.5.0
$ kubectl rollout status deployment/todo-api</pre>
<pre class="js">function rollingUpdate(replicas, maxSurge, maxUnavailable) {
  let oldPods = replicas, newPods = 0, readyNew = 0, step = 0;
  console.log(\`replicas=\${replicas} maxSurge=\${maxSurge} maxUnavailable=\${maxUnavailable}\`);
  while (oldPods &gt; 0 || readyNew &lt; replicas) {
    step++;
    // 1. 在不超過 replicas + maxSurge 的前提下建立新版 Pod
    const canCreate = Math.max(0, replicas + maxSurge - (oldPods + newPods));
    const create = Math.min(canCreate, replicas - newPods);
    newPods += create;
    // 2. 新 Pod 通過 readiness 檢查後變成可用
    readyNew = newPods;
    // 3. 在可用數量不低於 replicas - maxUnavailable 的前提下刪除舊版 Pod
    const minAvailable = replicas - maxUnavailable;
    const canDelete = Math.max(0, oldPods + readyNew - minAvailable);
    const del = Math.min(canDelete, oldPods);
    oldPods -= del;
    console.log(\`  第 \${step} 步：新增 \${create} 個新版、刪除 \${del} 個舊版 → 舊 \${oldPods}／新 \${newPods}，可用 \${oldPods + readyNew}\`);
    if (step &gt; 20) break;
  }
}
rollingUpdate(4, 1, 0);      // 一次多開一個，永遠保持 4 個可用：最安全但較慢
rollingUpdate(4, 2, 1);      // 允許多開 2 個、少 1 個：比較快</pre>
<p>maxUnavailable 設為 0 能保證更新過程中容量不下降，但需要有額外的資源容納多出來的 Pod。新版 Pod 必須通過 <b>readiness 探針</b>（第 8 章）才算可用，這是滾動更新不中斷服務的關鍵。互動練習中的「控制迴圈模擬」可以調整參數逐步觀察。</p>` },
    { id: 'rollback', title: '歷史與回滾', html: `
<pre class="out">$ kubectl rollout history deployment/todo-api
REVISION  CHANGE-CAUSE
1         &lt;none&gt;
2         &lt;none&gt;

$ kubectl rollout undo deployment/todo-api                 # 回到上一版
$ kubectl rollout undo deployment/todo-api --to-revision=1 # 回到指定版本
$ kubectl rollout pause／resume deployment/todo-api        # 暫停／繼續更新

# 在 metadata.annotations 加上說明，歷史紀錄會比較好讀
metadata:
  annotations:
    kubernetes.io/change-cause: "升級到 1.5.0：新增分頁 API"</pre>
<p>回滾之所以快，是因為舊版的 ReplicaSet 還保留著（副本數為 0），回滾只是把副本數調回去。保留幾個舊版由 revisionHistoryLimit 決定（預設 10）。</p>
<table>
<tr><th>其他工作負載</th><th>用途</th><th>章節</th></tr>
<tr><td>StatefulSet</td><td>需要固定名稱與專屬儲存的服務，例如資料庫</td><td>第 6 章</td></tr>
<tr><td>DaemonSet</td><td>每個節點都執行一個，例如日誌收集、監控代理</td><td>第 6 章</td></tr>
<tr><td>Job／CronJob</td><td>執行到完成的批次工作、定期工作</td><td>第 6 章</td></tr>
</table>` }
  ],
  keypoints: [
    'Deployment 管理 ReplicaSet，ReplicaSet 維持 Pod 副本數；平常只操作 Deployment。',
    '控制迴圈：觀察 → 比較 → 修正，不斷重複，讓系統自我修復。',
    'kubectl scale 調整副本數；刪除 Pod 後 ReplicaSet 會自動補上。',
    '滾動更新的 maxSurge 決定可以多開幾個、maxUnavailable 決定可以少幾個，預設都是 25%。',
    '新版 Pod 通過 readiness 探針才算可用，這是不停機更新的關鍵。',
    'kubectl rollout status／history／undo；舊版 ReplicaSet 保留讓回滾很快。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 55,
  title: 'Service 與網路',
  summary: 'Kubernetes 的網路模型、為什麼需要 Service、ClusterIP、NodePort、LoadBalancer 的差別、叢集內 DNS、EndpointSlice 與負載分配、Ingress 與 Gateway API，以及用 port-forward 測試。',
  sections: [
    { id: 'model', title: '網路模型與 Service', html: `
<p>Kubernetes 的網路模型規定：每個 Pod 都有自己的 IP，所有 Pod 不經過 NAT 就能互相連線。但 <b>Pod 的 IP 會變</b>：Pod 重建、滾動更新、擴展時，IP 都不同。前端或其他服務不能寫死 Pod IP。</p>
<p><b>Service</b> 提供一個<b>穩定的虛擬 IP 與 DNS 名稱</b>，用標籤選擇器找到後端的 Pod，並把流量分配給它們：</p>
<pre class="out">apiVersion: v1
kind: Service
metadata:
  name: todo-api
spec:
  type: ClusterIP                 # 預設類型：只在叢集內部可以存取
  selector:
    app: todo-api                 # 流量送給有這個標籤、而且 Ready 的 Pod
  ports:
    - port: 80                    # Service 的連接埠
      targetPort: 3000            # Pod 容器的連接埠</pre>
<p>Service 會自動維護一份後端清單（<b>EndpointSlice</b>）：只有通過 readiness 探針的 Pod 才會被加入。kube-proxy 在每個節點上設定規則，把送到 Service IP 的流量轉給清單中的 Pod。</p>` },
    { id: 'types', title: 'Service 的類型', html: `
<table>
<tr><th>類型</th><th>存取方式</th><th>適合</th></tr>
<tr><td><b>ClusterIP</b></td><td>只有叢集內部能存取的虛擬 IP</td><td>內部服務，例如 API 呼叫資料庫</td></tr>
<tr><td><b>NodePort</b></td><td>在每個節點開一個連接埠（預設範圍 30000～32767）</td><td>測試、沒有雲端負載平衡器的環境</td></tr>
<tr><td><b>LoadBalancer</b></td><td>向雲端業者申請外部負載平衡器與公開 IP</td><td>在雲端對外提供服務</td></tr>
<tr><td>ExternalName</td><td>把 Service 名稱對應到外部 DNS 名稱</td><td>讓叢集內用固定名稱存取外部服務</td></tr>
</table>
<p>三種主要類型是逐層包含的：LoadBalancer 會自動建立 NodePort，NodePort 也會有 ClusterIP。每個 LoadBalancer 通常對應一個雲端負載平衡器（要額外付費），所以多個 HTTP 服務常共用一個 Ingress 或 Gateway 入口。</p>` },
    { id: 'dns', title: '叢集內 DNS 與負載分配', html: `
<p>叢集內建 DNS（CoreDNS）。Pod 可以直接用 Service 名稱連線：</p>
<pre class="out">同一個 Namespace：      http://todo-api
其他 Namespace：        http://todo-api.todo
完整名稱：              http://todo-api.todo.svc.cluster.local
                         └服務名稱┘└Namespace┘└固定後綴┘

# API 的環境變數：資料庫位址直接用 Service 名稱，不寫 IP
env:
  - name: DATABASE_HOST
    value: postgres.todo.svc.cluster.local</pre>
<pre class="js">// 模擬 Service 把請求分配給 Ready 的 Pod（kube-proxy 的常見模式大致是隨機分配）
const endpoints = [
  { pod: 'todo-api-a', ready: true }, { pod: 'todo-api-b', ready: true },
  { pod: 'todo-api-c', ready: false },             // readiness 探針失敗：不會收到流量
];
let seed = 7;
const rand = () =&gt; (seed = (seed * 16807) % 2147483647) / 2147483647;   // 固定種子的亂數，方便重現
const counts = {};
for (let i = 0; i &lt; 1000; i++) {
  const ready = endpoints.filter(e =&gt; e.ready);
  const target = ready[Math.floor(rand() * ready.length)].pod;
  counts[target] = (counts[target] ?? 0) + 1;
}
console.log('1000 個請求的分配：', JSON.stringify(counts));
endpoints[2].ready = true;
console.log('todo-api-c 通過 readiness 後，後端數量：', endpoints.filter(e =&gt; e.ready).length);</pre>
<p>Service 的分配是以<b>連線</b>為單位，長連線（例如 HTTP/2、gRPC、WebSocket）可能一直打到同一個 Pod，需要在用戶端或服務網格層級做負載平衡。</p>` },
    { id: 'ingress', title: 'Ingress 與 Gateway API', html: `
<p>多個 HTTP 服務要對外時，用一個入口依<b>網域與路徑</b>轉送，並統一處理 HTTPS：</p>
<pre class="out"># Ingress（networking.k8s.io/v1）
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: todo
spec:
  ingressClassName: nginx
  tls:
    - hosts: [todo.example.com]
      secretName: todo-tls
  rules:
    - host: todo.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend: { service: { name: todo-api, port: { number: 80 } } }
          - path: /
            pathType: Prefix
            backend: { service: { name: todo-web, port: { number: 80 } } }

# Gateway API（gateway.networking.k8s.io/v1）：Ingress 的後繼者，角色分工更清楚
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: todo-api
spec:
  parentRefs: [{ name: public-gateway }]          # 由平台團隊管理的 Gateway
  hostnames: [todo.example.com]
  rules:
    - matches: [{ path: { type: PathPrefix, value: /api } }]
      backendRefs: [{ name: todo-api, port: 80 }]</pre>
<p>Ingress 和 Gateway 本身只是設定，需要叢集中安裝對應的<b>控制器</b>（例如雲端業者的負載平衡器控制器、Envoy Gateway、Traefik 等）才會生效。Ingress API 仍然可以使用，但社群維護的 ingress-nginx 控制器已宣布停止維護，新專案建議評估 Gateway API。</p>
<pre class="out"># 開發時直接把服務轉到本機測試，不需要對外暴露
$ kubectl port-forward svc/todo-api 8080:80
$ curl http://localhost:8080/health</pre>` }
  ],
  keypoints: [
    '每個 Pod 有自己的 IP，但 IP 會變；Service 提供穩定的虛擬 IP 與 DNS 名稱。',
    'Service 用選擇器找到 Pod，只有 Ready 的 Pod 會加入 EndpointSlice 收到流量。',
    'ClusterIP 叢集內部、NodePort 節點連接埠（30000～32767）、LoadBalancer 雲端負載平衡器。',
    '叢集內 DNS：服務名稱.Namespace.svc.cluster.local，同 Namespace 可只寫服務名稱。',
    'Ingress 與 Gateway API 依網域與路徑轉送 HTTP，需要安裝控制器；Gateway API 是後繼者。',
    'kubectl port-forward 把服務轉到本機測試。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 45,
  title: 'ConfigMap 與 Secret',
  summary: '把設定與映像檔分開、ConfigMap 的建立與使用方式（環境變數與檔案）、Secret 的類型與 Base64 編碼、Secret 的安全限制與外部祕密管理，以及設定變更後的更新方式。',
  sections: [
    { id: 'why', title: '設定與映像檔分開', html: `
<p>同一個映像檔應該能部署到開發、測試、正式環境，差別只在<b>設定</b>：資料庫位址、功能開關、API 金鑰。把設定寫進映像檔，每個環境都要重新建置，金鑰也會跟著映像檔外流。</p>
<table>
<tr><th>資源</th><th>用途</th><th>例子</th></tr>
<tr><td><b>ConfigMap</b></td><td>一般設定</td><td>LOG_LEVEL、CORS_ORIGIN、nginx.conf</td></tr>
<tr><td><b>Secret</b></td><td>敏感資料</td><td>資料庫密碼、JWT 金鑰、TLS 憑證、映像檔倉庫的登入資訊</td></tr>
</table>` },
    { id: 'configmap', title: 'ConfigMap', html: `
<pre class="out">apiVersion: v1
kind: ConfigMap
metadata:
  name: todo-config
data:
  LOG_LEVEL: info
  CORS_ORIGIN: https://todo.example.com
  app.json: |                          # 也可以放整個設定檔
    { "pageSizeLimit": 100, "features": { "export": true } }

# 在 Deployment 中使用
spec:
  containers:
    - name: api
      envFrom:
        - configMapRef: { name: todo-config }      # 所有鍵變成環境變數
      env:
        - name: LOG_LEVEL                            # 或只取單一鍵
          valueFrom: { configMapKeyRef: { name: todo-config, key: LOG_LEVEL } }
      volumeMounts:
        - name: config
          mountPath: /etc/todo                       # 每個鍵變成一個檔案：/etc/todo/app.json
  volumes:
    - name: config
      configMap: { name: todo-config }

$ kubectl create configmap todo-config --from-literal=LOG_LEVEL=info --from-file=app.json</pre>
<div class="box tip"><b class="t">修改設定後</b>環境變數只在容器啟動時讀取，修改 ConfigMap 後要重啟 Pod 才會生效（kubectl rollout restart deployment/todo-api）。以檔案掛載的 ConfigMap 會在一段時間後自動更新檔案內容，但應用程式要自己重新讀取。</div>` },
    { id: 'secret', title: 'Secret 與 Base64', html: `
<pre class="out">apiVersion: v1
kind: Secret
metadata:
  name: todo-secrets
type: Opaque
stringData:                             # 寫明文，Kubernetes 會自動轉成 Base64 存在 data
  JWT_SECRET: 3f8a1c9e...（隨機字串）
  DATABASE_PASSWORD: s3cure-pa55

$ kubectl create secret generic todo-secrets --from-literal=JWT_SECRET=... --from-literal=DATABASE_PASSWORD=...
$ kubectl get secret todo-secrets -o yaml       # data 欄位是 Base64</pre>
<pre class="js">// Secret 的 data 欄位只是 Base64 編碼，不是加密：任何能讀取 Secret 的人都能還原
const data = { DATABASE_PASSWORD: 'czNjdXJlLXBhNTU=', JWT_SECRET: 'ZGV2LW9ubHktc2VjcmV0' };
for (const [k, v] of Object.entries(data)) console.log(\`\${k}: \${v} → 解碼後：\${atob(v)}\`);
console.log('編碼 "my-password"：', btoa('my-password'));</pre>
<table>
<tr><th>Secret 類型</th><th>用途</th></tr>
<tr><td>Opaque</td><td>一般的鍵值（預設）</td></tr>
<tr><td>kubernetes.io/tls</td><td>TLS 憑證與私鑰（Ingress 的 HTTPS）</td></tr>
<tr><td>kubernetes.io/dockerconfigjson</td><td>私有映像檔倉庫的登入資訊（imagePullSecrets）</td></tr>
</table>` },
    { id: 'secure', title: '保護 Secret', html: `
<ul>
<li><b>不要把 Secret 的 YAML 提交到 Git</b>：Base64 一看就能解碼。</li>
<li>用 <b>RBAC</b> 限制誰可以讀取 Secret（第 9 章）；能在 Namespace 中建立 Pod 的人，也可以把 Secret 掛進 Pod 讀出來。</li>
<li>啟用 etcd 的<b>靜態加密</b>（雲端代管服務通常可以搭配雲端的金鑰管理服務）。</li>
<li>使用外部祕密管理：External Secrets Operator 從 AWS Secrets Manager、HashiCorp Vault 等同步；或用 Sealed Secrets、SOPS 把加密後的 Secret 安全地放進 Git。</li>
<li>以檔案掛載比環境變數略安全：環境變數可能出現在錯誤日誌或子程序中。</li>
</ul>
<pre class="out"># 應用程式從環境變數讀取（第 10 章的 Node.js 設定檢查也適用）
env:
  - name: JWT_SECRET
    valueFrom: { secretKeyRef: { name: todo-secrets, key: JWT_SECRET } }</pre>` }
  ],
  keypoints: [
    '同一個映像檔用不同設定部署到各環境；設定放 ConfigMap，敏感資料放 Secret。',
    'ConfigMap 可以用 envFrom、valueFrom 變成環境變數，或掛載成檔案。',
    '修改 ConfigMap 後，環境變數要 rollout restart 才會生效。',
    'Secret 的 data 只是 Base64 編碼，不是加密；stringData 可以直接寫明文。',
    '保護 Secret：不提交到 Git、RBAC 限制讀取、etcd 靜態加密、外部祕密管理工具。',
    'TLS 憑證用 kubernetes.io/tls，私有倉庫登入用 dockerconfigjson 類型的 Secret。'
  ]
}
);
