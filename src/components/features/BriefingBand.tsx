import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import { briefing } from '@/data/events'

export function BriefingBand() {
  return (
    <div className="briefing-band">
      <div style={{ background: 'rgba(255,255,255,.16)', padding: 12, borderRadius: 12 }}><Zap size={26} /></div>
      <div>
        <span style={{ fontSize: 12, opacity: .8, letterSpacing: 1 }}>TODAY'S BRIEFING</span>
        <h3>今日简报 · 60 秒读完今天</h3>
        <p>{briefing.items.length} 条核心要闻 · {briefing.date}</p>
      </div>
      <Link to="/briefing" className="briefing-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        查看简报 <ArrowRight size={16} />
      </Link>
    </div>
  )
}
