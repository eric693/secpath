/* 演算法 進階演算法篇：貪心、動態規劃與圖論
   <pre class="cpp"> 為可在網頁上編譯執行的範例；<pre class="out"> 為一般程式碼或示意圖
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 45,
  title: '貪心演算法',
  summary: '貪心法的概念與適用條件、活動選擇問題、找零錢與反例、區間覆蓋與合併區間、霍夫曼編碼的觀念，以及用交換論證證明貪心的正確性。',
  sections: [
    { id: 'idea', title: '貪心的概念', html: `
<p><b>貪心演算法（Greedy）</b>每一步都選擇「當下看起來最好」的選項，不回頭修改。優點是簡單又快，缺點是<b>不一定得到最佳解</b>，必須證明它在這個問題上是對的。</p>
<p>貪心法正確需要兩個性質：</p>
<ul>
<li><b>貪心選擇性質</b>：做出當下最好的選擇後，一定存在包含這個選擇的最佳解。</li>
<li><b>最佳子結構</b>：做出選擇後，剩下的子問題的最佳解，加上這個選擇，就是原問題的最佳解。</li>
</ul>` },
    { id: 'activity', title: '活動選擇問題', html: `
<p>有多個活動，每個有開始與結束時間，同一時間只能參加一個，最多能參加幾個？</p>
<p>直覺的選法有很多：選最短的？選最早開始的？正確答案是：<b>每次選結束時間最早、而且和已選活動不衝突的</b>。</p>
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;pair&lt;int, int&gt;&gt; acts = {{1, 4}, {3, 5}, {0, 6}, {5, 7}, {3, 9}, {5, 9}, {6, 10}, {8, 11}, {8, 12}, {2, 14}, {12, 16}};
    sort(acts.begin(), acts.end(), [](auto &amp;a, auto &amp;b) { return a.second &lt; b.second; });   // 依結束時間排序
    int count = 0, last_end = -1;
    for (auto [s, e] : acts) {
        if (s &gt;= last_end) {                 // 不衝突就選
            cout &lt;&lt; "[" &lt;&lt; s &lt;&lt; "," &lt;&lt; e &lt;&lt; ") ";
            count++;
            last_end = e;
        }
    }
    cout &lt;&lt; "\\n共 " &lt;&lt; count &lt;&lt; " 個活動\\n";
}</pre>
<div class="box memo"><b class="t">交換論證</b>假設某個最佳解的第一個活動不是「結束最早」的那個。把它換成結束最早的活動，不會和後面的活動衝突（因為結束得更早），活動數量不變，仍然是最佳解。所以選結束最早的活動是安全的，再對剩下的活動重複同樣的論證。</div>` },
    { id: 'coin', title: '找零錢：貪心何時會錯', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int greedy_coins(const vector&lt;int&gt; &amp;coins, int amount)    // coins 由大到小
{
    int count = 0;
    for (int c : coins) { count += amount / c; amount %= c; }
    return amount == 0 ? count : -1;
}

int main()
{
    cout &lt;&lt; "台幣 {50,10,5,1} 找 68 元：" &lt;&lt; greedy_coins({50, 10, 5, 1}, 68) &lt;&lt; " 枚\\n";
    cout &lt;&lt; "{4,3,1} 找 6 元（貪心）：" &lt;&lt; greedy_coins({4, 3, 1}, 6) &lt;&lt; " 枚\\n";
    cout &lt;&lt; "{4,3,1} 找 6 元的最佳解：3 + 3 = 2 枚\\n";
}</pre>
<p>台幣、美元這類幣值設計，貪心「先找大的」剛好是最佳解。但幣值為 {4, 3, 1} 找 6 元時，貪心會找 4 + 1 + 1（3 枚），最佳解是 3 + 3（2 枚）。<b>任意幣值的找零要用動態規劃</b>（第 8 章）。</p>
<div class="box exam"><b class="t">面試技巧</b>想到貪心策略時，先試著找反例。找不到反例，再嘗試用交換論證證明；很難證明時，考慮改用動態規劃。</div>` },
    { id: 'interval', title: '區間問題與霍夫曼編碼', html: `
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;pair&lt;int, int&gt;&gt; v = {{1, 3}, {8, 10}, {2, 6}, {15, 18}, {9, 12}};   // 合併重疊的區間
    sort(v.begin(), v.end());                       // 依起點排序
    vector&lt;pair&lt;int, int&gt;&gt; merged;
    for (auto [s, e] : v) {
        if (!merged.empty() &amp;&amp; s &lt;= merged.back().second)
            merged.back().second = max(merged.back().second, e);   // 重疊：延伸結尾
        else
            merged.push_back({s, e});
    }
    for (auto [s, e] : merged) cout &lt;&lt; "[" &lt;&lt; s &lt;&lt; "," &lt;&lt; e &lt;&lt; "] ";
    cout &lt;&lt; "\\n";
}</pre>
<h3>霍夫曼編碼（Huffman Coding）</h3>
<p>壓縮資料時，出現次數越多的字元用越短的編碼。霍夫曼演算法每次從優先佇列取出<b>頻率最小的兩個</b>節點合併成新節點，重複到只剩一個，得到最佳的前綴編碼。ZIP、JPEG、MP3 等壓縮格式都用到它。</p>
<pre class="out">頻率：A:45  B:13  C:12  D:16  E:9  F:5
合併 F(5)+E(9)=14 → C(12)+B(13)=25 → 14+D(16)=30 → 25+30=55 → A(45)+55=100
結果：A 的編碼長度 1，B、C、D 長度 3，E、F 長度 4</pre>
<table>
<tr><th>經典貪心題</th><th>貪心策略</th></tr>
<tr><td>活動選擇、最多不重疊區間</td><td>結束時間最早的優先</td></tr>
<tr><td>合併區間</td><td>依起點排序後逐一合併</td></tr>
<tr><td>霍夫曼編碼</td><td>頻率最小的兩個先合併</td></tr>
<tr><td>最小生成樹（Kruskal、Prim）</td><td>權重最小的邊優先（第 10 章）</td></tr>
<tr><td>Dijkstra 最短路徑</td><td>距離最小的頂點優先（第 10 章）</td></tr>
</table>` }
  ],
  keypoints: [
    '貪心演算法每一步選當下最好的選項，不回頭；需要貪心選擇性質與最佳子結構才正確。',
    '活動選擇：依結束時間排序，每次選結束最早且不衝突的活動。',
    '用交換論證證明貪心正確：把最佳解的選擇換成貪心的選擇，結果不會變差。',
    '找零錢：台幣面額可貪心，任意面額（如 {4,3,1}）會出錯，應改用動態規劃。',
    '合併區間：依起點排序，重疊就延伸結尾。',
    '霍夫曼編碼每次合併頻率最小的兩個節點，得到最佳前綴編碼。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 55,
  title: '動態規劃（一）：基礎與背包問題',
  summary: '動態規劃的兩個條件、記憶化搜尋與由下而上的填表、DP 四步驟、爬樓梯、最大子陣列和（Kadane）、最少硬幣找零、0/1 背包與空間最佳化。',
  sections: [
    { id: 'idea', title: '什麼是動態規劃', html: `
<p><b>動態規劃（Dynamic Programming，DP）</b>把問題拆成子問題，並<b>記錄每個子問題的答案</b>，避免重複計算。適用 DP 的問題有兩個特徵：</p>
<ul>
<li><b>最佳子結構</b>：問題的最佳解可以由子問題的最佳解組成。</li>
<li><b>重疊子問題</b>：同樣的子問題會被重複計算很多次。</li>
</ul>
<p>單純遞迴的費氏數列 fib(40) 要呼叫上億次，因為 fib(38)、fib(37)… 被重複計算。把算過的存起來，只需要 40 次：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

long long calls = 0;
long long fib_naive(int n) { calls++; return n &lt; 2 ? n : fib_naive(n - 1) + fib_naive(n - 2); }

vector&lt;long long&gt; memo(100, -1);
long long fib_memo(int n)                      // 由上而下：記憶化搜尋
{
    if (n &lt; 2) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib_memo(n - 1) + fib_memo(n - 2);
}

long long fib_table(int n)                     // 由下而上：填表
{
    vector&lt;long long&gt; dp(n + 1);
    dp[0] = 0; if (n &gt; 0) dp[1] = 1;
    for (int i = 2; i &lt;= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}

int main()
{
    cout &lt;&lt; fib_naive(30) &lt;&lt; "（單純遞迴呼叫 " &lt;&lt; calls &lt;&lt; " 次）\\n";
    cout &lt;&lt; fib_memo(90) &lt;&lt; " " &lt;&lt; fib_table(90) &lt;&lt; "\\n";
}</pre>` },
    { id: 'steps', title: 'DP 四步驟與爬樓梯', html: `
<ol>
<li><b>定義狀態</b>：dp[i] 代表什麼？（最重要的一步）</li>
<li><b>轉移方程</b>：dp[i] 如何由較小的狀態算出來？</li>
<li><b>初始值</b>：最小的狀態是多少？</li>
<li><b>計算順序</b>：確保計算 dp[i] 時，需要的狀態都已經算好。</li>
</ol>
<p>例題：爬 n 階樓梯，每次可以爬 1 或 2 階，有幾種爬法？</p>
<ul>
<li>狀態：dp[i] = 爬到第 i 階的方法數。</li>
<li>轉移：最後一步是從 i-1 爬 1 階，或從 i-2 爬 2 階，所以 dp[i] = dp[i-1] + dp[i-2]。</li>
<li>初始：dp[0] = 1（站在地面也算一種）、dp[1] = 1。</li>
</ul>
<pre class="cpp">#include &lt;climits&gt;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    int n = 10;
    vector&lt;long long&gt; dp(n + 1);
    dp[0] = dp[1] = 1;
    for (int i = 2; i &lt;= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    cout &lt;&lt; "爬 " &lt;&lt; n &lt;&lt; " 階有 " &lt;&lt; dp[n] &lt;&lt; " 種方法\\n";

    vector&lt;int&gt; a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};   // Kadane：最大子陣列和 O(n)
    int cur = 0, best = INT_MIN;
    for (int x : a) {
        cur = max(x, cur + x);          // dp[i] = 以 a[i] 結尾的最大和：接在前面或重新開始
        best = max(best, cur);
    }
    cout &lt;&lt; "最大子陣列和 " &lt;&lt; best &lt;&lt; "\\n";
}</pre>
<p>Kadane 演算法的狀態是「以 a[i] <b>結尾</b>的最大子陣列和」，只需要前一個狀態，所以空間 O(1)。第 2 章的分治法是 O(n log n)，DP 做到 O(n)。</p>` },
    { id: 'coin', title: '最少硬幣找零', html: `
<p>第 7 章提到貪心法在任意面額會出錯。用 DP：dp[x] = 湊出金額 x 最少需要的硬幣數，<b>dp[x] = min(dp[x - c] + 1)</b>，對每種面額 c 取最小值。</p>
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; coins = {1, 3, 4};
    int amount = 6;
    const int INF = 1e9;
    vector&lt;int&gt; dp(amount + 1, INF);
    dp[0] = 0;                                     // 湊出 0 元需要 0 枚
    for (int x = 1; x &lt;= amount; x++)
        for (int c : coins)
            if (c &lt;= x &amp;&amp; dp[x - c] != INF) dp[x] = min(dp[x], dp[x - c] + 1);
    for (int x = 0; x &lt;= amount; x++) cout &lt;&lt; "dp[" &lt;&lt; x &lt;&lt; "]=" &lt;&lt; dp[x] &lt;&lt; " ";
    cout &lt;&lt; "\\n最少 " &lt;&lt; dp[amount] &lt;&lt; " 枚\\n";
}</pre>
<p>時間 O(金額 × 面額數)。同樣的結構可以算「湊出金額的方法數」（把 min 改成加總）。</p>` },
    { id: 'knapsack', title: '0/1 背包問題', html: `
<p>有 n 個物品，各有重量 w 與價值 v，背包容量 W，每個物品只能選或不選，求最大價值。</p>
<ul>
<li>狀態：dp[i][j] = 只考慮前 i 個物品、容量為 j 時的最大價值。</li>
<li>轉移：不選第 i 個 → dp[i-1][j]；選第 i 個（j ≥ w）→ dp[i-1][j-w] + v。取較大者。</li>
</ul>
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; w = {1, 3, 4, 5}, v = {15, 20, 30, 55};
    int n = w.size(), W = 8;
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(W + 1, 0));
    for (int i = 1; i &lt;= n; i++)
        for (int j = 0; j &lt;= W; j++) {
            dp[i][j] = dp[i - 1][j];                                         // 不選
            if (j &gt;= w[i - 1]) dp[i][j] = max(dp[i][j], dp[i - 1][j - w[i - 1]] + v[i - 1]);   // 選
        }
    cout &lt;&lt; "最大價值 " &lt;&lt; dp[n][W] &lt;&lt; "\\n";

    vector&lt;int&gt; f(W + 1, 0);                        // 空間最佳化：一維陣列，容量要由大到小
    for (int i = 0; i &lt; n; i++)
        for (int j = W; j &gt;= w[i]; j--) f[j] = max(f[j], f[j - w[i]] + v[i]);
    cout &lt;&lt; "一維版本 " &lt;&lt; f[W] &lt;&lt; "\\n";
}</pre>
<p>時間 O(n × W)。一維版本中，容量必須<b>由大到小</b>更新，才能確保每個物品只被選一次；若由小到大更新，就變成每個物品可以選無限次的「完全背包」。互動練習中的「DP 表格」可以看見背包表格逐格填寫的過程。</p>
<div class="box exam"><b class="t">背包問題是 DP 的基本題型</b>很多題目可以轉換成背包：把陣列分成總和相等的兩半（容量為總和一半的可行性背包）、目標和、湊零錢。面試與 APCS 很常出現。</div>` }
  ],
  keypoints: [
    'DP 適用於具有最佳子結構與重疊子問題的問題，記錄子問題答案避免重複計算。',
    '記憶化搜尋為由上而下，填表為由下而上，兩者複雜度相同。',
    'DP 四步驟：定義狀態、轉移方程、初始值、計算順序；定義狀態最重要。',
    '爬樓梯 dp[i] = dp[i-1] + dp[i-2]；Kadane 以「以 a[i] 結尾」為狀態，O(n) 求最大子陣列和。',
    '最少硬幣 dp[x] = min(dp[x-c] + 1)，可處理貪心會出錯的面額。',
    '0/1 背包 dp[i][j] = max(不選, 選)，O(nW)；一維版本容量要由大到小更新。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 50,
  title: '動態規劃（二）：序列與網格',
  summary: '網格路徑計數、最長共同子序列 LCS、編輯距離、最長遞增子序列 LIS 的 O(n²) 與 O(n log n) 解法、區間 DP 的觀念，以及如何辨識 DP 題目。',
  sections: [
    { id: 'grid', title: '網格路徑', html: `
<p>在 m × n 的網格中，從左上走到右下，每次只能往右或往下，有幾條路徑？有障礙物時呢？</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;string&gt; g = {
        "....",
        ".#..",
        "...#",
        "...."
    };
    int m = g.size(), n = g[0].size();
    vector&lt;vector&lt;long long&gt;&gt; dp(m, vector&lt;long long&gt;(n, 0));
    for (int i = 0; i &lt; m; i++)
        for (int j = 0; j &lt; n; j++) {
            if (g[i][j] == '#') continue;                // 障礙物：0 種走法
            if (i == 0 &amp;&amp; j == 0) { dp[i][j] = 1; continue; }
            if (i &gt; 0) dp[i][j] += dp[i - 1][j];          // 從上面來
            if (j &gt; 0) dp[i][j] += dp[i][j - 1];          // 從左邊來
        }
    cout &lt;&lt; "路徑數 " &lt;&lt; dp[m - 1][n - 1] &lt;&lt; "\\n";
}</pre>
<p>dp[i][j] = dp[i-1][j] + dp[i][j-1]。把加總改成取最小值並加上格子的花費，就是「最小路徑和」。</p>` },
    { id: 'lcs', title: '最長共同子序列（LCS）', html: `
<p><b>子序列</b>是從原序列中刪除一些元素（不改變順序）得到的序列，不必連續。LCS 用於 git diff、DNA 比對、抄襲偵測。</p>
<ul>
<li>狀態：dp[i][j] = A 的前 i 個字元與 B 的前 j 個字元的 LCS 長度。</li>
<li>轉移：A[i-1] == B[j-1] 時 dp[i][j] = dp[i-1][j-1] + 1；否則 dp[i][j] = max(dp[i-1][j], dp[i][j-1])。</li>
</ul>
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    string a = "ABCBDAB", b = "BDCABA";
    int n = a.size(), m = b.size();
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(m + 1, 0));
    for (int i = 1; i &lt;= n; i++)
        for (int j = 1; j &lt;= m; j++)
            dp[i][j] = (a[i - 1] == b[j - 1]) ? dp[i - 1][j - 1] + 1 : max(dp[i - 1][j], dp[i][j - 1]);
    string lcs;                                          // 從表格右下角回推出一組 LCS
    for (int i = n, j = m; i &gt; 0 &amp;&amp; j &gt; 0;) {
        if (a[i - 1] == b[j - 1]) { lcs += a[i - 1]; i--; j--; }
        else if (dp[i - 1][j] &gt;= dp[i][j - 1]) i--;
        else j--;
    }
    reverse(lcs.begin(), lcs.end());
    cout &lt;&lt; "LCS 長度 " &lt;&lt; dp[n][m] &lt;&lt; "，其中一組：" &lt;&lt; lcs &lt;&lt; "\\n";
}</pre>
<p>時間與空間都是 O(nm)。互動練習中的「DP 表格」也可以切換成 LCS，觀察表格如何填寫。</p>` },
    { id: 'edit', title: '編輯距離', html: `
<p>把字串 A 變成 B，最少需要幾次操作（插入、刪除、替換一個字元）？用於拼字建議、DNA 分析。</p>
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    string a = "kitten", b = "sitting";
    int n = a.size(), m = b.size();
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(m + 1));
    for (int i = 0; i &lt;= n; i++) dp[i][0] = i;           // 刪除 i 個字元
    for (int j = 0; j &lt;= m; j++) dp[0][j] = j;           // 插入 j 個字元
    for (int i = 1; i &lt;= n; i++)
        for (int j = 1; j &lt;= m; j++) {
            if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1];        // 相同不用操作
            else dp[i][j] = 1 + min({dp[i - 1][j],                          // 刪除
                                      dp[i][j - 1],                          // 插入
                                      dp[i - 1][j - 1]});                    // 替換
        }
    cout &lt;&lt; "編輯距離 " &lt;&lt; dp[n][m] &lt;&lt; "\\n";
}</pre>
<p>kitten → sitting：k 換成 s、e 換成 i、結尾插入 g，共 3 次。</p>` },
    { id: 'lis', title: '最長遞增子序列（LIS）', html: `
<p>找出最長的嚴格遞增子序列長度。O(n²) 的 DP：dp[i] = 以 a[i] 結尾的 LIS 長度 = max(dp[j] + 1)，其中 j &lt; i 且 a[j] &lt; a[i]。</p>
<p>更快的 O(n log n) 做法：維護陣列 tails，tails[k] 為「長度 k+1 的遞增子序列中，最小可能的結尾」。每個新元素用 lower_bound 找到該替換的位置：</p>
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; a = {10, 9, 2, 5, 3, 7, 101, 18};
    int n = a.size();
    vector&lt;int&gt; dp(n, 1);                                // O(n²) 版本
    for (int i = 0; i &lt; n; i++)
        for (int j = 0; j &lt; i; j++)
            if (a[j] &lt; a[i]) dp[i] = max(dp[i], dp[j] + 1);
    cout &lt;&lt; "O(n²)：" &lt;&lt; *max_element(dp.begin(), dp.end()) &lt;&lt; "\\n";

    vector&lt;int&gt; tails;                                   // O(n log n) 版本
    for (int x : a) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);      // 比所有結尾都大：延長
        else *it = x;                                    // 替換成更小的結尾
    }
    cout &lt;&lt; "O(n log n)：" &lt;&lt; tails.size() &lt;&lt; "\\n";
}</pre>
<div class="box warn"><b class="t">tails 不是真正的 LIS</b>tails 的長度是正確答案，但內容不一定是一組實際存在的遞增子序列。需要輸出具體序列時，要另外記錄每個元素的前一個位置。</div>` },
    { id: 'recognize', title: '如何辨識 DP 題目', html: `
<table>
<tr><th>題目訊號</th><th>常見的狀態設計</th></tr>
<tr><td>「有幾種方法」「最少／最多是多少」「能不能做到」</td><td>DP 的典型問法</td></tr>
<tr><td>一維序列，答案和「以 i 結尾」有關</td><td>dp[i]：以 i 結尾的最佳值（Kadane、LIS）</td></tr>
<tr><td>兩個字串比對</td><td>dp[i][j]：A 前 i 個與 B 前 j 個（LCS、編輯距離）</td></tr>
<tr><td>選或不選、容量限制</td><td>dp[i][容量]（背包）</td></tr>
<tr><td>網格移動</td><td>dp[i][j]：走到 (i, j) 的方法數或最小花費</td></tr>
<tr><td>區間合併、括號、切割</td><td>dp[l][r]：區間 [l, r] 的最佳值（區間 DP，O(n³)）</td></tr>
<tr><td>n ≤ 20 的集合問題</td><td>dp[mask]：狀態壓縮 DP</td></tr>
</table>
<div class="box tip"><b class="t">DP 卡住時的方法</b>先寫出單純遞迴（暴力解），確認它是對的；再觀察參數有哪些、是否有重複計算；加上記憶化；最後再改成填表與空間最佳化。大部分 DP 都可以這樣一步一步推出來。</div>` }
  ],
  keypoints: [
    '網格路徑 dp[i][j] = dp[i-1][j] + dp[i][j-1]，障礙物格子為 0。',
    'LCS：字元相同 dp[i-1][j-1] + 1，否則取 max(dp[i-1][j], dp[i][j-1])，O(nm)。',
    '編輯距離：相同則沿用左上，否則 1 + min(刪除, 插入, 替換)。',
    'LIS 的 O(n²) 解以「以 a[i] 結尾」為狀態；O(n log n) 解維護 tails 並用 lower_bound。',
    '「幾種方法、最少最多、能否做到」是 DP 的典型訊號。',
    '卡住時先寫暴力遞迴，再加記憶化，最後改成填表。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 55,
  title: '圖論演算法',
  summary: 'BFS 最短路徑回顧、Dijkstra 演算法與優先佇列、負權重與 Bellman-Ford、Floyd-Warshall 全點對最短路徑、拓撲排序（Kahn 演算法）、最小生成樹 Kruskal 與 Prim。',
  sections: [
    { id: 'dijkstra', title: 'Dijkstra 最短路徑', html: `
<p>邊有權重（例如距離、時間）時，BFS 不再保證最短。<b>Dijkstra 演算法</b>適用於<b>權重非負</b>的圖：每次從還沒確定的頂點中，取出目前距離最小的一個，確定它的最短距離，再用它更新鄰居（鬆弛，relaxation）。</p>
<pre class="cpp">#include &lt;climits&gt;
#include &lt;functional&gt;
#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    int n = 6;
    vector&lt;vector&lt;pair&lt;int, int&gt;&gt;&gt; adj(n);              // adj[u] = {(v, 權重)}
    auto add = [&amp;](int u, int v, int w) { adj[u].push_back({v, w}); adj[v].push_back({u, w}); };
    add(0, 1, 7); add(0, 2, 9); add(0, 5, 14); add(1, 2, 10); add(1, 3, 15);
    add(2, 3, 11); add(2, 5, 2); add(3, 4, 6); add(4, 5, 9);

    vector&lt;long long&gt; dist(n, LLONG_MAX);
    priority_queue&lt;pair&lt;long long, int&gt;, vector&lt;pair&lt;long long, int&gt;&gt;, greater&lt;&gt;&gt; pq;   // (距離, 頂點) 最小堆積
    dist[0] = 0;
    pq.push({0, 0});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d &gt; dist[u]) continue;                      // 過時的紀錄，跳過
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w &lt; dist[v]) {                // 鬆弛
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    for (int i = 0; i &lt; n; i++) cout &lt;&lt; "0 到 " &lt;&lt; i &lt;&lt; "：" &lt;&lt; dist[i] &lt;&lt; "\\n";
}</pre>
<p>使用優先佇列時，時間為 O((V + E) log V)。互動練習中的「最短路徑步驟」可以逐步觀察 Dijkstra 如何確定每個頂點的距離。</p>
<div class="box warn"><b class="t">Dijkstra 不能處理負權重</b>Dijkstra 假設「已確定的頂點，之後不會再找到更短的路」。有負權重的邊時這個假設不成立，結果可能錯誤，要改用 Bellman-Ford。</div>` },
    { id: 'others', title: 'Bellman-Ford 與 Floyd-Warshall', html: `
<table>
<tr><th>演算法</th><th>適用</th><th>複雜度</th><th>做法</th></tr>
<tr><td>BFS</td><td>無權重（或權重都相同）</td><td>O(V + E)</td><td>一層一層擴展</td></tr>
<tr><td>Dijkstra</td><td>單一起點、權重非負</td><td>O((V + E) log V)</td><td>每次取距離最小的頂點</td></tr>
<tr><td>Bellman-Ford</td><td>單一起點、可有負權重、可偵測負環</td><td>O(VE)</td><td>對所有邊鬆弛 V-1 輪</td></tr>
<tr><td>Floyd-Warshall</td><td>所有點對之間的最短路徑</td><td>O(V³)</td><td>依序讓每個頂點當中繼點</td></tr>
</table>
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    const int INF = 1e9;
    int n = 4;
    vector&lt;vector&lt;int&gt;&gt; d(n, vector&lt;int&gt;(n, INF));
    for (int i = 0; i &lt; n; i++) d[i][i] = 0;
    d[0][1] = 5; d[0][3] = 10; d[1][2] = 3; d[2][3] = 1;     // 有向邊
    for (int k = 0; k &lt; n; k++)                               // Floyd-Warshall：k 為中繼點
        for (int i = 0; i &lt; n; i++)
            for (int j = 0; j &lt; n; j++)
                if (d[i][k] &lt; INF &amp;&amp; d[k][j] &lt; INF) d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
    cout &lt;&lt; "0 到 3 最短：" &lt;&lt; d[0][3] &lt;&lt; "（0→1→2→3）\\n";
}</pre>
<p>Floyd-Warshall 的三層迴圈中，<b>中繼點 k 必須在最外層</b>，這是常見的錯誤。</p>` },
    { id: 'topo', title: '拓撲排序', html: `
<p>有向無環圖（DAG）中，把頂點排成一列，使每條邊 u → v 中 u 都排在 v 前面。例如<b>課程先修順序</b>、專案工作排程、編譯相依關係。</p>
<p><b>Kahn 演算法</b>：反覆取出入度為 0 的頂點（沒有先修條件的），並把它指向的頂點入度減 1。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;string&gt; name = {"程式設計", "資料結構", "演算法", "離散數學", "作業系統", "編譯器"};
    int n = name.size();
    vector&lt;vector&lt;int&gt;&gt; adj(n);
    vector&lt;int&gt; indeg(n, 0);
    auto edge = [&amp;](int u, int v) { adj[u].push_back(v); indeg[v]++; };   // u 是 v 的先修
    edge(0, 1); edge(1, 2); edge(3, 2); edge(1, 4); edge(2, 5); edge(4, 5);

    queue&lt;int&gt; q;
    for (int i = 0; i &lt; n; i++) if (indeg[i] == 0) q.push(i);
    vector&lt;int&gt; order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u]) if (--indeg[v] == 0) q.push(v);
    }
    if ((int)order.size() &lt; n) { cout &lt;&lt; "有環，無法排序\\n"; return 0; }
    for (int u : order) cout &lt;&lt; name[u] &lt;&lt; " → ";
    cout &lt;&lt; "完成\\n";
}</pre>
<p>如果最後排出的頂點少於 n 個，代表圖中有環（例如 A 是 B 的先修、B 又是 A 的先修），不存在拓撲順序。時間 O(V + E)。</p>` },
    { id: 'mst', title: '最小生成樹', html: `
<p>連通的加權無向圖中，選出一些邊把所有頂點連起來（形成一棵樹），並使總權重最小，稱為<b>最小生成樹（MST）</b>。例如用最少的成本鋪設光纖連接所有城市。</p>
<p><b>Kruskal 演算法</b>：把所有邊依權重由小到大排序，依序加入不會形成環的邊（用第 11 章資料結構課的<b>並查集</b>判斷），直到選了 V-1 條邊。</p>
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;numeric&gt;
#include &lt;tuple&gt;
#include &lt;vector&gt;
using namespace std;

vector&lt;int&gt; parent;
int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }

int main()
{
    int n = 5;
    vector&lt;tuple&lt;int, int, int&gt;&gt; edges = {          // (權重, u, v)
        {1, 0, 1}, {3, 0, 2}, {4, 1, 2}, {2, 1, 3}, {5, 2, 3}, {7, 3, 4}, {6, 2, 4}};
    sort(edges.begin(), edges.end());
    parent.resize(n);
    iota(parent.begin(), parent.end(), 0);
    int total = 0, used = 0;
    for (auto [w, u, v] : edges) {
        int a = find(u), b = find(v);
        if (a == b) continue;                        // 已連通，加入會形成環
        parent[a] = b;
        total += w;
        used++;
        cout &lt;&lt; u &lt;&lt; "-" &lt;&lt; v &lt;&lt; "（" &lt;&lt; w &lt;&lt; "） ";
    }
    cout &lt;&lt; "\\n總權重 " &lt;&lt; total &lt;&lt; "，共 " &lt;&lt; used &lt;&lt; " 條邊\\n";
}</pre>
<table>
<tr><th></th><th>Kruskal</th><th>Prim</th></tr>
<tr><td>做法</td><td>邊排序，由小到大加入不形成環的邊</td><td>從一個頂點出發，每次加入連到樹外最便宜的邊</td></tr>
<tr><td>資料結構</td><td>排序 + 並查集</td><td>優先佇列</td></tr>
<tr><td>複雜度</td><td>O(E log E)</td><td>O(E log V)</td></tr>
<tr><td>適合</td><td>稀疏圖</td><td>稠密圖</td></tr>
</table>` }
  ],
  keypoints: [
    'Dijkstra 適用於非負權重：每次取距離最小的頂點並鬆弛鄰居，O((V + E) log V)。',
    '有負權重的邊時 Dijkstra 可能出錯，改用 Bellman-Ford（O(VE)，可偵測負環）。',
    'Floyd-Warshall 求所有點對最短路徑，O(V³)，中繼點 k 要放在最外層迴圈。',
    '拓撲排序（Kahn）反覆取出入度為 0 的頂點；排不完代表有環。',
    'Kruskal：邊依權重排序，用並查集加入不形成環的邊，O(E log E)。',
    'Prim：從一點出發，每次以優先佇列加入連到樹外最便宜的邊。'
  ]
},
{
  id: 'c11', subject: 2, minutes: 40,
  title: '解題策略與面試準備',
  summary: '從題目到程式的解題流程、依資料範圍與題型選擇演算法、LeetCode 常見題型與代表題、面試時的溝通方式、APCS 與競賽準備，以及 P、NP 與無法有效解決的問題。',
  sections: [
    { id: 'process', title: '解題流程', html: `
<ol>
<li><b>理解題目</b>：用自己的話重述題目，確認輸入輸出格式與限制，舉一兩個小例子手算。</li>
<li><b>看資料範圍</b>：推估目標複雜度（n ≤ 10<sup>5</sup> 就要 O(n log n) 以下）。</li>
<li><b>先想暴力解</b>：確保自己真的理解問題，也是之後驗證的基準。</li>
<li><b>找出瓶頸並最佳化</b>：重複計算？→ DP 或記憶化。重複搜尋？→ 雜湊表、排序後二分。區間問題？→ 前綴和、雙指標、滑動視窗。</li>
<li><b>寫程式</b>：先寫清楚的版本，變數命名有意義。</li>
<li><b>測試</b>：手動跑一遍範例，再測邊界情況（空、一個元素、最大值、全部相同、負數）。</li>
<li><b>分析複雜度</b>：說出時間與空間複雜度。</li>
</ol>` },
    { id: 'patterns', title: '常見題型與對應技巧', html: `
<table>
<tr><th>題型訊號</th><th>技巧</th><th>代表題</th></tr>
<tr><td>排序陣列、找配對</td><td>雙指標、二分搜尋</td><td>Two Sum II、3Sum</td></tr>
<tr><td>最長／最短連續子陣列</td><td>滑動視窗</td><td>最長不重複子字串</td></tr>
<tr><td>子陣列和、區間查詢</td><td>前綴和 + 雜湊表</td><td>Subarray Sum Equals K</td></tr>
<tr><td>快速查詢是否存在、計數</td><td>雜湊表</td><td>Two Sum、Group Anagrams</td></tr>
<tr><td>下一個更大／更小的元素</td><td>單調堆疊</td><td>Daily Temperatures</td></tr>
<tr><td>前 k 大、第 k 小</td><td>堆積</td><td>Kth Largest Element</td></tr>
<tr><td>最小化最大值</td><td>二分搜尋答案</td><td>Koko Eating Bananas</td></tr>
<tr><td>所有組合、排列、子集合</td><td>回溯</td><td>Subsets、Permutations、N-Queens</td></tr>
<tr><td>最多幾種、最少多少、能否達成</td><td>動態規劃</td><td>Climbing Stairs、Coin Change、LIS</td></tr>
<tr><td>區間排程、合併</td><td>排序 + 貪心</td><td>Merge Intervals</td></tr>
<tr><td>樹的問題</td><td>遞迴 DFS、BFS 層序</td><td>Max Depth、Level Order</td></tr>
<tr><td>網格、連通、最短步數</td><td>BFS／DFS、並查集</td><td>Number of Islands</td></tr>
<tr><td>先修關係、相依順序</td><td>拓撲排序</td><td>Course Schedule</td></tr>
<tr><td>加權最短路徑</td><td>Dijkstra</td><td>Network Delay Time</td></tr>
</table>
<p>LeetCode 上的「Blind 75」「NeetCode 150」是整理好的面試題單，依這張表的分類練習，比隨機刷題有效率。</p>` },
    { id: 'interview', title: '面試時的溝通', html: `
<div class="box tip"><b class="t">面試官在看什麼</b>不只看答案對不對，更看你的思考過程：能不能釐清需求、能不能從暴力解逐步最佳化、能不能分析複雜度、程式碼是否清楚、能不能自己找出錯誤。</div>
<ul>
<li><b>邊想邊說</b>：說出你正在考慮的做法與取捨，沉默寫程式是大忌。</li>
<li><b>先確認再動手</b>：「輸入會有負數嗎？」「陣列可能是空的嗎？」「需要原地修改嗎？」</li>
<li><b>先講暴力解</b>：「最直接的做法是雙層迴圈 O(n²)，我想可以用雜湊表降到 O(n)。」</li>
<li><b>寫完主動測試</b>：拿範例走一遍，再說明邊界情況如何處理。</li>
<li><b>卡住時說出來</b>：面試官常會給提示，說出卡在哪裡比硬撐好。</li>
</ul>
<h3>APCS 與程式競賽</h3>
<p>APCS 實作題第一、二題考基本的迴圈、陣列、字串與排序；第三、四題會用到本課程的前綴和、二分搜尋、BFS／DFS、遞迴、DP 與 STL。在 ZeroJudge 練習歷屆題，注意輸入輸出格式與 long long 溢位。程式競賽（ICPC、TOI）則需要更深入的圖論、資料結構與數學。</p>` },
    { id: 'np', title: 'P、NP 與困難問題', html: `
<p>不是所有問題都有有效率的演算法：</p>
<table>
<tr><th>類別</th><th>意義</th><th>例子</th></tr>
<tr><td><b>P</b></td><td>可以在多項式時間（例如 O(n²)、O(n³)）內解決</td><td>排序、最短路徑、最小生成樹</td></tr>
<tr><td><b>NP</b></td><td>給定一個答案，可以在多項式時間內<b>驗證</b>它是否正確</td><td>數獨、子集合和</td></tr>
<tr><td><b>NP-complete</b></td><td>NP 中最難的問題，若其中一個有多項式解，所有 NP 問題都有</td><td>旅行推銷員（決策版）、0/1 背包（決策版）、圖著色</td></tr>
</table>
<p>「P 是否等於 NP」是電腦科學最重要的未解問題之一。遇到 NP-complete 問題時，實務上會：資料小時暴力或回溯、利用特殊結構（例如背包的容量不大時用 DP，屬於偽多項式時間）、使用近似演算法或啟發式方法（例如基因演算法、模擬退火）。</p>
<div class="box memo"><b class="t">學完之後</b>演算法需要大量練習才會熟練。建議每天解 1～2 題，依題型分類練習，每題都說出思路與複雜度。三個月後，你會發現大部分題目都是本課程這些技巧的組合。</div>` }
  ],
  keypoints: [
    '解題流程：理解題目 → 看資料範圍 → 暴力解 → 找瓶頸最佳化 → 寫程式 → 測試 → 分析複雜度。',
    '依題型訊號選技巧：配對用雙指標、連續子陣列用滑動視窗、最少最多用 DP、相依關係用拓撲排序。',
    '面試要邊想邊說、先確認需求、先講暴力解再最佳化、寫完主動測試。',
    'APCS 後兩題常考前綴和、二分搜尋、BFS／DFS、DP 與 STL。',
    'P 為可多項式時間解決，NP 為可多項式時間驗證，NP-complete 是 NP 中最難的問題。',
    '遇到困難問題時，可用回溯、偽多項式 DP、近似或啟發式方法。'
  ]
}
);
