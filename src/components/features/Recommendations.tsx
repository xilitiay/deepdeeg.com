import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw, SlidersHorizontal } from 'lucide-react'
import { ArticleCard } from '@/components/common/ArticleCard'
import { queryArticles, trendingTags } from '@/data/selectors'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface Props {
  interests: string[]
  onOpenSettings: () => void
  refreshSeed: number
  onRefresh: () => void
}

export function Recommendations({ interests, onOpenSettings, refreshSeed, onRefresh }: Props) {
  const items = useMemo(() => {
    const pool = queryArticles({ query: interests[0] })
    const rotated = [...pool.slice(refreshSeed % Math.max(pool.length, 1)), ...pool.slice(0, refreshSeed % Math.max(pool.length, 1))]
    return rotated.slice(0, 3)
  }, [interests, refreshSeed])

  return (
    <>
      <div className="section-head">
        <h2 className="section-title">为你推荐</h2>
        <span className="section-kicker">基于你关注的标签</span>
        <button className="section-more" style={{ background: 'none', border: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }} onClick={onOpenSettings}>
          <SlidersHorizontal size={14} /> 调整兴趣
        </button>
        <button className="section-more" style={{ background: 'none', border: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }} onClick={onRefresh}>
          <RefreshCw size={14} /> 换一批
        </button>
      </div>
      <div className="tag-row" style={{ marginBottom: 14 }}>
        {(interests.length ? interests : trendingTags.slice(0, 3)).map((tag) => <span className="tag active" key={tag}>{tag}</span>)}
      </div>
      <div className="grid grid-3">
        {items.map((a) => <ArticleCard key={a.id} article={a} />)}
      </div>
      {!items.length && <div className="empty">暂时没有匹配的资讯，试试其他兴趣标签。</div>}
      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-3)' }}>
        想管理长期偏好？前往 <Link to="/interests" style={{ color: 'var(--brand)' }}>兴趣设置</Link>。
      </div>
    </>
  )
}

export function useInterests() {
  return useLocalStorage<string[]>('deepdeeg:interests', ['AI', '气候', '市场'])
}
