import { useEffect } from 'react'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export const Toast = ({ message, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-surface border border-outline-variant rounded-lg shadow-lg px-4 py-3 animate-in slide-in-from-bottom-4">
      <p className="text-sm text-on-surface">{message}</p>
    </div>
  )
}
