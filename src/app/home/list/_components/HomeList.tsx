'use client'

import CartButton from '@/components/CartButton'
import PullToRefresh from '@/components/PullToRefresh'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { OrderType } from '@/models/orderType'
import { Store } from '@/models/store'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { useEffect, useRef, useState } from 'react'
import CategorySlide from './CategorySlide'
import HomeSearchFoodList from './HomeSearchFoodList'

const HomeList = () => {
  const { category, order } = useFoodSearchFilterStore()
  const [isCategoryHide, setIsCategoryHide] = useState(false)
  const { data, isFetching, targetRef, refetch, hasNextPage } = useInfiniteScroll<
    Store,
    { category: string; order: OrderType }
  >({
    queryKey: 'stores',
    endpoint: 'stores/list',
    filter: { category, order },
    size: 10,
    location: { lat: 37.5177, lng: 127.0473 }, // TODO: 동적으로 바꾸기
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  const handleRefresh = async (): Promise<void> => {
    await refetch()
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsCategoryHide(scrollRef.current.scrollTop >= 36)
      }
    }

    const currentRef = scrollRef.current
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <PullToRefresh onRefresh={handleRefresh} scrollRef={scrollRef}>
      <div className="flex h-full flex-col gap-4 py-4">
        <CategorySlide isHide={isCategoryHide} />
        <HomeSearchFoodList
          data={data}
          hasNextPage={hasNextPage}
          isLoading={isFetching}
          targetRef={targetRef}
          scrollRef={scrollRef}
        />
      </div>
      <CartButton />
    </PullToRefresh>
  )
}

export default HomeList
