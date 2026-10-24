/* DevOps 入門 容器篇：Docker 與容器化
   <pre class="out"> 為指令與設定檔範例；程式碼內的 < > & 寫成 &lt; &gt; &amp; */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 35,
  title: 'DevOps 概念與工具鏈',
  summary: '什麼是 DevOps、開發與維運之間的問題、CI／CD 管線、DORA 四大指標、DevOps 工具鏈全貌、相關職缺，以及本課程的學習路線。',
  sections: [
    { id: 'what', title: '什麼是 DevOps', html: `
<p>傳統上「開發（Development）」負責寫程式，「維運（Operations）」負責部署與維持系統穩定。兩邊目標不同：開發想快速上線新功能，維運想避免任何變動造成故障，結果常常互相推卸，上線一次要好幾週。</p>
<p><b>DevOps</b> 是一套結合文化、做法與工具的方法，目標是讓團隊<strong>更快、更頻繁、更穩定地交付軟體</strong>，出了問題也能快速恢復。</p>
<table>
<tr><th>傳統做法</th><th>DevOps 做法</th></tr>
<tr><td>幾個月上線一次大版本</td><td>每天或每週上線小幅修改</td></tr>
<tr><td>手動部署，照著文件一步步做</td><td>自動化部署，按一個按鈕或推送程式碼就完成</td></tr>
<tr><td>「在我電腦上可以跑」</td><td>用容器確保開發、測試、正式環境一致</td></tr>
<tr><td>手動在主控台建立伺服器</td><td>基礎架構即程式碼，可重複、可審查</td></tr>
<tr><td>出事才知道，使用者先發現</td><td>監控與告警，問題發生時自動通知</td></tr>
</table>
<div class="box tip"><b class="t">DevOps 不只是工具</b>導入 Docker、Kubernetes 不等於做到 DevOps。核心是團隊共同為產品負責、自動化重複工作、小步快跑並持續改善。工具是實現這些理念的手段。</div>` },
    { id: 'pipeline', title: 'CI／CD 管線', html: `
<div class="flow">
  <div><b>寫程式</b><span>Git 分支開發</span></div>
  <div><b>推送與 PR</b><span>GitHub</span></div>
  <div><b>持續整合 CI</b><span>自動建置、測試、檢查</span></div>
  <div><b>建置映像</b><span>Docker 映像推送到登錄庫</span></div>
  <div><b>持續部署 CD</b><span>自動部署到測試或正式環境</span></div>
  <div><b>監控</b><span>指標、日誌、告警</span></div>
</div>
<table>
<tr><th>名詞</th><th>意思</th></tr>
<tr><td><b>持續整合</b> CI（Continuous Integration）</td><td>開發者頻繁把程式碼合併到主分支，每次都自動建置與測試，及早發現問題</td></tr>
<tr><td><b>持續交付</b> Continuous Delivery</td><td>每次修改都自動準備好可以部署的版本，正式上線前由人按下確認</td></tr>
<tr><td><b>持續部署</b> Continuous Deployment</td><td>通過所有測試後自動部署到正式環境，不需要人工介入</td></tr>
</table>` },
    { id: 'dora', title: 'DORA 四大指標', html: `
<p>Google 的 DORA 研究團隊整理出四個衡量軟體交付表現的指標，前兩個代表<b>速度</b>，後兩個代表<b>穩定性</b>：</p>
<table>
<tr><th>指標</th><th>意思</th><th>高績效團隊的樣子</th></tr>
<tr><td><b>部署頻率</b></td><td>多久部署一次到正式環境</td><td>需要時隨時部署，一天多次</td></tr>
<tr><td><b>變更前置時間</b></td><td>從提交程式碼到上線要多久</td><td>一天以內</td></tr>
<tr><td><b>變更失敗率</b></td><td>部署後造成故障需要修復的比例</td><td>低</td></tr>
<tr><td><b>服務恢復時間</b></td><td>故障發生到恢復需要多久</td><td>一小時以內</td></tr>
</table>
<div class="box memo"><b class="t">速度與穩定可以兼得</b>研究發現，表現好的團隊通常速度快、穩定性也高。原因是小幅、頻繁的變更比較容易測試，出問題時也容易找到原因與回滾。</div>` },
    { id: 'tools', title: '工具鏈與學習路線', html: `
<table>
<tr><th>階段</th><th>常見工具</th><th>本站課程</th></tr>
<tr><td>版本控制與協作</td><td>Git、GitHub、GitLab</td><td>Git 版本控制</td></tr>
<tr><td>作業系統與命令列</td><td>Linux、Bash</td><td>Linux 系統管理實務</td></tr>
<tr><td>容器化</td><td>Docker、Docker Compose</td><td>本課程第 2～5 章</td></tr>
<tr><td>CI／CD</td><td>GitHub Actions、GitLab CI、Jenkins</td><td>本課程第 6 章</td></tr>
<tr><td>部署與編排</td><td>雲端服務、Kubernetes</td><td>本課程第 7～8 章、AWS 課程</td></tr>
<tr><td>基礎架構即程式碼</td><td>Terraform、CloudFormation、Ansible</td><td>本課程第 9 章</td></tr>
<tr><td>監控與日誌</td><td>Prometheus、Grafana、ELK、CloudWatch</td><td>本課程第 10 章</td></tr>
</table>
<h3>相關職缺</h3>
<ul>
  <li><b>DevOps 工程師</b>：建置 CI／CD、自動化部署與基礎架構。</li>
  <li><b>SRE 網站可靠性工程師</b>：以軟體工程方法維持系統可靠，重視監控、SLO 與事件處理。</li>
  <li><b>雲端工程師</b>：設計與維運雲端架構。</li>
  <li><b>平台工程師</b>：打造讓開發團隊自助部署的內部平台。</li>
</ul>
<p>在 104 搜尋這些職缺，常見要求是 Linux、Docker、Kubernetes、CI／CD、雲端（AWS／GCP／Azure）、Terraform，以及 Python 或 Shell 腳本能力。</p>` }
  ],
  keypoints: [
    'DevOps 結合文化、做法與工具，讓軟體交付更快、更頻繁、更穩定',
    'CI：頻繁合併並自動建置測試；持續交付：隨時可部署；持續部署：自動上線',
    'CI／CD 管線：提交 → 測試 → 建置映像 → 部署 → 監控',
    'DORA 四指標：部署頻率、變更前置時間、變更失敗率、服務恢復時間',
    '小幅頻繁的變更讓速度與穩定兼得',
    '工具鏈：Git、Linux、Docker、GitHub Actions、Kubernetes、Terraform、監控',
    '相關職缺：DevOps 工程師、SRE、雲端工程師、平台工程師'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: 'Docker 基礎',
  summary: '容器解決什麼問題、容器與虛擬機的差別、映像、容器與登錄庫、安裝 Docker、常用指令、埠號對應、環境變數，以及容器的生命週期。',
  sections: [
    { id: 'why', title: '容器解決什麼問題', html: `
<p>「在我電腦上可以跑，為什麼到伺服器就不行？」原因通常是作業系統、套件版本、設定不同。<b>容器（Container）</b>把應用程式和它需要的所有東西（執行環境、函式庫、設定）打包在一起，在任何安裝了 Docker 的機器上都能以相同方式執行。</p>
<div class="box analogy"><b class="t">生活比喻</b>容器就像貨櫃：不管裡面裝的是家具還是水果，貨櫃的尺寸都一樣，可以用同一套吊車、貨輪、卡車運送。Docker 容器不管裡面是 Python、Java 還是 Node.js，都用同樣的方式啟動、停止、部署。</div>
<h3>容器與虛擬機</h3>
<table>
<tr><th>比較</th><th>虛擬機 VM</th><th>容器 Container</th></tr>
<tr><td>虛擬化的層級</td><td>虛擬整台電腦，每個 VM 有完整的作業系統</td><td>共用主機的作業系統核心，只隔離程式與檔案</td></tr>
<tr><td>大小</td><td>數 GB</td><td>數十到數百 MB</td></tr>
<tr><td>啟動時間</td><td>數十秒到數分鐘</td><td>約一秒</td></tr>
<tr><td>隔離程度</td><td>較高</td><td>較低（共用核心）</td></tr>
<tr><td>適合</td><td>需要不同作業系統、強隔離</td><td>部署應用程式、微服務</td></tr>
</table>` },
    { id: 'concepts', title: '映像、容器與登錄庫', html: `
<div class="concepts">
  <div class="concept"><b>映像 Image</b><span>唯讀的範本，包含執行應用程式所需的一切，由多個「層」組成。例如 python:3.12-slim、nginx:1.27。</span></div>
  <div class="concept"><b>容器 Container</b><span>由映像啟動的執行實例。同一個映像可以啟動多個容器，各自獨立。</span></div>
  <div class="concept"><b>登錄庫 Registry</b><span>存放與分享映像的地方，例如 Docker Hub、GitHub Container Registry、AWS ECR。</span></div>
  <div class="concept"><b>Dockerfile</b><span>描述如何建置映像的文字檔（第 3 章）。</span></div>
</div>
<div class="flow">
  <div><b>Dockerfile</b><span>建置說明</span></div>
  <div><b>docker build</b><span>產生映像</span></div>
  <div><b>docker push</b><span>上傳到登錄庫</span></div>
  <div><b>docker pull／run</b><span>在任何機器下載並執行</span></div>
</div>
<div class="box memo"><b class="t">記憶口訣</b>「<b>映像是類別，容器是物件</b>」：如果你學過 Python 物件導向，映像就像類別（設計圖），容器就像依照類別建立的物件。</div>
<p>映像名稱的格式是 <code>登錄庫/名稱:標籤</code>，例如 <code>ghcr.io/myteam/shop-api:1.4.2</code>。省略標籤時預設為 <code>latest</code>，但正式環境<b>不建議使用 latest</b>，因為無法確定實際是哪一版。</p>` },
    { id: 'install', title: '安裝與第一個容器', html: `
<table>
<tr><th>系統</th><th>安裝方式</th></tr>
<tr><td>Windows、macOS</td><td>安裝 <b>Docker Desktop</b>（Windows 需啟用 WSL 2）。注意：員工數或營收超過一定規模的企業使用 Docker Desktop 需付費訂閱，請依官方授權條款確認</td></tr>
<tr><td>Linux（Ubuntu）</td><td>依官方文件安裝 Docker Engine，並把使用者加入 docker 群組</td></tr>
</table>
<pre class="out">docker --version
docker run hello-world                     # 下載並執行測試用映像

docker run -d -p 8080:80 --name web nginx  # 背景執行 nginx，主機 8080 對應容器 80
# 開啟瀏覽器 http://localhost:8080 就能看到 nginx 歡迎頁</pre>
<table>
<tr><th>參數</th><th>意思</th></tr>
<tr><td><code>-d</code></td><td>在背景執行（detached）</td></tr>
<tr><td><code>-p 主機埠:容器埠</code></td><td>埠號對應，讓外部可以連到容器內的服務</td></tr>
<tr><td><code>--name</code></td><td>容器名稱，沒指定會隨機產生</td></tr>
<tr><td><code>-e 變數=值</code></td><td>設定環境變數</td></tr>
<tr><td><code>--rm</code></td><td>容器停止後自動刪除</td></tr>
<tr><td><code>-it</code></td><td>互動模式並配置終端機，例如進入 shell</td></tr>
<tr><td><code>-v</code></td><td>掛載 volume 或資料夾（第 5 章）</td></tr>
</table>` },
    { id: 'commands', title: '常用指令', html: `
<pre class="out"># 映像
docker images                  # 列出本機映像
docker pull python:3.12-slim   # 下載映像
docker rmi 映像                 # 刪除映像

# 容器
docker ps                      # 執行中的容器
docker ps -a                   # 所有容器（含已停止）
docker stop web                # 停止
docker start web               # 再次啟動已停止的容器
docker restart web
docker rm web                  # 刪除已停止的容器（-f 強制刪除執行中的）

# 查看與除錯
docker logs web                # 查看輸出日誌（-f 持續追蹤）
docker exec -it web sh         # 在執行中的容器開啟 shell
docker inspect web             # 詳細設定（IP、掛載、環境變數）
docker stats                   # 即時資源使用量

# 一次性執行
docker run --rm -it python:3.12-slim python   # 進入 Python，離開後容器自動刪除</pre>
<h3>容器的生命週期</h3>
<div class="flow">
  <div><b>Created</b><span>docker create</span></div>
  <div><b>Running</b><span>docker start／run</span></div>
  <div><b>Stopped（Exited）</b><span>docker stop 或程式結束</span></div>
  <div><b>Removed</b><span>docker rm</span></div>
</div>
<div class="box warn"><b class="t">容器內的資料會消失</b>刪除容器後，容器裡寫入的檔案也會一起消失。資料庫資料、使用者上傳的檔案，必須存到 volume（第 5 章）。</div>
<div class="box memo"><b class="t">動手做</b>用 <code>docker run</code> 啟動 nginx，用 <code>docker exec</code> 進去修改 <code>/usr/share/nginx/html/index.html</code> 的內容並重新整理瀏覽器；再刪除容器重新建立，觀察修改是否還在。</div>` }
  ],
  keypoints: [
    '容器把應用程式與執行環境打包，在任何裝有 Docker 的機器上一致執行',
    '容器共用主機核心，比虛擬機小、啟動快，但隔離程度較低',
    '映像是唯讀範本，容器是執行實例，登錄庫用來存放與分享映像',
    '映像名稱格式 登錄庫/名稱:標籤，正式環境不要依賴 latest',
    'docker run -d -p 主機埠:容器埠 --name 名稱 映像',
    'docker ps、logs、exec -it、stop、rm 是最常用的指令',
    '刪除容器時容器內的資料會消失，需保留的資料要用 volume'
  ]
},
{
  id: 'c03', subject: 1, minutes: 50,
  title: 'Dockerfile 與映像建置',
  summary: 'Dockerfile 常用指令、為 Python 應用程式撰寫 Dockerfile、層快取與指令順序、.dockerignore、多階段建置、縮小映像、安全做法、標籤與推送到登錄庫。',
  sections: [
    { id: 'basic', title: 'Dockerfile 常用指令', html: `
<table>
<tr><th>指令</th><th>作用</th></tr>
<tr><td><code>FROM</code></td><td>基底映像，每個 Dockerfile 都從這裡開始</td></tr>
<tr><td><code>WORKDIR</code></td><td>設定工作目錄（不存在會自動建立）</td></tr>
<tr><td><code>COPY</code></td><td>從建置環境複製檔案到映像</td></tr>
<tr><td><code>RUN</code></td><td>建置時執行指令，例如安裝套件，每個 RUN 產生一層</td></tr>
<tr><td><code>ENV</code></td><td>設定環境變數</td></tr>
<tr><td><code>EXPOSE</code></td><td>標示容器使用的埠號（說明用途，實際對應仍靠 -p）</td></tr>
<tr><td><code>USER</code></td><td>之後的指令與容器以哪個使用者身分執行</td></tr>
<tr><td><code>CMD</code></td><td>容器啟動時預設執行的指令，可被 docker run 後面的參數覆蓋</td></tr>
<tr><td><code>ENTRYPOINT</code></td><td>容器固定執行的主程式，CMD 變成它的預設參數</td></tr>
</table>` },
    { id: 'python', title: '為 Python 應用程式寫 Dockerfile', html: `
<pre class="out">專案結構：
shop-api/
├── app.py
├── requirements.txt
├── Dockerfile
└── .dockerignore</pre>
<pre class="out"># Dockerfile
FROM python:3.12-slim

WORKDIR /app

# 先只複製套件清單並安裝 —— 程式碼常改、套件少改，這樣才能善用快取
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 再複製程式碼
COPY . .

# 不要用 root 執行
RUN useradd --create-home appuser
USER appuser

EXPOSE 8000
CMD ["python", "app.py"]</pre>
<pre class="out">docker build -t shop-api:1.0 .        # 最後的 . 是建置環境（Build Context）
docker run -d -p 8000:8000 shop-api:1.0
docker history shop-api:1.0           # 查看每一層的大小</pre>
<div class="box tip"><b class="t">CMD 的寫法</b>建議使用 JSON 陣列格式 <code>CMD ["python", "app.py"]</code>。這種寫法程式會直接成為容器的主程序，能正確接收 docker stop 送出的停止訊號，好好收尾再結束。</div>` },
    { id: 'cache', title: '層快取與指令順序', html: `
<p>映像由多個<b>層（Layer）</b>組成，Dockerfile 的每個指令產生一層。重新建置時，Docker 由上往下檢查每一層：輸入沒變就直接使用快取；<strong>某一層改變了，它和之後所有的層都要重新建置</strong>。</p>
<table>
<tr><th>不好的寫法</th><th>好的寫法</th></tr>
<tr><td><pre class="out">COPY . .
RUN pip install -r requirements.txt</pre></td><td><pre class="out">COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .</pre></td></tr>
<tr><td>改一行程式碼，pip install 也要重跑（可能好幾分鐘）</td><td>只改程式碼時，安裝套件那層直接使用快取</td></tr>
</table>
<div class="box memo"><b class="t">記憶口訣</b>「<b>不常變的放前面，常變的放後面</b>」：基底映像 → 系統套件 → 程式套件 → 程式碼。</div>
<div class="box tip"><b class="t">互動練習</b>到「互動練習 → Docker 層快取模擬」比較兩種寫法在「只改程式碼」與「改套件清單」時，各有哪些層要重新建置。</div>` },
    { id: 'small', title: '縮小映像與多階段建置', html: `
<h3>.dockerignore</h3>
<p>建置時，Docker 會把整個資料夾（Build Context）傳給建置引擎。用 .dockerignore 排除不需要的檔案，建置更快、映像更小，也避免把機密放進映像：</p>
<pre class="out">.git
.venv
__pycache__
*.pyc
.env
node_modules
tests/
*.log</pre>
<h3>選擇基底映像</h3>
<table>
<tr><th>基底</th><th>大約大小</th><th>說明</th></tr>
<tr><td><code>python:3.12</code></td><td>約 1 GB</td><td>完整版，工具最齊全</td></tr>
<tr><td><code>python:3.12-slim</code></td><td>約 150 MB</td><td>精簡版，最常用</td></tr>
<tr><td><code>python:3.12-alpine</code></td><td>約 50 MB</td><td>最小，但使用 musl，部分套件需要自己編譯</td></tr>
</table>
<h3>多階段建置</h3>
<p>把「建置」和「執行」分成不同階段：建置階段安裝編譯工具、產生結果；最後的映像只複製需要的檔案，不包含編譯工具與原始碼。前端與 Go、Java 專案特別適合：</p>
<pre class="out"># 第一階段：建置前端
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# 第二階段：只用 nginx 提供建置好的靜態檔案
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# 最終映像不包含 node 與 node_modules，大小從上千 MB 降到數十 MB</pre>` },
    { id: 'security', title: '安全做法與推送映像', html: `
<table>
<tr><th>做法</th><th>原因</th></tr>
<tr><td><b>不要把密碼寫進映像</b></td><td>映像可以被拆開檢視每一層；密碼應在執行時以環境變數或機密管理服務傳入</td></tr>
<tr><td><b>不要用 root 執行</b></td><td>容器被入侵時，降低攻擊者能做的事</td></tr>
<tr><td><b>使用官方或可信任的基底映像</b>，並固定版本</td><td>避免供應鏈攻擊與版本意外變動</td></tr>
<tr><td><b>定期重建並掃描弱點</b></td><td>基底映像會持續修補漏洞；可用 Trivy、Docker Scout 等工具掃描</td></tr>
<tr><td><b>映像越小越好</b></td><td>套件越少，可被利用的漏洞越少</td></tr>
</table>
<h3>標籤與推送</h3>
<pre class="out"># 以 GitHub Container Registry 為例
docker tag shop-api:1.0 ghcr.io/myteam/shop-api:1.0
echo $GHCR_TOKEN | docker login ghcr.io -u 帳號 --password-stdin
docker push ghcr.io/myteam/shop-api:1.0</pre>
<p>常見的標籤策略：語意化版本（<code>1.4.2</code>）方便人閱讀；Git 提交編號（<code>sha-3f2a9c1</code>）可以精確對應程式碼版本。CI 通常同時打上兩種標籤（第 6 章）。</p>
<div class="box memo"><b class="t">動手做</b>為 Python 實戰課的任一作品寫 Dockerfile，比較「先 COPY . .」與「先裝套件」兩種寫法，改一行程式後重新建置的時間差異；再加上 .dockerignore 與非 root 使用者。</div>` }
  ],
  keypoints: [
    'FROM 基底、WORKDIR 工作目錄、COPY 複製、RUN 建置時執行、CMD 啟動指令',
    'CMD 使用 JSON 陣列格式，程式才能正確接收停止訊號',
    '某一層改變時，它與之後所有層都要重建；不常變的放前面',
    '先 COPY requirements.txt 並安裝套件，再 COPY 程式碼',
    '.dockerignore 排除 .git、虛擬環境、.env 等檔案',
    '多階段建置讓最終映像只包含執行所需的檔案；slim 基底大幅縮小映像',
    '不把密碼寫進映像、不用 root 執行、固定基底版本並定期掃描弱點'
  ]
},
{
  id: 'c04', subject: 1, minutes: 45,
  title: 'Docker Compose',
  summary: '為什麼需要 Compose、compose.yaml 的結構、網頁服務加資料庫與快取的範例、服務之間的連線、環境變數與 .env、健康檢查與啟動順序，以及常用指令。',
  sections: [
    { id: 'why', title: '為什麼需要 Compose', html: `
<p>真實的應用程式通常不只一個容器：網頁服務、資料庫、快取、背景工作。用 docker run 一個個啟動，要記住一長串參數，也很難讓團隊成員建立一樣的環境。</p>
<p><b>Docker Compose</b> 用一個 YAML 檔描述整組服務，一個指令就能全部啟動或停止。新同事 clone 專案後執行 <code>docker compose up</code>，幾分鐘內就有完整的開發環境。</p>` },
    { id: 'file', title: 'compose.yaml 範例', html: `
<pre class="out"># compose.yaml（舊名 docker-compose.yml）
services:
  web:
    build: .                          # 用目前資料夾的 Dockerfile 建置
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://shop:\${DB_PASSWORD}@db:5432/shop
      REDIS_URL: redis://cache:6379/0
    depends_on:
      db:
        condition: service_healthy    # 等資料庫健康檢查通過才啟動
      cache:
        condition: service_started
    restart: unless-stopped

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: shop
      POSTGRES_PASSWORD: \${DB_PASSWORD}   # 從 .env 檔讀取
      POSTGRES_DB: shop
    volumes:
      - db-data:/var/lib/postgresql/data  # 資料存在 volume，刪除容器也不會消失
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U shop"]
      interval: 5s
      retries: 10

  cache:
    image: redis:7-alpine

volumes:
  db-data:</pre>
<pre class="out"># .env（與 compose.yaml 放在同一個資料夾，記得加入 .gitignore）
DB_PASSWORD=change-me-please</pre>
<table>
<tr><th>欄位</th><th>說明</th></tr>
<tr><td><code>services</code></td><td>每個服務對應一個（或多個）容器</td></tr>
<tr><td><code>build</code> / <code>image</code></td><td>自己建置映像，或使用現成映像</td></tr>
<tr><td><code>ports</code></td><td>埠號對應 主機:容器</td></tr>
<tr><td><code>environment</code></td><td>環境變數；<code>\${變數}</code> 會從 .env 或系統環境變數帶入</td></tr>
<tr><td><code>volumes</code></td><td>掛載 volume 或資料夾</td></tr>
<tr><td><code>depends_on</code></td><td>啟動順序，可搭配健康檢查條件</td></tr>
<tr><td><code>restart</code></td><td>容器意外結束時是否自動重啟</td></tr>
</table>` },
    { id: 'network', title: '服務之間怎麼連線', html: `
<p>Compose 會自動建立一個專屬網路，同一個 compose 檔中的服務可以<b>直接用服務名稱當作主機名稱</b>互相連線，Docker 會處理名稱解析。</p>
<table>
<tr><th>從哪裡連</th><th>連線位址</th></tr>
<tr><td>web 容器連資料庫</td><td><code>db:5432</code>（不是 localhost）</td></tr>
<tr><td>web 容器連快取</td><td><code>cache:6379</code></td></tr>
<tr><td>你的瀏覽器連 web</td><td><code>localhost:8000</code>（透過 ports 對應）</td></tr>
</table>
<div class="box warn"><b class="t">容器裡的 localhost 是容器自己</b>新手最常見的錯誤：在 web 容器的設定中寫 <code>localhost:5432</code> 連資料庫，結果連不上。容器內的 localhost 指的是容器本身，要改用服務名稱 <code>db</code>。</div>
<div class="box tip"><b class="t">資料庫不一定要開放埠號</b>db 沒有設定 ports，代表只有同一網路的容器能連，外部無法直接存取，比較安全。開發時需要用工具連線再加上 ports。</div>` },
    { id: 'commands', title: '常用指令', html: `
<pre class="out">docker compose up -d            # 背景啟動所有服務（需要時自動建置）
docker compose up -d --build    # 重新建置後啟動
docker compose ps               # 服務狀態
docker compose logs -f web      # 查看某服務的日誌
docker compose exec web sh      # 進入服務的容器
docker compose exec db psql -U shop   # 直接進入資料庫
docker compose restart web
docker compose stop             # 停止但保留容器
docker compose down             # 停止並刪除容器與網路（volume 保留）
docker compose down -v          # 連 volume 一起刪除（資料庫資料會消失！）</pre>
<div class="box warn"><b class="t">down -v 會刪除資料</b>加上 -v 會刪除 compose 檔中定義的 volume，資料庫資料會全部消失。開發環境想重置資料時才使用。</div>
<div class="box memo"><b class="t">動手做</b>為你的 Python 應用加上 PostgreSQL 與 Redis，寫成 compose.yaml。確認：①web 用服務名稱連到資料庫；②執行 down 再 up，資料仍然存在；③密碼放在 .env 且沒有被 Git 追蹤。</div>` }
  ],
  keypoints: [
    'Docker Compose 用一個 YAML 檔描述並一次啟動多個服務',
    'services 下每個服務可用 build 自行建置或 image 使用現成映像',
    '${變數} 從 .env 帶入，.env 要加入 .gitignore',
    '同一 compose 的服務以服務名稱互相連線；容器內的 localhost 是容器自己',
    'depends_on 搭配 healthcheck 確保資料庫準備好才啟動應用程式',
    '資料庫資料存在具名 volume，down 不會刪除，down -v 會刪除',
    'up -d、ps、logs -f、exec、down 是最常用的 Compose 指令'
  ]
},
{
  id: 'c05', subject: 1, minutes: 40,
  title: '容器資料、網路與除錯',
  summary: 'volume 與 bind mount 的差別、資料備份、Docker 網路模式、容器除錯的步驟與常見問題、資源限制、清理空間，以及容器化應用的十二要素原則。',
  sections: [
    { id: 'storage', title: 'volume 與 bind mount', html: `
<table>
<tr><th>比較</th><th>Volume（具名資料卷）</th><th>Bind Mount（資料夾掛載）</th></tr>
<tr><td>資料存在哪裡</td><td>Docker 管理的位置</td><td>主機上你指定的資料夾</td></tr>
<tr><td>寫法</td><td><code>-v db-data:/var/lib/postgresql/data</code></td><td><code>-v ./src:/app/src</code></td></tr>
<tr><td>適合</td><td>資料庫、需要持久保存的正式資料</td><td>開發時即時同步程式碼、讀取設定檔</td></tr>
<tr><td>可攜性</td><td>不依賴主機路徑</td><td>依賴主機的資料夾結構</td></tr>
</table>
<pre class="out">docker volume ls
docker volume inspect db-data

# 開發時把程式碼掛進容器，修改後不必重新建置
docker run -d -p 8000:8000 -v "$(pwd)":/app shop-api:1.0

# 備份資料庫（以 PostgreSQL 為例）
docker compose exec db pg_dump -U shop shop &gt; backup_2026-10-24.sql</pre>
<div class="box warn"><b class="t">volume 不是備份</b>volume 只是讓資料不會隨容器消失，主機硬碟壞了資料一樣會不見。正式環境要定期把資料備份到其他地方（例如雲端儲存），並實際測試還原。</div>` },
    { id: 'network', title: 'Docker 網路', html: `
<table>
<tr><th>網路模式</th><th>說明</th></tr>
<tr><td><b>bridge</b>（預設）</td><td>容器在獨立的虛擬網路中，透過埠號對應讓外部存取。自訂的 bridge 網路支援用容器名稱互連（Compose 預設就是這樣）</td></tr>
<tr><td><b>host</b></td><td>容器直接使用主機的網路，不需要埠號對應（Linux 上可用），隔離性較差</td></tr>
<tr><td><b>none</b></td><td>沒有網路，完全隔離</td></tr>
</table>
<pre class="out">docker network ls
docker network create shop-net
docker run -d --name db --network shop-net postgres:16
docker run -d --name web --network shop-net -p 8000:8000 shop-api:1.0
# web 容器中可以用 db 這個名稱連到資料庫</pre>` },
    { id: 'debug', title: '容器除錯步驟', html: `
<div class="flow">
  <div><b>1. 看狀態</b><span>docker ps -a<br>是否不斷重啟或已結束</span></div>
  <div><b>2. 看日誌</b><span>docker logs 容器<br>大多數問題這裡就看得到</span></div>
  <div><b>3. 進去看</b><span>docker exec -it 容器 sh<br>檢查檔案、環境變數、連線</span></div>
  <div><b>4. 看設定</b><span>docker inspect<br>埠號、掛載、網路</span></div>
</div>
<table>
<tr><th>症狀</th><th>常見原因與處理</th></tr>
<tr><td>容器一啟動就結束（Exited）</td><td>主程式執行完或出錯就結束；看 docker logs。容器需要一個持續執行的主程序</td></tr>
<tr><td>瀏覽器連不到服務</td><td>沒有 -p 對應；程式只監聽 127.0.0.1，要改成 0.0.0.0 才能從容器外連入</td></tr>
<tr><td>連不到資料庫</td><td>連線位址寫成 localhost；資料庫還沒準備好（加健康檢查）；不在同一網路</td></tr>
<tr><td>port is already allocated</td><td>主機埠號被其他程式或容器佔用，換一個主機埠號</td></tr>
<tr><td>改了程式碼沒有生效</td><td>沒有重新建置映像（docker compose up --build），或沒有掛載程式碼</td></tr>
<tr><td>permission denied</td><td>以非 root 使用者執行時沒有寫入權限；檢查檔案擁有者或掛載資料夾權限</td></tr>
<tr><td>硬碟空間不足</td><td>舊映像與停止的容器累積，執行清理</td></tr>
</table>` },
    { id: 'clean', title: '資源限制與清理', html: `
<pre class="out"># 限制容器最多使用 512 MB 記憶體與 1 顆 CPU
docker run -d --memory 512m --cpus 1 shop-api:1.0

# 查看空間使用
docker system df

# 清理
docker container prune     # 刪除所有已停止的容器
docker image prune         # 刪除懸空（沒有標籤）的映像
docker image prune -a      # 刪除所有沒有被容器使用的映像
docker system prune        # 停止的容器、未使用的網路、懸空映像、建置快取
docker system prune --volumes   # 連未使用的 volume 一起刪（小心資料）</pre>
<h3>十二要素應用（The Twelve-Factor App）</h3>
<p>設計適合容器與雲端部署的應用程式時，常參考「十二要素」原則，其中最重要的幾點：</p>
<ul>
  <li><b>設定放在環境變數</b>：同一個映像，靠不同的環境變數部署到測試與正式環境。</li>
  <li><b>無狀態</b>：程式不在本機保存工作階段或上傳檔案，改存資料庫、快取或物件儲存，才能隨意增減容器數量。</li>
  <li><b>日誌輸出到標準輸出</b>：不要寫到容器內的檔案，交給平台收集（docker logs、雲端日誌服務）。</li>
  <li><b>開發與正式環境盡量一致</b>：用相同的映像與相同類型的服務。</li>
  <li><b>快速啟動、優雅關閉</b>：收到停止訊號時完成手上的工作再結束。</li>
</ul>
<div class="box memo"><b class="t">動手做</b>故意製造三種錯誤：程式監聽 127.0.0.1、資料庫位址寫 localhost、忘記 -p 對應埠號，練習用 logs、exec、inspect 找出原因。</div>` }
  ],
  keypoints: [
    'volume 由 Docker 管理，適合資料庫；bind mount 掛載主機資料夾，適合開發時同步程式碼',
    'volume 不是備份，正式資料要另外備份並測試還原',
    '自訂 bridge 網路中的容器可以用名稱互相連線',
    '除錯步驟：docker ps -a → logs → exec 進去看 → inspect 看設定',
    '服務要監聽 0.0.0.0 才能從容器外連入',
    'docker system df 查看空間，prune 系列指令清理',
    '十二要素：設定放環境變數、無狀態、日誌輸出到標準輸出、環境一致'
  ]
}
);
