'use client'

import Alert from '@/components/Alert'
import Icon from '@/components/Icon'
import { modalStore } from '@/store/modal'
import { successPaymentStore } from '@/store/successPayment'
import { ROUTE_PATHS } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const PaySuccess = () => {
  const params = new URLSearchParams(location.search)
  const orderId = params.get('orderId')
  const paymentKey = params.get('paymentKey')
  const amount = params.get('amount')

  const { showModal } = modalStore()
  const router = useRouter()
  const { setPayments } = successPaymentStore()

  useEffect(() => {
    if (orderId && paymentKey && amount) {
      setPayments({ orderId, paymentKey, amount: Number(amount) })
      router.replace(ROUTE_PATHS.PAY)
    } else {
      showModal({
        content: (
          <Alert
            title="결제 실패"
            message="결제 중 오류가 발생했습니다."
            onClick={() => {
              router.push(ROUTE_PATHS.PAY)
            }}
          />
        ),
      })
    }
  }, [])

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <Icon className="animate-spin text-primary" name="Loader" size={40} />
      <p className="text-base font-semibold">결제가 진행중입니다...</p>
    </div>
  )
}

export default PaySuccess
