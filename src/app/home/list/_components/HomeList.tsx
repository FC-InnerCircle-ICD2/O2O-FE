'use client'

import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { OrderType } from '@/models/orderType'
import { Store } from '@/models/store'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import CategorySlide from './CategorySlide'
import HomeSearchFoodList from './HomeSearchFoodList'

const HomeList = () => {
  const { category, order } = useFoodSearchFilterStore()
  const { data, isFetching, targetRef } = useInfiniteScroll<
    Store,
    { category: string; order: OrderType }
  >({
    queryKey: 'stores',
    endpoint: '/api/stores',
    filter: { category, order },
    size: 10,
  })

  return (
    <div className="flex h-full flex-col gap-2 py-4">
      <div className="flex flex-col gap-2">
        <CategorySlide />
        <FoodOrderFilter />
      </div>
      <HomeSearchFoodList data={data} isLoading={isFetching} />
      <div ref={targetRef} />
    </div>
  )
}

export default HomeList
