import Icon from '@/components/Icon'
import CategoryItem from '@/components/shared/CategoryItem'
import CategoryListInBottomSheet from '@/components/shared/CategoryListInBottomSheet'
import useBottomSheet from '@/hooks/useBottomSheet'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { COLORS } from '@/styles/color'
import { useCallback, useEffect, useRef } from 'react'
import { CATEGORY_LIST } from '../../_components/Home'

const CategorySlide = () => {
  const { categoryId, setCategoryId } = useFoodSearchFilterStore()
  const { BottomSheet } = useBottomSheet()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleCategoryClick = useCallback(
    (categoryId: number) => {
      setCategoryId(categoryId)
    },
    [setCategoryId],
  )

  const handleMoreClick = useCallback(() => {
    BottomSheet({ title: '배달 카테고리', content: <CategoryListInBottomSheet /> })
  }, [])

  useEffect(() => {
    // 약간의 지연 시간을 주어 DOM이 확실히 렌더링되도록 함
    const timeoutId = setTimeout(() => {
      if (!scrollContainerRef.current) return

      const activeItem = scrollContainerRef.current.querySelector('[data-active="true"]')
      if (!activeItem) return

      const container = scrollContainerRef.current
      const containerWidth = container.offsetWidth
      const itemLeft = activeItem.getBoundingClientRect().left
      const containerLeft = container.getBoundingClientRect().left
      const scrollLeft =
        itemLeft - containerLeft - containerWidth / 2 + (activeItem as HTMLElement).offsetWidth / 2

      container.scrollTo({
        left: container.scrollLeft + scrollLeft,
        behavior: 'smooth',
      })
    }, 100) // 100ms 지연

    return () => clearTimeout(timeoutId)
  }, [categoryId])

  return (
    <div className="flex px-mobile_safe">
      <div ref={scrollContainerRef} className="flex flex-1 gap-1 overflow-x-auto">
        {CATEGORY_LIST.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isActive={category.id === categoryId}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>
      <div className="flex items-center">
        <Icon name="Ellipsis" size={24} color={COLORS.gray600} onClick={handleMoreClick} />
      </div>
    </div>
  )
}

export default CategorySlide
