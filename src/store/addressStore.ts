import { AddressResponseData } from '@/api/useGetAddress'
import { create } from 'zustand'

interface AddressStore {
  address: AddressResponseData | null
  setAddress: (address: AddressResponseData) => void
  resetAddress: () => void
}

const addressStore = create<AddressStore>((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
  resetAddress: () => set({ address: null }),
}))

export default addressStore
