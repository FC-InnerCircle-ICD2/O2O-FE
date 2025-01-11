import Icon from '@/components/Icon'

const menuItems = [
  {
    icon: <Icon variant="building" />,
    label: '주소관리',
  },
  {
    icon: <Icon variant="creditCard" />,
    label: '결제수단',
  },
  {
    icon: <Icon variant="speakerphone" />,
    label: '공지사항',
  },
  {
    icon: <Icon variant="doubleChat" />,
    label: '자주 문는 질문',
  },
  {
    icon: <Icon variant="cog" />,
    label: '설정',
  },
]

const MenuList = () => {
  return (
    <section className="mt-12 flex flex-col gap-5">
      {menuItems.map((item, index) => (
        <MenuItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          hasSeparator={index !== menuItems.length - 1}
        />
      ))}
    </section>
  )
}

export default MenuList

interface MenuItemProps {
  icon: React.ReactNode
  label: string
  hasSeparator?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, hasSeparator = true }) => {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="text-lg">{label}</div>
    </div>
  )
}
