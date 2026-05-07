import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from "prisma/config";

// Load environment variables from root .Env file
dotenv.config({ path: path.resolve(__dirname, '../.Env') });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/db/seed.ts',
  },
datasource: {
    // Use DATABASE_URL for both runtime and migrations (PgBouncer on port 6543)
    // Use port 5432 only if DIRECT_URL specifically points to it and is accessible
    url: process.env.DATABASE_URL,
  },
});
