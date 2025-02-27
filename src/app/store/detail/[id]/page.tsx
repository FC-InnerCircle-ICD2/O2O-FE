import { notFound } from 'next/navigation'
import StoreDetail from './_components/StoreDetail'

const StoreDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  if (!id) {
    notFound()
  }
  return <StoreDetail storeId={id} />
}

export default StoreDetailPage
