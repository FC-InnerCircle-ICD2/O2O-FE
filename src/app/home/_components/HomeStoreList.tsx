'use client'

import ScrollToTopButton from '@/components/ScrollToTopButton'
import StoreListItem from '@/components/shared/StoreListItem'
import StoreListItemSkeleton from '@/components/shared/StoreListItemSkeleton'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { Store } from '@/models/store'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect } from 'react'

interface HomeStoreListProps {
  data: Store[]
  isLoading: boolean
  hasNextPage: boolean
  parentRef: React.RefObject<HTMLDivElement | null>
}

const HomeStoreList = ({ data, isLoading, hasNextPage, parentRef }: HomeStoreListProps) => {
  const { topRef, showScrollButton, scrollToTop } = useScrollToTop<HTMLParagraphElement>({})

  const saveScrollPosition = () => {
    if (parentRef.current) {
      sessionStorage.setItem('homeScrollPosition', parentRef.current.scrollTop.toString())
    }
  }

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
  })

  useEffect(() => {
    if (data.length > 0) {
      virtualizer.measure()
    }
  }, [data, virtualizer])

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      const hasVirtualItems = mutations.some(
        (mutation) =>
          mutation.addedNodes.length > 0 && (mutation.target as HTMLElement).children.length > 0
      )

      if (hasVirtualItems) {
        const savedScrollPosition = sessionStorage.getItem('homeScrollPosition')
        if (savedScrollPosition && parentRef.current) {
          parentRef.current.scrollTop = parseInt(savedScrollPosition)
          sessionStorage.removeItem('homeScrollPosition')
        }
        observer.disconnect()
      }
    })

    if (parentRef.current) {
      observer.observe(parentRef.current, { childList: true, subtree: true })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col gap-4 px-mobile_safe">
      <p ref={topRef} className="text-xl font-bold">
        새로 오픈했어요!!
      </p>
      <div className="flex flex-col gap-3">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <StoreListItem
                store={data[virtualItem.index]}
                onBeforeNavigate={saveScrollPosition}
              />
            </div>
          ))}
        </div>
        {data.length === 0 && !hasNextPage && !isLoading && (
          <div className="mt-4 text-center text-gray-500">등록된 매장이 없어요</div>
        )}
        {isLoading && Array.from({ length: 5 }).map((_, i) => <StoreListItemSkeleton key={i} />)}
        {showScrollButton && <ScrollToTopButton onClick={scrollToTop} />}
      </div>
    </div>
  )
}

export default HomeStoreList
