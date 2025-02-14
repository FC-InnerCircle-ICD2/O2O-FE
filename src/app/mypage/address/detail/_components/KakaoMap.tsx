'use client'

import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

const center = {
  // 지도의 중심좌표
  lat: 33.450701,
  lng: 126.570667,
}

const KakaoMap = ({ onAddressChange }) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_APP_KEY
  const [scriptLoad, setScriptLoad] = useState<boolean>(false)
  const [position, setPosition] = useState<{ lat: number; lng: number }>()
  const [address, setAddress] = useState('')

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script')
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`
    document.head.appendChild(script)

    script.addEventListener('load', () => {
      setScriptLoad(true)

      // kakao.maps가 정의되었는지 확인
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const geocoder = new window.kakao.maps.services.Geocoder()
          geocoder.coord2Address(center.lng, center.lat, (result, status) => {
            const addr = result[0].address
            setAddress(addr.address_name) // 주소를 상태에 저장
            onAddressChange(addr.address_name)
          })
        })
      } else {
        console.error('Kakao Maps API가 로드되지 않았습니다.')
      }
    })

    // Cleanup function to remove the script
    return () => {
      document.head.removeChild(script)
    }
  }, [center, apiKey])
  return (
    <>
      <Map // 지도를 표시할 Container
        id="map"
        center={center}
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
        }}
      >
        <MapMarker position={position ?? center} />
      </Map>
    </>
  )
}

export default KakaoMap
