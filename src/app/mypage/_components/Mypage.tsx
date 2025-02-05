
'use client'

import useGetMember from '@/api/useGetMember'
import MenuList from '@/app/mypage/_components/MeunList'
import QuickMenuList from '@/app/mypage/_components/QuickMenuList'
import UserProfile from '@/app/mypage/_components/UserProfile'
import { Skeleton } from '@/components/shadcn/skeleton'
import LoginButtonSection from '@/components/shared/LoginButtonSection'

const Mypage = () => {
  const { data: memberData, isLoading } = useGetMember()
  
  return (
    <section>
      {isLoading ? (
        <div className="p-mobile_safe">
          <Skeleton className='w-full h-[170px] '/>
        </div>
        ) : (
          memberData?.signname ? (
            <>
          <UserProfile name={memberData?.nickname} email={memberData.signname} />
          <div className="px-mobile_safe">
            <QuickMenuList />
          </div>
        </>
      ) : (
        <div className="p-mobile_safe">
          <LoginButtonSection />
        </div>
      )
      )}
      <MenuList />
    </section>
  )
}

export default Mypage
