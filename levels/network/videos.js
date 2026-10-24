/* 網路基礎教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-24）
   以台灣中文教學頻道為主（阿彬電腦、弱電通等），部分主題搭配 PowerCert 等英文動畫影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('FcY0i60OvVk', '弱電通', '一看就懂！網路架構基礎教學'),
      V('gxoIrBFfpDU', '阿彬電腦', '網路紮根概念 2：網路七層與 TCP/IP'),
      V('YyUVOHlxdUw', '阿彬電腦', '網路紮根概念 11：Subnetting 子網段的切割')
    ],
    chapters: {
      c01: [
        V('DgBqYYcoqqA', '神腦國際 Senao Taiwan', '交換器、路由器、分享器的差別在哪？'),
        V('FcY0i60OvVk', '弱電通', '一看就懂！網路架構基礎教學'),
        V('Q51FTH7eF70', 'KenTechConnect', '網路入門：路由器、交換機和集線器')
      ],
      c02: [
        V('gxoIrBFfpDU', '阿彬電腦', '網路紮根概念 2：網路七層與 TCP/IP'),
        V('2NElqvIh53g', '技術蛋老師', 'OSI 七層網路參考模型：網路資料傳輸原理')
      ],
      c03: [
        V('DM1owMey-nQ', '掌芝士', '電腦如何通訊？IP 位址與 MAC 位址、DHCP 與 ARP'),
        EN('cn8Zxh9bPio', 'PowerCert Animated Videos', 'ARP Explained - Address Resolution Protocol'),
        EN('TIiQiw7fpsU', 'PowerCert Animated Videos', 'MAC Address Explained')
      ],
      c04: [
        V('QQP8E61YiSI', '啟芳出版社', '看動畫學計概：子網路遮罩'),
        EN('eHV1aOnu7oM', 'NETWORKING WITH H', 'IP address network and host portion | subnet mask explained')
      ],
      c05: [
        V('YyUVOHlxdUw', '阿彬電腦', '網路紮根概念 11：Subnetting 子網段的切割'),
        V('qPb6ytUHRKA', '阿彬電腦', '網路紮根概念 12：Subnetting 計算題目'),
        V('zciP59UUuRE', '蔡岳豐', '網路基本概論：子網路切割法'),
        EN('RLCd5u0sjoU', 'Sunny Classroom', 'VLSM Subnetting - subnetting a subnet')
      ],
      c06: [
        V('LcvO8dTELrs', '阿彬電腦', '網路紮根概念 14：認識 IPv6'),
        V('RyZqa9yflqg', '台灣網路資訊中心', 'IPv6 推廣中文 8 分鐘短片')
      ],
      c07: [
        V('5jijK2YTFnw', 'Dex IT Flipped Classroom', 'VLAN 基礎概念教學'),
        V('UKMqLrvY6eg', '弱電通', 'VLAN 虛擬區域網路設定教學')
      ],
      c08: [
        V('PAGxPjbwjTY', '阿彬電腦', '網路紮根概念 28：靜態與動態路由'),
        V('QvwFVWZyTyA', '阿彬電腦', 'Packet Tracer 實作 OSPF 動態路由（CCNA 先備技能）')
      ],
      c09: [
        V('Iuvjwrm_O5g', '掌芝士', '一條影片講清楚 TCP 與 UDP：三次握手與四次揮手'),
        V('z74mq1h7oCY', '技術蛋老師', 'TCP 三次握手和四次揮手')
      ],
      c10: [
        V('ZqWb5nNzTf8', '學習呀三木', 'DNS 工作原理：什麼是 DNS、它如何運作'),
        V('dnA8ZeX55TU', '野生網管', '家庭網路通訊原理：NAT 轉換、DHCP／DNS 工作原理')
      ],
      c11: [
        V('Tiw_BffTknM', 'Wilson說給你聽', 'WPA3、WPA2：WiFi 密碼該怎麼設定才安全？'),
        EN('WZaIfyvERcA', 'PowerCert Animated Videos', 'WiFi Password Security - WEP, WPA, WPA2, WPA3, WPS Explained')
      ],
      c12: [
        V('BvS0xIxGAnw', 'i3EDU Channel', '網路模擬器 Packet Tracer：基礎網路的建置'),
        V('7PUrQOek7xg', '阿彬電腦', 'Packet Tracer 基本指令（CCNA 先備技能）'),
        V('Dd1AubViXuo', '陳振庸', 'Cisco Packet Tracer 教學 01：下載與安裝')
      ]
    }
  };
})();
