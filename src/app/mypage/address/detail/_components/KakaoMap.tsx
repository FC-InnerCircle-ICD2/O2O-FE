'use client'

import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

const center = {
  // 지도의 중심좌표
  lat: 33.450701,
  lng: 126.570667,
}

const KakaoMap = () => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_APP_KEY
  const [scriptLoad, setScriptLoad] = useState<boolean>(false)
  const [position, setPosition] = useState<{ lat: number; lng: number }>()

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script')
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`
    document.head.appendChild(script)

    script.addEventListener('load', () => {
      setScriptLoad(true)
    })
  }, [])
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
      {/*<p>*/}
      {/*  <em>지도를 클릭해주세요!</em>*/}
      {/*</p>*/}
      {/*<div id="clickLatlng">*/}
      {/*  {position && `클릭한 위치의 위도는 ${position.lat} 이고, 경도는 ${position.lng} 입니다`}*/}
      {/*</div>*/}
    </>
  )
}

export default KakaoMap
