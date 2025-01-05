import { create } from 'zustand'

export interface BottomSheet {
  isOpen: boolean
  content: React.ReactNode
  title?: string
}

interface BottomSheetState {
  bottomSheet: BottomSheet
  showBottomSheet: (options: Pick<BottomSheet, 'content' | 'title'>) => void
  hideBottomSheet: () => void
}

export const bottomSheetStore = create<BottomSheetState>((set) => ({
  bottomSheet: {
    isOpen: false,
    content: null,
  },
  showBottomSheet: (options: Pick<BottomSheet, 'content' | 'title'>) =>
    set(() => ({
      bottomSheet: { isOpen: true, ...options },
    })),
  hideBottomSheet: () =>
    set((state) => ({
      bottomSheet: { ...state.bottomSheet, isOpen: false },
    })),
}))
