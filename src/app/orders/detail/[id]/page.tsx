'use client'

import Separator from '@/components/Separator'
import OrderStatus from '@/app/orders/detail/[id]/_components/OrderStatus'
import OrderList from '@/app/orders/detail/[id]/_components/OrderList'
import { usePathname } from 'next/navigation'
import useGetOrdersDetail from '@/api/useGetOrdersDetail'
import useGetOrderStatus from '@/api/useGetOrderStatus'

const OrderDetailPage = () => {
  const path = usePathname()
  const { ordersDetail, resetGetOrdersDetail, isSuccess } = useGetOrdersDetail(
    path.split('/').pop()
  )
  const {status} = useGetOrderStatus(path.split('/').pop())


  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-9 pt-5">
        {status && <OrderStatus orderStatus={status} />}
        <Separator ignoreMobileSafe className="h-[8px]" />
      </div>
      <div className="pb-5">{ordersDetail && <OrderList ordersData={ordersDetail} />}</div>
    </div>
  )
}

export default OrderDetailPage
