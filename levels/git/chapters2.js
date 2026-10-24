/* Git 協作篇：遠端、GitHub 與團隊實務 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c06', subject: 2, minutes: 45,
  title: '遠端儲存庫',
  summary: '遠端儲存庫與 origin、clone、push、fetch、pull、追蹤分支、遠端分支的命名、SSH 金鑰與個人存取權杖，以及 push 被拒絕時的處理。',
  sections: [
    { id: 'remote', title: '遠端儲存庫', html: `
<p><b>遠端儲存庫（Remote）</b>是放在 GitHub 等伺服器上的儲存庫複本，用來備份與多人協作。慣例上主要的遠端叫做 <b>origin</b>。</p>
<div class="flow">
  <div><b>本機儲存庫</b><span>你的電腦</span></div>
  <div><b>git push</b><span>上傳提交</span></div>
  <div><b>遠端 origin</b><span>GitHub</span></div>
  <div><b>git fetch／pull</b><span>下載別人的提交</span></div>
</div>
<pre class="out">git clone https://github.com/帳號/專案.git        # 下載整個儲存庫（含完整歷史），自動設定 origin
git remote -v                                     # 查看遠端
git remote add origin git@github.com:帳號/專案.git  # 本機已有儲存庫，連接到新的遠端
git remote set-url origin 新網址                   # 更換遠端網址</pre>` },
    { id: 'push', title: 'push、fetch 與 pull', html: `
<table>
<tr><th>指令</th><th>作用</th></tr>
<tr><td><code>git push -u origin main</code></td><td>第一次推送並設定追蹤（-u），之後只要 <code>git push</code></td></tr>
<tr><td><code>git fetch</code></td><td>下載遠端的新提交，更新 <code>origin/main</code> 等遠端追蹤分支，<b>不會改動你的工作目錄</b></td></tr>
<tr><td><code>git pull</code></td><td>等於 <code>git fetch</code> + <code>git merge</code>，把遠端的新提交合併進目前分支</td></tr>
<tr><td><code>git pull --rebase</code></td><td>fetch 後改用 rebase 把你的提交接在遠端最新提交之後，歷史較整齊（第 8 章）</td></tr>
</table>
<p><code>origin/main</code> 是<b>遠端追蹤分支</b>：記錄上次 fetch 時遠端 main 的位置。可以先 fetch，再比較差異：</p>
<pre class="out">git fetch
git log --oneline main..origin/main     # 遠端有、本機還沒有的提交
git diff main origin/main               # 內容差異
git merge origin/main                   # 確認後再合併</pre>
<div class="box tip"><b class="t">fetch 比 pull 安全</b>不確定遠端改了什麼時，先 fetch 看一下，再決定怎麼合併。pull 會直接合併，可能突然出現衝突。</div>` },
    { id: 'rejected', title: 'push 被拒絕', html: `
<pre class="out">git push
 ! [rejected]        main -&gt; main (fetch first)
error: failed to push some refs to 'github.com:team/shop.git'
hint: Updates were rejected because the remote contains work that you do not have locally.</pre>
<p>代表遠端有別人推上去、而你本機還沒有的提交。Git 不允許直接覆蓋，正確做法：</p>
<pre class="out">git pull              # 先把遠端的提交合併進來（有衝突就解決）
git push              # 再推送</pre>
<div class="box warn"><b class="t">不要隨便 push --force</b><code>git push --force</code> 會用你的歷史覆蓋遠端，<b>別人推上去的提交會消失</b>。真的需要（例如自己的分支 rebase 後）也應改用 <code>git push --force-with-lease</code>，它會在遠端有你沒看過的新提交時拒絕推送。共用分支（main）永遠不要 force push。</div>` },
    { id: 'auth', title: '驗證：SSH 金鑰與權杖', html: `
<p>GitHub 已不接受用帳號密碼推送，要改用以下兩種方式之一：</p>
<table>
<tr><th>方式</th><th>網址格式</th><th>說明</th></tr>
<tr><td><b>SSH 金鑰</b></td><td><code>git@github.com:帳號/專案.git</code></td><td>設定一次後不用再輸入密碼，推薦開發者使用</td></tr>
<tr><td><b>個人存取權杖</b>（PAT）</td><td><code>https://github.com/帳號/專案.git</code></td><td>在 GitHub 設定中產生權杖，推送時當作密碼輸入；可設定權限範圍與期限</td></tr>
</table>
<pre class="out"># 產生 SSH 金鑰（一路按 Enter 即可，建議設定密碼保護金鑰）
ssh-keygen -t ed25519 -C "ming@example.com"

# 顯示公鑰，複製後貼到 GitHub → Settings → SSH and GPG keys → New SSH key
cat ~/.ssh/id_ed25519.pub

# 測試連線
ssh -T git@github.com
# Hi ming! You've successfully authenticated...</pre>
<div class="box warn"><b class="t">私鑰絕不外流</b><code>id_ed25519</code>（沒有 .pub）是私鑰，等同你的身分，不能傳給任何人、不能放進儲存庫。只有 <code>.pub</code> 公鑰可以貼到 GitHub。</div>
<div class="box tip"><b class="t">GitHub CLI</b>安裝 GitHub 官方的 <code>gh</code> 指令工具，執行 <code>gh auth login</code> 可以用瀏覽器完成登入與設定，也能在命令列建立 Pull Request。</div>` },
    { id: 'branches', title: '遠端分支操作', html: `
<pre class="out">git push -u origin feature/login        # 推送新分支並設定追蹤
git branch -vv                          # 查看每個分支追蹤哪個遠端分支、領先或落後幾個提交
git switch feature/report               # 遠端有同名分支時，自動建立本機分支並追蹤
git push origin --delete feature/login  # 刪除遠端分支
git fetch --prune                       # 清除遠端已刪除、本機仍殘留的遠端追蹤分支</pre>
<div class="box memo"><b class="t">動手做</b>在 GitHub 建立一個新的儲存庫，設定 SSH 金鑰，把本機專案推上去。另外用 GitHub 網頁直接修改一個檔案，再在本機用 fetch 查看差異、用 pull 合併下來。</div>` }
  ],
  keypoints: [
    'origin 是主要遠端的慣用名稱；git clone 會自動設定',
    'git push -u origin 分支 第一次推送並設定追蹤',
    'git fetch 只下載不合併；git pull = fetch + merge',
    'origin/main 是遠端追蹤分支，記錄上次 fetch 時遠端的位置',
    'push 被拒絕時先 pull 再 push；共用分支不要 force push，必要時用 --force-with-lease',
    'GitHub 推送用 SSH 金鑰或個人存取權杖，私鑰絕不外流',
    'git push origin --delete 刪除遠端分支；git fetch --prune 清理殘留'
  ]
},
{
  id: 'c07', subject: 2, minutes: 45,
  title: 'GitHub 協作',
  summary: 'Pull Request 的完整流程、程式碼審查、Issues 與專案管理、Fork 參與開源、保護分支規則、CODEOWNERS，以及 GitHub Flow。',
  sections: [
    { id: 'pr', title: 'Pull Request', html: `
<p><b>Pull Request（PR，GitLab 稱 Merge Request）</b>是請求把你的分支合併進主分支的申請。團隊成員可以在 PR 中檢視修改、留言討論、執行自動測試，通過後才合併。</p>
<div class="flow">
  <div><b>1. 開分支開發</b><span>git switch -c feature/coupon</span></div>
  <div><b>2. 推送分支</b><span>git push -u origin feature/coupon</span></div>
  <div><b>3. 建立 PR</b><span>說明做了什麼、為什麼、怎麼測試</span></div>
  <div><b>4. 審查與修改</b><span>依意見修改後再推送，PR 自動更新</span></div>
  <div><b>5. 合併並刪除分支</b><span>本機 git switch main && git pull</span></div>
</div>
<h3>好的 PR 描述</h3>
<pre class="out">## 做了什麼
新增結帳頁的優惠券輸入欄位，支援百分比與固定金額兩種折扣。

## 為什麼
行銷部雙十一活動需要（Issue #42）。

## 如何測試
1. 購物車加入任意商品，進入結帳頁
2. 輸入 SAVE10，總金額應打九折
3. 輸入過期優惠碼，應顯示「優惠碼已失效」

## 截圖
（結帳頁畫面）</pre>
<p>GitHub 合併 PR 有三種方式：</p>
<table>
<tr><th>方式</th><th>結果</th><th>適合</th></tr>
<tr><td>Create a merge commit</td><td>保留分支所有提交，並產生合併提交</td><td>想保留完整開發過程</td></tr>
<tr><td>Squash and merge</td><td>把 PR 的所有提交壓成一個提交</td><td>main 歷史簡潔，一個 PR 一個提交（很常用）</td></tr>
<tr><td>Rebase and merge</td><td>把提交逐一接到 main 後面，不產生合併提交</td><td>想要線性歷史又保留每個提交</td></tr>
</table>` },
    { id: 'review', title: '程式碼審查', html: `
<table>
<tr><th>審查者</th><th>提交者</th></tr>
<tr><td>先理解 PR 要解決的問題再看程式碼</td><td>PR 保持小而專一，一次只做一件事</td></tr>
<tr><td>關注正確性、可讀性、安全性、測試</td><td>描述清楚，附上測試方式與截圖</td></tr>
<tr><td>具體指出問題並建議做法，對事不對人</td><td>先自己看過一次差異再請別人審查</td></tr>
<tr><td>區分「必須修改」與「建議」</td><td>回覆每則意見，修改後通知審查者</td></tr>
</table>
<div class="box tip"><b class="t">PR 越小越好</b>200 行以內的 PR 通常能被仔細審查；上千行的 PR 往往只會得到「看起來沒問題」。大功能拆成多個小 PR 依序合併。</div>` },
    { id: 'issues', title: 'Issues 與專案管理', html: `
<ul>
  <li><b>Issues</b>：回報錯誤、提出功能需求、討論待辦事項；可指派負責人、加上標籤（bug、enhancement）、設定里程碑。</li>
  <li><b>連結 PR 與 Issue</b>：在 PR 描述或提交訊息寫 <code>Closes #42</code>，PR 合併時會自動關閉 Issue #42。</li>
  <li><b>Projects</b>：看板式的工作管理（待辦、進行中、完成），可以和 Issues、PR 連動。</li>
  <li><b>Issue 範本</b>：設定錯誤回報的固定欄位（重現步驟、預期結果、實際結果、環境），讓回報更完整。</li>
</ul>` },
    { id: 'fork', title: 'Fork 與參與開源', html: `
<p>沒有某個儲存庫的寫入權限（例如開源專案）時，用 <b>Fork</b>：在自己的帳號下建立一份複本，修改後再向原專案發 PR。</p>
<div class="flow">
  <div><b>Fork</b><span>原專案 → 你的帳號</span></div>
  <div><b>Clone 你的複本</b><span>origin = 你的 fork</span></div>
  <div><b>設定 upstream</b><span>git remote add upstream 原專案網址</span></div>
  <div><b>開分支修改並推送</b><span>推到你的 fork</span></div>
  <div><b>發 PR 給原專案</b><span>等待維護者審查</span></div>
</div>
<pre class="out">git remote add upstream https://github.com/原作者/專案.git
git fetch upstream
git switch main
git merge upstream/main          # 讓你的 fork 跟上原專案的最新進度
git push origin main</pre>
<div class="box tip"><b class="t">第一次參與開源</b>先讀專案的 README 與 CONTRIBUTING.md，從標記為 <code>good first issue</code> 的題目開始，例如修正文件錯字或翻譯，熟悉流程。開源貢獻紀錄也是很好的履歷素材。</div>` },
    { id: 'protect', title: '保護分支與 GitHub Flow', html: `
<p>團隊專案應該在 GitHub 的 Settings → Branches（或 Rulesets）為 main 設定<b>保護規則</b>：</p>
<ul>
  <li>禁止直接推送到 main，所有修改都要經過 PR。</li>
  <li>合併前至少需要 1～2 位審查者核准。</li>
  <li>自動測試（GitHub Actions）必須通過才能合併。</li>
  <li>禁止 force push 與刪除 main。</li>
  <li><b>CODEOWNERS</b> 檔案：指定某些目錄的負責人，修改時自動要求他們審查。</li>
</ul>
<h3>GitHub Flow</h3>
<p>最簡單、也最多團隊採用的流程：</p>
<ol>
  <li>main 永遠保持可部署的狀態。</li>
  <li>每個新功能或修正都從 main 開一個分支。</li>
  <li>經常提交並推送到遠端分支。</li>
  <li>開 PR 討論與審查，自動測試通過。</li>
  <li>合併到 main 後立即部署，刪除分支。</li>
</ol>
<div class="box memo"><b class="t">動手做</b>找一位同學或同事，在同一個 GitHub 儲存庫各自開分支、發 PR、互相審查並留下至少一則修改建議，修改後再合併。設定 main 的保護規則，試試看直接推送 main 會發生什麼事。</div>` }
  ],
  keypoints: [
    'Pull Request 是合併分支的申請，用來審查、討論與自動測試',
    'PR 描述說明做了什麼、為什麼、如何測試；PR 保持小而專一',
    'GitHub 合併方式：merge commit、squash and merge、rebase and merge',
    '在 PR 描述寫 Closes #編號，合併時自動關閉 Issue',
    '沒有寫入權限時 Fork 專案，設定 upstream 同步原專案',
    '保護分支：禁止直接推送 main、需要審查核准與測試通過',
    'GitHub Flow：main 隨時可部署，每項修改都經由分支與 PR'
  ]
},
{
  id: 'c08', subject: 2, minutes: 45,
  title: 'rebase 與整理歷史',
  summary: 'rebase 的原理、merge 與 rebase 的比較、互動式 rebase 整理提交、cherry-pick 挑選提交、rebase 的黃金守則，以及 Conventional Commits 提交規範。',
  sections: [
    { id: 'rebase', title: 'rebase 的原理', html: `
<p><b>rebase（重新定基）</b>把你分支上的提交「拔下來」，重新接到另一個分支的最新提交後面。結果是一條<b>線性</b>的歷史，沒有合併提交。</p>
<pre class="out">rebase 前：
A ── B ── C ── F (main)
          └── D ── E (feature)

git switch feature
git rebase main

rebase 後：
A ── B ── C ── F (main)
               └── D' ── E' (feature)    D'、E' 是內容相同但編號不同的新提交

接著在 main 合併時就能快轉：
git switch main
git merge feature      # Fast-forward</pre>
<div class="box warn"><b class="t">rebase 會產生新的提交</b>D' 和 D 內容一樣，但父提交不同，所以提交編號不同。對 Git 來說它們是不同的提交，這就是為什麼不能 rebase 別人已經拿到的提交。</div>` },
    { id: 'compare', title: 'merge 還是 rebase', html: `
<table>
<tr><th>比較</th><th>merge</th><th>rebase</th></tr>
<tr><td>歷史</td><td>保留真實的分岔與合併過程</td><td>整理成一條直線，較容易閱讀</td></tr>
<tr><td>是否改寫歷史</td><td>不改寫，安全</td><td>改寫（產生新提交）</td></tr>
<tr><td>衝突處理</td><td>一次處理所有衝突</td><td>可能每個提交都要處理一次</td></tr>
<tr><td>適合</td><td>合併到共用分支、保留完整紀錄</td><td>整理自己還沒分享的分支、跟上 main 的進度</td></tr>
</table>
<h3>rebase 的黃金守則</h3>
<div class="box exam"><b class="t">不要 rebase 已經推送到共用分支、別人可能已經拿到的提交</b>只對「自己本機的提交」或「只有自己使用的分支」做 rebase。共用分支改寫歷史，其他人 pull 時會出現重複提交與大量衝突。</div>
<pre class="out"># 常見又安全的用法：開發中的功能分支跟上 main 的最新進度
git switch feature/report
git fetch
git rebase origin/main
# 有衝突：解決 → git add 檔案 → git rebase --continue
# 想放棄：git rebase --abort
git push --force-with-lease       # 這個分支只有你在用時，更新遠端</pre>` },
    { id: 'interactive', title: '互動式 rebase：整理提交', html: `
<p>開發過程中常會有「修錯字」「再修一次」「暫存」這類瑣碎的提交。發 PR 前可以用<b>互動式 rebase</b> 把它們整理乾淨：</p>
<pre class="out">git rebase -i HEAD~4</pre>
<pre class="out">pick 1a2b3c4 新增報表頁面
pick 5d6e7f8 修錯字
pick 9a0b1c2 報表加上匯出按鈕
pick 3d4e5f6 再修一次錯字

# 把指令改成：
pick 1a2b3c4 新增報表頁面
fixup 5d6e7f8 修錯字
pick 9a0b1c2 報表加上匯出按鈕
fixup 3d4e5f6 再修一次錯字</pre>
<table>
<tr><th>指令</th><th>作用</th></tr>
<tr><td><code>pick</code></td><td>保留這個提交</td></tr>
<tr><td><code>reword</code></td><td>保留但修改提交訊息</td></tr>
<tr><td><code>squash</code></td><td>併入上一個提交，並合併兩者的訊息</td></tr>
<tr><td><code>fixup</code></td><td>併入上一個提交，捨棄這個提交的訊息</td></tr>
<tr><td><code>drop</code></td><td>刪除這個提交</td></tr>
<tr><td>調換行的順序</td><td>改變提交的順序</td></tr>
</table>
<div class="box tip"><b class="t">更簡單的做法</b>如果只是想把整個分支壓成一個提交，可以直接在 GitHub 用「Squash and merge」合併 PR，或在本機用 <code>git reset --soft main</code> 後重新提交一次。</div>` },
    { id: 'cherry', title: 'cherry-pick：挑選提交', html: `
<p><code>git cherry-pick 提交</code> 把某個提交的修改「複製」到目前分支，產生一個新提交。常見用途：把 main 上的緊急修正套用到正在維護的舊版本分支。</p>
<pre class="out">git switch release/1.2
git cherry-pick a3c9e21              # 把修正登入漏洞的提交套用到 1.2 版
git cherry-pick a3c9e21 b7d0f13      # 一次挑多個</pre>
<div class="box warn"><b class="t">不要過度使用</b>cherry-pick 會讓同樣的修改以不同的提交編號存在多個分支，之後合併時可能產生混淆。一般功能應該用合併，cherry-pick 留給熱修補等特殊情況。</div>` },
    { id: 'conventional', title: 'Conventional Commits', html: `
<p>許多團隊採用 <b>Conventional Commits</b> 規範提交訊息，格式統一、方便閱讀，也能用工具自動產生更新紀錄（CHANGELOG）與判斷版本號。</p>
<pre class="out">&lt;類型&gt;(&lt;範圍&gt;): &lt;簡短說明&gt;

feat(cart): 新增優惠券輸入欄位
fix(login): 修正密碼錯誤時沒有提示的問題
docs: 更新安裝說明
refactor(report): 拆分報表計算函式
test: 補上訂單金額計算的單元測試
chore: 升級 requests 套件
feat!: 移除舊版 API（驚嘆號代表破壞性變更）</pre>
<table>
<tr><th>類型</th><th>意思</th><th>對應版本號（第 9 章）</th></tr>
<tr><td><code>feat</code></td><td>新功能</td><td>次版號 +1</td></tr>
<tr><td><code>fix</code></td><td>修正錯誤</td><td>修訂號 +1</td></tr>
<tr><td><code>feat!</code> 或 BREAKING CHANGE</td><td>破壞性變更</td><td>主版號 +1</td></tr>
<tr><td><code>docs</code>、<code>style</code>、<code>refactor</code>、<code>test</code>、<code>chore</code></td><td>文件、格式、重構、測試、雜項</td><td>通常不影響版本號</td></tr>
</table>` }
  ],
  keypoints: [
    'rebase 把分支的提交重新接到另一個分支最新提交之後，產生線性歷史',
    'rebase 會產生內容相同但編號不同的新提交',
    '黃金守則：不要 rebase 已推送到共用分支、別人可能已拿到的提交',
    'rebase 衝突：解決 → git add → git rebase --continue；放棄用 --abort',
    '互動式 rebase（rebase -i）：pick、reword、squash、fixup、drop 整理提交',
    'cherry-pick 把指定提交的修改複製到目前分支，適合熱修補',
    'Conventional Commits：feat、fix、docs、refactor 等類型，feat! 代表破壞性變更'
  ]
},
{
  id: 'c09', subject: 2, minutes: 40,
  title: '進階工具',
  summary: 'git stash 暫存修改、git tag 與 GitHub Release、語意化版本號、git blame 與 git bisect 追查問題、.gitattributes 與換行、Git LFS 管理大檔案。',
  sections: [
    { id: 'stash', title: 'stash：暫存手邊的修改', html: `
<p>正在開發功能，突然要切換分支修緊急 bug，但手邊的修改還沒完成、不想提交。這時用 <b>stash</b> 把修改暫時收起來：</p>
<pre class="out">git stash                       # 收起已追蹤檔案的修改，工作目錄回到乾淨狀態
git stash -u                    # 連未追蹤的新檔案一起收起
git stash push -m "報表做一半"   # 加上說明

git switch main                 # 去修 bug ……
git switch feature/report

git stash list                  # 列出所有暫存：stash@{0}: On feature/report: 報表做一半
git stash pop                   # 取回最新的暫存並刪除它
git stash apply stash@{1}       # 取回指定的暫存但保留在清單中
git stash drop stash@{1}        # 刪除指定的暫存</pre>
<div class="box tip"><b class="t">別讓 stash 堆積</b>stash 適合短暫使用，放太久容易忘記內容。要保留較久的修改，建議直接在分支上提交一個「WIP」提交，之後再用互動式 rebase 整理。</div>` },
    { id: 'tag', title: 'tag 與版本號', html: `
<p><b>標籤（Tag）</b>用來標記重要的提交，最常用於版本發布。和分支不同，標籤建立後不會移動。</p>
<pre class="out">git tag -a v1.2.0 -m "雙十一活動版本"   # 附註標籤（含作者、日期、說明，建議使用）
git tag v1.2.0-test                     # 輕量標籤（只是名字）
git tag                                 # 列出標籤
git show v1.2.0
git push origin v1.2.0                  # 標籤預設不會被 push，要另外推送
git push origin --tags                  # 推送所有標籤
git switch -c hotfix/1.2.1 v1.2.0       # 從某個版本開分支修補</pre>
<p>在 GitHub 可以從標籤建立 <b>Release</b>，附上更新說明與下載檔案。</p>
<h3>語意化版本號 SemVer</h3>
<p class="mono center">主版號.次版號.修訂號　例如 2.5.1</p>
<table>
<tr><th>變更</th><th>版本號</th><th>例子</th></tr>
<tr><td>不相容的破壞性變更</td><td>主版號 +1，其餘歸零</td><td>2.5.1 → 3.0.0</td></tr>
<tr><td>向下相容的新功能</td><td>次版號 +1，修訂號歸零</td><td>2.5.1 → 2.6.0</td></tr>
<tr><td>向下相容的錯誤修正</td><td>修訂號 +1</td><td>2.5.1 → 2.5.2</td></tr>
</table>
<div class="box tip"><b class="t">互動練習</b>到「互動練習 → 語意化版本計算」試算不同變更後的版本號，以及 <code>^1.4.2</code>、<code>~1.4.2</code> 這類相依範圍允許哪些升級。</div>` },
    { id: 'blame', title: 'blame 與 bisect：追查問題', html: `
<h3>git blame：這一行是誰、為什麼改的</h3>
<pre class="out">git blame config.py
git blame -L 10,20 config.py      # 只看第 10～20 行

a3c9e21 (王小明 2026-09-12 14:03) FREE_SHIPPING_THRESHOLD = 800</pre>
<p>找到提交編號後用 <code>git show a3c9e21</code> 查看完整修改與提交訊息，了解當時的原因。blame 的目的是理解脈絡，而不是找人究責。</p>
<h3>git bisect：用二分法找出哪個提交引入 bug</h3>
<p>「上個月還正常，現在壞了，中間有 200 個提交」，bisect 用二分搜尋，大約 8 次就能找到元凶：</p>
<pre class="out">git bisect start
git bisect bad                   # 目前的版本有問題
git bisect good v1.1.0           # v1.1.0 是正常的
# Git 自動切換到中間的提交，測試後告訴它結果：
git bisect good                  # 這個版本正常
git bisect bad                   # 這個版本有問題
# …重複幾次後 Git 會指出第一個有問題的提交
git bisect reset                 # 結束，回到原本的位置

git bisect run python test_login.py   # 有自動測試時，可以全自動執行</pre>` },
    { id: 'attr', title: '.gitattributes 與 Git LFS', html: `
<h3>.gitattributes</h3>
<p>設定特定檔案的處理方式，最常見的是統一換行字元，避免 Windows 與 macOS 同事互相「改到」整個檔案：</p>
<pre class="out">* text=auto            # 文字檔自動處理換行
*.sh text eol=lf       # Shell 腳本一律使用 LF
*.bat text eol=crlf    # Windows 批次檔使用 CRLF
*.png binary           # 二進位檔案，不做換行轉換與差異比對</pre>
<h3>Git LFS：管理大型檔案</h3>
<p>Git 會保存每個版本的完整內容，大型二進位檔案（影片、設計稿、資料集、模型）會讓儲存庫越來越大、clone 越來越慢。<b>Git LFS（Large File Storage）</b>只在儲存庫中保存指標，實際檔案存在另外的空間。</p>
<pre class="out">git lfs install
git lfs track "*.psd"
git lfs track "data/*.csv"
git add .gitattributes          # track 的設定會寫進 .gitattributes
git add design.psd
git commit -m "新增首頁設計稿"</pre>
<div class="box warn"><b class="t">GitHub 的檔案大小限制</b>GitHub 對單一檔案有大小限制，超過會拒絕推送；LFS 也有免費額度。大型資料集更適合放在雲端儲存（例如 S3），儲存庫中只放下載腳本。</div>` }
  ],
  keypoints: [
    'git stash 暫存未完成的修改，pop 取回並刪除、apply 取回但保留',
    '附註標籤 git tag -a v1.2.0 -m 用於版本發布；標籤要另外 push',
    '語意化版本：破壞性變更主版號 +1、新功能次版號 +1、修正修訂號 +1',
    'git blame 查每一行的修改者與提交，用來理解脈絡',
    'git bisect 以二分搜尋找出引入問題的提交，可搭配 run 自動測試',
    '.gitattributes 統一換行規則、標示二進位檔案',
    'Git LFS 管理大型二進位檔案，儲存庫只存指標'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '團隊實務與事故救援',
  summary: 'GitHub Flow、Git Flow 與主幹開發三種分支策略的比較、提交與 PR 的團隊規範、Git Hooks 與自動檢查，以及推了密碼、誤刪分支、錯誤 force push 等事故的處理方式。',
  sections: [
    { id: 'strategy', title: '三種分支策略', html: `
<table>
<tr><th>策略</th><th>做法</th><th>適合</th></tr>
<tr><td><b>GitHub Flow</b></td><td>只有 main 加上短期功能分支，透過 PR 合併後立即部署</td><td>網站、SaaS 等可以持續部署的專案（最常見）</td></tr>
<tr><td><b>Git Flow</b></td><td>main（正式版）、develop（開發中）、feature、release、hotfix 多種分支</td><td>有固定發版週期、需要同時維護多個版本的軟體，例如 App、套裝軟體</td></tr>
<tr><td><b>主幹開發</b> Trunk-based</td><td>所有人頻繁（每天）把小修改合併進 main，未完成的功能用功能開關（Feature Flag）隱藏</td><td>自動化測試完善、部署頻繁的成熟團隊</td></tr>
</table>
<pre class="out">Git Flow 示意：
main     ──●────────────────●───────●──      （只放正式發布的版本，打上標籤）
            \\              /       /
hotfix       \\            /   ●───┘          （緊急修正，合併回 main 與 develop）
              \\          /
release        \\    ●───●                    （準備發布，只修 bug）
                \\  /
develop  ────●───●───●───●───●──             （整合中的開發版本）
              \\     /
feature        ●───●                         （各個功能）</pre>
<div class="box tip"><b class="t">選擇建議</b>小團隊與大多數網頁專案從 GitHub Flow 開始就夠了。流程越複雜，維護成本越高；只有真的需要同時維護多個發行版本時，才考慮 Git Flow。</div>` },
    { id: 'rules', title: '團隊規範', html: `
<ul>
  <li><b>分支命名</b>：<code>feature/</code>、<code>fix/</code>、<code>hotfix/</code>、<code>docs/</code> 加上簡短英文描述或 Issue 編號，例如 <code>fix/42-login-timeout</code>。</li>
  <li><b>提交訊息</b>：統一使用 Conventional Commits 等格式。</li>
  <li><b>PR 規範</b>：使用 PR 範本、限制大小、至少一位審查者、測試通過才合併。</li>
  <li><b>合併方式</b>：團隊統一使用 squash 或 merge commit，避免歷史風格混雜。</li>
  <li><b>保護分支</b>：main 禁止直接推送與 force push。</li>
  <li><b>README 與 CONTRIBUTING.md</b>：寫清楚如何安裝、執行、測試與貢獻。</li>
</ul>
<h3>Git Hooks：自動檢查</h3>
<p><b>Hooks</b> 是 Git 在特定時間點自動執行的腳本，放在 <code>.git/hooks/</code>。常用的有：</p>
<table>
<tr><th>Hook</th><th>時機</th><th>用途</th></tr>
<tr><td><code>pre-commit</code></td><td>提交前</td><td>自動格式化、檢查語法、掃描是否含有密碼</td></tr>
<tr><td><code>commit-msg</code></td><td>寫完提交訊息後</td><td>檢查訊息是否符合規範</td></tr>
<tr><td><code>pre-push</code></td><td>推送前</td><td>執行測試</td></tr>
</table>
<p>.git/hooks 不會被提交，團隊常用 <b>pre-commit</b>（Python 工具）或 <b>husky</b>（Node.js 工具）把 hooks 設定放進專案，讓每個人都套用相同的檢查。更完整的自動化（測試、建置、部署）則交給 CI，在「DevOps 入門」課程介紹。</p>` },
    { id: 'secret', title: '事故一：不小心推了密碼', html: `
<div class="box warn"><b class="t">第一步永遠是：立刻撤銷並更換密碼或金鑰</b>一旦推到 GitHub（尤其是公開儲存庫），就要假設已經外洩：自動化機器人會在幾分鐘內掃描到新推上去的金鑰。刪除檔案或改寫歷史都無法保證別人沒拿到。</div>
<ol>
  <li><b>撤銷與更換</b>：到 AWS、Google、Anthropic 等服務後台停用外洩的金鑰並產生新的；資料庫密碼也要更換。</li>
  <li><b>檢查是否被濫用</b>：查看帳單、存取紀錄、異常的資源。</li>
  <li><b>停止追蹤並加入 .gitignore</b>：<code>git rm --cached .env</code>，把 .env 寫進 .gitignore 後提交。</li>
  <li><b>清除歷史（視情況）</b>：用 <code>git filter-repo</code> 等工具從所有歷史移除該檔案，並 force push；需要協調所有成員重新 clone。</li>
  <li><b>預防</b>：啟用 GitHub 的 Secret Scanning 與 Push Protection，並在 pre-commit 加入密碼掃描。</li>
</ol>` },
    { id: 'rescue', title: '事故二：其他常見救援', html: `
<table>
<tr><th>狀況</th><th>救援方式</th></tr>
<tr><td>誤刪了還沒合併的分支</td><td><code>git reflog</code> 找到該分支最後的提交編號，<code>git switch -c 分支名 提交編號</code></td></tr>
<tr><td>reset --hard 後發現提交還要用</td><td><code>git reflog</code> 找到 reset 前的位置，<code>git reset --hard HEAD@{1}</code></td></tr>
<tr><td>提交到錯的分支（例如直接提交到 main，還沒 push）</td><td><code>git switch -c feature/xxx</code> 把提交帶到新分支，再回 main <code>git reset --hard origin/main</code></td></tr>
<tr><td>已 push 的提交有問題</td><td><code>git revert 提交</code>，產生反向提交再推送</td></tr>
<tr><td>同事 force push 蓋掉了你的提交</td><td>從你本機（或其他人本機）還有的提交重新推送；你的 reflog 裡也找得到</td></tr>
<tr><td>合併或 rebase 弄亂了</td><td><code>git merge --abort</code>／<code>git rebase --abort</code>；已完成的用 reflog 回到之前</td></tr>
<tr><td>處於 detached HEAD 狀態</td><td>代表沒有在任何分支上；要保留這裡的提交就 <code>git switch -c 新分支</code>，否則 <code>git switch main</code> 回去</td></tr>
</table>
<div class="box exam"><b class="t">救援的原則</b>Git 很少真正「刪除」已提交的內容。遇到狀況先停下來，不要連續亂下指令；先用 <code>git status</code>、<code>git log --oneline --graph --all</code>、<code>git reflog</code> 搞清楚現在的狀態。不確定時，先 <code>git branch backup-日期</code> 建立一個備份分支再操作。</div>
<div class="box tip"><b class="t">恭喜完成</b>你已經具備在團隊中使用 Git 的能力。接下來可以學「DevOps 入門」，把 GitHub 與自動測試、Docker、雲端部署串在一起。</div>` }
  ],
  keypoints: [
    'GitHub Flow：main 加短期功能分支，適合持續部署（最常見）',
    'Git Flow：main、develop、feature、release、hotfix，適合固定發版與多版本維護',
    '主幹開發：每天把小修改合併進 main，未完成功能用 Feature Flag 隱藏',
    'Git Hooks：pre-commit、commit-msg、pre-push 自動檢查；團隊用 pre-commit 或 husky 共用設定',
    '推了密碼：第一步立刻撤銷並更換金鑰，再停止追蹤、視情況清除歷史',
    '誤刪分支、reset 錯誤都可以用 git reflog 找回',
    '救援前先停下來看清楚狀態，必要時先建立備份分支'
  ]
}
);
