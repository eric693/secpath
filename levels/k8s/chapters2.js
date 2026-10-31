/* Kubernetes 正式環境篇：儲存、資源排程、健康檢查與擴展、安全、Helm 與維運
   <pre class="js"> 為可在網頁上執行的 JavaScript，用來模擬 Kubernetes 的運作邏輯；<pre class="out"> 為 YAML 設定或需要在自己電腦上執行的指令
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c06', subject: 2, minutes: 50,
  title: '儲存與其他工作負載',
  summary: '容器檔案系統的暫時性、Volume、PersistentVolume 與 PersistentVolumeClaim、StorageClass 與動態佈建、存取模式、StatefulSet 部署資料庫，以及 DaemonSet、Job、CronJob。',
  sections: [
    { id: 'volume', title: '資料要存在哪裡', html: `
<p>容器的檔案系統是<b>暫時的</b>：容器重啟或 Pod 被重建後，寫進去的資料就消失了。需要保留的資料要放在 <b>Volume</b>：</p>
<table>
<tr><th>Volume 類型</th><th>生命週期</th><th>用途</th></tr>
<tr><td>emptyDir</td><td>和 Pod 一樣，Pod 刪除就消失</td><td>同一 Pod 內容器共用的暫存空間</td></tr>
<tr><td>configMap、secret</td><td>來自資源</td><td>掛載設定與機密（第 5 章）</td></tr>
<tr><td>persistentVolumeClaim</td><td>獨立於 Pod，Pod 重建仍保留</td><td>資料庫、使用者上傳的檔案</td></tr>
<tr><td>hostPath</td><td>綁在特定節點的目錄</td><td>系統工具才用，一般應用避免（有安全風險，Pod 換節點就找不到資料）</td></tr>
</table>` },
    { id: 'pvc', title: 'PV、PVC 與 StorageClass', html: `
<pre class="out">開發者：「我需要 10Gi、可讀寫的空間」         → PersistentVolumeClaim（PVC，申請單）
叢集：  依 StorageClass 自動建立雲端硬碟       → PersistentVolume（PV，實際的儲存空間）
        綁定 PVC 與 PV，Pod 掛載 PVC 使用

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: uploads
spec:
  accessModes: [ReadWriteOnce]
  storageClassName: standard          # 決定用哪種儲存（SSD、HDD、網路檔案系統…）
  resources:
    requests:
      storage: 10Gi

# Pod 中使用
volumes:
  - name: uploads
    persistentVolumeClaim: { claimName: uploads }</pre>
<table>
<tr><th>存取模式</th><th>意思</th></tr>
<tr><td>ReadWriteOnce（RWO）</td><td>只能被<b>一個節點</b>以讀寫方式掛載；大多數雲端硬碟屬於這種</td></tr>
<tr><td>ReadOnlyMany（ROX）</td><td>多個節點唯讀</td></tr>
<tr><td>ReadWriteMany（RWX）</td><td>多個節點同時讀寫；需要網路檔案系統（例如 NFS、雲端檔案服務）</td></tr>
<tr><td>ReadWriteOncePod（RWOP）</td><td>只能被一個 Pod 讀寫</td></tr>
</table>
<p>StorageClass 的 <b>reclaimPolicy</b> 決定 PVC 刪除後 PV 怎麼處理：Delete（一併刪除雲端硬碟，動態佈建的預設值）或 Retain（保留，需要手動清理）。重要資料記得另外做備份，PV 不等於備份。</p>` },
    { id: 'sts', title: 'StatefulSet', html: `
<p>資料庫這類<b>有狀態</b>的服務，每個副本需要固定的身分與專屬的儲存。<b>StatefulSet</b> 提供：</p>
<ul>
<li><b>固定的名稱</b>：postgres-0、postgres-1，重建後名稱不變。</li>
<li><b>專屬的儲存</b>：volumeClaimTemplates 為每個副本建立自己的 PVC，Pod 重建後重新掛上同一份資料。</li>
<li><b>有序</b>的建立、更新與刪除（0 → 1 → 2）。</li>
<li>搭配 <b>Headless Service</b>（clusterIP: None），每個 Pod 有自己的 DNS 名稱：postgres-0.postgres.todo.svc.cluster.local。</li>
</ul>
<pre class="out">apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector: { matchLabels: { app: postgres } }
  template:
    metadata: { labels: { app: postgres } }
    spec:
      containers:
        - name: postgres
          image: postgres:17
          env:
            - name: POSTGRES_PASSWORD
              valueFrom: { secretKeyRef: { name: todo-secrets, key: DATABASE_PASSWORD } }
          volumeMounts: [{ name: data, mountPath: /var/lib/postgresql/data }]
  volumeClaimTemplates:
    - metadata: { name: data }
      spec: { accessModes: [ReadWriteOnce], resources: { requests: { storage: 20Gi } } }</pre>
<div class="box tip"><b class="t">資料庫要放進 Kubernetes 嗎？</b>可以，但備份、升級、高可用都要自己負責。很多團隊選擇把資料庫交給雲端的代管服務（例如 RDS、Cloud SQL），Kubernetes 只跑無狀態的應用；或使用資料庫 Operator 自動化維運。</div>` },
    { id: 'others', title: 'DaemonSet、Job 與 CronJob', html: `
<pre class="out"># DaemonSet：每個節點各執行一個（新節點加入時自動部署）
kind: DaemonSet             # 用途：日誌收集（Fluent Bit）、監控代理（node-exporter）、網路外掛

# Job：執行到成功結束，例如資料庫遷移、匯出報表
apiVersion: batch/v1
kind: Job
metadata: { name: migrate-db }
spec:
  backoffLimit: 3           # 失敗最多重試 3 次
  template:
    spec:
      restartPolicy: Never  # Job 的 Pod 只能是 Never 或 OnFailure
      containers:
        - name: migrate
          image: ghcr.io/example/todo-api:1.5.0
          command: ["node", "scripts/migrate.js"]

# CronJob：依排程建立 Job，語法和 Linux cron 相同
apiVersion: batch/v1
kind: CronJob
metadata: { name: cleanup }
spec:
  schedule: "0 3 * * *"     # 每天 03:00
  timeZone: Asia/Taipei
  concurrencyPolicy: Forbid # 上一次還沒跑完就不啟動新的
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers: [{ name: cleanup, image: ghcr.io/example/todo-api:1.5.0, command: ["node", "scripts/cleanup.js"] }]</pre>` }
  ],
  keypoints: [
    '容器檔案系統是暫時的，需要保留的資料放在 PersistentVolumeClaim。',
    'PVC 是申請單、PV 是實際儲存，StorageClass 決定類型並動態佈建。',
    'RWO 單一節點讀寫（大多數雲端硬碟）、RWX 多節點讀寫需要網路檔案系統。',
    'StatefulSet 提供固定名稱、每個副本專屬的 PVC、有序操作，搭配 Headless Service。',
    'DaemonSet 每個節點一個；Job 執行到完成；CronJob 依排程建立 Job。',
    'PV 不等於備份；資料庫也可以交給雲端代管服務。'
  ]
},
{
  id: 'c07', subject: 2, minutes: 50,
  title: '資源管理與排程',
  summary: 'CPU 與記憶體的單位、requests 與 limits 的作用、記憶體超限的 OOMKilled 與 CPU 節流、QoS 等級、排程器如何選擇節點、nodeSelector 與親和性、taint 與 toleration，以及 Namespace 的資源配額。',
  sections: [
    { id: 'units', title: 'requests 與 limits', html: `
<pre class="out">containers:
  - name: api
    resources:
      requests:               # 排程依據：保證能拿到的資源
        cpu: 250m             # 250 毫核 ＝ 0.25 顆 CPU
        memory: 256Mi         # Mi ＝ 2^20 位元組；M 是 10^6
      limits:                 # 上限
        memory: 512Mi
        cpu: "1"</pre>
<table>
<tr><th></th><th>requests</th><th>limits</th></tr>
<tr><td>作用</td><td>排程器依此決定 Pod 能放在哪個節點</td><td>執行時不能超過的上限</td></tr>
<tr><td>CPU 超過</td><td colspan="2">CPU 是可壓縮資源：超過 limits 會被<b>節流</b>（變慢），不會被終止</td></tr>
<tr><td>記憶體超過</td><td colspan="2">記憶體不可壓縮：超過 limits 會被 <b>OOMKilled</b>（終止並重啟）</td></tr>
</table>
<p>常見建議：一定要設定 requests（否則排程器不知道 Pod 需要多少）；記憶體設定 limits 防止一個 Pod 吃光節點；CPU limits 則視情況設定，太低會讓應用在尖峰時被節流變慢。</p>` },
    { id: 'qos', title: 'QoS 等級', html: `
<table>
<tr><th>QoS 等級</th><th>條件</th><th>節點記憶體不足時</th></tr>
<tr><td><b>Guaranteed</b></td><td>每個容器的 CPU 與記憶體都設定了 requests ＝ limits</td><td>最後才被驅逐</td></tr>
<tr><td><b>Burstable</b></td><td>至少一個容器設定了 requests 或 limits，但不符合 Guaranteed</td><td>中間</td></tr>
<tr><td><b>BestEffort</b></td><td>完全沒有設定 requests 與 limits</td><td>最先被驅逐</td></tr>
</table>
<pre class="js">function qos(containers) {
  const all = containers.every(c =&gt; ['cpu', 'memory'].every(r =&gt; c.requests?.[r] &amp;&amp; c.requests[r] === c.limits?.[r]));
  if (all) return 'Guaranteed';
  const none = containers.every(c =&gt; !c.requests &amp;&amp; !c.limits);
  return none ? 'BestEffort' : 'Burstable';
}
const cases = {
  '資料庫（requests ＝ limits）': [{ requests: { cpu: '1', memory: '2Gi' }, limits: { cpu: '1', memory: '2Gi' } }],
  'API（只設 requests 與記憶體上限）': [{ requests: { cpu: '250m', memory: '256Mi' }, limits: { memory: '512Mi' } }],
  '測試用（什麼都沒設）': [{}],
};
for (const [name, c] of Object.entries(cases)) console.log(name.padEnd(22), '→', qos(c));</pre>` },
    { id: 'scheduler', title: '排程器如何選擇節點', html: `
<p>kube-scheduler 為每個新的 Pod 分兩步選節點：<b>過濾</b>（Filter）找出放得下、符合條件的節點，再<b>評分</b>（Score）選出最適合的。過濾時看的是節點剩餘的 <b>requests</b>，不是實際使用量：</p>
<pre class="js">const nodes = [
  { name: 'node-a', cpu: 2000, mem: 4096, usedCpu: 1500, usedMem: 1024, labels: { disk: 'ssd' } },
  { name: 'node-b', cpu: 4000, mem: 8192, usedCpu: 1000, usedMem: 6144, labels: { disk: 'hdd' } },
  { name: 'node-c', cpu: 4000, mem: 8192, usedCpu: 2500, usedMem: 2048, labels: { disk: 'ssd' }, taints: ['dedicated=gpu'] },
];
function schedule(pod) {
  const reasons = [];
  const fit = nodes.filter(n =&gt; {
    if (n.cpu - n.usedCpu &lt; pod.cpu) return reasons.push(\`\${n.name}：CPU 不足\`), false;
    if (n.mem - n.usedMem &lt; pod.mem) return reasons.push(\`\${n.name}：記憶體不足\`), false;
    for (const [k, v] of Object.entries(pod.nodeSelector ?? {})) if (n.labels[k] !== v) return reasons.push(\`\${n.name}：標籤 \${k}≠\${v}\`), false;
    for (const t of n.taints ?? []) if (!(pod.tolerations ?? []).includes(t)) return reasons.push(\`\${n.name}：有 taint \${t}\`), false;
    return true;
  });
  if (!fit.length) return \`Pending（\${reasons.join('；')}）\`;
  // 評分：選擇放進去之後剩餘資源比例最高的節點（讓負載平均）
  const score = n =&gt; ((n.cpu - n.usedCpu - pod.cpu) / n.cpu + (n.mem - n.usedMem - pod.mem) / n.mem) / 2;
  const best = fit.sort((a, b) =&gt; score(b) - score(a))[0];
  best.usedCpu += pod.cpu; best.usedMem += pod.mem;
  return \`→ \${best.name}\` + (reasons.length ? \`（排除：\${reasons.join('；')}）\` : '');
}
console.log('api-1（500m, 512Mi）', schedule({ cpu: 500, mem: 512 }));
console.log('api-2（500m, 512Mi）', schedule({ cpu: 500, mem: 512 }));
console.log('db（1000m, 2Gi, 要 SSD）', schedule({ cpu: 1000, mem: 2048, nodeSelector: { disk: 'ssd' } }));
console.log('ml（1000m, 1Gi, 容忍 GPU taint）', schedule({ cpu: 1000, mem: 1024, tolerations: ['dedicated=gpu'] }));
console.log('big（3000m, 4Gi）', schedule({ cpu: 3000, mem: 4096 }));</pre>
<p>db 需要 SSD 節點，但 node-a 的 CPU 已經被前兩個 Pod 用完、node-c 有 taint，所以找不到節點；big 則是每個節點都放不下。找不到節點的 Pod 會停在 <b>Pending</b>，kubectl describe pod 會看到「Insufficient cpu」之類的事件。這時要加節點（或由叢集自動擴展器自動加），或降低 requests。互動練習中的「排程模擬」可以自己調整節點與 Pod。</p>` },
    { id: 'placement', title: '控制 Pod 放在哪裡', html: `
<table>
<tr><th>機制</th><th>說明</th><th>例子</th></tr>
<tr><td>nodeSelector</td><td>只能放在有指定標籤的節點</td><td>disk: ssd</td></tr>
<tr><td>節點親和性</td><td>更有彈性的規則，可分「必須」與「偏好」</td><td>偏好放在某個可用區</td></tr>
<tr><td>Pod 反親和性</td><td>讓同一服務的副本分散到不同節點或可用區</td><td>避免一台機器故障就全部掛掉</td></tr>
<tr><td>taint 與 toleration</td><td>節點設定「排斥」，只有容忍這個 taint 的 Pod 能放上去</td><td>GPU 節點只給機器學習工作使用</td></tr>
<tr><td>topologySpreadConstraints</td><td>讓 Pod 平均分散在各可用區</td><td>三個可用區各一個副本</td></tr>
</table>
<pre class="out">$ kubectl taint nodes node-c dedicated=gpu:NoSchedule
# Pod 中加上 toleration 才能排到 node-c
tolerations:
  - { key: dedicated, operator: Equal, value: gpu, effect: NoSchedule }

# Namespace 的資源配額：限制整個團隊最多能申請多少資源
apiVersion: v1
kind: ResourceQuota
metadata: { name: team-quota, namespace: todo }
spec:
  hard: { requests.cpu: "8", requests.memory: 16Gi, pods: "50" }</pre>
<p>taint 是「排斥」，toleration 是「容忍」，容忍不代表一定會放上去；要「一定」放在某些節點，要搭配 nodeSelector 或節點親和性。</p>` }
  ],
  keypoints: [
    'CPU 單位是核（250m ＝ 0.25 核），記憶體常用 Mi、Gi。',
    'requests 是排程依據，limits 是執行上限；CPU 超過被節流，記憶體超過被 OOMKilled。',
    'QoS：Guaranteed（requests ＝ limits）、Burstable、BestEffort（都沒設，最先被驅逐）。',
    '排程器先過濾（資源、標籤、taint）再評分；找不到節點的 Pod 停在 Pending。',
    'nodeSelector 與親和性決定放哪裡；Pod 反親和性與拓撲分散讓副本分散。',
    'taint 排斥、toleration 容忍；ResourceQuota 限制 Namespace 的資源總量。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 50,
  title: '健康檢查與自動擴展',
  summary: 'startup、readiness、liveness 三種探針的差別與設定、探針的常見錯誤、HorizontalPodAutoscaler 的運作與計算公式、metrics-server、叢集自動擴展，以及 PodDisruptionBudget。',
  sections: [
    { id: 'probes', title: '三種探針', html: `
<table>
<tr><th>探針</th><th>回答的問題</th><th>失敗時</th></tr>
<tr><td><b>startupProbe</b></td><td>應用程式啟動完成了嗎？</td><td>成功前不執行其他探針；超過次數就重啟容器</td></tr>
<tr><td><b>readinessProbe</b></td><td>現在可以接收流量嗎？</td><td>從 Service 的後端移除（不重啟），恢復後再加回來</td></tr>
<tr><td><b>livenessProbe</b></td><td>程式還活著嗎？（是否卡死）</td><td>重啟容器</td></tr>
</table>
<pre class="out">containers:
  - name: api
    startupProbe:
      httpGet: { path: /health, port: 3000 }
      periodSeconds: 5
      failureThreshold: 24              # 最多等 5 × 24 ＝ 120 秒啟動
    readinessProbe:
      httpGet: { path: /ready, port: 3000 }   # 檢查資料庫連線等相依服務
      periodSeconds: 5
      failureThreshold: 2
    livenessProbe:
      httpGet: { path: /health, port: 3000 }  # 只檢查程式本身，不檢查相依服務
      periodSeconds: 10
      failureThreshold: 3</pre>
<div class="box warn"><b class="t">liveness 探針的常見錯誤</b>如果 liveness 探針檢查資料庫，資料庫一短暫不穩，所有 API 的 Pod 會同時被重啟，問題反而擴大。liveness 只檢查「程式本身是否卡死」；相依服務的狀態交給 readiness，讓暫時無法服務的 Pod 不接流量就好。另外，沒有 startupProbe 而 liveness 太嚴格時，啟動較慢的應用會在啟動中就被反覆重啟。</div>` },
    { id: 'hpa', title: 'HorizontalPodAutoscaler', html: `
<p><b>HPA</b>（水平自動擴展）依指標自動調整 Deployment 的副本數。它的核心公式：</p>
<pre class="out">期望副本數 ＝ 無條件進位（目前副本數 × 目前指標值 ÷ 目標指標值）

apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: todo-api }
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: todo-api }
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target: { type: Utilization, averageUtilization: 60 }   # 以 requests 為基準的百分比</pre>
<pre class="js">function hpa({ current, metric, target, min, max, tolerance = 0.1 }) {
  const ratio = metric / target;
  if (Math.abs(ratio - 1) &lt;= tolerance) return { desired: current, note: '在容忍範圍 ±10% 內，不調整' };
  const raw = Math.ceil(current * ratio);
  const desired = Math.min(max, Math.max(min, raw));
  return { desired, note: raw !== desired ? \`計算值 \${raw}，受限於 \${raw &gt; max ? 'maxReplicas' : 'minReplicas'}\` : '' };
}
const cases = [
  ['尖峰：CPU 平均 90%', { current: 3, metric: 90, target: 60 }],
  ['略高：CPU 平均 64%', { current: 3, metric: 64, target: 60 }],
  ['離峰：CPU 平均 15%', { current: 6, metric: 15, target: 60 }],
  ['爆量：CPU 平均 250%', { current: 4, metric: 250, target: 60 }],
];
for (const [name, c] of cases) {
  const r = hpa({ min: 2, max: 10, ...c });
  console.log(\`\${name.padEnd(16)} 目前 \${c.current} 個 → \${r.desired} 個 \${r.note}\`);
}</pre>
<p>CPU 使用率是相對於 <b>requests</b> 計算的，沒有設定 requests 的 Pod，HPA 無法用 CPU 百分比擴展。HPA 需要叢集安裝 <b>metrics-server</b> 提供 CPU 與記憶體數據；也可以接上自訂指標（例如每秒請求數、佇列長度）。縮減時預設有 5 分鐘的穩定視窗，避免副本數忽上忽下。互動練習中的「HPA 計算機」可以模擬一整天的流量變化。</p>` },
    { id: 'cluster', title: '叢集自動擴展與 PDB', html: `
<table>
<tr><th>擴展方式</th><th>調整的對象</th><th>工具</th></tr>
<tr><td>水平 Pod 擴展</td><td>Pod 的副本數</td><td>HPA、KEDA（依事件與佇列擴展）</td></tr>
<tr><td>垂直 Pod 擴展</td><td>單一 Pod 的 requests／limits</td><td>VPA</td></tr>
<tr><td>叢集擴展</td><td>節點數量：有 Pod Pending 就加節點，節點閒置就移除</td><td>Cluster Autoscaler、Karpenter</td></tr>
</table>
<p>節點維護（升級、縮減）時，Kubernetes 會把節點上的 Pod <b>驅逐</b>到其他節點。<b>PodDisruptionBudget</b>（PDB）保證自願中斷時至少保留多少副本：</p>
<pre class="out">apiVersion: policy/v1
kind: PodDisruptionBudget
metadata: { name: todo-api }
spec:
  minAvailable: 2                    # 或 maxUnavailable: 1
  selector: { matchLabels: { app: todo-api } }

$ kubectl drain node-a --ignore-daemonsets    # 維護前清空節點，會遵守 PDB
$ kubectl uncordon node-a                     # 維護完成，恢復排程</pre>` }
  ],
  keypoints: [
    'startup 判斷啟動完成、readiness 決定是否接流量（失敗不重啟）、liveness 判斷卡死（失敗重啟）。',
    'liveness 不要檢查資料庫等相依服務，避免連鎖重啟；啟動慢的應用要加 startupProbe。',
    'HPA：期望副本 ＝ 無條件進位（目前副本 × 目前值 ÷ 目標值），受 min／max 限制，±10% 內不調整。',
    'CPU 使用率以 requests 為基準；HPA 需要 metrics-server。',
    'Cluster Autoscaler 或 Karpenter 在 Pod Pending 時加節點；VPA 調整單一 Pod 的資源。',
    'PDB 保證節點維護等自願中斷時最少的可用副本；kubectl drain 會遵守 PDB。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 50,
  title: 'Kubernetes 安全',
  summary: '驗證與授權、RBAC 的 Role、ClusterRole 與 Binding、ServiceAccount、Pod 安全標準與 securityContext、NetworkPolicy 限制流量，以及映像檔與供應鏈安全。',
  sections: [
    { id: 'rbac', title: 'RBAC', html: `
<p>所有請求都經過 kube-apiserver：先<b>驗證</b>身分（使用者憑證、雲端身分、ServiceAccount Token），再用 <b>RBAC</b> 檢查是否有權限，最後經過准入控制。</p>
<table>
<tr><th>資源</th><th>範圍</th><th>作用</th></tr>
<tr><td>Role</td><td>單一 Namespace</td><td>定義可以對哪些資源做哪些動作</td></tr>
<tr><td>ClusterRole</td><td>整個叢集</td><td>同上，可用於節點等叢集層級的資源，或在多個 Namespace 重複使用</td></tr>
<tr><td>RoleBinding</td><td>單一 Namespace</td><td>把 Role（或 ClusterRole）授予使用者、群組或 ServiceAccount</td></tr>
<tr><td>ClusterRoleBinding</td><td>整個叢集</td><td>在所有 Namespace 授予權限，要特別小心</td></tr>
</table>
<pre class="out">apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata: { name: deployer, namespace: todo }
rules:
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "update", "patch"]
  - apiGroups: [""]                      # 空字串代表核心 API 群組（Pod、Service…）
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata: { name: ci-deployer, namespace: todo }
subjects: [{ kind: ServiceAccount, name: ci, namespace: todo }]
roleRef: { kind: Role, name: deployer, apiGroup: rbac.authorization.k8s.io }

$ kubectl auth can-i delete pods -n todo --as=system:serviceaccount:todo:ci   # 檢查權限
no</pre>
<pre class="js">// RBAC 是「允許清單」：沒有任何規則允許，就是拒絕
const rules = [
  { apiGroups: ['apps'], resources: ['deployments'], verbs: ['get', 'list', 'watch', 'update', 'patch'] },
  { apiGroups: [''], resources: ['pods', 'pods/log'], verbs: ['get', 'list', 'watch'] },
];
const can = (verb, group, resource) =&gt;
  rules.some(r =&gt; r.apiGroups.includes(group) &amp;&amp; r.resources.includes(resource) &amp;&amp; (r.verbs.includes(verb) || r.verbs.includes('*')));
for (const [v, g, res] of [['patch', 'apps', 'deployments'], ['get', '', 'pods/log'], ['delete', '', 'pods'], ['get', '', 'secrets'], ['create', 'apps', 'deployments']]) {
  console.log(\`\${v} \${g || 'core'}/\${res}\`.padEnd(28), can(v, g, res) ? '允許' : '拒絕');
}</pre>
<p>遵守<b>最小權限原則</b>：CI 部署帳號只需要更新 Deployment，不需要讀取 Secret 或刪除 Namespace。避免隨便授予 cluster-admin。</p>` },
    { id: 'sa', title: 'ServiceAccount', html: `
<p>人類使用者用 User，<b>Pod 裡的程式</b>呼叫 Kubernetes API 則用 <b>ServiceAccount</b>。每個 Namespace 有 default ServiceAccount，Pod 預設使用它。</p>
<ul>
<li>大多數應用不需要呼叫 Kubernetes API，可以設定 automountServiceAccountToken: false，不把 Token 掛進 Pod。</li>
<li>需要的應用（例如 CI 工具、Operator）建立專屬的 ServiceAccount，用 RoleBinding 授予最小權限。</li>
<li>雲端代管服務可以把 ServiceAccount 對應到雲端的 IAM 角色，讓 Pod 不用存放雲端金鑰就能存取 S3 等服務。</li>
</ul>` },
    { id: 'pss', title: 'Pod 安全標準', html: `
<p><b>Pod 安全標準</b>定義三個等級，透過內建的 Pod Security Admission 以 Namespace 標籤啟用：</p>
<table>
<tr><th>等級</th><th>說明</th></tr>
<tr><td>privileged</td><td>不限制（系統元件才需要）</td></tr>
<tr><td>baseline</td><td>禁止已知的提權方式，例如特權容器、使用主機網路</td></tr>
<tr><td>restricted</td><td>最嚴格：必須以非 root 執行、禁止提權、移除 Linux capabilities 等</td></tr>
</table>
<pre class="out">$ kubectl label namespace todo pod-security.kubernetes.io/enforce=restricted

# 符合 restricted 的 securityContext
spec:
  securityContext:
    runAsNonRoot: true
    seccompProfile: { type: RuntimeDefault }
  containers:
    - name: api
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true      # 根檔案系統唯讀，需要寫入的目錄用 emptyDir
        capabilities: { drop: ["ALL"] }</pre>` },
    { id: 'netpol', title: 'NetworkPolicy 與供應鏈安全', html: `
<p>預設情況下，叢集內所有 Pod 都可以互相連線。如果 API 被入侵，攻擊者可以直接連到資料庫或其他服務。<b>NetworkPolicy</b> 用標籤限制流量：</p>
<pre class="out"># 只允許 todo-api 連到 postgres 的 5432 連接埠，其他 Pod 一律拒絕
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata: { name: postgres-allow-api, namespace: todo }
spec:
  podSelector: { matchLabels: { app: postgres } }
  policyTypes: [Ingress]
  ingress:
    - from: [{ podSelector: { matchLabels: { app: todo-api } } }]
      ports: [{ protocol: TCP, port: 5432 }]</pre>
<p>NetworkPolicy 需要支援它的網路外掛（CNI，例如 Calico、Cilium）才會生效。常見做法是先對 Namespace 設定「預設拒絕全部」，再逐一開放需要的流量。</p>
<table>
<tr><th>供應鏈安全</th><th>做法</th></tr>
<tr><td>使用可信任的基礎映像檔</td><td>官方或精簡映像檔（slim、distroless），減少攻擊面</td></tr>
<tr><td>掃描漏洞</td><td>在 CI 中用 Trivy 等工具掃描映像檔</td></tr>
<tr><td>固定版本</td><td>不要使用 latest 標籤；更嚴格可以用摘要（image@sha256:…）</td></tr>
<tr><td>簽章驗證</td><td>用 Sigstore／cosign 簽署映像檔，准入控制只允許簽署過的映像檔</td></tr>
</table>` }
  ],
  keypoints: [
    '請求經過驗證 → RBAC 授權 → 准入控制；RBAC 是允許清單，沒有規則就拒絕。',
    'Role／RoleBinding 限於 Namespace，ClusterRole／ClusterRoleBinding 範圍是整個叢集。',
    '遵守最小權限原則；kubectl auth can-i 檢查權限；避免隨便授予 cluster-admin。',
    'Pod 內的程式用 ServiceAccount；不需要 API 的應用關閉自動掛載 Token。',
    'Pod 安全標準：privileged、baseline、restricted，以 Namespace 標籤啟用。',
    'NetworkPolicy 限制 Pod 之間的流量（需要支援的 CNI）；映像檔要掃描、固定版本、可簽章。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 50,
  title: 'Helm、GitOps 與故障排除',
  summary: '用 Helm 與 Kustomize 管理多環境設定、GitOps 與 Argo CD、CI/CD 部署流程、監控與日誌、Pod 常見故障的排除步驟，以及 CKA 與 CKAD 證照簡介。',
  sections: [
    { id: 'helm', title: 'Helm 與 Kustomize', html: `
<p>一個應用常包含 Deployment、Service、ConfigMap、Ingress、HPA 等十幾個 YAML，而且開發、測試、正式環境只差一些數值。兩種常見的管理方式：</p>
<table>
<tr><th>工具</th><th>做法</th><th>適合</th></tr>
<tr><td><b>Helm</b></td><td>用範本（Chart）加上 values 檔產生 YAML，可以打包發布、版本管理、回滾</td><td>安裝第三方軟體（資料庫、監控）、發布可重複使用的應用</td></tr>
<tr><td><b>Kustomize</b></td><td>不用範本，以 base 加上各環境的 overlay 修補 YAML；kubectl 內建（kubectl apply -k）</td><td>自家應用的多環境設定</td></tr>
</table>
<pre class="out"># Helm：安裝現成的 Chart
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install redis bitnami/redis -n todo --set architecture=standalone
$ helm list -n todo
$ helm upgrade redis bitnami/redis -n todo -f values-prod.yaml
$ helm rollback redis 1 -n todo

# 自己的 Chart：templates/deployment.yaml 片段
spec:
  replicas: {{ .Values.replicas }}
  template:
    spec:
      containers:
        - name: api
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"

# values-prod.yaml
replicas: 4
image: { repository: ghcr.io/example/todo-api, tag: 1.5.0 }</pre>` },
    { id: 'gitops', title: 'GitOps 與 CI/CD', html: `
<pre class="out">開發者推送程式碼 → CI：測試、建置映像檔、掃描漏洞、推送到映像檔倉庫（tag：git commit SHA）
                → 更新設定倉庫中的映像檔版本（例如 values-prod.yaml 的 image.tag）
                → GitOps 工具（Argo CD、Flux）偵測到 Git 變更，自動同步到叢集
                → 叢集狀態和 Git 不一致時（有人手動改了）會顯示差異並可自動修正</pre>
<p><b>GitOps</b> 把 Git 當作叢集期望狀態的唯一來源：所有變更都經過 Pull Request 審查、有完整歷史紀錄，回滾就是 git revert。CI 也不需要持有叢集的管理權限，安全性更好。這和第 1 章的「宣告式」與第 3 章的「控制迴圈」是同一個概念，只是把期望狀態放在 Git。</p>` },
    { id: 'observe', title: '監控與日誌', html: `
<table>
<tr><th>面向</th><th>常用工具</th><th>看什麼</th></tr>
<tr><td>指標（Metrics）</td><td>Prometheus ＋ Grafana</td><td>CPU、記憶體、請求數、錯誤率、延遲、Pod 重啟次數</td></tr>
<tr><td>日誌（Logs）</td><td>Fluent Bit ＋ Loki 或 Elasticsearch、雲端日誌服務</td><td>應用輸出到 stdout 的日誌，集中搜尋</td></tr>
<tr><td>追蹤（Traces）</td><td>OpenTelemetry ＋ Jaeger／Tempo</td><td>一個請求經過哪些服務、哪裡變慢</td></tr>
</table>
<p>應用程式只要把日誌<b>輸出到 stdout／stderr</b>（不要寫進容器內的檔案），Kubernetes 與日誌收集器就能處理。kubectl logs 只能看到目前節點上保留的日誌，Pod 刪除後就沒了，正式環境一定要集中收集。</p>` },
    { id: 'debug', title: '故障排除', html: `
<p>除錯的基本流程：<b>get</b> 看狀態 → <b>describe</b> 看事件 → <b>logs</b> 看程式輸出。</p>
<table>
<tr><th>狀態</th><th>常見原因</th><th>怎麼查</th></tr>
<tr><td><b>Pending</b></td><td>資源不足、nodeSelector／taint 不符、PVC 無法綁定</td><td>describe pod 的 Events：Insufficient cpu、didn't match node selector</td></tr>
<tr><td><b>ImagePullBackOff</b></td><td>映像檔名稱或標籤打錯、私有倉庫沒有 imagePullSecrets</td><td>describe pod；確認映像檔是否存在</td></tr>
<tr><td><b>CrashLoopBackOff</b></td><td>程式啟動就崩潰：缺少環境變數、連不到資料庫、指令錯誤</td><td>logs --previous 看崩潰前的輸出</td></tr>
<tr><td><b>OOMKilled</b></td><td>記憶體超過 limits</td><td>describe pod 的 Last State；調高 limits 或修正記憶體洩漏</td></tr>
<tr><td>Running 但無法連線</td><td>Service 選擇器和 Pod 標籤不符、targetPort 錯誤、readiness 失敗</td><td>kubectl get endpointslices；port-forward 直接測 Pod</td></tr>
</table>
<pre class="out">$ kubectl get pods -n todo
NAME                        READY   STATUS             RESTARTS      AGE
todo-api-6d8f9b7c4d-x2k9p   0/1     CrashLoopBackOff   5 (30s ago)   4m

$ kubectl logs todo-api-6d8f9b7c4d-x2k9p -n todo --previous
Error: 缺少 JWT_SECRET                       ← 第 10 章 Node.js 設定檢查發揮作用

$ kubectl describe svc todo-api -n todo       # 看 Endpoints 是否為空
$ kubectl get events -n todo --sort-by=.lastTimestamp
$ kubectl run tmp --rm -it --image=busybox -- wget -qO- http://todo-api.todo/health   # 從叢集內部測試</pre>
<pre class="js">// 依症狀判斷下一步（互動練習「Pod 故障排除」的簡化版）
const diagnose = ({ status, restarts, endpoints }) =&gt; {
  if (status === 'Pending') return '看 describe 的 Events：資源不足、選擇器、taint 或 PVC';
  if (/ImagePull|ErrImage/.test(status)) return '檢查映像檔名稱、標籤與 imagePullSecrets';
  if (status === 'CrashLoopBackOff') return 'kubectl logs --previous 看崩潰原因';
  if (status === 'OOMKilled') return '調高記憶體 limits 或檢查記憶體洩漏';
  if (status === 'Running' &amp;&amp; endpoints === 0) return 'Service 沒有後端：檢查選擇器、標籤與 readiness';
  if (status === 'Running' &amp;&amp; restarts &gt; 3) return '可能是 liveness 探針太嚴格，或程式偶發崩潰';
  return '狀態正常，從應用日誌與指標找問題';
};
for (const s of [{ status: 'Pending' }, { status: 'CrashLoopBackOff' }, { status: 'Running', endpoints: 0 }, { status: 'Running', restarts: 12, endpoints: 3 }]) {
  console.log(JSON.stringify(s).padEnd(44), '→', diagnose(s));
}</pre>
<div class="box tip"><b class="t">CKA 與 CKAD</b>CKA（Certified Kubernetes Administrator）偏重叢集管理：安裝與升級、網路、儲存、故障排除；CKAD（Certified Kubernetes Application Developer）偏重部署應用：Pod 設計、設定、探針、Service。兩者都是在真實叢集上限時操作的實作考試，可以查閱官方文件。熟練 kubectl 指令與 --dry-run=client -o yaml 產生樣板，是節省時間的關鍵。考試範圍、時間與及格分數請以 Linux Foundation 官方公告為準。</div>` }
  ],
  keypoints: [
    'Helm 用 Chart 範本加 values 產生 YAML，可安裝、升級、回滾；Kustomize 用 base 加 overlay，kubectl apply -k。',
    'GitOps：Git 是期望狀態的唯一來源，Argo CD 或 Flux 自動同步到叢集，回滾就是 git revert。',
    'CI 建置並推送以 commit SHA 標記的映像檔，再更新設定倉庫中的版本。',
    '監控三面向：指標（Prometheus、Grafana）、日誌（輸出到 stdout 並集中收集）、追蹤（OpenTelemetry）。',
    '除錯流程：get → describe → logs --previous；Pending 看事件、CrashLoopBackOff 看日誌、無法連線看 EndpointSlice。',
    'CKA 偏叢集管理、CKAD 偏應用部署，都是限時的實作考試。'
  ]
}
);
