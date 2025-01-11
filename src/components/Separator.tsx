import { SeparatorProps } from '@radix-ui/react-separator'
import { Separator as ShadcnSeparator } from './shadcn/separator'

const Separator = ({ ...props }: SeparatorProps) => {
  return <ShadcnSeparator {...props} />
}

export default Separator
