'use client'

import usePostSearch from '@/api/usePostSearch'
import Chip from '@/components/Chip'
import Icon from '@/components/Icon'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { COLORS } from '@/styles/color'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'

const RecentSearches = () => {
  const { storedValue: recentSearches, setValue: setRecentSearches } = useLocalStorage<
    string[] | undefined
  >('recentSearches', [])
  const router = useRouter()
  const { setKeyword } = useFoodSearchFilterStore()

  const { mutate: postSearch } = usePostSearch()

  const handleRemoveSearch = (item: string) => {
    if (recentSearches === undefined) return

    setRecentSearches(recentSearches.filter((key: string) => key !== item) || [])
  }

  const handleRemoveAllSearch = () => {
    if (recentSearches === undefined) return
    setRecentSearches([])
  }

  const handleSearch = (word: string) => {
    postSearch(word)
    setKeyword(word)
    router.push(ROUTE_PATHS.SEARCH_RESULT)
  }

  return (
    <div className="px-mobile_safe py-3">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">최근 검색어</span>
        <span className="text-sm text-gray-400" onClick={handleRemoveAllSearch}>
          전체삭제
        </span>
      </div>
      {recentSearches && (
        <div className="flex flex-1 gap-[6px] overflow-x-auto py-3">
          {recentSearches.length > 0 ? (
            recentSearches.map((item, index) => (
              <Chip
                className="text-sm"
                key={`recent-${index}`}
                text={item}
                rightIcon={
                  <Icon
                    name="X"
                    size={14}
                    color={COLORS.gray400}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveSearch(item)
                    }}
                  />
                }
                onClick={() => handleSearch(item)}
              />
            ))
          ) : (
            <div className="flex h-[30px] flex-1 items-center justify-center text-center text-xs text-gray-400">
              최근 검색어가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RecentSearches
