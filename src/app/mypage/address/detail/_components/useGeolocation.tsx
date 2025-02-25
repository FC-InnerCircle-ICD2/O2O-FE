import { useEffect, useState } from 'react'
import { useKakaoLoader } from 'react-kakao-maps-sdk'

interface Coordinates {
  latitude: number
  longitude: number
}

interface Address {
  roadAddress: string
  jibunAddress: string
  sido: string
  sigungu: string
  addressName: string
}

const useGeolocation = () => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_APP_KEY
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [currentAddr, setAddress] = useState<Address | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMapLoading] = useKakaoLoader({
    appkey: apiKey,
    libraries: ['services'],
  })

  useEffect(() => {
    if (isMapLoading) return

    const requestGeolocation = async () => {
      try {
        // 현재 권한 상태 확인
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' })

        if (permissionStatus.state === 'denied') {
          setError(
            '위치 정보가 차단되어 있습니다.\n 브라우저 설정에서 위치 정보 접근을 허용해주세요.'
          )
          return
        }

        // 위치 정보 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }

              setCoordinates(coords)
              setIsLoading(false)
            },
            (error) => {
              console.error('위치 정보 에러:', error)
              setError('위치 정보를 가져오는데 실패했습니다.')
            }
          )
        }
      } catch (error) {
        console.error('위치 정보 권한 확인 에러:', error)
        setError('위치 정보 권한을 확인하는데 실패했습니다.')
      }
    }

    requestGeolocation()
  }, [isMapLoading])

  return { coordinates, currentAddr, error, isLoading }
}

export default useGeolocation
