import MenuList from '@/app/mypage/_components/MeunList'
import QuickMenuList from '@/app/mypage/_components/QuickMenuList'
import UserProfile from '@/app/mypage/_components/UserProfile'

const Mypage = () => {
  return (
    <section>
      <div className="px-mobile_safe">
        <UserProfile />
        <QuickMenuList />
      </div>
      <MenuList />
    </section>
  )
}

export default Mypage
