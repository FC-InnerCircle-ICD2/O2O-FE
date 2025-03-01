import { api } from '@/lib/api'
import addressStore from '@/store/addressStore'
import memberStore from '@/store/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface Address {
  id: number
  isDefault: boolean
  roadAddress: string
  jibunAddress: string
  detailAddress: string
  latitude: number
  longitude: number
  alias?: string
}

export interface AddressResponseData {
  defaultAddress?: Address
  house?: Address
  company?: Address
  others?: Address[]
}

const useGetAddress = () => {
  const qc = useQueryClient()
  const { member } = memberStore()
  const { setAddress } = addressStore()

  const { data: address, isSuccess } = useQuery({
    queryKey: ['address'],
    queryFn: async () => {
      const response = await api.get<AddressResponseData>(`members/address`)
      setAddress(response)

      return response
    },
    enabled: !!member,
  })

  const resetGetAddress = () => {
    qc.removeQueries({ queryKey: ['address'] })
  }

  return { address, isSuccess, resetGetAddress }
}

export default useGetAddress
