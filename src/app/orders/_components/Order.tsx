'use client'

import useGetOrders from '@/api/useGetOrders'
import CartButton from '@/components/CartButton'
import Separator from '@/components/Separator'
import LoginButtonSection from '@/components/shared/LoginButtonSection'
import memberStore from '@/store/user'
import React, { useCallback, useState } from 'react'
import OrderItem from './OrderItem'
import OrderSearch from './OrderSearch'
const Order = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const { orders } = useGetOrders(searchValue)
  const { member } = memberStore()

  const handelSearch = useCallback((value: string) => {
    setSearchValue(value)
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
          <div className="flex flex-col gap-10 pt-5">
            <div className="px-mobile_safe">
              <OrderSearch onSearch={handelSearch} />
            </div>
            <div className="mb-10 flex flex-1 flex-col gap-7 overflow-y-auto px-mobile_safe">
              {orders?.content.map((order, index) => (
                <React.Fragment key={order.orderId}>
                  <OrderItem order={order} />
                  {index !== orders?.content.length - 1 && (
                    <Separator ignoreMobileSafe className="h-2" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {member && <CartButton />}
        </>
      )}
    </>
  )
}

export default Order
