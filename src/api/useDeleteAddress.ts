import { api } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeleteAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (addressId: number) => {
      return await api.delete(`members/address/${addressId}`)
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['completed-addresses'] })
    },
  })
}

export default useDeleteAddress
