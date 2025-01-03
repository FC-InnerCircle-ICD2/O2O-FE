'use client'

import { useGeoLocationStore } from '@/store/geoLocation'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

interface CommonLayoutProps {
  children: React.ReactNode
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { address, error, setCoordinates, setAddress, setError, setIsLoading } =
    useGeoLocationStore()

  useEffect(() => {
    // 카카오맵 스크립트가 로드되었는지 확인
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`
    script.async = true

    script.addEventListener('load', () => {
      // 스크립트 로드 완료 후 카카오맵 초기화
      window.kakao.maps.load(() => {
        setIsLoaded(true)
      })
    })
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    return
    if (!isLoaded) return

    const requestGeolocation = async () => {
      try {
        // 현재 권한 상태 확인
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' })

        if (permissionStatus.state === 'denied') {
          setError(
            '위치 정보가 차단되어 있습니다.\n 브라우저 설정에서 위치 정보 접근을 허용해주세요.',
          )
          return
        }

        // 여기서 카카오맵 관련 코드 실행
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }

              const geocoder = new window.kakao.maps.services.Geocoder()
              geocoder.coord2Address(
                coords.longitude,
                coords.latitude,
                (result: any, status: any) => {
                  if (status === window.kakao.maps.services.Status.OK) {
                    const roadAddr = result[0].road_address
                    const jibunAddr = result[0].address

                    const address = roadAddr
                      ? {
                          roadAddress: roadAddr.address_name,
                          jibunAddress: jibunAddr.address_name,
                          sido: roadAddr.region_1depth_name,
                          sigungu: roadAddr.region_2depth_name,
                          addressName: roadAddr.address_name,
                        }
                      : {
                          roadAddress: jibunAddr.address_name,
                          jibunAddress: jibunAddr.address_name,
                          sido: jibunAddr.region_1depth_name,
                          sigungu: jibunAddr.region_2depth_name,
                          addressName: jibunAddr.address_name,
                        }
                    setCoordinates(coords)
                    setAddress(address)
                    setIsLoading(false)
                  }
                },
              )
            },
            (error) => {
              console.error('위치 정보 에러:', error)
              setError('위치 정보를 가져오는데 실패했습니다.')
            },
          )
        }
      } catch (error) {
        console.error('위치 정보 권한 확인 에러:', error)
        setError('위치 정보 권한을 확인하는데 실패했습니다.')
      }
    }

    requestGeolocation()
  }, [isLoaded])

  //   if (error) return <Error message={error} />
  //   if (!address) return <Loading />

  return <div className="h-full flex flex-col">{children}</div>
}

export default CommonLayout
