import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export interface WritableReviews {
  content: [
    {
      storeId: string
      storeName: string
      orderId: string
      orderSummary: string
      orderTime: string
    },
  ]
  nextCursor: string | null
}

const useGetWritableReviews = () => {
  return useQuery({
    queryKey: ['writable-reviews'],
    queryFn: async () => {
      const params: Record<string, string> = {}
      const today = new Date()
      const formattedDate = today.toLocaleString('sv', { timeZone: 'Asia/Seoul' }).replace(' ', 'T')
      params.cursor = formattedDate
      params.size = '11'
      return await api.get<WritableReviews>(`reviews/writable`, {
        searchParams: params,
      })
    },
  })
}

export default useGetWritableReviews
