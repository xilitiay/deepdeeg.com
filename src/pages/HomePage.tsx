import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlanceIcon } from './shared'
import { BreakingCarousel } from '@/components/features/BreakingCarousel'
import { BriefingBand } from '@/components/features/BriefingBand'
import { Recommendations, useInterests } from '@/components/features/Recommendations'
import { MultiSourceFocus } from '@/components/features/MultiSourceFocus'
import { SourceStrip } from '@/components/features/SourceStrip'
import { LatestFeed } from '@/components/features/LatestFeed'
import { ArticleCard } from '@/components/common/ArticleCard'
import { breakingArticles, editorialArticles, queryArticles, totalArticles, totalEvents } from '@/data/selectors'
import { regions, sources } from '@/data/taxonomy'

const ALL_INTERESTS = ['AI', '气候', '市场', '芯片', '监管', '航天', '文化', '开源']

export function HomePage() {
  const [interests, setInterests] = useInterests()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [refreshSeed, setRefreshSeed] = useState(0)
  const latest = useMemo(() => queryArticles({ sort: 'latest' }), [])
  const categoryFeeds = useMemo(() => ['world', 'tech', 'business', 'science', 'culture', 'sports'].map((id) => ({
    id, items: queryArticles({ category: id as never }).slice(0, 4),
  })), [])

  // scroll to recommendations when navigated with hash
  useEffect(() => {
    if (location.hash === '#recommend') document.getElementById('recommend')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="container" style={{ paddingTop: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <p style={{ margin: 0, color: 'var(--text-2)', fontSize: 14 }}>
          世界正在发生的事，此刻尽在 <strong>deepdeeg</strong> · 已聚合 {totalArticles} 条资讯 · {sources.length} 个信源 · {totalEvents} 组事件
        </p>
        <div className="tag-row">
          {regions.slice(0, 5).map((r) => <Link className="tag" key={r.id} to={`/region/${r.id}`}>{r.label}</Link>)}
          <Link className="tag" to="/region/middle-east">中东</Link>
        </div>
      </div>

      <BreakingCarousel items={breakingArticles} />

      <div className="section"><BriefingBand /></div>

      <section className="section" id="recommend">
        <Recommendations
          interests={interests}
          onOpenSettings={() => setSettingsOpen(true)}
          refreshSeed={refreshSeed}
          onRefresh={() => setRefreshSeed((s) => s + 1)}
        />
        {settingsOpen && (
          <div className="card" style={{ padding: 16, marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <strong>选择你感兴趣的标签</strong>
              <button className="tag" onClick={() => setSettingsOpen(false)}>完成</button>
            </div>
            <div className="tag-row">
              {ALL_INTERESTS.map((tag) => (
                <button
                  key={tag}
                  className={`tag ${interests.includes(tag) ? 'active' : ''}`}
                  onClick={() => setInterests((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])}
                >{interests.includes(tag) ? '✓ ' : '+ '}{tag}</button>
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10 }}>偏好保存在本地浏览器，不会上传。</div>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">多源聚焦</h2>
          <span className="section-kicker">同一件事，看各家怎么说</span>
          <Link to="/events" className="section-more">查看全部事件 →</Link>
        </div>
        <MultiSourceFocus />
      </section>

      <SourceStrip />

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">深度报道</h2>
          <span className="section-kicker">deepdeeg 编辑部二次原创 · 事实为重，独立成稿</span>
          <Link to="/explore?editorial=1" className="section-more">更多原创 →</Link>
        </div>
        <div className="grid grid-4">
          {editorialArticles.slice(0, 4).map((a) => <ArticleCard key={a.id} article={a} label="深度原创" />)}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">全球最新</h2>
          <span className="section-kicker">{latest.length} 条资讯 · 持续更新</span>
        </div>
        <LatestFeed items={latest} showRegion />
      </section>

      {categoryFeeds.map(({ id, items }) => (
        <section className="section" key={id}>
          <div className="section-head">
            <h2 className="section-title">{id === 'world' ? '环球' : id === 'tech' ? '科技' : id === 'business' ? '财经' : id === 'science' ? '科学' : id === 'culture' ? '文化' : '体育'}</h2>
            <span className="section-kicker">按主题浏览</span>
            <Link to={`/category/${id}`} className="section-more">进入频道 →</Link>
          </div>
          <div className="grid grid-4">
            {items.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        </section>
      ))}

      <div style={{ margin: '40px 0 10px', textAlign: 'center', color: 'var(--text-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <GlanceIcon /> 想按自己的规则浏览？<Link to="/explore" style={{ color: 'var(--brand)', fontWeight: 700 }}>打开统一浏览页 →</Link>
      </div>
    </div>
  )
}
