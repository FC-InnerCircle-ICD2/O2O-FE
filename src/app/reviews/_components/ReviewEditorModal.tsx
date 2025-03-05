import { CompletedReviewType } from '@/api/useGetCompletedReviews'
import { WritableReviewType } from '@/api/useGetWritableReviews'
import usePatchReview from '@/api/usePatchReview'
import usePostReview from '@/api/usePostReview'
import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import Loading from '@/components/Loading'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { modalStore } from '@/store/modal'
import { ROUTE_PATHS } from '@/utils/routes'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import imageCompression from 'browser-image-compression'
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
  const { mutate: postReview, isPending: isPosting } = usePostReview()
  const { mutate: patchReview, isPending: isPatching } = usePatchReview()
  const { toast } = useToast()

  const { register, handleSubmit, watch, setValue } = useForm<ReviewFormData>({
    defaultValues: {
      totalScore: prevData?.totalScore || 0,
      tasteScore: prevData?.tasteScore || 0,
      quantityScore: prevData?.amountScore || 0,
      content: prevData?.clientReviewContent || '',
      deliveryQuality: prevData?.deliveryQuality || '',
      image: null,
      imagePreview: prevData?.representativeImageUri
        ? prevData.representativeImageUri + `?v=${Date.now()}`
        : null,
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
  const [isContentValid, setIsContentValid] = useState(true)

  const router = useRouter()
  const queryClient = useQueryClient()

  const handleBlurContent = () => {
    if (content.length < 5) {
      setIsContentValid(false)
    } else {
      setIsContentValid(true)
    }
  }
  const handleFocusContent = () => {
    setIsContentValid(true)
  }
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // 압축 옵션 설정
    const options = {
      maxSizeMB: 1, // 최대 파일 크기 (MB 단위)
      maxWidthOrHeight: 1024, // 최대 가로/세로 크기 (px 단위)
      useWebWorker: true, // 웹 워커 사용으로 성능 향상
    }

    try {
      // 이미지 압축
      const compressedFile = await imageCompression(file, options)

      // 압축된 파일을 File 객체로 변환
      const convertedFile = new File([compressedFile], file.name, {
        type: file.type,
        lastModified: Date.now(),
      })

      setValue('image', convertedFile)
      setValue('imagePreview', URL.createObjectURL(convertedFile))
      setValue('isImageChanged', true)
    } catch (error) {
      console.error('이미지 압축 중 오류 발생:', error)
    }
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
            queryClient.invalidateQueries({ queryKey: ['completed-reviews'] })
            hideModal()
            router.push(`${ROUTE_PATHS.REVIEW}?tab=2`)

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
            queryClient.invalidateQueries({ queryKey: ['completed-reviews'] })
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
    }
  }

  return (
    <>
      {(isPosting || isPatching) && <Loading />}
      <div className="flex size-full flex-col bg-white p-mobile_safe">
        <div className="mb-3 mt-6 flex items-center gap-3">
          <Icon name="X" size={24} onClick={hideModal} className="stroke-2" />
          <div className="font-bold">{storeName}</div>
        </div>

        <div className="grow overflow-y-auto">
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
              onBlur={handleBlurContent}
              onFocus={handleFocusContent}
            />
            <div
              className={cn(
                'mt-0.5 flex items-center text-sm text-gray-400',
                !isContentValid ? 'justify-between' : 'justify-end'
              )}
            >
              {!isContentValid && (
                <span className="ml-1 text-red-500">최소 5자 이상 작성해주세요.</span>
              )}
              <span>{content.length}/1000</span>
            </div>
          </div>
          <div className="mb-10">
            <div className="mb-2 text-sm font-bold">사진 등록하기 (선택)</div>
            <div className="flex gap-2">
              {!imagePreview ? (
                <label className="flex size-16 cursor-pointer items-center justify-center rounded-lg border border-solid border-gray-400 p-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
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
        </div>

        <div className="bg-white pt-2">
          <Button onClick={handleSubmit(onSubmit)} disabled={!isFormValid}>
            리뷰 등록하기
          </Button>
        </div>
      </div>
    </>
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
