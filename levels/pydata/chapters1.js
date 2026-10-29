/* Python 資料分析 基礎篇：NumPy、DataFrame、篩選、清理與分組
   <pre class="py"> 為可在網頁上執行的 Python；<pre class="out"> 為一般程式碼、指令或輸出示意
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 35,
  title: '資料分析流程與工具',
  summary: '資料分析的六個步驟、NumPy、pandas、matplotlib 各自的角色、Jupyter 與 Google Colab 的使用方式、本課程的範例資料，以及第一次用 pandas 讀取與彙總資料。',
  sections: [
    { id: 'flow', title: '資料分析的流程', html: `
<table>
<tr><th>步驟</th><th>要做的事</th><th>本課程章節</th></tr>
<tr><td>1. 定義問題</td><td>想知道什麼？例如「哪個門市、哪個月份賣最好？會員和非會員有什麼差別？」</td><td>第 11 章</td></tr>
<tr><td>2. 取得資料</td><td>讀取 CSV、Excel、資料庫、API</td><td>第 3 章</td></tr>
<tr><td>3. 清理資料</td><td>缺失值、重複、型別錯誤、格式不一致</td><td>第 5 章</td></tr>
<tr><td>4. 探索與彙總</td><td>篩選、分組、合併、計算指標</td><td>第 4、6、7 章</td></tr>
<tr><td>5. 視覺化</td><td>用圖表找出趨勢與異常，並向別人說明</td><td>第 8、9 章</td></tr>
<tr><td>6. 結論與建議</td><td>回答一開始的問題，提出可行動的建議</td><td>第 10、11 章</td></tr>
</table>
<div class="box tip"><b class="t">實務上最花時間的是清理</b>真實資料常有空白、打錯字、格式混亂，分析師常常花一半以上的時間在整理資料。學會 pandas，就能把在 Excel 中手動處理好幾個小時的工作變成幾行可以重複執行的程式。</div>` },
    { id: 'tools', title: '三個核心套件', html: `
<table>
<tr><th>套件</th><th>用途</th><th>慣用的匯入寫法</th></tr>
<tr><td><b>NumPy</b></td><td>高效率的數值陣列與數學運算，是 pandas 的基礎</td><td><code>import numpy as np</code></td></tr>
<tr><td><b>pandas</b></td><td>表格資料（DataFrame）的讀取、篩選、清理、分組、合併</td><td><code>import pandas as pd</code></td></tr>
<tr><td><b>matplotlib</b></td><td>畫圖：折線圖、長條圖、直方圖、散佈圖</td><td><code>import matplotlib.pyplot as plt</code></td></tr>
</table>
<p>在自己的電腦上，最方便的環境是 <b>Jupyter Notebook</b> 或 <b>Google Colab</b>（瀏覽器開啟就能用，已安裝好這些套件）。本機安裝：</p>
<pre class="out">pip install pandas numpy matplotlib openpyxl jupyter
jupyter notebook</pre>
<p>Jupyter 中，儲存格最後一行的值會自動顯示成漂亮的表格；本課程的網頁執行環境則要用 <code>print()</code> 顯示結果。</p>` },
    { id: 'data', title: '本課程的範例資料', html: `
<p>講義使用一家虛構咖啡店 2025 年的銷售資料，在網頁上的範例中直接寫檔名即可讀取。也可以下載到自己的電腦練習：</p>
<table>
<tr><th>檔案</th><th>內容</th><th>欄位</th></tr>
<tr><td><a href="/static/data/sales.csv" download>sales.csv</a></td><td>1,285 筆訂單</td><td>order_id、date、store（台北／台中／高雄）、category、product、unit_price、qty、customer_id（非會員為空白）、payment</td></tr>
<tr><td><a href="/static/data/customers.csv" download>customers.csv</a></td><td>120 位會員</td><td>customer_id、gender、age、city、join_date、level（一般／金卡）</td></tr>
<tr><td><a href="/static/data/sales_raw.csv" download>sales_raw.csv</a></td><td>42 筆尚未清理的原始資料</td><td>含缺失值、重複、格式不一致（第 5 章使用）</td></tr>
</table>` },
    { id: 'first', title: '第一個分析', html: `
<p>按「執行」，第一次需要下載 Python 環境與 pandas，請稍候 10～30 秒：</p>
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
print(df.shape)              # (列數, 欄數)
print(df.head(3))            # 前 3 筆

df['amount'] = df['unit_price'] * df['qty']      # 新增「金額」欄：整欄一起計算
print('全年營業額：', df['amount'].sum())
print(df.groupby('store')['amount'].sum())       # 各門市營業額</pre>
<p>短短幾行就完成了「讀取 → 計算 → 分組彙總」。接下來幾章會一步一步說明每個語法。</p>` }
  ],
  keypoints: [
    '資料分析六步驟：定義問題、取得資料、清理、探索與彙總、視覺化、結論與建議。',
    '真實資料最花時間的是清理；用程式處理可以重複執行，比手動整理可靠。',
    'NumPy 負責數值陣列、pandas 負責表格資料、matplotlib 負責畫圖。',
    '慣用匯入：import numpy as np、import pandas as pd、import matplotlib.pyplot as plt。',
    'Jupyter Notebook 與 Google Colab 是最常用的分析環境。',
    'pd.read_csv 讀取資料、整欄運算新增欄位、groupby 分組彙總。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: 'NumPy 基礎',
  summary: '為什麼需要 NumPy、建立陣列與常用函式、形狀與維度、索引與切片、向量化運算與廣播、布林索引，以及常用的統計函式與 axis 參數。',
  sections: [
    { id: 'why', title: '陣列與向量化運算', html: `
<p>Python 的串列（list）不能直接做數學運算。NumPy 的<b>陣列（ndarray）</b>可以對整批資料一次計算，稱為<b>向量化</b>，比 for 迴圈快上數十倍：</p>
<pre class="py">import numpy as np

prices = [80, 110, 60, 130]
print(prices * 2)              # 串列：重複兩次，不是乘以 2

arr = np.array(prices)
print(arr * 2)                 # 陣列：每個元素乘以 2
print(arr * 1.05)              # 加 5% 稅
print(arr + np.array([1, 2, 3, 4]))   # 對應位置相加
print(arr.dtype, arr.shape)</pre>
<p>陣列中的元素型別都相同（dtype）。整數陣列在一般電腦上通常是 int64，在本課程的瀏覽器環境中會顯示 int32，計算結果相同。</p>` },
    { id: 'create', title: '建立陣列與形狀', html: `
<pre class="py">import numpy as np

print(np.arange(0, 10, 2))       # 0 到 10（不含），間隔 2
print(np.linspace(0, 1, 5))      # 0 到 1 平均切成 5 個點
print(np.zeros(3), np.ones(3))

m = np.array([[1, 2, 3],
              [4, 5, 6]])        # 二維陣列：2 列 3 欄
print(m.shape, m.ndim, m.size)   # 形狀、維度、元素個數
print(m.reshape(3, 2))           # 改變形狀（元素總數要相同）
print(m.T)                       # 轉置</pre>` },
    { id: 'index', title: '索引、切片與布林索引', html: `
<pre class="py">import numpy as np

a = np.array([12, 7, 25, 3, 18, 9])
print(a[0], a[-1])         # 第一個、最後一個
print(a[1:4])              # 索引 1 到 3（不含 4）
print(a[::2])              # 每隔一個

m = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(m[1, 2])             # 第 1 列第 2 欄 → 6
print(m[:, 0])             # 所有列的第 0 欄
print(m[0:2, 1:])          # 前兩列、從第 1 欄開始

# 布林索引：用條件篩選
print(a &gt; 10)
print(a[a &gt; 10])
print(a[(a &gt; 5) &amp; (a &lt; 20)])   # 多條件用 &amp;、|，每個條件加括號</pre>` },
    { id: 'stats', title: '統計函式與 axis', html: `
<pre class="py">import numpy as np

scores = np.array([[80, 92, 75],     # 每一列是一位學生
                   [68, 85, 90],     # 每一欄是一個科目
                   [95, 70, 88]])
print(scores.sum(), scores.mean())          # 全部的總和與平均
print(scores.mean(axis=0))                  # axis=0：沿著列方向計算 → 每一「欄」的平均（各科平均）
print(scores.mean(axis=1).round(1))         # axis=1：每一「列」的平均（每位學生平均）
print(scores.max(axis=0), scores.argmax(axis=0))   # 各科最高分與是第幾位學生
print(np.median(scores), scores.std().round(2))</pre>
<div class="box exam"><b class="t">axis 怎麼記</b>axis=0 是「把列壓扁」，結果每一欄留下一個值；axis=1 是「把欄壓扁」，結果每一列留下一個值。pandas 的 axis 也是同樣的規則。</div>` },
    { id: 'broadcast', title: '廣播', html: `
<p>形狀不同的陣列做運算時，NumPy 會自動把較小的陣列「延伸」對齊，稱為<b>廣播</b>：</p>
<pre class="py">import numpy as np

qty = np.array([[2, 1, 3],      # 三家門市（列）× 三種商品（欄）的數量
                [1, 4, 0],
                [5, 2, 2]])
price = np.array([80, 110, 60])   # 三種商品的單價：形狀 (3,)

revenue = qty * price             # price 被廣播到每一列
print(revenue)
print(revenue.sum(axis=1))        # 各門市營業額</pre>` }
  ],
  keypoints: [
    'NumPy 陣列支援向量化運算：整批資料一次計算，比 for 迴圈快很多。',
    'np.array、np.arange、np.linspace、np.zeros 建立陣列；shape、ndim、size 查看形狀。',
    '索引與切片 a[1:4] 不含結尾；二維陣列用 m[列, 欄]，: 表示全部。',
    '布林索引 a[a > 10] 篩選元素；多條件用 &、|，每個條件要加括號。',
    'axis=0 對每一欄計算（壓扁列），axis=1 對每一列計算（壓扁欄）。',
    '廣播讓不同形狀的陣列自動對齊運算，例如數量矩陣乘以單價陣列。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 55,
  title: 'pandas：Series 與 DataFrame',
  summary: 'Series 與 DataFrame 的結構、讀取 CSV 與 Excel、用 head、info、describe 了解資料、選取欄位、用 loc 與 iloc 選取列與欄、新增與刪除欄位、排序與重設索引。',
  sections: [
    { id: 'struct', title: 'Series 與 DataFrame', html: `
<p><b>Series</b> 是一欄有索引（標籤）的資料；<b>DataFrame</b> 是很多個 Series 組成的表格，就像 Excel 的工作表：</p>
<pre class="py">import pandas as pd

s = pd.Series([120, 95, 180], index=['台北', '台中', '高雄'], name='營業額')
print(s)
print(s['台中'], s.max(), s.idxmax())

df = pd.DataFrame({
    'product': ['美式咖啡', '拿鐵', '布朗尼'],
    'price': [80, 110, 90],
    'qty': [3, 2, 5]
})
df['amount'] = df['price'] * df['qty']
print(df)
print(df.columns.tolist(), df.shape)</pre>` },
    { id: 'read', title: '讀取資料並了解資料', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
print(df.head())            # 前 5 筆（tail() 看最後 5 筆）
df.info()                   # 欄位名稱、非空值數量、型別</pre>
<p>注意 customer_id 的非空值少於總筆數，代表有缺失值（非會員）；date 的型別是 object（字串），之後要轉成日期。接著看數值欄位的統計摘要：</p>
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
print(df.describe())                          # 數值欄位的統計摘要
print(df['store'].value_counts())             # 各門市的訂單數
print(df['product'].nunique(), '種商品')</pre>
<table>
<tr><th>讀取其他格式</th><th>語法</th></tr>
<tr><td>Excel</td><td><code>pd.read_excel('報表.xlsx', sheet_name='工作表1')</code>（需要 openpyxl）</td></tr>
<tr><td>指定編碼（Excel 存的 CSV 常是 Big5）</td><td><code>pd.read_csv('a.csv', encoding='big5')</code></td></tr>
<tr><td>只讀某些欄、指定日期欄</td><td><code>pd.read_csv('a.csv', usecols=['date', 'qty'], parse_dates=['date'])</code></td></tr>
<tr><td>JSON、網頁表格、資料庫</td><td><code>pd.read_json</code>、<code>pd.read_html</code>、<code>pd.read_sql</code></td></tr>
</table>` },
    { id: 'select', title: '選取欄位與列：[]、loc、iloc', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
print(df['product'].head(3))                   # 一欄 → Series
print(df[['date', 'product', 'qty']].head(3))  # 多欄（注意兩層中括號）→ DataFrame

# loc：用「標籤」選取（列索引, 欄名稱），切片包含結尾
print(df.loc[0, 'product'])
print(df.loc[0:2, ['store', 'qty']])           # 列 0、1、2

# iloc：用「位置」選取，切片不含結尾
print(df.iloc[0, 4])                           # 第 0 列第 4 欄
print(df.iloc[0:2, 0:3])                       # 列 0、1，欄 0～2</pre>
<table>
<tr><th>寫法</th><th>依據</th><th>切片是否包含結尾</th></tr>
<tr><td><code>df.loc[列標籤, 欄名稱]</code></td><td>標籤</td><td>包含</td></tr>
<tr><td><code>df.iloc[列位置, 欄位置]</code></td><td>位置（從 0 開始）</td><td>不包含</td></tr>
</table>
<p>互動練習中的「DataFrame 選取練習」可以試試各種寫法會選到哪些儲存格。</p>` },
    { id: 'modify', title: '新增、刪除、排序', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
df['amount'] = df['unit_price'] * df['qty']              # 新增欄位
df['is_member'] = df['customer_id'].notna()              # 是否為會員
df = df.drop(columns=['payment'])                         # 刪除欄位
df = df.rename(columns={'qty': 'quantity'})               # 改欄名

top = df.sort_values('amount', ascending=False).head(3)   # 依金額由大到小
print(top[['order_id', 'product', 'quantity', 'amount']])
print(top.reset_index(drop=True).index.tolist())          # 重設索引為 0, 1, 2
print(df['is_member'].mean().round(3))                    # True 視為 1：會員訂單比例</pre>
<div class="box warn"><b class="t">大部分方法會回傳新的 DataFrame</b><code>sort_values</code>、<code>drop</code>、<code>rename</code> 不會修改原本的 df，要把結果指定回去（<code>df = df.drop(...)</code>）。舊教學常用的 <code>inplace=True</code> 不建議使用。</div>` }
  ],
  keypoints: [
    'Series 是有索引的一欄資料；DataFrame 是多個 Series 組成的表格。',
    'pd.read_csv 讀取 CSV（Big5 編碼加 encoding=\'big5\'）；read_excel 讀取 Excel。',
    'head、info、describe、value_counts、nunique 是拿到資料後先做的檢查。',
    'df[\'欄\'] 得到 Series、df[[\'a\', \'b\']] 得到 DataFrame。',
    'loc 依標籤選取且切片包含結尾；iloc 依位置選取且切片不含結尾。',
    'sort_values、drop、rename 回傳新的 DataFrame，要指定回變數。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 50,
  title: '篩選與轉換',
  summary: '用布林條件篩選列、多條件與 isin、between、query、字串欄位的 str 方法、日期欄位的轉換與 dt 屬性、用 map、apply 與 np.where 建立新欄位，以及 cut 分組。',
  sections: [
    { id: 'filter', title: '條件篩選', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
big = df[df['qty'] &gt;= 4]                                       # 單一條件
print(len(big))

taipei_coffee = df[(df['store'] == '台北') &amp; (df['category'] == '咖啡')]   # 多條件：&amp; 且、| 或
print(len(taipei_coffee))

print(len(df[df['product'].isin(['拿鐵', '抹茶拿鐵'])]))          # 是否在清單中
print(len(df[df['unit_price'].between(80, 110)]))              # 介於（含兩端）
print(len(df[~df['customer_id'].isna()]))                      # ~ 是「不是」：會員訂單
print(len(df.query('store == "高雄" and qty &gt; 2')))             # query 用字串寫條件</pre>
<div class="box warn"><b class="t">常見錯誤</b>多條件要用 <code>&amp;</code>、<code>|</code> 而不是 and、or，而且每個條件都要加括號，否則會出現「The truth value of a Series is ambiguous」錯誤。</div>` },
    { id: 'str', title: '字串欄位：str 方法', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
print(df[df['product'].str.contains('拿鐵')]['product'].unique())
print(df['product'].str.len().max())
print(df['customer_id'].str[1:].dropna().astype(int).max())     # 取出會員編號的數字部分

names = pd.Series(['  王小明 ', 'LEE, ANNA', 'chen-ming'])
print(names.str.strip().tolist())
print(names.str.lower().str.replace('-', ' ').tolist())
print(names.str.split(',').str[0].tolist())</pre>` },
    { id: 'date', title: '日期欄位', html: `
<p>從 CSV 讀進來的日期是字串，要先用 <code>pd.to_datetime</code> 轉成日期型別，才能取出年、月、星期或計算天數：</p>
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
df['date'] = pd.to_datetime(df['date'])
print(df['date'].dtype)
df['month'] = df['date'].dt.month
df['weekday'] = df['date'].dt.dayofweek          # 星期一 = 0、星期日 = 6
df['is_weekend'] = df['weekday'] &gt;= 5
print(df[['date', 'month', 'weekday', 'is_weekend']].head(3))
print(df['date'].min(), df['date'].max())
print((df['date'].max() - df['date'].min()).days, '天')
print(len(df[df['date'] &gt;= '2025-12-01']), '筆 12 月訂單')</pre>` },
    { id: 'derive', title: '建立新欄位：map、apply、np.where、cut', html: `
<pre class="py">import pandas as pd
import numpy as np

df = pd.read_csv('sales.csv')
df['amount'] = df['unit_price'] * df['qty']

# map：用字典對應
df['region'] = df['store'].map({'台北': '北部', '台中': '中部', '高雄': '南部'})

# np.where：二選一
df['size'] = np.where(df['amount'] &gt;= 200, '大單', '小單')

# apply：套用自訂函式（較慢，能用向量化時優先用向量化）
def level(a):
    return '高' if a &gt;= 300 else '中' if a &gt;= 150 else '低'
df['level'] = df['amount'].apply(level)

# cut：把數值切成區間
df['band'] = pd.cut(df['amount'], bins=[0, 100, 200, 600], labels=['100以下', '101-200', '200以上'])

print(df[['store', 'region', 'amount', 'size', 'level', 'band']].head(4))
print(df['band'].value_counts().sort_index())</pre>` }
  ],
  keypoints: [
    'df[條件] 篩選列；多條件用 &、|、~，每個條件都要加括號。',
    'isin 判斷是否在清單中、between 判斷區間（含兩端）、query 以字串寫條件。',
    '字串欄位用 .str 方法：contains、strip、lower、replace、split、len。',
    '日期要先用 pd.to_datetime 轉換，再用 .dt.month、.dt.dayofweek 等取出資訊；日期相減得到天數。',
    'map 依字典對應、np.where 二選一、apply 套用自訂函式（較慢）、cut 切成區間。',
    '能用向量化運算時優先使用，apply 與迴圈留給無法向量化的情況。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 55,
  title: '資料清理',
  summary: '找出與處理缺失值、移除重複資料、修正資料型別、統一文字格式、處理異常值、統一日期格式，以及建立可重複執行的清理流程。',
  sections: [
    { id: 'check', title: '先檢查有哪些問題', html: `
<p>sales_raw.csv 是一份從各門市彙整、還沒清理的資料。先全面檢查：</p>
<pre class="py">import pandas as pd

raw = pd.read_csv('sales_raw.csv')
print(raw.shape)
print(raw.isna().sum())                    # 每一欄的缺失值數量
print(raw.duplicated().sum(), '筆完全重複')
print(raw['store'].value_counts(dropna=False))
print(raw.dtypes)</pre>
<p>可以看到：qty 與 store 有缺失值、有完全重複的列、門市名稱有「台北 」（多了空白）和「臺北」兩種寫法、unit_price 因為混入「NT$110」變成了字串（object）。</p>` },
    { id: 'missing', title: '處理缺失值', html: `
<pre class="py">import pandas as pd

raw = pd.read_csv('sales_raw.csv')
print(raw[raw['qty'].isna()][['order_id', 'product', 'qty']])

a = raw.dropna()                              # 刪除任何欄位有缺失值的列
b = raw.dropna(subset=['qty'])                # 只看 qty 欄
c = raw.fillna({'qty': raw['qty'].median(), 'store': '未知'})   # 用中位數與「未知」補值
print(len(raw), len(a), len(b), c['qty'].isna().sum(), c['store'].isna().sum())</pre>
<table>
<tr><th>做法</th><th>適合的情況</th></tr>
<tr><td>刪除（dropna）</td><td>缺失的比例很低，或這筆資料沒有它就沒有意義</td></tr>
<tr><td>補固定值（fillna）</td><td>類別欄位補「未知」，或數量缺失代表 0</td></tr>
<tr><td>補平均數／中位數</td><td>數值欄位；有極端值時中位數比平均數穩定</td></tr>
<tr><td>保留並標記</td><td>缺失本身有意義，例如 customer_id 空白代表非會員</td></tr>
</table>
<p>互動練習中的「缺失值處理比較」可以比較各種做法對平均值的影響。</p>` },
    { id: 'dup', title: '重複資料與文字格式', html: `
<pre class="py">import pandas as pd

raw = pd.read_csv('sales_raw.csv')
print(raw[raw.duplicated(keep=False)][['order_id', 'product']])   # 列出所有重複的列
df = raw.drop_duplicates()
print(len(raw), '→', len(df))
print(df['order_id'].duplicated().sum(), '個重複的訂單編號')

# 統一門市名稱：去除空白、統一「臺」為「台」
df['store'] = df['store'].str.strip().str.replace('臺', '台')
print(df['store'].value_counts(dropna=False).to_dict())</pre>` },
    { id: 'type', title: '修正型別與異常值', html: `
<pre class="py">import pandas as pd

raw = pd.read_csv('sales_raw.csv')
print(raw['unit_price'].unique()[:6])

# 去除「NT$」後轉成數字；errors='coerce' 會把無法轉換的值變成 NaN
raw['unit_price'] = pd.to_numeric(raw['unit_price'].astype(str).str.replace('NT$', '', regex=False), errors='coerce')
print(raw['unit_price'].dtype, raw['unit_price'].isna().sum())

# 統一日期格式：format='mixed' 讓每個值各自判斷格式
raw['date'] = pd.to_datetime(raw['date'], format='mixed')
print(raw['date'].dt.strftime('%Y-%m-%d').iloc[12])

# 找出異常值：數量 300 明顯不合理
print(raw['qty'].describe()[['mean', '50%', 'max']])
print(raw[raw['qty'] &gt; 20][['order_id', 'product', 'qty']])</pre>
<div class="box exam"><b class="t">異常值要先確認再處理</b>數量 300 可能是打錯字（3），也可能是企業大量訂購。先和資料來源確認；無法確認時，可以排除後另外列出，並在報告中說明，而不是直接刪掉不提。</div>` },
    { id: 'pipeline', title: '可重複執行的清理流程', html: `
<p>把清理步驟寫成函式，下個月拿到新資料時再執行一次即可，也方便別人檢查你做了哪些處理：</p>
<pre class="py">import pandas as pd

def clean_sales(path):
    df = pd.read_csv(path)
    df = df.drop_duplicates()
    df['store'] = df['store'].str.strip().str.replace('臺', '台').fillna('未知')
    df['unit_price'] = pd.to_numeric(df['unit_price'].astype(str).str.replace('NT$', '', regex=False), errors='coerce')
    df['date'] = pd.to_datetime(df['date'], format='mixed')
    df = df.dropna(subset=['qty'])
    df = df[df['qty'] &lt;= 20].copy()          # 排除待確認的異常值
    df['qty'] = df['qty'].astype(int)
    df['amount'] = df['unit_price'] * df['qty']
    return df.reset_index(drop=True)

clean = clean_sales('sales_raw.csv')
print(clean.shape)
print(clean.dtypes.to_dict())
print(clean['store'].value_counts().to_dict())</pre>` }
  ],
  keypoints: [
    '先檢查：isna().sum() 看缺失值、duplicated().sum() 看重複、value_counts 看類別、dtypes 看型別。',
    '缺失值可以刪除（dropna）、補值（fillna 固定值、平均數或中位數）或保留並標記，依情況選擇。',
    'drop_duplicates 移除完全重複的列；duplicated(subset=…) 檢查特定欄位是否重複。',
    '文字用 str.strip、str.replace 統一格式；數字用 pd.to_numeric(errors=\'coerce\') 轉換。',
    '日期用 pd.to_datetime 統一格式；異常值要先確認再處理，並在報告中說明。',
    '把清理步驟寫成函式，讓流程可以重複執行與檢查。'
  ]
},
{
  id: 'c06', subject: 1, minutes: 55,
  title: '分組與彙總',
  summary: 'groupby 的分割、套用、合併概念、單一與多重彙總、agg 命名彙總、多欄分組、樞紐分析表 pivot_table、交叉表 crosstab，以及排名與佔比計算。',
  sections: [
    { id: 'groupby', title: 'groupby：分割、套用、合併', html: `
<p>「各門市的營業額」「各月份的訂單數」這類問題，都是先依某個欄位<b>分組</b>，再對每一組<b>計算</b>，最後<b>組合</b>成結果：</p>
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
df['amount'] = df['unit_price'] * df['qty']

print(df.groupby('store')['amount'].sum())
print(df.groupby('category')['qty'].mean().round(2))
print(df.groupby('store').size())                     # 每組的筆數
print(df.groupby('product')['amount'].sum().sort_values(ascending=False).head(3))</pre>
<p>互動練習中的「groupby 分組視覺化」可以看到資料如何被分組、計算、組合。</p>` },
    { id: 'agg', title: '多重彙總與 agg', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
df['amount'] = df['unit_price'] * df['qty']

summary = df.groupby('store').agg(
    訂單數=('order_id', 'count'),
    營業額=('amount', 'sum'),
    平均客單=('amount', 'mean'),
    最大單=('amount', 'max')
).round(1)
print(summary)

# 多欄分組
by2 = df.groupby(['store', 'category'])['amount'].sum()
print(by2.head(4))
print(by2.unstack())          # 把內層索引轉成欄，變成二維表格</pre>
<table>
<tr><th>常用彙總函式</th><th>意義</th></tr>
<tr><td>sum、mean、median</td><td>總和、平均、中位數</td></tr>
<tr><td>count、size</td><td>非空值數量、總筆數（含空值）</td></tr>
<tr><td>min、max、std</td><td>最小、最大、標準差</td></tr>
<tr><td>nunique</td><td>不重複值的數量（例如不重複的會員數）</td></tr>
</table>` },
    { id: 'pivot', title: '樞紐分析表與交叉表', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
df['amount'] = df['unit_price'] * df['qty']
df['month'] = pd.to_datetime(df['date']).dt.month

pt = df.pivot_table(index='store', columns='category', values='amount', aggfunc='sum', margins=True, margins_name='合計')
print(pt)

q = df[df['month'] &lt;= 3].pivot_table(index='month', columns='store', values='qty', aggfunc='sum')
print(q)

ct = pd.crosstab(df['store'], df['payment'], normalize='index').round(3)   # 各門市付款方式的比例
print(ct)</pre>
<p><code>pivot_table</code> 就是 Excel 的樞紐分析表：index 是列、columns 是欄、values 是要計算的值、aggfunc 是計算方式。</p>` },
    { id: 'share', title: '佔比、排名與 transform', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
df['amount'] = df['unit_price'] * df['qty']

by_product = df.groupby('product')['amount'].sum().sort_values(ascending=False)
share = (by_product / by_product.sum() * 100).round(1)
print(share.head(3))
print(share.cumsum().head(3))               # 累計佔比：前三名商品佔了多少

# transform：把分組結果「貼回」每一列，例如每筆訂單佔該門市營業額的比例
df['store_total'] = df.groupby('store')['amount'].transform('sum')
df['pct_of_store'] = (df['amount'] / df['store_total'] * 100).round(3)
print(df[['store', 'amount', 'store_total', 'pct_of_store']].head(3))

# 各門市內商品排名
rank = df.groupby(['store', 'product'])['amount'].sum().groupby('store').rank(ascending=False)
print(rank.loc['台北'].sort_values().head(3))</pre>` }
  ],
  keypoints: [
    'groupby 是分割、套用、合併：df.groupby(\'store\')[\'amount\'].sum()。',
    'size 計算每組筆數；sort_values 搭配 head 找出前幾名。',
    'agg 可以一次做多種彙總並命名：agg(營業額=(\'amount\', \'sum\'))。',
    '多欄分組產生多層索引，unstack 轉成二維表格。',
    'pivot_table 就是樞紐分析表（index、columns、values、aggfunc、margins）；crosstab 計算交叉次數或比例。',
    '佔比用除以總和；transform 把分組結果貼回每一列；rank 計算排名。'
  ]
}
);
