import { create } from 'zustand'

interface Modal {
  type: 'modal'
  content: React.ReactNode
}

interface ModalState {
  modals: Modal[]
  showModal: (content: React.ReactNode) => void
  hideModal: () => void
  allHideModal: () => void
}

export const modalStore = create<ModalState>((set) => ({
  modals: [],
  showModal: (content: React.ReactNode) =>
    set((state) => ({
      modals: [...state.modals, { type: 'modal', content }],
    })),
  hideModal: () =>
    set((state) => ({
      modals: state.modals.slice(0, -1),
    })),
  allHideModal: () => set({ modals: [] }),
}))
