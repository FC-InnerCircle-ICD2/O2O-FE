import Separator from '@/components/Separator'
import OrderStatus from '@/app/orders/detail/[id]/_components/OrderStatus'
import OrderList from '@/app/orders/detail/[id]/_components/OrderList'

const OrderDetailPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-9 pt-5">
        <OrderStatus />
        <Separator ignoreMobileSafe className="h-[8px]" />
      </div>
      <div className="pb-5">
        <OrderList />
      </div>
    </div>
  )
}

export default OrderDetailPage
