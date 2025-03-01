import { useMutation } from '@tanstack/react-query'
import ky from 'ky'

const useGetAddressToGeolocation = () => {
  return useMutation({
    mutationFn: (address: string) =>
      ky
        .get<{
          documents: {
            jibunAddress: string
            roadAddress: string
            x: string
            y: string
          }[]
        }>('https://dapi.kakao.com/v2/local/search/address.json', {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
          },
          searchParams: {
            query: address,
          },
        })
        .json(),
  })
}

export default useGetAddressToGeolocation
