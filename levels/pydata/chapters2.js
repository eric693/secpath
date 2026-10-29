/* Python 資料分析 進階篇：合併、視覺化、時間序列、統計與實戰
   <pre class="py"> 為可在網頁上執行的 Python；<pre class="out"> 為一般程式碼、指令或輸出示意
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 50,
  title: '合併與重塑',
  summary: '用 merge 合併兩個表（inner、left、outer）、處理鍵值與重複、indicator 檢查合併結果、用 concat 上下串接、用 melt 與 pivot 在寬表與長表之間轉換。',
  sections: [
    { id: 'merge', title: 'merge：依鍵值合併', html: `
<p>訂單只有 customer_id，想知道「金卡會員和一般會員誰花比較多」，就要把 customers.csv 的會員資料合併進來，就像 SQL 的 JOIN 或 Excel 的 XLOOKUP：</p>
<pre class="py">import pandas as pd

sales = pd.read_csv('sales.csv')
customers = pd.read_csv('customers.csv')
sales['amount'] = sales['unit_price'] * sales['qty']

m = sales.merge(customers, on='customer_id', how='inner')     # 只保留兩邊都有的（會員訂單）
print(len(sales), len(m))
print(m[['order_id', 'customer_id', 'level', 'amount']].head(3))
print(m.groupby('level')['amount'].agg(['count', 'mean']).round(1))</pre>
<table>
<tr><th>how</th><th>結果</th><th>對應 SQL</th></tr>
<tr><td><code>inner</code>（預設）</td><td>只保留兩邊都有的鍵</td><td>INNER JOIN</td></tr>
<tr><td><code>left</code></td><td>保留左表全部，右表沒有的填 NaN</td><td>LEFT JOIN</td></tr>
<tr><td><code>right</code></td><td>保留右表全部</td><td>RIGHT JOIN</td></tr>
<tr><td><code>outer</code></td><td>保留兩邊全部</td><td>FULL OUTER JOIN</td></tr>
</table>` },
    { id: 'check', title: '檢查合併結果', html: `
<pre class="py">import pandas as pd

sales = pd.read_csv('sales.csv')
customers = pd.read_csv('customers.csv')

m = sales.merge(customers, on='customer_id', how='left', indicator=True)
print(len(sales), len(m))                    # left 合併：筆數應該和左表相同
print(m['_merge'].value_counts())            # left_only：沒有對應到會員資料的訂單

# 哪些會員從來沒有消費？
active = sales['customer_id'].dropna().unique()
inactive = customers[~customers['customer_id'].isin(active)]
print(len(inactive), '位會員今年沒有消費')</pre>
<div class="box warn"><b class="t">合併後筆數變多？</b>如果右表的鍵有重複（例如同一位會員出現兩次），合併後左表的列會被複製，金額被重複計算。合併前用 <code>customers['customer_id'].is_unique</code> 檢查，或加上 <code>validate='many_to_one'</code> 讓 pandas 在鍵重複時報錯。</div>` },
    { id: 'concat', title: 'concat：上下串接', html: `
<p>各門市各自匯出一份格式相同的檔案時，用 concat 上下串接成一份：</p>
<pre class="py">import pandas as pd

sales = pd.read_csv('sales.csv')
parts = [sales[sales['store'] == s] for s in ['台北', '台中', '高雄']]    # 模擬三份檔案
print([len(p) for p in parts])

allx = pd.concat(parts, ignore_index=True)        # ignore_index 重新編號
print(len(allx), allx.index[-1])

q1 = sales[sales['date'] &lt; '2025-04-01'].assign(quarter='Q1')
q2 = sales[(sales['date'] &gt;= '2025-04-01') &amp; (sales['date'] &lt; '2025-07-01')].assign(quarter='Q2')
h1 = pd.concat([q1, q2])
print(h1['quarter'].value_counts().to_dict())</pre>` },
    { id: 'reshape', title: 'melt 與 pivot：寬表與長表', html: `
<p>人看的報表常是「寬表」（每個月一欄），但分析與畫圖時常需要「長表」（一列一筆觀測值）。<code>melt</code> 把寬變長，<code>pivot</code> 把長變寬：</p>
<pre class="py">import pandas as pd

wide = pd.DataFrame({
    'store': ['台北', '台中'],
    '1月': [9210, 6400],
    '2月': [8850, 7020],
    '3月': [9900, 6610]
})
long = wide.melt(id_vars='store', var_name='month', value_name='amount')
print(long)

back = long.pivot(index='store', columns='month', values='amount')
print(back)</pre>` }
  ],
  keypoints: [
    'merge 依鍵值合併兩個表：how 為 inner（預設）、left、right、outer，對應 SQL 的 JOIN。',
    'left 合併的筆數應等於左表；indicator=True 加上 _merge 欄檢查對應情況。',
    '右表的鍵重複會讓合併後的列被複製；用 is_unique 或 validate 檢查。',
    'isin 搭配 ~ 可以找出「沒有出現在另一個表中」的資料。',
    'concat 上下串接格式相同的表，ignore_index=True 重新編號。',
    'melt 把寬表轉成長表（適合分析與畫圖），pivot 把長表轉成寬表（適合報表）。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 55,
  title: 'matplotlib 視覺化',
  summary: 'matplotlib 的基本結構、折線圖、長條圖、直方圖、散佈圖、用 pandas 直接畫圖、子圖、標題與標籤、中文字型設定，以及如何依目的選擇圖表。',
  sections: [
    { id: 'basic', title: '第一張圖', html: `
<pre class="py">import matplotlib.pyplot as plt

months = ['1月', '2月', '3月', '4月', '5月', '6月']
revenue = [17680, 15900, 19400, 18760, 20120, 21330]

plt.figure(figsize=(7, 3.5))
plt.plot(months, revenue, marker='o')
plt.title('上半年營業額趨勢')
plt.xlabel('月份')
plt.ylabel('營業額（元）')
plt.grid(alpha=0.3)</pre>
<p>每張圖都要有<b>標題</b>、<b>座標軸標籤與單位</b>，讓看的人不用猜。本課程的執行環境已自動設定好中文字型；在自己的電腦上要另外設定：</p>
<pre class="out">import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = ['Microsoft JhengHei']   # Windows：微軟正黑體
# plt.rcParams['font.sans-serif'] = ['PingFang TC']        # macOS：蘋方
plt.rcParams['axes.unicode_minus'] = False                  # 讓負號正常顯示</pre>` },
    { id: 'types', title: '長條圖、直方圖、散佈圖', html: `
<pre class="py">import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('sales.csv')
df['amount'] = df['unit_price'] * df['qty']

fig, axes = plt.subplots(1, 3, figsize=(12, 3.5))      # 1 列 3 欄的子圖

by_product = df.groupby('product')['amount'].sum().sort_values()
axes[0].barh(by_product.index, by_product.values, color='#4c78a8')
axes[0].set_title('各商品營業額')

axes[1].hist(df['amount'], bins=12, color='#f58518', edgecolor='white')
axes[1].set_title('每筆訂單金額分布')
axes[1].set_xlabel('金額（元）')

daily = df.groupby('date').agg(orders=('order_id', 'count'), amount=('amount', 'sum'))
axes[2].scatter(daily['orders'], daily['amount'], alpha=0.5, s=12)
axes[2].set_title('每日訂單數與營業額')
axes[2].set_xlabel('訂單數')

fig.tight_layout()
print(by_product.idxmax(), int(by_product.max()))</pre>
<p>互動練習中的「圖表選擇器」可以依分析目的找到合適的圖表。</p>` },
    { id: 'pandas-plot', title: '用 pandas 直接畫圖', html: `
<p>DataFrame 與 Series 有 <code>.plot()</code> 方法，分組彙總後可以直接畫：</p>
<pre class="py">import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('sales.csv')
df['amount'] = df['unit_price'] * df['qty']
df['month'] = pd.to_datetime(df['date']).dt.month

monthly = df.pivot_table(index='month', columns='store', values='amount', aggfunc='sum')
ax = monthly.plot(figsize=(8, 3.8), marker='o', title='各門市每月營業額')
ax.set_xlabel('月份')
ax.set_ylabel('營業額（元）')
ax.set_xticks(range(1, 13))

share = df.groupby('category')['amount'].sum()
share.plot(kind='bar', figsize=(4, 3), rot=0, title='各類別營業額', color=['#4c78a8', '#f58518', '#54a24b'])
print(monthly.loc[12].idxmax())</pre>` },
    { id: 'choose', title: '選擇合適的圖表', html: `
<table>
<tr><th>想呈現</th><th>圖表</th><th>例子</th></tr>
<tr><td>隨時間的趨勢</td><td>折線圖</td><td>每月營業額</td></tr>
<tr><td>類別之間的比較</td><td>長條圖（類別名稱長時用橫條）</td><td>各商品營業額</td></tr>
<tr><td>數值的分布</td><td>直方圖、箱形圖</td><td>訂單金額分布、找出異常值</td></tr>
<tr><td>兩個數值的關係</td><td>散佈圖</td><td>廣告費與營業額</td></tr>
<tr><td>組成比例</td><td>堆疊長條圖；類別很少時才用圓餅圖</td><td>付款方式佔比</td></tr>
</table>
<div class="box tip"><b class="t">讓圖表一看就懂</b>標題直接寫出結論（「台北門市營業額占 45%」比「營業額比較」更好）；長條圖從 0 開始；類別排序；顏色不要太多，用強調色標出重點；去掉不必要的格線與 3D 效果。</div>` }
  ],
  keypoints: [
    'plt.plot 折線圖、plt.bar／barh 長條圖、plt.hist 直方圖、plt.scatter 散佈圖。',
    '每張圖都要有標題與座標軸標籤（含單位）。',
    'fig, axes = plt.subplots(列, 欄) 建立多張子圖，fig.tight_layout() 調整間距。',
    'DataFrame 與 Series 的 .plot() 可以在分組彙總後直接畫圖。',
    '自己的電腦要設定中文字型：rcParams[\'font.sans-serif\'] 與 axes.unicode_minus。',
    '趨勢用折線、比較用長條、分布用直方圖、關係用散佈圖；標題寫出結論。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 50,
  title: '時間序列分析',
  summary: '把日期設為索引、用 resample 依日、週、月彙總、rolling 移動平均、pct_change 成長率、依星期與月份找出規律，以及期間比較的注意事項。',
  sections: [
    { id: 'resample', title: '日期索引與 resample', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv', parse_dates=['date'])
df['amount'] = df['unit_price'] * df['qty']
ts = df.set_index('date')['amount']                  # 以日期為索引的 Series

daily = ts.resample('D').sum()                       # 每天
monthly = ts.resample('MS').sum()                    # 每月（以月初為標籤）
weekly = ts.resample('W').sum()                      # 每週
print(len(daily), len(weekly), len(monthly))
print(monthly.head(3))
print(monthly.idxmax().strftime('%Y-%m'), monthly.max())
print(ts['2025-03'].sum())                           # 用字串直接取出某個月份</pre>` },
    { id: 'rolling', title: '移動平均與成長率', html: `
<pre class="py">import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('sales.csv', parse_dates=['date'])
df['amount'] = df['unit_price'] * df['qty']
daily = df.set_index('date')['amount'].resample('D').sum()

ma7 = daily.rolling(7).mean()                       # 7 日移動平均：平滑每天的波動
plt.figure(figsize=(9, 3.5))
plt.plot(daily.index, daily.values, alpha=0.3, label='每日')
plt.plot(ma7.index, ma7.values, label='7 日移動平均')
plt.title('每日營業額與 7 日移動平均')
plt.legend()

monthly = df.set_index('date')['amount'].resample('MS').sum()
growth = (monthly.pct_change() * 100).round(1)      # 和上個月相比的成長率（%）
print(growth.head(4))
print('成長最多的月份：', growth.idxmax().month, '月')</pre>` },
    { id: 'pattern', title: '找出週期規律', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv', parse_dates=['date'])
df['amount'] = df['unit_price'] * df['qty']

names = ['一', '二', '三', '四', '五', '六', '日']
by_wd = df.groupby(df['date'].dt.dayofweek)['amount'].sum()
by_wd.index = ['星期' + names[i] for i in by_wd.index]
print(by_wd)

days = pd.Series(pd.date_range('2025-01-01', '2025-12-31')).dt.dayofweek.value_counts().sort_index()
avg = (df.groupby(df['date'].dt.dayofweek)['amount'].sum() / days).round(0)   # 每種星期幾的「平均每天」營業額
print(avg.tolist())
print('週末平均是平日的', round(avg[5:].mean() / avg[:5].mean(), 2), '倍')</pre>
<div class="box exam"><b class="t">比較要公平</b>2025 年有 53 個星期三、52 個其他星期幾；每個月的天數也不同。比較星期或月份時，用「平均每天」比直接用總和更公平；比較今年與去年同月時，也要注意春節等假期落在不同月份。</div>` }
  ],
  keypoints: [
    'read_csv 用 parse_dates 直接把日期欄轉成日期型別；set_index 設為索引。',
    'resample(\'D\'／\'W\'／\'MS\') 依日、週、月彙總；ts[\'2025-03\'] 用字串取出某段期間。',
    'rolling(7).mean() 計算 7 日移動平均，平滑短期波動。',
    'pct_change() 計算與前一期相比的成長率。',
    'dt.dayofweek、dt.month 搭配 groupby 找出週期規律。',
    '比較不同期間時，用平均每天或同期比較，避免天數與假期造成的偏差。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '統計與相關',
  summary: '描述統計與分布、平均數與中位數的差別、四分位數與箱形圖找出異常值、相關係數與散佈圖、用 NumPy 做簡單線性迴歸，以及相關不等於因果與分組比較的注意事項。',
  sections: [
    { id: 'describe', title: '描述統計與分布', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
df['amount'] = df['unit_price'] * df['qty']
a = df['amount']
print(a.mean().round(1), a.median(), a.mode()[0])     # 平均數、中位數、眾數
print(a.std().round(1), a.min(), a.max())
q1, q3 = a.quantile(0.25), a.quantile(0.75)
iqr = q3 - q1
print(q1, q3, iqr)
print('異常值上限：', q3 + 1.5 * iqr, '超過的筆數：', (a &gt; q3 + 1.5 * iqr).sum())</pre>
<table>
<tr><th>指標</th><th>用途</th></tr>
<tr><td>平均數</td><td>整體水準，容易被極端值拉高</td></tr>
<tr><td>中位數</td><td>排序後中間的值，有極端值時比較能代表一般情況（例如薪資、房價）</td></tr>
<tr><td>標準差</td><td>資料的分散程度</td></tr>
<tr><td>四分位距（IQR）</td><td>Q3 − Q1；超過 Q3 + 1.5×IQR 或低於 Q1 − 1.5×IQR 常被視為異常值</td></tr>
</table>` },
    { id: 'corr', title: '相關係數', html: `
<p>相關係數介於 −1 到 1：接近 1 表示一起增加，接近 −1 表示一個增加另一個減少，接近 0 表示沒有線性關係。</p>
<pre class="py">import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('sales.csv', parse_dates=['date'])
df['amount'] = df['unit_price'] * df['qty']
daily = df.groupby('date').agg(orders=('order_id', 'count'), qty=('qty', 'sum'), amount=('amount', 'sum'))
print(daily.corr().round(2))

customers = pd.read_csv('customers.csv')
spend = df.groupby('customer_id')['amount'].sum().rename('spend')
c = customers.set_index('customer_id').join(spend).fillna({'spend': 0})
print('年齡與消費金額的相關係數：', round(c['age'].corr(c['spend']), 3))

plt.figure(figsize=(4.5, 3.5))
plt.scatter(c['age'], c['spend'], alpha=0.6)
plt.title('會員年齡與年度消費')
plt.xlabel('年齡')
plt.ylabel('消費金額（元）')</pre>
<div class="box warn"><b class="t">相關不等於因果</b>冰淇淋銷量和溺水人數高度相關，但原因是「天氣熱」。看到相關性時，要想想是否有共同的原因、因果方向是否相反、或只是巧合。要證明因果，需要實驗設計（例如 A/B 測試）。</div>` },
    { id: 'regression', title: '簡單線性迴歸', html: `
<pre class="py">import numpy as np
import pandas as pd

df = pd.read_csv('sales.csv', parse_dates=['date'])
df['amount'] = df['unit_price'] * df['qty']
daily = df.groupby('date').agg(orders=('order_id', 'count'), amount=('amount', 'sum'))

slope, intercept = np.polyfit(daily['orders'], daily['amount'], 1)     # 一次多項式 = 直線
print(f'營業額 ≈ {slope:.1f} × 訂單數 + {intercept:.1f}')
print('預測 8 筆訂單的營業額：', round(slope * 8 + intercept))
r = daily['orders'].corr(daily['amount'])
print('R² =', round(r ** 2, 3))      # 營業額的變化有多少比例可以由訂單數解釋</pre>
<p>更完整的迴歸分析可以使用 statsmodels（提供 p 值與信賴區間）或 scikit-learn（機器學習）。</p>` },
    { id: 'compare', title: '分組比較', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv')
df['amount'] = df['unit_price'] * df['qty']
df['member'] = df['customer_id'].notna().map({True: '會員', False: '非會員'})

print(df.groupby('member')['amount'].agg(['count', 'mean', 'median', 'std']).round(1))
print(df.groupby('member')['qty'].mean().round(3))</pre>
<p>兩組的平均值有差異時，要問：差異大不大、樣本夠不夠、會不會只是隨機波動？進一步可以用 t 檢定（scipy.stats.ttest_ind）判斷差異是否顯著。</p>` }
  ],
  keypoints: [
    '平均數易受極端值影響；中位數較能代表一般情況；標準差表示分散程度。',
    '四分位距 IQR = Q3 − Q1；超過 Q3 + 1.5×IQR 常被視為異常值。',
    '相關係數介於 −1 到 1，df.corr() 計算所有數值欄位兩兩的相關。',
    '相關不等於因果：可能有共同原因、方向相反或只是巧合。',
    'np.polyfit(x, y, 1) 做簡單線性迴歸，R² 為相關係數的平方。',
    '分組比較要看平均、中位數、樣本數與分散程度，必要時用統計檢定。'
  ]
},
{
  id: 'c11', subject: 2, minutes: 55,
  title: '實戰：銷售分析報告',
  summary: '從問題出發完成一份完整的銷售分析：整理資料、計算關鍵指標、找出趨勢與重點商品、分析會員價值、畫出報告圖表、匯出 Excel，以及撰寫結論與建議。',
  sections: [
    { id: 'question', title: '定義問題與指標', html: `
<p>假設你是這家咖啡店的分析師，老闆想知道：</p>
<ol>
<li>今年的營業額表現如何？哪個月份、哪個門市最好？</li>
<li>哪些商品貢獻最多？有沒有表現不好的商品？</li>
<li>會員的消費有什麼特色？值得加強會員經營嗎？</li>
</ol>
<p>先定義要計算的<b>關鍵指標（KPI）</b>：營業額、訂單數、平均客單價（營業額 ÷ 訂單數）、會員訂單比例、各商品營業額佔比。</p>` },
    { id: 'kpi', title: '整理資料與計算 KPI', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv', parse_dates=['date'])
df['amount'] = df['unit_price'] * df['qty']
df['month'] = df['date'].dt.month
df['member'] = df['customer_id'].notna()

kpi = {
    '營業額': int(df['amount'].sum()),
    '訂單數': len(df),
    '平均客單價': round(df['amount'].mean(), 1),
    '會員訂單比例(%)': round(df['member'].mean() * 100, 1),
    '活躍會員數': df['customer_id'].nunique()
}
for k, v in kpi.items():
    print(f'{k}：{v}')

store = df.groupby('store').agg(營業額=('amount', 'sum'), 訂單數=('order_id', 'count'))
store['客單價'] = (store['營業額'] / store['訂單數']).round(1)
store['佔比(%)'] = (store['營業額'] / store['營業額'].sum() * 100).round(1)
print(store.sort_values('營業額', ascending=False))</pre>` },
    { id: 'insight', title: '找出重點', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv', parse_dates=['date'])
df['amount'] = df['unit_price'] * df['qty']
df['month'] = df['date'].dt.month

monthly = df.groupby('month')['amount'].sum()
print('最佳月份：', monthly.idxmax(), '月', monthly.max(), '／最差月份：', monthly.idxmin(), '月', monthly.min())
h2_vs_h1 = monthly.loc[7:12].sum() / monthly.loc[1:6].sum() - 1
print('下半年比上半年成長', round(h2_vs_h1 * 100, 1), '%')

prod = df.groupby(['category', 'product'])['amount'].sum().sort_values(ascending=False)
print(prod.head(3))
print('營業額最低：', prod.idxmin(), prod.min())

customers = pd.read_csv('customers.csv')
mem = df.dropna(subset=['customer_id']).merge(customers, on='customer_id')
per = mem.groupby(['level', 'customer_id'])['amount'].sum().groupby('level').mean().round(0)
print('平均每位會員年度消費：', per.to_dict())</pre>` },
    { id: 'charts', title: '報告圖表', html: `
<pre class="py">import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('sales.csv', parse_dates=['date'])
df['amount'] = df['unit_price'] * df['qty']
monthly = df.set_index('date')['amount'].resample('MS').sum()
by_product = df.groupby('product')['amount'].sum().sort_values()

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 3.8))
ax1.plot(monthly.index.month, monthly.values / 1000, marker='o', color='#4c78a8')
ax1.set_title('每月營業額：7 月與 12 月是高峰')
ax1.set_xlabel('月份')
ax1.set_ylabel('營業額（千元）')
ax1.set_xticks(range(1, 13))
ax1.grid(alpha=0.3)

colors = ['#c9c9c9'] * (len(by_product) - 3) + ['#f58518'] * 3      # 用強調色標出前三名
ax2.barh(by_product.index, by_product.values / 1000, color=colors)
ax2.set_title('前三名商品貢獻近半營業額')
ax2.set_xlabel('營業額（千元）')
fig.tight_layout()
print('前三名佔比：', round(by_product.tail(3).sum() / by_product.sum() * 100, 1), '%')</pre>` },
    { id: 'export', title: '匯出 Excel 與撰寫結論', html: `
<pre class="py">import pandas as pd

df = pd.read_csv('sales.csv', parse_dates=['date'])
df['amount'] = df['unit_price'] * df['qty']
monthly = df.pivot_table(index=df['date'].dt.month, columns='store', values='amount', aggfunc='sum')
monthly.index.name = '月份'
products = df.groupby('product')['amount'].sum().sort_values(ascending=False).to_frame('營業額')

with pd.ExcelWriter('sales_report.xlsx') as writer:          # 一個檔案多個工作表
    monthly.to_excel(writer, sheet_name='每月門市營業額')
    products.to_excel(writer, sheet_name='商品排行')

check = pd.read_excel('sales_report.xlsx', sheet_name=None)  # 讀回來確認
print({k: v.shape for k, v in check.items()})</pre>
<p>在自己的電腦上執行時，會在資料夾中產生 sales_report.xlsx。分析報告的結論建議包含：</p>
<pre class="out">【結論】
1. 全年營業額 240,140 元，台北門市佔 45%，是主要營收來源。
2. 營業額有明顯季節性：7 月（暑假）與 12 月最高，2 月與 10 月最低。
3. 拿鐵、起司蛋糕、美式咖啡三項商品貢獻近半營業額。

【建議】
1. 2 月與 10 月推出促銷活動拉抬淡季業績；7 月與 12 月提前備貨與排班。
2. 以熱銷商品搭配低銷售商品推出組合優惠。
3. 會員訂單約占六成，可設計回購優惠，提升一般會員升級金卡的比例。

【資料說明】
資料期間 2025/1/1～12/31，共 1,285 筆訂單；非會員訂單無會員資料。</pre>
<div class="box tip"><b class="t">下一步</b>學會 pandas 後，可以繼續學 SQL（從資料庫取資料）、Power BI（互動式儀表板）、seaborn（更美觀的統計圖）、scikit-learn（機器學習預測），也可以找政府資料開放平台或 Kaggle 的公開資料，完成自己的分析作品集。</div>` }
  ],
  keypoints: [
    '分析從問題出發，先定義要計算的 KPI：營業額、訂單數、客單價、佔比等。',
    '用 groupby 與 agg 計算各門市、各月份、各商品的指標，並計算佔比與成長率。',
    'merge 會員資料後可以分析不同等級會員的消費價值。',
    '報告圖表的標題直接寫出結論，用強調色標出重點。',
    'pd.ExcelWriter 可以把多個表輸出到同一個 Excel 檔的不同工作表。',
    '報告要包含結論、可行動的建議，以及資料期間與限制的說明。'
  ]
}
);
