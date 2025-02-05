import { useLocalStorage } from '@/hooks/useLocalStorage';
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
    const accessToken = useLocalStorage('accessToken')
    return useQuery({
        queryKey: ['member'],
        queryFn: async () => await api.get<Member>(`members`, {
        }),
        enabled: !!accessToken.storedValue,
        initialData: null
    })
}

export default useGetMember



