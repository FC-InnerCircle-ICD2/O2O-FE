'use client'

import Icon from '@/components/Icon'

interface UpDownProps {
  value: number
  handlerCount: (count: number) => void
}

const UpDownBtn = ({ value = 0, handlerCount }: UpDownProps) => {
  const onChangeCount = (count: number) => {
    if (count <= 0) {
      return
    }

    handlerCount(count)
  }

  return (
    <div className="flex flex-row items-center h-8 rounded-lg border border-solid border-gray-300 px-2">
      <button className='flex items-center justify-center' onClick={() => onChangeCount(value - 1)}>
        <Icon name="Minus" size={18} color={value <= 1 ? 'gray' : 'black'} />
      </button>
      <div className="flex items-center justify-center mx-2 w-4 text-sm font-bold">{value}</div>
      <button className='flex items-center justify-center' onClick={() => onChangeCount(value + 1)}>
        <Icon name="Plus" size={18} color={value >= 99 ? 'gray' : 'black'} />
      </button>
    </div>
  )
}

export default UpDownBtn
