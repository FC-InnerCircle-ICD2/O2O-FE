import Chip from '@/components/Chip'
import Image from 'next/image'
import { Button } from '@/components/button'
import Badge from '@/components/Badge'

const OrderItem = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center">
        <Image
          className="size-[85px] rounded-xl object-cover object-center"
          src={
            'https://flexible.img.hani.co.kr/flexible/normal/970/647/imgdb/resize/2017/0709/149948783091_20170709.JPG'
          }
          alt="음식점 대표 이미지"
          width={85}
          height={85}
          loading="lazy"
        />
        <div className="flex w-4/5 flex-col gap-2 pl-3">
          <div className="flex flex-row justify-between">
            <Badge variant="complete">배달완료</Badge>
            <div className="text-xs text-gray-400">2025.01.11 오후 07:24</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="truncate text-lg font-bold hover:text-clip">빙동댕</div>
            <div className="text-sm text-gray-700">새우 로제 파스타 외 2개 20,000원</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-7">
        <Button variant="primaryFit" size="s" className="w-1/2">
          주문 상세
        </Button>
        <Button variant="grayFit" size="s" className="w-1/2">
          리뷰 달기
        </Button>
      </div>
    </div>
  )
}

export default OrderItem
