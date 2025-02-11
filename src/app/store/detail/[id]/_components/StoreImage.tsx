'use client'

import { Skeleton } from '@/components/shadcn/skeleton'
import Image from 'next/image'

export const IMAGE_HEIGHT = 200

const StoreImage = ({
  pullHeight,
  imageMain,
  isSuccess,
}: {
  pullHeight: number
  imageMain: string
  isSuccess: boolean
}) => {
  return (
    <div className="fixed z-0 size-full min-w-[320px] max-w-[480px]">
      <div
        className="relative overflow-hidden"
        style={{
          height: `calc(${IMAGE_HEIGHT}px + ${pullHeight}px)`,
          transition: pullHeight === 0 ? 'height 0.3s ease-out' : 'none',
        }}
      >
        {!isSuccess ? (
          <Skeleton className="size-full" />
        ) : (
          <Image
            src={imageMain}
            alt="store-image"
            className="size-full object-cover"
            style={{
              objectPosition: 'center',
              transform: `scale(${1 + pullHeight / IMAGE_HEIGHT})`,
              transformOrigin: 'center',
              transition: pullHeight === 0 ? 'transform 0.3s ease-out' : 'none',
            }}
            fill
            priority={true}
          />
        )}

        {/* <Swiper
          className="size-full"
          modules={[Pagination, Autoplay]}
          onSlideChange={(swiper: SwiperType) => {
            setCurrentSlide(swiper.realIndex + 1)
          }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {[Sample, Sample, Sample].map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`store-image-${index + 1}`}
                className="object-cover object-center"
                fill
                priority={index === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
      {/* <div
        className="absolute right-4 z-10 flex items-center rounded-full bg-zinc-900/50 px-1.5 py-1"
        style={{
          top: `calc(160px + ${pullHeight * 0.7}px)`,
          transition: pullHeight === 0 ? 'top 0.3s ease-out' : 'none',
        }}
      >
        <span className="text-xs font-light tracking-tighter text-gray-100">
          {currentSlide} / {[Sample, Sample, Sample].length}
        </span>
      </div> */}
    </div>
  )
}

export default StoreImage
