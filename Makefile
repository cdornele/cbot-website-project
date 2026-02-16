.PHONY: help dev build docker-up docker-down docker-dev test clean deploy logs health check-size

# Default target
help:
	@echo "CBot Website - DevOps Commands"
	@echo "================================"
	@echo "Development:"
	@echo "  make dev           - Start local development server"
	@echo "  make docker-dev    - Start Docker development environment with hot reload"
	@echo ""
	@echo "Building:"
	@echo "  make build         - Build Docker image"
	@echo "  make check-size    - Check Docker image size"
	@echo ""
	@echo "Running:"
	@echo "  make docker-up     - Start Docker containers (production)"
	@echo "  make docker-down   - Stop Docker containers"
	@echo "  make logs          - View Docker container logs"
	@echo "  make health        - Check application health"
	@echo ""
	@echo "Testing:"
	@echo "  make test          - Run test suite"
	@echo "  make test-coverage - Run tests with coverage"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy        - Deploy production container"
	@echo "  make clean         - Clean up build artifacts"

# Development
dev:
	npm run dev

docker-dev:
	docker-compose --profile dev up cbot-website-dev

# Building
build:
	docker build -t cbot-website:latest .
	@echo ""
	@echo "Build complete. Checking image size..."
	@make check-size

check-size:
	@echo "Docker image size:"
	@docker images cbot-website:latest --format "{{.Repository}}:{{.Tag}} - {{.Size}}"
	@SIZE=$$(docker images cbot-website:latest --format "{{.Size}}" | sed 's/MB//'); \
	if [ "$$(echo "$$SIZE < 50" | bc -l)" -eq 1 ]; then \
		echo "✅ Image size is under 50MB target"; \
	else \
		echo "⚠️  Warning: Image size exceeds 50MB target"; \
	fi

# Running
docker-up:
	docker-compose up -d
	@echo "Container started. Access at http://localhost:8080"
	@echo "Run 'make logs' to view logs"
	@echo "Run 'make health' to check health status"

docker-down:
	docker-compose down

logs:
	docker-compose logs -f

health:
	@echo "Checking application health..."
	@curl -f http://localhost:8080/health && echo "✅ Application is healthy" || echo "❌ Health check failed"

# Testing
test:
	npm test

test-coverage:
	npm run test:coverage

# Deployment
deploy:
	@echo "Building production image..."
	docker build -t cbot-website:$$(date +%Y%m%d-%H%M%S) -t cbot-website:latest .
	@echo "Stopping existing container..."
	-docker stop cbot-website
	-docker rm cbot-website
	@echo "Starting new container..."
	docker run -d -p 80:80 --name cbot-website --restart unless-stopped cbot-website:latest
	@echo "Waiting for container to be healthy..."
	@timeout 60 sh -c 'until docker inspect --format="{{.State.Health.Status}}" cbot-website | grep -q "healthy"; do sleep 2; done' && echo "✅ Deployment successful" || echo "❌ Deployment failed"

# Cleanup
clean:
	rm -rf node_modules dist coverage
	docker-compose down -v
	-docker rmi cbot-website:latest

# CI/CD helpers
ci-lint:
	npm run lint

ci-typecheck:
	npm run type-check

ci-test:
	npm run test:coverage

ci-build:
	npm run build

ci-security:
	npm audit --audit-level=moderate
	@echo "Running Trivy scan..."
	@docker run --rm aquasec/trivy image cbot-website:latest || true
