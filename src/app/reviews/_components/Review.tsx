'use client'

import useGetWritableReviews from '@/api/useGetWritableReviews'
import CompletedReviews from '@/app/reviews/_components/CompletedReviews'
import NoPendingReview from '@/app/reviews/_components/NoPendingReview'
import PedingReviewSkeleton from '@/app/reviews/_components/PedingReviewSkeleton'
import ReviewTab from '@/app/reviews/_components/ReviewTab'
import WritableReview from '@/app/reviews/_components/WritableReview'
import { motion } from 'motion/react'
import { useState } from 'react'

export type ReviewTabType = '작성가능' | '작성완료'

const Review = () => {
  const [tab, setTab] = useState<ReviewTabType>('작성가능')
  const { data: writableReviews, isLoading } = useGetWritableReviews()

  const handleChangeTab = (tab: ReviewTabType) => {
    setTab(tab)
  }

  return (
    <section>
      <div className="px-mobile_safe">
        <ReviewTab
          tab={tab}
          onChangeTab={handleChangeTab}
          pendingReviewsCount={writableReviews?.content.length ?? 0}
        />
      </div>
      <div className="relative mt-2 h-[calc(100vh-190px)] overflow-y-auto overflow-x-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{
            x: tab === '작성가능' ? 0 : '-110%',
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-full"
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <PedingReviewSkeleton key={i} offSeparator={i === 4} />
            ))
          ) : writableReviews?.content ? (
            writableReviews.content.map((review, index) => (
              <WritableReview
                key={review.orderId}
                review={review}
                offSeparator={index === writableReviews.content.length - 1}
              />
            ))
          ) : (
            <NoPendingReview />
          )}
        </motion.div>

        <motion.div
          initial={{ x: '110%' }}
          animate={{
            x: tab === '작성가능' ? '110%' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-full"
        >
          <CompletedReviews />
        </motion.div>
      </div>
    </section>
  )
}

export default Review
