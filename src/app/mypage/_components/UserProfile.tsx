import Icon from '@/components/Icon'
import { COLORS } from '@/styles/color'

const UserProfile = () => {
  return (
    <section className="mt-7 flex w-full items-center justify-between">
      <div>
        <div className="text-xl font-bold">김개민</div>
        <div className="mt-1 font-medium leading-6 text-gray-400">abcd@abc.com</div>
      </div>
      <Icon variant="arrowLeft" className="rotate-180" fill={COLORS.gray400} />
    </section>
  )
}

export default UserProfile
