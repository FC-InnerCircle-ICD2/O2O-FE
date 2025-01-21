import Image from 'next/image'
import Icon from '@/components/Icon'

const MenuItem = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row ml-5">
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
          <div className="flex flex-col">
            <div>맵소디</div>
            <div>한마리</div>
            <div>24,500원</div>
          </div>
        </div>
        <div className="mr-5">
          <Icon name="X" size={24} />
        </div>
      </div>
    </div>
  )
}

export default MenuItem