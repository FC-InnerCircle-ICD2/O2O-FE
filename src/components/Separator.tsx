import { cn } from '@/lib/utils'
import { SeparatorProps } from '@radix-ui/react-separator'
import { Separator as ShadcnSeparator } from './shadcn/separator'

type SeparatorType = SeparatorProps & {
  ignoreMobileSafe?: boolean
}

/**
 * @param ignoreMobileSafe - 모바일 안전영역을 무시할지 여부 (horizontal일 때만 동작) (기본값: false)
 * @param orientation - 방향을 설정합니다. "horizontal" | "vertical" | undefined (기본값: "horizontal")
 * @param className - 구분선의 너비(horizontal일 때는 h-[너비], vertical일 때는 w-[너비])와 색상(bg-[색상])를 조정합니다.
 */
const Separator = ({ ignoreMobileSafe = false, ...props }: SeparatorType) => {
  return (
    <ShadcnSeparator
      {...props}
      className={cn(
        ignoreMobileSafe && props.orientation !== 'vertical' && 'ignore-mobile-safe',
        props.className
      )}
    />
  )
}

export default Separator
