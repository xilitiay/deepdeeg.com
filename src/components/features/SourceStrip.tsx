import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper } from 'lucide-react'
import { featuredSources, sourceCount } from '@/data/selectors'
import { tierLabels } from '@/data/taxonomy'

export function SourceStrip() {
  return (
    <section className="section">
      <div className="section-head">
        <h2 className="section-title">信源板块</h2>
        <span className="section-kicker">追踪 {sourceCount} 家媒体的报道脉络</span>
        <Link to="/sources" className="section-more">查看全部信源 →</Link>
      </div>
      <div className="source-strip">
        {featuredSources.map(({ source: s, count, avgCredibility }) => (
          <Link className="source-strip-card" to={`/source/${s.id}`} key={s.id}>
            <span className="source-mark" style={{ background: s.color }}>{s.name.charAt(0)}</span>
            <div style={{ minWidth: 0 }}>
              <strong className="source-strip-name">{s.name}</strong>
              <span className="source-strip-tier" style={{ color: s.color }}>{tierLabels[s.tier]} · {s.country}</span>
            </div>
            <div className="source-strip-meta">
              <span><Newspaper size={12} /> {count} 篇</span>
              <span>公信力 {avgCredibility || '—'}</span>
            </div>
            <ArrowRight size={15} className="source-strip-arrow" />
          </Link>
        ))}
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10 }}>
        按<Link to="/sources" style={{ color: 'var(--brand)', margin: '0 4px' }}>信源类型</Link>浏览，或在<Link to="/explore" style={{ color: 'var(--brand)', margin: '0 4px' }}>全部浏览</Link>中按信源筛选。
      </p>
    </section>
  )
}
