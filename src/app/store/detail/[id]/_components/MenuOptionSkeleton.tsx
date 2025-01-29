'use client'

import { Skeleton } from "@/components/shadcn/skeleton"

const MenuOptionSkeleton = () => {
    return (
        <div className="px-mobile_safe border-b border-gray-200 border-solid pb-3">
            <div className="flex items-center justify-between py-5">
                <Skeleton className="w-[150px] h-[28px]" />
            </div>
            <div className="flex flex-col gap-6">
                {new Array(5).fill(0).map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="flex-1 h-[24px]" />
                        <Skeleton className="h-[20px] w-[50px]" />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default MenuOptionSkeleton