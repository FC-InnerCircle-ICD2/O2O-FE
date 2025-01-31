'use client'

import ReviewTab from '@/app/review/_components/ReviewTab'
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
    </section>
  )
}

export default Review
