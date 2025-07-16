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