'use client'

import useGetStoreSuggestion from '@/api/useGetStoreSuggestion'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import useDebounce from '@/hooks/useDebounce'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import suggestionStore from '@/store/suggestion'
import { ROUTE_PATHS } from '@/utils/routes'
import { usePathname, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

const SearchInput = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [word, setWord] = useState('')

  const { keyword, setKeyword } = useFoodSearchFilterStore()
  const { setValue, storedValue } = useLocalStorage<string[]>('recentSearches', [])
  const { setSuggestion, resetSuggestion, setSuggestionWord, setIsFocus } = suggestionStore()

  const { storeSuggestion, refetch, resetStoreSuggestion } = useGetStoreSuggestion(word)
  const debouncedRefetch = useDebounce(refetch, 200)

  useEffect(() => {
    if (pathname === ROUTE_PATHS.SEARCH) {
      setWord('')
    } else {
      setWord(keyword || '')
    }
  }, [pathname])

  useEffect(() => {
    if (storeSuggestion && storeSuggestion.length > 0) {
      setSuggestion(storeSuggestion)
    } else {
      setSuggestion([])
    }
  }, [storeSuggestion])

  useEffect(() => {
    if (word) {
      setSuggestionWord(word)
      debouncedRefetch()
    } else {
      setSuggestionWord('')
    }
  }, [word])

  useEffect(() => {
    return () => {
      resetStoreSuggestion()
      resetSuggestion()
    }
  }, [])

  return (
    <Input
      placeholder="무엇을 배달, 포장할까요?"
      inputSize="sm"
      value={word}
      onClick={() => setIsFocus(true)}
      onFocus={() => setIsFocus(true)}
      onBlur={() => {
        setTimeout(() => {
          setIsFocus(false)
        }, 200)
      }}
      onChange={(e) => setWord(e.target.value)}
      onKeyDown={(e) => {
        if (e.nativeEvent.isComposing) return // 한글 입력 중일 때는 이벤트 처리하지 않음
        if (e.key === 'Enter') {
          setKeyword(word)
          setValue([word, ...(storedValue || [])])
          resetStoreSuggestion()
          setIsFocus(false)
          router.push(ROUTE_PATHS.SEARCH_RESULT)
        }
      }}
      onReset={() => setWord('')}
      icon={<Icon name="Search" size={18} />}
      offOutline
    />
  )
}

export default SearchInput
