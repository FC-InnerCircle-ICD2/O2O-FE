import { Skeleton } from '@/components/shadcn/skeleton'

const StoreListItemSkeleton = () => {
  return (
    <div className="flex flex-1 items-center gap-[10px]">
      <Skeleton className="size-[100px] animate-pulse-custom rounded-xl bg-gray-200" />
      <div className="flex flex-1 flex-col gap-[6px] overflow-x-hidden">
        <Skeleton className="h-[24px] w-3/4 animate-pulse-custom bg-gray-200" />
        <div className="flex items-center gap-[4px]">
          <Skeleton className="h-[16px] w-[100px] animate-pulse-custom bg-gray-200" />
        </div>
        <Skeleton className="h-[16px] w-[80px] animate-pulse-custom bg-gray-200" />
      </div>
    </div>
  )
}

export default StoreListItemSkeleton
