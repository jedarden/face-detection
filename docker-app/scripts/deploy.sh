#!/bin/bash
# Deployment helper script for Face Detection Application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="face-detection-app"
REGISTRY="${DOCKER_REGISTRY:-docker.io}"
REGISTRY_USER="${DOCKER_USER:-}"
DEPLOY_ENV="${1:-staging}"
VERSION="${2:-latest}"

echo -e "${PURPLE}🚀 Face Detection App Deployment Script${NC}"
echo -e "Environment: ${BLUE}${DEPLOY_ENV}${NC}"
echo -e "Version: ${BLUE}${VERSION}${NC}"
echo ""

# Function to check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker is not installed!${NC}"
        exit 1
    fi
    
    # Check if logged in to registry (if not local)
    if [ "$DEPLOY_ENV" != "local" ] && [ -n "$REGISTRY_USER" ]; then
        if ! docker info 2>/dev/null | grep -q "Username: ${REGISTRY_USER}"; then
            echo -e "${YELLOW}🔐 Logging in to Docker registry...${NC}"
            docker login ${REGISTRY}
        fi
    fi
    
    echo -e "${GREEN}✅ Prerequisites check passed!${NC}"
}

# Function to run tests
run_tests() {
    echo ""
    echo -e "${YELLOW}🧪 Running tests before deployment...${NC}"
    ./scripts/test.sh ci
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Tests failed! Aborting deployment.${NC}"
        exit 1
    fi
}

# Function to build image
build_image() {
    echo ""
    echo -e "${YELLOW}🔨 Building Docker image...${NC}"
    ./scripts/build.sh ${VERSION}
}

# Function to tag and push image
push_image() {
    local tag="${REGISTRY}/${REGISTRY_USER}/${IMAGE_NAME}:${VERSION}"
    
    echo ""
    echo -e "${YELLOW}🏷️  Tagging image...${NC}"
    docker tag ${IMAGE_NAME}:${VERSION} ${tag}
    
    echo -e "${YELLOW}📤 Pushing image to registry...${NC}"
    docker push ${tag}
    
    # Also push latest tag if this is a production deployment
    if [ "$DEPLOY_ENV" == "production" ]; then
        docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${REGISTRY_USER}/${IMAGE_NAME}:latest
        docker push ${REGISTRY}/${REGISTRY_USER}/${IMAGE_NAME}:latest
    fi
    
    echo -e "${GREEN}✅ Image pushed successfully!${NC}"
}

# Function to deploy locally
deploy_local() {
    echo ""
    echo -e "${BLUE}🏠 Deploying locally...${NC}"
    
    # Stop existing container
    docker stop face-detection-container 2>/dev/null || true
    docker rm face-detection-container 2>/dev/null || true
    
    # Run new container
    ./scripts/run.sh
}

