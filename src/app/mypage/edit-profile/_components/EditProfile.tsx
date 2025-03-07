'use client'
import usePostLogout from '@/api/usePostLogout'
import Icon from '@/components/Icon'
import { useToast } from '@/hooks/useToast'
import memberStore from '@/store/user'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const EditProfile = () => {
  const router = useRouter()
  const { mutate: logout, isSuccess } = usePostLogout()
  const { member } = memberStore()
  const qc = useQueryClient()

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    if (isSuccess) {
      qc.removeQueries({ queryKey: ['carts'] })
      router.back()
    }
  }, [isSuccess])

  // 로그인 상태가 아닌 경우 마이페이지로 이동
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (!member && !accessToken) {
      router.back()
    }
  }, [])

  if (!member) return null

  return (
    <div className="mt-4 flex h-[90%] flex-col justify-between px-mobile_safe">
      <section className="flex flex-col gap-3">
        <EditProfileItem title="닉네임" value={member.nickname} />
        <EditProfileItem title="이메일" value={member.signname} />
      </section>
      <section className="mt-4 text-center text-gray-500">
        <button onClick={handleLogout}>로그아웃</button>
      </section>
    </div>
  )
}

export default EditProfile

const EditProfileItem = ({ title, value }: { title: string; value: string }) => {
  const { toast } = useToast()

  const handleEditProfile = () => {
    toast({
      description: '준비중입니다.',
      position: 'center',
    })
  }

  return (
    <div
      className="flex items-center justify-between rounded-lg border border-solid border-gray-300 p-3"
      onClick={handleEditProfile}
    >
      <div className="leading-tight">
        <div className="text-xs text-gray-400">{title}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
      <div>
        <Icon name="ChevronRight" size={24} />
      </div>
    </div>
  )
}
