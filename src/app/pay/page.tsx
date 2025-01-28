import LoginButtonSection from '@/components/shared/LoginButtonSection'
import OrderInfo from '@/app/pay/_components/OrderInfo'

const PayPage = () => {
  const { user } = { user: false }

  return (
    <>
      {user ? (
        <></>
      ) : (
        <div className="p-mobile_safe">
          <LoginButtonSection />
        </div>
      )}
      <div className="px-mobile_safe">
        <OrderInfo />
      </div>
    </>
  )
}

export default PayPage