# Function to generate docker-compose for deployment
generate_compose() {
    local env=$1
    local compose_file="docker-compose.${env}.yml"
    
    echo -e "${YELLOW}📝 Generating ${compose_file}...${NC}"
    
    cat > ${compose_file} << EOF
version: '3.8'

services:
  face-detection:
    image: ${REGISTRY}/${REGISTRY_USER}/${IMAGE_NAME}:${VERSION}
    container_name: face-detection-${env}
    ports:
      - "\${HTTP_PORT:-8080}:8080"
      - "\${HTTPS_PORT:-8443}:8443"
    environment:
      - NODE_ENV=production
      - APP_ENV=${env}
    volumes:
      - face-detection-models:/usr/share/nginx/html/model-cache
      - face-detection-logs:/var/log/nginx
    restart: unless-stopped
    healthcheck:
      test: ["/usr/local/bin/health-check"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 512M

volumes:
  face-detection-models:
    external: true
  face-detection-logs:
    external: true

networks:
  default:
    name: face-detection-network-${env}
EOF
    
    echo -e "${GREEN}✅ Generated ${compose_file}${NC}"
}

# Function to deploy to staging/production
deploy_remote() {
    local env=$1
    
    echo ""
    echo -e "${BLUE}☁️  Deploying to ${env}...${NC}"
    
    # Generate docker-compose file
    generate_compose ${env}
    
    echo ""
    echo -e "${YELLOW}📋 Deployment Instructions:${NC}"
    echo ""
    echo "1. Copy the following files to your ${env} server:"
    echo "   - docker-compose.${env}.yml"
    echo "   - .env.${env} (if exists)"
    echo ""
    echo "2. On the server, run:"
    echo "   docker volume create face-detection-models"
    echo "   docker volume create face-detection-logs"
    echo "   docker-compose -f docker-compose.${env}.yml up -d"
    echo ""
    echo "3. Monitor the deployment:"
    echo "   docker-compose -f docker-compose.${env}.yml logs -f"
    echo ""
    echo "4. Check health:"
    echo "   curl http://your-server:8080/health"
    echo ""
    
    if [ "$env" == "production" ]; then
        echo -e "${YELLOW}⚠️  Production Deployment Checklist:${NC}"
        echo "   □ Update SSL certificates (replace self-signed)"
        echo "   □ Configure proper domain name"
        echo "   □ Set up monitoring and alerts"
        echo "   □ Configure backup strategy"
        echo "   □ Review security settings"
        echo "   □ Set up CDN for static assets"
        echo "   □ Configure rate limiting"
        echo "   □ Enable access logs analysis"
    fi
}

# Function to rollback deployment
rollback() {
    local env=$1
    local previous_version=$2
    
    echo -e "${YELLOW}⏪ Rolling back to version ${previous_version}...${NC}"
    echo ""
    echo "Run on the ${env} server:"
    echo "  docker-compose -f docker-compose.${env}.yml down"
    echo "  # Update docker-compose.${env}.yml with version: ${previous_version}"
    echo "  docker-compose -f docker-compose.${env}.yml up -d"
}

# Main deployment flow
main() {
    check_prerequisites
    
    case ${DEPLOY_ENV} in
        "local")
            run_tests
            build_image
            deploy_local
            ;;
        "staging")
            run_tests
            build_image
            
            if [ -n "$REGISTRY_USER" ]; then
                push_image
            fi
            
            deploy_remote staging
            ;;
        "production")
            echo -e "${YELLOW}⚠️  Production deployment requires confirmation.${NC}"
            echo -n "Are you sure you want to deploy to production? (yes/no): "
            read confirmation
            
            if [ "$confirmation" != "yes" ]; then
                echo -e "${RED}Deployment cancelled.${NC}"
                exit 1
            fi
            
            run_tests
            build_image
            
            if [ -n "$REGISTRY_USER" ]; then
                push_image
            fi
            
            deploy_remote production
            ;;
        "rollback")
            if [ -z "$VERSION" ]; then
                echo -e "${RED}❌ Please specify the version to rollback to!${NC}"
                echo "Usage: $0 rollback <version>"
                exit 1
            fi
            rollback ${VERSION}
            ;;
        *)
            echo -e "${RED}❌ Unknown environment: ${DEPLOY_ENV}${NC}"
            echo "Usage: $0 [local|staging|production|rollback] [version]"
            exit 1
            ;;
    esac
}

# Show deployment summary
show_summary() {
    echo ""
    echo -e "${GREEN}═══════════════════════════════════════${NC}"
    echo -e "${GREEN}🎉 Deployment Complete!${NC}"
    echo -e "${GREEN}═══════════════════════════════════════${NC}"
    echo ""
    echo "Environment: ${DEPLOY_ENV}"
    echo "Version: ${VERSION}"
    echo "Image: ${IMAGE_NAME}:${VERSION}"
    
    if [ -n "$REGISTRY_USER" ] && [ "$DEPLOY_ENV" != "local" ]; then
        echo "Registry: ${REGISTRY}/${REGISTRY_USER}/${IMAGE_NAME}:${VERSION}"
    fi
    
    echo ""
    echo -e "${YELLOW}📊 Next Steps:${NC}"
    echo "  - Monitor application logs"
    echo "  - Check application health"
    echo "  - Verify all features working"
    echo "  - Monitor performance metrics"
}

# Run main deployment
main

# Show summary
show_summary