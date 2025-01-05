'use client'

import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import CategorySlide from './CategorySlide'
import HomeFoodList from './HomeFoodList'

const HomeSearch = () => {
  return (
    <div className="flex h-full flex-col">
      <CategorySlide />
      <FoodOrderFilter />
      <HomeFoodList />
    </div>
  )
}

export default HomeSearch
