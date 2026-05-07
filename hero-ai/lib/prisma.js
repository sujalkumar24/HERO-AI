import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

const globalForPrisma = globalThis;

// Use DATABASE_URL (PgBouncer port 6543) for runtime connections
// The "?pgbouncer=true" query param is in the DATABASE_URL already
const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter: new PrismaPg({
    pool: new Pool({
      connectionString: connectionString,
    }),
  }),
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const db = prisma;
