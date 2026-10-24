/* 管理後台 JSON API（/api/admin/*）：前端在 admin/（React + Vite），以會員登入 Cookie 驗證管理員身分 */
'use strict';
const crypto = require('crypto');
const { db, q, listUsers, tx } = require('./db');

module.exports = function createAdminApi({ LEVELS, site, send, readBody, members }) {
  const json = (res, code, body) => send(res, code, JSON.stringify(body), 'application/json; charset=utf-8');
  const tempPassword = () => crypto.randomBytes(6).toString('base64url').replace(/[-_]/g, 'x');
  const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;
  const DAY = 864e5;

  const stmt = {
    active: db.prepare('SELECT COUNT(DISTINCT user_id) n FROM progress WHERE updated_at > ?'),
    activeByLevel: db.prepare('SELECT level, COUNT(*) n FROM progress WHERE updated_at > ? GROUP BY level'),
    enrollTotal: db.prepare('SELECT COUNT(*) n FROM enrollments'),
    newUsers: db.prepare('SELECT COUNT(*) n FROM users WHERE created_at > ?'),
    signups: db.prepare('SELECT created_at FROM users WHERE created_at > ?'),
    enrollsSince: db.prepare('SELECT created_at FROM enrollments WHERE created_at > ?'),
    recentUsers: db.prepare('SELECT id, email, name, created_at FROM users ORDER BY id DESC LIMIT 6'),
    recentAudit: db.prepare(`SELECT a.*, u.email user_email, u.name user_name, x.email actor FROM audit a
      LEFT JOIN users u ON u.id = a.user_id LEFT JOIN users x ON x.id = a.actor_id ORDER BY a.id DESC LIMIT 12`),
    levelProgress: db.prepare('SELECT data FROM progress WHERE level = ?'),
    updateUser: db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?')
  };

  const course = c => ({ id: c.id, name: c.short || c.L.name, title: c.LV.title || c.L.title, cat: c.cat, catName: c.catName, hue: c.hue, code: c.code, kind: c.kind, level: c.level, stats: c.stats });
  const userOut = u => ({ id: u.id, email: u.email, name: u.name, isAdmin: !!u.is_admin, disabled: !!u.disabled, hasPassword: !!u.pass, google: !!u.google_sub, createdAt: u.created_at, lastSeen: u.last_seen });

  // 台北時間的日期字串，用於每日統計
  const dayKey = t => new Date(t + 8 * 3600e3).toISOString().slice(0, 10);
  function series(times, days) {
    const out = [], counts = {};
    times.forEach(t => { const k = dayKey(t); counts[k] = (counts[k] || 0) + 1; });
    for (let i = days - 1; i >= 0; i--) { const k = dayKey(Date.now() - i * DAY); out.push({ date: k, n: counts[k] || 0 }); }
    return out;
  }

  function overview() {
    const d = site.get(), now = Date.now();
    const counts = Object.fromEntries(q.enrollCounts.all().map(r => [r.level, r.n]));
    const active = Object.fromEntries(stmt.activeByLevel.all(now - 7 * DAY).map(r => [r.level, r.n]));
    const since = now - 30 * DAY;
    return {
      totals: {
        users: q.countUsers.get().n,
        newUsers7: stmt.newUsers.get(now - 7 * DAY).n,
        enrollments: stmt.enrollTotal.get().n,
        active7: stmt.active.get(now - 7 * DAY).n,
        active1: stmt.active.get(now - DAY).n
      },
      signups: series(stmt.signups.all(since).map(r => r.created_at), 30),
      enrolls: series(stmt.enrollsSince.all(since).map(r => r.created_at), 30),
      courses: d.courses.map(c => ({ ...course(c), enrolled: counts[c.id] || 0, active7: active[c.id] || 0 })),
      recentUsers: stmt.recentUsers.all().map(u => ({ id: u.id, email: u.email, name: u.name, createdAt: u.created_at })),
      recentAudit: stmt.recentAudit.all().map(auditOut)
    };
  }

  function courses() {
    const d = site.get(), now = Date.now();
    const counts = Object.fromEntries(q.enrollCounts.all().map(r => [r.level, r.n]));
    const active = Object.fromEntries(stmt.activeByLevel.all(now - 7 * DAY).map(r => [r.level, r.n]));
    return d.courses.map(c => {
      const sums = stmt.levelProgress.all(c.id).map(r => members.summarize(c.id, r.data));
      const avg = k => { const v = sums.map(s => s[k]).filter(x => x !== null); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null; };
      return { ...course(c), enrolled: counts[c.id] || 0, learners: sums.length, active7: active[c.id] || 0, avgPct: avg('pct'), avgAcc: avg('acc'), completed: sums.filter(s => s.total && s.done >= s.total).length };
    });
  }

  function auditOut(a) {
    return { id: a.id, at: a.at, action: a.action, detail: a.detail, detailName: LEVELS[a.detail] ? members.courseName(a.detail) : '', actor: a.actor || null, userId: a.user_id, userEmail: a.user_email, userName: a.user_name };
  }

  function userDetail(id) {
    const u = q.userById.get(id);
    if (!u) return null;
    return {
      user: userOut(u),
      enrollments: q.enrollments.all(id).map(e => ({ level: e.level, name: members.courseName(e.level), source: e.source, note: e.note, createdAt: e.created_at })),
      progress: q.userProgress.all(id).map(r => ({ level: r.level, name: members.courseName(r.level), updatedAt: r.updated_at, ...members.summarize(r.level, r.data) })),
      audit: q.userAudit.all(id).map(auditOut)
    };
  }

  async function body(req) {
    try { return JSON.parse(await readBody(req, 16384) || '{}') || {}; } catch { return null; }
  }

  async function handle(req, res, url, p) {
    if (!p.startsWith('/api/admin/') && p !== '/api/admin') return false;
    const me = members.user(req);
    if (!me) return json(res, 401, { error: '請先登入' }), true;
    if (!me.is_admin) return json(res, 403, { error: '只有管理員可以使用' }), true;
    const r = p.slice('/api/admin'.length);
    const method = req.method;

    if (method === 'GET') {
      if (r === '/me') return json(res, 200, { user: userOut(me) }), true;
      if (r === '/overview') return json(res, 200, overview()), true;
      if (r === '/courses') return json(res, 200, { courses: courses() }), true;
      if (r === '/users') {
        const level = url.searchParams.get('level') || '';
        const per = Math.min(100, Math.max(10, +url.searchParams.get('per') || 30));
        const page = Math.max(1, +url.searchParams.get('page') || 1);
        const { total, rows } = listUsers({ search: (url.searchParams.get('q') || '').trim().slice(0, 100), level: LEVELS[level] ? level : '', limit: per, offset: (page - 1) * per });
        return json(res, 200, { total, page, per, rows: rows.map(u => ({ ...userOut(u), levels: (u.levels || '').split(',').filter(Boolean), active: u.active })) }), true;
      }
      const m = r.match(/^\/users\/(\d+)$/);
      if (m) { const d = userDetail(+m[1]); return json(res, d ? 200 : 404, d || { error: '找不到這位會員' }), true; }
      return json(res, 404, { error: 'Not found' }), true;
    }

    if (method !== 'POST') return json(res, 405, { error: 'Method not allowed' }), true;
    // 只接受同源的 JSON 請求（防 CSRF）
    if (!/^application\/json\b/.test(req.headers['content-type'] || '') || !members.sameOrigin(req)) return json(res, 403, { error: 'Forbidden' }), true;
    const b = await body(req);
    if (!b) return json(res, 400, { error: '資料格式錯誤' }), true;

    if (r === '/users') {
      const email = String(b.email || '').trim(), name = String(b.name || '').trim().slice(0, 40), note = String(b.note || '').trim().slice(0, 200);
      const levels = (Array.isArray(b.levels) ? b.levels : []).filter(l => LEVELS[l]);
      if (!EMAIL.test(email) || email.length > 120) return json(res, 400, { error: 'Email 格式不正確' }), true;
      if (q.userByEmail.get(email)) return json(res, 409, { error: '這個 Email 已經註冊過' }), true;
      const pw = tempPassword();
      const id = tx(() => {
        const id = q.insertUser.run({ email, name, pass: members.hashPassword(pw), google_sub: null, created_at: Date.now() }).lastInsertRowid;
        members.audit(me, id, 'create', note);
        for (const l of levels) { q.enroll.run(id, l, 'admin', note, Date.now()); members.audit(me, id, 'enroll', l); }
        return id;
      })();
      return json(res, 200, { id, tempPassword: pw }), true;
    }

    const m = r.match(/^\/users\/(\d+)\/(update|enroll|unenroll|reset|admin|disable|clear)$/);
    if (!m) return json(res, 404, { error: 'Not found' }), true;
    const id = +m[1], act = m[2], t = q.userById.get(id);
    if (!t) return json(res, 404, { error: '找不到這位會員' }), true;
    const level = LEVELS[b.level] ? b.level : null;
    const done = (extra = {}) => json(res, 200, { ok: true, ...extra, ...userDetail(id) });

    if (act === 'update') {
      const name = String(b.name ?? t.name).trim().slice(0, 40), email = String(b.email ?? t.email).trim();
      if (!EMAIL.test(email)) return json(res, 400, { error: 'Email 格式不正確' }), true;
      const other = q.userByEmail.get(email);
      if (other && other.id !== id) return json(res, 409, { error: '這個 Email 已被其他帳號使用' }), true;
      stmt.updateUser.run(name, email, id);
      if (email.toLowerCase() !== t.email.toLowerCase()) members.audit(me, id, 'email', `${t.email} → ${email}`);
      return done(), true;
    }
    if (act === 'enroll' || act === 'unenroll' || act === 'clear') {
      if (!level) return json(res, 400, { error: '請選擇課程' }), true;
      if (act === 'enroll') q.enroll.run(id, level, 'admin', String(b.note || '').trim().slice(0, 200), Date.now());
      else if (act === 'unenroll') q.unenroll.run(id, level);
      else q.deleteProgress.run(id, level);
      members.audit(me, id, act, level);
      return done(), true;
    }
    if (act === 'reset') {
      const pw = tempPassword();
      q.setPass.run(members.hashPassword(pw), id); q.deleteUserSessions.run(id); members.audit(me, id, 'reset');
      return done({ tempPassword: pw }), true;
    }
    if (id === me.id) return json(res, 400, { error: '不能對自己的帳號執行這個動作' }), true;
    if (act === 'admin') { const v = t.is_admin ? 0 : 1; q.setAdmin.run(v, id); members.audit(me, id, 'admin', String(v)); return done(), true; }
    if (act === 'disable') { const v = t.disabled ? 0 : 1; q.setDisabled.run(v, id); if (v) q.deleteUserSessions.run(id); members.audit(me, id, 'disable', String(v)); return done(), true; }
    return json(res, 404, { error: 'Not found' }), true;
  }

  return { handle };
};
