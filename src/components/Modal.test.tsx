import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import Modal from './Modal'

expect.extend(toHaveNoViolations)

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Modal content
      </Modal>
    )
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        Modal content
      </Modal>
    )
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Modal Title">
        Content
      </Modal>
    )
    expect(screen.getByRole('heading', { name: /modal title/i })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test">
        Content
      </Modal>
    )

    await user.click(screen.getByLabelText('Close modal'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Content
      </Modal>
    )

    const backdrop = screen.getByRole('dialog').parentElement
    if (backdrop) {
      await user.click(backdrop)
      expect(handleClose).toHaveBeenCalled()
    }
  })

  it('does not close when modal content is clicked', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal content</div>
      </Modal>
    )

    await user.click(screen.getByText('Modal content'))
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('closes on Escape key press', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Content
      </Modal>
    )

    await user.keyboard('{Escape}')
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not close on Escape when modal is not open', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(
      <Modal isOpen={true} onClose={handleClose}>
        Content
      </Modal>
    )

    rerender(
      <Modal isOpen={false} onClose={handleClose}>
        Content
      </Modal>
    )

    await user.keyboard('{Escape}')
    // Should only be called once during initial render interaction, not after rerender
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('has correct ARIA attributes', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
        Content
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')
  })

  it('does not have aria-labelledby when no title is provided', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).not.toHaveAttribute('aria-labelledby')
  })

  it('accepts custom className', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()} className="custom-modal">
        Content
      </Modal>
    )
    const modalContent = container.querySelector('.custom-modal')
    expect(modalContent).toBeInTheDocument()
  })

  it('prevents body scroll when open', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Content
      </Modal>
    )
    expect(document.body.style.overflow).toBe('hidden')

    rerender(
      <Modal isOpen={false} onClose={vi.fn()}>
        Content
      </Modal>
    )
    expect(document.body.style.overflow).toBe('unset')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()} title="Accessible Modal">
        <p>This is modal content</p>
      </Modal>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders complex children correctly', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div data-testid="complex-content">
          <h3>Heading</h3>
          <p>Paragraph</p>
          <button>Action</button>
        </div>
      </Modal>
    )
    expect(screen.getByTestId('complex-content')).toBeInTheDocument()
    expect(screen.getByText('Heading')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
  })
})
