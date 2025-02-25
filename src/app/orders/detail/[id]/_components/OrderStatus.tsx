'use client'

import { Progress } from '@/components/shadcn/progress'
import { useEffect, useState } from 'react'

type OrderStatusProps = {
  orderStatus?: string | null
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orderStatus }) => {
  const [status, setStatus] = useState(orderStatus ?? '')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [value, setValue] = useState(0)
  const [isDisabledProgress, setIsDisabledProgress] = useState(false)

  useEffect(() => {
    switch (orderStatus) {
      case '주문거절':
        setTitle('주문이 거절되었습니다.')
        setSubTitle('다음에 다시 이용해 주세요')
        setIsDisabledProgress(true)
        setValue(0)
        break
      case '주문접수':
        setTitle('주문이 접수되었습니다.')
        setSubTitle('확인 중입니다. 잠시만 기다려 주세요!')
        setValue(0)
        break
      case '주문수락':
        setTitle('주문을 수락했어요')
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
      case '주문취소':
        setTitle('주문을 취소했습니다')
        setSubTitle('')
        setValue(0)
        setIsDisabledProgress(true)
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
        {!isDisabledProgress && (
          <div className="flex flex-col gap-2">
            <Progress value={value} />

            <div className="flex flex-row justify-evenly text-sm">
              <div className={status === '주문수락' ? 'text-primary' : 'text-gray-400'}>
                주문 수락
              </div>
              <div className={status === '배달진행중' ? 'text-primary' : 'text-gray-400'}>
                배달 진행중
              </div>
              <div className={status === '배달완료' ? 'text-primary' : 'text-gray-400'}>
                배달 완료
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderStatus
