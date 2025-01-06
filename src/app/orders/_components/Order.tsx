import OrderList from '@/app/orders/_components/OrderList'
import OrderSearch from '@/app/orders/_components/OrderSearch'

const Order = () => {
  return (
    <div className="flex h-full flex-col gap-4 px-mobile_safe">
      <div>
        <OrderSearch />
      </div>
      <OrderList />
    </div>
  )
}

export default Order
