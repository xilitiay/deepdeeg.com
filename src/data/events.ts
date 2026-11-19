import type { EventCluster, Briefing } from '@/types'

const now = Date.now()
const hoursAgo = (h: number) => new Date(now - h * 3600_000).toISOString()

export const events: EventCluster[] = [
  {
    id: 'e1', slug: 'anthropic-ipo-valuation',
    title: 'Anthropic 上市估值传闻',
    summary: '财经媒体给出估值区间，科技媒体更关注产品与竞争，中文原创则分析对行业生态的影响。',
    category: 'tech', region: 'americas', startedAt: hoursAgo(16),
    spanHours: 7.2, credibility: 91,
    articleIds: ['a002', 'a027', 'a028'],
    timeline: [
      { time: '前一日 18:00', label: '投行人士透露区间' },
      { time: '02:40', label: '英文财经媒体跟进' },
      { time: '09:10', label: '中文深度解读发布' },
    ],
  },
  {
    id: 'e2', slug: 'ai-act-guidelines',
    title: '欧盟 AI 法案实施细则',
    summary: '法律文本、行业反馈与中文解读构成三层信息，帮助读者理解合规成本的实际落点。',
    category: 'tech', region: 'europe', startedAt: hoursAgo(26),
    spanHours: 9.3, credibility: 92,
    articleIds: ['a011', 'a029', 'a030'],
    timeline: [
      { time: '前一日 10:00', label: '草案公开' },
      { time: '16:20', label: '企业反馈汇总' },
      { time: '08:30', label: '中文分析上线' },
    ],
  },
]

export const eventById = new Map(events.map((e) => [e.id, e]))
export const eventBySlug = new Map(events.map((e) => [e.slug, e]))

export const briefing: Briefing = {
  date: new Date().toISOString().slice(0, 10),
  readSeconds: 45,
  items: [
    { id: 'b1', time: '08:00', headline: 'Anthropic 估值或达 1.5 万亿美元', detail: '上市前估值传闻引发市场对 AI 板块重新定价。', articleId: 'a002' },
    { id: 'b2', time: '08:12', headline: '全球股指普遍上扬', detail: '降息预期升温，科技与金融板块领涨。', articleId: 'a003' },
    { id: 'b3', time: '08:25', headline: '欧盟发布 AI 法案细则草案', detail: '高风险系统合规路径进一步明确。', articleId: 'a011' },
    { id: 'b4', time: '08:38', headline: 'NASA 确认阿尔忒弥斯登月窗口', detail: '关键系统复核完成，载人任务进入准备阶段。', articleId: 'a012' },
  ],
}
