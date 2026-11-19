export type CategoryId =
  | 'world'
  | 'tech'
  | 'business'
  | 'science'
  | 'culture'
  | 'sports'

export type RegionId =
  | 'global'
  | 'asia'
  | 'europe'
  | 'americas'
  | 'africa'
  | 'oceania'
  | 'middle-east'

export type SourceTier = 'wire' | 'major' | 'specialist' | 'original'

export interface Source {
  id: string
  name: string
  tier: SourceTier
  color: string
  description: string
  country: string
  focus: string
  url: string
}

export interface SourceStat {
  source: Source
  count: number
  latestAt: string
  categories: CategoryId[]
  avgCredibility: number
  eventCount: number
}

export interface Article {
  id: string
  slug: string
  title: string
  dek: string
  category: CategoryId
  regions: RegionId[]
  sourceId: string
  publishedAt: string
  readMinutes: number
  /** The article's ONLY image — used as cover in detail view and thumbnail in cards. */
  image: string
  imageColor: string
  tags: string[]
  breaking?: boolean
  editorial?: boolean
  featured?: boolean
  credibility?: number
  /** Plain-text paragraphs only. Images, HTML and markup are strictly forbidden here. */
  body: string[]
  relatedEventId?: string
}

export interface EventCluster {
  id: string
  slug: string
  title: string
  summary: string
  category: CategoryId
  region: RegionId
  startedAt: string
  spanHours: number
  credibility: number
  articleIds: string[]
  timeline: { time: string; label: string }[]
}

export interface BriefingItem {
  id: string
  time: string
  headline: string
  detail: string
  articleId?: string
}

export interface Briefing {
  date: string
  readSeconds: number
  items: BriefingItem[]
}

export interface Category {
  id: CategoryId
  label: string
  en: string
  description: string
  accent: string
}

export interface Region {
  id: RegionId
  label: string
  en: string
  description: string
}
