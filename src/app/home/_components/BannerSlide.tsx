'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Swiper 스타일 import
import { Skeleton } from '@/components/shadcn/skeleton'
import { Banner } from '@/models/banner'
import { useMockReady } from '@/providers/MockProvider'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'

const BannerSlide = () => {
  const isMockReady = useMockReady()

  const { data, isFetching } = useQuery({
    queryKey: ['banners'],
    queryFn: () => ky.get('/api/banners').json<{ data: Banner[] }>(),
    enabled: isMockReady,
  })

  return (
    <div className="px-mobile_safe py-4">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        className="w-full"
      >
        {isFetching && (
          <div className="relative aspect-[353/100] w-full">
            <Skeleton className="aspect-[353/100] w-full" />
          </div>
        )}
        {data?.data &&
          data.data.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative aspect-[353/100] w-full">
                <Image className="object-cover" src={banner.imageUrl} alt="banner" fill />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default BannerSlide
