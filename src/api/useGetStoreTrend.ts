import { api } from '@/lib/api'
import { RealTimeSearch } from '@/models/realTimeSearches'
import { useQuery } from '@tanstack/react-query'

const useGetStoreTrend = () => {

  const { data: realTimeSearches } = useQuery({
    queryKey: ['storeTrend'],
    queryFn: async () => {
      const res = await api.get<{trendKeywords: RealTimeSearch[]}>('stores/trend')
      return res.trendKeywords
    },
    refetchInterval: 10000,
  })

  return { realTimeSearches }
}

export default useGetStoreTrend