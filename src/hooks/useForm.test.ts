import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useForm } from './useForm'

describe('useForm', () => {
  it('initializes with empty values', () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    expect(result.current.values).toEqual({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
    expect(result.current.errors).toEqual({})
    expect(result.current.isSubmitting).toBe(false)
  })

  it('handles input change', () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.values.name).toBe('John Doe')
  })

  it('handles textarea change', () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    act(() => {
      result.current.handleChange({
        target: { name: 'message', value: 'Test message' },
      } as React.ChangeEvent<HTMLTextAreaElement>)
    })

    expect(result.current.values.message).toBe('Test message')
  })

  it('validates required name field', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.errors.name).toBe('Name is required')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('validates name minimum length', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'A' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.errors.name).toBe('Name must be at least 2 characters')
  })

  it('validates required email field', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.errors.email).toBe('Email is required')
  })

  it('validates email format', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'invalid-email' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.errors.email).toBe('Please enter a valid email address')
  })

  it('validates subject minimum length', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    act(() => {
      result.current.handleChange({
        target: { name: 'subject', value: 'AB' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.errors.subject).toBe('Subject must be at least 3 characters')
  })

  it('validates message minimum length', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    act(() => {
      result.current.handleChange({
        target: { name: 'message', value: 'Short' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.errors.message).toBe('Message must be at least 10 characters')
  })

  it('clears error when typing in field with error', () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    // First, create an error
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: '' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.errors.name).toBeTruthy()

    // Now type in the field
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.errors.name).toBe('')
  })

  it('submits form with valid data', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useForm(onSubmit))

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'email', value: 'john@example.com' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'subject', value: 'Test Subject' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'message', value: 'This is a valid test message.' },
      } as React.ChangeEvent<HTMLTextAreaElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a valid test message.',
      })
    })
  })

  it('sets isSubmitting to true during submission', async () => {
    const onSubmit = vi.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    )
    const { result } = renderHook(() => useForm(onSubmit))

    // Fill form with valid data
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'email', value: 'john@example.com' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'subject', value: 'Test' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'message', value: 'Test message content' },
      } as React.ChangeEvent<HTMLTextAreaElement>)
    })

    const submitPromise = act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    // During submission
    await waitFor(() => {
      expect(result.current.isSubmitting).toBe(true)
    })

    await submitPromise

    // After submission
    expect(result.current.isSubmitting).toBe(false)
  })

  it('resets form after successful submission', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useForm(onSubmit))

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'email', value: 'john@example.com' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'subject', value: 'Test' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'message', value: 'Test message' },
      } as React.ChangeEvent<HTMLTextAreaElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    await waitFor(() => {
      expect(result.current.values).toEqual({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      expect(result.current.errors).toEqual({})
      expect(result.current.isSubmitting).toBe(false)
    })
  })

  it('handles submission errors', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const onSubmit = vi.fn().mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useForm(onSubmit))

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'email', value: 'john@example.com' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'subject', value: 'Test' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'message', value: 'Test message' },
      } as React.ChangeEvent<HTMLTextAreaElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    await waitFor(() => {
      expect(result.current.isSubmitting).toBe(false)
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    consoleErrorSpy.mockRestore()
  })

  it('resetForm clears all values and errors', () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => useForm(onSubmit))

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    act(() => {
      result.current.resetForm()
    })

    expect(result.current.values).toEqual({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
    expect(result.current.errors).toEqual({})
    expect(result.current.isSubmitting).toBe(false)
  })
})
