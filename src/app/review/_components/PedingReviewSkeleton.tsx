import { Button } from '@/components/button'
import { Separator } from '@/components/shadcn/separator'

const PedingReviewSkeleton = ({ offSeparator = false }: { offSeparator: boolean }) => {
  return (
    <>
      <div className="flex animate-pulse-custom gap-4 px-mobile_safe py-5">
        <div className="size-[76px] animate-pulse-custom rounded-sm bg-gray-300" />
        <div className="flex flex-col justify-between gap-2 text-sm">
          <div>
            <div className="mb-1 h-4 w-[130px] animate-pulse-custom rounded-sm bg-gray-300" />
            <ul className="whitespace-pre-wrap">
              <li className="h-4 w-[180px] animate-pulse-custom rounded-sm bg-gray-300" />
            </ul>
          </div>
          <Button variant="primaryFit" size="s" className="h-fit py-0.5">
            리뷰 작성
          </Button>
        </div>
      </div>
      {!offSeparator && <Separator className="h-2" />}
    </>
  )
}

export default PedingReviewSkeleton
