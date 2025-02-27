import NotFoundImage from '@/assets/images/404img.gif'
import { Button } from '@/components/button'
import { ROUTE_PATHS } from '@/utils/routes'
import Image from 'next/image'
import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative flex h-full flex-col items-center justify-center">
        <Image
          className="absolute -translate-y-[110px]"
          src={NotFoundImage}
          priority={true}
          alt="loading"
          width={160}
          height={160}
        />
        <h2 className="text-3xl font-semibold text-gray-600">페이지를 찾을 수 없습니다.</h2>
        <Link className="absolute translate-y-[80px]" href={ROUTE_PATHS.HOME}>
          <Button size={'m'}>홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  )
}
