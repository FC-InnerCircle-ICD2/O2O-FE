import { COLORS } from '@/styles/color'
import Image from 'next/image'
import Dot from '../Dot'
import Icon from '../Icon'

const FoodListItem = () => {
  return (
    <div className="flex flex-1 items-center gap-[10px]">
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
      <div className="flex flex-1 flex-col gap-[6px] overflow-x-hidden">
        <p className="truncate text-base font-bold text-black">빙동댕</p>
        <div className="flex items-center gap-[4px]">
          <div className="flex items-center gap-[2px]">
            <Icon name="Star" size={12} color={COLORS.primary} fill={COLORS.primary} />
            <span className="text-xs font-bold text-black">5.0</span>
            <span className="text-xs font-medium text-gray-400">(844)</span>
          </div>
          <Dot />
          <span className="text-xs font-medium text-gray-600">732m</span>
          <Dot />
          <span className="text-xs font-medium text-gray-600">36~51분</span>
        </div>
        <p className="text-xs font-medium text-gray-600">배달비 무료</p>
      </div>
    </div>
  )
}

export default FoodListItem
