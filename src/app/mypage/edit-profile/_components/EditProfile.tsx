'use client'
import usePostLogout from '@/api/usePostLogout'
import Icon from '@/components/Icon'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const EditProfile = () => {
  const router = useRouter()
  const { mutate: logout } = usePostLogout()
  const accessToken = useLocalStorage('accessToken')

  const handleLogout = () => {
    logout(undefined)
  }


  // 로그인 상태가 아닌 경우 마이페이지로 이동
  useEffect(() => {
    if (accessToken.storedValue === null) {
      router.push('/mypage')
    }
  }, [accessToken, router])

  if (!accessToken.storedValue) return null

  return (
    <div className='px-mobile_safe mt-4  h-[90%] flex flex-col justify-between'>
      <section className='flex flex-col gap-3'>
        <EditProfileItem title="닉네임" value="김개민" />
        <EditProfileItem title="이메일" value="abcd@abc.com" />
      </section>
      <section className='text-center mt-4 text-gray-500'>
        <button onClick={handleLogout}>로그아웃</button>
      </section>
    </div>
  )
}

export default EditProfile

const EditProfileItem = ({ title, value }: { title: string, value: string }) => {
  return (
    <Link href="#" className='flex justify-between items-center border border-gray-300 border-solid rounded-lg p-3'>
      <div className='leading-tight'>
        <div className='text-xs text-gray-400'>{title}</div>
        <div className='text-sm  font-semibold'>{value}</div>
      </div>
      <div>
        <Icon name="ChevronRight" size={24} />
      </div>
    </Link>
  )
}