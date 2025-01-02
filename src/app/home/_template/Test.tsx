'use client'

import useModal from '@/hooks/useModal'

const Test = () => {
  const { Modal, allHide } = useModal()

  return (
    <div>
      <button
        onClick={() =>
          Modal(
            <div className="w-[100dvw] h-[100dvh] bg-white">
              modal
              <button onClick={() => allHide()}>allHideModal</button>
            </div>,
            true,
          )
        }
      >
        modal
      </button>
    </div>
  )
}

export default Test
