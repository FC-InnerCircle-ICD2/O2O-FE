'use client'

import HomeStoreList from '@/app/home/_components/HomeStoreList'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Store } from '@/models/store'
import BannerSlide from './BannerSlide'
import CategoryDrawer from './CategoryDrawer'

const Home = () => {
  const { data, isFetching, targetRef } = useInfiniteScroll<
    Store,
    { category: string | undefined }
  >({
    queryKey: 'stores',
    endpoint: '/api/stores',
    filter: { category: undefined },
    size: 10,
  })

  return (
    <div className="flex flex-col gap-[26px] pb-4 pt-9">
      <CategoryDrawer />
      <BannerSlide />
      <HomeStoreList data={data} isLoading={isFetching} />
      <div ref={targetRef} />
    </div>
  )
}

export default Home
