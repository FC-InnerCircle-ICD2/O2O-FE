import { api } from '@/lib/api'
import { useGeoLocationStore } from '@/store/geoLocation'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface StoreDetail {
  address: string
  deliveryTime: string
  freeDelivery: boolean
  id: string
  imageMain: string
  latitude: number
  longitude: number
  name: string
  phone: string
  rating: number
  reviewCount: number
  minimumOrderAmount: number
  deliveryDistance: number
}

const useGetStoreDetail = (id: string | null) => {
  const qc = useQueryClient()
  const { coordinates: location } = useGeoLocationStore()

  const {
    data: storeDetail,
    isSuccess,
    isError,
  } = useQuery({
    enabled: Boolean(id && location && location.latitude && location.longitude),
    queryKey: ['storeDetail', id],
    queryFn: async () =>
      await api.get<StoreDetail>(`stores/${id}`, {
        headers: {
          'X-User-Lat': location?.latitude.toString() || '',
          'X-User-Lng': location?.longitude.toString() || '',
        },
      }),
  })

  const resetStoreDetail = () => {
    qc.removeQueries({ queryKey: ['storeDetail', id] })
  }

  return { storeDetail, resetStoreDetail, isSuccess, isError }
}

export default useGetStoreDetail
