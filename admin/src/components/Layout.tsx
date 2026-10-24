import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, ExternalLink, LogOut, Menu, X } from 'lucide-react';
import { useAdmin } from '../lib/admin';

const NAV = [
  { to: '/', label: '總覽', icon: LayoutDashboard, end: true },
  { to: '/users', label: '學員管理', icon: Users },
  { to: '/courses', label: '課程統計', icon: BookOpen }
];

export default function Layout() {
  const { me } = useAdmin();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen md:pl-60">
      <aside className={`fixed inset-y-0 left-0 z-40 w-60 border-r border-stone-200 bg-white flex flex-col transition-transform md:translate-x-0 ${open ? 'translate-x-0 shadow-xl' : '-translate-x-full'}`}>
        <div className="px-6 pt-6 pb-5 border-b border-stone-100">
          <a href="/" className="flex items-baseline gap-2">
            <span className="font-serif font-black text-xl">SecPath</span>
            <span className="text-xs tracking-widest text-slate-400">管理後台</span>
          </a>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-brand-50 text-brand-700 font-medium' : 'text-slate-600 hover:bg-stone-100'}`}>
              <n.icon size={18} />{n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-100 text-sm space-y-2">
          <div className="truncate text-slate-700 font-medium">{me?.name || me?.email}</div>
          <div className="truncate text-xs text-slate-400">{me?.email}</div>
          <div className="flex gap-4 pt-1 text-slate-500">
            <a href="/" className="inline-flex items-center gap-1 hover:text-slate-900"><ExternalLink size={14} />網站</a>
            <a href="/logout" className="inline-flex items-center gap-1 hover:text-slate-900"><LogOut size={14} />登出</a>
          </div>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setOpen(false)} />}
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-stone-200 bg-white/90 px-4 backdrop-blur md:hidden">
        <button onClick={() => setOpen(!open)} className="p-1" aria-label="選單">{open ? <X size={20} /> : <Menu size={20} />}</button>
        <span className="font-serif font-black">SecPath</span><span className="text-xs text-slate-400">管理後台</span>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
        <Outlet />
      </main>
    </div>
  );
}
