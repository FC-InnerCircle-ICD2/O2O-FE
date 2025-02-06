'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@/components/shadcn/progress'

type OrderStatusProps = {
  orderStatus?: string | null
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orderStatus }) => {
  const [status, setStatus] = useState(orderStatus ?? '')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [value, setValue] = useState(0)

  useEffect(() => {
    console.log('status', status)
    switch (status) {
      case '주문확인':
        setTitle('주문을 확인하고 있습니다')
        setSubTitle('확인 중입니다. 잠시만 기다려 주세요!')
        setValue(3)
        break
      case '주문완료':
        setTitle('주문을 완료했어요')
        setSubTitle('잠시 후 도착 예정 시간을 알려드릴게요.')
        setValue(20)
        break
      case '배달진행중':
        setTitle('음식이 배달 중입니다')
        setSubTitle('라이더가 빠르게 가는 중입니다. 기다려 주세요!')
        setValue(50)
        break
      case '배달완료':
        setTitle('배달을 완료했어요')
        setSubTitle('맛있게 드시고 리뷰를 남겨주세요!')
        setValue(100)
        break
      default:
        setTitle('')
        setSubTitle('')
        setValue(0)
        break
    }
  }, [status])

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
            <div className={status === '주문완료' ? 'text-primary' : 'text-gray-400'}>
              주문 완료
            </div>
            <div className={status === '배달진행중' ? 'text-primary' : 'text-gray-400'}>
              배달 진행중
            </div>
            <div className={status === '배달완료' ? 'text-primary' : 'text-gray-400'}>
              배달 완료
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatus
