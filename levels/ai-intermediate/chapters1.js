/* AI 應用規劃師中級 科目一：人工智慧技術應用與規劃（L21） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 55,
  title: '自然語言處理技術與應用',
  summary: 'L21101：NLP、NLU、NLG 的關係，文字前處理、詞向量、序列模型、Transformer 與注意力機制、BERT 與 GPT，常見任務與評估指標。',
  sections: [
    { id: 'overview', title: 'NLP 的範圍與任務', html: `
<div class="concepts">
  <div class="concept"><b>NLP 自然語言處理</b><span>讓機器處理人類語言的總稱</span></div>
  <div class="concept"><b>NLU 自然語言理解</b><span>理解意義：意圖辨識、情感分析、命名實體辨識</span></div>
  <div class="concept"><b>NLG 自然語言生成</b><span>產生文字：摘要、翻譯、對話回覆</span></div>
</div>
<div class="table-wrap"><table>
<tr><th>任務</th><th>說明</th><th>應用</th></tr>
<tr><td>文本分類</td><td>將文本分到類別</td><td>垃圾郵件、客訴分類、新聞分類</td></tr>
<tr><td>情感分析</td><td>判斷正負面情緒</td><td>評論分析、輿情監測</td></tr>
<tr><td><b>命名實體辨識 NER</b></td><td>找出人名、地名、組織、日期等</td><td>合約關鍵資訊擷取、履歷解析</td></tr>
<tr><td>機器翻譯</td><td>語言轉換</td><td>多語客服</td></tr>
<tr><td>文本摘要</td><td>抽取式（挑出原句）與生成式（重新改寫）</td><td>會議紀錄、新聞摘要</td></tr>
<tr><td>問答與對話</td><td>回答問題、多輪對話</td><td>智慧客服、知識問答</td></tr>
</table></div>` },
    { id: 'pre', title: '文字前處理與向量化', html: `
<div class="flow">
  <div><b>斷詞 Tokenization</b><span>中文需斷詞（如 jieba）；LLM 用子詞（BPE）</span></div>
  <div><b>正規化</b><span>大小寫、全半形、繁簡統一</span></div>
  <div><b>去除停用詞</b><span>的、了、the、a 等高頻低資訊詞</span></div>
  <div><b>詞幹還原／詞形還原</b><span>Stemming／Lemmatization（英文）</span></div>
  <div><b>向量化</b><span>把文字轉成數字</span></div>
</div>
<div class="table-wrap"><table>
<tr><th>表示法</th><th>說明</th><th>特性</th></tr>
<tr><td><b>詞袋 Bag of Words</b></td><td>計算每個詞出現次數</td><td>忽略順序與語意，向量稀疏</td></tr>
<tr><td><b>TF-IDF</b></td><td>詞頻 × 逆文件頻率；在本文件常出現、在其他文件少出現的詞權重高</td><td>能凸顯關鍵詞，仍無語意</td></tr>
<tr><td><b>詞嵌入 Word2Vec／GloVe</b></td><td>以稠密向量表示詞義，意思相近的詞向量距離近</td><td>可做「國王 − 男 + 女 ≈ 女王」，但一詞一向量，無法處理一詞多義</td></tr>
<tr><td><b>上下文嵌入 BERT 等</b></td><td>同一個詞在不同句子有不同向量</td><td>可處理一詞多義（如「蘋果」公司與水果）</td></tr>
</table></div>
<p>兩個向量的相似度常用<b>餘弦相似度（Cosine Similarity）</b>計算，RAG 的語意檢索也是這個原理。</p>` },
    { id: 'models', title: '序列模型與 Transformer', html: `
<ul>
  <li><b>RNN 循環神經網路</b>：依序處理文字，前一步的輸出傳給下一步。缺點：長句子會<b>梯度消失</b>、無法平行運算。</li>
  <li><b>LSTM／GRU</b>：加入閘門（Gate）機制保留長期記憶，緩解梯度消失。</li>
  <li><b>Transformer（2017）</b>：完全以<b>自注意力機制（Self-Attention）</b>計算每個詞與其他所有詞的關聯，可<b>平行運算</b>、擅長長距離依賴；以<b>位置編碼（Positional Encoding）</b>補上詞序資訊。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>模型</th><th>架構</th><th>訓練方式</th><th>擅長</th></tr>
<tr><td><b>BERT</b></td><td>Transformer <b>編碼器（Encoder）</b></td><td>遮罩語言模型（猜被遮住的詞），<b>雙向</b>理解上下文</td><td>理解類：分類、NER、問答抽取</td></tr>
<tr><td><b>GPT</b></td><td>Transformer <b>解碼器（Decoder）</b></td><td>預測下一個詞，<b>單向</b>（自迴歸）</td><td>生成類：對話、寫作、程式碼</td></tr>
<tr><td><b>T5／BART</b></td><td>編碼器 + 解碼器</td><td>序列到序列</td><td>翻譯、摘要</td></tr>
</table></div>` },
    { id: 'eval', title: '評估指標', html: `
<div class="table-wrap"><table>
<tr><th>指標</th><th>用途</th><th>說明</th></tr>
<tr><td>準確率、F1</td><td>分類、NER</td><td>同一般分類指標</td></tr>
<tr><td><b>BLEU</b></td><td><b>機器翻譯</b></td><td>比較生成結果與參考譯文的 n-gram 重疊，偏重精確率</td></tr>
<tr><td><b>ROUGE</b></td><td><b>摘要</b></td><td>比較與參考摘要的重疊，偏重召回率</td></tr>
<tr><td><b>Perplexity 困惑度</b></td><td>語言模型</td><td>越低代表模型對文字預測越有把握</td></tr>
<tr><td>人工評估</td><td>生成式任務</td><td>流暢度、正確性、相關性</td></tr>
</table></div>
<div class="box exam"><b class="t">考點提示</b>翻譯看 <b>BLEU</b>，摘要看 <b>ROUGE</b>。情境題常問「要評估自動摘要品質，應使用哪個指標」。</div>` }
  ],
  keypoints: [
    'NLP 包含 NLU（理解）與 NLG（生成）',
    'TF-IDF 凸顯關鍵詞；Word2Vec 有語意但一詞一向量；BERT 為上下文嵌入',
    'RNN 有梯度消失問題；LSTM 以閘門保留長期記憶',
    'Transformer 以自注意力平行運算，需位置編碼',
    'BERT 編碼器雙向理解；GPT 解碼器單向生成',
    '翻譯用 BLEU，摘要用 ROUGE，語言模型用困惑度'
  ]
},
{
  id: 'c02', subject: 1, minutes: 55,
  title: '電腦視覺技術與應用',
  summary: 'L21102：影像前處理與資料擴增、CNN 卷積與池化、影像分類／物件偵測／影像分割、經典模型、ViT、遷移學習與評估指標。',
  sections: [
    { id: 'basics', title: '影像基礎與前處理', html: `
<ul>
  <li>數位影像由<b>像素</b>組成；灰階影像是二維矩陣，彩色影像有 RGB 三個通道（高 × 寬 × 3）。</li>
  <li><b>前處理</b>：調整尺寸、正規化像素值（0～255 縮放到 0～1）、去雜訊、灰階化、直方圖均衡化。</li>
  <li><b>資料擴增（Data Augmentation）</b>：翻轉、旋轉、裁切、縮放、調整亮度與對比、加入雜訊，增加訓練資料多樣性、<b>降低過擬合</b>。</li>
</ul>` },
    { id: 'cnn', title: '卷積神經網路（CNN）', html: `
<div class="table-wrap"><table>
<tr><th>元件</th><th>功能</th></tr>
<tr><td><b>卷積層 Convolution</b></td><td>以<b>濾波器（Filter／Kernel）</b>滑動掃描影像，擷取邊緣、紋理等局部特徵；<b>權重共享</b>大幅減少參數</td></tr>
<tr><td><b>步幅 Stride</b>／<b>填補 Padding</b></td><td>步幅決定每次移動距離；填補在邊緣補 0 以維持尺寸</td></tr>
<tr><td><b>激活函數 ReLU</b></td><td>加入非線性</td></tr>
<tr><td><b>池化層 Pooling</b></td><td>最大池化（Max Pooling）縮小特徵圖、減少運算，並提供一定的平移不變性</td></tr>
<tr><td><b>全連接層 Fully Connected</b></td><td>整合特徵輸出分類結果，最後常接 Softmax</td></tr>
</table></div>
<p>淺層學到邊緣與顏色，深層學到形狀與物體部件，這就是<b>階層式特徵學習</b>。</p>
<p class="mono center">輸出尺寸 = (輸入 − 濾波器 + 2 × 填補) ÷ 步幅 + 1</p>
<div class="box analogy"><b class="t">計算範例</b>輸入 32×32，濾波器 5×5，填補 0，步幅 1：(32 − 5 + 0) ÷ 1 + 1 = 28，輸出 28×28。</div>` },
    { id: 'tasks', title: '三大任務與經典模型', html: `
<div class="table-wrap"><table>
<tr><th>任務</th><th>回答的問題</th><th>輸出</th><th>代表模型</th></tr>
<tr><td><b>影像分類</b></td><td>這張圖是什麼？</td><td>類別標籤</td><td>LeNet、AlexNet、VGG、<b>ResNet</b>（殘差連接解決深層網路退化）</td></tr>
<tr><td><b>物件偵測</b></td><td>有哪些物體、在哪裡？</td><td>類別 + <b>邊界框（Bounding Box）</b></td><td>R-CNN 系列（兩階段，較準）、<b>YOLO</b>、SSD（單階段，較快，適合即時）</td></tr>
<tr><td><b>語意分割</b></td><td>每個像素屬於哪一類？</td><td>像素級遮罩</td><td>U-Net（醫學影像常用）、FCN</td></tr>
<tr><td><b>實例分割</b></td><td>區分同類別的不同個體</td><td>每個物體各自的遮罩</td><td>Mask R-CNN</td></tr>
</table></div>
<ul>
  <li><b>Vision Transformer（ViT）</b>：把影像切成小區塊（Patch）當作詞元，用 Transformer 處理，大資料下表現優異。</li>
  <li><b>遷移學習</b>：用 ImageNet 預訓練的模型，凍結前面層、只微調後面層，少量資料即可達到好效果。</li>
  <li>其他應用：人臉辨識、OCR 文字辨識、姿態估計、影像生成、瑕疵檢測、醫學影像。</li>
</ul>` },
    { id: 'metrics', title: '評估指標', html: `
<ul>
  <li><b>IoU（Intersection over Union）</b>：預測框與真實框的<b>交集 ÷ 聯集</b>，常以 IoU ≥ 0.5 視為偵測正確。</li>
  <li><b>mAP（mean Average Precision）</b>：各類別 AP 的平均，物件偵測的主要指標。</li>
  <li><b>NMS 非極大值抑制</b>：移除重疊過多的重複框，只保留信心分數最高的框。</li>
  <li>分割常用 <b>IoU</b> 或 <b>Dice 係數</b>。</li>
</ul>
<div class="box exam"><b class="t">考點提示</b>工廠產線需要<b>即時</b>偵測瑕疵位置，常選擇 YOLO 等單階段模型；只需要判斷良品或不良品，用影像分類即可；需要精確量測瑕疵面積，要用影像分割。</div>` }
  ],
  keypoints: [
    '資料擴增（翻轉、旋轉、裁切）可降低過擬合',
    'CNN：卷積擷取局部特徵、權重共享；池化縮小特徵圖',
    '輸出尺寸 =（輸入 − 濾波器 + 2×填補）÷ 步幅 + 1',
    '分類問是什麼；偵測問在哪裡（框）；分割問每個像素屬於哪類',
    'YOLO 單階段速度快；R-CNN 兩階段較精確；U-Net 常用於醫學分割',
    'ResNet 以殘差連接訓練很深的網路；ViT 把影像切塊用 Transformer',
    'IoU = 交集 ÷ 聯集；偵測主要看 mAP'
  ]
},
{
  id: 'c03', subject: 1, minutes: 55,
  title: '生成式 AI 與多模態應用',
  summary: 'L21103–L21104：LLM 訓練流程、參數高效微調、生成參數與解碼策略、RAG 架構進階、AI 代理、圖像與語音生成技術，以及 CLIP 等多模態模型與應用。',
  sections: [
    { id: 'llm', title: '大型語言模型技術', html: `
<div class="flow">
  <div><b>預訓練 Pre-training</b><span>大量文字自監督學習預測下一個 Token</span></div>
  <div><b>監督式微調 SFT</b><span>以指令與回答範例學習遵循指令</span></div>
  <div><b>對齊 Alignment</b><span>RLHF 或 DPO，依人類偏好調整</span></div>
</div>
<ul>
  <li><b>RLHF</b>：先以人類排序訓練<b>獎勵模型（Reward Model）</b>，再用強化學習（如 PPO）優化。<b>DPO</b> 直接以偏好資料優化，不需另訓練獎勵模型。</li>
  <li><b>縮放定律（Scaling Laws）</b>：模型參數、資料量與算力增加，效能大致可預期地提升。</li>
  <li><b>湧現能力（Emergent Abilities）</b>：模型規模達到一定程度後突然出現的能力。</li>
  <li><b>推理模型</b>：在回答前先產生較長的內部推理過程，以提升數學與邏輯任務表現。</li>
</ul>
<h3>參數高效微調（PEFT）</h3>
<ul>
  <li><b>LoRA</b>：凍結原模型權重，只訓練插入的<b>低秩矩陣</b>，大幅降低記憶體與儲存需求。</li>
  <li><b>QLoRA</b>：再搭配<b>量化（Quantization）</b>，以較低位元表示權重，可在單張 GPU 微調大模型。</li>
  <li><b>知識蒸餾（Knowledge Distillation）</b>：以大模型（教師）指導小模型（學生），產生較小、較快的模型。</li>
</ul>` },
    { id: 'decode', title: '解碼策略與進階 RAG', html: `
<div class="table-wrap"><table>
<tr><th>策略</th><th>說明</th></tr>
<tr><td><b>貪婪解碼 Greedy</b></td><td>每步選機率最高的詞，穩定但容易重複</td></tr>
<tr><td><b>集束搜尋 Beam Search</b></td><td>同時保留多條候選序列，常用於翻譯</td></tr>
<tr><td><b>Top-k</b></td><td>從機率最高的 k 個詞中抽樣</td></tr>
<tr><td><b>Top-p（Nucleus）</b></td><td>從累積機率達 p 的最小詞集合中抽樣</td></tr>
<tr><td><b>Temperature</b></td><td>調整機率分布的平滑程度，低溫集中、高溫分散</td></tr>
</table></div>
<h3>RAG 進階設計</h3>
<ul>
  <li><b>切塊策略</b>：固定長度、依段落或語意切塊，並保留重疊（Overlap）避免上下文斷裂。</li>
  <li><b>檢索方式</b>：<b>稀疏檢索</b>（BM25 關鍵字）、<b>稠密檢索</b>（向量語意）、<b>混合檢索</b>（兩者結合）；再以<b>重排序（Re-ranking）</b>提升精準度。</li>
  <li><b>評估</b>：檢索面（是否找對文件）與生成面（回答是否忠於檢索內容 Faithfulness、是否切題）。</li>
</ul>
<h3>AI 代理</h3>
<p>代理結合 LLM 的<b>規劃（Planning）</b>、<b>記憶（Memory）</b>與<b>工具使用（Tool Use）</b>，常見模式如 <b>ReAct</b>（推理 Reasoning 與行動 Acting 交替進行）。<b>MCP（Model Context Protocol）</b>等開放協定讓模型以標準方式連接外部工具與資料來源。</p>` },
    { id: 'media', title: '圖像、語音與影片生成', html: `
<div class="table-wrap"><table>
<tr><th>類型</th><th>技術</th><th>應用</th></tr>
<tr><td><b>文字生成圖像</b></td><td><b>擴散模型</b>；<b>潛在擴散（Latent Diffusion）</b>在壓縮的潛在空間去噪以節省運算，如 Stable Diffusion</td><td>設計、廣告、概念圖</td></tr>
<tr><td>可控生成</td><td><b>ControlNet</b> 以邊緣、姿勢等條件控制構圖；Inpainting 局部修補</td><td>商品圖、修圖</td></tr>
<tr><td><b>語音合成 TTS</b></td><td>神經網路語音合成、聲音複製</td><td>有聲書、客服、配音</td></tr>
<tr><td><b>語音辨識 ASR</b></td><td>如 Whisper，語音轉文字</td><td>逐字稿、字幕</td></tr>
<tr><td>影片生成</td><td>擴散模型延伸到時間維度</td><td>短影音、教學影片</td></tr>
</table></div>
<p>GAN 生成速度快但訓練不穩定，可能出現<b>模式崩潰（Mode Collapse）</b>，即只生成少數幾種樣本；擴散模型品質與多樣性較佳但生成較慢。</p>` },
    { id: 'multi', title: '多模態人工智慧', html: `
<p><b>多模態 AI</b> 同時處理文字、影像、聲音、影片等多種資料型態。</p>
<ul>
  <li><b>CLIP</b>：以大量「圖片－文字」配對進行<b>對比學習（Contrastive Learning）</b>，讓圖片與描述它的文字在同一個向量空間中靠近，可做<b>零樣本影像分類</b>與圖文檢索。</li>
  <li><b>視覺語言模型（VLM）</b>：看圖回答問題、圖表解讀、文件理解。</li>
  <li><b>融合方式</b>：<b>早期融合</b>（先合併原始特徵再建模）與<b>晚期融合</b>（各模態分別建模再合併結果）。</li>
</ul>
<div class="table-wrap"><table>
<tr><th>應用</th><th>模態</th></tr>
<tr><td>智慧客服看截圖排除問題</td><td>影像 + 文字</td></tr>
<tr><td>醫療影像搭配病歷輔助診斷</td><td>影像 + 文字</td></tr>
<tr><td>自駕車感知</td><td>攝影機 + 光達 + 雷達</td></tr>
<tr><td>會議助理產生摘要</td><td>語音 + 文字 + 投影片</td></tr>
</table></div>
<div class="box warn"><b class="t">多模態風險</b>影像中可能隱藏提示注入文字、深偽影音、跨模態的隱私資訊（照片中的證件或位置），且運算成本較高。</div>` }
  ],
  keypoints: [
    'LLM 訓練：預訓練 → SFT → RLHF／DPO 對齊',
    'LoRA 凍結原權重、只訓練低秩矩陣；QLoRA 再加量化',
    '知識蒸餾：大模型教小模型',
    '解碼：Greedy、Beam Search、Top-k、Top-p、Temperature',
    'RAG 進階：混合檢索（BM25 + 向量）與重排序',
    'ReAct 交替推理與行動；MCP 標準化工具連接',
    '潛在擴散在潛在空間去噪；GAN 可能模式崩潰',
    'CLIP 以對比學習對齊圖文，可零樣本分類'
  ]
},
{
  id: 'c04', subject: 1, minutes: 50,
  title: 'AI 導入評估與規劃',
  summary: 'L21201–L21202：需求分析、技術可行性與資料可行性、方案選擇與成本效益、POC 設計與成功指標、專案規劃、資源分配與 KPI。',
  sections: [
    { id: 'assess', title: '導入評估', html: `
<h3>三種可行性</h3>
<div class="concepts">
  <div class="concept"><b>商業可行性</b><span>是否解決真實痛點、效益是否大於成本</span></div>
  <div class="concept"><b>技術可行性</b><span>現有技術能否達到需要的準確度與速度</span></div>
  <div class="concept"><b>資料可行性</b><span>資料數量、品質、標註、取得授權是否足夠</span></div>
</div>
<h3>評估流程</h3>
<div class="flow">
  <div><b>業務需求與痛點</b><span>訪談、流程分析</span></div>
  <div><b>定義成功指標</b><span>業務 KPI 與模型指標</span></div>
  <div><b>盤點資料與資源</b><span>資料、人力、預算、基礎設施</span></div>
  <div><b>方案比較</b><span>技術、工具、模型效能</span></div>
  <div><b>成本效益分析</b><span>TCO、ROI、回收期</span></div>
  <div><b>POC 驗證</b><span>小規模驗證後決策</span></div>
</div>
<div class="box warn"><b class="t">常見失敗原因</b>沒有清楚的業務目標、資料品質不足、只看模型準確度忽略業務流程、缺乏使用者參與、POC 成功後無法規模化。</div>` },
    { id: 'choose', title: '方案選擇與成本效益', html: `
<div class="table-wrap"><table>
<tr><th>方案</th><th>適合</th><th>考量</th></tr>
<tr><td>商用 API／SaaS</td><td>快速上線、通用任務</td><td>依用量計費、資料外傳、供應商依賴</td></tr>
<tr><td>開源模型自行部署</td><td>資料敏感、需客製</td><td>GPU 成本、維運人力</td></tr>
<tr><td>微調既有模型</td><td>特定領域用語與任務</td><td>需要標註資料與 ML 能力</td></tr>
<tr><td>傳統機器學習</td><td>結構化資料的預測與分類</td><td>可解釋、成本低，<b>不是所有問題都需要 LLM</b></td></tr>
<tr><td>規則式系統</td><td>邏輯明確且穩定</td><td>最簡單可靠</td></tr>
</table></div>
<h3>成本效益</h3>
<ul>
  <li><b>總擁有成本 TCO</b>：開發、授權、算力、資料標註、整合、維運、人員訓練、模型更新。</li>
  <li><b>ROI</b> =（效益 − 成本）÷ 成本；<b>回收期</b> = 初期投資 ÷ 每期淨效益。</li>
  <li>效益包含有形（節省人力、增加營收、降低錯誤）與無形（客戶體驗、決策品質）。</li>
</ul>` },
    { id: 'plan', title: 'POC 與導入規劃', html: `
<h3>POC 設計要點</h3>
<ul>
  <li>範圍小、時程短（通常數週）、目標明確。</li>
  <li>事先定義<b>成功標準</b>，例如「召回率 ≥ 90% 且每張影像推論 < 200 毫秒」。</li>
  <li>使用真實或接近真實的資料，並建立<b>基準線（Baseline）</b>比較。</li>
  <li>結束後做出 <b>Go／No-Go</b> 決策。</li>
</ul>
<h3>專案規劃</h3>
<ul>
  <li><b>技術方案設計</b>：系統架構、資料流程、模型選擇、整合介面。</li>
  <li><b>目標設置</b>：SMART 目標；區分<b>業務指標</b>（客訴處理時間）與<b>技術指標</b>（F1、延遲）。</li>
  <li><b>資源分配</b>：人力（PM、資料工程師、ML 工程師、領域專家）、算力、預算、時程。</li>
  <li><b>敏捷迭代</b>：分階段交付，每階段檢討調整。</li>
  <li><b>利害關係人管理</b>：高階支持、使用者參與、法務與資安審查。</li>
</ul>` }
  ],
  keypoints: [
    '三種可行性：商業、技術、資料',
    '不是所有問題都需要 LLM；結構化資料預測常用傳統 ML',
    'TCO 涵蓋開發、授權、算力、標註、維運、訓練、更新',
    'POC 要事先定義成功標準並建立基準線，結束做 Go／No-Go',
    '區分業務指標與技術指標'
  ]
},
{
  id: 'c05', subject: 1, minutes: 50,
  title: 'AI 風險管理與負責任 AI',
  summary: 'L21203：AI 風險類型、對抗性攻擊與 LLM 安全、可解釋性方法、公平性、AI 治理框架與法規、AI 衝擊評估與紅隊演練。',
  sections: [
    { id: 'types', title: 'AI 風險類型', html: `
<div class="table-wrap"><table>
<tr><th>類型</th><th>例子</th></tr>
<tr><td><b>技術風險</b></td><td>模型錯誤、幻覺、資料漂移、效能不穩定</td></tr>
<tr><td><b>安全風險</b></td><td>對抗性攻擊、資料投毒、模型竊取、提示注入</td></tr>
<tr><td><b>倫理與公平風險</b></td><td>偏見歧視、缺乏透明、侵害自主</td></tr>
<tr><td><b>法規與合規風險</b></td><td>違反個資法、歐盟 AI 法、著作權</td></tr>
<tr><td><b>組織與人力風險</b></td><td>人才不足、過度依賴、員工抗拒、供應商依賴</td></tr>
</table></div>` },
    { id: 'security', title: 'AI 安全威脅', html: `
<div class="table-wrap"><table>
<tr><th>攻擊</th><th>階段</th><th>說明</th></tr>
<tr><td><b>對抗性樣本 Adversarial Example</b></td><td>推論</td><td>加入人眼難以察覺的擾動，讓模型誤判（如貼紙讓停車標誌被認成限速）</td></tr>
<tr><td><b>資料投毒 Data Poisoning</b></td><td>訓練</td><td>污染訓練資料或植入<b>後門（Backdoor）</b></td></tr>
<tr><td><b>模型竊取 Model Extraction</b></td><td>推論</td><td>大量查詢 API 以複製模型</td></tr>
<tr><td><b>成員推論 Membership Inference</b></td><td>推論</td><td>判斷某筆資料是否用於訓練，洩漏隱私</td></tr>
<tr><td><b>模型反轉 Model Inversion</b></td><td>推論</td><td>從模型輸出還原訓練資料特徵</td></tr>
<tr><td><b>提示注入 Prompt Injection</b></td><td>LLM</td><td>直接注入（使用者輸入）或間接注入（藏在網頁、文件）</td></tr>
<tr><td><b>越獄 Jailbreak</b></td><td>LLM</td><td>繞過模型的安全限制</td></tr>
</table></div>
<p><b>OWASP Top 10 for LLM Applications</b> 列出提示注入、敏感資訊揭露、供應鏈、資料與模型投毒、不當輸出處理、過度代理權、系統提示洩漏、向量與嵌入弱點、錯誤資訊、無限制資源消耗等風險。</p>
<p>防護：<b>對抗訓練</b>、輸入驗證與過濾、輸出檢查、速率限制、最小權限、<b>AI 紅隊演練（Red Teaming）</b>。</p>` },
    { id: 'xai', title: '可解釋性與公平性', html: `
<h3>可解釋 AI（XAI）</h3>
<ul>
  <li><b>內在可解釋模型</b>：線性迴歸、決策樹，模型本身就容易理解。</li>
  <li><b>事後解釋方法</b>：<b>SHAP</b>（以賽局理論 Shapley 值計算每個特徵的貢獻）、<b>LIME</b>（在單一預測附近以簡單模型近似解釋）、特徵重要性、<b>Grad-CAM</b>（以熱力圖顯示影像模型關注的區域）。</li>
  <li><b>全域解釋</b>說明模型整體行為；<b>局部解釋</b>說明單一預測。</li>
</ul>
<h3>公平性</h3>
<ul>
  <li>偏見來源：<b>歷史偏見</b>（過去決策本身不公平）、<b>抽樣偏見</b>（某群體樣本不足）、<b>量測偏見</b>、標註偏見。</li>
  <li>僅移除「性別」欄位不夠，郵遞區號等<b>代理變數（Proxy）</b>仍可能間接造成歧視。</li>
  <li>公平性指標與緩解方法詳見科目三第 16 章。</li>
</ul>` },
    { id: 'framework', title: '治理框架與衝擊評估', html: `
<div class="table-wrap"><table>
<tr><th>框架</th><th>重點</th></tr>
<tr><td>歐盟人工智慧法</td><td>四級風險；高風險需風險管理系統、資料治理、技術文件、紀錄、人類監督、準確性與資安</td></tr>
<tr><td>NIST AI RMF</td><td>Govern、Map、Measure、Manage</td></tr>
<tr><td>ISO/IEC 42001</td><td>AI 管理系統，可驗證</td></tr>
<tr><td>ISO/IEC 23894</td><td>AI 風險管理指引</td></tr>
<tr><td>台灣人工智慧基本法、金管會 AI 指引</td><td>七大原則；金融業六大原則與風險基礎管理</td></tr>
</table></div>
<ul>
  <li><b>AI 衝擊評估（AI Impact Assessment）</b>：上線前評估對個人、群體與社會的影響。</li>
  <li><b>模型卡（Model Card）</b>：記錄模型用途、訓練資料、效能、限制與倫理考量。</li>
  <li><b>人類監督模式</b>：Human-in-the-loop（每次決策由人確認）、Human-on-the-loop（人監看並可介入）、Human-out-of-the-loop（全自動）。</li>
</ul>` }
  ],
  keypoints: [
    '對抗性樣本在推論階段；資料投毒在訓練階段',
    '模型竊取、成員推論、模型反轉屬隱私與智財風險',
    '間接提示注入藏在網頁或文件中',
    'SHAP 以 Shapley 值計算特徵貢獻；LIME 局部近似；Grad-CAM 用熱力圖',
    '移除敏感欄位不夠，代理變數仍可能造成歧視',
    '模型卡記錄用途、資料、效能與限制'
  ]
},
{
  id: 'c06', subject: 1, minutes: 55,
  title: '數據準備、模型選擇與系統部署',
  summary: 'L21301–L21302：資料品質維度、資料洩漏、模型比較與選擇、系統架構、部署模式、MLOps、模型監控與更新、測試驗證與雲端環境。',
  sections: [
    { id: 'data', title: '數據準備', html: `
<h3>資料品質維度</h3>
<p><b>完整性</b>（缺漏）、<b>正確性</b>（錯誤值）、<b>一致性</b>（格式與定義統一）、<b>即時性</b>（是否過時）、<b>唯一性</b>（重複）、<b>有效性</b>（符合規則範圍）。</p>
<h3>資料洩漏（Data Leakage）</h3>
<p>訓練時用到了預測當下不會取得的資訊，造成評估結果虛高，上線後失準。常見例子：</p>
<ul>
  <li>先對<b>全部資料</b>做標準化或填補缺失值，再切分訓練與測試集（應只用訓練集計算統計量）。</li>
  <li>特徵中包含結果才會出現的資訊，例如預測是否住院時用到「住院天數」。</li>
  <li>時間序列資料隨機切分，讓模型看到未來的資料。</li>
</ul>` },
    { id: 'select', title: '模型選擇', html: `
<div class="table-wrap"><table>
<tr><th>模型</th><th>優點</th><th>缺點</th></tr>
<tr><td>線性／邏輯迴歸</td><td>簡單、快速、可解釋</td><td>只能處理線性關係</td></tr>
<tr><td>決策樹</td><td>可解釋、不需標準化</td><td>容易過擬合</td></tr>
<tr><td>隨機森林</td><td>穩定、抗過擬合</td><td>可解釋性下降、模型較大</td></tr>
<tr><td>梯度提升 XGBoost／LightGBM</td><td><b>結構化資料表現常最佳</b></td><td>超參數多、需調校</td></tr>
<tr><td>SVM</td><td>高維資料效果好</td><td>大資料訓練慢</td></tr>
<tr><td>深度學習</td><td>影像、語音、文字等非結構化資料最強</td><td>需大量資料與算力、可解釋性低</td></tr>
</table></div>
<p>選擇時同時考量：資料型態與數量、準確度要求、<b>可解釋性需求</b>（金融、醫療常需要）、推論速度、部署環境（雲端、邊緣）、維護成本。</p>` },
    { id: 'deploy', title: '系統架構與部署', html: `
<div class="table-wrap"><table>
<tr><th>部署模式</th><th>說明</th><th>例子</th></tr>
<tr><td><b>批次推論 Batch</b></td><td>定時大量處理</td><td>每晚計算顧客流失分數</td></tr>
<tr><td><b>線上推論 Online／Real-time</b></td><td>以 API 即時回應</td><td>交易當下的詐欺偵測</td></tr>
<tr><td><b>串流推論 Streaming</b></td><td>持續處理資料流</td><td>IoT 感測器異常偵測</td></tr>
<tr><td><b>邊緣部署 Edge</b></td><td>在裝置上推論，低延遲、資料不外傳</td><td>產線攝影機、手機</td></tr>
</table></div>
<ul>
  <li><b>容器化（Docker）</b>與<b>容器編排（Kubernetes）</b>：一致的執行環境、可自動擴充。</li>
  <li><b>模型壓縮</b>：量化、剪枝（Pruning）、知識蒸餾，讓模型能在邊緣裝置執行。</li>
  <li><b>上線策略</b>：<b>A/B 測試</b>（分流比較新舊模型）、<b>金絲雀發布</b>（先開放少量流量）、<b>影子部署</b>（新模型同步運算但不影響實際結果）。</li>
  <li><b>穩定性與可用性</b>：負載平衡、自動擴充、備援、回滾（Rollback）機制。</li>
  <li><b>雲端環境</b>：IaaS、PaaS、SaaS；雲端 AI 平台提供訓練、部署與監控服務。</li>
</ul>` },
    { id: 'mlops', title: 'MLOps 與模型監控', html: `
<p><b>MLOps</b> 把 DevOps 的自動化與持續交付應用到機器學習，涵蓋資料、模型、程式碼的版本控管與自動化流程。</p>
<div class="flow">
  <div><b>資料管線</b><span>收集、驗證、特徵</span></div>
  <div><b>訓練與實驗追蹤</b><span>記錄參數與結果（如 MLflow）</span></div>
  <div><b>模型登錄</b><span>Model Registry 版本管理</span></div>
  <div><b>CI/CD 部署</b><span>自動測試與發布</span></div>
  <div><b>監控</b><span>效能、漂移、資源</span></div>
  <div><b>持續訓練 CT</b><span>觸發重新訓練</span></div>
</div>
<div class="table-wrap"><table>
<tr><th>漂移</th><th>意義</th><th>例子</th></tr>
<tr><td><b>資料漂移 Data Drift</b></td><td>輸入資料的<b>分布</b>改變</td><td>新客群年齡層變年輕</td></tr>
<tr><td><b>概念漂移 Concept Drift</b></td><td>輸入與目標之間的<b>關係</b>改變</td><td>疫情後消費行為改變，同樣特徵代表不同結果</td></tr>
</table></div>
<p>監控項目：模型指標（準確度、F1）、資料分布（如 PSI 指標）、延遲與吞吐量、錯誤率、成本。指標低於門檻時告警並重新訓練。</p>` }
  ],
  keypoints: [
    '資料品質：完整、正確、一致、即時、唯一、有效',
    '資料洩漏：先切分再用訓練集計算標準化參數',
    '結構化資料常用梯度提升；非結構化資料用深度學習',
    '部署模式：批次、線上、串流、邊緣',
    'A/B 測試、金絲雀發布、影子部署降低上線風險',
    'MLOps：資料管線、實驗追蹤、模型登錄、CI/CD、監控、持續訓練',
    'Data Drift 輸入分布改變；Concept Drift 輸入與目標的關係改變'
  ]
}
);
