/* Python 入門教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-17）
   以台灣中文教學頻道為主（彭彭的課程、PAPAYA 電腦教室、CodeShiba 程式柴等）。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  window.VIDEOS = {
    review: [
      V('lvH4-4iYjgs', 'CodeShiba 程式柴', 'Python 6 小時初學者課程（完整版）'),
      V('zdMUJJKFdsU', 'GrandmaCan -我阿嬤都會', '4 小時初學者 Python 教學'),
      V('Kgi0JkEGlmw', 'Coding & Coworking Club, ccClub', '5 小時學會 Python，零程式基礎也能學')
    ],
    chapters: {
      c01: [
        V('zD7dXqE-VVA', 'PAPAYA 電腦教室', 'Python 零基礎新手入門 #01 基本簡介與安裝'),
        V('Ptw0CZin74c', 'HiSKIO', '如何安裝 Python 環境？'),
        V('G7X66wShzhs', '西西弗斯', 'Python 零基礎入門 #01 環境建置與第一支程式')
      ],
      c02: [
        V('eUNHOcw-2MA', 'PAPAYA 電腦教室', 'Python 零基礎新手入門 #02 變數與資料型態'),
        V('3snNDFcpXZY', 'CodeShiba 程式柴', '初學者必備知識：變數與資料型別'),
        V('bLRa4TZ99aY', '彭彭的課程', 'Python 數字、字串的基本運算')
      ],
      c03: [
        V('zGyFNeOOYeE', 'CodeShiba 程式柴', '輕鬆學 f-string 格式化字串'),
        V('3agdMlpxG-4', '沈弘哲', 'f-string 字串格式化是什麼')
      ],
      c04: [
        V('onrMi-D7lvY', 'PAPAYA 電腦教室', 'Python 零基礎新手入門 #03 IF 條件判斷式'),
        V('A93BsHB-lWo', '彭彭的課程', 'Python 流程控制：if 判斷式'),
        V('ZsmVCMm5QZA', '贊贊小屋', 'Python if else elif 條件判斷用法與範例：猜數字小程式')
      ],
      c05: [
        V('uTBXt6F37_s', 'PAPAYA 電腦教室', 'Python 零基礎新手入門 #05 For Loop（迴圈）'),
        V('KnGdj1cjOlY', 'PAPAYA 電腦教室', 'Python 零基礎新手入門 #06 While Loop（迴圈）'),
        V('szaAeLt_49U', '彭彭的課程', 'Python 流程控制：迴圈基礎，while 迴圈、for 迴圈'),
        V('3LayhRs9y5I', 'CodeShiba 程式柴', '輕鬆學巢狀迴圈')
      ],
      c06: [
        V('8UHmhfnUIRo', 'PAPAYA 電腦教室', 'Python 零基礎新手入門 #04 List 清單（串列）'),
        V('JLU5oc4_VtA', '彭彭的課程', 'Python 有序列表的基本運算 - List、Tuple'),
        V('0rrSKvdzlbc', 'Coding & Coworking Club, ccClub', 'list 串列（指定、複製）')
      ],
      c07: [
        V('2uhs3TOmb64', 'PAPAYA 電腦教室', 'Python 零基礎新手入門 #08 Dictionaries（字典）'),
        V('L3-KuGYhw78', '彭彭的課程', 'Python 集合、字典的基本運算 - Set、Dictionary'),
        V('FKLco0IJLcU', 'CodeShiba 程式柴', '輕鬆上手 Python 中的字典 Dictionary')
      ],
      c08: [
        V('74Qt9Qdl3Hs', 'PAPAYA 電腦教室', 'Python 零基礎新手入門 #07 Function（函式）'),
        V('7qKFvUVpQXg', '彭彭的課程', 'Python 函式基礎：定義並呼叫函式'),
        V('dSgOlXQlNJk', 'CodeShiba 程式柴', '函式 function 原來那麼簡單')
      ],
      c09: [
        V('V3vHhR1SipU', '彭彭的課程', 'Python 錯誤、例外處理 Exception Handling'),
        { title: 'Debugging Python with Visual Studio Code', yt: 'b4p-SBjHh28', by: 'ProgrammingKnowledge', lang: 'en' }
      ],
      c10: [
        V('C4OkV6DrVRs', '彭彭的課程', 'Python 文字檔案的讀取和儲存'),
        V('H5ybRdN-TwE', '彭彭的課程', 'Python 讀取、寫入 CSV 格式檔案'),
        V('uHV4V-z5c8E', 'GrandmaCan -我阿嬤都會', '檔案的讀取、寫入')
      ],
      c11: [
        V('I-xm8wVqO1o', 'PAPAYA 電腦教室', 'Python 零基礎新手入門 #09 Module（模組）'),
        V('Et0DjY2cGiE', '彭彭的課程', 'Python Module 模組的載入與使用'),
        V('brB0erNJB5Y', '彭彭的課程', 'Python 虛擬環境 Venv 管理')
      ],
      c12: [
        V('AJfZvl9Hsn4', 'PAPAYA 電腦教室', 'Python 零基礎新手入門 #10 Class（類別）'),
        V('LQZLeYQEzkM', 'CodeShiba 程式柴', 'Python 物件導向編程 10 分鐘快速入門'),
        V('uPKgQ3FoVtY', '彭彭的課程', 'Python 類別的定義與使用'),
        V('L_Um_D8ZXD0', 'CodeShiba 程式柴', 'Python 中的繼承')
      ]
    }
  };
})();
