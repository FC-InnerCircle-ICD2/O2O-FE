'use client'

import usePostPayment from '@/api/usePostPayment'
import Alert from '@/components/Alert'
import Confirm from '@/components/Confirm'
import Icon from '@/components/Icon'
import { ApiErrorResponse } from '@/lib/api'
import { modalStore } from '@/store/modal'
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
  const { mutate: payment } = usePostPayment()

  useEffect(() => {
    // 브라우저 히스토리 조작
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', window.location.href)
      window.onpopstate = () => {
        router.replace(ROUTE_PATHS.HOME)
      }
    }

    if (orderId && paymentKey && amount) {
      payment(
        {
          orderId: orderId,
          paymentKey: paymentKey,
          amount: Number(amount),
        },
        {
          onSuccess: () => {
            showModal({
              content: (
                <Confirm
                  title="주문 완료"
                  message={`주문이 완료되었습니다.\n주문을 확인하러 갈까요?`}
                  cancelText="홈으로"
                  onCancelClick={() => {
                    router.replace(ROUTE_PATHS.HOME)
                  }}
                  confirmText="주문 상세"
                  onConfirmClick={() => {
                    router.replace(`${ROUTE_PATHS.ORDERS_DETAIL}/${orderId}`)
                  }}
                />
              ),
            })
          },
          onError: (error) => {
            const errorData = error as unknown as ApiErrorResponse

            showModal({
              content: (
                <Alert
                  title="결제 실패"
                  message={errorData.message || '결제 중 오류가 발생했습니다.'}
                  onClick={() => {
                    router.replace(ROUTE_PATHS.HOME)
                  }}
                />
              ),
            })
          },
        }
      )
    } else {
      showModal({
        content: (
          <Alert
            title="결제 실패"
            message="결제 중 오류가 발생했습니다."
            onClick={() => {
              router.replace(ROUTE_PATHS.PAY)
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
