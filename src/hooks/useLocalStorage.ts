'use client'

import { useEffect, useMemo, useState } from 'react'

// 전역 이벤트 리스너 맵 추가
const listeners = new Map<string, Set<(value: any) => void>>()

// 전역 이벤트 핸들러
const globalStorageHandler = (event: StorageEvent) => {
  const key = event.key
  if (!key || !listeners.has(key)) return

  const keyListeners = listeners.get(key)
  if (event.newValue && keyListeners) {
    const newValue = JSON.parse(event.newValue)
    keyListeners.forEach((listener) => listener(newValue))
  }
}

// 이벤트 리스너 한 번만 등록
if (typeof window !== 'undefined') {
  window.addEventListener('storage', globalStorageHandler)
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T | undefined = undefined,
): {
  storedValue: T | undefined
  setValue: (value: T) => void
  resetValue: () => void
} {
  const isClient = typeof window !== 'undefined'

  // 서버 사이드에서는 항상 undefined로 시작
  const [storedValue, setStoredValue] = useState<T | undefined>(undefined)

  // 값을 업데이트하는 함수
  const setValue = useMemo(
    () => (value: T) => {
      try {
        // 배열인 경우 중복 제거
        let valueToStore = value
        if (Array.isArray(value)) {
          valueToStore = Array.from(new Set(value)) as T
        }

        setStoredValue(valueToStore)
        localStorage.setItem(key, typeof valueToStore === 'string' ? valueToStore : JSON.stringify(valueToStore))

        // 같은 창에서의 변경사항도 감지하기 위한 커스텀 이벤트 발생
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: key,
            newValue: JSON.stringify(valueToStore),
          }),
        )
      } catch (error) {
        console.error('localStorage 저장 에러:', error)
      }
    },
    [key],
  )

  const resetValue = useMemo(
    () => () => {
      setStoredValue(initialValue)
      localStorage.removeItem(key)
    },
    [key, initialValue],
  )

  // 클라이언트 사이드에서만 localStorage 값을 읽어옴
  useEffect(() => {
    if (!isClient) return

    try {
      const item = localStorage.getItem(key)
      if (item) {
        setStoredValue(typeof item !== 'string' ? JSON.parse(item) : item)
      } else {
        setStoredValue(initialValue)
      }
    } catch (error) {
      console.error('localStorage 에러:', error)
      setStoredValue(initialValue)
    }
  }, [key, isClient])

  //   다른 탭/창에서의 변경사항 감지
  useEffect(() => {
    if (!isClient) return

    // 현재 키에 대한 리스너 집합이 없으면 새로 생성
    if (!listeners.has(key)) {
      listeners.set(key, new Set())
    }

    // 현재 컴포넌트의 리스너 추가
    const handleChange = (value: T) => {
      setStoredValue(value)
    }

    listeners.get(key)?.add(handleChange)

    // 클린업: 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      const keyListeners = listeners.get(key)
      keyListeners?.delete(handleChange)

      // 해당 키에 대한 리스너가 더 이상 없으면 맵에서 제거
      if (keyListeners?.size === 0) {
        listeners.delete(key)
      }
    }
  }, [key])

  return { storedValue, setValue, resetValue }
}
