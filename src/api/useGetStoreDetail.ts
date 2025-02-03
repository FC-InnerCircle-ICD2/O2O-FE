import { api } from '@/lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface StoreDetail {
  address: string
  deliveryTime: string
  freeDelivery: boolean
  id: number
  imageMain: string
  latitude: number
  longitude: number
  name: string
  phone: string
  rating: number
  reviewCount: number
}

const useGetStoreDetail = (id: number) => {
    const qc = useQueryClient()

    const { data: storeDetail, isSuccess } = useQuery({
        queryKey: ['storeDetail', id],
        queryFn: async () => await api.get<StoreDetail>(`stores/${id}`, {
          headers: {
            'X-User-Lat': '37.71936226550588',
            'X-User-Lng': '126.9780',
          }
        })
    })

      const resetStoreDetail = () => {
        qc.removeQueries({ queryKey: ['storeDetail', id] })
      }

      return { storeDetail, resetStoreDetail, isSuccess }
}

export default useGetStoreDetail



