/* AI 投資助理實作 觀念篇：AI 與投資研究 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 35,
  title: 'AI 投資的能與不能：觀念、法規與防詐',
  summary: 'AI 在投資研究中適合與不適合做的事、本課程要完成的成品、投顧法規的界線，以及 AI 時代常見的投資詐騙手法。',
  sections: [
    { id: 'goal', title: '課程目標與成品', html: `
<p>這門課要做的是一個<strong>投資研究助理</strong>，不是會幫你賺錢的明牌機器。完成後你會有：</p>
<div class="concepts">
  <div class="concept"><b>AI 研究助理</b><span>依你的投資原則解讀財報、新聞，並固定格式輸出重點</span></div>
  <div class="concept"><b>試算表選股器</b><span>每天自動抓取台股資料，依你的條件篩選出觀察名單</span></div>
  <div class="concept"><b>盤後自動摘要</b><span>每天收盤後自動整理觀察名單的變化，推播到手機</span></div>
  <div class="concept"><b>風險控管工具</b><span>部位計算、回撤檢查與自己的投資規則</span></div>
</div>
<div class="box warn"><b class="t">重要聲明</b>本課程是工具與方法的教學，<b>不提供任何個股的買賣建議</b>。課程中出現的股票代號只用來示範操作。投資有風險，請自行判斷並承擔結果。</div>` },
    { id: 'can', title: 'AI 適合與不適合做的事', html: `
<div class="table-wrap"><table>
<tr><th>適合交給 AI</th><th>不適合交給 AI</th></tr>
<tr><td>整理大量文字：法說會逐字稿、新聞、年報重點</td><td><b>預測明天股價</b>：市場受太多隨機因素影響</td></tr>
<tr><td>用固定格式比較多家公司的財務數字</td><td>提供即時、精確的報價（可能是舊資料或幻覺）</td></tr>
<tr><td>解釋不懂的名詞與財報科目</td><td>代替你做買賣決定並承擔責任</td></tr>
<tr><td>依你寫好的規則檢查清單是否符合</td><td>計算大量數字而不經驗證</td></tr>
<tr><td>寫出試算表公式、自動化流程的設定步驟</td><td>判斷消息真假（需要你回到原始來源查證）</td></tr>
</table></div>
<div class="box tip"><b class="t">本課程的原則</b><b>數字交給資料、文字交給 AI、決策留給自己。</b>股價、本益比這類數字一律從官方資料抓取，AI 只負責整理文字與提醒。</div>
<h3>為什麼 AI 不能直接告訴你買什麼</h3>
<ul>
  <li><b>幻覺</b>：AI 可能編造財報數字、法說會內容或新聞。</li>
  <li><b>資料時效</b>：模型的訓練資料有截止日期，沒有連網或沒有給資料時，不知道最新股價。</li>
  <li><b>迎合提問</b>：問「某檔股票會漲嗎」，AI 容易順著你的期待回答。</li>
  <li><b>同時問很多人也會錯</b>：多個 AI 意見一致不代表正確，仍需回到原始數據。</li>
</ul>` },
    { id: 'law', title: '法規界線：自己用和對外收費不一樣', html: `
<p>依《證券投資信託及顧問法》，<strong>向他人收取報酬，並提供有價證券的分析意見或推介建議</strong>，屬於證券投資顧問業務，必須取得主管機關許可。未經許可經營可能觸犯刑事責任（罰則見該法第 107 條）。</p>
<div class="table-wrap"><table>
<tr><th>情境</th><th>風險</th></tr>
<tr><td>自己用 AI 研究、自己決定買賣</td><td>個人投資行為，沒有投顧法問題</td></tr>
<tr><td>教別人怎麼使用工具、怎麼讀財報</td><td>屬工具與知識教學，但應避免夾帶個股買賣建議</td></tr>
<tr><td><b>把 AI 選出的個股做成付費群組、付費訂閱推薦</b></td><td><b>可能構成非法經營投顧業務</b></td></tr>
<tr><td>販售「AI 自動選股訊號」給會員</td><td>同上，風險很高</td></tr>
</table></div>
<p>本課程的自動化流程只用於<b>自己的研究</b>。若要對外分享，請只分享方法，不要分享「買哪一檔」。</p>` },
    { id: 'fraud', title: 'AI 時代的投資詐騙', html: `
<ul>
  <li><b>假冒名人投資群組</b>：以知名財經人士的照片、甚至 AI 深偽影片在社群廣告引流，加入 LINE 群組後誘導下載假投資 App。</li>
  <li><b>「AI 量化飆股」話術</b>：宣稱有 AI 系統保證獲利、穩賺不賠，先讓你小額獲利再要求加碼。</li>
  <li><b>假老師、假助理</b>：一對一私訊、要求匯款到個人帳戶或購買虛擬貨幣。</li>
</ul>
<div class="box warn"><b class="t">辨識原則</b>保證獲利、要求匯款到個人帳戶、要求下載非官方 App、名人主動加你好友，幾乎都是詐騙。有疑慮請撥打 <b>165 反詐騙專線</b>。正規投資只會透過持有執照的券商下單。</div>` }
  ],
  keypoints: [
    'AI 是研究助理，不是理專；決策與責任在自己',
    '數字交給官方資料、文字交給 AI、決策留給自己',
    'AI 可能幻覺、資料過時、迎合提問',
    '收費提供個股分析或推介建議需投顧許可',
    '保證獲利、匯款到個人帳戶、非官方 App 都是詐騙警訊；165 反詐騙專線'
  ]
},
{
  id: 'c02', subject: 1, minutes: 50,
  title: '投資分析基本功：基本面、技術面、籌碼面',
  summary: '台股交易基本規則與成本、三大財報與常用財務指標、均線與常見技術指標、三大法人與融資融券，以及 ETF 與指數化投資。',
  sections: [
    { id: 'rules', title: '台股交易基本規則', html: `
<div class="table-wrap"><table>
<tr><th>項目</th><th>內容</th></tr>
<tr><td>交易時間</td><td>集中市場一般交易 9:00～13:30；另有盤後交易與零股交易</td></tr>
<tr><td>漲跌幅</td><td>上市櫃股票每日 ±10%</td></tr>
<tr><td>交割</td><td><b>T+2</b>：成交後第二個營業日扣款或入帳</td></tr>
<tr><td>手續費</td><td>上限 0.1425%，<b>買進與賣出各收一次</b>，券商常有折扣</td></tr>
<tr><td>證券交易稅</td><td>賣出時收取：股票 0.3%、ETF 0.1%</td></tr>
<tr><td>上市與上櫃</td><td>上市在證交所（TWSE）、上櫃在櫃買中心（TPEx），資料來源不同</td></tr>
</table></div>
<div class="box analogy"><b class="t">成本計算</b>買進 10 萬元、賣出 11 萬元（股票），不計折扣：買手續費 142 元、賣手續費 156 元、證交稅 330 元，合計約 628 元。頻繁進出時，成本會明顯侵蝕報酬。</div>` },
    { id: 'fund', title: '基本面：公司賺不賺錢', html: `
<h3>三大財報</h3>
<div class="concepts">
  <div class="concept"><b>損益表</b><span>一段期間賺多少：營收、毛利、營業利益、稅後淨利、EPS</span></div>
  <div class="concept"><b>資產負債表</b><span>某一時點的家底：資產、負債、股東權益</span></div>
  <div class="concept"><b>現金流量表</b><span>現金實際進出：營業、投資、籌資現金流</span></div>
</div>
<div class="table-wrap"><table>
<tr><th>指標</th><th>公式</th><th>意義</th></tr>
<tr><td><b>EPS 每股盈餘</b></td><td>稅後淨利 ÷ 流通股數</td><td>每一股賺多少錢</td></tr>
<tr><td><b>本益比 PE</b></td><td>股價 ÷ EPS</td><td>用幾年的獲利買這家公司；需與同業或歷史比較</td></tr>
<tr><td><b>股價淨值比 PB</b></td><td>股價 ÷ 每股淨值</td><td>常用於金融、景氣循環股</td></tr>
<tr><td><b>殖利率</b></td><td>每股股利 ÷ 股價</td><td>現金股利的報酬率</td></tr>
<tr><td><b>ROE 股東權益報酬率</b></td><td>稅後淨利 ÷ 股東權益</td><td>用股東的錢賺錢的效率</td></tr>
<tr><td>毛利率</td><td>毛利 ÷ 營收</td><td>產品競爭力與定價能力</td></tr>
<tr><td>月營收年增率</td><td>（本月營收 − 去年同月）÷ 去年同月</td><td>台股特有的高頻數據，每月 10 日前公布</td></tr>
</table></div>
<div class="box warn"><b class="t">常見誤解</b>本益比低不一定便宜，可能是市場預期獲利會衰退；殖利率高可能是股價大跌造成。數字要搭配趨勢與產業一起看。</div>` },
    { id: 'tech', title: '技術面：價格與成交量', html: `
<div class="table-wrap"><table>
<tr><th>指標</th><th>說明</th></tr>
<tr><td><b>移動平均線 MA</b></td><td>過去 N 日收盤價平均。常用 5 日（週線）、20 日（月線）、60 日（季線）</td></tr>
<tr><td>黃金交叉／死亡交叉</td><td>短均線由下往上穿越長均線稱黃金交叉，反之為死亡交叉</td></tr>
<tr><td><b>成交量</b></td><td>價格變動時量是否放大，用來判斷動能</td></tr>
<tr><td>KD、RSI</td><td>衡量短期漲跌強弱，常見於判斷過熱或超賣，但在強勢趨勢中可能長期鈍化</td></tr>
<tr><td>MACD</td><td>以長短期均線差判斷趨勢方向與動能</td></tr>
</table></div>
<p>技術指標都是<b>由歷史價格計算</b>出來的，只能描述過去，不能保證未來。本課程用它們來設定「提醒條件」，例如收盤價跌破季線時通知你去看一下。</p>` },
    { id: 'chip', title: '籌碼面與 ETF', html: `
<h3>籌碼面：誰在買賣</h3>
<ul>
  <li><b>三大法人</b>：外資、投信、自營商。證交所每日公布各股買賣超。</li>
  <li><b>融資融券</b>：融資是借錢買股、融券是借股票賣出。融資大增常代表散戶槓桿升高。</li>
  <li><b>集保股權分散表</b>：每週公布，可觀察大戶與散戶持股比例變化。</li>
</ul>
<h3>ETF 與指數化投資</h3>
<ul>
  <li><b>ETF</b>：追蹤指數的基金，可像股票一樣買賣，一次分散投資多檔股票。</li>
  <li>市值型（如追蹤台灣 50 指數）、高股息型、債券型、主動式 ETF 等，策略與費用不同。</li>
  <li>選 ETF 時看：追蹤的指數與選股邏輯、<b>總費用率</b>、規模與流動性、<b>折溢價</b>。</li>
</ul>
<div class="box tip"><b class="t">實作提醒</b>本課程的選股器也能用來追蹤 ETF，例如觀察折溢價與成交量是否異常。</div>` }
  ],
  keypoints: [
    '台股 T+2 交割、漲跌幅 ±10%',
    '手續費買賣各收 0.1425%（上限）；證交稅賣出股票 0.3%、ETF 0.1%',
    '本益比 = 股價 ÷ EPS；殖利率 = 股利 ÷ 股價；ROE = 淨利 ÷ 權益',
    '月營收每月 10 日前公布，是台股特有的高頻數據',
    'MA5、MA20、MA60 分別為週線、月線、季線',
    '技術指標只描述過去；籌碼面看三大法人與融資融券',
    '選 ETF 看指數邏輯、總費用率、流動性與折溢價'
  ]
},
{
  id: 'c03', subject: 1, minutes: 45,
  title: '用生成式 AI 做投資研究',
  summary: '投資研究的提示詞設計、讓 AI 讀財報與法說會、新聞情緒整理、幻覺與資料時效的查證方法，以及避免 AI 迎合與確認偏誤。',
  sections: [
    { id: 'prompt', title: '投資研究提示詞', html: `
<p>好的研究提示詞要包含：<b>角色、任務、資料、格式、限制</b>。最重要的是<strong>把資料給 AI</strong>，而不是讓它憑記憶回答。</p>
<pre class="out">角色：你是一位嚴謹的產業研究員。
任務：閱讀下方的法說會逐字稿，整理公司對下一季的展望。
資料：（貼上逐字稿，或上傳 PDF）
格式：
1. 營收與毛利率指引（引用原文句子）
2. 管理層提到的三個主要機會
3. 管理層提到的三個主要風險
4. 與上一季說法相比的變化
限制：
- 只根據提供的資料回答，資料沒提到的寫「資料未提及」
- 每個數字都標示出處段落
- 不要提供買進或賣出建議</pre>
<h3>常用研究任務</h3>
<div class="table-wrap"><table>
<tr><th>任務</th><th>提示重點</th></tr>
<tr><td>財報摘要</td><td>上傳財報，要求列出營收、毛利率、EPS 與年增率，並附頁碼</td></tr>
<tr><td>同業比較</td><td>提供各公司數字表格，要求整理成比較表並說明差異原因</td></tr>
<tr><td>新聞整理</td><td>貼上多則新聞，要求分類為利多、利空、中性，並列出依據句子</td></tr>
<tr><td>名詞解釋</td><td>「用國中生聽得懂的方式解釋什麼是存貨週轉率，並舉例」</td></tr>
<tr><td>反方觀點</td><td>「請列出這個投資想法最可能錯在哪裡」</td></tr>
</table></div>` },
    { id: 'verify', title: '查證：AI 說的不一定對', html: `
<div class="flow">
  <div><b>看來源</b><span>AI 引用了什麼資料？有沒有出處？</span></div>
  <div><b>對原始數據</b><span>到公開資訊觀測站或公司財報核對數字</span></div>
  <div><b>交叉比對</b><span>用第二個來源或另一個 AI 驗證</span></div>
</div>
<ul>
  <li><b>幻覺</b>：AI 可能捏造不存在的財報數字或新聞。要求「附出處」並實際點開確認。</li>
  <li><b>資料時效</b>：先問 AI「你使用的資料日期是什麼時候」；需要最新資訊時，開啟網路搜尋或自己提供資料。</li>
  <li><b>計算錯誤</b>：AI 心算容易出錯，數字計算請交給試算表，或要求 AI 用程式工具計算。</li>
</ul>` },
    { id: 'bias', title: '避免 AI 迎合與確認偏誤', html: `
<ul>
  <li><b>確認偏誤</b>：人傾向尋找支持自己想法的資訊。問「為什麼這檔會漲」只會得到看多理由。</li>
  <li><b>AI 迎合</b>：模型容易順著提問者的立場回答。</li>
  <li><b>對策</b>：用中立的問法；要求同時列出看多與看空理由；扮演「魔鬼代言人」挑戰你的論點。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>不好的問法</th><th>較好的問法</th></tr>
<tr><td>這檔股票會漲嗎？</td><td>根據附件財報，列出這家公司獲利成長的支撐因素與風險因素各三點</td></tr>
<tr><td>幫我選三檔會賺錢的股票</td><td>依照我設定的條件（ROE 大於 15%、負債比小於 50%），檢查下列清單哪些符合，並列出不符合的原因</td></tr>
<tr><td>我想買這檔，你覺得呢？</td><td>請扮演反對者，列出這個投資想法最大的三個風險</td></tr>
</table></div>` }
  ],
  keypoints: [
    '研究提示詞：角色、任務、資料、格式、限制',
    '把資料給 AI，而不是讓 AI 憑記憶回答',
    '要求「資料未提及就說未提及」並附出處',
    '查證三步：看來源、對原始數據、交叉比對',
    '數字計算交給試算表',
    '避免確認偏誤：中立提問、同時列看多看空、請 AI 當反對者'
  ]
},
{
  id: 'c04', subject: 1, minutes: 40,
  title: '打造你的 AI 投資研究助理',
  summary: '用自訂 GPT、Gemini Gem 或 Claude 專案建立固定角色的研究助理，撰寫指示、上傳知識檔、設定輸出格式與限制，並了解排程任務與資料隱私。',
  sections: [
    { id: 'platform', title: '平台選擇', html: `
<div class="table-wrap"><table>
<tr><th>工具</th><th>做法</th><th>特點</th></tr>
<tr><td><b>ChatGPT 自訂 GPT</b></td><td>在 GPT 建立頁面設定指示、上傳知識檔、開啟網路搜尋</td><td>可分享給他人使用；部分功能依付費方案而定</td></tr>
<tr><td><b>Gemini Gem</b></td><td>建立 Gem，撰寫指示並加入檔案</td><td>與 Google 雲端硬碟、試算表整合方便</td></tr>
<tr><td><b>Claude 專案</b></td><td>建立專案，放入專案指示與知識檔</td><td>適合長文件閱讀與比較</td></tr>
</table></div>
<p>三者概念相同：<b>把每次都要重打的背景與規則，存成固定設定</b>。各平台功能與方案變動快，請以官方說明為準。</p>` },
    { id: 'instructions', title: '撰寫助理指示', html: `
<pre class="out">你是我的「投資研究助理」，協助我整理台股公開資訊。

【我的投資原則】
- 以長期持有為主，偏好 ROE 連續 3 年高於 15% 的公司
- 單一個股不超過資產的 10%

【工作方式】
1. 只根據我提供的資料或你查到並附上連結的資料回答
2. 數字一律標示資料日期與來源；不確定就說不確定
3. 每次分析都要同時列出「支持因素」與「風險因素」
4. 計算請列出算式，讓我能自己驗算

【禁止事項】
- 不得提供買進、賣出或目標價建議
- 不得預測短期股價
- 不得編造財報數字或新聞

【輸出格式】
## 摘要（3 句以內）
## 關鍵數字（表格：項目／數值／日期／來源）
## 支持因素
## 風險因素
## 我需要自己查證的事項</pre>
<div class="box tip"><b class="t">知識檔</b>可以上傳自己的投資筆記、選股條件、名詞表，讓助理每次都遵循同一套規則。不要上傳證券帳號、身分證字號等個資。</div>` },
    { id: 'schedule', title: '排程任務與隱私', html: `
<ul>
  <li>部分 AI 服務提供<b>排程任務</b>，例如每天早上整理指定主題的新聞。適合用來收集資訊，但無法取代第 7 章的自動化流程（可自訂資料來源、條件判斷與推播）。</li>
  <li><b>資料隱私</b>：輸入的內容可能被服務商保留，請到設定中確認是否用於模型訓練，必要時關閉。</li>
  <li><b>分享風險</b>：若把助理分享給他人，助理的輸出就可能成為「對他人提供投資建議」，請注意第 1 章的法規界線。</li>
</ul>` }
  ],
  keypoints: [
    '自訂 GPT、Gemini Gem、Claude 專案都能存成固定角色與規則',
    '指示包含：投資原則、工作方式、禁止事項、輸出格式',
    '要求標示資料日期與來源、列出算式',
    '禁止買賣建議、短期預測與編造數字',
    '不要上傳帳號與個資；確認資料是否用於訓練'
  ]
},
{
  id: 'c05', subject: 1, minutes: 45,
  title: '台股公開資料來源',
  summary: '證交所與櫃買中心 OpenAPI、證交所 CSV 下載、公開資訊觀測站、GOOGLEFINANCE 與第三方資料平台的特性、限制與注意事項。',
  sections: [
    { id: 'official', title: '官方資料來源', html: `
<div class="table-wrap"><table>
<tr><th>來源</th><th>內容</th><th>格式</th></tr>
<tr><td><b>證交所 OpenAPI</b><br><small>openapi.twse.com.tw</small></td><td>上市股票每日收盤行情、本益比與殖利率、公司基本資料、法人買賣等</td><td>JSON</td></tr>
<tr><td><b>證交所資料下載</b></td><td>部分報表可加上 <code>response=open_data</code> 參數下載</td><td>CSV</td></tr>
<tr><td><b>櫃買中心 OpenAPI</b><br><small>tpex.org.tw/openapi</small></td><td>上櫃股票行情與相關資料</td><td>JSON</td></tr>
<tr><td><b>公開資訊觀測站</b></td><td>財報、月營收、重大訊息、股東會資料、法說會簡報</td><td>網頁、PDF</td></tr>
<tr><td>集保結算所</td><td>集保股權分散表</td><td>CSV</td></tr>
</table></div>
<h3>本課程使用的端點</h3>
<pre class="out">上市每日收盤行情（JSON）
https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL

上市個股本益比、殖利率、股價淨值比（JSON）
https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL

上市每日收盤行情（CSV，可直接給試算表讀取）
https://www.twse.com.tw/exchangeReport/STOCK_DAY_ALL?response=open_data

上櫃每日收盤行情（JSON）
https://www.tpex.org.tw/openapi/v1/tpex_mainboard_daily_close_quotes</pre>
<p>BWIBBU_ALL 的欄位：<code>Code</code> 代號、<code>Name</code> 名稱、<code>PEratio</code> 本益比、<code>DividendYield</code> 殖利率、<code>PBratio</code> 股價淨值比。<b>本益比空白</b>通常代表公司虧損（EPS 為負，本益比無意義）。</p>` },
    { id: 'pitfalls', title: '資料的常見陷阱', html: `
<div class="table-wrap"><table>
<tr><th>陷阱</th><th>說明與處理</th></tr>
<tr><td><b>民國日期</b></td><td>官方資料日期常為 <code>1151016</code>，代表民國 115 年 10 月 16 日。年份加 1911 轉為西元</td></tr>
<tr><td><b>數字是文字</b></td><td>JSON 中的價格常是字串（如 <code>"15.01"</code>），需轉為數字才能比較大小</td></tr>
<tr><td><b>千分位與符號</b></td><td>部分資料有逗號或「+」「−」符號，計算前要清除</td></tr>
<tr><td><b>非交易日</b></td><td>假日沒有新資料，API 回傳的是最近交易日；排程要能辨識日期沒變</td></tr>
<tr><td><b>除權息</b></td><td>除息後股價會下降，未調整的價格會造成假的「大跌」訊號；回測應使用還原股價</td></tr>
<tr><td><b>上市與上櫃分開</b></td><td>要追蹤上櫃股票需另外抓櫃買中心資料</td></tr>
</table></div>` },
    { id: 'others', title: 'GOOGLEFINANCE 與第三方平台', html: `
<ul>
  <li><b>GOOGLEFINANCE</b>：Google 試算表內建函數，上市股票代號寫成 <code>"TPE:2330"</code>。方便但報價可能延遲，部分上櫃股票、殖利率等欄位可能抓不到（顯示 #N/A）。</li>
  <li><b>第三方資料平台</b>：如 FinMind 等提供整理好的台股 API，部分資料需註冊或付費。使用前確認<b>授權條款</b>與<b>使用次數限制</b>。</li>
  <li><b>網頁爬蟲</b>：抓取一般網站可能違反使用條款，也容易因網站改版失效；優先使用官方 API。</li>
</ul>
<div class="box exam"><b class="t">選擇原則</b>官方 API 最可靠且免費；GOOGLEFINANCE 最方便；第三方平台資料最完整但要注意授權。本課程以官方 API 為主、GOOGLEFINANCE 為輔。</div>` }
  ],
  keypoints: [
    '證交所 OpenAPI 提供 JSON；部分報表加 response=open_data 可下載 CSV',
    'BWIBBU_ALL 提供本益比、殖利率、股價淨值比；本益比空白多為虧損',
    '上櫃資料要另外抓櫃買中心',
    '民國年 + 1911 = 西元年',
    'JSON 數字常是字串，需轉型；注意除權息與非交易日',
    'GOOGLEFINANCE 用 TPE:代號，可能延遲或 #N/A'
  ]
}
);
