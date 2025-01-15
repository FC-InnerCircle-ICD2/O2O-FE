import OrderStatus from '@/app/order-detail/_components/OrderStatus'
import Separator from '@/components/Separator'
import Chip from '@/components/Chip'
import OrderList from '@/app/order-detail/_components/OrderList'

const OrderPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-9 pt-5">
        <OrderStatus />
        <Separator ignoreMobileSafe className="h-[8px]" />
      </div>
      <div>
        <OrderList />
      </div>
    </div>
  )
}

export default OrderPage
