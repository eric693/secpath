/* SQL 教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-24）
   以中文教學頻道為主（PAPAYA 電腦教室、GrandmaCan、Dex IT、很正经的板牙等），部分主題搭配英文影片。
   影片多以 MySQL 或 Access 示範，語法與講義的 SQLite 大致相同。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('G_zGBR0mQmE', 'PAPAYA 電腦教室', 'SQL 十四分鐘速成班'),
      V('gvRXjsrpCHw', 'GrandmaCan -我阿嬤都會', 'SQL 3 小時初學者教學（MySQL）'),
      V('emBDEs_zZVs', 'Dorothee', 'SQL 語法快速上手：五個常用語法，撈資料不求人')
    ],
    chapters: {
      c01: [
        V('kcUgrrnWsRg', 'WenXuanDecode 文轩解码', '7 分鐘零基礎入門：什麼是資料庫與 SQL'),
        V('bpmada0ZsXQ', '图灵星球 TuringPlanet', '關係模型、主鍵與外鍵'),
        V('G_zGBR0mQmE', 'PAPAYA 電腦教室', 'SQL 十四分鐘速成班')
      ],
      c02: [
        V('q7f00TnrMqQ', 'Dex IT Flipped Classroom', 'SELECT、WHERE、ORDER BY、DISTINCT、AS 教學'),
        EN('kbKty5ZVKMY', 'Adam Finer - Learn BI', 'Learn Basic SQL in 15 Minutes')
      ],
      c03: [
        V('ZHiwAxVXyAk', '董旭阳', 'SQL 入門教程：複雜條件'),
        V('D6YMc_rQbYM', 'Jomy King', '條件查詢 WHERE 語句（MySQL）')
      ],
      c04: [
        V('udI_H-yi4m8', '很正经的板牙', '數據分析 SQL 面試考點：CASE WHEN'),
        V('mWQqYQ5Q-Jc', '很正经的板牙', 'CASE WHEN 進階用法示例'),
        EN('mf_IFI3I7to', 'Becoming a Data Scientist', 'Writing CASE WHEN Statements in SQL')
      ],
      c05: [
        V('BAv5Icw8UUU', 'Dex IT Flipped Classroom', '聚合函數 SUM、COUNT、AVG 與 GROUP BY、HAVING'),
        V('2UOVSx9QBQA', '很正经的板牙', '分組函數 GROUP BY 用法講解'),
        EN('nNrgRVIzeHg', 'Becoming a Data Scientist', 'GROUP BY, HAVING vs. WHERE')
      ],
      c06: [
        V('qJnp8VHT-90', 'Dr. 許軒 Hsuan Hsu', '一次搞懂 5 種 SQL JOIN 合併查詢'),
        V('aD0vjQagmSI', 'Dex IT Flipped Classroom', 'JOIN 多表連接查詢：內連接與外連接'),
        V('vIzsMPWAhPo', '很正经的板牙', '各種 JOIN 傻傻分不清？一個例子講清區別')
      ],
      c07: [
        V('34ji9g3IKeg', 'Dex IT Flipped Classroom', 'Subquery 子查詢教學'),
        V('LgEYbmQzONc', '董旭阳', '子查詢概述'),
        EN('K1WeoKxLZ5o', 'Alex The Analyst', 'CTE (Common Table Expression)')
      ],
      c08: [
        V('CFXh4p3n7Nk', '很正经的板牙', '最難搞定的 WINDOW FUNCTION 解析'),
        V('dlbx-iYEc-8', '董旭阳', '視窗函數（MySQL）'),
        EN('rIcB4zMYMas', 'Maven Analytics', 'SQL Window Functions: PARTITION BY, ROW_NUMBER, RANK, DENSE_RANK')
      ],
      c09: [
        V('6ZXz0TzKHSs', '壩格很多資訊', '資料表欄位、主鍵與外鍵（SQL Server）'),
        EN('rFssfx37UJw', 'Bro Code', 'MySQL: FOREIGN KEYS are easy')
      ],
      c10: [
        EN('OB2leB2iZ6U', 'Bro Code', 'MySQL: How to UPDATE and DELETE data'),
        EN('GAe5oB742dw', 'ByteByteGo', 'ACID Properties in Databases With Examples')
      ],
      c11: [
        V('WMoQ1KcZ650', 'Grace999', '正規化 1NF 到 3NF'),
        V('o7piRTr5phs', '杰哥數位教室', '正規化：1NF～3NF 的執行'),
        EN('GFQaEYEc8_8', 'Decomplexify', 'Learn Database Normalization - 1NF, 2NF, 3NF')
      ],
      c12: [
        V('93f0xoqR2aU', '轩辕的编程宇宙', '面試愛問的 MySQL 索引，一個動畫就了解'),
        V('AAPf55AVlXU', '技术蛋老师', 'SQL 注入攻擊原理、方法和類型'),
        EN('wcaiKgQU6VE', 'Hacksplaining', 'What Is SQL Injection?')
      ]
    }
  };
})();
