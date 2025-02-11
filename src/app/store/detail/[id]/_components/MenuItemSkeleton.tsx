import { Skeleton } from '@/components/shadcn/skeleton'

const MenuItemSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-navigation w-[200px]" />
      {new Array(3).fill(0).map((_, index) => (
        <div key={index} className="flex gap-2 border-b border-solid border-gray-200 py-4">
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton className="h-mobile_safe w-[38px] rounded-md" />
            <div className="pb-1 text-base">
              <Skeleton className="mb-1 h-mobile_safe w-[100px] rounded-md" />
              <Skeleton className="h-mobile_safe w-[100px] rounded-md" />
            </div>
            <div>
              <Skeleton className="h-mobile_safe w-[150px] rounded-md" />
            </div>
          </div>
          <div className="img-wrapper relative size-[100px] cursor-pointer overflow-hidden rounded-xl">
            <Skeleton className="size-[100px] rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default MenuItemSkeleton
