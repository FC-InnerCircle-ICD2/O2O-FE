import { OrdersList } from '@/api/useGetOrders'
import Badge from '@/components/Badge'
import { Button } from '@/components/button'
import { Skeleton } from '@/components/shadcn/skeleton'
import { ROUTE_PATHS } from '@/utils/routes'
import Image from 'next/image'
import Link from 'next/link'

const OrderItem = ({ order }: { order: OrdersList }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row">
        {order.imageThumbnail ? (
          <Image
            className="size-[100px] rounded-xl object-cover object-center"
            src={order.imageThumbnail}
            alt="음식점 대표 이미지"
            width={100}
            height={100}
            loading="lazy"
          />
        ) : (
          <Skeleton className="size-[100px] rounded-xl" />
        )}
        <div className="flex w-[calc(100%-1rem-100px)] flex-col gap-4 pl-4">
          <div className="flex flex-row justify-between">
            <Badge variant="complete">{order.status.desc}</Badge>
            <div className="place-content-center text-xs text-gray-400">
              {new Date(order.orderTime).toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="truncate text-lg font-bold hover:text-clip">{order.storeName}</div>
            <div className="text-sm text-gray-700">{order.orderSummary}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <Link className="w-full" href={`${ROUTE_PATHS.ORDERS_DETAIL}/${order.orderId}`}>
          <Button size="s" className="h-10">
            주문 상세
          </Button>
        </Link>
        {order.status.code === 'S5' && (
          <Link className="w-full" href={ROUTE_PATHS.REVIEW}>
            <Button variant="grayFit" size="s" className="h-10">
              리뷰 달기
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default OrderItem
