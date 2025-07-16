#!/bin/bash
# Test script for running tests in Docker container

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="face-detection-app"
CONTAINER_NAME="face-detection-test"
TEST_TYPE="${1:-all}"

echo -e "${GREEN}🧪 Running Face Detection Tests in Docker${NC}"
echo ""

# Function to run tests in container
run_tests() {
    local test_command=$1
    local test_name=$2
    
    echo -e "${YELLOW}Running ${test_name}...${NC}"
    
    docker run --rm \
        --name ${CONTAINER_NAME} \
        -v $(pwd):/app \
        -w /app \
        -e CI=true \
        node:18-alpine \
        sh -c "npm ci && ${test_command}"
}

# Function to run specific test suite
run_test_suite() {
    case $1 in
        "unit")
            echo -e "${BLUE}🔬 Running Unit Tests${NC}"
            run_tests "npm run test:unit" "unit tests"
            ;;
        "e2e")
            echo -e "${BLUE}🌐 Running E2E Tests${NC}"
            # E2E tests need a running container
            echo -e "${YELLOW}Starting application container for E2E tests...${NC}"
            
            # Start the app container
            docker run -d \
                --name ${CONTAINER_NAME}-app \
                -p 8080:8080 \
                ${IMAGE_NAME}:latest
            
            # Wait for container to be ready
            sleep 5
            
            # Run E2E tests
            docker run --rm \
                --name ${CONTAINER_NAME}-e2e \
                --network host \
                -v $(pwd):/app \
                -w /app \
                -e TEST_URL=http://localhost:8080 \
                node:18-alpine \
                sh -c "apk add --no-cache chromium && npm ci && npm run test:e2e"
            
            # Cleanup
            docker stop ${CONTAINER_NAME}-app
            docker rm ${CONTAINER_NAME}-app
            ;;
        "coverage")
            echo -e "${BLUE}📊 Running Tests with Coverage${NC}"
            run_tests "npm run test:coverage" "tests with coverage"
            
            # Show coverage summary
            echo ""
            echo -e "${YELLOW}📈 Coverage Summary:${NC}"
            docker run --rm \
                -v $(pwd):/app \
                -w /app \
                node:18-alpine \
                sh -c "cat coverage/lcov-report/index.html | grep -A 4 'percentage'"
            ;;
        "lint")
            echo -e "${BLUE}🔍 Running Linting${NC}"
            run_tests "npm run lint" "linting"
            ;;
        "ci")
            echo -e "${BLUE}🚀 Running CI Tests${NC}"
            run_tests "npm run test:ci" "CI tests"
            ;;
        "all")
            echo -e "${BLUE}🎯 Running All Tests${NC}"
            
            # Run linting
            echo ""
            run_test_suite "lint"
            
            # Run unit tests
            echo ""
            run_test_suite "unit"
            
            # Run coverage
            echo ""
            run_test_suite "coverage"
            
            # Build the image first for E2E
            echo ""
            echo -e "${YELLOW}Building Docker image for E2E tests...${NC}"
            ./scripts/build.sh
            
            # Run E2E tests
            echo ""
            run_test_suite "e2e"
            ;;
        *)
            echo -e "${RED}❌ Unknown test type: $1${NC}"
            echo "Usage: $0 [unit|e2e|coverage|lint|ci|all]"
            exit 1
            ;;
    esac
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running! Please start Docker first.${NC}"
    exit 1
fi

# Run the requested test suite
run_test_suite ${TEST_TYPE}

# Check test results
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ All tests passed!${NC}"
else
    echo ""
    echo -e "${RED}❌ Tests failed!${NC}"
    exit 1
fi

# Show test report location
if [ -d "coverage" ] && [ "$TEST_TYPE" == "coverage" ] || [ "$TEST_TYPE" == "all" ]; then
    echo ""
    echo -e "${YELLOW}📊 Coverage Report:${NC}"
    echo "  Open coverage/lcov-report/index.html in your browser"
fi

if [ -d "test-results" ]; then
    echo ""
    echo -e "${YELLOW}📋 Test Results:${NC}"
    echo "  JUnit XML: test-results/junit.xml"
    echo "  HTML Report: test-results/report.html"
fi