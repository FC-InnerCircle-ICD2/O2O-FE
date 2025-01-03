import React from 'react'
import { Category } from '@/models/category'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
  onClick?: () => void
  isActive?: boolean
}

const CategoryItem = ({ category, onClick, isActive = false }: CategoryItemProps) => {
  return (
    <div
      className={`relative flex flex-col items-center gap-2 min-w-[56px] ${
        isActive
          ? 'after:absolute after:w-[50px] after:h-[50px] after:bg-primary-foreground/10 after:rounded-full after:-z-10 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'
          : ''
      }`}
      onClick={onClick}
    >
      <Image src={category.icon} alt={category.name} width={30} height={30} />
      <p className={`text-xs ${isActive ? 'text-primary font-bold' : 'text-black'}`}>
        {category.name}
      </p>
    </div>
  )
}

export default CategoryItem
