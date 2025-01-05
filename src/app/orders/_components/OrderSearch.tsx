import search from '@/assets/icons/search.svg'

const OrderSearch = () => {
  return (
    <div className="pt-2">
      <input
        className="border-gray-300 border-2 rounded-md w-full p-2"
        type="search"
        placeholder="주문 내역을 검색하세요"
      />
    </div>
  )
}

export default OrderSearch
