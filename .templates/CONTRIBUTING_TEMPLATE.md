# Contributing Guide

## Code Standards
- TypeScript strict mode
- ESLint + Prettier for formatting
- Semantic commit messages: `<type>(<scope>): <description>`
- Component naming: PascalCase
- File naming: PascalCase for components, camelCase for utils

## Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Follow code standards above
- Write meaningful commit messages
- Keep commits focused and atomic

### 3. Write Tests
- Unit tests for all components
- Integration tests for user flows
- Accessibility tests (jest-axe)
- **Minimum 80% code coverage required**

### 4. Run Quality Checks
```bash
npm run lint          # ESLint check
npm run type-check    # TypeScript check
npm test              # Run tests
npm run test:coverage # Coverage report
```

### 5. Commit Changes
```bash
git add .
git commit -m "feat(component): add new button component"
```

### 6. Push and Create PR
```bash
git push origin feature/your-feature-name
```
Then create Pull Request on GitHub.

### 7. Code Review
- Wait for code-reviewer approval
- Address review comments
- All quality gates must pass

## Testing Requirements

### Coverage Thresholds
- Statements: ≥80%
- Functions: ≥80%
- Lines: ≥80%
- Branches: ≥75%

### Test Types
1. **Unit Tests**: Individual components in isolation
2. **Integration Tests**: User flows and component interactions
3. **Accessibility Tests**: ARIA, keyboard navigation, screen readers

### Example Test
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
});
```

## Code Review Checklist
- [ ] All tests passing
- [ ] Code coverage ≥80%
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] TypeScript types properly defined
- [ ] Components are accessible (ARIA, semantic HTML)
- [ ] Responsive design implemented
- [ ] No console errors or warnings
- [ ] Performance optimized (React.memo, lazy loading where appropriate)
- [ ] Documentation/comments added for complex logic

## Accessibility Guidelines
- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Maintain color contrast (WCAG AA minimum)
- Test with screen readers

## Performance Best Practices
- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize images (WebP, lazy loading)
- Avoid unnecessary re-renders
- Use Tailwind's purge feature

## Questions?
Contact the team lead or check the [ARCHITECTURE.md](docs/ARCHITECTURE.md) for technical details.
