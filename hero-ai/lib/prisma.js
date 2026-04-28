import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter: new PrismaNeon({
    url: process.env.DATABASE_URL,
  }),
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const db = prisma;
