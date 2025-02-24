# AI Agent Generator

A powerful platform for creating, managing, and deploying AI agents. Built with Next.js, NestJS, and OpenAI.

## Features

- 🤖 Create and customize AI agents with different personalities and capabilities
- 🔒 Secure authentication and user management
- 🎯 Fine-tune agent parameters (temperature, max tokens, etc.)
- 💬 Real-time chat interface with AI agents
- 📊 Usage analytics and monitoring
- 🌐 RESTful API for integration
- 🔑 OpenAI integration
- 📱 Responsive design

## Tech Stack

### Frontend
- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- Axios

### Backend
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- JWT Authentication
- OpenAI SDK

### Infrastructure
- Docker
- Docker Compose
- GitHub Actions
- Vercel (Frontend)
- Railway (Backend)

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL
- OpenAI API key
- pnpm (recommended)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ohadonmicrosoft/ai-agent-generator.git
   cd ai-agent-generator
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   pnpm install

   # Install backend dependencies
   cd ../backend
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   # Frontend
   cp frontend/.env.example frontend/.env.local

   # Backend
   cp backend/.env.example backend/.env
   ```

4. Start the development environment:
   ```bash
   # Start backend services
   docker-compose -f docker/development/docker-compose.yml up -d

   # Start backend
   cd backend
   pnpm run start:dev

   # Start frontend
   cd frontend
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Directory Structure

```
.
├── frontend/               # Next.js frontend application
├── backend/               # NestJS backend application
├── shared/               # Shared types and utilities
├── docker/               # Docker configuration
│   ├── development/     # Development environment
│   └── production/      # Production environment
├── scripts/             # Development and deployment scripts
└── docs/                # Documentation
```

### Available Scripts

#### Frontend
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests

#### Backend
- `pnpm start:dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start:prod` - Start production server
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm test` - Run tests

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy

### Backend (Railway)
1. Create a new project on Railway
2. Add PostgreSQL plugin
3. Configure environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@ai-agent-generator.com or join our Discord channel.
