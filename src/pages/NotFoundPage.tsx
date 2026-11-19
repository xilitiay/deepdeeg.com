import { Link } from 'react-router-dom'
import { PageHero } from './shared'

export function NotFoundPage() {
  return (
    <div className="container">
      <PageHero eyebrow="404" title="页面未找到" description="这个地址不存在，或内容已经移动。" />
      <div className="tag-row" style={{ marginTop: 20 }}>
        <Link className="tag active" to="/">回到首页</Link>
        <Link className="tag" to="/explore">全部资讯</Link>
        <Link className="tag" to="/events">多源聚焦</Link>
      </div>
    </div>
  )
}
