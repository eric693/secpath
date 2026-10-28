/* 資料結構 非線性結構篇：樹、堆積、圖與進階結構
   <pre class="cpp"> 為可在網頁上編譯執行的範例；<pre class="out"> 為一般程式碼或示意圖
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 50,
  title: '樹與二元樹',
  summary: '樹的術語（根、葉、深度、高度、度數）、二元樹的種類（滿、完全、歪斜）、二元樹的性質、節點與陣列兩種表示法、前序／中序／後序／層序走訪，以及用遞迴計算高度與節點數。',
  sections: [
    { id: 'terms', title: '樹的術語', html: `
<p><b>樹（Tree）</b>是有階層關係的非線性結構，例如資料夾、公司組織圖、網頁的 DOM、資料庫索引。</p>
<pre class="out">              A          ← 根（root），深度 0
            /   \\
           B     C       ← 深度 1；B、C 互為兄弟（sibling）
          / \\     \\
         D   E     F     ← 深度 2；D、E、F 沒有子節點，稱為葉（leaf）

樹的高度 = 從根到最深葉節點的邊數 = 2</pre>
<table>
<tr><th>術語</th><th>意義</th></tr>
<tr><td>父節點／子節點</td><td>A 是 B 的父節點，B 是 A 的子節點</td></tr>
<tr><td>度數（degree）</td><td>一個節點的子節點個數；B 的度數為 2</td></tr>
<tr><td>深度（depth）</td><td>從根到該節點的邊數</td></tr>
<tr><td>高度（height）</td><td>從該節點到最深葉節點的邊數（有些教科書以節點數計算，考試要看定義）</td></tr>
<tr><td>子樹</td><td>一個節點與它所有的後代</td></tr>
</table>
<p>n 個節點的樹恰好有 <b>n - 1 條邊</b>（除了根，每個節點都有一條連到父節點的邊）。</p>` },
    { id: 'binary', title: '二元樹的種類與性質', html: `
<p><b>二元樹（Binary Tree）</b>每個節點最多有兩個子節點：左子節點與右子節點。</p>
<table>
<tr><th>種類</th><th>定義</th></tr>
<tr><td>滿二元樹（Full／Perfect）</td><td>每一層都填滿；高度 h 的滿二元樹有 2<sup>h+1</sup> - 1 個節點</td></tr>
<tr><td>完全二元樹（Complete）</td><td>除了最後一層都填滿，最後一層由左到右連續填入；堆積就是完全二元樹</td></tr>
<tr><td>歪斜樹（Skewed）</td><td>每個節點都只有左（或只有右）子節點，形狀像串列</td></tr>
</table>
<table>
<tr><th>性質</th><th>公式</th></tr>
<tr><td>第 i 層（從 0 開始）最多節點數</td><td>2<sup>i</sup></td></tr>
<tr><td>高度 h 最多節點數</td><td>2<sup>h+1</sup> - 1</td></tr>
<tr><td>n 個節點的完全二元樹高度</td><td>⌊log₂ n⌋</td></tr>
<tr><td>葉節點數 n₀ 與度數為 2 的節點數 n₂</td><td>n₀ = n₂ + 1</td></tr>
</table>
<div class="box exam"><b class="t">考試常見題</b>「一棵二元樹有 10 個度數為 2 的節點，葉節點有幾個？」答：n₀ = n₂ + 1 = 11。</div>` },
    { id: 'repr', title: '二元樹的表示法', html: `
<h3>節點與指標（最常用）</h3>
<pre class="out">struct TreeNode {
    int val;
    TreeNode *left, *right;
};</pre>
<h3>陣列表示法（適合完全二元樹）</h3>
<p>從 0 開始編號時，節點 i 的<b>左子節點為 2i + 1、右子節點為 2i + 2、父節點為 (i - 1) / 2</b>（若從 1 開始編號則為 2i、2i + 1、i / 2）。不需要指標，第 9 章的堆積就用這種方式。</p>
<pre class="out">陣列：  [A, B, C, D, E, F, G]
索引：   0  1  2  3  4  5  6
B（索引 1）的子節點：索引 3（D）與 4（E）；父節點：索引 0（A）</pre>
<p>非完全二元樹用陣列表示會有很多空格，例如歪斜樹，n 個節點可能需要 2<sup>n</sup> - 1 格。</p>` },
    { id: 'traverse', title: '二元樹的走訪', html: `
<pre class="out">          1
        /   \\
       2     3
      / \\     \\
     4   5     6

前序（根 → 左 → 右）：1 2 4 5 3 6
中序（左 → 根 → 右）：4 2 5 1 3 6
後序（左 → 右 → 根）：4 5 2 6 3 1
層序（一層一層）     ：1 2 3 4 5 6</pre>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;queue&gt;
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left = nullptr, *right = nullptr;
    explicit TreeNode(int v) : val(v) {}
};

void preorder(TreeNode *t)  { if (!t) return; cout &lt;&lt; t-&gt;val &lt;&lt; " "; preorder(t-&gt;left); preorder(t-&gt;right); }
void inorder(TreeNode *t)   { if (!t) return; inorder(t-&gt;left); cout &lt;&lt; t-&gt;val &lt;&lt; " "; inorder(t-&gt;right); }
void postorder(TreeNode *t) { if (!t) return; postorder(t-&gt;left); postorder(t-&gt;right); cout &lt;&lt; t-&gt;val &lt;&lt; " "; }

void levelorder(TreeNode *root)                 // 層序：用佇列（BFS）
{
    queue&lt;TreeNode *&gt; q;
    if (root) q.push(root);
    while (!q.empty()) {
        TreeNode *t = q.front(); q.pop();
        cout &lt;&lt; t-&gt;val &lt;&lt; " ";
        if (t-&gt;left) q.push(t-&gt;left);
        if (t-&gt;right) q.push(t-&gt;right);
    }
}

int height(TreeNode *t) { return t ? 1 + max(height(t-&gt;left), height(t-&gt;right)) : -1; }   // 以邊數計
int count(TreeNode *t)  { return t ? 1 + count(t-&gt;left) + count(t-&gt;right) : 0; }

int main()
{
    TreeNode n1(1), n2(2), n3(3), n4(4), n5(5), n6(6);
    n1.left = &amp;n2; n1.right = &amp;n3; n2.left = &amp;n4; n2.right = &amp;n5; n3.right = &amp;n6;
    cout &lt;&lt; "前序："; preorder(&amp;n1);   cout &lt;&lt; "\\n";
    cout &lt;&lt; "中序："; inorder(&amp;n1);    cout &lt;&lt; "\\n";
    cout &lt;&lt; "後序："; postorder(&amp;n1);  cout &lt;&lt; "\\n";
    cout &lt;&lt; "層序："; levelorder(&amp;n1); cout &lt;&lt; "\\n";
    cout &lt;&lt; "高度 " &lt;&lt; height(&amp;n1) &lt;&lt; "，節點數 " &lt;&lt; count(&amp;n1) &lt;&lt; "\\n";
}</pre>
<div class="box tip"><b class="t">記法</b>前、中、後指的是「根」被拜訪的時機：根在前、根在中間、根在後面。左一定在右之前。</div>
<div class="box exam"><b class="t">由走訪結果重建樹</b>給定「前序 + 中序」或「後序 + 中序」可以唯一重建二元樹：前序的第一個（或後序的最後一個）是根，在中序中找到根，左邊是左子樹、右邊是右子樹，再遞迴處理。只有前序 + 後序則無法唯一決定。</div>` }
  ],
  keypoints: [
    '樹是階層結構；n 個節點的樹有 n - 1 條邊。',
    '二元樹每個節點最多兩個子節點；第 i 層最多 2ⁱ 個節點，高度 h 最多 2ʰ⁺¹ - 1 個節點。',
    '葉節點數 n₀ = 度數為 2 的節點數 n₂ + 1。',
    '完全二元樹可用陣列表示：節點 i 的子節點為 2i+1、2i+2，父節點為 (i-1)/2。',
    '前序根左右、中序左根右、後序左右根；層序走訪用佇列。',
    '前序（或後序）加中序可以唯一重建二元樹。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 50,
  title: '二元搜尋樹與平衡樹',
  summary: '二元搜尋樹的性質、搜尋與插入、三種刪除情況、中序走訪得到排序結果、退化成串列的問題、AVL 樹與紅黑樹的平衡觀念與旋轉，以及 C++ set／map 與資料庫的 B 樹索引。',
  sections: [
    { id: 'bst', title: '二元搜尋樹的性質', html: `
<p><b>二元搜尋樹（Binary Search Tree，BST）</b>的每個節點都滿足：<b>左子樹所有值 &lt; 節點值 &lt; 右子樹所有值</b>。</p>
<pre class="out">            8
          /   \\
         3     10
        / \\      \\
       1   6      14
          / \\    /
         4   7  13

搜尋 6：8 → 往左 3 → 往右 6，找到（每次都排除一半）</pre>
<p>搜尋時和節點比較，小於往左、大於往右，就像二分搜尋。樹的高度為 h 時，搜尋、插入、刪除都是 O(h)。平衡時 h ≈ log n。互動練習中的「二元搜尋樹視覺化」可以插入數字，即時看到樹的形狀與各種走訪結果。</p>` },
    { id: 'ops', title: '搜尋、插入與中序走訪', html: `
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

struct Node {
    int key;
    Node *left = nullptr, *right = nullptr;
    explicit Node(int k) : key(k) {}
};

Node *insert(Node *t, int k)
{
    if (!t) return new Node(k);
    if (k &lt; t-&gt;key) t-&gt;left = insert(t-&gt;left, k);
    else if (k &gt; t-&gt;key) t-&gt;right = insert(t-&gt;right, k);   // 相同的值不重複插入
    return t;
}

bool contains(Node *t, int k)
{
    while (t) {
        if (k == t-&gt;key) return true;
        t = k &lt; t-&gt;key ? t-&gt;left : t-&gt;right;
    }
    return false;
}

void inorder(Node *t) { if (!t) return; inorder(t-&gt;left); cout &lt;&lt; t-&gt;key &lt;&lt; " "; inorder(t-&gt;right); }
int height(Node *t) { return t ? 1 + max(height(t-&gt;left), height(t-&gt;right)) : -1; }
int min_key(Node *t) { while (t-&gt;left) t = t-&gt;left; return t-&gt;key; }   // 最左邊就是最小值

int main()
{
    Node *root = nullptr;
    for (int k : {8, 3, 10, 1, 6, 14, 4, 7, 13}) root = insert(root, k);
    cout &lt;&lt; "中序（由小到大）："; inorder(root); cout &lt;&lt; "\\n";
    cout &lt;&lt; boolalpha &lt;&lt; "有 6？" &lt;&lt; contains(root, 6) &lt;&lt; "，有 5？" &lt;&lt; contains(root, 5) &lt;&lt; "\\n";
    cout &lt;&lt; "最小值 " &lt;&lt; min_key(root) &lt;&lt; "，高度 " &lt;&lt; height(root) &lt;&lt; "\\n";

    Node *skew = nullptr;
    for (int k : {1, 2, 3, 4, 5, 6, 7, 8, 9}) skew = insert(skew, k);   // 依序插入排好的資料
    cout &lt;&lt; "依序插入 1～9 的高度：" &lt;&lt; height(skew) &lt;&lt; "\\n";
}</pre>
<div class="box warn"><b class="t">BST 的退化</b>依序插入已排序的資料（1、2、3…），每個新節點都接在右邊，BST 變成一條串列，高度 n - 1，操作退化成 O(n)。這就是需要「平衡樹」的原因。</div>` },
    { id: 'delete', title: '刪除節點的三種情況', html: `
<table>
<tr><th>情況</th><th>做法</th></tr>
<tr><td>1. 葉節點（沒有子節點）</td><td>直接刪除</td></tr>
<tr><td>2. 只有一個子節點</td><td>用子節點取代它</td></tr>
<tr><td>3. 有兩個子節點</td><td>用<b>中序後繼</b>（右子樹的最小值）或中序前驅（左子樹的最大值）取代它的值，再刪除那個後繼節點</td></tr>
</table>
<pre class="out">刪除 3（有兩個子節點）：
右子樹 {6, 4, 7} 的最小值是 4 → 把 3 換成 4 → 刪除原本的 4（葉節點）

        8                  8
      /   \\              /   \\
     3     10    →      4     10
    / \\      \\         / \\      \\
   1   6      14      1   6      14
      / \\                  \\
     4   7                  7</pre>` },
    { id: 'balanced', title: '平衡樹：AVL 與紅黑樹', html: `
<p><b>平衡二元搜尋樹</b>在插入與刪除後自動調整形狀，保證高度維持 O(log n)：</p>
<table>
<tr><th></th><th>AVL 樹</th><th>紅黑樹</th></tr>
<tr><td>平衡條件</td><td>每個節點左右子樹高度差不超過 1</td><td>以紅黑顏色規則保證最長路徑不超過最短路徑的兩倍</td></tr>
<tr><td>平衡程度</td><td>更嚴格，查詢稍快</td><td>較寬鬆，插入刪除需要的旋轉較少</td></tr>
<tr><td>實際應用</td><td>查詢為主的情境</td><td><b>C++ std::map／std::set</b>、Java TreeMap、Linux 核心排程</td></tr>
</table>
<p>平衡的方法是<b>旋轉（rotation）</b>：在不破壞 BST 性質的前提下，改變節點的上下關係。</p>
<pre class="out">右旋（處理左邊太高）：
        z                y
       / \\             /   \\
      y   T4    →     x     z
     / \\             / \\   / \\
    x   T3          T1 T2 T3 T4
   / \\
  T1  T2</pre>
<p>AVL 失衡有四種情況：LL（右旋一次）、RR（左旋一次）、LR（先左旋再右旋）、RL（先右旋再左旋）。實務上直接使用 std::set 與 std::map，不需要自己實作。</p>
<h3>B 樹與資料庫索引</h3>
<p>資料庫的資料存在硬碟上，每次讀取的成本很高。<b>B 樹／B+ 樹</b>每個節點存放很多鍵（數百個），讓樹非常矮胖，查詢只需要讀取 3～4 個節點。MySQL、PostgreSQL 的索引就是 B+ 樹（見 SQL 課程第 12 章）。</p>` }
  ],
  keypoints: [
    'BST 性質：左子樹 < 節點 < 右子樹；搜尋時小於往左、大於往右。',
    'BST 的搜尋、插入、刪除為 O(h)，平衡時 h ≈ log n。',
    '中序走訪 BST 會得到由小到大的序列；最左節點為最小值。',
    '刪除有兩個子節點的節點：以中序後繼（右子樹最小值）取代再刪除後繼。',
    '依序插入排好的資料會讓 BST 退化成串列，操作變 O(n)。',
    'AVL 樹與紅黑樹以旋轉維持平衡；std::map／set 為紅黑樹，資料庫索引用 B+ 樹。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 45,
  title: '堆積與優先佇列',
  summary: '堆積的性質（最大堆積與最小堆積）、以陣列表示完全二元樹、插入時往上調整、刪除頂端時往下調整、O(n) 建堆積、priority_queue 的使用、前 k 大問題，以及堆積排序。',
  sections: [
    { id: 'heap', title: '堆積的性質', html: `
<p><b>堆積（Heap）</b>是一棵<b>完全二元樹</b>，而且每個節點都大於等於（最大堆積）或小於等於（最小堆積）它的子節點。所以<b>根節點一定是最大（或最小）值</b>。</p>
<pre class="out">最小堆積：               陣列表示：
         1                [1, 3, 2, 7, 4, 5]
       /   \\               0  1  2  3  4  5
      3     2
     / \\   /             節點 i 的左子 2i+1、右子 2i+2、父節點 (i-1)/2
    7   4 5</pre>
<p>注意堆積只保證「父節點與子節點」的大小關係，<b>兄弟之間沒有順序</b>，所以堆積不是排序好的陣列，也不能用來快速搜尋任意值。</p>
<table>
<tr><th>操作</th><th>複雜度</th></tr>
<tr><td>取得最小（最大）值 top</td><td>O(1)</td></tr>
<tr><td>插入 push</td><td>O(log n)</td></tr>
<tr><td>刪除頂端 pop</td><td>O(log n)</td></tr>
<tr><td>由 n 個元素建堆積</td><td>O(n)</td></tr>
</table>` },
    { id: 'impl', title: '實作最小堆積', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
#include &lt;vector&gt;
using namespace std;

class MinHeap {
    vector&lt;int&gt; a;
    void sift_up(int i)                       // 新元素往上浮，直到不小於父節點
    {
        while (i &gt; 0) {
            int p = (i - 1) / 2;
            if (a[p] &lt;= a[i]) break;
            swap(a[p], a[i]);
            i = p;
        }
    }
    void sift_down(int i)                     // 往下沉，和較小的子節點交換
    {
        int n = a.size();
        while (true) {
            int l = 2 * i + 1, r = 2 * i + 2, m = i;
            if (l &lt; n &amp;&amp; a[l] &lt; a[m]) m = l;
            if (r &lt; n &amp;&amp; a[r] &lt; a[m]) m = r;
            if (m == i) break;
            swap(a[i], a[m]);
            i = m;
        }
    }
public:
    void push(int x) { a.push_back(x); sift_up(a.size() - 1); }
    int top() const { if (a.empty()) throw runtime_error("空的"); return a[0]; }
    void pop()
    {
        if (a.empty()) throw runtime_error("空的");
        a[0] = a.back();                      // 把最後一個元素移到根
        a.pop_back();
        if (!a.empty()) sift_down(0);
    }
    bool empty() const { return a.empty(); }
    void dump() const { for (int x : a) cout &lt;&lt; x &lt;&lt; " "; cout &lt;&lt; "\\n"; }
};

int main()
{
    MinHeap h;
    for (int x : {5, 3, 8, 1, 9, 2}) h.push(x);
    cout &lt;&lt; "陣列內容："; h.dump();
    cout &lt;&lt; "依序取出：";
    while (!h.empty()) { cout &lt;&lt; h.top() &lt;&lt; " "; h.pop(); }
    cout &lt;&lt; "\\n";
}</pre>
<p>插入：放在陣列最後，往上和父節點比較交換（sift up）。刪除頂端：把最後一個元素移到根，往下和較小的子節點交換（sift down）。兩者最多走過樹的高度，所以是 O(log n)。互動練習中的「堆積視覺化」可以逐步觀察這兩個過程。</p>` },
    { id: 'pq', title: '優先佇列與前 k 大', html: `
<p><b>優先佇列（Priority Queue）</b>每次取出優先權最高的元素，通常用堆積實作。C++ 的 <code>priority_queue</code> 預設是<b>最大堆積</b>：</p>
<pre class="cpp">#include &lt;functional&gt;
#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; scores = {72, 95, 61, 88, 79, 99, 84, 90};
    int k = 3;
    priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; pq;   // 最小堆積，只保留 k 個
    for (int s : scores) {
        pq.push(s);
        if ((int)pq.size() &gt; k) pq.pop();               // 超過 k 個就丟掉最小的
    }
    cout &lt;&lt; "前 " &lt;&lt; k &lt;&lt; " 高分（由小到大）：";
    while (!pq.empty()) { cout &lt;&lt; pq.top() &lt;&lt; " "; pq.pop(); }
    cout &lt;&lt; "\\n";

    priority_queue&lt;pair&lt;int, string&gt;&gt; tasks;             // 依優先權處理工作
    tasks.push({2, "回覆信件"});
    tasks.push({5, "修正正式環境錯誤"});
    tasks.push({3, "寫週報"});
    while (!tasks.empty()) { cout &lt;&lt; tasks.top().first &lt;&lt; " " &lt;&lt; tasks.top().second &lt;&lt; "\\n"; tasks.pop(); }
}</pre>
<p>找前 k 大用<b>大小為 k 的最小堆積</b>：時間 O(n log k)、空間 O(k)，比整個排序 O(n log n) 更省，資料是串流（一直進來）時也能用。</p>
<h3>堆積排序</h3>
<p>先用 O(n) 建成最大堆積，再重複 n 次「把根（最大值）和最後一個交換、堆積大小減 1、往下調整」，總共 O(n log n)，而且只需要 O(1) 額外空間（但不是穩定排序）。演算法課程第 3 章會和其他排序法比較。</p>` }
  ],
  keypoints: [
    '堆積是完全二元樹，最大堆積每個節點 ≥ 子節點，根為最大值；兄弟之間沒有順序。',
    '以陣列存放：節點 i 的子節點為 2i+1、2i+2，父節點為 (i-1)/2。',
    'push 放到最後再往上調整；pop 把最後一個移到根再往下調整，皆為 O(log n)。',
    'top 為 O(1)；由 n 個元素建堆積為 O(n)。',
    'C++ priority_queue 預設為最大堆積，加上 greater<int> 變最小堆積。',
    '前 k 大用大小為 k 的最小堆積，O(n log k)。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 50,
  title: '圖的表示與走訪',
  summary: '圖的術語（頂點、邊、有向與無向、權重、度數、連通）、鄰接矩陣與鄰接串列、BFS 廣度優先搜尋與最短步數、DFS 深度優先搜尋、連通元件計數，以及網格（迷宮）問題。',
  sections: [
    { id: 'terms', title: '圖的術語', html: `
<p><b>圖（Graph）</b>由<b>頂點（vertex）</b>與<b>邊（edge）</b>組成，記為 G = (V, E)。社群網路、地圖路線、網頁連結、課程先修關係都是圖。</p>
<table>
<tr><th>術語</th><th>意義</th></tr>
<tr><td>無向圖／有向圖</td><td>邊沒有方向（好友關係）／邊有方向（追蹤關係、先修課程）</td></tr>
<tr><td>加權圖</td><td>邊上有數值，例如距離、時間、費用</td></tr>
<tr><td>度數</td><td>連接到該頂點的邊數；有向圖分為入度與出度</td></tr>
<tr><td>路徑、環</td><td>頂點依序以邊相連；起點與終點相同的路徑為環</td></tr>
<tr><td>連通</td><td>無向圖中任兩點之間都有路徑</td></tr>
<tr><td>樹</td><td>連通且沒有環的無向圖，n 個頂點有 n - 1 條邊</td></tr>
</table>
<p>無向圖所有頂點度數總和 = 邊數 × 2（每條邊貢獻兩個端點的度數）。</p>` },
    { id: 'repr', title: '鄰接矩陣與鄰接串列', html: `
<pre class="out">無向圖：0 — 1, 0 — 2, 1 — 2, 2 — 3

鄰接矩陣（adj[i][j] = 1 代表有邊）     鄰接串列
     0  1  2  3                       0: 1 2
  0 [0, 1, 1, 0]                      1: 0 2
  1 [1, 0, 1, 0]                      2: 0 1 3
  2 [1, 1, 0, 1]                      3: 2
  3 [0, 0, 1, 0]</pre>
<table>
<tr><th></th><th>鄰接矩陣</th><th>鄰接串列</th></tr>
<tr><td>空間</td><td>O(V²)</td><td>O(V + E)</td></tr>
<tr><td>判斷兩點是否相鄰</td><td>O(1)</td><td>O(該點度數)</td></tr>
<tr><td>列出一個點的所有鄰居</td><td>O(V)</td><td>O(該點度數)</td></tr>
<tr><td>適合</td><td>稠密圖、頂點少</td><td><b>稀疏圖（大多數實際情況）</b></td></tr>
</table>
<p>社群網路有數億個使用者，但每人平均只有幾百個好友，是典型的稀疏圖，一定要用鄰接串列。</p>` },
    { id: 'bfs', title: 'BFS 廣度優先搜尋', html: `
<p><b>BFS</b> 從起點出發，先拜訪所有距離 1 的點，再拜訪距離 2 的點，一層一層往外擴展，使用<b>佇列</b>。在<b>邊沒有權重</b>（或權重都相同）的圖中，BFS 第一次到達某點的距離就是<b>最短距離</b>。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;queue&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    int n = 7;
    vector&lt;vector&lt;int&gt;&gt; adj(n);
    auto add = [&amp;](int u, int v) { adj[u].push_back(v); adj[v].push_back(u); };   // 無向邊
    add(0, 1); add(0, 2); add(1, 3); add(2, 3); add(3, 4); add(4, 5);   // 頂點 6 沒有任何邊

    vector&lt;int&gt; dist(n, -1), parent(n, -1);
    queue&lt;int&gt; q;
    dist[0] = 0;
    q.push(0);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {             // 第一次拜訪
                dist[v] = dist[u] + 1;
                parent[v] = u;
                q.push(v);
            }
        }
    }
    for (int i = 0; i &lt; n; i++) cout &lt;&lt; "到 " &lt;&lt; i &lt;&lt; " 的距離：" &lt;&lt; dist[i] &lt;&lt; "\\n";
    cout &lt;&lt; "0 到 5 的路徑：";
    vector&lt;int&gt; path;
    for (int v = 5; v != -1; v = parent[v]) path.push_back(v);
    for (int i = (int)path.size() - 1; i &gt;= 0; i--) cout &lt;&lt; path[i] &lt;&lt; (i ? " → " : "\\n");
}</pre>` },
    { id: 'dfs', title: 'DFS 深度優先搜尋與連通元件', html: `
<p><b>DFS</b> 沿著一條路一直走到底，走不下去再回頭（回溯），通常用<b>遞迴</b>或堆疊實作。適合找連通元件、偵測環、拓撲排序、迷宮的所有路徑。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

vector&lt;vector&lt;int&gt;&gt; adj;
vector&lt;bool&gt; visited;

void dfs(int u)
{
    visited[u] = true;
    cout &lt;&lt; u &lt;&lt; " ";
    for (int v : adj[u]) if (!visited[v]) dfs(v);
}

int main()
{
    int n = 8;
    adj.assign(n, {});
    visited.assign(n, false);
    auto add = [&amp;](int u, int v) { adj[u].push_back(v); adj[v].push_back(u); };
    add(0, 1); add(1, 2); add(0, 3);      // 第一群：0 1 2 3
    add(4, 5);                            // 第二群：4 5
    add(6, 7);                            // 第三群：6 7
    int components = 0;
    for (int i = 0; i &lt; n; i++) {
        if (!visited[i]) {
            cout &lt;&lt; "第 " &lt;&lt; ++components &lt;&lt; " 群：";
            dfs(i);
            cout &lt;&lt; "\\n";
        }
    }
    cout &lt;&lt; "共 " &lt;&lt; components &lt;&lt; " 個連通元件\\n";
}</pre>
<table>
<tr><th></th><th>BFS</th><th>DFS</th></tr>
<tr><td>資料結構</td><td>佇列</td><td>堆疊或遞迴</td></tr>
<tr><td>走訪順序</td><td>一層一層</td><td>一條路走到底</td></tr>
<tr><td>擅長</td><td>無權重圖的最短步數</td><td>連通元件、偵測環、拓撲排序、列舉路徑</td></tr>
<tr><td>時間複雜度（鄰接串列）</td><td colspan="2">都是 O(V + E)</td></tr>
</table>
<div class="box exam"><b class="t">網格也是圖</b>迷宮、島嶼數量這類「二維網格」題目，每個格子是一個頂點，上下左右相鄰的格子之間有邊。用 BFS 求最短步數、用 DFS 或 BFS 計算島嶼（連通元件）數量，是 APCS 與面試的高頻題。C++ 課程第 11 章有完整的 BFS 迷宮範例。</div>` }
  ],
  keypoints: [
    '圖由頂點與邊組成，分為有向／無向、加權／不加權；無向圖度數總和 = 邊數 × 2。',
    '鄰接矩陣空間 O(V²)、判斷相鄰 O(1)；鄰接串列空間 O(V + E)，適合稀疏圖。',
    'BFS 用佇列一層一層擴展，在無權重圖中得到最短距離。',
    'DFS 用遞迴或堆疊一路走到底再回溯，適合連通元件、偵測環、拓撲排序。',
    'BFS 與 DFS 在鄰接串列上都是 O(V + E)。',
    '二維網格可視為圖，迷宮最短步數用 BFS、島嶼數量用 DFS／BFS。'
  ]
},
{
  id: 'c11', subject: 2, minutes: 45,
  title: '並查集、Trie 與資料結構選擇',
  summary: '並查集（Union-Find）的 find 與 union、路徑壓縮與依大小合併、判斷連通與環；Trie 字典樹的插入、搜尋與前綴查詢；線段樹與樹狀陣列簡介；以及依需求選擇資料結構的總整理。',
  sections: [
    { id: 'dsu', title: '並查集', html: `
<p><b>並查集（Disjoint Set Union，DSU）</b>管理多個不相交的集合，支援兩個操作：<b>find</b>（查詢元素屬於哪個集合）與 <b>union</b>（合併兩個集合）。常用於判斷「兩個人是否在同一個朋友圈」「加入這條邊會不會形成環」。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;numeric&gt;
#include &lt;vector&gt;
using namespace std;

struct DSU {
    vector&lt;int&gt; parent, sz;
    explicit DSU(int n) : parent(n), sz(n, 1) { iota(parent.begin(), parent.end(), 0); }   // 每個元素自己一組
    int find(int x)
    {
        if (parent[x] != x) parent[x] = find(parent[x]);   // 路徑壓縮：直接指向根
        return parent[x];
    }
    bool unite(int a, int b)
    {
        a = find(a); b = find(b);
        if (a == b) return false;                          // 已經在同一組
        if (sz[a] &lt; sz[b]) swap(a, b);                     // 依大小合併：小的接到大的下面
        parent[b] = a;
        sz[a] += sz[b];
        return true;
    }
};

int main()
{
    DSU d(6);
    d.unite(0, 1); d.unite(1, 2); d.unite(3, 4);
    cout &lt;&lt; boolalpha &lt;&lt; "0 和 2 同組？" &lt;&lt; (d.find(0) == d.find(2)) &lt;&lt; "\\n";
    cout &lt;&lt; "0 和 3 同組？" &lt;&lt; (d.find(0) == d.find(3)) &lt;&lt; "\\n";
    cout &lt;&lt; "再連 2-0 會形成環？" &lt;&lt; !d.unite(2, 0) &lt;&lt; "\\n";
    int groups = 0;
    for (int i = 0; i &lt; 6; i++) if (d.find(i) == i) groups++;
    cout &lt;&lt; "共 " &lt;&lt; groups &lt;&lt; " 組\\n";
}</pre>
<p>同時使用<b>路徑壓縮</b>與<b>依大小（或秩）合併</b>，每次操作的攤銷時間近乎 O(1)（正式為 O(α(n))，α 是成長極慢的反阿克曼函數）。演算法課程的 Kruskal 最小生成樹會用到它。</p>` },
    { id: 'trie', title: 'Trie 字典樹', html: `
<p><b>Trie（字典樹、前綴樹）</b>每個節點代表一個字元，從根到某個節點的路徑就是一個字串前綴。查詢一個字串只需要 O(字串長度)，與字典中有多少字無關。用於<b>搜尋框自動完成</b>、拼字檢查、IP 路由表。</p>
<pre class="out">插入 car、cat、cart、dog：
        (根)
        /  \\
       c    d
       |    |
       a    o
      / \\   |
     r*  t* g*
     |
     t*            * 代表一個字的結尾</pre>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;string&gt;
using namespace std;

struct TrieNode {
    unique_ptr&lt;TrieNode&gt; child[26];
    bool end = false;
    int pass = 0;                                  // 有幾個字經過這個節點
};

class Trie {
    TrieNode root;
public:
    void insert(const string &amp;w)
    {
        TrieNode *t = &amp;root;
        for (char c : w) {
            auto &amp;next = t-&gt;child[c - 'a'];
            if (!next) next = make_unique&lt;TrieNode&gt;();
            t = next.get();
            t-&gt;pass++;
        }
        t-&gt;end = true;
    }
    const TrieNode *walk(const string &amp;s) const
    {
        const TrieNode *t = &amp;root;
        for (char c : s) {
            t = t-&gt;child[c - 'a'].get();
            if (!t) return nullptr;
        }
        return t;
    }
    bool search(const string &amp;w) const { auto t = walk(w); return t &amp;&amp; t-&gt;end; }
    int count_prefix(const string &amp;p) const { auto t = walk(p); return t ? t-&gt;pass : 0; }
};

int main()
{
    Trie t;
    for (const string w : {"car", "cat", "cart", "dog", "card"}) t.insert(w);
    cout &lt;&lt; boolalpha &lt;&lt; "有 car？" &lt;&lt; t.search("car") &lt;&lt; "，有 ca？" &lt;&lt; t.search("ca") &lt;&lt; "\\n";
    cout &lt;&lt; "以 car 開頭的字有 " &lt;&lt; t.count_prefix("car") &lt;&lt; " 個\\n";
    cout &lt;&lt; "以 do 開頭的字有 " &lt;&lt; t.count_prefix("do") &lt;&lt; " 個\\n";
}</pre>` },
    { id: 'segment', title: '線段樹與樹狀陣列', html: `
<p>前綴和可以 O(1) 查詢區間和，但只要修改一個元素，就要 O(n) 重新計算。需要<b>同時頻繁修改與查詢區間</b>時，使用：</p>
<table>
<tr><th>結構</th><th>單點修改</th><th>區間查詢</th><th>特色</th></tr>
<tr><td>前綴和</td><td>O(n)</td><td>O(1)</td><td>資料不會變動時最好用</td></tr>
<tr><td><b>樹狀陣列（Fenwick Tree／BIT）</b></td><td>O(log n)</td><td>O(log n)</td><td>程式很短，適合區間和</td></tr>
<tr><td><b>線段樹（Segment Tree）</b></td><td>O(log n)</td><td>O(log n)</td><td>更通用：區間最大最小值、區間修改（懶標記）</td></tr>
</table>
<p>這兩種是程式競賽的進階常客，APCS 第四題與大學資料結構課程的進階內容會用到。</p>` },
    { id: 'choose', title: '總整理：如何選擇資料結構', html: `
<table>
<tr><th>需求</th><th>資料結構</th><th>C++</th></tr>
<tr><td>依索引存取、依序走訪</td><td>動態陣列</td><td>vector</td></tr>
<tr><td>頻繁在任意位置插入刪除（已知位置）</td><td>雙向鏈結串列</td><td>list</td></tr>
<tr><td>後進先出</td><td>堆疊</td><td>stack</td></tr>
<tr><td>先進先出、BFS</td><td>佇列</td><td>queue</td></tr>
<tr><td>兩端操作、滑動視窗</td><td>雙端佇列</td><td>deque</td></tr>
<tr><td>快速查詢是否存在、計數（不需順序）</td><td>雜湊表</td><td>unordered_set／unordered_map</td></tr>
<tr><td>保持排序、找前驅後繼、範圍查詢</td><td>平衡 BST</td><td>set／map</td></tr>
<tr><td>每次取最大或最小</td><td>堆積</td><td>priority_queue</td></tr>
<tr><td>關係與路線</td><td>圖（鄰接串列）</td><td>vector&lt;vector&lt;int&gt;&gt;</td></tr>
<tr><td>動態合併群組、判斷連通</td><td>並查集</td><td>自己實作</td></tr>
<tr><td>字串前綴查詢</td><td>Trie</td><td>自己實作</td></tr>
<tr><td>頻繁修改又要區間查詢</td><td>樹狀陣列、線段樹</td><td>自己實作</td></tr>
</table>
<div class="box tip"><b class="t">選擇的思考步驟</b>1. 列出程式最常做的操作（查詢？插入？取最大？）。2. 估算資料量與次數。3. 選擇讓最常用的操作最快的結構。4. 確認記憶體是否足夠。接下來的「演算法」課程，會在這些資料結構上學習排序、搜尋、貪心、動態規劃與圖論演算法。</div>
<div class="box exam"><b class="t">面試常見題</b>陣列與鏈結串列的差別、用兩個堆疊實作佇列、雜湊表如何處理碰撞、BST 與堆積的差別、為什麼 std::map 是 O(log n)、BFS 與 DFS 的差別與應用、LRU 快取（雜湊表 + 雙向串列）。</div>` }
  ],
  keypoints: [
    '並查集支援 find 與 union，用來判斷連通與偵測環；路徑壓縮加依大小合併後近乎 O(1)。',
    'Trie 依字元建立節點，查詢與前綴統計為 O(字串長度)，用於自動完成與拼字檢查。',
    '前綴和適合靜態資料；需要頻繁修改又查詢區間時用樹狀陣列或線段樹（皆 O(log n)）。',
    '選擇資料結構：先列出最常用的操作，再選讓它最快的結構。',
    '保持排序用平衡 BST（set／map），不需順序的快速查詢用雜湊表。',
    'LRU 快取 = 雜湊表 + 雙向鏈結串列，是常見的綜合題。'
  ]
}
);
