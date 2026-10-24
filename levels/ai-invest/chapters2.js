/* AI 投資助理實作 實作篇：No Code 自動化 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c06', subject: 2, minutes: 60,
  title: '實作一：Google 試算表選股器',
  summary: '用 IMPORTDATA 匯入證交所每日資料、轉換民國日期、以 FILTER 與 SORT 依條件選股、用 GOOGLEFINANCE 建立觀察名單與走勢小圖，並讓 AI 協助寫公式。',
  sections: [
    { id: 'import', title: '步驟 1：匯入官方資料', html: `
<p>建立新的 Google 試算表，新增兩個工作表，分別命名為「<b>估值</b>」與「<b>行情</b>」。</p>
<pre class="out">「估值」工作表 A1 儲存格：
=IMPORTDATA("https://www.twse.com.tw/exchangeReport/BWIBBU_ALL?response=open_data")

「行情」工作表 A1 儲存格：
=IMPORTDATA("https://www.twse.com.tw/exchangeReport/STOCK_DAY_ALL?response=open_data")</pre>
<div class="table-wrap"><table>
<tr><th>工作表</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>…</th><th>I</th></tr>
<tr><td>估值</td><td>日期</td><td>股票代號</td><td>股票名稱</td><td>本益比</td><td>殖利率(%)</td><td>股價淨值比</td><td></td><td></td></tr>
<tr><td>行情</td><td>日期</td><td>證券代號</td><td>證券名稱</td><td>成交股數</td><td>成交金額</td><td>開盤價</td><td>…</td><td>收盤價</td></tr>
</table></div>
<ul>
  <li>IMPORTDATA 會定期自動重新抓取，不需手動更新。</li>
  <li>若顯示錯誤，可能是網站暫時無法連線，稍後再試；或改用第 7 章的 n8n 流程寫入試算表。</li>
</ul>
<h3>轉換民國日期</h3>
<pre class="out">=DATE(LEFT(A2,3)+1911, MID(A2,4,2), RIGHT(A2,2))
→ 1151016 轉為 2026/10/16</pre>
<div class="box warn"><b class="t">代號的前導 0</b>試算表可能把 <code>0050</code> 自動轉成數字 <code>50</code>。兩個工作表都被同樣轉換時查詢仍能對上；要顯示原本代號可用 <code>=TEXT(B2,"0000")</code>。</div>` },
    { id: 'filter', title: '步驟 2：條件選股', html: `
<p>新增「<b>選股</b>」工作表，在 A1 輸入標題列，A2 輸入公式：</p>
<pre class="out">=SORT(
  FILTER(估值!B2:F,
         估值!D2:D > 0,        本益比大於 0（排除虧損）
         估值!D2:D <= 15,      本益比 15 倍以下
         估值!E2:E >= 4,       殖利率 4% 以上
         估值!F2:F <= 1.5),    股價淨值比 1.5 以下
  4, FALSE)                    依第 4 欄（殖利率）由高到低排序</pre>
<p>（實際輸入時請刪除每行後面的中文說明。）</p>
<p>在 F2 加上收盤價（向下填滿）：</p>
<pre class="out">=XLOOKUP(A2, 行情!B:B, 行情!I:I, "")</pre>
<div class="box tip"><b class="t">條件設計</b>條件要能說出理由，例如「本益比低 + 殖利率高」是價值型篩選，但可能篩到獲利衰退的公司，所以第二步要再看月營收與獲利趨勢。<b>篩選結果是觀察名單，不是買進清單。</b></div>
<h3>把條件放在儲存格</h3>
<p>把門檻值放在「設定」工作表（例如 B1 = 15），公式改成 <code>估值!D2:D &lt;= 設定!B1</code>，之後只要改數字，不用改公式。</p>` },
    { id: 'watch', title: '步驟 3：觀察名單與走勢', html: `
<p>新增「<b>觀察名單</b>」工作表，A 欄輸入代號（例如 2330），其他欄位：</p>
<pre class="out">B 欄 現價：
=GOOGLEFINANCE("TPE:"&amp;A2, "price")

C 欄 近 90 天收盤平均（約等於季線）：
=AVERAGE(INDEX(GOOGLEFINANCE("TPE:"&amp;A2, "close", TODAY()-90, TODAY()), 0, 2))

D 欄 與季線差距：
=B2/C2-1

E 欄 走勢小圖：
=SPARKLINE(GOOGLEFINANCE("TPE:"&amp;A2, "price", TODAY()-90, TODAY()))</pre>
<ul>
  <li>用<b>條件式格式</b>把 D 欄小於 0（跌破季線）標成紅色。</li>
  <li>GOOGLEFINANCE 報價可能延遲；上櫃股票若顯示 #N/A，改用櫃買中心資料。</li>
  <li>INDEX(…, 0, 2) 取出歷史資料的第 2 欄（收盤價），AVERAGE 會自動忽略標題文字。</li>
</ul>` },
    { id: 'ai', title: '讓 AI 幫你寫公式', html: `
<pre class="out">我在 Google 試算表有一個「估值」工作表：
B 欄股票代號、C 欄名稱、D 欄本益比、E 欄殖利率、F 欄股價淨值比，第 1 列是標題。
請寫一個公式，篩選本益比介於 0 到 20、殖利率大於 3 的股票，
依股價淨值比由低到高排序，並逐段解釋公式。</pre>
<p>AI 很擅長寫公式，但請<b>用幾筆資料手動驗算</b>結果是否正確；欄位位置寫錯是最常見的錯誤。</p>` }
  ],
  keypoints: [
    'IMPORTDATA 可直接讀取證交所 CSV（response=open_data）',
    '民國日期：=DATE(LEFT(A2,3)+1911, MID(A2,4,2), RIGHT(A2,2))',
    'FILTER 篩選、SORT 排序、XLOOKUP 合併兩張表',
    '本益比 > 0 可排除虧損公司',
    'GOOGLEFINANCE("TPE:"&代號) 取得報價與歷史資料',
    '門檻放在設定儲存格，方便調整',
    '篩選結果是觀察名單，不是買進清單'
  ]
},
{
  id: 'c07', subject: 2, minutes: 60,
  title: '實作二：n8n 每日盤後 AI 摘要流程',
  summary: '認識 n8n 與 Make、設計排程觸發、用 HTTP Request 取得 API 資料、篩選觀察名單、檢查資料日期，再交給 AI 產生固定格式的盤後摘要。',
  sections: [
    { id: 'tools', title: '自動化工具選擇', html: `
<div class="table-wrap"><table>
<tr><th>工具</th><th>特點</th><th>費用</th></tr>
<tr><td><b>n8n</b></td><td>視覺化節點流程、AI 節點完整、可自架</td><td>自架社群版免費；官方雲端為付費（有試用）</td></tr>
<tr><td><b>Make</b></td><td>介面直覺、模組多</td><td>免費方案有每月執行量上限</td></tr>
<tr><td>Zapier</td><td>整合服務最多</td><td>免費方案功能較少</td></tr>
<tr><td>Google Apps Script</td><td>與試算表整合最緊密，需寫少量程式</td><td>免費</td></tr>
</table></div>
<p>本章以 n8n 示範，概念可直接套用到 Make。各工具的方案與價格常調整，請以官網為準。</p>` },
    { id: 'flow', title: '流程設計', html: `
<div class="flow">
  <div><b>1. Schedule Trigger</b><span>週一至週五晚上 19:00</span></div>
  <div><b>2. HTTP Request</b><span>抓 BWIBBU_ALL 估值資料</span></div>
  <div><b>3. HTTP Request</b><span>抓 STOCK_DAY_ALL 行情資料</span></div>
  <div><b>4. Merge</b><span>以 Code 欄位合併兩份資料</span></div>
  <div><b>5. Filter</b><span>只留下觀察名單或符合條件的股票</span></div>
  <div><b>6. IF</b><span>資料日期是否為今天？不是就停止</span></div>
  <div><b>7. AI 節點</b><span>產生盤後摘要</span></div>
  <div><b>8. Telegram／Gmail</b><span>推播（第 8 章）</span></div>
</div>
<ul>
  <li><b>排程時間</b>：官方資料在收盤後一段時間才更新，建議晚上執行，並以第 6 步確認資料日期。</li>
  <li><b>HTTP Request</b>：Method 選 GET，URL 填入第 5 章的端點，回應格式選 JSON。</li>
  <li><b>Merge</b>：選擇「依欄位合併」，兩邊都用 <code>Code</code>。</li>
  <li><b>Filter</b>：例如「Code 包含於 2330, 2317, 0050」，或「DividendYield 大於 4」。數字比較前要確認欄位已轉為數字型別。</li>
</ul>` },
    { id: 'date', title: '資料日期檢查', html: `
<p>假日或資料尚未更新時，API 會回傳舊資料。若不檢查，你會收到「昨天的資料當成今天」的錯誤摘要。</p>
<pre class="out">IF 節點條件（n8n 運算式）：
{{ $json.Date }}  等於  {{ ($now.year - 1911) + $now.toFormat('MMdd') }}

說明：1151016 = 民國年 115 + 月日 1016</pre>
<p>條件不成立時，可以走另一條路徑發送「今日無新資料」或直接結束。</p>` },
    { id: 'aistep', title: 'AI 摘要節點', html: `
<p>使用 n8n 的 AI 節點（如 Basic LLM Chain 或 AI Agent），連接 OpenAI、Google Gemini 或 Anthropic 等模型憑證。提示詞範例：</p>
<pre class="out">你是投資研究助理。以下是我的觀察名單今天的收盤資料（JSON）：
{{ JSON.stringify($input.all().map(i =&gt; i.json)) }}

請用繁體中文產生盤後摘要：
1. 一句話總結今天觀察名單的整體變化
2. 表格：代號／名稱／收盤價／漲跌／本益比／殖利率
3. 列出漲跌幅超過 3% 的股票
規則：
- 所有數字只能來自上方資料，不得自行補充或推算
- 不提供買賣建議
- 總長度 300 字以內</pre>
<div class="box warn"><b class="t">數字不經 AI 改寫</b>表格中的數字最好由流程直接組成文字，AI 只負責寫總結句。這樣即使 AI 產生幻覺，關鍵數字仍然正確。</div>
<h3>用 Make 實作的對應模組</h3>
<p>Scheduler（排程）→ HTTP: Make a request → Iterator／Array aggregator → Filter → OpenAI 或 Gemini 模組 → Telegram Bot: Send a message。</p>` }
  ],
  keypoints: [
    'n8n 自架社群版免費；Make 免費方案有執行量上限',
    '流程：排程 → HTTP 取資料 → 合併 → 篩選 → 日期檢查 → AI → 通知',
    '官方資料收盤後才更新，排程放晚上並檢查資料日期',
    '數字比較前確認欄位已轉為數字',
    'AI 只寫總結，關鍵數字由流程直接帶入'
  ]
},
{
  id: 'c08', subject: 2, minutes: 45,
  title: '實作三：推播通知與盯盤警示',
  summary: '設定 Telegram Bot、LINE Messaging API、Email 與 Discord 通知，設計價格、均線、成交量等警示條件，並避免重複通知與警示疲乏。',
  sections: [
    { id: 'channels', title: '通知管道', html: `
<div class="table-wrap"><table>
<tr><th>管道</th><th>設定方式</th><th>注意事項</th></tr>
<tr><td><b>Telegram Bot</b></td><td>與 @BotFather 對話建立機器人取得 <b>Bot Token</b>；先傳訊息給你的機器人，再取得自己的 <b>Chat ID</b></td><td>免費、設定簡單，最推薦</td></tr>
<tr><td><b>LINE Messaging API</b></td><td>建立 LINE 官方帳號並啟用 Messaging API，取得 Channel Access Token 與使用者 ID</td><td>主動推播訊息會計入官方帳號方案的每月則數</td></tr>
<tr><td><b>Email</b></td><td>使用 Gmail 節點或 SMTP</td><td>適合較長的每日報告</td></tr>
<tr><td><b>Discord</b></td><td>在頻道設定建立 Webhook 網址</td><td>免費，適合多人或多頻道分類</td></tr>
</table></div>
<div class="box warn"><b class="t">LINE Notify 已停止服務</b>LINE Notify 已於 2025 年 3 月 31 日結束服務，網路上舊教學中的 LINE Notify 做法已無法使用，請改用 Messaging API 或其他管道。</div>
<h3>Telegram 設定步驟</h3>
<pre class="out">1. 在 Telegram 搜尋 @BotFather，輸入 /newbot，依指示命名
2. 取得 Bot Token（格式類似 123456789:ABC...），妥善保管
3. 搜尋你的機器人並傳送任意訊息
4. 瀏覽器開啟 https://api.telegram.org/bot&lt;你的Token&gt;/getUpdates
   在回應中找到 "chat":{"id":…}，這就是 Chat ID
5. 在 n8n 新增 Telegram 憑證填入 Token，Telegram 節點填入 Chat ID</pre>` },
    { id: 'alerts', title: '警示條件設計', html: `
<div class="table-wrap"><table>
<tr><th>警示</th><th>條件範例</th><th>用途</th></tr>
<tr><td>價格門檻</td><td>收盤價低於你設定的觀察價</td><td>提醒自己重新評估</td></tr>
<tr><td>均線突破</td><td>收盤價由上往下跌破季線</td><td>趨勢轉變提醒</td></tr>
<tr><td>成交量異常</td><td>成交量大於近 20 日平均的 2 倍</td><td>可能有重大消息</td></tr>
<tr><td>估值變化</td><td>殖利率高於 5% 或本益比低於歷史區間</td><td>價值型觀察</td></tr>
<tr><td>月營收</td><td>月營收年增率由正轉負</td><td>基本面變化</td></tr>
</table></div>
<h3>避免警示疲乏</h3>
<ul>
  <li><b>只通知「狀態改變」</b>：跌破季線那天通知一次，之後持續在季線下就不再重複。做法是把上次狀態記錄在試算表，與今天比較。</li>
  <li><b>合併通知</b>：每天一則彙整訊息，而不是每檔一則。</li>
  <li><b>分級</b>：重要警示即時推播，一般資訊放每日報告。</li>
  <li>通知太多時，你會開始忽略它，等於沒有通知。</li>
</ul>` },
    { id: 'gas', title: '進階：試算表直接發 Telegram', html: `
<p>如果只想用試算表，可在「擴充功能 → Apps Script」貼上以下程式，再設定「時間驅動」觸發條件每天執行。</p>
<pre class="out">function sendDailyAlert() {
  const token = PropertiesService.getScriptProperties().getProperty('TG_TOKEN');
  const chatId = PropertiesService.getScriptProperties().getProperty('TG_CHAT');
  const sheet = SpreadsheetApp.getActive().getSheetByName('觀察名單');
  const rows = sheet.getRange('A2:D20').getValues().filter(r =&gt; r[0] &amp;&amp; r[3] &lt; 0);
  if (!rows.length) return;
  const text = '跌破季線：\\n' + rows.map(r =&gt; r[0] + ' 現價 ' + r[1]).join('\\n');
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'post',
    payload: { chat_id: chatId, text: text }
  });
}</pre>
<p>Token 存在「專案設定 → 指令碼屬性」，不要直接寫在程式或儲存格中。</p>` }
  ],
  keypoints: [
    'Telegram：@BotFather 取得 Bot Token，getUpdates 取得 Chat ID',
    'LINE Notify 已於 2025/3/31 停止，改用 Messaging API（推播計入方案則數）',
    '警示條件：價格門檻、均線突破、量能異常、估值、月營收',
    '只通知狀態改變、合併通知、分級，避免警示疲乏',
    'Token 存在憑證或指令碼屬性，不寫在程式與儲存格'
  ]
},
{
  id: 'c09', subject: 2, minutes: 50,
  title: '回測與績效評估',
  summary: '回測的意義與做法、總報酬與年化報酬、最大回撤、波動度與夏普比率、交易成本，以及前視偏差、倖存者偏差、過度最佳化等陷阱。',
  sections: [
    { id: 'what', title: '什麼是回測', html: `
<p><b>回測（Backtest）</b>是把一套明確的規則套用在歷史資料上，看看「如果過去照這樣做會怎樣」。它能幫你淘汰明顯不好的想法，但<strong>不能證明未來會賺錢</strong>。</p>
<h3>No Code 回測方式</h3>
<ul>
  <li><b>試算表</b>：用 GOOGLEFINANCE 抓歷史收盤價，新增「訊號」「持有」「每日報酬」欄位逐日計算。</li>
  <li><b>看盤軟體內建回測</b>：部分平台提供內建策略與回測報告。</li>
  <li><b>請 AI 撰寫回測程式</b>：可以快速產生，但必須逐行檢查邏輯，尤其是否偷看未來資料。</li>
</ul>
<div class="box tip"><b class="t">一定要有比較基準</b>策略報酬要和「直接買進持有大盤（例如市值型 ETF）」比較。打不過大盤的複雜策略，不如直接買指數。</div>` },
    { id: 'metrics', title: '績效指標', html: `
<div class="table-wrap"><table>
<tr><th>指標</th><th>公式</th><th>意義</th></tr>
<tr><td><b>總報酬率</b></td><td>期末 ÷ 期初 − 1</td><td>整段期間賺多少</td></tr>
<tr><td><b>年化報酬率 CAGR</b></td><td>（期末 ÷ 期初）^(1 ÷ 年數）− 1</td><td>換算成每年平均複利，方便比較不同長度的期間</td></tr>
<tr><td><b>最大回撤 MDD</b></td><td>（谷底 − 前高）÷ 前高 的最小值</td><td>最慘曾經從高點跌多少，代表你要承受的痛苦</td></tr>
<tr><td><b>年化波動度</b></td><td>日報酬標準差 × √252（約略）</td><td>報酬上下起伏的程度</td></tr>
<tr><td><b>夏普比率</b></td><td>（年化報酬 − 無風險利率）÷ 年化波動度</td><td>每承擔一單位風險換來多少超額報酬</td></tr>
<tr><td>勝率、盈虧比</td><td>獲利次數 ÷ 交易次數；平均獲利 ÷ 平均虧損</td><td>勝率低但盈虧比高也可能賺錢</td></tr>
</table></div>
<div class="box analogy"><b class="t">計算範例</b>100 萬投資 4 年變成 146.41 萬：總報酬 46.41%，年化報酬 = 1.4641^(1/4) − 1 = 10%。若期間資產曾從 130 萬跌到 91 萬，最大回撤 = (91 − 130) ÷ 130 = −30%。</div>
<p>可以到「互動練習」用<b>最大回撤計算器</b>輸入一串淨值試算。</p>` },
    { id: 'traps', title: '回測的陷阱', html: `
<div class="table-wrap"><table>
<tr><th>陷阱</th><th>說明</th><th>避免方法</th></tr>
<tr><td><b>前視偏差</b><br><small>Look-ahead Bias</small></td><td>用到當時還不知道的資訊，例如用「今天收盤價」決定「今天開盤買進」，或用尚未公布的財報</td><td>訊號只能用前一天以前的資料；財報以公布日為準</td></tr>
<tr><td><b>倖存者偏差</b><br><small>Survivorship Bias</small></td><td>只用「現在還存在」的股票回測，漏掉已下市的失敗公司，結果過度樂觀</td><td>使用包含下市股票的資料</td></tr>
<tr><td><b>過度最佳化</b><br><small>Overfitting</small></td><td>反覆調參數直到歷史績效完美，但只是剛好符合過去的雜訊</td><td>參數越少越好；保留一段資料不參與調整做樣本外測試</td></tr>
<tr><td><b>忽略成本</b></td><td>沒扣手續費、證交稅、滑價</td><td>每筆交易扣除實際成本，頻繁交易的策略特別要注意</td></tr>
<tr><td><b>未還原股價</b></td><td>除權息造成價格下跌，被誤判為虧損或賣出訊號</td><td>使用還原權息後的價格</td></tr>
</table></div>
<div class="box warn"><b class="t">看到完美的回測要更小心</b>年化報酬極高、幾乎沒有回撤的回測，通常是犯了上面某個錯誤，而不是找到聖杯。</div>` }
  ],
  keypoints: [
    '回測只能淘汰壞想法，不能證明未來會賺錢',
    '策略要和買進持有大盤比較',
    'CAGR =（期末 ÷ 期初）^(1 ÷ 年數）− 1',
    '最大回撤 =（谷底 − 前高）÷ 前高',
    '夏普比率 =（年化報酬 − 無風險利率）÷ 年化波動度',
    '三大陷阱：前視偏差、倖存者偏差、過度最佳化；另需扣成本、用還原股價'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '風險控管與自動化安全',
  summary: '部位規模與停損、分散與資產配置、再平衡、定期定額與複利，以及自動化流程的資料異常、金鑰安全、錯誤監控與為什麼不自動下單。',
  sections: [
    { id: 'position', title: '部位控管與停損', html: `
<p>控制「每一筆交易最多虧多少」，比預測漲跌更重要。常見做法是單筆最大虧損不超過總資金的 1～2%。</p>
<p class="mono center">可買股數 = 總資金 × 單筆風險% ÷（進場價 − 停損價）</p>
<div class="box analogy"><b class="t">計算範例</b>總資金 100 萬，單筆風險 1%（最多虧 1 萬），進場價 100 元、停損價 92 元，每股風險 8 元。可買 10,000 ÷ 8 = 1,250 股，投入金額 12.5 萬元。</div>
<ul>
  <li><b>分散</b>：單一個股、單一產業設定上限，避免一次重大事件造成嚴重損失。</li>
  <li><b>停損</b>要在買進前決定，並寫進自己的規則；臨場才決定通常會猶豫。</li>
</ul>
<p>可以到「互動練習」使用<b>部位規模計算器</b>。</p>` },
    { id: 'allocation', title: '資產配置與再平衡', html: `
<ul>
  <li><b>資產配置</b>：依年齡、目標與風險承受度決定股票與債券、現金的比例。決定長期報酬與波動的主要因素往往是配置，而非選股。</li>
  <li><b>緊急預備金</b>：先準備數個月生活費，再開始投資，避免急需用錢時被迫在低點賣出。</li>
  <li><b>再平衡</b>：股市大漲後股票比例會變高，定期把比例調回原本設定。方式有<b>定期再平衡</b>（如每年一次）與<b>門檻再平衡</b>（偏離超過如 5 個百分點才調整）。</li>
  <li><b>定期定額</b>：固定時間投入固定金額，分散進場時點，適合搭配指數型 ETF。</li>
  <li><b>72 法則</b>：資產翻倍年數約等於 72 ÷ 年報酬率（%）。年報酬 6% 約 12 年翻倍。</li>
</ul>
<p>可以到「互動練習」使用<b>定期定額複利試算</b>。</p>` },
    { id: 'safety', title: '自動化流程的安全檢查', html: `
<div class="table-wrap"><table>
<tr><th>風險</th><th>例子</th><th>對策</th></tr>
<tr><td><b>資料異常</b></td><td>API 回傳空資料、價格為 0、日期沒更新</td><td>加入檢查節點，異常時發「資料異常」通知，而不是照常產生摘要</td></tr>
<tr><td><b>來源改版</b></td><td>官方 API 欄位名稱或網址變更</td><td>設定錯誤通知，定期檢查流程</td></tr>
<tr><td><b>金鑰外洩</b></td><td>把 API Key、Bot Token 貼在共用試算表或截圖分享</td><td>存放在工具的憑證管理；外洩時立即撤銷重發</td></tr>
<tr><td><b>AI 幻覺</b></td><td>摘要中出現資料裡沒有的數字或新聞</td><td>數字由流程帶入；提示詞要求只用提供的資料</td></tr>
<tr><td><b>流程靜默失敗</b></td><td>流程壞了好幾天都沒發現</td><td>n8n 可設定錯誤觸發流程（Error Trigger）在失敗時通知你</td></tr>
</table></div>
<div class="box warn"><b class="t">為什麼不自動下單</b>本課程的流程只做到「通知」。自動下單一旦遇到資料錯誤、重複執行或 AI 誤判，會直接造成金錢損失；券商的程式交易也需另外申請與承擔更高風險。建議所有交易都由你親自確認後執行。</div>
<h3>寫下你的投資規則</h3>
<p>把投資目標、資產配置比例、選股條件、單筆風險上限、停損規則、再平衡方式寫成一頁文件，並放進第 4 章的 AI 助理知識檔。之後 AI 的每次分析都會以你的規則為準。</p>` }
  ],
  keypoints: [
    '單筆風險常設在總資金的 1～2%',
    '可買股數 = 總資金 × 風險% ÷（進場價 − 停損價）',
    '停損在買進前決定；分散單一個股與產業',
    '再平衡：定期或門檻；先備緊急預備金',
    '72 法則：翻倍年數 ≈ 72 ÷ 年報酬率',
    '自動化要檢查資料異常、保護金鑰、設定錯誤通知',
    '只做通知，不自動下單'
  ]
}
);
