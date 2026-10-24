/* Python 入門 進階篇：資料結構、函式與程式組織 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 45,
  title: '字典與集合',
  summary: '用鍵值對儲存資料、新增修改與安全取值、走訪字典、巢狀資料（JSON 的結構），以及去除重複與交集聯集的集合，完成用字次數統計。',
  sections: [
    { id: 'dict', title: '字典：用名字找資料', html: `
<p><b>字典（Dictionary）</b>用大括號儲存<b>鍵（Key）與值（Value）</b>的配對，像通訊錄用名字找電話，不用記索引位置。</p>
<pre class="py">student = {'name': '小明', 'age': 20, 'city': '台中'}
print(student['name'])
student['age'] = 21              # 修改
student['email'] = 'ming@example.com'   # 新增（鍵不存在就新增）
del student['city']              # 刪除
print(student)
print(len(student), 'age' in student)</pre>
<ul>
  <li>鍵必須是<b>不可變</b>的型別，通常用字串或數字；同一個字典中鍵不能重複。</li>
  <li>值可以是任何型別，包括串列或另一個字典。</li>
  <li>Python 3.7 以後，字典會保留加入的順序。</li>
</ul>
<h3>安全取值：get()</h3>
<pre class="py">student = {'name': '小明'}
print(student.get('phone'))              # 不存在回傳 None，不會出錯
print(student.get('phone', '未填寫'))    # 指定預設值
# print(student['phone'])                # 取消註解會出現 KeyError</pre>
<div class="box exam"><b class="t">重點</b>不確定鍵是否存在時，用 <code>d.get(鍵, 預設值)</code> 或先用 <code>鍵 in d</code> 檢查，避免 <code>KeyError</code>。</div>` },
    { id: 'loop', title: '走訪字典', html: `
<table>
<tr><th>方法</th><th>取得</th></tr>
<tr><td><code>d.keys()</code></td><td>所有鍵（直接 <code>for k in d</code> 也是取鍵）</td></tr>
<tr><td><code>d.values()</code></td><td>所有值</td></tr>
<tr><td><code>d.items()</code></td><td>所有（鍵, 值）配對，最常用</td></tr>
</table>
<pre class="py">prices = {'珍奶': 60, '紅茶': 30, '拿鐵': 85}
for drink, price in prices.items():
    print(f'{drink:　&lt;4}{price:&gt;4} 元')
print('平均價格：', sum(prices.values()) / len(prices))
print('最貴的是：', max(prices, key=prices.get))

# 依價格排序
for drink, price in sorted(prices.items(), key=lambda x: x[1]):
    print(drink, price)</pre>
<h3>字典推導式</h3>
<pre class="py">prices = {'珍奶': 60, '紅茶': 30, '拿鐵': 85}
after = {k: v + 5 for k, v in prices.items()}            # 全部漲 5 元
cheap = {k: v for k, v in prices.items() if v &lt; 70}
print(after, cheap)</pre>` },
    { id: 'nested', title: '巢狀資料：串列裡放字典', html: `
<p>實務上最常見的資料結構是「<b>串列裡放字典</b>」，每個字典是一筆資料。這也是 <b>JSON</b>（網路 API 最常用的格式）的樣子，第 10 章與實戰課都會用到。</p>
<pre class="py">orders = [
    {'id': 'A01', 'customer': '小明', 'items': ['珍奶', '雞排'], 'total': 130},
    {'id': 'A02', 'customer': '小華', 'items': ['紅茶'], 'total': 30},
    {'id': 'A03', 'customer': '小明', 'items': ['拿鐵'], 'total': 85},
]
for o in orders:
    print(o['id'], o['customer'], '、'.join(o['items']), o['total'])

ming_total = sum(o['total'] for o in orders if o['customer'] == '小明')
print('小明共消費', ming_total)
print('第一筆的第二個品項：', orders[0]['items'][1])</pre>` },
    { id: 'count', title: '動手做：統計次數', html: `
<p>「統計每個東西出現幾次」是字典最經典的用法：</p>
<pre class="py">text = '今天 天氣 很好 今天 心情 也 很好 很好'
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1     # 沒出現過就從 0 開始
print(counts)

# 由多到少排序，取前三名
top = sorted(counts.items(), key=lambda x: x[1], reverse=True)[:3]
for word, n in top:
    print(word, n)</pre>
<div class="box tip"><b class="t">標準函式庫的捷徑</b><code>from collections import Counter</code> 後，<code>Counter(text.split()).most_common(3)</code> 一行就完成。先理解原理，再使用捷徑。</div>
<pre class="py">from collections import Counter
votes = ['A', 'B', 'A', 'C', 'A', 'B']
print(Counter(votes).most_common())</pre>` },
    { id: 'set', title: '集合：去除重複與比對', html: `
<p><b>集合（Set）</b>用大括號，但只有值、沒有鍵。特性是<strong>元素不重複、沒有順序</strong>。</p>
<pre class="py">tags = ['python', 'excel', 'python', 'ai', 'excel']
unique = set(tags)
print(unique, len(unique))           # 自動去除重複

a = {'小明', '小華', '小美'}           # 參加 A 課程
b = {'小華', '小美', '小強'}           # 參加 B 課程
print('兩門都上：', a &amp; b)            # 交集
print('至少上一門：', a | b)          # 聯集
print('只上 A：', a - b)              # 差集
print('小強' in b)                    # 判斷是否存在非常快</pre>
<div class="box warn"><b class="t">易錯</b>空集合要寫 <code>set()</code>，因為 <code>{}</code> 是空字典。</div>
<table>
<tr><th>資料結構</th><th>符號</th><th>有順序</th><th>可修改</th><th>可重複</th><th>適用</th></tr>
<tr><td>串列 list</td><td><code>[]</code></td><td>是</td><td>是</td><td>是</td><td>一串依序排列的資料</td></tr>
<tr><td>tuple</td><td><code>()</code></td><td>是</td><td>否</td><td>是</td><td>固定不變的資料</td></tr>
<tr><td>字典 dict</td><td><code>{k: v}</code></td><td>保留加入順序</td><td>是</td><td>鍵不可重複</td><td>用名稱查找資料</td></tr>
<tr><td>集合 set</td><td><code>{}</code></td><td>否</td><td>是</td><td>否</td><td>去重複、比對</td></tr>
</table>` }
  ],
  keypoints: [
    '字典儲存鍵值對：d[鍵] 取值、d[鍵] = 值 新增或修改、del 刪除',
    '鍵不可重複且須為不可變型別；不確定是否存在用 d.get(鍵, 預設值)',
    'd.items() 同時取得鍵與值，是走訪字典最常用的方式',
    '串列裡放字典是 JSON 與實務資料最常見的結構',
    '統計次數：counts[k] = counts.get(k, 0) + 1，或用 Counter',
    '集合元素不重複、沒有順序；& 交集、| 聯集、- 差集',
    '空集合寫 set()，{} 是空字典'
  ]
},
{
  id: 'c08', subject: 2, minutes: 50,
  title: '函式',
  summary: '定義與呼叫函式、參數與回傳值、預設參數與關鍵字引數、*args 與 **kwargs、變數作用域、lambda，以及寫好函式的原則。',
  sections: [
    { id: 'def', title: '定義與呼叫函式', html: `
<p><b>函式（Function）</b>把一段程式包起來並取名字，需要時呼叫就能重複使用。<code>print()</code>、<code>len()</code> 都是內建函式，現在要學自己寫。</p>
<pre class="py">def greet(name):
    """向指定的人打招呼"""        # 文件字串：說明函式用途
    print(f'哈囉，{name}！')

greet('小明')
greet('小華')</pre>
<ul>
  <li><code>def</code> 開頭，接函式名稱、小括號中的<b>參數</b>，最後是冒號。</li>
  <li>函式內容要縮排；定義時不會執行，<b>呼叫時</b>才會執行。</li>
  <li>函式要<b>先定義、後呼叫</b>。</li>
</ul>
<div class="box tip"><b class="t">為什麼要用函式</b>①不重複寫相同程式（Don't Repeat Yourself）；②修改時只要改一個地方；③取個好名字，程式讀起來像說明文件；④方便測試。</div>` },
    { id: 'return', title: '回傳值：return', html: `
<pre class="py">def bmi(weight, height_cm):
    h = height_cm / 100
    return round(weight / h ** 2, 1)

def level(value):
    if value &lt; 18.5:
        return '過輕'
    if value &lt; 24:
        return '正常'
    return '過重'           # 執行到 return 就離開函式

my_bmi = bmi(70, 172)
print(my_bmi, level(my_bmi))
print(level(bmi(50, 170)))</pre>
<div class="box exam"><b class="t">print 與 return 的差別</b><code>print</code> 只是<b>顯示給人看</b>，程式拿不到這個值；<code>return</code> 是<b>把結果交回給呼叫的地方</b>，可以存進變數、再拿去計算。沒有 return 的函式會回傳 <code>None</code>。</div>
<pre class="py">def add_print(a, b):
    print(a + b)

def add_return(a, b):
    return a + b

x = add_print(2, 3)       # 會顯示 5，但 x 是 None
y = add_return(2, 3)      # 不會顯示，但 y 是 5
print(x, y)</pre>
<p>函式可以一次回傳多個值（實際上是回傳 tuple）：</p>
<pre class="py">def stats(nums):
    return min(nums), max(nums), sum(nums) / len(nums)

low, high, avg = stats([3, 8, 5])
print(low, high, avg)</pre>` },
    { id: 'params', title: '參數的各種寫法', html: `
<table>
<tr><th>寫法</th><th>說明</th></tr>
<tr><td><b>位置引數</b></td><td>依順序傳入：<code>bmi(70, 172)</code></td></tr>
<tr><td><b>關鍵字引數</b></td><td>指定參數名稱，順序可以不同：<code>bmi(height_cm=172, weight=70)</code></td></tr>
<tr><td><b>預設參數</b></td><td>沒傳就用預設值：<code>def price(amount, tax=0.05)</code></td></tr>
<tr><td><code>*args</code></td><td>接收任意數量的位置引數，成為 tuple</td></tr>
<tr><td><code>**kwargs</code></td><td>接收任意數量的關鍵字引數，成為字典</td></tr>
</table>
<pre class="py">def price(amount, tax=0.05, discount=0):
    return round(amount * (1 - discount) * (1 + tax))

print(price(1000))                    # 用預設稅率
print(price(1000, discount=0.2))      # 只改折扣
print(price(1000, 0, 0.1))            # 依位置傳入

def total(*nums):
    return sum(nums)
print(total(1, 2, 3, 4))

def profile(name, **info):
    print(name, info)
profile('小明', age=20, city='台中')</pre>
<div class="box warn"><b class="t">預設值不要用可變物件</b><code>def add(item, box=[])</code> 的預設串列只會建立一次，每次呼叫都共用同一個，造成資料累積。應寫成 <code>box=None</code>，再在函式內 <code>if box is None: box = []</code>。</div>` },
    { id: 'scope', title: '變數作用域', html: `
<p>在函式內建立的變數是<b>區域變數（Local）</b>，只在函式內有效；函式外的是<b>全域變數（Global）</b>。</p>
<pre class="py">rate = 0.05                 # 全域變數

def interest(money):
    result = money * rate   # 函式內可以「讀取」全域變數
    return result

print(interest(10000))
# print(result)             # 取消註解會出現 NameError：result 只存在於函式內</pre>
<pre class="py">count = 0
def add_bad():
    count += 1              # 想修改全域變數會出錯
try:
    add_bad()
except UnboundLocalError as e:
    print('錯誤：', e)

def add_good(c):            # 比較好的做法：傳進來、回傳出去
    return c + 1
count = add_good(count)
print(count)</pre>
<div class="box tip"><b class="t">建議</b>雖然可以用 <code>global count</code> 宣告後修改全域變數，但會讓程式難以追蹤。好的函式應該「<b>資料從參數進來，結果用 return 出去</b>」。</div>` },
    { id: 'lambda', title: 'lambda 與函式當參數', html: `
<p><b>lambda</b> 是一行的匿名函式，常用在排序或篩選時臨時指定規則：</p>
<pre class="py">square = lambda x: x ** 2       # 等同 def square(x): return x ** 2
print(square(5))

products = [('滑鼠', 590), ('鍵盤', 1290), ('螢幕', 4990), ('耳機', 890)]
print(sorted(products, key=lambda p: p[1]))               # 依價格
print(max(products, key=lambda p: p[1]))
print(list(filter(lambda p: p[1] &lt; 1000, products)))     # 篩選
print(list(map(lambda p: p[1] * 0.9, products)))          # 每個打九折</pre>
<h3>動手做：把前面的練習整理成函式</h3>
<pre class="py">def check_phone(phone):
    """檢查台灣手機號碼格式，回傳 True 或 False"""
    phone = phone.replace('-', '').replace(' ', '')
    return len(phone) == 10 and phone.startswith('09') and phone.isdigit()

for p in ['0912-345-678', '0212345678', '09123', '0987 654 321']:
    print(p, check_phone(p))</pre>
<div class="box memo"><b class="t">動手做</b>把第 4 章的發票對獎寫成函式 <code>check_invoice(my, special, first)</code>，回傳中獎金額（沒中回傳 0），再用迴圈一次檢查多張發票並加總獎金。</div>` }
  ],
  keypoints: [
    'def 名稱(參數): 定義函式；呼叫時才執行，要先定義後呼叫',
    'return 把結果交回並離開函式；沒有 return 會回傳 None',
    'print 是顯示給人看，return 是交給程式繼續使用',
    '預設參數讓呼叫更彈性；關鍵字引數可不依順序傳入',
    '*args 收集位置引數、**kwargs 收集關鍵字引數',
    '函式內的變數是區域變數；資料由參數進、結果用 return 出',
    'lambda 是一行匿名函式，常搭配 sorted、max、filter 的 key'
  ]
},
{
  id: 'c09', subject: 2, minutes: 40,
  title: '例外處理與除錯',
  summary: '看懂 Traceback、常見例外種類、try／except／else／finally、主動 raise 與輸入驗證，以及 print 除錯與 VS Code 中斷點。',
  sections: [
    { id: 'traceback', title: '看懂錯誤訊息', html: `
<p>程式執行時發生的錯誤稱為<b>例外（Exception）</b>。Python 會顯示 <b>Traceback</b>，告訴你錯誤發生的路徑：</p>
<pre class="out">Traceback (most recent call last):
  File "shop.py", line 8, in &lt;module&gt;
    total = calc(price, qty)
  File "shop.py", line 3, in calc
    return price * int(qty)
ValueError: invalid literal for int() with base 10: '三'</pre>
<ol>
  <li><b>最後一行</b>：錯誤種類 <code>ValueError</code> 與原因（'三' 不能轉成整數）。</li>
  <li><b>往上一層</b>：錯誤發生在第 3 行的 calc 函式。</li>
  <li><b>再往上</b>：是第 8 行呼叫 calc 時觸發的。</li>
</ol>
<div class="box tip"><b class="t">查錯技巧</b>把最後一行錯誤訊息複製去搜尋，或貼給 AI 助理並附上相關程式碼，通常能很快找到原因。到「互動練習 → 錯誤訊息查詢」可以查看常見錯誤的中文說明與修正範例。</div>` },
    { id: 'try', title: 'try 與 except', html: `
<p>用 <code>try</code> 包住可能出錯的程式，出錯時跳到 <code>except</code> 處理，程式就不會中斷。</p>
<pre class="py" data-input="abc&#10;0&#10;4">for _ in range(3):
    text = input('請輸入除數：')
    try:
        n = int(text)
        print('100 ÷', n, '=', 100 / n)
    except ValueError:
        print('請輸入數字')
    except ZeroDivisionError:
        print('不能除以 0')</pre>
<table>
<tr><th>區塊</th><th>何時執行</th></tr>
<tr><td><code>try</code></td><td>嘗試執行的程式</td></tr>
<tr><td><code>except 錯誤種類</code></td><td>發生該種錯誤時；可以有多個</td></tr>
<tr><td><code>except 錯誤 as e</code></td><td>同時取得錯誤物件，可印出訊息</td></tr>
<tr><td><code>else</code></td><td>沒有發生錯誤時</td></tr>
<tr><td><code>finally</code></td><td><b>不論有沒有錯誤都會執行</b>，常用來關閉檔案或連線</td></tr>
</table>
<pre class="py">def safe_div(a, b):
    try:
        result = a / b
    except ZeroDivisionError as e:
        print('錯誤：', e)
        return None
    else:
        print('計算成功')
        return result
    finally:
        print('（每次都會執行 finally）')

print(safe_div(10, 2))
print(safe_div(10, 0))</pre>
<div class="box warn"><b class="t">不要什麼都抓</b>只寫 <code>except:</code> 或 <code>except Exception:</code> 而且什麼都不做（<code>pass</code>），會把真正的錯誤藏起來，讓除錯變得非常困難。應該只捕捉你<b>預期會發生、且知道怎麼處理</b>的錯誤。</div>` },
    { id: 'raise', title: '主動拋出例外與輸入驗證', html: `
<p>發現資料不合理時，可以用 <code>raise</code> 主動拋出例外，讓呼叫的人知道出了問題：</p>
<pre class="py">def withdraw(balance, amount):
    if amount &lt;= 0:
        raise ValueError('提款金額必須大於 0')
    if amount &gt; balance:
        raise ValueError(f'餘額不足，目前只有 {balance} 元')
    return balance - amount

for amt in [500, -100, 9999]:
    try:
        print('剩下', withdraw(3000, amt))
    except ValueError as e:
        print('失敗：', e)</pre>
<h3>動手做：防呆的輸入</h3>
<pre class="py" data-input="七十&#10;-5&#10;70">def ask_number(prompt, low, high):
    """持續詢問，直到使用者輸入範圍內的數字"""
    while True:
        text = input(prompt)
        try:
            value = float(text)
        except ValueError:
            print(f'「{text}」不是數字，請重新輸入')
            continue
        if low &lt;= value &lt;= high:
            return value
        print(f'請輸入 {low} 到 {high} 之間的數字')

w = ask_number('體重（公斤）：', 20, 300)
print('收到', w)</pre>` },
    { id: 'debug', title: '除錯技巧', html: `
<table>
<tr><th>方法</th><th>做法</th><th>適用</th></tr>
<tr><td><b>print 除錯</b></td><td>在可疑的地方印出變數：<code>print(f'{x=} {type(x)=}')</code></td><td>最快、最常用</td></tr>
<tr><td><b>縮小範圍</b></td><td>把程式註解掉一半，看錯誤還在不在</td><td>找不到錯在哪裡時</td></tr>
<tr><td><b>VS Code 中斷點</b></td><td>在行號左邊點紅點，按 F5 執行，程式會停在那一行，可以查看所有變數</td><td>邏輯複雜、迴圈很多時</td></tr>
<tr><td><b>assert</b></td><td><code>assert total &gt;= 0, 'total 不應為負'</code>，條件不成立就報錯</td><td>確認自己的假設</td></tr>
<tr><td><b>小黃鴨除錯法</b></td><td>把程式一行一行解釋給別人（或一隻黃色小鴨）聽</td><td>常常講到一半就發現問題</td></tr>
</table>
<pre class="py">prices = ['100', '250', '80']
total = 0
for p in prices:
    print(f'{p=} {type(p)=}')      # 除錯：發現 p 是字串
    total += int(p)
print(total)</pre>
<div class="box memo"><b class="t">邏輯錯誤最難找</b>語法錯誤會直接報錯，但「程式跑得動、結果卻不對」的邏輯錯誤不會有任何提示。準備一組<b>你知道正確答案的測試資料</b>，比對程式的輸出，是找邏輯錯誤最有效的方法。</div>` }
  ],
  keypoints: [
    'Traceback 從最後一行看錯誤種類與原因，再往上找出錯的行',
    'try 包住可能出錯的程式，except 依錯誤種類分別處理',
    'else 在沒有錯誤時執行，finally 不論如何都會執行',
    '只捕捉預期且知道如何處理的錯誤，不要用空的 except 隱藏問題',
    'raise ValueError("訊息") 主動拋出例外',
    'while True + try + continue 可做出防呆的輸入',
    'print(f"{x=}") 快速除錯；VS Code 中斷點可逐行查看變數'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '檔案讀寫',
  summary: '用 with open() 讀寫文字檔、檔案模式與中文編碼、CSV 讀寫、JSON 與字典互轉，以及用 pathlib 處理路徑，完成 CSV 記帳本。',
  sections: [
    { id: 'text', title: '讀寫文字檔', html: `
<p>程式結束後變數就消失了，要長期保存資料就要寫進檔案。</p>
<pre class="py">with open('diary.txt', 'w', encoding='utf-8') as f:
    f.write('今天學了 Python\\n')
    f.write('明天要學檔案處理\\n')

with open('diary.txt', 'a', encoding='utf-8') as f:     # 'a' 附加在後面
    f.write('補充：記得加 encoding\\n')

with open('diary.txt', encoding='utf-8') as f:           # 預設是 'r' 讀取
    for line in f:                                       # 一行一行讀
        print(line.strip())</pre>
<table>
<tr><th>模式</th><th>意義</th><th>注意</th></tr>
<tr><td><code>'r'</code></td><td>讀取（預設）</td><td>檔案不存在會出現 FileNotFoundError</td></tr>
<tr><td><code>'w'</code></td><td>寫入</td><td><b>會清空原本的內容</b>，檔案不存在會新建</td></tr>
<tr><td><code>'a'</code></td><td>附加</td><td>寫在原本內容的後面</td></tr>
<tr><td><code>'x'</code></td><td>新建</td><td>檔案已存在就出錯，避免意外覆蓋</td></tr>
<tr><td><code>'b'</code></td><td>二進位</td><td>搭配使用，例如 <code>'rb'</code> 讀圖片</td></tr>
</table>
<div class="box exam"><b class="t">兩個好習慣</b>①使用 <code>with</code>：離開區塊時自動關閉檔案，即使中途出錯也會關。②寫明 <code>encoding='utf-8'</code>：Windows 預設編碼可能不是 UTF-8，不寫的話中文容易變亂碼。</div>
<p>其他讀取方式：<code>f.read()</code> 一次讀全部成字串；<code>f.readlines()</code> 讀成每行一個元素的串列。</p>
<div class="box tip"><b class="t">網頁執行器的檔案</b>本頁的執行器有一個暫時的虛擬檔案系統，可以練習讀寫，但重新整理後就會消失，也讀不到你電腦上的檔案。</div>` },
    { id: 'csv', title: 'CSV 檔案', html: `
<p><b>CSV</b>（逗號分隔值）是最常見的表格資料格式，Excel 可以直接開啟與另存。</p>
<pre class="py">import csv

rows = [
    ['日期', '項目', '金額'],
    ['2026-10-01', '午餐', 120],
    ['2026-10-01', '捷運', 35],
    ['2026-10-02', '書籍', 450],
]
with open('expense.csv', 'w', newline='', encoding='utf-8-sig') as f:
    csv.writer(f).writerows(rows)

with open('expense.csv', encoding='utf-8-sig') as f:
    for row in csv.DictReader(f):          # 每一列變成字典，用欄位名稱取值
        print(row['日期'], row['項目'], int(row['金額']))</pre>
<ul>
  <li>寫入 CSV 要加 <code>newline=''</code>，否則 Windows 會多出空白行。</li>
  <li>要給 Excel 開啟的 CSV，建議用 <code>encoding='utf-8-sig'</code>，中文才不會亂碼。</li>
  <li>台灣舊系統匯出的 CSV 可能是 Big5，讀取時改用 <code>encoding='cp950'</code>。</li>
  <li><code>DictReader</code> 讀出來的值<strong>都是字串</strong>，計算前要轉型。</li>
</ul>` },
    { id: 'json', title: 'JSON 與字典互轉', html: `
<p><b>JSON</b> 是網路 API 與設定檔最常用的格式，結構和 Python 的字典、串列幾乎一樣。</p>
<pre class="py">import json

settings = {'name': '我的記帳本', 'budget': 15000, 'categories': ['餐飲', '交通', '娛樂']}

with open('settings.json', 'w', encoding='utf-8') as f:
    json.dump(settings, f, ensure_ascii=False, indent=2)   # 保留中文、排版

with open('settings.json', encoding='utf-8') as f:
    loaded = json.load(f)
print(loaded['budget'], loaded['categories'][0])

text = json.dumps(settings, ensure_ascii=False)    # 字典 → JSON 字串
back = json.loads(text)                            # JSON 字串 → 字典
print(type(text), type(back))</pre>
<div class="box memo"><b class="t">記憶口訣</b>「<b>有 s 是字串，沒 s 是檔案</b>」：<code>dumps</code>／<code>loads</code> 處理字串，<code>dump</code>／<code>load</code> 處理檔案。</div>` },
    { id: 'path', title: 'pathlib 與動手做：記帳本', html: `
<p><code>pathlib</code> 是處理路徑的現代寫法，可以避免 Windows 與 macOS 路徑寫法不同的問題：</p>
<pre class="py">from pathlib import Path

folder = Path('reports')
folder.mkdir(exist_ok=True)                 # 建立資料夾（已存在不報錯）
file = folder / '2026-10.txt'               # 用 / 組合路徑
file.write_text('十月報告', encoding='utf-8')
print(file, file.exists(), file.suffix, file.stem)
print(file.read_text(encoding='utf-8'))
print([p.name for p in folder.glob('*.txt')])   # 找出所有 txt 檔</pre>
<h3>動手做：CSV 記帳本</h3>
<pre class="py">import csv
from pathlib import Path

FILE = Path('ledger.csv')

def add(date, item, amount):
    new = not FILE.exists()
    with FILE.open('a', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f)
        if new:
            w.writerow(['日期', '項目', '金額'])
        w.writerow([date, item, amount])

def summary():
    total, by_item = 0, {}
    with FILE.open(encoding='utf-8-sig') as f:
        for row in csv.DictReader(f):
            amt = int(row['金額'])
            total += amt
            by_item[row['項目']] = by_item.get(row['項目'], 0) + amt
    return total, by_item

add('2026-10-01', '餐飲', 120)
add('2026-10-01', '交通', 35)
add('2026-10-02', '餐飲', 180)
total, by_item = summary()
print('總支出', total)
for k, v in by_item.items():
    print(f'{k} {v} 元（{v / total:.0%}）')</pre>
<div class="box memo"><b class="t">動手做</b>加上「依月份統計」功能：用 <code>row['日期'][:7]</code> 取出年月作為字典的鍵。</div>` }
  ],
  keypoints: [
    'with open(檔名, 模式, encoding="utf-8") as f：離開區塊自動關檔',
    "'r' 讀、'w' 寫（會清空）、'a' 附加、'x' 新建",
    '中文檔案一定要指定 encoding；給 Excel 的 CSV 用 utf-8-sig，Big5 用 cp950',
    'csv.writer 寫入要加 newline=""；DictReader 讀出的值都是字串',
    'json.dump／load 處理檔案，dumps／loads 處理字串；ensure_ascii=False 保留中文',
    'pathlib：Path / "檔名" 組合路徑，mkdir、exists、glob、read_text',
    '讀寫檔案時常見錯誤：FileNotFoundError、UnicodeDecodeError'
  ]
},
{
  id: 'c11', subject: 2, minutes: 40,
  title: '模組與套件',
  summary: 'import 的各種寫法、常用標準函式庫（datetime、random、math、os、time）、自己寫模組與 __name__、pip 安裝套件與虛擬環境。',
  sections: [
    { id: 'import', title: '匯入模組', html: `
<p><b>模組（Module）</b>是別人（或自己）寫好的 .py 檔，匯入後就能使用裡面的函式。Python 內建大量模組，稱為<b>標準函式庫</b>，不用安裝就能用。</p>
<pre class="py">import math                         # 匯入整個模組
print(math.sqrt(16), math.pi)

from math import ceil, floor        # 只匯入需要的函式
print(ceil(4.2), floor(4.8))        # 無條件進位、捨去

import datetime as dt               # 取別名
print(dt.date.today())</pre>
<div class="box warn"><b class="t">避免 from 模組 import *</b>一次匯入全部名稱，容易和自己的變數撞名，也看不出函式從哪裡來。另外，<b>不要把自己的檔案取名為 random.py、csv.py</b> 這類和標準模組相同的名字，會蓋掉真正的模組。</div>` },
    { id: 'stdlib', title: '常用標準函式庫', html: `
<table>
<tr><th>模組</th><th>用途</th><th>常用功能</th></tr>
<tr><td><code>datetime</code></td><td>日期時間</td><td>今天日期、日期加減、格式化</td></tr>
<tr><td><code>random</code></td><td>隨機</td><td>randint、choice、shuffle、sample</td></tr>
<tr><td><code>math</code></td><td>數學</td><td>sqrt、ceil、floor、pi</td></tr>
<tr><td><code>os</code> / <code>pathlib</code></td><td>檔案與作業系統</td><td>列出檔案、建立資料夾、環境變數</td></tr>
<tr><td><code>time</code></td><td>時間</td><td>sleep 暫停、計時</td></tr>
<tr><td><code>csv</code> / <code>json</code></td><td>資料格式</td><td>第 10 章</td></tr>
<tr><td><code>collections</code></td><td>進階資料結構</td><td>Counter、defaultdict</td></tr>
<tr><td><code>re</code></td><td>正規表示式</td><td>找出符合格式的文字，例如 Email、電話</td></tr>
</table>
<pre class="py">from datetime import datetime, timedelta

now = datetime(2026, 10, 17, 14, 30)        # 示範用固定時間；實務用 datetime.now()
print(now.strftime('%Y-%m-%d %H:%M'))       # 日期 → 字串
due = now + timedelta(days=30)
print('30 天後：', due.strftime('%Y/%m/%d'), '星期', '一二三四五六日'[due.weekday()])
d = datetime.strptime('2026-12-25', '%Y-%m-%d')   # 字串 → 日期
print('距離聖誕節還有', (d - now).days, '天')
print('民國', now.year - 1911, '年')</pre>
<pre class="py">import random
members = ['小明', '小華', '小美', '小強', '小芳']
random.seed(42)                      # 固定亂數，讓結果可重現（示範用）
print('抽獎：', random.choice(members))
print('抽 3 位：', random.sample(members, 3))
random.shuffle(members)
print('分組順序：', members)</pre>
<pre class="py">import re
text = '聯絡：ming@example.com，電話 0912-345-678 或 02-2345-6789'
print(re.findall(r'[\\w.]+@[\\w.]+', text))
print(re.findall(r'09\\d{2}-?\\d{3}-?\\d{3}', text))</pre>` },
    { id: 'own', title: '自己寫模組與 __name__', html: `
<p>任何 .py 檔都可以當模組。假設資料夾中有兩個檔案：</p>
<pre class="out"># tools.py
TAX = 0.05

def with_tax(price):
    return round(price * (1 + TAX))

if __name__ == '__main__':
    # 直接執行 python tools.py 時才會跑；被 import 時不會跑
    print('測試：', with_tax(100))</pre>
<pre class="out"># main.py
import tools
print(tools.with_tax(1000))     # 1050</pre>
<div class="box exam"><b class="t">__name__ 的意義</b>直接執行某個檔案時，它的 <code>__name__</code> 是 <code>'__main__'</code>；被別人 import 時，<code>__name__</code> 是模組名稱。所以 <code>if __name__ == '__main__':</code> 底下適合放測試或程式進入點。</div>
<pre class="py">print(__name__)      # 直接執行時是 __main__</pre>` },
    { id: 'pip', title: 'pip 與虛擬環境', html: `
<p>標準函式庫以外的<b>第三方套件</b>（例如 pandas、requests）要用 <code>pip</code> 安裝，來源是 <a href="https://pypi.org/" target="_blank" rel="noopener">PyPI</a>。</p>
<pre class="out"># 1. 在專案資料夾建立虛擬環境（只要做一次）
python -m venv .venv

# 2. 啟用虛擬環境
.venv\\Scripts\\activate          # Windows
source .venv/bin/activate       # macOS／Linux
# 命令列前面出現 (.venv) 代表成功

# 3. 安裝套件
pip install requests pandas

# 4. 把套件清單存起來，別人可以一次安裝
pip freeze &gt; requirements.txt
pip install -r requirements.txt</pre>
<div class="box tip"><b class="t">為什麼要虛擬環境</b>每個專案需要的套件與版本可能不同。虛擬環境讓每個專案有自己獨立的套件，不會互相影響，也不會弄亂系統的 Python。VS Code 會自動偵測 .venv 並詢問是否使用。</div>
<table>
<tr><th>常用套件</th><th>用途</th><th>實戰課章節</th></tr>
<tr><td><code>openpyxl</code></td><td>讀寫 Excel</td><td>第 2 章</td></tr>
<tr><td><code>requests</code></td><td>呼叫網路 API</td><td>第 4 章</td></tr>
<tr><td><code>beautifulsoup4</code></td><td>解析網頁</td><td>第 5 章</td></tr>
<tr><td><code>pandas</code></td><td>資料分析</td><td>第 7～8 章</td></tr>
<tr><td><code>matplotlib</code></td><td>畫圖表</td><td>第 9 章</td></tr>
</table>
<h3>動手做：自動以日期命名檔案</h3>
<pre class="py">from datetime import date
from pathlib import Path

today = date(2026, 10, 17)                  # 實務用 date.today()
folder = Path('backup')
folder.mkdir(exist_ok=True)
name = folder / f'report_{today:%Y%m%d}.txt'
name.write_text('今日報告內容', encoding='utf-8')
print('已建立：', name)
print(sorted(p.name for p in folder.iterdir()))</pre>` }
  ],
  keypoints: [
    'import 模組、from 模組 import 名稱、import 模組 as 別名',
    '標準函式庫不用安裝：datetime、random、math、pathlib、json、csv、re',
    'strftime 日期轉字串、strptime 字串轉日期、timedelta 做日期加減',
    '不要把自己的檔案取名成標準模組的名字',
    'if __name__ == "__main__": 底下的程式只在直接執行時跑',
    'python -m venv .venv 建立虛擬環境，啟用後再 pip install',
    'pip freeze > requirements.txt 記錄套件清單'
  ]
},
{
  id: 'c12', subject: 2, minutes: 45,
  title: '物件導向入門',
  summary: '類別與物件的概念、__init__ 與 self、方法與屬性、__str__、繼承與覆寫，以及什麼時候該用類別，完成簡易銀行帳戶。',
  sections: [
    { id: 'concept', title: '類別與物件', html: `
<p><b>物件導向（Object-Oriented Programming, OOP）</b>把「資料」和「操作這些資料的函式」包在一起。你其實一直在用物件：字串有 <code>upper()</code>、串列有 <code>append()</code>，這些都是物件的<b>方法</b>。</p>
<div class="concepts">
  <div class="concept"><b>類別 Class</b><span>設計圖，定義這類東西有哪些資料與功能。例如「飲料」。</span></div>
  <div class="concept"><b>物件 Object（實例 Instance）</b><span>依照設計圖做出來的實體。例如「一杯大杯微糖珍奶」。</span></div>
  <div class="concept"><b>屬性 Attribute</b><span>物件的資料，例如品名、甜度、價格。</span></div>
  <div class="concept"><b>方法 Method</b><span>物件的功能，也就是寫在類別裡的函式，例如「計算價格」。</span></div>
</div>
<pre class="py">class Drink:
    def __init__(self, name, price, sugar='正常'):   # 建立物件時自動執行
        self.name = name          # self 代表「這個物件自己」
        self.price = price
        self.sugar = sugar

    def describe(self):
        return f'{self.name}（{self.sugar}）{self.price} 元'

a = Drink('珍奶', 60, '微糖')
b = Drink('紅茶', 30)
print(a.describe())
print(b.describe())
print(a.name, b.price)       # 用 物件.屬性 存取資料</pre>
<div class="box exam"><b class="t">self 是什麼</b>類別中每個方法的第一個參數都是 <code>self</code>，代表呼叫這個方法的物件。呼叫 <code>a.describe()</code> 時，Python 會自動把 a 傳給 self，所以不用自己寫。</div>` },
    { id: 'bank', title: '動手做：銀行帳戶', html: `
<pre class="py">class Account:
    bank = 'Python 銀行'                      # 類別屬性：所有帳戶共用

    def __init__(self, owner, balance=0):
        self.owner = owner                    # 實例屬性：每個帳戶各自的資料
        self.balance = balance
        self.history = []

    def deposit(self, amount):
        if amount &lt;= 0:
            raise ValueError('存款金額必須大於 0')
        self.balance += amount
        self.history.append(('存款', amount))

    def withdraw(self, amount):
        if amount &gt; self.balance:
            raise ValueError('餘額不足')
        self.balance -= amount
        self.history.append(('提款', amount))

    def __str__(self):                        # print(物件) 時顯示的文字
        return f'{self.bank}｜{self.owner}｜餘額 {self.balance:,} 元'

acc = Account('小明', 1000)
acc.deposit(5000)
acc.withdraw(1200)
print(acc)
print(acc.history)
try:
    acc.withdraw(99999)
except ValueError as e:
    print('交易失敗：', e)</pre>
<div class="box tip"><b class="t">封裝的好處</b>餘額只能透過 deposit 和 withdraw 改變，而這兩個方法會檢查金額是否合理，資料就不容易被改錯。Python 慣例會把「不希望外部直接修改」的屬性名稱加底線，例如 <code>self._balance</code>。</div>
<div class="box memo"><b class="t">動手做</b>加一個 <code>transfer(self, other, amount)</code> 方法，把錢轉到另一個帳戶物件，兩邊的 history 都要記錄。</div>` },
    { id: 'inherit', title: '繼承', html: `
<p><b>繼承（Inheritance）</b>讓新類別沿用既有類別的功能，再加上或修改自己的部分。</p>
<pre class="py">class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def withdraw(self, amount):
        if amount &gt; self.balance:
            raise ValueError('餘額不足')
        self.balance -= amount

class SavingsAccount(Account):                # 繼承 Account
    def __init__(self, owner, balance=0, rate=0.015):
        super().__init__(owner, balance)       # 先執行父類別的 __init__
        self.rate = rate

    def add_interest(self):                    # 新增的方法
        self.balance = round(self.balance * (1 + self.rate))

    def withdraw(self, amount):                # 覆寫父類別的方法
        if amount &gt; 50000:
            raise ValueError('定存帳戶單筆提款上限 5 萬元')
        super().withdraw(amount)               # 其餘沿用父類別的檢查

s = SavingsAccount('小美', 100000)
s.add_interest()
s.withdraw(20000)
print(s.owner, s.balance, isinstance(s, Account))</pre>` },
    { id: 'when', title: '什麼時候該用類別', html: `
<table>
<tr><th>情況</th><th>建議</th></tr>
<tr><td>簡單的計算、一次性的腳本</td><td>用函式就好</td></tr>
<tr><td>資料和操作緊密相關，例如帳戶與存提款</td><td>適合用類別</td></tr>
<tr><td>需要建立很多個同類型、各自有狀態的東西</td><td>適合用類別</td></tr>
<tr><td>只是要把幾個欄位包在一起</td><td>可用 <code>dataclass</code></td></tr>
</table>
<pre class="py">from dataclasses import dataclass

@dataclass
class Product:
    name: str
    price: int
    stock: int = 0

    def value(self):
        return self.price * self.stock

items = [Product('滑鼠', 590, 12), Product('鍵盤', 1290, 5)]
for p in items:
    print(p, p.value())
print(sum(p.value() for p in items))</pre>
<div class="box tip"><b class="t">學到這裡</b>你已經學會 Python 的核心語法。實務上，你會大量「使用」別人寫好的類別，例如 pandas 的 DataFrame、pathlib 的 Path、requests 的 Response，看得懂物件與方法就非常夠用。接下來可以進入「Python 實戰」，把這些能力用在真實工作上。</div>` }
  ],
  keypoints: [
    '類別是設計圖，物件是依設計圖建立的實體',
    '__init__ 在建立物件時自動執行，用來設定初始屬性',
    'self 代表物件本身，是每個方法的第一個參數',
    '實例屬性每個物件各自擁有；類別屬性所有物件共用',
    '__str__ 定義 print(物件) 時顯示的文字',
    '繼承用 class 子類別(父類別)；super() 呼叫父類別的方法；同名方法會覆寫',
    'dataclass 可快速建立以資料為主的類別'
  ]
}
);
