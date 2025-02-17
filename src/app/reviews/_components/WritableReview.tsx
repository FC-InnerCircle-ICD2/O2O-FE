import { WritableReviews } from '@/api/useGetWritableReviews'
import { Button } from '@/components/button'
import Separator from '@/components/Separator'

interface WritableReviewProps {
  review: WritableReviews['content'][number]
  offSeparator?: boolean
}

const WritableReview = ({ review, offSeparator = false }: WritableReviewProps) => {
  return (
    <>
      <div className="flex gap-4 px-mobile_safe py-5">
        {/* <Image
          src={review.storeName}
          alt="pending-review"
          width={76}
          height={76}
          className="mt-1 size-[76px] rounded-sm bg-gray-300"
          onError={() => {
            setImageErrors((prev) => ({ ...prev, [review.orderId]: true }))
          }}
        /> */}
        <div className="mt-1 flex size-[76px] items-center justify-center rounded-sm bg-primary/15 text-xl font-extrabold text-primary">
          {review.storeName.slice(0, 3)}
        </div>

        <div className="flex flex-col justify-between gap-2 text-sm">
          <div>
            <div className="font-semibold">{review.storeName}</div>
            <ul className="whitespace-pre-wrap">{review.orderSummary}</ul>
          </div>
          <Button variant="primaryFit" size="s" className="h-fit py-0.5">
            리뷰 작성
          </Button>
        </div>
      </div>
      {!offSeparator && <Separator ignoreMobileSafe className="h-2" />}
    </>
  )
}

export default WritableReview
