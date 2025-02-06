
'use client'

import MenuList from '@/app/mypage/_components/MeunList'
import QuickMenuList from '@/app/mypage/_components/QuickMenuList'
import UserProfile from '@/app/mypage/_components/UserProfile'
import { Skeleton } from '@/components/shadcn/skeleton'
import LoginButtonSection from '@/components/shared/LoginButtonSection'
import globalLoaderStore from '@/store/globalLoader'
import memberStore from '@/store/user'

const Mypage = () => {
  const { member } = memberStore()
  const { isGlobalLoading } = globalLoaderStore()

  return (
    <section className='pt-4'>
      {isGlobalLoading ? (
        <div className="">
          <div className='px-mobile_safe py-4'>
            <Skeleton className='w-full h-[56px]' />
          </div>
          <div className='px-mobile_safe py-[1px] mt-2'>
            <Skeleton className='w-full h-[80px]' />
          </div>
        </div>
        ) : (
          member ? (
            <>
              <UserProfile name={member.nickname} email={member.signname} />
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
