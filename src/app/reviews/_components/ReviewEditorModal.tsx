import { WritableReview } from '@/api/useGetWritableReviews'
import usePostReview from '@/api/usePostReview'
import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import { modalStore } from '@/store/modal'
import { useState } from 'react'

interface ReviewEditorModalProps {
  orderId: WritableReview['orderId']
  storeId: WritableReview['storeId']
  storeName: WritableReview['storeName']
  orderSummary: WritableReview['orderSummary']
}

const ReviewEditorModal = ({
  orderId,
  storeId,
  storeName,
  orderSummary,
}: ReviewEditorModalProps) => {
  const { hideModal } = modalStore()
  const { mutate: postReview } = usePostReview()
  const [totalScore, setTotalScore] = useState(0)
  const [tasteScore, setTasteScore] = useState(0)
  const [quantityScore, setQuantityScore] = useState(0)
  const [content, setContent] = useState('')
  const [deliveryQuality, setDeliveryQuality] = useState<'GOOD' | 'BAD'>('GOOD')

  const handlePostReview = () => {
    postReview({
      orderId,
      storeId,
      content,
      totalScore,
      tasteScore,
      quantityScore,
      deliveryQuality,
    })
  }
  return (
    <div className="size-full bg-white p-mobile_safe">
      <div className="relative mb-3 mt-6 flex items-center gap-3">
        <Icon name="X" size={24} onClick={hideModal} className="stroke-2" />
        <div className="font-bold">{storeName}</div>
      </div>
      <div className="mb-1 text-lg font-bold">이 가게를 추천하시겠어요?</div>
      <div className="mb-4 text-sm">{orderSummary}</div>

      <RatingInput value={totalScore} onChange={setTotalScore} size={40} />
      <RatingInput label="맛" value={tasteScore} onChange={setTasteScore} />
      <RatingInput label="양" value={quantityScore} onChange={setQuantityScore} />
      <div className="mb-4">
        <textarea
          className="w-full rounded-lg border border-gray-300 p-2 leading-tight"
          placeholder="최소 5자 이상 작성해야 등록이 가능해요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          rows={4}
        />
        <div className="mt-0.5 text-right text-sm text-gray-400">{content.length}/1000</div>
      </div>
      <div className="mb-10">
        <div className="mb-2 text-sm font-bold">사진 등록하기 (선택)</div>
        <div className="flex size-16 items-center justify-center gap-2 rounded-lg border border-solid border-gray-400 p-2">
          <Icon name="Camera" size={24} />
        </div>
      </div>
      <div className="mb-7">
        <div className="mb-2 text-lg font-bold">배달은 어떠셨어요?</div>
        <div className="flex gap-2">
          <div className="rounded-full border border-solid border-gray-400 p-2.5">좋아요</div>
          <div className="rounded-full border border-solid border-gray-400 p-2.5">아쉬워요</div>
        </div>
      </div>
      <Button onClick={handlePostReview}>리뷰 등록하기</Button>
    </div>
  )
}

export default ReviewEditorModal

const RatingInput = ({
  label,
  value,
  onChange,
  size = 28,
}: {
  label?: string
  value: number
  onChange: (rating: number) => void
  size?: number
}) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      {label && <div className="text-sm font-bold">{label}</div>}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={size}
            className={`cursor-pointer ${star <= value ? 'fill-primary stroke-primary' : 'fill-gray-200 stroke-gray-200'}`}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    </div>
  )
}
