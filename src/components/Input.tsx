import Icon from '@/components/Icon'
import { Input as ShadcnInput } from '@/components/shadcn/input'
import { Label as ShadcnLabel } from '@/components/shadcn/label'
import { cn } from '@/lib/utils'
import { COLORS } from '@/styles/color'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import type { ClassNameValue } from 'tailwind-merge'

const inputVariants = cva('', {
  variants: {
    inputSize: {
      default: 'h-12 text-base',
      sm: 'h-navigation text-base',
    },
    offOutline: {
      true: 'focus-visible:ring-0 focus-visible:ring-offset-0',
      false: '',
    },
  },
  defaultVariants: {
    inputSize: 'default',
    offOutline: false,
  },
})

const labelVariants = cva('mb-1.5 block font-medium', {
  variants: {
    inputSize: {
      default: 'text-base',
      sm: 'text-base',
    },
  },
  defaultVariants: {
    inputSize: 'default',
  },
})

const resetIconSizes = {
  default: 24,
  sm: 20,
} as const

interface CommonInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>,
    VariantProps<typeof inputVariants> {
  label?: string
  icon?: React.ReactNode
  onReset?: () => void
  isInvalid?: boolean
  className?: ClassNameValue
}

/**
 * @param inputSize input 전반적인 크기를 설정
 * @param offOutline input focus 시 outline 끄기
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
        inputSize="sm"
        offOutline
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
  ({ label, icon, onReset, isInvalid, className, inputSize, offOutline, type, ...props }, ref) => {
    const inputId = React.useId()
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="w-full">
        {label && (
          <ShadcnLabel htmlFor={inputId} className={labelVariants({ inputSize })}>
            {label}
          </ShadcnLabel>
        )}
        <div className={cn('relative', className)}>
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
          <ShadcnInput
            id={inputId}
            ref={ref}
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            className={cn(
              inputVariants({ inputSize, offOutline }),
              icon && 'pl-10', // 아이콘 공간
              isInvalid && 'border-red-500 focus-visible:ring-red-500',
              props.value && type === 'password' && onReset && 'pr-20', // 패스워드 토글과 x 버튼 공간
              props.value && type === 'password' && !onReset && 'pr-14', // 패스워드 토글 공간만
              props.value && type !== 'password' && onReset && 'pr-10' // x 버튼 공간만
            )}
            {...props}
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-0.5">
            {type === 'password' && props.value && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="z-10 mr-2 text-xs font-semibold text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? '가리기' : '보기'}
              </button>
            )}
            {props.value && onReset && (
              <button type="button" onClick={onReset} className="z-10" tabIndex={-1}>
                <Icon
                  name="CircleX"
                  size={resetIconSizes[inputSize ?? 'default']}
                  color={COLORS.white}
                  fill={COLORS.gray400}
                  className="duration-200 hover:brightness-75"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
)

Input.displayName = 'CommonInput'

export default Input
