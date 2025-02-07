import Icon from '@/components/Icon'
import RippleeEffect from '@/components/RippleeEffect'
import { COLORS } from '@/styles/color'
import Link from 'next/link'

interface UserProfileProps {
  name: string
  email: string
}

const UserProfile = ({ name, email }: UserProfileProps) => {
  return (
    <RippleeEffect className="">
      <Link href="/mypage/edit-profile" className="flex w-full items-center justify-between px-mobile_safe py-4">
        <div>
          <div className="text-xl font-bold">{name}</div>
          <div className="mt-1 font-medium leading-6 text-gray-400">{email}</div>
        </div>
        <Icon name="ChevronLeft" className="rotate-180" color={COLORS.gray400} size={24} />
      </Link>
    </RippleeEffect>
  )
}

export default UserProfile
