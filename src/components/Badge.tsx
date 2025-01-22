import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border px-1.5 py-0.5 text-xs w-fit rounded-sm',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/30 text-primary font-medium',
        complete: 'border-transparent bg-gray-400 text-white',
        essential: 'border-transparent bg-secondary/30 text-secondary font-medium',
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
