'use client'
import Icon from '@/components/Icon'
interface UpDownProps {
  value: number
  onChange: (value: number) => void
}

const UpDownBtn = ({ value = 0, onChange }: UpDownProps) => {


  return (
    <div className="flex h-8 flex-row items-center rounded-lg border border-solid border-gray-300 px-2">
      <button className="flex items-center justify-center" onClick={() => onChange(value - 1)}>
        <Icon name="Minus" size={18} color={value <= 1 ? '#d3d3d3' : 'black'} />
      </button>
      <div className="mx-2 flex w-4 items-center justify-center text-sm font-bold">{value}</div>
      <button className="flex items-center justify-center" onClick={() => onChange(value + 1)}>
        <Icon name="Plus" size={18} color={value >= 99 ? '#d3d3d3' : 'black'} />
      </button>
    </div>
  )
}
export default UpDownBtn
