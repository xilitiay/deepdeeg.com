import { Link } from 'react-router-dom'
import { categories, regions, sources } from '@/data/taxonomy'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="brand" style={{ marginBottom: 10 }}>
              <span className="brand-mark">d</span>
              <span>deepdeeg</span>
            </div>
            <p style={{ maxWidth: 320 }}>实时聚合 · 环球要闻一站速览。用更少的时间，读懂更大的世界。</p>
            <p style={{ color: 'var(--text-3)', fontSize: 12 }}>本页面为架构与功能优化后的重构演示版本。</p>
          </div>
          <div className="footer-col">
            <h4>主题</h4>
            {categories.map((c) => <Link key={c.id} to={`/category/${c.id}`}>{c.label}</Link>)}
          </div>
          <div className="footer-col">
            <h4>地区</h4>
            {regions.map((r) => <Link key={r.id} to={`/region/${r.id}`}>{r.label}</Link>)}
          </div>
          <div className="footer-col">
            <h4>信源</h4>
            <Link to="/sources" style={{ fontWeight: 700 }}>信源名录 →</Link>
            {sources.slice(0, 5).map((s) => <Link key={s.id} to={`/source/${s.id}`}>{s.name}</Link>)}
          </div>
          <div className="footer-col">
            <h4>服务</h4>
            <Link to="/briefing">今日简报</Link>
            <Link to="/events">多源聚焦</Link>
            <Link to="/explore">全部资讯</Link>
            <Link to="/interests">兴趣设置</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} deepdeeg</span>
          <span>信息架构 / 技术架构 / 功能体验 优化重构</span>
        </div>
      </div>
    </footer>
  )
}
