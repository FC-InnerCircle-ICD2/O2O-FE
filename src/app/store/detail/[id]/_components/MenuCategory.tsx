'use client'

import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

interface MenuCategoryProps {
  category: string
  index: number
  isActive?: boolean
  onClick: () => void
}

const MenuCategory = ({ category, index, isActive, onClick }: MenuCategoryProps) => {
  return (
    <motion.span
      className={cn(
        'flex min-w-fit cursor-pointer items-center rounded-full px-2.5 py-1 text-sm tracking-wide transition-colors duration-200',
        isActive && 'bg-black font-semibold text-white'
      )}
      onClick={onClick}
      data-active={isActive}
      whileTap={{ scale: 0.95 }}
      data-index={index}
    >
      {category}
    </motion.span>
  )
}

export default MenuCategory
