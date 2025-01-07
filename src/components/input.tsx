import { Input as ShadcnInput } from '@/components/shadcn/input'
import { Label as ShadcnLabel } from '@/components/shadcn/label'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React from 'react'
import type { ClassNameValue } from 'tailwind-merge'

interface CommonInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string
  icon?: React.ReactNode
  onReset?: () => void
  isInvalid?: boolean
  className?: ClassNameValue
}

/**
 * @param label input 상단에 표시되는 라벨
 * @param icon input 왼쪽에 표시되는 아이콘
 * @param onReset input 오른쪽에 표시되는 리셋 버튼의 동작 함수
 * @param isInvalid input 유효하지 않은 상태
 * @param className input 컴포넌트에 적용되는 클래스명
 * @example
 *
  const [email, setEmail] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  return (
    <div className="px-mobile_safe">
      <Input
        type="email"
        label="이메일"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onReset={() => setEmail('')}
        icon={<Mail className="size-5 text-gray-500" />}
        isInvalid={!!emailErrorMessage}
        className="w-1/2"
      />
    </div>
 */

const Input = React.forwardRef<HTMLInputElement, CommonInputProps>(
  ({ label, icon, onReset, isInvalid, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <ShadcnLabel className="mb-1.5 block text-base font-medium">{label}</ShadcnLabel>}
        <div className={cn('relative', className)}>
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
          <ShadcnInput
            ref={ref}
            className={cn(
              'py-6',
              icon && 'pl-10', // 아이콘 공간
              isInvalid && 'border-red-500 focus-visible:ring-red-500',
              props.value && 'pr-8', // x 버튼 공간
            )}
            {...props}
          />
          {props.value && onReset && (
            <button
              type="button"
              onClick={onReset}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-50 p-1 duration-200 hover:bg-gray-100"
            >
              <X className="size-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    )
  },
)

Input.displayName = 'CommonInput'

export default Input
