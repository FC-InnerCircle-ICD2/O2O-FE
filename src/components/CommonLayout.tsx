interface CommonLayoutProps {
  children: React.ReactNode
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <div className="px-4 [&:has(.top-navigation)]:mt-[40px] pt-3 [&:has(.botton-navigation)]:h-[calc(100%-104px)] h-full overflow-y-auto bg-red-500">
      {children}
    </div>
  )
}

export default CommonLayout
