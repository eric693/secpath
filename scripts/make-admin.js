/* 建立或指定管理員：node --env-file=.env scripts/make-admin.js <email> [密碼]
   帳號不存在時會建立（未給密碼則產生一組臨時密碼）；已存在則設為管理員，給密碼時一併重設。 */
'use strict';
const crypto = require('crypto');
const { q } = require('../db');

const [email, given] = process.argv.slice(2);
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { console.error('用法：node --env-file=.env scripts/make-admin.js <email> [密碼]'); process.exit(1); }
if (given && given.length < 8) { console.error('密碼至少 8 個字元'); process.exit(1); }

const hash = pw => { const salt = crypto.randomBytes(16); return `scrypt$${salt.toString('hex')}$${crypto.scryptSync(pw, salt, 32).toString('hex')}`; };
let u = q.userByEmail.get(email);
const pw = given || (u ? null : crypto.randomBytes(9).toString('base64url'));
if (!u) {
  const id = q.insertUser.run({ email, name: email.split('@')[0], pass: hash(pw), google_sub: null, created_at: Date.now() }).lastInsertRowid;
  u = q.userById.get(id);
  q.audit.run(Date.now(), null, id, 'create', '指令建立管理員');
} else if (pw) {
  q.setPass.run(hash(pw), u.id);
  q.deleteUserSessions.run(u.id);
}
q.setAdmin.run(1, u.id);
q.audit.run(Date.now(), null, u.id, 'admin', '1');
console.log(`${email} 已設為管理員${pw ? `，密碼：${pw}` : ''}`);
