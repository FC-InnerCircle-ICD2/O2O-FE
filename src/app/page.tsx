import splashImage from '@/assets/images/splash-image.png'
import { ROUTE_PATHS } from '@/utils/routes'
import Image from 'next/image'
import Link from 'next/link'

const SplashPage = () => {
  return (
    <div className="flex flex-1 flex-col justify-between gap-6 px-mobile_safe">
      <div className="flex size-full flex-1 flex-col justify-center gap-8 pt-10">
        <div className="relative aspect-square w-full">
          <Image src={splashImage} alt="splash_bg" fill className="object-contain" />
        </div>
        <div className="flex flex-col items-center gap-[10px]">
          <p className="font-bmjua text-4xl font-bold">개발의민족</p>
          <p className="text-center text-base text-gray-500">
            맛있게 먹으면 0칼로리 입니다^^
            <br />돈 많이 벌어서 많이 이용해주세요
          </p>
        </div>
      </div>
      <div className="pb-[40px]">
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
