import StoreDetail from './_components/StoreDetail'

const StoreDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  if (!id) {
    return <div>스토어 아이디가 없습니다.</div>
  }
  return <StoreDetail storeId={id} />
}

export default StoreDetailPage
