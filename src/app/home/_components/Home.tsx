'use client'

import HomeStoreList from '@/app/home/_components/HomeStoreList'
import CartButton from '@/components/CartButton'
import PullToRefresh from '@/components/PullToRefresh'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Store } from '@/models/store'
import { useGeoLocationStore } from '@/store/geoLocation'
import memberStore from '@/store/user'
import { useRef } from 'react'
import BannerSlide from './BannerSlide'
import CategoryDrawer from './CategoryDrawer'

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { coordinates: location } = useGeoLocationStore()
  const { member } = memberStore()

  const { data, isFetching, targetRef, refetch, hasNextPage } = useInfiniteScroll<
    Store,
    { category: string | undefined }
  >({
    queryKey: 'stores',
    endpoint: 'stores/list-cursor',
    filter: { category: undefined },
    size: 10,
    ...(member ? {location: {lat: member.address.latitude, lng: member.address.longitude}} : location && { location: { lat: location.latitude, lng: location.longitude } }),
  })

  const handleRefresh = async (): Promise<void> => {
    await refetch()
  }

  return (
    <PullToRefresh onRefresh={handleRefresh} scrollRef={scrollRef}>
      <div
        ref={scrollRef}
        className="flex h-[calc(100dvh-40px-85px)] flex-col gap-1 overflow-auto py-4"
      >
        <CategoryDrawer />
        <BannerSlide />
        <HomeStoreList
          data={data}
          isLoading={isFetching}
          hasNextPage={hasNextPage}
          parentRef={scrollRef}
        />
        <div ref={targetRef} />
      </div>
      {member && <CartButton />}
    </PullToRefresh>
  )
}

export default Home
