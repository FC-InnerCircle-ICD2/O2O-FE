import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
interface Cart {
  cartId: number
  quantity: number
}
const usePatchCarts = () => {
  return useMutation({
    mutationKey: ['carts', 'add'],
    mutationFn: async (data: Cart) => {
      return await api.patch<Cart>(`carts`, data)
    },
  })
}
export default usePatchCarts
