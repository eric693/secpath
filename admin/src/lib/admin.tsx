import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, type User, type Course } from './api';

// 目前登入的管理員與課程清單（多個頁面共用，只載入一次）
interface Ctx { me: User | null; courses: Course[]; courseName: (id: string) => string; refreshCourses: () => void }
const AdminCtx = createContext<Ctx>({ me: null, courses: [], courseName: id => id, refreshCourses: () => {} });

export function AdminProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState('');
  const refreshCourses = () => { api.get<{ courses: Course[] }>('/courses').then(r => setCourses(r.courses)).catch(() => {}); };
  useEffect(() => {
    api.get<{ user: User }>('/me').then(r => setMe(r.user)).catch(e => setError(e.message));
    refreshCourses();
  }, []);
  if (error) return <div className="flex h-screen items-center justify-center text-slate-500">{error}</div>;
  if (!me) return <div className="flex h-screen items-center justify-center text-slate-400">載入中…</div>;
  const map = new Map(courses.map(c => [c.id, c.name]));
  return <AdminCtx.Provider value={{ me, courses, courseName: id => map.get(id) || id, refreshCourses }}>{children}</AdminCtx.Provider>;
}
export const useAdmin = () => useContext(AdminCtx);
