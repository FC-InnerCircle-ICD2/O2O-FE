import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border px-[4px] py-[3px] text-[11px] leading-[11px] w-fit rounded-sm',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/20 text-primary font-medium border border-primary/30 border-solid',
        complete: 'border-transparent bg-gray-400 text-white',
        essential: 'border-transparent bg-secondary/20 text-secondary font-medium border border-secondary/30 border-solid',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export default Badge
