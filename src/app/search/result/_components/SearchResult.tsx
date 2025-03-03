'use client'

import usePostSearch from '@/api/usePostSearch'
import PullToRefresh from '@/components/PullToRefresh'
import FoodOrderFilter from '@/components/shared/FoodOrderFilter'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { OrderType } from '@/models/orderType'
import { Store } from '@/models/store'
import { useGeoLocationStore } from '@/store/geoLocation'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import suggestionStore from '@/store/suggestion'
import memberStore from '@/store/user'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import SearchFoodList from './SearchFoodList'

const SearchResult = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { coordinates: location } = useGeoLocationStore()
  const { keyword, order } = useFoodSearchFilterStore()
  const { suggestion, suggestionWord, isFocus } = suggestionStore()
  const { member } = memberStore()
  const { data, isFetching, targetRef, refetch } = useInfiniteScroll<
    Store,
    { keyword: string | undefined; order: OrderType }
  >({
    queryKey: 'stores',
    endpoint: 'stores/list-cursor',
    filter: { keyword, order },
    size: 10,
    ...(member
      ? { location: { lat: member.address.latitude, lng: member.address.longitude } }
      : location && { location: { lat: location.latitude, lng: location.longitude } }),
    enabled: !!keyword,
  })
  const { mutate: postSearch } = usePostSearch()
  const router = useRouter()

  const handleRefresh = async (): Promise<void> => {
    await refetch()
  }

  const handleSearch = (word: string) => {
    postSearch(word)
    useFoodSearchFilterStore.getState().setKeyword(word)
    refetch()
  }

  useEffect(() => {
    if (!keyword) {
      router.push(ROUTE_PATHS.SEARCH)
    }
  }, [keyword])

  return (
    <PullToRefresh onRefresh={handleRefresh} scrollRef={scrollRef}>
      <div className="relative flex h-full flex-col px-mobile_safe py-3">
        {isFocus && suggestionWord && suggestion.length > 0 && (
          <div className="absolute left-0 top-0 z-20 h-[calc(100dvh-40px-0.75rem)] w-full overflow-y-auto bg-white px-mobile_safe py-4">
            <ul className="">
              {suggestion.map((item) => (
                <li key={item} className="pb-4" onClick={() => handleSearch(item)}>
                  {item.split(new RegExp(`(${suggestionWord})`, 'gi')).map((part, index) =>
                    part.toLowerCase() === suggestionWord?.toLowerCase() ? (
                      <span key={index} className="font-bold">
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <FoodOrderFilter />
        <SearchFoodList
          data={data}
          isLoading={isFetching}
          targetRef={targetRef}
          scrollRef={scrollRef}
        />
      </div>
    </PullToRefresh>
  )
}

export default SearchResult
