import Icon from './Icon'

interface ErrorProps {
  message: string
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4">
      <Icon name="TriangleAlert" size={48} />
      <p className="max-w-30 whitespace-pre-line text-center">{message}</p>
    </div>
  )
}

export default Error
