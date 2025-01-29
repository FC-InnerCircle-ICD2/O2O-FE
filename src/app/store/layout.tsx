import MainLayout from '@/components/MainLayout'

import { ReactNode } from 'react'

interface StoreLayoutProps {
  children: ReactNode
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return <MainLayout>{children}</MainLayout>
}
