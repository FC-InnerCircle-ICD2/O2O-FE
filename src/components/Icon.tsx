import arrowDown from '@/assets/icons/arrow-down.svg'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import arrowNarrowDown from '@/assets/icons/arrow-narrow-down.svg'
import arrowNarrowUp from '@/assets/icons/arrow-narrow-up.svg'
import arrowUp from '@/assets/icons/arrow-up.svg'
import clipboard from '@/assets/icons/clipboard.svg'
import close from '@/assets/icons/close.svg'
import dash from '@/assets/icons/dash.svg'
import dotsHorizontal from '@/assets/icons/dots-horizontal.svg'
import heart from '@/assets/icons/heart.svg'
import home from '@/assets/icons/home.svg'
import search from '@/assets/icons/search.svg'
import share from '@/assets/icons/share.svg'
import star from '@/assets/icons/star.svg'
import user from '@/assets/icons/user.svg'
import warning from '@/assets/icons/warning.svg'

import { FC } from 'react'

export const ICONS = {
  heart,
  home,
  search,
  clipboard,
  user,
  arrowLeft,
  warning,
  arrowDown,
  close,
  star,
  dotsHorizontal,
  arrowUp,
  dash,
  share,
  arrowNarrowUp,
  arrowNarrowDown,
}

interface IconProps {
  variant: keyof typeof ICONS
  width?: number
  height?: number
  fill?: string
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

const Icon: FC<IconProps> = ({
  variant,
  width = 24,
  height = 24,
  fill = '#000000',
  className,
  onClick,
}) => {
  const Component = ICONS[variant]

  return (
    <div className={className} style={{ width, height }} onClick={onClick}>
      <Component width="100%" height="100%" color={fill} />
    </div>
  )
}

export default Icon
