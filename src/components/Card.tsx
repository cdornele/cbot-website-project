import { memo } from 'react'
import type { CardProps } from '@/types'

const Card = memo(({ children, className = '', title, description }: CardProps) => {
  return (
    <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 mb-4">
          {description}
        </p>
      )}
      <div className="text-gray-700">
        {children}
      </div>
    </article>
  )
})

Card.displayName = 'Card'

export default Card
