import OrderSearch from '@/app/orders/_components/OrderSearch'
import OrderItem from '@/app/orders/_components/OrderItem'
import Separator from '@/components/Separator'

const Order = () => {
  return (
    <>
      <div className="flex flex-col gap-10 pt-5">
        <div className="px-mobile_safe">
          <OrderSearch />
        </div>
        <div className="flex flex-1 flex-col gap-10 overflow-y-auto px-mobile_safe mb-10">
          <OrderItem />
          <Separator ignoreMobileSafe className="h-2"/>
          <OrderItem />
          <Separator ignoreMobileSafe className="h-2"/>
          <OrderItem />
          <Separator ignoreMobileSafe className="h-2"/>
          <OrderItem />
          <Separator ignoreMobileSafe className="h-2"/>
          <OrderItem />
        </div>
      </div>
    </>
  )
}

export default Order
