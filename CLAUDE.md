# CBot Website Project - Agent Team Configuration

## Project Overview
Professional website built with a coordinated team of 8 specialized AI agents, following best practices for modern web development, security, testing, and deployment.

## Agent Team Structure

### Team Name: website-build
This project utilizes a team of 8 specialized agents coordinated by a Team Lead operating in DELEGATE MODE.

### Role Definitions

#### 1. project-manager (Linear Project Management)
- **Responsibility**: Manage project lifecycle in Linear
- **Scope**: Linear MCP operations only
- **Permissions**: READ + Linear API
- **Restrictions**: No code modification, no file system writes
- **Deliverables**: Linear project, issues, milestones, status tracking, final metrics report

#### 2. github-manager (Git & GitHub Management)
- **Responsibility**: Version control, branching, PRs, merges
- **Scope**: Git operations, .github/ templates, CHANGELOG.md
- **Permissions**: Git commands, GitHub CLI (gh)
- **Restrictions**: No merge to main without code-reviewer approval
- **Deliverables**: Branch strategy, PR templates, CODEOWNERS, semantic commits

#### 3. react-developer (Frontend Development)
- **Responsibility**: Build complete React application
- **Scope**: src/ directory (components, pages, hooks, utils, assets, styles, types)
- **Permissions**: Full read/write in src/, npm/yarn commands
- **Tech Stack**: React 18+, TypeScript, Vite, Tailwind CSS, React Router
- **Deliverables**: Responsive, accessible, performant frontend application

#### 4. security-auditor (Security Analysis)
- **Responsibility**: Identify and report security vulnerabilities
- **Scope**: All files (read-only), dependencies, infrastructure configs
- **Permissions**: READ-ONLY, npm audit, security scanning tools
- **Restrictions**: Cannot modify code - only report findings
- **Deliverables**: Security audit report with risk classification and remediation steps

#### 5. devops-engineer (Infrastructure & Deployment)
- **Responsibility**: Containerization, CI/CD, deployment
- **Scope**: Dockerfile, docker-compose.yml, nginx.conf, .github/workflows/, Makefile
- **Permissions**: Docker commands, CI/CD configuration
- **Tech Stack**: Docker, nginx, GitHub Actions
- **Deliverables**: Production-ready Docker setup, automated CI/CD pipeline

#### 6. tester (Quality Assurance)
- **Responsibility**: Write and maintain automated tests
- **Scope**: Test files (**/*.test.tsx, **/*.test.ts), test configuration
- **Permissions**: Write test files, run test commands
- **Tech Stack**: Vitest, React Testing Library, jest-axe
- **Quality Gates**: ≥80% coverage, all tests passing
- **Deliverables**: Comprehensive test suite with coverage reports

#### 7. code-reviewer (Quality Gatekeeper)
- **Responsibility**: Review all code and approve merges
- **Scope**: All files (read-only), PR reviews
- **Permissions**: READ-ONLY, GitHub PR review/approval
- **Review Criteria**: Code quality, TypeScript standards, React best practices, performance, accessibility, security, testing, documentation
- **Restrictions**: Nothing merges to main without approval
- **Deliverables**: Review comments, approval decisions, quality gate validation

#### 8. docs-writer (Technical Documentation)
- **Responsibility**: Create comprehensive project documentation
- **Scope**: *.md files, JSDoc comments, docs/ directory
- **Permissions**: Write documentation files, add code comments
- **Deliverables**: README, CONTRIBUTING, ARCHITECTURE, DEPLOYMENT guides, JSDoc comments, diagrams

## File Ownership (Conflict Prevention)

### src/ directory
- **Owner**: react-developer (primary development)
- **Secondary**: tester (*.test.* files only)
- **Rule**: No other agent modifies src/ without coordination

### Infrastructure files
- **Owner**: devops-engineer
- **Files**: Dockerfile, docker-compose.yml, nginx.conf, Makefile, .dockerignore

### CI/CD and GitHub templates
- **Shared**: github-manager (.github/ISSUE_TEMPLATE/, PULL_REQUEST_TEMPLATE.md, CODEOWNERS)
- **Shared**: devops-engineer (.github/workflows/)

### Documentation
- **Owner**: docs-writer
- **Files**: README.md, CONTRIBUTING.md, docs/, all *.md except CHANGELOG.md
- **Exception**: CHANGELOG.md owned by github-manager

### Read-only agents
- **project-manager**: No file system access (Linear API only)
- **security-auditor**: Read-only on ALL files

## Project Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6+
- **Code Quality**: ESLint + Prettier

### Testing
- **Unit/Integration**: Vitest + React Testing Library
- **Accessibility**: jest-axe
- **Coverage Target**: ≥80% (statements, functions, lines), ≥75% (branches)

### Infrastructure
- **Container**: Docker (multi-stage build)
- **Web Server**: nginx
- **CI/CD**: GitHub Actions
- **Orchestration**: docker-compose (local dev)

### Project Management
- **Issues/Project**: Linear (via MCP)
- **Version Control**: Git + GitHub
- **Code Review**: GitHub Pull Requests

## Quality Gates

### Must Pass Before Merge to Main
1. ✅ All tests passing (npm test)
2. ✅ Test coverage ≥80%
3. ✅ No Critical or High security vulnerabilities
4. ✅ Code review approval from code-reviewer
5. ✅ No ESLint errors
6. ✅ No TypeScript errors
7. ✅ Documentation complete
8. ✅ Docker build successful with health check passing

## Workflow & Dependencies

