import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

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
      const authToken = localStorage.getItem('authToken')
      const headers: Record<string, string> = {}
      const params: Record<string, string> = {}

      if (authToken) {
        headers.Authorization = authToken
        params.page = ''
        params.size = ''
        params.keyword = ''
      }

      return await api.get<Orders>(`orders`, {
        headers,
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
