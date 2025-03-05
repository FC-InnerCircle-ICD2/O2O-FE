import { create } from 'zustand'

interface FoodSearchFilterStore {
  category: string
  keyword?: string
  order: number
  setCategory: (category: string) => void
  setKeyword: (keyword: string | undefined) => void
  setOrder: (order: number) => void
}

export const useFoodSearchFilterStore = create<FoodSearchFilterStore>((set) => ({
  category: '',
  keyword: undefined,
  order: 0,
  setCategory: (category: string) =>
    set((state) => {
      return { ...state, category, keyword: undefined }
    }),
  setKeyword: (keyword) =>
    set(() => {
      return { keyword, categoryId: 1, order: 0 }
    }),
  setOrder: (order) => set((state) => ({ ...state, order })),
}))
