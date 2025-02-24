import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface Address {
  id: number
  roadAddress: string
  jibunAddress: string
  detailAddress: string
  latitude: number
  longitude: number
}

interface AddressData {
  defaultAddress: Address
  house: Address
  company: Address
  others: Address[]
}

const useGetAddress = () => {
  const qc = useQueryClient()

  const { data: address, isSuccess } = useQuery({
    queryKey: ['address'],
    queryFn: async () => {
      return await api.get<AddressData>(`members/address`)
    },
  })

  const resetGetAddress = () => {
    qc.removeQueries({ queryKey: ['address'] })
  }

  return { address, isSuccess, resetGetAddress }
}

export default useGetAddress
