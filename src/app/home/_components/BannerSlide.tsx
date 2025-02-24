'use client'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Swiper 스타일 import
import BANNER_MOCK_DATA from '@/constants/banners'
import { useToast } from '@/hooks/useToast'
import { Banner } from '@/models/banner'
import Image from 'next/image'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

const BannerSlide = () => {
  const [banners, setBanners] = useState<Banner[]>(BANNER_MOCK_DATA)
  const { toast } = useToast()

  const handleBannerClick = () => {
    toast({
      description: '준비중입니다ㅠ',
      position: 'center',
    })
  }
  // const isMockReady = useMockReady()

  // const { data, isFetching } = useQuery({
  //   queryKey: ['banners'],
  //   queryFn: () => mockApi.get<Banner[]>('banners'),
  //   enabled: isMockReady,
  // })

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
          pauseOnMouseEnter: false,
        }}
      >
        {banners?.map((banner) => (
          <SwiperSlide key={banner.id} onClick={() => handleBannerClick()}>
            <div className="relative aspect-[353/100] w-full">
              <Image className="object-cover" src={banner.imageUrl} alt="banner" fill />
            </div>
          </SwiperSlide>
        ))}
        {/* {isFetching ? (
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
        )} */}
      </Swiper>
    </div>
  )
}

export default BannerSlide
