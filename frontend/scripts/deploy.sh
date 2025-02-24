#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Clean up
echo "🧹 Cleaning up..."
rm -rf .next out node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Type checking
echo "✅ Running type check..."
npm run type-check

# Linting
echo "🔍 Running linter..."
npm run lint

# Building
echo "🏗️ Building for production..."
npm run build

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy --only hosting

echo "✨ Deployment complete!" 