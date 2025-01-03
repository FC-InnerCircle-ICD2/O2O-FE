'use client'

import { Label as ShadcnLabel } from '@/components/ui/label'
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
        'inline-flex items-center gap-[2px] text-sm font-normal text-gray-600 border border-solid border-gray-300 rounded-[16px] px-[10px] py-[4px]',
        className,
      )}
      {...props}
      onClick={onClick}
    >
      {text}
      {rightIcon && <>{rightIcon}</>}
    </ShadcnLabel>
  )
}

export default Chip
