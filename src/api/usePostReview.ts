import { useMutation, useQueryClient } from '@tanstack/react-query'
import ky from 'ky'

interface PostReviewData {
  orderId: string
  storeId: string
  content: string
  totalScore: number
  tasteScore: number
  quantityScore: number
  deliveryQuality: 'GOOD' | 'BAD'
  image?: File
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
        quantityScore: postReviewData.quantityScore,
        deliveryQuality: postReviewData.deliveryQuality,
      }

      // review 데이터를 문자열로 변환하여 추가
      formData.append('review', 'gg')

      if (postReviewData.image) {
        formData.append('image', postReviewData.image)
      }

      formData.append('orderId', postReviewData.orderId.toString())

      return await ky.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      // return await ky.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/reviews`, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      //   json: formData,
      // })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['writable-reviews'] })
    },
  })
}

export default usePostReview
