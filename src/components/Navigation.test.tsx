import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Navigation from './Navigation'

expect.extend(toHaveNoViolations)

// Helper to render with router
const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: BrowserRouter })
}

describe('Navigation', () => {
  it('renders logo', () => {
    renderWithRouter(<Navigation />)
    expect(screen.getByText('CBot')).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    renderWithRouter(<Navigation />)
    expect(screen.getAllByText('Home')).toHaveLength(2) // Desktop + Mobile
    expect(screen.getAllByText('About')).toHaveLength(2)
    expect(screen.getAllByText('Services')).toHaveLength(2)
    expect(screen.getAllByText('Contact')).toHaveLength(2)
  })

  it('highlights active navigation item on home page', () => {
    renderWithRouter(<Navigation />, { route: '/' })
    const homeLinks = screen.getAllByRole('link', { name: /navigate to home page/i })
    homeLinks.forEach((link) => {
      expect(link).toHaveAttribute('aria-current', 'page')
    })
  })

  it('highlights active navigation item on about page', () => {
    renderWithRouter(<Navigation />, { route: '/about' })
    const aboutLinks = screen.getAllByRole('link', { name: /navigate to about page/i })
    aboutLinks.forEach((link) => {
      expect(link).toHaveAttribute('aria-current', 'page')
    })
  })

  it('mobile menu is hidden by default', () => {
    renderWithRouter(<Navigation />)
    const mobileButton = screen.getByLabelText('Toggle mobile menu')
    expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Navigation />)

    const mobileButton = screen.getByLabelText('Toggle mobile menu')
    expect(mobileButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(mobileButton)
    expect(mobileButton).toHaveAttribute('aria-expanded', 'true')

    await user.click(mobileButton)
    expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Navigation />)

    const mobileButton = screen.getByLabelText('Toggle mobile menu')
    await user.click(mobileButton)
    expect(mobileButton).toHaveAttribute('aria-expanded', 'true')

    // Get all About links and click the mobile one (last one)
    const aboutLinks = screen.getAllByRole('link', { name: /navigate to about page/i })
    const mobileAboutLink = aboutLinks[aboutLinks.length - 1]
    await user.click(mobileAboutLink)

    expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('has correct ARIA labels', () => {
    renderWithRouter(<Navigation />)
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
    expect(screen.getByLabelText('CBot home')).toBeInTheDocument()
    expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument()
  })

  it('logo links to home page', () => {
    renderWithRouter(<Navigation />)
    const logo = screen.getByLabelText('CBot home')
    expect(logo).toHaveAttribute('href', '/')
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithRouter(<Navigation />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations with mobile menu open', async () => {
    const user = userEvent.setup()
    const { container } = renderWithRouter(<Navigation />)

    const mobileButton = screen.getByLabelText('Toggle mobile menu')
    await user.click(mobileButton)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('mobile menu icon changes when menu is open', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Navigation />)

    const mobileButton = screen.getByLabelText('Toggle mobile menu')
    const getPath = () => mobileButton.querySelector('path')?.getAttribute('d')

    const closedPath = getPath()
    await user.click(mobileButton)
    const openPath = getPath()

    expect(closedPath).not.toBe(openPath)
  })

  it('desktop navigation is hidden on mobile', () => {
    const { container } = renderWithRouter(<Navigation />)
    const desktopNav = container.querySelector('.hidden.md\\:flex')
    expect(desktopNav).toBeInTheDocument()
  })

  it('mobile menu button is hidden on desktop', () => {
    const { container } = renderWithRouter(<Navigation />)
    const mobileButton = screen.getByLabelText('Toggle mobile menu')
    expect(mobileButton).toHaveClass('md:hidden')
  })
})
