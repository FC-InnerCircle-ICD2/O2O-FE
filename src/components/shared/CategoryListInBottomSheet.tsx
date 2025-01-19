'use client'

import CATEGORY_LIST from '@/constants/category'
import useBottomSheet from '@/hooks/useBottomSheet'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import CategoryItem from './CategoryItem'

const CategoryListInBottomSheet = () => {
  const { hide } = useBottomSheet()
  const { category, setCategory } = useFoodSearchFilterStore()

  const handleCategoryClick = (category: string) => {
    setCategory(category)
    hide()
  }

  return (
    <div className="grid grid-cols-5 gap-y-[10px] overflow-x-scroll pb-10">
      {CATEGORY_LIST.map((cat) => (
        <CategoryItem
          key={cat.id}
          category={cat}
          isActive={cat.name === category}
          onClick={() => handleCategoryClick(cat.name)}
        />
      ))}
    </div>
  )
}

export default CategoryListInBottomSheet
