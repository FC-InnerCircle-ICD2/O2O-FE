import Icon from '@/components/Icon'

const NoWritableReview = () => (
  <div className="flex h-full flex-col items-center justify-center gap-6">
    <Icon name="UtensilsCrossed" size="96px" className="text-gray-400" />
    <div className="font-medium text-gray-400">주문 후 리뷰를 작성해주세요!</div>
  </div>
)

export default NoWritableReview
