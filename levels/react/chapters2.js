/* React 進階篇：Hooks、狀態管理、路由與專案實戰
   <pre class="jsx"> 為可在網頁上即時預覽的 React 範例；<pre class="out"> 為一般程式碼或指令
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 60,
  title: 'useEffect 與副作用',
  summary: '什麼是副作用、useEffect 的語法與依賴陣列的三種情況、清除函式（計時器與事件監聽）、在 effect 中抓資料與競態問題、常見錯誤，以及哪些情況其實不需要 effect。',
  sections: [
    { id: 'what', title: '什麼是副作用', html: `
<p>元件的渲染應該是純粹的計算。但實際的應用程式需要和「React 以外的世界」互動：向伺服器抓資料、設定計時器、監聽視窗大小、修改網頁標題、連線聊天室。這些叫做<b>副作用（Side Effect）</b>。</p>
<p>副作用有兩個去處：</p>
<table>
<tr><th>放在哪裡</th><th>時機</th><th>例子</th></tr>
<tr><td>事件處理函式</td><td>使用者做了某個動作</td><td>按下送出才送 API、按下按鈕才播放音效</td></tr>
<tr><td>useEffect</td><td>元件顯示在畫面上、或某些資料改變之後</td><td>進入頁面就抓資料、顯示時開始計時、同步網頁標題</td></tr>
</table>
<pre class="out">useEffect(() =&gt; {
  // 渲染完成、畫面更新之後執行
  return () =&gt; {
    // 清除函式（可省略）：下一次 effect 執行前、或元件移除時執行
  };
}, [依賴陣列]);</pre>` },
    { id: 'deps', title: '依賴陣列的三種情況', html: `
<table>
<tr><th>寫法</th><th>什麼時候執行</th></tr>
<tr><td><code>useEffect(fn)</code>（沒有依賴陣列）</td><td>每一次渲染之後</td></tr>
<tr><td><code>useEffect(fn, [])</code></td><td>只在元件第一次顯示（掛載）之後執行一次</td></tr>
<tr><td><code>useEffect(fn, [a, b])</code></td><td>第一次顯示之後，以及 a 或 b 改變之後</td></tr>
</table>
<p>按下面的按鈕，觀察 console 中哪些 effect 被執行：</p>
<pre class="jsx">import { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() =&gt; { console.log('① 沒有依賴：每次渲染後都執行'); });
  useEffect(() =&gt; { console.log('② 空陣列：只在掛載時執行一次'); }, []);
  useEffect(() =&gt; { console.log('③ [count]：count 變成', count); }, [count]);
  useEffect(() =&gt; { document.title = '點了 ' + count + ' 次'; }, [count]);

  return (
    &lt;div&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;count：{count}&lt;/button&gt;
      &lt;input value={text} onChange={e =&gt; setText(e.target.value)} placeholder="打字只會觸發 ①" /&gt;
    &lt;/div&gt;
  );
}</pre>
<p>React 用 <code>Object.is</code> 逐一比較依賴陣列中的每個值，只要有一個不同就重新執行。effect 裡用到的 props、state 與在元件中定義的變數，都應該放進依賴陣列。</p>
<div class="box tip"><b class="t">讓工具幫你檢查</b>Vite 的 React 範本已設定 ESLint 的 <code>react-hooks/exhaustive-deps</code> 規則，依賴陣列漏寫時會出現警告。不要為了消除警告而刪掉依賴，而是要調整程式碼的寫法。</div>` },
    { id: 'cleanup', title: '清除函式', html: `
<p>計時器、事件監聽、訂閱、WebSocket 連線，在元件移除或依賴改變時都要<b>取消</b>，否則會一直累積，造成記憶體洩漏或重複執行。把取消的程式寫在 effect 回傳的函式中：</p>
<pre class="jsx">import { useState, useEffect } from 'react';

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() =&gt; {
    console.log('開始計時');
    const id = setInterval(() =&gt; setNow(new Date()), 1000);
    return () =&gt; { clearInterval(id); console.log('停止計時'); };
  }, []);
  return &lt;p&gt;🕒 {now.toLocaleTimeString()}&lt;/p&gt;;
}

function WindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() =&gt; {
    const onResize = () =&gt; setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () =&gt; window.removeEventListener('resize', onResize);
  }, []);
  return &lt;p&gt;預覽框寬度：{w}px&lt;/p&gt;;
}

export default function App() {
  const [show, setShow] = useState(true);
  return (
    &lt;div&gt;
      &lt;button onClick={() =&gt; setShow(!show)}&gt;{show ? '移除' : '顯示'}時鐘&lt;/button&gt;
      {show &amp;&amp; &lt;Clock /&gt;}
      &lt;WindowWidth /&gt;
    &lt;/div&gt;
  );
}</pre>
<p>按「移除時鐘」會看到 console 印出「停止計時」。如果沒有清除函式，時鐘元件移除後計時器還在背景執行。</p>
<div class="box memo"><b class="t">開發模式下 effect 執行兩次</b>在 <code>&lt;StrictMode&gt;</code> 中，React 會在掛載後立刻執行一次「清除 → 再執行」，用來檢查你的清除函式寫得對不對。所以在自己的專案中會看到「開始計時、停止計時、開始計時」，這是正常的，正式版只會執行一次。</div>
<p>互動練習中的「useEffect 執行順序」可以模擬不同依賴陣列下，effect 與清除函式的執行順序。</p>` },
    { id: 'fetch', title: '在 effect 中抓資料', html: `
<p>進入頁面就要載入資料，是 useEffect 最常見的用途。要處理三種狀態：<b>載入中、錯誤、成功</b>。下面用一個模擬的 API（延遲後回傳資料）示範：</p>
<pre class="jsx">import { useState, useEffect } from 'react';

// 模擬 API：實際專案中改成 fetch('/api/users/' + id)
function fakeFetchUser(id) {
  return new Promise((resolve, reject) =&gt; {
    const delay = 300 + Math.random() * 1200;
    setTimeout(() =&gt; {
      if (id === 4) reject(new Error('找不到使用者 4'));
      else resolve({ id, name: ['小明', '小華', '小美', '', '阿哲'][id - 1], delay: Math.round(delay) });
    }, delay);
  });
}

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =&gt; {
    let ignore = false;               // 避免舊的請求覆蓋新的結果
    setLoading(true);
    setError(null);
    fakeFetchUser(userId)
      .then(data =&gt; { if (!ignore) setUser(data); })
      .catch(err =&gt; { if (!ignore) setError(err.message); })
      .finally(() =&gt; { if (!ignore) setLoading(false); });
    return () =&gt; { ignore = true; };
  }, [userId]);

  if (loading) return &lt;p&gt;載入中…&lt;/p&gt;;
  if (error) return &lt;p style={{ color: 'crimson' }}&gt;錯誤：{error}&lt;/p&gt;;
  return &lt;p&gt;👤 #{user.id} {user.name}（花了 {user.delay} 毫秒）&lt;/p&gt;;
}

export default function App() {
  const [id, setId] = useState(1);
  return (
    &lt;div&gt;
      {[1, 2, 3, 4, 5].map(n =&gt; (
        &lt;button key={n} onClick={() =&gt; setId(n)} disabled={n === id}&gt;使用者 {n}&lt;/button&gt;
      ))}
      &lt;UserProfile userId={id} /&gt;
    &lt;/div&gt;
  );
}</pre>
<p>快速連續點不同的按鈕，每個請求花的時間不同，晚送出的請求可能比較早回來。<code>ignore</code> 旗標確保只有<b>最新一次</b>的結果會被寫進 state，這個問題叫做<b>競態條件（Race Condition）</b>。使用真正的 fetch 時，也可以用 <code>AbortController</code> 直接取消舊請求。</p>
<pre class="out">useEffect(() =&gt; {
  const controller = new AbortController();
  fetch('/api/users/' + userId, { signal: controller.signal })
    .then(res =&gt; { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
    .then(setUser)
    .catch(err =&gt; { if (err.name !== 'AbortError') setError(err.message); });
  return () =&gt; controller.abort();
}, [userId]);</pre>
<div class="box warn"><b class="t">effect 的函式不能直接是 async</b><code>useEffect(async () =&gt; {...})</code> 會回傳 Promise，而 React 期待的是清除函式。要用 async/await 時，在 effect 裡面定義一個 async 函式再呼叫它：<code>useEffect(() =&gt; { async function load() {...} load(); }, [id]);</code></div>` },
    { id: 'mistakes', title: '常見錯誤與不需要 effect 的情況', html: `
<table>
<tr><th>錯誤</th><th>結果</th><th>修正</th></tr>
<tr><td>effect 中 setCount(count + 1)，依賴有 count</td><td>無限迴圈：更新 → 渲染 → effect → 更新…</td><td>想清楚為什麼要這樣做，通常這段邏輯應放在事件處理中</td></tr>
<tr><td>依賴陣列漏掉用到的 state</td><td>effect 一直使用舊的值（過時的閉包）</td><td>補上依賴，或改用更新函式 setX(x =&gt; …)</td></tr>
<tr><td>依賴是每次渲染都重新建立的物件或函式</td><td>每次渲染都重新執行 effect</td><td>把物件移到 effect 內、只依賴原始值，或用 useMemo／useCallback</td></tr>
<tr><td>忘了清除計時器或監聽器</td><td>記憶體洩漏、重複執行</td><td>回傳清除函式</td></tr>
</table>
<p>React 官方強調：<b>很多情況其實不需要 effect</b>。</p>
<pre class="out">// ❌ 用 effect 計算衍生資料：多渲染一次，還可能不同步
const [fullName, setFullName] = useState('');
useEffect(() =&gt; { setFullName(first + ' ' + last); }, [first, last]);

// ✅ 直接在渲染時計算
const fullName = first + ' ' + last;

// ❌ 用 effect 回應使用者操作
useEffect(() =&gt; { if (submitted) sendForm(form); }, [submitted]);

// ✅ 直接寫在事件處理函式中
function handleSubmit() { sendForm(form); }</pre>
<div class="box exam"><b class="t">判斷原則</b>問自己：這段程式要執行，是因為「使用者做了某件事」（放事件處理），還是因為「元件出現在畫面上、需要和外部系統同步」（放 effect）？能在渲染時算出來的值，既不需要 state，也不需要 effect。</div>` }
  ],
  keypoints: [
    '副作用是和 React 外部互動的程式（抓資料、計時器、監聽、修改標題），放在事件處理或 useEffect。',
    '依賴陣列：沒寫則每次渲染後執行、[] 只在掛載時執行、[a, b] 在 a 或 b 改變時執行。',
    'effect 回傳清除函式，在下次執行前與元件移除時執行，用來取消計時器、監聽與訂閱。',
    '抓資料要處理載入中、錯誤、成功三種狀態，並用 ignore 旗標或 AbortController 避免競態條件。',
    'effect 的函式不能是 async，要在裡面定義 async 函式再呼叫；開發模式的 StrictMode 會讓 effect 多執行一次。',
    '衍生資料直接在渲染時計算、使用者操作放在事件處理，不需要 effect。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 55,
  title: 'useRef 與效能最佳化',
  summary: 'useRef 取得 DOM 元素與保存不觸發渲染的值、React 何時重新渲染、memo 跳過子元件渲染、useMemo 快取計算結果、useCallback 快取函式，以及什麼時候才需要最佳化。',
  sections: [
    { id: 'dom', title: 'useRef 取得 DOM 元素', html: `
<p>React 負責管理 DOM，大部分時候不需要直接操作。但有些事情必須直接碰 DOM：讓輸入框取得焦點、捲動到某個位置、量測元素大小、播放影片。這時用 <code>useRef</code>：</p>
<pre class="jsx">import { useRef } from 'react';

export default function App() {
  const inputRef = useRef(null);
  const listRef = useRef(null);

  return (
    &lt;div&gt;
      &lt;input ref={inputRef} placeholder="按按鈕讓我取得焦點" /&gt;
      &lt;button onClick={() =&gt; inputRef.current.focus()}&gt;聚焦&lt;/button&gt;
      &lt;button onClick={() =&gt; { inputRef.current.value = ''; inputRef.current.focus(); }}&gt;清空&lt;/button&gt;
      &lt;button onClick={() =&gt; listRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}&gt;捲到最後一項&lt;/button&gt;
      &lt;ul ref={listRef} style={{ height: 90, overflow: 'auto', border: '1px solid #ccc' }}&gt;
        {Array.from({ length: 20 }, (_, i) =&gt; &lt;li key={i}&gt;第 {i + 1} 項&lt;/li&gt;)}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}</pre>
<p>把 ref 物件傳給元素的 <code>ref</code> 屬性，React 會在元素建立後把 DOM 節點放進 <code>ref.current</code>。注意要在事件處理或 effect 中使用，渲染過程中 <code>ref.current</code> 可能還是 null。</p>` },
    { id: 'value', title: 'useRef 保存不觸發渲染的值', html: `
<p><code>useRef</code> 也可以存放任何值。它和 state 的差別：</p>
<table>
<tr><th></th><th>useState</th><th>useRef</th></tr>
<tr><td>改變時重新渲染</td><td>會</td><td>不會</td></tr>
<tr><td>讀取方式</td><td><code>count</code></td><td><code>ref.current</code></td></tr>
<tr><td>修改方式</td><td><code>setCount(1)</code></td><td><code>ref.current = 1</code>（直接修改）</td></tr>
<tr><td>適合存放</td><td>要顯示在畫面上的資料</td><td>計時器 id、前一次的值、DOM 元素等不影響畫面的資料</td></tr>
</table>
<pre class="jsx">import { useState, useRef } from 'react';

export default function App() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);      // 存計時器 id：改變時不需要重新渲染
  const clicksRef = useRef(0);

  function start() {
    if (timerRef.current) return;
    const begin = Date.now() - ms;
    timerRef.current = setInterval(() =&gt; setMs(Date.now() - begin), 50);
    setRunning(true);
  }
  function stop() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
  }

  return (
    &lt;div&gt;
      &lt;h2&gt;{(ms / 1000).toFixed(2)} 秒&lt;/h2&gt;
      &lt;button onClick={start} disabled={running}&gt;開始&lt;/button&gt;
      &lt;button onClick={stop} disabled={!running}&gt;暫停&lt;/button&gt;
      &lt;button onClick={() =&gt; { stop(); setMs(0); }}&gt;歸零&lt;/button&gt;
      &lt;button onClick={() =&gt; { clicksRef.current++; console.log('ref 被點了', clicksRef.current, '次（畫面不會更新）'); }}&gt;點我（ref）&lt;/button&gt;
    &lt;/div&gt;
  );
}</pre>` },
    { id: 'render', title: 'React 何時重新渲染', html: `
<p>元件會在以下情況重新渲染（重新執行元件函式）：</p>
<ol>
<li>自己的 state 改變。</li>
<li><b>父元件重新渲染</b>：預設情況下，父元件渲染時，所有子元件都會跟著重新渲染，即使 props 沒有改變。</li>
<li>使用的 Context 值改變。</li>
</ol>
<p>渲染不等於更新 DOM。React 渲染完會比較新舊結果，只有真正不同的部分才會更新到畫面上。大部分情況下重新渲染很快，不需要擔心。</p>
<pre class="jsx">import { useState, useRef } from 'react';

function Child({ name }) {
  const renders = useRef(0);
  renders.current++;
  return &lt;p&gt;{name} 已渲染 {renders.current} 次&lt;/p&gt;;
}

export default function App() {
  const [count, setCount] = useState(0);
  return (
    &lt;div&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;父元件 count：{count}&lt;/button&gt;
      &lt;Child name="子元件 A" /&gt;
      &lt;Child name="子元件 B" /&gt;
    &lt;/div&gt;
  );
}</pre>
<p>子元件的 props 從來沒變，但每次按按鈕，它們都跟著重新渲染了。互動練習中的「重新渲染追蹤」可以視覺化觀察整棵元件樹的渲染情況。</p>` },
    { id: 'memo', title: 'memo、useMemo、useCallback', html: `
<table>
<tr><th>工具</th><th>快取的東西</th><th>用途</th></tr>
<tr><td><code>memo(Component)</code></td><td>元件的渲染結果</td><td>props 沒變就跳過重新渲染</td></tr>
<tr><td><code>useMemo(() =&gt; 計算, [deps])</code></td><td>計算出來的值</td><td>昂貴的計算只在依賴改變時重算</td></tr>
<tr><td><code>useCallback(fn, [deps])</code></td><td>函式本身</td><td>讓傳給 memo 子元件的函式保持同一個參考</td></tr>
</table>
<pre class="jsx">import { useState, useMemo, useCallback, memo, useRef } from 'react';

const Row = memo(function Row({ item, onRemove }) {
  const renders = useRef(0);
  renders.current++;
  return &lt;li&gt;{item.name}（渲染 {renders.current} 次）&lt;button onClick={() =&gt; onRemove(item.id)}&gt;×&lt;/button&gt;&lt;/li&gt;;
});

function slowSum(items) {
  let total = 0;
  for (let i = 0; i &lt; 2000000; i++) total += i % 2;   // 模擬昂貴的計算
  return items.length * 100 + total * 0;
}

export default function App() {
  const [items, setItems] = useState([{ id: 1, name: '蘋果' }, { id: 2, name: '香蕉' }, { id: 3, name: '芒果' }]);
  const [text, setText] = useState('');

  const score = useMemo(() =&gt; slowSum(items), [items]);            // 打字時不會重算
  const remove = useCallback(id =&gt; setItems(list =&gt; list.filter(i =&gt; i.id !== id)), []);

  return (
    &lt;div&gt;
      &lt;input value={text} onChange={e =&gt; setText(e.target.value)} placeholder="打字時列表不會重新渲染" /&gt;
      &lt;p&gt;分數：{score}&lt;/p&gt;
      &lt;ul&gt;{items.map(it =&gt; &lt;Row key={it.id} item={it} onRemove={remove} /&gt;)}&lt;/ul&gt;
    &lt;/div&gt;
  );
}</pre>
<p>在輸入框打字時，App 重新渲染，但 Row 的渲染次數不會增加。原因是 Row 用 memo 包起來，而且收到的 <code>item</code> 與 <code>onRemove</code> 都是同一個參考。如果把 useCallback 拿掉，每次渲染都會建立新的 remove 函式，memo 就失效了。</p>
<div class="box warn"><b class="t">不要過早最佳化</b>memo、useMemo、useCallback 本身也有成本，還會讓程式更難讀。先寫出正確的程式，真的感覺到卡頓時，再用 React DevTools 的 Profiler 找出瓶頸。常見的有效做法其實是：把 state 移到真正需要它的元件裡、把會變動的部分拆成小元件。新版的 React Compiler 也能自動完成大部分的記憶化。</div>` }
  ],
  keypoints: [
    'useRef 傳給元素的 ref 屬性即可取得 DOM 節點（ref.current），用於聚焦、捲動、量測。',
    'useRef 也能保存值：修改 ref.current 不會重新渲染，適合存計時器 id 等不影響畫面的資料。',
    '元件在自己的 state 改變、父元件重新渲染、使用的 Context 改變時重新渲染。',
    '渲染不等於更新 DOM，React 只更新真正改變的部分。',
    'memo 讓 props 沒變的元件跳過渲染；useMemo 快取計算結果；useCallback 快取函式參考。',
    '不要過早最佳化：先寫正確的程式，用 Profiler 找到瓶頸再處理。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 60,
  title: '狀態管理：提升 state、Context 與 useReducer',
  summary: '把 state 提升到共同父元件、props drilling 的問題、用 Context 跨層傳遞資料、用 useReducer 集中管理更新邏輯、結合 Context 與 reducer，以及撰寫自訂 Hook。',
  sections: [
    { id: 'lift', title: '提升 state', html: `
<p>當兩個元件需要<b>共用同一份資料</b>時，把 state 移到它們最近的共同父元件，再用 props 傳下去，這叫<b>提升 state（Lifting State Up）</b>：</p>
<pre class="jsx">import { useState } from 'react';

function TempInput({ label, value, onChange }) {
  return (
    &lt;p&gt;
      {label}：&lt;input type="number" value={value} onChange={e =&gt; onChange(e.target.value)} /&gt;
    &lt;/p&gt;
  );
}

export default function App() {
  const [celsius, setCelsius] = useState('25');     // 唯一的資料來源
  const c = parseFloat(celsius);
  const fahrenheit = isNaN(c) ? '' : String(Math.round((c * 9 / 5 + 32) * 10) / 10);

  return (
    &lt;div&gt;
      &lt;TempInput label="攝氏" value={celsius} onChange={setCelsius} /&gt;
      &lt;TempInput label="華氏" value={fahrenheit}
        onChange={f =&gt; setCelsius(f === '' ? '' : String(Math.round((parseFloat(f) - 32) * 5 / 9 * 10) / 10))} /&gt;
      &lt;p&gt;{c &gt;= 30 ? '🥵 好熱' : c &lt;= 15 ? '🥶 好冷' : '😊 舒適'}&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>
<p>只存攝氏一個 state，華氏是算出來的，兩個欄位永遠一致。</p>` },
    { id: 'context', title: 'Context：跨層傳遞資料', html: `
<p>如果資料要傳給很深層的元件，中間每一層都要轉傳 props，這叫 <b>props drilling</b>。主題、登入的使用者、語系這類「很多元件都需要」的資料，可以用 <b>Context</b> 直接提供給底下任何一層：</p>
<pre class="jsx">import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');   // 1. 建立 Context（參數是預設值）

function Button({ children }) {
  const theme = useContext(ThemeContext);      // 3. 任何一層都能直接讀取
  const dark = theme === 'dark';
  return &lt;button style={{ background: dark ? '#333' : '#f3f3f3', color: dark ? '#fff' : '#222' }}&gt;{children}&lt;/button&gt;;
}

function Toolbar() {                           // 中間層不需要轉傳 theme
  return &lt;div&gt;&lt;Button&gt;儲存&lt;/Button&gt;&lt;Button&gt;取消&lt;/Button&gt;&lt;/div&gt;;
}

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    &lt;ThemeContext.Provider value={theme}&gt;      {/* 2. 用 Provider 提供值 */}
      &lt;div style={{ padding: 12, background: theme === 'dark' ? '#111' : '#fff' }}&gt;
        &lt;Toolbar /&gt;
        &lt;label style={{ color: theme === 'dark' ? '#ddd' : '#222' }}&gt;
          &lt;input type="checkbox" checked={theme === 'dark'} onChange={e =&gt; setTheme(e.target.checked ? 'dark' : 'light')} /&gt; 深色模式
        &lt;/label&gt;
      &lt;/div&gt;
    &lt;/ThemeContext.Provider&gt;
  );
}</pre>
<div class="box warn"><b class="t">不要什麼都放 Context</b>Context 的值改變時，所有使用它的元件都會重新渲染。只傳一兩層的資料直接用 props 就好；也可以先試著用 children 組合元件，減少中間層。全域資料很多、更新頻繁時，可以考慮 Zustand、Redux Toolkit 等狀態管理套件。</div>` },
    { id: 'reducer', title: 'useReducer：集中管理更新邏輯', html: `
