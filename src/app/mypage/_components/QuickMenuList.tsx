import Icon from '@/components/Icon'
import { Separator } from '@radix-ui/react-separator'

const menuItems = [
  {
    icon: <Icon variant="heart" />,
    label: '찜 목록',
  },
  {
    icon: <Icon variant="clipboard" />,
    label: '주문내역',
  },
  {
    icon: <Icon variant="chat" />,
    label: '리뷰관리',
  },
]

const QuickMenuList = () => {
  return (
    <section className="mt-6 flex h-[80px] justify-evenly rounded-md border border-solid border-gray-400 py-4">
      {menuItems.map((item, index) => (
        <QuickMenuItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          hasSeparator={index !== menuItems.length - 1}
        />
      ))}
    </section>
  )
}

export default QuickMenuList

interface QuickMenuItemProps {
  icon: React.ReactNode
  label: string
  hasSeparator?: boolean
}

const QuickMenuItem: React.FC<QuickMenuItemProps> = ({ icon, label, hasSeparator = true }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1.5">
        {icon}
        <div className="text-sm text-gray-600">{label}</div>
      </div>
      {hasSeparator && <Separator orientation="vertical" className="w-px bg-gray-400" />}
    </>
  )
}
