import { Link } from 'react-router-dom'
import { PageHero } from './shared'
import { useInterests } from '@/components/features/Recommendations'
import { trendingTags } from '@/data/selectors'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function InterestsPage() {
  const [interests, setInterests] = useInterests()
  const [saved] = useLocalStorage<string[]>('deepdeeg:saved', [])

  const all = [...new Set([...trendingTags, ...interests])]

  return (
    <div className="container">
      <PageHero
        eyebrow="PERSONALIZATION"
        title="兴趣设置"
        description="选择你关注的主题标签，首页推荐会据此调整。偏好仅保存在本地浏览器，不上传服务器。"
      />
      <div className="grid grid-2" style={{ marginTop: 24 }}>
        <div className="card" style={{ padding: 22 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 14px' }}>关注的标签</h2>
          <div className="tag-row">
            {all.map((tag) => (
              <button
                key={tag}
                className={`tag ${interests.includes(tag) ? 'active' : ''}`}
                onClick={() => setInterests((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])}
              >{interests.includes(tag) ? '✓ ' : '+ '}{tag}</button>
            ))}
          </div>
          <p style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 16 }}>当前已选 {interests.length} 个标签。</p>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 14px' }}>我的收藏</h2>
          {saved.length ? <p style={{ color: 'var(--text-2)' }}>已收藏 {saved.length} 篇文章，可在文章页取消收藏。</p> : <p style={{ color: 'var(--text-2)' }}>还没有收藏。在文章页点击"☆ 收藏"即可保存。</p>}
          <Link to="/explore" style={{ color: 'var(--brand)', fontWeight: 650, fontSize: 14 }}>去发现更多资讯 →</Link>
        </div>
      </div>
    </div>
  )
}
