'use client'

import { AddressType } from '@/api/usePostAddress'
import KakaoMap from '@/app/mypage/address/detail/_components/KakaoMap'
import { useGeoLocationStore } from '@/store/geoLocation'
import { useState } from 'react'
import { useKakaoLoader } from 'react-kakao-maps-sdk'
import MapInfo from './MapInfo'

export interface AddressData {
  type: AddressType
  address: string
  roadAddr: string
  detail: string
  coords: {
    lat: number
    lng: number
  }
  alias?: string
}

const AddressDetail = ({ type = AddressType.HOME }: { type?: AddressType }) => {
  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
    libraries: ['services'],
  })
  const { coordinates } = useGeoLocationStore()
  const [addressData, setAddressData] = useState<AddressData>({
    type,
    address: '',
    roadAddr: '',
    detail: '',
    alias: '',
    coords: coordinates
      ? {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }
      : {
          lat: 0,
          lng: 0,
        },
  })

  const handleAddressChange = (data: AddressData) => {
    setAddressData(data)
  }

  if (!coordinates || loading) return <></>

  return (
    <div className="flex flex-col gap-4">
      <KakaoMap addressData={addressData} onAddressChange={handleAddressChange} />
      <MapInfo addressData={addressData} onAddressChange={handleAddressChange} />
    </div>
  )
}

export default AddressDetail
