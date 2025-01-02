import BottomNavigation from '@/components/BottomNavigation'
import MainLayout from '@/components/MainLayout'
import Navigation from '@/components/Navigation'
import { ReactNode } from 'react'

interface MypageLayoutProps {
  children: ReactNode
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <>
      <MainLayout>
        <Navigation title="마이페이지" />
        {children}
      </MainLayout>
      <BottomNavigation />
    </>
  )
}
