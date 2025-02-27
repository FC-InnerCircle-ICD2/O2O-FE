'use client'

import AddressOption from './_components/AddressOption'

const Address = (signup) => {
  if (signup.signup !== true) {
    signup = false
  }
  return <AddressOption signup={signup} />
}

export default Address
