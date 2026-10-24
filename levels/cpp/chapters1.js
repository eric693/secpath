/* C++ 基礎篇：語法、函式與 STL
   <pre class="cpp"> 為可在網頁上編譯執行的範例（data-input 為標準輸入）；<pre class="out"> 為一般程式碼或輸出
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 40,
  title: 'C++ 簡介與輸入輸出',
  summary: 'C++ 與 C 的關係、C++ 的應用領域與版本、第一支程式、命名空間、cout 與 cin、endl 與換行、格式化輸出、讀取整行與不定筆數的輸入，以及編譯方式。',
  sections: [
    { id: 'why', title: '為什麼學 C++', html: `
<p>C++ 由 Bjarne Stroustrup 在 1980 年代以 C 為基礎發展而成，加入了<b>類別與物件導向</b>、<b>樣板</b>、<b>標準樣板函式庫（STL）</b>等功能，同時保有 C 的執行效率。</p>
<table>
<tr><th>領域</th><th>例子</th></tr>
<tr><td>程式競賽與 APCS</td><td>STL 提供現成的資料結構與演算法，執行速度快，是競賽選手的首選</td></tr>
<tr><td>遊戲開發</td><td>Unreal Engine、各大遊戲引擎與 3A 遊戲</td></tr>
<tr><td>金融科技</td><td>高頻交易系統，需要微秒等級的延遲</td></tr>
<tr><td>半導體與 EDA</td><td>晶片設計自動化工具、模擬器（台灣的 IC 設計公司與 EDA 廠商）</td></tr>
<tr><td>系統與基礎軟體</td><td>瀏覽器（Chrome）、資料庫、機器學習框架的底層（TensorFlow、PyTorch）</td></tr>
<tr><td>影像與自駕</td><td>OpenCV、機器人、自駕車感知系統</td></tr>
</table>
<h3>C++ 的版本</h3>
<p>C++98 → C++11（現代 C++ 的起點：auto、lambda、智慧指標）→ C++14 → <b>C++17</b>（本課程使用）→ C++20（concepts、ranges）→ C++23。APCS 與多數競賽平台都支援 C++17 以上。</p>` },
    { id: 'hello', title: '第一支 C++ 程式', html: `
<pre class="cpp">#include &lt;iostream&gt;       // 輸入輸出串流

int main()
{
    std::cout &lt;&lt; "Hello, C++!" &lt;&lt; std::endl;
    std::cout &lt;&lt; "1 + 2 = " &lt;&lt; 1 + 2 &lt;&lt; "\\n";
    return 0;
}</pre>
<ul>
<li><code>#include &lt;iostream&gt;</code>：C++ 的標準標頭檔沒有 .h。C 的標頭檔改名為 <code>&lt;cstdio&gt;</code>、<code>&lt;cmath&gt;</code>、<code>&lt;cstring&gt;</code>。</li>
<li><code>std::cout</code>：標準輸出，<code>&lt;&lt;</code> 把資料「送進」輸出串流，可以一直串接下去。</li>
<li><code>std::</code>：標準函式庫的東西都放在 <b>std 命名空間</b>中。</li>
<li>C++ 的 main 可以省略 <code>return 0;</code>，會自動傳回 0。</li>
</ul>
<h3>命名空間</h3>
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;      // 之後可以省略 std::（練習與競賽常用）

namespace shop {           // 自己定義命名空間，避免名稱衝突
    int discount = 10;
}

int main()
{
    int discount = 5;
    cout &lt;&lt; discount &lt;&lt; " " &lt;&lt; shop::discount &lt;&lt; endl;
}</pre>
<div class="box warn"><b class="t">using namespace std 的使用時機</b>練習與競賽時寫 <code>using namespace std;</code> 很方便。但在大型專案與<b>標頭檔中不要使用</b>，因為會把 std 的所有名稱引入，容易和自己定義的名稱衝突。</div>` },
    { id: 'io', title: 'cout 與 cin', html: `
<pre class="cpp" data-input="王小明 20&#10;172.5">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

int main()
{
    string name;
    int age;
    double height;
    cin &gt;&gt; name &gt;&gt; age &gt;&gt; height;           // 不需要 &amp;，也不需要格式字元
    cout &lt;&lt; name &lt;&lt; " 今年 " &lt;&lt; age &lt;&lt; " 歲，身高 " &lt;&lt; height &lt;&lt; endl;
    cout &lt;&lt; "明年 " &lt;&lt; age + 1 &lt;&lt; " 歲" &lt;&lt; "\\n";
}</pre>
<p>cin 會自動依變數型別讀取，以空白、Tab、換行分隔。不必像 scanf 一樣記格式字元，也不用加 &amp;。</p>
<h3>endl 與 "\n"</h3>
<p><code>endl</code> 會換行並<b>強制清空輸出緩衝區（flush）</b>；<code>"\n"</code> 只換行。大量輸出時（例如競賽輸出 10 萬行），一直 flush 會變慢很多，建議用 "\n"。</p>
<h3>格式化輸出</h3>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;iomanip&gt;         // setw、setprecision
using namespace std;

int main()
{
    double pi = 3.14159265;
    cout &lt;&lt; fixed &lt;&lt; setprecision(2) &lt;&lt; pi &lt;&lt; "\\n";       // 小數 2 位：3.14
    cout &lt;&lt; setw(6) &lt;&lt; 42 &lt;&lt; "|" &lt;&lt; "\\n";                  // 寬度 6 靠右
    cout &lt;&lt; setw(6) &lt;&lt; setfill('0') &lt;&lt; 42 &lt;&lt; "\\n";        // 補 0：000042
    cout &lt;&lt; left &lt;&lt; setw(6) &lt;&lt; setfill(' ') &lt;&lt; "ab" &lt;&lt; "|" &lt;&lt; "\\n";   // 靠左
    cout &lt;&lt; hex &lt;&lt; 255 &lt;&lt; " " &lt;&lt; dec &lt;&lt; 255 &lt;&lt; "\\n";       // 十六進位與十進位
}</pre>
<p>C++20 起還有 <code>std::format</code>，寫法類似 Python：<code>format("{:.2f}", pi)</code>。</p>` },
    { id: 'input', title: '讀取整行與不定筆數輸入', html: `
<pre class="cpp" data-input="台北市 大安區 信義路&#10;3 8 15 4 23">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

int main()
{
    string address;
    getline(cin, address);                 // 讀取一整行（含空白）
    cout &lt;&lt; "地址：" &lt;&lt; address &lt;&lt; "\\n";

    int x, sum = 0, count = 0;
    while (cin &gt;&gt; x) {                     // 讀到沒有資料（EOF）為止
        sum += x;
        count++;
    }
    cout &lt;&lt; count &lt;&lt; " 個數，總和 " &lt;&lt; sum &lt;&lt; "\\n";
}</pre>
<p><code>while (cin &gt;&gt; x)</code> 是讀取「不知道有幾筆資料」的標準寫法：讀取成功時條件為真，讀到檔案結尾或格式錯誤時為假。APCS 與 ZeroJudge 常見這種輸入格式。</p>
<div class="box warn"><b class="t">cin 與 getline 混用</b>先用 <code>cin &gt;&gt; n</code> 讀數字，再用 getline 讀下一行時，會讀到數字後面殘留的換行而得到空字串。解法：在 getline 之前呼叫 <code>cin.ignore()</code> 跳過換行，或全部改用 getline 再轉換。</div>
<h3>在自己的電腦編譯</h3>
<pre class="out">g++ -std=c++17 -Wall -O2 main.cpp -o main
./main &lt; input.txt         # 用檔案當作輸入，練習解題時很方便</pre>` }
  ],
  keypoints: [
    'C++ 以 C 為基礎，加入類別、樣板與 STL，常用於競賽、遊戲、金融、EDA 與系統軟體。',
    '標準標頭檔沒有 .h，例如 <iostream>；C 的標頭檔改成 <cstdio>、<cmath>。',
    '標準函式庫在 std 命名空間；using namespace std 適合練習與競賽，不要放在標頭檔。',
    'cout << 輸出、cin >> 輸入，依型別自動處理，不需要格式字元與 &。',
    'endl 會換行並 flush，大量輸出改用 "\\n"；iomanip 的 setprecision、setw 控制格式。',
    'getline 讀取整行；while (cin >> x) 讀取不定筆數的資料直到結尾。'
  ]
},
{
  id: 'c02', subject: 1, minutes: 45,
  title: '參考、string 與基本語法',
  summary: 'bool 型別、auto 型別推導、參考與指標的差別、const、範圍 for 迴圈、std::string 的操作（串接、子字串、尋找、比較）、字串與數字的轉換，以及 static_cast。',
  sections: [
    { id: 'basic', title: 'bool、auto 與 const', html: `
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

int main()
{
    bool passed = true;                 // C++ 內建 bool 型別
    auto count = 10;                    // auto：由編譯器推導型別（int）
    auto price = 99.5;                  // double
    const int MAX = 100;                // 常數，不能修改
    cout &lt;&lt; boolalpha &lt;&lt; passed &lt;&lt; " " &lt;&lt; count &lt;&lt; " " &lt;&lt; price &lt;&lt; " " &lt;&lt; MAX &lt;&lt; "\\n";
    cout &lt;&lt; noboolalpha &lt;&lt; (3 &gt; 2) &lt;&lt; "\\n";   // 預設 bool 以 1／0 輸出
}</pre>
<p><code>auto</code> 在型別名稱很長時特別好用（例如容器的迭代器）。但宣告簡單變數時，寫清楚型別通常更易讀。</p>` },
    { id: 'reference', title: '參考', html: `
<p><b>參考（reference）</b>是變數的<b>別名</b>：宣告時必須綁定一個變數，之後對參考的操作就是對原變數的操作。</p>
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

void swap_ref(int &amp;a, int &amp;b)      // 參數是參考，直接操作呼叫端的變數
{
    int t = a;
    a = b;
    b = t;
}

int main()
{
    int x = 10;
    int &amp;r = x;                     // r 是 x 的別名
    r = 20;
    cout &lt;&lt; "x = " &lt;&lt; x &lt;&lt; "\\n";    // 20

    int a = 1, b = 2;
    swap_ref(a, b);                 // 不用寫 &amp;a、&amp;b
    cout &lt;&lt; a &lt;&lt; " " &lt;&lt; b &lt;&lt; "\\n";
}</pre>
<table>
<tr><th></th><th>參考 int &amp;r</th><th>指標 int *p</th></tr>
<tr><td>宣告時</td><td>一定要初始化</td><td>可以不初始化（不建議）</td></tr>
<tr><td>可否為空</td><td>不行，一定綁定一個物件</td><td>可以是 nullptr</td></tr>
<tr><td>可否改綁別的變數</td><td>不行</td><td>可以改指別處</td></tr>
<tr><td>使用方式</td><td>和一般變數相同</td><td>要用 * 解參考、-&gt; 存取成員</td></tr>
</table>
<p>C++ 中「需要修改參數」或「避免複製大物件」時優先用參考；需要「可能沒有對象」或要改指別處時才用指標。C++ 的空指標寫成 <code>nullptr</code>，取代 C 的 NULL。</p>` },
    { id: 'rangefor', title: '範圍 for 迴圈', html: `
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

int main()
{
    int scores[] = {90, 85, 72};
    for (int s : scores) cout &lt;&lt; s &lt;&lt; " ";          // 複製每個元素
    cout &lt;&lt; "\\n";
    for (int &amp;s : scores) s += 5;                   // 用參考才能修改元素
    for (const auto &amp;s : scores) cout &lt;&lt; s &lt;&lt; " ";  // 唯讀走訪，大型物件也不會複製
    cout &lt;&lt; "\\n";
}</pre>
<div class="box tip"><b class="t">走訪容器的習慣寫法</b>唯讀用 <code>const auto &amp;x</code>、要修改用 <code>auto &amp;x</code>、元素是 int 這類小型別時直接 <code>auto x</code> 也可以。</div>` },
    { id: 'string', title: 'std::string', html: `
<p>C++ 的 <code>std::string</code> 會自動管理記憶體，不必擔心 C 字串的 '\\0' 與緩衝區溢位：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

int main()
{
    string s = "Hello";
    string t = "World";
    string msg = s + ", " + t + "!";          // 用 + 串接
    cout &lt;&lt; msg &lt;&lt; "（長度 " &lt;&lt; msg.size() &lt;&lt; "）\\n";

    cout &lt;&lt; msg[0] &lt;&lt; msg.back() &lt;&lt; "\\n";     // 第一個與最後一個字元
    cout &lt;&lt; msg.substr(7, 5) &lt;&lt; "\\n";         // 從索引 7 取 5 個字元：World
    cout &lt;&lt; msg.find("World") &lt;&lt; "\\n";        // 找到的位置：7
    if (msg.find("C++") == string::npos) cout &lt;&lt; "找不到 C++\\n";

    msg.replace(0, 5, "Hi");                  // 從 0 開始的 5 個字元換成 Hi
    msg += " Bye";
    cout &lt;&lt; msg &lt;&lt; "\\n";
    cout &lt;&lt; (s == "Hello") &lt;&lt; " " &lt;&lt; (s &lt; t) &lt;&lt; "\\n";   // 可以直接用 == 與 &lt; 比較
}</pre>
<table>
<tr><th>操作</th><th>寫法</th></tr>
<tr><td>長度</td><td><code>s.size()</code> 或 <code>s.length()</code></td></tr>
<tr><td>串接</td><td><code>s + t</code>、<code>s += t</code>、<code>s.push_back('c')</code></td></tr>
<tr><td>子字串</td><td><code>s.substr(起點, 長度)</code></td></tr>
<tr><td>尋找</td><td><code>s.find("x")</code>，找不到傳回 <code>string::npos</code></td></tr>
<tr><td>插入、刪除</td><td><code>s.insert(位置, "x")</code>、<code>s.erase(位置, 長度)</code></td></tr>
<tr><td>比較</td><td><code>==</code>、<code>!=</code>、<code>&lt;</code>（依字典順序）</td></tr>
<tr><td>轉成 C 字串</td><td><code>s.c_str()</code></td></tr>
</table>` },
    { id: 'convert', title: '型別轉換', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

int main()
{
    int n = stoi("2024");                 // 字串轉 int（stol、stoll、stod 同理）
    double d = stod("3.14");
    string s = to_string(n + 1);          // 數字轉字串
    cout &lt;&lt; n + 1 &lt;&lt; " " &lt;&lt; d * 2 &lt;&lt; " " &lt;&lt; s + "年" &lt;&lt; "\\n";

    int a = 7, b = 2;
    cout &lt;&lt; static_cast&lt;double&gt;(a) / b &lt;&lt; "\\n";   // C++ 風格的轉型
    char c = '7';
    cout &lt;&lt; c - '0' &lt;&lt; "\\n";                      // 字元轉數字的技巧仍然適用
}</pre>
<p>C++ 建議用 <code>static_cast&lt;型別&gt;(值)</code> 取代 C 風格的 <code>(double)a</code>：更容易搜尋，也只允許合理的轉換。另外還有 <code>const_cast</code>、<code>reinterpret_cast</code>、<code>dynamic_cast</code>（第 8 章）。</p>
<div class="box warn"><b class="t">stoi 的例外</b>字串不是數字時，stoi 會拋出例外（invalid_argument），沒有處理的話程式會結束。第 10 章會介紹如何用 try／catch 處理。</div>` }
  ],
  keypoints: [
    'C++ 內建 bool；auto 由編譯器推導型別；const 宣告常數。',
    '參考是變數的別名，宣告時必須初始化且不能改綁；函式參數用參考可直接修改呼叫端的變數。',
    'C++ 的空指標寫成 nullptr。',
    '範圍 for：唯讀用 const auto &x，要修改用 auto &x。',
    'std::string 自動管理記憶體，可用 + 串接、== 比較，substr、find、replace 操作字串；find 找不到傳回 string::npos。',
    'stoi／stod 字串轉數字、to_string 數字轉字串；C++ 風格轉型用 static_cast。'
  ]
},
{
  id: 'c03', subject: 1, minutes: 40,
  title: '函式進階與 lambda',
  summary: '傳值、傳參考與 const 參考的選擇、預設參數、函式多載、inline、遞迴回顧、lambda 運算式與捕捉清單，以及 std::function。',
  sections: [
    { id: 'pass', title: '參數傳遞的三種方式', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
using namespace std;

void by_value(int x) { x = 100; }                    // 複製一份，不影響外面
void by_ref(int &amp;x) { x = 100; }                     // 直接修改外面的變數
int total(const vector&lt;int&gt; &amp;v)                      // 大物件唯讀：不複製、也不能修改
{
    int sum = 0;
    for (int x : v) sum += x;
    return sum;
}

int main()
{
    int a = 1, b = 1;
    by_value(a);
    by_ref(b);
    cout &lt;&lt; a &lt;&lt; " " &lt;&lt; b &lt;&lt; "\\n";
    vector&lt;int&gt; big(1000000, 1);
    cout &lt;&lt; total(big) &lt;&lt; "\\n";                      // 傳 const 參考，不會複製 100 萬個元素
}</pre>
<table>
<tr><th>寫法</th><th>使用時機</th></tr>
<tr><td><code>int x</code>（傳值）</td><td>int、double、char 等小型別，且不需修改</td></tr>
<tr><td><code>int &amp;x</code>（傳參考）</td><td>函式需要修改呼叫端的變數</td></tr>
<tr><td><code>const string &amp;s</code>（const 參考）</td><td>string、vector 等大物件，只讀取不修改（<b>最常用</b>）</td></tr>
</table>` },
    { id: 'overload', title: '預設參數與函式多載', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

double area(double r) { return 3.14159 * r * r; }              // 圓面積
double area(double w, double h) { return w * h; }              // 多載：參數個數不同
string greet(const string &amp;name, const string &amp;title = "同學") // 預設參數放在最右邊
{
    return name + " " + title + "你好";
}

int main()
{
    cout &lt;&lt; area(2.0) &lt;&lt; " " &lt;&lt; area(3.0, 4.0) &lt;&lt; "\\n";
    cout &lt;&lt; greet("王小明") &lt;&lt; "\\n";
    cout &lt;&lt; greet("陳志明", "經理") &lt;&lt; "\\n";
}</pre>
<p><b>函式多載（overloading）</b>：同一個名稱可以有多個版本，只要<b>參數的型別或個數不同</b>，編譯器會依呼叫時的引數選擇。只有傳回型別不同不算多載，會編譯錯誤。</p>` },
    { id: 'lambda', title: 'lambda 運算式', html: `
<p><b>lambda</b> 是寫在程式中間的匿名函式，常搭配 STL 演算法使用（例如自訂排序規則）：</p>
<pre class="out">[捕捉清單](參數) { 函式內容 }
[捕捉清單](參數) -&gt; 傳回型別 { 函式內容 }</pre>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
using namespace std;

int main()
{
    auto square = [](int x) { return x * x; };
    cout &lt;&lt; square(5) &lt;&lt; "\\n";

    int bonus = 10;
    auto add_bonus = [bonus](int s) { return s + bonus; };     // 以值捕捉 bonus
    cout &lt;&lt; add_bonus(80) &lt;&lt; "\\n";

    int calls = 0;
    auto counter = [&amp;calls]() { calls++; };                    // 以參考捕捉，可以修改
    counter(); counter(); counter();
    cout &lt;&lt; "calls = " &lt;&lt; calls &lt;&lt; "\\n";

    vector&lt;int&gt; v = {5, 2, 8, 1, 9};
    sort(v.begin(), v.end(), [](int a, int b) { return a &gt; b; });   // 由大到小
    for (int x : v) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n";
    int big = count_if(v.begin(), v.end(), [](int x) { return x &gt;= 5; });
    cout &lt;&lt; "大於等於 5 的有 " &lt;&lt; big &lt;&lt; " 個\\n";
}</pre>
<table>
<tr><th>捕捉清單</th><th>意義</th></tr>
<tr><td><code>[]</code></td><td>不捕捉任何外部變數</td></tr>
<tr><td><code>[x]</code>／<code>[=]</code></td><td>以值捕捉 x／所有用到的變數（複製一份，預設不能修改）</td></tr>
<tr><td><code>[&amp;x]</code>／<code>[&amp;]</code></td><td>以參考捕捉 x／所有用到的變數（可以修改外部變數）</td></tr>
</table>
<p>需要把 lambda 存起來或當參數傳遞時，可以用 <code>std::function&lt;int(int)&gt;</code> 型別（需要 <code>&lt;functional&gt;</code>）。</p>` }
  ],
  keypoints: [
    '小型別傳值；需要修改用參考 &；大物件唯讀用 const 參考 const T &。',
    '預設參數必須放在參數列的最右邊。',
    '函式多載：同名函式的參數型別或個數不同；只有傳回型別不同不算多載。',
    'lambda 語法為 [捕捉](參數) { 內容 }，常搭配 sort、count_if 等演算法。',
    '[x] 以值捕捉、[&x] 以參考捕捉；以參考捕捉才能修改外部變數。',
    'std::function 可以存放 lambda 與函式。'
  ]
},
{
  id: 'c04', subject: 1, minutes: 45,
  title: 'STL 容器：vector 與 array',
  summary: 'STL 的組成、vector 的建立與常用操作、size 與 capacity、at 與 [] 的差別、迭代器與左閉右開、在中間插入刪除、二維 vector，以及 std::array。',
  sections: [
    { id: 'stl', title: 'STL 是什麼', html: `
<p><b>標準樣板函式庫（Standard Template Library，STL）</b>提供現成、經過高度最佳化的資料結構與演算法，是 C++ 最強大的地方：</p>
<table>
<tr><th>組成</th><th>內容</th></tr>
<tr><td><b>容器</b></td><td>vector、array、deque、list、map、set、unordered_map、stack、queue、priority_queue</td></tr>
<tr><td><b>迭代器</b></td><td>像指標一樣走訪容器元素的物件，讓演算法可以適用各種容器</td></tr>
<tr><td><b>演算法</b></td><td>sort、find、count、binary_search、reverse、accumulate…（第 6 章）</td></tr>
</table>` },
    { id: 'vector', title: 'vector：動態陣列', html: `
<p><code>vector</code> 是可以自動變大的陣列，<b>不知道用什麼容器時，先用 vector</b>：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; v;                    // 空的
    vector&lt;int&gt; zeros(5);             // 5 個 0
    vector&lt;int&gt; sevens(3, 7);         // 3 個 7
    vector&lt;int&gt; w = {4, 1, 3};        // 初始化清單

    v.push_back(10);                  // 加到最後
    v.push_back(20);
    v.push_back(30);
    v.pop_back();                     // 移除最後一個
    cout &lt;&lt; "size = " &lt;&lt; v.size() &lt;&lt; "，第一個 " &lt;&lt; v.front() &lt;&lt; "，最後一個 " &lt;&lt; v.back() &lt;&lt; "\\n";

    for (size_t i = 0; i &lt; w.size(); i++) cout &lt;&lt; w[i] &lt;&lt; " ";
    cout &lt;&lt; "\\n";
    cout &lt;&lt; zeros.size() &lt;&lt; " " &lt;&lt; sevens[2] &lt;&lt; " " &lt;&lt; boolalpha &lt;&lt; v.empty() &lt;&lt; "\\n";

    w.clear();                        // 清空
    cout &lt;&lt; "清空後 size = " &lt;&lt; w.size() &lt;&lt; "\\n";
}</pre>
<table>
<tr><th>操作</th><th>說明</th><th>時間</th></tr>
<tr><td><code>v[i]</code>、<code>v.at(i)</code></td><td>存取第 i 個；at 會檢查範圍</td><td>O(1)</td></tr>
<tr><td><code>v.push_back(x)</code>、<code>v.pop_back()</code></td><td>在尾端加入、移除</td><td>平均 O(1)</td></tr>
<tr><td><code>v.insert(it, x)</code>、<code>v.erase(it)</code></td><td>在中間插入、刪除</td><td>O(n)，後面的元素要搬移</td></tr>
<tr><td><code>v.size()</code>、<code>v.empty()</code></td><td>元素個數、是否為空</td><td>O(1)</td></tr>
<tr><td><code>v.resize(n)</code>、<code>v.reserve(n)</code></td><td>改變元素個數、預先保留容量</td><td></td></tr>
</table>
<div class="box warn"><b class="t">[] 與 at()</b><code>v[i]</code> 不檢查範圍，越界一樣是未定義行為；<code>v.at(i)</code> 越界時會拋出 out_of_range 例外。除錯時可以先用 at。另外 size() 的型別是無號的 size_t，<code>v.size() - 1</code> 在 v 為空時會變成很大的數。</div>` },
    { id: 'iterator', title: '迭代器與左閉右開', html: `
<p><b>迭代器（iterator）</b>指向容器中的元素。<code>begin()</code> 指向第一個元素，<code>end()</code> 指向<b>最後一個元素的下一個位置</b>，範圍是<b>左閉右開 [begin, end)</b>：</p>
<pre class="out">  v = { 10, 20, 30, 40 }
         ↑               ↑
     v.begin()        v.end()（不是元素，不能解參考）</pre>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; v = {10, 20, 30, 40};
    for (auto it = v.begin(); it != v.end(); ++it) cout &lt;&lt; *it &lt;&lt; " ";
    cout &lt;&lt; "\\n";

    v.insert(v.begin() + 1, 15);        // 在索引 1 插入 15
    v.erase(v.begin() + 3);             // 刪除索引 3 的元素（30）
    for (int x : v) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n";

    vector&lt;int&gt; part(v.begin(), v.begin() + 2);   // 用範圍建立新的 vector
    cout &lt;&lt; part.size() &lt;&lt; " " &lt;&lt; part[1] &lt;&lt; "\\n";
    cout &lt;&lt; "元素個數 = " &lt;&lt; v.end() - v.begin() &lt;&lt; "\\n";
}</pre>
<div class="box memo"><b class="t">迭代器失效</b>對 vector 進行 push_back、insert、erase 之後，原本取得的迭代器、指標、參考可能失效（vector 可能搬到新的記憶體位置）。不要一邊用迭代器走訪、一邊增刪元素；需要刪除時用 erase 的傳回值繼續走訪。</div>` },
    { id: 'matrix', title: '二維 vector 與 array', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;array&gt;
using namespace std;

int main()
{
    int rows = 3, cols = 4;
    vector&lt;vector&lt;int&gt;&gt; grid(rows, vector&lt;int&gt;(cols, 0));   // 3 × 4，全部為 0
    for (int i = 0; i &lt; rows; i++)
        for (int j = 0; j &lt; cols; j++)
            grid[i][j] = i * cols + j;
    for (const auto &amp;row : grid) {
        for (int x : row) cout &lt;&lt; x &lt;&lt; "\\t";
        cout &lt;&lt; "\\n";
    }

    array&lt;int, 3&gt; a = {1, 2, 3};      // 固定大小的陣列，知道自己的 size
    cout &lt;&lt; "array size = " &lt;&lt; a.size() &lt;&lt; "，a[2] = " &lt;&lt; a[2] &lt;&lt; "\\n";
}</pre>
<p><code>std::array&lt;型別, 大小&gt;</code> 大小固定、和 C 陣列一樣快，但可以用 size()、可以整個複製與比較、傳給函式也不會退化成指標。大小固定時用 array，需要變動時用 vector。</p>` }
  ],
  keypoints: [
    'STL 由容器、迭代器與演算法組成；不知道用什麼容器時先用 vector。',
    'vector 常用操作：push_back、pop_back、size、empty、front、back、clear。',
    'v[i] 不檢查範圍，v.at(i) 越界會拋出例外；size() 為無號整數。',
    'begin() 指向第一個元素，end() 指向最後一個的下一個位置，範圍是左閉右開 [begin, end)。',
    '在 vector 中間 insert、erase 為 O(n)；增刪元素後迭代器可能失效。',
    '二維 vector：vector<vector<int>> g(r, vector<int>(c))；固定大小用 std::array。'
  ]
},
{
  id: 'c05', subject: 1, minutes: 50,
  title: 'STL 容器：map、set、stack 與 queue',
  summary: 'pair 與 tuple、map 與 unordered_map 計數與查詢、set 去重與排序、multiset、stack、queue、deque、priority_queue，以及如何依需求選擇容器。',
  sections: [
    { id: 'pair', title: 'pair 與結構化綁定', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;utility&gt;
#include &lt;string&gt;
using namespace std;

int main()
{
    pair&lt;string, int&gt; p = {"王小明", 88};
    cout &lt;&lt; p.first &lt;&lt; " " &lt;&lt; p.second &lt;&lt; "\\n";
    auto q = make_pair(3, 4.5);
    auto [name, score] = p;                 // C++17 結構化綁定：一次取出兩個值
    cout &lt;&lt; name &lt;&lt; " 得 " &lt;&lt; score &lt;&lt; " 分，" &lt;&lt; q.first + q.second &lt;&lt; "\\n";
    pair&lt;int, int&gt; a = {1, 5}, b = {1, 3};
    cout &lt;&lt; boolalpha &lt;&lt; (b &lt; a) &lt;&lt; "\\n";   // pair 先比 first，相同再比 second
}</pre>` },
    { id: 'map', title: 'map 與 unordered_map', html: `
<p><code>map</code> 存放「鍵 → 值」的對應，像字典一樣用鍵查詢。最經典的用途是<b>計算出現次數</b>：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;map&gt;
#include &lt;string&gt;
#include &lt;sstream&gt;
using namespace std;

int main()
{
    string text = "apple banana apple cherry banana apple";
    map&lt;string, int&gt; freq;
    stringstream ss(text);
    string word;
    while (ss &gt;&gt; word) freq[word]++;        // 不存在的鍵會自動建立並初始化為 0

    for (const auto &amp;[w, c] : freq)         // map 依鍵的順序走訪
        cout &lt;&lt; w &lt;&lt; ": " &lt;&lt; c &lt;&lt; "\\n";

    cout &lt;&lt; "有 cherry 嗎？" &lt;&lt; freq.count("cherry") &lt;&lt; "\\n";
    auto it = freq.find("grape");
    if (it == freq.end()) cout &lt;&lt; "找不到 grape\\n";
    freq.erase("banana");
    cout &lt;&lt; "刪除後剩 " &lt;&lt; freq.size() &lt;&lt; " 種\\n";
}</pre>
<table>
<tr><th></th><th>map</th><th>unordered_map</th></tr>
<tr><td>內部結構</td><td>平衡二元搜尋樹（紅黑樹）</td><td>雜湊表</td></tr>
<tr><td>走訪順序</td><td><b>依鍵排序</b></td><td>沒有固定順序</td></tr>
<tr><td>查詢、插入、刪除</td><td>O(log n)</td><td>平均 O(1)，最差 O(n)</td></tr>
<tr><td>適合</td><td>需要排序或依範圍查詢</td><td>只需要快速查詢</td></tr>
</table>
<div class="box warn"><b class="t">用 [] 查詢的副作用</b><code>m["grape"]</code> 在鍵不存在時會<b>自動新增</b>一筆值為 0 的資料。只想檢查是否存在時，用 <code>m.count(key)</code> 或 <code>m.find(key) != m.end()</code>（C++20 起有 <code>m.contains(key)</code>）。</div>` },
    { id: 'set', title: 'set', html: `
<p><code>set</code> 存放<b>不重複</b>的元素，並<b>自動排序</b>：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;set&gt;
#include &lt;vector&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; v = {5, 3, 8, 3, 1, 8, 5};
    set&lt;int&gt; s(v.begin(), v.end());       // 自動去重並排序
    for (int x : s) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n共 " &lt;&lt; s.size() &lt;&lt; " 種\\n";

    s.insert(4);
    s.erase(8);
    cout &lt;&lt; "有 4 嗎？" &lt;&lt; s.count(4) &lt;&lt; "，有 8 嗎？" &lt;&lt; s.count(8) &lt;&lt; "\\n";
    cout &lt;&lt; "最小 " &lt;&lt; *s.begin() &lt;&lt; "，最大 " &lt;&lt; *s.rbegin() &lt;&lt; "\\n";
    auto it = s.lower_bound(4);           // 第一個 ≥ 4 的元素
    cout &lt;&lt; "第一個 ≥ 4 的是 " &lt;&lt; *it &lt;&lt; "\\n";

    multiset&lt;int&gt; ms = {3, 1, 3, 3};      // multiset 允許重複
    cout &lt;&lt; "3 出現 " &lt;&lt; ms.count(3) &lt;&lt; " 次\\n";
}</pre>
<p>還有 <code>unordered_set</code>（雜湊、不排序、平均 O(1)）。互動練習中的「STL 容器選擇」可以依需求找出適合的容器。</p>` },
    { id: 'adapter', title: 'stack、queue 與 priority_queue', html: `
<table>
<tr><th>容器</th><th>規則</th><th>主要操作</th><th>經典用途</th></tr>
<tr><td><code>stack</code> 堆疊</td><td>後進先出（LIFO）</td><td>push、pop、top</td><td>括號配對、復原（Undo）、深度優先搜尋</td></tr>
<tr><td><code>queue</code> 佇列</td><td>先進先出（FIFO）</td><td>push、pop、front</td><td>排隊、廣度優先搜尋（BFS）</td></tr>
<tr><td><code>priority_queue</code> 優先佇列</td><td>每次取出最大（預設）的元素</td><td>push、pop、top</td><td>排程、最短路徑（Dijkstra）、前 k 大</td></tr>
<tr><td><code>deque</code> 雙端佇列</td><td>兩端都能快速加入與移除</td><td>push_front、push_back</td><td>滑動視窗</td></tr>
</table>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;stack&gt;
#include &lt;queue&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
using namespace std;

bool balanced(const string &amp;s)          // 括號配對：遇到左括號放入，遇到右括號比對堆疊頂端
{
    stack&lt;char&gt; st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else if (c == ')' || c == ']' || c == '}') {
            if (st.empty()) return false;
            char open = st.top(); st.pop();
            if ((c == ')' &amp;&amp; open != '(') || (c == ']' &amp;&amp; open != '[') || (c == '}' &amp;&amp; open != '{')) return false;
        }
    }
    return st.empty();
}

int main()
{
    cout &lt;&lt; boolalpha &lt;&lt; balanced("{[()()]}") &lt;&lt; " " &lt;&lt; balanced("([)]") &lt;&lt; "\\n";

    queue&lt;string&gt; line;
    line.push("A"); line.push("B"); line.push("C");
    line.pop();                                     // A 先離開
    cout &lt;&lt; "現在輪到 " &lt;&lt; line.front() &lt;&lt; "，還有 " &lt;&lt; line.size() &lt;&lt; " 人\\n";

    priority_queue&lt;int&gt; pq;                         // 預設最大的在頂端
    for (int x : {5, 1, 8, 3}) pq.push(x);
    cout &lt;&lt; "最大 " &lt;&lt; pq.top() &lt;&lt; "\\n";
    priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; minq;   // 最小的在頂端
    for (int x : {5, 1, 8, 3}) minq.push(x);
    while (!minq.empty()) { cout &lt;&lt; minq.top() &lt;&lt; " "; minq.pop(); }
    cout &lt;&lt; "\\n";
}</pre>` }
  ],
  keypoints: [
    'pair 用 first／second 存取；C++17 結構化綁定 auto [a, b] = p 一次取出。',
    'map 依鍵排序、操作 O(log n)；unordered_map 不排序、平均 O(1)。',
    'm[key]++ 是計數的標準寫法；只想檢查存在時用 count 或 find，避免 [] 自動新增。',
    'set 自動去重並排序，lower_bound 找第一個 ≥ x 的元素；multiset 允許重複。',
    'stack 後進先出、queue 先進先出、priority_queue 每次取最大（加 greater<int> 改為最小）。',
    '經典用途：stack 做括號配對、queue 做 BFS、priority_queue 做排程與前 k 大。'
  ]
},
{
  id: 'c06', subject: 1, minutes: 50,
  title: 'STL 演算法與複雜度',
  summary: 'sort 與自訂比較、stable_sort、find／count／accumulate、min／max_element、reverse、unique 去重、binary_search 與 lower_bound／upper_bound，以及時間複雜度估算與 APCS 解題策略。',
  sections: [
    { id: 'sort', title: '排序', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;string&gt;
using namespace std;

struct Student { string name; int score; };

int main()
{
    vector&lt;int&gt; v = {5, 2, 9, 1, 7};
    sort(v.begin(), v.end());                        // 由小到大
    for (int x : v) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n";
    sort(v.begin(), v.end(), greater&lt;int&gt;());        // 由大到小
    for (int x : v) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n";

    vector&lt;Student&gt; s = {{"小明", 88}, {"小華", 92}, {"小美", 88}, {"小強", 75}};
    // 分數高的在前，同分依姓名排序
    sort(s.begin(), s.end(), [](const Student &amp;a, const Student &amp;b) {
        if (a.score != b.score) return a.score &gt; b.score;
        return a.name &lt; b.name;
    });
    for (const auto &amp;st : s) cout &lt;&lt; st.name &lt;&lt; " " &lt;&lt; st.score &lt;&lt; "\\n";
}</pre>
<ul>
<li><code>sort</code> 的時間複雜度為 O(n log n)。</li>
<li>比較函式要表達「a 是否應該排在 b 前面」，必須是嚴格的（相等時傳回 false），不能寫 <code>&gt;=</code>。</li>
<li>相同的元素需要保持原本順序時，用 <code>stable_sort</code>。</li>
</ul>` },
    { id: 'common', title: '常用演算法', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;numeric&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; v = {4, 8, 2, 8, 6, 2, 8};
    cout &lt;&lt; "總和 " &lt;&lt; accumulate(v.begin(), v.end(), 0) &lt;&lt; "\\n";          // numeric
    cout &lt;&lt; "8 出現 " &lt;&lt; count(v.begin(), v.end(), 8) &lt;&lt; " 次\\n";
    cout &lt;&lt; "最大 " &lt;&lt; *max_element(v.begin(), v.end())
         &lt;&lt; "，最小 " &lt;&lt; *min_element(v.begin(), v.end()) &lt;&lt; "\\n";
    auto it = find(v.begin(), v.end(), 6);
    cout &lt;&lt; "6 在索引 " &lt;&lt; (it - v.begin()) &lt;&lt; "\\n";

    reverse(v.begin(), v.end());
    for (int x : v) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n";

    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());    // 排序後去除相鄰重複
    for (int x : v) cout &lt;&lt; x &lt;&lt; " ";
    cout &lt;&lt; "\\n";
}</pre>
<table>
<tr><th>演算法</th><th>功能</th></tr>
<tr><td><code>accumulate(b, e, 初值)</code></td><td>加總（需要 &lt;numeric&gt;）；初值寫 0LL 可避免溢位</td></tr>
<tr><td><code>count</code>／<code>count_if</code></td><td>計算等於某值／符合條件的個數</td></tr>
<tr><td><code>find</code>／<code>find_if</code></td><td>找第一個符合的位置，找不到傳回 end()</td></tr>
<tr><td><code>max_element</code>／<code>min_element</code></td><td>傳回最大／最小元素的迭代器</td></tr>
<tr><td><code>reverse</code></td><td>反轉</td></tr>
<tr><td><code>unique</code></td><td>把<b>相鄰</b>的重複元素移到後面，傳回新的結尾；要先 sort</td></tr>
<tr><td><code>next_permutation</code></td><td>產生下一個排列，可列舉所有排列</td></tr>
</table>` },
    { id: 'binary', title: '二分搜尋', html: `
<p>資料<b>已排序</b>時，可以用 O(log n) 的二分搜尋：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
using namespace std;

int main()
{
    vector&lt;int&gt; v = {1, 3, 3, 3, 5, 8, 13};
    cout &lt;&lt; boolalpha &lt;&lt; binary_search(v.begin(), v.end(), 5) &lt;&lt; "\\n";
    auto lo = lower_bound(v.begin(), v.end(), 3);    // 第一個 ≥ 3
    auto hi = upper_bound(v.begin(), v.end(), 3);    // 第一個 &gt; 3
    cout &lt;&lt; "3 從索引 " &lt;&lt; (lo - v.begin()) &lt;&lt; " 到 " &lt;&lt; (hi - v.begin()) - 1
         &lt;&lt; "，共 " &lt;&lt; (hi - lo) &lt;&lt; " 個\\n";
    auto p = lower_bound(v.begin(), v.end(), 6);
    cout &lt;&lt; "第一個 ≥ 6 的是 " &lt;&lt; *p &lt;&lt; "，在索引 " &lt;&lt; (p - v.begin()) &lt;&lt; "\\n";
}</pre>
<p><code>lower_bound</code>／<code>upper_bound</code> 是競賽中最常用的工具之一：計算某個值出現幾次、找最接近的值、在排序後的資料中插入。</p>` },
    { id: 'complexity', title: '時間複雜度與解題策略', html: `
<p>線上解題系統通常限制 1～2 秒，<b>C++ 一秒大約可以執行 10<sup>8</sup> 次簡單運算</b>。看到輸入範圍，就能估算可以用什麼複雜度：</p>
<table>
<tr><th>n 的範圍</th><th>可接受的複雜度</th><th>常見做法</th></tr>
<tr><td>n ≤ 10</td><td>O(n!)</td><td>列舉所有排列</td></tr>
<tr><td>n ≤ 20</td><td>O(2<sup>n</sup>)</td><td>列舉所有子集合</td></tr>
<tr><td>n ≤ 5,000</td><td>O(n<sup>2</sup>)</td><td>雙層迴圈、簡單動態規劃</td></tr>
<tr><td>n ≤ 10<sup>5</sup>～10<sup>6</sup></td><td>O(n log n)</td><td>排序、二分搜尋、map／set、priority_queue</td></tr>
<tr><td>n ≤ 10<sup>7</sup>～10<sup>8</sup></td><td>O(n)</td><td>單層迴圈、前綴和、雙指標</td></tr>
</table>
<p>互動練習中的「時間複雜度比較」可以輸入 n，看各種複雜度的運算次數與估計時間。</p>
<h3>競賽與 APCS 的輸入輸出加速</h3>
<pre class="cpp" data-input="5&#10;3 1 4 1 5">#include &lt;bits/stdc++.h&gt;       // GCC 專用：一次引入所有標準標頭檔（競賽常用，正式專案不建議）
using namespace std;

int main()
{
    ios::sync_with_stdio(false);  // 取消與 C 的 stdio 同步
    cin.tie(nullptr);             // 輸入前不自動 flush 輸出
    int n;
    cin &gt;&gt; n;
    vector&lt;long long&gt; a(n);
    for (auto &amp;x : a) cin &gt;&gt; x;
    vector&lt;long long&gt; prefix(n + 1, 0);       // 前綴和：prefix[i] = a[0] + … + a[i-1]
    for (int i = 0; i &lt; n; i++) prefix[i + 1] = prefix[i] + a[i];
    cout &lt;&lt; "a[1..3] 的總和 = " &lt;&lt; prefix[4] - prefix[1] &lt;&lt; "\\n";   // O(1) 查詢區間和
}</pre>
<div class="box exam"><b class="t">APCS 準備建議</b>觀念題熟悉 C／C++ 的語法與程式追蹤；實作題前兩題通常是迴圈、陣列、字串、排序的基本應用，第三、四題會用到 STL、遞迴、前綴和、二分搜尋、BFS／DFS、簡單動態規劃。在 ZeroJudge 練習歷屆題，注意 int 溢位改用 long long。</div>` }
  ],
  keypoints: [
    'sort 為 O(n log n)；greater<int>() 或 lambda 自訂排序，比較函式必須是嚴格的。',
    'accumulate 加總（<numeric>）、count、find、max_element、reverse 是最常用的演算法。',
    'unique 只移除相鄰重複，要先 sort，再搭配 erase 真正刪除。',
    'lower_bound 找第一個 ≥ x、upper_bound 找第一個 > x，資料必須已排序。',
    'C++ 一秒約 10⁸ 次運算：n = 10⁵ 要用 O(n log n)，不能 O(n²)。',
    '競賽輸入加速：ios::sync_with_stdio(false); cin.tie(nullptr);；前綴和可 O(1) 查詢區間和。'
  ]
}
);
