/* Git 教學影片：皆已透過 YouTube oEmbed 確認可公開嵌入（2026-10-24）
   以台灣中文教學頻道為主（五倍學院、六角學院、PAPAYA 電腦教室等）。
   格式：{ title, yt: YouTube 影片 ID, by: 頻道名稱, lang: 'en' 表示英文影片 } */
(function () {
  const V = (yt, by, title) => ({ title, yt, by });
  const EN = (yt, by, title) => ({ title, yt, by, lang: 'en' });
  window.VIDEOS = {
    review: [
      V('FKXRiAiQFiY', 'PAPAYA 電腦教室', 'Git 和 GitHub 零基礎快速上手'),
      V('P-nbNgIzlYE', '走歪的工程師James', 'git branch 一次學會：branch、pull request、merge、rebase'),
      EN('e9lnsKot_SQ', 'ByteByteGo', 'How Git Works: Explained in 4 Minutes')
    ],
    chapters: {
      c01: [
        V('FKXRiAiQFiY', 'PAPAYA 電腦教室', 'Git 和 GitHub 零基礎快速上手'),
        V('q4CQBuZ4IGo', 'Ross Ning', 'Git + GitHub 十分鐘完全入門')
      ],
      c02: [
        V('ePaU_kS3rUs', '李祐棠', 'Git 教學系列 - Add and Commit'),
        V('g9-X6fR2eYA', '走歪的工程師James', '如何寫好的 commit 訊息')
      ],
      c03: [
        EN('GytsxgB4-HU', 'Philomatics', 'Undo a git commit - git reset/revert - pushed/not pushed'),
        EN('iIaM7j3tMuk', 'Boot dev', 'Git Revert vs Git Reset')
      ],
      c04: [
        V('94K3s6W5cKc', '小馬技術', 'Git 入門：使用分支 git branch'),
        V('iAEPvL9IxDA', '小馬技術', 'Git 入門：合併分支 git merge'),
        EN('e2IbNHi4uCI', 'freeCodeCamp.org', 'Git Branches Tutorial')
      ],
      c05: [
        V('-6xhsLQQJBc', '六角學院', 'Git Merge 衝突解決'),
        V('uC9EFAFHtVo', '小馬技術', 'Git 入門：解決分支衝突')
      ],
      c06: [
        EN('T13gDBXarj0', 'The Modern Coder', 'Git Pull vs Fetch: When To Use Each'),
        EN('yxvqLBHZfXk', 'Tony Teaches Tech', 'How to clone, push, and pull with git')
      ],
      c07: [
        V('y5rb1ggm6OU', '六角學院', 'Git 發 GitHub PR 請求流程 pull request'),
        V('pytolws6aiE', '五倍學院', '使用 Pull Request 和其他開發者互動'),
        V('bXOdD-bKfkA', '沈弘哲', 'GitHub PR（Pull Request）教學')
      ],
      c08: [
        V('HeF7dwVyzow', '五倍學院', '另一種合併方式（使用 rebase）'),
        V('MAV1HCsp7cs', '張文鈿 ihower', 'Git rebase 和 merge 合併操作示範'),
        EN('0chZFIZLR_0', 'ByteByteGo', 'Git MERGE vs REBASE: Everything You Need to Know')
      ],
      c09: [
        V('CN065MNHtMY', '沈弘哲', 'git 指令教學 - git stash'),
        V('azciLlpr3Gs', '沈弘哲', 'git 指令教學 - git tag 說明')
      ],
      c10: [
        V('ELkHzzpT17c', '六角學院', 'GitHub flow 講解'),
        V('B1ZANddOHyM', 'Gamma Ray 軟體工作室', '什麼是 git flow？5 項分支全詳解'),
        EN('GQQqf-C2ha4', 'TechWorld with Nana', '3 Git Workflows Every Developer Should Know')
      ]
    }
  };
})();
