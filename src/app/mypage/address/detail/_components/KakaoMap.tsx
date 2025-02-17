'use client'

import { useEffect, useState, useRef } from 'react'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'

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
  const [roadAddr, setRoadAddr] = useState('')
  const [isMapLoading] = useKakaoLoader({
    appkey: apiKey,
    libraries: ['services']
  })


  useEffect(() => {
    if(isMapLoading) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(center.lng, center.lat, (result, status) => {
      const addr = result[0]
      setAddress(addr.address.address_name)
      setRoadAddr(addr.road_address.address_name)
      onAddressChange(addr.address.address_name, addr.road_address.address_name)
    })

  }, [isMapLoading, position])



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

          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
            const addr = result[0]
            setAddress(addr.address.address_name)
            setRoadAddr(addr.road_address.address_name)
            onAddressChange(addr.address.address_name, addr.road_address.address_name)
          })
        }}
      >
        <MapMarker position={position ?? center} />
      </Map>
    </>
  )
}

export default KakaoMap
