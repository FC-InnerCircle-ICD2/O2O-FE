import MainLayout from '@/components/MainLayout'
import { ReactNode } from 'react'

interface PayLayoutProps {
  children: ReactNode
}

export default function PayLayout({ children }: PayLayoutProps) {
  return <MainLayout>{children}</MainLayout>
}
