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
const usePatchCarts = () => {
  return useMutation({
    mutationKey: ['carts', 'add'],
    mutationFn: async (data: Cart) => {
      return await api.patch<null>(`carts`, data)
    },
  })
}
export default usePatchCarts
