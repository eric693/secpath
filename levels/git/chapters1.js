/* Git 個人篇：基本操作、還原與分支
   <pre class="out"> 為指令與輸出範例；程式碼內的 < > & 寫成 &lt; &gt; &amp; */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 35,
  title: '版本控制與 Git 入門',
  summary: '為什麼需要版本控制、Git 與 GitHub 的差別、集中式與分散式版本控制、安裝 Git、設定使用者名稱與預設分支，以及搭配 VS Code 使用。',
  sections: [
    { id: 'why', title: '為什麼需要版本控制', html: `
<p>你是否看過這樣的資料夾？</p>
<pre class="out">報告_v1.docx
報告_v2.docx
報告_v2_修改.docx
報告_最終版.docx
報告_最終版_真的最終.docx
報告_最終版_主管改過.docx</pre>
<p><b>版本控制系統（Version Control System）</b>就是用來解決這個問題：自動記錄每一次修改的內容、時間、修改者與原因，隨時可以回到任何一個版本，多人也能同時修改同一份專案。</p>
<table>
<tr><th>沒有版本控制</th><th>使用 Git</th></tr>
<tr><td>靠檔名區分版本，容易混亂</td><td>每個版本都有完整紀錄與說明</td></tr>
<tr><td>改壞了很難找回之前的版本</td><td>一個指令回到任何版本</td></tr>
<tr><td>多人修改要互相傳檔、手動合併</td><td>各自在分支上開發，再自動合併</td></tr>
<tr><td>不知道誰在什麼時候改了什麼</td><td>每一行都查得到修改者與原因</td></tr>
</table>` },
    { id: 'git', title: 'Git 與 GitHub', html: `
<div class="concepts">
  <div class="concept"><b>Git</b><span>安裝在你電腦上的版本控制<b>軟體</b>，免費開源，不需要網路也能使用。由 Linux 作者 Linus Torvalds 在 2005 年開發。</span></div>
  <div class="concept"><b>GitHub</b><span>存放 Git 儲存庫的<b>雲端平台</b>，提供 Pull Request、程式碼審查、Issues、Actions 等協作功能。類似的平台還有 GitLab、Bitbucket。</span></div>
</div>
<div class="box analogy"><b class="t">生活比喻</b>Git 像是你電腦上的「存檔功能」，GitHub 像是放存檔的「雲端硬碟加上團隊協作空間」。不用 GitHub 也能用 Git，但多人協作通常會搭配 GitHub 這類平台。</div>
<h3>集中式與分散式</h3>
<table>
<tr><th>比較</th><th>集中式（例如 SVN）</th><th>分散式（Git）</th></tr>
<tr><td>歷史紀錄放在哪</td><td>只有中央伺服器有完整歷史</td><td>每個人的電腦都有完整歷史</td></tr>
<tr><td>離線能否提交</td><td>不行</td><td>可以，之後再推送到遠端</td></tr>
<tr><td>伺服器壞了</td><td>歷史可能遺失</td><td>任何一份複本都能還原</td></tr>
</table>` },
    { id: 'install', title: '安裝與設定', html: `
<table>
<tr><th>系統</th><th>安裝方式</th></tr>
<tr><td>Windows</td><td>到 <a href="https://git-scm.com/" target="_blank" rel="noopener">git-scm.com</a> 下載 Git for Windows，安裝時選項多半維持預設即可，會附上 Git Bash</td></tr>
<tr><td>macOS</td><td>終端機輸入 <code>git --version</code>，系統會提示安裝；或用 Homebrew：<code>brew install git</code></td></tr>
<tr><td>Ubuntu</td><td><code>sudo apt install git</code></td></tr>
</table>
<p>安裝後先完成三項設定（只要做一次）：</p>
<pre class="out">git --version                                   # 確認安裝成功
git config --global user.name "王小明"           # 提交紀錄上的名字
git config --global user.email "ming@example.com" # 建議與 GitHub 帳號相同
git config --global init.defaultBranch main      # 新儲存庫的預設分支名稱
git config --global --list                       # 檢查目前的設定</pre>
<div class="box tip"><b class="t">搭配 VS Code</b>VS Code 內建 Git 支援：左側「原始檔控制」面板可以看修改、暫存、提交，也能用圖形介面處理合併衝突。建議先學會指令，再用圖形介面提升效率；遇到問題時，懂指令才知道發生了什麼事。</div>
<div class="box memo"><b class="t">Windows 換行提醒</b>Windows 與 macOS／Linux 的換行字元不同。Git for Windows 預設會自動轉換（core.autocrlf），一般情況維持預設即可；團隊協作時可以在專案中加入 .gitattributes 統一規則（第 9 章）。</div>` },
    { id: 'first', title: '建立第一個儲存庫', html: `
<pre class="out">mkdir my-project
cd my-project
git init                      # 建立儲存庫，會產生隱藏的 .git 資料夾
echo "# 我的專案" &gt; README.md
git status                    # 看目前狀態
git add README.md             # 加入暫存區
git commit -m "新增 README"   # 提交
git log                       # 看提交紀錄</pre>
<pre class="out">commit 3f2a9c1e7b...（提交編號，由內容計算出的雜湊值）
Author: 王小明 &lt;ming@example.com&gt;
Date:   Fri Oct 24 10:30:00 2026 +0800

    新增 README</pre>
<div class="box warn"><b class="t">不要刪除 .git 資料夾</b>所有的版本紀錄都存在 .git 資料夾裡。刪掉它，這個資料夾就不再是 Git 儲存庫，所有歷史都會消失（除非有推到遠端）。</div>
<div class="box tip"><b class="t">互動練習</b>到「互動練習 → Git 指令模擬器」輸入 <code>git commit -m "第一次提交"</code>，觀察提交如何出現在歷史中。</div>` }
  ],
  keypoints: [
    '版本控制記錄每次修改的內容、時間、修改者與原因，可隨時回到任何版本',
    'Git 是安裝在電腦上的版本控制軟體；GitHub 是存放儲存庫的雲端協作平台',
    'Git 是分散式版本控制，每個人的電腦都有完整歷史，離線也能提交',
    '安裝後設定 user.name、user.email，並把預設分支設為 main',
    'git init 建立儲存庫，所有紀錄存在 .git 資料夾',
    '提交編號是由內容計算出的雜湊值',
    'VS Code 內建 Git 圖形介面，但建議先學會指令'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: '基本工作流程',
  summary: '工作目錄、暫存區與儲存庫三個區域、檔案的四種狀態、git status、add、commit、diff、log，撰寫好的提交訊息，以及 .gitignore。',
  sections: [
    { id: 'areas', title: '三個區域', html: `
<p>理解 Git 最重要的觀念，就是檔案會在三個區域之間移動：</p>
<div class="flow">
  <div><b>工作目錄</b><span>Working Directory<br>你正在編輯的檔案</span></div>
  <div><b>暫存區</b><span>Staging Area（Index）<br>準備放進下一次提交的修改</span></div>
  <div><b>儲存庫</b><span>Repository<br>已提交的版本歷史</span></div>
</div>
<pre class="out">git add 檔名        # 工作目錄 → 暫存區
git commit -m "..." # 暫存區 → 儲存庫</pre>
<div class="box analogy"><b class="t">生活比喻</b>暫存區像寄包裹前的「打包區」：你可以先把要寄的東西一件件放進箱子（git add），確認沒問題再封箱寄出（git commit）。這讓你可以只把「一部分」修改放進這次提交，例如修了 bug 也改了排版，可以分成兩次提交。</div>
<h3>檔案的狀態</h3>
<table>
<tr><th>狀態</th><th>意思</th><th>git status 顯示</th></tr>
<tr><td>未追蹤 Untracked</td><td>新檔案，Git 還沒開始管理</td><td>Untracked files</td></tr>
<tr><td>已修改 Modified</td><td>改過但還沒 add</td><td>Changes not staged for commit</td></tr>
<tr><td>已暫存 Staged</td><td>已 add，等待提交</td><td>Changes to be committed</td></tr>
<tr><td>已提交 Committed</td><td>和最新提交相同，沒有變動</td><td>nothing to commit, working tree clean</td></tr>
</table>` },
    { id: 'commands', title: 'status、add、commit', html: `
<pre class="out">git status                 # 最常用的指令：隨時看狀態
git status -s              # 精簡顯示：?? 未追蹤、M 已修改、A 新增已暫存

git add app.py             # 加入單一檔案
git add src/               # 加入整個資料夾
git add .                  # 加入目前資料夾下所有修改（小心不要加到不該加的檔案）
git add -p                 # 逐段選擇要暫存的修改

git commit -m "修正登入時密碼錯誤沒有提示的問題"
git commit                 # 不加 -m 會開啟編輯器寫較長的說明
git commit -am "訊息"      # 已追蹤的檔案直接 add 並提交（新檔案不包含）</pre>
<div class="box warn"><b class="t">git add . 的風險</b>它會把所有修改與新檔案都加進暫存區，包括不小心產生的暫存檔、密碼檔。提交前一定先 <code>git status</code> 確認，並設定好 .gitignore。</div>` },
    { id: 'diff', title: 'diff 與 log', html: `
<table>
<tr><th>指令</th><th>比較什麼</th></tr>
<tr><td><code>git diff</code></td><td>工作目錄 vs 暫存區（還沒 add 的修改）</td></tr>
<tr><td><code>git diff --staged</code></td><td>暫存區 vs 最新提交（已 add、準備提交的修改）</td></tr>
<tr><td><code>git diff HEAD</code></td><td>工作目錄 vs 最新提交（全部修改）</td></tr>
<tr><td><code>git diff 提交A 提交B</code></td><td>兩個提交之間的差異</td></tr>
</table>
<pre class="out">diff --git a/app.py b/app.py
@@ -3,7 +3,7 @@
 def login(user, pw):
-    if pw == user.password:
+    if check_password(pw, user.password_hash):
         return True</pre>
<p>以 <code>-</code> 開頭的是刪除的行，<code>+</code> 開頭的是新增的行。</p>
<pre class="out">git log                          # 完整紀錄
git log --oneline                # 一行一個提交
git log --oneline --graph --all  # 圖形化顯示所有分支
git log -p app.py                # 某個檔案的修改歷史與內容
git log --author="王小明" --since="2 weeks ago"
git show 3f2a9c1                 # 某個提交的詳細內容</pre>` },
    { id: 'message', title: '好的提交訊息', html: `
<table>
<tr><th>不好的訊息</th><th>好的訊息</th></tr>
<tr><td>update</td><td>修正訂單金額未含運費的計算錯誤</td></tr>
<tr><td>改東西</td><td>新增會員註冊頁的手機格式檢查</td></tr>
<tr><td>修 bug、調整、test、asdf</td><td>移除已停用的 LINE Notify 推播程式</td></tr>
</table>
<ul>
  <li><b>一個提交只做一件事</b>：修 bug 與新增功能分開提交，日後要還原或查原因都容易。</li>
  <li><b>第一行是摘要</b>：50 字以內說明做了什麼；需要時空一行再寫詳細原因。</li>
  <li><b>說明為什麼</b>：程式碼本身看得出「改了什麼」，訊息要補充「為什麼要改」。</li>
  <li>團隊常用的 <b>Conventional Commits</b> 格式：<code>feat: 新增匯出 Excel 功能</code>、<code>fix: 修正登入逾時</code>（第 8 章）。</li>
</ul>` },
    { id: 'ignore', title: '.gitignore', html: `
<p>有些檔案不應該被版本控制：密碼與金鑰、虛擬環境、編譯產生的檔案、作業系統的暫存檔、大型資料檔。把它們寫進專案根目錄的 <code>.gitignore</code>：</p>
<pre class="out"># 機密
.env
*.pem

# Python
__pycache__/
.venv/
*.pyc

# Node.js
node_modules/

# 系統與編輯器
.DS_Store
Thumbs.db
.vscode/

# 資料與輸出
data/
*.log
!sample.log          # 驚嘆號：例外，這個檔案仍要追蹤</pre>
<div class="box warn"><b class="t">已經被追蹤的檔案，加入 .gitignore 也沒用</b>.gitignore 只對「還沒被追蹤」的檔案有效。已經提交過的檔案要先用 <code>git rm --cached 檔名</code> 停止追蹤（保留電腦上的檔案），再提交。如果是密碼，即使移除，歷史中仍然存在，必須立刻更換密碼（第 10 章）。</div>
<div class="box tip"><b class="t">範本</b>GitHub 的 <a href="https://github.com/github/gitignore" target="_blank" rel="noopener">github/gitignore</a> 收集了各種語言與工具的 .gitignore 範本，建立 GitHub 儲存庫時也可以直接選擇。</div>` }
  ],
  keypoints: [
    '三個區域：工作目錄 →（git add）→ 暫存區 →（git commit）→ 儲存庫',
    '暫存區讓你決定哪些修改放進這次提交',
    '檔案狀態：未追蹤、已修改、已暫存、已提交；git status 隨時查看',
    'git diff 看未暫存的修改；git diff --staged 看已暫存的修改',
    'git log --oneline --graph --all 圖形化查看歷史',
    '一個提交只做一件事，訊息說明為什麼要改',
    '.gitignore 只對未追蹤的檔案有效；已追蹤的要先 git rm --cached'
  ]
},
{
  id: 'c03', subject: 1, minutes: 45,
  title: '檢視歷史與還原',
  summary: 'HEAD 與提交的參照方式、git restore 還原檔案、git commit --amend 修改最後一次提交、git reset 的三種模式、git revert 安全撤銷、git reflog 救援，以及如何選擇。',
  sections: [
    { id: 'refs', title: 'HEAD 與提交參照', html: `
<p><b>HEAD</b> 指向你目前所在的位置，通常是某個分支的最新提交。指定提交的方式：</p>
<table>
<tr><th>寫法</th><th>意思</th></tr>
<tr><td><code>3f2a9c1</code></td><td>提交編號（取前幾碼，不重複即可）</td></tr>
<tr><td><code>HEAD</code></td><td>目前的提交</td></tr>
<tr><td><code>HEAD~1</code>（或 <code>HEAD^</code>）</td><td>上一個提交</td></tr>
<tr><td><code>HEAD~3</code></td><td>往前第三個提交</td></tr>
<tr><td><code>main</code>、<code>v1.0</code></td><td>分支或標籤名稱</td></tr>
</table>` },
    { id: 'restore', title: '還原檔案：restore', html: `
<table>
<tr><th>情境</th><th>指令</th><th>結果</th></tr>
<tr><td>改了檔案還沒 add，想放棄修改</td><td><code>git restore app.py</code></td><td>回到暫存區（或最新提交）的內容，<b>修改會消失</b></td></tr>
<tr><td>已經 add，想取消暫存</td><td><code>git restore --staged app.py</code></td><td>移出暫存區，檔案內容保留</td></tr>
<tr><td>拿回某個舊版本的檔案</td><td><code>git restore --source=HEAD~2 app.py</code></td><td>工作目錄的檔案變成兩個提交前的內容</td></tr>
</table>
<div class="box tip"><b class="t">舊寫法</b>網路上的教學常看到 <code>git checkout -- 檔名</code> 與 <code>git reset HEAD 檔名</code>，分別等同 restore 與 restore --staged。新寫法的意思比較清楚，建議使用。</div>` },
    { id: 'amend', title: '修改最後一次提交：amend', html: `
<pre class="out">git commit -m "新增匯出功能"
# 發現漏了一個檔案、或訊息打錯
git add export_utils.py
git commit --amend -m "新增匯出 Excel 功能"</pre>
<p><code>--amend</code> 會用新的提交<b>取代</b>最後一次提交（提交編號會改變）。</p>
<div class="box warn"><b class="t">只在還沒 push 之前使用</b>如果已經推到遠端、別人可能已經拿到這個提交，改寫它會造成雙方歷史不一致。已 push 的提交要用 revert。</div>` },
    { id: 'reset', title: 'reset：移動分支指標', html: `
<p><code>git reset</code> 把<b>目前分支的指標</b>移到指定的提交，三種模式差在「之後的修改放到哪裡」：</p>
<table>
<tr><th>模式</th><th>分支指標</th><th>暫存區</th><th>工作目錄</th><th>適用</th></tr>
<tr><td><code>--soft</code></td><td>移動</td><td>保留（修改都在暫存區）</td><td>保留</td><td>把最近幾個提交合併成一個重新提交</td></tr>
<tr><td><code>--mixed</code>（預設）</td><td>移動</td><td>清空</td><td>保留（修改變成未暫存）</td><td>重新挑選要提交的內容</td></tr>
<tr><td><code>--hard</code></td><td>移動</td><td>清空</td><td><b>清空，修改全部丟棄</b></td><td>完全放棄之後的提交與修改</td></tr>
</table>
<pre class="out">git reset --soft HEAD~3     # 取消最近 3 個提交，但修改保留在暫存區，可以重新提交成一個
git reset HEAD~1            # 取消最近 1 個提交，修改保留在工作目錄
git reset --hard HEAD~1     # 取消最近 1 個提交，修改全部丟棄（危險）</pre>
<div class="box warn"><b class="t">--hard 會丟掉未提交的修改</b>已提交過的內容還能用 reflog 找回，但<b>從來沒提交過的修改</b>被 --hard 清掉就真的找不回來了。執行前先 <code>git status</code> 確認。</div>
<div class="box tip"><b class="t">互動練習</b>在「互動練習 → Git 指令模擬器」選擇「reset 與 revert」情境，比較兩者對歷史的影響。</div>` },
    { id: 'revert', title: 'revert 與 reflog', html: `
<h3>revert：安全地撤銷</h3>
<p><code>git revert 提交</code> 會產生一個<b>新的提交</b>，內容剛好抵銷指定提交的修改。歷史不會被改寫，所以適合撤銷<b>已經 push、別人也拿到</b>的提交。</p>
<pre class="out">git log --oneline
a3c9e21 新增優惠券功能（上線後發現有 bug）
7b1d004 修正首頁排版

git revert a3c9e21
# 產生新提交：Revert "新增優惠券功能"</pre>
<h3>reflog：Git 的後悔藥</h3>
<p>Git 會記錄 HEAD 每一次的移動（提交、切換分支、reset、合併）。即使用 reset --hard 讓提交「消失」，只要曾經提交過，通常都能從 reflog 找回來：</p>
<pre class="out">git reflog
a3c9e21 HEAD@{0}: reset: moving to HEAD~2
f81b2c7 HEAD@{1}: commit: 完成報表匯出
9d0e3a5 HEAD@{2}: commit: 新增報表頁面

git reset --hard f81b2c7          # 回到 reset 之前的狀態
git switch -c rescue f81b2c7      # 或建立新分支保留它</pre>
<h3>怎麼選</h3>
<table>
<tr><th>情境</th><th>使用</th></tr>
<tr><td>檔案改壞了，還沒提交</td><td><code>git restore</code></td></tr>
<tr><td>最後一次提交漏了檔案或訊息錯（還沒 push）</td><td><code>git commit --amend</code></td></tr>
<tr><td>本機最近幾個提交不要了（還沒 push）</td><td><code>git reset</code></td></tr>
<tr><td>已經 push 的提交要撤銷</td><td><code>git revert</code></td></tr>
<tr><td>reset 錯了、分支誤刪了</td><td><code>git reflog</code> 找回</td></tr>
</table>` }
  ],
  keypoints: [
    'HEAD 是目前位置；HEAD~1 是上一個提交',
    'git restore 放棄工作目錄的修改；--staged 取消暫存',
    'git commit --amend 取代最後一次提交，只在 push 前使用',
    'reset 移動分支指標：--soft 保留暫存、--mixed 保留檔案、--hard 全部丟棄',
    '從未提交的修改被 reset --hard 清掉就找不回來',
    'git revert 新增反向提交，不改寫歷史，適合已 push 的提交',
    'git reflog 記錄 HEAD 的移動，可找回被 reset 或刪除分支的提交'
  ]
},
{
  id: 'c04', subject: 1, minutes: 45,
  title: '分支與合併',
  summary: '分支的本質是指標、建立與切換分支、HEAD 的意義、快轉合併與三方合併、刪除分支，以及用分支開發新功能的流程。',
  sections: [
    { id: 'what', title: '分支是什麼', html: `
<p><b>分支（Branch）</b>讓你從某個時間點分出一條獨立的開發線：在分支上做實驗、開發新功能，完全不影響主線；完成後再合併回來，失敗了直接刪掉。</p>
<p>在 Git 中，分支其實只是<strong>一個指向某個提交的指標（標籤）</strong>，建立分支幾乎不花時間與空間。每次在分支上提交，這個指標就會自動往前移到新提交。</p>
<pre class="out">         main
          ↓
A ── B ── C
          ↑
       feature      ← 剛建立時，兩個分支指向同一個提交

A ── B ── C ── D ── E
          ↑         ↑
         main    feature   ← 在 feature 提交兩次後</pre>
<div class="box tip"><b class="t">互動練習</b>到「互動練習 → Git 指令模擬器」依序輸入 <code>git switch -c feature</code>、<code>git commit -m "新功能"</code>，觀察 feature 指標往前移動、main 停在原地。</div>` },
    { id: 'commands', title: '建立與切換分支', html: `
<pre class="out">git branch                    # 列出本機分支，* 是目前所在分支
git branch -a                 # 包含遠端分支
git branch feature/login      # 建立分支（不切換）
git switch feature/login      # 切換分支
git switch -c feature/login   # 建立並切換（最常用）
git switch -                  # 切回上一個分支
git branch -m 舊名 新名        # 重新命名

# 舊寫法
git checkout feature/login
git checkout -b feature/login</pre>
<ul>
  <li>切換分支時，工作目錄的檔案會變成該分支的內容。</li>
  <li>有未提交的修改時切換，若會被覆蓋，Git 會拒絕切換，先提交或用 <code>git stash</code> 暫存（第 9 章）。</li>
  <li>分支命名慣例：<code>feature/功能</code>、<code>fix/問題</code>、<code>hotfix/緊急修正</code>，使用英文小寫與連字號。</li>
</ul>` },
    { id: 'merge', title: '合併：快轉與三方合併', html: `
<p>在 main 上執行 <code>git merge feature</code>，把 feature 的修改合併進 main。依照兩條線的狀況，有兩種結果：</p>
<h3>快轉合併 Fast-forward</h3>
<p>feature 分出去之後，<b>main 沒有新的提交</b>，Git 只要把 main 指標直接往前移到 feature 的位置，不會產生新提交。</p>
<pre class="out">合併前：A ── B ── C (main)
                   └── D ── E (feature)
合併後：A ── B ── C ── D ── E (main, feature)</pre>
<h3>三方合併 3-way Merge</h3>
<p>feature 分出去之後，<b>main 也有新的提交</b>，兩條線已經分岔。Git 會比較共同祖先與兩邊的最新提交，產生一個<b>合併提交（Merge Commit）</b>，它有兩個父提交。</p>
<pre class="out">合併前：A ── B ── C ── F (main)
                   └── D ── E (feature)
合併後：A ── B ── C ── F ── M (main)
                   └── D ── E ┘    M 是合併提交</pre>
<pre class="out">git switch main
git merge feature/login            # 依情況快轉或產生合併提交
git merge --no-ff feature/login    # 強制產生合併提交，保留「這是一個功能分支」的紀錄
git branch -d feature/login        # 合併完成後刪除分支</pre>
<div class="box tip"><b class="t">互動練習</b>在 Git 指令模擬器中選擇「快轉合併」與「三方合併」兩個情境，比較合併後的提交數量與父提交。</div>` },
    { id: 'delete', title: '刪除分支與功能開發流程', html: `
<table>
<tr><th>指令</th><th>說明</th></tr>
<tr><td><code>git branch -d 分支</code></td><td>刪除已合併的分支；尚未合併時 Git 會拒絕，避免遺失工作</td></tr>
<tr><td><code>git branch -D 分支</code></td><td>強制刪除，即使尚未合併（不小心刪了可用 reflog 找回）</td></tr>
<tr><td><code>git push origin --delete 分支</code></td><td>刪除遠端分支（第 6 章）</td></tr>
</table>
<div class="flow">
  <div><b>1. 更新 main</b><span>git switch main<br>git pull</span></div>
  <div><b>2. 開分支</b><span>git switch -c feature/xxx</span></div>
  <div><b>3. 開發與提交</b><span>小步提交多次</span></div>
  <div><b>4. 合併</b><span>個人專案直接 merge<br>團隊用 Pull Request</span></div>
  <div><b>5. 刪除分支</b><span>git branch -d feature/xxx</span></div>
</div>
<div class="box memo"><b class="t">動手做</b>在自己的專案建立 <code>feature/about</code> 分支新增一個檔案並提交，切回 main 確認看不到那個檔案，再合併回來。接著做一次「main 也有新提交」的情況，觀察產生的合併提交。</div>` }
  ],
  keypoints: [
    '分支是指向提交的指標，建立分支幾乎不花成本',
    '在分支上提交時，該分支的指標會往前移',
    'git switch -c 建立並切換分支；舊寫法 git checkout -b',
    '快轉合併：目標分支沒有新提交，指標直接前移，不產生新提交',
    '三方合併：兩邊都有新提交，產生有兩個父提交的合併提交',
    'git branch -d 只能刪除已合併的分支；-D 強制刪除',
    '功能開發流程：更新 main → 開分支 → 提交 → 合併 → 刪除分支'
  ]
},
{
  id: 'c05', subject: 1, minutes: 40,
  title: '處理合併衝突',
  summary: '衝突發生的原因、看懂衝突標記、手動解決與用 VS Code 解決、放棄合併、二進位檔案衝突，以及減少衝突的團隊習慣。',
  sections: [
    { id: 'why', title: '衝突是怎麼發生的', html: `
<p>兩個分支<b>修改了同一個檔案的同一個位置</b>，Git 無法判斷要保留哪一邊，就會發生<b>合併衝突（Merge Conflict）</b>。修改不同檔案、或同一檔案的不同段落，Git 都能自動合併。</p>
<pre class="out">git merge feature/price
Auto-merging config.py
CONFLICT (content): Merge conflict in config.py
Automatic merge failed; fix conflicts and then commit the result.</pre>
<div class="box analogy"><b class="t">生活比喻</b>兩個同事同時修改合約的第三條，一個改成「30 天付款」，另一個改成「45 天付款」。系統不能替你決定，只能把兩個版本都標出來，請你決定最後的內容。</div>
<div class="box tip"><b class="t">衝突很正常</b>衝突不是錯誤，也不會損壞任何東西，只是需要人來做決定。冷靜看清楚兩邊的修改再處理即可。</div>` },
    { id: 'markers', title: '看懂衝突標記', html: `
<pre class="out">SHIPPING_FEE = 60
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
FREE_SHIPPING_THRESHOLD = 1000
=======
FREE_SHIPPING_THRESHOLD = 800
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/price
TAX_RATE = 0.05</pre>
<table>
<tr><th>標記</th><th>意思</th></tr>
<tr><td><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> 到 <code>=======</code></td><td>目前所在分支（你合併進來的地方，例如 main）的內容</td></tr>
<tr><td><code>=======</code> 到 <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/price</code></td><td>要合併進來的分支的內容</td></tr>
</table>
<p>你可以保留其中一邊、兩邊都保留，或寫成全新的內容，最後<b>刪除所有標記</b>。</p>` },
    { id: 'resolve', title: '解決衝突的步驟', html: `
<div class="flow">
  <div><b>1. 找出衝突檔案</b><span>git status<br>顯示 both modified</span></div>
  <div><b>2. 編輯檔案</b><span>決定最終內容<br>刪除所有標記</span></div>
  <div><b>3. 標記已解決</b><span>git add 檔名</span></div>
  <div><b>4. 完成合併</b><span>git commit</span></div>
</div>
<pre class="out">git status
# both modified:   config.py

（編輯 config.py，和同事確認後決定門檻改成 800，刪除標記）

git add config.py
git commit                       # 會自動帶入合併提交訊息
git log --oneline --graph</pre>
<table>
<tr><th>情況</th><th>處理</th></tr>
<tr><td>處理到一半想放棄，回到合併前</td><td><code>git merge --abort</code></td></tr>
<tr><td>整個檔案要直接用自己這邊的版本</td><td><code>git checkout --ours 檔名</code>，再 git add</td></tr>
<tr><td>整個檔案要直接用對方的版本</td><td><code>git checkout --theirs 檔名</code>，再 git add</td></tr>
</table>
<div class="box tip"><b class="t">用 VS Code 解決</b>VS Code 會在衝突處顯示「接受目前的變更」「接受傳入的變更」「接受兩者」按鈕，也有三方合併編輯器，可以同時看到兩邊與結果。處理完記得存檔並 git add。</div>
<div class="box warn"><b class="t">解決後要測試</b>Git 只檢查文字，不懂程式邏輯。兩邊各自都正確的修改，合併後也可能互相衝突（例如函式改了名字，另一邊還在呼叫舊名字）。解決衝突後務必執行程式或測試。</div>` },
    { id: 'prevent', title: '減少衝突的習慣', html: `
<ul>
  <li><b>經常同步</b>：每天開始工作前先 <code>git pull</code> 更新 main，並把 main 合併到自己的分支。</li>
  <li><b>分支不要活太久</b>：功能拆小、幾天內就合併，分岔越久衝突越多。</li>
  <li><b>小步提交、小型 Pull Request</b>：每次修改範圍小，衝突也小。</li>
  <li><b>統一格式</b>：團隊使用相同的程式碼格式化工具（例如 Python 的 black、前端的 Prettier），避免只是空白與換行不同造成的衝突。</li>
  <li><b>溝通</b>：大幅重構或改到共用檔案前，先跟團隊說一聲。</li>
</ul>
<div class="box warn"><b class="t">二進位檔案的衝突</b>Excel、Word、圖片等二進位檔案無法逐行合併，發生衝突只能選擇其中一個版本。這類檔案盡量避免多人同時修改，或改用 Git LFS 搭配檔案鎖定（第 9 章）。</div>
<div class="box memo"><b class="t">動手做</b>建立兩個分支，各自修改同一個檔案的同一行並提交，合併時製造衝突，練習用指令與 VS Code 各解決一次，以及用 git merge --abort 放棄合併。</div>` }
  ],
  keypoints: [
    '兩個分支修改同一檔案的同一位置時發生衝突；不同位置可自動合併',
    '<<<<<<< HEAD 到 ======= 是目前分支的內容，到 >>>>>>> 是合併進來的分支',
    '解決步驟：編輯檔案並刪除標記 → git add → git commit',
    'git merge --abort 放棄合併回到合併前',
    '--ours／--theirs 可整個檔案採用某一邊的版本',
    '解決衝突後要執行程式或測試，Git 不懂程式邏輯',
    '減少衝突：經常同步、分支短命、小步提交、統一格式、事先溝通'
  ]
}
);
