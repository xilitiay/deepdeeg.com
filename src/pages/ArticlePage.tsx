import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { articleBySlug, getRelatedArticles } from '@/data/selectors'
import { sourceById, categoryById } from '@/data/taxonomy'
import { formatDate } from '@/utils/time'
import { ArticleCard, MetaLine } from '@/components/common/ArticleCard'
import { PageHero } from './shared'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function ArticlePage() {
  const { slug } = useParams()
  const article = slug ? articleBySlug.get(slug) : undefined
  const [progress, setProgress] = useState(0)
  const [saved, setSaved] = useLocalStorage<string[]>('deepdeeg:saved', [])

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? Math.min(100, Math.round((h.scrollTop / max) * 100)) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  useEffect(() => {
    document.title = article ? `${article.title} · deepdeeg` : '资讯未找到 · deepdeeg'
  }, [article])

  if (!article) {
    return <div className="container"><PageHero eyebrow="404" title="资讯未找到" description="该链接可能已失效。" /><Link to="/" style={{ color: 'var(--brand)' }}>返回首页 →</Link></div>
  }

  const source = sourceById.get(article.sourceId)
  const related = getRelatedArticles(article)
  const isSaved = saved.includes(article.id)

  return (
    <div className="container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="article-wrap">
        <div className="page-hero" style={{ paddingTop: 26 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link className="tag" to={`/category/${article.category}`}>{categoryById.get(article.category)?.label}</Link>
            {article.regions.map((r) => <Link key={r} className="tag" to={`/region/${r}`}>{r}</Link>)}
            {article.editorial && <span className="tag active">编辑部原创</span>}
          </div>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-dek">{article.dek}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <MetaLine article={article} />
            <button className="tag" onClick={() => setSaved((prev) => isSaved ? prev.filter((id) => id !== article.id) : [...prev, article.id])}>
              {isSaved ? '★ 已收藏' : '☆ 收藏'}
            </button>
          </div>
        </div>

        <div className="article-hero">
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${article.imageColor}, #0f172a)` }} />
          <img src={article.image} alt="" />
        </div>

        <div className="reading-note">
          本文由 {source?.name} 提供信息素材{article.editorial ? '，deepdeeg 编辑部二次原创整理' : ''}。阅读约 {article.readMinutes} 分钟 · 发布于 {formatDate(article.publishedAt)}
        </div>

        {/* Body is rendered as plain text only — no images are placed inside article content by design. */}
        <article className="article-body">
          {article.body.map((p, i) => <p key={i}>{p}</p>)}
        </article>

        <div className="article-tags tag-row">
          {article.tags.map((t) => <Link key={t} className="tag" to={`/explore?tag=${encodeURIComponent(t)}`}>#{t}</Link>)}
        </div>

        {article.credibility && (
          <div className="card" style={{ padding: 16, marginTop: 24 }}>
            <strong style={{ fontSize: 14 }}>来源可信度</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <div style={{ flex: 1, height: 8, borderRadius: 8, background: 'var(--surface-3)', overflow: 'hidden' }}>
                <div style={{ width: `${article.credibility}%`, height: '100%', background: 'linear-gradient(90deg, var(--brand), #10b981)' }} />
              </div>
              <strong style={{ color: 'var(--brand)' }}>{article.credibility}</strong>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '8px 0 0' }}>综合多源交叉验证、来源历史与报道一致性得出的参考分。</p>
          </div>
        )}

        <section className="related">
          <div className="section-head"><h2 className="section-title">相关阅读</h2><Link to="/explore" className="section-more">全部资讯 →</Link></div>
          <div className="grid grid-2">{related.map((a) => <ArticleCard key={a.id} article={a} />)}</div>
        </section>
      </div>
    </div>
  )
}
