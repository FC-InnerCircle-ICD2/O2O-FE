import Image from 'next/image'
import LoadingImage from '@/assets/images/loading.gif'

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80">
      <Image src={LoadingImage} priority={true} alt="loading" width={100} height={100} />
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  )
}

export default Loading
