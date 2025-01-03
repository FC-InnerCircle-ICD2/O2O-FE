import React, { useState } from 'react'
import { CATEGORY_LIST } from './Home'
import CategoryItem from '@/components/shared/CategoryItem'
import { AnimatePresence, motion } from 'motion/react'

const CategoryDrawer = () => {
  const [more, setMore] = useState(false)

  return (
    <div className="pt-2">
      <div className="grid grid-cols-5 gap-y-2 px-mobile_safe overflow-x-scroll">
        {CATEGORY_LIST.slice(0, 9).map((category, index) => (
          <CategoryItem key={category.id} category={category} isActive={index === 0} />
        ))}
        {!more ? (
          <CategoryItem
            category={{ id: 0, name: '더보기', icon: '/images/food-categories/bell.png' }}
            onClick={() => setMore(true)}
          />
        ) : (
          <CategoryItem category={CATEGORY_LIST[10]} />
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
            {CATEGORY_LIST.slice(11).map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CategoryDrawer
