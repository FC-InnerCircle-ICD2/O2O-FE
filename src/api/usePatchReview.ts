import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface PatchReviewData {
  reviewId: string
  content: string
  totalScore: number
  tasteScore: number
  amountScore: number
  deliveryQuality: 'GOOD' | 'BAD'
  image: File | null
}

const usePatchReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (patchReviewData: PatchReviewData) => {
      const formData = new FormData()

      const reviewData = {
        content: patchReviewData.content,
        totalScore: patchReviewData.totalScore,
        tasteScore: patchReviewData.tasteScore,
        amountScore: patchReviewData.amountScore,
        deliveryQuality: patchReviewData.deliveryQuality,
      }

      // review 데이터를 문자열로 변환하여 추가
      const reviewBlob = new Blob([JSON.stringify(reviewData)], {
        type: 'application/json',
      })
      formData.append('review', reviewBlob)

      if (patchReviewData.image) {
        formData.append('image', patchReviewData.image)
      }

      return await api.patch(`reviews/${patchReviewData.reviewId}`, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['writable-reviews'] })
      queryClient.invalidateQueries({ queryKey: ['completed-reviews'] })
    },
  })
}

export default usePatchReview
