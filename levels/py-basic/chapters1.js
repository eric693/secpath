/* Python 入門 基礎篇：語法基礎與流程控制
   講義中 <pre class="py"> 會變成可執行的程式碼區塊；程式碼內的 < > & 需寫成 &lt; &gt; &amp;，換行字元寫成 \\n */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 35,
  title: '認識 Python 與第一支程式',
  summary: 'Python 能做什麼、為什麼適合當第一個程式語言、在網頁與自己的電腦上執行 Python、print() 與註解，以及看懂第一個錯誤訊息。',
  sections: [
    { id: 'why', title: 'Python 能做什麼', html: `
<p><b>Python</b> 是一種語法接近英文、容易閱讀的程式語言，也是目前最受歡迎的程式語言之一。它的用途非常廣：</p>
<table>
<tr><th>領域</th><th>例子</th><th>本系列課程</th></tr>
<tr><td><b>辦公自動化</b></td><td>批次整理檔案、合併 Excel、自動寄報表</td><td>Python 實戰第 1～3 章</td></tr>
<tr><td><b>網路資料</b></td><td>抓取開放資料、網頁爬蟲、聊天機器人</td><td>Python 實戰第 4～6 章</td></tr>
<tr><td><b>資料分析</b></td><td>整理銷售資料、統計、畫圖表</td><td>Python 實戰第 7～9 章</td></tr>
<tr><td><b>人工智慧</b></td><td>機器學習、呼叫生成式 AI API</td><td>Python 實戰第 10 章、AI 課程</td></tr>
<tr><td><b>網站後端與雲端</b></td><td>Django、Flask、AWS Lambda</td><td>可接續 AWS 課程</td></tr>
</table>
<div class="box tip"><b class="t">為什麼先學 Python</b>同樣的功能，Python 通常寫得比較短、比較好讀，錯誤訊息也清楚。台灣 104 上的資料分析、自動化、AI 相關職缺，Python 幾乎都是基本要求；非工程職（行政、財會、行銷）會寫一點 Python，也能大幅減少重複性工作。</div>` },
    { id: 'run', title: '在網頁上執行第一支程式', html: `
<p>本課程每個灰框程式碼都可以<strong>直接按「執行」</strong>，也可以修改後再執行。第一次執行會下載 Python 環境（約 10 MB），需要等 10～20 秒，之後就很快。</p>
<pre class="py">print('哈囉，Python！')
print('我正在學寫程式')</pre>
<p><code>print()</code> 是 Python 內建的<b>函式（Function）</b>，作用是把括號裡的內容顯示出來。文字要用<b>引號</b>包起來，單引號 <code>'</code> 或雙引號 <code>"</code> 都可以，但前後要一致。</p>
<pre class="py">print('今年是', 2026, '年')     # 用逗號分隔多個值，中間自動加空白
print(3 + 5)                    # 數字可以直接計算
print('3 + 5')                  # 加了引號就是文字，原封不動印出</pre>
<div class="box memo"><b class="t">動手做</b>把第一個範例改成印出你的名字、興趣和想學 Python 的原因，共三行。</div>
<h3>註解</h3>
<p><code>#</code> 後面的文字是<b>註解（Comment）</b>，Python 執行時會忽略，用來寫給人看的說明。好的註解說明「為什麼這樣寫」，而不是重複程式在做什麼。</p>` },
    { id: 'install', title: '在自己的電腦安裝 Python', html: `
<p>網頁執行器適合練習，但真正工作時要在自己的電腦寫程式。建議安裝以下兩個工具：</p>
<ol>
  <li><b>Python</b>：到 <a href="https://www.python.org/downloads/" target="_blank" rel="noopener">python.org</a> 下載最新版。Windows 安裝時<strong>一定要勾選「Add python.exe to PATH」</strong>，否則命令列會找不到 Python。</li>
  <li><b>VS Code</b>：微軟免費的程式編輯器，安裝後在擴充功能搜尋並安裝「Python」。</li>
</ol>
<div class="flow">
  <div><b>1. 建立資料夾</b><span>例如 D:\\python-class</span></div>
  <div><b>2. 用 VS Code 開啟</b><span>檔案 → 開啟資料夾</span></div>
  <div><b>3. 新增 hello.py</b><span>副檔名一定是 .py</span></div>
  <div><b>4. 執行</b><span>右上角 ▶ 按鈕<br>或終端機輸入 python hello.py</span></div>
</div>
<pre class="out"># 在終端機（命令提示字元）確認安裝成功
python --version      # Windows
python3 --version     # macOS／Linux
# 會顯示類似 Python 3.12.x</pre>
<div class="box warn"><b class="t">常見問題</b>Windows 輸入 python 卻打開 Microsoft Store：代表安裝時沒勾選 PATH，請重新執行安裝程式選「Modify」補勾，或到「設定 → 應用程式 → 應用程式執行別名」關閉 python 的別名。</div>
<h3>互動模式</h3>
<p>在終端機只輸入 <code>python</code> 會進入互動模式（看到 <code>&gt;&gt;&gt;</code> 提示），輸入一行就立即執行，適合試小東西。輸入 <code>exit()</code> 離開。</p>` },
    { id: 'error', title: '看懂第一個錯誤訊息', html: `
<p>寫程式一定會出錯，<strong>會看錯誤訊息是最重要的能力之一</strong>。執行下面的程式，看看發生什麼事：</p>
<pre class="py">print('第一行沒問題')
prnt('第二行拼錯了')</pre>
<p>錯誤訊息要<b>從最後一行往上看</b>：</p>
<ul>
  <li><code>NameError</code>：錯誤種類，代表用了不存在的名稱。</li>
  <li><code>name 'prnt' is not defined</code>：原因，prnt 沒有被定義（拼錯了）。</li>
  <li><code>第 2 行</code>：出錯的位置。</li>
</ul>
<p>注意第一行已經印出來了：Python 是<b>由上往下一行一行執行</b>，遇到錯誤就停止。</p>
<div class="box warn"><b class="t">新手最常見的三種錯</b>①全形符號：<code>print（'hi'）</code> 用了中文括號；②引號沒成對：<code>print('hi)</code>；③大小寫：<code>Print('hi')</code>，Python 區分大小寫。</div>
<div class="box memo"><b class="t">動手做</b>在上面的執行器中，故意把引號刪掉一個、把括號改成全形，看看錯誤訊息分別是什麼。也可以到「互動練習 → 錯誤訊息查詢」查看說明。</div>` }
  ],
  keypoints: [
    'Python 語法接近英文，廣泛用於自動化、資料分析、AI 與網站後端',
    'print() 顯示內容；文字要用成對的單引號或雙引號包起來',
    '# 後面是註解，執行時會被忽略',
    'Windows 安裝 Python 一定要勾選 Add python.exe to PATH',
    '程式檔副檔名是 .py，可用 python 檔名.py 執行',
    'Python 由上往下逐行執行，遇到錯誤就停止',
    '錯誤訊息從最後一行看：錯誤種類、原因，再看第幾行'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: '變數與資料型別',
  summary: '變數的命名與指定、四種基本型別（int、float、str、bool）、type() 與型別轉換、input() 取得使用者輸入，完成 BMI 計算機。',
  sections: [
    { id: 'var', title: '變數：幫資料取名字', html: `
<p><b>變數（Variable）</b>就像貼了名字的盒子，用 <code>=</code> 把資料放進去，之後用名字取出來。</p>
<pre class="py">name = '小明'
age = 25
height = 1.72
print(name, '今年', age, '歲，身高', height, '公尺')

age = age + 1          # 先算右邊（25 + 1），再把結果放回 age
print('明年', age, '歲')</pre>
<div class="box warn"><b class="t">= 不是數學的等於</b>在程式中 <code>=</code> 是<b>指定（Assignment）</b>：把右邊的值放進左邊的變數。所以 <code>age = age + 1</code> 是合法的，意思是「把 age 加 1」。比較兩個值是否相等要用 <code>==</code>（第 4 章）。</div>
<h3>命名規則</h3>
<table>
<tr><th>規則</th><th>合法</th><th>不合法</th></tr>
<tr><td>只能用英文字母、數字、底線（也可用中文，但不建議）</td><td><code>user_name</code></td><td><code>user-name</code></td></tr>
<tr><td>不能以數字開頭</td><td><code>score2</code></td><td><code>2score</code></td></tr>
<tr><td>區分大小寫</td><td><code>Age</code> 與 <code>age</code> 是不同變數</td><td>—</td></tr>
<tr><td>不能用關鍵字</td><td><code>class_name</code></td><td><code>class</code>、<code>if</code>、<code>for</code></td></tr>
</table>
<div class="box tip"><b class="t">命名習慣</b>Python 慣例用<b>小寫加底線</b>（snake_case），例如 <code>total_price</code>。名字要看得出意義：<code>price</code> 比 <code>p</code> 好，<code>student_count</code> 比 <code>n</code> 好。</div>
<p>Python 也可以一次指定多個變數：</p>
<pre class="py">a, b = 3, 5
a, b = b, a        # 交換兩個變數的值
print(a, b)</pre>` },
    { id: 'types', title: '四種基本資料型別', html: `
<table>
<tr><th>型別</th><th>名稱</th><th>例子</th><th>說明</th></tr>
<tr><td><code>int</code></td><td>整數</td><td><code>42</code>、<code>-7</code>、<code>1_000_000</code></td><td>沒有大小上限，底線只是方便閱讀</td></tr>
<tr><td><code>float</code></td><td>浮點數（小數）</td><td><code>3.14</code>、<code>2.0</code>、<code>1e6</code></td><td>有小數點就是 float</td></tr>
<tr><td><code>str</code></td><td>字串（文字）</td><td><code>'你好'</code>、<code>"123"</code></td><td>引號內的都是字串，即使內容是數字</td></tr>
<tr><td><code>bool</code></td><td>布林值</td><td><code>True</code>、<code>False</code></td><td>只有兩個值，第一個字母大寫</td></tr>
</table>
<p>用 <code>type()</code> 可以查看資料的型別：</p>
<pre class="py">print(type(42))
print(type(3.0))
print(type('42'))
print(type(True))
print(type(None))      # None 代表「沒有值」</pre>
<div class="box warn"><b class="t">浮點數的小誤差</b>電腦以二進位儲存小數，所以 <code>0.1 + 0.2</code> 會得到 <code>0.30000000000000004</code>。顯示時可用 <code>round(x, 2)</code> 四捨五入；處理金額的正式系統會用 <code>decimal</code> 模組。</div>
<pre class="py">print(0.1 + 0.2)
print(round(0.1 + 0.2, 2))</pre>` },
    { id: 'convert', title: '型別轉換與 input()', html: `
<table>
<tr><th>函式</th><th>作用</th><th>例子</th></tr>
<tr><td><code>int()</code></td><td>轉成整數（小數直接捨去）</td><td><code>int('25')</code> → 25；<code>int(3.9)</code> → 3</td></tr>
<tr><td><code>float()</code></td><td>轉成浮點數</td><td><code>float('1.72')</code> → 1.72</td></tr>
<tr><td><code>str()</code></td><td>轉成字串</td><td><code>str(25)</code> → '25'</td></tr>
<tr><td><code>bool()</code></td><td>轉成布林值</td><td>0、空字串、None 是 False，其餘是 True</td></tr>
</table>
<p><code>input()</code> 讓使用者輸入資料。在網頁執行器中，請在下方「輸入」欄位<strong>每行填一筆</strong>，依序對應每次 <code>input()</code>。</p>
<pre class="py" data-input="小美&#10;28">name = input('請輸入名字：')
age = input('請輸入年齡：')
print(type(age))                 # input() 拿到的一定是字串！
print(name, '明年', int(age) + 1, '歲')</pre>
<div class="box exam"><b class="t">重要觀念</b><code>input()</code> 回傳的永遠是<b>字串</b>。直接寫 <code>age + 1</code> 會出現 <code>TypeError</code>，因為字串不能和數字相加，必須先用 <code>int()</code> 或 <code>float()</code> 轉換。</div>` },
    { id: 'bmi', title: '動手做：BMI 計算機', html: `
<p>BMI = 體重（公斤）÷ 身高（公尺）²。把前面學到的組合起來：</p>
<pre class="py" data-input="70&#10;172">weight = float(input('體重（公斤）：'))
height_cm = float(input('身高（公分）：'))
height_m = height_cm / 100
bmi = weight / height_m ** 2      # ** 是次方
print('你的 BMI 是', round(bmi, 1))</pre>
<div class="box memo"><b class="t">動手做</b>①改用自己的身高體重試試看；②加一行計算「標準體重 = 22 × 身高（公尺）²」並印出；③如果輸入「七十」而不是 70，會出現什麼錯誤？（第 9 章會教你怎麼處理）</div>` }
  ],
  keypoints: [
    '= 是指定，把右邊的值放進左邊的變數；比較相等用 ==',
    '變數名稱用小寫加底線，不能以數字開頭，區分大小寫',
    '四種基本型別：int 整數、float 小數、str 字串、bool 布林值',
    'type() 查看型別；None 代表沒有值',
    'int()、float()、str() 轉換型別，int() 會直接捨去小數',
    'input() 回傳的一定是字串，計算前要先轉換',
    '浮點數有微小誤差，顯示時可用 round() 四捨五入'
  ]
},
{
  id: 'c03', subject: 1, minutes: 50,
  title: '運算與字串處理',
  summary: '算術運算子與優先順序、指定運算子、f-string 格式化、字串索引與切片、常用字串方法，完成身分證字號格式檢查。',
  sections: [
    { id: 'ops', title: '算術運算子', html: `
<table>
<tr><th>運算子</th><th>意義</th><th>例子</th><th>結果</th></tr>
<tr><td><code>+</code> <code>-</code> <code>*</code></td><td>加、減、乘</td><td><code>7 * 3</code></td><td>21</td></tr>
<tr><td><code>/</code></td><td>除法，<b>結果一定是 float</b></td><td><code>8 / 2</code></td><td>4.0</td></tr>
<tr><td><code>//</code></td><td>整數除法（取商，往下取整）</td><td><code>17 // 5</code></td><td>3</td></tr>
<tr><td><code>%</code></td><td>取餘數</td><td><code>17 % 5</code></td><td>2</td></tr>
<tr><td><code>**</code></td><td>次方</td><td><code>2 ** 10</code></td><td>1024</td></tr>
</table>
<pre class="py">total_minutes = 135
hours = total_minutes // 60
minutes = total_minutes % 60
print(total_minutes, '分鐘 =', hours, '小時', minutes, '分鐘')

print(10 % 2 == 0)     # 餘數是 0 代表整除，常用來判斷偶數
print(-7 // 2)         # 往下取整，所以是 -4 而不是 -3</pre>
<h3>運算順序</h3>
<p>和數學一樣先乘除後加減：<code>**</code> → <code>* / // %</code> → <code>+ -</code>。不確定時就<b>加括號</b>，程式也更好讀。</p>
<pre class="py">print(2 + 3 * 4)       # 14
print((2 + 3) * 4)     # 20
print(2 ** 3 ** 2)     # 次方由右往左算：2 ** 9 = 512</pre>
<h3>指定運算子</h3>
<p><code>x += 3</code> 等於 <code>x = x + 3</code>，同樣有 <code>-=</code>、<code>*=</code>、<code>/=</code>、<code>//=</code>、<code>%=</code>。</p>
<pre class="py">balance = 1000
balance -= 250      # 消費
balance *= 1.01     # 利息 1%
print(balance)</pre>` },
    { id: 'fstring', title: 'f-string：格式化輸出', html: `
<p>在字串前加 <code>f</code>，就能用大括號 <code>{}</code> 把變數或運算結果直接放進文字中，這是最推薦的寫法。</p>
<pre class="py">name = '小明'
price = 1234.5
qty = 3
print(f'{name} 買了 {qty} 件，共 {price * qty} 元')
print(f'總價：{price * qty:,.2f} 元')     # 千分位 + 小數兩位
print(f'折扣：{0.15:.0%}')                # 百分比
print(f'|{name:&lt;6}|{qty:&gt;5}|')         # 靠左、靠右對齊</pre>
<table>
<tr><th>格式</th><th>意義</th><th>例子 → 結果</th></tr>
<tr><td><code>:.2f</code></td><td>小數點後兩位</td><td><code>f'{3.14159:.2f}'</code> → 3.14</td></tr>
<tr><td><code>:,</code></td><td>千分位</td><td><code>f'{1234567:,}'</code> → 1,234,567</td></tr>
<tr><td><code>:.1%</code></td><td>百分比</td><td><code>f'{0.256:.1%}'</code> → 25.6%</td></tr>
<tr><td><code>:&gt;8</code> <code>:&lt;8</code> <code>:^8</code></td><td>靠右／靠左／置中，寬度 8</td><td>對齊表格用</td></tr>
<tr><td><code>:05d</code></td><td>補零到 5 位</td><td><code>f'{42:05d}'</code> → 00042</td></tr>
<tr><td><code>=</code></td><td>同時印出名稱與值（除錯用）</td><td><code>f'{qty=}'</code> → qty=3</td></tr>
</table>
<div class="box tip"><b class="t">字串串接的其他寫法</b>也可以用 <code>+</code> 串接字串，但數字要先轉型：<code>'共' + str(3) + '件'</code>。f-string 不用轉型、更好讀，建議優先使用。</div>` },
    { id: 'index', title: '字串索引與切片', html: `
<p>字串是一串字元，每個字元都有編號，稱為<b>索引（Index）</b>，<strong>從 0 開始</strong>；也可以用負數從後面數。</p>
<pre class="out">  字串：  P   y   t   h   o   n
正索引：  0   1   2   3   4   5
負索引： -6  -5  -4  -3  -2  -1</pre>
<pre class="py">s = 'Python'
print(s[0], s[5], s[-1])   # 第一個、第六個、最後一個
print(s[0:3])              # 索引 0、1、2，不含 3
print(s[2:])               # 從索引 2 到最後
print(s[:2])               # 從開頭到索引 1
print(s[::-1])             # 間隔 -1：整個倒過來
print(len(s))              # 長度</pre>
<div class="box memo"><b class="t">記憶口訣</b>「<b>切片含頭不含尾</b>」：<code>s[1:4]</code> 取索引 1、2、3，共 4 − 1 = 3 個字元。可以到「互動練習 → 切片視覺化」實際操作。</div>
<div class="box warn"><b class="t">字串不能修改</b>字串是<b>不可變（Immutable）</b>的，<code>s[0] = 'J'</code> 會出現 TypeError。要「修改」只能建立新字串，例如 <code>s = 'J' + s[1:]</code>。</div>` },
    { id: 'methods', title: '常用字串方法', html: `
<table>
<tr><th>方法</th><th>作用</th><th>例子 → 結果</th></tr>
<tr><td><code>upper()</code> / <code>lower()</code></td><td>轉大寫／小寫</td><td><code>'Hi'.upper()</code> → 'HI'</td></tr>
<tr><td><code>strip()</code></td><td>去除前後空白與換行</td><td><code>'  a b  '.strip()</code> → 'a b'</td></tr>
<tr><td><code>replace(a, b)</code></td><td>把 a 換成 b</td><td><code>'2026/10/17'.replace('/', '-')</code></td></tr>
<tr><td><code>split(sep)</code></td><td>切成串列</td><td><code>'a,b,c'.split(',')</code> → ['a', 'b', 'c']</td></tr>
<tr><td><code>sep.join(list)</code></td><td>把串列接成字串</td><td><code>'-'.join(['a', 'b'])</code> → 'a-b'</td></tr>
<tr><td><code>find(x)</code></td><td>找位置，找不到回傳 -1</td><td><code>'hello'.find('l')</code> → 2</td></tr>
<tr><td><code>count(x)</code></td><td>計算出現次數</td><td><code>'banana'.count('a')</code> → 3</td></tr>
<tr><td><code>startswith()</code> / <code>endswith()</code></td><td>是否以某字開頭／結尾</td><td><code>'report.xlsx'.endswith('.xlsx')</code> → True</td></tr>
<tr><td><code>isdigit()</code></td><td>是否全是數字</td><td><code>'123'.isdigit()</code> → True</td></tr>
<tr><td><code>x in s</code></td><td>是否包含（運算子）</td><td><code>'台北' in '台北市信義區'</code> → True</td></tr>
</table>
<pre class="py">raw = '  王小明 , 0912-345-678 , taipei  '
name, phone, city = raw.split(',')
print(name.strip(), phone.strip().replace('-', ''), city.strip().title())</pre>
<h3>動手做：身分證字號格式檢查</h3>
<pre class="py" data-input="a123456789">id_no = input('請輸入身分證字號：').strip().upper()
print('長度正確：', len(id_no) == 10)
print('第一碼是英文：', id_no[0].isalpha())
print('第二碼是 1 或 2：', id_no[1] in '12')
print('後九碼都是數字：', id_no[1:].isdigit())</pre>
<div class="box memo"><b class="t">動手做</b>改成檢查手機號碼：長度 10、以 09 開頭、全部是數字。輸入時有人會打成 0912-345-678，先用 <code>replace()</code> 去掉減號。</div>` }
  ],
  keypoints: [
    '/ 結果一定是 float；// 取整數商（往下取整）；% 取餘數；** 次方',
    'x % 2 == 0 可判斷偶數；不確定運算順序就加括號',
    'x += 1 等於 x = x + 1',
    'f-string：f"{變數:格式}"，:.2f 兩位小數、:, 千分位、:.1% 百分比',
    '索引從 0 開始，-1 是最後一個；切片含頭不含尾',
    '字串不可變，修改要建立新字串',
    '常用方法：strip、split、join、replace、find、upper、isdigit'
  ]
},
{
  id: 'c04', subject: 1, minutes: 40,
  title: '條件判斷',
  summary: '比較運算子與布林值、if／elif／else 與縮排、邏輯運算 and／or／not、巢狀判斷與條件運算式，完成發票對獎程式。',
  sections: [
    { id: 'compare', title: '比較運算與布林值', html: `
<table>
<tr><th>運算子</th><th>意義</th><th>例子</th></tr>
<tr><td><code>==</code></td><td>等於</td><td><code>5 == 5</code> → True</td></tr>
<tr><td><code>!=</code></td><td>不等於</td><td><code>5 != 3</code> → True</td></tr>
<tr><td><code>&gt;</code> <code>&lt;</code></td><td>大於、小於</td><td><code>3 &gt; 5</code> → False</td></tr>
<tr><td><code>&gt;=</code> <code>&lt;=</code></td><td>大於等於、小於等於</td><td><code>60 &gt;= 60</code> → True</td></tr>
<tr><td><code>in</code> / <code>not in</code></td><td>是否包含</td><td><code>'a' in 'cat'</code> → True</td></tr>
</table>
<pre class="py">score = 72
print(score &gt;= 60)
print(60 &lt;= score &lt; 80)     # Python 可以連續比較
print('10' == 10)            # 字串和數字不相等</pre>` },
    { id: 'if', title: 'if、elif、else', html: `
<pre class="py" data-input="85">score = int(input('請輸入分數：'))
if score &gt;= 90:
    print('優等')
elif score &gt;= 80:
    print('甲等')
elif score &gt;= 60:
    print('及格')
else:
    print('不及格，要加油')
print('判斷結束')            # 沒有縮排，不屬於 if 區塊，一定會執行</pre>
<ul>
  <li>條件後面一定要加<b>冒號</b> <code>:</code>。</li>
  <li>屬於該條件的程式要<b>縮排</b>（建議 4 個空格），縮排一樣的程式屬於同一個區塊。</li>
  <li>由上往下檢查，<strong>第一個成立的條件</strong>執行後，其他就不再檢查。</li>
  <li><code>elif</code> 和 <code>else</code> 都可以省略；<code>elif</code> 可以有很多個。</li>
</ul>
<div class="box warn"><b class="t">條件順序很重要</b>如果把 <code>score &gt;= 60</code> 放在最前面，90 分也會被判斷成「及格」，因為第一個成立的條件就結束了。範圍判斷要<b>從嚴格到寬鬆</b>排列。</div>
<div class="box analogy"><b class="t">生活比喻</b>縮排就像文章的段落：同一段的句子說的是同一件事。Python 靠縮排判斷哪些程式屬於 if，其他語言則用大括號 <code>{}</code>。</div>` },
    { id: 'logic', title: '邏輯運算 and、or、not', html: `
<table>
<tr><th>運算子</th><th>意義</th><th>例子</th></tr>
<tr><td><code>and</code></td><td>兩個都成立才成立</td><td><code>age &gt;= 18 and has_id</code></td></tr>
<tr><td><code>or</code></td><td>任一個成立就成立</td><td><code>day == '六' or day == '日'</code></td></tr>
<tr><td><code>not</code></td><td>反過來</td><td><code>not is_member</code></td></tr>
</table>
<pre class="py">age = 20
is_student = True
if age &lt; 12 or age &gt;= 65:
    print('優待票')
elif is_student and age &lt; 25:
    print('學生票')
else:
    print('全票')

day = '日'
print(day in ['六', '日'])    # 比 day == '六' or day == '日' 簡潔</pre>
<div class="box tip"><b class="t">真假值（Truthy / Falsy）</b>在 if 中，<code>0</code>、<code>''</code>（空字串）、<code>[]</code>（空串列）、<code>None</code> 都視為 False，其他視為 True。所以 <code>if name:</code> 可以用來檢查「有沒有輸入名字」。</div>
<h3>條件運算式（一行 if）</h3>
<pre class="py">score = 55
result = '及格' if score &gt;= 60 else '不及格'
print(result)</pre>` },
    { id: 'invoice', title: '動手做：發票對獎', html: `
<p>簡化版的統一發票對獎：特別獎 8 碼全中 1,000 萬；頭獎 8 碼全中 20 萬；頭獎末 3 碼相同 200 元。</p>
<pre class="py" data-input="87654321">special = '12345678'
first = '87654321'
my = input('請輸入發票號碼（8 碼）：').strip()

if len(my) != 8 or not my.isdigit():
    print('格式錯誤，請輸入 8 位數字')
elif my == special:
    print('特別獎！1,000 萬元')
elif my == first:
    print('頭獎！20 萬元')
elif my[-3:] == first[-3:]:
    print('六獎！200 元')
else:
    print('沒有中獎，下次再來')</pre>
<div class="box memo"><b class="t">動手做</b>加上二獎（末 7 碼，4 萬元）到五獎（末 4 碼，1,000 元）的判斷。想想看：末 7 碼的判斷要放在末 3 碼之前還是之後？為什麼？</div>
<h3>match 敘述（Python 3.10 以上）</h3>
<p>比對單一值的多種情況時，可以用 <code>match</code>，比一連串 elif 更清楚：</p>
<pre class="py">command = 'stop'
match command:
    case 'start':
        print('開始')
    case 'stop' | 'quit':
        print('結束')
    case _:
        print('未知指令')</pre>` }
  ],
  keypoints: [
    '比較運算子：== != > < >= <=，結果是 True 或 False',
    'if 條件後要冒號，區塊要縮排 4 個空格',
    '由上往下檢查，第一個成立的條件執行後就結束；範圍判斷從嚴格到寬鬆',
    'and 兩者都要成立；or 一個成立即可；not 反轉',
    '0、空字串、空串列、None 在條件中視為 False',
    '條件運算式：值1 if 條件 else 值2',
    'match／case 可比對單一值的多種情況（3.10 以上）'
  ]
},
{
  id: 'c05', subject: 1, minutes: 50,
  title: '迴圈',
  summary: 'for 迴圈與 range()、while 迴圈、break 與 continue、巢狀迴圈、累加與計數的常見寫法，完成九九乘法表與猜數字遊戲。',
  sections: [
    { id: 'for', title: 'for 迴圈與 range()', html: `
<p><b>迴圈（Loop）</b>讓程式重複執行。<code>for</code> 會依序取出一組資料中的每一個元素：</p>
<pre class="py">for fruit in ['蘋果', '香蕉', '芭樂']:
    print('我喜歡', fruit)

for ch in 'Hi!':
    print(ch)</pre>
<p>需要重複固定次數時，搭配 <code>range()</code>：</p>
<table>
<tr><th>寫法</th><th>產生的數字</th></tr>
<tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4（從 0 開始，不含 5）</td></tr>
<tr><td><code>range(1, 6)</code></td><td>1, 2, 3, 4, 5</td></tr>
<tr><td><code>range(0, 10, 2)</code></td><td>0, 2, 4, 6, 8（間隔 2）</td></tr>
<tr><td><code>range(5, 0, -1)</code></td><td>5, 4, 3, 2, 1（倒數）</td></tr>
</table>
<pre class="py">for i in range(1, 6):
    print(f'第 {i} 次')

for n in range(10, 0, -3):
    print(n, end=' ')        # end=' ' 讓 print 不換行</pre>` },
    { id: 'pattern', title: '累加、計數與找最大值', html: `
<p>迴圈最常見的三種寫法，<strong>都要先在迴圈外準備一個變數</strong>：</p>
<pre class="py">scores = [72, 45, 90, 58, 66]

total = 0                 # 累加：從 0 開始
passed = 0                # 計數：從 0 開始
best = scores[0]          # 找最大值：先假設第一個最大
for s in scores:
    total += s
    if s &gt;= 60:
        passed += 1
    if s &gt; best:
        best = s

print('總分', total, '平均', total / len(scores))
print('及格人數', passed, '最高分', best)
print('內建函式驗證：', sum(scores), max(scores), min(scores))</pre>
<div class="box tip"><b class="t">實務上</b>簡單的加總與最大值可以直接用內建的 <code>sum()</code>、<code>max()</code>、<code>min()</code>。但了解迴圈寫法很重要，因為實務條件通常更複雜，例如「只加總台北分店」「找出業績最高的業務姓名」。到「互動練習 → 迴圈逐步追蹤」可以一步一步觀察變數變化。</div>
<h3>同時取得索引：enumerate()</h3>
<pre class="py">names = ['小明', '小華', '小美']
for i, name in enumerate(names, start=1):
    print(f'{i}. {name}')</pre>` },
    { id: 'while', title: 'while 迴圈、break 與 continue', html: `
<p><code>while</code> 在<b>條件成立時</b>持續重複，適合不知道要跑幾次的情況：</p>
<pre class="py">money = 0
month = 0
while money &lt; 10000:
    money += 3000
    month += 1
print(f'{month} 個月後存到 {money} 元')</pre>
<div class="box warn"><b class="t">小心無限迴圈</b>如果條件永遠成立（例如忘了 <code>money += 3000</code>），程式會一直跑不停。網頁執行器可以按「停止」；在自己電腦的終端機按 <b>Ctrl＋C</b> 中斷。</div>
<table>
<tr><th>關鍵字</th><th>作用</th></tr>
<tr><td><code>break</code></td><td>立刻<b>跳出</b>整個迴圈</td></tr>
<tr><td><code>continue</code></td><td><b>跳過</b>這一輪剩下的程式，直接進入下一輪</td></tr>
</table>
<pre class="py">for n in range(1, 11):
    if n % 3 == 0:
        continue          # 3 的倍數跳過
    if n &gt; 8:
        break             # 超過 8 就停止
    print(n, end=' ')</pre>
<h3>動手做：猜數字遊戲</h3>
<pre class="py" data-input="50&#10;25&#10;37&#10;31">import random
answer = random.randint(1, 100)    # 1～100 隨機整數
answer = 31                        # 為了示範固定答案，自己玩時刪掉這行
tries = 0
while True:                        # 先無限重複，猜中時用 break 離開
    guess = int(input('猜一個 1～100 的數字：'))
    tries += 1
    if guess &gt; answer:
        print('太大了')
    elif guess &lt; answer:
        print('太小了')
    else:
        print(f'答對了！你猜了 {tries} 次')
        break</pre>
<div class="box memo"><b class="t">動手做</b>①限制最多猜 7 次，用完次數就公布答案；②用二分法的策略，最多幾次一定能猜中 1～100 的數字？</div>` },
    { id: 'nested', title: '巢狀迴圈：九九乘法表', html: `
<p>迴圈裡面還有迴圈，稱為<b>巢狀迴圈</b>。外層每跑一次，內層會完整跑一輪：</p>
<pre class="py">for i in range(1, 10):
    for j in range(1, 10):
        print(f'{i}×{j}={i * j:2d}', end='  ')
    print()                       # 內層跑完後換行</pre>
<div class="box memo"><b class="t">動手做</b>改成只印出三角形的乘法表（j 只跑到 i）；或用 <code>'*' * i</code> 印出星號金字塔。</div>
<h3>for 與 while 怎麼選</h3>
<table>
<tr><th>情況</th><th>選擇</th></tr>
<tr><td>處理串列中的每個元素、固定次數</td><td><code>for</code></td></tr>
<tr><td>重複到某個條件達成為止、次數不確定</td><td><code>while</code></td></tr>
</table>` }
  ],
  keypoints: [
    'for 依序取出每個元素；range(start, stop, step) 不含 stop',
    '累加、計數、找最大值都要在迴圈外先設定初始值',
    'enumerate() 同時取得索引與值',
    'while 在條件成立時重複，注意避免無限迴圈（Ctrl＋C 中斷）',
    'break 跳出整個迴圈；continue 跳過本輪',
    'while True 搭配 break 是常見的「直到成功為止」寫法',
    '巢狀迴圈：外層每跑一次，內層完整跑一輪'
  ]
},
{
  id: 'c06', subject: 1, minutes: 45,
  title: '串列與 tuple',
  summary: '建立串列、索引與切片、新增刪除修改、排序與常用函式、巢狀串列、串列推導式，以及不可修改的 tuple，完成成績統計程式。',
  sections: [
    { id: 'list', title: '建立與存取串列', html: `
<p><b>串列（List）</b>用中括號把多個資料放在一起，可以放不同型別，也可以修改。</p>
<pre class="py">scores = [85, 72, 90, 68]
mixed = ['小明', 25, True, 1.72]
empty = []

print(scores[0], scores[-1])     # 索引和字串一樣從 0 開始
print(scores[1:3])               # 切片
print(len(scores))               # 元素個數
print(90 in scores)              # 是否包含</pre>
<div class="box tip"><b class="t">和字串的差別</b>串列的索引、切片、<code>len()</code>、<code>in</code> 都和字串相同；最大的差別是串列<b>可以修改</b>（可變 Mutable），字串不行。</div>` },
    { id: 'modify', title: '新增、刪除與修改', html: `
<table>
<tr><th>操作</th><th>寫法</th><th>說明</th></tr>
<tr><td>修改</td><td><code>a[0] = 99</code></td><td>直接指定新值</td></tr>
<tr><td>加到最後</td><td><code>a.append(x)</code></td><td>最常用</td></tr>
<tr><td>插入</td><td><code>a.insert(i, x)</code></td><td>插到索引 i 的位置</td></tr>
<tr><td>合併</td><td><code>a.extend(b)</code> 或 <code>a + b</code></td><td>把另一個串列接上來</td></tr>
<tr><td>依值刪除</td><td><code>a.remove(x)</code></td><td>刪除第一個等於 x 的元素</td></tr>
<tr><td>依索引取出</td><td><code>a.pop(i)</code></td><td>省略 i 就取出最後一個，並回傳它</td></tr>
<tr><td>依索引刪除</td><td><code>del a[i]</code></td><td>不回傳</td></tr>
<tr><td>找位置</td><td><code>a.index(x)</code></td><td>找不到會出錯</td></tr>
<tr><td>計數</td><td><code>a.count(x)</code></td><td>x 出現幾次</td></tr>
</table>
<pre class="py">todo = ['寫報告', '開會']
todo.append('回信')
todo.insert(0, '喝咖啡')
print(todo)
done = todo.pop(0)
print('完成：', done, '剩下：', todo)
todo.remove('開會')
print(todo)</pre>` },
    { id: 'sort', title: '排序與常用函式', html: `
<pre class="py">nums = [5, 2, 9, 1, 7]
print(sorted(nums))                  # 回傳新的排序串列，原串列不變
print(sorted(nums, reverse=True))    # 由大到小
print(nums)
nums.sort()                          # 直接修改原串列，回傳 None
print(nums)
print(sum(nums), max(nums), min(nums))

words = ['banana', 'Kiwi', 'apple']
print(sorted(words, key=len))        # 依長度排序
print(sorted(words, key=str.lower))  # 忽略大小寫</pre>
<div class="box warn"><b class="t">易錯</b><code>a = a.sort()</code> 會讓 a 變成 <code>None</code>，因為 <code>sort()</code> 是直接修改、沒有回傳值。要保留原串列就用 <code>sorted()</code>。</div>
<h3>複製串列的陷阱</h3>
<pre class="py">a = [1, 2, 3]
b = a            # b 和 a 指向「同一個」串列
b.append(4)
print(a)         # a 也變了！

c = a.copy()     # 或 a[:]，建立真正的複本
c.append(5)
print(a, c)</pre>
<div class="box analogy"><b class="t">生活比喻</b><code>b = a</code> 像是把同一份雲端文件的連結分享給別人，對方修改你也看得到；<code>a.copy()</code> 才是另存一份新檔案。</div>` },
    { id: 'comp', title: '巢狀串列與串列推導式', html: `
<p>串列裡面放串列，就能表示表格資料：</p>
<pre class="py">students = [
    ['小明', 85, 92],
    ['小華', 72, 68],
    ['小美', 90, 95],
]
for name, chinese, math in students:     # 拆解每一列
    print(f'{name}：平均 {(chinese + math) / 2}')
print(students[2][0], students[2][2])     # 第 3 列的第 1 欄與第 3 欄</pre>
<p><b>串列推導式（List Comprehension）</b>用一行建立新串列，是 Python 很常見的寫法：</p>
<pre class="py">prices = [100, 250, 80, 400]
discounted = [p * 0.9 for p in prices]           # 每個都打九折
expensive = [p for p in prices if p &gt;= 200]       # 篩選
squares = [n ** 2 for n in range(1, 6)]
print(discounted, expensive, squares)</pre>
<div class="box memo"><b class="t">記憶口訣</b>「<b>[ 要什麼 for 從哪來 if 條件 ]</b>」。等於先建立空串列，在 for 迴圈中 append。太複雜時就寫回一般迴圈，可讀性比較重要。</div>` },
    { id: 'tuple', title: 'tuple 與動手做：成績統計', html: `
<p><b>tuple</b> 用小括號，和串列很像，但<strong>建立後不能修改</strong>。適合放「不應該被改變」的資料，例如座標、設定值，或函式一次回傳多個值。</p>
<pre class="py">point = (25.03, 121.56)      # 台北的經緯度
lat, lng = point             # 拆解（Unpacking）
print(lat, lng)
single = (5,)                # 只有一個元素時要加逗號
print(type(single))
# point[0] = 0               # 取消註解會出現 TypeError</pre>
<h3>動手做：成績統計</h3>
<pre class="py" data-input="85 72 90 58 66 100 43">raw = input('請輸入成績（用空白分隔）：')
scores = [int(x) for x in raw.split()]
avg = sum(scores) / len(scores)
print(f'人數 {len(scores)}，平均 {avg:.1f}')
print('最高', max(scores), '最低', min(scores))
print('高於平均：', [s for s in scores if s &gt; avg])
print('及格率：', f'{len([s for s in scores if s &gt;= 60]) / len(scores):.0%}')
print('排名：', sorted(scores, reverse=True))</pre>
<div class="box memo"><b class="t">動手做</b>加上「中位數」：排序後取中間那個（人數為偶數時取中間兩個的平均）。</div>` }
  ],
  keypoints: [
    '串列用 []，可放不同型別，可以修改；索引與切片和字串相同',
    'append 加到最後、insert 插入、pop 取出、remove 依值刪除',
    'sorted() 回傳新串列；a.sort() 直接修改且回傳 None',
    'b = a 是同一個串列；要複製用 a.copy() 或 a[:]',
    '巢狀串列表示表格，用 a[列][欄] 存取',
    '串列推導式：[運算 for 變數 in 來源 if 條件]',
    'tuple 用 ()，建立後不能修改；單一元素要寫 (5,)'
  ]
}
);
