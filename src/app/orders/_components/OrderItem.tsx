import Chip from '@/components/Chip'
import Image from 'next/image'
import { Button } from '@/components/button'

const OrderItem = () => {
  return (
    <div className="flex flex-col gap-3 border border-solid border-gray-400 p-3 px-mobile_safe rounded">
      <div className="flex flex-row items-center">
        <Image
          className="size-[70px] rounded-xl object-cover object-center"
          src={
            'https://flexible.img.hani.co.kr/flexible/normal/970/647/imgdb/resize/2017/0709/149948783091_20170709.JPG'
          }
          alt="음식점 대표 이미지"
          width={70}
          height={70}
          loading="lazy"
        />
        <div className="flex flex-col gap-2 pl-3">
          <div className="text-lg font-bold">빙동댕 {'>'}</div>
          <div className="text-sm text-gray-700">새우 로제 파스타 외 2개 20,000원</div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-7">
        <Button variant="primaryFit" size="s" className="w-1/2">
          같은 메뉴 담기
        </Button>
        <Button variant="grayFit" size="s" className="w-1/2">
          리뷰 달기
        </Button>
      </div>
    </div>
  )
}

export default OrderItem
