import { memo } from 'react'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const Loader = memo(({ size = 'md', color = 'border-primary-600', className = '' }: LoaderProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-3',
    lg: 'h-16 w-16 border-4',
  }

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-live="polite">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-t-transparent ${color}`}
        aria-label="Loading"
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
})

Loader.displayName = 'Loader'

export default Loader
