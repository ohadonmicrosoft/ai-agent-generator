#!/bin/bash

# Script to finish setup after shell reload
# This script should be run from the project root directory

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Project root directory
PROJECT_ROOT="/home/ai_dev/Dev/ai-agent-generator"
cd "$PROJECT_ROOT"

# Error handler
handle_error() {
    echo -e "${RED}Error: $1${NC}"
    exit 1
}

# Success message
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Print section header
print_section() {
    echo -e "\n${YELLOW}=== $1 ===${NC}\n"
}

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Use Node.js 18
print_section "Setting up Node.js"
nvm use 18 || handle_error "Failed to use Node.js 18"

# Install additional backend dependencies
print_section "Installing Additional Backend Dependencies"
cd "$PROJECT_ROOT/backend" || handle_error "Backend directory not found"
yarn install || handle_error "Failed to install backend dependencies"
yarn add -D webpack@^5.0.0 || handle_error "Failed to install webpack"

# Generate Prisma client
print_section "Generating Prisma Client"
yarn prisma generate || handle_error "Failed to generate Prisma client"

# Install frontend dependencies
print_section "Installing Frontend Dependencies"
cd "$PROJECT_ROOT/frontend" || handle_error "Frontend directory not found"
yarn install || handle_error "Failed to install frontend dependencies"

print_section "Setup Complete!"
echo -e "${GREEN}The development environment has been successfully set up!${NC}"
echo -e "\nNext steps:"
echo "1. Start the backend: cd $PROJECT_ROOT/backend && yarn start:dev"
echo "2. Start the frontend: cd $PROJECT_ROOT/frontend && yarn dev"
echo "3. Access the API documentation at: http://localhost:5000/api"
echo "4. Access the frontend at: http://localhost:3000" 