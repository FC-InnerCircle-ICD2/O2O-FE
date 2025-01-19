'use client'

import { useMockReady } from '@/providers/MockProvider'
import { useInfiniteQuery } from '@tanstack/react-query'
import ky from 'ky'
import { useCallback, useEffect, useRef } from 'react'

interface PaginatedResponse<T> {
  data: T[]
  nextCursor?: number
}

interface InfiniteScrollOptions<TFilter> {
  queryKey: string
  endpoint: string
  filter?: TFilter
  size?: number
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export const useInfiniteScroll = <TData, TFilter = void>({
  queryKey,
  endpoint,
  filter,
  size = 10,
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
}: InfiniteScrollOptions<TFilter>) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const isMockReady = useMockReady()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [queryKey, filter],
    queryFn: async ({ pageParam = 1 }) => {
      const searchParams = {
        page: String(pageParam),
        size: String(size),
        ...(filter &&
          Object.entries(filter).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: value?.toString() ?? '',
            }),
            {},
          )),
      }

      return ky
        .get(endpoint, {
          searchParams,
        })
        .json<PaginatedResponse<TData>>()
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 1,
    enabled: isMockReady,
  })

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
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
    }
  }, [handleObserver, root, rootMargin, threshold])

  return {
    data: data?.pages.flatMap((page) => page.data) ?? [],
    isLoading,
    isFetching,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    targetRef,
  }
}
