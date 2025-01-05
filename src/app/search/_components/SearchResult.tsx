'use client'

import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import SearchFoodList from './SearchFoodList'

const SearchResult = () => {
  const { keyword } = useFoodSearchFilterStore()

  return (
    <div className="flex h-full flex-col">
      <FoodOrderFilter />
      <SearchFoodList />
    </div>
  )
}

export default SearchResult
