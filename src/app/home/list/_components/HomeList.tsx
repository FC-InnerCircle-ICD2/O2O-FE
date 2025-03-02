'use client'

import CartButton from '@/components/CartButton'
import PullToRefresh from '@/components/PullToRefresh'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { OrderType } from '@/models/orderType'
import { Store } from '@/models/store'
import { useGeoLocationStore } from '@/store/geoLocation'
import { useFoodSearchFilterStore } from '@/store/homeSearchFilter'
import memberStore from '@/store/user'
import { useEffect, useRef, useState } from 'react'
import CategorySlide from './CategorySlide'
import HomeSearchFoodList from './HomeSearchFoodList'

const HomeList = () => {
  const { coordinates: location } = useGeoLocationStore()
  const { category, order } = useFoodSearchFilterStore()
  const [isCategoryHide, setIsCategoryHide] = useState(false)
  const { member } = memberStore()
  const { data, isFetching, targetRef, refetch, hasNextPage } = useInfiniteScroll<
    Store,
    { category: string; order: OrderType }
  >({
    queryKey: 'stores',
    endpoint: 'stores/list-cursor',
    filter: { category, order },
    size: 10,
    ...(member
      ? { location: { lat: member.address.latitude, lng: member.address.longitude } }
      : location && { location: { lat: location.latitude, lng: location.longitude } }),
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  const handleRefresh = async (): Promise<void> => {
    await refetch()
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsCategoryHide(scrollRef.current.scrollTop >= 36)
      }
    }

    const currentRef = scrollRef.current
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <PullToRefresh onRefresh={handleRefresh} scrollRef={scrollRef}>
      <div className="flex h-[calc(100dvh-40px-85px)] flex-col gap-4 overflow-auto pt-4">
        <CategorySlide isHide={isCategoryHide} />
        <HomeSearchFoodList
          data={data}
          hasNextPage={hasNextPage}
          isLoading={isFetching}
          targetRef={targetRef}
          scrollRef={scrollRef}
        />
      </div>
      {member && <CartButton />}
    </PullToRefresh>
  )
}

export default HomeList
