'use client'

import { Button } from '@/components/button'
import LoginModal from '@/components/shared/LoginModal'
import useModal from '@/hooks/useModal'

const LoginButtonSection = () => {
  const { Modal } = useModal()

  const handleOpenLoginModal = () => {
    Modal(<LoginModal />, true)
  }
  return (
    <section className="rounded-xl border border-solid border-gray-400 p-4 text-center">
      <div className="mb-1 text-lg font-bold">개발의 민족에 오신 것을 환영합니다.</div>
      <div className="mb-4 whitespace-pre-line text-sm text-gray-500">
        {`로그인 후 매일 맛있는 음식을 즐겨보세요.\n 지금 가입하고 행복에 가까워지세요!`}
      </div>
      <Button className="inline-flex w-fit gap-0.5" onClick={handleOpenLoginModal}>
        <span>로그인</span>
        <span>/</span>
        <span>회원가입</span>
      </Button>
    </section>
  )
}

export default LoginButtonSection
