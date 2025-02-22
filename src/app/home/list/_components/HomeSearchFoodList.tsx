'use client'

import ScrollToTopButton from '@/components/ScrollToTopButton'
import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import StoreListItem from '@/components/shared/StoreListItem'
import StoreListItemSkeleton from '@/components/shared/StoreListItemSkeleton'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { Store } from '@/models/store'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
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

  useEffect(() => {
    scrollToTop()
  }, [order, category])

  return (
    <div ref={scrollRef} className="flex flex-col overflow-y-auto px-mobile_safe">
      <p ref={topRef} className="pb-2 text-lg font-bold">
        개발의 민족 등록 맛집
      </p>
      <FoodOrderFilter />
      <div className="flex flex-col gap-3">
        {data.map((store, index) => (
          <StoreListItem key={`${store.id}-${index}`} store={store} />
        ))}
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
