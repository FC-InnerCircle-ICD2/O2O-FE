import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export interface PendingReview {
  orderId: string
  storeId: string
  storeImageThumbnail: string
  storeName: string
  orderSummary: string
  orderTime: string
  // menus: { menuName: string; menuCount: number }[]
}

export const usePendingReviews = () => {
  const res = useQuery<PendingReview[]>({
    queryKey: ['pendingReviews'],
    queryFn: async () => await api.get('reviews/writable'),
  })

  return res
}
