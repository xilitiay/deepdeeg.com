import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// Route-level code splitting keeps the initial bundle focused on the homepage.
const BrowsePage = lazy(() => import('@/pages/BrowsePage').then((m) => ({ default: m.BrowsePage })))
const ArticlePage = lazy(() => import('@/pages/ArticlePage').then((m) => ({ default: m.ArticlePage })))
const EventsPage = lazy(() => import('@/pages/EventsPage').then((m) => ({ default: m.EventsPage })))
const SourcesPage = lazy(() => import('@/pages/SourcesPage').then((m) => ({ default: m.SourcesPage })))
const BriefingPage = lazy(() => import('@/pages/BriefingPage').then((m) => ({ default: m.BriefingPage })))
const InterestsPage = lazy(() => import('@/pages/InterestsPage').then((m) => ({ default: m.InterestsPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [pathname])
  return null
}

function AppShell() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('deepdeeg:theme', 'light')
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  return (
    <>
      <ScrollToTop />
      <Layout theme={theme} onToggleTheme={() => setTheme((t) => t === 'light' ? 'dark' : 'light')}>
        <Suspense fallback={<div className="container" style={{ padding: 60, textAlign: 'center' }}><div className="spinner" /></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:id" element={<BrowsePage mode="category" />} />
            <Route path="/region/:id" element={<BrowsePage mode="region" />} />
            <Route path="/sources" element={<SourcesPage />} />
            <Route path="/source/:id" element={<BrowsePage mode="source" />} />
            <Route path="/explore" element={<BrowsePage mode="explore" />} />
            <Route path="/search" element={<BrowsePage mode="search" />} />
            <Route path="/news/:slug" element={<ArticlePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/briefing" element={<BriefingPage />} />
            <Route path="/interests" element={<InterestsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default function App() {
  // Keep router in sync with Vite's base: /deepdeeg.com/ on Pages, / on Hostinger.
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
  return <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><AppShell /></BrowserRouter>
}
