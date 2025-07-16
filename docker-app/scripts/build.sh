#!/bin/bash
# Build script for Face Detection Docker image

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="face-detection-app"
IMAGE_TAG="${1:-latest}"
BUILD_CONTEXT="."
DOCKERFILE="Dockerfile"

echo -e "${GREEN}🔨 Building Face Detection Docker Image${NC}"
echo -e "Image: ${IMAGE_NAME}:${IMAGE_TAG}"
echo ""

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the docker-app directory.${NC}"
    exit 1
fi

# Clean up old builds
echo -e "${YELLOW}🧹 Cleaning up old builds...${NC}"
rm -rf dist/ .parcel-cache/

# Run tests first
echo -e "${YELLOW}🧪 Running tests...${NC}"
npm run test:ci || {
    echo -e "${RED}❌ Tests failed! Please fix the tests before building.${NC}"
    exit 1
}

# Build the Docker image
echo -e "${YELLOW}🐳 Building Docker image...${NC}"
docker build \
    --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
    --build-arg VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown") \
    -t ${IMAGE_NAME}:${IMAGE_TAG} \
    -t ${IMAGE_NAME}:latest \
    -f ${DOCKERFILE} \
    ${BUILD_CONTEXT}

# Check if build was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image built successfully!${NC}"
    echo ""
    echo "Tagged as:"
    echo "  - ${IMAGE_NAME}:${IMAGE_TAG}"
    echo "  - ${IMAGE_NAME}:latest"
    echo ""
    
    # Show image info
    echo -e "${YELLOW}📊 Image Info:${NC}"
    docker images ${IMAGE_NAME}:${IMAGE_TAG}
    
    # Show image size
    SIZE=$(docker images ${IMAGE_NAME}:${IMAGE_TAG} --format "{{.Size}}")
    echo -e "\nImage size: ${GREEN}${SIZE}${NC}"
else
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi

# Optional: Build development image
if [ "$2" == "--dev" ]; then
    echo ""
    echo -e "${YELLOW}🔧 Building development image...${NC}"
    docker build \
        -t ${IMAGE_NAME}:dev \
        -f Dockerfile.dev \
        ${BUILD_CONTEXT}
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Development image built successfully!${NC}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Build complete!${NC}"
echo ""
echo "To run the container:"
echo "  ./scripts/run.sh"
echo ""
echo "To run in development mode:"
echo "  ./scripts/run.sh --dev"