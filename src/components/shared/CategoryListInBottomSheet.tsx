'use client'

import CATEGORY_LIST from '@/constants/category'
import useBottomSheet from '@/hooks/useBottomSheet'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import CategoryItem from './CategoryItem'

const CategoryListInBottomSheet = () => {
  const { hide } = useBottomSheet()
  const { categoryId, setCategoryId } = useFoodSearchFilterStore()

  const handleCategoryClick = (categoryId: number) => {
    setCategoryId(categoryId)
    hide()
  }

  return (
    <div className="grid grid-cols-5 gap-y-[10px] overflow-x-scroll pb-10">
      {CATEGORY_LIST.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          isActive={category.id === categoryId}
          onClick={() => handleCategoryClick(category.id)}
        />
      ))}
    </div>
  )
}

export default CategoryListInBottomSheet
