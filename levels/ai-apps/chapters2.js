/* AI 應用實作 進階篇：RAG、工具呼叫與代理流程 */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c06', subject: 2, minutes: 45,
  title: 'RAG 原理',
  summary: '為什麼需要檢索增強生成、RAG 的完整流程、切塊策略、嵌入向量與相似度、向量資料庫，以及什麼情況不需要 RAG。',
  sections: [
    { id: 'why', title: '為什麼需要 RAG', html: `
<p>模型不知道你們公司的規章、產品手冊、最新價格。把資料提供給模型有幾種方法：</p>
<table>
<tr><th>方法</th><th>做法</th><th>適合</th></tr>
<tr><td><b>直接放進提示詞</b></td><td>把整份文件貼進去</td><td>資料量不大（數十頁以內）、每次都要用全部內容</td></tr>
<tr><td><b>RAG 檢索增強生成</b></td><td>先找出最相關的段落，只把那幾段給模型</td><td>資料量大、經常更新、需要附上出處</td></tr>
<tr><td><b>微調 Fine-tuning</b></td><td>用資料重新訓練模型</td><td>要改變模型的風格或專業格式，不適合用來「記住知識」</td></tr>
</table>
<p><b>RAG（Retrieval-Augmented Generation，檢索增強生成）</b>的好處：</p>
<ul>
  <li>資料更新時只要更新資料庫，不用重新訓練模型。</li>
  <li>回答可以附上來源段落，方便查證，降低幻覺。</li>
  <li>只送相關段落，節省 token 與費用。</li>
  <li>可以依使用者權限過濾能檢索的文件。</li>
</ul>
<div class="box tip"><b class="t">先試最簡單的</b>上下文視窗越來越大，如果你的資料只有幾十頁，直接放進提示詞（搭配提示快取）往往比建 RAG 更簡單、效果更好。RAG 適合資料量大到放不下、或需要精確引用來源的情境。</div>` },
    { id: 'flow', title: 'RAG 的完整流程', html: `
<p>RAG 分成兩個階段：事先<b>建立索引</b>，以及使用者提問時<b>檢索與生成</b>。</p>
<div class="flow">
  <div><b>1. 載入文件</b><span>PDF、Word、網頁、FAQ</span></div>
  <div><b>2. 切塊</b><span>切成數百字的段落</span></div>
  <div><b>3. 向量化</b><span>每段轉成嵌入向量</span></div>
  <div><b>4. 存入資料庫</b><span>向量資料庫</span></div>
</div>
<div class="flow">
  <div><b>5. 問題向量化</b><span>使用者的問題也轉成向量</span></div>
  <div><b>6. 檢索</b><span>找出最相似的前 k 段</span></div>
  <div><b>7. 組合提示詞</b><span>問題＋相關段落＋指示</span></div>
  <div><b>8. 生成回答</b><span>附上出處</span></div>
</div>
<div class="box analogy"><b class="t">生活比喻</b>RAG 就像開書考試：考生（模型）不需要背下整本書，而是先翻目錄找到相關章節（檢索），再根據那幾頁寫答案（生成）。翻錯頁，答案就會錯，所以檢索品質決定了 RAG 的品質。</div>` },
    { id: 'chunk', title: '切塊策略', html: `
<p><b>切塊（Chunking）</b>是把長文件切成適合檢索的小段落，是影響 RAG 效果最大的環節之一。</p>
<table>
<tr><th>策略</th><th>說明</th><th>適合</th></tr>
<tr><td>固定長度</td><td>每 N 個字切一段，前後重疊 M 字</td><td>格式凌亂的純文字</td></tr>
<tr><td>依結構切</td><td>依標題、條文、段落切開</td><td>規章、手冊、法規（最推薦）</td></tr>
<tr><td>依語意切</td><td>依內容主題的轉換點切開</td><td>長篇文章、逐字稿</td></tr>
</table>
<ul>
  <li><b>太小</b>：一段話缺少前後文，例如只檢索到「須檢附證明」卻不知道是哪種假別。</li>
  <li><b>太大</b>：混入不相關內容，相似度被稀釋，也占用更多 token。</li>
  <li><b>重疊（Overlap）</b>：相鄰段落保留部分重複，避免一句話剛好被切斷。</li>
  <li><b>加上中繼資料（Metadata）</b>：每段記錄文件名稱、章節、頁碼、更新日期，回答時才能附出處，也能依部門或日期過濾。</li>
  <li><b>情境補充</b>：在每段前面加上它所屬的文件與章節標題（例如「員工手冊 > 請假規定 > 病假」），檢索準確度會明顯提升。</li>
</ul>
<div class="box tip"><b class="t">互動練習</b>到「互動練習 → 文件切塊視覺化」調整切塊大小與重疊字數，觀察同一份規章會被怎麼切開。</div>` },
    { id: 'embed', title: '嵌入向量與相似度', html: `
<p><b>嵌入（Embedding）</b>是把一段文字轉成一串數字（向量），意思相近的文字，向量在空間中的位置也會接近。例如「生病請假」和「病假規定」用字不同，但向量很接近。</p>
<p>比較兩個向量有多像，最常用<b>餘弦相似度（Cosine Similarity）</b>：值介於 -1 到 1，越接近 1 代表方向越一致、意思越相近。</p>
<pre class="py">import numpy as np

def cosine(a, b):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# 假設的 3 維向量（真實的嵌入向量通常有數百到數千維）
vec = {
    '病假規定':   np.array([0.9, 0.1, 0.0]),
    '生病請假':   np.array([0.8, 0.2, 0.1]),
    '出差住宿費': np.array([0.1, 0.9, 0.2]),
    '加班費計算': np.array([0.2, 0.3, 0.9]),
}
q = vec['生病請假']
for name, v in sorted(vec.items(), key=lambda x: -cosine(q, x[1])):
    print(f'{name}：{cosine(q, v):.3f}')</pre>
<table>
<tr><th>元件</th><th>常見選擇</th></tr>
<tr><td>嵌入模型</td><td>Voyage AI、OpenAI Embeddings、Google、開源的 BGE、multilingual-e5（選擇時要確認支援繁體中文）</td></tr>
<tr><td>向量資料庫</td><td>Chroma、FAISS（本機）、PostgreSQL + pgvector、Pinecone、Qdrant、Weaviate、雲端服務內建方案</td></tr>
</table>
<div class="box warn"><b class="t">建立索引與查詢要用同一個嵌入模型</b>不同模型產生的向量無法互相比較。更換嵌入模型時，所有文件都要重新向量化。</div>` },
    { id: 'hybrid', title: '關鍵字檢索與混合檢索', html: `
<table>
<tr><th>方法</th><th>優點</th><th>缺點</th></tr>
<tr><td><b>關鍵字檢索</b>（BM25、TF-IDF）</td><td>產品型號、法條編號、專有名詞找得很準；不需嵌入模型</td><td>同義詞找不到（「筆電」查不到「筆記型電腦」）</td></tr>
<tr><td><b>語意檢索</b>（嵌入向量）</td><td>能理解同義與換句話說</td><td>精確的編號、代碼有時反而找不準</td></tr>
<tr><td><b>混合檢索</b></td><td>兩者結果合併，兼顧準確與語意</td><td>系統較複雜</td></tr>
</table>
<p>進一步還可以加上<b>重新排序（Reranking）</b>：先用檢索取出 20～50 段候選，再用重排模型精選最相關的 3～5 段給生成模型。</p>
<div class="box memo"><b class="t">本章重點</b>RAG 的品質取決於「能不能找到對的段落」。下一章實際動手做一個檢索系統，並學會如何評估它。</div>` }
  ],
  keypoints: [
    '資料少就直接放進提示詞；資料量大、常更新、需附出處才用 RAG；微調不適合用來記住知識',
    'RAG 流程：載入 → 切塊 → 向量化 → 存入資料庫 → 問題向量化 → 檢索 → 組合提示詞 → 生成',
    '檢索品質決定 RAG 的品質',
    '切塊建議依文件結構，加上重疊與中繼資料（文件、章節、頁碼）',
    '嵌入向量讓意思相近的文字位置接近；以餘弦相似度比較',
    '建立索引與查詢必須使用同一個嵌入模型',
    '關鍵字檢索擅長編號與專有名詞，語意檢索擅長同義詞；混合檢索與重排可提升準確度'
  ]
},
{
  id: 'c07', subject: 2, minutes: 55,
  title: 'RAG 實作與評估',
  summary: '用 Python 從零實作切塊與 TF-IDF 檢索、組合附出處的 RAG 提示詞、串接 API 生成回答、處理找不到答案的情況，以及評估檢索命中率與回答忠實度。',
  sections: [
    { id: 'index', title: '建立索引：切塊與向量化', html: `
<p>下面用公司規章做一個完整的小型 RAG。為了能在網頁上執行，向量化改用 <b>TF-IDF</b>（關鍵字權重），流程與使用嵌入模型完全相同，只要把向量化函式換掉即可。</p>
<pre class="py">import re, math
import numpy as np

docs = {
    '員工手冊-請假': '病假三日以內免附證明，超過三日須檢附醫療證明。特休假須於三日前在系統提出申請，經直屬主管核准。婚假八日，須於結婚日前十日起三個月內請畢。',
    '員工手冊-加班': '加班須事先在系統申請並經主管核准，未經核准之加班不予計算。平日延長工時前二小時，加給三分之一以上工資。',
    '員工手冊-出差': '國內出差住宿費每日上限二千元，交通以大眾運輸為原則，搭乘計程車須於報帳時說明理由。',
    '資訊規範-帳號': '忘記系統密碼請至登入頁點選忘記密碼，以公司信箱重設。帳號密碼不得與他人共用，連續輸錯五次將鎖定三十分鐘。',
    '資訊規範-資料': '禁止將公司機密資料上傳至未經核准的雲端服務或生成式 AI 工具，可疑郵件請轉寄資安信箱。',
}

def chunk(text, size=40, overlap=10):
    return [text[i:i + size] for i in range(0, max(len(text) - overlap, 1), size - overlap)]

chunks = [(src, c) for src, text in docs.items() for c in chunk(text)]

def grams(t):                                   # 中文用「兩字一組」當作詞
    t = re.sub(r'[^\\u4e00-\\u9fffA-Za-z0-9]', '', t)
    return [t[i:i + 2] for i in range(len(t) - 1)]

vocab = sorted({g for _, c in chunks for g in grams(c)})
index = {g: i for i, g in enumerate(vocab)}
df = np.zeros(len(vocab))
for _, c in chunks:
    for g in set(grams(c)):
        df[index[g]] += 1
idf = np.log((len(chunks) + 1) / (df + 1)) + 1

def embed(text):                                # 換成嵌入模型時，只要改這個函式
    v = np.zeros(len(vocab))
    for g in grams(text):
        if g in index:
            v[index[g]] += 1
    v *= idf
    n = np.linalg.norm(v)
    return v / n if n else v

matrix = np.array([embed(c) for _, c in chunks])
print(f'{len(docs)} 份文件 → {len(chunks)} 個段落，詞彙數 {len(vocab)}')
print('第一個段落：', chunks[0])</pre>
<div class="box tip"><b class="t">在自己的電腦</b>正式系統通常用 LangChain 或 LlamaIndex 等框架處理載入與切塊，用嵌入模型 API 向量化，存進 Chroma 或 pgvector。先從零實作一次，你才知道框架背後在做什麼、出問題時從哪裡查起。</div>` },
    { id: 'search', title: '檢索與組合提示詞', html: `
<pre class="py">import re
import numpy as np

docs = {
    '員工手冊-請假': '病假三日以內免附證明，超過三日須檢附醫療證明。特休假須於三日前在系統提出申請，經直屬主管核准。',
    '員工手冊-出差': '國內出差住宿費每日上限二千元，交通以大眾運輸為原則，搭乘計程車須於報帳時說明理由。',
    '資訊規範-帳號': '忘記系統密碼請至登入頁點選忘記密碼，以公司信箱重設。連續輸錯五次將鎖定三十分鐘。',
}
chunks = [(s, t) for s, t in docs.items()]
grams = lambda t: [t[i:i + 2] for i in range(len(t) - 1)]
vocab = sorted({g for _, c in chunks for g in grams(c)})
idx = {g: i for i, g in enumerate(vocab)}
def embed(text):
    v = np.zeros(len(vocab))
    for g in grams(text):
        if g in idx:
            v[idx[g]] += 1
    n = np.linalg.norm(v)
    return v / n if n else v
matrix = np.array([embed(c) for _, c in chunks])

def search(question, k=2, threshold=0.1):
    scores = matrix @ embed(question)           # 向量已正規化，內積就是餘弦相似度
    order = np.argsort(-scores)[:k]
    return [(chunks[i][0], chunks[i][1], float(scores[i])) for i in order if scores[i] &gt;= threshold]

def build_prompt(question):
    hits = search(question)
    if not hits:
        return None
    context = '\\n'.join(f'&lt;doc source="{s}"&gt;{t}&lt;/doc&gt;' for s, t, _ in hits)
    return (f'&lt;documents&gt;\\n{context}\\n&lt;/documents&gt;\\n\\n'
            '請只根據上述文件回答問題，並在句末以［來源］標示出處。'
            '文件中沒有答案時，回答「目前的規章沒有相關說明，請洽人資或資訊部」。\\n\\n'
            f'&lt;question&gt;{question}&lt;/question&gt;')

for q in ['病假要附證明嗎', '出差可以搭計程車嗎', '年終獎金什麼時候發']:
    print('問題：', q)
    for s, t, sc in search(q):
        print(f'  {sc:.2f} [{s}] {t[:20]}…')
    p = build_prompt(q)
    print('  → 送出提示詞' if p else '  → 找不到相關段落，直接回覆無資料（不呼叫模型）')
print('\\n提示詞範例：\\n' + build_prompt('病假要附證明嗎'))</pre>
<div class="box exam"><b class="t">兩個關鍵設計</b>①設定<b>相似度門檻</b>，找不到夠相關的段落時直接回覆「沒有資料」，不讓模型自由發揮；②要求<b>標示來源</b>，使用者可以點開原文查證。</div>` },
    { id: 'generate', title: '串接 API 生成回答', html: `
<pre class="out"># rag_bot.py —— 請在自己的電腦執行
import anthropic

client = anthropic.Anthropic()

SYSTEM = ("你是公司內部的規章問答助理。只能根據使用者提供的 &lt;documents&gt; 回答，"
          "不得使用文件以外的知識。每個重點都要以［來源］標示出處。"
          "文件中沒有答案時，請明確說明並建議洽詢的單位。")

def answer(question):
    prompt = build_prompt(question)               # 上一節的函式
    if prompt is None:
        return "目前的規章沒有相關說明，請洽人資或資訊部。"
    response = client.messages.create(
        model="claude-opus-5-5",
        max_tokens=1024,
        system=SYSTEM,
        messages=[{"role": "user", "content": prompt}],
    )
    if response.stop_reason == "refusal":
        return "這個問題無法回答，請洽相關單位。"
    return "".join(b.text for b in response.content if b.type == "text")

print(answer("病假三天需要證明嗎？"))</pre>
<div class="box tip"><b class="t">讓使用者看到來源</b>介面上除了回答，最好也列出被檢索到的原文段落與文件連結。使用者能自己查證，對系統的信任度會高很多，發現錯誤也能回報。</div>` },
    { id: 'eval', title: '評估 RAG', html: `
<p>RAG 出錯時，要先分辨是<b>找錯資料</b>（檢索問題）還是<b>找對了但答錯</b>（生成問題），兩者的修正方法完全不同。</p>
<table>
<tr><th>指標</th><th>問的問題</th><th>出問題時調整</th></tr>
<tr><td><b>檢索命中率</b>（Hit Rate／Recall@k）</td><td>正確的段落有沒有出現在前 k 名？</td><td>切塊方式、嵌入模型、混合檢索、k 值</td></tr>
<tr><td><b>忠實度</b>（Faithfulness）</td><td>回答是否完全根據檢索到的內容，沒有自己編造？</td><td>提示詞、要求引用、換更強的模型</td></tr>
<tr><td><b>答案正確率</b></td><td>回答是否正確回答了問題？</td><td>兩者都要檢查</td></tr>
<tr><td><b>拒答正確率</b></td><td>資料庫沒有答案時，是否正確地說不知道？</td><td>相似度門檻、提示詞</td></tr>
</table>
<pre class="py"># 評估檢索命中率：每個測試問題標註「正確答案在哪份文件」
import numpy as np

docs = ['出差住宿費每日上限二千元，搭乘計程車須說明理由', '忘記系統密碼請至登入頁點選忘記密碼重設',
        '病假三日以內免附證明，超過三日須檢附醫療證明', '加班須事先申請並經主管核准']
tests = [('病假需要證明嗎', 2), ('出差住宿上限多少', 0), ('密碼忘記了', 1), ('加班要先申請嗎', 3),
         ('生病請假要交什麼', 2), ('坐計程車可以報帳嗎', 0)]
grams = lambda t: {t[i:i + 2] for i in range(len(t) - 1)}
def score(q, d):                                  # 以共同詞的比例當作相似度
    a, b = grams(q), grams(d)
    return len(a &amp; b) / (len(a | b) or 1)

for k in [1, 2]:
    hits, missed = 0, []
    for q, ans in tests:
        top = np.argsort([-score(q, d) for d in docs])[:k]
        if ans in top:
            hits += 1
        else:
            missed.append(q)
    print(f'Recall@{k} = {hits}/{len(tests)} = {hits / len(tests):.0%}　沒找到：{missed}')
print('「生病請假要交什麼」與各文件的分數：', [round(score('生病請假要交什麼', d), 2) for d in docs])</pre>
<div class="box memo"><b class="t">觀察</b>「生病請假要交什麼」和病假規定沒有任何共同的兩字詞，四份文件的分數全是 0，關鍵字檢索完全找不到正確答案。這就是語意檢索（嵌入模型）要解決的問題：它能理解「生病請假」和「病假」是同一件事。實務上準備 30～100 題測試問題，每次調整切塊或模型都重跑一次，比較數字。</div>` },
    { id: 'pitfalls', title: '常見問題與改善', html: `
<table>
<tr><th>症狀</th><th>可能原因</th><th>改善方式</th></tr>
<tr><td>明明有寫，卻說找不到</td><td>切塊切斷關鍵內容、用詞差異大</td><td>依結構切塊、加情境標題、改用語意或混合檢索</td></tr>
<tr><td>回答混入其他規定</td><td>檢索到太多不相關段落</td><td>降低 k 值、加重排、依部門或文件類型過濾</td></tr>
<tr><td>回答過時資訊</td><td>新舊版本文件都在資料庫中</td><td>只保留最新版，或在中繼資料記錄版本並過濾</td></tr>
<tr><td>表格、圖片內容答錯</td><td>PDF 轉文字時表格結構被打亂</td><td>用支援表格的解析工具，或把表格整理成文字描述</td></tr>
<tr><td>員工查到不該看的資料</td><td>沒有權限控管</td><td>檢索時依使用者權限過濾文件</td></tr>
</table>
<div class="box memo"><b class="t">動手做：規章問答機器人</b>挑一份你們公司或學校的公開規章（或用本章範例擴充），完成切塊、檢索、提示詞與 API 串接，並準備 20 題測試問題（含 5 題資料中沒有答案的），計算命中率與拒答正確率，寫進作品的 README。</div>` }
  ],
  keypoints: [
    '建立索引：切塊 → 向量化 → 存成矩陣或向量資料庫；換嵌入模型只要換向量化函式',
    '向量正規化後，內積就是餘弦相似度',
    '設定相似度門檻，找不到相關段落時直接回覆沒有資料',
    '提示詞用標籤包住文件並標示來源，要求只根據文件回答並註明出處',
    '分辨檢索問題（找錯資料）與生成問題（找對但答錯）',
    '評估指標：檢索命中率、忠實度、答案正確率、拒答正確率',
    '常見改善：依結構切塊、混合檢索與重排、版本與權限過濾、處理表格'
  ]
},
{
  id: 'c08', subject: 2, minutes: 50,
  title: '工具呼叫',
  summary: '工具呼叫（Tool Use）的運作方式、定義工具與 JSON Schema、撰寫工具呼叫迴圈、回傳錯誤、SDK 的 Tool Runner，以及工具設計與安全原則。',
  sections: [
    { id: 'concept', title: '讓 AI 呼叫工具', html: `
<p>模型本身只能產生文字，不能查資料庫、不能看即時庫存、不能寄信。<b>工具呼叫（Tool Use，也稱 Function Calling）</b>讓你告訴模型「有哪些工具可以用」，模型判斷需要時會提出呼叫請求，由<strong>你的程式</strong>實際執行，再把結果交回給模型。</p>
<div class="flow">
  <div><b>1. 送出問題與工具清單</b><span>「訂單 A123 到哪了？」<br>工具：查詢訂單</span></div>
  <div><b>2. 模型提出呼叫</b><span>stop_reason = tool_use<br>query_order(order_id="A123")</span></div>
  <div><b>3. 程式執行工具</b><span>查資料庫得到<br>「已出貨，明天送達」</span></div>
  <div><b>4. 回傳 tool_result</b><span>模型根據結果<br>回覆使用者</span></div>
</div>
<div class="box exam"><b class="t">重要觀念</b>模型<b>不會</b>自己執行任何程式，它只會「提出要呼叫哪個工具、帶什麼參數」。要不要執行、怎麼執行，完全由你的程式決定，這也是安全控管的關鍵位置。</div>` },
    { id: 'define', title: '定義工具', html: `
<p>每個工具需要<b>名稱</b>、<b>說明</b>與<b>參數的 JSON Schema</b>。說明寫得越清楚，模型越知道什麼時候該用、參數該怎麼填。</p>
<pre class="out">tools = [
    {
        "name": "query_order",
        "description": "依訂單編號查詢訂單狀態、出貨日期與物流單號。顧客詢問訂單進度時使用。",
        "input_schema": {
            "type": "object",
            "properties": {
                "order_id": {"type": "string", "description": "訂單編號，格式為英文字母加數字，例如 A123"}
            },
            "required": ["order_id"]
        }
    },
    {
        "name": "check_stock",
        "description": "查詢某門市某商品的即時庫存數量。",
        "input_schema": {
            "type": "object",
            "properties": {
                "store": {"type": "string", "enum": ["台北", "台中", "高雄"]},
                "product": {"type": "string", "description": "商品名稱"}
            },
            "required": ["store", "product"]
        }
    }
]</pre>
<div class="box tip"><b class="t">寫好工具說明</b>①說明工具做什麼、什麼時候用、什麼時候不要用；②參數加上格式說明與範例；③固定選項用 <code>enum</code> 限制；④在工具定義加上 <code>"strict": true</code> 可以保證模型產生的參數符合 Schema。</div>` },
    { id: 'loop', title: '工具呼叫迴圈', html: `
<p>模型可能需要連續呼叫多個工具（先查訂單、再查庫存），所以程式要寫成<b>迴圈</b>：只要 stop_reason 是 tool_use，就執行工具並把結果送回，直到模型給出最終回答。</p>
<pre class="out"># order_agent.py —— 請在自己的電腦執行
import json, anthropic

client = anthropic.Anthropic()

def run_tool(name, args):
    if name == "query_order":
        return json.dumps(ORDERS.get(args["order_id"], {"error": "查無此訂單"}), ensure_ascii=False)
    if name == "check_stock":
        return str(STOCK.get((args["store"], args["product"]), 0))
    return "未知的工具"

messages = [{"role": "user", "content": "我的訂單 A123 到哪了？如果還沒寄，台中店有現貨嗎？"}]
for _ in range(10):                                  # 設定上限，避免無限迴圈
    response = client.messages.create(
        model="claude-opus-5-5", max_tokens=2048,
        system="你是線上商店客服，查詢資料後用繁體中文簡短回答。",
        tools=tools, messages=messages,
    )
    if response.stop_reason != "tool_use":
        break
    messages.append({"role": "assistant", "content": response.content})   # 保留完整回應
    results = []
    for block in response.content:
        if block.type == "tool_use":
            results.append({
                "type": "tool_result",
                "tool_use_id": block.id,                # 必須對應 tool_use 的 id
                "content": run_tool(block.name, block.input),
            })
    messages.append({"role": "user", "content": results})               # 所有結果放在同一則訊息

print("".join(b.text for b in response.content if b.type == "text"))</pre>
<p>迴圈的資料流動可以在網頁上用模擬的模型觀察：</p>
<pre class="py">import json

ORDERS = {'A123': {'狀態': '備貨中', '預計出貨': '10/28'}}
STOCK = {('台中', '藍牙耳機'): 3}

def run_tool(name, args):
    if name == 'query_order':
        return json.dumps(ORDERS.get(args['order_id'], {'error': '查無此訂單'}), ensure_ascii=False)
    if name == 'check_stock':
        return str(STOCK.get((args['store'], args['product']), 0))

# 模擬模型的三次回應：先查訂單 → 再查庫存 → 最後回答
fake_responses = [
    {'stop_reason': 'tool_use', 'calls': [('t1', 'query_order', {'order_id': 'A123'})]},
    {'stop_reason': 'tool_use', 'calls': [('t2', 'check_stock', {'store': '台中', 'product': '藍牙耳機'})]},
    {'stop_reason': 'end_turn', 'text': '您的訂單 A123 目前備貨中，預計 10/28 出貨。台中店另有 3 件現貨，可以改到門市取貨。'},
]
messages = [{'role': 'user', 'content': '我的訂單 A123 到哪了？台中店有現貨嗎？'}]
for step, resp in enumerate(fake_responses, start=1):
    if resp['stop_reason'] != 'tool_use':
        print(f'第 {step} 輪：模型回答 → {resp["text"]}')
        break
    results = []
    for tid, name, args in resp['calls']:
        out = run_tool(name, args)
        print(f'第 {step} 輪：模型要求 {name}({args}) → 程式執行結果 {out}')
        results.append({'type': 'tool_result', 'tool_use_id': tid, 'content': out})
    messages.append({'role': 'assistant', 'content': resp['calls']})
    messages.append({'role': 'user', 'content': results})
print('對話紀錄共', len(messages), '則訊息')</pre>` },
    { id: 'errors', title: '錯誤處理與 Tool Runner', html: `
<p>工具執行失敗時（查無資料、外部服務當機），<b>不要讓程式直接中斷</b>，而是把錯誤訊息當作結果回傳，並標記 <code>is_error</code>，模型通常會換個方式處理或向使用者說明：</p>
<pre class="out">results.append({
    "type": "tool_result",
    "tool_use_id": block.id,
    "content": "查無訂單 A999，請確認編號是否正確",
    "is_error": True,
})</pre>
<p>Anthropic Python SDK 也提供 <b>Tool Runner</b>（目前為 Beta 功能），用裝飾器把一般函式變成工具，迴圈由 SDK 自動處理：</p>
<pre class="out">import anthropic
from anthropic import beta_tool

client = anthropic.Anthropic()

@beta_tool
def query_order(order_id: str) -&gt; str:
    """依訂單編號查詢訂單狀態與出貨日期。

    Args:
        order_id: 訂單編號，例如 A123。
    """
    return '{"狀態": "備貨中", "預計出貨": "10/28"}'

runner = client.beta.messages.tool_runner(
    model="claude-opus-5-5",
    max_tokens=2048,
    tools=[query_order],
    messages=[{"role": "user", "content": "訂單 A123 什麼時候出貨？"}],
)
for message in runner:          # 每一輪的回應；沒有工具要呼叫時自動結束
    for block in message.content:
        if block.type == "text":
            print(block.text)</pre>` },
    { id: 'safety', title: '工具設計與安全', html: `
<table>
<tr><th>原則</th><th>做法</th></tr>
<tr><td><b>最小權限</b></td><td>只提供完成任務所需的工具；查詢工具只能讀，不能改</td></tr>
<tr><td><b>伺服器端驗證</b></td><td>工具函式自己檢查參數與權限，例如顧客只能查自己的訂單，不能只靠模型判斷</td></tr>
<tr><td><b>危險動作人工確認</b></td><td>退款、刪除、寄信給客戶等動作，先回傳「待確認」由人核准</td></tr>
<tr><td><b>限制次數與範圍</b></td><td>迴圈設上限；單次查詢筆數設上限</td></tr>
<tr><td><b>記錄日誌</b></td><td>記錄每次工具呼叫的參數與結果，方便稽核與除錯</td></tr>
<tr><td><b>工具數量適中</b></td><td>工具太多、功能重疊會讓模型選錯；名稱與說明要清楚區分</td></tr>
</table>
<div class="box warn"><b class="t">工具結果也可能有提示注入</b>工具回傳的網頁內容、Email、文件，可能藏有惡意指示。模型讀到「請把資料寄給某某」時，你的程式必須有權限控管與人工確認，才不會真的照做。</div>
<div class="box memo"><b class="t">動手做</b>為你的工作設計 2～3 個工具（例如查詢庫存、查詢假勤、建立待辦事項），寫出名稱、說明與參數 Schema，並標出哪些需要人工確認。</div>` }
  ],
  keypoints: [
    '工具呼叫：模型提出要呼叫的工具與參數，由你的程式實際執行並回傳結果',
    '工具定義包含 name、description 與 input_schema；說明越清楚模型越會用',
    'stop_reason 為 tool_use 時執行工具，以 tool_result 回傳，tool_use_id 要對應',
    '同一輪的所有工具結果放在同一則 user 訊息；迴圈要設上限',
    '工具失敗時回傳錯誤訊息並標記 is_error，不要讓程式中斷',
    'Tool Runner 用 @beta_tool 裝飾函式，SDK 自動處理迴圈',
    '最小權限、伺服器端驗證、危險動作人工確認、記錄日誌'
  ]
},
{
  id: 'c09', subject: 2, minutes: 50,
  title: 'AI 代理流程',
  summary: '工作流程與代理的差別、五種常見設計模式、代理的運作迴圈與防護、MCP 協定、用 n8n 等無程式碼平台建立代理流程，以及何時不該使用代理。',
  sections: [
    { id: 'workflow', title: '工作流程與代理', html: `
<table>
<tr><th>比較</th><th>工作流程 Workflow</th><th>代理 Agent</th></tr>
<tr><td>步驟由誰決定</td><td><b>程式事先寫好</b>固定步驟</td><td><b>模型自己判斷</b>下一步要做什麼、用哪個工具</td></tr>
<tr><td>可預測性</td><td>高，容易測試與除錯</td><td>較低，每次路徑可能不同</td></tr>
<tr><td>成本與延遲</td><td>低、可控制</td><td>較高，可能多輪呼叫</td></tr>
<tr><td>適合</td><td>步驟明確的任務：分類 → 摘要 → 寄出</td><td>開放式、步驟無法事先決定的任務：研究、除錯、複雜客服</td></tr>
</table>
<div class="box exam"><b class="t">先從最簡單的開始</b>能用一次 API 呼叫解決的，就不要做工作流程；能用工作流程解決的，就不要做代理。代理很強大，但成本、延遲與出錯的風險都比較高。</div>` },
    { id: 'patterns', title: '五種常見設計模式', html: `
<table>
<tr><th>模式</th><th>做法</th><th>例子</th></tr>
<tr><td><b>提示鏈</b> Prompt Chaining</td><td>固定的多個步驟依序執行，前一步的輸出給下一步</td><td>寫大綱 → 檢查大綱 → 依大綱寫全文</td></tr>
<tr><td><b>路由</b> Routing</td><td>先分類，再交給對應的專門流程或模型</td><td>客服訊息分成退貨、技術問題、一般詢問，各自處理；簡單問題用輕量模型</td></tr>
<tr><td><b>平行化</b> Parallelization</td><td>同時處理多個獨立子任務再彙整，或多次投票</td><td>同時檢查合約的法律、財務、資安風險</td></tr>
<tr><td><b>協調者－工作者</b> Orchestrator-Workers</td><td>主模型拆解任務並分派，工作者完成後再整合</td><td>研究報告：主模型規劃題目，分派多個子任務搜尋資料</td></tr>
<tr><td><b>評估者－優化者</b> Evaluator-Optimizer</td><td>一個產生、一個依標準評分並給意見，反覆改進</td><td>翻譯或文案：產生 → 評審 → 修改，直到達標</td></tr>
</table>
<pre class="py"># 路由模式示範：先分類，再交給不同的處理流程
def classify(msg):                      # 實務上用輕量模型分類
    if any(k in msg for k in ['退貨', '退款', '換貨']):
        return 'refund'
    if any(k in msg for k in ['壞了', '無法開機', '錯誤', '連不上']):
        return 'tech'
    return 'general'

handlers = {
    'refund': lambda m: '［退貨流程］查詢訂單 → 確認退貨條件 → 建立退貨單（需人工核准）',
    'tech': lambda m: '［技術支援］檢索產品手冊 RAG → 提供排除步驟 → 無法解決則轉真人',
    'general': lambda m: '［一般詢問］用輕量模型直接回答常見問題',
}
for msg in ['我想退貨', '耳機連不上藍牙', '你們營業到幾點？']:
    route = classify(msg)
    print(f'{msg:　&lt;10} → {route:&lt;8} {handlers[route](msg)}')</pre>` },
    { id: 'agent', title: '代理的運作與防護', html: `
<p>代理的核心就是上一章的工具呼叫迴圈：<b>觀察 → 思考 → 行動（呼叫工具）→ 觀察結果</b>，重複到任務完成。差別在於代理通常擁有更多工具、執行更多輪，也更需要防護。</p>
<table>
<tr><th>防護</th><th>做法</th></tr>
<tr><td>清楚的任務與完成條件</td><td>告訴代理目標是什麼、做到什麼程度算完成、遇到什麼情況要停下來問人</td></tr>
<tr><td>最小權限</td><td>只給必要的工具；能唯讀就不要給寫入</td></tr>
<tr><td>人工核准節點</td><td>付款、寄信、刪除、對外發布前暫停，等人確認</td></tr>
<tr><td>步數與費用上限</td><td>限制最多執行幾輪、最多花多少 token</td></tr>
<tr><td>沙盒環境</td><td>會執行程式或操作檔案的代理，放在隔離環境中</td></tr>
<tr><td>完整紀錄</td><td>記錄每一步的思考、工具呼叫與結果，出錯時才查得到原因</td></tr>
</table>
<div class="box warn"><b class="t">錯誤會累積</b>代理每一步都可能出一點錯，步驟越多，最後出錯的機率越高。所以代理適合「錯誤能被發現並修正」的任務，例如寫程式時可以跑測試驗證；不適合一出錯就無法挽回的任務。</div>` },
    { id: 'mcp', title: 'MCP：連接工具的標準', html: `
<p><b>MCP（Model Context Protocol，模型上下文協定）</b>是 Anthropic 提出的開放標準，讓 AI 應用用統一的方式連接外部工具與資料來源，就像 USB 讓各種裝置都能接上電腦。</p>
<ul>
  <li><b>MCP 伺服器</b>：把某個服務包裝成工具，例如 Google Drive、Slack、資料庫、GitHub。</li>
  <li><b>MCP 用戶端</b>：Claude Desktop、Claude Code、各種 AI 應用，可以連接多個 MCP 伺服器。</li>
  <li>好處：同一個工具只要寫一次，就能給不同的 AI 應用使用；社群已有大量現成的 MCP 伺服器。</li>
</ul>
<div class="box warn"><b class="t">安裝第三方 MCP 伺服器要謹慎</b>MCP 伺服器能存取你授權的資料並執行動作，只安裝可信任來源的伺服器，並檢查它要求的權限。</div>` },
    { id: 'nocode', title: '無程式碼平台與何時不用代理', html: `
<p>不寫程式也能建立代理流程。<b>n8n</b>、<b>Make</b>、<b>Zapier</b> 等平台用拖拉節點的方式串接服務，多數都有 AI 代理節點，可以設定模型、系統提示詞與可用工具。</p>
<div class="flow">
  <div><b>觸發</b><span>收到客服信件</span></div>
  <div><b>AI 分類</b><span>路由到退貨／技術／一般</span></div>
  <div><b>AI 代理</b><span>查訂單、查知識庫</span></div>
  <div><b>人工核准</b><span>主管在 Slack 按確認</span></div>
  <div><b>寄出回覆</b><span>並寫入試算表紀錄</span></div>
</div>
<table>
<tr><th>適合用代理</th><th>不適合用代理</th></tr>
<tr><td>步驟無法事先決定、需要依中間結果調整</td><td>步驟固定，用工作流程就能完成</td></tr>
<tr><td>結果可以驗證（測試、比對、人工檢查）</td><td>結果難以驗證，出錯不易發現</td></tr>
<tr><td>出錯可以修正或回復</td><td>出錯代價高且無法挽回</td></tr>
<tr><td>價值高到值得多花成本與時間</td><td>大量、低價值、需要即時回應</td></tr>
</table>
<div class="box memo"><b class="t">動手做</b>把你工作上的一個流程畫成流程圖，標出哪些步驟是固定的（用程式或工作流程）、哪些需要判斷（交給 AI）、哪些需要人工核准，再決定用哪種設計模式。</div>
<div class="box tip"><b class="t">跨課程連結</b>本站的「AI 投資助理」課程有完整的 n8n 實作；iPAS AI 應用規劃師初級第 7～9 章介紹 No Code 工具與 AI 導入規劃，可以互相對照。</div>` }
  ],
  keypoints: [
    '工作流程由程式決定步驟，代理由模型自己決定；能用簡單方法就不用代理',
    '五種模式：提示鏈、路由、平行化、協調者－工作者、評估者－優化者',
    '代理迴圈：觀察 → 思考 → 呼叫工具 → 觀察結果，重複直到完成',
    '防護：完成條件、最小權限、人工核准、步數與費用上限、沙盒、完整紀錄',
    '代理的錯誤會累積，適合結果可驗證、出錯可修正的任務',
    'MCP 是連接 AI 應用與外部工具的開放標準，第三方伺服器要謹慎安裝',
    'n8n、Make、Zapier 可以不寫程式建立 AI 代理流程'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '上線、評估與治理',
  summary: 'AI 應用上線前的評估方法、監控與使用者回饋、成本最佳化、資安風險（提示注入、資料外洩、過度授權）、個資與法規、人機協作設計，以及作品集。',
  sections: [
    { id: 'eval', title: '上線前的評估', html: `
<p>傳統程式輸入相同、輸出就相同；AI 應用的輸出會變動，所以要靠<b>評估（Evals）</b>確認品質。</p>
<table>
<tr><th>評估方式</th><th>適合</th><th>優缺點</th></tr>
<tr><td><b>程式比對</b></td><td>分類、擷取等有標準答案的任務</td><td>快速、便宜、客觀</td></tr>
<tr><td><b>評審模型</b> LLM-as-a-judge</td><td>摘要、回覆品質等開放式任務</td><td>可大量執行，評分標準要寫清楚，並定期和人工評分比對</td></tr>
<tr><td><b>人工評估</b></td><td>高風險、品質要求高的任務</td><td>最準確，但慢且貴</td></tr>
</table>
<pre class="py"># 評審模型的評分表設計（以模擬分數示範彙整方式）
rubric = {
    '正確性': '回答內容與參考資料一致，沒有錯誤資訊',
    '完整性': '回答了問題的所有部分',
    '來源標示': '重點都附上正確的出處',
    '語氣': '親切、簡潔、使用繁體中文',
}
# 假設評審模型對 5 個測試問題的評分（1～5 分）
scores = {
    '正確性':   [5, 5, 4, 5, 2],
    '完整性':   [4, 5, 4, 3, 4],
    '來源標示': [5, 5, 5, 4, 1],
    '語氣':     [5, 4, 5, 5, 5],
}
for k, v in scores.items():
    low = [i + 1 for i, s in enumerate(v) if s &lt;= 2]
    print(f'{k}（{rubric[k]}）平均 {sum(v) / len(v):.1f}' + (f'　需檢查第 {low} 題' if low else ''))</pre>
<div class="box tip"><b class="t">每次修改都重跑評估</b>換模型、改提示詞、調整 RAG 切塊，都可能讓某些題目變好、另一些變差。有測試集才能用數字判斷要不要上線。</div>` },
    { id: 'monitor', title: '監控與持續改善', html: `
<ul>
  <li><b>記錄</b>：每次請求的輸入、輸出、使用的模型、token 數、延遲、工具呼叫（注意個資保護與保存期限）。</li>
  <li><b>使用者回饋</b>：在介面放「有幫助／沒幫助」按鈕，負評的對話加入測試集。</li>
  <li><b>指標儀表板</b>：每日請求量、費用、平均延遲、錯誤率、拒答率、負評率。</li>
  <li><b>告警</b>：費用暴增、錯誤率上升時通知負責人。</li>
  <li><b>定期抽查</b>：每週人工檢查一定數量的對話，及早發現新問題。</li>
</ul>
<h3>成本最佳化</h3>
<table>
<tr><th>方法</th><th>效果</th></tr>
<tr><td>依任務選模型（路由）</td><td>簡單任務用輕量模型，複雜任務才用旗艦</td></tr>
<tr><td>提示快取</td><td>重複的長系統提示詞與文件大幅降價</td></tr>
<tr><td>批次處理</td><td>非即時工作費用約一半</td></tr>
<tr><td>精簡輸入與輸出</td><td>RAG 只取必要段落、限制回答長度</td></tr>
<tr><td>快取常見問題的回答</td><td>完全相同的問題直接回傳上次的答案</td></tr>
</table>` },
    { id: 'security', title: '資安風險', html: `
<table>
<tr><th>風險</th><th>情境</th><th>防護</th></tr>
<tr><td><b>提示注入</b></td><td>文件、網頁、Email 中藏有惡意指示</td><td>區分指示與資料、最小權限、人工核准</td></tr>
<tr><td><b>敏感資料外洩</b></td><td>RAG 檢索到使用者無權查看的文件；回答中帶出個資</td><td>檢索前依權限過濾、輸出檢查遮蔽個資</td></tr>
<tr><td><b>過度授權</b></td><td>代理擁有刪除、付款等不必要的權限</td><td>只給必要工具、危險動作需人工確認</td></tr>
<tr><td><b>系統提示詞外洩</b></td><td>使用者誘導 AI 說出內部規則</td><td>系統提示詞不放密碼、金鑰等機密</td></tr>
<tr><td><b>不安全的輸出處理</b></td><td>直接執行 AI 產生的程式或 SQL；把回答當 HTML 顯示</td><td>在沙盒執行、使用參數化查詢、輸出前跳脫</td></tr>
<tr><td><b>員工使用未核准的 AI 工具</b></td><td>把客戶資料貼到個人帳號的 AI 服務</td><td>制定 AI 使用政策、提供企業版工具</td></tr>
</table>
<div class="box tip"><b class="t">延伸閱讀</b>OWASP 發布的「Top 10 for LLM Applications」整理了 LLM 應用最常見的資安風險，是設計與檢查 AI 系統的好參考；本站的資安課程也有相關的存取控制與資料保護觀念。</div>` },
    { id: 'governance', title: '個資、法規與人機協作', html: `
<ul>
  <li><b>個資法</b>：蒐集、處理、利用個人資料要有合法依據並告知當事人；送到雲端 AI 前確認服務的資料保存與訓練使用政策，必要時去識別化。</li>
  <li><b>著作權</b>：AI 產生的內容與訓練資料可能涉及著作權，對外發布的內容要經過人工審查。</li>
  <li><b>透明</b>：讓使用者知道正在和 AI 互動，並提供轉接真人的管道。</li>
  <li><b>可歸責</b>：AI 是輔助工具，重要決定的責任在人。高風險領域（醫療、金融、人事、法律）的建議必須由專業人員審核。</li>
  <li><b>法規與指引</b>：各國對 AI 的規範持續更新，國內外 AI 治理法規與指引的重點，可參考本站 iPAS AI 應用規劃師初級第 2 章。</li>
</ul>
<h3>人機協作設計</h3>
<div class="flow">
  <div><b>AI 草擬</b><span>產生回覆或分析</span></div>
  <div><b>信心分流</b><span>高信心自動送出<br>低信心交給人</span></div>
  <div><b>人工審核</b><span>修改或核准</span></div>
  <div><b>回饋學習</b><span>修改內容加入測試集</span></div>
</div>` },
    { id: 'portfolio', title: '作品集與下一步', html: `
<table>
<tr><th>作品</th><th>展現的能力</th></tr>
<tr><td>部門提示詞範本庫（含測試結果）</td><td>提示工程、評估方法</td></tr>
<tr><td>文件資料擷取工具</td><td>結構化輸出、資料驗證、批次處理</td></tr>
<tr><td>規章問答 RAG 機器人</td><td>切塊、檢索、引用來源、命中率評估</td></tr>
<tr><td>客服代理（查訂單、查庫存、轉人工）</td><td>工具呼叫、代理防護、人工核准</td></tr>
<tr><td>n8n AI 自動化流程</td><td>無程式碼整合、流程設計</td></tr>
</table>
<div class="box exam"><b class="t">面試時怎麼說</b>不只說「我做了一個 RAG」，而是說清楚：解決什麼問題、資料量多大、怎麼切塊與檢索、命中率從多少提升到多少、怎麼處理找不到答案與權限問題、每月費用多少。有數字、有取捨，最能展現實力。</div>
<div class="box tip"><b class="t">延伸學習</b>想取得證照可以考 iPAS AI 應用規劃師（初級、中級）；想把應用部署到雲端，可以接著學本站的 AWS 與 Git、Docker 與 DevOps 課程。</div>` }
  ],
  keypoints: [
    '評估方式：程式比對、評審模型、人工評估；每次修改都要重跑測試集',
    '監控請求量、費用、延遲、錯誤率與負評率，負評對話加入測試集',
    '成本最佳化：模型路由、提示快取、批次處理、精簡輸入輸出、快取常見問答',
    '資安風險：提示注入、敏感資料外洩、過度授權、提示詞外洩、不安全的輸出處理',
    '參考 OWASP Top 10 for LLM Applications 檢查 AI 系統',
    '遵守個資法與著作權，讓使用者知道在和 AI 互動，重要決定由人負責',
    '人機協作：AI 草擬 → 信心分流 → 人工審核 → 回饋學習'
  ]
}
);
