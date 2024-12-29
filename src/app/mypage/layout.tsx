import BottomNavigation from '@/components/BottomNavigation'
import Navigation from '@/components/Navigation'
import { ReactNode } from 'react'

interface MypageLayoutProps {
  children: ReactNode
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <>
      <Navigation hasBackButton={true} title="마이페이지" />
      {children}
      <BottomNavigation />
    </>
  )
}
