#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting GadaWallet build..."

# Navigate to the frontend directory
cd gada/frontend

echo "📦 Installing dependencies..."
npm ci

echo "🔨 Building the application..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build output: gada/frontend/dist/"

# List the build output
ls -la dist/