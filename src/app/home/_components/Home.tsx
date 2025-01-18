'use client'

import FoodList from '@/app/home/_components/HomeFoodList'
import BannerSlide from './BannerSlide'
import CategoryDrawer from './CategoryDrawer'

const Home = () => {
  return (
    <div className="flex flex-col gap-[26px] pb-4 pt-9">
      <CategoryDrawer />
      <BannerSlide />
      <FoodList />
    </div>
  )
}

export default Home
