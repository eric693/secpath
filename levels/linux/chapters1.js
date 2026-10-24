/* Linux 系統管理實務 基礎篇：指令、檔案與權限 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 35,
  title: '認識 Linux 與練習環境',
  summary: 'Linux 核心與發行版、開源授權、Shell 與終端機、練習環境選擇（虛擬機、WSL、雲端主機），以及第一次登入與指令格式。',
  sections: [
    { id: 'what', title: 'Linux 是什麼', html: `
<ul>
  <li><b>核心（Kernel）</b>：1991 年由 Linus Torvalds 發表，負責管理 CPU、記憶體、硬體與程序。嚴格來說「Linux」指的是核心。</li>
  <li><b>發行版（Distribution）</b>：核心加上工具、套件管理、桌面環境等，組成可用的作業系統。</li>
  <li><b>開源授權</b>：Linux 核心採用 <b>GPLv2</b>，修改並散布時必須公開原始碼。</li>
  <li>全球大多數伺服器、雲端主機、Android 手機與嵌入式設備都使用 Linux。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>家族</th><th>代表發行版</th><th>套件管理</th><th>常見用途</th></tr>
<tr><td><b>Debian 系</b></td><td>Debian、<b>Ubuntu</b>、Kali Linux</td><td>apt、.deb</td><td>雲端主機、桌面、資安工具（Kali）</td></tr>
<tr><td><b>Red Hat 系</b></td><td>RHEL、Rocky Linux、AlmaLinux、Fedora</td><td>dnf（舊版 yum）、.rpm</td><td>企業伺服器</td></tr>
<tr><td>其他</td><td>Arch、openSUSE、Alpine</td><td>pacman、zypper、apk</td><td>進階使用者、容器映像</td></tr>
</table></div>
<p>本課程以 <b>Ubuntu 24.04 LTS</b> 為主，並標示 RHEL 系的對應指令。<b>LTS</b>（Long Term Support）代表長期支援版本，伺服器建議使用。</p>` },
    { id: 'env', title: '準備練習環境', html: `
<div class="table-wrap"><table>
<tr><th>方式</th><th>優點</th><th>注意</th></tr>
<tr><td><b>VirtualBox／VMware 虛擬機</b></td><td>完整系統，可做快照、弄壞了可還原</td><td>需要較多記憶體</td></tr>
<tr><td><b>WSL（Windows Subsystem for Linux）</b></td><td>在 Windows 直接執行 Linux，最快上手</td><td>部分系統功能（如 systemd 的某些操作、磁碟分割）與實體主機不同</td></tr>
<tr><td><b>雲端主機</b></td><td>真實的伺服器環境，可練習 SSH 與防火牆</td><td>暴露在網路上，第 11 章的加固一定要做</td></tr>
<tr><td>容器（Docker）</td><td>輕量快速</td><td>不是完整系統，不適合練習服務與開機管理</td></tr>
</table></div>
<div class="box tip"><b class="t">建議</b>初學者先用虛擬機並建立快照，練習 rm、權限、磁碟等可能弄壞系統的操作前先存一份快照。</div>` },
    { id: 'shell', title: 'Shell 與指令格式', html: `
<p><b>Shell</b> 是解讀指令的程式，Ubuntu 預設為 <b>bash</b>。<b>終端機（Terminal）</b>是輸入指令的視窗。</p>
<pre class="out">student@ubuntu:~$ ls -l /etc/hostname
│       │      │ │  │  └─ 參數（argument）：要操作的對象
│       │      │ │  └──── 選項（option）：改變指令行為
│       │      │ └─────── 指令（command）
│       │      └───────── $ 一般使用者；# 代表 root
│       └──────────────── 主機名稱；~ 是目前所在目錄（家目錄）
└──────────────────────── 使用者名稱</pre>
<div class="table-wrap"><table>
<tr><th>操作</th><th>說明</th></tr>
<tr><td><b>Tab</b></td><td>自動補全指令與檔名，按兩次列出所有可能</td></tr>
<tr><td><b>↑ ↓</b></td><td>瀏覽歷史指令</td></tr>
<tr><td><b>Ctrl + C</b></td><td>中斷目前執行的指令</td></tr>
<tr><td><b>Ctrl + L</b> 或 <code>clear</code></td><td>清除畫面</td></tr>
<tr><td><code>man 指令</code></td><td>查看完整說明手冊，按 q 離開</td></tr>
<tr><td><code>指令 --help</code></td><td>查看簡短說明</td></tr>
</table></div>
<p>Linux <b>區分大小寫</b>：<code>File.txt</code> 與 <code>file.txt</code> 是兩個不同的檔案。</p>` }
  ],
  keypoints: [
    'Linux 嚴格來說指核心，發行版是核心加上工具與套件',
    'Linux 核心採用 GPLv2 授權',
    'Debian 系用 apt；Red Hat 系用 dnf',
    '伺服器建議使用 LTS 長期支援版本',
    '提示字元 $ 為一般使用者、# 為 root',
    'Tab 補全、Ctrl+C 中斷、man 查手冊',
    'Linux 區分大小寫'
  ]
},
{
  id: 'c02', subject: 1, minutes: 50,
  title: '檔案系統與基本指令',
  summary: 'FHS 目錄結構、絕對與相對路徑、檔案與目錄操作、萬用字元、隱藏檔、檔案類型，以及硬連結與符號連結。',
  sections: [
    { id: 'fhs', title: '目錄結構（FHS）', html: `
<p>Linux 只有一棵從根目錄 <code>/</code> 開始的目錄樹，沒有 C 槽、D 槽的概念。</p>
<div class="table-wrap"><table>
<tr><th>目錄</th><th>用途</th></tr>
<tr><td><b>/etc</b></td><td>系統與服務的<b>設定檔</b></td></tr>
<tr><td><b>/home</b></td><td>一般使用者的家目錄，如 /home/student</td></tr>
<tr><td><b>/root</b></td><td>root 的家目錄</td></tr>
<tr><td><b>/var</b></td><td>經常變動的資料，<b>/var/log</b> 為日誌</td></tr>
<tr><td><b>/tmp</b></td><td>暫存檔，重開機可能清除</td></tr>
<tr><td><b>/usr</b></td><td>使用者程式與函式庫，/usr/bin 放一般指令</td></tr>
<tr><td><b>/bin、/sbin</b></td><td>基本指令；sbin 多為系統管理指令（現代發行版多連結到 /usr 下）</td></tr>
<tr><td><b>/dev</b></td><td>裝置檔，如硬碟 /dev/sda</td></tr>
<tr><td><b>/proc</b></td><td>核心與程序資訊的虛擬檔案系統</td></tr>
<tr><td><b>/opt</b></td><td>第三方軟體</td></tr>
<tr><td><b>/mnt、/media</b></td><td>手動掛載點、可移除媒體掛載點</td></tr>
<tr><td><b>/boot</b></td><td>開機檔案與核心</td></tr>
</table></div>` },
    { id: 'path', title: '路徑與移動', html: `
<ul>
  <li><b>絕對路徑</b>：從 / 開始，如 <code>/var/log/syslog</code>。</li>
  <li><b>相對路徑</b>：從目前目錄開始，如 <code>docs/a.txt</code>。</li>
  <li><code>.</code> 目前目錄、<code>..</code> 上一層、<code>~</code> 家目錄、<code>-</code>（cd -）上一個所在目錄。</li>
</ul>
<pre class="out">pwd                 # 顯示目前所在目錄
cd /var/log         # 用絕對路徑移動
cd ..               # 回到上一層（/var）
cd                  # 不加參數回到家目錄
cd -                # 回到上一個目錄</pre>` },
    { id: 'ops', title: '檔案與目錄操作', html: `
<div class="table-wrap"><table>
<tr><th>指令</th><th>用途</th><th>常用選項</th></tr>
<tr><td><code>ls</code></td><td>列出內容</td><td><code>-l</code> 詳細、<code>-a</code> 含隱藏檔、<code>-h</code> 易讀大小、<code>-t</code> 依時間排序</td></tr>
<tr><td><code>mkdir</code></td><td>建立目錄</td><td><code>-p</code> 一次建立多層，已存在也不報錯</td></tr>
<tr><td><code>touch</code></td><td>建立空檔案或更新時間戳記</td><td></td></tr>
<tr><td><code>cp</code></td><td>複製</td><td><code>-r</code> 複製目錄、<code>-p</code> 保留權限與時間、<code>-i</code> 覆蓋前詢問</td></tr>
<tr><td><code>mv</code></td><td>移動或<b>重新命名</b></td><td><code>-i</code> 覆蓋前詢問</td></tr>
<tr><td><code>rm</code></td><td>刪除</td><td><code>-r</code> 刪除目錄、<code>-f</code> 強制、<code>-i</code> 詢問</td></tr>
<tr><td><code>rmdir</code></td><td>刪除<b>空</b>目錄</td><td></td></tr>
<tr><td><code>file</code></td><td>判斷檔案類型</td><td></td></tr>
<tr><td><code>stat</code></td><td>檔案詳細資訊與時間戳記</td><td></td></tr>
</table></div>
<div class="box warn"><b class="t">rm 沒有資源回收筒</b>刪除後無法從系統還原。<code>rm -rf</code> 前務必用 <code>pwd</code> 與 <code>ls</code> 確認位置，尤其路徑中含有變數時。</div>
<h3>萬用字元（Glob）</h3>
<pre class="out">*        任意長度字元        ls *.log
?        任意單一字元        ls file?.txt
[abc]    括號中任一字元      ls file[12].txt
{a,b}    大括號展開          mkdir -p project/{src,docs,tests}</pre>
<h3>隱藏檔與 ls -l 解讀</h3>
<p>檔名以 <code>.</code> 開頭的是隱藏檔（如 <code>.bashrc</code>），需 <code>ls -a</code> 才看得到。</p>
<pre class="out">-rw-r--r-- 1 student student 220 Oct 17 09:00 .bash_logout
│└──┬────┘ │ └──┬──┘ └──┬──┘ └┬┘
│   │      │    │       │     └─ 大小（位元組）
│   │      │    │       └─────── 群組
│   │      │    └─────────────── 擁有者
│   │      └──────────────────── 硬連結數
│   └─────────────────────────── 權限（第 5 章）
└─────────────────────────────── 類型：- 一般檔、d 目錄、l 符號連結</pre>` },
    { id: 'link', title: '硬連結與符號連結', html: `
<div class="table-wrap"><table>
<tr><th></th><th>硬連結 Hard Link</th><th>符號連結 Symbolic Link</th></tr>
<tr><td>建立</td><td><code>ln 原檔 連結</code></td><td><code>ln -s 原檔 連結</code></td></tr>
<tr><td>本質</td><td>同一個 inode 的另一個名稱</td><td>指向路徑的捷徑檔</td></tr>
<tr><td>刪除原檔後</td><td><b>仍可使用</b>（資料還在）</td><td><b>失效</b>，成為斷掉的連結</td></tr>
<tr><td>跨檔案系統</td><td>不行</td><td>可以</td></tr>
<tr><td>連結目錄</td><td>不行</td><td>可以</td></tr>
</table></div>
<p><b>inode</b> 記錄檔案的權限、擁有者、資料位置等資訊，<code>ls -i</code> 可看到 inode 編號。</p>` }
  ],
  keypoints: [
    '/etc 設定、/var/log 日誌、/home 家目錄、/tmp 暫存、/proc 虛擬檔案系統',
    '絕對路徑從 / 開始；. 目前目錄、.. 上一層、~ 家目錄',
    'mkdir -p 建立多層；cp -r 複製目錄；mv 也用來改名',
    'rm 沒有資源回收筒；rmdir 只能刪空目錄',
    '. 開頭為隱藏檔，ls -a 才會顯示',
    'ls -l 第一個字元：- 檔案、d 目錄、l 連結',
    '刪除原檔後硬連結仍可用、符號連結失效'
  ]
},
{
  id: 'c03', subject: 1, minutes: 55,
  title: '文字處理、搜尋與管線',
  summary: '檢視檔案內容、grep 與基本正規表示式、find 搜尋檔案、sort、uniq、cut、wc 等文字工具，以及標準輸入輸出、重導向與管線。',
  sections: [
    { id: 'view', title: '檢視檔案', html: `
<div class="table-wrap"><table>
<tr><th>指令</th><th>用途</th></tr>
<tr><td><code>cat</code></td><td>顯示整個檔案（短檔案）</td></tr>
<tr><td><code>less</code></td><td>分頁瀏覽，/ 搜尋、q 離開（長檔案）</td></tr>
<tr><td><code>head -n 5</code></td><td>顯示前 5 行（預設 10 行）</td></tr>
<tr><td><code>tail -n 5</code></td><td>顯示最後 5 行</td></tr>
<tr><td><code>tail -f</code></td><td><b>持續追蹤</b>新增內容，看即時日誌必備</td></tr>
<tr><td><code>wc -l</code></td><td>計算行數（-w 字數、-c 位元組數）</td></tr>
</table></div>` },
    { id: 'grep', title: 'grep 與正規表示式', html: `
<pre class="out">grep "Failed" /var/log/auth.log        # 找出含 Failed 的行
grep -i "error" app.log                 # 不分大小寫
grep -v "^#" /etc/ssh/sshd_config       # 排除 # 開頭的註解行
grep -n "root" /etc/passwd              # 顯示行號
grep -c "Failed" /var/log/auth.log      # 只顯示符合的行數
grep -r "password" /etc/                # 遞迴搜尋目錄
grep -E "error|fail" app.log            # 延伸正規表示式，| 代表「或」
grep -o "[0-9]\\+\\.[0-9]\\+\\.[0-9]\\+\\.[0-9]\\+" auth.log   # 只輸出符合的部分（IP）</pre>
<div class="table-wrap"><table>
<tr><th>符號</th><th>意義</th><th>例子</th></tr>
<tr><td><code>^</code></td><td>行首</td><td><code>^root</code> 以 root 開頭</td></tr>
<tr><td><code>$</code></td><td>行尾</td><td><code>bash$</code> 以 bash 結尾</td></tr>
<tr><td><code>.</code></td><td>任一字元</td><td><code>r..t</code></td></tr>
<tr><td><code>*</code></td><td>前一字元出現 0 次以上</td><td><code>ab*c</code></td></tr>
<tr><td><code>[ ]</code></td><td>括號內任一字元</td><td><code>[0-9]</code></td></tr>
<tr><td><code>^$</code></td><td>空白行</td><td><code>grep -v "^$"</code> 去除空行</td></tr>
</table></div>` },
    { id: 'find', title: 'find 搜尋檔案', html: `
<pre class="out">find /etc -name "*.conf"             # 依檔名（區分大小寫，-iname 不分）
find /home -type d -name "backup"    # 只找目錄（-type f 只找檔案）
find /var/log -size +100M            # 大於 100MB
find /tmp -mtime +7                  # 超過 7 天未修改
find / -perm -4000 2>/dev/null       # 找出 SUID 檔案（資安檢查常用）
find /tmp -name "*.tmp" -delete      # 找到後刪除（先不加 -delete 確認結果）</pre>
<p><code>2>/dev/null</code> 把「權限不足」等錯誤訊息丟掉，只看結果。</p>` },
    { id: 'tools', title: '文字工具', html: `
<div class="table-wrap"><table>
<tr><th>指令</th><th>用途</th></tr>
<tr><td><code>sort</code></td><td>排序；<code>-n</code> 依數字、<code>-r</code> 反向、<code>-k2</code> 依第 2 欄</td></tr>
<tr><td><code>uniq</code></td><td>移除<b>相鄰</b>的重複行，所以通常先 sort；<code>-c</code> 計數</td></tr>
<tr><td><code>cut</code></td><td>擷取欄位：<code>cut -d: -f1 /etc/passwd</code> 以 : 分隔取第 1 欄</td></tr>
<tr><td><code>awk</code></td><td>欄位處理：<code>awk '{print $1}'</code> 印出第 1 欄（以空白分隔）</td></tr>
<tr><td><code>tr</code></td><td>字元轉換：<code>tr 'a-z' 'A-Z'</code> 轉大寫</td></tr>
<tr><td><code>sed</code></td><td>取代文字：<code>sed 's/old/new/g'</code></td></tr>
</table></div>` },
    { id: 'pipe', title: '重導向與管線', html: `
<div class="table-wrap"><table>
<tr><th>編號</th><th>名稱</th><th>預設</th></tr>
<tr><td>0</td><td>標準輸入 stdin</td><td>鍵盤</td></tr>
<tr><td>1</td><td>標準輸出 stdout</td><td>螢幕</td></tr>
<tr><td>2</td><td>標準錯誤 stderr</td><td>螢幕</td></tr>
</table></div>
<pre class="out">ls &gt; list.txt            # 輸出寫入檔案（覆寫）
echo "new" &gt;&gt; list.txt    # 附加到檔案結尾
ls /nope 2&gt; err.txt       # 只把錯誤訊息寫入檔案
cmd &gt; all.txt 2&gt;&amp;1        # 輸出與錯誤都寫入同一檔案
cmd 2&gt;/dev/null           # 丟棄錯誤訊息
sort &lt; names.txt          # 從檔案讀入
ls | wc -l                # 管線：前一個指令的輸出當成下一個的輸入
cmd | tee out.txt         # 同時顯示在螢幕並寫入檔案</pre>
<h3>組合範例：找出暴力破解最多的 IP</h3>
<pre class="out">grep "Failed password" /var/log/auth.log \\
  | grep -oE "from [0-9.]+" \\
  | sort | uniq -c | sort -rn | head -5</pre>
<p>流程：找出失敗紀錄 → 擷取來源 IP → 排序 → 計數 → 依次數由大到小 → 取前 5 名。這是 SOC 分析最常用的組合之一。</p>` }
  ],
  keypoints: [
    'tail -f 持續追蹤日誌；less 分頁瀏覽',
    'grep -i 不分大小寫、-v 反向、-n 行號、-c 計數、-r 遞迴、-E 延伸正規表示式',
    '^ 行首、$ 行尾、^$ 空行',
    'find 依名稱、類型、大小、時間、權限搜尋；-perm -4000 找 SUID',
    'uniq 只去除相鄰重複，先 sort 再 uniq -c',
    '> 覆寫、>> 附加、2> 錯誤、2>&1 合併、| 管線',
    'sort | uniq -c | sort -rn 是統計次數的經典組合'
  ]
},
{
  id: 'c04', subject: 1, minutes: 40,
  title: '文字編輯器與 Shell 環境',
  summary: 'vim 三種模式與常用操作、nano、環境變數與 PATH、alias、.bashrc、歷史指令，以及引號與命令替換的差異。',
  sections: [
    { id: 'vim', title: 'vim 基本操作', html: `
<div class="flow">
  <div><b>一般模式</b><span>開檔後的預設模式，可移動、刪除、複製</span></div>
  <div><b>插入模式</b><span>按 i 進入，可輸入文字；Esc 回一般模式</span></div>
  <div><b>命令列模式</b><span>在一般模式按 : 進入，可存檔、離開、搜尋取代</span></div>
</div>
<div class="table-wrap"><table>
<tr><th>按鍵</th><th>功能</th></tr>
<tr><td><code>i</code>／<code>a</code>／<code>o</code></td><td>游標前插入／游標後插入／下方新增一行</td></tr>
<tr><td><code>:w</code>／<code>:q</code>／<code>:wq</code>／<code>:q!</code></td><td>存檔／離開／存檔並離開／<b>不存檔強制離開</b></td></tr>
<tr><td><code>dd</code>／<code>yy</code>／<code>p</code></td><td>刪除（剪下）整行／複製整行／貼上</td></tr>
<tr><td><code>u</code>／<code>Ctrl+r</code></td><td>復原／重做</td></tr>
<tr><td><code>gg</code>／<code>G</code></td><td>跳到第一行／最後一行</td></tr>
<tr><td><code>/文字</code>、<code>n</code></td><td>向下搜尋、跳到下一個</td></tr>
<tr><td><code>:%s/old/new/g</code></td><td>全檔取代</td></tr>
<tr><td><code>:set nu</code></td><td>顯示行號</td></tr>
</table></div>
<p><b>nano</b> 是較簡單的編輯器，畫面下方會顯示快捷鍵（^ 代表 Ctrl），Ctrl+O 存檔、Ctrl+X 離開。</p>` },
    { id: 'env', title: '變數、PATH 與設定檔', html: `
<pre class="out">name="Linux"              # 設定變數（等號兩邊不能有空格）
echo "Hello $name"        # Hello Linux
export EDITOR=vim         # 匯出為環境變數，子程序也能使用
echo $PATH                # 指令搜尋路徑，以 : 分隔
which ls                  # 顯示指令實際位置
type ll                   # 顯示是別名、內建指令或程式</pre>
<ul>
  <li><b>PATH</b>：輸入指令時，Shell 依 PATH 中的目錄順序尋找程式。不在 PATH 中的程式要用路徑執行，如 <code>./script.sh</code>。</li>
  <li><b>alias</b>：<code>alias ll='ls -alF'</code> 建立別名。</li>
  <li><b>~/.bashrc</b>：每次開啟互動式 bash 時執行，常放別名與環境變數。修改後執行 <code>source ~/.bashrc</code> 立即生效。</li>
  <li><b>history</b>：列出歷史指令，<code>!!</code> 重新執行上一個指令（常見 <code>sudo !!</code>）。</li>
</ul>` },
    { id: 'quote', title: '引號與命令替換', html: `
<div class="table-wrap"><table>
<tr><th>寫法</th><th>結果</th><th>說明</th></tr>
<tr><td><code>echo "Hi $USER"</code></td><td>Hi student</td><td><b>雙引號</b>會展開變數</td></tr>
<tr><td><code>echo 'Hi $USER'</code></td><td>Hi $USER</td><td><b>單引號</b>原樣輸出</td></tr>
<tr><td><code>echo "今天是 $(date +%F)"</code></td><td>今天是 2026-10-17</td><td><b>命令替換</b>：把指令輸出放進字串</td></tr>
<tr><td><code>echo \\$HOME</code></td><td>$HOME</td><td>反斜線跳脫特殊字元</td></tr>
</table></div>
<div class="box tip"><b class="t">實務習慣</b>使用變數時加上雙引號，例如 <code>rm "$file"</code>，避免檔名含空格時被拆成兩個參數。</div>` }
  ],
  keypoints: [
    'vim：i 進入插入模式、Esc 回一般模式、:wq 存檔離開、:q! 放棄修改',
    'dd 刪除整行、yy 複製、p 貼上、u 復原',
    '變數設定等號兩邊不能有空格；export 讓子程序也能使用',
    'PATH 決定指令搜尋位置；不在 PATH 要用 ./ 執行',
    '~/.bashrc 放別名與環境變數，source 立即生效',
    '雙引號展開變數、單引號原樣輸出、$( ) 命令替換'
  ]
},
{
  id: 'c05', subject: 1, minutes: 55,
  title: '使用者、群組與權限',
  summary: '帳號相關檔案、使用者與群組管理、sudo 與最小權限、讀寫執行權限的數字與符號表示、chown、umask，以及 SUID、SGID、Sticky Bit。',
  sections: [
    { id: 'files', title: '帳號相關檔案', html: `
<div class="table-wrap"><table>
<tr><th>檔案</th><th>內容</th><th>權限</th></tr>
<tr><td><b>/etc/passwd</b></td><td>帳號、UID、GID、家目錄、登入 Shell</td><td>所有人可讀</td></tr>
<tr><td><b>/etc/shadow</b></td><td><b>密碼雜湊</b>與密碼期限</td><td>僅 root 可讀</td></tr>
<tr><td><b>/etc/group</b></td><td>群組與成員</td><td>所有人可讀</td></tr>
<tr><td>/etc/sudoers</td><td>sudo 權限設定，應以 <code>visudo</code> 編輯</td><td>僅 root</td></tr>
</table></div>
<pre class="out">student:x:1000:1000:Student,,,:/home/student:/bin/bash
帳號  │ UID  GID  說明          家目錄         登入 Shell
      └─ x 代表密碼存在 /etc/shadow</pre>
<ul>
  <li><b>UID 0</b> 為 root；Ubuntu 一般使用者從 <b>1000</b> 開始；系統服務帳號 UID 較小。</li>
  <li>登入 Shell 為 <code>/usr/sbin/nologin</code> 的帳號不能互動登入，常用於服務帳號。</li>
</ul>` },
    { id: 'manage', title: '使用者與群組管理', html: `
<pre class="out">sudo useradd -m -s /bin/bash alice   # 建立帳號，-m 建立家目錄
sudo adduser bob                     # Ubuntu 互動式建立（較友善）
sudo passwd alice                    # 設定密碼
sudo usermod -aG sudo alice          # 加入 sudo 群組（RHEL 為 wheel）
sudo usermod -L alice                # 鎖定帳號
sudo userdel -r alice                # 刪除帳號與家目錄
sudo groupadd devops                 # 建立群組
id alice                             # 查看 UID、GID 與所屬群組
whoami                               # 目前使用者</pre>
<div class="box warn"><b class="t">-aG 的 a 不能漏</b><code>usermod -G sudo alice</code> 會把 alice 的附加群組<b>整個換成</b>只有 sudo；加上 -a 才是「附加」。</div>
<h3>sudo 與 root</h3>
<ul>
  <li><b>最小權限</b>：平時用一般帳號，需要時才用 <code>sudo</code> 執行單一指令，並留下紀錄（/var/log/auth.log）。</li>
  <li><code>sudo -i</code> 切換成 root 互動環境；<code>su - 使用者</code> 切換帳號。</li>
  <li>伺服器應<b>禁止 root 直接 SSH 登入</b>（第 11 章）。</li>
</ul>` },
    { id: 'perm', title: '權限：讀、寫、執行', html: `
<div class="table-wrap"><table>
<tr><th>權限</th><th>數字</th><th>對檔案</th><th>對目錄</th></tr>
<tr><td><b>r</b> 讀</td><td>4</td><td>讀取內容</td><td>列出目錄內的檔名</td></tr>
<tr><td><b>w</b> 寫</td><td>2</td><td>修改內容</td><td>新增、刪除、改名目錄內的檔案</td></tr>
<tr><td><b>x</b> 執行</td><td>1</td><td>執行程式或腳本</td><td><b>進入目錄</b>（cd）</td></tr>
</table></div>
<pre class="out">-rwxr-x---    擁有者 rwx = 7、群組 r-x = 5、其他人 --- = 0  →  750

chmod 644 file.txt         # rw-r--r--：一般檔案
chmod 755 script.sh        # rwxr-xr-x：程式、目錄
chmod 600 ~/.ssh/id_ed25519  # rw-------：私鑰
chmod u+x script.sh        # 擁有者加上執行權限
chmod g-w,o-r file.txt     # 群組移除寫入、其他人移除讀取
chmod -R 750 /srv/app      # 遞迴套用
sudo chown alice:devops report.txt   # 變更擁有者與群組</pre>
<p>可以到「互動練習」使用 <b>chmod 權限計算器</b>。</p>
<h3>umask</h3>
<p>umask 決定新檔案的預設權限。預設 <b>022</b> 時：新檔案 666 − 022 = <b>644</b>、新目錄 777 − 022 = <b>755</b>（檔案預設不給執行權限）。</p>` },
    { id: 'special', title: '特殊權限', html: `
<div class="table-wrap"><table>
<tr><th>權限</th><th>數字</th><th>顯示</th><th>作用</th><th>例子</th></tr>
<tr><td><b>SUID</b></td><td>4</td><td>擁有者 x 位置變 <b>s</b></td><td>執行時以<b>檔案擁有者</b>身分執行</td><td><code>/usr/bin/passwd</code>（-rwsr-xr-x）</td></tr>
<tr><td><b>SGID</b></td><td>2</td><td>群組 x 位置變 s</td><td>目錄內新檔案繼承目錄的群組</td><td>團隊共用目錄</td></tr>
<tr><td><b>Sticky Bit</b></td><td>1</td><td>其他人 x 位置變 <b>t</b></td><td>目錄內只有檔案擁有者能刪除自己的檔案</td><td><code>/tmp</code>（drwxrwxrwt，1777）</td></tr>
</table></div>
<div class="box warn"><b class="t">資安重點</b>擁有者為 root 的 SUID 程式若有漏洞，可被用來提權。資安檢查常用 <code>find / -perm -4000 2>/dev/null</code> 列出 SUID 檔案，比對是否有不該出現的項目。</div>` }
  ],
  keypoints: [
    '/etc/passwd 帳號資訊、/etc/shadow 密碼雜湊（僅 root 可讀）',
    'UID 0 為 root；Ubuntu 一般使用者從 1000 開始',
    'usermod -aG 附加群組，漏掉 -a 會覆蓋原群組',
    'Ubuntu 管理員群組為 sudo、RHEL 為 wheel；以 visudo 編輯 sudoers',
    'r=4、w=2、x=1；目錄的 x 代表可進入',
    'umask 022 → 新檔案 644、新目錄 755',
    'SUID 4、SGID 2、Sticky 1；/tmp 為 1777'
  ]
},
{
  id: 'c06', subject: 1, minutes: 55,
  title: 'Shell Script 與排程',
  summary: '腳本結構與執行方式、變數與參數、條件判斷與 test、迴圈、函式、結束碼與錯誤處理，以及 cron 排程與實用範例。',
  sections: [
    { id: 'basic', title: '第一個腳本', html: `
<pre class="out">#!/bin/bash
# backup.sh：備份指定目錄
src="$1"                          # 第一個參數
dest="/backup/$(date +%Y%m%d)"
mkdir -p "$dest"
cp -r "$src" "$dest/"
echo "已備份 $src 到 $dest"</pre>
<pre class="out">chmod +x backup.sh       # 加上執行權限
./backup.sh /etc         # 執行（目前目錄不在 PATH 中，要加 ./）
bash backup.sh /etc      # 或直接交給 bash 執行</pre>
<ul>
  <li>第一行 <b>shebang</b>（<code>#!/bin/bash</code>）指定用哪個直譯器執行。</li>
  <li><code>#</code> 開頭為註解。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>特殊變數</th><th>意義</th></tr>
<tr><td><code>$0</code></td><td>腳本名稱</td></tr>
<tr><td><code>$1</code>、<code>$2</code>…</td><td>第 1、2 個參數</td></tr>
<tr><td><code>$#</code></td><td>參數個數</td></tr>
<tr><td><code>$@</code></td><td>所有參數</td></tr>
<tr><td><code>$?</code></td><td>上一個指令的<b>結束碼</b>（0 成功、非 0 失敗）</td></tr>
<tr><td><code>$$</code></td><td>目前程序的 PID</td></tr>
</table></div>` },
    { id: 'if', title: '條件判斷', html: `
<pre class="out">#!/bin/bash
if [ $# -lt 1 ]; then
  echo "用法：$0 檔案名稱"
  exit 1
fi

if [ -f "$1" ]; then
  echo "$1 是一般檔案"
elif [ -d "$1" ]; then
  echo "$1 是目錄"
else
  echo "$1 不存在"
fi</pre>
<div class="table-wrap"><table>
<tr><th>類型</th><th>測試</th></tr>
<tr><td>檔案</td><td><code>-f</code> 一般檔案、<code>-d</code> 目錄、<code>-e</code> 存在、<code>-r/-w/-x</code> 可讀寫執行、<code>-s</code> 大小不為 0</td></tr>
<tr><td>數字</td><td><code>-eq</code> 等於、<code>-ne</code> 不等於、<code>-gt</code> 大於、<code>-lt</code> 小於、<code>-ge</code>、<code>-le</code></td></tr>
<tr><td>字串</td><td><code>=</code> 相等、<code>!=</code> 不等、<code>-z</code> 空字串、<code>-n</code> 非空</td></tr>
</table></div>
<p><code>[ ]</code> 內側必須留空格。<code>&amp;&amp;</code> 前一個成功才執行下一個；<code>||</code> 前一個失敗才執行下一個，例如 <code>mkdir logs || echo "建立失敗"</code>。</p>` },
    { id: 'loop', title: '迴圈與函式', html: `
<pre class="out">for f in /var/log/*.log; do
  echo "$f 有 $(wc -l &lt; "$f") 行"
done

for i in {1..3}; do echo "第 $i 次"; done

count=0
while [ $count -lt 3 ]; do
  count=$((count + 1))        # 算術運算
done

check_disk() {
  usage=$(df / --output=pcent | tail -1 | tr -dc '0-9')
  if [ "$usage" -gt 80 ]; then echo "警告：根目錄使用率 $usage%"; fi
}
check_disk</pre>
<div class="box tip"><b class="t">讓腳本更安全</b>在腳本開頭加上 <code>set -euo pipefail</code>：遇到錯誤立即停止（-e）、使用未定義變數時報錯（-u）、管線中任一指令失敗就視為失敗（pipefail）。</div>` },
    { id: 'cron', title: 'cron 排程', html: `
<pre class="out">crontab -e        # 編輯目前使用者的排程
crontab -l        # 列出排程

┌──────── 分（0-59）
│ ┌────── 時（0-23）
│ │ ┌──── 日（1-31）
│ │ │ ┌── 月（1-12）
│ │ │ │ ┌ 週（0-7，0 和 7 都是週日）
│ │ │ │ │
30 2 * * * /home/student/backup.sh /etc &gt;&gt; /home/student/backup.log 2&gt;&amp;1</pre>
<div class="table-wrap"><table>
<tr><th>寫法</th><th>意義</th></tr>
<tr><td><code>0 * * * *</code></td><td>每小時整點</td></tr>
<tr><td><code>*/5 * * * *</code></td><td>每 5 分鐘</td></tr>
<tr><td><code>0 9 * * 1-5</code></td><td>週一到週五 09:00</td></tr>
<tr><td><code>0 0 1 * *</code></td><td>每月 1 日 00:00</td></tr>
<tr><td><code>@reboot</code></td><td>開機時執行一次</td></tr>
</table></div>
<ul>
  <li>cron 的環境變數很少，腳本與檔案請寫<b>絕對路徑</b>，並把輸出導到日誌檔方便除錯。</li>
  <li>系統層級排程放在 <code>/etc/crontab</code> 與 <code>/etc/cron.d/</code>；也可用 systemd timer。</li>
  <li><b>資安</b>：攻擊者常在 crontab 植入後門以維持存取，調查時要檢查所有使用者的排程（第 12 章）。</li>
</ul>
<p>可以到「互動練習」使用 <b>cron 表示式解讀</b>工具。</p>` }
  ],
  keypoints: [
    'shebang #!/bin/bash 指定直譯器；chmod +x 後用 ./ 執行',
    '$1 第一個參數、$# 參數個數、$? 結束碼（0 成功）',
    '[ ] 內側要空格；-f 檔案、-d 目錄、-eq/-gt/-lt 數字比較',
    '&& 成功才執行；|| 失敗才執行',
    '$(( )) 算術運算；set -euo pipefail 讓腳本更安全',
    'cron 五欄：分 時 日 月 週；*/5 每 5 分鐘',
    'cron 裡用絕對路徑並記錄輸出；crontab 是常見的後門位置'
  ]
}
);
