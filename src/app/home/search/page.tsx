import Icon from '@/components/Icon'
import MainLayout from '@/components/MainLayout'
import Navigation from '@/components/Navigation'
import { COLORS } from '@/styles/color'
import { ROUTE_PATHS } from '@/utils/routes'
import Link from 'next/link'
import HomeSearch from '../_components/HomeSearch'

const HomeSearchPage = () => {
  return (
    <>
      <Navigation
        hasBackButton
        useAddress
        title="홈"
        rightElement={
          <Link href={ROUTE_PATHS.SEARCH}>
            <Icon variant="search" width={24} height={24} fill={COLORS.black} />
          </Link>
        }
      />
      <MainLayout>
        <HomeSearch />
      </MainLayout>
    </>
  )
}

export default HomeSearchPage
