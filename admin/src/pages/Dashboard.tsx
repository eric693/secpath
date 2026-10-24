import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { api, type Overview } from '../lib/api';
import { ago, auditText, hueBg } from '../lib/format';
import { PageHead, Stat, Section, Empty, ErrorText } from '../components/ui';

// 兩條線：註冊（實線）、開通（虛線）；色票已通過色覺辨識檢查，另以線型做第二重區分
const C_SIGNUP = '#2d63ad', C_ENROLL = '#0e8a6f';

export default function Dashboard() {
  const [d, setD] = useState<Overview | null>(null);
  const [err, setErr] = useState('');
  useEffect(() => { api.get<Overview>('/overview').then(setD).catch(e => setErr(e.message)); }, []);
  if (err) return <ErrorText msg={err} />;
  if (!d) return <div className="text-slate-400">載入中…</div>;

  const t = d.totals;
  const trend = d.signups.map((s, i) => ({ date: s.date.slice(5).replace('-', '/'), 註冊: s.n, 開通: d.enrolls[i]?.n ?? 0 }));
  const maxEnrolled = Math.max(1, ...d.courses.map(c => c.enrolled));
  const sorted = [...d.courses].sort((a, b) => b.enrolled - a.enrolled);

  return (
    <>
      <PageHead title="總覽" sub="會員、課程開通與學習活躍狀況" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="會員總數" value={t.users} hint={`近 7 天新增 ${t.newUsers7} 位`} />
        <Stat label="課程開通數" value={t.enrollments} hint="兌換碼與管理員開通合計" />
        <Stat label="近 7 天學習人數" value={t.active7} hint="有同步學習進度的會員" />
        <Stat label="今日學習人數" value={t.active1} hint="過去 24 小時" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Section title="近 30 天註冊與開通" className="lg:col-span-3">
          <div className="h-64 px-2 pb-3 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#ececea" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6c7180' }} tickLine={false} axisLine={{ stroke: '#d3d1ca' }} interval={4} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#6c7180' }} tickLine={false} axisLine={false} width={40} />
                <Tooltip cursor={{ stroke: '#d3d1ca' }} contentStyle={{ borderRadius: 8, border: '1px solid #e6e5e0', fontSize: 12 }} />
                <Legend iconType="plainline" wrapperStyle={{ fontSize: 12, color: '#3a3f4b' }} />
                <Line type="monotone" dataKey="註冊" stroke={C_SIGNUP} strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }} />
                <Line type="monotone" dataKey="開通" stroke={C_ENROLL} strokeWidth={2} strokeDasharray="5 3" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="最新註冊" className="lg:col-span-2" actions={<Link to="/users" className="text-xs text-brand-600">全部學員</Link>}>
          {d.recentUsers.length ? (
            <ul className="divide-y divide-stone-100">
              {d.recentUsers.map(u => (
                <li key={u.id}>
                  <Link to={`/users/${u.id}`} className="flex items-center justify-between gap-3 px-5 py-2.5 hover:bg-stone-50">
                    <span className="min-w-0"><span className="block truncate text-sm font-medium">{u.name || '（未填姓名）'}</span><span className="block truncate text-xs text-slate-400">{u.email}</span></span>
                    <span className="shrink-0 text-xs text-slate-400">{ago(u.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <Empty>還沒有會員註冊</Empty>}
        </Section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Section title="各課程開通人數" className="lg:col-span-3" actions={<Link to="/courses" className="text-xs text-brand-600">課程統計</Link>}>
          <ul className="space-y-2.5 px-5 py-4">
            {sorted.map(c => (
              <li key={c.id} className="grid grid-cols-[110px_1fr_48px] items-center gap-3 text-sm sm:grid-cols-[140px_1fr_56px]">
                <Link to={`/users?level=${c.id}`} className="truncate hover:text-brand-600">{c.name}</Link>
                <div className="h-2 rounded-full bg-stone-100">
                  <div className="h-full rounded-full" style={{ width: `${(c.enrolled / maxEnrolled) * 100}%`, background: hueBg(c.hue), minWidth: c.enrolled ? 6 : 0 }} title={`${c.name}：${c.enrolled} 人`} />
                </div>
                <span className="text-right font-mono tabular-nums text-slate-700">{c.enrolled}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="最近動態" className="lg:col-span-2">
          {d.recentAudit.length ? (
            <ul className="divide-y divide-stone-100">
              {d.recentAudit.map(a => (
                <li key={a.id} className="px-5 py-2.5 text-sm">
                  <div className="flex justify-between gap-3">
                    {a.userId ? <Link to={`/users/${a.userId}`} className="truncate font-medium hover:text-brand-600">{a.userName || a.userEmail}</Link> : <span>—</span>}
                    <span className="shrink-0 text-xs text-slate-400">{ago(a.at)}</span>
                  </div>
                  <div className="text-xs text-slate-500">{auditText(a)}{a.actor && a.actor !== a.userEmail ? `・由 ${a.actor}` : ''}</div>
                </li>
              ))}
            </ul>
          ) : <Empty>尚無動態</Empty>}
        </Section>
      </div>
    </>
  );
}
