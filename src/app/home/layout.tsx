import BottomNavigation from '@/components/BottomNavigation'
import MainLayout from '@/components/MainLayout'
import Navigation from '@/components/Navigation'
import { ReactNode } from 'react'

interface HomeLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Navigation useAddress />
      <MainLayout>{children}</MainLayout>
      <BottomNavigation />
    </>
  )
}
