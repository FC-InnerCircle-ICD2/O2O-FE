'use client'

import { Label as ShadcnLabel } from '@/components/shadcn/label'
import { cn } from '@/lib/utils'

interface ChipProps extends React.HTMLAttributes<HTMLLabelElement> {
  text: string
  rightIcon?: React.ReactNode
  onClick?: () => void
}

const Chip = ({ text, className, rightIcon, onClick, ...props }: ChipProps) => {
  return (
    <ShadcnLabel
      className={cn(
        'inline-flex min-w-fit items-center rounded-3xl border border-solid border-gray-300 px-[10px] py-[4px] text-sm font-normal text-gray-600',
        className
      )}
      {...props}
      onClick={onClick}
    >
      <span className={cn('w-full max-w-28 truncate', rightIcon && 'pr-[4px]')}>{text}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </ShadcnLabel>
  )
}

export default Chip
