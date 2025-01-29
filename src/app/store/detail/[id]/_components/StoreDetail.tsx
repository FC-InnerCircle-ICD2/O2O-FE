'use client'

import useGetStoreDetail from '@/api/useGetStoreDetail'
import useGetStoreMenuCategory from '@/api/useGetStoreMenuCategory'
import MenuBottomSheet from '@/app/store/detail/[id]/_components/MenuBottomSheet'
import Icon from '@/components/Icon'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Separator from '@/components/Separator'
import { Skeleton } from '@/components/shadcn/skeleton'
import useBottomSheet from '@/hooks/useBottomSheet'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useThrottle } from '@/hooks/useThrottle'
import { useToast } from '@/hooks/useToast'
import { orderDetailStore } from '@/store/orderDetail'
import { COLORS } from '@/styles/color'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import MenuCategory from './MenuCategory'
import MenuItemSkeleton from './MenuItemSkeleton'
import StoreDetailMenuItem from './StoreDetailMenuItem'
import StoreHeader from './StoreHeader'
import StoreImage, { IMAGE_HEIGHT } from './StoreImage'
import StoreOrderDetail from './StoreOrderDetail'

const MAX_PULL_HEIGHT = 160
const BLUE_BOX_MAX_PULL = 300
const STICKY_HEADER_HEIGHT = 50 // 메뉴 카테고리 헤더의 높이
export const HEADER_HEIGHT = 50

const MENU_CATEGORIES = ['대표메뉴', '메인 메뉴', '세트 메뉴', '사이드 메뉴', '음료', '패키지']

