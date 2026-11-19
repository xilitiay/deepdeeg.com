import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Article, CategoryId, RegionId } from '@/types'
import { Thumb, MetaLine } from '@/components/common/ArticleCard'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { categoryById, regionById } from '@/data/taxonomy'

const PAGE = 8

interface Props {
  items: Article[]
  showRegion?: boolean
}

/** Incrementally renders the feed; only the sentinel is observed, not every row. */
export function LatestFeed({ items, showRegion = false }: Props) {
  const [visible, setVisible] = useState(PAGE)

  useEffect(() => { setVisible(PAGE) }, [items])

  const shown = useMemo(() => items.slice(0, visible), [items, visible])
  const hasMore = visible < items.length
  const sentinel = useIntersectionObserver(
    () => { if (hasMore) setVisible((v) => v + PAGE) },
  )

  return (
    <>
      <div className="card" style={{ overflow: 'visible' }}>
        {shown.map((a) => (
          <Link className="list-item" to={`/news/${a.slug}`} key={a.id} style={{ padding: '14px 18px' }}>
            <Thumb article={a} />
            <div className="list-item-body">
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
                <span className="tag">{categoryById.get(a.category as CategoryId)?.label}</span>
                {showRegion && a.regions[0] && <span className="tag">{regionById.get(a.regions[0] as RegionId)?.label}</span>}
              </div>
              <h3 className="list-item-title">{a.title}</h3>
              <p className="card-dek" style={{ fontSize: 13 }}>{a.dek}</p>
              <MetaLine article={a} showReading={false} />
            </div>
          </Link>
        ))}
      </div>
      {hasMore ? (
        <div ref={sentinel}>
          <button className="load-more" onClick={() => setVisible((v) => v + PAGE)}>
            加载更多 · 还剩 {items.length - visible} 条
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '18px', color: 'var(--text-3)', fontSize: 13 }}>已显示全部 {items.length} 条资讯</div>
      )}
    </>
  )
}
