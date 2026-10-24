/* AI 應用規劃師中級 科目二：大數據處理分析與應用（L22）、科目三：機器學習技術與應用（L23） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 55,
  title: '敘述統計與機率分布',
  summary: 'L22101–L22102：集中趨勢、離散程度、分布型態、相關係數，以及離散與連續機率分布、常態分布與中央極限定理，並以 pandas 計算統計摘要。',
  sections: [
    { id: 'desc', title: '敘述統計', html: `
<div class="table-wrap"><table>
<tr><th>類別</th><th>統計量</th><th>說明</th></tr>
<tr><td rowspan="3"><b>集中趨勢</b></td><td>平均數 Mean</td><td>受極端值影響大</td></tr>
<tr><td>中位數 Median</td><td>排序後中間值，<b>不受極端值影響</b>，偏態資料（如所得）適用</td></tr>
<tr><td>眾數 Mode</td><td>出現次數最多，可用於類別資料</td></tr>
<tr><td rowspan="4"><b>離散程度</b></td><td>全距 Range</td><td>最大值 − 最小值</td></tr>
<tr><td>變異數、標準差</td><td>與平均數的平均離散程度；樣本變異數分母為 <b>n − 1</b></td></tr>
<tr><td>四分位距 IQR</td><td>Q3 − Q1，不受極端值影響</td></tr>
<tr><td>變異係數 CV</td><td>標準差 ÷ 平均數，比較不同單位資料的離散程度</td></tr>
<tr><td rowspan="2"><b>分布型態</b></td><td>偏態 Skewness</td><td><b>右偏（正偏）</b>：長尾在右，<b>平均數 > 中位數</b>；左偏相反</td></tr>
<tr><td>峰態 Kurtosis</td><td>分布尾部厚薄與峰的尖銳程度</td></tr>
</table></div>
<h3>相關分析</h3>
<ul>
  <li><b>皮爾森相關係數</b>：衡量<b>線性</b>關係，範圍 −1 到 1。0 代表無線性關係（但可能有非線性關係）。</li>
  <li><b>斯皮爾曼相關係數</b>：以排名計算，適用順序資料與單調非線性關係。</li>
  <li><b>相關不等於因果</b>：冰淇淋銷量與溺水人數相關，是因為兩者都受氣溫影響（干擾變數）。</li>
</ul>
<h3>pandas 統計摘要</h3>
<pre class="out">import pandas as pd
df = pd.DataFrame({'age': [23, 35, 31, 52, 28],
                   'income': [32, 48, 45, 120, 38]})
df.describe()        # count、mean、std、min、25%、50%、75%、max
df['income'].median()  # 45.0
df['income'].mean()    # 56.6（被 120 拉高，右偏）
df.corr()            # 欄位間皮爾森相關係數矩陣</pre>
<div class="box tip"><b class="t">程式題提示</b>pandas 的 <code>std()</code> 與 <code>var()</code> 預設 <b>ddof=1</b>（樣本標準差）；NumPy 的 <code>np.std()</code> 預設 <b>ddof=0</b>（母體標準差），同一組資料結果不同。</div>` },
    { id: 'dist', title: '機率分布', html: `
<div class="table-wrap"><table>
<tr><th>分布</th><th>類型</th><th>描述</th><th>例子</th><th>平均數</th></tr>
<tr><td><b>伯努利</b></td><td>離散</td><td>單次試驗成功或失敗</td><td>一次點擊是否購買</td><td>p</td></tr>
<tr><td><b>二項</b></td><td>離散</td><td>n 次獨立試驗中成功的次數</td><td>100 位訪客中購買人數</td><td>np</td></tr>
<tr><td><b>泊松</b></td><td>離散</td><td>單位時間或空間內事件發生次數</td><td>每小時客服來電數</td><td>λ（變異數也是 λ）</td></tr>
<tr><td><b>均勻</b></td><td>連續／離散</td><td>每個值機率相同</td><td>擲公正骰子</td><td>(a+b)/2</td></tr>
<tr><td><b>常態</b></td><td>連續</td><td>對稱鐘形</td><td>身高、量測誤差</td><td>μ</td></tr>
<tr><td><b>指數</b></td><td>連續</td><td>事件之間的<b>等待時間</b></td><td>下一位顧客到達的時間</td><td>1/λ</td></tr>
</table></div>
<h3>常態分布與中央極限定理</h3>
<ul>
  <li><b>68–95–99.7 法則</b>：約 68% 資料落在平均數 ±1 個標準差內，95% 在 ±2 個，99.7% 在 ±3 個。</li>
  <li><b>標準常態分布</b>：平均 0、標準差 1，以 Z 分數表示。</li>
  <li><b>中央極限定理（CLT）</b>：不論母體分布為何，樣本數夠大（常用 n ≥ 30）時，<b>樣本平均數的分布</b>近似常態，標準誤 = σ ÷ √n。</li>
</ul>
<pre class="out">import numpy as np
np.random.seed(0)
x = np.random.normal(loc=170, scale=10, size=1000)  # 平均 170、標準差 10
y = np.random.binomial(n=10, p=0.3, size=1000)      # 二項分布
z = np.random.poisson(lam=4, size=1000)             # 泊松分布</pre>` }
  ],
  keypoints: [
    '中位數與 IQR 不受極端值影響',
    '右偏：平均數 > 中位數',
    '樣本變異數分母 n − 1；pandas std 預設 ddof=1，NumPy 預設 ddof=0',
    '皮爾森相關衡量線性關係；相關不等於因果',
    '二項：n 次成功次數；泊松：單位時間發生次數；指數：等待時間',
    '68–95–99.7 法則；中央極限定理讓樣本平均近似常態'
  ]
},
{
  id: 'c08', subject: 2, minutes: 50,
  title: '假設檢定與統計推論',
  summary: 'L22103、L22301：點估計與信賴區間、虛無與對立假設、p 值、型一型二錯誤與檢定力、t 檢定、ANOVA、卡方檢定、無母數檢定，以及統計在大數據的應用。',
  sections: [
    { id: 'est', title: '估計與信賴區間', html: `
<ul>
  <li><b>點估計</b>：以樣本平均估計母體平均。</li>
  <li><b>區間估計</b>：95% 信賴區間 ≈ 樣本平均 ± <b>1.96</b> × 標準誤。</li>
  <li><b>正確解讀</b>：若重複抽樣很多次，約 95% 的信賴區間會包含真實母體參數；不是「母體平均有 95% 機率在此區間」。</li>
  <li>樣本數越大，標準誤越小，信賴區間越窄。</li>
</ul>` },
    { id: 'test', title: '假設檢定', html: `
<div class="flow">
  <div><b>設定假設</b><span>H0 虛無假設（無差異）、H1 對立假設</span></div>
  <div><b>選擇顯著水準</b><span>α 常用 0.05</span></div>
  <div><b>計算檢定統計量</b><span>t、F、χ² 等</span></div>
  <div><b>求 p 值</b><span>H0 為真時，觀察到此結果或更極端的機率</span></div>
  <div><b>判斷</b><span>p &lt; α 則拒絕 H0</span></div>
</div>
<div class="table-wrap"><table>
<tr><th></th><th>H0 為真</th><th>H0 為假</th></tr>
<tr><th>拒絕 H0</th><td><b>型一錯誤</b>（α，偽陽性）</td><td>正確（檢定力 1 − β）</td></tr>
<tr><th>不拒絕 H0</th><td>正確</td><td><b>型二錯誤</b>（β，偽陰性）</td></tr>
</table></div>
<div class="box warn"><b class="t">易錯</b>p 值不是「H0 為真的機率」；不拒絕 H0 也不代表證明 H0 為真。降低 α 會降低型一錯誤，但在樣本數不變時會提高型二錯誤。</div>` },
    { id: 'methods', title: '常見檢定方法', html: `
<div class="table-wrap"><table>
<tr><th>情境</th><th>方法</th></tr>
<tr><td>一組樣本平均與特定值比較</td><td>單一樣本 t 檢定</td></tr>
<tr><td>兩組獨立樣本平均比較（如 A/B 測試的客單價）</td><td><b>獨立樣本 t 檢定</b></td></tr>
<tr><td>同一群人前後測比較</td><td><b>成對樣本 t 檢定</b></td></tr>
<tr><td>三組以上平均比較</td><td><b>變異數分析 ANOVA</b>（F 檢定）</td></tr>
<tr><td>兩個類別變數是否相關（如性別與購買偏好）</td><td><b>卡方獨立性檢定</b></td></tr>
<tr><td>觀察次數是否符合預期分布</td><td>卡方適合度檢定</td></tr>
<tr><td>資料不符合常態、樣本小</td><td><b>無母數檢定</b>：Mann-Whitney U、Wilcoxon、Kruskal-Wallis</td></tr>
<tr><td>檢查資料是否為常態</td><td>Shapiro-Wilk 檢定、Q-Q 圖</td></tr>
</table></div>
<pre class="out">from scipy import stats
a = [52, 55, 49, 61, 58]
b = [47, 50, 45, 52, 49]
t, p = stats.ttest_ind(a, b)   # 獨立樣本 t 檢定
if p &lt; 0.05:
    print('兩組平均有顯著差異')</pre>` },
    { id: 'bigstat', title: '統計在大數據的應用', html: `
<ul>
  <li><b>大樣本陷阱</b>：資料量極大時，微小到沒有實務意義的差異也會顯著（p 值很小），應同時看<b>效果量（Effect Size）</b>。</li>
  <li><b>多重比較問題</b>：同時做大量檢定，偽陽性會增加，可用 Bonferroni 校正（α ÷ 檢定次數）。</li>
  <li><b>抽樣</b>：大數據下常以抽樣加快分析；分層抽樣（Stratified Sampling）可確保各群體比例。</li>
  <li><b>資料轉換</b>：右偏資料取<b>對數轉換</b>使分布接近常態；Box-Cox 轉換；標準化與正規化讓特徵尺度一致。</li>
  <li><b>A/B 測試</b>：隨機分組比較兩版本，以假設檢定判斷差異是否顯著。</li>
</ul>` }
  ],
  keypoints: [
    '95% 信賴區間 ≈ 平均 ± 1.96 × 標準誤',
    'p < α 拒絕 H0；p 值不是 H0 為真的機率',
    '型一錯誤 α 偽陽性；型二錯誤 β 偽陰性；檢定力 1 − β',
    '兩組平均 t 檢定、三組以上 ANOVA、類別關聯卡方',
    '不符常態用無母數檢定',
    '大樣本要看效果量；多重比較用 Bonferroni 校正',
    '右偏資料常用對數轉換'
  ]
},
{
  id: 'c09', subject: 2, minutes: 60,
  title: '大數據收集、儲存與處理技術',
  summary: 'L22201–L22203：資料收集與 ETL、Hadoop 與 Spark、資料倉儲／資料湖／湖倉、SQL 與 NoSQL、批次與串流架構，以及 pandas 資料清理與轉換實作。',
  sections: [
    { id: 'collect', title: '數據收集與整合', html: `
<ul>
  <li><b>ETL</b>（Extract → Transform → Load）：先轉換再載入，適合傳統資料倉儲。</li>
  <li><b>ELT</b>（Extract → Load → Transform）：先載入再於目標系統轉換，適合雲端資料倉儲與資料湖。</li>
  <li><b>收集來源</b>：交易系統、日誌、IoT 感測器、API、網路爬蟲、第三方資料。</li>
  <li><b>變更資料擷取（CDC）</b>：只擷取資料庫中有變動的資料。</li>
</ul>` },
    { id: 'storage', title: '儲存與管理', html: `
<div class="table-wrap"><table>
<tr><th>架構</th><th>資料</th><th>結構</th><th>用途</th></tr>
<tr><td><b>資料倉儲 Data Warehouse</b></td><td>清理過的結構化資料</td><td><b>寫入前定義結構（Schema-on-write）</b></td><td>BI 報表、分析</td></tr>
<tr><td><b>資料湖 Data Lake</b></td><td>原始的各種格式資料</td><td><b>讀取時才定義結構（Schema-on-read）</b></td><td>資料科學、機器學習；管理不善會變成資料沼澤</td></tr>
<tr><td><b>湖倉 Lakehouse</b></td><td>兼具兩者</td><td>開放格式加上交易與治理</td><td>統一分析與 AI</td></tr>
</table></div>
<h3>資料庫類型</h3>
<div class="table-wrap"><table>
<tr><th>類型</th><th>例子</th><th>特性</th></tr>
<tr><td>關聯式 SQL</td><td>MySQL、PostgreSQL</td><td>結構化、ACID 交易</td></tr>
<tr><td>文件型 NoSQL</td><td>MongoDB</td><td>JSON 文件，彈性結構</td></tr>
<tr><td>鍵值型</td><td>Redis</td><td>極快，常用於快取</td></tr>
<tr><td>寬欄型</td><td>HBase、Cassandra</td><td>大量寫入、分散式</td></tr>
<tr><td>圖形資料庫</td><td>Neo4j</td><td>社群網路、關聯分析</td></tr>
</table></div>
<p><b>CAP 定理</b>：分散式系統在網路分割時，無法同時保證一致性（Consistency）與可用性（Availability）。</p>
<h3>Hadoop 與 Spark</h3>
<ul>
  <li><b>HDFS</b>：分散式檔案系統，資料切成區塊分散存放，預設<b>3 份副本</b>容錯。</li>
  <li><b>MapReduce</b>：Map 分散處理、Reduce 彙總，中間結果寫入磁碟，速度較慢。</li>
  <li><b>YARN</b>：Hadoop 的資源管理。<b>Hive</b>：以類 SQL 查詢 Hadoop 資料。</li>
  <li><b>Spark</b>：<b>記憶體內運算</b>，比 MapReduce 快很多；支援 SQL、串流、機器學習（MLlib）。</li>
  <li>欄式儲存格式 <b>Parquet</b>：壓縮率高、只讀需要的欄位，適合分析。</li>
</ul>` },
    { id: 'stream', title: '批次與串流處理', html: `
<div class="table-wrap"><table>
<tr><th>處理方式</th><th>工具</th><th>例子</th></tr>
<tr><td><b>批次處理 Batch</b></td><td>Spark、MapReduce</td><td>每日營收報表</td></tr>
<tr><td><b>串流處理 Streaming</b></td><td><b>Kafka</b>（訊息佇列）、Flink、Spark Streaming</td><td>即時詐欺偵測、IoT 監控</td></tr>
</table></div>
<ul>
  <li><b>Lambda 架構</b>：同時有批次層與串流（速度）層，再合併結果。</li>
  <li><b>Kappa 架構</b>：只用串流處理，簡化系統。</li>
</ul>` },
    { id: 'pandas', title: 'pandas 資料處理實作', html: `
<pre class="out">import pandas as pd
df = pd.read_csv('sales.csv')
df.shape                 # (列數, 欄數)
df.info()                # 欄位型別與非空值數
df.isnull().sum()        # 每欄缺失值數量
df.dropna()              # 刪除含缺失值的列
df['price'].fillna(df['price'].median())   # 以中位數填補
df.drop_duplicates()     # 移除重複列
df[df['qty'] > 10]       # 條件篩選
df.loc[0, 'price']       # 以標籤取值
df.iloc[0, 1]            # 以位置取值（第 0 列第 1 欄）
df.groupby('city')['qty'].sum()            # 分組彙總
pd.merge(df, cust, on='cust_id', how='left')  # 合併表格
pd.get_dummies(df, columns=['city'])       # One-hot 編碼
df['date'] = pd.to_datetime(df['date'])     # 轉為日期型別</pre>
<div class="box exam"><b class="t">程式題提示</b><code>df.loc[0:2]</code> 以標籤切片會<b>包含</b>結尾 2；<code>df.iloc[0:2]</code> 以位置切片<b>不包含</b>結尾，只取 0、1。<code>dropna()</code> 預設回傳新物件，不會修改原本的 df（除非 <code>inplace=True</code> 或重新指定）。</div>
<h3>縮放與分布調整</h3>
<pre class="out">from sklearn.preprocessing import StandardScaler, MinMaxScaler
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)  # 只用訓練集 fit
X_test_s = scaler.transform(X_test)        # 測試集只 transform，避免資料洩漏
import numpy as np
df['log_income'] = np.log1p(df['income'])  # 對數轉換處理右偏</pre>` }
  ],
  keypoints: [
    'ETL 先轉換再載入；ELT 先載入再轉換',
    '資料倉儲 Schema-on-write；資料湖 Schema-on-read；湖倉兼具兩者',
    'HDFS 預設 3 份副本；Spark 記憶體內運算比 MapReduce 快',
    'Kafka 用於串流；Lambda 架構有批次與串流兩層；Kappa 只有串流',
    'loc 標籤切片含結尾；iloc 位置切片不含結尾',
    'Scaler 只在訓練集 fit，測試集只 transform'
  ]
},
{
  id: 'c10', subject: 2, minutes: 55,
  title: '大數據分析方法與視覺化',
  summary: 'L22302–L22303：分群、關聯規則、分類與迴歸、時間序列、文字與網路分析、異常偵測、資料不平衡處理，以及圖表選擇原則與 Python 視覺化。',
  sections: [
    { id: 'methods', title: '常見分析方法', html: `
<div class="table-wrap"><table>
<tr><th>方法</th><th>用途</th><th>演算法</th></tr>
<tr><td><b>分群</b></td><td>客戶分群、市場區隔</td><td>K-means（需指定 K，可用手肘法、輪廓係數選 K）、DBSCAN（依密度，可找任意形狀並標記雜訊）、階層式分群</td></tr>
<tr><td><b>關聯規則</b></td><td>購物籃分析、商品擺放</td><td>Apriori、FP-Growth</td></tr>
<tr><td><b>分類與迴歸</b></td><td>流失預測、銷售預測</td><td>決策樹、隨機森林、梯度提升、邏輯迴歸</td></tr>
<tr><td><b>時間序列</b></td><td>需求預測、股價、流量</td><td>移動平均、ARIMA、指數平滑、LSTM；需考慮趨勢、季節性、週期</td></tr>
<tr><td><b>異常偵測</b></td><td>詐欺、設備故障、入侵</td><td>Z-score、IQR、Isolation Forest、自編碼器</td></tr>
<tr><td><b>文字探勘</b></td><td>評論分析、主題分類</td><td>TF-IDF、主題模型 LDA、情感分析</td></tr>
<tr><td><b>網路分析</b></td><td>社群影響力、詐騙集團關聯</td><td>中心性指標、PageRank、社群偵測</td></tr>
<tr><td><b>近似演算法</b></td><td>超大量資料快速估計</td><td>HyperLogLog 估計不重複數、抽樣</td></tr>
</table></div>
<h3>關聯規則三指標</h3>
<ul>
  <li><b>支持度 Support</b>：A 與 B 同時出現的交易比例。</li>
  <li><b>信賴度 Confidence</b>：買 A 的交易中也買 B 的比例 = P(B|A)。</li>
  <li><b>提升度 Lift</b>：信賴度 ÷ B 的支持度。<b>> 1 正相關</b>、= 1 獨立、< 1 負相關。</li>
</ul>
<div class="box analogy"><b class="t">計算範例</b>1,000 筆交易，200 筆買麵包，100 筆買牛奶，80 筆兩者都買。Support = 80/1000 = 0.08；Confidence(麵包→牛奶) = 80/200 = 0.4；Lift = 0.4 ÷ (100/1000) = 4，強烈正相關。</div>` },
    { id: 'imbalance', title: '資料不平衡處理', html: `
<p>例如詐欺交易只占 0.1%，模型全猜「正常」也有 99.9% 準確率，卻毫無用處。</p>
<div class="table-wrap"><table>
<tr><th>方法</th><th>說明</th></tr>
<tr><td><b>過採樣 Oversampling</b></td><td>複製少數類樣本</td></tr>
<tr><td><b>SMOTE</b></td><td>在少數類樣本之間<b>內插產生合成樣本</b>，比單純複製更不易過擬合</td></tr>
<tr><td><b>欠採樣 Undersampling</b></td><td>減少多數類樣本，可能損失資訊</td></tr>
<tr><td><b>類別權重 Class Weight</b></td><td>提高少數類答錯的懲罰，如 <code>class_weight='balanced'</code></td></tr>
<tr><td><b>調整決策門檻</b></td><td>不一定用 0.5 判斷正類</td></tr>
<tr><td><b>改用合適指標</b></td><td>召回率、F1、PR-AUC，而非準確率</td></tr>
</table></div>
<div class="box warn"><b class="t">注意</b>過採樣與 SMOTE 只能在<b>切分後的訓練集</b>上做，否則合成樣本會洩漏到測試集。</div>` },
    { id: 'viz', title: '數據視覺化', html: `
<div class="table-wrap"><table>
<tr><th>目的</th><th>圖表</th></tr>
<tr><td>比較類別數值</td><td><b>長條圖</b></td></tr>
<tr><td>時間趨勢</td><td><b>折線圖</b></td></tr>
<tr><td>單一變數分布</td><td><b>直方圖</b>、<b>箱形圖</b>（顯示中位數、四分位數與離群值）、小提琴圖</td></tr>
<tr><td>兩個數值變數關係</td><td><b>散佈圖</b></td></tr>
<tr><td>多變數相關</td><td><b>熱力圖</b>（相關係數矩陣）</td></tr>
<tr><td>組成比例</td><td>圓餅圖（類別少時）、堆疊長條圖</td></tr>
<tr><td>地理資料</td><td>地圖、面量圖</td></tr>
</table></div>
<h3>呈現原則</h3>
<ul>
  <li>先確定要傳達的訊息，再選圖表；標題直接寫結論。</li>
  <li>長條圖 Y 軸從 0 開始，避免誤導；避免 3D 與過多顏色。</li>
  <li>儀表板依使用者需求設計，重要指標放在最顯眼處。</li>
  <li>工具：Python（matplotlib、seaborn、plotly）、Tableau、Power BI。</li>
</ul>
<pre class="out">import matplotlib.pyplot as plt
import seaborn as sns
plt.hist(df['age'], bins=20)          # 直方圖
sns.boxplot(x='city', y='price', data=df)  # 箱形圖
plt.scatter(df['area'], df['price'])  # 散佈圖
sns.heatmap(df.corr(), annot=True)    # 相關係數熱力圖
plt.show()</pre>` }
  ],
  keypoints: [
    'K-means 需指定 K；DBSCAN 依密度可標記雜訊',
    '關聯規則：Support、Confidence = P(B|A)、Lift > 1 正相關',
    'Isolation Forest、Z-score、IQR 用於異常偵測',
    'SMOTE 內插產生少數類合成樣本，只能在訓練集上做',
    '不平衡資料改看召回率、F1、PR-AUC',
    '趨勢用折線、比較用長條、分布用直方或箱形、關係用散佈'
  ]
},
{
  id: 'c11', subject: 2, minutes: 45,
  title: '大數據在人工智慧之應用與合規',
  summary: 'L22401–L22404：大數據對機器學習的影響與挑戰、分散式訓練、大數據在鑑別式與生成式 AI 的應用、語料處理，以及隱私保護、安全與合規技術。',
  sections: [
    { id: 'ml', title: '大數據與機器學習', html: `
<ul>
  <li><b>資料越多</b>通常越能降低過擬合、讓複雜模型發揮，但品質比數量更重要（垃圾進、垃圾出）。</li>
  <li><b>維度災難（Curse of Dimensionality）</b>：特徵太多時資料變得稀疏、距離失去意義，需要特徵選擇或降維。</li>
  <li><b>運算挑戰</b>：資料無法放進單機記憶體，需要<b>小批次訓練（Mini-batch）</b>、<b>線上學習（Online Learning）</b>、<b>分散式訓練</b>。</li>
  <li><b>分散式訓練</b>：<b>資料平行</b>（每台機器處理不同資料、同步梯度）與<b>模型平行</b>（模型太大，切到多台機器）。</li>
  <li>資料偏差與標註品質在大規模時更難察覺，需要自動化的資料驗證。</li>
</ul>` },
    { id: 'disc', title: '在鑑別式 AI 的應用', html: `
<div class="table-wrap"><table>
<tr><th>應用</th><th>資料</th><th>任務</th></tr>
<tr><td>信用評分</td><td>交易、還款紀錄</td><td>分類（違約與否）</td></tr>
<tr><td>詐欺偵測</td><td>即時交易串流</td><td>異常偵測、分類</td></tr>
<tr><td>推薦系統</td><td>瀏覽、購買行為</td><td>協同過濾、排序</td></tr>
<tr><td>預測性維護</td><td>設備感測器時間序列</td><td>迴歸（剩餘壽命）、分類（是否故障）</td></tr>
<tr><td>需求預測</td><td>銷售、天氣、節日</td><td>時間序列迴歸</td></tr>
</table></div>
<p><b>協同過濾</b>：依「相似使用者喜歡的東西」推薦；<b>冷啟動問題</b>：新使用者或新商品沒有歷史資料，可用內容特徵或熱門推薦補足。</p>` },
    { id: 'gen', title: '在生成式 AI 的應用', html: `
<ul>
  <li>LLM 預訓練需要數兆 Token 的語料，處理流程包括：收集、<b>去重（Deduplication）</b>、品質過濾、移除有害內容與<b>個資</b>、語言辨識、<b>分詞（Tokenization）</b>。</li>
  <li><b>資料品質決定生成品質</b>：重複資料會讓模型背誦；低品質資料增加幻覺。</li>
  <li><b>合成資料</b>：以生成模型產生訓練資料補足稀缺情境，但需檢查偏差與品質。</li>
  <li><b>企業應用</b>：以 RAG 結合企業大量文件；向量資料庫處理大規模語意檢索。</li>
  <li>著作權與授權：訓練語料需注意來源授權與退出（Opt-out）機制。</li>
</ul>` },
    { id: 'privacy', title: '隱私保護、安全與合規', html: `
<div class="table-wrap"><table>
<tr><th>技術</th><th>說明</th></tr>
<tr><td>去識別化</td><td>假名化（可還原，仍屬個資）、匿名化、K-匿名、泛化、遮罩</td></tr>
<tr><td><b>差分隱私</b></td><td>加入數學雜訊，以隱私預算 ε 控制保護程度（ε 越小越隱私）</td></tr>
<tr><td><b>聯邦學習</b></td><td>資料不離開本地，只交換模型參數</td></tr>
<tr><td><b>同態加密</b></td><td>可直接對加密資料運算，結果解密後正確</td></tr>
<tr><td><b>安全多方計算</b></td><td>多方共同計算而不揭露各自資料</td></tr>
<tr><td><b>可信執行環境 TEE</b></td><td>硬體隔離區域保護使用中的資料</td></tr>
</table></div>
<h3>安全與合規</h3>
<ul>
  <li>存取控制、加密（靜態與傳輸中）、稽核日誌、資料分級、資料保存與刪除政策。</li>
  <li><b>資料血緣（Data Lineage）</b>：追蹤資料從哪來、經過哪些處理，方便稽核與除錯。</li>
  <li>法規：台灣個資法、歐盟 GDPR（目的限制、資料最小化、被遺忘權、跨境傳輸限制）、歐盟 AI 法對高風險 AI 的資料治理要求。</li>
</ul>` }
  ],
  keypoints: [
    '維度災難：特徵太多使資料稀疏，需降維或特徵選擇',
    '分散式訓練：資料平行與模型平行',
    '協同過濾依相似使用者推薦；冷啟動需用內容特徵或熱門推薦',
    'LLM 語料處理：去重、品質過濾、移除個資與有害內容',
    '差分隱私 ε 越小越隱私；同態加密可對密文運算',
    '資料血緣追蹤資料來源與處理過程'
  ]
},
{
  id: 'c12', subject: 3, minutes: 60,
  title: '機器學習數學基礎',
  summary: 'L23101–L23103：條件機率與貝氏定理、最大概似估計、資訊熵，向量與矩陣運算、特徵值與 PCA、SVD，以及損失函數、梯度下降與優化器，並以 NumPy 實作。',
  sections: [
    { id: 'prob', title: '機率與統計', html: `
<ul>
  <li><b>條件機率</b>：P(A|B) = P(A∩B) ÷ P(B)。</li>
  <li><b>貝氏定理</b>：<span class="mono">P(A|B) = P(B|A) × P(A) ÷ P(B)</span>。P(A) 為<b>先驗</b>、P(A|B) 為<b>後驗</b>、P(B|A) 為<b>概似</b>。</li>
  <li><b>單純貝氏分類器</b>：假設特徵之間<b>條件獨立</b>，計算簡單，常用於文字分類。</li>
  <li><b>最大概似估計（MLE）</b>：找出讓觀察到的資料出現機率最大的參數。</li>
  <li><b>資訊熵（Entropy）</b>：衡量不確定性，決策樹以<b>資訊增益</b>選擇分割；分類的<b>交叉熵損失</b>也來自這個概念。</li>
</ul>
<div class="box analogy"><b class="t">貝氏計算範例</b>某疾病盛行率 1%，檢測靈敏度 99%、偽陽性率 5%。陽性者真正患病機率 = (0.99 × 0.01) ÷ (0.99 × 0.01 + 0.05 × 0.99) = 0.0099 ÷ 0.0594 ≈ <b>16.7%</b>。盛行率低時，陽性結果多數是偽陽性。</div>` },
    { id: 'la', title: '線性代數', html: `
<ul>
  <li><b>向量</b>表示一筆資料的特徵；<b>矩陣</b>表示整個資料集（列為樣本、欄為特徵）。</li>
  <li><b>內積（點積）</b>：衡量兩向量的相似程度，神經網路的每個神經元就是輸入與權重的內積加偏差。</li>
  <li><b>矩陣乘法</b>：(m × n) 乘 (n × p) 得到 (m × p)，前者的欄數必須等於後者的列數。</li>
  <li><b>特徵值與特徵向量</b>：Av = λv，特徵向量經矩陣轉換後方向不變。</li>
  <li><b>PCA</b>：計算共變異數矩陣的特徵向量，取特徵值最大（變異最大）的方向作為主成分，達成降維。<b>使用前應先標準化</b>。</li>
  <li><b>SVD 奇異值分解</b>：A = UΣVᵀ，用於降維、推薦系統、影像壓縮。</li>
</ul>
<pre class="out">import numpy as np
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
np.dot(a, b)        # 32 = 1*4 + 2*5 + 3*6
a * b               # array([ 4, 10, 18])，逐元素相乘
A = np.array([[1, 2], [3, 4]])
A @ A               # 矩陣乘法 [[7, 10], [15, 22]]
A.T                 # 轉置
A.shape             # (2, 2)
np.zeros((2, 3)).reshape(3, -1).shape   # (3, 2)</pre>
<div class="box tip"><b class="t">廣播（Broadcasting）</b>NumPy 會自動擴展維度進行運算，例如 shape (3, 1) 加上 shape (3,) 得到 (3, 3)。</div>` },
    { id: 'opt', title: '數值優化', html: `
<p>訓練模型就是找出讓<b>損失函數</b>最小的參數。</p>
<div class="table-wrap"><table>
<tr><th>損失函數</th><th>用途</th></tr>
<tr><td><b>均方誤差 MSE</b></td><td>迴歸</td></tr>
<tr><td><b>平均絕對誤差 MAE</b></td><td>迴歸，對離群值較不敏感</td></tr>
<tr><td><b>二元交叉熵</b></td><td>二元分類</td></tr>
<tr><td><b>類別交叉熵</b></td><td>多類別分類（搭配 Softmax）</td></tr>
<tr><td>Hinge Loss</td><td>SVM</td></tr>
</table></div>
<h3>梯度下降</h3>
<p class="mono center">θ ← θ − η × ∇L(θ)</p>
<ul>
  <li><b>學習率 η</b>：太大會震盪甚至發散，太小收斂很慢。可到「互動練習」實際觀察。</li>
  <li><b>批次梯度下降</b>：每次用全部資料，穩定但慢。<b>隨機梯度下降 SGD</b>：每次一筆，快但震盪。<b>小批次 Mini-batch</b>：折衷，最常用。</li>
  <li><b>一個 Epoch</b> = 所有訓練資料都看過一次；每個 Epoch 的更新次數 = 資料數 ÷ 批次大小。</li>
  <li><b>凸函數</b>只有一個全域最小值；深度學習的損失函數非凸，可能卡在<b>區域最小值</b>或<b>鞍點</b>。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>優化器</th><th>特點</th></tr>
<tr><td>Momentum</td><td>累積過去梯度方向，加速並減少震盪</td></tr>
<tr><td>AdaGrad</td><td>依參數調整學習率，但學習率會持續變小</td></tr>
<tr><td>RMSProp</td><td>以移動平均改善 AdaGrad</td></tr>
<tr><td><b>Adam</b></td><td>結合 Momentum 與 RMSProp，最常用的預設選擇</td></tr>
</table></div>
<p><b>演算法效率</b>：以時間複雜度評估，例如 KNN 預測時需與所有訓練資料計算距離，資料量大時很慢；可擴展性差的演算法需改用近似方法或分散式運算。</p>` }
  ],
  keypoints: [
    '貝氏定理：後驗 = 概似 × 先驗 ÷ 證據',
    '盛行率低時，檢測陽性多數為偽陽性',
    'np.dot 為內積；* 為逐元素相乘；@ 為矩陣乘法',
    '(m×n) × (n×p) = (m×p)',
    'PCA 取變異最大的特徵向量，使用前要標準化',
    '學習率太大發散、太小收斂慢；Mini-batch 最常用',
    'Adam 結合 Momentum 與 RMSProp'
  ]
},
{
  id: 'c13', subject: 3, minutes: 60,
  title: '機器學習原理與常見演算法',
  summary: 'L23201–L23202：偏差與變異權衡、正則化、整合學習，線性與邏輯迴歸、決策樹、隨機森林、梯度提升、SVM、KNN、單純貝氏、K-means、DBSCAN，並以 scikit-learn 實作。',
  sections: [
    { id: 'theory', title: '機器學習理論', html: `
<ul>
  <li><b>偏差（Bias）</b>：模型假設太簡單造成的系統性誤差 → 欠擬合。</li>
  <li><b>變異（Variance）</b>：模型對訓練資料太敏感 → 過擬合。</li>
  <li>總誤差 = 偏差² + 變異 + 不可避免的雜訊，需取得平衡。</li>
  <li><b>沒有免費午餐定理</b>：沒有一種演算法在所有問題上都最好。</li>
  <li><b>奧坎剃刀</b>：效果相近時選擇較簡單的模型。</li>
</ul>
<h3>正則化</h3>
<div class="table-wrap"><table>
<tr><th>方法</th><th>懲罰項</th><th>效果</th></tr>
<tr><td><b>L1（Lasso）</b></td><td>權重絕對值和</td><td>讓部分權重變成 0，<b>具特徵選擇效果</b></td></tr>
<tr><td><b>L2（Ridge）</b></td><td>權重平方和</td><td>讓權重變小但不為 0</td></tr>
<tr><td>Elastic Net</td><td>L1 + L2</td><td>兼具兩者</td></tr>
</table></div>
<h3>整合學習（Ensemble）</h3>
<div class="table-wrap"><table>
<tr><th>方法</th><th>做法</th><th>主要降低</th><th>例子</th></tr>
<tr><td><b>Bagging</b></td><td>以<b>重抽樣</b>訓練多個模型，<b>平行</b>投票或平均</td><td>變異</td><td>隨機森林</td></tr>
<tr><td><b>Boosting</b></td><td><b>依序</b>訓練，後一個模型專注修正前一個的錯誤</td><td>偏差</td><td>AdaBoost、GBDT、XGBoost、LightGBM</td></tr>
<tr><td>Stacking</td><td>以另一個模型整合多個模型的輸出</td><td>—</td><td>多層模型融合</td></tr>
</table></div>` },
    { id: 'algos', title: '常見演算法', html: `
<div class="table-wrap"><table>
<tr><th>演算法</th><th>原理</th><th>重點</th></tr>
<tr><td>線性迴歸</td><td>最小化 MSE 的直線</td><td>假設線性關係，易受多重共線性影響</td></tr>
<tr><td>邏輯迴歸</td><td>線性組合經 <b>Sigmoid</b> 轉成 0～1 機率</td><td>分類；係數可解釋為勝算比</td></tr>
<tr><td>決策樹</td><td>以<b>資訊增益</b>或<b>吉尼不純度</b>選擇分割</td><td>可解釋；以剪枝、限制深度避免過擬合</td></tr>
<tr><td>隨機森林</td><td>Bagging + 每次分割隨機選部分特徵</td><td>穩定，可輸出特徵重要性</td></tr>
<tr><td>梯度提升</td><td>每棵新樹擬合前面模型的殘差</td><td>表格資料表現佳，需調學習率與樹數</td></tr>
<tr><td><b>SVM</b></td><td>找出<b>最大間隔</b>超平面；支援向量為最靠近邊界的樣本</td><td><b>核函數技巧</b>（RBF 等）處理非線性；需標準化</td></tr>
<tr><td><b>KNN</b></td><td>看最近 K 個鄰居</td><td><b>惰性學習</b>，無訓練階段；K 小易過擬合、K 大易欠擬合；需標準化</td></tr>
<tr><td>單純貝氏</td><td>貝氏定理 + 特徵條件獨立</td><td>快速，適合文字分類</td></tr>
<tr><td><b>K-means</b></td><td>反覆指派最近中心、更新中心</td><td>需指定 K；對初始值與離群值敏感；適合球狀群</td></tr>
<tr><td><b>DBSCAN</b></td><td>依密度擴展群集</td><td>不需指定群數，能找出雜訊點</td></tr>
<tr><td>階層式分群</td><td>由下而上合併</td><td>以樹狀圖呈現</td></tr>
</table></div>` },
    { id: 'sklearn', title: 'scikit-learn 實作', html: `
<pre class="out">from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

model = RandomForestClassifier(n_estimators=100, max_depth=5)
model.fit(X_train, y_train)          # 訓練
pred = model.predict(X_test)         # 預測類別
prob = model.predict_proba(X_test)   # 預測各類別機率
print(accuracy_score(y_test, pred))
print(classification_report(y_test, pred))  # 精確率、召回率、F1
model.feature_importances_           # 特徵重要性</pre>
<div class="box exam"><b class="t">程式題提示</b>scikit-learn 的模型都有一致的介面：<code>fit()</code> 訓練、<code>predict()</code> 預測、<code>score()</code> 評分。<code>test_size=0.2</code> 代表 20% 為測試集；<code>stratify=y</code> 讓訓練與測試集的類別比例一致；<code>random_state</code> 固定隨機結果以便重現。</div>
<pre class="out">from sklearn.cluster import KMeans
km = KMeans(n_clusters=3, random_state=0, n_init=10)
labels = km.fit_predict(X)   # 每筆資料的群編號 0、1、2
km.cluster_centers_          # 各群中心
km.inertia_                  # 群內平方和，用於手肘法</pre>` }
  ],
  keypoints: [
    '高偏差欠擬合；高變異過擬合',
    'L1 可讓權重為 0 具特徵選擇；L2 讓權重變小',
    'Bagging 平行降變異（隨機森林）；Boosting 序列降偏差（XGBoost）',
    '邏輯迴歸以 Sigmoid 輸出機率',
    'SVM 最大間隔、核函數處理非線性；SVM 與 KNN 需標準化',
    'KNN 是惰性學習；K-means 需指定 K；DBSCAN 可找雜訊',
    'sklearn：fit、predict、predict_proba、score'
  ]
},
{
  id: 'c14', subject: 3, minutes: 60,
  title: '深度學習原理與框架',
  summary: 'L23203：人工神經元與多層感知器、激活函數、前向與反向傳播、梯度消失與爆炸、Dropout 與批次正規化、CNN、RNN、LSTM、Transformer，以及 PyTorch 與 Keras 框架。',
  sections: [
    { id: 'nn', title: '神經網路基礎', html: `
<ul>
  <li><b>人工神經元</b>：輸出 = 激活函數（Σ 權重 × 輸入 + 偏差）。</li>
  <li><b>感知器</b>只能處理線性可分問題（無法解 XOR）；<b>多層感知器 MLP</b> 加入隱藏層與非線性激活函數，可逼近複雜函數。</li>
  <li><b>前向傳播</b>：輸入逐層計算到輸出，得到預測與損失。</li>
  <li><b>反向傳播</b>：以<b>連鎖律</b>由輸出層往回計算每個參數的梯度，再以梯度下降更新。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>激活函數</th><th>輸出範圍</th><th>特點</th></tr>
<tr><td><b>Sigmoid</b></td><td>0～1</td><td>二元分類輸出層；深層網路易<b>梯度消失</b></td></tr>
<tr><td>Tanh</td><td>−1～1</td><td>以 0 為中心，仍有梯度消失</td></tr>
<tr><td><b>ReLU</b></td><td>0～∞</td><td>max(0, x)，計算快、緩解梯度消失，<b>隱藏層最常用</b>；可能有神經元死亡問題</td></tr>
<tr><td>Leaky ReLU</td><td>—</td><td>負值給小斜率，改善神經元死亡</td></tr>
<tr><td><b>Softmax</b></td><td>總和為 1</td><td><b>多類別分類</b>輸出層</td></tr>
</table></div>` },
    { id: 'train', title: '訓練技巧', html: `
<div class="table-wrap"><table>
<tr><th>問題或技巧</th><th>說明</th></tr>
<tr><td><b>梯度消失</b></td><td>梯度在反向傳播時越乘越小，前面的層學不動。對策：ReLU、殘差連接、批次正規化、LSTM</td></tr>
<tr><td><b>梯度爆炸</b></td><td>梯度越來越大導致數值不穩。對策：<b>梯度裁剪（Gradient Clipping）</b>、適當的權重初始化</td></tr>
<tr><td><b>Dropout</b></td><td>訓練時隨機關閉部分神經元，<b>降低過擬合</b>；推論時不使用</td></tr>
<tr><td><b>批次正規化 Batch Normalization</b></td><td>正規化每層的輸入分布，加速並穩定訓練</td></tr>
<tr><td><b>提前停止 Early Stopping</b></td><td>驗證損失不再下降就停止訓練</td></tr>
<tr><td>權重初始化</td><td>Xavier（搭配 Sigmoid／Tanh）、He（搭配 ReLU）</td></tr>
<tr><td>殘差連接</td><td>讓訊號可跳過層直接傳遞，ResNet 能訓練上百層</td></tr>
</table></div>` },
    { id: 'arch', title: '常見架構', html: `
<div class="table-wrap"><table>
<tr><th>架構</th><th>適合資料</th><th>關鍵機制</th></tr>
<tr><td><b>CNN</b></td><td>影像</td><td>卷積（局部感受野、權重共享）、池化</td></tr>
<tr><td><b>RNN</b></td><td>序列、時間序列</td><td>隱藏狀態傳遞；長序列梯度消失</td></tr>
<tr><td><b>LSTM</b></td><td>長序列</td><td><b>遺忘閘、輸入閘、輸出閘</b>與細胞狀態，保留長期記憶</td></tr>
<tr><td>GRU</td><td>序列</td><td>更新閘與重置閘，比 LSTM 參數少</td></tr>
<tr><td><b>Transformer</b></td><td>文字、影像、多模態</td><td>自注意力（Query、Key、Value）、多頭注意力、位置編碼，可平行運算</td></tr>
<tr><td><b>自編碼器</b></td><td>降維、異常偵測</td><td>編碼壓縮再解碼重建，重建誤差大即異常</td></tr>
<tr><td>GAN</td><td>生成</td><td>生成器與判別器對抗</td></tr>
</table></div>
<p class="mono center">Attention(Q, K, V) = softmax(QKᵀ ÷ √dₖ) V</p>` },
    { id: 'framework', title: '深度學習框架', html: `
<div class="table-wrap"><table>
<tr><th>框架</th><th>特點</th></tr>
<tr><td><b>PyTorch</b></td><td>動態計算圖、直覺好除錯，研究與業界主流</td></tr>
<tr><td><b>TensorFlow／Keras</b></td><td>Keras 為高階 API，易於快速建立模型；部署生態完整</td></tr>
<tr><td>Hugging Face Transformers</td><td>大量預訓練模型，快速微調 NLP 與多模態任務</td></tr>
<tr><td>ONNX</td><td>跨框架的模型交換格式，方便部署</td></tr>
</table></div>
<pre class="out">import torch.nn as nn
model = nn.Sequential(
    nn.Linear(20, 64),   # 輸入 20 個特徵 → 64 個神經元
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(64, 3)     # 輸出 3 類（搭配 CrossEntropyLoss）
)
# 參數量：第一層 20*64 + 64 = 1344，第二層 64*3 + 3 = 195

# 訓練迴圈的核心五步
optimizer.zero_grad()          # 清除舊梯度
output = model(x)              # 前向傳播
loss = loss_fn(output, y)      # 計算損失
loss.backward()                # 反向傳播計算梯度
optimizer.step()               # 更新參數</pre>
<pre class="out">from tensorflow import keras
model = keras.Sequential([
    keras.layers.Dense(64, activation='relu', input_shape=(20,)),
    keras.layers.Dense(1, activation='sigmoid')   # 二元分類
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_split=0.2)</pre>` }
  ],
  keypoints: [
    '神經元：激活函數（權重 × 輸入 + 偏差）',
    '反向傳播以連鎖律計算梯度',
    'ReLU 隱藏層最常用；Sigmoid 二元輸出；Softmax 多類別輸出',
    '梯度消失用 ReLU、殘差、BN、LSTM；梯度爆炸用梯度裁剪',
    'Dropout 降低過擬合，推論時不使用',
    'LSTM 有遺忘、輸入、輸出三個閘',
    'PyTorch 訓練五步：zero_grad、forward、loss、backward、step',
    'Dense 層參數量 = 輸入 × 輸出 + 輸出（偏差）'
  ]
},
{
  id: 'c15', subject: 3, minutes: 60,
  title: '建模、評估與參數調校',
  summary: 'L23301–L23304：特徵工程與管線、模型選擇與架構設計、交叉驗證、分類與迴歸評估指標、ROC 與 PR 曲線、學習曲線、超參數搜尋與優化策略。',
  sections: [
    { id: 'fe', title: '數據準備與特徵工程', html: `
<ul>
  <li><b>缺失值</b>：刪除、統計量填補、模型填補，或新增「是否缺失」指標欄位。</li>
  <li><b>編碼</b>：One-hot（無順序類別）、Ordinal（有順序）、Target Encoding（高基數類別，需防資料洩漏）。</li>
  <li><b>縮放</b>：標準化、正規化；樹模型通常不需要縮放。</li>
  <li><b>特徵選擇</b>：過濾法（相關係數、卡方）、包裝法（遞迴特徵消除 RFE）、嵌入法（L1、樹模型特徵重要性）。</li>
  <li><b>管線（Pipeline）</b>：把前處理與模型串在一起，確保交叉驗證時每一折都只用訓練部分 fit，避免資料洩漏。</li>
</ul>
<pre class="out">from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
pipe = Pipeline([('scaler', StandardScaler()),
                 ('clf', LogisticRegression(C=1.0))])
pipe.fit(X_train, y_train)</pre>` },
    { id: 'design', title: '模型選擇與架構設計', html: `
<ul>
  <li>從<b>簡單基準模型（Baseline）</b>開始，再逐步嘗試複雜模型。</li>
  <li>依任務選擇：表格資料 → 梯度提升；影像 → CNN／ViT；序列 → LSTM／Transformer；資料少 → 遷移學習或傳統 ML。</li>
  <li>神經網路設計：層數（深度）、每層神經元數（寬度）、激活函數、輸出層與損失函數的搭配。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>任務</th><th>輸出層</th><th>損失函數</th></tr>
<tr><td>迴歸</td><td>1 個神經元、無激活（線性）</td><td>MSE／MAE</td></tr>
<tr><td>二元分類</td><td>1 個神經元 + Sigmoid</td><td>二元交叉熵</td></tr>
<tr><td>多類別（單一標籤）</td><td>類別數個神經元 + Softmax</td><td>類別交叉熵</td></tr>
<tr><td>多標籤</td><td>類別數個神經元 + Sigmoid</td><td>二元交叉熵</td></tr>
</table></div>
<p><b>AutoML</b>：自動進行特徵工程、模型選擇與超參數搜尋，降低建模門檻。</p>` },
    { id: 'eval', title: '訓練、評估與驗證', html: `
<h3>驗證方法</h3>
<ul>
  <li><b>K-fold 交叉驗證</b>（常用 K = 5 或 10）；類別不平衡時用 <b>Stratified K-fold</b> 保持比例。</li>
  <li><b>時間序列</b>不能隨機切分，要用時間順序切分（Time Series Split），以過去預測未來。</li>
  <li><b>學習曲線</b>：訓練損失持續下降但驗證損失開始上升 → 過擬合，應提前停止。</li>
</ul>
<h3>分類指標</h3>
<div class="table-wrap"><table>
<tr><th>指標</th><th>公式或說明</th></tr>
<tr><td>Accuracy</td><td>(TP+TN) ÷ 全部</td></tr>
<tr><td>Precision</td><td>TP ÷ (TP+FP)</td></tr>
<tr><td>Recall（Sensitivity、TPR）</td><td>TP ÷ (TP+FN)</td></tr>
<tr><td>Specificity</td><td>TN ÷ (TN+FP)</td></tr>
<tr><td>F1</td><td>2PR ÷ (P+R)</td></tr>
<tr><td><b>ROC 曲線與 AUC</b></td><td>以 FPR 為 X 軸、TPR 為 Y 軸；AUC 0.5 為隨機猜測、1 為完美</td></tr>
<tr><td><b>PR 曲線</b></td><td>資料高度不平衡時比 ROC 更能反映表現</td></tr>
</table></div>
<p>提高分類門檻：精確率通常上升、召回率下降，兩者需依業務代價權衡。</p>
<h3>迴歸指標</h3>
<p><b>MAE</b>（直觀、抗離群）、<b>MSE／RMSE</b>（放大大誤差，RMSE 與原單位相同）、<b>R²</b>（解釋變異比例，越接近 1 越好）、MAPE（百分比誤差）。</p>
<pre class="out">from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5, scoring='f1')
print(scores.mean())   # 5 折 F1 的平均
from sklearn.metrics import confusion_matrix, roc_auc_score
confusion_matrix(y_test, pred)   # [[TN, FP], [FN, TP]]
roc_auc_score(y_test, prob[:, 1])</pre>
<div class="box exam"><b class="t">程式題提示</b>scikit-learn 的 <code>confusion_matrix</code> 二元分類輸出排列為 <b>[[TN, FP], [FN, TP]]</b>（列為實際、欄為預測，依標籤 0、1 排序），與一般教科書把 TP 放左上不同。</div>` },
    { id: 'tune', title: '模型調整與優化', html: `
<div class="table-wrap"><table>
<tr><th>搜尋方法</th><th>說明</th></tr>
<tr><td><b>網格搜尋 Grid Search</b></td><td>窮舉所有組合，參數多時成本暴增</td></tr>
<tr><td><b>隨機搜尋 Random Search</b></td><td>隨機抽樣組合，相同預算下常更有效率</td></tr>
<tr><td><b>貝氏優化 Bayesian Optimization</b></td><td>根據過去結果推測下一組最有希望的參數，如 Optuna</td></tr>
</table></div>
<h3>常見超參數</h3>
<ul>
  <li><b>學習率</b>：最重要；可用<b>學習率排程</b>（逐步衰減、Warmup）。</li>
  <li><b>批次大小</b>：大批次穩定但需更多記憶體、泛化可能較差；小批次雜訊多但有正則化效果。</li>
  <li>網路深度與寬度、Dropout 比例、權重衰減（L2）。</li>
  <li>樹模型：樹的數量、最大深度、學習率、最小葉節點樣本數。</li>
  <li>SVM 的 <b>C</b>（越大越不允許錯分，易過擬合）與 <b>gamma</b>；KNN 的 <b>K</b>。</li>
</ul>
<pre class="out">from sklearn.model_selection import GridSearchCV
grid = GridSearchCV(SVC(), {'C': [0.1, 1, 10], 'kernel': ['linear', 'rbf']}, cv=5)
grid.fit(X_train, y_train)     # 共 3 × 2 = 6 組參數 × 5 折 = 30 次訓練
grid.best_params_
grid.best_score_</pre>
<p>優化策略：先確認資料與特徵品質 → 建立基準 → 調整最重要的超參數 → 以驗證集或交叉驗證確認 → 最後才用測試集評估一次。</p>` }
  ],
  keypoints: [
    'Pipeline 讓前處理只在每折訓練部分 fit，避免資料洩漏',
    '時間序列要依時間切分，不可隨機切分',
    '二元分類：1 個神經元 + Sigmoid + 二元交叉熵；多類別：Softmax + 類別交叉熵',
    'ROC-AUC 0.5 為隨機；高度不平衡時看 PR 曲線',
    'sklearn confusion_matrix 為 [[TN, FP], [FN, TP]]',
    'Grid Search 窮舉；Random Search 較有效率；貝氏優化參考過去結果',
    'GridSearchCV 訓練次數 = 參數組合數 × 折數'
  ]
},
{
  id: 'c16', subject: 3, minutes: 45,
  title: '機器學習治理：隱私、偏見與公平性',
  summary: 'L23401–L23402：訓練資料的隱私與合規、隱私強化技術、模型層面的隱私風險，以及偏見來源、公平性指標、緩解方法與評估工具。',
  sections: [
    { id: 'privacy', title: '數據隱私、安全與合規', html: `
<ul>
  <li><b>合法依據與授權</b>：訓練資料是否取得同意或其他合法依據、是否符合原蒐集目的。</li>
  <li><b>資料最小化</b>：只使用必要特徵；移除直接識別欄位。</li>
  <li><b>隱私強化技術（PETs）</b>：匿名化、差分隱私（如 DP-SGD 在訓練時對梯度加雜訊）、聯邦學習、同態加密、安全多方計算、合成資料。</li>
  <li><b>模型層面的隱私風險</b>：成員推論、模型反轉、訓練資料記憶外洩。</li>
  <li><b>遺忘學習（Machine Unlearning）</b>：當事人要求刪除資料時，讓模型「忘記」特定資料，呼應 GDPR 被遺忘權。</li>
  <li><b>治理文件</b>：資料表（Datasheets for Datasets）、模型卡（Model Card）、稽核紀錄。</li>
</ul>` },
    { id: 'bias', title: '演算法偏見', html: `
<div class="table-wrap"><table>
<tr><th>偏見來源</th><th>說明</th><th>例子</th></tr>
<tr><td><b>歷史偏見</b></td><td>資料反映過去不公平的決策</td><td>過去較少錄取女性工程師，模型學到偏好男性</td></tr>
<tr><td><b>代表性（抽樣）偏見</b></td><td>某些群體樣本不足</td><td>人臉辨識對深膚色族群準確率較低</td></tr>
<tr><td><b>量測偏見</b></td><td>特徵或標籤的量測方式有偏差</td><td>以「逮捕次數」代表犯罪率</td></tr>
<tr><td><b>標註偏見</b></td><td>標註者的主觀判斷</td><td>不同文化對「冒犯性」的認定不同</td></tr>
<tr><td><b>代理變數</b></td><td>非敏感特徵與敏感屬性高度相關</td><td>郵遞區號間接反映種族或所得</td></tr>
<tr><td>回饋迴圈</td><td>模型決策影響未來資料，放大偏見</td><td>預測性警務集中巡邏特定區域</td></tr>
</table></div>` },
    { id: 'fair', title: '公平性指標與緩解', html: `
<div class="table-wrap"><table>
<tr><th>指標</th><th>要求</th></tr>
<tr><td><b>人口統計均等 Demographic Parity</b></td><td>各群體獲得正面結果的比例相同</td></tr>
<tr><td><b>機會均等 Equal Opportunity</b></td><td>各群體的<b>真陽性率（召回率）</b>相同</td></tr>
<tr><td><b>均等化勝算 Equalized Odds</b></td><td>各群體的真陽性率<b>與</b>偽陽性率都相同</td></tr>
<tr><td><b>不利影響比 Disparate Impact</b></td><td>弱勢群體正面結果比例 ÷ 優勢群體比例；常用<b>四分之五（80%）規則</b>，低於 0.8 視為可能有不利影響</td></tr>
</table></div>
<p>各種公平性定義之間可能互相衝突，無法同時滿足，需依情境與法規選擇。</p>
<h3>緩解方法</h3>
<div class="table-wrap"><table>
<tr><th>階段</th><th>方法</th></tr>
<tr><td><b>前處理</b></td><td>重新取樣、重新加權（Reweighing）、修正標籤</td></tr>
<tr><td><b>訓練中</b></td><td>加入公平性限制條件、對抗式去偏</td></tr>
<tr><td><b>後處理</b></td><td>依群體調整決策門檻</td></tr>
</table></div>
<p><b>評估工具</b>：IBM <b>AIF360</b>、Microsoft <b>Fairlearn</b>、Google What-If Tool；搭配 SHAP 檢查模型是否依賴敏感或代理特徵。</p>
<div class="box analogy"><b class="t">計算範例</b>男性申請者錄取率 50%，女性 35%。不利影響比 = 35% ÷ 50% = 0.7，低於 0.8，代表可能存在不利影響，需要進一步檢查。</div>` }
  ],
  keypoints: [
    'DP-SGD 在訓練時對梯度加雜訊實現差分隱私',
    '遺忘學習回應被遺忘權',
    '偏見來源：歷史、代表性、量測、標註、代理變數、回饋迴圈',
    '機會均等：各群體真陽性率相同；均等化勝算：TPR 與 FPR 都相同',
    '不利影響比低於 0.8（四分之五規則）視為可能有不利影響',
    '緩解：前處理重新加權、訓練中加限制、後處理調門檻',
    '工具：AIF360、Fairlearn'
  ]
}
);
