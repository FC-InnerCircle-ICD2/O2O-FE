import { CartItem } from '@/api/useGetCarts'
import Icon from '@/components/Icon'
import UpDownBtn from '@/components/UpDownBtn'
import Image from 'next/image'

type MenuItemProps = {
  menu: CartItem,
  onIncrease: (menuId: string) => void,
  onDecrease: (menuId: string) => void,
  onRemove: (menuId: string) => void
}
const MenuItem = ({ menu, onIncrease, onDecrease, onRemove }: MenuItemProps) => {
  const handleChangeCount = (count: number) => {
    if (count === 0) onRemove(menu.menuId)
    else if (count < menu.quantity) onDecrease(menu.menuId)
    else onIncrease(menu.menuId)
  }

  const handleRemove = () => {
    onRemove(menu.menuId)
  }

  return (
    <div className='px-3 flex flex-col gap-2'>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <Image
            className="size-[60px] rounded-xl object-cover object-center"
            src={menu.imageUrl}
            alt="음식점 대표 이미지"
            width={60}
            height={60}
            loading="lazy"
          />
          <div className="flex flex-col place-content-center">
            <div className="text-base font-medium">{menu.name}</div>
            {/* TODO: 선택한 옵션 */}
            <div className="font-bold">{(menu.totalPrice).toLocaleString()}원</div>
          </div>
        </div>
        <div className="" onClick={handleRemove}>
          <Icon name="X" size={20} className="text-gray-700 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-row justify-end gap-2"> 
        <UpDownBtn value={menu.quantity} onChange={handleChangeCount} />  
      </div>
    </div>
  )
}

export default MenuItem
