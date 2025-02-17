import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
interface Cart {
  id: number
  name: string
  price: number
  quantity: number
  imageUrl: string
  stock: number
  selected: boolean
}
const useGetCarts = () => {
  return useQuery({
    queryKey: ['carts'],
    queryFn: async () => await api.get<Cart[]>(`carts`, {}),
    enabled: false,
  })
}
export default useGetCarts
