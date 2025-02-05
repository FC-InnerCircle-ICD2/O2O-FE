import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

interface Order {
  storeId: string
  storeName: string
  orderId: string
  status: {
    code: string
    desc: string
  }
  orderTime: string // ISO 8601 형식의 날짜 문자열
  orderSummary: string
  deliveryCompleteTime: string | null // 완료 시간이 없을 수 있으므로 null 허용
  imageThumbnail: string
  paymentPrice: number
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

      return await api.get<Order>(`orders`, {
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
