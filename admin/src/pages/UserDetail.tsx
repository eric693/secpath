import { useEffect, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, KeyRound, ShieldCheck, ShieldOff, Ban, CheckCircle2, Pencil } from 'lucide-react';
import { api, type UserDetail as Detail } from '../lib/api';
import { useAdmin } from '../lib/admin';
import { ago, auditText, fmtDateTime } from '../lib/format';
import { Section, CourseChip, Bar, Modal, Empty, ErrorText, TempPassword } from '../components/ui';

export default function UserDetail() {
  const { id } = useParams();
  const { me, courses, refreshCourses } = useAdmin();
  const [d, setD] = useState<Detail | null>(null);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [temp, setTemp] = useState('');
  const [editing, setEditing] = useState(false);
  const [add, setAdd] = useState({ level: '', note: '' });
  const hue = new Map(courses.map(c => [c.id, c]));

  useEffect(() => { api.get<Detail>(`/users/${id}`).then(setD).catch(e => setErr(e.message)); }, [id]);

  // 所有操作都回傳最新的會員資料
  const act = async (path: string, body: object = {}, ok = '', confirmText = '') => {
    if (confirmText && !confirm(confirmText)) return;
    setErr(''); setMsg('');
    try {
      const r = await api.post<Detail>(`/users/${id}/${path}`, body);
      setD(r);
      if (r.tempPassword) setTemp(r.tempPassword);
      if (ok) setMsg(ok);
      if (['enroll', 'unenroll'].includes(path)) refreshCourses();
    } catch (e) { setErr((e as Error).message); }
  };

  if (!d) return err ? <ErrorText msg={err} /> : <div className="text-slate-400">載入中…</div>;
  const u = d.user, self = me?.id === u.id;
  const enrolled = new Set(d.enrollments.map(e => e.level));
  const available = courses.filter(c => !enrolled.has(c.id));

  return (
    <>
      <Link to="/users" className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"><ArrowLeft size={14} />學員列表</Link>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-serif text-2xl font-bold">{u.name || '（未填姓名）'}</h1>
            {u.isAdmin && <span className="badge border-brand-100 bg-brand-50 text-brand-700">管理員</span>}
            {u.disabled ? <span className="badge border-red-200 bg-red-50 text-red-700">已停用</span> : <span className="badge border-emerald-200 bg-emerald-50 text-emerald-700">使用中</span>}
          </div>
          <p className="mt-1 break-all text-sm text-slate-500">{u.email}</p>
          <p className="mt-1 text-xs text-slate-400">註冊於 {fmtDateTime(u.createdAt)}・最近上線 {ago(u.lastSeen)}・登入方式：{[u.hasPassword && 'Email 密碼', u.google && 'Google'].filter(Boolean).join('、') || '—'}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-outline" onClick={() => setEditing(true)}><Pencil size={15} />編輯資料</button>
          <button className="btn-outline" onClick={() => act('reset', {}, '', `確定重設 ${u.email} 的密碼？該會員所有裝置都會被登出。`)}><KeyRound size={15} />重設密碼</button>
          {!self && <button className="btn-outline" onClick={() => act('admin', {}, u.isAdmin ? '已取消管理員' : '已設為管理員', u.isAdmin ? '確定取消管理員權限？' : '確定設為管理員？管理員可進入所有課程與後台。')}>{u.isAdmin ? <ShieldOff size={15} /> : <ShieldCheck size={15} />}{u.isAdmin ? '取消管理員' : '設為管理員'}</button>}
          {!self && (u.disabled
            ? <button className="btn-outline" onClick={() => act('disable', {}, '已重新啟用帳號')}><CheckCircle2 size={15} />重新啟用</button>
            : <button className="btn-danger" onClick={() => act('disable', {}, '已停用帳號', '確定停用這個帳號？會員將無法登入。')}><Ban size={15} />停用帳號</button>)}
        </div>
      </div>

      {msg && <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{msg}</p>}
      <div className="mb-4"><ErrorText msg={err} /></div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Section title={`已開通課程（${d.enrollments.length}）`} className="lg:col-span-2">
          {d.enrollments.length ? (
            <ul className="divide-y divide-stone-100">
              {d.enrollments.map(e => (
                <li key={e.level} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <CourseChip name={e.name} hue={hue.get(e.level)?.hue} code={hue.get(e.level)?.code} />
                    <div className="mt-1 text-xs text-slate-400">{e.source === 'code' ? '兌換碼' : '管理員開通'}・{fmtDateTime(e.createdAt)}{e.note && `・${e.note}`}</div>
                  </div>
                  <button className="btn-danger btn-sm" onClick={() => act('unenroll', { level: e.level }, `已移除 ${e.name}`, `確定移除「${e.name}」？學習進度會保留。`)}>移除</button>
                </li>
              ))}
            </ul>
          ) : <Empty>{u.isAdmin ? '管理員可進入所有課程' : '尚未開通任何課程'}</Empty>}
          {available.length > 0 && (
            <form className="space-y-2 border-t border-stone-100 px-5 py-4" onSubmit={(ev: FormEvent) => { ev.preventDefault(); if (add.level) { act('enroll', add, '已開通課程'); setAdd({ level: '', note: '' }); } }}>
              <select className="input" value={add.level} onChange={e => setAdd({ ...add, level: e.target.value })} required>
                <option value="">選擇要開通的課程</option>
                {available.map(c => <option key={c.id} value={c.id}>{c.name}｜{c.title}</option>)}
              </select>
              <div className="flex gap-2">
                <input className="input" placeholder="備註（選填）" value={add.note} onChange={e => setAdd({ ...add, note: e.target.value })} maxLength={200} />
                <button className="btn-primary shrink-0">開通</button>
              </div>
            </form>
          )}
        </Section>

        <Section title="學習狀況" className="lg:col-span-3">
          {d.progress.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="border-b border-stone-100 bg-stone-50/60"><tr><th className="th">課程</th><th className="th">章節進度</th><th className="th">練習</th><th className="th">模擬考</th><th className="th">最後同步</th><th className="th" /></tr></thead>
                <tbody className="divide-y divide-stone-100">
                  {d.progress.map(p => (
                    <tr key={p.level}>
                      <td className="td"><div className="font-medium">{p.name}</div>{!enrolled.has(p.level) && !u.isAdmin && <span className="badge border-amber-200 bg-amber-50 text-amber-700">未開通</span>}</td>
                      <td className="td w-40"><Bar pct={p.pct} hue={hue.get(p.level)?.hue} /><div className="mt-1 text-xs text-slate-500">{p.done}／{p.total} 章・{p.pct}%</div></td>
                      <td className="td text-xs text-slate-600 whitespace-nowrap">{p.answered} 題<br />答對率 {p.acc === null ? '—' : `${p.acc}%`}・錯題 {p.wrongNow}</td>
                      <td className="td text-xs text-slate-600 whitespace-nowrap">{p.exams ? <>{p.exams} 次<br />最高 {p.best} 分</> : '—'}</td>
                      <td className="td text-xs text-slate-500 whitespace-nowrap">{ago(p.updatedAt)}<br />學習 {p.days} 天</td>
                      <td className="td"><button className="text-xs text-red-600 hover:underline" onClick={() => act('clear', { level: p.level }, '已清除學習進度', `確定清除「${p.name}」的學習進度？無法復原。`)}>清除</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <Empty>尚無學習紀錄。會員登入後在課程中學習，進度就會同步到這裡。</Empty>}
        </Section>
      </div>

      <Section title="操作紀錄" className="mt-6">
        {d.audit.length ? (
          <ul className="divide-y divide-stone-100">
            {d.audit.map(a => (
              <li key={a.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-2.5 text-sm">
                <span>{auditText(a)}</span>
                <span className="text-xs text-slate-400">{a.actor || '本人／系統'}・{fmtDateTime(a.at)}</span>
              </li>
            ))}
          </ul>
        ) : <Empty>沒有紀錄</Empty>}
      </Section>

      {editing && <EditUser name={u.name} email={u.email} onClose={() => setEditing(false)} onSave={async (name, email) => { await act('update', { name, email }, '已更新會員資料'); setEditing(false); }} />}
      {temp && <TempPassword email={u.email} password={temp} onClose={() => setTemp('')} />}
    </>
  );
}

function EditUser({ name, email, onClose, onSave }: { name: string; email: string; onClose: () => void; onSave: (n: string, e: string) => Promise<void> }) {
  const [n, setN] = useState(name), [e, setE] = useState(email);
  return (
    <Modal title="編輯會員資料" onClose={onClose}>
      <form className="space-y-4" onSubmit={ev => { ev.preventDefault(); onSave(n, e); }}>
        <div><label className="label">姓名</label><input className="input" value={n} onChange={x => setN(x.target.value)} maxLength={40} /></div>
        <div><label className="label">Email（登入帳號）</label><input className="input" type="email" required value={e} onChange={x => setE(x.target.value)} /></div>
        <div className="flex justify-end gap-2"><button type="button" className="btn-outline" onClick={onClose}>取消</button><button className="btn-primary">儲存</button></div>
      </form>
    </Modal>
  );
}
