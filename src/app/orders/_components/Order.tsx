import OrderSearch from '@/app/orders/_components/OrderSearch'
import OrderItem from '@/app/orders/_components/OrderItem'

const Order = () => {
  return (
    <>
      <div className="flex h-full flex-col gap-5">
        <div className="h-navigation px-mobile_safe pt-2">
          <OrderSearch />
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-3 px-mobile_safe">
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </div>
      </div>
    </>
  )
}

export default Order
