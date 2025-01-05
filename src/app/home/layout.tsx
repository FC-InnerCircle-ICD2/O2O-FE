import BottomNavigation from '@/components/BottomNavigation'
import { ReactNode } from 'react'

interface HomeLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  )
}
