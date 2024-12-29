import BottomNavigation from '@/components/BottomNavigation'
import MainLayout from '@/components/MainLayout'
import { ReactNode } from 'react'

interface HomeLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
      <BottomNavigation />
    </>
  )
}