const StoreDetail = ({ storeId }: { storeId: number }) => {
  const [pullHeight, setPullHeight] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [isHeaderOpaque, setIsHeaderOpaque] = useState(false)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const menuRefs = useRef<(HTMLDivElement | null)[]>([])

  const { storeDetail, resetStoreDetail, isSuccess } = useGetStoreDetail(storeId)
  const { storeMenuCategory } = useGetStoreMenuCategory(storeId)

  const { orderDetail } = orderDetailStore()
  const { BottomSheet, hide } = useBottomSheet()
  const { toast } = useToast()
  const { topRef, scrollToTop, showScrollButton } = useScrollToTop<HTMLDivElement>({
    callBack: () => {
      containerRef.current?.scrollTo({
        top: (topRef.current?.offsetTop || 0) + STICKY_HEADER_HEIGHT + HEADER_HEIGHT,
        behavior: 'smooth',
      })
    },
    dependencies: [storeMenuCategory]
  })

  useEffect(() => {
    if (storeMenuCategory && storeMenuCategory.length > 0) {
      const firstCategoryElement = document.querySelector(`[data-category="${storeMenuCategory[0].categoryId}"] p`)
      if (firstCategoryElement && topRef.current !== firstCategoryElement) {
        topRef.current = firstCategoryElement as HTMLParagraphElement
      }
    }
  }, [storeMenuCategory])

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
        setActiveCategoryIndex(i)
        return
      }
    }
  }, [activeCategoryIndex])

  const scrollToMenuTop = (index: number) => {
    const element = menuRefs.current[index]

    if (element && containerRef.current) {
      containerRef.current.scrollTo({
        top: element.offsetTop + STICKY_HEADER_HEIGHT + HEADER_HEIGHT,
      })
    }
  }

  const openBottomSheet = () => {
    BottomSheet({
      title: '전체 메뉴', content: <MenuBottomSheet
        menuList={storeMenuCategory?.map((category) => category.categoryName) || []} activeCategoryIndex={activeCategoryIndex} setActiveCategoryIndex={setActiveCategoryIndex}
        callback={scrollToMenuTop}
      />
    })
  }

  const handleScroll = useThrottle(updateActiveCategory, 50)

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

      const activeItem = menuContainerRef.current.querySelector(`[data-index="${activeCategoryIndex}"]`)
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
  }, [activeCategoryIndex])

  useEffect(() => {
    return () => {
      resetStoreDetail()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative size-full overflow-auto"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <StoreHeader isHeaderOpaque={isHeaderOpaque} isSuccess={isSuccess} title={storeDetail?.name || ''} />
      <StoreImage pullHeight={pullHeight} isSuccess={isSuccess} imageMain={storeDetail?.imageMain || ''} />

      <div
        className="relative z-10 w-full bg-white"
        style={{
          marginTop: `calc(${IMAGE_HEIGHT}px + ${Math.min(pullHeight * 0.7, BLUE_BOX_MAX_PULL)}px)`,
          minHeight: '1000px',
          transition: pullHeight === 0 ? 'margin-top 0.3s ease-out' : 'none',
        }}
      >
        {/* 가게 정보 */}
        <div className="flex flex-col items-center gap-2 pb-4 pt-6">
          {!storeDetail ? <Skeleton className="w-[200px] h-[40px] pb-2" /> : <p className="text-2xl font-bold pb-2">{storeDetail.name}</p>}
          <div className="flex items-center gap-2">
            {!storeDetail ? <Skeleton className='w-[123px] h-[26px] rounded-full py-1 pl-2 pr-1' /> :
              <div className="flex items-center gap-1 rounded-full border border-solid border-gray-300 py-1 pl-2 pr-1 text-xs" onClick={() => {
                toast({
                  description: '준비중입니다.',
                  position: 'center'
                })
              }}>
                <Icon name="Star" size={12} color={COLORS.primary} fill={COLORS.primary} />
                <div>
                  <span className="mr-1 font-semibold">리뷰 {storeDetail.rating}</span>
                  <span className="text-gray-600">({storeDetail.reviewCount})</span>
                </div>
                <Icon name="ChevronRight" size={16} />
              </div>}
            {!storeDetail ? <Skeleton className='w-[123px] h-[26px] rounded-full py-1 pl-2 pr-1' /> :
              <div className="flex items-center gap-1 rounded-full border border-solid border-gray-300 py-1 pl-2 pr-1 text-xs" onClick={() => {
                toast({
                  description: '준비중입니다.',
                  position: 'center'
                })
              }}>
                <Icon name="Store" size={12} />
                <div className="flex">
                  <span className="mr-1 font-bold">가게</span>
                  <span className="text-gray-600">(2.1km)</span>
                </div>
                <Icon name="ChevronRight" size={16} />
              </div>}
          </div>
        </div>

        {/* 메뉴 카테고리 */}
        <div className="top-detail_header sticky z-20 flex items-center justify-between border-b border-solid border-gray-200 bg-white py-2 shadow-sm">
          <div
            ref={menuContainerRef}
            className="flex flex-1 items-center gap-2 overflow-x-auto px-mobile_safe"
          >
            {!storeMenuCategory ? new Array(7).fill(0).map((dummy, index) => <Skeleton key={index} className='min-w-[65px] h-[28px] rounded-full' />) : storeMenuCategory.map((category, index) => (
              <MenuCategory
                key={category.categoryId}
                category={category.categoryName}
                index={index}
                isActive={activeCategoryIndex === index}
                onClick={() => {
                  setActiveCategoryIndex(index)
                  scrollToMenuTop(index)
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1 pr-1" onClick={openBottomSheet}>
            <Separator className="h-4" orientation="vertical" />
            <Icon name="Ellipsis" size={20} color={COLORS.gray600} />
          </div>
        </div>

        {/* 메뉴 */}
        <div className="flex flex-col gap-[10px] px-mobile_safe py-4">
          {!storeMenuCategory ? new Array(7).fill(0).map((dummy, index) => (
            <MenuItemSkeleton key={index} />
          )) : storeMenuCategory.map((category, index) => (
            <div
              key={category.categoryId}
              ref={(el) => {
                menuRefs.current[index] = el
              }}
              data-category={category.categoryId}
            >
              <p
                className="pt-1 pb-2 text-lg font-bold"
                ref={(el) => {
                  if (index === 0) {
                    topRef.current = el
                  }
                }}
              >
                {category.categoryName}
              </p>
              {category.menus.map((menu) => (
                <StoreDetailMenuItem key={menu.id} menu={menu} />
              ))}
            </div>
          ))}
        </div>

        {/* 경고 문구 */}
        <div className="px-mobile_safe pb-40">
          <p className="text-[10px] text-gray-500">
            메뉴 이미지는 이미지컷이며 실제 배달되는 음식과 다를 수 있습니다.
          </p>
        </div>

        {orderDetail && createPortal(<StoreOrderDetail />, document.body)}
        {showScrollButton && <ScrollToTopButton onClick={scrollToTop} hasBottomNavigation={false} />}
      </div>
    </div>
  )
}

export default StoreDetail




