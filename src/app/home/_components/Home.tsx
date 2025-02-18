'use client'

import HomeStoreList from '@/app/home/_components/HomeStoreList'
import CartButton from '@/components/CartButton'
import PullToRefresh from '@/components/PullToRefresh'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Store } from '@/models/store'
import { useRef } from 'react'
import BannerSlide from './BannerSlide'
import CategoryDrawer from './CategoryDrawer'

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const { data, isFetching, targetRef, refetch, hasNextPage } = useInfiniteScroll<
    Store,
    { category: string | undefined }
  >({
    queryKey: 'stores',
    endpoint: 'stores/list',
    filter: { category: undefined },
    size: 10,
    location: { lat: 37.5177, lng: 127.0473 },
  })

  const handleRefresh = async (): Promise<void> => {
    await refetch()
  }

  return (
    <PullToRefresh onRefresh={handleRefresh} scrollRef={scrollRef}>
      <div ref={scrollRef} className="flex flex-col gap-[26px] pb-4 pt-9">
        <CategoryDrawer />
        <BannerSlide />
        <HomeStoreList data={data} isLoading={isFetching} hasNextPage={hasNextPage} />
        <div ref={targetRef} />
      </div>
      <CartButton />
    </PullToRefresh>
  )
}

export default Home
