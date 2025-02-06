import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed', {
  variants: {
    variant: {
      default: 'bg-primary text-white hover:bg-primary/90 w-full px-4',
      primaryFit: 'w-fit px-4 text-primary border-solid border border-primary',
      grayFit: 'w-fit px-4 text-gray-400 border-solid border border-gray-400',
    },

    size: {
      default: 'rounded-md text-base h-12',
      s: 'rounded text-sm h-10',
      m: 'rounded-md text-base h-14',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
