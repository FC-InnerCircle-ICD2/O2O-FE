import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useGetStoreSuggestion = (keyword: string) => {
  const qc = useQueryClient()

  const {
    data: storeSuggestion,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ['storeSuggestion'],
    queryFn: async () => {
      if (!keyword) return []

      return await api.get<string[]>(`stores/suggestion?affix=${encodeURIComponent(keyword)}`)
    },
    enabled: !!keyword,
  })

  const resetStoreSuggestion = () => {
    qc.removeQueries({ queryKey: ['storeSuggestion'] })
  }

  return { storeSuggestion, resetStoreSuggestion, isSuccess, refetch }
}

export default useGetStoreSuggestion
