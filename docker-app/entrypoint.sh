#!/bin/sh
set -e

# Default values
APP_PREFIX=${APP_PREFIX:-""}

# Remove leading slash if present (we'll add it where needed)
APP_PREFIX=$(echo "$APP_PREFIX" | sed 's|^/||')

# Add leading slash if prefix is not empty
if [ -n "$APP_PREFIX" ]; then
    APP_PREFIX="/$APP_PREFIX"
fi

echo "🚀 Starting Face Detection App with prefix: '${APP_PREFIX}'"

# Generate nginx configuration based on prefix
if [ -n "$APP_PREFIX" ]; then
    # With prefix configuration
    APP_PREFIX_BLOCK="
        # Static assets with prefix
        location ${APP_PREFIX}/static/ {
            alias /usr/share/nginx/html/;
        }
        
        # Main application route with prefix
        location ${APP_PREFIX}/ {
            alias /usr/share/nginx/html/;
            try_files \$uri \$uri/ ${APP_PREFIX}/index.html;
            
            # Add prefix configuration to index.html
            sub_filter '</head>' '<script>window.APP_PREFIX = \"${APP_PREFIX}\";</script></head>';
            sub_filter_once on;
        }

        # Root redirect to prefixed route
        location = / {
            return 301 ${APP_PREFIX}/;
        }"
else
    # Without prefix configuration
    APP_PREFIX_BLOCK="
        # Main application route without prefix
        location / {
            root /usr/share/nginx/html;
            try_files \$uri \$uri/ /index.html;
        }"
fi

# Export the block for envsubst
export APP_PREFIX_BLOCK

# Generate nginx configuration from template
envsubst '${APP_PREFIX} ${APP_PREFIX_BLOCK}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Update JavaScript configuration for prefix
CONFIG_FILE="/usr/share/nginx/html/config.js"
echo "// Runtime configuration" > "$CONFIG_FILE"
echo "window.APP_CONFIG = {" >> "$CONFIG_FILE"
echo "  prefix: '${APP_PREFIX}'," >> "$CONFIG_FILE"
echo "  modelPath: '${APP_PREFIX}/models'," >> "$CONFIG_FILE"
echo "  basePath: '${APP_PREFIX}'" >> "$CONFIG_FILE"
echo "};" >> "$CONFIG_FILE"

# Update health check script if prefix is configured
if [ -n "$APP_PREFIX" ]; then
    # Update health check to include prefix awareness
    cat > /usr/local/bin/health-check << EOF
#!/bin/sh
# Health check script for Docker container with prefix support

# Check HTTP endpoint
HTTP_CHECK=\$(curl -sf http://localhost:8080/health)
HTTP_STATUS=\$?

# Check HTTPS endpoint (ignore certificate validation for self-signed cert)
HTTPS_CHECK=\$(curl -sfk https://localhost:8443/health)
HTTPS_STATUS=\$?

# Check prefixed application endpoint
if [ -n "${APP_PREFIX}" ]; then
    APP_CHECK=\$(curl -sf http://localhost:8080${APP_PREFIX}/)
    APP_STATUS=\$?
else
    APP_CHECK=\$(curl -sf http://localhost:8080/)
    APP_STATUS=\$?
fi

# Check if nginx process is running
NGINX_PID=\$(pgrep nginx)
NGINX_STATUS=\$?

# Check if the main index.html exists
if [ -f /usr/share/nginx/html/index.html ]; then
    FILE_STATUS=0
else
    FILE_STATUS=1
fi

# Overall health status
if [ \$HTTP_STATUS -eq 0 ] && [ \$NGINX_STATUS -eq 0 ] && [ \$FILE_STATUS -eq 0 ] && [ \$APP_STATUS -eq 0 ]; then
    echo "Health check passed"
    exit 0
else
    echo "Health check failed:"
    [ \$HTTP_STATUS -ne 0 ] && echo "  - HTTP endpoint not responding"
    [ \$HTTPS_STATUS -ne 0 ] && echo "  - HTTPS endpoint not responding"
    [ \$APP_STATUS -ne 0 ] && echo "  - Application endpoint not responding"
    [ \$NGINX_STATUS -ne 0 ] && echo "  - Nginx process not running"
    [ \$FILE_STATUS -ne 0 ] && echo "  - Application files missing"
    exit 1
fi
EOF
    chmod +x /usr/local/bin/health-check
fi

# Log configuration for debugging
echo "📝 Configuration:"
echo "   - Prefix: ${APP_PREFIX}"
echo "   - Models path: ${APP_PREFIX}/models"
echo "   - Health check endpoint: /health"
echo "   - Application endpoint: ${APP_PREFIX}/"

# Validate nginx configuration
echo "🔍 Validating nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
else
    echo "❌ Nginx configuration validation failed"
    exit 1
fi

echo "🎯 Starting nginx..."

# Start nginx
exec nginx -g "daemon off;"