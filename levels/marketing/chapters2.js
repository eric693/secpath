/* 數位行銷 廣告與成效篇
   <pre class="js"> 為可在網頁上執行的 JavaScript；<pre class="out"> 為範例文字或示意
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c06', subject: 2, minutes: 50,
  title: 'Google 廣告',
  summary: 'Google 廣告的類型、搜尋廣告的帳戶結構、關鍵字比對類型與排除關鍵字、廣告文案與素材、出價策略與品質分數，以及多媒體、YouTube 與最高成效廣告。',
  sections: [
    { id: 'types', title: 'Google 廣告的類型', html: `
<table>
<tr><th>類型</th><th>出現在哪裡</th><th>適合</th></tr>
<tr><td><b>搜尋廣告</b></td><td>Google 搜尋結果上方或下方</td><td>捕捉「正在找」的需求，轉換率通常最高</td></tr>
<tr><td><b>多媒體廣告</b></td><td>數百萬個合作網站與 App 的圖片廣告</td><td>提高認知、再行銷</td></tr>
<tr><td><b>YouTube 影片廣告</b></td><td>YouTube 影片前、中或推薦位置</td><td>品牌故事、產品示範</td></tr>
<tr><td><b>購物廣告</b></td><td>搜尋結果的商品圖片與價格</td><td>電商，需要連結 Merchant Center 商品資料</td></tr>
<tr><td><b>最高成效廣告</b>（Performance Max）</td><td>以 AI 自動在所有 Google 版位投放</td><td>有明確轉換目標與足夠轉換數據時</td></tr>
</table>` },
    { id: 'structure', title: '帳戶結構與關鍵字', html: `
<pre class="out">帳戶
└── 廣告活動（設定預算、目標、地區、出價策略）
      例：手沖咖啡豆_搜尋_台灣
      ├── 廣告群組：耶加雪菲（關鍵字 + 廣告）
      ├── 廣告群組：淺焙咖啡豆
      └── 廣告群組：咖啡豆訂閱</pre>
<p>同一個廣告群組中的關鍵字主題要接近，廣告文案才能寫得相關。關鍵字<b>比對類型</b>決定廣告會在哪些搜尋字詞出現：</p>
<table>
<tr><th>比對類型</th><th>寫法</th><th>會觸發的搜尋例子（關鍵字：咖啡豆 訂閱）</th></tr>
<tr><td>廣泛比對</td><td>咖啡豆 訂閱</td><td>「每月咖啡宅配」「濾掛咖啡定期購」等相關意思，範圍最廣</td></tr>
<tr><td>詞組比對</td><td>"咖啡豆 訂閱"</td><td>包含這個意思的搜尋，例如「精品咖啡豆 訂閱 推薦」</td></tr>
<tr><td>完全比對</td><td>[咖啡豆 訂閱]</td><td>意思相同的搜尋，例如「訂閱咖啡豆」，範圍最窄</td></tr>
</table>
<p><b>排除關鍵字</b>同樣重要：例如加入「免費」「批發」「工作」「做法」，避免把預算花在不會購買的搜尋上。定期查看「搜尋字詞報表」，找出不相關的字加入排除。</p>` },
    { id: 'ads', title: '廣告文案與品質分數', html: `
<p>回應式搜尋廣告可以提供多個標題與說明，由系統自動組合測試：</p>
<pre class="out">標題（最多 15 個，每個 30 字元）：
・新手手沖咖啡豆訂閱
・每月兩款精品豆宅配到府
・附專屬沖煮影片教學
・首月體驗 199 元
說明（最多 4 個，每個 90 字元）：
・不會挑豆也不怕！每月寄送兩款新鮮烘焙咖啡豆，搭配沖煮影片，在家輕鬆沖出咖啡廳等級的味道。
・下午 3 點前訂購當天出貨，隨時可暫停或取消訂閱。</pre>
<p><b>品質分數</b>（1～10 分）反映廣告與搜尋者的相關程度，由三個面向組成：預期點閱率、廣告相關性、到達網頁體驗。品質越好，同樣的出價能拿到更好的位置、更低的點擊成本。</p>
<div class="box tip"><b class="t">廣告與到達頁要一致</b>搜尋「耶加雪菲」看到的廣告就寫耶加雪菲，點進去就是耶加雪菲的商品頁，而不是官網首頁。一致性同時提升品質分數與轉換率。</div>` },
    { id: 'bid', title: '出價策略', html: `
<table>
<tr><th>出價策略</th><th>系統會做什麼</th><th>適合</th></tr>
<tr><td>手動單次點擊出價</td><td>你自己設定每次點擊最高出價</td><td>剛開始、預算很少、想完全掌控</td></tr>
<tr><td>盡量爭取點擊</td><td>在預算內取得最多點擊</td><td>想先增加流量</td></tr>
<tr><td>盡量爭取轉換</td><td>在預算內取得最多轉換</td><td>已設定轉換追蹤</td></tr>
<tr><td>目標單次轉換出價（tCPA）</td><td>盡量讓平均 CPA 接近你設定的目標</td><td>有穩定的轉換數據，想控制成本</td></tr>
<tr><td>目標廣告投資報酬率（tROAS）</td><td>盡量達到你設定的 ROAS</td><td>電商，轉換價值不同（訂單金額不一）</td></tr>
</table>
<p>自動出價需要足夠的轉換數據才能學習，所以一定要先做好轉換追蹤（第 9 章）。修改設定後通常需要一段學習期，不要每天大幅調整。</p>` }
  ],
  keypoints: [
    'Google 廣告類型：搜尋、多媒體、YouTube、購物、最高成效廣告；搜尋廣告捕捉主動需求。',
    '帳戶結構：帳戶 → 廣告活動（預算、目標、地區）→ 廣告群組（主題相近的關鍵字與廣告）。',
    '比對類型：廣泛、詞組 "…"、完全 […]；排除關鍵字與搜尋字詞報表避免浪費預算。',
    '品質分數由預期點閱率、廣告相關性、到達網頁體驗組成，影響排名與點擊成本。',
    '廣告文案與到達頁要和搜尋字一致；回應式廣告提供多組標題與說明自動測試。',
    '出價策略從手動、盡量爭取點擊到 tCPA、tROAS；自動出價需要轉換數據與學習期。'
  ]
},
{
  id: 'c07', subject: 2, minutes: 50,
  title: 'Meta 廣告',
  summary: 'Meta 廣告的帳戶結構、選擇廣告目標、受眾設定（核心、自訂、類似受眾）、版位與素材、Meta 像素與轉換 API，以及廣告素材的測試與疲乏。',
  sections: [
    { id: 'structure', title: '帳戶結構與廣告目標', html: `
<pre class="out">廣告活動（選擇目標、預算可設在這一層）
└── 廣告組合（受眾、版位、排程、預算、出價）
      └── 廣告（素材：圖片／影片／輪播、文案、行動呼籲按鈕）</pre>
<table>
<tr><th>廣告目標</th><th>系統會把廣告推給</th></tr>
<tr><td>知名度</td><td>最可能記得廣告的人，追求觸及與曝光</td></tr>
<tr><td>流量</td><td>最可能點擊連結的人</td></tr>
<tr><td>互動</td><td>最可能按讚、留言、傳訊息、觀看影片的人</td></tr>
<tr><td>潛在顧客</td><td>最可能留下聯絡資料的人</td></tr>
<tr><td>應用程式推廣</td><td>最可能安裝或使用 App 的人</td></tr>
<tr><td>銷售業績</td><td>最可能購買的人（需要像素或轉換 API 回傳購買事件）</td></tr>
</table>
<div class="box warn"><b class="t">目標選錯，錢就花錯</b>想賣東西卻選「流量」，系統會找「喜歡點連結但不一定會買」的人。選擇和真正目的一致的目標，讓演算法朝正確方向學習。</div>` },
    { id: 'audience', title: '受眾設定', html: `
<table>
<tr><th>受眾類型</th><th>說明</th><th>例子</th></tr>
<tr><td><b>核心受眾</b></td><td>依地區、年齡、性別、興趣、行為設定</td><td>台灣 25～40 歲、興趣「咖啡」「手沖」</td></tr>
<tr><td><b>自訂受眾</b></td><td>你已經接觸過的人</td><td>近 30 天造訪網站但沒購買、加入購物車的人、粉專互動者、客戶名單</td></tr>
<tr><td><b>類似受眾</b></td><td>和自訂受眾特徵相似的新受眾</td><td>和「過去 180 天購買者」相似的 1% 台灣用戶</td></tr>
<tr><td><b>廣泛受眾</b></td><td>只設最少的限制，讓系統依轉換數據自行尋找</td><td>只設國家與年齡，搭配好的素材</td></tr>
</table>
<p>常見的漏斗組合：用廣泛或興趣受眾做<b>認知</b>（影片），再對看過影片、造訪網站的人做<b>再行銷</b>（優惠、評價）。購買過的人可以排除，或另外推薦回購商品。</p>` },
    { id: 'creative', title: '版位與素材', html: `
<p>Meta 廣告可以出現在 Facebook、Instagram、Messenger 與 Audience Network，版位包括動態消息、限時動態、Reels 等。建議使用自動版位（Advantage+ 版位），並準備適合不同比例的素材：</p>
<table>
<tr><th>比例</th><th>適合版位</th></tr>
<tr><td>1:1 或 4:5（直式）</td><td>動態消息</td></tr>
<tr><td>9:16（全螢幕直式）</td><td>限時動態、Reels</td></tr>
</table>
<p>素材是 Meta 廣告成效最關鍵的因素：</p>
<ul>
<li>前 3 秒就要抓住注意力：直接展示產品使用情境或顧客的痛點。</li>
<li>影片要能在<b>靜音</b>下看懂：加上字幕。</li>
<li>真實感：手機拍攝的使用者風格影片，常比精緻的形象廣告效果好。</li>
<li>同時準備多組素材測試，成效差的關掉、好的增加預算。</li>
</ul>
<p>同一組素材投放久了，看過的人越來越多，點閱率下降、成本上升，稱為<b>廣告疲乏</b>。觀察「頻率」（平均每人看到幾次）與點閱率的變化，定期更新素材。</p>` },
    { id: 'pixel', title: 'Meta 像素與轉換 API', html: `
<p><b>Meta 像素（Pixel）</b>是放在網站上的一段程式碼，會把使用者在網站上的行為（瀏覽商品、加入購物車、購買）回傳給 Meta，用來：衡量廣告帶來多少轉換、建立再行銷受眾、讓系統找到更可能轉換的人。</p>
<p>由於瀏覽器隱私限制與廣告阻擋，只靠瀏覽器端的像素會漏掉部分資料。<b>轉換 API（Conversions API）</b>從網站伺服器直接把事件傳給 Meta，兩者並用可以提高資料的完整度。</p>
<table>
<tr><th>常用標準事件</th><th>意義</th></tr>
<tr><td>ViewContent</td><td>瀏覽商品頁</td></tr>
<tr><td>AddToCart</td><td>加入購物車</td></tr>
<tr><td>InitiateCheckout</td><td>開始結帳</td></tr>
<tr><td>Purchase</td><td>完成購買（帶有金額）</td></tr>
<tr><td>Lead</td><td>留下聯絡資料</td></tr>
</table>` }
  ],
  keypoints: [
    'Meta 廣告結構：廣告活動（目標）→ 廣告組合（受眾、版位、預算）→ 廣告（素材與文案）。',
    '選擇和真正目的一致的廣告目標，系統才會找對人；賣東西要選銷售業績並回傳購買事件。',
    '受眾：核心（人口與興趣）、自訂（接觸過的人）、類似（相似的新受眾）、廣泛（交給演算法）。',
    '素材是成效關鍵：前 3 秒抓住注意、靜音可看懂、真實感，並準備多組測試。',
    '廣告疲乏：頻率上升、點閱率下降時要更新素材。',
    'Meta 像素回傳網站行為，轉換 API 從伺服器傳送事件，兩者並用提高資料完整度。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 50,
  title: '成效指標與漏斗分析',
  summary: '廣告成效的核心指標 CTR、CPC、CPM、CVR、CPA、ROAS 的計算與解讀、損益兩平 ROAS、平均訂單金額、顧客終身價值與顧客取得成本，以及如何從指標找出問題。',
  sections: [
    { id: 'metrics', title: '核心指標', html: `
<table>
<tr><th>指標</th><th>公式</th><th>告訴你什麼</th></tr>
<tr><td>CTR 點閱率</td><td>點擊 ÷ 曝光</td><td>廣告是否吸引人、和受眾是否相關</td></tr>
<tr><td>CPC 每次點擊成本</td><td>花費 ÷ 點擊</td><td>取得一次點擊要花多少錢</td></tr>
<tr><td>CPM 千次曝光成本</td><td>花費 ÷ 曝光 × 1,000</td><td>受眾的競爭程度與曝光成本</td></tr>
<tr><td>CVR 轉換率</td><td>轉換 ÷ 點擊</td><td>到達頁與商品是否能說服人購買</td></tr>
<tr><td>CPA 每次轉換成本</td><td>花費 ÷ 轉換</td><td>取得一筆訂單或名單要多少錢</td></tr>
<tr><td>ROAS 廣告投資報酬率</td><td>廣告營收 ÷ 花費</td><td>每花 1 元廣告費帶回多少營收</td></tr>
</table>
<pre class="js">const ad = { spend: 30000, impressions: 600000, clicks: 9000, orders: 180, revenue: 135000 };
const ctr = ad.clicks / ad.impressions, cpc = ad.spend / ad.clicks, cpm = ad.spend / ad.impressions * 1000;
const cvr = ad.orders / ad.clicks, cpa = ad.spend / ad.orders, roas = ad.revenue / ad.spend;
console.log('CTR', (ctr * 100).toFixed(2) + '%', '| CPC', cpc.toFixed(1), '元 | CPM', cpm.toFixed(0), '元');
console.log('CVR', (cvr * 100).toFixed(2) + '%', '| CPA', cpa.toFixed(0), '元 | ROAS', roas.toFixed(2));
console.log('平均訂單金額 AOV', (ad.revenue / ad.orders).toFixed(0), '元');
console.log('檢查：CPA = CPC ÷ CVR =', (cpc / cvr).toFixed(0), '元');</pre>
<p>注意最後一行：<b>CPA = CPC ÷ CVR</b>。要降低 CPA，可以降低點擊成本（改善素材與相關性），或提高轉換率（改善到達頁與商品）。互動練習中的「廣告成效計算機」可以試算不同情境。</p>` },
    { id: 'breakeven', title: 'ROAS 要多少才賺錢', html: `
<p>ROAS 4 代表花 1 元賺回 4 元營收，但營收不等於利潤。要考慮<b>毛利率</b>（扣掉商品成本後剩下的比例）：</p>
<pre class="out">損益兩平 ROAS ＝ 1 ÷ 毛利率

毛利率 50%  → 損益兩平 ROAS ＝ 2   （ROAS 低於 2 就虧錢）
毛利率 25%  → 損益兩平 ROAS ＝ 4
毛利率 70%  → 損益兩平 ROAS ≈ 1.43</pre>
<pre class="js">function profitFromAds(spend, roas, margin) {
  const revenue = spend * roas;
  return revenue * margin - spend;          // 毛利 − 廣告費
}
for (const roas of [1.5, 2, 3, 4]) {
  console.log(\`ROAS \${roas}：獲利 \${profitFromAds(30000, roas, 0.5).toLocaleString()} 元（毛利率 50%）\`);
}</pre>
<div class="box exam"><b class="t">不要只看 ROAS</b>第一次購買可能不賺錢，但顧客之後會回購。評估時同時考慮顧客終身價值（LTV）：如果新顧客的 LTV 遠高於取得成本，前期的低 ROAS 可能是值得的投資。</div>` },
    { id: 'ltv', title: 'LTV 與 CAC', html: `
<table>
<tr><th>指標</th><th>計算方式（簡化）</th></tr>
<tr><td>CAC 顧客取得成本</td><td>行銷與銷售總成本 ÷ 新顧客數</td></tr>
<tr><td>LTV 顧客終身價值</td><td>平均訂單金額 × 平均購買次數 × 毛利率</td></tr>
</table>
<pre class="js">const aov = 750, purchases = 4, margin = 0.5;
const ltv = aov * purchases * margin;
const cac = 120000 / 300;                       // 本季行銷費用 ÷ 新顧客數
console.log('LTV', ltv, '元｜CAC', cac, '元｜LTV ÷ CAC =', (ltv / cac).toFixed(1));</pre>
<p>一般認為 LTV ÷ CAC 至少要大於 3 才是健康的生意。LTV 太低，可以提升回購（會員、訂閱制、推薦商品）；CAC 太高，要優化廣告與轉換率，或發展口碑與自然流量。</p>` },
    { id: 'diagnose', title: '從指標找問題', html: `
<table>
<tr><th>症狀</th><th>可能原因</th><th>改善方向</th></tr>
<tr><td>CTR 很低</td><td>素材不吸引人、受眾不對、文案不相關</td><td>換素材、調整受眾、文案打中痛點</td></tr>
<tr><td>CTR 高但 CVR 很低</td><td>廣告與到達頁不一致、頁面太慢、價格或運費嚇跑人、結帳流程複雜</td><td>優化到達頁、簡化結帳、加上評價與保證</td></tr>
<tr><td>CPM 突然變高</td><td>旺季競爭激烈（雙 11、年末）、受眾太窄</td><td>擴大受眾、提早布局、預留預算</td></tr>
<tr><td>CPA 逐漸上升</td><td>廣告疲乏、頻率過高</td><td>更新素材、擴大受眾</td></tr>
<tr><td>ROAS 高但總營收很少</td><td>只投放給小量熱門受眾，規模不夠</td><td>在 CPA 可接受的範圍內逐步擴大預算</td></tr>
</table>` }
  ],
  keypoints: [
    'CTR = 點擊 ÷ 曝光、CPC = 花費 ÷ 點擊、CPM = 花費 ÷ 曝光 × 1,000。',
    'CVR = 轉換 ÷ 點擊、CPA = 花費 ÷ 轉換、ROAS = 營收 ÷ 花費；CPA = CPC ÷ CVR。',
    '損益兩平 ROAS = 1 ÷ 毛利率；ROAS 只看營收，要考慮毛利才知道是否賺錢。',
    'LTV = 平均訂單金額 × 購買次數 × 毛利率；CAC = 行銷銷售成本 ÷ 新顧客數；LTV ÷ CAC 宜大於 3。',
    'CTR 低看素材與受眾；CTR 高 CVR 低看到達頁與結帳流程；CPA 上升注意廣告疲乏。',
    '評估廣告不要只看 ROAS，也要看規模與顧客的長期價值。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 45,
  title: 'GA4 與追蹤',
  summary: 'GA4 的事件模型、重要報表與指標、設定關鍵事件（轉換）、用 UTM 標記流量來源、歸因的概念，以及 Google 代碼管理工具與隱私同意。',
  sections: [
    { id: 'ga4', title: 'GA4 的事件模型', html: `
<p><b>Google Analytics 4（GA4）</b>是 Google 的網站與 App 分析工具。和舊版不同，GA4 的所有資料都是<b>事件</b>：瀏覽網頁（page_view）、捲動（scroll）、點擊外部連結（click）、購買（purchase）都是事件，並可以帶有參數（例如購買金額）。</p>
<table>
<tr><th>指標</th><th>意義</th></tr>
<tr><td>使用者</td><td>造訪的人數</td></tr>
<tr><td>工作階段</td><td>一次造訪（一段時間內的連續互動）</td></tr>
<tr><td>互動工作階段</td><td>停留超過 10 秒、有轉換，或瀏覽 2 頁以上的工作階段</td></tr>
<tr><td>互動率</td><td>互動工作階段 ÷ 工作階段（跳出率 = 1 − 互動率）</td></tr>
<tr><td>關鍵事件</td><td>你標記為重要的事件，例如購買、留下名單（舊稱「轉換」）</td></tr>
</table>` },
    { id: 'reports', title: '重要報表', html: `
<table>
<tr><th>報表</th><th>回答的問題</th></tr>
<tr><td>流量開發</td><td>使用者從哪裡來？哪個來源帶來最多轉換？</td></tr>
<tr><td>參與度：網頁和畫面</td><td>哪些頁面最多人看、停留最久？</td></tr>
<tr><td>營利：電子商務購買</td><td>哪些商品賣最好？</td></tr>
<tr><td>使用者屬性</td><td>使用者的國家、裝置、年齡、興趣</td></tr>
<tr><td>探索（自訂報表）</td><td>漏斗探索、路徑探索、區隔比較</td></tr>
</table>
<p>常見的流量管道分組：Organic Search（自然搜尋）、Paid Search（付費搜尋）、Paid Social（付費社群）、Organic Social（自然社群）、Direct（直接輸入）、Referral（其他網站連結）、Email。</p>` },
    { id: 'utm', title: 'UTM：標記流量來源', html: `
<p>在連結後面加上 <b>UTM 參數</b>，GA4 就能分辨流量來自哪個活動、哪個渠道、哪則貼文。沒有 UTM 的社群與 Email 流量，常被歸到「Direct」或錯誤的來源。</p>
<pre class="out">https://www.example.com/subscribe?utm_source=instagram&amp;utm_medium=social&amp;utm_campaign=2026_11_double11&amp;utm_content=reels_brewing</pre>
<table>
<tr><th>參數</th><th>意義</th><th>例子</th></tr>
<tr><td>utm_source（必填）</td><td>流量來源</td><td>google、facebook、instagram、line、newsletter</td></tr>
<tr><td>utm_medium（必填）</td><td>媒介類型</td><td>cpc、social、email、referral</td></tr>
<tr><td>utm_campaign（必填）</td><td>活動名稱</td><td>2026_11_double11</td></tr>
<tr><td>utm_content</td><td>區分同一活動的不同素材或連結</td><td>reels_brewing、banner_a</td></tr>
<tr><td>utm_term</td><td>關鍵字（付費搜尋）</td><td>咖啡豆訂閱</td></tr>
</table>
<div class="box tip"><b class="t">命名要一致</b>團隊統一規則（全部小寫、用底線、固定的 source 名稱），否則 Facebook、facebook、fb 會被當成三個來源。互動練習中的「UTM 產生器」可以依規則產生連結。</div>
<pre class="js">function utm(base, p) {
  const url = new URL(base);
  for (const [k, v] of Object.entries(p)) if (v) url.searchParams.set('utm_' + k, v.trim().toLowerCase().replace(/\\s+/g, '_'));
  return url.toString();
}
console.log(utm('https://www.example.com/subscribe', { source: 'Instagram', medium: 'social', campaign: '2026 11 Double11', content: 'reels brewing' }));</pre>` },
    { id: 'attribution', title: '歸因與隱私', html: `
<p>顧客購買前可能點過 Facebook 廣告、搜尋過品牌、收過 Email。<b>歸因</b>是決定這筆轉換要算給哪個管道：</p>
<table>
<tr><th>歸因方式</th><th>說明</th></tr>
<tr><td>最終點擊</td><td>全部算給購買前最後一次點擊的管道</td></tr>
<tr><td>數據驅動歸因（GA4 預設）</td><td>依實際資料估計每個接觸點的貢獻</td></tr>
</table>
<p>不同平台的歸因方式不同：Meta 廣告管理員回報的轉換數，常和 GA4 看到的不一樣，這是正常的。比較時要知道各自的計算方式，並以同一個工具的趨勢為主。</p>
<p><b>Google 代碼管理工具（GTM）</b>可以在不修改網站程式碼的情況下，管理 GA4、Meta 像素等追蹤代碼。部署追蹤時要遵守隱私規範：在需要的地區提供 Cookie 同意選項，並在隱私權政策中說明蒐集的資料與用途。</p>` }
  ],
  keypoints: [
    'GA4 以事件為基礎：瀏覽、捲動、點擊、購買都是事件，可帶參數。',
    '互動率 = 互動工作階段 ÷ 工作階段，跳出率 = 1 − 互動率；重要的事件標記為關鍵事件（轉換）。',
    '流量開發報表看來源與轉換；探索報表可做漏斗與路徑分析。',
    'UTM 必填 source、medium、campaign，可加 content、term；團隊命名規則要一致。',
    '歸因決定轉換算給哪個管道；GA4 預設數據驅動歸因，各平台數字不同是正常的。',
    'GTM 管理追蹤代碼；部署追蹤要遵守隱私規範並在隱私權政策中說明。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: 'A/B 測試、預算與法規',
  summary: '設計 A/B 測試與判斷結果是否顯著、樣本數的概念、行銷預算的分配方式、撰寫成效報告，以及個人資料保護法、廣告法規與網紅業配揭露。',
  sections: [
    { id: 'ab', title: 'A/B 測試', html: `
<p><b>A/B 測試</b>把受眾隨機分成兩組，分別看到 A 版與 B 版，比較哪個成效好。原則：</p>
<ul>
<li><b>一次只改一個變因</b>：標題、圖片、按鈕文字、價格呈現，才知道是什麼造成差異。</li>
<li>事先定好<b>主要指標</b>（例如轉換率）與測試時間，不要看到數字好就提早結束。</li>
<li>樣本要夠：轉換次數太少時，差異可能只是運氣。</li>
</ul>
<pre class="js">// 兩個比例的 z 檢定：判斷轉換率的差異是否顯著
function abTest(nA, cA, nB, cB) {
  const pA = cA / nA, pB = cB / nB, p = (cA + cB) / (nA + nB);
  const se = Math.sqrt(p * (1 - p) * (1 / nA + 1 / nB));
  const z = (pB - pA) / se;
  return { pA, pB, lift: (pB - pA) / pA, z };
}
for (const [label, r] of [['小樣本', abTest(500, 15, 500, 22)], ['大樣本', abTest(5000, 150, 5000, 220)]]) {
  console.log(\`\${label}：A \${(r.pA * 100).toFixed(1)}% vs B \${(r.pB * 100).toFixed(1)}%，提升 \${(r.lift * 100).toFixed(0)}%，z = \${r.z.toFixed(2)}，\${Math.abs(r.z) &gt;= 1.96 ? '顯著（95% 信心）' : '尚不顯著'}\`);
}</pre>
<p>兩個例子的轉換率完全相同（3.0% vs 4.4%），但小樣本時差異可能只是巧合，大樣本時才足以下結論。互動練習中的「A/B 測試顯著性」可以輸入自己的數據判斷。廣告平台也內建 A/B 測試功能，會自動分流與計算。</p>` },
    { id: 'budget', title: '行銷預算分配', html: `
<table>
<tr><th>方法</th><th>說明</th></tr>
<tr><td>營收比例法</td><td>以預期營收的一定比例作為行銷預算，各產業差異很大</td></tr>
<tr><td>目標反推法</td><td>目標 300 筆訂單 × 可接受 CPA 500 元 = 廣告預算 15 萬元</td></tr>
<tr><td>70/20/10 原則</td><td>70% 放在已驗證有效的渠道、20% 擴展相近的機會、10% 測試新渠道</td></tr>
</table>
<pre class="js">const target = { orders: 300, cpa: 500, aov: 900, margin: 0.55 };
const budget = target.orders * target.cpa;
const revenue = target.orders * target.aov;
console.log('廣告預算：', budget.toLocaleString(), '元');
console.log('預估營收：', revenue.toLocaleString(), '元，ROAS', (revenue / budget).toFixed(2));
console.log('扣除廣告後毛利：', (revenue * target.margin - budget).toLocaleString(), '元');</pre>
<p>這個企劃的 ROAS 1.80 低於損益兩平 ROAS（1 ÷ 0.55 ≈ 1.82），第一次購買就小虧 1,500 元。要讓企劃成立，可以壓低可接受的 CPA、提高客單價（組合商品、免運門檻），或確認顧客的回購能讓 LTV 補回首購的虧損。預算表一定要算到「毛利」，不能只看營收。</p>` },
    { id: 'report', title: '成效報告', html: `
<p>給主管或客戶的成效報告，要從商業目標出發，而不是貼滿數字：</p>
<pre class="out">【11 月雙 11 活動成效報告】
1. 重點摘要：花費 14.8 萬元，帶來營收 63.2 萬元（ROAS 4.27，目標 4），新會員 912 人（目標 800）。
2. 各渠道表現：Google 搜尋 ROAS 6.1 最佳；Meta 再行銷 ROAS 5.2；Meta 新客 ROAS 2.4 但帶來 70% 新會員。
3. 發現：開箱短影片的點閱率是產品圖的 2.3 倍；結帳頁流失率 62%，運費門檻是主因。
4. 下一步建議：12 月把預算往短影片素材移動 20%；測試「滿 999 免運」對轉換率的影響。</pre>` },
    { id: 'law', title: '個資與廣告法規', html: `
<table>
<tr><th>法規與規範</th><th>行銷人要注意</th></tr>
<tr><td>個人資料保護法</td><td>蒐集個資（姓名、電話、Email）要告知蒐集目的、使用範圍與期間，並取得同意；不可超出目的使用；要妥善保管避免外洩</td></tr>
<tr><td>行銷訊息</td><td>提供取消訂閱的方式；使用者拒絕後不再發送</td></tr>
<tr><td>食品、健康食品、化粧品、醫療器材廣告</td><td>不得宣稱療效或誇大功效（例如「治療」「減肥」「美白保證」），違反可能被裁罰</td></tr>
<tr><td>公平交易法</td><td>不得有虛偽不實或引人錯誤的廣告（例如假的原價、不實的比較）</td></tr>
<tr><td>網紅業配</td><td>應清楚揭露合作關係，避免讓消費者誤以為是單純的使用心得</td></tr>
<tr><td>平台廣告政策</td><td>Google、Meta 對特定產業（醫療、金融、酒類）有額外限制，違反會被拒登或停權</td></tr>
</table>
<div class="box warn"><b class="t">本節為一般性說明</b>法規細節與罰則會修訂，不同產品類別有不同的規定。投放特殊產業廣告前，請查閱主管機關的最新規定或諮詢法律專業人士。</div>` }
  ],
  keypoints: [
    'A/B 測試一次只改一個變因，事先定好主要指標與測試時間，樣本要夠才下結論。',
    '同樣的轉換率差異，小樣本可能不顯著、大樣本才顯著；|z| ≥ 1.96 約為 95% 信心。',
    '預算可用營收比例法、目標反推法（訂單數 × 可接受 CPA），並依 70/20/10 分配測試新渠道。',
    '成效報告從商業目標出發：重點摘要、各渠道表現、發現、下一步建議。',
    '個資法：告知目的並取得同意、不超出目的使用、妥善保管；行銷訊息要能取消訂閱。',
    '食品、化粧品等不得宣稱療效；不得虛偽不實廣告；網紅業配須揭露合作關係。'
  ]
}
);
