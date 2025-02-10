'use client'

import Badge from '@/components/Badge'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { Menu } from '@/models/menu'
import { orderDetailStore } from '@/store/orderDetail'
import Image from 'next/image'

const StoreDetailMenuItem = ({ storeName, storeId, menu }: { storeName: string, storeId: string, menu: Menu }) => {
    const { showOrderDetail } = orderDetailStore()
    const { toast } = useToast()

    const handleOrderDetail = (e: React.MouseEvent<HTMLDivElement>) => {
        if (menu.soldout) {
            toast({
                description: '품절된 메뉴입니다.',
                position: 'center',
            })
            return
        }

        const imgWrapper = e.currentTarget.querySelector('.img-wrapper')
        const rect = imgWrapper?.getBoundingClientRect()
        showOrderDetail({
            storeId: storeId,
            storeName: storeName,
            menuId: menu.id,
            originX: rect?.left ?? 0,
            originY: rect?.top ?? 0,
            imageUrl: menu.imageUrl
        })
    }

    return (
        <div className="flex gap-2 border-b border-solid border-gray-200 py-4" onClick={handleOrderDetail}>
            <div className="flex flex-1 flex-col gap-1">
                {menu.soldout ? <Badge variant='essential'>품절</Badge> :
                    menu.best ? <Badge className="font-light" variant="default">
                        베스트
                    </Badge> :
                        menu.manyOrder ? <Badge className="font-light" variant="default">
                            주문 많음
                        </Badge> : null}

                <div className="text-base pb-1">
                    <p className={cn("font-bold", menu.soldout ? "line-through text-gray-400" : "text-black")}>{menu.name}</p>
                    <p className={cn("font-semibold", menu.soldout ? "line-through text-gray-400" : "text-black")}>{menu.price.toLocaleString()}원</p>
                </div>
                <p className="max-w-[calc(100dvw-100px-0.5rem-40px)] truncate text-sm text-zinc-500">
                    {menu.description}
                </p>
            </div>
            <div className="img-wrapper relative min-w-[100px] min-h-[100px] size-[100px] overflow-hidden rounded-xl cursor-pointer">
                <Image
                    src={menu.imageUrl}
                    alt="menu_image"
                    className="object-cover"
                    fill
                    sizes="100px"
                    quality={75}
                />
                {menu.soldout && <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <p className="text-gray-100 font-bold">SOLD OUT</p>
                </div>}
            </div>
        </div>
    )
}

export default StoreDetailMenuItem
