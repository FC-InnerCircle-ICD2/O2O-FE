'use client'

import usePostSearch from '@/api/usePostSearch'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import suggestionStore from '@/store/suggestion'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import RealTimeSearches from './RealTimeSearches'
import RecentSearches from './RecentSearches'

const Search = () => {
  const { setValue, storedValue } = useLocalStorage<string[]>('recentSearches', [])
  const { suggestion, suggestionWord } = suggestionStore()
  const { setKeyword } = useFoodSearchFilterStore()
  const { mutate: postSearch } = usePostSearch()
  const router = useRouter()

  const handleSearch = (word: string) => {
    postSearch(word)
    setKeyword(word)
    setValue([word, ...(storedValue || [])])
    router.push(ROUTE_PATHS.SEARCH_RESULT)
  }

  return (
    <div className="relative flex flex-col gap-3 pt-2">
      {suggestionWord && suggestion.length > 0 && (
        <div className="absolute left-0 top-0 z-20 h-[calc(100dvh-40px-0.75rem)] w-full overflow-y-auto bg-white px-mobile_safe py-4">
          <ul className="">
            {suggestion.map((item) => (
              <li key={item} className="pb-3 text-lg" onClick={() => handleSearch(item)}>
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
      <RecentSearches />
      <RealTimeSearches />
    </div>
  )
}

export default Search
