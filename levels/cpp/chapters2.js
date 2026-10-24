/* C++ 物件導向篇：類別、記憶體管理與現代 C++
   <pre class="cpp"> 為可在網頁上編譯執行的範例；<pre class="out"> 為一般程式碼或輸出
   程式碼內的 < > & 寫成 &lt; &gt; &amp;（本檔由腳本自動轉換） */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c07', subject: 2, minutes: 50,
  title: '類別與物件',
  summary: '物件導向的觀念、class 與 struct、成員變數與成員函式、public 與 private 封裝、建構子與初始化列表、解構子、this 指標、const 成員函式，以及 static 成員。',
  sections: [
    { id: 'oop', title: '物件導向與類別', html: `
<p><b>物件導向程式設計（OOP）</b>把資料與操作資料的函式包在一起，成為<b>類別（class）</b>；依類別建立的實體稱為<b>物件（object）</b>。類別像是設計圖，物件是照著設計圖蓋出來的房子。</p>
<table>
<tr><th>特性</th><th>意義</th><th>本課章節</th></tr>
<tr><td><b>封裝</b></td><td>隱藏內部資料，只透過公開的函式操作，避免被任意修改</td><td>本章</td></tr>
<tr><td><b>繼承</b></td><td>以現有類別為基礎建立新類別，重複使用程式碼</td><td>第 8 章</td></tr>
<tr><td><b>多型</b></td><td>同一個介面，不同物件有不同的行為</td><td>第 8 章</td></tr>
</table>` },
    { id: 'class', title: '定義類別與封裝', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

class BankAccount {
private:                         // 私有：只有類別自己的成員函式能存取
    string owner;
    double balance;

public:                          // 公開：外部可以使用
    BankAccount(const string &amp;name, double initial)   // 建構子：建立物件時自動呼叫
        : owner(name), balance(initial) {}            // 初始化列表

    bool withdraw(double amount)
    {
        if (amount &lt;= 0 || amount &gt; balance) return false;   // 在函式中檢查規則
        balance -= amount;
        return true;
    }
    void deposit(double amount) { if (amount &gt; 0) balance += amount; }
    double get_balance() const { return balance; }           // const：不會修改物件
    const string &amp;get_owner() const { return owner; }
};

int main()
{
    BankAccount acc("王小明", 1000);
    acc.deposit(500);
    cout &lt;&lt; boolalpha &lt;&lt; acc.withdraw(2000) &lt;&lt; " " &lt;&lt; acc.withdraw(300) &lt;&lt; "\\n";
    cout &lt;&lt; acc.get_owner() &lt;&lt; " 的餘額：" &lt;&lt; acc.get_balance() &lt;&lt; "\\n";
    // acc.balance = 999999;      // 編譯錯誤：balance 是 private
}</pre>
<ul>
<li><b>封裝</b>的好處：餘額只能透過 deposit、withdraw 修改，函式中可以檢查規則（不能提領超過餘額），資料不會被外部亂改。</li>
<li>class 的成員預設是 <b>private</b>；struct 的成員預設是 <b>public</b>，其他功能完全相同。習慣上單純存放資料用 struct，有規則與行為的用 class。</li>
<li>成員函式結尾的 <b>const</b> 表示它不會修改物件，const 物件只能呼叫 const 成員函式。</li>
</ul>` },
    { id: 'ctor', title: '建構子、解構子與 this', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

class Timer {
    string name;
public:
    Timer(const string &amp;n) : name(n) { cout &lt;&lt; name &lt;&lt; "：開始\\n"; }   // 建構子
    Timer() : Timer("未命名") {}                                       // 委派建構子
    ~Timer() { cout &lt;&lt; name &lt;&lt; "：結束\\n"; }                           // 解構子：物件消失時自動呼叫
    Timer &amp;rename(const string &amp;n) { this-&gt;name = n; return *this; }  // this 指向物件自己
};

int main()
{
    Timer a("任務 A");
    {
        Timer b("任務 B");
        Timer c;
        c.rename("任務 C");
    }                       // 離開大括號：c、b 依「建立的相反順序」解構
    cout &lt;&lt; "main 即將結束\\n";
}                           // a 在這裡解構</pre>
<table>
<tr><th>成員</th><th>說明</th></tr>
<tr><td>建構子（Constructor）</td><td>與類別同名、沒有傳回型別，建立物件時自動呼叫，負責初始化。可以多載。</td></tr>
<tr><td>初始化列表</td><td><code>: owner(name), balance(initial)</code>，在建構子本體執行前初始化成員；const 成員與參考成員一定要用它。</td></tr>
<tr><td>預設建構子</td><td>沒有參數的建構子；如果自己定義了任何建構子，編譯器就不會自動產生。</td></tr>
<tr><td>解構子（Destructor）</td><td><code>~類別名稱()</code>，物件生命週期結束時自動呼叫，負責釋放資源（第 9 章的 RAII 就是靠它）。</td></tr>
<tr><td>this</td><td>指向目前物件的指標；回傳 *this 可以串接呼叫。</td></tr>
</table>` },
    { id: 'static', title: 'static 成員與運算子', html: `
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

class Student {
    static int count;            // 所有物件共用一份
    int id;
public:
    Student() : id(++count) {}
    int get_id() const { return id; }
    static int total() { return count; }     // static 成員函式：不需要物件就能呼叫
};
int Student::count = 0;          // static 成員變數要在類別外定義

int main()
{
    Student a, b, c;
    cout &lt;&lt; a.get_id() &lt;&lt; " " &lt;&lt; c.get_id() &lt;&lt; " 共 " &lt;&lt; Student::total() &lt;&lt; " 人\\n";
}</pre>
<div class="box tip"><b class="t">設計類別的原則</b>成員變數一律 private；只提供必要的公開函式；不會修改物件的函式加上 const；建構子負責讓物件一建立就處於合法狀態（例如餘額不為負）。</div>` }
  ],
  keypoints: [
    '類別是設計圖、物件是實體；物件導向三大特性為封裝、繼承、多型。',
    'private 成員只有類別內部能存取；class 預設 private，struct 預設 public。',
    '建構子與類別同名、沒有傳回型別，用初始化列表初始化成員。',
    '解構子 ~類別名() 在物件生命週期結束時自動呼叫，解構順序與建構順序相反。',
    '成員函式結尾加 const 表示不修改物件；this 指向目前的物件。',
    'static 成員變數由所有物件共用，要在類別外定義；static 成員函式不需要物件即可呼叫。'
  ]
},
{
  id: 'c08', subject: 2, minutes: 50,
  title: '繼承與多型',
  summary: '繼承的語法與 protected、建構順序、函式覆寫、virtual 虛擬函式與 override、透過基底類別指標實現多型、純虛擬函式與抽象類別、虛擬解構子，以及 dynamic_cast。',
  sections: [
    { id: 'inherit', title: '繼承', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

class Employee {                          // 基底類別
protected:                                // protected：子類別可以存取，外部不行
    string name;
    int base_salary;
public:
    Employee(const string &amp;n, int s) : name(n), base_salary(s) {}
    int salary() const { return base_salary; }
    string get_name() const { return name; }
};

class Manager : public Employee {         // 衍生類別：Manager 是一種 Employee
    int bonus;
public:
    Manager(const string &amp;n, int s, int b) : Employee(n, s), bonus(b) {}   // 先呼叫基底建構子
    int total() const { return base_salary + bonus; }                     // 可以使用 protected 成員
};

int main()
{
    Manager m("林經理", 80000, 20000);
    cout &lt;&lt; m.get_name() &lt;&lt; " 底薪 " &lt;&lt; m.salary() &lt;&lt; "，含獎金 " &lt;&lt; m.total() &lt;&lt; "\\n";
}</pre>
<p>繼承表達「<b>是一種（is-a）</b>」的關係：經理是一種員工、狗是一種動物。衍生類別自動擁有基底類別的公開與保護成員。建構時先建構基底類別，再建構衍生類別；解構順序相反。</p>
<table>
<tr><th>存取修飾</th><th>類別內部</th><th>衍生類別</th><th>外部</th></tr>
<tr><td>public</td><td>✓</td><td>✓</td><td>✓</td></tr>
<tr><td>protected</td><td>✓</td><td>✓</td><td>✗</td></tr>
<tr><td>private</td><td>✓</td><td>✗</td><td>✗</td></tr>
</table>` },
    { id: 'virtual', title: 'virtual 與多型', html: `
<p><b>多型（polymorphism）</b>：透過<b>基底類別的指標或參考</b>呼叫函式時，依「實際物件的型別」決定執行哪個版本。條件是函式要宣告為 <b>virtual</b>：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;vector&gt;
using namespace std;

class Shape {
public:
    virtual double area() const = 0;          // 純虛擬函式：Shape 成為抽象類別
    virtual const char *name() const { return "圖形"; }
    virtual ~Shape() = default;               // 虛擬解構子
};

class Circle : public Shape {
    double r;
public:
    explicit Circle(double r) : r(r) {}
    double area() const override { return 3.14159 * r * r; }   // override：明確表示覆寫
    const char *name() const override { return "圓形"; }
};

class Rect : public Shape {
    double w, h;
public:
    Rect(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
    const char *name() const override { return "矩形"; }
};

int main()
{
    vector&lt;unique_ptr&lt;Shape&gt;&gt; shapes;         // 用基底類別的指標存放不同的圖形
    shapes.push_back(make_unique&lt;Circle&gt;(1.0));
    shapes.push_back(make_unique&lt;Rect&gt;(3.0, 4.0));
    double total = 0;
    for (const auto &amp;s : shapes) {
        cout &lt;&lt; s-&gt;name() &lt;&lt; " 面積 " &lt;&lt; s-&gt;area() &lt;&lt; "\\n";   // 依實際型別呼叫
        total += s-&gt;area();
    }
    cout &lt;&lt; "總面積 " &lt;&lt; total &lt;&lt; "\\n";
    // Shape s;      // 編譯錯誤：抽象類別不能建立物件
}</pre>
<ul>
<li>沒有 virtual 時，透過 Shape* 呼叫只會執行 Shape 的版本（靜態綁定）；有 virtual 時在執行時才決定（動態綁定），背後靠<b>虛擬函式表（vtable）</b>。</li>
<li><code>override</code>（C++11）讓編譯器檢查你真的覆寫了基底的虛擬函式，拼錯名稱或參數不同會報錯，一定要寫。</li>
<li><code>= 0</code> 的<b>純虛擬函式</b>讓類別成為<b>抽象類別</b>，不能建立物件，只能當作介面被繼承。</li>
</ul>` },
    { id: 'vdtor', title: '虛擬解構子', html: `
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

struct BadBase { ~BadBase() { cout &lt;&lt; "BadBase 解構\\n"; } };
struct BadDerived : BadBase { ~BadDerived() { cout &lt;&lt; "BadDerived 解構（釋放資源）\\n"; } };

struct GoodBase { virtual ~GoodBase() { cout &lt;&lt; "GoodBase 解構\\n"; } };
struct GoodDerived : GoodBase { ~GoodDerived() override { cout &lt;&lt; "GoodDerived 解構（釋放資源）\\n"; } };

int main()
{
    GoodBase *g = new GoodDerived();
    delete g;                       // 先解構 GoodDerived，再解構 GoodBase
    cout &lt;&lt; "---\\n";
    BadDerived d;                   // 直接以衍生類別物件使用時沒問題
}</pre>
<div class="box warn"><b class="t">會被繼承的類別，解構子要 virtual</b>如果基底類別的解構子不是 virtual，透過基底指標 delete 衍生物件是<b>未定義行為</b>，通常只會執行基底的解構子，衍生類別配置的資源就洩漏了。這是 C++ 面試必考題。</div>
<h3>dynamic_cast</h3>
<p>需要從基底指標轉回衍生類別時，用 <code>dynamic_cast&lt;Circle*&gt;(p)</code>：轉型失敗傳回 nullptr，比 static_cast 安全。但如果經常需要判斷實際型別，通常代表設計可以改用虛擬函式。</p>` }
  ],
  keypoints: [
    '繼承表達 is-a 關係；class Derived : public Base；衍生類別的建構子要先呼叫基底建構子。',
    'protected 成員衍生類別可以存取、外部不行。',
    '多型：virtual 函式 + 透過基底類別的指標或參考呼叫，執行時依實際型別決定版本。',
    '覆寫虛擬函式時加上 override，讓編譯器檢查。',
    '= 0 為純虛擬函式，含有純虛擬函式的類別是抽象類別，不能建立物件。',
    '會被繼承的類別，解構子必須是 virtual，否則透過基底指標 delete 會出錯。'
  ]
},
{
  id: 'c09', subject: 2, minutes: 50,
  title: '記憶體管理、RAII 與智慧指標',
  summary: 'new 與 delete、手動管理記憶體的風險、RAII 資源取得即初始化、unique_ptr 與 shared_ptr、weak_ptr、複製建構與指定、三／五／零法則，以及移動語意 std::move。',
  sections: [
    { id: 'new', title: 'new、delete 與它們的風險', html: `
<pre class="out">int *p = new int(42);           // 配置一個 int
int *arr = new int[100];        // 配置陣列
delete p;                       // 釋放單一物件
delete[] arr;                   // 釋放陣列要用 delete[]</pre>
<p>new／delete 和 C 的 malloc／free 一樣需要手動配對，而且有更多陷阱：</p>
<ul>
<li>中途 return 或拋出例外，delete 就被跳過了（記憶體洩漏）。</li>
<li>new[] 配 delete（少了 []）是未定義行為。</li>
<li>誰負責 delete 不清楚，容易重複釋放或忘記釋放。</li>
</ul>
<div class="box tip"><b class="t">現代 C++ 的原則</b>一般程式碼<b>不要直接寫 new 與 delete</b>。動態陣列用 vector、字串用 string、單一物件用智慧指標，讓資源自動釋放。</div>` },
    { id: 'raii', title: 'RAII：資源取得即初始化', html: `
<p><b>RAII（Resource Acquisition Is Initialization）</b>是 C++ 最重要的設計原則：<b>在建構子取得資源，在解構子釋放資源</b>。物件離開作用域時解構子一定會被呼叫（即使發生例外），資源就不會洩漏。</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;

class FileGuard {                         // 模擬一個需要「開啟／關閉」的資源
    string name;
public:
    explicit FileGuard(const string &amp;n) : name(n) { cout &lt;&lt; "開啟 " &lt;&lt; name &lt;&lt; "\\n"; }
    ~FileGuard() { cout &lt;&lt; "關閉 " &lt;&lt; name &lt;&lt; "\\n"; }
    FileGuard(const FileGuard &amp;) = delete;              // 禁止複製，避免重複關閉
    FileGuard &amp;operator=(const FileGuard &amp;) = delete;
};

bool process(bool fail)
{
    FileGuard f("report.txt");
    if (fail) {
        cout &lt;&lt; "處理失敗，提早 return\\n";
        return false;                     // 提早離開，解構子仍會關閉檔案
    }
    cout &lt;&lt; "處理完成\\n";
    return true;
}

int main()
{
    process(false);
    process(true);
}</pre>
<p>標準函式庫處處都是 RAII：vector、string 在解構時釋放記憶體；ifstream 在解構時關閉檔案；lock_guard 在解構時解鎖。</p>` },
    { id: 'smart', title: '智慧指標', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;string&gt;
using namespace std;

struct Dog {
    string name;
    explicit Dog(string n) : name(move(n)) { cout &lt;&lt; name &lt;&lt; " 建立\\n"; }
    ~Dog() { cout &lt;&lt; name &lt;&lt; " 釋放\\n"; }
};

int main()
{
    {
        unique_ptr&lt;Dog&gt; a = make_unique&lt;Dog&gt;("小黑");   // 獨佔所有權
        cout &lt;&lt; a-&gt;name &lt;&lt; " 汪汪\\n";
        unique_ptr&lt;Dog&gt; b = move(a);                    // 所有權轉移，a 變成空的
        cout &lt;&lt; boolalpha &lt;&lt; (a == nullptr) &lt;&lt; " " &lt;&lt; b-&gt;name &lt;&lt; "\\n";
    }                                                   // b 離開作用域，小黑自動釋放
    cout &lt;&lt; "---\\n";
    shared_ptr&lt;Dog&gt; s1 = make_shared&lt;Dog&gt;("小白");      // 共享所有權（參考計數）
    {
        shared_ptr&lt;Dog&gt; s2 = s1;
        cout &lt;&lt; "參考計數 " &lt;&lt; s1.use_count() &lt;&lt; "\\n";
    }
    cout &lt;&lt; "參考計數 " &lt;&lt; s1.use_count() &lt;&lt; "\\n";
}                                                       // 最後一個 shared_ptr 消失時才釋放</pre>
<table>
<tr><th>智慧指標</th><th>所有權</th><th>使用時機</th></tr>
<tr><td><code>unique_ptr</code></td><td>獨佔，不能複製，只能用 move 轉移</td><td><b>預設選擇</b>，沒有額外開銷</td></tr>
<tr><td><code>shared_ptr</code></td><td>共享，以參考計數管理，最後一個消失才釋放</td><td>多個地方都需要擁有同一個物件</td></tr>
<tr><td><code>weak_ptr</code></td><td>不擁有，只觀察 shared_ptr</td><td>打破 shared_ptr 的循環參考</td></tr>
</table>
<p>建立時用 <code>make_unique</code>／<code>make_shared</code>，不要寫 new。</p>` },
    { id: 'move', title: '複製、移動與三／五／零法則', html: `
<p>物件被複製時會呼叫<b>複製建構子</b>與<b>複製指定運算子</b>。如果類別自己管理資源（例如持有 new 出來的指標），預設的複製只會複製指標本身，兩個物件指向同一塊記憶體，解構時就會重複釋放。</p>
<table>
<tr><th>法則</th><th>內容</th></tr>
<tr><td><b>三法則</b></td><td>如果需要自訂解構子、複製建構子、複製指定其中一個，通常三個都需要</td></tr>
<tr><td><b>五法則</b></td><td>C++11 起再加上移動建構子與移動指定</td></tr>
<tr><td><b>零法則</b>（建議）</td><td>用 vector、string、智慧指標管理資源，自己一個都不寫，讓編譯器產生正確的版本</td></tr>
</table>
<h3>移動語意</h3>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;string&gt;
#include &lt;utility&gt;
using namespace std;

int main()
{
    vector&lt;string&gt; v;
    string big(1000, 'x');
    v.push_back(big);              // 複製：big 仍保有內容
    v.push_back(move(big));        // 移動：把內部資料「搬」過去，不複製 1000 個字元
    cout &lt;&lt; v.size() &lt;&lt; " " &lt;&lt; v[1].size() &lt;&lt; " " &lt;&lt; big.size() &lt;&lt; "\\n";   // big 被移動後通常為空
}</pre>
<p><code>std::move</code> 表示「這個物件之後不再使用，可以把它的資源搬走」。移動通常只是交換幾個指標，比複製大量資料快得多。被移動過的物件處於「有效但未指定」的狀態，只能重新指定或銷毀。</p>` }
  ],
  keypoints: [
    'new 配 delete、new[] 配 delete[]；現代 C++ 一般程式碼不要直接寫 new／delete。',
    'RAII：建構子取得資源、解構子釋放資源，即使提早 return 或發生例外也不會洩漏。',
    'unique_ptr 獨佔所有權（預設選擇），只能用 move 轉移；shared_ptr 以參考計數共享。',
    '建立智慧指標用 make_unique／make_shared；weak_ptr 用來打破循環參考。',
    '零法則：用 vector、string、智慧指標管理資源，不必自己寫複製與移動函式。',
    'std::move 把資源搬給另一個物件，避免複製；被移動的物件不應再使用其值。'
  ]
},
{
  id: 'c10', subject: 2, minutes: 45,
  title: '樣板、運算子多載與例外',
  summary: '函式樣板與型別推導、類別樣板、運算子多載（<<、+、==、<）、例外處理 try／throw／catch、標準例外類別、noexcept，以及檔案串流 fstream。',
  sections: [
    { id: 'template', title: '樣板', html: `
<p><b>樣板（template）</b>讓同一份程式碼適用於不同型別，STL 的 vector&lt;int&gt;、vector&lt;string&gt; 就是用樣板寫的：</p>
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
using namespace std;

template &lt;typename T&gt;
T my_max(T a, T b)                      // 函式樣板
{
    return a &gt; b ? a : b;
}

template &lt;typename T&gt;
class Box {                              // 類別樣板
    vector&lt;T&gt; items;
public:
    void add(const T &amp;x) { items.push_back(x); }
    size_t size() const { return items.size(); }
    const T &amp;first() const { return items.front(); }
};

int main()
{
    cout &lt;&lt; my_max(3, 8) &lt;&lt; " " &lt;&lt; my_max(2.5, 1.5) &lt;&lt; " " &lt;&lt; my_max(string("apple"), string("banana")) &lt;&lt; "\\n";
    cout &lt;&lt; my_max&lt;double&gt;(3, 2.5) &lt;&lt; "\\n";      // 型別不同時明確指定 T
    Box&lt;string&gt; names;
    names.add("小明");
    names.add("小華");
    cout &lt;&lt; names.size() &lt;&lt; " " &lt;&lt; names.first() &lt;&lt; "\\n";
}</pre>
<p>編譯器會依使用到的型別，自動產生對應版本的程式碼（樣板具現化）。樣板的定義通常要放在標頭檔中。C++20 的 <b>concepts</b> 可以限制 T 必須符合的條件，讓錯誤訊息更清楚。</p>` },
    { id: 'operator', title: '運算子多載', html: `
<pre class="cpp">#include &lt;iostream&gt;
using namespace std;

struct Vec2 {
    double x, y;
    Vec2 operator+(const Vec2 &amp;o) const { return {x + o.x, y + o.y}; }
    Vec2 operator*(double k) const { return {x * k, y * k}; }
    bool operator==(const Vec2 &amp;o) const { return x == o.x &amp;&amp; y == o.y; }
};

ostream &amp;operator&lt;&lt;(ostream &amp;os, const Vec2 &amp;v)   // 讓 cout &lt;&lt; v 可以使用
{
    return os &lt;&lt; "(" &lt;&lt; v.x &lt;&lt; ", " &lt;&lt; v.y &lt;&lt; ")";
}

int main()
{
    Vec2 a{1, 2}, b{3, 4};
    Vec2 c = a + b * 2;
    cout &lt;&lt; c &lt;&lt; " " &lt;&lt; boolalpha &lt;&lt; (a + b == Vec2{4, 6}) &lt;&lt; "\\n";
}</pre>
<ul>
<li>讓自訂類別像內建型別一樣使用運算子，讓程式碼更直覺（例如向量、分數、大數）。</li>
<li><code>operator&lt;&lt;</code> 要寫成非成員函式，第一個參數是 ostream&amp;，並傳回它以便串接。</li>
<li>定義 <code>operator&lt;</code> 後，物件就能直接放進 set、map 的鍵或用 sort 排序。</li>
<li>只在意義明確時才多載運算子，不要讓 + 做出意想不到的事。</li>
</ul>` },
    { id: 'exception', title: '例外處理', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
using namespace std;

double safe_divide(double a, double b)
{
    if (b == 0) throw invalid_argument("除數不能為 0");     // 拋出例外
    return a / b;
}

int main()
{
    try {
        cout &lt;&lt; safe_divide(10, 4) &lt;&lt; "\\n";
        cout &lt;&lt; safe_divide(1, 0) &lt;&lt; "\\n";                  // 拋出例外後，這一行之後的程式不會執行
        cout &lt;&lt; "不會印出\\n";
    } catch (const invalid_argument &amp;e) {                   // 以 const 參考捕捉
        cout &lt;&lt; "參數錯誤：" &lt;&lt; e.what() &lt;&lt; "\\n";
    }

    try {
        vector&lt;int&gt; v(3);
        v.at(10) = 1;                                       // at 越界拋出 out_of_range
    } catch (const out_of_range &amp;e) {
        cout &lt;&lt; "越界：已捕捉\\n";
    }

    try {
        int n = stoi("abc");                                // 不是數字
        cout &lt;&lt; n &lt;&lt; "\\n";
    } catch (const exception &amp;e) {                          // exception 是所有標準例外的基底
        cout &lt;&lt; "轉換失敗\\n";
    }
    cout &lt;&lt; "程式繼續執行\\n";
}</pre>
<table>
<tr><th>標準例外</th><th>情況</th></tr>
<tr><td><code>invalid_argument</code></td><td>參數不合法，例如 stoi("abc")</td></tr>
<tr><td><code>out_of_range</code></td><td>超出範圍，例如 vector::at、string::substr</td></tr>
<tr><td><code>runtime_error</code></td><td>執行時期才能發現的錯誤</td></tr>
<tr><td><code>bad_alloc</code></td><td>new 配置記憶體失敗</td></tr>
</table>
<p>例外沒有被捕捉時，程式會呼叫 terminate 結束。例外搭配 RAII：拋出例外離開作用域時，區域物件的解構子仍會執行，資源會被正確釋放。不會拋出例外的函式可以標示 <code>noexcept</code>。</p>` },
    { id: 'fstream', title: '檔案串流', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;string&gt;
using namespace std;

int main()
{
    {
        ofstream out("scores.txt");               // 開啟檔案寫入
        out &lt;&lt; "小明 88\\n小華 92\\n小美 79\\n";
    }                                             // 離開作用域自動關閉（RAII）

    ifstream in("scores.txt");
    if (!in) { cout &lt;&lt; "無法開啟\\n"; return 1; }
    string name;
    int score, total = 0, n = 0;
    while (in &gt;&gt; name &gt;&gt; score) {                 // 用法和 cin 一樣
        cout &lt;&lt; name &lt;&lt; "：" &lt;&lt; score &lt;&lt; "\\n";
        total += score;
        n++;
    }
    cout &lt;&lt; "平均 " &lt;&lt; static_cast&lt;double&gt;(total) / n &lt;&lt; "\\n";
}</pre>
<p>ifstream／ofstream 的用法和 cin／cout 相同，而且解構時會自動關閉檔案，不必像 C 一樣手動 fclose。</p>` }
  ],
  keypoints: [
    '樣板 template <typename T> 讓同一份程式碼適用不同型別，STL 就是用樣板寫成。',
    '函式樣板通常可自動推導型別；樣板的定義一般放在標頭檔。',
    '運算子多載讓自訂類別支援 +、==、< 等；operator<< 寫成非成員函式並傳回 ostream&。',
    'throw 拋出例外，try／catch 捕捉，以 const 參考捕捉；exception 是標準例外的基底。',
    'vector::at 越界拋 out_of_range、stoi 失敗拋 invalid_argument。',
    'ifstream／ofstream 用法與 cin／cout 相同，解構時自動關閉檔案。'
  ]
},
{
  id: 'c11', subject: 2, minutes: 40,
  title: '現代 C++、競程與面試',
  summary: '現代 C++ 常用功能（auto、結構化綁定、optional、constexpr、enum class）、C++20 簡介、程式競賽常用技巧、APCS 準備策略、C++ 職缺與面試常見題。',
  sections: [
    { id: 'modern', title: '現代 C++ 常用功能', html: `
<pre class="cpp">#include &lt;iostream&gt;
#include &lt;map&gt;
#include &lt;optional&gt;
#include &lt;string&gt;
using namespace std;

enum class Level { Bronze, Silver, Gold };          // 有範圍的列舉，不會和其他名稱衝突

constexpr int square(int x) { return x * x; }       // 可以在編譯時期計算

optional&lt;int&gt; find_score(const map&lt;string, int&gt; &amp;m, const string &amp;name)
{
    auto it = m.find(name);
    if (it == m.end()) return nullopt;              // 沒有值
    return it-&gt;second;
}

int main()
{
    constexpr int s = square(12);                    // 編譯時期就算好 144
    map&lt;string, int&gt; scores = {{"小明", 88}, {"小華", 92}};
    for (const auto &amp;[name, score] : scores)         // 結構化綁定
        cout &lt;&lt; name &lt;&lt; " " &lt;&lt; score &lt;&lt; "\\n";

    if (auto r = find_score(scores, "小美"); r.has_value())   // if 中初始化（C++17）
        cout &lt;&lt; "小美 " &lt;&lt; *r &lt;&lt; "\\n";
    else
        cout &lt;&lt; "查無小美\\n";
    cout &lt;&lt; find_score(scores, "小華").value_or(0) &lt;&lt; " " &lt;&lt; s &lt;&lt; "\\n";

    Level lv = Level::Gold;
    cout &lt;&lt; (lv == Level::Gold ? "金牌" : "其他") &lt;&lt; "\\n";
}</pre>
<table>
<tr><th>版本</th><th>重要功能</th></tr>
<tr><td>C++11</td><td>auto、範圍 for、lambda、智慧指標、移動語意、nullptr、enum class、unordered_map</td></tr>
<tr><td>C++14</td><td>make_unique、泛型 lambda</td></tr>
<tr><td>C++17</td><td>結構化綁定、optional、variant、string_view、if 中初始化、filesystem</td></tr>
<tr><td>C++20</td><td>concepts、ranges、coroutines、modules、std::format、三向比較 &lt;=&gt;</td></tr>
</table>` },
    { id: 'contest', title: '程式競賽常用技巧', html: `
<table>
<tr><th>技巧</th><th>用途</th></tr>
<tr><td>long long</td><td>答案可能超過 21 億時（例如總和、乘積），一律用 long long</td></tr>
<tr><td>前綴和</td><td>O(1) 查詢區間總和</td></tr>
<tr><td>雙指標、滑動視窗</td><td>在排序陣列中找配對、找符合條件的最長區間</td></tr>
<tr><td>二分搜尋答案</td><td>答案具有單調性時，對答案二分</td></tr>
<tr><td>BFS／DFS</td><td>迷宮、連通區塊、最短步數（queue 做 BFS）</td></tr>
<tr><td>動態規劃</td><td>把大問題拆成重疊的子問題並記錄結果，例如背包問題、最長共同子序列</td></tr>
<tr><td>貪心法</td><td>每一步選當下最好的，需要證明正確性</td></tr>
</table>
<pre class="cpp" data-input="5 4&#10;S.#..&#10;.##.#&#10;...#.&#10;#...E">#include &lt;bits/stdc++.h&gt;
using namespace std;

int main()                  // BFS 迷宮最短路徑：S 走到 E 最少幾步（# 為牆）
{
    int R, C;
    cin &gt;&gt; C &gt;&gt; R;
    vector&lt;string&gt; g(R);
    for (auto &amp;row : g) cin &gt;&gt; row;
    vector&lt;vector&lt;int&gt;&gt; dist(R, vector&lt;int&gt;(C, -1));
    queue&lt;pair&lt;int, int&gt;&gt; q;
    for (int i = 0; i &lt; R; i++)
        for (int j = 0; j &lt; C; j++)
            if (g[i][j] == 'S') { dist[i][j] = 0; q.push({i, j}); }
    int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1};
    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();
        if (g[r][c] == 'E') { cout &lt;&lt; "最少 " &lt;&lt; dist[r][c] &lt;&lt; " 步\\n"; return 0; }
        for (int k = 0; k &lt; 4; k++) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr &lt; 0 || nr &gt;= R || nc &lt; 0 || nc &gt;= C) continue;
            if (g[nr][nc] == '#' || dist[nr][nc] != -1) continue;
            dist[nr][nc] = dist[r][c] + 1;
            q.push({nr, nc});
        }
    }
    cout &lt;&lt; "無法抵達\\n";
}</pre>
<div class="box tip"><b class="t">練習平台</b>ZeroJudge（APCS 歷屆題、台灣高中生常用）、AtCoder（題目品質好、有初學者比賽）、LeetCode（求職面試）、Codeforces（競賽）。</div>` },
    { id: 'interview', title: 'C++ 職缺與面試常見題', html: `
<table>
<tr><th>職缺</th><th>常見要求</th></tr>
<tr><td>韌體與驅動程式工程師</td><td>C／C++、指標、記憶體、Linux、嵌入式</td></tr>
<tr><td>EDA 與演算法工程師（IC 設計相關）</td><td>C++、STL、資料結構與演算法、效能最佳化</td></tr>
<tr><td>遊戲開發工程師</td><td>C++、Unreal Engine、數學、記憶體與效能</td></tr>
<tr><td>金融科技、量化交易</td><td>現代 C++、低延遲、多執行緒</td></tr>
<tr><td>影像處理、自駕、機器人</td><td>C++、OpenCV、ROS、Linux</td></tr>
</table>
<h3>面試常見題</h3>
<ol>
<li>指標與參考的差別；何時用 const 參考傳遞參數。</li>
<li>struct 與 class 的差別；public、protected、private。</li>
<li>virtual 函式如何運作（vtable）；為什麼基底類別的解構子要 virtual。</li>
<li>多載（overload）與覆寫（override）的差別。</li>
<li>unique_ptr 與 shared_ptr 的差別；什麼是 RAII。</li>
<li>什麼是移動語意，std::move 做了什麼。</li>
<li>vector 的 push_back 為什麼是平均 O(1)；size 與 capacity；迭代器失效。</li>
<li>map 與 unordered_map 的差別與時間複雜度。</li>
<li>new／delete 與 malloc／free 的差別（建構子與解構子是否被呼叫）。</li>
<li>現場解題：反轉鏈結串列、兩數之和（unordered_map）、括號配對（stack）、Top K（priority_queue）。</li>
</ol>
<pre class="cpp">#include &lt;bits/stdc++.h&gt;
using namespace std;

vector&lt;int&gt; two_sum(const vector&lt;int&gt; &amp;nums, int target)   // 兩數之和：O(n)
{
    unordered_map&lt;int, int&gt; seen;                           // 數值 → 索引
    for (int i = 0; i &lt; (int)nums.size(); i++) {
        auto it = seen.find(target - nums[i]);
        if (it != seen.end()) return {it-&gt;second, i};
        seen[nums[i]] = i;
    }
    return {};
}

int main()
{
    auto r = two_sum({2, 7, 11, 15}, 18);
    cout &lt;&lt; r[0] &lt;&lt; " " &lt;&lt; r[1] &lt;&lt; "\\n";
}</pre>
<div class="box exam"><b class="t">作品集建議</b>用 C++ 完成一個專題放上 GitHub：命令列記帳本（類別 + 檔案存檔）、文字冒險遊戲（繼承與多型）、簡易的 JSON 解析器，或用 SFML／raylib 做的小遊戲。用 CMake 建置、附上單元測試與 README，並在履歷中列出 APCS 成績或解題數。</div>` }
  ],
  keypoints: [
    '現代 C++ 常用：auto、結構化綁定、optional、constexpr、enum class、if 中初始化。',
    'C++20 新增 concepts、ranges、coroutines、modules、std::format。',
    '競賽技巧：long long、前綴和、雙指標、二分搜尋、BFS／DFS、動態規劃、貪心。',
    'BFS 用 queue 求最短步數；兩數之和用 unordered_map 達到 O(n)。',
    'C++ 職缺包括韌體、EDA、遊戲、金融科技、影像與自駕。',
    '面試常考指標與參考、virtual 與 vtable、虛擬解構子、智慧指標與 RAII、移動語意、STL 複雜度。'
  ]
}
);
