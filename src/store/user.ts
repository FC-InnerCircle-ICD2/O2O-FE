import { Member } from '@/models/auth'
import { create } from 'zustand'

interface UserStore {
  member: Member | undefined | null
  setMember: (member: Member) => void
  resetMember: () => void
}

const memberStore = create<UserStore>((set) => ({
  member: null,
  setMember: (member: Member) =>
    set({
      member: {
        ...member,
        roadAddress: '서울특별시 강남구 테헤란로 123',
        jibunAddress: '서울특별시 강남구 역삼동 123-45',
        detailAddress: '101호',
      },
    }),
  resetMember: () => set({ member: null }),
}))

export default memberStore
