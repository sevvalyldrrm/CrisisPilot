import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'critical' | 'elevated' | 'stable' | 'normal' | 'warning'
  className?: string
}

const variantStyles = {
  critical: 'bg-[#F85149]/10 text-[#F85149] border border-[#F85149]/30',
  elevated: 'bg-primary-container text-on-primary-container border border-primary/30',
  stable: 'bg-[#238636]/10 text-[#238636] border border-[#238636]/30',
  normal: 'bg-surface-variant text-on-surface-variant border border-outline-variant',
  warning: 'bg-[#F85149]/10 text-[#F85149] border border-[#F85149]/30',
}

export const Badge = ({ children, variant = 'normal', className = '' }: BadgeProps) => {
  return (
    <span className={`${variantStyles[variant]} text-[10px] px-1 rounded uppercase font-label-caps ${className}`}>
      {children}
    </span>
  )
}
