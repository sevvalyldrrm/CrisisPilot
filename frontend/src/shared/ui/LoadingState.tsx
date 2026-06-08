export const LoadingState = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-label-caps text-on-surface-variant text-xs">Loading...</span>
      </div>
    </div>
  )
}
