/* 首頁課程牆的分類、類型篩選與搜尋；介紹頁的分頁標示；試讀頁的表格捲動 */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const grid = $('#grid');
  if (grid) {
    const cards = $$('.cw-card', grid), q = $('#q'), empty = $('#empty');
    const state = { cat: '', kind: '', q: '' };
    const apply = () => {
      const words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      let shown = 0;
      cards.forEach(c => {
        const ok = (!state.cat || c.dataset.cat === state.cat) && (!state.kind || c.dataset.kind === state.kind) &&
          words.every(w => c.dataset.search.includes(w));
        c.hidden = !ok;
        if (ok) shown++;
      });
      empty.hidden = shown > 0;
    };
    const setCat = cat => {
      state.cat = cat;
      $$('.chip').forEach(b => b.classList.toggle('on', b.dataset.cat === cat));
      apply();
    };
    $$('.chip').forEach(b => b.addEventListener('click', () => setCat(b.dataset.cat)));
    $$('.kind-switch button').forEach(b => b.addEventListener('click', () => {
      state.kind = b.dataset.kind;
      $$('.kind-switch button').forEach(x => x.classList.toggle('on', x === b));
      apply();
    }));
    q.addEventListener('input', () => { state.q = q.value.trim(); apply(); });
    q.addEventListener('keydown', e => { if (e.key === 'Enter') $('#courses').scrollIntoView({ behavior: 'smooth' }); });
    // 介紹頁麵包屑的分類連結：/#cat=security
    const fromHash = () => {
      const m = location.hash.match(/^#cat=([\w-]+)/);
      if (m) { setCat(m[1]); $('#courses').scrollIntoView(); }
    };
    addEventListener('hashchange', fromHash);
    fromHash();
  }

  // 介紹頁：麵包屑分類帶入篩選
  $$('.crumbs a[data-cat]').forEach(a => { a.href = '/#cat=' + a.dataset.cat; });

  // 介紹頁分頁：捲動時標示目前段落
  const tabs = $$('.cp-tabs a');
  if (tabs.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) tabs.forEach(t => t.classList.toggle('on', t.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-120px 0px -60% 0px' });
    tabs.forEach(t => { const s = $(t.getAttribute('href')); if (s) io.observe(s); });
  }

  // 試讀頁：寬表格包一層可橫向捲動的容器
  $$('.lesson-body section > table').forEach(t => { const w = document.createElement('div'); w.className = 'table-wrap'; t.replaceWith(w); w.appendChild(t); });
})();
