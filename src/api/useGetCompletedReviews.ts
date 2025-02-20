import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export interface CompletedReviewType {
  reviewId: string
  storeId: string
  storeName: string
  createTime: string
  menuImage: string | null
  menuName: string
  totalScore: number
  tasteScore: number
  amountScore: number
  representativeImageUri: string | null
  clientReviewContent: string
  editDeadline: number
  deliveryQuality?: 'GOOD' | 'BAD'
}

export interface CompletedReviews {
  content: CompletedReviewType[]
  nextCursor: string | null
  totalCount: number
}

interface Props {
  page?: number
}

const useGetCompletedReviews = ({ page = 1 }: Props) => {
  return useQuery({
    queryKey: ['completed-reviews', page],
    queryFn: async () => {
      const params: Record<string, string> = {}
      params.page = page.toString()
      params.size = '5'
      return await api.get<CompletedReviews>(`reviews`, {
        searchParams: params,
      })
    },
  })
}

export default useGetCompletedReviews
