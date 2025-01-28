'use client'

import Sample from '@/assets/images/sample.jpg'
import Badge from '@/components/Badge'
import { Menu } from '@/models/menu'
import { orderDetailStore } from '@/store/orderDetail'
import Image from 'next/image'

const StoreDetailMenuItem = ({ menu }: { menu: Menu }) => {
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
                    <div className="text-base pb-1">
                        <p className="font-bold">{menu.name}</p>
                        <p className="font-semibold">{menu.price.toLocaleString()}원</p>
                    </div>
                    <p className="max-w-[calc(100dvw-100px-0.5rem-40px)] line-clamp-2 text-sm text-zinc-500">
                        {menu.description}
                    </p>
                </div>
                <div className="img-wrapper relative min-w-[100px] min-h-[100px] size-[100px] overflow-hidden rounded-xl cursor-pointer">
                    <Image src={Sample} alt="sample" className="object-cover" fill />
                </div>
            </div>
        </>
    )
}

export default StoreDetailMenuItem