### Wave 1: Setup (Parallel)
- Task #1: project-manager → Linear setup
- Task #2: github-manager → Git initialization
- Task #3: react-developer → React scaffolding

### Wave 2: Development (After Wave 1)
- Task #4: react-developer → Component development (blocked by #3)
- Task #5: devops-engineer → Docker & CI/CD (parallel with #4)

### Wave 3: Quality Assurance (After Wave 2)
- Task #6: security-auditor → Security audit (blocked by #4, #5)
- Task #7: tester → Test suite (blocked by #4)
- Task #8: react-developer + devops-engineer → Security fixes (blocked by #6)

### Wave 4: Review & Documentation (After Wave 3)
- Task #9: code-reviewer → Final review (blocked by #7, #8)
- Task #10: docs-writer → Documentation (blocked by #9)

### Wave 5: Deployment (After Wave 4)
- Task #11: devops-engineer + github-manager → Production deployment (blocked by #10, #9)
- Task #12: project-manager → Final report (blocked by #11)

## Communication Protocol

### Inter-Agent Communication
- Use SendMessage tool for direct communication between agents
- Notify dependent agents when unblocking their tasks
- Report blockers immediately to team-lead

### Status Updates to Team Lead
- Each agent reports task completion
- Security-auditor reports Critical/High findings immediately
- Code-reviewer reports approval decisions
- All agents report blockers that prevent progress

### Linear Integration
- project-manager creates issues for ALL major tasks
- Agents reference Linear issue IDs in commits and PRs
- project-manager updates Linear status as work progresses

## Commit Message Convention

Format: `<type>(<scope>): <description>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

Example: `feat(components): add responsive navigation menu`

## Branch Strategy

- **main**: Protected, production-ready code only
- **develop**: Integration branch for features
- **feature/<name>**: Feature development branches
- **fix/<name>**: Bug fix branches
- **docs/<name>**: Documentation branches

### Merge Rules
- No direct commits to main
- All changes via Pull Request
- Require code-reviewer approval
- Squash commits on merge to main

## Security Best Practices

### Code
- No hardcoded secrets or API keys
- Input validation and sanitization
- Secure environment variable handling
- XSS and injection prevention

### Dependencies
- Regular npm audit
- Keep dependencies updated
- Review package permissions

### Infrastructure
- Multi-stage Docker builds
- Non-root container user
- Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- HTTPS/TLS in production
- Minimal Docker image size (<50MB target)

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev
# or
make dev

# Build for production
npm run build

# Run tests
npm test

# Test with coverage
npm run test:coverage

# Lint
npm run lint

# Type check
npm run type-check

# Docker build
docker build -t cbot-website .
# or
make build

# Docker run
docker-compose up
# or
make docker-up

# Full CI pipeline locally
make test && make build
```

## Project Structure

```
cbot-website-project/
├── .github/
│   ├── workflows/          # CI/CD pipelines (devops-engineer)
│   ├── ISSUE_TEMPLATE/     # Issue templates (github-manager)
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                   # Documentation (docs-writer)
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── SECURITY.md
├── src/                    # Application code (react-developer)
│   ├── components/         # Reusable components
│   ├── pages/              # Route pages
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── assets/             # Images, fonts, etc.
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── tests/                  # Test files (tester)
├── Dockerfile              # Docker config (devops-engineer)
├── docker-compose.yml
├── nginx.conf
├── Makefile
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── .eslintrc.js
├── .prettierrc
├── CLAUDE.md               # This file
├── README.md               # User documentation (docs-writer)
└── CONTRIBUTING.md
```

## Team Lead Responsibilities

As Team Lead, you operate in DELEGATE MODE:

### ✅ DO
- Coordinate agent activities
- Distribute tasks following dependency chain
- Monitor progress and unblock impediments
- Facilitate communication between agents
- Escalate critical issues
- Synthesize final results
- Make architectural decisions when agents disagree

### ❌ DO NOT
- Write code directly
- Modify project files
- Implement features
- Run tests yourself (delegate to tester)
- Deploy directly (delegate to devops-engineer)

### Exception
- You MAY create/update CLAUDE.md and project management files

## Success Criteria

Project is complete when:
1. ✅ All 12 tasks marked complete in TaskList
2. ✅ Application deployed and accessible
3. ✅ All quality gates passed
4. ✅ Documentation complete and reviewed
5. ✅ Security audit clean (no Critical/High)
6. ✅ Final report delivered by project-manager
7. ✅ All agents have gracefully shut down

## Agent Communication Examples

### Good Communication
```
From: react-developer
To: team-lead
"Task #4 complete. All components developed and committed to feature/components branch.
Ready for testing by tester (Task #7) and security audit (Task #6)."
```

### Blocker Notification
```
From: tester
To: team-lead
"Task #7 blocked. Component tests failing due to missing prop types in Button component.
Requesting react-developer to add TypeScript interfaces."
```

### Security Finding
```
From: security-auditor
To: team-lead, react-developer, devops-engineer
"Critical: Found hardcoded API key in src/utils/api.ts line 12.
Must be moved to environment variable. Blocking Task #9 approval."
```

## Notes

- This is a coordinated multi-agent project - respect file ownership
- All agents should check TaskList regularly for newly unblocked work
- When completing a task, notify dependent agents
- Team Lead does NOT implement - only coordinates
- Code reviewer is the final gatekeeper - respect their decisions
- Security is non-negotiable - all Critical/High issues must be fixed
- Documentation is mandatory - not optional

---

**Last Updated**: 2026-02-16
**Team**: website-build
**Team Lead**: team-lead@website-build
