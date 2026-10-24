/* Linux 系統管理實務 管理篇：系統、網路與資安 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 45,
  title: '套件與程序管理',
  summary: 'apt 與 dnf 套件管理、更新與修補、程序的概念、ps 與 top、訊號與 kill、前景與背景工作、nice 優先權與系統資源查看。',
  sections: [
    { id: 'pkg', title: '套件管理', html: `
<div class="table-wrap"><table>
<tr><th>工作</th><th>Ubuntu／Debian（apt）</th><th>RHEL／Rocky（dnf）</th></tr>
<tr><td>更新套件清單</td><td><code>sudo apt update</code></td><td>（dnf 會自動處理）</td></tr>
<tr><td>升級所有套件</td><td><code>sudo apt upgrade</code></td><td><code>sudo dnf upgrade</code></td></tr>
<tr><td>安裝</td><td><code>sudo apt install nginx</code></td><td><code>sudo dnf install nginx</code></td></tr>
<tr><td>移除</td><td><code>sudo apt remove nginx</code></td><td><code>sudo dnf remove nginx</code></td></tr>
<tr><td>搜尋</td><td><code>apt search 關鍵字</code></td><td><code>dnf search 關鍵字</code></td></tr>
<tr><td>查看已安裝</td><td><code>apt list --installed</code></td><td><code>dnf list installed</code></td></tr>
<tr><td>單一套件檔</td><td><code>dpkg -i file.deb</code></td><td><code>rpm -i file.rpm</code></td></tr>
</table></div>
<div class="box warn"><b class="t">apt update 不等於升級</b><code>apt update</code> 只更新「可用套件清單」，真正安裝新版本要執行 <code>apt upgrade</code>。資安修補的第一步通常是 <code>sudo apt update &amp;&amp; sudo apt upgrade</code>。</div>
<p>Ubuntu 可安裝 <b>unattended-upgrades</b> 自動安裝安全性更新。套件來源設定在 <code>/etc/apt/sources.list.d/</code>，只加入可信任的來源。</p>` },
    { id: 'proc', title: '程序與監控', html: `
<p><b>程序（Process）</b>是執行中的程式，每個程序有唯一的 <b>PID</b>；開機後第一個程序是 systemd（PID 1）。</p>
<pre class="out">ps aux                    # 列出所有程序（USER、PID、%CPU、%MEM、COMMAND）
ps aux | grep nginx       # 找出特定程序
pgrep -a sshd             # 依名稱找 PID
top                       # 即時監控（P 依 CPU、M 依記憶體排序、q 離開）
htop                      # 更好用的互動版（需安裝）
free -h                   # 記憶體使用量
uptime                    # 開機時間與負載平均（1、5、15 分鐘）
nproc                     # CPU 核心數</pre>
<p><b>負載平均</b>可與 CPU 核心數比較：4 核心主機負載長期高於 4，代表工作排隊等待。</p>` },
    { id: 'signal', title: '訊號與工作控制', html: `
<div class="table-wrap"><table>
<tr><th>訊號</th><th>編號</th><th>意義</th></tr>
<tr><td><b>SIGTERM</b></td><td>15</td><td><code>kill</code> 的預設：請程式正常結束，可被程式處理</td></tr>
<tr><td><b>SIGKILL</b></td><td>9</td><td>強制終止，程式無法攔截，<b>最後手段</b></td></tr>
<tr><td>SIGHUP</td><td>1</td><td>許多服務收到後會重新載入設定</td></tr>
<tr><td>SIGINT</td><td>2</td><td>等同按 Ctrl+C</td></tr>
</table></div>
<pre class="out">kill 1234           # 送 SIGTERM
kill -9 1234        # 送 SIGKILL
pkill -f backup.sh  # 依指令內容終止
sleep 300 &amp;         # &amp; 放到背景執行
jobs                # 列出背景工作
fg %1               # 把工作 1 拉回前景
Ctrl+Z 然後 bg       # 暫停目前工作並改在背景繼續
nohup ./long.sh &amp;   # 登出後仍繼續執行
nice -n 10 ./job.sh # 以較低優先權執行（-20 最高、19 最低）</pre>` }
  ],
  keypoints: [
    'apt update 更新清單、apt upgrade 才真正升級',
    'Debian 系 apt／dpkg；RHEL 系 dnf／rpm',
    'PID 1 為 systemd；ps aux 列出所有程序',
    'top 中 P 依 CPU、M 依記憶體排序',
    'kill 預設 SIGTERM(15)；kill -9 為 SIGKILL 強制終止',
    '& 背景執行、jobs、fg、bg；nohup 登出後繼續',
    'nice 值 -20 最高優先、19 最低'
  ]
},
{
  id: 'c08', subject: 2, minutes: 45,
  title: 'systemd 服務與日誌',
  summary: 'systemd 與 unit 概念、systemctl 管理服務、啟動與開機啟用的差異、自訂服務、journalctl 查詢日誌、/var/log 重要日誌與 logrotate。',
  sections: [
    { id: 'systemctl', title: 'systemctl 管理服務', html: `
<pre class="out">systemctl status nginx          # 查看狀態（active、enabled、最近日誌）
sudo systemctl start nginx      # 立即啟動
sudo systemctl stop nginx       # 停止
sudo systemctl restart nginx    # 重新啟動
sudo systemctl reload nginx     # 重新載入設定（不中斷服務，需服務支援）
sudo systemctl enable nginx     # 設定開機自動啟動
sudo systemctl enable --now nginx   # 開機啟動並立即啟動
sudo systemctl disable nginx    # 取消開機啟動
systemctl is-active nginx       # 只回答 active／inactive
systemctl list-units --type=service --state=running   # 執行中的服務
systemctl --failed              # 啟動失敗的 unit</pre>
<div class="box warn"><b class="t">start 與 enable 不同</b><b>start</b> 只影響現在，重開機後不會自動啟動；<b>enable</b> 只設定開機啟動，不會馬上啟動。兩者都要時用 <code>enable --now</code>。</div>` },
    { id: 'unit', title: '自訂服務', html: `
<pre class="out"># /etc/systemd/system/myapp.service
[Unit]
Description=My Node App
After=network.target

[Service]
User=app
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/node server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target</pre>
<pre class="out">sudo systemctl daemon-reload        # 新增或修改 unit 檔後必須執行
sudo systemctl enable --now myapp</pre>
<ul>
  <li><code>User=</code> 以非 root 帳號執行服務，符合最小權限。</li>
  <li><code>Restart=on-failure</code> 程式異常結束時自動重啟。</li>
  <li><b>target</b> 類似執行等級：<code>multi-user.target</code> 為無圖形的多使用者模式、<code>graphical.target</code> 為圖形介面。</li>
</ul>` },
    { id: 'journal', title: 'journalctl 與日誌檔', html: `
<pre class="out">journalctl -u nginx              # 特定服務的日誌
journalctl -u nginx -f           # 持續追蹤（類似 tail -f）
journalctl -u ssh --since "1 hour ago"
journalctl -p err -b             # 本次開機以來的錯誤等級日誌
journalctl -b -1                 # 上一次開機的日誌（需持久化設定）
journalctl --disk-usage          # 日誌占用空間</pre>
<div class="table-wrap"><table>
<tr><th>日誌檔（Ubuntu）</th><th>內容</th><th>RHEL 對應</th></tr>
<tr><td><b>/var/log/auth.log</b></td><td>登入、SSH、sudo</td><td>/var/log/secure</td></tr>
<tr><td>/var/log/syslog</td><td>一般系統訊息</td><td>/var/log/messages</td></tr>
<tr><td>/var/log/kern.log</td><td>核心訊息</td><td>（journal）</td></tr>
<tr><td>/var/log/nginx/</td><td>網站存取與錯誤紀錄</td><td>同</td></tr>
<tr><td>/var/log/wtmp、btmp</td><td>登入成功／失敗紀錄（二進位，用 last、lastb 讀）</td><td>同</td></tr>
</table></div>
<p><b>logrotate</b> 定期輪替、壓縮、刪除舊日誌，避免塞滿磁碟，設定在 <code>/etc/logrotate.d/</code>。</p>` }
  ],
  keypoints: [
    'start 立即啟動、enable 開機啟動、enable --now 兩者皆做',
    'reload 重新載入設定不中斷服務',
    '修改 unit 檔後要 systemctl daemon-reload',
    'User= 以非 root 執行；Restart=on-failure 自動重啟',
    'journalctl -u 服務、-f 追蹤、--since 時間、-p err 錯誤等級',
    'Ubuntu auth.log 對應 RHEL secure；syslog 對應 messages',
    'logrotate 輪替日誌避免塞滿磁碟'
  ]
},
{
  id: 'c09', subject: 2, minutes: 50,
  title: '磁碟、掛載與備份',
  summary: '查看磁碟與空間、分割區與檔案系統、mount 與 /etc/fstab、LVM 概念、壓縮封存 tar，以及 rsync 備份與 3-2-1 原則。',
  sections: [
    { id: 'space', title: '查看磁碟與空間', html: `
<pre class="out">df -h                    # 各檔案系統使用量（易讀單位）
du -sh /var/log          # 目錄總大小
du -h --max-depth=1 /var | sort -h   # 找出最占空間的子目錄
lsblk                    # 區塊裝置與分割區樹狀圖
sudo blkid               # 分割區 UUID 與檔案系統類型
df -i                    # inode 使用量（小檔案過多時會用完）</pre>
<div class="box tip"><b class="t">磁碟滿了怎麼辦</b>先用 <code>df -h</code> 找出哪個掛載點滿了，再用 <code>du</code> 往下找大目錄。常見元兇：日誌、暫存檔、舊核心、容器映像。注意<b>被程序開啟中的已刪除檔案</b>仍占空間，可用 <code>lsof +L1</code> 找出並重啟該服務。</div>` },
    { id: 'mount', title: '分割、格式化與掛載', html: `
<div class="flow">
  <div><b>分割</b><span>fdisk、parted（GPT／MBR）</span></div>
  <div><b>格式化</b><span>mkfs.ext4、mkfs.xfs</span></div>
  <div><b>建立掛載點</b><span>mkdir /data</span></div>
  <div><b>掛載</b><span>mount /dev/sdb1 /data</span></div>
  <div><b>永久設定</b><span>寫入 /etc/fstab</span></div>
</div>
<pre class="out"># /etc/fstab
UUID=3f1c...a9  /data  ext4  defaults  0  2
│               │      │     │         │  └─ fsck 檢查順序（根目錄 1、其他 2、不檢查 0）
│               │      │     │         └──── dump 備份（通常 0）
│               │      │     └────────────── 掛載選項
│               │      └──────────────────── 檔案系統
│               └─────────────────────────── 掛載點
└─────────────────────────────────────────── 裝置（建議用 UUID，裝置名稱可能改變）</pre>
<div class="box warn"><b class="t">fstab 寫錯可能無法開機</b>修改後先執行 <code>sudo mount -a</code> 測試，沒有錯誤訊息再重開機。</div>
<ul>
  <li><b>ext4</b>：Ubuntu 常用；<b>XFS</b>：RHEL 預設，適合大檔案。</li>
  <li>掛載選項 <code>noexec</code>、<code>nosuid</code>、<code>nodev</code> 可用於 /tmp 等目錄，降低攻擊面。</li>
</ul>
<h3>LVM 邏輯磁碟管理</h3>
<p>把多顆實體磁碟（<b>PV</b>）組成磁碟群組（<b>VG</b>），再切成邏輯磁碟（<b>LV</b>）。好處是可以<b>線上擴充</b>空間，例如 <code>lvextend -r -L +10G /dev/vg0/data</code>（-r 同時擴充檔案系統）。</p>` },
    { id: 'backup', title: '封存、壓縮與備份', html: `
<pre class="out">tar -czf etc-backup.tar.gz /etc       # 建立 gzip 壓縮封存（c 建立、z gzip、f 檔名）
tar -tzf etc-backup.tar.gz            # 列出內容（t）
tar -xzf etc-backup.tar.gz -C /tmp    # 解開到 /tmp（x 解開、-C 目的地）
tar -cJf logs.tar.xz /var/log/nginx   # xz 壓縮率較高（J）
gzip file.log   /  gunzip file.log.gz # 單檔壓縮與解壓縮

rsync -av --delete /srv/www/ backup:/srv/www/
# -a 保留權限與時間、-v 顯示過程、--delete 刪除來源已不存在的檔案
# 來源結尾的 / 代表「複製目錄內容」而不是目錄本身</pre>
<div class="box memo"><b class="t">3-2-1 備份原則</b>至少 <b>3</b> 份資料、存在 <b>2</b> 種媒介、<b>1</b> 份放在異地。並定期<b>實際還原測試</b>，沒測過的備份不算備份。</div>` }
  ],
  keypoints: [
    'df -h 看各掛載點空間；du -sh 看目錄大小；lsblk 看磁碟樹',
    'df -i 看 inode；已刪除但仍被開啟的檔案仍占空間',
    'fstab 欄位：裝置、掛載點、檔案系統、選項、dump、fsck',
    'fstab 建議用 UUID；修改後先 mount -a 測試',
    'LVM：PV → VG → LV，可線上擴充',
    'tar -czf 建立、-tzf 列出、-xzf 解開',
    'rsync -av --delete；來源結尾 / 代表複製內容',
    '3-2-1 備份原則並定期還原測試'
  ]
},
{
  id: 'c10', subject: 2, minutes: 50,
  title: '網路設定與排錯',
  summary: 'IP 位址與子網路、ip 指令、路由與 DNS 設定、ss 查看連線與監聽埠、ping、traceroute、dig、curl，以及依層次排除網路問題。',
  sections: [
    { id: 'ip', title: 'IP、子網路與 ip 指令', html: `
<pre class="out">ip a                    # 查看網路介面與 IP（ip addr）
ip route                # 路由表，default via 為預設閘道
ip link set eth0 up     # 啟用介面
hostname -I             # 快速列出本機 IP</pre>
<div class="table-wrap"><table>
<tr><th>CIDR</th><th>子網路遮罩</th><th>可用主機數</th></tr>
<tr><td>/8</td><td>255.0.0.0</td><td>16,777,214</td></tr>
<tr><td>/16</td><td>255.255.0.0</td><td>65,534</td></tr>
<tr><td><b>/24</b></td><td>255.255.255.0</td><td><b>254</b></td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>14</td></tr>
</table></div>
<p>可用主機數 = 2^(32 − 前綴長度) − 2（扣除網路位址與廣播位址）。私有 IP 範圍：<b>10.0.0.0/8</b>、<b>172.16.0.0/12</b>、<b>192.168.0.0/16</b>。可以到「互動練習」使用<b>子網路計算器</b>。</p>
<h3>設定檔</h3>
<ul>
  <li><b>Ubuntu</b>：以 <b>netplan</b> 設定（/etc/netplan/*.yaml），修改後 <code>sudo netplan apply</code>。</li>
  <li><b>RHEL</b>：以 <b>NetworkManager</b> 的 <code>nmcli</code> 設定。</li>
  <li><code>/etc/hosts</code>：本機的名稱對應，優先於 DNS。</li>
  <li><code>/etc/resolv.conf</code>：DNS 伺服器設定（Ubuntu 由 systemd-resolved 管理，可用 <code>resolvectl status</code> 查看）。</li>
</ul>` },
    { id: 'ss', title: '連線與監聽埠', html: `
<pre class="out">sudo ss -tulpn
# -t TCP、-u UDP、-l 只看監聽中、-p 顯示程序、-n 數字顯示不解析名稱

Netid State  Local Address:Port  Process
tcp   LISTEN 0.0.0.0:22          users:(("sshd",pid=812,...))
tcp   LISTEN 127.0.0.1:3306      users:(("mysqld",pid=901,...))</pre>
<ul>
  <li><b>0.0.0.0</b>（或 [::]）代表監聽所有介面，外部可連線；<b>127.0.0.1</b> 只允許本機連線。</li>
  <li>資料庫等內部服務應只監聽 127.0.0.1 或內網 IP，不要對外開放。</li>
  <li><code>ss -tn state established</code> 列出已建立的連線；舊工具 <code>netstat</code> 功能類似。</li>
</ul>` },
    { id: 'troubleshoot', title: '網路排錯流程', html: `
<div class="flow">
  <div><b>1. 介面與 IP</b><span>ip a：有沒有拿到 IP？介面是否 UP？</span></div>
  <div><b>2. 路由</b><span>ip route：有沒有預設閘道？</span></div>
  <div><b>3. 連通性</b><span>ping 閘道、ping 8.8.8.8</span></div>
  <div><b>4. DNS</b><span>dig example.com、ping 網域名稱</span></div>
  <div><b>5. 服務埠</b><span>ss -tulpn、防火牆是否放行</span></div>
  <div><b>6. 應用程式</b><span>curl -I http://網址、查看服務日誌</span></div>
</div>
<pre class="out">ping -c 4 8.8.8.8            # 送 4 個封包測試連通（-c 次數）
traceroute example.com       # 追蹤經過的路由節點
dig example.com +short       # 查詢 DNS 解析結果
dig MX example.com           # 查詢郵件伺服器紀錄
curl -I https://example.com  # 只看 HTTP 回應標頭
curl -v http://localhost:8080   # 顯示詳細連線過程</pre>
<div class="box exam"><b class="t">判斷技巧</b>能 ping 8.8.8.8 但 ping 網域名稱失敗 → <b>DNS 問題</b>。本機 curl localhost 正常、外部連不到 → 檢查服務是否只監聽 127.0.0.1 或<b>防火牆</b>。</div>` }
  ],
  keypoints: [
    'ip a 看介面與 IP；ip route 看預設閘道',
    '/24 = 255.255.255.0 可用 254 台；可用主機 = 2^(32−前綴) − 2',
    '私有 IP：10/8、172.16/12、192.168/16',
    'Ubuntu 用 netplan、RHEL 用 nmcli；/etc/hosts 優先於 DNS',
    'ss -tulpn 看監聽埠與程序；0.0.0.0 對外、127.0.0.1 僅本機',
    '排錯順序：介面 → 路由 → ping → DNS → 埠號 → 應用程式',
    'ping IP 成功但網域失敗代表 DNS 問題'
  ]
},
{
  id: 'c11', subject: 2, minutes: 50,
  title: 'SSH 與伺服器加固',
  summary: 'SSH 金鑰登入、sshd_config 安全設定、scp 與 rsync 傳檔、ufw 與 firewalld 防火牆、fail2ban 防暴力破解，以及雲端主機上線前的加固清單。',
  sections: [
    { id: 'key', title: 'SSH 金鑰登入', html: `
<pre class="out">ssh-keygen -t ed25519 -C "student@laptop"   # 在自己電腦產生金鑰對
# 私鑰 ~/.ssh/id_ed25519（絕不外流）、公鑰 ~/.ssh/id_ed25519.pub

ssh-copy-id student@203.0.113.10             # 把公鑰加入伺服器
# 公鑰會被加到伺服器的 ~/.ssh/authorized_keys

ssh student@203.0.113.10                     # 之後以金鑰登入
ssh -p 2222 student@host                     # 指定埠號</pre>
<ul>
  <li>權限要求：<code>~/.ssh</code> 為 <b>700</b>、<code>authorized_keys</code> 與私鑰為 <b>600</b>，權限太寬鬆時 SSH 會拒絕使用。</li>
  <li>私鑰可設定<b>密碼片語（passphrase）</b>，即使檔案被偷也無法直接使用。</li>
  <li>第一次連線會提示主機指紋，確認後記錄在 <code>~/.ssh/known_hosts</code>；之後指紋改變會警告，可能是中間人攻擊或主機重建。</li>
</ul>` },
    { id: 'sshd', title: 'sshd_config 安全設定', html: `
<pre class="out"># /etc/ssh/sshd_config（或 /etc/ssh/sshd_config.d/ 下的設定檔）
PermitRootLogin no              # 禁止 root 直接登入
PasswordAuthentication no       # 關閉密碼登入，只允許金鑰
PubkeyAuthentication yes
MaxAuthTries 3
AllowUsers student deploy       # 只允許指定帳號</pre>
<pre class="out">sudo sshd -t                    # 檢查設定語法
sudo systemctl reload ssh       # 套用設定（RHEL 服務名稱為 sshd）</pre>
<div class="box warn"><b class="t">避免把自己鎖在外面</b>關閉密碼登入前，先<b>開另一個終端機</b>確認金鑰登入成功；修改後也保持原本的連線不要關閉，直到新連線測試成功。</div>
<h3>傳輸檔案</h3>
<pre class="out">scp report.pdf student@host:/home/student/
scp -r student@host:/var/log/nginx ./logs
rsync -avz -e ssh ./site/ student@host:/srv/www/</pre>` },
    { id: 'fw', title: '防火牆與 fail2ban', html: `
<div class="table-wrap"><table>
<tr><th>工作</th><th>Ubuntu（ufw）</th><th>RHEL（firewalld）</th></tr>
<tr><td>開放 SSH</td><td><code>sudo ufw allow OpenSSH</code></td><td><code>sudo firewall-cmd --permanent --add-service=ssh</code></td></tr>
<tr><td>開放埠號</td><td><code>sudo ufw allow 443/tcp</code></td><td><code>sudo firewall-cmd --permanent --add-port=443/tcp</code></td></tr>
<tr><td>限定來源</td><td><code>sudo ufw allow from 10.0.0.0/24 to any port 3306</code></td><td>使用 rich rule</td></tr>
<tr><td>啟用與套用</td><td><code>sudo ufw enable</code></td><td><code>sudo firewall-cmd --reload</code></td></tr>
<tr><td>查看規則</td><td><code>sudo ufw status numbered</code></td><td><code>sudo firewall-cmd --list-all</code></td></tr>
</table></div>
<div class="box warn"><b class="t">先放行 SSH 再啟用防火牆</b>遠端主機上若先 <code>ufw enable</code> 再開 SSH，連線會被切斷。ufw 預設政策是拒絕所有進入、允許所有外出。firewalld 沒加 <code>--permanent</code> 的規則重開機後會消失。</div>
<p><b>fail2ban</b> 監看日誌，同一 IP 在短時間內失敗太多次就自動封鎖一段時間，能有效降低 SSH 暴力破解。查看狀態：<code>sudo fail2ban-client status sshd</code>。</p>` },
    { id: 'checklist', title: '雲端主機上線加固清單', html: `
<div class="checklist-static">
<ol>
  <li>建立一般帳號並加入 sudo 群組，不直接使用 root</li>
  <li>設定 SSH 金鑰登入，關閉密碼登入與 root 登入</li>
  <li>防火牆預設拒絕，只開放必要埠號（如 22、80、443）</li>
  <li>安裝 fail2ban，並啟用自動安全性更新</li>
  <li><code>ss -tulpn</code> 確認沒有不必要的服務對外監聽</li>
  <li>服務以非 root 帳號執行，資料庫只監聽本機或內網</li>
  <li>設定時區與時間同步（日誌時間正確對調查很重要）</li>
  <li>設定備份與監控告警</li>
</ol>
</div>` }
  ],
  keypoints: [
    'ssh-keygen -t ed25519 產生金鑰；ssh-copy-id 安裝公鑰到 authorized_keys',
    '~/.ssh 為 700、私鑰與 authorized_keys 為 600',
    'PermitRootLogin no、PasswordAuthentication no',
    'sshd -t 檢查語法；關閉密碼登入前先確認金鑰可登入',
    '遠端主機先放行 SSH 再啟用防火牆',
    'firewalld 要 --permanent 並 --reload',
    'fail2ban 自動封鎖暴力破解來源'
  ]
},
{
  id: 'c12', subject: 2, minutes: 50,
  title: 'Linux 資安監控與事件調查',
  summary: '從 SOC 角度調查 Linux 主機：登入紀錄與暴力破解分析、可疑帳號與 sudo、異常程序與連線、持久化手法檢查、檔案完整性，以及 SELinux、AppArmor 與 auditd。',
  sections: [
    { id: 'login', title: '登入紀錄分析', html: `
<pre class="out">last -n 20                       # 最近成功登入（來自 /var/log/wtmp）
sudo lastb -n 20                 # 最近失敗登入（來自 /var/log/btmp）
who                              # 目前登入的使用者
w                                # 目前登入者與正在執行的指令
lastlog                          # 每個帳號最後登入時間

# 暴力破解：失敗次數最多的來源 IP
sudo grep "Failed password" /var/log/auth.log \\
  | grep -oE "from [0-9.]+" | sort | uniq -c | sort -rn | head

# 暴力破解後是否有成功登入
sudo grep "Accepted" /var/log/auth.log

# sudo 使用紀錄
sudo grep "sudo:" /var/log/auth.log | grep COMMAND</pre>
<div class="box exam"><b class="t">調查重點</b>同一 IP 大量 <code>Failed password</code> 之後出現 <code>Accepted password</code>，代表暴力破解可能成功，需立即處理：封鎖 IP、停用該帳號、檢查該帳號登入後的行為。</div>` },
    { id: 'hunt', title: '可疑帳號、程序與連線', html: `
<pre class="out">awk -F: '$3 == 0 {print $1}' /etc/passwd   # UID 為 0 的帳號（正常只有 root）
getent group sudo                          # 誰有 sudo 權限
ps aux --sort=-%cpu | head                 # CPU 使用最高的程序（挖礦程式常見）
sudo ss -tunap                             # 所有連線與對應程序
sudo ls -l /proc/1234/exe                  # 程序實際執行的檔案（被刪除會標示 deleted）
find /tmp /var/tmp /dev/shm -type f -newer /etc/hostname   # 暫存目錄中較新的檔案</pre>
<ul>
  <li>可疑跡象：不明的 UID 0 帳號、陌生帳號被加入 sudo 群組、從 /tmp 或 /dev/shm 執行的程序、對外連到陌生 IP 的高埠連線、CPU 長期滿載。</li>
</ul>` },
    { id: 'persist', title: '持久化手法檢查', html: `
<div class="table-wrap"><table>
<tr><th>位置</th><th>檢查方式</th></tr>
<tr><td><b>排程</b></td><td><code>sudo ls /var/spool/cron/crontabs/</code>、<code>/etc/crontab</code>、<code>/etc/cron.d/</code>、<code>systemctl list-timers</code></td></tr>
<tr><td><b>SSH 金鑰</b></td><td>各使用者與 root 的 <code>~/.ssh/authorized_keys</code> 是否有陌生公鑰</td></tr>
<tr><td><b>systemd 服務</b></td><td><code>/etc/systemd/system/</code> 中近期新增的 unit 檔</td></tr>
<tr><td><b>Shell 啟動檔</b></td><td><code>~/.bashrc</code>、<code>/etc/profile.d/</code> 是否被加入可疑指令</td></tr>
<tr><td><b>SUID 檔案</b></td><td><code>find / -perm -4000 -type f 2>/dev/null</code> 與基準清單比對</td></tr>
</table></div>
<div class="box warn"><b class="t">保全證據</b>調查時先記錄與複製證據（日誌、可疑檔案、程序資訊），再進行清除。依揮發順序，記憶體與網路連線資訊要最先蒐集；直接關機會讓這些資訊消失。</div>` },
    { id: 'harden', title: '完整性與強制存取控制', html: `
<ul>
  <li><b>檔案完整性</b>：<code>sha256sum</code> 計算雜湊比對；<code>debsums</code>（Ubuntu）或 <code>rpm -Va</code>（RHEL）檢查套件檔案是否被修改；AIDE 建立基準並定期比對。</li>
  <li><b>強制存取控制（MAC）</b>：即使是 root 執行的程式也受到政策限制。
    <ul>
      <li><b>AppArmor</b>：Ubuntu 預設，以路徑為基礎，<code>sudo aa-status</code> 查看。</li>
      <li><b>SELinux</b>：RHEL 預設，以標籤為基礎，<code>getenforce</code> 查看（Enforcing／Permissive／Disabled）。遇到問題應調整政策，不建議直接關閉。</li>
    </ul>
  </li>
  <li><b>auditd</b>：記錄指定檔案的存取與系統呼叫，例如監控 /etc/passwd 被修改：<code>sudo auditctl -w /etc/passwd -p wa -k passwd_change</code>，再以 <code>ausearch -k passwd_change</code> 查詢。</li>
  <li><b>集中日誌</b>：以 rsyslog 或代理程式把日誌送到 SIEM，攻擊者清除本機日誌時仍有副本。</li>
</ul>` }
  ],
  keypoints: [
    'last 看成功登入、lastb 看失敗登入、w 看目前登入者在做什麼',
    '大量 Failed password 後出現 Accepted 代表可能被破解',
    'UID 0 帳號正常只有 root',
    '持久化檢查：crontab、authorized_keys、systemd 服務、.bashrc、SUID',
    '先保全證據再清除；記憶體與連線資訊最先蒐集',
    'AppArmor 為 Ubuntu 預設、SELinux 為 RHEL 預設（getenforce）',
    'auditd 監控檔案存取；日誌集中送到 SIEM'
  ]
}
);
