'use client'
import OrderInfo from '@/app/pay/_components/OrderInfo'
import LoginButtonSection from '@/components/shared/LoginButtonSection'
import memberStore from '@/store/user'

const PayPage = () => {
  const { member } = memberStore()

  return (
    <>
      {member ? (
        <div className="px-mobile_safe">
          <OrderInfo />
        </div>
      ) : (
        <div className="p-mobile_safe">
          <LoginButtonSection />
        </div>
      )}
    </>
  )
}

export default PayPage
