import BottomNavigation from '@/components/BottomNavigation'
import MainLayout from '@/components/MainLayout'
import Navigation from '@/components/Navigation'

import { ReactNode } from 'react'

interface OrderLayoutProps {
  children: ReactNode
}

export default function OrderLayout({ children }: OrderLayoutProps) {
  return (
    <>
      <Navigation title="주문내역" />
      <MainLayout>{children}</MainLayout>
      <BottomNavigation />
    </>
  )
}
