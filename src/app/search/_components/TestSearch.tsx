'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useState } from 'react'

const TestSearch = () => {
  const { storedValue: recentSearches, setValue: setRecentSearches } = useLocalStorage<
    string[] | undefined
  >('recentSearches', [])
  const [search, setSearch] = useState<string>('')

  const handleAddSearch = () => {
    if (!search || recentSearches === undefined) return

    setRecentSearches([
      search,
      ...(recentSearches?.filter((item: string) => item !== search) || []),
    ])
    setSearch('')
  }

  return (
    <div>
      <input className="border" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleAddSearch}>추가</button>
    </div>
  )
}

export default TestSearch
