import MenuList from '@/app/mypage/_components/MeunList'
import QuickMenuList from '@/app/mypage/_components/QuickMenuList'
import UserProfile from '@/app/mypage/_components/UserProfile'

const Mypage = () => {
  return (
    <section className="p-mobile_safe">
      <UserProfile />
      <QuickMenuList />
      <MenuList />
    </section>
  )
}

export default Mypage
