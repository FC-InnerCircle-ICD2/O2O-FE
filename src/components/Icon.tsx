import arrowDown from '@/assets/icons/arrow-down.svg'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import clipboard from '@/assets/icons/clipboard.svg'
import close from '@/assets/icons/close.svg'
import heart from '@/assets/icons/heart.svg'
import home from '@/assets/icons/home.svg'
import search from '@/assets/icons/search.svg'
import user from '@/assets/icons/user.svg'
import { FC } from 'react'

export const ICONS = {
  heart,
  home,
  search,
  clipboard,
  user,
  arrowLeft,
  arrowDown,
  close,
}

interface IconProps {
  variant: keyof typeof ICONS
  width?: number
  height?: number
  fill?: string
  className?: string
}

const Icon: FC<IconProps> = ({ variant, width = 24, height = 24, fill = '#000000', className }) => {
  const Component = ICONS[variant]

  return (
    <div className={className} style={{ width, height }}>
      <Component width="100%" height="100%" color={fill} />
    </div>
  )
}

export default Icon
