'use client'

import { ORDER_STATUS_CODE } from '@/api/useGetOrdersDetail'
import CartButton from '@/components/CartButton'
import Separator from '@/components/Separator'
import LoginButtonSection from '@/components/shared/LoginButtonSection'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import memberStore from '@/store/user'
import React, { useCallback, useEffect, useState } from 'react'
import OrderItem from './OrderItem'
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
  const [searchValue, setSearchValue] = useState<string>('')
  // const { orders } = useGetOrders(searchValue)
  const { member } = memberStore()
  const { data, targetRef } = useInfiniteScroll<OrdersList, { keyword: string }>({
    queryKey: 'orders',
    endpoint: 'orders',
    filter: { keyword: searchValue },
    size: 10,
    enabled: !!member,
  })

  const saveScrollPosition = () => {
    const ordersList = document.getElementById('orders_list')

    if (ordersList) {
      sessionStorage.setItem('ordersListScrollPosition', ordersList.scrollTop.toString())
    }
  }

  const handelSearch = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  useEffect(() => {
    console.log({ data })
    if (!data || data.length === 0) return

    const ordersList = document.getElementById('orders_list')
    const savedScrollPosition = sessionStorage.getItem('ordersListScrollPosition')

    if (ordersList) {
      // ordersList.scrollTo(0, 0)
      console.log({ savedScrollPosition })
      if (savedScrollPosition) {
        ordersList.scrollTop = parseInt(savedScrollPosition)
        sessionStorage.removeItem('ordersListScrollPosition')
      } else {
        // ordersList.scrollTo(0, 0)
        console.log('??????')
      }
    }
  }, [])

  return (
    <>
      {!member ? (
        <div className="px-mobile_safe pb-4 pt-[calc(20px+1rem)]">
          <LoginButtonSection
            text={`주문 내역을 확인하려면 로그인이 필요해요.\n 지금 가입하고 행복에 가까워지세요!`}
          />
        </div>
      ) : (
        <>
          <div className="flex h-full flex-col gap-4 pt-5">
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
              <div ref={targetRef} />
            </div>
          </div>
          {member && <CartButton />}
        </>
      )}
    </>
  )
}

export default Order
