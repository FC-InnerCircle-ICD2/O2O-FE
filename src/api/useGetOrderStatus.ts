import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export type OrderStatus = 'NEW' | 'ONGOING' | 'DONE' | 'REFUSE' | 'CANCELED'

const useGetOrderStatus = (orderId?: string) => {
  const { data: status, isSuccess } = useQuery({
    queryKey: ['orderStatus', orderId],
    queryFn: async () => {
      return await api.get<OrderStatus>(`orders/${orderId}/status`)
    },
    refetchInterval: (data) => {
      const shouldRefetch = ['NEW', 'ONGOING'].includes(data.state.data as OrderStatus)
      return shouldRefetch ? 5000 : false
    },
  })

  return { status, isSuccess }
}

export default useGetOrderStatus
