import QuickMenuList from '@/app/mypage/_components/QuickMenuList'
import UserProfile from '@/app/mypage/_components/UserProfile'

const Mypage = () => {
  return (
    <section className="p-mobile_safe">
      <UserProfile />
      <QuickMenuList />
    </section>
  )
}

export default Mypage
