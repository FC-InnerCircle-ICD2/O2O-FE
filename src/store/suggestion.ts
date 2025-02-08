import { create } from 'zustand'

interface SuggestionStore {
  suggestionWord: string
  suggestion: string[]
  setSuggestion: (suggestion: string[]) => void
  resetSuggestion: () => void
  setSuggestionWord: (suggestionWord: string) => void
}

const suggestionStore = create<SuggestionStore>((set) => ({
  suggestionWord: '',
  suggestion: [],
  setSuggestion: (suggestion) => set({ suggestion }),
  resetSuggestion: () => set({ suggestion: [], suggestionWord: '' }),
  setSuggestionWord: (suggestionWord) => set({ suggestionWord }),
}))

export default suggestionStore
