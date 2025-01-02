const MainLayout = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) => {
  return (
    <div
      className="flex-1 overflow-y-auto [&:has(~_.bottom-navigation)]:h-[calc(100dvh-103px)]"
      style={style}
    >
      {children}
    </div>
  )
}

export default MainLayout
