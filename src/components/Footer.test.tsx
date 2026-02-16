import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Footer from './Footer'

expect.extend(toHaveNoViolations)

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('Footer', () => {
  it('renders company name', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText('CBot')).toBeInTheDocument()
  })

  it('renders company description', () => {
    renderWithRouter(<Footer />)
    expect(
      screen.getByText(/Professional AI-powered solutions for modern businesses/i)
    ).toBeInTheDocument()
  })

  it('renders Quick Links section', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
  })

  it('renders all quick links', () => {
    renderWithRouter(<Footer />)
    const homeLinks = screen.getAllByRole('link', { name: /home/i })
    const aboutLinks = screen.getAllByRole('link', { name: /about/i })
    const servicesLinks = screen.getAllByRole('link', { name: /services/i })
    const contactLinks = screen.getAllByRole('link', { name: /contact/i })

    expect(homeLinks.length).toBeGreaterThan(0)
    expect(aboutLinks.length).toBeGreaterThan(0)
    expect(servicesLinks.length).toBeGreaterThan(0)
    expect(contactLinks.length).toBeGreaterThan(0)
  })

  it('renders Contact Us section', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('renders email link', () => {
    renderWithRouter(<Footer />)
    const emailLink = screen.getByRole('link', { name: /contact@cbot.example.com/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@cbot.example.com')
  })

  it('renders phone link', () => {
    renderWithRouter(<Footer />)
    const phoneLink = screen.getByRole('link', { name: /\+1 \(234\) 567-890/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:+1234567890')
  })

  it('renders social media links', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByLabelText('Follow us on Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Follow us on LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Follow us on GitHub')).toBeInTheDocument()
  })

  it('social media links open in new tab', () => {
    renderWithRouter(<Footer />)
    const twitterLink = screen.getByLabelText('Follow us on Twitter')
    const linkedinLink = screen.getByLabelText('Follow us on LinkedIn')
    const githubLink = screen.getByLabelText('Follow us on GitHub')

    expect(twitterLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('social media links have security attributes', () => {
    renderWithRouter(<Footer />)
    const socialLinks = [
      screen.getByLabelText('Follow us on Twitter'),
      screen.getByLabelText('Follow us on LinkedIn'),
      screen.getByLabelText('Follow us on GitHub'),
    ]

    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders current year in copyright', () => {
    renderWithRouter(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} CBot`))).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    renderWithRouter(<Footer />)
    expect(
      screen.getByText(/All rights reserved. Built with React and TypeScript/i)
    ).toBeInTheDocument()
  })

  it('has correct background color', () => {
    const { container } = renderWithRouter(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-gray-900', 'text-white')
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithRouter(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders as semantic footer element', () => {
    const { container } = renderWithRouter(<Footer />)
    expect(container.querySelector('footer')).toBeInstanceOf(HTMLElement)
  })

  it('quick links navigate to correct routes', () => {
    renderWithRouter(<Footer />)
    const quickLinks = screen.getByText('Quick Links').parentElement
    const links = quickLinks?.querySelectorAll('a')

    expect(links?.[0]).toHaveAttribute('href', '/')
    expect(links?.[1]).toHaveAttribute('href', '/about')
    expect(links?.[2]).toHaveAttribute('href', '/services')
    expect(links?.[3]).toHaveAttribute('href', '/contact')
  })
})