<p>當一個 state 有很多種更新方式（新增、刪除、修改數量、清空…），更新邏輯散落在各個事件處理函式中會很難維護。<code>useReducer</code> 把所有更新邏輯集中到一個 <b>reducer</b> 函式：</p>
<pre class="out">const [state, dispatch] = useReducer(reducer, 初始值);
dispatch({ type: 'add', item });          // 發出「動作」描述發生了什麼

function reducer(state, action) {         // 依照動作計算新的 state（純函式）
  switch (action.type) { ... }
}</pre>
<pre class="jsx">import { useReducer } from 'react';

function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      const found = cart.find(i =&gt; i.id === action.item.id);
      if (found) return cart.map(i =&gt; i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...cart, { ...action.item, qty: 1 }];
    }
    case 'dec':
      return cart.map(i =&gt; i.id === action.id ? { ...i, qty: i.qty - 1 } : i).filter(i =&gt; i.qty &gt; 0);
    case 'clear':
      return [];
    default:
      throw new Error('未知的動作：' + action.type);
  }
}

const MENU = [{ id: 1, name: '拿鐵', price: 120 }, { id: 2, name: '美式', price: 90 }, { id: 3, name: '可頌', price: 65 }];

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = cart.reduce((s, i) =&gt; s + i.price * i.qty, 0);
  return (
    &lt;div&gt;
      {MENU.map(m =&gt; &lt;button key={m.id} onClick={() =&gt; dispatch({ type: 'add', item: m })}&gt;+ {m.name} \${m.price}&lt;/button&gt;)}
      &lt;ul&gt;
        {cart.map(i =&gt; (
          &lt;li key={i.id}&gt;{i.name} × {i.qty} = \${i.price * i.qty} &lt;button onClick={() =&gt; dispatch({ type: 'dec', id: i.id })}&gt;−&lt;/button&gt;&lt;/li&gt;
        ))}
      &lt;/ul&gt;
      &lt;p&gt;合計：\${total} {cart.length &gt; 0 &amp;&amp; &lt;button onClick={() =&gt; dispatch({ type: 'clear' })}&gt;清空&lt;/button&gt;}&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>
<table>
<tr><th></th><th>useState</th><th>useReducer</th></tr>
<tr><td>適合</td><td>簡單的值、更新方式少</td><td>複雜的物件或陣列、更新方式多、下一個狀態依賴前一個</td></tr>
<tr><td>更新邏輯位置</td><td>分散在事件處理函式</td><td>集中在 reducer，容易閱讀與測試</td></tr>
</table>
<p>reducer 必須是純函式：不能修改傳進來的 state、不能送請求，相同的輸入一定得到相同的輸出。這也是 Redux 的核心觀念。</p>` },
    { id: 'combine', title: 'Context 搭配 reducer', html: `
<p>把 reducer 的 state 和 dispatch 放進 Context，任何深層元件都能讀取資料並發出動作，是中小型應用常見的全域狀態寫法：</p>
<pre class="jsx">import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);

