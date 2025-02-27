import { useEffect, useRef, useState } from 'react'

interface ScrollToTopProps {
  dependencies?: any
  callBack?: () => void
}

export const useScrollToTop = <T extends HTMLElement>({
  dependencies,
  callBack,
}: ScrollToTopProps) => {
  const topRef = useRef<T>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (entry.isIntersecting) {
          setShowScrollButton(false)
          return
        }
        const bottomNavHeight = 56 // bottom_navigation height from tailwind config
        const isAboveViewport =
          entry.boundingClientRect.bottom <
          window.innerHeight - bottomNavHeight - entry.boundingClientRect.height

        setShowScrollButton(isAboveViewport)
      },
      {
        // viewport 상단 근처에서 관찰
        rootMargin: '0px',
        threshold: 1,
      }
    )

    if (topRef.current) {
      observer.observe(topRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [dependencies])

  const scrollToTop = () => {
    if (callBack) {
      callBack()
    } else if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    topRef,
    showScrollButton,
    scrollToTop,
  }
}
