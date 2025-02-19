import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export interface CompletedReviewType {
  reviewId: string
  storeId: string
  storeName: string
  createTime: string
  menuImage: string
  menuName: string
  totalScore: number
  tasteScore: number
  amountScore: number
  representativeImageUri: string
  clientReviewContent: string
  editDeadline: number
}
export interface CompletedReviews {
  content: CompletedReviewType[]
  nextCursor: string | null
}

const useGetCompletedReviews = () => {
  return useQuery({
    queryKey: ['completed-reviews'],
    queryFn: async () => {
      const params: Record<string, string> = {}
      params.page = '1'
      params.size = '11'
      return await api.get<CompletedReviews>(`reviews`, {
        searchParams: params,
      })
    },
  })
}

export default useGetCompletedReviews
