
'use client'

import MenuList from '@/app/mypage/_components/MeunList'
import QuickMenuList from '@/app/mypage/_components/QuickMenuList'
import UserProfile from '@/app/mypage/_components/UserProfile'
import LoginButtonSection from '@/components/shared/LoginButtonSection'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const Mypage = () => {
  const accessToken = useLocalStorage('accessToken')

  return (
    <section>
      {accessToken.storedValue ? (
        <>
          <UserProfile />
          <div className="px-mobile_safe">
            <QuickMenuList />
          </div>
        </>
      ) : (
        <div className="p-mobile_safe">
          <LoginButtonSection />
        </div>
      )}
      <MenuList />
    </section>
  )
}

export default Mypage
