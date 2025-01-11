import Icon from '@/components/Icon'
import MainLayout from '@/components/MainLayout'
import Navigation from '@/components/Navigation'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'
import Home from './_components/Home'

const HomePage = () => {
  return (
    <>
      <Navigation
        useAddress
        title="홈"
        rightElement={
          <Link href={ROUTE_PATHS.SEARCH}>
            <Icon name="Search" size={24} />
          </Link>
        }
      />
      <MainLayout>
        <Home />
      </MainLayout>
    </>
  )
}

export default HomePage
