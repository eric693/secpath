/* AI 代理與 MCP 開發 代理篇：工具使用、代理迴圈、設計模式與記憶
   <pre class="py"> 為可在網頁上執行的 Python（使用模擬模型，不需 API 金鑰）；<pre class="out"> 為需要在自己電腦上執行的程式碼或指令
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 40,
  title: '什麼是 AI 代理',
  summary: '從單次呼叫、工作流程到代理的光譜、代理的定義與運作方式、什麼任務適合用代理、代理的成本與風險，以及本課程的開發工具地圖。',
  sections: [
    { id: 'spectrum', title: '從單次呼叫到代理', html: `
<table>
<tr><th>層級</th><th>誰決定下一步</th><th>例子</th></tr>
<tr><td><b>單次呼叫</b></td><td>只有一步</td><td>把客訴分類成「物流／產品／客服」、摘要一份文件</td></tr>
<tr><td><b>工作流程（Workflow）</b></td><td>你的程式碼：步驟事先寫死</td><td>先翻譯 → 再檢查用語 → 再排版；依分類結果送到不同的處理函式</td></tr>
<tr><td><b>代理（Agent）</b></td><td>模型自己：依每一步的結果決定接下來要做什麼、用哪個工具、何時結束</td><td>「找出這個 bug 並修好」：要讀哪些檔案、跑哪些測試，事先無法知道</td></tr>
</table>
<p><b>代理</b>就是：給模型一個目標和一組工具，讓它<b>在迴圈中</b>自己規劃步驟、使用工具、觀察結果、調整做法，直到完成任務。Claude Code 就是一個代理。</p>
<pre class="out">目標：「整理本月退貨原因，寫一份報告寄給主管」

代理的過程（每一步都由模型決定）：
  1. 呼叫 query_db 查詢本月退貨資料        → 得到 142 筆
  2. 發現原因欄位是自由文字 → 自己歸類成 5 類
  3. 呼叫 query_db 查詢上個月資料比較      → 「尺寸不合」增加 40%
  4. 呼叫 get_product 查詢最常退貨的商品    → 發現某款鞋的尺寸表有誤
  5. 撰寫報告，呼叫 send_email 寄出        → 完成，結束迴圈</pre>` },
    { id: 'when', title: '什麼時候該用代理', html: `
<p>代理很強大，但也比較慢、比較貴、比較難預測。Anthropic 的建議是<b>從最簡單的方式開始</b>，真的需要時才升級。用代理之前，確認四件事：</p>
<table>
<tr><th>條件</th><th>要問的問題</th></tr>
<tr><td>複雜度</td><td>任務是不是多步驟、而且步驟無法事先寫死？</td></tr>
<tr><td>價值</td><td>結果的價值值得較高的成本與等待時間嗎？</td></tr>
<tr><td>可行性</td><td>模型在這類任務上的表現夠好嗎？（先做小規模測試）</td></tr>
<tr><td>錯誤成本</td><td>出錯時能不能被發現並復原？（有測試、有人審核、可以回復）</td></tr>
</table>
<div class="box exam"><b class="t">常見的過度設計</b>「把 PDF 的發票號碼抓出來」用單次呼叫加上結構化輸出就好；「每天把新聞翻譯成中文再發到 Slack」是固定的工作流程。真正需要代理的是像「調查客戶回報的問題並修正程式」這種開放式任務。</div>` },
    { id: 'parts', title: '代理的組成', html: `
<table>
<tr><th>組成</th><th>說明</th><th>本課程章節</th></tr>
<tr><td>模型</td><td>負責推理與決定下一步，例如 Claude Opus 5.5</td><td>—</td></tr>
<tr><td>工具（Tools）</td><td>讓模型能採取行動或取得資訊：查詢資料庫、讀寫檔案、呼叫 API</td><td>第 2 章</td></tr>
<tr><td>代理迴圈（Agent Loop）</td><td>呼叫模型 → 執行工具 → 回傳結果 → 再呼叫模型，直到完成</td><td>第 3 章</td></tr>
<tr><td>Context 與記憶</td><td>模型每一步能看到的資訊，以及跨對話保留的知識</td><td>第 5 章</td></tr>
<tr><td>指示與防護</td><td>系統提示詞、權限、回合上限、需要人確認的動作</td><td>第 11 章</td></tr>
</table>` },
    { id: 'map', title: '開發工具地圖', html: `
<table>
<tr><th>做法</th><th>你要寫的</th><th>適合</th></tr>
<tr><td>Claude API + 自己寫迴圈</td><td>工具函式與整個迴圈</td><td>想完全掌握流程</td></tr>
<tr><td>Claude API + Tool Runner</td><td>只要寫工具函式，SDK 處理迴圈</td><td>大部分自訂工具的代理</td></tr>
<tr><td>Claude Agent SDK</td><td>提示詞與設定；內建讀寫檔案、執行指令等工具</td><td>需要操作檔案與程式碼的代理（等同把 Claude Code 當函式庫）</td></tr>
<tr><td>Managed Agents</td><td>代理設定；Anthropic 代為執行迴圈並提供沙箱</td><td>不想自己架設執行環境、需要長時間或排程執行</td></tr>
<tr><td><b>MCP 伺服器</b></td><td>把你的系統包裝成標準化的工具</td><td>讓 Claude Code、Claude Desktop 等任何支援 MCP 的應用都能使用</td></tr>
</table>
<p>本課程可在網頁上執行的範例使用「模擬模型」（依規則回應的 Python 函式），不需要 API 金鑰，用來看清楚代理每一步的資料長什麼樣子；呼叫真正 API 的程式碼請在自己電腦上執行。</p>` }
  ],
  keypoints: [
    '單次呼叫 → 工作流程（程式碼決定步驟）→ 代理（模型自己決定步驟與何時結束）。',
    '代理 = 模型 + 工具 + 代理迴圈：規劃、使用工具、觀察結果、調整，直到完成目標。',
    '從最簡單的方式開始：複雜度、價值、可行性、錯誤成本都符合時才用代理。',
    '固定步驟的任務用工作流程；步驟無法事先寫死的開放式任務才需要代理。',
    '代理的組成：模型、工具、代理迴圈、context 與記憶、指示與防護。',
    '開發方式：自己寫迴圈、Tool Runner、Claude Agent SDK、Managed Agents；MCP 讓工具標準化。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 50,
  title: '工具使用',
  summary: '工具使用的運作原理、工具定義的三個欄位、寫出好的工具名稱與說明、參數格式設計與 strict 模式、用 Claude API 定義工具，以及設計工具時的常見錯誤。',
  sections: [
    { id: 'how', title: '工具使用怎麼運作', html: `
<p>模型本身不會執行任何程式。<b>工具使用（Tool Use）</b>的流程是：</p>
<ol>
<li>你在請求中提供工具清單：名稱、說明、參數格式。</li>
<li>模型判斷需要某個工具時，回應中會出現 <code>tool_use</code> 區塊（工具名稱與參數），<code>stop_reason</code> 為 <code>tool_use</code>。</li>
<li><b>你的程式</b>執行對應的函式，把結果放在 <code>tool_result</code> 區塊送回。</li>
<li>模型讀到結果後，繼續回答或再呼叫其他工具。</li>
</ol>
<pre class="out"># 模型的回應（簡化）
{
  "stop_reason": "tool_use",
  "content": [
    {"type": "text", "text": "我來查詢這筆訂單。"},
    {"type": "tool_use", "id": "toolu_01A", "name": "get_order", "input": {"order_id": "A1001"}}
  ]
}

# 你送回的下一則訊息（role 為 user）
{"role": "user", "content": [
  {"type": "tool_result", "tool_use_id": "toolu_01A", "content": "已出貨，預計 11/2 送達"}
]}</pre>` },
    { id: 'define', title: '定義工具', html: `
<p>每個工具有三個欄位：<code>name</code>、<code>description</code>、<code>input_schema</code>（JSON Schema 格式的參數定義）：</p>
<pre class="out">import anthropic

client = anthropic.Anthropic()          # 從環境變數 ANTHROPIC_API_KEY 讀取金鑰

tools = [{
    "name": "get_order",
    "description": "查詢訂單的出貨狀態與預計送達日。使用者詢問「我的訂單到哪了」「什麼時候到」時使用。",
    "input_schema": {
        "type": "object",
        "properties": {
            "order_id": {"type": "string", "description": "訂單編號，格式如 A1001"}
        },
        "required": ["order_id"],
    },
}]

response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    tools=tools,
    messages=[{"role": "user", "content": "我的訂單 A1001 什麼時候會到？"}],
)
print(response.stop_reason)             # tool_use
for block in response.content:
    if block.type == "tool_use":
        print(block.name, block.input)  # get_order {'order_id': 'A1001'}</pre>
<p>手寫 JSON Schema 很容易出錯。下面的程式示範如何從 Python 函式的型別註記自動產生工具定義（SDK 的 <code>@beta_tool</code> 與 MCP 的 <code>@mcp.tool()</code> 都是用類似的方式）：</p>
<pre class="py">import inspect, json

TYPES = {str: 'string', int: 'integer', float: 'number', bool: 'boolean'}

def to_tool(fn):
    sig = inspect.signature(fn)
    props, required = {}, []
    for name, p in sig.parameters.items():
        props[name] = {'type': TYPES[p.annotation]}
        if p.default is inspect.Parameter.empty:
            required.append(name)
        else:
            props[name]['default'] = p.default
    return {'name': fn.__name__,
            'description': inspect.getdoc(fn),
            'input_schema': {'type': 'object', 'properties': props, 'required': required}}

def search_products(keyword: str, max_price: int = 1000, in_stock: bool = True) -&gt; list:
    """依關鍵字搜尋商品，可限制最高價格與是否有庫存。使用者想找商品或比價時使用。"""

print(json.dumps(to_tool(search_products), ensure_ascii=False, indent=2))</pre>
<p>互動練習中的「工具定義產生器」可以填寫欄位，同時產生 Claude API、MCP 與 Python 三種格式。</p>` },
    { id: 'design', title: '設計好的工具', html: `
<p>工具的名稱與說明就是給模型看的提示詞，寫得好不好直接影響代理的表現：</p>
<table>
<tr><th>原則</th><th>不好</th><th>好</th></tr>
<tr><td>名稱清楚、有命名空間</td><td><code>search</code></td><td><code>crm_search_customers</code></td></tr>
<tr><td>說明寫「做什麼」與「何時使用」</td><td>「查詢資料」</td><td>「依姓名或電話查詢客戶，回傳客戶編號與等級。處理客戶問題前先用它確認身分。」</td></tr>
<tr><td>參數要有描述與格式</td><td><code>date: string</code></td><td><code>date</code>：「查詢日期，格式 YYYY-MM-DD」</td></tr>
<tr><td>用 enum 限制選項</td><td><code>status: string</code></td><td><code>status</code>：enum ["pending", "shipped", "returned"]</td></tr>
<tr><td>回傳有意義、精簡的結果</td><td>回傳整個資料庫列的 50 個欄位</td><td>只回傳任務需要的欄位，並用人看得懂的格式</td></tr>
<tr><td>工具數量適中、功能不重疊</td><td>get_user、fetch_user、load_user 三個很像的工具</td><td>合併成一個，用參數區分</td></tr>
</table>
<p>在工具定義加上 <code>"strict": true</code>，可以保證模型產生的參數一定符合 schema（schema 需設定 <code>additionalProperties: false</code> 並列出 <code>required</code>）。</p>
<div class="box tip"><b class="t">讓工具的錯誤訊息也有幫助</b>參數錯誤時，與其只回傳「錯誤」，不如回傳「找不到訂單 A10O1，訂單編號格式為 A 加 4 位數字」，模型就能自己修正後再試一次。</div>` }
  ],
  keypoints: [
    '模型不會執行程式：它回傳 tool_use（工具名稱與參數），由你的程式執行並以 tool_result 送回。',
    '工具定義有 name、description、input_schema（JSON Schema）三個欄位。',
    '工具的名稱與說明就是提示詞：寫清楚做什麼、何時使用，參數要有描述與格式。',
    '用 enum 限制選項；strict: true 保證參數符合 schema。',
    '回傳精簡、有意義的結果；工具數量適中、功能不要重疊。',
    '錯誤訊息要具體，讓模型知道怎麼修正後重試。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 55,
  title: '代理迴圈',
  summary: '代理迴圈的完整流程、用模擬模型實作代理迴圈、處理多個平行工具呼叫、工具錯誤的回報、回合上限與停止條件、Claude API 的手寫迴圈與 Tool Runner。',
  sections: [
    { id: 'loop', title: '代理迴圈', html: `
<pre class="out">messages = [使用者的請求]
重複：
    回應 = 呼叫模型(messages, tools)
    把回應加入 messages
    如果 stop_reason 不是 tool_use：結束（回答完成）
    執行回應中所有的 tool_use，把結果一起放進一則 user 訊息加入 messages</pre>
<p>下面用一個依規則回應的「模擬模型」實作完整的代理迴圈，可以清楚看到 messages 怎麼一步步增加：</p>
<pre class="py">import json

ORDERS = {'A1001': {'status': '已出貨', 'eta': '11/02'}, 'A1002': {'status': '備貨中', 'eta': '11/05'}}

def get_order(order_id):
    o = ORDERS.get(order_id)
    return json.dumps(o, ensure_ascii=False) if o else f'找不到訂單 {order_id}'

TOOLS = {'get_order': get_order}

def fake_model(messages):
    """模擬模型：第一次要求查詢兩筆訂單，拿到結果後回答。"""
    last = messages[-1]
    if last['role'] == 'user' and isinstance(last['content'], str):
        return {'stop_reason': 'tool_use', 'content': [
            {'type': 'text', 'text': '我來查詢這兩筆訂單。'},
            {'type': 'tool_use', 'id': 'toolu_1', 'name': 'get_order', 'input': {'order_id': 'A1001'}},
            {'type': 'tool_use', 'id': 'toolu_2', 'name': 'get_order', 'input': {'order_id': 'A1002'}}]}
    results = {r['tool_use_id']: json.loads(r['content']) for r in last['content']}
    text = '；'.join(f"{oid} {r['status']}，預計 {r['eta']} 送達" for oid, r in zip(['A1001', 'A1002'], results.values()))
    return {'stop_reason': 'end_turn', 'content': [{'type': 'text', 'text': text}]}

messages = [{'role': 'user', 'content': '我的訂單 A1001 和 A1002 到哪了？'}]
for turn in range(1, 6):                                  # 回合上限，避免無限迴圈
    resp = fake_model(messages)
    messages.append({'role': 'assistant', 'content': resp['content']})
    print(f'第 {turn} 回合：stop_reason = {resp["stop_reason"]}')
    if resp['stop_reason'] != 'tool_use':
        break
    results = []
    for block in resp['content']:
        if block['type'] == 'tool_use':
            out = TOOLS[block['name']](**block['input'])
            print('  執行', block['name'], block['input'], '→', out)
            results.append({'type': 'tool_result', 'tool_use_id': block['id'], 'content': out})
    messages.append({'role': 'user', 'content': results})     # 所有結果放在同一則訊息

print('最後回答：', messages[-1]['content'][0]['text'])
print('訊息順序：', ' → '.join(m['role'] for m in messages))</pre>
<p>互動練習中的「代理迴圈逐步追蹤」可以一步步看 messages 陣列的變化。</p>` },
    { id: 'parallel', title: '平行工具呼叫', html: `
<p>模型可能在同一個回應中要求多個工具（像上面一次查兩筆訂單）。處理規則：</p>
<ul>
<li>每個 <code>tool_use</code> 都要有對應的 <code>tool_result</code>，用 <code>tool_use_id</code> 對應。</li>
<li>所有結果要放在<b>同一則</b> user 訊息中送回。分成多則訊息送回，會讓模型之後越來越少使用平行呼叫。</li>
<li>工具之間沒有相依時，你的程式可以同時執行它們，縮短等待時間。</li>
</ul>` },
    { id: 'errors', title: '工具錯誤與停止條件', html: `
<p>工具失敗時<b>不要讓整個程式當掉</b>，而是回傳 <code>is_error: true</code> 的 tool_result，讓模型知道發生了什麼並調整做法：</p>
<pre class="py">def run_tool(block, tools):
    try:
        fn = tools.get(block['name'])
        if fn is None:
            raise ValueError(f"沒有名為 {block['name']} 的工具")
        return {'type': 'tool_result', 'tool_use_id': block['id'], 'content': str(fn(**block['input']))}
    except Exception as e:
        return {'type': 'tool_result', 'tool_use_id': block['id'], 'content': f'錯誤：{e}', 'is_error': True}

def divide(a, b):
    return a / b

tools = {'divide': divide}
calls = [{'id': 't1', 'name': 'divide', 'input': {'a': 10, 'b': 4}},
         {'id': 't2', 'name': 'divide', 'input': {'a': 1, 'b': 0}},
         {'id': 't3', 'name': 'multiply', 'input': {'a': 2, 'b': 3}}]
for c in calls:
    print(run_tool(c, tools))</pre>
<table>
<tr><th>停止條件</th><th>處理方式</th></tr>
<tr><td><code>end_turn</code></td><td>正常完成，結束迴圈</td></tr>
<tr><td><code>tool_use</code></td><td>執行工具並繼續</td></tr>
<tr><td><code>max_tokens</code></td><td>輸出被截斷：提高 max_tokens 或改用串流</td></tr>
<tr><td><code>pause_turn</code></td><td>伺服器端工具暫停：把回應加回 messages 後再送一次讓它繼續</td></tr>
<tr><td><code>refusal</code></td><td>模型基於安全原因拒絕，讀取內容前先檢查</td></tr>
<tr><td>達到回合上限</td><td>你的程式設定的保護機制：停止並回報目前進度</td></tr>
</table>` },
    { id: 'real', title: '用 Claude API 實作', html: `
<p>自己寫迴圈（在自己的電腦上執行）：</p>
<pre class="out">import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "我的訂單 A1001 和 A1002 到哪了？"}]

for _ in range(10):                                    # 回合上限
    response = client.messages.create(
        model="claude-opus-5-5", max_tokens=16000, tools=tools, messages=messages)
    messages.append({"role": "assistant", "content": response.content})
    if response.stop_reason != "tool_use":
        break
    results = [run_tool(b) for b in response.content if b.type == "tool_use"]
    messages.append({"role": "user", "content": results})

print(next(b.text for b in response.content if b.type == "text"))</pre>
<p>更簡單的做法是 Python SDK 的 <b>Tool Runner</b>（beta）：用 <code>@beta_tool</code> 把函式變成工具，SDK 會自動產生 schema 並處理整個迴圈：</p>
<pre class="out">import anthropic
from anthropic import beta_tool

client = anthropic.Anthropic()

@beta_tool
def get_order(order_id: str) -&gt; str:
    """查詢訂單的出貨狀態與預計送達日。

    Args:
        order_id: 訂單編號，格式如 A1001。
    """
    return lookup(order_id)              # 你的實作

runner = client.beta.messages.tool_runner(
    model="claude-opus-5-5",
    max_tokens=16000,
    tools=[get_order],
    messages=[{"role": "user", "content": "我的訂單 A1001 到哪了？"}],
)
for message in runner:                   # 每一回合產生一則訊息，Claude 完成時自動停止
    print(message)</pre>
<div class="box tip"><b class="t">需要人確認的動作</b>Tool Runner 也能做人工審核：在工具函式中先詢問使用者，不同意就回傳「使用者拒絕了這個動作」，模型會據此調整。退款、寄信、刪除資料這類動作都應該這樣做。</div>` }
  ],
  keypoints: [
    '代理迴圈：呼叫模型 → 加入回應 → stop_reason 為 tool_use 就執行工具並回傳結果 → 重複直到結束。',
    '每個 tool_use 都要有對應 tool_use_id 的 tool_result，所有結果放在同一則 user 訊息中。',
    '工具失敗時回傳 is_error: true 的 tool_result，不要讓程式當掉。',
    '一定要設定回合上限；並處理 max_tokens、pause_turn、refusal 等停止原因。',
    'Python SDK 的 Tool Runner（@beta_tool + client.beta.messages.tool_runner）自動處理迴圈。',
    '退款、寄信、刪除等動作應在工具中加入人工確認。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 55,
  title: '代理設計模式',
  summary: 'Anthropic 整理的五種常用模式：提示串連、路由、平行化、協調者與工作者、評估與改進，每種模式的適用時機與模擬範例，以及如何組合模式。',
  sections: [
    { id: 'chain', title: '1. 提示串連（Prompt Chaining）', html: `
<p>把任務拆成固定的幾個步驟，前一步的輸出是下一步的輸入，中間可以加上程式檢查（gate）：</p>
<pre class="py">def call_model(step, text):
    """模擬模型：依步驟回傳結果。"""
    if step == 'outline':
        return ['產品特色', '價格方案', '常見問題']
    if step == 'write':
        return {sec: f'（{sec}的內容）' for sec in text}
    if step == 'translate':
        return {k: v.replace('內容', 'content') for k, v in text.items()}

outline = call_model('outline', '新款耳機的介紹文')
assert len(outline) &gt;= 3, '大綱至少要 3 段'          # gate：用程式檢查中間結果
draft = call_model('write', outline)
english = call_model('translate', draft)
print(outline)
print(list(english.values()))</pre>
<p><b>適合</b>：步驟固定、可以清楚拆開的任務，用多一點時間換取每一步更高的準確度。例如：寫大綱 → 檢查大綱 → 撰寫 → 翻譯。</p>` },
    { id: 'route', title: '2. 路由（Routing）', html: `
<p>先分類，再交給專門的處理流程（可以用不同的提示詞、工具，甚至不同的模型）：</p>
<pre class="py">def classify(msg):
    """模擬分類：實務上用一次便宜快速的模型呼叫（例如 Haiku）完成。"""
    if any(w in msg for w in ['退款', '退貨', '刷卡']):
        return 'billing'
    if any(w in msg for w in ['壞掉', '無法', '錯誤']):
        return 'tech'
    return 'general'

HANDLERS = {
    'billing': lambda m: '帳務專員流程：查詢訂單 → 確認退款條件',
    'tech': lambda m: '技術支援流程：收集錯誤訊息 → 查詢知識庫',
    'general': lambda m: '一般客服流程：直接回答',
}

for msg in ['我要退款', 'App 一直出現錯誤', '你們幾點營業？']:
    route = classify(msg)
    print(f'{msg:&lt;12} → {route:&lt;8} {HANDLERS[route](msg)}')</pre>
<p><b>適合</b>：輸入類型差異大、分開處理效果更好時。簡單的問題交給小模型，困難的交給大模型，也能節省成本。</p>` },
    { id: 'parallel', title: '3. 平行化（Parallelization）', html: `
<p>兩種形式：<b>分段</b>（把獨立的子任務同時執行）與<b>投票</b>（同一個任務執行多次，取多數或綜合結果）：</p>
<pre class="py">import asyncio

async def review(aspect, code):
    """模擬模型：每個面向的審查各自獨立，可以同時進行。"""
    await asyncio.sleep(0.1)
    findings = {'安全性': '發現 SQL 字串串接，有注入風險', '效能': '迴圈中重複查詢資料庫', '可讀性': '變數命名清楚'}
    return aspect, findings[aspect]

async def main():
    code = 'for id in ids: db.query("SELECT * FROM t WHERE id=" + id)'
    results = await asyncio.gather(*[review(a, code) for a in ['安全性', '效能', '可讀性']])
    for aspect, f in results:
        print(f'{aspect}：{f}')

    votes = ['有風險', '有風險', '沒問題']           # 投票：同一個問題問三次
    print('投票結果：', max(set(votes), key=votes.count))

await main()     # 在自己的電腦上執行時改成 asyncio.run(main())</pre>
<p><b>適合</b>：子任務彼此獨立（例如同時從不同面向審查）、或需要多個意見提高可信度（例如判斷內容是否違規）。</p>` },
    { id: 'orchestrator', title: '4. 協調者與工作者（Orchestrator-Workers）', html: `
<p>由一個協調者動態決定要拆成哪些子任務，分派給工作者，最後彙整。和平行化的差別是：<b>子任務無法事先決定</b>，要看輸入才知道：</p>
<pre class="py">def orchestrator(task):
    """模擬協調者：依任務內容決定要修改哪些檔案（實務上由模型判斷）。"""
    plan = []
    if '欄位' in task:
        plan.append(('db/schema.sql', '新增 phone 欄位'))
        plan.append(('api/users.py', '在 API 回應中加入 phone'))
    if '畫面' in task:
        plan.append(('web/Profile.tsx', '在個人資料頁顯示電話'))
    return plan

def worker(file, instruction):
    return f'✓ {file}：{instruction}'

task = '會員資料新增手機欄位，並在畫面上顯示'
plan = orchestrator(task)
print(f'協調者拆成 {len(plan)} 個子任務')
results = [worker(f, ins) for f, ins in plan]
print('\\n'.join(results))
print('彙整：已修改', len(results), '個檔案')</pre>
<p><b>適合</b>：複雜且無法預先拆解的任務，例如修改多個檔案的程式需求、需要從多個來源蒐集資料的研究。工作者通常是有獨立 context 的子代理。</p>` },
    { id: 'evaluator', title: '5. 評估與改進（Evaluator-Optimizer）', html: `
<p>一個產生答案，另一個依明確的標準評估並給回饋，反覆改進直到通過：</p>
<pre class="py">def generate(feedback):
    drafts = ['我們的耳機很好。',
              '我們的耳機有 40 小時續航。',
              '我們的耳機有 40 小時續航，主動降噪，售價 NT$2,990。']
    return drafts[min(len(feedback), 2)]

def evaluate(text):
    """依明確的標準評分：要有續航、降噪、價格三個重點。"""
    missing = [k for k in ['續航', '降噪', 'NT$'] if k not in text]
    return (len(missing) == 0), missing

feedback = []
for round_ in range(1, 6):
    draft = generate(feedback)
    ok, missing = evaluate(draft)
    print(f'第 {round_} 版：{draft}  → {"通過" if ok else "缺少 " + "、".join(missing)}')
    if ok:
        break
    feedback.append(missing)</pre>
<p><b>適合</b>：有清楚的評估標準，而且回饋能讓結果明顯變好，例如翻譯的用詞、需要符合規格的文案、程式碼要通過測試。</p>
<div class="box exam"><b class="t">組合使用</b>真實的系統常組合多種模式：先路由，再由協調者拆解任務、工作者平行處理，最後經過評估與改進。互動練習中的「代理模式選擇器」可以依任務特性找出合適的模式。</div>` }
  ],
  keypoints: [
    '提示串連：固定步驟依序執行，中間可用程式檢查；用時間換取準確度。',
    '路由：先分類再交給專門的流程，簡單問題可交給較小較便宜的模型。',
    '平行化：分段同時處理獨立的子任務，或投票取多數提高可信度。',
    '協調者與工作者：子任務無法事先決定時，由協調者動態拆解並分派給子代理。',
    '評估與改進：依明確標準評估並回饋，反覆改進直到通過。',
    '實務上常組合多種模式；能用工作流程解決的不需要完全自主的代理。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 45,
  title: 'Context 與記憶',
  summary: 'context 是代理最稀缺的資源、估算 context 的使用量、精簡工具結果、壓縮（compaction）與清除舊的工具結果、用記憶檔跨對話保存知識、用子代理隔離 context，以及檢索式的知識取得。',
  sections: [
    { id: 'budget', title: 'Context 是稀缺資源', html: `
<p>代理每一回合都會把整個 messages（包含所有工具結果）送給模型。工具結果太大時，context 很快就被塞滿，成本上升，模型也更容易分心：</p>
<pre class="py">def tokens(text):
    """粗估 token 數：中文約 1 字 1.5 token，英數約 4 字元 1 token。"""
    cjk = sum(1 for c in text if '一' &lt;= c &lt;= '鿿')
    return int(cjk * 1.5 + (len(text) - cjk) / 4)

full_row = '{"order_id":"A1001","customer":"王小明","phone":"0912345678","address":"台北市信義區…",' * 20
slim = '訂單 A1001：已出貨，預計 11/02 送達'
print('完整資料列：', tokens(full_row), 'tokens')
print('精簡結果：', tokens(slim), 'tokens')

turns, per_turn = 30, tokens(full_row)
history = sum(per_turn * t for t in range(1, turns + 1))    # 每一回合都重送之前全部的內容
print(f'{turns} 回合累計送出約 {history:,} tokens')</pre>
<table>
<tr><th>做法</th><th>說明</th></tr>
<tr><td>精簡工具結果</td><td>只回傳需要的欄位；清單加上分頁與筆數上限</td></tr>
<tr><td>清除舊的工具結果</td><td>Context editing：自動移除很久以前的工具結果</td></tr>
<tr><td>壓縮（Compaction）</td><td>接近上限時把較早的對話摘要，例如 Claude Code 的 /compact</td></tr>
<tr><td>子代理</td><td>把大量閱讀的工作交給子代理，它只回傳結論</td></tr>
<tr><td>提示快取</td><td>系統提示詞與工具定義放在前面並快取，降低重複送出的成本</td></tr>
</table>` },
    { id: 'compact', title: '壓縮與滑動視窗', html: `
<pre class="py">def summarize(msgs):
    """模擬摘要：實務上請模型把舊訊息濃縮成重點。"""
    facts = [m['content'] for m in msgs if m.get('keep')]
    return {'role': 'user', 'content': '【先前對話摘要】' + '；'.join(facts)}

history = [{'role': 'user', 'content': f'第 {i} 步的細節……', 'keep': i in (2, 5)} for i in range(1, 9)]
history[1]['content'] = '確認客戶是金卡會員'
history[4]['content'] = '退款金額上限為 3,000 元'

LIMIT, KEEP_RECENT = 6, 3
if len(history) &gt; LIMIT:
    old, recent = history[:-KEEP_RECENT], history[-KEEP_RECENT:]
    history = [summarize(old)] + recent
for m in history:
    print(m['content'])</pre>
<p>壓縮的關鍵是<b>保留重要的決定與事實</b>（客戶身分、已確認的限制），丟掉過程細節。Claude API 也提供伺服器端的 compaction 功能（beta），在 context 接近上限時自動摘要。</p>` },
    { id: 'memory', title: '記憶：跨對話保存知識', html: `
<p>Context 在每次對話結束後就消失。需要長期記住的事（使用者偏好、專案慣例、學到的教訓）要存在外部，例如檔案或資料庫，讓代理用工具讀寫：</p>
<pre class="py">import json

class MemoryStore:
    """簡單的記憶工具：代理可以 view 與 write 記憶檔。"""
    def __init__(self):
        self.files = {}
    def write(self, path, text):
        self.files[path] = text
        return f'已寫入 {path}'
    def view(self, path=None):
        if path is None:
            return '記憶檔：' + ', '.join(sorted(self.files)) if self.files else '（沒有記憶）'
        return self.files.get(path, f'找不到 {path}')

mem = MemoryStore()
# 第一次對話：代理學到使用者的偏好
print(mem.write('/memories/user.md', '偏好繁體中文、報告用表格呈現'))
print(mem.write('/memories/lessons.md', '查詢訂單前先確認是會員還是訪客'))
# 下一次對話開始時：代理先查看有哪些記憶
print(mem.view())
print(mem.view('/memories/user.md'))</pre>
<p>Claude API 提供記憶工具（<code>memory_20250818</code>），由你的程式實作檔案的儲存位置；Claude Code 的 CLAUDE.md 與自動記憶也是同樣的概念。記憶內容要定期整理，錯誤或過時的記憶會誤導代理。</p>` },
    { id: 'retrieval', title: '用工具取得知識', html: `
<p>不需要把整本手冊放進 context。提供一個<b>搜尋工具</b>，讓代理在需要時自己查（也就是代理式 RAG）：</p>
<pre class="py">DOCS = {
    '退貨政策': '收到商品 7 天內可退貨，需保持包裝完整。',
    '運費': '單筆滿 1,000 元免運，未滿收 80 元。',
    '會員等級': '年消費滿 20,000 元升級金卡，享 95 折。',
}

def search_docs(query):
    hits = [f'[{k}] {v}' for k, v in DOCS.items() if any(w in k + v for w in query.split())]
    return '\\n'.join(hits) if hits else '查無相關文件'

print(search_docs('退貨 天'))
print(search_docs('金卡 折扣'))</pre>
<p>和事先把所有資料塞進 context 相比，代理可以依問題多次搜尋、換關鍵字再查，只讀需要的內容。實務上搜尋工具背後常是向量資料庫或全文搜尋引擎（參考「AI 應用實作」課程的 RAG 章節）。</p>` }
  ],
  keypoints: [
    'Context 是代理最稀缺的資源：每一回合都重送整個 messages，工具結果太大會讓成本與錯誤增加。',
    '精簡工具結果、清除舊的工具結果、壓縮、子代理、提示快取是管理 context 的主要方法。',
    '壓縮時保留重要的決定與事實，丟掉過程細節。',
    '需要跨對話保存的知識存在外部（記憶檔、資料庫），由代理用工具讀寫，並定期整理。',
    'Claude API 的記憶工具（memory_20250818）由你的程式決定儲存方式。',
    '提供搜尋工具讓代理需要時自己查詢（代理式 RAG），比把所有資料放進 context 更有效。'
  ]
}
);
