import { Link } from 'react-router-dom'
import { PageHero } from './shared'
import { briefing } from '@/data/events'
import { articleById } from '@/data/selectors'

export function BriefingPage() {
  return (
    <div className="container">
      <PageHero
        eyebrow="DAILY BRIEFING"
        title="今日简报"
        description={`${briefing.date} · 约 ${briefing.readSeconds} 秒读完今天。把最值得知道的事压缩成一条清晰的时间线。`}
      />
      <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr', gap: 24, marginTop: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <div className="briefing-timeline">
            {briefing.items.map((item) => (
              <div className="briefing-step" key={item.id}>
                <div className="briefing-time">{item.time}</div>
                <div className="briefing-headline">{item.headline}</div>
                <p style={{ margin: 0, color: 'var(--text-2)', fontSize: 14 }}>{item.detail}</p>
                {item.articleId && articleById.get(item.articleId) && (
                  <Link to={`/news/${articleById.get(item.articleId)!.slug}`} style={{ color: 'var(--brand)', fontSize: 13, fontWeight: 650 }}>阅读全文 →</Link>
                )}
              </div>
            ))}
          </div>
        </div>
        <aside>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>简报说明</h3>
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>简报由编辑部从当日多源报道中筛选整理，强调事实与时间线，减少重复标题带来的信息噪音。</p>
            <ul style={{ fontSize: 13, color: 'var(--text-2)', paddingLeft: 18, margin: '12px 0 0' }}>
              <li>每条要闻附原文入口</li>
              <li>可按标签继续深挖</li>
              <li>与多源聚焦互为补充</li>
            </ul>
          </div>
          <div className="card" style={{ padding: 20, marginTop: 16 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>继续浏览</h3>
            <div className="tag-row">
              <Link className="tag" to="/events">多源聚焦</Link>
              <Link className="tag" to="/explore">全部资讯</Link>
              <Link className="tag" to="/interests">兴趣设置</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
