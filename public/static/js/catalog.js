/* 首頁課程牆的分類、類型篩選與搜尋；介紹頁的分頁標示；試讀頁的表格捲動 */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // 搜尋框即時篩選，按 Enter 不送出表單
  const searchForm = $('.hero-search');
  if (searchForm) searchForm.addEventListener('submit', e => e.preventDefault());

  const grid = $('#grid');
  if (grid) {
    const cards = $$('.cw-card', grid), groups = $$('.cw-group', grid), q = $('#q'), empty = $('#empty');
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
      // 有任何篩選條件時改成網格，並隱藏沒有符合課程的分類
      grid.classList.toggle('filtering', !!(state.cat || state.kind || words.length));
      groups.forEach(g => { g.hidden = !g.querySelector('.cw-card:not([hidden])'); });
      empty.hidden = shown > 0;
      groups.forEach(updateArrows);
    };
    // 分類橫列的左右箭頭與「查看全部」
    const updateArrows = g => {
      const row = $('.cw-row', g), [prev, next] = $$('.cw-arrow', g);
      if (!prev) return;
      const max = row.scrollWidth - row.clientWidth - 2;
      prev.disabled = row.scrollLeft <= 2;
      next.disabled = row.scrollLeft >= max;
      g.classList.toggle('no-scroll', max <= 0);
    };
    groups.forEach(g => {
      const row = $('.cw-row', g), head = $('.cw-group-head', g);
      const ctl = document.createElement('div');
      ctl.className = 'cw-ctl';
      ctl.innerHTML = '<button type="button" class="cw-all">查看全部</button><button type="button" class="cw-arrow" aria-label="上一組">‹</button><button type="button" class="cw-arrow" aria-label="下一組">›</button>';
      head.appendChild(ctl);
      const [prev, next] = $$('.cw-arrow', ctl);
      const step = dir => row.scrollBy({ left: dir * row.clientWidth * 0.9, behavior: 'smooth' });
      prev.addEventListener('click', () => step(-1));
      next.addEventListener('click', () => step(1));
      $('.cw-all', ctl).addEventListener('click', () => { setCat(g.dataset.cat); $('#courses').scrollIntoView({ behavior: 'smooth' }); });
      row.addEventListener('scroll', () => updateArrows(g), { passive: true });
    });
    addEventListener('resize', () => groups.forEach(updateArrows));
    requestAnimationFrame(apply);
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
