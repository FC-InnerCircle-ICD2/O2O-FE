import type { WritableReviewType } from '@/api/useGetWritableReviews'
import ReviewEditorModal from '@/app/reviews/_components/ReviewEditorModal'
import { Button } from '@/components/button'
import Separator from '@/components/Separator'
import { modalStore } from '@/store/modal'
import Image from 'next/image'
import { useState } from 'react'

interface WritableReviewProps {
  review: WritableReviewType
  offSeparator?: boolean
}

const WritableReview = ({ review, offSeparator = false }: WritableReviewProps) => {
  const { showModal } = modalStore()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const handleClickReviewButton = () => {
    console.log(review)
    showModal({
      content: (
        <ReviewEditorModal
          orderId={review.orderId}
          storeName={review.storeName}
          orderSummary={review.orderSummary}
          storeId={review.storeId}
        />
      ),
      useAnimation: true,
    })
  }

  return (
    <>
      <div className="flex gap-3 px-mobile_safe py-5">
        {imageErrors[review.orderId] || !review.storeImageThumbnail ? (
          <div className="mt-1 flex size-[80px] items-center justify-center rounded-sm bg-primary/15 text-xl font-extrabold text-primary">
            {review.storeName.slice(0, 3)}
          </div>
        ) : (
          <Image
            src={review.storeImageThumbnail}
            alt="pending-review "
            width={80}
            height={80}
            className="mt-1 size-[80px] rounded-sm"
            onError={() => {
              setImageErrors((prev) => ({ ...prev, [review.orderId]: true }))
            }}
          />
        )}

        <div className="flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-base font-bold">{review.storeName}</div>
            <ul className="whitespace-pre-wrap text-sm text-gray-700">{review.orderSummary}</ul>
          </div>
          <div className="flex flex-1">
            <Button
              variant="primaryFit"
              size="s"
              className="h-full w-fit rounded-sm"
              onClick={handleClickReviewButton}
            >
              리뷰 쓰기
            </Button>
          </div>
        </div>
      </div>
      {!offSeparator && <Separator ignoreMobileSafe className="h-2" />}
    </>
  )
}

export default WritableReview
