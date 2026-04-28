import 'dotenv/config';
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/db/seed.ts',
  },
  datasource: {
    url:
      process.env.DIRECT_URL ||
      process.env.DATABASE_URL ||
      "postgresql://Adminowner:npg_iTOKDBUM9g4x@ep-late-forest-ahbp2t3r.c-3.us-east-1.aws.neon.tech/HEROAI?sslmode=require",
  },
});
