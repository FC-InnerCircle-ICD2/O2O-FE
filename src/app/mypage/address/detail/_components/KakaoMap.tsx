'use client'

import Pin from '@/assets/images/pin.png'
import Icon from '@/components/Icon'
import { cn } from '@/lib/utils'
import { useGeoLocationStore } from '@/store/geoLocation'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
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
  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(null)
  const mapRef = useRef<kakao.maps.Map | null>(null)

  const [isDragging, setIsDragging] = useState(false)

  const { coordinates } = useGeoLocationStore()

  const getCenter = () => {
    if (!mapRef.current || !geocoder) return

    const latlng = mapRef.current.getCenter()

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
  }

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
        onDragStart={() => {
          setIsDragging(true)
        }}
        onDragEnd={(_, mouseEvent) => {
          setIsDragging(false)
          getCenter()
        }}
        onZoomChanged={(map) => {
          getCenter()
        }}
      ></Map>
      <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div
          className={cn(
            'relative top-0 size-8 opacity-100 transition-all duration-200',
            isDragging && '-top-3 opacity-50'
          )}
        >
          <Image src={Pin} alt="pin" className="size-full" />
        </div>
        <div className="absolute -bottom-1 h-2 w-4 rounded-[50%] bg-black/20" />
      </div>
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

          setTimeout(() => {
            getCenter()
          }, 100)
        }}
      >
        <Icon name="LocateFixed" size={22} className="text-primary" />
      </div>
    </div>
  )
}

export default KakaoMap
