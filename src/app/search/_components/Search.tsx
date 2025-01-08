'use client'

import RealTimeSearches from './RealTimeSearches'
import RecentSearches from './RecentSearches'

const Search = () => {
  return (
    <div className="flex flex-col gap-2">
      <RecentSearches />
      <RealTimeSearches />
    </div>
  )
}

export default Search
