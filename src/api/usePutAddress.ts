import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { Address } from './usePostAddress'

interface UpdateAddress extends Address {
  id: number
}

const usePutAddress = () => {
  return useMutation({
    mutationKey: ['updateAddress'],
    mutationFn: async (data: UpdateAddress) => {
      return await api.put(`members/address/${data.id}`, data)
    },
  })
}

export default usePutAddress
