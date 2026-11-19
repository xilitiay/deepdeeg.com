import { Link } from 'react-router-dom'
import { Layers, Clock } from 'lucide-react'
import { events, eventById } from '@/data/events'
import { getEventArticles } from '@/data/selectors'
import { sourceById, categoryById } from '@/data/taxonomy'
import { relativeTime } from '@/utils/time'

export function MultiSourceFocus({ limit = 3 }: { limit?: number }) {
  return (
    <div className="grid grid-3">
      {events.slice(0, limit).map((event) => {
        const articles = getEventArticles(event.articleIds)
        return (
          <article className="card event-card" key={event.id}>
            <div className="event-top">
              <div>
                <span className="eyebrow" style={{ fontSize: 10 }}>{categoryById.get(event.category)?.label} · 多源对照</span>
                <h3 className="event-title" style={{ marginTop: 6 }}>{event.title}</h3>
              </div>
              <div className="score-ring" title="公信力评分">{event.credibility}</div>
            </div>
            <p className="event-summary">{event.summary}</p>
            <div className="event-sources">
              {articles.map((a) => {
                const src = sourceById.get(a.sourceId)
                return <span className="source-pill" key={a.id}><span className="source-dot" style={{ background: src?.color }} />{src?.name}</span>
              })}
            </div>
            <div className="event-foot">
              <span><Layers size={13} style={{ verticalAlign: -2 }} /> {new Set(articles.map((a) => a.sourceId)).size} 家媒体</span>
              <span><Clock size={13} style={{ verticalAlign: -2 }} /> 跨度 {event.spanHours} 小时</span>
              <span>{relativeTime(event.startedAt)}</span>
            </div>
            <Link to={`/events#event-${event.slug}`} style={{ display: 'inline-block', marginTop: 10, color: 'var(--brand)', fontWeight: 700, fontSize: 13 }}>对比各家报道 →</Link>
          </article>
        )
      })}
    </div>
  )
}

export function getEventBySlug(slug: string) {
  return [...eventById.values()].find((e) => e.slug === slug)
}
