import KakaoMap from '@/app/mypage/address/detail/_components/KakaoMap'
import MapInfo from '@/app/mypage/address/detail/_components/MapInfo'

const Address = () => {
  return (
    <div className="flex flex-col gap-4 pb-5 pt-5">
      <KakaoMap />
      <MapInfo />
    </div>
  )
}

export default Address
