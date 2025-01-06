'use client'

import Icon from '@/components/Icon'
import { useEffect, useRef, useState } from 'react'
import OrderItem from './OrdeListItem'

const OrderList = () => {
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
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-3">
      <div ref={topRef} className="h-px w-full" />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      {showScrollButton && (
        <div
          className="fixed bottom-[6.5rem] right-5 rounded-full border border-solid border-gray-300 bg-white p-3"
          onClick={scrollToTop}
        >
          <Icon className="rotate-180" variant="arrowDown" width={20} height={20} />
        </div>
      )}
    </div>
  )
}

export default OrderList
