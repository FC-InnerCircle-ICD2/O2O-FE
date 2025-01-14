'use client'

import FoodListItem from '@/components/shared/FoodListItem'

const HomeFoodList = () => {
  return (
    <div className="flex flex-col gap-4 px-mobile_safe">
      <p className="text-xl font-bold">새로 오픈했어요!</p>
      <div className="flex flex-col gap-3">
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
    </div>
  )
}

export default HomeFoodList
