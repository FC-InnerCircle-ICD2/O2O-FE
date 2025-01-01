'use client'

import Icon from '@/components/Icon'
import Navigation from '@/components/Navigation'
import { useGeoLocationStore } from '@/store/geoLocation'

const Home = () => {
  const { address, error, isLoading } = useGeoLocationStore()

  if (isLoading) return <div>위치 정보를 가져오는 중...</div>
  if (error) return <div>{error}</div>

  return (
    <>
      <Navigation title={address?.addressName || ''} rightElement={<Icon variant="search" />} />
    </>
  )
}

export default Home
