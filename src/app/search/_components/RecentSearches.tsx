'use client'

import Chip from '@/components/Chip'
import Icon from '@/components/Icon'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { COLORS } from '@/styles/color'

const RecentSearches = () => {
  const { storedValue: recentSearches, setValue: setRecentSearches } = useLocalStorage<
    string[] | undefined
  >('recentSearches', [])

  const handleRemoveSearch = (item: string) => {
    if (recentSearches === undefined) return

    setRecentSearches(recentSearches.filter((key: string) => key !== item) || [])
  }

  const handleRemoveAllSearch = () => {
    if (recentSearches === undefined) return
    setRecentSearches([])
  }

  return (
    <div className="px-mobile_safe py-3">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">최근 검색어</span>
        <span className="text-xs text-gray-400" onClick={handleRemoveAllSearch}>
          전체삭제
        </span>
      </div>
      {recentSearches && (
        <div className="flex gap-[6px] flex-wrap py-1">
          {recentSearches.length > 0 ? (
            recentSearches.map((item, index) => (
              <Chip
                key={`recent-${index}`}
                text={item}
                rightIcon={
                  <Icon
                    variant="close"
                    width={14}
                    height={14}
                    fill={COLORS.gray400}
                    onClick={() => handleRemoveSearch(item)}
                  />
                }
              />
            ))
          ) : (
            <div className="w-full text-xs text-center text-gray-400 py-2">
              최근 검색어가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RecentSearches
