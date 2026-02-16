import { memo, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { useForm } from '@/hooks/useForm'
import type { ContactFormData } from '@/types'

const ContactForm = memo(() => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleFormSubmit = async (formValues: ContactFormData) => {
    try {
      /* Simulate API call - replace with actual API endpoint */
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log('Form submitted:', formValues)
      setSubmitStatus('success')

      /* Reset success message after 5 seconds */
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Submission failed:', error)
      setSubmitStatus('error')

      /* Reset error message after 5 seconds */
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(handleFormSubmit)

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto" noValidate>
      <div className="space-y-4">
        <Input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          label="Name"
          placeholder="John Doe"
          error={errors.name}
          required
          ariaLabel="Enter your full name"
        />

        <Input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          label="Email"
          placeholder="john.doe@example.com"
          error={errors.email}
          required
          ariaLabel="Enter your email address"
        />

        <Input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          label="Subject"
          placeholder="How can we help you?"
          error={errors.subject}
          required
          ariaLabel="Enter message subject"
        />

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            rows={6}
            placeholder="Tell us about your project..."
            required
            className={`
              w-full px-4 py-2 border rounded-lg transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
            `}
            aria-label="Enter your message"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {submitStatus === 'success' && (
          <div
            className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg"
            role="alert"
          >
            <p className="font-semibold">Success!</p>
            <p className="text-sm">Your message has been sent. We'll get back to you soon.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div
            className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg"
            role="alert"
          >
            <p className="font-semibold">Error!</p>
            <p className="text-sm">Failed to send message. Please try again later.</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
          ariaLabel="Submit contact form"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  )
})

ContactForm.displayName = 'ContactForm'

export default ContactForm
