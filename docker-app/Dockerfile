# Stage 1: Build stage
FROM node:18-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy source code
COPY . .

# Install all dependencies, build, and prune in one step
RUN npm ci && \
    npm run build && \
    npm prune --production && \
    npm cache clean --force

# Stage 2: Production stage
FROM nginx:alpine

# Install nodejs for any server-side requirements and openssl for certificates
RUN apk add --no-cache nodejs npm openssl curl

# Create directories for SSL certificates and logs
RUN mkdir -p /etc/nginx/ssl /var/log/nginx /var/cache/nginx

# Generate self-signed SSL certificate for development
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/selfsigned.key \
    -out /etc/nginx/ssl/selfsigned.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Copy nginx template and configurations
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY nginx-ssl.conf /etc/nginx/conf.d/ssl.conf

# Copy entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html/

# Create cache directory for face-api.js models
RUN mkdir -p /usr/share/nginx/html/model-cache && \
    chmod 755 /usr/share/nginx/html/model-cache

# Create health check script
RUN cat > /usr/local/bin/health-check << 'EOF' && chmod +x /usr/local/bin/health-check
#!/bin/sh
# Health check script for Docker container

# Check HTTP endpoint
HTTP_CHECK=$(curl -sf http://localhost:8080/health)
HTTP_STATUS=$?

# Check HTTPS endpoint (ignore certificate validation for self-signed cert)
HTTPS_CHECK=$(curl -sfk https://localhost:8443/health)
HTTPS_STATUS=$?

# Check if nginx process is running
NGINX_PID=$(pgrep nginx)
NGINX_STATUS=$?

# Check if the main index.html exists
if [ -f /usr/share/nginx/html/index.html ]; then
    FILE_STATUS=0
else
    FILE_STATUS=1
fi

# Overall health status
if [ $HTTP_STATUS -eq 0 ] && [ $NGINX_STATUS -eq 0 ] && [ $FILE_STATUS -eq 0 ]; then
    echo "Health check passed"
    exit 0
else
    echo "Health check failed:"
    [ $HTTP_STATUS -ne 0 ] && echo "  - HTTP endpoint not responding"
    [ $HTTPS_STATUS -ne 0 ] && echo "  - HTTPS endpoint not responding"
    [ $NGINX_STATUS -ne 0 ] && echo "  - Nginx process not running"
    [ $FILE_STATUS -ne 0 ] && echo "  - Application files missing"
    exit 1
fi
EOF

# Expose ports (8080 for HTTP, 8443 for HTTPS)
EXPOSE 8080 8443

# Add labels for better container management
LABEL maintainer="Face Detection App Team" \
      version="1.0.0" \
      description="Face Detection Application with TensorFlow.js"

# Health check with both HTTP and HTTPS
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD /usr/local/bin/health-check || exit 1

# Use custom entrypoint for runtime configuration
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]