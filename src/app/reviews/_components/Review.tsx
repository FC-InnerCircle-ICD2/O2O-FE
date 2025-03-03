'use client'

import { CompletedReviewType } from '@/api/useGetCompletedReviews'
import useGetWritableReviews from '@/api/useGetWritableReviews'
import CompletedReview from '@/app/reviews/_components/CompletedReview'
import CompletedReviewSkeleton from '@/app/reviews/_components/CompletedReviewSkeleton'
import NoWritableReview from '@/app/reviews/_components/NoWritableReview'
import ReviewTab from '@/app/reviews/_components/ReviewTab'
import WritableReview from '@/app/reviews/_components/WritableReview'
import WritableReviewSkeleton from '@/app/reviews/_components/WritableReviewSkeleton'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

export type ReviewTabType = '작성가능' | '작성완료'

const Review = () => {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<ReviewTabType>(
    searchParams.get('tab')
      ? searchParams.get('tab') === '1'
        ? '작성가능'
        : '작성완료'
      : '작성가능'
  )
  const router = useRouter()

  const { data: writableReviews, isLoading } = useGetWritableReviews()
  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    data: completedReviews,
    isFetching: isLoadingCompletedReviews,
    targetRef,
    totalCount: completedReviewsCount,
  } = useInfiniteScroll<CompletedReviewType>({
    queryKey: 'completed-reviews',
    endpoint: 'reviews',
    size: 10,
  })

  const handleChangeTab = (tab: ReviewTabType) => {
    setTab(tab)
    router.push(`/reviews?tab=${tab === '작성가능' ? '1' : '2'}`)
  }

  return (
    <section className="pt-4">
      <div className="px-mobile_safe">
        <ReviewTab
          tab={tab}
          onChangeTab={handleChangeTab}
          writableReviewsCount={writableReviews?.length ?? 0}
          completedReviewsCount={completedReviewsCount ?? 0}
        />
      </div>
      <div
        ref={scrollRef}
        className="relative mt-2 h-[calc(100dvh-40px-85px-56px-1rem-0.75rem-0.5rem)] w-dvw overflow-hidden"
      >
        <motion.div
          initial={{ x: 0 }}
          animate={{
            x: tab === '작성가능' ? 0 : -window.innerWidth,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute w-full overflow-y-auto overflow-x-hidden"
          style={{ height: '100%' }}
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <WritableReviewSkeleton key={i} offSeparator={i === 4} />
            ))
          ) : writableReviews && writableReviews.length > 0 ? (
            writableReviews.map((review, index) => (
              <WritableReview
                key={review.orderId}
                review={review}
                offSeparator={index === writableReviews.length - 1}
              />
            ))
          ) : (
            <NoWritableReview />
          )}
        </motion.div>

        <motion.div
          initial={{ x: window.innerWidth }}
          animate={{
            x: tab === '작성가능' ? window.innerWidth : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute w-full overflow-y-auto overflow-x-hidden"
          style={{ height: '100%' }}
        >
          {completedReviews?.map((review, index) => (
            <CompletedReview
              key={review.reviewId}
              review={review}
              offSeparator={index === completedReviews.length - 1}
            />
          ))}
          {isLoadingCompletedReviews &&
            Array.from({ length: 2 }).map((_, i) => (
              <CompletedReviewSkeleton key={i} offSeparator={i === 1} />
            ))}
          <div ref={targetRef} />
        </motion.div>
      </div>
    </section>
  )
}

export default Review
