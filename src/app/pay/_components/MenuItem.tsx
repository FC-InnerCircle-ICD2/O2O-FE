import Image from 'next/image'
import Icon from '@/components/Icon'
import { Button } from '@/components/button'
import UpDownBtn from '@/components/UpDownBtn'

const MenuItem = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="ml-5 flex flex-row gap-2">
          <Image
            className="size-[60px] rounded-xl object-cover object-center"
            src={
              'https://flexible.img.hani.co.kr/flexible/normal/970/647/imgdb/resize/2017/0709/149948783091_20170709.JPG'
            }
            alt="음식점 대표 이미지"
            width={60}
            height={60}
            loading="lazy"
          />
          <div className="flex flex-col place-content-center gap-2">
            <div>맵소디</div>
            <div className="text-sm text-gray-700">한마리</div>
            <div className="font-bold">24,500원</div>
          </div>
        </div>
        <div className="mr-5">
          <Icon name="X" size={20} className="text-gray-700" />
        </div>
      </div>
      <div className="mr-5 flex flex-row justify-end gap-2 py-2">
        <Button variant="grayFit" size="s" className="text-black">
          옵션변경
        </Button>
        <UpDownBtn value={1} />
      </div>
    </div>
  )
}

export default MenuItem
