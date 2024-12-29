import BottomNavigation from '@/components/BottomNavigation'
import { ReactNode } from 'react'

interface FavoritesLayoutProps {
  children: ReactNode
}

export default function FavoritesLayout({ children }: FavoritesLayoutProps) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  )
}
