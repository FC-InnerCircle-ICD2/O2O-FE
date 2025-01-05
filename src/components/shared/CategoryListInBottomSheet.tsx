'use client'

import { CATEGORY_LIST } from '@/app/home/_components/Home'
import useBottomSheet from '@/hooks/useBottomSheet'
import { useHomeSearchFilterStore } from '@/store/homeSearchFilter'
import CategoryItem from './CategoryItem'

const CategoryListInBottomSheet = () => {
  const { hide } = useBottomSheet()
  const { categoryId, setCategoryId } = useHomeSearchFilterStore()

  const handleCategoryClick = (categoryId: number) => {
    setCategoryId(categoryId)
    hide()
  }

  return (
    <div className="grid grid-cols-5 gap-y-4 overflow-x-scroll pb-10">
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