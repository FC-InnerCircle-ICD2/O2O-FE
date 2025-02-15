import { Button } from '@/components/button'
import Separator from '@/components/Separator'
import { type PendingReview } from '@/models/review'
import Image from 'next/image'

interface PendingReviewProps {
  review: PendingReview
  offSeparator?: boolean
}

const PendingReview = ({ review, offSeparator = false }: PendingReviewProps) => {
  return (
    <>
      <div className="flex gap-4 px-mobile_safe py-5">
        <Image
          src={review.storeImageUrl}
          alt="pending-review"
          width={76}
          height={76}
          className="mt-1 size-[76px] rounded-sm bg-gray-300"
        />
        <div className="flex flex-col justify-between gap-2 text-sm">
          <div>
            <div className="font-semibold">{review.storeName}</div>
            <ul className="whitespace-pre-wrap">
              {review.menus.map((menu) => (
                <li key={menu.menuName}>
                  {menu.menuName} x {menu.menuCount}
                </li>
              ))}
            </ul>
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

export default PendingReview
