'use client'

import Icon from '@/components/Icon'
import { useGeoLocationStore } from '@/store/geoLocation'
import { useEffect, useRef, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { AddressData } from './AddressDetail'

declare global {
  interface Window {
    kakao: any
  }
}

const KakaoMap = ({
  addressData,
  onAddressChange,
}: {
  addressData: AddressData
  onAddressChange: (data: AddressData) => void
}) => {
  // const [loading] = useKakaoLoader({
  //   appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
  //   libraries: ['services'],
  // })
  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(null)
  const mapRef = useRef<kakao.maps.Map | null>(null)

  const { coordinates } = useGeoLocationStore()

  useEffect(() => {
    // 카카오맵 스크립트 로드
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`
    script.async = true

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder()
        setGeocoder(geocoder)

        if (addressData.coords) {
          geocoder.coord2Address(
            addressData.coords.lng,
            addressData.coords.lat,
            (
              result: Array<{
                address: kakao.maps.services.Address
                road_address: kakao.maps.services.RoadAaddress | null
              }>,
              status: kakao.maps.services.Status
            ) => {
              const addr = result[0]

              onAddressChange({
                ...addressData,
                address: addr.address.address_name,
                roadAddr: addr.road_address?.address_name || '',
              })
            }
          )
        }
      })
    })

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // if (loading) return <></>

  return (
    <div className="relative">
      <Map // 지도를 표시할 Container
        id="map"
        ref={mapRef}
        center={addressData.coords}
        style={{
          width: '100%',
          height: '300px',
        }}
        level={3} // 지도의 확대 레벨
        onClick={(_, mouseEvent) => {
          if (!geocoder) return

          const latlng = mouseEvent.latLng

          geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
            const addr = result[0]

            onAddressChange({
              ...addressData,
              address: addr.address.address_name,
              roadAddr: addr.road_address?.address_name || '',
              coords: {
                lat: latlng.getLat(),
                lng: latlng.getLng(),
              },
            })
          })
        }}
      >
        <MapMarker position={addressData.coords} />
      </Map>
      <div
        className="absolute bottom-4 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-white shadow-xl"
        onClick={() => {
          if (!mapRef.current || !window.kakao || !coordinates) return

          onAddressChange({
            ...addressData,
            coords: {
              lat: coordinates.latitude,
              lng: coordinates.longitude,
            },
          })
          mapRef.current.setCenter(
            new window.kakao.maps.LatLng(coordinates.latitude, coordinates.longitude)
          )
        }}
      >
        <Icon name="LocateFixed" size={22} className="text-primary" />
      </div>
    </div>
  )
}

export default KakaoMap
