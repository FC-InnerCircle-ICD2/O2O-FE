'use client'

import CompletedReviews from '@/app/review/_components/CompletedReviews'
import PendingReviews from '@/app/review/_components/PendingReviews'
import ReviewTab from '@/app/review/_components/ReviewTab'
import { motion } from 'motion/react'
import { useState } from 'react'

export type ReviewTabType = '작성가능' | '작성완료'

const Review = () => {
  const [tab, setTab] = useState<ReviewTabType>('작성가능')

  const handleChangeTab = (tab: ReviewTabType) => {
    setTab(tab)
  }

  return (
    <section className="px-mobile_safe">
      <ReviewTab tab={tab} onChangeTab={handleChangeTab} />
      <div className="relative h-screen overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{
            x: tab === '작성가능' ? 0 : '-100%',
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-full"
        >
          <PendingReviews />
        </motion.div>

        <motion.div
          initial={{ x: '100%' }}
          animate={{
            x: tab === '작성가능' ? '100%' : 0,
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
