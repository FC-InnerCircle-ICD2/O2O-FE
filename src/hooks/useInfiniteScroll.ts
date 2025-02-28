'use client'

import { api } from '@/lib/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'

interface PaginatedResponse<T> {
  content: T[]
  nextCursor?: number
  totalCount?: number
}

interface InfiniteScrollOptions<TFilter> {
  queryKey: string
  endpoint: string
  filter?: TFilter
  size?: number
  threshold?: number
  root?: Element | null
  rootMargin?: string
  location?: { lat: number; lng: number }
  enabled?: boolean
}

export const useInfiniteScroll = <TData, TFilter = void>({
  queryKey,
  endpoint,
  filter,
  size = 10,
  threshold = 0,
  root = null,
  rootMargin = '0px',
  location = { lat: 37.5177, lng: 127.0473 },
  enabled = true,
}: InfiniteScrollOptions<TFilter>) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  // const isMockReady = useMockReady()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: [queryKey, filter, location],
    queryFn: async ({ pageParam }) => {
      const searchParams = {
        ...(pageParam !== 1 && { cursor: String(pageParam), page: String(pageParam) }),
        size: String(size),
        ...(filter &&
          Object.entries(filter).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: value?.toString() ?? '',
            }),
            {}
          )),
      }

      // const API = isMockingMode ? mockApi : api
      const API = api

      const res = await API.get<PaginatedResponse<TData>>(endpoint, {
        headers: {
          'X-User-Lat': location?.lat.toString() ?? '',
          'X-User-Lng': location?.lng.toString() ?? '',
        },
        searchParams,
      })
      return res
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 1,
    enabled: enabled,
    // placeholderData: keepPreviousData,
  })

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage && !isFetching) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, isFetching]
  )

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    observerRef.current = new IntersectionObserver(handleObserver, {
      root,
      rootMargin,
      threshold,
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleObserver, root, rootMargin, threshold])

  return {
    data: data?.pages.flatMap((page) => page.content) ?? [],
    isLoading,
    isFetching,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    targetRef,
    refetch: refetch,
    totalCount: data?.pages[0]?.totalCount,
  }
}
