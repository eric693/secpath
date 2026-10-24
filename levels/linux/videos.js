/* Linux 系統管理實務教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-17）
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const NB = (yt, title) => ({ title, yt, by: '非本科系學程式找工作' });
  const LT = (yt, title) => ({ title, yt, by: 'Learn Linux TV', lang: 'en' });
  window.VIDEOS = {
    review: [
      NB('JV5LE6jG66s', 'Linux 從零開始指令實務速成'),
      { title: '快速 Linux 指令教學：工程師必備技能', yt: '-fzO7iWCSWY', by: '走歪的工程師James' },
      { title: 'SOC 戰情室的大腦：SIEM、Linux 與網路監控', yt: '6yVxrgmB1-A', by: 'mjmc' }
    ],
    chapters: {
      c01: [
        { title: 'Linux 發行版怎麼選？Ubuntu、Debian、Fedora、Arch、Kali 一次講清楚', yt: '4i01dxVZF_k', by: '芯片园地' },
        { title: 'Linux 操作系統簡介和 Ubuntu 安裝', yt: 'gbHlaZD4ZtU', by: '图灵星球TuringPlanet' },
        { title: '學 Linux 還要重裝電腦？Windows 直接上手（WSL）', yt: 'X9_PHo7T9JI', by: '计算深处' }
      ],
      c02: [
        NB('bmM3vbrF6uk', 'Linux 入門（1）：目錄結構與各資料夾用途介紹'),
        NB('GabZRztpTvI', 'Linux 入門（2）：檔案屬性、路徑操作與 root 觀念'),
        NB('nf4yLuTD69U', 'Linux 入門（5）：檔案符號與類型操作介紹'),
        NB('rOKHcO91qSk', 'Linux 入門（6）：SoftLink、HardLink、Passwd'),
        NB('VwcyoyvxovA', 'Linux 最常用檔案與系統指令一次學會')
      ],
      c03: [
        NB('Fy22wjUVMIA', 'Linux 入門（11）：輸出處理與 pipeline'),
        NB('xGou2XfRTB0', '搞懂 Linux STDOUT 與 STDERR：訊息導向與錯誤排除技巧'),
        NB('okfb-z_8Uhg', 'Redirect 與 Pipe 原理'),
        NB('3mKi7nmRDOM', 'grep + 正規表示式搞定文字搜尋'),
        LT('zMKacHGuIHI', 'Linux Crash Course - Data Streams (stdin, stdout & stderr)')
      ],
      c04: [
        NB('9SCDdN4WT4w', 'Linux 入門（14）：vi 編輯器從入門到上手'),
        NB('YQYZikkwKj4', 'vim 文字編輯器實用快捷鍵'),
        { title: 'Vim 教學 01：Vim 極速入門', yt: 'd0gb7448xIA', by: 'Yen-Lung Tsai' },
        NB('I1UQBcj68oQ', 'Linux 常見指令型態與別名實戰解析（含函式與 Shebang）')
      ],
      c05: [
        NB('GxSuP-bWwts', 'Linux 入門（7）：檔案權限管理與 chmod'),
        { title: 'Linux 教學：chown 修改檔案擁有者，與 chmod 搭配權限管理', yt: 'oK7NQo2PFlc', by: '贊贊小屋' },
        NB('GM_061D9VG4', '新手必學：使用者、群組與 sudo 權限完整實作'),
        NB('4DhCuEzH3gk', '使用者切換與權限管理：su、sudo 與 visudo 設定'),
        NB('HU9ma_GbAUA', 'Linux 入門（16）：公司都怎麼管帳號？')
      ],
      c06: [
        { title: '30 分鐘 Shell 光速入門教程', yt: 'Y-b3RvwVq7c', by: 'GeekHour' },
        NB('gFphNADwCpY', '【Shell Script】變數使用規則與作用範圍'),
        NB('uCtCoKeJ4Go', '【Shell Script】引用外部 Script 與變數傳遞機制'),
        NB('orY1zodlC-I', 'Linux 入門（21）：crontab 與 crond 服務完整介紹'),
        { title: 'Linux 循環工作排程：Crontab', yt: '73TDU5KVWMY', by: 'IT喵喵叫-Mr. Lambert IT Academy' }
      ],
      c07: [
        NB('xIIEFYgW54g', 'Linux 入門（20）：ps 與 top，Process 監控工具'),
        NB('5wZw4G1tGsk', 'Linux 入門（23）：cron 自動化排程與 kill 指令補充'),
        { title: '如何在 Linux 上監控進程（top、htop、ps）', yt: 'kt5yu0ewcAk', by: 'HardReset_cn' }
      ],
      c08: [
        { title: 'systemd 一定要會的操作：服務管理，systemctl 指令常用操作', yt: 'a_A_LdwOlB8', by: '挨踢實驗室 / IT LAB' },
        LT('Kzpm-rGAXos', 'Systemd Explained: How to Manage Linux Services Easily'),
        { title: 'Linux 系統快速分析日誌定位故障原因的 10 個方法', yt: 'DK55Gu6DMx0', by: 'IT_TUTORIAL_ZH' }
      ],
      c09: [
        NB('QmdMVCFPReE', '磁碟格式化、掛載實作與 fstab 設定'),
        NB('MomHl4KNCEg', 'Linux 入門（28）：設定 fstab 自動掛載與磁碟驗證操作流程'),
        NB('ASZhHZ9CPK4', '從分割到開機掛載：Linux XFS 磁碟實作'),
        { title: 'Ubuntu 22.04 硬碟空間管理 LVM（ext4）作法', yt: 'GC_heLaU38Y', by: '跟我一起做範例' },
        LT('A7xH74o6kY0', 'Linux Crash Course - The /etc/fstab file')
      ],
      c10: [
        NB('7eaGN0cDzCE', 'Linux 網路工具，從 ping 到 ss 一次搞懂'),
        { title: 'Linux ping、ip 指令：使用 127.0.0.1 檢查網路連線', yt: 'y3P2xNtC1oA', by: '贊贊小屋' }
      ],
      c11: [
        NB('Yzvb6VXO9QI', '必學 SSH 免密登入教學：用金鑰取代密碼登入設定'),
        { title: 'UFW 防火牆使用配置：保護 VPS 伺服器', yt: 'qK6oj1UK7m8', by: 'Day Day Up - 天天向上' },
        { title: '如何保護你的 Ubuntu 伺服器：fail2ban、SSH 登入保護', yt: '6KWtI3Z2Uug', by: 'Day Day Up - 天天向上' },
        NB('nQvZSA07aco', 'firewalld 基礎操作：查詢狀態與新增防火牆規則'),
        NB('AEpzKnofhB4', 'Linux 入門（32）：Firewalld 防火牆與 Rich Rule 基礎實作')
      ],
      c12: [
        { title: 'Linux 教程：SSH 密碼暴力破解及防禦實戰', yt: 'r9Px3Ut26zA', by: '曙光' },
        { title: '判斷 Linux 伺服器被攻擊的常用命令：lastb', yt: 'kVSIciwUaLQ', by: 'fixlinux' },
        { title: 'fail2ban 實現對 SSH 暴力破解密碼攻擊的防護', yt: '1Nvon90fDVQ', by: 'LinuxCast IT播客' }
      ]
    }
  };
})();
