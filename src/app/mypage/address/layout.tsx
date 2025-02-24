import MainLayout from '@/components/MainLayout'
import { ReactNode } from 'react'

interface MypageLayoutProps {
  children: ReactNode
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return <MainLayout>{children}</MainLayout>
}
