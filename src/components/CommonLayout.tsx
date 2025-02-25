'use client'

import useGetMember from '@/api/useGetMember'
import usePostLogout from '@/api/usePostLogout'
import { getNavigationProps } from '@/constants/navigationProps'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useGeoLocationStore } from '@/store/geoLocation'
import globalLoaderStore from '@/store/globalLoader'
import memberStore from '@/store/user'
import { ROUTE_PATHS } from '@/utils/routes'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import BottomNavigation from './BottomNavigation'
import Loading from './Loading'
import Navigation from './Navigation'

declare global {
  interface Window {
    kakao: any
  }
}

interface CommonLayoutProps {
  children: React.ReactNode
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [coordinates, setCoordinatesState] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const { address, error, setCoordinates, setAddress, setError, setIsLoading } =
    useGeoLocationStore()
  const pathname = usePathname()

  const HIDDEN_BOTTOM_NAV_PATHS = [
    ROUTE_PATHS.SEARCH,
    ROUTE_PATHS.STORE_DETAIL,
    ROUTE_PATHS.MYPAGE_EDIT_PROFILE,
    ROUTE_PATHS.PAY,
    ROUTE_PATHS.ORDERS_DETAIL,
  ]

  const { storedValue: accessToken } = useLocalStorage('accessToken')
  const { data: memberData, isFetching, refetch } = useGetMember()
  const { mutate: logout } = usePostLogout()
  const { setMember } = memberStore()
  const { setIsGlobalLoading } = globalLoaderStore()

  useEffect(() => {
    if (accessToken) {
      setIsGlobalLoading(true)

      refetch()
        .then((res) => {
          if (res.error) {
            logout()
            return
          }

          if (res.data) {
            setMember(res.data)
          }
        })
        .catch((error) => {
          logout()
        })
        .finally(() => {
          setIsGlobalLoading(false)
        })
    }
  }, [accessToken])

  useEffect(() => {
    // 메인 페이지 스크롤 위치 제거
    sessionStorage.removeItem('homeScrollPosition')
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const requestGeolocation = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' })

        if (permissionStatus.state === 'denied') {
          setError(
            '위치 정보가 차단되어 있습니다.\n 브라우저 설정에서 위치 정보 접근을 허용해주세요.'
          )
          return
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }
              setCoordinatesState(coords)
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
  }, [isMounted])

  useEffect(() => {
    if (!isMounted) return

    // 카카오맵 스크립트 로드
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`
    script.async = true

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true)
      })
    })
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [isMounted])

  useEffect(() => {
    if (!isLoaded || !coordinates) return

    const geocoder = new window.kakao.maps.services.Geocoder()
    geocoder.coord2Address(
      coordinates.longitude,
      coordinates.latitude,
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
          setAddress(address)
        }
      }
    )
  }, [isLoaded, coordinates])

  // 클라이언트 사이드 렌더링 전에는 로딩 상태 표시
  if (!isMounted) return <Loading />
  //   if (error) return <Error message={error} />
  //   if (!address) return <Loading />

  if (pathname === ROUTE_PATHS.WELCOME)
    return (
      <div className="mx-auto flex h-full min-w-[320px] max-w-[480px] flex-col bg-white">
        {children}
      </div>
    )

  return (
    <div className="mx-auto flex h-full min-w-[320px] max-w-[480px] flex-col bg-white">
      {!pathname.startsWith(ROUTE_PATHS.STORE_DETAIL) && (
        <Navigation {...getNavigationProps(pathname)} />
      )}
      {children}
      {!HIDDEN_BOTTOM_NAV_PATHS.some((path) => pathname.startsWith(path)) && <BottomNavigation />}
    </div>
  )
}

export default CommonLayout
