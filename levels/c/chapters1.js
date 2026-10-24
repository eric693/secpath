/* C 語言 基礎篇：語法、流程控制、函式與陣列
   <pre class="c"> 為可在網頁上編譯執行的範例（data-input 為標準輸入）；<pre class="out"> 為一般程式碼或輸出
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 40,
  title: 'C 語言與開發環境',
  summary: 'C 語言的特色與應用領域、從原始碼到執行檔的編譯流程、第一支程式的每一行在做什麼、在自己的電腦安裝 GCC 與 VS Code，以及編譯錯誤與警告的看法。',
  sections: [
    { id: 'why', title: '為什麼學 C 語言', html: `
<p>C 語言誕生於 1972 年，至今仍是最重要的程式語言之一。它很接近硬體，可以直接操作記憶體，執行速度快、程式小，所以這些地方幾乎都是 C：</p>
<table>
<tr><th>領域</th><th>例子</th></tr>
<tr><td>作業系統</td><td>Linux 核心、Windows 核心、macOS 的底層</td></tr>
<tr><td>嵌入式與韌體</td><td>家電、車用電子、IoT 裝置、主機板 BIOS、硬碟與網路晶片韌體</td></tr>
<tr><td>半導體與 IC 設計</td><td>晶片驅動程式、驗證程式、測試設備軟體</td></tr>
<tr><td>其他語言的底層</td><td>Python、PHP、資料庫（MySQL、SQLite）本身都是用 C 寫的</td></tr>
</table>
<div class="box tip"><b class="t">台灣求職觀點</b>台積電、聯發科、瑞昱、鴻海等半導體與電子業的韌體、驅動程式、嵌入式工程師職缺，C 語言幾乎是必備條件。資工系的程式設計、資料結構課程，以及 APCS 大學程式設計先修檢測也都以 C／C++ 為主。</div>
<h3>C 語言的特色</h3>
<ul>
<li><b>編譯式語言</b>：先把原始碼編譯成機器碼再執行，比 Python 這類直譯式語言快很多。</li>
<li><b>靜態型別</b>：每個變數都要宣告型別，型別錯誤在編譯時就會發現。</li>
<li><b>手動管理記憶體</b>：可以精確控制記憶體，但也要自己負責釋放，寫錯就會當機或產生安全漏洞。</li>
<li><b>語法精簡</b>：關鍵字只有 30 多個，C++、Java、C#、JavaScript 的語法都源自 C。</li>
</ul>` },
    { id: 'compile', title: '編譯流程', html: `
<p>寫好的 C 程式（.c 檔）不能直接執行，要經過<b>編譯器</b>（例如 GCC）轉成執行檔。完整流程有四個步驟：</p>
<div class="flow"><span>前置處理：展開 #include、#define（.i）</span><span>編譯：轉成組合語言（.s）</span><span>組譯：轉成機器碼目的檔（.o）</span><span>連結：合併函式庫成執行檔</span></div>
<pre class="out">gcc hello.c -o hello        # 一次完成四個步驟，產生執行檔 hello
./hello                     # 執行（Windows 為 hello.exe）

gcc -E hello.c -o hello.i   # 只做前置處理
gcc -S hello.c              # 產生組合語言 hello.s
gcc -c hello.c              # 產生目的檔 hello.o
gcc -Wall -g hello.c -o hello   # 開啟所有警告並加入除錯資訊（建議一律加上）</pre>
<div class="box memo"><b class="t">編譯錯誤與連結錯誤</b>語法寫錯（少了分號、變數沒宣告）會在<b>編譯</b>階段報錯；呼叫了只有宣告沒有定義的函式，則是在<b>連結</b>階段出現 undefined reference 錯誤。</div>` },
    { id: 'hello', title: '第一支程式', html: `
<p>按下「編譯並執行」，程式碼會送到 Compiler Explorer 以 GCC 編譯並執行，結果顯示在下方。也可以直接修改程式碼再執行：</p>
<pre class="c">#include &lt;stdio.h&gt;      // 引入標準輸入輸出函式庫，才能使用 printf

int main(void)          // 程式從 main 函式開始執行
{
    printf("Hello, C!\\n");          // \\n 代表換行
    printf("我正在學 C 語言\\n");
    return 0;                        // 傳回 0 代表程式正常結束
}</pre>
<table>
<tr><th>程式碼</th><th>意義</th></tr>
<tr><td><code>#include &lt;stdio.h&gt;</code></td><td>前置處理指令，把標準輸入輸出的宣告引入進來</td></tr>
<tr><td><code>int main(void)</code></td><td>主函式，每個 C 程式都有而且只有一個；int 表示會傳回整數</td></tr>
<tr><td><code>{ }</code></td><td>大括號包住函式的內容（程式區塊）</td></tr>
<tr><td><code>printf(…);</code></td><td>輸出文字，每個敘述都以分號 <code>;</code> 結尾</td></tr>
<tr><td><code>return 0;</code></td><td>結束 main 並傳回 0 給作業系統</td></tr>
<tr><td><code>// 註解</code>、<code>/* 註解 */</code></td><td>不會被執行的說明文字</td></tr>
</table>
<h3>試著讓它出錯</h3>
<p>把上面程式第一個 printf 結尾的分號刪掉再執行，看看編譯器的錯誤訊息。錯誤訊息會指出行號與原因（例如 <code>expected ';'</code>），常常錯在<b>上一行</b>。學會看錯誤訊息，是寫程式最重要的能力之一。</p>` },
    { id: 'setup', title: '在自己的電腦上開發', html: `
