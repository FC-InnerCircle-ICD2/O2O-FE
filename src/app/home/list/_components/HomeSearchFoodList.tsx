'use client'

import FoodListItem from '@/components/shared/FoodListItem'

const HomeSearchFoodList = () => {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto px-mobile_safe pt-2">
      <p className="text-lg font-bold">개발의 민족 등록 맛집</p>
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

export default HomeSearchFoodList
