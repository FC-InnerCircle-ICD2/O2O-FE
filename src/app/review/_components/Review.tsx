'use client'

import CompletedReviews from '@/app/review/_components/CompletedReviews'
import PedingReviewSkeleton from '@/app/review/_components/PedingReviewSkeleton'
import PendingReview from '@/app/review/_components/PendingReview'
import ReviewTab from '@/app/review/_components/ReviewTab'
import Icon from '@/components/Icon'
import { usePendingReviews } from '@/models/review'
import { motion } from 'motion/react'
import { useState } from 'react'

export type ReviewTabType = '작성가능' | '작성완료'

const Review = () => {
  const [tab, setTab] = useState<ReviewTabType>('작성가능')
  const { data: pendingReviews, isLoading } = usePendingReviews()

  const handleChangeTab = (tab: ReviewTabType) => {
    setTab(tab)
  }

  return (
    <section>
      <div className="px-mobile_safe">
        <ReviewTab
          tab={tab}
          onChangeTab={handleChangeTab}
          pendingReviewsCount={pendingReviews?.length ?? 0}
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
          ) : pendingReviews ? (
            pendingReviews.map((review, index) => (
              <PendingReview
                key={review.orderId}
                review={review}
                offSeparator={index === pendingReviews.length - 1}
              />
            ))
          ) : (
            <div className="flex h-[calc(100vh-190px)] flex-col items-center justify-center gap-6">
              <Icon name="UtensilsCrossed" size="96px" className="text-gray-400" />
              <div className="font-medium text-gray-400">주문 후 리뷰를 작성해주세요!</div>
            </div>
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
