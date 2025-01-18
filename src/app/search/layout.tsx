import MainLayout from '@/components/MainLayout'

import { ReactNode } from 'react'

interface SearchLayoutProps {
  children: ReactNode
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return <MainLayout>{children}</MainLayout>
}
