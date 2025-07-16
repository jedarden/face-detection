#!/bin/bash
# Run script for Face Detection Docker container

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="face-detection-app"
CONTAINER_NAME="face-detection-container"
HTTP_PORT="${HTTP_PORT:-8080}"
HTTPS_PORT="${HTTPS_PORT:-8443}"
MODE="${1:-production}"

echo -e "${GREEN}🚀 Starting Face Detection Application${NC}"
echo ""

# Function to check if container is already running
check_container() {
    if [ "$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
        echo -e "${YELLOW}⚠️  Container '${CONTAINER_NAME}' is already running.${NC}"
        echo -n "Do you want to stop it and start a new one? (y/n): "
        read answer
        if [ "$answer" = "y" ]; then
            echo -e "${YELLOW}Stopping existing container...${NC}"
            docker stop ${CONTAINER_NAME}
            docker rm ${CONTAINER_NAME}
        else
            echo -e "${RED}Exiting...${NC}"
            exit 1
        fi
    fi
    
    # Remove stopped container with same name
    if [ "$(docker ps -aq -f status=exited -f name=${CONTAINER_NAME})" ]; then
        docker rm ${CONTAINER_NAME}
    fi
}

# Run in development mode
if [ "$MODE" == "--dev" ] || [ "$MODE" == "dev" ]; then
    echo -e "${BLUE}🔧 Running in DEVELOPMENT mode${NC}"
    
    CONTAINER_NAME="${CONTAINER_NAME}-dev"
    check_container
    
    docker run -d \
        --name ${CONTAINER_NAME} \
        -p 3000:3000 \
        -p 35729:35729 \
        -v $(pwd)/src:/app/src \
        -v $(pwd)/public:/app/public \
        -v $(pwd)/tests:/app/tests \
        -e NODE_ENV=development \
        -e CHOKIDAR_USEPOLLING=true \
        ${IMAGE_NAME}:dev
    
    echo -e "${GREEN}✅ Development container started!${NC}"
    echo ""
    echo "Access the application at:"
    echo -e "  ${BLUE}http://localhost:3000${NC}"
    echo ""
    echo "Hot reload is enabled - changes will be reflected automatically"
    
# Run in production mode
else
    echo -e "${BLUE}🏭 Running in PRODUCTION mode${NC}"
    
    check_container
    
    # Check if image exists
    if [[ "$(docker images -q ${IMAGE_NAME}:latest 2> /dev/null)" == "" ]]; then
        echo -e "${YELLOW}⚠️  Image not found. Building...${NC}"
        ./scripts/build.sh
    fi
    
    # Create volume for model cache
    docker volume create face-detection-models 2>/dev/null || true
    
    # Run container with environment variables from .env file if it exists
    ENV_FILE=""
    if [ -f ".env" ]; then
        ENV_FILE="--env-file .env"
    fi
    
    docker run -d \
        --name ${CONTAINER_NAME} \
        -p ${HTTP_PORT}:8080 \
        -p ${HTTPS_PORT}:8443 \
        -v face-detection-models:/usr/share/nginx/html/model-cache \
        -e NODE_ENV=production \
        ${ENV_FILE} \
        --restart unless-stopped \
        --health-cmd="/usr/local/bin/health-check" \
        --health-interval=30s \
        --health-timeout=5s \
        --health-retries=3 \
        ${IMAGE_NAME}:latest
    
    echo -e "${GREEN}✅ Production container started!${NC}"
    echo ""
    echo "Access the application at:"
    echo -e "  HTTP:  ${BLUE}http://localhost:${HTTP_PORT}${NC}"
    echo -e "  HTTPS: ${BLUE}https://localhost:${HTTPS_PORT}${NC} (self-signed certificate)"
fi

# Show container status
echo ""
echo -e "${YELLOW}📊 Container Status:${NC}"
docker ps --filter name=${CONTAINER_NAME} --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Show logs command
echo ""
echo -e "${YELLOW}📋 To view logs:${NC}"
echo "  docker logs -f ${CONTAINER_NAME}"

# Show stop command
echo ""
echo -e "${YELLOW}🛑 To stop:${NC}"
echo "  docker stop ${CONTAINER_NAME}"

# Wait a moment for container to start
sleep 2

# Check if container is healthy
if [ "$MODE" != "--dev" ] && [ "$MODE" != "dev" ]; then
    echo ""
    echo -e "${YELLOW}🏥 Checking container health...${NC}"
    
    # Wait for health check
    for i in {1..10}; do
        HEALTH=$(docker inspect --format='{{.State.Health.Status}}' ${CONTAINER_NAME} 2>/dev/null || echo "unknown")
        if [ "$HEALTH" == "healthy" ]; then
            echo -e "${GREEN}✅ Container is healthy!${NC}"
            break
        elif [ "$HEALTH" == "unhealthy" ]; then
            echo -e "${RED}❌ Container is unhealthy! Check logs for details.${NC}"
            docker logs --tail 50 ${CONTAINER_NAME}
            exit 1
        else
            echo -n "."
            sleep 2
        fi
    done
fi

echo ""
echo -e "${GREEN}🎉 Application is ready!${NC}"