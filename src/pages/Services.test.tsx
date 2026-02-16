import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Services from './Services'

expect.extend(toHaveNoViolations)

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('Services', () => {
  it('renders page title', () => {
    renderWithRouter(<Services />)
    expect(screen.getByRole('heading', { name: /our services/i, level: 1 })).toBeInTheDocument()
  })

  it('renders Header and Footer', () => {
    renderWithRouter(<Services />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders main services section', () => {
    renderWithRouter(<Services />)
    expect(screen.getByText('AI Consulting')).toBeInTheDocument()
    expect(screen.getByText('Custom AI Development')).toBeInTheDocument()
    expect(screen.getByText('AI Integration')).toBeInTheDocument()
  })

  it('renders additional services section', () => {
    renderWithRouter(<Services />)
    expect(screen.getByText('Additional Services')).toBeInTheDocument()
    expect(screen.getByText('AI Training & Workshops')).toBeInTheDocument()
    expect(screen.getByText('AI Maintenance & Support')).toBeInTheDocument()
    expect(screen.getByText('Data Strategy Consulting')).toBeInTheDocument()
  })

  it('renders process section', () => {
    renderWithRouter(<Services />)
    expect(screen.getByText('Our Process')).toBeInTheDocument()
    expect(screen.getByText('Discovery')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Develop')).toBeInTheDocument()
    expect(screen.getByText('Deploy')).toBeInTheDocument()
  })

  it('renders process step numbers', () => {
    renderWithRouter(<Services />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('renders CTA section', () => {
    renderWithRouter(<Services />)
    expect(screen.getByText('Ready to Transform Your Business?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('CTA button links to contact page', () => {
    renderWithRouter(<Services />)
    const button = screen.getByRole('button', { name: /get in touch/i })
    const link = button.closest('a')
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('renders service descriptions', () => {
    renderWithRouter(<Services />)
    expect(
      screen.getByText(/upskill your team with hands-on ai training/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/24\/7 monitoring, maintenance, and optimization/i)
    ).toBeInTheDocument()
  })

  it('has semantic heading structure', () => {
    renderWithRouter(<Services />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    const h2Headings = screen.getAllByRole('heading', { level: 2 })
    expect(h2Headings.length).toBeGreaterThan(0)
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithRouter(<Services />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has full height layout', () => {
    const { container } = renderWithRouter(<Services />)
    expect(container.querySelector('.min-h-screen')).toBeInTheDocument()
  })

  it('includes ServicesSection component', () => {
    renderWithRouter(<Services />)
    // ServicesSection includes service icons
    expect(screen.getByText('🎯')).toBeInTheDocument()
    expect(screen.getByText('⚙️')).toBeInTheDocument()
    expect(screen.getByText('🔗')).toBeInTheDocument()
  })
})
