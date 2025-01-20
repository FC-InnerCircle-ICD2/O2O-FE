'use client'

import More from '@/assets/images/foodCategories/more.png'
import CategoryItem from '@/components/shared/CategoryItem'
import CATEGORY_LIST from '@/constants/category'
import { Category } from '@/models/category'
import { OrderType } from '@/models/orderType'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { ROUTE_PATHS } from '@/utils/routes'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const CategoryDrawer = () => {
  const [more, setMore] = useState(false)
  const router = useRouter()
  const { category, setCategory, setOrder } = useFoodSearchFilterStore()

  const handleCategoryClick = (category: Category) => {
    setCategory(category.name)

    setTimeout(() => {
      router.push(ROUTE_PATHS.HOME_LIST)
    }, 150)
  }

  useEffect(() => {
    setCategory('')
    setOrder(OrderType.RANKING)
  }, [])

  return (
    <div>
      <div className="grid grid-cols-5 gap-y-[10px] overflow-x-scroll px-mobile_safe">
        {CATEGORY_LIST.slice(0, 9).map((cat) => (
          <CategoryItem
            key={cat.id}
            category={cat}
            isActive={(cat.name === '전체' && category === '') || cat.name === category}
            onClick={() => handleCategoryClick(cat)}
          />
        ))}
        {!more ? (
          <CategoryItem
            category={{ id: 0, name: '더보기', icon: More }}
            onClick={() => setMore(true)}
            useAnimation={false}
          />
        ) : (
          <CategoryItem
            category={CATEGORY_LIST[9]}
            isActive={CATEGORY_LIST[9].name === category}
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
            {CATEGORY_LIST.slice(10).map((cat) => (
              <CategoryItem
                key={cat.id}
                category={cat}
                isActive={cat.name === category}
                onClick={() => handleCategoryClick(cat)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CategoryDrawer
