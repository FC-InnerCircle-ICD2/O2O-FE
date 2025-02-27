import { useLocalStorage } from '@/hooks/useLocalStorage'
import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ORDER_STATUS_CODE } from './useGetOrdersDetail'

export interface Orders {
  content: OrdersList[]
}

export interface OrdersList {
  storeId: string
  storeName: string
  orderId: string
  status: {
    code: ORDER_STATUS_CODE
    desc: string
  }
  orderTime: string
  orderSummary: string
  deliveryCompleteTime: string | null
  imageThumbnail: string
  paymentPrice: number
}

const useGetOrders = (searchParams?: string) => {
  const qc = useQueryClient()
  const { storedValue: accessToken } = useLocalStorage<string>('accessToken')

  const { data: orders, isSuccess } = useQuery({
    queryKey: ['orders', searchParams],
    queryFn: async () => {
      const params: Record<string, string> = {}

      params.page = ''
      params.size = ''
      params.keyword = searchParams ?? ''

      return await api.get<Orders>(`orders`, {
        searchParams: params,
      })
    },
    enabled: !!accessToken,
  })

  const resetGetOrders = () => {
    qc.removeQueries({ queryKey: ['orders'] })
  }

  return { orders, isSuccess, resetGetOrders }
}

export default useGetOrders
