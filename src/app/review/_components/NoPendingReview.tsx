import Icon from '@/components/Icon'

const NoPendingReview = () => (
  <div className="flex h-[calc(100vh-190px)] flex-col items-center justify-center gap-6">
    <Icon name="UtensilsCrossed" size="96px" className="text-gray-400" />
    <div className="font-medium text-gray-400">주문 후 리뷰를 작성해주세요!</div>
  </div>
)

export default NoPendingReview
