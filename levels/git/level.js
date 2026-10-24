/* Git 版本控制課程設定（原創教學課程，非證照課程） */
window.LEVEL = {
  id: 'git',
  name: 'Git',
  title: 'Git 版本控制：從入門到團隊協作',
  overline: '開發必備技能・Git × GitHub',
  site: ['Git 官方文件（Pro Git 中文版）', 'https://git-scm.com/book/zh-tw/v2'],
  headline: 'Git 版本控制<br>從入門到團隊協作',
  lead: '不論寫程式、做資料分析、維護網站，Git 都是必備技能。10 章講義從三個區域、提交與還原，一路學到分支合併、處理衝突、GitHub Pull Request、rebase、事故救援與團隊分支策略。搭配網頁上的 Git 指令模擬器，可以邊輸入指令邊看到提交歷史如何變化。',
  subjects: {
    1: { name: '個人篇', title: '基本操作、還原與分支' },
    2: { name: '協作篇', title: '遠端、GitHub 與團隊實務' }
  },
  words: {
    exam: '綜合測驗', sprint: '重點整理', info: '課程資訊', review: '課程導讀',
    checklist: '實作完成清單', terms: 'Git 常用名詞', mnemonics: '重點口訣', numbers: '常用指令速查',
    sprintLead: '使用 Git 時隨時查閱：重點口訣、常用指令與各章重點。',
    examTip: '<b class="t">測驗說明</b>本課程沒有官方考試，綜合測驗以情境題與指令結果判讀為主，指令輸出題都在真實的 Git 中執行驗證過。',
    videoNote: '指令以 Git 2.40 以上版本與官方文件為準'
  },
  readyNote: '建議兩篇都穩定在 80 分以上，並在 GitHub 上完成一次完整的 Pull Request 流程。',
  examInfo: [
    ['課程定位', '零基礎學會 Git 與 GitHub，適合工程師、資料分析師、設計師與學生'],
    ['使用版本', 'Git 2.40 以上，指令以 git switch／git restore 新寫法為主'],
    ['練習環境', '網頁上的 Git 指令模擬器；完整操作請在自己的電腦安裝 Git'],
    ['學習時間', '講義約 7 小時，另加實作時間'],
    ['完成能力', '能獨立管理專案版本，並以 Pull Request 參與團隊協作'],
    ['銜接課程', 'DevOps 入門、Python 實戰作品集、AWS 部署']
  ],
  examNote: 'Git 指令有新舊兩種寫法（例如 git switch 與 git checkout），兩種都能用；講義以新寫法為主，並註明舊寫法方便閱讀網路上的教學。',
  exam: { full: { n: 40, min: 40 }, quick: { n: 20, min: 20 } },
  plan: [
    ['第 1 週', '第 1～3 章：安裝設定、基本工作流程、檢視歷史與還原，建立第一個儲存庫'],
    ['第 2 週', '第 4～5 章：分支與合併、處理合併衝突，完成個人篇測驗'],
    ['第 3 週', '第 6～7 章：遠端儲存庫、GitHub 協作與 Pull Request'],
    ['第 4 週', '第 8～10 章：rebase 與整理歷史、進階工具、團隊分支策略與事故救援，完成協作篇測驗'],
    ['之後', '把自己的專案放上 GitHub，持續以分支與 Pull Request 開發']
  ],
  mnemonics: [
    ['三個區域', '工作目錄（修改）→ 暫存區（git add）→ 儲存庫（git commit）'],
    ['提交前三看', 'git status 看狀態、git diff 看內容、git log 看歷史'],
    ['小步提交', '一個提交只做一件事，訊息說明「為什麼」改'],
    ['restore／reset／revert', 'restore 還原檔案、reset 移動分支指標、revert 新增反向提交'],
    ['推出去就不改寫', '已經 push 的歷史不要 reset、amend、rebase，改用 revert'],
    ['分支是指標', '建立分支只是多一個指向提交的標籤，又快又便宜'],
    ['快轉與合併提交', '目標分支沒有新提交時快轉；兩邊都有新提交時產生合併提交'],
    ['衝突三步', '打開檔案改好標記 → git add → git commit'],
    ['pull = fetch + merge', '想先看看遠端改了什麼，用 git fetch'],
    ['救援靠 reflog', '誤刪分支、reset 錯了，用 git reflog 找回之前的提交']
  ],
  numbers: [
    ['git init / git clone 網址', '建立新儲存庫／下載遠端儲存庫'],
    ['git add 檔名 / git add .', '加入暫存區'],
    ['git commit -m "訊息"', '提交'],
    ['git log --oneline --graph --all', '圖形化檢視所有分支的歷史'],
    ['git diff / git diff --staged', '看未暫存／已暫存的修改'],
    ['git restore 檔名', '放棄工作目錄的修改'],
    ['git restore --staged 檔名', '取消暫存'],
    ['git switch -c 分支', '建立並切換分支（舊寫法 checkout -b）'],
    ['git merge 分支', '把分支合併到目前所在分支'],
    ['git push -u origin 分支', '第一次推送並設定追蹤'],
    ['git revert 提交', '新增一個反向提交'],
    ['git reset --soft／--hard', '移動分支指標，hard 會丟棄修改'],
    ['git stash / git stash pop', '暫存手邊修改／取回'],
    ['git reflog', '查看 HEAD 的移動紀錄，救援用']
  ],
  checklist: [
    '在自己的電腦安裝 Git，並設定 user.name 與 user.email',
    '建立儲存庫並完成至少 5 次有意義的提交，訊息清楚說明原因',
    '寫好 .gitignore，確認密碼檔與虛擬環境沒有被追蹤',
    '能用 restore、reset、revert 處理三種不同的還原情境',
    '建立功能分支並合併回 main，經歷過一次快轉與一次合併提交',
    '自己製造一次合併衝突並成功解決',
    '設定 SSH 金鑰，把專案推上 GitHub',
    '完成一次完整的 Pull Request：開分支、推送、審查、合併、刪除分支',
    '能用 git stash 暫存修改，並用 git tag 標記版本',
    '能用 git reflog 找回被 reset 掉的提交'
  ],
  tools: [['gitgraph', 'c04'], ['gitcmd', 'c03'], ['semver', 'c09']]
};
