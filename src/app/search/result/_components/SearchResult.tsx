'use client'

import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import SearchFoodList from '../../_components/SearchFoodList'

const SearchResult = () => {
  return (
    <div className="flex h-full flex-col gap-4 py-3">
      <FoodOrderFilter />
      <SearchFoodList />
    </div>
  )
}

export default SearchResult
