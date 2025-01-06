import Chip from '@/components/Chip'
import Image from 'next/image'

const OrderList = () => {
  return (
    <div className="pt-10">
      <div className="flex flex-row space-x-40">
        <div className="text-gray-400">11월 1일(금) 배달완료</div>
        <Chip text="주문 상세" />
      </div>
      <div className="flex flex-row items-center pt-5">
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
        <div className="flex flex-col gap-3 pl-3">
          <div className="text-xl">빙동댕</div>
          <div>새우 로제 파스타 외 2개 20,000원</div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-7 pt-5">
        <button className="w-44 rounded-md border border-solid border-violet-500 p-3 text-violet-500">
          같은 메뉴 담기
        </button>
        <button className="w-44 rounded-md border border-solid border-gray-400 p-3 text-gray-400">
          리뷰 달기
        </button>
      </div>
    </div>
  )
}

export default OrderList
