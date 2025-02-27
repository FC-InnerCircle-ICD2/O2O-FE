import { Orders } from '@/app/orders/_components/Order'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

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
