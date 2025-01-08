'use client'

import Icon from '@/components/Icon'
import Input from '@/components/input'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import { ROUTE_PATHS } from '@/utils/routes'
import { usePathname, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

const SearchInput = () => {
  const [word, setWord] = useState('')
  const { keyword, setKeyword } = useFoodSearchFilterStore()
  const { setValue, storedValue } = useLocalStorage<string[]>('recentSearches', [])
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === ROUTE_PATHS.SEARCH) {
      setWord('')
    } else {
      setWord(keyword || '')
    }
  }, [pathname])

  return (
    <Input
      placeholder="무엇을 배달, 포장할까요?"
      inputSize="sm"
      value={word}
      onChange={(e) => setWord(e.target.value)}
      onKeyDown={(e) => {
        if (e.nativeEvent.isComposing) return // 한글 입력 중일 때는 이벤트 처리하지 않음
        if (e.key === 'Enter') {
          setKeyword(word)
          setValue([word, ...(storedValue || [])])
          router.push(ROUTE_PATHS.SEARCH_RESULT)
        }
      }}
      onReset={() => setWord('')}
      icon={<Icon variant="search" width={18} height={18} />}
      offOutline
    />
  )
}

export default SearchInput
