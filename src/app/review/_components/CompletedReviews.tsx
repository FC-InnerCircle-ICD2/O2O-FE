'use client'

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

interface CompletedReview {
  reviewId: number
  storeId: string
  storeName: string
  createTime: string
  menuImage: string
  menuName: string
  totalScore: number
  tasteScore: number
  amountScore: number
  representativeImageUri: string
  clientReviewContent: string
  editDeadline: number
}

const CompletedReviews = () => {
  const { data, isFetching, targetRef, refetch, hasNextPage } = useInfiniteScroll<CompletedReview>({
    queryKey: 'completedReviews',
    endpoint: 'reviews',
    size: 5,
  })

  // console.log({ data })

  return <section>CompletedReviews</section>
}

export default CompletedReviews
