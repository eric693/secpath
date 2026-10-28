/* 資料結構 線性結構篇：陣列、串列、堆疊、佇列與雜湊
   <pre class="cpp"> 為可在網頁上編譯執行的範例；<pre class="out"> 為一般程式碼或示意圖
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 45,
  title: '資料結構概論與複雜度分析',
  summary: '什麼是資料結構與抽象資料型別、為什麼要分析複雜度、Big-O 的意義與常見複雜度、分析迴圈與遞迴的方法、最好最壞與平均情況、空間複雜度，以及攤銷分析。',
  sections: [
    { id: 'what', title: '什麼是資料結構', html: `
<p><b>資料結構（Data Structure）</b>是在電腦中組織與儲存資料的方式。同樣是存 100 萬筆學生資料，選對結構，查詢只要 0.00002 秒；選錯，可能要好幾秒。</p>
<table>
<tr><th>需求</th><th>適合的結構</th></tr>
<tr><td>依編號快速取得第 i 筆</td><td>陣列</td></tr>
<tr><td>頻繁在開頭或中間插入刪除</td><td>鏈結串列</td></tr>
<tr><td>復原（Undo）、括號配對</td><td>堆疊</td></tr>
<tr><td>排隊、依序處理工作</td><td>佇列</td></tr>
<tr><td>用帳號快速查詢會員</td><td>雜湊表</td></tr>
<tr><td>資料要保持排序又要快速增刪</td><td>平衡二元搜尋樹</td></tr>
<tr><td>每次取出優先權最高的工作</td><td>堆積</td></tr>
<tr><td>地圖路線、社群好友關係</td><td>圖</td></tr>
</table>
<p><b>抽象資料型別（ADT）</b>描述「能做哪些操作」（例如堆疊有 push、pop、top），而資料結構是「怎麼實作」。同一個 ADT 可以用不同結構實作：堆疊可以用陣列，也可以用鏈結串列。</p>
<div class="box tip"><b class="t">為什麼要親手實作</b>實務上大多直接使用 C++ STL、Java Collections 或 Python 內建型別。但只有理解它們的內部結構，才知道什麼時候該用哪一個、為什麼程式會慢。面試也常要求現場實作。</div>` },
    { id: 'bigo', title: 'Big-O 與常見複雜度', html: `
<p><b>時間複雜度</b>描述「資料量 n 變大時，執行步驟數成長的速度」。<b>Big-O</b> 表示上界，只保留成長最快的項、忽略常數：</p>
<pre class="out">3n² + 5n + 100   →  O(n²)      （n 很大時 n² 主導一切）
2n + 1000        →  O(n)
500              →  O(1)       （與 n 無關的固定步驟）</pre>
<table>
<tr><th>複雜度</th><th>名稱</th><th>n = 1,000 時約</th><th>例子</th></tr>
<tr><td>O(1)</td><td>常數</td><td>1</td><td>陣列依索引存取、雜湊表查詢</td></tr>
<tr><td>O(log n)</td><td>對數</td><td>10</td><td>二分搜尋、平衡 BST 操作</td></tr>
<tr><td>O(n)</td><td>線性</td><td>1,000</td><td>走訪陣列、線性搜尋</td></tr>
<tr><td>O(n log n)</td><td>線性對數</td><td>10,000</td><td>合併排序、快速排序（平均）</td></tr>
<tr><td>O(n²)</td><td>平方</td><td>1,000,000</td><td>雙層迴圈、氣泡排序</td></tr>
<tr><td>O(2<sup>n</sup>)</td><td>指數</td><td>天文數字</td><td>列舉所有子集合</td></tr>
</table>
<p>互動練習中的「時間複雜度比較」可以輸入 n，看各種複雜度的差距。</p>` },
    { id: 'analyze', title: '分析程式的複雜度', html: `
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

int main()
{
    int n = 1000;
    long long steps = 0;

    for (int i = 0; i &lt; n; i++) steps++;                  // O(n)
    cout &lt;&lt; "單層迴圈：" &lt;&lt; steps &lt;&lt; "\\n";

    steps = 0;
    for (int i = 0; i &lt; n; i++)
        for (int j = 0; j &lt; n; j++) steps++;              // O(n²)
    cout &lt;&lt; "雙層迴圈：" &lt;&lt; steps &lt;&lt; "\\n";

    steps = 0;
    for (int i = 0; i &lt; n; i++)
        for (int j = i + 1; j &lt; n; j++) steps++;          // n(n-1)/2，仍是 O(n²)
    cout &lt;&lt; "三角形迴圈：" &lt;&lt; steps &lt;&lt; "\\n";

    steps = 0;
    for (int i = 1; i &lt; n; i *= 2) steps++;               // 每次加倍：O(log n)
    cout &lt;&lt; "加倍迴圈：" &lt;&lt; steps &lt;&lt; "\\n";
}</pre>
<table>
<tr><th>程式結構</th><th>複雜度</th></tr>
<tr><td>依序執行的兩段程式</td><td>取較大者：O(n) + O(n²) = O(n²)</td></tr>
<tr><td>巢狀迴圈</td><td>相乘：外層 n 次 × 內層 m 次 = O(nm)</td></tr>
<tr><td>迴圈變數每次乘以或除以 2</td><td>O(log n)</td></tr>
<tr><td>遞迴</td><td>呼叫次數 × 每次的工作量，例如每次一半的二分搜尋為 O(log n)</td></tr>
</table>
<h3>最好、最壞與平均情況</h3>
<p>線性搜尋在陣列中找 x：第一個就是 x 時只比較 1 次（最好 O(1)），不在陣列中時要比較 n 次（最壞 O(n)）。一般說的複雜度，<b>沒有特別說明時指的是最壞情況</b>，因為它是保證。</p>
<h3>空間複雜度</h3>
<p>除了時間，也要分析額外使用的記憶體。原地反轉陣列只需幾個變數，是 O(1) 空間；複製一份陣列是 O(n) 空間；遞迴深度為 n 時，呼叫堆疊也佔 O(n) 空間。</p>` },
    { id: 'amortized', title: '攤銷分析：動態陣列為什麼快', html: `
<p>vector 的 push_back 在容量不夠時，要配置一塊<b>兩倍大</b>的新空間並搬移所有元素，這次是 O(n)。但這種情況很少發生，平均分攤到每次操作只有 O(1)，稱為<b>攤銷 O(1)</b>：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; v;
    size_t last = 0;
    for (int i = 1; i &lt;= 100; i++) {
        v.push_back(i);
        if (v.capacity() != last) {           // 容量改變時印出
            cout &lt;&lt; "第 " &lt;&lt; i &lt;&lt; " 次 push 後容量變成 " &lt;&lt; v.capacity() &lt;&lt; "\\n";
            last = v.capacity();
        }
    }
}</pre>
<p>容量依序是 1、2、4、8、16、32、64、128（GCC 的實作）。插入 n 個元素時，搬移的總次數約為 1 + 2 + 4 + … + n &lt; 2n，所以平均每次 push 是常數時間。</p>
<div class="box exam"><b class="t">面試常見題</b>「vector 的 push_back 時間複雜度是多少？」標準答案：攤銷 O(1)，最壞單次 O(n)。如果事先知道大小，用 reserve(n) 預先配置可以避免重新配置。</div>` }
  ],
  keypoints: [
    '資料結構是組織資料的方式；ADT 定義操作，資料結構決定實作。',
    'Big-O 描述資料量變大時步驟數的成長速度，只保留最高次項、忽略常數。',
    '常見複雜度：O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)。',
    '巢狀迴圈相乘、依序程式取最大；迴圈變數每次加倍或減半為 O(log n)。',
    '沒有特別說明時，複雜度指最壞情況；空間複雜度看額外使用的記憶體。',
    'vector::push_back 容量加倍，是攤銷 O(1)、最壞單次 O(n)。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: '陣列與字串',
  summary: '陣列的記憶體配置與位址計算、靜態與動態陣列、插入刪除的成本、二維陣列的列優先存放、字串的操作，以及前綴和、雙指標、原地反轉等陣列基本技巧。',
  sections: [
    { id: 'memory', title: '陣列的記憶體配置', html: `
<p>陣列把元素<b>連續</b>存放在記憶體中。知道起始位址，就能用公式直接算出第 i 個元素的位址，所以依索引存取是 O(1)：</p>
<pre class="out">位址(a[i]) = 起始位址 + i × 每個元素的大小

int a[5] 起始位址 1000，int 佔 4 位元組：
a[0] → 1000   a[1] → 1004   a[2] → 1008   a[3] → 1012   a[4] → 1016</pre>
<table>
<tr><th>操作</th><th>複雜度</th><th>原因</th></tr>
<tr><td>依索引讀寫 a[i]</td><td>O(1)</td><td>位址可以直接計算</td></tr>
<tr><td>在尾端加入（動態陣列）</td><td>攤銷 O(1)</td><td>偶爾需要擴充容量</td></tr>
<tr><td>在中間或開頭插入、刪除</td><td>O(n)</td><td>後面的元素都要往後或往前搬</td></tr>
<tr><td>搜尋特定值（未排序）</td><td>O(n)</td><td>要逐一比較</td></tr>
<tr><td>搜尋特定值（已排序）</td><td>O(log n)</td><td>二分搜尋</td></tr>
</table>
<div class="box memo"><b class="t">快取友善</b>陣列連續存放，CPU 讀取一個元素時會順便把附近的資料載入快取，所以依序走訪陣列非常快。這是陣列在實務上常比鏈結串列更快的主要原因，即使理論複雜度相同。</div>` },
    { id: 'insert', title: '插入與刪除的成本', html: `
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

void print(const int a[], int n)
{
    for (int i = 0; i &lt; n; i++) cout &lt;&lt; a[i] &lt;&lt; " ";
    cout &lt;&lt; "\\n";
}

int main()
{
    int a[10] = {10, 20, 30, 40, 50};
    int n = 5;

    int pos = 1, value = 15;                   // 在索引 1 插入 15
    for (int i = n; i &gt; pos; i--) a[i] = a[i - 1];   // 從後往前搬，避免覆蓋
    a[pos] = value;
    n++;
    print(a, n);

    pos = 3;                                   // 刪除索引 3
    for (int i = pos; i &lt; n - 1; i++) a[i] = a[i + 1];   // 從前往後搬
    n--;
    print(a, n);
}</pre>
<p>插入時要<b>從後往前</b>搬，否則會把還沒搬的資料覆蓋掉。在開頭插入要搬 n 個元素，這就是 O(n) 的由來。</p>` },
    { id: 'matrix', title: '二維陣列', html: `
<p>C／C++ 的二維陣列以<b>列優先（row-major）</b>順序存放：第 0 列全部存完，才存第 1 列。</p>
<pre class="out">int m[3][4];   位址(m[i][j]) = 起始位址 + (i × 4 + j) × sizeof(int)

m[0][0] m[0][1] m[0][2] m[0][3] m[1][0] m[1][1] … m[2][3]</pre>
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

int main()
{
    int m[3][4];
    for (int i = 0; i &lt; 3; i++)
        for (int j = 0; j &lt; 4; j++)
            m[i][j] = i * 4 + j;
    int *flat = &amp;m[0][0];                      // 當成一維陣列看
    cout &lt;&lt; "m[2][1] = " &lt;&lt; m[2][1] &lt;&lt; "，等於 flat[" &lt;&lt; 2 * 4 + 1 &lt;&lt; "] = " &lt;&lt; flat[2 * 4 + 1] &lt;&lt; "\\n";

    long long sum = 0;
    for (int i = 0; i &lt; 3; i++)                // 依列走訪（快取友善）
        for (int j = 0; j &lt; 4; j++) sum += m[i][j];
    cout &lt;&lt; "總和 " &lt;&lt; sum &lt;&lt; "\\n";
}</pre>
<div class="box exam"><b class="t">考試常見題</b>「int A[10][20] 起始位址為 100，每個元素 4 位元組，A[3][5] 的位址？」列優先：100 + (3 × 20 + 5) × 4 = 360。若為行優先（Fortran、MATLAB）：100 + (5 × 10 + 3) × 4 = 312。</div>` },
    { id: 'tricks', title: '陣列的基本技巧', html: `
<h3>前綴和：O(1) 查詢區間和</h3>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; a = {3, 1, 4, 1, 5, 9, 2, 6};
    int n = a.size();
    vector&lt;long long&gt; pre(n + 1, 0);           // pre[i] = a[0] + … + a[i-1]
    for (int i = 0; i &lt; n; i++) pre[i + 1] = pre[i] + a[i];
    int l = 2, r = 5;                          // 求 a[2..5] 的總和
    cout &lt;&lt; "a[2..5] 總和 = " &lt;&lt; pre[r + 1] - pre[l] &lt;&lt; "\\n";   // 4 + 1 + 5 + 9 = 19
}</pre>
<h3>雙指標：原地反轉與判斷回文</h3>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
using namespace std;

void reverse_in_place(vector&lt;int&gt; &amp;a)          // O(n) 時間、O(1) 額外空間
{
    int l = 0, r = (int)a.size() - 1;
    while (l &lt; r) swap(a[l++], a[r--]);
}

bool is_palindrome(const string &amp;s)
{
    int l = 0, r = (int)s.size() - 1;
    while (l &lt; r) if (s[l++] != s[r--]) return false;
    return true;
}

int main()
{
    vector&lt;int&gt; a = {1, 2, 3, 4, 5};
    reverse_in_place(a);
    for (int x : a) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n" &lt;&lt; boolalpha &lt;&lt; is_palindrome("level") &lt;&lt; " " &lt;&lt; is_palindrome("hello") &lt;&lt; "\\n";
}</pre>
<p>雙指標、滑動視窗等技巧會在「演算法」課程詳細介紹。這裡先記住：<b>能用一次走訪解決的問題，就不要用雙層迴圈</b>。</p>` }
  ],
  keypoints: [
    '陣列元素連續存放，位址 = 起始位址 + i × 元素大小，所以依索引存取是 O(1)。',
    '在中間或開頭插入、刪除要搬移元素，為 O(n)；插入時要從後往前搬。',
    '陣列連續存放、快取友善，依序走訪非常快。',
    'C／C++ 二維陣列為列優先：位址 = 起始 + (i × 欄數 + j) × 元素大小。',
    '前綴和 pre[r+1] - pre[l] 可 O(1) 查詢區間和。',
    '雙指標可原地反轉陣列、判斷回文，只需 O(1) 額外空間。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 55,
  title: '鏈結串列',
  summary: '節點與指標、單向鏈結串列的走訪、插入與刪除、虛擬頭節點技巧、反轉串列、快慢指標找中點與偵測環、合併兩個已排序串列、雙向與環狀串列，以及和陣列的比較。',
  sections: [
    { id: 'node', title: '節點與串列', html: `
<p><b>鏈結串列（Linked List）</b>由節點組成，每個節點存放資料與指向下一個節點的指標。節點在記憶體中不必連續：</p>
<pre class="out">head
 │
 ▼
┌────┬───┐   ┌────┬───┐   ┌────┬──────┐
│ 10 │ ●─┼──►│ 20 │ ●─┼──►│ 30 │ null │
└────┴───┘   └────┴───┘   └────┴──────┘</pre>
<table>
<tr><th>操作</th><th>陣列</th><th>鏈結串列</th></tr>
<tr><td>存取第 i 個</td><td>O(1)</td><td>O(n)，要從 head 一個一個走</td></tr>
<tr><td>在開頭插入／刪除</td><td>O(n)</td><td><b>O(1)</b></td></tr>
<tr><td>已知節點位置後插入／刪除</td><td>O(n)</td><td><b>O(1)</b></td></tr>
<tr><td>記憶體</td><td>連續、快取友善</td><td>分散，每個節點多一個指標</td></tr>
</table>` },
    { id: 'basic', title: '走訪、插入與刪除', html: `
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

struct Node {
    int val;
    Node *next;
    Node(int v, Node *n = nullptr) : val(v), next(n) {}
};

void print(Node *head)
{
    for (Node *p = head; p != nullptr; p = p-&gt;next) cout &lt;&lt; p-&gt;val &lt;&lt; " -&gt; ";
    cout &lt;&lt; "null\\n";
}

Node *push_front(Node *head, int v) { return new Node(v, head); }   // O(1)

void insert_after(Node *prev, int v)                                // 在 prev 之後插入，O(1)
{
    prev-&gt;next = new Node(v, prev-&gt;next);
}

Node *remove_value(Node *head, int v)                               // 刪除第一個值為 v 的節點
{
    Node dummy(0, head);                      // 虛擬頭節點：讓刪除第一個節點也不用特別處理
    for (Node *p = &amp;dummy; p-&gt;next; p = p-&gt;next) {
        if (p-&gt;next-&gt;val == v) {
            Node *dead = p-&gt;next;
            p-&gt;next = dead-&gt;next;
            delete dead;
            break;
        }
    }
    return dummy.next;
}

void free_list(Node *head)
{
    while (head) { Node *n = head-&gt;next; delete head; head = n; }
}

int main()
{
    Node *head = nullptr;
    head = push_front(head, 30);
    head = push_front(head, 10);
    insert_after(head, 20);                   // 10 之後插入 20
    print(head);
    head = remove_value(head, 10);            // 刪除第一個節點
    print(head);
    free_list(head);
}</pre>
<div class="box tip"><b class="t">虛擬頭節點（dummy node）</b>在 head 前面放一個假節點，刪除或插入第一個節點時就和其他位置一樣處理，不必寫特殊情況。這是串列題目最常用的技巧。</div>` },
    { id: 'reverse', title: '反轉串列', html: `
<p>反轉鏈結串列是面試出現率最高的題目之一。用三個指標，把每個節點的 next 改指向前一個節點：</p>
<pre class="out">prev   curr
null    1 → 2 → 3 → null
        步驟：next = curr-&gt;next; curr-&gt;next = prev; prev = curr; curr = next;
結果：null ← 1 ← 2 ← 3   （prev 成為新的 head）</pre>
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

struct Node { int val; Node *next; };

Node *reverse_list(Node *head)
{
    Node *prev = nullptr, *curr = head;
    while (curr) {
        Node *next = curr-&gt;next;   // 1. 先記住下一個
        curr-&gt;next = prev;         // 2. 反轉指標
        prev = curr;               // 3. prev、curr 往前走
        curr = next;
    }
    return prev;
}

int main()
{
    Node n5{5, nullptr}, n4{4, &amp;n5}, n3{3, &amp;n4}, n2{2, &amp;n3}, n1{1, &amp;n2};
    for (Node *p = reverse_list(&amp;n1); p; p = p-&gt;next) cout &lt;&lt; p-&gt;val &lt;&lt; " ";
    cout &lt;&lt; "\\n";
}</pre>` },
    { id: 'fastslow', title: '快慢指標', html: `
<p>兩個指標同時從 head 出發，慢指標一次走一步、快指標一次走兩步：</p>
<ul>
<li>快指標走到結尾時，慢指標剛好在<b>中點</b>。</li>
<li>如果串列有<b>環</b>，快指標最終一定會追上慢指標（Floyd 判圈演算法）。</li>
</ul>
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

struct Node { int val; Node *next; };

Node *middle(Node *head)
{
    Node *slow = head, *fast = head;
    while (fast &amp;&amp; fast-&gt;next) {
        slow = slow-&gt;next;
        fast = fast-&gt;next-&gt;next;
    }
    return slow;
}

bool has_cycle(Node *head)
{
    Node *slow = head, *fast = head;
    while (fast &amp;&amp; fast-&gt;next) {
        slow = slow-&gt;next;
        fast = fast-&gt;next-&gt;next;
        if (slow == fast) return true;
    }
    return false;
}

int main()
{
    Node n5{5, nullptr}, n4{4, &amp;n5}, n3{3, &amp;n4}, n2{2, &amp;n3}, n1{1, &amp;n2};
    cout &lt;&lt; "中點：" &lt;&lt; middle(&amp;n1)-&gt;val &lt;&lt; "\\n";
    cout &lt;&lt; boolalpha &lt;&lt; "有環？" &lt;&lt; has_cycle(&amp;n1) &lt;&lt; "\\n";
    n5.next = &amp;n3;                       // 讓 5 指回 3，形成環
    cout &lt;&lt; "加上環之後？" &lt;&lt; has_cycle(&amp;n1) &lt;&lt; "\\n";
}</pre>` },
    { id: 'merge', title: '合併已排序串列與其他變形', html: `
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

struct Node { int val; Node *next; };

Node *merge(Node *a, Node *b)            // 兩個已排序的串列合併成一個已排序串列
{
    Node dummy{0, nullptr};
    Node *tail = &amp;dummy;
    while (a &amp;&amp; b) {
        if (a-&gt;val &lt;= b-&gt;val) { tail-&gt;next = a; a = a-&gt;next; }
        else { tail-&gt;next = b; b = b-&gt;next; }
        tail = tail-&gt;next;
    }
    tail-&gt;next = a ? a : b;              // 接上剩下的部分
    return dummy.next;
}

int main()
{
    Node a3{7, nullptr}, a2{4, &amp;a3}, a1{1, &amp;a2};
    Node b3{8, nullptr}, b2{5, &amp;b3}, b1{2, &amp;b2};
    for (Node *p = merge(&amp;a1, &amp;b1); p; p = p-&gt;next) cout &lt;&lt; p-&gt;val &lt;&lt; " ";
    cout &lt;&lt; "\\n";
}</pre>
<table>
<tr><th>變形</th><th>特色</th><th>用途</th></tr>
<tr><td>雙向鏈結串列</td><td>每個節點有 prev 與 next</td><td>可以往回走、O(1) 刪除已知節點；C++ 的 std::list、LRU 快取</td></tr>
<tr><td>環狀鏈結串列</td><td>最後一個節點指回 head</td><td>輪流排程（Round Robin）、約瑟夫問題</td></tr>
</table>
<div class="box exam"><b class="t">串列題目的檢查清單</b>空串列（head 為 null）、只有一個節點、操作第一個或最後一個節點時會不會出錯？每次存取 p->next 之前，確認 p 不是 null。</div>` }
  ],
  keypoints: [
    '鏈結串列由節點組成，節點不必連續；存取第 i 個為 O(n)，在已知位置插入刪除為 O(1)。',
    '虛擬頭節點讓第一個節點的插入與刪除不需特別處理。',
    '反轉串列用 prev、curr、next 三個指標，先記住 next 再反轉。',
    '快慢指標：快指標走到結尾時慢指標在中點；兩者相遇代表有環。',
    '合併兩個已排序串列：比較兩邊的頭，小的接到結果後面，最後接上剩餘部分。',
    '雙向串列可以往回走並 O(1) 刪除已知節點，常用於 LRU 快取。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 45,
  title: '堆疊',
  summary: '堆疊的 ADT 與後進先出、用陣列與鏈結串列實作、函式呼叫堆疊、括號配對、中序轉後序與後序運算式求值、單調堆疊解「下一個更大的元素」。',
  sections: [
    { id: 'adt', title: '後進先出', html: `
<p><b>堆疊（Stack）</b>只能從頂端放入與取出，最後放進去的最先出來（LIFO，Last In First Out），像一疊盤子：</p>
<table>
<tr><th>操作</th><th>意義</th><th>複雜度</th></tr>
<tr><td>push(x)</td><td>把 x 放到頂端</td><td>O(1)</td></tr>
<tr><td>pop()</td><td>移除頂端</td><td>O(1)</td></tr>
<tr><td>top()</td><td>查看頂端（不移除）</td><td>O(1)</td></tr>
<tr><td>empty()</td><td>是否為空</td><td>O(1)</td></tr>
</table>
<p>生活中的例子：瀏覽器的「上一頁」、編輯器的「復原」、函式呼叫（最後呼叫的函式最先返回，這就是<b>呼叫堆疊</b>，遞迴太深會造成 stack overflow）。互動練習中的「堆疊與佇列模擬」可以逐步操作觀察。</p>` },
    { id: 'impl', title: '用陣列實作堆疊', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
#include &lt;vector&gt;
using namespace std;

class Stack {
    vector&lt;int&gt; data;                           // 用動態陣列存放，尾端就是頂端
public:
    void push(int x) { data.push_back(x); }
    void pop()
    {
        if (data.empty()) throw runtime_error("堆疊是空的");
        data.pop_back();
    }
    int top() const
    {
        if (data.empty()) throw runtime_error("堆疊是空的");
        return data.back();
    }
    bool empty() const { return data.empty(); }
    size_t size() const { return data.size(); }
};

int main()
{
    Stack s;
    for (int x : {1, 2, 3}) s.push(x);
    cout &lt;&lt; "top = " &lt;&lt; s.top() &lt;&lt; "，size = " &lt;&lt; s.size() &lt;&lt; "\\n";
    while (!s.empty()) { cout &lt;&lt; s.top() &lt;&lt; " "; s.pop(); }   // 倒序輸出：3 2 1
    cout &lt;&lt; "\\n";
    try { s.pop(); } catch (const exception &amp;e) { cout &lt;&lt; "錯誤：" &lt;&lt; e.what() &lt;&lt; "\\n"; }
}</pre>
<p>用陣列的尾端當頂端，push 與 pop 都是 O(1)。也可以用鏈結串列，在開頭插入與刪除。C++ 直接用 <code>std::stack</code>。</p>` },
    { id: 'expr', title: '運算式：中序、後序與求值', html: `
<table>
<tr><th>表示法</th><th>寫法</th><th>特色</th></tr>
<tr><td>中序（Infix）</td><td>(3 + 4) * 5</td><td>人類習慣，需要括號與優先順序</td></tr>
<tr><td>前序（Prefix）</td><td>* + 3 4 5</td><td>運算子在前，波蘭表示法</td></tr>
<tr><td>後序（Postfix）</td><td>3 4 + 5 *</td><td>運算子在後，<b>不需要括號</b>，電腦最容易計算</td></tr>
</table>
<h3>後序運算式求值</h3>
<p>由左到右掃描：遇到數字就 push；遇到運算子就 pop 兩個數字計算，再把結果 push 回去。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;sstream&gt;
#include &lt;stack&gt;
#include &lt;string&gt;
using namespace std;

long long eval_postfix(const string &amp;expr)
{
    stack&lt;long long&gt; st;
    stringstream ss(expr);
    string tok;
    while (ss &gt;&gt; tok) {
        if (tok == "+" || tok == "-" || tok == "*" || tok == "/") {
            long long b = st.top(); st.pop();      // 注意：先取出的是右運算元
            long long a = st.top(); st.pop();
            if (tok == "+") st.push(a + b);
            else if (tok == "-") st.push(a - b);
            else if (tok == "*") st.push(a * b);
            else st.push(a / b);
        } else {
            st.push(stoll(tok));
        }
    }
    return st.top();
}

int main()
{
    cout &lt;&lt; eval_postfix("3 4 + 5 *") &lt;&lt; "\\n";        // (3 + 4) * 5 = 35
    cout &lt;&lt; eval_postfix("5 1 2 + 4 * + 3 -") &lt;&lt; "\\n";  // 5 + (1 + 2) * 4 - 3 = 14
}</pre>
<div class="box exam"><b class="t">中序轉後序（考試常考）</b>掃描中序式：數字直接輸出；左括號 push；右括號時一直 pop 輸出直到左括號；運算子時，先把堆疊中優先順序<b>大於等於</b>它的運算子 pop 輸出，再 push 自己；最後把堆疊剩下的全部輸出。例如 <code>A + B * C</code> → <code>A B C * +</code>，<code>(A + B) * C</code> → <code>A B + C *</code>。</div>` },
    { id: 'mono', title: '單調堆疊', html: `
<p>「每個元素右邊第一個比它大的數」用雙層迴圈是 O(n²)。<b>單調堆疊</b>維持堆疊中的元素單調遞減，每個元素最多進出堆疊一次，總共 O(n)：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;stack&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; temps = {73, 74, 75, 71, 69, 72, 76, 73};   // 每日氣溫
    int n = temps.size();
    vector&lt;int&gt; wait(n, 0);                                 // 要等幾天才會更暖
    stack&lt;int&gt; st;                                          // 存放還沒找到答案的日子（索引）
    for (int i = 0; i &lt; n; i++) {
        while (!st.empty() &amp;&amp; temps[i] &gt; temps[st.top()]) { // 今天比堆疊頂端那天暖
            wait[st.top()] = i - st.top();
            st.pop();
        }
        st.push(i);
    }
    for (int w : wait) cout &lt;&lt; w &lt;&lt; " ";
    cout &lt;&lt; "\\n";
}</pre>
<p>這是 LeetCode「Daily Temperatures」的經典解法。單調堆疊也用於柱狀圖最大矩形、股票跨度等問題。</p>` }
  ],
  keypoints: [
    '堆疊後進先出（LIFO），push、pop、top 都是 O(1)。',
    '函式呼叫使用呼叫堆疊，遞迴太深會造成堆疊溢位。',
    '用陣列實作時以尾端為頂端；C++ 使用 std::stack。',
    '後序運算式不需括號：數字 push，運算子 pop 兩個計算後 push 回去（先 pop 的是右運算元）。',
    '中序轉後序：運算子入堆疊前，先 pop 優先順序大於等於它的運算子。',
    '單調堆疊每個元素最多進出一次，O(n) 解「下一個更大的元素」。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 40,
  title: '佇列與雙端佇列',
  summary: '佇列的先進先出、用陣列實作的問題與環形佇列、用鏈結串列實作、雙端佇列 deque、滑動視窗最大值，以及佇列在排程與 BFS 中的應用。',
  sections: [
    { id: 'queue', title: '先進先出', html: `
<p><b>佇列（Queue）</b>從尾端加入、從前端取出，先進先出（FIFO），像排隊買票：</p>
<table>
<tr><th>操作</th><th>意義</th><th>複雜度</th></tr>
<tr><td>push／enqueue(x)</td><td>加到尾端</td><td>O(1)</td></tr>
<tr><td>pop／dequeue()</td><td>移除前端</td><td>O(1)</td></tr>
<tr><td>front()</td><td>查看前端</td><td>O(1)</td></tr>
</table>
<p>應用：印表機工作排程、訊息佇列（Kafka、RabbitMQ）、CPU 排程、<b>BFS 廣度優先搜尋</b>（第 10 章）。</p>` },
    { id: 'circular', title: '環形佇列', html: `
<p>用一般陣列實作佇列，front 一直往後移，前面的空間就浪費了。<b>環形佇列</b>讓索引到尾端後繞回開頭，用取餘數 <code>% capacity</code> 實現：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

class CircularQueue {
    vector&lt;int&gt; buf;
    int head = 0, count = 0;
public:
    explicit CircularQueue(int cap) : buf(cap) {}
    bool push(int x)
    {
        if (count == (int)buf.size()) return false;            // 滿了
        buf[(head + count) % buf.size()] = x;                   // 尾端位置繞回開頭
        count++;
        return true;
    }
    bool pop()
    {
        if (count == 0) return false;
        head = (head + 1) % buf.size();
        count--;
        return true;
    }
    int front() const { return buf[head]; }
    bool empty() const { return count == 0; }
    int size() const { return count; }
};

int main()
{
    CircularQueue q(3);
    cout &lt;&lt; boolalpha &lt;&lt; q.push(1) &lt;&lt; q.push(2) &lt;&lt; q.push(3) &lt;&lt; q.push(4) &lt;&lt; "\\n";   // 第 4 個放不下
    q.pop(); q.pop();                      // 移除 1、2
    q.push(5); q.push(6);                  // 5、6 繞回陣列前面的空位
    while (!q.empty()) { cout &lt;&lt; q.front() &lt;&lt; " "; q.pop(); }
    cout &lt;&lt; "\\n";
}</pre>
<div class="box exam"><b class="t">考試常見題</b>只用 front 與 rear 兩個指標（不記錄 count）時，「空」與「滿」都是 front == rear，無法分辨。常見解法是<b>犧牲一格</b>：當 (rear + 1) % n == front 時視為滿，所以容量 n 的陣列最多存 n - 1 個元素；或另外記錄元素個數。</div>` },
    { id: 'deque', title: '雙端佇列與滑動視窗', html: `
<p><b>雙端佇列（Deque，Double-Ended Queue）</b>兩端都能 O(1) 加入與移除，可以同時當堆疊和佇列使用。</p>
<h3>滑動視窗最大值</h3>
<p>每個長度 k 的視窗中的最大值。用 deque 存放索引，並維持對應的值<b>單調遞減</b>：</p>
<pre class="cpp">#include &lt;deque&gt;
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; a = {1, 3, -1, -3, 5, 3, 6, 7};
    int k = 3;
    deque&lt;int&gt; dq;                                   // 存索引，對應的值由大到小
    for (int i = 0; i &lt; (int)a.size(); i++) {
        if (!dq.empty() &amp;&amp; dq.front() &lt;= i - k) dq.pop_front();      // 移除離開視窗的
        while (!dq.empty() &amp;&amp; a[dq.back()] &lt;= a[i]) dq.pop_back();  // 比 a[i] 小的不可能再是最大值
        dq.push_back(i);
        if (i &gt;= k - 1) cout &lt;&lt; a[dq.front()] &lt;&lt; " ";                 // 前端就是視窗最大值
    }
    cout &lt;&lt; "\\n";
}</pre>
<p>每個元素最多進出 deque 一次，總共 O(n)，比每個視窗都重新找最大值的 O(nk) 快很多。</p>
<table>
<tr><th>需求</th><th>C++ STL</th></tr>
<tr><td>堆疊</td><td><code>std::stack</code>（預設底層是 deque）</td></tr>
<tr><td>佇列</td><td><code>std::queue</code></td></tr>
<tr><td>兩端操作</td><td><code>std::deque</code></td></tr>
<tr><td>優先權高的先出</td><td><code>std::priority_queue</code>（第 9 章的堆積）</td></tr>
</table>` }
  ],
  keypoints: [
    '佇列先進先出（FIFO），從尾端加入、從前端取出，皆為 O(1)。',
    '環形佇列以 % capacity 讓索引繞回開頭，避免浪費前面的空間。',
    '只用 front、rear 時空與滿無法分辨，常犧牲一格：容量 n 最多存 n - 1 個。',
    '雙端佇列兩端都能 O(1) 加入移除，可同時當堆疊與佇列。',
    '滑動視窗最大值用單調遞減的 deque，總共 O(n)。',
    '佇列的應用：工作排程、訊息佇列、BFS。'
  ]
},
{
  id: 'c06', subject: 1, minutes: 50,
  title: '雜湊表',
  summary: '雜湊表的原理、雜湊函數的設計、碰撞與鏈結法、開放定址法（線性探測）、負載因子與重新雜湊、最差情況，以及兩數之和、字母異位詞、出現次數統計等經典應用。',
  sections: [
    { id: 'idea', title: '雜湊的原理', html: `
<p>陣列依索引存取是 O(1)，但如果要用「學號 A1234」或「Email」查資料呢？<b>雜湊表（Hash Table）</b>用<b>雜湊函數</b>把鍵轉成陣列索引，平均 O(1) 就能查詢：</p>
<pre class="out">鍵 "apple"  ──雜湊函數──►  索引 3  ──►  table[3] 存放 ("apple", 5)

常見的整數雜湊函數：h(k) = k % m    （m 為表的大小，通常選質數）
k = 23, m = 7  →  23 % 7 = 2</pre>
<p>好的雜湊函數要：計算快、把鍵<b>均勻</b>分散到各個位置、相同的鍵一定得到相同的索引。</p>` },
    { id: 'collision', title: '碰撞與處理方式', html: `
<p>不同的鍵可能算出相同的索引，稱為<b>碰撞（collision）</b>。例如 m = 7 時，3、10、17 都會得到 3。兩種主要的處理方式：</p>
<table>
<tr><th></th><th>鏈結法（Chaining）</th><th>開放定址法（Open Addressing）</th></tr>
<tr><td>做法</td><td>每個位置放一個串列，碰撞的元素串在一起</td><td>碰撞時依規則找下一個空位</td></tr>
<tr><td>探測方式</td><td>—</td><td>線性探測 (h + i) % m、平方探測 (h + i²) % m、雙重雜湊</td></tr>
<tr><td>優點</td><td>簡單，負載因子可以大於 1</td><td>記憶體連續、快取友善</td></tr>
<tr><td>缺點</td><td>串列的指標額外佔空間</td><td>線性探測會形成「叢集」；刪除要特別標記</td></tr>
</table>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;list&gt;
#include &lt;vector&gt;
using namespace std;

class HashSet {                                  // 鏈結法實作的整數集合
    vector&lt;list&lt;int&gt;&gt; buckets;
    int h(int k) const { return ((k % (int)buckets.size()) + (int)buckets.size()) % (int)buckets.size(); }
public:
    explicit HashSet(int m) : buckets(m) {}
    void insert(int k) { if (!contains(k)) buckets[h(k)].push_back(k); }
    bool contains(int k) const
    {
        for (int x : buckets[h(k)]) if (x == k) return true;
        return false;
    }
    void dump() const
    {
        for (size_t i = 0; i &lt; buckets.size(); i++) {
            cout &lt;&lt; i &lt;&lt; ": ";
            for (int x : buckets[i]) cout &lt;&lt; x &lt;&lt; " ";
            cout &lt;&lt; "\\n";
        }
    }
};

int main()
{
    HashSet s(7);
    for (int k : {10, 22, 31, 4, 15, 28, 17}) s.insert(k);
    s.dump();
    cout &lt;&lt; boolalpha &lt;&lt; s.contains(15) &lt;&lt; " " &lt;&lt; s.contains(16) &lt;&lt; "\\n";
}</pre>
<p>互動練習中的「雜湊表模擬」可以比較鏈結法與線性探測，看每個鍵最後放在哪裡。</p>` },
    { id: 'load', title: '負載因子與最差情況', html: `
<p><b>負載因子（load factor）</b>α = 元素個數 ÷ 表的大小。α 越大，碰撞越多、查詢越慢。常見做法是當 α 超過門檻（例如 0.75 或 1）時，<b>重新雜湊（rehash）</b>：配置約兩倍大的表，把所有元素重新放進去。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;unordered_map&gt;
using namespace std;

int main()
{
    unordered_map&lt;int, int&gt; m;
    cout &lt;&lt; "初始 bucket 數：" &lt;&lt; m.bucket_count() &lt;&lt; "\\n";
    for (int i = 0; i &lt; 100; i++) m[i] = i;
    cout &lt;&lt; "100 筆後 bucket 數：" &lt;&lt; m.bucket_count()
         &lt;&lt; "，負載因子：" &lt;&lt; m.load_factor()
         &lt;&lt; "，上限：" &lt;&lt; m.max_load_factor() &lt;&lt; "\\n";
}</pre>
<div class="box warn"><b class="t">雜湊表的最差情況</b>如果所有鍵都碰撞到同一個位置，雜湊表就退化成一條串列，查詢變成 O(n)。攻擊者若知道雜湊函數，可以刻意送出會碰撞的資料讓伺服器變慢（雜湊碰撞攻擊），所以許多語言會使用隨機化的雜湊函數。程式競賽中也有人刻意設計資料讓 unordered_map 變慢。</div>` },
    { id: 'apps', title: '經典應用', html: `
<pre class="cpp">#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;unordered_map&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    // 1. 兩數之和：找出和為 target 的兩個索引，O(n)
    vector&lt;int&gt; nums = {2, 7, 11, 15};
    int target = 26;
    unordered_map&lt;int, int&gt; seen;               // 數值 → 索引
    for (int i = 0; i &lt; (int)nums.size(); i++) {
        auto it = seen.find(target - nums[i]);
        if (it != seen.end()) { cout &lt;&lt; "兩數之和：" &lt;&lt; it-&gt;second &lt;&lt; " " &lt;&lt; i &lt;&lt; "\\n"; break; }
        seen[nums[i]] = i;
    }

    // 2. 字母異位詞分組：排序後的字串當作鍵
    vector&lt;string&gt; words = {"eat", "tea", "tan", "ate", "nat", "bat"};
    unordered_map&lt;string, vector&lt;string&gt;&gt; groups;
    for (const auto &amp;w : words) {
        string key = w;
        sort(key.begin(), key.end());
        groups[key].push_back(w);
    }
    cout &lt;&lt; "異位詞組數：" &lt;&lt; groups.size() &lt;&lt; "，aet 組有 " &lt;&lt; groups["aet"].size() &lt;&lt; " 個\\n";

    // 3. 第一個不重複的字元
    string s = "swiss";
    unordered_map&lt;char, int&gt; cnt;
    for (char c : s) cnt[c]++;
    for (char c : s) if (cnt[c] == 1) { cout &lt;&lt; "第一個不重複：" &lt;&lt; c &lt;&lt; "\\n"; break; }
}</pre>
<div class="box tip"><b class="t">看到「快速查詢是否存在」就想到雜湊</b>判斷重複、統計次數、記錄看過的值、用某個特徵分組，幾乎都可以用雜湊表把 O(n²) 降到 O(n)。代價是需要 O(n) 的額外空間，而且資料沒有順序。</div>` }
  ],
  keypoints: [
    '雜湊表用雜湊函數把鍵轉成索引，查詢、插入、刪除平均 O(1)。',
    '整數常用 h(k) = k % m，m 通常選質數；好的雜湊函數要快且分布均勻。',
    '碰撞處理：鏈結法把碰撞的元素串在一起；開放定址法依規則找下一個空位（線性探測、平方探測）。',
    '負載因子 α = 元素數 ÷ 表大小，超過門檻時重新雜湊到約兩倍大的表。',
    '所有鍵都碰撞時退化為 O(n)；雜湊碰撞可能被用來攻擊。',
    '兩數之和、統計次數、異位詞分組等問題用雜湊表可從 O(n²) 降到 O(n)。'
  ]
}
);
