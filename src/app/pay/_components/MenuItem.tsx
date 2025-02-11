import Icon from '@/components/Icon'
import UpDownBtn from '@/components/UpDownBtn'
import { OrderMenu } from '@/store/orderList'
import Image from 'next/image'
import { useState } from 'react'

const MenuItem = ({
  menu,
  handlePriceAndCount,
}: {
  menu: OrderMenu
  handlePriceAndCount: (id: string, count: number) => void
}) => {
  const [count, setCount] = useState(1)

  const handlerCount = (count: number) => {
    setCount(count)
    handlePriceAndCount(menu.menuId, count)
  }

  return (
    <div className="flex flex-col gap-2 px-3">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <Image
            className="size-[60px] rounded-xl object-cover object-center"
            src={menu.imgUrl}
            alt="음식점 대표 이미지"
            width={60}
            height={60}
            loading="lazy"
          />
          <div className="flex flex-col place-content-center">
            <div className="text-base font-medium">{menu.name}</div>
            <div className="pb-3 text-sm text-gray-700">{menu.optionNames}</div>
            <div className="font-bold">{(menu.price * count).toLocaleString()}원</div>
          </div>
        </div>
        <div className="">
          <Icon name="X" size={20} className="text-gray-700" />
        </div>
      </div>
      <div className="flex flex-row justify-end gap-2">
        {/*<Button variant="grayFit" size="s" className="text-black">*/}
        {/*  옵션변경*/}
        {/*</Button>*/}
        <UpDownBtn value={count} handlerCount={handlerCount} />
      </div>
    </div>
  )
}

export default MenuItem
