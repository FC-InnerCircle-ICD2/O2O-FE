'use client'

import Sample from '@/assets/images/sample.jpg'
import Badge from '@/components/Badge'
import { orderDetailStore } from '@/store/orderDetail'
import Image from 'next/image'

const StoreDetailMenuItem = () => {
    const { showOrderDetail } = orderDetailStore()

    const handleOrderDetail = (e: React.MouseEvent<HTMLDivElement>) => {
        const imgWrapper = e.currentTarget.querySelector('.img-wrapper')
        const rect = imgWrapper?.getBoundingClientRect()
        showOrderDetail({
            menuId: 0,
            originX: rect?.left ?? 0,
            originY: rect?.top ?? 0,
            imageUrl: Sample.src
        })
    }

    return (
        <>
            <div className="flex gap-2 border-b border-solid border-gray-200 py-4" onClick={handleOrderDetail}>
                <div className="flex flex-1 flex-col gap-1">
                    <Badge className="font-light" variant="default">
                        베스트
                    </Badge>
                    <div className="text-base font-bold">
                        <p className="">1인치떡 세트</p>
                        <p className="">16,900원</p>
                    </div>
                    <div>
                        <p className="max-w-[calc(100dvw-100px-0.5rem)] truncate text-sm text-gray-500">
                            혼자서도 즐기는 치킨&떡볶이
                        </p>
                        <p className="text-sm text-gray-600">리뷰 4</p>
                    </div>
                </div>
                <div className="img-wrapper relative size-[100px] overflow-hidden rounded-xl cursor-pointer">
                    <Image src={Sample} alt="sample" className="object-cover" fill />
                </div>
            </div>
        </>
    )
}

export default StoreDetailMenuItem
