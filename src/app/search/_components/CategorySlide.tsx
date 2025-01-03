import CategoryItem from '@/components/shared/CategoryItem'
import { Category } from '@/models/category'
import React from 'react'
import { CATEGORY_LIST } from '../../home/_components/Home'

const CategorySlide = () => {
  return (
    <div className="flex shrink-0 px-mobile_safe gap-1 overflow-x-auto py-2">
      {CATEGORY_LIST.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategorySlide
