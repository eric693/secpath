import type { AuditItem } from './api';

const tz = { timeZone: 'Asia/Taipei', hour12: false } as const;
export const fmtDateTime = (t?: number | null) =>
  t ? new Date(t).toLocaleString('zh-TW', { ...tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—';
export const fmtDate = (t?: number | null) =>
  t ? new Date(t).toLocaleDateString('zh-TW', { ...tz, year: 'numeric', month: '2-digit', day: '2-digit' }) : '—';

// 「3 分鐘前」這類相對時間
export function ago(t?: number | null) {
  if (!t) return '—';
  const s = (Date.now() - t) / 1000;
  if (s < 60) return '剛剛';
  if (s < 3600) return `${Math.floor(s / 60)} 分鐘前`;
  if (s < 86400) return `${Math.floor(s / 3600)} 小時前`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)} 天前`;
  return fmtDate(t);
}

export function auditText(a: AuditItem) {
  const n = a.detailName || a.detail;
  switch (a.action) {
    case 'register': return `註冊會員（${a.detail === 'google' ? 'Google' : 'Email'}）`;
    case 'link-google': return '連結 Google 帳號';
    case 'redeem': return `兌換課程：${n}`;
    case 'enroll': return `管理員開通：${n}`;
    case 'unenroll': return `管理員移除課程：${n}`;
    case 'clear': return `清除學習進度：${n}`;
    case 'password': return '變更密碼';
    case 'reset': return '管理員重設密碼';
    case 'admin': return a.detail === '1' ? '設為管理員' : '取消管理員';
    case 'disable': return a.detail === '1' ? '停用帳號' : '重新啟用帳號';
    case 'email': return `變更 Email：${a.detail}`;
    case 'create': return `建立帳號${a.detail ? `（${a.detail}）` : ''}`;
    default: return a.action;
  }
}

export const hueBg = (h: number) => `linear-gradient(135deg, hsl(${h} 52% 30%), hsl(${h + 28} 58% 19%))`;
