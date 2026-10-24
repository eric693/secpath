/* 學習進度：存在本機瀏覽器 localStorage，各課程分開儲存；讀寫失敗時退回記憶體。
   登入會員時（伺服器內嵌 window.SP_USER）另同步到帳號：以伺服器為準，未同步的本機變更與登入前的進度會合併上傳。 */
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

  const U = window.SP_USER;
  const LEVEL = document.body.dataset.level;

  // 合併兩份進度：時間戳記取較新、題目統計取作答次數較多者、陣列取聯集
  function merge(a, b) {
    const out = Object.assign(blank(), a);
    ['done', 'visited', 'wrong', 'stars'].forEach(k => {
      out[k] = Object.assign({}, a[k]);
      Object.entries(b[k] || {}).forEach(([id, t]) => { if (!(out[k][id] >= t)) out[k][id] = t; });
    });
    ['cards', 'check'].forEach(k => { out[k] = Object.assign({}, b[k], a[k]); });
    out.qs = Object.assign({}, a.qs);
    Object.entries(b.qs || {}).forEach(([id, s]) => {
      const x = out.qs[id];
      if (!x || (s.c + s.w) > (x.c + x.w)) out.qs[id] = s;
    });
    out.days = Array.from(new Set([...(a.days || []), ...(b.days || [])])).sort().slice(-400);
    const seen = new Set();
    out.exams = [...(a.exams || []), ...(b.exams || [])].filter(e => !seen.has(e.at) && seen.add(e.at)).sort((x, y) => y.at - x.at).slice(0, 30);
    return out;
  }

  let timer = null, pushing = false, again = false;
  function setState(t) { const el = document.getElementById('syncState'); if (el) el.textContent = t; }
  function push() {
    if (!U) return;
    if (pushing) { again = true; return; }
    pushing = true;
    const body = JSON.stringify(Object.assign({}, mem, { _owner: undefined, _dirty: undefined }));
    fetch('/api/progress/' + encodeURIComponent(LEVEL), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: body.length < 60000, credentials: 'same-origin' })
      .then(r => {
        if (!r.ok) throw new Error(r.status);
        mem._dirty = false; write(); setState('已同步到帳號');
      })
      .catch(() => setState('暫時無法同步，稍後會自動重試'))
      .finally(() => { pushing = false; if (again) { again = false; push(); } });
  }
  function write() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {} }
  function save() {
    if (U) { mem._dirty = true; setState('同步中…'); clearTimeout(timer); timer = setTimeout(push, 1500); }
    write();
  }
  if (U) {
    const local = mem, srv = U.progress ? Object.assign(blank(), U.progress) : null;
    const mine = local._owner === U.id;
    const hasLocal = Object.keys(local.done).length || Object.keys(local.qs).length || local.exams.length;
    if (local._owner && !mine) mem = srv || blank();               // 這台電腦上是別人的進度：不使用
    else if (srv) mem = mine && !local._dirty ? srv : merge(srv, local);
    mem._owner = U.id;
    const needPush = !srv ? hasLocal : (!mine && hasLocal) || local._dirty;
    write();
    if (needPush) { mem._dirty = true; push(); }
    addEventListener('pagehide', () => { if (mem._dirty) { clearTimeout(timer); push(); } });
    addEventListener('online', () => { if (mem._dirty) push(); });
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
    reset() { mem = Object.assign(blank(), { _owner: mem._owner }); save(); },
    exportJSON() { return JSON.stringify(mem, null, 2); },
    importJSON(text) { mem = Object.assign(blank(), JSON.parse(text), { _owner: mem._owner }); save(); }
  };
})();
