'use client'

import PullToRefresh from '@/components/PullToRefresh'
import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { OrderType } from '@/models/orderType'
import { Store } from '@/models/store'
import { useGeoLocationStore } from '@/store/geoLocation'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { useRef } from 'react'
import SearchFoodList from './SearchFoodList'

const SearchResult = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { coordinates: location } = useGeoLocationStore()
  const { keyword, order } = useFoodSearchFilterStore()
  const { data, isFetching, targetRef, refetch } = useInfiniteScroll<
    Store,
    { keyword: string | undefined; order: OrderType }
  >({
    queryKey: 'stores',
    endpoint: 'stores/list',
    filter: { keyword, order },
    size: 10,
    ...(location && { location }),  
  })

  const handleRefresh = async (): Promise<void> => {
    await refetch()
  }

  return (
    <PullToRefresh onRefresh={handleRefresh} scrollRef={scrollRef}>
      <div className="flex h-full flex-col px-mobile_safe py-3">
        <FoodOrderFilter />
        <SearchFoodList
          data={data}
          isLoading={isFetching}
          targetRef={targetRef}
          scrollRef={scrollRef}
        />
      </div>
    </PullToRefresh>
  )
}

export default SearchResult
