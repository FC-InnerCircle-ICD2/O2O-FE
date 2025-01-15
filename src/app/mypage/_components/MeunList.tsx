import Icon from '@/components/Icon'
import RippleeEffect from '@/components/RippleeEffect'
import Link from 'next/link'

const menuItems = [
  {
    icon: <Icon name="Building" size={24} />,
    label: '주소관리',
    href: '',
  },
  {
    icon: <Icon name="CreditCard" size={24} />,
    label: '결제수단',
    href: '',
  },
  {
    icon: <Icon name="Megaphone" size={24} />,
    label: '공지사항',
    href: '',
  },
  {
    icon: <Icon name="MessageCircleQuestion" size={24} />,
    label: '자주 문는 질문',
    href: '',
  },
  {
    icon: <Icon name="Cog" size={24} />,
    label: '설정',
    href: '',
  },
]

const MenuList = () => {
  return (
    <section className="mt-8">
      {menuItems.map((item) => (
        <MenuItem key={item.label} icon={item.icon} label={item.label} href={item.href} />
      ))}
    </section>
  )
}

export default MenuList

interface MenuItemProps {
  icon: React.ReactNode
  label: string
  href: string
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, href }) => {
  return (
    <RippleeEffect>
      <Link href={href} className="flex items-center gap-3 px-mobile_safe py-3">
        {icon}
        <div className="text-lg">{label}</div>
      </Link>
    </RippleeEffect>
  )
}