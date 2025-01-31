import { mockApi } from '@/lib/api'
import { RealTimeSearch } from '@/models/realTimeSearches'
import { useMockReady } from '@/providers/MockProvider'
import { useQuery } from '@tanstack/react-query'

const useGetStoreTrend = () => {
    const isMockReady = useMockReady()

  const { data: realTimeSearches } = useQuery({
    queryKey: ['storeTrend'],
    queryFn: async () => await mockApi.get<RealTimeSearch[]>('api/stores/trend'),
    refetchInterval: 10000,
    enabled: isMockReady,
  })

  return { realTimeSearches }
}

export default useGetStoreTrend