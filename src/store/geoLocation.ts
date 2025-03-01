import { create } from 'zustand'

export interface Coordinates {
  latitude: number
  longitude: number
}

interface Address {
  roadAddress: string // 도로명 주소
  jibunAddress: string // 지번 주소
  sido: string // 시/도
  sigungu: string // 시/군/구
  addressName: string // 주소
  detailAddress: string // 상세 주소
}

interface GeoLocationStore {
  coordinates: Coordinates | null
  address: Address | null
  isLoading: boolean
  error: string | null

  // 액션
  setCoordinates: (coords: Coordinates) => void
  setAddress: (address: Address) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string) => void
}

export const useGeoLocationStore = create<GeoLocationStore>((set) => ({
  coordinates: { latitude: 37.4955498697675, longitude: 127.029293901519 },
  address: {
    roadAddress: '서울특별시 강남구 강남대로 364',
    jibunAddress: '서울 강남구 역삼동 826-21',
    sido: '서울특별시',
    sigungu: '강남구',
    addressName: '역삼동',
    detailAddress: '미왕빌딩 10층 10C',
  },
  isLoading: true,
  error: null,

  setCoordinates: (coords) => set({ coordinates: coords }),
  setAddress: (address) => set({ address: address }),
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
  setError: (error) => set({ error: error }),
}))
