import { Skeleton } from '@/components/shadcn/skeleton'

const OrderItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 px-mobile_safe">
      <div className="flex gap-4">
        <Skeleton className="size-[100px] rounded-xl" />
        <div className="flex flex-1 flex-col gap-4">
          <Skeleton className="h-[17px] w-4/5" />
          <Skeleton className="h-[28px] w-4/5" />
        </div>
      </div>
      <Skeleton className="h-[40px] w-full" />
    </div>
  )
}

export default OrderItemSkeleton
