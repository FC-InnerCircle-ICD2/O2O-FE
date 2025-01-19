import { Skeleton } from '@/components/shadcn/skeleton'

const StoreListItemSkeleton = () => {
  return (
    <div className="flex flex-1 items-center gap-[10px]">
      <Skeleton className="animate-pulse-custom size-[100px] rounded-xl bg-gray-300" />
      <div className="flex flex-1 flex-col gap-[6px] overflow-x-hidden">
        <Skeleton className="animate-pulse-custom h-[24px] w-3/4 bg-gray-300" />
        <div className="flex items-center gap-[4px]">
          <Skeleton className="animate-pulse-custom h-[16px] w-[100px] bg-gray-300" />
        </div>
        <Skeleton className="animate-pulse-custom h-[16px] w-[80px] bg-gray-300" />
      </div>
    </div>
  )
}

export default StoreListItemSkeleton