<table>
<tr><th>系統</th><th>安裝 GCC</th></tr>
<tr><td>Windows</td><td>安裝 <b>MSYS2</b> 後執行 <code>pacman -S mingw-w64-ucrt-x86_64-gcc</code>，或使用 <b>WSL</b>（Windows 子系統 Linux）；也可以安裝 Visual Studio 使用 MSVC 編譯器</td></tr>
<tr><td>macOS</td><td>終端機執行 <code>xcode-select --install</code>（安裝 clang，指令 gcc 也可以用）</td></tr>
<tr><td>Ubuntu</td><td><code>sudo apt install build-essential</code></td></tr>
</table>
<p>編輯器推薦 <b>VS Code</b>，安裝「C/C++」延伸模組即可有語法提示與除錯功能。另外常見的整合開發環境有 Code::Blocks、Dev-C++（學校與 APCS 考場常見）、CLion。</p>
<pre class="out">mkdir c-practice &amp;&amp; cd c-practice
code hello.c                       # 用 VS Code 開啟並撰寫
gcc -Wall -std=c17 hello.c -o hello
./hello</pre>
<div class="box warn"><b class="t">警告不要忽略</b><code>-Wall</code> 會開啟大部分警告。C 語言很多錯誤「可以編譯成功、執行結果卻是錯的」，警告常常就是在提醒這些問題。養成「沒有任何警告」的習慣。</div>` }
  ],
  keypoints: [
    'C 語言接近硬體、執行快，用於作業系統、嵌入式韌體、半導體與其他語言的底層。',
    'C 是編譯式、靜態型別、手動管理記憶體的語言。',
    '編譯流程：前置處理 → 編譯 → 組譯 → 連結。',
    '每個 C 程式從 main 開始執行；敘述以分號結尾；return 0 代表正常結束。',
    '使用 printf 前要 #include <stdio.h>；\\n 代表換行。',
    '編譯時加上 -Wall 開啟警告，並學會閱讀錯誤訊息的行號與原因。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 50,
  title: '變數、資料型別與運算',
  summary: '變數宣告與命名、整數與浮點數型別、sizeof 與數值範圍、溢位、printf 與 scanf 的格式字元、算術運算與整數除法、遞增遞減、型別轉換，以及常數。',
  sections: [
    { id: 'types', title: '變數與資料型別', html: `
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int age = 20;             // 整數
    double height = 172.5;    // 雙精度浮點數（小數）
    char grade = 'A';         // 字元，用單引號
    float ratio = 0.75f;      // 單精度浮點數，結尾加 f

    printf("年齡 %d，身高 %.1f，等級 %c，比例 %.2f\\n", age, height, grade, ratio);
    printf("int 佔 %zu 位元組，double 佔 %zu 位元組，char 佔 %zu 位元組\\n",
           sizeof(int), sizeof(double), sizeof(char));
    return 0;
}</pre>
<table>
<tr><th>型別</th><th>常見大小</th><th>範圍／精確度</th><th>用途</th></tr>
<tr><td><code>char</code></td><td>1 位元組</td><td>-128～127（或 0～255）</td><td>字元、小整數</td></tr>
<tr><td><code>short</code></td><td>2 位元組</td><td>-32768～32767</td><td>小整數</td></tr>
<tr><td><code>int</code></td><td>4 位元組</td><td>約 ±21 億</td><td>一般整數（最常用）</td></tr>
<tr><td><code>long long</code></td><td>8 位元組</td><td>約 ±9.2 × 10<sup>18</sup></td><td>大整數</td></tr>
<tr><td><code>float</code></td><td>4 位元組</td><td>約 7 位有效數字</td><td>記憶體有限時</td></tr>
<tr><td><code>double</code></td><td>8 位元組</td><td>約 15 位有效數字</td><td>一般小數（建議）</td></tr>
</table>
<p>型別前加 <code>unsigned</code> 表示不含負數，範圍變成從 0 開始，例如 <code>unsigned int</code> 為 0～約 42 億。型別的實際大小依平台而定，用 <code>sizeof</code> 查詢（結果型別為 size_t，用 %zu 印出）。</p>
<h3>變數命名規則</h3>
<ul>
<li>只能使用英文字母、數字、底線，且不能以數字開頭；大小寫視為不同。</li>
<li>不能使用關鍵字（int、return、if…）。</li>
<li>取有意義的名稱：<code>total_price</code> 比 <code>tp</code> 好。</li>
<li><b>區域變數宣告後沒有給初值，內容是不確定的</b>（殘留的垃圾值），使用前一定要先指定值。</li>
</ul>` },
    { id: 'overflow', title: '溢位與數值範圍', html: `
<p>每種整數型別能存的範圍有限，超過就會<b>溢位（overflow）</b>：</p>
<pre class="c">#include &lt;stdio.h&gt;
#include &lt;limits.h&gt;

