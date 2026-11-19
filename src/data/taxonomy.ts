import type { Category, Region, Source } from '@/types'

export const categories: Category[] = [
  { id: 'world', label: '环球', en: 'World', description: '政治、外交与国际重大事件', accent: '#3b82f6' },
  { id: 'tech', label: '科技', en: 'Technology', description: 'AI、芯片、航天与前沿创新', accent: '#8b5cf6' },
  { id: 'business', label: '财经', en: 'Business', description: '市场、贸易与宏观经济信号', accent: '#f59e0b' },
  { id: 'science', label: '科学', en: 'Science', description: '研究、医学与探索发现', accent: '#10b981' },
  { id: 'culture', label: '文化', en: 'Culture', description: '影视、艺术与生活方式', accent: '#ec4899' },
  { id: 'sports', label: '体育', en: 'Sports', description: '赛事、运动员与竞技瞬间', accent: '#06b6d4' },
]

export const regions: Region[] = [
  { id: 'global', label: '全球', en: 'Global', description: '跨地区与全球性议题' },
  { id: 'asia', label: '亚洲', en: 'Asia', description: '亚太地区的动态' },
  { id: 'europe', label: '欧洲', en: 'Europe', description: '欧洲大陆的动态' },
  { id: 'americas', label: '美洲', en: 'Americas', description: '南北美洲的动态' },
  { id: 'africa', label: '非洲', en: 'Africa', description: '非洲大陆的动态' },
  { id: 'oceania', label: '大洋洲', en: 'Oceania', description: '大洋洲地区的动态' },
  { id: 'middle-east', label: '中东', en: 'Middle East', description: '中东地区的动态' },
]

export const sources: Source[] = [
  { id: 'bbc-world', name: 'BBC World', tier: 'major', color: '#bb1919', description: '英国广播公司全球新闻服务，聚焦科技与社会领域的深度报道。', country: '英国', focus: '科技 · 社会', url: 'https://www.bbc.com/news' },
  { id: 'bbc-business', name: 'BBC Business', tier: 'major', color: '#c8102e', description: '专注市场、公司与宏观经济的商业新闻频道，擅长数据解读。', country: '英国', focus: '财经 · 市场', url: 'https://www.bbc.com/news/business' },
  { id: 'bbc-science', name: 'BBC Science', tier: 'specialist', color: '#7b2cbf', description: '科学、航天与环境领域的垂直报道，注重研究背后的证据与背景。', country: '英国', focus: '科学 · 航天', url: 'https://www.bbc.com/news/science_and_environment' },
  { id: 'bbc-culture', name: 'BBC Culture', tier: 'specialist', color: '#9c27b0', description: '聚焦电影、艺术、文学与生活方式的深度文化报道。', country: '英国', focus: '文化 · 艺术', url: 'https://www.bbc.com/culture' },
  { id: 'theverge', name: 'The Verge', tier: 'specialist', color: '#5c34d4', description: '科技与数字文化媒体，关注产品、平台与 Silicon Valley 动态。', country: '美国', focus: '科技 · 产品', url: 'https://www.theverge.com' },
  { id: 'france24', name: 'France 24', tier: 'major', color: '#e2231a', description: '法国国际新闻频道，提供欧洲与非洲事务的多语种报道。', country: '法国', focus: '欧洲 · 非洲', url: 'https://www.france24.com' },
  { id: 'espn', name: 'ESPN', tier: 'specialist', color: '#d50a0a', description: '全球体育媒体，覆盖赛事结果、运动员动态与联赛深度分析。', country: '美国', focus: '体育 · 赛事', url: 'https://www.espn.com' },
  { id: 'reuters', name: 'Reuters', tier: 'wire', color: '#ff6600', description: '全球性通讯社，以快速、克制的快讯与事实核查标准著称。', country: '英国', focus: '快讯 · 全球', url: 'https://www.reuters.com' },
  { id: 'ap', name: 'AP News', tier: 'wire', color: '#003366', description: '美国联合通讯社，提供覆盖全球的综合新闻与突发快讯。', country: '美国', focus: '快讯 · 综合', url: 'https://apnews.com' },
  { id: 'deepdeeg', name: 'deepdeeg 编辑部', tier: 'original', color: '#2563eb', description: '本站编辑部，基于多源事实进行二次原创整理与深度分析。', country: '本站', focus: '深度 · 原创', url: '/explore?editorial=1' },
]

export const tierLabels: Record<Source['tier'], string> = {
  wire: '通讯社',
  major: '主流媒体',
  specialist: '垂直媒体',
  original: '本站原创',
}

export const tierDescriptions: Record<Source['tier'], string> = {
  wire: '以速度与事实密度为核心，通常最先发出快讯',
  major: '综合型国际媒体，覆盖广、编辑流程成熟',
  specialist: '深耕单一领域，提供专业背景与深度解读',
  original: '本站编辑部基于多源材料独立成稿',
}

export const tierOrder: Source['tier'][] = ['wire', 'major', 'specialist', 'original']

export const categoryById = new Map(categories.map((c) => [c.id, c]))
export const regionById = new Map(regions.map((r) => [r.id, r]))
export const sourceById = new Map(sources.map((s) => [s.id, s]))
