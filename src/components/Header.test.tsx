import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Header from './Header'

expect.extend(toHaveNoViolations)

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('Header', () => {
  it('renders without crashing', () => {
    const { container } = renderWithRouter(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('renders Navigation component', () => {
    renderWithRouter(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('has sticky positioning', () => {
    const { container } = renderWithRouter(<Header />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('sticky', 'top-0', 'z-40')
  })

  it('is full width', () => {
    const { container } = renderWithRouter(<Header />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('w-full')
  })

  it('contains CBot logo from Navigation', () => {
    renderWithRouter(<Header />)
    expect(screen.getByText('CBot')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithRouter(<Header />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders as semantic header element', () => {
    const { container } = renderWithRouter(<Header />)
    expect(container.querySelector('header')).toBeInstanceOf(HTMLElement)
  })
})
