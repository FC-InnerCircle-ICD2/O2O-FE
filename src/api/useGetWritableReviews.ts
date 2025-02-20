import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export interface WritableReviewType {
  storeId: string
  storeName: string
  orderId: string
  orderSummary: string
  orderTime: string
  storeImageThumbnail: string | null
}

const useGetWritableReviews = () => {
  return useQuery({
    queryKey: ['writable-reviews'],
    queryFn: async () => {
      return await api.get<WritableReviewType[]>(`reviews/writable`)
    },
  })
}

export default useGetWritableReviews
