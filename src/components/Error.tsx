import React from 'react'
import Icon from './Icon'

interface ErrorProps {
  message: string
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="fixed  flex flex-col gap-4 inset-0 items-center justify-center">
      <Icon variant="warning" width={48} height={48} />
      <p className="max-w-30 text-center whitespace-pre-line">{message}</p>
    </div>
  )
}

export default Error
