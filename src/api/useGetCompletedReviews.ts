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
