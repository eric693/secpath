/* SecPath 主程式：路由、頁面渲染、測驗引擎（初級／中級共用，內容由 LEVEL 設定與資料檔決定） */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
  const pad = n => String(n).padStart(2, '0');

  /* ---------- 資料 ---------- */
  const LV = window.LEVEL;
  const CH = window.CHAPTERS.slice().sort((a, b) => a.id.localeCompare(b.id));
  const chMap = Object.fromEntries(CH.map(c => [c.id, c]));
  const chNo = c => +c.id.slice(1);
  const Q = window.QUESTIONS.map((r, i) => ({ id: 'q' + i, ch: r[0], q: r[1], opts: r[2], a: r[3], exp: r[4], code: r[5] || '' }));
  const qMap = Object.fromEntries(Q.map(q => [q.id, q]));
  const GL = window.GLOSSARY.map(r => ({ term: r[0], en: r[1], def: r[2], ch: r[3], abbr: r[4] || '' }));
  // 科目數由 LEVEL.subjects 決定（iPAS 多為兩科，AI 應用規劃師中級為三科）
  const SK = Object.keys(LV.subjects).map(Number);
  const SUBJ = Object.fromEntries(SK.map(s => [s, Object.assign({ cls: 's' + s }, LV.subjects[s])]));
  // 模擬考組合：'0' 為全部範圍，'1+2' 為指定科目組合
  const MIXES = LV.mixes || [{ s: '0', label: '綜合', title: LV.mixLabel || '兩科混合' }];
  const subjOf = key => key === '0' ? SK : String(key).split('+').map(Number);
  const chOf = s => CH.filter(c => c.subject === s);
  const qOfCh = ids => Q.filter(q => ids.includes(q.ch));
  const LETTERS = 'ABCD';
  const VID = window.VIDEOS || { review: [], chapters: {} };
  CH.forEach(c => { c.videos = (VID.chapters || {})[c.id] || []; });
  const REVIEW = VID.review || [];
  const videoCount = CH.reduce((n, c) => n + c.videos.length, 0) + REVIEW.length;
  function videoCard(v) {
    return `<figure class="video"><div class="video-frame">${v.file
      ? `<video controls preload="metadata" src="data/media/${encodeURIComponent(v.file)}"></video>`
      : `<button class="video-play" type="button" data-act="play-video" data-yt="${esc(v.yt)}" data-title="${esc(v.title)}"><span class="play-tri"></span><span>播放影片</span></button>`}</div>
      <figcaption>${esc(v.title)}<span>${v.by ? esc(v.by) : ''}${v.lang === 'en' ? '・英文影片' : ''}</span></figcaption></figure>`;
  }
  // 介面用語：證照課程用預設值，非證照課程（如實作課）可在 LEVEL.words 覆寫
  const W = Object.assign({
    exam: '模擬考', sprint: '考前重點', info: '考試概要', review: '考前總複習', checklist: '考前檢查清單',
    terms: '考試常見名詞', sprintLead: '考前一週每天瀏覽一次：記憶口訣、必背數字與各章重點。',
    examTip: '<b class="t">應考策略</b>先完成有把握的題目，不確定的先跳過，第二輪再回頭作答。單選題不倒扣，交卷前務必確認每題都已作答。',
    videoNote: '考試仍以講義與官方公告為準', mnemonics: '記憶口訣', numbers: '必背數字'
  }, LV.words);
  const SITE = LV.site || ['iPAS 官網', 'https://www.ipas.org.tw/'];
  const codeBlock = q => q.code ? `<pre class="q-code">${esc(q.code)}</pre>` : '';
  const TOOLS = LV.tools.map(([id, ch]) => Object.assign({}, Tools.META[id], { id, ch }));

  /* ---------- 共用 ---------- */
  const view = $('#view');
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2000);
  }
  function crumb(...parts) {
    const all = [`<a href="#/">${esc(LV.name)}課程</a>`].concat(parts.map((p, i) => i === parts.length - 1 ? `<b>${esc(p)}</b>` : esc(p)));
    $('#crumb').innerHTML = all.join('<span class="sep">/</span>');
    document.title = (parts.length ? parts[parts.length - 1] + ' · ' : '') + LV.title + ' · SecPath 學堂';
  }
  function setNav(key) { $$('#nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === key)); }
  function refreshStreak() { $('#streak b').textContent = Store.streak(); }
  function fmt(sec) { sec = Math.max(0, Math.floor(sec)); return pad(Math.floor(sec / 60)) + ':' + pad(sec % 60); }

  function stats() {
    const S = Store.get();
    const answered = Object.keys(S.qs).filter(k => qMap[k]);
    let tc = 0, tw = 0;
    answered.forEach(k => { tc += S.qs[k].c; tw += S.qs[k].w; });
    const done = CH.filter(c => S.done[c.id]).length;
    const overall = Math.round((done / CH.length * 0.5 + answered.length / Q.length * 0.5) * 100);
    return { S, answered: answered.length, attempts: tc + tw, acc: pct(tc, tc + tw), done, overall, wrong: Object.keys(S.wrong).filter(k => qMap[k]).length };
  }
  function chStat(id) {
    const S = Store.get(); const qs = Q.filter(q => q.ch === id);
    let ans = 0, ok = 0;
    qs.forEach(q => { const s = S.qs[q.id]; if (s) { ans++; if (s.last) ok++; } });
    return { total: qs.length, ans, ok, acc: pct(ok, ans) };
  }
  function subjStat(s) {
    let total = 0, ans = 0, ok = 0;
    chOf(s).forEach(c => { const x = chStat(c.id); total += x.total; ans += x.ans; ok += x.ok; });
    return { total, ans, ok, acc: pct(ok, ans) };
  }

  /* ---------- 路由 ---------- */
  const routes = { '': home, path, videos, ch: chapter, practice, quiz, exam, result, wrong, cards, glossary, tools, sprint };
  function router() {
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    const key = parts[0] || '';
    closeMenu();
    if (key !== 'quiz') stopTimer();
    (routes[key] || home)(parts.slice(1));
    view.focus({ preventScroll: true });
    window.scrollTo(0, 0);
    refreshStreak();
  }
  window.addEventListener('hashchange', router);

  /* ---------- 學習總覽 ---------- */
  function home() {
    setNav('home'); crumb('學習總覽');
    const st = stats();
    const next = CH.find(c => !st.S.done[c.id]) || CH[0];
    const lastExam = st.S.exams[0];
    view.innerHTML = `
      <section class="home-head">
        <div>
          <div class="overline">${esc(LV.overline || 'iPAS 資訊安全工程師能力鑑定・' + LV.name)}</div>
          <h1>${LV.headline}</h1>
          <p class="lead">${esc(LV.lead)}</p>
          <div class="row">
            <a class="btn lg" href="#/ch/${next.id}">${st.done ? '繼續學習' : '開始學習'}：第 ${chNo(next)} 章</a>
            <a class="btn outline lg" href="#/exam">${W.exam}</a>
          </div>
        </div>
        <div class="progress-card">
          <div class="overline" style="margin-bottom:12px">整體學習進度</div>
          <div class="big">${st.overall}<small>%</small></div>
          <div class="bar"><span style="width:${st.overall}%"></span></div>
          <dl class="kv">
            <dt>完成章節</dt><dd>${st.done} / ${CH.length}</dd>
            <dt>已練習題目</dt><dd>${st.answered} / ${Q.length}</dd>
            <dt>累計答對率</dt><dd>${st.attempts ? st.acc + '%' : '—'}</dd>
            <dt><a href="#/wrong">待複習錯題</a></dt><dd>${st.wrong}</dd>
          </dl>
        </div>
      </section>

      <section class="section">
        <div class="facts">
          <div><b>${CH.length}</b><span>章講義</span></div>
          <div><b>${Q.length}</b><span>道附解析練習題</span></div>
          <div><b>${GL.length}</b><span>個關鍵名詞</span></div>
          <div><b>${TOOLS.length}</b><span>項互動練習</span></div>
        </div>
      </section>

      <section class="section grid g2">
        <div class="panel">
          <div class="panel-title"><h3>${W.info}</h3><a class="small" href="${esc(SITE[1])}" target="_blank" rel="noopener">${esc(SITE[0])}</a></div>
          <table class="tbl">${LV.examInfo.map(r => `<tr><td class="muted" style="width:90px">${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}</table>
          <p class="small muted" style="margin:0">${esc(LV.examNote)}</p>
        </div>
        <div class="panel">
          <div class="panel-title"><h3>科目準備度</h3><a class="small" href="#/practice">前往練習</a></div>
          <div class="readiness">
            ${SK.map(s => {
              const x = subjStat(s), est = x.ans >= 15 ? x.acc : null;
              return `<div>
                <div class="head"><b>${SUBJ[s].name}</b><span class="muted small">${esc(SUBJ[s].title)}</span>
                  <span class="score">${est === null ? `<span class="muted">再練 ${15 - x.ans} 題可估分</span>` : `<span class="tag ${est >= 70 ? 'ok' : est >= 60 ? 'warn' : 'bad'}">預估 ${est} 分</span>`}</span></div>
                <div class="bar ${SUBJ[s].cls}"><span style="width:${pct(x.ans, x.total)}%"></span></div>
                <div class="tiny muted" style="margin-top:4px">已練習 ${x.ans} / ${x.total} 題</div>
              </div>`;
            }).join('')}
          </div>
          <p class="small muted" style="margin:18px 0 0">預估分數依各題最近一次作答結果計算，${esc(LV.readyNote || '建議兩科穩定在 75 分以上再應考。')}</p>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2>建議讀書計畫</h2>
          <span class="aside">${lastExam ? `最近一次${W.exam}：${esc(lastExam.title)}，${lastExam.score} 分` : '每天一章，搭配二十題練習'}</span></div>
        <table class="tbl">${LV.plan.map(r => `<tr><td style="width:100px" class="mono">${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}</table>
      </section>

      <section class="section">
        <div class="section-head"><h2>課程大綱</h2><a class="aside" href="#/path">檢視完整大綱</a></div>
        ${syllabus(false)}
      </section>`;
  }

  function syllabus(withSummary) {
    const S = Store.get();
    return `<div class="syllabus">${SK.map(s => `
      <div class="syl-group"><span class="tag ${SUBJ[s].cls}">${SUBJ[s].name}</span><h3>${esc(SUBJ[s].title)}</h3>
        <span class="small muted">${chOf(s).filter(c => S.done[c.id]).length} / ${chOf(s).length} 章完成</span></div>
      ${chOf(s).map(c => {
        const x = chStat(c.id), done = !!S.done[c.id], doing = !done && S.visited[c.id];
        return `<a class="syl-row ${done ? 'done' : ''}" href="#/ch/${c.id}">
          <span class="syl-no">${pad(chNo(c))}</span>
          <span><span class="syl-title">${esc(c.title)}</span>${withSummary ? `<span class="syl-sum" style="display:block">${esc(c.summary)}</span>` : ''}</span>
          <span class="syl-meta">${c.minutes} 分鐘<br>${x.total} 題</span>
          <span class="syl-state ${done ? 'done' : ''}">${done ? '已完成' : doing ? '學習中' : '未開始'}${x.ans ? `・答對 ${x.acc}%` : ''}
            <span class="bar ok" style="display:block"><span style="width:${pct(x.ans, x.total)}%"></span></span></span>
        </a>`;
      }).join('')}`).join('')}</div>`;
  }

  /* ---------- 課程大綱 ---------- */
  function path() {
    setNav('path'); crumb('課程大綱');
    view.innerHTML = `
      <header class="page-head">
        <div class="overline">${esc(LV.title)}</div>
        <h1>課程大綱</h1>
        <p class="lead">建議依章節順序學習。每章讀完後完成章節練習，答對率達 80% 再進入下一章。</p>
      </header>
      ${syllabus(true)}`;
  }

  /* ---------- 章節閱讀 ---------- */
  let spy;
  function chapter([id]) {
    const c = chMap[id];
    if (!c) { location.hash = '#/path'; return; }
    setNav('path'); crumb('課程大綱', `第 ${chNo(c)} 章 ${c.title}`);
    Store.visit(c.id);
    const S = Store.get();
    const idx = CH.indexOf(c), prev = CH[idx - 1], next = CH[idx + 1];
    const x = chStat(c.id), n = chNo(c);
    view.innerHTML = `
    <div class="lesson">
      <article>
        <header class="lesson-head">
          <div class="overline">第 ${n} 章・${SUBJ[c.subject].name} ${esc(SUBJ[c.subject].title)}</div>
          <h1>${esc(c.title)}</h1>
          <p class="lead">${esc(c.summary)}</p>
          <div class="lesson-meta"><span>閱讀約 ${c.minutes} 分鐘</span><span>${c.sections.length} 節</span><span>練習題 ${x.total} 題</span>${S.done[c.id] ? '<span style="color:var(--ok)">已完成</span>' : ''}</div>
        </header>
        <div class="lesson-body">
          ${c.sections.map((s, i) => `<section id="s-${s.id}"><h2><span class="sec-no">${n}.${i + 1}</span>${esc(s.title)}</h2>${s.html}</section>`).join('')}
          ${c.videos.length ? `<section id="s-video">
            <h2><span class="sec-no">${n}.▶</span>延伸影片</h2>
            <p class="small muted">以下為外部公開影片，協助理解本章觀念，內容觀點屬原作者。點擊播放後才會向 YouTube 載入。</p>
            <div class="videos">${c.videos.map(videoCard).join('')}</div>
          </section>` : ''}
          <section id="s-key" class="lesson-end">
            <h2><span class="sec-no">${n}.★</span>本章重點</h2>
            <ol class="keypoints">${c.keypoints.map(k => `<li>${esc(k)}</li>`).join('')}</ol>
            <div class="row" style="margin-top:24px">
              <button class="btn accent" data-act="ch-quiz" data-id="${c.id}" type="button">開始本章練習（${x.total} 題）</button>
              <button class="btn outline" data-act="toggle-done" data-id="${c.id}" type="button">${S.done[c.id] ? '取消完成標記' : '標記為已完成'}</button>
              <a class="btn outline" href="#/cards/${c.id}">本章名詞卡</a>
            </div>
          </section>
        </div>
        <nav class="lesson-nav">
          ${prev ? `<a href="#/ch/${prev.id}"><small>上一章</small>第 ${chNo(prev)} 章 ${esc(prev.title)}</a>` : ''}
          ${next ? `<a class="next" href="#/ch/${next.id}"><small>下一章</small>第 ${chNo(next)} 章 ${esc(next.title)}</a>` : ''}
        </nav>
      </article>
      <aside class="toc">
        <h4>本章內容</h4>
        ${c.sections.map((s, i) => `<a href="#/ch/${c.id}" data-scroll="s-${s.id}"><span>${n}.${i + 1}</span>${esc(s.title)}</a>`).join('')}
        ${c.videos.length ? `<a href="#/ch/${c.id}" data-scroll="s-video"><span>${n}.▶</span>延伸影片</a>` : ''}
        <a href="#/ch/${c.id}" data-scroll="s-key"><span>${n}.★</span>本章重點</a>
        <div class="toc-actions"><button class="btn sm" data-act="ch-quiz" data-id="${c.id}" type="button">本章練習</button></div>
      </aside>
    </div>`;
    $$('.lesson-body section > table', view).forEach(t => { const w = document.createElement('div'); w.className = 'table-wrap'; t.replaceWith(w); w.appendChild(t); });
    if (spy) spy.disconnect();
    spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) $$('.toc a', view).forEach(a => a.classList.toggle('on', a.dataset.scroll === e.target.id));
    }), { rootMargin: '-80px 0px -70% 0px' });
    $$('.lesson-body section', view).forEach(s => spy.observe(s));
  }

  /* ---------- 測驗引擎 ---------- */
  let session = null, timer = null;
  const makeItems = list => list.map(q => ({ id: q.id, perm: shuffle([0, 1, 2, 3]) }));
  const isRight = (it, p) => p !== undefined && it.perm[p] === qMap[it.id].a;
  function startPractice(list, title, opts = {}) {
    if (!list.length) { toast('沒有符合條件的題目'); return; }
    session = Object.assign({ kind: 'practice', title, items: makeItems(list), idx: 0, picks: {}, start: Date.now() }, opts);
    location.hash = '#/quiz';
  }
  function startExam(list, title, minutes, subject) {
    session = { kind: 'exam', title, subject, items: makeItems(list), idx: 0, picks: {}, start: Date.now(), limit: minutes * 60, done: false };
    location.hash = '#/quiz';
  }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }

  function quiz() {
    if (!session || session.done) { location.hash = '#/practice'; return; }
    setNav(session.kind === 'exam' ? 'exam' : 'practice');
    crumb(session.kind === 'exam' ? W.exam : '題庫練習', session.title);
    drawQuiz();
    if (session.kind === 'exam' && !timer) {
      timer = setInterval(() => {
        const left = session.limit - (Date.now() - session.start) / 1000;
        const el = $('#timer');
        if (el) { el.textContent = '剩餘 ' + fmt(left); el.classList.toggle('low', left < 300); }
        if (left <= 0) { stopTimer(); toast('作答時間結束，已自動交卷'); submitExam(true); }
      }, 1000);
    }
  }

  function drawQuiz() {
    const s = session, it = s.items[s.idx], q = qMap[it.id], c = chMap[q.ch];
    const pick = s.picks[s.idx];
    const revealed = s.kind === 'practice' && pick !== undefined;
    const star = Store.get().stars[q.id];
    const answeredN = Object.keys(s.picks).length;
    const last = s.idx === s.items.length - 1;
    const okN = s.items.filter((x, i) => isRight(x, s.picks[i])).length;
    const opts = it.perm.map((oi, k) => {
      let cls = '';
      if (revealed) { if (oi === q.a) cls = 'right'; else if (k === pick) cls = 'wrong'; }
      else if (k === pick) cls = 'sel';
      return `<button class="opt ${cls}" data-act="pick" data-k="${k}" type="button" ${revealed ? 'disabled' : ''}><span class="key">${LETTERS[k]}</span><span>${esc(q.opts[oi])}</span></button>`;
    }).join('');
    const ok = revealed && it.perm[pick] === q.a;
    let nextBtn = '';
    if (s.kind === 'exam') nextBtn = last ? '<button class="btn accent" data-act="submit" type="button">交卷</button>' : '<button class="btn" data-act="next" type="button">下一題</button>';
    else if (!last) nextBtn = `<button class="btn ${revealed ? '' : 'outline'}" data-act="next" type="button">${revealed ? '下一題' : '略過'}</button>`;
    else nextBtn = `<button class="btn accent" data-act="finish" type="button">${revealed ? '查看結果' : '結束練習'}</button>`;

    const main = `
      <div class="quiz-top">
        <span class="num">${pad(s.idx + 1)} / ${pad(s.items.length)}</span>
        <div class="bar"><span style="width:${pct(s.kind === 'exam' ? answeredN : s.idx + (revealed ? 1 : 0), s.items.length)}%"></span></div>
        ${s.kind === 'exam' ? `<span class="timer" id="timer">剩餘 ${fmt(s.limit - (Date.now() - s.start) / 1000)}</span>` : `<span>答對 <b class="num" style="color:var(--ok)">${okN}</b></span>`}
      </div>
      <div class="q-card">
        <div class="q-meta"><span class="q-no">第 ${s.idx + 1} 題</span><span>·</span><span>第 ${chNo(c)} 章 ${esc(c.title)}</span>
          <button class="star-btn ${star ? 'on' : ''}" data-act="star" data-id="${q.id}" type="button">${star ? '已收藏' : '收藏'}</button></div>
        <div class="q-text">${esc(q.q)}</div>${codeBlock(q)}
        <div class="opts">${opts}</div>
        ${revealed ? `<div class="explain ${ok ? 'ok' : 'bad'}"><div class="verdict">${ok ? '答對' : '答錯，正確答案為 ' + LETTERS[it.perm.indexOf(q.a)]}</div><div>${esc(q.exp)}</div>
          <div class="small" style="margin-top:8px"><a href="#/ch/${c.id}">回到第 ${chNo(c)} 章複習</a></div></div>` : ''}
        <div class="quiz-actions">
          <button class="btn outline" data-act="prev" type="button" ${s.idx === 0 ? 'disabled' : ''}>上一題</button>
          ${nextBtn}
        </div>
      </div>
      <p class="kbd-hint">鍵盤操作：A–D 或 1–4 作答，Enter 或 → 下一題，← 上一題</p>`;

    if (s.kind === 'exam') {
      view.innerHTML = `<div class="exam-layout"><div>${main}</div>
        <aside class="exam-side"><div class="panel">
          <div class="panel-title"><h3>答題卡</h3><span class="small muted num">${answeredN} / ${s.items.length}</span></div>
          <div class="qnav">${s.items.map((x, i) => `<button type="button" data-act="goto" data-i="${i}" class="${s.picks[i] !== undefined ? 'ans' : ''} ${i === s.idx ? 'cur' : ''}">${i + 1}</button>`).join('')}</div>
          <button class="btn accent" style="width:100%;margin-top:16px" data-act="submit" type="button">交卷</button>
          <button class="btn outline sm" style="width:100%;margin-top:8px" data-act="quit" type="button">放棄本次測驗</button>
        </div></aside></div>`;
    } else {
      view.innerHTML = `<div class="quiz-wrap">${main}</div>`;
    }
  }

  function pickOption(k) {
    const s = session; if (!s || s.done) return;
    const it = s.items[s.idx], q = qMap[it.id];
    if (s.kind === 'practice') {
      if (s.picks[s.idx] !== undefined) return;
      s.picks[s.idx] = k;
      const ok = it.perm[k] === q.a;
      Store.answer(q.id, ok);
      if (ok && s.fromWrong) Store.clearWrong(q.id);
    } else s.picks[s.idx] = k;
    drawQuiz();
  }
  function move(d) {
    const s = session; if (!s) return;
    const n = s.idx + d;
    if (n < 0 || n >= s.items.length) return;
    s.idx = n; drawQuiz(); window.scrollTo(0, 0);
  }
  function finishPractice() {
    const s = session;
    const ans = s.items.filter((_, i) => s.picks[i] !== undefined).length;
    const ok = s.items.filter((it, i) => isRight(it, s.picks[i])).length;
    s.result = { score: pct(ok, s.items.length), ok, total: s.items.length, answered: ans, secs: (Date.now() - s.start) / 1000 };
    s.done = true;
    location.hash = '#/result';
  }
  function submitExam(force) {
    const s = session; if (!s || s.done) return;
    const unanswered = s.items.length - Object.keys(s.picks).length;
    if (!force && unanswered > 0 && !confirm(`尚有 ${unanswered} 題未作答，確定要交卷嗎？`)) return;
    stopTimer();
    let ok = 0;
    s.items.forEach((it, i) => { const r = isRight(it, s.picks[i]); if (r) ok++; Store.answer(it.id, r); });
    const score = pct(ok, s.items.length);
    s.result = { score, ok, total: s.items.length, answered: s.items.length - unanswered, secs: Math.min(s.limit, (Date.now() - s.start) / 1000) };
    s.done = true;
    Store.addExam({ at: Date.now(), title: s.title, subject: s.subject, score, ok, total: s.items.length, secs: Math.round(s.result.secs) });
    location.hash = '#/result';
  }

  function result() {
    const s = session;
    if (!s || !s.result) { location.hash = '#/practice'; return; }
    setNav(s.kind === 'exam' ? 'exam' : 'practice'); crumb(s.kind === 'exam' ? W.exam : '題庫練習', '測驗結果');
    const r = s.result, pass = r.score >= 70;
    const byCh = {};
    s.items.forEach((it, i) => { const b = byCh[qMap[it.id].ch] || (byCh[qMap[it.id].ch] = { ok: 0, n: 0 }); b.n++; if (isRight(it, s.picks[i])) b.ok++; });
    const wrongList = s.items.map((it, i) => ({ it, i, q: qMap[it.id], p: s.picks[i] })).filter(x => !isRight(x.it, x.p));
    const weak = Object.entries(byCh).filter(([, b]) => b.ok / b.n < 0.7).map(([k]) => chMap[k]).sort((a, b) => a.id.localeCompare(b.id));
    const verdict = s.kind === 'exam'
      ? (pass ? '已達 70 分，維持目前節奏並持續練習弱項。' : r.score >= 60 ? '接近通過標準，建議針對下列章節加強後再測一次。' : '建議先回到講義補強觀念，再進行下一次' + W.exam + '。')
      : (pass ? '本次練習表現良好。' : '答錯的題目已加入錯題本，建議複習相關章節後重練。');
    view.innerHTML = `
      <header class="result-head">
        <div class="result-score ${pass ? 'pass' : 'fail'}">${r.score}<small>分</small></div>
        <div>
          <div class="overline">${esc(s.title)}</div>
          <h1 style="font-size:1.5rem;margin-bottom:6px">${s.kind === 'exam' ? W.exam + (pass ? '達標' : '未達標') : '練習完成'}</h1>
          <p class="muted" style="margin-bottom:12px">${verdict}</p>
          <div class="small muted">答對 <b class="num" style="color:var(--ink)">${r.ok}</b> / ${r.total} 題　作答 ${r.answered} 題　用時 <span class="num">${fmt(r.secs)}</span></div>
          <div class="row" style="margin-top:16px">
            <button class="btn" data-act="retry" type="button">再做一次</button>
            ${wrongList.length ? `<button class="btn outline" data-act="retry-wrong" type="button">只重做答錯的 ${wrongList.length} 題</button>` : ''}
            <a class="btn outline" href="#/wrong">錯題與收藏</a>
          </div>
        </div>
      </header>
      <section class="section grid g2">
        <div><h3>各章答對率</h3>
          <div class="bars">${Object.entries(byCh).sort().map(([k, b]) => `<div class="bar-row"><a href="#/ch/${k}">${pad(chNo(chMap[k]))}　${esc(chMap[k].title)}</a><div class="bar ${b.ok / b.n >= .7 ? 'ok' : ''}"><span style="width:${pct(b.ok, b.n)}%"></span></div><span class="num">${b.ok}/${b.n}</span></div>`).join('')}</div>
        </div>
        <div><h3>學習建議</h3>
          ${weak.length ? `<p class="small">下列章節答對率低於 70%，建議優先複習：</p><ol class="small">${weak.map(c => `<li><a href="#/ch/${c.id}">第 ${chNo(c)} 章 ${esc(c.title)}</a></li>`).join('')}</ol>` : '<p class="small">各章答對率皆達 70% 以上。可進行完整模擬考，或至考前重點複習口訣與數字。</p>'}
          <p class="small muted">答錯的題目已自動收入錯題本，於錯題重練答對後移除。</p>
        </div>
      </section>
      ${wrongList.length ? `<section class="section"><div class="section-head"><h2>錯題檢討</h2><span class="aside">${wrongList.length} 題</span></div>
        ${wrongList.map(x => reviewItem(x.q, x.p === undefined ? null : x.it.perm[x.p], x.i + 1)).join('')}</section>` : ''}`;
  }
  function reviewItem(q, chosen, n) {
    const c = chMap[q.ch];
    return `<div class="review">
      <div class="q-meta">${n ? `<span class="q-no">第 ${n} 題</span><span>·</span>` : ''}<span>第 ${chNo(c)} 章 ${esc(c.title)}</span></div>
      <div class="q-text">${esc(q.q)}</div>${codeBlock(q)}
      ${chosen !== null && chosen !== undefined ? `<div class="ans-line mine">你的答案：${esc(q.opts[chosen])}</div>` : '<div class="ans-line mine">未作答</div>'}
      <div class="ans-line right">正確答案：${esc(q.opts[q.a])}</div>
      <div class="explain" style="margin-top:10px">${esc(q.exp)}</div>
    </div>`;
  }

  /* ---------- 題庫練習 ---------- */
  function practice() {
    setNav('practice'); crumb('題庫練習');
    const S = Store.get();
    const wrongN = Q.filter(q => S.wrong[q.id]).length, starN = Q.filter(q => S.stars[q.id]).length, unseen = Q.filter(q => !S.qs[q.id]).length;
    const modes = [
      ['quick', '隨機 10 題', '全範圍隨機抽題，適合零碎時間複習。', `${Q.length} 題題庫`],
      ['new', '未練習題目', '從尚未作答過的題目中抽 20 題。', `剩餘 ${unseen} 題`],
      ['weak', '弱點加強', '依答對率由低至高，優先從弱項章節出 20 題。', ''],
      ['wrong', '錯題重練', '重新作答錯題本中的題目，答對即移出。', `${wrongN} 題`],
      ['star', '收藏題目', '練習作答時收藏的題目。', `${starN} 題`]
    ];
    view.innerHTML = `
      <header class="page-head">
        <div class="overline">${esc(LV.title)}</div>
        <h1>題庫練習</h1>
        <p class="lead">練習模式於每題作答後立即顯示解析。選項順序每次隨機排列，避免記憶答案位置。</p>
      </header>
      ${session && !session.done ? `<div class="notice">尚有進行中的測驗「${esc(session.title)}」，目前在第 ${session.idx + 1} 題。<a href="#/quiz">繼續作答</a></div>` : ''}
      <div class="mode-list">
        ${modes.map(m => `<div class="mode-row"><div><h3>${m[1]}</h3><p>${m[2]}</p></div><span class="count">${m[3]}</span><button class="btn outline sm" data-act="mode" data-m="${m[0]}" type="button">開始</button></div>`).join('')}
      </div>

      <section class="section">
        <div class="section-head"><h2>自選章節</h2>
          <div class="row">${SK.map(s => `<button class="btn outline sm" data-act="sel" data-s="${s}" type="button">選取${SUBJ[s].name}</button>`).join('')}<button class="btn outline sm" data-act="sel" data-s="0" type="button">清除</button></div></div>
        <div class="table-wrap"><table class="tbl chk-table" id="chkList">
          <tr><th></th><th>章節</th><th>科目</th><th>題數</th><th>答對率</th></tr>
          ${CH.map(c => { const x = chStat(c.id); return `<tr><td><input type="checkbox" id="ck-${c.id}" value="${c.id}" data-s="${c.subject}"></td><td><label for="ck-${c.id}"><span class="mono muted">${pad(chNo(c))}</span>　${esc(c.title)}</label></td><td class="small muted">${SUBJ[c.subject].name}</td><td class="num">${x.total}</td><td class="num">${x.ans ? x.acc + '%' : '—'}</td></tr>`; }).join('')}
        </table></div>
        <div class="row">
          <label class="row small">題數
            <select class="input" id="pCount" style="width:auto"><option value="10">10 題</option><option value="20" selected>20 題</option><option value="30">30 題</option><option value="999">全部</option></select></label>
          <span class="spacer"></span>
          <button class="btn accent" data-act="custom" type="button">開始練習</button>
        </div>
      </section>`;
  }
  function practiceMode(m) {
    const S = Store.get();
    if (m === 'quick') return startPractice(shuffle(Q).slice(0, 10), '隨機 10 題');
    if (m === 'new') return startPractice(shuffle(Q.filter(q => !S.qs[q.id])).slice(0, 20), '未練習題目');
    if (m === 'wrong') return startPractice(shuffle(Q.filter(q => S.wrong[q.id])), '錯題重練', { fromWrong: true });
    if (m === 'star') return startPractice(shuffle(Q.filter(q => S.stars[q.id])), '收藏題目');
    if (m === 'weak') {
      const order = CH.map(c => ({ c, x: chStat(c.id) })).sort((a, b) => (a.x.ans ? a.x.acc : 50) - (b.x.ans ? b.x.acc : 50));
      let list = [];
      for (const o of order) { list = list.concat(shuffle(Q.filter(q => q.ch === o.c.id && !(S.qs[q.id] && S.qs[q.id].last)))); if (list.length >= 20) break; }
      return startPractice(list.slice(0, 20), '弱點加強');
    }
  }

  /* ---------- 模擬考 ---------- */
  function exam() {
    setNav('exam'); crumb(W.exam);
    if (session && !session.done && session.kind === 'exam') { location.hash = '#/quiz'; return; }
    const ex = Store.get().exams, F = LV.exam.full, K = LV.exam.quick;
    view.innerHTML = `
      <header class="page-head">
        <div class="overline">${esc(LV.title)}</div>
        <h1>${W.exam}</h1>
        <p class="lead">作答過程不顯示答案，可透過答題卡跳題，交卷後公布分數、各章答對率與詳解。題目由各章平均抽出。</p>
      </header>
      <div class="table-wrap"><table class="tbl">
        <tr><th>科目</th><th>範圍</th><th>完整模擬</th><th>快速測驗</th></tr>
        ${SK.map(String).concat(MIXES.map(m => m.s)).map(key => {
          const mix = MIXES.find(m => m.s === key), chs = CH.filter(c => subjOf(key).includes(c.subject));
          return `<tr><td><b>${mix ? esc(mix.label) : SUBJ[key].name}</b></td><td>${mix ? esc(mix.title) : esc(SUBJ[key].title)}<div class="tiny muted">第 ${chNo(chs[0])}–${chNo(chs[chs.length - 1])} 章・題庫 ${qOfCh(chs.map(c => c.id)).length} 題</div></td>
            <td><button class="btn sm" data-act="exam" data-s="${key}" data-n="${F.n}" data-t="${F.min}" type="button">${F.n} 題・${F.min} 分鐘</button></td>
            <td><button class="btn outline sm" data-act="exam" data-s="${key}" data-n="${K.n}" data-t="${K.min}" type="button">${K.n} 題・${K.min} 分鐘</button></td></tr>`;
        }).join('')}
      </table></div>
      <div class="box tip">${W.examTip}</div>
      <section class="section">
        <div class="section-head"><h2>歷次成績</h2><span class="aside">保留最近 30 次</span></div>
        ${ex.length ? `<div class="table-wrap"><table class="tbl">
          <tr><th>日期</th><th>測驗</th><th>分數</th><th>答對</th><th>用時</th></tr>
          ${ex.map(e => `<tr><td class="num small">${new Date(e.at).toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })}</td><td>${esc(e.title)}</td><td><span class="tag ${e.score >= 70 ? 'ok' : e.score >= 60 ? 'warn' : 'bad'}">${e.score}</span></td><td class="num">${e.ok}/${e.total}</td><td class="num">${fmt(e.secs)}</td></tr>`).join('')}
        </table></div>` : `<div class="empty"><p>尚無${W.exam}紀錄。</p></div>`}
      </section>`;
  }
  function launchExam(s, n, t) {
    s = String(s);
    const subs = subjOf(s), mix = MIXES.find(m => m.s === s);
    const chs = CH.filter(c => subs.includes(c.subject)).map(c => c.id);
    const per = {}; chs.forEach(id => per[id] = shuffle(Q.filter(q => q.ch === id)));
    const list = [];
    while (list.length < n && chs.some(id => per[id].length)) {
      for (const id of shuffle(chs)) if (per[id].length && list.length < n) list.push(per[id].pop());
    }
    const name = mix ? (s === '0' ? '綜合' + W.exam : mix.label + W.exam) : SUBJ[s].name + ' ' + SUBJ[s].title;
    startExam(shuffle(list), `${name}（${n} 題）`, t, s);
  }

  /* ---------- 錯題與收藏 ---------- */
  function wrong([tab]) {
    setNav('wrong'); crumb('錯題與收藏');
    tab = tab === 'star' ? 'star' : 'wrong';
    const S = Store.get(), src = tab === 'star' ? S.stars : S.wrong;
    const list = Q.filter(q => src[q.id]).sort((a, b) => src[b.id] - src[a.id]);
    view.innerHTML = `
      <header class="page-head">
        <div class="overline">${esc(LV.title)}</div>
        <h1>錯題與收藏</h1>
        <p class="lead">${tab === 'star' ? '作答時點選「收藏」即可將題目加入此處。' : '答錯的題目會自動收入錯題本，於錯題重練中答對後移除。'}</p>
      </header>
      <div class="row" style="margin-bottom:20px">
        <div class="tabs"><button type="button" class="${tab === 'wrong' ? 'on' : ''}" data-act="go" data-href="#/wrong">錯題本（${Q.filter(q => S.wrong[q.id]).length}）</button><button type="button" class="${tab === 'star' ? 'on' : ''}" data-act="go" data-href="#/wrong/star">收藏（${Q.filter(q => S.stars[q.id]).length}）</button></div>
        <span class="spacer"></span>
        ${list.length ? `<button class="btn accent sm" data-act="mode" data-m="${tab}" type="button">全部重練（${list.length} 題）</button>` : ''}
      </div>
      ${list.length ? list.map(q => {
        const st = S.qs[q.id], c = chMap[q.ch];
        return `<div class="review">
          <div class="q-meta"><span>第 ${chNo(c)} 章 ${esc(c.title)}</span>${st ? `<span>·</span><span>答對 ${st.c} 次，答錯 ${st.w} 次</span>` : ''}
            <button class="star-btn" data-act="${tab === 'star' ? 'unstar' : 'unwrong'}" data-id="${q.id}" type="button">${tab === 'star' ? '取消收藏' : '已掌握，移除'}</button></div>
          <div class="q-text">${esc(q.q)}</div>${codeBlock(q)}
          <details><summary class="small" style="color:var(--accent)">顯示答案與解析</summary>
            <div class="ans-line right" style="margin-top:8px">正確答案：${esc(q.opts[q.a])}</div>
            <div class="explain" style="margin-top:8px">${esc(q.exp)}</div></details>
        </div>`;
      }).join('') : `<div class="empty"><p>${tab === 'star' ? '目前沒有收藏的題目。' : '目前沒有錯題。'}</p><a class="btn" href="#/practice">前往練習</a></div>`}`;
  }

  /* ---------- 名詞記憶卡 ---------- */
  let deck = null;
  function cards([chId]) {
    setNav('cards'); crumb('名詞記憶卡');
    const key = chId || 'all';
    if (!deck || deck.key !== key) {
      const base = chId === 'todo' ? GL.filter(g => Store.get().cards[g.term] !== 1) : chId && chMap[chId] ? GL.filter(g => g.ch === chId) : GL;
      deck = { key, list: shuffle(base), i: 0, flip: false };
    }
    drawCards();
  }
  function drawCards() {
    const S = Store.get();
    const known = GL.filter(g => S.cards[g.term] === 1).length;
    const g = deck.list[deck.i];
    const opts = `<option value="all">全部名詞（${GL.length}）</option><option value="todo">尚未記住（${GL.length - known}）</option>` +
      CH.map(c => `<option value="${c.id}">第 ${chNo(c)} 章 ${esc(c.title)}（${GL.filter(x => x.ch === c.id).length}）</option>`).join('');
    view.innerHTML = `
      <header class="page-head">
        <div class="overline">${esc(LV.title)}</div>
        <h1>名詞記憶卡</h1>
        <p class="lead">先看名詞回想定義，再翻面確認。已記住 ${known} / ${GL.length} 個名詞。</p>
      </header>
      <div class="flash-stage">
        <div class="row" style="margin-bottom:12px"><select class="input" id="deckSel">${opts}</select></div>
        <div class="bar ok" style="margin-bottom:20px"><span style="width:${pct(known, GL.length)}%"></span></div>
        ${g ? `
        <div class="flash ${deck.flip ? 'flip' : ''}" id="flash" role="button" tabindex="0" aria-label="翻轉卡片">
          <div class="face front"><div class="corner"><span class="num">${deck.i + 1} / ${deck.list.length}</span><span>第 ${chNo(chMap[g.ch])} 章</span></div>
            <div class="term">${esc(g.term)}</div><div class="en">${esc(g.en)}</div>${g.abbr ? `<div class="abbr">縮寫　${esc(g.abbr)}</div>` : ''}<div class="hint">點擊卡片或按空白鍵翻面</div></div>
          <div class="face back"><div class="corner"><span class="num">${deck.i + 1} / ${deck.list.length}</span><span>${S.cards[g.term] === 1 ? '已記住' : ''}</span></div>
            <h3>${esc(g.term)}</h3><div class="en-full">${esc(g.en)}${g.abbr ? `（${esc(g.abbr)}）` : ''}</div><div class="def">${esc(g.def)}</div>
            <a class="small" style="margin-top:16px" href="#/ch/${g.ch}">前往第 ${chNo(chMap[g.ch])} 章 ${esc(chMap[g.ch].title)}</a></div>
        </div>
        <div class="flash-actions">
          <button class="btn outline" data-act="card-prev" type="button">上一張</button>
          <button class="btn outline" data-act="card-mark" data-v="0" type="button">需要再複習</button>
          <button class="btn" data-act="card-mark" data-v="1" type="button">已記住</button>
          <button class="btn outline" data-act="card-next" type="button">下一張</button>
        </div>
        <p class="center" style="margin-top:14px"><button class="link-btn" data-act="card-shuffle" type="button">重新洗牌</button></p>`
        : '<div class="empty"><p>這一組名詞都已記住。</p></div>'}
      </div>`;
    $('#deckSel').value = deck.key;
  }
  function cardStep(d) { if (!deck.list.length) return; deck.i = (deck.i + d + deck.list.length) % deck.list.length; deck.flip = false; drawCards(); }

  /* ---------- 名詞速查 ---------- */
  function glossary() {
    setNav('glossary'); crumb('名詞速查');
    view.innerHTML = `
      <header class="page-head">
        <div class="overline">${esc(LV.title)}</div>
        <h1>名詞速查</h1>
        <p class="lead">收錄 ${GL.length} 個${W.terms}，可用中文、英文或縮寫搜尋。</p>
      </header>
      <div class="gl-tools">
        <input class="input" id="glQ" type="search" placeholder="輸入關鍵字，例如 RPO、雜湊、零信任">
        <select class="input" id="glCh"><option value="">全部章節</option>${CH.map(c => `<option value="${c.id}">第 ${chNo(c)} 章 ${esc(c.title)}</option>`).join('')}</select>
      </div>
      <p class="small muted" id="glCount"></p>
      <div class="gl-list" id="glList"></div>`;
    const draw = () => {
      const k = $('#glQ').value.trim().toLowerCase(), ch = $('#glCh').value;
      const list = GL.filter(g => (!ch || g.ch === ch) && (!k || (g.term + g.en + g.abbr + g.def).toLowerCase().includes(k)));
      $('#glCount').textContent = `共 ${list.length} 筆`;
      $('#glList').innerHTML = list.length ? list.map(g => `<div class="gl-row"><h4>${esc(g.term)}<span class="en">${esc(g.en)}</span>${g.abbr ? `<span class="en abbr">縮寫 ${esc(g.abbr)}</span>` : ''}</h4><p>${esc(g.def)}</p><a href="#/ch/${g.ch}">第 ${chNo(chMap[g.ch])} 章 ${esc(chMap[g.ch].title)}</a></div>`).join('')
        : '<div class="empty" style="margin-top:16px"><p>找不到相關名詞。</p></div>';
    };
    $('#glQ').addEventListener('input', draw);
    $('#glCh').addEventListener('change', draw);
    draw();
  }

  /* ---------- 互動練習 ---------- */
  function tools([id]) {
    setNav('tools'); crumb('互動練習');
    view.innerHTML = `
      <header class="page-head">
        <div class="overline">${esc(LV.title)}</div>
        <h1>互動練習</h1>
        <p class="lead">透過實際操作理解抽象觀念。所有運算都在瀏覽器內完成，不會傳送任何資料。</p>
      </header>
      <div class="grid g2">
        ${TOOLS.map(t => `<div class="panel tool" id="tool-${t.id}">
          <div class="panel-title"><h3>${esc(t.name)}</h3>${chMap[t.ch] ? `<a class="tiny" href="#/ch/${t.ch}">第 ${chNo(chMap[t.ch])} 章</a>` : ''}</div>
          <p class="small muted" style="margin:0">${esc(t.desc)}</p>
          <div class="tool-body">${Tools.render(t.id)}</div>
        </div>`).join('')}
      </div>`;
    TOOLS.forEach(t => Tools.bind(t.id, $('#tool-' + t.id + ' .tool-body')));
    if (id && $('#tool-' + id)) setTimeout(() => $('#tool-' + id).scrollIntoView({ behavior: 'smooth' }), 50);
  }

  /* ---------- 考前重點 ---------- */
  /* ---------- 教學影片 ---------- */
  function videos([filter]) {
    setNav('videos'); crumb('教學影片');
    const groups = CH.filter(c => c.videos.length);
    view.innerHTML = `
      <header class="page-head">
        <div class="overline">${esc(LV.title)}</div>
        <h1>教學影片</h1>
        <p class="lead">依章節整理的外部公開教學影片，共 ${videoCount} 支。建議先讀完該章講義，再以影片補充理解；影片內容觀點屬原作者，${W.videoNote}。</p>
      </header>
      ${REVIEW.length ? `<section>
        <div class="section-head"><h2>${W.review}</h2><span class="aside">${REVIEW.length} 支</span></div>
        <div class="video-grid">${REVIEW.map(videoCard).join('')}</div>
      </section>` : ''}
      ${SK.map(s => {
        const gs = groups.filter(c => c.subject === s);
        return gs.length ? `<section class="section">
          <div class="section-head"><h2>${SUBJ[s].name}｜${esc(SUBJ[s].title)}</h2></div>
          ${gs.map(c => `<div class="video-group">
            <h3><a href="#/ch/${c.id}"><span class="mono muted">${pad(chNo(c))}</span>　${esc(c.title)}</a></h3>
            <div class="video-grid">${c.videos.map(videoCard).join('')}</div>
          </div>`).join('')}
        </section>` : '';
      }).join('')}`;
  }

  function sprint() {
    setNav('sprint'); crumb(W.sprint);
    const S = Store.get();
    view.innerHTML = `
      <header class="page-head">
        <div class="overline">${esc(LV.title)}</div>
        <h1>${W.sprint}</h1>
        <p class="lead">${W.sprintLead}</p>
      </header>
      <div class="grid g2">
        ${REVIEW.length ? `<div style="grid-column:1/-1"><div class="section-head"><h2>總複習影片</h2><a class="aside" href="#/videos">所有教學影片</a></div><div class="video-grid">${REVIEW.map(videoCard).join('')}</div></div>` : ''}
        <div><h2>${W.mnemonics}</h2>
          <table class="tbl">${LV.mnemonics.map(m => `<tr><td style="white-space:nowrap;width:1%"><b>${esc(m[0])}</b></td><td>${esc(m[1])}</td></tr>`).join('')}</table></div>
        <div><h2>${W.numbers}</h2>
          <table class="tbl">${LV.numbers.map(m => `<tr><td style="white-space:nowrap;width:1%" class="mono"><b>${esc(m[0])}</b></td><td>${esc(m[1])}</td></tr>`).join('')}</table></div>
      </div>
      <section class="section">
        <div class="section-head"><h2>${W.checklist}</h2><span class="aside num">${LV.checklist.filter((_, i) => S.check['k' + i]).length} / ${LV.checklist.length}</span></div>
        <div class="checklist">${LV.checklist.map((t, i) => `<label><input type="checkbox" data-act="check" data-k="k${i}" ${S.check['k' + i] ? 'checked' : ''}><span>${esc(t)}</span></label>`).join('')}</div>
      </section>
      <section class="section">
        <div class="section-head"><h2>各章重點</h2><button class="btn outline sm" data-act="print" type="button">列印</button></div>
        <div class="sprint-cols">
          ${CH.map(c => `<div class="sp-item"><h3><span class="mono muted" style="font-size:.85rem">${pad(chNo(c))}</span>　${esc(c.title)}</h3><ol>${c.keypoints.map(k => `<li>${esc(k)}</li>`).join('')}</ol></div>`).join('')}
        </div>
      </section>
      <section class="section panel">
        <div class="panel-title"><h3>學習資料管理</h3></div>
        <p class="small muted">學習進度僅儲存在這台裝置的瀏覽器。更換裝置前可先匯出，再於新裝置匯入。</p>
        <div class="row"><button class="btn outline sm" data-act="export" type="button">匯出進度</button>
          <label class="btn outline sm">匯入進度<input type="file" accept="application/json" id="importFile" hidden></label>
          <button class="btn outline sm danger" data-act="reset" type="button">清除所有進度</button></div>
      </section>`;
    $('#importFile').addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(t => { try { Store.importJSON(t); toast('已匯入學習進度'); router(); } catch (err) { toast('檔案格式不正確'); } });
    });
  }

  /* ---------- 搜尋 ---------- */
  const searchModal = $('#searchModal'), searchInput = $('#searchInput'), searchResults = $('#searchResults');
  const strip = h => h.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ');
  const INDEX = [];
  CH.forEach(c => c.sections.forEach((s, i) => INDEX.push({ t: `${chNo(c)}.${i + 1} ${s.title}`, sub: `第 ${chNo(c)} 章 ${c.title}`, text: (s.title + ' ' + strip(s.html)).toLowerCase(), href: `#/ch/${c.id}`, scroll: 's-' + s.id })));
  function openSearch() { searchModal.hidden = false; searchInput.value = ''; searchResults.innerHTML = '<div class="grp">輸入關鍵字開始搜尋</div>'; setTimeout(() => searchInput.focus(), 10); }
  function closeSearch() { searchModal.hidden = true; }
  searchInput.addEventListener('input', () => {
    const k = searchInput.value.trim().toLowerCase();
    if (!k) { searchResults.innerHTML = ''; return; }
    const snip = x => { const i = x.text.indexOf(k); return i < 0 ? '' : '…' + esc(x.text.slice(Math.max(0, i - 18), i + 42)) + '…'; };
    const secs = INDEX.filter(x => x.text.includes(k)).slice(0, 8);
    const gls = GL.filter(g => (g.term + g.en + g.abbr + g.def).toLowerCase().includes(k)).slice(0, 6);
    const qs = Q.filter(q => (q.q + q.exp).toLowerCase().includes(k)).slice(0, 5);
    const grp = (name, arr) => arr.length ? `<div class="grp">${name}</div>` + arr.join('') : '';
    searchResults.innerHTML =
      grp('課程內容', secs.map(x => `<a href="${x.href}" data-scroll-after="${x.scroll}"><b>${esc(x.t)}</b><small>${esc(x.sub)}　${snip(x)}</small></a>`)) +
      grp('名詞', gls.map(g => `<a href="#/glossary" data-gl="${esc(g.term)}"><b>${esc(g.term)}</b>　<span class="mono small muted">${esc(g.en)}</span><small>${esc(g.def)}</small></a>`)) +
      grp('題目', qs.map(q => `<a href="#/ch/${q.ch}"><b>${esc(q.q)}</b><small>答案：${esc(q.opts[q.a])}</small></a>`)) ||
      '<div class="grp">找不到結果</div>';
  });
  searchResults.addEventListener('click', e => {
    const a = e.target.closest('a'); if (!a) return;
    const sc = a.dataset.scrollAfter, gl = a.dataset.gl;
    closeSearch();
    setTimeout(() => {
      if (sc && $('#' + sc)) $('#' + sc).scrollIntoView({ behavior: 'smooth' });
      if (gl && $('#glQ')) { $('#glQ').value = gl; $('#glQ').dispatchEvent(new Event('input')); }
    }, 120);
  });
  searchModal.addEventListener('click', e => { if (e.target === searchModal) closeSearch(); });
  $('#searchBtn').addEventListener('click', openSearch);

  /* ---------- 選單與主題 ---------- */
  function closeMenu() { $('#sidebar').classList.remove('open'); $('#overlay').classList.remove('show'); }
  $('#menuBtn').addEventListener('click', () => { $('#sidebar').classList.add('open'); $('#overlay').classList.add('show'); });
  $('#overlay').addEventListener('click', closeMenu);
  const prefersDark = () => matchMedia('(prefers-color-scheme: dark)').matches;
  function applyTheme() {
    const t = Store.getTheme();
    if (t) document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme');
    $('#themeBtn').textContent = (t ? t === 'dark' : prefersDark()) ? '切換淺色模式' : '切換深色模式';
  }
  $('#themeBtn').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || (prefersDark() ? 'dark' : 'light');
    Store.setTheme(cur === 'dark' ? 'light' : 'dark'); applyTheme();
  });

  /* ---------- 事件委派 ---------- */
  document.addEventListener('click', e => {
    const sc = e.target.closest('[data-scroll]');
    if (sc) { e.preventDefault(); const t = $('#' + sc.dataset.scroll); if (t) t.scrollIntoView({ behavior: 'smooth' }); return; }
    if (e.target.closest('#flash') && !e.target.closest('a')) { deck.flip = !deck.flip; $('#flash').classList.toggle('flip', deck.flip); return; }
    const b = e.target.closest('[data-act]'); if (!b) return;
    switch (b.dataset.act) {
      case 'play-video': {
        if (!/^[\w-]{6,20}$/.test(b.dataset.yt)) break;
        const f = document.createElement('iframe');
        f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1`;
        f.title = b.dataset.title; f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true;
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        b.replaceWith(f); break;
      }
      case 'pick': pickOption(+b.dataset.k); break;
      case 'next': move(1); break;
      case 'prev': move(-1); break;
      case 'goto': session.idx = +b.dataset.i; drawQuiz(); break;
      case 'submit': submitExam(); break;
      case 'finish': finishPractice(); break;
      case 'quit': if (confirm('確定放棄本次測驗？作答紀錄不會保存。')) { stopTimer(); session = null; location.hash = '#/exam'; } break;
      case 'star': { const on = Store.toggleStar(b.dataset.id); b.classList.toggle('on', on); b.textContent = on ? '已收藏' : '收藏'; toast(on ? '已加入收藏' : '已取消收藏'); break; }
      case 'toggle-done': { const on = !Store.get().done[b.dataset.id]; Store.markDone(b.dataset.id, on); toast(on ? '已標記本章完成' : '已取消完成標記'); b.textContent = on ? '取消完成標記' : '標記為已完成'; refreshStreak(); break; }
      case 'ch-quiz': startPractice(shuffle(Q.filter(q => q.ch === b.dataset.id)), `第 ${chNo(chMap[b.dataset.id])} 章練習`); break;
      case 'mode': practiceMode(b.dataset.m); break;
      case 'sel': $$('#chkList input').forEach(i => { i.checked = b.dataset.s !== '0' && i.dataset.s === b.dataset.s; }); break;
      case 'custom': {
        const ids = $$('#chkList input:checked').map(i => i.value);
        if (!ids.length) { toast('請先勾選章節'); break; }
        startPractice(shuffle(qOfCh(ids)).slice(0, +$('#pCount').value), ids.length === 1 ? `第 ${chNo(chMap[ids[0]])} 章練習` : `自選 ${ids.length} 章練習`);
        break;
      }
      case 'exam': launchExam(b.dataset.s, +b.dataset.n, +b.dataset.t); break;
      case 'retry': {
        const s = session;
        if (s.kind === 'exam') launchExam(s.subject, s.items.length, Math.round(s.limit / 60));
        else startPractice(shuffle(s.items.map(x => qMap[x.id])), s.title, { fromWrong: s.fromWrong });
        break;
      }
      case 'retry-wrong': {
        const s = session;
        startPractice(s.items.filter((it, i) => !isRight(it, s.picks[i])).map(it => qMap[it.id]), '重做答錯題目', { fromWrong: true });
        break;
      }
      case 'unwrong': Store.clearWrong(b.dataset.id); wrong([]); toast('已從錯題本移除'); break;
      case 'unstar': Store.toggleStar(b.dataset.id); wrong(['star']); break;
      case 'go': location.hash = b.dataset.href; break;
      case 'card-next': cardStep(1); break;
      case 'card-prev': cardStep(-1); break;
      case 'card-mark': Store.setCard(deck.list[deck.i].term, +b.dataset.v); toast(+b.dataset.v ? '已標記為記住' : '已加入待複習'); cardStep(1); refreshStreak(); break;
      case 'card-shuffle': deck.list = shuffle(deck.list); deck.i = 0; deck.flip = false; drawCards(); break;
      case 'check': Store.setCheck(b.dataset.k, b.checked); break;
      case 'print': window.print(); break;
      case 'export': {
        const blob = new Blob([Store.exportJSON()], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `secpath-${LV.id}-progress.json`; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000); break;
      }
      case 'reset': if (confirm('確定清除所有學習進度、錯題與成績？此動作無法復原。')) { Store.reset(); session = null; deck = null; toast('已清除學習進度'); router(); } break;
    }
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'deckSel') { deck = null; location.hash = '#/cards' + (e.target.value === 'all' ? '' : '/' + e.target.value); }
  });
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, select')) { if (e.key === 'Escape') closeSearch(); return; }
    if (e.key === '/') { e.preventDefault(); openSearch(); return; }
    if (e.key === 'Escape') { closeSearch(); closeMenu(); return; }
    const route = location.hash.replace(/^#\/?/, '').split('/')[0];
    if (route === 'quiz' && session && !session.done) {
      const k = e.key.toUpperCase();
      const n = k.length === 1 ? ('1234'.includes(k) ? '1234'.indexOf(k) : LETTERS.indexOf(k)) : -1;
      if (n >= 0) { pickOption(n); return; }
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (session.idx < session.items.length - 1) move(1);
        else if (session.kind === 'practice' && session.picks[session.idx] !== undefined) finishPractice();
        return;
      }
      if (e.key === 'ArrowLeft') move(-1);
    }
    if (route === 'cards' && deck) {
      if (e.key === ' ') { e.preventDefault(); deck.flip = !deck.flip; const f = $('#flash'); if (f) f.classList.toggle('flip', deck.flip); }
      if (e.key === 'ArrowRight') cardStep(1);
      if (e.key === 'ArrowLeft') cardStep(-1);
    }
  });
  window.addEventListener('beforeunload', e => { if (session && !session.done && session.kind === 'exam') { e.preventDefault(); e.returnValue = ''; } });

  applyTheme();
  $('[data-nav="exam"]').textContent = W.exam;
  $('[data-nav="sprint"]').textContent = W.sprint;
  router();
})();
