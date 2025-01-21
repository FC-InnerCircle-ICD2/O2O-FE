import React, { useRef, useState } from 'react'
import Icon from './Icon'

interface PullToRefreshProps {
  children: React.ReactNode
  scrollRef: React.RefObject<HTMLElement | null>
  onRefresh?: () => Promise<void>
}

const PullToRefresh = ({ children, onRefresh, scrollRef }: PullToRefreshProps) => {
  const spinnerRef = useRef<HTMLDivElement>(null)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [startX, setStartX] = useState(0)
  const [isVerticalScroll, setIsVerticalScroll] = useState(false)

  const threshold = 180 // 새로고침을 트리거할 거리 (픽셀)

  const isScrollAtTop = () => {
    if (scrollRef?.current) {
      return scrollRef.current.scrollTop <= 0
    }
    return false
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isScrollAtTop()) {
      setStartY(e.touches[0].clientY)
      setStartX(e.touches[0].clientX)
      setIsVerticalScroll(false)
      if (spinnerRef.current) {
        spinnerRef.current.style.transition = 'none'
        spinnerRef.current.style.opacity = '0'
        spinnerRef.current.style.transform = 'translateY(20px) scale(0.5)'
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startY) return

    const y = e.touches[0].clientY
    const x = e.touches[0].clientX
    const deltaY = y - startY
    const deltaX = x - startX

    if (!isVerticalScroll && (Math.abs(deltaY) > 10 || Math.abs(deltaX) > 10)) {
      setIsVerticalScroll(Math.abs(deltaY) > Math.abs(deltaX))
      setIsPulling(Math.abs(deltaY) > Math.abs(deltaX))
    }

    if (isVerticalScroll && isPulling) {
      setCurrentY(y)
      const distance = Math.max(0, deltaY)
      const showSpinnerThreshold = threshold * 0.3

      if (distance > 0 && spinnerRef.current) {
        const pullDistance = Math.min(distance, threshold * 1.5)
        const opacity =
          distance > showSpinnerThreshold
            ? Math.min((distance - showSpinnerThreshold) / (threshold / 2), 1)
            : 0
        const translateY = Math.max(20 - (distance / threshold) * 20, 0)
        const scale = 0.5 + Math.min(distance / threshold, 1) * 0.5

        spinnerRef.current.style.height = `${pullDistance * 0.5}px`
        spinnerRef.current.style.opacity = opacity.toString()
        spinnerRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`
      }
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling) return

    const distance = Math.max(0, currentY - startY)

    setIsPulling(false)

    if (spinnerRef.current) {
      spinnerRef.current.style.transition = 'all 0.3s ease'

      if (distance > threshold && onRefresh && !isRefreshing) {
        spinnerRef.current.style.height = '60px'
        spinnerRef.current.style.opacity = '1'
        spinnerRef.current.style.transform = 'translateY(0) scale(1)'
        setIsRefreshing(true)

        try {
          await onRefresh()
        } finally {
          spinnerRef.current.style.height = '0px'
          spinnerRef.current.style.opacity = '0'
          spinnerRef.current.style.transform = 'translateY(-20px) scale(0.5)'

          setTimeout(() => {
            setIsRefreshing(false)
          }, 300)
        }
      } else {
        spinnerRef.current.style.height = '0px'
        spinnerRef.current.style.opacity = '0'
        spinnerRef.current.style.transform = 'translateY(-20px) scale(0.5)'
      }
    }
  }

  return (
    <div
      className="h-full overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={spinnerRef}
        className="flex items-center justify-center overflow-hidden"
        style={{ height: 0 }}
      >
        {isRefreshing && <Icon className="animate-spin text-primary" name="Loader" size={40} />}
      </div>
      {children}
    </div>
  )
}

export default PullToRefresh
