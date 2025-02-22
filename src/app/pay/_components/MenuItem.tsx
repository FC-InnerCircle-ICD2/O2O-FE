import { CartItem } from '@/api/useGetCarts'
import Icon from '@/components/Icon'
import { Skeleton } from '@/components/shadcn/skeleton'
import UpDownBtn from '@/components/UpDownBtn'
import Image from 'next/image'

type MenuItemProps = {
  menu: CartItem
  onIncrease: (menuId: string) => void
  onDecrease: (menuId: string) => void
  onRemove: (cartId: number) => void
}
const MenuItem = ({ menu, onIncrease, onDecrease, onRemove }: MenuItemProps) => {
  const handleChangeCount = (count: number) => {
    if (count === 0) onRemove(menu.cartId)
    else if (count < menu.quantity) onDecrease(menu.menuId)
    else onIncrease(menu.menuId)
  }

  const handleRemove = () => {
    onRemove(menu.cartId)
  }

  return (
    <div className="flex flex-col gap-2 px-3">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          {menu.imageUrl ? (
            <Image
              className="size-[60px] rounded-xl object-cover object-center"
              src={menu.imageUrl}
              alt="음식점 대표 이미지"
              width={60}
              height={60}
              loading="lazy"
            />
          ) : (
            <Skeleton className="size-[60px] rounded-xl" />
          )}
          <div className="flex flex-col place-content-center">
            <div className="text-base font-medium">{menu.name}</div>
            {/* TODO: 선택한 옵션 */}
            <div className="font-bold">{menu.totalPrice.toLocaleString()}원</div>
          </div>
        </div>
        <div className="" onClick={handleRemove}>
          <Icon name="X" size={20} className="cursor-pointer text-gray-700" />
        </div>
      </div>
      <div className="flex flex-row justify-end gap-2">
        <UpDownBtn value={menu.quantity} onChange={handleChangeCount} />
      </div>
    </div>
  )
}

export default MenuItem
