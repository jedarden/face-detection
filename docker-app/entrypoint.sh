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
