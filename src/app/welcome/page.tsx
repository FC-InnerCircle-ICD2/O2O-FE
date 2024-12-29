import Icon from '@/components/Icon'
import MainLayout from '@/components/MainLayout'
import Welcome from './_templates/Welcome'

export default function Home() {
  return (
    <MainLayout>
      <h1>Hello World</h1>
      <Icon variant="home" width={100} height={100} />
      <Welcome />
    </MainLayout>
  )
}
