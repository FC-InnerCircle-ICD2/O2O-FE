import { create } from 'zustand'

interface Modal {
  type: 'modal'
  content: React.ReactNode
  useAnimation?: boolean
}

interface ModalState {
  modals: Modal[]
  showModal: (options: Pick<Modal, 'content' | 'useAnimation'>) => void
  hideModal: () => void
  allHideModal: () => void
}

export const modalStore = create<ModalState>((set) => ({
  modals: [],
  showModal: (options: Pick<Modal, 'content' | 'useAnimation'>) =>
    set((state) => ({
      modals: [...state.modals, { type: 'modal', ...options }],
    })),
  hideModal: () =>
    set((state) => ({
      modals: state.modals.slice(0, -1),
    })),
  allHideModal: () => set({ modals: [] }),
}))
