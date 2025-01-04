'use client'

import FoodListItem from '@/components/shared/FoodListItem'

const HomeFoodList = () => {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto px-mobile_safe pb-3">
      <FoodListItem />
      <FoodListItem />
      <FoodListItem />
      <FoodListItem />
      <FoodListItem />
      <FoodListItem />
      <FoodListItem />
      <FoodListItem />
      <FoodListItem />
      <FoodListItem />
      <FoodListItem />
      <FoodListItem />
    </div>
  )
}

export default HomeFoodList
