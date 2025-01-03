import { create } from 'zustand'

interface HomeSearchFilterStore {
  category?: string
  keyword?: string
  order?: string
  setCategory: (category: string | undefined) => void
  setKeyword: (keyword: string | undefined) => void
  setOrder: (order: string | undefined) => void
}

export const useHomeSearchFilterStore = create<HomeSearchFilterStore>((set) => ({
  category: undefined,
  keyword: undefined,
  order: undefined,
  setCategory: (category) =>
    set((state) => {
      return { ...state, category, keyword: undefined }
    }),
  setKeyword: (keyword) =>
    set((state) => {
      return { keyword, category: undefined, order: undefined }
    }),
  setOrder: (order) => set((state) => ({ ...state, order })),
}))
