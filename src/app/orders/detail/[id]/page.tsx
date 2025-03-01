'use client'

import useGetOrdersDetail from '@/api/useGetOrdersDetail'
import useGetOrderStatus from '@/api/useGetOrderStatus'
import OrderList from '@/app/orders/detail/[id]/_components/OrderList'
import FullpageLoader from '@/components/FullpageLoader'
import Separator from '@/components/Separator'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import OrderStatus from './_components/OrderStatus'

const OrderDetailPage = () => {
  const queryClient = useQueryClient()
  const path = usePathname()
  const orderId = useMemo(() => {
    return path.split('/').pop()
  }, [path])
  const { ordersDetail, resetGetOrdersDetail } = useGetOrdersDetail(orderId)
  const { status } = useGetOrderStatus(orderId)

  useEffect(() => {
    if (!status) return

    queryClient.invalidateQueries({
      queryKey: ['orders'],
    })
    resetGetOrdersDetail()
  }, [status])

  if (!ordersDetail) return <FullpageLoader useNavigation />

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-9 pt-5">
        {status && <OrderStatus orderStatus={status.status} />}
        <Separator ignoreMobileSafe className="h-[8px]" />
      </div>
      <div className="pb-5">{ordersDetail && <OrderList ordersData={ordersDetail} />}</div>
    </div>
  )
}

export default OrderDetailPage
