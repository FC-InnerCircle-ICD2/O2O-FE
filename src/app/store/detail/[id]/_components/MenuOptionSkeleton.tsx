'use client'

import { Skeleton } from '@/components/shadcn/skeleton'

const MenuOptionSkeleton = () => {
  return (
    <div className="border-b border-solid border-gray-200 px-mobile_safe pb-3">
      <div className="flex items-center justify-between py-5">
        <Skeleton className="h-[28px] w-[150px]" />
      </div>
      <div className="flex flex-col gap-6">
        {new Array(5).fill(0).map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Skeleton className="size-5" />
            <Skeleton className="h-[24px] flex-1" />
            <Skeleton className="h-mobile_safe w-[50px]" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuOptionSkeleton
