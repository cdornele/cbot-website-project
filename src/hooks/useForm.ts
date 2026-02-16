import { useState, ChangeEvent, FormEvent } from 'react'
import type { ContactFormData, FormErrors } from '@/types'

interface UseFormReturn {
  values: ContactFormData
  errors: FormErrors
  isSubmitting: boolean
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  resetForm: () => void
}

const initialValues: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validate = (values: ContactFormData): FormErrors => {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!values.subject.trim()) {
    errors.subject = 'Subject is required'
  } else if (values.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters'
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return errors
}

export const useForm = (
  onSubmit: (values: ContactFormData) => Promise<void>
): UseFormReturn => {
  const [values, setValues] = useState<ContactFormData>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    /* Clear error for this field when user starts typing */
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)
      try {
        await onSubmit(values)
        resetForm()
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  }
}
