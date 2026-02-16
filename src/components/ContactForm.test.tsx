import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import ContactForm from './ContactForm'

expect.extend(toHaveNoViolations)

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^message/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('all fields are required', () => {
    render(<ContactForm />)
    const nameInput = screen.getByLabelText(/^name/i)
    const emailInput = screen.getByLabelText(/^email/i)
    const subjectInput = screen.getByLabelText(/^subject/i)
    const messageInput = screen.getByLabelText(/^message/i)

    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(subjectInput).toBeRequired()
    expect(messageInput).toBeRequired()
  })

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Subject is required')).toBeInTheDocument()
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('validates name minimum length', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/name/i)
    await user.type(nameInput, 'A')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    })
  })

  it('validates subject minimum length', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const subjectInput = screen.getByLabelText(/subject/i)
    await user.type(subjectInput, 'AB')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Subject must be at least 3 characters')).toBeInTheDocument()
    })
  })

  it('validates message minimum length', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const messageInput = screen.getByLabelText(/message/i)
    await user.type(messageInput, 'Short')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument()
    })
  })

  it('clears error when user starts typing', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })

    const nameInput = screen.getByLabelText(/name/i)
    await user.type(nameInput, 'John')

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with enough characters.')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument()
    })

    await waitFor(
      () => {
        expect(screen.getByText(/your message has been sent/i)).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters.',
    })

    consoleSpy.mockRestore()
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message.')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      const sendingButton = screen.getByRole('button', { name: /sending/i })
      expect(sendingButton).toBeDisabled()
    })
  })

  it('has correct ARIA attributes on message textarea', () => {
    render(<ContactForm />)
    const messageInput = screen.getByLabelText(/message/i)
    expect(messageInput).toHaveAttribute('aria-label', 'Enter your message')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ContactForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders as semantic form element', () => {
    const { container } = render(<ContactForm />)
    expect(container.querySelector('form')).toBeInTheDocument()
  })

  it('form has noValidate attribute', () => {
    const { container } = render(<ContactForm />)
    const form = container.querySelector('form')
    expect(form).toHaveAttribute('noValidate')
  })
})
