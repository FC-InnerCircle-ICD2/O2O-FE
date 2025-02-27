'use client'

import { useEffect, useState, useRef } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
import useGeolocation from '@/app/mypage/address/detail/_components/useGeolocation'
import { useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    kakao: any
  }
}

const KakaoMap = ({ onAddressChange, data }) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_APP_KEY
  const [position, setPosition] = useState<{ lat: number; lng: number }>()
  const [address, setAddress] = useState('')
  const [roadAddr, setRoadAddr] = useState('')
  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)
  const { coordinates, currentAddr, error, isLoading } = useGeolocation()
  const searchParams = useSearchParams()
  const [isMapLoading] = useKakaoLoader({
    appkey: apiKey,
    libraries: ['services'],
  })

  useEffect(() => {
    if (isMapLoading || isLoading || !coordinates) return

    if (data != '') {
      const geocoder = new window.kakao.maps.services.Geocoder()
      geocoder.addressSearch(data, (result, status) => {
        setLng(result[0].x)
        setLat(result[0].y)
        setAddress(result[0].address.address_name)
        setRoadAddr(result[0].road_address.address_name)
        onAddressChange(
          result[0].address.address_name,
          result[0].road_address.address_name,
          result[0].x,
          result[0].y
        )
      })
    } else {
      const geocoder = new window.kakao.maps.services.Geocoder()
      geocoder.coord2Address(coordinates?.longitude, coordinates?.latitude, (result, status) => {
        const addr = result[0]
        setAddress(addr.address.address_name)
        setRoadAddr(addr.road_address.address_name)
        setLng(coordinates?.longitude)
        setLat(coordinates?.latitude)
        onAddressChange(
          addr.address.address_name,
          addr.road_address.address_name,
          coordinates?.longitude,
          coordinates?.latitude
        )
      })
    }
  }, [isMapLoading, isLoading, coordinates])

  return (
    <>
      <Map // 지도를 표시할 Container
        id="map"
        center={{ lat: lat || 37.5665, lng: lng || 126.978 }}
        style={{
          width: '100%',
          height: '350px',
        }}
        level={3} // 지도의 확대 레벨
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng
          setPosition({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          })

          const geocoder = new window.kakao.maps.services.Geocoder()
          geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
            const addr = result[0]
            setAddress(addr.address.address_name)
            setRoadAddr(addr.road_address.address_name)
            onAddressChange(
              addr.address.address_name,
              addr.road_address.address_name,
              latlng.getLng(),
              latlng.getLat()
            )
          })
        }}
      >
        <MapMarker position={position ?? { lat: lat, lng: lng }} />
      </Map>
    </>
  )
}

export default KakaoMap
