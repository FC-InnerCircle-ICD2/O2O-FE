'use client'

import useGetCompletedReviews from '@/api/useGetCompletedReviews'
import useGetWritableReviews from '@/api/useGetWritableReviews'
import CompletedReview from '@/app/reviews/_components/CompletedReview'
import CompletedReviewSkeleton from '@/app/reviews/_components/CompletedReviewSkeleton'
import NoWritableReview from '@/app/reviews/_components/NoWritableReview'
import ReviewTab from '@/app/reviews/_components/ReviewTab'
import WritableReview from '@/app/reviews/_components/WritableReview'
import WritableReviewSkeleton from '@/app/reviews/_components/WritableReviewSkeleton'
import { motion } from 'motion/react'
import { useState } from 'react'

export type ReviewTabType = '작성가능' | '작성완료'

const Review = () => {
  const [tab, setTab] = useState<ReviewTabType>('작성가능')
  const [page, setPage] = useState(1)

  const { data: writableReviews, isLoading } = useGetWritableReviews()
  const { data: completedReviews, isLoading: isLoadingCompleted } = useGetCompletedReviews({
    page,
  })

  const handleChangeTab = (tab: ReviewTabType) => {
    setTab(tab)
    setPage(1)
  }

  const handleNextPage = () => {
    if (completedReviews?.nextCursor) {
      setPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    const prevPage = page - 1
    if (prevPage > 0) {
      setPage(prevPage)
    }
  }

  return (
    <section>
      <div className="px-mobile_safe">
        <ReviewTab
          tab={tab}
          onChangeTab={handleChangeTab}
          writableReviewsCount={writableReviews?.length ?? 0}
          completedReviewsCount={completedReviews?.totalCount ?? 0}
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
          {isLoadingCompleted ? (
            Array.from({ length: 5 }).map((_, i) => (
              <CompletedReviewSkeleton key={i} offSeparator={i === 4} />
            ))
          ) : (
            <>
                {completedReviews?.content.map((review, index) => (
                  <CompletedReview
                    key={review.reviewId}
                    review={review}
                    offSeparator={index === completedReviews.content.length - 1}
                  />
                ))}
              {completedReviews?.content && completedReviews.content.length > 0 && (
                <div className="flex items-center justify-center gap-4 py-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="rounded-full bg-primary px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                  >
                    이전
                  </button>
                  <span className="text-sm text-gray-600">{page} 페이지</span>
                  <button
                    onClick={handleNextPage}
                    disabled={!completedReviews.nextCursor}
                    className="rounded-full bg-primary px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                  >
                    다음
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Review
