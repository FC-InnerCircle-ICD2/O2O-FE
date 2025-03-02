'use client'

import useGetGeolocationToAddress from '@/api/useGetGeolocationToAddress'
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

interface CommonLayoutProps {
  children: React.ReactNode
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const { mutate: getGeolocationToAddress } = useGetGeolocationToAddress()

  const pathname = usePathname()

  const HIDDEN_BOTTOM_NAV_PATHS = [
    ROUTE_PATHS.SEARCH,
    ROUTE_PATHS.STORE_DETAIL,
    ROUTE_PATHS.MYPAGE_EDIT_PROFILE,
    ROUTE_PATHS.PAY,
    ROUTE_PATHS.ORDERS_DETAIL,
    ROUTE_PATHS.ADDRESS,
    ROUTE_PATHS.ADDRESS_DETAIL,
  ]

  const { storedValue: accessToken } = useLocalStorage('accessToken')

  const { refetch } = useGetMember()
  const { mutate: logout } = usePostLogout()

  const { setMember } = memberStore()
  const { setCoordinates, setError, setIsLoading, setAddress } = useGeoLocationStore()
  const { isGlobalLoading, setIsGlobalLoading } = globalLoaderStore()

  useEffect(() => {
    if (accessToken) {
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
    }
  }, [accessToken])

  useEffect(() => {
    setIsLoading(true)
    setIsGlobalLoading(true)

    // 메인 페이지 스크롤 위치 제거
    sessionStorage.removeItem('homeScrollPosition')
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    setIsGlobalLoading(false)
    const requestGeolocation = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' })

        if (permissionStatus.state === 'denied') {
          setIsGlobalLoading(false)
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

              getGeolocationToAddress(
                {
                  latitude: position.coords.latitude.toString(),
                  longitude: position.coords.longitude.toString(),
                },
                {
                  onSuccess: (data) => {
                    setAddress({
                      roadAddress: data.documents[0].road_address
                        ? data.documents[0].road_address.address_name
                        : '',
                      jibunAddress: data.documents[0].address.address_name,
                    })
                  },
                  onError: () => {
                    setError('위치 정보를 가져오는데 실패했습니다.')
                  },
                }
              )

              setCoordinates(coords)
              setIsLoading(false)
              setIsGlobalLoading(false)
            },
            (error) => {
              console.log('위치 정보 에러:', error)
              setError('위치 정보를 가져오는데 실패했습니다.')
            }
          )
        }
      } catch (error) {
        console.log('위치 정보 권한 확인 에러:', error)
        setError('위치 정보 권한을 확인하는데 실패했습니다.')
        setIsGlobalLoading(false)
      }
    }

    requestGeolocation()
  }, [isMounted])

  // 클라이언트 사이드 렌더링 전에는 로딩 상태 표시
  if (!isMounted || isGlobalLoading) return <Loading />
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
