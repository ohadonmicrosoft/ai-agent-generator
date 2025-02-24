import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create demo user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Demo User',
      password: userPassword,
      role: 'USER',
    },
  });

  // Create demo AI agent
  const demoAgent = await prisma.aIAgent.upsert({
    where: {
      id: 'demo-agent',
    },
    update: {},
    create: {
      id: 'demo-agent',
      name: 'Demo Assistant',
      description: 'A helpful AI assistant for demonstration purposes',
      config: {
        model: 'gpt-4-turbo-preview',
        temperature: 0.7,
        maxTokens: 2000,
        systemPrompt: 'You are a helpful AI assistant.',
      },
      isPublic: true,
      userId: admin.id,
    },
  });

  // Create demo chat
  const demoChat = await prisma.chat.create({
    data: {
      title: 'Welcome Chat',
      userId: user.id,
      agentId: demoAgent.id,
      messages: {
        create: [
          {
            content: 'Hello! How can I help you today?',
            role: 'ASSISTANT',
          },
          {
            content: 'I would like to learn more about AI agents.',
            role: 'USER',
          },
          {
            content: 'I\'d be happy to explain. AI agents are software programs that can perform tasks autonomously using artificial intelligence. They can understand natural language, make decisions, and interact with users in a conversational way.',
            role: 'ASSISTANT',
          },
        ],
      },
    },
  });

  console.log({
    admin,
    user,
    demoAgent,
    demoChat,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 