import MainLayout from '@/components/MainLayout'
import Navigation from '@/components/Navigation'
import Home from './_components/Home'

const HomePage = () => {
  return (
    <>
      <Navigation useAddress title="홈" />
      <MainLayout>
        <Home />
      </MainLayout>
    </>
  )
}

export default HomePage
