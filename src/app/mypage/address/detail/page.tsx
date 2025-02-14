'use client'

import KakaoMap from '@/app/mypage/address/detail/_components/KakaoMap'
import MapInfo from '@/app/mypage/address/detail/_components/MapInfo'
import { useState } from 'react'

const Address = () => {
  const [address, setAddress] = useState('')

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress)
  }

  return (
    <div className="flex flex-col gap-4 pb-5 pt-5">
      <KakaoMap onAddressChange={handleAddressChange} />
      <MapInfo address={address} />
    </div>
  )
}

export default Address
