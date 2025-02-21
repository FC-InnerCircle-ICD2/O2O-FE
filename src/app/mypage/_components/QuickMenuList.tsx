import Icon from '@/components/Icon'
import RippleeEffect from '@/components/RippleeEffect'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'

const menuItems = [
  {
    icon: <Icon name="Heart" size={20} />,
    label: '찜 목록',
    href: '/favorites',
  },
  {
    icon: <Icon name="ClipboardList" size={20} />,
    label: '주문내역',
    href: '/orders',
  },
  {
    icon: <Icon name="MessageSquareMore" size={20} />,
    label: '리뷰관리',
    href: '/review',
  },
]

const QuickMenuList = () => {
  return (
    <section className="mt-2 flex items-center justify-evenly rounded-md border border-solid border-gray-400">
      {menuItems.map((item, index) => (
        <QuickMenuItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          href={item.href}
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
  href: string
  hasSeparator?: boolean
}

const QuickMenuItem: React.FC<QuickMenuItemProps> = ({
  icon,
  label,
  href,
  hasSeparator = true,
}) => {
  return (
    <>
      <RippleeEffect className="grow">
        <Link href={href} className="flex h-[80px] flex-col items-center justify-center gap-1.5">
          {icon}
          <div className="text-sm text-gray-600">{label}</div>
        </Link>
      </RippleeEffect>
      {hasSeparator && <Separator orientation="vertical" className="h-[54px] w-px bg-gray-400" />}
    </>
  )
}
