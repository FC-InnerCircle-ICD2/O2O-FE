import MainLayout from '@/components/MainLayout'
import Navigation from '@/components/Navigation'
import { ReactNode } from 'react'

interface SearchLayoutProps {
  children: ReactNode
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
      <MainLayout>
        <Navigation hasBackButton title="검색" />
        {children}
      </MainLayout>
    </>
  )
}
