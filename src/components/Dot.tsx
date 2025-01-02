import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

const dotVariants = cva('rounded-full', {
  variants: {
    size: {
      3: 'w-[3px] h-[3px]',
      4: 'w-[4px] h-[4px]',
    },
    color: {
      gray400: 'bg-gray-400',
    },
  },
  defaultVariants: {
    size: 3,
    color: 'gray400',
  },
})

interface DotProps extends VariantProps<typeof dotVariants> {
  className?: string
}

const Dot = ({ size, color, className }: DotProps) => {
  return <div className={dotVariants({ size, color, className })} />
}

export default Dot
