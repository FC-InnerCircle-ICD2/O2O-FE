import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface PostReviewData {
  orderId: string
  storeId: string
  content: string
  totalScore: number
  tasteScore: number
  quantityScore: number
  deliveryQuality: 'GOOD' | 'BAD'
  image: File | null
}

const usePostReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (postReviewData: PostReviewData) => {
      const formData = new FormData()

      const reviewData = {
        orderId: postReviewData.orderId,
        storeId: postReviewData.storeId,
        content: postReviewData.content,
        totalScore: postReviewData.totalScore,
        tasteScore: postReviewData.tasteScore,
        amountScore: postReviewData.quantityScore,
        deliveryQuality: postReviewData.deliveryQuality,
      }

      // review 데이터를 문자열로 변환하여 추가
      const reviewBlob = new Blob([JSON.stringify(reviewData)], {
        type: 'application/json',
      })
      formData.append('review', reviewBlob)

      if (postReviewData.image) {
        formData.append('image', postReviewData.image)
      }

      return await api.post('reviews', formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['writable-reviews'] })
    },
  })
}

export default usePostReview
