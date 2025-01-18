import MainLayout from '@/components/MainLayout'

import { ReactNode } from 'react'

interface OrderLayoutProps {
  children: ReactNode
}

export default function OrderLayout({ children }: OrderLayoutProps) {
  return <MainLayout>{children}</MainLayout>
}
