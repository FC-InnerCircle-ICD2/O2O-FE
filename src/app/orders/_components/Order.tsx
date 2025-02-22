'use client'

import useGetOrders from '@/api/useGetOrders'
import OrderItem from '@/app/orders/_components/OrderItem'
import OrderSearch from '@/app/orders/_components/OrderSearch'
import CartButton from '@/components/CartButton'
import Separator from '@/components/Separator'
import React, { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Order = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const { orders, resetGetOrders, isSuccess } = useGetOrders(searchValue)

  const handelSearch = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  return (
    <>
      <div className="flex flex-col gap-10 pt-5">
        <div className="px-mobile_safe">
          <OrderSearch onSearch={handelSearch} />
        </div>
        <div className="mb-10 flex flex-1 flex-col gap-10 overflow-y-auto px-mobile_safe">
          {orders?.content.map((order) => (
            <React.Fragment key={uuidv4()}>
              <OrderItem order={order} />
              <Separator ignoreMobileSafe className="h-2" />
            </React.Fragment>
          ))}
        </div>
      </div>
      <CartButton />
    </>
  )
}

export default Order
