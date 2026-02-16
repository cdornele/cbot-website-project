import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Contact from './Contact'

expect.extend(toHaveNoViolations)

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('Contact', () => {
  it('renders page title', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByRole('heading', { name: /contact us/i, level: 1 })).toBeInTheDocument()
  })

  it('renders Header and Footer', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders contact form', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('renders form section heading', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText('Send us a message')).toBeInTheDocument()
  })

  it('renders contact info section', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
  })

  it('renders email contact info', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    const emailLinks = screen.getAllByRole('link', { name: /contact@cbot.example.com/i })
    expect(emailLinks.length).toBeGreaterThan(0)
  })

  it('renders phone contact info', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText('Phone')).toBeInTheDocument()
    const phoneLinks = screen.getAllByRole('link', { name: /\+1 \(234\) 567-890/i })
    expect(phoneLinks.length).toBeGreaterThan(0)
  })

  it('renders office address', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText('Office')).toBeInTheDocument()
    expect(screen.getByText(/123 AI Street/i)).toBeInTheDocument()
    expect(screen.getByText(/San Francisco, CA 94102/i)).toBeInTheDocument()
  })

  it('renders business hours', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText('Business Hours')).toBeInTheDocument()
    expect(screen.getByText(/Monday - Friday: 9:00 AM - 6:00 PM PST/i)).toBeInTheDocument()
    expect(screen.getByText(/Saturday - Sunday: Closed/i)).toBeInTheDocument()
  })

  it('has two-column layout on large screens', () => {
    const { container } = renderWithRouter(<Contact />)
    const grid = container.querySelector('.grid-cols-1.lg\\:grid-cols-2')
    expect(grid).toBeInTheDocument()
  })

  it('has semantic heading structure', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    const h2Headings = screen.getAllByRole('heading', { level: 2 })
    expect(h2Headings.length).toBeGreaterThanOrEqual(2)
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithRouter(<Contact />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has full height layout', () => {
    const { container } = renderWithRouter(<Contact />)
    expect(container.querySelector('.min-h-screen')).toBeInTheDocument()
  })

  it('renders contact info cards with icons', () => {
    const { container } = renderWithRouter(<Contact />)
    const svgs = container.querySelectorAll('svg')
    // Should have multiple SVG icons for email, phone, location, and hours
    expect(svgs.length).toBeGreaterThan(4)
  })
})
