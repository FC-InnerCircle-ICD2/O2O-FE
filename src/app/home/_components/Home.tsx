'use client'

import HomeStoreList from '@/app/home/_components/HomeStoreList'
import PullToRefresh from '@/components/PullToRefresh'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Store } from '@/models/store'
import { useRef } from 'react'
import BannerSlide from './BannerSlide'
import CategoryDrawer from './CategoryDrawer'

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const { data, isFetching, targetRef, refetch } = useInfiniteScroll<
    Store,
    { category: string | undefined }
  >({
    queryKey: 'stores',
    endpoint: '/api/stores',
    filter: { category: undefined },
    size: 10,
  })

  const handleRefresh = async (): Promise<void> => {
    await refetch()
  }

  return (
    <PullToRefresh onRefresh={handleRefresh} scrollRef={scrollRef}>
      <div ref={scrollRef} className="flex flex-col gap-[26px] pb-4 pt-9">
        <CategoryDrawer />
        <BannerSlide />
        <HomeStoreList data={data} isLoading={isFetching} />

        <div ref={targetRef} />
      </div>
    </PullToRefresh>
  )
}

export default Home
