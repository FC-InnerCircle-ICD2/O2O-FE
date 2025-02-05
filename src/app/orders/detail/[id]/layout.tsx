import MainLayout from '@/components/MainLayout'
import { ReactNode } from 'react'

interface OrderDetailLayoutProps {
  children: ReactNode
}

export default function OrderDetailLayout({ children }: OrderDetailLayoutProps) {
  return <MainLayout>{children}</MainLayout>
}
