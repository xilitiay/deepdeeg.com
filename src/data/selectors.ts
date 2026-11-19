import { articles, articleById, articleBySlug } from './articles'
export { articleById, articleBySlug }
import { events } from './events'
import { sources } from './taxonomy'
import type { Article, CategoryId, RegionId, SourceStat } from '@/types'

/** Pre-built indexes keep hot-path filtering O(1) instead of re-scanning the collection. */
export const byCategory = new Map<CategoryId, Article[]>()
export const byRegion = new Map<RegionId, Article[]>()
export const bySource = new Map<string, Article[]>()

for (const a of articles) {
  const cat = byCategory.get(a.category) ?? []
  cat.push(a)
  byCategory.set(a.category, cat)

  for (const r of a.regions) {
    const reg = byRegion.get(r) ?? []
    reg.push(a)
    byRegion.set(r, reg)
  }

  const src = bySource.get(a.sourceId) ?? []
  src.push(a)
  bySource.set(a.sourceId, src)
}

/** Precomputed source metrics — one pass at module load, O(1) lookup at render time. */
export const sourceStats: SourceStat[] = sources.map((source) => {
  const items = bySource.get(source.id) ?? []
  const scored = items.filter((a) => typeof a.credibility === 'number')
  const latestAt = items.reduce(
    (latest, a) => (a.publishedAt > latest ? a.publishedAt : latest),
    items[0]?.publishedAt ?? '',
  )
  return {
    source,
    count: items.length,
    latestAt,
    categories: [...new Set(items.map((a) => a.category))],
    avgCredibility: scored.length
      ? Math.round(scored.reduce((sum, a) => sum + (a.credibility ?? 0), 0) / scored.length)
      : 0,
    eventCount: events.filter((e) => e.articleIds.some((id) => items.some((a) => a.id === id))).length,
  }
}).sort((a, b) => b.count - a.count)

export const sourceStatById = new Map(sourceStats.map((s) => [s.source.id, s]))
export const featuredSources = sourceStats.slice(0, 6)
export const totalSourceEvents = sourceStats.reduce((sum, s) => sum + s.eventCount, 0)

export function getSourceStat(id: string) {
  return sourceStatById.get(id)
}

export function getSourceArticles(id: string) {
  return bySource.get(id) ?? []
}

const byTime = [...articles].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))

export interface FeedQuery {
  category?: CategoryId | 'all'
  region?: RegionId | 'all'
  source?: string | 'all'
  tag?: string
  query?: string
  sort?: 'latest' | 'credibility' | 'read'
}

/** Single query entry point used by home, category, region, explore and search pages. */
export function queryArticles(q: FeedQuery = {}): Article[] {
  let pool: Article[] = byTime
  if (q.category && q.category !== 'all') pool = byCategory.get(q.category) ?? []
  if (q.region && q.region !== 'all') pool = pool.filter((a) => a.regions.includes(q.region as RegionId))
  if (q.source && q.source !== 'all') pool = pool.filter((a) => a.sourceId === q.source)
  if (q.tag) pool = pool.filter((a) => a.tags.includes(q.tag!))
  if (q.query) {
    const needle = q.query.trim().toLowerCase()
    pool = pool.filter((a) =>
      [a.title, a.dek, ...a.tags].some((s) => s.toLowerCase().includes(needle)),
    )
  }
  if (q.sort === 'credibility') pool = [...pool].sort((a, b) => (b.credibility ?? 60) - (a.credibility ?? 60))
  if (q.sort === 'read') pool = [...pool].sort((a, b) => a.readMinutes - b.readMinutes)
  return pool
}

export const breakingArticles = articles.filter((a) => a.breaking)
export const editorialArticles = articles.filter((a) => a.editorial)
export const trendingTags = ['AI', '气候', '监管', '市场', '芯片', '航天']

export function getArticle(id: string) {
  return articleById.get(id)
}

export function getEventArticles(ids: string[]) {
  return ids.map((id) => articleById.get(id)).filter((a): a is Article => Boolean(a))
}

export function getRelatedArticles(article: Article, limit = 4) {
  return queryArticles({ category: article.category })
    .filter((a) => a.id !== article.id)
    .slice(0, limit)
}

export const sourceCount = sources.length
export const totalArticles = articles.length
export const totalEvents = events.length
