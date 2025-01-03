const MainLayout = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) => {
  return (
    <div className="flex-1 overflow-y-auto" style={style}>
      {children}
    </div>
  )
}

export default MainLayout
