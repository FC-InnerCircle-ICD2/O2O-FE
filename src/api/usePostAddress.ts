import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface Address {
  address: {
    addressType: string | undefined
    roadAddress: string
    jibunAddress: string
    detailAddress: string
    alias: string
    latitude: number
    longitude: number
  }
}

const usePostAddress = () => {
  return useMutation({
    mutationKey: ['addressKey'],
    mutationFn: async (data: Address) => {
      return await api.post(`members/address`, data)
    },
  })
}

export default usePostAddress
