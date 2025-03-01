import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'

export enum AddressType {
  HOME = 'HOME',
  COMPANY = 'COMPANY',
  OTHERS = 'OTHER',
}

export interface Address {
  memberAddressType: AddressType | undefined
  roadAddress: string
  jibunAddress: string
  detailAddress: string
  alias?: string
  latitude: number
  longitude: number
}

const usePostAddress = () => {
  return useMutation({
    mutationKey: ['addressKey'],
    mutationFn: async (data: Address) => {
      return await api.post(`members/address`, data)
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['addressKey'] })
    },
  })
}

export default usePostAddress
