#!/bin/bash

# Script to set up development environment for AI Agent Generator
# This script should be run from the project root directory

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Project root directory
PROJECT_ROOT="/home/ai_dev/Dev/ai-agent-generator"
cd "$PROJECT_ROOT"

# Print section header
print_section() {
    echo -e "\n${YELLOW}=== $1 ===${NC}\n"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Error handler
handle_error() {
    echo -e "${RED}Error: $1${NC}"
    exit 1
}

# Success message
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# 1. Update system and install basic dependencies
print_section "Updating System and Installing Basic Dependencies"
sudo apt-get update || handle_error "Failed to update package list"
sudo apt-get install -y \
    curl \
    git \
    build-essential \
    python3 \
    python3-pip \
    || handle_error "Failed to install basic dependencies"
print_success "Basic dependencies installed"

# 2. Install Node.js and npm using nvm
print_section "Installing Node.js using NVM"
if ! command_exists nvm; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash || handle_error "Failed to install NVM"
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi
nvm install 18 || handle_error "Failed to install Node.js"
nvm use 18 || handle_error "Failed to use Node.js 18"
print_success "Node.js installed and configured"

# 3. Install global npm packages
print_section "Installing Global NPM Packages"
npm install -g yarn @nestjs/cli typescript ts-node || handle_error "Failed to install global npm packages"
print_success "Global NPM packages installed"

# 4. Install Docker and Docker Compose
print_section "Installing Docker"
if ! command_exists docker; then
    curl -fsSL https://get.docker.com -o get-docker.sh || handle_error "Failed to download Docker installation script"
    sudo sh get-docker.sh || handle_error "Failed to install Docker"
    sudo usermod -aG docker $USER || handle_error "Failed to add user to docker group"
    rm get-docker.sh
fi
print_success "Docker installed"

# 5. Install and start PostgreSQL
print_section "Setting up PostgreSQL"
sudo apt-get install -y postgresql postgresql-contrib || handle_error "Failed to install PostgreSQL"
sudo service postgresql start || handle_error "Failed to start PostgreSQL"
sudo -u postgres psql -c "CREATE USER ai_dev WITH PASSWORD 'ai_dev_password';" || true
sudo -u postgres psql -c "CREATE DATABASE ai_agent_generator WITH OWNER ai_dev;" || true
sudo -u postgres psql -c "ALTER USER ai_dev WITH SUPERUSER;" || true
print_success "PostgreSQL installed and configured"

# 6. Install project dependencies
print_section "Installing Project Dependencies"

# Backend dependencies
echo "Installing backend dependencies..."
cd "$PROJECT_ROOT/backend" || handle_error "Backend directory not found"
yarn install || handle_error "Failed to install backend dependencies"
print_success "Backend dependencies installed"

# Frontend dependencies
echo "Installing frontend dependencies..."
cd "$PROJECT_ROOT/frontend" || handle_error "Frontend directory not found"
yarn install || handle_error "Failed to install frontend dependencies"
print_success "Frontend dependencies installed"

# 7. Set up environment files
print_section "Setting up Environment Files"

# Backend .env
cd "$PROJECT_ROOT/backend" || handle_error "Backend directory not found"
if [ ! -f .env ]; then
    cp .env.example .env || handle_error "Failed to create backend .env"
    # Update DATABASE_URL in .env
    sed -i "s|postgresql://postgres:postgres@localhost:5432/ai_agent_generator|postgresql://ai_dev:ai_dev_password@localhost:5432/ai_agent_generator|g" .env
fi

# Frontend .env
cd "$PROJECT_ROOT/frontend" || handle_error "Frontend directory not found"
if [ ! -f .env ]; then
    cp .env.example .env || handle_error "Failed to create frontend .env"
fi

print_success "Environment files created"

# 8. Initialize database with Prisma
print_section "Initializing Database with Prisma"
cd "$PROJECT_ROOT/backend" || handle_error "Backend directory not found"
yarn prisma generate || handle_error "Failed to generate Prisma client"
yarn prisma migrate dev --name init || handle_error "Failed to run Prisma migrations"
print_success "Database initialized"

# Final success message
print_section "Setup Complete!"
echo -e "${GREEN}The development environment has been successfully set up!${NC}"
echo -e "\nNext steps:"
echo "1. Start the backend: cd $PROJECT_ROOT/backend && yarn start:dev"
echo "2. Start the frontend: cd $PROJECT_ROOT/frontend && yarn dev"
echo "3. Access the API documentation at: http://localhost:5000/api"
echo "4. Access the frontend at: http://localhost:3000"
echo -e "\n${YELLOW}Note: You may need to restart your terminal for all changes to take effect.${NC}" 