/* Linux 系統管理實務課程設定（純教學課程，不針對證照） */
window.LEVEL = {
  id: 'linux',
  name: 'Linux',
  title: 'Linux 系統管理實務',
  overline: 'Linux 系統管理・從指令到資安維運',
  site: ['Ubuntu 官方文件', 'https://documentation.ubuntu.com/server/'],
  headline: 'Linux 系統管理實務<br>從指令到資安維運',
  lead: '12 章講義從零開始：檔案系統、文字處理、權限、Shell Script，一路到 systemd 服務、磁碟、網路、SSH 加固與日誌調查。以 Ubuntu 為主並對照 RHEL 指令，所有指令輸出都在真實 Linux 上執行驗證，適合準備 SOC、雲端或系統管理工作的初學者。',
  subjects: {
    1: { name: '基礎篇', title: '指令、檔案與權限' },
    2: { name: '管理篇', title: '系統、網路與資安' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '技能檢查清單', terms: 'Linux 常用名詞與指令', mnemonics: '重點口訣', numbers: '常用數字與路徑',
    sprintLead: '面試或實作前快速複習：口訣、常用路徑與埠號、各章重點。',
    examTip: '<b class="t">測驗說明</b>題目包含指令輸出判讀，建議開一台 Linux 虛擬機或雲端主機實際操作驗證。',
    videoNote: '指令以 Ubuntu 24.04 與 bash 5 為準'
  },
  readyNote: '建議兩部分都穩定在 80 分以上，並在自己的虛擬機上完成每章實作。',
  examInfo: [
    ['適合對象', 'Linux 初學者、準備 SOC／雲端／系統管理職缺者'],
    ['練習環境', 'Ubuntu 24.04（VirtualBox、WSL 或雲端主機），並對照 RHEL 系指令'],
    ['課程性質', '純教學實作課程，不針對特定證照'],
    ['先備知識', '會使用電腦與基本英文即可，不需程式背景'],
    ['學習時間', '講義約 10 小時，另加實作時間'],
    ['驗證方式', '講義與題目中的指令輸出皆在 Ubuntu 24.04、bash 5.2 實際執行驗證']
  ],
  examNote: '建議每章都在自己的虛擬機實際操作；練習會改變系統設定的指令前，先建立快照。',
  exam: { full: { n: 50, min: 60 }, quick: { n: 25, min: 30 } },
  plan: [
    ['第 1 週', '第 1～3 章：安裝練習環境、檔案系統與基本指令、grep 與管線'],
    ['第 2 週', '第 4～6 章：vim 與 Shell 環境、使用者與權限、Shell Script 與 cron'],
    ['第 3 週', '第 7～9 章：套件與程序、systemd 與日誌、磁碟與備份，完成基礎篇測驗'],
    ['第 4 週', '第 10～12 章：網路排錯、SSH 加固與防火牆、資安日誌調查'],
    ['第 5 週', '在自己的雲端主機完成加固清單，完成綜合測驗兩次並清空錯題本']
  ],
  mnemonics: [
    ['權限數字', 'r = 4、w = 2、x = 1；755 = rwxr-xr-x、644 = rw-r--r--'],
    ['權限順序', 'u 擁有者、g 群組、o 其他人、a 全部'],
    ['重導向', '> 覆寫、>> 附加、2> 錯誤輸出、2>&1 錯誤併入標準輸出、| 管線'],
    ['檔案描述元', '0 stdin、1 stdout、2 stderr'],
    ['cron 五欄', '分 時 日 月 週，例如 30 2 * * 1 = 每週一 02:30'],
    ['vim 三模式', '一般模式按 i 編輯、Esc 回一般模式、:wq 存檔離開、:q! 不存離開'],
    ['引號差異', '雙引號展開變數、單引號原樣輸出'],
    ['結束碼', '$? 為 0 代表成功，非 0 代表失敗'],
    ['特殊權限', 'SUID 4、SGID 2、Sticky 1；/tmp 為 1777'],
    ['systemctl', 'start 立即啟動、enable 開機啟動、enable --now 兩者皆做'],
    ['訊號', '15 SIGTERM 請程式結束、9 SIGKILL 強制終止、1 SIGHUP 重新載入'],
    ['網路排錯順序', 'ip a 介面 → ip route 路由 → ping 連通 → dig DNS → ss 埠號 → curl 服務'],
    ['SSH 加固', '金鑰登入、關閉密碼登入、禁止 root 登入、防火牆、fail2ban'],
    ['Debian 與 RHEL', 'apt／ufw／auth.log 對應 dnf／firewalld／secure']
  ],
  numbers: [
    ['/etc', '系統設定檔'],
    ['/var/log', '日誌檔'],
    ['/etc/passwd', '帳號資訊（所有人可讀）'],
    ['/etc/shadow', '密碼雜湊（僅 root 可讀）'],
    ['/var/log/auth.log', 'Ubuntu 的登入與 sudo 紀錄（RHEL 為 /var/log/secure）'],
    ['UID 0', 'root 帳號'],
    ['UID 1000 起', 'Ubuntu 一般使用者帳號'],
    ['umask 022', '新檔案 644、新目錄 755'],
    ['22', 'SSH 埠號'],
    ['80 / 443', 'HTTP / HTTPS'],
    ['53', 'DNS'],
    ['/24', '子網路遮罩 255.255.255.0，可用主機 254 台'],
    ['127.0.0.1', '本機回送位址（localhost）'],
    ['0 / 1 / 2', 'stdin / stdout / stderr']
  ],
  checklist: [
    '能在不看說明的情況下完成檔案建立、複製、移動、刪除與搜尋',
    '能用 grep、管線與 sort、uniq 統計日誌中的資料',
    '能用數字與符號兩種方式設定 chmod 權限',
    '寫出一個含參數、判斷與迴圈的 Shell Script，並用 cron 排程',
    '能用 systemctl 與 journalctl 管理服務並查看日誌',
    '能用 ip、ss、dig、curl 依序排除網路問題',
    '在自己的主機設定 SSH 金鑰登入、關閉密碼與 root 登入，並開啟防火牆',
    '能從 auth.log 找出暴力破解來源 IP 並統計次數'
  ],
  tools: [['chmod', 'c05'], ['cron', 'c06'], ['subnet', 'c10'], ['ports', 'c10']]
};