int main(void)
{
    printf("int 最大值：%d\\n", INT_MAX);
    unsigned char u = 255;
    u = u + 1;                       // 無號整數溢位：繞回 0（標準有明確定義）
    printf("255 + 1 存進 unsigned char：%d\\n", u);

    long long big = 3000000000LL;    // 超過 int 範圍要用 long long，常數加 LL
    printf("long long：%lld\\n", big);

    int a = 100000, b = 100000;
    long long wrong = a * b;         // 先以 int 相乘就溢位了，再轉成 long long 也救不回來
    long long right = (long long)a * b;
    printf("錯誤：%lld，正確：%lld\\n", wrong, right);
    return 0;
}</pre>
<div class="box warn"><b class="t">有號整數溢位是未定義行為</b>無號整數溢位會「繞回」（模 2<sup>n</sup>），結果是確定的；但<b>有號整數（int）溢位是未定義行為</b>，標準沒有規定結果，不同編譯器、不同最佳化等級可能不同。計算可能超過 21 億時，請改用 long long。互動練習中的「資料型別範圍與溢位」可以試算各型別的結果。</div>` },
    { id: 'io', title: 'printf 與 scanf', html: `
<table>
<tr><th>格式字元</th><th>型別</th><th>範例</th></tr>
<tr><td><code>%d</code></td><td>int</td><td><code>printf("%d", 42)</code> → 42</td></tr>
<tr><td><code>%lld</code></td><td>long long</td><td></td></tr>
<tr><td><code>%u</code></td><td>unsigned int</td><td></td></tr>
<tr><td><code>%f</code></td><td>double（printf）</td><td><code>printf("%.2f", 3.14159)</code> → 3.14</td></tr>
<tr><td><code>%lf</code></td><td>double（scanf 一定要用 %lf）</td><td></td></tr>
<tr><td><code>%c</code></td><td>char</td><td></td></tr>
<tr><td><code>%s</code></td><td>字串</td><td></td></tr>
<tr><td><code>%x</code>／<code>%o</code></td><td>十六進位／八進位</td><td><code>printf("%x", 255)</code> → ff</td></tr>
<tr><td><code>%5d</code>／<code>%-5d</code>／<code>%05d</code></td><td>寬度 5 靠右／靠左／補 0</td><td><code>printf("%05d", 42)</code> → 00042</td></tr>
<tr><td><code>%%</code></td><td>印出 % 符號</td><td></td></tr>
</table>
<p><code>scanf</code> 讀取輸入，變數前面要加 <b>&amp;</b>（傳入變數的位址，第 7 章會詳細說明）。下方「標準輸入」欄位的內容會當成鍵盤輸入：</p>
<pre class="c" data-input="王小明 20&#10;172.5">#include &lt;stdio.h&gt;

