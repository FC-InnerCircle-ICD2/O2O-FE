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
import { useState } from 'react'

export type ReviewTabType = '작성가능' | '작성완료'

const Review = () => {
  const [tab, setTab] = useState<ReviewTabType>('작성가능')

  const { data: writableReviews, isLoading } = useGetWritableReviews()

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
  }

  return (
    <section>
      <div className="px-mobile_safe">
        <ReviewTab
          tab={tab}
          onChangeTab={handleChangeTab}
          writableReviewsCount={writableReviews?.length ?? 0}
          completedReviewsCount={completedReviewsCount ?? 0}
        />
      </div>
      <div className="relative mt-2">
        <motion.div
          initial={{ x: 0 }}
          animate={{
            x: tab === '작성가능' ? 0 : '-110%',
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-full overflow-y-auto overflow-x-hidden"
          style={{
            height: 'calc(100vh - 190px)',
          }}
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <WritableReviewSkeleton key={i} offSeparator={i === 4} />
            ))
          ) : writableReviews ? (
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
          initial={{ x: '110%' }}
          animate={{
            x: tab === '작성가능' ? '110%' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-full overflow-y-auto overflow-x-hidden"
          style={{
            height: 'calc(100vh - 190px)',
          }}
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
