export interface SignupData {
  signname: string
  password: string
  nickname: string
  username: string
  phone: string
  // address: {
  //   roadAddress: string
  //   jibunAddress: string
  //   detailAddress: string
  //   latitude: number
  //   longitude: number
  // } | null
}

export interface LoginData {
  signname: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn: string
  refreshTokenExpiresIn: string
}


export interface Member {
  id: number
  signname: string
  nickname: string
  profileImage: string
  roadAddress?: string
  jibunAddress?: string
  detailAddress?: string
}
