import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
interface Cart {
  storeId: string
  orderMenu: {
    menuId: string
    quantity: number
    orderMenuOptionGroups: {
      id: string
      orderMenuOptionIds: string[]
    }[]
  }
}
const usePostCarts = () => {
  return useMutation({
    mutationKey: ['carts', 'add'],
    mutationFn: async (data: Cart) => {
      return await api.post<null>(`carts`, data)
    },
  })
}
export default usePostCarts
