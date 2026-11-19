import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Article } from '@/types'
import { sourceById } from '@/data/taxonomy'
import { relativeTime } from '@/utils/time'

interface Props { items: Article[] }
const INTERVAL = 6000

export function BreakingCarousel({ items }: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState(false)
  const active = items[index]

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), INTERVAL)
    return () => window.clearInterval(id)
  }, [paused, items.length])

  if (!active) return null

  return (
    <section className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-main">
        <div className="thumb-full">
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${active.imageColor}, #0f172a)` }} />
          {!failed && <img src={active.image} alt="" onError={() => setFailed(true)} />}
        </div>
        <div className="hero-content">
          <span className="eyebrow" style={{ color: '#fca5a5' }}>突发要闻 · 自动轮播 · 共 {items.length} 条</span>
          <h2 className="hero-title">{active.title}</h2>
          <p className="hero-dek">{active.dek}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,.75)', fontSize: 12 }}>
            <span>{sourceById.get(active.sourceId)?.name}</span>
            <span>·</span><span>{relativeTime(active.publishedAt)}</span>
            <Link to={`/news/${active.slug}`} style={{ marginLeft: 8, color: '#fff', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,.6)' }}>阅读全文 →</Link>
          </div>
          <div className="carousel-dots" role="tablist" aria-label="轮播导航">
            {items.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`第 ${i + 1} 条`}
                aria-selected={i === index}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
      <aside className="hero-side" aria-label="突发列表">
        <div className="hero-side-head">
          <span className="hero-side-title">正在发生</span>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{paused ? '已暂停' : '自动播放'}</span>
        </div>
        {items.map((item, i) => (
          <Link
            key={item.id}
            to={`/news/${item.slug}`}
            className={`hero-item ${i === index ? 'active' : ''}`}
            onMouseEnter={() => setIndex(i)}
          >
            <span className="hero-item-index">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <p className="hero-item-title">{item.title}</p>
              <span className="hero-item-meta">{sourceById.get(item.sourceId)?.name} · {relativeTime(item.publishedAt)}</span>
            </div>
          </Link>
        ))}
      </aside>
    </section>
  )
}
