'use client'

import dynamic from 'next/dynamic'
import { ComponentProps, FC } from 'react'

type SVGProps = ComponentProps<'svg'>

const ICONS = {
  heart: () => import('@/assets/icons/heart.svg'),
}

interface IconProps {
  variant: keyof typeof ICONS
  width?: number
  height?: number
  fill?: string
  className?: string
}

const Icon: FC<IconProps> = ({ variant, width = 24, height = 24, fill, className }) => {
  // dynamic import를 컴포넌트 외부로 이동
  const DynamicIcon = dynamic<SVGProps>(() => ICONS[variant](), {
    ssr: true,
    loading: () => <div style={{ width, height }} />,
  })

  return (
    <div className={className} style={{ width, height }}>
      <DynamicIcon width="100%" height="100%" color={fill} />
    </div>
  )
}

export default Icon
