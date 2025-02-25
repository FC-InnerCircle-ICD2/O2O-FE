'use client'

import AddressOption from './_components/AddressOption'

const Address = (signup) => {
  console.log('signupPP', signup) // todo: 회원가입 아닐 시 singup 변수 못 가져옴
  return <AddressOption signup={signup} />
}

export default Address
