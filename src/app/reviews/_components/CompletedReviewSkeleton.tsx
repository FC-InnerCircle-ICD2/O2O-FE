import Separator from '@/components/Separator'

const WritableReviewSkeleton = ({ offSeparator = false }: { offSeparator: boolean }) => {
  return (
    <section className="flex flex-col gap-4 px-mobile_safe py-5">
      {/* 가게 정보 */}
      <div>
        <div className="mb-1 h-6 w-[200px] animate-pulse-custom rounded-sm bg-gray-300" />
        <div className="h-3 w-[100px] animate-pulse-custom rounded-sm bg-gray-300" />
      </div>
      <Separator />
      {/* 메뉴 정보 & 점수 */}
      <div className="flex items-center gap-2.5">
        <div className="size-[66px] animate-pulse-custom rounded-sm bg-gray-300" />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-[200px] animate-pulse-custom rounded-sm bg-gray-300" />
          <div className="h-4 w-[120px] animate-pulse-custom rounded-sm bg-gray-300" />
          <div className="h-4 w-[130px] animate-pulse-custom rounded-sm bg-gray-300" />
        </div>
      </div>
      {/* 메뉴 이미지 */}
      <div>
        <div className="aspect-video w-full animate-pulse-custom rounded-sm bg-gray-300" />
      </div>
      {/* 리뷰 내용 */}
      <div className="flex flex-col gap-1">
        <div className="h-4 w-3/5 animate-pulse-custom rounded-sm bg-gray-300" />
        <div className="h-4 w-3/4 animate-pulse-custom rounded-sm bg-gray-300" />
        <div className="h-4 w-2/3 animate-pulse-custom rounded-sm bg-gray-300" />
      </div>
      {/* 리뷰 수정 기간 */}
      <Separator />
      <div className="h-4 w-[170px] animate-pulse-custom rounded-sm bg-gray-300" />
      {!offSeparator && <Separator ignoreMobileSafe className="h-3" />}
    </section>
  )
}

export default WritableReviewSkeleton
