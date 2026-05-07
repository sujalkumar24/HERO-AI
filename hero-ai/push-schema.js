// Push schema to database using direct SQL execution
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { Pool } = require('pg');
require('dotenv').config({ path: '../.Env' });

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function pushSchema() {
  const client = await pool.connect();
  
  try {
    console.log('Creating enum types...');
    
    // Create enum types
    await client.query(`CREATE TYPE "DemandLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW')`);
    console.log('  ✅ DemandLevel enum created');
    
    await client.query(`CREATE TYPE "MarketOutlook" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE')`);
    console.log('  ✅ MarketOutlook enum created');
    
    console.log('Creating tables...');
    
    // Create User table
    await client.query(`
      CREATE TABLE "User" (
        "id" TEXT NOT NULL,
        "clerkUserId" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT,
        "imageUrl" TEXT,
        "industry" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "bio" TEXT,
        "experience" INTEGER,
        "skills" TEXT[],
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      )
    `);
    console.log('  ✅ User table created');
    
    // Create Assessment table
    await client.query(`
      CREATE TABLE "Assessment" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "quizScore" DOUBLE PRECISION NOT NULL,
        "questions" JSONB[],
        "category" TEXT NOT NULL,
        "improvementTip" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
      )
    `);
    console.log('  ✅ Assessment table created');
    
    // Create Resume table
    await client.query(`
      CREATE TABLE "Resume" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "atsScore" DOUBLE PRECISION,
        "feedback" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
      )
    `);
    console.log('  ✅ Resume table created');
    
    // Create CoverLetter table
    await client.query(`
      CREATE TABLE "CoverLetter" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "jobDescription" TEXT,
        "companyName" TEXT NOT NULL,
        "jobTitle" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'draft',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "CoverLetter_pkey" PRIMARY KEY ("id")
      )
    `);
    console.log('  ✅ CoverLetter table created');
    
    // Create IndustryInsight table
    await client.query(`
      CREATE TABLE "IndustryInsight" (
        "id" TEXT NOT NULL,
        "industry" TEXT NOT NULL,
        "salaryRanges" JSONB[],
        "growthRate" DOUBLE PRECISION NOT NULL,
        "demandLevel" "DemandLevel" NOT NULL,
        "topSkills" TEXT[],
        "marketOutlook" "MarketOutlook" NOT NULL,
        "keyTrends" TEXT[],
        "recommendedSkills" TEXT[],
        "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "nextUpdate" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "IndustryInsight_pkey" PRIMARY KEY ("id")
      )
    `);
    console.log('  ✅ IndustryInsight table created');
    
    console.log('Creating indexes...');
    
    await client.query(`CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId")`);
    await client.query(`CREATE UNIQUE INDEX "User_email_key" ON "User"("email")`);
    await client.query(`CREATE INDEX "Assessment_userId_idx" ON "Assessment"("userId")`);
    await client.query(`CREATE UNIQUE INDEX "Resume_userId_key" ON "Resume"("userId")`);
    await client.query(`CREATE INDEX "CoverLetter_userId_idx" ON "CoverLetter"("userId")`);
    await client.query(`CREATE UNIQUE INDEX "IndustryInsight_industry_key" ON "IndustryInsight"("industry")`);
    await client.query(`CREATE INDEX "IndustryInsight_industry_idx" ON "IndustryInsight"("industry")`);
    console.log('  ✅ Indexes created');
    
    console.log('Creating foreign keys...');
    
    await client.query(`ALTER TABLE "User" ADD CONSTRAINT "User_industry_fkey" FOREIGN KEY ("industry") REFERENCES "IndustryInsight"("industry") ON DELETE SET NULL ON UPDATE CASCADE`);
    await client.query(`ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    await client.query(`ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    await client.query(`ALTER TABLE "CoverLetter" ADD CONSTRAINT "CoverLetter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    console.log('  ✅ Foreign keys created');
    
    console.log('\n✅ Schema push completed successfully!');
    console.log('Created tables: User, Assessment, Resume, CoverLetter, IndustryInsight');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    // Check if it's "already exists" error
    if (error.message.includes('already exists')) {
      console.log('\n⚠️  Some objects already exist. The schema may already be pushed.');
    }
  } finally {
    client.release();
    await pool.end();
  }
}

pushSchema();
