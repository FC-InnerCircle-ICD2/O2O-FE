import Image from 'next/image'
import LoadingImage from '@/assets/images/loading.gif'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80">
      <Image src={LoadingImage} priority={true} alt="loading" width={60} height={60} />
    </div>
  )
}

export default Loading
