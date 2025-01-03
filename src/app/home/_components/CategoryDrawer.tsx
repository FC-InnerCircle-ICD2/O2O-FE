'use client'

import CategoryItem from '@/components/shared/CategoryItem'
import { Category } from '@/models/category'
import { useHomeSearchFilterStore } from '@/store/homeSearchFilter'
import { ROUTE_PATHS } from '@/utils/routes'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CATEGORY_LIST } from './Home'

const CategoryDrawer = () => {
  const [more, setMore] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const router = useRouter()
  const { setCategory } = useHomeSearchFilterStore()

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.id - 1)
    setCategory(category.name)

    setTimeout(() => {
      router.push(ROUTE_PATHS.HOME_SEARCH)
    }, 150)
  }

  return (
    <div className="pt-2">
      <div className="grid grid-cols-5 gap-y-2 px-mobile_safe overflow-x-scroll">
        {CATEGORY_LIST.slice(0, 9).map((category, index) => (
          <CategoryItem
            key={category.id}
            category={category}
            isActive={index === activeCategory}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
        {!more ? (
          <CategoryItem
            category={{ id: 0, name: '더보기', icon: '/images/food-categories/bell.png' }}
            onClick={() => setMore(true)}
          />
        ) : (
          <CategoryItem
            category={CATEGORY_LIST[9]}
            isActive={9 === activeCategory}
            onClick={() => handleCategoryClick(CATEGORY_LIST[9])}
          />
        )}
      </div>

      <AnimatePresence>
        {more && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="grid grid-cols-5 gap-y-2 overflow-x-scroll px-mobile_safe pt-2"
          >
            {CATEGORY_LIST.slice(10).map((category, index) => (
              <CategoryItem
                key={category.id}
                category={category}
                isActive={index + 10 === activeCategory}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CategoryDrawer
