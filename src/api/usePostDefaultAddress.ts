'use client'

import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'

const usePostDefaultAddress = () => {
  return useMutation({
    mutationKey: ['addressKey'],
    mutationFn: async (id: number) => {
      return await api.put(`members/address/${id}/default`, {})
    },
  })
}

export default usePostDefaultAddress
