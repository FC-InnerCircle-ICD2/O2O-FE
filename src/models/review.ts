import { mockApi } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export interface PendingReview {
  orderId: string
  storeId: string
  storeImageUrl: string
  storeName: string
  menus: { menuName: string; menuCount: number }[]
}

export const usePendingReviews = () => {
  const res = useQuery<PendingReview[]>({
    queryKey: ['pendingReviews'],
    queryFn: () => mockApi.get('api/reviews/pending'),
  })

  return res
}
