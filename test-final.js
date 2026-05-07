// Use the exact DATABASE_URL from the .Env file
const DATABASE_URL = "postgresql://postgres.mhpscbwssvxyqgbzzqio:Supabase%402026@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  // Add connection timeout
  connectionTimeoutMillis: 10000
});

async function testConnection() {
  console.log('Testing with exact DATABASE_URL from .Env file:');
  console.log('URL:', DATABASE_URL.substring(0, 70) + '...');
  console.log('');
  
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ SUCCESS! Database connected!');
    console.log('Time:', result.rows[0].current_time);
    console.log('PostgreSQL:', result.rows[0].pg_version);
    client.release();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ FAILED!');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    console.error('Stack:', error.stack);
    await pool.end();
    process.exit(1);
  }
}

// Set a timeout
setTimeout(() => {
  console.error('❌ Connection timed out after 10 seconds');
  pool.end();
  process.exit(1);
}, 10000);

testConnection();