int main(void)
{
    char name[20];
    int age;
    double height;
    scanf("%19s %d", name, &amp;age);    // 字串（字元陣列）本身就是位址，不用 &amp;
    scanf("%lf", &amp;height);           // double 一定要用 %lf
    printf("%s 今年 %d 歲，身高 %.1f 公分\\n", name, age, height);
    printf("明年 %d 歲\\n", age + 1);
    return 0;
}</pre>
<div class="box exam"><b class="t">常見錯誤</b>scanf 忘了 &amp;（程式會當機）、double 用 %f 讀取（讀到錯誤的值）、printf 的格式字元與型別不符。開啟 -Wall 時編譯器會警告這些問題。</div>` },
    { id: 'ops', title: '運算子與整數除法', html: `
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int a = 7, b = 2;
    printf("%d %d %d %d %d\\n", a + b, a - b, a * b, a / b, a % b);   // 整數除法：7 / 2 = 3
    printf("%.1f\\n", a / 2.0);               // 有一邊是小數才會得到 3.5
    printf("%.1f\\n", (double)a / b);         // 或先把其中一邊轉成 double
    printf("%d\\n", -7 / 2);                  // C99 以後：向 0 捨去，得到 -3
    printf("%d\\n", -7 % 2);                  // 餘數的正負號與被除數相同：-1

    int x = 5;
    int y = x++;    // 後置：先用 x 的值（5）指定給 y，x 再加 1
    int z = ++x;    // 前置：x 先加 1（變 7），再把值指定給 z
    printf("x=%d y=%d z=%d\\n", x, y, z);

    x += 3;         // 等同 x = x + 3
    x *= 2;         // 等同 x = x * 2
    printf("x=%d\\n", x);
    return 0;
}</pre>
<table>
<tr><th>優先順序（高到低）</th><th>運算子</th></tr>
<tr><td>1</td><td><code>()</code>、後置 <code>++ --</code></td></tr>
<tr><td>2</td><td>前置 <code>++ --</code>、<code>!</code>、<code>(型別)</code>、<code>sizeof</code></td></tr>
<tr><td>3</td><td><code>* / %</code></td></tr>
<tr><td>4</td><td><code>+ -</code></td></tr>
<tr><td>5</td><td><code>&lt; &lt;= &gt; &gt;=</code></td></tr>
<tr><td>6</td><td><code>== !=</code></td></tr>
<tr><td>7</td><td><code>&amp;&amp;</code>，再來是 <code>||</code></td></tr>
<tr><td>最低</td><td><code>= += -= …</code></td></tr>
</table>
<div class="box warn"><b class="t">不要在同一個運算式中對同一變數多次 ++</b><code>i = i++ + ++i;</code> 這類寫法是未定義行為，結果無法預測。一行只做一件事。</div>
<h3>常數</h3>
<pre class="out">const double PI = 3.14159;    // const 變數：不能被修改，有型別檢查（建議）
#define MAX_SIZE 100          // 巨集：前置處理時直接文字取代，沒有分號</pre>` }
  ],
  keypoints: [
    '常用型別：int（整數）、double（小數）、char（字元）、long long（大整數）；用 sizeof 查大小。',
    '區域變數沒有初值時內容不確定，使用前要先指定值。',
    '無號整數溢位會繞回；有號整數溢位是未定義行為，可能超過範圍時改用 long long。',
    'printf 格式：%d int、%f double、%c char、%s 字串、%zu size_t；scanf 讀 double 要用 %lf，變數前加 &。',
    '整數 / 整數 會捨去小數，7 / 2 為 3；要小數須讓其中一邊為浮點數或強制轉型。',
    'x++ 先用後加、++x 先加後用；const 定義有型別的常數，#define 為文字取代。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 40,
  title: '條件判斷',
  summary: '關係與邏輯運算子、C 語言的真假值、if／else if／else、= 與 == 的陷阱、短路求值、switch 與 break、三元運算子，以及浮點數比較。',
  sections: [
    { id: 'if', title: 'if、else if、else', html: `
<pre class="c" data-input="78">#include &lt;stdio.h&gt;

int main(void)
{
    int score;
    scanf("%d", &amp;score);
    if (score &gt;= 90) {
        printf("優等\\n");
    } else if (score &gt;= 80) {
        printf("甲等\\n");
    } else if (score &gt;= 60) {
        printf("及格\\n");
    } else {
        printf("不及格\\n");
    }
    return 0;
}</pre>
<p>修改下方的輸入（例如 95、59）再執行，看看結果的變化。條件<b>由上而下</b>判斷，符合第一個就執行對應的區塊，其餘跳過。</p>
<h3>C 語言的真與假</h3>
<p>C 語言（C99 以前）沒有布林型別，<b>0 代表假，任何非 0 的值都代表真</b>。比較運算的結果是 1（真）或 0（假）。C99 起可以 <code>#include &lt;stdbool.h&gt;</code> 使用 bool、true、false。</p>
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    printf("%d %d %d\\n", 3 &gt; 2, 3 == 2, 3 != 2);
    if (-1) printf("-1 是真\\n");
    if (0) printf("這行不會印出\\n");
    return 0;
}</pre>` },
    { id: 'pitfall', title: '= 與 == 的陷阱', html: `
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int x = 3;
    if (x = 5) {                  // 錯誤：這是「指定」，x 變成 5，結果為 5（真）
        printf("x 等於 5？x 現在是 %d\\n", x);
    }
    if (x == 3) {                 // 正確的比較要用 ==
        printf("這行不會印出\\n");
    }
    return 0;
}</pre>
<p>上面的程式可以編譯成功，但 -Wall 會警告「建議在當作真值使用的指定外面加上括號」。這是 C 語言最經典的錯誤之一。有些人習慣把常數寫在左邊（<code>if (5 == x)</code>），寫錯成 <code>5 = x</code> 時就會編譯失敗。</p>` },
    { id: 'logic', title: '邏輯運算與短路求值', html: `
<table>
<tr><th>運算子</th><th>意義</th><th>範例</th></tr>
<tr><td><code>&amp;&amp;</code></td><td>而且（兩者都真才真）</td><td><code>age &gt;= 18 &amp;&amp; age &lt; 65</code></td></tr>
<tr><td><code>||</code></td><td>或者（任一為真就真）</td><td><code>day == 0 || day == 6</code></td></tr>
<tr><td><code>!</code></td><td>反轉</td><td><code>!found</code></td></tr>
</table>
<p><b>短路求值</b>：<code>&amp;&amp;</code> 左邊為假時，右邊不會執行；<code>||</code> 左邊為真時，右邊不會執行。常用來避免錯誤：</p>
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int count = 0, total = 100;
    if (count != 0 &amp;&amp; total / count &gt; 10) {    // count 為 0 時不會執行除法，避免除以零
        printf("平均大於 10\\n");
    } else {
        printf("沒有資料或平均不大於 10\\n");
    }

    int n = 0;
    if (1 || ++n) { }       // 左邊為真，++n 不會執行
    printf("n = %d\\n", n);
    return 0;
}</pre>
<div class="box warn"><b class="t">範圍判斷不能連寫</b>數學上的 <code>0 &lt; x &lt; 10</code> 在 C 語言中會先算 <code>0 &lt; x</code> 得到 0 或 1，再和 10 比較，結果永遠為真。要寫成 <code>0 &lt; x &amp;&amp; x &lt; 10</code>。</div>` },
    { id: 'switch', title: 'switch 與三元運算子', html: `
<pre class="c" data-input="2">#include &lt;stdio.h&gt;

int main(void)
{
    int level;
    scanf("%d", &amp;level);
    switch (level) {
        case 1:
            printf("一般會員\\n");
            break;
        case 2:
            printf("金卡會員\\n");
            // 忘了 break：會繼續執行下一個 case（fall through）
        case 3:
            printf("白金會員\\n");
            break;
        default:
            printf("未知等級\\n");
    }
    int age = 20;
    printf("%s\\n", age &gt;= 18 ? "成年" : "未成年");   // 三元運算子：條件 ? 真的值 : 假的值
    return 0;
}</pre>
<p>輸入 2 時，因為 case 2 沒有 break，會同時印出「金卡會員」與「白金會員」。switch 只能比對<b>整數或字元的常數</b>，不能比對字串或範圍。</p>
<div class="box memo"><b class="t">浮點數不要用 == 比較</b>浮點數有誤差，<code>0.1 + 0.2 == 0.3</code> 的結果是假。比較時改用「差距小於一個很小的數」：<code>fabs(a - b) &lt; 1e-9</code>（需要 math.h）。</div>` }
  ],
  keypoints: [
    'if／else if／else 由上而下判斷，符合第一個條件就執行並跳過其餘。',
    'C 語言中 0 為假、非 0 為真；比較運算的結果是 1 或 0；C99 起可用 stdbool.h。',
    '= 是指定、== 是比較；if (x = 5) 會把 x 改成 5 且永遠成立。',
    '&& 與 || 有短路求值，可用來避免除以零或存取無效資料。',
    '範圍判斷要寫成 0 < x && x < 10，不能連寫。',
    'switch 每個 case 要加 break，否則會往下執行；只能比對整數常數；浮點數不要用 == 比較。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 45,
  title: '迴圈',
  summary: 'for、while、do-while 三種迴圈的用法與選擇、break 與 continue、巢狀迴圈，以及累加、計數、質數判斷、九九乘法表、數字拆解等經典題型。',
  sections: [
    { id: 'for', title: 'for 迴圈', html: `
<pre class="out">for (初始值; 條件; 每輪結束後執行) {
    重複執行的程式
}</pre>
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int sum = 0;
    for (int i = 1; i &lt;= 100; i++) {   // i 從 1 到 100
        sum += i;
    }
    printf("1 加到 100 = %d\\n", sum);

    for (int i = 10; i &gt; 0; i -= 3) {  // 也可以遞減、跳著數
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}</pre>
<p>在 for 的小括號中宣告的變數 <code>i</code>，只在迴圈內有效（C99 以後）。</p>
<div class="box warn"><b class="t">差一錯誤（Off-by-one）</b>最常見的迴圈錯誤是多跑或少跑一次。要跑 n 次，常見寫法是 <code>for (int i = 0; i &lt; n; i++)</code>（0 到 n-1）或 <code>for (int i = 1; i &lt;= n; i++)</code>（1 到 n）。</div>` },
    { id: 'while', title: 'while 與 do-while', html: `
<p>不知道要重複幾次、只知道「什麼時候停」時，用 <code>while</code>：</p>
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int n = 12345, digits = 0, sum = 0;
    while (n &gt; 0) {
        sum += n % 10;     // 取出個位數
        n /= 10;           // 去掉個位數
        digits++;
    }
    printf("共 %d 位數，各位數字總和 %d\\n", digits, sum);
    return 0;
}</pre>
<p><code>do-while</code> 先執行一次再判斷條件，<b>至少會執行一次</b>，適合「輸入直到正確為止」：</p>
<pre class="c" data-input="-5&#10;120&#10;30">#include &lt;stdio.h&gt;

int main(void)
{
    int age;
    do {
        printf("請輸入年齡（0～110）：");
        scanf("%d", &amp;age);
        printf("%d\\n", age);
    } while (age &lt; 0 || age &gt; 110);
    printf("輸入成功：%d 歲\\n", age);
    return 0;
}</pre>
<table>
<tr><th>迴圈</th><th>適合</th></tr>
<tr><td><code>for</code></td><td>次數已知、有計數器</td></tr>
<tr><td><code>while</code></td><td>次數未知，依條件決定</td></tr>
<tr><td><code>do-while</code></td><td>至少要執行一次（例如選單、輸入驗證）</td></tr>
</table>` },
    { id: 'break', title: 'break、continue 與巢狀迴圈', html: `
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    for (int i = 1; i &lt;= 10; i++) {
        if (i % 3 == 0) continue;   // 跳過這一輪剩下的程式，直接進入下一輪
        if (i &gt; 8) break;           // 直接結束整個迴圈
        printf("%d ", i);
    }
    printf("\\n");

    for (int i = 1; i &lt;= 3; i++) {          // 巢狀迴圈：九九乘法表的前三列
        for (int j = 1; j &lt;= 9; j++) {
            printf("%d*%d=%-3d", i, j, i * j);
        }
        printf("\\n");
    }
    return 0;
}</pre>
<p>巢狀迴圈中的 break 只會跳出<b>最內層</b>的迴圈。外層 i 跑 3 次、內層 j 跑 9 次，內層的程式共執行 3 × 9 = 27 次。</p>` },
    { id: 'prime', title: '經典題型：質數判斷', html: `
<p>質數是只能被 1 和自己整除、大於 1 的整數。只要檢查 2 到 √n 之間有沒有因數：</p>
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    printf("100 以內的質數：");
    int count = 0;
    for (int n = 2; n &lt;= 100; n++) {
        int is_prime = 1;
        for (int d = 2; d * d &lt;= n; d++) {   // d * d &lt;= n 等同 d &lt;= √n，不需要 math.h
            if (n % d == 0) {
                is_prime = 0;
                break;                         // 找到一個因數就不用再找了
            }
        }
        if (is_prime) {
            printf("%d ", n);
            count++;
        }
    }
    printf("\\n共 %d 個\\n", count);
    return 0;
}</pre>
<div class="box exam"><b class="t">APCS 與面試常見迴圈題</b>累加與階乘、找最大最小值、數字拆解（取各位數）、質數、最大公因數（輾轉相除法）、印出三角形圖案。這些題目都只用到本章的迴圈與條件判斷。</div>
<pre class="c" data-input="5">#include &lt;stdio.h&gt;

int main(void)
{
    int n;
    scanf("%d", &amp;n);
    for (int i = 1; i &lt;= n; i++) {       // 印出直角三角形
        for (int j = 0; j &lt; i; j++) printf("*");
        printf("\\n");
    }
    int a = 84, b = 36;                  // 輾轉相除法求最大公因數
    while (b != 0) {
        int r = a % b;
        a = b;
        b = r;
    }
    printf("gcd(84, 36) = %d\\n", a);
    return 0;
}</pre>` }
  ],
  keypoints: [
    'for 適合次數已知；while 依條件重複；do-while 至少執行一次。',
    '注意差一錯誤：0 到 n-1 寫 i < n，1 到 n 寫 i <= n。',
    'continue 跳過本輪剩下的程式；break 結束迴圈，在巢狀迴圈中只跳出最內層。',
    'n % 10 取個位數、n / 10 去掉個位數，是數字拆解的基本技巧。',
    '質數判斷只需檢查到 √n，寫成 d * d <= n 可避免浮點運算。',
    '輾轉相除法：a % b 的餘數持續取代，直到 b 為 0，a 即為最大公因數。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 45,
  title: '函式與遞迴',
  summary: '為什麼要寫函式、函式的定義與呼叫、函式原型、參數傳值、return 與 void、區域變數與全域變數、static 區域變數、遞迴的原理，以及標準函式庫的數學函式。',
  sections: [
    { id: 'func', title: '定義與呼叫函式', html: `
<p>把重複使用的程式包成<b>函式</b>，程式更好讀、更好維護，也能分工測試：</p>
<pre class="c">#include &lt;stdio.h&gt;

int max(int a, int b);              // 函式原型（宣告）：告訴編譯器有這個函式

int main(void)
{
    printf("%d\\n", max(3, 8));
    printf("%d\\n", max(max(4, 9), 6));   // 函式的傳回值可以直接當參數
    return 0;
}

int max(int a, int b)               // 函式定義：傳回型別 名稱(參數列)
{
    if (a &gt; b) return a;
    return b;
}</pre>
<ul>
<li>函式定義在 main 之後時，要先在前面寫<b>原型</b>，否則編譯器不知道這個函式。</li>
<li>不傳回值的函式，傳回型別寫 <code>void</code>；沒有參數時寫 <code>(void)</code>。</li>
<li><code>return</code> 會立刻結束函式，後面的程式不會執行。</li>
</ul>` },
    { id: 'byvalue', title: '參數是傳值', html: `
<p>C 語言的參數是<b>傳值（pass by value）</b>：呼叫時把引數的「值」複製一份給參數，函式內修改參數不會影響外面的變數：</p>
<pre class="c">#include &lt;stdio.h&gt;

void try_change(int x)
{
    x = 100;                       // 只改到複製出來的 x
    printf("函式內 x = %d\\n", x);
}

int main(void)
{
    int a = 5;
    try_change(a);
    printf("函式外 a = %d\\n", a);   // 仍然是 5
    return 0;
}</pre>
<p>想讓函式修改外面的變數（例如交換兩個數），要傳入變數的<b>位址</b>，也就是第 7 章的指標。</p>` },
    { id: 'scope', title: '變數的作用域與生命週期', html: `
<pre class="c">#include &lt;stdio.h&gt;

int total = 0;                 // 全域變數：所有函式都能存取，程式結束才消失

void count_call(void)
{
    static int calls = 0;      // static 區域變數：只初始化一次，函式結束後仍保留值
    int local = 0;             // 一般區域變數：每次呼叫都重新建立
    calls++;
    local++;
    total++;
    printf("calls=%d local=%d total=%d\\n", calls, local, total);
}

int main(void)
{
    count_call();
    count_call();
    count_call();
    return 0;
}</pre>
<table>
<tr><th>變數</th><th>存取範圍</th><th>存在期間</th><th>未初始化時</th></tr>
<tr><td>區域變數</td><td>宣告所在的區塊 { } 內</td><td>離開區塊就消失</td><td>不確定的垃圾值</td></tr>
<tr><td>static 區域變數</td><td>宣告所在的區塊內</td><td>整個程式執行期間</td><td>自動為 0</td></tr>
<tr><td>全域變數</td><td>整個檔案（可用 extern 跨檔）</td><td>整個程式執行期間</td><td>自動為 0</td></tr>
</table>
<div class="box tip"><b class="t">少用全域變數</b>全域變數任何地方都能修改，程式一大就很難追蹤是誰改的。盡量用參數與傳回值在函式之間傳遞資料。</div>` },
    { id: 'recursion', title: '遞迴', html: `
<p><b>遞迴</b>是函式呼叫自己。每個遞迴函式都要有<b>終止條件</b>，否則會無限呼叫直到堆疊溢位（stack overflow）當機：</p>
<pre class="c">#include &lt;stdio.h&gt;

long long factorial(int n)
{
    if (n &lt;= 1) return 1;              // 終止條件
    return n * factorial(n - 1);       // 遞迴：n! = n × (n-1)!
}

int fib(int n)
{
    if (n &lt; 2) return n;               // fib(0) = 0, fib(1) = 1
    return fib(n - 1) + fib(n - 2);
}

int main(void)
{
    printf("5! = %lld\\n", factorial(5));
    printf("20! = %lld\\n", factorial(20));
    for (int i = 0; i &lt;= 10; i++) printf("%d ", fib(i));
    printf("\\n");
    return 0;
}</pre>
<pre class="out">factorial(4)
= 4 * factorial(3)
= 4 * 3 * factorial(2)
= 4 * 3 * 2 * factorial(1)
= 4 * 3 * 2 * 1          ← 到達終止條件後，一層一層傳回
= 24</pre>
<div class="box warn"><b class="t">遞迴的代價</b>上面的 fib 會重複計算同樣的值，fib(40) 要呼叫上億次。實務上可改用迴圈，或把算過的結果存起來（記憶化，動態規劃的基礎）。遞迴適合本身就是遞迴結構的問題：河內塔、樹狀結構、排列組合、合併排序。</div>
<h3>標準函式庫的數學函式</h3>
<pre class="c">#include &lt;stdio.h&gt;
#include &lt;math.h&gt;
#include &lt;stdlib.h&gt;

int main(void)
{
    printf("%.2f %.2f %.0f\\n", sqrt(2.0), pow(2, 10), fabs(-3.7) * 10);
    printf("%.0f %.0f %d\\n", ceil(3.2), floor(3.8), abs(-5));
    return 0;
}</pre>
<p>使用 math.h 的函式，在 Linux 上編譯時有時需要加上 <code>-lm</code> 連結數學函式庫：<code>gcc a.c -o a -lm</code>。</p>` }
  ],
  keypoints: [
    '函式定義在呼叫之後時，要先寫函式原型；不傳回值用 void。',
    'C 語言參數是傳值，函式內修改參數不影響外面的變數；要修改外部變數需傳入位址（指標）。',
    '區域變數離開區塊就消失，未初始化時為垃圾值；全域與 static 變數會自動初始化為 0。',
    'static 區域變數只初始化一次，函式結束後仍保留值。',
    '遞迴一定要有終止條件，否則會堆疊溢位。',
    '單純遞迴的費氏數列有大量重複計算，可改用迴圈或記憶化。'
  ]
},
{
  id: 'c06', subject: 1, minutes: 50,
  title: '陣列、排序與搜尋',
  summary: '一維陣列的宣告、初始化與走訪、計算陣列長度、陣列越界的危險、陣列當作函式參數、二維陣列，以及氣泡排序、選擇排序、線性搜尋與二分搜尋。',
  sections: [
    { id: 'array', title: '一維陣列', html: `
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int scores[5] = {90, 85, 72, 64, 98};       // 5 個整數，索引 0～4
    int n = sizeof scores / sizeof scores[0];   // 計算元素個數：20 / 4 = 5

    int sum = 0, max = scores[0];
    for (int i = 0; i &lt; n; i++) {
        sum += scores[i];
        if (scores[i] &gt; max) max = scores[i];
    }
    printf("共 %d 人，總分 %d，平均 %.1f，最高 %d\\n", n, sum, (double)sum / n, max);

    int zeros[10] = {0};          // 全部初始化為 0
    int partial[5] = {1, 2};      // 沒給值的元素自動為 0：1 2 0 0 0
    printf("%d %d %d\\n", zeros[9], partial[1], partial[4]);
    return 0;
}</pre>
<ul>
<li>陣列的元素在記憶體中<b>連續存放</b>，索引從 <b>0</b> 開始，<code>int a[5]</code> 的最後一個元素是 <code>a[4]</code>。</li>
<li>陣列大小在宣告後就固定了。需要可變大小，要用第 9 章的動態記憶體。</li>
<li><code>sizeof 陣列 / sizeof 陣列[0]</code> 可以算出元素個數，但<b>只在宣告陣列的同一個函式中有效</b>。</li>
</ul>` },
    { id: 'bounds', title: '陣列越界', html: `
<p>C 語言<b>不會檢查索引是否超出範圍</b>。存取 <code>a[5]</code>、<code>a[-1]</code> 是<b>未定義行為</b>：可能讀到其他變數的值、可能悄悄改壞其他資料，也可能讓程式當機（Segmentation fault）。</p>
<pre class="out">int a[5];
for (int i = 0; i &lt;= 5; i++)   // 錯誤：i = 5 時越界
    a[i] = 0;</pre>
<div class="box warn"><b class="t">越界寫入是重大資安漏洞</b>寫入超過陣列範圍的資料，稱為<b>緩衝區溢位（Buffer Overflow）</b>，攻擊者可以藉此覆蓋函式的傳回位址、執行惡意程式。許多歷史上的重大漏洞都來自 C 語言的越界寫入，第 12 章會介紹如何用工具檢查。</div>` },
    { id: 'param', title: '陣列當作函式參數', html: `
<p>陣列傳給函式時，傳的是<b>第一個元素的位址</b>（不是複製整個陣列），所以函式可以修改原陣列，而且<b>要另外傳入長度</b>：</p>
<pre class="c">#include &lt;stdio.h&gt;

void double_all(int arr[], int n)      // int arr[] 等同 int *arr
{
    for (int i = 0; i &lt; n; i++) arr[i] *= 2;
}

void print_array(const int arr[], int n)   // const：保證不會修改陣列
{
    for (int i = 0; i &lt; n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main(void)
{
    int a[] = {1, 2, 3, 4};                // 大小由初始值個數決定：4
    double_all(a, 4);
    print_array(a, 4);                     // 原陣列被修改了：2 4 6 8
    return 0;
}</pre>
<div class="box exam"><b class="t">常見陷阱</b>在函式內對陣列參數使用 <code>sizeof arr / sizeof arr[0]</code> 得到的不是元素個數，因為 arr 其實是指標，sizeof arr 是指標的大小（通常 8）。這就是為什麼一定要另外傳入長度。</div>` },
    { id: 'matrix', title: '二維陣列', html: `
<pre class="c">#include &lt;stdio.h&gt;

int main(void)
{
    int m[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };                                  // 2 列 3 行
    for (int i = 0; i &lt; 2; i++) {
        int row_sum = 0;
        for (int j = 0; j &lt; 3; j++) {
            printf("%3d", m[i][j]);
            row_sum += m[i][j];
        }
        printf("  | 列總和 %d\\n", row_sum);
    }
    printf("m[1][2] = %d\\n", m[1][2]);
    return 0;
}</pre>
<p>二維陣列在記憶體中依「列」連續存放：<code>m[0][0], m[0][1], m[0][2], m[1][0]…</code>。傳給函式時，除了第一維之外的大小都要寫出來：<code>void f(int m[][3], int rows)</code>。</p>` },
    { id: 'sort', title: '排序與搜尋', html: `
<h3>氣泡排序</h3>
<p>重複比較相鄰的兩個元素，順序錯就交換，每一輪會把最大的值「浮」到最後面：</p>
<pre class="c">#include &lt;stdio.h&gt;

void bubble_sort(int a[], int n)
{
    for (int i = 0; i &lt; n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j &lt; n - 1 - i; j++) {   // 每輪後最後 i 個已經排好
            if (a[j] &gt; a[j + 1]) {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                swapped = 1;
            }
        }
        if (!swapped) break;                     // 沒有交換代表已經排好，可提早結束
    }
}

int binary_search(const int a[], int n, int target)
{
    int lo = 0, hi = n - 1;
    while (lo &lt;= hi) {
        int mid = lo + (hi - lo) / 2;            // 避免 lo + hi 溢位
        if (a[mid] == target) return mid;
        if (a[mid] &lt; target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;                                   // 找不到
}

int main(void)
{
    int a[] = {64, 25, 12, 22, 11, 90, 38};
    int n = sizeof a / sizeof a[0];
    bubble_sort(a, n);
    for (int i = 0; i &lt; n; i++) printf("%d ", a[i]);
    printf("\\n38 在索引 %d，50 在索引 %d\\n", binary_search(a, n, 38), binary_search(a, n, 50));
    return 0;
}</pre>
<table>
<tr><th>演算法</th><th>時間複雜度</th><th>說明</th></tr>
<tr><td>氣泡排序、選擇排序、插入排序</td><td>O(n<sup>2</sup>)</td><td>簡單，適合少量資料與學習</td></tr>
<tr><td>合併排序、快速排序（平均）</td><td>O(n log n)</td><td>實務使用；C 標準函式庫有 <code>qsort</code></td></tr>
<tr><td>線性搜尋</td><td>O(n)</td><td>逐一比較，資料不需排序</td></tr>
<tr><td>二分搜尋</td><td>O(log n)</td><td><b>資料必須已排序</b>，每次把範圍砍一半</td></tr>
</table>
<p>100 萬筆資料，線性搜尋最多比較 100 萬次，二分搜尋最多只要 20 次。</p>` }
  ],
  keypoints: [
    '陣列元素連續存放，索引從 0 開始；int a[5] 的最後一個元素是 a[4]。',
    '部分初始化時，其餘元素自動為 0；sizeof a / sizeof a[0] 可算出元素個數（僅限宣告處）。',
    'C 不檢查越界，存取超出範圍是未定義行為，越界寫入會造成緩衝區溢位漏洞。',
    '陣列傳給函式時傳的是位址，函式可修改原陣列，且必須另外傳入長度。',
    '二維陣列依列連續存放，傳給函式時第二維大小要寫出來。',
    '氣泡排序為 O(n²)；二分搜尋為 O(log n)，但資料必須先排序。'
  ]
}
);
