import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function GlanceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function SectionHead({ title, kicker, moreTo, moreLabel }: {
  title: string; kicker?: string; moreTo?: string; moreLabel?: string
}) {
  return (
    <div className="section-head">
      <h2 className="section-title">{title}</h2>
      {kicker && <span className="section-kicker">{kicker}</span>}
      {moreTo && <Link to={moreTo} className="section-more">{moreLabel ?? '查看更多 →'}</Link>}
    </div>
  )
}

export function PageHero({ eyebrow, title, description, children }: {
  eyebrow: string; title: string; description: string; children?: ReactNode
}) {
  return (
    <div className="page-hero">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  )
}
