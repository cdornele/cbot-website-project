# CBot Website

[PLACEHOLDER: Brief project description from actual implementation]

## Tech Stack
- React 18+ with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (navigation)
- Vitest + Testing Library (testing)
- Docker + nginx (deployment)

## Prerequisites
- Node.js 18+ and npm
- Docker (optional, for containerized deployment)

## Installation

```bash
# Clone repository
git clone [REPO_URL]
cd cbot-website-project

# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts
- `npm run dev` - Start dev server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:coverage` - Generate coverage report
- `npm run lint` - Lint code
- `npm run type-check` - TypeScript check

## Docker Deployment

```bash
# Build Docker image
docker build -t cbot-website .

# Run container
docker run -d -p 80:80 cbot-website

# Or use docker-compose
docker-compose up -d
```

## Project Structure
```
src/
├── components/    # Reusable UI components
├── pages/         # Route page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── assets/        # Images, fonts, etc.
├── styles/        # Global styles
└── types/         # TypeScript type definitions
```

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)

## License
[PLACEHOLDER: License type]
