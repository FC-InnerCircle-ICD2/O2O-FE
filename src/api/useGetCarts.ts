import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
interface CartItem {
  cartId: number
  menuId: string
  name: string
  totalPrice: number
  quantity: number
  imageUrl: string
  orderMenuOptionGroups: {
    id: string
    name: string
    orderMenuOptionIds: {
      id: string
      name: string
    }[]
  }[]
}
export interface Cart {
  storeId: string
  orderMenus: CartItem[]
}

const useGetCarts = () => {
  const qc = useQueryClient()

  const { data: carts } = useQuery({
    queryKey: ['carts'],
    queryFn: async () => await api.get<Cart>(`carts`, {}),
    enabled: true,
  })

  const resetCarts = () => {
    qc.refetchQueries({ queryKey: ['carts'] })
  }

  return { carts, resetCarts }
}

export default useGetCarts
