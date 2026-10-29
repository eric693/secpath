/* Python 資料分析教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-29）
   以中文教學頻道為主（彭彭的課程、補根課程、图灵星球、資料科學家的工作日常），進階主題搭配英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('5QZqzKCDCQ4', '彭彭的課程', 'Python Pandas 資料分析：基礎教學'),
      V('K6zM6SojYq8', '資料科學家的工作日常', 'Pandas + NumPy 到底差在哪？'),
      V('PxZEh9KG2ds', '補根課程 Burgeoning Course', 'Python 資料視覺化的工具：matplotlib、pandas、seaborn')
    ],
    chapters: {
      c01: [
        V('5QZqzKCDCQ4', '彭彭的課程', 'Python Pandas 資料分析：基礎教學'),
        V('UCeeS95GatA', '图灵星球 TuringPlanet', '什麼是 Pandas？')
      ],
      c02: [
        V('nJUMpIo5rmg', '彭彭的課程', 'Python NumPy 入門教學、快速開始'),
        V('0XPHsxhJs9o', '彭彭的課程', 'NumPy 多維陣列 ndarray 基礎運算功能')
      ],
      c03: [
        V('175ZZC3Hr0Y', '彭彭的課程', 'Pandas 資料分析：Series 單維度資料'),
        V('5QZqzKCDCQ4', '彭彭的課程', 'Pandas 資料分析：基礎教學（DataFrame）')
      ],
      c04: [
        V('w-V7zvsBlZw', '彭彭的課程', 'Pandas 資料分析：篩選資料')
      ],
      c05: [
        EN('bDhvCp3_lYw', 'Alex The Analyst', 'Data Cleaning in Pandas'),
        V('B5BgPWBZhvY', '彭彭的課程', 'Pandas 實務演練：Google Play Store 資料集')
      ],
      c06: [
        EN('VRmXto2YA2I', 'Alex The Analyst', 'Group By and Aggregate Functions in Pandas')
      ],
      c07: [
        V('ruTuRyI7Cjk', '图灵星球 TuringPlanet', 'Pandas 合併 DataFrame：Merge、Join、Concat'),
        EN('TPivN7tpdwc', 'Alex The Analyst', 'Merging DataFrames in Pandas')
      ],
      c08: [
        V('MceOR4Kvv9I', '彭彭的課程', 'Matplotlib 簡介、安裝、快速開始'),
        V('PxZEh9KG2ds', '補根課程 Burgeoning Course', 'Python 資料視覺化的工具'),
        EN('c9vhHUGdav0', 'Bro Code', 'Learn Matplotlib in 1 hour')
      ],
      c09: [
        EN('yCgJGsg0Xa4', 'Data School', 'How do I work with dates and times in pandas?'),
        EN('UFuo7EHI8zc', 'Corey Schafer', 'Working with Dates and Time Series Data')
      ],
      c10: [
        V('K6zM6SojYq8', '資料科學家的工作日常', '資料處理 × 陣列運算一次搞懂')
      ],
      c11: [
        V('B5BgPWBZhvY', '彭彭的課程', 'Pandas 實務演練：完整資料集分析')
      ]
    }
  };
})();
