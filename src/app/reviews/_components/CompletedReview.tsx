import { CompletedReviewType } from '@/api/useGetCompletedReviews'
import Icon from '@/components/Icon'
import Separator from '@/components/Separator'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
interface CompletedReviewProps {
  review: CompletedReviewType
  offSeparator: boolean
}

const CompletedReview = ({ review, offSeparator }: CompletedReviewProps) => {
  const router = useRouter()
  const [menuImageErrors, setMenuImageErrors] = useState<Record<string, boolean>>({})
  const [representativeImageErrors, setRepresentativeImageErrors] = useState<
    Record<string, boolean>
  >({})
  const handleClickStore = () => {
    router.push(`/store/detail/${review.storeId}`)
  }
  return (
    <section className="flex flex-col gap-4 px-mobile_safe py-5">
      {/* 가게 정보 */}
      <div className="cursor-pointer" onClick={handleClickStore}>
        <div className="mb-0.5 flex items-center gap-1 font-bold">
          {review.storeName} <Icon name="ChevronRight" size={20} className="stroke-2" />
        </div>
        <div className="text-xs text-gray-400">
          {new Date(review.createTime)
            .toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\. /g, '.')
            .slice(0, 10)}
        </div>
      </div>
      <Separator />
      {/* 메뉴 정보 & 점수 */}
      <div className="flex items-center gap-2.5">
        {menuImageErrors[review.reviewId] || !review.menuImage ? (
          <div className="mt-1 flex size-[72px] items-center justify-center rounded-sm bg-primary/15 text-xl font-extrabold text-primary">
            {review.storeName.slice(0, 3)}
          </div>
        ) : (
          <Image
            src={review.menuImage}
            alt="pending-review "
            width={72}
            height={72}
            className="mt-1 size-[72px] rounded-sm"
            onError={() => {
              setMenuImageErrors((prev) => ({ ...prev, [review.reviewId]: true }))
            }}
          />
        )}
        <div className="flex flex-col gap-1">
          <div>{review.menuName}</div>
          <TotalRating score={review.totalScore} />
          <div className="flex gap-2.5">
            <div className="flex gap-1 text-xs font-extrabold">
              <div>맛</div>
              <Icon name="Star" size={16} className="fill-primary stroke-primary" />
              <div className="font-medium text-primary">{review.tasteScore}</div>
            </div>
            <div className="flex gap-1 text-xs font-extrabold">
              <div>양</div>
              <Icon name="Star" size={16} className="fill-primary stroke-primary" />
              <div className="font-medium text-primary">{review.amountScore}</div>
            </div>
          </div>
        </div>
      </div>
      {/* 메뉴 이미지 */}
      <div>
        {!representativeImageErrors[review.reviewId] && review.representativeImageUri && (
          <Image
            className="aspect-video w-full rounded-sm object-cover"
            src={review.representativeImageUri}
            alt="리뷰 사진"
            width={359}
            height={202}
            onError={() => {
              setRepresentativeImageErrors((prev) => ({ ...prev, [review.reviewId]: true }))
            }}
          />
        )}
      </div>
      {/* 리뷰 내용 */}
      <div className="whitespace-pre-line">{review.clientReviewContent}</div>
      {/* 리뷰 수정 기간 */}
      <Separator />
      <div className="text-xs text-gray-400">
        리뷰 수정 기간 <span className="text-pink-500">{review.editDeadline}일 남음</span>
      </div>
      {!offSeparator && <Separator ignoreMobileSafe className="h-3" />}
    </section>
  )
}

export default CompletedReview

const TotalRating = ({ score }: { score: number }) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="Star"
          size={16}
          className={cn(
            'cursor-pointer',
            score >= i + 1 ? 'fill-primary stroke-primary' : 'fill-gray-200 stroke-gray-200'
          )}
        />
      ))}
    </div>
  )
}
