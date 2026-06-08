import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const variantStyles = {
  primary: 'bg-primary-container text-on-primary-container hover:opacity-90',
  secondary: 'bg-surface-variant text-on-surface hover:bg-surface-variant/80',
  outline: 'border border-outline-variant text-on-surface hover:bg-surface-variant/50',
  ghost: 'text-on-surface-variant hover:bg-surface-variant/50',
}

const sizeStyles = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          rounded font-label-caps font-bold transition-colors
          active:opacity-80 cursor-pointer
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
