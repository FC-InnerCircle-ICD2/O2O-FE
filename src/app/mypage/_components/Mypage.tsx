import MenuList from '@/app/mypage/_components/MeunList'
import QuickMenuList from '@/app/mypage/_components/QuickMenuList'
import UserProfile from '@/app/mypage/_components/UserProfile'

const Mypage = () => {
  return (
    <section>
      <UserProfile />
      <div className="px-mobile_safe">
        <QuickMenuList />
      </div>
      <MenuList />
    </section>
  )
}

export default Mypage
