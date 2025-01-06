import OrderSearch from '@/app/orders/_components/OrderSearch'
import OrderList from '@/app/orders/_components/OrderList'

const Order = () => {
  return (
    <div className="flex h-full flex-col gap-3 px-mobile_safe">
      <div className="sticky top-0 z-20 bg-white">
        <OrderSearch />
      </div>
      <OrderList />
      <OrderList />
      <OrderList />
      <OrderList />
      <OrderList />
    </div>
  )
}

export default Order
