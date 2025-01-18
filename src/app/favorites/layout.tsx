import MainLayout from '@/components/MainLayout'
import { ReactNode } from 'react'

interface FavoritesLayoutProps {
  children: ReactNode
}

export default function FavoritesLayout({ children }: FavoritesLayoutProps) {
  return <MainLayout>{children}</MainLayout>
}
