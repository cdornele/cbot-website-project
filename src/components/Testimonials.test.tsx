import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Testimonials from './Testimonials'

expect.extend(toHaveNoViolations)

describe('Testimonials', () => {
  it('renders section heading', () => {
    render(<Testimonials />)
    expect(
      screen.getByRole('heading', { name: /what our clients say/i })
    ).toBeInTheDocument()
  })

  it('renders section description', () => {
    render(<Testimonials />)
    expect(
      screen.getByText(/join hundreds of satisfied clients/i)
    ).toBeInTheDocument()
  })

  it('renders all 3 testimonials', () => {
    render(<Testimonials />)
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Michael Chen')).toBeInTheDocument()
    expect(screen.getByText('Emily Rodriguez')).toBeInTheDocument()
  })

  it('renders client roles and companies', () => {
    render(<Testimonials />)
    expect(screen.getByText(/CTO, TechVision Inc/i)).toBeInTheDocument()
    expect(screen.getByText(/Head of Operations, Global Logistics Co/i)).toBeInTheDocument()
    expect(screen.getByText(/Marketing Director, BrandBoost Agency/i)).toBeInTheDocument()
  })

  it('renders testimonial content', () => {
    render(<Testimonials />)
    expect(
      screen.getByText(/CBot transformed our customer service operations/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/The predictive analytics provided by CBot/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Implementing CBots NLP solutions revolutionized/i)
    ).toBeInTheDocument()
  })

  it('renders avatar initials', () => {
    render(<Testimonials />)
    expect(screen.getByText('SJ')).toBeInTheDocument()
    expect(screen.getByText('MC')).toBeInTheDocument()
    expect(screen.getByText('ER')).toBeInTheDocument()
  })

  it('renders 5-star ratings for each testimonial', () => {
    render(<Testimonials />)
    // Each testimonial should have 5 stars, so 15 total
    const stars = screen.getAllByLabelText(/star/i)
    expect(stars).toHaveLength(15)
  })

  it('testimonials are in blockquotes', () => {
    const { container } = render(<Testimonials />)
    const blockquotes = container.querySelectorAll('blockquote')
    expect(blockquotes).toHaveLength(3)
  })

  it('has section id for navigation', () => {
    const { container } = render(<Testimonials />)
    const section = container.querySelector('#testimonials')
    expect(section).toBeInTheDocument()
  })

  it('has background styling', () => {
    const { container } = render(<Testimonials />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-gray-50')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Testimonials />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders as semantic section element', () => {
    const { container } = render(<Testimonials />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('client names are headings', () => {
    render(<Testimonials />)
    const sarahHeading = screen.getByText('Sarah Johnson').closest('h4')
    expect(sarahHeading).toBeInTheDocument()
  })

  it('renders in grid layout', () => {
    const { container } = render(<Testimonials />)
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
  })
})
