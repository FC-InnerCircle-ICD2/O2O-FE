import OrderSearch from '@/app/orders/_components/OrderSearch'
import OrderItem from '@/app/orders/_components/OrderItem'
import { Separator } from '@/components/shadcn/separator'

const Order = () => {
  return (
    <>
      <div className="flex h-full flex-col gap-7">
        <div className="h-navigation px-mobile_safe pt-2">
          <OrderSearch />
        </div>
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-3 px-mobile_safe">
          <OrderItem />
          <Separator />
          <OrderItem />
          <Separator />
          <OrderItem />
          <Separator />
          <OrderItem />
          <Separator />
          <OrderItem />
        </div>
      </div>
    </>
  )
}

export default Order
