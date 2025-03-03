'use client'

import ScrollToTopButton from '@/components/ScrollToTopButton'
import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import StoreListItem from '@/components/shared/StoreListItem'
import StoreListItemSkeleton from '@/components/shared/StoreListItemSkeleton'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { Store } from '@/models/store'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { useVirtualizer } from '@tanstack/react-virtual'
import { RefObject, useEffect } from 'react'

interface HomeSearchFoodListProps {
  data: Store[]
  hasNextPage: boolean
  isLoading: boolean
  targetRef: RefObject<HTMLDivElement | null>
  scrollRef: RefObject<HTMLDivElement | null>
}

const HomeSearchFoodList = ({
  data,
  isLoading,
  targetRef,
  scrollRef,
  hasNextPage,
}: HomeSearchFoodListProps) => {
  const { order, category } = useFoodSearchFilterStore()
  const { topRef, showScrollButton, scrollToTop } = useScrollToTop<HTMLParagraphElement>({})

  const saveScrollPosition = () => {
    if (scrollRef.current) {
      sessionStorage.setItem('homeListScrollPosition', scrollRef.current.scrollTop.toString())
    }
  }

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 120,
    overscan: 5,
  })

  useEffect(() => {
    scrollToTop()
  }, [order, category])

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      const hasVirtualItems = mutations.some(
        (mutation) =>
          mutation.addedNodes.length > 0 && (mutation.target as HTMLElement).children.length > 0
      )

      if (hasVirtualItems) {
        const savedScrollPosition = sessionStorage.getItem('homeListScrollPosition')
        if (savedScrollPosition && scrollRef.current) {
          scrollRef.current.scrollTop = parseInt(savedScrollPosition)
          sessionStorage.removeItem('homeListScrollPosition')
        }
        observer.disconnect()
      }
    })

    if (scrollRef.current) {
      observer.observe(scrollRef.current, { childList: true, subtree: true })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={scrollRef} className="flex flex-col overflow-y-auto px-mobile_safe">
      <p ref={topRef} className="pb-2 text-xl font-bold">
        개발의 민족 등록 맛집
      </p>
      <FoodOrderFilter />
      <div className="flex flex-col gap-3">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <StoreListItem
                store={data[virtualItem.index]}
                onBeforeNavigate={saveScrollPosition}
              />
            </div>
          ))}
        </div>
        {data.length === 0 && !hasNextPage && !isLoading && (
          <div className="mt-4 text-center text-gray-500">등록된 매장이 없어요</div>
        )}
        {isLoading && Array.from({ length: 5 }).map((_, i) => <StoreListItemSkeleton key={i} />)}
        <div ref={targetRef} />
      </div>
      {showScrollButton && <ScrollToTopButton onClick={scrollToTop} />}
    </div>
  )
}

export default HomeSearchFoodList
