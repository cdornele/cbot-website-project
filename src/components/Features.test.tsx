import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Features from './Features'

expect.extend(toHaveNoViolations)

describe('Features', () => {
  it('renders section heading', () => {
    render(<Features />)
    expect(
      screen.getByRole('heading', { name: /powerful features for your business/i })
    ).toBeInTheDocument()
  })

  it('renders section description', () => {
    render(<Features />)
    expect(
      screen.getByText(/discover how our ai-powered platform can transform/i)
    ).toBeInTheDocument()
  })

  it('renders all 6 feature cards', () => {
    render(<Features />)
    expect(screen.getByText('Intelligent Automation')).toBeInTheDocument()
    expect(screen.getByText('Data Analytics')).toBeInTheDocument()
    expect(screen.getByText('Natural Language Processing')).toBeInTheDocument()
    expect(screen.getByText('Scalable Infrastructure')).toBeInTheDocument()
    expect(screen.getByText('Security First')).toBeInTheDocument()
    expect(screen.getByText('24/7 Support')).toBeInTheDocument()
  })

  it('renders feature descriptions', () => {
    render(<Features />)
    expect(
      screen.getByText(/automate repetitive tasks with ai-powered workflows/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/gain actionable insights from your data/i)
    ).toBeInTheDocument()
  })

  it('has section id for navigation', () => {
    const { container } = render(<Features />)
    const section = container.querySelector('#features')
    expect(section).toBeInTheDocument()
  })

  it('renders as semantic section element', () => {
    const { container } = render(<Features />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('has background styling', () => {
    const { container } = render(<Features />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-gray-50')
  })

  it('renders feature icons', () => {
    const { container } = render(<Features />)
    const svgs = container.querySelectorAll('svg')
    // Should have at least 6 SVG icons (one per feature)
    expect(svgs.length).toBeGreaterThanOrEqual(6)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Features />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders features in grid layout', () => {
    const { container } = render(<Features />)
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
  })

  it('feature titles are headings', () => {
    render(<Features />)
    const automationHeading = screen.getByText('Intelligent Automation').closest('h3')
    expect(automationHeading).toBeInTheDocument()
  })
})
