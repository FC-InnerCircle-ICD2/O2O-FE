'use client'

import Icon from '@/components/Icon'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Separator from '@/components/Separator'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useThrottle } from '@/hooks/useThrottle'
import { cn } from '@/lib/utils'
import { COLORS } from '@/styles/color'
import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import StoreDetailMenuItem from './StoreDetailMenuItem'
import StoreHeader from './StoreHeader'
import StoreImage, { IMAGE_HEIGHT } from './StoreImage'

const MAX_PULL_HEIGHT = 160
const BLUE_BOX_MAX_PULL = 300
const HEADER_HEIGHT = 50
const STICKY_HEADER_HEIGHT = 50 // 메뉴 카테고리 헤더의 높이

const MENU_CATEGORIES = ['대표메뉴', '메인 메뉴', '세트 메뉴', '사이드 메뉴', '음료', '패키지']

const StoreDetail = () => {
  const [pullHeight, setPullHeight] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [isHeaderOpaque, setIsHeaderOpaque] = useState(false)
  const [activeCategory, setActiveCategory] = useState('대표메뉴')

  const containerRef = useRef<HTMLDivElement>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const menuRefs = useRef<(HTMLDivElement | null)[]>([])

  const { topRef, scrollToTop, showScrollButton } = useScrollToTop<HTMLDivElement>(() => {
    containerRef.current?.scrollTo({
      top: (topRef.current?.offsetTop || 0) + STICKY_HEADER_HEIGHT + HEADER_HEIGHT,
      behavior: 'smooth'
    })
  })

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

  const updateActiveCategory = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const scrollPosition = container.scrollTop
    const threshold = IMAGE_HEIGHT - HEADER_HEIGHT
    setIsHeaderOpaque(scrollPosition >= threshold)

    for (let i = menuRefs.current.length - 1; i >= 0; i--) {
      const ref = menuRefs.current[i]
      if (!ref) return

      const offsetTop = ref.offsetTop + 91 + 10 - 1

      if (offsetTop <= scrollPosition) {
        setActiveCategory(ref.getAttribute('data-category') || activeCategory)
        return
      }
    }
  }, [activeCategory])

  const handleScroll = useThrottle(updateActiveCategory, 100)

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
  }, [touchStart, handleScroll])

  useEffect(() => {
    // 약간의 지연 시간을 주어 DOM이 확실히 렌더링되도록 함
    const timeoutId = setTimeout(() => {
      if (!menuContainerRef.current) return

      const activeItem = menuContainerRef.current.querySelector('[data-active="true"]')
      if (!activeItem) return

      const container = menuContainerRef.current
      const containerWidth = container.offsetWidth
      const itemLeft = activeItem.getBoundingClientRect().left
      const containerLeft = container.getBoundingClientRect().left
      const scrollLeft =
        itemLeft - containerLeft - containerWidth / 2 + (activeItem as HTMLElement).offsetWidth / 2

      container.scrollTo({
        left: container.scrollLeft + scrollLeft,
        behavior: 'smooth',
      })
    }, 100) // 100ms 지연

    return () => clearTimeout(timeoutId)
  }, [activeCategory])

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
          minHeight: '1000px',
          transition: pullHeight === 0 ? 'margin-top 0.3s ease-out' : 'none',
        }}
      >
        {/* 가게 정보 */}
        <div className="flex flex-col items-center gap-2 pt-6 pb-4">
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

        {/* 메뉴 카테고리 */}
        <div className="sticky top-detail_header  py-2 border-b border-solid bg-white border-gray-200 shadow-sm z-20 flex items-center justify-between">
          <div ref={menuContainerRef} className="px-mobile_safe flex items-center gap-2 flex-1 overflow-x-auto">
            {MENU_CATEGORIES.map((category, index) => (
              <MenuCategory
                key={category}
                category={category}
                setActiveCategory={setActiveCategory}
                isActive={activeCategory === category}
                onClick={() => {
                  setActiveCategory(category)
                  const element = menuRefs.current[index]
                  const container = containerRef.current
                  if (element && container) {
                    container.scrollTo({
                      top: element.offsetTop + STICKY_HEADER_HEIGHT + HEADER_HEIGHT,
                    })
                  }
                }}
              />
            ))}
          </div>
          <div className="flex items-center pr-1 gap-1">
            <Separator className='h-4' orientation="vertical" />
            <Icon name="Ellipsis" size={20} color={COLORS.gray600} />
          </div>
        </div>

        {/* 메뉴 */}
        <div className="flex flex-col gap-[10px] py-4 px-mobile_safe">

          {MENU_CATEGORIES.map((category, index) => (
            <div
              key={category}
              ref={(el) => {
                menuRefs.current[index] = el
              }}
              data-category={category}
            >
              <p className="text-lg font-bold pb-2" ref={el => {
                if (index === 0) {
                  topRef.current = el
                }
              }}>{category}</p>
              {new Array(3).fill(0).map((_, index) => (
                <StoreDetailMenuItem key={index} />
              ))}
            </div>
          ))}
        </div>

        {/* 경고 문구 */}
        <div className='px-mobile_safe pb-40'>
          <p className='text-[10px] text-gray-500'>메뉴 이미지는 이미지컷이며 실제 배달되는 음식과 다를 수 있습니다.</p>
        </div>

        {showScrollButton && <ScrollToTopButton onClick={scrollToTop} />}
      </div>
    </div>
  )
}

export default StoreDetail

interface MenuCategoryProps {
  category: string
  isActive?: boolean
  setActiveCategory: (category: string) => void
  onClick: () => void
}

const MenuCategory = ({ category, setActiveCategory, isActive, onClick }: MenuCategoryProps) => {
  return (
    <motion.span
      className={cn(
        'flex min-w-fit cursor-pointer items-center text-xs px-2 py-1 rounded-full tracking-wide transition-colors duration-200',
        isActive && 'bg-black text-white font-semibold'
      )}
      onClick={onClick}
      data-active={isActive}
      whileTap={{ scale: 0.95 }}
    >
      {category}
    </motion.span>
  )
}
