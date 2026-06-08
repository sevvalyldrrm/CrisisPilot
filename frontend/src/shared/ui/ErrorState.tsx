interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export const ErrorState = ({ message = 'An error occurred', onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <span className="material-symbols-outlined text-error text-4xl">error</span>
      <span className="text-on-surface-variant text-sm">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-primary text-xs font-label-caps hover:underline"
        >
          Retry
        </button>
      )}
    </div>
  )
}
