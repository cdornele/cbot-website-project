// Common types used across the application

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

export interface InputProps {
  id: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'password' | 'number'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  label?: string
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
}

export interface NavigationItem {
  label: string
  href: string
  ariaLabel?: string
}

export interface TestimonialData {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar?: string
}

export interface ServiceData {
  id: string
  title: string
  description: string
  icon?: string
  features: string[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface FormErrors {
  [key: string]: string
}
