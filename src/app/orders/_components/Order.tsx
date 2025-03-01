'use client'

import { ORDER_STATUS_CODE } from '@/api/useGetOrdersDetail'
import CartButton from '@/components/CartButton'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Separator from '@/components/Separator'
import LoginButtonSection from '@/components/shared/LoginButtonSection'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import memberStore from '@/store/user'
import React, { useCallback, useEffect, useState } from 'react'
import OrderItem from './OrderItem'
import OrderItemSkeleton from './OrderItemSkeleton'
import OrderSearch from './OrderSearch'

export interface Orders {
  content: OrdersList[]
}

export interface OrdersList {
  storeId: string
  storeName: string
  orderId: string
  status: {
    code: ORDER_STATUS_CODE
    desc: string
  }
  orderTime: string
  orderSummary: string
  deliveryCompleteTime: string | null
  imageThumbnail: string
  paymentPrice: number
}

const Order = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false)

  const { member } = memberStore()
  const { data, targetRef, isFetching } = useInfiniteScroll<OrdersList, { keyword: string }>({
    queryKey: 'orders',
    endpoint: 'orders',
    filter: { keyword: searchValue },
    size: 10,
    enabled: !!member,
    rootMargin: '0px 0px 1000px 0px',
  })

  const scrollToTop = () => {
    const ordersList = document.getElementById('orders_list')

    if (ordersList) {
      ordersList.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const saveScrollPosition = () => {
    const ordersList = document.getElementById('orders_list')

    if (ordersList) {
      sessionStorage.setItem('ordersListScrollPosition', ordersList.scrollTop.toString())
    }
  }

  const handelSearch = useCallback((value: string) => {
    setIsSearch(true)
    setSearchValue(value)
  }, [])

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLElement
    const scrollTop = target.scrollTop

    setShowScrollButton(scrollTop > 100)
  }, [])

  useEffect(() => {
    if (!data || data.length === 0) return

    const ordersList = document.getElementById('orders_list')
    const savedScrollPosition = sessionStorage.getItem('ordersListScrollPosition')

    if (ordersList) {
      ordersList.addEventListener('scroll', handleScroll)

      if (isSearch) {
        ordersList.scrollTo(0, 0)
        setIsSearch(false)
      } else if (savedScrollPosition) {
        ordersList.scrollTop = parseInt(savedScrollPosition)
        sessionStorage.removeItem('ordersListScrollPosition')
      }
    }
  }, [data])

  return (
    <div className="relative h-[calc(100dvh-40px-85px-12px)]">
      {!member ? (
        <div className="px-mobile_safe pb-4 pt-[calc(20px+1rem)]">
          <LoginButtonSection
            text={`주문 내역을 확인하려면 로그인이 필요해요.\n 지금 가입하고 행복에 가까워지세요!`}
          />
        </div>
      ) : (
        <>
          <div className="flex h-full flex-col gap-4 overflow-hidden pt-5">
            <div className="px-mobile_safe">
              <OrderSearch onSearch={handelSearch} />
            </div>
            <div
              id="orders_list"
              className="flex h-[calc(100dvh-40px-85px)] flex-1 flex-col gap-7 overflow-y-auto"
            >
              {data?.map((order, index) => (
                <React.Fragment key={order.orderId}>
                  <OrderItem order={order} onBeforeNavigate={saveScrollPosition} />
                  {index !== data?.length - 1 && <Separator ignoreMobileSafe className="h-2" />}
                </React.Fragment>
              ))}
              <div ref={targetRef} className="h-10" />
              {isFetching &&
                new Array(5)
                  .fill(0)
                  .map((_, index) => <OrderItemSkeleton key={`skeleton_order_item_${index}`} />)}
              {showScrollButton && <ScrollToTopButton onClick={scrollToTop} />}
            </div>
          </div>
          {member && <CartButton />}
        </>
      )}
    </div>
  )
}

export default Order
