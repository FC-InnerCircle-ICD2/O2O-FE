'use client'

import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import CategorySlide from './CategorySlide'
import HomeSearchFoodList from './HomeSearchFoodList'

const HomeList = () => {
  return (
    <div className="flex h-full flex-col gap-2 py-4">
      <div className="flex flex-col gap-2">
        <CategorySlide />
        <FoodOrderFilter />
      </div>
      <HomeSearchFoodList />
    </div>
  )
}

export default HomeList
