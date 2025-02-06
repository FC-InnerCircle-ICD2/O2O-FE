import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export interface Orders {
  content: []
}

export interface OrdersList {
  order: {
    storeId: string
    storeName: string
    orderId: string
    status: {
      code: string
      desc: string
    }
    orderTime: string
    orderSummary: string
    deliveryCompleteTime: string | null
    imageThumbnail: string
    paymentPrice: number
  }
}

const useGetOrders = () => {
  const qc = useQueryClient()

  const { data: orders, isSuccess } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const params: Record<string, string> = {}

      params.page = ''
      params.size = ''
      params.keyword = ''

      return await api.get<Orders>(`orders`, {
        searchParams: params,
      })
    },
  })

  const resetGetOrders = () => {
    qc.removeQueries({ queryKey: ['orders'] })
  }

  return { orders, isSuccess, resetGetOrders }
}

export default useGetOrders
