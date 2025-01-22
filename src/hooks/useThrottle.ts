import { useCallback, useRef } from 'react'

export function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number) {
  const lastRun = useRef<number>(Date.now())
  const timeout = useRef<NodeJS.Timeout | null>(null)

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now()

    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    if (now - lastRun.current >= delay) {
      callback(...args)
      lastRun.current = now
    } else {
      timeout.current = setTimeout(() => {
        callback(...args)
        lastRun.current = Date.now()
      }, delay)
    }
  }, [callback, delay])
} 