import splashImage from '@/assets/images/splash-image.png'
import { ROUTE_PATHS } from '@/utils/routes'
import Image from 'next/image'
import Link from 'next/link'

const SplashPage = () => {
  return (
    <div className="flex h-full flex-col px-mobile_safe">
      <div className="flex w-full flex-1 flex-col gap-[70px] pt-[70px]">
        <div className="relative aspect-square w-full">
          <Image src={splashImage} alt="splash_bg" fill className="object-contain" sizes="100vw" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-[15px]">
          <p className="font-bmjua text-4xl font-bold">개발의민족</p>
          <p className="text-center text-base text-gray-500">
            맛있게 먹으면 0칼로리 입니다^^
            <br />돈 많이 벌어서 많이 이용해주세요
          </p>
        </div>
      </div>
      <div className="pb-[80px]">
        <Link href={ROUTE_PATHS.HOME}>
          <button className="h-bottom_navigation w-full rounded-[6px] bg-primary text-white">
            시작하기
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SplashPage
