/* AI 應用規劃師中級教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-15）
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const ST = (yt, title) => ({ title, yt, by: 'iPAS陪跑師 X Stan' });
  const HY = (yt, title) => ({ title, yt, by: 'Hung-yi Lee' });
  window.VIDEOS = {
    review: [
      ST('rGTUEgeEHc4', 'iPAS AI 應用規劃師中級 科目一：五十分鐘考前精華重點衝刺'),
      ST('BiQMRJ2Y6Zs', 'iPAS AI 應用規劃師中級 科目一：二小時全集收錄'),
      ST('jFn4pODTNkw', 'iPAS AI 應用規劃師中級 科目二：二小時全集收錄'),
      ST('qFDTt2yxuFg', 'iPAS AI 應用規劃師中級 科目三：二小時全集收錄（上集）'),
      { title: 'iPAS AI 應用規劃師 Python 特訓：iPAS 必考語法與邏輯', yt: '9y0IqEKc8dc', by: 'iPAS自學路' },
      { title: 'iPAS 值得考嗎？2026 職場價值與非本科高效備考心法', yt: 'OJUBeC4Q8sI', by: 'iPAS自學路' }
    ],
    chapters: {
      c01: [
        ST('_EHJ5KA1KiY', 'L21101 自然語言處理技術與應用：NLP、NLU、NLG 一次分清楚'),
        ST('_tqk4RsX7Fo', 'L21101 自然語言處理技術與應用：NLP 前處理與詞彙向量化'),
        { title: 'AI 應用規劃師（中級）考前速成：科目一 3.1 自然語言處理技術與應用', yt: '7bSWbuFdd84', by: 'AI與放射科學的研究室' },
        HY('n9TlOhRjYoc', '【機器學習 2021】Transformer（上）')
      ],
      c02: [
        ST('4wsz9wEOtnI', 'L21102 電腦視覺技術與應用：機器如何看懂影像'),
        ST('uDSHV2Ok1iU', 'L21102 電腦視覺技術與應用：從影像前處理到 CNN、偵測與分割'),
        { title: 'AI 應用規劃師（中級）考前速成：科目一 3.2 電腦視覺技術與應用', yt: 'MrTky5oG9Zc', by: 'AI與放射科學的研究室' },
        HY('OP5HcXJg2Aw', '【機器學習 2021】卷積神經網路（CNN）')
      ],
      c03: [
        ST('g32dq4o6xZo', 'L21103 生成式 AI 技術與應用：文本、圖像、語音生成怎麼考'),
        ST('VyeVVNYoeO0', 'L21104 多模態人工智慧應用：文字、影像、語音如何一起理解'),
        ST('AeLBQDZQAxE', 'L21104 多模態人工智慧應用：應用場景、風險與未來趨勢'),
        HY('QLiKmca4kzI', '【生成式 AI 時代下的機器學習（2025）】第一講：生成式人工智慧的技術突破與未來發展'),
        HY('M2Yg1kwPpts', '【生成式 AI 時代下的機器學習（2025）】第二講：一堂課搞懂 AI Agent 的原理'),
        HY('z83Edfvgd9g', '【生成式 AI】速覽圖像生成常見模型')
      ],
      c04: [
        ST('D_JstV1TlN4', 'L21201 AI 導入評估：需求、痛點、可行性與 POC'),
        { title: 'AI 導入到底值不值得？業務痛點、技術評估與 ROI 計算', yt: 'ruoqlVy3_rk', by: 'iPAS自學路' },
        { title: 'AI 專案先別急著全面導入：POC 概念驗證流程與關鍵指標', yt: 'R_2pR8tdnBU', by: 'iPAS自學路' }
      ],
      c05: [
        ST('O5LhONHEKH8', 'L21203 AI 風險管理：技術、組織、人力與法規風險'),
        ST('zEJOgBtSwFo', 'L21203 AI 風險管理：MLOps 監控與風險控管怎麼做'),
        { title: '從 ISO 42001 到《歐盟人工智慧法案》：2026 第一季 AI 治理風暴', yt: 'Oa3u3qANvsw', by: 'ESG 永續e起來' }
      ],
      c06: [
        ST('74eiH7b6638', 'L21301 數據準備與模型選擇：資料清理、品質檢核與特徵工程'),
        ST('8G1CHcErLOA', 'L21302 AI 技術系統集成與部署：MLOps 與持續優化'),
        ST('2GFl6_y_5Go', 'MLOps 在管什麼？讓 AI 上線後還能持續維運')
      ],
      c07: [
        ST('UL-DJkMg4b8', 'L22101 敘述性統計與資料摘要技術：平均數、中位數、標準差怎麼判斷'),
        ST('WrJMcG7VgPI', 'L22102 機率分佈與資料分佈模型：伯努利、二項、泊松、常態怎麼分'),
        ST('L7gvdF7J8jQ', '機率分佈在看什麼？先分清離散型與連續型'),
        { title: '【iPAS｜M2_013】常態分佈：資料都乖乖長成鐘形嗎？', yt: 'TTIoAzYREHA', by: 'Sean愛AI' }
      ],
      c08: [
        ST('KBPlJaAa78E', 'L22103 假設檢定與統計推論：p 值、信賴區間、型一型二錯誤'),
        ST('YhsLdp6MbG0', 'L22103 假設檢定與統計推論：t 檢定、ANOVA、卡方檢定怎麼選'),
        { title: '【iPAS｜M2_014】非參數方法：分布看不懂，還能往下算嗎？', yt: 'm0ytbQ5O3Ao', by: 'Sean愛AI' }
      ],
      c09: [
        ST('ySguNU9wAzI', 'L22201 數據收集與清理：完整性、正確性、一致性怎麼看'),
        ST('MjTdg37aeFc', 'L22202 數據儲存與管理：資料湖、分散式儲存與治理怎麼選'),
        ST('QwGQ3uBDVfA', 'L22203 數據處理技術與工具：轉換、編碼、縮放與特徵工程'),
        { title: '大數據怎麼處理？Hadoop 是什麼？跟 HDFS、Spark、Flink、Hive、HBase 是什麼關係？', yt: 'oNcQlp-h9Rk', by: '小白debug' },
        { title: 'iPAS AI 應用規劃師 Python 特訓：Pandas 屬性與方法差異及資料健檢全攻略', yt: 'CVMt9ndxMsY', by: 'iPAS自學路' },
        { title: '【iPAS｜M2_028】Pandas 清理：缺值卡住，型別也跟著鬧脾氣？', yt: 'SAJNmofXPO8', by: 'Sean愛AI' }
      ],
      c10: [
        ST('emsCZ8DnAZA', 'L22302 常見的大數據分析方法：近似統計、時序分析、網路分析'),
        ST('0NPyzvoIwOg', 'L22302 常見的大數據分析方法：文字、地理空間、異常偵測怎麼選'),
        ST('ZBW1j0mKIQE', 'L22303 數據可視化工具：數值、關聯、類別、時間序列圖表'),
        { title: '【iPAS｜M2_027】Resampling 重採樣：少數類太少，怎麼幫它加戲？', yt: 'L5Vc-PRzbWw', by: 'Sean愛AI' }
      ],
      c11: [
        ST('tL2cQ1q64vI', 'L22401 大數據與機器學習：大數據如何重構模型流程'),
        ST('yluQDNSCmm8', 'L22402 大數據在鑑別式 AI 中的應用：分類、預測、偵測怎麼落地'),
        ST('f0nXjpX1PVY', 'L22403 大數據在生成式 AI 中的應用：資料品質決定生成品質'),
        ST('bQiHYsVGxh0', 'L22404 大數據隱私保護、安全與合規：資料能用，不代表可以亂用')
      ],
      c12: [
        ST('eGigdepS1H4', 'L23101 機率統計之機器學習基礎應用：用機率看懂機器學習預測邏輯'),
        ST('2lXuqISRZC4', '機率統計之機器學習基礎應用：條件機率與貝氏定理'),
        ST('IxYtfYDO-9s', 'L23102 線性代數之機器學習基礎應用：向量、矩陣、PCA'),
        ST('thDmXRUB0d0', 'L23103 數值優化技術與方法：損失函數、梯度下降與收斂'),
        ST('tYVwpRDCCzU', '數值優化技術與方法：梯度下降與小批次更新')
      ],
      c13: [
        { title: 'L23201 機器學習原理與技術', yt: 'rAF13BWEy4s', by: 'AI 應用規劃師IPAS考題解析' },
        ST('_A2xiexP5QQ', '線性迴歸、邏輯迴歸、SVM 怎麼分？'),
        HY('Ye018rCVvOo', '【機器學習 2021】預測本頻道觀看人數（上）：機器學習基本概念簡介')
      ],
      c14: [
        ST('Mx76GkEp5f4', '深度學習原理與框架：人工神經元'),
        ST('eGtdzWIjITM', '深度學習原理與框架：MLP 多層感知器'),
        ST('Y-N1usGtNl8', '深度學習原理與框架：前向與反向傳播'),
        ST('BoUKZm1QRTM', '深度學習原理與框架：損失與正則化'),
        ST('XLVUl3DNVLg', 'L23203 CNN、RNN、Transformer 與注意力機制'),
        HY('bHcJCp2Fyxs', '【機器學習 2021】預測本頻道觀看人數（下）：深度學習基本概念簡介')
      ],
      c15: [
        ST('cU5VT2qsi5I', 'L23302 模型選擇與架構設計：任務、資料與部署限制怎麼配'),
        ST('dDIPhRQIncw', 'L23303 訓練流程、資料分割、K-fold 與訓練監控'),
        ST('B2rfZlDM6vg', 'L23303 分類、迴歸與不平衡資料評估指標'),
        ST('EC1qTaaS8_o', 'L23304 學習率、批次大小、網路深度寬度與激活函數'),
        ST('-WyBoSFLxpg', 'L23304 優化器與正則化：SGD、Momentum、Adagrad、Adam、L1/L2'),
        { title: '【iPAS｜M3_073】為什麼 Random Search 找參數更快', yt: 'rjKQd7Wnde8', by: 'Sean愛AI' }
      ],
      c16: [
        ST('ifYg6yDhb7g', 'L23401 匿名化、隱私強化技術與 AI 訓練合規'),
        ST('q2NMEDRviCk', 'L23401 機器學習治理、隱私風險與風險評估'),
        ST('vDh7NJalo-A', 'L23402 AI 偏見、資料偏見與模型偏見'),
        ST('hGWYkZN7H5g', 'L23402 公平性衡量指標與評估工具：AIF360、Fairlearn')
      ]
    }
  };
})();
