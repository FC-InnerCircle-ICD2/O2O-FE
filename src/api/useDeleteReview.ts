import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (reviewId: string) => {
      return await api.delete(`reviews/${reviewId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['completed-reviews'] })
    },
  })
}

export default useDeleteReview
