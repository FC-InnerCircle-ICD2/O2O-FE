'use client'

import More from '@/assets/images/foodCategories/more.png'
import CategoryItem from '@/components/shared/CategoryItem'
import CATEGORY_LIST from '@/constants/category'
import { cn } from '@/lib/utils'
import { Category } from '@/models/category'
import { OrderType } from '@/models/orderType'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const CategoryDrawer = () => {
  const [more, setMore] = useState(false)
  const router = useRouter()
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const { category, setCategory, setOrder } = useFoodSearchFilterStore()

  const handleCategoryClick = (category: Category) => {
    if (category.id === 0) {
      setMore(true)
      return
    }

    setCategory(category.value)

    setTimeout(() => {
      router.push(ROUTE_PATHS.HOME_LIST)
    }, 150)
  }

  useEffect(() => {
    setCategoryList(CATEGORY_LIST)
    if (!more) {
      setCategoryList([
        ...CATEGORY_LIST.slice(0, 9),
        { id: 0, name: '더보기', value: 'more', icon: More },
        ...CATEGORY_LIST.slice(10),
      ])
    } else {
      setCategoryList(CATEGORY_LIST)
    }
  }, [more])

  useEffect(() => {
    setCategory('')
    setOrder(OrderType.RANKING)
  }, [])

  return (
    <div
      className={cn(
        'grid grid-cols-5 grid-rows-[66px] gap-y-[10px] overflow-hidden px-mobile_safe transition-all duration-300 ease-in-out',
        !more ? 'max-h-[152px]' : 'max-h-[370px]',
      )}
    >
      {categoryList.map((cat) => (
        <CategoryItem
          key={cat.id}
          category={cat}
          isActive={(cat.name === '전체' && category === '') || cat.value === category}
          onClick={() => handleCategoryClick(cat)}
        />
      ))}
    </div>
  )
}

export default CategoryDrawer
