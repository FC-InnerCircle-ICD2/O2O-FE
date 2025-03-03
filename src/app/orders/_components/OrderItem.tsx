import Badge, { badgeVariants } from '@/components/Badge'
import { Button } from '@/components/button'
import { Skeleton } from '@/components/shadcn/skeleton'
import { ROUTE_PATHS } from '@/utils/routes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { OrdersList } from './Order'

const OrderItem = ({
  order,
  onBeforeNavigate,
}: {
  order: OrdersList
  onBeforeNavigate?: () => void
}) => {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    if (onBeforeNavigate) {
      onBeforeNavigate()
    }

    router.push(path)
  }

  const variant = {
    S1: 'waiting',
    S2: 'received',
    S3: 'accepted',
    S4: 'rejected',
    S5: 'completed',
    S6: 'canceled',
  }

  return (
    <div className="flex flex-col gap-5 px-mobile_safe">
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
        <div className="flex w-[calc(100%-1rem-100px)] flex-col gap-2 pl-4">
          <div className="flex flex-row justify-between">
            <Badge variant={variant[order.status.code as keyof typeof badgeVariants]}>
              {order.status.code === 'S5' ? '배달완료' : order.status.desc}
            </Badge>
            <div className="place-content-center text-xs text-gray-400">
              {new Date(order.orderTime).toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="truncate text-xl font-bold hover:text-clip">{order.storeName}</div>
            <div className="text-base text-gray-700">{order.orderSummary}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-full">
          <Button
            size="m"
            onClick={() => handleNavigate(`${ROUTE_PATHS.ORDERS_DETAIL}/${order.orderId}`)}
          >
            주문 상세
          </Button>
        </div>
        {order.status.code === 'S5' && (
          <Button variant="grayFit" size="m" onClick={() => handleNavigate(ROUTE_PATHS.REVIEW)}>
            리뷰 달기
          </Button>
        )}
      </div>
    </div>
  )
}

export default OrderItem
