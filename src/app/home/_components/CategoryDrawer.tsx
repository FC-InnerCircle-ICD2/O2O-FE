'use client'

import CategoryItem from '@/components/shared/CategoryItem'
import { Category } from '@/models/category'
import { OrderType } from '@/models/orderType'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { ROUTE_PATHS } from '@/utils/routes'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CATEGORY_LIST } from './Home'

const CategoryDrawer = () => {
  const [more, setMore] = useState(false)
  const router = useRouter()
  const { categoryId, setCategoryId, setOrder } = useFoodSearchFilterStore()

  const handleCategoryClick = (category: Category) => {
    setCategoryId(category.id)

    setTimeout(() => {
      router.push(ROUTE_PATHS.HOME_SEARCH)
    }, 150)
  }

  useEffect(() => {
    setCategoryId(1)
    setOrder(OrderType.RANKING)
  }, [])

  return (
    <div>
      <div className="grid grid-cols-5 gap-y-[10px] overflow-x-scroll px-mobile_safe">
        {CATEGORY_LIST.slice(0, 9).map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isActive={category.id === categoryId}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
        {!more ? (
          <CategoryItem
            category={{ id: 0, name: '더보기', icon: '/images/food-categories/more.png' }}
            onClick={() => setMore(true)}
            useAnimation={false}
          />
        ) : (
          <CategoryItem
            category={CATEGORY_LIST[9]}
            isActive={CATEGORY_LIST[9].id === categoryId}
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
            {CATEGORY_LIST.slice(10).map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                isActive={category.id === categoryId}
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
