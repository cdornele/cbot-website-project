# Commit Message Convention

This project follows **Semantic Commit Messages** based on [Conventional Commits](https://www.conventionalcommits.org/).

## Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Examples

```
feat(components): add responsive navigation menu
fix(api): resolve authentication token expiration
docs(readme): update installation instructions
test(button): add accessibility tests
chore(deps): upgrade React to 18.3.0
```

## Type

Must be one of the following:

- **feat**: A new feature for the user
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: vite, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: GitHub Actions, GitLab CI)
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Scope

The scope should specify the place of the commit change. For example:

**Frontend/Components:**
- `components` - UI components
- `pages` - Page components
- `hooks` - Custom React hooks
- `utils` - Utility functions
- `styles` - Styling changes
- `router` - Routing configuration

**Infrastructure:**
- `docker` - Docker configuration
- `nginx` - Web server configuration
- `ci` - CI/CD pipelines
- `deps` - Dependencies

**Testing:**
- `tests` - Test files
- `e2e` - End-to-end tests
- `unit` - Unit tests
- `integration` - Integration tests

**Documentation:**
- `readme` - README updates
- `docs` - Documentation files
- `changelog` - CHANGELOG updates

## Subject

The subject contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No period (.) at the end
- Limit to 72 characters or less

## Body (Optional)

The body should include the motivation for the change and contrast this with previous behavior.

- Use the imperative, present tense
- Wrap at 72 characters
- Separate from subject with a blank line

## Footer (Optional)

The footer should contain information about Breaking Changes and reference GitHub/Linear issues.

### Breaking Changes

Breaking changes must be indicated at the start of the footer section with `BREAKING CHANGE:` followed by a description.

```
feat(api): change authentication endpoint structure

BREAKING CHANGE: The /auth endpoint now requires a bearer token in the Authorization header.
Previously, it accepted credentials in the request body.

Closes LIN-123
```

### Issue References

Reference issues and PRs at the end of the commit:

```
fix(login): resolve session timeout issue

Fixes #123
Closes LIN-456
Related to #789
```

## Examples with All Sections

### Feature Addition
```
feat(components): add dark mode toggle component

Add a reusable toggle component that switches between light and dark themes.
The component uses React Context to manage theme state globally.

- Add ThemeContext provider
- Create ToggleSwitch component
- Update App.tsx to wrap with ThemeProvider
- Add dark mode Tailwind classes

Closes LIN-42
```

### Bug Fix
```
fix(auth): prevent token refresh loop

The token refresh mechanism was causing an infinite loop when the refresh
token expired. Now properly handles expired refresh tokens by redirecting
to login.

Fixes #156
Related to LIN-89
```

### Breaking Change
```
feat(api): migrate to REST API v2

Update all API calls to use the new v2 endpoints with improved response
structure and error handling.

BREAKING CHANGE: All API endpoints now use /api/v2 prefix instead of /api/v1.
Response format has changed from { data, error } to { success, data, errors }.

Closes LIN-234
```

## Commit Co-Authorship

All commits should include agent co-authorship:

```
feat(components): add navigation component

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## Rules

1. **Always use semantic commit format** - No exceptions
2. **Keep commits atomic** - One logical change per commit
3. **Reference issues** - Always link to Linear/GitHub issues
4. **Write clear subjects** - Make it easy to understand what changed
5. **Use conventional types** - Don't invent new types
6. **Test before commit** - Ensure code works and tests pass

## Validation

Commits are validated by:
- Git hooks (pre-commit)
- CI/CD pipeline
- Code review process

Invalid commit messages will be rejected.

## Tools

Consider using:
- [Commitizen](https://github.com/commitizen/cz-cli) - Interactive commit helper
- [commitlint](https://commitlint.js.org/) - Lint commit messages
- Git hooks with [husky](https://typicode.github.io/husky/) - Enforce convention

---

**Last Updated**: 2026-02-16
**Maintained By**: github-manager
