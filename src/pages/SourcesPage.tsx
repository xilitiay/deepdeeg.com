import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, ExternalLink, Layers, Newspaper, ShieldCheck } from 'lucide-react'
import { PageHero } from './shared'
import { sourceStats, sourceCount, totalArticles, totalSourceEvents } from '@/data/selectors'
import { tierDescriptions, tierLabels, tierOrder } from '@/data/taxonomy'
import { relativeTime } from '@/utils/time'
import { categoryById } from '@/data/taxonomy'
import type { SourceTier } from '@/types'

type TierFilter = SourceTier | 'all'

export function SourcesPage() {
  const [tier, setTier] = useState<TierFilter>('all')

  const visibleTiers = useMemo(
    () => tierOrder.filter((t) => tier === 'all' || t === tier),
    [tier],
  )

  return (
    <div className="container">
      <PageHero
        eyebrow="SOURCE DIRECTORY"
        title="信源名录"
        description={`本站聚合 ${sourceCount} 家信源的 ${totalArticles} 篇报道。按类型浏览每家媒体的定位、报道量与可信度参考，点击可查看该信源的全部报道。`}
      />

      <div className="source-summary">
        <div><strong>{sourceCount}</strong><span>合作信源</span></div>
        <div><strong>{totalArticles}</strong><span>聚合报道</span></div>
        <div><strong>{tierOrder.length}</strong><span>信源类型</span></div>
        <div><strong>{totalSourceEvents}</strong><span>参与事件</span></div>
      </div>

      <div className="tier-filter" role="tablist" aria-label="按信源类型筛选">
        <button
          className={`tag ${tier === 'all' ? 'active' : ''}`}
          onClick={() => setTier('all')}
          role="tab"
          aria-selected={tier === 'all'}
        >全部 {sourceStats.length}</button>
        {tierOrder.map((t) => {
          const count = sourceStats.filter((s) => s.source.tier === t).length
          return (
            <button
              key={t}
              className={`tag ${tier === t ? 'active' : ''}`}
              onClick={() => setTier(t)}
              role="tab"
              aria-selected={tier === t}
            >{tierLabels[t]} {count}</button>
          )
        })}
      </div>

      {visibleTiers.map((t) => {
        const group = sourceStats.filter((s) => s.source.tier === t)
        if (!group.length) return null
        return (
          <section className="section" key={t}>
            <div className="section-head">
              <h2 className="section-title">{tierLabels[t]}</h2>
              <span className="section-kicker">{tierDescriptions[t]}</span>
              <span className="section-kicker">{group.length} 家</span>
            </div>
            <div className="source-grid">
              {group.map((stat) => {
                const s = stat.source
                const isInternal = s.url.startsWith('/')
                return (
                  <article className="card source-card" key={s.id} style={{ borderTopColor: s.color }}>
                    <div className="source-card-head">
                      <span className="source-mark" style={{ background: s.color }}>{s.name.charAt(0)}</span>
                      <div style={{ minWidth: 0 }}>
                        <h3 className="source-name">{s.name}</h3>
                        <span className="source-tier" style={{ color: s.color }}>{tierLabels[s.tier]} · {s.country}</span>
                      </div>
                    </div>
                    <p className="source-desc">{s.description}</p>
                    <div className="tag-row" style={{ marginBottom: 12 }}>
                      <span className="tag">{s.focus}</span>
                      {stat.categories.slice(0, 2).map((c) => (
                        <span className="tag" key={c}>{categoryById.get(c)?.label}</span>
                      ))}
                    </div>
                    <div className="source-stats">
                      <span title="聚合报道数"><Newspaper size={13} /> {stat.count} 篇</span>
                      <span title="公信力参考"><ShieldCheck size={13} /> {stat.avgCredibility || '—'}</span>
                      <span title="参与事件组数"><Layers size={13} /> {stat.eventCount} 组</span>
                    </div>
                    <div className="source-foot">
                      <span><Clock size={12} /> {stat.latestAt ? relativeTime(stat.latestAt) : '暂无'}</span>
                      <Link to={`/source/${s.id}`}>查看报道 <ArrowRight size={13} /></Link>
                    </div>
                    <a
                      className="source-external"
                      href={s.url}
                      target={isInternal ? undefined : '_blank'}
                      rel={isInternal ? undefined : 'noreferrer'}
                    >
                      {isInternal ? '浏览原创' : '访问官网'} <ExternalLink size={12} />
                    </a>
                  </article>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
