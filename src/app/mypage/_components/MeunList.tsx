import Icon from '@/components/Icon'
import Link from 'next/link'

const menuItems = [
  {
    icon: <Icon variant="building" />,
    label: '주소관리',
    href: '',
  },
  {
    icon: <Icon variant="creditCard" />,
    label: '결제수단',
    href: '',
  },
  {
    icon: <Icon variant="speakerphone" />,
    label: '공지사항',
    href: '',
  },
  {
    icon: <Icon variant="doubleChat" />,
    label: '자주 문는 질문',
    href: '',
  },
  {
    icon: <Icon variant="cog" />,
    label: '설정',
    href: '',
  },
]

const MenuList = () => {
  return (
    <section className="mt-12 flex flex-col gap-5">
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
    <Link href={href} className="flex items-center gap-3">
      {icon}
      <div className="text-lg">{label}</div>
    </Link>
  )
}
