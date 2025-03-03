'use client'

import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const PayFail = () => {
  const router = useRouter()
  const [timer, setTimer] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timer <= 0) {
      // router.replace(ROUTE_PATHS.PAY)
    }
  }, [timer])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <Icon name="CircleX" className="size-10 text-primary" size={40} />
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-bold">결제 중 오류가 발생했어요.</p>
        <Button variant="default" onClick={() => router.replace(ROUTE_PATHS.PAY)}>
          장바구니로 이동
        </Button>
        {timer > 0 && (
          <p className="pt-2 text-sm text-gray-500">{timer}초 후 자동으로 이동합니다.</p>
        )}
      </div>
    </div>
  )
}

export default PayFail
