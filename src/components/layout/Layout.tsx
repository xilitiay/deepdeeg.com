import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

function Breadcrumbs() {
  const { pathname } = useLocation()
  if (pathname === '/') return null
  const segments = pathname.split('/').filter(Boolean)
  const labels: Record<string, string> = {
    category: '主题', region: '地区', news: '资讯', events: '多源聚焦',
    briefing: '今日简报', explore: '全部浏览', search: '搜索', interests: '兴趣设置',
    sources: '信源名录', source: '信源',
  }
  const names = segments.map((s) => labels[s] ?? decodeURIComponent(s))
  return (
    <div className="container breadcrumbs" style={{ paddingTop: 14 }}>
      <Link to="/">首页</Link>
      {names.map((n, i) => (
        <span key={i} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          <span>/</span><span>{n}</span>
        </span>
      ))}
    </div>
  )
}

export function Layout({ children, theme, onToggleTheme }: LayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <Breadcrumbs />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
