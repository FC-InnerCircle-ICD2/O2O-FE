import BottomNavigation from '@/components/BottomNavigation'
import MainLayout from '@/components/MainLayout'
import Navigation from '@/components/Navigation'
import { ReactNode } from 'react'

interface FavoritesLayoutProps {
  children: ReactNode
}

export default function FavoritesLayout({ children }: FavoritesLayoutProps) {
  return (
    <>
      <Navigation title="찜" />
      <MainLayout>{children}</MainLayout>
      <BottomNavigation />
    </>
  )
}
