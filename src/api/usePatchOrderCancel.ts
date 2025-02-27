import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const usePatchOrderCancel = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderId: string) => api.patch(`orders/${orderId}/cancel`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordersDetail'] })
    },
  })
}

export default usePatchOrderCancel
