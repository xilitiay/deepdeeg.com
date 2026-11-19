import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Article } from '@/types'
import { sourceById } from '@/data/taxonomy'
import { relativeTime } from '@/utils/time'

interface ThumbProps {
  article: Article
  label?: string
  breaking?: boolean
}

/** Reserves aspect ratio to prevent layout shift; degrades to a color block if the image fails. */
export function Thumb({ article, label, breaking }: ThumbProps) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="thumb">
      <div className="thumb-placeholder" style={{ background: `linear-gradient(135deg, ${article.imageColor}, #0f172a)` }} />
      {!failed && (
        <img
          src={article.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {(label || breaking) && <span className={`thumb-label ${breaking ? 'breaking' : ''}`}>{label ?? '突发'}</span>}
    </div>
  )
}

interface MetaProps {
  article: Article
  showReading?: boolean
}

export function MetaLine({ article, showReading = true }: MetaProps) {
  const source = sourceById.get(article.sourceId)
  return (
    <div className="meta">
      {source && <><span className="source-dot" style={{ background: source.color }} />{source.name}</>}
      <span className="meta-dot" />
      <span>{relativeTime(article.publishedAt)}</span>
      {showReading && <><span className="meta-dot" /><span>{article.readMinutes} 分钟阅读</span></>}
    </div>
  )
}

interface CardProps {
  article: Article
  variant?: 'default' | 'large'
  label?: string
}

export function ArticleCard({ article, variant = 'default', label }: CardProps) {
  return (
    <Link className="card" to={`/news/${article.slug}`} aria-label={article.title}>
      <Thumb article={article} label={label} breaking={article.breaking && !label} />
      <div className="card-body">
        <h3 className={`card-title ${variant === 'large' ? 'large' : ''}`}>{article.title}</h3>
        {variant === 'large' && <p className="card-dek">{article.dek}</p>}
        <MetaLine article={article} />
      </div>
    </Link>
  )
}
