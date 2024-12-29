import Icon from '@/components/Icon'
import Welcome from './_templates/Welcome'

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Icon variant="home" width={100} height={100} />
      <Welcome />
    </div>
  )
}
