import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
export interface CartItems {
  cartIds: number[]
}
const useDeleteCart = () => {
  return useMutation({
    mutationKey: ['carts', 'delete'],
    mutationFn: async (data: CartItems) => {
      return await api.delete<null>(`carts`, { json: data })
    },
  })
}
export default useDeleteCart
