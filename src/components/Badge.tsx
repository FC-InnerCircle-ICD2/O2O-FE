import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center border px-[4px] py-[3px] text-[11px] leading-[11px] size-fit rounded-sm [-webkit-tap-highlight-color:transparent] [-webkit-text-decoration:none]',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary font-medium border border-primary/20 border-solid',
        complete: 'border-transparent bg-gray-400 text-white',
        essential:
          'bg-secondary/10 text-secondary font-medium border border-secondary/20 border-solid',
        waiting: 'bg-gray-100 text-gray-600 font-medium border border-gray-200 border-solid',
        received: 'bg-blue-100 text-blue-600 font-medium border border-blue-200 border-solid',
        accepted: 'bg-indigo-100 text-indigo-600 font-medium border border-indigo-200 border-solid',
        rejected: 'bg-red-100 text-red-600 font-medium border border-red-200 border-solid',
        completed: 'bg-green-100 text-green-600 font-medium border border-green-200 border-solid',
        canceled: 'bg-gray-100 text-gray-500 font-medium border border-gray-200 border-solid',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
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
