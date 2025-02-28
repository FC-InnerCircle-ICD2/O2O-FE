'use client'

import { Coordinates } from '@/store/geoLocation'
import { useEffect, useState } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

const { kakao } = window

const KakaoMap = ({
  onAddressChange,
  data,
  coords,
}: {
  onAddressChange: (address: string, roadAddr: string, lng: number, lat: number) => void
  data: string
  coords: Coordinates
}) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_APP_KEY
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: coords.latitude,
    lng: coords.longitude,
  })

  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder>(null)

  const [address, setAddress] = useState('')
  const [roadAddr, setRoadAddr] = useState('')
  const [lng, setLng] = useState(0)
  const [lat, setLat] = useState(0)

  const [isMapLoading] = useKakaoLoader({
    appkey: apiKey!,
    libraries: ['services'],
  })

  useEffect(() => {
    if (!position) return
  }, [position])

  // useEffect(() => {
  //   if (!isMounted) return

  //   // 카카오맵 스크립트 로드
  //   const script = document.createElement('script')
  //   script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`
  //   script.async = true

  //   script.addEventListener('load', () => {
  //     window.kakao.maps.load(() => {
  //       setIsLoaded(true)
  //     })
  //   })
  //   document.head.appendChild(script)
  //   return () => {
  //     document.head.removeChild(script)
  //   }
  // }, [isMounted])

  useEffect(() => {
    // 카카오맵 스크립트 로드
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`
    script.async = true

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder()
        setGeocoder(geocoder)

        if (position) {
          geocoder.coord2Address(
            position.lng,
            position.lat,
            (
              result: Array<{
                /**
                 * 지번 주소 상세 정보
                 */
                address: kakao.maps.services.Address
                /**
                 * 도로명 주소 상세 정보
                 */
                road_address: kakao.maps.services.RoadAaddress | null
              }>,
              status: kakao.maps.services.Status
            ) => {
              console.log({ result })
              console.log({ status })
              const addr = result[0]
              setAddress(addr.address.address_name)
              setRoadAddr(addr.road_address?.address_name || '')
            }
          )
        }
      })
    })
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }

    // const geocoder = new window.kakao.maps.services.Geocoder()

    // console.log({ geocoder })
    // console.log({ position })
    // setGeocoder(geocoder)
  }, [])

  // useEffect(() => {
  //   if (isMapLoading || isLoading || !coordinates) return

  //   if (data != '') {
  //     const geocoder = new window.kakao.maps.services.Geocoder()
  //     geocoder.addressSearch(data, (result, status) => {
  //       setLng(result[0].x)
  //       setLat(result[0].y)
  //       setAddress(result[0].address.address_name)
  //       setRoadAddr(result[0].road_address.address_name)
  //       onAddressChange(
  //         result[0].address.address_name,
  //         result[0].road_address.address_name,
  //         result[0].x,
  //         result[0].y
  //       )
  //     })
  //   } else {
  //     const geocoder = new window.kakao.maps.services.Geocoder()
  //     geocoder.coord2Address(coordinates?.longitude, coordinates?.latitude, (result, status) => {
  //       const addr = result[0]
  //       setAddress(addr.address.address_name)
  //       setRoadAddr(addr.road_address.address_name)
  //       setLng(coordinates?.longitude)
  //       setLat(coordinates?.latitude)
  //       onAddressChange(
  //         addr.address.address_name,
  //         addr.road_address.address_name,
  //         coordinates?.longitude,
  //         coordinates?.latitude
  //       )
  //     })
  //   }
  // }, [isMapLoading, isLoading, coordinates])

  return (
    <>
      <Map // 지도를 표시할 Container
        id="map"
        center={position}
        style={{
          width: '100%',
          height: '350px',
        }}
        level={3} // 지도의 확대 레벨
        onClick={(_, mouseEvent) => {
          if (!geocoder) return

          const latlng = mouseEvent.latLng

          setPosition({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          })

          geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
            const addr = result[0]
            setAddress(addr.address.address_name)
            setRoadAddr(addr.road_address?.address_name || '')
            onAddressChange(
              addr.address.address_name,
              addr.road_address?.address_name || '',
              latlng.getLng(),
              latlng.getLat()
            )
          })
        }}
      >
        <MapMarker position={position} />
      </Map>
    </>
  )
}

export default KakaoMap
