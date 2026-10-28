/* React 教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-28）
   以中文教學頻道為主（布魯斯前端、我是大仁哥、Wei Wei 前端教學、六角學院等），Hooks 等主題搭配英文影片。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('zqV7NIFGDrQ', '布魯斯前端', 'React 快速入門：前 TikTok 工程師帶你入門前端'),
      V('aBTiZfShe-4', '我是大仁哥', '2 小時 React 快速入門'),
      V('xpUi90NlekE', '六角學院', '新手怎麼學好 React？')
    ],
    chapters: {
      c01: [
        V('l789xaPU1WM', 'Ross Ning', 'React 10 分鐘快速入門'),
        V('aBTiZfShe-4', '我是大仁哥', '2 小時 React 快速入門')
      ],
      c02: [
        V('uH-UP7sksSQ', 'Wei Wei 前端教學', 'JSX In Depth：深入了解 JSX'),
        V('Z5p8TSZLYhQ', 'Progress Bar 進度條線上課程', '編譯 JSX 與 Chrome 除錯擴充功能')
      ],
      c03: [
        EN('uvEAvxWvwOs', 'Bro Code', 'PROPS in React explained'),
        V('zqV7NIFGDrQ', '布魯斯前端', 'React 快速入門（元件與 props）')
      ],
      c04: [
        V('kbos1xdRhlk', 'Wei Wei 前端教學', '初學者常犯的錯誤（useState）'),
        EN('V9i3cGD-mts', 'Cosden Solutions', 'Learn React Hooks: useState')
      ],
      c05: [
        V('-OfJ9igUubo', 'Wei Wei 前端教學', '不要把 index 當成 list key 來使用'),
        EN('fGxKOmCuH5w', 'Cosden Solutions', 'React Keys and Lists - Complete Tutorial')
      ],
      c06: [
        V('J718kpFmvCA', 'Wei Wei 前端教學', 'Form 表單驗證（Formik、React Hook Form、Yup）'),
        EN('falMPMOPMAk', 'Code Stoic', 'Handling Form Submission In React')
      ],
      c07: [
        V('q0C5g4WIrKU', '走歪的工程師 James', '一個範例讓你搞懂 useState、useRef、useEffect'),
        EN('-4XpG5_Lj_o', 'Cosden Solutions', 'Learn React Hooks: useEffect')
      ],
      c08: [
        EN('42BkpGe8oxg', 'Cosden Solutions', 'Learn React Hooks: useRef'),
        EN('vpE9I_eqHdM', 'Cosden Solutions', 'Learn React Hooks: useMemo'),
        EN('_AyFP5s69N4', 'Web Dev Simplified', 'Learn useCallback In 8 Minutes')
      ],
      c09: [
        V('mU_kaUftxFA', 'Wei Wei 前端教學', '使用 useContext 與 useReducer 管理 state'),
        EN('HYKDUF8X3qI', 'Cosden Solutions', 'Learn React Hooks: useContext'),
        EN('6ThXsUwLWvc', 'Web Dev Simplified', 'Learn Custom Hooks In 10 Minutes')
      ],
      c10: [
        EN('oTIJunBa6MA', 'Cosden Solutions', 'React Router - Complete Tutorial'),
        EN('00lxm_doFYw', 'Cosden Solutions', 'Fetching Data in React - Complete Tutorial')
      ],
      c11: [
        V('fYoo42tq_aY', 'Wei Wei 前端教學', 'React 資料夾結構介紹'),
        V('fz77TeUTkPE', 'Wei Wei 前端教學', '使用 Vercel 部署前端與後端專案'),
        V('IIhVKpp37c0', 'Wei Wei 前端教學', '面試前端工程師被問到的問題'),
        EN('9wiWzu_tRB0', 'Bro Code', 'Build this to-do-list app with React')
      ]
    }
  };
})();
