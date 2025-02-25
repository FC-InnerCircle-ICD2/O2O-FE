'use client'

import { Progress } from '@/components/shadcn/progress'
import { useEffect, useState } from 'react'

type OrderStatusProps = {
  orderStatus: string
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orderStatus }) => {

  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [value, setValue] = useState(0)

  useEffect(() => {
    switch (orderStatus) {
      case 'NEW':
        setTitle('주문이 접수되었습니다.')
        setSubTitle('확인 중입니다. 잠시만 기다려 주세요!')
        setValue(20)
        break
      case 'ONGOING':
        setTitle('주문을 수락했어요')
        setSubTitle('잠시 후 도착 예정 시간을 알려드릴게요.')
        setValue(50)
        break
      case 'DONE':
        setTitle('배달을 완료했어요')
        setSubTitle('맛있게 드시고 리뷰를 남겨주세요!')
        setValue(100)
        break
      case 'REFUSE':
            setTitle('주문이 거절되었습니다.')
            setSubTitle('다음에 다시 이용해 주세요')
            setValue(0)
            break
      default:
        setTitle('')
        setSubTitle('')
        setValue(0)
        break
    }
  }, [orderStatus])

  return (
    <div className="px-mobile_safe">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold">{title}</div>
          <div className="text-sm text-gray-400">{subTitle}</div>
        </div>
        <div className="flex flex-col gap-2">
          <Progress value={value} />
          <div className="flex flex-row justify-evenly text-sm">
            <div className={orderStatus === 'NEW' ? 'text-primary' : 'text-gray-400'}>
              주문접수
            </div>
            <div className={orderStatus === 'ONGOING' ? 'text-primary' : 'text-gray-400'}>
              조리중
            </div>
            <div className={orderStatus === 'DONE' ? 'text-primary' : 'text-gray-400'}>
              배달완료
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatus
