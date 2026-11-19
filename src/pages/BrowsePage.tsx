import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArticleCard } from '@/components/common/ArticleCard'
import { LatestFeed } from '@/components/features/LatestFeed'
import { PageHero } from './shared'
import { categories, categoryById, regions, regionById, sources, sourceById, tierLabels } from '@/data/taxonomy'
import { getSourceStat, queryArticles } from '@/data/selectors'
import { relativeTime } from '@/utils/time'
import type { CategoryId, RegionId } from '@/types'

type Mode = 'category' | 'region' | 'source' | 'explore' | 'search'

export function BrowsePage({ mode }: { mode: Mode }) {
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value === 'all' || !value) next.delete(key); else next.set(key, value)
    const qs = next.toString()
    if (mode === 'source' && key === 'source') {
      navigate(value === 'all' ? '/sources' : `/source/${value}`)
    } else if (mode === 'explore') {
      navigate(`/explore${qs ? `?${qs}` : ''}`)
    } else {
      navigate(`${location.pathname}${qs ? `?${qs}` : ''}`)
    }
  }
  const categoryParam = mode === 'category' ? params.id : searchParams.get('category') ?? undefined
  const regionParam = mode === 'region' ? params.id : searchParams.get('region') ?? undefined
  const sourceParam = mode === 'source' ? params.id : searchParams.get('source') ?? undefined
  const tagParam = searchParams.get('tag') ?? undefined
  const queryParam = mode === 'search' ? searchParams.get('q') ?? '' : searchParams.get('q') ?? undefined
  const editorialOnly = searchParams.get('editorial') === '1'

  const [sort, setSort] = useState<'latest' | 'credibility' | 'read'>((searchParams.get('sort') as never) || 'latest')

  const cat = categoryParam ? categoryById.get(categoryParam as CategoryId) : undefined
  const reg = regionParam ? regionById.get(regionParam as RegionId) : undefined
  const src = sourceParam ? sourceById.get(sourceParam) : undefined
  const srcStat = sourceParam ? getSourceStat(sourceParam) : undefined

  const items = useMemo(() => {
    const base = queryArticles({
      category: categoryParam as CategoryId ?? 'all',
      region: regionParam as RegionId ?? 'all',
      source: sourceParam,
      tag: tagParam,
      query: queryParam,
      sort,
    })
    return editorialOnly ? base.filter((a) => a.editorial) : base
  }, [categoryParam, regionParam, sourceParam, tagParam, queryParam, editorialOnly, sort])

  useEffect(() => {
    document.title = `${mode === 'search' ? `搜索: ${queryParam}` : mode === 'source' ? src?.name ?? '信源' : cat?.label ?? reg?.label ?? '全部浏览'} · deepdeeg`
  }, [cat, reg, src, queryParam, mode])

  const eyebrow = mode === 'search' ? 'SEARCH' : mode === 'explore' ? 'EXPLORE'
    : mode === 'region' ? 'REGION' : mode === 'source' ? 'SOURCE' : 'TOPIC'
  const title = mode === 'search' ? `“${queryParam}” 的搜索结果`
    : mode === 'explore' ? '全部浏览'
    : mode === 'region' ? `${reg?.label ?? '地区'}资讯`
    : mode === 'source' ? `${src?.name ?? '信源'} 的全部报道`
    : `${cat?.label ?? '主题'}资讯`
  const description = mode === 'search' ? `在标题、摘要与标签中匹配 ${items.length} 条资讯。`
    : mode === 'explore' ? '一个入口，按主题、地区、信源与排序自由组合，替代分散的栏目迷宫。'
    : mode === 'region' ? (reg?.description ?? '')
    : mode === 'source' ? (src?.description ?? '')
    : (cat?.description ?? '')

  return (
    <div className="container">
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      {mode === 'explore' && (
        <div className="tag-row" style={{ marginTop: 16 }}>
          <Link className="tag" to="/explore">全部主题</Link>
          {categories.map((c) => (
            <Link key={c.id} className={`tag ${categoryParam === c.id ? 'active' : ''}`} to={`/explore?category=${c.id}`}>{c.label}</Link>
          ))}
          <span style={{ color: 'var(--text-3)', margin: '0 4px' }}>·</span>
          {regions.map((r) => (
            <Link key={r.id} className={`tag ${regionParam === r.id ? 'active' : ''}`} to={`/explore?region=${r.id}`}>{r.label}</Link>
          ))}
        </div>
      )}

      {mode === 'source' && src && (
        <div className="source-profile" style={{ marginTop: 18 }}>
          <span className="source-mark large" style={{ background: src.color }}>{src.name.charAt(0)}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="source-tier" style={{ color: src.color }}>
              {tierLabels[src.tier]} · {src.country} · {src.focus}
            </div>
            <p style={{ margin: '6px 0 8px', color: 'var(--text-2)', fontSize: 14 }}>{src.description}</p>
            <div className="source-stats">
              <span>{srcStat?.count ?? 0} 篇报道</span>
              <span>公信力 {srcStat?.avgCredibility || '—'}</span>
              <span>参与 {srcStat?.eventCount ?? 0} 组事件</span>
              <span>最近更新 {srcStat?.latestAt ? relativeTime(srcStat.latestAt) : '暂无'}</span>
            </div>
          </div>
          <Link to="/sources" className="tag">← 信源名录</Link>
        </div>
      )}

      <div className="filter-bar">
        <select className="filter-select" value={categoryParam ?? 'all'} onChange={(e) => setParam('category', e.target.value)} aria-label="按主题筛选">
          <option value="all">全部主题</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <select className="filter-select" value={sourceParam ?? 'all'} onChange={(e) => setParam('source', e.target.value)} aria-label="按信源筛选">
          <option value="all">全部信源</option>
          {sources.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value as never)} aria-label="排序">
          <option value="latest">最新发布</option>
          <option value="credibility">公信力优先</option>
          <option value="read">最短阅读</option>
        </select>
        {editorialOnly && <span className="tag active">仅看原创</span>}
        {tagParam && <span className="tag active">标签：{tagParam}</span>}
        <span className="result-count">共 {items.length} 条 · 按 {sort === 'latest' ? '时间' : sort === 'credibility' ? '公信力' : '阅读时长'} 排序</span>
      </div>

      {(mode === 'category' || mode === 'source') && (
        <div className="grid grid-3" style={{ marginBottom: 24 }}>
          {items.slice(0, 3).map((a) => <ArticleCard key={a.id} article={a} variant="large" />)}
        </div>
      )}

      {items.length ? <LatestFeed items={(mode === 'category' || mode === 'source') ? items.slice(3) : items} showRegion /> : (
        <div className="empty">没有找到匹配的资讯。试试更换关键词或筛选条件。</div>
      )}

      <div style={{ marginTop: 24, fontSize: 13, color: 'var(--text-2)' }}>
        也可以直接前往 <Link to="/sources" style={{ color: 'var(--brand)' }}>信源名录</Link>、<Link to="/interests" style={{ color: 'var(--brand)' }}>兴趣设置</Link> 或 <Link to="/events" style={{ color: 'var(--brand)' }}>多源聚焦</Link>。
      </div>
    </div>
  )
}
