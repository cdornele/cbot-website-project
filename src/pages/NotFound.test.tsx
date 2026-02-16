import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import NotFound from './NotFound'

expect.extend(toHaveNoViolations)

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('NotFound', () => {
  it('renders 404 heading', () => {
    renderWithRouter(<NotFound />)
    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument()
  })

  it('renders "Page Not Found" message', () => {
    renderWithRouter(<NotFound />)
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
  })

  it('renders descriptive error message', () => {
    renderWithRouter(<NotFound />)
    expect(
      screen.getByText(/sorry, we couldn't find the page you're looking for/i)
    ).toBeInTheDocument()
  })

  it('renders Header and Footer', () => {
    renderWithRouter(<NotFound />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders "Go to Homepage" button', () => {
    renderWithRouter(<NotFound />)
    expect(screen.getByRole('button', { name: /go to homepage/i })).toBeInTheDocument()
  })

  it('renders "Contact Support" button', () => {
    renderWithRouter(<NotFound />)
    expect(screen.getByRole('button', { name: /contact support/i })).toBeInTheDocument()
  })

  it('Homepage button links to root path', () => {
    renderWithRouter(<NotFound />)
    const button = screen.getByRole('button', { name: /go to homepage/i })
    const link = button.closest('a')
    expect(link).toHaveAttribute('href', '/')
  })

  it('Contact Support button links to contact page', () => {
    renderWithRouter(<NotFound />)
    const button = screen.getByRole('button', { name: /contact support/i })
    const link = button.closest('a')
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('renders sad face icon', () => {
    const { container } = renderWithRouter(<NotFound />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('has centered content layout', () => {
    const { container } = renderWithRouter(<NotFound />)
    const mainContent = container.querySelector('main')
    expect(mainContent).toHaveClass('flex', 'items-center', 'justify-center')
  })

  it('has semantic heading structure', () => {
    renderWithRouter(<NotFound />)
    expect(screen.getByRole('heading', { level: 1, name: /404/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /page not found/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithRouter(<NotFound />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has full height layout', () => {
    const { container } = renderWithRouter(<NotFound />)
    expect(container.querySelector('.min-h-screen')).toBeInTheDocument()
  })

  it('centers content vertically and horizontally', () => {
    const { container } = renderWithRouter(<NotFound />)
    const textCenter = container.querySelector('.text-center')
    expect(textCenter).toBeInTheDocument()
  })
})
