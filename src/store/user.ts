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
        address: member.address || {
          roadAddress: '',
          jibunAddress: '',
          detailAddress: '',
          latitude: 0,
          longitude: 0,
        },
      },
    }),
  resetMember: () => set({ member: null }),
}))

export default memberStore
