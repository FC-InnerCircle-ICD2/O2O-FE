'use client'

import KakaoMap from '@/app/mypage/address/detail/_components/KakaoMap'
import MapInfo from '@/app/mypage/address/detail/_components/MapInfo'
import { useState } from 'react'

const Address = () => {
  const [address, setAddress] = useState('')
  const [roadAddr, setRoadAddr] = useState('')
  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)

  const handleAddressChange = (address: string, roadAddr: string, lng: number, lat: number) => {
    setAddress(address)
    setRoadAddr(roadAddr)
    setLng(lng)
    setLat(lat)
  }

  return (
    <div className="flex flex-col gap-4 pb-5 pt-5">
      <KakaoMap onAddressChange={handleAddressChange} />
      <MapInfo address={address} roadAddr={roadAddr} lng={lng} lat={lat} />
    </div>
  )
}

export default Address
