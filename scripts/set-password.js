/* 設定或變更某一級的登入密碼：node scripts/set-password.js <beginner|intermediate|ai-beginner|ai-intermediate|ai-invest|linux|secplus|aws-clf|aws-saa|py-basic|py-practice> <新密碼>
   密碼以 scrypt 雜湊寫入 .env，變更後需重啟服務（pm2 restart secpath），舊的登入狀態會自動失效。 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const [level, pw] = process.argv.slice(2);
const KEY = { beginner: 'PASS_BEGINNER', intermediate: 'PASS_INTERMEDIATE', 'ai-beginner': 'PASS_AI_BEGINNER', 'ai-intermediate': 'PASS_AI_INTERMEDIATE', 'ai-invest': 'PASS_AI_INVEST', linux: 'PASS_LINUX', secplus: 'PASS_SECPLUS', 'aws-clf': 'PASS_AWS_CLF', 'aws-saa': 'PASS_AWS_SAA', 'py-basic': 'PASS_PY_BASIC', 'py-practice': 'PASS_PY_PRACTICE' }[level];
if (!KEY || !pw) { console.error('用法：node scripts/set-password.js <beginner|intermediate|ai-beginner|ai-intermediate|ai-invest|linux|secplus|aws-clf|aws-saa|py-basic|py-practice> <新密碼>'); process.exit(1); }
if (pw.length < 8) { console.error('密碼至少 8 個字元'); process.exit(1); }

const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(pw, salt, 32);
const line = `${KEY}=scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;

const envPath = path.join(__dirname, '..', '.env');
let env = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
if (!/^SESSION_SECRET=/m.test(env)) env += `SESSION_SECRET=${crypto.randomBytes(32).toString('hex')}\n`;
if (!/^PORT=/m.test(env)) env += 'PORT=3610\n';
if (!/^NODE_ENV=/m.test(env)) env += 'NODE_ENV=production\n';
env = new RegExp(`^${KEY}=.*$`, 'm').test(env) ? env.replace(new RegExp(`^${KEY}=.*$`, 'm'), line) : env + line + '\n';
fs.writeFileSync(envPath, env, { mode: 0o600 });
console.log(`已更新 ${level} 的密碼。請執行 pm2 restart secpath 讓設定生效。`);
