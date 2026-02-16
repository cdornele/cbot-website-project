# Multi-stage build for optimal image size
# Stage 1: Build the React application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies with clean install for reproducible builds
RUN npm ci

# Copy application source
COPY . .

# Build the production bundle
RUN npm run build

# Stage 2: Production image with nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Health check to verify nginx is serving content
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Run as non-root user for security
USER nginx

# Labels for image metadata
LABEL maintainer="devops-engineer@cbot-website"
LABEL description="CBot Website - Production-ready React application"
LABEL version="1.0.0"
