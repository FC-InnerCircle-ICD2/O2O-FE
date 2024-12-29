interface CommonLayoutProps {
  children: React.ReactNode
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  return <div className="h-full flex flex-col overflow-hidden">{children}</div>
}

export default CommonLayout
