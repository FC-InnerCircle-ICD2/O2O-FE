'use client'

import ScrollToTopButton from '@/components/ScrollToTopButton'
import StoreListItem from '@/components/shared/StoreListItem'
import StoreListItemSkeleton from '@/components/shared/StoreListItemSkeleton'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { Store } from '@/models/store'
import { RefObject } from 'react'

interface HomeSearchFoodListProps {
  data: Store[]
  isLoading: boolean
  targetRef: RefObject<HTMLDivElement | null>
}

const HomeSearchFoodList = ({ data, isLoading, targetRef }: HomeSearchFoodListProps) => {
  const { topRef, showScrollButton, scrollToTop } = useScrollToTop()

  return (
    <div className="flex flex-col gap-4 overflow-y-auto px-mobile_safe pt-2">
      <p ref={topRef} className="text-lg font-bold">
        개발의 민족 등록 맛집
      </p>
      <div className="flex flex-col gap-3">
        {data.map((store) => (
          <StoreListItem key={store.id} store={store} />
        ))}
        {isLoading && Array.from({ length: 5 }).map((_, i) => <StoreListItemSkeleton key={i} />)}
        <div ref={targetRef} />
      </div>
      {showScrollButton && <ScrollToTopButton onClick={scrollToTop} />}
    </div>
  )
}

export default HomeSearchFoodList
