/* C 語言教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-24）
   以台灣中文教學頻道為主（Feis Studio、Coding the World、王佳盈、Coding Neutrino 等），部分主題搭配英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('yWPGumB64tM', 'Feis Studio', 'C 語言入門課程簡介'),
      V('AAAdTmardiM', '林粒粒呀', '3 小時超快速入門 C 語言（動畫教學）'),
      V('YywgqQBqxwI', '爱上半导体', '從電腦底層認識指標')
    ],
    chapters: {
      c01: [
        V('iZ9W2nPKIwU', 'Feis Studio', 'C 語言入門：程式語言簡介'),
        V('pV5JBsXnQkc', 'Cccccccc', '如何在 Windows 安裝 C 語言編譯環境與編輯器')
      ],
      c02: [
        V('zoZRb1FlFpI', 'Feis Studio', '將 printf 或 scanf 用在不同資料型別'),
        V('m0IYyYmgZds', 'Dex IT Flipped Classroom', '輸入輸出 scanf、printf、變數與資料型別')
      ],
      c03: [
        V('03SDa3vCbP4', 'Feis Studio', '簡易四則運算練習（if-else 述句）'),
        V('FoITJidGzzQ', '充滿意外的宅爸人生', '用選擇題學 C 語言（APCS）：if 與 switch')
      ],
      c04: [
        V('7h8nLiHypuE', 'Feis Studio', '有條件的重複執行（while 述句）'),
        V('yMIaWE0XOEk', 'Feis Studio', '至少做一次的重複執行（do-while 述句）')
      ],
      c05: [
        V('BWrfNs7k5CY', 'Feis Studio', '函式遞迴'),
        V('BxKzw9OzGGg', '王佳盈', '遞迴：河內塔')
      ],
      c06: [
        V('pkDotv8U3jg', 'Feis Studio', '陣列簡介'),
        V('rCoNkXIL0is', 'Feis Studio', '關於陣列的記憶體配置')
      ],
      c07: [
        V('vKn4Pe_y0OA', 'Feis Studio', '指標變數宣告與取址運算'),
        V('U2YvpfE58cM', 'Feis Studio', '指標與陣列'),
        V('YywgqQBqxwI', '爱上半导体', '從電腦底層認識指標，深入理解 C 語言指標')
      ],
      c08: [
        V('YeCP-wVf4oI', 'Feis Studio', '字串簡介'),
        V('MmAuOpjMUdI', 'Feis Studio', '指標與字串')
      ],
      c09: [
        V('8FYp73uOqLU', 'Feis Studio', '動態配置記憶體'),
        V('HntpyQ6jk-0', 'Coding the World', '動態記憶體配置 malloc、free、calloc、realloc'),
        V('vJrkur2itXE', 'Coding the World', '結構 struct'),
        V('8pRg_mja2p0', 'Coding the World', '鏈結串列 Linked List')
      ],
      c10: [
        V('UF_L4huhzxI', 'Coding the World', '讀寫檔案、讀取 CSV、讀寫二進位檔案'),
        V('clz4Gk9esic', '王佳盈', '檔案：文字檔')
      ],
      c11: [
        V('10sJkpoFpv0', 'Yu_Peng Nie', 'C 語言的位元運算子介紹（圖解與範例）'),
        V('HW6FTPVBxyw', 'Pangfeng Liu', 'C Programming 位元運算'),
        V('v2Lj7lI_7ig', 'GUTS', '你所不知道的 C 語言：記憶體管理、對齊及硬體特性篇')
      ],
      c12: [
        V('IttSz0BYZ8o', 'Coding Neutrino 微中子的程式教學', '使用 GDB 除錯基本教學'),
        EN('Dq8l1_-QgAc', 'Low Level', 'GDB is REALLY easy! Find Bugs in Your Code')
      ]
    }
  };
})();
