import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90 w-full px-4',
        primaryFit: 'w-full px-4 text-primary border-solid border border-primary',
        grayFit: 'w-full px-4 text-gray-800 border-solid border border-gray-400',
      },

      size: {
        default: 'rounded-md text-base h-12',
        s: 'rounded-lg text-sm h-12',
        m: 'rounded-md text-lg font-semibold h-14',
      },

      width: {
        full: 'w-full',
        fit: 'w-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      width: 'full',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, width, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, width, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
