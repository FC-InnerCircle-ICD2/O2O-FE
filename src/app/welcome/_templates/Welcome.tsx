'use client'

import { useRouter } from 'next/navigation'

const Welcome = () => {
  const router = useRouter()
  return (
    <div>
      <button onClick={() => router.push('/home')}>home 이동</button>
    </div>
  )
}

export default Welcome
