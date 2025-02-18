import { useLocalStorage } from '@/hooks/useLocalStorage'
import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
export interface CartItem {
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
  const {storedValue: accessToken} = useLocalStorage<String>("accessToken")

  const { data: carts } = useQuery({
    queryKey: ['carts'],
    queryFn: async () => await api.get<Cart>(`carts`, {}),
    enabled: accessToken !== undefined,  // TODO: 로그인 한 경우에만 호출되도록
  })

  const resetCarts = () => {
    qc.refetchQueries({ queryKey: ['carts'] })
  }

  return { carts, resetCarts }
}

export default useGetCarts
