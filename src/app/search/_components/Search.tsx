'use client'

import Input from '@/components/input'
import { useState } from 'react'
import RealTimeSearches from './RealTimeSearches'
import RecentSearches from './RecentSearches'

const Search = () => {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col gap-2">
      <RecentSearches />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onReset={() => setValue('')}
      />
      <RealTimeSearches />
    </div>
  )
}

export default Search
