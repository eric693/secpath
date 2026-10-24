import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { api, type UserRow } from '../lib/api';
import { useAdmin } from '../lib/admin';
import { ago, fmtDate } from '../lib/format';
import { PageHead, Section, CourseChip, Modal, Empty, ErrorText, TempPassword } from '../components/ui';

interface ListResp { total: number; page: number; per: number; rows: UserRow[] }

export default function Users() {
  const { courses, courseName, refreshCourses } = useAdmin();
  const [params, setParams] = useSearchParams();
  const qs = params.get('q') || '', level = params.get('level') || '', page = +(params.get('page') || 1);
  const [term, setTerm] = useState(qs);
  const [data, setData] = useState<ListResp | null>(null);
  const [err, setErr] = useState('');
  const [adding, setAdding] = useState(false);
  const [created, setCreated] = useState<{ id: number; email: string; tempPassword: string } | null>(null);
  const nav = useNavigate();
  const hue = new Map(courses.map(c => [c.id, c]));

  useEffect(() => {
    setErr('');
    api.get<ListResp>(`/users?${new URLSearchParams({ q: qs, level, page: String(page) })}`).then(setData).catch(e => setErr(e.message));
  }, [qs, level, page]);

  const update = (patch: Record<string, string>) => {
    const p = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    if (!('page' in patch)) p.delete('page');
    setParams(p);
  };
  const pages = data ? Math.max(1, Math.ceil(data.total / data.per)) : 1;

  return (
    <>
      <PageHead title="學員管理" sub={data ? `${level ? courseName(level) + ' 的學員' : '所有會員'}，共 ${data.total} 位` : ' '}
        actions={<button className="btn-primary" onClick={() => setAdding(true)}><UserPlus size={16} />新增學員</button>} />

      <form className="mb-4 flex flex-wrap gap-2" onSubmit={(e: FormEvent) => { e.preventDefault(); update({ q: term.trim() }); }}>
        <div className="relative min-w-[200px] flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" value={term} onChange={e => setTerm(e.target.value)} placeholder="搜尋 Email 或姓名" />
        </div>
        <select className="input w-auto" value={level} onChange={e => update({ level: e.target.value })}>
          <option value="">全部課程</option>
          {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button className="btn-outline" type="submit">搜尋</button>
      </form>

      <ErrorText msg={err} />
      <Section title="會員列表">
        {!data ? <Empty>載入中…</Empty> : data.rows.length === 0 ? <Empty>沒有符合的會員</Empty> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b border-stone-100 bg-stone-50/60"><tr><th className="th">會員</th><th className="th">已開通課程</th><th className="th">註冊</th><th className="th">最近學習</th></tr></thead>
              <tbody className="divide-y divide-stone-100">
                {data.rows.map(u => (
                  <tr key={u.id} className="cursor-pointer hover:bg-stone-50" onClick={() => nav(`/users/${u.id}`)}>
                    <td className="td">
                      <Link to={`/users/${u.id}`} className="font-medium hover:text-brand-600" onClick={e => e.stopPropagation()}>{u.name || '（未填姓名）'}</Link>
                      {u.isAdmin && <span className="badge ml-2 border-brand-100 bg-brand-50 text-brand-700">管理員</span>}
                      {u.disabled && <span className="badge ml-2 border-red-200 bg-red-50 text-red-700">已停用</span>}
                      <div className="text-xs text-slate-400">{u.email}</div>
                    </td>
                    <td className="td"><div className="flex flex-wrap gap-1">{u.levels.length ? u.levels.map(l => <CourseChip key={l} name={courseName(l)} hue={hue.get(l)?.hue} code={hue.get(l)?.code} />) : <span className="text-xs text-slate-400">—</span>}</div></td>
                    <td className="td whitespace-nowrap text-xs text-slate-500">{fmtDate(u.createdAt)}</td>
                    <td className="td whitespace-nowrap text-xs text-slate-500">{ago(u.active)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data && pages > 1 && (
          <div className="flex items-center justify-end gap-3 border-t border-stone-100 px-5 py-3 text-sm">
            <button className="btn-outline btn-sm" disabled={page <= 1} onClick={() => update({ page: String(page - 1) })}><ChevronLeft size={14} />上一頁</button>
            <span className="text-slate-500">第 {page}／{pages} 頁</span>
            <button className="btn-outline btn-sm" disabled={page >= pages} onClick={() => update({ page: String(page + 1) })}>下一頁<ChevronRight size={14} /></button>
          </div>
        )}
      </Section>

      {adding && <AddUser onClose={() => setAdding(false)} onCreated={r => { setAdding(false); setCreated(r); refreshCourses(); }} />}
      {created && <TempPassword email={created.email} password={created.tempPassword} onClose={() => { const id = created.id; setCreated(null); nav(`/users/${id}`); }} />}
    </>
  );
}

function AddUser({ onClose, onCreated }: { onClose: () => void; onCreated: (r: { id: number; email: string; tempPassword: string }) => void }) {
  const { courses } = useAdmin();
  const [email, setEmail] = useState(''), [name, setName] = useState(''), [note, setNote] = useState('');
  const [levels, setLevels] = useState<string[]>([]);
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault(); setBusy(true); setErr('');
    try {
      const r = await api.post<{ id: number; tempPassword: string }>('/users', { email, name, note, levels });
      onCreated({ ...r, email });
    } catch (e) { setErr((e as Error).message); setBusy(false); }
  };
  return (
    <Modal title="新增學員" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <p className="text-sm text-slate-500">建立帳號並直接開通課程，系統會產生臨時密碼讓你轉交學員。</p>
        <ErrorText msg={err} />
        <div><label className="label">Email</label><input className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} autoFocus /></div>
        <div><label className="label">姓名</label><input className="input" value={name} onChange={e => setName(e.target.value)} maxLength={40} /></div>
        <div>
          <label className="label">開通課程</label>
          <div className="grid grid-cols-2 gap-1.5 rounded-lg border border-stone-200 p-3 sm:grid-cols-3">
            {courses.map(c => (
              <label key={c.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={levels.includes(c.id)} onChange={e => setLevels(e.target.checked ? [...levels, c.id] : levels.filter(l => l !== c.id))} />{c.name}
              </label>
            ))}
          </div>
        </div>
        <div><label className="label">備註（選填，例如付款或訂單資訊）</label><input className="input" value={note} onChange={e => setNote(e.target.value)} maxLength={200} /></div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn-outline" onClick={onClose}>取消</button>
          <button className="btn-primary" disabled={busy}>{busy ? '建立中…' : '建立帳號'}</button>
        </div>
      </form>
    </Modal>
  );
}
