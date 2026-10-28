/* 演算法 基礎技巧篇：分析、遞迴、排序、搜尋與回溯
   <pre class="cpp"> 為可在網頁上編譯執行的範例；<pre class="out"> 為一般程式碼或示意圖
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 45,
  title: '演算法概論與複雜度分析',
  summary: '演算法的定義與特性、正確性與迴圈不變量、漸進符號 O／Ω／Θ、從資料範圍估算可行的複雜度、遞迴式與主定理、比較演算法的方法。',
  sections: [
    { id: 'what', title: '什麼是演算法', html: `
<p><b>演算法（Algorithm）</b>是解決問題的明確步驟。一個好的演算法要有：</p>
<table>
<tr><th>特性</th><th>意義</th></tr>
<tr><td>輸入與輸出</td><td>有明確的輸入，產生正確的輸出</td></tr>
<tr><td>明確性</td><td>每個步驟都清楚、沒有歧義</td></tr>
<tr><td>有限性</td><td>在有限步驟內結束</td></tr>
<tr><td>有效性</td><td>每個步驟都能實際執行</td></tr>
</table>
<p>同一個問題往往有很多種演算法。例如「判斷 n 是否為質數」：試除 2 到 n-1 是 O(n)，只試到 √n 是 O(√n)。n = 10<sup>12</sup> 時，前者要算一兆次，後者只要一百萬次。<b>演算法的選擇，比電腦快慢影響大得多</b>。</p>` },
    { id: 'correct', title: '正確性與迴圈不變量', html: `
<p>寫完演算法，怎麼確定它是對的？除了測試，還可以用<b>迴圈不變量（loop invariant）</b>證明：找一個在每次迴圈開始時都成立的性質。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int find_max(const vector&lt;int&gt; &amp;a)
{
    int best = a[0];
    // 迴圈不變量：每次迴圈開始時，best 是 a[0..i-1] 中的最大值
    for (size_t i = 1; i &lt; a.size(); i++)
        if (a[i] &gt; best) best = a[i];
    // 迴圈結束時 i = n，所以 best 是 a[0..n-1] 的最大值
    return best;
}

int main()
{
    cout &lt;&lt; find_max({3, 9, 2, 7, 9, 1}) &lt;&lt; "\\n";
}</pre>
<p>證明三步驟：<b>初始化</b>（第一次迴圈前成立）、<b>維持</b>（如果這一輪開始時成立，下一輪開始時也成立）、<b>終止</b>（迴圈結束時，不變量推出正確答案）。這和數學歸納法的概念相同。</p>
<div class="box tip"><b class="t">測試的好習慣</b>除了一般情況，一定要測<b>邊界情況</b>：空的輸入、只有一個元素、全部相同、已經排序、反向排序、最大最小的數值。很多演算法錯在邊界。</div>` },
    { id: 'notation', title: '漸進符號 O、Ω、Θ', html: `
<table>
<tr><th>符號</th><th>意義</th><th>直覺</th></tr>
<tr><td>O(g(n))</td><td>上界：成長速度<b>不超過</b> g(n)</td><td>「最多」這麼慢</td></tr>
<tr><td>Ω(g(n))</td><td>下界：成長速度<b>至少</b> g(n)</td><td>「至少」要這麼久</td></tr>
<tr><td>Θ(g(n))</td><td>緊密界：同時是上界與下界</td><td>「剛好」這個量級</td></tr>
</table>
<p>例如 3n² + 5n 是 Θ(n²)，同時也是 O(n³)（上界不一定要緊）。面試與日常討論說「O(n²)」時，通常指的是緊密的上界。</p>
<p>重要的下界：<b>任何以比較為基礎的排序，最壞情況至少需要 Ω(n log n) 次比較</b>。所以合併排序在比較排序中已經是最佳的。</p>` },
    { id: 'master', title: '遞迴式與主定理', html: `
<p>分治演算法的時間通常寫成遞迴式。<b>主定理（Master Theorem）</b>可以快速求解 T(n) = a·T(n/b) + f(n) 形式的遞迴式：</p>
<table>
<tr><th>演算法</th><th>遞迴式</th><th>結果</th></tr>
<tr><td>二分搜尋</td><td>T(n) = T(n/2) + O(1)</td><td>O(log n)</td></tr>
<tr><td>合併排序</td><td>T(n) = 2T(n/2) + O(n)</td><td>O(n log n)</td></tr>
<tr><td>二元樹走訪</td><td>T(n) = 2T(n/2) + O(1)</td><td>O(n)</td></tr>
<tr><td>單純遞迴費氏數列</td><td>T(n) = T(n-1) + T(n-2) + O(1)</td><td>O(φ<sup>n</sup>) ≈ O(1.618<sup>n</sup>)</td></tr>
</table>
<p>主定理比較 f(n) 與 n<sup>log_b a</sup>：f(n) 較小時答案是 Θ(n<sup>log_b a</sup>)；兩者同階時答案是 Θ(n<sup>log_b a</sup> log n)；f(n) 較大時答案是 Θ(f(n))。合併排序 a = 2、b = 2，n<sup>log₂2</sup> = n 與 f(n) = n 同階，所以是 Θ(n log n)。</p>
<pre class="out">合併排序的遞迴樹：每一層總工作量都是 n，共 log n 層
        n                  → n
     n/2   n/2             → n
   n/4 n/4 n/4 n/4         → n
   ……                      共 log₂ n 層，總計 n log n</pre>` },
    { id: 'estimate', title: '從資料範圍估算複雜度', html: `
<p>程式競賽與面試題目會給出資料範圍。<b>C++ 每秒大約可以執行 10<sup>8</sup> 次簡單運算</b>，可以反推需要什麼複雜度的演算法：</p>
<table>
<tr><th>n 的上限</th><th>可接受的複雜度</th><th>常見演算法</th></tr>
<tr><td>10～11</td><td>O(n!)</td><td>列舉排列</td></tr>
<tr><td>20～25</td><td>O(2<sup>n</sup>)</td><td>列舉子集合、狀態壓縮 DP</td></tr>
<tr><td>500</td><td>O(n³)</td><td>Floyd-Warshall、區間 DP</td></tr>
<tr><td>5,000</td><td>O(n²)</td><td>簡單 DP、雙層迴圈</td></tr>
<tr><td>10<sup>5</sup>～10<sup>6</sup></td><td>O(n log n)</td><td>排序、二分搜尋、堆積、平衡樹</td></tr>
<tr><td>10<sup>7</sup>～10<sup>8</sup></td><td>O(n)</td><td>雙指標、前綴和、線性掃描</td></tr>
<tr><td>10<sup>18</sup></td><td>O(log n) 或 O(√n)</td><td>二分搜尋、快速冪、數學公式</td></tr>
</table>
<p>互動練習中的「時間複雜度比較」可以輸入 n 看各種複雜度的估計時間。</p>
<div class="box exam"><b class="t">解題第一步</b>先看資料範圍，決定目標複雜度，再想用什麼演算法達成。看到 n ≤ 10<sup>5</sup>，就知道雙層迴圈一定會超時，要往排序、二分、雜湊、雙指標的方向想。</div>` }
  ],
  keypoints: [
    '演算法是明確、有限、有效的解題步驟；選對演算法比電腦快慢影響更大。',
    '迴圈不變量以初始化、維持、終止三步驟證明演算法的正確性。',
    'O 為上界、Ω 為下界、Θ 為緊密界；比較排序的下界為 Ω(n log n)。',
    '主定理求解 T(n) = aT(n/b) + f(n)；合併排序 2T(n/2) + O(n) = O(n log n)。',
    'C++ 每秒約 10⁸ 次運算：n ≤ 5000 可 O(n²)，n ≤ 10⁶ 要 O(n log n)。',
    '測試時務必涵蓋空輸入、單一元素、已排序、極端值等邊界情況。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: '遞迴與分治',
  summary: '遞迴的思考方式、遞迴樹與呼叫堆疊、河內塔、快速冪、分治法的三個步驟、最大子陣列和的分治解法，以及遞迴改迴圈與記憶化的時機。',
  sections: [
    { id: 'recursion', title: '遞迴的思考方式', html: `
<p>寫遞迴時，<b>不要試圖在腦中展開所有呼叫</b>，而是相信「較小的問題已經被正確解決」，只要思考兩件事：</p>
<ol>
<li><b>終止條件（base case）</b>：最小、可以直接回答的情況。</li>
<li><b>遞迴關係</b>：如何用較小問題的答案組合出目前問題的答案。</li>
</ol>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

int sum_digits(int n) { return n &lt; 10 ? n : n % 10 + sum_digits(n / 10); }      // 各位數字和
string reverse_str(const string &amp;s) { return s.empty() ? "" : reverse_str(s.substr(1)) + s[0]; }
bool is_pal(const string &amp;s, int l, int r) { return l &gt;= r || (s[l] == s[r] &amp;&amp; is_pal(s, l + 1, r - 1)); }

int main()
{
    cout &lt;&lt; sum_digits(98765) &lt;&lt; "\\n";
    cout &lt;&lt; reverse_str("hello") &lt;&lt; "\\n";
    cout &lt;&lt; boolalpha &lt;&lt; is_pal("racecar", 0, 6) &lt;&lt; "\\n";
}</pre>` },
    { id: 'hanoi', title: '河內塔', html: `
<p>把 n 個盤子從 A 柱移到 C 柱，一次只能移一個，大盤不能放在小盤上。遞迴的想法：</p>
<ol>
<li>先把上面 n-1 個盤子從 A 移到 B（借用 C）。</li>
<li>把最大的盤子從 A 移到 C。</li>
<li>再把 n-1 個盤子從 B 移到 C（借用 A）。</li>
</ol>
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

int moves = 0;
bool verbose = true;            // 是否印出每一步
void hanoi(int n, char from, char via, char to)
{
    if (n == 0) return;
    hanoi(n - 1, from, to, via);
    moves++;
    if (verbose) cout &lt;&lt; "第 " &lt;&lt; moves &lt;&lt; " 步：盤子 " &lt;&lt; n &lt;&lt; " 從 " &lt;&lt; from &lt;&lt; " 到 " &lt;&lt; to &lt;&lt; "\\n";
    hanoi(n - 1, via, from, to);
}

int main()
{
    hanoi(3, 'A', 'B', 'C');
    cout &lt;&lt; "3 個盤子共 " &lt;&lt; moves &lt;&lt; " 步\\n";
    moves = 0;
    verbose = false;
    hanoi(20, 'A', 'B', 'C');
    cout &lt;&lt; "20 個盤子共 " &lt;&lt; moves &lt;&lt; " 步\\n";
}</pre>
<p>步數 T(n) = 2T(n-1) + 1 = 2<sup>n</sup> - 1，是指數時間。64 個盤子要 1.8 × 10<sup>19</sup> 步。</p>` },
    { id: 'pow', title: '快速冪', html: `
<p>計算 a<sup>n</sup>，直接乘 n 次是 O(n)。利用 a<sup>n</sup> = (a<sup>n/2</sup>)<sup>2</sup>，每次把指數減半，只要 O(log n)：</p>
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

long long power(long long a, long long n, long long mod)
{
    if (n == 0) return 1 % mod;
    long long half = power(a, n / 2, mod);
    long long r = half * half % mod;
    if (n % 2 == 1) r = r * a % mod;            // 指數為奇數時多乘一次 a
    return r;
}

long long power_iter(long long a, long long n, long long mod)   // 迴圈版：看指數的二進位
{
    long long r = 1 % mod;
    a %= mod;
    while (n &gt; 0) {
        if (n &amp; 1) r = r * a % mod;
        a = a * a % mod;
        n &gt;&gt;= 1;
    }
    return r;
}

int main()
{
    cout &lt;&lt; power(2, 10, 1000000007) &lt;&lt; "\\n";
    cout &lt;&lt; power(3, 1000000000, 1000000007) &lt;&lt; " " &lt;&lt; power_iter(3, 1000000000, 1000000007) &lt;&lt; "\\n";
}</pre>
<p>指數 10<sup>9</sup> 只需要約 30 次乘法。快速冪用於密碼學（RSA）、計算大數取餘數、矩陣快速冪求費氏數列。</p>` },
    { id: 'divide', title: '分治法：最大子陣列和', html: `
<p><b>分治法（Divide and Conquer）</b>：把問題<b>分割</b>成較小的子問題、<b>各自解決</b>、再<b>合併</b>結果。合併排序、快速排序、二分搜尋都是分治法。</p>
<p>例題：找出連續子陣列的最大總和。分治的想法：答案只可能在左半、右半，或<b>跨過中間</b>。</p>
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;climits&gt;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

long long best(const vector&lt;int&gt; &amp;a, int l, int r)      // 回傳 a[l..r] 的最大子陣列和
{
    if (l == r) return a[l];
    int m = (l + r) / 2;
    long long left_best = best(a, l, m), right_best = best(a, m + 1, r);
    long long s = 0, cross_l = LLONG_MIN, cross_r = LLONG_MIN;
    for (int i = m; i &gt;= l; i--) { s += a[i]; cross_l = max(cross_l, s); }      // 從中間往左延伸
    s = 0;
    for (int i = m + 1; i &lt;= r; i++) { s += a[i]; cross_r = max(cross_r, s); }  // 從中間往右延伸
    return max({left_best, right_best, cross_l + cross_r});
}

int main()
{
    vector&lt;int&gt; a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout &lt;&lt; best(a, 0, a.size() - 1) &lt;&lt; "\\n";            // [4, -1, 2, 1] = 6
}</pre>
<p>T(n) = 2T(n/2) + O(n) = O(n log n)。第 8 章會用動態規劃（Kadane 演算法）做到 O(n)，可以比較兩種策略。</p>
<div class="box warn"><b class="t">遞迴的代價</b>每次遞迴呼叫都佔用堆疊空間，深度太深（例如 10<sup>6</sup> 層）會堆疊溢位。若子問題大量重複（例如費氏數列），要用記憶化或改寫成迴圈的動態規劃。</div>` }
  ],
  keypoints: [
    '寫遞迴只要想清楚終止條件與遞迴關係，相信較小的問題已被正確解決。',
    '河內塔 T(n) = 2T(n-1) + 1，共需 2ⁿ - 1 步。',
    '快速冪利用指數減半，O(log n) 計算 aⁿ mod m。',
    '分治法：分割 → 各自解決 → 合併；合併排序、快速排序、二分搜尋都是分治。',
    '最大子陣列和的分治解為 O(n log n)：答案在左半、右半或跨過中間。',
    '遞迴太深會堆疊溢位；子問題重複時改用記憶化或動態規劃。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 55,
  title: '排序演算法',
  summary: '選擇、插入、氣泡排序、合併排序、快速排序與樞紐的選擇、計數排序、穩定性與原地排序的比較、比較排序的下界，以及 std::sort 與自訂比較。',
  sections: [
    { id: 'simple', title: '簡單排序：O(n²)', html: `
<table>
<tr><th>演算法</th><th>做法</th><th>特色</th></tr>
<tr><td>選擇排序</td><td>每一輪找出剩下的最小值，放到前面</td><td>交換次數最少（n-1 次），不穩定</td></tr>
<tr><td>插入排序</td><td>像整理撲克牌，把每個元素插入前面已排好的部分</td><td>穩定；資料<b>幾乎排好</b>時接近 O(n)</td></tr>
<tr><td>氣泡排序</td><td>反覆交換相鄰的逆序對，大的往後浮</td><td>穩定；最容易理解，實務很少用</td></tr>
</table>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

void insertion_sort(vector&lt;int&gt; &amp;a)
{
    for (size_t i = 1; i &lt; a.size(); i++) {
        int key = a[i];
        int j = (int)i - 1;
        while (j &gt;= 0 &amp;&amp; a[j] &gt; key) {      // 比 key 大的往後移一格
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;                       // 插入到空出來的位置
    }
}

void selection_sort(vector&lt;int&gt; &amp;a)
{
    for (size_t i = 0; i + 1 &lt; a.size(); i++) {
        size_t m = i;
        for (size_t j = i + 1; j &lt; a.size(); j++) if (a[j] &lt; a[m]) m = j;
        swap(a[i], a[m]);
    }
}

int main()
{
    vector&lt;int&gt; a = {5, 2, 9, 1, 5, 6}, b = a;
    insertion_sort(a);
    selection_sort(b);
    for (int x : a) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "| ";
    for (int x : b) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n";
}</pre>
<p>互動練習中的「排序過程視覺化」可以逐步觀察各種排序法的比較與交換。</p>` },
    { id: 'merge', title: '合併排序', html: `
<p><b>合併排序（Merge Sort）</b>：把陣列切成兩半，各自排序，再把兩個已排序的部分合併。合併時每次取兩邊較小的那個，O(n) 完成。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

void merge_sort(vector&lt;int&gt; &amp;a, vector&lt;int&gt; &amp;tmp, int l, int r)   // 排序 a[l..r)
{
    if (r - l &lt;= 1) return;
    int m = (l + r) / 2;
    merge_sort(a, tmp, l, m);
    merge_sort(a, tmp, m, r);
    int i = l, j = m, k = l;
    while (i &lt; m &amp;&amp; j &lt; r) tmp[k++] = (a[i] &lt;= a[j]) ? a[i++] : a[j++];   // &lt;= 讓排序穩定
    while (i &lt; m) tmp[k++] = a[i++];
    while (j &lt; r) tmp[k++] = a[j++];
    for (int t = l; t &lt; r; t++) a[t] = tmp[t];
}

int main()
{
    vector&lt;int&gt; a = {38, 27, 43, 3, 9, 82, 10};
    vector&lt;int&gt; tmp(a.size());
    merge_sort(a, tmp, 0, a.size());
    for (int x : a) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n";
}</pre>
<ul>
<li>時間：<b>最好、平均、最壞都是 O(n log n)</b>，非常穩定可預期。</li>
<li>需要 O(n) 額外空間（tmp 陣列），不是原地排序。</li>
<li>是穩定排序；適合鏈結串列與外部排序（資料大到放不進記憶體）。</li>
<li>合併的過程可以順便計算<b>逆序對數量</b>，是常見的延伸題。</li>
</ul>` },
    { id: 'quick', title: '快速排序', html: `
<p><b>快速排序（Quick Sort）</b>：選一個<b>樞紐（pivot）</b>，把小於它的放左邊、大於它的放右邊（分割），再遞迴排序兩邊。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;random&gt;
#include &lt;vector&gt;
using namespace std;

mt19937 rng(42);

int partition(vector&lt;int&gt; &amp;a, int l, int r)          // Lomuto 分割，排序 a[l..r]
{
    int p = l + rng() % (r - l + 1);                   // 隨機選樞紐，避免最壞情況
    swap(a[p], a[r]);
    int pivot = a[r], i = l;
    for (int j = l; j &lt; r; j++)
        if (a[j] &lt; pivot) swap(a[i++], a[j]);
    swap(a[i], a[r]);                                  // 樞紐放到最終位置
    return i;
}

void quick_sort(vector&lt;int&gt; &amp;a, int l, int r)
{
    if (l &gt;= r) return;
    int p = partition(a, l, r);
    quick_sort(a, l, p - 1);
    quick_sort(a, p + 1, r);
}

int main()
{
    vector&lt;int&gt; a = {10, 7, 8, 9, 1, 5, 3};
    quick_sort(a, 0, a.size() - 1);
    for (int x : a) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n";
}</pre>
<ul>
<li>平均 O(n log n)，常數小，實務上通常最快；原地排序，只需 O(log n) 遞迴堆疊。</li>
<li><b>最壞 O(n²)</b>：每次樞紐都選到最大或最小（例如資料已排序又固定選第一個）。用隨機樞紐或三數取中可以避免。</li>
<li>不是穩定排序。</li>
</ul>` },
    { id: 'compare', title: '排序法比較與計數排序', html: `
<table>
<tr><th>演算法</th><th>平均</th><th>最壞</th><th>額外空間</th><th>穩定</th></tr>
<tr><td>氣泡排序</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>是</td></tr>
<tr><td>選擇排序</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>否</td></tr>
<tr><td>插入排序</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>是</td></tr>
<tr><td>合併排序</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>是</td></tr>
<tr><td>快速排序</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td><td>否</td></tr>
<tr><td>堆積排序</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>否</td></tr>
<tr><td>計數排序</td><td>O(n + k)</td><td>O(n + k)</td><td>O(k)</td><td>是</td></tr>
</table>
<p><b>穩定排序</b>：相等的元素排序後維持原本的相對順序。例如先依姓名排序、再依成績做穩定排序，同分的人仍會依姓名排列。</p>
<h3>計數排序：不比較的排序</h3>
<p>值域不大（例如成績 0～100）時，直接計算每個值出現幾次，O(n + k) 完成，突破比較排序的 n log n 下界：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; scores = {88, 72, 95, 72, 60, 88, 100, 72};
    vector&lt;int&gt; cnt(101, 0);
    for (int s : scores) cnt[s]++;
    for (int v = 0; v &lt;= 100; v++)
        for (int c = 0; c &lt; cnt[v]; c++) cout &lt;&lt; v &lt;&lt; " ";
    cout &lt;&lt; "\\n";
}</pre>
<div class="box tip"><b class="t">實務上</b>直接用 <code>std::sort</code>（introsort：快速排序 + 堆積排序 + 插入排序的混合，保證 O(n log n)），需要穩定時用 <code>std::stable_sort</code>。親手實作是為了理解原理與應付面試。</div>` }
  ],
  keypoints: [
    '選擇、插入、氣泡排序為 O(n²)；插入排序在資料幾乎排好時接近 O(n)。',
    '合併排序永遠 O(n log n)、穩定，但需要 O(n) 額外空間。',
    '快速排序平均 O(n log n)、實務最快、原地排序，最壞 O(n²)，用隨機樞紐避免。',
    '穩定排序：插入、合併、氣泡、計數；不穩定：選擇、快速、堆積。',
    '計數排序 O(n + k)，適合值域小的整數，不受比較排序 Ω(n log n) 下界限制。',
    '實務使用 std::sort（introsort）與 std::stable_sort。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 45,
  title: '二分搜尋',
  summary: '二分搜尋的原理與正確寫法、常見的邊界錯誤、自己實作 lower_bound、二分搜尋答案（最小化最大值）、對浮點數二分，以及在旋轉陣列等變形中的應用。',
  sections: [
    { id: 'basic', title: '二分搜尋的正確寫法', html: `
<p>在<b>已排序</b>的陣列中找 target：和中間值比較，每次排除一半，O(log n)。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int binary_search_idx(const vector&lt;int&gt; &amp;a, int target)
{
    int lo = 0, hi = (int)a.size() - 1;          // 搜尋範圍 [lo, hi]（左右都包含）
    while (lo &lt;= hi) {                            // 範圍不為空就繼續
        int mid = lo + (hi - lo) / 2;             // 避免 lo + hi 溢位
        if (a[mid] == target) return mid;
        if (a[mid] &lt; target) lo = mid + 1;        // 答案在右半
        else hi = mid - 1;                        // 答案在左半
    }
    return -1;
}

int main()
{
    vector&lt;int&gt; a = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    cout &lt;&lt; binary_search_idx(a, 23) &lt;&lt; " " &lt;&lt; binary_search_idx(a, 7) &lt;&lt; "\\n";
}</pre>
<div class="box warn"><b class="t">二分搜尋最常見的錯誤</b>while 條件寫成 <code>lo &lt; hi</code> 卻搭配閉區間 [lo, hi]、更新時寫成 <code>lo = mid</code> 造成無限迴圈、<code>(lo + hi) / 2</code> 在大數時溢位。選定一種區間定義（閉區間 [lo, hi] 或半開區間 [lo, hi)）並徹底遵守。</div>
<p>互動練習中的「二分搜尋步驟」可以觀察每一步 lo、mid、hi 的變化。</p>` },
    { id: 'bound', title: 'lower_bound：找第一個符合條件的位置', html: `
<p>比起「找到某個值」，更常用的是「找<b>第一個 ≥ x</b> 的位置」（lower_bound）。用半開區間 [lo, hi) 寫最不容易出錯：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int my_lower_bound(const vector&lt;int&gt; &amp;a, int x)    // 第一個 a[i] &gt;= x 的索引，都沒有則回傳 n
{
    int lo = 0, hi = a.size();                      // 答案在 [lo, hi] 之間
    while (lo &lt; hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] &gt;= x) hi = mid;                  // mid 可能就是答案，保留
        else lo = mid + 1;                          // mid 太小，答案在右邊
    }
    return lo;
}

int main()
{
    vector&lt;int&gt; a = {1, 3, 3, 3, 5, 8, 13};
    cout &lt;&lt; my_lower_bound(a, 3) &lt;&lt; " " &lt;&lt; my_lower_bound(a, 4) &lt;&lt; " " &lt;&lt; my_lower_bound(a, 100) &lt;&lt; "\\n";
    int first = my_lower_bound(a, 3), after = my_lower_bound(a, 4);
    cout &lt;&lt; "3 出現 " &lt;&lt; after - first &lt;&lt; " 次\\n";
}</pre>
<p>這個模板可以推廣：只要陣列對某個條件呈現「前面都是 false、後面都是 true」的<b>單調性</b>，就能二分找到第一個 true 的位置。</p>` },
    { id: 'answer', title: '二分搜尋答案', html: `
<p>有些題目直接求答案很難，但「<b>給定一個答案，檢查是否可行</b>」很容易，而且可行性有單調性（答案越大越容易可行）。這時可以<b>對答案二分</b>。</p>
<p>例題：有 n 本書的頁數，要分給 k 個人抄寫，每人負責連續的書，求「最多頁數的那個人」最少要抄幾頁？</p>
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;numeric&gt;
#include &lt;vector&gt;
using namespace std;

bool feasible(const vector&lt;int&gt; &amp;pages, int k, long long limit)   // 每人最多 limit 頁，k 個人夠嗎？
{
    int people = 1;
    long long cur = 0;
    for (int p : pages) {
        if (p &gt; limit) return false;
        if (cur + p &gt; limit) { people++; cur = 0; }
        cur += p;
    }
    return people &lt;= k;
}

int main()
{
    vector&lt;int&gt; pages = {100, 200, 300, 400, 500, 600, 700, 800, 900};
    int k = 3;
    long long lo = *max_element(pages.begin(), pages.end());       // 答案至少是最厚的那本
    long long hi = accumulate(pages.begin(), pages.end(), 0LL);     // 答案最多是全部頁數
    while (lo &lt; hi) {                                               // 找第一個可行的 limit
        long long mid = lo + (hi - lo) / 2;
        if (feasible(pages, k, mid)) hi = mid;
        else lo = mid + 1;
    }
    cout &lt;&lt; "最少要 " &lt;&lt; lo &lt;&lt; " 頁\\n";
}</pre>
<p>每次檢查 O(n)，二分 O(log(總頁數)) 次，總共 O(n log S)。「最小化最大值」「最大化最小值」是二分答案的典型訊號，例如運送包裹的最小載重、放置基地台的最大最小距離。</p>` },
    { id: 'variants', title: '浮點數二分與其他變形', html: `
<pre class="cpp">#include &lt;cstdio&gt;

int main()
{
    double lo = 0, hi = 2;                  // 求 √2：找 x 使 x² = 2
    for (int i = 0; i &lt; 100; i++) {         // 浮點數二分：固定次數，不用 lo &lt;= hi
        double mid = (lo + hi) / 2;
        if (mid * mid &lt; 2) lo = mid; else hi = mid;
    }
    printf("%.10f\\n", lo);
}</pre>
<table>
<tr><th>變形</th><th>關鍵</th></tr>
<tr><td>旋轉排序陣列中搜尋（例如 [4,5,6,7,0,1,2]）</td><td>每次至少有一半是排好的，判斷 target 在不在那一半</td></tr>
<tr><td>找峰值（比左右鄰居都大的元素）</td><td>往比較大的那一側走，一定找得到峰值</td></tr>
<tr><td>在二維已排序矩陣中搜尋</td><td>從右上角出發，大了往左、小了往下，O(n + m)</td></tr>
<tr><td>猜數字遊戲、找第一個壞掉的版本</td><td>標準的找第一個 true</td></tr>
</table>` }
  ],
  keypoints: [
    '二分搜尋要求資料有序（或具單調性），每次排除一半，O(log n)。',
    '選定區間定義並遵守：閉區間用 lo <= hi，半開區間用 lo < hi。',
    'mid = lo + (hi - lo) / 2 避免溢位；更新時不能寫成 lo = mid 造成無限迴圈。',
    'lower_bound 找第一個 ≥ x 的位置；upper_bound - lower_bound 為出現次數。',
    '求最小化最大值或最大化最小值時，常用「二分搜尋答案」搭配可行性檢查。',
    '浮點數二分以固定次數迭代，不用 lo <= hi 判斷。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 45,
  title: '雙指標、滑動視窗與前綴和',
  summary: '對撞雙指標（排序陣列找兩數和、盛水容器）、快慢雙指標（原地去重）、滑動視窗（最長不重複子字串、和至少為 k 的最短子陣列）、前綴和與差分陣列、前綴和搭配雜湊表。',
  sections: [
    { id: 'twoptr', title: '對撞雙指標', html: `
<p>在<b>已排序</b>的陣列中找兩個數，和為 target：左指標從頭、右指標從尾，和太小就左指標右移、太大就右指標左移，O(n)。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; a = {1, 3, 4, 6, 8, 11, 15};
    int target = 14, l = 0, r = a.size() - 1;
    while (l &lt; r) {
        int s = a[l] + a[r];
        if (s == target) { cout &lt;&lt; a[l] &lt;&lt; " + " &lt;&lt; a[r] &lt;&lt; "\\n"; break; }
        if (s &lt; target) l++;      // 和太小：換一個較大的左值
        else r--;                 // 和太大：換一個較小的右值
    }

    vector&lt;int&gt; h = {1, 8, 6, 2, 5, 4, 8, 3, 7};   // 盛最多水的容器
    int best = 0;
    l = 0; r = h.size() - 1;
    while (l &lt; r) {
        best = max(best, min(h[l], h[r]) * (r - l));
        if (h[l] &lt; h[r]) l++; else r--;           // 移動較矮的那邊才有機會變大
    }
    cout &lt;&lt; "最多盛水 " &lt;&lt; best &lt;&lt; "\\n";
}</pre>
<p>為什麼可以這樣移動？以兩數和為例：若 a[l] + a[r] &lt; target，a[l] 和任何比 a[r] 小的數相加都更小，所以 a[l] 不可能是答案的一部分，可以安全排除。</p>` },
    { id: 'fastslow', title: '快慢雙指標：原地處理陣列', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; a = {1, 1, 2, 2, 2, 3, 5, 5};     // 已排序，原地去除重複
    int slow = 0;
    for (int fast = 1; fast &lt; (int)a.size(); fast++)
        if (a[fast] != a[slow]) a[++slow] = a[fast];
    int len = slow + 1;
    for (int i = 0; i &lt; len; i++) cout &lt;&lt; a[i] &lt;&lt; " ";
    cout &lt;&lt; "（長度 " &lt;&lt; len &lt;&lt; "）\\n";

    vector&lt;int&gt; b = {0, 1, 0, 3, 12};              // 把 0 移到最後，保持其他元素順序
    int pos = 0;
    for (int x : b) if (x != 0) b[pos++] = x;
    while (pos &lt; (int)b.size()) b[pos++] = 0;
    for (int x : b) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n";
}</pre>
<p>慢指標標記「已處理好的部分的結尾」，快指標負責掃描。兩者都只往前走，O(n) 時間、O(1) 額外空間。</p>` },
    { id: 'window', title: '滑動視窗', html: `
<p>求「符合條件的最長（或最短）連續子陣列／子字串」時，維持一個視窗 [l, r]：右端不斷擴張，不符合條件時左端收縮。每個元素最多進出視窗一次，O(n)。</p>
<pre class="cpp">#include &lt;climits&gt;
#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;unordered_map&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    string s = "abcabcbb";                         // 最長不含重複字元的子字串
    unordered_map&lt;char, int&gt; last;                 // 字元上次出現的位置
    int best = 0, l = 0;
    for (int r = 0; r &lt; (int)s.size(); r++) {
        if (last.count(s[r]) &amp;&amp; last[s[r]] &gt;= l) l = last[s[r]] + 1;   // 重複了，左端跳過去
        last[s[r]] = r;
        best = max(best, r - l + 1);
    }
    cout &lt;&lt; "最長不重複長度 " &lt;&lt; best &lt;&lt; "\\n";

    vector&lt;int&gt; a = {2, 3, 1, 2, 4, 3};            // 總和 ≥ 7 的最短子陣列（元素皆為正）
    int target = 7, sum = 0, shortest = INT_MAX;
    l = 0;
    for (int r = 0; r &lt; (int)a.size(); r++) {
        sum += a[r];
        while (sum &gt;= target) {                    // 符合條件就盡量收縮左端
            shortest = min(shortest, r - l + 1);
            sum -= a[l++];
        }
    }
    cout &lt;&lt; "最短長度 " &lt;&lt; shortest &lt;&lt; "\\n";
}</pre>
<div class="box warn"><b class="t">滑動視窗的前提</b>收縮左端後條件要「變得更容易滿足或更難滿足」有單調性。例如元素都是正數時，縮短視窗總和一定變小。陣列含負數時這個方法不適用，要改用前綴和加雜湊表或其他方法。</div>` },
    { id: 'prefix', title: '前綴和、差分與雜湊表', html: `
<h3>子陣列和為 k 的個數（含負數也適用）</h3>
<p>子陣列 a[i..j] 的和 = pre[j+1] - pre[i]。要等於 k，就是找之前出現過幾次 pre[j+1] - k：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;unordered_map&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; a = {1, 2, 3, -2, 2, 1};
    int k = 3;
    unordered_map&lt;long long, int&gt; seen;            // 前綴和 → 出現次數
    seen[0] = 1;
    long long pre = 0;
    int count = 0;
    for (int x : a) {
        pre += x;
        if (seen.count(pre - k)) count += seen[pre - k];
        seen[pre]++;
    }
    cout &lt;&lt; "和為 " &lt;&lt; k &lt;&lt; " 的子陣列有 " &lt;&lt; count &lt;&lt; " 個\\n";

    vector&lt;int&gt; diff(8, 0);                        // 差分陣列：多次區間加值，最後一次還原
    auto range_add = [&amp;](int l, int r, int v) { diff[l] += v; diff[r + 1] -= v; };
    range_add(1, 4, 5);
    range_add(3, 6, 2);
    int cur = 0;
    for (int i = 0; i &lt; 7; i++) { cur += diff[i]; cout &lt;&lt; cur &lt;&lt; " "; }
    cout &lt;&lt; "\\n";
}</pre>
<p><b>差分陣列</b>是前綴和的逆運算：每次區間 [l, r] 加 v 只要 O(1)（diff[l] += v、diff[r+1] -= v），全部做完後求一次前綴和就得到結果。適合「大量區間修改、最後才查詢」的題目。</p>` }
  ],
  keypoints: [
    '對撞雙指標在排序陣列中找配對：和太小左指標右移、太大右指標左移，O(n)。',
    '快慢雙指標可原地去重、移動零，O(n) 時間 O(1) 空間。',
    '滑動視窗：右端擴張、不符條件時左端收縮，每個元素進出一次，O(n)。',
    '滑動視窗需要單調性；含負數時改用前綴和加雜湊表。',
    '子陣列和為 k 的個數：統計之前出現過幾次 pre - k。',
    '差分陣列讓區間加值 O(1)，最後一次求前綴和還原。'
  ]
},
{
  id: 'c06', subject: 1, minutes: 50,
  title: '暴力搜尋與回溯',
  summary: '暴力列舉的時機、用位元列舉子集合、回溯法的框架（選擇、遞迴、撤銷）、列舉排列與組合、N 皇后、剪枝技巧，以及回溯的時間複雜度。',
  sections: [
    { id: 'brute', title: '暴力列舉與位元列舉子集合', html: `
<p>資料量很小時（例如 n ≤ 20），直接列舉所有可能往往是最簡單可靠的做法。n 個元素有 2<sup>n</sup> 個子集合，可以用一個 0～2<sup>n</sup>-1 的整數表示：第 i 個位元為 1 代表選了第 i 個元素。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; items = {3, 34, 4, 12, 5, 2};
    int target = 9, n = items.size(), ways = 0;
    for (int mask = 0; mask &lt; (1 &lt;&lt; n); mask++) {        // 列舉 2^n 個子集合
        int sum = 0;
        for (int i = 0; i &lt; n; i++) if (mask &gt;&gt; i &amp; 1) sum += items[i];
        if (sum == target) {
            ways++;
            cout &lt;&lt; "{ ";
            for (int i = 0; i &lt; n; i++) if (mask &gt;&gt; i &amp; 1) cout &lt;&lt; items[i] &lt;&lt; " ";
            cout &lt;&lt; "}\\n";
        }
    }
    cout &lt;&lt; "共 " &lt;&lt; ways &lt;&lt; " 種\\n";
}</pre>` },
    { id: 'backtrack', title: '回溯法', html: `
<p><b>回溯法（Backtracking）</b>是有系統地試遍所有可能：每一步做一個選擇、遞迴往下，回來時<b>撤銷選擇</b>再試下一個。可以想像成走迷宮，走不通就退回上一個岔路。</p>
<pre class="out">void backtrack(目前的狀態) {
    if (達成目標) { 記錄答案; return; }
    for (每個可能的選擇) {
        if (不合法) continue;        // 剪枝
        做選擇;
        backtrack(新的狀態);
        撤銷選擇;                    // 回到原本的狀態
    }
}</pre>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

vector&lt;int&gt; path;
vector&lt;bool&gt; used;

void permute(const vector&lt;int&gt; &amp;a)                 // 列舉所有排列：n!
{
    if (path.size() == a.size()) {
        for (int x : path) cout &lt;&lt; x;
        cout &lt;&lt; " ";
        return;
    }
    for (size_t i = 0; i &lt; a.size(); i++) {
        if (used[i]) continue;
        used[i] = true; path.push_back(a[i]);      // 做選擇
        permute(a);
        path.pop_back(); used[i] = false;          // 撤銷選擇
    }
}

void combine(int start, int n, int k)              // 從 1..n 選 k 個的組合：C(n, k)
{
    if ((int)path.size() == k) {
        cout &lt;&lt; "[";
        for (size_t i = 0; i &lt; path.size(); i++) cout &lt;&lt; path[i] &lt;&lt; (i + 1 &lt; path.size() ? "," : "");
        cout &lt;&lt; "] ";
        return;
    }
    for (int i = start; i &lt;= n; i++) {
        path.push_back(i);
        combine(i + 1, n, k);                      // 下一個從 i+1 開始，避免重複
        path.pop_back();
    }
}

int main()
{
    vector&lt;int&gt; a = {1, 2, 3};
    used.assign(a.size(), false);
    permute(a);
    cout &lt;&lt; "\\n";
    combine(1, 4, 2);
    cout &lt;&lt; "\\n";
}</pre>` },
    { id: 'queens', title: 'N 皇后與剪枝', html: `
<p>在 n × n 棋盤放 n 個皇后，任兩個不能在同一列、同一行或同一斜線。逐列放置，放之前檢查是否和已放的皇后衝突，衝突就不往下（剪枝）：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int n, solutions = 0;
vector&lt;bool&gt; col, diag1, diag2;                    // 行、兩個方向的斜線是否被占用
vector&lt;int&gt; pos;

void solve(int row)
{
    if (row == n) {
        if (++solutions == 1) {                    // 印出第一組解
            for (int r = 0; r &lt; n; r++) {
                for (int c = 0; c &lt; n; c++) cout &lt;&lt; (pos[r] == c ? "Q " : ". ");
                cout &lt;&lt; "\\n";
            }
        }
        return;
    }
    for (int c = 0; c &lt; n; c++) {
        if (col[c] || diag1[row + c] || diag2[row - c + n - 1]) continue;   // 剪枝
        col[c] = diag1[row + c] = diag2[row - c + n - 1] = true;
        pos[row] = c;
        solve(row + 1);
        col[c] = diag1[row + c] = diag2[row - c + n - 1] = false;           // 撤銷
    }
}

int main()
{
    n = 8;
    col.assign(n, false); diag1.assign(2 * n, false); diag2.assign(2 * n, false); pos.assign(n, -1);
    solve(0);
    cout &lt;&lt; n &lt;&lt; " 皇后共有 " &lt;&lt; solutions &lt;&lt; " 組解\\n";
}</pre>
<p>同一條「左上到右下」斜線上 row - col 相同，「右上到左下」斜線上 row + col 相同，用陣列記錄就能 O(1) 檢查衝突。</p>
<div class="box tip"><b class="t">剪枝是回溯的靈魂</b>越早發現「這條路不可能成功」就越早回頭，搜尋量可以從天文數字降到可以接受。常見剪枝：已經超過目標就停止、排序後跳過重複元素、估計剩下的最佳可能也比目前答案差就停止。</div>
<table>
<tr><th>問題</th><th>解的數量</th><th>複雜度（無剪枝）</th></tr>
<tr><td>子集合</td><td>2<sup>n</sup></td><td>O(n · 2<sup>n</sup>)</td></tr>
<tr><td>排列</td><td>n!</td><td>O(n · n!)</td></tr>
<tr><td>組合 C(n, k)</td><td>n! / (k!(n-k)!)</td><td>O(k · C(n, k))</td></tr>
</table>` }
  ],
  keypoints: [
    '資料量小（n ≤ 20）時可以暴力列舉；用整數的位元表示子集合，共 2ⁿ 種。',
    '回溯法框架：做選擇 → 遞迴 → 撤銷選擇。',
    '排列用 used 陣列避免重複使用元素，共 n! 種；組合讓下一個從 i+1 開始，避免重複。',
    'N 皇后逐列放置，用 row+col 與 row-col 記錄斜線，O(1) 檢查衝突。',
    '剪枝越早發現不可能成功就越早回頭，大幅減少搜尋量。',
    '8 皇后共有 92 組解。'
  ]
}
);
