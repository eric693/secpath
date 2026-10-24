/* 學習進度：只存在本機瀏覽器 localStorage，初級與中級分開儲存；讀寫失敗時退回記憶體 */
(function () {
  const KEY = 'secpath.' + (document.body.dataset.level || 'default');
  const THEME_KEY = 'secpath.theme';
  const blank = () => ({
    done: {},        // 章節完成 { c01: timestamp }
    visited: {},     // 章節最後閱讀時間
    qs: {},          // 題目統計 { q12: { c: 答對次數, w: 答錯次數, last: 最近一次是否答對 } }
    wrong: {},       // 錯題本 { q12: timestamp }
    stars: {},       // 收藏題目
    exams: [],       // 模擬考紀錄
    cards: {},       // 閃卡熟悉度 { 名詞: 1 已記住 / 0 再複習 }
    days: [],        // 有學習的日期 YYYY-MM-DD
    check: {}        // 考前清單勾選
  });
  let mem = blank();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) mem = Object.assign(blank(), JSON.parse(raw));
  } catch (e) { /* 無痕模式或被封鎖時只用記憶體 */ }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {}
  }
  function today() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  window.Store = {
    get: () => mem,
    save,
    touch() {
      const t = today();
      if (!mem.days.includes(t)) { mem.days.push(t); if (mem.days.length > 400) mem.days.shift(); save(); }
    },
    streak() {
      const set = new Set(mem.days);
      let n = 0;
      const d = new Date();
      if (!set.has(today())) d.setDate(d.getDate() - 1); // 今天還沒學，從昨天往回算
      for (;;) {
        const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        if (!set.has(k)) break;
        n++; d.setDate(d.getDate() - 1);
      }
      return n;
    },
    markDone(id, on) { if (on) mem.done[id] = Date.now(); else delete mem.done[id]; save(); },
    visit(id) { mem.visited[id] = Date.now(); this.touch(); save(); },
    answer(qid, ok) {
      const s = mem.qs[qid] || (mem.qs[qid] = { c: 0, w: 0, last: null });
      if (ok) s.c++; else s.w++;
      s.last = ok;
      if (!ok) mem.wrong[qid] = Date.now();
      this.touch();
      save();
    },
    clearWrong(qid) { delete mem.wrong[qid]; save(); },
    toggleStar(qid) { if (mem.stars[qid]) delete mem.stars[qid]; else mem.stars[qid] = Date.now(); save(); return !!mem.stars[qid]; },
    addExam(rec) { mem.exams.unshift(rec); mem.exams = mem.exams.slice(0, 30); this.touch(); save(); },
    setCard(term, v) { mem.cards[term] = v; this.touch(); save(); },
    setCheck(k, v) { mem.check[k] = v; save(); },
    getTheme() { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } },
    setTheme(t) { try { localStorage.setItem(THEME_KEY, t); } catch (e) {} },
    reset() { mem = blank(); save(); },
    exportJSON() { return JSON.stringify(mem, null, 2); },
    importJSON(text) { mem = Object.assign(blank(), JSON.parse(text)); save(); }
  };
})();
