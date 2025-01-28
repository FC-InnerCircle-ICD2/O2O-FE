import { Skeleton } from '@/components/shadcn/skeleton'

const MenuItemSkeleton = () => {
    return (
        <div>
            <Skeleton className='w-[200px] h-[40px]' />
            {new Array(3).fill(0).map((_, index) => (
                <div key={index} className="flex gap-2 border-b border-solid border-gray-200 py-4">
                    <div className="flex flex-1 flex-col gap-1">
                        <Skeleton className='w-[38px] h-[20px] rounded-md' />
                        <div className="text-base pb-1">
                            <Skeleton className='w-[100px] h-[20px] rounded-md mb-1' />
                            <Skeleton className='w-[100px] h-[20px] rounded-md' />
                        </div>
                        <div>
                            <Skeleton className='w-[150px] h-[20px] rounded-md' />
                        </div>
                    </div>
                    <div className="img-wrapper relative size-[100px] overflow-hidden rounded-xl cursor-pointer">
                        <Skeleton className='w-[100px] h-[100px] rounded-xl' />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MenuItemSkeleton