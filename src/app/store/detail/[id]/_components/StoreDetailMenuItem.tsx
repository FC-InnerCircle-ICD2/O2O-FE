'use client'

import Badge from '@/components/Badge'
import { Skeleton } from '@/components/shadcn/skeleton'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { Menu } from '@/models/menu'
import { orderDetailStore } from '@/store/orderDetail'
import Image from 'next/image'

const StoreDetailMenuItem = ({
    storeName,
    storeId,
    menu,
}: {
        storeName: string
        storeId: string
        menu: Menu
}) => {
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
          imageUrl: menu.imageUrl,
    })
  }

    return (
        <div
            className="flex gap-2 border-b border-solid border-gray-200 py-4"
            onClick={handleOrderDetail}
        >
            <div className="flex flex-1 flex-col gap-1">
                {menu.soldout ? (
                    <Badge variant="essential">품절</Badge>
                ) : menu.best ? (
                    <Badge className="font-light" variant="default">
                        베스트
                    </Badge>
                ) : menu.manyOrder ? (
                    <Badge className="font-light" variant="default">
                        주문 많음
                    </Badge>
                ) : null}

              <div className="pb-1 text-base">
                  <p
                      className={cn('font-bold', menu.soldout ? 'text-gray-400 line-through' : 'text-black')}
                  >
                      {menu.name}
                  </p>
                  <p
                      className={cn(
                          'font-semibold',
                          menu.soldout ? 'text-gray-400 line-through' : 'text-black'
                      )}
                  >
                      {menu.price.toLocaleString()}원
                  </p>
              </div>
              <p className="max-w-[calc(min(100dvw,480px)-100px-0.5rem-40px)] truncate text-sm text-zinc-500">
                  {menu.description}
              </p>
          </div>
          <div className="img-wrapper relative size-[100px] min-h-[100px] min-w-[100px] cursor-pointer overflow-hidden rounded-xl">
              {menu.imageUrl ? (
                  <Image
                      src={menu.imageUrl}
                      alt="menu_image"
                      className="object-cover"
                      fill
                      sizes="100px"
                      quality={75}
                  />
              ) : (
                  <Skeleton className="size-[100px] min-h-[100px] min-w-[100px] rounded-xl bg-gray-200" />
              )}
              {menu.soldout && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <p className="font-bold text-gray-100">SOLD OUT</p>
                  </div>
              )}
          </div>
      </div>
  )
}

export default StoreDetailMenuItem
