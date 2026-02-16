import { memo } from 'react'
import type { InputProps } from '@/types'

const Input = memo(({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  ariaLabel,
}: InputProps) => {
  const inputClasses = `
    w-full px-4 py-2 border rounded-lg transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
    ${className}
  `

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        aria-label={ariaLabel || label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
