'use client'

import Icon from '@/components/Icon'
import { COLORS } from '@/styles/color'
import { useEffect, useRef, useState } from 'react'
import StoreHeader from './StoreHeader'
import StoreImage, { IMAGE_HEIGHT } from './StoreImage'

const MAX_PULL_HEIGHT = 160
const BLUE_BOX_MAX_PULL = 300
const HEADER_HEIGHT = 50

const StoreDetail = () => {
  const [pullHeight, setPullHeight] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [isHeaderOpaque, setIsHeaderOpaque] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: TouchEvent) => {
    const container = containerRef.current
    if (!container || container.scrollTop > 0 || e.touches[0].clientY <= IMAGE_HEIGHT) return
    setTouchStart(e.touches[0].clientY)
  }

  const handleTouchMove = (e: TouchEvent) => {
    const container = containerRef.current
    if (!container || touchStart === 0) return

    if (container.scrollTop === 0) {
      const currentY = e.touches[0].clientY
      const pull = Math.max(0, currentY - touchStart)

      if (pull > 0) {
        e.preventDefault()
        setPullHeight(Math.min(pull * 0.5, MAX_PULL_HEIGHT))
      }
    }
  }

  const handleTouchEnd = () => {
    setTouchStart(0)
    setPullHeight(0)
  }

  const handleScroll = () => {
    const container = containerRef.current
    if (!container) return

    const scrollPosition = container.scrollTop
    const threshold = IMAGE_HEIGHT - HEADER_HEIGHT
    setIsHeaderOpaque(scrollPosition >= threshold)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [touchStart])

  return (
    <div
      ref={containerRef}
      className="relative size-full overflow-auto"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <StoreHeader isHeaderOpaque={isHeaderOpaque} />
      <StoreImage pullHeight={pullHeight} />

      <div
        className="relative z-10 w-full bg-white"
        style={{
          marginTop: `calc(${IMAGE_HEIGHT}px + ${Math.min(pullHeight * 0.7, BLUE_BOX_MAX_PULL)}px)`,
          height: '1000px',
          transition: pullHeight === 0 ? 'margin-top 0.3s ease-out' : 'none',
        }}
      >
        <div className="flex flex-col items-center gap-2 pt-6">
          <p className="text-lg font-bold">비비큐치킨</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-solid border-gray-300 py-1 pl-2 pr-1 text-xs">
              <Icon name="Star" size={12} color={COLORS.primary} fill={COLORS.primary} />
              <div>
                <span className="mr-1 font-semibold">리뷰 5.0</span>
                <span className="text-gray-600">(109)</span>
              </div>
              <Icon name="ChevronRight" size={16} />
            </div>
            <div className="flex items-center gap-1 rounded-full border border-solid border-gray-300 py-1 pl-2 pr-1 text-xs">
              <Icon name="Store" size={12} />
              <div className="flex">
                <span className="mr-1 font-bold">가게</span>
                <span className="text-gray-600">(2.1km)</span>
              </div>
              <Icon name="ChevronRight" size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreDetail
