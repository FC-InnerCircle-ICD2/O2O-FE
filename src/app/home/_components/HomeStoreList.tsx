'use client'

import ScrollToTopButton from '@/components/ScrollToTopButton'
import StoreListItem from '@/components/shared/StoreListItem'
import StoreListItemSkeleton from '@/components/shared/StoreListItemSkeleton'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { Store } from '@/models/store'

interface HomeStoreListProps {
  data: Store[]
  isLoading: boolean
}

const HomeStoreList = ({ data, isLoading }: HomeStoreListProps) => {
  const { topRef, showScrollButton, scrollToTop } = useScrollToTop<HTMLParagraphElement>({})

  return (
    <div className="flex flex-col gap-4 px-mobile_safe">
      <p ref={topRef} className="text-xl font-bold">
        새로 오픈했어요!!
      </p>
      <div className="flex flex-col gap-3">
        {data.map((store) => (
          <StoreListItem key={store.id} store={store} />
        ))}
        {isLoading && Array.from({ length: 5 }).map((_, i) => <StoreListItemSkeleton key={i} />)}
        {showScrollButton && <ScrollToTopButton onClick={scrollToTop} />}
      </div>
    </div>
  )
}

export default HomeStoreList
