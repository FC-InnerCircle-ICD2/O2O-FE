import { useCallback, useRef } from 'react'

const useDebounce = <T extends () => void>(callback: T, delay: number = 500) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedCallback = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      callback()
    }, delay)
  }, [callback, delay])

  return debouncedCallback
}

export default useDebounce
