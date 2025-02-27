import { useLocalStorage } from '@/hooks/useLocalStorage'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export interface Favorites {
  id: string
  name: string
  imageMain: string
  rating: number
  reviewCount: number
  minimumOrderAmount: number
}

const useGetFavorites = () => {
  const { storedValue: accessToken } = useLocalStorage<string>('accessToken')

  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => await api.get<Favorites[]>('favorites'),
    enabled: !!accessToken,
  })
}

export default useGetFavorites
