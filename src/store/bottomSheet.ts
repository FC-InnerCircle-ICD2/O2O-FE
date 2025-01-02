import { create } from 'zustand'

interface BottomSheet {
  isOpen: boolean
  content: React.ReactNode
}

interface BottomSheetState {
  bottomSheet: BottomSheet
  showBottomSheet: (content: React.ReactNode) => void
  hideBottomSheet: () => void
}

export const bottomSheetStore = create<BottomSheetState>((set) => ({
  bottomSheet: {
    isOpen: false,
    content: null,
  },
  showBottomSheet: (content: React.ReactNode) =>
    set((state) => ({
      bottomSheet: { isOpen: true, content },
    })),
  hideBottomSheet: () =>
    set((state) => ({
      bottomSheet: { isOpen: false, content: null },
    })),
}))
