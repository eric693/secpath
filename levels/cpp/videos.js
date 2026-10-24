/* C++ 教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-24）
   以中文教學頻道為主（C++ 從入門到入土、Cpp Road、An-Wen Deng、Ray 貓、秒董C++ 等），部分主題搭配英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('NF2rz5jNY5M', 'C++ 從入門到入土', 'C++ 3.5 小時初學者課程'),
      V('_0vtvUofhyc', 'Ray 貓', '30 分鐘帶你速成 C++：從零開始到基礎演算法'),
      V('u8yeB9XCLo4', 'Andy Wu', 'APCS 贏家解題祕笈（使用 C++）：各年度實作考古題')
    ],
    chapters: {
      c01: [
        V('3n1GCBuHCoI', 'Code Nomad 程式游牧者', '10 分鐘帶你進入 C++ 的世界'),
        V('kju0WLz8pM4', 'Paul Play AI', 'cout 輸出、cin 輸入、命名空間與標頭檔')
      ],
      c02: [
        V('cWiuyHY9y0Y', 'Cpp Road', '參考的宣告及使用'),
        V('59F0LjxbiIc', '愛蓁 AiZhen', 'C++ 字串（String）基本語法'),
        EN('IzoFn3dfsPA', 'The Cherno', 'REFERENCES in C++')
      ],
      c03: [
        V('Dt2kvMTqOiA', 'Cpp Road', '宣告參考為函式的參數'),
        V('R2mzYvVJqnU', '黃國豪', 'C++ 的函式多載'),
        V('AjTqiFI93eM', 'HexUp', '現代 C++ 最好用特性之一：Lambda 運算式'),
        EN('MH8mLFqj-n8', 'CodeBeauty', 'Lambda expressions in modern C++')
      ],
      c04: [
        V('v2tCxfioL6E', 'An-Wen Deng', 'C++ STL 中的 vector 介紹與程式示範（含二維陣列）')
      ],
      c05: [
        V('FbC7F5HlzhE', 'C++ 從入門到入土', '選擇 map 或 unordered_map 的關鍵原因'),
        EN('KiB0vRi2wlc', 'The Cherno', 'Maps in C++ (std::map and std::unordered_map)')
      ],
      c06: [
        V('BwCpW0Hgvm4', 'An-Wen Deng', 'C++ STL algorithm 的 sort 排序陣列'),
        V('_0vtvUofhyc', 'Ray 貓', '30 分鐘速成 C++：從零開始到基礎演算法')
      ],
      c07: [
        V('0mvEr1tVXps', 'An-Wen Deng', '一次搞懂 C++ Class：類別、封裝、友誼函數'),
        V('Wuj0Ejpc7vM', '桃木建程式設計教學頻道', 'C++ class 類別初學基礎')
      ],
      c08: [
        V('jJKCf8e5kik', 'Cpp Road', '多型是什麼？用來做什麼？'),
        V('EdZ3PPJGqv8', 'Cpp Road', 'C++ 的多型就是要用虛擬函式'),
        V('mOHdWWISvlQ', '秒董C++', 'polymorphism 多型與虛擬函數')
      ],
      c09: [
        EN('UOB7-B2MfwA', 'The Cherno', 'SMART POINTERS in C++ (unique_ptr, shared_ptr, weak_ptr)'),
        EN('e2LMAgoqY_k', 'CodeBeauty', 'SMART POINTERS in C++ (for beginners in 20 minutes)')
      ],
      c10: [
        V('yaAlWyDhVJU', '秒董C++', 'function templates 函數模板'),
        V('V1bOhgSWREk', '台灣機器學習', '樣板 template 與函數樣板')
      ],
      c11: [
        V('u8yeB9XCLo4', 'Andy Wu', 'APCS 贏家解題祕笈（使用 C++）：各年度實作考古題'),
        V('NF2rz5jNY5M', 'C++ 從入門到入土', 'C++ 3.5 小時初學者課程')
      ]
    }
  };
})();
