'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Swiper 스타일 import
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'

const BannerSlide = () => {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      className="w-full"
    >
      <SwiperSlide className="px-mobile_safe">
        <div className="relative aspect-[353/100] w-full">
          <Image className="object-cover" src={'/images/banner/banner_1.png'} alt="banner" fill />
        </div>
      </SwiperSlide>
      <SwiperSlide className="px-mobile_safe">
        <div className="relative aspect-[353/100] w-full">
          <Image className="object-cover" src={'/images/banner/banner_1.png'} alt="banner" fill />
        </div>
      </SwiperSlide>
      <SwiperSlide className="px-mobile_safe">
        <div className="relative aspect-[353/100] w-full">
          <Image className="object-cover" src={'/images/banner/banner_1.png'} alt="banner" fill />
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default BannerSlide
