// 管理後台 API：與網站同網域，靠會員登入 Cookie 驗證；未登入時導回網站登入頁
export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

async function request<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
  const res = await fetch('/api/admin' + path, {
    method,
    credentials: 'same-origin',
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });
  if (res.status === 401) {
    location.href = '/login?next=' + encodeURIComponent(location.pathname);
    throw new ApiError(401, '請先登入');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.error || `發生錯誤（${res.status}）`);
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body: unknown = {}) => request<T>('POST', path, body)
};

/* ---------- 型別 ---------- */
export interface User {
  id: number; email: string; name: string; isAdmin: boolean; disabled: boolean;
  hasPassword: boolean; google: boolean; createdAt: number; lastSeen: number | null;
}
export interface UserRow extends User { levels: string[]; active: number | null }
export interface CourseStats { chapters: number; minutes: number; hours: number; questions: number; terms: number; videos: number; tools: number; runnable: number }
export interface Course {
  id: string; name: string; title: string; cat: string; catName: string; hue: number; code: string;
  kind: 'cert' | 'skill'; level: string; stats: CourseStats; enrolled: number; active7: number;
}
export interface CourseDetail extends Course { learners: number; avgPct: number | null; avgAcc: number | null; completed: number }
export interface AuditItem {
  id: number; at: number; action: string; detail: string; detailName: string; actor: string | null;
  userId: number | null; userEmail?: string; userName?: string;
}
export interface Overview {
  totals: { users: number; newUsers7: number; enrollments: number; active7: number; active1: number };
  signups: { date: string; n: number }[];
  enrolls: { date: string; n: number }[];
  courses: Course[];
  recentUsers: { id: number; email: string; name: string; createdAt: number }[];
  recentAudit: AuditItem[];
}
export interface Enrollment { level: string; name: string; source: 'code' | 'admin'; note: string; createdAt: number }
export interface Progress {
  level: string; name: string; updatedAt: number; total: number; done: number; pct: number; answered: number;
  acc: number | null; exams: number; best: number | null; wrongNow: number; days: number; last: string;
}
export interface UserDetail { user: User; enrollments: Enrollment[]; progress: Progress[]; audit: AuditItem[]; tempPassword?: string }
