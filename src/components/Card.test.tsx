import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Card from './Card'

expect.extend(toHaveNoViolations)

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Card title="Card Title">Content</Card>)
    expect(screen.getByRole('heading', { name: /card title/i })).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<Card description="Card description">Content</Card>)
    expect(screen.getByText('Card description')).toBeInTheDocument()
  })

  it('renders title, description, and children together', () => {
    render(
      <Card title="Test Title" description="Test Description">
        Test Content
      </Card>
    )
    expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('does not render title when not provided', () => {
    render(<Card>Content only</Card>)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(<Card title="Title">Content</Card>)
    const description = screen.queryByText(/description/i)
    expect(description).not.toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const article = container.querySelector('article')
    expect(article).toHaveClass('custom-class')
  })

  it('applies base styles', () => {
    const { container } = render(<Card>Content</Card>)
    const article = container.querySelector('article')
    expect(article).toHaveClass('bg-white', 'rounded-lg', 'shadow-md', 'p-6')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Card title="Accessible Card" description="Description">
        Content
      </Card>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders as article element for semantic HTML', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.querySelector('article')).toBeInTheDocument()
  })

  it('renders complex children correctly', () => {
    render(
      <Card title="Complex Card">
        <div data-testid="complex-child">
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>
      </Card>
    )
    expect(screen.getByTestId('complex-child')).toBeInTheDocument()
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument()
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument()
  })
})
