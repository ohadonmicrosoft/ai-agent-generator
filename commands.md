# Navigate to frontend directory
cd /home/ai_dev/Dev/ai-agent-generator/frontend

# Remove node_modules and lock file for clean install
rm -rf node_modules package-lock.json

# Install dependencies with specific versions
npm install firebase@10.8.0 --save

# 2. Install dependencies (with specific versions to avoid conflicts)
npm install @types/node --save-dev

# 3. Build the project
npm run build

# 4. Test locally (choose one of these commands)
# Option A - Simple serve
npx serve out

# Option B - Firebase emulator (if needed)
firebase emulators:start --only hosting

# 1. Build for production
cd /home/ai_dev/Dev/ai-agent-generator/frontend
npm run build

# 2. Deploy to Firebase (this should be fast)
firebase deploy --only hosting


