import { CompletedReviewType } from '@/api/useGetCompletedReviews'
import { WritableReviewType } from '@/api/useGetWritableReviews'
import usePatchReview from '@/api/usePatchReview'
import usePostReview from '@/api/usePostReview'
import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import { useToast } from '@/hooks/useToast'
import { modalStore } from '@/store/modal'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

interface ReviewEditorModalProps {
  storeId: WritableReviewType['storeId']
  storeName: WritableReviewType['storeName']
  orderSummary: WritableReviewType['orderSummary']
  orderId?: WritableReviewType['orderId']
  prevData?: CompletedReviewType
}

interface ReviewFormData {
  totalScore: number
  tasteScore: number
  quantityScore: number
  content: string
  deliveryQuality: 'GOOD' | 'BAD' | ''
  image: File | null
  imagePreview: string | null
  isImageChanged?: boolean // 수정시에만 사용
}

const ReviewEditorModal = ({
  storeId,
  storeName,
  orderSummary,
  orderId,
  prevData,
}: ReviewEditorModalProps) => {
  const { hideModal } = modalStore()
  const { mutate: postReview } = usePostReview()
  const { mutate: patchReview } = usePatchReview()
  const { toast } = useToast()

  const { register, handleSubmit, watch, setValue } = useForm<ReviewFormData>({
    defaultValues: {
      totalScore: prevData?.totalScore || 0,
      tasteScore: prevData?.tasteScore || 0,
      quantityScore: prevData?.amountScore || 0,
      content: prevData?.clientReviewContent || '',
      deliveryQuality: prevData?.deliveryQuality || '',
      image: null,
      imagePreview: prevData?.representativeImageUri || null,
      isImageChanged: false,
    },
  })

  const totalScore = watch('totalScore')
  const tasteScore = watch('tasteScore')
  const quantityScore = watch('quantityScore')
  const content = watch('content')
  const deliveryQuality = watch('deliveryQuality')

  const imagePreview = watch('imagePreview')

  const isFormValid =
    totalScore > 0 &&
    tasteScore > 0 &&
    quantityScore > 0 &&
    content.length >= 5 &&
    (deliveryQuality === 'GOOD' || deliveryQuality === 'BAD')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setValue('image', file)
    setValue('imagePreview', URL.createObjectURL(file))
    setValue('isImageChanged', true)
  }

  const handleImageDelete = () => {
    setValue('image', null)
    setValue('imagePreview', null)
    setValue('isImageChanged', true)
  }

  const onSubmit = (data: ReviewFormData) => {
    if (orderId) {
      postReview(
        {
          orderId,
          storeId,
          totalScore: data.totalScore,
          tasteScore: data.tasteScore,
          quantityScore: data.quantityScore,
          content: data.content,
          deliveryQuality: data.deliveryQuality as 'GOOD' | 'BAD',
          image: data.image,
        },
        {
          onSuccess: () => {
            hideModal()
            toast({
              title: '리뷰가 등록되었어요.',
              position: 'center',
            })
          },
          onError: () => {
            toast({
              title: '리뷰 등록에 실패했어요.',
              description: '다시 시도해주세요.',
              variant: 'destructive',
              position: 'center',
            })
          },
        }
      )
    }
    if (prevData) {
      patchReview(
        {
          reviewId: prevData.reviewId,
          content: data.content,
          totalScore: data.totalScore,
          tasteScore: data.tasteScore,
          amountScore: data.quantityScore,
          deliveryQuality: data.deliveryQuality as 'GOOD' | 'BAD',
          image: data.image,
          isImageChanged: data.isImageChanged ?? false,
        },
        {
          onSuccess: () => {
            hideModal()
            toast({
              title: '리뷰가 수정되었어요.',
              position: 'center',
            })
          },
          onError: () => {
            toast({
              title: '리뷰 수정에 실패했어요.',
              description: '다시 시도해주세요.',
              variant: 'destructive',
              position: 'center',
            })
          },
        }
      )
      console.log('🚀  data.image:', data.image)
    }
  }

  return (
    <div className="size-full bg-white p-mobile_safe">
      <div className="relative mb-3 mt-6 flex items-center gap-3">
        <Icon name="X" size={24} onClick={hideModal} className="stroke-2" />
        <div className="font-bold">{storeName}</div>
      </div>
      <div className="mb-1 text-lg font-bold">이 가게를 추천하시겠어요?</div>
      <div className="mb-4 text-sm">{orderSummary}</div>

      <RatingInput
        value={watch('totalScore')}
        onChange={(value) => setValue('totalScore', value)}
        size={40}
      />
      <div className="ml-1.5">
        <RatingInput
          label="맛"
          value={watch('tasteScore')}
          onChange={(value) => setValue('tasteScore', value)}
        />
        <RatingInput
          label="양"
          value={watch('quantityScore')}
          onChange={(value) => setValue('quantityScore', value)}
        />
      </div>
      <div className="mb-4">
        <textarea
          className="w-full rounded-lg border border-gray-300 p-2 leading-tight"
          placeholder="최소 5자 이상 작성해야 등록이 가능해요."
          {...register('content', {
            required: true,
            minLength: 5,
          })}
          maxLength={1000}
          rows={4}
        />
        <div className="mt-0.5 text-right text-sm text-gray-400">{content.length}/1000</div>
      </div>
      <div className="mb-10">
        <div className="mb-2 text-sm font-bold">사진 등록하기 (선택)</div>
        <div className="flex gap-2">
          {!imagePreview ? (
            <label className="flex size-16 cursor-pointer items-center justify-center rounded-lg border border-solid border-gray-400 p-2">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <Icon name="Camera" size={24} />
            </label>
          ) : (
            <div className="relative size-16">
              <Image
                src={imagePreview}
                alt="리뷰 이미지"
                className="size-16 rounded-lg object-cover"
                width={64}
                height={64}
              />
              <button
                onClick={handleImageDelete}
                className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gray-800 text-white"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mb-7">
        <div className="mb-2 text-lg font-bold">배달은 어떠셨어요?</div>
        <div className="flex gap-2">
          <div
            className={`rounded-full border border-solid border-gray-400 p-2.5 ${watch('deliveryQuality') === 'GOOD' ? 'bg-primary text-white' : ''}`}
            onClick={() => setValue('deliveryQuality', 'GOOD')}
          >
            좋아요
          </div>
          <div
            className={`rounded-full border border-solid border-gray-400 p-2.5 ${watch('deliveryQuality') === 'BAD' ? 'bg-primary text-white' : ''}`}
            onClick={() => setValue('deliveryQuality', 'BAD')}
          >
            아쉬워요
          </div>
        </div>
      </div>
      <Button onClick={handleSubmit(onSubmit)} disabled={!isFormValid}>
        리뷰 등록하기
      </Button>
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
