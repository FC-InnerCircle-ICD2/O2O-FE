import BottomNavigation from '@/components/BottomNavigation'
import { ReactNode } from 'react'

interface SearchLayoutProps {
  children: ReactNode
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  )
}
