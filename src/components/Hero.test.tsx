import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Hero from './Hero'

expect.extend(toHaveNoViolations)

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('Hero', () => {
  it('renders main heading', () => {
    renderWithRouter(<Hero />)
    expect(screen.getByText(/AI-Powered Solutions for/i)).toBeInTheDocument()
    expect(screen.getByText(/Modern Businesses/i)).toBeInTheDocument()
  })

  it('renders descriptive text', () => {
    renderWithRouter(<Hero />)
    expect(
      screen.getByText(/Transform your workflow with intelligent automation/i)
    ).toBeInTheDocument()
  })

  it('renders Get Started button', () => {
    renderWithRouter(<Hero />)
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
  })

  it('renders Learn More button', () => {
    renderWithRouter(<Hero />)
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
  })

  it('Get Started button links to contact page', () => {
    renderWithRouter(<Hero />)
    const getStartedLink = screen.getByRole('button', { name: /get started/i }).closest('a')
    expect(getStartedLink).toHaveAttribute('href', '/contact')
  })

  it('Learn More button links to services page', () => {
    renderWithRouter(<Hero />)
    const learnMoreLink = screen.getByRole('button', { name: /learn more/i }).closest('a')
    expect(learnMoreLink).toHaveAttribute('href', '/services')
  })

  it('renders hero image placeholder', () => {
    renderWithRouter(<Hero />)
    expect(screen.getByText('AI Dashboard Preview')).toBeInTheDocument()
  })

  it('has gradient background', () => {
    const { container } = renderWithRouter(<Hero />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-gradient-to-br', 'from-primary-50', 'to-white')
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithRouter(<Hero />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders as semantic section element', () => {
    const { container } = renderWithRouter(<Hero />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('renders heading as h1', () => {
    renderWithRouter(<Hero />)
    const heading = screen.getByText(/AI-Powered Solutions for/i).closest('h1')
    expect(heading).toBeInTheDocument()
  })
})
