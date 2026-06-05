import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'bordered'
}

const variantStyles = {
  default: 'bg-surface-container-low',
  elevated: 'bg-surface-container-low shadow-lg',
  bordered: 'bg-surface-container-low border border-outline-variant',
}

export const Card = ({ children, className = '', variant = 'bordered' }: CardProps) => {
  return (
    <div className={`${variantStyles[variant]} rounded ${className}`}>
      {children}
    </div>
  )
}
