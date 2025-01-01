import { create } from 'zustand'

interface Coordinates {
  latitude: number
  longitude: number
}

interface Address {
  roadAddress: string // 도로명 주소
  jibunAddress: string // 지번 주소
  sido: string // 시/도
  sigungu: string // 시/군/구
  addressName: string // 주소
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
  coordinates: null,
  address: null,
  isLoading: true,
  error: null,

  setCoordinates: (coords) => set({ coordinates: coords }),
  setAddress: (address) => set({ address: address }),
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
  setError: (error) => set({ error: error }),
}))
