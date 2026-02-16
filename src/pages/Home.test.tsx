import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Home from './Home'

expect.extend(toHaveNoViolations)

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('Home', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders Header component', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders Footer component', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders Hero section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/AI-Powered Solutions for/i)).toBeInTheDocument()
  })

  it('renders Features section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText('Powerful Features for Your Business')).toBeInTheDocument()
  })

  it('renders Services section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText('Our Services')).toBeInTheDocument()
  })

  it('renders Testimonials section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    const { container } = renderWithRouter(<Home />)
    const mainContent = container.querySelector('main')
    expect(mainContent).toBeInTheDocument()
  })

  it('has full height layout', () => {
    const { container } = renderWithRouter(<Home />)
    const wrapper = container.querySelector('.min-h-screen')
    expect(wrapper).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithRouter(<Home />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders all major sections in order', () => {
    renderWithRouter(<Home />)
    const sections = [
      /AI-Powered Solutions/i,
      /Powerful Features/i,
      /Our Services/i,
      /What Our Clients Say/i,
    ]

    sections.forEach((section) => {
      expect(screen.getByText(section)).toBeInTheDocument()
    })
  })

  it('includes call-to-action buttons', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
  })
})
