'use client'

import PullToRefresh from '@/components/PullToRefresh'
import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { OrderType } from '@/models/orderType'
import { Store } from '@/models/store'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import SearchFoodList from '../../_components/SearchFoodList'

const SearchResult = () => {
  const { keyword, order } = useFoodSearchFilterStore()

  const { data, isFetching, targetRef, refetch } = useInfiniteScroll<
    Store,
    { keyword: string | undefined; order: OrderType }
  >({
    queryKey: 'stores',
    endpoint: '/api/stores',
    filter: { keyword, order },
    size: 5,
  })

  const handleRefresh = async (): Promise<void> => {
    await refetch()
  }

  return (
    <div className="flex h-full flex-col gap-4 py-3">
      <PullToRefresh onRefresh={handleRefresh}>
        <FoodOrderFilter />
      </PullToRefresh>
      <SearchFoodList data={data} isLoading={isFetching} targetRef={targetRef} />
    </div>
  )
}

export default SearchResult
