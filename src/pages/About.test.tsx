import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import About from './About'

expect.extend(toHaveNoViolations)

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('About', () => {
  it('renders page title', () => {
    renderWithRouter(<About />)
    expect(screen.getByRole('heading', { name: /about cbot/i })).toBeInTheDocument()
  })

  it('renders Header and Footer', () => {
    renderWithRouter(<About />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders mission section', () => {
    renderWithRouter(<About />)
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    expect(
      screen.getByText(/at cbot, we believe that artificial intelligence/i)
    ).toBeInTheDocument()
  })

  it('renders values section', () => {
    renderWithRouter(<About />)
    expect(screen.getByText('Our Values')).toBeInTheDocument()
    expect(screen.getByText('Innovation')).toBeInTheDocument()
    expect(screen.getByText('Integrity')).toBeInTheDocument()
    expect(screen.getByText('Excellence')).toBeInTheDocument()
  })

  it('renders team section', () => {
    renderWithRouter(<About />)
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument()
  })

  it('renders all team members', () => {
    renderWithRouter(<About />)
    expect(screen.getByText('Dr. Alex Thompson')).toBeInTheDocument()
    expect(screen.getByText('Maria Garcia')).toBeInTheDocument()
    expect(screen.getByText('James Kim')).toBeInTheDocument()
  })

  it('renders team member roles', () => {
    renderWithRouter(<About />)
    expect(screen.getByText('Chief AI Scientist')).toBeInTheDocument()
    expect(screen.getByText('VP of Engineering')).toBeInTheDocument()
    expect(screen.getByText('Head of Product')).toBeInTheDocument()
  })

  it('renders team member bios', () => {
    renderWithRouter(<About />)
    expect(screen.getByText(/15\+ years in machine learning/i)).toBeInTheDocument()
    expect(screen.getByText(/former tech lead at major cloud platforms/i)).toBeInTheDocument()
    expect(screen.getByText(/product visionary with track record/i)).toBeInTheDocument()
  })

  it('renders mission icon', () => {
    renderWithRouter(<About />)
    expect(screen.getByText('🎯')).toBeInTheDocument()
  })

  it('has semantic heading structure', () => {
    renderWithRouter(<About />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    const h2Headings = screen.getAllByRole('heading', { level: 2 })
    expect(h2Headings.length).toBeGreaterThan(0)
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithRouter(<About />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has full height layout', () => {
    const { container } = renderWithRouter(<About />)
    expect(container.querySelector('.min-h-screen')).toBeInTheDocument()
  })

  it('renders all sections', () => {
    const { container } = renderWithRouter(<About />)
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(4)
  })
})
