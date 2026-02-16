import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import Input from './Input'

expect.extend(toHaveNoViolations)

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input id="test" name="test" placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Input id="test" name="test" label="Test Label" />)
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('shows required indicator when required', () => {
    render(<Input id="test" name="test" label="Required Field" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('calls onChange when value changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Input id="test" name="test" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello')
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays controlled value', () => {
    render(<Input id="test" name="test" value="Test Value" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('Test Value')
  })

  it('displays error message when error prop is provided', () => {
    render(<Input id="test" name="test" error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('applies error styles when error is present', () => {
    render(<Input id="test" name="test" error="Error" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-500')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('links error message to input via aria-describedby', () => {
    render(<Input id="test-input" name="test" error="Error message" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input id="test" name="test" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('accepts custom className', () => {
    render(<Input id="test" name="test" className="custom-class" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('renders different input types', () => {
    const { rerender } = render(<Input id="test" name="test" type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    rerender(<Input id="test" name="test" type="password" />)
    const passwordInput = document.querySelector('input[type="password"]')
    expect(passwordInput).toBeInTheDocument()

    rerender(<Input id="test" name="test" type="number" />)
    const numberInput = document.querySelector('input[type="number"]')
    expect(numberInput).toBeInTheDocument()
  })

  it('uses ariaLabel when provided', () => {
    render(<Input id="test" name="test" ariaLabel="Custom ARIA label" />)
    expect(screen.getByLabelText('Custom ARIA label')).toBeInTheDocument()
  })

  it('uses label as aria-label when ariaLabel is not provided', () => {
    render(<Input id="test" name="test" label="Field Label" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-label', 'Field Label')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Input id="test" name="test" label="Accessible Input" />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations with error state', async () => {
    const { container } = render(
      <Input id="test" name="test" label="Field" error="Error message" />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('focuses input when label is clicked', async () => {
    const user = userEvent.setup()
    render(<Input id="test" name="test" label="Clickable Label" />)

    await user.click(screen.getByText('Clickable Label'))
    expect(screen.getByRole('textbox')).toHaveFocus()
  })
})
