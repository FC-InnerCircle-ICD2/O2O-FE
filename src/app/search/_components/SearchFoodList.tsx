'use client'

import Icon from '@/components/Icon'
import FoodListItem from '@/components/shared/FoodListItem'
import { useEffect, useRef, useState } from 'react'

const SearchFoodList = () => {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting이 false일 때는 요소가 화면에서 벗어났다는 의미
        setShowScrollButton(!entry.isIntersecting)
      },
      { threshold: 1 }, // 요소가 완전히 보일 때만 감지
    )

    if (topRef.current) {
      observer.observe(topRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div ref={topRef} className="h-px w-full" />
      <div className="relative flex flex-col gap-3 px-mobile_safe pb-3">
        <FoodListItem />
        <FoodListItem />
        <FoodListItem />
        <FoodListItem />
        <FoodListItem />
        <FoodListItem />
        <FoodListItem />
        <FoodListItem />
        <FoodListItem />
        <FoodListItem />
        <FoodListItem />
        <FoodListItem />
        {showScrollButton && (
          <div
            className="fixed bottom-10 right-5 rounded-full border border-solid border-gray-300 bg-white p-3"
            onClick={scrollToTop}
          >
            <Icon name="ChevronUp" size={20} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFoodList
