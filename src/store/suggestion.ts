import { create } from 'zustand'

interface SuggestionStore {
  isFocus: boolean
  suggestionWord: string
  suggestion: string[]
  setSuggestion: (suggestion: string[]) => void
  resetSuggestion: () => void
  setSuggestionWord: (suggestionWord: string) => void
  setIsFocus: (isFocus: boolean) => void
}

const suggestionStore = create<SuggestionStore>((set) => ({
  isFocus: false,
  suggestionWord: '',
  suggestion: [],
  setSuggestion: (suggestion) => set({ suggestion }),
  resetSuggestion: () => set({ suggestion: [], suggestionWord: '' }),
  setSuggestionWord: (suggestionWord) => set({ suggestionWord }),
  setIsFocus: (isFocus) => set({ isFocus }),
}))

export default suggestionStore
