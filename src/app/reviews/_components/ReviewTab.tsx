import { ReviewTabType } from '@/app/reviews/_components/Review'
import { motion } from 'motion/react'

interface ReviewTabProps {
  tab: ReviewTabType
  onChangeTab: (tab: ReviewTabType) => void
  pendingReviewsCount: number
}

const ReviewTab = ({ tab, onChangeTab, pendingReviewsCount }: ReviewTabProps) => {
  const handleClickTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeTab(e.currentTarget.value as ReviewTabType)
  }

  return (
    <div className="relative flex h-10 justify-center rounded-sm bg-primary/15 text-sm font-medium">
      <button
        onClick={handleClickTab}
        value="작성가능"
        className={`z-10 w-1/2 ${tab === '작성가능' ? 'text-white' : 'text-gray-700'}`}
      >
        {`작성 가능한 리뷰 (${pendingReviewsCount})`}
      </button>
      <button
        onClick={handleClickTab}
        value="작성완료"
        className={`z-10 w-1/2 ${tab === '작성완료' ? 'text-white' : 'text-gray-700'}`}
      >
        {`작성한 리뷰 (${2})`}
      </button>
      <motion.div
        className="absolute left-1 top-1 z-0 h-[32px] w-[calc(50%-4px)] rounded-sm bg-primary"
        animate={{
          x: tab === '작성가능' ? '0%' : '100%',
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 40,
        }}
      />
    </div>
  )
}

export default ReviewTab
