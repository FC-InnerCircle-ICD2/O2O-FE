import { api } from '@/lib/api';
import { Member } from '@/models/auth';
import { useQuery } from '@tanstack/react-query';

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

const useGetMember = () => {
    return useQuery({
        queryKey: ['member'],
            queryFn: async () => await api.get<Member>(`members`, {
        }),
    })
}

export default useGetMember



