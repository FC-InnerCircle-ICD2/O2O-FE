import { create } from "zustand";

interface GlobalLoaderStore {
  isGlobalLoading: boolean
  setIsGlobalLoading: (isGlobalLoading: boolean) => void
}

const globalLoaderStore = create<GlobalLoaderStore>((set) => ({
  isGlobalLoading: false,
  setIsGlobalLoading: (isGlobalLoading: boolean) => set({ isGlobalLoading }),
}))

export default globalLoaderStore
