import { Link, useLocation, useNavigate } from 'react-router-dom'
import { categories } from '@/data/taxonomy'
import type { Category } from '@/types'
import { useEffect, useState } from 'react'

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setSearchOpen(false); setMenuOpen(false) }, [location.pathname])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="site-header">
      <div className="container header-main">
        <Link to="/" className="brand" aria-label="deepdeeg 首页">
          <span className="brand-mark">d</span>
          <span>deepdeeg<span className="brand-sub">全球资讯站</span></span>
        </Link>
        <nav className="header-nav" aria-label="主导航">
          <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">首页</Link>
          <Link className={`nav-link ${location.pathname === '/briefing' ? 'active' : ''}`} to="/briefing">今日简报</Link>
          <Link className={`nav-link ${location.pathname.startsWith('/events') ? 'active' : ''}`} to="/events">多源聚焦</Link>
          <Link className={`nav-link ${location.pathname.startsWith('/source') ? 'active' : ''}`} to="/sources">信源</Link>
        </nav>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setSearchOpen((v) => !v)} aria-label="搜索" aria-expanded={searchOpen}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </button>
          <button className="icon-btn" onClick={onToggleTheme} aria-label="切换主题">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="icon-btn mobile-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="菜单">☰</button>
        </div>
      </div>

      <div className="header-sub">
        <div className="container header-sub-inner">
          {categories.map((c: Category) => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className={`sub-link ${location.pathname === `/category/${c.id}` ? 'active' : ''}`}
            >{c.label}</Link>
          ))}
          <span className="sub-sep">｜</span>
          <Link to="/explore" className={`sub-link ${location.pathname === '/explore' ? 'active' : ''}`}>全部浏览</Link>
          <Link to="/sources" className={`sub-link ${location.pathname.startsWith('/source') ? 'active' : ''}`}>信源名录</Link>
        </div>
      </div>

      {menuOpen && (
        <div className="search-panel">
          <div className="container">
            <nav className="header-nav" style={{ margin: 0, flexWrap: 'wrap' }}>
              <Link className="nav-link" to="/">首页</Link>
              <Link className="nav-link" to="/briefing">今日简报</Link>
              <Link className="nav-link" to="/events">多源聚焦</Link>
              <Link className="nav-link" to="/sources">信源名录</Link>
              <Link className="nav-link" to="/explore">全部浏览</Link>
            </nav>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="search-panel">
          <div className="container">
            <form onSubmit={submitSearch} style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-3)' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              </span>
              <input
                className="search-input"
                autoFocus
                placeholder="搜索标题、关键词或标签，例如 AI / 气候 / 芯片"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
            <div className="search-hint">按 Enter 搜索 · 支持标题与标签匹配</div>
          </div>
        </div>
      )}
    </header>
  )
}
