/* Kubernetes 容器編排教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-31）
   中文影片說明觀念，英文影片補充各主題的實作示範。Kubernetes 版本更新快，指令輸出以講義與官方文件為準。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('C4CAZ0U_8LY', '矽谷叔叔 Uncle Sam', 'Kubernetes（K8S）是什麼？'),
      V('RUjcGn2YeVo', 'jasonmel', '二十一分鐘略懂 Kubernetes（以及 Helm）'),
      EN('TlHvYWVUZyc', 'ByteByteGo', 'Kubernetes Explained in 6 Minutes | k8s Architecture')
    ],
    chapters: {
      c01: [
        V('C4CAZ0U_8LY', '矽谷叔叔 Uncle Sam', 'Kubernetes（K8S）是什麼？'),
        V('ubz3cFgxeJA', 'Ross Ning', 'Kubernetes 十分鐘快速入門'),
        EN('TlHvYWVUZyc', 'ByteByteGo', 'Kubernetes Explained in 6 Minutes | k8s Architecture')
      ],
      c02: [
        V('892O6zG8VLA', '技术蛋老师', 'Kubernetes 的核心概念以及在本地部署多種資源'),
        EN('s_o8dwzRlu4', 'TechWorld with Nana', 'Kubernetes Crash Course for Absolute Beginners')
      ],
      c03: [
        V('RUjcGn2YeVo', 'jasonmel', '二十一分鐘略懂 Kubernetes'),
        EN('daVUONZqn88', 'Microsoft Azure', 'How Kubernetes works')
      ],
      c04: [
        EN('T4Z7visMM4E', 'TechWorld with Nana', 'Kubernetes Services explained | ClusterIP vs NodePort vs LoadBalancer'),
        EN('NPFbYpb0I7w', 'IBM Technology', 'Kubernetes Ingress in 5 mins')
      ],
      c05: [
        EN('FAnQTgr04mU', 'TechWorld with Nana', 'Kubernetes ConfigMap and Secret as Kubernetes Volumes')
      ],
      c06: [
        EN('s_o8dwzRlu4', 'TechWorld with Nana', 'Kubernetes Crash Course（含 StatefulSet 與儲存）')
      ],
      c07: [
        EN('hsJ2qtwoWZw', 'Anton Putra', 'Kubernetes Autoscaling: HPA vs. VPA vs. Keda vs. CA vs. Karpenter')
      ],
      c08: [
        EN('afUL5jGoLx0', 'Tech Tutorials with Piyush', 'Kubernetes Autoscaling Explained | HPA Vs VPA'),
        EN('hsJ2qtwoWZw', 'Anton Putra', 'Kubernetes Autoscaling: HPA vs. VPA vs. Keda vs. CA vs. Karpenter')
      ],
      c09: [
        EN('G3R24JSlGjY', 'Microsoft Azure', 'Understand Role Based Access Control in Kubernetes')
      ],
      c10: [
        EN('-ykwb1d0DXU', 'TechWorld with Nana', 'What is Helm in Kubernetes? Helm and Helm Charts explained'),
        EN('ZQ_TOHR_lBI', 'careerwithricha', '5 Common Kubernetes Pod Errors Explained: CrashLoopBackOff, ImagePull, OOM'),
        EN('jWs1_TfPQoQ', 'Alta3 Research', '10 Mistakes that will RUIN Your CKA/CKAD Score')
      ]
    }
  };
})();
