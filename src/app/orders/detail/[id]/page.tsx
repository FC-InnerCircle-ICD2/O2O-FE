'use client'

import useGetOrdersDetail from '@/api/useGetOrdersDetail'
import OrderList from '@/app/orders/detail/[id]/_components/OrderList'
import OrderStatus from '@/app/orders/detail/[id]/_components/OrderStatus'
import Separator from '@/components/Separator'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const OrderDetailPage = () => {
  const path = usePathname()
  const { ordersDetail, resetGetOrdersDetail, isSuccess } = useGetOrdersDetail(
    path.split('/').pop()
  )

  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    if (ordersDetail) {
      setStatus(ordersDetail.status.desc)
    }
  }, [ordersDetail])

  if (!ordersDetail) return <div>주문 상세 정보를 불러오는 중입니다.</div>

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
