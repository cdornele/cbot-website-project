import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import ServicesSection from './Services'

expect.extend(toHaveNoViolations)

describe('ServicesSection', () => {
  it('renders section heading', () => {
    render(<ServicesSection />)
    expect(screen.getByRole('heading', { name: /our services/i })).toBeInTheDocument()
  })

  it('renders section description', () => {
    render(<ServicesSection />)
    expect(
      screen.getByText(/comprehensive ai solutions to accelerate/i)
    ).toBeInTheDocument()
  })

  it('renders all 3 service cards', () => {
    render(<ServicesSection />)
    expect(screen.getByText('AI Consulting')).toBeInTheDocument()
    expect(screen.getByText('Custom AI Development')).toBeInTheDocument()
    expect(screen.getByText('AI Integration')).toBeInTheDocument()
  })

  it('renders service descriptions', () => {
    render(<ServicesSection />)
    expect(
      screen.getByText(/expert guidance on implementing ai solutions/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/build bespoke ai models and applications/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/seamlessly integrate ai capabilities/i)
    ).toBeInTheDocument()
  })

  it('renders service icons', () => {
    render(<ServicesSection />)
    expect(screen.getByText('🎯')).toBeInTheDocument()
    expect(screen.getByText('⚙️')).toBeInTheDocument()
    expect(screen.getByText('🔗')).toBeInTheDocument()
  })

  it('renders AI Consulting features', () => {
    render(<ServicesSection />)
    expect(screen.getByText('Strategic AI roadmap planning')).toBeInTheDocument()
    expect(screen.getByText('Technology stack selection')).toBeInTheDocument()
    expect(screen.getByText('ROI analysis and projections')).toBeInTheDocument()
    expect(screen.getByText('Implementation best practices')).toBeInTheDocument()
  })

  it('renders Custom AI Development features', () => {
    render(<ServicesSection />)
    expect(screen.getByText('Machine learning model development')).toBeInTheDocument()
    expect(screen.getByText('Computer vision solutions')).toBeInTheDocument()
    expect(screen.getByText('Natural language processing')).toBeInTheDocument()
    expect(screen.getByText('Predictive analytics systems')).toBeInTheDocument()
  })

  it('renders AI Integration features', () => {
    render(<ServicesSection />)
    expect(screen.getByText('API development and integration')).toBeInTheDocument()
    expect(screen.getByText('Legacy system modernization')).toBeInTheDocument()
    expect(screen.getByText('Data pipeline automation')).toBeInTheDocument()
    expect(screen.getByText('Third-party AI service integration')).toBeInTheDocument()
  })

  it('has section id for navigation', () => {
    const { container } = render(<ServicesSection />)
    const section = container.querySelector('#services')
    expect(section).toBeInTheDocument()
  })

  it('renders checkmark icons for features', () => {
    const { container } = render(<ServicesSection />)
    // Should have checkmark SVGs for all features (12 total: 4 features × 3 services)
    const checkmarks = container.querySelectorAll('svg[fill="currentColor"]')
    expect(checkmarks.length).toBeGreaterThanOrEqual(12)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ServicesSection />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders as semantic section element', () => {
    const { container } = render(<ServicesSection />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('service titles are headings', () => {
    render(<ServicesSection />)
    const consultingHeading = screen.getByText('AI Consulting').closest('h3')
    expect(consultingHeading).toBeInTheDocument()
  })
})
