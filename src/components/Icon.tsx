import {
  Bike,
  Building,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleX,
  ClipboardList,
  Cog,
  CreditCard,
  Ellipsis,
  Heart,
  House,
  Link,
  Loader,
  MapPin,
  Megaphone,
  MessageCircleQuestion,
  MessageSquareMore,
  Minus,
  MoveDown,
  MoveUp,
  Plus,
  Search,
  Share2,
  Star,
  Store,
  TriangleAlert,
  User,
  X
} from 'lucide-react'
import { HTMLAttributes } from 'react'

const ICONS = {
  Ellipsis,
  Building,
  CreditCard,
  Megaphone,
  MessageCircleQuestion,
  Cog,
  Heart,
  ClipboardList,
  MessageSquareMore,
  ChevronLeft,
  Search,
  ChevronDown,
  MoveUp,
  MoveDown,
  Minus,
  X,
  TriangleAlert,
  CircleX,
  ChevronUp,
  Check,
  Star,
  House,
  User,
  Share2,
  Loader,
  ChevronRight,
  Store,
  Link,
  Bike,
  MapPin,
  Plus
} as const

export type IconName = keyof typeof ICONS // 아이콘 목록
export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: IconName
  color?: string
  size?: string | number
  strokeWidth?: string | number
  absoluteStrokeWidth?: boolean
  fill?: string
}
const Icon = ({
  name,
  size = '16px',
  color = 'currentColor',
  strokeWidth = '1.75px',
  absoluteStrokeWidth = false,
  className,
  fill = 'none',
  ...props
}: IconProps) => {
  const LucideIcon = ICONS[name]
  if (!LucideIcon) {
    console.warn(`Lucide icon '${name}' does not exist.`)
    return null
  }
  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      fill={fill}
      absoluteStrokeWidth={absoluteStrokeWidth}
      style={{ width: size, height: size }} // !important 없이 인라인 스타일 사용
      className={className}
      {...props}
    />
  )
}

export default Icon