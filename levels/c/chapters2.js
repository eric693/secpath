/* C 語言 進階篇：指標、記憶體、檔案與嵌入式
   <pre class="c"> 為可在網頁上編譯執行的範例（data-input 為標準輸入）；<pre class="out"> 為一般程式碼或輸出
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 55,
  title: '指標',
  summary: '記憶體與位址、取址運算子 & 與解參考運算子 *、用指標讓函式修改外部變數、指標運算、陣列與指標的關係、NULL 指標、指標與 const，以及多重指標。',
  sections: [
    { id: 'address', title: '記憶體、位址與指標', html: `
<p>記憶體像一排有編號的置物櫃，每個位元組都有一個<b>位址</b>。變數存放在某個位址上；<b>指標（pointer）</b>是「存放位址的變數」。</p>
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int x = 42;
    int *p = &amp;x;          // p 是指向 int 的指標，存放 x 的位址

    printf("x 的值：%d\\n", x);
    printf("x 的位址：%p\\n", (void *)&amp;x);
    printf("p 存的值（位址）：%p\\n", (void *)p);
    printf("*p（p 指向的值）：%d\\n", *p);

    *p = 100;             // 透過指標修改 x
    printf("修改後 x = %d\\n", x);
    printf("指標本身的大小：%zu 位元組\\n", sizeof p);
    return 0;
}</pre>
<table>
<tr><th>寫法</th><th>意義</th></tr>
<tr><td><code>int *p;</code></td><td>宣告 p 是「指向 int 的指標」</td></tr>
<tr><td><code>&amp;x</code></td><td><b>取址</b>：取得 x 的位址</td></tr>
<tr><td><code>*p</code></td><td><b>解參考</b>：取得（或修改）p 指向的那個值</td></tr>
<tr><td><code>p = &amp;y;</code></td><td>讓 p 改指向 y</td></tr>
</table>
<pre class="out">     變數 x                    變數 p
  ┌─────────┐              ┌──────────────┐
  │   42    │ ◄─────────── │ 0x7ffd...a4  │
  └─────────┘              └──────────────┘
  位址 0x7ffd...a4          p 存的是 x 的位址；*p 就是 x</pre>
<p>每次執行時位址可能不同（作業系統的位址隨機化），這是正常的。互動練習中的「指標與記憶體圖」可以逐步觀察指標運算時位址與值的變化。</p>` },
    { id: 'swap', title: '用指標讓函式修改外部變數', html: `
<p>第 5 章提到 C 語言是傳值。要讓函式修改呼叫端的變數，就傳入變數的位址：</p>
<pre class="c">#include &lt;stdio.h&gt;

void swap_wrong(int a, int b)       // 只交換了複製品
{
    int t = a; a = b; b = t;
}

void swap(int *a, int *b)           // 收到的是位址
{
    int t = *a;
    *a = *b;
    *b = t;
}

void min_max(const int arr[], int n, int *min, int *max)   // 用指標「傳回」多個值
{
    *min = *max = arr[0];
    for (int i = 1; i &lt; n; i++) {
        if (arr[i] &lt; *min) *min = arr[i];
        if (arr[i] &gt; *max) *max = arr[i];
    }
}

int main(void)
{
    int x = 1, y = 2;
    swap_wrong(x, y);
    printf("swap_wrong 後：x=%d y=%d\\n", x, y);
    swap(&amp;x, &amp;y);
    printf("swap 後：x=%d y=%d\\n", x, y);

    int data[] = {7, 3, 9, 1, 5}, lo, hi;
    min_max(data, 5, &amp;lo, &amp;hi);
    printf("最小 %d，最大 %d\\n", lo, hi);
    return 0;
}</pre>
<p>這也解釋了 scanf 為什麼要寫 <code>&amp;age</code>：scanf 需要知道變數的位址，才能把讀到的值存進去。</p>` },
    { id: 'arith', title: '指標運算與陣列', html: `
<p>陣列名稱在大多數情況下會轉換成<b>第一個元素的位址</b>。指標加 1 會移到「下一個元素」，實際位址增加 <code>sizeof(型別)</code> 個位元組：</p>
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;                       // 等同 int *p = &amp;a[0];

    printf("%d %d %d\\n", *p, *(p + 1), *(p + 2));   // 10 20 30
    printf("%d %d\\n", a[3], *(a + 3));             // a[i] 就是 *(a + i)
    printf("p+1 與 p 相差 %td 個元素、%zu 個位元組\\n", (p + 1) - p, sizeof *p);

    for (int *q = a; q &lt; a + 5; q++) {             // 用指標走訪陣列
        printf("%d ", *q);
    }
    printf("\\n");

    int *last = &amp;a[4];
    printf("兩指標之間有 %td 個元素\\n", last - p);
    return 0;
}</pre>
<div class="box memo"><b class="t">陣列不等於指標</b>陣列名稱會「轉換成」指標，但兩者不同：<code>sizeof a</code> 是整個陣列的大小（20），<code>sizeof p</code> 是指標的大小（8）；陣列名稱不能被重新指定（<code>a = p</code> 會編譯錯誤）。</div>` },
    { id: 'null', title: 'NULL、野指標與 const', html: `
<table>
<tr><th>情況</th><th>說明</th></tr>
<tr><td><b>NULL 指標</b></td><td><code>int *p = NULL;</code> 表示「目前沒有指向任何東西」。對 NULL 解參考會當機（Segmentation fault），使用前要檢查 <code>if (p != NULL)</code>。</td></tr>
<tr><td><b>未初始化的指標</b></td><td><code>int *p;</code> 裡面是隨機的位址，<code>*p = 5</code> 會寫入未知的記憶體。宣告時沒有對象就先設為 NULL。</td></tr>
<tr><td><b>懸置指標</b></td><td>指向已經被釋放、或已經離開作用域的區域變數。例如函式傳回區域變數的位址。</td></tr>
</table>
<pre class="out">int *bad(void)
{
    int local = 5;
    return &amp;local;      // 錯誤：函式結束後 local 就消失了，傳回的位址不能使用
}</pre>
<h3>const 與指標</h3>
<table>
<tr><th>寫法</th><th>不能改的是</th></tr>
<tr><td><code>const int *p</code></td><td>p 指向的值（<code>*p = 1</code> 不行），p 可以改指別的地方</td></tr>
<tr><td><code>int *const p</code></td><td>p 本身（不能改指別處），但可以改 *p</td></tr>
<tr><td><code>const int *const p</code></td><td>兩者都不能改</td></tr>
</table>
<p>記法：<b>const 在 * 左邊鎖值，在 * 右邊鎖指標</b>。函式參數若不會修改資料，寫成 <code>const int *arr</code>，讓編譯器幫你檢查。</p>
<h3>指標的指標</h3>
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int x = 7;
    int *p = &amp;x;
    int **pp = &amp;p;            // 指向「指標」的指標
    **pp = 70;
    printf("x=%d *p=%d **pp=%d\\n", x, *p, **pp);
    return 0;
}</pre>` }
  ],
  keypoints: [
    '指標是存放位址的變數；& 取得位址，* 解參考取得或修改指向的值。',
    '傳入變數的位址，函式就能修改呼叫端的變數，例如 swap(&x, &y)；scanf 也是同樣的原理。',
    '陣列名稱會轉換成第一個元素的位址，a[i] 等同 *(a + i)。',
    '指標加 1 移到下一個元素，位址增加 sizeof(型別) 個位元組。',
    '對 NULL 或未初始化的指標解參考會當機；不要傳回區域變數的位址。',
    'const 在 * 左邊鎖住指向的值，在 * 右邊鎖住指標本身。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 45,
  title: '字串',
  summary: 'C 字串是以 \\0 結尾的字元陣列、字串常值與字元陣列的差別、string.h 常用函式、strcpy 與 strcat 的溢位風險與安全寫法、讀取一整行輸入，以及 ctype.h 字元處理。',
  sections: [
    { id: 'cstring', title: 'C 語言的字串', html: `
<p>C 語言沒有字串型別。<b>字串是以空字元 <code>'\\0'</code> 結尾的 char 陣列</b>：</p>
<pre class="c">#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void)
{
    char s1[] = "hello";               // 編譯器自動補上 '\\0'，陣列大小為 6
    char s2[10] = "hi";                // 剩下的元素都是 '\\0'
    char s3[] = {'C', 'a', 't', '\\0'}; // 手動逐字指定，記得 '\\0'

    printf("%s %s %s\\n", s1, s2, s3);
    printf("sizeof s1 = %zu，strlen(s1) = %zu\\n", sizeof s1, strlen(s1));
    printf("第一個字元 %c，ASCII 碼 %d\\n", s1[0], s1[0]);
    s1[0] = 'H';
    printf("%s\\n", s1);
    return 0;
}</pre>
<pre class="out">s1:  'h' 'e' 'l' 'l' 'o' '\\0'
索引   0   1   2   3   4   5      → sizeof 為 6，strlen 為 5（不含 '\\0'）</pre>
<div class="box warn"><b class="t">字元與字串</b><code>'A'</code>（單引號）是一個字元，值為 65；<code>"A"</code>（雙引號）是字串，包含 'A' 和 '\0' 兩個位元組。</div>
<h3>字串常值與字元陣列</h3>
<pre class="out">char arr[] = "hello";   // 陣列：在堆疊上複製一份，可以修改 arr[0] = 'H'
char *ptr = "hello";    // 指標：指向唯讀的字串常值，ptr[0] = 'H' 是未定義行為（常會當機）
const char *ok = "hello";   // 指向字串常值時建議加 const</pre>
<p>中文字在 UTF-8 中一個字佔 3 個位元組，所以 <code>strlen("你好")</code> 是 6，不是 2。</p>` },
    { id: 'stringh', title: 'string.h 常用函式', html: `
<table>
<tr><th>函式</th><th>功能</th></tr>
<tr><td><code>strlen(s)</code></td><td>字串長度（不含 '\\0'）</td></tr>
<tr><td><code>strcpy(dst, src)</code></td><td>把 src 複製到 dst</td></tr>
<tr><td><code>strcat(dst, src)</code></td><td>把 src 接在 dst 後面</td></tr>
<tr><td><code>strcmp(a, b)</code></td><td>比較：相同傳回 0，a 較小傳回負數，a 較大傳回正數</td></tr>
<tr><td><code>strchr(s, c)</code>／<code>strstr(s, sub)</code></td><td>找字元／子字串，找不到傳回 NULL</td></tr>
<tr><td><code>snprintf(buf, size, 格式, …)</code></td><td>像 printf 一樣格式化，但輸出到字串，<b>不會超過 size</b></td></tr>
</table>
<pre class="c">#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void)
{
    char a[20] = "apple", b[] = "banana";
    printf("strcmp = %d\\n", strcmp(a, b) &lt; 0 ? -1 : strcmp(a, b) &gt; 0 ? 1 : 0);
    if (a == b) printf("不會印出：== 比較的是位址，不是內容\\n");
    if (strcmp(a, "apple") == 0) printf("內容相同要用 strcmp\\n");

    strcat(a, " pie");
    printf("%s（長度 %zu）\\n", a, strlen(a));

    char *pos = strstr(a, "pie");
    if (pos != NULL) printf("找到 pie，在索引 %td\\n", pos - a);

    char buf[32];
    snprintf(buf, sizeof buf, "%s 共 %d 元", "蛋糕", 120);
    printf("%s\\n", buf);
    return 0;
}</pre>
<div class="box exam"><b class="t">字串比較不能用 ==</b><code>a == b</code> 比較的是兩個陣列的位址，永遠不相等。比較內容一定要用 <code>strcmp(a, b) == 0</code>。字串也不能用 = 指定，要用 strcpy 或 snprintf。</div>` },
    { id: 'safe', title: '緩衝區溢位與安全寫法', html: `
<p><code>strcpy</code>、<code>strcat</code>、<code>gets</code>、<code>scanf("%s")</code> 都<b>不會檢查目的地陣列的大小</b>。來源字串太長就會寫到陣列外面，造成緩衝區溢位。</p>
<table>
<tr><th>危險</th><th>改用</th></tr>
<tr><td><code>gets(buf)</code>（已從 C11 標準移除）</td><td><code>fgets(buf, sizeof buf, stdin)</code></td></tr>
<tr><td><code>scanf("%s", buf)</code></td><td><code>scanf("%19s", buf)</code>（限制最多 19 個字元，留 1 個給 '\\0'）</td></tr>
<tr><td><code>strcpy(dst, src)</code></td><td><code>snprintf(dst, sizeof dst, "%s", src)</code></td></tr>
<tr><td><code>strcat(dst, src)</code></td><td>先計算剩餘空間，或用 snprintf 組合整個字串</td></tr>
<tr><td><code>sprintf(buf, …)</code></td><td><code>snprintf(buf, sizeof buf, …)</code></td></tr>
</table>
<p><code>strncpy</code> 雖然有長度限制，但來源太長時<b>不會補 '\\0'</b>，容易誤用；複製字串建議用 snprintf。</p>
<h3>讀取一整行</h3>
<pre class="c" data-input="王小明 台北市大安區&#10;">#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void)
{
    char line[64];
    if (fgets(line, sizeof line, stdin) != NULL) {   // 會讀到換行字元，最多讀 63 個字元
        line[strcspn(line, "\\n")] = '\\0';            // 把結尾的換行去掉
        printf("讀到：[%s]，長度 %zu 位元組\\n", line, strlen(line));
    }
    return 0;
}</pre>
<p>scanf 的 %s 遇到空白就停止；要讀含空白的整行（例如地址），用 fgets。</p>` },
    { id: 'ctype', title: '字元處理', html: `
<pre class="c">#include &lt;stdio.h&gt;
#include &lt;ctype.h&gt;

int main(void)
{
    const char *s = "Hello World 2024!";
    int upper = 0, digits = 0, spaces = 0;
    for (int i = 0; s[i] != '\\0'; i++) {          // 走訪字串直到 '\\0'
        if (isupper((unsigned char)s[i])) upper++;
        if (isdigit((unsigned char)s[i])) digits++;
        if (isspace((unsigned char)s[i])) spaces++;
        putchar(toupper((unsigned char)s[i]));
    }
    printf("\\n大寫 %d 個、數字 %d 個、空白 %d 個\\n", upper, digits, spaces);
    printf("'a' - 'A' = %d，'7' - '0' = %d\\n", 'a' - 'A', '7' - '0');
    return 0;
}</pre>
<p>字元本質上是整數（ASCII 碼），所以 <code>'7' - '0'</code> 得到數字 7，是把數字字元轉成數值的常用技巧。ctype.h 的函式參數要先轉成 unsigned char，避免中文等非 ASCII 字元造成未定義行為。</p>` }
  ],
  keypoints: [
    'C 字串是以 \'\\0\' 結尾的 char 陣列；"hello" 佔 6 個位元組，strlen 為 5。',
    '字串常值是唯讀的，指向它的指標建議宣告為 const char *。',
    '比較字串內容用 strcmp(a, b) == 0，不能用 ==；複製字串不能用 =。',
    'strcpy、strcat、gets、scanf("%s") 不檢查大小，會造成緩衝區溢位。',
    '安全寫法：fgets 讀整行、scanf 限制寬度、snprintf 取代 strcpy 與 sprintf。',
    '字元是整數，\'7\' - \'0\' 等於 7；ctype.h 提供 isdigit、toupper 等函式。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 55,
  title: '動態記憶體與結構',
  summary: '堆疊與堆積、malloc／calloc／realloc／free、記憶體洩漏與重複釋放、struct 結構與 typedef、結構陣列與結構指標、箭頭運算子，以及用結構與指標實作鏈結串列。',
  sections: [
    { id: 'heap', title: '堆疊與堆積', html: `
<table>
<tr><th></th><th>堆疊（Stack）</th><th>堆積（Heap）</th></tr>
<tr><td>存放</td><td>區域變數、函式參數</td><td>malloc 動態配置的記憶體</td></tr>
<tr><td>配置與釋放</td><td>自動（進入／離開函式）</td><td><b>手動</b>（malloc／free）</td></tr>
<tr><td>大小</td><td>小（通常幾 MB），太大的陣列會堆疊溢位</td><td>大，受限於系統記憶體</td></tr>
<tr><td>大小何時決定</td><td>編譯時（陣列大小固定）</td><td>執行時（可依輸入決定）</td></tr>
</table>
<p>當資料量在執行時才知道（例如使用者輸入有幾筆資料），或資料很大、需要在函式結束後繼續存在時，就要用<b>動態記憶體配置</b>。</p>` },
    { id: 'malloc', title: 'malloc 與 free', html: `
<pre class="c" data-input="5&#10;80 92 75 60 88">#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(void)
{
    int n;
    scanf("%d", &amp;n);
    int *scores = malloc(n * sizeof *scores);    // 配置 n 個 int
    if (scores == NULL) {                        // 配置失敗會傳回 NULL，一定要檢查
        printf("記憶體不足\\n");
        return 1;
    }
    int sum = 0;
    for (int i = 0; i &lt; n; i++) {
        scanf("%d", &amp;scores[i]);                 // 用法和陣列一樣
        sum += scores[i];
    }
    printf("%d 筆，平均 %.1f\\n", n, (double)sum / n);

    int *bigger = realloc(scores, 2 * n * sizeof *scores);   // 擴大成 2n 個
    if (bigger != NULL) scores = bigger;         // 失敗時原本的記憶體還在，不能直接覆蓋

    free(scores);                                // 用完一定要釋放
    scores = NULL;                               // 避免之後誤用（懸置指標）
    return 0;
}</pre>
<table>
<tr><th>函式</th><th>作用</th></tr>
<tr><td><code>malloc(bytes)</code></td><td>配置指定位元組數，<b>內容不會初始化</b></td></tr>
<tr><td><code>calloc(n, size)</code></td><td>配置 n 個元素，<b>全部初始化為 0</b></td></tr>
<tr><td><code>realloc(p, bytes)</code></td><td>調整大小，可能搬到新位址，傳回新指標</td></tr>
<tr><td><code>free(p)</code></td><td>釋放；<code>free(NULL)</code> 是安全的、什麼都不做</td></tr>
</table>
<div class="box warn"><b class="t">記憶體管理的三大錯誤</b><b>記憶體洩漏</b>：malloc 後忘了 free，長時間執行的程式（伺服器、韌體）會越用越多記憶體直到耗盡。<b>重複釋放</b>：同一塊記憶體 free 兩次，會破壞堆積。<b>釋放後使用（Use After Free）</b>：free 後繼續透過指標存取，是常見的資安漏洞。free 後立刻設為 NULL 可以避免後兩者。</div>` },
    { id: 'struct', title: '結構 struct', html: `
<p><b>結構（struct）</b>把多個相關的資料組合成一個新的型別，例如學生的學號、姓名、成績：</p>
<pre class="c">#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

typedef struct {               // typedef 讓之後可以直接寫 Student，不用寫 struct Student
    int id;
    char name[20];
    double score;
} Student;

void print_student(const Student *s)     // 傳指標，避免複製整個結構
{
    printf("%d %-6s %.1f\\n", s-&gt;id, s-&gt;name, s-&gt;score);   // 結構指標用 -&gt;
}

int main(void)
{
    Student a = {1, "小明", 88.5};
    Student b;
    b.id = 2;                                 // 結構變數用 . 存取成員
    snprintf(b.name, sizeof b.name, "%s", "小華");
    b.score = 92.0;

    Student class[3] = {a, b, {3, "小美", 79.0}};   // 結構陣列
    double total = 0;
    for (int i = 0; i &lt; 3; i++) {
        print_student(&amp;class[i]);
        total += class[i].score;
    }
    printf("平均 %.2f，Student 佔 %zu 位元組\\n", total / 3, sizeof(Student));
    return 0;
}</pre>
<ul>
<li>結構變數用 <code>.</code> 存取成員；結構指標用 <code>-&gt;</code>，<code>p-&gt;score</code> 等同 <code>(*p).score</code>。</li>
<li>結構可以直接用 = 整個複製（陣列不行），但傳給函式時建議傳指標，避免複製大量資料。</li>
<li>sizeof(Student) 可能大於各成員大小的總和，因為編譯器會為了對齊而加入<b>填充位元組（padding）</b>。</li>
</ul>` },
    { id: 'list', title: '鏈結串列', html: `
<p>陣列大小固定、在中間插入要搬動大量元素。<b>鏈結串列（Linked List）</b>的每個節點存放資料與「下一個節點的指標」，可以隨時新增、刪除節點：</p>
<pre class="out">head → [10 | ●] → [20 | ●] → [30 | NULL]</pre>
<pre class="c">#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

typedef struct Node {
    int value;
    struct Node *next;        // 指向下一個節點（結構中不能用 typedef 之後的名稱）
} Node;

Node *push_front(Node *head, int value)
{
    Node *n = malloc(sizeof *n);
    if (n == NULL) return head;
    n-&gt;value = value;
    n-&gt;next = head;
    return n;                  // 新節點成為新的 head
}

Node *remove_value(Node *head, int value)
{
    Node **pp = &amp;head;         // 指向「指向目前節點的指標」，可統一處理刪除第一個節點的情況
    while (*pp != NULL) {
        if ((*pp)-&gt;value == value) {
            Node *dead = *pp;
            *pp = dead-&gt;next;
            free(dead);
            break;
        }
        pp = &amp;(*pp)-&gt;next;
    }
    return head;
}

void print_list(const Node *head)
{
    for (const Node *p = head; p != NULL; p = p-&gt;next) printf("%d -&gt; ", p-&gt;value);
    printf("NULL\\n");
}

void free_list(Node *head)
{
    while (head != NULL) {
        Node *next = head-&gt;next;   // 先記住下一個，再釋放目前的
        free(head);
        head = next;
    }
}

int main(void)
{
    Node *head = NULL;
    for (int i = 1; i &lt;= 4; i++) head = push_front(head, i * 10);
    print_list(head);
    head = remove_value(head, 20);
    print_list(head);
    free_list(head);
    return 0;
}</pre>
<table>
<tr><th>操作</th><th>陣列</th><th>鏈結串列</th></tr>
<tr><td>依索引存取第 i 個</td><td>O(1)</td><td>O(n)，要從頭走</td></tr>
<tr><td>在開頭插入或刪除</td><td>O(n)，要搬移元素</td><td>O(1)</td></tr>
<tr><td>記憶體</td><td>連續，快取效率好</td><td>分散，每個節點多存一個指標</td></tr>
</table>` }
  ],
  keypoints: [
    '區域變數放在堆疊、自動管理；malloc 配置的記憶體在堆積，要手動 free。',
    'malloc 不初始化、calloc 初始化為 0、realloc 調整大小；配置後要檢查是否為 NULL。',
    '每個 malloc 都要對應一個 free；free 後設為 NULL，避免重複釋放與釋放後使用。',
    'struct 組合多個成員；變數用 . 存取，指標用 ->，p->x 等同 (*p).x。',
    '結構傳給函式建議傳指標；sizeof 結構可能因對齊而包含填充位元組。',
    '鏈結串列在開頭插入刪除為 O(1)，依索引存取為 O(n)；釋放時要先記住下一個節點。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '檔案與前置處理器',
  summary: '開啟與關閉檔案、讀寫文字檔、fgets 逐行讀取、二進位檔 fread／fwrite、錯誤處理，前置處理器的 #include、#define 與巨集陷阱、條件編譯，以及多檔案程式、標頭檔防護與 Makefile。',
  sections: [
    { id: 'file', title: '讀寫文字檔', html: `
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    FILE *f = fopen("scores.txt", "w");          // "w" 寫入（會覆蓋原內容）
    if (f == NULL) {
        perror("無法開啟檔案");                  // 印出系統錯誤原因
        return 1;
    }
    fprintf(f, "小明 88\\n小華 92\\n小美 79\\n");
    fclose(f);                                   // 用完一定要關閉，資料才會寫入

    f = fopen("scores.txt", "r");                // "r" 讀取
    if (f == NULL) return 1;
    char name[20];
    int score, total = 0, n = 0;
    while (fscanf(f, "%19s %d", name, &amp;score) == 2) {   // 成功讀到 2 個值才繼續
        printf("%s：%d\\n", name, score);
        total += score;
        n++;
    }
    fclose(f);
    printf("平均 %.1f\\n", (double)total / n);
    return 0;
}</pre>
<table>
<tr><th>模式</th><th>意義</th></tr>
<tr><td><code>"r"</code></td><td>讀取，檔案必須存在</td></tr>
<tr><td><code>"w"</code></td><td>寫入，檔案不存在就建立，<b>存在就清空</b></td></tr>
<tr><td><code>"a"</code></td><td>附加到檔案結尾</td></tr>
<tr><td><code>"r+"</code></td><td>讀寫</td></tr>
<tr><td>加上 <code>b</code>，例如 <code>"rb"</code></td><td>二進位模式（Windows 上不會轉換換行字元）</td></tr>
</table>
<p>逐行讀取用 <code>fgets(line, sizeof line, f)</code>，讀到檔案結尾時傳回 NULL。不要用 <code>while (!feof(f))</code> 當迴圈條件，最後一筆常會被處理兩次。</p>` },
    { id: 'binary', title: '二進位檔', html: `
<pre class="c">#include &lt;stdio.h&gt;

typedef struct { int id; double price; } Item;

int main(void)
{
    Item items[3] = {{1, 590.0}, {2, 2490.0}, {3, 6990.0}};
    FILE *f = fopen("items.bin", "wb");
    if (f == NULL) return 1;
    size_t written = fwrite(items, sizeof(Item), 3, f);   // 直接寫入記憶體內容
    fclose(f);

    Item loaded[3];
    f = fopen("items.bin", "rb");
    if (f == NULL) return 1;
    size_t got = fread(loaded, sizeof(Item), 3, f);
    fclose(f);
    printf("寫入 %zu 筆、讀回 %zu 筆，第 3 筆價格 %.0f\\n", written, got, loaded[2].price);
    return 0;
}</pre>
<p>二進位檔讀寫快、檔案小，但內容和平台有關（整數大小、對齊、大小端），不同電腦之間交換資料時，文字格式（CSV、JSON）比較可靠。</p>` },
    { id: 'preprocessor', title: '前置處理器與巨集', html: `
<p>以 <code>#</code> 開頭的指令在編譯前由<b>前置處理器</b>處理，做的是<b>文字取代</b>：</p>
<pre class="c">#include &lt;stdio.h&gt;

#define PI 3.14159
#define SQUARE_BAD(x) x * x
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) &gt; (b) ? (a) : (b))

int main(void)
{
    printf("%f\\n", PI * 2);
    printf("%d\\n", SQUARE_BAD(3 + 1));   // 展開成 3 + 1 * 3 + 1 = 7，不是 16！
    printf("%d\\n", SQUARE(3 + 1));       // ((3 + 1) * (3 + 1)) = 16
    int i = 5;
    printf("%d\\n", MAX(i, 3));
    return 0;
}</pre>
<div class="box warn"><b class="t">巨集陷阱</b>巨集只是文字取代，所以參數與整體都要加括號。另外 <code>SQUARE(i++)</code> 會展開成 <code>((i++) * (i++))</code>，i 被加兩次而且是未定義行為。能用函式（或 C99 的 inline 函式）時，優先使用函式。</div>
<h3>條件編譯</h3>
<pre class="out">#define DEBUG 1

#if DEBUG
    printf("除錯訊息：x = %d\\n", x);     // DEBUG 為 1 時才會編譯進程式
#endif

#ifdef _WIN32
    // Windows 專用的程式
#else
    // Linux／macOS 的程式
#endif</pre>
<p>編譯時也可以用 <code>gcc -DDEBUG=1 a.c</code> 從命令列定義巨集。嵌入式開發常用條件編譯，讓同一份程式碼支援不同的硬體型號。</p>` },
    { id: 'multi', title: '多檔案程式與 Makefile', html: `
<p>程式變大後，會拆成多個 .c 檔與 .h 標頭檔：<b>標頭檔放宣告，.c 檔放實作</b>。</p>
<pre class="out">// mathutil.h
#ifndef MATHUTIL_H          // 標頭檔防護：避免同一個標頭檔被重複引入
#define MATHUTIL_H
int add(int a, int b);
double average(const int *arr, int n);
#endif

// mathutil.c
#include "mathutil.h"       // 自己的標頭檔用雙引號，標準函式庫用 &lt; &gt;
int add(int a, int b) { return a + b; }
double average(const int *arr, int n) { … }

// main.c
#include &lt;stdio.h&gt;
#include "mathutil.h"
int main(void) { printf("%d\\n", add(2, 3)); return 0; }</pre>
<pre class="out">gcc -c mathutil.c          # 各自編譯成目的檔
gcc -c main.c
gcc main.o mathutil.o -o app   # 連結成執行檔</pre>
<p>每次手動下指令很麻煩，用 <b>Makefile</b> 描述相依關係，只要輸入 <code>make</code>，就會只重新編譯有修改過的檔案：</p>
<pre class="out">CC = gcc
CFLAGS = -Wall -std=c17 -g

app: main.o mathutil.o
	$(CC) $(CFLAGS) main.o mathutil.o -o app

main.o: main.c mathutil.h
	$(CC) $(CFLAGS) -c main.c

mathutil.o: mathutil.c mathutil.h
	$(CC) $(CFLAGS) -c mathutil.c

clean:
	rm -f *.o app</pre>
<p>Makefile 的指令行開頭必須是 Tab 字元。大型專案常用 CMake 產生建置設定。</p>` }
  ],
  keypoints: [
    'fopen 開啟檔案，失敗傳回 NULL；用完要 fclose；"w" 會清空原檔，"a" 附加到結尾。',
    'fscanf 以傳回值判斷是否讀取成功；逐行讀取用 fgets，不要用 while (!feof(f))。',
    '二進位檔用 fwrite／fread，速度快但與平台有關。',
    '#define 巨集是文字取代，參數與整體都要加括號，避免把有副作用的運算式當參數。',
    '#if、#ifdef 條件編譯可依設定或平台編譯不同程式碼。',
    '標頭檔放宣告並加上 #ifndef 防護，.c 檔放實作；Makefile 只重新編譯有變動的檔案。'
  ]
},
{
  id: 'c11', subject: 2, minutes: 45,
  title: '位元運算與嵌入式',
  summary: '二進位與十六進位、位元運算子、位移、設定／清除／切換／檢查位元的遮罩技巧、stdint.h 固定寬度整數、volatile 與暫存器、大小端，以及嵌入式開發的特性。',
  sections: [
    { id: 'binary', title: '二進位與位元運算子', html: `
<table>
<tr><th>運算子</th><th>名稱</th><th>範例（a = 0b1100 = 12，b = 0b1010 = 10）</th></tr>
<tr><td><code>&amp;</code></td><td>AND：兩個都是 1 才是 1</td><td><code>a &amp; b</code> = 0b1000 = 8</td></tr>
<tr><td><code>|</code></td><td>OR：任一為 1 就是 1</td><td><code>a | b</code> = 0b1110 = 14</td></tr>
<tr><td><code>^</code></td><td>XOR：不同為 1</td><td><code>a ^ b</code> = 0b0110 = 6</td></tr>
<tr><td><code>~</code></td><td>NOT：每個位元反轉</td><td><code>~a</code>（依型別寬度而定）</td></tr>
<tr><td><code>&lt;&lt;</code></td><td>左移：乘以 2 的 n 次方</td><td><code>1 &lt;&lt; 3</code> = 8</td></tr>
<tr><td><code>&gt;&gt;</code></td><td>右移：除以 2 的 n 次方</td><td><code>a &gt;&gt; 2</code> = 3</td></tr>
</table>
<pre class="c">#include &lt;stdio.h&gt;

void print_bits(unsigned char x)
{
    for (int i = 7; i &gt;= 0; i--) putchar((x &gt;&gt; i) &amp; 1 ? '1' : '0');
}

int main(void)
{
    unsigned char a = 12, b = 10;
    printf("a     = "); print_bits(a);      printf(" (%d)\\n", a);
    printf("b     = "); print_bits(b);      printf(" (%d)\\n", b);
    printf("a &amp; b = "); print_bits(a &amp; b);  printf(" (%d)\\n", a &amp; b);
    printf("a | b = "); print_bits(a | b);  printf(" (%d)\\n", a | b);
    printf("a ^ b = "); print_bits(a ^ b);  printf(" (%d)\\n", a ^ b);
    printf("~a    = "); print_bits((unsigned char)~a); printf(" (%d)\\n", (unsigned char)~a);
    printf("0x%X 0x%02x %d\\n", 255, 10, 0x1F);   // 十六進位：一個十六進位數字 = 4 個位元
    return 0;
}</pre>
<p>互動練習中的「位元運算視覺化」可以輸入任意兩個數字，逐位元觀察運算結果。</p>` },
    { id: 'mask', title: '遮罩：設定、清除、切換與檢查位元', html: `
<p>嵌入式系統中，硬體的設定常常是一個暫存器的某幾個位元（例如第 3 個位元控制 LED）。用<b>遮罩（mask）</b>操作單一位元，而不影響其他位元：</p>
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    unsigned char reg = 0x00;            // 0000 0000

    reg |= (1u &lt;&lt; 3);                    // 設定第 3 位元：0000 1000
    reg |= (1u &lt;&lt; 0);                    // 設定第 0 位元：0000 1001
    printf("設定後 0x%02X\\n", reg);

    reg &amp;= ~(1u &lt;&lt; 3);                   // 清除第 3 位元：0000 0001
    printf("清除後 0x%02X\\n", reg);

    reg ^= (1u &lt;&lt; 7);                    // 切換第 7 位元：1000 0001
    printf("切換後 0x%02X\\n", reg);

    if (reg &amp; (1u &lt;&lt; 7)) printf("第 7 位元是 1\\n");   // 檢查
    printf("第 3 位元是 %d\\n", (reg &gt;&gt; 3) &amp; 1);

    unsigned int x = 0xABCD;
    printf("低 8 位元 0x%02X，高 8 位元 0x%02X\\n", x &amp; 0xFF, (x &gt;&gt; 8) &amp; 0xFF);
    return 0;
}</pre>
<table>
<tr><th>操作</th><th>寫法</th></tr>
<tr><td>設定第 n 位元為 1</td><td><code>x |= (1u &lt;&lt; n);</code></td></tr>
<tr><td>清除第 n 位元為 0</td><td><code>x &amp;= ~(1u &lt;&lt; n);</code></td></tr>
<tr><td>切換第 n 位元</td><td><code>x ^= (1u &lt;&lt; n);</code></td></tr>
<tr><td>檢查第 n 位元</td><td><code>(x &gt;&gt; n) &amp; 1</code> 或 <code>x &amp; (1u &lt;&lt; n)</code></td></tr>
<tr><td>判斷奇偶</td><td><code>x &amp; 1</code>（1 為奇數）</td></tr>
<tr><td>判斷是否為 2 的次方</td><td><code>x &amp;&amp; !(x &amp; (x - 1))</code></td></tr>
</table>
<div class="box warn"><b class="t">位元運算用無號整數</b>對有號負數右移的結果由實作決定，左移有號數造成溢位是未定義行為。位元操作一律使用 unsigned 型別，並寫 1u 而不是 1。</div>` },
    { id: 'embedded', title: '嵌入式 C 的重點', html: `
<h3>固定寬度整數</h3>
<p>int 的大小依平台而定（8 位元微控制器上可能只有 2 位元組）。和硬體、通訊協定打交道時，使用 <code>&lt;stdint.h&gt;</code> 的固定寬度型別：</p>
<pre class="c">#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;
#include &lt;inttypes.h&gt;

int main(void)
{
    uint8_t  status = 0xFF;          // 剛好 8 位元、無號
    int16_t  temperature = -40;      // 剛好 16 位元、有號
    uint32_t counter = 4000000000u;  // 剛好 32 位元、無號
    printf("%u %d %" PRIu32 "\\n", status, temperature, counter);
    printf("%zu %zu %zu\\n", sizeof status, sizeof temperature, sizeof counter);
    return 0;
}</pre>
<h3>volatile 與記憶體映射暫存器</h3>
<pre class="out">#define GPIO_OUT (*(volatile uint32_t *)0x40020014)   // 把固定位址當成暫存器使用

GPIO_OUT |= (1u &lt;&lt; 5);        // 點亮接在第 5 腳的 LED</pre>
<p><code>volatile</code> 告訴編譯器「這個值可能被程式以外的東西（硬體、中斷）改變」，每次都要真的從記憶體讀寫，不能最佳化掉。用於硬體暫存器、中斷服務常式中修改的變數。</p>
<h3>大小端（Endianness）</h3>
<pre class="c">#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;

int main(void)
{
    uint32_t x = 0x12345678;
    unsigned char *p = (unsigned char *)&amp;x;     // 逐位元組查看記憶體內容
    printf("記憶體中的位元組：%02x %02x %02x %02x\\n", p[0], p[1], p[2], p[3]);
    printf("%s\\n", p[0] == 0x78 ? "小端（Little Endian）：低位元組放在低位址" : "大端（Big Endian）");
    return 0;
}</pre>
<p>x86 與多數 ARM 是小端；網路傳輸使用大端（網路位元組順序），所以網路程式要用 htonl／ntohl 轉換。</p>
<div class="box tip"><b class="t">想往嵌入式發展</b>建議接著買一塊 Arduino、STM32 或 ESP32 開發板，練習 GPIO、UART、I2C、SPI 與中斷。韌體工程師面試常考：位元操作、volatile、指標、記憶體對齊、大小端、中斷服務常式的注意事項。</div>` }
  ],
  keypoints: [
    '& AND、| OR、^ XOR、~ NOT、<< 左移（乘 2ⁿ）、>> 右移（除 2ⁿ）。',
    '設定位元 x |= (1u << n)、清除 x &= ~(1u << n)、切換 x ^= (1u << n)、檢查 (x >> n) & 1。',
    '位元運算使用無號整數；x & 1 可判斷奇偶。',
    '與硬體或通訊協定相關時，使用 stdint.h 的 uint8_t、int16_t、uint32_t 等固定寬度型別。',
    'volatile 讓編譯器每次都實際讀寫記憶體，用於硬體暫存器與中斷中修改的變數。',
    'x86 與多數 ARM 為小端，網路位元組順序為大端。'
  ]
},
{
  id: 'c12', subject: 2, minutes: 40,
  title: '除錯、安全與面試準備',
  summary: '用編譯器警告與 Sanitizer 抓錯、gdb 除錯器基本操作、常見的未定義行為清單、安全的 C 程式寫法、APCS 與程式競賽的準備方向，以及 C 語言面試常見題。',
  sections: [
    { id: 'tools', title: '找出錯誤的工具', html: `
<table>
<tr><th>工具</th><th>用法</th><th>能找到</th></tr>
<tr><td>編譯器警告</td><td><code>gcc -Wall -Wextra -std=c17</code></td><td>未使用的變數、格式字元錯誤、= 與 == 誤用、未初始化</td></tr>
<tr><td>AddressSanitizer</td><td><code>gcc -g -fsanitize=address a.c</code></td><td>陣列越界、釋放後使用、重複釋放、記憶體洩漏</td></tr>
<tr><td>UndefinedBehaviorSanitizer</td><td><code>gcc -g -fsanitize=undefined a.c</code></td><td>有號整數溢位、除以零、不合法的位移</td></tr>
<tr><td>Valgrind</td><td><code>valgrind --leak-check=full ./a</code></td><td>記憶體洩漏與非法存取（Linux）</td></tr>
<tr><td>gdb 除錯器</td><td><code>gcc -g a.c -o a &amp;&amp; gdb ./a</code></td><td>逐行執行、查看變數、找出當機位置</td></tr>
</table>
<h3>gdb 常用指令</h3>
<pre class="out">(gdb) break main          # 在 main 設定中斷點（簡寫 b）
(gdb) run                 # 執行程式（r）
(gdb) next                # 執行下一行，不進入函式（n）
(gdb) step                # 執行下一行，會進入函式（s）
(gdb) print x             # 印出變數 x（p）
(gdb) backtrace           # 程式當機時，查看呼叫堆疊（bt）
(gdb) continue            # 繼續執行到下一個中斷點（c）
(gdb) quit</pre>
<p>VS Code 安裝 C/C++ 延伸模組後，也可以用圖形介面設定中斷點、查看變數，底層用的就是 gdb。</p>` },
    { id: 'ub', title: '常見的未定義行為', html: `
<p><b>未定義行為（Undefined Behavior，UB）</b>是 C 標準沒有規定結果的情況。程式可能看起來正常、換一台電腦或開最佳化就出錯，是最難找的錯誤：</p>
<table>
<tr><th>未定義行為</th><th>例子</th></tr>
<tr><td>陣列越界</td><td><code>int a[5]; a[5] = 1;</code></td></tr>
<tr><td>使用未初始化的變數</td><td><code>int x; printf("%d", x);</code></td></tr>
<tr><td>對 NULL 或懸置指標解參考</td><td>free 後繼續使用、傳回區域變數的位址</td></tr>
<tr><td>有號整數溢位</td><td><code>INT_MAX + 1</code></td></tr>
<tr><td>修改字串常值</td><td><code>char *s = "hi"; s[0] = 'H';</code></td></tr>
<tr><td>同一運算式中多次修改同一變數</td><td><code>i = i++ + 1;</code></td></tr>
<tr><td>位移超過型別寬度或位移負數</td><td><code>1 &lt;&lt; 32</code>（int 為 32 位元時）</td></tr>
<tr><td>除以零</td><td><code>x / 0</code></td></tr>
</table>
<p>下面的程式用 -fsanitize 的概念說明：編譯器警告與 Sanitizer 是你的好朋友。試著執行看看（Compiler Explorer 的執行環境沒有開啟 Sanitizer，越界的結果不可預測）：</p>
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int sum = 0;
    int a[5] = {1, 2, 3, 4, 5};
    for (int i = 0; i &lt; 5; i++) sum += a[i];   // 正確：i &lt; 5
    printf("sum = %d\\n", sum);
    unsigned int u = 0;
    u = u - 1;                                  // 無號整數繞回是「有定義」的
    printf("0u - 1 = %u\\n", u);
    return 0;
}</pre>` },
    { id: 'secure', title: '安全的 C 程式寫法', html: `
<ol>
<li>所有輸入都不可信任：檢查長度、範圍與格式（scanf 的傳回值、fgets 的大小）。</li>
<li>字串操作用有長度限制的函式：fgets、snprintf，不用 gets、strcpy、sprintf。</li>
<li>每次 malloc 都檢查 NULL，每個 malloc 都有對應的 free，free 後設為 NULL。</li>
<li>printf 的格式字串不要直接用使用者輸入：<code>printf(input)</code> 是<b>格式字串漏洞</b>，要寫 <code>printf("%s", input)</code>。</li>
<li>計算大小時注意整數溢位：<code>malloc(n * size)</code> 的乘法可能溢位，造成配置的空間比預期小。</li>
<li>開啟所有警告並把警告當成錯誤（<code>-Wall -Wextra -Werror</code>），用 Sanitizer 測試。</li>
</ol>
<div class="box memo"><b class="t">與資安的關係</b>緩衝區溢位、釋放後使用、格式字串漏洞都是記憶體安全問題，許多國家的資安機關因此建議新專案優先考慮 Rust 等記憶體安全的語言。但大量既有系統、作業系統核心與韌體仍是 C，懂得安全地寫 C、能審查 C 程式碼的工程師需求很高。資安課程（iPAS、Security+）中的緩衝區溢位攻擊，就是本課程第 6、8 章的內容。</div>` },
    { id: 'interview', title: 'APCS 與面試準備', html: `
<h3>APCS 大學程式設計先修檢測</h3>
<p>APCS 實作題可以選擇 C、C++、Java、Python。準備方向：本課程的迴圈、陣列、函式、遞迴、排序與搜尋，再加上 C++ 課程中的 STL 與複雜度分析。多練習 ZeroJudge 等線上解題系統的歷屆題目，注意輸入格式與時間限制。</p>
<h3>面試常見題</h3>
<table>
<tr><th>題目</th><th>重點</th></tr>
<tr><td>指標與陣列的差別</td><td>sizeof 不同、陣列名稱不能被重新指定、陣列傳給函式會變成指標</td></tr>
<tr><td>寫出字串反轉、計算字串長度（不用 strlen）</td><td>走訪到 '\\0'、雙指標交換</td></tr>
<tr><td>反轉鏈結串列</td><td>三個指標 prev、curr、next</td></tr>
<tr><td>static 的三種用途</td><td>區域變數保留值、全域變數與函式限制在本檔案內</td></tr>
<tr><td>const 與指標的組合</td><td>const int * 與 int *const 的差別</td></tr>
<tr><td>volatile 的用途</td><td>硬體暫存器、中斷、多執行緒共享旗標</td></tr>
<tr><td>巨集與函式的差別</td><td>文字取代、無型別檢查、括號與副作用陷阱</td></tr>
<tr><td>堆疊與堆積</td><td>配置方式、大小、生命週期</td></tr>
<tr><td>記憶體洩漏如何發生與檢查</td><td>malloc 沒 free、Valgrind／AddressSanitizer</td></tr>
<tr><td>判斷大小端、設定某個位元</td><td>第 11 章的程式</td></tr>
</table>
<pre class="c">#include &lt;stdio.h&gt;

void reverse(char *s)
{
    char *end = s;
    while (*end) end++;           // 走到 '\\0'
    end--;                        // 最後一個字元
    while (s &lt; end) {             // 雙指標從兩端往中間交換
        char t = *s;
        *s++ = *end;
        *end-- = t;
    }
}

int main(void)
{
    char word[] = "embedded";
    reverse(word);
    printf("%s\\n", word);
    return 0;
}</pre>
<div class="box tip"><b class="t">作品集建議</b>用 C 寫一個有實際用途的小程式放上 GitHub：通訊錄（結構 + 鏈結串列 + 檔案存檔）、簡易 shell、CSV 統計工具，或 Arduino／ESP32 的感測器專題。README 說明功能、編譯方式，以及如何用 Sanitizer 測試沒有記憶體錯誤。</div>` }
  ],
  keypoints: [
    '編譯時加 -Wall -Wextra；用 -fsanitize=address 找越界與記憶體錯誤，-fsanitize=undefined 找未定義行為。',
    'gdb 常用指令：break、run、next、step、print、backtrace。',
    '未定義行為包括越界、未初始化變數、懸置指標、有號整數溢位、修改字串常值。',
    'printf(input) 是格式字串漏洞，應寫 printf("%s", input)。',
    'APCS 實作題可用 C／C++，準備迴圈、陣列、遞迴、排序搜尋與 STL。',
    '面試常考指標與陣列、static、const、volatile、巨集、堆疊與堆積、反轉鏈結串列。'
  ]
}
);
