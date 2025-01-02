'use client'

import Chip from '@/components/Chip'
import FoodList from '@/components/home/FoodList'
import Icon from '@/components/Icon'
import Navigation from '@/components/Navigation'
import useBottomSheet from '@/hooks/useBottomSheet'
import { useGeoLocationStore } from '@/store/geoLocation'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'

const Home = () => {
  const { address } = useGeoLocationStore()
  const { BottomSheet } = useBottomSheet()
  const router = useRouter()

  return (
    <div className="flex flex-col gap-2 h-full">
      <Navigation
        title={address?.addressName || 'CommonLayout에 geoLocation 주석 해제'}
        rightElement={<Icon variant="search" onClick={() => router.push(ROUTE_PATHS.SEARCH)} />}
      />
      <div className="px-mobile_safe">
        <Chip
          text="랭킹순"
          rightIcon={<Icon variant="arrowDown" width={14} height={14} fill="#4B5563" />}
          onClick={() => BottomSheet(<div>test</div>)}
        />
      </div>
      <FoodList />
    </div>
  )
}

export default Home