function authReducer(state, action) {
  if (action.type === 'login') return { user: action.name };
  if (action.type === 'logout') return { user: null };
  return state;
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  return &lt;AuthContext.Provider value={{ ...state, dispatch }}&gt;{children}&lt;/AuthContext.Provider&gt;;
}

function useAuth() {                       // 包成自訂 Hook，使用時更簡潔
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 必須在 AuthProvider 裡面使用');
  return ctx;
}

function NavBar() {
  const { user, dispatch } = useAuth();
  return user
    ? &lt;p&gt;👋 {user} &lt;button onClick={() =&gt; dispatch({ type: 'logout' })}&gt;登出&lt;/button&gt;&lt;/p&gt;
    : &lt;button onClick={() =&gt; dispatch({ type: 'login', name: '小明' })}&gt;登入&lt;/button&gt;;
}

function Content() {
  const { user } = useAuth();
  return &lt;p&gt;{user ? '這是會員專屬內容。' : '請先登入才能看到內容。'}&lt;/p&gt;;
}

export default function App() {
  return (
    &lt;AuthProvider&gt;
      &lt;NavBar /&gt;
      &lt;Content /&gt;
    &lt;/AuthProvider&gt;
  );
}</pre>` },
    { id: 'custom', title: '自訂 Hook', html: `
