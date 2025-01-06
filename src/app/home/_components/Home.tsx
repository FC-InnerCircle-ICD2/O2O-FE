'use client'

import FoodList from '@/app/home/_components/HomeFoodList'
import { Category } from '@/models/category'
import BannerSlide from './BannerSlide'
import CategoryDrawer from './CategoryDrawer'

export const CATEGORY_LIST: Category[] = [
  { id: 1, name: '전체', icon: '/images/food-categories/dish.png' },
  { id: 2, name: '카페/디저트', icon: '/images/food-categories/cup.png' },
  { id: 3, name: '치킨', icon: '/images/food-categories/fried-chicken.png' },
  { id: 4, name: '한식', icon: '/images/food-categories/bibimbap.png' },
  { id: 5, name: '중국집', icon: '/images/food-categories/zha-jiang-mian.png' },
  { id: 6, name: '분식', icon: '/images/food-categories/tteokbokki.png' },
  { id: 7, name: '피자/양식', icon: '/images/food-categories/pizza.png' },
  { id: 8, name: '버거', icon: '/images/food-categories/hamburger.png' },
  { id: 9, name: '일식/돈까스', icon: '/images/food-categories/tendon.png' },
  { id: 10, name: '찜/탕', icon: '/images/food-categories/samgyetang.png' },
  { id: 11, name: '회/초밥', icon: '/images/food-categories/nigiri.png' },
  { id: 12, name: '족발/보쌈', icon: '/images/food-categories/jokbal.png' },
  { id: 13, name: '고기/구이', icon: '/images/food-categories/steak.png' },
  { id: 14, name: '샌드위치', icon: '/images/food-categories/sandwich.png' },
  { id: 15, name: '샐러드', icon: '/images/food-categories/salad.png' },
  { id: 16, name: '도시락/죽', icon: '/images/food-categories/bento.png' },
  { id: 17, name: '아시안', icon: '/images/food-categories/pho.png' },
]

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
