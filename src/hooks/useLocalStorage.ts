import { useState, useEffect } from 'react'

/** Persisted state with graceful fallback when storage is unavailable or quota is exceeded. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage may be disabled; in-memory state still works */
    }
  }, [key, value])

  return [value, setValue] as const
}
