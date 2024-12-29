import BottomNavigation from '@/components/BottomNavigation'
import { ReactNode } from 'react'

interface OrderLayoutProps {
  children: ReactNode
}

export default function OrderLayout({ children }: OrderLayoutProps) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  )
}
