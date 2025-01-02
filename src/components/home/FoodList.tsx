'use client'

import FoodListItem from './FoodListItem'

const FoodList = () => {
  return (
    <div className="flex flex-col gap-3 px-mobile_safe py-3 h-[calc(100% - 40px - 30px - 24px)] overflow-y-auto">
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

export default FoodList
