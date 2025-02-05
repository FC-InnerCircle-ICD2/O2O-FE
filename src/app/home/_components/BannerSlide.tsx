'use client'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Swiper 스타일 import
import { Skeleton } from '@/components/shadcn/skeleton'
import { mockApi } from '@/lib/api'
import { Banner } from '@/models/banner'
import { useMockReady } from '@/providers/MockProvider'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

const BannerSlide = () => {
  const isMockReady = useMockReady()

  const { data, isFetching } = useQuery({
    queryKey: ['banners'],
    queryFn: () => mockApi.get<Banner[]>('banners'),
    enabled: isMockReady,
  })

  return (
    <div className="px-mobile_safe py-4">
      <Swiper
        className="w-full"
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: false }}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }}
      >
        {isFetching ? (
          <SwiperSlide>
            <div className="relative aspect-[353/100] w-full">
              <Skeleton className="aspect-[353/100] w-full" />
            </div>
          </SwiperSlide>
        ) : (
          data?.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative aspect-[353/100] w-full">
                <Image className="object-cover" src={banner.imageUrl} alt="banner" fill />
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  )
}

export default BannerSlide
