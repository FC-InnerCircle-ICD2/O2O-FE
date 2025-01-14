import Icon from '@/components/Icon'
import RippleeEffect from '@/components/RippleeEffect'
import { COLORS } from '@/styles/color'

const UserProfile = () => {
  return (
    <RippleeEffect className="mt-4">
      <section className="flex w-full items-center justify-between px-mobile_safe py-4">
        <div>
          <div className="text-xl font-bold">김개민</div>
          <div className="mt-1 font-medium leading-6 text-gray-400">abcd@abc.com</div>
        </div>
        <Icon name="ChevronLeft" className="rotate-180" color={COLORS.gray400} size={24} />
      </section>
    </RippleeEffect>
  )
}

export default UserProfile
