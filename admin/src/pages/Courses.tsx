import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { api, type CourseDetail } from '../lib/api';
import { hueBg } from '../lib/format';
import { PageHead, Bar, ErrorText } from '../components/ui';

export default function Courses() {
  const [list, setList] = useState<CourseDetail[] | null>(null);
  const [err, setErr] = useState('');
  useEffect(() => { api.get<{ courses: CourseDetail[] }>('/courses').then(r => setList(r.courses)).catch(e => setErr(e.message)); }, []);
  if (err) return <ErrorText msg={err} />;
  if (!list) return <div className="text-slate-400">載入中…</div>;

  return (
    <>
      <PageHead title="課程統計" sub={`${list.length} 門課程・開通人數與學員平均進度`} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map(c => (
          <article key={c.id} className="card overflow-hidden">
            <div className="relative h-20 px-4 py-3 text-white" style={{ background: hueBg(c.hue) }}>
              <div className="text-[11px] tracking-widest opacity-80">{c.catName}・{c.kind === 'cert' ? '證照備考' : '技能教學'}</div>
              <div className="absolute bottom-2 left-4 font-mono text-2xl font-medium">{c.code}</div>
              <a href={`/course/${c.id}`} target="_blank" rel="noreferrer" className="absolute right-3 top-3 opacity-70 hover:opacity-100" aria-label="開啟課程介紹頁"><ExternalLink size={15} /></a>
            </div>
            <div className="p-4">
              <h3 className="font-medium leading-snug">{c.title}</h3>
              <p className="mt-0.5 text-xs text-slate-400">{c.stats.chapters} 章・{c.stats.questions} 題・約 {c.stats.hours} 小時</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-stone-50 py-2"><dt className="text-[11px] text-slate-500">已開通</dt><dd className="font-mono text-lg tabular-nums">{c.enrolled}</dd></div>
                <div className="rounded-lg bg-stone-50 py-2"><dt className="text-[11px] text-slate-500">7 天活躍</dt><dd className="font-mono text-lg tabular-nums">{c.active7}</dd></div>
                <div className="rounded-lg bg-stone-50 py-2"><dt className="text-[11px] text-slate-500">已完課</dt><dd className="font-mono text-lg tabular-nums">{c.completed}</dd></div>
              </dl>
              <div className="mt-4 text-xs text-slate-500">
                <div className="mb-1 flex justify-between"><span>學員平均進度</span><span className="font-mono">{c.avgPct === null ? '—' : `${c.avgPct}%`}</span></div>
                <Bar pct={c.avgPct || 0} hue={c.hue} />
                <div className="mt-2 flex justify-between"><span>平均答對率</span><span className="font-mono">{c.avgAcc === null ? '—' : `${c.avgAcc}%`}</span></div>
              </div>
              <Link to={`/users?level=${c.id}`} className="btn-outline btn-sm mt-4 w-full">查看學員（{c.enrolled}）</Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
