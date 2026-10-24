/* 會員資料庫（SQLite）：帳號、登入工作階段、課程開通、學習進度、管理紀錄 */
'use strict';
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const file = process.env.DB_FILE || path.join(__dirname, 'data', 'secpath.db');
fs.mkdirSync(path.dirname(file), { recursive: true });
const db = new Database(file);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL DEFAULT '',
  pass TEXT,                       -- scrypt$salt$hash；只用 Google 登入的帳號為 NULL
  google_sub TEXT UNIQUE,
  is_admin INTEGER NOT NULL DEFAULT 0,
  disabled INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  last_seen INTEGER
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,     -- 只存 Cookie 權杖的 SHA-256
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  ip TEXT, ua TEXT
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);
CREATE TABLE IF NOT EXISTS enrollments (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  source TEXT NOT NULL,            -- code 兌換碼、admin 管理員開通
  note TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, level)
);
CREATE TABLE IF NOT EXISTS progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  data TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, level)
);
CREATE TABLE IF NOT EXISTS audit (
  id INTEGER PRIMARY KEY,
  at INTEGER NOT NULL,
  actor_id INTEGER,
  user_id INTEGER,
  action TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT ''
);
`);

const q = {
  userById: db.prepare('SELECT * FROM users WHERE id = ?'),
  userByEmail: db.prepare('SELECT * FROM users WHERE email = ?'),
  userByGoogle: db.prepare('SELECT * FROM users WHERE google_sub = ?'),
  insertUser: db.prepare('INSERT INTO users (email, name, pass, google_sub, created_at) VALUES (@email, @name, @pass, @google_sub, @created_at)'),
  setPass: db.prepare('UPDATE users SET pass = ? WHERE id = ?'),
  setName: db.prepare('UPDATE users SET name = ? WHERE id = ?'),
  setGoogle: db.prepare('UPDATE users SET google_sub = ? WHERE id = ?'),
  setAdmin: db.prepare('UPDATE users SET is_admin = ? WHERE id = ?'),
  setDisabled: db.prepare('UPDATE users SET disabled = ? WHERE id = ?'),
  seen: db.prepare('UPDATE users SET last_seen = ? WHERE id = ?'),
  countUsers: db.prepare('SELECT COUNT(*) n FROM users'),

  insertSession: db.prepare('INSERT INTO sessions (token_hash, user_id, created_at, expires_at, ip, ua) VALUES (?, ?, ?, ?, ?, ?)'),
  session: db.prepare('SELECT s.expires_at, u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?'),
  deleteSession: db.prepare('DELETE FROM sessions WHERE token_hash = ?'),
  deleteUserSessions: db.prepare('DELETE FROM sessions WHERE user_id = ?'),
  deleteOtherSessions: db.prepare('DELETE FROM sessions WHERE user_id = ? AND token_hash != ?'),
  purgeSessions: db.prepare('DELETE FROM sessions WHERE expires_at < ?'),

  enrollments: db.prepare('SELECT * FROM enrollments WHERE user_id = ? ORDER BY created_at'),
  enrolled: db.prepare('SELECT 1 FROM enrollments WHERE user_id = ? AND level = ?'),
  enroll: db.prepare('INSERT OR IGNORE INTO enrollments (user_id, level, source, note, created_at) VALUES (?, ?, ?, ?, ?)'),
  unenroll: db.prepare('DELETE FROM enrollments WHERE user_id = ? AND level = ?'),
  enrollCounts: db.prepare('SELECT level, COUNT(*) n FROM enrollments GROUP BY level'),

  progress: db.prepare('SELECT data, updated_at FROM progress WHERE user_id = ? AND level = ?'),
  userProgress: db.prepare('SELECT level, data, updated_at FROM progress WHERE user_id = ?'),
  saveProgress: db.prepare('INSERT INTO progress (user_id, level, data, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT(user_id, level) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at'),
  deleteProgress: db.prepare('DELETE FROM progress WHERE user_id = ? AND level = ?'),

  audit: db.prepare('INSERT INTO audit (at, actor_id, user_id, action, detail) VALUES (?, ?, ?, ?, ?)'),
  userAudit: db.prepare('SELECT a.*, u.email actor FROM audit a LEFT JOIN users u ON u.id = a.actor_id WHERE a.user_id = ? ORDER BY a.id DESC LIMIT 30')
};

// 管理後台的學員列表：可依 Email、姓名搜尋，或篩選某門課的學員
function listUsers({ search = '', level = '', limit = 50, offset = 0 } = {}) {
  const where = [], args = {};
  if (search) { where.push('(u.email LIKE @s OR u.name LIKE @s)'); args.s = `%${search.replace(/[%_\\]/g, c => '\\' + c)}%`; }
  if (level) { where.push('EXISTS (SELECT 1 FROM enrollments e WHERE e.user_id = u.id AND e.level = @level)'); args.level = level; }
  const w = where.length ? 'WHERE ' + where.join(' AND ').replace(/LIKE @s/g, "LIKE @s ESCAPE '\\'") : '';
  const total = db.prepare(`SELECT COUNT(*) n FROM users u ${w}`).get(args).n;
  const rows = db.prepare(`SELECT u.*, (SELECT group_concat(level) FROM enrollments e WHERE e.user_id = u.id) levels,
      (SELECT MAX(updated_at) FROM progress p WHERE p.user_id = u.id) active
    FROM users u ${w} ORDER BY u.id DESC LIMIT @limit OFFSET @offset`).all({ ...args, limit, offset });
  return { total, rows };
}

setInterval(() => q.purgeSessions.run(Date.now()), 6 * 3600e3).unref();

module.exports = { db, q, listUsers, tx: fn => db.transaction(fn) };
