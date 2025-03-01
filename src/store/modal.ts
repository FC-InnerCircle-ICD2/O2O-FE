import { create } from 'zustand'
import { Address } from 'react-daum-postcode'

interface Modal {
  type: 'modal'
  content: React.ReactNode
  useAnimation?: boolean
  useDimmedClickClose?: boolean
  useDimmed?: boolean
}

interface ModalState {
  modals: Modal[]
  showModal: (
    options: Pick<Modal, 'content' | 'useAnimation' | 'useDimmedClickClose' | 'useDimmed'>
  ) => void
  hideModal: () => void
  allHideModal: () => void
  addressData: Address | null
  setAddressData: (data: Address) => void
}

export const modalStore = create<ModalState>((set) => ({
  modals: [],
  showModal: (
    options: Pick<Modal, 'content' | 'useAnimation' | 'useDimmedClickClose' | 'useDimmed'>
  ) =>
    set((state) => ({
      modals: [
        ...state.modals,
        { type: 'modal', useDimmed: options.useDimmed ?? true, ...options },
      ],
    })),
  hideModal: () =>
    set((state) => ({
      modals: state.modals.slice(0, -1),
    })),
  allHideModal: () => set({ modals: [] }),
  setAddressData: (data: Address) => set({ addressData: data }),
}))
