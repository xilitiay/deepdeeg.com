import { useEffect, useRef } from 'react'

/** Fires once when the sentinel enters the viewport; used for incremental feed loading. */
export function useIntersectionObserver(
  onIntersect: () => void,
  options: IntersectionObserverInit = {},
) {
  const ref = useRef<HTMLDivElement | null>(null)
  const cb = useRef(onIntersect)
  cb.current = onIntersect

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) cb.current()
      },
      { rootMargin: '400px', ...options },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
