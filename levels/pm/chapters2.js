/* 專案管理 執行與控制篇：實獲值、風險、品質與溝通、Scrum 與 Kanban
   <pre class="py"> 為可在網頁上執行的 Python；<pre class="out"> 為文件範例或示意
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c06', subject: 2, minutes: 55,
  title: '實獲值管理',
  summary: '用計畫值、實獲值、實際成本同時衡量進度與成本、成本與時程差異、CPI 與 SPI、完工估算 EAC、ETC、VAC 與 TCPI，以及撰寫專案狀態報告。',
  sections: [
    { id: 'why', title: '為什麼需要實獲值', html: `
<p>第 3 個月底，專案花了 110 萬元，計畫也是花 110 萬元。看起來剛好符合預算？不一定：如果實際只完成了計畫中 90% 的工作，代表進度落後，而且做同樣的事花了更多錢。</p>
<p><b>實獲值管理</b>（Earned Value Management，EVM）把範疇、時程、成本放在同一個尺度（金額）上比較：</p>
<table>
<tr><th>名詞</th><th>意思</th><th>問題</th></tr>
<tr><td><b>BAC</b> 完工預算</td><td>整個專案的成本基準</td><td>總共預計花多少？</td></tr>
<tr><td><b>PV</b> 計畫值</td><td>到今天為止，<b>計畫</b>應完成工作的預算</td><td>應該做到哪裡？</td></tr>
<tr><td><b>EV</b> 實獲值</td><td>到今天為止，<b>實際完成</b>工作的預算價值 ＝ 完成百分比 × BAC</td><td>實際做到哪裡？</td></tr>
<tr><td><b>AC</b> 實際成本</td><td>到今天為止，<b>實際花掉</b>的錢</td><td>實際花了多少？</td></tr>
</table>` },
    { id: 'formulas', title: '差異與績效指數', html: `
<pre class="out">成本差異 CV ＝ EV − AC　　負數：超支
時程差異 SV ＝ EV − PV　　負數：落後
成本績效指數 CPI ＝ EV ÷ AC　　＜ 1：每花 1 元只做出不到 1 元的工作
時程績效指數 SPI ＝ EV ÷ PV　　＜ 1：進度落後</pre>
<p>記憶方式：<b>EV 永遠放在前面</b>；差異是減法、指數是除法；成本和 AC 比，時程和 PV 比。</p>
<pre class="py">BAC = 280                          # 成本基準（萬元）
PV, AC = 110, 110                  # 第 3 個月底
pct_done = 0.3536                  # 依工作包完成狀況估算的完成百分比
EV = round(BAC * pct_done)

CV, SV = EV - AC, EV - PV
CPI, SPI = EV / AC, EV / PV
print(f'EV ＝ {pct_done:.2%} × {BAC} ≈ {EV} 萬元')
print(f'CV ＝ {CV}（{"超支" if CV &lt; 0 else "節省"}）　SV ＝ {SV}（{"落後" if SV &lt; 0 else "超前"}）')
print(f'CPI ＝ {CPI:.2f}　SPI ＝ {SPI:.2f}')</pre>` },
    { id: 'forecast', title: '完工預測', html: `
<table>
<tr><th>指標</th><th>公式</th><th>意思</th></tr>
<tr><td><b>EAC</b> 完工估算</td><td>BAC ÷ CPI</td><td>照目前的成本效率做完，總共要花多少</td></tr>
<tr><td></td><td>AC ＋（BAC − EV）</td><td>之後能照原計畫效率（目前的偏差是一次性的）</td></tr>
<tr><td></td><td>AC ＋（BAC − EV）÷（CPI × SPI）</td><td>成本與時程都會持續影響（例如要趕工追進度）</td></tr>
<tr><td><b>ETC</b> 完工尚需</td><td>EAC − AC</td><td>從現在起還要花多少</td></tr>
<tr><td><b>VAC</b> 完工差異</td><td>BAC − EAC</td><td>完工時會超支（負數）或節省多少</td></tr>
<tr><td><b>TCPI</b> 完工所需績效</td><td>（BAC − EV）÷（BAC − AC）</td><td>剩下的工作要達到多少 CPI，才能守住原預算</td></tr>
</table>
<pre class="py">BAC, PV, EV, AC = 280, 110, 99, 110
CPI, SPI = EV / AC, EV / PV
eac_typical = BAC / CPI
eac_atypical = AC + (BAC - EV)
eac_both = AC + (BAC - EV) / (CPI * SPI)
print(f'EAC（照目前效率）       {eac_typical:6.1f}　VAC {BAC - eac_typical:6.1f}')
print(f'EAC（偏差只是一次性）   {eac_atypical:6.1f}　VAC {BAC - eac_atypical:6.1f}')
print(f'EAC（成本與時程都影響） {eac_both:6.1f}　VAC {BAC - eac_both:6.1f}')
print(f'ETC（照目前效率）{eac_typical - AC:.1f}')
tcpi = (BAC - EV) / (BAC - AC)
print(f'TCPI ＝ {tcpi:.3f}：剩下的工作要比原計畫有效率 {tcpi - 1:.1%} 才能守住預算')</pre>
<p>TCPI 1.065 代表剩下的工作要比原計畫更有效率 6.5%，而目前 CPI 只有 0.90，守住 280 萬元並不容易。專案經理應該盡早向發起人說明，並提出選項：動用應變準備、調整範疇或改善效率。互動練習中的「實獲值計算機」可以輸入任何數字並看到圖表。</p>` },
    { id: 'report', title: '狀態報告', html: `
<pre class="out">【會員 App 專案　第 3 個月狀態報告】
整體狀態：🟡 黃燈（進度與成本皆略為落後，可控制）
進度：完成 35%（計畫 39%），SPI 0.90；要徑上的前端開發延誤約 1 週
成本：已花 110 萬元，完成工作價值 99 萬元，CPI 0.90；照目前效率估計完工需 311 萬元
原因：UI 設計多改了兩輪，前端重工
對策：① 設計凍結，後續變更走變更流程　② 測試人員提前加入（快速跟進）
需要決策：是否動用 10 萬元應變準備，或把「推薦好友」功能移到第二期
下個月里程碑：前端 App 完成、金流商審核通過</pre>
<div class="box tip"><b class="t">好的狀態報告</b>先給結論（紅黃綠燈），用數字說明進度與成本，說清楚原因與對策，最後明確列出<b>需要誰做什麼決定</b>。只報喜不報憂，問題只會越拖越大。</div>` }
  ],
  keypoints: [
    'PV 計畫應完成工作的預算、EV 實際完成工作的預算價值、AC 實際花費、BAC 完工預算。',
    'CV ＝ EV − AC、SV ＝ EV − PV；負數代表超支、落後。',
    'CPI ＝ EV ÷ AC、SPI ＝ EV ÷ PV；小於 1 代表成本效率差、進度落後。',
    'EAC ＝ BAC ÷ CPI（照目前效率）；ETC ＝ EAC − AC；VAC ＝ BAC − EAC。',
    'TCPI ＝（BAC − EV）÷（BAC − AC），大於 1 代表剩下的工作必須更有效率。',
    '狀態報告：先給結論，用數字說明，說明原因與對策，並列出需要的決策。'
  ]
},
{
  id: 'c07', subject: 2, minutes: 50,
  title: '風險管理',
  summary: '風險與議題的差別、識別風險的方法、機率與影響矩陣、預期貨幣價值與決策樹、威脅與機會的應對策略、風險登錄冊與持續監控。',
  sections: [
    { id: 'what', title: '風險與議題', html: `
<p><b>風險</b>是不確定的事件，如果發生，會對專案目標產生影響。風險可能是<b>威脅</b>（負面），也可能是<b>機會</b>（正面）。<b>議題</b>則是已經發生、需要處理的問題。</p>
<table>
<tr><th>風險（還沒發生）</th><th>議題（已經發生）</th></tr>
<tr><td>金流商<b>可能</b>延遲審核</td><td>金流商通知審核要多兩週</td></tr>
<tr><td>主要工程師<b>可能</b>離職</td><td>主要工程師提出離職</td></tr>
</table>
<p>風險寫法建議用「<b>因為</b>（原因），<b>可能</b>（事件），<b>導致</b>（影響）」：因為金流商審核需要補件，可能延遲兩週，導致上線日延後。</p>` },
    { id: 'identify', title: '識別與分析風險', html: `
<p>識別方法：腦力激盪、專家訪談、檢查清單（過去專案的經驗教訓）、假設分析（每個假設不成立時會怎樣）、SWOT 分析。</p>
<p><b>定性分析</b>用機率與影響的乘積排序，找出最需要關注的風險：</p>
<pre class="py">risks = [
    ('金流商審核延誤', 3, 4), ('App 審查被退件', 2, 3), ('主要工程師離職', 2, 5),
    ('需求頻繁變更', 4, 3), ('雲端費用超出', 2, 2), ('上線當天流量過大', 1, 4),
]
def level(score):
    return '高' if score &gt;= 12 else '中' if score &gt;= 6 else '低'
print('風險                機率 影響 分數 等級')
for name, p, i in sorted(risks, key=lambda r: -r[1] * r[2]):
    print(f'{name:&lt;10}  {p:&gt;4} {i:&gt;4} {p * i:&gt;4}  {level(p * i)}')</pre>
<p>機率與影響以 1～5 分評估，分數 12 以上列為高風險。互動練習中的「風險矩陣」可以新增風險並看到它在 5 × 5 矩陣中的位置。</p>` },
    { id: 'emv', title: '預期貨幣價值與決策樹', html: `
<p><b>定量分析</b>常用預期貨幣價值（EMV）＝ 機率 × 影響金額。威脅的 EMV 為負，機會為正。</p>
<pre class="py"># 決策：上線前要不要花 8 萬元做壓力測試？
p_crash = 0.25          # 不做壓力測試時，上線當天當機的機率
loss = 60               # 當機的損失（萬元）：退款、補償、商譽
p_crash_tested = 0.05   # 做了壓力測試後仍當機的機率
cost_test = 8

emv_skip = -p_crash * loss
emv_test = -cost_test - p_crash_tested * loss
print(f'不做壓力測試：EMV ＝ {emv_skip:.1f} 萬元')
print(f'做壓力測試　：EMV ＝ {emv_test:.1f} 萬元')
print('建議：', '做壓力測試' if emv_test &gt; emv_skip else '不做')</pre>
<p>這就是簡單的<b>決策樹</b>：比較每個選項的期望值，選擇對專案最有利的。各風險的 EMV 加總，也可以作為設定應變準備的依據（第 5 章）。</p>` },
    { id: 'response', title: '應對策略', html: `
<table>
<tr><th>威脅的策略</th><th>做法</th><th>例子</th></tr>
<tr><td><b>規避</b></td><td>改變計畫，讓風險不會發生</td><td>不採用尚未成熟的新付款方式</td></tr>
<tr><td><b>轉移</b></td><td>把影響轉給第三方（風險仍在）</td><td>購買保險、簽固定價格的外包合約</td></tr>
<tr><td><b>減輕</b></td><td>降低機率或影響</td><td>提早送金流審核、做壓力測試</td></tr>
<tr><td><b>接受</b></td><td>不主動處理；可準備應變準備（主動接受）</td><td>雲端費用小幅超出就接受</td></tr>
<tr><td><b>上報</b></td><td>超出專案權限時，交給更高層級處理</td><td>影響整個公司的法規變動</td></tr>
</table>
<table>
<tr><th>機會的策略</th><th>做法</th></tr>
<tr><td><b>利用</b></td><td>確保機會一定發生</td></tr>
<tr><td><b>分享</b></td><td>和最能掌握機會的第三方合作</td></tr>
<tr><td><b>提升</b></td><td>提高機會發生的機率或效益</td></tr>
<tr><td><b>接受</b></td><td>機會發生時再享受成果，不主動追求</td></tr>
</table>` },
    { id: 'register', title: '風險登錄冊與監控', html: `
<pre class="out">編號  風險             機率 影響 等級  應對策略              負責人   觸發條件
R01   金流商審核延誤    3    4   高    減輕：第 4 週提早送件   林小姐   第 5 週仍未收到回覆
R02   主要工程師離職    2    5   中    減輕：文件化、交叉訓練 陳組長   出現離職徵兆
R03   需求頻繁變更      4    3   高    減輕：設計凍結與變更流程 林小姐  單週超過 3 個變更請求</pre>
<ul>
<li><b>負責人</b>：每個風險都要有人追蹤，而不是「大家一起注意」。</li>
<li><b>觸發條件</b>：風險即將發生的徵兆，出現時啟動應變計畫。</li>
<li><b>殘餘風險</b>：執行應對後仍剩下的風險；<b>次生風險</b>：因為應對措施而產生的新風險。</li>
<li>風險登錄冊要定期檢視（例如每週例會），新增、關閉並重新評估風險。</li>
</ul>` }
  ],
  keypoints: [
    '風險是不確定的未來事件，可能是威脅或機會；議題是已經發生的問題。',
    '風險寫法：因為（原因），可能（事件），導致（影響）。',
    '定性分析：機率 × 影響排序；定量分析：EMV ＝ 機率 × 影響金額，可用決策樹比較選項。',
    '威脅策略：規避、轉移、減輕、接受、上報；機會策略：利用、分享、提升、接受。',
    '轉移不會消除風險，只是把影響轉給第三方，例如保險或固定價格合約。',
    '風險登錄冊記錄負責人、觸發條件與應對策略，並定期檢視。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 45,
  title: '品質、溝通與團隊',
  summary: '品質規劃、品質保證與品質控制、品質成本、PDCA 與常用品質工具、溝通管道數與溝通計畫、會議與衝突處理，以及團隊發展階段。',
  sections: [
    { id: 'quality', title: '品質管理', html: `
<table>
<tr><th>流程</th><th>重點</th><th>例子</th></tr>
<tr><td>品質規劃</td><td>定義品質標準與如何衡量</td><td>付款成功率 ≥ 99%、App 啟動 ≤ 3 秒</td></tr>
<tr><td>品質保證／管理品質</td><td>確保<b>流程</b>正確，預防錯誤</td><td>程式碼審查、測試流程、自動化測試</td></tr>
<tr><td>品質控制</td><td>檢查<b>成果</b>是否符合標準</td><td>執行測試案例、驗收測試</td></tr>
</table>
<p><b>品質成本</b>分成兩類：<b>一致性成本</b>（預防與鑑定：訓練、審查、測試）與<b>不一致性成本</b>（內部失敗：重工；外部失敗：客訴、退款、商譽損失）。在越後期發現錯誤，修正成本越高，所以預防比檢查更划算。</p>
<p>持續改善常用 <b>PDCA</b>：計畫（Plan）→ 執行（Do）→ 檢查（Check）→ 行動（Act）。</p>` },
    { id: 'tools', title: '品質工具：柏拉圖', html: `
<p><b>柏拉圖</b>把問題依發生次數由多到少排列，並畫出累計百分比，找出造成大部分問題的少數原因（80/20 法則）：</p>
<pre class="py">bugs = {'付款逾時': 46, '登入失敗': 28, '推播未送達': 12, '畫面跑版': 8, '點數計算錯誤': 4, '其他': 2}
total = sum(bugs.values())
cum = 0
for name, n in sorted(bugs.items(), key=lambda x: -x[1]):
    cum += n
    print(f'{name:&lt;6} {n:&gt;3}  累計 {cum / total:6.1%}  ' + '■' * (n // 2))</pre>
<p>付款逾時與登入失敗兩類就占了 74%，優先處理這兩項效益最大。其他常用工具還有魚骨圖（找出問題的根本原因）、管制圖（判斷流程是否穩定）與檢查表。</p>` },
    { id: 'comm', title: '溝通管理', html: `
<pre class="out">溝通管道數 ＝ n（n − 1）÷ 2</pre>
<pre class="py">for n in [3, 5, 8, 12, 20]:
    print(f'{n:&gt;2} 人 → {n * (n - 1) // 2:&gt;3} 條溝通管道')
print('團隊從 8 人增加到 12 人，管道增加', 12 * 11 // 2 - 8 * 7 // 2, '條')</pre>
<p>人數增加，溝通管道呈平方成長，這也是「在落後的專案加人只會更落後」的原因之一。<b>溝通計畫</b>規劃誰需要什麼資訊、多久一次、用什麼方式、由誰負責：</p>
<table>
<tr><th>對象</th><th>內容</th><th>頻率</th><th>方式</th></tr>
<tr><td>發起人</td><td>狀態報告、需要的決策</td><td>雙週</td><td>會議＋書面報告</td></tr>
<tr><td>專案團隊</td><td>進度、阻礙、任務分配</td><td>每天</td><td>站立會議、專案看板</td></tr>
<tr><td>門市店長</td><td>上線時間、教育訓練</td><td>每月</td><td>Email、說明會</td></tr>
</table>
<p>溝通方式：<b>互動式</b>（會議、電話，適合需要討論與共識）、<b>推送式</b>（Email、報告）、<b>拉取式</b>（知識庫、專案網站，讓需要的人自己取用）。</p>` },
    { id: 'team', title: '團隊與衝突', html: `
<p>團隊發展常經過五個階段（Tuckman 模型）：<b>形成</b>（互相認識）→ <b>風暴</b>（意見衝突）→ <b>規範</b>（建立共同做法）→ <b>績效</b>（高效合作）→ <b>解散</b>（專案結束）。</p>
<table>
<tr><th>衝突處理方式</th><th>說明</th></tr>
<tr><td><b>協作／解決問題</b></td><td>找出根本原因，創造雙贏，通常是最好的長期做法</td></tr>
<tr><td>妥協</td><td>雙方各讓一步</td></tr>
<tr><td>緩和</td><td>強調共同點、淡化差異，適合暫時降溫</td></tr>
<tr><td>強迫</td><td>用職權決定，適合緊急狀況</td></tr>
<tr><td>迴避</td><td>暫時不處理，適合需要冷靜或問題不重要時</td></tr>
</table>
<div class="box exam"><b class="t">情境：兩位工程師對技術方案爭執不下</b>專案經理應先讓雙方說明理由與依據，一起用專案目標（時程、維護性、成本）評估方案，而不是直接用職權選一個，也不是放著不管。</div>` }
  ],
  keypoints: [
    '品質保證確保流程正確（預防），品質控制檢查成果是否符合標準（檢查）。',
    '品質成本：一致性成本（預防、鑑定）與不一致性成本（內部、外部失敗）；越晚發現越貴。',
    '柏拉圖依次數排序找出少數關鍵原因；PDCA 用於持續改善。',
    '溝通管道數 ＝ n（n − 1）÷ 2，人數增加管道呈平方成長。',
    '溝通計畫：對象、內容、頻率、方式、負責人；方式分互動式、推送式、拉取式。',
    '團隊發展：形成 → 風暴 → 規範 → 績效 → 解散；衝突處理以協作解決問題為優先。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 55,
  title: '敏捷與 Scrum',
  summary: '敏捷宣言與原則、Scrum 的三個責任角色、五個事件與三個產出物、使用者故事與故事點、速度與發布預測、燃盡圖，以及常見的敏捷誤解。',
  sections: [
    { id: 'agile', title: '敏捷宣言', html: `
<p>2001 年發表的《敏捷軟體開發宣言》提出四個價值：</p>
<pre class="out">個人與互動　　　　重於　流程與工具
可用的軟體　　　　重於　詳盡的文件
與客戶協作　　　　重於　合約協商
回應變化　　　　　重於　遵循計畫

（右邊的項目也有價值，但我們更重視左邊的項目）</pre>
<p>敏捷的核心是<b>短週期交付可用的成果、取得回饋、持續調整</b>，讓需求不確定時也能降低做錯的風險。Scrum、Kanban、極限編程（XP）都是敏捷的實踐方式。</p>` },
    { id: 'scrum', title: 'Scrum 架構', html: `
<p>依 2020 年版《Scrum 指南》，Scrum 由 3 個責任角色、5 個事件、3 個產出物組成：</p>
<table>
<tr><th>類別</th><th>項目</th><th>重點</th></tr>
<tr><td rowspan="3">責任角色</td><td><b>產品負責人</b>（Product Owner）</td><td>決定做什麼、排列產品待辦清單的優先順序，對產品價值負責</td></tr>
<tr><td><b>Scrum Master</b></td><td>協助團隊理解與實踐 Scrum、移除阻礙；是服務型領導，不是指派工作的主管</td></tr>
<tr><td><b>開發人員</b>（Developers）</td><td>每個 Sprint 做出可用的增量；自我管理決定怎麼做</td></tr>
<tr><td rowspan="5">事件</td><td><b>Sprint</b></td><td>固定長度，一個月以內，其他事件都在 Sprint 之中</td></tr>
<tr><td>Sprint 規劃</td><td>決定 Sprint 目標與要做的項目；一個月的 Sprint 最多 8 小時</td></tr>
<tr><td>每日站會（Daily Scrum）</td><td>15 分鐘，檢視朝 Sprint 目標的進展並調整計畫</td></tr>
<tr><td>Sprint 審查</td><td>向利害關係人展示成果並取得回饋；一個月的 Sprint 最多 4 小時</td></tr>
<tr><td>Sprint 回顧</td><td>檢討團隊合作方式並找出改善行動；一個月的 Sprint 最多 3 小時</td></tr>
<tr><td rowspan="3">產出物（承諾）</td><td>產品待辦清單（產品目標）</td><td>依優先順序排列的所有需求</td></tr>
<tr><td>Sprint 待辦清單（Sprint 目標）</td><td>本次 Sprint 要做的項目與計畫</td></tr>
<tr><td>增量（完成的定義）</td><td>符合「完成的定義」、可以使用的成果</td></tr>
</table>
<div class="box warn"><b class="t">常見誤解</b>每日站會不是向主管報告進度的會議；Scrum Master 不是專案經理換個名字；Sprint 中途不應該改變 Sprint 目標，新需求放進產品待辦清單，由產品負責人排序。</div>` },
    { id: 'story', title: '使用者故事與故事點', html: `
<pre class="out">使用者故事格式：
身為＿＿（角色），我想要＿＿（功能），以便＿＿（價值）。

例：身為訂閱會員，我想要暫停下個月的配送，以便出國時不會收到咖啡豆。
驗收條件：
・可以選擇暫停 1～3 個月
・暫停期間不扣款，並在恢復前 3 天推播提醒
・暫停後可以隨時恢復</pre>
<p>好的使用者故事符合 <b>INVEST</b>：獨立（Independent）、可協商（Negotiable）、有價值（Valuable）、可估算（Estimable）、夠小（Small）、可測試（Testable）。</p>
<p><b>故事點</b>是相對的工作量估算（考慮複雜度、工作量與不確定性），常用費氏數列 1、2、3、5、8、13。團隊常用<b>規劃撲克</b>：每人同時亮牌，差異大時討論原因再重新估。</p>` },
    { id: 'velocity', title: '速度與燃盡圖', html: `
<p><b>速度</b>是團隊每個 Sprint 平均完成的故事點，用來預估還需要幾個 Sprint：</p>
<pre class="py">import math
done = [21, 25, 23]                 # 最近三個 Sprint 完成的故事點
remaining = 115                     # 產品待辦清單中剩下的故事點
v = sum(done) / len(done)
print(f'平均速度 {v:.0f} 點／Sprint')
print(f'預估還需要 {math.ceil(remaining / v)} 個 Sprint（每個 Sprint 2 週 → 約 {math.ceil(remaining / v) * 2} 週）')
print(f'保守估計（用最低速度 {min(done)}）：{math.ceil(remaining / min(done))} 個 Sprint')</pre>
<p><b>燃盡圖</b>顯示 Sprint 中每天剩下的工作量，和理想的直線比較：</p>
<pre class="py">total, days = 40, 10
remaining = [40, 38, 38, 33, 30, 24, 18, 13, 8, 3, 0]    # 第 0～10 天
for d, r in enumerate(remaining):
    ideal = total - total * d / days
    mark = '落後' if r &gt; ideal + 0.5 else '超前' if r &lt; ideal - 0.5 else '符合'
    print(f'第 {d:&gt;2} 天　剩 {r:&gt;2} 點　理想 {ideal:4.0f}　{mark:&lt;2} ' + '█' * (r // 2))</pre>
<p>前 7 天曲線高於理想線（落後），第 8 天追上、第 9 天超前。燃盡圖持平代表卡住了，要在每日站會中找出阻礙。速度只能用來規劃<b>同一個團隊</b>的工作，不應該拿來比較不同團隊的績效。互動練習中的「燃盡圖」可以輸入每天的剩餘點數並預估完成日。</p>` }
  ],
  keypoints: [
    '敏捷宣言四個價值：個人與互動、可用的軟體、與客戶協作、回應變化。',
    'Scrum 3-5-3：產品負責人、Scrum Master、開發人員；Sprint、規劃、每日站會、審查、回顧；產品待辦、Sprint 待辦、增量。',
    'Sprint 固定長度一個月以內；每日站會 15 分鐘；Sprint 中途不改變 Sprint 目標。',
    '使用者故事：身為、我想要、以便，加上驗收條件；符合 INVEST。',
    '故事點是相對估算；速度 ＝ 每個 Sprint 平均完成的點數，用於預估，不比較團隊。',
    '燃盡圖比較每天剩餘工作與理想線，持平代表有阻礙。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: 'Kanban、混合式與專案結案',
  summary: '看板方法與 WIP 限制、利特爾法則與流程指標、混合式專案的做法、採購與合約類型，以及專案結案、經驗教訓與 PMP 準備方向。',
  sections: [
    { id: 'kanban', title: '看板方法', html: `
<table>
<tr><th>待辦</th><th>進行中（WIP ≤ 3）</th><th>審查（WIP ≤ 2）</th><th>完成</th></tr>
<tr><td>推薦好友</td><td>暫停訂閱</td><td>點數兌換</td><td>會員註冊</td></tr>
<tr><td>生日優惠</td><td>發票載具</td><td></td><td>綁定信用卡</td></tr>
<tr><td>深色模式</td><td>推播設定</td><td></td><td></td></tr>
</table>
<p><b>看板</b>（Kanban）把工作視覺化，並<b>限制進行中工作（WIP）</b>的數量：一欄滿了，就要先把手上的工作完成，才能拉新的工作進來。核心精神是「<b>先完成，再開始</b>」。</p>
<p>和 Scrum 不同，看板沒有固定的 Sprint 與規定的角色，工作持續流動，適合維運、客服、需求零散的團隊。</p>` },
    { id: 'little', title: '利特爾法則與流程指標', html: `
<pre class="out">平均週期時間 ＝ 平均進行中工作數 ÷ 平均產出率</pre>
<pre class="py">throughput = 4                     # 每週平均完成 4 項
for wip in [12, 8, 4]:
    print(f'進行中 {wip:&gt;2} 項 → 每項平均要 {wip / throughput:.1f} 週才完成')</pre>
<p>產出率不變時，同時進行的工作越多，每一項等待的時間就越長。降低 WIP 可以縮短週期時間、更快交付，也減少切換工作造成的浪費。常用的流程指標：</p>
<table>
<tr><th>指標</th><th>意思</th></tr>
<tr><td>前置時間（Lead Time）</td><td>從提出需求到完成交付的時間（顧客感受到的等待）</td></tr>
<tr><td>週期時間（Cycle Time）</td><td>從開始處理到完成的時間</td></tr>
<tr><td>產出率（Throughput）</td><td>單位時間完成的工作數</td></tr>
<tr><td>累積流量圖（CFD）</td><td>各欄位工作數隨時間的變化，帶狀變寬代表那個階段卡住了</td></tr>
</table>` },
    { id: 'hybrid', title: '混合式專案與採購', html: `
<p>很多專案採用<b>混合式</b>：整體用預測式管理里程碑、預算與合約，開發團隊用 Scrum 反覆交付。會員 App 專案就是如此：上線日與預算固定，功能細節在每個 Sprint 依回饋調整，優先順序低的功能移到第二期。</p>
<table>
<tr><th>合約類型</th><th>說明</th><th>風險主要在</th></tr>
<tr><td>固定總價</td><td>價格固定，範疇必須明確</td><td>賣方</td></tr>
<tr><td>成本補償</td><td>買方支付實際成本加上費用或獎勵</td><td>買方</td></tr>
<tr><td>時間與材料（T&amp;M）</td><td>依人天或工時計費</td><td>買方（適合範疇不確定、短期支援）</td></tr>
</table>` },
    { id: 'close', title: '專案結案與經驗教訓', html: `
<ol>
<li>確認所有交付成果都已通過<b>驗收</b>，取得正式簽核。</li>
<li>把成果與文件<b>移交</b>給營運單位（客服、維運、行銷）。</li>
<li>結清合約與付款，釋放專案資源。</li>
<li>整理<b>經驗教訓</b>：哪些做得好、哪些要改進、下次怎麼做，存入組織的知識庫。</li>
<li>慶祝並感謝團隊。</li>
</ol>
<pre class="out">【經驗教訓（節錄）】
做得好：提早送金流審核，避開了最大的時程風險
要改進：UI 設計沒有先做原型測試，導致前端重工兩輪
下次這樣做：設計階段先用可點擊原型找 5 位顧客測試，再凍結設計</pre>
<div class="box tip"><b class="t">準備 PMP 的方向</b>熟悉預測式、敏捷與混合式方法；練習情境題，思考「專案經理此時最應該先做什麼」，通常的答案是先評估與分析、和相關人員溝通、依流程處理，而不是立刻上報或私下決定。報考資格、考試大綱與題型以 PMI 官網最新公告為準。</div>` }
  ],
  keypoints: [
    '看板：視覺化工作、限制 WIP、先完成再開始；沒有固定 Sprint，適合持續流動的工作。',
    '利特爾法則：週期時間 ＝ WIP ÷ 產出率；降低 WIP 可以縮短週期時間。',
    '前置時間從提出需求算起，週期時間從開始處理算起；累積流量圖可找出瓶頸。',
    '混合式：預測式管理里程碑與預算，團隊用敏捷反覆交付。',
    '合約：固定總價風險在賣方，成本補償與時間材料的風險主要在買方。',
    '結案：驗收簽核、移交、結清合約、整理經驗教訓、感謝團隊。'
  ]
}
);
