'use client'

import ScrollToTopButton from '@/components/ScrollToTopButton'
import StoreListItem from '@/components/shared/StoreListItem'
import StoreListItemSkeleton from '@/components/shared/StoreListItemSkeleton'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { Store } from '@/models/store'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { RefObject } from 'react'

interface SearchFoodListProps {
  data: Store[]
  isLoading: boolean
  targetRef: RefObject<HTMLDivElement | null>
}

const SearchFoodList = ({ data, isLoading, targetRef }: SearchFoodListProps) => {
  const { keyword } = useFoodSearchFilterStore()
  const { topRef, showScrollButton, scrollToTop } = useScrollToTop()

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div ref={topRef} className="h-px w-full" />
      <div className="relative flex flex-col gap-3 px-mobile_safe pb-3">
        {!isLoading && data.length === 0 && (
          <div>
            <p className="break-words pb-3 text-center text-base text-gray-500">
              <span className="font-bold text-primary">'{keyword}'</span>에 대한 검색 결과가
              없습니다.
            </p>
            <p className="text-center text-sm text-gray-500">비슷한 다른 검색어를 입력해보세요.</p>
            <p className="text-center text-sm text-gray-500">
              검색어의 철자가 정확한지 확인해주세요.
            </p>
          </div>
        )}
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

export default SearchFoodList
