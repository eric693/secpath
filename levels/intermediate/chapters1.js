/* 中級 科目一：資訊安全規劃實務 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 55,
  title: 'ISMS 建置與運作實務',
  summary: '依 ISO/IEC 27001:2022 條文 4 至 10 規劃 ISMS：範圍界定、利害關係人、文件化資訊、內部稽核、管理審查與驗證流程。',
  sections: [
    { id: 'clauses', title: '條文架構與各條文的實作產出', html: `
<p>中級考題不再只問「PDCA 是什麼」，而是給一個導入情境，問<strong>下一步該做什麼、該產出什麼文件</strong>。熟悉每個條文對應的具體產出物是關鍵。</p>
<div class="table-wrap"><table>
<tr><th>條文</th><th>重點要求</th><th>常見產出物</th></tr>
<tr><td><b>4 組織全景</b></td><td>4.1 內外部議題、4.2 利害關係人需求、4.3 ISMS 範圍、4.4 建立 ISMS</td><td>內外部議題分析（SWOT/PESTEL）、利害關係人需求表、<strong>ISMS 適用範圍文件</strong></td></tr>
<tr><td><b>5 領導</b></td><td>5.1 領導與承諾、5.2 資安政策、5.3 角色責任與權限</td><td>資安政策（由最高管理階層核定）、資安組織圖與職掌</td></tr>
<tr><td><b>6 規劃</b></td><td>6.1 風險與機會、6.1.2 風險評鑑、6.1.3 風險處理、6.2 資安目標、6.3 變更規劃</td><td>風險評鑑方法論、風險評鑑結果、<strong>SoA</strong>、<strong>風險處理計畫</strong>、可量測的資安目標</td></tr>
<tr><td><b>7 支援</b></td><td>7.1 資源、7.2 適任性、7.3 認知、7.4 溝通、7.5 文件化資訊</td><td>訓練計畫與紀錄、溝通計畫、文件管制程序</td></tr>
<tr><td><b>8 運作</b></td><td>8.1 運作規劃與控制、8.2 定期執行風險評鑑、8.3 執行風險處理</td><td>控制措施執行紀錄、委外流程控制紀錄</td></tr>
<tr><td><b>9 績效評估</b></td><td>9.1 監督量測分析評估、9.2 內部稽核、9.3 管理審查</td><td>量測指標報告、稽核計畫與報告、管理審查會議紀錄</td></tr>
<tr><td><b>10 改善</b></td><td>10.1 持續改善、10.2 不符合事項與矯正措施</td><td>矯正措施單（含根因分析）</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>2024 年 ISO 發布第 1 號增修（Amd 1:2024），在 4.1 與 4.2 加入「組織應判定<b>氣候變遷</b>是否為相關議題」以及利害關係人可能有氣候變遷相關要求。題目若問「最新版要求新增了什麼」，可留意此點。</div>
<p>條文中凡是寫「<b>應保存文件化資訊</b>」的地方，代表稽核時必須能拿出紀錄作為證據；寫「<b>應維持文件化資訊</b>」則代表要有受管制的文件（如政策、程序）。</p>` },
    { id: 'scope', title: '範圍界定與介面', html: `
<p>ISMS 範圍（4.3）決定了驗證證書上寫什麼、稽核要看哪裡。範圍界定需考量：內外部議題、利害關係人要求、以及<strong>組織活動與其他組織活動之間的介面與相依性</strong>。</p>
<h3>範圍文件應包含</h3>
<ul>
  <li><b>組織範圍</b>：哪些部門、單位、人員。</li>
  <li><b>實體範圍</b>：辦公室、機房、異地備援地點的地址。</li>
  <li><b>業務與系統範圍</b>：涵蓋哪些服務、資通系統、網段。</li>
  <li><b>排除項目與理由</b>：例如「委外雲端主機由供應商負責實體安全，以合約與 SOC 2 報告管控」。</li>
  <li><b>介面</b>：與範圍外單位的資料交換點，例如共用的 AD、與總公司的專線。</li>
</ul>
<div class="box analogy"><b class="t">情境範例</b>某電商公司只想先以「線上購物平台」申請驗證。範圍應涵蓋平台開發維運團隊、正式與測試環境、客服系統中存取訂單的部分；人資系統可排除，但人資的<b>到離職流程</b>仍會影響平台帳號管理，必須以介面方式納入考量。</div>
<div class="box warn"><b class="t">常見錯誤</b>範圍過小（只放一台伺服器）會讓驗證失去意義；範圍過大則導入成本高、難以在時程內完成。實務上常從核心業務開始，逐年擴大。</div>` },
    { id: 'docs', title: '文件化資訊與文件管制', html: `
<p>7.5 要求文件化資訊必須受到管制，確保在需要時可取得、受到適當保護。文件管制程序通常包括：</p>
<div class="flow">
  <div><b>建立與更新</b><span>識別（編號、版本、日期、作者）、格式</span></div>
  <div><b>審查與核准</b><span>由權責主管核准後發行</span></div>
  <div><b>發行與取用</b><span>確保使用者取得最新版本</span></div>
  <div><b>變更管制</b><span>版本控制、變更紀錄</span></div>
  <div><b>保存與處置</b><span>保存期限、作廢文件標示或銷毀</span></div>
</div>
<h3>ISO 27001:2022 強制要求的文件化資訊（常考）</h3>
<div class="table-wrap"><table>
<tr><th>條文</th><th>文件化資訊</th></tr>
<tr><td>4.3</td><td>ISMS 範圍</td></tr>
<tr><td>5.2</td><td>資訊安全政策</td></tr>
<tr><td>6.1.2</td><td>資訊安全風險評鑑過程</td></tr>
<tr><td>6.1.3</td><td>風險處理過程、<b>適用性聲明（SoA）</b></td></tr>
<tr><td>6.2</td><td>資訊安全目標</td></tr>
<tr><td>7.2</td><td>適任性的證據</td></tr>
<tr><td>8.1</td><td>過程已依規劃執行的證據</td></tr>
<tr><td>8.2 / 8.3</td><td>風險評鑑結果、風險處理結果</td></tr>
<tr><td>9.1</td><td>監督與量測結果</td></tr>
<tr><td>9.2</td><td>稽核方案實施與稽核結果的證據</td></tr>
<tr><td>9.3</td><td>管理審查結果的證據</td></tr>
<tr><td>10.2</td><td>不符合事項性質、後續措施與矯正措施結果</td></tr>
</table></div>` },
    { id: 'objectives', title: '資安目標與績效量測', html: `
<p>6.2 要求資安目標必須<strong>與政策一致、可量測（若可行）、考量適用要求與風險評鑑結果、被監督、被溝通、適時更新</strong>，並規劃要做什麼、需要什麼資源、由誰負責、何時完成、如何評估結果。</p>
<p>撰寫目標常用 <b>SMART</b> 原則：具體（Specific）、可量測（Measurable）、可達成（Achievable）、相關（Relevant）、有時限（Time-bound）。</p>
<div class="table-wrap"><table>
<tr><th>不佳的目標</th><th>較佳的目標</th></tr>
<tr><td>提升資安意識</td><td>年度社交工程演練點擊率由 12% 降至 5% 以下</td></tr>
<tr><td>加強弱點管理</td><td>CVSS 9.0 以上的弱點於公告後 14 日內修補完成率達 95%</td></tr>
<tr><td>確保系統可用</td><td>核心交易系統每月可用率達 99.9%</td></tr>
</table></div>
<h3>指標類型</h3>
<ul>
  <li><b>KPI（關鍵績效指標）</b>：衡量控制措施執行成效，例如修補完成率、訓練完成率。</li>
  <li><b>KRI（關鍵風險指標）</b>：預警風險上升，例如過期帳號數、未加密筆電數。</li>
  <li><b>落後指標與領先指標</b>：事件數量屬落後指標（已發生）；弱點修補時效屬領先指標（預防性）。</li>
</ul>` },
    { id: 'audit', title: '內部稽核實務（ISO 19011）', html: `
<p>內部稽核依 <b>ISO 19011</b>（管理系統稽核指導綱要）規劃。9.2 要求組織依規劃期間執行內部稽核，並建立<strong>稽核方案</strong>（頻率、方法、責任、報告），且稽核員必須客觀公正——<strong>不可稽核自己的工作</strong>。</p>
<div class="flow">
  <div><b>稽核方案</b><span>年度規劃頻率與範圍，依風險決定重點</span></div>
  <div><b>稽核計畫</b><span>單次稽核的目的、範圍、準則、時程、人員</span></div>
  <div><b>文件審查與查檢表</b><span>依條文與控制措施準備問項</span></div>
  <div><b>現場稽核</b><span>起始會議、訪談、觀察、抽樣、結束會議</span></div>
  <div><b>稽核報告</b><span>發現、證據、結論</span></div>
  <div><b>追蹤</b><span>確認矯正措施有效</span></div>
</div>
<h3>稽核證據與發現</h3>
<ul>
  <li>稽核證據來源：<b>文件審查、訪談、現場觀察、抽樣紀錄、系統設定檢查</b>。</li>
  <li>稽核發現應寫出：<b>準則（依據哪條要求）、事實（看到什麼）、證據（哪份紀錄）</b>。</li>
  <li>抽樣：例如從 300 筆帳號申請單中抽 25 筆，確認皆有主管核准。</li>
</ul>
<div class="box analogy"><b class="t">稽核發現寫法範例</b>依 A.5.18 存取權限要求，應於人員離職時移除存取權限。抽查 2026 年 7 至 9 月離職人員 12 名，其中 2 名之 VPN 帳號於離職後 30 日仍為啟用狀態（證據：VPN 帳號清單匯出檔、人資離職名冊）。判定為<b>次要不符合</b>。</div>
<div class="box exam"><b class="t">考點提示</b>稽核員發現問題時只描述事實與判定，<b>不負責提出解決方案或代為修正</b>；矯正措施由受稽單位負責規劃與執行。</div>` },
    { id: 'review', title: '管理審查與驗證流程', html: `
<h3>管理審查（9.3）輸入事項</h3>
<ul>
  <li>先前管理審查決議事項的處理狀態</li>
  <li>內外部議題的變化、利害關係人需求的變化</li>
  <li>資安績效回饋：不符合與矯正措施、監督量測結果、稽核結果、資安目標達成情形</li>
  <li>利害關係人的回饋</li>
  <li>風險評鑑結果與風險處理計畫狀態</li>
  <li>持續改善的機會</li>
</ul>
<p>輸出事項：與<strong>持續改善機會</strong>及<strong>ISMS 變更需求</strong>相關的決定，並保存會議紀錄。</p>
<h3>第三方驗證流程</h3>
<div class="flow">
  <div><b>第一階段稽核</b><span>Stage 1：文件審查、確認準備度與範圍</span></div>
  <div><b>第二階段稽核</b><span>Stage 2：現場確認控制措施實際運作有效</span></div>
  <div><b>發證</b><span>證書有效期 3 年</span></div>
  <div><b>追查稽核</b><span>Surveillance：第 1、2 年各一次</span></div>
  <div><b>重新驗證</b><span>Recertification：第 3 年證書到期前</span></div>
</div>
<div class="box tip"><b class="t">實務提醒</b>第二階段稽核前，ISMS 通常需要已運作一段時間（常見為 3 個月以上），並至少完成一次完整的內部稽核與管理審查，才能提出運作證據。</div>` }
  ],
  keypoints: [
    '各條文都有對應產出：4.3 範圍、5.2 政策、6.1.3 SoA 與風險處理計畫、9.2 稽核、9.3 管理審查',
    '「保存」文件化資訊指紀錄（證據），「維持」指受管制文件',
    '範圍文件需含組織、實體、系統範圍、排除理由與介面',
    'Amd 1:2024 在 4.1、4.2 加入氣候變遷考量',
    '資安目標需可量測並規劃負責人、時程與評估方式（SMART）',
    '內部稽核依 ISO 19011；稽核員不可稽核自己的工作，只描述事實不代為修正',
    '驗證：第一階段文件審查 → 第二階段實地稽核 → 3 年效期，每年追查稽核'
  ]
},
{
  id: 'c02', subject: 1, minutes: 55,
  title: '風險評鑑與風險處理實務',
  summary: 'ISO/IEC 27005:2022 的事件導向與資產導向方法、風險準則設計、風險值計算、風險處理計畫與 SoA 撰寫。',
  sections: [
    { id: 'approach', title: '兩種風險識別方法', html: `
<p>ISO/IEC 27005:2022 提出兩種識別風險的方法，可單獨使用或混合使用：</p>
<div class="table-wrap"><table>
<tr><th></th><th>事件導向（Event-based）</th><th>資產導向（Asset-based）</th></tr>
<tr><td>思考方式</td><td>從<strong>風險情境</strong>出發：哪些事件會對組織造成重大影響？</td><td>從<strong>資產清冊</strong>出發：每項資產面臨哪些威脅與弱點？</td></tr>
<tr><td>適用時機</td><td>高階、策略層級評估；導入初期快速掌握重大風險</td><td>細部、技術層級評估；需要逐項找出具體弱點</td></tr>
<tr><td>優點</td><td>聚焦業務衝擊，管理階層容易理解</td><td>全面、可追溯到具體控制措施</td></tr>
<tr><td>缺點</td><td>可能遺漏細部弱點</td><td>資產多時工作量大，容易見樹不見林</td></tr>
</table></div>
<div class="box tip"><b class="t">實務建議</b>先以事件導向找出前十大風險情境向管理階層報告，再針對關鍵資產以資產導向細部評鑑，兩者互補。</div>` },
    { id: 'criteria', title: '風險準則設計', html: `
<p>6.1.2 要求組織建立並維持<b>風險準則</b>，包括<strong>風險接受準則</strong>與<strong>執行風險評鑑的準則</strong>，確保重複評鑑能產生一致、有效且可比較的結果。</p>
<h3>衝擊準則範例（1～4 級）</h3>
<div class="table-wrap"><table>
<tr><th>等級</th><th>財務損失</th><th>營運中斷</th><th>法規與商譽</th></tr>
<tr><td>1 輕微</td><td>10 萬元以下</td><td>4 小時內恢復</td><td>無外部影響</td></tr>
<tr><td>2 中度</td><td>10～100 萬元</td><td>1 個工作天內</td><td>少數客戶抱怨</td></tr>
<tr><td>3 嚴重</td><td>100～1,000 萬元</td><td>3 個工作天內</td><td>主管機關關切、媒體報導</td></tr>
<tr><td>4 重大</td><td>1,000 萬元以上</td><td>超過 3 個工作天</td><td>受罰、大規模個資外洩</td></tr>
</table></div>
<h3>可能性準則範例</h3>
<div class="table-wrap"><table>
<tr><th>等級</th><th>描述</th></tr>
<tr><td>1 極少</td><td>過去 5 年未曾發生，且無已知威脅</td></tr>
<tr><td>2 可能</td><td>過去 5 年曾發生，或業界有案例</td></tr>
<tr><td>3 很可能</td><td>過去 1 年曾發生，或弱點已公開且有攻擊程式</td></tr>
<tr><td>4 幾乎確定</td><td>經常發生，或已觀察到針對本組織的攻擊</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>風險接受準則需由<b>管理階層核定</b>，例如「風險值 ≥ 9 為不可接受，必須處理」。準則一旦設定，同一輪評鑑的所有資產都要使用相同準則，結果才可比較。</div>` },
    { id: 'calc', title: '風險值計算範例', html: `
<p>資產導向常見的計算方式為：</p>
<p class="mono center">風險值 = 資產價值 × 威脅可能性 × 弱點嚴重度　或　風險值 = 衝擊 × 可能性</p>
<h3>範例：客戶資料庫</h3>
<div class="table-wrap"><table>
<tr><th>項目</th><th>評估</th><th>分數</th></tr>
<tr><td>資產價值（取 C、I、A 最高者）</td><td>C=3（含大量個資）、I=3、A=2</td><td><b>3</b></td></tr>
<tr><td>威脅：外部 SQL 注入</td><td>對外網站已遭掃描多次</td><td><b>3</b></td></tr>
<tr><td>弱點：舊版程式未使用參數化查詢</td><td>經源碼檢測確認存在</td><td><b>3</b></td></tr>
<tr><td colspan="2"><b>風險值</b></td><td><b>27</b>（最高 27，屬不可接受）</td></tr>
</table></div>
<p>處理後：導入 WAF（降低威脅可能性至 2）並改寫程式（弱點降至 1）→ 殘餘風險 = 3 × 2 × 1 = <b>6</b>，低於接受門檻，由<strong>風險擁有者</strong>簽核接受。</p>
<div class="box warn"><b class="t">常見錯誤</b>把資產價值當作可以被控制措施降低的變數。控制措施通常降低的是<b>可能性</b>或<b>弱點／衝擊</b>，資產本身的價值不會因為裝了防火牆而改變。</div>` },
    { id: 'treatment', title: '風險處理計畫與 SoA', html: `
<p>6.1.3 規定的風險處理流程：</p>
<div class="flow">
  <div><b>選擇處理選項</b><span>修改、保留、避免、分擔</span></div>
  <div><b>決定必要控制措施</b><span>可來自任何來源</span></div>
  <div><b>與附錄 A 比對</b><span>確認沒有遺漏必要控制</span></div>
  <div><b>產出 SoA</b><span>每項控制：適用與否、理由、實施狀態</span></div>
  <div><b>擬定處理計畫</b><span>措施、負責人、資源、期限</span></div>
  <div><b>風險擁有者核准</b><span>核准計畫並接受殘餘風險</span></div>
</div>
<p>ISO/IEC 27005:2022 使用的處理選項名稱：<b>風險修改（Modification）</b>、<b>風險保留（Retention）</b>、<b>風險避免（Avoidance）</b>、<b>風險分擔（Sharing）</b>。</p>
<h3>SoA 欄位範例</h3>
<div class="table-wrap"><table>
<tr><th>控制措施</th><th>適用</th><th>納入／排除理由</th><th>實施狀態</th></tr>
<tr><td>A.5.23 使用雲端服務之資訊安全</td><td>是</td><td>核心系統部署於公有雲（風險 R-07）</td><td>已實施</td></tr>
<tr><td>A.7.5 防範實體及環境威脅</td><td>是</td><td>自有機房（風險 R-12）</td><td>部分實施，預計 Q4 完成</td></tr>
<tr><td>A.8.30 委外開發</td><td>否</td><td>無委外開發，所有程式由內部團隊開發</td><td>不適用</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>附錄 A 是<b>檢核清單</b>而非唯一來源，組織可以加入附錄 A 以外的控制措施。SoA 中的排除項目必須有正當理由，驗證稽核員會特別檢查排除理由是否合理。</div>` },
    { id: 'tm', title: '威脅建模與情境分析', html: `
<p>規劃新系統或重大變更時，常以威脅建模提前找出風險：</p>
<ul>
  <li><b>STRIDE</b>：依偽冒、竄改、否認、資訊洩漏、阻斷服務、權限提升六類，逐一檢視資料流程圖（DFD）中的每個元素。</li>
  <li><b>DREAD</b>（評分用）：損害程度（Damage）、可重現性（Reproducibility）、可利用性（Exploitability）、受影響使用者（Affected users）、可發現性（Discoverability）。</li>
  <li><b>PASTA</b>：以風險為中心的七階段威脅建模流程，結合業務目標。</li>
  <li><b>攻擊樹（Attack Tree）</b>：以樹狀結構拆解攻擊者達成目標的各種路徑。</li>
</ul>
<h3>資料流程圖的信任邊界</h3>
<p>DFD 中資料跨越<strong>信任邊界</strong>（例如網際網路進入 DMZ、應用伺服器連到資料庫）的地方，是威脅最集中的位置，需優先檢視驗證、加密與輸入檢查。</p>
<div class="box analogy"><b class="t">情境範例</b>規劃行動 App 的「綁定帳戶轉帳」功能：<br>S：攻擊者以盜得的密碼登入 → 綁定裝置與 OTP<br>T：竄改轉帳金額 → 交易簽章、伺服器端驗證<br>R：使用者否認轉帳 → 完整交易日誌與裝置綁定紀錄<br>I：API 回傳過多個資 → 最小回傳欄位<br>D：大量請求癱瘓 API → 流量限制<br>E：一般帳號呼叫管理 API → 伺服器端授權檢查</div>` }
  ],
  keypoints: [
    'ISO 27005:2022：事件導向（情境、策略層）與資產導向（細部、技術層）可互補',
    '風險準則（衝擊、可能性、接受準則）需經管理階層核定並一致使用',
    '控制措施降低的是可能性或弱點，不是資產價值',
    '處理選項：修改、保留、避免、分擔；殘餘風險由風險擁有者核准接受',
    '附錄 A 是檢核清單，可加入其他控制；SoA 排除項目必須有理由',
    'STRIDE 找威脅、DREAD 評分；跨越信任邊界處是重點'
  ]
},
{
  id: 'c03', subject: 1, minutes: 55,
  title: '資安法規遵循實務',
  summary: '資通安全管理法應辦事項、個資法安全維護措施與個資盤點、委外監督、資安事件通報與 GDPR 實務。',
  sections: [
    { id: 'cyberlaw', title: '資通安全管理法的應辦事項', html: `
<p>中級考題常以「某機關被核定為 B 級，以下哪項是必須辦理的」形式出題。重點是了解<strong>責任等級越高，應辦事項越多、頻率越高</strong>。</p>
<div class="table-wrap"><table>
<tr><th>應辦事項（公務機關）</th><th>A 級</th><th>B 級</th><th>C 級</th></tr>
<tr><td>資安專職人員</td><td>4 人</td><td>2 人</td><td>1 人</td></tr>
<tr><td>ISMS 導入</td><td>全部核心資通系統導入，並通過公正第三方驗證</td><td>全部核心資通系統導入，並通過公正第三方驗證</td><td>全部核心資通系統導入</td></tr>
<tr><td>內部資安稽核</td><td>每年 2 次</td><td>每年 1 次</td><td>每 2 年 1 次</td></tr>
<tr><td>業務持續運作演練</td><td>核心系統每年 1 次</td><td>核心系統每 2 年 1 次</td><td>核心系統每 2 年 1 次</td></tr>
<tr><td>弱點掃描</td><td>每年 2 次</td><td>每年 1 次</td><td>每 2 年 1 次</td></tr>
<tr><td>滲透測試</td><td>每年 1 次</td><td>每 2 年 1 次</td><td>—</td></tr>
<tr><td>資安健診</td><td>每年 1 次</td><td>每 2 年 1 次</td><td>每 2 年 1 次</td></tr>
<tr><td>資安弱點通報機制、SOC 監控、EDR、IPS 等防護</td><td colspan="3">依等級要求（A、B 級要求較完整）</td></tr>
</table></div>
<div class="box warn"><b class="t">注意</b>上表為《資通安全責任等級分級辦法》附表的重點整理，2025 年資安法修正後子法陸續調整中，實際應辦事項與頻率請以最新公告為準。考試時掌握「等級越高、頻率越高」的原則即可判斷多數題目。</div>
<h3>其他重點</h3>
<ul>
  <li><b>資通安全維護計畫</b>：每年提出實施情形。</li>
  <li><b>核心資通系統</b>：支持核心業務持續運作必要之系統，或防護需求等級為「高」者。</li>
  <li><b>系統防護需求分級</b>：依機密性、完整性、可用性、法律遵循性評估為普、中、高三級，並依《資通系統防護基準》實施對應控制。</li>
  <li><b>資通安全教育訓練</b>：資安專職人員與一般使用者有不同時數要求。</li>
</ul>` },
    { id: 'baseline', title: '資通系統防護基準', html: `
<p>《資通系統防護基準》依系統防護需求等級（普、中、高）規定控制措施，構面包括：</p>
<div class="concepts">
  <div class="concept"><b>存取控制</b><span>帳號管理、最小權限、遠端存取</span></div>
  <div class="concept"><b>事件日誌與可歸責性</b><span>記錄事件、日誌保護、時戳同步</span></div>
  <div class="concept"><b>營運持續計畫</b><span>系統備份、系統備援</span></div>
  <div class="concept"><b>識別與鑑別</b><span>內部使用者識別、身分驗證管理、MFA</span></div>
  <div class="concept"><b>系統與服務獲得</b><span>系統發展生命週期各階段、委外、獲得程序</span></div>
  <div class="concept"><b>系統與通訊保護</b><span>傳輸的機密性與完整性、資料儲存安全</span></div>
  <div class="concept"><b>系統與資訊完整性</b><span>漏洞修復、系統監控、軟體及資訊完整性</span></div>
</div>
<div class="box exam"><b class="t">考點提示</b>防護需求等級取 C、I、A 與法律遵循性中<b>最高</b>的等級。例如機密性為高、其他為普，則整體為高級，須實施高等級的全部控制。</div>` },
    { id: 'pdpa', title: '個資保護實務：安全維護措施', html: `
<p>《個人資料保護法施行細則》第 12 條列出非公務機關應採取的<strong>適當安全措施</strong>，共 11 項，是建置個資管理制度（PIMS）的基礎：</p>
<ol>
  <li>配置管理之人員及相當資源</li>
  <li>界定個人資料之範圍</li>
  <li>個人資料之風險評估及管理機制</li>
  <li>事故之預防、通報及應變機制</li>
  <li>個人資料蒐集、處理及利用之內部管理程序</li>
  <li>資料安全管理及人員管理</li>
  <li>認知宣導及教育訓練</li>
  <li>設備安全管理</li>
  <li>資料安全稽核機制</li>
  <li>使用紀錄、軌跡資料及證據保存</li>
  <li>個人資料安全維護之整體持續改善</li>
</ol>
<h3>個資盤點</h3>
<p>依「蒐集 → 處理 → 利用 → 國際傳輸 → 刪除」的生命週期，逐一記錄每一類個資：<b>特定目的、個資類別、蒐集方式、存放位置、存取人員、保存期限、傳輸對象</b>，形成個資清冊與<strong>個資流程圖</strong>。</p>
<h3>隱私衝擊評估（PIA／DPIA）</h3>
<p>在導入新系統或新的個資利用方式前，評估對當事人隱私的影響與因應措施。GDPR 規定對高風險處理（大規模處理特種個資、系統性監控等）必須執行 DPIA。</p>
<div class="box tip"><b class="t">相關標準</b>ISO/IEC 27701（PIMS，擴充 27001／27002 的隱私控制）、ISO/IEC 29100（隱私框架）、CNS 29100。</div>` },
    { id: 'outsourcing', title: '委外資安要求', html: `
<p>資安法第 9 條要求機關委外辦理資通系統建置、維運或服務時，應<strong>考量受託者的專業能力與經驗，並監督其資安維護情形</strong>。</p>
<h3>委外生命週期的資安要求</h3>
<div class="table-wrap"><table>
<tr><th>階段</th><th>資安措施</th></tr>
<tr><td>規劃與招標</td><td>於需求書載明資安要求、系統防護需求等級、驗收標準；評估受託者資格（例如 ISO 27001 驗證、資安人員證照）</td></tr>
<tr><td>簽約</td><td>保密條款、資安責任、事件通報義務與時限、稽核權、<strong>不得使用危害國家資通安全產品</strong>、分包限制、違約罰則</td></tr>
<tr><td>執行</td><td>定期資安稽核、弱點掃描或源碼檢測結果審查、存取權限最小化、遠端維護管控</td></tr>
<tr><td>驗收</td><td>確認安全性檢測（弱掃、滲透測試、源碼檢測）已完成並修補</td></tr>
<tr><td>契約終止</td><td>資料返還或銷毀並出具證明、帳號權限移除、知識移轉</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>委外不等於責任轉移。機關仍須負最終責任，因此必須保留<b>稽核權</b>並實際執行監督。</div>` },
    { id: 'incident', title: '事件通報實務與 GDPR', html: `
<h3>我國資通安全事件通報重點</h3>
<div class="table-wrap"><table>
<tr><th>項目</th><th>規定</th></tr>
<tr><td>通報時限</td><td>知悉後 <b>1 小時內</b>透過通報應變網站通報</td></tr>
<tr><td>損害控制或復原</td><td>1、2 級：<b>72 小時內</b>；3、4 級：<b>36 小時內</b></td></tr>
<tr><td>結案報告</td><td>完成損害控制或復原後 <b>1 個月內</b>送交調查、處理及改善報告</td></tr>
<tr><td>等級判定</td><td>依 C、I、A 受影響程度與涉及業務（一般、核心、關鍵基礎設施、國家機密）判定 1～4 級</td></tr>
</table></div>
<h3>GDPR 實務重點</h3>
<ul>
  <li><b>合法處理依據</b>（第 6 條）：同意、契約履行、法律義務、重大利益、公共任務、正當利益。</li>
  <li><b>個資外洩通報</b>：控管者知悉後 72 小時內通報監管機關；可能造成高風險時須<strong>無不當延遲</strong>通知當事人。處理者應無不當延遲通知控管者。</li>
  <li><b>跨境傳輸</b>：需有適足性認定、標準契約條款（SCC）或拘束性企業規則（BCR）等機制。</li>
  <li><b>處理活動紀錄</b>（ROPA）：記錄處理目的、類別、接收者、保存期限、安全措施。</li>
  <li><b>隱私始於設計與預設（Privacy by Design and by Default）</b>：系統預設只蒐集最少必要資料。</li>
</ul>` }
  ],
  keypoints: [
    '責任等級越高，應辦事項越多、頻率越高；A 級專職人員 4 人、內稽每年 2 次',
    '系統防護需求等級取 C、I、A 與法律遵循性中最高者',
    '個資法施行細則第 12 條：11 項適當安全措施',
    '個資盤點依生命週期記錄目的、類別、位置、存取者與保存期限',
    '委外需保留稽核權，契約終止時確認資料返還或銷毀',
    '我國通報：1 小時通報、72／36 小時控制、1 個月結案報告',
    'GDPR：72 小時通報監管機關，高風險時無不當延遲通知當事人'
  ]
},
{
  id: 'c04', subject: 1, minutes: 50,
  title: '身分識別與存取管理架構',
  summary: 'IAM 架構設計、身分驗證保證等級、聯合身分流程、特權存取管理、Active Directory 攻擊與防護。',
  sections: [
    { id: 'iam', title: 'IAM 架構與身分生命週期', html: `
<p>身分識別與存取管理（IAM）的核心是讓「對的身分、在對的時間、以對的理由、存取對的資源」。完整架構包含：</p>
<div class="concepts">
  <div class="concept"><b>身分治理（IGA）</b><span>帳號生命週期、權限申請核准、定期權限審查、職責分離衝突檢查</span></div>
  <div class="concept"><b>存取管理（AM）</b><span>身分驗證、單一登入、MFA、條件式存取</span></div>
  <div class="concept"><b>特權存取管理（PAM）</b><span>管理員帳號集中保管、即時授權、操作側錄</span></div>
  <div class="concept"><b>目錄服務</b><span>Active Directory、LDAP、雲端身分目錄</span></div>
</div>
<h3>Joiner、Mover、Leaver 流程</h3>
<ul>
  <li><b>到職（Joiner）</b>：由人資系統觸發，依職務自動指派基本角色。</li>
  <li><b>異動（Mover）</b>：加入新權限的同時，<strong>移除舊職務權限</strong>，避免權限潛變。</li>
  <li><b>離職（Leaver）</b>：離職生效日停用所有帳號，包括 VPN、雲端服務、共用帳號密碼變更。</li>
</ul>
<div class="box tip"><b class="t">實務建議</b>以人資系統作為身分的<b>權威來源</b>，透過自動化佈建（如 SCIM 協定）同步到各系統，能大幅減少離職帳號未停用的問題。</div>` },
    { id: 'aal', title: '身分驗證保證等級（NIST SP 800-63B）', html: `
<div class="table-wrap"><table>
<tr><th>等級</th><th>要求</th><th>適用情境</th></tr>
<tr><td><b>AAL1</b></td><td>單一因子即可</td><td>低風險服務</td></tr>
<tr><td><b>AAL2</b></td><td>兩種不同因子；需抵抗重送攻擊</td><td>存取個資、一般企業系統</td></tr>
<tr><td><b>AAL3</b></td><td>以<strong>硬體密碼模組</strong>為基礎的多因子，需抵抗驗證者冒充（防釣魚）</td><td>高價值交易、特權存取</td></tr>
</table></div>
<h3>MFA 方式的抗釣魚能力比較</h3>
<div class="table-wrap"><table>
<tr><th>方式</th><th>抗釣魚</th><th>說明</th></tr>
<tr><td>簡訊 OTP</td><td>弱</td><td>可被 SIM 卡置換、即時釣魚轉送攔截</td></tr>
<tr><td>App 產生的 TOTP</td><td>弱</td><td>使用者仍可能在假網站輸入</td></tr>
<tr><td>推播核准</td><td>中</td><td>可能遭遇 <b>MFA 疲勞攻擊</b>（大量推播誘使誤按），應搭配號碼比對</td></tr>
<tr><td><b>FIDO2／通行金鑰</b></td><td>強</td><td>驗證綁定網域來源，假網站無法取得有效回應</td></tr>
<tr><td>智慧卡／PKI 憑證</td><td>強</td><td>私鑰保存在硬體中</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>NIST 800-63B 建議：密碼至少 8 碼（使用者自訂）、允許長密碼與所有字元、<b>不強制定期更換</b>、檢查是否為已外洩或常見密碼、不使用密碼提示問題。</div>` },
    { id: 'federation', title: '聯合身分與單一登入流程', html: `
<h3>SAML 2.0（SP 發起流程）</h3>
<div class="flow">
  <div><b>使用者存取 SP</b><span>服務提供者發現未登入</span></div>
  <div><b>導向 IdP</b><span>帶著 AuthnRequest</span></div>
  <div><b>IdP 驗證使用者</b><span>密碼與 MFA</span></div>
  <div><b>回傳斷言</b><span>經 IdP 簽章的 XML Assertion</span></div>
  <div><b>SP 驗證簽章</b><span>建立工作階段</span></div>
</div>
<h3>OAuth 2.0 與 OpenID Connect</h3>
<ul>
  <li><b>授權碼流程（Authorization Code Flow）</b>：最常用，取得授權碼後由後端交換 Access Token。</li>
  <li><b>PKCE</b>：為公開用戶端（行動 App、單頁應用）加入動態驗證碼，防止授權碼被攔截後冒用。<strong>現行建議所有用戶端都使用</strong>。</li>
  <li><b>隱含流程（Implicit Flow）</b>：直接在網址回傳 Token，已<strong>不建議使用</strong>。</li>
  <li><b>Client Credentials</b>：服務對服務，沒有使用者參與。</li>
  <li>OIDC 在 OAuth 之上加入 <b>ID Token</b>（JWT 格式），記載使用者身分資訊。</li>
</ul>
<div class="box warn"><b class="t">常見錯誤</b>把 OAuth 的 Access Token 當作「使用者已登入」的證明。Access Token 只代表授權，身分驗證應使用 OIDC 的 ID Token 並驗證其簽章、發行者（iss）、受眾（aud）與到期時間（exp）。</div>` },
    { id: 'pam', title: '特權存取管理（PAM）', html: `
<ul>
  <li><b>密碼保管庫</b>：特權帳號密碼集中保管，使用時借出、用畢自動更換。</li>
  <li><b>即時存取（Just-in-Time）</b>：平時無特權，需要時申請、核准後於限定時間內提升。</li>
  <li><b>工作階段側錄</b>：完整錄製管理操作，供事後稽核。</li>
  <li><b>跳板機（Jump Server）</b>：所有管理連線必須經由受控的跳板機進入。</li>
  <li><b>分層管理模型</b>：網域控制站等第 0 層資產只能由第 0 層管理員、從專用管理工作站（PAW）管理，避免高權限憑證殘留在一般電腦上。</li>
  <li><b>本機管理員密碼</b>：使用 LAPS 讓每台電腦的本機管理員密碼都不同且定期變更，避免橫向移動。</li>
</ul>` },
    { id: 'ad', title: 'Active Directory 常見攻擊與防護', html: `
<div class="table-wrap"><table>
<tr><th>攻擊</th><th>原理</th><th>偵測與防護</th></tr>
<tr><td><b>Kerberoasting</b></td><td>任何網域使用者都能為設有 SPN 的服務帳號請求服務票證，取得後離線暴力破解服務帳號密碼</td><td>服務帳號使用長且隨機的密碼或 gMSA、停用 RC4；監控事件 <b>4769</b> 中大量 RC4 票證請求</td></tr>
<tr><td><b>AS-REP Roasting</b></td><td>針對停用 Kerberos 預先驗證的帳號，取得可離線破解的回應</td><td>確保所有帳號啟用預先驗證</td></tr>
<tr><td><b>Pass-the-Hash</b></td><td>竊取 NTLM 雜湊直接驗證，不需明文密碼</td><td>限制特權帳號登入範圍、Credential Guard、停用 NTLM</td></tr>
<tr><td><b>Pass-the-Ticket</b></td><td>竊取 Kerberos 票證重複使用</td><td>縮短票證效期、Protected Users 群組</td></tr>
<tr><td><b>Golden Ticket</b></td><td>取得 <b>krbtgt</b> 帳號雜湊後偽造任意 TGT，取得網域完全控制</td><td>保護網域控制站；遭入侵時<strong>重設 krbtgt 密碼兩次</strong></td></tr>
<tr><td><b>Silver Ticket</b></td><td>以服務帳號雜湊偽造特定服務的票證</td><td>服務帳號強密碼、PAC 驗證</td></tr>
<tr><td><b>DCSync</b></td><td>濫用目錄複寫權限，冒充網域控制站取得所有帳號雜湊</td><td>嚴格控管複寫權限，監控非網域控制站發出的複寫請求</td></tr>
</table></div>
<div class="box memo"><b class="t">記憶要點</b>Golden 偽造 TGT（整個網域的通行證，靠 krbtgt）；Silver 偽造 TGS（單一服務的門票，靠服務帳號）。</div>` }
  ],
  keypoints: [
    'IAM = 身分治理 + 存取管理 + 特權存取管理 + 目錄服務',
    '人員異動時新增權限的同時必須移除舊權限',
    'AAL3 需硬體密碼模組並能抵抗驗證者冒充',
    'FIDO2／通行金鑰抗釣魚；推播 MFA 需防 MFA 疲勞攻擊',
    'OAuth 授權碼流程搭配 PKCE；隱含流程已不建議',
    'Kerberoasting 監控事件 4769；Golden Ticket 遭入侵需重設 krbtgt 兩次',
    'LAPS 防本機管理員密碼重複造成橫向移動'
  ]
},
{
  id: 'c05', subject: 1, minutes: 50,
  title: '密碼學應用與金鑰管理',
  summary: '金鑰生命週期、HSM 與雲端 KMS、PKI 規劃、TLS 安全設定、密碼儲存方案與後量子密碼遷移。',
  sections: [
    { id: 'lifecycle', title: '金鑰生命週期（NIST SP 800-57）', html: `
<p>加密系統的安全性取決於金鑰管理。演算法再強，金鑰外洩就等於沒有加密。</p>
<div class="flow">
  <div><b>產生</b><span>使用合格的亂數產生器（CSPRNG），在安全環境中產生</span></div>
  <div><b>分發／建立</b><span>以金鑰交換協定或加密包裝傳遞</span></div>
  <div><b>儲存</b><span>HSM、KMS，或以金鑰加密金鑰（KEK）保護</span></div>
  <div><b>使用</b><span>依用途限定（加密、簽章分開）</span></div>
  <div><b>輪替</b><span>依密碼期間定期更換</span></div>
  <div><b>撤銷與封存</b><span>外洩時立即撤銷；解密舊資料用的金鑰封存</span></div>
  <div><b>銷毀</b><span>安全清除所有副本</span></div>
</div>
<h3>重要原則</h3>
<ul>
  <li><b>密碼期間（Cryptoperiod）</b>：金鑰允許使用的期限，期限越短，外洩造成的損害越小。</li>
  <li><b>金鑰分離</b>：同一把金鑰不可同時用於加密與簽章。</li>
  <li><b>雙人控制（Dual Control）</b>：關鍵操作需兩人同時在場授權。</li>
  <li><b>知識分割（Split Knowledge）</b>：金鑰拆成多份由不同人保管，任何單一人員都無法還原完整金鑰。</li>
  <li><b>金鑰託管（Key Escrow）</b>：將金鑰副本交由可信任第三方保管，供緊急復原或合法調查使用。</li>
</ul>` },
    { id: 'hsm', title: 'HSM、KMS 與信封加密', html: `
<div class="table-wrap"><table>
<tr><th>方案</th><th>特性</th><th>適用</th></tr>
<tr><td><b>HSM</b>（硬體安全模組）</td><td>金鑰在防竄改硬體內產生與使用，<strong>私鑰永遠不離開設備</strong>；常見驗證標準為 FIPS 140-2／140-3</td><td>CA 根金鑰、金融交易、程式碼簽章</td></tr>
<tr><td><b>雲端 KMS</b></td><td>雲端供應商管理的金鑰服務，整合存取控制與稽核日誌</td><td>雲端資料加密</td></tr>
<tr><td><b>BYOK</b></td><td>由客戶產生金鑰後匯入雲端 KMS</td><td>需掌握金鑰來源</td></tr>
<tr><td><b>HYOK／外部金鑰</b></td><td>金鑰保留在客戶自有的 HSM，雲端需要時再呼叫</td><td>高度法遵要求</td></tr>
</table></div>
<h3>信封加密（Envelope Encryption）</h3>
<p>以<b>資料加密金鑰（DEK）</b>加密資料，再以 KMS 中的<b>金鑰加密金鑰（KEK）</b>加密 DEK，加密後的 DEK 與資料一起存放。</p>
<ul>
  <li>大量資料不必傳到 KMS，效能好。</li>
  <li>輪替 KEK 時只需重新包裝 DEK，不必重新加密全部資料。</li>
  <li>刪除 KEK 即可讓所有資料無法解密（加密抹除）。</li>
</ul>` },
    { id: 'pki', title: 'PKI 規劃與憑證管理', html: `
<h3>階層式 CA 架構</h3>
<ul>
  <li><b>根 CA 離線保存</b>：只在簽發或撤銷中繼 CA 憑證時才開機，大幅降低根金鑰外洩風險。</li>
  <li><b>中繼 CA 線上運作</b>：負責日常簽發終端憑證；中繼 CA 遭入侵時，可由根 CA 撤銷後重建。</li>
  <li><b>憑證政策（CP）與憑證實務作業基準（CPS）</b>：規範 CA 的運作與身分審驗方式。</li>
</ul>
<h3>憑證管理實務</h3>
<ul>
  <li>建立<b>憑證清冊</b>並監控到期日，避免憑證過期造成服務中斷。</li>
  <li>使用 <b>ACME</b> 協定自動化申請與更新（例如 Let's Encrypt）。</li>
  <li>設定 DNS <b>CAA 紀錄</b>，限定哪些 CA 可以為網域簽發憑證。</li>
  <li>監控<b>憑證透明度（Certificate Transparency）</b>日誌，發現未經授權簽發的憑證。</li>
  <li>私鑰外洩時立即撤銷，並確認 OCSP／CRL 已更新。</li>
</ul>
<div class="box exam"><b class="t">考點提示</b>公開信任的 TLS 憑證效期持續縮短（CA/Browser Forum 已通過逐步縮短至 47 天的時程），自動化更新已成為必要能力。</div>` },
    { id: 'tls', title: 'TLS 安全設定與密碼儲存', html: `
<h3>TLS 設定檢查清單</h3>
<ul>
  <li>僅啟用 <b>TLS 1.2 與 TLS 1.3</b>，停用 SSL 與 TLS 1.0／1.1。</li>
  <li>TLS 1.2 優先使用 <b>ECDHE</b> 金鑰交換與 <b>AEAD</b> 加密（AES-GCM、ChaCha20-Poly1305），停用 RC4、3DES、CBC 模式的弱套件、匯出等級套件與 NULL 加密。</li>
  <li>RSA 金鑰 2048 位元以上，或使用 ECDSA P-256。</li>
  <li>啟用 <b>HSTS</b>，並考慮加入 HSTS Preload 清單。</li>
  <li>啟用 OCSP Stapling；完整提供中繼憑證鏈。</li>
  <li>內部服務間通訊可使用 <b>mTLS</b>（雙向驗證），用戶端也需出示憑證。</li>
</ul>
<h3>密碼儲存方案比較</h3>
<div class="table-wrap"><table>
<tr><th>方式</th><th>評價</th></tr>
<tr><td>明文、可逆加密、Base64</td><td>不可接受</td></tr>
<tr><td>MD5、SHA-1、單次 SHA-256（不論是否加鹽）</td><td>不足：計算太快，GPU 每秒可嘗試數十億次</td></tr>
<tr><td>PBKDF2（高迭代次數）</td><td>可接受，FIPS 環境常用</td></tr>
<tr><td>bcrypt</td><td>良好</td></tr>
<tr><td><b>Argon2id</b>、scrypt</td><td>建議：同時耗費記憶體與運算，抵抗 GPU／ASIC 破解</td></tr>
</table></div>
<p>可再加上<b>胡椒（Pepper）</b>：一個存放在資料庫以外（例如 HSM 或設定檔）的秘密值，資料庫單獨外洩時攻擊者無法離線破解。</p>` },
    { id: 'pqc', title: '後量子密碼遷移', html: `
<p>大型量子電腦可利用 Shor 演算法破解 RSA、ECC、DH 等以因數分解與離散對數為基礎的演算法；對稱式加密與雜湊受 Grover 演算法影響較小，只需加長金鑰（如 AES-256）。</p>
<h3>NIST 後量子標準（2024 年 8 月發布）</h3>
<div class="table-wrap"><table>
<tr><th>標準</th><th>演算法</th><th>用途</th></tr>
<tr><td>FIPS 203</td><td>ML-KEM（源自 CRYSTALS-Kyber）</td><td>金鑰封裝（取代 RSA／ECDH 金鑰交換）</td></tr>
<tr><td>FIPS 204</td><td>ML-DSA（源自 CRYSTALS-Dilithium）</td><td>數位簽章</td></tr>
<tr><td>FIPS 205</td><td>SLH-DSA（源自 SPHINCS+）</td><td>以雜湊為基礎的數位簽章</td></tr>
</table></div>
<h3>遷移規劃步驟</h3>
<ol>
  <li><b>密碼資產盤點</b>（Cryptographic Inventory）：找出所有使用公開金鑰密碼學的系統、協定、憑證與函式庫。</li>
  <li>依資料保密年限排定優先順序——需要長期保密的資料最優先，因為存在「<b>先蒐集、後解密</b>」威脅。</li>
  <li>導入<b>密碼敏捷性（Crypto Agility）</b>：系統設計可抽換演算法，不寫死。</li>
  <li>採用<b>混合模式</b>：同時使用傳統與後量子演算法（如 X25519 + ML-KEM），任一方安全即整體安全。</li>
</ol>` }
  ],
  keypoints: [
    '金鑰生命週期：產生、分發、儲存、使用、輪替、撤銷封存、銷毀',
    '雙人控制需兩人同時授權；知識分割讓單人無法還原金鑰',
    'HSM 私鑰不離開設備；信封加密以 KEK 包裝 DEK，輪替快、可加密抹除',
    '根 CA 離線、中繼 CA 線上；CAA 紀錄限定簽發 CA',
    'TLS 只開 1.2／1.3，使用 ECDHE + AEAD；密碼儲存建議 Argon2id',
    'FIPS 203 ML-KEM、FIPS 204 ML-DSA、FIPS 205 SLH-DSA；遷移先做密碼資產盤點'
  ]
},
{
  id: 'c06', subject: 1, minutes: 45,
  title: '供應鏈安全與營運持續規劃',
  summary: '供應商風險管理、軟體供應鏈與 SBOM、雲端服務評估，以及 ISO 22301 營運持續管理與演練設計。',
  sections: [
    { id: 'supplier', title: '供應商風險管理', html: `
<p>ISO 27001:2022 附錄 A 有一組供應商相關控制：A.5.19 供應商關係資安、A.5.20 協議中的資安、A.5.21 ICT 供應鏈資安、A.5.22 供應商服務的監督審查與變更管理、A.5.23 使用雲端服務的資安。</p>
<h3>供應商分級管理</h3>
<div class="table-wrap"><table>
<tr><th>等級</th><th>判斷依據</th><th>管理方式</th></tr>
<tr><td>高</td><td>可存取機敏資料、直接連入內網、維運核心系統</td><td>資安問卷 + 實地或遠端稽核 + 第三方驗證報告 + 年度複評</td></tr>
<tr><td>中</td><td>存取一般內部資料、提供重要服務</td><td>資安問卷 + 驗證證書 + 兩年複評</td></tr>
<tr><td>低</td><td>無資料存取、可替代性高</td><td>契約條款即可</td></tr>
</table></div>
<h3>常見的第三方保證文件</h3>
<ul>
  <li><b>ISO/IEC 27001 證書</b>：需確認<strong>驗證範圍</strong>是否涵蓋提供給你的服務。</li>
  <li><b>SOC 2 Type II 報告</b>：會計師對服務組織控制措施在一段期間內<strong>運作有效性</strong>的查核（Type I 只看某一時點的設計）。</li>
  <li><b>CSA STAR</b>：雲端安全聯盟的雲端服務評估。</li>
</ul>
<div class="box warn"><b class="t">常見錯誤</b>供應商有 ISO 27001 證書就直接認定安全。證書範圍可能只涵蓋總部辦公室，而非為你提供服務的資料中心或開發團隊。</div>` },
    { id: 'software', title: '軟體供應鏈安全', html: `
<ul>
  <li><b>SBOM</b>（軟體物料清單）：列出軟體使用的所有元件、版本與相依關係。常見格式：<b>SPDX</b>、<b>CycloneDX</b>。出現新漏洞（如 Log4Shell）時可立即查出受影響的系統。</li>
  <li><b>SCA</b>（軟體組成分析）：自動比對相依套件的已知漏洞與授權風險。</li>
  <li><b>SLSA</b>（軟體構件供應鏈等級）：定義建置流程完整性等級，例如建置環境隔離、產出來源證明（Provenance）。</li>
  <li><b>程式碼簽章</b>：確保軟體更新來自原廠且未遭竄改；簽章金鑰須保存在 HSM。</li>
  <li><b>相依套件混淆攻擊（Dependency Confusion）</b>：攻擊者在公開套件庫上傳與企業內部套件同名、版本號更高的惡意套件；防禦方式為指定私有套件來源與命名空間。</li>
  <li><b>錯字套件（Typosquatting）</b>：發布名稱相近的惡意套件，例如 <code>reqeusts</code>。</li>
</ul>
<div class="box tip"><b class="t">參考框架</b>NIST SP 800-161（供應鏈風險管理）、NIST SSDF（SP 800-218 安全軟體開發框架）。</div>` },
    { id: 'bcms', title: 'ISO 22301 營運持續管理', html: `
<p>ISO 22301 營運持續管理系統（BCMS）同樣採用條文 4～10 的高階架構，核心活動是 <b>BIA</b> 與<b>風險評鑑</b>，再據以制定營運持續策略與計畫。</p>
<h3>BIA 實作步驟</h3>
<ol>
  <li>識別產品與服務，以及支援它們的<b>活動</b>。</li>
  <li>評估中斷隨時間增加的衝擊（1 小時、1 天、1 週……）。</li>
  <li>訂定<b>最大可容忍中斷期間（MTPD）</b>，再訂定<b>復原時間目標（RTO）</b>，RTO 必須小於 MTPD。</li>
  <li>訂定<b>最低營運持續目標（MBCO）</b>：中斷期間可接受的最低服務水準，例如「至少維持 30% 的出貨量」。</li>
  <li>識別相依性：人員、場所、IT 系統、資料（RPO）、供應商。</li>
</ol>
<div class="box exam"><b class="t">考點提示</b>RTO 是由<b>業務需求</b>決定的，IT 單位再依 RTO 設計技術方案。若 IT 現有能力達不到 RTO，應提出差距與投資需求，而不是修改 RTO 去配合現況。</div>
<h3>營運持續策略</h3>
<ul>
  <li>人員：交叉訓練、遠距工作、替代人力。</li>
  <li>場所：備援辦公室、分散據點。</li>
  <li>IT：備援機房、雲端災備、資料複寫。</li>
  <li>供應商：雙供應商、安全庫存。</li>
</ul>` },
    { id: 'exercise', title: '演練設計與 DR 架構', html: `
<h3>演練類型</h3>
<div class="table-wrap"><table>
<tr><th>類型</th><th>內容</th><th>目的</th></tr>
<tr><td>桌上演練</td><td>以情境腳本口頭推演決策與溝通</td><td>驗證計畫與角色分工</td></tr>
<tr><td>功能演練</td><td>實際執行部分程序，例如還原單一系統</td><td>驗證技術程序</td></tr>
<tr><td>全面演練</td><td>切換到備援站實際營運</td><td>驗證整體 RTO 是否達成</td></tr>
</table></div>
<p>演練完成後須撰寫報告：<b>目標達成情形、實際復原時間與 RTO 的差距、發現的問題、改善行動與負責人</b>，並追蹤改善。</p>
<h3>災難復原技術架構</h3>
<div class="table-wrap"><table>
<tr><th>架構</th><th>RTO／RPO</th><th>說明</th></tr>
<tr><td>備份與還原</td><td>數小時～數天</td><td>成本最低，依賴備份還原速度</td></tr>
<tr><td>Pilot Light</td><td>數十分鐘～數小時</td><td>備援端只維持核心元件（如資料庫複寫），其他需要時再啟動</td></tr>
<tr><td>暖備援（Warm Standby）</td><td>數分鐘</td><td>備援端以較小規模持續運作，需要時擴充</td></tr>
<tr><td>多站點主動／主動</td><td>接近零</td><td>多站同時提供服務，成本最高</td></tr>
</table></div>
<div class="box warn"><b class="t">勒索軟體情境</b>即時複寫會把加密後的資料一起複寫到備援站。因此除了複寫，仍需保留<b>離線或不可變的備份</b>，並在還原前確認備份未遭感染。</div>` }
  ],
  keypoints: [
    '供應商依存取程度分級管理；高風險供應商需稽核與第三方報告',
    '確認 ISO 27001 證書範圍是否涵蓋實際服務；SOC 2 Type II 檢視一段期間的運作有效性',
    'SBOM 格式 SPDX、CycloneDX；相依套件混淆攻擊以指定私有來源防禦',
    'BIA：MTPD → RTO（< MTPD）→ MBCO → 相依性與 RPO',
    'RTO 由業務決定，IT 據以設計方案',
    '演練需比較實際復原時間與 RTO 並追蹤改善；即時複寫無法防勒索，需不可變備份'
  ]
},
{
  id: 'c07', subject: 1, minutes: 45,
  title: '安全架構與網路規劃',
  summary: '網路分區與區段設計、縱深防禦架構、零信任導入規劃、日誌架構，以及安全組態基準的推動。',
  sections: [
    { id: 'zones', title: '網路分區設計', html: `
<p>網路分區的目的是<strong>限制攻擊者的橫向移動</strong>，讓單一區域被入侵時不會擴散到整個網路。</p>
<div class="table-wrap"><table>
<tr><th>區域</th><th>內容</th><th>存取原則</th></tr>
<tr><td>外部區</td><td>網際網路</td><td>不信任</td></tr>
<tr><td>DMZ</td><td>對外網站、郵件閘道、反向代理</td><td>外部只能到 DMZ；DMZ 只能以特定埠連到應用區</td></tr>
<tr><td>應用區</td><td>應用伺服器、API</td><td>只接受 DMZ 與使用者區的特定連線</td></tr>
<tr><td>資料區</td><td>資料庫、檔案伺服器</td><td>只接受應用區連線，不可直接連外</td></tr>
<tr><td>管理區</td><td>跳板機、監控、日誌、備份伺服器</td><td>管理介面只開放給管理區</td></tr>
<tr><td>使用者區</td><td>員工電腦</td><td>依部門再切分 VLAN</td></tr>
<tr><td>訪客與 IoT 區</td><td>訪客 Wi-Fi、印表機、監視器</td><td>與內網完全隔離</td></tr>
</table></div>
<h3>防火牆規則設計原則</h3>
<ul>
  <li>預設拒絕，只開放必要的來源、目的、埠號。</li>
  <li>嚴格管控<strong>出站流量</strong>：伺服器通常不需要任意連外，限制出站能阻斷惡意程式回連 C2 與資料外洩。</li>
  <li>每條規則記錄申請人、用途、到期日，定期審查並移除過期規則。</li>
  <li>避免 any 規則與過大的網段範圍。</li>
</ul>` },
    { id: 'defense', title: '縱深防禦架構', html: `
<div class="table-wrap"><table>
<tr><th>層次</th><th>控制措施</th></tr>
<tr><td>邊界</td><td>防火牆、IPS、Anti-DDoS、郵件閘道、網頁閘道（SWG）</td></tr>
<tr><td>網路</td><td>分區、VLAN、NAC（802.1X）、內部防火牆、NDR</td></tr>
<tr><td>端點</td><td>EDR、主機防火牆、應用程式白名單、磁碟加密、GCB 組態</td></tr>
<tr><td>應用</td><td>WAF、安全開發、輸入驗證、API 閘道</td></tr>
<tr><td>資料</td><td>分級、加密、DLP、資料庫稽核、備份</td></tr>
<tr><td>身分</td><td>MFA、SSO、PAM、條件式存取</td></tr>
<tr><td>監控</td><td>集中日誌、SIEM、SOC、威脅獵捕</td></tr>
<tr><td>人員與流程</td><td>教育訓練、事件應變、變更管理、稽核</td></tr>
</table></div>
<div class="box tip"><b class="t">規劃技巧</b>以 NIST CSF 的六大功能檢查覆蓋度：每個重要資產是否都有「識別、保護、偵測、回應、復原」各面向的控制，而非只集中在保護。</div>` },
    { id: 'zt', title: '零信任導入規劃', html: `
<p>依 NIST SP 800-207，零信任的核心是：<strong>所有資源存取都以每次請求為單位，依身分、裝置狀態與情境動態評估</strong>。</p>
<h3>邏輯元件</h3>
<ul>
  <li><b>政策引擎（PE）</b>：依政策與信任演算法做出允許或拒絕的決定。</li>
  <li><b>政策管理器（PA）</b>：依 PE 的決定建立或關閉連線，並下達指令給 PEP。</li>
  <li><b>政策執行點（PEP）</b>：位於主體與資源之間，實際放行或阻擋。</li>
  <li>PE 與 PA 合稱<b>政策決策點（PDP）</b>。輸入來源包括：身分系統、裝置管理（MDM／EDR 狀態）、威脅情資、SIEM、資料存取政策。</li>
</ul>
<h3>分階段導入</h3>
<ol>
  <li>盤點資產、使用者、資料流，找出最重要的保護標的。</li>
  <li><b>身分</b>：全面 MFA、SSO、條件式存取。</li>
  <li><b>裝置</b>：設備註冊與健康狀態檢查。</li>
  <li><b>網路</b>：微分段，以 ZTNA 取代全通式 VPN。</li>
  <li><b>應用與資料</b>：細緻授權、資料分級與加密。</li>
  <li><b>可視性與自動化</b>：持續監控與自動回應。</li>
</ol>
<div class="box exam"><b class="t">考點提示</b>我國政府零信任網路推動分為三大核心機制：<b>身分鑑別、設備鑑別、信任推斷</b>，依序導入。零信任是架構與策略，不是單一產品。</div>` },
    { id: 'logging', title: '日誌架構規劃', html: `
<h3>應收集的日誌來源</h3>
<ul>
  <li>身分：AD 登入、VPN、SSO、MFA 失敗、特權帳號使用</li>
  <li>網路：防火牆允許與拒絕、Proxy、DNS 查詢、IDS／IPS 告警</li>
  <li>端點：EDR 告警、行程建立（含命令列參數）、PowerShell 腳本日誌</li>
  <li>應用：登入、權限變更、重要交易、錯誤</li>
  <li>雲端：管理平台操作紀錄（如 AWS CloudTrail）、儲存體存取紀錄</li>
</ul>
<h3>架構要點</h3>
<ul>
  <li>日誌即時傳送到<b>獨立、權限分離</b>的日誌平台，系統管理員不能刪除日誌。</li>
  <li>所有設備以 NTP 同步時間，並統一時區。</li>
  <li>以雜湊鏈或 WORM 儲存保護完整性。</li>
  <li>訂定保存期限：線上可查詢期（例如 90 天）與封存期（例如 1 年以上），依法規要求調整。</li>
  <li>日誌中避免記錄密碼、完整卡號等敏感資料。</li>
</ul>` },
    { id: 'baseline', title: '安全組態基準推動', html: `
<p>組態錯誤是常見的入侵原因。推動安全組態基準的步驟：</p>
<div class="flow">
  <div><b>選定基準</b><span>GCB、CIS Benchmarks、原廠建議</span></div>
  <div><b>測試相容性</b><span>在測試環境找出影響業務的項目</span></div>
  <div><b>例外管理</b><span>無法套用的項目需申請例外與補償控制</span></div>
  <div><b>部署</b><span>群組原則（GPO）、組態管理工具</span></div>
  <div><b>持續檢查</b><span>定期掃描組態偏移並矯正</span></div>
</div>
<p>ISO 27001:2022 新增的 <b>A.8.9 組態管理</b>即要求建立、記錄、實施、監控並審查硬體、軟體、服務與網路的安全組態。</p>
<div class="box tip"><b class="t">基礎設施即程式碼</b>雲端環境可將組態寫成程式碼（Terraform、CloudFormation），在部署前以政策檢查工具自動驗證是否符合基準，達到「組態左移」。</div>` }
  ],
  keypoints: [
    '網路分區限制橫向移動；資料區不可直接連外、管理介面只對管理區開放',
    '嚴格管控出站流量可阻斷 C2 回連與資料外洩；防火牆規則需有到期與審查',
    '縱深防禦以 CSF 功能檢查覆蓋度，不只集中在保護',
    'NIST 800-207：PE + PA = PDP，PEP 執行；政府推動身分、設備、信任推斷',
    '日誌集中於權限分離平台、NTP 同步、防竄改、訂定保存期限',
    'A.8.9 組態管理；基準推動需有例外管理與組態偏移檢查'
  ]
}
);
