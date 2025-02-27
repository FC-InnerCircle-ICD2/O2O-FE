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
          <div className="mt-1 flex size-[72px] items-center justify-center rounded-sm bg-primary/15 text-xl font-extrabold text-primary">
            {review.storeName.slice(0, 3)}
          </div>
        ) : (
          <Image
            src={review.storeImageThumbnail}
            alt="pending-review "
            width={72}
            height={72}
            className="mt-1 size-[72px] rounded-sm"
            onError={() => {
              setImageErrors((prev) => ({ ...prev, [review.orderId]: true }))
            }}
          />
        )}

        <div className="flex flex-col justify-between py-0.5 text-sm">
          <div>
            <div className="font-semibold">{review.storeName}</div>
            <ul className="whitespace-pre-wrap">{review.orderSummary}</ul>
          </div>
          <Button
            variant="primaryFit"
            size="s"
            className="size-fit py-0.5"
            onClick={handleClickReviewButton}
          >
            리뷰 작성
          </Button>
        </div>
      </div>
      {!offSeparator && <Separator ignoreMobileSafe className="h-2" />}
    </>
  )
}

export default WritableReview
