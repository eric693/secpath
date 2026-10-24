/* Python 實戰 分析篇：資料分析、AI 與作品集 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 55,
  title: 'pandas 基礎',
  summary: 'DataFrame 與 Series、讀取 CSV 與 Excel、快速檢視資料、選取欄位與篩選列、新增欄位、排序，以及缺值、重複值與型別的資料清理。',
  sections: [
    { id: 'intro', title: '認識 DataFrame', html: `
<p><b>pandas</b> 是 Python 資料分析最重要的套件，可以把它想成「用程式操作的 Excel」，但能處理數百萬列資料，而且每個步驟都能重複執行。</p>
<div class="concepts">
  <div class="concept"><b>DataFrame</b><span>二維表格，有列（row）與欄（column），就像一張工作表。</span></div>
  <div class="concept"><b>Series</b><span>一維資料，DataFrame 的一欄就是一個 Series。</span></div>
  <div class="concept"><b>索引 Index</b><span>每一列的標籤，預設是 0、1、2……</span></div>
</div>
<pre class="py">import pandas as pd

df = pd.DataFrame({
    '分店': ['台北', '台中', '高雄', '台北', '台中'],
    '月份': ['2026-08', '2026-08', '2026-08', '2026-09', '2026-09'],
    '營業額': [1250000, 860000, 990000, 1310000, 905000],
    '來客數': [8200, 6100, 7000, 8650, 6400],
})
print(df)
print(type(df['營業額']))
print(df['營業額'].sum(), df['營業額'].mean())</pre>` },
    { id: 'read', title: '讀取資料與快速檢視', html: `
<pre class="out"># 在自己的電腦讀取檔案
df = pd.read_csv('sales.csv', encoding='utf-8-sig')   # Big5 檔案用 encoding='cp950'
df = pd.read_excel('sales.xlsx', sheet_name='明細')    # 需要 pip install openpyxl
df.to_csv('result.csv', index=False, encoding='utf-8-sig')
df.to_excel('result.xlsx', index=False)</pre>
<pre class="py">import pandas as pd
from io import StringIO

csv_text = '''訂單日期,分店,品項,單價,數量
2026-09-01,台北,珍奶,60,120
2026-09-01,台中,紅茶,30,85
2026-09-02,台北,拿鐵,85,64
2026-09-02,高雄,珍奶,60,
2026-09-03,台中,珍奶,60,98
2026-09-03,台中,珍奶,60,98
2026-09-04,高雄,拿鐵,85,47'''
df = pd.read_csv(StringIO(csv_text))       # 用字串模擬 CSV 檔案

print(df.head(3))          # 前 3 列
print(df.shape)            # (列數, 欄數)
df.info()                  # 欄位型別與非空值數量
print(df.describe())       # 數值欄位的統計摘要</pre>
<div class="box tip"><b class="t">拿到新資料的起手式</b><code>head()</code> 看長相、<code>shape</code> 看大小、<code>info()</code> 看型別與缺值、<code>describe()</code> 看數值分布。這四個指令先跑一遍，能避免很多後續錯誤。</div>` },
    { id: 'select', title: '選取與篩選', html: `
<pre class="py">import pandas as pd
df = pd.DataFrame({
    '分店': ['台北', '台中', '高雄', '台北', '台中', '高雄'],
    '品項': ['珍奶', '紅茶', '珍奶', '拿鐵', '珍奶', '拿鐵'],
    '單價': [60, 30, 60, 85, 60, 85],
    '數量': [120, 85, 70, 64, 98, 47],
})

print(df['品項'].unique())                     # 一欄
print(df[['分店', '數量']].head(2))            # 多欄（兩層中括號）

print(df[df['數量'] &gt;= 80])                    # 篩選列
print(df[(df['分店'] == '台北') &amp; (df['數量'] &gt; 100)])   # 多條件：& 且、| 或
print(df[df['品項'].isin(['珍奶', '拿鐵'])].shape)
print(df.loc[df['分店'] == '高雄', ['品項', '數量']])     # loc[列條件, 欄位]
print(df.iloc[0:2, 0:2])                       # 依位置選取</pre>
<div class="box warn"><b class="t">多條件篩選的兩個陷阱</b>①每個條件都要加<b>括號</b>；②要用 <code>&amp;</code>、<code>|</code>、<code>~</code>，不能用 Python 的 <code>and</code>、<code>or</code>、<code>not</code>，否則會出現「The truth value of a Series is ambiguous」錯誤。</div>` },
    { id: 'columns', title: '新增欄位與排序', html: `
<pre class="py">import pandas as pd
df = pd.DataFrame({
    '分店': ['台北', '台中', '高雄', '台北'],
    '品項': ['珍奶', '紅茶', '珍奶', '拿鐵'],
    '單價': [60, 30, 60, 85],
    '數量': [120, 85, 70, 64],
})
df['營業額'] = df['單價'] * df['數量']                         # 整欄運算，不用迴圈
df['等級'] = df['營業額'].apply(lambda x: 'A' if x &gt;= 6000 else 'B')
df['品項_英文'] = df['品項'].map({'珍奶': 'Bubble Tea', '紅茶': 'Black Tea', '拿鐵': 'Latte'})
df = df.rename(columns={'數量': '杯數'})
print(df.sort_values('營業額', ascending=False))
print(df.nlargest(2, '營業額')[['分店', '品項', '營業額']])</pre>` },
    { id: 'clean', title: '資料清理', html: `
<p>實務資料一定是「髒」的：有缺值、重複、格式不一致。資料分析有一半以上的時間在做清理。</p>
<pre class="py">import pandas as pd
import numpy as np

df = pd.DataFrame({
    '日期': ['2026/09/01', '2026-09-02', '2026-09-02', '2026-09-03', None],
    '分店': [' 台北', '台中 ', '台中 ', '高雄', '台北'],
    '金額': ['1,200', '850', '850', None, '990'],
})
print('原始資料：'); print(df)
print('缺值數：'); print(df.isna().sum())

df['分店'] = df['分店'].str.strip()                                   # 去除前後空白
df['金額'] = pd.to_numeric(df['金額'].str.replace(',', ''), errors='coerce')   # 字串轉數字
df['日期'] = pd.to_datetime(df['日期'].str.replace('/', '-'), errors='coerce')  # 統一日期格式
df = df.drop_duplicates()                                             # 刪除完全重複的列
df = df.dropna(subset=['日期'])                                       # 日期是空的就刪除
df['金額'] = df['金額'].fillna(df['金額'].median())                    # 金額缺值補中位數
print('清理後：'); print(df)
print(df.dtypes)</pre>
<table>
<tr><th>問題</th><th>處理方法</th></tr>
<tr><td>缺值</td><td><code>isna()</code> 檢查；<code>dropna()</code> 刪除；<code>fillna(值)</code> 補值</td></tr>
<tr><td>重複</td><td><code>duplicated()</code> 檢查；<code>drop_duplicates()</code> 刪除</td></tr>
<tr><td>數字是字串</td><td><code>pd.to_numeric(..., errors='coerce')</code>，無法轉換的變成 NaN</td></tr>
<tr><td>日期格式不一</td><td><code>pd.to_datetime(...)</code></td></tr>
<tr><td>前後空白、大小寫</td><td><code>.str.strip()</code>、<code>.str.lower()</code></td></tr>
<tr><td>欄位名稱不好用</td><td><code>rename(columns={...})</code></td></tr>
</table>
<div class="box memo"><b class="t">動手做：清理一份髒資料</b>在上面的範例加上：金額小於 0 或大於 100 萬視為異常值並刪除；新增「星期」欄位（<code>df['日期'].dt.day_name()</code>）。</div>` }
  ],
  keypoints: [
    'DataFrame 是表格、Series 是一欄；整欄運算不需要迴圈',
    'read_csv／read_excel 讀取，to_csv／to_excel 輸出（index=False）',
    '起手式：head、shape、info、describe',
    'df["欄"] 取一欄、df[["欄1", "欄2"]] 取多欄、df[條件] 篩選列',
    '多條件用 & | ~ 且每個條件加括號；loc 依標籤、iloc 依位置',
    'apply 套用函式、map 對應值、sort_values 排序、nlargest 取前幾名',
    '清理：str.strip、to_numeric、to_datetime、drop_duplicates、dropna、fillna'
  ]
},
{
  id: 'c08', subject: 2, minutes: 55,
  title: 'pandas 進階分析',
  summary: 'groupby 分組彙總、多重彙總與排名、merge 合併資料表、concat 合併多個檔案、樞紐分析表、日期處理與時間序列，完成銷售資料分析。',
  sections: [
    { id: 'groupby', title: 'groupby 分組彙總', html: `
<p><b>groupby</b> 是資料分析最常用的功能，對應 Excel 的「小計」與 SQL 的 GROUP BY：<b>依某欄分組 → 對每組計算 → 合併結果</b>。</p>
<pre class="py">import pandas as pd
df = pd.DataFrame({
    '分店': ['台北', '台中', '高雄', '台北', '台中', '高雄', '台北', '台中'],
    '品項': ['珍奶', '珍奶', '拿鐵', '拿鐵', '紅茶', '珍奶', '珍奶', '拿鐵'],
    '營業額': [7200, 5880, 3995, 5440, 2550, 4200, 6900, 3400],
    '杯數': [120, 98, 47, 64, 85, 70, 115, 40],
})
print(df.groupby('分店')['營業額'].sum())
print(df.groupby('分店')['營業額'].sum().sort_values(ascending=False))
print(df.groupby(['分店', '品項'])['杯數'].sum())

summary = df.groupby('分店').agg(
    總營業額=('營業額', 'sum'),
    平均每筆=('營業額', 'mean'),
    交易筆數=('營業額', 'count'),
    最暢銷杯數=('杯數', 'max'),
).round(0)
print(summary)</pre>
<div class="box tip"><b class="t">常用彙總函式</b><code>sum</code>、<code>mean</code>、<code>median</code>、<code>count</code>、<code>nunique</code>（不重複個數）、<code>max</code>、<code>min</code>、<code>std</code>。<code>agg</code> 可以一次算多個，並自訂結果欄位名稱。</div>` },
    { id: 'merge', title: '合併資料表', html: `
<p>資料常分散在不同的表：訂單表只有商品代號，價格在商品表；兩張表要用共同的欄位（鍵）合併，就像 Excel 的 VLOOKUP。</p>
<pre class="py">import pandas as pd
orders = pd.DataFrame({'訂單': ['A1', 'A2', 'A3', 'A4'], '商品代號': ['P01', 'P02', 'P01', 'P09'], '數量': [2, 1, 5, 3]})
products = pd.DataFrame({'商品代號': ['P01', 'P02', 'P03'], '品名': ['滑鼠', '鍵盤', '耳機'], '單價': [590, 1290, 890]})

m = pd.merge(orders, products, on='商品代號', how='left')    # 以訂單表為主
m['小計'] = m['單價'] * m['數量']
print(m)
print('找不到商品資料的訂單：'); print(m[m['品名'].isna()])

print(pd.merge(orders, products, on='商品代號', how='inner').shape)   # 只保留兩邊都有的</pre>
<table>
<tr><th>how</th><th>結果</th></tr>
<tr><td><code>left</code></td><td>保留左表全部，右表沒有的填 NaN（最常用，類似 VLOOKUP）</td></tr>
<tr><td><code>inner</code></td><td>只保留兩邊都有的</td></tr>
<tr><td><code>outer</code></td><td>兩邊全部保留</td></tr>
<tr><td><code>right</code></td><td>保留右表全部</td></tr>
</table>
<h3>上下合併多個檔案：concat</h3>
<pre class="out"># 把資料夾裡所有分店的 CSV 合併成一張表（請在自己的電腦執行）
from pathlib import Path
frames = []
for f in Path('branches').glob('*.csv'):
    d = pd.read_csv(f, encoding='utf-8-sig')
    d['分店'] = f.stem                 # 用檔名標記來源
    frames.append(d)
all_df = pd.concat(frames, ignore_index=True)</pre>` },
    { id: 'pivot', title: '樞紐分析表', html: `
<pre class="py">import pandas as pd
df = pd.DataFrame({
    '月份': ['07', '07', '07', '08', '08', '08', '09', '09', '09'],
    '分店': ['台北', '台中', '高雄'] * 3,
    '營業額': [118, 80, 92, 125, 86, 99, 131, 90, 101],   # 單位：萬元
})
pt = df.pivot_table(index='分店', columns='月份', values='營業額', aggfunc='sum', margins=True, margins_name='合計')
print(pt)

growth = df.pivot_table(index='分店', columns='月份', values='營業額')
growth['9月成長率'] = ((growth['09'] / growth['08'] - 1) * 100).round(1)
print(growth)</pre>
<div class="box memo"><b class="t">記憶口訣</b>「<b>index 放列、columns 放欄、values 放數字、aggfunc 怎麼算</b>」，和 Excel 樞紐分析表的四個區域一模一樣。</div>` },
    { id: 'time', title: '日期與時間序列', html: `
<pre class="py">import pandas as pd
import numpy as np

rng = np.random.default_rng(7)
dates = pd.date_range('2026-07-01', '2026-09-30', freq='D')
df = pd.DataFrame({'日期': dates, '營業額': rng.integers(30000, 60000, len(dates))})
df.loc[df['日期'].dt.dayofweek &gt;= 5, '營業額'] += 15000       # 週末生意比較好

df['月份'] = df['日期'].dt.to_period('M')
df['星期'] = df['日期'].dt.dayofweek.map(dict(enumerate('一二三四五六日')))
print(df.groupby('月份')['營業額'].sum())
print(df.groupby('星期')['營業額'].mean().round(0).reindex(list('一二三四五六日')))

weekly = df.set_index('日期')['營業額'].resample('W').sum()     # 依週加總
print(weekly.tail(3))
df['7日平均'] = df['營業額'].rolling(7).mean().round(0)          # 移動平均
print(df.tail(3))</pre>` },
    { id: 'project', title: '動手做：銷售資料分析', html: `
<p>用一份模擬的飲料店銷售資料，回答主管常問的商業問題：</p>
<pre class="py">import pandas as pd
import numpy as np

rng = np.random.default_rng(42)
n = 600
df = pd.DataFrame({
    '日期': pd.to_datetime('2026-07-01') + pd.to_timedelta(rng.integers(0, 92, n), unit='D'),
    '分店': rng.choice(['台北', '台中', '高雄'], n, p=[0.45, 0.3, 0.25]),
    '品項': rng.choice(['珍奶', '紅茶', '拿鐵', '水果茶'], n),
    '杯數': rng.integers(1, 6, n),
})
price = {'珍奶': 60, '紅茶': 30, '拿鐵': 85, '水果茶': 70}
df['營業額'] = df['品項'].map(price) * df['杯數']
df['月份'] = df['日期'].dt.month

print('Q1 各分店營業額與占比')
s = df.groupby('分店')['營業額'].sum().sort_values(ascending=False)
print(pd.DataFrame({'營業額': s, '占比': (s / s.sum() * 100).round(1)}))

print('\\nQ2 哪個品項最賺錢？哪個賣最多杯？')
print(df.groupby('品項').agg(營業額=('營業額', 'sum'), 杯數=('杯數', 'sum')).sort_values('營業額', ascending=False))

print('\\nQ3 各分店每月營業額（樞紐分析）')
print(df.pivot_table(index='分店', columns='月份', values='營業額', aggfunc='sum'))

print('\\nQ4 各分店最暢銷的品項')
top = df.groupby(['分店', '品項'])['杯數'].sum().reset_index()
print(top.loc[top.groupby('分店')['杯數'].idxmax()])</pre>
<div class="box memo"><b class="t">動手做</b>再回答兩個問題：①週末與平日的平均營業額差多少？②哪個分店 9 月比 7 月成長最多？下一章把這些結果畫成圖表。</div>` }
  ],
  keypoints: [
    'groupby：依欄分組 → 計算 → 合併；agg 一次算多個彙總並命名',
    'merge 依鍵合併兩張表，how="left" 最常用（類似 VLOOKUP）',
    'concat 上下合併多個檔案，ignore_index=True 重編索引',
    'pivot_table：index 列、columns 欄、values 數字、aggfunc 計算方式',
    '.dt 取出日期的月份、星期；to_period("M") 轉成月份',
    'resample("W") 依時間重新取樣；rolling(7).mean() 計算移動平均',
    '分析要回答具體的商業問題，並附上占比、成長率等比較基準'
  ]
},
{
  id: 'c09', subject: 2, minutes: 45,
  title: '資料視覺化',
  summary: 'matplotlib 的 Figure 與 Axes、長條圖、折線圖、圓餅圖與散布圖、子圖與存檔、pandas 直接畫圖、中文字型設定，以及選擇圖表的原則。',
  sections: [
    { id: 'basic', title: 'matplotlib 基本架構', html: `
<p><b>matplotlib</b> 是 Python 最基本的繪圖套件。建議使用「<b>物件導向寫法</b>」：先建立 Figure（整張圖）與 Axes（一個座標區），再在 Axes 上畫圖。</p>
<pre class="py">import matplotlib.pyplot as plt

months = ['Jul', 'Aug', 'Sep']
taipei = [118, 125, 131]
taichung = [80, 86, 90]

fig, ax = plt.subplots(figsize=(6, 3.5))
ax.plot(months, taipei, marker='o', label='Taipei')
ax.plot(months, taichung, marker='o', label='Taichung')
ax.set_title('Monthly Revenue (10k NTD)')
ax.set_xlabel('Month')
ax.set_ylabel('Revenue')
ax.legend()
ax.grid(alpha=0.3)
print('圖表會顯示在下方')</pre>
<div class="box warn"><b class="t">網頁執行器的中文字型</b>瀏覽器版的 Python 沒有中文字型，圖表中的中文會變成方塊，所以本章範例的圖表文字使用英文。在自己的電腦上可以設定中文字型，見本章最後一節。</div>` },
    { id: 'types', title: '常用圖表', html: `
<table>
<tr><th>想表達</th><th>圖表</th><th>matplotlib</th></tr>
<tr><td>比較不同類別</td><td>長條圖</td><td><code>ax.bar()</code>、橫向 <code>ax.barh()</code></td></tr>
<tr><td>隨時間的趨勢</td><td>折線圖</td><td><code>ax.plot()</code></td></tr>
<tr><td>占比（類別少於 5 個）</td><td>圓餅圖</td><td><code>ax.pie()</code></td></tr>
<tr><td>兩個數值的關係</td><td>散布圖</td><td><code>ax.scatter()</code></td></tr>
<tr><td>數值的分布</td><td>直方圖</td><td><code>ax.hist()</code></td></tr>
</table>
<pre class="py">import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(2, 2, figsize=(9, 6.5))

stores = ['Taipei', 'Taichung', 'Kaohsiung']
revenue = [374, 256, 292]
bars = axes[0, 0].bar(stores, revenue, color=['#1f4e8c', '#6c9bd2', '#a9c4e8'])
axes[0, 0].bar_label(bars)                       # 在長條上標數字
axes[0, 0].set_title('Q3 Revenue by Store')

axes[0, 1].pie([45, 30, 25], labels=['Bubble', 'Latte', 'Tea'], autopct='%1.0f%%', startangle=90)
axes[0, 1].set_title('Sales Mix')

rng = np.random.default_rng(1)
temp = rng.uniform(20, 35, 60)
cups = temp * 12 + rng.normal(0, 25, 60)
axes[1, 0].scatter(temp, cups, alpha=0.6)
axes[1, 0].set_xlabel('Temperature (C)'); axes[1, 0].set_ylabel('Cups sold')
axes[1, 0].set_title('Temperature vs Sales')

axes[1, 1].hist(rng.normal(65, 12, 300), bins=15, color='#6cc3b4', edgecolor='white')
axes[1, 1].set_title('Order Amount Distribution')

fig.tight_layout()                                # 自動調整間距避免重疊
fig.savefig('dashboard.png', dpi=150)             # 存成圖片檔</pre>` },
    { id: 'pandas', title: 'pandas 直接畫圖', html: `
<p>DataFrame 與 Series 內建 <code>.plot()</code>，分析完可以直接畫：</p>
<pre class="py">import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    'month': ['Jul', 'Aug', 'Sep'] * 3,
    'store': ['Taipei'] * 3 + ['Taichung'] * 3 + ['Kaohsiung'] * 3,
    'revenue': [118, 125, 131, 80, 86, 90, 92, 99, 101],
})
pt = df.pivot_table(index='month', columns='store', values='revenue').reindex(['Jul', 'Aug', 'Sep'])

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 3.5))
pt.plot(kind='line', marker='o', ax=ax1, title='Trend')
pt.plot(kind='bar', stacked=True, ax=ax2, title='Stacked Revenue', rot=0)
fig.tight_layout()</pre>` },
    { id: 'chinese', title: '中文字型與好圖表的原則', html: `
<p>在自己的電腦上，加入下列設定就能正常顯示中文：</p>
<pre class="out">import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = ['Microsoft JhengHei',   # Windows 微軟正黑體
                                   'PingFang TC',          # macOS 蘋方
                                   'Noto Sans CJK TC']     # Linux 需先安裝 Noto 字型
plt.rcParams['axes.unicode_minus'] = False                  # 讓負號正常顯示</pre>
<h3>好圖表的原則</h3>
<ul>
  <li><b>一張圖只講一件事</b>，標題直接寫結論，例如「台北 9 月營業額成長 5%」比「營業額」好。</li>
  <li><b>長條圖的 Y 軸從 0 開始</b>，否則會誇大差異。</li>
  <li><b>減少裝飾</b>：不要 3D、不要過多顏色；用顏色強調重點，其餘用灰色。</li>
  <li><b>圓餅圖類別不要超過 5 個</b>，類別多時改用橫向長條圖並排序。</li>
  <li>標示單位（萬元、杯、%）與資料來源、期間。</li>
</ul>
<div class="box memo"><b class="t">動手做：自動產生分析圖表</b>把第 8 章銷售分析的四個問題各畫成一張圖，組成 2×2 的儀表板並存成 PNG。再搭配第 3 章的寄信程式，就是「每週自動寄送分析圖表」的完整作品。</div>
<div class="box tip"><b class="t">更進一步</b>需要互動式圖表或網頁儀表板時，可以學 <b>Plotly</b>、<b>Streamlit</b>；Excel 使用者較多的公司，也可以用 openpyxl 直接在 Excel 中產生圖表。</div>` }
  ],
  keypoints: [
    'fig, ax = plt.subplots() 建立圖與座標區，在 ax 上畫圖',
    '比較用長條、趨勢用折線、占比用圓餅（少於 5 類）、關係用散布、分布用直方圖',
    'set_title、set_xlabel、legend、grid、bar_label 讓圖表更清楚',
    'plt.subplots(2, 2) 建立子圖；tight_layout 避免重疊；savefig 存檔',
    'DataFrame.plot(kind=...) 直接畫圖，可指定 ax',
    '中文字型：rcParams["font.sans-serif"] 設為微軟正黑體或蘋方',
    '標題寫結論、Y 軸從 0 開始、減少裝飾、標示單位'
  ]
},
{
  id: 'c10', subject: 2, minutes: 50,
  title: '呼叫 AI API 與作品集',
  summary: '用 Python 呼叫 Claude API 做摘要與分類、提示詞設計、批次處理與成本控制，以及用 Git 與 GitHub 整理作品集、撰寫 README 與在面試中介紹專案。',
  sections: [
    { id: 'api', title: '用 Python 呼叫 Claude API', html: `
<p>生成式 AI 可以把 Python 自動化帶到新的層次：自動摘要客服信件、分類問卷回覆、從合約擷取重點。以 Anthropic 的 Claude 為例：</p>
<ol>
  <li>到 <a href="https://console.anthropic.com/" target="_blank" rel="noopener">Claude Console</a> 註冊並建立 API Key（依用量計費，請設定用量上限）。</li>
  <li>設定環境變數 <code>ANTHROPIC_API_KEY</code>，並安裝套件：<code>pip install anthropic</code>。</li>
</ol>
<pre class="out"># summarize.py —— 請在自己的電腦執行
import anthropic

client = anthropic.Anthropic()          # 自動讀取環境變數 ANTHROPIC_API_KEY

response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    system="你是公司的客服主管助理，用繁體中文回答，條列重點。",
    messages=[{"role": "user", "content": "請用三點摘要這封客訴：\\n\\n" + email_text}],
)

if response.stop_reason == "refusal":    # 模型拒絕回答時沒有一般文字內容
    print("模型拒絕了這個請求")
else:
    for block in response.content:
        if block.type == "text":
            print(block.text)</pre>
<table>
<tr><th>參數</th><th>說明</th></tr>
<tr><td><code>model</code></td><td>使用的模型，名稱以官方文件為準</td></tr>
<tr><td><code>max_tokens</code></td><td>回應的長度上限（token 約等於字數單位）</td></tr>
<tr><td><code>system</code></td><td>系統提示詞：設定角色、語氣、規則</td></tr>
<tr><td><code>messages</code></td><td>對話內容，role 為 user 或 assistant</td></tr>
</table>
<div class="box warn"><b class="t">資料安全</b>送到雲端 AI 的內容要符合公司規定與個資法：客戶姓名、身分證字號、病歷等敏感資料，先遮蔽或取得同意再處理。API 金鑰和其他密碼一樣，絕不寫進程式碼。</div>` },
    { id: 'classify', title: '批次分類與結構化輸出', html: `
<p>實務上更常見的是「對大量資料逐筆處理」，例如把 500 則問卷回覆分類。關鍵是讓 AI 回傳<b>固定格式</b>，程式才能接著處理：</p>
<pre class="out">import json, time
import anthropic
import pandas as pd

client = anthropic.Anthropic()
CATEGORIES = ["產品品質", "服務態度", "價格", "物流", "其他"]

def classify(text):
    response = client.messages.create(
        model="claude-opus-5-5",
        max_tokens=200,
        output_config={"effort": "low"},          # 簡單的分類任務用低 effort，較快也較省
        system=f"把顧客意見分類到以下其中一類：{CATEGORIES}。"
               '只回傳 JSON，格式：{"category": "...", "sentiment": "正面|中立|負面"}',
        messages=[{"role": "user", "content": text}],
    )
    raw = next(b.text for b in response.content if b.type == "text")
    return json.loads(raw)

df = pd.read_csv("feedback.csv", encoding="utf-8-sig")
results = []
for text in df["意見"]:
    try:
        results.append(classify(text))
    except (json.JSONDecodeError, anthropic.APIError) as e:
        results.append({"category": "錯誤", "sentiment": str(e)[:50]})
    time.sleep(0.5)                               # 控制請求頻率
df = pd.concat([df, pd.DataFrame(results)], axis=1)
print(df.groupby(["category", "sentiment"]).size())</pre>
<p>AI 回傳的是 JSON 字串，解析與統計的部分和前幾章完全一樣，可以在網頁上練習：</p>
<pre class="py">import json
import pandas as pd

ai_outputs = [
    '{"category": "物流", "sentiment": "負面"}',
    '{"category": "產品品質", "sentiment": "正面"}',
    '{"category": "物流", "sentiment": "負面"}',
    '這不是 JSON',                                     # 模擬偶爾格式錯誤
    '{"category": "價格", "sentiment": "中立"}',
]
rows = []
for raw in ai_outputs:
    try:
        rows.append(json.loads(raw))
    except json.JSONDecodeError:
        rows.append({'category': '需人工檢查', 'sentiment': None})
df = pd.DataFrame(rows)
print(df)
print(df['category'].value_counts())</pre>
<div class="box tip"><b class="t">提示詞技巧</b>①給明確角色與任務；②列出可選的類別；③指定輸出格式並附範例；④先用 10 筆資料測試、人工檢查正確率，再跑全部；⑤記錄每次呼叫的用量（<code>response.usage</code>），估算成本。大量、不急的工作可以使用 Batch API，費用約為一半。</div>` },
    { id: 'git', title: 'Git 與 GitHub', html: `
<p><b>GitHub</b> 是工程師的作品集。104 上很多資料、自動化相關職缺會請你附上 GitHub 連結，面試官會實際打開來看。</p>
<pre class="out"># 第一次設定
git config --global user.name "你的名字"
git config --global user.email "you@example.com"

# 在專案資料夾
git init
git add .
git commit -m "完成每日報表自動寄送"
# 在 GitHub 網站建立新的 repository 後
git remote add origin https://github.com/你的帳號/daily-report.git
git branch -M main
git push -u origin main</pre>
<pre class="out"># .gitignore —— 不要上傳的檔案
.env
.venv/
__pycache__/
*.xlsx
*.log
data/</pre>
<div class="box warn"><b class="t">上傳前檢查</b>①<code>.env</code>、密碼、API 金鑰<b>絕對不能上傳</b>，一旦推上 GitHub 就要視為已外洩並立即更換；②公司的資料、客戶資料不能上傳，作品集請使用模擬資料或公開資料。</div>` },
    { id: 'portfolio', title: '作品集與面試', html: `
<h3>好的 README 結構</h3>
<pre class="out"># 分店月報自動彙整工具

把 30 家分店的 Excel 月報自動合併成一份總表並寄給主管。
手動作業約 2 小時 → 程式 10 秒完成。

## 功能
- 自動讀取資料夾內所有分店檔案，檢查欄位格式
- 合併明細、計算各分店合計與成長率，輸出含格式的 Excel
- 每月 1 日自動寄送，失敗時以 Telegram 通知

## 使用技術
Python、pandas、openpyxl、smtplib、Windows 工作排程器

## 安裝與執行
pip install -r requirements.txt
設定環境變數 MAIL_USER、MAIL_APP_PASSWORD
python main.py

## 成果截圖
（放一張輸出報表與通知的截圖）</pre>
<h3>本課程可以完成的作品</h3>
<table>
<tr><th>作品</th><th>展現的能力</th><th>章節</th></tr>
<tr><td>下載資料夾自動整理器</td><td>檔案處理、安全設計</td><td>第 1 章</td></tr>
<tr><td>分店月報自動彙整與寄送</td><td>Excel、Email、排程</td><td>第 2～3 章</td></tr>
<tr><td>開放資料查詢工具</td><td>API、JSON、錯誤處理</td><td>第 4 章</td></tr>
<tr><td>降價通知機器人</td><td>爬蟲、狀態管理、通知</td><td>第 5～6 章</td></tr>
<tr><td>銷售資料分析報告</td><td>pandas、視覺化、商業洞察</td><td>第 7～9 章</td></tr>
<tr><td>AI 顧客意見分類器</td><td>AI API、批次處理、成本控制</td><td>第 10 章</td></tr>
</table>
<div class="box exam"><b class="t">面試時怎麼介紹作品</b>用 <b>STAR</b> 結構：情境（Situation，原本遇到什麼問題）、任務（Task，要達成什麼）、行動（Action，用了哪些技術、怎麼設計）、結果（Result，省下多少時間、減少多少錯誤）。準備好回答「遇到最困難的問題是什麼、怎麼解決」，例如中文編碼、網站改版、API 限制次數。</div>
<div class="box tip"><b class="t">恭喜完成</b>你已經具備用 Python 解決實際工作問題的能力。接下來可以依職涯方向延伸：資料分析（SQL、Power BI）、AI（本站的 iPAS AI 應用規劃師課程）、雲端（本站的 AWS 課程，把自動化程式搬到 Lambda 上執行）。</div>` }
  ],
  keypoints: [
    'pip install anthropic，API Key 放環境變數 ANTHROPIC_API_KEY',
    'client.messages.create(model, max_tokens, system, messages)；回應內容在 response.content',
    '檢查 stop_reason，只讀取 type 為 text 的區塊',
    '批次處理：要求固定 JSON 格式、先小量測試、處理解析錯誤、控制頻率與成本',
    '送到雲端 AI 的資料要符合公司規定與個資法',
    'git init → add → commit → push；.env 與密碼加入 .gitignore，絕不上傳',
    'README 寫問題、功能、技術、執行方式與成果數字；面試用 STAR 介紹作品'
  ]
}
);
