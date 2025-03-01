'use client'
import Icon from '@/components/Icon'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const upDownBtnVariants = cva(
  'flex flex-row items-center rounded-lg border border-solid border-gray-300 px-2',
  {
    variants: {
      size: {
        sm: 'h-8',
        md: 'h-12',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
)

interface UpDownProps extends VariantProps<typeof upDownBtnVariants> {
  value: number
  onChange: (value: number) => void
}

const UpDownBtn = ({ value = 0, onChange, size = 'sm' }: UpDownProps) => {
  return (
    <div className={cn(upDownBtnVariants({ size }))}>
      <button className="flex items-center justify-center" onClick={() => onChange(value - 1)}>
        <Icon
          name="Minus"
          size={size === 'sm' ? 18 : 20}
          color={value <= 1 ? '#d3d3d3' : 'black'}
        />
      </button>
      <div
        className={cn(
          'mx-2 flex w-4 items-center justify-center text-sm font-bold',
          size === 'sm' ? 'text-sm' : 'text-base'
        )}
      >
        {value}
      </div>
      <button className="flex items-center justify-center" onClick={() => onChange(value + 1)}>
        <Icon
          name="Plus"
          size={size === 'sm' ? 18 : 20}
          color={value >= 99 ? '#d3d3d3' : 'black'}
        />
      </button>
    </div>
  )
}
export default UpDownBtn
