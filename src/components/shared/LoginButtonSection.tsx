'use client'

import { Button } from '@/components/button'
import Icon from '@/components/Icon'
import Input from '@/components/input'
import Navigation from '@/components/Navigation'
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

const LoginModal = () => {
  const { hide } = useModal()
  return (
    <div className="h-screen w-screen bg-white p-mobile_safe">
      <Navigation
        title="로그인"
        rightElement={<Icon name="X" size={24} onClick={hide} className="stroke-2" />}
      />
      <div className="mt-6 text-center">
        <div className="mb-6 font-bmjua text-4xl font-bold">개발의 민족</div>
        <div className="mb-8 text-gray-500">로그인하고 다양한 혜택을 받아보세요!</div>
        <div className="mb-8">
          <Input className="mb-3" placeholder="이메일 주소 입력" />
          <Input placeholder="비밀번호 입력" />
        </div>
        <Button className="mb-2">로그인</Button>
        <div className="flex justify-center">
          <button className="text-xs text-gray-500">회원가입</button>
        </div>
      </div>
    </div>
  )
}
