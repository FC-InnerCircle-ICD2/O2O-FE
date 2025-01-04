import MainLayout from '@/components/MainLayout'
import Navigation from '@/components/Navigation'
import { ReactNode } from 'react'
import TestSearch from './_components/TestSearch'

interface SearchLayoutProps {
  children: ReactNode
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
      <Navigation centerElement={<TestSearch />} />
      <MainLayout>{children}</MainLayout>
    </>
  )
}
