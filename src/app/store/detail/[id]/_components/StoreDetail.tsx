'use client'

import Sample from '@/assets/images/sample.jpg'
import Icon from '@/components/Icon'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const MAX_PULL_HEIGHT = 160
const BLUE_BOX_MAX_PULL = 300
const HEADER_HEIGHT = 50
const IMAGE_HEIGHT = 200

const StoreDetail = () => {
  const [pullHeight, setPullHeight] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [isHeaderOpaque, setIsHeaderOpaque] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(1)

  const handleTouchStart = (e: TouchEvent) => {
    const container = containerRef.current
    if (!container || container.scrollTop > 0 || e.touches[0].clientY <= IMAGE_HEIGHT) return
    setTouchStart(e.touches[0].clientY)
  }

  const handleTouchMove = (e: TouchEvent) => {
    const container = containerRef.current
    if (!container || touchStart === 0) return

    if (container.scrollTop === 0) {
      const currentY = e.touches[0].clientY
      const pull = Math.max(0, currentY - touchStart)

      if (pull > 0) {
        e.preventDefault()
        setPullHeight(Math.min(pull * 0.5, MAX_PULL_HEIGHT))
      }
    }
  }

  const handleTouchEnd = () => {
    setTouchStart(0)
    setPullHeight(0)
  }

  const handleScroll = () => {
    const container = containerRef.current
    if (!container) return

    const scrollPosition = container.scrollTop
    const threshold = IMAGE_HEIGHT - HEADER_HEIGHT
    setIsHeaderOpaque(scrollPosition >= threshold)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [touchStart])

  return (
    <div
      ref={containerRef}
      className="relative size-full overflow-auto"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="fixed z-0 size-full">
        <div
          className="relative w-full"
          style={{
            height: `calc(${IMAGE_HEIGHT}px + ${pullHeight}px)`,
            transition: pullHeight === 0 ? 'height 0.3s ease-out' : 'none',
          }}
        >
          <Swiper
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
          </Swiper>
        </div>
        <div
          className="absolute right-4 z-10 flex items-center rounded-full bg-zinc-900/50 px-1.5 py-1"
          style={{
            top: `calc(17% + ${pullHeight * 0.7}px)`,
            transition: pullHeight === 0 ? 'top 0.3s ease-out' : 'none',
          }}
        >
          <span className="text-xs font-light tracking-tighter text-gray-100">
            {currentSlide} / {[Sample, Sample, Sample].length}
          </span>
        </div>
      </div>

      <div
        className={cn(
          'fixed top-0 z-20 flex h-[50px] w-full items-center justify-between pt-2 transition-all duration-200',
          isHeaderOpaque
            ? 'border-b border-solid border-gray-200 bg-white px-[10px]'
            : 'bg-transparent px-mobile_safe',
        )}
      >
        <div className="flex items-center gap-2">
          <button
            className="flex size-7 items-center justify-center rounded-full bg-white"
            onClick={() => router.back()}
          >
            <Icon name="ChevronLeft" size={22} />
          </button>
          <AnimatePresence>
            {isHeaderOpaque && (
              <motion.span
                className="text-lg font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                비비큐치킨
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex size-7 items-center justify-center rounded-full bg-white">
            <Icon name="Share2" size={18} />
          </button>
          <button className="flex size-7 items-center justify-center rounded-full bg-white">
            <Icon name="Heart" size={18} />
          </button>
          <button className="flex size-7 items-center justify-center rounded-full bg-white">
            <Icon name="Search" size={18} />
          </button>
        </div>
      </div>
      <div
        className="relative z-10 w-full bg-white"
        style={{
          marginTop: `calc(${IMAGE_HEIGHT}px + ${Math.min(pullHeight * 0.7, BLUE_BOX_MAX_PULL)}px)`,
          height: '1000px',
          transition: pullHeight === 0 ? 'margin-top 0.3s ease-out' : 'none',
        }}
      ></div>
    </div>
  )
}

export default StoreDetail
