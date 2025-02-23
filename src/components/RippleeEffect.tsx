'use client'

import { useRef } from 'react'
import { ClassNameValue } from 'tailwind-merge'

/**
 * 클릭 시 물결 효과를 생성하는 래퍼 컴포넌트
 * @param {React.ReactNode} children - 래핑할 자식 컴포넌트
 * @param {ClassNameValue} className - 추가적인 클래스 이름
 */
const RippleeEffect = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: ClassNameValue
}) => {
  // 물결 효과 컨테이너와 물결 요소에 대한 ref 생성
  const rippleContainerRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  const handleRipplee = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    // 클릭한 위치의 좌표 가져오기
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e
    // 컨테이너의 위치와 크기 정보 가져오기
    const { x, y, width, height } = rippleContainerRef.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
    const ripple = rippleRef.current
    // 물결 효과의 반지름 계산 (대각선 길이)
    const radius = Math.sqrt(width ** 2 + height ** 2)

    if (ripple) {
      // 물결 효과의 위치와 크기를 CSS 변수로 설정
      ripple.style.setProperty('--left', `${((clientX - x - radius) / width) * 100}%`)
      ripple.style.setProperty('--top', `${((clientY - y - radius) / height) * 100}%`)
      ripple.style.setProperty('--diameter', `${radius * 2}px`)
      ripple.style.setProperty('--animation', '') // 애니메이션 초기화 (반복 동작을 위해)

      // 애니메이션 적용 (반복 동작을 위해)
      setTimeout(() => {
        ripple.style.setProperty('--animation', 'ripple-effect 0.4s ease-in-out forwards')
      })
    }
  }

  return (
    // 물결 효과를 포함할 컨테이너
    <div
      ref={rippleContainerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseDown={handleRipplee}
      onTouchStart={handleRipplee}
    >
      {children}
      {/* 물결 효과 요소 */}
      <div
        ref={rippleRef}
        className="absolute left-[var(--left)] top-[var(--top)] -z-10 size-[var(--diameter)] animate-[var(--animation)] rounded-full bg-gray-300/50"
      ></div>
    </div>
  )
}

export default RippleeEffect
