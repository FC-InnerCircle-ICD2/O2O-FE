import { useEffect, useRef, useState } from 'react'

export const useScrollToTop = () => {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollButton(!entry.isIntersecting)
      },
      {
        threshold: 0.9,
      },
    )

    if (topRef.current) {
      observer.observe(topRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    topRef,
    showScrollButton,
    scrollToTop,
  }
}
