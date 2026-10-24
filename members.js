/* 會員系統：註冊與登入（Email、Google）、我的課程、兌換碼開通、學習進度同步（管理後台 API 在 admin-api.js） */
'use strict';
const crypto = require('crypto');
const { q } = require('./db');

const SESSION_DAYS = 30;
const COOKIE = 'sp_sess';
const GOOGLE = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  ? { id: process.env.GOOGLE_CLIENT_ID, secret: process.env.GOOGLE_CLIENT_SECRET } : null;

module.exports = function createMembers({ LEVELS, site, esc, render, send, redirect, readBody, clientIp, cookies, verifyPassword }) {
  /* ---------- 密碼與工作階段 ---------- */
  const hashPassword = pw => {
    const salt = crypto.randomBytes(16);
    return `scrypt$${salt.toString('hex')}$${crypto.scryptSync(pw, salt, 32).toString('hex')}`;
  };
  const DUMMY = hashPassword(crypto.randomBytes(12).toString('hex'));
  const sha = s => crypto.createHash('sha256').update(s).digest('hex');
  const secure = process.env.COOKIE_INSECURE ? '' : ' Secure;';

  function startSession(req, userId) {
    const token = crypto.randomBytes(32).toString('base64url');
    const now = Date.now();
    q.insertSession.run(sha(token), userId, now, now + SESSION_DAYS * 864e5, clientIp(req), String(req.headers['user-agent'] || '').slice(0, 200));
    q.seen.run(now, userId);
    return `${COOKIE}=${token}; Path=/; Max-Age=${SESSION_DAYS * 86400}; HttpOnly;${secure} SameSite=Lax`;
  }
  const clearCookie = `${COOKIE}=; Path=/; Max-Age=0; HttpOnly;${secure} SameSite=Lax`;

  // 每個請求只查一次資料庫
  function user(req) {
    if (req._user !== undefined) return req._user;
    const tok = cookies(req)[COOKIE];
    let u = null;
    if (tok) {
      const row = q.session.get(sha(tok));
      if (row && row.expires_at > Date.now() && !row.disabled) {
        u = row;
        if (!u.last_seen || Date.now() - u.last_seen > 10 * 60e3) q.seen.run(Date.now(), u.id);
      }
    }
    return (req._user = u);
  }
  const canAccess = (u, level) => !!u && (u.is_admin || !!q.enrolled.get(u.id, level));
  const audit = (actor, userId, action, detail = '') => q.audit.run(Date.now(), actor ? actor.id : null, userId, action, detail);

  /* ---------- 防護：嘗試次數限制、同源檢查 ---------- */
  const buckets = new Map();
  function limit(key, max, winMs) {
    const now = Date.now();
    const a = (buckets.get(key) || []).filter(t => now - t < winMs);
    buckets.set(key, a);
    return { blocked: a.length >= max, hit: () => a.push(Date.now()) };
  }
  setInterval(() => { const now = Date.now(); for (const [k, v] of buckets) if (!v.some(t => now - t < 3600e3)) buckets.delete(k); }, 10 * 60e3).unref();

  // 表單 POST 只接受同一網站送出（防 CSRF）
  function sameOrigin(req) {
    const src = req.headers.origin || req.headers.referer;
    if (!src) return false;
    try { return new URL(src).host === req.headers.host; } catch { return false; }
  }
  const safeNext = n => (typeof n === 'string' && /^\/(?![/\\])/.test(n) ? n : '/account');
  const form = async req => new URLSearchParams(await readBody(req, 8192));
  const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;

  /* ---------- 版面 ---------- */
  function userNav(u) {
    if (!u) return `<div class="head-user"><a href="/login">登入</a><a class="btn sm accent" href="/register">註冊</a></div>`;
    return `<div class="head-user">${u.is_admin ? '<a href="/admin">管理後台</a>' : ''}<a class="btn sm outline" href="/account">我的課程</a></div>`;
  }
  function page(res, req, { title, body, wide = false, code = 200, extra = {} }) {
    return send(res, code, render('page.html', { TITLE: esc(title), USER_NAV: userNav(user(req)), BODY: body, WIDE: wide ? ' wide' : '' }), undefined, extra);
  }
  const alert = (msg, kind = 'bad') => msg ? `<p class="m-alert ${kind}" role="alert">${esc(msg)}</p>` : '';
  const courseName = id => { const c = site.get().byId[id]; return c ? (c.short || c.L.name) : (LEVELS[id] ? LEVELS[id].name : id); };

  /* ---------- 登入、註冊頁 ---------- */
  function authPage(res, req, mode, { error = '', email = '', name = '', next = '' } = {}) {
    const reg = mode === 'register';
    const nx = esc(safeNext(next));
    const google = GOOGLE ? `<a class="btn outline lg block g-btn" href="/auth/google?next=${encodeURIComponent(safeNext(next))}"><span class="g-logo" aria-hidden="true">G</span>使用 Google 帳號${reg ? '註冊' : '登入'}</a><div class="m-or"><span>或使用 Email</span></div>` : '';
    return page(res, req, {
      title: reg ? '註冊會員' : '登入',
      code: error ? 400 : 200,
      body: `<section class="m-card">
        <h1>${reg ? '註冊會員' : '登入 SecPath'}</h1>
        <p class="muted">${reg ? '註冊後可用課程兌換碼開通課程，學習進度會同步到你的帳號，換裝置也能接續。' : '登入後即可進入已開通的課程，學習進度跨裝置同步。'}</p>
        ${alert(error)}
        ${google}
        <form method="post" action="/${reg ? 'register' : 'login'}" class="m-form">
          <input type="hidden" name="next" value="${nx}">
          ${reg ? `<label class="field"><span>姓名或暱稱</span><input class="input" name="name" maxlength="40" required value="${esc(name)}" autocomplete="name"></label>` : ''}
          <label class="field"><span>Email</span><input class="input" type="email" name="email" maxlength="120" required value="${esc(email)}" autocomplete="email"${reg ? '' : ' autofocus'}></label>
          <label class="field"><span>密碼${reg ? '（至少 8 個字元）' : ''}</span><input class="input" type="password" name="password" minlength="${reg ? 8 : 1}" maxlength="200" required autocomplete="${reg ? 'new-password' : 'current-password'}"></label>
          <button class="btn accent lg block" type="submit">${reg ? '註冊' : '登入'}</button>
        </form>
        <p class="m-switch">${reg ? `已經有帳號？<a href="/login?next=${encodeURIComponent(safeNext(next))}">登入</a>` : `還沒有帳號？<a href="/register?next=${encodeURIComponent(safeNext(next))}">免費註冊</a>`}</p>
        ${reg ? '' : '<p class="m-switch muted small">忘記密碼請聯絡課程管理者重設。</p>'}
      </section>`
    });
  }

  async function doLogin(req, res) {
    const f = await form(req);
    const email = (f.get('email') || '').trim(), pw = f.get('password') || '', next = f.get('next');
    const lim = limit('login:' + clientIp(req), 10, 15 * 60e3);
    if (lim.blocked) return authPage(res, req, 'login', { error: '嘗試次數過多，請 15 分鐘後再試。', email, next });
    const u = email && q.userByEmail.get(email);
    const ok = verifyPassword(pw, (u && u.pass) || DUMMY) && u && u.pass;
    if (!ok) { lim.hit(); return authPage(res, req, 'login', { error: u && !u.pass ? '這個帳號使用 Google 登入，請點上方的 Google 按鈕。' : 'Email 或密碼不正確。', email, next }); }
    if (u.disabled) return authPage(res, req, 'login', { error: '此帳號已停用，請聯絡課程管理者。', email, next });
    return redirect(res, safeNext(next), { 'Set-Cookie': startSession(req, u.id) });
  }

  async function doRegister(req, res) {
    const f = await form(req);
    const email = (f.get('email') || '').trim(), name = (f.get('name') || '').trim().slice(0, 40), pw = f.get('password') || '', next = f.get('next');
    const err = e => authPage(res, req, 'register', { error: e, email, name, next });
    const lim = limit('reg:' + clientIp(req), 5, 3600e3);
    if (lim.blocked) return err('註冊次數過多，請稍後再試。');
    if (!EMAIL.test(email) || email.length > 120) return err('Email 格式不正確。');
    if (!name) return err('請填寫姓名或暱稱。');
    if (pw.length < 8) return err('密碼至少需要 8 個字元。');
    if (q.userByEmail.get(email)) return err('這個 Email 已經註冊過，請直接登入。');
    lim.hit();
    const id = q.insertUser.run({ email, name, pass: hashPassword(pw), google_sub: null, created_at: Date.now() }).lastInsertRowid;
    audit(null, id, 'register', 'email');
    return redirect(res, safeNext(next), { 'Set-Cookie': startSession(req, id) });
  }

  /* ---------- Google 登入（OpenID Connect 授權碼流程） ---------- */
  const baseUrl = req => process.env.PUBLIC_URL || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
  function googleStart(req, res, url) {
    if (!GOOGLE) return redirect(res, '/login');
    const state = crypto.randomBytes(16).toString('base64url');
    const next = safeNext(url.searchParams.get('next'));
    const p = new URLSearchParams({ client_id: GOOGLE.id, redirect_uri: baseUrl(req) + '/auth/google/callback', response_type: 'code', scope: 'openid email profile', state, prompt: 'select_account' });
    return redirect(res, 'https://accounts.google.com/o/oauth2/v2/auth?' + p, {
      'Set-Cookie': `sp_oauth=${state}.${Buffer.from(next).toString('base64url')}; Path=/auth/google; Max-Age=600; HttpOnly;${secure} SameSite=Lax`
    });
  }
  async function googleCallback(req, res, url) {
    if (!GOOGLE) return redirect(res, '/login');
    const [state, nextB64] = (cookies(req).sp_oauth || '').split('.');
    const next = safeNext(nextB64 ? Buffer.from(nextB64, 'base64url').toString() : '');
    const clear = `sp_oauth=; Path=/auth/google; Max-Age=0; HttpOnly;${secure} SameSite=Lax`;
    const fail = msg => authPage(res, req, 'login', { error: msg, next });
    if (!state || url.searchParams.get('state') !== state) return fail('Google 登入逾時或驗證失敗，請再試一次。');
    const code = url.searchParams.get('code');
    if (!code) return fail('已取消 Google 登入。');
    let claims;
    try {
      const r = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ code, client_id: GOOGLE.id, client_secret: GOOGLE.secret, redirect_uri: baseUrl(req) + '/auth/google/callback', grant_type: 'authorization_code' })
      });
      const j = await r.json();
      if (!r.ok || !j.id_token) throw new Error(j.error || 'no id_token');
      // id_token 直接由 Google 權杖端點經 TLS 取得，依 OIDC 規範可不另驗簽，但仍檢查發行者、對象與期限
      claims = JSON.parse(Buffer.from(j.id_token.split('.')[1], 'base64url').toString());
      if (!['accounts.google.com', 'https://accounts.google.com'].includes(claims.iss) || claims.aud !== GOOGLE.id || claims.exp * 1000 < Date.now()) throw new Error('bad claims');
    } catch (e) {
      console.error('Google 登入失敗：', e.message);
      return fail('Google 登入失敗，請稍後再試或改用 Email 登入。');
    }
    if (!claims.email || !claims.email_verified) return fail('這個 Google 帳號的 Email 尚未驗證。');
    let u = q.userByGoogle.get(claims.sub);
    if (!u) {
      u = q.userByEmail.get(claims.email);
      if (u) { q.setGoogle.run(claims.sub, u.id); audit(null, u.id, 'link-google'); }
      else {
        const id = q.insertUser.run({ email: claims.email, name: String(claims.name || claims.email.split('@')[0]).slice(0, 40), pass: null, google_sub: claims.sub, created_at: Date.now() }).lastInsertRowid;
        audit(null, id, 'register', 'google');
        u = q.userById.get(id);
      }
    }
    if (u.disabled) return fail('此帳號已停用，請聯絡課程管理者。');
    res.setHeader('Set-Cookie', [clear, startSession(req, u.id)]);
    return redirect(res, next);
  }

  /* ---------- 兌換碼：原本的課程密碼 ---------- */
  function redeem(u, code, only) {
    const got = [];
    for (const [id, L] of Object.entries(LEVELS)) {
      if (only && id !== only) continue;
      if (verifyPassword(code, L.hash)) {
        if (q.enroll.run(u.id, id, 'code', '', Date.now()).changes) audit(u, u.id, 'redeem', id);
        got.push(id);
      }
    }
    return got;
  }
  // 課程登入頁送出的密碼：已登入會員視為兌換碼，回傳是否成功
  function redeemFromCoursePage(req, level, pw) {
    const u = user(req);
    if (!u) return null;
    return redeem(u, pw, level).length > 0;
  }

  /* ---------- 學習進度摘要（我的課程、管理後台共用） ---------- */
  function summarize(level, json) {
    let d = {};
    try { d = JSON.parse(json) || {}; } catch {}
    const c = site.get().byId[level];
    const total = c ? c.stats.chapters : 0;
    const done = Object.keys(d.done || {}).length;
    let right = 0, wrong = 0;
    for (const s of Object.values(d.qs || {})) { right += s.c || 0; wrong += s.w || 0; }
    const exams = d.exams || [];
    return {
      total, done, pct: total ? Math.round(done / total * 100) : 0,
      answered: Object.keys(d.qs || {}).length, acc: right + wrong ? Math.round(right / (right + wrong) * 100) : null,
      exams: exams.length, best: exams.length ? Math.max(...exams.map(e => e.score || 0)) : null,
      wrongNow: Object.keys(d.wrong || {}).length, days: (d.days || []).length, last: (d.days || []).slice(-1)[0] || ''
    };
  }

  /* ---------- 我的課程 ---------- */
  function account(req, res, url) {
    const u = user(req);
    if (!u) return redirect(res, '/login?next=/account');
    const d = site.get();
    const prog = Object.fromEntries(q.userProgress.all(u.id).map(r => [r.level, r]));
    const mine = u.is_admin ? d.courses.map(c => c.id) : q.enrollments.all(u.id).map(e => e.level).filter(id => d.byId[id]);
    const flash = { redeemed: '兌換成功，課程已開通。', bad: '兌換碼不正確，請確認後再試。', locked: '嘗試次數過多，請 15 分鐘後再試。', pw: '密碼已更新，其他裝置已登出。', pwbad: '目前密碼不正確。', pwshort: '新密碼至少需要 8 個字元。', name: '已更新姓名。' }[url.searchParams.get('m')] || '';
    const good = ['redeemed', 'pw', 'name'].includes(url.searchParams.get('m'));
    const cards = mine.map(id => {
      const c = d.byId[id], s = prog[id] ? summarize(id, prog[id].data) : null;
      return `<a class="my-card" href="/${id}/" style="--h:${c.hue}">
        <div class="cover sm" aria-hidden="true"><span class="cover-code">${esc(c.code)}</span></div>
        <div class="my-body"><h3>${esc(c.LV.title || c.L.title)}</h3>
          <div class="my-bar"><i style="width:${s ? s.pct : 0}%"></i></div>
          <p class="small muted">${s ? `已完成 ${s.done}／${s.total} 章${s.acc !== null ? `・練習答對率 ${s.acc}%` : ''}` : `${c.stats.chapters} 章・尚未開始`}</p>
        </div><span class="btn sm accent">${s ? '繼續學習' : '開始學習'}</span></a>`;
    }).join('');
    return page(res, req, {
      title: '我的課程', wide: true,
      body: `<div class="m-head"><div><div class="overline">會員中心</div><h1>${esc(u.name || u.email)}，歡迎回來</h1><p class="muted">${esc(u.email)}${u.is_admin ? '・管理員（可進入所有課程）' : ''}</p></div><a class="btn outline" href="/logout">登出</a></div>
      ${alert(flash, good ? 'ok' : 'bad')}
      <section class="m-sec"><h2>我的課程</h2>
        ${cards ? `<div class="my-list">${cards}</div>` : `<div class="empty"><p>還沒有開通任何課程。</p><p class="small">輸入課程兌換碼即可開通，或先到首頁看看有哪些課程。</p><a class="btn outline" href="/#courses">瀏覽課程</a></div>`}
      </section>
      <div class="m-cols">
        <section class="m-sec"><h2>兌換課程</h2>
          <p class="muted small">輸入課程管理者提供的兌換碼（原本的課程密碼），開通後永久保留在你的帳號。</p>
          <form method="post" action="/account/redeem" class="m-inline"><input class="input" name="code" required maxlength="200" placeholder="輸入兌換碼" autocomplete="off"><button class="btn accent" type="submit">兌換</button></form>
        </section>
        <section class="m-sec"><h2>帳號設定</h2>
          <form method="post" action="/account/name" class="m-inline"><input class="input" name="name" required maxlength="40" value="${esc(u.name)}" aria-label="姓名"><button class="btn outline" type="submit">更新姓名</button></form>
          <details class="m-details"><summary>${u.pass ? '變更密碼' : '設定密碼（目前使用 Google 登入）'}</summary>
            <form method="post" action="/account/password" class="m-form">
              ${u.pass ? '<label class="field"><span>目前密碼</span><input class="input" type="password" name="current" required autocomplete="current-password"></label>' : ''}
              <label class="field"><span>新密碼（至少 8 個字元）</span><input class="input" type="password" name="password" minlength="8" maxlength="200" required autocomplete="new-password"></label>
              <button class="btn outline" type="submit">儲存密碼</button>
            </form>
          </details>
          <p class="small muted">${u.google_sub ? '已連結 Google 帳號。' : GOOGLE ? '可用同一個 Email 的 Google 帳號登入，系統會自動連結。' : ''}</p>
        </section>
      </div>`
    });
  }

  async function accountPost(req, res, action) {
    const u = user(req);
    if (!u) return redirect(res, '/login?next=/account');
    const f = await form(req);
    if (action === 'redeem') {
      const lim = limit('redeem:' + clientIp(req), 10, 15 * 60e3);
      if (lim.blocked) return redirect(res, '/account?m=locked');
      const got = redeem(u, (f.get('code') || '').trim());
      if (!got.length) { lim.hit(); return redirect(res, '/account?m=bad'); }
      return redirect(res, '/account?m=redeemed');
    }
    if (action === 'name') {
      const name = (f.get('name') || '').trim().slice(0, 40);
      if (name) q.setName.run(name, u.id);
      return redirect(res, '/account?m=name');
    }
    if (action === 'password') {
      const pw = f.get('password') || '';
      if (u.pass && !verifyPassword(f.get('current') || '', u.pass)) return redirect(res, '/account?m=pwbad');
      if (pw.length < 8) return redirect(res, '/account?m=pwshort');
      q.setPass.run(hashPassword(pw), u.id);
      q.deleteOtherSessions.run(u.id, sha(cookies(req)[COOKIE]));
      audit(u, u.id, 'password');
      return redirect(res, '/account?m=pw');
    }
    return send(res, 404, 'Not found', 'text/plain');
  }

  /* ---------- 學習進度 API ---------- */
  async function progressApi(req, res, level) {
    const u = user(req);
    if (!u) return send(res, 401, '{"error":"login"}', 'application/json');
    if (!LEVELS[level] || !canAccess(u, level)) return send(res, 403, '{"error":"forbidden"}', 'application/json');
    if (req.method === 'GET') {
      const r = q.progress.get(u.id, level);
      return send(res, 200, JSON.stringify(r ? { data: JSON.parse(r.data), updated_at: r.updated_at } : { data: null }), 'application/json');
    }
    if (req.method === 'POST') {
      // 只接受 application/json：跨站表單無法送出此類型，免除 CSRF
      if (!/^application\/json\b/.test(req.headers['content-type'] || '')) return send(res, 415, '{"error":"type"}', 'application/json');
      let data;
      try { data = JSON.parse(await readBody(req, 512 * 1024)); } catch { return send(res, 400, '{"error":"bad"}', 'application/json'); }
      if (!data || typeof data !== 'object' || Array.isArray(data)) return send(res, 400, '{"error":"bad"}', 'application/json');
      delete data._owner; delete data._dirty;
      const now = Date.now();
      q.saveProgress.run(u.id, level, JSON.stringify(data), now);
      return send(res, 200, JSON.stringify({ ok: true, updated_at: now }), 'application/json');
    }
    return send(res, 405, '{"error":"method"}', 'application/json');
  }
  // 課程頁直接內嵌進度，避免載入後再等一次請求
  function appVars(req, level) {
    const u = user(req);
    if (!u) return { USER_SCRIPT: '', ACCOUNT_LINKS: '<p><a class="link-btn" href="/">課程首頁</a>　<a class="link-btn" href="logout">登出</a></p><p>學習進度儲存於本機瀏覽器・<a class="link-btn" href="/register">註冊會員</a>可跨裝置同步</p>' };
    const r = q.progress.get(u.id, level);
    const json = JSON.stringify({ id: u.id, name: u.name || u.email, progress: r ? JSON.parse(r.data) : null }).replace(/</g, '\\u003c').replace(/\u2028|\u2029/g, '');
    return {
      USER_SCRIPT: `<script>window.SP_USER = ${json};</script>`,
      ACCOUNT_LINKS: `<p><a class="link-btn" href="/account">我的課程</a>　<a class="link-btn" href="/logout">登出</a></p><p>${esc(u.name || u.email)}・學習進度<span id="syncState">已同步到帳號</span></p>`
    };
  }

  /* ---------- 路由：處理到就回傳 true ---------- */
  async function handle(req, res, url, p) {
    const post = req.method === 'POST';
    if (post && /^\/(login|register|account\/)/.test(p) && !sameOrigin(req)) { send(res, 403, 'Forbidden', 'text/plain'); return true; }
    if (p === '/login') { if (post) await doLogin(req, res); else if (user(req)) redirect(res, safeNext(url.searchParams.get('next'))); else authPage(res, req, 'login', { next: url.searchParams.get('next') }); return true; }
    if (p === '/register') { if (post) await doRegister(req, res); else if (user(req)) redirect(res, '/account'); else authPage(res, req, 'register', { next: url.searchParams.get('next') }); return true; }
    if (p === '/logout') {
      const tok = cookies(req)[COOKIE];
      if (tok) q.deleteSession.run(sha(tok));
      redirect(res, '/', { 'Set-Cookie': clearCookie }); return true;
    }
    if (p === '/auth/google') { googleStart(req, res, url); return true; }
    if (p === '/auth/google/callback') { await googleCallback(req, res, url); return true; }
    if (p === '/account') { account(req, res, url); return true; }
    if (post && /^\/account\/(redeem|name|password)$/.test(p)) { await accountPost(req, res, p.slice(9)); return true; }
    const api = p.match(/^\/api\/progress\/([\w-]+)$/);
    if (api) { await progressApi(req, res, api[1]); return true; }
    return false;
  }

  return { handle, user, canAccess, userNav, appVars, redeemFromCoursePage, hashPassword, summarize, audit, sameOrigin, courseName };
};
