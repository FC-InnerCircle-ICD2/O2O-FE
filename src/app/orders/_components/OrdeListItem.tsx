import Chip from '@/components/Chip'
import Icon from '@/components/Icon'
import Image from 'next/image'

const OrdeListItem = () => {
  return (
    <div className="rounded-xl border border-solid border-gray-200 p-4">
      <div className="flex flex-row items-center gap-[10px]">
        <Image
          className="size-[80px] rounded-xl object-cover object-center"
          src={
            'https://flexible.img.hani.co.kr/flexible/normal/970/647/imgdb/resize/2017/0709/149948783091_20170709.JPG'
          }
          alt="음식점 대표 이미지"
          width={80}
          height={80}
          loading="lazy"
        />
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex flex-row items-center justify-between gap-2">
            <span className="text-lg font-bold">빙동댕</span>
            <Chip text="배달 완료" />
          </div>
          <p className="text-sm text-gray-400">2024-12-28 오후 06:34</p>
        </div>
      </div>
      <div className="flex items-center gap-1 pt-3">
        <span className="text-sm text-gray-600">새우 로제 파스타 외 2개 20,000원</span>
        <Icon variant="arrowRight" width={16} height={16} />
      </div>
      <div className="flex flex-col justify-center gap-2 pt-4">
        <button className="rounded-md bg-violet-500 p-2 text-sm text-white">같은 메뉴 담기</button>
        <button className="rounded-md border border-solid border-gray-400 p-2 text-sm text-gray-400">
          리뷰 달기
        </button>
      </div>
    </div>
  )
}

export default OrdeListItem
