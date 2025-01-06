'use client'

import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import HomeFoodList from '../../_components/HomeFoodList'
import CategorySlide from './CategorySlide'

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
