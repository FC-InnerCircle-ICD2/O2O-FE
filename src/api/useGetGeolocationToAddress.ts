import { useMutation } from '@tanstack/react-query'
import ky from 'ky'

interface GeolocationToAddressResponse {
  address_name: string
  main_address_no: string
  mountain_yn: string
  region_1depth_name: string
  region_2depth_name: string
  region_3depth_name: string
  sub_address_no: string
  zip_code: string
}

const useGetGeolocationToAddress = () => {
  return useMutation({
    mutationFn: ({ longitude, latitude }: { longitude: string; latitude: string }) =>
      ky
        .get<{
          documents: {
            address: GeolocationToAddressResponse
            road_address: GeolocationToAddressResponse
          }[]
        }>('https://dapi.kakao.com/v2/local/geo/coord2address.json', {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
          },
          searchParams: {
            x: longitude,
            y: latitude,
          },
        })
        .json(),
  })
}

export default useGetGeolocationToAddress
