import Icon from '@/components/Icon'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'

const menuItems = [
  {
    icon: <Icon variant="heart" />,
    label: '찜 목록',
    href: '/favorites',
  },
  {
    icon: <Icon variant="clipboard" />,
    label: '주문내역',
    href: '/orders',
  },
  {
    icon: <Icon variant="chat" />,
    label: '리뷰관리',
    href: '/reviews',
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
      <Link href={href} className="flex flex-col items-center justify-center gap-1.5">
        {icon}
        <div className="text-sm text-gray-600">{label}</div>
      </Link>
      {hasSeparator && <Separator orientation="vertical" className="w-px bg-gray-400" />}
    </>
  )
}
