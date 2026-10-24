import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { hueBg } from '../lib/format';

export function PageHead({ title, sub, actions }: { title: string; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-serif text-2xl font-bold">{title}</h1>
        {sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <div className="card p-5">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-3xl font-medium tabular-nums">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-400">{hint}</div>}
    </div>
  );
}

export function Section({ title, actions, children, className = '' }: { title: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`card ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-stone-100 px-5 py-3.5">
        <h2 className="font-medium">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}

export function CourseChip({ name, hue, code }: { name: string; hue?: number; code?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 bg-stone-50 py-0.5 pl-0.5 pr-2 text-xs whitespace-nowrap">
      {hue !== undefined && <span className="rounded px-1 font-mono text-[10px] text-white" style={{ background: hueBg(hue) }}>{code}</span>}
      {name}
    </span>
  );
}

export function Modal({ title, onClose, children, footer }: { title: string; onClose: () => void; children: ReactNode; footer?: ReactNode }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl" role="dialog" aria-modal="true">
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
          <h3 className="font-medium">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700" aria-label="關閉"><X size={18} /></button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-stone-100 px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}

export function Bar({ pct, hue = 152 }: { pct: number; hue?: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
      <div className="h-full rounded-full" style={{ width: `${Math.min(100, pct)}%`, background: `hsl(${hue} 52% 40%)` }} />
    </div>
  );
}

export const Empty = ({ children }: { children: ReactNode }) => <div className="px-5 py-10 text-center text-sm text-slate-400">{children}</div>;
export const ErrorText = ({ msg }: { msg: string }) => msg ? <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{msg}</p> : null;

// 臨時密碼只顯示一次：提供複製按鈕
export function TempPassword({ email, password, onClose }: { email: string; password: string; onClose: () => void }) {
  const text = `SecPath 學堂登入資訊\n網址：${location.origin}/login\n帳號：${email}\n臨時密碼：${password}\n登入後請到「我的課程」變更密碼。`;
  return (
    <Modal title="臨時密碼" onClose={onClose} footer={<>
      <button className="btn-outline" onClick={() => navigator.clipboard?.writeText(text)}>複製登入資訊</button>
      <button className="btn-primary" onClick={onClose}>完成</button>
    </>}>
      <p className="text-sm text-slate-600">請轉交給 <b>{email}</b>。此密碼只會顯示這一次。</p>
      <div className="mt-4 rounded-lg bg-stone-100 px-4 py-3 text-center font-mono text-2xl tracking-wider select-all">{password}</div>
    </Modal>
  );
}
