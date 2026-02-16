import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Loader from './Loader'

expect.extend(toHaveNoViolations)

describe('Loader', () => {
  it('renders with default props', () => {
    render(<Loader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByLabelText('Loading')).toBeInTheDocument()
  })

  it('renders screen reader text', () => {
    render(<Loader />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender, container } = render(<Loader size="sm" />)
    let spinner = container.querySelector('[aria-label="Loading"]')
    expect(spinner).toHaveClass('h-6', 'w-6', 'border-2')

    rerender(<Loader size="md" />)
    spinner = container.querySelector('[aria-label="Loading"]')
    expect(spinner).toHaveClass('h-12', 'w-12', 'border-3')

    rerender(<Loader size="lg" />)
    spinner = container.querySelector('[aria-label="Loading"]')
    expect(spinner).toHaveClass('h-16', 'w-16', 'border-4')
  })

  it('applies custom color', () => {
    const { container } = render(<Loader color="border-blue-500" />)
    const spinner = container.querySelector('[aria-label="Loading"]')
    expect(spinner).toHaveClass('border-blue-500')
  })

  it('applies default color when not specified', () => {
    const { container } = render(<Loader />)
    const spinner = container.querySelector('[aria-label="Loading"]')
    expect(spinner).toHaveClass('border-primary-600')
  })

  it('accepts custom className', () => {
    const { container } = render(<Loader className="my-custom-class" />)
    const wrapper = container.querySelector('[role="status"]')
    expect(wrapper).toHaveClass('my-custom-class')
  })

  it('has spinning animation', () => {
    const { container } = render(<Loader />)
    const spinner = container.querySelector('[aria-label="Loading"]')
    expect(spinner).toHaveClass('animate-spin')
  })

  it('has correct ARIA attributes', () => {
    render(<Loader />)
    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-live', 'polite')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Loader />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('screen reader text is visually hidden but accessible', () => {
    render(<Loader />)
    const srText = screen.getByText('Loading...')
    expect(srText).toHaveClass('sr-only')
  })
})
