import Chip from '@/components/Chip'
import Image from 'next/image'
import { Button } from '@/components/button'
import Badge from '@/components/Badge'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'
import { Order } from '@/api/useGetOrders'

const OrderItem = ({ order }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row">
        <Image
          className="size-[100px] rounded-xl object-cover object-center"
          src={
            'https://flexible.img.hani.co.kr/flexible/normal/970/647/imgdb/resize/2017/0709/149948783091_20170709.JPG'
          }
          alt="음식점 대표 이미지"
          width={100}
          height={100}
          loading="lazy"
        />
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
      <div className="flex flex-row justify-center gap-3">
        <Link className="w-1/2" href={ROUTE_PATHS.ORDER_DETAIL}>
          <Button size="s" className="h-10">
            주문 상세
          </Button>
        </Link>
        <Button variant="grayFit" size="s" className="h-10 w-1/2">
          리뷰 달기
        </Button>
      </div>
    </div>
  )
}

export default OrderItem
