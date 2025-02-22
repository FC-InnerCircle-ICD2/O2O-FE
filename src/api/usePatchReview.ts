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
  isImageChanged: boolean
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

      // isImageChanged: true의 경우 이미지가 있으면 변경, 없으면 기존 이미지 삭제
      // isImageChanged: false의 경우 기존 이미지 사용(수정하지 않은 경우)
      // 파일을 전송하지 않는 경우 => 기존 이미지를 유지하는 경우(false), 이미지를 삭제한 경우(true)
      // 파일을 전송하는 경우 => 새로운 이미지를 업로드하는 경우(true)
      if (patchReviewData.isImageChanged && patchReviewData.image) {
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
