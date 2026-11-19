import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from './shared'
import { events } from '@/data/events'
import { getEventArticles } from '@/data/selectors'
import { sourceById, categoryById } from '@/data/taxonomy'
import { formatDate, relativeTime } from '@/utils/time'

export function EventsPage() {
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
    }
  }, [])

  return (
    <div className="container">
      <PageHero
        eyebrow="MULTI-SOURCE FOCUS"
        title="多源聚焦"
        description="同一件事，看各家怎么说。事件级聚合把分散报道组织成可对照的阅读单元，附公信力评分与报道时间跨度。"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 24 }}>
        {events.map((e) => {
          const articles = getEventArticles(e.articleIds)
          return (
            <section className="card" key={e.id} id={`event-${e.slug}`} style={{ padding: 22 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <span className="eyebrow">{categoryById.get(e.category)?.label} · 事件聚合</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-3)' }}>始于 {relativeTime(e.startedAt)}</span>
              </div>
              <h2 style={{ fontSize: 21, margin: '8px 0' }}>{e.title}</h2>
              <p style={{ color: 'var(--text-2)', margin: 0, maxWidth: 800 }}>{e.summary}</p>

              <div style={{ display: 'flex', gap: 20, marginTop: 14, flexWrap: 'wrap', fontSize: 13 }}>
                <span><strong style={{ color: 'var(--brand)' }}>{new Set(articles.map((a) => a.sourceId)).size}</strong> 家媒体覆盖</span>
                <span><strong style={{ color: 'var(--brand)' }}>{e.credibility}</strong> 公信力评分</span>
                <span><strong style={{ color: 'var(--brand)' }}>{e.spanHours}h</strong> 报道跨度</span>
              </div>

              <div className="timeline-list">
                {e.timeline.map((t, i) => (
                  <div className="timeline-row" key={i}><span className="timeline-time">{t.time}</span><span>{t.label}</span></div>
                ))}
              </div>

              <div className="compare-grid">
                {articles.map((a) => {
                  const src = sourceById.get(a.sourceId)
                  return (
                    <article className="card compare-card" key={a.id} style={{ boxShadow: 'none' }}>
                      <div className="meta" style={{ marginTop: 0 }}>
                        <span className="source-dot" style={{ background: src?.color }} />
                        <strong style={{ color: 'var(--text)' }}>{src?.name}</strong>
                        <span>·</span><span>{formatDate(a.publishedAt)}</span>
                      </div>
                      <h4 style={{ margin: '8px 0', fontSize: 15 }}><Link to={`/news/${a.slug}`} style={{ color: 'inherit' }}>{a.title}</Link></h4>
                      <p style={{ color: 'var(--text-2)', fontSize: 13, margin: 0 }}>{a.dek}</p>
                      <Link to={`/news/${a.slug}`} style={{ color: 'var(--brand)', fontSize: 12, fontWeight: 700, display: 'inline-block', marginTop: 8 }}>阅读原文 →</Link>
                    </article>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