<p>多個元件有相同的 Hook 邏輯時，把它抽成一個以 <code>use</code> 開頭的函式，就是<b>自訂 Hook</b>。每個使用它的元件會得到<b>各自獨立</b>的 state：</p>
<pre class="jsx">import { useState, useEffect } from 'react';

function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () =&gt; setOn(o =&gt; !o);
  return [on, toggle];
}

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() =&gt; {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initial;
    } catch { return initial; }          // 預覽框或無痕模式可能無法使用 localStorage
  });
  useEffect(() =&gt; {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() =&gt; {
    const f = () =&gt; setW(window.innerWidth);
    window.addEventListener('resize', f);
    return () =&gt; window.removeEventListener('resize', f);
  }, []);
  return w;
}

export default function App() {
  const [open, toggleOpen] = useToggle();
  const [name, setName] = useLocalStorage('name', '');
  const width = useWindowWidth();
  return (
    &lt;div&gt;
      &lt;button onClick={toggleOpen}&gt;{open ? '收合' : '展開'}說明&lt;/button&gt;
      {open &amp;&amp; &lt;p&gt;自訂 Hook 讓元件只描述「要做什麼」，細節藏在 Hook 裡。&lt;/p&gt;}
      &lt;p&gt;&lt;input value={name} onChange={e =&gt; setName(e.target.value)} placeholder="名字會存在 localStorage" /&gt;&lt;/p&gt;
      &lt;p&gt;寬度 {width}px：{width &lt; 500 ? '手機版面' : '桌面版面'}&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>
<div class="box exam"><b class="t">Hook 的兩條規則</b>① 只在元件或自訂 Hook 的<b>最上層</b>呼叫 Hook，不能放在 if、迴圈、巢狀函式或提早 return 之後。React 依照呼叫的<b>順序</b>來對應每個 Hook 的狀態，順序改變就會對錯。② 只在 React 函式元件或自訂 Hook 中呼叫，不能在一般函式中呼叫。</div>` }
  ],
  keypoints: [
    '多個元件共用的資料，提升到最近的共同父元件，再用 props 往下傳。',
    'Context 解決 props drilling：createContext 建立、Provider 提供值、useContext 讀取。',
    'Context 值改變時所有使用它的元件都會重新渲染，不要什麼都放進 Context。',
    'useReducer 把更新邏輯集中到純函式 reducer，透過 dispatch({ type, ... }) 發出動作。',
    'Context 搭配 reducer 並包成 useXxx 自訂 Hook，是中小型應用常見的全域狀態寫法。',
    '自訂 Hook 以 use 開頭，每個元件得到獨立的 state；Hook 只能在最上層呼叫。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 55,
  title: '路由與串接 API',
  summary: '單頁應用程式的路由觀念、React Router 的基本用法（路由、連結、動態參數、巢狀路由、程式導頁）、串接 REST API 的完整流程、自訂 useFetch，以及環境變數與 CORS。',
  sections: [
    { id: 'spa', title: '單頁應用程式與路由', html: `
<p>React 應用通常是<b>單頁應用程式（SPA）</b>：只有一個 index.html，切換頁面時不向伺服器要新的 HTML，而是由 JavaScript 依照網址顯示不同的元件。負責「網址對應元件」的就是<b>路由（Router）</b>。</p>
<p>下面用 hash（網址 # 後面的部分）自己做一個極簡的路由，理解背後的原理：</p>
<pre class="jsx">import { useState, useEffect } from 'react';

function useHashPath() {
  const [path, setPath] = useState(location.hash.slice(1) || '/');
  useEffect(() =&gt; {
    const onChange = () =&gt; setPath(location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onChange);
    return () =&gt; window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

const PRODUCTS = { 1: '無線滑鼠', 2: '機械鍵盤' };

function Page({ path }) {
  if (path === '/') return &lt;h3&gt;首頁&lt;/h3&gt;;
  if (path === '/about') return &lt;h3&gt;關於我們&lt;/h3&gt;;
  const m = path.match(/^\\/products\\/(\\d+)$/);
  if (m) return &lt;h3&gt;商品 #{m[1]}：{PRODUCTS[m[1]] || '不存在'}&lt;/h3&gt;;
  return &lt;h3&gt;404 找不到頁面&lt;/h3&gt;;
}

export default function App() {
  const path = useHashPath();
  const links = [['/', '首頁'], ['/about', '關於'], ['/products/1', '商品 1'], ['/products/2', '商品 2'], ['/nope', '壞掉的連結']];
  return (
    &lt;div&gt;
      &lt;nav&gt;{links.map(([to, label]) =&gt; (
        &lt;a key={to} href={'#' + to} style={{ marginRight: 10, fontWeight: path === to ? 'bold' : 'normal' }}&gt;{label}&lt;/a&gt;
      ))}&lt;/nav&gt;
      &lt;Page path={path} /&gt;
      &lt;small&gt;目前路徑：{path}&lt;/small&gt;
    &lt;/div&gt;
  );
}</pre>
<p>實際專案使用 <b>React Router</b>，它使用一般的網址路徑（不需要 #），並提供連結、動態參數、巢狀版面、載入資料等完整功能。</p>` },
    { id: 'router', title: 'React Router 基本用法', html: `
<pre class="out">npm install react-router-dom</pre>
<pre class="out">// main.jsx
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  &lt;BrowserRouter&gt;&lt;App /&gt;&lt;/BrowserRouter&gt;
);

// App.jsx
import { Routes, Route, Link, NavLink, Outlet, useParams, useNavigate } from 'react-router-dom';

function Layout() {                         // 共用版面：導覽列 + 子頁面的位置
  return (
    &lt;&gt;
      &lt;nav&gt;
        &lt;NavLink to="/"&gt;首頁&lt;/NavLink&gt;
        &lt;NavLink to="/products"&gt;商品&lt;/NavLink&gt;
      &lt;/nav&gt;
      &lt;Outlet /&gt;                            {/* 子路由的元件顯示在這裡 */}
    &lt;/&gt;
  );
}

function ProductDetail() {
  const { id } = useParams();              // 取得網址中的 :id
  const navigate = useNavigate();
  return (
    &lt;div&gt;
      &lt;h2&gt;商品 {id}&lt;/h2&gt;
      &lt;button onClick={() =&gt; navigate('/products')}&gt;回列表&lt;/button&gt;
    &lt;/div&gt;
  );
}

export default function App() {
  return (
    &lt;Routes&gt;
      &lt;Route path="/" element={&lt;Layout /&gt;}&gt;
        &lt;Route index element={&lt;Home /&gt;} /&gt;
        &lt;Route path="products" element={&lt;ProductList /&gt;} /&gt;
        &lt;Route path="products/:id" element={&lt;ProductDetail /&gt;} /&gt;
        &lt;Route path="*" element={&lt;NotFound /&gt;} /&gt;
      &lt;/Route&gt;
    &lt;/Routes&gt;
  );
}</pre>
<table>
<tr><th>API</th><th>用途</th></tr>
<tr><td><code>&lt;Link to="/a"&gt;</code></td><td>站內連結，不重新載入頁面（不要用 &lt;a href&gt;，會整頁重新載入、state 全部消失）</td></tr>
<tr><td><code>&lt;NavLink&gt;</code></td><td>同 Link，目前所在頁面會自動加上 active 樣式</td></tr>
<tr><td><code>path="products/:id"</code> + <code>useParams()</code></td><td>動態路由與讀取參數</td></tr>
<tr><td><code>&lt;Outlet /&gt;</code></td><td>巢狀路由中，子頁面顯示的位置</td></tr>
<tr><td><code>useNavigate()</code></td><td>用程式導頁，例如登入成功後跳轉</td></tr>
<tr><td><code>useSearchParams()</code></td><td>讀寫查詢字串，例如 ?page=2&amp;q=react</td></tr>
<tr><td><code>path="*"</code></td><td>都不符合時顯示 404 頁面</td></tr>
</table>
<div class="box warn"><b class="t">部署時的重新整理 404</b>在 <code>/products/1</code> 按重新整理，瀏覽器會向伺服器要這個路徑，但伺服器上只有 index.html，就會出現 404。部署時要設定「所有路徑都回傳 index.html」（Netlify 的 _redirects、Vercel 的 rewrites、Nginx 的 try_files）。</div>` },
    { id: 'api', title: '串接 REST API', html: `
<p>前端透過 HTTP 請求和後端溝通。用瀏覽器內建的 <code>fetch</code>：</p>
<pre class="out">// 讀取（GET）
const res = await fetch('https://api.example.com/todos');
if (!res.ok) throw new Error('HTTP ' + res.status);   // fetch 遇到 404、500 不會自動拋錯
const todos = await res.json();

// 新增（POST）
const res = await fetch('https://api.example.com/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: '學 React', done: false })
});

// 修改（PATCH／PUT）、刪除（DELETE）寫法類似，改 method 即可</pre>
<p>把抓資料的流程包成自訂 Hook，元件就只需要處理三種狀態。下面用模擬的 API 示範搜尋功能：</p>
<pre class="jsx">import { useState, useEffect } from 'react';

const BOOKS = ['React 實戰', 'React 設計模式', 'JavaScript 大全', 'TypeScript 入門', 'Next.js 全端開發', 'CSS 排版技巧'];
function fakeApi(q) {                    // 模擬伺服器：延遲 600 毫秒後回傳搜尋結果
  return new Promise(r =&gt; setTimeout(() =&gt; r(BOOKS.filter(b =&gt; b.toLowerCase().includes(q.toLowerCase()))), 600));
}

function useFetch(fetcher, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() =&gt; {
    let ignore = false;
    setState(s =&gt; ({ ...s, loading: true, error: null }));
    fetcher()
      .then(data =&gt; { if (!ignore) setState({ data, loading: false, error: null }); })
      .catch(error =&gt; { if (!ignore) setState({ data: null, loading: false, error }); });
    return () =&gt; { ignore = true; };
  }, deps);
  return state;
}

export default function App() {
  const [q, setQ] = useState('react');
  const { data, loading, error } = useFetch(() =&gt; fakeApi(q), [q]);
  return (
    &lt;div&gt;
      &lt;input value={q} onChange={e =&gt; setQ(e.target.value)} placeholder="搜尋書名" /&gt;
      {loading &amp;&amp; &lt;span&gt; ⏳ 搜尋中…&lt;/span&gt;}
      {error &amp;&amp; &lt;p&gt;發生錯誤：{error.message}&lt;/p&gt;}
      {data &amp;&amp; data.length === 0 &amp;&amp; &lt;p&gt;找不到「{q}」相關的書。&lt;/p&gt;}
      {data &amp;&amp; &lt;ul style={{ opacity: loading ? 0.5 : 1 }}&gt;{data.map(b =&gt; &lt;li key={b}&gt;{b}&lt;/li&gt;)}&lt;/ul&gt;}
    &lt;/div&gt;
  );
}</pre>
<div class="box tip"><b class="t">實務上的選擇</b>手寫 useFetch 能幫助理解原理，但正式專案通常使用 <b>TanStack Query</b>（React Query）或 SWR，它們內建快取、自動重新抓取、重試、分頁等功能，寫法是 <code>const { data, isLoading } = useQuery({ queryKey: ['todos'], queryFn: getTodos })</code>。搜尋框也常搭配「防抖動（debounce）」，停止輸入一段時間後才送出請求。</div>` },
    { id: 'env', title: '環境變數與 CORS', html: `
<p>API 網址在開發與正式環境通常不同，放在 Vite 的環境變數檔中，變數名稱必須以 <code>VITE_</code> 開頭：</p>
<pre class="out"># .env.development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_API_URL=https://api.myapp.com

// 程式中讀取
const res = await fetch(import.meta.env.VITE_API_URL + '/todos');</pre>
<div class="box warn"><b class="t">前端沒有祕密</b>前端程式碼（包含環境變數）最後都會打包送到使用者的瀏覽器，任何人都看得到。API 金鑰、資料庫密碼絕對不能放在前端，要放在後端，由後端代為呼叫第三方服務。</div>
<p><b>CORS</b>：瀏覽器基於安全，預設禁止網頁向「不同來源」（網域、協定、連接埠任一不同）的伺服器讀取回應。如果在 console 看到 CORS 錯誤，表示<b>後端</b>需要回應 <code>Access-Control-Allow-Origin</code> 標頭允許你的網域；開發時也可以設定 Vite 的 <code>server.proxy</code>，讓請求經過開發伺服器轉送。</p>
<pre class="out">// vite.config.js：開發時把 /api 開頭的請求轉送到後端
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3000' } }
});</pre>` }
  ],
  keypoints: [
    'SPA 只有一個 HTML，由路由依照網址顯示不同元件；切換頁面不重新載入。',
    'React Router：Routes／Route 對應路徑、Link 站內連結、useParams 讀取 :id、Outlet 放子頁面、useNavigate 程式導頁。',
    '站內連結用 Link 而不是 a，部署時要設定所有路徑都回傳 index.html。',
    'fetch 遇到 404、500 不會拋錯，要檢查 res.ok；POST 要設定 headers 與 JSON.stringify 的 body。',
    '抓資料要處理載入中、錯誤、空資料；正式專案常用 TanStack Query 或 SWR。',
    'Vite 環境變數以 VITE_ 開頭並用 import.meta.env 讀取；前端沒有祕密，CORS 要由後端允許。'
  ]
},
{
  id: 'c11', subject: 2, minutes: 60,
  title: '專案實戰與部署',
  summary: '完成一個待辦清單專案（新增、編輯、勾選、刪除、篩選與 localStorage 儲存）、專案資料夾結構、打包與部署到 Vercel、Netlify、GitHub Pages，以及 TypeScript、測試、Next.js 與面試常見問題。',
  sections: [
    { id: 'todo', title: '實戰：待辦清單', html: `
<p>把前面學到的觀念整合起來：useState、列表與 key、表單、不可變更新、衍生資料、自訂 Hook 與 useEffect。</p>
<pre class="jsx">import { useState, useEffect, useRef } from 'react';

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() =&gt; {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; } catch { return initial; }
  });
  useEffect(() =&gt; { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
}

const FILTERS = { all: ['全部', () =&gt; true], active: ['未完成', t =&gt; !t.done], done: ['已完成', t =&gt; t.done] };

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef(null);
  useEffect(() =&gt; { if (editing) inputRef.current.focus(); }, [editing]);

  function save() {
    const t = draft.trim();
    if (t) onEdit(todo.id, t); else setDraft(todo.title);
    setEditing(false);
  }

  return (
    &lt;li style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', borderBottom: '1px solid #eee' }}&gt;
      &lt;input type="checkbox" checked={todo.done} onChange={() =&gt; onToggle(todo.id)} /&gt;
      {editing
        ? &lt;input ref={inputRef} value={draft} onChange={e =&gt; setDraft(e.target.value)} onBlur={save}
            onKeyDown={e =&gt; { if (e.key === 'Enter') save(); if (e.key === 'Escape') { setDraft(todo.title); setEditing(false); } }} /&gt;
        : &lt;span onDoubleClick={() =&gt; setEditing(true)} style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#999' : 'inherit' }}&gt;{todo.title}&lt;/span&gt;}
      &lt;button onClick={() =&gt; onDelete(todo.id)} aria-label="刪除"&gt;✕&lt;/button&gt;
    &lt;/li&gt;
  );
}

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', [
    { id: 1, title: '完成 React 課程', done: false },
    { id: 2, title: '雙擊文字可以編輯', done: false },
    { id: 3, title: '建立 Vite 專案', done: true }
  ]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  function add(e) {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTodos([...todos, { id: Date.now(), title, done: false }]);
    setText('');
  }
  const toggle = id =&gt; setTodos(todos.map(t =&gt; t.id === id ? { ...t, done: !t.done } : t));
  const remove = id =&gt; setTodos(todos.filter(t =&gt; t.id !== id));
  const edit = (id, title) =&gt; setTodos(todos.map(t =&gt; t.id === id ? { ...t, title } : t));

  const shown = todos.filter(FILTERS[filter][1]);
  const left = todos.filter(t =&gt; !t.done).length;

  return (
    &lt;div style={{ maxWidth: 420 }}&gt;
      &lt;h2 style={{ margin: '0 0 8px' }}&gt;📝 待辦清單&lt;/h2&gt;
      &lt;form onSubmit={add} style={{ display: 'flex' }}&gt;
        &lt;input value={text} onChange={e =&gt; setText(e.target.value)} placeholder="要做什麼？" style={{ flex: 1 }} /&gt;
        &lt;button disabled={!text.trim()}&gt;新增&lt;/button&gt;
      &lt;/form&gt;
      &lt;div style={{ margin: '6px 0' }}&gt;
        {Object.entries(FILTERS).map(([k, [label]]) =&gt; (
          &lt;button key={k} onClick={() =&gt; setFilter(k)} style={{ fontWeight: filter === k ? 'bold' : 'normal' }}&gt;{label}&lt;/button&gt;
        ))}
      &lt;/div&gt;
      {shown.length === 0
        ? &lt;p style={{ color: '#888' }}&gt;{filter === 'done' ? '還沒有完成的事項。' : '沒有待辦事項，休息一下吧！'}&lt;/p&gt;
        : &lt;ul style={{ listStyle: 'none', padding: 0, margin: 0 }}&gt;
            {shown.map(t =&gt; &lt;TodoItem key={t.id} todo={t} onToggle={toggle} onDelete={remove} onEdit={edit} /&gt;)}
          &lt;/ul&gt;}
      &lt;p style={{ fontSize: 14, color: '#666' }}&gt;
        剩下 {left} 件未完成
        {todos.some(t =&gt; t.done) &amp;&amp; &lt;button onClick={() =&gt; setTodos(todos.filter(t =&gt; !t.done))}&gt;清除已完成&lt;/button&gt;}
      &lt;/p&gt;
    &lt;/div&gt;
  );
}</pre>
<p>可以繼續擴充的功能：拖曳排序、到期日、分類標籤、串接後端 API 讓資料跨裝置同步。把它放上 GitHub，就是你的第一個作品。</p>` },
    { id: 'structure', title: '專案資料夾結構', html: `
<p>React 沒有規定資料夾結構，下面是中小型專案常見的組織方式：</p>
<pre class="out">src/
├── main.jsx
├── App.jsx              # 路由設定
├── components/          # 共用的 UI 元件：Button、Modal、Card
├── pages/               # 每個路由對應一個頁面元件：HomePage、ProductPage
├── features/            # 依功能分組（大型專案）：cart/、auth/，各自包含元件、hooks、api
├── hooks/               # 自訂 Hook：useLocalStorage、useFetch
├── context/             # Context 與 Provider：AuthContext
├── api/                 # 呼叫後端的函式：getProducts、createOrder
├── utils/               # 純函式工具：formatMoney、validateEmail
└── assets/              # 圖片、字型</pre>
<div class="box tip"><b class="t">寫出好維護的元件</b>一個元件只做一件事；畫面邏輯與資料邏輯分開（資料抓取放自訂 Hook 或 api/）；props 名稱清楚（onXxx 代表事件、isXxx／hasXxx 代表布林）；不要過早抽象，同樣的程式出現第三次再抽成共用元件。</div>` },
    { id: 'deploy', title: '打包與部署', html: `
<pre class="out">npm run build      # 打包成最佳化的靜態檔案，輸出到 dist/
npm run preview    # 在本機預覽打包後的結果</pre>
<p>打包後的 <code>dist/</code> 是純靜態檔案（HTML、JS、CSS），可以放到任何靜態網站主機：</p>
<table>
<tr><th>平台</th><th>做法</th><th>特色</th></tr>
<tr><td>Vercel</td><td>連結 GitHub 儲存庫，自動偵測 Vite，每次 push 自動部署</td><td>免費額度充足，每個 PR 都有預覽網址</td></tr>
<tr><td>Netlify</td><td>同上；或直接把 dist 資料夾拖曳上傳</td><td>表單、轉址設定簡單</td></tr>
<tr><td>GitHub Pages</td><td>用 GitHub Actions 打包並發布</td><td>網址為 帳號.github.io/專案名稱，要在 vite.config.js 設定 <code>base: '/專案名稱/'</code></td></tr>
<tr><td>自己的伺服器</td><td>把 dist 放到 Nginx，設定 <code>try_files $uri /index.html</code></td><td>完全掌控，適合公司內部系統</td></tr>
</table>
<p>搭配「Git 版本控制」與「DevOps 入門」課程，可以做到 push 程式碼後自動測試、打包、部署。</p>` },
    { id: 'next', title: '下一步：TypeScript、測試與 Next.js', html: `
<p><b>TypeScript</b>：為 JavaScript 加上型別，在編輯器中就能發現錯誤，現在大部分公司的 React 專案都使用 TypeScript。建立專案時選 <code>--template react-ts</code>：</p>
<pre class="out">type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary';     // ? 表示可省略
  onClick: () =&gt; void;
};

function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  return &lt;button className={variant} onClick={onClick}&gt;{label}&lt;/button&gt;;
}

const [todos, setTodos] = useState&lt;Todo[]&gt;([]);   // 指定 state 的型別</pre>
<p><b>測試</b>：常用 Vitest 搭配 React Testing Library，從使用者的角度測試元件：</p>
<pre class="out">import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('點擊按鈕後數字加 1', async () =&gt; {
  render(&lt;Counter /&gt;);
  await userEvent.click(screen.getByRole('button', { name: /點了 0 次/ }));
  expect(screen.getByText('點了 1 次')).toBeInTheDocument();
});</pre>
<p><b>Next.js</b>：以 React 為基礎的全端框架，提供檔案式路由、伺服器端渲染（SSR）、靜態生成（SSG）、Server Components 與 API 路由，SEO 較好，是 React 官方推薦的建立新專案方式之一。學會本課程的 React 基礎後就可以進入 Next.js。</p>
<div class="box memo"><b class="t">React 19 的新功能</b>React 19 新增了 Actions 與 <code>useActionState</code>、<code>useOptimistic</code> 等處理表單送出的 Hook、可以讀取 Promise 與 Context 的 <code>use</code>，以及可以直接把 ref 當成一般 prop 傳遞。React Compiler 則能在建置時自動加上記憶化。本課程的觀念在 React 19 中完全適用。</div>` },
    { id: 'interview', title: '面試常見問題', html: `
<table>
<tr><th>問題</th><th>回答重點</th></tr>
<tr><td>虛擬 DOM 是什麼？</td><td>以 JavaScript 物件描述畫面；state 改變時產生新的樹，和舊的比較（reconciliation），只更新改變的部分到真實 DOM</td></tr>
<tr><td>state 和 props 的差別？</td><td>props 由父元件傳入、唯讀；state 由元件自己管理、可透過 set 函式改變，改變會重新渲染</td></tr>
<tr><td>為什麼列表需要 key？</td><td>讓 React 辨識每個項目，在新增、刪除、排序時正確對應元件與 state；不要用 index</td></tr>
<tr><td>為什麼 setState 後馬上讀取還是舊值？</td><td>state 是快照，set 只是安排下一次渲染；連續更新用更新函式</td></tr>
<tr><td>useEffect 依賴陣列的作用？</td><td>決定 effect 何時重新執行；清除函式用來取消計時器與訂閱</td></tr>
<tr><td>useMemo 與 useCallback 的差別？</td><td>useMemo 快取值、useCallback 快取函式；常搭配 memo 避免子元件不必要的渲染</td></tr>
<tr><td>受控與非受控元件？</td><td>受控：值由 state 管理；非受控：值留在 DOM，用 ref 或 FormData 讀取</td></tr>
<tr><td>如何避免 props drilling？</td><td>元件組合（children）、Context、狀態管理套件</td></tr>
<tr><td>Hook 的規則？為什麼？</td><td>只在最上層呼叫；React 依賴呼叫順序對應每個 Hook 的狀態</td></tr>
<tr><td>CSR 與 SSR 的差別？</td><td>CSR 在瀏覽器執行 JavaScript 產生畫面；SSR 在伺服器先產生 HTML，首次載入與 SEO 較好（Next.js）</td></tr>
</table>` }
  ],
  keypoints: [
    '待辦清單整合了 state、列表與 key、受控表單、不可變更新、衍生資料與自訂 Hook。',
    '常見資料夾：components、pages、hooks、context、api、utils；大型專案可依功能分組。',
    'npm run build 產生 dist/ 靜態檔案，可部署到 Vercel、Netlify、GitHub Pages 或 Nginx。',
    'GitHub Pages 要設定 Vite 的 base；SPA 部署要讓所有路徑回傳 index.html。',
    '下一步學 TypeScript（型別）、Vitest + React Testing Library（測試）、Next.js（SSR 與全端）。',
    '面試重點：虛擬 DOM、state 與 props、key、state 快照、effect 依賴、memo 系列、Hook 規則。'
  ]
}
);
