'use client'

import OrderSearch from '@/app/orders/_components/OrderSearch'
import OrderItem from '@/app/orders/_components/OrderItem'
import Separator from '@/components/Separator'
import useGetOrders from '@/api/useGetOrders'

const Order = () => {
  const { orders, resetGetOrders, isSuccess } = useGetOrders()

  return (
    <>
      <div className="flex flex-col gap-10 pt-5">
        <div className="px-mobile_safe">
          <OrderSearch />
        </div>
        <div className="mb-10 flex flex-1 flex-col gap-10 overflow-y-auto px-mobile_safe">
          {/*{orders?.map((order, index) => (*/}
          {/*  <>*/}
          {/*    <OrderItem key={index} />*/}
          {/*    <Separator ignoreMobileSafe className="h-2" />*/}
          {/*  </>*/}
          {/*))}*/}
        </div>
      </div>
    </>
  )
}

export default Order
