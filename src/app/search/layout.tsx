import MainLayout from '@/components/MainLayout'
import Navigation from '@/components/Navigation'
import { ReactNode } from 'react'
import SearchInput from './_components/SearchInput'

interface SearchLayoutProps {
  children: ReactNode
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <>
      <Navigation hasBackButton centerElement={<SearchInput />} isSearch={true} />
      <MainLayout>{children}</MainLayout>
    </>
  )
}
